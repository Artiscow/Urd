//#region node_modules/svelte/src/internal/shared/utils.js
var e = Array.isArray, t = Array.prototype.indexOf, n = Array.prototype.includes, r = Array.from, i = Object.defineProperty, a = Object.getOwnPropertyDescriptor, o = Object.getOwnPropertyDescriptors, s = Object.prototype, c = Array.prototype, l = Object.getPrototypeOf, u = Object.isExtensible;
function d(e) {
	return typeof e == "function";
}
var f = () => {};
function p(e) {
	for (var t = 0; t < e.length; t++) e[t]();
}
function m() {
	var e, t;
	return {
		promise: new Promise((n, r) => {
			e = n, t = r;
		}),
		resolve: e,
		reject: t
	};
}
function h(e, t) {
	if (Array.isArray(e)) return e;
	if (t === void 0 || !(Symbol.iterator in e)) return Array.from(e);
	let n = [];
	for (let r of e) if (n.push(r), n.length === t) break;
	return n;
}
var g = 1024, _ = 2048, v = 4096, y = 8192, b = 16384, x = 32768, S = 1 << 25, C = 65536, ee = 1 << 19, te = 1 << 20, ne = 1 << 25, re = 65536, ie = 1 << 21, ae = 1 << 22, oe = 1 << 23, se = Symbol("$state"), ce = Symbol("legacy props"), le = Symbol(""), ue = Symbol("attributes"), de = Symbol("class"), fe = Symbol("style"), pe = Symbol("text"), me = Symbol("form reset"), he = new class extends Error {
	name = "StaleReactionError";
	message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}(), ge = !!globalThis.document?.contentType && /* @__PURE__ */ globalThis.document.contentType.includes("xml");
//#endregion
//#region node_modules/svelte/src/internal/client/errors.js
function _e() {
	throw Error("https://svelte.dev/e/async_derived_orphan");
}
function ve(e, t, n) {
	throw Error("https://svelte.dev/e/each_key_duplicate");
}
function ye(e) {
	throw Error("https://svelte.dev/e/effect_in_teardown");
}
function be() {
	throw Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function xe(e) {
	throw Error("https://svelte.dev/e/effect_orphan");
}
function Se() {
	throw Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function Ce(e) {
	throw Error("https://svelte.dev/e/props_invalid_value");
}
function we() {
	throw Error("https://svelte.dev/e/state_descriptors_fixed");
}
function Te() {
	throw Error("https://svelte.dev/e/state_prototype_fixed");
}
function Ee() {
	throw Error("https://svelte.dev/e/state_unsafe_mutation");
}
function De() {
	throw Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
//#endregion
//#region node_modules/svelte/src/constants.js
var Oe = {}, ke = Symbol("uninitialized"), w = "http://www.w3.org/1999/xhtml", Ae = "http://www.w3.org/2000/svg", T = "http://www.w3.org/1998/Math/MathML";
function E() {
	console.warn("https://svelte.dev/e/derived_inert");
}
function je(e) {
	console.warn("https://svelte.dev/e/hydration_mismatch");
}
function Me() {
	console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/hydration.js
var Ne = !1;
function Pe(e) {
	Ne = e;
}
var D;
function Fe(e) {
	if (e === null) throw je(), Oe;
	return D = e;
}
function Ie() {
	return Fe(/* @__PURE__ */ pn(D));
}
function O(e) {
	if (Ne) {
		if (/* @__PURE__ */ pn(D) !== null) throw je(), Oe;
		D = e;
	}
}
function Le(e = 1) {
	if (Ne) {
		for (var t = e, n = D; t--;) n = /* @__PURE__ */ pn(n);
		D = n;
	}
}
function Re(e = !0) {
	for (var t = 0, n = D;;) {
		if (n.nodeType === 8) {
			var r = n.data;
			if (r === "]") {
				if (t === 0) return n;
				--t;
			} else (r === "[" || r === "[!" || r[0] === "[" && !isNaN(Number(r.slice(1)))) && (t += 1);
		}
		var i = /* @__PURE__ */ pn(n);
		e && n.remove(), n = i;
	}
}
function ze(e) {
	if (!e || e.nodeType !== 8) throw je(), Oe;
	return e.data;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/equality.js
function Be(e) {
	return e === this.v;
}
function Ve(e, t) {
	return e == e ? e !== t || typeof e == "object" && !!e || typeof e == "function" : t == t;
}
function He(e) {
	return !Ve(e, this.v);
}
//#endregion
//#region node_modules/svelte/src/internal/shared/clone.js
var Ue = [];
function We(e, t = !1, n = !1) {
	return Ge(e, /* @__PURE__ */ new Map(), "", Ue, null, n);
}
function Ge(t, n, r, i, a = null, o = !1) {
	if (typeof t == "object" && t) {
		var c = n.get(t);
		if (c !== void 0) return c;
		if (t instanceof Map) return new Map(t);
		if (t instanceof Set) return new Set(t);
		if (e(t)) {
			var u = Array(t.length);
			n.set(t, u), a !== null && n.set(a, u);
			for (var d = 0; d < t.length; d += 1) {
				var f = t[d];
				d in t && (u[d] = Ge(f, n, r, i, null, o));
			}
			return u;
		}
		if (l(t) === s) {
			u = {}, n.set(t, u), a !== null && n.set(a, u);
			for (var p of Object.keys(t)) u[p] = Ge(t[p], n, r, i, null, o);
			return u;
		}
		if (t instanceof Date) return structuredClone(t);
		if (typeof t.toJSON == "function" && !o) return Ge(t.toJSON(), n, r, i, t);
	}
	if (t instanceof EventTarget) return t;
	try {
		return structuredClone(t);
	} catch {
		return t;
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/context.js
var Ke = null;
function qe(e) {
	Ke = e;
}
function Je(e, t = !1, n) {
	Ke = {
		p: Ke,
		i: !1,
		c: null,
		e: null,
		s: e,
		x: null,
		r: Yn,
		l: null
	};
}
function Ye(e) {
	var t = Ke, n = t.e;
	if (n !== null) {
		t.e = null;
		for (var r of n) wn(r);
	}
	return e !== void 0 && (t.x = e), t.i = !0, Ke = t.p, e ?? {};
}
function Xe() {
	return !0;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/task.js
var Ze = [];
function Qe() {
	var e = Ze;
	Ze = [], p(e);
}
function $e(e) {
	if (Ze.length === 0 && !Ft) {
		var t = Ze;
		queueMicrotask(() => {
			t === Ze && Qe();
		});
	}
	Ze.push(e);
}
function et() {
	for (; Ze.length > 0;) Qe();
}
function tt(e) {
	var t = Yn;
	if (t === null) return Kn.f |= oe, e;
	if (!(t.f & 32768) && !(t.f & 4)) throw e;
	nt(e, t);
}
function nt(e, t) {
	if (!(t !== null && t.f & 16384)) {
		for (; t !== null;) {
			if (t.f & 128) {
				if (!(t.f & 32768)) throw e;
				try {
					t.b.error(e);
					return;
				} catch (t) {
					e = t;
				}
			}
			t = t.parent;
		}
		throw e;
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/status.js
var rt = ~(_ | v | g);
function it(e, t) {
	e.f = e.f & rt | t;
}
function at(e) {
	e.f & 512 || e.deps === null ? it(e, g) : it(e, v);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/utils.js
function ot(e) {
	if (e !== null) for (let t of e) !(t.f & 2) || !(t.f & 65536) || (t.f ^= re, ot(t.deps));
}
function st(e, t, n) {
	e.f & 2048 ? t.add(e) : e.f & 4096 && n.add(e), ot(e.deps), it(e, g);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/store.js
var ct = !1;
function lt(e) {
	var t = ct;
	try {
		return ct = !1, [e(), ct];
	} finally {
		ct = t;
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/misc.js
function ut(e, t) {
	if (t) {
		let t = document.body;
		e.autofocus = !0, $e(() => {
			document.activeElement === t && e.focus();
		});
	}
}
function dt(e) {
	Ne && /* @__PURE__ */ fn(e) !== null && mn(e);
}
var ft = !1;
function pt() {
	ft || (ft = !0, document.addEventListener("reset", (e) => {
		Promise.resolve().then(() => {
			if (!e.defaultPrevented) for (let t of e.target.elements) t[me]?.();
		});
	}, { capture: !0 }));
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
function mt(e) {
	var t = Kn, n = Yn;
	Jn(null), Xn(null);
	try {
		return e();
	} finally {
		Jn(t), Xn(n);
	}
}
function ht(e, t, n, r = n) {
	e.addEventListener(t, () => mt(n));
	let i = e[me];
	e[me] = i ? () => {
		i(), r(!0);
	} : () => r(!0), pt();
}
//#endregion
//#region node_modules/svelte/src/reactivity/create-subscriber.js
function gt(e) {
	let t = 0, n = Qt(0), r;
	return () => {
		xn() && (z(n), On(() => (t === 0 && (r = _r(() => e(() => nn(n)))), t += 1, () => {
			$e(() => {
				--t, t === 0 && (r?.(), r = void 0, nn(n));
			});
		})));
	};
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/boundary.js
var _t = C | ee;
function vt(e, t, n, r) {
	new yt(e, t, n, r);
}
var yt = class {
	parent;
	is_pending = !1;
	transform_error;
	#e;
	#t = Ne ? D : null;
	#n;
	#r;
	#i;
	#a = null;
	#o = null;
	#s = null;
	#c = null;
	#l = 0;
	#u = 0;
	#d = !1;
	#f = /* @__PURE__ */ new Set();
	#p = /* @__PURE__ */ new Set();
	#m = null;
	#h = gt(() => (this.#m = Qt(this.#l), () => {
		this.#m = null;
	}));
	constructor(e, t, n, r) {
		this.#e = e, this.#n = t, this.#r = (e) => {
			var t = Yn;
			t.b = this, t.f |= 128, n(e);
		}, this.parent = Yn.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = kn(() => {
			if (Ne) {
				let e = this.#t;
				Ie();
				let t = e.data === "[!";
				if (e.data.startsWith("[?")) {
					let t = JSON.parse(e.data.slice(2));
					this.#_(t);
				} else t ? this.#y() : this.#g();
			} else this.#b();
		}, _t), Ne && (this.#e = D);
	}
	#g() {
		try {
			this.#a = An(() => this.#r(this.#e));
		} catch (e) {
			this.error(e);
		}
	}
	#_(e) {
		let t = this.#n.failed, { reset: n, invoke_onerror: r } = this.#v(e);
		$e(r), t && (this.#s = An(() => {
			t(this.#e, () => e, () => n);
		}));
	}
	#v(e) {
		var t = !1, n = !1;
		let r = () => {
			if (t) {
				Me();
				return;
			}
			t = !0, n && De(), this.#s !== null && Ln(this.#s, () => {
				this.#s = null;
			}), this.#S(() => {
				this.#b();
			});
		};
		return {
			reset: r,
			invoke_onerror: () => {
				try {
					n = !0, this.#n.onerror?.(e, r), n = !1;
				} catch (e) {
					nt(e, this.#i && this.#i.parent);
				}
			}
		};
	}
	#y() {
		let e = this.#n.pending;
		e && (this.is_pending = !0, this.#o = An(() => e(this.#e)), $e(() => {
			var e = this.#c = document.createDocumentFragment(), t = dn();
			e.append(t), this.#a = this.#S(() => An(() => this.#r(t))), this.#u === 0 && (this.#e.before(e), this.#c = null, Ln(this.#o, () => {
				this.#o = null;
			}), this.#x(j));
		}));
	}
	#b() {
		try {
			if (this.is_pending = this.has_pending_snippet(), this.#u = 0, this.#l = 0, this.#a = An(() => {
				this.#r(this.#e);
			}), this.#u > 0) {
				var e = this.#c = document.createDocumentFragment();
				Vn(this.#a, e);
				let t = this.#n.pending;
				this.#o = An(() => t(this.#e));
			} else this.#x(j);
		} catch (e) {
			this.error(e);
		}
	}
	#x(e) {
		this.is_pending = !1, e.transfer_effects(this.#f, this.#p);
	}
	defer_effect(e) {
		st(e, this.#f, this.#p);
	}
	is_rendered() {
		return !this.is_pending && (!this.parent || this.parent.is_rendered());
	}
	has_pending_snippet() {
		return !!this.#n.pending;
	}
	#S(e) {
		var t = Yn, n = Kn, r = Ke;
		Xn(this.#i), Jn(this.#i), qe(this.#i.ctx);
		try {
			return Vt.ensure(), e();
		} catch (e) {
			return tt(e), null;
		} finally {
			Xn(t), Jn(n), qe(r);
		}
	}
	#C(e, t) {
		if (!this.has_pending_snippet()) {
			this.parent && this.parent.#C(e, t);
			return;
		}
		this.#u += e, this.#u === 0 && (this.#x(t), this.#o && Ln(this.#o, () => {
			this.#o = null;
		}), this.#c &&= (this.#e.before(this.#c), null));
	}
	update_pending_count(e, t) {
		this.#C(e, t), this.#l += e, !(!this.#m || this.#d) && (this.#d = !0, $e(() => {
			this.#d = !1, this.#m && en(this.#m, this.#l);
		}));
	}
	get_effect_pending() {
		return this.#h(), z(this.#m);
	}
	error(e) {
		if (!this.#n.onerror && !this.#n.failed) throw e;
		j?.is_fork ? (this.#a && j.skip_effect(this.#a), this.#o && j.skip_effect(this.#o), this.#s && j.skip_effect(this.#s), j.oncommit(() => {
			this.#w(e);
		})) : this.#w(e);
	}
	#w(e) {
		this.#a &&= (Pn(this.#a), null), this.#o &&= (Pn(this.#o), null), this.#s &&= (Pn(this.#s), null), Ne && (Fe(this.#t), Le(), Fe(Re()));
		let t = this.#n.failed, n = (e) => {
			let { reset: n, invoke_onerror: r } = this.#v(e);
			r(), t && (this.#s = this.#S(() => {
				try {
					return An(() => {
						var r = Yn;
						r.b = this, r.f |= 128, t(this.#e, () => e, () => n);
					});
				} catch (e) {
					return nt(e, this.#i.parent), null;
				}
			}));
		};
		$e(() => {
			var t;
			try {
				t = this.transform_error(e);
			} catch (e) {
				nt(e, this.#i && this.#i.parent);
				return;
			}
			typeof t == "object" && t && typeof t.then == "function" ? t.then(n, (e) => nt(e, this.#i && this.#i.parent)) : n(t);
		});
	}
};
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/async.js
function bt(e, t, n, r) {
	let i = Xe() ? wt : Et;
	var a = e.filter((e) => !e.settled), o = t.map(i);
	if (n.length === 0 && a.length === 0) {
		r(o);
		return;
	}
	var s = Yn, c = xt(), l = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((e) => e.promise)) : null;
	function u(e) {
		if (!(s.f & 16384)) {
			c();
			try {
				r([...o, ...e]);
			} catch (e) {
				nt(e, s);
			}
			St();
		}
	}
	var d = Ct();
	if (n.length === 0) {
		l.then(() => u([])).finally(d);
		return;
	}
	function f() {
		Promise.all(n.map((e) => /* @__PURE__ */ Tt(e))).then(u).catch((e) => nt(e, s)).finally(d);
	}
	l ? l.then(() => {
		c(), f(), St();
	}) : f();
}
function xt() {
	var e = Yn, t = Kn, n = Ke, r = j;
	return function(i = !0) {
		Xn(e), Jn(t), qe(n), i && !(e.f & 16384) && (r?.activate(), r?.apply());
	};
}
function St(e = !0) {
	Xn(null), Jn(null), qe(null), e && j?.deactivate();
}
function Ct() {
	var e = Yn, t = e.b, n = j, r = !!t?.is_rendered();
	return t?.update_pending_count(1, n), n.increment(r, e), () => {
		t?.update_pending_count(-1, n), n.decrement(r, e);
	};
}
/*#__NO_SIDE_EFFECTS__*/
function wt(e) {
	var t = 2 | _;
	return Yn !== null && (Yn.f |= ee), {
		ctx: Ke,
		deps: null,
		effects: null,
		equals: Be,
		f: t,
		fn: e,
		reactions: null,
		rv: 0,
		v: ke,
		wv: 0,
		parent: Yn,
		ac: null
	};
}
var k = Symbol("obsolete");
/*#__NO_SIDE_EFFECTS__*/
function Tt(e, t, n) {
	let r = Yn;
	r === null && _e();
	var i = void 0, a = Qt(ke), o = !Kn, s = /* @__PURE__ */ new Set();
	return Dn(() => {
		var t = Yn, n = m();
		i = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, (e) => {
				e !== he && n.reject(e);
			}).finally(St);
		} catch (e) {
			n.reject(e), St();
		}
		var c = j;
		if (o) {
			if (t.f & 32768) var l = Ct();
			if (r.b?.is_rendered()) c.async_deriveds.get(t)?.reject(k);
			else for (let e of s.values()) e.reject(k);
			s.add(n), c.async_deriveds.set(t, n);
		}
		let u = (e, t = void 0) => {
			l?.(), s.delete(n), t !== k && (c.activate(), t ? (a.f |= oe, en(a, t)) : (a.f & 8388608 && (a.f ^= oe), en(a, e)), c.deactivate());
		};
		n.promise.then(u, (e) => u(null, e || "unknown"));
	}), Sn(() => {
		for (let e of s) e.reject(k);
	}), new Promise((e) => {
		function t(n) {
			function r() {
				n === i ? e(a) : t(i);
			}
			n.then(r, r);
		}
		t(i);
	});
}
/*#__NO_SIDE_EFFECTS__*/
function A(e) {
	let t = /* @__PURE__ */ wt(e);
	return Qn(t), t;
}
/*#__NO_SIDE_EFFECTS__*/
function Et(e) {
	let t = /* @__PURE__ */ wt(e);
	return t.equals = He, t;
}
function Dt(e) {
	var t = e.effects;
	if (t !== null) {
		e.effects = null;
		for (var n = 0; n < t.length; n += 1) Pn(t[n]);
	}
}
function Ot(e) {
	var t, n = Yn, r = e.parent;
	if (!Wn && r !== null && e.v !== ke && r.f & 24576) return E(), e.v;
	Xn(r);
	try {
		e.f &= ~re, Dt(e), t = ur(e);
	} finally {
		Xn(n);
	}
	return t;
}
function kt(e) {
	var t = Ot(e);
	if (!e.equals(t) && (e.wv = sr(), (!j?.is_fork || e.deps === null) && (j === null ? e.v = t : (j.capture(e, t, !0), M?.capture(e, t, !0)), e.deps === null))) {
		it(e, g);
		return;
	}
	Wn || (Nt === null ? at(e) : (xn() || j?.is_fork) && Nt.set(e, t));
}
function At(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac !== null && mt(() => {
		t.ac.abort(he), t.ac = null;
	}), t.fn !== null && (t.teardown = f), fr(t, 0), Mn(t));
}
function jt(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && pr(t);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/batch.js
var Mt = null, j = null, M = null, Nt = null, Pt = null, Ft = !1, It = !1, Lt = null, Rt = null, zt = 0, Bt = 1, Vt = class e {
	id = Bt++;
	#e = !1;
	linked = !0;
	#t = null;
	#n = null;
	async_deriveds = /* @__PURE__ */ new Map();
	current = /* @__PURE__ */ new Map();
	previous = /* @__PURE__ */ new Map();
	#r = /* @__PURE__ */ new Set();
	#i = /* @__PURE__ */ new Set();
	#a = 0;
	#o = /* @__PURE__ */ new Map();
	#s = null;
	#c = [];
	#l = [];
	#u = /* @__PURE__ */ new Set();
	#d = /* @__PURE__ */ new Set();
	#f = /* @__PURE__ */ new Map();
	#p = /* @__PURE__ */ new Set();
	is_fork = !1;
	#m = !1;
	constructor() {
		Mt === null ? Mt = this : (Mt.#n = this, this.#t = Mt), Mt = this;
	}
	#h() {
		if (this.is_fork) return !0;
		for (let n of this.#o.keys()) {
			for (var e = n, t = !1; e.parent !== null;) {
				if (this.#f.has(e)) {
					t = !0;
					break;
				}
				e = e.parent;
			}
			if (!t) return !0;
		}
		return !1;
	}
	skip_effect(e) {
		this.#f.has(e) || this.#f.set(e, {
			d: [],
			m: []
		}), this.#p.delete(e);
	}
	unskip_effect(e, t = (e) => this.schedule(e)) {
		var n = this.#f.get(e);
		if (n) {
			this.#f.delete(e);
			for (var r of n.d) it(r, _), t(r);
			for (r of n.m) it(r, v), t(r);
		}
		this.#p.add(e);
	}
	#g() {
		this.#e = !0, zt++ > 1e3 && (this.#x(), Ut());
		for (let e of this.#u) this.#d.delete(e), it(e, _), this.schedule(e);
		for (let e of this.#d) it(e, v), this.schedule(e);
		let t = this.#c;
		this.#c = [], this.apply();
		var n = Lt = [], r = [], i = Rt = [];
		for (let e of t) try {
			this.#_(e, n, r);
		} catch (t) {
			throw Jt(e), this.#h() || this.discard(), t;
		}
		if (j = null, i.length > 0) {
			var a = e.ensure();
			for (let e of i) a.schedule(e);
		}
		if (Lt = null, Rt = null, this.#h()) {
			this.#b(r), this.#b(n);
			for (let [e, t] of this.#f) qt(e, t);
			i.length > 0 && j.#g();
			return;
		}
		let o = this.#v();
		if (o) {
			this.#b(r), this.#b(n), o.#y(this);
			return;
		}
		this.#u.clear(), this.#d.clear();
		for (let e of this.#r) e(this);
		this.#r.clear(), M = this, Gt(r), Gt(n), M = null, this.#s?.resolve();
		var s = j;
		if (this.#a === 0 && (this.#c.length === 0 || s !== null) && this.#x(), this.#c.length > 0) {
			if (s !== null) {
				let e = s;
				e.#c.push(...this.#c.filter((t) => !e.#c.includes(t)));
			} else s = this;
		}
		s !== null && (Xt.clear(), s.#g());
	}
	#_(e, t, n) {
		e.f ^= g;
		for (var r = e.first; r !== null;) {
			var i = r.f, a = !!(i & 96);
			if (!(a && i & 1024 || i & 8192 || this.#f.has(r)) && r.fn !== null) {
				a ? r.f ^= g : i & 4 ? t.push(r) : cr(r) && (i & 16 && this.#d.add(r), pr(r));
				var o = r.first;
				if (o !== null) {
					r = o;
					continue;
				}
			}
			for (; r !== null;) {
				var s = r.next;
				if (s !== null) {
					r = s;
					break;
				}
				r = r.parent;
			}
		}
	}
	#v() {
		for (var e = this.#t; e !== null;) {
			if (!e.is_fork) {
				for (let [t, [, n]] of this.current) if (e.current.has(t) && !n) return e;
			}
			e = e.#t;
		}
		return null;
	}
	#y(e) {
		for (let [t, n] of e.current) !this.previous.has(t) && e.previous.has(t) && this.previous.set(t, e.previous.get(t)), this.current.set(t, n);
		for (let [t, n] of e.async_deriveds) {
			let e = this.async_deriveds.get(t);
			e && n.promise.then(e.resolve).catch(e.reject);
		}
		e.async_deriveds.clear(), this.transfer_effects(e.#u, e.#d);
		let t = (e) => {
			var n = e.reactions;
			if (n !== null && !(e.f & 2 && !(e.f & 6144))) for (let e of n) {
				var r = e.f;
				if (r & 2) t(e);
				else {
					var i = e;
					r & 4194320 && !this.async_deriveds.has(i) && (this.#d.delete(i), it(i, _), this.schedule(i));
				}
			}
		};
		for (let e of this.current.keys()) t(e);
		this.oncommit(() => e.discard()), e.#x(), j = this, this.#g();
	}
	#b(e) {
		for (var t = 0; t < e.length; t += 1) st(e[t], this.#u, this.#d);
	}
	capture(e, t, n = !1) {
		e.v !== ke && !this.previous.has(e) && this.previous.set(e, e.v), e.f & 8388608 || (this.current.set(e, [t, n]), Nt?.set(e, t)), this.is_fork || (e.v = t);
	}
	activate() {
		j = this;
	}
	deactivate() {
		j = null, Nt = null;
	}
	flush() {
		try {
			It = !0, j = this, this.#g();
		} finally {
			zt = 0, Pt = null, Lt = null, Rt = null, It = !1, j = null, Nt = null, Xt.clear();
		}
	}
	discard() {
		for (let e of this.#i) e(this);
		this.#i.clear();
		for (let e of this.async_deriveds.values()) e.reject(k);
		this.#x(), this.#s?.resolve();
	}
	register_created_effect(e) {
		this.#l.push(e);
	}
	increment(e, t) {
		if (this.#a += 1, e) {
			let e = this.#o.get(t) ?? 0;
			this.#o.set(t, e + 1);
		}
	}
	decrement(e, t) {
		if (--this.#a, e) {
			let e = this.#o.get(t) ?? 0;
			e === 1 ? this.#o.delete(t) : this.#o.set(t, e - 1);
		}
		this.#m || (this.#m = !0, $e(() => {
			this.#m = !1, this.linked && this.flush();
		}));
	}
	transfer_effects(e, t) {
		for (let t of e) this.#u.add(t);
		for (let e of t) this.#d.add(e);
		e.clear(), t.clear();
	}
	oncommit(e) {
		this.#r.add(e);
	}
	ondiscard(e) {
		this.#i.add(e);
	}
	settled() {
		return (this.#s ??= m()).promise;
	}
	static ensure() {
		if (j === null) {
			let t = j = new e();
			!It && !Ft && $e(() => {
				t.#e || t.flush();
			});
		}
		return j;
	}
	apply() {
		Nt = null;
	}
	schedule(e) {
		if (Pt = e, e.b?.is_pending && e.f & 16777228 && !(e.f & 32768)) {
			e.b.defer_effect(e);
			return;
		}
		for (var t = e; t.parent !== null;) {
			t = t.parent;
			var n = t.f;
			if (Lt !== null && t === Yn && (Kn === null || !(Kn.f & 2))) return;
			if (n & 96) {
				if (!(n & 1024)) return;
				t.f ^= g;
			}
		}
		this.#c.push(t);
	}
	#x() {
		if (this.linked) {
			var e = this.#t, t = this.#n;
			e === null || (e.#n = t), t === null ? Mt = e : t.#t = e, this.linked = !1;
		}
	}
};
function Ht(e) {
	var t = Ft;
	Ft = !0;
	try {
		var n;
		for (e && (j !== null && !j.is_fork && j.flush(), n = e());;) {
			if (et(), j === null) return n;
			j.flush();
		}
	} finally {
		Ft = t;
	}
}
function Ut() {
	try {
		Se();
	} catch (e) {
		nt(e, Pt);
	}
}
var Wt = null;
function Gt(e) {
	var t = e.length;
	if (t !== 0) {
		for (var n = 0; n < t;) {
			var r = e[n++];
			if (!(r.f & 24576) && cr(r) && (Wt = /* @__PURE__ */ new Set(), pr(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && In(r), Wt?.size > 0)) {
				Xt.clear();
				for (let e of Wt) {
					if (e.f & 24576) continue;
					let t = [e], n = e.parent;
					for (; n !== null;) Wt.has(n) && (Wt.delete(n), t.push(n)), n = n.parent;
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || pr(n);
					}
				}
				Wt.clear();
			}
		}
		Wt = null;
	}
}
function Kt(e) {
	j.schedule(e);
}
function qt(e, t) {
	if (!(e.f & 32 && e.f & 1024)) {
		e.f & 2048 ? t.d.push(e) : e.f & 4096 && t.m.push(e), it(e, g);
		for (var n = e.first; n !== null;) qt(n, t), n = n.next;
	}
}
function Jt(e) {
	it(e, g);
	for (var t = e.first; t !== null;) Jt(t), t = t.next;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/sources.js
var Yt = /* @__PURE__ */ new Set(), Xt = /* @__PURE__ */ new Map(), Zt = !1;
function Qt(e, t) {
	return {
		f: 0,
		v: e,
		reactions: null,
		equals: Be,
		rv: 0,
		wv: 0
	};
}
/*#__NO_SIDE_EFFECTS__*/
function N(e, t) {
	let n = Qt(e, t);
	return Qn(n), n;
}
/*#__NO_SIDE_EFFECTS__*/
function $t(e, t = !1, n = !0) {
	let r = Qt(e);
	return t || (r.equals = He), r;
}
function P(e, t, n = !1) {
	return Kn !== null && (!qn || Kn.f & 131072) && Xe() && Kn.f & 4325394 && (Zn === null || !Zn.has(e)) && Ee(), en(e, n ? an(t) : t, Rt);
}
function en(e, t, n = null) {
	if (!e.equals(t)) {
		Wn ? Xt.set(e, t) : Xt.has(e) || Xt.set(e, e.v);
		var r = Vt.ensure();
		if (r.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && Ot(t), Nt === null && at(t);
		}
		e.wv = sr(), rn(e, _, n), Xe() && Yn !== null && Yn.f & 1024 && !(Yn.f & 96) && (tr === null ? nr([e]) : tr.push(e)), !r.is_fork && Yt.size > 0 && !Zt && tn();
	}
	return t;
}
function tn() {
	Zt = !1;
	for (let e of Yt) {
		e.f & 1024 && it(e, v);
		let t;
		try {
			t = cr(e);
		} catch {
			t = !0;
		}
		t && pr(e);
	}
	Yt.clear();
}
function nn(e) {
	P(e, e.v + 1);
}
function rn(e, t, n) {
	var r = e.reactions;
	if (r !== null) for (var i = Xe(), a = r.length, o = 0; o < a; o++) {
		var s = r[o], c = s.f;
		if (!(!i && s === Yn)) {
			var l = (c & _) === 0;
			if (l && it(s, t), c & 131072) Yt.add(s);
			else if (c & 2) {
				var u = s;
				Nt?.delete(u), c & 65536 || (c & 512 && (Yn === null || !(Yn.f & 2097152)) && (s.f |= re), rn(u, v, n));
			} else if (l) {
				var d = s;
				c & 16 && Wt !== null && Wt.add(d), n === null ? Kt(d) : n.push(d);
			}
		}
	}
}
function an(t) {
	if (typeof t != "object" || !t || se in t) return t;
	let n = l(t);
	if (n !== s && n !== c) return t;
	var r = /* @__PURE__ */ new Map(), i = e(t), o = /* @__PURE__ */ N(0), u = null, d = ar, f = (e) => {
		if (ar === d) return e();
		var t = Kn, n = ar;
		Jn(null), or(d);
		var r = e();
		return Jn(t), or(n), r;
	};
	return i && r.set("length", /* @__PURE__ */ N(t.length, u)), new Proxy(t, {
		defineProperty(e, t, n) {
			(!("value" in n) || n.configurable === !1 || n.enumerable === !1 || n.writable === !1) && we();
			var i = r.get(t);
			return i === void 0 ? f(() => {
				var e = /* @__PURE__ */ N(n.value, u);
				return r.set(t, e), e;
			}) : P(i, n.value, !0), !0;
		},
		deleteProperty(e, t) {
			var n = r.get(t);
			if (n === void 0) {
				if (t in e) {
					let e = f(() => /* @__PURE__ */ N(ke, u));
					r.set(t, e), nn(o);
				}
			} else P(n, ke), nn(o);
			return !0;
		},
		get(e, n, i) {
			if (n === se) return t;
			var o = r.get(n), s = n in e;
			if (o === void 0 && (!s || a(e, n)?.writable) && (o = f(() => /* @__PURE__ */ N(an(s ? e[n] : ke), u)), r.set(n, o)), o !== void 0) {
				var c = z(o);
				return c === ke ? void 0 : c;
			}
			return Reflect.get(e, n, i);
		},
		getOwnPropertyDescriptor(e, t) {
			var n = Reflect.getOwnPropertyDescriptor(e, t);
			if (n && "value" in n) {
				var i = r.get(t);
				i && (n.value = z(i));
			} else if (n === void 0) {
				var a = r.get(t), o = a?.v;
				if (a !== void 0 && o !== ke) return {
					enumerable: !0,
					configurable: !0,
					value: o,
					writable: !0
				};
			}
			return n;
		},
		has(e, t) {
			if (t === se) return !0;
			var n = r.get(t), i = n !== void 0 && n.v !== ke || Reflect.has(e, t);
			return (n !== void 0 || Yn !== null && (!i || a(e, t)?.writable)) && (n === void 0 && (n = f(() => /* @__PURE__ */ N(i ? an(e[t]) : ke, u)), r.set(t, n)), z(n) === ke) ? !1 : i;
		},
		set(e, t, n, s) {
			var c = r.get(t), l = t in e;
			if (i && t === "length") for (var d = n; d < c.v; d += 1) {
				var p = r.get(d + "");
				p === void 0 ? d in e && (p = f(() => /* @__PURE__ */ N(ke, u)), r.set(d + "", p)) : P(p, ke);
			}
			if (c === void 0) (!l || a(e, t)?.writable) && (c = f(() => /* @__PURE__ */ N(void 0, u)), P(c, an(n)), r.set(t, c));
			else {
				l = c.v !== ke;
				var m = f(() => an(n));
				P(c, m);
			}
			var h = Reflect.getOwnPropertyDescriptor(e, t);
			if (h?.set && h.set.call(s, n), !l) {
				if (i && typeof t == "string") {
					var g = r.get("length"), _ = Number(t);
					Number.isInteger(_) && _ >= g.v && P(g, _ + 1);
				}
				nn(o);
			}
			return !0;
		},
		ownKeys(e) {
			z(o);
			var t = Reflect.ownKeys(e).filter((e) => {
				var t = r.get(e);
				return t === void 0 || t.v !== ke;
			});
			for (var [n, i] of r) i.v !== ke && !(n in e) && t.push(n);
			return t;
		},
		setPrototypeOf() {
			Te();
		}
	});
}
var on, sn, cn, ln;
function un() {
	if (on === void 0) {
		on = window, sn = /Firefox/.test(navigator.userAgent);
		var e = Element.prototype, t = Node.prototype, n = Text.prototype;
		cn = a(t, "firstChild").get, ln = a(t, "nextSibling").get, u(e) && (e[de] = void 0, e[ue] = null, e[fe] = void 0, e.__e = void 0), u(n) && (n[pe] = void 0);
	}
}
function dn(e = "") {
	return document.createTextNode(e);
}
/*@__NO_SIDE_EFFECTS__*/
function fn(e) {
	return cn.call(e);
}
/*@__NO_SIDE_EFFECTS__*/
function pn(e) {
	return ln.call(e);
}
function F(e, t) {
	if (!Ne) return /* @__PURE__ */ fn(e);
	var n = /* @__PURE__ */ fn(D);
	if (n === null) n = D.appendChild(dn());
	else if (t && n.nodeType !== 3) {
		var r = dn();
		return n?.before(r), Fe(r), r;
	}
	return t && _n(n), Fe(n), n;
}
function I(e, t = !1) {
	if (!Ne) {
		var n = /* @__PURE__ */ fn(e);
		return n instanceof Comment && n.data === "" ? /* @__PURE__ */ pn(n) : n;
	}
	if (t) {
		if (D?.nodeType !== 3) {
			var r = dn();
			return D?.before(r), Fe(r), r;
		}
		_n(D);
	}
	return D;
}
function L(e, t = 1, n = !1) {
	let r = Ne ? D : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ pn(r);
	if (!Ne) return r;
	if (n) {
		if (r?.nodeType !== 3) {
			var a = dn();
			return r === null ? i?.after(a) : r.before(a), Fe(a), a;
		}
		_n(r);
	}
	return Fe(r), r;
}
function mn(e) {
	e.textContent = "";
}
function hn() {
	return !1;
}
function gn(e, t, n) {
	return t == null || t === "http://www.w3.org/1999/xhtml" ? n ? document.createElement(e, { is: n }) : document.createElement(e) : n ? document.createElementNS(t, e, { is: n }) : document.createElementNS(t, e);
}
function _n(e) {
	if (e.nodeValue.length < 65536) return;
	let t = e.nextSibling;
	for (; t !== null && t.nodeType === 3;) t.remove(), e.nodeValue += t.nodeValue, t = e.nextSibling;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/effects.js
function vn(e) {
	Yn === null && (Kn === null && xe(e), be()), Wn && ye(e);
}
function yn(e, t) {
	var n = t.last;
	n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function bn(e, t) {
	var n = Yn;
	n !== null && n.f & 8192 && (e |= y);
	var r = {
		ctx: Ke,
		deps: null,
		nodes: null,
		f: e | _ | 512,
		first: null,
		fn: t,
		last: null,
		next: null,
		parent: n,
		b: n && n.b,
		prev: null,
		teardown: null,
		wv: 0,
		ac: null
	};
	j?.register_created_effect(r);
	var i = r;
	if (e & 4) Lt === null ? Vt.ensure().schedule(r) : Lt.push(r);
	else if (t !== null) {
		try {
			pr(r);
		} catch (e) {
			throw Pn(r), e;
		}
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && (i = i.first, e & 16 && e & 65536 && i !== null && (i.f |= C));
	}
	if (i !== null && (i.parent = n, n !== null && yn(i, n), Kn !== null && Kn.f & 2 && !(e & 64))) {
		var a = Kn;
		(a.effects ??= []).push(i);
	}
	return r;
}
function xn() {
	return Kn !== null && !qn;
}
function Sn(e) {
	let t = bn(8, null);
	return it(t, g), t.teardown = e, t;
}
function Cn(e) {
	vn("$effect");
	var t = Yn.f;
	if (!Kn && t & 32 && Ke !== null && !Ke.i) {
		var n = Ke;
		(n.e ??= []).push(e);
	} else return wn(e);
}
function wn(e) {
	return bn(4 | te, e);
}
function Tn(e) {
	Vt.ensure();
	let t = bn(64 | ee, e);
	return (e = {}) => new Promise((n) => {
		e.outro ? Ln(t, () => {
			Pn(t), n(void 0);
		}) : (Pn(t), n(void 0));
	});
}
function En(e) {
	return bn(4, e);
}
function Dn(e) {
	return bn(ae | ee, e);
}
function On(e, t = 0) {
	return bn(8 | t, e);
}
function R(e, t = [], n = [], r = []) {
	bt(r, t, n, (t) => {
		bn(8, () => {
			e(...t.map(z));
		});
	});
}
function kn(e, t = 0) {
	return bn(16 | t, e);
}
function An(e) {
	return bn(32 | ee, e);
}
function jn(e) {
	var t = e.teardown;
	if (t !== null) {
		let e = Wn, n = Kn;
		Gn(!0), Jn(null);
		try {
			t.call(null);
		} finally {
			Gn(e), Jn(n);
		}
	}
}
function Mn(e, t = !1) {
	var n = e.first;
	for (e.first = e.last = null; n !== null;) {
		let e = n.ac;
		e !== null && mt(() => {
			e.abort(he);
		});
		var r = n.next;
		n.f & 64 ? n.parent = null : Pn(n, t), n = r;
	}
}
function Nn(e) {
	for (var t = e.first; t !== null;) {
		var n = t.next;
		t.f & 32 || Pn(t), t = n;
	}
}
function Pn(e, t = !0) {
	var n = !1;
	(t || e.f & 262144) && e.nodes !== null && e.nodes.end !== null && (Fn(e.nodes.start, e.nodes.end), n = !0), e.f |= S, Mn(e, t && !n), fr(e, 0);
	var r = e.nodes && e.nodes.t;
	if (r !== null) for (let e of r) e.stop();
	jn(e), e.f ^= S, e.f |= b;
	var i = e.parent;
	i !== null && i.first !== null && In(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function Fn(e, t) {
	for (; e !== null;) {
		var n = e === t ? null : /* @__PURE__ */ pn(e);
		e.remove(), e = n;
	}
}
function In(e) {
	var t = e.parent, n = e.prev, r = e.next;
	n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function Ln(e, t, n = !0) {
	var r = [];
	Rn(e, r, !0);
	var i = () => {
		n && Pn(e), t && t();
	}, a = r.length;
	if (a > 0) {
		var o = () => --a || i();
		for (var s of r) s.out(o);
	} else i();
}
function Rn(e, t, n) {
	if (!(e.f & 8192)) {
		e.f ^= y;
		var r = e.nodes && e.nodes.t;
		if (r !== null) for (let e of r) (e.is_global || n) && t.push(e);
		for (var i = e.first; i !== null;) {
			var a = i.next;
			if (!(i.f & 64)) {
				var o = !!(i.f & 65536) || !!(i.f & 32) && !!(e.f & 16);
				Rn(i, t, o ? n : !1);
			}
			i = a;
		}
	}
}
function zn(e) {
	Bn(e, !0);
}
function Bn(e, t) {
	if (e.f & 8192) {
		e.f ^= y, e.f & 1024 || (it(e, _), Vt.ensure().schedule(e));
		for (var n = e.first; n !== null;) {
			var r = n.next, i = !!(n.f & 65536) || !!(n.f & 32);
			Bn(n, i ? t : !1), n = r;
		}
		var a = e.nodes && e.nodes.t;
		if (a !== null) for (let e of a) (e.is_global || t) && e.in();
	}
}
function Vn(e, t) {
	if (e.nodes) for (var n = e.nodes.start, r = e.nodes.end; n !== null;) {
		var i = n === r ? null : /* @__PURE__ */ pn(n);
		t.append(n), n = i;
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/legacy.js
var Hn = null, Un = !1, Wn = !1;
function Gn(e) {
	Wn = e;
}
var Kn = null, qn = !1;
function Jn(e) {
	Kn = e;
}
var Yn = null;
function Xn(e) {
	Yn = e;
}
var Zn = null;
function Qn(e) {
	Kn !== null && (Zn ??= /* @__PURE__ */ new Set()).add(e);
}
var $n = null, er = 0, tr = null;
function nr(e) {
	tr = e;
}
var rr = 1, ir = 0, ar = ir;
function or(e) {
	ar = e;
}
function sr() {
	return ++rr;
}
function cr(e) {
	var t = e.f;
	if (t & 2048) return !0;
	if (t & 2 && (e.f &= ~re), t & 4096) {
		for (var n = e.deps, r = n.length, i = 0; i < r; i++) {
			var a = n[i];
			if (cr(a) && kt(a), a.wv > e.wv) return !0;
		}
		t & 512 && Nt === null && it(e, g);
	}
	return !1;
}
function lr(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(Zn !== null && Zn.has(e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? lr(a, t, !1) : t === a && (n ? it(a, _) : a.f & 1024 && it(a, v), Kt(a));
	}
}
function ur(e) {
	var t = $n, n = er, r = tr, i = Kn, a = Zn, o = Ke, s = qn, c = ar, l = e.f;
	$n = null, er = 0, tr = null, Kn = l & 96 ? null : e, Zn = null, qe(e.ctx), qn = !1, ar = ++ir, e.ac !== null && (mt(() => {
		e.ac.abort(he);
	}), e.ac = null);
	try {
		e.f |= ie;
		var u = e.fn, d = u();
		e.f |= x;
		var f = e.deps, p = j?.is_fork;
		if ($n !== null) {
			var m;
			if (p || fr(e, er), f !== null && er > 0) for (f.length = er + $n.length, m = 0; m < $n.length; m++) f[er + m] = $n[m];
			else e.deps = f = $n;
			if (xn() && e.f & 512) for (m = er; m < f.length; m++) (f[m].reactions ??= []).push(e);
		} else !p && f !== null && er < f.length && (fr(e, er), f.length = er);
		if (Xe() && tr !== null && !qn && f !== null && !(e.f & 6146)) for (m = 0; m < tr.length; m++) lr(tr[m], e);
		if (i !== null && i !== e) {
			if (ir++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = ir;
			if (t !== null) for (let e of t) e.rv = ir;
			tr !== null && (r === null ? r = tr : r.push(...tr));
		}
		return e.f & 8388608 && (e.f ^= oe), d;
	} catch (e) {
		return tt(e);
	} finally {
		e.f ^= ie, $n = t, er = n, tr = r, Kn = i, Zn = a, qe(o), qn = s, ar = c;
	}
}
function dr(e, r) {
	let i = r.reactions;
	if (i !== null) {
		var a = t.call(i, e);
		if (a !== -1) {
			var o = i.length - 1;
			o === 0 ? i = r.reactions = null : (i[a] = i[o], i.pop());
		}
	}
	if (i === null && r.f & 2 && ($n === null || !n.call($n, r))) {
		var s = r;
		s.f & 512 && (s.f ^= 512, s.f &= ~re), s.v !== ke && at(s), s.ac !== null && mt(() => {
			s.ac.abort(he), s.ac = null, it(s, _);
		}), At(s), fr(s, 0);
	}
}
function fr(e, t) {
	var n = e.deps;
	if (n !== null) for (var r = t; r < n.length; r++) dr(e, n[r]);
}
function pr(e) {
	var t = e.f;
	if (!(t & 16384)) {
		it(e, g);
		var n = Yn, r = Un;
		Yn = e, Un = !(t & 96);
		try {
			t & 16777232 ? Nn(e) : Mn(e), jn(e);
			var i = ur(e);
			e.teardown = typeof i == "function" ? i : null, e.wv = rr;
		} finally {
			Un = r, Yn = n;
		}
	}
}
async function mr() {
	await Promise.resolve(), Ht();
}
function z(e) {
	var t = !!(e.f & 2);
	if (Hn?.add(e), Kn !== null && !qn && !(Yn !== null && Yn.f & 16384) && (Zn === null || !Zn.has(e))) {
		var r = Kn.deps;
		if (Kn.f & 2097152) e.rv < ir && (e.rv = ir, $n === null && r !== null && r[er] === e ? er++ : $n === null ? $n = [e] : $n.push(e));
		else {
			Kn.deps ??= [], n.call(Kn.deps, e) || Kn.deps.push(e);
			var i = e.reactions;
			i === null ? e.reactions = [Kn] : n.call(i, Kn) || i.push(Kn);
		}
	}
	if (Wn && Xt.has(e)) return Xt.get(e);
	if (t) {
		var a = e;
		if (Wn) {
			var o = a.v;
			return (!(a.f & 1024) && a.reactions !== null || gr(a)) && (o = Ot(a)), Xt.set(a, o), o;
		}
		var s = !(a.f & 512) && !qn && Kn !== null && (Un || !!(Kn.f & 512)), c = (a.f & x) === 0;
		cr(a) && (s && (a.f |= 512), kt(a)), s && !c && (jt(a), hr(a));
	}
	if (Nt?.has(e)) return Nt.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function hr(e) {
	if (e.f |= 512, e.deps !== null) for (let t of e.deps) (t.reactions ??= []).push(e), t.f & 2 && !(t.f & 512) && (jt(t), hr(t));
}
function gr(e) {
	if (e.v === ke) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if (Xt.has(t) || t.f & 2 && gr(t)) return !0;
	return !1;
}
function _r(e) {
	var t = qn;
	try {
		return qn = !0, e();
	} finally {
		qn = t;
	}
}
[.../* @__PURE__ */ "allowfullscreen.async.autofocus.autoplay.checked.controls.default.disabled.formnovalidate.indeterminate.inert.ismap.loop.multiple.muted.nomodule.novalidate.open.playsinline.readonly.required.reversed.seamless.selected.webkitdirectory.defer.disablepictureinpicture.disableremoteplayback".split(".")];
var vr = ["touchstart", "touchmove"];
function yr(e) {
	return vr.includes(e);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/events.js
var br = Symbol("events"), xr = /* @__PURE__ */ new Set(), Sr = /* @__PURE__ */ new Set();
function Cr(e) {
	if (!Ne) return;
	e.removeAttribute("onload"), e.removeAttribute("onerror");
	let t = e.__e;
	t !== void 0 && (e.__e = void 0, queueMicrotask(() => {
		e.isConnected && e.dispatchEvent(t);
	}));
}
function wr(e, t, n, r = {}) {
	function i(e) {
		if (r.capture || kr.call(t, e), !e.cancelBubble) return mt(() => n?.call(this, e));
	}
	return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? $e(() => {
		t.addEventListener(e, i, r);
	}) : t.addEventListener(e, i, r), i;
}
function Tr(e, t, n, r, i) {
	var a = {
		capture: r,
		passive: i
	}, o = wr(e, t, n, a);
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && Sn(() => {
		t.removeEventListener(e, o, a);
	});
}
function B(e, t, n) {
	(t[br] ??= {})[e] = n;
}
function Er(e) {
	for (var t = 0; t < e.length; t++) xr.add(e[t]);
	for (var n of Sr) n(e);
}
var Dr = null, Or = !1;
function kr(e) {
	var t = this, n = t.ownerDocument, r = e.type, a = e.composedPath?.() || [], o = a[0] || e.target;
	Dr = e, Or || (Or = !0, setTimeout(() => {
		Or = !1, Dr = null;
	}));
	var s = 0, c = Dr === e && e[br];
	if (c) {
		var l = a.indexOf(c);
		if (l !== -1 && (t === document || t === window)) {
			e[br] = t;
			return;
		}
		var u = a.indexOf(t);
		if (u === -1) return;
		l <= u && (s = l);
	}
	if (o = a[s] || e.target, o !== t) {
		i(e, "currentTarget", {
			configurable: !0,
			get() {
				return o || n;
			}
		});
		var d = Kn, f = Yn;
		Jn(null), Xn(null);
		try {
			for (var p, m = []; o !== null && o !== t;) {
				try {
					var h = o[br]?.[r];
					h != null && (!o.disabled || e.target === o) && h.call(o, e);
				} catch (e) {
					p ? m.push(e) : p = e;
				}
				if (e.cancelBubble) break;
				s++, o = s < a.length ? a[s] : null;
			}
			if (p) {
				for (let e of m) queueMicrotask(() => {
					throw e;
				});
				throw p;
			}
		} finally {
			e[br] = t, delete e.currentTarget, Jn(d), Xn(f);
		}
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/reconciler.js
var Ar = globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", { createHTML: (e) => e });
function jr(e) {
	return Ar?.createHTML(e) ?? e;
}
function Mr(e) {
	var t = gn("template");
	return t.innerHTML = jr(e.replaceAll("<!>", "<!---->")), t.content;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/template.js
function Nr(e, t) {
	var n = Yn;
	n.nodes === null && (n.nodes = {
		start: e,
		end: t,
		a: null,
		t: null
	});
}
/*#__NO_SIDE_EFFECTS__*/
function V(e, t) {
	var n = !!(t & 1), r = !!(t & 2), i, a = !e.startsWith("<!>");
	return () => {
		if (Ne) return Nr(D, null), D;
		i === void 0 && (i = Mr(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ fn(i)));
		var t = r || sn ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ fn(t), s = t.lastChild;
			Nr(o, s);
		} else Nr(t, t);
		return t;
	};
}
function Pr(e = "") {
	if (!Ne) {
		var t = dn(e + "");
		return Nr(t, t), t;
	}
	var n = D;
	return n.nodeType === 3 ? _n(n) : (n.before(n = dn()), Fe(n)), Nr(n, n), n;
}
function Fr() {
	if (Ne) return Nr(D, null), D;
	var e = document.createDocumentFragment(), t = document.createComment(""), n = dn();
	return e.append(t, n), Nr(t, n), e;
}
function H(e, t) {
	if (Ne) {
		var n = Yn;
		(!(n.f & 32768) || n.nodes.end === null) && (n.nodes.end = D), Ie();
		return;
	}
	e !== null && e.before(t);
}
//#endregion
//#region node_modules/svelte/src/internal/client/render.js
var Ir = !0;
function U(e, t) {
	var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
	n !== (e[pe] ??= e.nodeValue) && (e[pe] = n, e.nodeValue = `${n}`);
}
function Lr(e, t) {
	return zr(e, t);
}
var Rr = /* @__PURE__ */ new Map();
function zr(e, { target: t, anchor: n, props: i = {}, events: a, context: o, intro: s = !0, transformError: c }) {
	un();
	var l = void 0, u = Tn(() => {
		var u = n ?? t.appendChild(dn());
		vt(u, { pending: () => {} }, (t) => {
			Je({});
			var n = Ke;
			if (o && (n.c = o), a && (i.$$events = a), Ne && Nr(t, null), Ir = s, l = e(t, i) || {}, Ir = !0, Ne && (Yn.nodes.end = D, D === null || D.nodeType !== 8 || D.data !== "]")) throw je(), Oe;
			Ye();
		}, c);
		var d = /* @__PURE__ */ new Set(), f = (e) => {
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				if (!d.has(r)) {
					d.add(r);
					var i = yr(r);
					for (let e of [t, document]) {
						var a = Rr.get(e);
						a === void 0 && (a = /* @__PURE__ */ new Map(), Rr.set(e, a));
						var o = a.get(r);
						o === void 0 ? (e.addEventListener(r, kr, { passive: i }), a.set(r, 1)) : a.set(r, o + 1);
					}
				}
			}
		};
		return f(r(xr)), Sr.add(f), () => {
			for (var e of d) for (let n of [t, document]) {
				var r = Rr.get(n), i = r.get(e);
				--i == 0 ? (n.removeEventListener(e, kr), r.delete(e), r.size === 0 && Rr.delete(n)) : r.set(e, i);
			}
			Sr.delete(f), u !== n && u.parentNode?.removeChild(u);
		};
	});
	return Br.set(l, u), l;
}
var Br = /* @__PURE__ */ new WeakMap(), Vr = class {
	anchor;
	#e = /* @__PURE__ */ new Map();
	#t = /* @__PURE__ */ new Map();
	#n = /* @__PURE__ */ new Map();
	#r = /* @__PURE__ */ new Set();
	#i = !0;
	constructor(e, t = !0) {
		this.anchor = e, this.#i = t;
	}
	#a = (e) => {
		if (this.#e.has(e)) {
			var t = this.#e.get(e), n = this.#t.get(t);
			if (n) zn(n), this.#r.delete(t);
			else {
				var r = this.#n.get(t);
				r && (zn(r.effect), this.#t.set(t, r.effect), this.#n.delete(t), r.fragment.lastChild.remove(), this.anchor.before(r.fragment), n = r.effect);
			}
			for (let [t, n] of this.#e) {
				if (this.#e.delete(t), t === e) break;
				let r = this.#n.get(n);
				r && (Pn(r.effect), this.#n.delete(n));
			}
			for (let [e, r] of this.#t) {
				if (e === t || this.#r.has(e)) continue;
				let i = () => {
					if (Array.from(this.#e.values()).includes(e)) {
						var t = document.createDocumentFragment();
						Vn(r, t), t.append(dn()), this.#n.set(e, {
							effect: r,
							fragment: t
						});
					} else Pn(r);
					this.#r.delete(e), this.#t.delete(e);
				};
				this.#i || !n ? (this.#r.add(e), Ln(r, i, !1)) : i();
			}
		}
	};
	#o = (e) => {
		this.#e.delete(e);
		let t = Array.from(this.#e.values());
		for (let [e, n] of this.#n) t.includes(e) || (Pn(n.effect), this.#n.delete(e));
	};
	ensure(e, t) {
		var n = j, r = hn();
		if (t && !this.#t.has(e) && !this.#n.has(e)) {
			if (r) {
				var i = document.createDocumentFragment(), a = dn();
				i.append(a), this.#n.set(e, {
					effect: An(() => t(a)),
					fragment: i
				});
			} else this.#t.set(e, An(() => t(this.anchor)));
		}
		if (this.#e.set(n, e), r) {
			for (let [t, r] of this.#t) t === e ? n.unskip_effect(r) : n.skip_effect(r);
			for (let [t, r] of this.#n) t === e ? n.unskip_effect(r.effect) : n.skip_effect(r.effect);
			n.oncommit(this.#a), n.ondiscard(this.#o);
		} else Ne && (this.anchor = D), this.#a(n);
	}
};
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/if.js
function W(e, t, n = !1) {
	var r;
	Ne && (r = D, Ie());
	var i = new Vr(e), a = n ? C : 0;
	function o(e, t) {
		if (Ne) {
			var n = ze(r);
			if (e !== parseInt(n.substring(1))) {
				var a = Re();
				Fe(a), i.anchor = a, Pe(!1), i.ensure(e, t), Pe(!0);
				return;
			}
		}
		i.ensure(e, t);
	}
	kn(() => {
		var e = !1;
		t((t, n = 0) => {
			e = !0, o(n, t);
		}), e || o(-1, null);
	}, a);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/each.js
function Hr(e, t) {
	return t;
}
function Ur(e, t, n) {
	for (var i = [], a = t.length, o, s = t.length, c = 0; c < a; c++) {
		let n = t[c];
		Ln(n, () => {
			if (o) {
				if (o.pending.delete(n), o.done.add(n), o.pending.size === 0) {
					var t = e.outrogroups;
					Wr(e, r(o.done)), t.delete(o), t.size === 0 && (e.outrogroups = null);
				}
			} else --s;
		}, !1);
	}
	if (s === 0) {
		var l = i.length === 0 && n !== null && e.pending.size === 0;
		if (l) {
			var u = n, d = u.parentNode;
			mn(d), d.append(u), e.items.clear();
		}
		Wr(e, t, !l);
	} else o = {
		pending: new Set(t),
		done: /* @__PURE__ */ new Set()
	}, (e.outrogroups ??= /* @__PURE__ */ new Set()).add(o);
}
function Wr(e, t, n = !0) {
	var r;
	if (e.pending.size > 0) {
		r = /* @__PURE__ */ new Set();
		for (let t of e.pending.values()) for (let n of t) r.add(e.items.get(n).e);
	}
	for (var i = 0; i < t.length; i++) {
		var a = t[i];
		r?.has(a) ? (a.f |= ne, Vn(a, document.createDocumentFragment())) : Pn(t[i], n);
	}
}
var Gr;
function Kr(t, n, i, a, o, s = null) {
	var c = t, l = /* @__PURE__ */ new Map();
	if (n & 4) {
		var u = t;
		c = Ne ? Fe(/* @__PURE__ */ fn(u)) : u.appendChild(dn());
	}
	Ne && Ie();
	var d = null, f = /* @__PURE__ */ Et(() => {
		var t = i();
		return e(t) ? t : t == null ? [] : r(t);
	}), p, m = /* @__PURE__ */ new Map(), h = !0;
	function g(e) {
		v.effect.f & 16384 || (v.pending.delete(e), v.fallback = d, Jr(v, p, c, n, a), d !== null && (p.length === 0 ? d.f & 33554432 ? (d.f ^= ne, Xr(d, null, c)) : zn(d) : Ln(d, () => {
			d = null;
		})));
	}
	function _(e) {
		v.pending.delete(e);
	}
	var v = {
		effect: kn(() => {
			p = z(f);
			var e = p.length;
			let t = !1;
			Ne && ze(c) === "[!" != (e === 0) && (c = Re(), Fe(c), Pe(!1), t = !0);
			for (var r = /* @__PURE__ */ new Set(), u = j, v = hn(), y = 0; y < e; y += 1) {
				Ne && D.nodeType === 8 && D.data === "]" && (c = D, t = !0, Pe(!1));
				var b = p[y], x = a(b, y), S = h ? null : l.get(x);
				S ? (S.v && en(S.v, b), S.i && en(S.i, y), v && u.unskip_effect(S.e)) : (S = Yr(l, h ? c : Gr ??= dn(), b, x, y, o, n, i), h || (S.e.f |= ne), l.set(x, S)), r.add(x);
			}
			if (e === 0 && s && !d && (h ? d = An(() => s(c)) : (d = An(() => s(Gr ??= dn())), d.f |= ne)), e > r.size && ve("", "", ""), Ne && e > 0 && Fe(Re()), !h) {
				if (m.set(u, r), v) {
					for (let [e, t] of l) r.has(e) || u.skip_effect(t.e);
					u.oncommit(g), u.ondiscard(_);
				} else g(u);
			}
			t && Pe(!0), z(f);
		}),
		flags: n,
		items: l,
		pending: m,
		outrogroups: null,
		fallback: d
	};
	h = !1, Ne && (c = D);
}
function qr(e) {
	for (; e !== null && !(e.f & 32);) e = e.next;
	return e;
}
function Jr(e, t, n, i, a) {
	var o = !!(i & 8), s = t.length, c = e.items, l = qr(e.effect.first), u, d = null, f, p = [], m = [], h, g, _, v;
	if (o) for (v = 0; v < s; v += 1) h = t[v], g = a(h, v), _ = c.get(g).e, _.f & 33554432 || (_.nodes?.a?.measure(), (f ??= /* @__PURE__ */ new Set()).add(_));
	for (v = 0; v < s; v += 1) {
		if (h = t[v], g = a(h, v), _ = c.get(g).e, e.outrogroups !== null) for (let t of e.outrogroups) t.pending.delete(_), t.done.delete(_);
		if (_.f & 8192 && (zn(_), o && (_.nodes?.a?.unfix(), (f ??= /* @__PURE__ */ new Set()).delete(_))), _.f & 33554432) {
			if (_.f ^= ne, _ === l) Xr(_, null, n);
			else {
				var y = d ? d.next : l;
				_ === e.effect.last && (e.effect.last = _.prev), _.prev && (_.prev.next = _.next), _.next && (_.next.prev = _.prev), Zr(e, d, _), Zr(e, _, y), Xr(_, y, n), d = _, p = [], m = [], l = qr(d.next);
				continue;
			}
		}
		if (_ !== l) {
			if (u !== void 0 && u.has(_)) {
				if (p.length < m.length) {
					var b = m[0], x;
					d = b.prev;
					var S = p[0], C = p[p.length - 1];
					for (x = 0; x < p.length; x += 1) Xr(p[x], b, n);
					for (x = 0; x < m.length; x += 1) u.delete(m[x]);
					Zr(e, S.prev, C.next), Zr(e, d, S), Zr(e, C, b), l = b, d = C, --v, p = [], m = [];
				} else u.delete(_), Xr(_, l, n), Zr(e, _.prev, _.next), Zr(e, _, d === null ? e.effect.first : d.next), Zr(e, d, _), d = _;
				continue;
			}
			for (p = [], m = []; l !== null && l !== _;) (u ??= /* @__PURE__ */ new Set()).add(l), m.push(l), l = qr(l.next);
			if (l === null) continue;
		}
		_.f & 33554432 || p.push(_), d = _, l = qr(_.next);
	}
	if (e.outrogroups !== null) {
		for (let t of e.outrogroups) t.pending.size === 0 && (Wr(e, r(t.done)), e.outrogroups?.delete(t));
		e.outrogroups.size === 0 && (e.outrogroups = null);
	}
	if (l !== null || u !== void 0) {
		var ee = [];
		if (u !== void 0) for (_ of u) _.f & 8192 || ee.push(_);
		for (; l !== null;) !(l.f & 8192) && l !== e.fallback && ee.push(l), l = qr(l.next);
		var te = ee.length;
		if (te > 0) {
			var re = i & 4 && s === 0 ? n : null;
			if (o) {
				for (v = 0; v < te; v += 1) ee[v].nodes?.a?.measure();
				for (v = 0; v < te; v += 1) ee[v].nodes?.a?.fix();
			}
			Ur(e, ee, re);
		}
	}
	o && $e(() => {
		if (f !== void 0) for (_ of f) _.nodes?.a?.apply();
	});
}
function Yr(e, t, n, r, i, a, o, s) {
	var c = o & 1 ? o & 16 ? Qt(n) : /* @__PURE__ */ $t(n, !1, !1) : null, l = o & 2 ? Qt(i) : null;
	return {
		v: c,
		i: l,
		e: An(() => (a(t, c ?? n, l ?? i, s), () => {
			e.delete(r);
		}))
	};
}
function Xr(e, t, n) {
	if (e.nodes) for (var r = e.nodes.start, i = e.nodes.end, a = t && !(t.f & 33554432) ? t.nodes.start : n; r !== null;) {
		var o = /* @__PURE__ */ pn(r);
		if (a.before(r), r === i) return;
		r = o;
	}
}
function Zr(e, t, n) {
	t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
function G(e, t, n = !1, r = !1, i = !1, a = !1) {
	var o = e, s = "";
	if (n) {
		var c = e;
		Ne && (o = Fe(/* @__PURE__ */ fn(c)));
	}
	R(() => {
		var e = Yn;
		if (s === (s = t() ?? "")) {
			Ne && Ie();
			return;
		}
		if (n && !Ne) {
			e.nodes = null, c.innerHTML = s, s !== "" && Nr(/* @__PURE__ */ fn(c), c.lastChild);
			return;
		}
		if (e.nodes !== null && (Fn(e.nodes.start, e.nodes.end), e.nodes = null), s !== "") {
			if (Ne) {
				for (var a = D.data, l = Ie(), u = l; l !== null && (l.nodeType !== 8 || l.data !== "");) u = l, l = /* @__PURE__ */ pn(l);
				if (l === null) throw je(), Oe;
				Nr(D, u), o = Fe(l);
				return;
			}
			var d = gn(r ? "svg" : i ? "math" : "template", r ? Ae : i ? T : void 0);
			d.innerHTML = s;
			var f = r || i ? d : d.content;
			if (Nr(/* @__PURE__ */ fn(f), f.lastChild), r || i) for (; /* @__PURE__ */ fn(f);) o.before(/* @__PURE__ */ fn(f));
			else o.before(f);
		}
	});
}
//#endregion
//#region node_modules/svelte/src/internal/client/timing.js
var Qr = () => performance.now(), $r = {
	tick: (e) => requestAnimationFrame(e),
	now: () => Qr(),
	tasks: /* @__PURE__ */ new Set()
};
//#endregion
//#region node_modules/svelte/src/internal/client/loop.js
function ei() {
	let e = $r.now();
	$r.tasks.forEach((t) => {
		t.c(e) || ($r.tasks.delete(t), t.f());
	}), $r.tasks.size !== 0 && $r.tick(ei);
}
function ti(e) {
	let t;
	return $r.tasks.size === 0 && $r.tick(ei), {
		promise: new Promise((n) => {
			$r.tasks.add(t = {
				c: e,
				f: n
			});
		}),
		abort() {
			$r.tasks.delete(t);
		}
	};
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/transitions.js
function ni(e, t) {
	mt(() => {
		e.dispatchEvent(new CustomEvent(t));
	});
}
function ri(e) {
	if (e === "float") return "cssFloat";
	if (e === "offset") return "cssOffset";
	if (e.startsWith("--")) return e;
	let t = e.split("-");
	return t.length === 1 ? t[0] : t[0] + t.slice(1).map((e) => e[0].toUpperCase() + e.slice(1)).join("");
}
function ii(e) {
	let t = {}, n = e.split(";");
	for (let e of n) {
		let [n, r] = e.split(":");
		if (!n || r === void 0) break;
		let i = ri(n.trim());
		t[i] = r.trim();
	}
	return t;
}
var ai = (e) => e;
function oi(e, t, n, r) {
	var i = !!(e & 1), a = !!(e & 2), o = i && a, s = !!(e & 4), c = o ? "both" : i ? "in" : "out", l, u = t.inert, d = t.style.overflow, f, p;
	function m() {
		return mt(() => l ??= n()(t, r?.() ?? {}, { direction: c }));
	}
	var h = {
		is_global: s,
		in() {
			if (t.inert = u, !i) {
				p?.abort(), p?.reset?.();
				return;
			}
			a || f?.abort(), f = si(t, m(), p, 1, () => {
				ni(t, "introstart");
			}, () => {
				ni(t, "introend"), f?.abort(), f = l = void 0, t.style.overflow = d;
			});
		},
		out(e) {
			if (!a) {
				e?.(), l = void 0;
				return;
			}
			t.inert = !0, p = si(t, m(), f, 0, () => {
				ni(t, "outrostart");
			}, () => {
				ni(t, "outroend"), e?.();
			});
		},
		stop: () => {
			f?.abort(), p?.abort();
		}
	}, g = Yn;
	if ((g.nodes.t ??= []).push(h), i && Ir) {
		var _ = s;
		if (!_) {
			for (var v = g.parent; v && v.f & 65536;) for (; (v = v.parent) && !(v.f & 16););
			_ = !v || !!(v.f & 32768);
		}
		_ && En(() => {
			_r(() => h.in());
		});
	}
}
function si(e, t, n, r, i, a) {
	var o = r === 1;
	if (d(t)) {
		var s, c = !1;
		return $e(() => {
			c || (s = si(e, t({ direction: o ? "in" : "out" }), n, r, i, a));
		}), {
			abort: () => {
				c = !0, s?.abort();
			},
			deactivate: () => s.deactivate(),
			reset: () => s.reset(),
			t: () => s.t()
		};
	}
	if (n?.deactivate(), !t?.duration && !t?.delay) return i(), a(), {
		abort: f,
		deactivate: f,
		reset: f,
		t: () => r
	};
	let { delay: l = 0, css: u, tick: p, easing: m = ai } = t;
	var h = [];
	if (o && n === void 0 && (p && p(0, 1), u)) {
		var g = ii(u(0, 1));
		h.push(g, g);
	}
	var _ = () => 1 - r, v = e.animate(h, {
		duration: l,
		fill: "forwards"
	});
	return v.onfinish = () => {
		v.cancel(), i();
		var o = n?.t() ?? 1 - r;
		n?.abort();
		var s = r - o, c = t.duration * Math.abs(s), l = [];
		if (c > 0) {
			var d = !1;
			if (u) for (var f = Math.ceil(c / (1e3 / 60)), h = 0; h <= f; h += 1) {
				var g = o + s * m(h / f), y = ii(u(g, 1 - g));
				l.push(y), d ||= y.overflow === "hidden";
			}
			d && (e.style.overflow = "hidden"), _ = () => {
				var e = v.currentTime;
				return o + s * m(e / c);
			}, p && ti(() => {
				if (v.playState !== "running") return !1;
				var e = _();
				return p(e, 1 - e), !0;
			});
		}
		v = e.animate(l, {
			duration: c,
			fill: "forwards"
		}), v.onfinish = () => {
			_ = () => r, p?.(r, 1 - r), a();
		};
	}, {
		abort: () => {
			v && (v.cancel(), v.effect = null, v.onfinish = f);
		},
		deactivate: () => {
			a = f;
		},
		reset: () => {
			r === 0 && p?.(1, 0);
		},
		t: () => _()
	};
}
//#endregion
//#region node_modules/svelte/src/internal/shared/attributes.js
var ci = [..." 	\n\r\f\xA0\v﻿"];
function li(e, t, n) {
	var r = e == null ? "" : "" + e;
	if (t && (r = r ? r + " " + t : t), n) {
		for (var i of Object.keys(n)) if (n[i]) r = r ? r + " " + i : i;
		else if (r.length) for (var a = i.length, o = 0; (o = r.indexOf(i, o)) >= 0;) {
			var s = o + a;
			(o === 0 || ci.includes(r[o - 1])) && (s === r.length || ci.includes(r[s])) ? r = (o === 0 ? "" : r.substring(0, o)) + r.substring(s + 1) : o = s;
		}
	}
	return r === "" ? null : r;
}
function ui(e, t = !1) {
	var n = t ? " !important;" : ";", r = "";
	for (var i of Object.keys(e)) {
		var a = e[i];
		a != null && a !== "" && (r += " " + i + ": " + a + n);
	}
	return r;
}
function di(e) {
	return e[0] !== "-" || e[1] !== "-" ? e.toLowerCase() : e;
}
function fi(e, t) {
	if (t) {
		var n = "", r, i;
		if (Array.isArray(t) ? (r = t[0], i = t[1]) : r = t, e) {
			e = String(e).replaceAll(/\/\*.*?\*\//g, "").trim();
			var a = !1, o = 0, s = !1, c = [];
			r && c.push(...Object.keys(r).map(di)), i && c.push(...Object.keys(i).map(di));
			var l = 0, u = -1;
			let t = e.length;
			for (var d = 0; d < t; d++) {
				var f = e[d];
				if (s ? f === "/" && e[d - 1] === "*" && (s = !1) : a ? a === f && (a = !1) : f === "/" && e[d + 1] === "*" ? s = !0 : f === "\"" || f === "'" ? a = f : f === "(" ? o++ : f === ")" && o--, !s && a === !1 && o === 0) {
					if (f === ":" && u === -1) u = d;
					else if (f === ";" || d === t - 1) {
						if (u !== -1) {
							var p = di(e.substring(l, u).trim());
							if (!c.includes(p)) {
								f !== ";" && d++;
								var m = e.substring(l, d).trim();
								n += " " + m + ";";
							}
						}
						l = d + 1, u = -1;
					}
				}
			}
		}
		return r && (n += ui(r)), i && (n += ui(i, !0)), n = n.trim(), n === "" ? null : n;
	}
	return e == null ? null : String(e);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/class.js
function pi(e, t, n, r, i, a) {
	var o = e[de];
	if (Ne || o !== n || o === void 0) {
		var s = li(n, r, a);
		(!Ne || s !== e.getAttribute("class")) && (s == null ? e.removeAttribute("class") : t ? e.className = s : e.setAttribute("class", s)), e[de] = n;
	} else if (a && i !== a) for (var c in a) {
		var l = !!a[c];
		(i == null || l !== !!i[c]) && e.classList.toggle(c, l);
	}
	return a;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/style.js
function mi(e, t = {}, n, r) {
	for (var i in n) {
		var a = n[i];
		t[i] !== a && (n[i] == null ? e.style.removeProperty(i) : e.style.setProperty(i, a, r));
	}
}
function hi(e, t, n, r) {
	var i = e[fe];
	if (Ne || i !== t) {
		var a = fi(t, r);
		(!Ne || a !== e.getAttribute("style")) && (a == null ? e.removeAttribute("style") : e.style.cssText = a), e[fe] = t;
	} else r && (Array.isArray(r) ? (mi(e, n?.[0], r[0]), mi(e, n?.[1], r[1], "important")) : mi(e, n, r));
	return r;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/attributes.js
var gi = Symbol("is custom element"), _i = Symbol("is html"), vi = ge ? "link" : "LINK", yi = ge ? "progress" : "PROGRESS";
function K(e) {
	if (Ne) {
		var t = !1, n = () => {
			if (!t) {
				if (t = !0, e.hasAttribute("value")) {
					var n = e.value;
					J(e, "value", null), e.value = n;
				}
				if (e.hasAttribute("checked")) {
					var r = e.checked;
					J(e, "checked", null), e.checked = r;
				}
			}
		};
		e[me] = n, $e(n), pt();
	}
}
function q(e, t) {
	var n = xi(e);
	n.value !== (n.value = t ?? void 0) && (e.value !== t || t === 0 && e.nodeName === yi) && (e.value = t ?? "");
}
function bi(e, t) {
	var n = xi(e);
	n.checked !== (n.checked = t ?? void 0) && (e.checked = t);
}
function J(e, t, n, r) {
	var i = xi(e);
	Ne && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === vi) || i[t] !== (i[t] = n) && (t === "loading" && (e[le] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && Ci(e).includes(t) ? e[t] = n : e.setAttribute(t, n));
}
function xi(e) {
	return e[ue] ??= {
		[gi]: e.nodeName.includes("-"),
		[_i]: e.namespaceURI === w
	};
}
var Si = /* @__PURE__ */ new Map();
function Ci(e) {
	var t = e.getAttribute("is") || e.nodeName, n = Si.get(t);
	if (n) return n;
	Si.set(t, n = []);
	for (var r, i = e, a = Element.prototype; a !== i;) {
		for (var s in r = o(i), r) r[s].set && s !== "innerHTML" && s !== "textContent" && s !== "innerText" && n.push(s);
		i = l(i);
	}
	return n;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/input.js
function wi(e, t, n = t) {
	var r = /* @__PURE__ */ new WeakSet();
	ht(e, "input", async (i) => {
		var a = i ? e.defaultValue : e.value;
		if (a = Ti(e) ? Ei(a) : a, n(a), j !== null && r.add(j), await mr(), a !== (a = t())) {
			var o = e.selectionStart, s = e.selectionEnd, c = e.value.length;
			if (e.value = a ?? "", s !== null) {
				var l = e.value.length;
				o === s && s === c && l > c ? (e.selectionStart = l, e.selectionEnd = l) : (e.selectionStart = o, e.selectionEnd = Math.min(s, l));
			}
		}
	}), (Ne && e.defaultValue !== e.value || _r(t) == null && e.value) && (n(Ti(e) ? Ei(e.value) : e.value), j !== null && r.add(j)), On(() => {
		var n = t();
		if (e === document.activeElement) {
			var i = j;
			if (r.has(i)) return;
		}
		Ti(e) && n === Ei(e.value) || e.type === "date" && !n && !e.value || n !== e.value && (e.value = n ?? "");
	});
}
function Ti(e) {
	var t = e.type;
	return t === "number" || t === "range";
}
function Ei(e) {
	return e === "" ? null : +e;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/this.js
function Di(e, t) {
	return e === t || e?.[se] === t;
}
function Oi(e = {}, t, n, r) {
	var i = Ke.r, a = Yn;
	return En(() => {
		var o, s;
		return On(() => {
			o = s, s = r?.() || [], _r(() => {
				Di(n(...s), e) || (t(e, ...s), o && Di(n(...o), e) && t(null, ...o));
			});
		}), () => {
			let r = a;
			for (; r !== i && r.parent !== null && r.parent.f & 33554432;) r = r.parent;
			let o = () => {
				s && Di(n(...s), e) && t(null, ...s);
			}, c = r.teardown;
			r.teardown = () => {
				o(), c?.();
			};
		};
	}), e;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/props.js
function ki(e, t, n, r) {
	var i = !0, o = !!(n & 8), s = !!(n & 16), c = r, l = !0, u = void 0, d = () => s && i ? (u ??= /* @__PURE__ */ wt(r), z(u)) : (l && (l = !1, c = s ? _r(r) : r), c);
	let f;
	if (o) {
		var p = se in e || ce in e;
		f = a(e, t)?.set ?? (p && t in e ? (n) => e[t] = n : void 0);
	}
	var m, h = !1;
	o ? [m, h] = lt(() => e[t]) : m = e[t], m === void 0 && r !== void 0 && (m = d(), f && (i && Ce(t), f(m)));
	var g = i ? () => {
		var n = e[t];
		return n === void 0 ? d() : (l = !0, n);
	} : () => {
		var n = e[t];
		return n !== void 0 && (c = void 0), n === void 0 ? c : n;
	};
	if (i && !(n & 4)) return g;
	if (f) {
		var _ = e.$$legacy;
		return (function(e, t) {
			return arguments.length > 0 ? ((!i || !t || _ || h) && f(t ? g() : e), e) : g();
		});
	}
	var v = !1, y = (n & 1 ? wt : Et)(() => (v = !1, g()));
	o && z(y);
	var b = Yn;
	return (function(e, t) {
		if (arguments.length > 0) {
			let n = t ? z(y) : i && o ? an(e) : e;
			return P(y, n), v = !0, c !== void 0 && (c = n), e;
		}
		return Wn && v || b.f & 16384 ? y.v : z(y);
	});
}
var Ai = {
	lang: "nb",
	strings: {
		"nav.toFront": "Til forsiden",
		"nav.toLightTheme": "Bytt til lyst tema",
		"nav.toDarkTheme": "Bytt til mørkt tema",
		"nav.menu": "Meny",
		"nav.submenuFor": "Undermeny for {label}",
		"nav.toTop": "Til toppen",
		"nav.toTopFull": "Til toppen av siden",
		"lightbox.prev": "Forrige bilde",
		"lightbox.next": "Neste bilde",
		"lightbox.close": "Lukk",
		"footer.readMore": "Les mer",
		"footer.newsletter.subscribe": "Meld på",
		"footer.newsletter.success": "Takk, du er påmeldt!",
		"footer.newsletter.emailPlaceholder": "din@epost.no",
		"footer.newsletter.emailLabel": "E-postadresse",
		"footer.newsletter.invalidEmail": "Skriv inn en gyldig e-postadresse.",
		"footer.newsletter.sendFailed": "Kunne ikke sende akkurat nå. Prøv igjen senere.",
		"footer.newsletter.missingTarget": "Nyhetsbrevet mangler mottaker eller endepunkt.",
		"footer.newsletter.mailtoSubject": "Nyhetsbrev-påmelding",
		"footer.newsletter.mailtoBody": "Meld på nyhetsbrevet: {email}",
		"gallery.prevImages": "Forrige bilder",
		"gallery.nextImages": "Neste bilder",
		"gallery.prevImage": "Forrige bilde",
		"gallery.nextImage": "Neste bilde",
		"gallery.imageN": "Bilde {n}",
		"video.unknownUrl": "Ukjent videolenke (YouTube og Vimeo støttes)",
		"video.emptyHint": "Lim inn en YouTube- eller Vimeo-lenke i Egenskaper",
		"share.share": "Del på {service}",
		"share.email": "Del på e-post",
		"share.copy": "Kopier lenke",
		"share.copied": "Kopiert!",
		"shop.addToCart": "Legg i handlekurv",
		"shop.added": "Lagt i kurven!",
		"shop.memberPrice": "Medlem: {price}",
		"shop.cart": "Handlekurv",
		"shop.cartEmpty": "Handlekurven er tom.",
		"shop.total": "Sum",
		"shop.checkout": "Til kassen",
		"shop.close": "Lukk",
		"shop.remove": "Fjern varen",
		"shop.increase": "Flere",
		"shop.decrease": "Færre",
		"shop.name": "Navn",
		"shop.email": "E-post",
		"shop.phone": "Telefon",
		"shop.comment": "Kommentar",
		"shop.sendOrder": "Send bestilling",
		"shop.orderSubject": "Bestilling fra {site}",
		"shop.orderSent": "Takk! Bestillingen er sendt.",
		"shop.orderDraft": "E-postutkastet er åpnet - send det for å fullføre bestillingen.",
		"shop.fillRequired": "Fyll ut navn og en gyldig e-postadresse.",
		"shop.sendFailed": "Kunne ikke sende akkurat nå. Prøv igjen senere.",
		"shop.missingTarget": "Kassen mangler mottaker eller endepunkt.",
		"shop.vippsHint": "Betaling: Vipps til {number}.",
		"shop.quickView": "Vis produktet",
		"shop.payWithVipps": "Betal med Vipps",
		"shop.vippsUnavailable": "Betaling er ikke satt opp for denne siden ennå.",
		"countdown.days": "dager",
		"countdown.hours": "timer",
		"countdown.minutes": "minutter",
		"countdown.seconds": "sekunder",
		"render.missingPlugin": "Blokktypen '{type}' er ikke tilgjengelig (mangler plugin eller nyere Urd?)"
	},
	dates: {
		months: [
			"januar",
			"februar",
			"mars",
			"april",
			"mai",
			"juni",
			"juli",
			"august",
			"september",
			"oktober",
			"november",
			"desember"
		],
		monthsShort: [
			"jan",
			"feb",
			"mar",
			"apr",
			"mai",
			"jun",
			"jul",
			"aug",
			"sep",
			"okt",
			"nov",
			"des"
		],
		weekdays: [
			"mandag",
			"tirsdag",
			"onsdag",
			"torsdag",
			"fredag",
			"lørdag",
			"søndag"
		],
		weekdaysShort: [
			"man",
			"tir",
			"ons",
			"tor",
			"fre",
			"lør",
			"søn"
		]
	}
}, ji = [
	"nb",
	"nn",
	"en-GB",
	"se",
	"tr"
], Mi = /^[a-z]{2,3}(?:-[A-Za-z0-9]{2,8})*$/, Ni = {
	nb: [
		"no",
		"nor",
		"nb",
		"nob"
	],
	nn: ["nn", "nno"],
	se: [
		"se",
		"sme",
		"smj",
		"sma"
	],
	tr: ["tr", "tur"],
	"en-GB": ["en", "eng"]
};
function Pi(e) {
	let t = String(e ?? "").trim().toLowerCase();
	for (let [e, n] of Object.entries(Ni)) if (n.some((e) => t === e || t.startsWith(`${e}-`))) return e;
	return null;
}
function Fi(e) {
	return ji.includes(String(e ?? ""));
}
function Ii(e) {
	let t = [];
	if (!Array.isArray(e)) return ["languages must be a list"];
	for (let n of e) {
		if (!n || typeof n != "object" || Array.isArray(n)) {
			t.push("languages: every entry must be an object");
			continue;
		}
		let e = String(n.code ?? "");
		Mi.test(e) ? Fi(e) && t.push(`languages: '${e}' is built into Urd and cannot be overridden`) : t.push(`languages: '${e}' is not a valid language code`), (typeof n.name != "string" || !n.name.trim()) && t.push(`languages/${e}: name is missing (the language's own name)`);
		for (let r of ["site", "admin"]) n[r] !== void 0 && typeof n[r] != "boolean" && t.push(`languages/${e}: ${r} must be a boolean`);
		n.site !== !0 && n.admin !== !0 && t.push(`languages/${e}: must cover site, admin or both`);
	}
	return t;
}
function Li(e) {
	let t = Pi(e);
	if (t) return t;
	let n = String(e ?? "").trim();
	return Mi.test(n) ? n : "nb";
}
async function Ri(e, t) {
	try {
		return await (await import(
			/* @vite-ignore */
			"/assets/urd/language-packs.js"
)).loadPackStrings(e, t);
	} catch {
		return null;
	}
}
({ ...Ai.strings });
var zi = {
	lang: "nb",
	dict: {}
};
function Bi(e, t) {
	if (!t) return e;
	let n = e;
	for (let [e, r] of Object.entries(t)) n = n.replaceAll(`{${e}}`, String(r));
	return n;
}
function Y(e, t) {
	return Bi(zi.dict[e] ?? e, t);
}
function Vi(e) {
	let t = `api.${e?.code}`;
	return e?.code && zi.dict[t] !== void 0 ? Bi(zi.dict[t], e) : e?.error ?? null;
}
function Hi() {
	return zi.lang;
}
function Ui() {
	let e = null;
	try {
		e = localStorage.getItem("urd-admin-lang");
	} catch {}
	if (e) return Li(e);
	for (let e of navigator.languages ?? [navigator.language]) {
		let t = Pi(e);
		if (t) return t;
	}
	return "en-GB";
}
var Wi;
new Promise((e) => {
	Wi = e;
});
async function Gi(e = Ui()) {
	let t = async (e) => (await import(
		/* @vite-ignore */
		`/assets/urd/locales/admin/${e}.js`
)).default.strings;
	zi.lang = Li(e);
	let n = Fi(zi.lang);
	try {
		Object.assign(zi.dict, await t("nb")), n && zi.lang !== "nb" && Object.assign(zi.dict, await t(zi.lang));
	} catch {}
	if (!n) {
		let e = await Ri(zi.lang, "admin");
		e ? Object.assign(zi.dict, e) : zi.lang = "nb";
	}
	return Wi(zi.lang), zi.lang;
}
//#endregion
//#region node_modules/svelte/src/internal/disclose-version.js
typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add("5");
//#endregion
//#region node_modules/svelte/src/transition/index.js
function Ki(e) {
	let t = e - 1;
	return t * t * t + 1;
}
function qi(e) {
	let t = typeof e == "string" && e.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);
	return t ? [parseFloat(t[1]), t[2] || "px"] : [e, "px"];
}
function Ji(e, { delay: t = 0, duration: n = 400, easing: r = Ki, x: i = 0, y: a = 0, opacity: o = 0 } = {}) {
	let s = getComputedStyle(e), c = +s.opacity, l = s.transform === "none" ? "" : s.transform, u = c * (1 - o), [d, f] = qi(i), [p, m] = qi(a);
	return {
		delay: t,
		duration: n,
		easing: r,
		css: (e, t) => `
			transform: ${l} translate(${(1 - e) * d}${f}, ${(1 - e) * p}${m});
			opacity: ${c - u * t}`
	};
}
//#endregion
//#region src/lib/draftStore.js
function Yi(e, t, n, r) {
	if (r) {
		let t = localStorage.getItem(r);
		if (t !== null) {
			if (localStorage.getItem(e) === null) try {
				localStorage.setItem(e, t);
			} catch {}
			localStorage.getItem(e) !== null && localStorage.removeItem(r);
		}
	}
	let i = t(), a = JSON.stringify(i), o = JSON.parse(a), s = localStorage.getItem(e);
	if (s) try {
		o = JSON.parse(s);
	} catch {
		localStorage.removeItem(e);
	}
	return {
		get data() {
			return o;
		},
		save() {
			let t = JSON.stringify(o);
			if (t === a) return localStorage.removeItem(e), !0;
			try {
				return localStorage.setItem(e, t), !0;
			} catch (e) {
				return n?.(e), !1;
			}
		},
		reset() {
			return localStorage.removeItem(e), o = JSON.parse(a), o;
		},
		replace(e) {
			return o = e, o;
		},
		amendBaseline(e) {
			let t = JSON.parse(a);
			e(t), a = JSON.stringify(t);
		},
		hasDraft() {
			return localStorage.getItem(e) !== null;
		}
	};
}
//#endregion
//#region src/lib/ColorPicker.svelte
var Xi = /* @__PURE__ */ V("<button type=\"button\" class=\"cp-clear svelte-zxiloo\">×</button>"), Zi = /* @__PURE__ */ V("<button type=\"button\" class=\"cp-eye svelte-zxiloo\"><svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M18 2l4 4-3 3-4-4 3-3z\"></path><path d=\"M15 5L4 16l-1 5 5-1L19 9\"></path></svg></button>"), Qi = /* @__PURE__ */ V("<input type=\"number\" min=\"0\" max=\"255\" class=\"svelte-zxiloo\"/>"), $i = /* @__PURE__ */ V("<button type=\"button\"></button>"), ea = /* @__PURE__ */ V("<span class=\"cp-label svelte-zxiloo\"> <!></span> <span class=\"cp-tokens svelte-zxiloo\"></span>", 1), ta = /* @__PURE__ */ V("<span class=\"cp-saved svelte-zxiloo\"><button type=\"button\" class=\"cp-token svelte-zxiloo\"></button> <button type=\"button\" class=\"cp-del svelte-zxiloo\">×</button></span>"), na = /* @__PURE__ */ V("<span class=\"cp-tokens svelte-zxiloo\"></span>"), ra = /* @__PURE__ */ V("<button type=\"button\" class=\"cp-token svelte-zxiloo\"></button>"), ia = /* @__PURE__ */ V("<span class=\"cp-label svelte-zxiloo\"> </span> <span class=\"cp-tokens svelte-zxiloo\"></span>", 1), aa = /* @__PURE__ */ V("<div class=\"cp-pop svelte-zxiloo\"><div class=\"cp-sv svelte-zxiloo\"><span class=\"cp-cursor svelte-zxiloo\"></span></div> <input class=\"cp-hue svelte-zxiloo\" type=\"range\" min=\"0\" max=\"360\" step=\"1\"/> <input class=\"cp-alpha svelte-zxiloo\" type=\"range\" min=\"0\" max=\"100\" step=\"1\"/> <span class=\"cp-row svelte-zxiloo\"><span class=\"cp-preview svelte-zxiloo\"></span> <input class=\"cp-hex svelte-zxiloo\" spellcheck=\"false\"/> <!></span> <span class=\"cp-row cp-rgb svelte-zxiloo\"></span> <!> <span class=\"cp-label cp-label-row svelte-zxiloo\"> <button type=\"button\" class=\"cp-add svelte-zxiloo\">+</button></span> <!> <!></div>"), oa = /* @__PURE__ */ V("<span class=\"cp svelte-zxiloo\"><button type=\"button\"></button> <!> <!></span>");
function sa(e, t) {
	Je(t, !0);
	let n = ki(t, "value", 3, "#000000"), r = ki(t, "tokens", 19, () => []), i = ki(t, "label", 19, () => Y("cp.pickColor")), a = ki(t, "allowClear", 3, !1), o = "urd-recent-colors", s = "urd-saved-colors", c = () => {
		let e = r().find(([e]) => e === n());
		return e ? e[1] : n();
	}, l = () => r().find(([e]) => e === n())?.[0] ?? null, u = /* @__PURE__ */ N(an([])), d = /* @__PURE__ */ N(an([])), f = "", p = "", m = /* @__PURE__ */ N(null), g = /* @__PURE__ */ N(!1), _ = /* @__PURE__ */ N(an({
		top: 0,
		left: 0
	})), v = /* @__PURE__ */ N(0), y = /* @__PURE__ */ N(0), b = /* @__PURE__ */ N(1), x = /* @__PURE__ */ N(1), S = /* @__PURE__ */ N("#000000");
	function C(e) {
		let t = /^#?([0-9a-f]{6})([0-9a-f]{2})?$/i.exec(String(e).trim());
		if (!t) return null;
		let n = parseInt(t[1], 16), r = t[2] ? parseInt(t[2], 16) / 255 : 1;
		return [
			n >> 16 & 255,
			n >> 8 & 255,
			n & 255,
			r
		];
	}
	let ee = (e, t, n) => "#" + [
		e,
		t,
		n
	].map((e) => e.toString(16).padStart(2, "0")).join("");
	function te(e, t, n) {
		e /= 255, t /= 255, n /= 255;
		let r = Math.max(e, t, n), i = r - Math.min(e, t, n), a = 0;
		return i && (a = r === e ? (t - n) / i % 6 : r === t ? (n - e) / i + 2 : (e - t) / i + 4, a *= 60, a < 0 && (a += 360)), [
			a,
			r ? i / r : 0,
			r
		];
	}
	function ne(e, t, n) {
		let r = n * t, i = r * (1 - Math.abs(e / 60 % 2 - 1)), a = n - r, [o, s, c] = e < 60 ? [
			r,
			i,
			0
		] : e < 120 ? [
			i,
			r,
			0
		] : e < 180 ? [
			0,
			r,
			i
		] : e < 240 ? [
			0,
			i,
			r
		] : e < 300 ? [
			i,
			0,
			r
		] : [
			r,
			0,
			i
		];
		return [
			Math.round((o + a) * 255),
			Math.round((s + a) * 255),
			Math.round((c + a) * 255)
		];
	}
	function re() {
		return ee(...ne(z(v), z(y), z(b)));
	}
	function ie() {
		let e = re();
		return z(x) >= .995 ? e : e + Math.round(z(x) * 255).toString(16).padStart(2, "0");
	}
	function ae() {
		P(S, ie(), !0), p = z(S), t.onchange?.(z(S));
	}
	function oe(e) {
		let t = C(e);
		return t ? (((e) => {
			var t = h(e, 3);
			P(v, t[0], !0), P(y, t[1], !0), P(b, t[2], !0);
		})(te(t[0], t[1], t[2])), P(x, t[3], !0), P(S, ie(), !0), !0) : !1;
	}
	function se() {
		oe(c()) || oe("#000000"), f = n(), p = "";
		try {
			let e = JSON.parse(localStorage.getItem(o) ?? "[]");
			P(u, Array.isArray(e) ? e : [], !0);
		} catch {
			P(u, [], !0);
		}
		try {
			let e = JSON.parse(localStorage.getItem(s) ?? "[]");
			P(d, Array.isArray(e) ? e : [], !0);
		} catch {
			P(d, [], !0);
		}
		let e = z(m).getBoundingClientRect(), t = z(m).closest(".panel-body")?.getBoundingClientRect(), r = t ? t.right : window.innerWidth, i = Math.max(8, Math.min(e.right - 236, r - 236 - 8)), a = e.bottom + 380 + 8 > window.innerHeight ? Math.max(8, e.top - 380 - 8) : e.bottom + 6;
		P(_, {
			top: a,
			left: i
		}, !0), P(g, !0);
	}
	function ce() {
		if (P(g, !1), p && p !== f) {
			let e = [p, ...z(u).filter((e) => e !== p)].slice(0, 8);
			localStorage.setItem(o, JSON.stringify(e));
		}
	}
	function le(e, n) {
		oe(n), P(S, n, !0), t.onchange?.(e);
	}
	function ue(e) {
		let t = e.currentTarget;
		t.setPointerCapture(e.pointerId);
		let n = (e) => {
			let n = t.getBoundingClientRect();
			P(y, Math.min(1, Math.max(0, (e.clientX - n.left) / n.width)), !0), P(b, 1 - Math.min(1, Math.max(0, (e.clientY - n.top) / n.height))), ae();
		};
		n(e);
		let r = (e) => n(e), i = () => {
			t.removeEventListener("pointermove", r), t.removeEventListener("pointerup", i);
		};
		t.addEventListener("pointermove", r), t.addEventListener("pointerup", i);
	}
	function de(e) {
		oe(e.target.value) ? ae() : P(S, re(), !0);
	}
	function fe(e) {
		return (C(re()) ?? [
			0,
			0,
			0
		])[e];
	}
	function pe(e, t) {
		let n = C(re()) ?? [
			0,
			0,
			0
		];
		n[e] = Math.min(255, Math.max(0, Number(t) || 0)), ((e) => {
			var t = h(e, 3);
			P(v, t[0], !0), P(y, t[1], !0), P(b, t[2], !0);
		})(te(...n)), ae();
	}
	let me = typeof window < "u" && "EyeDropper" in window;
	async function he() {
		try {
			oe((await new window.EyeDropper().open()).sRGBHex) && ae();
		} catch {}
	}
	function ge(e) {
		oe(e) && ae();
	}
	function _e() {
		let e = ie();
		z(d).includes(e) || (P(d, [e, ...z(d)].slice(0, 12), !0), localStorage.setItem(s, JSON.stringify(We(z(d)))));
	}
	function ve(e) {
		P(d, z(d).filter((t) => t !== e), !0), localStorage.setItem(s, JSON.stringify(We(z(d))));
	}
	Cn(() => {
		if (!z(g)) return;
		let e = (e) => {
			z(m) && !z(m).contains(e.target) && ce();
		}, t = (e) => {
			e.key === "Escape" && ce();
		}, n = () => ce();
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t, !0), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t, !0), window.removeEventListener("blur", n);
		};
	});
	var ye = oa(), be = F(ye);
	let xe;
	var Se = L(be, 2), Ce = (e) => {
		var n = Xi();
		R((e, t) => {
			J(n, "title", e), J(n, "aria-label", t);
		}, [() => Y("cp.clearTitle"), () => Y("cp.clear")]), B("click", n, () => t.onchange?.("")), H(e, n);
	};
	W(Se, (e) => {
		a() && n() && e(Ce);
	});
	var we = L(Se, 2), Te = (e) => {
		var t = aa(), i = F(t), a = F(i);
		O(i);
		var o = L(i, 2);
		K(o);
		var s = L(o, 2);
		K(s);
		var c = L(s, 2), f = F(c), p = L(f, 2);
		K(p);
		var m = L(p, 2), g = (e) => {
			var t = Zi();
			R((e) => J(t, "title", e), [() => Y("cp.eyedropper")]), B("click", t, he), H(e, t);
		};
		W(m, (e) => {
			me && e(g);
		}), O(c);
		var C = L(c, 2);
		Kr(C, 22, () => [
			"R",
			"G",
			"B"
		], (e) => e, (e, t, n) => {
			var r = Qi();
			K(r), R((e) => {
				J(r, "title", t), q(r, e);
			}, [() => fe(z(n))]), B("change", r, (e) => pe(z(n), e.target.value)), H(e, r);
		}), O(C);
		var ee = L(C, 2), te = (e) => {
			var t = ea(), i = I(t), a = F(i, !0), o = L(a), s = (e) => {
				var t = Pr();
				R((e) => U(t, e), [() => Y("cp.linkedSuffix", { token: l() })]), H(e, t);
			}, c = /* @__PURE__ */ A(() => l());
			W(o, (e) => {
				z(c) && e(s);
			}), O(i);
			var u = L(i, 2);
			Kr(u, 21, r, ([e, t]) => e, (e, t) => {
				var r = /* @__PURE__ */ A(() => h(z(t), 2));
				let i = () => z(r)[0], a = () => z(r)[1];
				var o = $i();
				let s;
				R((e) => {
					s = pi(o, 1, "cp-token svelte-zxiloo", null, s, { active: n() === i() }), hi(o, `background: ${a() ?? ""}`), J(o, "title", e);
				}, [() => Y("cp.tokenTitle", { name: i() })]), B("click", o, () => le(i(), a())), H(e, o);
			}), O(u), R((e) => U(a, e), [() => Y("cp.themeColors")]), H(e, t);
		};
		W(ee, (e) => {
			r().length && e(te);
		});
		var ne = L(ee, 2), ie = F(ne), oe = L(ie);
		O(ne);
		var se = L(ne, 2), ce = (e) => {
			var t = na();
			Kr(t, 20, () => z(d), (e) => e, (e, t) => {
				var n = ta(), r = F(n), i = L(r, 2);
				O(n), R((e) => {
					hi(r, `background: ${t ?? ""}`), J(r, "title", t), J(i, "title", e);
				}, [() => Y("cp.removeSaved")]), B("click", r, () => ge(t)), B("click", i, () => ve(t)), H(e, n);
			}), O(t), H(e, t);
		};
		W(se, (e) => {
			z(d).length && e(ce);
		});
		var ye = L(se, 2), be = (e) => {
			var t = ia(), n = I(t), r = F(n, !0);
			O(n);
			var i = L(n, 2);
			Kr(i, 20, () => z(u), (e) => e, (e, t) => {
				var n = ra();
				R(() => {
					hi(n, `background: ${t ?? ""}`), J(n, "title", t);
				}), B("click", n, () => ge(t)), H(e, n);
			}), O(i), R((e) => U(r, e), [() => Y("common.recent")]), H(e, t);
		};
		W(ye, (e) => {
			z(u).length && e(be);
		}), O(t), R((e, n, r, c, l) => {
			hi(t, `top: ${z(_).top ?? ""}px; left: ${z(_).left ?? ""}px`), hi(i, `background-image: linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent); background-color: hsl(${z(v) ?? ""}, 100%, 50%)`), hi(a, `left: ${z(y) * 100}%; top: ${(1 - z(b)) * 100}%`), q(o, z(v)), q(s, e), J(s, "title", n), hi(s, `background: linear-gradient(to right, transparent, ${r ?? ""}), repeating-conic-gradient(rgb(255 255 255 / 35%) 0 25%, rgb(0 0 0 / 35%) 0 50%) 0 0 / 10px 10px`), hi(f, `background: ${z(S) ?? ""}`), q(p, z(S)), U(ie, `${c ?? ""} `), J(oe, "title", l);
		}, [
			() => Math.round(z(x) * 100),
			() => Y("cp.alpha"),
			() => re(),
			() => Y("cp.saved"),
			() => Y("cp.saveTitle")
		]), B("click", t, (e) => e.preventDefault()), B("pointerdown", i, ue), B("input", o, (e) => {
			P(v, Number(e.target.value), !0), ae();
		}), B("input", s, (e) => {
			P(x, Number(e.target.value) / 100), ae();
		}), B("change", p, de), B("click", oe, _e), H(e, t);
	};
	W(we, (e) => {
		z(g) && e(Te);
	}), O(ye), Oi(ye, (e) => P(m, e), () => z(m)), R((e, t, n) => {
		xe = pi(be, 1, "cp-swatch svelte-zxiloo", null, xe, e), hi(be, `background: ${t ?? ""}`), J(be, "title", n), J(be, "aria-label", i());
	}, [
		() => ({
			linked: l(),
			"cp-empty": a() && !n()
		}),
		() => n() ? c() : "transparent",
		() => l() ? Y("cp.linkedTitle", {
			label: i(),
			token: l()
		}) : i()
	]), B("click", be, () => z(g) ? ce() : se()), H(e, ye), Ye();
}
Er([
	"click",
	"pointerdown",
	"input",
	"change"
]);
//#endregion
//#region ../template/assets/engine/0.6.11/imageTools.js
var ca = 1600, la = .82, ua = .6, da = 15e6;
async function fa(e, t = ca) {
	if (ma(e)) return ha(await e.text());
	let n = await createImageBitmap(e), r = Math.min(1, t / Math.max(n.width, n.height)), i = Math.round(n.width * r), a = Math.round(n.height * r), o = document.createElement("canvas");
	o.width = i, o.height = a, o.getContext("2d").drawImage(n, 0, 0, i, a), n.close();
	let s = (e) => new Promise((t) => o.toBlob(t, "image/webp", e)), c = await s(la);
	return c.size > 4e5 && (c = await s(ua)), {
		dataUrl: await new Promise((e) => {
			let t = new FileReader();
			t.onload = () => e(t.result), t.readAsDataURL(c);
		}),
		bytes: c.size,
		width: i,
		height: a
	};
}
var pa = "image/svg+xml";
function ma(e) {
	return e.type === pa || /\.svg$/i.test(e.name || "");
}
function ha(e) {
	let t = String(e ?? "");
	if (!/<svg[\s>]/i.test(t)) throw Error("Invalid SVG");
	if (/<\s*script[\s>]/i.test(t) || /<\s*foreignObject[\s>]/i.test(t) || /\son[a-z]+\s*=/i.test(t) || /javascript:/i.test(t)) throw Error("The SVG contains scripts or event handlers and cannot be used");
	let n = new Blob([t]).size, r = `data:${pa};base64,${btoa(unescape(encodeURIComponent(t)))}`, i = t.match(/<svg\b[^>]*>/i)?.[0] ?? "", a = i.match(/viewBox\s*=\s*["']\s*([-\d.]+(?:[\s,]+[-\d.]+){3})\s*["']/i)?.[1]?.split(/[\s,]+/).map(Number);
	return {
		dataUrl: r,
		bytes: n,
		width: a?.length === 4 ? a[2] : Number.parseFloat(i.match(/\bwidth\s*=\s*["']?([\d.]+)/i)?.[1]) || 0,
		height: a?.length === 4 ? a[3] : Number.parseFloat(i.match(/\bheight\s*=\s*["']?([\d.]+)/i)?.[1]) || 0
	};
}
function ga(e, t, n = .04) {
	let r = String(e ?? "");
	if (!t || !(t.width > 0) || !(t.height > 0)) return r;
	let i = r.match(/<svg\b[^>]*>/i)?.[0];
	if (!i) return r;
	let a = (e) => Math.round(e * 1e3) / 1e3, o = Math.max(t.width, t.height) * Math.max(0, n), s = a(t.x - o), c = a(t.y - o), l = a(t.width + 2 * o), u = a(t.height + 2 * o), d = i.replace(/\sviewBox\s*=\s*["'][^"']*["']/i, "").replace(/\swidth\s*=\s*["'][^"']*["']/i, "").replace(/\sheight\s*=\s*["'][^"']*["']/i, "").replace(/<svg\b/i, `<svg viewBox="${s} ${c} ${l} ${u}" width="${l}" height="${u}"`);
	return r.replace(i, d);
}
function _a(e) {
	let t = String(e ?? "").match(/<svg\b[^>]*>/i)?.[0] ?? "", n = t.match(/viewBox\s*=\s*["']\s*([-\d.]+(?:[\s,]+[-\d.]+){3})\s*["']/i)?.[1]?.split(/[\s,]+/).map(Number);
	if (n?.length === 4 && n.every(Number.isFinite)) return n;
	let r = Number.parseFloat(t.match(/\bwidth\s*=\s*["']?([\d.]+)/i)?.[1]), i = Number.parseFloat(t.match(/\bheight\s*=\s*["']?([\d.]+)/i)?.[1]);
	return r > 0 && i > 0 ? [
		0,
		0,
		r,
		i
	] : null;
}
function va(e) {
	let t = e || "";
	if (/^data:image\/svg\+xml[;,]/.test(t)) return "svg";
	let n = t.match(/^data:audio\/([a-z0-9.+-]+)[;,]/i)?.[1]?.toLowerCase();
	if (n) return {
		mpeg: "mp3",
		mp3: "mp3",
		mp4: "m4a",
		"x-m4a": "m4a",
		aac: "aac",
		wav: "wav",
		"x-wav": "wav",
		ogg: "ogg",
		webm: "webm",
		flac: "flac"
	}[n] ?? "mp3";
	let r = t.match(/^data:video\/([a-z0-9.+-]+)[;,]/i)?.[1]?.toLowerCase();
	return r ? r === "webm" ? "webm" : "mp4" : "webp";
}
function ya(e, t = "image") {
	return e.replace(/\.[^.]+$/, "").toLowerCase().replaceAll("æ", "ae").replaceAll("ø", "o").replaceAll("å", "a").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) || t;
}
function ba(e) {
	let t = 5381;
	for (let n = 0; n < e.length; n++) t = (t << 5) + t + e.charCodeAt(n) >>> 0;
	return t.toString(16).padStart(8, "0");
}
//#endregion
//#region ../template/assets/engine/0.6.11/glyphs.js
var xa = "urd-recent-glyphs", Sa = [
	["glyphCat.symbols", "★ ☆ ✦ ✧ ✩ ✪ ✫ ✭ ✮ ✯ ✵ ✳ ✴ ❖ ❋ ✿ ❀ ❁ ✾ ❃ ☘ ◆ ◇ ● ○ ◎ ■ □ ▣ ▲ △ ▼ ▽ ⬡ ⬢ ♦ ♠ ♣ ♥ ♡ ✓ ✔ ✕ ✖ ✗ ✘ ✚ ✜ ☀ ☾ ♪ ♫ ♬ ☮ ☯ ⚜ ⚓ ⚡ ☂ ✂ ✏ ✒ ✉ ☎ ⌛ ⏳ ♻ ⚠ ☑ ⚙ § © ® ™ ° ± × ÷ ∞ ≈ ≠ ≤ ≥ € £ ¥ • ‣ ⁂"],
	["glyphCat.arrows", "→ ← ↑ ↓ ↔ ↕ ↗ ↘ ↙ ↖ ⇒ ⇐ ⇑ ⇓ ⇔ ➜ ➤ ➔ ↩ ↪ ⤴ ⤵ ↺ ↻ ⟲ ⟳ « » ‹ ›"],
	["glyphCat.smileys", "😀 😃 😄 😁 😆 😅 😂 🙂 😉 😊 😇 🥰 😍 🤩 😘 😋 😜 🤪 😎 🥳 😏 😌 😴 🤔 🤗 🤭 🙃 😢 😭 😤 😡 🤯 😱 🥺 😬 🤓 🫠 🫡 🫶"],
	["glyphCat.people", "👍 👎 👏 🙌 🤝 👋 ✌ 🤘 🤞 💪 🙏 👀 🧠 👶 🧒 🧑 🧓 👥 👤 🗣 🏃 🚶 🧍 💃 🕺 🧑‍🤝‍🧑"],
	["glyphCat.nature", "🌞 🌝 🌙 ⭐ 🌟 ✨ ☁ 🌈 🔥 💧 🌊 ❄ ⛄ 🌸 🌼 🌻 🌹 🌷 🌱 🌲 🌳 🍀 🍁 🍂 🐝 🦋 🐶 🐱 🐦 🦉 🐟 🐢 🌍 🏔 🏕"],
	["glyphCat.food", "☕ 🍵 🥤 🍺 🍷 🥂 🍰 🎂 🧁 🍪 🍩 🍕 🌮 🍔 🍟 🥗 🍎 🍊 🍋 🍇 🍓 🫐 🥕 🌽 🍞 🥐 🧀 🍿 🍦 🍫"],
	["glyphCat.activity", "⚽ 🏀 🏐 🎾 🏓 🏸 ⛷ 🏂 🚴 🏊 🎮 🎲 ♟ 🎯 🎳 🎣 🥾 ⛺ 🎪 🎭 🎨 🎬 🎤 🎧 🎸 🎹 🥁 🎻 📚 ✈ 🚗 🚲 ⛵ 🚀 🏋 🧘"],
	["glyphCat.objects", "💡 🔔 📣 📢 📌 📍 📅 ⏰ 🔑 🔒 🔓 🛠 🔧 🔨 🧰 📦 📫 📧 📱 💻 🖥 🖨 📷 📸 🎥 📺 🔍 🔎 📎 📏 📐 📝 📄 📋 📁 💾 🧾 💰 💳 🪙 🎁 🎈 🎉 🎊 🏆 🥇 🥈 🥉 🏅 🚩 🏁 🔗 🧭 🗺 🧲 🧪 🔬 🔭 💊 🩺 🛡 🕯 🪧 🖼"],
	["glyphCat.hearts", "❤ 🧡 💛 💚 💙 💜 🖤 🤍 🤎 💗 💓 💕 💖 💘 💝 💞 💟"]
];
function Ca(e, t) {
	return [t, ...(Array.isArray(e) ? e : []).filter((e) => e !== t)].slice(0, 16);
}
function wa() {
	try {
		let e = JSON.parse(localStorage.getItem("urd-recent-glyphs") ?? "[]");
		return Array.isArray(e) ? e : [];
	} catch {
		return [];
	}
}
function Ta(e) {
	let t = Ca(wa(), e);
	try {
		localStorage.setItem(xa, JSON.stringify(t));
	} catch {}
	return t;
}
//#endregion
//#region ../template/assets/engine/0.6.11/icons.js
var Ea = "fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"", Da = "fill=\"currentColor\" stroke=\"none\"", Oa = {
	facebook: {
		label: "Facebook",
		labelKey: "icon.facebook",
		body: "<path d=\"M15.5 4H13a3.5 3.5 0 0 0-3.5 3.5V10H7v3.2h2.5V20h3.2v-6.8h2.5l.55-3.2h-3.05V7.8c0-.5.4-.8.9-.8h1.9z\"/>"
	},
	instagram: {
		label: "Instagram",
		labelKey: "icon.instagram",
		body: "<rect x=\"3.5\" y=\"3.5\" width=\"17\" height=\"17\" rx=\"4.5\"/><circle cx=\"12\" cy=\"12\" r=\"3.8\"/><circle cx=\"16.9\" cy=\"7.1\" r=\"1.1\" fill=\"currentColor\" stroke=\"none\"/>"
	},
	x: {
		label: "X (Twitter)",
		labelKey: "icon.x",
		body: "<path d=\"M5 4h3.8l4 5.4L17.4 4h2.4l-5.9 6.9L20.5 20h-3.8l-4.3-5.8L7.4 20H5l6.3-7.4z\"/>",
		fill: !0
	},
	linkedin: {
		label: "LinkedIn",
		labelKey: "icon.linkedin",
		body: "<circle cx=\"4.8\" cy=\"4.8\" r=\"1.7\"/><path d=\"M3.3 9.2h3v11h-3z\"/><path d=\"M9.7 20.2v-11h3v1.6a3.9 3.9 0 0 1 3.3-1.8c2.6 0 4.4 1.8 4.4 4.9v6.3h-3.1v-5.7c0-1.6-.7-2.6-2-2.6-1.4 0-2.5 1-2.5 2.7v5.6z\"/>"
	},
	youtube: {
		label: "YouTube",
		labelKey: "icon.youtube",
		body: "<rect x=\"2.8\" y=\"5.7\" width=\"18.4\" height=\"12.6\" rx=\"3.6\"/><path d=\"M10.2 9.3l5 2.7-5 2.7z\" fill=\"currentColor\" stroke=\"none\"/>"
	},
	tiktok: {
		label: "TikTok",
		labelKey: "icon.tiktok",
		body: "<path d=\"M13.8 5v9.3a3.9 3.9 0 1 1-3.9-3.9\"/><path d=\"M13.8 5c.5 2.9 2.6 4.8 5.6 5v3.1c-2.1-.1-4-.8-5.6-2\"/>"
	},
	whatsapp: {
		label: "WhatsApp",
		labelKey: "icon.whatsapp",
		body: "<path d=\"M12 3.5a8.5 8.5 0 0 0-7.3 12.8L3.5 20.5l4.3-1.1A8.5 8.5 0 1 0 12 3.5z\"/><path d=\"M9.2 8.4l1 2-.8 1a7.3 7.3 0 0 0 3.2 3.2l1-.8 2 1c-.3 1.3-1.2 1.9-2.4 1.7-2.9-.5-5.2-2.8-5.7-5.7-.2-1.2.4-2.1 1.7-2.4z\"/>"
	},
	snapchat: {
		label: "Snapchat",
		labelKey: "icon.snapchat",
		body: "<path d=\"M12 3.2c-2.9 0-4.9 2.1-4.9 5v2.1c-.8.3-1.7.3-2.5.1.3 1 1.1 1.8 2.2 2-.4 1.4-1.5 2.5-3 2.8 1 1.2 2.6 1.9 4.3 1.8.9 1.2 2.3 1.9 3.9 1.9s3-.7 3.9-1.9c1.7.1 3.3-.6 4.3-1.8-1.5-.3-2.6-1.4-3-2.8 1.1-.2 1.9-1 2.2-2-.8.2-1.7.2-2.5-.1V8.2c0-2.9-2-5-4.9-5z\"/>"
	},
	pinterest: {
		label: "Pinterest",
		labelKey: "icon.pinterest",
		body: "<path d=\"M9.2 20.5c.4-1.6 1.4-5.6 1.9-7.6\"/><path d=\"M10.4 14.2c.4.9 1.4 1.5 2.6 1.5 2.6 0 4.4-2.2 4.4-5a5.4 5.4 0 1 0-10.4 2.1\"/>"
	},
	spotify: {
		label: "Spotify",
		labelKey: "icon.spotify",
		body: "<circle cx=\"12\" cy=\"12\" r=\"8.8\"/><path d=\"M7.6 9.6c3-.9 6.6-.6 9.1.9\"/><path d=\"M8 12.5c2.5-.7 5.4-.4 7.5.8\"/><path d=\"M8.5 15.2c2-.5 4.2-.3 5.9.7\"/>"
	},
	discord: {
		label: "Discord",
		labelKey: "icon.discord",
		body: "<path d=\"M8 3.9c-1.6.3-3.1.9-4.5 1.7-1.5 3.2-2.1 6.6-1.7 10a12.7 12.7 0 0 0 5 2.6l1-1.9a11 11 0 0 0 8.4 0l1 1.9a12.7 12.7 0 0 0 5-2.6c.4-3.4-.2-6.8-1.7-10A14 14 0 0 0 16 3.9l-.6 1.4a15 15 0 0 0-6.8 0z\"/><circle cx=\"9.3\" cy=\"11.5\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"14.7\" cy=\"11.5\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>"
	},
	github: {
		label: "GitHub",
		labelKey: "icon.github",
		body: "<path d=\"M12 2.8a9.2 9.2 0 0 0-2.9 17.9c.5.1.6-.2.6-.4v-1.7c-2.6.6-3.1-1.1-3.1-1.1-.4-1.1-1-1.4-1-1.4-.9-.6 0-.6 0-.6.9.1 1.4 1 1.4 1 .8 1.4 2.2 1 2.7.8.1-.6.3-1 .6-1.3-2-.2-4.2-1-4.2-4.5 0-1 .4-1.8 1-2.5-.1-.2-.4-1.2.1-2.4 0 0 .8-.3 2.5.9a8.8 8.8 0 0 1 4.6 0c1.7-1.2 2.5-.9 2.5-.9.5 1.2.2 2.2.1 2.4.6.7 1 1.5 1 2.5 0 3.5-2.2 4.3-4.2 4.5.3.3.6.9.6 1.8v2.6c0 .2.1.5.6.4A9.2 9.2 0 0 0 12 2.8z\"/>",
		fill: !0
	},
	mail: {
		label: "Email",
		labelKey: "icon.mail",
		body: "<rect x=\"3\" y=\"5\" width=\"18\" height=\"14\" rx=\"2.5\"/><path d=\"M3.5 7l8.5 6 8.5-6\"/>"
	},
	phone: {
		label: "Phone",
		labelKey: "icon.phone",
		body: "<path d=\"M21.2 16.9v2.6a1.8 1.8 0 0 1-2 1.8 18 18 0 0 1-7.8-2.8 17.7 17.7 0 0 1-5.4-5.4A18 18 0 0 1 3.2 5.2a1.8 1.8 0 0 1 1.8-2h2.6a1.8 1.8 0 0 1 1.8 1.5c.1.9.3 1.7.6 2.5a1.8 1.8 0 0 1-.4 1.9l-1.1 1.1a14.4 14.4 0 0 0 5.4 5.4l1.1-1.1a1.8 1.8 0 0 1 1.9-.4c.8.3 1.6.5 2.5.6a1.8 1.8 0 0 1 1.5 1.8z\"/>"
	},
	smartphone: {
		label: "Mobile",
		labelKey: "icon.smartphone",
		body: "<rect x=\"7\" y=\"2.8\" width=\"10\" height=\"18.4\" rx=\"2.5\"/><line x1=\"10.8\" y1=\"18.2\" x2=\"13.2\" y2=\"18.2\"/>"
	},
	chat: {
		label: "Speech bubble",
		labelKey: "icon.chat",
		body: "<path d=\"M20.8 12a8.5 8.5 0 0 1-12.4 7.5L4 20.6l1.1-4.2A8.5 8.5 0 1 1 20.8 12z\"/>"
	},
	send: {
		label: "Send",
		labelKey: "icon.send",
		body: "<path d=\"M21 3.5L10.4 14.1\"/><path d=\"M21 3.5l-6.8 17-3.8-6.4L4 10.3z\"/>"
	},
	globe: {
		label: "Website",
		labelKey: "icon.globe",
		body: "<circle cx=\"12\" cy=\"12\" r=\"8.8\"/><path d=\"M3.2 12h17.6\"/><path d=\"M12 3.2c2.4 2.4 3.6 5.4 3.6 8.8s-1.2 6.4-3.6 8.8c-2.4-2.4-3.6-5.4-3.6-8.8S9.6 5.6 12 3.2z\"/>"
	},
	rss: {
		label: "RSS feed",
		labelKey: "icon.rss",
		body: "<path d=\"M4.5 11a8.5 8.5 0 0 1 8.5 8.5\"/><path d=\"M4.5 5.5a14 14 0 0 1 14 14\"/><circle cx=\"5.5\" cy=\"18.5\" r=\"1.3\" fill=\"currentColor\" stroke=\"none\"/>"
	},
	"map-pin": {
		label: "Map pin",
		labelKey: "icon.map-pin",
		body: "<path d=\"M12 21.5s7-6.2 7-11.3A7 7 0 1 0 5 10.2c0 5.1 7 11.3 7 11.3z\"/><circle cx=\"12\" cy=\"10\" r=\"2.6\"/>"
	},
	map: {
		label: "Map",
		labelKey: "icon.map",
		body: "<path d=\"M9 4L3.5 6v14L9 18l6 2 5.5-2V4L15 6z\"/><path d=\"M9 4v14\"/><path d=\"M15 6v14\"/>"
	},
	home: {
		label: "Home",
		labelKey: "icon.home",
		body: "<path d=\"M4 10.5l8-7 8 7V20a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 20z\"/><path d=\"M9.5 21.5V14h5v7.5\"/>"
	},
	clock: {
		label: "Clock",
		labelKey: "icon.clock",
		body: "<circle cx=\"12\" cy=\"12\" r=\"8.8\"/><path d=\"M12 7v5l3.2 2\"/>"
	},
	calendar: {
		label: "Calendar",
		labelKey: "icon.calendar",
		body: "<rect x=\"3.5\" y=\"5\" width=\"17\" height=\"16\" rx=\"2.5\"/><path d=\"M3.5 10h17\"/><path d=\"M8 2.8V7\"/><path d=\"M16 2.8V7\"/>"
	},
	heart: {
		label: "Heart",
		labelKey: "icon.heart",
		body: "<path d=\"M12 20.5S3.5 15.4 3.5 9.5A4.6 4.6 0 0 1 12 7a4.6 4.6 0 0 1 8.5 2.5c0 5.9-8.5 11-8.5 11z\"/>"
	},
	star: {
		label: "Star",
		labelKey: "icon.star",
		body: "<path d=\"M12 3.5l2.7 5.4 6 .9-4.3 4.2 1 6-5.4-2.8-5.4 2.8 1-6L3.3 9.8l6-.9z\"/>"
	},
	check: {
		label: "Check",
		labelKey: "icon.check",
		body: "<path d=\"M4.5 12.8L9.5 18 19.5 6.5\"/>"
	},
	cross: {
		label: "Cross",
		labelKey: "icon.cross",
		body: "<path d=\"M6 6l12 12\"/><path d=\"M18 6L6 18\"/>"
	},
	plus: {
		label: "Plus",
		labelKey: "icon.plus",
		body: "<path d=\"M12 5v14\"/><path d=\"M5 12h14\"/>"
	},
	info: {
		label: "Info",
		labelKey: "icon.info",
		body: "<circle cx=\"12\" cy=\"12\" r=\"8.8\"/><path d=\"M12 11v5.5\"/><line x1=\"12\" y1=\"7.8\" x2=\"12\" y2=\"7.8\"/>"
	},
	question: {
		label: "Question",
		labelKey: "icon.question",
		body: "<circle cx=\"12\" cy=\"12\" r=\"8.8\"/><path d=\"M9.4 9.2A2.7 2.7 0 0 1 12 7.4c1.5 0 2.7 1 2.7 2.4 0 1.8-2.7 2-2.7 4\"/><line x1=\"12\" y1=\"16.8\" x2=\"12\" y2=\"16.8\"/>"
	},
	warning: {
		label: "Warning",
		labelKey: "icon.warning",
		body: "<path d=\"M12 4L2.8 19.5h18.4z\"/><path d=\"M12 10v4\"/><line x1=\"12\" y1=\"16.8\" x2=\"12\" y2=\"16.8\"/>"
	},
	zap: {
		label: "Lightning",
		labelKey: "icon.zap",
		body: "<path d=\"M13 2.8L4.5 13.5H11l-1 7.7 8.5-10.7H12z\"/>"
	},
	sun: {
		label: "Sun",
		labelKey: "icon.sun",
		body: "<circle cx=\"12\" cy=\"12\" r=\"4\"/><path d=\"M12 2.8v2.4M12 18.8v2.4M2.8 12h2.4M18.8 12h2.4M5.5 5.5l1.7 1.7M16.8 16.8l1.7 1.7M18.5 5.5l-1.7 1.7M7.2 16.8l-1.7 1.7\"/>"
	},
	moon: {
		label: "Moon",
		labelKey: "icon.moon",
		body: "<path d=\"M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11z\"/>"
	},
	leaf: {
		label: "Leaf",
		labelKey: "icon.leaf",
		body: "<path d=\"M5 19C5 9 11 4.5 20 4.5c0 9-4.5 15-13 14.5z\"/><path d=\"M5 19c2-5.5 5.5-9 10-11\"/>"
	},
	music: {
		label: "Music",
		labelKey: "icon.music",
		body: "<circle cx=\"7\" cy=\"17.5\" r=\"2.8\"/><circle cx=\"17\" cy=\"15.5\" r=\"2.8\"/><path d=\"M9.8 17.5V6.5l10-2v11\"/>"
	},
	camera: {
		label: "Camera",
		labelKey: "icon.camera",
		body: "<path d=\"M3.5 8.5A1.5 1.5 0 0 1 5 7h2.5l1.7-2.3h5.6L16.5 7H19a1.5 1.5 0 0 1 1.5 1.5V18a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 18z\"/><circle cx=\"12\" cy=\"13\" r=\"3.4\"/>"
	},
	image: {
		label: "Image",
		labelKey: "icon.image",
		body: "<rect x=\"3.5\" y=\"4.5\" width=\"17\" height=\"15\" rx=\"2.5\"/><circle cx=\"8.8\" cy=\"9.3\" r=\"1.6\"/><path d=\"M20.5 15.5l-4.7-4.7-9.3 8.7\"/>"
	},
	document: {
		label: "Document",
		labelKey: "icon.document",
		body: "<path d=\"M13.5 3H6.8A1.8 1.8 0 0 0 5 4.8v14.4A1.8 1.8 0 0 0 6.8 21h10.4a1.8 1.8 0 0 0 1.8-1.8V8.5z\"/><path d=\"M13.5 3v5.5H19\"/><path d=\"M8.5 13h7M8.5 16.5h7\"/>"
	},
	"shopping-bag": {
		label: "Shopping bag",
		labelKey: "icon.shopping-bag",
		body: "<path d=\"M5.5 8h13l-1 12a1.8 1.8 0 0 1-1.8 1.5H8.3A1.8 1.8 0 0 1 6.5 20z\"/><path d=\"M8.8 10.5V7a3.2 3.2 0 0 1 6.4 0v3.5\"/>"
	},
	cart: {
		label: "Cart",
		labelKey: "icon.cart",
		body: "<circle cx=\"9.3\" cy=\"19.3\" r=\"1.5\"/><circle cx=\"17.3\" cy=\"19.3\" r=\"1.5\"/><path d=\"M3 4.5h2.4l2.3 10.6a1.8 1.8 0 0 0 1.8 1.4h7.6a1.8 1.8 0 0 0 1.8-1.4L20.8 8H6.1\"/>"
	},
	gift: {
		label: "Gift",
		labelKey: "icon.gift",
		body: "<rect x=\"3.5\" y=\"8\" width=\"17\" height=\"4\"/><path d=\"M5 12v8.5h14V12\"/><path d=\"M12 8v12.5\"/><path d=\"M12 8s-4.5.3-5.5-1.8C5.8 4.7 7.8 3.3 9.3 4.4 10.8 5.5 12 8 12 8z\"/><path d=\"M12 8s4.5.3 5.5-1.8c.7-1.5-1.3-2.9-2.8-1.8C13.2 5.5 12 8 12 8z\"/>"
	},
	wrench: {
		label: "Wrench",
		labelKey: "icon.wrench",
		body: "<path d=\"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z\"/>"
	},
	lock: {
		label: "Lock",
		labelKey: "icon.lock",
		body: "<rect x=\"5\" y=\"10.5\" width=\"14\" height=\"10\" rx=\"2\"/><path d=\"M8.5 10.5V7.5a3.5 3.5 0 0 1 7 0v3\"/>"
	},
	search: {
		label: "Search",
		labelKey: "icon.search",
		body: "<circle cx=\"10.8\" cy=\"10.8\" r=\"6.8\"/><path d=\"M15.8 15.8L21 21\"/>"
	},
	user: {
		label: "Person",
		labelKey: "icon.user",
		body: "<circle cx=\"12\" cy=\"8\" r=\"4\"/><path d=\"M4.5 20.5a7.5 7.5 0 0 1 15 0\"/>"
	},
	users: {
		label: "People",
		labelKey: "icon.users",
		body: "<circle cx=\"9\" cy=\"8.5\" r=\"3.5\"/><path d=\"M2.8 20a6.2 6.2 0 0 1 12.4 0\"/><path d=\"M16 5.4a3.5 3.5 0 0 1 0 6.2\"/><path d=\"M17.8 14.6a6.2 6.2 0 0 1 3.4 5.4\"/>"
	},
	"thumbs-up": {
		label: "Thumbs up",
		labelKey: "icon.thumbs-up",
		body: "<path d=\"M3.5 10.5H7v10H3.5z\"/><path d=\"M7 19.5V11l4.2-5.6a1.7 1.7 0 0 1 3 1.4l-.9 3.7h4.8a2 2 0 0 1 2 2.4l-1.2 5.5a2 2 0 0 1-2 1.6H8.6\"/>"
	},
	"arrow-right": {
		label: "Arrow right",
		labelKey: "icon.arrow-right",
		body: "<path d=\"M4 12h16\"/><path d=\"M13.5 5.5L20 12l-6.5 6.5\"/>"
	},
	"arrow-left": {
		label: "Arrow left",
		labelKey: "icon.arrow-left",
		body: "<path d=\"M20 12H4\"/><path d=\"M10.5 5.5L4 12l6.5 6.5\"/>"
	},
	"arrow-up": {
		label: "Arrow up",
		labelKey: "icon.arrow-up",
		body: "<path d=\"M12 20V4\"/><path d=\"M5.5 10.5L12 4l6.5 6.5\"/>"
	},
	"arrow-down": {
		label: "Arrow down",
		labelKey: "icon.arrow-down",
		body: "<path d=\"M12 4v16\"/><path d=\"M5.5 13.5L12 20l6.5-6.5\"/>"
	},
	"external-link": {
		label: "External link",
		labelKey: "icon.external-link",
		body: "<path d=\"M9.5 5H5.8A1.8 1.8 0 0 0 4 6.8v11.4A1.8 1.8 0 0 0 5.8 20h11.4a1.8 1.8 0 0 0 1.8-1.8v-3.7\"/><path d=\"M13.5 4H20v6.5\"/><path d=\"M20 4l-9 9\"/>"
	},
	download: {
		label: "Download",
		labelKey: "icon.download",
		body: "<path d=\"M12 3.5v11\"/><path d=\"M6.5 9l5.5 5.5L17.5 9\"/><path d=\"M4 20.5h16\"/>"
	},
	share: {
		label: "Share",
		labelKey: "icon.share",
		body: "<circle cx=\"6\" cy=\"12\" r=\"2.6\"/><circle cx=\"17.5\" cy=\"5.5\" r=\"2.6\"/><circle cx=\"17.5\" cy=\"18.5\" r=\"2.6\"/><path d=\"M8.4 10.8l6.8-4M8.4 13.2l6.8 4\"/>"
	}
}, ka = [
	["iconCat.social", [
		"facebook",
		"instagram",
		"x",
		"linkedin",
		"youtube",
		"tiktok",
		"whatsapp",
		"snapchat",
		"pinterest",
		"spotify",
		"discord",
		"github"
	]],
	["iconCat.communication", [
		"mail",
		"phone",
		"smartphone",
		"chat",
		"send",
		"globe",
		"rss"
	]],
	["iconCat.placeTime", [
		"map-pin",
		"map",
		"home",
		"clock",
		"calendar"
	]],
	["iconCat.symbols", [
		"heart",
		"star",
		"check",
		"cross",
		"plus",
		"info",
		"question",
		"warning",
		"zap",
		"sun",
		"moon",
		"leaf",
		"music",
		"camera",
		"image",
		"document",
		"shopping-bag",
		"cart",
		"gift",
		"wrench",
		"lock",
		"search",
		"user",
		"users",
		"thumbs-up"
	]],
	["iconCat.arrows", [
		"arrow-right",
		"arrow-left",
		"arrow-up",
		"arrow-down",
		"external-link",
		"download",
		"share"
	]]
];
function Aa(e) {
	let t = typeof e == "string" ? Oa[e] : null;
	return t ? `<svg viewBox="0 0 24 24" width="100%" height="100%" ${t.fill ? Da : Ea} aria-hidden="true" focusable="false">${t.body}</svg>` : null;
}
//#endregion
//#region src/lib/GlyphPicker.svelte
var ja = /* @__PURE__ */ V("<img class=\"gp-own svelte-15ln1c3\"/>"), Ma = /* @__PURE__ */ V("<span class=\"gp-svg svelte-15ln1c3\"></span>"), Na = /* @__PURE__ */ V("<button type=\"button\" class=\"gp-cell svelte-15ln1c3\"> </button>"), Pa = /* @__PURE__ */ V("<div class=\"gp-group svelte-15ln1c3\"> </div> <div class=\"gp-grid svelte-15ln1c3\"></div>", 1), Fa = /* @__PURE__ */ V("<button type=\"button\"><span class=\"gp-svg svelte-15ln1c3\"></span></button>"), Ia = /* @__PURE__ */ V("<button type=\"button\"> </button>"), La = /* @__PURE__ */ V("<div class=\"gp-group svelte-15ln1c3\"> </div> <button type=\"button\" class=\"ghost gp-upload svelte-15ln1c3\"> </button> <input type=\"file\" accept=\"image/*\" hidden=\"\"/> <p class=\"gp-hint svelte-15ln1c3\"> </p>", 1), Ra = /* @__PURE__ */ V("<div class=\"gp-pop svelte-15ln1c3\"><!> <!> <!> <!></div>"), za = /* @__PURE__ */ V("<span class=\"gp svelte-15ln1c3\"><button type=\"button\" class=\"gp-swatch svelte-15ln1c3\"><!></button> <!></span>");
function Ba(e, t) {
	Je(t, !0);
	let n = ki(t, "value", 3, "★"), r = ki(t, "icon", 3, null), i = ki(t, "image", 3, null), a = ki(t, "label", 19, () => Y("gp.pickGlyph")), o = /* @__PURE__ */ N(an([])), s = /* @__PURE__ */ N(null), c = /* @__PURE__ */ N(null), l = /* @__PURE__ */ N(!1), u = /* @__PURE__ */ N(an({
		top: 0,
		left: 0
	}));
	function d() {
		P(o, wa(), !0);
		let e = z(s).getBoundingClientRect(), t = Math.max(8, Math.min(e.right - 292, window.innerWidth - 292 - 8)), n = e.bottom + 380 + 8 > window.innerHeight ? Math.max(8, e.top - 380 - 8) : e.bottom + 6;
		P(u, {
			top: n,
			left: t
		}, !0), P(l, !0);
	}
	function f(e) {
		Ta(e), t.onpick?.(e), P(l, !1);
	}
	function p(e) {
		t.onicon?.(e), P(l, !1);
	}
	async function m(e) {
		let n = e.target.files?.[0];
		if (e.target.value = "", !n) return;
		let r = await fa(n, 256);
		t.onimage?.(r.dataUrl), P(l, !1);
	}
	Cn(() => {
		if (!z(l)) return;
		let e = (e) => {
			z(s) && !z(s).contains(e.target) && P(l, !1);
		}, t = (e) => {
			e.key === "Escape" && P(l, !1);
		}, n = (e) => {
			z(s) && e.target instanceof Node && !z(s).contains(e.target) && P(l, !1);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t, !0), document.addEventListener("scroll", n, !0), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t, !0), document.removeEventListener("scroll", n, !0);
		};
	});
	var g = za(), _ = F(g), v = F(_), y = (e) => {
		var t = ja();
		R((e) => {
			J(t, "src", i()), J(t, "alt", e);
		}, [() => Y("gp.ownIcon")]), H(e, t);
	}, b = (e) => {
		var t = Ma();
		G(t, () => Aa(r()), !0), O(t), H(e, t);
	}, x = (e) => {
		var t = Pr();
		R(() => U(t, n() || "★")), H(e, t);
	};
	W(v, (e) => {
		i() ? e(y) : r() && Oa[r()] ? e(b, 1) : e(x, -1);
	}), O(_);
	var S = L(_, 2), C = (e) => {
		var i = Ra(), a = F(i), s = (e) => {
			var t = Pa(), n = I(t), r = F(n, !0);
			O(n);
			var i = L(n, 2);
			Kr(i, 20, () => z(o), (e) => e, (e, t) => {
				var n = Na(), r = F(n, !0);
				O(n), R(() => U(r, t)), B("click", n, () => f(t)), H(e, n);
			}), O(i), R((e) => U(r, e), [() => Y("common.recent")]), H(e, t);
		};
		W(a, (e) => {
			z(o).length && e(s);
		});
		var l = L(a, 2), d = (e) => {
			var t = Fr();
			Kr(I(t), 17, () => ka, ([e, t]) => e, (e, t) => {
				var n = /* @__PURE__ */ A(() => h(z(t), 2));
				let i = () => z(n)[0], a = () => z(n)[1];
				var o = Pa(), s = I(o), c = F(s, !0);
				O(s);
				var l = L(s, 2);
				Kr(l, 20, a, (e) => e, (e, t) => {
					var n = Fa();
					let i;
					var a = F(n);
					G(a, () => Aa(t), !0), O(a), O(n), R((e) => {
						i = pi(n, 1, "gp-cell gp-cell-icon svelte-15ln1c3", null, i, { active: t === r() }), J(n, "title", e);
					}, [() => Y(Oa[t].labelKey)]), B("click", n, () => p(t)), H(e, n);
				}), O(l), R((e) => U(c, e), [() => Y(i())]), H(e, o);
			}), H(e, t);
		};
		W(l, (e) => {
			t.onicon && e(d);
		});
		var g = L(l, 2);
		Kr(g, 17, () => Sa, ([e, t]) => e, (e, t) => {
			var r = /* @__PURE__ */ A(() => h(z(t), 2));
			let i = () => z(r)[0], a = () => z(r)[1];
			var o = Pa(), s = I(o), c = F(s, !0);
			O(s);
			var l = L(s, 2);
			Kr(l, 20, () => a().split(" "), (e) => e, (e, t) => {
				var r = Ia();
				let i;
				var a = F(r, !0);
				O(r), R(() => {
					i = pi(r, 1, "gp-cell svelte-15ln1c3", null, i, { active: t === n() }), U(a, t);
				}), B("click", r, () => f(t)), H(e, r);
			}), O(l), R((e) => U(c, e), [() => Y(i())]), H(e, o);
		});
		var _ = L(g, 2), v = (e) => {
			var t = La(), n = I(t), r = F(n, !0);
			O(n);
			var i = L(n, 2), a = F(i, !0);
			O(i);
			var o = L(i, 2);
			Oi(o, (e) => P(c, e), () => z(c));
			var s = L(o, 2), l = F(s, !0);
			O(s), R((e, t, n) => {
				U(r, e), U(a, t), U(l, n);
			}, [
				() => Y("gp.ownIcon"),
				() => Y("gp.upload"),
				() => Y("gp.uploadHint")
			]), B("click", i, () => z(c).click()), B("change", o, m), H(e, t);
		};
		W(_, (e) => {
			t.onimage && e(v);
		}), O(i), R(() => hi(i, `top: ${z(u).top ?? ""}px; left: ${z(u).left ?? ""}px`)), H(e, i);
	};
	W(S, (e) => {
		z(l) && e(C);
	}), O(g), Oi(g, (e) => P(s, e), () => z(s)), R(() => {
		J(_, "title", a()), J(_, "aria-label", a());
	}), B("click", _, () => z(l) ? P(l, !1) : d()), H(e, g), Ye();
}
Er(["click", "change"]);
//#endregion
//#region src/lib/previewBridge.js
function Va(e, t = {}) {
	let n = (e) => {
		if (e.origin !== location.origin) return;
		let n = e.data;
		n?.type === "urd-edit" && t.onEdit?.(n), n?.type === "urd-move" && t.onMove?.(n), n?.type === "urd-grow" && t.onGrow?.(n), n?.type === "urd-delete" && t.onDelete?.(n), n?.type === "urd-add-section" && t.onAddSection?.(n), n?.type === "urd-move-section" && t.onMoveSection?.(n), n?.type === "urd-delete-section" && t.onDeleteSection?.(n), n?.type === "urd-section-size" && t.onSectionSize?.(n), n?.type === "urd-undo" && t.onUndo?.(n), n?.type === "urd-select-section" && t.onSelectSection?.(n), n?.type === "urd-select-block" && t.onSelectBlock?.(n), n?.type === "urd-block-menu" && t.onBlockMenu?.(n), n?.type === "urd-plugin-blocks" && t.onPluginBlocks?.(n), n?.type === "urd-ready" && t.onReady?.(n), n?.type === "urd-navigate" && t.onNavigate?.(n), n?.type === "urd-add-block" && t.onAddBlock?.(n), n?.type === "urd-add-blocks" && t.onAddBlocks?.(n), n?.type === "urd-request-block" && t.onRequestBlock?.(n), n?.type === "urd-move-block-section" && t.onMoveBlockSection?.(n), n?.type === "urd-mobile-reset" && t.onMobileReset?.(n), n?.type === "urd-mobile-order" && t.onMobileOrder?.(n), n?.type === "urd-review-done" && t.onReviewDone?.(n), n?.type === "urd-block-flag" && t.onBlockFlag?.(n), n?.type === "urd-collection-edit" && t.onCollectionEdit?.(n), n?.type === "urd-collection-add" && t.onCollectionAdd?.(n), n?.type === "urd-nav-width" && t.onNavWidth?.(n), n?.type === "urd-save-template" && t.onSaveTemplate?.(n), n?.type === "urd-sticky-group" && t.onStickyGroup?.(n), n?.type === "urd-sticky-dock" && t.onStickyDock?.(n), n?.type === "urd-delete-template" && t.onDeleteTemplate?.(n), n?.type === "urd-apply-layout" && t.onApplyLayout?.(n);
	};
	window.addEventListener("message", n);
	let r = (t) => e.contentWindow?.postMessage(t, location.origin);
	return {
		sendSection(e, t) {
			r({
				type: "urd-preview",
				pageId: e,
				section: t
			});
		},
		sendPage(e, t) {
			r({
				type: "urd-preview-full",
				pageId: e,
				page: t
			});
		},
		sendSite(e) {
			r({
				type: "urd-site",
				site: e
			});
		},
		sendChrome(e) {
			r({
				type: "urd-chrome",
				visible: e
			});
		},
		sendPlugins(e) {
			r({
				type: "urd-plugins",
				enabled: e
			});
		},
		sendCollections(e) {
			r({
				type: "urd-collections",
				collections: e
			});
		},
		sendTemplates(e) {
			r({
				type: "urd-templates",
				templates: e
			});
		},
		sendInsertTemplate(e) {
			r({
				type: "urd-insert-template",
				id: e
			});
		},
		sendViewport(e) {
			r({
				type: "urd-viewport",
				mode: e
			});
		},
		sendZoom(e) {
			r({
				type: "urd-zoom",
				scale: e
			});
		},
		sendCloseMenus() {
			r({ type: "urd-close-menus" });
		},
		sendDuplicate() {
			r({ type: "urd-duplicate" });
		},
		sendShowGrid(e) {
			r({
				type: "urd-show-grid",
				visible: e
			});
		},
		sendShowGuides(e) {
			r({
				type: "urd-show-guides",
				visible: e
			});
		},
		sendAdminTheme(e) {
			r({
				type: "urd-admin-theme",
				colors: e
			});
		},
		sendSelect(e) {
			r({
				type: "urd-select",
				blockId: e
			});
		},
		sendPlaceBlock(e) {
			r({
				type: "urd-place-block",
				block: e
			});
		},
		sendAttention(e, t) {
			r({
				type: "urd-attention",
				sectionId: e,
				needed: t
			});
		},
		sendScrollSection(e) {
			r({
				type: "urd-scroll-section",
				sectionId: e
			});
		},
		sendDemoAnim(e, t = null) {
			r({
				type: "urd-demo-anim",
				sectionId: e,
				blockId: t
			});
		},
		sendOpenConfig(e) {
			r({
				type: "urd-open-block-config",
				blockId: e
			});
		},
		destroy() {
			window.removeEventListener("message", n);
		}
	};
}
//#endregion
//#region src/lib/preview-scale.js
function Ha(e, t) {
	return !(e > 0) || !(t > 0) ? 1 : e / t;
}
function Ua(e, t, n, r = 0, i = 0) {
	if (n === "full") return 1;
	let a = i > 0 ? Ha(r, i) : Infinity;
	return Math.max(.1, Math.min(1, Ha(e, t), a));
}
var Wa = 1920, Ga = [
	{
		id: "none",
		gutter: 0
	},
	{
		id: "small",
		gutter: 3
	},
	{
		id: "medium",
		gutter: 6
	},
	{
		id: "large",
		gutter: 9
	}
], Ka = [
	{
		id: "compact",
		width: 1200
	},
	{
		id: "standard",
		width: 1440
	},
	{
		id: "wide",
		width: 1600
	},
	{
		id: "full",
		width: "full"
	}
], qa = [
	1920,
	1536,
	1366
];
function Ja(e) {
	let t = Number(e);
	if (!Number.isFinite(t)) return 1440;
	let n = Math.round(t / 20) * 20;
	return Math.min(Wa, Math.max(960, n));
}
function Ya(e) {
	let t = Number(e);
	if (!Number.isFinite(t)) return 6;
	let n = Math.round(t / 1) * 1;
	return Math.min(12, Math.max(0, n));
}
function Xa(e, t) {
	if (e === "full") return 0;
	let n = Math.min(49, Math.max(0, Number(t) || 0));
	return Math.ceil(Number(e) / (1 - 2 * n / 100));
}
function Za(e, t, n) {
	let r = Math.max(0, Number(t) || 0) / 100 * n, i = Math.max(0, n - 2 * r), a = e !== "full" && Number(e) < i, o = a ? Number(e) : i;
	return {
		width: o,
		margin: Math.round((n - o) / 2),
		pct: n > 0 ? o / n * 100 : 0,
		bound: a
	};
}
function Qa(e) {
	return Ka.find((t) => t.width === e)?.id ?? null;
}
//#endregion
//#region src/lib/Dropdown.svelte
var $a = /* @__PURE__ */ V("<button type=\"button\"> </button>"), eo = /* @__PURE__ */ V("<div class=\"dd-pop svelte-vtocc6\"></div>"), to = /* @__PURE__ */ V("<span class=\"dd svelte-vtocc6\"><button type=\"button\" class=\"dd-btn svelte-vtocc6\"><span class=\"dd-value svelte-vtocc6\"> </span> <span class=\"dd-caret svelte-vtocc6\"> </span></button> <!></span>");
function X(e, t) {
	Je(t, !0);
	let n = ki(t, "value", 3, null), r = ki(t, "options", 19, () => []), i = ki(t, "title", 3, null), a = ki(t, "disabled", 3, !1), o = /* @__PURE__ */ N(!1), s = /* @__PURE__ */ N(null), c = /* @__PURE__ */ N(an({
		top: 0,
		left: 0,
		width: 160
	})), l = () => r().find(([e]) => `${e ?? ""}` == `${n() ?? ""}`)?.[1] ?? "";
	function u() {
		let e = z(s).getBoundingClientRect(), t = Math.min(320, r().length * 32 + 12), n = Math.max(e.width, 160), i = e.bottom + t + 8 <= window.innerHeight;
		P(c, {
			top: i ? e.bottom + 4 : Math.max(8, e.top - t - 4),
			left: Math.max(8, Math.min(e.left, window.innerWidth - n - 8)),
			width: n
		}, !0);
	}
	function d() {
		if (!a()) {
			if (z(o)) {
				P(o, !1);
				return;
			}
			u(), P(o, !0);
		}
	}
	function f(e) {
		P(o, !1), t.onchange?.(e);
	}
	Cn(() => {
		if (!z(o)) return;
		let e = (e) => {
			z(s) && !z(s).contains(e.target) && P(o, !1);
		}, t = (e) => {
			e.key === "Escape" && P(o, !1);
		}, n = (e) => {
			z(s) && e.target instanceof Node && !z(s).contains(e.target) && u();
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t, !0), document.addEventListener("scroll", n, !0), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t, !0), document.removeEventListener("scroll", n, !0);
		};
	});
	var p = to(), m = F(p), g = F(m), _ = F(g, !0);
	O(g);
	var v = L(g, 2), y = F(v, !0);
	O(v), O(m);
	var b = L(m, 2), x = (e) => {
		var t = eo();
		Kr(t, 21, r, ([e, t]) => `${e ?? ""}`, (e, t) => {
			var r = /* @__PURE__ */ A(() => h(z(t), 2));
			let i = () => z(r)[0], a = () => z(r)[1];
			var o = $a();
			let s;
			var c = F(o, !0);
			O(o), R(() => {
				s = pi(o, 1, "dd-opt svelte-vtocc6", null, s, { selected: `${i() ?? ""}` == `${n() ?? ""}` }), U(c, a());
			}), B("click", o, () => f(i())), H(e, o);
		}), O(t), R(() => hi(t, `top: ${z(c).top ?? ""}px; left: ${z(c).left ?? ""}px; min-width: ${z(c).width ?? ""}px`)), H(e, t);
	};
	W(b, (e) => {
		z(o) && e(x);
	}), O(p), Oi(p, (e) => P(s, e), () => z(s)), R((e) => {
		J(m, "title", i()), m.disabled = a(), U(_, e), U(y, z(o) ? "▴" : "▾");
	}, [() => l()]), B("click", m, d), H(e, p), Ye();
}
Er(["click"]);
//#endregion
//#region src/lib/IconEditor.svelte
var no = /* @__PURE__ */ V("<div class=\"ie-overlay svelte-e7sog7\" role=\"dialog\" aria-modal=\"true\"><div class=\"ie-card svelte-e7sog7\"><h2 class=\"svelte-e7sog7\"> </h2> <div class=\"ie-stage svelte-e7sog7\"><canvas class=\"ie-canvas svelte-e7sog7\"></canvas> <p class=\"ie-hint svelte-e7sog7\"> </p></div> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"1\" max=\"3\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0.3\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0.3\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <span class=\"ie-tools svelte-e7sog7\"><button type=\"button\" class=\"ghost svelte-e7sog7\"> </button> <button type=\"button\" class=\"ghost svelte-e7sog7\"> </button></span> <span class=\"ie-actions svelte-e7sog7\"><button type=\"button\" class=\"ghost svelte-e7sog7\"> </button> <button type=\"button\" class=\"primary svelte-e7sog7\"> </button></span></div></div>");
function ro(e, t) {
	Je(t, !0);
	let n = ki(t, "image", 3, ""), r = /* @__PURE__ */ N(null), i = /* @__PURE__ */ N(null), a = /* @__PURE__ */ N(1), o = /* @__PURE__ */ N(.5), s = /* @__PURE__ */ N(.5), c = /* @__PURE__ */ N(1), l = /* @__PURE__ */ N(1), u = /* @__PURE__ */ N(1);
	Cn(() => {
		if (!n()) return;
		let e = new Image();
		e.onload = () => {
			P(i, e, !0);
		}, e.src = n();
	});
	function d(e, t) {
		if (e.clearRect(0, 0, t, t), !z(i)) return;
		e.filter = `brightness(${z(c)}) contrast(${z(l)}) saturate(${z(u)})`;
		let n = Math.max(t / z(i).width, t / z(i).height) * z(a), r = z(i).width * n, d = z(i).height * n, f = t / 2 - z(o) * r, p = t / 2 - z(s) * d;
		f = Math.min(0, Math.max(t - r, f)), p = Math.min(0, Math.max(t - d, p)), e.drawImage(z(i), f, p, r, d), e.filter = "none";
	}
	Cn(() => {
		z(i), z(a), z(o), z(s), z(c), z(l), z(u), z(r) && d(z(r).getContext("2d"), 220);
	});
	function f(e) {
		if (!z(i)) return;
		e.preventDefault();
		let t = e.clientX, n = e.clientY, r = Math.max(220 / z(i).width, 220 / z(i).height) * z(a), c = z(i).width * r, l = z(i).height * r, u = (e) => {
			P(o, Math.min(1, Math.max(0, z(o) - (e.clientX - t) / c)), !0), P(s, Math.min(1, Math.max(0, z(s) - (e.clientY - n) / l)), !0), t = e.clientX, n = e.clientY;
		}, d = () => {
			window.removeEventListener("pointermove", u), window.removeEventListener("pointerup", d);
		};
		window.addEventListener("pointermove", u), window.addEventListener("pointerup", d);
	}
	function p() {
		P(a, 1), P(o, .5), P(s, .5), P(c, 1), P(l, 1), P(u, 1);
	}
	function m() {
		let e = document.createElement("canvas");
		e.width = 128, e.height = 128, d(e.getContext("2d"), 128), t.onapply?.(e.toDataURL("image/webp", .92));
	}
	var h = no(), g = F(h), _ = F(g), v = F(_, !0);
	O(_);
	var y = L(_, 2), b = F(y);
	J(b, "width", 220), J(b, "height", 220), Oi(b, (e) => P(r, e), () => z(r));
	var x = L(b, 2), S = F(x, !0);
	O(x), O(y);
	var C = L(y, 2), ee = F(C), te = L(ee), ne = F(te);
	O(te), O(C);
	var re = L(C, 2);
	K(re);
	var ie = L(re, 2), ae = F(ie), oe = L(ae), se = F(oe);
	O(oe), O(ie);
	var ce = L(ie, 2);
	K(ce);
	var le = L(ce, 2), ue = F(le), de = L(ue), fe = F(de);
	O(de), O(le);
	var pe = L(le, 2);
	K(pe);
	var me = L(pe, 2), he = F(me), ge = L(he), _e = F(ge);
	O(ge), O(me);
	var ve = L(me, 2);
	K(ve);
	var ye = L(ve, 2), be = F(ye), xe = F(be, !0);
	O(be);
	var Se = L(be, 2), Ce = F(Se, !0);
	O(Se), O(ye);
	var we = L(ye, 2), Te = F(we), Ee = F(Te, !0);
	O(Te);
	var De = L(Te, 2), Oe = F(De, !0);
	O(De), O(we), O(g), O(h), R((e, t, n, r, i, a, o, s, c, l, u, d, f, p, m) => {
		U(v, e), J(b, "title", t), U(S, n), U(ee, `${r ?? ""} `), U(ne, `${i ?? ""}x`), U(ae, `${a ?? ""} `), U(se, `${o ?? ""}%`), U(ue, `${s ?? ""} `), U(fe, `${c ?? ""}%`), U(he, `${l ?? ""} `), U(_e, `${u ?? ""}%`), U(xe, d), U(Ce, f), U(Ee, p), U(Oe, m);
	}, [
		() => Y("ie.title"),
		() => Y("ie.dragTip"),
		() => Y("ie.hint"),
		() => Y("lbl.zoom"),
		() => z(a).toFixed(2),
		() => Y("lbl.brightness"),
		() => Math.round(z(c) * 100),
		() => Y("lbl.contrast"),
		() => Math.round(z(l) * 100),
		() => Y("lbl.saturate"),
		() => Math.round(z(u) * 100),
		() => Y("ie.grayscale"),
		() => Y("common.reset"),
		() => Y("confirm.cancel"),
		() => Y("common.apply")
	]), B("pointerdown", b, f), wi(re, () => z(a), (e) => P(a, e)), wi(ce, () => z(c), (e) => P(c, e)), wi(pe, () => z(l), (e) => P(l, e)), wi(ve, () => z(u), (e) => P(u, e)), B("click", be, () => P(u, 0)), B("click", Se, p), B("click", Te, () => t.oncancel?.()), B("click", De, m), H(e, h), Ye();
}
Er(["pointerdown", "click"]);
var io = 24, ao = {
	"oppsett-byttet": "layout-changed",
	"blokk-endret": "block-edited",
	"desktop-endret-etter-mobil": "desktop-changed-after-mobile",
	seksjonshøyde: "section-height",
	"blokk-flyttet": "block-moved",
	"blokk-slettet": "block-deleted",
	"blokk-lagt-til": "block-added"
};
function oo(e, t) {
	if (!e || !("y" in e || "h" in e)) return e ?? null;
	if (t && e.x === t.x && e.y === t.y && e.w === t.w && e.h === t.h) return null;
	let n = {
		x: e.x,
		w: e.w
	};
	return Number.isFinite(e.y) && (n.row = Math.max(1, Math.round((e.y - io) / 8) + 1), n.rows = Number.isFinite(e.h) ? Math.max(1, Math.ceil(e.h / 8)) : 1), Number.isFinite(e.z) && e.z !== 1 && (n.z = e.z), e.rot && (n.rot = e.rot), n;
}
var so = {
	samling: "collection",
	galleri: "gallery",
	tidslinje: "timeline",
	sitat: "quote",
	statistikk: "stats",
	tabell: "table",
	deling: "share",
	nedteller: "countdown",
	produkt: "product",
	handlekurv: "cart",
	kasse: "checkout"
}, co = { bildegalleri: "slideshow" }, lo = {
	flate: "surface",
	aksent: "accent",
	invers: "inverse",
	dus: "soft",
	dempet: "muted",
	dyp: "deep",
	uthevet: "highlighted"
}, uo = {
	tom: "blank",
	"hero-sentrert": "hero-centered",
	bilder: "images",
	galleri: "gallery",
	kontakt: "contact",
	funksjonskort: "feature-cards",
	"funksjonskort-enkel": "feature-cards-simple",
	nyheter: "news",
	"nyheter-samling": "news-collection",
	oppslagstavle: "noticeboard",
	publikasjonsarkiv: "publication-archive",
	arrangementer: "events",
	tidslinje: "timeline",
	steg: "steps",
	hovedoppslag: "lead-story",
	produkter: "products",
	butikk: "shop",
	"butikk-hero": "shop-hero",
	"butikk-kategorier": "shop-categories",
	"butikk-tillit": "shop-trust",
	"butikk-utstilling": "shop-showcase",
	kasse: "checkout",
	sitat: "quote",
	statistikk: "stats",
	sponsorer: "sponsors",
	medlemskap: "membership"
};
function fo(e) {
	let t = Array.isArray(e) ? e : e.blocks ?? [];
	for (let e of t) so[e.type] && (e.type = so[e.type]);
	if (!Array.isArray(e)) {
		for (let t of e.background?.layers ?? []) co[t.type] && (t.type = co[t.type]);
		lo[e.theme] && (e.theme = lo[e.theme]), uo[e.preset] && (e.preset = uo[e.preset]);
	}
	return e;
}
var po = {
	1: (e) => {
		for (let t of e.sections ?? []) {
			let e = t.responsive?.mobile;
			for (let e of t.blocks ?? []) e.decor && (e.hideMobile = !0), e.frames?.mobile && (e.frames.mobile = oo(e.frames.mobile, e.frames.desktop));
			e?.mode === "manual" && (e.mode = "auto");
			let n = e?.attention?.reason;
			n && ao[n] && (e.attention.reason = ao[n]);
		}
		return e;
	},
	2: (e) => {
		for (let t of e.sections ?? []) fo(t);
		return e;
	},
	3: (e) => {
		for (let t of e.sections ?? []) fo(t);
		return e;
	}
}, mo = {
	1: (e) => ({
		...e,
		layout: e.layout ?? {
			contentWidth: 1440,
			gutter: 6
		}
	}),
	2: (e) => ({
		...e,
		layout: {
			...e.layout ?? { contentWidth: 1440 },
			gutter: 6
		}
	})
};
function ho(e) {
	let t = structuredClone(e), n = t.schemaVersion ?? 1;
	for (; n < 3;) {
		let r = mo[n];
		if (typeof r != "function") return e;
		t = r(t) ?? t, n++, t.schemaVersion = n;
	}
	return t;
}
function go(e, t) {
	let n = structuredClone(e), r = n.schemaVersion ?? 1;
	for (; r < 4;) {
		let i = po[r];
		if (typeof i != "function") return e;
		n = i(n, t) ?? n, r++, n.schemaVersion = r;
	}
	return n;
}
//#endregion
//#region ../template/assets/engine/0.6.11/plugins.js
function _o(e) {
	let t = /^(\d+)\.(\d+)\.(\d+)$/.exec(String(e).trim());
	return t ? [
		Number(t[1]),
		Number(t[2]),
		Number(t[3])
	] : null;
}
var vo = (e, t) => e[0] - t[0] || e[1] - t[1] || e[2] - t[2];
function yo(e, t) {
	let n = _o(e);
	if (!n || typeof t != "string" || !t.trim()) return !1;
	for (let e of t.trim().split(/\s+/)) {
		let t = /^(>=|<=|>|<|=|\^|~)?(\d+\.\d+\.\d+)$/.exec(e);
		if (!t) return !1;
		let r = t[1] ?? "=", i = _o(t[2]), a = vo(n, i);
		if (!(r === ">=" ? a >= 0 : r === ">" ? a > 0 : r === "<=" ? a <= 0 : r === "<" ? a < 0 : r === "^" ? i[0] === 0 ? n[0] === 0 && n[1] === i[1] && a >= 0 : n[0] === i[0] && a >= 0 : r === "~" ? n[0] === i[0] && n[1] === i[1] && a >= 0 : a === 0)) return !1;
	}
	return !0;
}
var bo = /^[a-z0-9][a-z0-9-]*$/;
function xo(e) {
	let t = [];
	if (!e || typeof e != "object") return ["the manifest is not an object"];
	bo.test(e.id ?? "") || t.push("id is missing or invalid"), (typeof e.name != "string" || !e.name) && t.push("name is missing"), _o(e.version ?? "") || t.push("version is not semver"), (typeof e.requiresEngine != "string" || !e.requiresEngine) && t.push("requiresEngine is missing");
	let n = Array.isArray(e.languages) && e.languages.length > 0;
	return (e.entry !== void 0 || !n) && (typeof e.entry != "string" || !e.entry.endsWith(".js")) && t.push("entry is missing or is not a .js file"), (e.provides !== void 0 || !n) && (!e.provides || typeof e.provides != "object") && t.push("provides is missing"), e.languages !== void 0 && t.push(...Ii(e.languages)), e.locales !== void 0 && typeof e.locales != "boolean" && t.push("locales must be a boolean"), e.names !== void 0 && (typeof e.names != "object" || e.names === null || Array.isArray(e.names) || Object.values(e.names).some((e) => typeof e != "string" || !e)) && t.push("names must be an object mapping language code to name"), t;
}
//#endregion
//#region ../template/assets/engine/0.6.11/sections/presets.js
function So(e) {
	return typeof crypto < "u" && crypto.randomUUID ? `${e}-${crypto.randomUUID().slice(0, 8)}` : `${e}-${[...crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(4))].map((e) => e.toString(16).padStart(2, "0")).join("")}`;
}
var Co = () => ({ mobile: {
	mode: "auto",
	attention: null
} }), Z = (e, t, n, r, i = 1) => ({
	desktop: {
		x: e,
		y: t,
		w: n,
		h: r,
		z: i,
		rot: 0
	},
	mobile: null
}), Q = (e, t, n = {}) => ({
	id: So("blk"),
	type: "text",
	version: 1,
	props: {
		html: t,
		align: "left",
		box: !1,
		...n
	},
	animation: null,
	frames: e
}), wo = (e, t = {}) => ({
	id: So("blk"),
	type: "image",
	version: 1,
	props: {
		src: "",
		alt: Y("seed.imageAlt"),
		fit: "cover",
		radius: "md",
		href: null,
		...t
	},
	animation: null,
	frames: e
}), To = (e, t, n = {}) => ({
	id: So("blk"),
	type: "button",
	version: 1,
	props: {
		label: t,
		page: null,
		href: "#",
		style: "primary",
		...n
	},
	animation: null,
	frames: e
}), Eo = (e, t, n = 40) => ({
	id: So("blk"),
	type: "icon",
	version: 1,
	props: {
		glyph: t,
		color: "accent",
		size: n
	},
	animation: null,
	frames: e
}), Do = () => ({
	type: "hover-lift",
	version: 1,
	props: {}
}), Oo = (e, t, n = {}) => ({
	id: So("blk"),
	type: "collection",
	version: 1,
	props: {
		collection: null,
		view: t,
		limit: 6,
		newestFirst: !0,
		...n
	},
	animation: null,
	frames: e
}), ko = (e, t = {}) => ({
	id: So("blk"),
	type: "product",
	version: 1,
	props: {
		collection: null,
		limit: 0,
		columns: 0,
		currency: "kr",
		...t
	},
	animation: null,
	frames: e
}), Ao = (e, t = {}) => ({
	id: So("blk"),
	type: "cart",
	version: 1,
	props: {
		variant: "button",
		href: "",
		currency: "kr",
		...t
	},
	animation: null,
	frames: e
}), jo = (e, t = {}) => ({
	id: So("blk"),
	type: "checkout",
	version: 1,
	props: {
		recipient: "",
		endpoint: "",
		vipps: "",
		currency: "kr",
		...t
	},
	animation: null,
	frames: e
}), Mo = (e, t = {}) => ({
	id: So("blk"),
	type: "gallery",
	version: 1,
	props: {
		images: [],
		view: "grid",
		columns: 3,
		gap: 12,
		radius: "md",
		lightbox: !0,
		interval: 5,
		...t
	},
	animation: null,
	frames: e
}), No = (e, t) => ({
	id: So("blk"),
	type: "faq",
	version: 1,
	props: {
		items: t,
		multi: !1
	},
	animation: null,
	frames: e
}), Po = (e, t = {}) => ({
	id: So("blk"),
	type: "quote",
	version: 1,
	props: {
		text: "",
		attribution: "",
		role: "",
		variant: "large",
		image: "",
		accent: null,
		...t
	},
	animation: null,
	frames: e
}), Fo = (e, t) => ({
	id: So("blk"),
	type: "timeline",
	version: 1,
	props: {
		items: t,
		variant: "left",
		marker: "filled",
		accent: null
	},
	animation: null,
	frames: e
}), Io = (e, t = {}) => ({
	id: So("blk"),
	type: "stats",
	version: 1,
	props: {
		value: "4800",
		prefix: "",
		suffix: "",
		label: "",
		countUp: !0,
		...t
	},
	animation: null,
	frames: e
}), Lo = (...e) => ({
	version: 1,
	layers: e
}), Ro = (e) => ({
	type: "color",
	version: 1,
	props: { value: e }
}), zo = (e, t, n, r = .5) => ({
	type: "glow",
	version: 1,
	props: {
		x: e,
		y: t,
		color: "accent",
		radius: r,
		opacity: n
	}
}), Bo = (e) => Math.max(0, ...e.blocks.map((e) => e.frames.desktop.y + e.frames.desktop.h)), Vo = (e, t, n, r, i, a) => ({
	x: n + e % t * r,
	y: i + Math.floor(e / t) * a
}), Ho = (e, t, n, r, i, a, o, s, c = 0) => {
	let l = (t) => e.blocks.some((e) => {
		let n = e.frames.desktop;
		return n.x < t.x + t.w - .01 && t.x < n.x + n.w - .01 && n.y < t.y + t.h - .01 && t.y < n.y + n.h - .01;
	});
	for (let e = 0; e < 60; e++) {
		let u = Vo(e, t, n, r, i, a);
		if (!l({
			x: u.x,
			y: u.y + c,
			w: o,
			h: s
		})) return {
			...u,
			n: e
		};
	}
	return {
		x: n,
		y: Bo(e) + 16,
		n: 0
	};
}, Uo = (e, t, n) => e + t * .1 + n * .01, Wo = (e, t, n, r, i = null) => ({
	id: So("sec"),
	version: 1,
	preset: e,
	size: { minHeight: t },
	grid: i,
	background: n,
	blocks: r,
	responsive: Co()
});
function Go(e) {
	e.sections.define("blank", {
		label: "Empty section",
		labelKey: "preset.blank.label",
		group: "Basics",
		groupKey: "presetGroup.basic",
		hint: "A blank canvas to build on freely",
		hintKey: "preset.blank.hint",
		create: () => Wo("blank", "40vh", Lo(Ro("bg")), [])
	}), e.sections.define("hero", {
		label: "Hero",
		labelKey: "preset.hero.label",
		group: "Basics",
		groupKey: "presetGroup.basic",
		hint: "Large opening with gradient and glow, left-aligned",
		hintKey: "preset.hero.hint",
		create: () => Wo("hero", "70vh", {
			version: 1,
			layers: [
				{
					type: "gradient",
					version: 1,
					props: {
						stops: ["#0b0e14", "#1a1030"],
						angle: 160,
						animate: !1
					}
				},
				zo(.7, .2, .35),
				{
					type: "grain",
					version: 1,
					props: { opacity: .06 }
				}
			]
		}, [
			Q(Z(8.33, 40, 50, 38), Y("seed.hero.title")),
			Q(Z(8.33, 84, 41.67, 26), Y("seed.hero.intro")),
			To(Z(8.33, 118, 20, 32), Y("seed.readMore"))
		])
	}), e.sections.define("hero-centered", {
		label: "Hero, centred",
		labelKey: "preset.hero-centered.label",
		group: "Basics",
		groupKey: "presetGroup.basic",
		hint: "Centred opening with two buttons",
		hintKey: "preset.hero-centered.hint",
		create: () => Wo("hero-centered", "60vh", Lo(Ro("bg")), [
			Q(Z(15, 64, 70, 44), Y("seed.heroCenter.title"), { align: "center" }),
			Q(Z(25, 116, 50, 26), Y("seed.heroCenter.intro"), { align: "center" }),
			To(Z(31.5, 160, 17, 40), Y("seed.join")),
			To(Z(51.5, 160, 17, 40), Y("seed.readMore"), { style: "secondary" })
		])
	}), e.sections.define("images", {
		label: "Images",
		labelKey: "preset.images.label",
		group: "Basics",
		groupKey: "presetGroup.basic",
		hint: "Title and three image frames",
		hintKey: "preset.images.hint",
		create: () => Wo("images", "360px", Lo(Ro("bg")), [
			Q(Z(4, 24, 50, 32), Y("seed.images.title")),
			wo(Z(4, 72, 28, 220)),
			wo(Z(36, 72, 28, 220)),
			wo(Z(68, 72, 28, 220))
		]),
		itemLabel: "image",
		itemLabelKey: "item.image",
		item: (e) => {
			let { x: t, y: n } = Ho(e, 3, 4, 32, 72, 244, 28, 220);
			return {
				blocks: [wo(Z(t, n, 28, 220))],
				bottom: n + 244
			};
		}
	}), e.sections.define("gallery", {
		label: "Gallery",
		labelKey: "preset.gallery.label",
		group: "Basics",
		groupKey: "presetGroup.basic",
		hint: "Image gallery in a grid with full-screen view (lightbox)",
		hintKey: "preset.gallery.hint",
		create: () => Wo("gallery", "440px", Lo(Ro("bg")), [Q(Z(4, 24, 50, 32), Y("seed.gallery.title")), Mo(Z(4, 72, 92, 320))])
	}), e.sections.define("contact", {
		label: "Contact",
		labelKey: "preset.contact.label",
		group: "Basics",
		groupKey: "presetGroup.basic",
		hint: "Contact details in a card with an email button",
		hintKey: "preset.contact.hint",
		create: () => Wo("contact", "320px", Lo(Ro("surface"), zo(.2, .8, .2)), [
			Q(Z(10, 32, 40, 36), Y("seed.contact.title")),
			Q(Z(10, 84, 36, 130), Y("seed.contact.info"), { box: !0 }),
			To(Z(60, 100, 22, 40), Y("seed.contact.button"), { href: "mailto:post@dinforening.no" })
		])
	}), e.sections.define("feature-cards", {
		label: "Feature cards",
		labelKey: "preset.feature-cards.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Three cards with icon, title and text",
		hintKey: "preset.feature-cards.hint",
		create: () => {
			let e = (e, t, n, r) => {
				let i = Eo(Z(e + 10.5, 88, 4, 52), n), a = Q(Z(e, 152, 25, 200), Y("seed.features.card", { title: r }), {
					align: "center",
					box: !0
				});
				return a.animation = Do(), i.mobileOrder = Uo(88, t, 0), a.mobileOrder = Uo(88, t, 1), [i, a];
			};
			return Wo("feature-cards", "420px", Lo(Ro("bg")), [
				Q(Z(6, 28, 60, 38), Y("seed.features.title")),
				...e(6, 0, "✦", Y("seed.features.card1")),
				...e(37.5, 1, "★", Y("seed.features.card2")),
				...e(69, 2, "✓", Y("seed.features.card3"))
			]);
		},
		itemLabel: "card",
		itemLabelKey: "item.card",
		item: (e) => {
			let { x: t, y: n, n: r } = Ho(e, 3, 6, 31.5, 152, 296, 25, 264, -64), i = Eo(Z(t + 10.5, n - 64, 4, 52), "✦"), a = Q(Z(t, n, 25, 200), Y("seed.features.card", { title: Y("seed.features.newTitle") }), {
				align: "center",
				box: !0
			});
			return a.animation = Do(), i.mobileOrder = Uo(88, r, 0), a.mobileOrder = Uo(88, r, 1), {
				blocks: [i, a],
				bottom: n + 228
			};
		}
	}), e.sections.define("feature-cards-simple", {
		label: "Feature cards without icons",
		labelKey: "preset.feature-cards-simple.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Three cards with title and text (without the icons above)",
		hintKey: "preset.feature-cards-simple.hint",
		create: () => {
			let e = (e, t, n) => {
				let r = Q(Z(e, 88, 25, 200), Y("seed.features.card", { title: n }), {
					align: "center",
					box: !0
				});
				return r.animation = Do(), r.mobileOrder = Uo(88, t, 0), r;
			};
			return Wo("feature-cards-simple", "360px", Lo(Ro("bg")), [
				Q(Z(6, 28, 60, 38), Y("seed.features.title")),
				e(6, 0, Y("seed.features.card1")),
				e(37.5, 1, Y("seed.features.card2")),
				e(69, 2, Y("seed.features.card3"))
			]);
		},
		itemLabel: "card",
		itemLabelKey: "item.card",
		item: (e) => {
			let { x: t, y: n, n: r } = Ho(e, 3, 6, 31.5, 88, 232, 25, 200), i = Q(Z(t, n, 25, 200), Y("seed.features.card", { title: Y("seed.features.newTitle") }), {
				align: "center",
				box: !0
			});
			return i.animation = Do(), i.mobileOrder = Uo(88, r, 0), {
				blocks: [i],
				bottom: n + 228
			};
		}
	}), e.sections.define("news", {
		label: "News",
		labelKey: "preset.news.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Three news cards with image, tag and date",
		hintKey: "preset.news.hint",
		create: () => {
			let e = (e, t) => {
				let n = wo(Z(e, 88, 25, 160)), r = Q(Z(e, 256, 25, 160), Y("seed.news.card"));
				return n.mobileOrder = Uo(88, t, 0), r.mobileOrder = Uo(88, t, 1), [n, r];
			};
			return Wo("news", "460px", Lo(Ro("bg")), [
				Q(Z(6, 28, 50, 38), Y("seed.news.title")),
				To(Z(78, 30, 16, 36), Y("seed.news.seeAll"), { style: "secondary" }),
				...e(6, 0),
				...e(37.5, 1),
				...e(69, 2)
			]);
		},
		itemLabel: "story",
		itemLabelKey: "item.story",
		item: (e) => {
			let { x: t, y: n, n: r } = Ho(e, 3, 6, 31.5, 88, 344, 25, 328), i = wo(Z(t, n, 25, 160)), a = Q(Z(t, n + 168, 25, 160), Y("seed.news.card"));
			return i.mobileOrder = Uo(88, r, 0), a.mobileOrder = Uo(88, r, 1), {
				blocks: [i, a],
				bottom: n + 352
			};
		}
	}), e.sections.define("news-collection", {
		label: "News (collection)",
		labelKey: "preset.news-collection.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "News cards from a collection: write entries, the cards follow",
		hintKey: "preset.news-collection.hint",
		create: () => Wo("news-collection", "300px", Lo(Ro("bg")), [Q(Z(6, 28, 50, 38), Y("seed.news.title")), Oo(Z(6, 88, 88, 180), "cards")])
	}), e.sections.define("noticeboard", {
		label: "Noticeboard",
		labelKey: "preset.noticeboard.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Dated list from a collection (notices/announcements)",
		hintKey: "preset.noticeboard.hint",
		create: () => Wo("noticeboard", "300px", Lo(Ro("surface")), [Q(Z(6, 28, 50, 38), Y("seed.noticeboard.title")), Oo(Z(6, 88, 88, 180), "list", { limit: 8 })])
	}), e.sections.define("publication-archive", {
		label: "Publication archive",
		labelKey: "preset.publication-archive.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Year-grouped archive from a collection (issues, minutes, reports)",
		hintKey: "preset.publication-archive.hint",
		create: () => Wo("publication-archive", "300px", Lo(Ro("bg")), [Q(Z(6, 28, 60, 38), Y("seed.archive.title")), Oo(Z(6, 88, 88, 180), "archive", { limit: 0 })])
	}), e.sections.define("events", {
		label: "Events",
		labelKey: "preset.events.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Three rows with date badge and sign-up button",
		hintKey: "preset.events.hint",
		create: () => {
			let e = (e, t, n, r) => [
				Q(Z(6, e, 8, 88), Y("seed.events.dateBadge", {
					day: t,
					month: n
				}), {
					align: "center",
					box: !0
				}),
				Q(Z(16, e, 58, 88), Y("seed.events.row", { title: r })),
				To(Z(78, e + 24, 16, 40), Y("seed.events.signup"), { style: "secondary" })
			];
			return Wo("events", "440px", Lo(Ro("surface")), [
				Q(Z(6, 28, 50, 38), Y("seed.events.title")),
				...e(88, "11", Y("seed.events.monthAug"), Y("seed.events.row1")),
				...e(196, "25", Y("seed.events.monthAug"), Y("seed.events.row2")),
				...e(304, "8", Y("seed.events.monthSep"), Y("seed.events.row3"))
			]);
		},
		itemLabel: "row",
		itemLabelKey: "item.row",
		item: (e) => {
			let t = Bo(e) + 16;
			return {
				blocks: [
					Q(Z(6, t, 8, 88), Y("seed.events.newBadge"), {
						align: "center",
						box: !0
					}),
					Q(Z(16, t, 58, 88), Y("seed.events.row", { title: Y("seed.events.newTitle") })),
					To(Z(78, t + 24, 16, 40), Y("seed.events.signup"), { style: "secondary" })
				],
				bottom: t + 116
			};
		}
	}), e.sections.define("team", {
		label: "Team/board",
		labelKey: "preset.team.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Portraits with name, role and email",
		hintKey: "preset.team.hint",
		create: () => {
			let e = (e, t, n) => {
				let r = wo(Z(e, 80, 22, 180), { alt: Y("seed.team.alt") }), i = Q(Z(e, 268, 22, 84), Y("seed.team.member", { role: n }), { align: "center" });
				return r.mobileOrder = Uo(80, t, 0), i.mobileOrder = Uo(80, t, 1), [r, i];
			};
			return Wo("team", "420px", Lo(Ro("surface")), [
				Q(Z(6, 24, 50, 32), Y("seed.team.title")),
				...e(7.5, 0, Y("seed.team.role1")),
				...e(39, 1, Y("seed.team.role2")),
				...e(70.5, 2, Y("seed.team.role3"))
			]);
		},
		itemLabel: "person",
		itemLabelKey: "item.person",
		item: (e) => {
			let { x: t, y: n, n: r } = Ho(e, 3, 7.5, 31.5, 80, 288, 22, 272), i = wo(Z(t, n, 22, 180), { alt: Y("seed.team.alt") }), a = Q(Z(t, n + 188, 22, 84), Y("seed.team.member", { role: Y("seed.team.roleNew") }), { align: "center" });
			return i.mobileOrder = Uo(80, r, 0), a.mobileOrder = Uo(80, r, 1), {
				blocks: [i, a],
				bottom: n + 296
			};
		}
	}), e.sections.define("faq", {
		label: "FAQ",
		labelKey: "preset.faq.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Questions and answers in cards",
		hintKey: "preset.faq.hint",
		create: () => Wo("faq", "520px", Lo(Ro("bg")), [
			Q(Z(25, 24, 50, 36), Y("seed.faq.title"), { align: "center" }),
			No(Z(20, 80, 60, 320), [
				{
					q: Y("seed.faq.q1"),
					a: Y("seed.faq.answer")
				},
				{
					q: Y("seed.faq.q2"),
					a: Y("seed.faq.answer")
				},
				{
					q: Y("seed.faq.q3"),
					a: Y("seed.faq.answer")
				}
			]),
			Q(Z(20, 416, 60, 32), Y("seed.faq.more"), { align: "center" })
		])
	}), e.sections.define("timeline", {
		label: "Timeline",
		labelKey: "preset.timeline.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Your story as events along a line",
		hintKey: "preset.timeline.hint",
		create: () => Wo("timeline", "480px", Lo(Ro("bg")), [Q(Z(25, 24, 50, 36), Y("seed.timeline.title"), { align: "center" }), Fo(Z(25, 88, 50, 330), [
			{
				year: "2019",
				title: Y("seed.timeline.t1"),
				text: Y("seed.timeline.text")
			},
			{
				year: "2022",
				title: Y("seed.timeline.t2"),
				text: Y("seed.timeline.text")
			},
			{
				year: "2026",
				title: Y("seed.timeline.t3"),
				text: Y("seed.timeline.text")
			}
		])])
	}), e.sections.define("steps", {
		label: "Step by step",
		labelKey: "preset.steps.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Three numbered cards",
		hintKey: "preset.steps.hint",
		create: () => {
			let e = (e, t, n) => {
				let r = Q(Z(e, 88, 25, 72), `<h3>${t + 1}</h3>`, {
					align: "center",
					size: 44
				}), i = Q(Z(e, 168, 25, 160), Y("seed.steps.card", { title: n }), {
					align: "center",
					box: !0
				});
				return r.mobileOrder = Uo(88, t, 0), i.mobileOrder = Uo(88, t, 1), [r, i];
			};
			return Wo("steps", "400px", Lo(Ro("bg")), [
				Q(Z(6, 28, 60, 38), Y("seed.steps.title")),
				...e(6, 0, Y("seed.steps.s1")),
				...e(37.5, 1, Y("seed.steps.s2")),
				...e(69, 2, Y("seed.steps.s3"))
			]);
		},
		itemLabel: "step",
		itemLabelKey: "item.step",
		item: (e) => {
			let { x: t, y: n, n: r } = Ho(e, 3, 6, 31.5, 88, 272, 25, 240), i = Q(Z(t, n, 25, 72), `<h3>${r + 1}</h3>`, {
				align: "center",
				size: 44
			}), a = Q(Z(t, n + 80, 25, 160), Y("seed.steps.card", { title: Y("seed.steps.newTitle") }), {
				align: "center",
				box: !0
			});
			return i.mobileOrder = Uo(88, r, 0), a.mobileOrder = Uo(88, r, 1), {
				blocks: [i, a],
				bottom: n + 268
			};
		}
	}), e.sections.define("lead-story", {
		label: "Lead story",
		labelKey: "preset.lead-story.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "One big story and two small beside it",
		hintKey: "preset.lead-story.hint",
		create: () => {
			let e = [
				wo(Z(6, 40, 55, 300)),
				Q(Z(6, 348, 55, 108), Y("seed.feature.main")),
				To(Z(6, 464, 14, 38), Y("seed.readMore"), { style: "secondary" }),
				wo(Z(66, 40, 28, 120)),
				Q(Z(66, 164, 28, 60), Y("seed.feature.small1")),
				wo(Z(66, 244, 28, 120)),
				Q(Z(66, 368, 28, 60), Y("seed.feature.small2"))
			];
			return e.forEach((e, t) => {
				e.mobileOrder = Uo(40, t < 3 ? 0 : 1, t);
			}), Wo("lead-story", "540px", Lo(Ro("bg")), e);
		}
	}), e.sections.define("products", {
		label: "Products",
		labelKey: "preset.products.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Three hand-built product cards with their own buy link; the Shop preset gives real products with a basket",
		hintKey: "preset.products.hint",
		create: () => {
			let e = (e, t, n, r) => {
				let i = [
					wo(Z(e, 88, 25, 200)),
					Q(Z(e, 296, 25, 76), Y("seed.products.card", {
						name: n,
						price: r
					}), { align: "center" }),
					To(Z(e + 5, 380, 15, 40), Y("seed.products.buy"))
				];
				return i.forEach((e, n) => {
					e.mobileOrder = Uo(88, t, n);
				}), i;
			};
			return Wo("products", "470px", Lo(Ro("bg")), [
				Q(Z(6, 28, 50, 38), Y("seed.products.title")),
				...e(6, 0, Y("seed.products.name"), Y("seed.products.price1")),
				...e(37.5, 1, Y("seed.products.name"), Y("seed.products.price2")),
				...e(69, 2, Y("seed.products.name"), Y("seed.products.price3"))
			]);
		},
		itemLabel: "product",
		itemLabelKey: "item.product",
		item: (e) => {
			let { x: t, y: n, n: r } = Ho(e, 3, 6, 31.5, 88, 348, 25, 332), i = [
				wo(Z(t, n, 25, 200)),
				Q(Z(t, n + 208, 25, 76), Y("seed.products.card", {
					name: Y("seed.products.name"),
					price: Y("seed.products.price1")
				}), { align: "center" }),
				To(Z(t + 5, n + 292, 15, 40), Y("seed.products.buy"))
			];
			return i.forEach((e, t) => {
				e.mobileOrder = Uo(88, r, t);
			}), {
				blocks: i,
				bottom: n + 356
			};
		}
	}), e.sections.define("shop", {
		label: "Shop",
		labelKey: "preset.shop.label",
		group: "Shop",
		groupKey: "presetGroup.shop",
		hint: "Real product cards from a product collection, with a basket",
		hintKey: "preset.shop.hint",
		create: () => Wo("shop", "544px", Lo(Ro("bg")), [
			Q(Z(6, 28, 50, 38), Y("seed.shop.title")),
			Ao(Z(78, 88, 16, 48)),
			ko(Z(6, 176, 88, 320))
		])
	}), e.sections.define("shop-hero", {
		label: "Shop hero",
		labelKey: "preset.shop-hero.label",
		group: "Shop",
		groupKey: "presetGroup.shop",
		hint: "Campaign band: big heading, subtext, CTA and a campaign image",
		hintKey: "preset.shop-hero.hint",
		create: () => {
			let e = [
				Q(Z(6, 48, 52, 96), Y("seed.shopHero.title")),
				Q(Z(6, 152, 40, 48), Y("seed.shopHero.sub")),
				To(Z(6, 216, 17, 42), Y("seed.shopHero.cta")),
				wo(Z(62, 40, 32, 300))
			];
			return e.forEach((e, t) => {
				e.mobileOrder = Uo(48, t < 3 ? 0 : 1, t);
			}), Wo("shop-hero", "400px", {
				version: 1,
				layers: [
					Ro("bg"),
					zo(.8, .25, .28, .6),
					{
						type: "grain",
						version: 1,
						props: { opacity: .05 }
					}
				]
			}, e);
		}
	}), e.sections.define("shop-categories", {
		label: "Shop categories",
		labelKey: "preset.shop-categories.label",
		group: "Shop",
		groupKey: "presetGroup.shop",
		hint: "Four category tiles with image and name; set the link on the image in Properties",
		hintKey: "preset.shop-categories.hint",
		create: () => {
			let e = (e, t, n) => {
				let r = wo(Z(e, 88, 21, 170)), i = Q(Z(e, 266, 21, 34), Y("seed.shopCategories.tile", { name: n }), { align: "center" });
				return r.mobileOrder = Uo(88, t, 0), i.mobileOrder = Uo(88, t, 1), [r, i];
			}, t = Wo("shop-categories", "360px", Lo(Ro("bg")), [
				Q(Z(6, 28, 60, 38), Y("seed.shopCategories.title")),
				...e(6, 0, Y("seed.shopCategories.cat1")),
				...e(29.5, 1, Y("seed.shopCategories.cat2")),
				...e(53, 2, Y("seed.shopCategories.cat3")),
				...e(76.5, 3, Y("seed.shopCategories.cat4"))
			]);
			return t.theme = "soft", t;
		},
		itemLabel: "category",
		itemLabelKey: "item.category",
		item: (e) => {
			let { x: t, y: n, n: r } = Ho(e, 4, 6, 23.5, 88, 220, 21, 212), i = wo(Z(t, n, 21, 170)), a = Q(Z(t, n + 178, 21, 34), Y("seed.shopCategories.tile", { name: Y("seed.shopCategories.newCat") }), { align: "center" });
			return i.mobileOrder = Uo(88, r, 0), a.mobileOrder = Uo(88, r, 1), {
				blocks: [i, a],
				bottom: n + 220
			};
		}
	}), e.sections.define("shop-trust", {
		label: "Shop trust",
		labelKey: "preset.shop-trust.label",
		group: "Shop",
		groupKey: "presetGroup.shop",
		hint: "Three trust points with icon and text (returns, help, safe ordering)",
		hintKey: "preset.shop-trust.hint",
		create: () => {
			let e = (e, t, n, r) => {
				let i = Eo(Z(e + 10.5, 88, 4, 52), r, 44), a = Q(Z(e, 148, 25, 96), Y(n), { align: "center" });
				return i.mobileOrder = Uo(88, t, 0), a.mobileOrder = Uo(88, t, 1), [i, a];
			}, t = Wo("shop-trust", "300px", Lo(Ro("bg")), [
				Q(Z(6, 28, 60, 38), Y("seed.shopTrust.title")),
				...e(6, 0, "seed.shopTrust.t1", "✓"),
				...e(37.5, 1, "seed.shopTrust.t2", "↻"),
				...e(69, 2, "seed.shopTrust.t3", "✉")
			]);
			return t.theme = "muted", t;
		},
		itemLabel: "card",
		itemLabelKey: "item.card",
		item: (e) => {
			let { x: t, y: n, n: r } = Ho(e, 3, 6, 31.5, 148, 216, 25, 156, -60), i = Eo(Z(t + 10.5, n - 60, 4, 52), "✓", 44), a = Q(Z(t, n, 25, 96), Y("seed.shopTrust.newItem"), { align: "center" });
			return i.mobileOrder = Uo(88, r, 0), a.mobileOrder = Uo(88, r, 1), {
				blocks: [i, a],
				bottom: n + 104
			};
		}
	}), e.sections.define("shop-showcase", {
		label: "Shop feature",
		labelKey: "preset.shop-showcase.label",
		group: "Shop",
		groupKey: "presetGroup.shop",
		hint: "Statement band: big typography, text, CTA and an image on a deep surface",
		hintKey: "preset.shop-showcase.hint",
		create: () => {
			let e = [
				Q(Z(6, 56, 52, 100), Y("seed.shopShowcase.title")),
				Q(Z(6, 164, 42, 56), Y("seed.shopShowcase.text")),
				To(Z(6, 236, 18, 42), Y("seed.shopShowcase.cta")),
				wo(Z(62, 48, 32, 240))
			];
			e.forEach((e, t) => {
				e.mobileOrder = Uo(56, t < 3 ? 0 : 1, t);
			});
			let t = Wo("shop-showcase", "340px", Lo(Ro("bg")), e);
			return t.theme = "deep", t;
		}
	}), e.sections.define("checkout", {
		label: "Checkout",
		labelKey: "preset.checkout.label",
		group: "Shop",
		groupKey: "presetGroup.shop",
		hint: "Order form that sends the basket as an email or to an endpoint",
		hintKey: "preset.checkout.hint",
		create: () => Wo("checkout", "560px", Lo(Ro("bg")), [Q(Z(6, 28, 50, 38), Y("seed.checkout.title")), jo(Z(25, 96, 50, 430))])
	}), e.sections.define("cta", {
		label: "CTA banner",
		labelKey: "preset.cta.label",
		group: "Highlight",
		groupKey: "presetGroup.highlight",
		hint: "Full width with one clear action",
		hintKey: "preset.cta.hint",
		create: () => Wo("cta", "280px", Lo(Ro("surface"), zo(.5, .5, .3, .7)), [
			Q(Z(20, 56, 60, 40), Y("seed.cta.title"), { align: "center" }),
			Q(Z(25, 104, 50, 26), Y("seed.cta.sub"), { align: "center" }),
			To(Z(42, 148, 16, 42), Y("seed.join"))
		])
	}), e.sections.define("quote", {
		label: "Quote",
		labelKey: "preset.quote.label",
		group: "Highlight",
		groupKey: "presetGroup.highlight",
		hint: "Large quote with attribution",
		hintKey: "preset.quote.hint",
		create: () => Wo("quote", "300px", Lo(Ro("bg")), [Po(Z(20, 56, 60, 190), {
			text: Y("seed.quoteBlock.text"),
			attribution: Y("seed.quoteBlock.name"),
			role: Y("seed.quoteBlock.role")
		})])
	}), e.sections.define("stats", {
		label: "Statistics",
		labelKey: "preset.stats.label",
		group: "Highlight",
		groupKey: "presetGroup.highlight",
		hint: "Three big numbers with labels",
		hintKey: "preset.stats.hint",
		create: () => {
			let e = (e, t, n, r, i) => {
				let a = Io(Z(e, 76, 25, 120), {
					value: n,
					suffix: r,
					label: i
				});
				return a.mobileOrder = Uo(76, t, 0), a;
			};
			return Wo("stats", "260px", Lo(Ro("surface")), [
				e(6, 0, "120", "+", Y("seed.stats.l1")),
				e(37.5, 1, "25", "", Y("seed.stats.l2")),
				e(69, 2, "1981", "", Y("seed.stats.l3"))
			]);
		},
		itemLabel: "number",
		itemLabelKey: "item.number",
		item: (e) => {
			let { x: t, y: n, n: r } = Ho(e, 3, 6, 31.5, 76, 140, 25, 120), i = Io(Z(t, n, 25, 120), {
				value: "42",
				label: Y("seed.stats.newLabel")
			});
			return i.mobileOrder = Uo(76, r, 0), {
				blocks: [i],
				bottom: n + 148
			};
		}
	}), e.sections.define("sponsors", {
		label: "Sponsors",
		labelKey: "preset.sponsors.label",
		group: "Highlight",
		groupKey: "presetGroup.highlight",
		hint: "Greyscale logo row with links",
		hintKey: "preset.sponsors.hint",
		create: () => {
			let e = (e) => wo(Z(e, 108, 18.5, 100), {
				alt: Y("seed.sponsors.alt"),
				fit: "contain",
				radius: null,
				saturate: 0
			});
			return Wo("sponsors", "280px", Lo(Ro("bg")), [
				Q(Z(6, 28, 60, 36), Y("seed.sponsors.title")),
				e(5.5),
				e(29),
				e(52.5),
				e(76)
			]);
		},
		itemLabel: "logo",
		itemLabelKey: "item.logo",
		item: (e) => {
			let { x: t, y: n } = Ho(e, 4, 5.5, 23.5, 108, 124, 18.5, 100);
			return {
				blocks: [wo(Z(t, n, 18.5, 100), {
					alt: Y("seed.sponsors.alt"),
					fit: "contain",
					radius: null,
					saturate: 0
				})],
				bottom: n + 124
			};
		}
	}), e.sections.define("membership", {
		label: "Membership",
		labelKey: "preset.membership.label",
		group: "Highlight",
		groupKey: "presetGroup.highlight",
		hint: "Price tiers with benefits and a Vipps line",
		hintKey: "preset.membership.hint",
		create: () => Wo("membership", "500px", Lo(Ro("surface")), [
			Q(Z(6, 28, 50, 38), Y("seed.membership.title")),
			Q(Z(14, 88, 32, 250), Y("seed.membership.tier1"), {
				align: "center",
				box: !0
			}),
			Q(Z(54, 88, 32, 250), Y("seed.membership.tier2"), {
				align: "center",
				box: !0
			}),
			To(Z(42, 358, 16, 42), Y("seed.join")),
			Q(Z(25, 414, 50, 30), Y("seed.membership.vipps"), { align: "center" })
		])
	});
}
//#endregion
//#region ../template/assets/engine/0.6.11/templates-model.js
var Ko = [
	"section",
	"blocks",
	"page"
];
function qo(e) {
	return ya(String(e ?? ""), "");
}
function Jo(e, t, { id: n, title: r }) {
	let i = structuredClone(e);
	i.meta = {
		...i.meta,
		id: n,
		title: r
	};
	for (let e of i.sections ?? []) {
		e.id = t("sec");
		for (let n of e.blocks ?? []) n.id = t("blk");
	}
	return i;
}
//#endregion
//#region ../template/assets/engine/0.6.11/collections-csv.js
var Yo = [
	"id",
	"title",
	"date",
	"text",
	"href",
	"image",
	"price",
	"memberPrice",
	"badge",
	"sizes",
	"colors"
];
function Xo(e) {
	let t = String(e ?? "");
	return /[",\n\r]/.test(t) ? `"${t.replaceAll("\"", "\"\"")}"` : t;
}
function Zo(e, t) {
	return t === "sizes" ? (e.sizes ?? []).join("|") : t === "colors" ? (e.colors ?? []).map((e) => e.name).join("|") : e[t] ?? "";
}
function Qo(e) {
	let t = [Yo.join(",")];
	for (let n of e ?? []) t.push(Yo.map((e) => Xo(Zo(n, e))).join(","));
	return t.join("\n") + "\n";
}
function $o(e) {
	let t = [], n = [], r = "", i = !1, a = String(e ?? "");
	for (let e = 0; e < a.length; e += 1) {
		let o = a[e];
		i ? o === "\"" && a[e + 1] === "\"" ? (r += "\"", e += 1) : o === "\"" ? i = !1 : r += o : o === "\"" ? i = !0 : o === "," ? (n.push(r), r = "") : o === "\n" || o === "\r" ? (o === "\r" && a[e + 1] === "\n" && (e += 1), n.push(r), t.push(n), n = [], r = "") : r += o;
	}
	return (r !== "" || n.length) && (n.push(r), t.push(n)), t.filter((e) => e.some((e) => e.trim() !== ""));
}
var es = (e) => String(e ?? "").split("|").map((e) => e.trim()).filter(Boolean);
function ts(e) {
	let t = $o(e);
	if (t.length < 2) return null;
	let n = t[0].map((e) => e.trim());
	if (!n.includes("title")) return null;
	let r = [], i = 0;
	for (let e of t.slice(1)) {
		let t = {};
		n.forEach((n, r) => {
			t[n] = e[r] ?? "";
		});
		let a = String(t.title ?? "").trim();
		if (!a) {
			i += 1;
			continue;
		}
		let o = {
			id: String(t.id ?? "").trim(),
			title: a
		};
		for (let e of [
			"date",
			"text",
			"href",
			"image",
			"badge"
		]) {
			let n = String(t[e] ?? "").trim();
			n && (o[e] = n);
		}
		for (let e of ["price", "memberPrice"]) {
			let n = String(t[e] ?? "").trim();
			if (n === "") continue;
			let r = Number(n.replace(",", "."));
			Number.isFinite(r) && r >= 0 && (o[e] = r);
		}
		let s = es(t.sizes);
		s.length && (o.sizes = s);
		let c = es(t.colors);
		c.length && (o.colors = c.map((e) => ({ name: e }))), r.push(o);
	}
	return {
		entries: r,
		skipped: i
	};
}
//#endregion
//#region ../template/assets/engine/0.6.11/feeds.js
function ns(e) {
	return String(e ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;").replaceAll("'", "&apos;");
}
function rs(e, t) {
	let n = String(t ?? "").replace(/\/+$/, "");
	return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${(e ?? []).filter((e) => !e.noindex).map((e) => `  <url><loc>${ns(n + (e.path === "/" ? "/" : e.path))}</loc></url>`).join("\n")}\n</urlset>\n`;
}
function is(e) {
	return `User-agent: *\nDisallow: /admin/\n\nSitemap: ${String(e ?? "").replace(/\/+$/, "")}/sitemap.xml\n`;
}
var as = [
	"news",
	"notices",
	"publications"
];
function os(e) {
	let t = String(e.origin ?? "").replace(/\/+$/, ""), n = (e.items ?? []).map((n) => {
		let r = n.href ? new URL(n.href, t + "/").href : t + "/", i = n.date ? new Date(n.date) : null, a = i && !Number.isNaN(i.getTime()) ? `\n      <pubDate>${i.toUTCString()}</pubDate>` : "", o = n.text ? `\n      <description>${ns(n.text)}</description>` : "";
		return `    <item>\n      <title>${ns(n.title)}</title>\n      <link>${ns(r)}</link>\n      <guid isPermaLink="false">${ns(`${e.path}#${n.id ?? n.title}`)}</guid>${o}${a}\n    </item>`;
	}).join("\n");
	return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${ns(e.title)}</title>\n    <link>${ns(t + "/")}</link>\n    <description>${ns(e.description ?? e.title)}</description>\n${n}${n ? "\n" : ""}  </channel>\n</rss>\n`;
}
//#endregion
//#region ../template/assets/engine/0.6.11/preset-thumb.js
var ss = /^#[0-9a-fA-F]{3,8}$/, cs = /^[a-z][a-z0-9-]*$/, ls = "#171c26", us = "#232a38", ds = "#98a1b3", fs = "#7c5cff", ps = (e, t) => `var(--urd-color-${e}, ${t})`;
function ms(e, t) {
	return typeof e == "string" ? ss.test(e) ? e : cs.test(e) ? ps(e, t) : t : t;
}
function hs(e, t = 800) {
	let n = Number.parseFloat(e);
	return !Number.isFinite(n) || n <= 0 ? 400 : typeof e == "string" && e.trim().endsWith("vh") ? n / 100 * t : n;
}
var $ = (e) => Math.round(e * 10) / 10, gs = (e, t, n) => Math.min(n, Math.max(t, e)), _s = (e, t, n, r, i, a = "") => `<rect x="${$(e)}" y="${$(t)}" width="${$(Math.max(n, 1))}" height="${$(Math.max(r, 1))}" fill="${i}"${a}/>`;
function vs(e) {
	if (e?.theme) return e.theme === "inverse" || e.theme === "deep" ? ps("text", ds) : e.theme === "accent" ? ps("accent", fs) : ps("surface", us);
	for (let t of e?.background?.layers ?? []) {
		if (t.type === "color") return ms(t.props?.value, ls);
		if (t.type === "gradient") return ms(Array.isArray(t.props?.stops) ? t.props.stops[0] : null, ls);
	}
	return ps("bg", ls);
}
function ys(e, t, n, r, i) {
	let a = /<h[1-3]/.test(String(i?.html ?? "")), o = i?.align === "center", s = ps("text", ds), c = [];
	i?.box && c.push(_s(e, t, n, r, ps("surface", us), " rx=\"1.5\""));
	let l = i?.box ? Math.min(2, n * .06) : 0, u = e + l, d = n - l * 2, f = [
		.72,
		.9,
		.5
	], p = [
		a ? 4 : 2.2,
		2.2,
		2.2
	], m = gs(r / (p[0] + p[1] + p[2] + 4.8 + 2), 0, 1), h = t + l + Math.min(1, r * .08);
	for (let e = 0; e < 3; e++) {
		let n = Math.min(Math.max(e === 0 ? a ? 1.4 : 1 : .8, p[e] * m), Math.max(r, 1));
		if (e > 0 && h + n > t + r - l) break;
		let i = d * f[e], g = o ? u + (d - i) / 2 : u;
		c.push(_s(g, h, i, n, s, ` opacity="${e === 0 ? .8 : .4}" rx="${$(Math.min(1, n / 2))}"`)), h += n + Math.max(.8, 2.4 * m);
	}
	return c.join("");
}
function bs(e, t, n, r, i = !1) {
	let a = ps("text", ds), o = [];
	i ? (o.push(_s(e, t, n, r, ps("surface", us), " rx=\"1.5\" opacity=\"0.35\"")), o.push(`<rect x="${$(e + .4)}" y="${$(t + .4)}" width="${$(Math.max(n - .8, 1))}" height="${$(Math.max(r - .8, 1))}" fill="none" stroke="${a}" stroke-width="0.6" stroke-dasharray="2 2" opacity="0.35" rx="1.5"/>`)) : o.push(_s(e, t, n, r, ps("surface", us), " rx=\"1.5\""));
	let s = i ? .15 : .4, c = (t) => $(e + n * t), l = (e) => $(t + r * e);
	return o.push(`<polygon points="${c(.08)},${l(.9)} ${c(.42)},${l(.38)} ${c(.62)},${l(.68)} ${c(.75)},${l(.5)} ${c(.92)},${l(.9)}" fill="${a}" opacity="${s}"/>`), o.push(`<circle cx="${c(.28)}" cy="${l(.26)}" r="${$(Math.max(1, Math.min(n, r) * .1))}" fill="${a}" opacity="${$(s + .1)}"/>`), o.join("");
}
function xs(e, t, n, r, i) {
	let a = !(Array.isArray(i?.images) && i.images.length), o = Math.max(1, n * .03), s = (n - o * 2) / 3, c = [];
	for (let n = 0; n < 3; n++) c.push(bs(e + n * (s + o), t, s, r, a));
	return c.join("");
}
function Ss(e, t, n, r) {
	let i = Math.max(1, n * .03), a = (n - i * 2) / 3, o = [];
	for (let n = 0; n < 3; n++) {
		let s = e + n * (a + i);
		o.push(_s(s, t, a, r * .55, ps("surface", us), " rx=\"1.5\"")), o.push(_s(s, t + r * .62, a * .8, 2, ps("text", ds), " opacity=\"0.5\" rx=\"1\""));
	}
	return o.join("");
}
function Cs(e, t, n, r, i) {
	let a = ms(i?.color, fs), o = i?.kind;
	return o === "circle" ? `<ellipse cx="${$(e + n / 2)}" cy="${$(t + r / 2)}" rx="${$(Math.max(n / 2, 1))}" ry="${$(Math.max(r / 2, 1))}" fill="${a}" opacity="0.8"/>` : o === "triangle" ? `<polygon points="${$(e)},${$(t + r)} ${$(e + n / 2)},${$(t)} ${$(e + n)},${$(t + r)}" fill="${a}" opacity="0.8"/>` : o === "line" || o === "arrow" ? _s(e, t + r / 2 - .75, n, 1.5, a, " opacity=\"0.85\" rx=\"0.75\"") : _s(e, t, n, r, a, " opacity=\"0.8\" rx=\"1\"");
}
function ws(e, t, n, r, i, a) {
	if (e === "text") return ys(t, n, r, i, a);
	if (e === "image") return bs(t, n, r, i, !a?.src);
	if (e === "gallery") return xs(t, n, r, i, a);
	if (e === "collection") return Ss(t, n, r, i);
	if (e === "faq") {
		let e = gs(Math.floor(i / 5), 2, 3), a = Math.max(.6, i * .04), o = (i - a * (e - 1)) / e, s = [];
		for (let i = 0; i < e; i += 1) {
			let e = n + i * (o + a);
			s.push(_s(t, e, r, o, ps("surface", us), " rx=\"1\"")), s.push(_s(t + r * .06, e + o / 2 - .7, r * .55, 1.4, ps("text", ds), " opacity=\"0.5\" rx=\"0.7\"")), s.push(`<circle cx="${$(t + r * .92)}" cy="${$(e + o / 2)}" r="0.9" fill="${ps("text", ds)}" opacity="0.4"/>`);
		}
		return s.join("");
	}
	if (e === "shape") return Cs(t, n, r, i, a);
	if (e === "button") return _s(t, n, r, i, ps("accent", fs), ` rx="${$(Math.min(i / 2, 4))}"`);
	if (e === "icon") {
		let e = Math.max(1.2, Math.min(r, i) / 2);
		return `<circle cx="${$(t + r / 2)}" cy="${$(n + i / 2)}" r="${$(e)}" fill="${ps("accent", fs)}" opacity="0.85"/>`;
	}
	if (e === "video") {
		let e = [_s(t, n, r, i, ps("surface", us), " rx=\"1.5\"")], a = t + r / 2, o = n + i / 2, s = Math.max(1.5, Math.min(r, i) * .22);
		return e.push(`<polygon points="${$(a - s / 2)},${$(o - s)} ${$(a - s / 2)},${$(o + s)} ${$(a + s)},${$(o)}" fill="${ps("text", ds)}" opacity="0.6"/>`), e.join("");
	}
	if (e === "timeline") {
		let e = [_s(t + 1, n, 1.4, i, ps("accent", fs), " opacity=\"0.7\" rx=\"0.7\"")];
		for (let a = 0; a < 3; a += 1) {
			let o = n + i * (.18 + a * .32);
			e.push(`<circle cx="${$(t + 1.7)}" cy="${$(o)}" r="1.6" fill="${ps("accent", fs)}"/>`), e.push(_s(t + 5, o - 1, r * .5, 2, ps("text", ds), " opacity=\"0.5\" rx=\"1\""));
		}
		return e.join("");
	}
	if (e === "quote") return [
		`<text x="${$(t + r / 2)}" y="${$(n + i * .34)}" text-anchor="middle" font-size="${$(Math.min(r, i) * .5)}" font-family="Georgia, serif" fill="${ps("accent", fs)}">“</text>`,
		_s(t + r * .15, n + i * .48, r * .7, 2, ps("text", ds), " opacity=\"0.6\" rx=\"1\""),
		_s(t + r * .25, n + i * .62, r * .5, 2, ps("text", ds), " opacity=\"0.6\" rx=\"1\""),
		_s(t + r * .35, n + i * .82, r * .3, 1.6, ps("text", ds), " opacity=\"0.35\" rx=\"0.8\"")
	].join("");
	if (e === "stats") return [_s(t + r * .28, n + i * .15, r * .44, i * .42, ps("accent", fs), " opacity=\"0.85\" rx=\"1\""), _s(t + r * .32, n + i * .72, r * .36, 1.6, ps("text", ds), " opacity=\"0.4\" rx=\"0.8\"")].join("");
	if (e === "table") {
		let e = Math.max(1.6, i * .22), a = [_s(t, n, r, e, ps("accent", fs), " opacity=\"0.5\" rx=\"0.8\"")], o = gs(Math.floor((i - e) / 3.2), 1, 3);
		for (let s = 0; s < o; s += 1) a.push(_s(t, n + e + 1 + s * ((i - e - 1) / o), r, 1, ps("text", ds), " opacity=\"0.3\""));
		return a.push(_s(t + r * .33, n, .6, i, ps("text", ds), " opacity=\"0.2\"")), a.push(_s(t + r * .66, n, .6, i, ps("text", ds), " opacity=\"0.2\"")), a.join("");
	}
	if (e === "share") {
		let e = Math.max(1.2, Math.min(i / 2, r / 9)), a = [];
		for (let r = 0; r < 4; r += 1) a.push(`<circle cx="${$(t + e + r * (e * 2 + 1.5))}" cy="${$(n + i / 2)}" r="${$(e)}" fill="${ps("accent", fs)}" opacity="0.8"/>`);
		return a.join("");
	}
	if (e === "countdown") {
		let e = Math.max(.8, r * .03), a = (r - e * 3) / 4, o = [];
		for (let r = 0; r < 4; r += 1) {
			let s = t + r * (a + e);
			o.push(_s(s, n, a, i, ps("surface", us), " rx=\"1\"")), o.push(_s(s + a * .25, n + i * .2, a * .5, i * .35, ps("accent", fs), " opacity=\"0.85\" rx=\"0.8\""));
		}
		return o.join("");
	}
	if (e === "audio") {
		let e = [_s(t, n, r, i, ps("surface", us), " rx=\"1.5\"")], a = n + i / 2, o = Math.max(1.2, i * .28);
		return e.push(`<polygon points="${$(t + r * .06)},${$(a - o)} ${$(t + r * .06)},${$(a + o)} ${$(t + r * .06 + o * 1.4)},${$(a)}" fill="${ps("accent", fs)}" opacity="0.85"/>`), e.push(_s(t + r * .2, a - .6, r * .7, 1.2, ps("text", ds), " opacity=\"0.35\" rx=\"0.6\"")), e.join("");
	}
	if (e === "product") {
		let e = Math.max(.8, r * .03), a = (r - e * 2) / 3, o = [];
		for (let r = 0; r < 3; r += 1) {
			let s = t + r * (a + e);
			o.push(_s(s, n, a, i, ps("surface", us), " rx=\"1\"")), o.push(_s(s + a * .08, n + i * .06, a * .84, i * .42, ps("text", ds), " opacity=\"0.15\" rx=\"0.8\"")), o.push(_s(s + a * .08, n + i * .56, a * .6, 1.4, ps("text", ds), " opacity=\"0.5\" rx=\"0.7\"")), o.push(_s(s + a * .08, n + i * .72, a * .35, 1.4, ps("accent", fs), " opacity=\"0.85\" rx=\"0.7\"")), o.push(_s(s + a * .08, n + i * .84, a * .84, i * .1, ps("accent", fs), " opacity=\"0.6\" rx=\"1\""));
		}
		return o.join("");
	}
	if (e === "cart") {
		let e = Math.max(1.5, Math.min(r, i) / 2.4), a = t + r / 2, o = n + i / 2;
		return [
			`<circle cx="${$(a)}" cy="${$(o)}" r="${$(e)}" fill="${ps("surface", us)}"/>`,
			_s(a - e * .5, o - e * .25, e, e * .55, ps("text", ds), " opacity=\"0.5\" rx=\"0.4\""),
			`<circle cx="${$(a + e * .75)}" cy="${$(o - e * .75)}" r="${$(Math.max(.9, e * .35))}" fill="${ps("accent", fs)}"/>`
		].join("");
	}
	return e === "checkout" ? [
		_s(t, n, r * .7, 1.2, ps("text", ds), " opacity=\"0.5\" rx=\"0.6\""),
		_s(t, n + i * .12, r * .5, 1.2, ps("text", ds), " opacity=\"0.35\" rx=\"0.6\""),
		_s(t, n + i * .3, r, i * .14, ps("surface", us), " rx=\"1\""),
		_s(t, n + i * .5, r, i * .14, ps("surface", us), " rx=\"1\""),
		_s(t, n + i * .78, r * .45, i * .16, ps("accent", fs), " opacity=\"0.85\" rx=\"1.2\"")
	].join("") : _s(t, n, r, i, ps("surface", us), " rx=\"1.5\"");
}
function Ts(e, t, n) {
	let r = Array.isArray(e?.blocks) ? e.blocks : [], i = r.map((e) => (e.frames?.desktop?.y ?? 0) + (e.frames?.desktop?.h ?? 0)), a = n / Math.max(hs(e?.size?.minHeight), i.length ? Math.max(...i) + 16 : 0), o = [_s(0, 0, t, n, vs(e))];
	for (let r of e?.background?.layers ?? []) {
		if (r.type !== "glow") continue;
		let e = r.props ?? {};
		o.push(`<circle cx="${$(gs(e.x ?? .5, 0, 1) * t)}" cy="${$(gs(e.y ?? .3, 0, 1) * n)}" r="${$(t * gs(e.radius ?? .5, .1, 1) * .5)}" fill="${ms(e.color, fs)}" opacity="${$(gs(e.opacity ?? .3, 0, .5))}"/>`);
	}
	let s = t * .06, c = t - s * 2;
	for (let e of r) {
		let r = e.frames?.desktop;
		if (!r) continue;
		let i = gs(s + (r.x ?? 0) * (c / 100), 0, t - 2), l = gs((r.y ?? 0) * a, 0, n - 2), u = gs((r.w ?? 10) * (c / 100), 2, t - i), d = gs((r.h ?? 20) * a, 2, n - l);
		o.push(ws(e.type, i, l, u, d, e.props));
	}
	return o.join("");
}
function Es(e, { w: t = 96, h: n = 116, max: r = 6 } = {}) {
	let i = (Array.isArray(e?.sections) ? e.sections : []).slice(0, r);
	if (!i.length) return `<svg viewBox="0 0 ${t} ${n}" width="${t}" height="${n}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${_s(0, 0, t, n, ps("bg", ls))}</svg>`;
	let a = i.map((e) => gs(hs(e?.size?.minHeight), 160, 900)), o = a.reduce((e, t) => e + t, 0), s = n - 1 * (i.length - 1), c = [], l = 0;
	for (let e = 0; e < i.length; e += 1) {
		let n = Math.max(6, a[e] / o * s);
		c.push(`<g transform="translate(0 ${$(l)})">${Ts(i[e], t, n)}</g>`), l += n + 1;
	}
	return `<svg viewBox="0 0 ${t} ${n}" width="${t}" height="${n}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${c.join("")}</svg>`;
}
//#endregion
//#region ../template/assets/engine/0.6.11/page-presets.js
var Ds = /* @__PURE__ */ new Map();
Go({ sections: { define: (e, t) => Ds.set(e, t) } });
var Os = [
	{
		id: "landing",
		labelKey: "pageTemplate.landing",
		sections: [
			"hero",
			"feature-cards",
			"stats",
			"quote",
			"cta"
		]
	},
	{
		id: "about",
		labelKey: "pageTemplate.about",
		sections: [
			"hero-centered",
			"team",
			"timeline",
			"sponsors",
			"cta"
		]
	},
	{
		id: "contact",
		labelKey: "pageTemplate.contact",
		sections: [
			"hero-centered",
			"contact",
			"faq"
		]
	},
	{
		id: "portfolio",
		labelKey: "pageTemplate.portfolio",
		sections: [
			"hero-centered",
			"gallery",
			"quote",
			"cta"
		]
	},
	{
		id: "event",
		labelKey: "pageTemplate.event",
		sections: [
			"lead-story",
			"events",
			"steps",
			"faq",
			"cta"
		]
	},
	{
		id: "shop",
		labelKey: "pageTemplate.shop",
		sections: [
			"shop-hero",
			"shop",
			"faq",
			"cta"
		]
	},
	{
		id: "shop-front",
		labelKey: "pageTemplate.shopFront",
		sections: [
			"shop-hero",
			"shop",
			"shop-categories",
			"shop-showcase",
			"shop-trust",
			"cta"
		]
	},
	{
		id: "checkout",
		labelKey: "pageTemplate.checkout",
		sections: ["checkout", "contact"]
	}
];
function ks(e, { pageId: t, title: n }) {
	let r = Os.find((t) => t.id === e);
	return r ? {
		schemaVersion: 4,
		meta: {
			id: t,
			title: n
		},
		sections: r.sections.map((e) => Ds.get(e).create())
	} : null;
}
//#endregion
//#region ../template/assets/engine/0.6.11/palette-search.js
function As(e) {
	return String(e ?? "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}
function js(e, t) {
	let n = As(t).trim(), r = As(e);
	return n ? r.startsWith(n) ? 0 : r.split(/[^a-z0-9]+/).some((e) => e.startsWith(n)) ? 1 : r.includes(n) ? 2 : -1 : 2;
}
function Ms(e, t, n) {
	return e.map((e, r) => ({
		item: e,
		i: r,
		rank: js(n(e), t)
	})).filter((e) => e.rank >= 0).sort((e, t) => e.rank - t.rank || e.i - t.i).map((e) => e.item);
}
//#endregion
//#region ../template/assets/engine/0.6.11/theme.js
function Ns(e, t, n) {
	return t === "light" || t === "dark" ? t : n ? "dark" : "light";
}
function Ps(e, t) {
	let n = e.tokens || {}, r = e.scheme === "dark" ? "dark" : "light";
	if (!e.alt?.tokens || t === r) return n;
	let i = {};
	for (let t of /* @__PURE__ */ new Set([...Object.keys(n), ...Object.keys(e.alt.tokens)])) i[t] = {
		...n[t],
		...e.alt.tokens[t]
	};
	return i;
}
var Fs = /^[a-zA-Z0-9#%.,()'"\s+\-*/]+$/;
function Is(e) {
	return typeof e == "string" && Fs.test(e) && !/url\(|\/\*|\*\/|expression/i.test(e);
}
function Ls(e) {
	let t = e.tokens || {}, n = Ps(e, "light"), r = Ps(e, "dark"), i = e.scheme === "dark" ? "dark" : "light", a = [], o = [], s = [], c = /* @__PURE__ */ new Set([
		...Object.keys(t),
		...Object.keys(n),
		...Object.keys(r)
	]);
	for (let e of c) {
		let i = e === "color", c = /* @__PURE__ */ new Set([
			...Object.keys(t[e] || {}),
			...Object.keys(n[e] || {}),
			...Object.keys(r[e] || {})
		]);
		for (let l of c) {
			let c = t[e]?.[l], u = n[e]?.[l], d = r[e]?.[l];
			Is(c) && (a.push(`  --urd-${e}-${l}: ${c};`), i && a.push(`  --urd-base-${l}: ${c};`)), u !== d && (i && Is(u) && Is(d) ? o.push({
				name: l,
				lv: u,
				dv: d
			}) : !i && Is(u) && Is(d) && s.push({
				group: e,
				name: l,
				lv: u,
				dv: d
			}));
		}
	}
	let l = o.length > 0 || s.length > 0, u = `:root {\n  color-scheme: ${l ? "light dark" : i};\n${a.join("\n")}\n}\n`;
	if (!l) return u;
	let d = [];
	for (let e of o) {
		let t = `light-dark(${e.lv}, ${e.dv})`;
		d.push(`    --urd-color-${e.name}: ${t};`), d.push(`    --urd-base-${e.name}: ${t};`);
	}
	if (u += "@supports (color: light-dark(#000, #fff)) {\n", d.length && (u += `  :root {\n${d.join("\n")}\n  }\n`), u += "  :root[data-urd-theme=\"light\"] { color-scheme: light; }\n", u += "  :root[data-urd-theme=\"dark\"] { color-scheme: dark; }\n", s.length) {
		let e = (e) => s.map((t) => `    --urd-${t.group}-${t.name}: ${e(t)};`).join("\n");
		u += `  @media (prefers-color-scheme: dark) {\n    :root {\n${s.map((e) => `      --urd-${e.group}-${e.name}: ${e.dv};`).join("\n")}\n    }\n  }\n`, u += `  :root[data-urd-theme="light"] {\n${e((e) => e.lv)}\n  }\n`, u += `  :root[data-urd-theme="dark"] {\n${e((e) => e.dv)}\n  }\n`;
	}
	return u += "}\n", u;
}
function Rs(e) {
	return /^[a-z][a-z0-9-]*$/.test(e) ? `var(--urd-color-${e})` : e;
}
var zs = {
	surface: {
		"--urd-color-bg": "var(--urd-base-surface)",
		"--urd-color-surface": "color-mix(in srgb, var(--urd-base-text) 7%, var(--urd-base-surface))"
	},
	accent: {
		"--urd-color-bg": "var(--urd-base-accent)",
		"--urd-color-surface": "color-mix(in srgb, var(--urd-base-accent) 82%, #000)",
		"--urd-color-text": "var(--urd-base-accent-text)",
		"--urd-color-accent": "var(--urd-base-accent-text)",
		"--urd-color-accent-text": "var(--urd-base-accent)"
	},
	inverse: {
		"--urd-color-bg": "var(--urd-base-text)",
		"--urd-color-surface": "color-mix(in srgb, var(--urd-base-text) 78%, var(--urd-base-bg))",
		"--urd-color-text": "var(--urd-base-bg)"
	},
	soft: {
		"--urd-color-bg": "color-mix(in srgb, var(--urd-base-accent) 12%, var(--urd-base-bg))",
		"--urd-color-surface": "color-mix(in srgb, var(--urd-base-accent) 8%, var(--urd-base-surface))"
	},
	muted: {
		"--urd-color-bg": "color-mix(in srgb, var(--urd-base-text) 5%, var(--urd-base-bg))",
		"--urd-color-surface": "color-mix(in srgb, var(--urd-base-text) 10%, var(--urd-base-bg))",
		"--urd-color-text": "color-mix(in srgb, var(--urd-base-text) 82%, var(--urd-base-bg))"
	},
	deep: {
		"--urd-color-bg": "color-mix(in srgb, var(--urd-base-accent) 30%, var(--urd-base-text))",
		"--urd-color-surface": "color-mix(in srgb, var(--urd-base-accent) 40%, var(--urd-base-text))",
		"--urd-color-text": "var(--urd-base-bg)"
	},
	highlighted: { "--urd-color-surface": "color-mix(in srgb, var(--urd-base-accent) 14%, var(--urd-base-surface))" }
}, Bs = {
	surface: "sectionTheme.surface",
	accent: "sectionTheme.accent",
	inverse: "sectionTheme.inverse",
	soft: "sectionTheme.soft",
	muted: "sectionTheme.muted",
	deep: "sectionTheme.deep",
	highlighted: "sectionTheme.highlighted"
};
[...new Set(Object.values(zs).flatMap(Object.keys))];
function Vs(e) {
	return zs[e] ?? {};
}
function Hs(e) {
	let t = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(typeof e == "string" ? e.trim() : "");
	if (!t) return null;
	let n = t[1];
	n.length === 3 && (n = n.split("").map((e) => e + e).join(""));
	let r = (e) => {
		let t = parseInt(e, 16) / 255;
		return t <= .03928 ? t / 12.92 : ((t + .055) / 1.055) ** 2.4;
	};
	return .2126 * r(n.slice(0, 2)) + .7152 * r(n.slice(2, 4)) + .0722 * r(n.slice(4, 6));
}
function Us(e, t) {
	let n = Hs(e), r = Hs(t);
	return n == null || r == null ? null : (Math.max(n, r) + .05) / (Math.min(n, r) + .05);
}
//#endregion
//#region ../template/assets/engine/0.6.11/backgrounds/color.js
var Ws = {
	version: 1,
	label: "Colour",
	labelKey: "bgLayer.color",
	defaults: () => ({
		value: "bg",
		opacity: 1
	}),
	migrations: {},
	render(e, t) {
		e.style.background = Rs(t.value), e.style.opacity = String(t.opacity ?? 1);
	}
}, Gs = {
	linear: [
		"pan",
		"pan-loop",
		"rotate"
	],
	radial: ["pulse", "orbit"]
};
function Ks(e) {
	let t = Array.isArray(e) && e.length ? e : [{ color: "#0b0e14" }, { color: "#1a1030" }], n = t.map((e) => Math.max(0, Number(e?.share) || 0)), r = n.reduce((e, t) => e + t, 0), i = r <= 0, a = i ? t.length : r, o = 0;
	return t.map((e, t) => {
		let r = i ? 1 : n[t], s = (o + r / 2) / a * 100;
		return o += r, {
			color: e?.color ?? "#0b0e14",
			at: Math.round(s * 100) / 100
		};
	});
}
function qs(e) {
	let t = (e) => Math.round(e * 100) / 100, n = e[0]?.at ?? 0;
	return [...e.map((e) => ({
		color: e.color,
		at: t(e.at - n)
	})), {
		color: e[0]?.color ?? "#0b0e14",
		at: 100
	}];
}
function Js(e, t, n, r = .5) {
	let i = n % 360 * Math.PI / 180, a = (e) => Math.round(e * 100) / 100 || 0, o = (Math.abs(e * Math.sin(i)) + Math.abs(t * Math.cos(i))) / (1 - Math.min(Math.max(r, 0), .9));
	return {
		period: a(o),
		dx: a(Math.sin(i) * o),
		dy: a(-Math.cos(i) * o)
	};
}
function Ys(e, t, n) {
	return `repeating-linear-gradient(${t}deg, ${e.map((e) => `${Rs(e.color)} ${Math.round(e.at / 100 * n * 100) / 100}px`).join(", ")})`;
}
function Xs(e) {
	let t = e.kind === "radial" ? "radial" : "linear", n = (Gs[t] ?? []).includes(e.animation) ? e.animation : null, r = Ks(e.stops), i = r.map((e) => `${Rs(e.color)} ${e.at}%`).join(", "), a = {}, o;
	if (t === "radial") {
		let t = Math.round((e.x ?? .5) * 100), r = Math.round((e.y ?? .5) * 100);
		if (o = `radial-gradient(circle at ${t}% ${r}%, ${i})`, n === "orbit") return {
			background: null,
			className: null,
			styles: a,
			runner: {
				className: "urd-bg-orbit-runner",
				background: o,
				left: `${-t}%`,
				top: `${-r}%`
			}
		};
		n === "pulse" && (a["--urd-bg-op"] = String(e.opacity ?? 1));
	} else {
		let t = e.angle ?? 160;
		if (n === "pan-loop") {
			let n = (e.stops ?? []).map((e) => Math.max(0, Number(e?.share) || 0)), i = n.reduce((e, t) => e + t, 0), o = i > 0 ? Math.max(...n) / i : 1 / r.length;
			return {
				background: null,
				className: null,
				styles: a,
				loop: {
					angle: t,
					stops: qs(r),
					maxShare: o
				}
			};
		}
		if (o = n === "rotate" ? `linear-gradient(calc(var(--urd-grad-spin, 0deg) + ${t}deg), ${i})` : `linear-gradient(${t}deg, ${i})`, n === "pan") return {
			background: null,
			className: null,
			styles: a,
			runner: {
				className: "urd-bg-pan-runner",
				background: o
			}
		};
	}
	return {
		background: o,
		className: n ? {
			rotate: "urd-bg-rotate",
			pulse: "urd-bg-pulse"
		}[n] ?? null : null,
		styles: a
	};
}
var Zs = /* @__PURE__ */ new Set(), Qs = !1;
function $s(e) {
	Zs.add(e), !(Qs || typeof window > "u") && (Qs = !0, window.addEventListener("resize", () => {
		for (let e of [...Zs]) e() || Zs.delete(e);
	}));
}
var ec = !1;
function tc() {
	if (!ec) {
		ec = !0;
		try {
			CSS.registerProperty({
				name: "--urd-grad-spin",
				syntax: "<angle>",
				inherits: !1,
				initialValue: "0deg"
			});
		} catch {}
	}
}
var nc = {
	version: 1,
	label: "Gradient",
	labelKey: "bgLayer.gradient",
	defaults: () => ({
		kind: "linear",
		stops: [{
			color: "#0b0e14",
			share: 50
		}, {
			color: "#1a1030",
			share: 50
		}],
		angle: 160,
		x: .5,
		y: .5,
		animation: "none",
		opacity: 1
	}),
	migrations: {},
	render(e, t) {
		let n = Xs(t);
		e.style.opacity = String(t.opacity ?? 1);
		for (let [t, r] of Object.entries(n.styles)) e.style.setProperty(t, r);
		if (n.loop) {
			e.classList.add("urd-bg-loop-host");
			let t = document.createElement("div");
			t.className = "urd-bg-loop-runner", e.appendChild(t);
			let r = () => {
				if (!e.isConnected) return !1;
				let r = e.clientWidth, i = e.clientHeight;
				if (r && i) {
					let e = Js(r, i, n.loop.angle, n.loop.maxShare);
					t.style.inset = `${-Math.ceil(e.period)}px`, t.style.background = Ys(n.loop.stops, n.loop.angle, e.period), t.style.setProperty("--urd-loop-dx", `${e.dx}px`), t.style.setProperty("--urd-loop-dy", `${e.dy}px`);
				}
				return !0;
			};
			requestAnimationFrame(r), $s(r);
			return;
		}
		if (n.runner) {
			e.classList.add("urd-bg-loop-host");
			let t = document.createElement("div");
			t.className = n.runner.className, t.style.background = n.runner.background, n.runner.left != null && (t.style.left = n.runner.left), n.runner.top != null && (t.style.top = n.runner.top), e.appendChild(t);
			return;
		}
		e.style.background = n.background, n.className && (e.classList.add(n.className), n.className === "urd-bg-rotate" && tc());
	}
}, rc = {
	version: 1,
	label: "Glow",
	labelKey: "bgLayer.glow",
	defaults: () => ({
		x: .5,
		y: .3,
		color: "accent",
		radius: .5,
		opacity: .35
	}),
	migrations: {},
	render(e, t) {
		let n = Rs(t.color), r = t.x ?? .5, i = t.y ?? .3, a = t.radius ?? .5;
		e.style.background = `radial-gradient(circle at ${r * 100}% ${i * 100}%, ${n} 0%, transparent ${a * 100}%)`, e.style.opacity = String(t.opacity ?? .35);
	}
}, ic = "url(\"data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22128%22%20height%3D%22128%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%222%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22128%22%20height%3D%22128%22%20filter%3D%22url(%23n)%22%2F%3E%3C%2Fsvg%3E\")", ac = {
	version: 1,
	label: "Grain",
	labelKey: "bgLayer.grain",
	defaults: () => ({ opacity: .06 }),
	migrations: {},
	render(e, t) {
		e.style.backgroundImage = ic, e.style.backgroundRepeat = "repeat", e.style.opacity = String(t.opacity ?? .06);
	}
}, oc = /^(?:data:image\/[\w.+-]+;base64,[A-Za-z0-9+/=]+|\/(?!\/)[\w%./-]*)$/;
function sc(e) {
	return typeof e == "string" && oc.test(e);
}
//#endregion
//#region ../template/assets/engine/0.6.11/backgrounds/image.js
var cc = .4;
function lc(e, t) {
	return `${(e ?? .5) * 100}% ${(t ?? .5) * 100}%`;
}
function uc(e, t) {
	return e === "contain" ? "contain" : e === "cover" ? "cover" : `${Math.max(0, t ?? 1) * 100}%`;
}
function dc(e) {
	let t = "-9999px";
	return e === "up" ? `inset(${t} 0 0 0)` : e === "down" ? `inset(0 0 ${t} 0)` : e === "both" ? `inset(${t} 0 ${t} 0)` : "inset(0)";
}
function fc(e, t, n, r = .18) {
	let i = Math.max(0, Math.min(1, n)) * cc * t;
	return Math.round(Math.min(i, r * e));
}
function pc(e, t, n, r, i) {
	let a = e + t / 2, o = (n / 2 - a) * Math.max(0, Math.min(1, r)) * cc, s = i ?? fc(t, n, r);
	return Math.max(-s, Math.min(s, o)) || 0;
}
var mc = /* @__PURE__ */ new Set(), hc = !1, gc = 0;
function _c() {
	gc = 0;
	for (let e of [...mc]) e() || mc.delete(e);
}
function vc() {
	gc ||= requestAnimationFrame(_c);
}
function yc(e) {
	mc.add(e), e(), !(hc || typeof window > "u") && (hc = !0, window.addEventListener("scroll", vc, { passive: !0 }), window.addEventListener("resize", vc, { passive: !0 }));
}
function bc(e, t, n, r) {
	let i = r === "cover" || r === "tile" || r === "repeat", a = e.closest(".urd-section") ?? e.parentElement?.closest(".urd-section") ?? e.parentElement, o = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
	e.style.willChange = "transform";
	let s = (t) => {
		e.style.top = `-${t}px`, e.style.bottom = `-${t}px`;
	}, c = () => {
		if (!e.isConnected) return !1;
		if (o || document.body.classList.contains("urd-mobile")) return s(n), e.style.transform = "", !0;
		let r = (a ?? e).getBoundingClientRect(), c = window.innerHeight || document.documentElement.clientHeight, l = fc(r.height, c, t, i ? .18 : .6);
		s(i ? Math.max(n, l) : n);
		let u = pc(r.top, r.height, c, t, l);
		return e.style.transform = `translateY(${u.toFixed(1)}px)`, !0;
	};
	yc(c), typeof requestAnimationFrame == "function" && requestAnimationFrame(() => requestAnimationFrame(c));
}
function xc() {
	return typeof CSS < "u" && typeof CSS.supports == "function" && CSS.supports("animation-timeline", "view()");
}
var Sc = /* @__PURE__ */ new Set(), Cc = !1, wc = 0;
function Tc() {
	wc = 0;
	for (let e of [...Sc]) e() || Sc.delete(e);
}
function Ec() {
	!wc && typeof requestAnimationFrame == "function" && (wc = requestAnimationFrame(Tc));
}
function Dc(e) {
	Sc.add(e), e(), !(Cc || typeof window > "u") && (Cc = !0, window.addEventListener("resize", Ec, { passive: !0 }));
}
function Oc(e, t, n, r) {
	let i = r === "cover" || r === "tile" || r === "repeat", a = e.closest(".urd-section") ?? e.parentElement?.closest(".urd-section") ?? e.parentElement;
	e.style.willChange = "transform", e.classList.add("urd-parallax-css");
	let o = () => {
		if (!e.isConnected) return !1;
		let r = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches || document.body.classList.contains("urd-mobile"), o = (a ?? e).getBoundingClientRect(), s = window.innerHeight || document.documentElement.clientHeight, c = fc(o.height, s, t, i ? .18 : .6), l = i && !r ? Math.max(n, c) : n;
		return e.style.setProperty("--urd-px-shift", `${c}px`), e.style.top = `-${l}px`, e.style.bottom = `-${l}px`, !0;
	};
	Dc(o), typeof requestAnimationFrame == "function" && requestAnimationFrame(() => requestAnimationFrame(o));
}
var kc = {
	version: 2,
	label: "Image",
	labelKey: "bgLayer.image",
	defaults: () => ({
		src: "",
		fit: "plain",
		x: .5,
		y: .5,
		size: 1,
		opacity: 1,
		blur: 0,
		parallax: 0,
		bleed: "none"
	}),
	migrations: { 1: (e) => ({
		...e,
		fit: e.fit === "vanlig" ? "plain" : e.fit === "flislegg" ? "tile" : e.fit === "egen" ? "custom" : e.fit
	}) },
	render(e, t) {
		if (!sc(t.src)) return;
		e.style.opacity = String(t.opacity ?? 1), e.style.clipPath = dc(t.bleed), e.style.zIndex = t.bleed === "down" || t.bleed === "both" ? "1" : "";
		let n = document.createElement("div");
		n.className = "urd-bg-image", n.style.position = "absolute", n.style.left = "0", n.style.right = "0", n.style.top = "0", n.style.bottom = "0";
		let r = t.fit === "tile" || t.fit === "repeat";
		n.style.backgroundImage = `url("${t.src}")`, n.style.backgroundSize = uc(t.fit, t.size), n.style.backgroundRepeat = r ? "repeat" : "no-repeat", n.style.backgroundPosition = lc(t.x, t.y);
		let i = 0;
		t.blur > 0 && (n.style.filter = `blur(${t.blur}px)`, i = Math.ceil(t.blur), n.style.left = `-${i}px`, n.style.right = `-${i}px`, n.style.top = `-${i}px`, n.style.bottom = `-${i}px`);
		let a = new Image();
		if (a.src = t.src, !a.complete) {
			e.style.visibility = "hidden";
			let t = () => {
				e.style.visibility = "";
			};
			a.addEventListener("load", t, { once: !0 }), a.addEventListener("error", t, { once: !0 });
		}
		e.appendChild(n), t.parallax > 0 && Ac(n, t.parallax, i, t.fit ?? "cover");
	}
};
function Ac(e, t, n, r) {
	xc() ? Oc(e, t, n, r) : bc(e, t, n, r);
}
//#endregion
//#region ../template/assets/engine/0.6.11/gallery-model.js
function jc(e, t, n) {
	return !Number.isFinite(n) || n < 1 ? 0 : (((Number.isFinite(e) ? e : 0) + t) % n + n) % n;
}
function Mc({ count: e = 0, reducedMotion: t = !1 } = {}) {
	return e >= 2 && !t;
}
function Nc(e, { min: t = 2, fallback: n = 5 } = {}) {
	let r = Number(e);
	return !Number.isFinite(r) || r <= 0 ? n : Math.max(t, r);
}
//#endregion
//#region ../template/assets/engine/0.6.11/backgrounds/slideshow.js
var Pc = {
	version: 1,
	label: "Image gallery",
	labelKey: "bgLayer.slideshow",
	defaults: () => ({
		images: [],
		fit: "cover",
		interval: 6,
		fade: 1.5,
		opacity: 1,
		blur: 0
	}),
	migrations: {},
	render(e, t) {
		let n = (t.images ?? []).filter((e) => sc(e?.src));
		if (!n.length) return;
		e.classList.add("urd-bg-slideshow"), e.style.opacity = String(t.opacity ?? 1), t.blur > 0 && (e.style.filter = `blur(${t.blur}px)`, e.style.inset = `-${t.blur * 2}px`);
		let r = Math.max(0, Number(t.fade) || 0);
		e.style.setProperty("--urd-bgg-fade", `${r}s`);
		let i = (e, n) => {
			e.style.backgroundImage = `url("${n.src}")`, e.style.backgroundSize = uc(t.fit), e.style.backgroundRepeat = "no-repeat", e.style.backgroundPosition = lc(n.x, n.y);
		}, a = new Image();
		if (a.src = n[0].src, !a.complete) {
			e.style.visibility = "hidden";
			let t = () => {
				e.style.visibility = "";
			};
			a.addEventListener("load", t, { once: !0 }), a.addEventListener("error", t, { once: !0 });
		}
		let o = document.createElement("div");
		o.className = "urd-bg-slide on", i(o, n[0]), e.appendChild(o);
		let s = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (!Mc({
			count: n.length,
			reducedMotion: s
		})) return;
		let c = document.createElement("div");
		c.className = "urd-bg-slide", e.appendChild(c);
		let l = 0, u = o, d = Math.max(Nc(t.interval, { fallback: 6 }), r + .5) * 1e3, f = setInterval(() => {
			if (!e.isConnected) {
				clearInterval(f);
				return;
			}
			if (document.hidden) return;
			let t = jc(l, 1, n.length), r = new Image();
			r.src = n[t].src;
			let a = () => {
				if (!e.isConnected) return;
				let r = u === o ? c : o;
				i(r, n[t]), r.classList.add("on"), u.classList.remove("on"), u = r, l = t;
			};
			r.complete ? a() : (r.addEventListener("load", a, { once: !0 }), r.addEventListener("error", () => {
				l = t;
			}, { once: !0 }));
		}, d);
	}
}, Fc = /^(?:data:video\/[\w.+-]+;base64,[A-Za-z0-9+/=]+|\/media\/[\w%./-]+\.(?:mp4|webm))$/i;
function Ic(e) {
	return typeof e == "string" && Fc.test(e);
}
var Lc = null;
function Rc(e) {
	Lc ??= new IntersectionObserver((e) => {
		for (let t of e) {
			if (!t.target.isConnected) {
				Lc.unobserve(t.target);
				continue;
			}
			t.isIntersecting ? t.target.play().catch(() => {}) : t.target.pause();
		}
	}, { threshold: 0 }), Lc.observe(e);
}
var zc = (e, t, n, r) => {
	e.style.position = "absolute", e.style.inset = "0", e.style.width = "100%", e.style.height = "100%", e.style.objectFit = t === "contain" ? "contain" : "cover", e.style.objectPosition = lc(n, r);
}, Bc = {
	version: 1,
	label: "Video",
	labelKey: "bgLayer.video",
	defaults: () => ({
		src: "",
		poster: "",
		fit: "cover",
		x: .5,
		y: .5,
		opacity: 1,
		parallax: 0
	}),
	migrations: {},
	render(e, t) {
		if (!Ic(t.src)) return;
		if (e.style.opacity = String(t.opacity ?? 1), window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
			if (!sc(t.poster)) return;
			let n = document.createElement("img");
			n.className = "urd-bg-video-poster", n.alt = "", n.setAttribute("aria-hidden", "true"), n.src = t.poster, zc(n, t.fit, t.x, t.y), e.appendChild(n);
			return;
		}
		let n = document.createElement("video");
		n.className = "urd-bg-video", n.muted = !0, n.setAttribute("muted", ""), n.loop = !0, n.playsInline = !0, n.setAttribute("playsinline", ""), n.preload = "metadata", n.disablePictureInPicture = !0, n.setAttribute("aria-hidden", "true"), sc(t.poster) && (n.poster = t.poster), n.src = t.src, zc(n, t.fit, t.x, t.y), e.appendChild(n), Rc(n), t.parallax > 0 && Ac(n, t.parallax, 0, t.fit === "contain" ? "contain" : "cover");
	}
};
//#endregion
//#region ../template/assets/engine/0.6.11/footer-thumb.js
function Vc(e = {}) {
	let t = "#2fd6b6", n = "#5c6b64", r = e.mega ? "#16221d" : "#0e1512", i = e.cols ?? 0, a = e.social ?? 0, o = `<svg viewBox="0 0 160 80" preserveAspectRatio="none" aria-hidden="true"><rect width="160" height="80" fill="${r}"/>`;
	if (e.mega && (o += `<circle cx="20" cy="6" r="34" fill="${t}" opacity="0.18"/>`), e.bigcta) return o += `<rect x="45" y="18" width="70" height="8" rx="3" fill="${n}" opacity="0.85"/>`, o += `<rect x="56" y="32" width="48" height="4" rx="2" fill="${n}" opacity="0.5"/>`, o += `<rect x="62" y="43" width="36" height="10" rx="3" fill="${t}"/>`, o += Hc(n, e.baselineLinks), o + "</svg>";
	let s = e.center ? 80 : 16;
	if (o += `<rect x="${s - (e.center ? 9 : 0)}" y="14" width="18" height="6" rx="2" fill="${t}"/>`, e.tag && (o += `<rect x="${e.center ? s - 22 : 16}" y="24" width="44" height="3" rx="1.5" fill="${n}" opacity="0.6"/>`), e.cta && (o += `<rect x="16" y="31" width="40" height="8" rx="2" fill="none" stroke="${n}" stroke-width="1" opacity="0.7"/>`, o += `<rect x="58" y="31" width="16" height="8" rx="2" fill="${t}"/>`), e.row) o += `<g fill="${n}" opacity="0.7">` + [
		0,
		1,
		2,
		3
	].map((e) => `<rect x="${44 + e * 20}" y="40" width="14" height="4" rx="2"/>`).join("") + "</g>";
	else if (i) {
		let e = 160 - i * 30 - 6;
		for (let r = 0; r < i; r++) {
			let i = e + r * 30;
			o += `<rect x="${i}" y="16" width="16" height="3" rx="1.5" fill="${t}" opacity="0.8"/>`;
			for (let e = 0; e < 3; e++) o += `<rect x="${i}" y="${24 + e * 7}" width="22" height="3" rx="1.5" fill="${n}" opacity="0.6"/>`;
		}
	}
	let c = e.center ? 80 - a * 9 / 2 : 16;
	for (let e = 0; e < a; e++) o += `<rect x="${c + e * 9}" y="52" width="6.5" height="6.5" rx="2" fill="none" stroke="${n}" stroke-width="1"/>`;
	return o += Hc(n, e.baselineLinks), o + "</svg>";
}
function Hc(e, t = 0) {
	let n = `<line x1="8" y1="66" x2="152" y2="66" stroke="${e}" stroke-width="0.6" opacity="0.5"/>`;
	return n += `<rect x="8" y="70" width="40" height="3" rx="1.5" fill="${e}" opacity="0.6"/>`, t && (n += `<g fill="${e}" opacity="0.6">` + Array.from({ length: t }, (e, t) => `<rect x="${120 - t * 16}" y="70" width="12" height="3" rx="1.5"/>`).join("") + "</g>"), n;
}
//#endregion
//#region ../template/assets/engine/0.6.11/animations/core.js
var Uc = () => ({
	duration: 600,
	delay: 0
}), Wc = 90, Gc = {
	"fade-in": {
		version: 1,
		label: "Fade in",
		labelKey: "anim.fadeIn",
		entrance: !0,
		defaults: Uc,
		migrations: {}
	},
	"slide-up": {
		version: 1,
		label: "Slide up",
		labelKey: "anim.slideUp",
		entrance: !0,
		defaults: Uc,
		migrations: {}
	},
	"zoom-in": {
		version: 1,
		label: "Zoom in",
		labelKey: "anim.zoomIn",
		entrance: !0,
		defaults: Uc,
		migrations: {}
	},
	"hover-lift": {
		version: 1,
		label: "Lift on pointer",
		labelKey: "anim.hoverLift",
		entrance: !1,
		defaults: () => ({}),
		migrations: {}
	},
	stagger: {
		version: 1,
		label: "Stagger (card group)",
		labelKey: "anim.stagger",
		entrance: !0,
		group: !0,
		defaults: () => ({
			duration: 600,
			delay: 0,
			step: Wc,
			effect: "slide-up",
			pattern: "sequence"
		}),
		migrations: {}
	}
}, Kc = [
	["font.system", "system-ui, sans-serif"],
	["font.arial", "Arial, Helvetica, sans-serif"],
	["font.verdana", "Verdana, Geneva, sans-serif"],
	["font.trebuchet", "'Trebuchet MS', sans-serif"],
	["font.georgia", "Georgia, 'Times New Roman', serif"],
	["font.palatino", "'Palatino Linotype', Palatino, serif"],
	["font.courier", "'Courier New', monospace"]
];
//#endregion
//#region ../template/assets/engine/0.6.11/place.js
function qc(e) {
	let t = (e) => Math.round(e * 100) / 100, n = Math.max(0, t(100 - e.w)), r = Math.min(n, Math.max(0, t(e.x - e.w / 2))), i = Math.max(0, e.y - e.h / 2), a = e.snap === !1 || e.grid?.snap === !1, o = e.grid?.size || 8;
	return i = a ? Math.round(i) : Math.round(i / o) * o, {
		x: r,
		y: Math.max(0, i)
	};
}
//#endregion
//#region src/App.svelte
var Jc = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), Yc = /* @__PURE__ */ V("<button class=\"ghost row-tool svelte-1n46o8q\"></button>"), Xc = /* @__PURE__ */ V("<span><span class=\"grad-grip svelte-1n46o8q\"><svg viewBox=\"0 0 16 16\" width=\"14\" height=\"14\" fill=\"currentColor\" aria-hidden=\"true\"><circle cx=\"5\" cy=\"3\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"3\" r=\"1.4\"></circle><circle cx=\"5\" cy=\"8\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"8\" r=\"1.4\"></circle><circle cx=\"5\" cy=\"13\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"13\" r=\"1.4\"></circle></svg></span> <!> <input type=\"range\" class=\"tb-grow svelte-1n46o8q\" min=\"0\" max=\"100\" step=\"1\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span> <!></span>"), Zc = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), Qc = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"360\" step=\"5\" class=\"svelte-1n46o8q\"/>", 1), $c = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <!> <button class=\"ghost action svelte-1n46o8q\"> </button> <!> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label>", 1), el = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), tl = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.01\" max=\"0.3\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), nl = /* @__PURE__ */ V("<div class=\"sizefill svelte-1n46o8q\"><button type=\"button\" class=\"ghost svelte-1n46o8q\"> </button> <button type=\"button\" class=\"ghost svelte-1n46o8q\"> </button></div> <label class=\"svelte-1n46o8q\"> </label> <div class=\"focalpad svelte-1n46o8q\"><span class=\"focaldot svelte-1n46o8q\"></span></div> <label class=\"sub svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"-0.5\" max=\"1.5\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"sub svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"-0.5\" max=\"1.5\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), rl = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label>", 1), il = /* @__PURE__ */ V("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> </label> <div class=\"sizestep svelte-1n46o8q\"><button type=\"button\" class=\"svelte-1n46o8q\">−</button> <input type=\"number\" min=\"10\" max=\"400\" class=\"svelte-1n46o8q\"/> <span class=\"sizeunit svelte-1n46o8q\">%</span> <button type=\"button\" class=\"svelte-1n46o8q\">+</button></div> <!> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"20\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), al = /* @__PURE__ */ V("<span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), ol = /* @__PURE__ */ V("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"2\" max=\"120\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"5\" step=\"0.1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"20\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <p class=\"panel-hint svelte-1n46o8q\"> </p>", 1), sl = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), cl = /* @__PURE__ */ V("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"video/mp4,video/webm\" class=\"svelte-1n46o8q\"/></label> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"sub svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"sub svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), ll = /* @__PURE__ */ V("<div class=\"bg-layer svelte-1n46o8q\"><span class=\"nav-line svelte-1n46o8q\"><!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <!></div>"), ul = /* @__PURE__ */ V("<!> <label class=\"svelte-1n46o8q\"> <!></label> <button class=\"ghost action svelte-1n46o8q\"> </button>", 1), dl = /* @__PURE__ */ V("<input class=\"nav-target svelte-1n46o8q\"/>"), fl = /* @__PURE__ */ V("<div class=\"nav-row nav-sub-row svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <span class=\"nav-target svelte-1n46o8q\"><!></span> <!></div>"), pl = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label>"), ml = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"num-stepper svelte-1n46o8q\"><button type=\"button\" class=\"svelte-1n46o8q\">−</button> <input type=\"number\" min=\"1\" max=\"12\" step=\"1\" class=\"svelte-1n46o8q\"/> <button type=\"button\" class=\"svelte-1n46o8q\">+</button></span></label>", 1), hl = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), gl = /* @__PURE__ */ V("<p class=\"panel-hint svelte-1n46o8q\"> </p>"), _l = /* @__PURE__ */ V("<span class=\"nav-line svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span>"), vl = /* @__PURE__ */ V("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <button class=\"ghost action svelte-1n46o8q\"> </button>", 1), yl = /* @__PURE__ */ V("<span class=\"nav-line svelte-1n46o8q\"><input class=\"tl-year svelte-1n46o8q\"/> <input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <input class=\"svelte-1n46o8q\"/>", 1), bl = /* @__PURE__ */ V("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <button class=\"ghost action svelte-1n46o8q\"> </button>", 1), xl = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), Sl = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), Cl = /* @__PURE__ */ V("<span class=\"toolbar-row svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button></span> <span class=\"toolbar-row svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button></span> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), wl = /* @__PURE__ */ V("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>"), Tl = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"datetime-local\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), El = /* @__PURE__ */ V("<button class=\"ghost svelte-1n46o8q\"> </button>"), Dl = /* @__PURE__ */ V("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"audio/*\" class=\"svelte-1n46o8q\"/></label> <!> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), Ol = /* @__PURE__ */ V("<input class=\"svelte-1n46o8q\"/>"), kl = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <!>", 1), Al = /* @__PURE__ */ V("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <!>", 1), jl = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> </label> <input class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), Ml = /* @__PURE__ */ V("<input class=\"token-input svelte-1n46o8q\" maxlength=\"4\"/>"), Nl = /* @__PURE__ */ V("<span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\"/> <button class=\"ghost svelte-1n46o8q\"> </button></span>"), Pl = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <span class=\"toolbar-row svelte-1n46o8q\"><!> <!></span></label> <!>", 1), Fl = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), Il = /* @__PURE__ */ V("<span class=\"toolbar-row svelte-1n46o8q\"><button class=\"ghost action svelte-1n46o8q\"> </button> <button class=\"ghost action svelte-1n46o8q\"> </button></span>"), Ll = /* @__PURE__ */ V("<button class=\"ghost action svelte-1n46o8q\"> </button>"), Rl = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), zl = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), Bl = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"email\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"url\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), Vl = /* @__PURE__ */ V("<div class=\"bg-layer svelte-1n46o8q\"><span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label></div>"), Hl = /* @__PURE__ */ V("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label> <!>", 1), Ul = /* @__PURE__ */ V("<p> </p>"), Wl = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"text\" class=\"svelte-1n46o8q\"/></label> <button class=\"ghost svelte-1n46o8q\"> </button> <!>", 1), Gl = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"number\" class=\"svelte-1n46o8q\"/></label>"), Kl = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"text\" class=\"svelte-1n46o8q\"/></label>"), ql = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Jl = /* @__PURE__ */ V("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Yl = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Xl = /* @__PURE__ */ V("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!>", 1), Zl = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Ql = /* @__PURE__ */ V("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), $l = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), eu = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"24\" max=\"64\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), tu = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), nu = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"1\" max=\"3\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.2\" max=\"2\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.2\" max=\"2\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"2\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\"> </button> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), ru = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"8\" max=\"400\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), iu = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"6\" class=\"svelte-1n46o8q\"/></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), au = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" max=\"6\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"32\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), ou = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"2\" max=\"60\" class=\"svelte-1n46o8q\"/></label>"), su = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <!> <!> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), cu = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" max=\"40\" class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), lu = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"100\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label>", 1), uu = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"400\" class=\"svelte-1n46o8q\"/></label>"), du = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <!> <!>", 1), fu = /* @__PURE__ */ V("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), pu = /* @__PURE__ */ V("<div class=\"frame-grid svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"0.5\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"0.5\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label></div>"), mu = /* @__PURE__ */ V("<!> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label></div></details>", 1), hu = /* @__PURE__ */ V("<div class=\"props-tabs svelte-1n46o8q\"><span class=\"seg svelte-1n46o8q\"><button type=\"button\"> </button> <button type=\"button\"> </button></span></div> <!>", 1), gu = /* @__PURE__ */ V("<button class=\"chrome-restore svelte-1n46o8q\"><!> </button>"), _u = /* @__PURE__ */ V("<button><!> </button>"), vu = /* @__PURE__ */ V("<div class=\"tool-pop svelte-1n46o8q\"></div>"), yu = /* @__PURE__ */ V("<span class=\"toolmenu svelte-1n46o8q\"><button><!><!></button> <!></span>"), bu = /* @__PURE__ */ V("<button></button>"), xu = /* @__PURE__ */ V("<span class=\"tool-cap svelte-1n46o8q\"> </span> <span class=\"viewswitch toolgrp svelte-1n46o8q\"></span>", 1), Su = /* @__PURE__ */ V("<div class=\"tool-pop svelte-1n46o8q\"><div class=\"tool-pop-row svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"></button> <span class=\"zoom-readout svelte-1n46o8q\"> </span> <button class=\"ghost svelte-1n46o8q\"></button></div> <button><!> </button></div>"), Cu = /* @__PURE__ */ V("<span class=\"toolmenu svelte-1n46o8q\"><button><span class=\"zoom-cap svelte-1n46o8q\"> </span><!></button> <!></span>"), wu = /* @__PURE__ */ V("<span class=\"tool-cap svelte-1n46o8q\"> </span> <span class=\"zoomswitch toolgrp svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"></button> <span class=\"zoom-readout svelte-1n46o8q\"> </span> <button class=\"ghost svelte-1n46o8q\"></button> <button></button></span>", 1), Tu = /* @__PURE__ */ V("<div class=\"tool-pop svelte-1n46o8q\"><button><!> </button> <button><!> </button></div>"), Eu = /* @__PURE__ */ V("<span class=\"tool-cap svelte-1n46o8q\"> </span> <span class=\"toolgrp svelte-1n46o8q\"><button></button> <button></button></span>", 1), Du = /* @__PURE__ */ V("<button class=\"ghost page-btn svelte-1n46o8q\"> </button> <span class=\"toolset svelte-1n46o8q\"><!> <!> <!></span>", 1), Ou = /* @__PURE__ */ V("<button class=\"badge attention svelte-1n46o8q\"><!> <span class=\"btn-label svelte-1n46o8q\"> </span> <span class=\"badge-mini svelte-1n46o8q\"> </span></button>"), ku = /* @__PURE__ */ V("<button class=\"discard-confirm svelte-1n46o8q\"><!> </button>"), Au = /* @__PURE__ */ V("<span class=\"draft-cluster svelte-1n46o8q\"><span class=\"chip draft-chip svelte-1n46o8q\"><span class=\"chip-full svelte-1n46o8q\" aria-hidden=\"true\"> </span> <span class=\"chip-mini svelte-1n46o8q\" aria-hidden=\"true\">!</span></span>  <span class=\"discard-wrap svelte-1n46o8q\"><button><!><span class=\"discard-label svelte-1n46o8q\"> </span></button> <!></span></span>"), ju = /* @__PURE__ */ V("<!> <span class=\"btn-label svelte-1n46o8q\"> </span>", 1), Mu = /* @__PURE__ */ V("<span class=\"who svelte-1n46o8q\"><!> </span>"), Nu = /* @__PURE__ */ V("<a class=\"ghost svelte-1n46o8q\" href=\"/api/github/login\"> </a>"), Pu = /* @__PURE__ */ V("<button class=\"ghost svelte-1n46o8q\"><!></button> <!> <a class=\"ghost svelte-1n46o8q\" target=\"_blank\" rel=\"noopener\"><!> <span class=\"btn-label svelte-1n46o8q\"> </span></a> <button class=\"primary svelte-1n46o8q\"> </button>", 1), Fu = /* @__PURE__ */ V("<button> </button>"), Iu = /* @__PURE__ */ V("<span class=\"rail-group svelte-1n46o8q\"> </span> <!>", 1), Lu = /* @__PURE__ */ V("<div class=\"settings-pop svelte-1n46o8q\"><p class=\"panel-strong svelte-1n46o8q\"> </p> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label></div>"), Ru = /* @__PURE__ */ V("<span class=\"page-path svelte-1n46o8q\">/</span>"), zu = /* @__PURE__ */ V("<input class=\"page-slug svelte-1n46o8q\"/>"), Bu = /* @__PURE__ */ V("<span class=\"seo-warn svelte-1n46o8q\"></span>"), Vu = /* @__PURE__ */ V("<button class=\"ghost danger svelte-1n46o8q\"><!> </button>"), Hu = /* @__PURE__ */ V("<div class=\"page-menu svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"><!> </button> <!></div>"), Uu = /* @__PURE__ */ V("<div><input class=\"page-title svelte-1n46o8q\"/> <!> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <span class=\"page-menu-wrap svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <!></span></span></div>"), Wu = /* @__PURE__ */ V("<img class=\"site-icon-preview svelte-1n46o8q\"/>"), Gu = /* @__PURE__ */ V("<div><button class=\"page-template-pick svelte-1n46o8q\"><span class=\"page-template-thumb svelte-1n46o8q\"></span> <span class=\"page-template-name svelte-1n46o8q\"> </span></button></div>"), Ku = /* @__PURE__ */ V("<div><button class=\"page-template-pick svelte-1n46o8q\"><span class=\"page-template-thumb svelte-1n46o8q\"></span> <span class=\"page-template-name svelte-1n46o8q\"> </span></button> <button class=\"page-template-del svelte-1n46o8q\"></button></div>"), qu = /* @__PURE__ */ V("<span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"page-template-grid svelte-1n46o8q\"></div>", 1), Ju = /* @__PURE__ */ V("<div class=\"panel-body svelte-1n46o8q\"><!> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <textarea rows=\"2\" class=\"svelte-1n46o8q\"></textarea></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <textarea rows=\"2\" class=\"svelte-1n46o8q\"></textarea></label> <label class=\"svelte-1n46o8q\"> <!></label> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <input class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\"> </button> <span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"page-template-grid svelte-1n46o8q\"><div><button class=\"page-template-pick svelte-1n46o8q\"><span class=\"page-template-thumb svelte-1n46o8q\"></span> <span class=\"page-template-name svelte-1n46o8q\"> </span></button></div> <!></div> <!></div>"), Yu = /* @__PURE__ */ V("<input class=\"svelte-1n46o8q\"/> <span class=\"toolbar-row svelte-1n46o8q\"><!> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"8\" max=\"96\" placeholder=\"px\"/> <button><b> </b></button> <button><i> </i></button></span>", 1), Xu = /* @__PURE__ */ V("<span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"12\" max=\"128\"/> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"0\" max=\"64\"/></span>"), Zu = /* @__PURE__ */ V("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), Qu = /* @__PURE__ */ V("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), $u = /* @__PURE__ */ V("<div class=\"nav-row svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <span class=\"nav-target svelte-1n46o8q\"><!></span> <!></div> <!>", 1), ed = /* @__PURE__ */ V("<div class=\"panel-body svelte-1n46o8q\"><details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <!></label> <!> <!> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <!></label> <!> <!> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <!> <!> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" max=\"4\" class=\"svelte-1n46o8q\"/></label></div></details> <details class=\"group svelte-1n46o8q\" open=\"\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\"> </button></div></details></div>"), td = /* @__PURE__ */ V("<div class=\"cw-row svelte-1n46o8q\"><span class=\"mini-label cw-screen svelte-1n46o8q\"> </span> <span><span class=\"cw-fill svelte-1n46o8q\"></span></span> <span class=\"gridmenu-value cw-margin svelte-1n46o8q\"> </span></div>"), nd = /* @__PURE__ */ V("<div class=\"mini-label cw-binds svelte-1n46o8q\"> </div>"), rd = /* @__PURE__ */ V("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"range\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div>"), id = /* @__PURE__ */ V("<button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button>", 1), ad = /* @__PURE__ */ V("<div class=\"panel-body svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <div class=\"sample cw-sample svelte-1n46o8q\"><!> <div class=\"cw-legend svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <span class=\"mini-label svelte-1n46o8q\"> </span></div> <!></div> <div class=\"seg cw-seg svelte-1n46o8q\"></div> <!> <p class=\"mini-label svelte-1n46o8q\"> </p> <div class=\"seg cw-seg svelte-1n46o8q\"></div> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"range\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span></div>"), od = /* @__PURE__ */ V("<div class=\"mini-label tpv-cap svelte-1n46o8q\"> </div>"), sd = /* @__PURE__ */ V("<div class=\"theme-pvw svelte-1n46o8q\"><!> <div class=\"tpv-demo svelte-1n46o8q\"><div class=\"tpv-h svelte-1n46o8q\"> </div> <div class=\"tpv-card svelte-1n46o8q\"> </div> <div class=\"tpv-row svelte-1n46o8q\"><span class=\"tpv-btn svelte-1n46o8q\"> </span><span class=\"tpv-lnk svelte-1n46o8q\"> </span></div></div></div>"), cd = /* @__PURE__ */ V("<button type=\"button\"><span class=\"tp-band svelte-1n46o8q\"><i class=\"svelte-1n46o8q\"></i><i class=\"svelte-1n46o8q\"></i><i class=\"svelte-1n46o8q\"></i><i class=\"svelte-1n46o8q\"></i></span> <small class=\"svelte-1n46o8q\"> </small></button>"), ld = /* @__PURE__ */ V("<div class=\"ctl-row autorow svelte-1n46o8q\"><span class=\"autolbl svelte-1n46o8q\"> </span> <span class=\"seg svelte-1n46o8q\"><button type=\"button\"> </button> <button type=\"button\"> </button></span></div>"), ud = /* @__PURE__ */ V("<span class=\"mini-label svelte-1n46o8q\"> </span>"), dd = /* @__PURE__ */ V("<div class=\"palcol svelte-1n46o8q\"><!> <span class=\"palcap svelte-1n46o8q\"> </span> <b class=\"palhex svelte-1n46o8q\"> </b></div>"), fd = /* @__PURE__ */ V("<div class=\"ctl-row palhead svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <button type=\"button\"> </button></div> <div></div>", 1), pd = /* @__PURE__ */ V("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-strong svelte-1n46o8q\"> </p> <div class=\"theme-presets svelte-1n46o8q\"></div> <p class=\"panel-strong svelte-1n46o8q\"> </p> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <div class=\"ctl-row palhead svelte-1n46o8q\"><!> <button type=\"button\"> </button></div> <div class=\"palcells svelte-1n46o8q\"></div> <!> <div class=\"theme-previews svelte-1n46o8q\"><!> <!></div> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <div class=\"sample typo-sample svelte-1n46o8q\"><div class=\"ts-h svelte-1n46o8q\"> </div> <div class=\"ts-b svelte-1n46o8q\"> </div></div></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"sample form-prev svelte-1n46o8q\"><span class=\"fp-btn svelte-1n46o8q\"> </span> <span class=\"fp-card svelte-1n46o8q\"> </span></div> <label class=\"ctl-row svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"24\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"ctl-row svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"40\" step=\"1\" class=\"svelte-1n46o8q\"/></div></details></div>"), md = /* @__PURE__ */ V("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label>"), hd = /* @__PURE__ */ V("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label>"), gd = /* @__PURE__ */ V("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"></div></details>"), _d = /* @__PURE__ */ V("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button></div></details> <button class=\"ghost svelte-1n46o8q\"> </button> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button></div></details> <!> <!>", 1), vd = /* @__PURE__ */ V("<div><input type=\"text\" class=\"svelte-1n46o8q\"/> <!></div>"), yd = /* @__PURE__ */ V("<div class=\"panel-body svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label></div>"), bd = /* @__PURE__ */ V("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!>", 1), xd = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), Sd = /* @__PURE__ */ V("<button><span class=\"rs-sample svelte-1n46o8q\"><i class=\"rs-line svelte-1n46o8q\"></i> <i class=\"rs-chip svelte-1n46o8q\"></i> <i class=\"rs-dot svelte-1n46o8q\"></i></span> <span class=\"rs-name svelte-1n46o8q\"> </span></button>"), Cd = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"1000\" step=\"10\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label>", 1), wd = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"100\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <!>", 1), Td = /* @__PURE__ */ V("<p class=\"panel-strong svelte-1n46o8q\"> </p> <label class=\"svelte-1n46o8q\"> <input class=\"token-input svelte-1n46o8q\"/></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <div class=\"rs-grid svelte-1n46o8q\"></div> <label class=\"svelte-1n46o8q\"> <span class=\"row-tools svelte-1n46o8q\"><span class=\"gridmenu-value svelte-1n46o8q\"> </span> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label>", 1), Ed = /* @__PURE__ */ V("<div class=\"panel-body svelte-1n46o8q\"><!></div>"), Dd = /* @__PURE__ */ V("<button class=\"footer-tp svelte-1n46o8q\"><span class=\"footer-tp-thumb svelte-1n46o8q\"></span> <span class=\"footer-tp-name svelte-1n46o8q\"> </span></button>"), Od = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"16\" max=\"160\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), kd = /* @__PURE__ */ V("<span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span> <!>", 1), Ad = /* @__PURE__ */ V("<div class=\"nav-row svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></div> <!>", 1), jd = /* @__PURE__ */ V("<div class=\"nav-row svelte-1n46o8q\"><span class=\"nav-line svelte-1n46o8q\"><span class=\"footer-soc-preview svelte-1n46o8q\" aria-hidden=\"true\"></span> <!></span> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <input class=\"nav-target svelte-1n46o8q\"/></div>"), Md = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <!>", 1), Nd = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <!>", 1), Pd = /* @__PURE__ */ V("<div class=\"panel-body svelte-1n46o8q\"><label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"footer-tpick svelte-1n46o8q\"></div></div></details> <details class=\"group svelte-1n46o8q\" open=\"\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\"> </button> <label class=\"svelte-1n46o8q\"> <!></label></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\"> </button></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\"> </button></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <button class=\"ghost action svelte-1n46o8q\"> </button></div></details></div>"), Fd = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"date\" class=\"svelte-1n46o8q\"/></label>"), Id = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>"), Ld = /* @__PURE__ */ V("<img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <button class=\"ghost row-tool svelte-1n46o8q\"></button>", 1), Rd = /* @__PURE__ */ V("<img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/>"), zd = /* @__PURE__ */ V("<span class=\"toolbar-row svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span>"), Bd = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" step=\"0.01\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" step=\"0.01\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <!> <button class=\"ghost action svelte-1n46o8q\"> </button>", 1), Vd = /* @__PURE__ */ V("<details class=\"group collection-entry svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><span class=\"toolbar-row svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <!> <textarea rows=\"3\" class=\"svelte-1n46o8q\"></textarea> <!> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span> <!></div></details>"), Hd = /* @__PURE__ */ V("<span class=\"toolbar-row svelte-1n46o8q\"><button class=\"ghost action svelte-1n46o8q\"> </button> <button class=\"ghost action svelte-1n46o8q\"> </button> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\".csv,text/csv\" class=\"svelte-1n46o8q\"/></label> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <!> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Ud = /* @__PURE__ */ V("<div class=\"panel-body svelte-1n46o8q\"><!> <!> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <button class=\"ghost action svelte-1n46o8q\"> </button></div>"), Wd = /* @__PURE__ */ V("<span class=\"plugin-meta svelte-1n46o8q\"> </span>"), Gd = /* @__PURE__ */ V("<p class=\"panel-hint plugin-warn svelte-1n46o8q\"> </p>"), Kd = /* @__PURE__ */ V("<div><span class=\"plugin-head svelte-1n46o8q\"><span class=\"plugin-name svelte-1n46o8q\"> </span> <!> <span class=\"row-tools svelte-1n46o8q\"><label class=\"gridmenu-snap plugin-toggle svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <!> <!></div>"), qd = /* @__PURE__ */ V("<div class=\"plugin-row svelte-1n46o8q\"><span class=\"plugin-head svelte-1n46o8q\"><span class=\"plugin-name svelte-1n46o8q\"> </span> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span></div>"), Jd = /* @__PURE__ */ V("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!>", 1), Yd = /* @__PURE__ */ V("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <input class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\"> </button> <!>", 1), Xd = /* @__PURE__ */ V("<div class=\"panel-body svelte-1n46o8q\"><!> <!> <!> <!></div>"), Zd = /* @__PURE__ */ V("<div><span class=\"history-msg svelte-1n46o8q\"> </span> <span class=\"history-meta svelte-1n46o8q\"> </span></div>"), Qd = /* @__PURE__ */ V("<button class=\"ghost svelte-1n46o8q\"> </button> <!>", 1), $d = /* @__PURE__ */ V("<!> <!>", 1), ef = /* @__PURE__ */ V("<p class=\"panel-hint svelte-1n46o8q\"> </p> <button class=\"ghost svelte-1n46o8q\"> </button>", 1), tf = /* @__PURE__ */ V("<span class=\"update-arrow svelte-1n46o8q\"></span> <span class=\"badge svelte-1n46o8q\"> </span>", 1), nf = /* @__PURE__ */ V("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><p class=\"update-notes svelte-1n46o8q\"> </p></div></details>"), rf = /* @__PURE__ */ V("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"><span class=\"update-warn svelte-1n46o8q\"></span> </summary> <div class=\"group-items svelte-1n46o8q\"><pre class=\"update-headers svelte-1n46o8q\"> </pre></div></details>"), af = /* @__PURE__ */ V("<span class=\"chip svelte-1n46o8q\"> </span>"), of = /* @__PURE__ */ V("<div class=\"update-row svelte-1n46o8q\"><span class=\"update-path svelte-1n46o8q\"> </span> <span class=\"update-flags svelte-1n46o8q\"><!> <span class=\"update-warn svelte-1n46o8q\"></span></span></div>"), sf = /* @__PURE__ */ V("<div class=\"update-row svelte-1n46o8q\"><span class=\"update-path svelte-1n46o8q\"> </span> <!></div>"), cf = /* @__PURE__ */ V("<span class=\"update-warn svelte-1n46o8q\"></span>"), lf = /* @__PURE__ */ V("<div class=\"update-row svelte-1n46o8q\"><span> </span> <span class=\"update-flags svelte-1n46o8q\"><!> <!> <input type=\"checkbox\" class=\"svelte-1n46o8q\"/></span></div>"), uf = /* @__PURE__ */ V("<div class=\"ctl-row update-opt-head svelte-1n46o8q\"><p class=\"panel-strong svelte-1n46o8q\"> </p> <span class=\"mini-label svelte-1n46o8q\"> </span></div> <!>", 1), df = /* @__PURE__ */ V("<p class=\"update-summary svelte-1n46o8q\"> </p> <!> <!> <!> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"></div></details> <!> <button class=\"primary update-run svelte-1n46o8q\"> </button>", 1), ff = /* @__PURE__ */ V("<div class=\"update-versions svelte-1n46o8q\"><span class=\"update-from svelte-1n46o8q\"> </span> <!></div> <!>", 1), pf = /* @__PURE__ */ V("<aside class=\"panel svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <!></aside>"), mf = /* @__PURE__ */ V("<nav class=\"rail svelte-1n46o8q\"><!> <span class=\"rail-settings svelte-1n46o8q\"><span class=\"rail-brand svelte-1n46o8q\" title=\"Urd\"><svg class=\"brand-mark svelte-1n46o8q\" viewBox=\"10.3 8.3 19.4 25.4\" aria-hidden=\"true\"><path d=\"M12 32V10l16 6.5V32\" fill=\"none\" stroke=\"var(--urd-brand)\" stroke-width=\"3.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path></svg> <span class=\"brand-word svelte-1n46o8q\">Urd</span></span> <button></button> <!></span></nav> <!>", 1), hf = /* @__PURE__ */ V("<div class=\"workspace svelte-1n46o8q\"><!> <div><div class=\"stage svelte-1n46o8q\"><iframe class=\"svelte-1n46o8q\"></iframe></div></div></div>"), gf = /* @__PURE__ */ V("<p class=\"loading svelte-1n46o8q\"> </p>"), _f = /* @__PURE__ */ V("<p class=\"panel-hint confirm-line svelte-1n46o8q\"> </p>"), vf = /* @__PURE__ */ V("<div class=\"setup-overlay svelte-1n46o8q\"><div class=\"setup-card svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <!> <!> <span class=\"setup-actions svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"primary svelte-1n46o8q\"> </button></span></div></div>"), yf = /* @__PURE__ */ V("<div class=\"setup-overlay svelte-1n46o8q\"><div class=\"setup-card svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <p class=\"panel-hint svelte-1n46o8q\"> </p> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <p class=\"panel-hint svelte-1n46o8q\"> </p> <span class=\"setup-actions svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"primary svelte-1n46o8q\"> </button></span></div></div>"), bf = /* @__PURE__ */ V("<div><span> </span> <button class=\"toast-x svelte-1n46o8q\">×</button></div>"), xf = /* @__PURE__ */ V("<div class=\"block-menu svelte-1n46o8q\"><header class=\"block-menu-head svelte-1n46o8q\"><span> </span> <button class=\"ghost row-tool svelte-1n46o8q\"></button></header> <div class=\"panel-body block-menu-body svelte-1n46o8q\"><!></div></div>"), Sf = /* @__PURE__ */ V("<div class=\"editor svelte-1n46o8q\"><!> <header><span class=\"topbar-group svelte-1n46o8q\"><!> <!></span> <span class=\"topbar-group topbar-draft svelte-1n46o8q\"><!></span> <span class=\"topbar-group topbar-right svelte-1n46o8q\"><!></span></header> <!> <!> <!> <!> <!></div>   <!>", 1);
function Cf(e, t) {
	Je(t, !0);
	let n = (e, t = f, n = f) => {
		var r = ul(), i = I(r);
		Kr(i, 17, n, Hr, (e, r, i) => {
			var a = ll(), s = F(a), l = F(s);
			{
				let e = /* @__PURE__ */ A(() => Y("tip.bg.changeType")), n = /* @__PURE__ */ A(() => o.map(([e, t]) => [e, t.labelKey ? Y(t.labelKey) : t.label]));
				X(l, {
					get value() {
						return z(r).type;
					},
					get title() {
						return z(e);
					},
					get options() {
						return z(n);
					},
					onchange: (e) => Kn(t(), i, e)
				});
			}
			var u = L(l, 2), d = F(u);
			d.disabled = i === 0, G(d, () => c.up, !0), O(d);
			var f = L(d, 2);
			G(f, () => c.down, !0), O(f);
			var p = L(f, 2);
			G(p, () => c.cross, !0), O(p), O(u), O(s);
			var m = L(s, 2), h = (e) => {
				var n = Jc(), a = I(n), o = F(a), s = L(o);
				{
					let e = /* @__PURE__ */ A(ur), n = /* @__PURE__ */ A(() => Y("tip.bg.layerColor"));
					sa(s, {
						get value() {
							return z(r).props.value;
						},
						get tokens() {
							return z(e);
						},
						get label() {
							return z(n);
						},
						onchange: (e) => kn(t(), i, "value", e)
					});
				}
				O(a);
				var c = L(a, 2), l = F(c), u = L(l), d = F(u);
				O(u), O(c);
				var f = L(c, 2);
				K(f), R((e, t, n) => {
					U(o, `${e ?? ""} `), U(l, `${t ?? ""} `), U(d, `${n ?? ""}%`), q(f, z(r).props.opacity ?? 1);
				}, [
					() => Y("lbl.color"),
					() => Y("lbl.strength"),
					() => Math.round((z(r).props.opacity ?? 1) * 100)
				]), B("input", f, (e) => kn(t(), i, "opacity", Number(e.target.value))), H(e, n);
			}, g = (e) => {
				let n = /* @__PURE__ */ A(() => Fn(z(r))), a = /* @__PURE__ */ A(() => z(n).stops.reduce((e, t) => e + Math.max(0, Number(t.share) || 0), 0));
				var o = $c(), s = I(o), l = F(s), u = L(l);
				{
					let e = /* @__PURE__ */ A(() => z(n).kind ?? "linear"), r = /* @__PURE__ */ A(() => [["linear", Y("opt.grad.linear")], ["radial", Y("opt.grad.radial")]]);
					X(u, {
						get value() {
							return z(e);
						},
						get options() {
							return z(r);
						},
						onchange: (e) => zn(t(), i, e)
					});
				}
				O(s);
				var d = L(s, 2);
				Kr(d, 17, () => z(n).stops, Hr, (e, r, o) => {
					var s = Xc();
					let l;
					var u = F(s), d = L(u, 2);
					{
						let e = /* @__PURE__ */ A(ur), n = /* @__PURE__ */ A(() => Y("tip.bg.stopColor"));
						sa(d, {
							get value() {
								return z(r).color;
							},
							get tokens() {
								return z(e);
							},
							get label() {
								return z(n);
							},
							onchange: (e) => Bn(t(), i, o, { color: e })
						});
					}
					var f = L(d, 2);
					K(f);
					var p = L(f, 2), m = F(p);
					O(p);
					var h = L(p, 2), g = (e) => {
						var n = Yc();
						G(n, () => c.cross, !0), O(n), R((e) => J(n, "title", e), [() => Y("tip.bg.removeStop")]), B("click", n, () => Hn(t(), i, o)), H(e, n);
					};
					W(h, (e) => {
						z(n).stops.length > 2 && e(g);
					}), O(s), R((e, t, a) => {
						l = pi(s, 1, "nav-line grad-stop svelte-1n46o8q", null, l, {
							dragging: z(Wn)?.layer === i && z(Wn).from === o,
							"drop-above": z(Wn)?.layer === i && z(Wn).insert === o,
							"drop-below": z(Wn)?.layer === i && z(Wn).insert === z(n).stops.length && o === z(n).stops.length - 1
						}), J(u, "title", e), q(f, z(r).share ?? 50), J(f, "title", t), U(m, `${a ?? ""}%`);
					}, [
						() => Y("tip.bg.dragStop"),
						() => Y("tip.bg.stopShare"),
						() => z(a) > 0 ? Math.round(Math.max(0, Number(z(r).share) || 0) / z(a) * 100) : Math.round(100 / z(n).stops.length)
					]), B("pointerdown", u, (e) => Gn(t(), e, i, o)), B("input", f, (e) => Bn(t(), i, o, { share: Number(e.target.value) })), H(e, s);
				});
				var f = L(d, 2), p = F(f, !0);
				O(f);
				var m = L(f, 2), h = (e) => {
					var r = Zc(), a = I(r), o = F(a), s = L(o), c = F(s);
					O(s), O(a);
					var l = L(a, 2);
					K(l);
					var u = L(l, 2), d = F(u), f = L(d), p = F(f);
					O(f), O(u);
					var m = L(u, 2);
					K(m), R((e, t, r, i) => {
						U(o, `${e ?? ""} `), U(c, `${t ?? ""}%`), q(l, z(n).x ?? .5), U(d, `${r ?? ""} `), U(p, `${i ?? ""}%`), q(m, z(n).y ?? .5);
					}, [
						() => Y("lbl.centerX"),
						() => Math.round((z(n).x ?? .5) * 100),
						() => Y("lbl.centerY"),
						() => Math.round((z(n).y ?? .5) * 100)
					]), B("input", l, (e) => Ln(t(), i, "x", Number(e.target.value))), B("input", m, (e) => Ln(t(), i, "y", Number(e.target.value))), H(e, r);
				}, g = (e) => {
					var r = Qc(), a = I(r), o = F(a), s = L(o), c = F(s);
					O(s), O(a);
					var l = L(a, 2);
					K(l), R((e) => {
						U(o, `${e ?? ""} `), U(c, `${z(n).angle ?? ""}°`), q(l, z(n).angle);
					}, [() => Y("lbl.angle")]), B("input", l, (e) => Ln(t(), i, "angle", Number(e.target.value))), H(e, r);
				};
				W(m, (e) => {
					(z(n).kind ?? "linear") === "radial" ? e(h) : e(g, -1);
				});
				var _ = L(m, 2), v = F(_), y = L(v), b = F(y);
				O(y), O(_);
				var x = L(_, 2);
				K(x);
				var S = L(x, 2), C = F(S), ee = L(C);
				{
					let e = /* @__PURE__ */ A(() => z(n).animation ?? "none");
					X(ee, {
						get value() {
							return z(e);
						},
						get options() {
							return Rn[(z(n).kind ?? "linear") === "radial" ? "radial" : "linear"];
						},
						onchange: (e) => Ln(t(), i, "animation", e)
					});
				}
				O(S), R((e, t, r, i, a, o, s) => {
					U(l, `${e ?? ""} `), J(f, "title", t), U(p, r), U(v, `${i ?? ""} `), U(b, `${a ?? ""}%`), q(x, z(n).opacity ?? 1), J(S, "title", o), U(C, `${s ?? ""} `);
				}, [
					() => Y("blocks.shape"),
					() => Y("tip.bg.addStop"),
					() => Y("ui.addStop"),
					() => Y("lbl.strength"),
					() => Math.round((z(n).opacity ?? 1) * 100),
					() => Y("tip.bg.motion"),
					() => Y("lbl.motion")
				]), B("click", f, () => Vn(t(), i)), B("input", x, (e) => Ln(t(), i, "opacity", Number(e.target.value))), H(e, o);
			}, _ = (e) => {
				var n = el(), a = I(n), o = F(a), s = L(o);
				{
					let e = /* @__PURE__ */ A(ur), n = /* @__PURE__ */ A(() => Y("tip.bg.glowColor"));
					sa(s, {
						get value() {
							return z(r).props.color;
						},
						get tokens() {
							return z(e);
						},
						get label() {
							return z(n);
						},
						onchange: (e) => kn(t(), i, "color", e)
					});
				}
				O(a);
				var c = L(a, 2), l = F(c), u = L(l), d = F(u);
				O(u), O(c);
				var f = L(c, 2);
				K(f);
				var p = L(f, 2), m = F(p), h = L(m), g = F(h);
				O(h), O(p);
				var _ = L(p, 2);
				K(_);
				var v = L(_, 2), y = F(v), b = L(y), x = F(b);
				O(b), O(v);
				var S = L(v, 2);
				K(S);
				var C = L(S, 2), ee = F(C), te = L(ee), ne = F(te);
				O(te), O(C);
				var re = L(C, 2);
				K(re), R((e, t, n, i, a, s, c, u, p) => {
					U(o, `${e ?? ""} `), U(l, `${t ?? ""} `), U(d, `${n ?? ""}%`), q(f, z(r).props.x), U(m, `${i ?? ""} `), U(g, `${a ?? ""}%`), q(_, z(r).props.y), U(y, `${s ?? ""} `), U(x, `${c ?? ""}%`), q(S, z(r).props.radius), U(ee, `${u ?? ""} `), U(ne, `${p ?? ""}%`), q(re, z(r).props.opacity);
				}, [
					() => Y("lbl.color"),
					() => Y("lbl.posX"),
					() => Math.round(z(r).props.x * 100),
					() => Y("lbl.posY"),
					() => Math.round(z(r).props.y * 100),
					() => Y("lbl.size"),
					() => Math.round(z(r).props.radius * 100),
					() => Y("lbl.strength"),
					() => Math.round(z(r).props.opacity * 100)
				]), B("input", f, (e) => kn(t(), i, "x", Number(e.target.value))), B("input", _, (e) => kn(t(), i, "y", Number(e.target.value))), B("input", S, (e) => kn(t(), i, "radius", Number(e.target.value))), B("input", re, (e) => kn(t(), i, "opacity", Number(e.target.value))), H(e, n);
			}, v = (e) => {
				var n = tl(), a = I(n), o = F(a), s = L(o), c = F(s);
				O(s), O(a);
				var l = L(a, 2);
				K(l), R((e, t) => {
					U(o, `${e ?? ""} `), U(c, `${t ?? ""}%`), q(l, z(r).props.opacity);
				}, [() => Y("lbl.strength"), () => Math.round(z(r).props.opacity * 100)]), B("input", l, (e) => kn(t(), i, "opacity", Number(e.target.value))), H(e, n);
			}, y = (e) => {
				let n = /* @__PURE__ */ A(() => z(r).props.fit === "tile" || z(r).props.fit === "repeat");
				var a = il(), o = I(a), s = F(o), c = L(s);
				O(o);
				var l = L(o, 2), u = F(l), d = L(u);
				{
					let e = /* @__PURE__ */ A(() => z(n) ? "tile" : "plain"), r = /* @__PURE__ */ A(() => [["plain", Y("opt.img.plain")], ["tile", Y("opt.img.tile")]]);
					X(d, {
						get value() {
							return z(e);
						},
						get options() {
							return z(r);
						},
						onchange: (e) => kn(t(), i, "fit", e)
					});
				}
				O(l);
				var f = L(l, 2), p = F(f, !0);
				O(f);
				var m = L(f, 2), h = F(m), g = L(h, 2);
				K(g);
				var _ = L(g, 4);
				O(m);
				var v = L(m, 2), y = (e) => {
					var n = nl(), a = I(n), o = F(a), s = F(o, !0);
					O(o);
					var c = L(o, 2), l = F(c, !0);
					O(c), O(a);
					var u = L(a, 2), d = F(u, !0);
					O(u);
					var f = L(u, 2), p = L(f, 2), m = F(p), h = L(m), g = F(h);
					O(h), O(p);
					var _ = L(p, 2);
					K(_);
					var v = L(_, 2), y = F(v), b = L(y), x = F(b);
					O(b), O(v);
					var S = L(v, 2);
					K(S), R((e, t, n, i, a, p, h, v, b, C, ee, te) => {
						J(o, "title", e), U(s, t), J(c, "title", n), U(l, i), J(u, "title", a), U(d, p), hi(f, `--fx:${h ?? ""}%; --fy:${v ?? ""}%`), U(m, `${b ?? ""} `), U(g, `${C ?? ""}%`), q(_, z(r).props.x ?? .5), U(y, `${ee ?? ""} `), U(x, `${te ?? ""}%`), q(S, z(r).props.y ?? .5);
					}, [
						() => Y("tip.bg.cover"),
						() => Y("ui.cover"),
						() => Y("opt.fitFrame.contain"),
						() => Y("opt.fit.contain"),
						() => Y("tip.bg.position"),
						() => Y("lbl.position"),
						() => Math.max(0, Math.min(1, z(r).props.x ?? .5)) * 100,
						() => Math.max(0, Math.min(1, z(r).props.y ?? .5)) * 100,
						() => Y("lbl.horizontal"),
						() => Math.round((z(r).props.x ?? .5) * 100),
						() => Y("lbl.vertical"),
						() => Math.round((z(r).props.y ?? .5) * 100)
					]), B("click", o, () => Pn(t(), i, z(r), "cover")), B("click", c, () => Pn(t(), i, z(r), "contain")), B("pointerdown", f, (e) => An(e, t(), i, "xy")), B("input", _, (e) => kn(t(), i, "x", Number(e.target.value))), B("input", S, (e) => kn(t(), i, "y", Number(e.target.value))), H(e, n);
				};
				W(v, (e) => {
					z(n) || e(y);
				});
				var b = L(v, 2), x = F(b), S = L(x), C = F(S);
				O(S), O(b);
				var ee = L(b, 2);
				K(ee);
				var te = L(ee, 2), ne = F(te), re = L(ne), ie = F(re);
				O(re), O(te);
				var ae = L(te, 2);
				K(ae);
				var oe = L(ae, 2), se = F(oe);
				K(se);
				var ce = L(se);
				O(oe);
				var le = L(oe, 2), ue = (e) => {
					var n = rl(), a = I(n), o = F(a), s = L(o), c = F(s);
					O(s), O(a);
					var l = L(a, 2);
					K(l);
					var u = L(l, 2), d = F(u), f = L(d);
					{
						let e = /* @__PURE__ */ A(() => z(r).props.bleed ?? "none"), n = /* @__PURE__ */ A(() => [
							["none", Y("common.none")],
							["up", Y("opt.bleed.up")],
							["down", Y("opt.bleed.down")],
							["both", Y("opt.brand.both")]
						]);
						X(f, {
							get value() {
								return z(e);
							},
							get options() {
								return z(n);
							},
							onchange: (e) => kn(t(), i, "bleed", e)
						});
					}
					O(u), R((e, t, n, i) => {
						U(o, `${e ?? ""} `), U(c, `${t ?? ""}%`), q(l, z(r).props.parallax ?? .3), J(u, "title", n), U(d, `${i ?? ""} `);
					}, [
						() => Y("lbl.parallaxStrength"),
						() => Math.round((z(r).props.parallax ?? 0) * 100),
						() => Y("tip.bg.bleed"),
						() => Y("lbl.bleed")
					]), B("input", l, (e) => kn(t(), i, "parallax", Number(e.target.value))), H(e, n);
				};
				W(le, (e) => {
					(z(r).props.parallax ?? 0) > 0 && e(ue);
				}), R((e, t, n, i, a, c, d, m, v, y, b, S, te, re) => {
					J(o, "title", e), U(s, `${t ?? ""} `), J(l, "title", n), U(u, `${i ?? ""} `), J(f, "title", a), U(p, c), J(h, "title", d), q(g, m), J(_, "title", v), U(x, `${y ?? ""} `), U(C, `${z(r).props.blur ?? 0 ?? ""} px`), q(ee, z(r).props.blur ?? 0), U(ne, `${b ?? ""} `), U(ie, `${S ?? ""}%`), q(ae, z(r).props.opacity ?? 1), J(oe, "title", te), bi(se, (z(r).props.parallax ?? 0) > 0), U(ce, ` ${re ?? ""}`);
				}, [
					() => Y("tip.webpAuto"),
					() => z(r).props.src ? Y("ui.changeImage") : Y("ui.chooseImage"),
					() => Y("tip.bg.fit"),
					() => Y("lbl.fit"),
					() => Y("tip.bg.size"),
					() => Y("lbl.size"),
					() => Y("tip.smaller"),
					() => Math.round((z(r).props.size ?? 1) * 100),
					() => Y("tip.larger"),
					() => Y("lbl.blur"),
					() => Y("lbl.strength"),
					() => Math.round((z(r).props.opacity ?? 1) * 100),
					() => Y("tip.bg.parallax"),
					() => Y("lbl.parallax")
				]), B("change", c, (e) => Xn(t(), i, e)), B("click", h, () => Mn(t(), i, z(r).props.size ?? 1, -.05)), B("change", g, (e) => Nn(t(), i, e.target.value)), B("click", _, () => Mn(t(), i, z(r).props.size ?? 1, .05)), B("input", ee, (e) => kn(t(), i, "blur", Number(e.target.value))), B("input", ae, (e) => kn(t(), i, "opacity", Number(e.target.value))), B("change", se, (e) => kn(t(), i, "parallax", e.target.checked ? .3 : 0)), H(e, a);
			}, b = (e) => {
				var n = ol(), a = I(n), o = F(a), s = L(o);
				O(a);
				var l = L(a, 2);
				Kr(l, 17, () => z(r).props.images ?? [], Hr, (e, n, a) => {
					var o = al(), s = I(o), l = F(s), u = L(l, 2), d = F(u);
					d.disabled = a === 0, G(d, () => c.up, !0), O(d);
					var f = L(d, 2);
					G(f, () => c.down, !0), O(f);
					var p = L(f, 2);
					G(p, () => c.cross, !0), O(p), O(u), O(s);
					var m = L(s, 2), h = F(m), g = L(h), _ = F(g);
					O(g), O(m);
					var v = L(m, 2);
					K(v);
					var y = L(v, 2), b = F(y), x = L(b), S = F(x);
					O(x), O(y);
					var C = L(y, 2);
					K(C), R((e, t, i, o, s) => {
						J(l, "src", z(n).src), f.disabled = a === z(r).props.images.length - 1, J(p, "title", e), U(h, `${t ?? ""} `), U(_, `${i ?? ""}%`), q(v, z(n).x ?? .5), U(b, `${o ?? ""} `), U(S, `${s ?? ""}%`), q(C, z(n).y ?? .5);
					}, [
						() => Y("tip.removeImage"),
						() => Y("lbl.focusX"),
						() => Math.round((z(n).x ?? .5) * 100),
						() => Y("lbl.focusY"),
						() => Math.round((z(n).y ?? .5) * 100)
					]), B("click", d, () => er(t(), i, a, -1)), B("click", f, () => er(t(), i, a, 1)), B("click", p, () => tr(t(), i, a)), B("input", v, (e) => nr(t(), i, a, "x", Number(e.target.value))), B("input", C, (e) => nr(t(), i, a, "y", Number(e.target.value))), H(e, o);
				});
				var u = L(l, 2), d = F(u), f = L(d);
				{
					let e = /* @__PURE__ */ A(() => z(r).props.fit ?? "cover"), n = /* @__PURE__ */ A(() => [["cover", Y("opt.fit.cover")], ["contain", Y("opt.fit.contain")]]);
					X(f, {
						get value() {
							return z(e);
						},
						get options() {
							return z(n);
						},
						onchange: (e) => kn(t(), i, "fit", e)
					});
				}
				O(u);
				var p = L(u, 2), m = F(p), h = L(m);
				K(h), O(p);
				var g = L(p, 2), _ = F(g), v = L(_), y = F(v);
				O(v), O(g);
				var b = L(g, 2);
				K(b);
				var x = L(b, 2), S = F(x), C = L(S), ee = F(C);
				O(C), O(x);
				var te = L(x, 2);
				K(te);
				var ne = L(te, 2), re = F(ne), ie = L(re), ae = F(ie);
				O(ie), O(ne);
				var oe = L(ne, 2);
				K(oe);
				var se = L(oe, 2), ce = F(se, !0);
				O(se), R((e, t, n, i, s, c, l, u, f, g, v) => {
					J(a, "title", e), U(o, `${t ?? ""} `), U(d, `${n ?? ""} `), J(p, "title", i), U(m, `${s ?? ""} `), q(h, z(r).props.interval ?? 6), U(_, `${c ?? ""} `), U(y, `${l ?? ""} s`), q(b, z(r).props.fade ?? 1.5), U(S, `${u ?? ""} `), U(ee, `${z(r).props.blur ?? 0 ?? ""} px`), q(te, z(r).props.blur ?? 0), U(re, `${f ?? ""} `), U(ae, `${g ?? ""}%`), q(oe, z(r).props.opacity ?? 1), U(ce, v);
				}, [
					() => Y("tip.bg.addImages"),
					() => Y("ui.addImages"),
					() => Y("lbl.fit"),
					() => Y("hint.bg.gallery"),
					() => Y("lbl.secondsPerImage"),
					() => Y("lbl.transition"),
					() => (z(r).props.fade ?? 1.5).toFixed(1),
					() => Y("lbl.blur"),
					() => Y("lbl.strength"),
					() => Math.round((z(r).props.opacity ?? 1) * 100),
					() => Y("hint.bg.gallery")
				]), B("change", s, (e) => $n(t(), i, e)), B("change", h, (e) => kn(t(), i, "interval", Number(e.target.value))), B("input", b, (e) => kn(t(), i, "fade", Number(e.target.value))), B("input", te, (e) => kn(t(), i, "blur", Number(e.target.value))), B("input", oe, (e) => kn(t(), i, "opacity", Number(e.target.value))), H(e, n);
			}, x = (e) => {
				var n = cl(), a = I(n), o = F(a), s = L(o);
				O(a);
				var c = L(a, 2), l = F(c), u = L(l);
				O(c);
				var d = L(c, 2), f = F(d), p = L(f);
				{
					let e = /* @__PURE__ */ A(() => z(r).props.fit ?? "cover"), n = /* @__PURE__ */ A(() => [["cover", Y("opt.fit.cover")], ["contain", Y("opt.fit.contain")]]);
					X(p, {
						get value() {
							return z(e);
						},
						get options() {
							return z(n);
						},
						onchange: (e) => kn(t(), i, "fit", e)
					});
				}
				O(d);
				var m = L(d, 2), h = F(m), g = L(h), _ = F(g);
				O(g), O(m);
				var v = L(m, 2);
				K(v);
				var y = L(v, 2), b = F(y), x = L(b), S = F(x);
				O(x), O(y);
				var C = L(y, 2);
				K(C);
				var ee = L(C, 2), te = F(ee), ne = L(te), re = F(ne);
				O(ne), O(ee);
				var ie = L(ee, 2);
				K(ie);
				var ae = L(ie, 2), oe = F(ae);
				K(oe);
				var se = L(oe);
				O(ae);
				var ce = L(ae, 2), le = (e) => {
					var n = sl(), a = I(n), o = F(a), s = L(o), c = F(s);
					O(s), O(a);
					var l = L(a, 2);
					K(l), R((e, t) => {
						U(o, `${e ?? ""} `), U(c, `${t ?? ""}%`), q(l, z(r).props.parallax ?? .3);
					}, [() => Y("lbl.parallaxStrength"), () => Math.round((z(r).props.parallax ?? 0) * 100)]), B("input", l, (e) => kn(t(), i, "parallax", Number(e.target.value))), H(e, n);
				};
				W(ce, (e) => {
					(z(r).props.parallax ?? 0) > 0 && e(le);
				}), R((e, t, n, i, s, u, p, m, g, y, x, ee, ne, ce) => {
					J(a, "title", e), U(o, `${t ?? ""} `), J(c, "title", n), U(l, `${i ?? ""} `), J(d, "title", s), U(f, `${u ?? ""} `), U(h, `${p ?? ""} `), U(_, `${m ?? ""}%`), q(v, z(r).props.x ?? .5), U(b, `${g ?? ""} `), U(S, `${y ?? ""}%`), q(C, z(r).props.y ?? .5), U(te, `${x ?? ""} `), U(re, `${ee ?? ""}%`), q(ie, z(r).props.opacity ?? 1), J(ae, "title", ne), bi(oe, (z(r).props.parallax ?? 0) > 0), U(se, ` ${ce ?? ""}`);
				}, [
					() => Y("tip.bg.videoFile"),
					() => z(r).props.src ? Y("ui.changeVideo") : Y("ui.chooseVideo"),
					() => Y("tip.bg.poster"),
					() => z(r).props.poster ? Y("ui.changeImage") : Y("ui.choosePoster"),
					() => Y("tip.bg.fit"),
					() => Y("lbl.fit"),
					() => Y("lbl.horizontal"),
					() => Math.round((z(r).props.x ?? .5) * 100),
					() => Y("lbl.vertical"),
					() => Math.round((z(r).props.y ?? .5) * 100),
					() => Y("lbl.strength"),
					() => Math.round((z(r).props.opacity ?? 1) * 100),
					() => Y("tip.bg.parallax"),
					() => Y("lbl.parallax")
				]), B("change", s, (e) => Zn(t(), i, e)), B("change", u, (e) => Qn(t(), i, e)), B("input", v, (e) => kn(t(), i, "x", Number(e.target.value))), B("input", C, (e) => kn(t(), i, "y", Number(e.target.value))), B("input", ie, (e) => kn(t(), i, "opacity", Number(e.target.value))), B("change", oe, (e) => kn(t(), i, "parallax", e.target.checked ? .3 : 0)), H(e, n);
			};
			W(m, (e) => {
				z(r).type === "color" ? e(h) : z(r).type === "gradient" ? e(g, 1) : z(r).type === "glow" ? e(_, 2) : z(r).type === "grain" ? e(v, 3) : z(r).type === "image" ? e(y, 4) : z(r).type === "slideshow" ? e(b, 5) : z(r).type === "video" && e(x, 6);
			}), O(a), R((e, t, r) => {
				J(d, "title", e), J(f, "title", t), f.disabled = i === n().length - 1, J(p, "title", r);
			}, [
				() => Y("hint.bg.order"),
				() => Y("hint.bg.order"),
				() => Y("tip.bg.removeLayer")
			]), B("click", d, () => On(t(), i, -1)), B("click", f, () => On(t(), i, 1)), B("click", p, () => Dn(t(), i)), H(e, a);
		});
		var a = L(i, 2), s = F(a), l = L(s);
		{
			let e = /* @__PURE__ */ A(() => o.map(([e, t]) => [e, t.labelKey ? Y(t.labelKey) : t.label]));
			X(l, {
				get value() {
					return z(Tn);
				},
				get options() {
					return z(e);
				},
				onchange: (e) => P(Tn, e, !0)
			});
		}
		O(a);
		var u = L(a, 2), d = F(u, !0);
		O(u), R((e, t) => {
			U(s, `${e ?? ""} `), U(d, t);
		}, [() => Y("lbl.newLayer"), () => Y("ui.addLayer")]), B("click", u, () => En(t(), z(Tn))), H(e, r);
	}, r = (e, t = f, n = f) => {
		var r = Fr();
		Kr(I(r), 17, n, Hr, (e, r, i) => {
			var a = fl(), o = F(a);
			K(o);
			var s = L(o, 2), l = F(s);
			l.disabled = i === 0, G(l, () => c.up, !0), O(l);
			var u = L(l, 2);
			G(u, () => c.down, !0), O(u);
			var d = L(u, 2);
			G(d, () => c.cross, !0), O(d), O(s);
			var f = L(s, 2), p = F(f);
			{
				let e = /* @__PURE__ */ A(() => z(r).page ?? "__href"), n = /* @__PURE__ */ A(() => Y("tip.linkTarget")), a = /* @__PURE__ */ A(() => [...z(E).pages.map((e) => [e.id, e.title]), ["__href", Y("opt.linkHref")]]);
				X(p, {
					get value() {
						return z(e);
					},
					get title() {
						return z(n);
					},
					get options() {
						return z(a);
					},
					onchange: (e) => lc(t(), i, e)
				});
			}
			O(f);
			var m = L(f, 2), h = (e) => {
				var n = dl();
				K(n), R((e, t) => {
					q(n, z(r).href ?? ""), J(n, "placeholder", e), J(n, "title", t);
				}, [() => Y("ph.hrefAnchor"), () => Y("tip.hrefAnchor")]), B("change", n, (e) => uc(t(), i, e.target.value)), H(e, n);
			};
			W(m, (e) => {
				z(r).page || e(h);
			}), O(a), R((e, t) => {
				q(o, z(r).label), J(o, "title", e), u.disabled = i === n().length - 1, J(d, "title", t);
			}, [() => Y("tip.linkLabel"), () => Y("tip.removeLink")]), B("input", o, (e) => cc(t(), i, e.target.value)), B("click", l, () => sc(t(), i, -1)), B("click", u, () => sc(t(), i, 1)), B("click", d, () => oc(t(), i)), H(e, a);
		}), H(e, r);
	}, i = (e) => {
		let t = /* @__PURE__ */ A(() => z(k).props.boxStyle ?? {});
		var n = hl(), r = I(n), i = F(r), a = L(i);
		{
			let e = /* @__PURE__ */ A(() => z(t).bg ?? ""), n = /* @__PURE__ */ A(ur), r = /* @__PURE__ */ A(() => Y("tip.box.bg"));
			sa(a, {
				get value() {
					return z(e);
				},
				get tokens() {
					return z(n);
				},
				allowClear: !0,
				get label() {
					return z(r);
				},
				onchange: (e) => Vt({ bg: e || null })
			});
		}
		O(r);
		var o = L(r, 2), s = F(o), c = L(s);
		{
			let e = /* @__PURE__ */ A(() => z(t).shadow ?? ""), n = /* @__PURE__ */ A(() => [
				["", Y("common.none")],
				["soft", Y("opt.shadow.soft")],
				["strong", Y("opt.shadow.strong")]
			]);
			X(c, {
				get value() {
					return z(e);
				},
				get options() {
					return z(n);
				},
				onchange: (e) => Vt({ shadow: e || null })
			});
		}
		O(o);
		var l = L(o, 2), u = (e) => {
			var n = pl(), r = F(n), i = L(r);
			{
				let e = /* @__PURE__ */ A(() => z(t).shadowColor ?? ""), n = /* @__PURE__ */ A(ur), r = /* @__PURE__ */ A(() => Y("tip.box.shadowColor"));
				sa(i, {
					get value() {
						return z(e);
					},
					get tokens() {
						return z(n);
					},
					allowClear: !0,
					get label() {
						return z(r);
					},
					onchange: (e) => Vt({ shadowColor: e || null })
				});
			}
			O(n), R((e) => U(r, `${e ?? ""} `), [() => Y("lbl.shadowColor")]), H(e, n);
		};
		W(l, (e) => {
			z(t).shadow && e(u);
		});
		var d = L(l, 2), f = F(d), p = L(f);
		{
			let e = /* @__PURE__ */ A(() => z(t).border === "none" ? "none" : z(t).border ? "custom" : ""), n = /* @__PURE__ */ A(() => [
				["", Y("opt.border.theme")],
				["none", Y("common.none")],
				["custom", Y("opt.border.custom")]
			]);
			X(p, {
				get value() {
					return z(e);
				},
				get options() {
					return z(n);
				},
				onchange: (e) => Vt({ border: e === "custom" ? {
					color: "accent",
					width: 1
				} : e || null })
			});
		}
		O(d);
		var m = L(d, 2), h = (e) => {
			let n = /* @__PURE__ */ A(() => typeof z(t).border == "object" ? z(t).border : {
				color: "text",
				width: 1
			});
			var r = ml(), i = I(r), a = F(i), o = L(a);
			{
				let e = /* @__PURE__ */ A(ur), t = /* @__PURE__ */ A(() => Y("tip.box.borderColor"));
				sa(o, {
					get value() {
						return z(n).color;
					},
					get tokens() {
						return z(e);
					},
					get label() {
						return z(t);
					},
					onchange: (e) => Vt({ border: {
						...z(n),
						color: e
					} })
				});
			}
			O(i);
			var s = L(i, 2), c = F(s), l = L(c), u = F(l), d = L(u, 2);
			K(d);
			var f = L(d, 2);
			O(l), O(s), R((e, t, r, i, o, s) => {
				U(a, `${e ?? ""} `), U(c, `${t ?? ""} `), J(u, "title", r), J(u, "aria-label", i), q(d, z(n).width), J(f, "title", o), J(f, "aria-label", s);
			}, [
				() => Y("lbl.borderColor"),
				() => Y("lbl.thicknessPx"),
				() => Y("tip.thinner"),
				() => Y("tip.thinner"),
				() => Y("tip.thicker"),
				() => Y("tip.thicker")
			]), B("click", u, () => Vt({ border: {
				...z(n),
				width: Math.max(1, z(n).width - 1)
			} })), B("change", d, (e) => Vt({ border: {
				...z(n),
				width: Math.min(12, Math.max(1, Number(e.target.value) || 1))
			} })), B("click", f, () => Vt({ border: {
				...z(n),
				width: Math.min(12, z(n).width + 1)
			} })), H(e, r);
		};
		W(m, (e) => {
			z(t).border !== "none" && e(h);
		});
		var g = L(m, 2), _ = F(g);
		K(_);
		var v = L(_);
		O(g), R((e, t, n, r, a, o) => {
			U(i, `${e ?? ""} `), U(s, `${t ?? ""} `), U(f, `${n ?? ""} `), J(g, "title", r), bi(_, a), U(v, ` ${o ?? ""}`);
		}, [
			() => Y("lbl.blockColor"),
			() => Y("lbl.shadow"),
			() => Y("lbl.border"),
			() => Y("tip.box.glass"),
			() => !!z(t).glass,
			() => Y("lbl.glass")
		]), B("change", _, (e) => Vt({ glass: e.target.checked || null })), H(e, n);
	}, a = (e) => {
		var t = hu(), n = I(t), r = F(n), a = F(r);
		let o;
		var s = F(a, !0);
		O(a);
		var l = L(a, 2);
		let u;
		var d = F(l, !0);
		O(l), O(r), O(n);
		var f = L(n, 2), p = (e) => {
			var t = Fr(), n = I(t), r = (e) => {
				var t = gl(), n = F(t, !0);
				O(t), R((e) => U(n, e), [() => Y("hint.textInline")]), H(e, t);
			}, i = (e) => {
				var t = vl(), n = I(t), r = F(n);
				K(r);
				var i = L(r);
				O(n);
				var a = L(n, 2), o = F(a, !0);
				O(a);
				var s = L(a, 2);
				Kr(s, 17, () => z(k).props.items ?? [], Hr, (e, t, n) => {
					var r = _l(), i = F(r);
					K(i);
					var a = L(i, 2), o = F(a);
					o.disabled = n === 0, G(o, () => c.up, !0), O(o);
					var s = L(o, 2);
					G(s, () => c.down, !0), O(s);
					var l = L(s, 2);
					G(l, () => c.cross, !0), O(l), O(a), O(r), R((e, r) => {
						q(i, z(t).q), J(i, "title", e), s.disabled = n === (z(k).props.items?.length ?? 0) - 1, J(l, "title", r);
					}, [() => Y("tip.faq.question"), () => Y("tip.faq.remove")]), B("change", i, (e) => Ht(n, { q: e.target.value })), B("click", o, () => Gt(n, -1)), B("click", s, () => Gt(n, 1)), B("click", l, () => Wt(n)), H(e, r);
				});
				var l = L(s, 2), u = F(l, !0);
				O(l), R((e, t, a, s, c) => {
					J(n, "title", e), bi(r, t), U(i, ` ${a ?? ""}`), U(o, s), U(u, c);
				}, [
					() => Y("tip.faq.multi"),
					() => !!z(k).props.multi,
					() => Y("lbl.faqMulti"),
					() => Y("lbl.questions"),
					() => Y("ui.addQuestion")
				]), B("change", r, (e) => M("multi", e.target.checked)), B("click", l, Ut), H(e, t);
			}, a = (e) => {
				var t = bl(), n = I(t), r = F(n, !0);
				O(n);
				var i = L(n, 2);
				Kr(i, 17, () => z(k).props.items ?? [], Hr, (e, t, n) => {
					var r = yl(), i = I(r), a = F(i);
					K(a);
					var o = L(a, 2);
					K(o);
					var s = L(o, 2), l = F(s);
					l.disabled = n === 0, G(l, () => c.up, !0), O(l);
					var u = L(l, 2);
					G(u, () => c.down, !0), O(u);
					var d = L(u, 2);
					G(d, () => c.cross, !0), O(d), O(s), O(i);
					var f = L(i, 2);
					K(f), R((e, r, i, s, c, l) => {
						q(a, z(t).year), J(a, "placeholder", e), J(a, "title", r), q(o, z(t).title), J(o, "title", i), u.disabled = n === (z(k).props.items?.length ?? 0) - 1, J(d, "title", s), q(f, z(t).text), J(f, "placeholder", c), J(f, "title", l);
					}, [
						() => Y("ph.tlYear"),
						() => Y("tip.timeline.year"),
						() => Y("tip.timeline.title"),
						() => Y("tip.timeline.remove"),
						() => Y("ph.tlText"),
						() => Y("tip.timeline.text")
					]), B("change", a, (e) => Kt(n, { year: e.target.value })), B("change", o, (e) => Kt(n, { title: e.target.value })), B("click", l, () => Yt(n, -1)), B("click", u, () => Yt(n, 1)), B("click", d, () => Jt(n)), B("change", f, (e) => Kt(n, { text: e.target.value })), H(e, r);
				});
				var a = L(i, 2), o = F(a, !0);
				O(a), R((e, t) => {
					U(r, e), U(o, t);
				}, [() => Y("lbl.timelineItems"), () => Y("ui.addTlItem")]), B("click", a, qt), H(e, t);
			}, o = (e) => {
				var t = xl(), n = I(t), r = F(n), i = L(r);
				K(i), O(n);
				var a = L(n, 2), o = F(a), s = L(o);
				K(s), O(a);
				var c = L(a, 2), l = F(c), u = L(l);
				K(u), O(c), R((e, t, n) => {
					U(r, `${e ?? ""} `), q(i, z(k).props.text ?? ""), U(o, `${t ?? ""} `), q(s, z(k).props.attribution ?? ""), U(l, `${n ?? ""} `), q(u, z(k).props.role ?? "");
				}, [
					() => Y("lbl.quoteText"),
					() => Y("lbl.quoteName"),
					() => Y("lbl.quoteRole")
				]), B("change", i, (e) => M("text", e.target.value)), B("change", s, (e) => M("attribution", e.target.value)), B("change", u, (e) => M("role", e.target.value)), H(e, t);
			}, s = (e) => {
				var t = Sl(), n = I(t), r = F(n), i = L(r);
				K(i), O(n);
				var a = L(n, 2), o = F(a), s = L(o);
				K(s), O(a);
				var c = L(a, 2), l = F(c), u = L(l);
				K(u), O(c);
				var d = L(c, 2), f = F(d), p = L(f);
				K(p), O(d), R((e, t, n, a, c) => {
					U(r, `${e ?? ""} `), q(i, z(k).props.value ?? ""), J(i, "title", t), U(o, `${n ?? ""} `), q(s, z(k).props.prefix ?? ""), U(l, `${a ?? ""} `), q(u, z(k).props.suffix ?? ""), U(f, `${c ?? ""} `), q(p, z(k).props.label ?? "");
				}, [
					() => Y("lbl.statValue"),
					() => Y("tip.stat.value"),
					() => Y("lbl.statPrefix"),
					() => Y("lbl.statSuffix"),
					() => Y("lbl.statLabel")
				]), B("change", i, (e) => M("value", e.target.value)), B("change", s, (e) => M("prefix", e.target.value)), B("change", u, (e) => M("suffix", e.target.value)), B("change", p, (e) => M("label", e.target.value)), H(e, t);
			}, l = (e) => {
				var t = Cl(), n = I(t), r = F(n), i = F(r, !0);
				O(r);
				var a = L(r, 2), o = F(a, !0);
				O(a), O(n);
				var s = L(n, 2), c = F(s), l = F(c, !0);
				O(c);
				var u = L(c, 2), d = F(u, !0);
				O(u), O(s);
				var f = L(s, 2), p = F(f);
				K(p);
				var m = L(p);
				O(f), R((e, t, n, r, a, s) => {
					U(i, e), U(o, t), U(l, n), U(d, r), J(f, "title", a), bi(p, z(k).props.header !== !1), U(m, ` ${s ?? ""}`);
				}, [
					() => Y("ui.addRow"),
					() => Y("ui.removeRow"),
					() => Y("ui.addColumn"),
					() => Y("ui.removeColumn"),
					() => Y("tip.table.header"),
					() => Y("lbl.tableHeader")
				]), B("click", r, () => Zt(1, 0)), B("click", a, () => Zt(-1, 0)), B("click", c, () => Zt(0, 1)), B("click", u, () => Zt(0, -1)), B("change", p, (e) => M("header", e.target.checked)), H(e, t);
			}, u = (e) => {
				var t = Fr();
				Kr(I(t), 17, () => [
					["facebook", "Facebook"],
					["x", "X"],
					["linkedin", "LinkedIn"],
					["whatsapp", "WhatsApp"],
					["email", Y("opt.share.email")],
					["copy", Y("opt.share.copy")]
				], ([e, t]) => e, (e, t) => {
					var n = /* @__PURE__ */ A(() => h(z(t), 2));
					let r = () => z(n)[0], i = () => z(n)[1];
					var a = wl(), o = F(a);
					K(o);
					var s = L(o);
					O(a), R((e) => {
						bi(o, e), U(s, ` ${i() ?? ""}`);
					}, [() => (z(k).props.services ?? []).includes(r())]), B("change", o, (e) => Qt(r(), e.target.checked)), H(e, a);
				}), H(e, t);
			}, d = (e) => {
				var t = Tl(), n = I(t), r = F(n), i = L(r);
				K(i), O(n);
				var a = L(n, 2), o = F(a), s = L(o);
				K(s), O(a), R((e, t, n) => {
					U(r, `${e ?? ""} `), q(i, z(k).props.target ?? ""), J(a, "title", t), U(o, `${n ?? ""} `), q(s, z(k).props.doneText ?? "");
				}, [
					() => Y("lbl.countdownTarget"),
					() => Y("tip.countdown.done"),
					() => Y("lbl.countdownDone")
				]), B("change", i, (e) => M("target", e.target.value)), B("change", s, (e) => M("doneText", e.target.value)), H(e, t);
			}, f = (e) => {
				var t = Dl(), n = I(t), r = F(n), i = L(r);
				O(n);
				var a = L(n, 2), o = (e) => {
					var t = El(), n = F(t, !0);
					O(t), R((e) => U(n, e), [() => Y("ui.removeAudio")]), B("click", t, () => M("src", "")), H(e, t);
				};
				W(a, (e) => {
					z(k).props.src && e(o);
				});
				var s = L(a, 2), c = F(s), l = L(c);
				K(l), O(s);
				var u = L(s, 2), d = F(u);
				K(d);
				var f = L(d);
				O(u), R((e, t, i, a, o) => {
					J(n, "title", e), U(r, `${t ?? ""} `), U(c, `${i ?? ""} `), q(l, z(k).props.title ?? ""), bi(d, a), U(f, ` ${o ?? ""}`);
				}, [
					() => Y("tip.blocks.audioFile"),
					() => Y("ui.chooseAudio"),
					() => Y("lbl.audioTitle"),
					() => !!z(k).props.loop,
					() => Y("lbl.audioLoop")
				]), B("change", i, $t), B("change", l, (e) => M("title", e.target.value)), B("change", d, (e) => M("loop", e.target.checked)), H(e, t);
			}, p = (e) => {
				var t = kl(), n = I(t), r = F(n), i = L(r);
				K(i), O(n);
				var a = L(n, 2), o = F(a), s = L(o);
				{
					let e = /* @__PURE__ */ A(() => z(k).props.page ?? "__href"), t = /* @__PURE__ */ A(() => [...z(E).pages.map((e) => [e.id, e.title]), ["__href", Y("opt.externalLink")]]);
					X(s, {
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => {
							let t = e === "__href" ? null : e;
							j(`edit:${z(k).blockId}`, (e) => {
								e.props.page = t, t && (e.props.href = null);
							});
						}
					});
				}
				O(a);
				var c = L(a, 2), l = (e) => {
					var t = Ol();
					K(t), R((e) => {
						J(t, "placeholder", e), q(t, z(k).props.href === "#" ? "" : z(k).props.href ?? "");
					}, [() => Y("ph.url")]), B("change", t, (e) => M("href", e.target.value || null)), H(e, t);
				};
				W(c, (e) => {
					z(k).props.page || e(l);
				}), R((e, t) => {
					U(r, `${e ?? ""} `), q(i, z(k).props.label), U(o, `${t ?? ""} `);
				}, [() => Y("blocks.text"), () => Y("lbl.goesTo")]), B("change", i, (e) => M("label", e.target.value)), H(e, t);
			}, m = (e) => {
				var t = Al(), n = I(t), r = F(n), i = L(r);
				O(n);
				var a = L(n, 2), o = F(a), s = L(o);
				K(s), O(a);
				var c = L(a, 2), l = F(c), u = L(l);
				K(u), O(c);
				var d = L(c, 2), f = (e) => {
					var t = wl(), n = F(t);
					K(n);
					var r = L(n);
					O(t), R((e, i, a) => {
						J(t, "title", e), bi(n, i), U(r, ` ${a ?? ""}`);
					}, [
						() => Y("tip.lightbox"),
						() => !!z(k).props.lightbox,
						() => Y("lbl.lightbox")
					]), B("change", n, (e) => M("lightbox", e.target.checked)), H(e, t);
				};
				W(d, (e) => {
					z(k).props.href || e(f);
				}), R((e, t, n, i, a) => {
					U(r, `${e ?? ""} `), U(o, `${t ?? ""} `), q(s, z(k).props.alt ?? ""), J(s, "placeholder", n), U(l, `${i ?? ""} `), q(u, z(k).props.href ?? ""), J(u, "placeholder", a);
				}, [
					() => Y("ui.changeImage"),
					() => Y("lbl.description"),
					() => Y("ph.altText"),
					() => Y("lbl.link"),
					() => Y("ph.optionalImageLink")
				]), B("change", i, tn), B("change", s, (e) => M("alt", e.target.value)), B("change", u, (e) => M("href", e.target.value || null)), H(e, t);
			}, g = (e) => {
				var t = jl(), n = I(t), r = F(n, !0);
				O(n);
				var i = L(n, 2);
				K(i);
				var a = L(i, 2), o = F(a), s = L(o);
				K(s), O(a), R((e, t, a, c) => {
					J(n, "title", e), U(r, t), q(i, z(k).props.url ?? ""), J(i, "placeholder", a), U(o, `${c ?? ""} `), q(s, z(k).props.title ?? "");
				}, [
					() => Y("hint.video"),
					() => Y("lbl.videoUrl"),
					() => Y("ph.videoUrl"),
					() => Y("lbl.videoTitle")
				]), B("change", i, (e) => M("url", e.target.value)), B("change", s, (e) => M("title", e.target.value)), H(e, t);
			}, _ = (e) => {
				var t = Pl(), n = I(t), r = F(n), i = L(r), a = F(i);
				{
					let e = /* @__PURE__ */ A(() => z(k).props.glyph ?? "★"), t = /* @__PURE__ */ A(() => z(k).props.icon ?? null), n = /* @__PURE__ */ A(() => z(k).props.image ?? null);
					Ba(a, {
						get value() {
							return z(e);
						},
						get icon() {
							return z(t);
						},
						get image() {
							return z(n);
						},
						onpick: (e) => j(`edit:${z(k).blockId}`, (t) => {
							t.props.glyph = e, t.props.icon = null, t.props.image = null;
						}),
						onicon: (e) => j(`edit:${z(k).blockId}`, (t) => {
							t.props.icon = e, t.props.image = null;
						}),
						onimage: (e) => M("image", e)
					});
				}
				var o = L(a, 2), s = (e) => {
					var t = Ml();
					K(t), R((e) => {
						q(t, z(k).props.glyph ?? ""), J(t, "title", e);
					}, [() => Y("tip.icon.typeGlyph")]), B("change", t, (e) => M("glyph", e.target.value || "★")), H(e, t);
				}, c = (e) => {
					var t = El(), n = F(t, !0);
					O(t), R((e, r) => {
						J(t, "title", e), U(n, r);
					}, [() => Y("tip.icon.backToGlyph"), () => Y("ui.removeDrawnIcon")]), B("click", t, () => M("icon", null)), H(e, t);
				};
				W(o, (e) => {
					z(k).props.icon ? e(c, -1) : e(s);
				}), O(i), O(n);
				var l = L(n, 2), u = (e) => {
					var t = Nl(), n = F(t), r = L(n, 2), i = F(r, !0);
					O(r), O(t), R((e, r, a) => {
						J(t, "title", e), J(n, "src", z(k).props.image), J(n, "alt", r), U(i, a);
					}, [
						() => Y("hint.icon.ownImage"),
						() => Y("gp.ownIcon"),
						() => Y("ui.removeOwnIcon")
					]), B("click", r, () => M("image", null)), H(e, t);
				};
				W(l, (e) => {
					z(k).props.image && e(u);
				}), R((e) => U(r, `${e ?? ""} `), [() => Y("blocks.icon")]), H(e, t);
			}, v = (e) => {
				var t = Fl(), n = I(t), r = F(n), i = L(r);
				{
					let e = /* @__PURE__ */ A(() => z(k).props.collection ?? ""), t = /* @__PURE__ */ A(() => [["", Y("common.choose")], ...z(lo).map((e) => [e, z(uo)[e]?.name ?? e])]);
					X(i, {
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => M("collection", e || null)
					});
				}
				O(n);
				var a = L(n, 2), o = F(a), s = L(o);
				K(s), O(a);
				var c = L(a, 2), l = F(c);
				K(l);
				var u = L(l);
				O(c), R((e, t, i, c, d) => {
					J(n, "title", e), U(r, `${t ?? ""} `), J(a, "title", i), U(o, `${c ?? ""} `), q(s, z(k).props.limit ?? 6), bi(l, z(k).props.newestFirst !== !1), U(u, ` ${d ?? ""}`);
				}, [
					() => Y("tip.collection.source"),
					() => Y("blocks.collection"),
					() => Y("tip.collection.limit"),
					() => Y("lbl.maxCount"),
					() => Y("lbl.newestFirst")
				]), B("change", s, (e) => M("limit", Number(e.target.value))), B("change", l, (e) => M("newestFirst", e.target.checked)), H(e, t);
			}, y = (e) => {
				var t = Rl(), n = I(t), r = F(n), i = L(r);
				{
					let e = /* @__PURE__ */ A(() => z(k).props.collection ?? ""), t = /* @__PURE__ */ A(() => [["", Y("common.choose")], ...z(lo).filter((e) => z(uo)[e]?.kind === "products").map((e) => [e, z(uo)[e]?.name ?? e])]);
					X(i, {
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => M("collection", e || null)
					});
				}
				O(n);
				var a = L(n, 2), o = (e) => {
					var t = Il(), n = F(t), r = F(n, !0);
					O(n);
					var i = L(n, 2), a = F(i, !0);
					O(i), O(t), R((e, t, o, s) => {
						J(n, "title", e), U(r, t), J(i, "title", o), U(a, s);
					}, [
						() => Y("tip.product.addProduct"),
						() => Y("ui.addProduct"),
						() => Y("tip.product.editCatalog"),
						() => Y("ui.editCatalog")
					]), B("click", n, () => Ho(z(k).props.collection)), B("click", i, () => {
						P(fo, z(k).props.collection, !0), P(ft, "collections");
					}), H(e, t);
				}, s = (e) => {
					var t = Ll(), n = F(t, !0);
					O(t), R((e, r) => {
						J(t, "title", e), U(n, r);
					}, [() => Y("tip.product.createCatalog"), () => Y("ui.createCatalog")]), B("click", t, Bo), H(e, t);
				}, c = /* @__PURE__ */ A(() => !z(lo).some((e) => z(uo)[e]?.kind === "products"));
				W(a, (e) => {
					z(k).props.collection && z(uo)[z(k).props.collection]?.kind === "products" ? e(o) : z(c) && e(s, 1);
				});
				var l = L(a, 2), u = F(l), d = L(u);
				K(d), O(l);
				var f = L(l, 2), p = F(f), m = L(p);
				K(m), O(f), R((e, t, i, a, o, s) => {
					J(n, "title", e), U(r, `${t ?? ""} `), J(l, "title", i), U(u, `${a ?? ""} `), q(d, z(k).props.limit ?? 0), J(f, "title", o), U(p, `${s ?? ""} `), q(m, z(k).props.currency ?? "kr");
				}, [
					() => Y("tip.product.source"),
					() => Y("blocks.collection"),
					() => Y("tip.collection.limit"),
					() => Y("lbl.maxCount"),
					() => Y("tip.product.currency"),
					() => Y("lbl.currency")
				]), B("change", d, (e) => M("limit", Number(e.target.value))), B("change", m, (e) => M("currency", e.target.value)), H(e, t);
			}, b = (e) => {
				var t = zl(), n = I(t), r = F(n), i = L(r);
				{
					let e = /* @__PURE__ */ A(() => z(k).props.href ?? ""), t = /* @__PURE__ */ A(() => [["", Y("common.none")], ...z(E).pages.map((e) => [e.path, e.title])]);
					X(i, {
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => M("href", e)
					});
				}
				O(n);
				var a = L(n, 2), o = F(a), s = L(o);
				K(s), O(a), R((e, t, i, c) => {
					J(n, "title", e), U(r, `${t ?? ""} `), J(a, "title", i), U(o, `${c ?? ""} `), q(s, z(k).props.currency ?? "kr");
				}, [
					() => Y("tip.cart.checkout"),
					() => Y("lbl.checkoutPage"),
					() => Y("tip.product.currency"),
					() => Y("lbl.currency")
				]), B("change", s, (e) => M("currency", e.target.value)), H(e, t);
			}, x = (e) => {
				var t = Bl(), n = I(t), r = F(n), i = L(r);
				K(i), O(n);
				var a = L(n, 2), o = F(a), s = L(o);
				K(s), O(a);
				var c = L(a, 2), l = F(c), u = L(l);
				K(u), O(c);
				var d = L(c, 2), f = F(d);
				K(f);
				var p = L(f);
				O(d);
				var m = L(d, 2), h = F(m), g = L(h);
				K(g), O(m), R((e, t, _, v, y, b, x, S, C, ee) => {
					J(n, "title", e), U(r, `${t ?? ""} `), q(i, z(k).props.recipient ?? ""), J(a, "title", _), U(o, `${v ?? ""} `), q(s, z(k).props.endpoint ?? ""), J(c, "title", y), U(l, `${b ?? ""} `), q(u, z(k).props.vipps ?? ""), J(d, "title", x), bi(f, z(k).props.vippsCheckout === !0), U(p, ` ${S ?? ""}`), J(m, "title", C), U(h, `${ee ?? ""} `), q(g, z(k).props.currency ?? "kr");
				}, [
					() => Y("tip.checkout.recipient"),
					() => Y("lbl.recipientEmail"),
					() => Y("tip.checkout.endpoint"),
					() => Y("lbl.endpointUrl"),
					() => Y("tip.checkout.vipps"),
					() => Y("lbl.vippsNumber"),
					() => Y("tip.checkout.vippsCheckout"),
					() => Y("lbl.vippsCheckout"),
					() => Y("tip.product.currency"),
					() => Y("lbl.currency")
				]), B("change", i, (e) => M("recipient", e.target.value.trim())), B("change", s, (e) => M("endpoint", e.target.value.trim())), B("change", u, (e) => M("vipps", e.target.value.trim())), B("change", f, (e) => M("vippsCheckout", e.target.checked)), B("change", g, (e) => M("currency", e.target.value)), H(e, t);
			}, S = (e) => {
				var t = Hl(), n = I(t), r = F(n), i = L(r);
				O(n), Kr(L(n, 2), 17, () => z(k).props.images ?? [], Hr, (e, t, n) => {
					var r = Vl(), i = F(r), a = F(i), o = L(a, 2), s = F(o);
					s.disabled = n === 0, G(s, () => c.up, !0), O(s);
					var l = L(s, 2);
					G(l, () => c.down, !0), O(l);
					var u = L(l, 2);
					G(u, () => c.cross, !0), O(u), O(o), O(i);
					var d = L(i, 2), f = F(d), p = L(f);
					K(p), O(d);
					var m = L(d, 2), h = F(m), g = L(h);
					K(g), O(m), O(r), R((e, r, o, s, c, d) => {
						J(i, "title", e), J(a, "src", z(t).src), l.disabled = n === z(k).props.images.length - 1, J(u, "title", r), U(f, `${o ?? ""} `), q(p, z(t).alt ?? ""), J(p, "placeholder", s), U(h, `${c ?? ""} `), q(g, z(t).href ?? ""), J(g, "placeholder", d);
					}, [
						() => Y("hint.gallery"),
						() => Y("tip.removeImage"),
						() => Y("lbl.description"),
						() => Y("ph.altShort"),
						() => Y("lbl.link"),
						() => Y("ph.galleryHref")
					]), B("click", s, () => bp(n, -1)), B("click", l, () => bp(n, 1)), B("click", u, () => xp(n)), B("change", p, (e) => Sp(n, "alt", e.target.value)), B("change", g, (e) => Sp(n, "href", e.target.value || null)), H(e, r);
				}), R((e, t) => {
					J(n, "title", e), U(r, `${t ?? ""} `);
				}, [() => Y("tip.gallery.addImages"), () => Y("ui.addImages")]), B("change", i, vp), H(e, t);
			}, C = (e) => {
				var t = pl(), n = F(t);
				X(L(n), {
					get value() {
						return z(k).props.kind;
					},
					get options() {
						return sn;
					},
					onchange: (e) => M("kind", e)
				}), O(t), R((e) => U(n, `${e ?? ""} `), [() => Y("blocks.shape")]), H(e, t);
			}, ee = (e) => {
				let t = /* @__PURE__ */ A(() => z(lp).find((e) => e.type === z(k).type)?.fields ?? []);
				var n = Fr(), r = I(n), i = (e) => {
					var n = Fr();
					Kr(I(n), 17, () => z(t), (e) => e.key, (e, t) => {
						var n = Fr(), r = I(n), i = (e) => {
							let n = /* @__PURE__ */ A(() => `${z(k).blockId}:${z(t).key}`);
							var r = Wl(), i = I(r), a = F(i), o = L(a);
							K(o), O(i);
							var s = L(i, 2), c = F(s, !0);
							O(s);
							var l = L(s, 2), u = (e) => {
								var t = Ul();
								let r;
								var i = F(t, !0);
								O(t), R(() => {
									r = pi(t, 1, "panel-hint svelte-1n46o8q", null, r, { "place-error": Ft[z(n)].err }), U(i, Ft[z(n)].text);
								}), H(e, t);
							};
							W(l, (e) => {
								Ft[z(n)] && e(u);
							}), R((e) => {
								U(a, `${z(t).label ?? ""} `), J(o, "placeholder", z(t).placeholder), q(o, Pt[z(n)] ?? z(k).props[z(t).key] ?? ""), s.disabled = z(It), U(c, e);
							}, [() => Y("props.place.search")]), B("input", o, (e) => {
								Pt[z(n)] = e.target.value;
							}), B("keydown", o, (e) => {
								e.key === "Enter" && zt(z(t));
							}), B("click", s, () => zt(z(t))), H(e, r);
						}, a = (e) => {
							var n = Gl(), r = F(n), i = L(r);
							K(i), O(n), R(() => {
								U(r, `${z(t).label ?? ""} `), J(i, "min", z(t).min), J(i, "max", z(t).max), J(i, "step", z(t).step ?? 1), q(i, z(k).props[z(t).key]);
							}), B("change", i, (e) => M(z(t).key, Rt(z(t), Number(e.target.value)))), H(e, n);
						}, o = (e) => {
							var n = wl(), r = F(n);
							K(r);
							var i = L(r);
							O(n), R((e) => {
								bi(r, e), U(i, ` ${z(t).label ?? ""}`);
							}, [() => !!z(k).props[z(t).key]]), B("change", r, (e) => M(z(t).key, e.target.checked)), H(e, n);
						}, s = (e) => {
							var n = pl(), r = F(n), i = L(r);
							{
								let e = /* @__PURE__ */ A(() => (z(t).options ?? []).map((e) => [e.value, e.label]));
								X(i, {
									get value() {
										return z(k).props[z(t).key];
									},
									get options() {
										return z(e);
									},
									onchange: (e) => M(z(t).key, e)
								});
							}
							O(n), R(() => U(r, `${z(t).label ?? ""} `)), H(e, n);
						}, c = (e) => {
							var n = Kl(), r = F(n), i = L(r);
							K(i), O(n), R(() => {
								U(r, `${z(t).label ?? ""} `), J(i, "placeholder", z(t).placeholder), q(i, z(k).props[z(t).key] ?? "");
							}), B("change", i, (e) => M(z(t).key, e.target.value)), H(e, n);
						};
						W(r, (e) => {
							z(t).type === "place" ? e(i) : z(t).type === "number" ? e(a, 1) : z(t).type === "toggle" ? e(o, 2) : z(t).type === "select" ? e(s, 3) : e(c, -1);
						}), H(e, n);
					}), H(e, n);
				}, a = (e) => {
					var t = El(), n = F(t, !0);
					O(t), R((e, r) => {
						J(t, "title", e), U(n, r);
					}, [() => Y("hint.pluginBlock"), () => Y("ui.settings")]), B("click", t, () => T?.sendOpenConfig(z(k).blockId)), H(e, t);
				};
				W(r, (e) => {
					z(t).length ? e(i) : e(a, -1);
				}), H(e, n);
			};
			W(n, (e) => {
				z(k).type === "text" ? e(r) : z(k).type === "faq" ? e(i, 1) : z(k).type === "timeline" ? e(a, 2) : z(k).type === "quote" ? e(o, 3) : z(k).type === "stats" ? e(s, 4) : z(k).type === "table" ? e(l, 5) : z(k).type === "share" ? e(u, 6) : z(k).type === "countdown" ? e(d, 7) : z(k).type === "audio" ? e(f, 8) : z(k).type === "button" ? e(p, 9) : z(k).type === "image" ? e(m, 10) : z(k).type === "video" ? e(g, 11) : z(k).type === "icon" ? e(_, 12) : z(k).type === "collection" ? e(v, 13) : z(k).type === "product" ? e(y, 14) : z(k).type === "cart" ? e(b, 15) : z(k).type === "checkout" ? e(x, 16) : z(k).type === "gallery" ? e(S, 17) : z(k).type === "shape" ? e(C, 18) : e(ee, -1);
			}), H(e, t);
		}, m = (e) => {
			var t = mu(), n = I(t), r = (e) => {
				var t = ql(), n = I(t), r = F(n), a = L(r);
				{
					let e = /* @__PURE__ */ A(() => z(k).props.align ?? "left"), t = /* @__PURE__ */ A(() => [
						["left", Y("common.left")],
						["center", Y("common.center")],
						["right", Y("common.right")]
					]);
					X(a, {
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => M("align", e)
					});
				}
				O(n);
				var o = L(n, 2), s = F(o);
				K(s);
				var c = L(s);
				O(o);
				var l = L(o, 2), u = (e) => {
					i(e);
				};
				W(l, (e) => {
					z(k).props.box && e(u);
				}), Le(2), R((e, t, n) => {
					U(r, `${e ?? ""} `), bi(s, t), U(c, ` ${n ?? ""}`);
				}, [
					() => Y("lbl.align"),
					() => !!z(k).props.box,
					() => Y("lbl.textBoxToggle")
				]), B("change", s, (e) => M("box", e.target.checked)), H(e, t);
			}, a = (e) => {
				var t = Jl(), n = I(t), r = F(n, !0);
				O(n);
				var a = L(n, 2);
				i(a), Le(2), R((e) => U(r, e), [() => Y("lbl.cardStyle")]), H(e, t);
			}, o = (e) => {
				var t = Yl(), n = I(t), r = F(n), i = L(r);
				{
					let e = /* @__PURE__ */ A(() => z(k).props.variant ?? "left"), t = /* @__PURE__ */ A(() => [["left", Y("opt.timeline.left")], ["alternating", Y("opt.timeline.alternating")]]);
					X(i, {
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => M("variant", e)
					});
				}
				O(n);
				var a = L(n, 2), o = F(a), s = L(o);
				{
					let e = /* @__PURE__ */ A(() => z(k).props.marker ?? "filled"), t = /* @__PURE__ */ A(() => [["filled", Y("opt.timeline.filled")], ["ring", Y("opt.timeline.ring")]]);
					X(s, {
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => M("marker", e)
					});
				}
				O(a);
				var c = L(a, 2), l = F(c), u = L(l);
				{
					let e = /* @__PURE__ */ A(() => z(k).props.accent ?? "accent"), t = /* @__PURE__ */ A(ur);
					sa(u, {
						get value() {
							return z(e);
						},
						get tokens() {
							return z(t);
						},
						onchange: (e) => M("accent", e === "accent" ? null : e)
					});
				}
				O(c), Le(2), R((e, t, n) => {
					U(r, `${e ?? ""} `), U(o, `${t ?? ""} `), U(l, `${n ?? ""} `);
				}, [
					() => Y("lbl.variant"),
					() => Y("lbl.timelineMarker"),
					() => Y("lbl.color")
				]), H(e, t);
			}, s = (e) => {
				var t = Zl(), n = I(t), r = F(n), i = L(r);
				{
					let e = /* @__PURE__ */ A(() => z(k).props.variant ?? "large"), t = /* @__PURE__ */ A(() => [["large", Y("opt.quote.large")], ["short", Y("opt.quote.short")]]);
					X(i, {
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => M("variant", e)
					});
				}
				O(n);
				var a = L(n, 2), o = (e) => {
					var t = Xl(), n = I(t), r = F(n), i = L(r);
					O(n);
					var a = L(n, 2), o = (e) => {
						var t = El(), n = F(t, !0);
						O(t), R((e) => U(n, e), [() => Y("ui.quotePortraitRemove")]), B("click", t, () => M("image", "")), H(e, t);
					};
					W(a, (e) => {
						z(k).props.image && e(o);
					}), R((e) => U(r, `${e ?? ""} `), [() => Y("ui.quotePortrait")]), B("change", i, nn), H(e, t);
				};
				W(a, (e) => {
					z(k).props.variant === "short" && e(o);
				});
				var s = L(a, 2), c = F(s), l = L(c);
				{
					let e = /* @__PURE__ */ A(() => z(k).props.accent ?? "accent"), t = /* @__PURE__ */ A(ur);
					sa(l, {
						get value() {
							return z(e);
						},
						get tokens() {
							return z(t);
						},
						onchange: (e) => M("accent", e === "accent" ? null : e)
					});
				}
				O(s), Le(2), R((e, t) => {
					U(r, `${e ?? ""} `), U(c, `${t ?? ""} `);
				}, [() => Y("lbl.variant"), () => Y("lbl.color")]), H(e, t);
			}, c = (e) => {
				var t = Ql(), n = I(t), r = F(n);
				K(r);
				var i = L(r);
				O(n), Le(2), R((e, t) => {
					J(n, "title", e), bi(r, z(k).props.countUp !== !1), U(i, ` ${t ?? ""}`);
				}, [() => Y("tip.stat.countUp"), () => Y("lbl.statCountUp")]), B("change", r, (e) => M("countUp", e.target.checked)), H(e, t);
			}, l = (e) => {
				var t = $l(), n = I(t), r = F(n), i = L(r);
				{
					let e = /* @__PURE__ */ A(() => z(k).props.lines ?? "rows"), t = /* @__PURE__ */ A(() => [
						["rows", Y("opt.table.rows")],
						["grid", Y("opt.table.grid")],
						["none", Y("common.none")]
					]);
					X(i, {
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => M("lines", e)
					});
				}
				O(n);
				var a = L(n, 2), o = F(a);
				K(o);
				var s = L(o);
				O(a), Le(2), R((e, t, n) => {
					U(r, `${e ?? ""} `), bi(o, t), U(s, ` ${n ?? ""}`);
				}, [
					() => Y("lbl.tableLines"),
					() => !!z(k).props.striped,
					() => Y("lbl.tableStriped")
				]), B("change", o, (e) => M("striped", e.target.checked)), H(e, t);
			}, u = (e) => {
				var t = eu(), n = I(t), r = F(n), i = L(r);
				{
					let e = /* @__PURE__ */ A(() => z(k).props.variant ?? "icons"), t = /* @__PURE__ */ A(() => [["icons", Y("opt.share.icons")], ["labels", Y("opt.share.labels")]]);
					X(i, {
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => M("variant", e)
					});
				}
				O(n);
				var a = L(n, 2), o = F(a), s = L(o);
				K(s), O(a);
				var c = L(a, 2), l = F(c), u = L(l);
				{
					let e = /* @__PURE__ */ A(() => z(k).props.color || "accent"), t = /* @__PURE__ */ A(ur);
					sa(u, {
						get value() {
							return z(e);
						},
						get tokens() {
							return z(t);
						},
						onchange: (e) => M("color", e === "accent" ? "" : e)
					});
				}
				O(c), Le(2), R((e, t, n) => {
					U(r, `${e ?? ""} `), U(o, `${t ?? ""} `), q(s, z(k).props.size ?? 38), U(l, `${n ?? ""} `);
				}, [
					() => Y("lbl.variant"),
					() => Y("lbl.size"),
					() => Y("lbl.color")
				]), B("change", s, (e) => M("size", Number(e.target.value) || 38)), H(e, t);
			}, d = (e) => {
				var t = $l(), n = I(t), r = F(n), i = L(r);
				{
					let e = /* @__PURE__ */ A(() => z(k).props.variant ?? "boxes"), t = /* @__PURE__ */ A(() => [["boxes", Y("opt.countdown.boxes")], ["plain", Y("opt.countdown.plain")]]);
					X(i, {
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => M("variant", e)
					});
				}
				O(n);
				var a = L(n, 2), o = F(a);
				K(o);
				var s = L(o);
				O(a), Le(2), R((e, t) => {
					U(r, `${e ?? ""} `), bi(o, z(k).props.showSeconds !== !1), U(s, ` ${t ?? ""}`);
				}, [() => Y("lbl.variant"), () => Y("lbl.countdownSeconds")]), B("change", o, (e) => M("showSeconds", e.target.checked)), H(e, t);
			}, f = (e) => {
				var t = tu(), n = I(t), r = F(n), i = L(r);
				{
					let e = /* @__PURE__ */ A(() => [["primary", Y("opt.btn.primary")], ["secondary", Y("opt.btn.secondary")]]);
					X(i, {
						get value() {
							return z(k).props.style;
						},
						get options() {
							return z(e);
						},
						onchange: (e) => M("style", e)
					});
				}
				O(n), Le(2), R((e) => U(r, `${e ?? ""} `), [() => Y("lbl.style")]), H(e, t);
			}, p = (e) => {
				var t = nu(), n = I(t), r = F(n), i = L(r);
				{
					let e = /* @__PURE__ */ A(() => z(k).props.fit ?? "cover"), t = /* @__PURE__ */ A(() => [["cover", Y("opt.fitFrame.cover")], ["contain", Y("opt.fitFrame.contain")]]);
					X(i, {
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => M("fit", e)
					});
				}
				O(n);
				var a = L(n, 2), o = F(a), s = L(o);
				{
					let e = /* @__PURE__ */ A(() => z(k).props.radius ?? ""), t = /* @__PURE__ */ A(() => [
						["", Y("common.none")],
						["sm", Y("opt.size.sm")],
						["md", Y("opt.radius.md")]
					]);
					X(s, {
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => M("radius", e || null)
					});
				}
				O(a);
				var c = L(a, 2), l = F(c), u = L(l), d = F(u);
				O(u), O(c);
				var f = L(c, 2);
				K(f);
				var p = L(f, 2), m = F(p), h = L(m), g = F(h);
				O(h), O(p);
				var _ = L(p, 2);
				K(_);
				var v = L(_, 2), y = F(v), b = L(y), x = F(b);
				O(b), O(v);
				var S = L(v, 2);
				K(S);
				var C = L(S, 2), ee = F(C), te = L(ee), ne = F(te);
				O(te), O(C);
				var re = L(C, 2);
				K(re);
				var ie = L(re, 2), ae = F(ie), oe = L(ae), se = F(oe);
				O(oe), O(ie);
				var ce = L(ie, 2);
				K(ce);
				var le = L(ce, 2), ue = F(le), de = L(ue), fe = F(de);
				O(de), O(le);
				var pe = L(le, 2);
				K(pe);
				var me = L(pe, 2), he = F(me, !0);
				O(me), Le(2), R((e, t, n, i, a, s, c, u, p, h, b, C, te, ie, oe, le, de) => {
					U(r, `${e ?? ""} `), U(o, `${t ?? ""} `), U(l, `${n ?? ""} `), U(d, `${i ?? ""}%`), q(f, z(k).props.x ?? .5), U(m, `${a ?? ""} `), U(g, `${s ?? ""}%`), q(_, z(k).props.y ?? .5), J(v, "title", c), U(y, `${u ?? ""} `), U(x, `${p ?? ""}x`), q(S, z(k).props.zoom ?? 1), U(ee, `${h ?? ""} `), U(ne, `${b ?? ""}%`), q(re, z(k).props.brightness ?? 1), U(ae, `${C ?? ""} `), U(se, `${te ?? ""}%`), q(ce, z(k).props.contrast ?? 1), U(ue, `${ie ?? ""} `), U(fe, `${oe ?? ""}%`), q(pe, z(k).props.saturate ?? 1), J(me, "title", le), U(he, de);
				}, [
					() => Y("lbl.fit"),
					() => Y("lbl.radius"),
					() => Y("lbl.focusX"),
					() => Math.round((z(k).props.x ?? .5) * 100),
					() => Y("lbl.focusY"),
					() => Math.round((z(k).props.y ?? .5) * 100),
					() => Y("tip.zoomCrop"),
					() => Y("lbl.zoom"),
					() => (z(k).props.zoom ?? 1).toFixed(2),
					() => Y("lbl.brightness"),
					() => Math.round((z(k).props.brightness ?? 1) * 100),
					() => Y("lbl.contrast"),
					() => Math.round((z(k).props.contrast ?? 1) * 100),
					() => Y("lbl.saturate"),
					() => Math.round((z(k).props.saturate ?? 1) * 100),
					() => Y("tip.resetAdjust"),
					() => Y("ui.resetAdjust")
				]), B("input", f, (e) => M("x", Number(e.target.value))), B("input", _, (e) => M("y", Number(e.target.value))), B("input", S, (e) => M("zoom", Number(e.target.value))), B("input", re, (e) => M("brightness", Number(e.target.value))), B("input", ce, (e) => M("contrast", Number(e.target.value))), B("input", pe, (e) => M("saturate", Number(e.target.value))), B("click", me, () => j(`edit:${z(k).blockId}`, (e) => {
					e.props.brightness = 1, e.props.contrast = 1, e.props.saturate = 1;
				})), H(e, t);
			}, m = (e) => {
				var t = ru(), n = I(t), r = F(n), i = L(r);
				K(i), O(n);
				var a = L(n, 2), o = F(a), s = L(o);
				{
					let e = /* @__PURE__ */ A(() => z(k).props.color ?? "accent"), t = /* @__PURE__ */ A(ur);
					sa(s, {
						get value() {
							return z(e);
						},
						get tokens() {
							return z(t);
						},
						onchange: (e) => M("color", e)
					});
				}
				O(a), Le(2), R((e, t, n) => {
					U(r, `${e ?? ""} `), q(i, z(k).props.size ?? 48), J(a, "title", t), U(o, `${n ?? ""} `);
				}, [
					() => Y("lbl.sizePx"),
					() => Y("hint.icon.color"),
					() => Y("lbl.color")
				]), B("change", i, (e) => M("size", Number(e.target.value))), H(e, t);
			}, h = (e) => {
				var t = tu(), n = I(t), r = F(n), i = L(r);
				{
					let e = /* @__PURE__ */ A(() => z(k).props.view ?? "cards"), t = /* @__PURE__ */ A(() => [
						["cards", Y("opt.collectionView.cards")],
						["list", Y("opt.collectionView.list")],
						["archive", Y("opt.collectionView.archive")]
					]);
					X(i, {
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => M("view", e)
					});
				}
				O(n), Le(2), R((e) => U(r, `${e ?? ""} `), [() => Y("lbl.view")]), H(e, t);
			}, g = (e) => {
				var t = iu(), n = I(t), r = F(n), i = L(r);
				K(i), O(n), Le(2), R((e, t) => {
					J(n, "title", e), U(r, `${t ?? ""} `), q(i, z(k).props.columns ?? 0);
				}, [() => Y("tip.product.columns"), () => Y("lbl.columns")]), B("change", i, (e) => M("columns", Number(e.target.value))), H(e, t);
			}, _ = (e) => {
				var t = tu(), n = I(t), r = F(n), i = L(r);
				{
					let e = /* @__PURE__ */ A(() => z(k).props.variant ?? "button"), t = /* @__PURE__ */ A(() => [["button", Y("opt.cart.button")], ["icon", Y("opt.cart.icon")]]);
					X(i, {
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => M("variant", e)
					});
				}
				O(n), Le(2), R((e) => U(r, `${e ?? ""} `), [() => Y("lbl.view")]), H(e, t);
			}, v = (e) => {
				var t = su(), n = I(t), r = F(n), i = L(r);
				{
					let e = /* @__PURE__ */ A(() => z(k).props.view ?? "grid"), t = /* @__PURE__ */ A(() => [
						["grid", Y("opt.galleryView.grid")],
						["carousel", Y("opt.galleryView.carousel")],
						["slides", Y("opt.galleryView.slides")]
					]);
					X(i, {
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => M("view", e)
					});
				}
				O(n);
				var a = L(n, 2), o = (e) => {
					var t = au(), n = I(t), r = F(n), i = L(r);
					K(i), O(n);
					var a = L(n, 2), o = F(a), s = L(o), c = F(s);
					O(s), O(a);
					var l = L(a, 2);
					K(l), R((e, t) => {
						U(r, `${e ?? ""} `), q(i, z(k).props.columns ?? 3), U(o, `${t ?? ""} `), U(c, `${z(k).props.gap ?? 12 ?? ""} px`), q(l, z(k).props.gap ?? 12);
					}, [() => Y("lbl.columns"), () => Y("lbl.imageGap")]), B("change", i, (e) => M("columns", Number(e.target.value))), B("input", l, (e) => M("gap", Number(e.target.value))), H(e, t);
				};
				W(a, (e) => {
					(z(k).props.view ?? "grid") === "grid" && e(o);
				});
				var s = L(a, 2), c = (e) => {
					var t = ou(), n = F(t), r = L(n);
					K(r), O(t), R((e) => {
						U(n, `${e ?? ""} `), q(r, z(k).props.interval ?? 5);
					}, [() => Y("lbl.secondsPerImage")]), B("change", r, (e) => M("interval", Number(e.target.value))), H(e, t);
				};
				W(s, (e) => {
					z(k).props.view === "slides" && e(c);
				});
				var l = L(s, 2), u = F(l), d = L(u);
				{
					let e = /* @__PURE__ */ A(() => z(k).props.radius ?? ""), t = /* @__PURE__ */ A(() => [
						["", Y("common.none")],
						["sm", Y("opt.size.sm")],
						["md", Y("opt.radius.md")]
					]);
					X(d, {
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => M("radius", e || null)
					});
				}
				O(l);
				var f = L(l, 2), p = F(f);
				K(p);
				var m = L(p);
				O(f), Le(2), R((e, t, n, i) => {
					U(r, `${e ?? ""} `), U(u, `${t ?? ""} `), J(f, "title", n), bi(p, z(k).props.lightbox !== !1), U(m, ` ${i ?? ""}`);
				}, [
					() => Y("lbl.view"),
					() => Y("lbl.radius"),
					() => Y("tip.lightbox"),
					() => Y("lbl.lightbox")
				]), B("change", p, (e) => M("lightbox", e.target.checked)), H(e, t);
			}, y = (e) => {
				var t = cu(), n = I(t), r = F(n);
				X(L(r), {
					get value() {
						return z(k).props.color;
					},
					get options() {
						return cn;
					},
					onchange: (e) => M("color", e)
				}), O(n);
				var i = L(n, 2), a = F(i), o = L(a);
				K(o), O(i);
				var s = L(i, 2), c = F(s);
				K(c);
				var l = L(c);
				O(s), Le(2), R((e, t, n, i, u) => {
					U(r, `${e ?? ""} `), U(a, `${t ?? ""} `), q(o, z(k).props.thickness), J(s, "title", n), bi(c, i), U(l, ` ${u ?? ""}`);
				}, [
					() => Y("lbl.color"),
					() => Y("lbl.thickness"),
					() => Y("tip.shape.fill"),
					() => !!z(k).props.fill,
					() => Y("lbl.filled")
				]), B("change", o, (e) => M("thickness", Number(e.target.value))), B("change", c, (e) => M("fill", e.target.checked ? z(k).props.color : null)), H(e, t);
			};
			W(n, (e) => {
				z(k).type === "text" ? e(r) : z(k).type === "faq" ? e(a, 1) : z(k).type === "timeline" ? e(o, 2) : z(k).type === "quote" ? e(s, 3) : z(k).type === "stats" ? e(c, 4) : z(k).type === "table" ? e(l, 5) : z(k).type === "share" ? e(u, 6) : z(k).type === "countdown" ? e(d, 7) : z(k).type === "button" ? e(f, 8) : z(k).type === "image" ? e(p, 9) : z(k).type === "icon" ? e(m, 10) : z(k).type === "collection" ? e(h, 11) : z(k).type === "product" ? e(g, 12) : z(k).type === "cart" ? e(_, 13) : z(k).type === "gallery" ? e(v, 14) : z(k).type === "shape" && e(y, 15);
			});
			var b = L(n, 2), x = F(b), S = L(x);
			{
				let e = /* @__PURE__ */ A(() => vr(z(k).animation) ? z(k).animation.type : "");
				X(S, {
					get value() {
						return z(e);
					},
					get options() {
						return br;
					},
					onchange: (e) => wr(e || null)
				});
			}
			O(b);
			var C = L(b, 2), ee = (e) => {
				var t = lu(), n = I(t), r = F(n), i = L(r);
				K(i), O(n);
				var a = L(n, 2), o = F(a), s = L(o);
				K(s), O(a), R((e, t) => {
					U(r, `${e ?? ""} `), q(i, z(k).animation.props.duration), U(o, `${t ?? ""} `), q(s, z(k).animation.props.delay);
				}, [() => Y("lbl.durationMs"), () => Y("lbl.delayMs")]), B("change", i, (e) => Dr("duration", Number(e.target.value))), B("change", s, (e) => Dr("delay", Number(e.target.value))), H(e, t);
			}, te = /* @__PURE__ */ A(() => vr(z(k).animation));
			W(C, (e) => {
				z(te) && e(ee);
			});
			var ne = L(C, 2), re = F(ne), ie = L(re);
			{
				let e = /* @__PURE__ */ A(() => z(k).hover?.type ?? (z(k).animation && !vr(z(k).animation) ? z(k).animation.type : ""));
				X(ie, {
					get value() {
						return z(e);
					},
					get options() {
						return xr;
					},
					onchange: (e) => Er(e || null)
				});
			}
			O(ne);
			var ae = L(ne, 2), oe = (e) => {
				var t = fu(), n = L(I(t), 2), r = F(n);
				K(r);
				var i = L(r);
				O(n);
				var a = L(n, 2), o = (e) => {
					var t = du(), n = I(t), r = F(n), i = L(r);
					{
						let e = /* @__PURE__ */ A(() => z(k).sticky.mode ?? "scroll"), t = /* @__PURE__ */ A(() => [["scroll", Y("opt.sticky.modeScroll")], ["screen", Y("opt.sticky.modeScreen")]]);
						X(i, {
							get value() {
								return z(e);
							},
							get options() {
								return z(t);
							},
							onchange: (e) => j(`edit:${z(k).blockId}`, (t) => {
								t.sticky = {
									...t.sticky,
									mode: e
								};
							})
						});
					}
					O(n);
					var a = L(n, 2), o = (e) => {
						var t = uu(), n = F(t), r = L(n);
						K(r), O(t), R((e, i) => {
							J(t, "title", e), U(n, `${i ?? ""} `), q(r, z(k).sticky.offset ?? 16);
						}, [() => z(k).sticky.mode === "screen" ? Y("tip.stickyEdge") : Y("tip.stickyOffset"), () => z(k).sticky.mode === "screen" ? Y("lbl.stickyEdge") : Y("lbl.stickyOffset")]), B("change", r, (e) => j(`edit:${z(k).blockId}`, (t) => {
							t.sticky = {
								...t.sticky,
								offset: Math.max(0, Number(e.target.value) || 0)
							};
						})), H(e, t);
					};
					W(a, (e) => {
						(z(k).sticky.mode !== "screen" || (z(k).sticky.dock ?? "bottom-right") !== "middle-center") && e(o);
					});
					var s = L(a, 2), c = (e) => {
						var t = pl(), n = F(t), r = L(n);
						{
							let e = /* @__PURE__ */ A(() => z(k).sticky.dock ?? "bottom-right"), t = /* @__PURE__ */ A(() => At.map(([e, t]) => [e, Y(t)]));
							X(r, {
								get value() {
									return z(e);
								},
								get options() {
									return z(t);
								},
								onchange: (e) => j(`edit:${z(k).blockId}`, (t) => {
									t.sticky = {
										...t.sticky,
										dock: e
									};
								})
							});
						}
						O(t), R((e, r) => {
							J(t, "title", e), U(n, `${r ?? ""} `);
						}, [() => Y("tip.stickyDock"), () => Y("lbl.stickyDock")]), H(e, t);
					}, l = (e) => {
						var t = pl(), n = F(t), r = L(n);
						{
							let e = /* @__PURE__ */ A(() => z(k).sticky.until ?? ""), t = /* @__PURE__ */ A(jt);
							X(r, {
								get value() {
									return z(e);
								},
								get options() {
									return z(t);
								},
								onchange: (e) => j(`edit:${z(k).blockId}`, (t) => {
									t.sticky = {
										...t.sticky,
										until: e || null
									};
								})
							});
						}
						O(t), R((e, r) => {
							J(t, "title", e), U(n, `${r ?? ""} `);
						}, [() => Y("tip.stickyUntil"), () => Y("lbl.stickyUntil")]), H(e, t);
					};
					W(s, (e) => {
						z(k).sticky.mode === "screen" ? e(c) : e(l, -1);
					}), R((e, t) => {
						J(n, "title", e), U(r, `${t ?? ""} `);
					}, [() => Y("tip.stickyMode"), () => Y("lbl.stickyMode")]), H(e, t);
				};
				W(a, (e) => {
					z(k).sticky && e(o);
				}), R((e, t, a) => {
					J(n, "title", e), bi(r, t), U(i, ` ${a ?? ""}`);
				}, [
					() => Y("tip.sticky"),
					() => !!z(k).sticky,
					() => Y("lbl.sticky")
				]), B("change", r, (e) => j(`edit:${z(k).blockId}`, (t) => {
					t.sticky = e.target.checked ? {
						offset: 16,
						until: null
					} : null;
				})), H(e, t);
			};
			W(ae, (e) => {
				z(ce) === "desktop" && e(oe);
			});
			var se = L(ae, 4), le = F(se), ue = F(le, !0);
			O(le);
			var de = L(le, 2), fe = F(de), pe = (e) => {
				var t = pu(), n = F(t), r = F(n, !0), i = L(r);
				K(i), O(n);
				var a = L(n, 2), o = F(a, !0), s = L(o);
				K(s), O(a);
				var c = L(a, 2), l = F(c, !0), u = L(l);
				K(u), O(c);
				var d = L(c, 2), f = F(d, !0), p = L(f);
				K(p), O(d);
				var m = L(d, 2), h = F(m, !0), g = L(h);
				K(g), O(m);
				var _ = L(m, 2), v = F(_, !0), y = L(v);
				K(y), O(_), O(t), R((e, t, n, a, c, d, _) => {
					U(r, e), q(i, z(k).frame.x), U(o, t), q(s, z(k).frame.y), U(l, n), q(u, z(k).frame.w), U(f, a), q(p, z(k).frame.h), J(m, "title", c), U(h, d), q(g, z(k).frame.z ?? 1), U(v, _), q(y, z(k).frame.rot ?? 0);
				}, [
					() => Y("frame.x"),
					() => Y("frame.y"),
					() => Y("frame.w"),
					() => Y("frame.h"),
					() => Y("tip.frameZ"),
					() => Y("frame.z"),
					() => Y("frame.rot")
				]), B("change", i, (e) => Bt("x", Number(e.target.value))), B("change", s, (e) => Bt("y", Number(e.target.value))), B("change", u, (e) => Bt("w", Number(e.target.value))), B("change", p, (e) => Bt("h", Number(e.target.value))), B("change", g, (e) => Bt("z", Number(e.target.value))), B("change", y, (e) => Bt("rot", Number(e.target.value))), H(e, t);
			};
			W(fe, (e) => {
				z(ce) === "desktop" && e(pe);
			});
			var me = L(fe, 2), he = F(me);
			K(he);
			var ge = L(he);
			O(me);
			var _e = L(me, 2), ve = F(_e);
			K(ve);
			var ye = L(ve);
			O(_e), O(de), O(se), R((e, t, n, r, i, a, o, s, c, l) => {
				J(b, "title", e), U(x, `${t ?? ""} `), J(ne, "title", n), U(re, `${r ?? ""} `), J(le, "title", i), U(ue, a), J(me, "title", o), bi(he, z(k).hideMobile), U(ge, ` ${s ?? ""}`), J(_e, "title", c), bi(ve, z(k).decor), U(ye, ` ${l ?? ""}`);
			}, [
				() => Y("tip.props.blockAnim"),
				() => Y("lbl.animIn"),
				() => Y("tip.props.blockHover"),
				() => Y("lbl.onHover"),
				() => Y("hint.placement"),
				() => Y("group.placement"),
				() => Y("tip.hideMobile"),
				() => Y("lbl.hideMobile"),
				() => Y("tip.decor"),
				() => Y("lbl.decor")
			]), B("change", he, (e) => en(e.target.checked)), B("change", ve, (e) => Xt(e.target.checked)), H(e, t);
		};
		W(f, (e) => {
			z(Lt) === "content" ? e(p) : e(m, -1);
		}), R((e, t) => {
			o = pi(a, 1, "svelte-1n46o8q", null, o, { on: z(Lt) === "content" }), U(s, e), u = pi(l, 1, "svelte-1n46o8q", null, u, { on: z(Lt) === "style" }), U(d, t);
		}, [() => Y("props.tabContent"), () => Y("props.tabStyle")]), B("click", a, () => P(Lt, "content")), B("click", l, () => P(Lt, "style")), H(e, t);
	}, o = [
		["color", Ws],
		["gradient", nc],
		["glow", rc],
		["image", kc],
		["slideshow", Pc],
		["video", Bc],
		["grain", ac]
	], s = Object.fromEntries(o), c = {
		copy: "<svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"9\" y=\"9\" width=\"11\" height=\"11\" rx=\"2\"/><path d=\"M5 15V5a2 2 0 0 1 2-2h10\"/></svg>",
		phone: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"><rect x=\"8\" y=\"3\" width=\"8\" height=\"18\" rx=\"2\"/><path d=\"M11 17.5h2\"/></svg>",
		pencil: "<svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M17 3l4 4L8 20l-5 1 1-5L17 3z\"/></svg>",
		eye: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z\"/><circle cx=\"12\" cy=\"12\" r=\"2.6\"/></svg>",
		warn: "<svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 3L2 20h20L12 3z\"/><path d=\"M12 10v4\"/><path d=\"M12 17.2h.01\"/></svg>",
		up: "<svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 20V4\"/><path d=\"M5 11l7-7 7 7\"/></svg>",
		down: "<svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 4v16\"/><path d=\"M5 13l7 7 7-7\"/></svg>",
		right: "<svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M4 12h16\"/><path d=\"M13 5l7 7-7 7\"/></svg>",
		cross: "<svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.4\" stroke-linecap=\"round\"><path d=\"M5 5l14 14\"/><path d=\"M19 5L5 19\"/></svg>",
		plus: "<svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.4\" stroke-linecap=\"round\"><path d=\"M12 5v14\"/><path d=\"M5 12h14\"/></svg>",
		minus: "<svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.4\" stroke-linecap=\"round\"><path d=\"M5 12h14\"/></svg>",
		gear: "<svg width=\"15\" height=\"15\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"3\"/><path d=\"M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.09a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.09a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z\"/></svg>",
		guides: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 2v20M2 12h20\" stroke-dasharray=\"3 3\"/><rect x=\"7.5\" y=\"7.5\" width=\"9\" height=\"9\" rx=\"1.5\"/></svg>",
		kebab: "<svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"currentColor\" stroke=\"none\"><circle cx=\"12\" cy=\"5\" r=\"1.8\"/><circle cx=\"12\" cy=\"12\" r=\"1.8\"/><circle cx=\"12\" cy=\"19\" r=\"1.8\"/></svg>",
		bookmark: "<svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z\"/><path d=\"M12 7v6M9 10h6\"/></svg>",
		fit: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M4 9V5a1 1 0 0 1 1-1h4M20 9V5a1 1 0 0 0-1-1h-4M4 15v4a1 1 0 0 0 1 1h4M20 15v4a1 1 0 0 1-1 1h-4\"/></svg>",
		gridToggle: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\"/><path d=\"M9 3v18M15 3v18M3 9h18M3 15h18\"/></svg>",
		restore: "<svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M3 4v5h5\"/><path d=\"M3.05 13A9 9 0 1 0 6 5.3L3 9\"/><path d=\"M12 8v4.5l3 1.8\"/></svg>",
		caret: "<svg width=\"9\" height=\"9\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M6 9l6 6 6-6\"/></svg>",
		external: "<svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M14 4h6v6\"/><path d=\"M20 4l-8 8\"/><path d=\"M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5\"/></svg>",
		device_desktop: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"2\" y=\"3\" width=\"20\" height=\"13\" rx=\"2\"/><path d=\"M8 21h8M12 16v5\"/></svg>",
		device_laptop: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"4\" y=\"4\" width=\"16\" height=\"11\" rx=\"1.5\"/><path d=\"M2 19h20\"/></svg>",
		device_tablet: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"5\" y=\"2\" width=\"14\" height=\"20\" rx=\"2\"/><path d=\"M11 18.5h2\"/></svg>",
		device_mobile: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"7\" y=\"2\" width=\"10\" height=\"20\" rx=\"2\"/><path d=\"M11 18.5h2\"/></svg>"
	}, l = [
		["purple", Y("adminTheme.purple")],
		["well", Y("adminTheme.well")],
		["gold", Y("adminTheme.gold")],
		["grey", Y("adminTheme.grey")],
		["aurora", Y("adminTheme.aurora")],
		["dusk", Y("adminTheme.dusk")],
		["ember", Y("adminTheme.ember")]
	], u = {
		lilla: "purple",
		bronn: "well",
		gull: "gold",
		graa: "grey",
		nordlys: "aurora",
		skumring: "dusk",
		glo: "ember"
	}, d = /* @__PURE__ */ N(an((() => {
		let e = localStorage.getItem("urd-admin-theme");
		return u[e] ?? e ?? "grey";
	})()));
	Cn(() => {
		document.documentElement.dataset.adminTheme = z(d), localStorage.setItem("urd-admin-theme", z(d)), p();
	});
	function p() {
		let e = getComputedStyle(document.documentElement), t = e.getPropertyValue("--urd-color-accent").trim();
		T?.sendAdminTheme({
			bg: e.getPropertyValue("--urd-color-bg").trim(),
			surface: e.getPropertyValue("--urd-color-surface").trim(),
			accent: t,
			text: e.getPropertyValue("--urd-color-text").trim(),
			"accent-text": m(t)
		});
	}
	function m(e) {
		return Hs(e) == null || (Us(e, "#ffffff") ?? 0) >= (Us(e, "#0b0e14") ?? 0) ? "#ffffff" : "#0b0e14";
	}
	let g = /* @__PURE__ */ N(null), _ = /* @__PURE__ */ N(null), v = /* @__PURE__ */ N(!1), y = /* @__PURE__ */ N(""), b = /* @__PURE__ */ N("info"), x = 0;
	function S(e, t = "info") {
		P(y, e, !0), P(b, t, !0);
		let n = ++x;
		t === "ok" && setTimeout(() => {
			x === n && (P(y, ""), P(b, "info"));
		}, 8e3);
	}
	function C() {
		S(Y("status.storageFull"), "error");
	}
	function ee(e, t) {
		try {
			localStorage.setItem(e, t);
		} catch {
			C();
		}
	}
	let te = /* @__PURE__ */ N(null), ne = /* @__PURE__ */ N(null), re = /* @__PURE__ */ N(an({
		size: 16,
		snap: !0
	})), ie = /* @__PURE__ */ N(!0), ae = [
		{
			id: "desktop",
			width: null,
			viewport: "desktop"
		},
		{
			id: "laptop",
			width: 1280,
			viewport: "desktop"
		},
		{
			id: "tablet",
			width: 810,
			viewport: "desktop"
		},
		{
			id: "mobile",
			width: 390,
			viewport: "mobile"
		}
	], oe = /* @__PURE__ */ N("desktop"), se = /* @__PURE__ */ A(() => ae.find((e) => e.id === z(oe)) ?? ae[0]), ce = /* @__PURE__ */ A(() => z(se).viewport), le = /* @__PURE__ */ N(null), ue = /* @__PURE__ */ N(0), de = /* @__PURE__ */ N(0), fe = /* @__PURE__ */ N(an(typeof window < "u" ? window.innerWidth : 1280)), pe = /* @__PURE__ */ N("fit"), me = /* @__PURE__ */ N(1), he = /* @__PURE__ */ A(() => z(pa) === "full" ? z(fe) : 1920), ge = /* @__PURE__ */ A(() => Xa(z(pa), z(ma))), _e = /* @__PURE__ */ A(() => z(se).width ?? z(he)), ve = /* @__PURE__ */ A(() => z(pe) === "manual" ? z(me) : Ua(z(ue), z(_e), "fit"));
	function ye(e) {
		let t = Math.min(400, Math.max(10, (Math.round(Math.round(z(ve) * 100) / 10) + e) * 10));
		P(me, t / 100), P(pe, "manual");
	}
	let be = /* @__PURE__ */ A(() => z(ve) > 0 ? z(de) / z(ve) : z(de)), xe = /* @__PURE__ */ A(() => z(_e) * z(ve)), Se = /* @__PURE__ */ A(() => z(de)), Ce = /* @__PURE__ */ A(() => z(xe) > z(ue) + 1 || z(Se) > z(de) + 1);
	Cn(() => {
		let e = () => T?.sendCloseMenus();
		return document.addEventListener("pointerdown", e, !0), () => document.removeEventListener("pointerdown", e, !0);
	}), Cn(() => {
		let e = z(ce);
		T?.sendViewport(e);
	}), Cn(() => {
		let e = z(ve);
		T?.sendZoom(e);
	}), Cn(() => {
		let e = () => {
			P(fe, window.innerWidth, !0);
		};
		return window.addEventListener("resize", e), () => window.removeEventListener("resize", e);
	}), Cn(() => {
		let e = z(le);
		if (!e || typeof ResizeObserver > "u") return;
		let t = () => {
			P(ue, e.clientWidth, !0), P(de, e.clientHeight, !0);
		};
		t();
		let n = new ResizeObserver(t);
		return n.observe(e), () => n.disconnect();
	});
	let we = /* @__PURE__ */ N(0);
	function Te() {
		P(we, w?.data.sections.filter((e) => e.responsive?.mobile?.attention?.needed).length ?? 0, !0);
	}
	function Ee() {
		let e = w?.data.sections.find((e) => e.responsive?.mobile?.attention?.needed);
		P(oe, "mobile"), e && setTimeout(() => T?.sendScrollSection(e.id), 0);
	}
	function De(e) {
		let t = w.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			Be("layout");
			for (let n of e.frames ?? []) {
				let e = t.blocks.find((e) => e.id === n.blockId);
				e && (e.frames.desktop = {
					...e.frames.desktop,
					...n.frame
				});
			}
			t.size = {
				...t.size,
				minHeight: e.minHeight
			}, ke(t, "layout-changed"), e.sectionId === z(ln) && P(dn, e.minHeight, !0), z(k)?.sectionId === e.sectionId && Et(), w.save(), D(), T?.sendSection(z(_), t);
		}
	}
	function Oe(e) {
		return e?.blocks?.some((e) => e.frames?.mobile) ?? !1;
	}
	function ke(e, t) {
		!e || !Oe(e) || e.responsive?.mobile?.attention?.needed || (e.responsive = {
			...e.responsive ?? {},
			mobile: {
				...e.responsive?.mobile ?? { mode: "auto" },
				attention: {
					needed: !0,
					reason: t,
					since: (/* @__PURE__ */ new Date()).toISOString()
				}
			}
		}, Te(), T?.sendAttention(e.id, !0));
	}
	let w = null, Ae = null, T = null, E = /* @__PURE__ */ N(null);
	function je() {
		P(E, Ae.data, !0), Ae.replace(z(E));
	}
	function Me() {
		T?.sendSite(We(z(E)));
	}
	let Ne = /* @__PURE__ */ new Set(), Pe = () => z(E).pages.find((e) => e.id === z(_));
	function D() {
		let e = z(E)?.pages?.some((e) => !Ne.has(e.id) && localStorage.getItem(`urd-draft-${e.id}`) !== null) ?? !1, t = ao?.hasDraft() || Object.values(oo).some((e) => e.hasDraft()), n = vo?.hasDraft() || Object.values(bo).some((e) => e.hasDraft());
		P(v, e || w?.hasDraft() && !Ne.has(z(_)) || Ae?.hasDraft() || ls?.hasDraft() || t || n || !1, !0);
	}
	let Fe = [], Ie = [], Re = null;
	function ze() {
		return JSON.stringify({
			pageId: z(_),
			page: w.data,
			site: Ae.data,
			collectionsIndex: co ? ao.data : null,
			collections: co ? Object.fromEntries(Object.entries(oo).map(([e, t]) => [e, t.data])) : {},
			templatesIndex: Z ? vo.data : null,
			templates: Z ? Object.fromEntries(Object.entries(bo).map(([e, t]) => [e, t.data])) : {},
			plugins: ls?.data ?? null
		});
	}
	function Be(e) {
		e === Re && (e.startsWith("edit:") || e.startsWith("grid:")) || (Fe.push(ze()), Fe.length > 50 && Fe.shift(), Ie.length = 0, Re = e);
	}
	function Ve(e) {
		let { pageId: t, page: n, site: r, collectionsIndex: i, collections: a, templatesIndex: o, templates: s, plugins: c } = JSON.parse(e);
		if (Ae.replace(r), je(), Ae.save(), P(re, {
			snap: !0,
			...z(E).grid
		}, !0), Me(), He(i, a ?? {}), Ue(o, s ?? {}), Ge(c), t && t !== z(_) && z(E).pages.some((e) => e.id === t)) {
			ee(`urd-draft-${t}`, JSON.stringify(n)), ci(t, { keepHistory: !0 }), D();
			return;
		}
		w.replace(n), w.save(), D(), Te(), Et(), gn(w.data.sections.find((e) => e.id === z(ln))), z(E).pages.some((e) => e.id === z(_)) ? T?.sendPage(z(_), w.data) : ci(z(E).pages[0].id, { keepHistory: !0 });
	}
	function He(e, t) {
		if (!(!ao || !e) && JSON.stringify({
			index: ao.data,
			collections: Object.fromEntries(Object.entries(oo).map(([e, t]) => [e, t.data]))
		}) !== JSON.stringify({
			index: e,
			collections: t
		})) {
			ao.replace(e), ao.save();
			for (let e of Object.keys(oo)) e in t || (localStorage.removeItem(`urd-draft-collection-${e}`), localStorage.removeItem(`urd-draft-samling-${e}`), delete oo[e]);
			for (let [e, n] of Object.entries(t)) {
				if (!oo[e]) {
					let t = so[e] ?? null;
					oo[e] = Yi(`urd-draft-collection-${e}`, () => t, C, `urd-draft-samling-${e}`);
				}
				oo[e].replace(n), oo[e].save();
			}
			P(lo, [...e.samlinger ?? []], !0), z(fo) && !z(lo).includes(z(fo)) && P(fo, null), Mo();
		}
	}
	function Ue(e, t) {
		if (!(!vo || !e) && JSON.stringify({
			index: vo.data,
			templates: Object.fromEntries(Object.entries(bo).map(([e, t]) => [e, t.data]))
		}) !== JSON.stringify({
			index: e,
			templates: t
		})) {
			vo.replace(e), vo.save();
			for (let e of Object.keys(bo)) e in t || (localStorage.removeItem(`urd-draft-template-${e}`), localStorage.removeItem(`urd-draft-mal-${e}`), delete bo[e]);
			for (let [e, n] of Object.entries(t)) bo[e] || (bo[e] = Yi(`urd-draft-template-${e}`, () => Co[e] ?? null, C, `urd-draft-mal-${e}`)), bo[e].replace(n), bo[e].save();
			P(Q, [...e.maler ?? []], !0), D(), To();
		}
	}
	function Ge(e) {
		!ls || !e || JSON.stringify(ls.data) !== JSON.stringify(e) && (ls.replace(e), ls.save(), bs(), Fs());
	}
	function Ke() {
		Fe.length && (Ie.push(ze()), Ve(Fe.pop()), Re = null, S(Y("status.undone")));
	}
	function qe() {
		Ie.length && (Fe.push(ze()), Ve(Ie.pop()), Re = null, S(Y("status.redone")));
	}
	function Xe(e) {
		z(Ot) && (e.target instanceof Element && e.target.closest(".block-menu") || P(Ot, null));
	}
	function Ze(e) {
		if (e.key === "Escape" && z(Ot)) {
			P(Ot, null);
			return;
		}
		if (!(e.ctrlKey || e.metaKey)) return;
		let t = e.key.toLowerCase();
		if (t === "d") {
			let t = e.target;
			if (t instanceof HTMLElement && (t.isContentEditable || t.tagName === "TEXTAREA" || t.tagName === "INPUT" && ![
				"number",
				"checkbox",
				"range",
				"color"
			].includes(t.type)) || !z(k) || z(ce) === "mobile") return;
			e.preventDefault(), T?.sendDuplicate();
			return;
		}
		if (t !== "z" && t !== "y") return;
		let n = e.target;
		n instanceof HTMLElement && (n.isContentEditable || n.tagName === "TEXTAREA" || n.tagName === "INPUT" && ![
			"number",
			"checkbox",
			"range",
			"color"
		].includes(n.type)) || (e.preventDefault(), t === "y" || e.shiftKey ? qe() : Ke());
	}
	async function Qe() {
		P(g, ho(await (await fetch("/content/site.json")).json()), !0), Ae = Yi("urd-draft-site", () => z(g), C), (Ae.data.schemaVersion ?? 1) > 3 && (console.warn(`Urd: the site draft has schemaVersion ${Ae.data.schemaVersion} (the engine has 3) and is discarded`), Ae.replace(We(z(g)))), Ae.replace(ho(Ae.data)), Ae.save(), je(), P(re, {
			snap: !0,
			...z(E).grid
		}, !0), await ci(new URLSearchParams(location.search).get("page") ?? z(E).pages[0].id), await ws(), await jo(), await wo(), await Lr(), z(ne) && zr(), z(E).site.setup === !0 && !localStorage.getItem("urd-setup-done") && (P(at, z(E).site.title, !0), P(ot, z(E).theme.tokens.color.accent, !0), P(st, z(E).theme.tokens.color.bg, !0), P(it, !0));
	}
	let $e = /* @__PURE__ */ N(null);
	function et({ title: e, lines: t = [], okLabel: n = Y("confirm.ok"), cancelLabel: r = Y("confirm.cancel") }) {
		return new Promise((i) => {
			P($e, {
				title: e,
				lines: t,
				okLabel: n,
				cancelLabel: r,
				resolve: i
			}, !0);
		});
	}
	function tt({ title: e, lines: t = [], value: n = "", placeholder: r = "", okLabel: i = Y("confirm.ok"), cancelLabel: a = Y("confirm.cancel") }) {
		return new Promise((o) => {
			P($e, {
				title: e,
				lines: t,
				okLabel: i,
				cancelLabel: a,
				resolve: o,
				prompt: !0,
				value: n,
				placeholder: r
			}, !0);
		});
	}
	function nt(e) {
		z($e)?.resolve(z($e).prompt ? e ? z($e).value : null : e), P($e, null);
	}
	let rt = !1;
	Cn(() => {
		if (!z($e)) return;
		let e = (e) => {
			e.key === "Escape" && (e.stopPropagation(), nt(!1));
		};
		return document.addEventListener("keydown", e, !0), () => document.removeEventListener("keydown", e, !0);
	});
	let it = /* @__PURE__ */ N(!1), at = /* @__PURE__ */ N(""), ot = /* @__PURE__ */ N("#7c5cff"), st = /* @__PURE__ */ N("#0b0e14");
	function ct() {
		localStorage.setItem("urd-setup-done", "1"), P(it, !1);
	}
	function lt() {
		let e = z(at).trim();
		e && (ki("setup", () => {
			z(E).site.title = e, z(E).nav.logo = {
				type: "text",
				value: e
			}, z(E).theme.tokens.color.accent = z(ot), z(E).theme.tokens.color.bg = z(st), delete z(E).site.setup;
		}), ct(), S(Y("status.setupDone"), "ok"));
	}
	let ft = /* @__PURE__ */ N(null), pt = [
		[
			"pages",
			"blocks",
			"properties",
			"grid"
		],
		[
			"site",
			"theme",
			"nav",
			"footer",
			"collections",
			"plugins"
		],
		["history", "update"]
	], mt = [
		"rail.thisPage",
		"rail.site",
		"rail.system"
	], ht = Object.fromEntries(pt.flat().map((e) => [e, Y(`panel.${e}`)])), gt = {
		pages: ["hint.pages.drafts"],
		blocks: ["hint.blocks.intro"],
		grid: ["hint.grid.intro", "hint.grid.section"],
		collections: ["hint.collections.intro"],
		plugins: ["hint.plugins.intro"],
		history: ["hint.history.intro"]
	}, _t = [
		["se", "Davvisámegiella"],
		["en-GB", "English (UK)"],
		["nb", "Norsk bokmål"],
		["nn", "Norsk nynorsk"],
		["tr", "Türkçe"]
	], vt = (e) => [...e].sort((e, t) => e[1].localeCompare(t[1]));
	function yt(e, t) {
		let n = [];
		for (let r of e) for (let e of ps[r]?.languages ?? []) e?.[t] === !0 && (typeof e.code != "string" || typeof e.name != "string" || !e.name || _t.some(([t]) => t === e.code) || n.some(([t]) => t === e.code) || n.push([e.code, e.name]));
		return n;
	}
	function bt() {
		let e = vt([..._t, ...yt(z(_s), "admin")]);
		return St === "auto" || e.some(([e]) => e === St) ? e : [[St, St], ...e];
	}
	let xt = () => yt(z(fs)?.enabled ?? [], "site"), St = localStorage.getItem("urd-admin-lang") ?? "auto";
	function Ct(e) {
		e !== St && (e === "auto" ? localStorage.removeItem("urd-admin-lang") : localStorage.setItem("urd-admin-lang", e), location.reload());
	}
	function wt(e) {
		P(ft, z(ft) === e ? null : e, !0), z(ft) === "history" && Gr(), z(ft) === "update" && !z($r) && ti();
	}
	let k = /* @__PURE__ */ N(null);
	function Tt(e, t) {
		let n = w?.data.sections.find((t) => t.id === e);
		return {
			section: n,
			block: n?.blocks.find((e) => e.id === t)
		};
	}
	function Et() {
		if (!z(k)) return;
		let { block: e } = Tt(z(k).sectionId, z(k).blockId);
		if (!e) {
			P(k, null);
			return;
		}
		P(k, {
			sectionId: z(k).sectionId,
			blockId: z(k).blockId,
			type: e.type,
			decor: !!e.decor,
			hideMobile: !!e.hideMobile,
			props: JSON.parse(JSON.stringify(e.props)),
			frame: { ...e.frames.desktop },
			animation: e.animation ? JSON.parse(JSON.stringify(e.animation)) : null,
			hover: e.hover ? JSON.parse(JSON.stringify(e.hover)) : null,
			sticky: e.sticky ? JSON.parse(JSON.stringify(e.sticky)) : null
		}, !0);
	}
	function Dt(e) {
		if (P(Ot, null), !e.blockId) {
			P(k, null);
			return;
		}
		P(k, {
			sectionId: e.sectionId,
			blockId: e.blockId
		}, !0), e.sectionId && P(ln, e.sectionId, !0), Et();
	}
	let Ot = /* @__PURE__ */ N(null), kt = window.matchMedia("(prefers-reduced-motion: reduce)").matches, At = [
		["top-left", "opt.dock.topLeft"],
		["top-center", "opt.dock.topCenter"],
		["top-right", "opt.dock.topRight"],
		["middle-left", "opt.dock.middleLeft"],
		["middle-center", "opt.dock.middleCenter"],
		["middle-right", "opt.dock.middleRight"],
		["bottom-left", "opt.dock.bottomLeft"],
		["bottom-center", "opt.dock.bottomCenter"],
		["bottom-right", "opt.dock.bottomRight"]
	];
	function jt() {
		let e = w?.data.sections ?? [], t = e.findIndex((e) => e.id === z(k)?.sectionId);
		return [["", Y("opt.sticky.ownSection")], ...e.slice(t + 1).map((e, n) => [e.id, Y("opt.sticky.atSection", { n: t + 2 + n })])];
	}
	function Mt(e) {
		if (Dt(e), !z(k)) return;
		let t = z(te)?.getBoundingClientRect();
		if (!t) return;
		let n = t.left + z(ve) * e.rect.right + 12;
		n + 300 > window.innerWidth - 8 && (n = Math.max(8, t.left + z(ve) * e.rect.left - 300 - 12));
		let r = window.innerHeight - Math.min(window.innerHeight * .7, 560) - 8, i = Math.min(Math.max(8, t.top + z(ve) * e.rect.top), Math.max(8, r));
		P(Ot, {
			left: n,
			top: i
		}, !0);
	}
	function j(e, t) {
		let { section: n, block: r } = Tt(z(k)?.sectionId, z(k)?.blockId);
		r && (e && Be(e), t(r, n), ke(n, "block-edited"), w.save(), D(), T?.sendSection(z(_), n), Et());
	}
	function M(e, t) {
		j(`edit:${z(k).blockId}:${e}`, (n) => {
			n.props[e] = t;
		});
	}
	function Nt(e, t) {
		j(`edit:${z(k).blockId}:${e}`, (e) => {
			Object.assign(e.props, t);
		});
	}
	let Pt = an({}), Ft = an({}), It = /* @__PURE__ */ N(!1), Lt = /* @__PURE__ */ N("content"), Rt = (e, t) => (Number.isFinite(t) || (t = e.min ?? 0), e.min != null && (t = Math.max(e.min, t)), e.max != null && (t = Math.min(e.max, t)), t);
	async function zt(e) {
		let t = z(k).blockId, n = `${t}:${e.key}`, r = (Pt[n] ?? z(k).props[e.key] ?? "").trim();
		Ft[n] = null;
		let i = r.match(/^(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)$/);
		if (!r || i || /^https?:\/\//i.test(r)) {
			Nt(e.key, {
				[e.key]: r,
				lat: i ? Number(i[1]) : null,
				lon: i ? Number(i[2]) : null
			});
			return;
		}
		P(It, !0), Ft[n] = {
			text: Y("props.place.searching"),
			err: !1
		};
		try {
			let i = await fetch(`/api/geocode?q=${encodeURIComponent(r)}`), a = await i.json().catch(() => null);
			if (z(k)?.blockId !== t) return;
			i.ok && Number.isFinite(a?.lat) ? (Nt(e.key, {
				[e.key]: r,
				lat: a.lat,
				lon: a.lon
			}), Ft[n] = null) : Ft[n] = {
				text: Vi(a) ?? Y("props.place.notFound"),
				err: !0
			};
		} catch {
			Ft[n] = {
				text: Y("props.place.failed"),
				err: !0
			};
		} finally {
			P(It, !1);
		}
	}
	function Bt(e, t) {
		Number.isFinite(t) && j(`edit:frame-${z(k).blockId}:${e}`, (n) => {
			n.frames.desktop = {
				...n.frames.desktop,
				[e]: t
			};
		});
	}
	function Vt(e) {
		j(`edit:${z(k).blockId}:boxStyle`, (t) => {
			let n = {
				...t.props.boxStyle ?? {},
				...e
			};
			for (let e of Object.keys(n)) n[e] ?? delete n[e];
			Object.keys(n).length ? t.props.boxStyle = n : delete t.props.boxStyle;
		});
	}
	function Ht(e, t) {
		j(`edit:${z(k).blockId}:faq${e}`, (n) => {
			n.props.items[e] = {
				...n.props.items[e],
				...t
			};
		});
	}
	function Ut() {
		j("faq-item", (e) => {
			(e.props.items ??= []).push({
				q: Y("seed.faq.newQ"),
				a: Y("seed.faq.answer")
			});
		});
	}
	function Wt(e) {
		j("faq-item", (t) => {
			t.props.items.splice(e, 1);
		});
	}
	function Gt(e, t) {
		let n = e + t;
		j("faq-item", (t) => {
			n < 0 || n >= t.props.items.length || ([t.props.items[e], t.props.items[n]] = [t.props.items[n], t.props.items[e]]);
		});
	}
	function Kt(e, t) {
		j(`edit:${z(k).blockId}:tl${e}`, (n) => {
			n.props.items[e] = {
				...n.props.items[e],
				...t
			};
		});
	}
	function qt() {
		j("tl-item", (e) => {
			(e.props.items ??= []).push({
				year: "",
				title: Y("seed.timeline.newTitle"),
				text: ""
			});
		});
	}
	function Jt(e) {
		j("tl-item", (t) => {
			t.props.items.splice(e, 1);
		});
	}
	function Yt(e, t) {
		let n = e + t;
		j("tl-item", (t) => {
			n < 0 || n >= t.props.items.length || ([t.props.items[e], t.props.items[n]] = [t.props.items[n], t.props.items[e]]);
		});
	}
	function Xt(e) {
		j("decor", (t) => {
			t.decor = e;
		});
	}
	function Zt(e, t) {
		j(`edit:${z(k).blockId}:table-form`, (n) => {
			let r = (Array.isArray(n.props.rows) && n.props.rows.length ? n.props.rows : [[""]]).map((e) => Array.isArray(e) ? e.map((e) => String(e ?? "")) : [""]), i = Math.max(1, ...r.map((e) => e.length));
			r = r.map((e) => [...e, ...Array(i - e.length).fill("")]), e > 0 ? r.push(Array(i).fill("")) : e < 0 && r.length > 1 && r.pop(), t > 0 ? r = r.map((e) => [...e, ""]) : t < 0 && i > 1 && (r = r.map((e) => e.slice(0, i - 1))), n.props.rows = r;
		});
	}
	function Qt(e, t) {
		j(`edit:${z(k).blockId}:share`, (n) => {
			let r = [
				"facebook",
				"x",
				"linkedin",
				"whatsapp",
				"email",
				"copy"
			], i = new Set(n.props.services ?? []);
			t ? i.add(e) : i.delete(e), n.props.services = r.filter((e) => i.has(e));
		});
	}
	function $t(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		let n = new FileReader();
		n.onload = () => {
			M("src", String(n.result ?? "")), t.size > 4e5 && S(Y("status.audioLarge", { kb: Math.round(t.size / 1024) }), "error");
		}, n.onerror = () => S(Y("status.imageReadError"), "error"), n.readAsDataURL(t);
	}
	function en(e) {
		let { section: t, block: n } = Tt(z(k)?.sectionId, z(k)?.blockId);
		n && (Be("hide-mobile"), n.hideMobile = e, w.save(), D(), T?.sendSection(z(_), t), Et());
	}
	async function tn(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await Yn(t);
			j(`edit:${z(k).blockId}`, (n) => {
				n.props.src = e.dataUrl, n.props.alt = n.props.alt || ya(t.name).replaceAll("-", " ");
			});
		} catch {
			S(Y("status.imageReadError"), "error");
		}
	}
	async function nn(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await Yn(t);
			j(`edit:${z(k).blockId}`, (t) => {
				t.props.image = e.dataUrl;
			});
		} catch {
			S(Y("status.imageReadError"), "error");
		}
	}
	let rn = {
		text: Y("blocks.text"),
		button: Y("blocks.button"),
		image: Y("blocks.image"),
		shape: Y("blocks.shape"),
		video: Y("blocks.video"),
		icon: Y("blocks.icon"),
		gallery: Y("blocks.gallery"),
		faq: Y("blocks.faq"),
		collection: Y("blocks.collection"),
		timeline: Y("blocks.timeline"),
		quote: Y("blocks.quote"),
		stats: Y("blocks.stats"),
		table: Y("blocks.table"),
		share: Y("blocks.share"),
		countdown: Y("blocks.countdown"),
		audio: Y("blocks.audio"),
		product: Y("blocks.product"),
		cart: Y("blocks.cart"),
		checkout: Y("blocks.checkout")
	}, sn = [
		["line", Y("shape.line")],
		["arrow", Y("shape.arrow")],
		["circle", Y("shape.circle")],
		["rect", Y("shape.rect")],
		["triangle", Y("shape.triangle")]
	], cn = [
		["accent", Y("color.accent")],
		["text", Y("color.text")],
		["surface", Y("color.surface")],
		["bg", Y("color.bg")]
	], ln = /* @__PURE__ */ N(null), un = /* @__PURE__ */ N(null), dn = /* @__PURE__ */ N(""), fn = /* @__PURE__ */ N(an([])), pn = /* @__PURE__ */ N(null), mn = /* @__PURE__ */ N(null), hn = /* @__PURE__ */ N("");
	function gn(e) {
		P(un, e?.grid ? { ...e.grid } : null, !0), P(dn, e?.size?.minHeight ?? "", !0), P(fn, JSON.parse(JSON.stringify(e?.background?.layers ?? [])), !0), P(pn, e?.animation ? JSON.parse(JSON.stringify(e.animation)) : null, !0), P(mn, e?.hover ? JSON.parse(JSON.stringify(e.hover)) : null, !0), P(hn, e?.theme ?? "", !0);
	}
	let _n = /* @__PURE__ */ N(null), vn = an({});
	function yn() {
		try {
			let e = ((z(te)?.contentDocument)?.querySelector(`.urd-section[data-section-id="${z(ln)}"]`))?.getBoundingClientRect();
			P(_n, e && e.width ? {
				w: e.width,
				h: e.height
			} : null, !0);
		} catch {
			P(_n, null);
		}
	}
	Cn(() => {
		z(ln), z(fn), requestAnimationFrame(() => requestAnimationFrame(yn));
	}), Cn(() => {
		let e = z(te);
		if (!e || typeof ResizeObserver > "u") return;
		let t = new ResizeObserver(() => yn());
		return t.observe(e), () => t.disconnect();
	}), Cn(() => {
		for (let e of z(fn)) {
			let t = e?.props?.src;
			if (e?.type === "image" && t && !vn[t]) {
				let e = new Image();
				e.onload = () => {
					vn[t] = {
						w: e.naturalWidth,
						h: e.naturalHeight
					};
				}, e.src = t;
			}
		}
	});
	function bn(e) {
		wn("section-theme", (t) => {
			e ? t.theme = e : delete t.theme;
		});
	}
	function xn(e) {
		let t = z(lr), n = (e) => e.replaceAll("var(--urd-base-bg)", t.bg).replaceAll("var(--urd-base-surface)", t.surface).replaceAll("var(--urd-base-text)", t.text).replaceAll("var(--urd-base-accent)", t.accent).replaceAll("var(--urd-base-accent-text)", t["accent-text"]), r = Vs(e);
		return {
			bg: r["--urd-color-bg"] ? n(r["--urd-color-bg"]) : t.bg,
			surface: r["--urd-color-surface"] ? n(r["--urd-color-surface"]) : t.surface,
			text: r["--urd-color-text"] ? n(r["--urd-color-text"]) : t.text,
			accent: r["--urd-color-accent"] ? n(r["--urd-color-accent"]) : t.accent
		};
	}
	function Sn(e) {
		P(ln, e.sectionId, !0), gn(w?.data.sections.find((t) => t.id === e.sectionId));
	}
	function wn(e, t) {
		let n = w.data.sections.find((e) => e.id === z(ln));
		n && (Be(e), t(n), w.save(), D(), T?.sendSection(z(_), n), gn(n));
	}
	let Tn = /* @__PURE__ */ N("color");
	function En(e, t) {
		e.mutate(e.keyPrefix, (e) => {
			e.background ??= {
				version: 1,
				layers: []
			}, e.background.layers.push({
				type: t,
				version: s[t].version ?? 1,
				props: s[t].defaults()
			});
		});
	}
	function Dn(e, t) {
		e.mutate(e.keyPrefix, (e) => {
			e.background.layers.splice(t, 1), e.background.layers.length || delete e.background;
		});
	}
	function On(e, t, n) {
		let r = t + n;
		e.mutate(e.keyPrefix, (e) => {
			let n = e.background.layers;
			r < 0 || r >= n.length || ([n[t], n[r]] = [n[r], n[t]]);
		});
	}
	function kn(e, t, n, r) {
		e.mutate(`edit:${e.keyPrefix}-${e.keyId}-${t}-${n}`, (e) => {
			e.background.layers[t].props[n] = r;
		});
	}
	function An(e, t, n, r = "xy") {
		e.preventDefault();
		let i = e.currentTarget;
		i.setPointerCapture?.(e.pointerId);
		let a = (e) => {
			let a = i.getBoundingClientRect();
			if (r.includes("x")) {
				let r = Math.min(1, Math.max(0, (e.clientX - a.left) / a.width));
				kn(t, n, "x", Math.round(r * 100) / 100);
			}
			if (r.includes("y")) {
				let r = Math.min(1, Math.max(0, (e.clientY - a.top) / a.height));
				kn(t, n, "y", Math.round(r * 100) / 100);
			}
		};
		a(e);
		let o = () => {
			i.removeEventListener("pointermove", a), i.removeEventListener("pointerup", o), i.removeEventListener("pointercancel", o);
		};
		i.addEventListener("pointermove", a), i.addEventListener("pointerup", o), i.addEventListener("pointercancel", o);
	}
	let jn = (e) => Math.min(4, Math.max(.1, e));
	function Mn(e, t, n, r) {
		kn(e, t, "size", jn(Math.round((n + r) * 100) / 100));
	}
	function Nn(e, t, n) {
		let r = Number(n);
		Number.isFinite(r) && kn(e, t, "size", jn(r / 100));
	}
	function Pn(e, t, n, r) {
		let i = vn[n.props.src];
		if (!i?.w || !i?.h || !z(_n)?.w || !z(_n)?.h) return;
		let a = z(_n).h * i.w / (z(_n).w * i.h), o = r === "cover" ? Math.max(1, a) : Math.min(1, a);
		(n.props.fit === "tile" || n.props.fit === "repeat") && kn(e, t, "fit", "plain"), kn(e, t, "size", jn(Math.round(o * 100) / 100));
	}
	function Fn(e) {
		return e.props;
	}
	function In(e, t, n, r) {
		e.mutate(n, (e) => {
			r(e.background.layers[t].props);
		});
	}
	function Ln(e, t, n, r) {
		In(e, t, `edit:${e.keyPrefix}-${e.keyId}-${t}-${n}`, (e) => {
			e[n] = r;
		});
	}
	let Rn = {
		linear: [
			["none", Y("common.none")],
			["pan", Y("opt.gradAnim.pan")],
			["pan-loop", Y("opt.gradAnim.panLoop")],
			["rotate", Y("opt.gradAnim.rotate")]
		],
		radial: [
			["none", Y("common.none")],
			["pulse", Y("opt.gradAnim.pulse")],
			["orbit", Y("opt.gradAnim.orbit")]
		]
	};
	function zn(e, t, n) {
		In(e, t, e.keyPrefix, (e) => {
			e.kind = n, Rn[n].some(([t]) => t === (e.animation ?? "none")) || (e.animation = "none");
		});
	}
	function Bn(e, t, n, r) {
		In(e, t, `edit:${e.keyPrefix}-${e.keyId}-${t}-stop${n}`, (e) => {
			e.stops[n] = {
				...e.stops[n],
				...r
			};
		});
	}
	function Vn(e, t) {
		In(e, t, e.keyPrefix, (e) => {
			let t = Math.round(e.stops.reduce((e, t) => e + (Number(t.share) || 0), 0) / e.stops.length) || 50;
			e.stops.push({
				color: e.stops[e.stops.length - 1]?.color ?? "#ffffff",
				share: t
			});
		});
	}
	function Hn(e, t, n) {
		In(e, t, e.keyPrefix, (e) => {
			e.stops.length > 2 && e.stops.splice(n, 1);
		});
	}
	function Un(e, t, n, r) {
		In(e, t, e.keyPrefix, (e) => {
			let [t] = e.stops.splice(n, 1);
			e.stops.splice(r, 0, t);
		});
	}
	let Wn = /* @__PURE__ */ N(null);
	function Gn(e, t, n, r) {
		if (t.button !== 0) return;
		t.preventDefault();
		let i = t.currentTarget.closest(".bg-layer"), a = t.currentTarget.closest(".grad-stop");
		P(Wn, {
			layer: n,
			from: r,
			insert: r
		}, !0);
		let o = a.getBoundingClientRect(), s = t.clientY - o.top, c = a.cloneNode(!0);
		c.style.cssText = `position:fixed;left:${o.left}px;top:${o.top}px;width:${o.width}px;display:flex;align-items:center;gap:0.4rem;pointer-events:none;z-index:1000;opacity:0.92;padding:2px 4px;background:var(--urd-color-surface);border:1px solid var(--urd-color-accent);border-radius:6px;`, document.body.appendChild(c);
		let l = (e) => {
			c.style.top = `${e.clientY - s}px`;
			let t = [...i.querySelectorAll(".grad-stop")].map((e) => e.getBoundingClientRect()), n = t.length;
			for (let r = 0; r < t.length; r++) if (e.clientY < t[r].top + t[r].height / 2) {
				n = r;
				break;
			}
			P(Wn, {
				...z(Wn),
				insert: n
			}, !0);
		}, u = () => {
			window.removeEventListener("pointermove", l), window.removeEventListener("pointerup", u), c.remove();
			let t = z(Wn);
			if (P(Wn, null), !t) return;
			let n = t.insert > t.from ? t.insert - 1 : t.insert;
			n !== t.from && Un(e, t.layer, t.from, n);
		};
		window.addEventListener("pointermove", l), window.addEventListener("pointerup", u);
	}
	function Kn(e, t, n) {
		e.mutate(e.keyPrefix, (e) => {
			e.background.layers[t].type !== n && (e.background.layers[t] = {
				type: n,
				version: s[n].version ?? 1,
				props: s[n].defaults()
			});
		});
	}
	async function qn(e, t) {
		try {
			let n = new Image();
			await new Promise((t, r) => {
				n.onload = t, n.onerror = r, n.src = e;
			});
			let r = Math.max(1, Math.round(320 * t[3] / t[2])), i = document.createElement("canvas");
			i.width = 320, i.height = r;
			let a = i.getContext("2d");
			a.drawImage(n, 0, 0, 320, r);
			let o = a.getImageData(0, 0, 320, r).data, s = 320, c = r, l = -1, u = -1;
			for (let e = 0; e < r; e++) for (let t = 0; t < 320; t++) o[(e * 320 + t) * 4 + 3] > 8 && (t < s && (s = t), t > l && (l = t), e < c && (c = e), e > u && (u = e));
			if (l < s) return null;
			let d = t[2] / 320, f = t[3] / r;
			return {
				x: t[0] + s * d,
				y: t[1] + c * f,
				width: (l - s + 1) * d,
				height: (u - c + 1) * f
			};
		} catch {
			return null;
		}
	}
	async function Jn(e) {
		let t = await e.text(), n = ha(t), r = _a(t);
		if (!r) return n;
		let i = await qn(n.dataUrl, r);
		if (!i) return n;
		let a = ga(t, i);
		if (a === t) return n;
		try {
			return ha(a);
		} catch {
			return n;
		}
	}
	async function Yn(e) {
		return e.type === "image/svg+xml" || /\.svg$/i.test(e.name || "") ? Jn(e) : fa(e);
	}
	async function Xn(e, t, n) {
		let r = n.target.files?.[0];
		if (n.target.value = "", r) try {
			kn(e, t, "src", (await Yn(r)).dataUrl);
		} catch {
			S(Y("status.imageReadError"), "error");
		}
	}
	function Zn(e, t, n) {
		let r = n.target.files?.[0];
		if (n.target.value = "", !r) return;
		if (!["video/mp4", "video/webm"].includes(r.type)) {
			S(Y("status.videoFormat"), "error");
			return;
		}
		if (r.size > 15e6) {
			S(Y("status.videoTooLarge", {
				mb: (r.size / 1e6).toFixed(1),
				max: Math.round(da / 1e6)
			}), "error");
			return;
		}
		let i = new FileReader();
		i.onload = () => {
			kn(e, t, "src", String(i.result ?? "")), r.size > 4e6 && S(Y("status.videoLarge", { mb: (r.size / 1e6).toFixed(1) }), "error");
		}, i.onerror = () => S(Y("status.imageReadError"), "error"), i.readAsDataURL(r);
	}
	async function Qn(e, t, n) {
		let r = n.target.files?.[0];
		if (n.target.value = "", r) try {
			kn(e, t, "poster", (await Yn(r)).dataUrl);
		} catch {
			S(Y("status.imageReadError"), "error");
		}
	}
	async function $n(e, t, n) {
		let r = [...n.target.files ?? []];
		if (n.target.value = "", !r.length) return;
		S(Y("status.compressingImages"));
		let { images: i, failed: a, big: o } = await gp(r);
		i.length && e.mutate(e.keyPrefix, (e) => {
			let n = e.background.layers[t].props;
			n.images ??= [], n.images.push(...i.map(({ src: e }) => ({
				src: e,
				x: .5,
				y: .5
			})));
		}), _p(i.length, a, o);
	}
	function er(e, t, n, r) {
		e.mutate(e.keyPrefix, (e) => {
			let i = e.background.layers[t].props.images, a = n + r;
			a < 0 || a >= i.length || ([i[n], i[a]] = [i[a], i[n]]);
		});
	}
	function tr(e, t, n) {
		e.mutate(e.keyPrefix, (e) => {
			e.background.layers[t].props.images.splice(n, 1);
		});
	}
	function nr(e, t, n, r, i) {
		e.mutate(`edit:${e.keyPrefix}g-${e.keyId}-${t}-${n}-${r}`, (e) => {
			e.background.layers[t].props.images[n][r] = i;
		});
	}
	function rr(e, t) {
		ki(e, () => {
			z(E).nav.style ??= {}, t(z(E).nav.style);
		});
	}
	let ir = /* @__PURE__ */ A(() => ({
		mutate: wn,
		keyPrefix: "bg",
		keyId: z(ln)
	})), ar = {
		mutate: rr,
		keyPrefix: "navbg",
		keyId: "nav"
	}, or = {
		mutate: Ks,
		keyPrefix: "footerbg",
		keyId: "footer"
	}, sr = () => {
		let e = null;
		try {
			e = localStorage.getItem("urd-theme-mode");
		} catch {}
		return Ns(z(E)?.theme?.scheme, e, window.matchMedia("(prefers-color-scheme: dark)").matches);
	}, cr = /* @__PURE__ */ N("light");
	Cn(() => {
		P(cr, sr(), !0);
		let e = window.matchMedia("(prefers-color-scheme: dark)"), t = (e) => {
			e instanceof StorageEvent && e.key && e.key !== "urd-theme-mode" || P(cr, sr(), !0);
		};
		return e.addEventListener("change", t), window.addEventListener("storage", t), () => {
			e.removeEventListener("change", t), window.removeEventListener("storage", t);
		};
	});
	let lr = /* @__PURE__ */ A(() => z(E)?.theme ? Ps(z(E).theme, z(cr)).color ?? {} : {}), ur = () => Object.entries(z(lr)), dr = [
		[
			"bg",
			Y("palette.bg"),
			Y("palette.bgShort")
		],
		[
			"surface",
			Y("palette.surface"),
			Y("palette.surfaceShort")
		],
		[
			"text",
			Y("palette.text"),
			Y("palette.textShort")
		],
		[
			"accent",
			Y("palette.accent"),
			Y("palette.accentShort")
		],
		[
			"accent-text",
			Y("palette.accentText"),
			Y("palette.accentTextShort")
		]
	], fr = /* @__PURE__ */ A(() => !!z(E)?.theme.alt), pr = /* @__PURE__ */ A(() => z(E)?.theme.alt?.auto === !0), mr = /* @__PURE__ */ A(() => z(E)?.theme.scheme === "dark" ? "dark" : "light"), hr = /* @__PURE__ */ A(() => z(E)?.theme.tokens.color ?? {}), gr = /* @__PURE__ */ A(() => ({
		...z(E)?.theme.tokens.color ?? {},
		...z(E)?.theme.alt?.tokens?.color ?? {}
	}));
	function _r(e) {
		return {
			type: e,
			version: Gc[e].version,
			props: Gc[e].defaults()
		};
	}
	let vr = (e) => !!(e && Gc[e.type]?.entrance), yr = [["", Y("common.none")], ...Object.entries(Gc).filter(([, e]) => e.entrance).map(([e, t]) => [e, t.labelKey ? Y(t.labelKey) : t.label])], br = yr.filter(([e]) => !Gc[e]?.group), xr = [["", Y("common.none")], ...Object.entries(Gc).filter(([, e]) => !e.entrance).map(([e, t]) => [e, t.labelKey ? Y(t.labelKey) : t.label])];
	function Sr(e) {
		e.animation && !vr(e.animation) && (e.hover ??= e.animation, e.animation = null);
	}
	function wr(e) {
		j(`edit:anim-${z(k).blockId}`, (t) => {
			Sr(t), t.animation = e ? _r(e) : null;
		}), z(k) && T?.sendDemoAnim(z(k).sectionId, z(k).blockId);
	}
	function Er(e) {
		j(`edit:hover-${z(k).blockId}`, (t) => {
			Sr(t), t.hover = e ? _r(e) : null;
		});
	}
	function Dr(e, t) {
		Number.isFinite(t) && (j(`edit:anim-${z(k).blockId}:${e}`, (n) => {
			n.animation && (n.animation.props[e] = t);
		}), z(k) && T?.sendDemoAnim(z(k).sectionId, z(k).blockId));
	}
	function Or(e) {
		wn("section-anim", (t) => {
			Sr(t), t.animation = e ? _r(e) : null;
		}), T?.sendDemoAnim(z(ln));
	}
	function kr(e) {
		wn("section-hover", (t) => {
			Sr(t), t.hover = e ? _r(e) : null;
		});
	}
	function Ar(e, t) {
		Number.isFinite(t) && (wn("edit:section-anim", (n) => {
			n.animation && (n.animation.props[e] = t);
		}), T?.sendDemoAnim(z(ln)));
	}
	function jr(e, t) {
		wn("edit:section-anim", (n) => {
			n.animation && (n.animation.props[e] = t);
		}), T?.sendDemoAnim(z(ln));
	}
	function Mr(e) {
		let t = w.data.sections.find((e) => e.id === z(ln));
		if (!t) return;
		let n = e.trim();
		if (!n) return;
		let r = /^\d+$/.test(n) ? `${n}px` : n;
		Be("section-size"), t.size = {
			...t.size,
			minHeight: r
		}, P(dn, r, !0), w.save(), D(), T?.sendSection(z(_), t);
	}
	function Nr() {
		return w.data.sections.find((e) => e.id === z(ln)) ?? w.data.sections[0];
	}
	function V(e) {
		let t = w.data.sections.find((e) => e.id === z(ln));
		t && (Be("grid:section"), t.grid = e ? { ...Ae.data.grid } : null, P(un, t.grid ? { ...t.grid } : null, !0), w.save(), D(), T?.sendSection(z(_), t), z(Ti) && T?.sendShowGrid(!0));
	}
	function Pr(e, t) {
		let n = w.data.sections.find((e) => e.id === z(ln));
		n?.grid && (Be("grid:section"), n.grid = {
			...n.grid,
			[e]: t
		}, P(un, { ...n.grid }, !0), w.save(), D(), T?.sendSection(z(_), n), z(Ti) && T?.sendShowGrid(!0));
	}
	function Ir(e, t) {
		Be("grid:site"), P(re, {
			...z(re),
			[e]: t
		}, !0), Ae.data.grid = {
			...Ae.data.grid,
			[e]: t
		}, Ae.save(), D(), Me(), z(Ti) && T?.sendShowGrid(!0);
	}
	async function Lr() {
		try {
			let e = await fetch("/api/github/me");
			e.ok ? P(ne, await e.json(), !0) : e.status !== 503 && P(ne, null);
		} catch {
			P(ne, null);
		}
	}
	let Rr = null;
	async function zr() {
		try {
			let e = await fetch("/api/github/latest");
			e.ok && (Rr = (await e.json()).head ?? null);
		} catch {}
	}
	async function Br(e) {
		if (!Rr) return await zr(), {
			ok: await et({
				title: Y("confirm.conflictUnknown.title"),
				lines: [Y("confirm.conflictUnknown.body"), Y("confirm.conflictUnknown.warning")],
				okLabel: Y("confirm.publishAnyway"),
				cancelLabel: Y("confirm.cancel")
			}),
			head: Rr
		};
		let t = null;
		try {
			let e = await fetch(`/api/github/latest?base=${Rr}`);
			e.ok && (t = await e.json().catch(() => null));
		} catch {}
		if (!t?.head) return {
			ok: !0,
			head: null
		};
		let n = t.head;
		if (n === Rr) return {
			ok: !0,
			head: n
		};
		let r = new Set(e.map((e) => e.path)), i = t.truncated ? [Y("confirm.conflict.truncated")] : (t.changedFiles ?? []).filter((e) => r.has(e));
		return i.length === 0 ? {
			ok: !0,
			head: n
		} : {
			ok: await et({
				title: Y("confirm.conflict.title"),
				lines: [
					Y("confirm.conflict.intro"),
					...i.map((e) => `• ${e}`),
					Y("confirm.conflict.warning")
				],
				okLabel: Y("confirm.publishAnyway"),
				cancelLabel: Y("confirm.cancel")
			}),
			head: n
		};
	}
	let Vr = /* @__PURE__ */ N(null), Ur = /* @__PURE__ */ N(""), Wr = /* @__PURE__ */ N(!1);
	async function Gr() {
		P(Ur, "");
		try {
			let e = await fetch("/api/github/history");
			e.ok ? P(Vr, (await e.json()).commits, !0) : e.status === 401 ? (P(Vr, [], !0), P(Ur, Y("status.historyLoginRequired"), !0)) : (P(Vr, [], !0), P(Ur, Vi(await e.json().catch(() => null)) ?? Y("status.historyFetchFailed"), !0));
		} catch {
			P(Vr, [], !0), P(Ur, Y("status.historyUnavailable"), !0);
		}
	}
	let qr = (() => {
		let e = {
			dateStyle: "short",
			timeStyle: "short"
		};
		try {
			return new Intl.DateTimeFormat(Hi(), e);
		} catch {
			return new Intl.DateTimeFormat(void 0, e);
		}
	})(), Jr = !1;
	async function Yr() {
		let e = z(Vr)?.[0];
		if (!(!e || z(Wr)) && await et({
			title: Y("confirm.revert.title"),
			lines: [`«${e.message}»`, Y("confirm.revert.body")],
			okLabel: Y("confirm.revert.ok"),
			cancelLabel: Y("confirm.cancel")
		})) {
			P(Wr, !0), S(Y("status.reverting"));
			try {
				let t = await fetch("/api/github/revert", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({ expect: e.sha })
				});
				if (t.ok) {
					let { sha: e } = await t.json().catch(() => ({}));
					e ? Rr = e : zr(), Jr = !0, S(Y("status.revertDone"), "ok"), Xr();
				} else t.status === 409 ? S(Y("status.revertConflict"), "error") : S(Vi(await t.json().catch(() => null)) ?? Y("status.revertFailed"), "error");
			} catch {
				S(Y("status.publishLayerUnreachable"), "error");
			}
			P(Wr, !1), Gr();
		}
	}
	async function Xr() {
		let e = ["/content/site.json", ...z(E).pages.map((e) => `/${e.file}`)], t = async () => {
			let t = {};
			for (let n of e) try {
				t[n] = await (await fetch(n, { cache: "no-store" })).text();
			} catch {
				t[n] = null;
			}
			return t;
		}, n = await t();
		for (let r = 0; r < 18; r++) {
			await new Promise((e) => setTimeout(e, 1e4));
			let r = await t();
			if (e.some((e) => r[e] !== null && n[e] !== null && r[e] !== n[e])) {
				S(Y("status.revertDeployed"), "ok");
				for (let e of Object.keys(localStorage).filter((e) => e.startsWith("urd-draft-"))) localStorage.removeItem(e);
				await new Promise((e) => setTimeout(e, 800)), location.reload();
				return;
			}
		}
		S(Y("status.revertDeployTimeout"), "error");
	}
	let Zr = /* @__PURE__ */ N(null), Qr = /* @__PURE__ */ N(null), $r = /* @__PURE__ */ N(!1), ei = /* @__PURE__ */ N(an(/* @__PURE__ */ new Set()));
	async function ti() {
		P($r, !0), P(Qr, null), P(Zr, null);
		try {
			let e = await fetch("/api/github/update"), t = await e.json().catch(() => null);
			e.ok ? (P(Zr, t, !0), P(ei, /* @__PURE__ */ new Set(), !0)) : P(Qr, Vi(t) ?? Y("update.checkFailed"), !0);
		} catch {
			P(Qr, Y("status.publishLayerUnreachable"), !0);
		}
		P($r, !1);
	}
	function ni(e) {
		let t = new Set(z(ei));
		t.has(e) ? t.delete(e) : t.add(e), P(ei, t, !0);
	}
	async function ri() {
		if (!z(Zr) || z(Zr).upToDate || z($r)) return;
		let e = [...z(ei)], t = z(Zr).changes.filter((e) => !z(ei).has(e.path)), n = t.filter((e) => e.atom && e.conflict);
		if (await et({
			title: Y("confirm.update.title"),
			lines: [Y("confirm.update.body", {
				target: z(Zr).target,
				writes: t.filter((e) => e.action === "write").length,
				deletes: t.filter((e) => e.action === "delete").length
			}), ...n.length > 0 ? [Y("confirm.update.warnEdited", { paths: n.map((e) => e.path).join(", ") })] : []],
			okLabel: Y("confirm.update.ok"),
			cancelLabel: Y("confirm.cancel")
		})) {
			P($r, !0), S(Y("update.running", { target: z(Zr).target }));
			try {
				let t = await fetch("/api/github/update", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({
						to: z(Zr).target,
						expect: z(Zr).head,
						skip: e
					})
				}), n = await t.json().catch(() => null);
				t.ok ? (S(Y("update.committed", { target: z(Zr).target }), "ok"), await ii(z(Zr).target.replace(/^v/, ""))) : t.status === 409 ? (S(Vi(n) ?? Y("update.checkFailed"), "error"), await ti()) : S(Vi(n) ?? Y("update.failed"), "error");
			} catch {
				S(Y("status.publishLayerUnreachable"), "error");
			}
			P($r, !1);
		}
	}
	async function ii(e) {
		for (let t = 0; t < 18; t++) {
			await new Promise((e) => setTimeout(e, 1e4));
			try {
				if ((await (await fetch("/urd.json", { cache: "no-store" })).json())?.engine === e) {
					S(Y("update.deployed"), "ok"), await new Promise((e) => setTimeout(e, 800)), location.reload();
					return;
				}
			} catch {}
		}
		S(Y("update.deployTimeout"), "error");
	}
	let ai = null;
	function si(e) {
		return {
			schemaVersion: 4,
			meta: {
				id: e.id,
				title: e.title
			},
			sections: [{
				id: So("sec"),
				version: 1,
				preset: "blank",
				size: { minHeight: "40vh" },
				grid: null,
				background: {
					version: 1,
					layers: [{
						type: "color",
						version: 1,
						props: { value: "bg" }
					}]
				},
				blocks: []
			}]
		};
	}
	async function ci(e, { keepHistory: t = !1 } = {}) {
		P(_, e, !0), ai = (async () => {
			let n = Pe(), r = null;
			try {
				let e = await fetch(`/${n.file}`);
				e.ok && (r = go(await e.json(), Ae.data));
			} catch {}
			r ? Ne.delete(e) : r = si(n), w = Yi(`urd-draft-${e}`, () => r, C), (w.data.schemaVersion ?? 1) > 4 && (console.warn(`Urd: the draft for '${e}' has schemaVersion ${w.data.schemaVersion} (the engine has 4) and is discarded`), w.replace(structuredClone(r))), w.replace(go(w.data, Ae.data)), w.save(), t || (Re = null), P(ln, null), P(un, null), D(), Ui(), Te(), P(y, "");
		})(), await ai;
	}
	function li() {
		T?.destroy(), z(te)?.contentDocument?.addEventListener("pointerdown", () => {
			z(Ot) && P(Ot, null);
		}, !0), T = Va(z(te), {
			onEdit: Wf,
			onMove: Gf,
			onGrow: Kf,
			onDelete: np,
			onAddSection: Zf,
			onMoveSection: Qf,
			onDeleteSection: $f,
			onSectionSize: ep,
			onUndo: (e) => e.redo ? qe() : Ke(),
			onSelectSection: Sn,
			onSelectBlock: Dt,
			onBlockMenu: Mt,
			onReady: ui,
			onNavigate: Di,
			onAddBlock: (e) => op(e.sectionId, e.block),
			onAddBlocks: (e) => sp(e.sectionId, e.blocks, e.minBottom, e.moves),
			onRequestBlock: mp,
			onMoveBlockSection: tp,
			onMobileReset: qf,
			onMobileOrder: Jf,
			onReviewDone: Yf,
			onBlockFlag: Xf,
			onCollectionEdit: Lo,
			onCollectionAdd: Fo,
			onSaveTemplate: Eo,
			onStickyGroup: Oo,
			onStickyDock: Do,
			onDeleteTemplate: Ao,
			onApplyLayout: De,
			onPluginBlocks: (e) => {
				P(lp, e.blocks ?? [], !0);
			},
			onNavWidth: (e) => ki("edit:nav-width", () => {
				z(E).nav.style ??= {}, z(E).nav.style.width = e.width;
			})
		});
	}
	async function ui() {
		await ai, await ds, T?.sendPlugins(We(z(fs))?.enabled ?? []), T?.sendViewport(z(ce)), T?.sendZoom(z(ve)), No(), To(), Ae.hasDraft() && Me();
		let e = !z(g).pages.some((e) => e.id === z(_));
		(w.hasDraft() || e) && T?.sendPage(z(_), w.data), z(ie) || T?.sendChrome(!1), z(Ti) && T?.sendShowGrid(!0), z(di) && T?.sendShowGuides(!0), p();
	}
	let di = /* @__PURE__ */ N(localStorage.getItem("urd-guides") === "1"), fi = /* @__PURE__ */ N(!1), mi = /* @__PURE__ */ N(an(localStorage.getItem("urd-layout-picker") === "menu" ? "menu" : "strip"));
	function gi(e) {
		P(mi, e === "menu" ? "menu" : "strip", !0), z(mi) === "menu" ? localStorage.setItem("urd-layout-picker", "menu") : localStorage.removeItem("urd-layout-picker");
	}
	let _i = /* @__PURE__ */ N(null);
	Cn(() => {
		if (!z(fi)) return;
		let e = (e) => {
			z(_i)?.contains(e.target) || P(fi, !1);
		}, t = (e) => {
			e.key === "Escape" && P(fi, !1);
		}, n = () => {
			P(fi, !1);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t), window.removeEventListener("blur", n);
		};
	});
	let vi = {
		view: 1079,
		device: 999,
		zoom: 919
	}, yi = /* @__PURE__ */ N(null), xi = /* @__PURE__ */ N(null), Si = an({
		view: !1,
		device: !1,
		zoom: !1
	});
	Cn(() => {
		let e = Object.entries(vi).map(([e, t]) => {
			let n = window.matchMedia(`(max-width: ${t}px)`), r = () => {
				Si[e] = n.matches;
			};
			return r(), n.addEventListener("change", r), () => n.removeEventListener("change", r);
		});
		return () => e.forEach((e) => e());
	}), Cn(() => {
		z(yi) && !Si[z(yi)] && P(yi, null);
	}), Cn(() => {
		if (!z(yi)) return;
		let e = (e) => {
			z(xi)?.contains(e.target) || P(yi, null);
		}, t = (e) => {
			e.key === "Escape" && P(yi, null);
		}, n = () => {
			P(yi, null);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t), window.removeEventListener("blur", n);
		};
	});
	function Ci() {
		P(di, !z(di)), localStorage.setItem("urd-guides", z(di) ? "1" : "0"), T?.sendShowGuides(z(di));
	}
	let Ti = /* @__PURE__ */ N(localStorage.getItem("urd-grid-overlay") === "1");
	function Ei() {
		P(Ti, !z(Ti)), localStorage.setItem("urd-grid-overlay", z(Ti) ? "1" : "0"), T?.sendShowGrid(z(Ti));
	}
	function Di(e) {
		let t = e.path.replace(/\/$/, "") || "/", n = z(E).pages.find((e) => e.path === t);
		n && n.id !== z(_) && ci(n.id);
	}
	function ki(e, t) {
		Be(e), t(), Ae.save(), D(), Me();
	}
	let Ai = /* @__PURE__ */ N(""), ji = /* @__PURE__ */ N(null), Mi = Object.fromEntries(Os.map((e) => [e.id, Es(ks(e.id, {
		pageId: "preview",
		title: ""
	}))])), Ni = /* @__PURE__ */ A(() => {
		let e = z(E)?.theme?.tokens?.color ?? {};
		return [
			"bg",
			"surface",
			"text",
			"accent"
		].filter((t) => typeof e[t] == "string" && Is(e[t])).map((t) => `--urd-color-${t}: ${e[t]};`).join(" ");
	}), Pi = /* @__PURE__ */ N(null);
	Cn(() => {
		if (!z(Pi)) return;
		let e = (e) => {
			e.target.closest?.(".page-menu-wrap") || P(Pi, null);
		}, t = (e) => {
			e.key === "Escape" && P(Pi, null);
		}, n = () => {
			P(Pi, null);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t), window.removeEventListener("blur", n);
		};
	});
	let Fi = [
		"admin",
		"api",
		"assets",
		"content",
		"media",
		"plugins",
		"functions",
		"readme"
	];
	function Ii(e, t = null) {
		return e ? Fi.includes(e) ? Y("error.reservedName", { slug: e }) : z(E).pages.some((n) => n.id !== t && (n.path === `/${e}` || n.id === e)) ? Y("error.pageExists") : null : Y("error.pageNeedsName");
	}
	function Li() {
		let e = z(Ai).trim(), t = ya(e), n = Ii(t);
		if (n) {
			S(n, "error");
			return;
		}
		let r = z(ji) && !z(ji).startsWith("preset:") ? bo[z(ji)]?.data?.page : null, i = z(ji)?.startsWith("preset:") ? ks(z(ji).slice(7), {
			pageId: t,
			title: e
		}) ?? si({
			id: t,
			title: e
		}) : r ? Jo(go(JSON.parse(JSON.stringify(r)), Ae.data), So, {
			id: t,
			title: e
		}) : si({
			id: t,
			title: e
		});
		ki("pages", () => {
			z(E).pages.push({
				id: t,
				title: e,
				path: `/${t}`,
				file: `content/pages/${t}.json`
			}), z(E).nav.items.push({
				label: e,
				page: t
			});
		}), ee(`urd-draft-${t}`, JSON.stringify(i)), D(), P(Ai, ""), P(ji, null), ci(t);
	}
	async function Ri(e) {
		P(Pi, null), await ko("page", e.id === z(_) ? JSON.parse(JSON.stringify(w.data)) : await Zi(e));
	}
	function zi(e, t) {
		let n = t.trim();
		if (!n || n === e.title) return;
		let r = e.title;
		ki("pages", () => {
			e.title = n;
			for (let t of z(E).nav.items) t.page === e.id && t.label === r && (t.label = n);
		}), e.id === z(_) ? (w.data.meta.title = n, w.save(), D(), T?.sendPage(z(_), w.data)) : Qi(e, (e) => {
			e.meta.title = n;
		});
	}
	let Bi = /* @__PURE__ */ N(an({
		description: "",
		ogTitle: "",
		ogDescription: "",
		ogImage: ""
	}));
	function Ui() {
		let e = w?.data?.meta ?? {};
		P(Bi, {
			description: e.description ?? "",
			ogTitle: e.og?.title ?? "",
			ogDescription: e.og?.description ?? "",
			ogImage: e.og?.image ?? ""
		}, !0);
	}
	function Wi(e, t) {
		let n = String(t ?? "").trim();
		if (e === "description") n ? w.data.meta.description = n : delete w.data.meta.description;
		else {
			let t = {
				ogTitle: "title",
				ogDescription: "description",
				ogImage: "image"
			}[e], r = { ...w.data.meta.og ?? {} };
			n ? r[t] = n : delete r[t], Object.keys(r).length ? w.data.meta.og = r : delete w.data.meta.og;
		}
		w.save(), D(), Ui();
		let r = z(E).pages.find((e) => e.id === z(_));
		z(Ki)[z(_)] = !r?.noindex && !w.data.meta.description;
	}
	function Gi(e) {
		let t = z(E).pages.find((e) => e.id === z(_));
		t && (ki("edit:page-noindex", () => {
			e ? t.noindex = !0 : delete t.noindex;
		}), z(Ki)[z(_)] = !e && !w?.data?.meta?.description);
	}
	let Ki = /* @__PURE__ */ N(an({}));
	async function qi() {
		let e = {};
		for (let t of z(E).pages) {
			if (t.noindex) continue;
			if (t.id === z(_)) {
				e[t.id] = !w?.data?.meta?.description;
				continue;
			}
			let n = await Zi(t);
			e[t.id] = !n?.meta?.description;
		}
		P(Ki, e, !0);
	}
	Cn(() => {
		z(ft) === "pages" && z(_) && qi();
	});
	async function Xi(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			Wi("ogImage", (await Yn(t)).dataUrl);
		} catch {
			S(Y("status.imageReadError"), "error");
		}
	}
	async function Zi(e) {
		let t = localStorage.getItem(`urd-draft-${e.id}`);
		if (t) try {
			return JSON.parse(t);
		} catch {}
		try {
			let t = await fetch(`/${e.file}`);
			if (t.ok) return go(await t.json(), Ae.data);
		} catch {}
		return si(e);
	}
	async function Qi(e, t) {
		let n = await Zi(e);
		t(n), ee(`urd-draft-${e.id}`, JSON.stringify(n)), D();
	}
	function $i(e, t) {
		let n = ya(t);
		if (e.path === "/" || `/${n}` === e.path) return;
		let r = Ii(n, e.id);
		if (r) {
			S(r, "error");
			return;
		}
		ki("pages", () => {
			e.path = `/${n}`;
		});
	}
	function ea(e) {
		e.path !== "/" && (ki("pages", () => {
			z(E).pages = z(E).pages.filter((t) => t.id !== e.id), z(E).nav.items = z(E).nav.items.filter((t) => t.page !== e.id || t.children);
			for (let t of z(E).nav.items) t.page === e.id && delete t.page, t.children && (t.children = t.children.filter((t) => t.page !== e.id), t.children.length === 0 && delete t.children);
			z(E).nav.items = z(E).nav.items.filter((e) => e.page || e.href || e.children);
		}), e.id === z(_) && ci(z(E).pages[0].id), S(Y("status.pageRemoved")));
	}
	function ta(e) {
		ki("edit:nav-logo", () => {
			z(E).nav.logo = {
				type: "text",
				value: "",
				...z(E).nav.logo,
				...e
			};
		});
	}
	function na(e) {
		ki("nav", () => {
			z(E).nav.logo ??= {
				type: "text",
				value: z(E).site.title
			};
			let t = z(E).nav.logo, n = t.type === "image";
			e === "both" ? (n && (t.image = t.value, t.value = z(E).site.title), t.image ??= "", t.size ??= 32) : e === "image" ? (n || (t.value = t.image ?? ""), delete t.image, t.size ??= 32) : (n && (t.value = z(E).site.title), delete t.image), t.type = e;
		});
	}
	async function ra(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await Yn(t);
			ki("nav", () => {
				let t = z(E).nav.logo;
				t.type === "both" ? t.image = e.dataUrl : t.value = e.dataUrl;
			});
		} catch {
			S(Y("status.imageReadErrorSvg"), "error");
		}
	}
	let ia = /* @__PURE__ */ N(null);
	async function aa(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		if (t.type === "image/svg+xml" || /\.svg$/i.test(t.name || "")) {
			try {
				let e = await Jn(t);
				P(ia, e.dataUrl, !0);
			} catch {
				S(Y("status.imageReadErrorSvg"), "error");
			}
			return;
		}
		let n = new FileReader();
		n.onload = () => {
			P(ia, String(n.result), !0);
		}, n.onerror = () => S(Y("status.imageReadError"), "error"), n.readAsDataURL(t);
	}
	function oa(e) {
		ki("edit:site-icon", () => {
			z(E).site.icon = e;
		}), P(ia, null);
	}
	function ca() {
		ki("edit:site-icon", () => {
			delete z(E).site.icon;
		});
	}
	function la(e) {
		ki("edit:site-title", () => {
			z(E).site.title = e;
		});
	}
	function ua(e) {
		ki("edit:site-desc", () => {
			z(E).site.description = e;
		});
	}
	let pa = /* @__PURE__ */ A(() => z(E)?.layout?.contentWidth ?? 1440), ma = /* @__PURE__ */ A(() => z(E)?.layout?.gutter ?? 6), xa = /* @__PURE__ */ A(() => Qa(z(pa))), Sa = /* @__PURE__ */ A(() => Ga.find((e) => e.gutter === z(ma))?.id ?? null), Ca = /* @__PURE__ */ N(!1), wa = /* @__PURE__ */ A(() => z(pa) === "full" ? Wa : Ja(z(pa))), Ta = /* @__PURE__ */ A(() => qa.map((e) => ({
		screen: e,
		...Za(z(pa), z(ma), e)
	})));
	function Ea(e, t) {
		ki(t, () => {
			z(E).layout = {
				contentWidth: z(pa),
				gutter: z(ma),
				...e
			};
		});
	}
	let Da = (e) => Ea({ contentWidth: e === "full" ? "full" : Ja(e) }, "edit:site-width"), ja = (e) => Ea({ gutter: Ya(e) }, "edit:site-gutter");
	function Ma() {
		let e = z(E).site.lang ?? "no";
		return e === "no" ? "nb" : e;
	}
	function Na() {
		let e = Ma(), t = vt([..._t, ...xt()]);
		return [...t.some(([t]) => t === e) ? [] : [[e, e]], ...t];
	}
	function Pa(e) {
		ki("site", () => {
			z(E).site.lang = e;
		});
	}
	let Fa = /^(?:data:image\/[\w.+-]+;base64,[A-Za-z0-9+/=]+|\/(?!\/)[\w%./-]*)$/;
	Cn(() => {
		if (!z(E)?.site) return;
		let e = z(E).site.icon, t = document.querySelector("link[rel=\"icon\"]");
		if (t) {
			if (typeof e != "string" || !e) {
				t.href = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%230b0e14'/%3E%3Cpath d='M19.2 49.6V14.4l25.6 10.4V49.6' fill='none' stroke='%2315b39a' stroke-width='6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E";
				return;
			}
			Fa.test(e) && (t.href = e);
		}
	});
	function Ia(e) {
		ki("nav", () => {
			z(E).nav.layout = e;
		});
	}
	function La(e, t) {
		ki(`edit:nav-style-${e}`, () => {
			z(E).nav.style ??= {}, t === void 0 ? delete z(E).nav.style[e] : z(E).nav.style[e] = t;
		});
	}
	let Ra = /* @__PURE__ */ A(() => z(E)?.nav?.variant === "side-left" || z(E)?.nav?.variant === "side-right"), za = /* @__PURE__ */ A(() => [
		"floating",
		"floating-square",
		"floating-tab"
	].includes(z(E)?.nav?.variant)), Ha = {
		underline: [Y("hoverColor.underline.label"), Y("hoverColor.underline.title")],
		pill: [Y("hoverColor.pill.label"), Y("hoverColor.pill.title")],
		lift: [Y("hoverColor.lift.label"), Y("hoverColor.lift.title")]
	}, $a = /* @__PURE__ */ A(() => Ha[z(E)?.nav?.style?.hover] ?? null);
	function eo(e) {
		ki("nav", () => {
			e === "bar" ? delete z(E).nav.variant : z(E).nav.variant = e;
		});
	}
	function to(e) {
		ki("nav", () => {
			z(E).nav.style ??= {}, e ? z(E).nav.style.glow = !0 : delete z(E).nav.style.glow;
		});
	}
	function no(e) {
		ki("nav", () => {
			z(E).nav.style ??= {}, e ? delete z(E).nav.style.topGap : z(E).nav.style.topGap = !1;
		});
	}
	function io(e) {
		ki("nav", () => {
			z(E).nav.style ??= {}, e === "standard" ? delete z(E).nav.style.hover : z(E).nav.style.hover = e;
		});
	}
	let ao = null, oo = {}, so = {}, co = !1, lo = /* @__PURE__ */ N(an([])), uo = /* @__PURE__ */ N(an({})), fo = /* @__PURE__ */ N(null), po = /* @__PURE__ */ N(""), mo = /* @__PURE__ */ N("news"), _o = [
		["news", Y("collectionKind.news")],
		["notices", Y("collectionKind.notices")],
		["publications", Y("collectionKind.publications")],
		["products", Y("collectionKind.products")],
		["custom", Y("collectionKind.custom")]
	], vo = null, bo = {}, Co = {}, Z = !1, Q = /* @__PURE__ */ N(an([]));
	async function wo() {
		let e = {
			version: 1,
			maler: []
		};
		try {
			e = await (await fetch("/content/maler.json")).json();
		} catch {}
		vo = Yi("urd-draft-templates", () => e, C, "urd-draft-maler"), P(Q, [...vo.data.maler ?? []], !0);
		for (let e of z(Q)) {
			let t = null;
			try {
				t = await (await fetch(`/content/maler/${e}.json`)).json();
			} catch {}
			Co[e] = t, bo[e] = Yi(`urd-draft-template-${e}`, () => t, C, `urd-draft-mal-${e}`), (bo[e].data?.schemaVersion ?? 1) > 1 && bo[e].reset();
		}
		Z = !0, To();
	}
	function To() {
		let e = z(Q).map((e) => bo[e]?.data ? {
			id: e,
			...JSON.parse(JSON.stringify(bo[e].data))
		} : null).filter(Boolean).map(({ id: e, mal: t, section: n, blocks: r, page: i }) => ({
			id: e,
			name: t.name,
			kind: t.kind,
			section: n,
			blocks: r,
			page: i
		}));
		T?.sendTemplates(e);
	}
	function Eo(e) {
		let t = Ko.includes(e.kind) ? e.kind : "section";
		return ko(t, e[t]);
	}
	function Do(e) {
		let { section: t, block: n } = Tt(e.sectionId, e.blockId);
		!t || !n?.sticky || At.some(([t]) => t === e.dock) && (Be(`sticky-dock:${e.blockId}`), n.sticky = {
			...n.sticky,
			dock: e.dock
		}, w.save(), D(), T?.sendSection(z(_), t), Et());
	}
	function Oo(e) {
		let t = e.blockIds ?? [], { section: n } = Tt(e.sectionId, t[0]);
		if (!n || !t.length) return;
		Be(`sticky-group:${e.sectionId}`);
		let r = e.on ? So("stk") : null;
		for (let e of n.blocks) t.includes(e.id) && (e.sticky = r ? {
			offset: 16,
			until: null,
			...e.sticky,
			group: r
		} : null);
		ke(n, "block-edited"), w.save(), D(), T?.sendSection(z(_), n), Et(), S(Y(e.on ? "status.stickyGrouped" : "status.stickyUngrouped"));
	}
	async function ko(e, t) {
		if (!t || !vo) return;
		let n = (await tt({
			title: Y("canvas.templateNamePrompt"),
			placeholder: Y("ph.templateName")
		}))?.trim();
		if (!n) return;
		let r = qo(n);
		if (!r) {
			S(Y("status.invalidName"), "error");
			return;
		}
		if (z(Q).includes(r)) {
			S(Y("status.templateExists"), "error");
			return;
		}
		Be("templates");
		let i = {
			schemaVersion: 1,
			mal: {
				name: n,
				kind: e
			},
			[e]: t
		};
		bo[r] = Yi(`urd-draft-template-${r}`, () => null, C, `urd-draft-mal-${r}`), bo[r].replace(i), bo[r].save(), vo.data.maler = [...z(Q), r], vo.save(), P(Q, [...z(Q), r], !0), S(Y("status.templateSaved", { name: n }), "ok"), D(), To();
	}
	async function Ao(e) {
		let t = bo[e.id]?.data?.mal;
		t && await et({ title: Y("confirm.deleteTemplate", { name: t.name }) }) && (Be("templates"), z(ji) === e.id && P(ji, null), localStorage.removeItem(`urd-draft-template-${e.id}`), localStorage.removeItem(`urd-draft-mal-${e.id}`), delete bo[e.id], vo.data.maler = z(Q).filter((t) => t !== e.id), vo.save(), P(Q, z(Q).filter((t) => t !== e.id), !0), D(), To());
	}
	async function jo() {
		let e = {
			version: 1,
			samlinger: []
		};
		try {
			e = await (await fetch("/content/collections.json")).json();
		} catch {}
		ao = Yi("urd-draft-collections", () => e, C, "urd-draft-samlinger"), P(lo, [...ao.data.samlinger ?? []], !0);
		for (let e of z(lo)) {
			let t = null;
			try {
				t = await (await fetch(`/content/samlinger/${e}.json`)).json();
			} catch {}
			so[e] = t, oo[e] = Yi(`urd-draft-collection-${e}`, () => t, C, `urd-draft-samling-${e}`), !t && !oo[e].data && (oo[e].replace({
				schemaVersion: 1,
				id: e,
				name: e,
				kind: "custom",
				entries: []
			}), oo[e].save());
		}
		co = !0, Mo();
	}
	function Mo(e = !0) {
		let t = {};
		for (let e of z(lo)) oo[e] && (t[e] = JSON.parse(JSON.stringify(oo[e].data)));
		P(uo, t, !0), e && No();
	}
	function No() {
		T?.sendCollections(We(z(uo)) ?? {});
	}
	function Po(e, t, n, r = !0) {
		let i = oo[e];
		i && (Be(t), n(i.data), i.save(), D(), Mo(r));
	}
	function Fo(e) {
		oo[e.collection] && Ho(e.collection);
	}
	function Io(e) {
		return (new DOMParser().parseFromString(String(e ?? ""), "text/html").body.textContent ?? "").trim();
	}
	function Lo(e) {
		let { collection: t, entryId: n, field: r, value: i } = e;
		[
			"title",
			"text",
			"image",
			"imageAlt",
			"imageStyle"
		].includes(r) && (r === "title" && !Io(i) || Po(t, `edit:collection:${t}:${n}:${r}`, (e) => {
			let t = e.entries.find((e) => e.id === n);
			t && (i === "" && r !== "title" ? delete t[r] : t[r] = i);
		}, r === "image"));
	}
	function Ro(e, t, n) {
		let r = {
			schemaVersion: 1,
			id: e,
			name: t,
			kind: n,
			entries: []
		};
		oo[e] = Yi(`urd-draft-collection-${e}`, () => null, C, `urd-draft-samling-${e}`), oo[e].replace(r), oo[e].save(), ao.data.samlinger = [...z(lo), e], ao.save(), P(lo, [...z(lo), e], !0), P(fo, e, !0), D(), Mo();
	}
	function zo() {
		let e = z(po).trim();
		if (!e) return;
		let t = ya(e);
		if (!t || z(lo).includes(t)) {
			S(Y(t ? "status.collectionExists" : "status.invalidName"), "error");
			return;
		}
		Be("collections"), Ro(t, e, z(mo)), P(po, "");
	}
	function Bo() {
		let e = Y("seed.productCatalogName"), t = ya(e) || "collection", n = t;
		for (let e = 2; z(lo).includes(n); e += 1) n = `${t}-${e}`;
		Be("collections"), Ro(n, e, "products"), j(null, (e) => {
			e.props.collection = n;
		});
	}
	function Vo(e) {
		Be("collections"), localStorage.removeItem(`urd-draft-collection-${e}`), localStorage.removeItem(`urd-draft-samling-${e}`), delete oo[e], ao.data.samlinger = z(lo).filter((t) => t !== e), ao.save(), P(lo, z(lo).filter((t) => t !== e), !0), z(fo) === e && P(fo, null), D(), Mo();
	}
	function Ho(e) {
		Po(e, `collection:${e}:add-entry`, (e) => {
			e.kind === "products" ? e.entries.push({
				id: So("entry"),
				title: Y("seed.newProduct"),
				text: ""
			}) : e.entries.unshift({
				id: So("entry"),
				title: Y("seed.newEntry"),
				date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
				text: ""
			});
		});
	}
	function Uo(e, t, n, r) {
		Po(e, `edit:collection:${e}:${t}:${n}`, (e) => {
			let i = e.entries.find((e) => e.id === t);
			i && (r === "" && n !== "title" ? delete i[n] : i[n] = r);
		});
	}
	function Wo(e, t, n) {
		Po(e, `collection:${e}:move-entry`, (e) => {
			let r = t + n;
			r < 0 || r >= e.entries.length || ([e.entries[t], e.entries[r]] = [e.entries[r], e.entries[t]]);
		});
	}
	function Go(e, t) {
		Po(e, `collection:${e}:remove-entry`, (e) => {
			e.entries = e.entries.filter((e) => e.id !== t);
		});
	}
	async function Yo(e, t, n) {
		let r = n.target.files?.[0];
		n.target.value = "", r && Uo(e, t, "image", (await Yn(r)).dataUrl);
	}
	function Xo(e, t, n) {
		let r = n.split(",").map((e) => e.trim()).filter(Boolean);
		Uo(e, t, "sizes", r.length ? r : "");
	}
	function Zo(e, t) {
		Po(e, `collection:${e}:${t}:colors`, (e) => {
			let n = e.entries.find((e) => e.id === t);
			n && (n.colors = [...n.colors ?? [], { name: Y("ph.colorName") }]);
		});
	}
	function $o(e, t, n, r, i) {
		Po(e, `edit:collection:${e}:${t}:color:${n}:${r}`, (e) => {
			let a = e.entries.find((e) => e.id === t)?.colors?.[n];
			a && (r === "image" && !i ? delete a.image : i && (a[r] = i));
		});
	}
	async function es(e, t, n, r) {
		let i = r.target.files?.[0];
		r.target.value = "", i && $o(e, t, n, "image", (await Yn(i)).dataUrl);
	}
	function ns(e, t, n) {
		Po(e, `collection:${e}:${t}:colors`, (e) => {
			let r = e.entries.find((e) => e.id === t);
			r?.colors && (r.colors = r.colors.filter((e, t) => t !== n), r.colors.length || delete r.colors);
		});
	}
	function ss(e) {
		let t = oo[e]?.data;
		if (!t) return;
		let n = URL.createObjectURL(new Blob([Qo(t.entries)], { type: "text/csv" })), r = document.createElement("a");
		r.href = n, r.download = `${e}.csv`, r.click(), URL.revokeObjectURL(n);
	}
	async function cs(e, t) {
		let n = t.target.files?.[0];
		if (t.target.value = "", !n) return;
		let r = ts(await n.text());
		if (!r) {
			S(Y("status.csvInvalid"), "error");
			return;
		}
		let i = /* @__PURE__ */ new Set();
		for (let e of r.entries) (!/^[a-z0-9][a-z0-9-]*$/.test(e.id) || i.has(e.id)) && (e.id = So("entry")), i.add(e.id);
		Po(e, `collection:${e}:import`, (e) => {
			e.entries = r.entries;
		}), S(Y("status.csvImported", { count: String(r.entries.length) }), "ok");
	}
	let ls = null, us, ds = new Promise((e) => {
		us = e;
	}), fs = /* @__PURE__ */ N(null), ps = an({}), ms = /* @__PURE__ */ N("0.0.0"), hs = /* @__PURE__ */ N(""), $ = /* @__PURE__ */ N(""), gs = /* @__PURE__ */ N(an([])), _s = /* @__PURE__ */ N(an([])), vs = /* @__PURE__ */ N("pending"), ys = () => [.../* @__PURE__ */ new Set([...z(fs)?.enabled ?? [], ...z(fs)?.disabled ?? []])];
	function bs() {
		P(fs, JSON.parse(JSON.stringify(ls.data)), !0);
	}
	let xs = /* @__PURE__ */ N(null);
	async function Ss() {
		try {
			let e = (await fetch("/urd.json", { cache: "no-store" })).headers.get("content-security-policy");
			if (!e) {
				P(xs, { unknown: !0 }, !0);
				return;
			}
			let t = (t) => new Set((e.split(";").map((e) => e.trim()).find((e) => e.startsWith(`${t} `)) ?? "").split(/\s+/).slice(1));
			P(xs, {
				frameSrc: t("frame-src"),
				connectSrc: t("connect-src"),
				scriptSrc: t("script-src")
			}, !0);
		} catch {
			P(xs, { unknown: !0 }, !0);
		}
	}
	function Cs(e) {
		let t = [
			...(e.scriptSrc ?? []).map((e) => ["script-src", e]),
			...(e.connectSrc ?? []).map((e) => ["connect-src", e]),
			...(e.frameSrc ?? []).map((e) => ["frame-src", e])
		];
		if (!z(xs) || z(xs).unknown) return [];
		let n = {
			"script-src": z(xs).scriptSrc,
			"connect-src": z(xs).connectSrc,
			"frame-src": z(xs).frameSrc
		};
		return t.filter(([e, t]) => !n[e]?.has(t)).map(([e, t]) => `${e} ${t}`);
	}
	async function ws() {
		Ss();
		let e = {
			version: 1,
			enabled: []
		};
		try {
			e = await (await fetch("/plugins/plugins.json")).json();
		} catch {}
		P(_s, e.enabled ?? [], !0), ls = Yi("urd-draft-plugins", () => e, C), bs();
		try {
			P(ms, (await (await fetch("/urd.json")).json()).engine ?? "0.0.0", !0);
		} catch {}
		for (let e of ys()) As(e);
		Ts(), us(), T?.sendPlugins(We(z(fs))?.enabled ?? []);
	}
	async function Ts() {
		try {
			let e = await fetch("/api/github/plugins");
			if (!e.ok) {
				Ds();
				return;
			}
			let { plugins: t } = await e.json();
			localStorage.setItem("urd-plugins-found", JSON.stringify(t ?? [])), P(gs, (t ?? []).filter((e) => !ys().includes(e)), !0);
			for (let e of z(gs)) As(e);
			P(vs, "ok");
		} catch {
			Ds();
		}
	}
	function Ds() {
		try {
			let e = JSON.parse(localStorage.getItem("urd-plugins-found") ?? "[]");
			if (Array.isArray(e) && e.length) {
				P(gs, e.filter((e) => !ys().includes(e)), !0);
				for (let e of z(gs)) As(e);
				P(vs, "ok");
				return;
			}
		} catch {}
		P(vs, "unavailable");
	}
	async function As(e) {
		try {
			let t = await (await fetch(`/plugins/${e}/plugin.json`)).json(), n = xo(t);
			ps[e] = {
				...t,
				errors: n,
				satisfied: n.length === 0 && yo(z(ms), t.requiresEngine)
			};
		} catch {
			ps[e] = {
				name: e,
				errors: [Y("plugin.manifestNotFound", { id: e })],
				satisfied: !1
			};
		}
	}
	function js(e, t) {
		Be("plugins");
		let n = ls.data;
		n.enabled = (n.enabled ?? []).filter((t) => t !== e), n.disabled = (n.disabled ?? []).filter((t) => t !== e), t ? n.enabled.push(e) : n.disabled.push(e), ls.save(), D(), bs(), Fs();
	}
	function Fs() {
		z(te) && (z(te).src = z(te).src);
	}
	function Rs(e) {
		Be("plugins");
		let t = ls.data;
		t.enabled = (t.enabled ?? []).filter((t) => t !== e), t.disabled = (t.disabled ?? []).filter((t) => t !== e), ls.save(), D(), bs(), Fs();
	}
	async function zs() {
		P($, "");
		let e = z(hs).trim().toLowerCase();
		if (!/^[a-z0-9][a-z0-9-]*$/.test(e)) {
			P($, Y("plugin.invalidId"), !0);
			return;
		}
		if (ys().includes(e)) {
			P($, Y("plugin.alreadyListed"), !0);
			return;
		}
		if (await As(e), ps[e].errors.length) {
			P($, Y("plugin.invalidManifest", { errors: ps[e].errors.join("; ") }), !0);
			return;
		}
		js(e, !0), P(hs, "");
	}
	function Gs(e) {
		P(gs, z(gs).filter((t) => t !== e), !0), js(e, !0);
	}
	function Ks(e, t) {
		ki(e, () => {
			z(E).footer ??= {
				version: 1,
				show: !1,
				text: "",
				align: "center"
			}, t(z(E).footer);
		});
	}
	function qs(e, t) {
		Ks(`edit:footer-brand-${e}`, (n) => {
			n.brand ??= {}, t.trim() ? n.brand[e] = t : delete n.brand[e], !n.brand.title && !n.brand.tagline && !n.brand.logo && delete n.brand;
		});
	}
	function Js(e) {
		Ks("footer", (t) => {
			t.brand ??= {}, e === "image" || e === "both" ? t.brand.mode = e : delete t.brand.mode;
		});
	}
	async function Ys(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await Yn(t);
			Ks("footer", (t) => {
				t.brand ??= {}, t.brand.logo = e.dataUrl, t.brand.mode || (t.brand.mode = "both");
			});
		} catch {
			S(Y("status.imageReadErrorSvg"), "error");
		}
	}
	function Xs() {
		Ks("footer", (e) => {
			e.brand && (delete e.brand.logo, delete e.brand.mode, delete e.brand.logoHeight, !e.brand.title && !e.brand.tagline && delete e.brand);
		});
	}
	function Zs(e) {
		Ks("edit:footer-logo-height", (t) => {
			t.brand ??= {};
			let n = Number(e);
			Number.isFinite(n) && (t.brand.logoHeight = Math.min(160, Math.max(16, Math.round(n))));
		});
	}
	function Qs(e) {
		Ks("edit:footer-copyright", (t) => {
			e.trim() ? t.copyright = e : delete t.copyright;
		});
	}
	let $s = [
		{
			id: "minimal",
			label: Y("footerTemplate.minimal"),
			thumb: {
				center: !0,
				social: 2,
				baselineLinks: 1
			}
		},
		{
			id: "centered",
			label: Y("footerTemplate.centered"),
			thumb: {
				center: !0,
				row: !0,
				social: 3
			}
		},
		{
			id: "columns",
			label: Y("footerTemplate.columns"),
			thumb: {
				tag: !0,
				cols: 3,
				social: 3,
				baselineLinks: 2
			}
		},
		{
			id: "sitemap",
			label: Y("footerTemplate.sitemap"),
			thumb: {
				tag: !0,
				fat: !0,
				cols: 4,
				social: 4,
				baselineLinks: 3
			}
		},
		{
			id: "newsletter",
			label: Y("footerTemplate.newsletter"),
			thumb: {
				tag: !0,
				cta: !0,
				cols: 2,
				social: 2,
				baselineLinks: 1
			}
		},
		{
			id: "bigcta",
			label: Y("footerTemplate.bigcta"),
			thumb: {
				center: !0,
				bigcta: !0,
				baselineLinks: 2
			}
		},
		{
			id: "contact",
			label: Y("footerTemplate.contact"),
			thumb: {
				tag: !0,
				cols: 3,
				social: 2,
				baselineLinks: 1
			}
		},
		{
			id: "mega",
			label: Y("footerTemplate.mega"),
			thumb: {
				tag: !0,
				mega: !0,
				cols: 2,
				social: 4,
				baselineLinks: 2
			}
		}
	];
	function ec(e) {
		let t = Y("seed.orgName"), n = z(E).pages ?? [], r = (e) => n.slice(0, e).map((e) => ({
			label: e.title || e.id,
			page: e.id
		})), i = (e) => e.map((e) => ({
			icon: e,
			url: `https://${e}.com`
		})), a = (e, t) => ({
			label: e,
			href: t
		}), o = `© ${t}`;
		return e === "minimal" ? {
			align: "center",
			brand: { title: t },
			social: i(["facebook", "instagram"]),
			copyright: o,
			baseline: [a(Y("seed.footer.privacy"), "#")]
		} : e === "centered" ? {
			align: "center",
			brand: { title: t },
			linkRow: r(5),
			social: i([
				"facebook",
				"instagram",
				"x"
			]),
			copyright: `${o} · ${Y("seed.footer.madeWith")}`
		} : e === "columns" ? {
			align: "left",
			brand: {
				title: t,
				tagline: Y("seed.footer.tagline1")
			},
			columns: [
				{
					title: Y("seed.footer.colPages"),
					links: r(4)
				},
				{
					title: Y("seed.footer.colCompany"),
					links: [
						a(Y("seed.footer.about"), "#"),
						a(Y("seed.join"), "#"),
						a(Y("seed.footer.press"), "#")
					]
				},
				{
					title: Y("seed.footer.colResources"),
					links: [
						a(Y("seed.footer.bylaws"), "#"),
						a(Y("seed.footer.privacy"), "#"),
						a(Y("seed.footer.contact"), "#")
					]
				}
			],
			social: i([
				"facebook",
				"instagram",
				"linkedin"
			]),
			copyright: o,
			baseline: [a(Y("seed.footer.privacy"), "#"), a(Y("seed.footer.terms"), "#")]
		} : e === "sitemap" ? {
			align: "left",
			brand: {
				title: t,
				tagline: Y("seed.footer.tagline2")
			},
			columns: [
				{
					title: Y("seed.footer.colExplore"),
					links: [
						a(Y("seed.footer.home"), "#"),
						a(Y("seed.footer.events"), "#"),
						a(Y("seed.footer.gallery"), "#"),
						a(Y("seed.footer.blog"), "#")
					]
				},
				{
					title: Y("seed.footer.colCompany"),
					links: [
						a(Y("seed.footer.about"), "#"),
						a(Y("seed.footer.history"), "#"),
						a(Y("seed.footer.press"), "#"),
						a(Y("seed.footer.contact"), "#")
					]
				},
				{
					title: Y("seed.footer.colSupport"),
					links: [
						a(Y("seed.join"), "#"),
						a(Y("seed.footer.faq"), "#"),
						a(Y("seed.footer.help"), "#")
					]
				},
				{
					title: Y("seed.footer.colLegal"),
					links: [
						a(Y("seed.footer.privacy"), "#"),
						a(Y("seed.footer.terms"), "#"),
						a(Y("seed.footer.bylaws"), "#")
					]
				}
			],
			social: i([
				"facebook",
				"instagram",
				"linkedin",
				"youtube"
			]),
			copyright: o,
			baseline: [
				a(Y("seed.footer.privacy"), "#"),
				a(Y("seed.footer.terms"), "#"),
				a(Y("seed.footer.cookies"), "#")
			]
		} : e === "newsletter" ? {
			align: "left",
			brand: {
				title: t,
				tagline: Y("seed.footer.tagline3")
			},
			cta: {
				kind: "newsletter",
				heading: Y("seed.footer.newsletterHeading"),
				label: Y("seed.footer.newsletterButton"),
				recipient: Y("seed.email"),
				success: Y("seed.footer.newsletterSuccess")
			},
			columns: [{
				title: Y("seed.footer.colPages"),
				links: r(4)
			}, {
				title: Y("seed.footer.colMore"),
				links: [
					a(Y("seed.footer.about"), "#"),
					a(Y("seed.footer.contact"), "#"),
					a(Y("seed.footer.privacy"), "#")
				]
			}],
			social: i(["facebook", "instagram"]),
			copyright: o,
			baseline: [a(Y("seed.footer.privacy"), "#")]
		} : e === "bigcta" ? {
			align: "center",
			cta: {
				kind: "button",
				big: !0,
				heading: Y("seed.footer.ctaHeading"),
				sub: Y("seed.footer.ctaSub"),
				label: Y("seed.join"),
				href: "#"
			},
			linkRow: r(4),
			social: i([
				"facebook",
				"instagram",
				"x"
			]),
			copyright: o,
			baseline: [a(Y("seed.footer.privacy"), "#"), a(Y("seed.footer.terms"), "#")]
		} : e === "contact" ? {
			align: "left",
			brand: {
				title: t,
				tagline: Y("seed.footer.tagline4")
			},
			columns: [
				{
					title: Y("seed.footer.colVisit"),
					links: [
						a(Y("seed.footer.address"), "#"),
						a(Y("seed.email"), "mailto:post@dinforening.no"),
						a("+47 22 00 00 00", "tel:+4722000000")
					]
				},
				{
					title: Y("seed.footer.colHours"),
					links: [a(Y("seed.footer.hours1"), "#"), a(Y("seed.footer.hours2"), "#")]
				},
				{
					title: Y("seed.footer.colPages"),
					links: r(4)
				}
			],
			social: i(["facebook", "instagram"]),
			copyright: o,
			baseline: [a(Y("seed.footer.privacy"), "#")]
		} : {
			align: "left",
			brand: {
				title: t,
				tagline: Y("seed.footer.tagline5")
			},
			columns: [{
				title: Y("seed.footer.colExplore"),
				links: r(4)
			}, {
				title: Y("seed.footer.colFollow"),
				links: [a(Y("seed.footer.newsletter"), "#"), a(Y("seed.email"), "mailto:post@dinforening.no")]
			}],
			social: i([
				"facebook",
				"instagram",
				"linkedin",
				"youtube"
			]),
			copyright: o,
			baseline: [a(Y("seed.footer.privacy"), "#"), a(Y("seed.footer.madeWith"), "#")],
			background: {
				version: 1,
				layers: [{
					type: "glow",
					version: rc.version ?? 1,
					props: {
						...rc.defaults(),
						color: "accent",
						x: .12,
						y: 0,
						radius: .6,
						opacity: .45
					}
				}, {
					type: "grain",
					version: ac.version ?? 1,
					props: {
						...ac.defaults(),
						opacity: .08
					}
				}]
			}
		};
	}
	function tc(e) {
		Ks("footer-template", (t) => {
			let n = ec(e);
			t.show = !0, delete t.text;
			for (let e of [
				"align",
				"brand",
				"columns",
				"social",
				"copyright",
				"baseline",
				"linkRow",
				"cta",
				"columnsAlign",
				"background"
			]) n[e] === void 0 ? delete t[e] : t[e] = n[e];
		});
	}
	function ic(e) {
		Ks("footer", (t) => {
			t[e] ??= [], t[e].push(z(E).pages[0] ? {
				label: Y("seed.link"),
				page: z(E).pages[0].id
			} : {
				label: Y("seed.link"),
				href: "https://"
			});
		});
	}
	function oc(e, t) {
		Ks("footer", (n) => {
			n[e].splice(t, 1), n[e].length || delete n[e];
		});
	}
	function sc(e, t, n) {
		Ks("footer", (r) => {
			let i = r[e], a = t + n;
			a < 0 || a >= i.length || ([i[t], i[a]] = [i[a], i[t]]);
		});
	}
	function cc(e, t, n) {
		Ks(`edit:footer-${e}-label-${t}`, (r) => {
			r[e][t].label = n;
		});
	}
	function lc(e, t, n) {
		Ks("footer", (r) => {
			let i = r[e][t];
			n === "__href" ? (delete i.page, i.href = i.href ?? "https://") : (i.page = n, delete i.href);
		});
	}
	function uc(e, t, n) {
		Ks(`edit:footer-${e}-href-${t}`, (r) => {
			r[e][t].href = n;
		});
	}
	function dc(e) {
		Ks("footer", (t) => {
			e === "center" ? t.columnsAlign = "center" : delete t.columnsAlign;
		});
	}
	function fc(e) {
		Ks("footer", (t) => {
			e ? t.cta ??= {
				kind: "button",
				label: Y("seed.join")
			} : delete t.cta;
		});
	}
	function pc(e, t) {
		Ks(`edit:footer-cta-${e}`, (n) => {
			n.cta ??= {}, t === "" || t == null || t === !1 ? delete n.cta[e] : n.cta[e] = t;
		});
	}
	function mc(e) {
		Ks("footer", (t) => {
			t.cta ??= {}, e === "__href" ? (delete t.cta.page, t.cta.href = t.cta.href ?? "https://") : (t.cta.page = e, delete t.cta.href);
		});
	}
	function hc(e, t) {
		Ks("footer", (n) => {
			let r = new Set(n.hideOn ?? []);
			t ? r.delete(e) : r.add(e), r.size ? n.hideOn = [...r] : delete n.hideOn;
		});
	}
	function gc() {
		Ks("footer", (e) => {
			e.columns ??= [], e.columns.push({
				title: Y("seed.column"),
				links: [{
					label: Y("seed.link"),
					page: z(E).pages[0].id
				}]
			});
		});
	}
	function _c(e) {
		Ks("footer", (t) => {
			t.columns.splice(e, 1), t.columns.length || delete t.columns;
		});
	}
	function vc(e, t) {
		Ks("footer", (n) => {
			let r = e + t;
			r < 0 || r >= n.columns.length || ([n.columns[e], n.columns[r]] = [n.columns[r], n.columns[e]]);
		});
	}
	function yc(e, t) {
		Ks(`edit:footer-col-title-${e}`, (n) => {
			n.columns[e].title = t;
		});
	}
	function bc(e) {
		Ks("footer", (t) => {
			t.columns[e].links ??= [], t.columns[e].links.push({
				label: Y("seed.link"),
				page: z(E).pages[0].id
			});
		});
	}
	function xc(e, t) {
		Ks("footer", (n) => {
			n.columns[e].links.splice(t, 1);
		});
	}
	function Sc(e, t, n) {
		Ks("footer", (r) => {
			let i = r.columns[e].links, a = t + n;
			a < 0 || a >= i.length || ([i[t], i[a]] = [i[a], i[t]]);
		});
	}
	function Cc(e, t, n) {
		Ks(`edit:footer-link-label-${e}-${t}`, (r) => {
			r.columns[e].links[t].label = n;
		});
	}
	function wc(e, t, n) {
		Ks("footer", (r) => {
			let i = r.columns[e].links[t];
			n === "__href" ? (delete i.page, i.href = i.href ?? "https://") : (i.page = n, delete i.href);
		});
	}
	function Tc(e, t, n) {
		Ks(`edit:footer-link-href-${e}-${t}`, (r) => {
			r.columns[e].links[t].href = n;
		});
	}
	function Ec() {
		Ks("footer", (e) => {
			e.social ??= [], e.social.push({
				icon: "facebook",
				url: "https://"
			});
		});
	}
	function Dc(e) {
		Ks("footer", (t) => {
			t.social.splice(e, 1), t.social.length || delete t.social;
		});
	}
	function Oc(e, t) {
		Ks("footer", (n) => {
			let r = e + t;
			r < 0 || r >= n.social.length || ([n.social[e], n.social[r]] = [n.social[r], n.social[e]]);
		});
	}
	function Ac(e, t) {
		Ks("footer", (n) => {
			n.social[e].icon = t;
		});
	}
	function jc(e, t) {
		Ks(`edit:footer-social-url-${e}`, (n) => {
			n.social[e].url = t;
		});
	}
	let Mc = ka.filter(([e]) => e === "iconCat.social" || e === "iconCat.communication").flatMap(([, e]) => e.map((e) => [e, Y(Oa[e].labelKey)]));
	function Nc(e, t) {
		ki(`edit:nav-label-${e}`, () => {
			z(E).nav.items[e].label = t;
		});
	}
	function Fc(e, t) {
		ki("nav", () => {
			let n = z(E).nav.items[e];
			t === "__href" ? (delete n.page, n.href = n.href ?? "https://") : t === "__none" ? (delete n.page, delete n.href) : (n.page = t, delete n.href);
		});
	}
	function Ic(e, t) {
		ki(`edit:nav-href-${e}`, () => {
			z(E).nav.items[e].href = t;
		});
	}
	function Lc(e, t) {
		let n = e + t, r = z(E).nav.items;
		n < 0 || n >= r.length || ki("nav", () => {
			[r[e], r[n]] = [r[n], r[e]];
		});
	}
	function Rc(e) {
		ki("nav", () => {
			z(E).nav.items.splice(e, 1);
		});
	}
	function zc() {
		ki("nav", () => {
			z(E).nav.items.push({
				label: Y("seed.link"),
				page: z(E).pages[0].id
			});
		});
	}
	function Hc(e) {
		ki("nav", () => {
			let t = z(E).nav.items[e];
			t.children ??= [], t.children.push({
				label: Y("seed.link"),
				page: z(E).pages[0].id
			});
		});
	}
	function Uc(e, t, n) {
		ki(`edit:nav-child-label-${e}-${t}`, () => {
			z(E).nav.items[e].children[t].label = n;
		});
	}
	function Wc(e, t, n) {
		ki("nav", () => {
			let r = z(E).nav.items[e].children[t];
			n === "__href" ? (delete r.page, r.href = r.href ?? "https://") : (r.page = n, delete r.href);
		});
	}
	function Cf(e, t, n) {
		ki(`edit:nav-child-href-${e}-${t}`, () => {
			z(E).nav.items[e].children[t].href = n;
		});
	}
	function wf(e, t, n) {
		let r = t + n, i = z(E).nav.items[e].children;
		r < 0 || r >= i.length || ki("nav", () => {
			[i[t], i[r]] = [i[r], i[t]];
		});
	}
	function Tf(e, t) {
		ki("nav", () => {
			let n = z(E).nav.items[e];
			n.children.splice(t, 1), n.children.length === 0 && (delete n.children, !n.page && !n.href && (n.page = z(E).pages[0].id));
		});
	}
	function Ef(e, t) {
		ki(`edit:theme-color-${e}`, () => {
			z(E).theme.tokens.color[e] = t, z(E).theme.alt?.auto && (z(E).theme.alt.tokens.color = Af());
		});
	}
	function Df(e, t) {
		ki("theme", () => {
			z(E).theme.tokens.font[e] = t;
		});
	}
	function Of(e, t) {
		ki("theme", () => {
			z(E).theme.tokens.radius[e] = t;
		});
	}
	function kf(e) {
		let t = /^#([0-9a-f]{6})$/i.exec(e ?? "");
		if (!t) return e;
		let [n, r, i] = [
			0,
			2,
			4
		].map((e) => parseInt(t[1].slice(e, e + 2), 16) / 255), a = Math.max(n, r, i), o = Math.min(n, r, i), s = 0, c = (a + o) / 2, l = a - o, u = l === 0 ? 0 : l / (1 - Math.abs(2 * c - 1));
		l !== 0 && (s = a === n ? (r - i) / l % 6 : a === r ? (i - n) / l + 2 : (n - r) / l + 4, s = (s * 60 + 360) % 360);
		let d = 1 - c, f = (1 - Math.abs(2 * d - 1)) * u, p = f * (1 - Math.abs(s / 60 % 2 - 1)), m = d - f / 2, [h, g, _] = s < 60 ? [
			f,
			p,
			0
		] : s < 120 ? [
			p,
			f,
			0
		] : s < 180 ? [
			0,
			f,
			p
		] : s < 240 ? [
			0,
			p,
			f
		] : s < 300 ? [
			p,
			0,
			f
		] : [
			f,
			0,
			p
		], v = (e) => Math.round((e + m) * 255).toString(16).padStart(2, "0");
		return `#${v(h)}${v(g)}${v(_)}`;
	}
	function Af() {
		return Object.fromEntries(Object.entries(z(E).theme.tokens.color).map(([e, t]) => [e, kf(t)]));
	}
	function jf(e, t) {
		ki(`edit:theme-alt-${e}`, () => {
			z(E).theme.alt.tokens.color[e] = t, z(E).theme.alt.auto = !1;
		});
	}
	function Mf(e) {
		ki("theme", () => {
			e === "light" ? delete z(E).theme.scheme : z(E).theme.scheme = e;
		});
	}
	function Nf(e) {
		ki("theme", () => {
			e ? z(E).theme.alt = {
				auto: !0,
				tokens: { color: Af() }
			} : delete z(E).theme.alt;
		});
	}
	function Pf(e) {
		ki("theme", () => {
			z(E).theme.alt ??= { tokens: { color: Af() } }, z(E).theme.alt.auto = e, e && (z(E).theme.alt.tokens.color = Af());
		});
	}
	function Ff(e) {
		let t = z(E).theme.tokens.font[e];
		return [...Kc.some(([, e]) => e === t) ? [] : [[t, Y("opt.customFont")]], ...Kc.map(([e, t]) => [t, Y(e)])];
	}
	let If = (e) => parseInt(e, 10) || 0;
	function Lf(e, t) {
		Of(e, `${t}px`);
	}
	let Rf = (e, t) => e && t && t[e] ? t[e] : e, zf = [
		"bg",
		"surface",
		"text",
		"accent",
		"accent-text"
	], Bf = [
		{
			id: "bronn",
			name: Y("themePreset.bronn.name"),
			note: Y("themePreset.bronn.note"),
			light: {
				bg: "#f6faf8",
				surface: "#ffffff",
				text: "#16211d",
				accent: "#15b39a",
				"accent-text": "#04241d"
			},
			dark: {
				bg: "#0e1512",
				surface: "#17211d",
				text: "#eaf1ed",
				accent: "#22c3a8",
				"accent-text": "#04241d"
			}
		},
		{
			id: "stein",
			name: Y("themePreset.stein.name"),
			note: Y("themePreset.stein.note"),
			light: {
				bg: "#f4f2ed",
				surface: "#ffffff",
				text: "#262019",
				accent: "#8a5a41",
				"accent-text": "#ffffff"
			},
			dark: {
				bg: "#17130e",
				surface: "#221c15",
				text: "#efe8dd",
				accent: "#c0906f",
				"accent-text": "#1a1109"
			}
		},
		{
			id: "plomme",
			name: Y("themePreset.plomme.name"),
			note: Y("themePreset.plomme.note"),
			light: {
				bg: "#faf5ff",
				surface: "#ffffff",
				text: "#2a1546",
				accent: "#7c3aed",
				"accent-text": "#ffffff"
			},
			dark: {
				bg: "#140f20",
				surface: "#1f1733",
				text: "#ece5f8",
				accent: "#a97cf6",
				"accent-text": "#170a2c"
			}
		},
		{
			id: "rose",
			name: Y("themePreset.rose.name"),
			note: Y("themePreset.rose.note"),
			light: {
				bg: "#faf5f6",
				surface: "#ffffff",
				text: "#241a1d",
				accent: "#b04a63",
				"accent-text": "#ffffff"
			},
			dark: {
				bg: "#171015",
				surface: "#22181c",
				text: "#f1e6ea",
				accent: "#d98098",
				"accent-text": "#2a0f18"
			}
		},
		{
			id: "hav",
			name: Y("themePreset.hav.name"),
			note: Y("themePreset.hav.note"),
			light: {
				bg: "#f1f6fb",
				surface: "#ffffff",
				text: "#13202b",
				accent: "#1a6fa8",
				"accent-text": "#ffffff"
			},
			dark: {
				bg: "#0a1420",
				surface: "#12202f",
				text: "#e2edf5",
				accent: "#47a6df",
				"accent-text": "#06131f"
			}
		},
		{
			id: "natt",
			name: Y("themePreset.natt.name"),
			note: Y("themePreset.natt.note"),
			scheme: "dark",
			light: {
				bg: "#f5f6fb",
				surface: "#ffffff",
				text: "#171a2b",
				accent: "#4f5ed6",
				"accent-text": "#ffffff"
			},
			dark: {
				bg: "#0d0f1a",
				surface: "#171b2e",
				text: "#e7e9f5",
				accent: "#8091ff",
				"accent-text": "#0a0c18"
			}
		}
	];
	function Vf(e) {
		ki("theme", () => {
			let t = e.scheme === "dark", n = t ? e.dark : e.light, r = t ? e.light : e.dark;
			for (let e of zf) z(E).theme.tokens.color[e] = n[e];
			t ? z(E).theme.scheme = "dark" : delete z(E).theme.scheme, z(E).theme.alt = { tokens: { color: { ...r } } };
		});
	}
	let Hf = /* @__PURE__ */ A(() => {
		if (!z(E)) return null;
		let e = z(E).theme.tokens.color, t = z(E).theme.alt?.tokens?.color ?? {}, n = z(E).theme.scheme === "dark";
		return Bf.find((r) => {
			let i = n ? r.dark : r.light, a = n ? r.light : r.dark;
			return zf.every((n) => e[n] === i[n] && t[n] === a[n]);
		})?.id ?? null;
	});
	function Uf() {
		P(ie, !z(ie)), T?.sendChrome(z(ie));
	}
	function Wf(e) {
		let t = w.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		n && (Be(`edit:${e.blockId}`), n.props = e.props, w.save(), D(), z(k)?.blockId === e.blockId && Et(), e.rerender && T?.sendSection(z(_), t), P(y, ""));
	}
	function Gf(e) {
		let t = w.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		if (!n) return;
		Be(e.coalesce ? `edit:${e.groupKey ?? e.blockId}` : "move-block");
		let r = e.frameKey === "mobile" ? "mobile" : "desktop";
		n.frames[r] = e.frame, r === "desktop" && ke(t, "desktop-changed-after-mobile"), w.save(), D(), z(k)?.blockId === e.blockId && Et();
	}
	function Kf(e) {
		let t = w.data.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
		!t?.frames?.desktop || t.frames.desktop.h === e.h || (w.amendBaseline((t) => {
			let n = t.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
			n?.frames?.desktop && (n.frames.desktop.h = e.h);
		}), w.hasDraft() && Be(`edit:${e.blockId}`), t.frames.desktop.h = e.h, w.save(), D(), z(k)?.blockId === e.blockId && Et());
	}
	function qf(e) {
		let t = w.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			if (Be("mobile-reset"), e.blockId) {
				let n = t.blocks.find((t) => t.id === e.blockId);
				n && (n.frames.mobile = null);
			} else for (let e of t.blocks) e.frames.mobile = null;
			!Oe(t) && t.responsive?.mobile && (t.responsive.mobile.attention = null), w.save(), D(), Te(), T?.sendSection(z(_), t);
		}
	}
	function Jf(e) {
		let t = w.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		!n || typeof e.mobileOrder != "number" || (Be("mobile-order"), n.mobileOrder = e.mobileOrder, w.save(), D(), T?.sendSection(z(_), t));
	}
	function Yf(e) {
		let t = w.data.sections.find((t) => t.id === e.sectionId);
		t?.responsive?.mobile && (Be("review-done"), t.responsive.mobile.attention = null, w.save(), D(), Te());
	}
	function Xf(e) {
		let t = w.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		n && (Be("block-flag"), typeof e.decor == "boolean" && (n.decor = e.decor), typeof e.hideMobile == "boolean" && (n.hideMobile = e.hideMobile), w.save(), D(), typeof e.hideMobile == "boolean" && z(ce) === "mobile" && T?.sendSection(z(_), t), z(k)?.blockId === e.blockId && Et());
	}
	function Zf(e) {
		Be("add-section"), e.section.id || (e.section.id = So("sec")), w.data.sections.splice(e.index, 0, e.section), w.save(), D(), T?.sendPage(z(_), w.data), P(ln, e.section.id, !0), gn(e.section), P(ft, "properties");
	}
	function Qf(e) {
		let t = w.data.sections, n = t.findIndex((t) => t.id === e.sectionId), r = n + e.dir;
		n < 0 || r < 0 || r >= t.length || (Be("move-section"), [t[n], t[r]] = [t[r], t[n]], w.save(), D(), T?.sendPage(z(_), w.data));
	}
	function $f(e) {
		Be("delete-section"), e.sectionId === z(ln) && (P(ln, null), P(un, null)), z(k)?.sectionId === e.sectionId && P(k, null), w.data.sections = w.data.sections.filter((t) => t.id !== e.sectionId), w.save(), D(), T?.sendPage(z(_), w.data);
	}
	function ep(e) {
		let t = w.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			Be("section-size"), t.size = {
				...t.size,
				minHeight: e.minHeight
			};
			for (let n of e.moves ?? []) {
				let e = t.blocks.find((e) => e.id === n.blockId);
				e && (e.frames.desktop = {
					...e.frames.desktop,
					y: e.frames.desktop.y + n.dy
				});
			}
			e.moves?.length && (ke(t, "section-height"), z(k)?.sectionId === e.sectionId && Et()), e.sectionId === z(ln) && P(dn, e.minHeight, !0), w.save(), D();
		}
	}
	function tp(e) {
		let t = w.data.sections.find((t) => t.id === e.fromSectionId), n = w.data.sections.find((t) => t.id === e.toSectionId), r = t?.blocks.find((t) => t.id === e.blockId);
		!t || !n || !r || (Be("move-block"), t.blocks = t.blocks.filter((t) => t.id !== e.blockId), r.frames.desktop = e.frame, r.frames.mobile = null, n.blocks.push(r), ke(t, "block-moved"), ke(n, "block-moved"), w.save(), D(), Te(), T?.sendPage(z(_), w.data), z(k)?.blockId === e.blockId && (P(k, {
			...z(k),
			sectionId: e.toSectionId
		}, !0), Et()));
	}
	function np(e) {
		let t = w.data.sections.find((t) => t.id === e.sectionId);
		if (!t) return;
		let n = e.blockIds ?? [e.blockId];
		Be("delete-block"), t.blocks = t.blocks.filter((e) => !n.includes(e.id)), n.includes(z(k)?.blockId) && P(k, null), ke(t, "block-deleted"), w.save(), D(), T?.sendSection(z(_), t);
	}
	let rp = {
		text: {
			type: "text",
			props: {
				html: Y("seed.text"),
				align: "left"
			},
			w: 33,
			h: 28
		},
		"text-box": {
			type: "text",
			props: {
				html: Y("seed.textBox"),
				align: "left",
				box: !0
			},
			w: 30,
			h: 150
		},
		button: {
			type: "button",
			props: {
				label: Y("seed.newButton"),
				page: null,
				href: null,
				style: "primary"
			},
			w: 20,
			h: 36
		},
		"shape-line": {
			type: "shape",
			decor: !0,
			hideMobile: !0,
			props: {
				kind: "line",
				color: "accent",
				thickness: 2,
				fill: null
			},
			w: 25,
			h: 8
		},
		"shape-arrow": {
			type: "shape",
			decor: !0,
			hideMobile: !0,
			props: {
				kind: "arrow",
				color: "accent",
				thickness: 2,
				fill: null
			},
			w: 25,
			h: 16
		},
		"shape-circle": {
			type: "shape",
			decor: !0,
			hideMobile: !0,
			props: {
				kind: "circle",
				color: "accent",
				thickness: 2,
				fill: null
			},
			w: 10,
			h: 110
		},
		"shape-rect": {
			type: "shape",
			decor: !0,
			hideMobile: !0,
			props: {
				kind: "rect",
				color: "accent",
				thickness: 2,
				fill: null
			},
			w: 20,
			h: 110
		},
		"shape-triangle": {
			type: "shape",
			decor: !0,
			hideMobile: !0,
			props: {
				kind: "triangle",
				color: "accent",
				thickness: 2,
				fill: null
			},
			w: 10,
			h: 110
		},
		image: {
			type: "image",
			props: {
				src: "",
				alt: "",
				fit: "cover",
				radius: "md",
				href: null
			},
			w: 30,
			h: 220
		},
		video: {
			type: "video",
			props: {
				url: "",
				title: "Video"
			},
			w: 45,
			h: 300
		},
		icon: {
			type: "icon",
			decor: !0,
			hideMobile: !0,
			props: {
				glyph: "★",
				color: "accent",
				size: 48
			},
			w: 8,
			h: 64
		},
		collection: {
			type: "collection",
			props: {
				collection: null,
				view: "cards",
				limit: 6,
				newestFirst: !0
			},
			w: 90,
			h: 200
		},
		gallery: {
			type: "gallery",
			props: {
				images: [],
				view: "grid",
				columns: 3,
				gap: 12,
				radius: "md",
				lightbox: !0,
				interval: 5
			},
			w: 90,
			h: 320
		},
		faq: {
			type: "faq",
			props: {
				items: [
					{
						q: Y("seed.faq.q1"),
						a: Y("seed.faq.answer")
					},
					{
						q: Y("seed.faq.q2"),
						a: Y("seed.faq.answer")
					},
					{
						q: Y("seed.faq.q3"),
						a: Y("seed.faq.answer")
					}
				],
				multi: !1
			},
			w: 50,
			h: 220
		},
		timeline: {
			type: "timeline",
			props: {
				items: [
					{
						year: "2019",
						title: Y("seed.timeline.t1"),
						text: Y("seed.timeline.text")
					},
					{
						year: "2022",
						title: Y("seed.timeline.t2"),
						text: Y("seed.timeline.text")
					},
					{
						year: "2026",
						title: Y("seed.timeline.t3"),
						text: Y("seed.timeline.text")
					}
				],
				variant: "left",
				marker: "filled",
				accent: null
			},
			w: 42,
			h: 260
		},
		quote: {
			type: "quote",
			props: {
				text: Y("seed.quoteBlock.text"),
				attribution: Y("seed.quoteBlock.name"),
				role: Y("seed.quoteBlock.role"),
				variant: "large",
				image: "",
				accent: null
			},
			w: 44,
			h: 180
		},
		stats: {
			type: "stats",
			props: {
				value: "4800",
				prefix: "",
				suffix: "+",
				label: Y("seed.statsBlock.label"),
				countUp: !0
			},
			w: 20,
			h: 90
		},
		table: {
			type: "table",
			props: {
				header: !0,
				striped: !1,
				lines: "rows",
				rows: [
					[
						Y("seed.table.h1"),
						Y("seed.table.h2"),
						Y("seed.table.h3")
					],
					[
						Y("seed.table.r1c1"),
						Y("seed.table.r1c2"),
						""
					],
					[
						Y("seed.table.r2c1"),
						Y("seed.table.r2c2"),
						""
					]
				]
			},
			w: 50,
			h: 160
		},
		share: {
			type: "share",
			props: {
				services: [
					"facebook",
					"x",
					"linkedin",
					"whatsapp",
					"email",
					"copy"
				],
				variant: "icons",
				size: 38,
				color: ""
			},
			w: 34,
			h: 48
		},
		countdown: {
			type: "countdown",
			props: {
				target: (() => {
					let e = new Date(Date.now() + 2592e6), t = (e) => String(e).padStart(2, "0");
					return `${e.getFullYear()}-${t(e.getMonth() + 1)}-${t(e.getDate())}T18:00`;
				})(),
				doneText: Y("seed.countdown.done"),
				variant: "boxes",
				showSeconds: !0
			},
			w: 40,
			h: 110
		},
		audio: {
			type: "audio",
			props: {
				src: "",
				title: "",
				loop: !1
			},
			w: 34,
			h: 80
		},
		product: {
			type: "product",
			props: {
				collection: null,
				limit: 0,
				columns: 0,
				currency: "kr"
			},
			w: 90,
			h: 300
		},
		cart: {
			type: "cart",
			props: {
				variant: "button",
				href: "",
				currency: "kr"
			},
			w: 16,
			h: 48
		},
		checkout: {
			type: "checkout",
			props: {
				recipient: "",
				endpoint: "",
				vipps: "",
				currency: "kr",
				vippsCheckout: !1
			},
			w: 44,
			h: 430
		}
	};
	function ip(e) {
		let t = rp[e];
		return t ? {
			id: So("blk"),
			type: t.type,
			version: 1,
			decor: !!t.decor,
			hideMobile: !!t.hideMobile,
			props: structuredClone(t.props),
			animation: null,
			frames: {
				desktop: {
					x: 4,
					y: 8,
					w: t.w,
					h: t.h,
					z: 1,
					rot: 0
				},
				mobile: null
			}
		} : null;
	}
	function ap(e) {
		T ? T.sendPlaceBlock(e) : op(Nr()?.id, e);
	}
	function op(e, t) {
		let n = w.data.sections.find((t) => t.id === e) ?? w.data.sections[0];
		if (!n) return;
		Be("add-block");
		let r = Math.max(0, ...n.blocks.map((e) => e.frames?.desktop?.z ?? 1)) + 1;
		t.frames?.desktop && (t.frames.desktop = {
			...t.frames.desktop,
			z: r
		}), n.blocks.push(t), ke(n, "block-added"), w.save(), D(), T?.sendSection(z(_), n);
	}
	function sp(e, t, n, r) {
		let i = w.data.sections.find((t) => t.id === e);
		if (!i || !t?.length) return;
		Be("add-blocks");
		for (let e of r ?? []) {
			let t = i.blocks.find((t) => t.id === e.blockId);
			t && typeof e.dy == "number" && (t.frames.desktop = {
				...t.frames.desktop,
				y: t.frames.desktop.y + e.dy
			});
		}
		i.blocks.push(...t);
		let a = String(i.size?.minHeight ?? "");
		n && a.endsWith("px") && Number.parseFloat(a) < n && (i.size = {
			...i.size,
			minHeight: `${n}px`
		}), ke(i, "block-added"), w.save(), D(), T?.sendSection(z(_), i);
	}
	function cp(e) {
		ap(ip(e));
	}
	let lp = /* @__PURE__ */ N(an([]));
	function up(e, t = {}) {
		let n = We(e);
		ap({
			id: So("blk"),
			type: n.type,
			version: n.version ?? 1,
			decor: !1,
			props: {
				...n.defaults ?? {},
				...We(t)
			},
			animation: null,
			frames: {
				desktop: {
					x: 25,
					y: 40,
					w: 50,
					h: 260,
					z: 1,
					rot: 0
				},
				mobile: null
			}
		});
	}
	let dp = /* @__PURE__ */ N("");
	function fp() {
		let e = [
			{
				label: Y("blocks.text"),
				act: "block",
				kind: "text"
			},
			{
				label: Y("ui.textBox"),
				act: "block",
				kind: "text-box"
			},
			{
				label: Y("blocks.button"),
				act: "block",
				kind: "button"
			},
			{
				label: Y("blocks.image"),
				act: "image"
			},
			{
				label: Y("blocks.video"),
				act: "block",
				kind: "video"
			},
			{
				label: Y("blocks.icon"),
				act: "block",
				kind: "icon"
			},
			{
				label: Y("blocks.collection"),
				act: "block",
				kind: "collection"
			},
			{
				label: Y("blocks.faq"),
				act: "block",
				kind: "faq"
			},
			{
				label: Y("blocks.timeline"),
				act: "block",
				kind: "timeline"
			},
			{
				label: Y("blocks.quote"),
				act: "block",
				kind: "quote"
			},
			{
				label: Y("blocks.stats"),
				act: "block",
				kind: "stats"
			},
			{
				label: Y("blocks.table"),
				act: "block",
				kind: "table"
			},
			{
				label: Y("blocks.share"),
				act: "block",
				kind: "share"
			},
			{
				label: Y("blocks.countdown"),
				act: "block",
				kind: "countdown"
			},
			{
				label: Y("blocks.audio"),
				act: "block",
				kind: "audio"
			},
			{
				label: Y("blocks.product"),
				act: "block",
				kind: "product"
			},
			{
				label: Y("blocks.cart"),
				act: "block",
				kind: "cart"
			},
			{
				label: Y("blocks.checkout"),
				act: "block",
				kind: "checkout"
			},
			{
				label: Y("ui.emptyGallery"),
				act: "block",
				kind: "gallery"
			},
			{
				label: Y("ui.galleryWithImages"),
				act: "galleryImages"
			},
			{
				label: Y("shape.line"),
				act: "block",
				kind: "shape-line"
			},
			{
				label: Y("shape.arrow"),
				act: "block",
				kind: "shape-arrow"
			},
			{
				label: Y("shape.circle"),
				act: "block",
				kind: "shape-circle"
			},
			{
				label: Y("shape.rect"),
				act: "block",
				kind: "shape-rect"
			},
			{
				label: Y("shape.triangle"),
				act: "block",
				kind: "shape-triangle"
			}
		];
		for (let t of z(Q)) {
			let n = bo[t]?.data?.mal;
			n?.kind === "blocks" && e.push({
				label: n.name,
				act: "template",
				id: t
			});
		}
		for (let t of z(lp)) if (t.variants?.length) for (let n of t.variants) e.push({
			label: `${t.label}: ${n.label}`,
			act: "plugin",
			entry: t,
			props: n.props
		});
		else e.push({
			label: t.label,
			act: "plugin",
			entry: t
		});
		return e;
	}
	function pp(e) {
		e.act === "block" ? cp(e.kind) : e.act === "plugin" ? up(e.entry, e.props ?? {}) : e.act === "template" && T?.sendInsertTemplate(e.id);
	}
	function mp(e) {
		let t = ip(e.kind);
		if (t) {
			if (e.at && typeof e.at.x == "number" && typeof e.at.y == "number") {
				let n = w.data.sections.find((t) => t.id === e.sectionId)?.grid ?? z(E).grid, r = qc({
					x: e.at.x,
					y: e.at.y,
					w: t.frames.desktop.w,
					h: t.frames.desktop.h,
					grid: n
				});
				t.frames.desktop.x = r.x, t.frames.desktop.y = r.y;
			} else t.frames.desktop.x = Math.round((100 - t.frames.desktop.w) / 2 * 100) / 100, t.frames.desktop.y = 40;
			op(e.sectionId, t), T?.sendSelect(t.id), e.kind === "image" && S(Y("status.imageBlockAdded")), e.kind === "gallery" && S(Y("status.galleryBlockAdded"));
		}
	}
	async function hp(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		S(Y("status.compressingImage"));
		let n;
		try {
			n = await Yn(t);
		} catch {
			S(Y("status.imageReadError"), "error");
			return;
		}
		let r = Math.round(n.height / n.width * .3 * (z(te)?.clientWidth ?? 1280));
		ap({
			id: So("blk"),
			type: "image",
			version: 1,
			props: {
				src: n.dataUrl,
				alt: ya(t.name).replaceAll("-", " "),
				fit: "cover",
				radius: "md",
				href: null
			},
			animation: null,
			frames: {
				desktop: {
					x: 4,
					y: 8,
					w: 30,
					h: Math.max(40, r),
					z: 1,
					rot: 0
				},
				mobile: null
			}
		}), n.bytes > 4e5 ? S(Y("status.imageLarge", { kb: Math.round(n.bytes / 1024) }), "error") : S("");
	}
	async function gp(e) {
		let t = [], n = 0, r = 0;
		for (let i of e) try {
			let e = await Yn(i);
			e.bytes > 4e5 && (r += 1), t.push({
				src: e.dataUrl,
				alt: ya(i.name).replaceAll("-", " "),
				href: null,
				style: {}
			});
		} catch {
			n += 1;
		}
		return {
			images: t,
			failed: n,
			big: r
		};
	}
	function _p(e, t, n) {
		t ? S(Y("status.imagesReadFailed", { n: t }), "error") : n ? S(Y("status.imagesLarge", { n }), "error") : S(e ? "" : Y("status.noImagesAdded"));
	}
	async function vp(e) {
		let t = [...e.target.files ?? []];
		if (e.target.value = "", !t.length) return;
		S(Y("status.compressingImages"));
		let { images: n, failed: r, big: i } = await gp(t);
		n.length && j("gallery-add", (e) => {
			e.props.images.push(...n);
		}), _p(n.length, r, i);
	}
	async function yp(e) {
		let t = [...e.target.files ?? []];
		if (e.target.value = "", !t.length) return;
		S(Y("status.compressingImages"));
		let { images: n, failed: r, big: i } = await gp(t);
		if (!n.length) {
			_p(0, r, i);
			return;
		}
		let a = ip("gallery");
		a.props.images = n, ap(a), _p(n.length, r, i);
	}
	function bp(e, t) {
		j("galleri-move", (n) => {
			let r = e + t;
			r < 0 || r >= n.props.images.length || ([n.props.images[e], n.props.images[r]] = [n.props.images[r], n.props.images[e]]);
		});
	}
	function xp(e) {
		j("galleri-remove", (t) => {
			t.props.images.splice(e, 1);
		});
	}
	function Sp(e, t, n) {
		j(`edit:${z(k).blockId}:img${e}-${t}`, (r) => {
			r.props.images[e][t] = n;
		});
	}
	function Cp(e, t, n, r) {
		let i = e?.[t];
		if (!i?.startsWith("data:image/") && !i?.startsWith("data:audio/") && !i?.startsWith("data:video/")) return;
		let a = i.split(",", 2)[1], o = `media/${ya(n || "image")}-${ba(a)}.${va(i)}`;
		r.push({
			path: o,
			content: a,
			encoding: "base64"
		}), e[t] = `/${o}`;
	}
	function wp(e, t) {
		Cp(e, "image", e.title, t);
		for (let n of e.colors ?? []) Cp(n, "image", `${e.title}-${n.name}`, t);
	}
	function Tp(e, t) {
		for (let n of e?.layers ?? []) {
			if (n.type === "image" && Cp(n.props, "src", "background", t), n.type === "slideshow") for (let e of n.props.images ?? []) Cp(e, "src", "background", t);
			n.type === "video" && (Cp(n.props, "src", "video", t), Cp(n.props, "poster", "plakat", t));
		}
	}
	function Ep(e, t) {
		if (e.type === "image" && Cp(e.props, "src", e.props.alt, t), e.type === "icon" && Cp(e.props, "image", "ikon", t), e.type === "gallery") for (let n of e.props.images ?? []) Cp(n, "src", n.alt || "gallery", t);
		e.type === "audio" && Cp(e.props, "src", e.props.title || "lyd", t);
	}
	function Dp(e, t) {
		Tp(e.background, t);
		for (let n of e.blocks) Ep(n, t);
	}
	function Op(e) {
		let t = [];
		e.meta?.og && Cp(e.meta.og, "image", "share", t);
		for (let n of e.sections) Dp(n, t);
		return t;
	}
	function kp(e) {
		let t = [], n = e.nav?.logo;
		return n?.type === "image" && Cp(n, "value", "logo", t), n?.type === "both" && Cp(n, "image", "logo", t), e.nav?.style && Cp(e.nav.style, "image", "menu", t), Tp(e.nav?.style?.background, t), Tp(e.footer?.background, t), e.footer?.brand && Cp(e.footer.brand, "logo", "footer-logo", t), Cp(e.site, "icon", "ikon", t), t;
	}
	let Ap = /* @__PURE__ */ N(!1), jp = /* @__PURE__ */ N(null);
	function Mp() {
		P(Ap, !z(Ap));
	}
	function Np() {
		P(Ap, !1), Pp();
	}
	Cn(() => {
		if (!z(Ap)) return;
		let e = (e) => {
			z(jp)?.contains(e.target) || P(Ap, !1);
		}, t = (e) => {
			e.key === "Escape" && P(Ap, !1);
		}, n = () => P(Ap, !1);
		return window.addEventListener("click", e, !0), window.addEventListener("keydown", t, !0), window.addEventListener("blur", n), () => {
			window.removeEventListener("click", e, !0), window.removeEventListener("keydown", t, !0), window.removeEventListener("blur", n);
		};
	});
	function Pp() {
		Be("discard");
		for (let e of z(E).pages) e.id !== z(_) && !Ne.has(e.id) && localStorage.removeItem(`urd-draft-${e.id}`);
		let e = w.reset();
		if (Ae.reset(), ls && (ls.reset(), bs()), ao) {
			ao.reset(), P(lo, [...ao.data.samlinger ?? []], !0);
			for (let e of Object.keys(oo)) z(lo).includes(e) ? oo[e].reset() : delete oo[e];
			Mo();
		}
		if (vo) {
			vo.reset(), P(Q, [...vo.data.maler ?? []], !0);
			for (let e of Object.keys(bo)) z(Q).includes(e) ? bo[e].reset() : (localStorage.removeItem(`urd-draft-template-${e}`), localStorage.removeItem(`urd-draft-mal-${e}`), delete bo[e]);
			To();
		}
		je(), P(re, {
			snap: !0,
			...z(E).grid
		}, !0), D(), P(y, ""), Me(), z(E).pages.some((e) => e.id === z(_)) ? T?.sendPage(z(_), e) : ci(z(E).pages[0].id);
	}
	async function Fp() {
		if (Jr) {
			S(Y("status.revertReloadBeforePublish"), "error");
			return;
		}
		if (z($r)) {
			S(Y("update.publishBlocked"), "error");
			return;
		}
		S(Y("status.publishing"));
		let e = [], t = [], n = [], r = [];
		for (let i of z(E).pages) {
			let a = `urd-draft-${i.id}`, o = Ne.has(i.id) || !z(g).pages.some((e) => e.id === i.id), s = null;
			if (i.id === z(_) && (w.hasDraft() || o)) s = w.data;
			else if (i.id !== z(_)) {
				let e = localStorage.getItem(a);
				if (e) try {
					s = go(JSON.parse(e), Ae.data);
				} catch {}
			}
			if (!s && o && (s = si(i)), !s) continue;
			let c = JSON.parse(JSON.stringify(s));
			e.push(...Op(c)), e.push({
				path: i.file,
				content: JSON.stringify(c, null, 2) + "\n",
				encoding: "utf-8"
			}), t.push(i.title), o ? r.push(i.id) : n.push(a);
		}
		if (Ae.hasDraft()) {
			let r = JSON.parse(JSON.stringify(z(E)));
			e.push(...kp(r)), e.push({
				path: "content/site.json",
				content: JSON.stringify(r, null, 2) + "\n",
				encoding: "utf-8"
			}), e.push({
				path: "content/theme.css",
				content: Ls(r.theme),
				encoding: "utf-8"
			}), n.push("urd-draft-site");
			let i = (e, t) => JSON.stringify(e ?? null) === JSON.stringify(t ?? null);
			i(z(g).theme, z(E).theme) || t.push(Y("publish.part.theme")), i(z(g).nav, z(E).nav) || t.push(Y("publish.part.nav")), i(z(g).footer, z(E).footer) || t.push(Y("publish.part.footer")), i(z(g).pages, z(E).pages) || t.push(Y("publish.part.pages")), i(z(g).grid, z(E).grid) || t.push(Y("publish.part.grid")), (z(g).site.icon ?? null) !== (z(E).site.icon ?? null) && t.push(Y("publish.part.icon"));
			let { icon: a, ...o } = z(g).site, { icon: s, ...c } = z(E).site;
			i(o, c) || t.push(Y("publish.part.siteInfo"));
		}
		let i = Object.entries(oo).filter(([, e]) => e.hasDraft());
		if (i.length || ao?.hasDraft()) {
			for (let [t, r] of i) {
				let i = JSON.parse(JSON.stringify(r.data));
				for (let t of i.entries) wp(t, e);
				e.push({
					path: `content/samlinger/${t}.json`,
					content: JSON.stringify(i, null, 2) + "\n",
					encoding: "utf-8"
				}), as.includes(i.kind) && e.push({
					path: `content/samlinger/${t}.xml`,
					content: os({
						title: i.name ?? t,
						origin: location.origin,
						path: `/content/samlinger/${t}.xml`,
						items: i.entries.map((e) => ({
							id: e.id,
							title: Io(e.title),
							text: Io(e.text),
							date: e.date,
							href: e.href
						}))
					}),
					encoding: "utf-8"
				}), n.push(`urd-draft-samling-${t}`);
			}
			if (ao?.hasDraft()) {
				e.push({
					path: "content/collections.json",
					content: JSON.stringify(ao.data, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push("urd-draft-collections", "urd-draft-samlinger");
				let t = { samlinger: [] };
				try {
					t = await (await fetch("/content/collections.json")).json();
				} catch {}
				let r = new Set(e.map((e) => e.path));
				for (let n of t.samlinger ?? []) {
					let t = `content/samlinger/${n}.json`;
					!z(lo).includes(n) && !r.has(t) && e.push({
						path: t,
						delete: !0
					});
				}
			}
			t.push(Y("publish.part.collections"));
		}
		let a = Object.entries(bo).filter(([, e]) => e.hasDraft());
		if (a.length || vo?.hasDraft()) {
			for (let [t, r] of a) {
				let i = JSON.parse(JSON.stringify(r.data));
				i.section && Dp(i.section, e);
				for (let t of i.blocks ?? []) Ep(t, e);
				for (let t of i.page?.sections ?? []) Dp(t, e);
				e.push({
					path: `content/maler/${t}.json`,
					content: JSON.stringify(i, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push(`urd-draft-mal-${t}`);
			}
			if (vo?.hasDraft()) {
				e.push({
					path: "content/maler.json",
					content: JSON.stringify(vo.data, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push("urd-draft-templates", "urd-draft-maler");
				let t = { maler: [] };
				try {
					t = await (await fetch("/content/maler.json")).json();
				} catch {}
				let r = new Set(e.map((e) => e.path));
				for (let n of t.maler ?? []) {
					let t = `content/maler/${n}.json`;
					!z(Q).includes(n) && !r.has(t) && e.push({
						path: t,
						delete: !0
					});
				}
			}
			t.push(Y("publish.part.templates"));
		}
		ls?.hasDraft() && (e.push({
			path: "plugins/plugins.json",
			content: JSON.stringify(ls.data, null, 2) + "\n",
			encoding: "utf-8"
		}), n.push("urd-draft-plugins"), t.push(Y("publish.part.plugins")));
		try {
			let t = await (await fetch("/index.html")).text();
			for (let n of z(E).pages) n.path !== "/" && e.push({
				path: `${n.path.slice(1)}/index.html`,
				content: t,
				encoding: "utf-8"
			});
		} catch {}
		e.push({
			path: "sitemap.xml",
			content: rs(z(E).pages, location.origin),
			encoding: "utf-8"
		}), e.push({
			path: "robots.txt",
			content: is(location.origin),
			encoding: "utf-8"
		});
		let o = new Set(e.map((e) => e.path)), s = (t) => {
			o.has(t) || e.push({
				path: t,
				delete: !0
			});
		};
		for (let e of z(g).pages) {
			let t = z(E).pages.find((t) => t.id === e.id);
			t ? t.path !== e.path && e.path !== "/" && s(`${e.path.slice(1)}/index.html`) : (s(e.file), e.path !== "/" && s(`${e.path.slice(1)}/index.html`));
		}
		let c = await Br(e);
		if (!c.ok) {
			S(Y("status.publishAborted"), "error");
			return;
		}
		let l = {
			message: Y("publish.commitMessage", { titles: t.join(", ") || Y("publish.theSite") }),
			files: e,
			...c.head ? { expect: c.head } : {}
		}, u = null;
		try {
			u = await fetch("/api/github/commit", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify(l)
			});
		} catch {}
		if (u?.ok) {
			let { sha: e } = await u.json().catch(() => ({}));
			e ? Rr = e : zr(), Op(w.data), kp(z(E));
			for (let e of n) localStorage.removeItem(e);
			for (let e of r) Ne.add(e);
			if (P(g, JSON.parse(JSON.stringify(z(E))), !0), Ae = Yi("urd-draft-site", () => z(g), C), je(), ls) {
				let e = JSON.parse(JSON.stringify(ls.data));
				ls = Yi("urd-draft-plugins", () => e, C), bs();
			}
			if (ao) {
				for (let e of Object.values(oo)) for (let t of e.data.entries) wp(t, []);
				let e = JSON.parse(JSON.stringify(ao.data));
				ao = Yi("urd-draft-collections", () => e, C, "urd-draft-samlinger"), so = {};
				for (let e of z(lo)) {
					if (!oo[e]) continue;
					let t = JSON.parse(JSON.stringify(oo[e].data));
					so[e] = t, oo[e] = Yi(`urd-draft-collection-${e}`, () => t, C, `urd-draft-samling-${e}`);
				}
				Mo();
			}
			if (vo) {
				for (let e of Object.values(bo)) {
					e.data?.section && Dp(e.data.section, []);
					for (let t of e.data?.blocks ?? []) Ep(t, []);
					for (let t of e.data?.page?.sections ?? []) Dp(t, []);
				}
				let e = JSON.parse(JSON.stringify(vo.data));
				vo = Yi("urd-draft-templates", () => e, C, "urd-draft-maler"), Co = {};
				for (let e of z(Q)) {
					if (!bo[e]) continue;
					let t = JSON.parse(JSON.stringify(bo[e].data));
					Co[e] = t, bo[e] = Yi(`urd-draft-template-${e}`, () => t, C, `urd-draft-mal-${e}`);
				}
				To();
			}
			P(re, {
				snap: !0,
				...z(E).grid
			}, !0);
			let t = JSON.parse(JSON.stringify(w.data));
			w = Yi(`urd-draft-${z(_)}`, () => t, C), Ne.has(z(_)) && ee(`urd-draft-${z(_)}`, JSON.stringify(t)), D(), S(Y("status.published"), "ok");
		} else if (u?.status === 401) {
			let e = await u.json().catch(() => null);
			S(e?.code === "loginExpired" ? Y("status.loginExpired") : Y("status.loginRequired", { reason: Vi(e) ?? Y("status.unknownReason") }), "error"), await Lr();
		} else u?.status === 403 ? S(Vi(await u.json().catch(() => null)) ?? Y("status.noPublishAccess"), "error") : u?.status === 409 ? S(Y("status.publishRace"), "error") : S(u ? Vi(await u.json().catch(() => null)) ?? Y("status.publishFailed") : Y("status.publishUnavailable"), "error");
	}
	Qe();
	var Ip = Sf();
	Tr("keydown", on, Ze), Tr("pointerdown", on, Xe);
	var Lp = I(Ip), Rp = F(Lp), zp = (e) => {
		var t = gu(), n = F(t);
		G(n, () => c.pencil);
		var r = L(n);
		O(t), R((e, n) => {
			J(t, "title", e), U(r, ` ${n ?? ""}`);
		}, [() => Y("tip.backToEdit"), () => Y("ui.edit")]), B("click", t, Uf), H(e, t);
	};
	W(Rp, (e) => {
		z(ie) || e(zp);
	});
	var Bp = L(Rp, 2);
	let Vp;
	var Hp = F(Bp), Up = F(Hp), Wp = (e) => {
		var t = Du(), n = I(t), r = F(n, !0);
		O(n);
		var i = L(n, 2), a = F(i), o = (e) => {
			var t = yu(), n = F(t);
			let r;
			var i = F(n);
			G(i, () => c[`device_${z(oe)}`]), G(L(i), () => c.caret), O(n);
			var a = L(n, 2), o = (e) => {
				var t = vu();
				Kr(t, 21, () => ae, (e) => e.id, (e, t) => {
					var n = _u();
					let r;
					var i = F(n);
					G(i, () => c[`device_${z(t).id}`]);
					var a = L(i);
					O(n), R((e, i) => {
						r = pi(n, 1, "ghost svelte-1n46o8q", null, r, { active: z(oe) === z(t).id }), J(n, "title", e), U(a, ` ${i ?? ""}`);
					}, [() => Y(`tip.view.${z(t).id}`, {
						w: z(t).width ?? z(he),
						c: Za(z(pa), z(ma), z(t).width ?? z(he)).width
					}), () => Y(`lbl.device.${z(t).id}`)]), B("click", n, () => {
						P(oe, z(t).id, !0), P(yi, null);
					}), H(e, n);
				}), O(t), H(e, t);
			};
			W(a, (e) => {
				z(yi) === "device" && e(o);
			}), O(t), R((e) => {
				r = pi(n, 1, "ghost svelte-1n46o8q", null, r, { active: z(yi) === "device" }), J(n, "title", e);
			}, [() => Y("lbl.group.device")]), B("click", n, () => P(yi, z(yi) === "device" ? null : "device", !0)), H(e, t);
		}, s = (e) => {
			var t = xu(), n = I(t), r = F(n, !0);
			O(n);
			var i = L(n, 2);
			Kr(i, 21, () => ae, (e) => e.id, (e, t) => {
				var n = bu();
				let r;
				G(n, () => c[`device_${z(t).id}`], !0), O(n), R((e) => {
					r = pi(n, 1, "ghost svelte-1n46o8q", null, r, { active: z(oe) === z(t).id }), J(n, "title", e);
				}, [() => Y(`tip.view.${z(t).id}`, {
					w: z(t).width ?? z(he),
					c: Za(z(pa), z(ma), z(t).width ?? z(he)).width
				})]), B("click", n, () => P(oe, z(t).id, !0)), H(e, n);
			}), O(i), R((e) => U(r, e), [() => Y("lbl.group.device")]), H(e, t);
		};
		W(a, (e) => {
			Si.device ? e(o) : e(s, -1);
		});
		var l = L(a, 2), u = (e) => {
			var t = Cu(), n = F(t);
			let r;
			var i = F(n), a = F(i);
			O(i), G(L(i), () => c.caret), O(n);
			var o = L(n, 2), s = (e) => {
				var t = Su(), n = F(t), r = F(n);
				G(r, () => c.minus, !0), O(r);
				var i = L(r, 2), a = F(i);
				O(i);
				var o = L(i, 2);
				G(o, () => c.plus, !0), O(o), O(n);
				var s = L(n, 2);
				let l;
				var u = F(s);
				G(u, () => c.fit);
				var d = L(u);
				O(s), O(t), R((e, t, n, c, u, f) => {
					J(r, "title", e), J(i, "title", t), U(a, `${n ?? ""}%`), J(o, "title", c), l = pi(s, 1, "ghost svelte-1n46o8q", null, l, { active: z(pe) === "fit" }), J(s, "title", u), U(d, ` ${f ?? ""}`);
				}, [
					() => Y("tip.zoomOut"),
					() => Y("tip.zoomCurrent"),
					() => Math.round(z(ve) * 100),
					() => Y("tip.zoomIn"),
					() => Y("tip.zoomFit"),
					() => Y("lbl.zoom.fit")
				]), B("click", r, () => ye(-1)), B("click", o, () => ye(1)), B("click", s, () => P(pe, "fit")), H(e, t);
			};
			W(o, (e) => {
				z(yi) === "zoom" && e(s);
			}), O(t), R((e, t) => {
				r = pi(n, 1, "ghost svelte-1n46o8q", null, r, { active: z(yi) === "zoom" }), J(n, "title", e), U(a, `${t ?? ""}%`);
			}, [() => Y("lbl.group.zoom"), () => Math.round(z(ve) * 100)]), B("click", n, () => P(yi, z(yi) === "zoom" ? null : "zoom", !0)), H(e, t);
		}, d = (e) => {
			var t = wu(), n = I(t), r = F(n, !0);
			O(n);
			var i = L(n, 2), a = F(i);
			G(a, () => c.minus, !0), O(a);
			var o = L(a, 2), s = F(o);
			O(o);
			var l = L(o, 2);
			G(l, () => c.plus, !0), O(l);
			var u = L(l, 2);
			let d;
			G(u, () => c.fit, !0), O(u), O(i), R((e, t, n, i, c, f) => {
				U(r, e), J(a, "title", t), J(o, "title", n), U(s, `${i ?? ""}%`), J(l, "title", c), d = pi(u, 1, "ghost svelte-1n46o8q", null, d, { active: z(pe) === "fit" }), J(u, "title", f);
			}, [
				() => Y("lbl.group.zoom"),
				() => Y("tip.zoomOut"),
				() => Y("tip.zoomCurrent"),
				() => Math.round(z(ve) * 100),
				() => Y("tip.zoomIn"),
				() => Y("tip.zoomFit")
			]), B("click", a, () => ye(-1)), B("click", l, () => ye(1)), B("click", u, () => P(pe, "fit")), H(e, t);
		};
		W(l, (e) => {
			Si.zoom ? e(u) : e(d, -1);
		});
		var f = L(l, 2), p = (e) => {
			var t = yu(), n = F(t);
			let r;
			var i = F(n);
			G(i, () => c.gridToggle), G(L(i), () => c.caret), O(n);
			var a = L(n, 2), o = (e) => {
				var t = Tu(), n = F(t);
				let r;
				var i = F(n);
				G(i, () => c.gridToggle);
				var a = L(i);
				O(n);
				var o = L(n, 2);
				let s;
				var l = F(o);
				G(l, () => c.guides);
				var u = L(l);
				O(o), O(t), R((e, t, i, c) => {
					r = pi(n, 1, "ghost svelte-1n46o8q", null, r, { active: z(Ti) }), J(n, "title", e), U(a, ` ${t ?? ""}`), s = pi(o, 1, "ghost svelte-1n46o8q", null, s, { active: z(di) }), J(o, "title", i), U(u, ` ${c ?? ""}`);
				}, [
					() => Y("tip.gridToggle"),
					() => Y("lbl.view.grid"),
					() => Y("tip.guides"),
					() => Y("lbl.view.guides")
				]), B("click", n, Ei), B("click", o, Ci), H(e, t);
			};
			W(a, (e) => {
				z(yi) === "view" && e(o);
			}), O(t), R((e) => {
				r = pi(n, 1, "ghost svelte-1n46o8q", null, r, { active: z(yi) === "view" || z(Ti) || z(di) }), J(n, "title", e);
			}, [() => Y("lbl.group.view")]), B("click", n, () => P(yi, z(yi) === "view" ? null : "view", !0)), H(e, t);
		}, m = (e) => {
			var t = Eu(), n = I(t), r = F(n, !0);
			O(n);
			var i = L(n, 2), a = F(i);
			let o;
			G(a, () => c.gridToggle, !0), O(a);
			var s = L(a, 2);
			let l;
			G(s, () => c.guides, !0), O(s), O(i), R((e, t, n) => {
				U(r, e), o = pi(a, 1, "ghost svelte-1n46o8q", null, o, { active: z(Ti) }), J(a, "title", t), l = pi(s, 1, "ghost svelte-1n46o8q", null, l, { active: z(di) }), J(s, "title", n);
			}, [
				() => Y("lbl.group.view"),
				() => Y("tip.gridToggle"),
				() => Y("tip.guides")
			]), B("click", a, Ei), B("click", s, Ci), H(e, t);
		};
		W(f, (e) => {
			Si.view ? e(p) : e(m, -1);
		}), O(i), Oi(i, (e) => P(xi, e), () => z(xi)), R((e, t) => {
			J(n, "title", e), U(r, t);
		}, [() => Y("tip.switchPage"), () => Pe()?.title ?? ""]), B("click", n, () => wt("pages")), H(e, t);
	};
	W(Up, (e) => {
		z(g) && e(Wp);
	});
	var Gp = L(Up, 2), Kp = (e) => {
		var t = Ou(), n = F(t);
		G(n, () => c.phone);
		var r = L(n, 2), i = F(r, !0);
		O(r);
		var a = L(r, 2), o = F(a, !0);
		O(a), O(t), R((e, n) => {
			J(t, "title", e), U(i, n), U(o, z(we));
		}, [() => Y("tip.attention"), () => Y(z(we) === 1 ? "ui.attentionOne" : "ui.attentionMany", { n: z(we) })]), B("click", t, Ee), H(e, t);
	};
	W(Gp, (e) => {
		z(we) > 0 && e(Kp);
	}), O(Hp);
	var qp = L(Hp, 2), Jp = F(qp), Yp = (e) => {
		var t = Au(), n = F(t), r = F(n), i = F(r, !0);
		O(r), Le(2), O(n);
		var a = L(n, 2), o = F(a);
		let s;
		var l = F(o);
		G(l, () => c.restore);
		var u = L(l), d = F(u, !0);
		O(u), O(o);
		var f = L(o, 2), p = (e) => {
			var t = ku(), n = F(t);
			G(n, () => c.restore);
			var r = L(n);
			O(t), R((e, n) => {
				J(t, "title", e), U(r, ` ${n ?? ""}`);
			}, [() => Y("tip.discardArmed"), () => Y("ui.discardConfirm")]), B("click", t, Np), H(e, t);
		};
		W(f, (e) => {
			z(Ap) && e(p);
		}), O(a), Oi(a, (e) => P(jp, e), () => z(jp)), O(t), R((e, t, r, a, c) => {
			J(n, "title", e), J(n, "aria-label", t), U(i, r), s = pi(o, 1, "discard-dot svelte-1n46o8q", null, s, { armed: z(Ap) }), J(o, "title", a), U(d, c);
		}, [
			() => Y("ui.unpublished"),
			() => Y("ui.unpublished"),
			() => Y("ui.unpublished"),
			() => z(Ap) ? Y("tip.discardArmed") : Y("tip.discard"),
			() => Y("ui.discard")
		]), B("click", o, Mp), oi(2, t, () => Ji, () => ({
			x: 24,
			duration: kt ? 0 : 150
		})), H(e, t);
	};
	W(Jp, (e) => {
		z(v) && e(Yp);
	}), O(qp);
	var Xp = L(qp, 2), Zp = F(Xp), Qp = (e) => {
		var t = Pu(), n = I(t), r = F(n), i = (e) => {
			var t = ju(), n = I(t);
			G(n, () => c.eye);
			var r = L(n, 2), i = F(r, !0);
			O(r), R((e) => U(i, e), [() => Y("ui.cleanView")]), H(e, t);
		}, a = (e) => {
			var t = ju(), n = I(t);
			G(n, () => c.pencil);
			var r = L(n, 2), i = F(r, !0);
			O(r), R((e) => U(i, e), [() => Y("ui.edit")]), H(e, t);
		};
		W(r, (e) => {
			z(ie) ? e(i) : e(a, -1);
		}), O(n);
		var o = L(n, 2), s = (e) => {
			var t = Mu(), n = F(t), r = (e) => {
				var t = Fr();
				G(I(t), () => c.warn), H(e, t);
			};
			W(n, (e) => {
				z(ne).allowed || e(r);
			});
			var i = L(n, 1, !0);
			O(t), R((e) => {
				J(t, "title", e), U(i, z(ne).login);
			}, [() => z(ne).allowed ? Y("tip.hasPublishAccess") : Y("tip.noPublishAccess")]), H(e, t);
		}, l = (e) => {
			var t = Nu(), n = F(t, !0);
			O(t), R((e) => U(n, e), [() => Y("ui.loginGitHub")]), H(e, t);
		};
		W(o, (e) => {
			z(ne)?.loggedIn ? e(s) : z(ne) && e(l, 1);
		});
		var u = L(o, 2), d = F(u);
		G(d, () => c.external);
		var f = L(d, 2), p = F(f, !0);
		O(f), O(u);
		var m = L(u, 2), h = F(m, !0);
		O(m), R((e, t, r, i, a) => {
			J(n, "title", e), J(u, "href", t), J(u, "title", r), U(p, i), m.disabled = !z(v), U(h, a);
		}, [
			() => z(ie) ? Y("tip.chromeHide") : Y("tip.chromeShow"),
			() => Pe()?.path ?? "/",
			() => Y("ui.viewSite"),
			() => Y("ui.viewSite"),
			() => Y("ui.publish")
		]), B("click", n, Uf), B("click", m, Fp), H(e, t);
	};
	W(Zp, (e) => {
		z(g) && e(Qp);
	}), O(Xp), O(Bp);
	var $p = L(Bp, 2), em = (e) => {
		var t = hf(), i = F(t), o = (e) => {
			var t = mf(), i = I(t), o = F(i);
			Kr(o, 17, () => pt, Hr, (e, t, n) => {
				var r = Iu(), i = I(r), a = F(i, !0);
				O(i), Kr(L(i, 2), 16, () => z(t), (e) => e, (e, t) => {
					var n = Fu();
					let r;
					var i = F(n, !0);
					O(n), R(() => {
						r = pi(n, 1, "svelte-1n46o8q", null, r, { active: z(ft) === t }), U(i, ht[t]);
					}), B("click", n, () => wt(t)), H(e, n);
				}), R((e) => U(a, e), [() => Y(mt[n])]), H(e, r);
			});
			var s = L(o, 2), u = L(F(s), 2);
			let p;
			G(u, () => c.gear, !0), O(u);
			var m = L(u, 2), g = (e) => {
				var t = Lu(), n = F(t), r = F(n, !0);
				O(n);
				var i = L(n, 2), a = F(i);
				X(L(a), {
					get value() {
						return z(d);
					},
					get options() {
						return l;
					},
					onchange: (e) => P(d, e, !0)
				}), O(i);
				var o = L(i, 2), s = F(o), c = L(s);
				{
					let e = /* @__PURE__ */ A(() => [["auto", Y("lang.auto")], ...bt()]);
					X(c, {
						get value() {
							return St;
						},
						get options() {
							return z(e);
						},
						onchange: Ct
					});
				}
				O(o);
				var u = L(o, 2), f = F(u), p = L(f);
				{
					let e = /* @__PURE__ */ A(() => [["strip", Y("settings.layoutPickerStrip")], ["menu", Y("settings.layoutPickerMenu")]]);
					X(p, {
						get value() {
							return z(mi);
						},
						get options() {
							return z(e);
						},
						onchange: gi
					});
				}
				O(u), O(t), R((e, t, n, c, l, d, p) => {
					U(r, e), J(i, "title", t), U(a, `${n ?? ""} `), J(o, "title", c), U(s, `${l ?? ""} `), J(u, "title", d), U(f, `${p ?? ""} `);
				}, [
					() => Y("settings.title"),
					() => Y("topbar.adminTheme.title"),
					() => Y("settings.theme"),
					() => Y("topbar.language.title"),
					() => Y("settings.language"),
					() => Y("tip.settings.layoutPicker"),
					() => Y("settings.layoutPicker")
				]), H(e, t);
			};
			W(m, (e) => {
				z(fi) && e(g);
			}), O(s), Oi(s, (e) => P(_i, e), () => z(_i)), O(i);
			var v = L(i, 2), y = (e) => {
				var t = pf(), i = F(t), o = F(i, !0);
				O(i);
				var s = L(i, 2), l = (e) => {
					var t = Ju(), n = F(t);
					Kr(n, 17, () => z(E).pages, (e) => e.id, (e, t) => {
						var n = Uu();
						let r;
						var i = F(n);
						K(i);
						var a = L(i, 2), o = (e) => {
							var t = Ru();
							R((e) => J(t, "title", e), [() => Y("tip.pages.homeLocked")]), H(e, t);
						}, s = (e) => {
							var n = zu();
							K(n), R((e, t) => {
								q(n, e), J(n, "title", t);
							}, [() => z(t).path.slice(1), () => Y("tip.pages.slug")]), B("change", n, (e) => $i(z(t), e.target.value)), H(e, n);
						};
						W(a, (e) => {
							z(t).path === "/" ? e(o) : e(s, -1);
						});
						var l = L(a, 2), u = (e) => {
							var t = Bu();
							G(t, () => c.warn, !0), O(t), R((e) => J(t, "title", e), [() => Y("tip.pages.missingDescription")]), H(e, t);
						};
						W(l, (e) => {
							z(Ki)[z(t).id] && e(u);
						});
						var d = L(l, 2), f = F(d);
						G(f, () => c.right, !0), O(f);
						var p = L(f, 2), m = F(p);
						G(m, () => c.kebab, !0), O(m);
						var h = L(m, 2), g = (e) => {
							var n = Hu(), r = F(n), i = F(r);
							G(i, () => c.bookmark);
							var a = L(i);
							O(r);
							var o = L(r, 2), s = (e) => {
								var n = Vu(), r = F(n);
								G(r, () => c.cross);
								var i = L(r);
								O(n), R((e, t) => {
									J(n, "title", e), U(i, ` ${t ?? ""}`);
								}, [() => Y("tip.pages.delete"), () => Y("ui.deletePage")]), B("click", n, () => {
									P(Pi, null), ea(z(t));
								}), H(e, n);
							};
							W(o, (e) => {
								z(t).path !== "/" && e(s);
							}), O(n), R((e) => U(a, ` ${e ?? ""}`), [() => Y("ui.savePageTemplate")]), B("click", r, () => Ri(z(t))), H(e, n);
						};
						W(h, (e) => {
							z(Pi) === z(t).id && e(g);
						}), O(p), O(d), O(n), R((e, a, o) => {
							r = pi(n, 1, "page-row svelte-1n46o8q", null, r, { current: z(t).id === z(_) }), q(i, z(t).title), J(i, "title", e), J(f, "title", a), f.disabled = z(t).id === z(_), J(m, "title", o);
						}, [
							() => Y("tip.pages.title"),
							() => Y("tip.pages.open"),
							() => Y("tip.pages.menu")
						]), B("change", i, (e) => zi(z(t), e.target.value)), B("click", f, () => ci(z(t).id)), B("click", m, () => P(Pi, z(Pi) === z(t).id ? null : z(t).id, !0)), H(e, n);
					});
					var r = L(n, 2), i = F(r), a = F(i, !0);
					O(i);
					var o = L(i, 2), s = F(o), l = F(s), u = L(l);
					dt(u), O(s);
					var d = L(s, 2), f = F(d), p = L(f);
					K(p), O(d);
					var m = L(d, 2), h = F(m), g = L(h);
					dt(g), O(m);
					var v = L(m, 2), y = F(v), b = L(y), x = (e) => {
						var t = Wu();
						R((e) => {
							J(t, "src", z(Bi).ogImage), J(t, "alt", e);
						}, [() => Y("lbl.ogImage")]), H(e, t);
					};
					W(b, (e) => {
						z(Bi).ogImage && e(x);
					}), O(v);
					var S = L(v, 2), C = F(S), ee = F(C), te = L(ee);
					O(C);
					var ne = L(C, 2), re = (e) => {
						var t = Yc();
						G(t, () => c.cross, !0), O(t), R((e) => J(t, "title", e), [() => Y("tip.seo.removeOgImage")]), B("click", t, () => Wi("ogImage", "")), H(e, t);
					};
					W(ne, (e) => {
						z(Bi).ogImage && e(re);
					}), O(S);
					var ie = L(S, 2), ae = F(ie);
					K(ae);
					var oe = L(ae);
					O(ie), O(o), O(r);
					var se = L(r, 4);
					K(se);
					var ce = L(se, 2), le = F(ce, !0);
					O(ce);
					var ue = L(ce, 2), de = F(ue, !0);
					O(ue);
					var fe = L(ue, 2), pe = F(fe);
					let me;
					var he = F(pe), ge = F(he);
					G(ge, () => Es({ sections: [] }), !0), O(ge);
					var _e = L(ge, 2), ve = F(_e, !0);
					O(_e), O(he), O(pe), Kr(L(pe, 2), 17, () => Os, (e) => e.id, (e, t) => {
						var n = Gu();
						let r;
						var i = F(n), a = F(i);
						G(a, () => Mi[z(t).id], !0), O(a);
						var o = L(a, 2), s = F(o, !0);
						O(o), O(i), O(n), R((e, a) => {
							r = pi(n, 1, "page-template-card svelte-1n46o8q", null, r, { picked: z(ji) === `preset:${z(t).id}` }), J(i, "title", e), U(s, a);
						}, [() => Y("tip.pages.templatePick", { name: Y(z(t).labelKey) }), () => Y(z(t).labelKey)]), B("click", i, () => P(ji, z(ji) === `preset:${z(t).id}` ? null : `preset:${z(t).id}`, !0)), H(e, n);
					}), O(fe);
					var ye = L(fe, 2), be = (e) => {
						var t = qu(), n = I(t), r = F(n, !0);
						O(n);
						var i = L(n, 2);
						Kr(i, 20, () => z(Q).filter((e) => bo[e]?.data?.mal?.kind === "page"), (e) => e, (e, t) => {
							var n = Ku();
							let r;
							var i = F(n), a = F(i);
							G(a, () => Es(bo[t].data.page), !0), O(a);
							var o = L(a, 2), s = F(o, !0);
							O(o), O(i);
							var l = L(i, 2);
							G(l, () => c.cross, !0), O(l), O(n), R((e, a) => {
								r = pi(n, 1, "page-template-card svelte-1n46o8q", null, r, { picked: z(ji) === t }), J(i, "title", e), U(s, bo[t].data.mal.name), J(l, "title", a);
							}, [() => Y("tip.pages.templatePick", { name: bo[t].data.mal.name }), () => Y("canvas.deleteTemplate")]), B("click", i, () => P(ji, z(ji) === t ? null : t, !0)), B("click", l, () => Ao({ id: t })), H(e, n);
						}), O(i), R((e) => {
							U(r, e), hi(i, z(Ni));
						}, [() => Y("canvas.tabMyTemplates")]), H(e, t);
					}, xe = /* @__PURE__ */ A(() => z(Q).some((e) => bo[e]?.data?.mal?.kind === "page"));
					W(ye, (e) => {
						z(xe) && e(be);
					}), O(t), R((e, t, n, r, i, o, c, _, b, x, S, te, ne, re, ue, ge, _e, ye, be, xe, Se, Ce) => {
						U(a, e), J(s, "title", t), U(l, `${n ?? ""} `), q(u, z(Bi).description), J(d, "title", r), U(f, `${i ?? ""} `), q(p, z(Bi).ogTitle), J(p, "placeholder", o), J(m, "title", c), U(h, `${_ ?? ""} `), q(g, z(Bi).ogDescription), J(g, "placeholder", z(Bi).description), J(v, "title", b), U(y, `${x ?? ""} `), J(C, "title", S), U(ee, `${te ?? ""} `), J(ie, "title", ne), bi(ae, re), U(oe, ` ${ue ?? ""}`), J(se, "placeholder", ge), J(ce, "title", _e), ce.disabled = ye, U(le, be), U(de, xe), hi(fe, z(Ni)), me = pi(pe, 1, "page-template-card svelte-1n46o8q", null, me, { picked: z(ji) === null }), J(he, "title", Se), U(ve, Ce);
					}, [
						() => Y("ui.seoGroup", { page: z(E).pages.find((e) => e.id === z(_))?.title ?? "" }),
						() => Y("tip.seo.description"),
						() => Y("lbl.seoDescription"),
						() => Y("tip.seo.ogTitle"),
						() => Y("lbl.ogTitle"),
						() => z(E).pages.find((e) => e.id === z(_))?.title ?? "",
						() => Y("tip.seo.ogDescription"),
						() => Y("lbl.ogDescription"),
						() => Y("tip.seo.ogImage"),
						() => Y("lbl.ogImage"),
						() => Y("tip.seo.ogImage"),
						() => z(Bi).ogImage ? Y("ui.changeImage") : Y("ui.chooseImage"),
						() => Y("tip.seo.hideFromSearch"),
						() => z(E).pages.find((e) => e.id === z(_))?.noindex === !0,
						() => Y("lbl.hideFromSearch"),
						() => Y("ph.newPageName"),
						() => Y("hint.pages.autoMenu"),
						() => !z(Ai).trim(),
						() => Y("ui.createPage"),
						() => Y("canvas.tabPresets"),
						() => Y("tip.pages.blankPick"),
						() => Y("ui.blankPage")
					]), B("change", u, (e) => Wi("description", e.target.value)), B("change", p, (e) => Wi("ogTitle", e.target.value)), B("change", g, (e) => Wi("ogDescription", e.target.value)), B("change", te, Xi), B("change", ae, (e) => Gi(e.target.checked)), B("keydown", se, (e) => e.key === "Enter" && Li()), wi(se, () => z(Ai), (e) => P(Ai, e)), B("click", ce, Li), B("click", he, () => P(ji, null)), H(e, t);
				}, u = (e) => {
					var t = ed(), r = F(t), i = F(r), a = F(i, !0);
					O(i);
					var o = L(i, 2), s = F(o), l = F(s), u = L(l);
					{
						let e = /* @__PURE__ */ A(() => z(E).nav.logo?.type ?? "text"), t = /* @__PURE__ */ A(() => [
							["text", Y("blocks.text")],
							["image", Y("blocks.image")],
							["both", Y("opt.logo.both")]
						]);
						X(u, {
							get value() {
								return z(e);
							},
							get options() {
								return z(t);
							},
							onchange: (e) => na(e)
						});
					}
					O(s);
					var d = L(s, 2), f = (e) => {
						var t = Yu(), n = I(t);
						K(n);
						var r = L(n, 2), i = F(r);
						{
							let e = /* @__PURE__ */ A(() => Y("tip.nav.logoFont")), t = /* @__PURE__ */ A(() => z(E).nav.logo?.font ?? ""), n = /* @__PURE__ */ A(() => [["", Y("common.inherit")], ...Kc.map(([e, t]) => [t, Y(e)])]);
							X(i, {
								get title() {
									return z(e);
								},
								get value() {
									return z(t);
								},
								get options() {
									return z(n);
								},
								onchange: (e) => ta({ font: e || void 0 })
							});
						}
						var a = L(i, 2);
						K(a);
						var o = L(a, 2);
						let s;
						var c = F(o), l = F(c, !0);
						O(c), O(o);
						var u = L(o, 2);
						let d;
						var f = F(u), p = F(f, !0);
						O(f), O(u), O(r), R((e, t, r, i, c, f, m) => {
							q(n, z(E).nav.logo?.value ?? ""), J(n, "placeholder", e), J(a, "title", t), q(a, z(E).nav.logo?.textSize ?? ""), s = pi(o, 1, "tbtn svelte-1n46o8q", null, s, { active: z(E).nav.logo?.bold !== !1 }), J(o, "title", r), U(l, i), d = pi(u, 1, "tbtn svelte-1n46o8q", null, d, c), J(u, "title", f), U(p, m);
						}, [
							() => Y("ph.nav.logoName"),
							() => Y("tip.nav.textSize"),
							() => Y("format.bold"),
							() => Y("format.boldLetter"),
							() => ({ active: !!z(E).nav.logo?.italic }),
							() => Y("format.italic"),
							() => Y("format.italicLetter")
						]), B("input", n, (e) => ta({ value: e.target.value })), B("change", a, (e) => ta({ textSize: e.target.value ? Number(e.target.value) : void 0 })), B("click", o, () => ta({ bold: z(E).nav.logo?.bold === !1 })), B("click", u, () => ta({ italic: !z(E).nav.logo?.italic })), H(e, t);
					};
					W(d, (e) => {
						(z(E).nav.logo?.type ?? "text") !== "image" && e(f);
					});
					var p = L(d, 2), m = (e) => {
						var t = Xu(), n = F(t), r = F(n), i = L(r);
						O(n);
						var a = L(n, 2);
						K(a);
						var o = L(a, 2);
						K(o), O(t), R((e, t, i, s) => {
							J(n, "title", e), U(r, `${t ?? ""} `), J(a, "title", i), q(a, z(E).nav.logo?.size ?? 32), J(o, "title", s), q(o, z(E).nav.logo?.radius ?? 0);
						}, [
							() => Y("tip.webpAuto"),
							() => (z(E).nav.logo?.type === "image" ? z(E).nav.logo?.value : z(E).nav.logo?.image) ? Y("ui.changeImage") : Y("ui.chooseImage"),
							() => Y("tip.nav.logoHeight"),
							() => Y("tip.nav.logoRadius")
						]), B("change", i, ra), B("change", a, (e) => ta({ size: Number(e.target.value) })), B("change", o, (e) => ta({ radius: Number(e.target.value) })), H(e, t);
					};
					W(p, (e) => {
						(z(E).nav.logo?.type ?? "text") !== "text" && e(m);
					});
					var h = L(p, 2), g = (e) => {
						var t = pl(), n = F(t), r = L(n);
						{
							let e = /* @__PURE__ */ A(() => z(E).nav.logo?.order ?? "image-first"), t = /* @__PURE__ */ A(() => [["image-first", Y("opt.logo.imageFirst")], ["text-first", Y("opt.logo.textFirst")]]);
							X(r, {
								get value() {
									return z(e);
								},
								get options() {
									return z(t);
								},
								onchange: (e) => ta({ order: e })
							});
						}
						O(t), R((e) => U(n, `${e ?? ""} `), [() => Y("lbl.order")]), H(e, t);
					};
					W(h, (e) => {
						z(E).nav.logo?.type === "both" && e(g);
					}), O(o), O(r);
					var _ = L(r, 2), v = F(_), y = F(v, !0);
					O(v);
					var b = L(v, 2), x = F(b), S = F(x), C = L(S);
					{
						let e = /* @__PURE__ */ A(() => z(E).nav.variant ?? "bar"), t = /* @__PURE__ */ A(() => [
							["bar", Y("opt.navVariant.bar")],
							["floating", Y("opt.navVariant.floating")],
							["floating-square", Y("opt.navVariant.floatingSquare")],
							["floating-tab", Y("opt.navVariant.floatingTab")],
							["side-left", Y("opt.navVariant.sideLeft")],
							["side-right", Y("opt.navVariant.sideRight")]
						]);
						X(C, {
							get value() {
								return z(e);
							},
							get options() {
								return z(t);
							},
							onchange: (e) => eo(e)
						});
					}
					O(x);
					var ee = L(x, 2), te = (e) => {
						var t = Zu(), n = I(t), r = F(n);
						K(r);
						var i = L(r);
						O(n);
						var a = L(n, 2), o = F(a);
						K(o);
						var s = L(o);
						O(a), R((e, t, c, l) => {
							J(n, "title", e), bi(r, z(E).nav.style?.glow === !0), U(i, ` ${t ?? ""}`), J(a, "title", c), bi(o, z(E).nav.style?.topGap !== !1), U(s, ` ${l ?? ""}`);
						}, [
							() => Y("tip.nav.glow"),
							() => Y("lbl.navGlow"),
							() => Y("tip.nav.topGap"),
							() => Y("lbl.navTopGap")
						]), B("change", r, (e) => to(e.target.checked)), B("change", o, (e) => no(e.target.checked)), H(e, t);
					};
					W(ee, (e) => {
						z(za) && e(te);
					});
					var ne = L(ee, 2), re = (e) => {
						var t = wl(), n = F(t);
						K(n);
						var r = L(n);
						O(t), R((e, i) => {
							J(t, "title", e), bi(n, z(E).nav.overlay === !0), U(r, ` ${i ?? ""}`);
						}, [() => Y("tip.nav.overlay"), () => Y("lbl.navOverlay")]), B("change", n, (e) => ki("nav", () => {
							e.target.checked ? z(E).nav.overlay = !0 : delete z(E).nav.overlay;
						})), H(e, t);
					};
					W(ne, (e) => {
						!z(za) && !z(Ra) && e(re);
					});
					var ie = L(ne, 2), ae = (e) => {
						var t = pl(), n = F(t), r = L(n);
						{
							let e = /* @__PURE__ */ A(() => z(E).nav.style?.sideAlign ?? "left"), t = /* @__PURE__ */ A(() => [
								["left", Y("common.left")],
								["center", Y("common.center")],
								["right", Y("common.right")]
							]);
							X(r, {
								get value() {
									return z(e);
								},
								get options() {
									return z(t);
								},
								onchange: (e) => La("sideAlign", e === "left" ? void 0 : e)
							});
						}
						O(t), R((e, r) => {
							J(t, "title", e), U(n, `${r ?? ""} `);
						}, [() => Y("tip.nav.sideAlign"), () => Y("lbl.textAlign")]), H(e, t);
					};
					W(ie, (e) => {
						z(Ra) && e(ae);
					});
					var oe = L(ie, 2), se = F(oe);
					K(se);
					var ce = L(se);
					O(oe);
					var le = L(oe, 2), ue = F(le), de = L(ue);
					{
						let e = /* @__PURE__ */ A(() => z(E).nav.style?.size ?? "md"), t = /* @__PURE__ */ A(() => [
							["sm", Y("opt.size.sm")],
							["md", Y("opt.size.md")],
							["lg", Y("opt.size.lg")],
							["xl", Y("opt.size.xl")]
						]);
						X(de, {
							get value() {
								return z(e);
							},
							get options() {
								return z(t);
							},
							onchange: (e) => La("size", e === "md" ? void 0 : e)
						});
					}
					O(le);
					var fe = L(le, 2), pe = F(fe), me = L(pe), he = (e) => {
						{
							let t = /* @__PURE__ */ A(() => z(E).nav.style?.sidePlacement ?? "top"), n = /* @__PURE__ */ A(() => [
								["top", Y("opt.place.top")],
								["middle", Y("opt.place.middle")],
								["bottom", Y("opt.place.bottom")]
							]);
							X(e, {
								get value() {
									return z(t);
								},
								get options() {
									return z(n);
								},
								onchange: (e) => La("sidePlacement", e === "top" ? void 0 : e)
							});
						}
					}, ge = (e) => {
						{
							let t = /* @__PURE__ */ A(() => z(E).nav.layout ?? "right"), n = /* @__PURE__ */ A(() => [
								["right", Y("common.right")],
								["center", Y("common.center")],
								["left", Y("opt.layout.leftAfterLogo")]
							]);
							X(e, {
								get value() {
									return z(t);
								},
								get options() {
									return z(n);
								},
								onchange: (e) => Ia(e)
							});
						}
					};
					W(me, (e) => {
						z(Ra) ? e(he) : e(ge, -1);
					}), O(fe);
					var _e = L(fe, 2), ve = (e) => {
						var t = Qu(), n = I(t), r = F(n);
						K(r);
						var i = L(r);
						O(n);
						var a = L(n, 2), o = (e) => {
							var t = pl(), n = F(t), r = L(n);
							{
								let e = /* @__PURE__ */ A(() => z(E).nav.scroll ?? "none"), t = /* @__PURE__ */ A(() => [
									["none", Y("opt.scroll.none")],
									["shrink", Y("opt.scroll.shrink")],
									["hide", Y("opt.scroll.hide")]
								]);
								X(r, {
									get value() {
										return z(e);
									},
									get options() {
										return z(t);
									},
									onchange: (e) => ki("nav", () => {
										e === "none" ? delete z(E).nav.scroll : z(E).nav.scroll = e;
									})
								});
							}
							O(t), R((e, r) => {
								J(t, "title", e), U(n, `${r ?? ""} `);
							}, [() => Y("tip.nav.scroll"), () => Y("lbl.navScroll")]), H(e, t);
						};
						W(a, (e) => {
							z(E).nav.sticky !== !1 && e(o);
						}), R((e, t) => {
							J(n, "title", e), bi(r, z(E).nav.sticky !== !1), U(i, ` ${t ?? ""}`);
						}, [() => Y("tip.nav.sticky"), () => Y("lbl.navSticky")]), B("change", r, (e) => ki("nav", () => {
							z(E).nav.sticky = e.target.checked;
						})), H(e, t);
					};
					W(_e, (e) => {
						z(Ra) || e(ve);
					});
					var ye = L(_e, 2), be = F(ye);
					K(be);
					var xe = L(be);
					O(ye);
					var Se = L(ye, 2), Ce = (e) => {
						var t = pl(), n = F(t), r = L(n);
						{
							let e = /* @__PURE__ */ A(() => z(E).nav.cart?.href ?? ""), t = /* @__PURE__ */ A(() => [["", Y("common.none")], ...z(E).pages.map((e) => [e.path, e.title])]);
							X(r, {
								get value() {
									return z(e);
								},
								get options() {
									return z(t);
								},
								onchange: (e) => ki("nav", () => {
									e ? z(E).nav.cart.href = e : delete z(E).nav.cart.href;
								})
							});
						}
						O(t), R((e, r) => {
							J(t, "title", e), U(n, `${r ?? ""} `);
						}, [() => Y("tip.cart.checkout"), () => Y("lbl.checkoutPage")]), H(e, t);
					};
					W(Se, (e) => {
						z(E).nav.cart?.show && e(Ce);
					});
					var we = L(Se, 2), Te = F(we), Ee = L(Te);
					{
						let e = /* @__PURE__ */ A(() => z(E).nav.style?.hover ?? "standard"), t = /* @__PURE__ */ A(() => [
							["standard", Y("opt.hover.standard")],
							["underline", Y("opt.hover.underline")],
							["pill", Y("opt.hover.pill")],
							["lift-plain", Y("opt.hover.liftPlain")],
							["lift", Y("opt.hover.lift")]
						]);
						X(Ee, {
							get value() {
								return z(e);
							},
							get options() {
								return z(t);
							},
							onchange: (e) => io(e)
						});
					}
					O(we);
					var De = L(we, 2), Oe = (e) => {
						var t = sl(), n = I(t), r = F(n), i = L(r), a = F(i);
						O(i), O(n);
						var o = L(n, 2);
						K(o), R((e, t, i) => {
							J(n, "title", e), U(r, `${t ?? ""} `), U(a, `${i ?? ""}%`), q(o, z(E).nav.style?.hoverGlow ?? .6);
						}, [
							() => Y("tip.nav.hoverGlow"),
							() => Y("lbl.glowStrength"),
							() => Math.round((z(E).nav.style?.hoverGlow ?? .6) * 100)
						]), B("input", o, (e) => La("hoverGlow", Number(e.target.value))), H(e, t);
					};
					W(De, (e) => {
						z(E).nav.style?.hover === "lift" && e(Oe);
					});
					var ke = L(De, 2), w = (e) => {
						var t = pl(), n = F(t), r = L(n);
						{
							let e = /* @__PURE__ */ A(() => z(E).nav.style?.hoverColor ?? "accent"), t = /* @__PURE__ */ A(ur);
							sa(r, {
								get value() {
									return z(e);
								},
								get tokens() {
									return z(t);
								},
								get label() {
									return z($a)[1];
								},
								onchange: (e) => La("hoverColor", e)
							});
						}
						O(t), R(() => {
							J(t, "title", z($a)[1]), U(n, `${z($a)[0] ?? ""} `);
						}), H(e, t);
					};
					W(ke, (e) => {
						z($a) && e(w);
					});
					var Ae = L(ke, 2), T = F(Ae), je = L(T);
					{
						let e = /* @__PURE__ */ A(() => z(E).nav.style?.hoverTextColor ?? "accent"), t = /* @__PURE__ */ A(ur), n = /* @__PURE__ */ A(() => Y("tip.nav.hoverTextColorPick"));
						sa(je, {
							get value() {
								return z(e);
							},
							get tokens() {
								return z(t);
							},
							get label() {
								return z(n);
							},
							onchange: (e) => La("hoverTextColor", e)
						});
					}
					O(Ae);
					var Me = L(Ae, 2), Ne = F(Me), Pe = L(Ne);
					{
						let e = /* @__PURE__ */ A(() => z(E).nav.style?.textColor ?? "text"), t = /* @__PURE__ */ A(ur), n = /* @__PURE__ */ A(() => Y("tip.nav.textColorPick"));
						sa(Pe, {
							get value() {
								return z(e);
							},
							get tokens() {
								return z(t);
							},
							get label() {
								return z(n);
							},
							onchange: (e) => La("textColor", e)
						});
					}
					O(Me);
					var D = L(Me, 4), Fe = F(D, !0);
					O(D);
					var Ie = L(D, 2);
					n(Ie, () => ar, () => z(E).nav?.style?.background?.layers ?? []), O(b), O(_);
					var Le = L(_, 2), Re = F(Le), ze = F(Re, !0);
					O(Re);
					var Be = L(Re, 2), Ve = F(Be), He = F(Ve), Ue = L(He);
					{
						let e = /* @__PURE__ */ A(() => z(E).nav.style?.subStyle ?? "card"), t = /* @__PURE__ */ A(() => z(Ra) ? [
							["card", Y("common.standard")],
							["pills", Y("opt.sub.pills")],
							["lines", Y("opt.sub.lines")]
						] : [
							["card", Y("opt.sub.card")],
							["flat", Y("opt.sub.flat")],
							["pills", Y("opt.sub.pills")],
							["lines", Y("opt.sub.lines")],
							["flyout", Y("opt.sub.flyout")]
						]);
						X(Ue, {
							get value() {
								return z(e);
							},
							get options() {
								return z(t);
							},
							onchange: (e) => La("subStyle", e === "card" ? void 0 : e)
						});
					}
					O(Ve);
					var We = L(Ve, 2), Ge = (e) => {
						var t = pl(), n = F(t), r = L(n);
						{
							let e = /* @__PURE__ */ A(() => z(E).nav.style?.subPillColor ?? "surface"), t = /* @__PURE__ */ A(ur), n = /* @__PURE__ */ A(() => Y("tip.nav.subPillColorPick"));
							sa(r, {
								get value() {
									return z(e);
								},
								get tokens() {
									return z(t);
								},
								get label() {
									return z(n);
								},
								onchange: (e) => La("subPillColor", e)
							});
						}
						O(t), R((e, r) => {
							J(t, "title", e), U(n, `${r ?? ""} `);
						}, [() => Y("tip.nav.subPillColor"), () => Y("lbl.subPillColor")]), H(e, t);
					};
					W(We, (e) => {
						z(E).nav.style?.subStyle === "pills" && e(Ge);
					});
					var Ke = L(We, 2), qe = F(Ke), Je = L(qe);
					K(Je), O(Ke), O(Be), O(Le);
					var Ye = L(Le, 2), Xe = F(Ye), Ze = F(Xe, !0);
					O(Xe);
					var Qe = L(Xe, 2), $e = F(Qe);
					Kr($e, 17, () => z(E).nav.items, Hr, (e, t, n) => {
						var r = $u(), i = I(r), a = F(i);
						K(a);
						var o = L(a, 2), s = F(o);
						G(s, () => c.plus, !0), O(s);
						var l = L(s, 2);
						l.disabled = n === 0, G(l, () => c.up, !0), O(l);
						var u = L(l, 2);
						G(u, () => c.down, !0), O(u);
						var d = L(u, 2);
						G(d, () => c.cross, !0), O(d), O(o);
						var f = L(o, 2), p = F(f);
						{
							let e = /* @__PURE__ */ A(() => z(t).page ?? (z(t).href == null ? "__none" : "__href")), r = /* @__PURE__ */ A(() => Y("tip.linkTarget")), i = /* @__PURE__ */ A(() => [
								...z(E).pages.map((e) => [e.id, e.title]),
								["__href", Y("opt.linkHref")],
								...z(t).children ? [["__none", Y("opt.noLink")]] : []
							]);
							X(p, {
								get value() {
									return z(e);
								},
								get title() {
									return z(r);
								},
								get options() {
									return z(i);
								},
								onchange: (e) => Fc(n, e)
							});
						}
						O(f);
						var m = L(f, 2), h = (e) => {
							var r = dl();
							K(r), R((e, n) => {
								q(r, z(t).href), J(r, "placeholder", e), J(r, "title", n);
							}, [() => Y("ph.hrefAnchor"), () => Y("tip.hrefAnchor")]), B("change", r, (e) => Ic(n, e.target.value)), H(e, r);
						};
						W(m, (e) => {
							!z(t).page && z(t).href != null && e(h);
						}), O(i), Kr(L(i, 2), 17, () => z(t).children ?? [], Hr, (e, r, i) => {
							var a = fl(), o = F(a);
							K(o);
							var s = L(o, 2), l = F(s);
							l.disabled = i === 0, G(l, () => c.up, !0), O(l);
							var u = L(l, 2);
							G(u, () => c.down, !0), O(u);
							var d = L(u, 2);
							G(d, () => c.cross, !0), O(d), O(s);
							var f = L(s, 2), p = F(f);
							{
								let e = /* @__PURE__ */ A(() => z(r).page ?? "__href"), t = /* @__PURE__ */ A(() => Y("tip.linkTarget")), a = /* @__PURE__ */ A(() => [...z(E).pages.map((e) => [e.id, e.title]), ["__href", Y("opt.linkHref")]]);
								X(p, {
									get value() {
										return z(e);
									},
									get title() {
										return z(t);
									},
									get options() {
										return z(a);
									},
									onchange: (e) => Wc(n, i, e)
								});
							}
							O(f);
							var m = L(f, 2), h = (e) => {
								var t = dl();
								K(t), R((e, n) => {
									q(t, z(r).href ?? ""), J(t, "placeholder", e), J(t, "title", n);
								}, [() => Y("ph.hrefAnchor"), () => Y("tip.hrefAnchor")]), B("change", t, (e) => Cf(n, i, e.target.value)), H(e, t);
							};
							W(m, (e) => {
								z(r).page || e(h);
							}), O(a), R((e, n) => {
								q(o, z(r).label), J(o, "title", e), u.disabled = i === z(t).children.length - 1, J(d, "title", n);
							}, [() => Y("tip.nav.childLabel"), () => Y("tip.nav.removeChild")]), B("input", o, (e) => Uc(n, i, e.target.value)), B("click", l, () => wf(n, i, -1)), B("click", u, () => wf(n, i, 1)), B("click", d, () => Tf(n, i)), H(e, a);
						}), R((e, r, i) => {
							q(a, z(t).label), J(a, "title", e), J(s, "title", r), u.disabled = n === z(E).nav.items.length - 1, J(d, "title", i);
						}, [
							() => Y("tip.nav.itemLabel"),
							() => Y("tip.nav.addChild"),
							() => Y("tip.nav.removeItem")
						]), B("input", a, (e) => Nc(n, e.target.value)), B("click", s, () => Hc(n)), B("click", l, () => Lc(n, -1)), B("click", u, () => Lc(n, 1)), B("click", d, () => Rc(n)), H(e, r);
					});
					var et = L($e, 2), tt = F(et, !0);
					O(et), O(Qe), O(Ye), O(t), R((e, t, n, r, o, s, c, u, d, f, p, m, h, g, _, v, b, C, ee, te, ne, re, ie, ae) => {
						J(i, "title", e), U(a, t), U(l, `${n ?? ""} `), U(y, r), J(x, "title", o), U(S, `${s ?? ""} `), J(oe, "title", c), bi(se, z(E).nav.style?.blur !== !1), U(ce, ` ${u ?? ""}`), U(ue, `${d ?? ""} `), U(pe, `${f ?? ""} `), J(ye, "title", p), bi(be, z(E).nav.cart?.show === !0), U(xe, ` ${m ?? ""}`), U(Te, `${h ?? ""} `), J(Ae, "title", g), U(T, `${_ ?? ""} `), U(Ne, `${v ?? ""} `), U(Fe, b), U(ze, C), U(He, `${ee ?? ""} `), J(Ke, "title", te), U(qe, `${ne ?? ""} `), q(Je, z(E).nav.style?.subColumns ?? 1), J(Xe, "title", re), U(Ze, ie), U(tt, ae);
					}, [
						() => Y("hint.nav.logoHome"),
						() => Y("group.logo"),
						() => Y("common.type"),
						() => Y("group.appearance"),
						() => Y("tip.nav.variant"),
						() => Y("lbl.navVariant"),
						() => Y("tip.nav.blur"),
						() => Y("lbl.navBlur"),
						() => Y("lbl.size"),
						() => Y("lbl.navPlacement"),
						() => Y("tip.nav.cart"),
						() => Y("lbl.navCart"),
						() => Y("lbl.navHover"),
						() => Y("tip.nav.hoverTextColor"),
						() => Y("lbl.hoverTextColor"),
						() => Y("lbl.textColor"),
						() => Y("lbl.background"),
						() => Y("group.submenu"),
						() => Y("lbl.design"),
						() => Y("tip.nav.subColumns"),
						() => Y("lbl.columns"),
						() => Y("hint.nav.submenu"),
						() => Y("group.menuItems"),
						() => Y("ui.addMenuItem")
					]), B("change", se, (e) => La("blur", e.target.checked)), B("change", be, (e) => ki("nav", () => {
						e.target.checked ? z(E).nav.cart = {
							...z(E).nav.cart ?? {},
							show: !0
						} : delete z(E).nav.cart;
					})), B("change", Je, (e) => La("subColumns", Number(e.target.value) > 1 ? Number(e.target.value) : void 0)), B("click", et, zc), H(e, t);
				}, d = (e) => {
					var t = ad(), n = F(t), r = F(n), i = L(r);
					K(i), O(n);
					var a = L(n, 2), o = F(a), s = L(o);
					K(s), O(a);
					var l = L(a, 2), u = F(l), d = L(u);
					{
						let e = /* @__PURE__ */ A(Ma), t = /* @__PURE__ */ A(Na);
						X(d, {
							get value() {
								return z(e);
							},
							get options() {
								return z(t);
							},
							onchange: (e) => Pa(e)
						});
					}
					O(l);
					var f = L(l, 4), p = F(f, !0);
					O(f);
					var m = L(f, 2), h = F(m);
					Kr(h, 17, () => z(Ta), (e) => e.screen, (e, t) => {
						var n = td(), r = F(n), i = F(r, !0);
						O(r);
						var a = L(r, 2);
						let o;
						var s = F(a);
						O(a);
						var c = L(a, 2), l = F(c, !0);
						O(c), O(n), R(() => {
							U(i, z(t).screen), o = pi(a, 1, "cw-bar svelte-1n46o8q", null, o, { fluid: !z(t).bound }), hi(s, `width:${z(t).pct ?? ""}%`), U(l, z(t).bound ? `${z(t).margin}` : "-");
						}), H(e, n);
					});
					var g = L(h, 2), _ = F(g), v = F(_, !0);
					O(_);
					var y = L(_, 2), b = F(y, !0);
					O(y), O(g);
					var x = L(g, 2), S = (e) => {
						var t = nd(), n = F(t, !0);
						O(t), R((e) => U(n, e), [() => Y("lbl.bindsFrom", { n: z(ge) })]), H(e, t);
					};
					W(x, (e) => {
						z(pa) !== "full" && e(S);
					}), O(m);
					var C = L(m, 2);
					Kr(C, 21, () => Ka, (e) => e.id, (e, t) => {
						var n = Fu();
						let r;
						var i = F(n, !0);
						O(n), R((e) => {
							r = pi(n, 1, "svelte-1n46o8q", null, r, { on: z(xa) === z(t).id }), U(i, e);
						}, [() => Y(`lbl.width.${z(t).id}`)]), B("click", n, () => Da(z(t).width)), H(e, n);
					}), O(C);
					var ee = L(C, 2), te = (e) => {
						var t = rd(), n = F(t), r = F(n, !0);
						O(n);
						var i = L(n, 2);
						K(i);
						var a = L(i, 2), o = F(a);
						O(a), O(t), R((e, n) => {
							J(t, "title", e), U(r, n), J(i, "min", 960), J(i, "max", Wa), J(i, "step", 20), q(i, z(wa)), U(o, `${z(wa) ?? ""} px`);
						}, [() => Y("tip.site.contentWidthFree"), () => Y("lbl.widthFree")]), B("input", i, (e) => Da(e.target.valueAsNumber)), H(e, t);
					};
					W(ee, (e) => {
						z(pa) !== "full" && e(te);
					});
					var ne = L(ee, 2), re = F(ne, !0);
					O(ne);
					var ie = L(ne, 2);
					Kr(ie, 21, () => Ga, (e) => e.id, (e, t) => {
						var n = Fu();
						let r;
						var i = F(n, !0);
						O(n), R((e) => {
							r = pi(n, 1, "svelte-1n46o8q", null, r, { on: z(Sa) === z(t).id }), U(i, e);
						}, [() => Y(`lbl.gutter.${z(t).id}`)]), B("click", n, () => ja(z(t).gutter)), H(e, n);
					}), O(ie);
					var ae = L(ie, 2), oe = F(ae), se = F(oe, !0);
					O(oe);
					var ce = L(oe, 2), le = F(ce), ue = F(le), de = F(ue, !0);
					O(ue);
					var fe = L(ue, 2);
					K(fe);
					var pe = L(fe, 2), me = F(pe);
					O(pe), O(le), O(ce), O(ae);
					var he = L(ae, 4), _e = F(he), ve = L(_e), ye = (e) => {
						var t = Wu();
						R((e) => {
							J(t, "src", z(E).site.icon), J(t, "alt", e);
						}, [() => Y("lbl.siteIcon")]), H(e, t);
					};
					W(ve, (e) => {
						z(E).site.icon && e(ye);
					}), O(he);
					var be = L(he, 2), xe = F(be), Se = F(xe), Ce = L(Se);
					O(xe);
					var we = L(xe, 2), Te = (e) => {
						var t = id(), n = I(t);
						G(n, () => c.pencil ?? "✎", !0), O(n);
						var r = L(n, 2);
						G(r, () => c.cross, !0), O(r), R((e, t) => {
							J(n, "title", e), J(r, "title", t);
						}, [() => Y("tip.site.editIcon"), () => Y("tip.site.removeIcon")]), B("click", n, () => P(ia, z(E).site.icon, !0)), B("click", r, ca), H(e, t);
					};
					W(we, (e) => {
						z(E).site.icon && e(Te);
					}), O(be), O(t), R((e, t, c, d, m, h, g, _, y, x, S, C, ee, te, ie, oe, ce, ue, pe, he) => {
						J(n, "title", e), U(r, `${t ?? ""} `), q(i, z(E).site.title ?? ""), J(i, "placeholder", c), J(a, "title", d), U(o, `${m ?? ""} `), q(s, z(E).site.description ?? ""), J(s, "placeholder", h), J(l, "title", g), U(u, `${_ ?? ""} `), J(f, "title", y), U(p, x), U(v, S), U(b, C), J(ne, "title", ee), U(re, te), ae.open = z(Sa) === null || z(Ca), U(se, ie), J(le, "title", oe), U(de, ce), J(fe, "min", 0), J(fe, "max", 12), J(fe, "step", 1), q(fe, z(ma)), U(me, `${z(ma) ?? ""} vw`), U(_e, `${ue ?? ""} `), J(xe, "title", pe), U(Se, `${he ?? ""} `);
					}, [
						() => Y("tip.site.name"),
						() => Y("lbl.name"),
						() => Y("ph.site.name"),
						() => Y("tip.site.description"),
						() => Y("lbl.description"),
						() => Y("ph.site.description"),
						() => Y("site.langTitle"),
						() => Y("site.langLabel"),
						() => Y("tip.site.contentWidth"),
						() => Y("lbl.contentWidth"),
						() => Y("lbl.screenPx"),
						() => Y("lbl.marginPx"),
						() => Y("tip.site.gutter"),
						() => Y("lbl.gutter"),
						() => Y("group.advanced"),
						() => Y("tip.site.gutterVw"),
						() => Y("lbl.gutterVw"),
						() => Y("lbl.siteIcon"),
						() => Y("tip.site.icon"),
						() => z(E).site.icon ? Y("ui.changeIcon") : Y("ui.chooseIcon")
					]), B("input", i, (e) => la(e.target.value)), B("input", s, (e) => ua(e.target.value)), Tr("toggle", ae, (e) => P(Ca, e.currentTarget.open, !0)), B("input", fe, (e) => ja(e.target.valueAsNumber)), B("change", Ce, aa), H(e, t);
				}, p = (e) => {
					var t = pd();
					{
						let e = (e, t = f, n = f) => {
							var r = sd(), i = F(r), a = (e) => {
								var t = od(), r = F(t, !0);
								O(t), R(() => U(r, n())), H(e, t);
							};
							W(i, (e) => {
								n() && e(a);
							});
							var o = L(i, 2), s = F(o), c = F(s, !0);
							O(s);
							var l = L(s, 2), u = F(l, !0);
							O(l);
							var d = L(l, 2), p = F(d), m = F(p, !0);
							O(p);
							var h = L(p), g = F(h, !0);
							O(h), O(d), O(o), O(r), R((e, t, n, r, i, a, s, l, d) => {
								hi(o, `--tv-bg:${e ?? ""};--tv-surface:${t ?? ""};--tv-text:${n ?? ""};--tv-accent:${r ?? ""};--tv-accent-ink:${i ?? ""}`), U(c, a), U(u, s), U(m, l), U(g, d);
							}, [
								() => Rf(t().bg, t()),
								() => Rf(t().surface, t()),
								() => Rf(t().text, t()),
								() => Rf(t().accent, t()),
								() => Rf(t()["accent-text"] ?? t().bg, t()),
								() => Y("preview.heading"),
								() => Y("preview.cardBody"),
								() => Y("preview.button"),
								() => Y("preview.link")
							]), H(e, r);
						};
						var n = F(t), r = F(n, !0);
						O(n);
						var i = L(n, 2);
						Kr(i, 21, () => Bf, (e) => e.id, (e, t) => {
							var n = cd();
							let r;
							var i = F(n), a = F(i), o = L(a), s = L(o), c = L(s);
							O(i);
							var l = L(i, 2), u = F(l, !0);
							O(l), O(n), R(() => {
								r = pi(n, 1, "theme-preset svelte-1n46o8q", null, r, { sel: z(Hf) === z(t).id }), J(n, "title", `${z(t).name} - ${z(t).note}`), hi(a, `background:${z(t).light.bg ?? ""}`), hi(o, `background:${z(t).light.surface ?? ""}`), hi(s, `background:${z(t).light.accent ?? ""}`), hi(c, `background:${z(t).light.text ?? ""}`), U(u, z(t).name);
							}), B("click", n, () => Vf(z(t))), H(e, n);
						}), O(i);
						var a = L(i, 2), o = F(a, !0);
						O(a);
						var s = L(a, 2), c = F(s);
						K(c);
						var l = L(c);
						O(s);
						var u = L(s, 2), d = (e) => {
							var t = ld(), n = F(t), r = F(n, !0);
							O(n);
							var i = L(n, 2), a = F(i);
							let o;
							var s = F(a, !0);
							O(a);
							var c = L(a, 2);
							let l;
							var u = F(c, !0);
							O(c), O(i), O(t), R((e, t, n, i) => {
								U(r, e), J(a, "title", t), o = pi(a, 1, "svelte-1n46o8q", null, o, { on: z(pr) }), U(s, n), l = pi(c, 1, "svelte-1n46o8q", null, l, { on: !z(pr) }), U(u, i);
							}, [
								() => Y("lbl.darkColors"),
								() => Y("hint.theme.autoDark"),
								() => Y("opt.auto"),
								() => Y("opt.custom")
							]), B("click", a, () => Pf(!0)), B("click", c, () => Pf(!1)), H(e, t);
						};
						W(u, (e) => {
							z(fr) && e(d);
						});
						var p = L(u, 2), m = F(p), g = (e) => {
							var t = ud(), n = F(t, !0);
							O(t), R((e) => U(n, e), [() => Y("lbl.light")]), H(e, t);
						};
						W(m, (e) => {
							z(fr) && e(g);
						});
						var _ = L(m, 2);
						let Pe;
						var v = F(_, !0);
						O(_), O(p);
						var y = L(p, 2);
						Kr(y, 21, () => dr, ([e, t, n]) => e, (e, t) => {
							var n = /* @__PURE__ */ A(() => h(z(t), 3));
							let r = () => z(n)[0], i = () => z(n)[1], a = () => z(n)[2];
							var o = dd(), s = F(o);
							{
								let e = /* @__PURE__ */ A(() => z(E).theme.tokens.color[r()] ?? z(E).theme.tokens.color.bg), t = /* @__PURE__ */ A(ur);
								sa(s, {
									get value() {
										return z(e);
									},
									get tokens() {
										return z(t);
									},
									get label() {
										return i();
									},
									onchange: (e) => Ef(r(), e)
								});
							}
							var c = L(s, 2), l = F(c, !0);
							O(c);
							var u = L(c, 2), d = F(u, !0);
							O(u), O(o), R((e) => {
								U(l, a()), U(d, e);
							}, [() => Rf(z(E).theme.tokens.color[r()] ?? z(E).theme.tokens.color.bg, z(hr))]), H(e, o);
						}), O(y);
						var b = L(y, 2), x = (e) => {
							var t = fd(), n = I(t), r = F(n), i = F(r, !0);
							O(r);
							var a = L(r, 2);
							let o;
							var s = F(a, !0);
							O(a), O(n);
							var c = L(n, 2);
							let l;
							Kr(c, 21, () => dr, ([e, t, n]) => e, (e, t) => {
								var n = /* @__PURE__ */ A(() => h(z(t), 3));
								let r = () => z(n)[0], i = () => z(n)[1], a = () => z(n)[2];
								var o = dd(), s = F(o);
								{
									let e = /* @__PURE__ */ A(() => z(E).theme.alt.tokens.color[r()] ?? z(gr)[r()] ?? z(E).theme.tokens.color.bg), t = /* @__PURE__ */ A(ur), n = /* @__PURE__ */ A(() => Y("theme.darkColorLabel", { name: i() }));
									sa(s, {
										get value() {
											return z(e);
										},
										get tokens() {
											return z(t);
										},
										get label() {
											return z(n);
										},
										onchange: (e) => jf(r(), e)
									});
								}
								var c = L(s, 2), l = F(c, !0);
								O(c);
								var u = L(c, 2), d = F(u, !0);
								O(u), O(o), R((e) => {
									U(l, a()), U(d, e);
								}, [() => Rf(z(E).theme.alt.tokens.color[r()] ?? z(gr)[r()], z(gr))]), H(e, o);
							}), O(c), R((e, t, n) => {
								U(i, e), o = pi(a, 1, "chip svelte-1n46o8q", null, o, { accent: z(mr) === "dark" }), J(a, "title", t), U(s, n), l = pi(c, 1, "palcells svelte-1n46o8q", null, l, { autopal: z(pr) });
							}, [
								() => Y("lbl.dark"),
								() => Y("tip.theme.darkDefault"),
								() => Y("common.standard")
							]), B("click", a, () => Mf("dark")), H(e, t);
						};
						W(b, (e) => {
							z(fr) && e(x);
						});
						var S = L(b, 2), C = F(S);
						{
							let t = /* @__PURE__ */ A(() => z(fr) ? Y("lbl.light") : "");
							e(C, () => z(hr), () => z(t));
						}
						var ee = L(C, 2), te = (t) => {
							{
								let n = /* @__PURE__ */ A(() => Y("lbl.dark"));
								e(t, () => z(gr), () => z(n));
							}
						};
						W(ee, (e) => {
							z(fr) && e(te);
						}), O(S);
						var ne = L(S, 2), re = F(ne), ie = F(re, !0);
						O(re);
						var ae = L(re, 2), oe = F(ae), se = F(oe), ce = L(se);
						{
							let e = /* @__PURE__ */ A(() => Ff("heading"));
							X(ce, {
								get value() {
									return z(E).theme.tokens.font.heading;
								},
								get options() {
									return z(e);
								},
								onchange: (e) => Df("heading", e)
							});
						}
						O(oe);
						var le = L(oe, 2), ue = F(le), de = L(ue);
						{
							let e = /* @__PURE__ */ A(() => Ff("body"));
							X(de, {
								get value() {
									return z(E).theme.tokens.font.body;
								},
								get options() {
									return z(e);
								},
								onchange: (e) => Df("body", e)
							});
						}
						O(le);
						var fe = L(le, 2), pe = F(fe), me = F(pe, !0);
						O(pe);
						var he = L(pe, 2), ge = F(he, !0);
						O(he), O(fe), O(ae), O(ne);
						var _e = L(ne, 2), ve = F(_e), ye = F(ve, !0);
						O(ve);
						var be = L(ve, 2), xe = F(be), Se = F(xe), Ce = F(Se, !0);
						O(Se);
						var we = L(Se, 2), Te = F(we, !0);
						O(we), O(xe);
						var Ee = L(xe, 2), De = F(Ee, !0), Oe = L(De), ke = F(Oe, !0);
						O(Oe), O(Ee);
						var w = L(Ee, 2);
						K(w);
						var Ae = L(w, 2), T = F(Ae, !0), je = L(T), Me = F(je, !0);
						O(je), O(Ae);
						var Ne = L(Ae, 2);
						K(Ne), O(be), O(_e), O(t), R((e, t, n, i, a, u, d, f, p, m, h, g, y, b, x, S, C, ee) => {
							U(r, e), U(o, t), J(s, "title", n), bi(c, z(fr)), U(l, ` ${i ?? ""}`), Pe = pi(_, 1, "chip svelte-1n46o8q", null, Pe, { accent: z(mr) === "light" }), J(_, "title", a), U(v, u), U(ie, d), U(se, `${f ?? ""} `), U(ue, `${p ?? ""} `), hi(pe, `font-family:${z(E).theme.tokens.font.heading ?? ""}`), U(me, m), hi(he, `font-family:${z(E).theme.tokens.font.body ?? ""}`), U(ge, h), U(ye, g), hi(xe, `--r-sm:${z(E).theme.tokens.radius.sm ?? ""};--r-md:${z(E).theme.tokens.radius.md ?? ""}`), U(Ce, y), U(Te, b), U(De, x), U(ke, z(E).theme.tokens.radius.sm), q(w, S), U(T, C), U(Me, z(E).theme.tokens.radius.md), q(Ne, ee);
						}, [
							() => Y("lbl.themePresets"),
							() => Y("lbl.colors"),
							() => Y("tip.theme.dualMode"),
							() => Y("lbl.dualMode"),
							() => Y("tip.theme.defaultScheme"),
							() => Y("common.standard"),
							() => Y("group.typography"),
							() => Y("lbl.headings"),
							() => Y("lbl.bodyText"),
							() => Y("preview.heading"),
							() => Y("preview.bodySample"),
							() => Y("group.shape"),
							() => Y("preview.button"),
							() => Y("preview.card"),
							() => Y("lbl.smallCorners"),
							() => If(z(E).theme.tokens.radius.sm),
							() => Y("lbl.largeCorners"),
							() => If(z(E).theme.tokens.radius.md)
						]), B("change", c, (e) => Nf(e.target.checked)), B("click", _, () => Mf("light")), B("input", w, (e) => Lf("sm", Number(e.target.value))), B("input", Ne, (e) => Lf("md", Number(e.target.value)));
					}
					H(e, t);
				}, m = (e) => {
					var t = vd();
					let n;
					var r = F(t);
					K(r);
					var i = L(r, 2), a = (e) => {
						var t = Fr();
						Kr(I(t), 17, () => Ms(fp(), z(dp), (e) => e.label), (e) => e.label, (e, t) => {
							var n = Fr(), r = I(n), i = (e) => {
								var n = md(), r = F(n), i = L(r);
								O(n), R((e) => {
									J(n, "title", e), U(r, `${z(t).label ?? ""} `);
								}, [() => Y("tip.webpAuto")]), B("change", i, hp), H(e, n);
							}, a = (e) => {
								var n = hd(), r = F(n), i = L(r);
								O(n), R((e) => {
									J(n, "title", e), U(r, `${z(t).label ?? ""} `);
								}, [() => Y("tip.blocks.galleryImages")]), B("change", i, yp), H(e, n);
							}, o = (e) => {
								var n = El(), r = F(n, !0);
								O(n), R(() => U(r, z(t).label)), B("click", n, () => pp(z(t))), H(e, n);
							};
							W(r, (e) => {
								z(t).act === "image" ? e(i) : z(t).act === "galleryImages" ? e(a, 1) : e(o, -1);
							}), H(e, n);
						}, (e) => {
							var t = gl(), n = F(t, !0);
							O(t), R((e) => U(n, e), [() => Y("canvas.searchEmpty")]), H(e, t);
						}), H(e, t);
					}, o = /* @__PURE__ */ A(() => z(dp).trim()), s = (e) => {
						var t = _d(), n = I(t), r = F(n), i = F(r, !0);
						O(r);
						var a = L(r, 2), o = F(a), s = F(o, !0);
						O(o);
						var c = L(o, 2), l = F(c, !0);
						O(c), O(a), O(n);
						var u = L(n, 2), d = F(u, !0);
						O(u);
						var f = L(u, 2), p = F(f), m = L(p);
						O(f);
						var h = L(f, 2), g = F(h, !0);
						O(h);
						var _ = L(h, 2), v = F(_, !0);
						O(_);
						var y = L(_, 2), b = F(y, !0);
						O(y);
						var x = L(y, 2), S = F(x, !0);
						O(x);
						var C = L(x, 2), ee = F(C, !0);
						O(C);
						var te = L(C, 2), ne = F(te, !0);
						O(te);
						var re = L(te, 2), ie = F(re, !0);
						O(re);
						var ae = L(re, 2), oe = F(ae, !0);
						O(ae);
						var se = L(ae, 2), ce = F(se, !0);
						O(se);
						var le = L(se, 2), ue = F(le, !0);
						O(le);
						var de = L(le, 2), fe = F(de, !0);
						O(de);
						var pe = L(de, 2), me = F(pe, !0);
						O(pe);
						var he = L(pe, 2), ge = F(he, !0);
						O(he);
						var _e = L(he, 2), ve = F(_e, !0);
						O(_e);
						var ye = L(_e, 2), be = F(ye), xe = F(be, !0);
						O(be);
						var Se = L(be, 2), Ce = F(Se), we = F(Ce, !0);
						O(Ce);
						var Te = L(Ce, 2), Ee = F(Te), De = L(Ee);
						O(Te), O(Se), O(ye);
						var Oe = L(ye, 2), ke = F(Oe), w = F(ke, !0);
						O(ke);
						var Ae = L(ke, 2), E = F(Ae), je = F(E, !0);
						O(E);
						var Me = L(E, 2), Ne = F(Me, !0);
						O(Me);
						var Pe = L(Me, 2), D = F(Pe, !0);
						O(Pe);
						var Fe = L(Pe, 2), Ie = F(Fe, !0);
						O(Fe);
						var Le = L(Fe, 2), Re = F(Le, !0);
						O(Le), O(Ae), O(Oe);
						var ze = L(Oe, 2), Be = (e) => {
							let t = /* @__PURE__ */ A(() => z(Q).filter((e) => bo[e]?.data?.mal?.kind === "blocks"));
							var n = gd(), r = F(n), i = F(r, !0);
							O(r);
							var a = L(r, 2);
							Kr(a, 20, () => z(t), (e) => e, (e, t) => {
								var n = El(), r = F(n, !0);
								O(n), R((e) => {
									J(n, "title", e), U(r, bo[t].data.mal.name);
								}, [() => Y("canvas.insertGroup")]), B("click", n, () => T?.sendInsertTemplate(t)), H(e, n);
							}), O(a), O(n), R((e) => U(i, e), [() => Y("canvas.tabMyTemplates")]), H(e, n);
						}, Ve = /* @__PURE__ */ A(() => z(Q).some((e) => bo[e]?.data?.mal?.kind === "blocks"));
						W(ze, (e) => {
							z(Ve) && e(Be);
						});
						var He = L(ze, 2), Ue = (e) => {
							var t = gd(), n = F(t), r = F(n, !0);
							O(n);
							var i = L(n, 2);
							Kr(i, 21, () => z(lp), (e) => e.type, (e, t) => {
								var n = Fr(), r = I(n), i = (e) => {
									var n = gd(), r = F(n), i = F(r, !0);
									O(r);
									var a = L(r, 2);
									Kr(a, 21, () => z(t).variants, (e) => e.label, (e, n) => {
										var r = El(), i = F(r, !0);
										O(r), R((e) => {
											J(r, "title", e), U(i, z(n).label);
										}, [() => Y("tip.blocks.fromPlugin", { plugin: z(t).plugin })]), B("click", r, () => up(z(t), z(n).props)), H(e, r);
									}), O(a), O(n), R(() => U(i, z(t).label)), H(e, n);
								}, a = (e) => {
									var n = El(), r = F(n, !0);
									O(n), R((e) => {
										J(n, "title", e), U(r, z(t).label);
									}, [() => Y("tip.blocks.fromPlugin", { plugin: z(t).plugin })]), B("click", n, () => up(z(t))), H(e, n);
								};
								W(r, (e) => {
									z(t).variants?.length ? e(i) : e(a, -1);
								}), H(e, n);
							}), O(i), O(t), R((e) => U(r, e), [() => Y("panel.plugins")]), H(e, t);
						};
						W(He, (e) => {
							z(lp).length && e(Ue);
						}), R((e, t, n, r, a, o, u, m, ye, be, Se, De, Oe, ke, Ae, T, E, Me, Pe, Fe, O, Le, ze, Be, Ve, He, Ue, We, Ge, Ke, qe, Je, Ye, Xe, Ze, Qe, $e, et, tt, nt, rt, it, at, ot, st, ct) => {
							U(i, e), U(s, t), J(c, "title", n), U(l, r), U(d, a), J(f, "title", o), U(p, `${u ?? ""} `), J(h, "title", m), U(g, ye), J(_, "title", be), U(v, Se), J(y, "title", De), U(b, Oe), J(x, "title", ke), U(S, Ae), J(C, "title", T), U(ee, E), J(te, "title", Me), U(ne, Pe), J(re, "title", Fe), U(ie, O), J(ae, "title", Le), U(oe, ze), J(se, "title", Be), U(ce, Ve), J(le, "title", He), U(ue, Ue), J(de, "title", We), U(fe, Ge), J(pe, "title", Ke), U(me, qe), J(he, "title", Je), U(ge, Ye), J(_e, "title", Xe), U(ve, Ze), U(xe, Qe), J(Ce, "title", $e), U(we, et), J(Te, "title", tt), U(Ee, `${nt ?? ""} `), U(w, rt), U(je, it), U(Ne, at), U(D, ot), U(Ie, st), U(Re, ct);
						}, [
							() => Y("blocks.text"),
							() => Y("blocks.text"),
							() => Y("tip.blocks.textBox"),
							() => Y("ui.textBox"),
							() => Y("blocks.button"),
							() => Y("tip.webpAuto"),
							() => Y("blocks.image"),
							() => Y("tip.blocks.video"),
							() => Y("blocks.video"),
							() => Y("tip.blocks.icon"),
							() => Y("blocks.icon"),
							() => Y("tip.blocks.collection"),
							() => Y("blocks.collection"),
							() => Y("tip.blocks.faq"),
							() => Y("blocks.faq"),
							() => Y("tip.blocks.timeline"),
							() => Y("blocks.timeline"),
							() => Y("tip.blocks.quote"),
							() => Y("blocks.quote"),
							() => Y("tip.blocks.stats"),
							() => Y("blocks.stats"),
							() => Y("tip.blocks.table"),
							() => Y("blocks.table"),
							() => Y("tip.blocks.share"),
							() => Y("blocks.share"),
							() => Y("tip.blocks.countdown"),
							() => Y("blocks.countdown"),
							() => Y("tip.blocks.audio"),
							() => Y("blocks.audio"),
							() => Y("tip.blocks.product"),
							() => Y("blocks.product"),
							() => Y("tip.blocks.cart"),
							() => Y("blocks.cart"),
							() => Y("tip.blocks.checkout"),
							() => Y("blocks.checkout"),
							() => Y("blocks.gallery"),
							() => Y("tip.blocks.gallery"),
							() => Y("ui.emptyGallery"),
							() => Y("tip.blocks.galleryImages"),
							() => Y("ui.galleryWithImages"),
							() => Y("group.shapes"),
							() => Y("shape.line"),
							() => Y("shape.arrow"),
							() => Y("shape.circle"),
							() => Y("shape.rect"),
							() => Y("shape.triangle")
						]), B("click", o, () => cp("text")), B("click", c, () => cp("text-box")), B("click", u, () => cp("button")), B("change", m, hp), B("click", h, () => cp("video")), B("click", _, () => cp("icon")), B("click", y, () => cp("collection")), B("click", x, () => cp("faq")), B("click", C, () => cp("timeline")), B("click", te, () => cp("quote")), B("click", re, () => cp("stats")), B("click", ae, () => cp("table")), B("click", se, () => cp("share")), B("click", le, () => cp("countdown")), B("click", de, () => cp("audio")), B("click", pe, () => cp("product")), B("click", he, () => cp("cart")), B("click", _e, () => cp("checkout")), B("click", Ce, () => cp("gallery")), B("change", De, yp), B("click", E, () => cp("shape-line")), B("click", Me, () => cp("shape-arrow")), B("click", Pe, () => cp("shape-circle")), B("click", Fe, () => cp("shape-rect")), B("click", Le, () => cp("shape-triangle")), H(e, t);
					};
					W(i, (e) => {
						z(o) ? e(a) : e(s, -1);
					}), O(t), R((e, i, a) => {
						n = pi(t, 1, "panel-body svelte-1n46o8q", null, n, { locked: z(ce) === "mobile" }), J(t, "title", e), J(r, "placeholder", i), J(r, "title", a);
					}, [
						() => z(ce) === "mobile" ? Y("tip.blocks.mobileLocked") : void 0,
						() => Y("canvas.searchBlocks"),
						() => Y("canvas.searchBlocks")
					]), wi(r, () => z(dp), (e) => P(dp, e)), H(e, t);
				}, g = (e) => {
					var t = yd(), n = F(t), r = F(n), i = L(r), a = F(i);
					O(i), O(n);
					var o = L(n, 2);
					K(o);
					var s = L(o, 2), c = F(s);
					K(c);
					var l = L(c);
					O(s), O(t), R((e, t) => {
						U(r, `${e ?? ""} `), U(a, `${z(re).size ?? ""} px`), q(o, z(re).size), bi(c, z(re).snap !== !1), U(l, ` ${t ?? ""}`);
					}, [() => Y("lbl.gridSize"), () => Y("lbl.gridSnap")]), B("input", o, (e) => Ir("size", Number(e.target.value))), B("change", c, (e) => Ir("snap", e.target.checked)), H(e, t);
				}, v = (e) => {
					var t = Ed(), r = F(t), i = (e) => {
						var t = bd(), n = I(t), r = F(n, !0);
						O(n);
						var i = L(n, 2);
						a(i), R((e) => U(r, e), [() => Y("blocks.suffix", { label: rn[z(k).type] ?? z(k).type })]), H(e, t);
					}, o = (e) => {
						var t = Td(), r = I(t), i = F(r, !0);
						O(r);
						var a = L(r, 2), o = F(a), s = L(o);
						K(s), O(a);
						var l = L(a, 4), u = F(l);
						K(u);
						var d = L(u);
						O(l);
						var f = L(l, 2), p = (e) => {
							var t = xd(), n = I(t), r = F(n), i = L(r), a = F(i);
							O(i), O(n);
							var o = L(n, 2);
							K(o), R((e) => {
								U(r, `${e ?? ""} `), U(a, `${z(un).size ?? ""} px`), q(o, z(un).size);
							}, [() => Y("lbl.gridSize")]), B("input", o, (e) => Pr("size", Number(e.target.value))), H(e, t);
						};
						W(f, (e) => {
							z(un) && e(p);
						});
						var m = L(f, 4), g = F(m, !0);
						O(m);
						var _ = L(m, 2);
						Kr(_, 21, () => [["", "common.standard"], ...Object.entries(Bs)], ([e, t]) => e, (e, t) => {
							var n = /* @__PURE__ */ A(() => h(z(t), 2));
							let r = () => z(n)[0], i = () => z(n)[1], a = /* @__PURE__ */ A(() => xn(r()));
							var o = Sd();
							let s;
							var c = F(o), l = F(c), u = L(l, 2), d = L(u, 2);
							O(c);
							var f = L(c, 2), p = F(f, !0);
							O(f), O(o), R((e, t) => {
								s = pi(o, 1, "rs-card svelte-1n46o8q", null, s, { on: z(hn) === r() }), J(o, "title", e), hi(c, `background: ${z(a).bg ?? ""}`), hi(l, `background: ${z(a).text ?? ""}`), hi(u, `background: ${z(a).surface ?? ""}`), hi(d, `background: ${z(a).accent ?? ""}`), U(p, t);
							}, [() => Y("tip.props.sectionTheme"), () => Y(i())]), B("click", o, () => bn(r())), H(e, o);
						}), O(_);
						var v = L(_, 2), y = F(v), b = L(y), x = F(b), S = F(x);
						O(x);
						var C = L(x, 2);
						G(C, () => c.copy, !0), O(C), O(b), O(v);
						var ee = L(v, 4), te = F(ee, !0);
						O(ee);
						var ne = L(ee, 2);
						n(ne, () => z(ir), () => z(fn));
						var re = L(ne, 4), ie = F(re), ae = L(ie);
						{
							let e = /* @__PURE__ */ A(() => vr(z(pn)) ? z(pn).type : "");
							X(ae, {
								get value() {
									return z(e);
								},
								get options() {
									return yr;
								},
								onchange: (e) => Or(e || null)
							});
						}
						O(re);
						var oe = L(re, 2), se = (e) => {
							var t = wd(), n = I(t), r = F(n), i = L(r);
							K(i), O(n);
							var a = L(n, 2), o = F(a), s = L(o);
							K(s), O(a);
							var c = L(a, 2), l = (e) => {
								var t = Cd(), n = I(t), r = F(n), i = L(r);
								{
									let e = /* @__PURE__ */ A(() => z(pn).props.effect ?? "slide-up"), t = /* @__PURE__ */ A(() => [
										["fade-in", Y("anim.fadeIn")],
										["slide-up", Y("anim.slideUp")],
										["zoom-in", Y("anim.zoomIn")]
									]);
									X(i, {
										get value() {
											return z(e);
										},
										get options() {
											return z(t);
										},
										onchange: (e) => jr("effect", e)
									});
								}
								O(n);
								var a = L(n, 2), o = F(a), s = L(o);
								K(s), O(a);
								var c = L(a, 2), l = F(c), u = L(l);
								{
									let e = /* @__PURE__ */ A(() => z(pn).props.pattern ?? "sequence"), t = /* @__PURE__ */ A(() => [
										["sequence", Y("opt.stagger.sequence")],
										["columns", Y("opt.stagger.columns")],
										["rows", Y("opt.stagger.rows")],
										["center", Y("opt.stagger.center")]
									]);
									X(u, {
										get value() {
											return z(e);
										},
										get options() {
											return z(t);
										},
										onchange: (e) => jr("pattern", e)
									});
								}
								O(c), R((e, t, i, u, d, f) => {
									J(n, "title", e), U(r, `${t ?? ""} `), J(a, "title", i), U(o, `${u ?? ""} `), q(s, z(pn).props.step ?? 90), J(c, "title", d), U(l, `${f ?? ""} `);
								}, [
									() => Y("tip.props.staggerEffect"),
									() => Y("lbl.staggerEffect"),
									() => Y("tip.props.staggerStep"),
									() => Y("lbl.stepMs"),
									() => Y("tip.props.staggerPattern"),
									() => Y("lbl.pattern")
								]), B("change", s, (e) => Ar("step", Number(e.target.value))), H(e, t);
							};
							W(c, (e) => {
								z(pn).type === "stagger" && e(l);
							}), R((e, t) => {
								U(r, `${e ?? ""} `), q(i, z(pn).props.duration), U(o, `${t ?? ""} `), q(s, z(pn).props.delay ?? 0);
							}, [() => Y("lbl.durationMs"), () => Y("lbl.delayMs")]), B("change", i, (e) => Ar("duration", Number(e.target.value))), B("change", s, (e) => Ar("delay", Number(e.target.value))), H(e, t);
						}, ce = /* @__PURE__ */ A(() => vr(z(pn)));
						W(oe, (e) => {
							z(ce) && e(se);
						});
						var le = L(oe, 2), ue = F(le), de = L(ue);
						{
							let e = /* @__PURE__ */ A(() => z(mn)?.type ?? (z(pn) && !vr(z(pn)) ? z(pn).type : ""));
							X(de, {
								get value() {
									return z(e);
								},
								get options() {
									return xr;
								},
								onchange: (e) => kr(e || null)
							});
						}
						O(le), R((e, t, n, r, c, l, f, p, h, _, b, x, ee, ne, ae) => {
							U(i, e), J(a, "title", t), U(o, `${n ?? ""} `), q(s, z(dn)), J(s, "placeholder", r), bi(u, z(un) !== null), U(d, ` ${c ?? ""}`), J(m, "title", l), U(g, f), J(v, "title", p), U(y, `${h ?? ""} `), U(S, `#${z(ln) ?? ""}`), J(C, "title", _), U(te, b), J(re, "title", x), U(ie, `${ee ?? ""} `), J(le, "title", ne), U(ue, `${ae ?? ""} `);
						}, [
							() => Y("lbl.section"),
							() => Y("hint.props.minHeight"),
							() => Y("lbl.minHeight"),
							() => Y("ph.minHeight"),
							() => Y("lbl.sectionGrid"),
							() => Y("tip.props.sectionTheme"),
							() => Y("lbl.sectionTheme"),
							() => Y("tip.props.anchor"),
							() => Y("lbl.anchor"),
							() => Y("tip.props.copyAnchor"),
							() => Y("lbl.background"),
							() => Y("tip.props.sectionAnim"),
							() => Y("lbl.animIn"),
							() => Y("tip.props.sectionHover"),
							() => Y("lbl.onHover")
						]), B("change", s, (e) => Mr(e.target.value)), B("change", u, (e) => V(e.target.checked)), B("click", C, () => navigator.clipboard?.writeText(`#${z(ln)}`)), H(e, t);
					}, s = (e) => {
						var t = gl(), n = F(t, !0);
						O(t), R((e) => U(n, e), [() => Y("hint.props.empty")]), H(e, t);
					};
					W(r, (e) => {
						z(k) ? e(i) : z(ln) ? e(o, 1) : e(s, -1);
					}), O(t), H(e, t);
				}, y = (e) => {
					var t = Pd(), i = F(t), a = F(i);
					K(a);
					var o = L(a);
					O(i);
					var s = L(i, 2), l = (e) => {
						var t = gd(), n = F(t), r = F(n, !0);
						O(n);
						var i = L(n, 2);
						Kr(i, 21, () => z(E).pages ?? [], (e) => e.id, (e, t) => {
							var n = wl(), r = F(n);
							K(r);
							var i = L(r);
							O(n), R((e, a) => {
								J(n, "title", e), bi(r, a), U(i, ` ${(z(t).title || z(t).id) ?? ""}`);
							}, [() => Y("tip.footer.hideOnPage"), () => !(z(E).footer?.hideOn ?? []).includes(z(t).id)]), B("change", r, (e) => hc(z(t).id, e.target.checked)), H(e, n);
						}), O(i), O(t), R((e) => U(r, e), [() => Y("group.showOnPages")]), H(e, t);
					};
					W(s, (e) => {
						z(E).footer?.show && e(l);
					});
					var u = L(s, 2), d = F(u), f = F(d, !0);
					O(d);
					var p = L(d, 2), m = F(p);
					Kr(m, 21, () => $s, (e) => e.id, (e, t) => {
						var n = Dd(), r = F(n);
						G(r, () => Vc(z(t).thumb), !0), O(r);
						var i = L(r, 2), a = F(i, !0);
						O(i), O(n), R((e) => {
							J(n, "title", e), U(a, z(t).label);
						}, [() => Y("tip.footer.template", { label: z(t).label })]), B("click", n, () => tc(z(t).id)), H(e, n);
					}), O(m), O(p), O(u);
					var h = L(u, 2), g = F(h), _ = F(g, !0);
					O(g);
					var v = L(g, 2), y = F(v), b = F(y), x = L(b);
					K(x), O(y);
					var S = L(y, 2), C = F(S), ee = L(C);
					K(ee), O(S);
					var te = L(S, 2), ne = F(te), re = L(ne);
					{
						let e = /* @__PURE__ */ A(() => z(E).footer?.brand?.mode ?? "text"), t = /* @__PURE__ */ A(() => [
							["text", Y("blocks.text")],
							["image", Y("opt.brand.image")],
							["both", Y("opt.brand.both")]
						]);
						X(re, {
							get value() {
								return z(e);
							},
							get options() {
								return z(t);
							},
							onchange: (e) => Js(e)
						});
					}
					O(te);
					var ie = L(te, 2), ae = (e) => {
						var t = kd(), n = I(t), r = F(n), i = F(r), a = L(i);
						O(r);
						var o = L(r, 2), s = (e) => {
							var t = Yc();
							G(t, () => c.cross, !0), O(t), R((e) => J(t, "title", e), [() => Y("tip.footer.removeLogo")]), B("click", t, Xs), H(e, t);
						};
						W(o, (e) => {
							z(E).footer?.brand?.logo && e(s);
						}), O(n);
						var l = L(n, 2), u = (e) => {
							var t = Od(), n = I(t), r = F(n), i = L(r), a = F(i);
							O(i), O(n);
							var o = L(n, 2);
							K(o), R((e) => {
								U(r, `${e ?? ""} `), U(a, `${z(E).footer?.brand?.logoHeight ?? 40 ?? ""} px`), q(o, z(E).footer?.brand?.logoHeight ?? 40);
							}, [() => Y("lbl.logoHeight")]), B("input", o, (e) => Zs(e.target.value)), H(e, t);
						};
						W(l, (e) => {
							z(E).footer?.brand?.logo && e(u);
						}), R((e, t) => {
							J(r, "title", e), U(i, `${t ?? ""} `);
						}, [() => Y("tip.webpAutoPublish"), () => z(E).footer?.brand?.logo ? Y("ui.changeLogo") : Y("ui.uploadLogo")]), B("change", a, Ys), H(e, t);
					};
					W(ie, (e) => {
						(z(E).footer?.brand?.mode ?? "text") !== "text" && e(ae);
					}), O(v), O(h);
					var oe = L(h, 2), se = F(oe), ce = F(se, !0);
					O(se);
					var le = L(se, 2), ue = F(le);
					Kr(ue, 17, () => z(E).footer?.columns ?? [], Hr, (e, t, n) => {
						var r = Ad(), i = I(r), a = F(i);
						K(a);
						var o = L(a, 2), s = F(o);
						G(s, () => c.plus, !0), O(s);
						var l = L(s, 2);
						l.disabled = n === 0, G(l, () => c.up, !0), O(l);
						var u = L(l, 2);
						G(u, () => c.down, !0), O(u);
						var d = L(u, 2);
						G(d, () => c.cross, !0), O(d), O(o), O(i), Kr(L(i, 2), 17, () => z(t).links ?? [], Hr, (e, r, i) => {
							var a = fl(), o = F(a);
							K(o);
							var s = L(o, 2), l = F(s);
							l.disabled = i === 0, G(l, () => c.up, !0), O(l);
							var u = L(l, 2);
							G(u, () => c.down, !0), O(u);
							var d = L(u, 2);
							G(d, () => c.cross, !0), O(d), O(s);
							var f = L(s, 2), p = F(f);
							{
								let e = /* @__PURE__ */ A(() => z(r).page ?? "__href"), t = /* @__PURE__ */ A(() => Y("tip.linkTarget")), a = /* @__PURE__ */ A(() => [...z(E).pages.map((e) => [e.id, e.title]), ["__href", Y("opt.linkHref")]]);
								X(p, {
									get value() {
										return z(e);
									},
									get title() {
										return z(t);
									},
									get options() {
										return z(a);
									},
									onchange: (e) => wc(n, i, e)
								});
							}
							O(f);
							var m = L(f, 2), h = (e) => {
								var t = dl();
								K(t), R((e, n) => {
									q(t, z(r).href ?? ""), J(t, "placeholder", e), J(t, "title", n);
								}, [() => Y("ph.hrefAnchor"), () => Y("tip.hrefAnchor")]), B("change", t, (e) => Tc(n, i, e.target.value)), H(e, t);
							};
							W(m, (e) => {
								z(r).page || e(h);
							}), O(a), R((e, n) => {
								q(o, z(r).label), J(o, "title", e), u.disabled = i === z(t).links.length - 1, J(d, "title", n);
							}, [() => Y("tip.linkLabel"), () => Y("tip.removeLink")]), B("input", o, (e) => Cc(n, i, e.target.value)), B("click", l, () => Sc(n, i, -1)), B("click", u, () => Sc(n, i, 1)), B("click", d, () => xc(n, i)), H(e, a);
						}), R((e, r, i) => {
							q(a, z(t).title), J(a, "title", e), J(s, "title", r), u.disabled = n === z(E).footer.columns.length - 1, J(d, "title", i);
						}, [
							() => Y("tip.footer.columnTitle"),
							() => Y("tip.footer.addLink"),
							() => Y("tip.footer.removeColumn")
						]), B("input", a, (e) => yc(n, e.target.value)), B("click", s, () => bc(n)), B("click", l, () => vc(n, -1)), B("click", u, () => vc(n, 1)), B("click", d, () => _c(n)), H(e, r);
					});
					var de = L(ue, 2), fe = F(de, !0);
					O(de);
					var pe = L(de, 2), me = F(pe), he = L(me);
					{
						let e = /* @__PURE__ */ A(() => z(E).footer?.columnsAlign ?? "left"), t = /* @__PURE__ */ A(() => [["left", Y("common.left")], ["center", Y("common.center")]]);
						X(he, {
							get value() {
								return z(e);
							},
							get options() {
								return z(t);
							},
							onchange: (e) => dc(e)
						});
					}
					O(pe), O(le), O(oe);
					var ge = L(oe, 2), _e = F(ge), ve = F(_e, !0);
					O(_e);
					var ye = L(_e, 2), be = F(ye);
					Kr(be, 17, () => z(E).footer?.social ?? [], Hr, (e, t, n) => {
						var r = jd(), i = F(r), a = F(i);
						G(a, () => Aa(z(t).icon) || "", !0), O(a);
						var o = L(a, 2);
						{
							let e = /* @__PURE__ */ A(() => Y("blocks.icon"));
							X(o, {
								get value() {
									return z(t).icon;
								},
								get title() {
									return z(e);
								},
								get options() {
									return Mc;
								},
								onchange: (e) => Ac(n, e)
							});
						}
						O(i);
						var s = L(i, 2), l = F(s);
						l.disabled = n === 0, G(l, () => c.up, !0), O(l);
						var u = L(l, 2);
						G(u, () => c.down, !0), O(u);
						var d = L(u, 2);
						G(d, () => c.cross, !0), O(d), O(s);
						var f = L(s, 2);
						K(f), O(r), R((e, r) => {
							u.disabled = n === z(E).footer.social.length - 1, J(d, "title", e), q(f, z(t).url), J(f, "placeholder", r);
						}, [() => Y("tip.removeLink"), () => Y("ph.hrefMailto")]), B("click", l, () => Oc(n, -1)), B("click", u, () => Oc(n, 1)), B("click", d, () => Dc(n)), B("change", f, (e) => jc(n, e.target.value)), H(e, r);
					});
					var xe = L(be, 2), Se = F(xe, !0);
					O(xe), O(ye), O(ge);
					var Ce = L(ge, 2), we = F(Ce), Te = F(we, !0);
					O(we);
					var Ee = L(we, 2), De = F(Ee), Oe = F(De);
					K(Oe);
					var ke = L(Oe);
					O(De);
					var w = L(De, 2), Ae = (e) => {
						let t = /* @__PURE__ */ A(() => z(E).footer.cta);
						var n = Nd(), r = I(n), i = F(r), a = L(i);
						{
							let e = /* @__PURE__ */ A(() => z(t).kind ?? "button"), n = /* @__PURE__ */ A(() => [["button", Y("opt.cta.button")], ["newsletter", Y("opt.cta.newsletter")]]);
							X(a, {
								get value() {
									return z(e);
								},
								get options() {
									return z(n);
								},
								onchange: (e) => pc("kind", e)
							});
						}
						O(r);
						var o = L(r, 2), s = F(o);
						K(s);
						var c = L(s);
						O(o);
						var l = L(o, 2), u = F(l), d = L(u);
						K(d), O(l);
						var f = L(l, 2), p = F(f), m = L(p);
						K(m), O(f);
						var h = L(f, 2), g = F(h), _ = L(g);
						K(_), O(h);
						var v = L(h, 2), y = (e) => {
							var n = Md(), r = I(n), i = F(r), a = L(i);
							{
								let e = /* @__PURE__ */ A(() => z(t).page ?? "__href"), n = /* @__PURE__ */ A(() => [...z(E).pages.map((e) => [e.id, e.title]), ["__href", Y("opt.linkHrefMailto")]]);
								X(a, {
									get value() {
										return z(e);
									},
									get options() {
										return z(n);
									},
									onchange: (e) => mc(e)
								});
							}
							O(r);
							var o = L(r, 2), s = (e) => {
								var n = Ol();
								K(n), R((e, r) => {
									q(n, z(t).href ?? ""), J(n, "placeholder", e), J(n, "title", r);
								}, [() => Y("ph.hrefMailtoAnchor"), () => Y("tip.hrefAnchor")]), B("change", n, (e) => pc("href", e.target.value)), H(e, n);
							};
							W(o, (e) => {
								z(t).page || e(s);
							}), R((e, t) => {
								J(r, "title", e), U(i, `${t ?? ""} `);
							}, [() => Y("tip.footer.ctaTarget"), () => Y("lbl.buttonTarget")]), H(e, n);
						}, b = (e) => {
							var n = xl(), r = I(n), i = F(r), a = L(i);
							K(a), O(r);
							var o = L(r, 2), s = F(o), c = L(s);
							K(c), O(o);
							var l = L(o, 2), u = F(l), d = L(u);
							K(d), O(l), R((e, n, f, p, m, h, g, _, v) => {
								J(r, "title", e), U(i, `${n ?? ""} `), q(a, z(t).endpoint ?? ""), J(a, "placeholder", f), J(o, "title", p), U(s, `${m ?? ""} `), q(c, z(t).recipient ?? ""), J(c, "placeholder", h), J(l, "title", g), U(u, `${_ ?? ""} `), q(d, z(t).success ?? ""), J(d, "placeholder", v);
							}, [
								() => Y("tip.footer.ctaEndpoint"),
								() => Y("lbl.newsletterEndpoint"),
								() => Y("ph.endpoint"),
								() => Y("tip.footer.ctaRecipient"),
								() => Y("lbl.recipientFallback"),
								() => Y("ph.email"),
								() => Y("tip.footer.ctaSuccess"),
								() => Y("lbl.confirmation"),
								() => Y("ph.footer.ctaSuccess")
							]), B("change", a, (e) => pc("endpoint", e.target.value)), B("change", c, (e) => pc("recipient", e.target.value)), B("input", d, (e) => pc("success", e.target.value)), H(e, n);
						};
						W(v, (e) => {
							(z(t).kind ?? "button") === "button" ? e(y) : e(b, -1);
						}), R((e, n, a, v, y, b, x, S, C, ee, te, ne) => {
							J(r, "title", e), U(i, `${n ?? ""} `), J(o, "title", a), bi(s, z(t).big === !0), U(c, ` ${v ?? ""}`), J(l, "title", y), U(u, `${b ?? ""} `), q(d, z(t).heading ?? ""), J(d, "placeholder", x), J(f, "title", S), U(p, `${C ?? ""} `), q(m, z(t).sub ?? ""), J(h, "title", ee), U(g, `${te ?? ""} `), q(_, z(t).label ?? ""), J(_, "placeholder", ne);
						}, [
							() => Y("tip.footer.ctaKind"),
							() => Y("common.type"),
							() => Y("tip.footer.ctaBig"),
							() => Y("lbl.bigCentered"),
							() => Y("tip.footer.ctaHeading"),
							() => Y("lbl.heading"),
							() => Y("ph.footer.ctaHeading"),
							() => Y("tip.footer.ctaSub"),
							() => Y("lbl.subText"),
							() => Y("tip.footer.ctaLabel"),
							() => Y("lbl.buttonText"),
							() => Y("ph.footer.ctaLabel")
						]), B("change", s, (e) => pc("big", e.target.checked)), B("input", d, (e) => pc("heading", e.target.value)), B("input", m, (e) => pc("sub", e.target.value)), B("input", _, (e) => pc("label", e.target.value)), H(e, n);
					};
					W(w, (e) => {
						z(E).footer?.cta && e(Ae);
					}), O(Ee), O(Ce);
					var T = L(Ce, 2), je = F(T), Me = F(je, !0);
					O(je);
					var Ne = L(je, 2), Pe = F(Ne);
					r(Pe, () => "linkRow", () => z(E).footer?.linkRow ?? []);
					var D = L(Pe, 2), Fe = F(D, !0);
					O(D), O(Ne), O(T);
					var Ie = L(T, 2), Re = F(Ie), ze = F(Re, !0);
					O(Re);
					var Be = L(Re, 2), Ve = F(Be), He = (e) => {
						var t = tu(), n = I(t), r = F(n), i = L(r);
						{
							let e = /* @__PURE__ */ A(() => z(E).footer?.align ?? "left"), t = /* @__PURE__ */ A(() => [
								["left", Y("common.left")],
								["center", Y("common.center")],
								["right", Y("common.right")]
							]);
							X(i, {
								get value() {
									return z(e);
								},
								get options() {
									return z(t);
								},
								onchange: (e) => Ks("footer", (t) => {
									t.align = e;
								})
							});
						}
						O(n), Le(2), R((e, t) => {
							J(n, "title", e), U(r, `${t ?? ""} `);
						}, [() => Y("tip.footer.align"), () => Y("lbl.align")]), H(e, t);
					};
					W(Ve, (e) => {
						z(E).footer?.cta?.big !== !0 && e(He);
					});
					var Ue = L(Ve, 2), We = F(Ue, !0);
					O(Ue);
					var Ge = L(Ue, 2);
					n(Ge, () => or, () => z(E).footer?.background?.layers ?? []), O(Be), O(Ie);
					var Ke = L(Ie, 2), qe = F(Ke), Je = F(qe, !0);
					O(qe);
					var Ye = L(qe, 2), Xe = F(Ye), Ze = F(Xe), Qe = L(Ze);
					K(Qe), O(Xe);
					var $e = L(Xe, 2), et = F($e, !0);
					O($e);
					var tt = L($e, 2);
					r(tt, () => "baseline", () => z(E).footer?.baseline ?? []);
					var nt = L(tt, 2), rt = F(nt, !0);
					O(nt), O(Ye), O(Ke), O(t), R((e, t, n, r, s, c, l, u, d, p, m, h, g, v, re, ie, ae, oe, se, le, ue, de, he, ge, _e, ye, be, xe, Ce, we, Ee, w) => {
						J(i, "title", e), bi(a, t), U(o, ` ${n ?? ""}`), U(f, r), U(_, s), J(y, "title", c), U(b, `${l ?? ""} `), q(x, z(E).footer?.brand?.title ?? ""), J(x, "placeholder", u), J(S, "title", d), U(C, `${p ?? ""} `), q(ee, z(E).footer?.brand?.tagline ?? ""), J(te, "title", m), U(ne, `${h ?? ""} `), U(ce, g), U(fe, v), J(pe, "title", re), U(me, `${ie ?? ""} `), U(ve, ae), U(Se, oe), U(Te, se), J(De, "title", le), bi(Oe, ue), U(ke, ` ${de ?? ""}`), U(Me, he), U(Fe, ge), U(ze, _e), U(We, ye), U(Je, be), J(Xe, "title", xe), U(Ze, `${Ce ?? ""} `), q(Qe, z(E).footer?.copyright ?? ""), J(Qe, "placeholder", we), U(et, Ee), U(rt, w);
					}, [
						() => Y("tip.footer.show"),
						() => !!z(E).footer?.show,
						() => Y("lbl.showFooter"),
						() => Y("group.startpoint"),
						() => Y("group.brand"),
						() => Y("tip.footer.brandTitle"),
						() => Y("lbl.title"),
						() => Y("ph.footer.brandTitle"),
						() => Y("tip.footer.tagline"),
						() => Y("lbl.tagline"),
						() => Y("tip.footer.brandMode"),
						() => Y("lbl.brandMode"),
						() => Y("group.columns"),
						() => Y("ui.addColumn"),
						() => Y("tip.footer.columnsAlign"),
						() => Y("lbl.splitColumnAlign"),
						() => Y("group.social"),
						() => Y("ui.addSocial"),
						() => Y("group.cta"),
						() => Y("tip.footer.cta"),
						() => !!z(E).footer?.cta,
						() => Y("lbl.showCta"),
						() => Y("group.linkRow"),
						() => Y("ui.addRowLink"),
						() => Y("group.appearance"),
						() => Y("lbl.background"),
						() => Y("group.baseline"),
						() => Y("tip.footer.copyright"),
						() => Y("lbl.copyright"),
						() => Y("ph.footer.copyright"),
						() => Y("lbl.baselineLinks"),
						() => Y("ui.addBaselineLink")
					]), B("change", a, (e) => Ks("footer", (t) => {
						t.show = e.target.checked;
					})), B("input", x, (e) => qs("title", e.target.value)), B("input", ee, (e) => qs("tagline", e.target.value)), B("click", de, gc), B("click", xe, Ec), B("change", Oe, (e) => fc(e.target.checked)), B("click", D, () => ic("linkRow")), B("input", Qe, (e) => Qs(e.target.value)), B("click", nt, () => ic("baseline")), H(e, t);
				}, b = (e) => {
					var t = Ud(), n = F(t), r = (e) => {
						var t = pl(), n = F(t), r = L(n);
						{
							let e = /* @__PURE__ */ A(() => z(fo) ?? ""), t = /* @__PURE__ */ A(() => [["", Y("common.choose")], ...z(lo).map((e) => [e, z(uo)[e]?.name ?? e])]);
							X(r, {
								get value() {
									return z(e);
								},
								get options() {
									return z(t);
								},
								onchange: (e) => P(fo, e || null, !0)
							});
						}
						O(t), R((e) => U(n, `${e ?? ""} `), [() => Y("blocks.collection")]), H(e, t);
					};
					W(n, (e) => {
						z(lo).length && e(r);
					});
					var i = L(n, 2), a = (e) => {
						let t = /* @__PURE__ */ A(() => z(uo)[z(fo)]);
						var n = Hd(), r = I(n), i = F(r), a = F(i, !0);
						O(i);
						var o = L(i, 2), s = F(o, !0);
						O(o);
						var l = L(o, 2), u = F(l), d = L(u);
						O(l);
						var f = L(l, 2);
						G(f, () => c.cross, !0), O(f), O(r);
						var p = L(r, 2);
						Kr(p, 19, () => z(t).entries, (e) => e.id, (e, n, r) => {
							var i = Vd(), a = F(i), o = F(a);
							O(a);
							var s = L(a, 2), l = F(s), u = F(l);
							K(u);
							var d = L(u, 2), f = F(d);
							G(f, () => c.up, !0), O(f);
							var p = L(f, 2);
							G(p, () => c.down, !0), O(p);
							var m = L(p, 2);
							G(m, () => c.cross, !0), O(m), O(d), O(l);
							var h = L(l, 2), g = (e) => {
								var t = Fd(), r = F(t), i = L(r);
								K(i), O(t), R((e) => {
									U(r, `${e ?? ""} `), q(i, z(n).date ?? "");
								}, [() => Y("lbl.date")]), B("change", i, (e) => Uo(z(fo), z(n).id, "date", e.target.value)), H(e, t);
							};
							W(h, (e) => {
								z(t).kind !== "products" && e(g);
							});
							var _ = L(h, 2);
							dt(_);
							var v = L(_, 2), y = (e) => {
								var t = Id(), r = F(t), i = L(r);
								K(i), O(t), R((e, t) => {
									U(r, `${e ?? ""} `), q(i, z(n).href ?? ""), J(i, "placeholder", t);
								}, [() => Y("lbl.link"), () => Y("ph.collections.href")]), B("change", i, (e) => Uo(z(fo), z(n).id, "href", e.target.value)), H(e, t);
							};
							W(v, (e) => {
								z(t).kind !== "products" && e(y);
							});
							var b = L(v, 2), x = F(b), S = F(x), C = L(S);
							O(x);
							var ee = L(x, 2), te = (e) => {
								var t = Ld(), r = I(t), i = L(r, 2);
								G(i, () => c.cross, !0), O(i), R((e) => {
									J(r, "src", z(n).image), J(i, "title", e);
								}, [() => Y("tip.removeImage")]), B("click", i, () => Uo(z(fo), z(n).id, "image", "")), H(e, t);
							};
							W(ee, (e) => {
								z(n).image && e(te);
							}), O(b);
							var ne = L(b, 2), re = (e) => {
								var t = Bd(), r = I(t), i = F(r), a = L(i);
								K(a), O(r);
								var o = L(r, 2), s = F(o), l = L(s);
								K(l), O(o);
								var u = L(o, 2), d = F(u), f = L(d);
								K(f), O(u);
								var p = L(u, 2), m = F(p), h = L(m);
								K(h), O(p);
								var g = L(p, 2);
								Kr(g, 17, () => z(n).colors ?? [], Hr, (e, t, r) => {
									var i = zd(), a = F(i);
									K(a);
									var o = L(a, 2), s = F(o), l = L(s);
									O(o);
									var u = L(o, 2), d = (e) => {
										var n = Rd();
										R(() => J(n, "src", z(t).image)), H(e, n);
									};
									W(u, (e) => {
										z(t).image && e(d);
									});
									var f = L(u, 2);
									G(f, () => c.cross, !0), O(f), O(i), R((e, n) => {
										q(a, z(t).name), J(a, "placeholder", e), U(s, `${n ?? ""} `);
									}, [() => Y("ph.colorName"), () => z(t).image ? Y("ui.changeImage") : Y("ui.addImage")]), B("change", a, (e) => $o(z(fo), z(n).id, r, "name", e.target.value)), B("change", l, (e) => es(z(fo), z(n).id, r, e)), B("click", f, () => ns(z(fo), z(n).id, r)), H(e, i);
								});
								var _ = L(g, 2), v = F(_, !0);
								O(_), R((e, t, r, c, g, y, b, x, S, C, ee) => {
									U(i, `${e ?? ""} `), q(a, z(n).price ?? ""), J(o, "title", t), U(s, `${r ?? ""} `), q(l, z(n).memberPrice ?? ""), J(u, "title", c), U(d, `${g ?? ""} `), q(f, z(n).badge ?? ""), J(p, "title", y), U(m, `${b ?? ""} `), q(h, x), J(h, "placeholder", S), J(_, "title", C), U(v, ee);
								}, [
									() => Y("lbl.price"),
									() => Y("tip.entry.memberPrice"),
									() => Y("lbl.memberPrice"),
									() => Y("tip.entry.badge"),
									() => Y("lbl.productBadge"),
									() => Y("tip.entry.sizes"),
									() => Y("lbl.sizes"),
									() => (z(n).sizes ?? []).join(", "),
									() => Y("ph.sizes"),
									() => Y("tip.entry.colors"),
									() => Y("ui.addColor")
								]), B("change", a, (e) => Uo(z(fo), z(n).id, "price", e.target.value === "" ? "" : Number(e.target.value))), B("change", l, (e) => Uo(z(fo), z(n).id, "memberPrice", e.target.value === "" ? "" : Number(e.target.value))), B("change", f, (e) => Uo(z(fo), z(n).id, "badge", e.target.value)), B("change", h, (e) => Xo(z(fo), z(n).id, e.target.value)), B("click", _, () => Zo(z(fo), z(n).id)), H(e, t);
							};
							W(ne, (e) => {
								z(t).kind === "products" && e(re);
							}), O(s), O(i), R((e, i, a, s, c) => {
								U(o, `${e ?? ""}${z(t).kind === "products" ? z(n).price == null ? "" : ` · ${z(n).price}` : z(n).date ? ` · ${z(n).date}` : ""}`), q(u, z(n).title), J(u, "title", i), f.disabled = z(r) === 0, p.disabled = z(r) === z(t).entries.length - 1, J(m, "title", a), J(_, "placeholder", s), q(_, z(n).text ?? ""), U(S, `${c ?? ""} `);
							}, [
								() => Io(z(n).title),
								() => Y("lbl.title"),
								() => Y("tip.collections.deleteEntry"),
								() => Y("ph.collections.text"),
								() => z(n).image ? Y("ui.changeImage") : Y("ui.addImage")
							]), B("change", u, (e) => Uo(z(fo), z(n).id, "title", e.target.value || Y("ui.untitled"))), B("click", f, () => Wo(z(fo), z(r), -1)), B("click", p, () => Wo(z(fo), z(r), 1)), B("click", m, () => Go(z(fo), z(n).id)), B("change", _, (e) => Uo(z(fo), z(n).id, "text", e.target.value)), B("change", C, (e) => Yo(z(fo), z(n).id, e)), H(e, i);
						});
						var m = L(p, 2), h = (e) => {
							var t = gl(), n = F(t, !0);
							O(t), R((e) => U(n, e), [() => Y("hint.collections.empty")]), H(e, t);
						};
						W(m, (e) => {
							z(t).entries.length || e(h);
						}), Le(2), R((e, t, n, r, i, c) => {
							U(a, e), J(o, "title", t), U(s, n), J(l, "title", r), U(u, `${i ?? ""} `), J(f, "title", c);
						}, [
							() => Y("ui.addEntry"),
							() => Y("tip.collections.exportCsv"),
							() => Y("ui.exportCsv"),
							() => Y("tip.collections.importCsv"),
							() => Y("ui.importCsv"),
							() => Y("tip.collections.deleteCollection")
						]), B("click", i, () => Ho(z(fo))), B("click", o, () => ss(z(fo))), B("change", d, (e) => cs(z(fo), e)), B("click", f, () => Vo(z(fo))), H(e, n);
					};
					W(i, (e) => {
						z(fo) && z(uo)[z(fo)] && e(a);
					});
					var o = L(i, 2), s = F(o), l = L(s);
					K(l), O(o);
					var u = L(o, 2), d = F(u);
					X(L(d), {
						get value() {
							return z(mo);
						},
						get options() {
							return _o;
						},
						onchange: (e) => P(mo, e, !0)
					}), O(u);
					var f = L(u, 2), p = F(f, !0);
					O(f), O(t), R((e, t, n, r, i) => {
						U(s, `${e ?? ""} `), J(l, "placeholder", t), U(d, `${n ?? ""} `), f.disabled = r, U(p, i);
					}, [
						() => Y("lbl.newCollectionName"),
						() => Y("ph.collections.name"),
						() => Y("common.type"),
						() => !z(po).trim(),
						() => Y("ui.createCollection")
					]), B("keydown", l, (e) => e.key === "Enter" && zo()), wi(l, () => z(po), (e) => P(po, e)), B("click", f, zo), H(e, t);
				}, x = (e) => {
					var t = Xd(), n = F(t), r = (e) => {
						var t = gl(), n = F(t, !0);
						O(t), R((e) => U(n, e), [() => Y("hint.plugins.empty")]), H(e, t);
					}, i = /* @__PURE__ */ A(() => !ys().length);
					W(n, (e) => {
						z(i) && e(r);
					});
					var a = L(n, 2);
					Kr(a, 16, ys, (e) => e, (e, t) => {
						let n = /* @__PURE__ */ A(() => ps[t]), r = /* @__PURE__ */ A(() => (z(fs)?.enabled ?? []).includes(t));
						var i = Kd();
						let a;
						var o = F(i), s = F(o), l = F(s, !0);
						O(s);
						var u = L(s, 2), d = (e) => {
							var t = Wd(), r = F(t);
							O(t), R(() => U(r, `v${z(n).version ?? ""}`)), H(e, t);
						};
						W(u, (e) => {
							z(n)?.version && e(d);
						});
						var f = L(u, 2), p = F(f), m = F(p);
						K(m);
						var h = L(m);
						O(p);
						var g = L(p, 2);
						G(g, () => c.cross, !0), O(g), O(f), O(o);
						var _ = L(o, 2), v = (e) => {
							var t = Gd(), r = F(t, !0);
							O(t), R((e) => U(r, e), [() => z(n).errors.join("; ")]), H(e, t);
						}, y = (e) => {
							var t = Gd(), r = F(t, !0);
							O(t), R((e) => U(r, e), [() => Y("plugin.engineMismatch", {
								required: z(n).requiresEngine,
								current: z(ms)
							})]), H(e, t);
						}, b = (e) => {
							var t = Gd(), r = F(t, !0);
							O(t), R((e) => U(r, e), [() => Y("plugin.cspNeeded", { list: Cs(z(n).csp).join(", ") })]), H(e, t);
						}, x = /* @__PURE__ */ A(() => z(n)?.csp && Cs(z(n).csp).length);
						W(_, (e) => {
							z(n)?.errors?.length ? e(v) : z(n) && !z(n).satisfied ? e(y, 1) : z(x) && e(b, 2);
						});
						var S = L(_, 2), C = (e) => {
							var t = gl(), r = F(t, !0);
							O(t), R((e) => U(r, e), [() => Y("plugin.languages", { list: z(n).languages.map((e) => e.name).join(", ") })]), H(e, t);
						};
						W(S, (e) => {
							z(n)?.languages?.length && e(C);
						}), O(i), R((e, t, o, s, c) => {
							a = pi(i, 1, "plugin-row svelte-1n46o8q", null, a, { "plugin-broken": z(n)?.errors?.length }), U(l, e), J(p, "title", t), bi(m, z(r)), m.disabled = o, U(h, ` ${s ?? ""}`), J(g, "title", c);
						}, [
							() => z(n)?.names?.[Hi()] ?? z(n)?.name ?? t,
							() => z(r) ? Y("tip.plugins.on") : Y("tip.plugins.off"),
							() => !!z(n)?.errors?.length,
							() => z(r) ? Y("ui.on") : Y("ui.off"),
							() => Y("tip.plugins.remove")
						]), B("change", m, (e) => js(t, e.target.checked)), B("click", g, () => Rs(t)), H(e, i);
					});
					var o = L(a, 2), s = (e) => {
						var t = Jd(), n = L(I(t), 2), r = F(n, !0);
						O(n), Kr(L(n, 2), 16, () => z(gs), (e) => e, (e, t) => {
							var n = qd(), r = F(n), i = F(r), a = F(i, !0);
							O(i);
							var o = L(i, 2), s = (e) => {
								var n = Wd(), r = F(n);
								O(n), R(() => U(r, `v${ps[t].version ?? ""}`)), H(e, n);
							};
							W(o, (e) => {
								ps[t]?.version && e(s);
							});
							var l = L(o, 2), u = F(l);
							G(u, () => c.right, !0), O(u), O(l), O(r), O(n), R((e, t) => {
								U(a, e), J(u, "title", t);
							}, [() => ps[t]?.names?.[Hi()] ?? ps[t]?.name ?? t, () => Y("tip.plugins.addFound")]), B("click", u, () => Gs(t)), H(e, n);
						}), R((e) => U(r, e), [() => Y("hint.plugins.found")]), H(e, t);
					};
					W(o, (e) => {
						z(gs).length && e(s);
					});
					var l = L(o, 2), u = (e) => {
						var t = Fr(), n = I(t), r = (e) => {
							var t = gl(), n = F(t, !0);
							O(t), R((e) => U(n, e), [() => Y("hint.plugins.autoDiscover")]), H(e, t);
						};
						W(n, (e) => {
							z(gs).length || e(r);
						}), H(e, t);
					}, d = (e) => {
						var t = Yd(), n = L(I(t), 2);
						K(n);
						var r = L(n, 2), i = F(r, !0);
						O(r);
						var a = L(r, 2), o = (e) => {
							var t = Gd(), n = F(t, !0);
							O(t), R(() => U(n, z($))), H(e, t);
						};
						W(a, (e) => {
							z($) && e(o);
						}), R((e, t, a) => {
							J(n, "placeholder", e), r.disabled = t, U(i, a);
						}, [
							() => Y("ph.plugins.folder"),
							() => !z(hs).trim(),
							() => Y("ui.addPlugin")
						]), B("keydown", n, (e) => e.key === "Enter" && zs()), wi(n, () => z(hs), (e) => P(hs, e)), B("click", r, zs), H(e, t);
					};
					W(l, (e) => {
						z(vs) === "ok" ? e(u) : e(d, -1);
					}), O(t), H(e, t);
				}, S = (e) => {
					var t = Ed(), n = F(t), r = (e) => {
						var t = gl(), n = F(t, !0);
						O(t), R((e) => U(n, e), [() => Y("hint.history.loading")]), H(e, t);
					}, i = (e) => {
						var t = $d(), n = I(t), r = (e) => {
							var t = gl(), n = F(t, !0);
							O(t), R(() => U(n, z(Ur))), H(e, t);
						};
						W(n, (e) => {
							z(Ur) && e(r);
						});
						var i = L(n, 2), a = (e) => {
							var t = Qd(), n = I(t), r = F(n, !0);
							O(n), Kr(L(n, 2), 19, () => z(Vr), (e) => e.sha, (e, t, n) => {
								var r = Zd();
								let i;
								var a = F(r), o = F(a, !0);
								O(a);
								var s = L(a, 2), c = F(s);
								O(s), O(r), R((e) => {
									i = pi(r, 1, "history-row svelte-1n46o8q", null, i, { head: z(n) === 0 }), J(a, "title", z(t).sha), U(o, z(t).message), U(c, `${z(t).author ?? ""}${e ?? ""}`);
								}, [() => z(t).date ? ` · ${qr.format(new Date(z(t).date))}` : ""]), H(e, r);
							}), R((e, t) => {
								n.disabled = z(Wr) || !z(ne)?.allowed, J(n, "title", e), U(r, t);
							}, [() => z(ne)?.allowed ? Y("tip.history.revert") : Y("tip.history.needsAccess"), () => Y("ui.revertLast")]), B("click", n, Yr), H(e, t);
						};
						W(i, (e) => {
							z(Vr).length > 0 && e(a);
						}), H(e, t);
					};
					W(n, (e) => {
						z(Vr) === null ? e(r) : e(i, -1);
					}), O(t), H(e, t);
				}, C = (e) => {
					var t = Ed(), n = F(t), r = (e) => {
						var t = gl(), n = F(t, !0);
						O(t), R((e) => U(n, e), [() => Y("update.checking")]), H(e, t);
					}, i = (e) => {
						var t = ef(), n = I(t), r = F(n, !0);
						O(n);
						var i = L(n, 2), a = F(i, !0);
						O(i), R((e) => {
							U(r, z(Qr)), U(a, e);
						}, [() => Y("update.retry")]), B("click", i, ti), H(e, t);
					}, a = (e) => {
						var t = ff(), n = I(t), r = F(n), i = F(r, !0);
						O(r);
						var a = L(r, 2), o = (e) => {
							var t = tf(), n = I(t);
							G(n, () => c.right, !0), O(n);
							var r = L(n, 2), i = F(r, !0);
							O(r), R(() => U(i, z(Zr).target)), H(e, t);
						};
						W(a, (e) => {
							z(Zr).upToDate || e(o);
						}), O(n);
						var s = L(n, 2), l = (e) => {
							var t = gl(), n = F(t, !0);
							O(t), R((e) => U(n, e), [() => Y("update.upToDate")]), H(e, t);
						}, u = (e) => {
							var t = df(), n = I(t), r = F(n, !0);
							O(n);
							var i = L(n, 2), a = (e) => {
								var t = nf(), n = F(t), r = F(n, !0);
								O(n);
								var i = L(n, 2), a = F(i), o = F(a, !0);
								O(a), O(i), O(t), R((e) => {
									U(r, e), U(o, z(Zr).notes);
								}, [() => Y("update.aboutVersion", { target: z(Zr).target })]), H(e, t);
							};
							W(i, (e) => {
								z(Zr).notes && e(a);
							});
							var o = L(i, 2), s = (e) => {
								var t = rf(), n = F(t), r = F(n);
								G(r, () => c.warn, !0), O(r);
								var i = L(r);
								O(n);
								var a = L(n, 2), o = F(a), s = F(o, !0);
								O(o), O(a), O(t), R((e, t) => {
									J(n, "title", e), U(i, ` ${t ?? ""}`), U(s, z(Zr).headers.upstream);
								}, [() => Y("update.headersManual"), () => Y("update.headersTitle")]), H(e, t);
							};
							W(o, (e) => {
								z(Zr).headers?.upstream && e(s);
							});
							var l = L(o, 2);
							Kr(l, 17, () => z(Zr).changes.filter((e) => e.atom && e.conflict), (e) => e.path, (e, t) => {
								var n = of(), r = F(n), i = F(r, !0);
								O(r);
								var a = L(r, 2), o = F(a), s = (e) => {
									var t = af(), n = F(t, !0);
									O(t), R((e) => U(n, e), [() => Y("update.actionDelete")]), H(e, t);
								};
								W(o, (e) => {
									z(t).action === "delete" && e(s);
								});
								var l = L(o, 2);
								G(l, () => c.warn, !0), O(l), O(a), O(n), R((e) => {
									J(r, "title", z(t).path), U(i, z(t).path), J(l, "title", e);
								}, [() => Y(`update.conflict.${z(t).conflict}`)]), H(e, n);
							});
							var u = L(l, 2), d = F(u), f = F(d);
							O(d);
							var p = L(d, 2);
							Kr(p, 21, () => z(Zr).changes.filter((e) => e.atom && !e.conflict), (e) => e.path, (e, t) => {
								var n = sf(), r = F(n), i = F(r, !0);
								O(r);
								var a = L(r, 2), o = (e) => {
									var t = af(), n = F(t, !0);
									O(t), R((e) => U(n, e), [() => Y("update.actionDelete")]), H(e, t);
								};
								W(a, (e) => {
									z(t).action === "delete" && e(o);
								}), O(n), R(() => {
									J(r, "title", z(t).path), U(i, z(t).path);
								}), H(e, n);
							}), O(p), O(u);
							var m = L(u, 2), h = (e) => {
								var t = uf(), n = I(t), r = F(n), i = F(r, !0);
								O(r);
								var a = L(r, 2), o = F(a, !0);
								O(a), O(n), Kr(L(n, 2), 17, () => z(Zr).changes.filter((e) => !e.atom), (e) => e.path, (e, t) => {
									var n = lf(), r = F(n);
									let i;
									var a = F(r, !0);
									O(r);
									var o = L(r, 2), s = F(o), l = (e) => {
										var t = af(), n = F(t, !0);
										O(t), R((e) => U(n, e), [() => Y("update.actionDelete")]), H(e, t);
									};
									W(s, (e) => {
										z(t).action === "delete" && e(l);
									});
									var u = L(s, 2), d = (e) => {
										var n = cf();
										G(n, () => c.warn, !0), O(n), R((e) => J(n, "title", e), [() => Y(`update.conflict.${z(t).conflict}`)]), H(e, n);
									};
									W(u, (e) => {
										z(t).conflict && e(d);
									});
									var f = L(u, 2);
									K(f), O(o), O(n), R((e, n, o, s) => {
										i = pi(r, 1, "update-path svelte-1n46o8q", null, i, e), J(r, "title", z(t).path), U(a, z(t).path), bi(f, n), J(f, "title", o), J(f, "aria-label", s);
									}, [
										() => ({ skipped: z(ei).has(z(t).path) }),
										() => z(ei).has(z(t).path),
										() => Y("update.keepMine.title"),
										() => Y("update.keepMine")
									]), B("change", f, () => ni(z(t).path)), H(e, n);
								}), R((e, t) => {
									U(i, e), U(o, t);
								}, [() => Y("update.optionalTitle"), () => Y("update.keepMine")]), H(e, t);
							}, g = /* @__PURE__ */ A(() => z(Zr).changes.some((e) => !e.atom));
							W(m, (e) => {
								z(g) && e(h);
							});
							var _ = L(m, 2), v = F(_, !0);
							O(_), R((e, t, n, i, a, o) => {
								U(r, e), J(d, "title", t), U(f, `${n ?? ""} · ${i ?? ""}`), _.disabled = z($r) || !z(ne)?.allowed, J(_, "title", a), U(v, o);
							}, [
								() => Y("update.summary", {
									writes: z(Zr).changes.filter((e) => e.action === "write").length,
									deletes: z(Zr).changes.filter((e) => e.action === "delete").length
								}),
								() => Y("update.atomGroup.title"),
								() => Y("update.atomTitle"),
								() => z(Zr).changes.filter((e) => e.atom).length,
								() => z(ne)?.allowed ? Y("update.run.title") : Y("tip.history.needsAccess"),
								() => Y("update.run", { target: z(Zr).target })
							]), B("click", _, ri), H(e, t);
						};
						W(s, (e) => {
							z(Zr).upToDate ? e(l) : e(u, -1);
						}), R((e) => U(i, e), [() => Y("update.current", { version: z(Zr).current })]), H(e, t);
					};
					W(n, (e) => {
						z($r) && !z(Zr) ? e(r) : z(Qr) ? e(i, 1) : z(Zr) && e(a, 2);
					}), O(t), H(e, t);
				};
				W(s, (e) => {
					z(ft) === "pages" ? e(l) : z(ft) === "nav" ? e(u, 1) : z(ft) === "site" ? e(d, 2) : z(ft) === "theme" ? e(p, 3) : z(ft) === "blocks" ? e(m, 4) : z(ft) === "grid" ? e(g, 5) : z(ft) === "properties" ? e(v, 6) : z(ft) === "footer" ? e(y, 7) : z(ft) === "collections" ? e(b, 8) : z(ft) === "plugins" ? e(x, 9) : z(ft) === "history" ? e(S, 10) : z(ft) === "update" && e(C, 11);
				}), O(t), R((e) => {
					J(i, "title", e), U(o, ht[z(ft)]);
				}, [() => gt[z(ft)]?.map((e) => Y(e)).join("\n")]), H(e, t);
			};
			W(v, (e) => {
				z(ft) && e(y);
			}), R((e) => {
				p = pi(u, 1, "rail-gear svelte-1n46o8q", null, p, { active: z(fi) }), J(u, "title", e);
			}, [() => Y("settings.title")]), B("click", u, () => P(fi, !z(fi))), H(e, t);
		};
		W(i, (e) => {
			z(ie) && e(o);
		});
		var s = L(i, 2);
		let u;
		var p = F(s), m = F(p);
		Oi(m, (e) => P(te, e), () => z(te)), O(p), O(s), Oi(s, (e) => P(le, e), () => z(le)), O(t), R((e) => {
			u = pi(s, 1, "frame-wrap svelte-1n46o8q", null, u, {
				mobile: z(ce) === "mobile",
				pan: z(Ce)
			}), hi(p, `width:${z(xe) ?? ""}px; height:${z(Se) ?? ""}px`), J(m, "title", e), J(m, "src", `/?page=${z(_)}&preview=1`), hi(m, `width:${z(_e) ?? ""}px; height:${z(be) ?? ""}px; transform:scale(${z(ve) ?? ""}); transform-origin:top left`);
		}, [() => Y("ui.previewTitle")]), Tr("load", m, li), Cr(m), H(e, t);
	}, tm = (e) => {
		var t = gf(), n = F(t, !0);
		O(t), R((e) => U(n, e), [() => Y("ui.loading")]), H(e, t);
	};
	W($p, (e) => {
		z(g) ? e(em) : e(tm, -1);
	});
	var nm = L($p, 2), rm = (e) => {
		ro(e, {
			get image() {
				return z(ia);
			},
			onapply: oa,
			oncancel: () => P(ia, null)
		});
	};
	W(nm, (e) => {
		z(ia) && e(rm);
	});
	var im = L(nm, 2), am = (e) => {
		var t = vf(), n = F(t), r = F(n), i = F(r, !0);
		O(r);
		var a = L(r, 2);
		Kr(a, 16, () => z($e).lines, (e) => e, (e, t) => {
			var n = _f(), r = F(n, !0);
			O(n), R(() => U(r, t)), H(e, n);
		});
		var o = L(a, 2), s = (e) => {
			var t = Ol();
			K(t), ut(t, !0), R(() => J(t, "placeholder", z($e).placeholder)), B("keydown", t, (e) => e.key === "Enter" && z($e).value.trim() && nt(!0)), wi(t, () => z($e).value, (e) => z($e).value = e), H(e, t);
		};
		W(o, (e) => {
			z($e).prompt && e(s);
		});
		var c = L(o, 2), l = F(c), u = F(l, !0);
		O(l);
		var d = L(l, 2), f = F(d, !0);
		O(d), O(c), O(n), O(t), R(() => {
			U(i, z($e).title), U(u, z($e).cancelLabel), U(f, z($e).okLabel);
		}), B("pointerdown", t, (e) => rt = e.target === e.currentTarget), B("click", t, (e) => rt && e.target === e.currentTarget && nt(!1)), B("click", l, () => nt(!1)), B("click", d, () => nt(!0)), H(e, t);
	};
	W(im, (e) => {
		z($e) && e(am);
	});
	var om = L(im, 2), sm = (e) => {
		var t = yf(), n = F(t), r = F(n), i = F(r, !0);
		O(r);
		var a = L(r, 2), o = F(a, !0);
		O(a);
		var s = L(a, 2), c = F(s), l = L(c);
		K(l), O(s);
		var u = L(s, 2), d = F(u), f = L(d);
		{
			let e = /* @__PURE__ */ A(() => Y("setup.accentPick"));
			sa(f, {
				get value() {
					return z(ot);
				},
				get label() {
					return z(e);
				},
				onchange: (e) => P(ot, e, !0)
			});
		}
		O(u);
		var p = L(u, 2), m = F(p), h = L(m);
		{
			let e = /* @__PURE__ */ A(() => Y("setup.bgLabel"));
			sa(h, {
				get value() {
					return z(st);
				},
				get label() {
					return z(e);
				},
				onchange: (e) => P(st, e, !0)
			});
		}
		O(p);
		var g = L(p, 2), _ = F(g, !0);
		O(g);
		var v = L(g, 2), y = F(v), b = F(y, !0);
		O(y);
		var x = L(y, 2), S = F(x, !0);
		O(x), O(v), O(n), O(t), R((e, t, n, r, a, s, u, f, p, h) => {
			U(i, e), U(o, t), U(c, `${n ?? ""} `), J(l, "placeholder", r), U(d, `${a ?? ""} `), U(m, `${s ?? ""} `), U(_, u), U(b, f), x.disabled = p, U(S, h);
		}, [
			() => Y("setup.title"),
			() => Y("setup.intro"),
			() => Y("setup.nameLabel"),
			() => Y("ph.setup.name"),
			() => Y("setup.accentLabel"),
			() => Y("setup.bgLabel"),
			() => Y("setup.outro"),
			() => Y("setup.skip"),
			() => !z(at).trim(),
			() => Y("setup.start")
		]), B("keydown", l, (e) => e.key === "Enter" && lt()), wi(l, () => z(at), (e) => P(at, e)), B("click", y, ct), B("click", x, lt), H(e, t);
	};
	W(om, (e) => {
		z(it) && e(sm);
	});
	var cm = L(om, 2), lm = (e) => {
		var t = bf();
		let n;
		var r = F(t), i = F(r, !0);
		O(r);
		var a = L(r, 2);
		O(t), R((e) => {
			n = pi(t, 1, "toast svelte-1n46o8q", null, n, {
				ok: z(b) === "ok",
				error: z(b) === "error"
			}), U(i, z(y)), J(a, "title", e);
		}, [() => Y("ui.close")]), B("click", a, () => S("")), H(e, t);
	};
	W(cm, (e) => {
		z(y) && e(lm);
	}), O(Lp);
	var um = L(Lp, 2), dm = (e) => {
		var t = xf(), n = F(t), r = F(n), i = F(r, !0);
		O(r);
		var o = L(r, 2);
		G(o, () => c.cross, !0), O(o), O(n);
		var s = L(n, 2), l = F(s);
		a(l), O(s), O(t), R((e, n) => {
			hi(t, `left: ${z(Ot).left ?? ""}px; top: ${z(Ot).top ?? ""}px`), U(i, e), J(o, "title", n);
		}, [() => Y("blocks.suffix", { label: rn[z(k).type] ?? z(k).type }), () => Y("tip.closeEsc")]), B("click", o, () => P(Ot, null)), H(e, t);
	};
	W(um, (e) => {
		z(Ot) && z(k) && e(dm);
	}), R(() => Vp = pi(Bp, 1, "topbar svelte-1n46o8q", null, Vp, { hidden: !z(ie) })), H(e, Ip), Ye();
}
//#endregion
//#region src/main.js
Er([
	"click",
	"input",
	"pointerdown",
	"change",
	"keydown"
]), document.documentElement.lang = await Gi();
var wf = Lr(Cf, { target: document.getElementById("urd-admin") });
//#endregion
export { wf as default };
