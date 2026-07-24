#!/usr/bin/env python3
"""Lokal testserver for Urd.

Samme jobb som `python3 -m http.server` fra template/, men hver respons
sendes med `Cache-Control: no-store`. Uten den regelen gjetter nettleseren
hvor lenge filene er ferske (heuristisk caching), og forhåndsvisningens
motorfiler (ES-module-importene i iframen) blir hengende igjen selv ved
hard reload. Med denne serveren holder vanlig reload alltid.

Bruk fra repo-roten (eller hvor som helst; template/ finnes relativt til
skriptet):

    python3 dev-server.py          # port 8000
    python3 dev-server.py 8123     # valgfri port
"""

import contextlib
import functools
import http.server
import os
import socket
import sys


class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    # HTTP/1.1 med keep-alive: raskere enn 1.0 under motorens
    # modul-lastestorm (en tilkobling per fil ellers).
    protocol_version = 'HTTP/1.1'

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()


class DualStackServer(http.server.ThreadingHTTPServer):
    # Samme binding som `python3 -m http.server`: IPv6 og IPv4 samtidig,
    # siden nettlesere gjerne prøver ::1 først for localhost.
    address_family = socket.AF_INET6

    def server_bind(self):
        with contextlib.suppress(Exception):
            self.socket.setsockopt(socket.IPPROTO_IPV6, socket.IPV6_V6ONLY, 0)
        return super().server_bind()


def main():
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    root = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'template')
    if not os.path.isdir(root):
        print(f'Fant ikke {root} - ligger dev-server.py i repo-roten?')
        sys.exit(1)
    handler = functools.partial(NoCacheHandler, directory=root)
    try:
        try:
            server = DualStackServer(('::', port), handler)
        except OSError as err:
            if err.errno == 98:  # EADDRINUSE
                raise
            # IPv6 utilgjengelig på maskinen: fall tilbake til ren IPv4.
            server = http.server.ThreadingHTTPServer(('0.0.0.0', port), handler)
    except OSError as err:
        if err.errno == 98:
            print(f'Port {port} er opptatt (kjører en annen server fremdeles?).')
            print(f'Stopp den, eller velg en annen port: python3 dev-server.py {port + 1}')
            sys.exit(1)
        raise
    with server:
        print(f'Urd-testserver: http://localhost:{port} (serverer {root}, caching av)', flush=True)
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            print('\nStoppet.')


if __name__ == '__main__':
    main()
