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
var g = 1024, _ = 2048, v = 4096, y = 8192, b = 16384, x = 32768, S = 1 << 25, C = 65536, w = 1 << 19, ee = 1 << 20, te = 1 << 25, ne = 65536, re = 1 << 21, ie = 1 << 22, ae = 1 << 23, oe = Symbol("$state"), se = Symbol("legacy props"), ce = Symbol(""), le = Symbol("attributes"), ue = Symbol("class"), de = Symbol("style"), fe = Symbol("text"), pe = Symbol("form reset"), me = new class extends Error {
	name = "StaleReactionError";
	message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}(), he = !!globalThis.document?.contentType && /* @__PURE__ */ globalThis.document.contentType.includes("xml");
//#endregion
//#region node_modules/svelte/src/internal/client/errors.js
function ge() {
	throw Error("https://svelte.dev/e/async_derived_orphan");
}
function _e(e, t, n) {
	throw Error("https://svelte.dev/e/each_key_duplicate");
}
function ve(e) {
	throw Error("https://svelte.dev/e/effect_in_teardown");
}
function ye() {
	throw Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function be(e) {
	throw Error("https://svelte.dev/e/effect_orphan");
}
function xe() {
	throw Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function Se(e) {
	throw Error("https://svelte.dev/e/props_invalid_value");
}
function Ce() {
	throw Error("https://svelte.dev/e/state_descriptors_fixed");
}
function we() {
	throw Error("https://svelte.dev/e/state_prototype_fixed");
}
function Te() {
	throw Error("https://svelte.dev/e/state_unsafe_mutation");
}
function Ee() {
	throw Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
//#endregion
//#region node_modules/svelte/src/constants.js
var De = {}, T = Symbol("uninitialized"), Oe = "http://www.w3.org/1999/xhtml", E = "http://www.w3.org/2000/svg", D = "http://www.w3.org/1998/Math/MathML";
function ke() {
	console.warn("https://svelte.dev/e/derived_inert");
}
function Ae(e) {
	console.warn("https://svelte.dev/e/hydration_mismatch");
}
function je() {
	console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/hydration.js
var Me = !1;
function Ne(e) {
	Me = e;
}
var Pe;
function Fe(e) {
	if (e === null) throw Ae(), De;
	return Pe = e;
}
function Ie() {
	return Fe(/* @__PURE__ */ mn(Pe));
}
function O(e) {
	if (Me) {
		if (/* @__PURE__ */ mn(Pe) !== null) throw Ae(), De;
		Pe = e;
	}
}
function Le(e = 1) {
	if (Me) {
		for (var t = e, n = Pe; t--;) n = /* @__PURE__ */ mn(n);
		Pe = n;
	}
}
function Re(e = !0) {
	for (var t = 0, n = Pe;;) {
		if (n.nodeType === 8) {
			var r = n.data;
			if (r === "]") {
				if (t === 0) return n;
				--t;
			} else (r === "[" || r === "[!" || r[0] === "[" && !isNaN(Number(r.slice(1)))) && (t += 1);
		}
		var i = /* @__PURE__ */ mn(n);
		e && n.remove(), n = i;
	}
}
function ze(e) {
	if (!e || e.nodeType !== 8) throw Ae(), De;
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
		r: Xn,
		l: null
	};
}
function Ye(e) {
	var t = Ke, n = t.e;
	if (n !== null) {
		t.e = null;
		for (var r of n) Tn(r);
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
	if (Ze.length === 0 && !It) {
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
	var t = Xn;
	if (t === null) return qn.f |= ae, e;
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
	if (e !== null) for (let t of e) !(t.f & 2) || !(t.f & 65536) || (t.f ^= ne, ot(t.deps));
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
	Me && /* @__PURE__ */ pn(e) !== null && hn(e);
}
var ft = !1;
function pt() {
	ft || (ft = !0, document.addEventListener("reset", (e) => {
		Promise.resolve().then(() => {
			if (!e.defaultPrevented) for (let t of e.target.elements) t[pe]?.();
		});
	}, { capture: !0 }));
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
function mt(e) {
	var t = qn, n = Xn;
	Yn(null), Zn(null);
	try {
		return e();
	} finally {
		Yn(t), Zn(n);
	}
}
function ht(e, t, n, r = n) {
	e.addEventListener(t, () => mt(n));
	let i = e[pe];
	e[pe] = i ? () => {
		i(), r(!0);
	} : () => r(!0), pt();
}
//#endregion
//#region node_modules/svelte/src/reactivity/create-subscriber.js
function gt(e) {
	let t = 0, n = $t(0), r;
	return () => {
		Sn() && (R(n), kn(() => (t === 0 && (r = vr(() => e(() => rn(n)))), t += 1, () => {
			$e(() => {
				--t, t === 0 && (r?.(), r = void 0, rn(n));
			});
		})));
	};
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/boundary.js
var _t = C | w;
function vt(e, t, n, r) {
	new yt(e, t, n, r);
}
var yt = class {
	parent;
	is_pending = !1;
	transform_error;
	#e;
	#t = Me ? Pe : null;
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
	#h = gt(() => (this.#m = $t(this.#l), () => {
		this.#m = null;
	}));
	constructor(e, t, n, r) {
		this.#e = e, this.#n = t, this.#r = (e) => {
			var t = Xn;
			t.b = this, t.f |= 128, n(e);
		}, this.parent = Xn.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = An(() => {
			if (Me) {
				let e = this.#t;
				Ie();
				let t = e.data === "[!";
				if (e.data.startsWith("[?")) {
					let t = JSON.parse(e.data.slice(2));
					this.#_(t);
				} else t ? this.#y() : this.#g();
			} else this.#b();
		}, _t), Me && (this.#e = Pe);
	}
	#g() {
		try {
			this.#a = jn(() => this.#r(this.#e));
		} catch (e) {
			this.error(e);
		}
	}
	#_(e) {
		let t = this.#n.failed, { reset: n, invoke_onerror: r } = this.#v(e);
		$e(r), t && (this.#s = jn(() => {
			t(this.#e, () => e, () => n);
		}));
	}
	#v(e) {
		var t = !1, n = !1;
		let r = () => {
			if (t) {
				je();
				return;
			}
			t = !0, n && Ee(), this.#s !== null && Rn(this.#s, () => {
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
		e && (this.is_pending = !0, this.#o = jn(() => e(this.#e)), $e(() => {
			var e = this.#c = document.createDocumentFragment(), t = fn();
			e.append(t), this.#a = this.#S(() => jn(() => this.#r(t))), this.#u === 0 && (this.#e.before(e), this.#c = null, Rn(this.#o, () => {
				this.#o = null;
			}), this.#x(j));
		}));
	}
	#b() {
		try {
			if (this.is_pending = this.has_pending_snippet(), this.#u = 0, this.#l = 0, this.#a = jn(() => {
				this.#r(this.#e);
			}), this.#u > 0) {
				var e = this.#c = document.createDocumentFragment();
				Hn(this.#a, e);
				let t = this.#n.pending;
				this.#o = jn(() => t(this.#e));
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
		var t = Xn, n = qn, r = Ke;
		Zn(this.#i), Yn(this.#i), qe(this.#i.ctx);
		try {
			return Ht.ensure(), e();
		} catch (e) {
			return tt(e), null;
		} finally {
			Zn(t), Yn(n), qe(r);
		}
	}
	#C(e, t) {
		if (!this.has_pending_snippet()) {
			this.parent && this.parent.#C(e, t);
			return;
		}
		this.#u += e, this.#u === 0 && (this.#x(t), this.#o && Rn(this.#o, () => {
			this.#o = null;
		}), this.#c &&= (this.#e.before(this.#c), null));
	}
	update_pending_count(e, t) {
		this.#C(e, t), this.#l += e, !(!this.#m || this.#d) && (this.#d = !0, $e(() => {
			this.#d = !1, this.#m && tn(this.#m, this.#l);
		}));
	}
	get_effect_pending() {
		return this.#h(), R(this.#m);
	}
	error(e) {
		if (!this.#n.onerror && !this.#n.failed) throw e;
		j?.is_fork ? (this.#a && j.skip_effect(this.#a), this.#o && j.skip_effect(this.#o), this.#s && j.skip_effect(this.#s), j.oncommit(() => {
			this.#w(e);
		})) : this.#w(e);
	}
	#w(e) {
		this.#a &&= (Fn(this.#a), null), this.#o &&= (Fn(this.#o), null), this.#s &&= (Fn(this.#s), null), Me && (Fe(this.#t), Le(), Fe(Re()));
		let t = this.#n.failed, n = (e) => {
			let { reset: n, invoke_onerror: r } = this.#v(e);
			r(), t && (this.#s = this.#S(() => {
				try {
					return jn(() => {
						var r = Xn;
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
	let i = Xe() ? k : Et;
	var a = e.filter((e) => !e.settled), o = t.map(i);
	if (n.length === 0 && a.length === 0) {
		r(o);
		return;
	}
	var s = Xn, c = xt(), l = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((e) => e.promise)) : null;
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
	var e = Xn, t = qn, n = Ke, r = j;
	return function(i = !0) {
		Zn(e), Yn(t), qe(n), i && !(e.f & 16384) && (r?.activate(), r?.apply());
	};
}
function St(e = !0) {
	Zn(null), Yn(null), qe(null), e && j?.deactivate();
}
function Ct() {
	var e = Xn, t = e.b, n = j, r = !!t?.is_rendered();
	return t?.update_pending_count(1, n), n.increment(r, e), () => {
		t?.update_pending_count(-1, n), n.decrement(r, e);
	};
}
/*#__NO_SIDE_EFFECTS__*/
function k(e) {
	var t = 2 | _;
	return Xn !== null && (Xn.f |= w), {
		ctx: Ke,
		deps: null,
		effects: null,
		equals: Be,
		f: t,
		fn: e,
		reactions: null,
		rv: 0,
		v: T,
		wv: 0,
		parent: Xn,
		ac: null
	};
}
var wt = Symbol("obsolete");
/*#__NO_SIDE_EFFECTS__*/
function Tt(e, t, n) {
	let r = Xn;
	r === null && ge();
	var i = void 0, a = $t(T), o = !qn, s = /* @__PURE__ */ new Set();
	return On(() => {
		var t = Xn, n = m();
		i = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, (e) => {
				e !== me && n.reject(e);
			}).finally(St);
		} catch (e) {
			n.reject(e), St();
		}
		var c = j;
		if (o) {
			if (t.f & 32768) var l = Ct();
			if (r.b?.is_rendered()) c.async_deriveds.get(t)?.reject(wt);
			else for (let e of s.values()) e.reject(wt);
			s.add(n), c.async_deriveds.set(t, n);
		}
		let u = (e, t = void 0) => {
			l?.(), s.delete(n), t !== wt && (c.activate(), t ? (a.f |= ae, tn(a, t)) : (a.f & 8388608 && (a.f ^= ae), tn(a, e)), c.deactivate());
		};
		n.promise.then(u, (e) => u(null, e || "unknown"));
	}), Cn(() => {
		for (let e of s) e.reject(wt);
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
	let t = /* @__PURE__ */ k(e);
	return $n(t), t;
}
/*#__NO_SIDE_EFFECTS__*/
function Et(e) {
	let t = /* @__PURE__ */ k(e);
	return t.equals = He, t;
}
function Dt(e) {
	var t = e.effects;
	if (t !== null) {
		e.effects = null;
		for (var n = 0; n < t.length; n += 1) Fn(t[n]);
	}
}
function Ot(e) {
	var t, n = Xn, r = e.parent;
	if (!Gn && r !== null && e.v !== T && r.f & 24576) return ke(), e.v;
	Zn(r);
	try {
		e.f &= ~ne, Dt(e), t = dr(e);
	} finally {
		Zn(n);
	}
	return t;
}
function kt(e) {
	var t = Ot(e);
	if (!e.equals(t) && (e.wv = cr(), (!j?.is_fork || e.deps === null) && (j === null ? e.v = t : (j.capture(e, t, !0), Nt?.capture(e, t, !0)), e.deps === null))) {
		it(e, g);
		return;
	}
	Gn || (Pt === null ? at(e) : (Sn() || j?.is_fork) && Pt.set(e, t));
}
function At(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac !== null && mt(() => {
		t.ac.abort(me), t.ac = null;
	}), t.fn !== null && (t.teardown = f), pr(t, 0), Nn(t));
}
function jt(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && mr(t);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/batch.js
var Mt = null, j = null, Nt = null, Pt = null, Ft = null, It = !1, Lt = !1, Rt = null, zt = null, Bt = 0, Vt = 1, Ht = class e {
	id = Vt++;
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
		this.#e = !0, Bt++ > 1e3 && (this.#x(), Wt());
		for (let e of this.#u) this.#d.delete(e), it(e, _), this.schedule(e);
		for (let e of this.#d) it(e, v), this.schedule(e);
		let t = this.#c;
		this.#c = [], this.apply();
		var n = Rt = [], r = [], i = zt = [];
		for (let e of t) try {
			this.#_(e, n, r);
		} catch (t) {
			throw Yt(e), this.#h() || this.discard(), t;
		}
		if (j = null, i.length > 0) {
			var a = e.ensure();
			for (let e of i) a.schedule(e);
		}
		if (Rt = null, zt = null, this.#h()) {
			this.#b(r), this.#b(n);
			for (let [e, t] of this.#f) Jt(e, t);
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
		this.#r.clear(), Nt = this, Kt(r), Kt(n), Nt = null, this.#s?.resolve();
		var s = j;
		if (this.#a === 0 && (this.#c.length === 0 || s !== null) && this.#x(), this.#c.length > 0) {
			if (s !== null) {
				let e = s;
				e.#c.push(...this.#c.filter((t) => !e.#c.includes(t)));
			} else s = this;
		}
		s !== null && (Zt.clear(), s.#g());
	}
	#_(e, t, n) {
		e.f ^= g;
		for (var r = e.first; r !== null;) {
			var i = r.f, a = !!(i & 96);
			if (!(a && i & 1024 || i & 8192 || this.#f.has(r)) && r.fn !== null) {
				a ? r.f ^= g : i & 4 ? t.push(r) : lr(r) && (i & 16 && this.#d.add(r), mr(r));
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
		e.v !== T && !this.previous.has(e) && this.previous.set(e, e.v), e.f & 8388608 || (this.current.set(e, [t, n]), Pt?.set(e, t)), this.is_fork || (e.v = t);
	}
	activate() {
		j = this;
	}
	deactivate() {
		j = null, Pt = null;
	}
	flush() {
		try {
			Lt = !0, j = this, this.#g();
		} finally {
			Bt = 0, Ft = null, Rt = null, zt = null, Lt = !1, j = null, Pt = null, Zt.clear();
		}
	}
	discard() {
		for (let e of this.#i) e(this);
		this.#i.clear();
		for (let e of this.async_deriveds.values()) e.reject(wt);
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
			!Lt && !It && $e(() => {
				t.#e || t.flush();
			});
		}
		return j;
	}
	apply() {
		Pt = null;
	}
	schedule(e) {
		if (Ft = e, e.b?.is_pending && e.f & 16777228 && !(e.f & 32768)) {
			e.b.defer_effect(e);
			return;
		}
		for (var t = e; t.parent !== null;) {
			t = t.parent;
			var n = t.f;
			if (Rt !== null && t === Xn && (qn === null || !(qn.f & 2))) return;
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
function Ut(e) {
	var t = It;
	It = !0;
	try {
		var n;
		for (e && (j !== null && !j.is_fork && j.flush(), n = e());;) {
			if (et(), j === null) return n;
			j.flush();
		}
	} finally {
		It = t;
	}
}
function Wt() {
	try {
		xe();
	} catch (e) {
		nt(e, Ft);
	}
}
var Gt = null;
function Kt(e) {
	var t = e.length;
	if (t !== 0) {
		for (var n = 0; n < t;) {
			var r = e[n++];
			if (!(r.f & 24576) && lr(r) && (Gt = /* @__PURE__ */ new Set(), mr(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && Ln(r), Gt?.size > 0)) {
				Zt.clear();
				for (let e of Gt) {
					if (e.f & 24576) continue;
					let t = [e], n = e.parent;
					for (; n !== null;) Gt.has(n) && (Gt.delete(n), t.push(n)), n = n.parent;
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || mr(n);
					}
				}
				Gt.clear();
			}
		}
		Gt = null;
	}
}
function qt(e) {
	j.schedule(e);
}
function Jt(e, t) {
	if (!(e.f & 32 && e.f & 1024)) {
		e.f & 2048 ? t.d.push(e) : e.f & 4096 && t.m.push(e), it(e, g);
		for (var n = e.first; n !== null;) Jt(n, t), n = n.next;
	}
}
function Yt(e) {
	it(e, g);
	for (var t = e.first; t !== null;) Yt(t), t = t.next;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/sources.js
var Xt = /* @__PURE__ */ new Set(), Zt = /* @__PURE__ */ new Map(), Qt = !1;
function $t(e, t) {
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
function M(e, t) {
	let n = $t(e, t);
	return $n(n), n;
}
/*#__NO_SIDE_EFFECTS__*/
function en(e, t = !1, n = !0) {
	let r = $t(e);
	return t || (r.equals = He), r;
}
function N(e, t, n = !1) {
	return qn !== null && (!Jn || qn.f & 131072) && Xe() && qn.f & 4325394 && (Qn === null || !Qn.has(e)) && Te(), tn(e, n ? on(t) : t, zt);
}
function tn(e, t, n = null) {
	if (!e.equals(t)) {
		Gn ? Zt.set(e, t) : Zt.has(e) || Zt.set(e, e.v);
		var r = Ht.ensure();
		if (r.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && Ot(t), Pt === null && at(t);
		}
		e.wv = cr(), an(e, _, n), Xe() && Xn !== null && Xn.f & 1024 && !(Xn.f & 96) && (nr === null ? rr([e]) : nr.push(e)), !r.is_fork && Xt.size > 0 && !Qt && nn();
	}
	return t;
}
function nn() {
	Qt = !1;
	for (let e of Xt) {
		e.f & 1024 && it(e, v);
		let t;
		try {
			t = lr(e);
		} catch {
			t = !0;
		}
		t && mr(e);
	}
	Xt.clear();
}
function rn(e) {
	N(e, e.v + 1);
}
function an(e, t, n) {
	var r = e.reactions;
	if (r !== null) for (var i = Xe(), a = r.length, o = 0; o < a; o++) {
		var s = r[o], c = s.f;
		if (!(!i && s === Xn)) {
			var l = (c & _) === 0;
			if (l && it(s, t), c & 131072) Xt.add(s);
			else if (c & 2) {
				var u = s;
				Pt?.delete(u), c & 65536 || (c & 512 && (Xn === null || !(Xn.f & 2097152)) && (s.f |= ne), an(u, v, n));
			} else if (l) {
				var d = s;
				c & 16 && Gt !== null && Gt.add(d), n === null ? qt(d) : n.push(d);
			}
		}
	}
}
function on(t) {
	if (typeof t != "object" || !t || oe in t) return t;
	let n = l(t);
	if (n !== s && n !== c) return t;
	var r = /* @__PURE__ */ new Map(), i = e(t), o = /* @__PURE__ */ M(0), u = null, d = or, f = (e) => {
		if (or === d) return e();
		var t = qn, n = or;
		Yn(null), sr(d);
		var r = e();
		return Yn(t), sr(n), r;
	};
	return i && r.set("length", /* @__PURE__ */ M(t.length, u)), new Proxy(t, {
		defineProperty(e, t, n) {
			(!("value" in n) || n.configurable === !1 || n.enumerable === !1 || n.writable === !1) && Ce();
			var i = r.get(t);
			return i === void 0 ? f(() => {
				var e = /* @__PURE__ */ M(n.value, u);
				return r.set(t, e), e;
			}) : N(i, n.value, !0), !0;
		},
		deleteProperty(e, t) {
			var n = r.get(t);
			if (n === void 0) {
				if (t in e) {
					let e = f(() => /* @__PURE__ */ M(T, u));
					r.set(t, e), rn(o);
				}
			} else N(n, T), rn(o);
			return !0;
		},
		get(e, n, i) {
			if (n === oe) return t;
			var o = r.get(n), s = n in e;
			if (o === void 0 && (!s || a(e, n)?.writable) && (o = f(() => /* @__PURE__ */ M(on(s ? e[n] : T), u)), r.set(n, o)), o !== void 0) {
				var c = R(o);
				return c === T ? void 0 : c;
			}
			return Reflect.get(e, n, i);
		},
		getOwnPropertyDescriptor(e, t) {
			var n = Reflect.getOwnPropertyDescriptor(e, t);
			if (n && "value" in n) {
				var i = r.get(t);
				i && (n.value = R(i));
			} else if (n === void 0) {
				var a = r.get(t), o = a?.v;
				if (a !== void 0 && o !== T) return {
					enumerable: !0,
					configurable: !0,
					value: o,
					writable: !0
				};
			}
			return n;
		},
		has(e, t) {
			if (t === oe) return !0;
			var n = r.get(t), i = n !== void 0 && n.v !== T || Reflect.has(e, t);
			return (n !== void 0 || Xn !== null && (!i || a(e, t)?.writable)) && (n === void 0 && (n = f(() => /* @__PURE__ */ M(i ? on(e[t]) : T, u)), r.set(t, n)), R(n) === T) ? !1 : i;
		},
		set(e, t, n, s) {
			var c = r.get(t), l = t in e;
			if (i && t === "length") for (var d = n; d < c.v; d += 1) {
				var p = r.get(d + "");
				p === void 0 ? d in e && (p = f(() => /* @__PURE__ */ M(T, u)), r.set(d + "", p)) : N(p, T);
			}
			if (c === void 0) (!l || a(e, t)?.writable) && (c = f(() => /* @__PURE__ */ M(void 0, u)), N(c, on(n)), r.set(t, c));
			else {
				l = c.v !== T;
				var m = f(() => on(n));
				N(c, m);
			}
			var h = Reflect.getOwnPropertyDescriptor(e, t);
			if (h?.set && h.set.call(s, n), !l) {
				if (i && typeof t == "string") {
					var g = r.get("length"), _ = Number(t);
					Number.isInteger(_) && _ >= g.v && N(g, _ + 1);
				}
				rn(o);
			}
			return !0;
		},
		ownKeys(e) {
			R(o);
			var t = Reflect.ownKeys(e).filter((e) => {
				var t = r.get(e);
				return t === void 0 || t.v !== T;
			});
			for (var [n, i] of r) i.v !== T && !(n in e) && t.push(n);
			return t;
		},
		setPrototypeOf() {
			we();
		}
	});
}
var sn, cn, ln, un;
function dn() {
	if (sn === void 0) {
		sn = window, cn = /Firefox/.test(navigator.userAgent);
		var e = Element.prototype, t = Node.prototype, n = Text.prototype;
		ln = a(t, "firstChild").get, un = a(t, "nextSibling").get, u(e) && (e[ue] = void 0, e[le] = null, e[de] = void 0, e.__e = void 0), u(n) && (n[fe] = void 0);
	}
}
function fn(e = "") {
	return document.createTextNode(e);
}
/*@__NO_SIDE_EFFECTS__*/
function pn(e) {
	return ln.call(e);
}
/*@__NO_SIDE_EFFECTS__*/
function mn(e) {
	return un.call(e);
}
function P(e, t) {
	if (!Me) return /* @__PURE__ */ pn(e);
	var n = /* @__PURE__ */ pn(Pe);
	if (n === null) n = Pe.appendChild(fn());
	else if (t && n.nodeType !== 3) {
		var r = fn();
		return n?.before(r), Fe(r), r;
	}
	return t && vn(n), Fe(n), n;
}
function F(e, t = !1) {
	if (!Me) {
		var n = /* @__PURE__ */ pn(e);
		return n instanceof Comment && n.data === "" ? /* @__PURE__ */ mn(n) : n;
	}
	if (t) {
		if (Pe?.nodeType !== 3) {
			var r = fn();
			return Pe?.before(r), Fe(r), r;
		}
		vn(Pe);
	}
	return Pe;
}
function I(e, t = 1, n = !1) {
	let r = Me ? Pe : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ mn(r);
	if (!Me) return r;
	if (n) {
		if (r?.nodeType !== 3) {
			var a = fn();
			return r === null ? i?.after(a) : r.before(a), Fe(a), a;
		}
		vn(r);
	}
	return Fe(r), r;
}
function hn(e) {
	e.textContent = "";
}
function gn() {
	return !1;
}
function _n(e, t, n) {
	return t == null || t === "http://www.w3.org/1999/xhtml" ? n ? document.createElement(e, { is: n }) : document.createElement(e) : n ? document.createElementNS(t, e, { is: n }) : document.createElementNS(t, e);
}
function vn(e) {
	if (e.nodeValue.length < 65536) return;
	let t = e.nextSibling;
	for (; t !== null && t.nodeType === 3;) t.remove(), e.nodeValue += t.nodeValue, t = e.nextSibling;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/effects.js
function yn(e) {
	Xn === null && (qn === null && be(e), ye()), Gn && ve(e);
}
function bn(e, t) {
	var n = t.last;
	n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function xn(e, t) {
	var n = Xn;
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
	if (e & 4) Rt === null ? Ht.ensure().schedule(r) : Rt.push(r);
	else if (t !== null) {
		try {
			mr(r);
		} catch (e) {
			throw Fn(r), e;
		}
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && (i = i.first, e & 16 && e & 65536 && i !== null && (i.f |= C));
	}
	if (i !== null && (i.parent = n, n !== null && bn(i, n), qn !== null && qn.f & 2 && !(e & 64))) {
		var a = qn;
		(a.effects ??= []).push(i);
	}
	return r;
}
function Sn() {
	return qn !== null && !Jn;
}
function Cn(e) {
	let t = xn(8, null);
	return it(t, g), t.teardown = e, t;
}
function wn(e) {
	yn("$effect");
	var t = Xn.f;
	if (!qn && t & 32 && Ke !== null && !Ke.i) {
		var n = Ke;
		(n.e ??= []).push(e);
	} else return Tn(e);
}
function Tn(e) {
	return xn(4 | ee, e);
}
function En(e) {
	Ht.ensure();
	let t = xn(64 | w, e);
	return (e = {}) => new Promise((n) => {
		e.outro ? Rn(t, () => {
			Fn(t), n(void 0);
		}) : (Fn(t), n(void 0));
	});
}
function Dn(e) {
	return xn(4, e);
}
function On(e) {
	return xn(ie | w, e);
}
function kn(e, t = 0) {
	return xn(8 | t, e);
}
function L(e, t = [], n = [], r = []) {
	bt(r, t, n, (t) => {
		xn(8, () => {
			e(...t.map(R));
		});
	});
}
function An(e, t = 0) {
	return xn(16 | t, e);
}
function jn(e) {
	return xn(32 | w, e);
}
function Mn(e) {
	var t = e.teardown;
	if (t !== null) {
		let e = Gn, n = qn;
		Kn(!0), Yn(null);
		try {
			t.call(null);
		} finally {
			Kn(e), Yn(n);
		}
	}
}
function Nn(e, t = !1) {
	var n = e.first;
	for (e.first = e.last = null; n !== null;) {
		let e = n.ac;
		e !== null && mt(() => {
			e.abort(me);
		});
		var r = n.next;
		n.f & 64 ? n.parent = null : Fn(n, t), n = r;
	}
}
function Pn(e) {
	for (var t = e.first; t !== null;) {
		var n = t.next;
		t.f & 32 || Fn(t), t = n;
	}
}
function Fn(e, t = !0) {
	var n = !1;
	(t || e.f & 262144) && e.nodes !== null && e.nodes.end !== null && (In(e.nodes.start, e.nodes.end), n = !0), e.f |= S, Nn(e, t && !n), pr(e, 0);
	var r = e.nodes && e.nodes.t;
	if (r !== null) for (let e of r) e.stop();
	Mn(e), e.f ^= S, e.f |= b;
	var i = e.parent;
	i !== null && i.first !== null && Ln(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function In(e, t) {
	for (; e !== null;) {
		var n = e === t ? null : /* @__PURE__ */ mn(e);
		e.remove(), e = n;
	}
}
function Ln(e) {
	var t = e.parent, n = e.prev, r = e.next;
	n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function Rn(e, t, n = !0) {
	var r = [];
	zn(e, r, !0);
	var i = () => {
		n && Fn(e), t && t();
	}, a = r.length;
	if (a > 0) {
		var o = () => --a || i();
		for (var s of r) s.out(o);
	} else i();
}
function zn(e, t, n) {
	if (!(e.f & 8192)) {
		e.f ^= y;
		var r = e.nodes && e.nodes.t;
		if (r !== null) for (let e of r) (e.is_global || n) && t.push(e);
		for (var i = e.first; i !== null;) {
			var a = i.next;
			if (!(i.f & 64)) {
				var o = !!(i.f & 65536) || !!(i.f & 32) && !!(e.f & 16);
				zn(i, t, o ? n : !1);
			}
			i = a;
		}
	}
}
function Bn(e) {
	Vn(e, !0);
}
function Vn(e, t) {
	if (e.f & 8192) {
		e.f ^= y, e.f & 1024 || (it(e, _), Ht.ensure().schedule(e));
		for (var n = e.first; n !== null;) {
			var r = n.next, i = !!(n.f & 65536) || !!(n.f & 32);
			Vn(n, i ? t : !1), n = r;
		}
		var a = e.nodes && e.nodes.t;
		if (a !== null) for (let e of a) (e.is_global || t) && e.in();
	}
}
function Hn(e, t) {
	if (e.nodes) for (var n = e.nodes.start, r = e.nodes.end; n !== null;) {
		var i = n === r ? null : /* @__PURE__ */ mn(n);
		t.append(n), n = i;
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/legacy.js
var Un = null, Wn = !1, Gn = !1;
function Kn(e) {
	Gn = e;
}
var qn = null, Jn = !1;
function Yn(e) {
	qn = e;
}
var Xn = null;
function Zn(e) {
	Xn = e;
}
var Qn = null;
function $n(e) {
	qn !== null && (Qn ??= /* @__PURE__ */ new Set()).add(e);
}
var er = null, tr = 0, nr = null;
function rr(e) {
	nr = e;
}
var ir = 1, ar = 0, or = ar;
function sr(e) {
	or = e;
}
function cr() {
	return ++ir;
}
function lr(e) {
	var t = e.f;
	if (t & 2048) return !0;
	if (t & 2 && (e.f &= ~ne), t & 4096) {
		for (var n = e.deps, r = n.length, i = 0; i < r; i++) {
			var a = n[i];
			if (lr(a) && kt(a), a.wv > e.wv) return !0;
		}
		t & 512 && Pt === null && it(e, g);
	}
	return !1;
}
function ur(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(Qn !== null && Qn.has(e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? ur(a, t, !1) : t === a && (n ? it(a, _) : a.f & 1024 && it(a, v), qt(a));
	}
}
function dr(e) {
	var t = er, n = tr, r = nr, i = qn, a = Qn, o = Ke, s = Jn, c = or, l = e.f;
	er = null, tr = 0, nr = null, qn = l & 96 ? null : e, Qn = null, qe(e.ctx), Jn = !1, or = ++ar, e.ac !== null && (mt(() => {
		e.ac.abort(me);
	}), e.ac = null);
	try {
		e.f |= re;
		var u = e.fn, d = u();
		e.f |= x;
		var f = e.deps, p = j?.is_fork;
		if (er !== null) {
			var m;
			if (p || pr(e, tr), f !== null && tr > 0) for (f.length = tr + er.length, m = 0; m < er.length; m++) f[tr + m] = er[m];
			else e.deps = f = er;
			if (Sn() && e.f & 512) for (m = tr; m < f.length; m++) (f[m].reactions ??= []).push(e);
		} else !p && f !== null && tr < f.length && (pr(e, tr), f.length = tr);
		if (Xe() && nr !== null && !Jn && f !== null && !(e.f & 6146)) for (m = 0; m < nr.length; m++) ur(nr[m], e);
		if (i !== null && i !== e) {
			if (ar++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = ar;
			if (t !== null) for (let e of t) e.rv = ar;
			nr !== null && (r === null ? r = nr : r.push(...nr));
		}
		return e.f & 8388608 && (e.f ^= ae), d;
	} catch (e) {
		return tt(e);
	} finally {
		e.f ^= re, er = t, tr = n, nr = r, qn = i, Qn = a, qe(o), Jn = s, or = c;
	}
}
function fr(e, r) {
	let i = r.reactions;
	if (i !== null) {
		var a = t.call(i, e);
		if (a !== -1) {
			var o = i.length - 1;
			o === 0 ? i = r.reactions = null : (i[a] = i[o], i.pop());
		}
	}
	if (i === null && r.f & 2 && (er === null || !n.call(er, r))) {
		var s = r;
		s.f & 512 && (s.f ^= 512, s.f &= ~ne), s.v !== T && at(s), s.ac !== null && mt(() => {
			s.ac.abort(me), s.ac = null, it(s, _);
		}), At(s), pr(s, 0);
	}
}
function pr(e, t) {
	var n = e.deps;
	if (n !== null) for (var r = t; r < n.length; r++) fr(e, n[r]);
}
function mr(e) {
	var t = e.f;
	if (!(t & 16384)) {
		it(e, g);
		var n = Xn, r = Wn;
		Xn = e, Wn = !(t & 96);
		try {
			t & 16777232 ? Pn(e) : Nn(e), Mn(e);
			var i = dr(e);
			e.teardown = typeof i == "function" ? i : null, e.wv = ir;
		} finally {
			Wn = r, Xn = n;
		}
	}
}
async function hr() {
	await Promise.resolve(), Ut();
}
function R(e) {
	var t = !!(e.f & 2);
	if (Un?.add(e), qn !== null && !Jn && !(Xn !== null && Xn.f & 16384) && (Qn === null || !Qn.has(e))) {
		var r = qn.deps;
		if (qn.f & 2097152) e.rv < ar && (e.rv = ar, er === null && r !== null && r[tr] === e ? tr++ : er === null ? er = [e] : er.push(e));
		else {
			qn.deps ??= [], n.call(qn.deps, e) || qn.deps.push(e);
			var i = e.reactions;
			i === null ? e.reactions = [qn] : n.call(i, qn) || i.push(qn);
		}
	}
	if (Gn && Zt.has(e)) return Zt.get(e);
	if (t) {
		var a = e;
		if (Gn) {
			var o = a.v;
			return (!(a.f & 1024) && a.reactions !== null || _r(a)) && (o = Ot(a)), Zt.set(a, o), o;
		}
		var s = !(a.f & 512) && !Jn && qn !== null && (Wn || !!(qn.f & 512)), c = (a.f & x) === 0;
		lr(a) && (s && (a.f |= 512), kt(a)), s && !c && (jt(a), gr(a));
	}
	if (Pt?.has(e)) return Pt.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function gr(e) {
	if (e.f |= 512, e.deps !== null) for (let t of e.deps) (t.reactions ??= []).push(e), t.f & 2 && !(t.f & 512) && (jt(t), gr(t));
}
function _r(e) {
	if (e.v === T) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if (Zt.has(t) || t.f & 2 && _r(t)) return !0;
	return !1;
}
function vr(e) {
	var t = Jn;
	try {
		return Jn = !0, e();
	} finally {
		Jn = t;
	}
}
[.../* @__PURE__ */ "allowfullscreen.async.autofocus.autoplay.checked.controls.default.disabled.formnovalidate.indeterminate.inert.ismap.loop.multiple.muted.nomodule.novalidate.open.playsinline.readonly.required.reversed.seamless.selected.webkitdirectory.defer.disablepictureinpicture.disableremoteplayback".split(".")];
var yr = ["touchstart", "touchmove"];
function br(e) {
	return yr.includes(e);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/events.js
var xr = Symbol("events"), Sr = /* @__PURE__ */ new Set(), Cr = /* @__PURE__ */ new Set();
function wr(e) {
	if (!Me) return;
	e.removeAttribute("onload"), e.removeAttribute("onerror");
	let t = e.__e;
	t !== void 0 && (e.__e = void 0, queueMicrotask(() => {
		e.isConnected && e.dispatchEvent(t);
	}));
}
function Tr(e, t, n, r = {}) {
	function i(e) {
		if (r.capture || Ar.call(t, e), !e.cancelBubble) return mt(() => n?.call(this, e));
	}
	return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? $e(() => {
		t.addEventListener(e, i, r);
	}) : t.addEventListener(e, i, r), i;
}
function Er(e, t, n, r, i) {
	var a = {
		capture: r,
		passive: i
	}, o = Tr(e, t, n, a);
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && Cn(() => {
		t.removeEventListener(e, o, a);
	});
}
function z(e, t, n) {
	(t[xr] ??= {})[e] = n;
}
function Dr(e) {
	for (var t = 0; t < e.length; t++) Sr.add(e[t]);
	for (var n of Cr) n(e);
}
var Or = null, kr = !1;
function Ar(e) {
	var t = this, n = t.ownerDocument, r = e.type, a = e.composedPath?.() || [], o = a[0] || e.target;
	Or = e, kr || (kr = !0, setTimeout(() => {
		kr = !1, Or = null;
	}));
	var s = 0, c = Or === e && e[xr];
	if (c) {
		var l = a.indexOf(c);
		if (l !== -1 && (t === document || t === window)) {
			e[xr] = t;
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
		var d = qn, f = Xn;
		Yn(null), Zn(null);
		try {
			for (var p, m = []; o !== null && o !== t;) {
				try {
					var h = o[xr]?.[r];
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
			e[xr] = t, delete e.currentTarget, Yn(d), Zn(f);
		}
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/reconciler.js
var jr = globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", { createHTML: (e) => e });
function Mr(e) {
	return jr?.createHTML(e) ?? e;
}
function Nr(e) {
	var t = _n("template");
	return t.innerHTML = Mr(e.replaceAll("<!>", "<!---->")), t.content;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/template.js
function Pr(e, t) {
	var n = Xn;
	n.nodes === null && (n.nodes = {
		start: e,
		end: t,
		a: null,
		t: null
	});
}
/*#__NO_SIDE_EFFECTS__*/
function B(e, t) {
	var n = !!(t & 1), r = !!(t & 2), i, a = !e.startsWith("<!>");
	return () => {
		if (Me) return Pr(Pe, null), Pe;
		i === void 0 && (i = Nr(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ pn(i)));
		var t = r || cn ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ pn(t), s = t.lastChild;
			Pr(o, s);
		} else Pr(t, t);
		return t;
	};
}
function Fr(e = "") {
	if (!Me) {
		var t = fn(e + "");
		return Pr(t, t), t;
	}
	var n = Pe;
	return n.nodeType === 3 ? vn(n) : (n.before(n = fn()), Fe(n)), Pr(n, n), n;
}
function Ir() {
	if (Me) return Pr(Pe, null), Pe;
	var e = document.createDocumentFragment(), t = document.createComment(""), n = fn();
	return e.append(t, n), Pr(t, n), e;
}
function V(e, t) {
	if (Me) {
		var n = Xn;
		(!(n.f & 32768) || n.nodes.end === null) && (n.nodes.end = Pe), Ie();
		return;
	}
	e !== null && e.before(t);
}
//#endregion
//#region node_modules/svelte/src/internal/client/render.js
var Lr = !0;
function H(e, t) {
	var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
	n !== (e[fe] ??= e.nodeValue) && (e[fe] = n, e.nodeValue = `${n}`);
}
function Rr(e, t) {
	return Br(e, t);
}
var zr = /* @__PURE__ */ new Map();
function Br(e, { target: t, anchor: n, props: i = {}, events: a, context: o, intro: s = !0, transformError: c }) {
	dn();
	var l = void 0, u = En(() => {
		var u = n ?? t.appendChild(fn());
		vt(u, { pending: () => {} }, (t) => {
			Je({});
			var n = Ke;
			if (o && (n.c = o), a && (i.$$events = a), Me && Pr(t, null), Lr = s, l = e(t, i) || {}, Lr = !0, Me && (Xn.nodes.end = Pe, Pe === null || Pe.nodeType !== 8 || Pe.data !== "]")) throw Ae(), De;
			Ye();
		}, c);
		var d = /* @__PURE__ */ new Set(), f = (e) => {
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				if (!d.has(r)) {
					d.add(r);
					var i = br(r);
					for (let e of [t, document]) {
						var a = zr.get(e);
						a === void 0 && (a = /* @__PURE__ */ new Map(), zr.set(e, a));
						var o = a.get(r);
						o === void 0 ? (e.addEventListener(r, Ar, { passive: i }), a.set(r, 1)) : a.set(r, o + 1);
					}
				}
			}
		};
		return f(r(Sr)), Cr.add(f), () => {
			for (var e of d) for (let n of [t, document]) {
				var r = zr.get(n), i = r.get(e);
				--i == 0 ? (n.removeEventListener(e, Ar), r.delete(e), r.size === 0 && zr.delete(n)) : r.set(e, i);
			}
			Cr.delete(f), u !== n && u.parentNode?.removeChild(u);
		};
	});
	return Vr.set(l, u), l;
}
var Vr = /* @__PURE__ */ new WeakMap(), Hr = class {
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
			if (n) Bn(n), this.#r.delete(t);
			else {
				var r = this.#n.get(t);
				r && (Bn(r.effect), this.#t.set(t, r.effect), this.#n.delete(t), r.fragment.lastChild.remove(), this.anchor.before(r.fragment), n = r.effect);
			}
			for (let [t, n] of this.#e) {
				if (this.#e.delete(t), t === e) break;
				let r = this.#n.get(n);
				r && (Fn(r.effect), this.#n.delete(n));
			}
			for (let [e, r] of this.#t) {
				if (e === t || this.#r.has(e)) continue;
				let i = () => {
					if (Array.from(this.#e.values()).includes(e)) {
						var t = document.createDocumentFragment();
						Hn(r, t), t.append(fn()), this.#n.set(e, {
							effect: r,
							fragment: t
						});
					} else Fn(r);
					this.#r.delete(e), this.#t.delete(e);
				};
				this.#i || !n ? (this.#r.add(e), Rn(r, i, !1)) : i();
			}
		}
	};
	#o = (e) => {
		this.#e.delete(e);
		let t = Array.from(this.#e.values());
		for (let [e, n] of this.#n) t.includes(e) || (Fn(n.effect), this.#n.delete(e));
	};
	ensure(e, t) {
		var n = j, r = gn();
		if (t && !this.#t.has(e) && !this.#n.has(e)) {
			if (r) {
				var i = document.createDocumentFragment(), a = fn();
				i.append(a), this.#n.set(e, {
					effect: jn(() => t(a)),
					fragment: i
				});
			} else this.#t.set(e, jn(() => t(this.anchor)));
		}
		if (this.#e.set(n, e), r) {
			for (let [t, r] of this.#t) t === e ? n.unskip_effect(r) : n.skip_effect(r);
			for (let [t, r] of this.#n) t === e ? n.unskip_effect(r.effect) : n.skip_effect(r.effect);
			n.oncommit(this.#a), n.ondiscard(this.#o);
		} else Me && (this.anchor = Pe), this.#a(n);
	}
};
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/if.js
function U(e, t, n = !1) {
	var r;
	Me && (r = Pe, Ie());
	var i = new Hr(e), a = n ? C : 0;
	function o(e, t) {
		if (Me) {
			var n = ze(r);
			if (e !== parseInt(n.substring(1))) {
				var a = Re();
				Fe(a), i.anchor = a, Ne(!1), i.ensure(e, t), Ne(!0);
				return;
			}
		}
		i.ensure(e, t);
	}
	An(() => {
		var e = !1;
		t((t, n = 0) => {
			e = !0, o(n, t);
		}), e || o(-1, null);
	}, a);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/each.js
function Ur(e, t) {
	return t;
}
function Wr(e, t, n) {
	for (var i = [], a = t.length, o, s = t.length, c = 0; c < a; c++) {
		let n = t[c];
		Rn(n, () => {
			if (o) {
				if (o.pending.delete(n), o.done.add(n), o.pending.size === 0) {
					var t = e.outrogroups;
					Gr(e, r(o.done)), t.delete(o), t.size === 0 && (e.outrogroups = null);
				}
			} else --s;
		}, !1);
	}
	if (s === 0) {
		var l = i.length === 0 && n !== null && e.pending.size === 0;
		if (l) {
			var u = n, d = u.parentNode;
			hn(d), d.append(u), e.items.clear();
		}
		Gr(e, t, !l);
	} else o = {
		pending: new Set(t),
		done: /* @__PURE__ */ new Set()
	}, (e.outrogroups ??= /* @__PURE__ */ new Set()).add(o);
}
function Gr(e, t, n = !0) {
	var r;
	if (e.pending.size > 0) {
		r = /* @__PURE__ */ new Set();
		for (let t of e.pending.values()) for (let n of t) r.add(e.items.get(n).e);
	}
	for (var i = 0; i < t.length; i++) {
		var a = t[i];
		r?.has(a) ? (a.f |= te, Hn(a, document.createDocumentFragment())) : Fn(t[i], n);
	}
}
var Kr;
function qr(t, n, i, a, o, s = null) {
	var c = t, l = /* @__PURE__ */ new Map();
	if (n & 4) {
		var u = t;
		c = Me ? Fe(/* @__PURE__ */ pn(u)) : u.appendChild(fn());
	}
	Me && Ie();
	var d = null, f = /* @__PURE__ */ Et(() => {
		var t = i();
		return e(t) ? t : t == null ? [] : r(t);
	}), p, m = /* @__PURE__ */ new Map(), h = !0;
	function g(e) {
		v.effect.f & 16384 || (v.pending.delete(e), v.fallback = d, Yr(v, p, c, n, a), d !== null && (p.length === 0 ? d.f & 33554432 ? (d.f ^= te, Zr(d, null, c)) : Bn(d) : Rn(d, () => {
			d = null;
		})));
	}
	function _(e) {
		v.pending.delete(e);
	}
	var v = {
		effect: An(() => {
			p = R(f);
			var e = p.length;
			let t = !1;
			Me && ze(c) === "[!" != (e === 0) && (c = Re(), Fe(c), Ne(!1), t = !0);
			for (var r = /* @__PURE__ */ new Set(), u = j, v = gn(), y = 0; y < e; y += 1) {
				Me && Pe.nodeType === 8 && Pe.data === "]" && (c = Pe, t = !0, Ne(!1));
				var b = p[y], x = a(b, y), S = h ? null : l.get(x);
				S ? (S.v && tn(S.v, b), S.i && tn(S.i, y), v && u.unskip_effect(S.e)) : (S = Xr(l, h ? c : Kr ??= fn(), b, x, y, o, n, i), h || (S.e.f |= te), l.set(x, S)), r.add(x);
			}
			if (e === 0 && s && !d && (h ? d = jn(() => s(c)) : (d = jn(() => s(Kr ??= fn())), d.f |= te)), e > r.size && _e("", "", ""), Me && e > 0 && Fe(Re()), !h) {
				if (m.set(u, r), v) {
					for (let [e, t] of l) r.has(e) || u.skip_effect(t.e);
					u.oncommit(g), u.ondiscard(_);
				} else g(u);
			}
			t && Ne(!0), R(f);
		}),
		flags: n,
		items: l,
		pending: m,
		outrogroups: null,
		fallback: d
	};
	h = !1, Me && (c = Pe);
}
function Jr(e) {
	for (; e !== null && !(e.f & 32);) e = e.next;
	return e;
}
function Yr(e, t, n, i, a) {
	var o = !!(i & 8), s = t.length, c = e.items, l = Jr(e.effect.first), u, d = null, f, p = [], m = [], h, g, _, v;
	if (o) for (v = 0; v < s; v += 1) h = t[v], g = a(h, v), _ = c.get(g).e, _.f & 33554432 || (_.nodes?.a?.measure(), (f ??= /* @__PURE__ */ new Set()).add(_));
	for (v = 0; v < s; v += 1) {
		if (h = t[v], g = a(h, v), _ = c.get(g).e, e.outrogroups !== null) for (let t of e.outrogroups) t.pending.delete(_), t.done.delete(_);
		if (_.f & 8192 && (Bn(_), o && (_.nodes?.a?.unfix(), (f ??= /* @__PURE__ */ new Set()).delete(_))), _.f & 33554432) {
			if (_.f ^= te, _ === l) Zr(_, null, n);
			else {
				var y = d ? d.next : l;
				_ === e.effect.last && (e.effect.last = _.prev), _.prev && (_.prev.next = _.next), _.next && (_.next.prev = _.prev), Qr(e, d, _), Qr(e, _, y), Zr(_, y, n), d = _, p = [], m = [], l = Jr(d.next);
				continue;
			}
		}
		if (_ !== l) {
			if (u !== void 0 && u.has(_)) {
				if (p.length < m.length) {
					var b = m[0], x;
					d = b.prev;
					var S = p[0], C = p[p.length - 1];
					for (x = 0; x < p.length; x += 1) Zr(p[x], b, n);
					for (x = 0; x < m.length; x += 1) u.delete(m[x]);
					Qr(e, S.prev, C.next), Qr(e, d, S), Qr(e, C, b), l = b, d = C, --v, p = [], m = [];
				} else u.delete(_), Zr(_, l, n), Qr(e, _.prev, _.next), Qr(e, _, d === null ? e.effect.first : d.next), Qr(e, d, _), d = _;
				continue;
			}
			for (p = [], m = []; l !== null && l !== _;) (u ??= /* @__PURE__ */ new Set()).add(l), m.push(l), l = Jr(l.next);
			if (l === null) continue;
		}
		_.f & 33554432 || p.push(_), d = _, l = Jr(_.next);
	}
	if (e.outrogroups !== null) {
		for (let t of e.outrogroups) t.pending.size === 0 && (Gr(e, r(t.done)), e.outrogroups?.delete(t));
		e.outrogroups.size === 0 && (e.outrogroups = null);
	}
	if (l !== null || u !== void 0) {
		var w = [];
		if (u !== void 0) for (_ of u) _.f & 8192 || w.push(_);
		for (; l !== null;) !(l.f & 8192) && l !== e.fallback && w.push(l), l = Jr(l.next);
		var ee = w.length;
		if (ee > 0) {
			var ne = i & 4 && s === 0 ? n : null;
			if (o) {
				for (v = 0; v < ee; v += 1) w[v].nodes?.a?.measure();
				for (v = 0; v < ee; v += 1) w[v].nodes?.a?.fix();
			}
			Wr(e, w, ne);
		}
	}
	o && $e(() => {
		if (f !== void 0) for (_ of f) _.nodes?.a?.apply();
	});
}
function Xr(e, t, n, r, i, a, o, s) {
	var c = o & 1 ? o & 16 ? $t(n) : /* @__PURE__ */ en(n, !1, !1) : null, l = o & 2 ? $t(i) : null;
	return {
		v: c,
		i: l,
		e: jn(() => (a(t, c ?? n, l ?? i, s), () => {
			e.delete(r);
		}))
	};
}
function Zr(e, t, n) {
	if (e.nodes) for (var r = e.nodes.start, i = e.nodes.end, a = t && !(t.f & 33554432) ? t.nodes.start : n; r !== null;) {
		var o = /* @__PURE__ */ mn(r);
		if (a.before(r), r === i) return;
		r = o;
	}
}
function Qr(e, t, n) {
	t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
function W(e, t, n = !1, r = !1, i = !1, a = !1) {
	var o = e, s = "";
	if (n) {
		var c = e;
		Me && (o = Fe(/* @__PURE__ */ pn(c)));
	}
	L(() => {
		var e = Xn;
		if (s === (s = t() ?? "")) {
			Me && Ie();
			return;
		}
		if (n && !Me) {
			e.nodes = null, c.innerHTML = s, s !== "" && Pr(/* @__PURE__ */ pn(c), c.lastChild);
			return;
		}
		if (e.nodes !== null && (In(e.nodes.start, e.nodes.end), e.nodes = null), s !== "") {
			if (Me) {
				for (var a = Pe.data, l = Ie(), u = l; l !== null && (l.nodeType !== 8 || l.data !== "");) u = l, l = /* @__PURE__ */ mn(l);
				if (l === null) throw Ae(), De;
				Pr(Pe, u), o = Fe(l);
				return;
			}
			var d = _n(r ? "svg" : i ? "math" : "template", r ? E : i ? D : void 0);
			d.innerHTML = s;
			var f = r || i ? d : d.content;
			if (Pr(/* @__PURE__ */ pn(f), f.lastChild), r || i) for (; /* @__PURE__ */ pn(f);) o.before(/* @__PURE__ */ pn(f));
			else o.before(f);
		}
	});
}
//#endregion
//#region node_modules/svelte/src/internal/client/timing.js
var $r = () => performance.now(), ei = {
	tick: (e) => requestAnimationFrame(e),
	now: () => $r(),
	tasks: /* @__PURE__ */ new Set()
};
//#endregion
//#region node_modules/svelte/src/internal/client/loop.js
function ti() {
	let e = ei.now();
	ei.tasks.forEach((t) => {
		t.c(e) || (ei.tasks.delete(t), t.f());
	}), ei.tasks.size !== 0 && ei.tick(ti);
}
function ni(e) {
	let t;
	return ei.tasks.size === 0 && ei.tick(ti), {
		promise: new Promise((n) => {
			ei.tasks.add(t = {
				c: e,
				f: n
			});
		}),
		abort() {
			ei.tasks.delete(t);
		}
	};
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/transitions.js
function ri(e, t) {
	mt(() => {
		e.dispatchEvent(new CustomEvent(t));
	});
}
function ii(e) {
	if (e === "float") return "cssFloat";
	if (e === "offset") return "cssOffset";
	if (e.startsWith("--")) return e;
	let t = e.split("-");
	return t.length === 1 ? t[0] : t[0] + t.slice(1).map((e) => e[0].toUpperCase() + e.slice(1)).join("");
}
function ai(e) {
	let t = {}, n = e.split(";");
	for (let e of n) {
		let [n, r] = e.split(":");
		if (!n || r === void 0) break;
		let i = ii(n.trim());
		t[i] = r.trim();
	}
	return t;
}
var oi = (e) => e;
function si(e, t, n, r) {
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
			a || f?.abort(), f = ci(t, m(), p, 1, () => {
				ri(t, "introstart");
			}, () => {
				ri(t, "introend"), f?.abort(), f = l = void 0, t.style.overflow = d;
			});
		},
		out(e) {
			if (!a) {
				e?.(), l = void 0;
				return;
			}
			t.inert = !0, p = ci(t, m(), f, 0, () => {
				ri(t, "outrostart");
			}, () => {
				ri(t, "outroend"), e?.();
			});
		},
		stop: () => {
			f?.abort(), p?.abort();
		}
	}, g = Xn;
	if ((g.nodes.t ??= []).push(h), i && Lr) {
		var _ = s;
		if (!_) {
			for (var v = g.parent; v && v.f & 65536;) for (; (v = v.parent) && !(v.f & 16););
			_ = !v || !!(v.f & 32768);
		}
		_ && Dn(() => {
			vr(() => h.in());
		});
	}
}
function ci(e, t, n, r, i, a) {
	var o = r === 1;
	if (d(t)) {
		var s, c = !1;
		return $e(() => {
			c || (s = ci(e, t({ direction: o ? "in" : "out" }), n, r, i, a));
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
	let { delay: l = 0, css: u, tick: p, easing: m = oi } = t;
	var h = [];
	if (o && n === void 0 && (p && p(0, 1), u)) {
		var g = ai(u(0, 1));
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
				var g = o + s * m(h / f), y = ai(u(g, 1 - g));
				l.push(y), d ||= y.overflow === "hidden";
			}
			d && (e.style.overflow = "hidden"), _ = () => {
				var e = v.currentTime;
				return o + s * m(e / c);
			}, p && ni(() => {
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
var li = [..." 	\n\r\f\xA0\v﻿"];
function ui(e, t, n) {
	var r = e == null ? "" : "" + e;
	if (t && (r = r ? r + " " + t : t), n) {
		for (var i of Object.keys(n)) if (n[i]) r = r ? r + " " + i : i;
		else if (r.length) for (var a = i.length, o = 0; (o = r.indexOf(i, o)) >= 0;) {
			var s = o + a;
			(o === 0 || li.includes(r[o - 1])) && (s === r.length || li.includes(r[s])) ? r = (o === 0 ? "" : r.substring(0, o)) + r.substring(s + 1) : o = s;
		}
	}
	return r === "" ? null : r;
}
function di(e, t = !1) {
	var n = t ? " !important;" : ";", r = "";
	for (var i of Object.keys(e)) {
		var a = e[i];
		a != null && a !== "" && (r += " " + i + ": " + a + n);
	}
	return r;
}
function fi(e) {
	return e[0] !== "-" || e[1] !== "-" ? e.toLowerCase() : e;
}
function pi(e, t) {
	if (t) {
		var n = "", r, i;
		if (Array.isArray(t) ? (r = t[0], i = t[1]) : r = t, e) {
			e = String(e).replaceAll(/\/\*.*?\*\//g, "").trim();
			var a = !1, o = 0, s = !1, c = [];
			r && c.push(...Object.keys(r).map(fi)), i && c.push(...Object.keys(i).map(fi));
			var l = 0, u = -1;
			let t = e.length;
			for (var d = 0; d < t; d++) {
				var f = e[d];
				if (s ? f === "/" && e[d - 1] === "*" && (s = !1) : a ? a === f && (a = !1) : f === "/" && e[d + 1] === "*" ? s = !0 : f === "\"" || f === "'" ? a = f : f === "(" ? o++ : f === ")" && o--, !s && a === !1 && o === 0) {
					if (f === ":" && u === -1) u = d;
					else if (f === ";" || d === t - 1) {
						if (u !== -1) {
							var p = fi(e.substring(l, u).trim());
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
		return r && (n += di(r)), i && (n += di(i, !0)), n = n.trim(), n === "" ? null : n;
	}
	return e == null ? null : String(e);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/class.js
function mi(e, t, n, r, i, a) {
	var o = e[ue];
	if (Me || o !== n || o === void 0) {
		var s = ui(n, r, a);
		(!Me || s !== e.getAttribute("class")) && (s == null ? e.removeAttribute("class") : t ? e.className = s : e.setAttribute("class", s)), e[ue] = n;
	} else if (a && i !== a) for (var c in a) {
		var l = !!a[c];
		(i == null || l !== !!i[c]) && e.classList.toggle(c, l);
	}
	return a;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/style.js
function hi(e, t = {}, n, r) {
	for (var i in n) {
		var a = n[i];
		t[i] !== a && (n[i] == null ? e.style.removeProperty(i) : e.style.setProperty(i, a, r));
	}
}
function gi(e, t, n, r) {
	var i = e[de];
	if (Me || i !== t) {
		var a = pi(t, r);
		(!Me || a !== e.getAttribute("style")) && (a == null ? e.removeAttribute("style") : e.style.cssText = a), e[de] = t;
	} else r && (Array.isArray(r) ? (hi(e, n?.[0], r[0]), hi(e, n?.[1], r[1], "important")) : hi(e, n, r));
	return r;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/attributes.js
var _i = Symbol("is custom element"), vi = Symbol("is html"), yi = he ? "link" : "LINK", bi = he ? "progress" : "PROGRESS";
function G(e) {
	if (Me) {
		var t = !1, n = () => {
			if (!t) {
				if (t = !0, e.hasAttribute("value")) {
					var n = e.value;
					q(e, "value", null), e.value = n;
				}
				if (e.hasAttribute("checked")) {
					var r = e.checked;
					q(e, "checked", null), e.checked = r;
				}
			}
		};
		e[pe] = n, $e(n), pt();
	}
}
function K(e, t) {
	var n = Si(e);
	n.value !== (n.value = t ?? void 0) && (e.value !== t || t === 0 && e.nodeName === bi) && (e.value = t ?? "");
}
function xi(e, t) {
	var n = Si(e);
	n.checked !== (n.checked = t ?? void 0) && (e.checked = t);
}
function q(e, t, n, r) {
	var i = Si(e);
	Me && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === yi) || i[t] !== (i[t] = n) && (t === "loading" && (e[ce] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && wi(e).includes(t) ? e[t] = n : e.setAttribute(t, n));
}
function Si(e) {
	return e[le] ??= {
		[_i]: e.nodeName.includes("-"),
		[vi]: e.namespaceURI === Oe
	};
}
var Ci = /* @__PURE__ */ new Map();
function wi(e) {
	var t = e.getAttribute("is") || e.nodeName, n = Ci.get(t);
	if (n) return n;
	Ci.set(t, n = []);
	for (var r, i = e, a = Element.prototype; a !== i;) {
		for (var s in r = o(i), r) r[s].set && s !== "innerHTML" && s !== "textContent" && s !== "innerText" && n.push(s);
		i = l(i);
	}
	return n;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/input.js
function Ti(e, t, n = t) {
	var r = /* @__PURE__ */ new WeakSet();
	ht(e, "input", async (i) => {
		var a = i ? e.defaultValue : e.value;
		if (a = Ei(e) ? Di(a) : a, n(a), j !== null && r.add(j), await hr(), a !== (a = t())) {
			var o = e.selectionStart, s = e.selectionEnd, c = e.value.length;
			if (e.value = a ?? "", s !== null) {
				var l = e.value.length;
				o === s && s === c && l > c ? (e.selectionStart = l, e.selectionEnd = l) : (e.selectionStart = o, e.selectionEnd = Math.min(s, l));
			}
		}
	}), (Me && e.defaultValue !== e.value || vr(t) == null && e.value) && (n(Ei(e) ? Di(e.value) : e.value), j !== null && r.add(j)), kn(() => {
		var n = t();
		if (e === document.activeElement) {
			var i = j;
			if (r.has(i)) return;
		}
		Ei(e) && n === Di(e.value) || e.type === "date" && !n && !e.value || n !== e.value && (e.value = n ?? "");
	});
}
function Ei(e) {
	var t = e.type;
	return t === "number" || t === "range";
}
function Di(e) {
	return e === "" ? null : +e;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/this.js
function Oi(e, t) {
	return e === t || e?.[oe] === t;
}
function ki(e = {}, t, n, r) {
	var i = Ke.r, a = Xn;
	return Dn(() => {
		var o, s;
		return kn(() => {
			o = s, s = r?.() || [], vr(() => {
				Oi(n(...s), e) || (t(e, ...s), o && Oi(n(...o), e) && t(null, ...o));
			});
		}), () => {
			let r = a;
			for (; r !== i && r.parent !== null && r.parent.f & 33554432;) r = r.parent;
			let o = () => {
				s && Oi(n(...s), e) && t(null, ...s);
			}, c = r.teardown;
			r.teardown = () => {
				o(), c?.();
			};
		};
	}), e;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/props.js
function Ai(e, t, n, r) {
	var i = !0, o = !!(n & 8), s = !!(n & 16), c = r, l = !0, u = void 0, d = () => s && i ? (u ??= /* @__PURE__ */ k(r), R(u)) : (l && (l = !1, c = s ? vr(r) : r), c);
	let f;
	if (o) {
		var p = oe in e || se in e;
		f = a(e, t)?.set ?? (p && t in e ? (n) => e[t] = n : void 0);
	}
	var m, h = !1;
	o ? [m, h] = lt(() => e[t]) : m = e[t], m === void 0 && r !== void 0 && (m = d(), f && (i && Se(t), f(m)));
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
	var v = !1, y = (n & 1 ? k : Et)(() => (v = !1, g()));
	o && R(y);
	var b = Xn;
	return (function(e, t) {
		if (arguments.length > 0) {
			let n = t ? R(y) : i && o ? on(e) : e;
			return N(y, n), v = !0, c !== void 0 && (c = n), e;
		}
		return Gn && v || b.f & 16384 ? y.v : R(y);
	});
}
var ji = {
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
		"deling.share": "Del på {service}",
		"deling.email": "Del på e-post",
		"deling.copy": "Kopier lenke",
		"deling.copied": "Kopiert!",
		"butikk.addToCart": "Legg i handlekurv",
		"butikk.added": "Lagt i kurven!",
		"butikk.memberPrice": "Medlem: {price}",
		"butikk.cart": "Handlekurv",
		"butikk.cartEmpty": "Handlekurven er tom.",
		"butikk.total": "Sum",
		"butikk.checkout": "Til kassen",
		"butikk.close": "Lukk",
		"butikk.remove": "Fjern varen",
		"butikk.increase": "Flere",
		"butikk.decrease": "Færre",
		"butikk.name": "Navn",
		"butikk.email": "E-post",
		"butikk.phone": "Telefon",
		"butikk.comment": "Kommentar",
		"butikk.sendOrder": "Send bestilling",
		"butikk.orderSubject": "Bestilling fra {site}",
		"butikk.orderSent": "Takk! Bestillingen er sendt.",
		"butikk.orderDraft": "E-postutkastet er åpnet - send det for å fullføre bestillingen.",
		"butikk.fillRequired": "Fyll ut navn og en gyldig e-postadresse.",
		"butikk.sendFailed": "Kunne ikke sende akkurat nå. Prøv igjen senere.",
		"butikk.missingTarget": "Kassen mangler mottaker eller endepunkt.",
		"butikk.vippsHint": "Betaling: Vipps til {number}.",
		"butikk.quickView": "Vis produktet",
		"butikk.payWithVipps": "Betal med Vipps",
		"butikk.vippsUnavailable": "Betaling er ikke satt opp for denne siden ennå.",
		"nedteller.days": "dager",
		"nedteller.hours": "timer",
		"nedteller.minutes": "minutter",
		"nedteller.seconds": "sekunder",
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
}, Mi = [
	"nb",
	"nn",
	"en-GB",
	"se",
	"tr"
], Ni = /^[a-z]{2,3}(?:-[A-Za-z0-9]{2,8})*$/, Pi = {
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
function Fi(e) {
	let t = String(e ?? "").trim().toLowerCase();
	for (let [e, n] of Object.entries(Pi)) if (n.some((e) => t === e || t.startsWith(`${e}-`))) return e;
	return null;
}
function Ii(e) {
	return Mi.includes(String(e ?? ""));
}
function Li(e) {
	let t = [];
	if (!Array.isArray(e)) return ["languages må være en liste"];
	for (let n of e) {
		if (!n || typeof n != "object" || Array.isArray(n)) {
			t.push("languages: hvert innslag må være et objekt");
			continue;
		}
		let e = String(n.code ?? "");
		Ni.test(e) ? Ii(e) && t.push(`languages: '${e}' er innebygd i Urd og kan ikke overstyres`) : t.push(`languages: '${e}' er ikke en gyldig språkkode`), (typeof n.name != "string" || !n.name.trim()) && t.push(`languages/${e}: name mangler (språkets eget navn)`);
		for (let r of ["site", "admin"]) n[r] !== void 0 && typeof n[r] != "boolean" && t.push(`languages/${e}: ${r} må være boolsk`);
		n.site !== !0 && n.admin !== !0 && t.push(`languages/${e}: må dekke site, admin eller begge`);
	}
	return t;
}
function Ri(e) {
	let t = Fi(e);
	if (t) return t;
	let n = String(e ?? "").trim();
	return Ni.test(n) ? n : "nb";
}
async function zi(e, t) {
	try {
		return await (await import(
			/* @vite-ignore */
			"/assets/urd/language-packs.js"
)).loadPackStrings(e, t);
	} catch {
		return null;
	}
}
({ ...ji.strings });
var Bi = {
	lang: "nb",
	dict: {}
};
function Vi(e, t) {
	if (!t) return e;
	let n = e;
	for (let [e, r] of Object.entries(t)) n = n.replaceAll(`{${e}}`, String(r));
	return n;
}
function J(e, t) {
	return Vi(Bi.dict[e] ?? e, t);
}
function Hi(e) {
	let t = `api.${e?.code}`;
	return e?.code && Bi.dict[t] !== void 0 ? Vi(Bi.dict[t], e) : e?.error ?? null;
}
function Ui() {
	return Bi.lang;
}
function Wi() {
	let e = null;
	try {
		e = localStorage.getItem("urd-admin-lang");
	} catch {}
	if (e) return Ri(e);
	for (let e of navigator.languages ?? [navigator.language]) {
		let t = Fi(e);
		if (t) return t;
	}
	return "en-GB";
}
var Gi;
new Promise((e) => {
	Gi = e;
});
async function Ki(e = Wi()) {
	let t = async (e) => (await import(
		/* @vite-ignore */
		`/assets/urd/locales/admin/${e}.js`
)).default.strings;
	Bi.lang = Ri(e);
	let n = Ii(Bi.lang);
	try {
		Object.assign(Bi.dict, await t("nb")), n && Bi.lang !== "nb" && Object.assign(Bi.dict, await t(Bi.lang));
	} catch {}
	if (!n) {
		let e = await zi(Bi.lang, "admin");
		e ? Object.assign(Bi.dict, e) : Bi.lang = "nb";
	}
	return Gi(Bi.lang), Bi.lang;
}
//#endregion
//#region node_modules/svelte/src/internal/disclose-version.js
typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add("5");
//#endregion
//#region node_modules/svelte/src/transition/index.js
function qi(e) {
	let t = e - 1;
	return t * t * t + 1;
}
function Ji(e) {
	let t = typeof e == "string" && e.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);
	return t ? [parseFloat(t[1]), t[2] || "px"] : [e, "px"];
}
function Yi(e, { delay: t = 0, duration: n = 400, easing: r = qi, x: i = 0, y: a = 0, opacity: o = 0 } = {}) {
	let s = getComputedStyle(e), c = +s.opacity, l = s.transform === "none" ? "" : s.transform, u = c * (1 - o), [d, f] = Ji(i), [p, m] = Ji(a);
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
function Xi(e, t, n) {
	let r = t(), i = JSON.stringify(r), a = JSON.parse(i), o = localStorage.getItem(e);
	if (o) try {
		a = JSON.parse(o);
	} catch {
		localStorage.removeItem(e);
	}
	return {
		get data() {
			return a;
		},
		save() {
			let t = JSON.stringify(a);
			if (t === i) return localStorage.removeItem(e), !0;
			try {
				return localStorage.setItem(e, t), !0;
			} catch (e) {
				return n?.(e), !1;
			}
		},
		reset() {
			return localStorage.removeItem(e), a = JSON.parse(i), a;
		},
		replace(e) {
			return a = e, a;
		},
		amendBaseline(e) {
			let t = JSON.parse(i);
			e(t), i = JSON.stringify(t);
		},
		hasDraft() {
			return localStorage.getItem(e) !== null;
		}
	};
}
//#endregion
//#region src/lib/ColorPicker.svelte
var Zi = /* @__PURE__ */ B("<button type=\"button\" class=\"cp-clear svelte-zxiloo\">×</button>"), Qi = /* @__PURE__ */ B("<button type=\"button\" class=\"cp-eye svelte-zxiloo\"><svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M18 2l4 4-3 3-4-4 3-3z\"></path><path d=\"M15 5L4 16l-1 5 5-1L19 9\"></path></svg></button>"), $i = /* @__PURE__ */ B("<input type=\"number\" min=\"0\" max=\"255\" class=\"svelte-zxiloo\"/>"), ea = /* @__PURE__ */ B("<button type=\"button\"></button>"), ta = /* @__PURE__ */ B("<span class=\"cp-label svelte-zxiloo\"> <!></span> <span class=\"cp-tokens svelte-zxiloo\"></span>", 1), na = /* @__PURE__ */ B("<span class=\"cp-saved svelte-zxiloo\"><button type=\"button\" class=\"cp-token svelte-zxiloo\"></button> <button type=\"button\" class=\"cp-del svelte-zxiloo\">×</button></span>"), ra = /* @__PURE__ */ B("<span class=\"cp-tokens svelte-zxiloo\"></span>"), ia = /* @__PURE__ */ B("<button type=\"button\" class=\"cp-token svelte-zxiloo\"></button>"), aa = /* @__PURE__ */ B("<span class=\"cp-label svelte-zxiloo\"> </span> <span class=\"cp-tokens svelte-zxiloo\"></span>", 1), oa = /* @__PURE__ */ B("<div class=\"cp-pop svelte-zxiloo\"><div class=\"cp-sv svelte-zxiloo\"><span class=\"cp-cursor svelte-zxiloo\"></span></div> <input class=\"cp-hue svelte-zxiloo\" type=\"range\" min=\"0\" max=\"360\" step=\"1\"/> <input class=\"cp-alpha svelte-zxiloo\" type=\"range\" min=\"0\" max=\"100\" step=\"1\"/> <span class=\"cp-row svelte-zxiloo\"><span class=\"cp-preview svelte-zxiloo\"></span> <input class=\"cp-hex svelte-zxiloo\" spellcheck=\"false\"/> <!></span> <span class=\"cp-row cp-rgb svelte-zxiloo\"></span> <!> <span class=\"cp-label cp-label-row svelte-zxiloo\"> <button type=\"button\" class=\"cp-add svelte-zxiloo\">+</button></span> <!> <!></div>"), sa = /* @__PURE__ */ B("<span class=\"cp svelte-zxiloo\"><button type=\"button\"></button> <!> <!></span>");
function ca(e, t) {
	Je(t, !0);
	let n = Ai(t, "value", 3, "#000000"), r = Ai(t, "tokens", 19, () => []), i = Ai(t, "label", 19, () => J("cp.pickColor")), a = Ai(t, "allowClear", 3, !1), o = "urd-recent-colors", s = "urd-saved-colors", c = () => {
		let e = r().find(([e]) => e === n());
		return e ? e[1] : n();
	}, l = () => r().find(([e]) => e === n())?.[0] ?? null, u = /* @__PURE__ */ M(on([])), d = /* @__PURE__ */ M(on([])), f = "", p = "", m = /* @__PURE__ */ M(null), g = /* @__PURE__ */ M(!1), _ = /* @__PURE__ */ M(on({
		top: 0,
		left: 0
	})), v = /* @__PURE__ */ M(0), y = /* @__PURE__ */ M(0), b = /* @__PURE__ */ M(1), x = /* @__PURE__ */ M(1), S = /* @__PURE__ */ M("#000000");
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
	let w = (e, t, n) => "#" + [
		e,
		t,
		n
	].map((e) => e.toString(16).padStart(2, "0")).join("");
	function ee(e, t, n) {
		e /= 255, t /= 255, n /= 255;
		let r = Math.max(e, t, n), i = r - Math.min(e, t, n), a = 0;
		return i && (a = r === e ? (t - n) / i % 6 : r === t ? (n - e) / i + 2 : (e - t) / i + 4, a *= 60, a < 0 && (a += 360)), [
			a,
			r ? i / r : 0,
			r
		];
	}
	function te(e, t, n) {
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
	function ne() {
		return w(...te(R(v), R(y), R(b)));
	}
	function re() {
		let e = ne();
		return R(x) >= .995 ? e : e + Math.round(R(x) * 255).toString(16).padStart(2, "0");
	}
	function ie() {
		N(S, re(), !0), p = R(S), t.onchange?.(R(S));
	}
	function ae(e) {
		let t = C(e);
		return t ? (((e) => {
			var t = h(e, 3);
			N(v, t[0], !0), N(y, t[1], !0), N(b, t[2], !0);
		})(ee(t[0], t[1], t[2])), N(x, t[3], !0), N(S, re(), !0), !0) : !1;
	}
	function oe() {
		ae(c()) || ae("#000000"), f = n(), p = "";
		try {
			let e = JSON.parse(localStorage.getItem(o) ?? "[]");
			N(u, Array.isArray(e) ? e : [], !0);
		} catch {
			N(u, [], !0);
		}
		try {
			let e = JSON.parse(localStorage.getItem(s) ?? "[]");
			N(d, Array.isArray(e) ? e : [], !0);
		} catch {
			N(d, [], !0);
		}
		let e = R(m).getBoundingClientRect(), t = R(m).closest(".panel-body")?.getBoundingClientRect(), r = t ? t.right : window.innerWidth, i = Math.max(8, Math.min(e.right - 236, r - 236 - 8)), a = e.bottom + 380 + 8 > window.innerHeight ? Math.max(8, e.top - 380 - 8) : e.bottom + 6;
		N(_, {
			top: a,
			left: i
		}, !0), N(g, !0);
	}
	function se() {
		if (N(g, !1), p && p !== f) {
			let e = [p, ...R(u).filter((e) => e !== p)].slice(0, 8);
			localStorage.setItem(o, JSON.stringify(e));
		}
	}
	function ce(e, n) {
		ae(n), N(S, n, !0), t.onchange?.(e);
	}
	function le(e) {
		let t = e.currentTarget;
		t.setPointerCapture(e.pointerId);
		let n = (e) => {
			let n = t.getBoundingClientRect();
			N(y, Math.min(1, Math.max(0, (e.clientX - n.left) / n.width)), !0), N(b, 1 - Math.min(1, Math.max(0, (e.clientY - n.top) / n.height))), ie();
		};
		n(e);
		let r = (e) => n(e), i = () => {
			t.removeEventListener("pointermove", r), t.removeEventListener("pointerup", i);
		};
		t.addEventListener("pointermove", r), t.addEventListener("pointerup", i);
	}
	function ue(e) {
		ae(e.target.value) ? ie() : N(S, ne(), !0);
	}
	function de(e) {
		return (C(ne()) ?? [
			0,
			0,
			0
		])[e];
	}
	function fe(e, t) {
		let n = C(ne()) ?? [
			0,
			0,
			0
		];
		n[e] = Math.min(255, Math.max(0, Number(t) || 0)), ((e) => {
			var t = h(e, 3);
			N(v, t[0], !0), N(y, t[1], !0), N(b, t[2], !0);
		})(ee(...n)), ie();
	}
	let pe = typeof window < "u" && "EyeDropper" in window;
	async function me() {
		try {
			ae((await new window.EyeDropper().open()).sRGBHex) && ie();
		} catch {}
	}
	function he(e) {
		ae(e) && ie();
	}
	function ge() {
		let e = re();
		R(d).includes(e) || (N(d, [e, ...R(d)].slice(0, 12), !0), localStorage.setItem(s, JSON.stringify(We(R(d)))));
	}
	function _e(e) {
		N(d, R(d).filter((t) => t !== e), !0), localStorage.setItem(s, JSON.stringify(We(R(d))));
	}
	wn(() => {
		if (!R(g)) return;
		let e = (e) => {
			R(m) && !R(m).contains(e.target) && se();
		}, t = (e) => {
			e.key === "Escape" && se();
		}, n = () => se();
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t, !0), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t, !0), window.removeEventListener("blur", n);
		};
	});
	var ve = sa(), ye = P(ve);
	let be;
	var xe = I(ye, 2), Se = (e) => {
		var n = Zi();
		L((e, t) => {
			q(n, "title", e), q(n, "aria-label", t);
		}, [() => J("cp.clearTitle"), () => J("cp.clear")]), z("click", n, () => t.onchange?.("")), V(e, n);
	};
	U(xe, (e) => {
		a() && n() && e(Se);
	});
	var Ce = I(xe, 2), we = (e) => {
		var t = oa(), i = P(t), a = P(i);
		O(i);
		var o = I(i, 2);
		G(o);
		var s = I(o, 2);
		G(s);
		var c = I(s, 2), f = P(c), p = I(f, 2);
		G(p);
		var m = I(p, 2), g = (e) => {
			var t = Qi();
			L((e) => q(t, "title", e), [() => J("cp.eyedropper")]), z("click", t, me), V(e, t);
		};
		U(m, (e) => {
			pe && e(g);
		}), O(c);
		var C = I(c, 2);
		qr(C, 22, () => [
			"R",
			"G",
			"B"
		], (e) => e, (e, t, n) => {
			var r = $i();
			G(r), L((e) => {
				q(r, "title", t), K(r, e);
			}, [() => de(R(n))]), z("change", r, (e) => fe(R(n), e.target.value)), V(e, r);
		}), O(C);
		var w = I(C, 2), ee = (e) => {
			var t = ta(), i = F(t), a = P(i, !0), o = I(a), s = (e) => {
				var t = Fr();
				L((e) => H(t, e), [() => J("cp.linkedSuffix", { token: l() })]), V(e, t);
			}, c = /* @__PURE__ */ A(() => l());
			U(o, (e) => {
				R(c) && e(s);
			}), O(i);
			var u = I(i, 2);
			qr(u, 21, r, ([e, t]) => e, (e, t) => {
				var r = /* @__PURE__ */ A(() => h(R(t), 2));
				let i = () => R(r)[0], a = () => R(r)[1];
				var o = ea();
				let s;
				L((e) => {
					s = mi(o, 1, "cp-token svelte-zxiloo", null, s, { active: n() === i() }), gi(o, `background: ${a() ?? ""}`), q(o, "title", e);
				}, [() => J("cp.tokenTitle", { name: i() })]), z("click", o, () => ce(i(), a())), V(e, o);
			}), O(u), L((e) => H(a, e), [() => J("cp.themeColors")]), V(e, t);
		};
		U(w, (e) => {
			r().length && e(ee);
		});
		var te = I(w, 2), re = P(te), ae = I(re);
		O(te);
		var oe = I(te, 2), se = (e) => {
			var t = ra();
			qr(t, 20, () => R(d), (e) => e, (e, t) => {
				var n = na(), r = P(n), i = I(r, 2);
				O(n), L((e) => {
					gi(r, `background: ${t ?? ""}`), q(r, "title", t), q(i, "title", e);
				}, [() => J("cp.removeSaved")]), z("click", r, () => he(t)), z("click", i, () => _e(t)), V(e, n);
			}), O(t), V(e, t);
		};
		U(oe, (e) => {
			R(d).length && e(se);
		});
		var ve = I(oe, 2), ye = (e) => {
			var t = aa(), n = F(t), r = P(n, !0);
			O(n);
			var i = I(n, 2);
			qr(i, 20, () => R(u), (e) => e, (e, t) => {
				var n = ia();
				L(() => {
					gi(n, `background: ${t ?? ""}`), q(n, "title", t);
				}), z("click", n, () => he(t)), V(e, n);
			}), O(i), L((e) => H(r, e), [() => J("common.recent")]), V(e, t);
		};
		U(ve, (e) => {
			R(u).length && e(ye);
		}), O(t), L((e, n, r, c, l) => {
			gi(t, `top: ${R(_).top ?? ""}px; left: ${R(_).left ?? ""}px`), gi(i, `background-image: linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent); background-color: hsl(${R(v) ?? ""}, 100%, 50%)`), gi(a, `left: ${R(y) * 100}%; top: ${(1 - R(b)) * 100}%`), K(o, R(v)), K(s, e), q(s, "title", n), gi(s, `background: linear-gradient(to right, transparent, ${r ?? ""}), repeating-conic-gradient(rgb(255 255 255 / 35%) 0 25%, rgb(0 0 0 / 35%) 0 50%) 0 0 / 10px 10px`), gi(f, `background: ${R(S) ?? ""}`), K(p, R(S)), H(re, `${c ?? ""} `), q(ae, "title", l);
		}, [
			() => Math.round(R(x) * 100),
			() => J("cp.alpha"),
			() => ne(),
			() => J("cp.saved"),
			() => J("cp.saveTitle")
		]), z("click", t, (e) => e.preventDefault()), z("pointerdown", i, le), z("input", o, (e) => {
			N(v, Number(e.target.value), !0), ie();
		}), z("input", s, (e) => {
			N(x, Number(e.target.value) / 100), ie();
		}), z("change", p, ue), z("click", ae, ge), V(e, t);
	};
	U(Ce, (e) => {
		R(g) && e(we);
	}), O(ve), ki(ve, (e) => N(m, e), () => R(m)), L((e, t, n) => {
		be = mi(ye, 1, "cp-swatch svelte-zxiloo", null, be, e), gi(ye, `background: ${t ?? ""}`), q(ye, "title", n), q(ye, "aria-label", i());
	}, [
		() => ({
			linked: l(),
			"cp-empty": a() && !n()
		}),
		() => n() ? c() : "transparent",
		() => l() ? J("cp.linkedTitle", {
			label: i(),
			token: l()
		}) : i()
	]), z("click", ye, () => R(g) ? se() : oe()), V(e, ve), Ye();
}
Dr([
	"click",
	"pointerdown",
	"input",
	"change"
]);
//#endregion
//#region ../template/assets/engine/0.6.11/imageTools.js
var la = 1600, ua = .82, da = .6, fa = 15e6;
async function pa(e, t = la) {
	if (ha(e)) return ga(await e.text());
	let n = await createImageBitmap(e), r = Math.min(1, t / Math.max(n.width, n.height)), i = Math.round(n.width * r), a = Math.round(n.height * r), o = document.createElement("canvas");
	o.width = i, o.height = a, o.getContext("2d").drawImage(n, 0, 0, i, a), n.close();
	let s = (e) => new Promise((t) => o.toBlob(t, "image/webp", e)), c = await s(ua);
	return c.size > 4e5 && (c = await s(da)), {
		dataUrl: await new Promise((e) => {
			let t = new FileReader();
			t.onload = () => e(t.result), t.readAsDataURL(c);
		}),
		bytes: c.size,
		width: i,
		height: a
	};
}
var ma = "image/svg+xml";
function ha(e) {
	return e.type === ma || /\.svg$/i.test(e.name || "");
}
function ga(e) {
	let t = String(e ?? "");
	if (!/<svg[\s>]/i.test(t)) throw Error("Ugyldig SVG");
	if (/<\s*script[\s>]/i.test(t) || /<\s*foreignObject[\s>]/i.test(t) || /\son[a-z]+\s*=/i.test(t) || /javascript:/i.test(t)) throw Error("SVG-en inneholder skript eller hendelser og kan ikke brukes");
	let n = new Blob([t]).size, r = `data:${ma};base64,${btoa(unescape(encodeURIComponent(t)))}`, i = t.match(/<svg\b[^>]*>/i)?.[0] ?? "", a = i.match(/viewBox\s*=\s*["']\s*([-\d.]+(?:[\s,]+[-\d.]+){3})\s*["']/i)?.[1]?.split(/[\s,]+/).map(Number);
	return {
		dataUrl: r,
		bytes: n,
		width: a?.length === 4 ? a[2] : Number.parseFloat(i.match(/\bwidth\s*=\s*["']?([\d.]+)/i)?.[1]) || 0,
		height: a?.length === 4 ? a[3] : Number.parseFloat(i.match(/\bheight\s*=\s*["']?([\d.]+)/i)?.[1]) || 0
	};
}
function _a(e, t, n = .04) {
	let r = String(e ?? "");
	if (!t || !(t.width > 0) || !(t.height > 0)) return r;
	let i = r.match(/<svg\b[^>]*>/i)?.[0];
	if (!i) return r;
	let a = (e) => Math.round(e * 1e3) / 1e3, o = Math.max(t.width, t.height) * Math.max(0, n), s = a(t.x - o), c = a(t.y - o), l = a(t.width + 2 * o), u = a(t.height + 2 * o), d = i.replace(/\sviewBox\s*=\s*["'][^"']*["']/i, "").replace(/\swidth\s*=\s*["'][^"']*["']/i, "").replace(/\sheight\s*=\s*["'][^"']*["']/i, "").replace(/<svg\b/i, `<svg viewBox="${s} ${c} ${l} ${u}" width="${l}" height="${u}"`);
	return r.replace(i, d);
}
function va(e) {
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
function ya(e) {
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
function ba(e, t = "bilde") {
	return e.replace(/\.[^.]+$/, "").toLowerCase().replaceAll("æ", "ae").replaceAll("ø", "o").replaceAll("å", "a").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) || t;
}
function xa(e) {
	let t = 5381;
	for (let n = 0; n < e.length; n++) t = (t << 5) + t + e.charCodeAt(n) >>> 0;
	return t.toString(16).padStart(8, "0");
}
//#endregion
//#region ../template/assets/engine/0.6.11/glyphs.js
var Sa = "urd-recent-glyphs", Ca = [
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
function wa(e, t) {
	return [t, ...(Array.isArray(e) ? e : []).filter((e) => e !== t)].slice(0, 16);
}
function Ta() {
	try {
		let e = JSON.parse(localStorage.getItem("urd-recent-glyphs") ?? "[]");
		return Array.isArray(e) ? e : [];
	} catch {
		return [];
	}
}
function Ea(e) {
	let t = wa(Ta(), e);
	try {
		localStorage.setItem(Sa, JSON.stringify(t));
	} catch {}
	return t;
}
//#endregion
//#region ../template/assets/engine/0.6.11/icons.js
var Da = "fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"", Oa = "fill=\"currentColor\" stroke=\"none\"", ka = {
	facebook: {
		label: "Facebook",
		body: "<path d=\"M15.5 4H13a3.5 3.5 0 0 0-3.5 3.5V10H7v3.2h2.5V20h3.2v-6.8h2.5l.55-3.2h-3.05V7.8c0-.5.4-.8.9-.8h1.9z\"/>"
	},
	instagram: {
		label: "Instagram",
		body: "<rect x=\"3.5\" y=\"3.5\" width=\"17\" height=\"17\" rx=\"4.5\"/><circle cx=\"12\" cy=\"12\" r=\"3.8\"/><circle cx=\"16.9\" cy=\"7.1\" r=\"1.1\" fill=\"currentColor\" stroke=\"none\"/>"
	},
	x: {
		label: "X (Twitter)",
		body: "<path d=\"M5 4h3.8l4 5.4L17.4 4h2.4l-5.9 6.9L20.5 20h-3.8l-4.3-5.8L7.4 20H5l6.3-7.4z\"/>",
		fill: !0
	},
	linkedin: {
		label: "LinkedIn",
		body: "<circle cx=\"4.8\" cy=\"4.8\" r=\"1.7\"/><path d=\"M3.3 9.2h3v11h-3z\"/><path d=\"M9.7 20.2v-11h3v1.6a3.9 3.9 0 0 1 3.3-1.8c2.6 0 4.4 1.8 4.4 4.9v6.3h-3.1v-5.7c0-1.6-.7-2.6-2-2.6-1.4 0-2.5 1-2.5 2.7v5.6z\"/>"
	},
	youtube: {
		label: "YouTube",
		body: "<rect x=\"2.8\" y=\"5.7\" width=\"18.4\" height=\"12.6\" rx=\"3.6\"/><path d=\"M10.2 9.3l5 2.7-5 2.7z\" fill=\"currentColor\" stroke=\"none\"/>"
	},
	tiktok: {
		label: "TikTok",
		body: "<path d=\"M13.8 5v9.3a3.9 3.9 0 1 1-3.9-3.9\"/><path d=\"M13.8 5c.5 2.9 2.6 4.8 5.6 5v3.1c-2.1-.1-4-.8-5.6-2\"/>"
	},
	whatsapp: {
		label: "WhatsApp",
		body: "<path d=\"M12 3.5a8.5 8.5 0 0 0-7.3 12.8L3.5 20.5l4.3-1.1A8.5 8.5 0 1 0 12 3.5z\"/><path d=\"M9.2 8.4l1 2-.8 1a7.3 7.3 0 0 0 3.2 3.2l1-.8 2 1c-.3 1.3-1.2 1.9-2.4 1.7-2.9-.5-5.2-2.8-5.7-5.7-.2-1.2.4-2.1 1.7-2.4z\"/>"
	},
	snapchat: {
		label: "Snapchat",
		body: "<path d=\"M12 3.2c-2.9 0-4.9 2.1-4.9 5v2.1c-.8.3-1.7.3-2.5.1.3 1 1.1 1.8 2.2 2-.4 1.4-1.5 2.5-3 2.8 1 1.2 2.6 1.9 4.3 1.8.9 1.2 2.3 1.9 3.9 1.9s3-.7 3.9-1.9c1.7.1 3.3-.6 4.3-1.8-1.5-.3-2.6-1.4-3-2.8 1.1-.2 1.9-1 2.2-2-.8.2-1.7.2-2.5-.1V8.2c0-2.9-2-5-4.9-5z\"/>"
	},
	pinterest: {
		label: "Pinterest",
		body: "<path d=\"M9.2 20.5c.4-1.6 1.4-5.6 1.9-7.6\"/><path d=\"M10.4 14.2c.4.9 1.4 1.5 2.6 1.5 2.6 0 4.4-2.2 4.4-5a5.4 5.4 0 1 0-10.4 2.1\"/>"
	},
	spotify: {
		label: "Spotify",
		body: "<circle cx=\"12\" cy=\"12\" r=\"8.8\"/><path d=\"M7.6 9.6c3-.9 6.6-.6 9.1.9\"/><path d=\"M8 12.5c2.5-.7 5.4-.4 7.5.8\"/><path d=\"M8.5 15.2c2-.5 4.2-.3 5.9.7\"/>"
	},
	discord: {
		label: "Discord",
		body: "<path d=\"M8 3.9c-1.6.3-3.1.9-4.5 1.7-1.5 3.2-2.1 6.6-1.7 10a12.7 12.7 0 0 0 5 2.6l1-1.9a11 11 0 0 0 8.4 0l1 1.9a12.7 12.7 0 0 0 5-2.6c.4-3.4-.2-6.8-1.7-10A14 14 0 0 0 16 3.9l-.6 1.4a15 15 0 0 0-6.8 0z\"/><circle cx=\"9.3\" cy=\"11.5\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"14.7\" cy=\"11.5\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>"
	},
	github: {
		label: "GitHub",
		body: "<path d=\"M12 2.8a9.2 9.2 0 0 0-2.9 17.9c.5.1.6-.2.6-.4v-1.7c-2.6.6-3.1-1.1-3.1-1.1-.4-1.1-1-1.4-1-1.4-.9-.6 0-.6 0-.6.9.1 1.4 1 1.4 1 .8 1.4 2.2 1 2.7.8.1-.6.3-1 .6-1.3-2-.2-4.2-1-4.2-4.5 0-1 .4-1.8 1-2.5-.1-.2-.4-1.2.1-2.4 0 0 .8-.3 2.5.9a8.8 8.8 0 0 1 4.6 0c1.7-1.2 2.5-.9 2.5-.9.5 1.2.2 2.2.1 2.4.6.7 1 1.5 1 2.5 0 3.5-2.2 4.3-4.2 4.5.3.3.6.9.6 1.8v2.6c0 .2.1.5.6.4A9.2 9.2 0 0 0 12 2.8z\"/>",
		fill: !0
	},
	mail: {
		label: "E-post",
		body: "<rect x=\"3\" y=\"5\" width=\"18\" height=\"14\" rx=\"2.5\"/><path d=\"M3.5 7l8.5 6 8.5-6\"/>"
	},
	phone: {
		label: "Telefon",
		body: "<path d=\"M21.2 16.9v2.6a1.8 1.8 0 0 1-2 1.8 18 18 0 0 1-7.8-2.8 17.7 17.7 0 0 1-5.4-5.4A18 18 0 0 1 3.2 5.2a1.8 1.8 0 0 1 1.8-2h2.6a1.8 1.8 0 0 1 1.8 1.5c.1.9.3 1.7.6 2.5a1.8 1.8 0 0 1-.4 1.9l-1.1 1.1a14.4 14.4 0 0 0 5.4 5.4l1.1-1.1a1.8 1.8 0 0 1 1.9-.4c.8.3 1.6.5 2.5.6a1.8 1.8 0 0 1 1.5 1.8z\"/>"
	},
	smartphone: {
		label: "Mobil",
		body: "<rect x=\"7\" y=\"2.8\" width=\"10\" height=\"18.4\" rx=\"2.5\"/><line x1=\"10.8\" y1=\"18.2\" x2=\"13.2\" y2=\"18.2\"/>"
	},
	chat: {
		label: "Snakkeboble",
		body: "<path d=\"M20.8 12a8.5 8.5 0 0 1-12.4 7.5L4 20.6l1.1-4.2A8.5 8.5 0 1 1 20.8 12z\"/>"
	},
	send: {
		label: "Send",
		body: "<path d=\"M21 3.5L10.4 14.1\"/><path d=\"M21 3.5l-6.8 17-3.8-6.4L4 10.3z\"/>"
	},
	globe: {
		label: "Nettside",
		body: "<circle cx=\"12\" cy=\"12\" r=\"8.8\"/><path d=\"M3.2 12h17.6\"/><path d=\"M12 3.2c2.4 2.4 3.6 5.4 3.6 8.8s-1.2 6.4-3.6 8.8c-2.4-2.4-3.6-5.4-3.6-8.8S9.6 5.6 12 3.2z\"/>"
	},
	rss: {
		label: "RSS-feed",
		body: "<path d=\"M4.5 11a8.5 8.5 0 0 1 8.5 8.5\"/><path d=\"M4.5 5.5a14 14 0 0 1 14 14\"/><circle cx=\"5.5\" cy=\"18.5\" r=\"1.3\" fill=\"currentColor\" stroke=\"none\"/>"
	},
	"map-pin": {
		label: "Kartnål",
		body: "<path d=\"M12 21.5s7-6.2 7-11.3A7 7 0 1 0 5 10.2c0 5.1 7 11.3 7 11.3z\"/><circle cx=\"12\" cy=\"10\" r=\"2.6\"/>"
	},
	map: {
		label: "Kart",
		body: "<path d=\"M9 4L3.5 6v14L9 18l6 2 5.5-2V4L15 6z\"/><path d=\"M9 4v14\"/><path d=\"M15 6v14\"/>"
	},
	home: {
		label: "Hjem",
		body: "<path d=\"M4 10.5l8-7 8 7V20a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 20z\"/><path d=\"M9.5 21.5V14h5v7.5\"/>"
	},
	clock: {
		label: "Klokke",
		body: "<circle cx=\"12\" cy=\"12\" r=\"8.8\"/><path d=\"M12 7v5l3.2 2\"/>"
	},
	calendar: {
		label: "Kalender",
		body: "<rect x=\"3.5\" y=\"5\" width=\"17\" height=\"16\" rx=\"2.5\"/><path d=\"M3.5 10h17\"/><path d=\"M8 2.8V7\"/><path d=\"M16 2.8V7\"/>"
	},
	heart: {
		label: "Hjerte",
		body: "<path d=\"M12 20.5S3.5 15.4 3.5 9.5A4.6 4.6 0 0 1 12 7a4.6 4.6 0 0 1 8.5 2.5c0 5.9-8.5 11-8.5 11z\"/>"
	},
	star: {
		label: "Stjerne",
		body: "<path d=\"M12 3.5l2.7 5.4 6 .9-4.3 4.2 1 6-5.4-2.8-5.4 2.8 1-6L3.3 9.8l6-.9z\"/>"
	},
	check: {
		label: "Hake",
		body: "<path d=\"M4.5 12.8L9.5 18 19.5 6.5\"/>"
	},
	cross: {
		label: "Kryss",
		body: "<path d=\"M6 6l12 12\"/><path d=\"M18 6L6 18\"/>"
	},
	plus: {
		label: "Pluss",
		body: "<path d=\"M12 5v14\"/><path d=\"M5 12h14\"/>"
	},
	info: {
		label: "Info",
		body: "<circle cx=\"12\" cy=\"12\" r=\"8.8\"/><path d=\"M12 11v5.5\"/><line x1=\"12\" y1=\"7.8\" x2=\"12\" y2=\"7.8\"/>"
	},
	question: {
		label: "Spørsmål",
		body: "<circle cx=\"12\" cy=\"12\" r=\"8.8\"/><path d=\"M9.4 9.2A2.7 2.7 0 0 1 12 7.4c1.5 0 2.7 1 2.7 2.4 0 1.8-2.7 2-2.7 4\"/><line x1=\"12\" y1=\"16.8\" x2=\"12\" y2=\"16.8\"/>"
	},
	warning: {
		label: "Advarsel",
		body: "<path d=\"M12 4L2.8 19.5h18.4z\"/><path d=\"M12 10v4\"/><line x1=\"12\" y1=\"16.8\" x2=\"12\" y2=\"16.8\"/>"
	},
	zap: {
		label: "Lyn",
		body: "<path d=\"M13 2.8L4.5 13.5H11l-1 7.7 8.5-10.7H12z\"/>"
	},
	sun: {
		label: "Sol",
		body: "<circle cx=\"12\" cy=\"12\" r=\"4\"/><path d=\"M12 2.8v2.4M12 18.8v2.4M2.8 12h2.4M18.8 12h2.4M5.5 5.5l1.7 1.7M16.8 16.8l1.7 1.7M18.5 5.5l-1.7 1.7M7.2 16.8l-1.7 1.7\"/>"
	},
	moon: {
		label: "Måne",
		body: "<path d=\"M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11z\"/>"
	},
	leaf: {
		label: "Blad",
		body: "<path d=\"M5 19C5 9 11 4.5 20 4.5c0 9-4.5 15-13 14.5z\"/><path d=\"M5 19c2-5.5 5.5-9 10-11\"/>"
	},
	music: {
		label: "Musikk",
		body: "<circle cx=\"7\" cy=\"17.5\" r=\"2.8\"/><circle cx=\"17\" cy=\"15.5\" r=\"2.8\"/><path d=\"M9.8 17.5V6.5l10-2v11\"/>"
	},
	camera: {
		label: "Kamera",
		body: "<path d=\"M3.5 8.5A1.5 1.5 0 0 1 5 7h2.5l1.7-2.3h5.6L16.5 7H19a1.5 1.5 0 0 1 1.5 1.5V18a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 18z\"/><circle cx=\"12\" cy=\"13\" r=\"3.4\"/>"
	},
	image: {
		label: "Bilde",
		body: "<rect x=\"3.5\" y=\"4.5\" width=\"17\" height=\"15\" rx=\"2.5\"/><circle cx=\"8.8\" cy=\"9.3\" r=\"1.6\"/><path d=\"M20.5 15.5l-4.7-4.7-9.3 8.7\"/>"
	},
	document: {
		label: "Dokument",
		body: "<path d=\"M13.5 3H6.8A1.8 1.8 0 0 0 5 4.8v14.4A1.8 1.8 0 0 0 6.8 21h10.4a1.8 1.8 0 0 0 1.8-1.8V8.5z\"/><path d=\"M13.5 3v5.5H19\"/><path d=\"M8.5 13h7M8.5 16.5h7\"/>"
	},
	"shopping-bag": {
		label: "Handlepose",
		body: "<path d=\"M5.5 8h13l-1 12a1.8 1.8 0 0 1-1.8 1.5H8.3A1.8 1.8 0 0 1 6.5 20z\"/><path d=\"M8.8 10.5V7a3.2 3.2 0 0 1 6.4 0v3.5\"/>"
	},
	cart: {
		label: "Handlekurv",
		body: "<circle cx=\"9.3\" cy=\"19.3\" r=\"1.5\"/><circle cx=\"17.3\" cy=\"19.3\" r=\"1.5\"/><path d=\"M3 4.5h2.4l2.3 10.6a1.8 1.8 0 0 0 1.8 1.4h7.6a1.8 1.8 0 0 0 1.8-1.4L20.8 8H6.1\"/>"
	},
	gift: {
		label: "Gave",
		body: "<rect x=\"3.5\" y=\"8\" width=\"17\" height=\"4\"/><path d=\"M5 12v8.5h14V12\"/><path d=\"M12 8v12.5\"/><path d=\"M12 8s-4.5.3-5.5-1.8C5.8 4.7 7.8 3.3 9.3 4.4 10.8 5.5 12 8 12 8z\"/><path d=\"M12 8s4.5.3 5.5-1.8c.7-1.5-1.3-2.9-2.8-1.8C13.2 5.5 12 8 12 8z\"/>"
	},
	wrench: {
		label: "Verktøy",
		body: "<path d=\"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z\"/>"
	},
	lock: {
		label: "Lås",
		body: "<rect x=\"5\" y=\"10.5\" width=\"14\" height=\"10\" rx=\"2\"/><path d=\"M8.5 10.5V7.5a3.5 3.5 0 0 1 7 0v3\"/>"
	},
	search: {
		label: "Søk",
		body: "<circle cx=\"10.8\" cy=\"10.8\" r=\"6.8\"/><path d=\"M15.8 15.8L21 21\"/>"
	},
	user: {
		label: "Person",
		body: "<circle cx=\"12\" cy=\"8\" r=\"4\"/><path d=\"M4.5 20.5a7.5 7.5 0 0 1 15 0\"/>"
	},
	users: {
		label: "Personer",
		body: "<circle cx=\"9\" cy=\"8.5\" r=\"3.5\"/><path d=\"M2.8 20a6.2 6.2 0 0 1 12.4 0\"/><path d=\"M16 5.4a3.5 3.5 0 0 1 0 6.2\"/><path d=\"M17.8 14.6a6.2 6.2 0 0 1 3.4 5.4\"/>"
	},
	"thumbs-up": {
		label: "Tommel opp",
		body: "<path d=\"M3.5 10.5H7v10H3.5z\"/><path d=\"M7 19.5V11l4.2-5.6a1.7 1.7 0 0 1 3 1.4l-.9 3.7h4.8a2 2 0 0 1 2 2.4l-1.2 5.5a2 2 0 0 1-2 1.6H8.6\"/>"
	},
	"arrow-right": {
		label: "Pil høyre",
		body: "<path d=\"M4 12h16\"/><path d=\"M13.5 5.5L20 12l-6.5 6.5\"/>"
	},
	"arrow-left": {
		label: "Pil venstre",
		body: "<path d=\"M20 12H4\"/><path d=\"M10.5 5.5L4 12l6.5 6.5\"/>"
	},
	"arrow-up": {
		label: "Pil opp",
		body: "<path d=\"M12 20V4\"/><path d=\"M5.5 10.5L12 4l6.5 6.5\"/>"
	},
	"arrow-down": {
		label: "Pil ned",
		body: "<path d=\"M12 4v16\"/><path d=\"M5.5 13.5L12 20l6.5-6.5\"/>"
	},
	"external-link": {
		label: "Ekstern lenke",
		body: "<path d=\"M9.5 5H5.8A1.8 1.8 0 0 0 4 6.8v11.4A1.8 1.8 0 0 0 5.8 20h11.4a1.8 1.8 0 0 0 1.8-1.8v-3.7\"/><path d=\"M13.5 4H20v6.5\"/><path d=\"M20 4l-9 9\"/>"
	},
	download: {
		label: "Nedlasting",
		body: "<path d=\"M12 3.5v11\"/><path d=\"M6.5 9l5.5 5.5L17.5 9\"/><path d=\"M4 20.5h16\"/>"
	},
	share: {
		label: "Deling",
		body: "<circle cx=\"6\" cy=\"12\" r=\"2.6\"/><circle cx=\"17.5\" cy=\"5.5\" r=\"2.6\"/><circle cx=\"17.5\" cy=\"18.5\" r=\"2.6\"/><path d=\"M8.4 10.8l6.8-4M8.4 13.2l6.8 4\"/>"
	}
}, Aa = [
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
function ja(e) {
	let t = typeof e == "string" ? ka[e] : null;
	return t ? `<svg viewBox="0 0 24 24" width="100%" height="100%" ${t.fill ? Oa : Da} aria-hidden="true" focusable="false">${t.body}</svg>` : null;
}
//#endregion
//#region src/lib/GlyphPicker.svelte
var Ma = /* @__PURE__ */ B("<img class=\"gp-own svelte-15ln1c3\"/>"), Na = /* @__PURE__ */ B("<span class=\"gp-svg svelte-15ln1c3\"></span>"), Pa = /* @__PURE__ */ B("<button type=\"button\" class=\"gp-cell svelte-15ln1c3\"> </button>"), Fa = /* @__PURE__ */ B("<div class=\"gp-group svelte-15ln1c3\"> </div> <div class=\"gp-grid svelte-15ln1c3\"></div>", 1), Ia = /* @__PURE__ */ B("<button type=\"button\"><span class=\"gp-svg svelte-15ln1c3\"></span></button>"), La = /* @__PURE__ */ B("<button type=\"button\"> </button>"), Ra = /* @__PURE__ */ B("<div class=\"gp-group svelte-15ln1c3\"> </div> <button type=\"button\" class=\"ghost gp-upload svelte-15ln1c3\"> </button> <input type=\"file\" accept=\"image/*\" hidden=\"\"/> <p class=\"gp-hint svelte-15ln1c3\"> </p>", 1), za = /* @__PURE__ */ B("<div class=\"gp-pop svelte-15ln1c3\"><!> <!> <!> <!></div>"), Ba = /* @__PURE__ */ B("<span class=\"gp svelte-15ln1c3\"><button type=\"button\" class=\"gp-swatch svelte-15ln1c3\"><!></button> <!></span>");
function Va(e, t) {
	Je(t, !0);
	let n = Ai(t, "value", 3, "★"), r = Ai(t, "icon", 3, null), i = Ai(t, "image", 3, null), a = Ai(t, "label", 19, () => J("gp.pickGlyph")), o = /* @__PURE__ */ M(on([])), s = /* @__PURE__ */ M(null), c = /* @__PURE__ */ M(null), l = /* @__PURE__ */ M(!1), u = /* @__PURE__ */ M(on({
		top: 0,
		left: 0
	}));
	function d() {
		N(o, Ta(), !0);
		let e = R(s).getBoundingClientRect(), t = Math.max(8, Math.min(e.right - 292, window.innerWidth - 292 - 8)), n = e.bottom + 380 + 8 > window.innerHeight ? Math.max(8, e.top - 380 - 8) : e.bottom + 6;
		N(u, {
			top: n,
			left: t
		}, !0), N(l, !0);
	}
	function f(e) {
		Ea(e), t.onpick?.(e), N(l, !1);
	}
	function p(e) {
		t.onicon?.(e), N(l, !1);
	}
	async function m(e) {
		let n = e.target.files?.[0];
		if (e.target.value = "", !n) return;
		let r = await pa(n, 256);
		t.onimage?.(r.dataUrl), N(l, !1);
	}
	wn(() => {
		if (!R(l)) return;
		let e = (e) => {
			R(s) && !R(s).contains(e.target) && N(l, !1);
		}, t = (e) => {
			e.key === "Escape" && N(l, !1);
		}, n = (e) => {
			R(s) && e.target instanceof Node && !R(s).contains(e.target) && N(l, !1);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t, !0), document.addEventListener("scroll", n, !0), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t, !0), document.removeEventListener("scroll", n, !0);
		};
	});
	var g = Ba(), _ = P(g), v = P(_), y = (e) => {
		var t = Ma();
		L((e) => {
			q(t, "src", i()), q(t, "alt", e);
		}, [() => J("gp.ownIcon")]), V(e, t);
	}, b = (e) => {
		var t = Na();
		W(t, () => ja(r()), !0), O(t), V(e, t);
	}, x = (e) => {
		var t = Fr();
		L(() => H(t, n() || "★")), V(e, t);
	};
	U(v, (e) => {
		i() ? e(y) : r() && ka[r()] ? e(b, 1) : e(x, -1);
	}), O(_);
	var S = I(_, 2), C = (e) => {
		var i = za(), a = P(i), s = (e) => {
			var t = Fa(), n = F(t), r = P(n, !0);
			O(n);
			var i = I(n, 2);
			qr(i, 20, () => R(o), (e) => e, (e, t) => {
				var n = Pa(), r = P(n, !0);
				O(n), L(() => H(r, t)), z("click", n, () => f(t)), V(e, n);
			}), O(i), L((e) => H(r, e), [() => J("common.recent")]), V(e, t);
		};
		U(a, (e) => {
			R(o).length && e(s);
		});
		var l = I(a, 2), d = (e) => {
			var t = Ir();
			qr(F(t), 17, () => Aa, ([e, t]) => e, (e, t) => {
				var n = /* @__PURE__ */ A(() => h(R(t), 2));
				let i = () => R(n)[0], a = () => R(n)[1];
				var o = Fa(), s = F(o), c = P(s, !0);
				O(s);
				var l = I(s, 2);
				qr(l, 20, a, (e) => e, (e, t) => {
					var n = Ia();
					let i;
					var a = P(n);
					W(a, () => ja(t), !0), O(a), O(n), L(() => {
						i = mi(n, 1, "gp-cell gp-cell-icon svelte-15ln1c3", null, i, { active: t === r() }), q(n, "title", ka[t].label);
					}), z("click", n, () => p(t)), V(e, n);
				}), O(l), L((e) => H(c, e), [() => J(i())]), V(e, o);
			}), V(e, t);
		};
		U(l, (e) => {
			t.onicon && e(d);
		});
		var g = I(l, 2);
		qr(g, 17, () => Ca, ([e, t]) => e, (e, t) => {
			var r = /* @__PURE__ */ A(() => h(R(t), 2));
			let i = () => R(r)[0], a = () => R(r)[1];
			var o = Fa(), s = F(o), c = P(s, !0);
			O(s);
			var l = I(s, 2);
			qr(l, 20, () => a().split(" "), (e) => e, (e, t) => {
				var r = La();
				let i;
				var a = P(r, !0);
				O(r), L(() => {
					i = mi(r, 1, "gp-cell svelte-15ln1c3", null, i, { active: t === n() }), H(a, t);
				}), z("click", r, () => f(t)), V(e, r);
			}), O(l), L((e) => H(c, e), [() => J(i())]), V(e, o);
		});
		var _ = I(g, 2), v = (e) => {
			var t = Ra(), n = F(t), r = P(n, !0);
			O(n);
			var i = I(n, 2), a = P(i, !0);
			O(i);
			var o = I(i, 2);
			ki(o, (e) => N(c, e), () => R(c));
			var s = I(o, 2), l = P(s, !0);
			O(s), L((e, t, n) => {
				H(r, e), H(a, t), H(l, n);
			}, [
				() => J("gp.ownIcon"),
				() => J("gp.upload"),
				() => J("gp.uploadHint")
			]), z("click", i, () => R(c).click()), z("change", o, m), V(e, t);
		};
		U(_, (e) => {
			t.onimage && e(v);
		}), O(i), L(() => gi(i, `top: ${R(u).top ?? ""}px; left: ${R(u).left ?? ""}px`)), V(e, i);
	};
	U(S, (e) => {
		R(l) && e(C);
	}), O(g), ki(g, (e) => N(s, e), () => R(s)), L(() => {
		q(_, "title", a()), q(_, "aria-label", a());
	}), z("click", _, () => R(l) ? N(l, !1) : d()), V(e, g), Ye();
}
Dr(["click", "change"]);
//#endregion
//#region src/lib/previewBridge.js
function Ha(e, t = {}) {
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
		sendMaler(e) {
			r({
				type: "urd-maler",
				maler: e
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
function Ua(e, t) {
	return !(e > 0) || !(t > 0) ? 1 : e / t;
}
function Wa(e, t, n, r = 0, i = 0) {
	if (n === "full") return 1;
	let a = i > 0 ? Ua(r, i) : Infinity;
	return Math.max(.1, Math.min(1, Ua(e, t), a));
}
var Ga = 1920, Ka = [
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
], qa = [
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
], Ja = [
	1920,
	1536,
	1366
];
function Ya(e) {
	let t = Number(e);
	if (!Number.isFinite(t)) return 1440;
	let n = Math.round(t / 20) * 20;
	return Math.min(Ga, Math.max(960, n));
}
function Xa(e) {
	let t = Number(e);
	if (!Number.isFinite(t)) return 6;
	let n = Math.round(t / 1) * 1;
	return Math.min(12, Math.max(0, n));
}
function Za(e, t) {
	if (e === "full") return 0;
	let n = Math.min(49, Math.max(0, Number(t) || 0));
	return Math.ceil(Number(e) / (1 - 2 * n / 100));
}
function Qa(e, t, n) {
	let r = Math.max(0, Number(t) || 0) / 100 * n, i = Math.max(0, n - 2 * r), a = e !== "full" && Number(e) < i, o = a ? Number(e) : i;
	return {
		width: o,
		margin: Math.round((n - o) / 2),
		pct: n > 0 ? o / n * 100 : 0,
		bound: a
	};
}
function $a(e) {
	return qa.find((t) => t.width === e)?.id ?? null;
}
//#endregion
//#region src/lib/Dropdown.svelte
var eo = /* @__PURE__ */ B("<button type=\"button\"> </button>"), to = /* @__PURE__ */ B("<div class=\"dd-pop svelte-vtocc6\"></div>"), no = /* @__PURE__ */ B("<span class=\"dd svelte-vtocc6\"><button type=\"button\" class=\"dd-btn svelte-vtocc6\"><span class=\"dd-value svelte-vtocc6\"> </span> <span class=\"dd-caret svelte-vtocc6\"> </span></button> <!></span>");
function Y(e, t) {
	Je(t, !0);
	let n = Ai(t, "value", 3, null), r = Ai(t, "options", 19, () => []), i = Ai(t, "title", 3, null), a = Ai(t, "disabled", 3, !1), o = /* @__PURE__ */ M(!1), s = /* @__PURE__ */ M(null), c = /* @__PURE__ */ M(on({
		top: 0,
		left: 0,
		width: 160
	})), l = () => r().find(([e]) => `${e ?? ""}` == `${n() ?? ""}`)?.[1] ?? "";
	function u() {
		let e = R(s).getBoundingClientRect(), t = Math.min(320, r().length * 32 + 12), n = Math.max(e.width, 160), i = e.bottom + t + 8 <= window.innerHeight;
		N(c, {
			top: i ? e.bottom + 4 : Math.max(8, e.top - t - 4),
			left: Math.max(8, Math.min(e.left, window.innerWidth - n - 8)),
			width: n
		}, !0);
	}
	function d() {
		if (!a()) {
			if (R(o)) {
				N(o, !1);
				return;
			}
			u(), N(o, !0);
		}
	}
	function f(e) {
		N(o, !1), t.onchange?.(e);
	}
	wn(() => {
		if (!R(o)) return;
		let e = (e) => {
			R(s) && !R(s).contains(e.target) && N(o, !1);
		}, t = (e) => {
			e.key === "Escape" && N(o, !1);
		}, n = (e) => {
			R(s) && e.target instanceof Node && !R(s).contains(e.target) && u();
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t, !0), document.addEventListener("scroll", n, !0), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t, !0), document.removeEventListener("scroll", n, !0);
		};
	});
	var p = no(), m = P(p), g = P(m), _ = P(g, !0);
	O(g);
	var v = I(g, 2), y = P(v, !0);
	O(v), O(m);
	var b = I(m, 2), x = (e) => {
		var t = to();
		qr(t, 21, r, ([e, t]) => `${e ?? ""}`, (e, t) => {
			var r = /* @__PURE__ */ A(() => h(R(t), 2));
			let i = () => R(r)[0], a = () => R(r)[1];
			var o = eo();
			let s;
			var c = P(o, !0);
			O(o), L(() => {
				s = mi(o, 1, "dd-opt svelte-vtocc6", null, s, { valgt: `${i() ?? ""}` == `${n() ?? ""}` }), H(c, a());
			}), z("click", o, () => f(i())), V(e, o);
		}), O(t), L(() => gi(t, `top: ${R(c).top ?? ""}px; left: ${R(c).left ?? ""}px; min-width: ${R(c).width ?? ""}px`)), V(e, t);
	};
	U(b, (e) => {
		R(o) && e(x);
	}), O(p), ki(p, (e) => N(s, e), () => R(s)), L((e) => {
		q(m, "title", i()), m.disabled = a(), H(_, e), H(y, R(o) ? "▴" : "▾");
	}, [() => l()]), z("click", m, d), V(e, p), Ye();
}
Dr(["click"]);
//#endregion
//#region src/lib/IconEditor.svelte
var ro = /* @__PURE__ */ B("<div class=\"ie-overlay svelte-e7sog7\" role=\"dialog\" aria-modal=\"true\"><div class=\"ie-card svelte-e7sog7\"><h2 class=\"svelte-e7sog7\"> </h2> <div class=\"ie-stage svelte-e7sog7\"><canvas class=\"ie-canvas svelte-e7sog7\"></canvas> <p class=\"ie-hint svelte-e7sog7\"> </p></div> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"1\" max=\"3\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0.3\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0.3\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <span class=\"ie-tools svelte-e7sog7\"><button type=\"button\" class=\"ghost svelte-e7sog7\"> </button> <button type=\"button\" class=\"ghost svelte-e7sog7\"> </button></span> <span class=\"ie-actions svelte-e7sog7\"><button type=\"button\" class=\"ghost svelte-e7sog7\"> </button> <button type=\"button\" class=\"primary svelte-e7sog7\"> </button></span></div></div>");
function io(e, t) {
	Je(t, !0);
	let n = Ai(t, "image", 3, ""), r = /* @__PURE__ */ M(null), i = /* @__PURE__ */ M(null), a = /* @__PURE__ */ M(1), o = /* @__PURE__ */ M(.5), s = /* @__PURE__ */ M(.5), c = /* @__PURE__ */ M(1), l = /* @__PURE__ */ M(1), u = /* @__PURE__ */ M(1);
	wn(() => {
		if (!n()) return;
		let e = new Image();
		e.onload = () => {
			N(i, e, !0);
		}, e.src = n();
	});
	function d(e, t) {
		if (e.clearRect(0, 0, t, t), !R(i)) return;
		e.filter = `brightness(${R(c)}) contrast(${R(l)}) saturate(${R(u)})`;
		let n = Math.max(t / R(i).width, t / R(i).height) * R(a), r = R(i).width * n, d = R(i).height * n, f = t / 2 - R(o) * r, p = t / 2 - R(s) * d;
		f = Math.min(0, Math.max(t - r, f)), p = Math.min(0, Math.max(t - d, p)), e.drawImage(R(i), f, p, r, d), e.filter = "none";
	}
	wn(() => {
		R(i), R(a), R(o), R(s), R(c), R(l), R(u), R(r) && d(R(r).getContext("2d"), 220);
	});
	function f(e) {
		if (!R(i)) return;
		e.preventDefault();
		let t = e.clientX, n = e.clientY, r = Math.max(220 / R(i).width, 220 / R(i).height) * R(a), c = R(i).width * r, l = R(i).height * r, u = (e) => {
			N(o, Math.min(1, Math.max(0, R(o) - (e.clientX - t) / c)), !0), N(s, Math.min(1, Math.max(0, R(s) - (e.clientY - n) / l)), !0), t = e.clientX, n = e.clientY;
		}, d = () => {
			window.removeEventListener("pointermove", u), window.removeEventListener("pointerup", d);
		};
		window.addEventListener("pointermove", u), window.addEventListener("pointerup", d);
	}
	function p() {
		N(a, 1), N(o, .5), N(s, .5), N(c, 1), N(l, 1), N(u, 1);
	}
	function m() {
		let e = document.createElement("canvas");
		e.width = 128, e.height = 128, d(e.getContext("2d"), 128), t.onapply?.(e.toDataURL("image/webp", .92));
	}
	var h = ro(), g = P(h), _ = P(g), v = P(_, !0);
	O(_);
	var y = I(_, 2), b = P(y);
	q(b, "width", 220), q(b, "height", 220), ki(b, (e) => N(r, e), () => R(r));
	var x = I(b, 2), S = P(x, !0);
	O(x), O(y);
	var C = I(y, 2), w = P(C), ee = I(w), te = P(ee);
	O(ee), O(C);
	var ne = I(C, 2);
	G(ne);
	var re = I(ne, 2), ie = P(re), ae = I(ie), oe = P(ae);
	O(ae), O(re);
	var se = I(re, 2);
	G(se);
	var ce = I(se, 2), le = P(ce), ue = I(le), de = P(ue);
	O(ue), O(ce);
	var fe = I(ce, 2);
	G(fe);
	var pe = I(fe, 2), me = P(pe), he = I(me), ge = P(he);
	O(he), O(pe);
	var _e = I(pe, 2);
	G(_e);
	var ve = I(_e, 2), ye = P(ve), be = P(ye, !0);
	O(ye);
	var xe = I(ye, 2), Se = P(xe, !0);
	O(xe), O(ve);
	var Ce = I(ve, 2), we = P(Ce), Te = P(we, !0);
	O(we);
	var Ee = I(we, 2), De = P(Ee, !0);
	O(Ee), O(Ce), O(g), O(h), L((e, t, n, r, i, a, o, s, c, l, u, d, f, p, m) => {
		H(v, e), q(b, "title", t), H(S, n), H(w, `${r ?? ""} `), H(te, `${i ?? ""}x`), H(ie, `${a ?? ""} `), H(oe, `${o ?? ""}%`), H(le, `${s ?? ""} `), H(de, `${c ?? ""}%`), H(me, `${l ?? ""} `), H(ge, `${u ?? ""}%`), H(be, d), H(Se, f), H(Te, p), H(De, m);
	}, [
		() => J("ie.title"),
		() => J("ie.dragTip"),
		() => J("ie.hint"),
		() => J("lbl.zoom"),
		() => R(a).toFixed(2),
		() => J("lbl.brightness"),
		() => Math.round(R(c) * 100),
		() => J("lbl.contrast"),
		() => Math.round(R(l) * 100),
		() => J("lbl.saturate"),
		() => Math.round(R(u) * 100),
		() => J("ie.grayscale"),
		() => J("common.reset"),
		() => J("confirm.cancel"),
		() => J("common.apply")
	]), z("pointerdown", b, f), Ti(ne, () => R(a), (e) => N(a, e)), Ti(se, () => R(c), (e) => N(c, e)), Ti(fe, () => R(l), (e) => N(l, e)), Ti(_e, () => R(u), (e) => N(u, e)), z("click", ye, () => N(u, 0)), z("click", xe, p), z("click", we, () => t.oncancel?.()), z("click", Ee, m), V(e, h), Ye();
}
Dr(["pointerdown", "click"]);
var ao = 24, oo = {
	"oppsett-byttet": "layout-changed",
	"blokk-endret": "block-edited",
	"desktop-endret-etter-mobil": "desktop-changed-after-mobile",
	seksjonshøyde: "section-height",
	"blokk-flyttet": "block-moved",
	"blokk-slettet": "block-deleted",
	"blokk-lagt-til": "block-added"
};
function so(e, t) {
	if (!e || !("y" in e || "h" in e)) return e ?? null;
	if (t && e.x === t.x && e.y === t.y && e.w === t.w && e.h === t.h) return null;
	let n = {
		x: e.x,
		w: e.w
	};
	return Number.isFinite(e.y) && (n.row = Math.max(1, Math.round((e.y - ao) / 8) + 1), n.rows = Number.isFinite(e.h) ? Math.max(1, Math.ceil(e.h / 8)) : 1), Number.isFinite(e.z) && e.z !== 1 && (n.z = e.z), e.rot && (n.rot = e.rot), n;
}
var co = { 1: (e) => {
	for (let t of e.sections ?? []) {
		let e = t.responsive?.mobile;
		for (let e of t.blocks ?? []) e.decor && (e.hideMobile = !0), e.frames?.mobile && (e.frames.mobile = so(e.frames.mobile, e.frames.desktop));
		e?.mode === "manual" && (e.mode = "auto");
		let n = e?.attention?.reason;
		n && oo[n] && (e.attention.reason = oo[n]);
	}
	return e;
} }, lo = {
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
function uo(e) {
	let t = structuredClone(e), n = t.schemaVersion ?? 1;
	for (; n < 3;) {
		let r = lo[n];
		if (typeof r != "function") return e;
		t = r(t) ?? t, n++, t.schemaVersion = n;
	}
	return t;
}
function fo(e, t) {
	let n = structuredClone(e), r = n.schemaVersion ?? 1;
	for (; r < 2;) {
		let i = co[r];
		if (typeof i != "function") return e;
		n = i(n, t) ?? n, r++, n.schemaVersion = r;
	}
	return n;
}
//#endregion
//#region ../template/assets/engine/0.6.11/plugins.js
function po(e) {
	let t = /^(\d+)\.(\d+)\.(\d+)$/.exec(String(e).trim());
	return t ? [
		Number(t[1]),
		Number(t[2]),
		Number(t[3])
	] : null;
}
var mo = (e, t) => e[0] - t[0] || e[1] - t[1] || e[2] - t[2];
function ho(e, t) {
	let n = po(e);
	if (!n || typeof t != "string" || !t.trim()) return !1;
	for (let e of t.trim().split(/\s+/)) {
		let t = /^(>=|<=|>|<|=|\^|~)?(\d+\.\d+\.\d+)$/.exec(e);
		if (!t) return !1;
		let r = t[1] ?? "=", i = po(t[2]), a = mo(n, i);
		if (!(r === ">=" ? a >= 0 : r === ">" ? a > 0 : r === "<=" ? a <= 0 : r === "<" ? a < 0 : r === "^" ? i[0] === 0 ? n[0] === 0 && n[1] === i[1] && a >= 0 : n[0] === i[0] && a >= 0 : r === "~" ? n[0] === i[0] && n[1] === i[1] && a >= 0 : a === 0)) return !1;
	}
	return !0;
}
var go = /^[a-z0-9][a-z0-9-]*$/;
function _o(e) {
	let t = [];
	if (!e || typeof e != "object") return ["manifestet er ikke et objekt"];
	go.test(e.id ?? "") || t.push("id mangler eller er ugyldig"), (typeof e.name != "string" || !e.name) && t.push("name mangler"), po(e.version ?? "") || t.push("version er ikke semver"), (typeof e.requiresEngine != "string" || !e.requiresEngine) && t.push("requiresEngine mangler");
	let n = Array.isArray(e.languages) && e.languages.length > 0;
	return (e.entry !== void 0 || !n) && (typeof e.entry != "string" || !e.entry.endsWith(".js")) && t.push("entry mangler eller er ikke en .js-fil"), (e.provides !== void 0 || !n) && (!e.provides || typeof e.provides != "object") && t.push("provides mangler"), e.languages !== void 0 && t.push(...Li(e.languages)), e.locales !== void 0 && typeof e.locales != "boolean" && t.push("locales må være boolsk"), e.names !== void 0 && (typeof e.names != "object" || e.names === null || Array.isArray(e.names) || Object.values(e.names).some((e) => typeof e != "string" || !e)) && t.push("names må være et objekt med språkkode til navn"), t;
}
//#endregion
//#region ../template/assets/engine/0.6.11/sections/presets.js
function vo(e) {
	return typeof crypto < "u" && crypto.randomUUID ? `${e}-${crypto.randomUUID().slice(0, 8)}` : `${e}-${[...crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(4))].map((e) => e.toString(16).padStart(2, "0")).join("")}`;
}
var yo = () => ({ mobile: {
	mode: "auto",
	attention: null
} }), X = (e, t, n, r, i = 1) => ({
	desktop: {
		x: e,
		y: t,
		w: n,
		h: r,
		z: i,
		rot: 0
	},
	mobile: null
}), Z = (e, t, n = {}) => ({
	id: vo("blk"),
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
}), bo = (e, t = {}) => ({
	id: vo("blk"),
	type: "image",
	version: 1,
	props: {
		src: "",
		alt: J("seed.imageAlt"),
		fit: "cover",
		radius: "md",
		href: null,
		...t
	},
	animation: null,
	frames: e
}), xo = (e, t, n = {}) => ({
	id: vo("blk"),
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
}), So = (e, t, n = 40) => ({
	id: vo("blk"),
	type: "icon",
	version: 1,
	props: {
		glyph: t,
		color: "accent",
		size: n
	},
	animation: null,
	frames: e
}), Co = () => ({
	type: "hover-lift",
	version: 1,
	props: {}
}), wo = (e, t, n = {}) => ({
	id: vo("blk"),
	type: "samling",
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
}), To = (e, t = {}) => ({
	id: vo("blk"),
	type: "produkt",
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
}), Eo = (e, t = {}) => ({
	id: vo("blk"),
	type: "handlekurv",
	version: 1,
	props: {
		variant: "button",
		href: "",
		currency: "kr",
		...t
	},
	animation: null,
	frames: e
}), Do = (e, t = {}) => ({
	id: vo("blk"),
	type: "kasse",
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
}), Oo = (e, t = {}) => ({
	id: vo("blk"),
	type: "galleri",
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
}), ko = (e, t) => ({
	id: vo("blk"),
	type: "faq",
	version: 1,
	props: {
		items: t,
		multi: !1
	},
	animation: null,
	frames: e
}), Ao = (e, t = {}) => ({
	id: vo("blk"),
	type: "sitat",
	version: 1,
	props: {
		text: "",
		attribution: "",
		role: "",
		variant: "stor",
		image: "",
		accent: null,
		...t
	},
	animation: null,
	frames: e
}), jo = (e, t) => ({
	id: vo("blk"),
	type: "tidslinje",
	version: 1,
	props: {
		items: t,
		variant: "venstre",
		marker: "fylt",
		accent: null
	},
	animation: null,
	frames: e
}), Mo = (e, t = {}) => ({
	id: vo("blk"),
	type: "statistikk",
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
}), No = (...e) => ({
	version: 1,
	layers: e
}), Po = (e) => ({
	type: "color",
	version: 1,
	props: { value: e }
}), Fo = (e, t, n, r = .5) => ({
	type: "glow",
	version: 1,
	props: {
		x: e,
		y: t,
		color: "accent",
		radius: r,
		opacity: n
	}
}), Io = (e) => Math.max(0, ...e.blocks.map((e) => e.frames.desktop.y + e.frames.desktop.h)), Lo = (e, t, n, r, i, a) => ({
	x: n + e % t * r,
	y: i + Math.floor(e / t) * a
}), Ro = (e, t, n, r, i, a, o, s, c = 0) => {
	let l = (t) => e.blocks.some((e) => {
		let n = e.frames.desktop;
		return n.x < t.x + t.w - .01 && t.x < n.x + n.w - .01 && n.y < t.y + t.h - .01 && t.y < n.y + n.h - .01;
	});
	for (let e = 0; e < 60; e++) {
		let u = Lo(e, t, n, r, i, a);
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
		y: Io(e) + 16,
		n: 0
	};
}, zo = (e, t, n) => e + t * .1 + n * .01, Bo = (e, t, n, r, i = null) => ({
	id: vo("sec"),
	version: 1,
	preset: e,
	size: { minHeight: t },
	grid: i,
	background: n,
	blocks: r,
	responsive: yo()
});
function Vo(e) {
	e.sections.define("tom", {
		label: "Tom seksjon",
		labelKey: "preset.tom.label",
		group: "Grunnleggende",
		groupKey: "presetGroup.basic",
		hint: "Blankt lerret å bygge fritt på",
		hintKey: "preset.tom.hint",
		create: () => Bo("tom", "40vh", No(Po("bg")), [])
	}), e.sections.define("hero", {
		label: "Hero",
		labelKey: "preset.hero.label",
		group: "Grunnleggende",
		groupKey: "presetGroup.basic",
		hint: "Stor åpning med gradient og glød, venstrestilt",
		hintKey: "preset.hero.hint",
		create: () => Bo("hero", "70vh", {
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
				Fo(.7, .2, .35),
				{
					type: "grain",
					version: 1,
					props: { opacity: .06 }
				}
			]
		}, [
			Z(X(8.33, 40, 50, 38), J("seed.hero.title")),
			Z(X(8.33, 84, 41.67, 26), J("seed.hero.intro")),
			xo(X(8.33, 118, 20, 32), J("seed.readMore"))
		])
	}), e.sections.define("hero-sentrert", {
		label: "Hero, sentrert",
		labelKey: "preset.hero-sentrert.label",
		group: "Grunnleggende",
		groupKey: "presetGroup.basic",
		hint: "Sentrert åpning med to knapper",
		hintKey: "preset.hero-sentrert.hint",
		create: () => Bo("hero-sentrert", "60vh", No(Po("bg")), [
			Z(X(15, 64, 70, 44), J("seed.heroCenter.title"), { align: "center" }),
			Z(X(25, 116, 50, 26), J("seed.heroCenter.intro"), { align: "center" }),
			xo(X(31.5, 160, 17, 40), J("seed.join")),
			xo(X(51.5, 160, 17, 40), J("seed.readMore"), { style: "secondary" })
		])
	}), e.sections.define("bilder", {
		label: "Bilder",
		labelKey: "preset.bilder.label",
		group: "Grunnleggende",
		groupKey: "presetGroup.basic",
		hint: "Tittel og tre bilderammer",
		hintKey: "preset.bilder.hint",
		create: () => Bo("bilder", "360px", No(Po("bg")), [
			Z(X(4, 24, 50, 32), J("seed.images.title")),
			bo(X(4, 72, 28, 220)),
			bo(X(36, 72, 28, 220)),
			bo(X(68, 72, 28, 220))
		]),
		itemLabel: "bilde",
		itemLabelKey: "item.image",
		item: (e) => {
			let { x: t, y: n } = Ro(e, 3, 4, 32, 72, 244, 28, 220);
			return {
				blocks: [bo(X(t, n, 28, 220))],
				bottom: n + 244
			};
		}
	}), e.sections.define("galleri", {
		label: "Galleri",
		labelKey: "preset.galleri.label",
		group: "Grunnleggende",
		groupKey: "presetGroup.basic",
		hint: "Bildegalleri i rutenett med fullskjermvisning (lightbox)",
		hintKey: "preset.galleri.hint",
		create: () => Bo("galleri", "440px", No(Po("bg")), [Z(X(4, 24, 50, 32), J("seed.gallery.title")), Oo(X(4, 72, 92, 320))])
	}), e.sections.define("kontakt", {
		label: "Kontakt",
		labelKey: "preset.kontakt.label",
		group: "Grunnleggende",
		groupKey: "presetGroup.basic",
		hint: "Kontaktinfo i kort med e-postknapp",
		hintKey: "preset.kontakt.hint",
		create: () => Bo("kontakt", "320px", No(Po("surface"), Fo(.2, .8, .2)), [
			Z(X(10, 32, 40, 36), J("seed.contact.title")),
			Z(X(10, 84, 36, 130), J("seed.contact.info"), { box: !0 }),
			xo(X(60, 100, 22, 40), J("seed.contact.button"), { href: "mailto:post@dinforening.no" })
		])
	}), e.sections.define("funksjonskort", {
		label: "Funksjonskort",
		labelKey: "preset.funksjonskort.label",
		group: "Kort og lister",
		groupKey: "presetGroup.cards",
		hint: "Tre kort med ikon, tittel og tekst",
		hintKey: "preset.funksjonskort.hint",
		create: () => {
			let e = (e, t, n, r) => {
				let i = So(X(e + 10.5, 88, 4, 52), n), a = Z(X(e, 152, 25, 200), J("seed.features.card", { title: r }), {
					align: "center",
					box: !0
				});
				return a.animation = Co(), i.mobileOrder = zo(88, t, 0), a.mobileOrder = zo(88, t, 1), [i, a];
			};
			return Bo("funksjonskort", "420px", No(Po("bg")), [
				Z(X(6, 28, 60, 38), J("seed.features.title")),
				...e(6, 0, "✦", J("seed.features.card1")),
				...e(37.5, 1, "★", J("seed.features.card2")),
				...e(69, 2, "✓", J("seed.features.card3"))
			]);
		},
		itemLabel: "kort",
		itemLabelKey: "item.card",
		item: (e) => {
			let { x: t, y: n, n: r } = Ro(e, 3, 6, 31.5, 152, 296, 25, 264, -64), i = So(X(t + 10.5, n - 64, 4, 52), "✦"), a = Z(X(t, n, 25, 200), J("seed.features.card", { title: J("seed.features.newTitle") }), {
				align: "center",
				box: !0
			});
			return a.animation = Co(), i.mobileOrder = zo(88, r, 0), a.mobileOrder = zo(88, r, 1), {
				blocks: [i, a],
				bottom: n + 228
			};
		}
	}), e.sections.define("funksjonskort-enkel", {
		label: "Funksjonskort uten ikoner",
		labelKey: "preset.funksjonskort-enkel.label",
		group: "Kort og lister",
		groupKey: "presetGroup.cards",
		hint: "Tre kort med tittel og tekst (uten ikonene over)",
		hintKey: "preset.funksjonskort-enkel.hint",
		create: () => {
			let e = (e, t, n) => {
				let r = Z(X(e, 88, 25, 200), J("seed.features.card", { title: n }), {
					align: "center",
					box: !0
				});
				return r.animation = Co(), r.mobileOrder = zo(88, t, 0), r;
			};
			return Bo("funksjonskort-enkel", "360px", No(Po("bg")), [
				Z(X(6, 28, 60, 38), J("seed.features.title")),
				e(6, 0, J("seed.features.card1")),
				e(37.5, 1, J("seed.features.card2")),
				e(69, 2, J("seed.features.card3"))
			]);
		},
		itemLabel: "kort",
		itemLabelKey: "item.card",
		item: (e) => {
			let { x: t, y: n, n: r } = Ro(e, 3, 6, 31.5, 88, 232, 25, 200), i = Z(X(t, n, 25, 200), J("seed.features.card", { title: J("seed.features.newTitle") }), {
				align: "center",
				box: !0
			});
			return i.animation = Co(), i.mobileOrder = zo(88, r, 0), {
				blocks: [i],
				bottom: n + 228
			};
		}
	}), e.sections.define("nyheter", {
		label: "Nyheter",
		labelKey: "preset.nyheter.label",
		group: "Kort og lister",
		groupKey: "presetGroup.cards",
		hint: "Tre nyhetskort med bilde, tag og dato",
		hintKey: "preset.nyheter.hint",
		create: () => {
			let e = (e, t) => {
				let n = bo(X(e, 88, 25, 160)), r = Z(X(e, 256, 25, 160), J("seed.news.card"));
				return n.mobileOrder = zo(88, t, 0), r.mobileOrder = zo(88, t, 1), [n, r];
			};
			return Bo("nyheter", "460px", No(Po("bg")), [
				Z(X(6, 28, 50, 38), J("seed.news.title")),
				xo(X(78, 30, 16, 36), J("seed.news.seeAll"), { style: "secondary" }),
				...e(6, 0),
				...e(37.5, 1),
				...e(69, 2)
			]);
		},
		itemLabel: "sak",
		itemLabelKey: "item.story",
		item: (e) => {
			let { x: t, y: n, n: r } = Ro(e, 3, 6, 31.5, 88, 344, 25, 328), i = bo(X(t, n, 25, 160)), a = Z(X(t, n + 168, 25, 160), J("seed.news.card"));
			return i.mobileOrder = zo(88, r, 0), a.mobileOrder = zo(88, r, 1), {
				blocks: [i, a],
				bottom: n + 352
			};
		}
	}), e.sections.define("nyheter-samling", {
		label: "Nyheter (samling)",
		labelKey: "preset.nyheter-samling.label",
		group: "Kort og lister",
		groupKey: "presetGroup.cards",
		hint: "Nyhetskort fra en samling: skriv innslag, kortene følger med",
		hintKey: "preset.nyheter-samling.hint",
		create: () => Bo("nyheter-samling", "300px", No(Po("bg")), [Z(X(6, 28, 50, 38), J("seed.news.title")), wo(X(6, 88, 88, 180), "cards")])
	}), e.sections.define("oppslagstavle", {
		label: "Oppslagstavle",
		labelKey: "preset.oppslagstavle.label",
		group: "Kort og lister",
		groupKey: "presetGroup.cards",
		hint: "Datert liste fra en samling (oppslag/kunngjøringer)",
		hintKey: "preset.oppslagstavle.hint",
		create: () => Bo("oppslagstavle", "300px", No(Po("surface")), [Z(X(6, 28, 50, 38), J("seed.noticeboard.title")), wo(X(6, 88, 88, 180), "list", { limit: 8 })])
	}), e.sections.define("publikasjonsarkiv", {
		label: "Publikasjonsarkiv",
		labelKey: "preset.publikasjonsarkiv.label",
		group: "Kort og lister",
		groupKey: "presetGroup.cards",
		hint: "År-gruppert arkiv fra en samling (utgaver, referater, rapporter)",
		hintKey: "preset.publikasjonsarkiv.hint",
		create: () => Bo("publikasjonsarkiv", "300px", No(Po("bg")), [Z(X(6, 28, 60, 38), J("seed.archive.title")), wo(X(6, 88, 88, 180), "archive", { limit: 0 })])
	}), e.sections.define("arrangementer", {
		label: "Arrangementer",
		labelKey: "preset.arrangementer.label",
		group: "Kort og lister",
		groupKey: "presetGroup.cards",
		hint: "Tre rader med dato-badge og påmeldingsknapp",
		hintKey: "preset.arrangementer.hint",
		create: () => {
			let e = (e, t, n, r) => [
				Z(X(6, e, 8, 88), J("seed.events.dateBadge", {
					day: t,
					month: n
				}), {
					align: "center",
					box: !0
				}),
				Z(X(16, e, 58, 88), J("seed.events.row", { title: r })),
				xo(X(78, e + 24, 16, 40), J("seed.events.signup"), { style: "secondary" })
			];
			return Bo("arrangementer", "440px", No(Po("surface")), [
				Z(X(6, 28, 50, 38), J("seed.events.title")),
				...e(88, "11", J("seed.events.monthAug"), J("seed.events.row1")),
				...e(196, "25", J("seed.events.monthAug"), J("seed.events.row2")),
				...e(304, "8", J("seed.events.monthSep"), J("seed.events.row3"))
			]);
		},
		itemLabel: "rad",
		itemLabelKey: "item.row",
		item: (e) => {
			let t = Io(e) + 16;
			return {
				blocks: [
					Z(X(6, t, 8, 88), J("seed.events.newBadge"), {
						align: "center",
						box: !0
					}),
					Z(X(16, t, 58, 88), J("seed.events.row", { title: J("seed.events.newTitle") })),
					xo(X(78, t + 24, 16, 40), J("seed.events.signup"), { style: "secondary" })
				],
				bottom: t + 116
			};
		}
	}), e.sections.define("team", {
		label: "Team/styret",
		labelKey: "preset.team.label",
		group: "Kort og lister",
		groupKey: "presetGroup.cards",
		hint: "Portretter med navn, verv og e-post",
		hintKey: "preset.team.hint",
		create: () => {
			let e = (e, t, n) => {
				let r = bo(X(e, 80, 22, 180), { alt: J("seed.team.alt") }), i = Z(X(e, 268, 22, 84), J("seed.team.member", { role: n }), { align: "center" });
				return r.mobileOrder = zo(80, t, 0), i.mobileOrder = zo(80, t, 1), [r, i];
			};
			return Bo("team", "420px", No(Po("surface")), [
				Z(X(6, 24, 50, 32), J("seed.team.title")),
				...e(7.5, 0, J("seed.team.role1")),
				...e(39, 1, J("seed.team.role2")),
				...e(70.5, 2, J("seed.team.role3"))
			]);
		},
		itemLabel: "person",
		itemLabelKey: "item.person",
		item: (e) => {
			let { x: t, y: n, n: r } = Ro(e, 3, 7.5, 31.5, 80, 288, 22, 272), i = bo(X(t, n, 22, 180), { alt: J("seed.team.alt") }), a = Z(X(t, n + 188, 22, 84), J("seed.team.member", { role: J("seed.team.roleNew") }), { align: "center" });
			return i.mobileOrder = zo(80, r, 0), a.mobileOrder = zo(80, r, 1), {
				blocks: [i, a],
				bottom: n + 296
			};
		}
	}), e.sections.define("faq", {
		label: "FAQ",
		labelKey: "preset.faq.label",
		group: "Kort og lister",
		groupKey: "presetGroup.cards",
		hint: "Spørsmål og svar i kort",
		hintKey: "preset.faq.hint",
		create: () => Bo("faq", "520px", No(Po("bg")), [
			Z(X(25, 24, 50, 36), J("seed.faq.title"), { align: "center" }),
			ko(X(20, 80, 60, 320), [
				{
					q: J("seed.faq.q1"),
					a: J("seed.faq.answer")
				},
				{
					q: J("seed.faq.q2"),
					a: J("seed.faq.answer")
				},
				{
					q: J("seed.faq.q3"),
					a: J("seed.faq.answer")
				}
			]),
			Z(X(20, 416, 60, 32), J("seed.faq.more"), { align: "center" })
		])
	}), e.sections.define("tidslinje", {
		label: "Tidslinje",
		labelKey: "preset.tidslinje.label",
		group: "Kort og lister",
		groupKey: "presetGroup.cards",
		hint: "Historien som hendelser langs en linje",
		hintKey: "preset.tidslinje.hint",
		create: () => Bo("tidslinje", "480px", No(Po("bg")), [Z(X(25, 24, 50, 36), J("seed.tidslinje.title"), { align: "center" }), jo(X(25, 88, 50, 330), [
			{
				year: "2019",
				title: J("seed.tidslinje.t1"),
				text: J("seed.tidslinje.text")
			},
			{
				year: "2022",
				title: J("seed.tidslinje.t2"),
				text: J("seed.tidslinje.text")
			},
			{
				year: "2026",
				title: J("seed.tidslinje.t3"),
				text: J("seed.tidslinje.text")
			}
		])])
	}), e.sections.define("steg", {
		label: "Steg for steg",
		labelKey: "preset.steg.label",
		group: "Kort og lister",
		groupKey: "presetGroup.cards",
		hint: "Tre nummererte kort",
		hintKey: "preset.steg.hint",
		create: () => {
			let e = (e, t, n) => {
				let r = Z(X(e, 88, 25, 72), `<h3>${t + 1}</h3>`, {
					align: "center",
					size: 44
				}), i = Z(X(e, 168, 25, 160), J("seed.steps.card", { title: n }), {
					align: "center",
					box: !0
				});
				return r.mobileOrder = zo(88, t, 0), i.mobileOrder = zo(88, t, 1), [r, i];
			};
			return Bo("steg", "400px", No(Po("bg")), [
				Z(X(6, 28, 60, 38), J("seed.steps.title")),
				...e(6, 0, J("seed.steps.s1")),
				...e(37.5, 1, J("seed.steps.s2")),
				...e(69, 2, J("seed.steps.s3"))
			]);
		},
		itemLabel: "steg",
		itemLabelKey: "item.step",
		item: (e) => {
			let { x: t, y: n, n: r } = Ro(e, 3, 6, 31.5, 88, 272, 25, 240), i = Z(X(t, n, 25, 72), `<h3>${r + 1}</h3>`, {
				align: "center",
				size: 44
			}), a = Z(X(t, n + 80, 25, 160), J("seed.steps.card", { title: J("seed.steps.newTitle") }), {
				align: "center",
				box: !0
			});
			return i.mobileOrder = zo(88, r, 0), a.mobileOrder = zo(88, r, 1), {
				blocks: [i, a],
				bottom: n + 268
			};
		}
	}), e.sections.define("hovedoppslag", {
		label: "Hovedoppslag",
		labelKey: "preset.hovedoppslag.label",
		group: "Kort og lister",
		groupKey: "presetGroup.cards",
		hint: "Én stor sak og to små ved siden",
		hintKey: "preset.hovedoppslag.hint",
		create: () => {
			let e = [
				bo(X(6, 40, 55, 300)),
				Z(X(6, 348, 55, 108), J("seed.feature.main")),
				xo(X(6, 464, 14, 38), J("seed.readMore"), { style: "secondary" }),
				bo(X(66, 40, 28, 120)),
				Z(X(66, 164, 28, 60), J("seed.feature.small1")),
				bo(X(66, 244, 28, 120)),
				Z(X(66, 368, 28, 60), J("seed.feature.small2"))
			];
			return e.forEach((e, t) => {
				e.mobileOrder = zo(40, t < 3 ? 0 : 1, t);
			}), Bo("hovedoppslag", "540px", No(Po("bg")), e);
		}
	}), e.sections.define("produkter", {
		label: "Produkter",
		labelKey: "preset.produkter.label",
		group: "Kort og lister",
		groupKey: "presetGroup.cards",
		hint: "Tre håndbygde produktkort med egen kjøpslenke; Butikk-presetet gir ekte produkter med handlekurv",
		hintKey: "preset.produkter.hint",
		create: () => {
			let e = (e, t, n, r) => {
				let i = [
					bo(X(e, 88, 25, 200)),
					Z(X(e, 296, 25, 76), J("seed.products.card", {
						name: n,
						price: r
					}), { align: "center" }),
					xo(X(e + 5, 380, 15, 40), J("seed.products.buy"))
				];
				return i.forEach((e, n) => {
					e.mobileOrder = zo(88, t, n);
				}), i;
			};
			return Bo("produkter", "470px", No(Po("bg")), [
				Z(X(6, 28, 50, 38), J("seed.products.title")),
				...e(6, 0, J("seed.products.name"), J("seed.products.price1")),
				...e(37.5, 1, J("seed.products.name"), J("seed.products.price2")),
				...e(69, 2, J("seed.products.name"), J("seed.products.price3"))
			]);
		},
		itemLabel: "produkt",
		itemLabelKey: "item.product",
		item: (e) => {
			let { x: t, y: n, n: r } = Ro(e, 3, 6, 31.5, 88, 348, 25, 332), i = [
				bo(X(t, n, 25, 200)),
				Z(X(t, n + 208, 25, 76), J("seed.products.card", {
					name: J("seed.products.name"),
					price: J("seed.products.price1")
				}), { align: "center" }),
				xo(X(t + 5, n + 292, 15, 40), J("seed.products.buy"))
			];
			return i.forEach((e, t) => {
				e.mobileOrder = zo(88, r, t);
			}), {
				blocks: i,
				bottom: n + 356
			};
		}
	}), e.sections.define("butikk", {
		label: "Butikk",
		labelKey: "preset.butikk.label",
		group: "Butikk",
		groupKey: "presetGroup.butikk",
		hint: "Ekte produktkort fra en produktsamling, med handlekurv",
		hintKey: "preset.butikk.hint",
		create: () => Bo("butikk", "544px", No(Po("bg")), [
			Z(X(6, 28, 50, 38), J("seed.butikk.title")),
			Eo(X(78, 88, 16, 48)),
			To(X(6, 176, 88, 320))
		])
	}), e.sections.define("butikk-hero", {
		label: "Butikk-hero",
		labelKey: "preset.butikk-hero.label",
		group: "Butikk",
		groupKey: "presetGroup.butikk",
		hint: "Kampanjebånd: stor overskrift, undertekst, CTA og kampanjebilde",
		hintKey: "preset.butikk-hero.hint",
		create: () => {
			let e = [
				Z(X(6, 48, 52, 96), J("seed.butikkHero.title")),
				Z(X(6, 152, 40, 48), J("seed.butikkHero.sub")),
				xo(X(6, 216, 17, 42), J("seed.butikkHero.cta")),
				bo(X(62, 40, 32, 300))
			];
			return e.forEach((e, t) => {
				e.mobileOrder = zo(48, t < 3 ? 0 : 1, t);
			}), Bo("butikk-hero", "400px", {
				version: 1,
				layers: [
					Po("bg"),
					Fo(.8, .25, .28, .6),
					{
						type: "grain",
						version: 1,
						props: { opacity: .05 }
					}
				]
			}, e);
		}
	}), e.sections.define("butikk-kategorier", {
		label: "Butikk-kategorier",
		labelKey: "preset.butikk-kategorier.label",
		group: "Butikk",
		groupKey: "presetGroup.butikk",
		hint: "Fire kategorifliser med bilde og navn; lenken settes på bildet i Egenskaper",
		hintKey: "preset.butikk-kategorier.hint",
		create: () => {
			let e = (e, t, n) => {
				let r = bo(X(e, 88, 21, 170)), i = Z(X(e, 266, 21, 34), J("seed.butikkKategorier.tile", { name: n }), { align: "center" });
				return r.mobileOrder = zo(88, t, 0), i.mobileOrder = zo(88, t, 1), [r, i];
			}, t = Bo("butikk-kategorier", "360px", No(Po("bg")), [
				Z(X(6, 28, 60, 38), J("seed.butikkKategorier.title")),
				...e(6, 0, J("seed.butikkKategorier.cat1")),
				...e(29.5, 1, J("seed.butikkKategorier.cat2")),
				...e(53, 2, J("seed.butikkKategorier.cat3")),
				...e(76.5, 3, J("seed.butikkKategorier.cat4"))
			]);
			return t.theme = "dus", t;
		},
		itemLabel: "kategori",
		itemLabelKey: "item.category",
		item: (e) => {
			let { x: t, y: n, n: r } = Ro(e, 4, 6, 23.5, 88, 220, 21, 212), i = bo(X(t, n, 21, 170)), a = Z(X(t, n + 178, 21, 34), J("seed.butikkKategorier.tile", { name: J("seed.butikkKategorier.newCat") }), { align: "center" });
			return i.mobileOrder = zo(88, r, 0), a.mobileOrder = zo(88, r, 1), {
				blocks: [i, a],
				bottom: n + 220
			};
		}
	}), e.sections.define("butikk-tillit", {
		label: "Butikk-tillit",
		labelKey: "preset.butikk-tillit.label",
		group: "Butikk",
		groupKey: "presetGroup.butikk",
		hint: "Tre tillitspunkter med ikon og tekst (retur, hjelp, trygg bestilling)",
		hintKey: "preset.butikk-tillit.hint",
		create: () => {
			let e = (e, t, n, r) => {
				let i = So(X(e + 10.5, 88, 4, 52), r, 44), a = Z(X(e, 148, 25, 96), J(n), { align: "center" });
				return i.mobileOrder = zo(88, t, 0), a.mobileOrder = zo(88, t, 1), [i, a];
			}, t = Bo("butikk-tillit", "300px", No(Po("bg")), [
				Z(X(6, 28, 60, 38), J("seed.butikkTillit.title")),
				...e(6, 0, "seed.butikkTillit.t1", "✓"),
				...e(37.5, 1, "seed.butikkTillit.t2", "↻"),
				...e(69, 2, "seed.butikkTillit.t3", "✉")
			]);
			return t.theme = "dempet", t;
		},
		itemLabel: "kort",
		itemLabelKey: "item.card",
		item: (e) => {
			let { x: t, y: n, n: r } = Ro(e, 3, 6, 31.5, 148, 216, 25, 156, -60), i = So(X(t + 10.5, n - 60, 4, 52), "✓", 44), a = Z(X(t, n, 25, 96), J("seed.butikkTillit.newItem"), { align: "center" });
			return i.mobileOrder = zo(88, r, 0), a.mobileOrder = zo(88, r, 1), {
				blocks: [i, a],
				bottom: n + 104
			};
		}
	}), e.sections.define("butikk-utstilling", {
		label: "Butikk-utstilling",
		labelKey: "preset.butikk-utstilling.label",
		group: "Butikk",
		groupKey: "presetGroup.butikk",
		hint: "Statement-bånd: stor typografi, tekst, CTA og bilde på dyp flate",
		hintKey: "preset.butikk-utstilling.hint",
		create: () => {
			let e = [
				Z(X(6, 56, 52, 100), J("seed.butikkUtstilling.title")),
				Z(X(6, 164, 42, 56), J("seed.butikkUtstilling.text")),
				xo(X(6, 236, 18, 42), J("seed.butikkUtstilling.cta")),
				bo(X(62, 48, 32, 240))
			];
			e.forEach((e, t) => {
				e.mobileOrder = zo(56, t < 3 ? 0 : 1, t);
			});
			let t = Bo("butikk-utstilling", "340px", No(Po("bg")), e);
			return t.theme = "dyp", t;
		}
	}), e.sections.define("kasse", {
		label: "Kasse",
		labelKey: "preset.kasse.label",
		group: "Butikk",
		groupKey: "presetGroup.butikk",
		hint: "Bestillingsskjema som sender handlekurven som e-post eller til et endepunkt",
		hintKey: "preset.kasse.hint",
		create: () => Bo("kasse", "560px", No(Po("bg")), [Z(X(6, 28, 50, 38), J("seed.kasse.title")), Do(X(25, 96, 50, 430))])
	}), e.sections.define("cta", {
		label: "CTA-banner",
		labelKey: "preset.cta.label",
		group: "Fremheving",
		groupKey: "presetGroup.highlight",
		hint: "Full bredde med én tydelig handling",
		hintKey: "preset.cta.hint",
		create: () => Bo("cta", "280px", No(Po("surface"), Fo(.5, .5, .3, .7)), [
			Z(X(20, 56, 60, 40), J("seed.cta.title"), { align: "center" }),
			Z(X(25, 104, 50, 26), J("seed.cta.sub"), { align: "center" }),
			xo(X(42, 148, 16, 42), J("seed.join"))
		])
	}), e.sections.define("sitat", {
		label: "Sitat",
		labelKey: "preset.sitat.label",
		group: "Fremheving",
		groupKey: "presetGroup.highlight",
		hint: "Stort sitat med attribusjon",
		hintKey: "preset.sitat.hint",
		create: () => Bo("sitat", "300px", No(Po("bg")), [Ao(X(20, 56, 60, 190), {
			text: J("seed.sitat.text"),
			attribution: J("seed.sitat.name"),
			role: J("seed.sitat.role")
		})])
	}), e.sections.define("statistikk", {
		label: "Statistikk",
		labelKey: "preset.statistikk.label",
		group: "Fremheving",
		groupKey: "presetGroup.highlight",
		hint: "Tre store tall med etikett",
		hintKey: "preset.statistikk.hint",
		create: () => {
			let e = (e, t, n, r, i) => {
				let a = Mo(X(e, 76, 25, 120), {
					value: n,
					suffix: r,
					label: i
				});
				return a.mobileOrder = zo(76, t, 0), a;
			};
			return Bo("statistikk", "260px", No(Po("surface")), [
				e(6, 0, "120", "+", J("seed.stats.l1")),
				e(37.5, 1, "25", "", J("seed.stats.l2")),
				e(69, 2, "1981", "", J("seed.stats.l3"))
			]);
		},
		itemLabel: "tall",
		itemLabelKey: "item.number",
		item: (e) => {
			let { x: t, y: n, n: r } = Ro(e, 3, 6, 31.5, 76, 140, 25, 120), i = Mo(X(t, n, 25, 120), {
				value: "42",
				label: J("seed.stats.newLabel")
			});
			return i.mobileOrder = zo(76, r, 0), {
				blocks: [i],
				bottom: n + 148
			};
		}
	}), e.sections.define("sponsorer", {
		label: "Sponsorer",
		labelKey: "preset.sponsorer.label",
		group: "Fremheving",
		groupKey: "presetGroup.highlight",
		hint: "Logorad i gråtone med lenker",
		hintKey: "preset.sponsorer.hint",
		create: () => {
			let e = (e) => bo(X(e, 108, 18.5, 100), {
				alt: J("seed.sponsors.alt"),
				fit: "contain",
				radius: null,
				saturate: 0
			});
			return Bo("sponsorer", "280px", No(Po("bg")), [
				Z(X(6, 28, 60, 36), J("seed.sponsors.title")),
				e(5.5),
				e(29),
				e(52.5),
				e(76)
			]);
		},
		itemLabel: "logo",
		itemLabelKey: "item.logo",
		item: (e) => {
			let { x: t, y: n } = Ro(e, 4, 5.5, 23.5, 108, 124, 18.5, 100);
			return {
				blocks: [bo(X(t, n, 18.5, 100), {
					alt: J("seed.sponsors.alt"),
					fit: "contain",
					radius: null,
					saturate: 0
				})],
				bottom: n + 124
			};
		}
	}), e.sections.define("medlemskap", {
		label: "Medlemskap",
		labelKey: "preset.medlemskap.label",
		group: "Fremheving",
		groupKey: "presetGroup.highlight",
		hint: "Prisnivåer med fordeler og Vipps-linje",
		hintKey: "preset.medlemskap.hint",
		create: () => Bo("medlemskap", "500px", No(Po("surface")), [
			Z(X(6, 28, 50, 38), J("seed.membership.title")),
			Z(X(14, 88, 32, 250), J("seed.membership.tier1"), {
				align: "center",
				box: !0
			}),
			Z(X(54, 88, 32, 250), J("seed.membership.tier2"), {
				align: "center",
				box: !0
			}),
			xo(X(42, 358, 16, 42), J("seed.join")),
			Z(X(25, 414, 50, 30), J("seed.membership.vipps"), { align: "center" })
		])
	});
}
//#endregion
//#region ../template/assets/engine/0.6.11/maler-model.js
var Ho = [
	"section",
	"blocks",
	"page"
];
function Uo(e) {
	return ba(String(e ?? ""), "");
}
function Wo(e, t, { id: n, title: r }) {
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
//#region ../template/assets/engine/0.6.11/samlinger-csv.js
var Go = [
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
function Ko(e) {
	let t = String(e ?? "");
	return /[",\n\r]/.test(t) ? `"${t.replaceAll("\"", "\"\"")}"` : t;
}
function qo(e, t) {
	return t === "sizes" ? (e.sizes ?? []).join("|") : t === "colors" ? (e.colors ?? []).map((e) => e.name).join("|") : e[t] ?? "";
}
function Jo(e) {
	let t = [Go.join(",")];
	for (let n of e ?? []) t.push(Go.map((e) => Ko(qo(n, e))).join(","));
	return t.join("\n") + "\n";
}
function Yo(e) {
	let t = [], n = [], r = "", i = !1, a = String(e ?? "");
	for (let e = 0; e < a.length; e += 1) {
		let o = a[e];
		i ? o === "\"" && a[e + 1] === "\"" ? (r += "\"", e += 1) : o === "\"" ? i = !1 : r += o : o === "\"" ? i = !0 : o === "," ? (n.push(r), r = "") : o === "\n" || o === "\r" ? (o === "\r" && a[e + 1] === "\n" && (e += 1), n.push(r), t.push(n), n = [], r = "") : r += o;
	}
	return (r !== "" || n.length) && (n.push(r), t.push(n)), t.filter((e) => e.some((e) => e.trim() !== ""));
}
var Xo = (e) => String(e ?? "").split("|").map((e) => e.trim()).filter(Boolean);
function Zo(e) {
	let t = Yo(e);
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
		let s = Xo(t.sizes);
		s.length && (o.sizes = s);
		let c = Xo(t.colors);
		c.length && (o.colors = c.map((e) => ({ name: e }))), r.push(o);
	}
	return {
		entries: r,
		skipped: i
	};
}
//#endregion
//#region ../template/assets/engine/0.6.11/feeds.js
function Qo(e) {
	return String(e ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;").replaceAll("'", "&apos;");
}
function $o(e, t) {
	let n = String(t ?? "").replace(/\/+$/, "");
	return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${(e ?? []).filter((e) => !e.noindex).map((e) => `  <url><loc>${Qo(n + (e.path === "/" ? "/" : e.path))}</loc></url>`).join("\n")}\n</urlset>\n`;
}
function es(e) {
	return `User-agent: *\nDisallow: /admin/\n\nSitemap: ${String(e ?? "").replace(/\/+$/, "")}/sitemap.xml\n`;
}
var ts = [
	"news",
	"notices",
	"publications"
];
function ns(e) {
	let t = String(e.origin ?? "").replace(/\/+$/, ""), n = (e.items ?? []).map((n) => {
		let r = n.href ? new URL(n.href, t + "/").href : t + "/", i = n.date ? new Date(n.date) : null, a = i && !Number.isNaN(i.getTime()) ? `\n      <pubDate>${i.toUTCString()}</pubDate>` : "", o = n.text ? `\n      <description>${Qo(n.text)}</description>` : "";
		return `    <item>\n      <title>${Qo(n.title)}</title>\n      <link>${Qo(r)}</link>\n      <guid isPermaLink="false">${Qo(`${e.path}#${n.id ?? n.title}`)}</guid>${o}${a}\n    </item>`;
	}).join("\n");
	return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${Qo(e.title)}</title>\n    <link>${Qo(t + "/")}</link>\n    <description>${Qo(e.description ?? e.title)}</description>\n${n}${n ? "\n" : ""}  </channel>\n</rss>\n`;
}
//#endregion
//#region ../template/assets/engine/0.6.11/preset-thumb.js
var rs = /^#[0-9a-fA-F]{3,8}$/, is = /^[a-z][a-z0-9-]*$/, as = "#171c26", os = "#232a38", ss = "#98a1b3", cs = "#7c5cff", Q = (e, t) => `var(--urd-color-${e}, ${t})`;
function ls(e, t) {
	return typeof e == "string" ? rs.test(e) ? e : is.test(e) ? Q(e, t) : t : t;
}
function us(e, t = 800) {
	let n = Number.parseFloat(e);
	return !Number.isFinite(n) || n <= 0 ? 400 : typeof e == "string" && e.trim().endsWith("vh") ? n / 100 * t : n;
}
var $ = (e) => Math.round(e * 10) / 10, ds = (e, t, n) => Math.min(n, Math.max(t, e)), fs = (e, t, n, r, i, a = "") => `<rect x="${$(e)}" y="${$(t)}" width="${$(Math.max(n, 1))}" height="${$(Math.max(r, 1))}" fill="${i}"${a}/>`;
function ps(e) {
	if (e?.theme) return e.theme === "invers" || e.theme === "dyp" ? Q("text", ss) : e.theme === "aksent" ? Q("accent", cs) : Q("surface", os);
	for (let t of e?.background?.layers ?? []) {
		if (t.type === "color") return ls(t.props?.value, as);
		if (t.type === "gradient") return ls(Array.isArray(t.props?.stops) ? t.props.stops[0] : null, as);
	}
	return Q("bg", as);
}
function ms(e, t, n, r, i) {
	let a = /<h[1-3]/.test(String(i?.html ?? "")), o = i?.align === "center", s = Q("text", ss), c = [];
	i?.box && c.push(fs(e, t, n, r, Q("surface", os), " rx=\"1.5\""));
	let l = i?.box ? Math.min(2, n * .06) : 0, u = e + l, d = n - l * 2, f = [
		.72,
		.9,
		.5
	], p = [
		a ? 4 : 2.2,
		2.2,
		2.2
	], m = ds(r / (p[0] + p[1] + p[2] + 4.8 + 2), 0, 1), h = t + l + Math.min(1, r * .08);
	for (let e = 0; e < 3; e++) {
		let n = Math.min(Math.max(e === 0 ? a ? 1.4 : 1 : .8, p[e] * m), Math.max(r, 1));
		if (e > 0 && h + n > t + r - l) break;
		let i = d * f[e], g = o ? u + (d - i) / 2 : u;
		c.push(fs(g, h, i, n, s, ` opacity="${e === 0 ? .8 : .4}" rx="${$(Math.min(1, n / 2))}"`)), h += n + Math.max(.8, 2.4 * m);
	}
	return c.join("");
}
function hs(e, t, n, r, i = !1) {
	let a = Q("text", ss), o = [];
	i ? (o.push(fs(e, t, n, r, Q("surface", os), " rx=\"1.5\" opacity=\"0.35\"")), o.push(`<rect x="${$(e + .4)}" y="${$(t + .4)}" width="${$(Math.max(n - .8, 1))}" height="${$(Math.max(r - .8, 1))}" fill="none" stroke="${a}" stroke-width="0.6" stroke-dasharray="2 2" opacity="0.35" rx="1.5"/>`)) : o.push(fs(e, t, n, r, Q("surface", os), " rx=\"1.5\""));
	let s = i ? .15 : .4, c = (t) => $(e + n * t), l = (e) => $(t + r * e);
	return o.push(`<polygon points="${c(.08)},${l(.9)} ${c(.42)},${l(.38)} ${c(.62)},${l(.68)} ${c(.75)},${l(.5)} ${c(.92)},${l(.9)}" fill="${a}" opacity="${s}"/>`), o.push(`<circle cx="${c(.28)}" cy="${l(.26)}" r="${$(Math.max(1, Math.min(n, r) * .1))}" fill="${a}" opacity="${$(s + .1)}"/>`), o.join("");
}
function gs(e, t, n, r, i) {
	let a = !(Array.isArray(i?.images) && i.images.length), o = Math.max(1, n * .03), s = (n - o * 2) / 3, c = [];
	for (let n = 0; n < 3; n++) c.push(hs(e + n * (s + o), t, s, r, a));
	return c.join("");
}
function _s(e, t, n, r) {
	let i = Math.max(1, n * .03), a = (n - i * 2) / 3, o = [];
	for (let n = 0; n < 3; n++) {
		let s = e + n * (a + i);
		o.push(fs(s, t, a, r * .55, Q("surface", os), " rx=\"1.5\"")), o.push(fs(s, t + r * .62, a * .8, 2, Q("text", ss), " opacity=\"0.5\" rx=\"1\""));
	}
	return o.join("");
}
function vs(e, t, n, r, i) {
	let a = ls(i?.color, cs), o = i?.kind;
	return o === "circle" ? `<ellipse cx="${$(e + n / 2)}" cy="${$(t + r / 2)}" rx="${$(Math.max(n / 2, 1))}" ry="${$(Math.max(r / 2, 1))}" fill="${a}" opacity="0.8"/>` : o === "triangle" ? `<polygon points="${$(e)},${$(t + r)} ${$(e + n / 2)},${$(t)} ${$(e + n)},${$(t + r)}" fill="${a}" opacity="0.8"/>` : o === "line" || o === "arrow" ? fs(e, t + r / 2 - .75, n, 1.5, a, " opacity=\"0.85\" rx=\"0.75\"") : fs(e, t, n, r, a, " opacity=\"0.8\" rx=\"1\"");
}
function ys(e, t, n, r, i, a) {
	if (e === "text") return ms(t, n, r, i, a);
	if (e === "image") return hs(t, n, r, i, !a?.src);
	if (e === "galleri") return gs(t, n, r, i, a);
	if (e === "samling") return _s(t, n, r, i);
	if (e === "faq") {
		let e = ds(Math.floor(i / 5), 2, 3), a = Math.max(.6, i * .04), o = (i - a * (e - 1)) / e, s = [];
		for (let i = 0; i < e; i += 1) {
			let e = n + i * (o + a);
			s.push(fs(t, e, r, o, Q("surface", os), " rx=\"1\"")), s.push(fs(t + r * .06, e + o / 2 - .7, r * .55, 1.4, Q("text", ss), " opacity=\"0.5\" rx=\"0.7\"")), s.push(`<circle cx="${$(t + r * .92)}" cy="${$(e + o / 2)}" r="0.9" fill="${Q("text", ss)}" opacity="0.4"/>`);
		}
		return s.join("");
	}
	if (e === "shape") return vs(t, n, r, i, a);
	if (e === "button") return fs(t, n, r, i, Q("accent", cs), ` rx="${$(Math.min(i / 2, 4))}"`);
	if (e === "icon") {
		let e = Math.max(1.2, Math.min(r, i) / 2);
		return `<circle cx="${$(t + r / 2)}" cy="${$(n + i / 2)}" r="${$(e)}" fill="${Q("accent", cs)}" opacity="0.85"/>`;
	}
	if (e === "video") {
		let e = [fs(t, n, r, i, Q("surface", os), " rx=\"1.5\"")], a = t + r / 2, o = n + i / 2, s = Math.max(1.5, Math.min(r, i) * .22);
		return e.push(`<polygon points="${$(a - s / 2)},${$(o - s)} ${$(a - s / 2)},${$(o + s)} ${$(a + s)},${$(o)}" fill="${Q("text", ss)}" opacity="0.6"/>`), e.join("");
	}
	if (e === "tidslinje") {
		let e = [fs(t + 1, n, 1.4, i, Q("accent", cs), " opacity=\"0.7\" rx=\"0.7\"")];
		for (let a = 0; a < 3; a += 1) {
			let o = n + i * (.18 + a * .32);
			e.push(`<circle cx="${$(t + 1.7)}" cy="${$(o)}" r="1.6" fill="${Q("accent", cs)}"/>`), e.push(fs(t + 5, o - 1, r * .5, 2, Q("text", ss), " opacity=\"0.5\" rx=\"1\""));
		}
		return e.join("");
	}
	if (e === "sitat") return [
		`<text x="${$(t + r / 2)}" y="${$(n + i * .34)}" text-anchor="middle" font-size="${$(Math.min(r, i) * .5)}" font-family="Georgia, serif" fill="${Q("accent", cs)}">“</text>`,
		fs(t + r * .15, n + i * .48, r * .7, 2, Q("text", ss), " opacity=\"0.6\" rx=\"1\""),
		fs(t + r * .25, n + i * .62, r * .5, 2, Q("text", ss), " opacity=\"0.6\" rx=\"1\""),
		fs(t + r * .35, n + i * .82, r * .3, 1.6, Q("text", ss), " opacity=\"0.35\" rx=\"0.8\"")
	].join("");
	if (e === "statistikk") return [fs(t + r * .28, n + i * .15, r * .44, i * .42, Q("accent", cs), " opacity=\"0.85\" rx=\"1\""), fs(t + r * .32, n + i * .72, r * .36, 1.6, Q("text", ss), " opacity=\"0.4\" rx=\"0.8\"")].join("");
	if (e === "tabell") {
		let e = Math.max(1.6, i * .22), a = [fs(t, n, r, e, Q("accent", cs), " opacity=\"0.5\" rx=\"0.8\"")], o = ds(Math.floor((i - e) / 3.2), 1, 3);
		for (let s = 0; s < o; s += 1) a.push(fs(t, n + e + 1 + s * ((i - e - 1) / o), r, 1, Q("text", ss), " opacity=\"0.3\""));
		return a.push(fs(t + r * .33, n, .6, i, Q("text", ss), " opacity=\"0.2\"")), a.push(fs(t + r * .66, n, .6, i, Q("text", ss), " opacity=\"0.2\"")), a.join("");
	}
	if (e === "deling") {
		let e = Math.max(1.2, Math.min(i / 2, r / 9)), a = [];
		for (let r = 0; r < 4; r += 1) a.push(`<circle cx="${$(t + e + r * (e * 2 + 1.5))}" cy="${$(n + i / 2)}" r="${$(e)}" fill="${Q("accent", cs)}" opacity="0.8"/>`);
		return a.join("");
	}
	if (e === "nedteller") {
		let e = Math.max(.8, r * .03), a = (r - e * 3) / 4, o = [];
		for (let r = 0; r < 4; r += 1) {
			let s = t + r * (a + e);
			o.push(fs(s, n, a, i, Q("surface", os), " rx=\"1\"")), o.push(fs(s + a * .25, n + i * .2, a * .5, i * .35, Q("accent", cs), " opacity=\"0.85\" rx=\"0.8\""));
		}
		return o.join("");
	}
	if (e === "audio") {
		let e = [fs(t, n, r, i, Q("surface", os), " rx=\"1.5\"")], a = n + i / 2, o = Math.max(1.2, i * .28);
		return e.push(`<polygon points="${$(t + r * .06)},${$(a - o)} ${$(t + r * .06)},${$(a + o)} ${$(t + r * .06 + o * 1.4)},${$(a)}" fill="${Q("accent", cs)}" opacity="0.85"/>`), e.push(fs(t + r * .2, a - .6, r * .7, 1.2, Q("text", ss), " opacity=\"0.35\" rx=\"0.6\"")), e.join("");
	}
	if (e === "produkt") {
		let e = Math.max(.8, r * .03), a = (r - e * 2) / 3, o = [];
		for (let r = 0; r < 3; r += 1) {
			let s = t + r * (a + e);
			o.push(fs(s, n, a, i, Q("surface", os), " rx=\"1\"")), o.push(fs(s + a * .08, n + i * .06, a * .84, i * .42, Q("text", ss), " opacity=\"0.15\" rx=\"0.8\"")), o.push(fs(s + a * .08, n + i * .56, a * .6, 1.4, Q("text", ss), " opacity=\"0.5\" rx=\"0.7\"")), o.push(fs(s + a * .08, n + i * .72, a * .35, 1.4, Q("accent", cs), " opacity=\"0.85\" rx=\"0.7\"")), o.push(fs(s + a * .08, n + i * .84, a * .84, i * .1, Q("accent", cs), " opacity=\"0.6\" rx=\"1\""));
		}
		return o.join("");
	}
	if (e === "handlekurv") {
		let e = Math.max(1.5, Math.min(r, i) / 2.4), a = t + r / 2, o = n + i / 2;
		return [
			`<circle cx="${$(a)}" cy="${$(o)}" r="${$(e)}" fill="${Q("surface", os)}"/>`,
			fs(a - e * .5, o - e * .25, e, e * .55, Q("text", ss), " opacity=\"0.5\" rx=\"0.4\""),
			`<circle cx="${$(a + e * .75)}" cy="${$(o - e * .75)}" r="${$(Math.max(.9, e * .35))}" fill="${Q("accent", cs)}"/>`
		].join("");
	}
	return e === "kasse" ? [
		fs(t, n, r * .7, 1.2, Q("text", ss), " opacity=\"0.5\" rx=\"0.6\""),
		fs(t, n + i * .12, r * .5, 1.2, Q("text", ss), " opacity=\"0.35\" rx=\"0.6\""),
		fs(t, n + i * .3, r, i * .14, Q("surface", os), " rx=\"1\""),
		fs(t, n + i * .5, r, i * .14, Q("surface", os), " rx=\"1\""),
		fs(t, n + i * .78, r * .45, i * .16, Q("accent", cs), " opacity=\"0.85\" rx=\"1.2\"")
	].join("") : fs(t, n, r, i, Q("surface", os), " rx=\"1.5\"");
}
function bs(e, t, n) {
	let r = Array.isArray(e?.blocks) ? e.blocks : [], i = r.map((e) => (e.frames?.desktop?.y ?? 0) + (e.frames?.desktop?.h ?? 0)), a = n / Math.max(us(e?.size?.minHeight), i.length ? Math.max(...i) + 16 : 0), o = [fs(0, 0, t, n, ps(e))];
	for (let r of e?.background?.layers ?? []) {
		if (r.type !== "glow") continue;
		let e = r.props ?? {};
		o.push(`<circle cx="${$(ds(e.x ?? .5, 0, 1) * t)}" cy="${$(ds(e.y ?? .3, 0, 1) * n)}" r="${$(t * ds(e.radius ?? .5, .1, 1) * .5)}" fill="${ls(e.color, cs)}" opacity="${$(ds(e.opacity ?? .3, 0, .5))}"/>`);
	}
	let s = t * .06, c = t - s * 2;
	for (let e of r) {
		let r = e.frames?.desktop;
		if (!r) continue;
		let i = ds(s + (r.x ?? 0) * (c / 100), 0, t - 2), l = ds((r.y ?? 0) * a, 0, n - 2), u = ds((r.w ?? 10) * (c / 100), 2, t - i), d = ds((r.h ?? 20) * a, 2, n - l);
		o.push(ys(e.type, i, l, u, d, e.props));
	}
	return o.join("");
}
function xs(e, { w: t = 96, h: n = 116, max: r = 6 } = {}) {
	let i = (Array.isArray(e?.sections) ? e.sections : []).slice(0, r);
	if (!i.length) return `<svg viewBox="0 0 ${t} ${n}" width="${t}" height="${n}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${fs(0, 0, t, n, Q("bg", as))}</svg>`;
	let a = i.map((e) => ds(us(e?.size?.minHeight), 160, 900)), o = a.reduce((e, t) => e + t, 0), s = n - 1 * (i.length - 1), c = [], l = 0;
	for (let e = 0; e < i.length; e += 1) {
		let n = Math.max(6, a[e] / o * s);
		c.push(`<g transform="translate(0 ${$(l)})">${bs(i[e], t, n)}</g>`), l += n + 1;
	}
	return `<svg viewBox="0 0 ${t} ${n}" width="${t}" height="${n}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${c.join("")}</svg>`;
}
//#endregion
//#region ../template/assets/engine/0.6.11/page-presets.js
var Ss = /* @__PURE__ */ new Map();
Vo({ sections: { define: (e, t) => Ss.set(e, t) } });
var Cs = [
	{
		id: "landing",
		labelKey: "pageTemplate.landing",
		sections: [
			"hero",
			"funksjonskort",
			"statistikk",
			"sitat",
			"cta"
		]
	},
	{
		id: "om-oss",
		labelKey: "pageTemplate.about",
		sections: [
			"hero-sentrert",
			"team",
			"tidslinje",
			"sponsorer",
			"cta"
		]
	},
	{
		id: "kontakt",
		labelKey: "pageTemplate.contact",
		sections: [
			"hero-sentrert",
			"kontakt",
			"faq"
		]
	},
	{
		id: "portefolje",
		labelKey: "pageTemplate.portfolio",
		sections: [
			"hero-sentrert",
			"galleri",
			"sitat",
			"cta"
		]
	},
	{
		id: "arrangement",
		labelKey: "pageTemplate.event",
		sections: [
			"hovedoppslag",
			"arrangementer",
			"steg",
			"faq",
			"cta"
		]
	},
	{
		id: "butikk",
		labelKey: "pageTemplate.butikk",
		sections: [
			"butikk-hero",
			"butikk",
			"faq",
			"cta"
		]
	},
	{
		id: "butikkforside",
		labelKey: "pageTemplate.butikkforside",
		sections: [
			"butikk-hero",
			"butikk",
			"butikk-kategorier",
			"butikk-utstilling",
			"butikk-tillit",
			"cta"
		]
	},
	{
		id: "kasse",
		labelKey: "pageTemplate.kasse",
		sections: ["kasse", "kontakt"]
	}
];
function ws(e, { pageId: t, title: n }) {
	let r = Cs.find((t) => t.id === e);
	return r ? {
		schemaVersion: 2,
		meta: {
			id: t,
			title: n
		},
		sections: r.sections.map((e) => Ss.get(e).create())
	} : null;
}
//#endregion
//#region ../template/assets/engine/0.6.11/palette-search.js
function Ts(e) {
	return String(e ?? "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}
function Es(e, t) {
	let n = Ts(t).trim(), r = Ts(e);
	return n ? r.startsWith(n) ? 0 : r.split(/[^a-z0-9]+/).some((e) => e.startsWith(n)) ? 1 : r.includes(n) ? 2 : -1 : 2;
}
function Ds(e, t, n) {
	return e.map((e, r) => ({
		item: e,
		i: r,
		rank: Es(n(e), t)
	})).filter((e) => e.rank >= 0).sort((e, t) => e.rank - t.rank || e.i - t.i).map((e) => e.item);
}
//#endregion
//#region ../template/assets/engine/0.6.11/theme.js
function Os(e, t, n) {
	return t === "light" || t === "dark" ? t : n ? "dark" : "light";
}
function ks(e, t) {
	let n = e.tokens || {}, r = e.scheme === "dark" ? "dark" : "light";
	if (!e.alt?.tokens || t === r) return n;
	let i = {};
	for (let t of /* @__PURE__ */ new Set([...Object.keys(n), ...Object.keys(e.alt.tokens)])) i[t] = {
		...n[t],
		...e.alt.tokens[t]
	};
	return i;
}
var As = /^[a-zA-Z0-9#%.,()'"\s+\-*/]+$/;
function js(e) {
	return typeof e == "string" && As.test(e) && !/url\(|\/\*|\*\/|expression/i.test(e);
}
function Ms(e) {
	let t = e.tokens || {}, n = ks(e, "light"), r = ks(e, "dark"), i = e.scheme === "dark" ? "dark" : "light", a = [], o = [], s = [], c = /* @__PURE__ */ new Set([
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
			js(c) && (a.push(`  --urd-${e}-${l}: ${c};`), i && a.push(`  --urd-base-${l}: ${c};`)), u !== d && (i && js(u) && js(d) ? o.push({
				name: l,
				lv: u,
				dv: d
			}) : !i && js(u) && js(d) && s.push({
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
function Ns(e) {
	return /^[a-z][a-z0-9-]*$/.test(e) ? `var(--urd-color-${e})` : e;
}
var Ps = {
	flate: {
		"--urd-color-bg": "var(--urd-base-surface)",
		"--urd-color-surface": "color-mix(in srgb, var(--urd-base-text) 7%, var(--urd-base-surface))"
	},
	aksent: {
		"--urd-color-bg": "var(--urd-base-accent)",
		"--urd-color-surface": "color-mix(in srgb, var(--urd-base-accent) 82%, #000)",
		"--urd-color-text": "var(--urd-base-accent-text)",
		"--urd-color-accent": "var(--urd-base-accent-text)",
		"--urd-color-accent-text": "var(--urd-base-accent)"
	},
	invers: {
		"--urd-color-bg": "var(--urd-base-text)",
		"--urd-color-surface": "color-mix(in srgb, var(--urd-base-text) 78%, var(--urd-base-bg))",
		"--urd-color-text": "var(--urd-base-bg)"
	},
	dus: {
		"--urd-color-bg": "color-mix(in srgb, var(--urd-base-accent) 12%, var(--urd-base-bg))",
		"--urd-color-surface": "color-mix(in srgb, var(--urd-base-accent) 8%, var(--urd-base-surface))"
	},
	dempet: {
		"--urd-color-bg": "color-mix(in srgb, var(--urd-base-text) 5%, var(--urd-base-bg))",
		"--urd-color-surface": "color-mix(in srgb, var(--urd-base-text) 10%, var(--urd-base-bg))",
		"--urd-color-text": "color-mix(in srgb, var(--urd-base-text) 82%, var(--urd-base-bg))"
	},
	dyp: {
		"--urd-color-bg": "color-mix(in srgb, var(--urd-base-accent) 30%, var(--urd-base-text))",
		"--urd-color-surface": "color-mix(in srgb, var(--urd-base-accent) 40%, var(--urd-base-text))",
		"--urd-color-text": "var(--urd-base-bg)"
	},
	uthevet: { "--urd-color-surface": "color-mix(in srgb, var(--urd-base-accent) 14%, var(--urd-base-surface))" }
}, Fs = {
	flate: "sectionTheme.flate",
	aksent: "sectionTheme.aksent",
	invers: "sectionTheme.invers",
	dus: "sectionTheme.dus",
	dempet: "sectionTheme.dempet",
	dyp: "sectionTheme.dyp",
	uthevet: "sectionTheme.uthevet"
};
[...new Set(Object.values(Ps).flatMap(Object.keys))];
function Is(e) {
	return Ps[e] ?? {};
}
function Ls(e) {
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
function Rs(e, t) {
	let n = Ls(e), r = Ls(t);
	return n == null || r == null ? null : (Math.max(n, r) + .05) / (Math.min(n, r) + .05);
}
//#endregion
//#region ../template/assets/engine/0.6.11/backgrounds/color.js
var zs = {
	version: 1,
	label: "Farge",
	labelKey: "bgLayer.color",
	defaults: () => ({
		value: "bg",
		opacity: 1
	}),
	migrations: {},
	render(e, t) {
		e.style.background = Ns(t.value), e.style.opacity = String(t.opacity ?? 1);
	}
}, Bs = {
	linear: [
		"pan",
		"pan-loop",
		"rotate"
	],
	radial: ["pulse", "orbit"]
};
function Vs(e) {
	let t = Array.isArray(e) && e.length ? e : [{ color: "#0b0e14" }, { color: "#1a1030" }], n = t.map((e) => Math.max(0, Number(e?.share) || 0)), r = n.reduce((e, t) => e + t, 0), i = r <= 0, a = i ? t.length : r, o = 0;
	return t.map((e, t) => {
		let r = i ? 1 : n[t], s = (o + r / 2) / a * 100;
		return o += r, {
			color: e?.color ?? "#0b0e14",
			at: Math.round(s * 100) / 100
		};
	});
}
function Hs(e) {
	let t = (e) => Math.round(e * 100) / 100, n = e[0]?.at ?? 0;
	return [...e.map((e) => ({
		color: e.color,
		at: t(e.at - n)
	})), {
		color: e[0]?.color ?? "#0b0e14",
		at: 100
	}];
}
function Us(e, t, n, r = .5) {
	let i = n % 360 * Math.PI / 180, a = (e) => Math.round(e * 100) / 100 || 0, o = (Math.abs(e * Math.sin(i)) + Math.abs(t * Math.cos(i))) / (1 - Math.min(Math.max(r, 0), .9));
	return {
		period: a(o),
		dx: a(Math.sin(i) * o),
		dy: a(-Math.cos(i) * o)
	};
}
function Ws(e, t, n) {
	return `repeating-linear-gradient(${t}deg, ${e.map((e) => `${Ns(e.color)} ${Math.round(e.at / 100 * n * 100) / 100}px`).join(", ")})`;
}
function Gs(e) {
	let t = e.kind === "radial" ? "radial" : "linear", n = (Bs[t] ?? []).includes(e.animation) ? e.animation : null, r = Vs(e.stops), i = r.map((e) => `${Ns(e.color)} ${e.at}%`).join(", "), a = {}, o;
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
					stops: Hs(r),
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
var Ks = /* @__PURE__ */ new Set(), qs = !1;
function Js(e) {
	Ks.add(e), !(qs || typeof window > "u") && (qs = !0, window.addEventListener("resize", () => {
		for (let e of [...Ks]) e() || Ks.delete(e);
	}));
}
var Ys = !1;
function Xs() {
	if (!Ys) {
		Ys = !0;
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
var Zs = {
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
		let n = Gs(t);
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
					let e = Us(r, i, n.loop.angle, n.loop.maxShare);
					t.style.inset = `${-Math.ceil(e.period)}px`, t.style.background = Ws(n.loop.stops, n.loop.angle, e.period), t.style.setProperty("--urd-loop-dx", `${e.dx}px`), t.style.setProperty("--urd-loop-dy", `${e.dy}px`);
				}
				return !0;
			};
			requestAnimationFrame(r), Js(r);
			return;
		}
		if (n.runner) {
			e.classList.add("urd-bg-loop-host");
			let t = document.createElement("div");
			t.className = n.runner.className, t.style.background = n.runner.background, n.runner.left != null && (t.style.left = n.runner.left), n.runner.top != null && (t.style.top = n.runner.top), e.appendChild(t);
			return;
		}
		e.style.background = n.background, n.className && (e.classList.add(n.className), n.className === "urd-bg-rotate" && Xs());
	}
}, Qs = {
	version: 1,
	label: "Glød",
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
		let n = Ns(t.color), r = t.x ?? .5, i = t.y ?? .3, a = t.radius ?? .5;
		e.style.background = `radial-gradient(circle at ${r * 100}% ${i * 100}%, ${n} 0%, transparent ${a * 100}%)`, e.style.opacity = String(t.opacity ?? .35);
	}
}, $s = "url(\"data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22128%22%20height%3D%22128%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%222%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22128%22%20height%3D%22128%22%20filter%3D%22url(%23n)%22%2F%3E%3C%2Fsvg%3E\")", ec = {
	version: 1,
	label: "Korn",
	labelKey: "bgLayer.grain",
	defaults: () => ({ opacity: .06 }),
	migrations: {},
	render(e, t) {
		e.style.backgroundImage = $s, e.style.backgroundRepeat = "repeat", e.style.opacity = String(t.opacity ?? .06);
	}
}, tc = /^(?:data:image\/[\w.+-]+;base64,[A-Za-z0-9+/=]+|\/(?!\/)[\w%./-]*)$/;
function nc(e) {
	return typeof e == "string" && tc.test(e);
}
//#endregion
//#region ../template/assets/engine/0.6.11/backgrounds/image.js
var rc = .4;
function ic(e, t) {
	return `${(e ?? .5) * 100}% ${(t ?? .5) * 100}%`;
}
function ac(e, t) {
	return e === "contain" ? "contain" : e === "cover" ? "cover" : `${Math.max(0, t ?? 1) * 100}%`;
}
function oc(e) {
	let t = "-9999px";
	return e === "up" ? `inset(${t} 0 0 0)` : e === "down" ? `inset(0 0 ${t} 0)` : e === "both" ? `inset(${t} 0 ${t} 0)` : "inset(0)";
}
function sc(e, t, n, r = .18) {
	let i = Math.max(0, Math.min(1, n)) * rc * t;
	return Math.round(Math.min(i, r * e));
}
function cc(e, t, n, r, i) {
	let a = e + t / 2, o = (n / 2 - a) * Math.max(0, Math.min(1, r)) * rc, s = i ?? sc(t, n, r);
	return Math.max(-s, Math.min(s, o)) || 0;
}
var lc = /* @__PURE__ */ new Set(), uc = !1, dc = 0;
function fc() {
	dc = 0;
	for (let e of [...lc]) e() || lc.delete(e);
}
function pc() {
	dc ||= requestAnimationFrame(fc);
}
function mc(e) {
	lc.add(e), e(), !(uc || typeof window > "u") && (uc = !0, window.addEventListener("scroll", pc, { passive: !0 }), window.addEventListener("resize", pc, { passive: !0 }));
}
function hc(e, t, n, r) {
	let i = r === "cover" || r === "flislegg" || r === "repeat", a = e.closest(".urd-section") ?? e.parentElement?.closest(".urd-section") ?? e.parentElement, o = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
	e.style.willChange = "transform";
	let s = (t) => {
		e.style.top = `-${t}px`, e.style.bottom = `-${t}px`;
	}, c = () => {
		if (!e.isConnected) return !1;
		if (o || document.body.classList.contains("urd-mobile")) return s(n), e.style.transform = "", !0;
		let r = (a ?? e).getBoundingClientRect(), c = window.innerHeight || document.documentElement.clientHeight, l = sc(r.height, c, t, i ? .18 : .6);
		s(i ? Math.max(n, l) : n);
		let u = cc(r.top, r.height, c, t, l);
		return e.style.transform = `translateY(${u.toFixed(1)}px)`, !0;
	};
	mc(c), typeof requestAnimationFrame == "function" && requestAnimationFrame(() => requestAnimationFrame(c));
}
function gc() {
	return typeof CSS < "u" && typeof CSS.supports == "function" && CSS.supports("animation-timeline", "view()");
}
var _c = /* @__PURE__ */ new Set(), vc = !1, yc = 0;
function bc() {
	yc = 0;
	for (let e of [..._c]) e() || _c.delete(e);
}
function xc() {
	!yc && typeof requestAnimationFrame == "function" && (yc = requestAnimationFrame(bc));
}
function Sc(e) {
	_c.add(e), e(), !(vc || typeof window > "u") && (vc = !0, window.addEventListener("resize", xc, { passive: !0 }));
}
function Cc(e, t, n, r) {
	let i = r === "cover" || r === "flislegg" || r === "repeat", a = e.closest(".urd-section") ?? e.parentElement?.closest(".urd-section") ?? e.parentElement;
	e.style.willChange = "transform", e.classList.add("urd-parallax-css");
	let o = () => {
		if (!e.isConnected) return !1;
		let r = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches || document.body.classList.contains("urd-mobile"), o = (a ?? e).getBoundingClientRect(), s = window.innerHeight || document.documentElement.clientHeight, c = sc(o.height, s, t, i ? .18 : .6), l = i && !r ? Math.max(n, c) : n;
		return e.style.setProperty("--urd-px-shift", `${c}px`), e.style.top = `-${l}px`, e.style.bottom = `-${l}px`, !0;
	};
	Sc(o), typeof requestAnimationFrame == "function" && requestAnimationFrame(() => requestAnimationFrame(o));
}
var wc = {
	version: 1,
	label: "Bilde",
	labelKey: "bgLayer.image",
	defaults: () => ({
		src: "",
		fit: "vanlig",
		x: .5,
		y: .5,
		size: 1,
		opacity: 1,
		blur: 0,
		parallax: 0,
		bleed: "none"
	}),
	migrations: {},
	render(e, t) {
		if (!nc(t.src)) return;
		e.style.opacity = String(t.opacity ?? 1), e.style.clipPath = oc(t.bleed), e.style.zIndex = t.bleed === "down" || t.bleed === "both" ? "1" : "";
		let n = document.createElement("div");
		n.className = "urd-bg-image", n.style.position = "absolute", n.style.left = "0", n.style.right = "0", n.style.top = "0", n.style.bottom = "0";
		let r = t.fit === "flislegg" || t.fit === "repeat";
		n.style.backgroundImage = `url("${t.src}")`, n.style.backgroundSize = ac(t.fit, t.size), n.style.backgroundRepeat = r ? "repeat" : "no-repeat", n.style.backgroundPosition = ic(t.x, t.y);
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
		e.appendChild(n), t.parallax > 0 && Tc(n, t.parallax, i, t.fit ?? "cover");
	}
};
function Tc(e, t, n, r) {
	gc() ? Cc(e, t, n, r) : hc(e, t, n, r);
}
//#endregion
//#region ../template/assets/engine/0.6.11/galleri-model.js
function Ec(e, t, n) {
	return !Number.isFinite(n) || n < 1 ? 0 : (((Number.isFinite(e) ? e : 0) + t) % n + n) % n;
}
function Dc({ count: e = 0, reducedMotion: t = !1 } = {}) {
	return e >= 2 && !t;
}
function Oc(e, { min: t = 2, fallback: n = 5 } = {}) {
	let r = Number(e);
	return !Number.isFinite(r) || r <= 0 ? n : Math.max(t, r);
}
//#endregion
//#region ../template/assets/engine/0.6.11/backgrounds/bildegalleri.js
var kc = {
	version: 1,
	label: "Bildegalleri",
	labelKey: "bgLayer.bildegalleri",
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
		let n = (t.images ?? []).filter((e) => nc(e?.src));
		if (!n.length) return;
		e.classList.add("urd-bg-galleri"), e.style.opacity = String(t.opacity ?? 1), t.blur > 0 && (e.style.filter = `blur(${t.blur}px)`, e.style.inset = `-${t.blur * 2}px`);
		let r = Math.max(0, Number(t.fade) || 0);
		e.style.setProperty("--urd-bgg-fade", `${r}s`);
		let i = (e, n) => {
			e.style.backgroundImage = `url("${n.src}")`, e.style.backgroundSize = ac(t.fit), e.style.backgroundRepeat = "no-repeat", e.style.backgroundPosition = ic(n.x, n.y);
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
		if (!Dc({
			count: n.length,
			reducedMotion: s
		})) return;
		let c = document.createElement("div");
		c.className = "urd-bg-slide", e.appendChild(c);
		let l = 0, u = o, d = Math.max(Oc(t.interval, { fallback: 6 }), r + .5) * 1e3, f = setInterval(() => {
			if (!e.isConnected) {
				clearInterval(f);
				return;
			}
			if (document.hidden) return;
			let t = Ec(l, 1, n.length), r = new Image();
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
}, Ac = /^(?:data:video\/[\w.+-]+;base64,[A-Za-z0-9+/=]+|\/media\/[\w%./-]+\.(?:mp4|webm))$/i;
function jc(e) {
	return typeof e == "string" && Ac.test(e);
}
var Mc = null;
function Nc(e) {
	Mc ??= new IntersectionObserver((e) => {
		for (let t of e) {
			if (!t.target.isConnected) {
				Mc.unobserve(t.target);
				continue;
			}
			t.isIntersecting ? t.target.play().catch(() => {}) : t.target.pause();
		}
	}, { threshold: 0 }), Mc.observe(e);
}
var Pc = (e, t, n, r) => {
	e.style.position = "absolute", e.style.inset = "0", e.style.width = "100%", e.style.height = "100%", e.style.objectFit = t === "contain" ? "contain" : "cover", e.style.objectPosition = ic(n, r);
}, Fc = {
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
		if (!jc(t.src)) return;
		if (e.style.opacity = String(t.opacity ?? 1), window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
			if (!nc(t.poster)) return;
			let n = document.createElement("img");
			n.className = "urd-bg-video-plakat", n.alt = "", n.setAttribute("aria-hidden", "true"), n.src = t.poster, Pc(n, t.fit, t.x, t.y), e.appendChild(n);
			return;
		}
		let n = document.createElement("video");
		n.className = "urd-bg-video", n.muted = !0, n.setAttribute("muted", ""), n.loop = !0, n.playsInline = !0, n.setAttribute("playsinline", ""), n.preload = "metadata", n.disablePictureInPicture = !0, n.setAttribute("aria-hidden", "true"), nc(t.poster) && (n.poster = t.poster), n.src = t.src, Pc(n, t.fit, t.x, t.y), e.appendChild(n), Nc(n), t.parallax > 0 && Tc(n, t.parallax, 0, t.fit === "contain" ? "contain" : "cover");
	}
};
//#endregion
//#region ../template/assets/engine/0.6.11/footer-thumb.js
function Ic(e = {}) {
	let t = "#2fd6b6", n = "#5c6b64", r = e.mega ? "#16221d" : "#0e1512", i = e.cols ?? 0, a = e.social ?? 0, o = `<svg viewBox="0 0 160 80" preserveAspectRatio="none" aria-hidden="true"><rect width="160" height="80" fill="${r}"/>`;
	if (e.mega && (o += `<circle cx="20" cy="6" r="34" fill="${t}" opacity="0.18"/>`), e.bigcta) return o += `<rect x="45" y="18" width="70" height="8" rx="3" fill="${n}" opacity="0.85"/>`, o += `<rect x="56" y="32" width="48" height="4" rx="2" fill="${n}" opacity="0.5"/>`, o += `<rect x="62" y="43" width="36" height="10" rx="3" fill="${t}"/>`, o += Lc(n, e.baselineLinks), o + "</svg>";
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
	return o += Lc(n, e.baselineLinks), o + "</svg>";
}
function Lc(e, t = 0) {
	let n = `<line x1="8" y1="66" x2="152" y2="66" stroke="${e}" stroke-width="0.6" opacity="0.5"/>`;
	return n += `<rect x="8" y="70" width="40" height="3" rx="1.5" fill="${e}" opacity="0.6"/>`, t && (n += `<g fill="${e}" opacity="0.6">` + Array.from({ length: t }, (e, t) => `<rect x="${120 - t * 16}" y="70" width="12" height="3" rx="1.5"/>`).join("") + "</g>"), n;
}
//#endregion
//#region ../template/assets/engine/0.6.11/animations/core.js
var Rc = () => ({
	duration: 600,
	delay: 0
}), zc = 90, Bc = {
	"fade-in": {
		version: 1,
		label: "Ton inn",
		labelKey: "anim.fadeIn",
		entrance: !0,
		defaults: Rc,
		migrations: {}
	},
	"slide-up": {
		version: 1,
		label: "Gli opp",
		labelKey: "anim.slideUp",
		entrance: !0,
		defaults: Rc,
		migrations: {}
	},
	"zoom-in": {
		version: 1,
		label: "Zoom inn",
		labelKey: "anim.zoomIn",
		entrance: !0,
		defaults: Rc,
		migrations: {}
	},
	"hover-lift": {
		version: 1,
		label: "Løft ved peker",
		labelKey: "anim.hoverLift",
		entrance: !1,
		defaults: () => ({}),
		migrations: {}
	},
	stagger: {
		version: 1,
		label: "Stagger (kortgruppe)",
		labelKey: "anim.stagger",
		entrance: !0,
		group: !0,
		defaults: () => ({
			duration: 600,
			delay: 0,
			step: zc,
			effect: "slide-up",
			pattern: "sequence"
		}),
		migrations: {}
	}
}, Vc = [
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
function Hc(e) {
	let t = (e) => Math.round(e * 100) / 100, n = Math.max(0, t(100 - e.w)), r = Math.min(n, Math.max(0, t(e.x - e.w / 2))), i = Math.max(0, e.y - e.h / 2), a = e.snap === !1 || e.grid?.snap === !1, o = e.grid?.size || 8;
	return i = a ? Math.round(i) : Math.round(i / o) * o, {
		x: r,
		y: Math.max(0, i)
	};
}
//#endregion
//#region src/App.svelte
var Uc = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), Wc = /* @__PURE__ */ B("<button class=\"ghost row-tool svelte-1n46o8q\"></button>"), Gc = /* @__PURE__ */ B("<span><span class=\"grad-grip svelte-1n46o8q\"><svg viewBox=\"0 0 16 16\" width=\"14\" height=\"14\" fill=\"currentColor\" aria-hidden=\"true\"><circle cx=\"5\" cy=\"3\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"3\" r=\"1.4\"></circle><circle cx=\"5\" cy=\"8\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"8\" r=\"1.4\"></circle><circle cx=\"5\" cy=\"13\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"13\" r=\"1.4\"></circle></svg></span> <!> <input type=\"range\" class=\"tb-grow svelte-1n46o8q\" min=\"0\" max=\"100\" step=\"1\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span> <!></span>"), Kc = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), qc = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"360\" step=\"5\" class=\"svelte-1n46o8q\"/>", 1), Jc = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <!></label> <!> <button class=\"ghost action svelte-1n46o8q\"> </button> <!> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label>", 1), Yc = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), Xc = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.01\" max=\"0.3\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), Zc = /* @__PURE__ */ B("<div class=\"sizefill svelte-1n46o8q\"><button type=\"button\" class=\"ghost svelte-1n46o8q\"> </button> <button type=\"button\" class=\"ghost svelte-1n46o8q\"> </button></div> <label class=\"svelte-1n46o8q\"> </label> <div class=\"focalpad svelte-1n46o8q\"><span class=\"focaldot svelte-1n46o8q\"></span></div> <label class=\"sub svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"-0.5\" max=\"1.5\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"sub svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"-0.5\" max=\"1.5\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), Qc = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label>", 1), $c = /* @__PURE__ */ B("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> </label> <div class=\"sizestep svelte-1n46o8q\"><button type=\"button\" class=\"svelte-1n46o8q\">−</button> <input type=\"number\" min=\"10\" max=\"400\" class=\"svelte-1n46o8q\"/> <span class=\"sizeunit svelte-1n46o8q\">%</span> <button type=\"button\" class=\"svelte-1n46o8q\">+</button></div> <!> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"20\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), el = /* @__PURE__ */ B("<span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), tl = /* @__PURE__ */ B("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"2\" max=\"120\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"5\" step=\"0.1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"20\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <p class=\"panel-hint svelte-1n46o8q\"> </p>", 1), nl = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), rl = /* @__PURE__ */ B("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"video/mp4,video/webm\" class=\"svelte-1n46o8q\"/></label> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"sub svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"sub svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), il = /* @__PURE__ */ B("<div class=\"bg-layer svelte-1n46o8q\"><span class=\"nav-line svelte-1n46o8q\"><!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <!></div>"), al = /* @__PURE__ */ B("<!> <label class=\"svelte-1n46o8q\"> <!></label> <button class=\"ghost action svelte-1n46o8q\"> </button>", 1), ol = /* @__PURE__ */ B("<input class=\"nav-target svelte-1n46o8q\"/>"), sl = /* @__PURE__ */ B("<div class=\"nav-row nav-sub-row svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <span class=\"nav-target svelte-1n46o8q\"><!></span> <!></div>"), cl = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <!></label>"), ll = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"num-stepper svelte-1n46o8q\"><button type=\"button\" class=\"svelte-1n46o8q\">−</button> <input type=\"number\" min=\"1\" max=\"12\" step=\"1\" class=\"svelte-1n46o8q\"/> <button type=\"button\" class=\"svelte-1n46o8q\">+</button></span></label>", 1), ul = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), dl = /* @__PURE__ */ B("<p class=\"panel-hint svelte-1n46o8q\"> </p>"), fl = /* @__PURE__ */ B("<span class=\"nav-line svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span>"), pl = /* @__PURE__ */ B("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <button class=\"ghost action svelte-1n46o8q\"> </button>", 1), ml = /* @__PURE__ */ B("<span class=\"nav-line svelte-1n46o8q\"><input class=\"tl-year svelte-1n46o8q\"/> <input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <input class=\"svelte-1n46o8q\"/>", 1), hl = /* @__PURE__ */ B("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <button class=\"ghost action svelte-1n46o8q\"> </button>", 1), gl = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), _l = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), vl = /* @__PURE__ */ B("<span class=\"toolbar-row svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button></span> <span class=\"toolbar-row svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button></span> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), yl = /* @__PURE__ */ B("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>"), bl = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <input type=\"datetime-local\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), xl = /* @__PURE__ */ B("<button class=\"ghost svelte-1n46o8q\"> </button>"), Sl = /* @__PURE__ */ B("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"audio/*\" class=\"svelte-1n46o8q\"/></label> <!> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), Cl = /* @__PURE__ */ B("<input class=\"svelte-1n46o8q\"/>"), wl = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <!>", 1), Tl = /* @__PURE__ */ B("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <!>", 1), El = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> </label> <input class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), Dl = /* @__PURE__ */ B("<input class=\"token-input svelte-1n46o8q\" maxlength=\"4\"/>"), Ol = /* @__PURE__ */ B("<span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\"/> <button class=\"ghost svelte-1n46o8q\"> </button></span>"), kl = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <span class=\"toolbar-row svelte-1n46o8q\"><!> <!></span></label> <!>", 1), Al = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), jl = /* @__PURE__ */ B("<span class=\"toolbar-row svelte-1n46o8q\"><button class=\"ghost action svelte-1n46o8q\"> </button> <button class=\"ghost action svelte-1n46o8q\"> </button></span>"), Ml = /* @__PURE__ */ B("<button class=\"ghost action svelte-1n46o8q\"> </button>"), Nl = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), Pl = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), Fl = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <input type=\"email\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"url\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), Il = /* @__PURE__ */ B("<div class=\"bg-layer svelte-1n46o8q\"><span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label></div>"), Ll = /* @__PURE__ */ B("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label> <!>", 1), Rl = /* @__PURE__ */ B("<p> </p>"), zl = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <input type=\"text\" class=\"svelte-1n46o8q\"/></label> <button class=\"ghost svelte-1n46o8q\"> </button> <!>", 1), Bl = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <input type=\"number\" class=\"svelte-1n46o8q\"/></label>"), Vl = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <input type=\"text\" class=\"svelte-1n46o8q\"/></label>"), Hl = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Ul = /* @__PURE__ */ B("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Wl = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Gl = /* @__PURE__ */ B("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!>", 1), Kl = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), ql = /* @__PURE__ */ B("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Jl = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Yl = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"24\" max=\"64\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Xl = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Zl = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"1\" max=\"3\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.2\" max=\"2\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.2\" max=\"2\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"2\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\"> </button> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Ql = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"8\" max=\"400\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), $l = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"6\" class=\"svelte-1n46o8q\"/></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), eu = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" max=\"6\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"32\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), tu = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"2\" max=\"60\" class=\"svelte-1n46o8q\"/></label>"), nu = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <!></label> <!> <!> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), ru = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" max=\"40\" class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), iu = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"100\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label>", 1), au = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"400\" class=\"svelte-1n46o8q\"/></label>"), ou = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <!></label> <!> <!>", 1), su = /* @__PURE__ */ B("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), cu = /* @__PURE__ */ B("<div class=\"frame-grid svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"0.5\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"0.5\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label></div>"), lu = /* @__PURE__ */ B("<!> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label></div></details>", 1), uu = /* @__PURE__ */ B("<div class=\"props-tabs svelte-1n46o8q\"><span class=\"seg svelte-1n46o8q\"><button type=\"button\"> </button> <button type=\"button\"> </button></span></div> <!>", 1), du = /* @__PURE__ */ B("<button class=\"chrome-restore svelte-1n46o8q\"><!> </button>"), fu = /* @__PURE__ */ B("<button><!> </button>"), pu = /* @__PURE__ */ B("<div class=\"tool-pop svelte-1n46o8q\"></div>"), mu = /* @__PURE__ */ B("<span class=\"toolmenu svelte-1n46o8q\"><button><!><!></button> <!></span>"), hu = /* @__PURE__ */ B("<button></button>"), gu = /* @__PURE__ */ B("<span class=\"tool-cap svelte-1n46o8q\"> </span> <span class=\"viewswitch toolgrp svelte-1n46o8q\"></span>", 1), _u = /* @__PURE__ */ B("<div class=\"tool-pop svelte-1n46o8q\"><div class=\"tool-pop-row svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"></button> <span class=\"zoom-readout svelte-1n46o8q\"> </span> <button class=\"ghost svelte-1n46o8q\"></button></div> <button><!> </button></div>"), vu = /* @__PURE__ */ B("<span class=\"toolmenu svelte-1n46o8q\"><button><span class=\"zoom-cap svelte-1n46o8q\"> </span><!></button> <!></span>"), yu = /* @__PURE__ */ B("<span class=\"tool-cap svelte-1n46o8q\"> </span> <span class=\"zoomswitch toolgrp svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"></button> <span class=\"zoom-readout svelte-1n46o8q\"> </span> <button class=\"ghost svelte-1n46o8q\"></button> <button></button></span>", 1), bu = /* @__PURE__ */ B("<div class=\"tool-pop svelte-1n46o8q\"><button><!> </button> <button><!> </button></div>"), xu = /* @__PURE__ */ B("<span class=\"tool-cap svelte-1n46o8q\"> </span> <span class=\"toolgrp svelte-1n46o8q\"><button></button> <button></button></span>", 1), Su = /* @__PURE__ */ B("<button class=\"ghost page-btn svelte-1n46o8q\"> </button> <span class=\"toolset svelte-1n46o8q\"><!> <!> <!></span>", 1), Cu = /* @__PURE__ */ B("<button class=\"badge attention svelte-1n46o8q\"><!> <span class=\"btn-label svelte-1n46o8q\"> </span> <span class=\"badge-mini svelte-1n46o8q\"> </span></button>"), wu = /* @__PURE__ */ B("<button class=\"discard-confirm svelte-1n46o8q\"><!> </button>"), Tu = /* @__PURE__ */ B("<span class=\"draft-cluster svelte-1n46o8q\"><span class=\"chip draft-chip svelte-1n46o8q\"><span class=\"chip-full svelte-1n46o8q\" aria-hidden=\"true\"> </span> <span class=\"chip-mini svelte-1n46o8q\" aria-hidden=\"true\">!</span></span>  <span class=\"discard-wrap svelte-1n46o8q\"><button><!><span class=\"discard-label svelte-1n46o8q\"> </span></button> <!></span></span>"), Eu = /* @__PURE__ */ B("<!> <span class=\"btn-label svelte-1n46o8q\"> </span>", 1), Du = /* @__PURE__ */ B("<span class=\"who svelte-1n46o8q\"><!> </span>"), Ou = /* @__PURE__ */ B("<a class=\"ghost svelte-1n46o8q\" href=\"/api/github/login\"> </a>"), ku = /* @__PURE__ */ B("<button class=\"ghost svelte-1n46o8q\"><!></button> <!> <a class=\"ghost svelte-1n46o8q\" target=\"_blank\" rel=\"noopener\"><!> <span class=\"btn-label svelte-1n46o8q\"> </span></a> <button class=\"primary svelte-1n46o8q\"> </button>", 1), Au = /* @__PURE__ */ B("<button> </button>"), ju = /* @__PURE__ */ B("<span class=\"rail-group svelte-1n46o8q\"> </span> <!>", 1), Mu = /* @__PURE__ */ B("<div class=\"settings-pop svelte-1n46o8q\"><p class=\"panel-strong svelte-1n46o8q\"> </p> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label></div>"), Nu = /* @__PURE__ */ B("<span class=\"page-path svelte-1n46o8q\">/</span>"), Pu = /* @__PURE__ */ B("<input class=\"page-slug svelte-1n46o8q\"/>"), Fu = /* @__PURE__ */ B("<span class=\"seo-warn svelte-1n46o8q\"></span>"), Iu = /* @__PURE__ */ B("<button class=\"ghost danger svelte-1n46o8q\"><!> </button>"), Lu = /* @__PURE__ */ B("<div class=\"page-menu svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"><!> </button> <!></div>"), Ru = /* @__PURE__ */ B("<div><input class=\"page-title svelte-1n46o8q\"/> <!> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <span class=\"page-menu-wrap svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <!></span></span></div>"), zu = /* @__PURE__ */ B("<img class=\"site-icon-preview svelte-1n46o8q\"/>"), Bu = /* @__PURE__ */ B("<div><button class=\"page-mal-pick svelte-1n46o8q\"><span class=\"page-mal-thumb svelte-1n46o8q\"></span> <span class=\"page-mal-name svelte-1n46o8q\"> </span></button></div>"), Vu = /* @__PURE__ */ B("<div><button class=\"page-mal-pick svelte-1n46o8q\"><span class=\"page-mal-thumb svelte-1n46o8q\"></span> <span class=\"page-mal-name svelte-1n46o8q\"> </span></button> <button class=\"page-mal-del svelte-1n46o8q\"></button></div>"), Hu = /* @__PURE__ */ B("<span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"page-mal-grid svelte-1n46o8q\"></div>", 1), Uu = /* @__PURE__ */ B("<div class=\"panel-body svelte-1n46o8q\"><!> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <textarea rows=\"2\" class=\"svelte-1n46o8q\"></textarea></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <textarea rows=\"2\" class=\"svelte-1n46o8q\"></textarea></label> <label class=\"svelte-1n46o8q\"> <!></label> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <input class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\"> </button> <span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"page-mal-grid svelte-1n46o8q\"><div><button class=\"page-mal-pick svelte-1n46o8q\"><span class=\"page-mal-thumb svelte-1n46o8q\"></span> <span class=\"page-mal-name svelte-1n46o8q\"> </span></button></div> <!></div> <!></div>"), Wu = /* @__PURE__ */ B("<input class=\"svelte-1n46o8q\"/> <span class=\"toolbar-row svelte-1n46o8q\"><!> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"8\" max=\"96\" placeholder=\"px\"/> <button><b> </b></button> <button><i> </i></button></span>", 1), Gu = /* @__PURE__ */ B("<span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"12\" max=\"128\"/> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"0\" max=\"64\"/></span>"), Ku = /* @__PURE__ */ B("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), qu = /* @__PURE__ */ B("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), Ju = /* @__PURE__ */ B("<div class=\"nav-row svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <span class=\"nav-target svelte-1n46o8q\"><!></span> <!></div> <!>", 1), Yu = /* @__PURE__ */ B("<div class=\"panel-body svelte-1n46o8q\"><details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <!></label> <!> <!> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <!></label> <!> <!> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <!> <!> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" max=\"4\" class=\"svelte-1n46o8q\"/></label></div></details> <details class=\"group svelte-1n46o8q\" open=\"\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\"> </button></div></details></div>"), Xu = /* @__PURE__ */ B("<div class=\"cw-row svelte-1n46o8q\"><span class=\"mini-label cw-screen svelte-1n46o8q\"> </span> <span><span class=\"cw-fill svelte-1n46o8q\"></span></span> <span class=\"gridmenu-value cw-margin svelte-1n46o8q\"> </span></div>"), Zu = /* @__PURE__ */ B("<div class=\"mini-label cw-binds svelte-1n46o8q\"> </div>"), Qu = /* @__PURE__ */ B("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"range\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div>"), $u = /* @__PURE__ */ B("<button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button>", 1), ed = /* @__PURE__ */ B("<div class=\"panel-body svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <div class=\"sample cw-sample svelte-1n46o8q\"><!> <div class=\"cw-legend svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <span class=\"mini-label svelte-1n46o8q\"> </span></div> <!></div> <div class=\"seg cw-seg svelte-1n46o8q\"></div> <!> <p class=\"mini-label svelte-1n46o8q\"> </p> <div class=\"seg cw-seg svelte-1n46o8q\"></div> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"range\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span></div>"), td = /* @__PURE__ */ B("<div class=\"mini-label tpv-cap svelte-1n46o8q\"> </div>"), nd = /* @__PURE__ */ B("<div class=\"theme-pvw svelte-1n46o8q\"><!> <div class=\"tpv-demo svelte-1n46o8q\"><div class=\"tpv-h svelte-1n46o8q\"> </div> <div class=\"tpv-card svelte-1n46o8q\"> </div> <div class=\"tpv-row svelte-1n46o8q\"><span class=\"tpv-btn svelte-1n46o8q\"> </span><span class=\"tpv-lnk svelte-1n46o8q\"> </span></div></div></div>"), rd = /* @__PURE__ */ B("<button type=\"button\"><span class=\"tp-band svelte-1n46o8q\"><i class=\"svelte-1n46o8q\"></i><i class=\"svelte-1n46o8q\"></i><i class=\"svelte-1n46o8q\"></i><i class=\"svelte-1n46o8q\"></i></span> <small class=\"svelte-1n46o8q\"> </small></button>"), id = /* @__PURE__ */ B("<div class=\"ctl-row autorow svelte-1n46o8q\"><span class=\"autolbl svelte-1n46o8q\"> </span> <span class=\"seg svelte-1n46o8q\"><button type=\"button\"> </button> <button type=\"button\"> </button></span></div>"), ad = /* @__PURE__ */ B("<span class=\"mini-label svelte-1n46o8q\"> </span>"), od = /* @__PURE__ */ B("<div class=\"palcol svelte-1n46o8q\"><!> <span class=\"palcap svelte-1n46o8q\"> </span> <b class=\"palhex svelte-1n46o8q\"> </b></div>"), sd = /* @__PURE__ */ B("<div class=\"ctl-row palhead svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <button type=\"button\"> </button></div> <div></div>", 1), cd = /* @__PURE__ */ B("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-strong svelte-1n46o8q\"> </p> <div class=\"theme-presets svelte-1n46o8q\"></div> <p class=\"panel-strong svelte-1n46o8q\"> </p> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <div class=\"ctl-row palhead svelte-1n46o8q\"><!> <button type=\"button\"> </button></div> <div class=\"palcells svelte-1n46o8q\"></div> <!> <div class=\"theme-previews svelte-1n46o8q\"><!> <!></div> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <div class=\"sample typo-sample svelte-1n46o8q\"><div class=\"ts-h svelte-1n46o8q\"> </div> <div class=\"ts-b svelte-1n46o8q\"> </div></div></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"sample form-prev svelte-1n46o8q\"><span class=\"fp-btn svelte-1n46o8q\"> </span> <span class=\"fp-card svelte-1n46o8q\"> </span></div> <label class=\"ctl-row svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"24\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"ctl-row svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"40\" step=\"1\" class=\"svelte-1n46o8q\"/></div></details></div>"), ld = /* @__PURE__ */ B("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label>"), ud = /* @__PURE__ */ B("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label>"), dd = /* @__PURE__ */ B("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"></div></details>"), fd = /* @__PURE__ */ B("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button></div></details> <button class=\"ghost svelte-1n46o8q\"> </button> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button></div></details> <!> <!>", 1), pd = /* @__PURE__ */ B("<div><input type=\"text\" class=\"svelte-1n46o8q\"/> <!></div>"), md = /* @__PURE__ */ B("<div class=\"panel-body svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label></div>"), hd = /* @__PURE__ */ B("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!>", 1), gd = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), _d = /* @__PURE__ */ B("<button><span class=\"rs-sample svelte-1n46o8q\"><i class=\"rs-line svelte-1n46o8q\"></i> <i class=\"rs-chip svelte-1n46o8q\"></i> <i class=\"rs-dot svelte-1n46o8q\"></i></span> <span class=\"rs-name svelte-1n46o8q\"> </span></button>"), vd = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"1000\" step=\"10\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label>", 1), yd = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"100\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <!>", 1), bd = /* @__PURE__ */ B("<p class=\"panel-strong svelte-1n46o8q\"> </p> <label class=\"svelte-1n46o8q\"> <input class=\"token-input svelte-1n46o8q\"/></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <div class=\"rs-grid svelte-1n46o8q\"></div> <label class=\"svelte-1n46o8q\"> <span class=\"row-tools svelte-1n46o8q\"><span class=\"gridmenu-value svelte-1n46o8q\"> </span> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label>", 1), xd = /* @__PURE__ */ B("<div class=\"panel-body svelte-1n46o8q\"><!></div>"), Sd = /* @__PURE__ */ B("<button class=\"footer-tp svelte-1n46o8q\"><span class=\"footer-tp-thumb svelte-1n46o8q\"></span> <span class=\"footer-tp-name svelte-1n46o8q\"> </span></button>"), Cd = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"16\" max=\"160\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), wd = /* @__PURE__ */ B("<span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span> <!>", 1), Td = /* @__PURE__ */ B("<div class=\"nav-row svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></div> <!>", 1), Ed = /* @__PURE__ */ B("<div class=\"nav-row svelte-1n46o8q\"><span class=\"nav-line svelte-1n46o8q\"><span class=\"footer-soc-preview svelte-1n46o8q\" aria-hidden=\"true\"></span> <!></span> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <input class=\"nav-target svelte-1n46o8q\"/></div>"), Dd = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <!></label> <!>", 1), Od = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <!>", 1), kd = /* @__PURE__ */ B("<div class=\"panel-body svelte-1n46o8q\"><label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"footer-tpick svelte-1n46o8q\"></div></div></details> <details class=\"group svelte-1n46o8q\" open=\"\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\"> </button> <label class=\"svelte-1n46o8q\"> <!></label></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\"> </button></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\"> </button></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <button class=\"ghost action svelte-1n46o8q\"> </button></div></details></div>"), Ad = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <input type=\"date\" class=\"svelte-1n46o8q\"/></label>"), jd = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>"), Md = /* @__PURE__ */ B("<img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <button class=\"ghost row-tool svelte-1n46o8q\"></button>", 1), Nd = /* @__PURE__ */ B("<img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/>"), Pd = /* @__PURE__ */ B("<span class=\"toolbar-row svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span>"), Fd = /* @__PURE__ */ B("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" step=\"0.01\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" step=\"0.01\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <!> <button class=\"ghost action svelte-1n46o8q\"> </button>", 1), Id = /* @__PURE__ */ B("<details class=\"group samling-entry svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><span class=\"toolbar-row svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <!> <textarea rows=\"3\" class=\"svelte-1n46o8q\"></textarea> <!> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span> <!></div></details>"), Ld = /* @__PURE__ */ B("<span class=\"toolbar-row svelte-1n46o8q\"><button class=\"ghost action svelte-1n46o8q\"> </button> <button class=\"ghost action svelte-1n46o8q\"> </button> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\".csv,text/csv\" class=\"svelte-1n46o8q\"/></label> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <!> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Rd = /* @__PURE__ */ B("<div class=\"panel-body svelte-1n46o8q\"><!> <!> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <button class=\"ghost action svelte-1n46o8q\"> </button></div>"), zd = /* @__PURE__ */ B("<span class=\"plugin-meta svelte-1n46o8q\"> </span>"), Bd = /* @__PURE__ */ B("<p class=\"panel-hint plugin-warn svelte-1n46o8q\"> </p>"), Vd = /* @__PURE__ */ B("<div><span class=\"plugin-head svelte-1n46o8q\"><span class=\"plugin-name svelte-1n46o8q\"> </span> <!> <span class=\"row-tools svelte-1n46o8q\"><label class=\"gridmenu-snap plugin-toggle svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <!> <!></div>"), Hd = /* @__PURE__ */ B("<div class=\"plugin-row svelte-1n46o8q\"><span class=\"plugin-head svelte-1n46o8q\"><span class=\"plugin-name svelte-1n46o8q\"> </span> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span></div>"), Ud = /* @__PURE__ */ B("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!>", 1), Wd = /* @__PURE__ */ B("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <input class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\"> </button> <!>", 1), Gd = /* @__PURE__ */ B("<div class=\"panel-body svelte-1n46o8q\"><!> <!> <!> <!></div>"), Kd = /* @__PURE__ */ B("<div><span class=\"history-msg svelte-1n46o8q\"> </span> <span class=\"history-meta svelte-1n46o8q\"> </span></div>"), qd = /* @__PURE__ */ B("<button class=\"ghost svelte-1n46o8q\"> </button> <!>", 1), Jd = /* @__PURE__ */ B("<!> <!>", 1), Yd = /* @__PURE__ */ B("<p class=\"panel-hint svelte-1n46o8q\"> </p> <button class=\"ghost svelte-1n46o8q\"> </button>", 1), Xd = /* @__PURE__ */ B("<span class=\"update-arrow svelte-1n46o8q\"></span> <span class=\"badge svelte-1n46o8q\"> </span>", 1), Zd = /* @__PURE__ */ B("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><p class=\"update-notes svelte-1n46o8q\"> </p></div></details>"), Qd = /* @__PURE__ */ B("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"><span class=\"update-warn svelte-1n46o8q\"></span> </summary> <div class=\"group-items svelte-1n46o8q\"><pre class=\"update-headers svelte-1n46o8q\"> </pre></div></details>"), $d = /* @__PURE__ */ B("<span class=\"chip svelte-1n46o8q\"> </span>"), ef = /* @__PURE__ */ B("<div class=\"update-row svelte-1n46o8q\"><span class=\"update-path svelte-1n46o8q\"> </span> <span class=\"update-flags svelte-1n46o8q\"><!> <span class=\"update-warn svelte-1n46o8q\"></span></span></div>"), tf = /* @__PURE__ */ B("<div class=\"update-row svelte-1n46o8q\"><span class=\"update-path svelte-1n46o8q\"> </span> <!></div>"), nf = /* @__PURE__ */ B("<span class=\"update-warn svelte-1n46o8q\"></span>"), rf = /* @__PURE__ */ B("<div class=\"update-row svelte-1n46o8q\"><span> </span> <span class=\"update-flags svelte-1n46o8q\"><!> <!> <input type=\"checkbox\" class=\"svelte-1n46o8q\"/></span></div>"), af = /* @__PURE__ */ B("<div class=\"ctl-row update-opt-head svelte-1n46o8q\"><p class=\"panel-strong svelte-1n46o8q\"> </p> <span class=\"mini-label svelte-1n46o8q\"> </span></div> <!>", 1), of = /* @__PURE__ */ B("<p class=\"update-summary svelte-1n46o8q\"> </p> <!> <!> <!> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"></div></details> <!> <button class=\"primary update-run svelte-1n46o8q\"> </button>", 1), sf = /* @__PURE__ */ B("<div class=\"update-versions svelte-1n46o8q\"><span class=\"update-from svelte-1n46o8q\"> </span> <!></div> <!>", 1), cf = /* @__PURE__ */ B("<aside class=\"panel svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <!></aside>"), lf = /* @__PURE__ */ B("<nav class=\"rail svelte-1n46o8q\"><!> <span class=\"rail-settings svelte-1n46o8q\"><span class=\"rail-brand svelte-1n46o8q\" title=\"Urd\"><svg class=\"brand-mark svelte-1n46o8q\" viewBox=\"10.3 8.3 19.4 25.4\" aria-hidden=\"true\"><path d=\"M12 32V10l16 6.5V32\" fill=\"none\" stroke=\"var(--urd-brand)\" stroke-width=\"3.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path></svg> <span class=\"brand-word svelte-1n46o8q\">Urd</span></span> <button></button> <!></span></nav> <!>", 1), uf = /* @__PURE__ */ B("<div class=\"workspace svelte-1n46o8q\"><!> <div><div class=\"stage svelte-1n46o8q\"><iframe class=\"svelte-1n46o8q\"></iframe></div></div></div>"), df = /* @__PURE__ */ B("<p class=\"loading svelte-1n46o8q\"> </p>"), ff = /* @__PURE__ */ B("<p class=\"panel-hint confirm-line svelte-1n46o8q\"> </p>"), pf = /* @__PURE__ */ B("<div class=\"setup-overlay svelte-1n46o8q\"><div class=\"setup-card svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <!> <!> <span class=\"setup-actions svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"primary svelte-1n46o8q\"> </button></span></div></div>"), mf = /* @__PURE__ */ B("<div class=\"setup-overlay svelte-1n46o8q\"><div class=\"setup-card svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <p class=\"panel-hint svelte-1n46o8q\"> </p> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <p class=\"panel-hint svelte-1n46o8q\"> </p> <span class=\"setup-actions svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"primary svelte-1n46o8q\"> </button></span></div></div>"), hf = /* @__PURE__ */ B("<div><span> </span> <button class=\"toast-x svelte-1n46o8q\">×</button></div>"), gf = /* @__PURE__ */ B("<div class=\"block-menu svelte-1n46o8q\"><header class=\"block-menu-head svelte-1n46o8q\"><span> </span> <button class=\"ghost row-tool svelte-1n46o8q\"></button></header> <div class=\"panel-body block-menu-body svelte-1n46o8q\"><!></div></div>"), _f = /* @__PURE__ */ B("<div class=\"editor svelte-1n46o8q\"><!> <header><span class=\"topbar-group svelte-1n46o8q\"><!> <!></span> <span class=\"topbar-group topbar-draft svelte-1n46o8q\"><!></span> <span class=\"topbar-group topbar-right svelte-1n46o8q\"><!></span></header> <!> <!> <!> <!> <!></div>   <!>", 1);
function vf(e, t) {
	Je(t, !0);
	let n = (e, t = f, n = f) => {
		var r = al(), i = F(r);
		qr(i, 17, n, Ur, (e, r, i) => {
			var a = il(), s = P(a), l = P(s);
			{
				let e = /* @__PURE__ */ A(() => J("tip.bg.changeType")), n = /* @__PURE__ */ A(() => o.map(([e, t]) => [e, t.labelKey ? J(t.labelKey) : t.label]));
				Y(l, {
					get value() {
						return R(r).type;
					},
					get title() {
						return R(e);
					},
					get options() {
						return R(n);
					},
					onchange: (e) => Kn(t(), i, e)
				});
			}
			var u = I(l, 2), d = P(u);
			d.disabled = i === 0, W(d, () => c.up, !0), O(d);
			var f = I(d, 2);
			W(f, () => c.down, !0), O(f);
			var p = I(f, 2);
			W(p, () => c.cross, !0), O(p), O(u), O(s);
			var m = I(s, 2), h = (e) => {
				var n = Uc(), a = F(n), o = P(a), s = I(o);
				{
					let e = /* @__PURE__ */ A(ur), n = /* @__PURE__ */ A(() => J("tip.bg.layerColor"));
					ca(s, {
						get value() {
							return R(r).props.value;
						},
						get tokens() {
							return R(e);
						},
						get label() {
							return R(n);
						},
						onchange: (e) => kn(t(), i, "value", e)
					});
				}
				O(a);
				var c = I(a, 2), l = P(c), u = I(l), d = P(u);
				O(u), O(c);
				var f = I(c, 2);
				G(f), L((e, t, n) => {
					H(o, `${e ?? ""} `), H(l, `${t ?? ""} `), H(d, `${n ?? ""}%`), K(f, R(r).props.opacity ?? 1);
				}, [
					() => J("lbl.color"),
					() => J("lbl.strength"),
					() => Math.round((R(r).props.opacity ?? 1) * 100)
				]), z("input", f, (e) => kn(t(), i, "opacity", Number(e.target.value))), V(e, n);
			}, g = (e) => {
				let n = /* @__PURE__ */ A(() => Fn(R(r))), a = /* @__PURE__ */ A(() => R(n).stops.reduce((e, t) => e + Math.max(0, Number(t.share) || 0), 0));
				var o = Jc(), s = F(o), l = P(s), u = I(l);
				{
					let e = /* @__PURE__ */ A(() => R(n).kind ?? "linear"), r = /* @__PURE__ */ A(() => [["linear", J("opt.grad.linear")], ["radial", J("opt.grad.radial")]]);
					Y(u, {
						get value() {
							return R(e);
						},
						get options() {
							return R(r);
						},
						onchange: (e) => zn(t(), i, e)
					});
				}
				O(s);
				var d = I(s, 2);
				qr(d, 17, () => R(n).stops, Ur, (e, r, o) => {
					var s = Gc();
					let l;
					var u = P(s), d = I(u, 2);
					{
						let e = /* @__PURE__ */ A(ur), n = /* @__PURE__ */ A(() => J("tip.bg.stopColor"));
						ca(d, {
							get value() {
								return R(r).color;
							},
							get tokens() {
								return R(e);
							},
							get label() {
								return R(n);
							},
							onchange: (e) => Bn(t(), i, o, { color: e })
						});
					}
					var f = I(d, 2);
					G(f);
					var p = I(f, 2), m = P(p);
					O(p);
					var h = I(p, 2), g = (e) => {
						var n = Wc();
						W(n, () => c.cross, !0), O(n), L((e) => q(n, "title", e), [() => J("tip.bg.removeStop")]), z("click", n, () => Hn(t(), i, o)), V(e, n);
					};
					U(h, (e) => {
						R(n).stops.length > 2 && e(g);
					}), O(s), L((e, t, a) => {
						l = mi(s, 1, "nav-line grad-stop svelte-1n46o8q", null, l, {
							dragging: R(Wn)?.layer === i && R(Wn).from === o,
							"drop-above": R(Wn)?.layer === i && R(Wn).insert === o,
							"drop-below": R(Wn)?.layer === i && R(Wn).insert === R(n).stops.length && o === R(n).stops.length - 1
						}), q(u, "title", e), K(f, R(r).share ?? 50), q(f, "title", t), H(m, `${a ?? ""}%`);
					}, [
						() => J("tip.bg.dragStop"),
						() => J("tip.bg.stopShare"),
						() => R(a) > 0 ? Math.round(Math.max(0, Number(R(r).share) || 0) / R(a) * 100) : Math.round(100 / R(n).stops.length)
					]), z("pointerdown", u, (e) => Gn(t(), e, i, o)), z("input", f, (e) => Bn(t(), i, o, { share: Number(e.target.value) })), V(e, s);
				});
				var f = I(d, 2), p = P(f, !0);
				O(f);
				var m = I(f, 2), h = (e) => {
					var r = Kc(), a = F(r), o = P(a), s = I(o), c = P(s);
					O(s), O(a);
					var l = I(a, 2);
					G(l);
					var u = I(l, 2), d = P(u), f = I(d), p = P(f);
					O(f), O(u);
					var m = I(u, 2);
					G(m), L((e, t, r, i) => {
						H(o, `${e ?? ""} `), H(c, `${t ?? ""}%`), K(l, R(n).x ?? .5), H(d, `${r ?? ""} `), H(p, `${i ?? ""}%`), K(m, R(n).y ?? .5);
					}, [
						() => J("lbl.centerX"),
						() => Math.round((R(n).x ?? .5) * 100),
						() => J("lbl.centerY"),
						() => Math.round((R(n).y ?? .5) * 100)
					]), z("input", l, (e) => Ln(t(), i, "x", Number(e.target.value))), z("input", m, (e) => Ln(t(), i, "y", Number(e.target.value))), V(e, r);
				}, g = (e) => {
					var r = qc(), a = F(r), o = P(a), s = I(o), c = P(s);
					O(s), O(a);
					var l = I(a, 2);
					G(l), L((e) => {
						H(o, `${e ?? ""} `), H(c, `${R(n).angle ?? ""}°`), K(l, R(n).angle);
					}, [() => J("lbl.angle")]), z("input", l, (e) => Ln(t(), i, "angle", Number(e.target.value))), V(e, r);
				};
				U(m, (e) => {
					(R(n).kind ?? "linear") === "radial" ? e(h) : e(g, -1);
				});
				var _ = I(m, 2), v = P(_), y = I(v), b = P(y);
				O(y), O(_);
				var x = I(_, 2);
				G(x);
				var S = I(x, 2), C = P(S), w = I(C);
				{
					let e = /* @__PURE__ */ A(() => R(n).animation ?? "none");
					Y(w, {
						get value() {
							return R(e);
						},
						get options() {
							return Rn[(R(n).kind ?? "linear") === "radial" ? "radial" : "linear"];
						},
						onchange: (e) => Ln(t(), i, "animation", e)
					});
				}
				O(S), L((e, t, r, i, a, o, s) => {
					H(l, `${e ?? ""} `), q(f, "title", t), H(p, r), H(v, `${i ?? ""} `), H(b, `${a ?? ""}%`), K(x, R(n).opacity ?? 1), q(S, "title", o), H(C, `${s ?? ""} `);
				}, [
					() => J("blocks.shape"),
					() => J("tip.bg.addStop"),
					() => J("ui.addStop"),
					() => J("lbl.strength"),
					() => Math.round((R(n).opacity ?? 1) * 100),
					() => J("tip.bg.motion"),
					() => J("lbl.motion")
				]), z("click", f, () => Vn(t(), i)), z("input", x, (e) => Ln(t(), i, "opacity", Number(e.target.value))), V(e, o);
			}, _ = (e) => {
				var n = Yc(), a = F(n), o = P(a), s = I(o);
				{
					let e = /* @__PURE__ */ A(ur), n = /* @__PURE__ */ A(() => J("tip.bg.glowColor"));
					ca(s, {
						get value() {
							return R(r).props.color;
						},
						get tokens() {
							return R(e);
						},
						get label() {
							return R(n);
						},
						onchange: (e) => kn(t(), i, "color", e)
					});
				}
				O(a);
				var c = I(a, 2), l = P(c), u = I(l), d = P(u);
				O(u), O(c);
				var f = I(c, 2);
				G(f);
				var p = I(f, 2), m = P(p), h = I(m), g = P(h);
				O(h), O(p);
				var _ = I(p, 2);
				G(_);
				var v = I(_, 2), y = P(v), b = I(y), x = P(b);
				O(b), O(v);
				var S = I(v, 2);
				G(S);
				var C = I(S, 2), w = P(C), ee = I(w), te = P(ee);
				O(ee), O(C);
				var ne = I(C, 2);
				G(ne), L((e, t, n, i, a, s, c, u, p) => {
					H(o, `${e ?? ""} `), H(l, `${t ?? ""} `), H(d, `${n ?? ""}%`), K(f, R(r).props.x), H(m, `${i ?? ""} `), H(g, `${a ?? ""}%`), K(_, R(r).props.y), H(y, `${s ?? ""} `), H(x, `${c ?? ""}%`), K(S, R(r).props.radius), H(w, `${u ?? ""} `), H(te, `${p ?? ""}%`), K(ne, R(r).props.opacity);
				}, [
					() => J("lbl.color"),
					() => J("lbl.posX"),
					() => Math.round(R(r).props.x * 100),
					() => J("lbl.posY"),
					() => Math.round(R(r).props.y * 100),
					() => J("lbl.size"),
					() => Math.round(R(r).props.radius * 100),
					() => J("lbl.strength"),
					() => Math.round(R(r).props.opacity * 100)
				]), z("input", f, (e) => kn(t(), i, "x", Number(e.target.value))), z("input", _, (e) => kn(t(), i, "y", Number(e.target.value))), z("input", S, (e) => kn(t(), i, "radius", Number(e.target.value))), z("input", ne, (e) => kn(t(), i, "opacity", Number(e.target.value))), V(e, n);
			}, v = (e) => {
				var n = Xc(), a = F(n), o = P(a), s = I(o), c = P(s);
				O(s), O(a);
				var l = I(a, 2);
				G(l), L((e, t) => {
					H(o, `${e ?? ""} `), H(c, `${t ?? ""}%`), K(l, R(r).props.opacity);
				}, [() => J("lbl.strength"), () => Math.round(R(r).props.opacity * 100)]), z("input", l, (e) => kn(t(), i, "opacity", Number(e.target.value))), V(e, n);
			}, y = (e) => {
				let n = /* @__PURE__ */ A(() => R(r).props.fit === "flislegg" || R(r).props.fit === "repeat");
				var a = $c(), o = F(a), s = P(o), c = I(s);
				O(o);
				var l = I(o, 2), u = P(l), d = I(u);
				{
					let e = /* @__PURE__ */ A(() => R(n) ? "flislegg" : "vanlig"), r = /* @__PURE__ */ A(() => [["vanlig", J("opt.img.plain")], ["flislegg", J("opt.img.tile")]]);
					Y(d, {
						get value() {
							return R(e);
						},
						get options() {
							return R(r);
						},
						onchange: (e) => kn(t(), i, "fit", e)
					});
				}
				O(l);
				var f = I(l, 2), p = P(f, !0);
				O(f);
				var m = I(f, 2), h = P(m), g = I(h, 2);
				G(g);
				var _ = I(g, 4);
				O(m);
				var v = I(m, 2), y = (e) => {
					var n = Zc(), a = F(n), o = P(a), s = P(o, !0);
					O(o);
					var c = I(o, 2), l = P(c, !0);
					O(c), O(a);
					var u = I(a, 2), d = P(u, !0);
					O(u);
					var f = I(u, 2), p = I(f, 2), m = P(p), h = I(m), g = P(h);
					O(h), O(p);
					var _ = I(p, 2);
					G(_);
					var v = I(_, 2), y = P(v), b = I(y), x = P(b);
					O(b), O(v);
					var S = I(v, 2);
					G(S), L((e, t, n, i, a, p, h, v, b, C, w, ee) => {
						q(o, "title", e), H(s, t), q(c, "title", n), H(l, i), q(u, "title", a), H(d, p), gi(f, `--fx:${h ?? ""}%; --fy:${v ?? ""}%`), H(m, `${b ?? ""} `), H(g, `${C ?? ""}%`), K(_, R(r).props.x ?? .5), H(y, `${w ?? ""} `), H(x, `${ee ?? ""}%`), K(S, R(r).props.y ?? .5);
					}, [
						() => J("tip.bg.cover"),
						() => J("ui.cover"),
						() => J("opt.fitFrame.contain"),
						() => J("opt.fit.contain"),
						() => J("tip.bg.position"),
						() => J("lbl.position"),
						() => Math.max(0, Math.min(1, R(r).props.x ?? .5)) * 100,
						() => Math.max(0, Math.min(1, R(r).props.y ?? .5)) * 100,
						() => J("lbl.horizontal"),
						() => Math.round((R(r).props.x ?? .5) * 100),
						() => J("lbl.vertical"),
						() => Math.round((R(r).props.y ?? .5) * 100)
					]), z("click", o, () => Pn(t(), i, R(r), "cover")), z("click", c, () => Pn(t(), i, R(r), "contain")), z("pointerdown", f, (e) => An(e, t(), i, "xy")), z("input", _, (e) => kn(t(), i, "x", Number(e.target.value))), z("input", S, (e) => kn(t(), i, "y", Number(e.target.value))), V(e, n);
				};
				U(v, (e) => {
					R(n) || e(y);
				});
				var b = I(v, 2), x = P(b), S = I(x), C = P(S);
				O(S), O(b);
				var w = I(b, 2);
				G(w);
				var ee = I(w, 2), te = P(ee), ne = I(te), re = P(ne);
				O(ne), O(ee);
				var ie = I(ee, 2);
				G(ie);
				var ae = I(ie, 2), oe = P(ae);
				G(oe);
				var se = I(oe);
				O(ae);
				var ce = I(ae, 2), le = (e) => {
					var n = Qc(), a = F(n), o = P(a), s = I(o), c = P(s);
					O(s), O(a);
					var l = I(a, 2);
					G(l);
					var u = I(l, 2), d = P(u), f = I(d);
					{
						let e = /* @__PURE__ */ A(() => R(r).props.bleed ?? "none"), n = /* @__PURE__ */ A(() => [
							["none", J("common.none")],
							["up", J("opt.bleed.up")],
							["down", J("opt.bleed.down")],
							["both", J("opt.brand.both")]
						]);
						Y(f, {
							get value() {
								return R(e);
							},
							get options() {
								return R(n);
							},
							onchange: (e) => kn(t(), i, "bleed", e)
						});
					}
					O(u), L((e, t, n, i) => {
						H(o, `${e ?? ""} `), H(c, `${t ?? ""}%`), K(l, R(r).props.parallax ?? .3), q(u, "title", n), H(d, `${i ?? ""} `);
					}, [
						() => J("lbl.parallaxStrength"),
						() => Math.round((R(r).props.parallax ?? 0) * 100),
						() => J("tip.bg.bleed"),
						() => J("lbl.bleed")
					]), z("input", l, (e) => kn(t(), i, "parallax", Number(e.target.value))), V(e, n);
				};
				U(ce, (e) => {
					(R(r).props.parallax ?? 0) > 0 && e(le);
				}), L((e, t, n, i, a, c, d, m, v, y, b, S, ee, ne) => {
					q(o, "title", e), H(s, `${t ?? ""} `), q(l, "title", n), H(u, `${i ?? ""} `), q(f, "title", a), H(p, c), q(h, "title", d), K(g, m), q(_, "title", v), H(x, `${y ?? ""} `), H(C, `${R(r).props.blur ?? 0 ?? ""} px`), K(w, R(r).props.blur ?? 0), H(te, `${b ?? ""} `), H(re, `${S ?? ""}%`), K(ie, R(r).props.opacity ?? 1), q(ae, "title", ee), xi(oe, (R(r).props.parallax ?? 0) > 0), H(se, ` ${ne ?? ""}`);
				}, [
					() => J("tip.webpAuto"),
					() => R(r).props.src ? J("ui.changeImage") : J("ui.chooseImage"),
					() => J("tip.bg.fit"),
					() => J("lbl.fit"),
					() => J("tip.bg.size"),
					() => J("lbl.size"),
					() => J("tip.smaller"),
					() => Math.round((R(r).props.size ?? 1) * 100),
					() => J("tip.larger"),
					() => J("lbl.blur"),
					() => J("lbl.strength"),
					() => Math.round((R(r).props.opacity ?? 1) * 100),
					() => J("tip.bg.parallax"),
					() => J("lbl.parallax")
				]), z("change", c, (e) => Xn(t(), i, e)), z("click", h, () => Mn(t(), i, R(r).props.size ?? 1, -.05)), z("change", g, (e) => Nn(t(), i, e.target.value)), z("click", _, () => Mn(t(), i, R(r).props.size ?? 1, .05)), z("input", w, (e) => kn(t(), i, "blur", Number(e.target.value))), z("input", ie, (e) => kn(t(), i, "opacity", Number(e.target.value))), z("change", oe, (e) => kn(t(), i, "parallax", e.target.checked ? .3 : 0)), V(e, a);
			}, b = (e) => {
				var n = tl(), a = F(n), o = P(a), s = I(o);
				O(a);
				var l = I(a, 2);
				qr(l, 17, () => R(r).props.images ?? [], Ur, (e, n, a) => {
					var o = el(), s = F(o), l = P(s), u = I(l, 2), d = P(u);
					d.disabled = a === 0, W(d, () => c.up, !0), O(d);
					var f = I(d, 2);
					W(f, () => c.down, !0), O(f);
					var p = I(f, 2);
					W(p, () => c.cross, !0), O(p), O(u), O(s);
					var m = I(s, 2), h = P(m), g = I(h), _ = P(g);
					O(g), O(m);
					var v = I(m, 2);
					G(v);
					var y = I(v, 2), b = P(y), x = I(b), S = P(x);
					O(x), O(y);
					var C = I(y, 2);
					G(C), L((e, t, i, o, s) => {
						q(l, "src", R(n).src), f.disabled = a === R(r).props.images.length - 1, q(p, "title", e), H(h, `${t ?? ""} `), H(_, `${i ?? ""}%`), K(v, R(n).x ?? .5), H(b, `${o ?? ""} `), H(S, `${s ?? ""}%`), K(C, R(n).y ?? .5);
					}, [
						() => J("tip.removeImage"),
						() => J("lbl.focusX"),
						() => Math.round((R(n).x ?? .5) * 100),
						() => J("lbl.focusY"),
						() => Math.round((R(n).y ?? .5) * 100)
					]), z("click", d, () => er(t(), i, a, -1)), z("click", f, () => er(t(), i, a, 1)), z("click", p, () => tr(t(), i, a)), z("input", v, (e) => nr(t(), i, a, "x", Number(e.target.value))), z("input", C, (e) => nr(t(), i, a, "y", Number(e.target.value))), V(e, o);
				});
				var u = I(l, 2), d = P(u), f = I(d);
				{
					let e = /* @__PURE__ */ A(() => R(r).props.fit ?? "cover"), n = /* @__PURE__ */ A(() => [["cover", J("opt.fit.cover")], ["contain", J("opt.fit.contain")]]);
					Y(f, {
						get value() {
							return R(e);
						},
						get options() {
							return R(n);
						},
						onchange: (e) => kn(t(), i, "fit", e)
					});
				}
				O(u);
				var p = I(u, 2), m = P(p), h = I(m);
				G(h), O(p);
				var g = I(p, 2), _ = P(g), v = I(_), y = P(v);
				O(v), O(g);
				var b = I(g, 2);
				G(b);
				var x = I(b, 2), S = P(x), C = I(S), w = P(C);
				O(C), O(x);
				var ee = I(x, 2);
				G(ee);
				var te = I(ee, 2), ne = P(te), re = I(ne), ie = P(re);
				O(re), O(te);
				var ae = I(te, 2);
				G(ae);
				var oe = I(ae, 2), se = P(oe, !0);
				O(oe), L((e, t, n, i, s, c, l, u, f, g, v) => {
					q(a, "title", e), H(o, `${t ?? ""} `), H(d, `${n ?? ""} `), q(p, "title", i), H(m, `${s ?? ""} `), K(h, R(r).props.interval ?? 6), H(_, `${c ?? ""} `), H(y, `${l ?? ""} s`), K(b, R(r).props.fade ?? 1.5), H(S, `${u ?? ""} `), H(w, `${R(r).props.blur ?? 0 ?? ""} px`), K(ee, R(r).props.blur ?? 0), H(ne, `${f ?? ""} `), H(ie, `${g ?? ""}%`), K(ae, R(r).props.opacity ?? 1), H(se, v);
				}, [
					() => J("tip.bg.addImages"),
					() => J("ui.addImages"),
					() => J("lbl.fit"),
					() => J("hint.bg.gallery"),
					() => J("lbl.secondsPerImage"),
					() => J("lbl.transition"),
					() => (R(r).props.fade ?? 1.5).toFixed(1),
					() => J("lbl.blur"),
					() => J("lbl.strength"),
					() => Math.round((R(r).props.opacity ?? 1) * 100),
					() => J("hint.bg.gallery")
				]), z("change", s, (e) => $n(t(), i, e)), z("change", h, (e) => kn(t(), i, "interval", Number(e.target.value))), z("input", b, (e) => kn(t(), i, "fade", Number(e.target.value))), z("input", ee, (e) => kn(t(), i, "blur", Number(e.target.value))), z("input", ae, (e) => kn(t(), i, "opacity", Number(e.target.value))), V(e, n);
			}, x = (e) => {
				var n = rl(), a = F(n), o = P(a), s = I(o);
				O(a);
				var c = I(a, 2), l = P(c), u = I(l);
				O(c);
				var d = I(c, 2), f = P(d), p = I(f);
				{
					let e = /* @__PURE__ */ A(() => R(r).props.fit ?? "cover"), n = /* @__PURE__ */ A(() => [["cover", J("opt.fit.cover")], ["contain", J("opt.fit.contain")]]);
					Y(p, {
						get value() {
							return R(e);
						},
						get options() {
							return R(n);
						},
						onchange: (e) => kn(t(), i, "fit", e)
					});
				}
				O(d);
				var m = I(d, 2), h = P(m), g = I(h), _ = P(g);
				O(g), O(m);
				var v = I(m, 2);
				G(v);
				var y = I(v, 2), b = P(y), x = I(b), S = P(x);
				O(x), O(y);
				var C = I(y, 2);
				G(C);
				var w = I(C, 2), ee = P(w), te = I(ee), ne = P(te);
				O(te), O(w);
				var re = I(w, 2);
				G(re);
				var ie = I(re, 2), ae = P(ie);
				G(ae);
				var oe = I(ae);
				O(ie);
				var se = I(ie, 2), ce = (e) => {
					var n = nl(), a = F(n), o = P(a), s = I(o), c = P(s);
					O(s), O(a);
					var l = I(a, 2);
					G(l), L((e, t) => {
						H(o, `${e ?? ""} `), H(c, `${t ?? ""}%`), K(l, R(r).props.parallax ?? .3);
					}, [() => J("lbl.parallaxStrength"), () => Math.round((R(r).props.parallax ?? 0) * 100)]), z("input", l, (e) => kn(t(), i, "parallax", Number(e.target.value))), V(e, n);
				};
				U(se, (e) => {
					(R(r).props.parallax ?? 0) > 0 && e(ce);
				}), L((e, t, n, i, s, u, p, m, g, y, x, w, te, se) => {
					q(a, "title", e), H(o, `${t ?? ""} `), q(c, "title", n), H(l, `${i ?? ""} `), q(d, "title", s), H(f, `${u ?? ""} `), H(h, `${p ?? ""} `), H(_, `${m ?? ""}%`), K(v, R(r).props.x ?? .5), H(b, `${g ?? ""} `), H(S, `${y ?? ""}%`), K(C, R(r).props.y ?? .5), H(ee, `${x ?? ""} `), H(ne, `${w ?? ""}%`), K(re, R(r).props.opacity ?? 1), q(ie, "title", te), xi(ae, (R(r).props.parallax ?? 0) > 0), H(oe, ` ${se ?? ""}`);
				}, [
					() => J("tip.bg.videoFile"),
					() => R(r).props.src ? J("ui.changeVideo") : J("ui.chooseVideo"),
					() => J("tip.bg.poster"),
					() => R(r).props.poster ? J("ui.changeImage") : J("ui.choosePoster"),
					() => J("tip.bg.fit"),
					() => J("lbl.fit"),
					() => J("lbl.horizontal"),
					() => Math.round((R(r).props.x ?? .5) * 100),
					() => J("lbl.vertical"),
					() => Math.round((R(r).props.y ?? .5) * 100),
					() => J("lbl.strength"),
					() => Math.round((R(r).props.opacity ?? 1) * 100),
					() => J("tip.bg.parallax"),
					() => J("lbl.parallax")
				]), z("change", s, (e) => Zn(t(), i, e)), z("change", u, (e) => Qn(t(), i, e)), z("input", v, (e) => kn(t(), i, "x", Number(e.target.value))), z("input", C, (e) => kn(t(), i, "y", Number(e.target.value))), z("input", re, (e) => kn(t(), i, "opacity", Number(e.target.value))), z("change", ae, (e) => kn(t(), i, "parallax", e.target.checked ? .3 : 0)), V(e, n);
			};
			U(m, (e) => {
				R(r).type === "color" ? e(h) : R(r).type === "gradient" ? e(g, 1) : R(r).type === "glow" ? e(_, 2) : R(r).type === "grain" ? e(v, 3) : R(r).type === "image" ? e(y, 4) : R(r).type === "bildegalleri" ? e(b, 5) : R(r).type === "video" && e(x, 6);
			}), O(a), L((e, t, r) => {
				q(d, "title", e), q(f, "title", t), f.disabled = i === n().length - 1, q(p, "title", r);
			}, [
				() => J("hint.bg.order"),
				() => J("hint.bg.order"),
				() => J("tip.bg.removeLayer")
			]), z("click", d, () => On(t(), i, -1)), z("click", f, () => On(t(), i, 1)), z("click", p, () => Dn(t(), i)), V(e, a);
		});
		var a = I(i, 2), s = P(a), l = I(s);
		{
			let e = /* @__PURE__ */ A(() => o.map(([e, t]) => [e, t.labelKey ? J(t.labelKey) : t.label]));
			Y(l, {
				get value() {
					return R(Tn);
				},
				get options() {
					return R(e);
				},
				onchange: (e) => N(Tn, e, !0)
			});
		}
		O(a);
		var u = I(a, 2), d = P(u, !0);
		O(u), L((e, t) => {
			H(s, `${e ?? ""} `), H(d, t);
		}, [() => J("lbl.newLayer"), () => J("ui.addLayer")]), z("click", u, () => En(t(), R(Tn))), V(e, r);
	}, r = (e, t = f, n = f) => {
		var r = Ir();
		qr(F(r), 17, n, Ur, (e, r, i) => {
			var a = sl(), o = P(a);
			G(o);
			var s = I(o, 2), l = P(s);
			l.disabled = i === 0, W(l, () => c.up, !0), O(l);
			var u = I(l, 2);
			W(u, () => c.down, !0), O(u);
			var d = I(u, 2);
			W(d, () => c.cross, !0), O(d), O(s);
			var f = I(s, 2), p = P(f);
			{
				let e = /* @__PURE__ */ A(() => R(r).page ?? "__href"), n = /* @__PURE__ */ A(() => J("tip.linkTarget")), a = /* @__PURE__ */ A(() => [...R(D).pages.map((e) => [e.id, e.title]), ["__href", J("opt.linkHref")]]);
				Y(p, {
					get value() {
						return R(e);
					},
					get title() {
						return R(n);
					},
					get options() {
						return R(a);
					},
					onchange: (e) => cc(t(), i, e)
				});
			}
			O(f);
			var m = I(f, 2), h = (e) => {
				var n = ol();
				G(n), L((e, t) => {
					K(n, R(r).href ?? ""), q(n, "placeholder", e), q(n, "title", t);
				}, [() => J("ph.hrefAnchor"), () => J("tip.hrefAnchor")]), z("change", n, (e) => lc(t(), i, e.target.value)), V(e, n);
			};
			U(m, (e) => {
				R(r).page || e(h);
			}), O(a), L((e, t) => {
				K(o, R(r).label), q(o, "title", e), u.disabled = i === n().length - 1, q(d, "title", t);
			}, [() => J("tip.linkLabel"), () => J("tip.removeLink")]), z("input", o, (e) => sc(t(), i, e.target.value)), z("click", l, () => oc(t(), i, -1)), z("click", u, () => oc(t(), i, 1)), z("click", d, () => ac(t(), i)), V(e, a);
		}), V(e, r);
	}, i = (e) => {
		let t = /* @__PURE__ */ A(() => R(k).props.boxStyle ?? {});
		var n = ul(), r = F(n), i = P(r), a = I(i);
		{
			let e = /* @__PURE__ */ A(() => R(t).bg ?? ""), n = /* @__PURE__ */ A(ur), r = /* @__PURE__ */ A(() => J("tip.box.bg"));
			ca(a, {
				get value() {
					return R(e);
				},
				get tokens() {
					return R(n);
				},
				allowClear: !0,
				get label() {
					return R(r);
				},
				onchange: (e) => Vt({ bg: e || null })
			});
		}
		O(r);
		var o = I(r, 2), s = P(o), c = I(s);
		{
			let e = /* @__PURE__ */ A(() => R(t).shadow ?? ""), n = /* @__PURE__ */ A(() => [
				["", J("common.none")],
				["soft", J("opt.shadow.soft")],
				["strong", J("opt.shadow.strong")]
			]);
			Y(c, {
				get value() {
					return R(e);
				},
				get options() {
					return R(n);
				},
				onchange: (e) => Vt({ shadow: e || null })
			});
		}
		O(o);
		var l = I(o, 2), u = (e) => {
			var n = cl(), r = P(n), i = I(r);
			{
				let e = /* @__PURE__ */ A(() => R(t).shadowColor ?? ""), n = /* @__PURE__ */ A(ur), r = /* @__PURE__ */ A(() => J("tip.box.shadowColor"));
				ca(i, {
					get value() {
						return R(e);
					},
					get tokens() {
						return R(n);
					},
					allowClear: !0,
					get label() {
						return R(r);
					},
					onchange: (e) => Vt({ shadowColor: e || null })
				});
			}
			O(n), L((e) => H(r, `${e ?? ""} `), [() => J("lbl.shadowColor")]), V(e, n);
		};
		U(l, (e) => {
			R(t).shadow && e(u);
		});
		var d = I(l, 2), f = P(d), p = I(f);
		{
			let e = /* @__PURE__ */ A(() => R(t).border === "none" ? "none" : R(t).border ? "custom" : ""), n = /* @__PURE__ */ A(() => [
				["", J("opt.border.theme")],
				["none", J("common.none")],
				["custom", J("opt.border.custom")]
			]);
			Y(p, {
				get value() {
					return R(e);
				},
				get options() {
					return R(n);
				},
				onchange: (e) => Vt({ border: e === "custom" ? {
					color: "accent",
					width: 1
				} : e || null })
			});
		}
		O(d);
		var m = I(d, 2), h = (e) => {
			let n = /* @__PURE__ */ A(() => typeof R(t).border == "object" ? R(t).border : {
				color: "text",
				width: 1
			});
			var r = ll(), i = F(r), a = P(i), o = I(a);
			{
				let e = /* @__PURE__ */ A(ur), t = /* @__PURE__ */ A(() => J("tip.box.borderColor"));
				ca(o, {
					get value() {
						return R(n).color;
					},
					get tokens() {
						return R(e);
					},
					get label() {
						return R(t);
					},
					onchange: (e) => Vt({ border: {
						...R(n),
						color: e
					} })
				});
			}
			O(i);
			var s = I(i, 2), c = P(s), l = I(c), u = P(l), d = I(u, 2);
			G(d);
			var f = I(d, 2);
			O(l), O(s), L((e, t, r, i, o, s) => {
				H(a, `${e ?? ""} `), H(c, `${t ?? ""} `), q(u, "title", r), q(u, "aria-label", i), K(d, R(n).width), q(f, "title", o), q(f, "aria-label", s);
			}, [
				() => J("lbl.borderColor"),
				() => J("lbl.thicknessPx"),
				() => J("tip.thinner"),
				() => J("tip.thinner"),
				() => J("tip.thicker"),
				() => J("tip.thicker")
			]), z("click", u, () => Vt({ border: {
				...R(n),
				width: Math.max(1, R(n).width - 1)
			} })), z("change", d, (e) => Vt({ border: {
				...R(n),
				width: Math.min(12, Math.max(1, Number(e.target.value) || 1))
			} })), z("click", f, () => Vt({ border: {
				...R(n),
				width: Math.min(12, R(n).width + 1)
			} })), V(e, r);
		};
		U(m, (e) => {
			R(t).border !== "none" && e(h);
		});
		var g = I(m, 2), _ = P(g);
		G(_);
		var v = I(_);
		O(g), L((e, t, n, r, a, o) => {
			H(i, `${e ?? ""} `), H(s, `${t ?? ""} `), H(f, `${n ?? ""} `), q(g, "title", r), xi(_, a), H(v, ` ${o ?? ""}`);
		}, [
			() => J("lbl.blockColor"),
			() => J("lbl.shadow"),
			() => J("lbl.border"),
			() => J("tip.box.glass"),
			() => !!R(t).glass,
			() => J("lbl.glass")
		]), z("change", _, (e) => Vt({ glass: e.target.checked || null })), V(e, n);
	}, a = (e) => {
		var t = uu(), n = F(t), r = P(n), a = P(r);
		let o;
		var s = P(a, !0);
		O(a);
		var l = I(a, 2);
		let u;
		var d = P(l, !0);
		O(l), O(r), O(n);
		var f = I(n, 2), p = (e) => {
			var t = Ir(), n = F(t), r = (e) => {
				var t = dl(), n = P(t, !0);
				O(t), L((e) => H(n, e), [() => J("hint.textInline")]), V(e, t);
			}, i = (e) => {
				var t = pl(), n = F(t), r = P(n);
				G(r);
				var i = I(r);
				O(n);
				var a = I(n, 2), o = P(a, !0);
				O(a);
				var s = I(a, 2);
				qr(s, 17, () => R(k).props.items ?? [], Ur, (e, t, n) => {
					var r = fl(), i = P(r);
					G(i);
					var a = I(i, 2), o = P(a);
					o.disabled = n === 0, W(o, () => c.up, !0), O(o);
					var s = I(o, 2);
					W(s, () => c.down, !0), O(s);
					var l = I(s, 2);
					W(l, () => c.cross, !0), O(l), O(a), O(r), L((e, r) => {
						K(i, R(t).q), q(i, "title", e), s.disabled = n === (R(k).props.items?.length ?? 0) - 1, q(l, "title", r);
					}, [() => J("tip.faq.question"), () => J("tip.faq.remove")]), z("change", i, (e) => Ht(n, { q: e.target.value })), z("click", o, () => Gt(n, -1)), z("click", s, () => Gt(n, 1)), z("click", l, () => Wt(n)), V(e, r);
				});
				var l = I(s, 2), u = P(l, !0);
				O(l), L((e, t, a, s, c) => {
					q(n, "title", e), xi(r, t), H(i, ` ${a ?? ""}`), H(o, s), H(u, c);
				}, [
					() => J("tip.faq.multi"),
					() => !!R(k).props.multi,
					() => J("lbl.faqMulti"),
					() => J("lbl.questions"),
					() => J("ui.addQuestion")
				]), z("change", r, (e) => j("multi", e.target.checked)), z("click", l, Ut), V(e, t);
			}, a = (e) => {
				var t = hl(), n = F(t), r = P(n, !0);
				O(n);
				var i = I(n, 2);
				qr(i, 17, () => R(k).props.items ?? [], Ur, (e, t, n) => {
					var r = ml(), i = F(r), a = P(i);
					G(a);
					var o = I(a, 2);
					G(o);
					var s = I(o, 2), l = P(s);
					l.disabled = n === 0, W(l, () => c.up, !0), O(l);
					var u = I(l, 2);
					W(u, () => c.down, !0), O(u);
					var d = I(u, 2);
					W(d, () => c.cross, !0), O(d), O(s), O(i);
					var f = I(i, 2);
					G(f), L((e, r, i, s, c, l) => {
						K(a, R(t).year), q(a, "placeholder", e), q(a, "title", r), K(o, R(t).title), q(o, "title", i), u.disabled = n === (R(k).props.items?.length ?? 0) - 1, q(d, "title", s), K(f, R(t).text), q(f, "placeholder", c), q(f, "title", l);
					}, [
						() => J("ph.tlYear"),
						() => J("tip.tl.year"),
						() => J("tip.tl.title"),
						() => J("tip.tl.remove"),
						() => J("ph.tlText"),
						() => J("tip.tl.text")
					]), z("change", a, (e) => Kt(n, { year: e.target.value })), z("change", o, (e) => Kt(n, { title: e.target.value })), z("click", l, () => Yt(n, -1)), z("click", u, () => Yt(n, 1)), z("click", d, () => Jt(n)), z("change", f, (e) => Kt(n, { text: e.target.value })), V(e, r);
				});
				var a = I(i, 2), o = P(a, !0);
				O(a), L((e, t) => {
					H(r, e), H(o, t);
				}, [() => J("lbl.tlItems"), () => J("ui.addTlItem")]), z("click", a, qt), V(e, t);
			}, o = (e) => {
				var t = gl(), n = F(t), r = P(n), i = I(r);
				G(i), O(n);
				var a = I(n, 2), o = P(a), s = I(o);
				G(s), O(a);
				var c = I(a, 2), l = P(c), u = I(l);
				G(u), O(c), L((e, t, n) => {
					H(r, `${e ?? ""} `), K(i, R(k).props.text ?? ""), H(o, `${t ?? ""} `), K(s, R(k).props.attribution ?? ""), H(l, `${n ?? ""} `), K(u, R(k).props.role ?? "");
				}, [
					() => J("lbl.sitatText"),
					() => J("lbl.sitatName"),
					() => J("lbl.sitatRole")
				]), z("change", i, (e) => j("text", e.target.value)), z("change", s, (e) => j("attribution", e.target.value)), z("change", u, (e) => j("role", e.target.value)), V(e, t);
			}, s = (e) => {
				var t = _l(), n = F(t), r = P(n), i = I(r);
				G(i), O(n);
				var a = I(n, 2), o = P(a), s = I(o);
				G(s), O(a);
				var c = I(a, 2), l = P(c), u = I(l);
				G(u), O(c);
				var d = I(c, 2), f = P(d), p = I(f);
				G(p), O(d), L((e, t, n, a, c) => {
					H(r, `${e ?? ""} `), K(i, R(k).props.value ?? ""), q(i, "title", t), H(o, `${n ?? ""} `), K(s, R(k).props.prefix ?? ""), H(l, `${a ?? ""} `), K(u, R(k).props.suffix ?? ""), H(f, `${c ?? ""} `), K(p, R(k).props.label ?? "");
				}, [
					() => J("lbl.statValue"),
					() => J("tip.stat.value"),
					() => J("lbl.statPrefix"),
					() => J("lbl.statSuffix"),
					() => J("lbl.statLabel")
				]), z("change", i, (e) => j("value", e.target.value)), z("change", s, (e) => j("prefix", e.target.value)), z("change", u, (e) => j("suffix", e.target.value)), z("change", p, (e) => j("label", e.target.value)), V(e, t);
			}, l = (e) => {
				var t = vl(), n = F(t), r = P(n), i = P(r, !0);
				O(r);
				var a = I(r, 2), o = P(a, !0);
				O(a), O(n);
				var s = I(n, 2), c = P(s), l = P(c, !0);
				O(c);
				var u = I(c, 2), d = P(u, !0);
				O(u), O(s);
				var f = I(s, 2), p = P(f);
				G(p);
				var m = I(p);
				O(f), L((e, t, n, r, a, s) => {
					H(i, e), H(o, t), H(l, n), H(d, r), q(f, "title", a), xi(p, R(k).props.header !== !1), H(m, ` ${s ?? ""}`);
				}, [
					() => J("ui.addRow"),
					() => J("ui.removeRow"),
					() => J("ui.addColumn"),
					() => J("ui.removeColumn"),
					() => J("tip.tabell.header"),
					() => J("lbl.tabellHeader")
				]), z("click", r, () => Zt(1, 0)), z("click", a, () => Zt(-1, 0)), z("click", c, () => Zt(0, 1)), z("click", u, () => Zt(0, -1)), z("change", p, (e) => j("header", e.target.checked)), V(e, t);
			}, u = (e) => {
				var t = Ir();
				qr(F(t), 17, () => [
					["facebook", "Facebook"],
					["x", "X"],
					["linkedin", "LinkedIn"],
					["whatsapp", "WhatsApp"],
					["email", J("opt.deling.email")],
					["copy", J("opt.deling.copy")]
				], ([e, t]) => e, (e, t) => {
					var n = /* @__PURE__ */ A(() => h(R(t), 2));
					let r = () => R(n)[0], i = () => R(n)[1];
					var a = yl(), o = P(a);
					G(o);
					var s = I(o);
					O(a), L((e) => {
						xi(o, e), H(s, ` ${i() ?? ""}`);
					}, [() => (R(k).props.services ?? []).includes(r())]), z("change", o, (e) => Qt(r(), e.target.checked)), V(e, a);
				}), V(e, t);
			}, d = (e) => {
				var t = bl(), n = F(t), r = P(n), i = I(r);
				G(i), O(n);
				var a = I(n, 2), o = P(a), s = I(o);
				G(s), O(a), L((e, t, n) => {
					H(r, `${e ?? ""} `), K(i, R(k).props.target ?? ""), q(a, "title", t), H(o, `${n ?? ""} `), K(s, R(k).props.doneText ?? "");
				}, [
					() => J("lbl.nedtellerTarget"),
					() => J("tip.nedteller.done"),
					() => J("lbl.nedtellerDone")
				]), z("change", i, (e) => j("target", e.target.value)), z("change", s, (e) => j("doneText", e.target.value)), V(e, t);
			}, f = (e) => {
				var t = Sl(), n = F(t), r = P(n), i = I(r);
				O(n);
				var a = I(n, 2), o = (e) => {
					var t = xl(), n = P(t, !0);
					O(t), L((e) => H(n, e), [() => J("ui.removeAudio")]), z("click", t, () => j("src", "")), V(e, t);
				};
				U(a, (e) => {
					R(k).props.src && e(o);
				});
				var s = I(a, 2), c = P(s), l = I(c);
				G(l), O(s);
				var u = I(s, 2), d = P(u);
				G(d);
				var f = I(d);
				O(u), L((e, t, i, a, o) => {
					q(n, "title", e), H(r, `${t ?? ""} `), H(c, `${i ?? ""} `), K(l, R(k).props.title ?? ""), xi(d, a), H(f, ` ${o ?? ""}`);
				}, [
					() => J("tip.blocks.audioFile"),
					() => J("ui.chooseAudio"),
					() => J("lbl.audioTitle"),
					() => !!R(k).props.loop,
					() => J("lbl.audioLoop")
				]), z("change", i, $t), z("change", l, (e) => j("title", e.target.value)), z("change", d, (e) => j("loop", e.target.checked)), V(e, t);
			}, p = (e) => {
				var t = wl(), n = F(t), r = P(n), i = I(r);
				G(i), O(n);
				var a = I(n, 2), o = P(a), s = I(o);
				{
					let e = /* @__PURE__ */ A(() => R(k).props.page ?? "__href"), t = /* @__PURE__ */ A(() => [...R(D).pages.map((e) => [e.id, e.title]), ["__href", J("opt.externalLink")]]);
					Y(s, {
						get value() {
							return R(e);
						},
						get options() {
							return R(t);
						},
						onchange: (e) => {
							let t = e === "__href" ? null : e;
							Mt(`edit:${R(k).blockId}`, (e) => {
								e.props.page = t, t && (e.props.href = null);
							});
						}
					});
				}
				O(a);
				var c = I(a, 2), l = (e) => {
					var t = Cl();
					G(t), L((e) => {
						q(t, "placeholder", e), K(t, R(k).props.href === "#" ? "" : R(k).props.href ?? "");
					}, [() => J("ph.url")]), z("change", t, (e) => j("href", e.target.value || null)), V(e, t);
				};
				U(c, (e) => {
					R(k).props.page || e(l);
				}), L((e, t) => {
					H(r, `${e ?? ""} `), K(i, R(k).props.label), H(o, `${t ?? ""} `);
				}, [() => J("blocks.text"), () => J("lbl.goesTo")]), z("change", i, (e) => j("label", e.target.value)), V(e, t);
			}, m = (e) => {
				var t = Tl(), n = F(t), r = P(n), i = I(r);
				O(n);
				var a = I(n, 2), o = P(a), s = I(o);
				G(s), O(a);
				var c = I(a, 2), l = P(c), u = I(l);
				G(u), O(c);
				var d = I(c, 2), f = (e) => {
					var t = yl(), n = P(t);
					G(n);
					var r = I(n);
					O(t), L((e, i, a) => {
						q(t, "title", e), xi(n, i), H(r, ` ${a ?? ""}`);
					}, [
						() => J("tip.lightbox"),
						() => !!R(k).props.lightbox,
						() => J("lbl.lightbox")
					]), z("change", n, (e) => j("lightbox", e.target.checked)), V(e, t);
				};
				U(d, (e) => {
					R(k).props.href || e(f);
				}), L((e, t, n, i, a) => {
					H(r, `${e ?? ""} `), H(o, `${t ?? ""} `), K(s, R(k).props.alt ?? ""), q(s, "placeholder", n), H(l, `${i ?? ""} `), K(u, R(k).props.href ?? ""), q(u, "placeholder", a);
				}, [
					() => J("ui.changeImage"),
					() => J("lbl.description"),
					() => J("ph.altText"),
					() => J("lbl.link"),
					() => J("ph.optionalImageLink")
				]), z("change", i, tn), z("change", s, (e) => j("alt", e.target.value)), z("change", u, (e) => j("href", e.target.value || null)), V(e, t);
			}, g = (e) => {
				var t = El(), n = F(t), r = P(n, !0);
				O(n);
				var i = I(n, 2);
				G(i);
				var a = I(i, 2), o = P(a), s = I(o);
				G(s), O(a), L((e, t, a, c) => {
					q(n, "title", e), H(r, t), K(i, R(k).props.url ?? ""), q(i, "placeholder", a), H(o, `${c ?? ""} `), K(s, R(k).props.title ?? "");
				}, [
					() => J("hint.video"),
					() => J("lbl.videoUrl"),
					() => J("ph.videoUrl"),
					() => J("lbl.videoTitle")
				]), z("change", i, (e) => j("url", e.target.value)), z("change", s, (e) => j("title", e.target.value)), V(e, t);
			}, _ = (e) => {
				var t = kl(), n = F(t), r = P(n), i = I(r), a = P(i);
				{
					let e = /* @__PURE__ */ A(() => R(k).props.glyph ?? "★"), t = /* @__PURE__ */ A(() => R(k).props.icon ?? null), n = /* @__PURE__ */ A(() => R(k).props.image ?? null);
					Va(a, {
						get value() {
							return R(e);
						},
						get icon() {
							return R(t);
						},
						get image() {
							return R(n);
						},
						onpick: (e) => Mt(`edit:${R(k).blockId}`, (t) => {
							t.props.glyph = e, t.props.icon = null, t.props.image = null;
						}),
						onicon: (e) => Mt(`edit:${R(k).blockId}`, (t) => {
							t.props.icon = e, t.props.image = null;
						}),
						onimage: (e) => j("image", e)
					});
				}
				var o = I(a, 2), s = (e) => {
					var t = Dl();
					G(t), L((e) => {
						K(t, R(k).props.glyph ?? ""), q(t, "title", e);
					}, [() => J("tip.icon.typeGlyph")]), z("change", t, (e) => j("glyph", e.target.value || "★")), V(e, t);
				}, c = (e) => {
					var t = xl(), n = P(t, !0);
					O(t), L((e, r) => {
						q(t, "title", e), H(n, r);
					}, [() => J("tip.icon.backToGlyph"), () => J("ui.removeDrawnIcon")]), z("click", t, () => j("icon", null)), V(e, t);
				};
				U(o, (e) => {
					R(k).props.icon ? e(c, -1) : e(s);
				}), O(i), O(n);
				var l = I(n, 2), u = (e) => {
					var t = Ol(), n = P(t), r = I(n, 2), i = P(r, !0);
					O(r), O(t), L((e, r, a) => {
						q(t, "title", e), q(n, "src", R(k).props.image), q(n, "alt", r), H(i, a);
					}, [
						() => J("hint.icon.ownImage"),
						() => J("gp.ownIcon"),
						() => J("ui.removeOwnIcon")
					]), z("click", r, () => j("image", null)), V(e, t);
				};
				U(l, (e) => {
					R(k).props.image && e(u);
				}), L((e) => H(r, `${e ?? ""} `), [() => J("blocks.icon")]), V(e, t);
			}, v = (e) => {
				var t = Al(), n = F(t), r = P(n), i = I(r);
				{
					let e = /* @__PURE__ */ A(() => R(k).props.collection ?? ""), t = /* @__PURE__ */ A(() => [["", J("common.choose")], ...R(lo).map((e) => [e, R(po)[e]?.name ?? e])]);
					Y(i, {
						get value() {
							return R(e);
						},
						get options() {
							return R(t);
						},
						onchange: (e) => j("collection", e || null)
					});
				}
				O(n);
				var a = I(n, 2), o = P(a), s = I(o);
				G(s), O(a);
				var c = I(a, 2), l = P(c);
				G(l);
				var u = I(l);
				O(c), L((e, t, i, c, d) => {
					q(n, "title", e), H(r, `${t ?? ""} `), q(a, "title", i), H(o, `${c ?? ""} `), K(s, R(k).props.limit ?? 6), xi(l, R(k).props.newestFirst !== !1), H(u, ` ${d ?? ""}`);
				}, [
					() => J("tip.samling.source"),
					() => J("blocks.samling"),
					() => J("tip.samling.limit"),
					() => J("lbl.maxCount"),
					() => J("lbl.newestFirst")
				]), z("change", s, (e) => j("limit", Number(e.target.value))), z("change", l, (e) => j("newestFirst", e.target.checked)), V(e, t);
			}, y = (e) => {
				var t = Nl(), n = F(t), r = P(n), i = I(r);
				{
					let e = /* @__PURE__ */ A(() => R(k).props.collection ?? ""), t = /* @__PURE__ */ A(() => [["", J("common.choose")], ...R(lo).filter((e) => R(po)[e]?.kind === "products").map((e) => [e, R(po)[e]?.name ?? e])]);
					Y(i, {
						get value() {
							return R(e);
						},
						get options() {
							return R(t);
						},
						onchange: (e) => j("collection", e || null)
					});
				}
				O(n);
				var a = I(n, 2), o = (e) => {
					var t = jl(), n = P(t), r = P(n, !0);
					O(n);
					var i = I(n, 2), a = P(i, !0);
					O(i), O(t), L((e, t, o, s) => {
						q(n, "title", e), H(r, t), q(i, "title", o), H(a, s);
					}, [
						() => J("tip.produkt.addProduct"),
						() => J("ui.addProduct"),
						() => J("tip.produkt.editCatalog"),
						() => J("ui.editCatalog")
					]), z("click", n, () => Go(R(k).props.collection)), z("click", i, () => {
						N(mo, R(k).props.collection, !0), N(lt, "collections");
					}), V(e, t);
				}, s = (e) => {
					var t = Ml(), n = P(t, !0);
					O(t), L((e, r) => {
						q(t, "title", e), H(n, r);
					}, [() => J("tip.produkt.createCatalog"), () => J("ui.createCatalog")]), z("click", t, Bo), V(e, t);
				}, c = /* @__PURE__ */ A(() => !R(lo).some((e) => R(po)[e]?.kind === "products"));
				U(a, (e) => {
					R(k).props.collection && R(po)[R(k).props.collection]?.kind === "products" ? e(o) : R(c) && e(s, 1);
				});
				var l = I(a, 2), u = P(l), d = I(u);
				G(d), O(l);
				var f = I(l, 2), p = P(f), m = I(p);
				G(m), O(f), L((e, t, i, a, o, s) => {
					q(n, "title", e), H(r, `${t ?? ""} `), q(l, "title", i), H(u, `${a ?? ""} `), K(d, R(k).props.limit ?? 0), q(f, "title", o), H(p, `${s ?? ""} `), K(m, R(k).props.currency ?? "kr");
				}, [
					() => J("tip.produkt.source"),
					() => J("blocks.samling"),
					() => J("tip.samling.limit"),
					() => J("lbl.maxCount"),
					() => J("tip.produkt.currency"),
					() => J("lbl.currency")
				]), z("change", d, (e) => j("limit", Number(e.target.value))), z("change", m, (e) => j("currency", e.target.value)), V(e, t);
			}, b = (e) => {
				var t = Pl(), n = F(t), r = P(n), i = I(r);
				{
					let e = /* @__PURE__ */ A(() => R(k).props.href ?? ""), t = /* @__PURE__ */ A(() => [["", J("common.none")], ...R(D).pages.map((e) => [e.path, e.title])]);
					Y(i, {
						get value() {
							return R(e);
						},
						get options() {
							return R(t);
						},
						onchange: (e) => j("href", e)
					});
				}
				O(n);
				var a = I(n, 2), o = P(a), s = I(o);
				G(s), O(a), L((e, t, i, c) => {
					q(n, "title", e), H(r, `${t ?? ""} `), q(a, "title", i), H(o, `${c ?? ""} `), K(s, R(k).props.currency ?? "kr");
				}, [
					() => J("tip.handlekurv.checkout"),
					() => J("lbl.checkoutPage"),
					() => J("tip.produkt.currency"),
					() => J("lbl.currency")
				]), z("change", s, (e) => j("currency", e.target.value)), V(e, t);
			}, x = (e) => {
				var t = Fl(), n = F(t), r = P(n), i = I(r);
				G(i), O(n);
				var a = I(n, 2), o = P(a), s = I(o);
				G(s), O(a);
				var c = I(a, 2), l = P(c), u = I(l);
				G(u), O(c);
				var d = I(c, 2), f = P(d);
				G(f);
				var p = I(f);
				O(d);
				var m = I(d, 2), h = P(m), g = I(h);
				G(g), O(m), L((e, t, _, v, y, b, x, S, C, w) => {
					q(n, "title", e), H(r, `${t ?? ""} `), K(i, R(k).props.recipient ?? ""), q(a, "title", _), H(o, `${v ?? ""} `), K(s, R(k).props.endpoint ?? ""), q(c, "title", y), H(l, `${b ?? ""} `), K(u, R(k).props.vipps ?? ""), q(d, "title", x), xi(f, R(k).props.vippsCheckout === !0), H(p, ` ${S ?? ""}`), q(m, "title", C), H(h, `${w ?? ""} `), K(g, R(k).props.currency ?? "kr");
				}, [
					() => J("tip.kasse.recipient"),
					() => J("lbl.recipientEmail"),
					() => J("tip.kasse.endpoint"),
					() => J("lbl.endpointUrl"),
					() => J("tip.kasse.vipps"),
					() => J("lbl.vippsNumber"),
					() => J("tip.kasse.vippsCheckout"),
					() => J("lbl.vippsCheckout"),
					() => J("tip.produkt.currency"),
					() => J("lbl.currency")
				]), z("change", i, (e) => j("recipient", e.target.value.trim())), z("change", s, (e) => j("endpoint", e.target.value.trim())), z("change", u, (e) => j("vipps", e.target.value.trim())), z("change", f, (e) => j("vippsCheckout", e.target.checked)), z("change", g, (e) => j("currency", e.target.value)), V(e, t);
			}, S = (e) => {
				var t = Ll(), n = F(t), r = P(n), i = I(r);
				O(n), qr(I(n, 2), 17, () => R(k).props.images ?? [], Ur, (e, t, n) => {
					var r = Il(), i = P(r), a = P(i), o = I(a, 2), s = P(o);
					s.disabled = n === 0, W(s, () => c.up, !0), O(s);
					var l = I(s, 2);
					W(l, () => c.down, !0), O(l);
					var u = I(l, 2);
					W(u, () => c.cross, !0), O(u), O(o), O(i);
					var d = I(i, 2), f = P(d), p = I(f);
					G(p), O(d);
					var m = I(d, 2), h = P(m), g = I(h);
					G(g), O(m), O(r), L((e, r, o, s, c, d) => {
						q(i, "title", e), q(a, "src", R(t).src), l.disabled = n === R(k).props.images.length - 1, q(u, "title", r), H(f, `${o ?? ""} `), K(p, R(t).alt ?? ""), q(p, "placeholder", s), H(h, `${c ?? ""} `), K(g, R(t).href ?? ""), q(g, "placeholder", d);
					}, [
						() => J("hint.gallery"),
						() => J("tip.removeImage"),
						() => J("lbl.description"),
						() => J("ph.altShort"),
						() => J("lbl.link"),
						() => J("ph.galleryHref")
					]), z("click", s, () => yp(n, -1)), z("click", l, () => yp(n, 1)), z("click", u, () => bp(n)), z("change", p, (e) => xp(n, "alt", e.target.value)), z("change", g, (e) => xp(n, "href", e.target.value || null)), V(e, r);
				}), L((e, t) => {
					q(n, "title", e), H(r, `${t ?? ""} `);
				}, [() => J("tip.gallery.addImages"), () => J("ui.addImages")]), z("change", i, _p), V(e, t);
			}, C = (e) => {
				var t = cl(), n = P(t);
				Y(I(n), {
					get value() {
						return R(k).props.kind;
					},
					get options() {
						return an;
					},
					onchange: (e) => j("kind", e)
				}), O(t), L((e) => H(n, `${e ?? ""} `), [() => J("blocks.shape")]), V(e, t);
			}, w = (e) => {
				let t = /* @__PURE__ */ A(() => R(cp).find((e) => e.type === R(k).type)?.fields ?? []);
				var n = Ir(), r = F(n), i = (e) => {
					var n = Ir();
					qr(F(n), 17, () => R(t), (e) => e.key, (e, t) => {
						var n = Ir(), r = F(n), i = (e) => {
							let n = /* @__PURE__ */ A(() => `${R(k).blockId}:${R(t).key}`);
							var r = zl(), i = F(r), a = P(i), o = I(a);
							G(o), O(i);
							var s = I(i, 2), c = P(s, !0);
							O(s);
							var l = I(s, 2), u = (e) => {
								var t = Rl();
								let r;
								var i = P(t, !0);
								O(t), L(() => {
									r = mi(t, 1, "panel-hint svelte-1n46o8q", null, r, { "place-error": Ft[R(n)].err }), H(i, Ft[R(n)].text);
								}), V(e, t);
							};
							U(l, (e) => {
								Ft[R(n)] && e(u);
							}), L((e) => {
								H(a, `${R(t).label ?? ""} `), q(o, "placeholder", R(t).placeholder), K(o, Pt[R(n)] ?? R(k).props[R(t).key] ?? ""), s.disabled = R(It), H(c, e);
							}, [() => J("props.place.search")]), z("input", o, (e) => {
								Pt[R(n)] = e.target.value;
							}), z("keydown", o, (e) => {
								e.key === "Enter" && zt(R(t));
							}), z("click", s, () => zt(R(t))), V(e, r);
						}, a = (e) => {
							var n = Bl(), r = P(n), i = I(r);
							G(i), O(n), L(() => {
								H(r, `${R(t).label ?? ""} `), q(i, "min", R(t).min), q(i, "max", R(t).max), q(i, "step", R(t).step ?? 1), K(i, R(k).props[R(t).key]);
							}), z("change", i, (e) => j(R(t).key, Rt(R(t), Number(e.target.value)))), V(e, n);
						}, o = (e) => {
							var n = yl(), r = P(n);
							G(r);
							var i = I(r);
							O(n), L((e) => {
								xi(r, e), H(i, ` ${R(t).label ?? ""}`);
							}, [() => !!R(k).props[R(t).key]]), z("change", r, (e) => j(R(t).key, e.target.checked)), V(e, n);
						}, s = (e) => {
							var n = cl(), r = P(n), i = I(r);
							{
								let e = /* @__PURE__ */ A(() => (R(t).options ?? []).map((e) => [e.value, e.label]));
								Y(i, {
									get value() {
										return R(k).props[R(t).key];
									},
									get options() {
										return R(e);
									},
									onchange: (e) => j(R(t).key, e)
								});
							}
							O(n), L(() => H(r, `${R(t).label ?? ""} `)), V(e, n);
						}, c = (e) => {
							var n = Vl(), r = P(n), i = I(r);
							G(i), O(n), L(() => {
								H(r, `${R(t).label ?? ""} `), q(i, "placeholder", R(t).placeholder), K(i, R(k).props[R(t).key] ?? "");
							}), z("change", i, (e) => j(R(t).key, e.target.value)), V(e, n);
						};
						U(r, (e) => {
							R(t).type === "place" ? e(i) : R(t).type === "number" ? e(a, 1) : R(t).type === "toggle" ? e(o, 2) : R(t).type === "select" ? e(s, 3) : e(c, -1);
						}), V(e, n);
					}), V(e, n);
				}, a = (e) => {
					var t = xl(), n = P(t, !0);
					O(t), L((e, r) => {
						q(t, "title", e), H(n, r);
					}, [() => J("hint.pluginBlock"), () => J("ui.settings")]), z("click", t, () => E?.sendOpenConfig(R(k).blockId)), V(e, t);
				};
				U(r, (e) => {
					R(t).length ? e(i) : e(a, -1);
				}), V(e, n);
			};
			U(n, (e) => {
				R(k).type === "text" ? e(r) : R(k).type === "faq" ? e(i, 1) : R(k).type === "tidslinje" ? e(a, 2) : R(k).type === "sitat" ? e(o, 3) : R(k).type === "statistikk" ? e(s, 4) : R(k).type === "tabell" ? e(l, 5) : R(k).type === "deling" ? e(u, 6) : R(k).type === "nedteller" ? e(d, 7) : R(k).type === "audio" ? e(f, 8) : R(k).type === "button" ? e(p, 9) : R(k).type === "image" ? e(m, 10) : R(k).type === "video" ? e(g, 11) : R(k).type === "icon" ? e(_, 12) : R(k).type === "samling" ? e(v, 13) : R(k).type === "produkt" ? e(y, 14) : R(k).type === "handlekurv" ? e(b, 15) : R(k).type === "kasse" ? e(x, 16) : R(k).type === "galleri" ? e(S, 17) : R(k).type === "shape" ? e(C, 18) : e(w, -1);
			}), V(e, t);
		}, m = (e) => {
			var t = lu(), n = F(t), r = (e) => {
				var t = Hl(), n = F(t), r = P(n), a = I(r);
				{
					let e = /* @__PURE__ */ A(() => R(k).props.align ?? "left"), t = /* @__PURE__ */ A(() => [
						["left", J("common.left")],
						["center", J("common.center")],
						["right", J("common.right")]
					]);
					Y(a, {
						get value() {
							return R(e);
						},
						get options() {
							return R(t);
						},
						onchange: (e) => j("align", e)
					});
				}
				O(n);
				var o = I(n, 2), s = P(o);
				G(s);
				var c = I(s);
				O(o);
				var l = I(o, 2), u = (e) => {
					i(e);
				};
				U(l, (e) => {
					R(k).props.box && e(u);
				}), Le(2), L((e, t, n) => {
					H(r, `${e ?? ""} `), xi(s, t), H(c, ` ${n ?? ""}`);
				}, [
					() => J("lbl.align"),
					() => !!R(k).props.box,
					() => J("lbl.textBoxToggle")
				]), z("change", s, (e) => j("box", e.target.checked)), V(e, t);
			}, a = (e) => {
				var t = Ul(), n = F(t), r = P(n, !0);
				O(n);
				var a = I(n, 2);
				i(a), Le(2), L((e) => H(r, e), [() => J("lbl.cardStyle")]), V(e, t);
			}, o = (e) => {
				var t = Wl(), n = F(t), r = P(n), i = I(r);
				{
					let e = /* @__PURE__ */ A(() => R(k).props.variant ?? "venstre"), t = /* @__PURE__ */ A(() => [["venstre", J("opt.tl.venstre")], ["veksler", J("opt.tl.veksler")]]);
					Y(i, {
						get value() {
							return R(e);
						},
						get options() {
							return R(t);
						},
						onchange: (e) => j("variant", e)
					});
				}
				O(n);
				var a = I(n, 2), o = P(a), s = I(o);
				{
					let e = /* @__PURE__ */ A(() => R(k).props.marker ?? "fylt"), t = /* @__PURE__ */ A(() => [["fylt", J("opt.tl.fylt")], ["ring", J("opt.tl.ring")]]);
					Y(s, {
						get value() {
							return R(e);
						},
						get options() {
							return R(t);
						},
						onchange: (e) => j("marker", e)
					});
				}
				O(a);
				var c = I(a, 2), l = P(c), u = I(l);
				{
					let e = /* @__PURE__ */ A(() => R(k).props.accent ?? "accent"), t = /* @__PURE__ */ A(ur);
					ca(u, {
						get value() {
							return R(e);
						},
						get tokens() {
							return R(t);
						},
						onchange: (e) => j("accent", e === "accent" ? null : e)
					});
				}
				O(c), Le(2), L((e, t, n) => {
					H(r, `${e ?? ""} `), H(o, `${t ?? ""} `), H(l, `${n ?? ""} `);
				}, [
					() => J("lbl.variant"),
					() => J("lbl.tlMarker"),
					() => J("lbl.color")
				]), V(e, t);
			}, s = (e) => {
				var t = Kl(), n = F(t), r = P(n), i = I(r);
				{
					let e = /* @__PURE__ */ A(() => R(k).props.variant ?? "stor"), t = /* @__PURE__ */ A(() => [["stor", J("opt.sitat.stor")], ["kort", J("opt.sitat.kort")]]);
					Y(i, {
						get value() {
							return R(e);
						},
						get options() {
							return R(t);
						},
						onchange: (e) => j("variant", e)
					});
				}
				O(n);
				var a = I(n, 2), o = (e) => {
					var t = Gl(), n = F(t), r = P(n), i = I(r);
					O(n);
					var a = I(n, 2), o = (e) => {
						var t = xl(), n = P(t, !0);
						O(t), L((e) => H(n, e), [() => J("ui.sitatPortrettFjern")]), z("click", t, () => j("image", "")), V(e, t);
					};
					U(a, (e) => {
						R(k).props.image && e(o);
					}), L((e) => H(r, `${e ?? ""} `), [() => J("ui.sitatPortrett")]), z("change", i, nn), V(e, t);
				};
				U(a, (e) => {
					R(k).props.variant === "kort" && e(o);
				});
				var s = I(a, 2), c = P(s), l = I(c);
				{
					let e = /* @__PURE__ */ A(() => R(k).props.accent ?? "accent"), t = /* @__PURE__ */ A(ur);
					ca(l, {
						get value() {
							return R(e);
						},
						get tokens() {
							return R(t);
						},
						onchange: (e) => j("accent", e === "accent" ? null : e)
					});
				}
				O(s), Le(2), L((e, t) => {
					H(r, `${e ?? ""} `), H(c, `${t ?? ""} `);
				}, [() => J("lbl.variant"), () => J("lbl.color")]), V(e, t);
			}, c = (e) => {
				var t = ql(), n = F(t), r = P(n);
				G(r);
				var i = I(r);
				O(n), Le(2), L((e, t) => {
					q(n, "title", e), xi(r, R(k).props.countUp !== !1), H(i, ` ${t ?? ""}`);
				}, [() => J("tip.stat.countUp"), () => J("lbl.statCountUp")]), z("change", r, (e) => j("countUp", e.target.checked)), V(e, t);
			}, l = (e) => {
				var t = Jl(), n = F(t), r = P(n), i = I(r);
				{
					let e = /* @__PURE__ */ A(() => R(k).props.lines ?? "rows"), t = /* @__PURE__ */ A(() => [
						["rows", J("opt.tabell.rows")],
						["grid", J("opt.tabell.grid")],
						["none", J("common.none")]
					]);
					Y(i, {
						get value() {
							return R(e);
						},
						get options() {
							return R(t);
						},
						onchange: (e) => j("lines", e)
					});
				}
				O(n);
				var a = I(n, 2), o = P(a);
				G(o);
				var s = I(o);
				O(a), Le(2), L((e, t, n) => {
					H(r, `${e ?? ""} `), xi(o, t), H(s, ` ${n ?? ""}`);
				}, [
					() => J("lbl.tabellLines"),
					() => !!R(k).props.striped,
					() => J("lbl.tabellStriped")
				]), z("change", o, (e) => j("striped", e.target.checked)), V(e, t);
			}, u = (e) => {
				var t = Yl(), n = F(t), r = P(n), i = I(r);
				{
					let e = /* @__PURE__ */ A(() => R(k).props.variant ?? "icons"), t = /* @__PURE__ */ A(() => [["icons", J("opt.deling.icons")], ["labels", J("opt.deling.labels")]]);
					Y(i, {
						get value() {
							return R(e);
						},
						get options() {
							return R(t);
						},
						onchange: (e) => j("variant", e)
					});
				}
				O(n);
				var a = I(n, 2), o = P(a), s = I(o);
				G(s), O(a);
				var c = I(a, 2), l = P(c), u = I(l);
				{
					let e = /* @__PURE__ */ A(() => R(k).props.color || "accent"), t = /* @__PURE__ */ A(ur);
					ca(u, {
						get value() {
							return R(e);
						},
						get tokens() {
							return R(t);
						},
						onchange: (e) => j("color", e === "accent" ? "" : e)
					});
				}
				O(c), Le(2), L((e, t, n) => {
					H(r, `${e ?? ""} `), H(o, `${t ?? ""} `), K(s, R(k).props.size ?? 38), H(l, `${n ?? ""} `);
				}, [
					() => J("lbl.variant"),
					() => J("lbl.size"),
					() => J("lbl.color")
				]), z("change", s, (e) => j("size", Number(e.target.value) || 38)), V(e, t);
			}, d = (e) => {
				var t = Jl(), n = F(t), r = P(n), i = I(r);
				{
					let e = /* @__PURE__ */ A(() => R(k).props.variant ?? "boxes"), t = /* @__PURE__ */ A(() => [["boxes", J("opt.nedteller.boxes")], ["plain", J("opt.nedteller.plain")]]);
					Y(i, {
						get value() {
							return R(e);
						},
						get options() {
							return R(t);
						},
						onchange: (e) => j("variant", e)
					});
				}
				O(n);
				var a = I(n, 2), o = P(a);
				G(o);
				var s = I(o);
				O(a), Le(2), L((e, t) => {
					H(r, `${e ?? ""} `), xi(o, R(k).props.showSeconds !== !1), H(s, ` ${t ?? ""}`);
				}, [() => J("lbl.variant"), () => J("lbl.nedtellerSeconds")]), z("change", o, (e) => j("showSeconds", e.target.checked)), V(e, t);
			}, f = (e) => {
				var t = Xl(), n = F(t), r = P(n), i = I(r);
				{
					let e = /* @__PURE__ */ A(() => [["primary", J("opt.btn.primary")], ["secondary", J("opt.btn.secondary")]]);
					Y(i, {
						get value() {
							return R(k).props.style;
						},
						get options() {
							return R(e);
						},
						onchange: (e) => j("style", e)
					});
				}
				O(n), Le(2), L((e) => H(r, `${e ?? ""} `), [() => J("lbl.style")]), V(e, t);
			}, p = (e) => {
				var t = Zl(), n = F(t), r = P(n), i = I(r);
				{
					let e = /* @__PURE__ */ A(() => R(k).props.fit ?? "cover"), t = /* @__PURE__ */ A(() => [["cover", J("opt.fitFrame.cover")], ["contain", J("opt.fitFrame.contain")]]);
					Y(i, {
						get value() {
							return R(e);
						},
						get options() {
							return R(t);
						},
						onchange: (e) => j("fit", e)
					});
				}
				O(n);
				var a = I(n, 2), o = P(a), s = I(o);
				{
					let e = /* @__PURE__ */ A(() => R(k).props.radius ?? ""), t = /* @__PURE__ */ A(() => [
						["", J("common.none")],
						["sm", J("opt.size.sm")],
						["md", J("opt.radius.md")]
					]);
					Y(s, {
						get value() {
							return R(e);
						},
						get options() {
							return R(t);
						},
						onchange: (e) => j("radius", e || null)
					});
				}
				O(a);
				var c = I(a, 2), l = P(c), u = I(l), d = P(u);
				O(u), O(c);
				var f = I(c, 2);
				G(f);
				var p = I(f, 2), m = P(p), h = I(m), g = P(h);
				O(h), O(p);
				var _ = I(p, 2);
				G(_);
				var v = I(_, 2), y = P(v), b = I(y), x = P(b);
				O(b), O(v);
				var S = I(v, 2);
				G(S);
				var C = I(S, 2), w = P(C), ee = I(w), te = P(ee);
				O(ee), O(C);
				var ne = I(C, 2);
				G(ne);
				var re = I(ne, 2), ie = P(re), ae = I(ie), oe = P(ae);
				O(ae), O(re);
				var se = I(re, 2);
				G(se);
				var ce = I(se, 2), le = P(ce), ue = I(le), de = P(ue);
				O(ue), O(ce);
				var fe = I(ce, 2);
				G(fe);
				var pe = I(fe, 2), me = P(pe, !0);
				O(pe), Le(2), L((e, t, n, i, a, s, c, u, p, h, b, C, ee, re, ae, ce, ue) => {
					H(r, `${e ?? ""} `), H(o, `${t ?? ""} `), H(l, `${n ?? ""} `), H(d, `${i ?? ""}%`), K(f, R(k).props.x ?? .5), H(m, `${a ?? ""} `), H(g, `${s ?? ""}%`), K(_, R(k).props.y ?? .5), q(v, "title", c), H(y, `${u ?? ""} `), H(x, `${p ?? ""}x`), K(S, R(k).props.zoom ?? 1), H(w, `${h ?? ""} `), H(te, `${b ?? ""}%`), K(ne, R(k).props.brightness ?? 1), H(ie, `${C ?? ""} `), H(oe, `${ee ?? ""}%`), K(se, R(k).props.contrast ?? 1), H(le, `${re ?? ""} `), H(de, `${ae ?? ""}%`), K(fe, R(k).props.saturate ?? 1), q(pe, "title", ce), H(me, ue);
				}, [
					() => J("lbl.fit"),
					() => J("lbl.radius"),
					() => J("lbl.focusX"),
					() => Math.round((R(k).props.x ?? .5) * 100),
					() => J("lbl.focusY"),
					() => Math.round((R(k).props.y ?? .5) * 100),
					() => J("tip.zoomCrop"),
					() => J("lbl.zoom"),
					() => (R(k).props.zoom ?? 1).toFixed(2),
					() => J("lbl.brightness"),
					() => Math.round((R(k).props.brightness ?? 1) * 100),
					() => J("lbl.contrast"),
					() => Math.round((R(k).props.contrast ?? 1) * 100),
					() => J("lbl.saturate"),
					() => Math.round((R(k).props.saturate ?? 1) * 100),
					() => J("tip.resetAdjust"),
					() => J("ui.resetAdjust")
				]), z("input", f, (e) => j("x", Number(e.target.value))), z("input", _, (e) => j("y", Number(e.target.value))), z("input", S, (e) => j("zoom", Number(e.target.value))), z("input", ne, (e) => j("brightness", Number(e.target.value))), z("input", se, (e) => j("contrast", Number(e.target.value))), z("input", fe, (e) => j("saturate", Number(e.target.value))), z("click", pe, () => Mt(`edit:${R(k).blockId}`, (e) => {
					e.props.brightness = 1, e.props.contrast = 1, e.props.saturate = 1;
				})), V(e, t);
			}, m = (e) => {
				var t = Ql(), n = F(t), r = P(n), i = I(r);
				G(i), O(n);
				var a = I(n, 2), o = P(a), s = I(o);
				{
					let e = /* @__PURE__ */ A(() => R(k).props.color ?? "accent"), t = /* @__PURE__ */ A(ur);
					ca(s, {
						get value() {
							return R(e);
						},
						get tokens() {
							return R(t);
						},
						onchange: (e) => j("color", e)
					});
				}
				O(a), Le(2), L((e, t, n) => {
					H(r, `${e ?? ""} `), K(i, R(k).props.size ?? 48), q(a, "title", t), H(o, `${n ?? ""} `);
				}, [
					() => J("lbl.sizePx"),
					() => J("hint.icon.color"),
					() => J("lbl.color")
				]), z("change", i, (e) => j("size", Number(e.target.value))), V(e, t);
			}, h = (e) => {
				var t = Xl(), n = F(t), r = P(n), i = I(r);
				{
					let e = /* @__PURE__ */ A(() => R(k).props.view ?? "cards"), t = /* @__PURE__ */ A(() => [
						["cards", J("opt.collectionView.cards")],
						["list", J("opt.collectionView.list")],
						["archive", J("opt.collectionView.archive")]
					]);
					Y(i, {
						get value() {
							return R(e);
						},
						get options() {
							return R(t);
						},
						onchange: (e) => j("view", e)
					});
				}
				O(n), Le(2), L((e) => H(r, `${e ?? ""} `), [() => J("lbl.view")]), V(e, t);
			}, g = (e) => {
				var t = $l(), n = F(t), r = P(n), i = I(r);
				G(i), O(n), Le(2), L((e, t) => {
					q(n, "title", e), H(r, `${t ?? ""} `), K(i, R(k).props.columns ?? 0);
				}, [() => J("tip.produkt.columns"), () => J("lbl.columns")]), z("change", i, (e) => j("columns", Number(e.target.value))), V(e, t);
			}, _ = (e) => {
				var t = Xl(), n = F(t), r = P(n), i = I(r);
				{
					let e = /* @__PURE__ */ A(() => R(k).props.variant ?? "button"), t = /* @__PURE__ */ A(() => [["button", J("opt.handlekurv.button")], ["icon", J("opt.handlekurv.icon")]]);
					Y(i, {
						get value() {
							return R(e);
						},
						get options() {
							return R(t);
						},
						onchange: (e) => j("variant", e)
					});
				}
				O(n), Le(2), L((e) => H(r, `${e ?? ""} `), [() => J("lbl.view")]), V(e, t);
			}, v = (e) => {
				var t = nu(), n = F(t), r = P(n), i = I(r);
				{
					let e = /* @__PURE__ */ A(() => R(k).props.view ?? "grid"), t = /* @__PURE__ */ A(() => [
						["grid", J("opt.galleryView.grid")],
						["carousel", J("opt.galleryView.carousel")],
						["slides", J("opt.galleryView.slides")]
					]);
					Y(i, {
						get value() {
							return R(e);
						},
						get options() {
							return R(t);
						},
						onchange: (e) => j("view", e)
					});
				}
				O(n);
				var a = I(n, 2), o = (e) => {
					var t = eu(), n = F(t), r = P(n), i = I(r);
					G(i), O(n);
					var a = I(n, 2), o = P(a), s = I(o), c = P(s);
					O(s), O(a);
					var l = I(a, 2);
					G(l), L((e, t) => {
						H(r, `${e ?? ""} `), K(i, R(k).props.columns ?? 3), H(o, `${t ?? ""} `), H(c, `${R(k).props.gap ?? 12 ?? ""} px`), K(l, R(k).props.gap ?? 12);
					}, [() => J("lbl.columns"), () => J("lbl.imageGap")]), z("change", i, (e) => j("columns", Number(e.target.value))), z("input", l, (e) => j("gap", Number(e.target.value))), V(e, t);
				};
				U(a, (e) => {
					(R(k).props.view ?? "grid") === "grid" && e(o);
				});
				var s = I(a, 2), c = (e) => {
					var t = tu(), n = P(t), r = I(n);
					G(r), O(t), L((e) => {
						H(n, `${e ?? ""} `), K(r, R(k).props.interval ?? 5);
					}, [() => J("lbl.secondsPerImage")]), z("change", r, (e) => j("interval", Number(e.target.value))), V(e, t);
				};
				U(s, (e) => {
					R(k).props.view === "slides" && e(c);
				});
				var l = I(s, 2), u = P(l), d = I(u);
				{
					let e = /* @__PURE__ */ A(() => R(k).props.radius ?? ""), t = /* @__PURE__ */ A(() => [
						["", J("common.none")],
						["sm", J("opt.size.sm")],
						["md", J("opt.radius.md")]
					]);
					Y(d, {
						get value() {
							return R(e);
						},
						get options() {
							return R(t);
						},
						onchange: (e) => j("radius", e || null)
					});
				}
				O(l);
				var f = I(l, 2), p = P(f);
				G(p);
				var m = I(p);
				O(f), Le(2), L((e, t, n, i) => {
					H(r, `${e ?? ""} `), H(u, `${t ?? ""} `), q(f, "title", n), xi(p, R(k).props.lightbox !== !1), H(m, ` ${i ?? ""}`);
				}, [
					() => J("lbl.view"),
					() => J("lbl.radius"),
					() => J("tip.lightbox"),
					() => J("lbl.lightbox")
				]), z("change", p, (e) => j("lightbox", e.target.checked)), V(e, t);
			}, y = (e) => {
				var t = ru(), n = F(t), r = P(n);
				Y(I(r), {
					get value() {
						return R(k).props.color;
					},
					get options() {
						return cn;
					},
					onchange: (e) => j("color", e)
				}), O(n);
				var i = I(n, 2), a = P(i), o = I(a);
				G(o), O(i);
				var s = I(i, 2), c = P(s);
				G(c);
				var l = I(c);
				O(s), Le(2), L((e, t, n, i, u) => {
					H(r, `${e ?? ""} `), H(a, `${t ?? ""} `), K(o, R(k).props.thickness), q(s, "title", n), xi(c, i), H(l, ` ${u ?? ""}`);
				}, [
					() => J("lbl.color"),
					() => J("lbl.thickness"),
					() => J("tip.shape.fill"),
					() => !!R(k).props.fill,
					() => J("lbl.filled")
				]), z("change", o, (e) => j("thickness", Number(e.target.value))), z("change", c, (e) => j("fill", e.target.checked ? R(k).props.color : null)), V(e, t);
			};
			U(n, (e) => {
				R(k).type === "text" ? e(r) : R(k).type === "faq" ? e(a, 1) : R(k).type === "tidslinje" ? e(o, 2) : R(k).type === "sitat" ? e(s, 3) : R(k).type === "statistikk" ? e(c, 4) : R(k).type === "tabell" ? e(l, 5) : R(k).type === "deling" ? e(u, 6) : R(k).type === "nedteller" ? e(d, 7) : R(k).type === "button" ? e(f, 8) : R(k).type === "image" ? e(p, 9) : R(k).type === "icon" ? e(m, 10) : R(k).type === "samling" ? e(h, 11) : R(k).type === "produkt" ? e(g, 12) : R(k).type === "handlekurv" ? e(_, 13) : R(k).type === "galleri" ? e(v, 14) : R(k).type === "shape" && e(y, 15);
			});
			var b = I(n, 2), x = P(b), S = I(x);
			{
				let e = /* @__PURE__ */ A(() => vr(R(k).animation) ? R(k).animation.type : "");
				Y(S, {
					get value() {
						return R(e);
					},
					get options() {
						return br;
					},
					onchange: (e) => Cr(e || null)
				});
			}
			O(b);
			var C = I(b, 2), w = (e) => {
				var t = iu(), n = F(t), r = P(n), i = I(r);
				G(i), O(n);
				var a = I(n, 2), o = P(a), s = I(o);
				G(s), O(a), L((e, t) => {
					H(r, `${e ?? ""} `), K(i, R(k).animation.props.duration), H(o, `${t ?? ""} `), K(s, R(k).animation.props.delay);
				}, [() => J("lbl.durationMs"), () => J("lbl.delayMs")]), z("change", i, (e) => Dr("duration", Number(e.target.value))), z("change", s, (e) => Dr("delay", Number(e.target.value))), V(e, t);
			}, ee = /* @__PURE__ */ A(() => vr(R(k).animation));
			U(C, (e) => {
				R(ee) && e(w);
			});
			var te = I(C, 2), ne = P(te), re = I(ne);
			{
				let e = /* @__PURE__ */ A(() => R(k).hover?.type ?? (R(k).animation && !vr(R(k).animation) ? R(k).animation.type : ""));
				Y(re, {
					get value() {
						return R(e);
					},
					get options() {
						return xr;
					},
					onchange: (e) => Tr(e || null)
				});
			}
			O(te);
			var ie = I(te, 2), ae = (e) => {
				var t = su(), n = I(F(t), 2), r = P(n);
				G(r);
				var i = I(r);
				O(n);
				var a = I(n, 2), o = (e) => {
					var t = ou(), n = F(t), r = P(n), i = I(r);
					{
						let e = /* @__PURE__ */ A(() => R(k).sticky.mode ?? "scroll"), t = /* @__PURE__ */ A(() => [["scroll", J("opt.sticky.modeScroll")], ["screen", J("opt.sticky.modeScreen")]]);
						Y(i, {
							get value() {
								return R(e);
							},
							get options() {
								return R(t);
							},
							onchange: (e) => Mt(`edit:${R(k).blockId}`, (t) => {
								t.sticky = {
									...t.sticky,
									mode: e
								};
							})
						});
					}
					O(n);
					var a = I(n, 2), o = (e) => {
						var t = au(), n = P(t), r = I(n);
						G(r), O(t), L((e, i) => {
							q(t, "title", e), H(n, `${i ?? ""} `), K(r, R(k).sticky.offset ?? 16);
						}, [() => R(k).sticky.mode === "screen" ? J("tip.stickyEdge") : J("tip.stickyOffset"), () => R(k).sticky.mode === "screen" ? J("lbl.stickyEdge") : J("lbl.stickyOffset")]), z("change", r, (e) => Mt(`edit:${R(k).blockId}`, (t) => {
							t.sticky = {
								...t.sticky,
								offset: Math.max(0, Number(e.target.value) || 0)
							};
						})), V(e, t);
					};
					U(a, (e) => {
						(R(k).sticky.mode !== "screen" || (R(k).sticky.dock ?? "bottom-right") !== "middle-center") && e(o);
					});
					var s = I(a, 2), c = (e) => {
						var t = cl(), n = P(t), r = I(n);
						{
							let e = /* @__PURE__ */ A(() => R(k).sticky.dock ?? "bottom-right"), t = /* @__PURE__ */ A(() => kt.map(([e, t]) => [e, J(t)]));
							Y(r, {
								get value() {
									return R(e);
								},
								get options() {
									return R(t);
								},
								onchange: (e) => Mt(`edit:${R(k).blockId}`, (t) => {
									t.sticky = {
										...t.sticky,
										dock: e
									};
								})
							});
						}
						O(t), L((e, r) => {
							q(t, "title", e), H(n, `${r ?? ""} `);
						}, [() => J("tip.stickyDock"), () => J("lbl.stickyDock")]), V(e, t);
					}, l = (e) => {
						var t = cl(), n = P(t), r = I(n);
						{
							let e = /* @__PURE__ */ A(() => R(k).sticky.until ?? ""), t = /* @__PURE__ */ A(At);
							Y(r, {
								get value() {
									return R(e);
								},
								get options() {
									return R(t);
								},
								onchange: (e) => Mt(`edit:${R(k).blockId}`, (t) => {
									t.sticky = {
										...t.sticky,
										until: e || null
									};
								})
							});
						}
						O(t), L((e, r) => {
							q(t, "title", e), H(n, `${r ?? ""} `);
						}, [() => J("tip.stickyUntil"), () => J("lbl.stickyUntil")]), V(e, t);
					};
					U(s, (e) => {
						R(k).sticky.mode === "screen" ? e(c) : e(l, -1);
					}), L((e, t) => {
						q(n, "title", e), H(r, `${t ?? ""} `);
					}, [() => J("tip.stickyMode"), () => J("lbl.stickyMode")]), V(e, t);
				};
				U(a, (e) => {
					R(k).sticky && e(o);
				}), L((e, t, a) => {
					q(n, "title", e), xi(r, t), H(i, ` ${a ?? ""}`);
				}, [
					() => J("tip.sticky"),
					() => !!R(k).sticky,
					() => J("lbl.sticky")
				]), z("change", r, (e) => Mt(`edit:${R(k).blockId}`, (t) => {
					t.sticky = e.target.checked ? {
						offset: 16,
						until: null
					} : null;
				})), V(e, t);
			};
			U(ie, (e) => {
				R(oe) === "desktop" && e(ae);
			});
			var se = I(ie, 4), ce = P(se), le = P(ce, !0);
			O(ce);
			var ue = I(ce, 2), de = P(ue), fe = (e) => {
				var t = cu(), n = P(t), r = P(n, !0), i = I(r);
				G(i), O(n);
				var a = I(n, 2), o = P(a, !0), s = I(o);
				G(s), O(a);
				var c = I(a, 2), l = P(c, !0), u = I(l);
				G(u), O(c);
				var d = I(c, 2), f = P(d, !0), p = I(f);
				G(p), O(d);
				var m = I(d, 2), h = P(m, !0), g = I(h);
				G(g), O(m);
				var _ = I(m, 2), v = P(_, !0), y = I(v);
				G(y), O(_), O(t), L((e, t, n, a, c, d, _) => {
					H(r, e), K(i, R(k).frame.x), H(o, t), K(s, R(k).frame.y), H(l, n), K(u, R(k).frame.w), H(f, a), K(p, R(k).frame.h), q(m, "title", c), H(h, d), K(g, R(k).frame.z ?? 1), H(v, _), K(y, R(k).frame.rot ?? 0);
				}, [
					() => J("frame.x"),
					() => J("frame.y"),
					() => J("frame.w"),
					() => J("frame.h"),
					() => J("tip.frameZ"),
					() => J("frame.z"),
					() => J("frame.rot")
				]), z("change", i, (e) => Bt("x", Number(e.target.value))), z("change", s, (e) => Bt("y", Number(e.target.value))), z("change", u, (e) => Bt("w", Number(e.target.value))), z("change", p, (e) => Bt("h", Number(e.target.value))), z("change", g, (e) => Bt("z", Number(e.target.value))), z("change", y, (e) => Bt("rot", Number(e.target.value))), V(e, t);
			};
			U(de, (e) => {
				R(oe) === "desktop" && e(fe);
			});
			var pe = I(de, 2), me = P(pe);
			G(me);
			var he = I(me);
			O(pe);
			var ge = I(pe, 2), _e = P(ge);
			G(_e);
			var ve = I(_e);
			O(ge), O(ue), O(se), L((e, t, n, r, i, a, o, s, c, l) => {
				q(b, "title", e), H(x, `${t ?? ""} `), q(te, "title", n), H(ne, `${r ?? ""} `), q(ce, "title", i), H(le, a), q(pe, "title", o), xi(me, R(k).hideMobile), H(he, ` ${s ?? ""}`), q(ge, "title", c), xi(_e, R(k).decor), H(ve, ` ${l ?? ""}`);
			}, [
				() => J("tip.props.blockAnim"),
				() => J("lbl.animIn"),
				() => J("tip.props.blockHover"),
				() => J("lbl.onHover"),
				() => J("hint.placement"),
				() => J("group.placement"),
				() => J("tip.hideMobile"),
				() => J("lbl.hideMobile"),
				() => J("tip.decor"),
				() => J("lbl.decor")
			]), z("change", me, (e) => en(e.target.checked)), z("change", _e, (e) => Xt(e.target.checked)), V(e, t);
		};
		U(f, (e) => {
			R(Lt) === "content" ? e(p) : e(m, -1);
		}), L((e, t) => {
			o = mi(a, 1, "svelte-1n46o8q", null, o, { on: R(Lt) === "content" }), H(s, e), u = mi(l, 1, "svelte-1n46o8q", null, u, { on: R(Lt) === "style" }), H(d, t);
		}, [() => J("props.tabContent"), () => J("props.tabStyle")]), z("click", a, () => N(Lt, "content")), z("click", l, () => N(Lt, "style")), V(e, t);
	}, o = [
		["color", zs],
		["gradient", Zs],
		["glow", Qs],
		["image", wc],
		["bildegalleri", kc],
		["video", Fc],
		["grain", ec]
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
		["lilla", J("adminTheme.lilla")],
		["bronn", J("adminTheme.bronn")],
		["gull", J("adminTheme.gull")],
		["graa", J("adminTheme.graa")],
		["nordlys", J("adminTheme.nordlys")],
		["skumring", J("adminTheme.skumring")],
		["glo", J("adminTheme.glo")]
	], u = /* @__PURE__ */ M(on(localStorage.getItem("urd-admin-theme") ?? "graa"));
	wn(() => {
		document.documentElement.dataset.adminTheme = R(u), localStorage.setItem("urd-admin-theme", R(u)), d();
	});
	function d() {
		let e = getComputedStyle(document.documentElement), t = e.getPropertyValue("--urd-color-accent").trim();
		E?.sendAdminTheme({
			bg: e.getPropertyValue("--urd-color-bg").trim(),
			surface: e.getPropertyValue("--urd-color-surface").trim(),
			accent: t,
			text: e.getPropertyValue("--urd-color-text").trim(),
			"accent-text": p(t)
		});
	}
	function p(e) {
		return Ls(e) == null || (Rs(e, "#ffffff") ?? 0) >= (Rs(e, "#0b0e14") ?? 0) ? "#ffffff" : "#0b0e14";
	}
	let m = /* @__PURE__ */ M(null), g = /* @__PURE__ */ M(null), _ = /* @__PURE__ */ M(!1), v = /* @__PURE__ */ M(""), y = /* @__PURE__ */ M("info"), b = 0;
	function x(e, t = "info") {
		N(v, e, !0), N(y, t, !0);
		let n = ++b;
		t === "ok" && setTimeout(() => {
			b === n && (N(v, ""), N(y, "info"));
		}, 8e3);
	}
	function S() {
		x(J("status.storageFull"), "error");
	}
	function C(e, t) {
		try {
			localStorage.setItem(e, t);
		} catch {
			S();
		}
	}
	let w = /* @__PURE__ */ M(null), ee = /* @__PURE__ */ M(null), te = /* @__PURE__ */ M(on({
		size: 16,
		snap: !0
	})), ne = /* @__PURE__ */ M(!0), re = [
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
	], ie = /* @__PURE__ */ M("desktop"), ae = /* @__PURE__ */ A(() => re.find((e) => e.id === R(ie)) ?? re[0]), oe = /* @__PURE__ */ A(() => R(ae).viewport), se = /* @__PURE__ */ M(null), ce = /* @__PURE__ */ M(0), le = /* @__PURE__ */ M(0), ue = /* @__PURE__ */ M(on(typeof window < "u" ? window.innerWidth : 1280)), de = /* @__PURE__ */ M("fit"), fe = /* @__PURE__ */ M(1), pe = /* @__PURE__ */ A(() => R(da) === "full" ? R(ue) : 1920), me = /* @__PURE__ */ A(() => Za(R(da), R(ma))), he = /* @__PURE__ */ A(() => R(ae).width ?? R(pe)), ge = /* @__PURE__ */ A(() => R(de) === "manual" ? R(fe) : Wa(R(ce), R(he), "fit"));
	function _e(e) {
		let t = Math.min(400, Math.max(10, (Math.round(Math.round(R(ge) * 100) / 10) + e) * 10));
		N(fe, t / 100), N(de, "manual");
	}
	let ve = /* @__PURE__ */ A(() => R(ge) > 0 ? R(le) / R(ge) : R(le)), ye = /* @__PURE__ */ A(() => R(he) * R(ge)), be = /* @__PURE__ */ A(() => R(le)), xe = /* @__PURE__ */ A(() => R(ye) > R(ce) + 1 || R(be) > R(le) + 1);
	wn(() => {
		let e = () => E?.sendCloseMenus();
		return document.addEventListener("pointerdown", e, !0), () => document.removeEventListener("pointerdown", e, !0);
	}), wn(() => {
		let e = R(oe);
		E?.sendViewport(e);
	}), wn(() => {
		let e = R(ge);
		E?.sendZoom(e);
	}), wn(() => {
		let e = () => {
			N(ue, window.innerWidth, !0);
		};
		return window.addEventListener("resize", e), () => window.removeEventListener("resize", e);
	}), wn(() => {
		let e = R(se);
		if (!e || typeof ResizeObserver > "u") return;
		let t = () => {
			N(ce, e.clientWidth, !0), N(le, e.clientHeight, !0);
		};
		t();
		let n = new ResizeObserver(t);
		return n.observe(e), () => n.disconnect();
	});
	let Se = /* @__PURE__ */ M(0);
	function Ce() {
		N(Se, T?.data.sections.filter((e) => e.responsive?.mobile?.attention?.needed).length ?? 0, !0);
	}
	function we() {
		let e = T?.data.sections.find((e) => e.responsive?.mobile?.attention?.needed);
		N(ie, "mobile"), e && setTimeout(() => E?.sendScrollSection(e.id), 0);
	}
	function Te(e) {
		let t = T.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			ze("layout");
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
			}, De(t, "layout-changed"), e.sectionId === R(ln) && N(dn, e.minHeight, !0), R(k)?.sectionId === e.sectionId && Tt(), T.save(), Ne(), E?.sendSection(R(g), t);
		}
	}
	function Ee(e) {
		return e?.blocks?.some((e) => e.frames?.mobile) ?? !1;
	}
	function De(e, t) {
		!e || !Ee(e) || e.responsive?.mobile?.attention?.needed || (e.responsive = {
			...e.responsive ?? {},
			mobile: {
				...e.responsive?.mobile ?? { mode: "auto" },
				attention: {
					needed: !0,
					reason: t,
					since: (/* @__PURE__ */ new Date()).toISOString()
				}
			}
		}, Ce(), E?.sendAttention(e.id, !0));
	}
	let T = null, Oe = null, E = null, D = /* @__PURE__ */ M(null);
	function ke() {
		N(D, Oe.data, !0), Oe.replace(R(D));
	}
	function Ae() {
		E?.sendSite(We(R(D)));
	}
	let je = /* @__PURE__ */ new Set(), Me = () => R(D).pages.find((e) => e.id === R(g));
	function Ne() {
		let e = R(D)?.pages?.some((e) => !je.has(e.id) && localStorage.getItem(`urd-draft-${e.id}`) !== null) ?? !1, t = ao?.hasDraft() || Object.values(oo).some((e) => e.hasDraft()), n = Z?.hasDraft() || Object.values(bo).some((e) => e.hasDraft());
		N(_, e || T?.hasDraft() && !je.has(R(g)) || Oe?.hasDraft() || Q?.hasDraft() || t || n || !1, !0);
	}
	let Pe = [], Fe = [], Ie = null;
	function Re() {
		return JSON.stringify({
			pageId: R(g),
			page: T.data,
			site: Oe.data,
			samlingerIndex: co ? ao.data : null,
			samlinger: co ? Object.fromEntries(Object.entries(oo).map(([e, t]) => [e, t.data])) : {},
			malerIndex: So ? Z.data : null,
			maler: So ? Object.fromEntries(Object.entries(bo).map(([e, t]) => [e, t.data])) : {},
			plugins: Q?.data ?? null
		});
	}
	function ze(e) {
		e === Ie && (e.startsWith("edit:") || e.startsWith("grid:")) || (Pe.push(Re()), Pe.length > 50 && Pe.shift(), Fe.length = 0, Ie = e);
	}
	function Be(e) {
		let { pageId: t, page: n, site: r, samlingerIndex: i, samlinger: a, malerIndex: o, maler: s, plugins: c } = JSON.parse(e);
		if (Oe.replace(r), ke(), Oe.save(), N(te, {
			snap: !0,
			...R(D).grid
		}, !0), Ae(), Ve(i, a ?? {}), He(o, s ?? {}), Ue(c), t && t !== R(g) && R(D).pages.some((e) => e.id === t)) {
			C(`urd-draft-${t}`, JSON.stringify(n)), ci(t, { keepHistory: !0 }), Ne();
			return;
		}
		T.replace(n), T.save(), Ne(), Ce(), Tt(), gn(T.data.sections.find((e) => e.id === R(ln))), R(D).pages.some((e) => e.id === R(g)) ? E?.sendPage(R(g), T.data) : ci(R(D).pages[0].id, { keepHistory: !0 });
	}
	function Ve(e, t) {
		if (!(!ao || !e) && JSON.stringify({
			index: ao.data,
			samlinger: Object.fromEntries(Object.entries(oo).map(([e, t]) => [e, t.data]))
		}) !== JSON.stringify({
			index: e,
			samlinger: t
		})) {
			ao.replace(e), ao.save();
			for (let e of Object.keys(oo)) e in t || (localStorage.removeItem(`urd-draft-samling-${e}`), delete oo[e]);
			for (let [e, n] of Object.entries(t)) {
				if (!oo[e]) {
					let t = so[e] ?? null;
					oo[e] = Xi(`urd-draft-samling-${e}`, () => t, S);
				}
				oo[e].replace(n), oo[e].save();
			}
			N(lo, [...e.samlinger ?? []], !0), R(mo) && !R(lo).includes(R(mo)) && N(mo, null), Mo();
		}
	}
	function He(e, t) {
		if (!(!Z || !e) && JSON.stringify({
			index: Z.data,
			maler: Object.fromEntries(Object.entries(bo).map(([e, t]) => [e, t.data]))
		}) !== JSON.stringify({
			index: e,
			maler: t
		})) {
			Z.replace(e), Z.save();
			for (let e of Object.keys(bo)) e in t || (localStorage.removeItem(`urd-draft-mal-${e}`), delete bo[e]);
			for (let [e, n] of Object.entries(t)) bo[e] || (bo[e] = Xi(`urd-draft-mal-${e}`, () => xo[e] ?? null, S)), bo[e].replace(n), bo[e].save();
			N(Co, [...e.maler ?? []], !0), Ne(), To();
		}
	}
	function Ue(e) {
		!Q || !e || JSON.stringify(Q.data) !== JSON.stringify(e) && (Q.replace(e), Q.save(), ys(), Vs());
	}
	function Ge() {
		Pe.length && (Fe.push(Re()), Be(Pe.pop()), Ie = null, x(J("status.undone")));
	}
	function Ke() {
		Fe.length && (Pe.push(Re()), Be(Fe.pop()), Ie = null, x(J("status.redone")));
	}
	function qe(e) {
		R(Dt) && (e.target instanceof Element && e.target.closest(".block-menu") || N(Dt, null));
	}
	function Xe(e) {
		if (e.key === "Escape" && R(Dt)) {
			N(Dt, null);
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
			].includes(t.type)) || !R(k) || R(oe) === "mobile") return;
			e.preventDefault(), E?.sendDuplicate();
			return;
		}
		if (t !== "z" && t !== "y") return;
		let n = e.target;
		n instanceof HTMLElement && (n.isContentEditable || n.tagName === "TEXTAREA" || n.tagName === "INPUT" && ![
			"number",
			"checkbox",
			"range",
			"color"
		].includes(n.type)) || (e.preventDefault(), t === "y" || e.shiftKey ? Ke() : Ge());
	}
	async function Ze() {
		N(m, uo(await (await fetch("/content/site.json")).json()), !0), Oe = Xi("urd-draft-site", () => R(m), S), (Oe.data.schemaVersion ?? 1) > 3 && (console.warn(`Urd: site-utkastet har schemaVersion ${Oe.data.schemaVersion} (motoren har 3) og forkastes`), Oe.replace(We(R(m)))), Oe.replace(uo(Oe.data)), Oe.save(), ke(), N(te, {
			snap: !0,
			...R(D).grid
		}, !0), await ci(new URLSearchParams(location.search).get("page") ?? R(D).pages[0].id), await Es(), await jo(), await wo(), await Lr(), R(ee) && zr(), R(D).site.setup === !0 && !localStorage.getItem("urd-setup-done") && (N(it, R(D).site.title, !0), N(at, R(D).theme.tokens.color.accent, !0), N(ot, R(D).theme.tokens.color.bg, !0), N(rt, !0));
	}
	let Qe = /* @__PURE__ */ M(null);
	function $e({ title: e, lines: t = [], okLabel: n = J("confirm.ok"), cancelLabel: r = J("confirm.cancel") }) {
		return new Promise((i) => {
			N(Qe, {
				title: e,
				lines: t,
				okLabel: n,
				cancelLabel: r,
				resolve: i
			}, !0);
		});
	}
	function et({ title: e, lines: t = [], value: n = "", placeholder: r = "", okLabel: i = J("confirm.ok"), cancelLabel: a = J("confirm.cancel") }) {
		return new Promise((o) => {
			N(Qe, {
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
	function tt(e) {
		R(Qe)?.resolve(R(Qe).prompt ? e ? R(Qe).value : null : e), N(Qe, null);
	}
	let nt = !1;
	wn(() => {
		if (!R(Qe)) return;
		let e = (e) => {
			e.key === "Escape" && (e.stopPropagation(), tt(!1));
		};
		return document.addEventListener("keydown", e, !0), () => document.removeEventListener("keydown", e, !0);
	});
	let rt = /* @__PURE__ */ M(!1), it = /* @__PURE__ */ M(""), at = /* @__PURE__ */ M("#7c5cff"), ot = /* @__PURE__ */ M("#0b0e14");
	function st() {
		localStorage.setItem("urd-setup-done", "1"), N(rt, !1);
	}
	function ct() {
		let e = R(it).trim();
		e && (Oi("setup", () => {
			R(D).site.title = e, R(D).nav.logo = {
				type: "text",
				value: e
			}, R(D).theme.tokens.color.accent = R(at), R(D).theme.tokens.color.bg = R(ot), delete R(D).site.setup;
		}), st(), x(J("status.setupDone"), "ok"));
	}
	let lt = /* @__PURE__ */ M(null), ft = [
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
	], pt = [
		"rail.thisPage",
		"rail.site",
		"rail.system"
	], mt = Object.fromEntries(ft.flat().map((e) => [e, J(`panel.${e}`)])), ht = {
		pages: ["hint.pages.drafts"],
		blocks: ["hint.blocks.intro"],
		grid: ["hint.grid.intro", "hint.grid.section"],
		collections: ["hint.collections.intro"],
		plugins: ["hint.plugins.intro"],
		history: ["hint.history.intro"]
	}, gt = [
		["se", "Davvisámegiella"],
		["en-GB", "English (UK)"],
		["nb", "Norsk bokmål"],
		["nn", "Norsk nynorsk"],
		["tr", "Türkçe"]
	], _t = (e) => [...e].sort((e, t) => e[1].localeCompare(t[1]));
	function vt(e, t) {
		let n = [];
		for (let r of e) for (let e of ds[r]?.languages ?? []) e?.[t] === !0 && (typeof e.code != "string" || typeof e.name != "string" || !e.name || gt.some(([t]) => t === e.code) || n.some(([t]) => t === e.code) || n.push([e.code, e.name]));
		return n;
	}
	function yt() {
		let e = _t([...gt, ...vt(R(gs), "admin")]);
		return xt === "auto" || e.some(([e]) => e === xt) ? e : [[xt, xt], ...e];
	}
	let bt = () => vt(R($)?.enabled ?? [], "site"), xt = localStorage.getItem("urd-admin-lang") ?? "auto";
	function St(e) {
		e !== xt && (e === "auto" ? localStorage.removeItem("urd-admin-lang") : localStorage.setItem("urd-admin-lang", e), location.reload());
	}
	function Ct(e) {
		N(lt, R(lt) === e ? null : e, !0), R(lt) === "history" && Gr(), R(lt) === "update" && !R($r) && ti();
	}
	let k = /* @__PURE__ */ M(null);
	function wt(e, t) {
		let n = T?.data.sections.find((t) => t.id === e);
		return {
			section: n,
			block: n?.blocks.find((e) => e.id === t)
		};
	}
	function Tt() {
		if (!R(k)) return;
		let { block: e } = wt(R(k).sectionId, R(k).blockId);
		if (!e) {
			N(k, null);
			return;
		}
		N(k, {
			sectionId: R(k).sectionId,
			blockId: R(k).blockId,
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
	function Et(e) {
		if (N(Dt, null), !e.blockId) {
			N(k, null);
			return;
		}
		N(k, {
			sectionId: e.sectionId,
			blockId: e.blockId
		}, !0), e.sectionId && N(ln, e.sectionId, !0), Tt();
	}
	let Dt = /* @__PURE__ */ M(null), Ot = window.matchMedia("(prefers-reduced-motion: reduce)").matches, kt = [
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
	function At() {
		let e = T?.data.sections ?? [], t = e.findIndex((e) => e.id === R(k)?.sectionId);
		return [["", J("opt.sticky.ownSection")], ...e.slice(t + 1).map((e, n) => [e.id, J("opt.sticky.atSection", { n: t + 2 + n })])];
	}
	function jt(e) {
		if (Et(e), !R(k)) return;
		let t = R(w)?.getBoundingClientRect();
		if (!t) return;
		let n = t.left + R(ge) * e.rect.right + 12;
		n + 300 > window.innerWidth - 8 && (n = Math.max(8, t.left + R(ge) * e.rect.left - 300 - 12));
		let r = window.innerHeight - Math.min(window.innerHeight * .7, 560) - 8, i = Math.min(Math.max(8, t.top + R(ge) * e.rect.top), Math.max(8, r));
		N(Dt, {
			left: n,
			top: i
		}, !0);
	}
	function Mt(e, t) {
		let { section: n, block: r } = wt(R(k)?.sectionId, R(k)?.blockId);
		r && (e && ze(e), t(r, n), De(n, "block-edited"), T.save(), Ne(), E?.sendSection(R(g), n), Tt());
	}
	function j(e, t) {
		Mt(`edit:${R(k).blockId}:${e}`, (n) => {
			n.props[e] = t;
		});
	}
	function Nt(e, t) {
		Mt(`edit:${R(k).blockId}:${e}`, (e) => {
			Object.assign(e.props, t);
		});
	}
	let Pt = on({}), Ft = on({}), It = /* @__PURE__ */ M(!1), Lt = /* @__PURE__ */ M("content"), Rt = (e, t) => (Number.isFinite(t) || (t = e.min ?? 0), e.min != null && (t = Math.max(e.min, t)), e.max != null && (t = Math.min(e.max, t)), t);
	async function zt(e) {
		let t = R(k).blockId, n = `${t}:${e.key}`, r = (Pt[n] ?? R(k).props[e.key] ?? "").trim();
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
		N(It, !0), Ft[n] = {
			text: J("props.place.searching"),
			err: !1
		};
		try {
			let i = await fetch(`/api/geocode?q=${encodeURIComponent(r)}`), a = await i.json().catch(() => null);
			if (R(k)?.blockId !== t) return;
			i.ok && Number.isFinite(a?.lat) ? (Nt(e.key, {
				[e.key]: r,
				lat: a.lat,
				lon: a.lon
			}), Ft[n] = null) : Ft[n] = {
				text: Hi(a) ?? J("props.place.notFound"),
				err: !0
			};
		} catch {
			Ft[n] = {
				text: J("props.place.failed"),
				err: !0
			};
		} finally {
			N(It, !1);
		}
	}
	function Bt(e, t) {
		Number.isFinite(t) && Mt(`edit:frame-${R(k).blockId}:${e}`, (n) => {
			n.frames.desktop = {
				...n.frames.desktop,
				[e]: t
			};
		});
	}
	function Vt(e) {
		Mt(`edit:${R(k).blockId}:boxStyle`, (t) => {
			let n = {
				...t.props.boxStyle ?? {},
				...e
			};
			for (let e of Object.keys(n)) n[e] ?? delete n[e];
			Object.keys(n).length ? t.props.boxStyle = n : delete t.props.boxStyle;
		});
	}
	function Ht(e, t) {
		Mt(`edit:${R(k).blockId}:faq${e}`, (n) => {
			n.props.items[e] = {
				...n.props.items[e],
				...t
			};
		});
	}
	function Ut() {
		Mt("faq-item", (e) => {
			(e.props.items ??= []).push({
				q: J("seed.faq.newQ"),
				a: J("seed.faq.answer")
			});
		});
	}
	function Wt(e) {
		Mt("faq-item", (t) => {
			t.props.items.splice(e, 1);
		});
	}
	function Gt(e, t) {
		let n = e + t;
		Mt("faq-item", (t) => {
			n < 0 || n >= t.props.items.length || ([t.props.items[e], t.props.items[n]] = [t.props.items[n], t.props.items[e]]);
		});
	}
	function Kt(e, t) {
		Mt(`edit:${R(k).blockId}:tl${e}`, (n) => {
			n.props.items[e] = {
				...n.props.items[e],
				...t
			};
		});
	}
	function qt() {
		Mt("tl-item", (e) => {
			(e.props.items ??= []).push({
				year: "",
				title: J("seed.tidslinje.newTitle"),
				text: ""
			});
		});
	}
	function Jt(e) {
		Mt("tl-item", (t) => {
			t.props.items.splice(e, 1);
		});
	}
	function Yt(e, t) {
		let n = e + t;
		Mt("tl-item", (t) => {
			n < 0 || n >= t.props.items.length || ([t.props.items[e], t.props.items[n]] = [t.props.items[n], t.props.items[e]]);
		});
	}
	function Xt(e) {
		Mt("decor", (t) => {
			t.decor = e;
		});
	}
	function Zt(e, t) {
		Mt(`edit:${R(k).blockId}:tabell-form`, (n) => {
			let r = (Array.isArray(n.props.rows) && n.props.rows.length ? n.props.rows : [[""]]).map((e) => Array.isArray(e) ? e.map((e) => String(e ?? "")) : [""]), i = Math.max(1, ...r.map((e) => e.length));
			r = r.map((e) => [...e, ...Array(i - e.length).fill("")]), e > 0 ? r.push(Array(i).fill("")) : e < 0 && r.length > 1 && r.pop(), t > 0 ? r = r.map((e) => [...e, ""]) : t < 0 && i > 1 && (r = r.map((e) => e.slice(0, i - 1))), n.props.rows = r;
		});
	}
	function Qt(e, t) {
		Mt(`edit:${R(k).blockId}:deling`, (n) => {
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
			j("src", String(n.result ?? "")), t.size > 4e5 && x(J("status.audioLarge", { kb: Math.round(t.size / 1024) }), "error");
		}, n.onerror = () => x(J("status.imageReadError"), "error"), n.readAsDataURL(t);
	}
	function en(e) {
		let { section: t, block: n } = wt(R(k)?.sectionId, R(k)?.blockId);
		n && (ze("hide-mobile"), n.hideMobile = e, T.save(), Ne(), E?.sendSection(R(g), t), Tt());
	}
	async function tn(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await Yn(t);
			Mt(`edit:${R(k).blockId}`, (n) => {
				n.props.src = e.dataUrl, n.props.alt = n.props.alt || ba(t.name).replaceAll("-", " ");
			});
		} catch {
			x(J("status.imageReadError"), "error");
		}
	}
	async function nn(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await Yn(t);
			Mt(`edit:${R(k).blockId}`, (t) => {
				t.props.image = e.dataUrl;
			});
		} catch {
			x(J("status.imageReadError"), "error");
		}
	}
	let rn = {
		text: J("blocks.text"),
		button: J("blocks.button"),
		image: J("blocks.image"),
		shape: J("blocks.shape"),
		video: J("blocks.video"),
		icon: J("blocks.icon"),
		galleri: J("blocks.galleri"),
		faq: J("blocks.faq"),
		samling: J("blocks.samling"),
		tidslinje: J("blocks.tidslinje"),
		sitat: J("blocks.sitat"),
		statistikk: J("blocks.statistikk"),
		tabell: J("blocks.tabell"),
		deling: J("blocks.deling"),
		nedteller: J("blocks.nedteller"),
		audio: J("blocks.audio"),
		produkt: J("blocks.produkt"),
		handlekurv: J("blocks.handlekurv"),
		kasse: J("blocks.kasse")
	}, an = [
		["line", J("shape.line")],
		["arrow", J("shape.arrow")],
		["circle", J("shape.circle")],
		["rect", J("shape.rect")],
		["triangle", J("shape.triangle")]
	], cn = [
		["accent", J("color.accent")],
		["text", J("color.text")],
		["surface", J("color.surface")],
		["bg", J("color.bg")]
	], ln = /* @__PURE__ */ M(null), un = /* @__PURE__ */ M(null), dn = /* @__PURE__ */ M(""), fn = /* @__PURE__ */ M(on([])), pn = /* @__PURE__ */ M(null), mn = /* @__PURE__ */ M(null), hn = /* @__PURE__ */ M("");
	function gn(e) {
		N(un, e?.grid ? { ...e.grid } : null, !0), N(dn, e?.size?.minHeight ?? "", !0), N(fn, JSON.parse(JSON.stringify(e?.background?.layers ?? [])), !0), N(pn, e?.animation ? JSON.parse(JSON.stringify(e.animation)) : null, !0), N(mn, e?.hover ? JSON.parse(JSON.stringify(e.hover)) : null, !0), N(hn, e?.theme ?? "", !0);
	}
	let _n = /* @__PURE__ */ M(null), vn = on({});
	function yn() {
		try {
			let e = ((R(w)?.contentDocument)?.querySelector(`.urd-section[data-section-id="${R(ln)}"]`))?.getBoundingClientRect();
			N(_n, e && e.width ? {
				w: e.width,
				h: e.height
			} : null, !0);
		} catch {
			N(_n, null);
		}
	}
	wn(() => {
		R(ln), R(fn), requestAnimationFrame(() => requestAnimationFrame(yn));
	}), wn(() => {
		let e = R(w);
		if (!e || typeof ResizeObserver > "u") return;
		let t = new ResizeObserver(() => yn());
		return t.observe(e), () => t.disconnect();
	}), wn(() => {
		for (let e of R(fn)) {
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
		Cn("section-theme", (t) => {
			e ? t.theme = e : delete t.theme;
		});
	}
	function xn(e) {
		let t = R(lr), n = (e) => e.replaceAll("var(--urd-base-bg)", t.bg).replaceAll("var(--urd-base-surface)", t.surface).replaceAll("var(--urd-base-text)", t.text).replaceAll("var(--urd-base-accent)", t.accent).replaceAll("var(--urd-base-accent-text)", t["accent-text"]), r = Is(e);
		return {
			bg: r["--urd-color-bg"] ? n(r["--urd-color-bg"]) : t.bg,
			surface: r["--urd-color-surface"] ? n(r["--urd-color-surface"]) : t.surface,
			text: r["--urd-color-text"] ? n(r["--urd-color-text"]) : t.text,
			accent: r["--urd-color-accent"] ? n(r["--urd-color-accent"]) : t.accent
		};
	}
	function Sn(e) {
		N(ln, e.sectionId, !0), gn(T?.data.sections.find((t) => t.id === e.sectionId));
	}
	function Cn(e, t) {
		let n = T.data.sections.find((e) => e.id === R(ln));
		n && (ze(e), t(n), T.save(), Ne(), E?.sendSection(R(g), n), gn(n));
	}
	let Tn = /* @__PURE__ */ M("color");
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
		if (!i?.w || !i?.h || !R(_n)?.w || !R(_n)?.h) return;
		let a = R(_n).h * i.w / (R(_n).w * i.h), o = r === "cover" ? Math.max(1, a) : Math.min(1, a);
		(n.props.fit === "flislegg" || n.props.fit === "repeat") && kn(e, t, "fit", "vanlig"), kn(e, t, "size", jn(Math.round(o * 100) / 100));
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
			["none", J("common.none")],
			["pan", J("opt.gradAnim.pan")],
			["pan-loop", J("opt.gradAnim.panLoop")],
			["rotate", J("opt.gradAnim.rotate")]
		],
		radial: [
			["none", J("common.none")],
			["pulse", J("opt.gradAnim.pulse")],
			["orbit", J("opt.gradAnim.orbit")]
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
	let Wn = /* @__PURE__ */ M(null);
	function Gn(e, t, n, r) {
		if (t.button !== 0) return;
		t.preventDefault();
		let i = t.currentTarget.closest(".bg-layer"), a = t.currentTarget.closest(".grad-stop");
		N(Wn, {
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
			N(Wn, {
				...R(Wn),
				insert: n
			}, !0);
		}, u = () => {
			window.removeEventListener("pointermove", l), window.removeEventListener("pointerup", u), c.remove();
			let t = R(Wn);
			if (N(Wn, null), !t) return;
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
		let t = await e.text(), n = ga(t), r = va(t);
		if (!r) return n;
		let i = await qn(n.dataUrl, r);
		if (!i) return n;
		let a = _a(t, i);
		if (a === t) return n;
		try {
			return ga(a);
		} catch {
			return n;
		}
	}
	async function Yn(e) {
		return e.type === "image/svg+xml" || /\.svg$/i.test(e.name || "") ? Jn(e) : pa(e);
	}
	async function Xn(e, t, n) {
		let r = n.target.files?.[0];
		if (n.target.value = "", r) try {
			kn(e, t, "src", (await Yn(r)).dataUrl);
		} catch {
			x(J("status.imageReadError"), "error");
		}
	}
	function Zn(e, t, n) {
		let r = n.target.files?.[0];
		if (n.target.value = "", !r) return;
		if (!["video/mp4", "video/webm"].includes(r.type)) {
			x(J("status.videoFormat"), "error");
			return;
		}
		if (r.size > 15e6) {
			x(J("status.videoTooLarge", {
				mb: (r.size / 1e6).toFixed(1),
				max: Math.round(fa / 1e6)
			}), "error");
			return;
		}
		let i = new FileReader();
		i.onload = () => {
			kn(e, t, "src", String(i.result ?? "")), r.size > 4e6 && x(J("status.videoLarge", { mb: (r.size / 1e6).toFixed(1) }), "error");
		}, i.onerror = () => x(J("status.imageReadError"), "error"), i.readAsDataURL(r);
	}
	async function Qn(e, t, n) {
		let r = n.target.files?.[0];
		if (n.target.value = "", r) try {
			kn(e, t, "poster", (await Yn(r)).dataUrl);
		} catch {
			x(J("status.imageReadError"), "error");
		}
	}
	async function $n(e, t, n) {
		let r = [...n.target.files ?? []];
		if (n.target.value = "", !r.length) return;
		x(J("status.compressingImages"));
		let { images: i, failed: a, big: o } = await hp(r);
		i.length && e.mutate(e.keyPrefix, (e) => {
			let n = e.background.layers[t].props;
			n.images ??= [], n.images.push(...i.map(({ src: e }) => ({
				src: e,
				x: .5,
				y: .5
			})));
		}), gp(i.length, a, o);
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
		Oi(e, () => {
			R(D).nav.style ??= {}, t(R(D).nav.style);
		});
	}
	let ir = /* @__PURE__ */ A(() => ({
		mutate: Cn,
		keyPrefix: "bg",
		keyId: R(ln)
	})), ar = {
		mutate: rr,
		keyPrefix: "navbg",
		keyId: "nav"
	}, or = {
		mutate: Gs,
		keyPrefix: "footerbg",
		keyId: "footer"
	}, sr = () => {
		let e = null;
		try {
			e = localStorage.getItem("urd-theme-mode");
		} catch {}
		return Os(R(D)?.theme?.scheme, e, window.matchMedia("(prefers-color-scheme: dark)").matches);
	}, cr = /* @__PURE__ */ M("light");
	wn(() => {
		N(cr, sr(), !0);
		let e = window.matchMedia("(prefers-color-scheme: dark)"), t = (e) => {
			e instanceof StorageEvent && e.key && e.key !== "urd-theme-mode" || N(cr, sr(), !0);
		};
		return e.addEventListener("change", t), window.addEventListener("storage", t), () => {
			e.removeEventListener("change", t), window.removeEventListener("storage", t);
		};
	});
	let lr = /* @__PURE__ */ A(() => R(D)?.theme ? ks(R(D).theme, R(cr)).color ?? {} : {}), ur = () => Object.entries(R(lr)), dr = [
		[
			"bg",
			J("palette.bg"),
			J("palette.bgShort")
		],
		[
			"surface",
			J("palette.surface"),
			J("palette.surfaceShort")
		],
		[
			"text",
			J("palette.text"),
			J("palette.textShort")
		],
		[
			"accent",
			J("palette.accent"),
			J("palette.accentShort")
		],
		[
			"accent-text",
			J("palette.accentText"),
			J("palette.accentTextShort")
		]
	], fr = /* @__PURE__ */ A(() => !!R(D)?.theme.alt), pr = /* @__PURE__ */ A(() => R(D)?.theme.alt?.auto === !0), mr = /* @__PURE__ */ A(() => R(D)?.theme.scheme === "dark" ? "dark" : "light"), hr = /* @__PURE__ */ A(() => R(D)?.theme.tokens.color ?? {}), gr = /* @__PURE__ */ A(() => ({
		...R(D)?.theme.tokens.color ?? {},
		...R(D)?.theme.alt?.tokens?.color ?? {}
	}));
	function _r(e) {
		return {
			type: e,
			version: Bc[e].version,
			props: Bc[e].defaults()
		};
	}
	let vr = (e) => !!(e && Bc[e.type]?.entrance), yr = [["", J("common.none")], ...Object.entries(Bc).filter(([, e]) => e.entrance).map(([e, t]) => [e, t.labelKey ? J(t.labelKey) : t.label])], br = yr.filter(([e]) => !Bc[e]?.group), xr = [["", J("common.none")], ...Object.entries(Bc).filter(([, e]) => !e.entrance).map(([e, t]) => [e, t.labelKey ? J(t.labelKey) : t.label])];
	function Sr(e) {
		e.animation && !vr(e.animation) && (e.hover ??= e.animation, e.animation = null);
	}
	function Cr(e) {
		Mt(`edit:anim-${R(k).blockId}`, (t) => {
			Sr(t), t.animation = e ? _r(e) : null;
		}), R(k) && E?.sendDemoAnim(R(k).sectionId, R(k).blockId);
	}
	function Tr(e) {
		Mt(`edit:hover-${R(k).blockId}`, (t) => {
			Sr(t), t.hover = e ? _r(e) : null;
		});
	}
	function Dr(e, t) {
		Number.isFinite(t) && (Mt(`edit:anim-${R(k).blockId}:${e}`, (n) => {
			n.animation && (n.animation.props[e] = t);
		}), R(k) && E?.sendDemoAnim(R(k).sectionId, R(k).blockId));
	}
	function Or(e) {
		Cn("section-anim", (t) => {
			Sr(t), t.animation = e ? _r(e) : null;
		}), E?.sendDemoAnim(R(ln));
	}
	function kr(e) {
		Cn("section-hover", (t) => {
			Sr(t), t.hover = e ? _r(e) : null;
		});
	}
	function Ar(e, t) {
		Number.isFinite(t) && (Cn("edit:section-anim", (n) => {
			n.animation && (n.animation.props[e] = t);
		}), E?.sendDemoAnim(R(ln)));
	}
	function jr(e, t) {
		Cn("edit:section-anim", (n) => {
			n.animation && (n.animation.props[e] = t);
		}), E?.sendDemoAnim(R(ln));
	}
	function Mr(e) {
		let t = T.data.sections.find((e) => e.id === R(ln));
		if (!t) return;
		let n = e.trim();
		if (!n) return;
		let r = /^\d+$/.test(n) ? `${n}px` : n;
		ze("section-size"), t.size = {
			...t.size,
			minHeight: r
		}, N(dn, r, !0), T.save(), Ne(), E?.sendSection(R(g), t);
	}
	function Nr() {
		return T.data.sections.find((e) => e.id === R(ln)) ?? T.data.sections[0];
	}
	function Pr(e) {
		let t = T.data.sections.find((e) => e.id === R(ln));
		t && (ze("grid:section"), t.grid = e ? { ...Oe.data.grid } : null, N(un, t.grid ? { ...t.grid } : null, !0), T.save(), Ne(), E?.sendSection(R(g), t), R(wi) && E?.sendShowGrid(!0));
	}
	function B(e, t) {
		let n = T.data.sections.find((e) => e.id === R(ln));
		n?.grid && (ze("grid:section"), n.grid = {
			...n.grid,
			[e]: t
		}, N(un, { ...n.grid }, !0), T.save(), Ne(), E?.sendSection(R(g), n), R(wi) && E?.sendShowGrid(!0));
	}
	function Fr(e, t) {
		ze("grid:site"), N(te, {
			...R(te),
			[e]: t
		}, !0), Oe.data.grid = {
			...Oe.data.grid,
			[e]: t
		}, Oe.save(), Ne(), Ae(), R(wi) && E?.sendShowGrid(!0);
	}
	async function Lr() {
		try {
			let e = await fetch("/api/github/me");
			e.ok ? N(ee, await e.json(), !0) : e.status !== 503 && N(ee, null);
		} catch {
			N(ee, null);
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
			ok: await $e({
				title: J("confirm.conflictUnknown.title"),
				lines: [J("confirm.conflictUnknown.body"), J("confirm.conflictUnknown.warning")],
				okLabel: J("confirm.publishAnyway"),
				cancelLabel: J("confirm.cancel")
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
		let r = new Set(e.map((e) => e.path)), i = t.truncated ? [J("confirm.conflict.truncated")] : (t.changedFiles ?? []).filter((e) => r.has(e));
		return i.length === 0 ? {
			ok: !0,
			head: n
		} : {
			ok: await $e({
				title: J("confirm.conflict.title"),
				lines: [
					J("confirm.conflict.intro"),
					...i.map((e) => `• ${e}`),
					J("confirm.conflict.warning")
				],
				okLabel: J("confirm.publishAnyway"),
				cancelLabel: J("confirm.cancel")
			}),
			head: n
		};
	}
	let Vr = /* @__PURE__ */ M(null), Hr = /* @__PURE__ */ M(""), Wr = /* @__PURE__ */ M(!1);
	async function Gr() {
		N(Hr, "");
		try {
			let e = await fetch("/api/github/history");
			e.ok ? N(Vr, (await e.json()).commits, !0) : e.status === 401 ? (N(Vr, [], !0), N(Hr, J("status.historyLoginRequired"), !0)) : (N(Vr, [], !0), N(Hr, Hi(await e.json().catch(() => null)) ?? J("status.historyFetchFailed"), !0));
		} catch {
			N(Vr, [], !0), N(Hr, J("status.historyUnavailable"), !0);
		}
	}
	let Kr = (() => {
		let e = {
			dateStyle: "short",
			timeStyle: "short"
		};
		try {
			return new Intl.DateTimeFormat(Ui(), e);
		} catch {
			return new Intl.DateTimeFormat(void 0, e);
		}
	})(), Jr = !1;
	async function Yr() {
		let e = R(Vr)?.[0];
		if (!(!e || R(Wr)) && await $e({
			title: J("confirm.revert.title"),
			lines: [`«${e.message}»`, J("confirm.revert.body")],
			okLabel: J("confirm.revert.ok"),
			cancelLabel: J("confirm.cancel")
		})) {
			N(Wr, !0), x(J("status.reverting"));
			try {
				let t = await fetch("/api/github/revert", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({ expect: e.sha })
				});
				if (t.ok) {
					let { sha: e } = await t.json().catch(() => ({}));
					e ? Rr = e : zr(), Jr = !0, x(J("status.revertDone"), "ok"), Xr();
				} else t.status === 409 ? x(J("status.revertConflict"), "error") : x(Hi(await t.json().catch(() => null)) ?? J("status.revertFailed"), "error");
			} catch {
				x(J("status.publishLayerUnreachable"), "error");
			}
			N(Wr, !1), Gr();
		}
	}
	async function Xr() {
		let e = ["/content/site.json", ...R(D).pages.map((e) => `/${e.file}`)], t = async () => {
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
				x(J("status.revertDeployed"), "ok");
				for (let e of Object.keys(localStorage).filter((e) => e.startsWith("urd-draft-"))) localStorage.removeItem(e);
				await new Promise((e) => setTimeout(e, 800)), location.reload();
				return;
			}
		}
		x(J("status.revertDeployTimeout"), "error");
	}
	let Zr = /* @__PURE__ */ M(null), Qr = /* @__PURE__ */ M(null), $r = /* @__PURE__ */ M(!1), ei = /* @__PURE__ */ M(on(/* @__PURE__ */ new Set()));
	async function ti() {
		N($r, !0), N(Qr, null), N(Zr, null);
		try {
			let e = await fetch("/api/github/update"), t = await e.json().catch(() => null);
			e.ok ? (N(Zr, t, !0), N(ei, /* @__PURE__ */ new Set(), !0)) : N(Qr, Hi(t) ?? J("update.checkFailed"), !0);
		} catch {
			N(Qr, J("status.publishLayerUnreachable"), !0);
		}
		N($r, !1);
	}
	function ni(e) {
		let t = new Set(R(ei));
		t.has(e) ? t.delete(e) : t.add(e), N(ei, t, !0);
	}
	async function ri() {
		if (!R(Zr) || R(Zr).upToDate || R($r)) return;
		let e = [...R(ei)], t = R(Zr).changes.filter((e) => !R(ei).has(e.path)), n = t.filter((e) => e.atom && e.conflict);
		if (await $e({
			title: J("confirm.update.title"),
			lines: [J("confirm.update.body", {
				target: R(Zr).target,
				writes: t.filter((e) => e.action === "write").length,
				deletes: t.filter((e) => e.action === "delete").length
			}), ...n.length > 0 ? [J("confirm.update.warnEdited", { paths: n.map((e) => e.path).join(", ") })] : []],
			okLabel: J("confirm.update.ok"),
			cancelLabel: J("confirm.cancel")
		})) {
			N($r, !0), x(J("update.running", { target: R(Zr).target }));
			try {
				let t = await fetch("/api/github/update", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({
						to: R(Zr).target,
						expect: R(Zr).head,
						skip: e
					})
				}), n = await t.json().catch(() => null);
				t.ok ? (x(J("update.committed", { target: R(Zr).target }), "ok"), await ii(R(Zr).target.replace(/^v/, ""))) : t.status === 409 ? (x(Hi(n) ?? J("update.checkFailed"), "error"), await ti()) : x(Hi(n) ?? J("update.failed"), "error");
			} catch {
				x(J("status.publishLayerUnreachable"), "error");
			}
			N($r, !1);
		}
	}
	async function ii(e) {
		for (let t = 0; t < 18; t++) {
			await new Promise((e) => setTimeout(e, 1e4));
			try {
				if ((await (await fetch("/urd.json", { cache: "no-store" })).json())?.engine === e) {
					x(J("update.deployed"), "ok"), await new Promise((e) => setTimeout(e, 800)), location.reload();
					return;
				}
			} catch {}
		}
		x(J("update.deployTimeout"), "error");
	}
	let ai = null;
	function oi(e) {
		return {
			schemaVersion: 2,
			meta: {
				id: e.id,
				title: e.title
			},
			sections: [{
				id: vo("sec"),
				version: 1,
				preset: "tom",
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
		N(g, e, !0), ai = (async () => {
			let n = Me(), r = null;
			try {
				let e = await fetch(`/${n.file}`);
				e.ok && (r = fo(await e.json(), Oe.data));
			} catch {}
			r ? je.delete(e) : r = oi(n), T = Xi(`urd-draft-${e}`, () => r, S), (T.data.schemaVersion ?? 1) > 2 && (console.warn(`Urd: utkastet for '${e}' har schemaVersion ${T.data.schemaVersion} (motoren har 2) og forkastes`), T.replace(structuredClone(r))), T.replace(fo(T.data, Oe.data)), T.save(), t || (Ie = null), N(ln, null), N(un, null), Ne(), Vi(), Ce(), N(v, "");
		})(), await ai;
	}
	function li() {
		E?.destroy(), R(w)?.contentDocument?.addEventListener("pointerdown", () => {
			R(Dt) && N(Dt, null);
		}, !0), E = Ha(R(w), {
			onEdit: Uf,
			onMove: Wf,
			onGrow: Gf,
			onDelete: tp,
			onAddSection: Xf,
			onMoveSection: Zf,
			onDeleteSection: Qf,
			onSectionSize: $f,
			onUndo: (e) => e.redo ? Ke() : Ge(),
			onSelectSection: Sn,
			onSelectBlock: Et,
			onBlockMenu: jt,
			onReady: ui,
			onNavigate: Di,
			onAddBlock: (e) => ap(e.sectionId, e.block),
			onAddBlocks: (e) => op(e.sectionId, e.blocks, e.minBottom, e.moves),
			onRequestBlock: pp,
			onMoveBlockSection: ep,
			onMobileReset: Kf,
			onMobileOrder: qf,
			onReviewDone: Jf,
			onBlockFlag: Yf,
			onCollectionEdit: Lo,
			onCollectionAdd: Fo,
			onSaveTemplate: Eo,
			onStickyGroup: Oo,
			onStickyDock: Do,
			onDeleteTemplate: Ao,
			onApplyLayout: Te,
			onPluginBlocks: (e) => {
				N(cp, e.blocks ?? [], !0);
			},
			onNavWidth: (e) => Oi("edit:nav-width", () => {
				R(D).nav.style ??= {}, R(D).nav.style.width = e.width;
			})
		});
	}
	async function ui() {
		await ai, await us, E?.sendPlugins(We(R($))?.enabled ?? []), E?.sendViewport(R(oe)), E?.sendZoom(R(ge)), No(), To(), Oe.hasDraft() && Ae();
		let e = !R(m).pages.some((e) => e.id === R(g));
		(T.hasDraft() || e) && E?.sendPage(R(g), T.data), R(ne) || E?.sendChrome(!1), R(wi) && E?.sendShowGrid(!0), R(di) && E?.sendShowGuides(!0), d();
	}
	let di = /* @__PURE__ */ M(localStorage.getItem("urd-guides") === "1"), fi = /* @__PURE__ */ M(!1), pi = /* @__PURE__ */ M(on(localStorage.getItem("urd-layout-picker") === "menu" ? "menu" : "strip"));
	function hi(e) {
		N(pi, e === "menu" ? "menu" : "strip", !0), R(pi) === "menu" ? localStorage.setItem("urd-layout-picker", "menu") : localStorage.removeItem("urd-layout-picker");
	}
	let _i = /* @__PURE__ */ M(null);
	wn(() => {
		if (!R(fi)) return;
		let e = (e) => {
			R(_i)?.contains(e.target) || N(fi, !1);
		}, t = (e) => {
			e.key === "Escape" && N(fi, !1);
		}, n = () => {
			N(fi, !1);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t), window.removeEventListener("blur", n);
		};
	});
	let vi = {
		view: 1079,
		device: 999,
		zoom: 919
	}, yi = /* @__PURE__ */ M(null), bi = /* @__PURE__ */ M(null), Si = on({
		view: !1,
		device: !1,
		zoom: !1
	});
	wn(() => {
		let e = Object.entries(vi).map(([e, t]) => {
			let n = window.matchMedia(`(max-width: ${t}px)`), r = () => {
				Si[e] = n.matches;
			};
			return r(), n.addEventListener("change", r), () => n.removeEventListener("change", r);
		});
		return () => e.forEach((e) => e());
	}), wn(() => {
		R(yi) && !Si[R(yi)] && N(yi, null);
	}), wn(() => {
		if (!R(yi)) return;
		let e = (e) => {
			R(bi)?.contains(e.target) || N(yi, null);
		}, t = (e) => {
			e.key === "Escape" && N(yi, null);
		}, n = () => {
			N(yi, null);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t), window.removeEventListener("blur", n);
		};
	});
	function Ci() {
		N(di, !R(di)), localStorage.setItem("urd-guides", R(di) ? "1" : "0"), E?.sendShowGuides(R(di));
	}
	let wi = /* @__PURE__ */ M(localStorage.getItem("urd-grid-overlay") === "1");
	function Ei() {
		N(wi, !R(wi)), localStorage.setItem("urd-grid-overlay", R(wi) ? "1" : "0"), E?.sendShowGrid(R(wi));
	}
	function Di(e) {
		let t = e.path.replace(/\/$/, "") || "/", n = R(D).pages.find((e) => e.path === t);
		n && n.id !== R(g) && ci(n.id);
	}
	function Oi(e, t) {
		ze(e), t(), Oe.save(), Ne(), Ae();
	}
	let Ai = /* @__PURE__ */ M(""), ji = /* @__PURE__ */ M(null), Mi = Object.fromEntries(Cs.map((e) => [e.id, xs(ws(e.id, {
		pageId: "forhandsvisning",
		title: ""
	}))])), Ni = /* @__PURE__ */ A(() => {
		let e = R(D)?.theme?.tokens?.color ?? {};
		return [
			"bg",
			"surface",
			"text",
			"accent"
		].filter((t) => typeof e[t] == "string" && js(e[t])).map((t) => `--urd-color-${t}: ${e[t]};`).join(" ");
	}), Pi = /* @__PURE__ */ M(null);
	wn(() => {
		if (!R(Pi)) return;
		let e = (e) => {
			e.target.closest?.(".page-menu-wrap") || N(Pi, null);
		}, t = (e) => {
			e.key === "Escape" && N(Pi, null);
		}, n = () => {
			N(Pi, null);
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
		return e ? Fi.includes(e) ? J("error.reservedName", { slug: e }) : R(D).pages.some((n) => n.id !== t && (n.path === `/${e}` || n.id === e)) ? J("error.pageExists") : null : J("error.pageNeedsName");
	}
	function Li() {
		let e = R(Ai).trim(), t = ba(e), n = Ii(t);
		if (n) {
			x(n, "error");
			return;
		}
		let r = R(ji) && !R(ji).startsWith("preset:") ? bo[R(ji)]?.data?.page : null, i = R(ji)?.startsWith("preset:") ? ws(R(ji).slice(7), {
			pageId: t,
			title: e
		}) ?? oi({
			id: t,
			title: e
		}) : r ? Wo(fo(JSON.parse(JSON.stringify(r)), Oe.data), vo, {
			id: t,
			title: e
		}) : oi({
			id: t,
			title: e
		});
		Oi("pages", () => {
			R(D).pages.push({
				id: t,
				title: e,
				path: `/${t}`,
				file: `content/pages/${t}.json`
			}), R(D).nav.items.push({
				label: e,
				page: t
			});
		}), C(`urd-draft-${t}`, JSON.stringify(i)), Ne(), N(Ai, ""), N(ji, null), ci(t);
	}
	async function Ri(e) {
		N(Pi, null), await ko("page", e.id === R(g) ? JSON.parse(JSON.stringify(T.data)) : await Zi(e));
	}
	function zi(e, t) {
		let n = t.trim();
		if (!n || n === e.title) return;
		let r = e.title;
		Oi("pages", () => {
			e.title = n;
			for (let t of R(D).nav.items) t.page === e.id && t.label === r && (t.label = n);
		}), e.id === R(g) ? (T.data.meta.title = n, T.save(), Ne(), E?.sendPage(R(g), T.data)) : Qi(e, (e) => {
			e.meta.title = n;
		});
	}
	let Bi = /* @__PURE__ */ M(on({
		description: "",
		ogTitle: "",
		ogDescription: "",
		ogImage: ""
	}));
	function Vi() {
		let e = T?.data?.meta ?? {};
		N(Bi, {
			description: e.description ?? "",
			ogTitle: e.og?.title ?? "",
			ogDescription: e.og?.description ?? "",
			ogImage: e.og?.image ?? ""
		}, !0);
	}
	function Wi(e, t) {
		let n = String(t ?? "").trim();
		if (e === "description") n ? T.data.meta.description = n : delete T.data.meta.description;
		else {
			let t = {
				ogTitle: "title",
				ogDescription: "description",
				ogImage: "image"
			}[e], r = { ...T.data.meta.og ?? {} };
			n ? r[t] = n : delete r[t], Object.keys(r).length ? T.data.meta.og = r : delete T.data.meta.og;
		}
		T.save(), Ne(), Vi();
		let r = R(D).pages.find((e) => e.id === R(g));
		R(Ki)[R(g)] = !r?.noindex && !T.data.meta.description;
	}
	function Gi(e) {
		let t = R(D).pages.find((e) => e.id === R(g));
		t && (Oi("edit:page-noindex", () => {
			e ? t.noindex = !0 : delete t.noindex;
		}), R(Ki)[R(g)] = !e && !T?.data?.meta?.description);
	}
	let Ki = /* @__PURE__ */ M(on({}));
	async function qi() {
		let e = {};
		for (let t of R(D).pages) {
			if (t.noindex) continue;
			if (t.id === R(g)) {
				e[t.id] = !T?.data?.meta?.description;
				continue;
			}
			let n = await Zi(t);
			e[t.id] = !n?.meta?.description;
		}
		N(Ki, e, !0);
	}
	wn(() => {
		R(lt) === "pages" && R(g) && qi();
	});
	async function Ji(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			Wi("ogImage", (await Yn(t)).dataUrl);
		} catch {
			x(J("status.imageReadError"), "error");
		}
	}
	async function Zi(e) {
		let t = localStorage.getItem(`urd-draft-${e.id}`);
		if (t) try {
			return JSON.parse(t);
		} catch {}
		try {
			let t = await fetch(`/${e.file}`);
			if (t.ok) return fo(await t.json(), Oe.data);
		} catch {}
		return oi(e);
	}
	async function Qi(e, t) {
		let n = await Zi(e);
		t(n), C(`urd-draft-${e.id}`, JSON.stringify(n)), Ne();
	}
	function $i(e, t) {
		let n = ba(t);
		if (e.path === "/" || `/${n}` === e.path) return;
		let r = Ii(n, e.id);
		if (r) {
			x(r, "error");
			return;
		}
		Oi("pages", () => {
			e.path = `/${n}`;
		});
	}
	function ea(e) {
		e.path !== "/" && (Oi("pages", () => {
			R(D).pages = R(D).pages.filter((t) => t.id !== e.id), R(D).nav.items = R(D).nav.items.filter((t) => t.page !== e.id || t.children);
			for (let t of R(D).nav.items) t.page === e.id && delete t.page, t.children && (t.children = t.children.filter((t) => t.page !== e.id), t.children.length === 0 && delete t.children);
			R(D).nav.items = R(D).nav.items.filter((e) => e.page || e.href || e.children);
		}), e.id === R(g) && ci(R(D).pages[0].id), x(J("status.pageRemoved")));
	}
	function ta(e) {
		Oi("edit:nav-logo", () => {
			R(D).nav.logo = {
				type: "text",
				value: "",
				...R(D).nav.logo,
				...e
			};
		});
	}
	function na(e) {
		Oi("nav", () => {
			R(D).nav.logo ??= {
				type: "text",
				value: R(D).site.title
			};
			let t = R(D).nav.logo, n = t.type === "image";
			e === "both" ? (n && (t.image = t.value, t.value = R(D).site.title), t.image ??= "", t.size ??= 32) : e === "image" ? (n || (t.value = t.image ?? ""), delete t.image, t.size ??= 32) : (n && (t.value = R(D).site.title), delete t.image), t.type = e;
		});
	}
	async function ra(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await Yn(t);
			Oi("nav", () => {
				let t = R(D).nav.logo;
				t.type === "both" ? t.image = e.dataUrl : t.value = e.dataUrl;
			});
		} catch {
			x(J("status.imageReadErrorSvg"), "error");
		}
	}
	let ia = /* @__PURE__ */ M(null);
	async function aa(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		if (t.type === "image/svg+xml" || /\.svg$/i.test(t.name || "")) {
			try {
				let e = await Jn(t);
				N(ia, e.dataUrl, !0);
			} catch {
				x(J("status.imageReadErrorSvg"), "error");
			}
			return;
		}
		let n = new FileReader();
		n.onload = () => {
			N(ia, String(n.result), !0);
		}, n.onerror = () => x(J("status.imageReadError"), "error"), n.readAsDataURL(t);
	}
	function oa(e) {
		Oi("edit:site-icon", () => {
			R(D).site.icon = e;
		}), N(ia, null);
	}
	function sa() {
		Oi("edit:site-icon", () => {
			delete R(D).site.icon;
		});
	}
	function la(e) {
		Oi("edit:site-title", () => {
			R(D).site.title = e;
		});
	}
	function ua(e) {
		Oi("edit:site-desc", () => {
			R(D).site.description = e;
		});
	}
	let da = /* @__PURE__ */ A(() => R(D)?.layout?.contentWidth ?? 1440), ma = /* @__PURE__ */ A(() => R(D)?.layout?.gutter ?? 6), ha = /* @__PURE__ */ A(() => $a(R(da))), Sa = /* @__PURE__ */ A(() => Ka.find((e) => e.gutter === R(ma))?.id ?? null), Ca = /* @__PURE__ */ M(!1), wa = /* @__PURE__ */ A(() => R(da) === "full" ? Ga : Ya(R(da))), Ta = /* @__PURE__ */ A(() => Ja.map((e) => ({
		screen: e,
		...Qa(R(da), R(ma), e)
	})));
	function Ea(e, t) {
		Oi(t, () => {
			R(D).layout = {
				contentWidth: R(da),
				gutter: R(ma),
				...e
			};
		});
	}
	let Da = (e) => Ea({ contentWidth: e === "full" ? "full" : Ya(e) }, "edit:site-width"), Oa = (e) => Ea({ gutter: Xa(e) }, "edit:site-gutter");
	function Ma() {
		let e = R(D).site.lang ?? "no";
		return e === "no" ? "nb" : e;
	}
	function Na() {
		let e = Ma(), t = _t([...gt, ...bt()]);
		return [...t.some(([t]) => t === e) ? [] : [[e, e]], ...t];
	}
	function Pa(e) {
		Oi("site", () => {
			R(D).site.lang = e;
		});
	}
	let Fa = /^(?:data:image\/[\w.+-]+;base64,[A-Za-z0-9+/=]+|\/(?!\/)[\w%./-]*)$/;
	wn(() => {
		if (!R(D)?.site) return;
		let e = R(D).site.icon, t = document.querySelector("link[rel=\"icon\"]");
		if (t) {
			if (typeof e != "string" || !e) {
				t.href = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%230b0e14'/%3E%3Cpath d='M19.2 49.6V14.4l25.6 10.4V49.6' fill='none' stroke='%2315b39a' stroke-width='6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E";
				return;
			}
			Fa.test(e) && (t.href = e);
		}
	});
	function Ia(e) {
		Oi("nav", () => {
			R(D).nav.layout = e;
		});
	}
	function La(e, t) {
		Oi(`edit:nav-style-${e}`, () => {
			R(D).nav.style ??= {}, t === void 0 ? delete R(D).nav.style[e] : R(D).nav.style[e] = t;
		});
	}
	let Ra = /* @__PURE__ */ A(() => R(D)?.nav?.variant === "side-left" || R(D)?.nav?.variant === "side-right"), za = /* @__PURE__ */ A(() => [
		"floating",
		"floating-square",
		"floating-tab"
	].includes(R(D)?.nav?.variant)), Ba = {
		underline: [J("hoverColor.underline.label"), J("hoverColor.underline.title")],
		pill: [J("hoverColor.pill.label"), J("hoverColor.pill.title")],
		lift: [J("hoverColor.lift.label"), J("hoverColor.lift.title")]
	}, Ua = /* @__PURE__ */ A(() => Ba[R(D)?.nav?.style?.hover] ?? null);
	function eo(e) {
		Oi("nav", () => {
			e === "bar" ? delete R(D).nav.variant : R(D).nav.variant = e;
		});
	}
	function to(e) {
		Oi("nav", () => {
			R(D).nav.style ??= {}, e ? R(D).nav.style.glow = !0 : delete R(D).nav.style.glow;
		});
	}
	function no(e) {
		Oi("nav", () => {
			R(D).nav.style ??= {}, e ? delete R(D).nav.style.topGap : R(D).nav.style.topGap = !1;
		});
	}
	function ro(e) {
		Oi("nav", () => {
			R(D).nav.style ??= {}, e === "standard" ? delete R(D).nav.style.hover : R(D).nav.style.hover = e;
		});
	}
	let ao = null, oo = {}, so = {}, co = !1, lo = /* @__PURE__ */ M(on([])), po = /* @__PURE__ */ M(on({})), mo = /* @__PURE__ */ M(null), go = /* @__PURE__ */ M(""), yo = /* @__PURE__ */ M("news"), X = [
		["news", J("collectionKind.news")],
		["notices", J("collectionKind.notices")],
		["publications", J("collectionKind.publications")],
		["products", J("collectionKind.products")],
		["custom", J("collectionKind.custom")]
	], Z = null, bo = {}, xo = {}, So = !1, Co = /* @__PURE__ */ M(on([]));
	async function wo() {
		let e = {
			version: 1,
			maler: []
		};
		try {
			e = await (await fetch("/content/maler.json")).json();
		} catch {}
		Z = Xi("urd-draft-maler", () => e, S), N(Co, [...Z.data.maler ?? []], !0);
		for (let e of R(Co)) {
			let t = null;
			try {
				t = await (await fetch(`/content/maler/${e}.json`)).json();
			} catch {}
			xo[e] = t, bo[e] = Xi(`urd-draft-mal-${e}`, () => t, S), (bo[e].data?.schemaVersion ?? 1) > 1 && bo[e].reset();
		}
		So = !0, To();
	}
	function To() {
		let e = R(Co).map((e) => bo[e]?.data ? {
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
		E?.sendMaler(e);
	}
	function Eo(e) {
		let t = Ho.includes(e.kind) ? e.kind : "section";
		return ko(t, e[t]);
	}
	function Do(e) {
		let { section: t, block: n } = wt(e.sectionId, e.blockId);
		!t || !n?.sticky || kt.some(([t]) => t === e.dock) && (ze(`sticky-dock:${e.blockId}`), n.sticky = {
			...n.sticky,
			dock: e.dock
		}, T.save(), Ne(), E?.sendSection(R(g), t), Tt());
	}
	function Oo(e) {
		let t = e.blockIds ?? [], { section: n } = wt(e.sectionId, t[0]);
		if (!n || !t.length) return;
		ze(`sticky-group:${e.sectionId}`);
		let r = e.on ? vo("stk") : null;
		for (let e of n.blocks) t.includes(e.id) && (e.sticky = r ? {
			offset: 16,
			until: null,
			...e.sticky,
			group: r
		} : null);
		De(n, "block-edited"), T.save(), Ne(), E?.sendSection(R(g), n), Tt(), x(J(e.on ? "status.stickyGrouped" : "status.stickyUngrouped"));
	}
	async function ko(e, t) {
		if (!t || !Z) return;
		let n = (await et({
			title: J("canvas.templateNamePrompt"),
			placeholder: J("ph.templateName")
		}))?.trim();
		if (!n) return;
		let r = Uo(n);
		if (!r) {
			x(J("status.invalidName"), "error");
			return;
		}
		if (R(Co).includes(r)) {
			x(J("status.templateExists"), "error");
			return;
		}
		ze("maler");
		let i = {
			schemaVersion: 1,
			mal: {
				name: n,
				kind: e
			},
			[e]: t
		};
		bo[r] = Xi(`urd-draft-mal-${r}`, () => null, S), bo[r].replace(i), bo[r].save(), Z.data.maler = [...R(Co), r], Z.save(), N(Co, [...R(Co), r], !0), x(J("status.templateSaved", { name: n }), "ok"), Ne(), To();
	}
	async function Ao(e) {
		let t = bo[e.id]?.data?.mal;
		t && await $e({ title: J("confirm.deleteTemplate", { name: t.name }) }) && (ze("maler"), R(ji) === e.id && N(ji, null), localStorage.removeItem(`urd-draft-mal-${e.id}`), delete bo[e.id], Z.data.maler = R(Co).filter((t) => t !== e.id), Z.save(), N(Co, R(Co).filter((t) => t !== e.id), !0), Ne(), To());
	}
	async function jo() {
		let e = {
			version: 1,
			samlinger: []
		};
		try {
			e = await (await fetch("/content/samlinger.json")).json();
		} catch {}
		ao = Xi("urd-draft-samlinger", () => e, S), N(lo, [...ao.data.samlinger ?? []], !0);
		for (let e of R(lo)) {
			let t = null;
			try {
				t = await (await fetch(`/content/samlinger/${e}.json`)).json();
			} catch {}
			so[e] = t, oo[e] = Xi(`urd-draft-samling-${e}`, () => t, S), !t && !oo[e].data && (oo[e].replace({
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
		for (let e of R(lo)) oo[e] && (t[e] = JSON.parse(JSON.stringify(oo[e].data)));
		N(po, t, !0), e && No();
	}
	function No() {
		E?.sendCollections(We(R(po)) ?? {});
	}
	function Po(e, t, n, r = !0) {
		let i = oo[e];
		i && (ze(t), n(i.data), i.save(), Ne(), Mo(r));
	}
	function Fo(e) {
		oo[e.collection] && Go(e.collection);
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
		].includes(r) && (r === "title" && !Io(i) || Po(t, `edit:samling:${t}:${n}:${r}`, (e) => {
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
		oo[e] = Xi(`urd-draft-samling-${e}`, () => null, S), oo[e].replace(r), oo[e].save(), ao.data.samlinger = [...R(lo), e], ao.save(), N(lo, [...R(lo), e], !0), N(mo, e, !0), Ne(), Mo();
	}
	function zo() {
		let e = R(go).trim();
		if (!e) return;
		let t = ba(e);
		if (!t || R(lo).includes(t)) {
			x(J(t ? "status.collectionExists" : "status.invalidName"), "error");
			return;
		}
		ze("samlinger"), Ro(t, e, R(yo)), N(go, "");
	}
	function Bo() {
		let e = J("seed.productCatalogName"), t = ba(e) || "produkter", n = t;
		for (let e = 2; R(lo).includes(n); e += 1) n = `${t}-${e}`;
		ze("samlinger"), Ro(n, e, "products"), Mt(null, (e) => {
			e.props.collection = n;
		});
	}
	function Vo(e) {
		ze("samlinger"), localStorage.removeItem(`urd-draft-samling-${e}`), delete oo[e], ao.data.samlinger = R(lo).filter((t) => t !== e), ao.save(), N(lo, R(lo).filter((t) => t !== e), !0), R(mo) === e && N(mo, null), Ne(), Mo();
	}
	function Go(e) {
		Po(e, `samling:${e}:add-entry`, (e) => {
			e.kind === "products" ? e.entries.push({
				id: vo("innslag"),
				title: J("seed.newProduct"),
				text: ""
			}) : e.entries.unshift({
				id: vo("innslag"),
				title: J("seed.newEntry"),
				date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
				text: ""
			});
		});
	}
	function Ko(e, t, n, r) {
		Po(e, `edit:samling:${e}:${t}:${n}`, (e) => {
			let i = e.entries.find((e) => e.id === t);
			i && (r === "" && n !== "title" ? delete i[n] : i[n] = r);
		});
	}
	function qo(e, t, n) {
		Po(e, `samling:${e}:move-entry`, (e) => {
			let r = t + n;
			r < 0 || r >= e.entries.length || ([e.entries[t], e.entries[r]] = [e.entries[r], e.entries[t]]);
		});
	}
	function Yo(e, t) {
		Po(e, `samling:${e}:remove-entry`, (e) => {
			e.entries = e.entries.filter((e) => e.id !== t);
		});
	}
	async function Xo(e, t, n) {
		let r = n.target.files?.[0];
		n.target.value = "", r && Ko(e, t, "image", (await Yn(r)).dataUrl);
	}
	function Qo(e, t, n) {
		let r = n.split(",").map((e) => e.trim()).filter(Boolean);
		Ko(e, t, "sizes", r.length ? r : "");
	}
	function rs(e, t) {
		Po(e, `samling:${e}:${t}:colors`, (e) => {
			let n = e.entries.find((e) => e.id === t);
			n && (n.colors = [...n.colors ?? [], { name: J("ph.colorName") }]);
		});
	}
	function is(e, t, n, r, i) {
		Po(e, `edit:samling:${e}:${t}:color:${n}:${r}`, (e) => {
			let a = e.entries.find((e) => e.id === t)?.colors?.[n];
			a && (r === "image" && !i ? delete a.image : i && (a[r] = i));
		});
	}
	async function as(e, t, n, r) {
		let i = r.target.files?.[0];
		r.target.value = "", i && is(e, t, n, "image", (await Yn(i)).dataUrl);
	}
	function os(e, t, n) {
		Po(e, `samling:${e}:${t}:colors`, (e) => {
			let r = e.entries.find((e) => e.id === t);
			r?.colors && (r.colors = r.colors.filter((e, t) => t !== n), r.colors.length || delete r.colors);
		});
	}
	function ss(e) {
		let t = oo[e]?.data;
		if (!t) return;
		let n = URL.createObjectURL(new Blob([Jo(t.entries)], { type: "text/csv" })), r = document.createElement("a");
		r.href = n, r.download = `${e}.csv`, r.click(), URL.revokeObjectURL(n);
	}
	async function cs(e, t) {
		let n = t.target.files?.[0];
		if (t.target.value = "", !n) return;
		let r = Zo(await n.text());
		if (!r) {
			x(J("status.csvInvalid"), "error");
			return;
		}
		let i = /* @__PURE__ */ new Set();
		for (let e of r.entries) (!/^[a-z0-9][a-z0-9-]*$/.test(e.id) || i.has(e.id)) && (e.id = vo("innslag")), i.add(e.id);
		Po(e, `samling:${e}:import`, (e) => {
			e.entries = r.entries;
		}), x(J("status.csvImported", { count: String(r.entries.length) }), "ok");
	}
	let Q = null, ls, us = new Promise((e) => {
		ls = e;
	}), $ = /* @__PURE__ */ M(null), ds = on({}), fs = /* @__PURE__ */ M("0.0.0"), ps = /* @__PURE__ */ M(""), ms = /* @__PURE__ */ M(""), hs = /* @__PURE__ */ M(on([])), gs = /* @__PURE__ */ M(on([])), _s = /* @__PURE__ */ M("pending"), vs = () => [.../* @__PURE__ */ new Set([...R($)?.enabled ?? [], ...R($)?.disabled ?? []])];
	function ys() {
		N($, JSON.parse(JSON.stringify(Q.data)), !0);
	}
	let bs = /* @__PURE__ */ M(null);
	async function Ss() {
		try {
			let e = (await fetch("/urd.json", { cache: "no-store" })).headers.get("content-security-policy");
			if (!e) {
				N(bs, { unknown: !0 }, !0);
				return;
			}
			let t = (t) => new Set((e.split(";").map((e) => e.trim()).find((e) => e.startsWith(`${t} `)) ?? "").split(/\s+/).slice(1));
			N(bs, {
				frameSrc: t("frame-src"),
				connectSrc: t("connect-src"),
				scriptSrc: t("script-src")
			}, !0);
		} catch {
			N(bs, { unknown: !0 }, !0);
		}
	}
	function Ts(e) {
		let t = [
			...(e.scriptSrc ?? []).map((e) => ["script-src", e]),
			...(e.connectSrc ?? []).map((e) => ["connect-src", e]),
			...(e.frameSrc ?? []).map((e) => ["frame-src", e])
		];
		if (!R(bs) || R(bs).unknown) return [];
		let n = {
			"script-src": R(bs).scriptSrc,
			"connect-src": R(bs).connectSrc,
			"frame-src": R(bs).frameSrc
		};
		return t.filter(([e, t]) => !n[e]?.has(t)).map(([e, t]) => `${e} ${t}`);
	}
	async function Es() {
		Ss();
		let e = {
			version: 1,
			enabled: []
		};
		try {
			e = await (await fetch("/plugins/plugins.json")).json();
		} catch {}
		N(gs, e.enabled ?? [], !0), Q = Xi("urd-draft-plugins", () => e, S), ys();
		try {
			N(fs, (await (await fetch("/urd.json")).json()).engine ?? "0.0.0", !0);
		} catch {}
		for (let e of vs()) Ps(e);
		As(), ls(), E?.sendPlugins(We(R($))?.enabled ?? []);
	}
	async function As() {
		try {
			let e = await fetch("/api/github/plugins");
			if (!e.ok) {
				Ns();
				return;
			}
			let { plugins: t } = await e.json();
			localStorage.setItem("urd-plugins-found", JSON.stringify(t ?? [])), N(hs, (t ?? []).filter((e) => !vs().includes(e)), !0);
			for (let e of R(hs)) Ps(e);
			N(_s, "ok");
		} catch {
			Ns();
		}
	}
	function Ns() {
		try {
			let e = JSON.parse(localStorage.getItem("urd-plugins-found") ?? "[]");
			if (Array.isArray(e) && e.length) {
				N(hs, e.filter((e) => !vs().includes(e)), !0);
				for (let e of R(hs)) Ps(e);
				N(_s, "ok");
				return;
			}
		} catch {}
		N(_s, "unavailable");
	}
	async function Ps(e) {
		try {
			let t = await (await fetch(`/plugins/${e}/plugin.json`)).json(), n = _o(t);
			ds[e] = {
				...t,
				errors: n,
				satisfied: n.length === 0 && ho(R(fs), t.requiresEngine)
			};
		} catch {
			ds[e] = {
				name: e,
				errors: [J("plugin.manifestNotFound", { id: e })],
				satisfied: !1
			};
		}
	}
	function Bs(e, t) {
		ze("plugins");
		let n = Q.data;
		n.enabled = (n.enabled ?? []).filter((t) => t !== e), n.disabled = (n.disabled ?? []).filter((t) => t !== e), t ? n.enabled.push(e) : n.disabled.push(e), Q.save(), Ne(), ys(), Vs();
	}
	function Vs() {
		R(w) && (R(w).src = R(w).src);
	}
	function Hs(e) {
		ze("plugins");
		let t = Q.data;
		t.enabled = (t.enabled ?? []).filter((t) => t !== e), t.disabled = (t.disabled ?? []).filter((t) => t !== e), Q.save(), Ne(), ys(), Vs();
	}
	async function Us() {
		N(ms, "");
		let e = R(ps).trim().toLowerCase();
		if (!/^[a-z0-9][a-z0-9-]*$/.test(e)) {
			N(ms, J("plugin.invalidId"), !0);
			return;
		}
		if (vs().includes(e)) {
			N(ms, J("plugin.alreadyListed"), !0);
			return;
		}
		if (await Ps(e), ds[e].errors.length) {
			N(ms, J("plugin.invalidManifest", { errors: ds[e].errors.join("; ") }), !0);
			return;
		}
		Bs(e, !0), N(ps, "");
	}
	function Ws(e) {
		N(hs, R(hs).filter((t) => t !== e), !0), Bs(e, !0);
	}
	function Gs(e, t) {
		Oi(e, () => {
			R(D).footer ??= {
				version: 1,
				show: !1,
				text: "",
				align: "center"
			}, t(R(D).footer);
		});
	}
	function Ks(e, t) {
		Gs(`edit:footer-brand-${e}`, (n) => {
			n.brand ??= {}, t.trim() ? n.brand[e] = t : delete n.brand[e], !n.brand.title && !n.brand.tagline && !n.brand.logo && delete n.brand;
		});
	}
	function qs(e) {
		Gs("footer", (t) => {
			t.brand ??= {}, e === "image" || e === "both" ? t.brand.mode = e : delete t.brand.mode;
		});
	}
	async function Js(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await Yn(t);
			Gs("footer", (t) => {
				t.brand ??= {}, t.brand.logo = e.dataUrl, t.brand.mode || (t.brand.mode = "both");
			});
		} catch {
			x(J("status.imageReadErrorSvg"), "error");
		}
	}
	function Ys() {
		Gs("footer", (e) => {
			e.brand && (delete e.brand.logo, delete e.brand.mode, delete e.brand.logoHeight, !e.brand.title && !e.brand.tagline && delete e.brand);
		});
	}
	function Xs(e) {
		Gs("edit:footer-logo-height", (t) => {
			t.brand ??= {};
			let n = Number(e);
			Number.isFinite(n) && (t.brand.logoHeight = Math.min(160, Math.max(16, Math.round(n))));
		});
	}
	function $s(e) {
		Gs("edit:footer-copyright", (t) => {
			e.trim() ? t.copyright = e : delete t.copyright;
		});
	}
	let tc = [
		{
			id: "minimal",
			label: J("footerTemplate.minimal"),
			thumb: {
				center: !0,
				social: 2,
				baselineLinks: 1
			}
		},
		{
			id: "sentrert",
			label: J("footerTemplate.sentrert"),
			thumb: {
				center: !0,
				row: !0,
				social: 3
			}
		},
		{
			id: "kolonner",
			label: J("footerTemplate.kolonner"),
			thumb: {
				tag: !0,
				cols: 3,
				social: 3,
				baselineLinks: 2
			}
		},
		{
			id: "sitemap",
			label: J("footerTemplate.sitemap"),
			thumb: {
				tag: !0,
				fat: !0,
				cols: 4,
				social: 4,
				baselineLinks: 3
			}
		},
		{
			id: "nyhetsbrev",
			label: J("footerTemplate.nyhetsbrev"),
			thumb: {
				tag: !0,
				cta: !0,
				cols: 2,
				social: 2,
				baselineLinks: 1
			}
		},
		{
			id: "storcta",
			label: J("footerTemplate.storcta"),
			thumb: {
				center: !0,
				bigcta: !0,
				baselineLinks: 2
			}
		},
		{
			id: "kontakt",
			label: J("footerTemplate.kontakt"),
			thumb: {
				tag: !0,
				cols: 3,
				social: 2,
				baselineLinks: 1
			}
		},
		{
			id: "mega",
			label: J("footerTemplate.mega"),
			thumb: {
				tag: !0,
				mega: !0,
				cols: 2,
				social: 4,
				baselineLinks: 2
			}
		}
	];
	function nc(e) {
		let t = J("seed.orgName"), n = R(D).pages ?? [], r = (e) => n.slice(0, e).map((e) => ({
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
			baseline: [a(J("seed.footer.privacy"), "#")]
		} : e === "sentrert" ? {
			align: "center",
			brand: { title: t },
			linkRow: r(5),
			social: i([
				"facebook",
				"instagram",
				"x"
			]),
			copyright: `${o} · ${J("seed.footer.madeWith")}`
		} : e === "kolonner" ? {
			align: "left",
			brand: {
				title: t,
				tagline: J("seed.footer.tagline1")
			},
			columns: [
				{
					title: J("seed.footer.colPages"),
					links: r(4)
				},
				{
					title: J("seed.footer.colCompany"),
					links: [
						a(J("seed.footer.about"), "#"),
						a(J("seed.join"), "#"),
						a(J("seed.footer.press"), "#")
					]
				},
				{
					title: J("seed.footer.colResources"),
					links: [
						a(J("seed.footer.bylaws"), "#"),
						a(J("seed.footer.privacy"), "#"),
						a(J("seed.footer.contact"), "#")
					]
				}
			],
			social: i([
				"facebook",
				"instagram",
				"linkedin"
			]),
			copyright: o,
			baseline: [a(J("seed.footer.privacy"), "#"), a(J("seed.footer.terms"), "#")]
		} : e === "sitemap" ? {
			align: "left",
			brand: {
				title: t,
				tagline: J("seed.footer.tagline2")
			},
			columns: [
				{
					title: J("seed.footer.colExplore"),
					links: [
						a(J("seed.footer.home"), "#"),
						a(J("seed.footer.events"), "#"),
						a(J("seed.footer.gallery"), "#"),
						a(J("seed.footer.blog"), "#")
					]
				},
				{
					title: J("seed.footer.colCompany"),
					links: [
						a(J("seed.footer.about"), "#"),
						a(J("seed.footer.history"), "#"),
						a(J("seed.footer.press"), "#"),
						a(J("seed.footer.contact"), "#")
					]
				},
				{
					title: J("seed.footer.colSupport"),
					links: [
						a(J("seed.join"), "#"),
						a(J("seed.footer.faq"), "#"),
						a(J("seed.footer.help"), "#")
					]
				},
				{
					title: J("seed.footer.colLegal"),
					links: [
						a(J("seed.footer.privacy"), "#"),
						a(J("seed.footer.terms"), "#"),
						a(J("seed.footer.bylaws"), "#")
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
				a(J("seed.footer.privacy"), "#"),
				a(J("seed.footer.terms"), "#"),
				a(J("seed.footer.cookies"), "#")
			]
		} : e === "nyhetsbrev" ? {
			align: "left",
			brand: {
				title: t,
				tagline: J("seed.footer.tagline3")
			},
			cta: {
				kind: "newsletter",
				heading: J("seed.footer.newsletterHeading"),
				label: J("seed.footer.newsletterButton"),
				recipient: J("seed.email"),
				success: J("seed.footer.newsletterSuccess")
			},
			columns: [{
				title: J("seed.footer.colPages"),
				links: r(4)
			}, {
				title: J("seed.footer.colMore"),
				links: [
					a(J("seed.footer.about"), "#"),
					a(J("seed.footer.contact"), "#"),
					a(J("seed.footer.privacy"), "#")
				]
			}],
			social: i(["facebook", "instagram"]),
			copyright: o,
			baseline: [a(J("seed.footer.privacy"), "#")]
		} : e === "storcta" ? {
			align: "center",
			cta: {
				kind: "button",
				big: !0,
				heading: J("seed.footer.ctaHeading"),
				sub: J("seed.footer.ctaSub"),
				label: J("seed.join"),
				href: "#"
			},
			linkRow: r(4),
			social: i([
				"facebook",
				"instagram",
				"x"
			]),
			copyright: o,
			baseline: [a(J("seed.footer.privacy"), "#"), a(J("seed.footer.terms"), "#")]
		} : e === "kontakt" ? {
			align: "left",
			brand: {
				title: t,
				tagline: J("seed.footer.tagline4")
			},
			columns: [
				{
					title: J("seed.footer.colVisit"),
					links: [
						a(J("seed.footer.address"), "#"),
						a(J("seed.email"), "mailto:post@dinforening.no"),
						a("+47 22 00 00 00", "tel:+4722000000")
					]
				},
				{
					title: J("seed.footer.colHours"),
					links: [a(J("seed.footer.hours1"), "#"), a(J("seed.footer.hours2"), "#")]
				},
				{
					title: J("seed.footer.colPages"),
					links: r(4)
				}
			],
			social: i(["facebook", "instagram"]),
			copyright: o,
			baseline: [a(J("seed.footer.privacy"), "#")]
		} : {
			align: "left",
			brand: {
				title: t,
				tagline: J("seed.footer.tagline5")
			},
			columns: [{
				title: J("seed.footer.colExplore"),
				links: r(4)
			}, {
				title: J("seed.footer.colFollow"),
				links: [a(J("seed.footer.newsletter"), "#"), a(J("seed.email"), "mailto:post@dinforening.no")]
			}],
			social: i([
				"facebook",
				"instagram",
				"linkedin",
				"youtube"
			]),
			copyright: o,
			baseline: [a(J("seed.footer.privacy"), "#"), a(J("seed.footer.madeWith"), "#")],
			background: {
				version: 1,
				layers: [{
					type: "glow",
					version: Qs.version ?? 1,
					props: {
						...Qs.defaults(),
						color: "accent",
						x: .12,
						y: 0,
						radius: .6,
						opacity: .45
					}
				}, {
					type: "grain",
					version: ec.version ?? 1,
					props: {
						...ec.defaults(),
						opacity: .08
					}
				}]
			}
		};
	}
	function rc(e) {
		Gs("footer-template", (t) => {
			let n = nc(e);
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
		Gs("footer", (t) => {
			t[e] ??= [], t[e].push(R(D).pages[0] ? {
				label: J("seed.link"),
				page: R(D).pages[0].id
			} : {
				label: J("seed.link"),
				href: "https://"
			});
		});
	}
	function ac(e, t) {
		Gs("footer", (n) => {
			n[e].splice(t, 1), n[e].length || delete n[e];
		});
	}
	function oc(e, t, n) {
		Gs("footer", (r) => {
			let i = r[e], a = t + n;
			a < 0 || a >= i.length || ([i[t], i[a]] = [i[a], i[t]]);
		});
	}
	function sc(e, t, n) {
		Gs(`edit:footer-${e}-label-${t}`, (r) => {
			r[e][t].label = n;
		});
	}
	function cc(e, t, n) {
		Gs("footer", (r) => {
			let i = r[e][t];
			n === "__href" ? (delete i.page, i.href = i.href ?? "https://") : (i.page = n, delete i.href);
		});
	}
	function lc(e, t, n) {
		Gs(`edit:footer-${e}-href-${t}`, (r) => {
			r[e][t].href = n;
		});
	}
	function uc(e) {
		Gs("footer", (t) => {
			e === "center" ? t.columnsAlign = "center" : delete t.columnsAlign;
		});
	}
	function dc(e) {
		Gs("footer", (t) => {
			e ? t.cta ??= {
				kind: "button",
				label: J("seed.join")
			} : delete t.cta;
		});
	}
	function fc(e, t) {
		Gs(`edit:footer-cta-${e}`, (n) => {
			n.cta ??= {}, t === "" || t == null || t === !1 ? delete n.cta[e] : n.cta[e] = t;
		});
	}
	function pc(e) {
		Gs("footer", (t) => {
			t.cta ??= {}, e === "__href" ? (delete t.cta.page, t.cta.href = t.cta.href ?? "https://") : (t.cta.page = e, delete t.cta.href);
		});
	}
	function mc(e, t) {
		Gs("footer", (n) => {
			let r = new Set(n.hideOn ?? []);
			t ? r.delete(e) : r.add(e), r.size ? n.hideOn = [...r] : delete n.hideOn;
		});
	}
	function hc() {
		Gs("footer", (e) => {
			e.columns ??= [], e.columns.push({
				title: J("seed.column"),
				links: [{
					label: J("seed.link"),
					page: R(D).pages[0].id
				}]
			});
		});
	}
	function gc(e) {
		Gs("footer", (t) => {
			t.columns.splice(e, 1), t.columns.length || delete t.columns;
		});
	}
	function _c(e, t) {
		Gs("footer", (n) => {
			let r = e + t;
			r < 0 || r >= n.columns.length || ([n.columns[e], n.columns[r]] = [n.columns[r], n.columns[e]]);
		});
	}
	function vc(e, t) {
		Gs(`edit:footer-col-title-${e}`, (n) => {
			n.columns[e].title = t;
		});
	}
	function yc(e) {
		Gs("footer", (t) => {
			t.columns[e].links ??= [], t.columns[e].links.push({
				label: J("seed.link"),
				page: R(D).pages[0].id
			});
		});
	}
	function bc(e, t) {
		Gs("footer", (n) => {
			n.columns[e].links.splice(t, 1);
		});
	}
	function xc(e, t, n) {
		Gs("footer", (r) => {
			let i = r.columns[e].links, a = t + n;
			a < 0 || a >= i.length || ([i[t], i[a]] = [i[a], i[t]]);
		});
	}
	function Sc(e, t, n) {
		Gs(`edit:footer-link-label-${e}-${t}`, (r) => {
			r.columns[e].links[t].label = n;
		});
	}
	function Cc(e, t, n) {
		Gs("footer", (r) => {
			let i = r.columns[e].links[t];
			n === "__href" ? (delete i.page, i.href = i.href ?? "https://") : (i.page = n, delete i.href);
		});
	}
	function Tc(e, t, n) {
		Gs(`edit:footer-link-href-${e}-${t}`, (r) => {
			r.columns[e].links[t].href = n;
		});
	}
	function Ec() {
		Gs("footer", (e) => {
			e.social ??= [], e.social.push({
				icon: "facebook",
				url: "https://"
			});
		});
	}
	function Dc(e) {
		Gs("footer", (t) => {
			t.social.splice(e, 1), t.social.length || delete t.social;
		});
	}
	function Oc(e, t) {
		Gs("footer", (n) => {
			let r = e + t;
			r < 0 || r >= n.social.length || ([n.social[e], n.social[r]] = [n.social[r], n.social[e]]);
		});
	}
	function Ac(e, t) {
		Gs("footer", (n) => {
			n.social[e].icon = t;
		});
	}
	function jc(e, t) {
		Gs(`edit:footer-social-url-${e}`, (n) => {
			n.social[e].url = t;
		});
	}
	let Mc = Aa.filter(([e]) => e === "iconCat.social" || e === "iconCat.communication").flatMap(([, e]) => e.map((e) => [e, ka[e].label]));
	function Nc(e, t) {
		Oi(`edit:nav-label-${e}`, () => {
			R(D).nav.items[e].label = t;
		});
	}
	function Pc(e, t) {
		Oi("nav", () => {
			let n = R(D).nav.items[e];
			t === "__href" ? (delete n.page, n.href = n.href ?? "https://") : t === "__none" ? (delete n.page, delete n.href) : (n.page = t, delete n.href);
		});
	}
	function Lc(e, t) {
		Oi(`edit:nav-href-${e}`, () => {
			R(D).nav.items[e].href = t;
		});
	}
	function Rc(e, t) {
		let n = e + t, r = R(D).nav.items;
		n < 0 || n >= r.length || Oi("nav", () => {
			[r[e], r[n]] = [r[n], r[e]];
		});
	}
	function zc(e) {
		Oi("nav", () => {
			R(D).nav.items.splice(e, 1);
		});
	}
	function vf() {
		Oi("nav", () => {
			R(D).nav.items.push({
				label: J("seed.link"),
				page: R(D).pages[0].id
			});
		});
	}
	function yf(e) {
		Oi("nav", () => {
			let t = R(D).nav.items[e];
			t.children ??= [], t.children.push({
				label: J("seed.link"),
				page: R(D).pages[0].id
			});
		});
	}
	function bf(e, t, n) {
		Oi(`edit:nav-child-label-${e}-${t}`, () => {
			R(D).nav.items[e].children[t].label = n;
		});
	}
	function xf(e, t, n) {
		Oi("nav", () => {
			let r = R(D).nav.items[e].children[t];
			n === "__href" ? (delete r.page, r.href = r.href ?? "https://") : (r.page = n, delete r.href);
		});
	}
	function Sf(e, t, n) {
		Oi(`edit:nav-child-href-${e}-${t}`, () => {
			R(D).nav.items[e].children[t].href = n;
		});
	}
	function Cf(e, t, n) {
		let r = t + n, i = R(D).nav.items[e].children;
		r < 0 || r >= i.length || Oi("nav", () => {
			[i[t], i[r]] = [i[r], i[t]];
		});
	}
	function wf(e, t) {
		Oi("nav", () => {
			let n = R(D).nav.items[e];
			n.children.splice(t, 1), n.children.length === 0 && (delete n.children, !n.page && !n.href && (n.page = R(D).pages[0].id));
		});
	}
	function Tf(e, t) {
		Oi(`edit:theme-color-${e}`, () => {
			R(D).theme.tokens.color[e] = t, R(D).theme.alt?.auto && (R(D).theme.alt.tokens.color = kf());
		});
	}
	function Ef(e, t) {
		Oi("theme", () => {
			R(D).theme.tokens.font[e] = t;
		});
	}
	function Df(e, t) {
		Oi("theme", () => {
			R(D).theme.tokens.radius[e] = t;
		});
	}
	function Of(e) {
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
	function kf() {
		return Object.fromEntries(Object.entries(R(D).theme.tokens.color).map(([e, t]) => [e, Of(t)]));
	}
	function Af(e, t) {
		Oi(`edit:theme-alt-${e}`, () => {
			R(D).theme.alt.tokens.color[e] = t, R(D).theme.alt.auto = !1;
		});
	}
	function jf(e) {
		Oi("theme", () => {
			e === "light" ? delete R(D).theme.scheme : R(D).theme.scheme = e;
		});
	}
	function Mf(e) {
		Oi("theme", () => {
			e ? R(D).theme.alt = {
				auto: !0,
				tokens: { color: kf() }
			} : delete R(D).theme.alt;
		});
	}
	function Nf(e) {
		Oi("theme", () => {
			R(D).theme.alt ??= { tokens: { color: kf() } }, R(D).theme.alt.auto = e, e && (R(D).theme.alt.tokens.color = kf());
		});
	}
	function Pf(e) {
		let t = R(D).theme.tokens.font[e];
		return [...Vc.some(([, e]) => e === t) ? [] : [[t, J("opt.customFont")]], ...Vc.map(([e, t]) => [t, J(e)])];
	}
	let Ff = (e) => parseInt(e, 10) || 0;
	function If(e, t) {
		Df(e, `${t}px`);
	}
	let Lf = (e, t) => e && t && t[e] ? t[e] : e, Rf = [
		"bg",
		"surface",
		"text",
		"accent",
		"accent-text"
	], zf = [
		{
			id: "bronn",
			name: J("themePreset.bronn.name"),
			note: J("themePreset.bronn.note"),
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
			name: J("themePreset.stein.name"),
			note: J("themePreset.stein.note"),
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
			name: J("themePreset.plomme.name"),
			note: J("themePreset.plomme.note"),
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
			name: J("themePreset.rose.name"),
			note: J("themePreset.rose.note"),
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
			name: J("themePreset.hav.name"),
			note: J("themePreset.hav.note"),
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
			name: J("themePreset.natt.name"),
			note: J("themePreset.natt.note"),
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
	function Bf(e) {
		Oi("theme", () => {
			let t = e.scheme === "dark", n = t ? e.dark : e.light, r = t ? e.light : e.dark;
			for (let e of Rf) R(D).theme.tokens.color[e] = n[e];
			t ? R(D).theme.scheme = "dark" : delete R(D).theme.scheme, R(D).theme.alt = { tokens: { color: { ...r } } };
		});
	}
	let Vf = /* @__PURE__ */ A(() => {
		if (!R(D)) return null;
		let e = R(D).theme.tokens.color, t = R(D).theme.alt?.tokens?.color ?? {}, n = R(D).theme.scheme === "dark";
		return zf.find((r) => {
			let i = n ? r.dark : r.light, a = n ? r.light : r.dark;
			return Rf.every((n) => e[n] === i[n] && t[n] === a[n]);
		})?.id ?? null;
	});
	function Hf() {
		N(ne, !R(ne)), E?.sendChrome(R(ne));
	}
	function Uf(e) {
		let t = T.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		n && (ze(`edit:${e.blockId}`), n.props = e.props, T.save(), Ne(), R(k)?.blockId === e.blockId && Tt(), e.rerender && E?.sendSection(R(g), t), N(v, ""));
	}
	function Wf(e) {
		let t = T.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		if (!n) return;
		ze(e.coalesce ? `edit:${e.groupKey ?? e.blockId}` : "move-block");
		let r = e.frameKey === "mobile" ? "mobile" : "desktop";
		n.frames[r] = e.frame, r === "desktop" && De(t, "desktop-changed-after-mobile"), T.save(), Ne(), R(k)?.blockId === e.blockId && Tt();
	}
	function Gf(e) {
		let t = T.data.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
		!t?.frames?.desktop || t.frames.desktop.h === e.h || (T.amendBaseline((t) => {
			let n = t.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
			n?.frames?.desktop && (n.frames.desktop.h = e.h);
		}), T.hasDraft() && ze(`edit:${e.blockId}`), t.frames.desktop.h = e.h, T.save(), Ne(), R(k)?.blockId === e.blockId && Tt());
	}
	function Kf(e) {
		let t = T.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			if (ze("mobile-reset"), e.blockId) {
				let n = t.blocks.find((t) => t.id === e.blockId);
				n && (n.frames.mobile = null);
			} else for (let e of t.blocks) e.frames.mobile = null;
			!Ee(t) && t.responsive?.mobile && (t.responsive.mobile.attention = null), T.save(), Ne(), Ce(), E?.sendSection(R(g), t);
		}
	}
	function qf(e) {
		let t = T.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		!n || typeof e.mobileOrder != "number" || (ze("mobile-order"), n.mobileOrder = e.mobileOrder, T.save(), Ne(), E?.sendSection(R(g), t));
	}
	function Jf(e) {
		let t = T.data.sections.find((t) => t.id === e.sectionId);
		t?.responsive?.mobile && (ze("review-done"), t.responsive.mobile.attention = null, T.save(), Ne(), Ce());
	}
	function Yf(e) {
		let t = T.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		n && (ze("block-flag"), typeof e.decor == "boolean" && (n.decor = e.decor), typeof e.hideMobile == "boolean" && (n.hideMobile = e.hideMobile), T.save(), Ne(), typeof e.hideMobile == "boolean" && R(oe) === "mobile" && E?.sendSection(R(g), t), R(k)?.blockId === e.blockId && Tt());
	}
	function Xf(e) {
		ze("add-section"), e.section.id || (e.section.id = vo("sec")), T.data.sections.splice(e.index, 0, e.section), T.save(), Ne(), E?.sendPage(R(g), T.data), N(ln, e.section.id, !0), gn(e.section), N(lt, "properties");
	}
	function Zf(e) {
		let t = T.data.sections, n = t.findIndex((t) => t.id === e.sectionId), r = n + e.dir;
		n < 0 || r < 0 || r >= t.length || (ze("move-section"), [t[n], t[r]] = [t[r], t[n]], T.save(), Ne(), E?.sendPage(R(g), T.data));
	}
	function Qf(e) {
		ze("delete-section"), e.sectionId === R(ln) && (N(ln, null), N(un, null)), R(k)?.sectionId === e.sectionId && N(k, null), T.data.sections = T.data.sections.filter((t) => t.id !== e.sectionId), T.save(), Ne(), E?.sendPage(R(g), T.data);
	}
	function $f(e) {
		let t = T.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			ze("section-size"), t.size = {
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
			e.moves?.length && (De(t, "section-height"), R(k)?.sectionId === e.sectionId && Tt()), e.sectionId === R(ln) && N(dn, e.minHeight, !0), T.save(), Ne();
		}
	}
	function ep(e) {
		let t = T.data.sections.find((t) => t.id === e.fromSectionId), n = T.data.sections.find((t) => t.id === e.toSectionId), r = t?.blocks.find((t) => t.id === e.blockId);
		!t || !n || !r || (ze("move-block"), t.blocks = t.blocks.filter((t) => t.id !== e.blockId), r.frames.desktop = e.frame, r.frames.mobile = null, n.blocks.push(r), De(t, "block-moved"), De(n, "block-moved"), T.save(), Ne(), Ce(), E?.sendPage(R(g), T.data), R(k)?.blockId === e.blockId && (N(k, {
			...R(k),
			sectionId: e.toSectionId
		}, !0), Tt()));
	}
	function tp(e) {
		let t = T.data.sections.find((t) => t.id === e.sectionId);
		if (!t) return;
		let n = e.blockIds ?? [e.blockId];
		ze("delete-block"), t.blocks = t.blocks.filter((e) => !n.includes(e.id)), n.includes(R(k)?.blockId) && N(k, null), De(t, "block-deleted"), T.save(), Ne(), E?.sendSection(R(g), t);
	}
	let np = {
		text: {
			type: "text",
			props: {
				html: J("seed.text"),
				align: "left"
			},
			w: 33,
			h: 28
		},
		"text-box": {
			type: "text",
			props: {
				html: J("seed.textBox"),
				align: "left",
				box: !0
			},
			w: 30,
			h: 150
		},
		button: {
			type: "button",
			props: {
				label: J("seed.newButton"),
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
		samling: {
			type: "samling",
			props: {
				collection: null,
				view: "cards",
				limit: 6,
				newestFirst: !0
			},
			w: 90,
			h: 200
		},
		galleri: {
			type: "galleri",
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
						q: J("seed.faq.q1"),
						a: J("seed.faq.answer")
					},
					{
						q: J("seed.faq.q2"),
						a: J("seed.faq.answer")
					},
					{
						q: J("seed.faq.q3"),
						a: J("seed.faq.answer")
					}
				],
				multi: !1
			},
			w: 50,
			h: 220
		},
		tidslinje: {
			type: "tidslinje",
			props: {
				items: [
					{
						year: "2019",
						title: J("seed.tidslinje.t1"),
						text: J("seed.tidslinje.text")
					},
					{
						year: "2022",
						title: J("seed.tidslinje.t2"),
						text: J("seed.tidslinje.text")
					},
					{
						year: "2026",
						title: J("seed.tidslinje.t3"),
						text: J("seed.tidslinje.text")
					}
				],
				variant: "venstre",
				marker: "fylt",
				accent: null
			},
			w: 42,
			h: 260
		},
		sitat: {
			type: "sitat",
			props: {
				text: J("seed.sitat.text"),
				attribution: J("seed.sitat.name"),
				role: J("seed.sitat.role"),
				variant: "stor",
				image: "",
				accent: null
			},
			w: 44,
			h: 180
		},
		statistikk: {
			type: "statistikk",
			props: {
				value: "4800",
				prefix: "",
				suffix: "+",
				label: J("seed.statistikk.label"),
				countUp: !0
			},
			w: 20,
			h: 90
		},
		tabell: {
			type: "tabell",
			props: {
				header: !0,
				striped: !1,
				lines: "rows",
				rows: [
					[
						J("seed.tabell.h1"),
						J("seed.tabell.h2"),
						J("seed.tabell.h3")
					],
					[
						J("seed.tabell.r1c1"),
						J("seed.tabell.r1c2"),
						""
					],
					[
						J("seed.tabell.r2c1"),
						J("seed.tabell.r2c2"),
						""
					]
				]
			},
			w: 50,
			h: 160
		},
		deling: {
			type: "deling",
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
		nedteller: {
			type: "nedteller",
			props: {
				target: (() => {
					let e = new Date(Date.now() + 2592e6), t = (e) => String(e).padStart(2, "0");
					return `${e.getFullYear()}-${t(e.getMonth() + 1)}-${t(e.getDate())}T18:00`;
				})(),
				doneText: J("seed.nedteller.done"),
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
		produkt: {
			type: "produkt",
			props: {
				collection: null,
				limit: 0,
				columns: 0,
				currency: "kr"
			},
			w: 90,
			h: 300
		},
		handlekurv: {
			type: "handlekurv",
			props: {
				variant: "button",
				href: "",
				currency: "kr"
			},
			w: 16,
			h: 48
		},
		kasse: {
			type: "kasse",
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
	function rp(e) {
		let t = np[e];
		return t ? {
			id: vo("blk"),
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
	function ip(e) {
		E ? E.sendPlaceBlock(e) : ap(Nr()?.id, e);
	}
	function ap(e, t) {
		let n = T.data.sections.find((t) => t.id === e) ?? T.data.sections[0];
		if (!n) return;
		ze("add-block");
		let r = Math.max(0, ...n.blocks.map((e) => e.frames?.desktop?.z ?? 1)) + 1;
		t.frames?.desktop && (t.frames.desktop = {
			...t.frames.desktop,
			z: r
		}), n.blocks.push(t), De(n, "block-added"), T.save(), Ne(), E?.sendSection(R(g), n);
	}
	function op(e, t, n, r) {
		let i = T.data.sections.find((t) => t.id === e);
		if (!i || !t?.length) return;
		ze("add-blocks");
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
		}), De(i, "block-added"), T.save(), Ne(), E?.sendSection(R(g), i);
	}
	function sp(e) {
		ip(rp(e));
	}
	let cp = /* @__PURE__ */ M(on([]));
	function lp(e, t = {}) {
		let n = We(e);
		ip({
			id: vo("blk"),
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
	let up = /* @__PURE__ */ M("");
	function dp() {
		let e = [
			{
				label: J("blocks.text"),
				act: "block",
				kind: "text"
			},
			{
				label: J("ui.textBox"),
				act: "block",
				kind: "text-box"
			},
			{
				label: J("blocks.button"),
				act: "block",
				kind: "button"
			},
			{
				label: J("blocks.image"),
				act: "image"
			},
			{
				label: J("blocks.video"),
				act: "block",
				kind: "video"
			},
			{
				label: J("blocks.icon"),
				act: "block",
				kind: "icon"
			},
			{
				label: J("blocks.samling"),
				act: "block",
				kind: "samling"
			},
			{
				label: J("blocks.faq"),
				act: "block",
				kind: "faq"
			},
			{
				label: J("blocks.tidslinje"),
				act: "block",
				kind: "tidslinje"
			},
			{
				label: J("blocks.sitat"),
				act: "block",
				kind: "sitat"
			},
			{
				label: J("blocks.statistikk"),
				act: "block",
				kind: "statistikk"
			},
			{
				label: J("blocks.tabell"),
				act: "block",
				kind: "tabell"
			},
			{
				label: J("blocks.deling"),
				act: "block",
				kind: "deling"
			},
			{
				label: J("blocks.nedteller"),
				act: "block",
				kind: "nedteller"
			},
			{
				label: J("blocks.audio"),
				act: "block",
				kind: "audio"
			},
			{
				label: J("blocks.produkt"),
				act: "block",
				kind: "produkt"
			},
			{
				label: J("blocks.handlekurv"),
				act: "block",
				kind: "handlekurv"
			},
			{
				label: J("blocks.kasse"),
				act: "block",
				kind: "kasse"
			},
			{
				label: J("ui.emptyGallery"),
				act: "block",
				kind: "galleri"
			},
			{
				label: J("ui.galleryWithImages"),
				act: "galleryImages"
			},
			{
				label: J("shape.line"),
				act: "block",
				kind: "shape-line"
			},
			{
				label: J("shape.arrow"),
				act: "block",
				kind: "shape-arrow"
			},
			{
				label: J("shape.circle"),
				act: "block",
				kind: "shape-circle"
			},
			{
				label: J("shape.rect"),
				act: "block",
				kind: "shape-rect"
			},
			{
				label: J("shape.triangle"),
				act: "block",
				kind: "shape-triangle"
			}
		];
		for (let t of R(Co)) {
			let n = bo[t]?.data?.mal;
			n?.kind === "blocks" && e.push({
				label: n.name,
				act: "mal",
				id: t
			});
		}
		for (let t of R(cp)) if (t.variants?.length) for (let n of t.variants) e.push({
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
	function fp(e) {
		e.act === "block" ? sp(e.kind) : e.act === "plugin" ? lp(e.entry, e.props ?? {}) : e.act === "mal" && E?.sendInsertTemplate(e.id);
	}
	function pp(e) {
		let t = rp(e.kind);
		if (t) {
			if (e.at && typeof e.at.x == "number" && typeof e.at.y == "number") {
				let n = T.data.sections.find((t) => t.id === e.sectionId)?.grid ?? R(D).grid, r = Hc({
					x: e.at.x,
					y: e.at.y,
					w: t.frames.desktop.w,
					h: t.frames.desktop.h,
					grid: n
				});
				t.frames.desktop.x = r.x, t.frames.desktop.y = r.y;
			} else t.frames.desktop.x = Math.round((100 - t.frames.desktop.w) / 2 * 100) / 100, t.frames.desktop.y = 40;
			ap(e.sectionId, t), E?.sendSelect(t.id), e.kind === "image" && x(J("status.imageBlockAdded")), e.kind === "galleri" && x(J("status.galleryBlockAdded"));
		}
	}
	async function mp(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		x(J("status.compressingImage"));
		let n;
		try {
			n = await Yn(t);
		} catch {
			x(J("status.imageReadError"), "error");
			return;
		}
		let r = Math.round(n.height / n.width * .3 * (R(w)?.clientWidth ?? 1280));
		ip({
			id: vo("blk"),
			type: "image",
			version: 1,
			props: {
				src: n.dataUrl,
				alt: ba(t.name).replaceAll("-", " "),
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
		}), n.bytes > 4e5 ? x(J("status.imageLarge", { kb: Math.round(n.bytes / 1024) }), "error") : x("");
	}
	async function hp(e) {
		let t = [], n = 0, r = 0;
		for (let i of e) try {
			let e = await Yn(i);
			e.bytes > 4e5 && (r += 1), t.push({
				src: e.dataUrl,
				alt: ba(i.name).replaceAll("-", " "),
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
	function gp(e, t, n) {
		t ? x(J("status.imagesReadFailed", { n: t }), "error") : n ? x(J("status.imagesLarge", { n }), "error") : x(e ? "" : J("status.noImagesAdded"));
	}
	async function _p(e) {
		let t = [...e.target.files ?? []];
		if (e.target.value = "", !t.length) return;
		x(J("status.compressingImages"));
		let { images: n, failed: r, big: i } = await hp(t);
		n.length && Mt("galleri-add", (e) => {
			e.props.images.push(...n);
		}), gp(n.length, r, i);
	}
	async function vp(e) {
		let t = [...e.target.files ?? []];
		if (e.target.value = "", !t.length) return;
		x(J("status.compressingImages"));
		let { images: n, failed: r, big: i } = await hp(t);
		if (!n.length) {
			gp(0, r, i);
			return;
		}
		let a = rp("galleri");
		a.props.images = n, ip(a), gp(n.length, r, i);
	}
	function yp(e, t) {
		Mt("galleri-move", (n) => {
			let r = e + t;
			r < 0 || r >= n.props.images.length || ([n.props.images[e], n.props.images[r]] = [n.props.images[r], n.props.images[e]]);
		});
	}
	function bp(e) {
		Mt("galleri-remove", (t) => {
			t.props.images.splice(e, 1);
		});
	}
	function xp(e, t, n) {
		Mt(`edit:${R(k).blockId}:img${e}-${t}`, (r) => {
			r.props.images[e][t] = n;
		});
	}
	function Sp(e, t, n, r) {
		let i = e?.[t];
		if (!i?.startsWith("data:image/") && !i?.startsWith("data:audio/") && !i?.startsWith("data:video/")) return;
		let a = i.split(",", 2)[1], o = `media/${ba(n || "bilde")}-${xa(a)}.${ya(i)}`;
		r.push({
			path: o,
			content: a,
			encoding: "base64"
		}), e[t] = `/${o}`;
	}
	function Cp(e, t) {
		Sp(e, "image", e.title, t);
		for (let n of e.colors ?? []) Sp(n, "image", `${e.title}-${n.name}`, t);
	}
	function wp(e, t) {
		for (let n of e?.layers ?? []) {
			if (n.type === "image" && Sp(n.props, "src", "bakgrunn", t), n.type === "bildegalleri") for (let e of n.props.images ?? []) Sp(e, "src", "bakgrunn", t);
			n.type === "video" && (Sp(n.props, "src", "video", t), Sp(n.props, "poster", "plakat", t));
		}
	}
	function Tp(e, t) {
		if (e.type === "image" && Sp(e.props, "src", e.props.alt, t), e.type === "icon" && Sp(e.props, "image", "ikon", t), e.type === "galleri") for (let n of e.props.images ?? []) Sp(n, "src", n.alt || "galleri", t);
		e.type === "audio" && Sp(e.props, "src", e.props.title || "lyd", t);
	}
	function Ep(e, t) {
		wp(e.background, t);
		for (let n of e.blocks) Tp(n, t);
	}
	function Dp(e) {
		let t = [];
		e.meta?.og && Sp(e.meta.og, "image", "deling", t);
		for (let n of e.sections) Ep(n, t);
		return t;
	}
	function Op(e) {
		let t = [], n = e.nav?.logo;
		return n?.type === "image" && Sp(n, "value", "logo", t), n?.type === "both" && Sp(n, "image", "logo", t), e.nav?.style && Sp(e.nav.style, "image", "meny", t), wp(e.nav?.style?.background, t), wp(e.footer?.background, t), e.footer?.brand && Sp(e.footer.brand, "logo", "footer-logo", t), Sp(e.site, "icon", "ikon", t), t;
	}
	let kp = /* @__PURE__ */ M(!1), Ap = /* @__PURE__ */ M(null);
	function jp() {
		N(kp, !R(kp));
	}
	function Mp() {
		N(kp, !1), Np();
	}
	wn(() => {
		if (!R(kp)) return;
		let e = (e) => {
			R(Ap)?.contains(e.target) || N(kp, !1);
		}, t = (e) => {
			e.key === "Escape" && N(kp, !1);
		}, n = () => N(kp, !1);
		return window.addEventListener("click", e, !0), window.addEventListener("keydown", t, !0), window.addEventListener("blur", n), () => {
			window.removeEventListener("click", e, !0), window.removeEventListener("keydown", t, !0), window.removeEventListener("blur", n);
		};
	});
	function Np() {
		ze("discard");
		for (let e of R(D).pages) e.id !== R(g) && !je.has(e.id) && localStorage.removeItem(`urd-draft-${e.id}`);
		let e = T.reset();
		if (Oe.reset(), Q && (Q.reset(), ys()), ao) {
			ao.reset(), N(lo, [...ao.data.samlinger ?? []], !0);
			for (let e of Object.keys(oo)) R(lo).includes(e) ? oo[e].reset() : delete oo[e];
			Mo();
		}
		if (Z) {
			Z.reset(), N(Co, [...Z.data.maler ?? []], !0);
			for (let e of Object.keys(bo)) R(Co).includes(e) ? bo[e].reset() : (localStorage.removeItem(`urd-draft-mal-${e}`), delete bo[e]);
			To();
		}
		ke(), N(te, {
			snap: !0,
			...R(D).grid
		}, !0), Ne(), N(v, ""), Ae(), R(D).pages.some((e) => e.id === R(g)) ? E?.sendPage(R(g), e) : ci(R(D).pages[0].id);
	}
	async function Pp() {
		if (Jr) {
			x(J("status.revertReloadBeforePublish"), "error");
			return;
		}
		if (R($r)) {
			x(J("update.publishBlocked"), "error");
			return;
		}
		x(J("status.publishing"));
		let e = [], t = [], n = [], r = [];
		for (let i of R(D).pages) {
			let a = `urd-draft-${i.id}`, o = je.has(i.id) || !R(m).pages.some((e) => e.id === i.id), s = null;
			if (i.id === R(g) && (T.hasDraft() || o)) s = T.data;
			else if (i.id !== R(g)) {
				let e = localStorage.getItem(a);
				if (e) try {
					s = fo(JSON.parse(e), Oe.data);
				} catch {}
			}
			if (!s && o && (s = oi(i)), !s) continue;
			let c = JSON.parse(JSON.stringify(s));
			e.push(...Dp(c)), e.push({
				path: i.file,
				content: JSON.stringify(c, null, 2) + "\n",
				encoding: "utf-8"
			}), t.push(i.title), o ? r.push(i.id) : n.push(a);
		}
		if (Oe.hasDraft()) {
			let r = JSON.parse(JSON.stringify(R(D)));
			e.push(...Op(r)), e.push({
				path: "content/site.json",
				content: JSON.stringify(r, null, 2) + "\n",
				encoding: "utf-8"
			}), e.push({
				path: "content/theme.css",
				content: Ms(r.theme),
				encoding: "utf-8"
			}), n.push("urd-draft-site");
			let i = (e, t) => JSON.stringify(e ?? null) === JSON.stringify(t ?? null);
			i(R(m).theme, R(D).theme) || t.push("tema"), i(R(m).nav, R(D).nav) || t.push("menyen"), i(R(m).footer, R(D).footer) || t.push("footeren"), i(R(m).pages, R(D).pages) || t.push("sideregisteret"), i(R(m).grid, R(D).grid) || t.push("gridet"), (R(m).site.icon ?? null) !== (R(D).site.icon ?? null) && t.push("nettstedsikonet");
			let { icon: a, ...o } = R(m).site, { icon: s, ...c } = R(D).site;
			i(o, c) || t.push("nettstedsinfo");
		}
		let i = Object.entries(oo).filter(([, e]) => e.hasDraft());
		if (i.length || ao?.hasDraft()) {
			for (let [t, r] of i) {
				let i = JSON.parse(JSON.stringify(r.data));
				for (let t of i.entries) Cp(t, e);
				e.push({
					path: `content/samlinger/${t}.json`,
					content: JSON.stringify(i, null, 2) + "\n",
					encoding: "utf-8"
				}), ts.includes(i.kind) && e.push({
					path: `content/samlinger/${t}.xml`,
					content: ns({
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
					path: "content/samlinger.json",
					content: JSON.stringify(ao.data, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push("urd-draft-samlinger");
				let t = { samlinger: [] };
				try {
					t = await (await fetch("/content/samlinger.json")).json();
				} catch {}
				let r = new Set(e.map((e) => e.path));
				for (let n of t.samlinger ?? []) {
					let t = `content/samlinger/${n}.json`;
					!R(lo).includes(n) && !r.has(t) && e.push({
						path: t,
						delete: !0
					});
				}
			}
			t.push("samlinger");
		}
		let a = Object.entries(bo).filter(([, e]) => e.hasDraft());
		if (a.length || Z?.hasDraft()) {
			for (let [t, r] of a) {
				let i = JSON.parse(JSON.stringify(r.data));
				i.section && Ep(i.section, e);
				for (let t of i.blocks ?? []) Tp(t, e);
				for (let t of i.page?.sections ?? []) Ep(t, e);
				e.push({
					path: `content/maler/${t}.json`,
					content: JSON.stringify(i, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push(`urd-draft-mal-${t}`);
			}
			if (Z?.hasDraft()) {
				e.push({
					path: "content/maler.json",
					content: JSON.stringify(Z.data, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push("urd-draft-maler");
				let t = { maler: [] };
				try {
					t = await (await fetch("/content/maler.json")).json();
				} catch {}
				let r = new Set(e.map((e) => e.path));
				for (let n of t.maler ?? []) {
					let t = `content/maler/${n}.json`;
					!R(Co).includes(n) && !r.has(t) && e.push({
						path: t,
						delete: !0
					});
				}
			}
			t.push("maler");
		}
		Q?.hasDraft() && (e.push({
			path: "plugins/plugins.json",
			content: JSON.stringify(Q.data, null, 2) + "\n",
			encoding: "utf-8"
		}), n.push("urd-draft-plugins"), t.push("plugins"));
		try {
			let t = await (await fetch("/index.html")).text();
			for (let n of R(D).pages) n.path !== "/" && e.push({
				path: `${n.path.slice(1)}/index.html`,
				content: t,
				encoding: "utf-8"
			});
		} catch {}
		e.push({
			path: "sitemap.xml",
			content: $o(R(D).pages, location.origin),
			encoding: "utf-8"
		}), e.push({
			path: "robots.txt",
			content: es(location.origin),
			encoding: "utf-8"
		});
		let o = new Set(e.map((e) => e.path)), s = (t) => {
			o.has(t) || e.push({
				path: t,
				delete: !0
			});
		};
		for (let e of R(m).pages) {
			let t = R(D).pages.find((t) => t.id === e.id);
			t ? t.path !== e.path && e.path !== "/" && s(`${e.path.slice(1)}/index.html`) : (s(e.file), e.path !== "/" && s(`${e.path.slice(1)}/index.html`));
		}
		let c = await Br(e);
		if (!c.ok) {
			x(J("status.publishAborted"), "error");
			return;
		}
		let l = {
			message: `Oppdater ${t.join(", ") || "nettstedet"} via Urd-admin`,
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
			e ? Rr = e : zr(), Dp(T.data), Op(R(D));
			for (let e of n) localStorage.removeItem(e);
			for (let e of r) je.add(e);
			if (N(m, JSON.parse(JSON.stringify(R(D))), !0), Oe = Xi("urd-draft-site", () => R(m), S), ke(), Q) {
				let e = JSON.parse(JSON.stringify(Q.data));
				Q = Xi("urd-draft-plugins", () => e, S), ys();
			}
			if (ao) {
				for (let e of Object.values(oo)) for (let t of e.data.entries) Cp(t, []);
				let e = JSON.parse(JSON.stringify(ao.data));
				ao = Xi("urd-draft-samlinger", () => e, S), so = {};
				for (let e of R(lo)) {
					if (!oo[e]) continue;
					let t = JSON.parse(JSON.stringify(oo[e].data));
					so[e] = t, oo[e] = Xi(`urd-draft-samling-${e}`, () => t, S);
				}
				Mo();
			}
			if (Z) {
				for (let e of Object.values(bo)) {
					e.data?.section && Ep(e.data.section, []);
					for (let t of e.data?.blocks ?? []) Tp(t, []);
					for (let t of e.data?.page?.sections ?? []) Ep(t, []);
				}
				let e = JSON.parse(JSON.stringify(Z.data));
				Z = Xi("urd-draft-maler", () => e, S), xo = {};
				for (let e of R(Co)) {
					if (!bo[e]) continue;
					let t = JSON.parse(JSON.stringify(bo[e].data));
					xo[e] = t, bo[e] = Xi(`urd-draft-mal-${e}`, () => t, S);
				}
				To();
			}
			N(te, {
				snap: !0,
				...R(D).grid
			}, !0);
			let t = JSON.parse(JSON.stringify(T.data));
			T = Xi(`urd-draft-${R(g)}`, () => t, S), je.has(R(g)) && C(`urd-draft-${R(g)}`, JSON.stringify(t)), Ne(), x(J("status.published"), "ok");
		} else if (u?.status === 401) {
			let e = await u.json().catch(() => null);
			x(e?.code === "loginExpired" ? J("status.loginExpired") : J("status.loginRequired", { reason: Hi(e) ?? J("status.unknownReason") }), "error"), await Lr();
		} else u?.status === 403 ? x(Hi(await u.json().catch(() => null)) ?? J("status.noPublishAccess"), "error") : u?.status === 409 ? x(J("status.publishRace"), "error") : x(u ? Hi(await u.json().catch(() => null)) ?? J("status.publishFailed") : J("status.publishUnavailable"), "error");
	}
	Ze();
	var Fp = _f();
	Er("keydown", sn, Xe), Er("pointerdown", sn, qe);
	var Ip = F(Fp), Lp = P(Ip), Rp = (e) => {
		var t = du(), n = P(t);
		W(n, () => c.pencil);
		var r = I(n);
		O(t), L((e, n) => {
			q(t, "title", e), H(r, ` ${n ?? ""}`);
		}, [() => J("tip.backToEdit"), () => J("ui.edit")]), z("click", t, Hf), V(e, t);
	};
	U(Lp, (e) => {
		R(ne) || e(Rp);
	});
	var zp = I(Lp, 2);
	let Bp;
	var Vp = P(zp), Hp = P(Vp), Up = (e) => {
		var t = Su(), n = F(t), r = P(n, !0);
		O(n);
		var i = I(n, 2), a = P(i), o = (e) => {
			var t = mu(), n = P(t);
			let r;
			var i = P(n);
			W(i, () => c[`device_${R(ie)}`]), W(I(i), () => c.caret), O(n);
			var a = I(n, 2), o = (e) => {
				var t = pu();
				qr(t, 21, () => re, (e) => e.id, (e, t) => {
					var n = fu();
					let r;
					var i = P(n);
					W(i, () => c[`device_${R(t).id}`]);
					var a = I(i);
					O(n), L((e, i) => {
						r = mi(n, 1, "ghost svelte-1n46o8q", null, r, { active: R(ie) === R(t).id }), q(n, "title", e), H(a, ` ${i ?? ""}`);
					}, [() => J(`tip.view.${R(t).id}`, {
						w: R(t).width ?? R(pe),
						c: Qa(R(da), R(ma), R(t).width ?? R(pe)).width
					}), () => J(`lbl.device.${R(t).id}`)]), z("click", n, () => {
						N(ie, R(t).id, !0), N(yi, null);
					}), V(e, n);
				}), O(t), V(e, t);
			};
			U(a, (e) => {
				R(yi) === "device" && e(o);
			}), O(t), L((e) => {
				r = mi(n, 1, "ghost svelte-1n46o8q", null, r, { active: R(yi) === "device" }), q(n, "title", e);
			}, [() => J("lbl.group.device")]), z("click", n, () => N(yi, R(yi) === "device" ? null : "device", !0)), V(e, t);
		}, s = (e) => {
			var t = gu(), n = F(t), r = P(n, !0);
			O(n);
			var i = I(n, 2);
			qr(i, 21, () => re, (e) => e.id, (e, t) => {
				var n = hu();
				let r;
				W(n, () => c[`device_${R(t).id}`], !0), O(n), L((e) => {
					r = mi(n, 1, "ghost svelte-1n46o8q", null, r, { active: R(ie) === R(t).id }), q(n, "title", e);
				}, [() => J(`tip.view.${R(t).id}`, {
					w: R(t).width ?? R(pe),
					c: Qa(R(da), R(ma), R(t).width ?? R(pe)).width
				})]), z("click", n, () => N(ie, R(t).id, !0)), V(e, n);
			}), O(i), L((e) => H(r, e), [() => J("lbl.group.device")]), V(e, t);
		};
		U(a, (e) => {
			Si.device ? e(o) : e(s, -1);
		});
		var l = I(a, 2), u = (e) => {
			var t = vu(), n = P(t);
			let r;
			var i = P(n), a = P(i);
			O(i), W(I(i), () => c.caret), O(n);
			var o = I(n, 2), s = (e) => {
				var t = _u(), n = P(t), r = P(n);
				W(r, () => c.minus, !0), O(r);
				var i = I(r, 2), a = P(i);
				O(i);
				var o = I(i, 2);
				W(o, () => c.plus, !0), O(o), O(n);
				var s = I(n, 2);
				let l;
				var u = P(s);
				W(u, () => c.fit);
				var d = I(u);
				O(s), O(t), L((e, t, n, c, u, f) => {
					q(r, "title", e), q(i, "title", t), H(a, `${n ?? ""}%`), q(o, "title", c), l = mi(s, 1, "ghost svelte-1n46o8q", null, l, { active: R(de) === "fit" }), q(s, "title", u), H(d, ` ${f ?? ""}`);
				}, [
					() => J("tip.zoomOut"),
					() => J("tip.zoomCurrent"),
					() => Math.round(R(ge) * 100),
					() => J("tip.zoomIn"),
					() => J("tip.zoomFit"),
					() => J("lbl.zoom.fit")
				]), z("click", r, () => _e(-1)), z("click", o, () => _e(1)), z("click", s, () => N(de, "fit")), V(e, t);
			};
			U(o, (e) => {
				R(yi) === "zoom" && e(s);
			}), O(t), L((e, t) => {
				r = mi(n, 1, "ghost svelte-1n46o8q", null, r, { active: R(yi) === "zoom" }), q(n, "title", e), H(a, `${t ?? ""}%`);
			}, [() => J("lbl.group.zoom"), () => Math.round(R(ge) * 100)]), z("click", n, () => N(yi, R(yi) === "zoom" ? null : "zoom", !0)), V(e, t);
		}, d = (e) => {
			var t = yu(), n = F(t), r = P(n, !0);
			O(n);
			var i = I(n, 2), a = P(i);
			W(a, () => c.minus, !0), O(a);
			var o = I(a, 2), s = P(o);
			O(o);
			var l = I(o, 2);
			W(l, () => c.plus, !0), O(l);
			var u = I(l, 2);
			let d;
			W(u, () => c.fit, !0), O(u), O(i), L((e, t, n, i, c, f) => {
				H(r, e), q(a, "title", t), q(o, "title", n), H(s, `${i ?? ""}%`), q(l, "title", c), d = mi(u, 1, "ghost svelte-1n46o8q", null, d, { active: R(de) === "fit" }), q(u, "title", f);
			}, [
				() => J("lbl.group.zoom"),
				() => J("tip.zoomOut"),
				() => J("tip.zoomCurrent"),
				() => Math.round(R(ge) * 100),
				() => J("tip.zoomIn"),
				() => J("tip.zoomFit")
			]), z("click", a, () => _e(-1)), z("click", l, () => _e(1)), z("click", u, () => N(de, "fit")), V(e, t);
		};
		U(l, (e) => {
			Si.zoom ? e(u) : e(d, -1);
		});
		var f = I(l, 2), p = (e) => {
			var t = mu(), n = P(t);
			let r;
			var i = P(n);
			W(i, () => c.gridToggle), W(I(i), () => c.caret), O(n);
			var a = I(n, 2), o = (e) => {
				var t = bu(), n = P(t);
				let r;
				var i = P(n);
				W(i, () => c.gridToggle);
				var a = I(i);
				O(n);
				var o = I(n, 2);
				let s;
				var l = P(o);
				W(l, () => c.guides);
				var u = I(l);
				O(o), O(t), L((e, t, i, c) => {
					r = mi(n, 1, "ghost svelte-1n46o8q", null, r, { active: R(wi) }), q(n, "title", e), H(a, ` ${t ?? ""}`), s = mi(o, 1, "ghost svelte-1n46o8q", null, s, { active: R(di) }), q(o, "title", i), H(u, ` ${c ?? ""}`);
				}, [
					() => J("tip.gridToggle"),
					() => J("lbl.view.grid"),
					() => J("tip.guides"),
					() => J("lbl.view.guides")
				]), z("click", n, Ei), z("click", o, Ci), V(e, t);
			};
			U(a, (e) => {
				R(yi) === "view" && e(o);
			}), O(t), L((e) => {
				r = mi(n, 1, "ghost svelte-1n46o8q", null, r, { active: R(yi) === "view" || R(wi) || R(di) }), q(n, "title", e);
			}, [() => J("lbl.group.view")]), z("click", n, () => N(yi, R(yi) === "view" ? null : "view", !0)), V(e, t);
		}, m = (e) => {
			var t = xu(), n = F(t), r = P(n, !0);
			O(n);
			var i = I(n, 2), a = P(i);
			let o;
			W(a, () => c.gridToggle, !0), O(a);
			var s = I(a, 2);
			let l;
			W(s, () => c.guides, !0), O(s), O(i), L((e, t, n) => {
				H(r, e), o = mi(a, 1, "ghost svelte-1n46o8q", null, o, { active: R(wi) }), q(a, "title", t), l = mi(s, 1, "ghost svelte-1n46o8q", null, l, { active: R(di) }), q(s, "title", n);
			}, [
				() => J("lbl.group.view"),
				() => J("tip.gridToggle"),
				() => J("tip.guides")
			]), z("click", a, Ei), z("click", s, Ci), V(e, t);
		};
		U(f, (e) => {
			Si.view ? e(p) : e(m, -1);
		}), O(i), ki(i, (e) => N(bi, e), () => R(bi)), L((e, t) => {
			q(n, "title", e), H(r, t);
		}, [() => J("tip.switchPage"), () => Me()?.title ?? ""]), z("click", n, () => Ct("pages")), V(e, t);
	};
	U(Hp, (e) => {
		R(m) && e(Up);
	});
	var Wp = I(Hp, 2), Gp = (e) => {
		var t = Cu(), n = P(t);
		W(n, () => c.phone);
		var r = I(n, 2), i = P(r, !0);
		O(r);
		var a = I(r, 2), o = P(a, !0);
		O(a), O(t), L((e, n) => {
			q(t, "title", e), H(i, n), H(o, R(Se));
		}, [() => J("tip.attention"), () => J(R(Se) === 1 ? "ui.attentionOne" : "ui.attentionMany", { n: R(Se) })]), z("click", t, we), V(e, t);
	};
	U(Wp, (e) => {
		R(Se) > 0 && e(Gp);
	}), O(Vp);
	var Kp = I(Vp, 2), qp = P(Kp), Jp = (e) => {
		var t = Tu(), n = P(t), r = P(n), i = P(r, !0);
		O(r), Le(2), O(n);
		var a = I(n, 2), o = P(a);
		let s;
		var l = P(o);
		W(l, () => c.restore);
		var u = I(l), d = P(u, !0);
		O(u), O(o);
		var f = I(o, 2), p = (e) => {
			var t = wu(), n = P(t);
			W(n, () => c.restore);
			var r = I(n);
			O(t), L((e, n) => {
				q(t, "title", e), H(r, ` ${n ?? ""}`);
			}, [() => J("tip.discardArmed"), () => J("ui.discardConfirm")]), z("click", t, Mp), V(e, t);
		};
		U(f, (e) => {
			R(kp) && e(p);
		}), O(a), ki(a, (e) => N(Ap, e), () => R(Ap)), O(t), L((e, t, r, a, c) => {
			q(n, "title", e), q(n, "aria-label", t), H(i, r), s = mi(o, 1, "discard-dot svelte-1n46o8q", null, s, { armed: R(kp) }), q(o, "title", a), H(d, c);
		}, [
			() => J("ui.unpublished"),
			() => J("ui.unpublished"),
			() => J("ui.unpublished"),
			() => R(kp) ? J("tip.discardArmed") : J("tip.discard"),
			() => J("ui.discard")
		]), z("click", o, jp), si(2, t, () => Yi, () => ({
			x: 24,
			duration: Ot ? 0 : 150
		})), V(e, t);
	};
	U(qp, (e) => {
		R(_) && e(Jp);
	}), O(Kp);
	var Yp = I(Kp, 2), Xp = P(Yp), Zp = (e) => {
		var t = ku(), n = F(t), r = P(n), i = (e) => {
			var t = Eu(), n = F(t);
			W(n, () => c.eye);
			var r = I(n, 2), i = P(r, !0);
			O(r), L((e) => H(i, e), [() => J("ui.cleanView")]), V(e, t);
		}, a = (e) => {
			var t = Eu(), n = F(t);
			W(n, () => c.pencil);
			var r = I(n, 2), i = P(r, !0);
			O(r), L((e) => H(i, e), [() => J("ui.edit")]), V(e, t);
		};
		U(r, (e) => {
			R(ne) ? e(i) : e(a, -1);
		}), O(n);
		var o = I(n, 2), s = (e) => {
			var t = Du(), n = P(t), r = (e) => {
				var t = Ir();
				W(F(t), () => c.warn), V(e, t);
			};
			U(n, (e) => {
				R(ee).allowed || e(r);
			});
			var i = I(n, 1, !0);
			O(t), L((e) => {
				q(t, "title", e), H(i, R(ee).login);
			}, [() => R(ee).allowed ? J("tip.hasPublishAccess") : J("tip.noPublishAccess")]), V(e, t);
		}, l = (e) => {
			var t = Ou(), n = P(t, !0);
			O(t), L((e) => H(n, e), [() => J("ui.loginGitHub")]), V(e, t);
		};
		U(o, (e) => {
			R(ee)?.loggedIn ? e(s) : R(ee) && e(l, 1);
		});
		var u = I(o, 2), d = P(u);
		W(d, () => c.external);
		var f = I(d, 2), p = P(f, !0);
		O(f), O(u);
		var m = I(u, 2), h = P(m, !0);
		O(m), L((e, t, r, i, a) => {
			q(n, "title", e), q(u, "href", t), q(u, "title", r), H(p, i), m.disabled = !R(_), H(h, a);
		}, [
			() => R(ne) ? J("tip.chromeHide") : J("tip.chromeShow"),
			() => Me()?.path ?? "/",
			() => J("ui.viewSite"),
			() => J("ui.viewSite"),
			() => J("ui.publish")
		]), z("click", n, Hf), z("click", m, Pp), V(e, t);
	};
	U(Xp, (e) => {
		R(m) && e(Zp);
	}), O(Yp), O(zp);
	var Qp = I(zp, 2), $p = (e) => {
		var t = uf(), i = P(t), o = (e) => {
			var t = lf(), i = F(t), o = P(i);
			qr(o, 17, () => ft, Ur, (e, t, n) => {
				var r = ju(), i = F(r), a = P(i, !0);
				O(i), qr(I(i, 2), 16, () => R(t), (e) => e, (e, t) => {
					var n = Au();
					let r;
					var i = P(n, !0);
					O(n), L(() => {
						r = mi(n, 1, "svelte-1n46o8q", null, r, { active: R(lt) === t }), H(i, mt[t]);
					}), z("click", n, () => Ct(t)), V(e, n);
				}), L((e) => H(a, e), [() => J(pt[n])]), V(e, r);
			});
			var s = I(o, 2), d = I(P(s), 2);
			let p;
			W(d, () => c.gear, !0), O(d);
			var m = I(d, 2), _ = (e) => {
				var t = Mu(), n = P(t), r = P(n, !0);
				O(n);
				var i = I(n, 2), a = P(i);
				Y(I(a), {
					get value() {
						return R(u);
					},
					get options() {
						return l;
					},
					onchange: (e) => N(u, e, !0)
				}), O(i);
				var o = I(i, 2), s = P(o), c = I(s);
				{
					let e = /* @__PURE__ */ A(() => [["auto", J("lang.auto")], ...yt()]);
					Y(c, {
						get value() {
							return xt;
						},
						get options() {
							return R(e);
						},
						onchange: St
					});
				}
				O(o);
				var d = I(o, 2), f = P(d), p = I(f);
				{
					let e = /* @__PURE__ */ A(() => [["strip", J("settings.layoutPickerStrip")], ["menu", J("settings.layoutPickerMenu")]]);
					Y(p, {
						get value() {
							return R(pi);
						},
						get options() {
							return R(e);
						},
						onchange: hi
					});
				}
				O(d), O(t), L((e, t, n, c, l, u, p) => {
					H(r, e), q(i, "title", t), H(a, `${n ?? ""} `), q(o, "title", c), H(s, `${l ?? ""} `), q(d, "title", u), H(f, `${p ?? ""} `);
				}, [
					() => J("settings.title"),
					() => J("topbar.adminTheme.title"),
					() => J("settings.theme"),
					() => J("topbar.language.title"),
					() => J("settings.language"),
					() => J("tip.settings.layoutPicker"),
					() => J("settings.layoutPicker")
				]), V(e, t);
			};
			U(m, (e) => {
				R(fi) && e(_);
			}), O(s), ki(s, (e) => N(_i, e), () => R(_i)), O(i);
			var v = I(i, 2), y = (e) => {
				var t = cf(), i = P(t), o = P(i, !0);
				O(i);
				var s = I(i, 2), l = (e) => {
					var t = Uu(), n = P(t);
					qr(n, 17, () => R(D).pages, (e) => e.id, (e, t) => {
						var n = Ru();
						let r;
						var i = P(n);
						G(i);
						var a = I(i, 2), o = (e) => {
							var t = Nu();
							L((e) => q(t, "title", e), [() => J("tip.pages.homeLocked")]), V(e, t);
						}, s = (e) => {
							var n = Pu();
							G(n), L((e, t) => {
								K(n, e), q(n, "title", t);
							}, [() => R(t).path.slice(1), () => J("tip.pages.slug")]), z("change", n, (e) => $i(R(t), e.target.value)), V(e, n);
						};
						U(a, (e) => {
							R(t).path === "/" ? e(o) : e(s, -1);
						});
						var l = I(a, 2), u = (e) => {
							var t = Fu();
							W(t, () => c.warn, !0), O(t), L((e) => q(t, "title", e), [() => J("tip.pages.missingDescription")]), V(e, t);
						};
						U(l, (e) => {
							R(Ki)[R(t).id] && e(u);
						});
						var d = I(l, 2), f = P(d);
						W(f, () => c.right, !0), O(f);
						var p = I(f, 2), m = P(p);
						W(m, () => c.kebab, !0), O(m);
						var h = I(m, 2), _ = (e) => {
							var n = Lu(), r = P(n), i = P(r);
							W(i, () => c.bookmark);
							var a = I(i);
							O(r);
							var o = I(r, 2), s = (e) => {
								var n = Iu(), r = P(n);
								W(r, () => c.cross);
								var i = I(r);
								O(n), L((e, t) => {
									q(n, "title", e), H(i, ` ${t ?? ""}`);
								}, [() => J("tip.pages.delete"), () => J("ui.deletePage")]), z("click", n, () => {
									N(Pi, null), ea(R(t));
								}), V(e, n);
							};
							U(o, (e) => {
								R(t).path !== "/" && e(s);
							}), O(n), L((e) => H(a, ` ${e ?? ""}`), [() => J("ui.savePageTemplate")]), z("click", r, () => Ri(R(t))), V(e, n);
						};
						U(h, (e) => {
							R(Pi) === R(t).id && e(_);
						}), O(p), O(d), O(n), L((e, a, o) => {
							r = mi(n, 1, "page-row svelte-1n46o8q", null, r, { current: R(t).id === R(g) }), K(i, R(t).title), q(i, "title", e), q(f, "title", a), f.disabled = R(t).id === R(g), q(m, "title", o);
						}, [
							() => J("tip.pages.title"),
							() => J("tip.pages.open"),
							() => J("tip.pages.menu")
						]), z("change", i, (e) => zi(R(t), e.target.value)), z("click", f, () => ci(R(t).id)), z("click", m, () => N(Pi, R(Pi) === R(t).id ? null : R(t).id, !0)), V(e, n);
					});
					var r = I(n, 2), i = P(r), a = P(i, !0);
					O(i);
					var o = I(i, 2), s = P(o), l = P(s), u = I(l);
					dt(u), O(s);
					var d = I(s, 2), f = P(d), p = I(f);
					G(p), O(d);
					var m = I(d, 2), h = P(m), _ = I(h);
					dt(_), O(m);
					var v = I(m, 2), y = P(v), b = I(y), x = (e) => {
						var t = zu();
						L((e) => {
							q(t, "src", R(Bi).ogImage), q(t, "alt", e);
						}, [() => J("lbl.ogImage")]), V(e, t);
					};
					U(b, (e) => {
						R(Bi).ogImage && e(x);
					}), O(v);
					var S = I(v, 2), C = P(S), w = P(C), ee = I(w);
					O(C);
					var te = I(C, 2), ne = (e) => {
						var t = Wc();
						W(t, () => c.cross, !0), O(t), L((e) => q(t, "title", e), [() => J("tip.seo.removeOgImage")]), z("click", t, () => Wi("ogImage", "")), V(e, t);
					};
					U(te, (e) => {
						R(Bi).ogImage && e(ne);
					}), O(S);
					var re = I(S, 2), ie = P(re);
					G(ie);
					var ae = I(ie);
					O(re), O(o), O(r);
					var oe = I(r, 4);
					G(oe);
					var se = I(oe, 2), ce = P(se, !0);
					O(se);
					var le = I(se, 2), ue = P(le, !0);
					O(le);
					var de = I(le, 2), fe = P(de);
					let pe;
					var me = P(fe), he = P(me);
					W(he, () => xs({ sections: [] }), !0), O(he);
					var ge = I(he, 2), _e = P(ge, !0);
					O(ge), O(me), O(fe), qr(I(fe, 2), 17, () => Cs, (e) => e.id, (e, t) => {
						var n = Bu();
						let r;
						var i = P(n), a = P(i);
						W(a, () => Mi[R(t).id], !0), O(a);
						var o = I(a, 2), s = P(o, !0);
						O(o), O(i), O(n), L((e, a) => {
							r = mi(n, 1, "page-mal-card svelte-1n46o8q", null, r, { picked: R(ji) === `preset:${R(t).id}` }), q(i, "title", e), H(s, a);
						}, [() => J("tip.pages.templatePick", { name: J(R(t).labelKey) }), () => J(R(t).labelKey)]), z("click", i, () => N(ji, R(ji) === `preset:${R(t).id}` ? null : `preset:${R(t).id}`, !0)), V(e, n);
					}), O(de);
					var ve = I(de, 2), ye = (e) => {
						var t = Hu(), n = F(t), r = P(n, !0);
						O(n);
						var i = I(n, 2);
						qr(i, 20, () => R(Co).filter((e) => bo[e]?.data?.mal?.kind === "page"), (e) => e, (e, t) => {
							var n = Vu();
							let r;
							var i = P(n), a = P(i);
							W(a, () => xs(bo[t].data.page), !0), O(a);
							var o = I(a, 2), s = P(o, !0);
							O(o), O(i);
							var l = I(i, 2);
							W(l, () => c.cross, !0), O(l), O(n), L((e, a) => {
								r = mi(n, 1, "page-mal-card svelte-1n46o8q", null, r, { picked: R(ji) === t }), q(i, "title", e), H(s, bo[t].data.mal.name), q(l, "title", a);
							}, [() => J("tip.pages.templatePick", { name: bo[t].data.mal.name }), () => J("canvas.deleteTemplate")]), z("click", i, () => N(ji, R(ji) === t ? null : t, !0)), z("click", l, () => Ao({ id: t })), V(e, n);
						}), O(i), L((e) => {
							H(r, e), gi(i, R(Ni));
						}, [() => J("canvas.tabMyTemplates")]), V(e, t);
					}, be = /* @__PURE__ */ A(() => R(Co).some((e) => bo[e]?.data?.mal?.kind === "page"));
					U(ve, (e) => {
						R(be) && e(ye);
					}), O(t), L((e, t, n, r, i, o, c, g, b, x, S, ee, te, ne, le, he, ge, ve, ye, be, xe, Se) => {
						H(a, e), q(s, "title", t), H(l, `${n ?? ""} `), K(u, R(Bi).description), q(d, "title", r), H(f, `${i ?? ""} `), K(p, R(Bi).ogTitle), q(p, "placeholder", o), q(m, "title", c), H(h, `${g ?? ""} `), K(_, R(Bi).ogDescription), q(_, "placeholder", R(Bi).description), q(v, "title", b), H(y, `${x ?? ""} `), q(C, "title", S), H(w, `${ee ?? ""} `), q(re, "title", te), xi(ie, ne), H(ae, ` ${le ?? ""}`), q(oe, "placeholder", he), q(se, "title", ge), se.disabled = ve, H(ce, ye), H(ue, be), gi(de, R(Ni)), pe = mi(fe, 1, "page-mal-card svelte-1n46o8q", null, pe, { picked: R(ji) === null }), q(me, "title", xe), H(_e, Se);
					}, [
						() => J("ui.seoGroup", { page: R(D).pages.find((e) => e.id === R(g))?.title ?? "" }),
						() => J("tip.seo.description"),
						() => J("lbl.seoDescription"),
						() => J("tip.seo.ogTitle"),
						() => J("lbl.ogTitle"),
						() => R(D).pages.find((e) => e.id === R(g))?.title ?? "",
						() => J("tip.seo.ogDescription"),
						() => J("lbl.ogDescription"),
						() => J("tip.seo.ogImage"),
						() => J("lbl.ogImage"),
						() => J("tip.seo.ogImage"),
						() => R(Bi).ogImage ? J("ui.changeImage") : J("ui.chooseImage"),
						() => J("tip.seo.hideFromSearch"),
						() => R(D).pages.find((e) => e.id === R(g))?.noindex === !0,
						() => J("lbl.hideFromSearch"),
						() => J("ph.newPageName"),
						() => J("hint.pages.autoMenu"),
						() => !R(Ai).trim(),
						() => J("ui.createPage"),
						() => J("canvas.tabPresets"),
						() => J("tip.pages.blankPick"),
						() => J("ui.blankPage")
					]), z("change", u, (e) => Wi("description", e.target.value)), z("change", p, (e) => Wi("ogTitle", e.target.value)), z("change", _, (e) => Wi("ogDescription", e.target.value)), z("change", ee, Ji), z("change", ie, (e) => Gi(e.target.checked)), z("keydown", oe, (e) => e.key === "Enter" && Li()), Ti(oe, () => R(Ai), (e) => N(Ai, e)), z("click", se, Li), z("click", me, () => N(ji, null)), V(e, t);
				}, u = (e) => {
					var t = Yu(), r = P(t), i = P(r), a = P(i, !0);
					O(i);
					var o = I(i, 2), s = P(o), l = P(s), u = I(l);
					{
						let e = /* @__PURE__ */ A(() => R(D).nav.logo?.type ?? "text"), t = /* @__PURE__ */ A(() => [
							["text", J("blocks.text")],
							["image", J("blocks.image")],
							["both", J("opt.logo.both")]
						]);
						Y(u, {
							get value() {
								return R(e);
							},
							get options() {
								return R(t);
							},
							onchange: (e) => na(e)
						});
					}
					O(s);
					var d = I(s, 2), f = (e) => {
						var t = Wu(), n = F(t);
						G(n);
						var r = I(n, 2), i = P(r);
						{
							let e = /* @__PURE__ */ A(() => J("tip.nav.logoFont")), t = /* @__PURE__ */ A(() => R(D).nav.logo?.font ?? ""), n = /* @__PURE__ */ A(() => [["", J("common.inherit")], ...Vc.map(([e, t]) => [t, J(e)])]);
							Y(i, {
								get title() {
									return R(e);
								},
								get value() {
									return R(t);
								},
								get options() {
									return R(n);
								},
								onchange: (e) => ta({ font: e || void 0 })
							});
						}
						var a = I(i, 2);
						G(a);
						var o = I(a, 2);
						let s;
						var c = P(o), l = P(c, !0);
						O(c), O(o);
						var u = I(o, 2);
						let d;
						var f = P(u), p = P(f, !0);
						O(f), O(u), O(r), L((e, t, r, i, c, f, m) => {
							K(n, R(D).nav.logo?.value ?? ""), q(n, "placeholder", e), q(a, "title", t), K(a, R(D).nav.logo?.textSize ?? ""), s = mi(o, 1, "tbtn svelte-1n46o8q", null, s, { active: R(D).nav.logo?.bold !== !1 }), q(o, "title", r), H(l, i), d = mi(u, 1, "tbtn svelte-1n46o8q", null, d, c), q(u, "title", f), H(p, m);
						}, [
							() => J("ph.nav.logoName"),
							() => J("tip.nav.textSize"),
							() => J("format.bold"),
							() => J("format.boldLetter"),
							() => ({ active: !!R(D).nav.logo?.italic }),
							() => J("format.italic"),
							() => J("format.italicLetter")
						]), z("input", n, (e) => ta({ value: e.target.value })), z("change", a, (e) => ta({ textSize: e.target.value ? Number(e.target.value) : void 0 })), z("click", o, () => ta({ bold: R(D).nav.logo?.bold === !1 })), z("click", u, () => ta({ italic: !R(D).nav.logo?.italic })), V(e, t);
					};
					U(d, (e) => {
						(R(D).nav.logo?.type ?? "text") !== "image" && e(f);
					});
					var p = I(d, 2), m = (e) => {
						var t = Gu(), n = P(t), r = P(n), i = I(r);
						O(n);
						var a = I(n, 2);
						G(a);
						var o = I(a, 2);
						G(o), O(t), L((e, t, i, s) => {
							q(n, "title", e), H(r, `${t ?? ""} `), q(a, "title", i), K(a, R(D).nav.logo?.size ?? 32), q(o, "title", s), K(o, R(D).nav.logo?.radius ?? 0);
						}, [
							() => J("tip.webpAuto"),
							() => (R(D).nav.logo?.type === "image" ? R(D).nav.logo?.value : R(D).nav.logo?.image) ? J("ui.changeImage") : J("ui.chooseImage"),
							() => J("tip.nav.logoHeight"),
							() => J("tip.nav.logoRadius")
						]), z("change", i, ra), z("change", a, (e) => ta({ size: Number(e.target.value) })), z("change", o, (e) => ta({ radius: Number(e.target.value) })), V(e, t);
					};
					U(p, (e) => {
						(R(D).nav.logo?.type ?? "text") !== "text" && e(m);
					});
					var h = I(p, 2), g = (e) => {
						var t = cl(), n = P(t), r = I(n);
						{
							let e = /* @__PURE__ */ A(() => R(D).nav.logo?.order ?? "image-first"), t = /* @__PURE__ */ A(() => [["image-first", J("opt.logo.imageFirst")], ["text-first", J("opt.logo.textFirst")]]);
							Y(r, {
								get value() {
									return R(e);
								},
								get options() {
									return R(t);
								},
								onchange: (e) => ta({ order: e })
							});
						}
						O(t), L((e) => H(n, `${e ?? ""} `), [() => J("lbl.order")]), V(e, t);
					};
					U(h, (e) => {
						R(D).nav.logo?.type === "both" && e(g);
					}), O(o), O(r);
					var _ = I(r, 2), v = P(_), y = P(v, !0);
					O(v);
					var b = I(v, 2), x = P(b), S = P(x), C = I(S);
					{
						let e = /* @__PURE__ */ A(() => R(D).nav.variant ?? "bar"), t = /* @__PURE__ */ A(() => [
							["bar", J("opt.navVariant.bar")],
							["floating", J("opt.navVariant.floating")],
							["floating-square", J("opt.navVariant.floatingSquare")],
							["floating-tab", J("opt.navVariant.floatingTab")],
							["side-left", J("opt.navVariant.sideLeft")],
							["side-right", J("opt.navVariant.sideRight")]
						]);
						Y(C, {
							get value() {
								return R(e);
							},
							get options() {
								return R(t);
							},
							onchange: (e) => eo(e)
						});
					}
					O(x);
					var w = I(x, 2), ee = (e) => {
						var t = Ku(), n = F(t), r = P(n);
						G(r);
						var i = I(r);
						O(n);
						var a = I(n, 2), o = P(a);
						G(o);
						var s = I(o);
						O(a), L((e, t, c, l) => {
							q(n, "title", e), xi(r, R(D).nav.style?.glow === !0), H(i, ` ${t ?? ""}`), q(a, "title", c), xi(o, R(D).nav.style?.topGap !== !1), H(s, ` ${l ?? ""}`);
						}, [
							() => J("tip.nav.glow"),
							() => J("lbl.navGlow"),
							() => J("tip.nav.topGap"),
							() => J("lbl.navTopGap")
						]), z("change", r, (e) => to(e.target.checked)), z("change", o, (e) => no(e.target.checked)), V(e, t);
					};
					U(w, (e) => {
						R(za) && e(ee);
					});
					var te = I(w, 2), ne = (e) => {
						var t = yl(), n = P(t);
						G(n);
						var r = I(n);
						O(t), L((e, i) => {
							q(t, "title", e), xi(n, R(D).nav.overlay === !0), H(r, ` ${i ?? ""}`);
						}, [() => J("tip.nav.overlay"), () => J("lbl.navOverlay")]), z("change", n, (e) => Oi("nav", () => {
							e.target.checked ? R(D).nav.overlay = !0 : delete R(D).nav.overlay;
						})), V(e, t);
					};
					U(te, (e) => {
						!R(za) && !R(Ra) && e(ne);
					});
					var re = I(te, 2), ie = (e) => {
						var t = cl(), n = P(t), r = I(n);
						{
							let e = /* @__PURE__ */ A(() => R(D).nav.style?.sideAlign ?? "left"), t = /* @__PURE__ */ A(() => [
								["left", J("common.left")],
								["center", J("common.center")],
								["right", J("common.right")]
							]);
							Y(r, {
								get value() {
									return R(e);
								},
								get options() {
									return R(t);
								},
								onchange: (e) => La("sideAlign", e === "left" ? void 0 : e)
							});
						}
						O(t), L((e, r) => {
							q(t, "title", e), H(n, `${r ?? ""} `);
						}, [() => J("tip.nav.sideAlign"), () => J("lbl.textAlign")]), V(e, t);
					};
					U(re, (e) => {
						R(Ra) && e(ie);
					});
					var ae = I(re, 2), oe = P(ae);
					G(oe);
					var se = I(oe);
					O(ae);
					var ce = I(ae, 2), le = P(ce), ue = I(le);
					{
						let e = /* @__PURE__ */ A(() => R(D).nav.style?.size ?? "md"), t = /* @__PURE__ */ A(() => [
							["sm", J("opt.size.sm")],
							["md", J("opt.size.md")],
							["lg", J("opt.size.lg")],
							["xl", J("opt.size.xl")]
						]);
						Y(ue, {
							get value() {
								return R(e);
							},
							get options() {
								return R(t);
							},
							onchange: (e) => La("size", e === "md" ? void 0 : e)
						});
					}
					O(ce);
					var de = I(ce, 2), fe = P(de), pe = I(fe), me = (e) => {
						{
							let t = /* @__PURE__ */ A(() => R(D).nav.style?.sidePlacement ?? "top"), n = /* @__PURE__ */ A(() => [
								["top", J("opt.place.top")],
								["middle", J("opt.place.middle")],
								["bottom", J("opt.place.bottom")]
							]);
							Y(e, {
								get value() {
									return R(t);
								},
								get options() {
									return R(n);
								},
								onchange: (e) => La("sidePlacement", e === "top" ? void 0 : e)
							});
						}
					}, he = (e) => {
						{
							let t = /* @__PURE__ */ A(() => R(D).nav.layout ?? "right"), n = /* @__PURE__ */ A(() => [
								["right", J("common.right")],
								["center", J("common.center")],
								["left", J("opt.layout.leftAfterLogo")]
							]);
							Y(e, {
								get value() {
									return R(t);
								},
								get options() {
									return R(n);
								},
								onchange: (e) => Ia(e)
							});
						}
					};
					U(pe, (e) => {
						R(Ra) ? e(me) : e(he, -1);
					}), O(de);
					var ge = I(de, 2), _e = (e) => {
						var t = qu(), n = F(t), r = P(n);
						G(r);
						var i = I(r);
						O(n);
						var a = I(n, 2), o = (e) => {
							var t = cl(), n = P(t), r = I(n);
							{
								let e = /* @__PURE__ */ A(() => R(D).nav.scroll ?? "none"), t = /* @__PURE__ */ A(() => [
									["none", J("opt.scroll.none")],
									["shrink", J("opt.scroll.shrink")],
									["hide", J("opt.scroll.hide")]
								]);
								Y(r, {
									get value() {
										return R(e);
									},
									get options() {
										return R(t);
									},
									onchange: (e) => Oi("nav", () => {
										e === "none" ? delete R(D).nav.scroll : R(D).nav.scroll = e;
									})
								});
							}
							O(t), L((e, r) => {
								q(t, "title", e), H(n, `${r ?? ""} `);
							}, [() => J("tip.nav.scroll"), () => J("lbl.navScroll")]), V(e, t);
						};
						U(a, (e) => {
							R(D).nav.sticky !== !1 && e(o);
						}), L((e, t) => {
							q(n, "title", e), xi(r, R(D).nav.sticky !== !1), H(i, ` ${t ?? ""}`);
						}, [() => J("tip.nav.sticky"), () => J("lbl.navSticky")]), z("change", r, (e) => Oi("nav", () => {
							R(D).nav.sticky = e.target.checked;
						})), V(e, t);
					};
					U(ge, (e) => {
						R(Ra) || e(_e);
					});
					var ve = I(ge, 2), ye = P(ve);
					G(ye);
					var be = I(ye);
					O(ve);
					var xe = I(ve, 2), Se = (e) => {
						var t = cl(), n = P(t), r = I(n);
						{
							let e = /* @__PURE__ */ A(() => R(D).nav.cart?.href ?? ""), t = /* @__PURE__ */ A(() => [["", J("common.none")], ...R(D).pages.map((e) => [e.path, e.title])]);
							Y(r, {
								get value() {
									return R(e);
								},
								get options() {
									return R(t);
								},
								onchange: (e) => Oi("nav", () => {
									e ? R(D).nav.cart.href = e : delete R(D).nav.cart.href;
								})
							});
						}
						O(t), L((e, r) => {
							q(t, "title", e), H(n, `${r ?? ""} `);
						}, [() => J("tip.handlekurv.checkout"), () => J("lbl.checkoutPage")]), V(e, t);
					};
					U(xe, (e) => {
						R(D).nav.cart?.show && e(Se);
					});
					var Ce = I(xe, 2), we = P(Ce), Te = I(we);
					{
						let e = /* @__PURE__ */ A(() => R(D).nav.style?.hover ?? "standard"), t = /* @__PURE__ */ A(() => [
							["standard", J("opt.hover.standard")],
							["underline", J("opt.hover.underline")],
							["pill", J("opt.hover.pill")],
							["lift-plain", J("opt.hover.liftPlain")],
							["lift", J("opt.hover.lift")]
						]);
						Y(Te, {
							get value() {
								return R(e);
							},
							get options() {
								return R(t);
							},
							onchange: (e) => ro(e)
						});
					}
					O(Ce);
					var Ee = I(Ce, 2), De = (e) => {
						var t = nl(), n = F(t), r = P(n), i = I(r), a = P(i);
						O(i), O(n);
						var o = I(n, 2);
						G(o), L((e, t, i) => {
							q(n, "title", e), H(r, `${t ?? ""} `), H(a, `${i ?? ""}%`), K(o, R(D).nav.style?.hoverGlow ?? .6);
						}, [
							() => J("tip.nav.hoverGlow"),
							() => J("lbl.glowStrength"),
							() => Math.round((R(D).nav.style?.hoverGlow ?? .6) * 100)
						]), z("input", o, (e) => La("hoverGlow", Number(e.target.value))), V(e, t);
					};
					U(Ee, (e) => {
						R(D).nav.style?.hover === "lift" && e(De);
					});
					var T = I(Ee, 2), Oe = (e) => {
						var t = cl(), n = P(t), r = I(n);
						{
							let e = /* @__PURE__ */ A(() => R(D).nav.style?.hoverColor ?? "accent"), t = /* @__PURE__ */ A(ur);
							ca(r, {
								get value() {
									return R(e);
								},
								get tokens() {
									return R(t);
								},
								get label() {
									return R(Ua)[1];
								},
								onchange: (e) => La("hoverColor", e)
							});
						}
						O(t), L(() => {
							q(t, "title", R(Ua)[1]), H(n, `${R(Ua)[0] ?? ""} `);
						}), V(e, t);
					};
					U(T, (e) => {
						R(Ua) && e(Oe);
					});
					var E = I(T, 2), ke = P(E), Ae = I(ke);
					{
						let e = /* @__PURE__ */ A(() => R(D).nav.style?.hoverTextColor ?? "accent"), t = /* @__PURE__ */ A(ur), n = /* @__PURE__ */ A(() => J("tip.nav.hoverTextColorPick"));
						ca(Ae, {
							get value() {
								return R(e);
							},
							get tokens() {
								return R(t);
							},
							get label() {
								return R(n);
							},
							onchange: (e) => La("hoverTextColor", e)
						});
					}
					O(E);
					var je = I(E, 2), Me = P(je), Ne = I(Me);
					{
						let e = /* @__PURE__ */ A(() => R(D).nav.style?.textColor ?? "text"), t = /* @__PURE__ */ A(ur), n = /* @__PURE__ */ A(() => J("tip.nav.textColorPick"));
						ca(Ne, {
							get value() {
								return R(e);
							},
							get tokens() {
								return R(t);
							},
							get label() {
								return R(n);
							},
							onchange: (e) => La("textColor", e)
						});
					}
					O(je);
					var Pe = I(je, 4), Fe = P(Pe, !0);
					O(Pe);
					var Ie = I(Pe, 2);
					n(Ie, () => ar, () => R(D).nav?.style?.background?.layers ?? []), O(b), O(_);
					var Le = I(_, 2), Re = P(Le), ze = P(Re, !0);
					O(Re);
					var Be = I(Re, 2), Ve = P(Be), He = P(Ve), Ue = I(He);
					{
						let e = /* @__PURE__ */ A(() => R(D).nav.style?.subStyle ?? "card"), t = /* @__PURE__ */ A(() => R(Ra) ? [
							["card", J("common.standard")],
							["pills", J("opt.sub.pills")],
							["lines", J("opt.sub.lines")]
						] : [
							["card", J("opt.sub.card")],
							["flat", J("opt.sub.flat")],
							["pills", J("opt.sub.pills")],
							["lines", J("opt.sub.lines")],
							["flyout", J("opt.sub.flyout")]
						]);
						Y(Ue, {
							get value() {
								return R(e);
							},
							get options() {
								return R(t);
							},
							onchange: (e) => La("subStyle", e === "card" ? void 0 : e)
						});
					}
					O(Ve);
					var We = I(Ve, 2), Ge = (e) => {
						var t = cl(), n = P(t), r = I(n);
						{
							let e = /* @__PURE__ */ A(() => R(D).nav.style?.subPillColor ?? "surface"), t = /* @__PURE__ */ A(ur), n = /* @__PURE__ */ A(() => J("tip.nav.subPillColorPick"));
							ca(r, {
								get value() {
									return R(e);
								},
								get tokens() {
									return R(t);
								},
								get label() {
									return R(n);
								},
								onchange: (e) => La("subPillColor", e)
							});
						}
						O(t), L((e, r) => {
							q(t, "title", e), H(n, `${r ?? ""} `);
						}, [() => J("tip.nav.subPillColor"), () => J("lbl.subPillColor")]), V(e, t);
					};
					U(We, (e) => {
						R(D).nav.style?.subStyle === "pills" && e(Ge);
					});
					var Ke = I(We, 2), qe = P(Ke), Je = I(qe);
					G(Je), O(Ke), O(Be), O(Le);
					var Ye = I(Le, 2), Xe = P(Ye), Ze = P(Xe, !0);
					O(Xe);
					var Qe = I(Xe, 2), $e = P(Qe);
					qr($e, 17, () => R(D).nav.items, Ur, (e, t, n) => {
						var r = Ju(), i = F(r), a = P(i);
						G(a);
						var o = I(a, 2), s = P(o);
						W(s, () => c.plus, !0), O(s);
						var l = I(s, 2);
						l.disabled = n === 0, W(l, () => c.up, !0), O(l);
						var u = I(l, 2);
						W(u, () => c.down, !0), O(u);
						var d = I(u, 2);
						W(d, () => c.cross, !0), O(d), O(o);
						var f = I(o, 2), p = P(f);
						{
							let e = /* @__PURE__ */ A(() => R(t).page ?? (R(t).href == null ? "__none" : "__href")), r = /* @__PURE__ */ A(() => J("tip.linkTarget")), i = /* @__PURE__ */ A(() => [
								...R(D).pages.map((e) => [e.id, e.title]),
								["__href", J("opt.linkHref")],
								...R(t).children ? [["__none", J("opt.noLink")]] : []
							]);
							Y(p, {
								get value() {
									return R(e);
								},
								get title() {
									return R(r);
								},
								get options() {
									return R(i);
								},
								onchange: (e) => Pc(n, e)
							});
						}
						O(f);
						var m = I(f, 2), h = (e) => {
							var r = ol();
							G(r), L((e, n) => {
								K(r, R(t).href), q(r, "placeholder", e), q(r, "title", n);
							}, [() => J("ph.hrefAnchor"), () => J("tip.hrefAnchor")]), z("change", r, (e) => Lc(n, e.target.value)), V(e, r);
						};
						U(m, (e) => {
							!R(t).page && R(t).href != null && e(h);
						}), O(i), qr(I(i, 2), 17, () => R(t).children ?? [], Ur, (e, r, i) => {
							var a = sl(), o = P(a);
							G(o);
							var s = I(o, 2), l = P(s);
							l.disabled = i === 0, W(l, () => c.up, !0), O(l);
							var u = I(l, 2);
							W(u, () => c.down, !0), O(u);
							var d = I(u, 2);
							W(d, () => c.cross, !0), O(d), O(s);
							var f = I(s, 2), p = P(f);
							{
								let e = /* @__PURE__ */ A(() => R(r).page ?? "__href"), t = /* @__PURE__ */ A(() => J("tip.linkTarget")), a = /* @__PURE__ */ A(() => [...R(D).pages.map((e) => [e.id, e.title]), ["__href", J("opt.linkHref")]]);
								Y(p, {
									get value() {
										return R(e);
									},
									get title() {
										return R(t);
									},
									get options() {
										return R(a);
									},
									onchange: (e) => xf(n, i, e)
								});
							}
							O(f);
							var m = I(f, 2), h = (e) => {
								var t = ol();
								G(t), L((e, n) => {
									K(t, R(r).href ?? ""), q(t, "placeholder", e), q(t, "title", n);
								}, [() => J("ph.hrefAnchor"), () => J("tip.hrefAnchor")]), z("change", t, (e) => Sf(n, i, e.target.value)), V(e, t);
							};
							U(m, (e) => {
								R(r).page || e(h);
							}), O(a), L((e, n) => {
								K(o, R(r).label), q(o, "title", e), u.disabled = i === R(t).children.length - 1, q(d, "title", n);
							}, [() => J("tip.nav.childLabel"), () => J("tip.nav.removeChild")]), z("input", o, (e) => bf(n, i, e.target.value)), z("click", l, () => Cf(n, i, -1)), z("click", u, () => Cf(n, i, 1)), z("click", d, () => wf(n, i)), V(e, a);
						}), L((e, r, i) => {
							K(a, R(t).label), q(a, "title", e), q(s, "title", r), u.disabled = n === R(D).nav.items.length - 1, q(d, "title", i);
						}, [
							() => J("tip.nav.itemLabel"),
							() => J("tip.nav.addChild"),
							() => J("tip.nav.removeItem")
						]), z("input", a, (e) => Nc(n, e.target.value)), z("click", s, () => yf(n)), z("click", l, () => Rc(n, -1)), z("click", u, () => Rc(n, 1)), z("click", d, () => zc(n)), V(e, r);
					});
					var et = I($e, 2), tt = P(et, !0);
					O(et), O(Qe), O(Ye), O(t), L((e, t, n, r, o, s, c, u, d, f, p, m, h, g, _, v, b, C, w, ee, te, ne, re, ie) => {
						q(i, "title", e), H(a, t), H(l, `${n ?? ""} `), H(y, r), q(x, "title", o), H(S, `${s ?? ""} `), q(ae, "title", c), xi(oe, R(D).nav.style?.blur !== !1), H(se, ` ${u ?? ""}`), H(le, `${d ?? ""} `), H(fe, `${f ?? ""} `), q(ve, "title", p), xi(ye, R(D).nav.cart?.show === !0), H(be, ` ${m ?? ""}`), H(we, `${h ?? ""} `), q(E, "title", g), H(ke, `${_ ?? ""} `), H(Me, `${v ?? ""} `), H(Fe, b), H(ze, C), H(He, `${w ?? ""} `), q(Ke, "title", ee), H(qe, `${te ?? ""} `), K(Je, R(D).nav.style?.subColumns ?? 1), q(Xe, "title", ne), H(Ze, re), H(tt, ie);
					}, [
						() => J("hint.nav.logoHome"),
						() => J("group.logo"),
						() => J("common.type"),
						() => J("group.appearance"),
						() => J("tip.nav.variant"),
						() => J("lbl.navVariant"),
						() => J("tip.nav.blur"),
						() => J("lbl.navBlur"),
						() => J("lbl.size"),
						() => J("lbl.navPlacement"),
						() => J("tip.nav.cart"),
						() => J("lbl.navCart"),
						() => J("lbl.navHover"),
						() => J("tip.nav.hoverTextColor"),
						() => J("lbl.hoverTextColor"),
						() => J("lbl.textColor"),
						() => J("lbl.background"),
						() => J("group.submenu"),
						() => J("lbl.design"),
						() => J("tip.nav.subColumns"),
						() => J("lbl.columns"),
						() => J("hint.nav.submenu"),
						() => J("group.menuItems"),
						() => J("ui.addMenuItem")
					]), z("change", oe, (e) => La("blur", e.target.checked)), z("change", ye, (e) => Oi("nav", () => {
						e.target.checked ? R(D).nav.cart = {
							...R(D).nav.cart ?? {},
							show: !0
						} : delete R(D).nav.cart;
					})), z("change", Je, (e) => La("subColumns", Number(e.target.value) > 1 ? Number(e.target.value) : void 0)), z("click", et, vf), V(e, t);
				}, d = (e) => {
					var t = ed(), n = P(t), r = P(n), i = I(r);
					G(i), O(n);
					var a = I(n, 2), o = P(a), s = I(o);
					G(s), O(a);
					var l = I(a, 2), u = P(l), d = I(u);
					{
						let e = /* @__PURE__ */ A(Ma), t = /* @__PURE__ */ A(Na);
						Y(d, {
							get value() {
								return R(e);
							},
							get options() {
								return R(t);
							},
							onchange: (e) => Pa(e)
						});
					}
					O(l);
					var f = I(l, 4), p = P(f, !0);
					O(f);
					var m = I(f, 2), h = P(m);
					qr(h, 17, () => R(Ta), (e) => e.screen, (e, t) => {
						var n = Xu(), r = P(n), i = P(r, !0);
						O(r);
						var a = I(r, 2);
						let o;
						var s = P(a);
						O(a);
						var c = I(a, 2), l = P(c, !0);
						O(c), O(n), L(() => {
							H(i, R(t).screen), o = mi(a, 1, "cw-bar svelte-1n46o8q", null, o, { fluid: !R(t).bound }), gi(s, `width:${R(t).pct ?? ""}%`), H(l, R(t).bound ? `${R(t).margin}` : "-");
						}), V(e, n);
					});
					var g = I(h, 2), _ = P(g), v = P(_, !0);
					O(_);
					var y = I(_, 2), b = P(y, !0);
					O(y), O(g);
					var x = I(g, 2), S = (e) => {
						var t = Zu(), n = P(t, !0);
						O(t), L((e) => H(n, e), [() => J("lbl.bindsFrom", { n: R(me) })]), V(e, t);
					};
					U(x, (e) => {
						R(da) !== "full" && e(S);
					}), O(m);
					var C = I(m, 2);
					qr(C, 21, () => qa, (e) => e.id, (e, t) => {
						var n = Au();
						let r;
						var i = P(n, !0);
						O(n), L((e) => {
							r = mi(n, 1, "svelte-1n46o8q", null, r, { on: R(ha) === R(t).id }), H(i, e);
						}, [() => J(`lbl.width.${R(t).id}`)]), z("click", n, () => Da(R(t).width)), V(e, n);
					}), O(C);
					var w = I(C, 2), ee = (e) => {
						var t = Qu(), n = P(t), r = P(n, !0);
						O(n);
						var i = I(n, 2);
						G(i);
						var a = I(i, 2), o = P(a);
						O(a), O(t), L((e, n) => {
							q(t, "title", e), H(r, n), q(i, "min", 960), q(i, "max", Ga), q(i, "step", 20), K(i, R(wa)), H(o, `${R(wa) ?? ""} px`);
						}, [() => J("tip.site.contentWidthFree"), () => J("lbl.widthFree")]), z("input", i, (e) => Da(e.target.valueAsNumber)), V(e, t);
					};
					U(w, (e) => {
						R(da) !== "full" && e(ee);
					});
					var te = I(w, 2), ne = P(te, !0);
					O(te);
					var re = I(te, 2);
					qr(re, 21, () => Ka, (e) => e.id, (e, t) => {
						var n = Au();
						let r;
						var i = P(n, !0);
						O(n), L((e) => {
							r = mi(n, 1, "svelte-1n46o8q", null, r, { on: R(Sa) === R(t).id }), H(i, e);
						}, [() => J(`lbl.gutter.${R(t).id}`)]), z("click", n, () => Oa(R(t).gutter)), V(e, n);
					}), O(re);
					var ie = I(re, 2), ae = P(ie), oe = P(ae, !0);
					O(ae);
					var se = I(ae, 2), ce = P(se), le = P(ce), ue = P(le, !0);
					O(le);
					var de = I(le, 2);
					G(de);
					var fe = I(de, 2), pe = P(fe);
					O(fe), O(ce), O(se), O(ie);
					var he = I(ie, 4), ge = P(he), _e = I(ge), ve = (e) => {
						var t = zu();
						L((e) => {
							q(t, "src", R(D).site.icon), q(t, "alt", e);
						}, [() => J("lbl.siteIcon")]), V(e, t);
					};
					U(_e, (e) => {
						R(D).site.icon && e(ve);
					}), O(he);
					var ye = I(he, 2), be = P(ye), xe = P(be), Se = I(xe);
					O(be);
					var Ce = I(be, 2), we = (e) => {
						var t = $u(), n = F(t);
						W(n, () => c.pencil ?? "✎", !0), O(n);
						var r = I(n, 2);
						W(r, () => c.cross, !0), O(r), L((e, t) => {
							q(n, "title", e), q(r, "title", t);
						}, [() => J("tip.site.editIcon"), () => J("tip.site.removeIcon")]), z("click", n, () => N(ia, R(D).site.icon, !0)), z("click", r, sa), V(e, t);
					};
					U(Ce, (e) => {
						R(D).site.icon && e(we);
					}), O(ye), O(t), L((e, t, c, d, m, h, g, _, y, x, S, C, w, ee, re, ae, se, le, fe, me) => {
						q(n, "title", e), H(r, `${t ?? ""} `), K(i, R(D).site.title ?? ""), q(i, "placeholder", c), q(a, "title", d), H(o, `${m ?? ""} `), K(s, R(D).site.description ?? ""), q(s, "placeholder", h), q(l, "title", g), H(u, `${_ ?? ""} `), q(f, "title", y), H(p, x), H(v, S), H(b, C), q(te, "title", w), H(ne, ee), ie.open = R(Sa) === null || R(Ca), H(oe, re), q(ce, "title", ae), H(ue, se), q(de, "min", 0), q(de, "max", 12), q(de, "step", 1), K(de, R(ma)), H(pe, `${R(ma) ?? ""} vw`), H(ge, `${le ?? ""} `), q(be, "title", fe), H(xe, `${me ?? ""} `);
					}, [
						() => J("tip.site.name"),
						() => J("lbl.name"),
						() => J("ph.site.name"),
						() => J("tip.site.description"),
						() => J("lbl.description"),
						() => J("ph.site.description"),
						() => J("site.langTitle"),
						() => J("site.langLabel"),
						() => J("tip.site.contentWidth"),
						() => J("lbl.contentWidth"),
						() => J("lbl.screenPx"),
						() => J("lbl.marginPx"),
						() => J("tip.site.gutter"),
						() => J("lbl.gutter"),
						() => J("group.advanced"),
						() => J("tip.site.gutterVw"),
						() => J("lbl.gutterVw"),
						() => J("lbl.siteIcon"),
						() => J("tip.site.icon"),
						() => R(D).site.icon ? J("ui.changeIcon") : J("ui.chooseIcon")
					]), z("input", i, (e) => la(e.target.value)), z("input", s, (e) => ua(e.target.value)), Er("toggle", ie, (e) => N(Ca, e.currentTarget.open, !0)), z("input", de, (e) => Oa(e.target.valueAsNumber)), z("change", Se, aa), V(e, t);
				}, p = (e) => {
					var t = cd();
					{
						let e = (e, t = f, n = f) => {
							var r = nd(), i = P(r), a = (e) => {
								var t = td(), r = P(t, !0);
								O(t), L(() => H(r, n())), V(e, t);
							};
							U(i, (e) => {
								n() && e(a);
							});
							var o = I(i, 2), s = P(o), c = P(s, !0);
							O(s);
							var l = I(s, 2), u = P(l, !0);
							O(l);
							var d = I(l, 2), p = P(d), m = P(p, !0);
							O(p);
							var h = I(p), g = P(h, !0);
							O(h), O(d), O(o), O(r), L((e, t, n, r, i, a, s, l, d) => {
								gi(o, `--tv-bg:${e ?? ""};--tv-surface:${t ?? ""};--tv-text:${n ?? ""};--tv-accent:${r ?? ""};--tv-accent-ink:${i ?? ""}`), H(c, a), H(u, s), H(m, l), H(g, d);
							}, [
								() => Lf(t().bg, t()),
								() => Lf(t().surface, t()),
								() => Lf(t().text, t()),
								() => Lf(t().accent, t()),
								() => Lf(t()["accent-text"] ?? t().bg, t()),
								() => J("preview.heading"),
								() => J("preview.cardBody"),
								() => J("preview.button"),
								() => J("preview.link")
							]), V(e, r);
						};
						var n = P(t), r = P(n, !0);
						O(n);
						var i = I(n, 2);
						qr(i, 21, () => zf, (e) => e.id, (e, t) => {
							var n = rd();
							let r;
							var i = P(n), a = P(i), o = I(a), s = I(o), c = I(s);
							O(i);
							var l = I(i, 2), u = P(l, !0);
							O(l), O(n), L(() => {
								r = mi(n, 1, "theme-preset svelte-1n46o8q", null, r, { sel: R(Vf) === R(t).id }), q(n, "title", `${R(t).name} - ${R(t).note}`), gi(a, `background:${R(t).light.bg ?? ""}`), gi(o, `background:${R(t).light.surface ?? ""}`), gi(s, `background:${R(t).light.accent ?? ""}`), gi(c, `background:${R(t).light.text ?? ""}`), H(u, R(t).name);
							}), z("click", n, () => Bf(R(t))), V(e, n);
						}), O(i);
						var a = I(i, 2), o = P(a, !0);
						O(a);
						var s = I(a, 2), c = P(s);
						G(c);
						var l = I(c);
						O(s);
						var u = I(s, 2), d = (e) => {
							var t = id(), n = P(t), r = P(n, !0);
							O(n);
							var i = I(n, 2), a = P(i);
							let o;
							var s = P(a, !0);
							O(a);
							var c = I(a, 2);
							let l;
							var u = P(c, !0);
							O(c), O(i), O(t), L((e, t, n, i) => {
								H(r, e), q(a, "title", t), o = mi(a, 1, "svelte-1n46o8q", null, o, { on: R(pr) }), H(s, n), l = mi(c, 1, "svelte-1n46o8q", null, l, { on: !R(pr) }), H(u, i);
							}, [
								() => J("lbl.darkColors"),
								() => J("hint.theme.autoDark"),
								() => J("opt.auto"),
								() => J("opt.custom")
							]), z("click", a, () => Nf(!0)), z("click", c, () => Nf(!1)), V(e, t);
						};
						U(u, (e) => {
							R(fr) && e(d);
						});
						var p = I(u, 2), m = P(p), g = (e) => {
							var t = ad(), n = P(t, !0);
							O(t), L((e) => H(n, e), [() => J("lbl.light")]), V(e, t);
						};
						U(m, (e) => {
							R(fr) && e(g);
						});
						var _ = I(m, 2);
						let Ne;
						var v = P(_, !0);
						O(_), O(p);
						var y = I(p, 2);
						qr(y, 21, () => dr, ([e, t, n]) => e, (e, t) => {
							var n = /* @__PURE__ */ A(() => h(R(t), 3));
							let r = () => R(n)[0], i = () => R(n)[1], a = () => R(n)[2];
							var o = od(), s = P(o);
							{
								let e = /* @__PURE__ */ A(() => R(D).theme.tokens.color[r()] ?? R(D).theme.tokens.color.bg), t = /* @__PURE__ */ A(ur);
								ca(s, {
									get value() {
										return R(e);
									},
									get tokens() {
										return R(t);
									},
									get label() {
										return i();
									},
									onchange: (e) => Tf(r(), e)
								});
							}
							var c = I(s, 2), l = P(c, !0);
							O(c);
							var u = I(c, 2), d = P(u, !0);
							O(u), O(o), L((e) => {
								H(l, a()), H(d, e);
							}, [() => Lf(R(D).theme.tokens.color[r()] ?? R(D).theme.tokens.color.bg, R(hr))]), V(e, o);
						}), O(y);
						var b = I(y, 2), x = (e) => {
							var t = sd(), n = F(t), r = P(n), i = P(r, !0);
							O(r);
							var a = I(r, 2);
							let o;
							var s = P(a, !0);
							O(a), O(n);
							var c = I(n, 2);
							let l;
							qr(c, 21, () => dr, ([e, t, n]) => e, (e, t) => {
								var n = /* @__PURE__ */ A(() => h(R(t), 3));
								let r = () => R(n)[0], i = () => R(n)[1], a = () => R(n)[2];
								var o = od(), s = P(o);
								{
									let e = /* @__PURE__ */ A(() => R(D).theme.alt.tokens.color[r()] ?? R(gr)[r()] ?? R(D).theme.tokens.color.bg), t = /* @__PURE__ */ A(ur), n = /* @__PURE__ */ A(() => J("theme.darkColorLabel", { name: i() }));
									ca(s, {
										get value() {
											return R(e);
										},
										get tokens() {
											return R(t);
										},
										get label() {
											return R(n);
										},
										onchange: (e) => Af(r(), e)
									});
								}
								var c = I(s, 2), l = P(c, !0);
								O(c);
								var u = I(c, 2), d = P(u, !0);
								O(u), O(o), L((e) => {
									H(l, a()), H(d, e);
								}, [() => Lf(R(D).theme.alt.tokens.color[r()] ?? R(gr)[r()], R(gr))]), V(e, o);
							}), O(c), L((e, t, n) => {
								H(i, e), o = mi(a, 1, "chip svelte-1n46o8q", null, o, { accent: R(mr) === "dark" }), q(a, "title", t), H(s, n), l = mi(c, 1, "palcells svelte-1n46o8q", null, l, { autopal: R(pr) });
							}, [
								() => J("lbl.dark"),
								() => J("tip.theme.darkDefault"),
								() => J("common.standard")
							]), z("click", a, () => jf("dark")), V(e, t);
						};
						U(b, (e) => {
							R(fr) && e(x);
						});
						var S = I(b, 2), C = P(S);
						{
							let t = /* @__PURE__ */ A(() => R(fr) ? J("lbl.light") : "");
							e(C, () => R(hr), () => R(t));
						}
						var w = I(C, 2), ee = (t) => {
							{
								let n = /* @__PURE__ */ A(() => J("lbl.dark"));
								e(t, () => R(gr), () => R(n));
							}
						};
						U(w, (e) => {
							R(fr) && e(ee);
						}), O(S);
						var te = I(S, 2), ne = P(te), re = P(ne, !0);
						O(ne);
						var ie = I(ne, 2), ae = P(ie), oe = P(ae), se = I(oe);
						{
							let e = /* @__PURE__ */ A(() => Pf("heading"));
							Y(se, {
								get value() {
									return R(D).theme.tokens.font.heading;
								},
								get options() {
									return R(e);
								},
								onchange: (e) => Ef("heading", e)
							});
						}
						O(ae);
						var ce = I(ae, 2), le = P(ce), ue = I(le);
						{
							let e = /* @__PURE__ */ A(() => Pf("body"));
							Y(ue, {
								get value() {
									return R(D).theme.tokens.font.body;
								},
								get options() {
									return R(e);
								},
								onchange: (e) => Ef("body", e)
							});
						}
						O(ce);
						var de = I(ce, 2), fe = P(de), pe = P(fe, !0);
						O(fe);
						var me = I(fe, 2), he = P(me, !0);
						O(me), O(de), O(ie), O(te);
						var ge = I(te, 2), _e = P(ge), ve = P(_e, !0);
						O(_e);
						var ye = I(_e, 2), be = P(ye), xe = P(be), Se = P(xe, !0);
						O(xe);
						var Ce = I(xe, 2), we = P(Ce, !0);
						O(Ce), O(be);
						var Te = I(be, 2), Ee = P(Te, !0), De = I(Ee), T = P(De, !0);
						O(De), O(Te);
						var Oe = I(Te, 2);
						G(Oe);
						var E = I(Oe, 2), ke = P(E, !0), Ae = I(ke), je = P(Ae, !0);
						O(Ae), O(E);
						var Me = I(E, 2);
						G(Me), O(ye), O(ge), O(t), L((e, t, n, i, a, u, d, f, p, m, h, g, y, b, x, S, C, w) => {
							H(r, e), H(o, t), q(s, "title", n), xi(c, R(fr)), H(l, ` ${i ?? ""}`), Ne = mi(_, 1, "chip svelte-1n46o8q", null, Ne, { accent: R(mr) === "light" }), q(_, "title", a), H(v, u), H(re, d), H(oe, `${f ?? ""} `), H(le, `${p ?? ""} `), gi(fe, `font-family:${R(D).theme.tokens.font.heading ?? ""}`), H(pe, m), gi(me, `font-family:${R(D).theme.tokens.font.body ?? ""}`), H(he, h), H(ve, g), gi(be, `--r-sm:${R(D).theme.tokens.radius.sm ?? ""};--r-md:${R(D).theme.tokens.radius.md ?? ""}`), H(Se, y), H(we, b), H(Ee, x), H(T, R(D).theme.tokens.radius.sm), K(Oe, S), H(ke, C), H(je, R(D).theme.tokens.radius.md), K(Me, w);
						}, [
							() => J("lbl.themePresets"),
							() => J("lbl.colors"),
							() => J("tip.theme.dualMode"),
							() => J("lbl.dualMode"),
							() => J("tip.theme.defaultScheme"),
							() => J("common.standard"),
							() => J("group.typography"),
							() => J("lbl.headings"),
							() => J("lbl.bodyText"),
							() => J("preview.heading"),
							() => J("preview.bodySample"),
							() => J("group.shape"),
							() => J("preview.button"),
							() => J("preview.card"),
							() => J("lbl.smallCorners"),
							() => Ff(R(D).theme.tokens.radius.sm),
							() => J("lbl.largeCorners"),
							() => Ff(R(D).theme.tokens.radius.md)
						]), z("change", c, (e) => Mf(e.target.checked)), z("click", _, () => jf("light")), z("input", Oe, (e) => If("sm", Number(e.target.value))), z("input", Me, (e) => If("md", Number(e.target.value)));
					}
					V(e, t);
				}, m = (e) => {
					var t = pd();
					let n;
					var r = P(t);
					G(r);
					var i = I(r, 2), a = (e) => {
						var t = Ir();
						qr(F(t), 17, () => Ds(dp(), R(up), (e) => e.label), (e) => e.label, (e, t) => {
							var n = Ir(), r = F(n), i = (e) => {
								var n = ld(), r = P(n), i = I(r);
								O(n), L((e) => {
									q(n, "title", e), H(r, `${R(t).label ?? ""} `);
								}, [() => J("tip.webpAuto")]), z("change", i, mp), V(e, n);
							}, a = (e) => {
								var n = ud(), r = P(n), i = I(r);
								O(n), L((e) => {
									q(n, "title", e), H(r, `${R(t).label ?? ""} `);
								}, [() => J("tip.blocks.galleryImages")]), z("change", i, vp), V(e, n);
							}, o = (e) => {
								var n = xl(), r = P(n, !0);
								O(n), L(() => H(r, R(t).label)), z("click", n, () => fp(R(t))), V(e, n);
							};
							U(r, (e) => {
								R(t).act === "image" ? e(i) : R(t).act === "galleryImages" ? e(a, 1) : e(o, -1);
							}), V(e, n);
						}, (e) => {
							var t = dl(), n = P(t, !0);
							O(t), L((e) => H(n, e), [() => J("canvas.searchEmpty")]), V(e, t);
						}), V(e, t);
					}, o = /* @__PURE__ */ A(() => R(up).trim()), s = (e) => {
						var t = fd(), n = F(t), r = P(n), i = P(r, !0);
						O(r);
						var a = I(r, 2), o = P(a), s = P(o, !0);
						O(o);
						var c = I(o, 2), l = P(c, !0);
						O(c), O(a), O(n);
						var u = I(n, 2), d = P(u, !0);
						O(u);
						var f = I(u, 2), p = P(f), m = I(p);
						O(f);
						var h = I(f, 2), g = P(h, !0);
						O(h);
						var _ = I(h, 2), v = P(_, !0);
						O(_);
						var y = I(_, 2), b = P(y, !0);
						O(y);
						var x = I(y, 2), S = P(x, !0);
						O(x);
						var C = I(x, 2), w = P(C, !0);
						O(C);
						var ee = I(C, 2), te = P(ee, !0);
						O(ee);
						var ne = I(ee, 2), re = P(ne, !0);
						O(ne);
						var ie = I(ne, 2), ae = P(ie, !0);
						O(ie);
						var oe = I(ie, 2), se = P(oe, !0);
						O(oe);
						var ce = I(oe, 2), le = P(ce, !0);
						O(ce);
						var ue = I(ce, 2), de = P(ue, !0);
						O(ue);
						var fe = I(ue, 2), pe = P(fe, !0);
						O(fe);
						var me = I(fe, 2), he = P(me, !0);
						O(me);
						var ge = I(me, 2), _e = P(ge, !0);
						O(ge);
						var ve = I(ge, 2), ye = P(ve), be = P(ye, !0);
						O(ye);
						var xe = I(ye, 2), Se = P(xe), Ce = P(Se, !0);
						O(Se);
						var we = I(Se, 2), Te = P(we), Ee = I(Te);
						O(we), O(xe), O(ve);
						var De = I(ve, 2), T = P(De), Oe = P(T, !0);
						O(T);
						var D = I(T, 2), ke = P(D), Ae = P(ke, !0);
						O(ke);
						var je = I(ke, 2), Me = P(je, !0);
						O(je);
						var Ne = I(je, 2), Pe = P(Ne, !0);
						O(Ne);
						var Fe = I(Ne, 2), Ie = P(Fe, !0);
						O(Fe);
						var Le = I(Fe, 2), Re = P(Le, !0);
						O(Le), O(D), O(De);
						var ze = I(De, 2), Be = (e) => {
							let t = /* @__PURE__ */ A(() => R(Co).filter((e) => bo[e]?.data?.mal?.kind === "blocks"));
							var n = dd(), r = P(n), i = P(r, !0);
							O(r);
							var a = I(r, 2);
							qr(a, 20, () => R(t), (e) => e, (e, t) => {
								var n = xl(), r = P(n, !0);
								O(n), L((e) => {
									q(n, "title", e), H(r, bo[t].data.mal.name);
								}, [() => J("canvas.insertGroup")]), z("click", n, () => E?.sendInsertTemplate(t)), V(e, n);
							}), O(a), O(n), L((e) => H(i, e), [() => J("canvas.tabMyTemplates")]), V(e, n);
						}, Ve = /* @__PURE__ */ A(() => R(Co).some((e) => bo[e]?.data?.mal?.kind === "blocks"));
						U(ze, (e) => {
							R(Ve) && e(Be);
						});
						var He = I(ze, 2), Ue = (e) => {
							var t = dd(), n = P(t), r = P(n, !0);
							O(n);
							var i = I(n, 2);
							qr(i, 21, () => R(cp), (e) => e.type, (e, t) => {
								var n = Ir(), r = F(n), i = (e) => {
									var n = dd(), r = P(n), i = P(r, !0);
									O(r);
									var a = I(r, 2);
									qr(a, 21, () => R(t).variants, (e) => e.label, (e, n) => {
										var r = xl(), i = P(r, !0);
										O(r), L((e) => {
											q(r, "title", e), H(i, R(n).label);
										}, [() => J("tip.blocks.fromPlugin", { plugin: R(t).plugin })]), z("click", r, () => lp(R(t), R(n).props)), V(e, r);
									}), O(a), O(n), L(() => H(i, R(t).label)), V(e, n);
								}, a = (e) => {
									var n = xl(), r = P(n, !0);
									O(n), L((e) => {
										q(n, "title", e), H(r, R(t).label);
									}, [() => J("tip.blocks.fromPlugin", { plugin: R(t).plugin })]), z("click", n, () => lp(R(t))), V(e, n);
								};
								U(r, (e) => {
									R(t).variants?.length ? e(i) : e(a, -1);
								}), V(e, n);
							}), O(i), O(t), L((e) => H(r, e), [() => J("panel.plugins")]), V(e, t);
						};
						U(He, (e) => {
							R(cp).length && e(Ue);
						}), L((e, t, n, r, a, o, u, m, ve, ye, xe, Ee, De, T, E, D, ke, je, Ne, Fe, O, Le, ze, Be, Ve, He, Ue, We, Ge, Ke, qe, Je, Ye, Xe, Ze, Qe, $e, et, tt, nt, rt, it, at, ot, st, ct) => {
							H(i, e), H(s, t), q(c, "title", n), H(l, r), H(d, a), q(f, "title", o), H(p, `${u ?? ""} `), q(h, "title", m), H(g, ve), q(_, "title", ye), H(v, xe), q(y, "title", Ee), H(b, De), q(x, "title", T), H(S, E), q(C, "title", D), H(w, ke), q(ee, "title", je), H(te, Ne), q(ne, "title", Fe), H(re, O), q(ie, "title", Le), H(ae, ze), q(oe, "title", Be), H(se, Ve), q(ce, "title", He), H(le, Ue), q(ue, "title", We), H(de, Ge), q(fe, "title", Ke), H(pe, qe), q(me, "title", Je), H(he, Ye), q(ge, "title", Xe), H(_e, Ze), H(be, Qe), q(Se, "title", $e), H(Ce, et), q(we, "title", tt), H(Te, `${nt ?? ""} `), H(Oe, rt), H(Ae, it), H(Me, at), H(Pe, ot), H(Ie, st), H(Re, ct);
						}, [
							() => J("blocks.text"),
							() => J("blocks.text"),
							() => J("tip.blocks.textBox"),
							() => J("ui.textBox"),
							() => J("blocks.button"),
							() => J("tip.webpAuto"),
							() => J("blocks.image"),
							() => J("tip.blocks.video"),
							() => J("blocks.video"),
							() => J("tip.blocks.icon"),
							() => J("blocks.icon"),
							() => J("tip.blocks.samling"),
							() => J("blocks.samling"),
							() => J("tip.blocks.faq"),
							() => J("blocks.faq"),
							() => J("tip.blocks.tidslinje"),
							() => J("blocks.tidslinje"),
							() => J("tip.blocks.sitat"),
							() => J("blocks.sitat"),
							() => J("tip.blocks.statistikk"),
							() => J("blocks.statistikk"),
							() => J("tip.blocks.tabell"),
							() => J("blocks.tabell"),
							() => J("tip.blocks.deling"),
							() => J("blocks.deling"),
							() => J("tip.blocks.nedteller"),
							() => J("blocks.nedteller"),
							() => J("tip.blocks.audio"),
							() => J("blocks.audio"),
							() => J("tip.blocks.produkt"),
							() => J("blocks.produkt"),
							() => J("tip.blocks.handlekurv"),
							() => J("blocks.handlekurv"),
							() => J("tip.blocks.kasse"),
							() => J("blocks.kasse"),
							() => J("blocks.galleri"),
							() => J("tip.blocks.gallery"),
							() => J("ui.emptyGallery"),
							() => J("tip.blocks.galleryImages"),
							() => J("ui.galleryWithImages"),
							() => J("group.shapes"),
							() => J("shape.line"),
							() => J("shape.arrow"),
							() => J("shape.circle"),
							() => J("shape.rect"),
							() => J("shape.triangle")
						]), z("click", o, () => sp("text")), z("click", c, () => sp("text-box")), z("click", u, () => sp("button")), z("change", m, mp), z("click", h, () => sp("video")), z("click", _, () => sp("icon")), z("click", y, () => sp("samling")), z("click", x, () => sp("faq")), z("click", C, () => sp("tidslinje")), z("click", ee, () => sp("sitat")), z("click", ne, () => sp("statistikk")), z("click", ie, () => sp("tabell")), z("click", oe, () => sp("deling")), z("click", ce, () => sp("nedteller")), z("click", ue, () => sp("audio")), z("click", fe, () => sp("produkt")), z("click", me, () => sp("handlekurv")), z("click", ge, () => sp("kasse")), z("click", Se, () => sp("galleri")), z("change", Ee, vp), z("click", ke, () => sp("shape-line")), z("click", je, () => sp("shape-arrow")), z("click", Ne, () => sp("shape-circle")), z("click", Fe, () => sp("shape-rect")), z("click", Le, () => sp("shape-triangle")), V(e, t);
					};
					U(i, (e) => {
						R(o) ? e(a) : e(s, -1);
					}), O(t), L((e, i, a) => {
						n = mi(t, 1, "panel-body svelte-1n46o8q", null, n, { locked: R(oe) === "mobile" }), q(t, "title", e), q(r, "placeholder", i), q(r, "title", a);
					}, [
						() => R(oe) === "mobile" ? J("tip.blocks.mobileLocked") : void 0,
						() => J("canvas.searchBlocks"),
						() => J("canvas.searchBlocks")
					]), Ti(r, () => R(up), (e) => N(up, e)), V(e, t);
				}, _ = (e) => {
					var t = md(), n = P(t), r = P(n), i = I(r), a = P(i);
					O(i), O(n);
					var o = I(n, 2);
					G(o);
					var s = I(o, 2), c = P(s);
					G(c);
					var l = I(c);
					O(s), O(t), L((e, t) => {
						H(r, `${e ?? ""} `), H(a, `${R(te).size ?? ""} px`), K(o, R(te).size), xi(c, R(te).snap !== !1), H(l, ` ${t ?? ""}`);
					}, [() => J("lbl.gridSize"), () => J("lbl.gridSnap")]), z("input", o, (e) => Fr("size", Number(e.target.value))), z("change", c, (e) => Fr("snap", e.target.checked)), V(e, t);
				}, v = (e) => {
					var t = xd(), r = P(t), i = (e) => {
						var t = hd(), n = F(t), r = P(n, !0);
						O(n);
						var i = I(n, 2);
						a(i), L((e) => H(r, e), [() => J("blocks.suffix", { label: rn[R(k).type] ?? R(k).type })]), V(e, t);
					}, o = (e) => {
						var t = bd(), r = F(t), i = P(r, !0);
						O(r);
						var a = I(r, 2), o = P(a), s = I(o);
						G(s), O(a);
						var l = I(a, 4), u = P(l);
						G(u);
						var d = I(u);
						O(l);
						var f = I(l, 2), p = (e) => {
							var t = gd(), n = F(t), r = P(n), i = I(r), a = P(i);
							O(i), O(n);
							var o = I(n, 2);
							G(o), L((e) => {
								H(r, `${e ?? ""} `), H(a, `${R(un).size ?? ""} px`), K(o, R(un).size);
							}, [() => J("lbl.gridSize")]), z("input", o, (e) => B("size", Number(e.target.value))), V(e, t);
						};
						U(f, (e) => {
							R(un) && e(p);
						});
						var m = I(f, 4), g = P(m, !0);
						O(m);
						var _ = I(m, 2);
						qr(_, 21, () => [["", "common.standard"], ...Object.entries(Fs)], ([e, t]) => e, (e, t) => {
							var n = /* @__PURE__ */ A(() => h(R(t), 2));
							let r = () => R(n)[0], i = () => R(n)[1], a = /* @__PURE__ */ A(() => xn(r()));
							var o = _d();
							let s;
							var c = P(o), l = P(c), u = I(l, 2), d = I(u, 2);
							O(c);
							var f = I(c, 2), p = P(f, !0);
							O(f), O(o), L((e, t) => {
								s = mi(o, 1, "rs-card svelte-1n46o8q", null, s, { on: R(hn) === r() }), q(o, "title", e), gi(c, `background: ${R(a).bg ?? ""}`), gi(l, `background: ${R(a).text ?? ""}`), gi(u, `background: ${R(a).surface ?? ""}`), gi(d, `background: ${R(a).accent ?? ""}`), H(p, t);
							}, [() => J("tip.props.sectionTheme"), () => J(i())]), z("click", o, () => bn(r())), V(e, o);
						}), O(_);
						var v = I(_, 2), y = P(v), b = I(y), x = P(b), S = P(x);
						O(x);
						var C = I(x, 2);
						W(C, () => c.copy, !0), O(C), O(b), O(v);
						var w = I(v, 4), ee = P(w, !0);
						O(w);
						var te = I(w, 2);
						n(te, () => R(ir), () => R(fn));
						var ne = I(te, 4), re = P(ne), ie = I(re);
						{
							let e = /* @__PURE__ */ A(() => vr(R(pn)) ? R(pn).type : "");
							Y(ie, {
								get value() {
									return R(e);
								},
								get options() {
									return yr;
								},
								onchange: (e) => Or(e || null)
							});
						}
						O(ne);
						var ae = I(ne, 2), oe = (e) => {
							var t = yd(), n = F(t), r = P(n), i = I(r);
							G(i), O(n);
							var a = I(n, 2), o = P(a), s = I(o);
							G(s), O(a);
							var c = I(a, 2), l = (e) => {
								var t = vd(), n = F(t), r = P(n), i = I(r);
								{
									let e = /* @__PURE__ */ A(() => R(pn).props.effect ?? "slide-up"), t = /* @__PURE__ */ A(() => [
										["fade-in", J("anim.fadeIn")],
										["slide-up", J("anim.slideUp")],
										["zoom-in", J("anim.zoomIn")]
									]);
									Y(i, {
										get value() {
											return R(e);
										},
										get options() {
											return R(t);
										},
										onchange: (e) => jr("effect", e)
									});
								}
								O(n);
								var a = I(n, 2), o = P(a), s = I(o);
								G(s), O(a);
								var c = I(a, 2), l = P(c), u = I(l);
								{
									let e = /* @__PURE__ */ A(() => R(pn).props.pattern ?? "sequence"), t = /* @__PURE__ */ A(() => [
										["sequence", J("opt.stagger.sequence")],
										["columns", J("opt.stagger.columns")],
										["rows", J("opt.stagger.rows")],
										["center", J("opt.stagger.center")]
									]);
									Y(u, {
										get value() {
											return R(e);
										},
										get options() {
											return R(t);
										},
										onchange: (e) => jr("pattern", e)
									});
								}
								O(c), L((e, t, i, u, d, f) => {
									q(n, "title", e), H(r, `${t ?? ""} `), q(a, "title", i), H(o, `${u ?? ""} `), K(s, R(pn).props.step ?? 90), q(c, "title", d), H(l, `${f ?? ""} `);
								}, [
									() => J("tip.props.staggerEffect"),
									() => J("lbl.staggerEffect"),
									() => J("tip.props.staggerStep"),
									() => J("lbl.stepMs"),
									() => J("tip.props.staggerPattern"),
									() => J("lbl.pattern")
								]), z("change", s, (e) => Ar("step", Number(e.target.value))), V(e, t);
							};
							U(c, (e) => {
								R(pn).type === "stagger" && e(l);
							}), L((e, t) => {
								H(r, `${e ?? ""} `), K(i, R(pn).props.duration), H(o, `${t ?? ""} `), K(s, R(pn).props.delay ?? 0);
							}, [() => J("lbl.durationMs"), () => J("lbl.delayMs")]), z("change", i, (e) => Ar("duration", Number(e.target.value))), z("change", s, (e) => Ar("delay", Number(e.target.value))), V(e, t);
						}, se = /* @__PURE__ */ A(() => vr(R(pn)));
						U(ae, (e) => {
							R(se) && e(oe);
						});
						var ce = I(ae, 2), le = P(ce), ue = I(le);
						{
							let e = /* @__PURE__ */ A(() => R(mn)?.type ?? (R(pn) && !vr(R(pn)) ? R(pn).type : ""));
							Y(ue, {
								get value() {
									return R(e);
								},
								get options() {
									return xr;
								},
								onchange: (e) => kr(e || null)
							});
						}
						O(ce), L((e, t, n, r, c, l, f, p, h, _, b, x, w, te, ie) => {
							H(i, e), q(a, "title", t), H(o, `${n ?? ""} `), K(s, R(dn)), q(s, "placeholder", r), xi(u, R(un) !== null), H(d, ` ${c ?? ""}`), q(m, "title", l), H(g, f), q(v, "title", p), H(y, `${h ?? ""} `), H(S, `#${R(ln) ?? ""}`), q(C, "title", _), H(ee, b), q(ne, "title", x), H(re, `${w ?? ""} `), q(ce, "title", te), H(le, `${ie ?? ""} `);
						}, [
							() => J("lbl.section"),
							() => J("hint.props.minHeight"),
							() => J("lbl.minHeight"),
							() => J("ph.minHeight"),
							() => J("lbl.sectionGrid"),
							() => J("tip.props.sectionTheme"),
							() => J("lbl.sectionTheme"),
							() => J("tip.props.anchor"),
							() => J("lbl.anchor"),
							() => J("tip.props.copyAnchor"),
							() => J("lbl.background"),
							() => J("tip.props.sectionAnim"),
							() => J("lbl.animIn"),
							() => J("tip.props.sectionHover"),
							() => J("lbl.onHover")
						]), z("change", s, (e) => Mr(e.target.value)), z("change", u, (e) => Pr(e.target.checked)), z("click", C, () => navigator.clipboard?.writeText(`#${R(ln)}`)), V(e, t);
					}, s = (e) => {
						var t = dl(), n = P(t, !0);
						O(t), L((e) => H(n, e), [() => J("hint.props.empty")]), V(e, t);
					};
					U(r, (e) => {
						R(k) ? e(i) : R(ln) ? e(o, 1) : e(s, -1);
					}), O(t), V(e, t);
				}, y = (e) => {
					var t = kd(), i = P(t), a = P(i);
					G(a);
					var o = I(a);
					O(i);
					var s = I(i, 2), l = (e) => {
						var t = dd(), n = P(t), r = P(n, !0);
						O(n);
						var i = I(n, 2);
						qr(i, 21, () => R(D).pages ?? [], (e) => e.id, (e, t) => {
							var n = yl(), r = P(n);
							G(r);
							var i = I(r);
							O(n), L((e, a) => {
								q(n, "title", e), xi(r, a), H(i, ` ${(R(t).title || R(t).id) ?? ""}`);
							}, [() => J("tip.footer.hideOnPage"), () => !(R(D).footer?.hideOn ?? []).includes(R(t).id)]), z("change", r, (e) => mc(R(t).id, e.target.checked)), V(e, n);
						}), O(i), O(t), L((e) => H(r, e), [() => J("group.showOnPages")]), V(e, t);
					};
					U(s, (e) => {
						R(D).footer?.show && e(l);
					});
					var u = I(s, 2), d = P(u), f = P(d, !0);
					O(d);
					var p = I(d, 2), m = P(p);
					qr(m, 21, () => tc, (e) => e.id, (e, t) => {
						var n = Sd(), r = P(n);
						W(r, () => Ic(R(t).thumb), !0), O(r);
						var i = I(r, 2), a = P(i, !0);
						O(i), O(n), L((e) => {
							q(n, "title", e), H(a, R(t).label);
						}, [() => J("tip.footer.template", { label: R(t).label })]), z("click", n, () => rc(R(t).id)), V(e, n);
					}), O(m), O(p), O(u);
					var h = I(u, 2), g = P(h), _ = P(g, !0);
					O(g);
					var v = I(g, 2), y = P(v), b = P(y), x = I(b);
					G(x), O(y);
					var S = I(y, 2), C = P(S), w = I(C);
					G(w), O(S);
					var ee = I(S, 2), te = P(ee), ne = I(te);
					{
						let e = /* @__PURE__ */ A(() => R(D).footer?.brand?.mode ?? "text"), t = /* @__PURE__ */ A(() => [
							["text", J("blocks.text")],
							["image", J("opt.brand.image")],
							["both", J("opt.brand.both")]
						]);
						Y(ne, {
							get value() {
								return R(e);
							},
							get options() {
								return R(t);
							},
							onchange: (e) => qs(e)
						});
					}
					O(ee);
					var re = I(ee, 2), ie = (e) => {
						var t = wd(), n = F(t), r = P(n), i = P(r), a = I(i);
						O(r);
						var o = I(r, 2), s = (e) => {
							var t = Wc();
							W(t, () => c.cross, !0), O(t), L((e) => q(t, "title", e), [() => J("tip.footer.removeLogo")]), z("click", t, Ys), V(e, t);
						};
						U(o, (e) => {
							R(D).footer?.brand?.logo && e(s);
						}), O(n);
						var l = I(n, 2), u = (e) => {
							var t = Cd(), n = F(t), r = P(n), i = I(r), a = P(i);
							O(i), O(n);
							var o = I(n, 2);
							G(o), L((e) => {
								H(r, `${e ?? ""} `), H(a, `${R(D).footer?.brand?.logoHeight ?? 40 ?? ""} px`), K(o, R(D).footer?.brand?.logoHeight ?? 40);
							}, [() => J("lbl.logoHeight")]), z("input", o, (e) => Xs(e.target.value)), V(e, t);
						};
						U(l, (e) => {
							R(D).footer?.brand?.logo && e(u);
						}), L((e, t) => {
							q(r, "title", e), H(i, `${t ?? ""} `);
						}, [() => J("tip.webpAutoPublish"), () => R(D).footer?.brand?.logo ? J("ui.changeLogo") : J("ui.uploadLogo")]), z("change", a, Js), V(e, t);
					};
					U(re, (e) => {
						(R(D).footer?.brand?.mode ?? "text") !== "text" && e(ie);
					}), O(v), O(h);
					var ae = I(h, 2), oe = P(ae), se = P(oe, !0);
					O(oe);
					var ce = I(oe, 2), le = P(ce);
					qr(le, 17, () => R(D).footer?.columns ?? [], Ur, (e, t, n) => {
						var r = Td(), i = F(r), a = P(i);
						G(a);
						var o = I(a, 2), s = P(o);
						W(s, () => c.plus, !0), O(s);
						var l = I(s, 2);
						l.disabled = n === 0, W(l, () => c.up, !0), O(l);
						var u = I(l, 2);
						W(u, () => c.down, !0), O(u);
						var d = I(u, 2);
						W(d, () => c.cross, !0), O(d), O(o), O(i), qr(I(i, 2), 17, () => R(t).links ?? [], Ur, (e, r, i) => {
							var a = sl(), o = P(a);
							G(o);
							var s = I(o, 2), l = P(s);
							l.disabled = i === 0, W(l, () => c.up, !0), O(l);
							var u = I(l, 2);
							W(u, () => c.down, !0), O(u);
							var d = I(u, 2);
							W(d, () => c.cross, !0), O(d), O(s);
							var f = I(s, 2), p = P(f);
							{
								let e = /* @__PURE__ */ A(() => R(r).page ?? "__href"), t = /* @__PURE__ */ A(() => J("tip.linkTarget")), a = /* @__PURE__ */ A(() => [...R(D).pages.map((e) => [e.id, e.title]), ["__href", J("opt.linkHref")]]);
								Y(p, {
									get value() {
										return R(e);
									},
									get title() {
										return R(t);
									},
									get options() {
										return R(a);
									},
									onchange: (e) => Cc(n, i, e)
								});
							}
							O(f);
							var m = I(f, 2), h = (e) => {
								var t = ol();
								G(t), L((e, n) => {
									K(t, R(r).href ?? ""), q(t, "placeholder", e), q(t, "title", n);
								}, [() => J("ph.hrefAnchor"), () => J("tip.hrefAnchor")]), z("change", t, (e) => Tc(n, i, e.target.value)), V(e, t);
							};
							U(m, (e) => {
								R(r).page || e(h);
							}), O(a), L((e, n) => {
								K(o, R(r).label), q(o, "title", e), u.disabled = i === R(t).links.length - 1, q(d, "title", n);
							}, [() => J("tip.linkLabel"), () => J("tip.removeLink")]), z("input", o, (e) => Sc(n, i, e.target.value)), z("click", l, () => xc(n, i, -1)), z("click", u, () => xc(n, i, 1)), z("click", d, () => bc(n, i)), V(e, a);
						}), L((e, r, i) => {
							K(a, R(t).title), q(a, "title", e), q(s, "title", r), u.disabled = n === R(D).footer.columns.length - 1, q(d, "title", i);
						}, [
							() => J("tip.footer.columnTitle"),
							() => J("tip.footer.addLink"),
							() => J("tip.footer.removeColumn")
						]), z("input", a, (e) => vc(n, e.target.value)), z("click", s, () => yc(n)), z("click", l, () => _c(n, -1)), z("click", u, () => _c(n, 1)), z("click", d, () => gc(n)), V(e, r);
					});
					var ue = I(le, 2), de = P(ue, !0);
					O(ue);
					var fe = I(ue, 2), pe = P(fe), me = I(pe);
					{
						let e = /* @__PURE__ */ A(() => R(D).footer?.columnsAlign ?? "left"), t = /* @__PURE__ */ A(() => [["left", J("common.left")], ["center", J("common.center")]]);
						Y(me, {
							get value() {
								return R(e);
							},
							get options() {
								return R(t);
							},
							onchange: (e) => uc(e)
						});
					}
					O(fe), O(ce), O(ae);
					var he = I(ae, 2), ge = P(he), _e = P(ge, !0);
					O(ge);
					var ve = I(ge, 2), ye = P(ve);
					qr(ye, 17, () => R(D).footer?.social ?? [], Ur, (e, t, n) => {
						var r = Ed(), i = P(r), a = P(i);
						W(a, () => ja(R(t).icon) || "", !0), O(a);
						var o = I(a, 2);
						{
							let e = /* @__PURE__ */ A(() => J("blocks.icon"));
							Y(o, {
								get value() {
									return R(t).icon;
								},
								get title() {
									return R(e);
								},
								get options() {
									return Mc;
								},
								onchange: (e) => Ac(n, e)
							});
						}
						O(i);
						var s = I(i, 2), l = P(s);
						l.disabled = n === 0, W(l, () => c.up, !0), O(l);
						var u = I(l, 2);
						W(u, () => c.down, !0), O(u);
						var d = I(u, 2);
						W(d, () => c.cross, !0), O(d), O(s);
						var f = I(s, 2);
						G(f), O(r), L((e, r) => {
							u.disabled = n === R(D).footer.social.length - 1, q(d, "title", e), K(f, R(t).url), q(f, "placeholder", r);
						}, [() => J("tip.removeLink"), () => J("ph.hrefMailto")]), z("click", l, () => Oc(n, -1)), z("click", u, () => Oc(n, 1)), z("click", d, () => Dc(n)), z("change", f, (e) => jc(n, e.target.value)), V(e, r);
					});
					var be = I(ye, 2), xe = P(be, !0);
					O(be), O(ve), O(he);
					var Se = I(he, 2), Ce = P(Se), we = P(Ce, !0);
					O(Ce);
					var Te = I(Ce, 2), Ee = P(Te), De = P(Ee);
					G(De);
					var T = I(De);
					O(Ee);
					var Oe = I(Ee, 2), E = (e) => {
						let t = /* @__PURE__ */ A(() => R(D).footer.cta);
						var n = Od(), r = F(n), i = P(r), a = I(i);
						{
							let e = /* @__PURE__ */ A(() => R(t).kind ?? "button"), n = /* @__PURE__ */ A(() => [["button", J("opt.cta.button")], ["newsletter", J("opt.cta.newsletter")]]);
							Y(a, {
								get value() {
									return R(e);
								},
								get options() {
									return R(n);
								},
								onchange: (e) => fc("kind", e)
							});
						}
						O(r);
						var o = I(r, 2), s = P(o);
						G(s);
						var c = I(s);
						O(o);
						var l = I(o, 2), u = P(l), d = I(u);
						G(d), O(l);
						var f = I(l, 2), p = P(f), m = I(p);
						G(m), O(f);
						var h = I(f, 2), g = P(h), _ = I(g);
						G(_), O(h);
						var v = I(h, 2), y = (e) => {
							var n = Dd(), r = F(n), i = P(r), a = I(i);
							{
								let e = /* @__PURE__ */ A(() => R(t).page ?? "__href"), n = /* @__PURE__ */ A(() => [...R(D).pages.map((e) => [e.id, e.title]), ["__href", J("opt.linkHrefMailto")]]);
								Y(a, {
									get value() {
										return R(e);
									},
									get options() {
										return R(n);
									},
									onchange: (e) => pc(e)
								});
							}
							O(r);
							var o = I(r, 2), s = (e) => {
								var n = Cl();
								G(n), L((e, r) => {
									K(n, R(t).href ?? ""), q(n, "placeholder", e), q(n, "title", r);
								}, [() => J("ph.hrefMailtoAnchor"), () => J("tip.hrefAnchor")]), z("change", n, (e) => fc("href", e.target.value)), V(e, n);
							};
							U(o, (e) => {
								R(t).page || e(s);
							}), L((e, t) => {
								q(r, "title", e), H(i, `${t ?? ""} `);
							}, [() => J("tip.footer.ctaTarget"), () => J("lbl.buttonTarget")]), V(e, n);
						}, b = (e) => {
							var n = gl(), r = F(n), i = P(r), a = I(i);
							G(a), O(r);
							var o = I(r, 2), s = P(o), c = I(s);
							G(c), O(o);
							var l = I(o, 2), u = P(l), d = I(u);
							G(d), O(l), L((e, n, f, p, m, h, g, _, v) => {
								q(r, "title", e), H(i, `${n ?? ""} `), K(a, R(t).endpoint ?? ""), q(a, "placeholder", f), q(o, "title", p), H(s, `${m ?? ""} `), K(c, R(t).recipient ?? ""), q(c, "placeholder", h), q(l, "title", g), H(u, `${_ ?? ""} `), K(d, R(t).success ?? ""), q(d, "placeholder", v);
							}, [
								() => J("tip.footer.ctaEndpoint"),
								() => J("lbl.newsletterEndpoint"),
								() => J("ph.endpoint"),
								() => J("tip.footer.ctaRecipient"),
								() => J("lbl.recipientFallback"),
								() => J("ph.email"),
								() => J("tip.footer.ctaSuccess"),
								() => J("lbl.confirmation"),
								() => J("ph.footer.ctaSuccess")
							]), z("change", a, (e) => fc("endpoint", e.target.value)), z("change", c, (e) => fc("recipient", e.target.value)), z("input", d, (e) => fc("success", e.target.value)), V(e, n);
						};
						U(v, (e) => {
							(R(t).kind ?? "button") === "button" ? e(y) : e(b, -1);
						}), L((e, n, a, v, y, b, x, S, C, w, ee, te) => {
							q(r, "title", e), H(i, `${n ?? ""} `), q(o, "title", a), xi(s, R(t).big === !0), H(c, ` ${v ?? ""}`), q(l, "title", y), H(u, `${b ?? ""} `), K(d, R(t).heading ?? ""), q(d, "placeholder", x), q(f, "title", S), H(p, `${C ?? ""} `), K(m, R(t).sub ?? ""), q(h, "title", w), H(g, `${ee ?? ""} `), K(_, R(t).label ?? ""), q(_, "placeholder", te);
						}, [
							() => J("tip.footer.ctaKind"),
							() => J("common.type"),
							() => J("tip.footer.ctaBig"),
							() => J("lbl.bigCentered"),
							() => J("tip.footer.ctaHeading"),
							() => J("lbl.heading"),
							() => J("ph.footer.ctaHeading"),
							() => J("tip.footer.ctaSub"),
							() => J("lbl.subText"),
							() => J("tip.footer.ctaLabel"),
							() => J("lbl.buttonText"),
							() => J("ph.footer.ctaLabel")
						]), z("change", s, (e) => fc("big", e.target.checked)), z("input", d, (e) => fc("heading", e.target.value)), z("input", m, (e) => fc("sub", e.target.value)), z("input", _, (e) => fc("label", e.target.value)), V(e, n);
					};
					U(Oe, (e) => {
						R(D).footer?.cta && e(E);
					}), O(Te), O(Se);
					var ke = I(Se, 2), Ae = P(ke), je = P(Ae, !0);
					O(Ae);
					var Me = I(Ae, 2), Ne = P(Me);
					r(Ne, () => "linkRow", () => R(D).footer?.linkRow ?? []);
					var Pe = I(Ne, 2), Fe = P(Pe, !0);
					O(Pe), O(Me), O(ke);
					var Ie = I(ke, 2), Re = P(Ie), ze = P(Re, !0);
					O(Re);
					var Be = I(Re, 2), Ve = P(Be), He = (e) => {
						var t = Xl(), n = F(t), r = P(n), i = I(r);
						{
							let e = /* @__PURE__ */ A(() => R(D).footer?.align ?? "left"), t = /* @__PURE__ */ A(() => [
								["left", J("common.left")],
								["center", J("common.center")],
								["right", J("common.right")]
							]);
							Y(i, {
								get value() {
									return R(e);
								},
								get options() {
									return R(t);
								},
								onchange: (e) => Gs("footer", (t) => {
									t.align = e;
								})
							});
						}
						O(n), Le(2), L((e, t) => {
							q(n, "title", e), H(r, `${t ?? ""} `);
						}, [() => J("tip.footer.align"), () => J("lbl.align")]), V(e, t);
					};
					U(Ve, (e) => {
						R(D).footer?.cta?.big !== !0 && e(He);
					});
					var Ue = I(Ve, 2), We = P(Ue, !0);
					O(Ue);
					var Ge = I(Ue, 2);
					n(Ge, () => or, () => R(D).footer?.background?.layers ?? []), O(Be), O(Ie);
					var Ke = I(Ie, 2), qe = P(Ke), Je = P(qe, !0);
					O(qe);
					var Ye = I(qe, 2), Xe = P(Ye), Ze = P(Xe), Qe = I(Ze);
					G(Qe), O(Xe);
					var $e = I(Xe, 2), et = P($e, !0);
					O($e);
					var tt = I($e, 2);
					r(tt, () => "baseline", () => R(D).footer?.baseline ?? []);
					var nt = I(tt, 2), rt = P(nt, !0);
					O(nt), O(Ye), O(Ke), O(t), L((e, t, n, r, s, c, l, u, d, p, m, h, g, v, ne, re, ie, ae, oe, ce, le, ue, me, he, ge, ve, ye, be, Se, Ce, Te, Oe) => {
						q(i, "title", e), xi(a, t), H(o, ` ${n ?? ""}`), H(f, r), H(_, s), q(y, "title", c), H(b, `${l ?? ""} `), K(x, R(D).footer?.brand?.title ?? ""), q(x, "placeholder", u), q(S, "title", d), H(C, `${p ?? ""} `), K(w, R(D).footer?.brand?.tagline ?? ""), q(ee, "title", m), H(te, `${h ?? ""} `), H(se, g), H(de, v), q(fe, "title", ne), H(pe, `${re ?? ""} `), H(_e, ie), H(xe, ae), H(we, oe), q(Ee, "title", ce), xi(De, le), H(T, ` ${ue ?? ""}`), H(je, me), H(Fe, he), H(ze, ge), H(We, ve), H(Je, ye), q(Xe, "title", be), H(Ze, `${Se ?? ""} `), K(Qe, R(D).footer?.copyright ?? ""), q(Qe, "placeholder", Ce), H(et, Te), H(rt, Oe);
					}, [
						() => J("tip.footer.show"),
						() => !!R(D).footer?.show,
						() => J("lbl.showFooter"),
						() => J("group.startpoint"),
						() => J("group.brand"),
						() => J("tip.footer.brandTitle"),
						() => J("lbl.title"),
						() => J("ph.footer.brandTitle"),
						() => J("tip.footer.tagline"),
						() => J("lbl.tagline"),
						() => J("tip.footer.brandMode"),
						() => J("lbl.brandMode"),
						() => J("group.columns"),
						() => J("ui.addColumn"),
						() => J("tip.footer.columnsAlign"),
						() => J("lbl.splitColumnAlign"),
						() => J("group.social"),
						() => J("ui.addSocial"),
						() => J("group.cta"),
						() => J("tip.footer.cta"),
						() => !!R(D).footer?.cta,
						() => J("lbl.showCta"),
						() => J("group.linkRow"),
						() => J("ui.addRowLink"),
						() => J("group.appearance"),
						() => J("lbl.background"),
						() => J("group.baseline"),
						() => J("tip.footer.copyright"),
						() => J("lbl.copyright"),
						() => J("ph.footer.copyright"),
						() => J("lbl.baselineLinks"),
						() => J("ui.addBaselineLink")
					]), z("change", a, (e) => Gs("footer", (t) => {
						t.show = e.target.checked;
					})), z("input", x, (e) => Ks("title", e.target.value)), z("input", w, (e) => Ks("tagline", e.target.value)), z("click", ue, hc), z("click", be, Ec), z("change", De, (e) => dc(e.target.checked)), z("click", Pe, () => ic("linkRow")), z("input", Qe, (e) => $s(e.target.value)), z("click", nt, () => ic("baseline")), V(e, t);
				}, b = (e) => {
					var t = Rd(), n = P(t), r = (e) => {
						var t = cl(), n = P(t), r = I(n);
						{
							let e = /* @__PURE__ */ A(() => R(mo) ?? ""), t = /* @__PURE__ */ A(() => [["", J("common.choose")], ...R(lo).map((e) => [e, R(po)[e]?.name ?? e])]);
							Y(r, {
								get value() {
									return R(e);
								},
								get options() {
									return R(t);
								},
								onchange: (e) => N(mo, e || null, !0)
							});
						}
						O(t), L((e) => H(n, `${e ?? ""} `), [() => J("blocks.samling")]), V(e, t);
					};
					U(n, (e) => {
						R(lo).length && e(r);
					});
					var i = I(n, 2), a = (e) => {
						let t = /* @__PURE__ */ A(() => R(po)[R(mo)]);
						var n = Ld(), r = F(n), i = P(r), a = P(i, !0);
						O(i);
						var o = I(i, 2), s = P(o, !0);
						O(o);
						var l = I(o, 2), u = P(l), d = I(u);
						O(l);
						var f = I(l, 2);
						W(f, () => c.cross, !0), O(f), O(r);
						var p = I(r, 2);
						qr(p, 19, () => R(t).entries, (e) => e.id, (e, n, r) => {
							var i = Id(), a = P(i), o = P(a);
							O(a);
							var s = I(a, 2), l = P(s), u = P(l);
							G(u);
							var d = I(u, 2), f = P(d);
							W(f, () => c.up, !0), O(f);
							var p = I(f, 2);
							W(p, () => c.down, !0), O(p);
							var m = I(p, 2);
							W(m, () => c.cross, !0), O(m), O(d), O(l);
							var h = I(l, 2), g = (e) => {
								var t = Ad(), r = P(t), i = I(r);
								G(i), O(t), L((e) => {
									H(r, `${e ?? ""} `), K(i, R(n).date ?? "");
								}, [() => J("lbl.date")]), z("change", i, (e) => Ko(R(mo), R(n).id, "date", e.target.value)), V(e, t);
							};
							U(h, (e) => {
								R(t).kind !== "products" && e(g);
							});
							var _ = I(h, 2);
							dt(_);
							var v = I(_, 2), y = (e) => {
								var t = jd(), r = P(t), i = I(r);
								G(i), O(t), L((e, t) => {
									H(r, `${e ?? ""} `), K(i, R(n).href ?? ""), q(i, "placeholder", t);
								}, [() => J("lbl.link"), () => J("ph.collections.href")]), z("change", i, (e) => Ko(R(mo), R(n).id, "href", e.target.value)), V(e, t);
							};
							U(v, (e) => {
								R(t).kind !== "products" && e(y);
							});
							var b = I(v, 2), x = P(b), S = P(x), C = I(S);
							O(x);
							var w = I(x, 2), ee = (e) => {
								var t = Md(), r = F(t), i = I(r, 2);
								W(i, () => c.cross, !0), O(i), L((e) => {
									q(r, "src", R(n).image), q(i, "title", e);
								}, [() => J("tip.removeImage")]), z("click", i, () => Ko(R(mo), R(n).id, "image", "")), V(e, t);
							};
							U(w, (e) => {
								R(n).image && e(ee);
							}), O(b);
							var te = I(b, 2), ne = (e) => {
								var t = Fd(), r = F(t), i = P(r), a = I(i);
								G(a), O(r);
								var o = I(r, 2), s = P(o), l = I(s);
								G(l), O(o);
								var u = I(o, 2), d = P(u), f = I(d);
								G(f), O(u);
								var p = I(u, 2), m = P(p), h = I(m);
								G(h), O(p);
								var g = I(p, 2);
								qr(g, 17, () => R(n).colors ?? [], Ur, (e, t, r) => {
									var i = Pd(), a = P(i);
									G(a);
									var o = I(a, 2), s = P(o), l = I(s);
									O(o);
									var u = I(o, 2), d = (e) => {
										var n = Nd();
										L(() => q(n, "src", R(t).image)), V(e, n);
									};
									U(u, (e) => {
										R(t).image && e(d);
									});
									var f = I(u, 2);
									W(f, () => c.cross, !0), O(f), O(i), L((e, n) => {
										K(a, R(t).name), q(a, "placeholder", e), H(s, `${n ?? ""} `);
									}, [() => J("ph.colorName"), () => R(t).image ? J("ui.changeImage") : J("ui.addImage")]), z("change", a, (e) => is(R(mo), R(n).id, r, "name", e.target.value)), z("change", l, (e) => as(R(mo), R(n).id, r, e)), z("click", f, () => os(R(mo), R(n).id, r)), V(e, i);
								});
								var _ = I(g, 2), v = P(_, !0);
								O(_), L((e, t, r, c, g, y, b, x, S, C, w) => {
									H(i, `${e ?? ""} `), K(a, R(n).price ?? ""), q(o, "title", t), H(s, `${r ?? ""} `), K(l, R(n).memberPrice ?? ""), q(u, "title", c), H(d, `${g ?? ""} `), K(f, R(n).badge ?? ""), q(p, "title", y), H(m, `${b ?? ""} `), K(h, x), q(h, "placeholder", S), q(_, "title", C), H(v, w);
								}, [
									() => J("lbl.price"),
									() => J("tip.entry.memberPrice"),
									() => J("lbl.memberPrice"),
									() => J("tip.entry.badge"),
									() => J("lbl.productBadge"),
									() => J("tip.entry.sizes"),
									() => J("lbl.sizes"),
									() => (R(n).sizes ?? []).join(", "),
									() => J("ph.sizes"),
									() => J("tip.entry.colors"),
									() => J("ui.addColor")
								]), z("change", a, (e) => Ko(R(mo), R(n).id, "price", e.target.value === "" ? "" : Number(e.target.value))), z("change", l, (e) => Ko(R(mo), R(n).id, "memberPrice", e.target.value === "" ? "" : Number(e.target.value))), z("change", f, (e) => Ko(R(mo), R(n).id, "badge", e.target.value)), z("change", h, (e) => Qo(R(mo), R(n).id, e.target.value)), z("click", _, () => rs(R(mo), R(n).id)), V(e, t);
							};
							U(te, (e) => {
								R(t).kind === "products" && e(ne);
							}), O(s), O(i), L((e, i, a, s, c) => {
								H(o, `${e ?? ""}${R(t).kind === "products" ? R(n).price == null ? "" : ` · ${R(n).price}` : R(n).date ? ` · ${R(n).date}` : ""}`), K(u, R(n).title), q(u, "title", i), f.disabled = R(r) === 0, p.disabled = R(r) === R(t).entries.length - 1, q(m, "title", a), q(_, "placeholder", s), K(_, R(n).text ?? ""), H(S, `${c ?? ""} `);
							}, [
								() => Io(R(n).title),
								() => J("lbl.title"),
								() => J("tip.collections.deleteEntry"),
								() => J("ph.collections.text"),
								() => R(n).image ? J("ui.changeImage") : J("ui.addImage")
							]), z("change", u, (e) => Ko(R(mo), R(n).id, "title", e.target.value || "Uten tittel")), z("click", f, () => qo(R(mo), R(r), -1)), z("click", p, () => qo(R(mo), R(r), 1)), z("click", m, () => Yo(R(mo), R(n).id)), z("change", _, (e) => Ko(R(mo), R(n).id, "text", e.target.value)), z("change", C, (e) => Xo(R(mo), R(n).id, e)), V(e, i);
						});
						var m = I(p, 2), h = (e) => {
							var t = dl(), n = P(t, !0);
							O(t), L((e) => H(n, e), [() => J("hint.collections.empty")]), V(e, t);
						};
						U(m, (e) => {
							R(t).entries.length || e(h);
						}), Le(2), L((e, t, n, r, i, c) => {
							H(a, e), q(o, "title", t), H(s, n), q(l, "title", r), H(u, `${i ?? ""} `), q(f, "title", c);
						}, [
							() => J("ui.addEntry"),
							() => J("tip.collections.exportCsv"),
							() => J("ui.exportCsv"),
							() => J("tip.collections.importCsv"),
							() => J("ui.importCsv"),
							() => J("tip.collections.deleteCollection")
						]), z("click", i, () => Go(R(mo))), z("click", o, () => ss(R(mo))), z("change", d, (e) => cs(R(mo), e)), z("click", f, () => Vo(R(mo))), V(e, n);
					};
					U(i, (e) => {
						R(mo) && R(po)[R(mo)] && e(a);
					});
					var o = I(i, 2), s = P(o), l = I(s);
					G(l), O(o);
					var u = I(o, 2), d = P(u);
					Y(I(d), {
						get value() {
							return R(yo);
						},
						get options() {
							return X;
						},
						onchange: (e) => N(yo, e, !0)
					}), O(u);
					var f = I(u, 2), p = P(f, !0);
					O(f), O(t), L((e, t, n, r, i) => {
						H(s, `${e ?? ""} `), q(l, "placeholder", t), H(d, `${n ?? ""} `), f.disabled = r, H(p, i);
					}, [
						() => J("lbl.newCollectionName"),
						() => J("ph.collections.name"),
						() => J("common.type"),
						() => !R(go).trim(),
						() => J("ui.createCollection")
					]), z("keydown", l, (e) => e.key === "Enter" && zo()), Ti(l, () => R(go), (e) => N(go, e)), z("click", f, zo), V(e, t);
				}, x = (e) => {
					var t = Gd(), n = P(t), r = (e) => {
						var t = dl(), n = P(t, !0);
						O(t), L((e) => H(n, e), [() => J("hint.plugins.empty")]), V(e, t);
					}, i = /* @__PURE__ */ A(() => !vs().length);
					U(n, (e) => {
						R(i) && e(r);
					});
					var a = I(n, 2);
					qr(a, 16, vs, (e) => e, (e, t) => {
						let n = /* @__PURE__ */ A(() => ds[t]), r = /* @__PURE__ */ A(() => (R($)?.enabled ?? []).includes(t));
						var i = Vd();
						let a;
						var o = P(i), s = P(o), l = P(s, !0);
						O(s);
						var u = I(s, 2), d = (e) => {
							var t = zd(), r = P(t);
							O(t), L(() => H(r, `v${R(n).version ?? ""}`)), V(e, t);
						};
						U(u, (e) => {
							R(n)?.version && e(d);
						});
						var f = I(u, 2), p = P(f), m = P(p);
						G(m);
						var h = I(m);
						O(p);
						var g = I(p, 2);
						W(g, () => c.cross, !0), O(g), O(f), O(o);
						var _ = I(o, 2), v = (e) => {
							var t = Bd(), r = P(t, !0);
							O(t), L((e) => H(r, e), [() => R(n).errors.join("; ")]), V(e, t);
						}, y = (e) => {
							var t = Bd(), r = P(t, !0);
							O(t), L((e) => H(r, e), [() => J("plugin.engineMismatch", {
								required: R(n).requiresEngine,
								current: R(fs)
							})]), V(e, t);
						}, b = (e) => {
							var t = Bd(), r = P(t, !0);
							O(t), L((e) => H(r, e), [() => J("plugin.cspNeeded", { list: Ts(R(n).csp).join(", ") })]), V(e, t);
						}, x = /* @__PURE__ */ A(() => R(n)?.csp && Ts(R(n).csp).length);
						U(_, (e) => {
							R(n)?.errors?.length ? e(v) : R(n) && !R(n).satisfied ? e(y, 1) : R(x) && e(b, 2);
						});
						var S = I(_, 2), C = (e) => {
							var t = dl(), r = P(t, !0);
							O(t), L((e) => H(r, e), [() => J("plugin.languages", { list: R(n).languages.map((e) => e.name).join(", ") })]), V(e, t);
						};
						U(S, (e) => {
							R(n)?.languages?.length && e(C);
						}), O(i), L((e, t, o, s, c) => {
							a = mi(i, 1, "plugin-row svelte-1n46o8q", null, a, { "plugin-broken": R(n)?.errors?.length }), H(l, e), q(p, "title", t), xi(m, R(r)), m.disabled = o, H(h, ` ${s ?? ""}`), q(g, "title", c);
						}, [
							() => R(n)?.names?.[Ui()] ?? R(n)?.name ?? t,
							() => R(r) ? J("tip.plugins.on") : J("tip.plugins.off"),
							() => !!R(n)?.errors?.length,
							() => R(r) ? J("ui.on") : J("ui.off"),
							() => J("tip.plugins.remove")
						]), z("change", m, (e) => Bs(t, e.target.checked)), z("click", g, () => Hs(t)), V(e, i);
					});
					var o = I(a, 2), s = (e) => {
						var t = Ud(), n = I(F(t), 2), r = P(n, !0);
						O(n), qr(I(n, 2), 16, () => R(hs), (e) => e, (e, t) => {
							var n = Hd(), r = P(n), i = P(r), a = P(i, !0);
							O(i);
							var o = I(i, 2), s = (e) => {
								var n = zd(), r = P(n);
								O(n), L(() => H(r, `v${ds[t].version ?? ""}`)), V(e, n);
							};
							U(o, (e) => {
								ds[t]?.version && e(s);
							});
							var l = I(o, 2), u = P(l);
							W(u, () => c.right, !0), O(u), O(l), O(r), O(n), L((e, t) => {
								H(a, e), q(u, "title", t);
							}, [() => ds[t]?.names?.[Ui()] ?? ds[t]?.name ?? t, () => J("tip.plugins.addFound")]), z("click", u, () => Ws(t)), V(e, n);
						}), L((e) => H(r, e), [() => J("hint.plugins.found")]), V(e, t);
					};
					U(o, (e) => {
						R(hs).length && e(s);
					});
					var l = I(o, 2), u = (e) => {
						var t = Ir(), n = F(t), r = (e) => {
							var t = dl(), n = P(t, !0);
							O(t), L((e) => H(n, e), [() => J("hint.plugins.autoDiscover")]), V(e, t);
						};
						U(n, (e) => {
							R(hs).length || e(r);
						}), V(e, t);
					}, d = (e) => {
						var t = Wd(), n = I(F(t), 2);
						G(n);
						var r = I(n, 2), i = P(r, !0);
						O(r);
						var a = I(r, 2), o = (e) => {
							var t = Bd(), n = P(t, !0);
							O(t), L(() => H(n, R(ms))), V(e, t);
						};
						U(a, (e) => {
							R(ms) && e(o);
						}), L((e, t, a) => {
							q(n, "placeholder", e), r.disabled = t, H(i, a);
						}, [
							() => J("ph.plugins.folder"),
							() => !R(ps).trim(),
							() => J("ui.addPlugin")
						]), z("keydown", n, (e) => e.key === "Enter" && Us()), Ti(n, () => R(ps), (e) => N(ps, e)), z("click", r, Us), V(e, t);
					};
					U(l, (e) => {
						R(_s) === "ok" ? e(u) : e(d, -1);
					}), O(t), V(e, t);
				}, S = (e) => {
					var t = xd(), n = P(t), r = (e) => {
						var t = dl(), n = P(t, !0);
						O(t), L((e) => H(n, e), [() => J("hint.history.loading")]), V(e, t);
					}, i = (e) => {
						var t = Jd(), n = F(t), r = (e) => {
							var t = dl(), n = P(t, !0);
							O(t), L(() => H(n, R(Hr))), V(e, t);
						};
						U(n, (e) => {
							R(Hr) && e(r);
						});
						var i = I(n, 2), a = (e) => {
							var t = qd(), n = F(t), r = P(n, !0);
							O(n), qr(I(n, 2), 19, () => R(Vr), (e) => e.sha, (e, t, n) => {
								var r = Kd();
								let i;
								var a = P(r), o = P(a, !0);
								O(a);
								var s = I(a, 2), c = P(s);
								O(s), O(r), L((e) => {
									i = mi(r, 1, "history-row svelte-1n46o8q", null, i, { head: R(n) === 0 }), q(a, "title", R(t).sha), H(o, R(t).message), H(c, `${R(t).author ?? ""}${e ?? ""}`);
								}, [() => R(t).date ? ` · ${Kr.format(new Date(R(t).date))}` : ""]), V(e, r);
							}), L((e, t) => {
								n.disabled = R(Wr) || !R(ee)?.allowed, q(n, "title", e), H(r, t);
							}, [() => R(ee)?.allowed ? J("tip.history.revert") : J("tip.history.needsAccess"), () => J("ui.revertLast")]), z("click", n, Yr), V(e, t);
						};
						U(i, (e) => {
							R(Vr).length > 0 && e(a);
						}), V(e, t);
					};
					U(n, (e) => {
						R(Vr) === null ? e(r) : e(i, -1);
					}), O(t), V(e, t);
				}, C = (e) => {
					var t = xd(), n = P(t), r = (e) => {
						var t = dl(), n = P(t, !0);
						O(t), L((e) => H(n, e), [() => J("update.checking")]), V(e, t);
					}, i = (e) => {
						var t = Yd(), n = F(t), r = P(n, !0);
						O(n);
						var i = I(n, 2), a = P(i, !0);
						O(i), L((e) => {
							H(r, R(Qr)), H(a, e);
						}, [() => J("update.retry")]), z("click", i, ti), V(e, t);
					}, a = (e) => {
						var t = sf(), n = F(t), r = P(n), i = P(r, !0);
						O(r);
						var a = I(r, 2), o = (e) => {
							var t = Xd(), n = F(t);
							W(n, () => c.right, !0), O(n);
							var r = I(n, 2), i = P(r, !0);
							O(r), L(() => H(i, R(Zr).target)), V(e, t);
						};
						U(a, (e) => {
							R(Zr).upToDate || e(o);
						}), O(n);
						var s = I(n, 2), l = (e) => {
							var t = dl(), n = P(t, !0);
							O(t), L((e) => H(n, e), [() => J("update.upToDate")]), V(e, t);
						}, u = (e) => {
							var t = of(), n = F(t), r = P(n, !0);
							O(n);
							var i = I(n, 2), a = (e) => {
								var t = Zd(), n = P(t), r = P(n, !0);
								O(n);
								var i = I(n, 2), a = P(i), o = P(a, !0);
								O(a), O(i), O(t), L((e) => {
									H(r, e), H(o, R(Zr).notes);
								}, [() => J("update.aboutVersion", { target: R(Zr).target })]), V(e, t);
							};
							U(i, (e) => {
								R(Zr).notes && e(a);
							});
							var o = I(i, 2), s = (e) => {
								var t = Qd(), n = P(t), r = P(n);
								W(r, () => c.warn, !0), O(r);
								var i = I(r);
								O(n);
								var a = I(n, 2), o = P(a), s = P(o, !0);
								O(o), O(a), O(t), L((e, t) => {
									q(n, "title", e), H(i, ` ${t ?? ""}`), H(s, R(Zr).headers.upstream);
								}, [() => J("update.headersManual"), () => J("update.headersTitle")]), V(e, t);
							};
							U(o, (e) => {
								R(Zr).headers?.upstream && e(s);
							});
							var l = I(o, 2);
							qr(l, 17, () => R(Zr).changes.filter((e) => e.atom && e.conflict), (e) => e.path, (e, t) => {
								var n = ef(), r = P(n), i = P(r, !0);
								O(r);
								var a = I(r, 2), o = P(a), s = (e) => {
									var t = $d(), n = P(t, !0);
									O(t), L((e) => H(n, e), [() => J("update.actionDelete")]), V(e, t);
								};
								U(o, (e) => {
									R(t).action === "delete" && e(s);
								});
								var l = I(o, 2);
								W(l, () => c.warn, !0), O(l), O(a), O(n), L((e) => {
									q(r, "title", R(t).path), H(i, R(t).path), q(l, "title", e);
								}, [() => J(`update.conflict.${R(t).conflict}`)]), V(e, n);
							});
							var u = I(l, 2), d = P(u), f = P(d);
							O(d);
							var p = I(d, 2);
							qr(p, 21, () => R(Zr).changes.filter((e) => e.atom && !e.conflict), (e) => e.path, (e, t) => {
								var n = tf(), r = P(n), i = P(r, !0);
								O(r);
								var a = I(r, 2), o = (e) => {
									var t = $d(), n = P(t, !0);
									O(t), L((e) => H(n, e), [() => J("update.actionDelete")]), V(e, t);
								};
								U(a, (e) => {
									R(t).action === "delete" && e(o);
								}), O(n), L(() => {
									q(r, "title", R(t).path), H(i, R(t).path);
								}), V(e, n);
							}), O(p), O(u);
							var m = I(u, 2), h = (e) => {
								var t = af(), n = F(t), r = P(n), i = P(r, !0);
								O(r);
								var a = I(r, 2), o = P(a, !0);
								O(a), O(n), qr(I(n, 2), 17, () => R(Zr).changes.filter((e) => !e.atom), (e) => e.path, (e, t) => {
									var n = rf(), r = P(n);
									let i;
									var a = P(r, !0);
									O(r);
									var o = I(r, 2), s = P(o), l = (e) => {
										var t = $d(), n = P(t, !0);
										O(t), L((e) => H(n, e), [() => J("update.actionDelete")]), V(e, t);
									};
									U(s, (e) => {
										R(t).action === "delete" && e(l);
									});
									var u = I(s, 2), d = (e) => {
										var n = nf();
										W(n, () => c.warn, !0), O(n), L((e) => q(n, "title", e), [() => J(`update.conflict.${R(t).conflict}`)]), V(e, n);
									};
									U(u, (e) => {
										R(t).conflict && e(d);
									});
									var f = I(u, 2);
									G(f), O(o), O(n), L((e, n, o, s) => {
										i = mi(r, 1, "update-path svelte-1n46o8q", null, i, e), q(r, "title", R(t).path), H(a, R(t).path), xi(f, n), q(f, "title", o), q(f, "aria-label", s);
									}, [
										() => ({ skipped: R(ei).has(R(t).path) }),
										() => R(ei).has(R(t).path),
										() => J("update.keepMine.title"),
										() => J("update.keepMine")
									]), z("change", f, () => ni(R(t).path)), V(e, n);
								}), L((e, t) => {
									H(i, e), H(o, t);
								}, [() => J("update.optionalTitle"), () => J("update.keepMine")]), V(e, t);
							}, g = /* @__PURE__ */ A(() => R(Zr).changes.some((e) => !e.atom));
							U(m, (e) => {
								R(g) && e(h);
							});
							var _ = I(m, 2), v = P(_, !0);
							O(_), L((e, t, n, i, a, o) => {
								H(r, e), q(d, "title", t), H(f, `${n ?? ""} · ${i ?? ""}`), _.disabled = R($r) || !R(ee)?.allowed, q(_, "title", a), H(v, o);
							}, [
								() => J("update.summary", {
									writes: R(Zr).changes.filter((e) => e.action === "write").length,
									deletes: R(Zr).changes.filter((e) => e.action === "delete").length
								}),
								() => J("update.atomGroup.title"),
								() => J("update.atomTitle"),
								() => R(Zr).changes.filter((e) => e.atom).length,
								() => R(ee)?.allowed ? J("update.run.title") : J("tip.history.needsAccess"),
								() => J("update.run", { target: R(Zr).target })
							]), z("click", _, ri), V(e, t);
						};
						U(s, (e) => {
							R(Zr).upToDate ? e(l) : e(u, -1);
						}), L((e) => H(i, e), [() => J("update.current", { version: R(Zr).current })]), V(e, t);
					};
					U(n, (e) => {
						R($r) && !R(Zr) ? e(r) : R(Qr) ? e(i, 1) : R(Zr) && e(a, 2);
					}), O(t), V(e, t);
				};
				U(s, (e) => {
					R(lt) === "pages" ? e(l) : R(lt) === "nav" ? e(u, 1) : R(lt) === "site" ? e(d, 2) : R(lt) === "theme" ? e(p, 3) : R(lt) === "blocks" ? e(m, 4) : R(lt) === "grid" ? e(_, 5) : R(lt) === "properties" ? e(v, 6) : R(lt) === "footer" ? e(y, 7) : R(lt) === "collections" ? e(b, 8) : R(lt) === "plugins" ? e(x, 9) : R(lt) === "history" ? e(S, 10) : R(lt) === "update" && e(C, 11);
				}), O(t), L((e) => {
					q(i, "title", e), H(o, mt[R(lt)]);
				}, [() => ht[R(lt)]?.map((e) => J(e)).join("\n")]), V(e, t);
			};
			U(v, (e) => {
				R(lt) && e(y);
			}), L((e) => {
				p = mi(d, 1, "rail-gear svelte-1n46o8q", null, p, { active: R(fi) }), q(d, "title", e);
			}, [() => J("settings.title")]), z("click", d, () => N(fi, !R(fi))), V(e, t);
		};
		U(i, (e) => {
			R(ne) && e(o);
		});
		var s = I(i, 2);
		let d;
		var p = P(s), m = P(p);
		ki(m, (e) => N(w, e), () => R(w)), O(p), O(s), ki(s, (e) => N(se, e), () => R(se)), O(t), L((e) => {
			d = mi(s, 1, "frame-wrap svelte-1n46o8q", null, d, {
				mobile: R(oe) === "mobile",
				pan: R(xe)
			}), gi(p, `width:${R(ye) ?? ""}px; height:${R(be) ?? ""}px`), q(m, "title", e), q(m, "src", `/?page=${R(g)}&preview=1`), gi(m, `width:${R(he) ?? ""}px; height:${R(ve) ?? ""}px; transform:scale(${R(ge) ?? ""}); transform-origin:top left`);
		}, [() => J("ui.previewTitle")]), Er("load", m, li), wr(m), V(e, t);
	}, em = (e) => {
		var t = df(), n = P(t, !0);
		O(t), L((e) => H(n, e), [() => J("ui.loading")]), V(e, t);
	};
	U(Qp, (e) => {
		R(m) ? e($p) : e(em, -1);
	});
	var tm = I(Qp, 2), nm = (e) => {
		io(e, {
			get image() {
				return R(ia);
			},
			onapply: oa,
			oncancel: () => N(ia, null)
		});
	};
	U(tm, (e) => {
		R(ia) && e(nm);
	});
	var rm = I(tm, 2), im = (e) => {
		var t = pf(), n = P(t), r = P(n), i = P(r, !0);
		O(r);
		var a = I(r, 2);
		qr(a, 16, () => R(Qe).lines, (e) => e, (e, t) => {
			var n = ff(), r = P(n, !0);
			O(n), L(() => H(r, t)), V(e, n);
		});
		var o = I(a, 2), s = (e) => {
			var t = Cl();
			G(t), ut(t, !0), L(() => q(t, "placeholder", R(Qe).placeholder)), z("keydown", t, (e) => e.key === "Enter" && R(Qe).value.trim() && tt(!0)), Ti(t, () => R(Qe).value, (e) => R(Qe).value = e), V(e, t);
		};
		U(o, (e) => {
			R(Qe).prompt && e(s);
		});
		var c = I(o, 2), l = P(c), u = P(l, !0);
		O(l);
		var d = I(l, 2), f = P(d, !0);
		O(d), O(c), O(n), O(t), L(() => {
			H(i, R(Qe).title), H(u, R(Qe).cancelLabel), H(f, R(Qe).okLabel);
		}), z("pointerdown", t, (e) => nt = e.target === e.currentTarget), z("click", t, (e) => nt && e.target === e.currentTarget && tt(!1)), z("click", l, () => tt(!1)), z("click", d, () => tt(!0)), V(e, t);
	};
	U(rm, (e) => {
		R(Qe) && e(im);
	});
	var am = I(rm, 2), om = (e) => {
		var t = mf(), n = P(t), r = P(n), i = P(r, !0);
		O(r);
		var a = I(r, 2), o = P(a, !0);
		O(a);
		var s = I(a, 2), c = P(s), l = I(c);
		G(l), O(s);
		var u = I(s, 2), d = P(u), f = I(d);
		{
			let e = /* @__PURE__ */ A(() => J("setup.accentPick"));
			ca(f, {
				get value() {
					return R(at);
				},
				get label() {
					return R(e);
				},
				onchange: (e) => N(at, e, !0)
			});
		}
		O(u);
		var p = I(u, 2), m = P(p), h = I(m);
		{
			let e = /* @__PURE__ */ A(() => J("setup.bgLabel"));
			ca(h, {
				get value() {
					return R(ot);
				},
				get label() {
					return R(e);
				},
				onchange: (e) => N(ot, e, !0)
			});
		}
		O(p);
		var g = I(p, 2), _ = P(g, !0);
		O(g);
		var v = I(g, 2), y = P(v), b = P(y, !0);
		O(y);
		var x = I(y, 2), S = P(x, !0);
		O(x), O(v), O(n), O(t), L((e, t, n, r, a, s, u, f, p, h) => {
			H(i, e), H(o, t), H(c, `${n ?? ""} `), q(l, "placeholder", r), H(d, `${a ?? ""} `), H(m, `${s ?? ""} `), H(_, u), H(b, f), x.disabled = p, H(S, h);
		}, [
			() => J("setup.title"),
			() => J("setup.intro"),
			() => J("setup.nameLabel"),
			() => J("ph.setup.name"),
			() => J("setup.accentLabel"),
			() => J("setup.bgLabel"),
			() => J("setup.outro"),
			() => J("setup.skip"),
			() => !R(it).trim(),
			() => J("setup.start")
		]), z("keydown", l, (e) => e.key === "Enter" && ct()), Ti(l, () => R(it), (e) => N(it, e)), z("click", y, st), z("click", x, ct), V(e, t);
	};
	U(am, (e) => {
		R(rt) && e(om);
	});
	var sm = I(am, 2), cm = (e) => {
		var t = hf();
		let n;
		var r = P(t), i = P(r, !0);
		O(r);
		var a = I(r, 2);
		O(t), L((e) => {
			n = mi(t, 1, "toast svelte-1n46o8q", null, n, {
				ok: R(y) === "ok",
				error: R(y) === "error"
			}), H(i, R(v)), q(a, "title", e);
		}, [() => J("ui.close")]), z("click", a, () => x("")), V(e, t);
	};
	U(sm, (e) => {
		R(v) && e(cm);
	}), O(Ip);
	var lm = I(Ip, 2), um = (e) => {
		var t = gf(), n = P(t), r = P(n), i = P(r, !0);
		O(r);
		var o = I(r, 2);
		W(o, () => c.cross, !0), O(o), O(n);
		var s = I(n, 2), l = P(s);
		a(l), O(s), O(t), L((e, n) => {
			gi(t, `left: ${R(Dt).left ?? ""}px; top: ${R(Dt).top ?? ""}px`), H(i, e), q(o, "title", n);
		}, [() => J("blocks.suffix", { label: rn[R(k).type] ?? R(k).type }), () => J("tip.closeEsc")]), z("click", o, () => N(Dt, null)), V(e, t);
	};
	U(lm, (e) => {
		R(Dt) && R(k) && e(um);
	}), L(() => Bp = mi(zp, 1, "topbar svelte-1n46o8q", null, Bp, { hidden: !R(ne) })), V(e, Fp), Ye();
}
//#endregion
//#region src/main.js
Dr([
	"click",
	"input",
	"pointerdown",
	"change",
	"keydown"
]), document.documentElement.lang = await Ki();
var yf = Rr(vf, { target: document.getElementById("urd-admin") });
//#endregion
export { yf as default };
