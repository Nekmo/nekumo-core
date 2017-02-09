var module = angular.module('fileManagerApi', ['btford.socket-io']);
var API_NAMESPACE = 'api';
var API_PATH = '/.nekumo/io/';  // Este es el path que en realidad acompaña a la url
var WS_URL = sprintf('http://%s:%d/%s', document.domain, location.port, API_NAMESPACE);
var ICON_FONT = 'mdi';
var socket;

var MIMETYPE_ICONS = {
    'inode/directory': classIcon('folder', 'folder'),

    'application/pdf': classIcon('file-pdf-box', 'pdf'),

    'application/x-compressed-tar': classIcon('zip-box', 'compressed'),
    'application/zip': classIcon('zip-box', 'compressed'),


    'application/xml': classIcon('code-not-equal-variant', 'code'),
    'application/x-php': classIcon('language-php', 'code'),
    'text/x-python': classIcon('language-python', 'code'),

    'application/vnd.oasis.opendocument.text': classIcon('file-document-box', 'document'),

    'video': classIcon('filmstrip', 'video'),
    'image': classIcon('image', 'image'),
    'audio': classIcon('music-box', 'audio'),
    'text': classIcon('file-document-box', 'document'),
    '': classIcon('help-circle', 'unknown')
};

// module.config(function (socketFactoryProvider) {
//   socketFactoryProvider.prefix('');
// });

function classIcon(icon, name){
    return ICON_FONT + ' ' + ICON_FONT + '-' + icon + ' icon-' + name;
}

function createDict(key, value){
    var dict = {};
    dict[key] = value;
    return dict;
}

function entryEntriesDict(entry_entries){
    return createDict((_.isArray(entry_entries) ? 'entries' : 'entry'), entry_entries);
}

function getPath(entry_entries){
    if(_.isArray(entry_entries)){
        return _.map(entry_entries, function (x){ return x.path });
    } else {
        return entry_entries.path;
    }
}

function getIconClass(mimetype){
    var mime = null;
    if(mimetype){
        mime = mimetype.split('/')[0];
    }
    return _.get(MIMETYPE_ICONS, mimetype, _.get(MIMETYPE_ICONS, mime)) || MIMETYPE_ICONS[''];
}

Entry = function(data) {
    angular.extend(this, {
        "type": "folder",
        "icon_class": "mdi mdi-folder icon-folder",
        "owner": "me",
        "size": "1.2 Mb",
        "modified": "July 8, 2015",
        "opened": "July 8, 2015",
        "created": "July 8, 2015",
        "extention": "",
        "location": "My Files > Documents",
        "offline": true,
        "isDir": true,
        "preview": "/.nekumo/static/src/components/fileManager/sample-file-preview.jpg"
    });
    angular.extend(this, data);

    this.modified = new Date(data.mtime);
    this.isDir = this.type == 'directory';
    this.icon_class = getIconClass(this.mimetype);
    if(this.parentDir && !_.endsWith(this.parentDir, '/')){
        this.parentDir += '/';
    }
    if(!this.name){
        this.name = _.last(_.trim(this.path, '/').split('/'));
    } else if(!this.path){
        this.path = this.parentDir + this.name;
    }
    if(this.isDir && !_.endsWith(this.path, '/')){
        this.path += '/';
    }
};


module.factory('Entry', function () {
    return function (data) {
        return new Entry(data);
    }
});

module.factory('API', function (socketFactory, $q, Entry) {
    // var ioSocket = io(WS_URL, {path: API_NAMESPACE});
    // var ioSocket = io({transports: ['websocket'], upgrade: false});
    // // var socket = socketFactory({ioSocket: ioSocket});
    // var socket = socketFactory({prefix: '/', ioSocket: ioSocket});
    // socket.emit('foo');

    if(!socket){
        var ioSocket = io.connect(WS_URL, {transports: ['websocket'], upgrade: false, path: API_PATH});
        socket = socketFactory({ioSocket: ioSocket});
    }

    // ioSocket.on('connect', function() {
    //     ioSocket.emit('joined', {});
    // });
    // ioSocket.on('status', function(data) {
    //     console.debug('data!');
    // });


    return {
        list: function (path) {
            var deferred = $q.defer();
            socket.emit('list', {'entry': path}, function (data) {
                deferred.resolve(_.map(data, function(x){
                    return Entry(_.extend(x, {parentDir: path}))
                }));
            });
            return deferred.promise;
            // return $q(function (resolve, reject) {
            //     socket.emit('list', {'entry': path}, resolve);
            // });
        },
        rename: function (entry, newName) {
            if(_.isObject(entry)){
                entry = entry.path;
            }
            return $q(function (resolve, reject) {
                socket.emit('rename', {'entry': entry, 'new_name': newName}, resolve);
            })
        },
        move: function (entry, dest) {
            // TODO: incompleto
            return $q(function (resolve, reject) {
                socket.emit('move', {'entry': entry, 'new_name': newName}, resolve);
            });
        },
        delete: function (entry_entries) {
            return $q(function (resolve, reject) {
                socket.emit('delete', entryEntriesDict(getPath(entry_entries)), resolve);
            });
        }
    }
});