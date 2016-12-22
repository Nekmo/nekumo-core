"""Nekumo
"""
import argparse
from itertools import chain

import sys

import asyncio

import os

from nekumo.core.nekumo import Nekumo
from nekumo.gateways import get_gateways
from nekumo.ifaces.simple_web import SimpleWebConfig


class NekumoManagement(object):

    def __init__(self):
        self.parser = argparse.ArgumentParser(description=__doc__)
        self.gateway_classes = self.get_gateway_classes()
        self.nekumo = Nekumo()
        self.add_parsers()

    def add_parsers(self):
        self.gateway_parsers = self.set_gateway_parsers(self.gateway_classes)

    def get_gateway_classes(self):
        return get_gateways()

    def set_gateway_parsers(self, gateways=None):
        gateways = gateways or self.get_gateway_classes()
        return [(gateway, self.set_gateway_parser(gateway)) for gateway in gateways]

    def set_gateway_parser(self, gateway):
        return gateway.config_class.uri.parser_argument(self.parser)

    def execute_from_command_line(self, argv=None):
        if argv is None:
            argv = sys.argv
        args = self.parser.parse_args(argv[1:])
        self.nekumo.gateways = list(self.parse_gateways(args))
        self.nekumo.ifaces = list(self.parse_ifaces(args))
        if 'NEKUMO_DEBUG_IFACE' not in os.environ:
            loop = asyncio.get_event_loop()
            loop.run_forever()

    def parse_gateways(self, args):
        return chain(*[gateway_parser[0].parse(args, gateway_parser[1]) for gateway_parser in self.gateway_parsers])

    def parse_ifaces(self, args):
        from nekumo.ifaces.simple_web import SimpleWebIface
        return [SimpleWebIface(self.nekumo, SimpleWebConfig()).run()]
