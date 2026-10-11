#!/usr/bin/env python3
"""Local test server for the Urd repo.

Starts template/dev-server.py, the server every site gets with the
template, so it serves template/ with caching off:

    python3 dev-server.py          # port 8000
    python3 dev-server.py 8123     # optional port
"""

import os
import runpy

runpy.run_path(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'template', 'dev-server.py'), run_name='__main__')
