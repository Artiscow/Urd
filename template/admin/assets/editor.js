//#region node_modules/svelte/src/internal/shared/utils.js
var e = Array.isArray, t = Array.prototype.indexOf, n = Array.prototype.includes, r = Array.from, i = Object.defineProperty, a = Object.getOwnPropertyDescriptor, o = Object.getOwnPropertyDescriptors, s = Object.prototype, c = Array.prototype, l = Object.getPrototypeOf, u = Object.isExtensible, d = () => {};
function f(e) {
	for (var t = 0; t < e.length; t++) e[t]();
}
function p() {
	var e, t;
	return {
		promise: new Promise((n, r) => {
			e = n, t = r;
		}),
		resolve: e,
		reject: t
	};
}
function m(e, t) {
	if (Array.isArray(e)) return e;
	if (t === void 0 || !(Symbol.iterator in e)) return Array.from(e);
	let n = [];
	for (let r of e) if (n.push(r), n.length === t) break;
	return n;
}
var h = 1024, g = 2048, _ = 4096, v = 8192, y = 16384, b = 32768, x = 1 << 25, S = 65536, C = 1 << 19, w = 1 << 20, T = 1 << 25, E = 65536, D = 1 << 21, ee = 1 << 22, te = 1 << 23, ne = Symbol("$state"), re = Symbol("legacy props"), ie = Symbol(""), ae = Symbol("attributes"), oe = Symbol("class"), se = Symbol("style"), ce = Symbol("text"), le = Symbol("form reset"), ue = new class extends Error {
	name = "StaleReactionError";
	message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}(), de = !!globalThis.document?.contentType && /* @__PURE__ */ globalThis.document.contentType.includes("xml");
//#endregion
//#region node_modules/svelte/src/internal/client/errors.js
function fe() {
	throw Error("https://svelte.dev/e/async_derived_orphan");
}
function pe(e, t, n) {
	throw Error("https://svelte.dev/e/each_key_duplicate");
}
function me(e) {
	throw Error("https://svelte.dev/e/effect_in_teardown");
}
function he() {
	throw Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function O(e) {
	throw Error("https://svelte.dev/e/effect_orphan");
}
function ge() {
	throw Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function k(e) {
	throw Error("https://svelte.dev/e/props_invalid_value");
}
function A() {
	throw Error("https://svelte.dev/e/state_descriptors_fixed");
}
function _e() {
	throw Error("https://svelte.dev/e/state_prototype_fixed");
}
function ve() {
	throw Error("https://svelte.dev/e/state_unsafe_mutation");
}
function ye() {
	throw Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
//#endregion
//#region node_modules/svelte/src/constants.js
var be = {}, j = Symbol("uninitialized"), xe = "http://www.w3.org/1999/xhtml", Se = "http://www.w3.org/2000/svg", Ce = "http://www.w3.org/1998/Math/MathML";
function we() {
	console.warn("https://svelte.dev/e/derived_inert");
}
function Te(e) {
	console.warn("https://svelte.dev/e/hydration_mismatch");
}
function Ee() {
	console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/hydration.js
var De = !1;
function Oe(e) {
	De = e;
}
var ke;
function Ae(e) {
	if (e === null) throw Te(), be;
	return ke = e;
}
function je() {
	return Ae(/* @__PURE__ */ ln(ke));
}
function M(e) {
	if (De) {
		if (/* @__PURE__ */ ln(ke) !== null) throw Te(), be;
		ke = e;
	}
}
function Me(e = 1) {
	if (De) {
		for (var t = e, n = ke; t--;) n = /* @__PURE__ */ ln(n);
		ke = n;
	}
}
function Ne(e = !0) {
	for (var t = 0, n = ke;;) {
		if (n.nodeType === 8) {
			var r = n.data;
			if (r === "]") {
				if (t === 0) return n;
				--t;
			} else (r === "[" || r === "[!" || r[0] === "[" && !isNaN(Number(r.slice(1)))) && (t += 1);
		}
		var i = /* @__PURE__ */ ln(n);
		e && n.remove(), n = i;
	}
}
function Pe(e) {
	if (!e || e.nodeType !== 8) throw Te(), be;
	return e.data;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/equality.js
function Fe(e) {
	return e === this.v;
}
function Ie(e, t) {
	return e == e ? e !== t || typeof e == "object" && !!e || typeof e == "function" : t == t;
}
function Le(e) {
	return !Ie(e, this.v);
}
//#endregion
//#region node_modules/svelte/src/internal/shared/clone.js
var Re = [];
function ze(e, t = !1, n = !1) {
	return Be(e, /* @__PURE__ */ new Map(), "", Re, null, n);
}
function Be(t, n, r, i, a = null, o = !1) {
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
				d in t && (u[d] = Be(f, n, r, i, null, o));
			}
			return u;
		}
		if (l(t) === s) {
			u = {}, n.set(t, u), a !== null && n.set(a, u);
			for (var p of Object.keys(t)) u[p] = Be(t[p], n, r, i, null, o);
			return u;
		}
		if (t instanceof Date) return structuredClone(t);
		if (typeof t.toJSON == "function" && !o) return Be(t.toJSON(), n, r, i, t);
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
var Ve = null;
function He(e) {
	Ve = e;
}
function Ue(e, t = !1, n) {
	Ve = {
		p: Ve,
		i: !1,
		c: null,
		e: null,
		s: e,
		x: null,
		r: Gn,
		l: null
	};
}
function We(e) {
	var t = Ve, n = t.e;
	if (n !== null) {
		t.e = null;
		for (var r of n) bn(r);
	}
	return e !== void 0 && (t.x = e), t.i = !0, Ve = t.p, e ?? {};
}
function Ge() {
	return !0;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/task.js
var Ke = [];
function qe() {
	var e = Ke;
	Ke = [], f(e);
}
function Je(e) {
	if (Ke.length === 0 && !jt) {
		var t = Ke;
		queueMicrotask(() => {
			t === Ke && qe();
		});
	}
	Ke.push(e);
}
function Ye() {
	for (; Ke.length > 0;) qe();
}
function Xe(e) {
	var t = Gn;
	if (t === null) return Hn.f |= te, e;
	if (!(t.f & 32768) && !(t.f & 4)) throw e;
	Ze(e, t);
}
function Ze(e, t) {
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
var Qe = ~(g | _ | h);
function $e(e, t) {
	e.f = e.f & Qe | t;
}
function et(e) {
	e.f & 512 || e.deps === null ? $e(e, h) : $e(e, _);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/utils.js
function tt(e) {
	if (e !== null) for (let t of e) !(t.f & 2) || !(t.f & 65536) || (t.f ^= E, tt(t.deps));
}
function nt(e, t, n) {
	e.f & 2048 ? t.add(e) : e.f & 4096 && n.add(e), tt(e.deps), $e(e, h);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/store.js
var rt = !1;
function it(e) {
	var t = rt;
	try {
		return rt = !1, [e(), rt];
	} finally {
		rt = t;
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/misc.js
function at(e, t) {
	if (t) {
		let t = document.body;
		e.autofocus = !0, Je(() => {
			document.activeElement === t && e.focus();
		});
	}
}
function ot(e) {
	De && /* @__PURE__ */ cn(e) !== null && un(e);
}
var st = !1;
function ct() {
	st || (st = !0, document.addEventListener("reset", (e) => {
		Promise.resolve().then(() => {
			if (!e.defaultPrevented) for (let t of e.target.elements) t[le]?.();
		});
	}, { capture: !0 }));
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
function N(e) {
	var t = Hn, n = Gn;
	Wn(null), Kn(null);
	try {
		return e();
	} finally {
		Wn(t), Kn(n);
	}
}
function lt(e, t, n, r = n) {
	e.addEventListener(t, () => N(n));
	let i = e[le];
	e[le] = i ? () => {
		i(), r(!0);
	} : () => r(!0), ct();
}
//#endregion
//#region node_modules/svelte/src/reactivity/create-subscriber.js
function ut(e) {
	let t = 0, n = Jt(0), r;
	return () => {
		_n() && (H(n), wn(() => (t === 0 && (r = pr(() => e(() => Qt(n)))), t += 1, () => {
			Je(() => {
				--t, t === 0 && (r?.(), r = void 0, Qt(n));
			});
		})));
	};
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/boundary.js
var dt = S | C;
function ft(e, t, n, r) {
	new pt(e, t, n, r);
}
var pt = class {
	parent;
	is_pending = !1;
	transform_error;
	#e;
	#t = De ? ke : null;
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
	#h = ut(() => (this.#m = Jt(this.#l), () => {
		this.#m = null;
	}));
	constructor(e, t, n, r) {
		this.#e = e, this.#n = t, this.#r = (e) => {
			var t = Gn;
			t.b = this, t.f |= 128, n(e);
		}, this.parent = Gn.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = Tn(() => {
			if (De) {
				let e = this.#t;
				je();
				let t = e.data === "[!";
				if (e.data.startsWith("[?")) {
					let t = JSON.parse(e.data.slice(2));
					this.#_(t);
				} else t ? this.#y() : this.#g();
			} else this.#b();
		}, dt), De && (this.#e = ke);
	}
	#g() {
		try {
			this.#a = En(() => this.#r(this.#e));
		} catch (e) {
			this.error(e);
		}
	}
	#_(e) {
		let t = this.#n.failed, { reset: n, invoke_onerror: r } = this.#v(e);
		Je(r), t && (this.#s = En(() => {
			t(this.#e, () => e, () => n);
		}));
	}
	#v(e) {
		var t = !1, n = !1;
		let r = () => {
			if (t) {
				Ee();
				return;
			}
			t = !0, n && ye(), this.#s !== null && Nn(this.#s, () => {
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
					Ze(e, this.#i && this.#i.parent);
				}
			}
		};
	}
	#y() {
		let e = this.#n.pending;
		e && (this.is_pending = !0, this.#o = En(() => e(this.#e)), Je(() => {
			var e = this.#c = document.createDocumentFragment(), t = sn();
			e.append(t), this.#a = this.#S(() => En(() => this.#r(t))), this.#u === 0 && (this.#e.before(e), this.#c = null, Nn(this.#o, () => {
				this.#o = null;
			}), this.#x(Dt));
		}));
	}
	#b() {
		try {
			if (this.is_pending = this.has_pending_snippet(), this.#u = 0, this.#l = 0, this.#a = En(() => {
				this.#r(this.#e);
			}), this.#u > 0) {
				var e = this.#c = document.createDocumentFragment();
				Ln(this.#a, e);
				let t = this.#n.pending;
				this.#o = En(() => t(this.#e));
			} else this.#x(Dt);
		} catch (e) {
			this.error(e);
		}
	}
	#x(e) {
		this.is_pending = !1, e.transfer_effects(this.#f, this.#p);
	}
	defer_effect(e) {
		nt(e, this.#f, this.#p);
	}
	is_rendered() {
		return !this.is_pending && (!this.parent || this.parent.is_rendered());
	}
	has_pending_snippet() {
		return !!this.#n.pending;
	}
	#S(e) {
		var t = Gn, n = Hn, r = Ve;
		Kn(this.#i), Wn(this.#i), He(this.#i.ctx);
		try {
			return Lt.ensure(), e();
		} catch (e) {
			return Xe(e), null;
		} finally {
			Kn(t), Wn(n), He(r);
		}
	}
	#C(e, t) {
		if (!this.has_pending_snippet()) {
			this.parent && this.parent.#C(e, t);
			return;
		}
		this.#u += e, this.#u === 0 && (this.#x(t), this.#o && Nn(this.#o, () => {
			this.#o = null;
		}), this.#c &&= (this.#e.before(this.#c), null));
	}
	update_pending_count(e, t) {
		this.#C(e, t), this.#l += e, !(!this.#m || this.#d) && (this.#d = !0, Je(() => {
			this.#d = !1, this.#m && Xt(this.#m, this.#l);
		}));
	}
	get_effect_pending() {
		return this.#h(), H(this.#m);
	}
	error(e) {
		if (!this.#n.onerror && !this.#n.failed) throw e;
		Dt?.is_fork ? (this.#a && Dt.skip_effect(this.#a), this.#o && Dt.skip_effect(this.#o), this.#s && Dt.skip_effect(this.#s), Dt.oncommit(() => {
			this.#w(e);
		})) : this.#w(e);
	}
	#w(e) {
		this.#a &&= (An(this.#a), null), this.#o &&= (An(this.#o), null), this.#s &&= (An(this.#s), null), De && (Ae(this.#t), Me(), Ae(Ne()));
		let t = this.#n.failed, n = (e) => {
			let { reset: n, invoke_onerror: r } = this.#v(e);
			r(), t && (this.#s = this.#S(() => {
				try {
					return En(() => {
						var r = Gn;
						r.b = this, r.f |= 128, t(this.#e, () => e, () => n);
					});
				} catch (e) {
					return Ze(e, this.#i.parent), null;
				}
			}));
		};
		Je(() => {
			var t;
			try {
				t = this.transform_error(e);
			} catch (e) {
				Ze(e, this.#i && this.#i.parent);
				return;
			}
			typeof t == "object" && t && typeof t.then == "function" ? t.then(n, (e) => Ze(e, this.#i && this.#i.parent)) : n(t);
		});
	}
};
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/async.js
function mt(e, t, n, r) {
	let i = Ge() ? _t : bt;
	var a = e.filter((e) => !e.settled), o = t.map(i);
	if (n.length === 0 && a.length === 0) {
		r(o);
		return;
	}
	var s = Gn, c = ht(), l = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((e) => e.promise)) : null;
	function u(e) {
		if (!(s.f & 16384)) {
			c();
			try {
				r([...o, ...e]);
			} catch (e) {
				Ze(e, s);
			}
			P();
		}
	}
	var d = gt();
	if (n.length === 0) {
		l.then(() => u([])).finally(d);
		return;
	}
	function f() {
		Promise.all(n.map((e) => /* @__PURE__ */ yt(e))).then(u).catch((e) => Ze(e, s)).finally(d);
	}
	l ? l.then(() => {
		c(), f(), P();
	}) : f();
}
function ht() {
	var e = Gn, t = Hn, n = Ve, r = Dt;
	return function(i = !0) {
		Kn(e), Wn(t), He(n), i && !(e.f & 16384) && (r?.activate(), r?.apply());
	};
}
function P(e = !0) {
	Kn(null), Wn(null), He(null), e && Dt?.deactivate();
}
function gt() {
	var e = Gn, t = e.b, n = Dt, r = !!t?.is_rendered();
	return t?.update_pending_count(1, n), n.increment(r, e), () => {
		t?.update_pending_count(-1, n), n.decrement(r, e);
	};
}
/*#__NO_SIDE_EFFECTS__*/
function _t(e) {
	var t = 2 | g;
	return Gn !== null && (Gn.f |= C), {
		ctx: Ve,
		deps: null,
		effects: null,
		equals: Fe,
		f: t,
		fn: e,
		reactions: null,
		rv: 0,
		v: j,
		wv: 0,
		parent: Gn,
		ac: null
	};
}
var vt = Symbol("obsolete");
/*#__NO_SIDE_EFFECTS__*/
function yt(e, t, n) {
	let r = Gn;
	r === null && fe();
	var i = void 0, a = Jt(j), o = !Hn, s = /* @__PURE__ */ new Set();
	return Cn(() => {
		var t = Gn, n = p();
		i = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, (e) => {
				e !== ue && n.reject(e);
			}).finally(P);
		} catch (e) {
			n.reject(e), P();
		}
		var c = Dt;
		if (o) {
			if (t.f & 32768) var l = gt();
			if (r.b?.is_rendered()) c.async_deriveds.get(t)?.reject(vt);
			else for (let e of s.values()) e.reject(vt);
			s.add(n), c.async_deriveds.set(t, n);
		}
		let u = (e, t = void 0) => {
			l?.(), s.delete(n), t !== vt && (c.activate(), t ? (a.f |= te, Xt(a, t)) : (a.f & 8388608 && (a.f ^= te), Xt(a, e)), c.deactivate());
		};
		n.promise.then(u, (e) => u(null, e || "unknown"));
	}), vn(() => {
		for (let e of s) e.reject(vt);
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
function F(e) {
	let t = /* @__PURE__ */ _t(e);
	return Jn(t), t;
}
/*#__NO_SIDE_EFFECTS__*/
function bt(e) {
	let t = /* @__PURE__ */ _t(e);
	return t.equals = Le, t;
}
function xt(e) {
	var t = e.effects;
	if (t !== null) {
		e.effects = null;
		for (var n = 0; n < t.length; n += 1) An(t[n]);
	}
}
function St(e) {
	var t, n = Gn, r = e.parent;
	if (!Bn && r !== null && e.v !== j && r.f & 24576) return we(), e.v;
	Kn(r);
	try {
		e.f &= ~E, xt(e), t = or(e);
	} finally {
		Kn(n);
	}
	return t;
}
function Ct(e) {
	var t = St(e);
	if (!e.equals(t) && (e.wv = rr(), (!Dt?.is_fork || e.deps === null) && (Dt === null ? e.v = t : (Dt.capture(e, t, !0), Ot?.capture(e, t, !0)), e.deps === null))) {
		$e(e, h);
		return;
	}
	Bn || (kt === null ? et(e) : (_n() || Dt?.is_fork) && kt.set(e, t));
}
function wt(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac !== null && N(() => {
		t.ac.abort(ue), t.ac = null;
	}), t.fn !== null && (t.teardown = d), cr(t, 0), On(t));
}
function Tt(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && lr(t);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/batch.js
var Et = null, Dt = null, Ot = null, kt = null, At = null, jt = !1, Mt = !1, Nt = null, Pt = null, Ft = 0, It = 1, Lt = class e {
	id = It++;
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
		Et === null ? Et = this : (Et.#n = this, this.#t = Et), Et = this;
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
			for (var r of n.d) $e(r, g), t(r);
			for (r of n.m) $e(r, _), t(r);
		}
		this.#p.add(e);
	}
	#g() {
		this.#e = !0, Ft++ > 1e3 && (this.#x(), zt());
		for (let e of this.#u) this.#d.delete(e), $e(e, g), this.schedule(e);
		for (let e of this.#d) $e(e, _), this.schedule(e);
		let t = this.#c;
		this.#c = [], this.apply();
		var n = Nt = [], r = [], i = Pt = [];
		for (let e of t) try {
			this.#_(e, n, r);
		} catch (t) {
			throw Wt(e), this.#h() || this.discard(), t;
		}
		if (Dt = null, i.length > 0) {
			var a = e.ensure();
			for (let e of i) a.schedule(e);
		}
		if (Nt = null, Pt = null, this.#h()) {
			this.#b(r), this.#b(n);
			for (let [e, t] of this.#f) Ut(e, t);
			i.length > 0 && Dt.#g();
			return;
		}
		let o = this.#v();
		if (o) {
			this.#b(r), this.#b(n), o.#y(this);
			return;
		}
		this.#u.clear(), this.#d.clear();
		for (let e of this.#r) e(this);
		this.#r.clear(), Ot = this, Vt(r), Vt(n), Ot = null, this.#s?.resolve();
		var s = Dt;
		if (this.#a === 0 && (this.#c.length === 0 || s !== null) && this.#x(), this.#c.length > 0) if (s !== null) {
			let e = s;
			e.#c.push(...this.#c.filter((t) => !e.#c.includes(t)));
		} else s = this;
		s !== null && s.#g();
	}
	#_(e, t, n) {
		e.f ^= h;
		for (var r = e.first; r !== null;) {
			var i = r.f, a = !!(i & 96);
			if (!(a && i & 1024 || i & 8192 || this.#f.has(r)) && r.fn !== null) {
				a ? r.f ^= h : i & 4 ? t.push(r) : ir(r) && (i & 16 && this.#d.add(r), lr(r));
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
					r & 4194320 && !this.async_deriveds.has(i) && (this.#d.delete(i), $e(i, g), this.schedule(i));
				}
			}
		};
		for (let e of this.current.keys()) t(e);
		this.oncommit(() => e.discard()), e.#x(), Dt = this, this.#g();
	}
	#b(e) {
		for (var t = 0; t < e.length; t += 1) nt(e[t], this.#u, this.#d);
	}
	capture(e, t, n = !1) {
		e.v !== j && !this.previous.has(e) && this.previous.set(e, e.v), e.f & 8388608 || (this.current.set(e, [t, n]), kt?.set(e, t)), this.is_fork || (e.v = t);
	}
	activate() {
		Dt = this;
	}
	deactivate() {
		Dt = null, kt = null;
	}
	flush() {
		try {
			Mt = !0, Dt = this, this.#g();
		} finally {
			Ft = 0, At = null, Nt = null, Pt = null, Mt = !1, Dt = null, kt = null, Kt.clear();
		}
	}
	discard() {
		for (let e of this.#i) e(this);
		this.#i.clear();
		for (let e of this.async_deriveds.values()) e.reject(vt);
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
		this.#m || (this.#m = !0, Je(() => {
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
		return (this.#s ??= p()).promise;
	}
	static ensure() {
		if (Dt === null) {
			let t = Dt = new e();
			!Mt && !jt && Je(() => {
				t.#e || t.flush();
			});
		}
		return Dt;
	}
	apply() {
		kt = null;
	}
	schedule(e) {
		if (At = e, e.b?.is_pending && e.f & 16777228 && !(e.f & 32768)) {
			e.b.defer_effect(e);
			return;
		}
		for (var t = e; t.parent !== null;) {
			t = t.parent;
			var n = t.f;
			if (Nt !== null && t === Gn && (Hn === null || !(Hn.f & 2))) return;
			if (n & 96) {
				if (!(n & 1024)) return;
				t.f ^= h;
			}
		}
		this.#c.push(t);
	}
	#x() {
		if (this.linked) {
			var e = this.#t, t = this.#n;
			e === null || (e.#n = t), t === null ? Et = e : t.#t = e, this.linked = !1;
		}
	}
};
function Rt(e) {
	var t = jt;
	jt = !0;
	try {
		var n;
		for (e && (Dt !== null && !Dt.is_fork && Dt.flush(), n = e());;) {
			if (Ye(), Dt === null) return n;
			Dt.flush();
		}
	} finally {
		jt = t;
	}
}
function zt() {
	try {
		ge();
	} catch (e) {
		Ze(e, At);
	}
}
var Bt = null;
function Vt(e) {
	var t = e.length;
	if (t !== 0) {
		for (var n = 0; n < t;) {
			var r = e[n++];
			if (!(r.f & 24576) && ir(r) && (Bt = /* @__PURE__ */ new Set(), lr(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && Mn(r), Bt?.size > 0)) {
				Kt.clear();
				for (let e of Bt) {
					if (e.f & 24576) continue;
					let t = [e], n = e.parent;
					for (; n !== null;) Bt.has(n) && (Bt.delete(n), t.push(n)), n = n.parent;
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || lr(n);
					}
				}
				Bt.clear();
			}
		}
		Bt = null;
	}
}
function Ht(e) {
	Dt.schedule(e);
}
function Ut(e, t) {
	if (!(e.f & 32 && e.f & 1024)) {
		e.f & 2048 ? t.d.push(e) : e.f & 4096 && t.m.push(e), $e(e, h);
		for (var n = e.first; n !== null;) Ut(n, t), n = n.next;
	}
}
function Wt(e) {
	$e(e, h);
	for (var t = e.first; t !== null;) Wt(t), t = t.next;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/sources.js
var Gt = /* @__PURE__ */ new Set(), Kt = /* @__PURE__ */ new Map(), qt = !1;
function Jt(e, t) {
	return {
		f: 0,
		v: e,
		reactions: null,
		equals: Fe,
		rv: 0,
		wv: 0
	};
}
/*#__NO_SIDE_EFFECTS__*/
function I(e, t) {
	let n = Jt(e, t);
	return Jn(n), n;
}
/*#__NO_SIDE_EFFECTS__*/
function Yt(e, t = !1, n = !0) {
	let r = Jt(e);
	return t || (r.equals = Le), r;
}
function L(e, t, n = !1) {
	return Hn !== null && (!Un || Hn.f & 131072) && Ge() && Hn.f & 4325394 && (qn === null || !qn.has(e)) && ve(), Xt(e, n ? en(t) : t, Pt);
}
function Xt(e, t, n = null) {
	if (!e.equals(t)) {
		Kt.set(e, Bn ? t : e.v);
		var r = Lt.ensure();
		if (r.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && St(t), kt === null && et(t);
		}
		e.wv = rr(), $t(e, g, n), Ge() && Gn !== null && Gn.f & 1024 && !(Gn.f & 96) && (Zn === null ? Qn([e]) : Zn.push(e)), !r.is_fork && Gt.size > 0 && !qt && Zt();
	}
	return t;
}
function Zt() {
	qt = !1;
	for (let e of Gt) {
		e.f & 1024 && $e(e, _);
		let t;
		try {
			t = ir(e);
		} catch {
			t = !0;
		}
		t && lr(e);
	}
	Gt.clear();
}
function Qt(e) {
	L(e, e.v + 1);
}
function $t(e, t, n) {
	var r = e.reactions;
	if (r !== null) for (var i = Ge(), a = r.length, o = 0; o < a; o++) {
		var s = r[o], c = s.f;
		if (!(!i && s === Gn)) {
			var l = (c & g) === 0;
			if (l && $e(s, t), c & 131072) Gt.add(s);
			else if (c & 2) {
				var u = s;
				kt?.delete(u), c & 65536 || (c & 512 && (Gn === null || !(Gn.f & 2097152)) && (s.f |= E), $t(u, _, n));
			} else if (l) {
				var d = s;
				c & 16 && Bt !== null && Bt.add(d), n === null ? Ht(d) : n.push(d);
			}
		}
	}
}
function en(t) {
	if (typeof t != "object" || !t || ne in t) return t;
	let n = l(t);
	if (n !== s && n !== c) return t;
	var r = /* @__PURE__ */ new Map(), i = e(t), o = /* @__PURE__ */ I(0), u = null, d = tr, f = (e) => {
		if (tr === d) return e();
		var t = Hn, n = tr;
		Wn(null), nr(d);
		var r = e();
		return Wn(t), nr(n), r;
	};
	return i && r.set("length", /* @__PURE__ */ I(t.length, u)), new Proxy(t, {
		defineProperty(e, t, n) {
			(!("value" in n) || n.configurable === !1 || n.enumerable === !1 || n.writable === !1) && A();
			var i = r.get(t);
			return i === void 0 ? f(() => {
				var e = /* @__PURE__ */ I(n.value, u);
				return r.set(t, e), e;
			}) : L(i, n.value, !0), !0;
		},
		deleteProperty(e, t) {
			var n = r.get(t);
			if (n === void 0) {
				if (t in e) {
					let e = f(() => /* @__PURE__ */ I(j, u));
					r.set(t, e), Qt(o);
				}
			} else L(n, j), Qt(o);
			return !0;
		},
		get(e, n, i) {
			if (n === ne) return t;
			var o = r.get(n), s = n in e;
			if (o === void 0 && (!s || a(e, n)?.writable) && (o = f(() => /* @__PURE__ */ I(en(s ? e[n] : j), u)), r.set(n, o)), o !== void 0) {
				var c = H(o);
				return c === j ? void 0 : c;
			}
			return Reflect.get(e, n, i);
		},
		getOwnPropertyDescriptor(e, t) {
			var n = Reflect.getOwnPropertyDescriptor(e, t);
			if (n && "value" in n) {
				var i = r.get(t);
				i && (n.value = H(i));
			} else if (n === void 0) {
				var a = r.get(t), o = a?.v;
				if (a !== void 0 && o !== j) return {
					enumerable: !0,
					configurable: !0,
					value: o,
					writable: !0
				};
			}
			return n;
		},
		has(e, t) {
			if (t === ne) return !0;
			var n = r.get(t), i = n !== void 0 && n.v !== j || Reflect.has(e, t);
			return (n !== void 0 || Gn !== null && (!i || a(e, t)?.writable)) && (n === void 0 && (n = f(() => /* @__PURE__ */ I(i ? en(e[t]) : j, u)), r.set(t, n)), H(n) === j) ? !1 : i;
		},
		set(e, t, n, s) {
			var c = r.get(t), l = t in e;
			if (i && t === "length") for (var d = n; d < c.v; d += 1) {
				var p = r.get(d + "");
				p === void 0 ? d in e && (p = f(() => /* @__PURE__ */ I(j, u)), r.set(d + "", p)) : L(p, j);
			}
			if (c === void 0) (!l || a(e, t)?.writable) && (c = f(() => /* @__PURE__ */ I(void 0, u)), L(c, en(n)), r.set(t, c));
			else {
				l = c.v !== j;
				var m = f(() => en(n));
				L(c, m);
			}
			var h = Reflect.getOwnPropertyDescriptor(e, t);
			if (h?.set && h.set.call(s, n), !l) {
				if (i && typeof t == "string") {
					var g = r.get("length"), _ = Number(t);
					Number.isInteger(_) && _ >= g.v && L(g, _ + 1);
				}
				Qt(o);
			}
			return !0;
		},
		ownKeys(e) {
			H(o);
			var t = Reflect.ownKeys(e).filter((e) => {
				var t = r.get(e);
				return t === void 0 || t.v !== j;
			});
			for (var [n, i] of r) i.v !== j && !(n in e) && t.push(n);
			return t;
		},
		setPrototypeOf() {
			_e();
		}
	});
}
var tn, nn, rn, an;
function on() {
	if (tn === void 0) {
		tn = window, nn = /Firefox/.test(navigator.userAgent);
		var e = Element.prototype, t = Node.prototype, n = Text.prototype;
		rn = a(t, "firstChild").get, an = a(t, "nextSibling").get, u(e) && (e[oe] = void 0, e[ae] = null, e[se] = void 0, e.__e = void 0), u(n) && (n[ce] = void 0);
	}
}
function sn(e = "") {
	return document.createTextNode(e);
}
/*@__NO_SIDE_EFFECTS__*/
function cn(e) {
	return rn.call(e);
}
/*@__NO_SIDE_EFFECTS__*/
function ln(e) {
	return an.call(e);
}
function R(e, t) {
	if (!De) return /* @__PURE__ */ cn(e);
	var n = /* @__PURE__ */ cn(ke);
	if (n === null) n = ke.appendChild(sn());
	else if (t && n.nodeType !== 3) {
		var r = sn();
		return n?.before(r), Ae(r), r;
	}
	return t && pn(n), Ae(n), n;
}
function z(e, t = !1) {
	if (!De) {
		var n = /* @__PURE__ */ cn(e);
		return n instanceof Comment && n.data === "" ? /* @__PURE__ */ ln(n) : n;
	}
	if (t) {
		if (ke?.nodeType !== 3) {
			var r = sn();
			return ke?.before(r), Ae(r), r;
		}
		pn(ke);
	}
	return ke;
}
function B(e, t = 1, n = !1) {
	let r = De ? ke : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ ln(r);
	if (!De) return r;
	if (n) {
		if (r?.nodeType !== 3) {
			var a = sn();
			return r === null ? i?.after(a) : r.before(a), Ae(a), a;
		}
		pn(r);
	}
	return Ae(r), r;
}
function un(e) {
	e.textContent = "";
}
function dn() {
	return !1;
}
function fn(e, t, n) {
	return t == null || t === "http://www.w3.org/1999/xhtml" ? n ? document.createElement(e, { is: n }) : document.createElement(e) : n ? document.createElementNS(t, e, { is: n }) : document.createElementNS(t, e);
}
function pn(e) {
	if (e.nodeValue.length < 65536) return;
	let t = e.nextSibling;
	for (; t !== null && t.nodeType === 3;) t.remove(), e.nodeValue += t.nodeValue, t = e.nextSibling;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/effects.js
function mn(e) {
	Gn === null && (Hn === null && O(e), he()), Bn && me(e);
}
function hn(e, t) {
	var n = t.last;
	n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function gn(e, t) {
	var n = Gn;
	n !== null && n.f & 8192 && (e |= v);
	var r = {
		ctx: Ve,
		deps: null,
		nodes: null,
		f: e | g | 512,
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
	Dt?.register_created_effect(r);
	var i = r;
	if (e & 4) Nt === null ? Lt.ensure().schedule(r) : Nt.push(r);
	else if (t !== null) {
		try {
			lr(r);
		} catch (e) {
			throw An(r), e;
		}
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && (i = i.first, e & 16 && e & 65536 && i !== null && (i.f |= S));
	}
	if (i !== null && (i.parent = n, n !== null && hn(i, n), Hn !== null && Hn.f & 2 && !(e & 64))) {
		var a = Hn;
		(a.effects ??= []).push(i);
	}
	return r;
}
function _n() {
	return Hn !== null && !Un;
}
function vn(e) {
	let t = gn(8, null);
	return $e(t, h), t.teardown = e, t;
}
function yn(e) {
	mn("$effect");
	var t = Gn.f;
	if (!Hn && t & 32 && Ve !== null && !Ve.i) {
		var n = Ve;
		(n.e ??= []).push(e);
	} else return bn(e);
}
function bn(e) {
	return gn(4 | w, e);
}
function xn(e) {
	Lt.ensure();
	let t = gn(64 | C, e);
	return (e = {}) => new Promise((n) => {
		e.outro ? Nn(t, () => {
			An(t), n(void 0);
		}) : (An(t), n(void 0));
	});
}
function Sn(e) {
	return gn(4, e);
}
function Cn(e) {
	return gn(ee | C, e);
}
function wn(e, t = 0) {
	return gn(8 | t, e);
}
function V(e, t = [], n = [], r = []) {
	mt(r, t, n, (t) => {
		gn(8, () => {
			e(...t.map(H));
		});
	});
}
function Tn(e, t = 0) {
	return gn(16 | t, e);
}
function En(e) {
	return gn(32 | C, e);
}
function Dn(e) {
	var t = e.teardown;
	if (t !== null) {
		let e = Bn, n = Hn;
		Vn(!0), Wn(null);
		try {
			t.call(null);
		} finally {
			Vn(e), Wn(n);
		}
	}
}
function On(e, t = !1) {
	var n = e.first;
	for (e.first = e.last = null; n !== null;) {
		let e = n.ac;
		e !== null && N(() => {
			e.abort(ue);
		});
		var r = n.next;
		n.f & 64 ? n.parent = null : An(n, t), n = r;
	}
}
function kn(e) {
	for (var t = e.first; t !== null;) {
		var n = t.next;
		t.f & 32 || An(t), t = n;
	}
}
function An(e, t = !0) {
	var n = !1;
	(t || e.f & 262144) && e.nodes !== null && e.nodes.end !== null && (jn(e.nodes.start, e.nodes.end), n = !0), e.f |= x, On(e, t && !n), cr(e, 0);
	var r = e.nodes && e.nodes.t;
	if (r !== null) for (let e of r) e.stop();
	Dn(e), e.f ^= x, e.f |= y;
	var i = e.parent;
	i !== null && i.first !== null && Mn(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function jn(e, t) {
	for (; e !== null;) {
		var n = e === t ? null : /* @__PURE__ */ ln(e);
		e.remove(), e = n;
	}
}
function Mn(e) {
	var t = e.parent, n = e.prev, r = e.next;
	n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function Nn(e, t, n = !0) {
	var r = [];
	Pn(e, r, !0);
	var i = () => {
		n && An(e), t && t();
	}, a = r.length;
	if (a > 0) {
		var o = () => --a || i();
		for (var s of r) s.out(o);
	} else i();
}
function Pn(e, t, n) {
	if (!(e.f & 8192)) {
		e.f ^= v;
		var r = e.nodes && e.nodes.t;
		if (r !== null) for (let e of r) (e.is_global || n) && t.push(e);
		for (var i = e.first; i !== null;) {
			var a = i.next;
			if (!(i.f & 64)) {
				var o = !!(i.f & 65536) || !!(i.f & 32) && !!(e.f & 16);
				Pn(i, t, o ? n : !1);
			}
			i = a;
		}
	}
}
function Fn(e) {
	In(e, !0);
}
function In(e, t) {
	if (e.f & 8192) {
		e.f ^= v, e.f & 1024 || ($e(e, g), Lt.ensure().schedule(e));
		for (var n = e.first; n !== null;) {
			var r = n.next, i = !!(n.f & 65536) || !!(n.f & 32);
			In(n, i ? t : !1), n = r;
		}
		var a = e.nodes && e.nodes.t;
		if (a !== null) for (let e of a) (e.is_global || t) && e.in();
	}
}
function Ln(e, t) {
	if (e.nodes) for (var n = e.nodes.start, r = e.nodes.end; n !== null;) {
		var i = n === r ? null : /* @__PURE__ */ ln(n);
		t.append(n), n = i;
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/legacy.js
var Rn = null, zn = !1, Bn = !1;
function Vn(e) {
	Bn = e;
}
var Hn = null, Un = !1;
function Wn(e) {
	Hn = e;
}
var Gn = null;
function Kn(e) {
	Gn = e;
}
var qn = null;
function Jn(e) {
	Hn !== null && (qn ??= /* @__PURE__ */ new Set()).add(e);
}
var Yn = null, Xn = 0, Zn = null;
function Qn(e) {
	Zn = e;
}
var $n = 1, er = 0, tr = er;
function nr(e) {
	tr = e;
}
function rr() {
	return ++$n;
}
function ir(e) {
	var t = e.f;
	if (t & 2048) return !0;
	if (t & 2 && (e.f &= ~E), t & 4096) {
		for (var n = e.deps, r = n.length, i = 0; i < r; i++) {
			var a = n[i];
			if (ir(a) && Ct(a), a.wv > e.wv) return !0;
		}
		t & 512 && kt === null && $e(e, h);
	}
	return !1;
}
function ar(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(qn !== null && qn.has(e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? ar(a, t, !1) : t === a && (n ? $e(a, g) : a.f & 1024 && $e(a, _), Ht(a));
	}
}
function or(e) {
	var t = Yn, n = Xn, r = Zn, i = Hn, a = qn, o = Ve, s = Un, c = tr, l = e.f;
	Yn = null, Xn = 0, Zn = null, Hn = l & 96 ? null : e, qn = null, He(e.ctx), Un = !1, tr = ++er, e.ac !== null && (N(() => {
		e.ac.abort(ue);
	}), e.ac = null);
	try {
		e.f |= D;
		var u = e.fn, d = u();
		e.f |= b;
		var f = e.deps, p = Dt?.is_fork;
		if (Yn !== null) {
			var m;
			if (p || cr(e, Xn), f !== null && Xn > 0) for (f.length = Xn + Yn.length, m = 0; m < Yn.length; m++) f[Xn + m] = Yn[m];
			else e.deps = f = Yn;
			if (_n() && e.f & 512) for (m = Xn; m < f.length; m++) (f[m].reactions ??= []).push(e);
		} else !p && f !== null && Xn < f.length && (cr(e, Xn), f.length = Xn);
		if (Ge() && Zn !== null && !Un && f !== null && !(e.f & 6146)) for (m = 0; m < Zn.length; m++) ar(Zn[m], e);
		if (i !== null && i !== e) {
			if (er++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = er;
			if (t !== null) for (let e of t) e.rv = er;
			Zn !== null && (r === null ? r = Zn : r.push(...Zn));
		}
		return e.f & 8388608 && (e.f ^= te), d;
	} catch (e) {
		return Xe(e);
	} finally {
		e.f ^= D, Yn = t, Xn = n, Zn = r, Hn = i, qn = a, He(o), Un = s, tr = c;
	}
}
function sr(e, r) {
	let i = r.reactions;
	if (i !== null) {
		var a = t.call(i, e);
		if (a !== -1) {
			var o = i.length - 1;
			o === 0 ? i = r.reactions = null : (i[a] = i[o], i.pop());
		}
	}
	if (i === null && r.f & 2 && (Yn === null || !n.call(Yn, r))) {
		var s = r;
		s.f & 512 && (s.f ^= 512, s.f &= ~E), s.v !== j && et(s), s.ac !== null && N(() => {
			s.ac.abort(ue), s.ac = null, $e(s, g);
		}), wt(s), cr(s, 0);
	}
}
function cr(e, t) {
	var n = e.deps;
	if (n !== null) for (var r = t; r < n.length; r++) sr(e, n[r]);
}
function lr(e) {
	var t = e.f;
	if (!(t & 16384)) {
		$e(e, h);
		var n = Gn, r = zn;
		Gn = e, zn = !(t & 96);
		try {
			t & 16777232 ? kn(e) : On(e), Dn(e);
			var i = or(e);
			e.teardown = typeof i == "function" ? i : null, e.wv = $n;
		} finally {
			zn = r, Gn = n;
		}
	}
}
async function ur() {
	await Promise.resolve(), Rt();
}
function H(e) {
	var t = !!(e.f & 2);
	if (Rn?.add(e), Hn !== null && !Un && !(Gn !== null && Gn.f & 16384) && (qn === null || !qn.has(e))) {
		var r = Hn.deps;
		if (Hn.f & 2097152) e.rv < er && (e.rv = er, Yn === null && r !== null && r[Xn] === e ? Xn++ : Yn === null ? Yn = [e] : Yn.push(e));
		else {
			Hn.deps ??= [], n.call(Hn.deps, e) || Hn.deps.push(e);
			var i = e.reactions;
			i === null ? e.reactions = [Hn] : n.call(i, Hn) || i.push(Hn);
		}
	}
	if (Bn && Kt.has(e)) return Kt.get(e);
	if (t) {
		var a = e;
		if (Bn) {
			var o = a.v;
			return (!(a.f & 1024) && a.reactions !== null || fr(a)) && (o = St(a)), Kt.set(a, o), o;
		}
		var s = !(a.f & 512) && !Un && Hn !== null && (zn || !!(Hn.f & 512)), c = (a.f & b) === 0;
		ir(a) && (s && (a.f |= 512), Ct(a)), s && !c && (Tt(a), dr(a));
	}
	if (kt?.has(e)) return kt.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function dr(e) {
	if (e.f |= 512, e.deps !== null) for (let t of e.deps) (t.reactions ??= []).push(e), t.f & 2 && !(t.f & 512) && (Tt(t), dr(t));
}
function fr(e) {
	if (e.v === j) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if (Kt.has(t) || t.f & 2 && fr(t)) return !0;
	return !1;
}
function pr(e) {
	var t = Un;
	try {
		return Un = !0, e();
	} finally {
		Un = t;
	}
}
[.../* @__PURE__ */ "allowfullscreen.async.autofocus.autoplay.checked.controls.default.disabled.formnovalidate.indeterminate.inert.ismap.loop.multiple.muted.nomodule.novalidate.open.playsinline.readonly.required.reversed.seamless.selected.webkitdirectory.defer.disablepictureinpicture.disableremoteplayback".split(".")];
var mr = ["touchstart", "touchmove"];
function hr(e) {
	return mr.includes(e);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/events.js
var gr = Symbol("events"), _r = /* @__PURE__ */ new Set(), vr = /* @__PURE__ */ new Set();
function yr(e) {
	if (!De) return;
	e.removeAttribute("onload"), e.removeAttribute("onerror");
	let t = e.__e;
	t !== void 0 && (e.__e = void 0, queueMicrotask(() => {
		e.isConnected && e.dispatchEvent(t);
	}));
}
function br(e, t, n, r = {}) {
	function i(e) {
		if (r.capture || wr.call(t, e), !e.cancelBubble) return N(() => n?.call(this, e));
	}
	return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? Je(() => {
		t.addEventListener(e, i, r);
	}) : t.addEventListener(e, i, r), i;
}
function xr(e, t, n, r, i) {
	var a = {
		capture: r,
		passive: i
	}, o = br(e, t, n, a);
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && vn(() => {
		t.removeEventListener(e, o, a);
	});
}
function U(e, t, n) {
	(t[gr] ??= {})[e] = n;
}
function Sr(e) {
	for (var t = 0; t < e.length; t++) _r.add(e[t]);
	for (var n of vr) n(e);
}
var Cr = null;
function wr(e) {
	var t = this, n = t.ownerDocument, r = e.type, a = e.composedPath?.() || [], o = a[0] || e.target;
	Cr = e;
	var s = 0, c = Cr === e && e[gr];
	if (c) {
		var l = a.indexOf(c);
		if (l !== -1 && (t === document || t === window)) {
			e[gr] = t;
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
		var d = Hn, f = Gn;
		Wn(null), Kn(null);
		try {
			for (var p, m = []; o !== null && o !== t;) {
				try {
					var h = o[gr]?.[r];
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
			e[gr] = t, delete e.currentTarget, Wn(d), Kn(f);
		}
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/reconciler.js
var Tr = globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", { createHTML: (e) => e });
function Er(e) {
	return Tr?.createHTML(e) ?? e;
}
function Dr(e) {
	var t = fn("template");
	return t.innerHTML = Er(e.replaceAll("<!>", "<!---->")), t.content;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/template.js
function Or(e, t) {
	var n = Gn;
	n.nodes === null && (n.nodes = {
		start: e,
		end: t,
		a: null,
		t: null
	});
}
/*#__NO_SIDE_EFFECTS__*/
function W(e, t) {
	var n = !!(t & 1), r = !!(t & 2), i, a = !e.startsWith("<!>");
	return () => {
		if (De) return Or(ke, null), ke;
		i === void 0 && (i = Dr(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ cn(i)));
		var t = r || nn ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ cn(t), s = t.lastChild;
			Or(o, s);
		} else Or(t, t);
		return t;
	};
}
function kr(e = "") {
	if (!De) {
		var t = sn(e + "");
		return Or(t, t), t;
	}
	var n = ke;
	return n.nodeType === 3 ? pn(n) : (n.before(n = sn()), Ae(n)), Or(n, n), n;
}
function Ar() {
	if (De) return Or(ke, null), ke;
	var e = document.createDocumentFragment(), t = document.createComment(""), n = sn();
	return e.append(t, n), Or(t, n), e;
}
function G(e, t) {
	if (De) {
		var n = Gn;
		(!(n.f & 32768) || n.nodes.end === null) && (n.nodes.end = ke), je();
		return;
	}
	e !== null && e.before(t);
}
function K(e, t) {
	var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
	n !== (e[ce] ??= e.nodeValue) && (e[ce] = n, e.nodeValue = `${n}`);
}
function jr(e, t) {
	return Nr(e, t);
}
var Mr = /* @__PURE__ */ new Map();
function Nr(e, { target: t, anchor: n, props: i = {}, events: a, context: o, intro: s = !0, transformError: c }) {
	on();
	var l = void 0, u = xn(() => {
		var s = n ?? t.appendChild(sn());
		ft(s, { pending: () => {} }, (t) => {
			Ue({});
			var n = Ve;
			if (o && (n.c = o), a && (i.$$events = a), De && Or(t, null), l = e(t, i) || {}, De && (Gn.nodes.end = ke, ke === null || ke.nodeType !== 8 || ke.data !== "]")) throw Te(), be;
			We();
		}, c);
		var u = /* @__PURE__ */ new Set(), d = (e) => {
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				if (!u.has(r)) {
					u.add(r);
					var i = hr(r);
					for (let e of [t, document]) {
						var a = Mr.get(e);
						a === void 0 && (a = /* @__PURE__ */ new Map(), Mr.set(e, a));
						var o = a.get(r);
						o === void 0 ? (e.addEventListener(r, wr, { passive: i }), a.set(r, 1)) : a.set(r, o + 1);
					}
				}
			}
		};
		return d(r(_r)), vr.add(d), () => {
			for (var e of u) for (let n of [t, document]) {
				var r = Mr.get(n), i = r.get(e);
				--i == 0 ? (n.removeEventListener(e, wr), r.delete(e), r.size === 0 && Mr.delete(n)) : r.set(e, i);
			}
			vr.delete(d), s !== n && s.parentNode?.removeChild(s);
		};
	});
	return Pr.set(l, u), l;
}
var Pr = /* @__PURE__ */ new WeakMap(), Fr = class {
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
			if (n) Fn(n), this.#r.delete(t);
			else {
				var r = this.#n.get(t);
				r && (Fn(r.effect), this.#t.set(t, r.effect), this.#n.delete(t), r.fragment.lastChild.remove(), this.anchor.before(r.fragment), n = r.effect);
			}
			for (let [t, n] of this.#e) {
				if (this.#e.delete(t), t === e) break;
				let r = this.#n.get(n);
				r && (An(r.effect), this.#n.delete(n));
			}
			for (let [e, r] of this.#t) {
				if (e === t || this.#r.has(e)) continue;
				let i = () => {
					if (Array.from(this.#e.values()).includes(e)) {
						var t = document.createDocumentFragment();
						Ln(r, t), t.append(sn()), this.#n.set(e, {
							effect: r,
							fragment: t
						});
					} else An(r);
					this.#r.delete(e), this.#t.delete(e);
				};
				this.#i || !n ? (this.#r.add(e), Nn(r, i, !1)) : i();
			}
		}
	};
	#o = (e) => {
		this.#e.delete(e);
		let t = Array.from(this.#e.values());
		for (let [e, n] of this.#n) t.includes(e) || (An(n.effect), this.#n.delete(e));
	};
	ensure(e, t) {
		var n = Dt, r = dn();
		if (t && !this.#t.has(e) && !this.#n.has(e)) if (r) {
			var i = document.createDocumentFragment(), a = sn();
			i.append(a), this.#n.set(e, {
				effect: En(() => t(a)),
				fragment: i
			});
		} else this.#t.set(e, En(() => t(this.anchor)));
		if (this.#e.set(n, e), r) {
			for (let [t, r] of this.#t) t === e ? n.unskip_effect(r) : n.skip_effect(r);
			for (let [t, r] of this.#n) t === e ? n.unskip_effect(r.effect) : n.skip_effect(r.effect);
			n.oncommit(this.#a), n.ondiscard(this.#o);
		} else De && (this.anchor = ke), this.#a(n);
	}
};
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/if.js
function q(e, t, n = !1) {
	var r;
	De && (r = ke, je());
	var i = new Fr(e), a = n ? S : 0;
	function o(e, t) {
		if (De) {
			var n = Pe(r);
			if (e !== parseInt(n.substring(1))) {
				var a = Ne();
				Ae(a), i.anchor = a, Oe(!1), i.ensure(e, t), Oe(!0);
				return;
			}
		}
		i.ensure(e, t);
	}
	Tn(() => {
		var e = !1;
		t((t, n = 0) => {
			e = !0, o(n, t);
		}), e || o(-1, null);
	}, a);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/each.js
function Ir(e, t) {
	return t;
}
function Lr(e, t, n) {
	for (var i = [], a = t.length, o, s = t.length, c = 0; c < a; c++) {
		let n = t[c];
		Nn(n, () => {
			if (o) {
				if (o.pending.delete(n), o.done.add(n), o.pending.size === 0) {
					var t = e.outrogroups;
					Rr(e, r(o.done)), t.delete(o), t.size === 0 && (e.outrogroups = null);
				}
			} else --s;
		}, !1);
	}
	if (s === 0) {
		var l = i.length === 0 && n !== null;
		if (l) {
			var u = n, d = u.parentNode;
			un(d), d.append(u), e.items.clear();
		}
		Rr(e, t, !l);
	} else o = {
		pending: new Set(t),
		done: /* @__PURE__ */ new Set()
	}, (e.outrogroups ??= /* @__PURE__ */ new Set()).add(o);
}
function Rr(e, t, n = !0) {
	var r;
	if (e.pending.size > 0) {
		r = /* @__PURE__ */ new Set();
		for (let t of e.pending.values()) for (let n of t) r.add(e.items.get(n).e);
	}
	for (var i = 0; i < t.length; i++) {
		var a = t[i];
		r?.has(a) ? (a.f |= T, Ln(a, document.createDocumentFragment())) : An(t[i], n);
	}
}
var zr;
function Br(t, n, i, a, o, s = null) {
	var c = t, l = /* @__PURE__ */ new Map();
	if (n & 4) {
		var u = t;
		c = De ? Ae(/* @__PURE__ */ cn(u)) : u.appendChild(sn());
	}
	De && je();
	var d = null, f = /* @__PURE__ */ bt(() => {
		var t = i();
		return e(t) ? t : t == null ? [] : r(t);
	}), p, m = /* @__PURE__ */ new Map(), h = !0;
	function g(e) {
		v.effect.f & 16384 || (v.pending.delete(e), v.fallback = d, Hr(v, p, c, n, a), d !== null && (p.length === 0 ? d.f & 33554432 ? (d.f ^= T, Wr(d, null, c)) : Fn(d) : Nn(d, () => {
			d = null;
		})));
	}
	function _(e) {
		v.pending.delete(e);
	}
	var v = {
		effect: Tn(() => {
			p = H(f);
			var e = p.length;
			let t = !1;
			De && Pe(c) === "[!" != (e === 0) && (c = Ne(), Ae(c), Oe(!1), t = !0);
			for (var r = /* @__PURE__ */ new Set(), u = Dt, v = dn(), y = 0; y < e; y += 1) {
				De && ke.nodeType === 8 && ke.data === "]" && (c = ke, t = !0, Oe(!1));
				var b = p[y], x = a(b, y), S = h ? null : l.get(x);
				S ? (S.v && Xt(S.v, b), S.i && Xt(S.i, y), v && u.unskip_effect(S.e)) : (S = Ur(l, h ? c : zr ??= sn(), b, x, y, o, n, i), h || (S.e.f |= T), l.set(x, S)), r.add(x);
			}
			if (e === 0 && s && !d && (h ? d = En(() => s(c)) : (d = En(() => s(zr ??= sn())), d.f |= T)), e > r.size && pe("", "", ""), De && e > 0 && Ae(Ne()), !h) if (m.set(u, r), v) {
				for (let [e, t] of l) r.has(e) || u.skip_effect(t.e);
				u.oncommit(g), u.ondiscard(_);
			} else g(u);
			t && Oe(!0), H(f);
		}),
		flags: n,
		items: l,
		pending: m,
		outrogroups: null,
		fallback: d
	};
	h = !1, De && (c = ke);
}
function Vr(e) {
	for (; e !== null && !(e.f & 32);) e = e.next;
	return e;
}
function Hr(e, t, n, i, a) {
	var o = !!(i & 8), s = t.length, c = e.items, l = Vr(e.effect.first), u, d = null, f, p = [], m = [], h, g, _, v;
	if (o) for (v = 0; v < s; v += 1) h = t[v], g = a(h, v), _ = c.get(g).e, _.f & 33554432 || (_.nodes?.a?.measure(), (f ??= /* @__PURE__ */ new Set()).add(_));
	for (v = 0; v < s; v += 1) {
		if (h = t[v], g = a(h, v), _ = c.get(g).e, e.outrogroups !== null) for (let t of e.outrogroups) t.pending.delete(_), t.done.delete(_);
		if (_.f & 8192 && (Fn(_), o && (_.nodes?.a?.unfix(), (f ??= /* @__PURE__ */ new Set()).delete(_))), _.f & 33554432) if (_.f ^= T, _ === l) Wr(_, null, n);
		else {
			var y = d ? d.next : l;
			_ === e.effect.last && (e.effect.last = _.prev), _.prev && (_.prev.next = _.next), _.next && (_.next.prev = _.prev), Gr(e, d, _), Gr(e, _, y), Wr(_, y, n), d = _, p = [], m = [], l = Vr(d.next);
			continue;
		}
		if (_ !== l) {
			if (u !== void 0 && u.has(_)) {
				if (p.length < m.length) {
					var b = m[0], x;
					d = b.prev;
					var S = p[0], C = p[p.length - 1];
					for (x = 0; x < p.length; x += 1) Wr(p[x], b, n);
					for (x = 0; x < m.length; x += 1) u.delete(m[x]);
					Gr(e, S.prev, C.next), Gr(e, d, S), Gr(e, C, b), l = b, d = C, --v, p = [], m = [];
				} else u.delete(_), Wr(_, l, n), Gr(e, _.prev, _.next), Gr(e, _, d === null ? e.effect.first : d.next), Gr(e, d, _), d = _;
				continue;
			}
			for (p = [], m = []; l !== null && l !== _;) (u ??= /* @__PURE__ */ new Set()).add(l), m.push(l), l = Vr(l.next);
			if (l === null) continue;
		}
		_.f & 33554432 || p.push(_), d = _, l = Vr(_.next);
	}
	if (e.outrogroups !== null) {
		for (let t of e.outrogroups) t.pending.size === 0 && (Rr(e, r(t.done)), e.outrogroups?.delete(t));
		e.outrogroups.size === 0 && (e.outrogroups = null);
	}
	if (l !== null || u !== void 0) {
		var w = [];
		if (u !== void 0) for (_ of u) _.f & 8192 || w.push(_);
		for (; l !== null;) !(l.f & 8192) && l !== e.fallback && w.push(l), l = Vr(l.next);
		var E = w.length;
		if (E > 0) {
			var D = i & 4 && s === 0 ? n : null;
			if (o) {
				for (v = 0; v < E; v += 1) w[v].nodes?.a?.measure();
				for (v = 0; v < E; v += 1) w[v].nodes?.a?.fix();
			}
			Lr(e, w, D);
		}
	}
	o && Je(() => {
		if (f !== void 0) for (_ of f) _.nodes?.a?.apply();
	});
}
function Ur(e, t, n, r, i, a, o, s) {
	var c = o & 1 ? o & 16 ? Jt(n) : /* @__PURE__ */ Yt(n, !1, !1) : null, l = o & 2 ? Jt(i) : null;
	return {
		v: c,
		i: l,
		e: En(() => (a(t, c ?? n, l ?? i, s), () => {
			e.delete(r);
		}))
	};
}
function Wr(e, t, n) {
	if (e.nodes) for (var r = e.nodes.start, i = e.nodes.end, a = t && !(t.f & 33554432) ? t.nodes.start : n; r !== null;) {
		var o = /* @__PURE__ */ ln(r);
		if (a.before(r), r === i) return;
		r = o;
	}
}
function Gr(e, t, n) {
	t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
function J(e, t, n = !1, r = !1, i = !1, a = !1) {
	var o = e, s = "";
	if (n) {
		var c = e;
		De && (o = Ae(/* @__PURE__ */ cn(c)));
	}
	V(() => {
		var e = Gn;
		if (s === (s = t() ?? "")) {
			De && je();
			return;
		}
		if (n && !De) {
			e.nodes = null, c.innerHTML = s, s !== "" && Or(/* @__PURE__ */ cn(c), c.lastChild);
			return;
		}
		if (e.nodes !== null && (jn(e.nodes.start, e.nodes.end), e.nodes = null), s !== "") {
			if (De) {
				for (var a = ke.data, l = je(), u = l; l !== null && (l.nodeType !== 8 || l.data !== "");) u = l, l = /* @__PURE__ */ ln(l);
				if (l === null) throw Te(), be;
				Or(ke, u), o = Ae(l);
				return;
			}
			var d = fn(r ? "svg" : i ? "math" : "template", r ? Se : i ? Ce : void 0);
			d.innerHTML = s;
			var f = r || i ? d : d.content;
			if (Or(/* @__PURE__ */ cn(f), f.lastChild), r || i) for (; /* @__PURE__ */ cn(f);) o.before(/* @__PURE__ */ cn(f));
			else o.before(f);
		}
	});
}
//#endregion
//#region node_modules/svelte/src/internal/shared/attributes.js
var Kr = [..." 	\n\r\f\xA0\v﻿"];
function qr(e, t, n) {
	var r = e == null ? "" : "" + e;
	if (t && (r = r ? r + " " + t : t), n) {
		for (var i of Object.keys(n)) if (n[i]) r = r ? r + " " + i : i;
		else if (r.length) for (var a = i.length, o = 0; (o = r.indexOf(i, o)) >= 0;) {
			var s = o + a;
			(o === 0 || Kr.includes(r[o - 1])) && (s === r.length || Kr.includes(r[s])) ? r = (o === 0 ? "" : r.substring(0, o)) + r.substring(s + 1) : o = s;
		}
	}
	return r === "" ? null : r;
}
function Jr(e, t = !1) {
	var n = t ? " !important;" : ";", r = "";
	for (var i of Object.keys(e)) {
		var a = e[i];
		a != null && a !== "" && (r += " " + i + ": " + a + n);
	}
	return r;
}
function Yr(e) {
	return e[0] !== "-" || e[1] !== "-" ? e.toLowerCase() : e;
}
function Xr(e, t) {
	if (t) {
		var n = "", r, i;
		if (Array.isArray(t) ? (r = t[0], i = t[1]) : r = t, e) {
			e = String(e).replaceAll(/\s*\/\*.*?\*\/\s*/g, "").trim();
			var a = !1, o = 0, s = !1, c = [];
			r && c.push(...Object.keys(r).map(Yr)), i && c.push(...Object.keys(i).map(Yr));
			var l = 0, u = -1;
			let t = e.length;
			for (var d = 0; d < t; d++) {
				var f = e[d];
				if (s ? f === "/" && e[d - 1] === "*" && (s = !1) : a ? a === f && (a = !1) : f === "/" && e[d + 1] === "*" ? s = !0 : f === "\"" || f === "'" ? a = f : f === "(" ? o++ : f === ")" && o--, !s && a === !1 && o === 0) {
					if (f === ":" && u === -1) u = d;
					else if (f === ";" || d === t - 1) {
						if (u !== -1) {
							var p = Yr(e.substring(l, u).trim());
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
		return r && (n += Jr(r)), i && (n += Jr(i, !0)), n = n.trim(), n === "" ? null : n;
	}
	return e == null ? null : String(e);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/class.js
function Zr(e, t, n, r, i, a) {
	var o = e[oe];
	if (De || o !== n || o === void 0) {
		var s = qr(n, r, a);
		(!De || s !== e.getAttribute("class")) && (s == null ? e.removeAttribute("class") : t ? e.className = s : e.setAttribute("class", s)), e[oe] = n;
	} else if (a && i !== a) for (var c in a) {
		var l = !!a[c];
		(i == null || l !== !!i[c]) && e.classList.toggle(c, l);
	}
	return a;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/style.js
function Qr(e, t = {}, n, r) {
	for (var i in n) {
		var a = n[i];
		t[i] !== a && (n[i] == null ? e.style.removeProperty(i) : e.style.setProperty(i, a, r));
	}
}
function $r(e, t, n, r) {
	var i = e[se];
	if (De || i !== t) {
		var a = Xr(t, r);
		(!De || a !== e.getAttribute("style")) && (a == null ? e.removeAttribute("style") : e.style.cssText = a), e[se] = t;
	} else r && (Array.isArray(r) ? (Qr(e, n?.[0], r[0]), Qr(e, n?.[1], r[1], "important")) : Qr(e, n, r));
	return r;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/attributes.js
var ei = Symbol("is custom element"), ti = Symbol("is html"), ni = de ? "link" : "LINK", ri = de ? "progress" : "PROGRESS";
function Y(e) {
	if (De) {
		var t = !1, n = () => {
			if (!t) {
				if (t = !0, e.hasAttribute("value")) {
					var n = e.value;
					Z(e, "value", null), e.value = n;
				}
				if (e.hasAttribute("checked")) {
					var r = e.checked;
					Z(e, "checked", null), e.checked = r;
				}
			}
		};
		e[le] = n, Je(n), ct();
	}
}
function X(e, t) {
	var n = ai(e);
	n.value !== (n.value = t ?? void 0) && (e.value !== t || t === 0 && e.nodeName === ri) && (e.value = t ?? "");
}
function ii(e, t) {
	var n = ai(e);
	n.checked !== (n.checked = t ?? void 0) && (e.checked = t);
}
function Z(e, t, n, r) {
	var i = ai(e);
	De && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === ni) || i[t] !== (i[t] = n) && (t === "loading" && (e[ie] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && si(e).includes(t) ? e[t] = n : e.setAttribute(t, n));
}
function ai(e) {
	return e[ae] ??= {
		[ei]: e.nodeName.includes("-"),
		[ti]: e.namespaceURI === xe
	};
}
var oi = /* @__PURE__ */ new Map();
function si(e) {
	var t = e.getAttribute("is") || e.nodeName, n = oi.get(t);
	if (n) return n;
	oi.set(t, n = []);
	for (var r, i = e, a = Element.prototype; a !== i;) {
		for (var s in r = o(i), r) r[s].set && s !== "innerHTML" && s !== "textContent" && s !== "innerText" && n.push(s);
		i = l(i);
	}
	return n;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/input.js
function ci(e, t, n = t) {
	var r = /* @__PURE__ */ new WeakSet();
	lt(e, "input", async (i) => {
		var a = i ? e.defaultValue : e.value;
		if (a = li(e) ? ui(a) : a, n(a), Dt !== null && r.add(Dt), await ur(), a !== (a = t())) {
			var o = e.selectionStart, s = e.selectionEnd, c = e.value.length;
			if (e.value = a ?? "", s !== null) {
				var l = e.value.length;
				o === s && s === c && l > c ? (e.selectionStart = l, e.selectionEnd = l) : (e.selectionStart = o, e.selectionEnd = Math.min(s, l));
			}
		}
	}), (De && e.defaultValue !== e.value || pr(t) == null && e.value) && (n(li(e) ? ui(e.value) : e.value), Dt !== null && r.add(Dt)), wn(() => {
		var n = t();
		if (e === document.activeElement) {
			var i = Dt;
			if (r.has(i)) return;
		}
		li(e) && n === ui(e.value) || e.type === "date" && !n && !e.value || n !== e.value && (e.value = n ?? "");
	});
}
function li(e) {
	var t = e.type;
	return t === "number" || t === "range";
}
function ui(e) {
	return e === "" ? null : +e;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/this.js
function di(e, t) {
	return e === t || e?.[ne] === t;
}
function fi(e = {}, t, n, r) {
	var i = Ve.r, a = Gn;
	return Sn(() => {
		var o, s;
		return wn(() => {
			o = s, s = r?.() || [], pr(() => {
				di(n(...s), e) || (t(e, ...s), o && di(n(...o), e) && t(null, ...o));
			});
		}), () => {
			let r = a;
			for (; r !== i && r.parent !== null && r.parent.f & 33554432;) r = r.parent;
			let o = () => {
				s && di(n(...s), e) && t(null, ...s);
			}, c = r.teardown;
			r.teardown = () => {
				o(), c?.();
			};
		};
	}), e;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/props.js
function pi(e, t, n, r) {
	var i = !0, o = !!(n & 8), s = !!(n & 16), c = r, l = !0, u = void 0, d = () => s && i ? (u ??= /* @__PURE__ */ _t(r), H(u)) : (l && (l = !1, c = s ? pr(r) : r), c);
	let f;
	if (o) {
		var p = ne in e || re in e;
		f = a(e, t)?.set ?? (p && t in e ? (n) => e[t] = n : void 0);
	}
	var m, h = !1;
	o ? [m, h] = it(() => e[t]) : m = e[t], m === void 0 && r !== void 0 && (m = d(), f && (i && k(t), f(m)));
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
	var v = !1, y = (n & 1 ? _t : bt)(() => (v = !1, g()));
	o && H(y);
	var b = Gn;
	return (function(e, t) {
		if (arguments.length > 0) {
			let n = t ? H(y) : i && o ? en(e) : e;
			return L(y, n), v = !0, c !== void 0 && (c = n), e;
		}
		return Bn && v || b.f & 16384 ? y.v : H(y);
	});
}
var mi = {
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
}, hi = [
	"nb",
	"nn",
	"en-GB",
	"se",
	"tr"
], gi = /^[a-z]{2,3}(?:-[A-Za-z0-9]{2,8})*$/, _i = {
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
function vi(e) {
	let t = String(e ?? "").trim().toLowerCase();
	for (let [e, n] of Object.entries(_i)) if (n.some((e) => t === e || t.startsWith(`${e}-`))) return e;
	return null;
}
function yi(e) {
	return hi.includes(String(e ?? ""));
}
function bi(e) {
	let t = [];
	if (!Array.isArray(e)) return ["languages må være en liste"];
	for (let n of e) {
		if (!n || typeof n != "object" || Array.isArray(n)) {
			t.push("languages: hvert innslag må være et objekt");
			continue;
		}
		let e = String(n.code ?? "");
		gi.test(e) ? yi(e) && t.push(`languages: '${e}' er innebygd i Urd og kan ikke overstyres`) : t.push(`languages: '${e}' er ikke en gyldig språkkode`), (typeof n.name != "string" || !n.name.trim()) && t.push(`languages/${e}: name mangler (språkets eget navn)`);
		for (let r of ["site", "admin"]) n[r] !== void 0 && typeof n[r] != "boolean" && t.push(`languages/${e}: ${r} må være boolsk`);
		n.site !== !0 && n.admin !== !0 && t.push(`languages/${e}: må dekke site, admin eller begge`);
	}
	return t;
}
function xi(e) {
	let t = vi(e);
	if (t) return t;
	let n = String(e ?? "").trim();
	return gi.test(n) ? n : "nb";
}
async function Si(e, t) {
	try {
		return await (await import(
			/* @vite-ignore */
			"/assets/urd/language-packs.js"
)).loadPackStrings(e, t);
	} catch {
		return null;
	}
}
({ ...mi.strings });
var Ci = {
	lang: "nb",
	dict: {}
};
function wi(e, t) {
	if (!t) return e;
	let n = e;
	for (let [e, r] of Object.entries(t)) n = n.replaceAll(`{${e}}`, String(r));
	return n;
}
function Q(e, t) {
	return wi(Ci.dict[e] ?? e, t);
}
function Ti(e) {
	let t = `api.${e?.code}`;
	return e?.code && Ci.dict[t] !== void 0 ? wi(Ci.dict[t], e) : e?.error ?? null;
}
function Ei() {
	return Ci.lang;
}
function Di() {
	let e = null;
	try {
		e = localStorage.getItem("urd-admin-lang");
	} catch {}
	if (e) return xi(e);
	for (let e of navigator.languages ?? [navigator.language]) {
		let t = vi(e);
		if (t) return t;
	}
	return "en-GB";
}
var Oi;
new Promise((e) => {
	Oi = e;
});
async function ki(e = Di()) {
	let t = async (e) => (await import(
		/* @vite-ignore */
		`/assets/urd/locales/admin/${e}.js`
)).default.strings;
	Ci.lang = xi(e);
	let n = yi(Ci.lang);
	try {
		Object.assign(Ci.dict, await t("nb")), n && Ci.lang !== "nb" && Object.assign(Ci.dict, await t(Ci.lang));
	} catch {}
	if (!n) {
		let e = await Si(Ci.lang, "admin");
		e ? Object.assign(Ci.dict, e) : Ci.lang = "nb";
	}
	return Oi(Ci.lang), Ci.lang;
}
//#endregion
//#region node_modules/svelte/src/internal/disclose-version.js
typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add("5");
//#endregion
//#region src/lib/draftStore.js
function Ai(e, t, n) {
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
var ji = /* @__PURE__ */ W("<button type=\"button\" class=\"cp-clear svelte-zxiloo\">×</button>"), Mi = /* @__PURE__ */ W("<button type=\"button\" class=\"cp-eye svelte-zxiloo\"><svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M18 2l4 4-3 3-4-4 3-3z\"></path><path d=\"M15 5L4 16l-1 5 5-1L19 9\"></path></svg></button>"), Ni = /* @__PURE__ */ W("<input type=\"number\" min=\"0\" max=\"255\" class=\"svelte-zxiloo\"/>"), Pi = /* @__PURE__ */ W("<button type=\"button\"></button>"), Fi = /* @__PURE__ */ W("<span class=\"cp-label svelte-zxiloo\"> <!></span> <span class=\"cp-tokens svelte-zxiloo\"></span>", 1), Ii = /* @__PURE__ */ W("<span class=\"cp-saved svelte-zxiloo\"><button type=\"button\" class=\"cp-token svelte-zxiloo\"></button> <button type=\"button\" class=\"cp-del svelte-zxiloo\">×</button></span>"), Li = /* @__PURE__ */ W("<span class=\"cp-tokens svelte-zxiloo\"></span>"), Ri = /* @__PURE__ */ W("<button type=\"button\" class=\"cp-token svelte-zxiloo\"></button>"), zi = /* @__PURE__ */ W("<span class=\"cp-label svelte-zxiloo\"> </span> <span class=\"cp-tokens svelte-zxiloo\"></span>", 1), Bi = /* @__PURE__ */ W("<div class=\"cp-pop svelte-zxiloo\"><div class=\"cp-sv svelte-zxiloo\"><span class=\"cp-cursor svelte-zxiloo\"></span></div> <input class=\"cp-hue svelte-zxiloo\" type=\"range\" min=\"0\" max=\"360\" step=\"1\"/> <input class=\"cp-alpha svelte-zxiloo\" type=\"range\" min=\"0\" max=\"100\" step=\"1\"/> <span class=\"cp-row svelte-zxiloo\"><span class=\"cp-preview svelte-zxiloo\"></span> <input class=\"cp-hex svelte-zxiloo\" spellcheck=\"false\"/> <!></span> <span class=\"cp-row cp-rgb svelte-zxiloo\"></span> <!> <span class=\"cp-label cp-label-row svelte-zxiloo\"> <button type=\"button\" class=\"cp-add svelte-zxiloo\">+</button></span> <!> <!></div>"), Vi = /* @__PURE__ */ W("<span class=\"cp svelte-zxiloo\"><button type=\"button\"></button> <!> <!></span>");
function Hi(e, t) {
	Ue(t, !0);
	let n = pi(t, "value", 3, "#000000"), r = pi(t, "tokens", 19, () => []), i = pi(t, "label", 19, () => Q("cp.pickColor")), a = pi(t, "allowClear", 3, !1), o = "urd-recent-colors", s = "urd-saved-colors", c = () => {
		let e = r().find(([e]) => e === n());
		return e ? e[1] : n();
	}, l = () => r().find(([e]) => e === n())?.[0] ?? null, u = /* @__PURE__ */ I(en([])), d = /* @__PURE__ */ I(en([])), f = "", p = "", h = /* @__PURE__ */ I(null), g = /* @__PURE__ */ I(!1), _ = /* @__PURE__ */ I(en({
		top: 0,
		left: 0
	})), v = /* @__PURE__ */ I(0), y = /* @__PURE__ */ I(0), b = /* @__PURE__ */ I(1), x = /* @__PURE__ */ I(1), S = /* @__PURE__ */ I("#000000");
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
	function T(e, t, n) {
		e /= 255, t /= 255, n /= 255;
		let r = Math.max(e, t, n), i = r - Math.min(e, t, n), a = 0;
		return i && (a = r === e ? (t - n) / i % 6 : r === t ? (n - e) / i + 2 : (e - t) / i + 4, a *= 60, a < 0 && (a += 360)), [
			a,
			r ? i / r : 0,
			r
		];
	}
	function E(e, t, n) {
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
	function D() {
		return w(...E(H(v), H(y), H(b)));
	}
	function ee() {
		let e = D();
		return H(x) >= .995 ? e : e + Math.round(H(x) * 255).toString(16).padStart(2, "0");
	}
	function te() {
		L(S, ee(), !0), p = H(S), t.onchange?.(H(S));
	}
	function ne(e) {
		let t = C(e);
		return t ? (((e) => {
			var t = m(e, 3);
			L(v, t[0], !0), L(y, t[1], !0), L(b, t[2], !0);
		})(T(t[0], t[1], t[2])), L(x, t[3], !0), L(S, ee(), !0), !0) : !1;
	}
	function re() {
		ne(c()) || ne("#000000"), f = n(), p = "";
		try {
			let e = JSON.parse(localStorage.getItem(o) ?? "[]");
			L(u, Array.isArray(e) ? e : [], !0);
		} catch {
			L(u, [], !0);
		}
		try {
			let e = JSON.parse(localStorage.getItem(s) ?? "[]");
			L(d, Array.isArray(e) ? e : [], !0);
		} catch {
			L(d, [], !0);
		}
		let e = H(h).getBoundingClientRect(), t = H(h).closest(".panel-body")?.getBoundingClientRect(), r = t ? t.right : window.innerWidth, i = Math.max(8, Math.min(e.right - 236, r - 236 - 8)), a = e.bottom + 380 + 8 > window.innerHeight ? Math.max(8, e.top - 380 - 8) : e.bottom + 6;
		L(_, {
			top: a,
			left: i
		}, !0), L(g, !0);
	}
	function ie() {
		if (L(g, !1), p && p !== f) {
			let e = [p, ...H(u).filter((e) => e !== p)].slice(0, 8);
			localStorage.setItem(o, JSON.stringify(e));
		}
	}
	function ae(e, n) {
		ne(n), L(S, n, !0), t.onchange?.(e);
	}
	function oe(e) {
		let t = e.currentTarget;
		t.setPointerCapture(e.pointerId);
		let n = (e) => {
			let n = t.getBoundingClientRect();
			L(y, Math.min(1, Math.max(0, (e.clientX - n.left) / n.width)), !0), L(b, 1 - Math.min(1, Math.max(0, (e.clientY - n.top) / n.height))), te();
		};
		n(e);
		let r = (e) => n(e), i = () => {
			t.removeEventListener("pointermove", r), t.removeEventListener("pointerup", i);
		};
		t.addEventListener("pointermove", r), t.addEventListener("pointerup", i);
	}
	function se(e) {
		ne(e.target.value) ? te() : L(S, D(), !0);
	}
	function ce(e) {
		return (C(D()) ?? [
			0,
			0,
			0
		])[e];
	}
	function le(e, t) {
		let n = C(D()) ?? [
			0,
			0,
			0
		];
		n[e] = Math.min(255, Math.max(0, Number(t) || 0)), ((e) => {
			var t = m(e, 3);
			L(v, t[0], !0), L(y, t[1], !0), L(b, t[2], !0);
		})(T(...n)), te();
	}
	let ue = typeof window < "u" && "EyeDropper" in window;
	async function de() {
		try {
			ne((await new window.EyeDropper().open()).sRGBHex) && te();
		} catch {}
	}
	function fe(e) {
		ne(e) && te();
	}
	function pe() {
		let e = ee();
		H(d).includes(e) || (L(d, [e, ...H(d)].slice(0, 12), !0), localStorage.setItem(s, JSON.stringify(ze(H(d)))));
	}
	function me(e) {
		L(d, H(d).filter((t) => t !== e), !0), localStorage.setItem(s, JSON.stringify(ze(H(d))));
	}
	yn(() => {
		if (!H(g)) return;
		let e = (e) => {
			H(h) && !H(h).contains(e.target) && ie();
		}, t = (e) => {
			e.key === "Escape" && ie();
		}, n = () => ie();
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t, !0), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t, !0), window.removeEventListener("blur", n);
		};
	});
	var he = Vi(), O = R(he);
	let ge;
	var k = B(O, 2), A = (e) => {
		var n = ji();
		V((e, t) => {
			Z(n, "title", e), Z(n, "aria-label", t);
		}, [() => Q("cp.clearTitle"), () => Q("cp.clear")]), U("click", n, () => t.onchange?.("")), G(e, n);
	};
	q(k, (e) => {
		a() && n() && e(A);
	});
	var _e = B(k, 2), ve = (e) => {
		var t = Bi(), i = R(t), a = R(i);
		M(i);
		var o = B(i, 2);
		Y(o);
		var s = B(o, 2);
		Y(s);
		var c = B(s, 2), f = R(c), p = B(f, 2);
		Y(p);
		var h = B(p, 2), g = (e) => {
			var t = Mi();
			V((e) => Z(t, "title", e), [() => Q("cp.eyedropper")]), U("click", t, de), G(e, t);
		};
		q(h, (e) => {
			ue && e(g);
		}), M(c);
		var C = B(c, 2);
		Br(C, 22, () => [
			"R",
			"G",
			"B"
		], (e) => e, (e, t, n) => {
			var r = Ni();
			Y(r), V((e) => {
				Z(r, "title", t), X(r, e);
			}, [() => ce(H(n))]), U("change", r, (e) => le(H(n), e.target.value)), G(e, r);
		}), M(C);
		var w = B(C, 2), T = (e) => {
			var t = Fi(), i = z(t), a = R(i, !0), o = B(a), s = (e) => {
				var t = kr();
				V((e) => K(t, e), [() => Q("cp.linkedSuffix", { token: l() })]), G(e, t);
			}, c = /* @__PURE__ */ F(() => l());
			q(o, (e) => {
				H(c) && e(s);
			}), M(i);
			var u = B(i, 2);
			Br(u, 21, r, ([e, t]) => e, (e, t) => {
				var r = /* @__PURE__ */ F(() => m(H(t), 2));
				let i = () => H(r)[0], a = () => H(r)[1];
				var o = Pi();
				let s;
				V((e) => {
					s = Zr(o, 1, "cp-token svelte-zxiloo", null, s, { active: n() === i() }), $r(o, `background: ${a() ?? ""}`), Z(o, "title", e);
				}, [() => Q("cp.tokenTitle", { name: i() })]), U("click", o, () => ae(i(), a())), G(e, o);
			}), M(u), V((e) => K(a, e), [() => Q("cp.themeColors")]), G(e, t);
		};
		q(w, (e) => {
			r().length && e(T);
		});
		var E = B(w, 2), ee = R(E), ne = B(ee);
		M(E);
		var re = B(E, 2), ie = (e) => {
			var t = Li();
			Br(t, 20, () => H(d), (e) => e, (e, t) => {
				var n = Ii(), r = R(n), i = B(r, 2);
				M(n), V((e) => {
					$r(r, `background: ${t ?? ""}`), Z(r, "title", t), Z(i, "title", e);
				}, [() => Q("cp.removeSaved")]), U("click", r, () => fe(t)), U("click", i, () => me(t)), G(e, n);
			}), M(t), G(e, t);
		};
		q(re, (e) => {
			H(d).length && e(ie);
		});
		var he = B(re, 2), O = (e) => {
			var t = zi(), n = z(t), r = R(n, !0);
			M(n);
			var i = B(n, 2);
			Br(i, 20, () => H(u), (e) => e, (e, t) => {
				var n = Ri();
				V(() => {
					$r(n, `background: ${t ?? ""}`), Z(n, "title", t);
				}), U("click", n, () => fe(t)), G(e, n);
			}), M(i), V((e) => K(r, e), [() => Q("common.recent")]), G(e, t);
		};
		q(he, (e) => {
			H(u).length && e(O);
		}), M(t), V((e, n, r, c, l) => {
			$r(t, `top: ${H(_).top ?? ""}px; left: ${H(_).left ?? ""}px`), $r(i, `background-image: linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent); background-color: hsl(${H(v) ?? ""}, 100%, 50%)`), $r(a, `left: ${H(y) * 100}%; top: ${(1 - H(b)) * 100}%`), X(o, H(v)), X(s, e), Z(s, "title", n), $r(s, `background: linear-gradient(to right, transparent, ${r ?? ""}), repeating-conic-gradient(rgb(255 255 255 / 35%) 0 25%, rgb(0 0 0 / 35%) 0 50%) 0 0 / 10px 10px`), $r(f, `background: ${H(S) ?? ""}`), X(p, H(S)), K(ee, `${c ?? ""} `), Z(ne, "title", l);
		}, [
			() => Math.round(H(x) * 100),
			() => Q("cp.alpha"),
			() => D(),
			() => Q("cp.saved"),
			() => Q("cp.saveTitle")
		]), U("click", t, (e) => e.preventDefault()), U("pointerdown", i, oe), U("input", o, (e) => {
			L(v, Number(e.target.value), !0), te();
		}), U("input", s, (e) => {
			L(x, Number(e.target.value) / 100), te();
		}), U("change", p, se), U("click", ne, pe), G(e, t);
	};
	q(_e, (e) => {
		H(g) && e(ve);
	}), M(he), fi(he, (e) => L(h, e), () => H(h)), V((e, t, n) => {
		ge = Zr(O, 1, "cp-swatch svelte-zxiloo", null, ge, e), $r(O, `background: ${t ?? ""}`), Z(O, "title", n), Z(O, "aria-label", i());
	}, [
		() => ({
			linked: l(),
			"cp-empty": a() && !n()
		}),
		() => n() ? c() : "transparent",
		() => l() ? Q("cp.linkedTitle", {
			label: i(),
			token: l()
		}) : i()
	]), U("click", O, () => H(g) ? ie() : re()), G(e, he), We();
}
Sr([
	"click",
	"pointerdown",
	"input",
	"change"
]);
//#endregion
//#region ../template/assets/engine/0.6.10/imageTools.js
var Ui = 1600, Wi = .82, Gi = .6;
async function Ki(e, t = Ui) {
	if (Ji(e)) return Yi(await e.text());
	let n = await createImageBitmap(e), r = Math.min(1, t / Math.max(n.width, n.height)), i = Math.round(n.width * r), a = Math.round(n.height * r), o = document.createElement("canvas");
	o.width = i, o.height = a, o.getContext("2d").drawImage(n, 0, 0, i, a), n.close();
	let s = (e) => new Promise((t) => o.toBlob(t, "image/webp", e)), c = await s(Wi);
	return c.size > 4e5 && (c = await s(Gi)), {
		dataUrl: await new Promise((e) => {
			let t = new FileReader();
			t.onload = () => e(t.result), t.readAsDataURL(c);
		}),
		bytes: c.size,
		width: i,
		height: a
	};
}
var qi = "image/svg+xml";
function Ji(e) {
	return e.type === qi || /\.svg$/i.test(e.name || "");
}
function Yi(e) {
	let t = String(e ?? "");
	if (!/<svg[\s>]/i.test(t)) throw Error("Ugyldig SVG");
	if (/<\s*script[\s>]/i.test(t) || /<\s*foreignObject[\s>]/i.test(t) || /\son[a-z]+\s*=/i.test(t) || /javascript:/i.test(t)) throw Error("SVG-en inneholder skript eller hendelser og kan ikke brukes");
	let n = new Blob([t]).size, r = `data:${qi};base64,${btoa(unescape(encodeURIComponent(t)))}`, i = t.match(/<svg\b[^>]*>/i)?.[0] ?? "", a = i.match(/viewBox\s*=\s*["']\s*([-\d.]+(?:[\s,]+[-\d.]+){3})\s*["']/i)?.[1]?.split(/[\s,]+/).map(Number);
	return {
		dataUrl: r,
		bytes: n,
		width: a?.length === 4 ? a[2] : Number.parseFloat(i.match(/\bwidth\s*=\s*["']?([\d.]+)/i)?.[1]) || 0,
		height: a?.length === 4 ? a[3] : Number.parseFloat(i.match(/\bheight\s*=\s*["']?([\d.]+)/i)?.[1]) || 0
	};
}
function Xi(e, t, n = .04) {
	let r = String(e ?? "");
	if (!t || !(t.width > 0) || !(t.height > 0)) return r;
	let i = r.match(/<svg\b[^>]*>/i)?.[0];
	if (!i) return r;
	let a = (e) => Math.round(e * 1e3) / 1e3, o = Math.max(t.width, t.height) * Math.max(0, n), s = a(t.x - o), c = a(t.y - o), l = a(t.width + 2 * o), u = a(t.height + 2 * o), d = i.replace(/\sviewBox\s*=\s*["'][^"']*["']/i, "").replace(/\swidth\s*=\s*["'][^"']*["']/i, "").replace(/\sheight\s*=\s*["'][^"']*["']/i, "").replace(/<svg\b/i, `<svg viewBox="${s} ${c} ${l} ${u}" width="${l}" height="${u}"`);
	return r.replace(i, d);
}
function Zi(e) {
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
function Qi(e) {
	return /^data:image\/svg\+xml[;,]/.test(e || "") ? "svg" : "webp";
}
function $i(e, t = "bilde") {
	return e.replace(/\.[^.]+$/, "").toLowerCase().replaceAll("æ", "ae").replaceAll("ø", "o").replaceAll("å", "a").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) || t;
}
function ea(e) {
	let t = 5381;
	for (let n = 0; n < e.length; n++) t = (t << 5) + t + e.charCodeAt(n) >>> 0;
	return t.toString(16).padStart(8, "0");
}
//#endregion
//#region ../template/assets/engine/0.6.10/glyphs.js
var ta = "urd-recent-glyphs", na = [
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
function ra(e, t) {
	return [t, ...(Array.isArray(e) ? e : []).filter((e) => e !== t)].slice(0, 16);
}
function ia() {
	try {
		let e = JSON.parse(localStorage.getItem("urd-recent-glyphs") ?? "[]");
		return Array.isArray(e) ? e : [];
	} catch {
		return [];
	}
}
function aa(e) {
	let t = ra(ia(), e);
	try {
		localStorage.setItem(ta, JSON.stringify(t));
	} catch {}
	return t;
}
//#endregion
//#region ../template/assets/engine/0.6.10/icons.js
var oa = "fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"", sa = "fill=\"currentColor\" stroke=\"none\"", ca = {
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
}, la = [
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
function ua(e) {
	let t = typeof e == "string" ? ca[e] : null;
	return t ? `<svg viewBox="0 0 24 24" width="100%" height="100%" ${t.fill ? sa : oa} aria-hidden="true" focusable="false">${t.body}</svg>` : null;
}
//#endregion
//#region src/lib/GlyphPicker.svelte
var da = /* @__PURE__ */ W("<img class=\"gp-own svelte-15ln1c3\"/>"), fa = /* @__PURE__ */ W("<span class=\"gp-svg svelte-15ln1c3\"></span>"), pa = /* @__PURE__ */ W("<button type=\"button\" class=\"gp-cell svelte-15ln1c3\"> </button>"), ma = /* @__PURE__ */ W("<div class=\"gp-group svelte-15ln1c3\"> </div> <div class=\"gp-grid svelte-15ln1c3\"></div>", 1), ha = /* @__PURE__ */ W("<button type=\"button\"><span class=\"gp-svg svelte-15ln1c3\"></span></button>"), ga = /* @__PURE__ */ W("<button type=\"button\"> </button>"), _a = /* @__PURE__ */ W("<div class=\"gp-group svelte-15ln1c3\"> </div> <button type=\"button\" class=\"ghost gp-upload svelte-15ln1c3\"> </button> <input type=\"file\" accept=\"image/*\" hidden=\"\"/> <p class=\"gp-hint svelte-15ln1c3\"> </p>", 1), va = /* @__PURE__ */ W("<div class=\"gp-pop svelte-15ln1c3\"><!> <!> <!> <!></div>"), ya = /* @__PURE__ */ W("<span class=\"gp svelte-15ln1c3\"><button type=\"button\" class=\"gp-swatch svelte-15ln1c3\"><!></button> <!></span>");
function ba(e, t) {
	Ue(t, !0);
	let n = pi(t, "value", 3, "★"), r = pi(t, "icon", 3, null), i = pi(t, "image", 3, null), a = pi(t, "label", 19, () => Q("gp.pickGlyph")), o = /* @__PURE__ */ I(en([])), s = /* @__PURE__ */ I(null), c = /* @__PURE__ */ I(null), l = /* @__PURE__ */ I(!1), u = /* @__PURE__ */ I(en({
		top: 0,
		left: 0
	}));
	function d() {
		L(o, ia(), !0);
		let e = H(s).getBoundingClientRect(), t = Math.max(8, Math.min(e.right - 292, window.innerWidth - 292 - 8)), n = e.bottom + 380 + 8 > window.innerHeight ? Math.max(8, e.top - 380 - 8) : e.bottom + 6;
		L(u, {
			top: n,
			left: t
		}, !0), L(l, !0);
	}
	function f(e) {
		aa(e), t.onpick?.(e), L(l, !1);
	}
	function p(e) {
		t.onicon?.(e), L(l, !1);
	}
	async function h(e) {
		let n = e.target.files?.[0];
		if (e.target.value = "", !n) return;
		let r = await Ki(n, 256);
		t.onimage?.(r.dataUrl), L(l, !1);
	}
	yn(() => {
		if (!H(l)) return;
		let e = (e) => {
			H(s) && !H(s).contains(e.target) && L(l, !1);
		}, t = (e) => {
			e.key === "Escape" && L(l, !1);
		}, n = (e) => {
			H(s) && e.target instanceof Node && !H(s).contains(e.target) && L(l, !1);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t, !0), document.addEventListener("scroll", n, !0), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t, !0), document.removeEventListener("scroll", n, !0);
		};
	});
	var g = ya(), _ = R(g), v = R(_), y = (e) => {
		var t = da();
		V((e) => {
			Z(t, "src", i()), Z(t, "alt", e);
		}, [() => Q("gp.ownIcon")]), G(e, t);
	}, b = (e) => {
		var t = fa();
		J(t, () => ua(r()), !0), M(t), G(e, t);
	}, x = (e) => {
		var t = kr();
		V(() => K(t, n() || "★")), G(e, t);
	};
	q(v, (e) => {
		i() ? e(y) : r() && ca[r()] ? e(b, 1) : e(x, -1);
	}), M(_);
	var S = B(_, 2), C = (e) => {
		var i = va(), a = R(i), s = (e) => {
			var t = ma(), n = z(t), r = R(n, !0);
			M(n);
			var i = B(n, 2);
			Br(i, 20, () => H(o), (e) => e, (e, t) => {
				var n = pa(), r = R(n, !0);
				M(n), V(() => K(r, t)), U("click", n, () => f(t)), G(e, n);
			}), M(i), V((e) => K(r, e), [() => Q("common.recent")]), G(e, t);
		};
		q(a, (e) => {
			H(o).length && e(s);
		});
		var l = B(a, 2), d = (e) => {
			var t = Ar();
			Br(z(t), 17, () => la, ([e, t]) => e, (e, t) => {
				var n = /* @__PURE__ */ F(() => m(H(t), 2));
				let i = () => H(n)[0], a = () => H(n)[1];
				var o = ma(), s = z(o), c = R(s, !0);
				M(s);
				var l = B(s, 2);
				Br(l, 20, a, (e) => e, (e, t) => {
					var n = ha();
					let i;
					var a = R(n);
					J(a, () => ua(t), !0), M(a), M(n), V(() => {
						i = Zr(n, 1, "gp-cell gp-cell-icon svelte-15ln1c3", null, i, { active: t === r() }), Z(n, "title", ca[t].label);
					}), U("click", n, () => p(t)), G(e, n);
				}), M(l), V((e) => K(c, e), [() => Q(i())]), G(e, o);
			}), G(e, t);
		};
		q(l, (e) => {
			t.onicon && e(d);
		});
		var g = B(l, 2);
		Br(g, 17, () => na, ([e, t]) => e, (e, t) => {
			var r = /* @__PURE__ */ F(() => m(H(t), 2));
			let i = () => H(r)[0], a = () => H(r)[1];
			var o = ma(), s = z(o), c = R(s, !0);
			M(s);
			var l = B(s, 2);
			Br(l, 20, () => a().split(" "), (e) => e, (e, t) => {
				var r = ga();
				let i;
				var a = R(r, !0);
				M(r), V(() => {
					i = Zr(r, 1, "gp-cell svelte-15ln1c3", null, i, { active: t === n() }), K(a, t);
				}), U("click", r, () => f(t)), G(e, r);
			}), M(l), V((e) => K(c, e), [() => Q(i())]), G(e, o);
		});
		var _ = B(g, 2), v = (e) => {
			var t = _a(), n = z(t), r = R(n, !0);
			M(n);
			var i = B(n, 2), a = R(i, !0);
			M(i);
			var o = B(i, 2);
			fi(o, (e) => L(c, e), () => H(c));
			var s = B(o, 2), l = R(s, !0);
			M(s), V((e, t, n) => {
				K(r, e), K(a, t), K(l, n);
			}, [
				() => Q("gp.ownIcon"),
				() => Q("gp.upload"),
				() => Q("gp.uploadHint")
			]), U("click", i, () => H(c).click()), U("change", o, h), G(e, t);
		};
		q(_, (e) => {
			t.onimage && e(v);
		}), M(i), V(() => $r(i, `top: ${H(u).top ?? ""}px; left: ${H(u).left ?? ""}px`)), G(e, i);
	};
	q(S, (e) => {
		H(l) && e(C);
	}), M(g), fi(g, (e) => L(s, e), () => H(s)), V(() => {
		Z(_, "title", a()), Z(_, "aria-label", a());
	}), U("click", _, () => H(l) ? L(l, !1) : d()), G(e, g), We();
}
Sr(["click", "change"]);
//#endregion
//#region src/lib/previewBridge.js
function xa(e, t = {}) {
	let n = (e) => {
		if (e.origin !== location.origin) return;
		let n = e.data;
		n?.type === "urd-edit" && t.onEdit?.(n), n?.type === "urd-move" && t.onMove?.(n), n?.type === "urd-grow" && t.onGrow?.(n), n?.type === "urd-delete" && t.onDelete?.(n), n?.type === "urd-add-section" && t.onAddSection?.(n), n?.type === "urd-move-section" && t.onMoveSection?.(n), n?.type === "urd-delete-section" && t.onDeleteSection?.(n), n?.type === "urd-section-size" && t.onSectionSize?.(n), n?.type === "urd-undo" && t.onUndo?.(n), n?.type === "urd-select-section" && t.onSelectSection?.(n), n?.type === "urd-select-block" && t.onSelectBlock?.(n), n?.type === "urd-block-menu" && t.onBlockMenu?.(n), n?.type === "urd-plugin-blocks" && t.onPluginBlocks?.(n), n?.type === "urd-ready" && t.onReady?.(n), n?.type === "urd-navigate" && t.onNavigate?.(n), n?.type === "urd-add-block" && t.onAddBlock?.(n), n?.type === "urd-add-blocks" && t.onAddBlocks?.(n), n?.type === "urd-request-block" && t.onRequestBlock?.(n), n?.type === "urd-move-block-section" && t.onMoveBlockSection?.(n), n?.type === "urd-mobile-manual" && t.onMobileManual?.(n), n?.type === "urd-mobile-auto" && t.onMobileAuto?.(n), n?.type === "urd-review-done" && t.onReviewDone?.(n), n?.type === "urd-block-flag" && t.onBlockFlag?.(n), n?.type === "urd-collection-edit" && t.onCollectionEdit?.(n), n?.type === "urd-nav-width" && t.onNavWidth?.(n), n?.type === "urd-save-template" && t.onSaveTemplate?.(n), n?.type === "urd-delete-template" && t.onDeleteTemplate?.(n);
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
		sendViewport(e) {
			r({
				type: "urd-viewport",
				mode: e
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
function Sa(e, t) {
	return !(e > 0) || !(t > 0) ? 1 : e / t;
}
function Ca(e, t, n) {
	let r = n === "full" ? 1 : Math.min(1, Sa(e, t));
	return Math.max(.1, r);
}
//#endregion
//#region src/lib/Dropdown.svelte
var wa = /* @__PURE__ */ W("<button type=\"button\"> </button>"), Ta = /* @__PURE__ */ W("<div class=\"dd-pop svelte-vtocc6\"></div>"), Ea = /* @__PURE__ */ W("<span class=\"dd svelte-vtocc6\"><button type=\"button\" class=\"dd-btn svelte-vtocc6\"><span class=\"dd-value svelte-vtocc6\"> </span> <span class=\"dd-caret svelte-vtocc6\"> </span></button> <!></span>");
function $(e, t) {
	Ue(t, !0);
	let n = pi(t, "value", 3, null), r = pi(t, "options", 19, () => []), i = pi(t, "title", 3, null), a = pi(t, "disabled", 3, !1), o = /* @__PURE__ */ I(!1), s = /* @__PURE__ */ I(null), c = /* @__PURE__ */ I(en({
		top: 0,
		left: 0,
		width: 160
	})), l = () => r().find(([e]) => `${e ?? ""}` == `${n() ?? ""}`)?.[1] ?? "";
	function u() {
		let e = H(s).getBoundingClientRect(), t = Math.min(320, r().length * 32 + 12), n = Math.max(e.width, 160), i = e.bottom + t + 8 <= window.innerHeight;
		L(c, {
			top: i ? e.bottom + 4 : Math.max(8, e.top - t - 4),
			left: Math.max(8, Math.min(e.left, window.innerWidth - n - 8)),
			width: n
		}, !0);
	}
	function d() {
		if (!a()) {
			if (H(o)) {
				L(o, !1);
				return;
			}
			u(), L(o, !0);
		}
	}
	function f(e) {
		L(o, !1), t.onchange?.(e);
	}
	yn(() => {
		if (!H(o)) return;
		let e = (e) => {
			H(s) && !H(s).contains(e.target) && L(o, !1);
		}, t = (e) => {
			e.key === "Escape" && L(o, !1);
		}, n = (e) => {
			H(s) && e.target instanceof Node && !H(s).contains(e.target) && u();
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t, !0), document.addEventListener("scroll", n, !0), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t, !0), document.removeEventListener("scroll", n, !0);
		};
	});
	var p = Ea(), h = R(p), g = R(h), _ = R(g, !0);
	M(g);
	var v = B(g, 2), y = R(v, !0);
	M(v), M(h);
	var b = B(h, 2), x = (e) => {
		var t = Ta();
		Br(t, 21, r, ([e, t]) => `${e ?? ""}`, (e, t) => {
			var r = /* @__PURE__ */ F(() => m(H(t), 2));
			let i = () => H(r)[0], a = () => H(r)[1];
			var o = wa();
			let s;
			var c = R(o, !0);
			M(o), V(() => {
				s = Zr(o, 1, "dd-opt svelte-vtocc6", null, s, { valgt: `${i() ?? ""}` == `${n() ?? ""}` }), K(c, a());
			}), U("click", o, () => f(i())), G(e, o);
		}), M(t), V(() => $r(t, `top: ${H(c).top ?? ""}px; left: ${H(c).left ?? ""}px; min-width: ${H(c).width ?? ""}px`)), G(e, t);
	};
	q(b, (e) => {
		H(o) && e(x);
	}), M(p), fi(p, (e) => L(s, e), () => H(s)), V((e) => {
		Z(h, "title", i()), h.disabled = a(), K(_, e), K(y, H(o) ? "▴" : "▾");
	}, [() => l()]), U("click", h, d), G(e, p), We();
}
Sr(["click"]);
//#endregion
//#region src/lib/IconEditor.svelte
var Da = /* @__PURE__ */ W("<div class=\"ie-overlay svelte-e7sog7\" role=\"dialog\" aria-modal=\"true\"><div class=\"ie-card svelte-e7sog7\"><h2 class=\"svelte-e7sog7\"> </h2> <div class=\"ie-stage svelte-e7sog7\"><canvas class=\"ie-canvas svelte-e7sog7\"></canvas> <p class=\"ie-hint svelte-e7sog7\"> </p></div> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"1\" max=\"3\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0.3\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0.3\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <span class=\"ie-tools svelte-e7sog7\"><button type=\"button\" class=\"ghost svelte-e7sog7\"> </button> <button type=\"button\" class=\"ghost svelte-e7sog7\"> </button></span> <span class=\"ie-actions svelte-e7sog7\"><button type=\"button\" class=\"ghost svelte-e7sog7\"> </button> <button type=\"button\" class=\"primary svelte-e7sog7\"> </button></span></div></div>");
function Oa(e, t) {
	Ue(t, !0);
	let n = pi(t, "image", 3, ""), r = /* @__PURE__ */ I(null), i = /* @__PURE__ */ I(null), a = /* @__PURE__ */ I(1), o = /* @__PURE__ */ I(.5), s = /* @__PURE__ */ I(.5), c = /* @__PURE__ */ I(1), l = /* @__PURE__ */ I(1), u = /* @__PURE__ */ I(1);
	yn(() => {
		if (!n()) return;
		let e = new Image();
		e.onload = () => {
			L(i, e, !0);
		}, e.src = n();
	});
	function d(e, t) {
		if (e.clearRect(0, 0, t, t), !H(i)) return;
		e.filter = `brightness(${H(c)}) contrast(${H(l)}) saturate(${H(u)})`;
		let n = Math.max(t / H(i).width, t / H(i).height) * H(a), r = H(i).width * n, d = H(i).height * n, f = t / 2 - H(o) * r, p = t / 2 - H(s) * d;
		f = Math.min(0, Math.max(t - r, f)), p = Math.min(0, Math.max(t - d, p)), e.drawImage(H(i), f, p, r, d), e.filter = "none";
	}
	yn(() => {
		H(i), H(a), H(o), H(s), H(c), H(l), H(u), H(r) && d(H(r).getContext("2d"), 220);
	});
	function f(e) {
		if (!H(i)) return;
		e.preventDefault();
		let t = e.clientX, n = e.clientY, r = Math.max(220 / H(i).width, 220 / H(i).height) * H(a), c = H(i).width * r, l = H(i).height * r, u = (e) => {
			L(o, Math.min(1, Math.max(0, H(o) - (e.clientX - t) / c)), !0), L(s, Math.min(1, Math.max(0, H(s) - (e.clientY - n) / l)), !0), t = e.clientX, n = e.clientY;
		}, d = () => {
			window.removeEventListener("pointermove", u), window.removeEventListener("pointerup", d);
		};
		window.addEventListener("pointermove", u), window.addEventListener("pointerup", d);
	}
	function p() {
		L(a, 1), L(o, .5), L(s, .5), L(c, 1), L(l, 1), L(u, 1);
	}
	function m() {
		let e = document.createElement("canvas");
		e.width = 128, e.height = 128, d(e.getContext("2d"), 128), t.onapply?.(e.toDataURL("image/webp", .92));
	}
	var h = Da(), g = R(h), _ = R(g), v = R(_, !0);
	M(_);
	var y = B(_, 2), b = R(y);
	Z(b, "width", 220), Z(b, "height", 220), fi(b, (e) => L(r, e), () => H(r));
	var x = B(b, 2), S = R(x, !0);
	M(x), M(y);
	var C = B(y, 2), w = R(C), T = B(w), E = R(T);
	M(T), M(C);
	var D = B(C, 2);
	Y(D);
	var ee = B(D, 2), te = R(ee), ne = B(te), re = R(ne);
	M(ne), M(ee);
	var ie = B(ee, 2);
	Y(ie);
	var ae = B(ie, 2), oe = R(ae), se = B(oe), ce = R(se);
	M(se), M(ae);
	var le = B(ae, 2);
	Y(le);
	var ue = B(le, 2), de = R(ue), fe = B(de), pe = R(fe);
	M(fe), M(ue);
	var me = B(ue, 2);
	Y(me);
	var he = B(me, 2), O = R(he), ge = R(O, !0);
	M(O);
	var k = B(O, 2), A = R(k, !0);
	M(k), M(he);
	var _e = B(he, 2), ve = R(_e), ye = R(ve, !0);
	M(ve);
	var be = B(ve, 2), j = R(be, !0);
	M(be), M(_e), M(g), M(h), V((e, t, n, r, i, a, o, s, c, l, u, d, f, p, m) => {
		K(v, e), Z(b, "title", t), K(S, n), K(w, `${r ?? ""} `), K(E, `${i ?? ""}x`), K(te, `${a ?? ""} `), K(re, `${o ?? ""}%`), K(oe, `${s ?? ""} `), K(ce, `${c ?? ""}%`), K(de, `${l ?? ""} `), K(pe, `${u ?? ""}%`), K(ge, d), K(A, f), K(ye, p), K(j, m);
	}, [
		() => Q("ie.title"),
		() => Q("ie.dragTip"),
		() => Q("ie.hint"),
		() => Q("lbl.zoom"),
		() => H(a).toFixed(2),
		() => Q("lbl.brightness"),
		() => Math.round(H(c) * 100),
		() => Q("lbl.contrast"),
		() => Math.round(H(l) * 100),
		() => Q("lbl.saturate"),
		() => Math.round(H(u) * 100),
		() => Q("ie.grayscale"),
		() => Q("common.reset"),
		() => Q("confirm.cancel"),
		() => Q("common.apply")
	]), U("pointerdown", b, f), ci(D, () => H(a), (e) => L(a, e)), ci(ie, () => H(c), (e) => L(c, e)), ci(le, () => H(l), (e) => L(l, e)), ci(me, () => H(u), (e) => L(u, e)), U("click", O, () => L(u, 0)), U("click", k, p), U("click", ve, () => t.oncancel?.()), U("click", be, m), G(e, h), We();
}
Sr(["pointerdown", "click"]);
var ka = {}, Aa = {};
function ja(e) {
	let t = structuredClone(e), n = t.schemaVersion ?? 1;
	for (; n < 1;) {
		let r = Aa[n];
		if (typeof r != "function") return e;
		t = r(t) ?? t, n++, t.schemaVersion = n;
	}
	return t;
}
function Ma(e, t) {
	let n = structuredClone(e), r = n.schemaVersion ?? 1;
	for (; r < 1;) {
		let i = ka[r];
		if (typeof i != "function") return e;
		n = i(n, t) ?? n, r++, n.schemaVersion = r;
	}
	return n;
}
//#endregion
//#region ../template/assets/engine/0.6.10/plugins.js
function Na(e) {
	let t = /^(\d+)\.(\d+)\.(\d+)$/.exec(String(e).trim());
	return t ? [
		Number(t[1]),
		Number(t[2]),
		Number(t[3])
	] : null;
}
var Pa = (e, t) => e[0] - t[0] || e[1] - t[1] || e[2] - t[2];
function Fa(e, t) {
	let n = Na(e);
	if (!n || typeof t != "string" || !t.trim()) return !1;
	for (let e of t.trim().split(/\s+/)) {
		let t = /^(>=|<=|>|<|=|\^|~)?(\d+\.\d+\.\d+)$/.exec(e);
		if (!t) return !1;
		let r = t[1] ?? "=", i = Na(t[2]), a = Pa(n, i);
		if (!(r === ">=" ? a >= 0 : r === ">" ? a > 0 : r === "<=" ? a <= 0 : r === "<" ? a < 0 : r === "^" ? i[0] === 0 ? n[0] === 0 && n[1] === i[1] && a >= 0 : n[0] === i[0] && a >= 0 : r === "~" ? n[0] === i[0] && n[1] === i[1] && a >= 0 : a === 0)) return !1;
	}
	return !0;
}
var Ia = /^[a-z0-9][a-z0-9-]*$/;
function La(e) {
	let t = [];
	if (!e || typeof e != "object") return ["manifestet er ikke et objekt"];
	Ia.test(e.id ?? "") || t.push("id mangler eller er ugyldig"), (typeof e.name != "string" || !e.name) && t.push("name mangler"), Na(e.version ?? "") || t.push("version er ikke semver"), (typeof e.requiresEngine != "string" || !e.requiresEngine) && t.push("requiresEngine mangler");
	let n = Array.isArray(e.languages) && e.languages.length > 0;
	return (e.entry !== void 0 || !n) && (typeof e.entry != "string" || !e.entry.endsWith(".js")) && t.push("entry mangler eller er ikke en .js-fil"), (e.provides !== void 0 || !n) && (!e.provides || typeof e.provides != "object") && t.push("provides mangler"), e.languages !== void 0 && t.push(...bi(e.languages)), e.locales !== void 0 && typeof e.locales != "boolean" && t.push("locales må være boolsk"), e.names !== void 0 && (typeof e.names != "object" || e.names === null || Array.isArray(e.names) || Object.values(e.names).some((e) => typeof e != "string" || !e)) && t.push("names må være et objekt med språkkode til navn"), t;
}
//#endregion
//#region ../template/assets/engine/0.6.10/sections/presets.js
function Ra(e) {
	return typeof crypto < "u" && crypto.randomUUID ? `${e}-${crypto.randomUUID().slice(0, 8)}` : `${e}-${[...crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(4))].map((e) => e.toString(16).padStart(2, "0")).join("")}`;
}
//#endregion
//#region ../template/assets/engine/0.6.10/maler-model.js
function za(e) {
	return $i(String(e ?? ""), "");
}
//#endregion
//#region ../template/assets/engine/0.6.10/theme.js
function Ba(e, t) {
	let n = e.tokens || {}, r = e.scheme === "dark" ? "dark" : "light";
	if (!e.alt?.tokens || t === r) return n;
	let i = {};
	for (let t of /* @__PURE__ */ new Set([...Object.keys(n), ...Object.keys(e.alt.tokens)])) i[t] = {
		...n[t],
		...e.alt.tokens[t]
	};
	return i;
}
var Va = /^[a-zA-Z0-9#%.,()'"\s+\-*/]+$/;
function Ha(e) {
	return typeof e == "string" && Va.test(e) && !/url\(|\/\*|\*\/|expression/i.test(e);
}
function Ua(e) {
	let t = e.tokens || {}, n = Ba(e, "light"), r = Ba(e, "dark"), i = e.scheme === "dark" ? "dark" : "light", a = [], o = [], s = [], c = /* @__PURE__ */ new Set([
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
			Ha(c) && (a.push(`  --urd-${e}-${l}: ${c};`), i && a.push(`  --urd-base-${l}: ${c};`)), u !== d && (i && Ha(u) && Ha(d) ? o.push({
				name: l,
				lv: u,
				dv: d
			}) : !i && Ha(u) && Ha(d) && s.push({
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
function Wa(e) {
	return /^[a-z][a-z0-9-]*$/.test(e) ? `var(--urd-color-${e})` : e;
}
var Ga = {
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
	}
}, Ka = {
	flate: "sectionTheme.flate",
	aksent: "sectionTheme.aksent",
	invers: "sectionTheme.invers"
};
[...new Set(Object.values(Ga).flatMap(Object.keys))];
function qa(e) {
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
function Ja(e, t) {
	let n = qa(e), r = qa(t);
	return n == null || r == null ? null : (Math.max(n, r) + .05) / (Math.min(n, r) + .05);
}
//#endregion
//#region ../template/assets/engine/0.6.10/backgrounds/color.js
var Ya = {
	version: 1,
	label: "Farge",
	labelKey: "bgLayer.color",
	defaults: () => ({
		value: "bg",
		opacity: 1
	}),
	migrations: {},
	render(e, t) {
		e.style.background = Wa(t.value), e.style.opacity = String(t.opacity ?? 1);
	}
}, Xa = {
	linear: [
		"pan",
		"pan-loop",
		"rotate"
	],
	radial: ["pulse", "orbit"]
};
function Za(e) {
	let t = Array.isArray(e) && e.length ? e : [{ color: "#0b0e14" }, { color: "#1a1030" }], n = t.map((e) => Math.max(0, Number(e?.share) || 0)), r = n.reduce((e, t) => e + t, 0), i = r <= 0, a = i ? t.length : r, o = 0;
	return t.map((e, t) => {
		let r = i ? 1 : n[t], s = (o + r / 2) / a * 100;
		return o += r, {
			color: e?.color ?? "#0b0e14",
			at: Math.round(s * 100) / 100
		};
	});
}
function Qa(e) {
	let t = (e) => Math.round(e * 100) / 100, n = e[0]?.at ?? 0;
	return [...e.map((e) => ({
		color: e.color,
		at: t(e.at - n)
	})), {
		color: e[0]?.color ?? "#0b0e14",
		at: 100
	}];
}
function $a(e, t, n, r = .5) {
	let i = n % 360 * Math.PI / 180, a = (e) => Math.round(e * 100) / 100 || 0, o = (Math.abs(e * Math.sin(i)) + Math.abs(t * Math.cos(i))) / (1 - Math.min(Math.max(r, 0), .9));
	return {
		period: a(o),
		dx: a(Math.sin(i) * o),
		dy: a(-Math.cos(i) * o)
	};
}
function eo(e, t, n) {
	return `repeating-linear-gradient(${t}deg, ${e.map((e) => `${Wa(e.color)} ${Math.round(e.at / 100 * n * 100) / 100}px`).join(", ")})`;
}
function to(e) {
	let t = e.kind === "radial" ? "radial" : "linear", n = (Xa[t] ?? []).includes(e.animation) ? e.animation : null, r = Za(e.stops), i = r.map((e) => `${Wa(e.color)} ${e.at}%`).join(", "), a = {}, o;
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
					stops: Qa(r),
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
var no = /* @__PURE__ */ new Set(), ro = !1;
function io(e) {
	no.add(e), !(ro || typeof window > "u") && (ro = !0, window.addEventListener("resize", () => {
		for (let e of [...no]) e() || no.delete(e);
	}));
}
var ao = !1;
function oo() {
	if (!ao) {
		ao = !0;
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
var so = {
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
		let n = to(t);
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
					let e = $a(r, i, n.loop.angle, n.loop.maxShare);
					t.style.inset = `${-Math.ceil(e.period)}px`, t.style.background = eo(n.loop.stops, n.loop.angle, e.period), t.style.setProperty("--urd-loop-dx", `${e.dx}px`), t.style.setProperty("--urd-loop-dy", `${e.dy}px`);
				}
				return !0;
			};
			requestAnimationFrame(r), io(r);
			return;
		}
		if (n.runner) {
			e.classList.add("urd-bg-loop-host");
			let t = document.createElement("div");
			t.className = n.runner.className, t.style.background = n.runner.background, n.runner.left != null && (t.style.left = n.runner.left), n.runner.top != null && (t.style.top = n.runner.top), e.appendChild(t);
			return;
		}
		e.style.background = n.background, n.className && (e.classList.add(n.className), n.className === "urd-bg-rotate" && oo());
	}
}, co = {
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
		let n = Wa(t.color);
		e.style.background = `radial-gradient(circle at ${t.x * 100}% ${t.y * 100}%, ${n} 0%, transparent ${t.radius * 100}%)`, e.style.opacity = String(t.opacity ?? .35);
	}
}, lo = "url(\"data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22128%22%20height%3D%22128%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%222%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22128%22%20height%3D%22128%22%20filter%3D%22url(%23n)%22%2F%3E%3C%2Fsvg%3E\")", uo = {
	version: 1,
	label: "Korn",
	labelKey: "bgLayer.grain",
	defaults: () => ({ opacity: .06 }),
	migrations: {},
	render(e, t) {
		e.style.backgroundImage = lo, e.style.backgroundRepeat = "repeat", e.style.opacity = String(t.opacity ?? .06);
	}
}, fo = .4;
function po(e, t) {
	return `${(e ?? .5) * 100}% ${(t ?? .5) * 100}%`;
}
function mo(e, t) {
	return e === "contain" ? "contain" : e === "cover" ? "cover" : `${Math.max(0, t ?? 1) * 100}%`;
}
function ho(e) {
	let t = "-9999px";
	return e === "up" ? `inset(${t} 0 0 0)` : e === "down" ? `inset(0 0 ${t} 0)` : e === "both" ? `inset(${t} 0 ${t} 0)` : "inset(0)";
}
function go(e, t, n, r = .18) {
	let i = Math.max(0, Math.min(1, n)) * fo * t;
	return Math.round(Math.min(i, r * e));
}
function _o(e, t, n, r, i) {
	let a = e + t / 2, o = (n / 2 - a) * Math.max(0, Math.min(1, r)) * fo, s = i ?? go(t, n, r);
	return Math.max(-s, Math.min(s, o)) || 0;
}
var vo = /* @__PURE__ */ new Set(), yo = !1, bo = 0;
function xo() {
	bo = 0;
	for (let e of [...vo]) e() || vo.delete(e);
}
function So() {
	bo ||= requestAnimationFrame(xo);
}
function Co(e) {
	vo.add(e), e(), !(yo || typeof window > "u") && (yo = !0, window.addEventListener("scroll", So, { passive: !0 }), window.addEventListener("resize", So, { passive: !0 }));
}
function wo(e, t, n, r) {
	let i = r === "cover" || r === "flislegg" || r === "repeat", a = e.closest(".urd-section") ?? e.parentElement?.closest(".urd-section") ?? e.parentElement, o = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
	e.style.willChange = "transform";
	let s = (t) => {
		e.style.top = `-${t}px`, e.style.bottom = `-${t}px`;
	}, c = () => {
		if (!e.isConnected) return !1;
		if (o || document.body.classList.contains("urd-mobile")) return s(n), e.style.transform = "", !0;
		let r = (a ?? e).getBoundingClientRect(), c = window.innerHeight || document.documentElement.clientHeight, l = go(r.height, c, t, i ? .18 : .6);
		s(i ? Math.max(n, l) : n);
		let u = _o(r.top, r.height, c, t, l);
		return e.style.transform = `translateY(${u.toFixed(1)}px)`, !0;
	};
	Co(c), typeof requestAnimationFrame == "function" && requestAnimationFrame(() => requestAnimationFrame(c));
}
function To() {
	return typeof CSS < "u" && typeof CSS.supports == "function" && CSS.supports("animation-timeline", "view()");
}
var Eo = /* @__PURE__ */ new Set(), Do = !1, Oo = 0;
function ko() {
	Oo = 0;
	for (let e of [...Eo]) e() || Eo.delete(e);
}
function Ao() {
	!Oo && typeof requestAnimationFrame == "function" && (Oo = requestAnimationFrame(ko));
}
function jo(e) {
	Eo.add(e), e(), !(Do || typeof window > "u") && (Do = !0, window.addEventListener("resize", Ao, { passive: !0 }));
}
function Mo(e, t, n, r) {
	let i = r === "cover" || r === "flislegg" || r === "repeat", a = e.closest(".urd-section") ?? e.parentElement?.closest(".urd-section") ?? e.parentElement;
	e.style.willChange = "transform", e.classList.add("urd-parallax-css");
	let o = () => {
		if (!e.isConnected) return !1;
		let r = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches || document.body.classList.contains("urd-mobile"), o = (a ?? e).getBoundingClientRect(), s = window.innerHeight || document.documentElement.clientHeight, c = go(o.height, s, t, i ? .18 : .6), l = i && !r ? Math.max(n, c) : n;
		return e.style.setProperty("--urd-px-shift", `${c}px`), e.style.top = `-${l}px`, e.style.bottom = `-${l}px`, !0;
	};
	jo(o), typeof requestAnimationFrame == "function" && requestAnimationFrame(() => requestAnimationFrame(o));
}
var No = {
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
		if (!t.src) return;
		e.style.opacity = String(t.opacity ?? 1), e.style.clipPath = ho(t.bleed), e.style.zIndex = t.bleed === "down" || t.bleed === "both" ? "1" : "";
		let n = document.createElement("div");
		n.className = "urd-bg-image", n.style.position = "absolute", n.style.left = "0", n.style.right = "0", n.style.top = "0", n.style.bottom = "0";
		let r = t.fit === "flislegg" || t.fit === "repeat";
		n.style.backgroundImage = `url("${t.src}")`, n.style.backgroundSize = mo(t.fit, t.size), n.style.backgroundRepeat = r ? "repeat" : "no-repeat", n.style.backgroundPosition = po(t.x, t.y);
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
		if (e.appendChild(n), t.parallax > 0) {
			let e = t.fit ?? "cover";
			To() ? Mo(n, t.parallax, i, e) : wo(n, t.parallax, i, e);
		}
	}
};
//#endregion
//#region ../template/assets/engine/0.6.10/galleri-model.js
function Po(e, t, n) {
	return !Number.isFinite(n) || n < 1 ? 0 : (((Number.isFinite(e) ? e : 0) + t) % n + n) % n;
}
function Fo({ count: e = 0, reducedMotion: t = !1 } = {}) {
	return e >= 2 && !t;
}
function Io(e, { min: t = 2, fallback: n = 5 } = {}) {
	let r = Number(e);
	return !Number.isFinite(r) || r <= 0 ? n : Math.max(t, r);
}
//#endregion
//#region ../template/assets/engine/0.6.10/backgrounds/bildegalleri.js
var Lo = {
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
		let n = (t.images ?? []).filter((e) => e?.src);
		if (!n.length) return;
		e.classList.add("urd-bg-galleri"), e.style.opacity = String(t.opacity ?? 1), t.blur > 0 && (e.style.filter = `blur(${t.blur}px)`, e.style.inset = `-${t.blur * 2}px`);
		let r = Math.max(0, Number(t.fade) || 0);
		e.style.setProperty("--urd-bgg-fade", `${r}s`);
		let i = (e, n) => {
			e.style.backgroundImage = `url("${n.src}")`, e.style.backgroundSize = mo(t.fit), e.style.backgroundRepeat = "no-repeat", e.style.backgroundPosition = po(n.x, n.y);
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
		if (!Fo({
			count: n.length,
			reducedMotion: s
		})) return;
		let c = document.createElement("div");
		c.className = "urd-bg-slide", e.appendChild(c);
		let l = 0, u = o, d = Math.max(Io(t.interval, { fallback: 6 }), r + .5) * 1e3, f = setInterval(() => {
			if (!e.isConnected) {
				clearInterval(f);
				return;
			}
			if (document.hidden) return;
			let t = Po(l, 1, n.length), r = new Image();
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
};
//#endregion
//#region ../template/assets/engine/0.6.10/footer-thumb.js
function Ro(e = {}) {
	let t = "#2fd6b6", n = "#5c6b64", r = e.mega ? "#16221d" : "#0e1512", i = e.cols ?? 0, a = e.social ?? 0, o = `<svg viewBox="0 0 160 80" preserveAspectRatio="none" aria-hidden="true"><rect width="160" height="80" fill="${r}"/>`;
	if (e.mega && (o += `<circle cx="20" cy="6" r="34" fill="${t}" opacity="0.18"/>`), e.bigcta) return o += `<rect x="45" y="18" width="70" height="8" rx="3" fill="${n}" opacity="0.85"/>`, o += `<rect x="56" y="32" width="48" height="4" rx="2" fill="${n}" opacity="0.5"/>`, o += `<rect x="62" y="43" width="36" height="10" rx="3" fill="${t}"/>`, o += zo(n, e.baselineLinks), o + "</svg>";
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
	return o += zo(n, e.baselineLinks), o + "</svg>";
}
function zo(e, t = 0) {
	let n = `<line x1="8" y1="66" x2="152" y2="66" stroke="${e}" stroke-width="0.6" opacity="0.5"/>`;
	return n += `<rect x="8" y="70" width="40" height="3" rx="1.5" fill="${e}" opacity="0.6"/>`, t && (n += `<g fill="${e}" opacity="0.6">` + Array.from({ length: t }, (e, t) => `<rect x="${120 - t * 16}" y="70" width="12" height="3" rx="1.5"/>`).join("") + "</g>"), n;
}
//#endregion
//#region ../template/assets/engine/0.6.10/animations/core.js
var Bo = () => ({
	duration: 600,
	delay: 0
}), Vo = {
	"fade-in": {
		version: 1,
		label: "Ton inn",
		labelKey: "anim.fadeIn",
		entrance: !0,
		defaults: Bo,
		migrations: {}
	},
	"slide-up": {
		version: 1,
		label: "Gli opp",
		labelKey: "anim.slideUp",
		entrance: !0,
		defaults: Bo,
		migrations: {}
	},
	"zoom-in": {
		version: 1,
		label: "Zoom inn",
		labelKey: "anim.zoomIn",
		entrance: !0,
		defaults: Bo,
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
			step: 90,
			effect: "slide-up",
			pattern: "sequence"
		}),
		migrations: {}
	}
}, Ho = [
	["font.system", "system-ui, sans-serif"],
	["font.arial", "Arial, Helvetica, sans-serif"],
	["font.verdana", "Verdana, Geneva, sans-serif"],
	["font.trebuchet", "'Trebuchet MS', sans-serif"],
	["font.georgia", "Georgia, 'Times New Roman', serif"],
	["font.palatino", "'Palatino Linotype', Palatino, serif"],
	["font.courier", "'Courier New', monospace"]
];
//#endregion
//#region ../template/assets/engine/0.6.10/place.js
function Uo(e) {
	let t = (e) => Math.round(e * 100) / 100, n = Math.max(0, t(100 - e.w)), r = Math.min(n, Math.max(0, t(e.x - e.w / 2))), i = Math.max(0, e.y - e.h / 2), a = e.snap === !1 || e.grid?.snap === !1, o = e.grid?.size || 8;
	return i = a ? Math.round(i) : Math.round(i / o) * o, {
		x: r,
		y: Math.max(0, i)
	};
}
//#endregion
//#region src/App.svelte
var Wo = /* @__PURE__ */ W("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), Go = /* @__PURE__ */ W("<button class=\"ghost row-tool svelte-1n46o8q\"></button>"), Ko = /* @__PURE__ */ W("<span><span class=\"grad-grip svelte-1n46o8q\"><svg viewBox=\"0 0 16 16\" width=\"14\" height=\"14\" fill=\"currentColor\" aria-hidden=\"true\"><circle cx=\"5\" cy=\"3\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"3\" r=\"1.4\"></circle><circle cx=\"5\" cy=\"8\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"8\" r=\"1.4\"></circle><circle cx=\"5\" cy=\"13\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"13\" r=\"1.4\"></circle></svg></span> <!> <input type=\"range\" class=\"tb-grow svelte-1n46o8q\" min=\"0\" max=\"100\" step=\"1\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span> <!></span>"), qo = /* @__PURE__ */ W("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), Jo = /* @__PURE__ */ W("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"360\" step=\"5\" class=\"svelte-1n46o8q\"/>", 1), Yo = /* @__PURE__ */ W("<label class=\"svelte-1n46o8q\"> <!></label> <!> <button class=\"ghost action svelte-1n46o8q\"> </button> <!> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label>", 1), Xo = /* @__PURE__ */ W("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), Zo = /* @__PURE__ */ W("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.01\" max=\"0.3\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), Qo = /* @__PURE__ */ W("<div class=\"sizefill svelte-1n46o8q\"><button type=\"button\" class=\"ghost svelte-1n46o8q\"> </button> <button type=\"button\" class=\"ghost svelte-1n46o8q\"> </button></div> <label class=\"svelte-1n46o8q\"> </label> <div class=\"focalpad svelte-1n46o8q\"><span class=\"focaldot svelte-1n46o8q\"></span></div> <label class=\"sub svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"-0.5\" max=\"1.5\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"sub svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"-0.5\" max=\"1.5\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), $o = /* @__PURE__ */ W("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label>", 1), es = /* @__PURE__ */ W("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> </label> <div class=\"sizestep svelte-1n46o8q\"><button type=\"button\" class=\"svelte-1n46o8q\">−</button> <input type=\"number\" min=\"10\" max=\"400\" class=\"svelte-1n46o8q\"/> <span class=\"sizeunit svelte-1n46o8q\">%</span> <button type=\"button\" class=\"svelte-1n46o8q\">+</button></div> <!> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"20\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), ts = /* @__PURE__ */ W("<span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), ns = /* @__PURE__ */ W("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"2\" max=\"120\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"5\" step=\"0.1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"20\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <p class=\"panel-hint svelte-1n46o8q\"> </p>", 1), rs = /* @__PURE__ */ W("<div class=\"bg-layer svelte-1n46o8q\"><span class=\"nav-line svelte-1n46o8q\"><!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <!></div>"), is = /* @__PURE__ */ W("<!> <label class=\"svelte-1n46o8q\"> <!></label> <button class=\"ghost action svelte-1n46o8q\"> </button>", 1), as = /* @__PURE__ */ W("<input class=\"nav-target svelte-1n46o8q\"/>"), os = /* @__PURE__ */ W("<div class=\"nav-row nav-sub-row svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <span class=\"nav-target svelte-1n46o8q\"><!></span> <!></div>"), ss = /* @__PURE__ */ W("<label class=\"svelte-1n46o8q\"> <!></label>"), cs = /* @__PURE__ */ W("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"num-stepper svelte-1n46o8q\"><button type=\"button\" class=\"svelte-1n46o8q\">−</button> <input type=\"number\" min=\"1\" max=\"12\" step=\"1\" class=\"svelte-1n46o8q\"/> <button type=\"button\" class=\"svelte-1n46o8q\">+</button></span></label>", 1), ls = /* @__PURE__ */ W("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), us = /* @__PURE__ */ W("<p class=\"panel-hint svelte-1n46o8q\"> </p>"), ds = /* @__PURE__ */ W("<span class=\"nav-line svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span>"), fs = /* @__PURE__ */ W("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <button class=\"ghost action svelte-1n46o8q\"> </button>", 1), ps = /* @__PURE__ */ W("<input class=\"svelte-1n46o8q\"/>"), ms = /* @__PURE__ */ W("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <!>", 1), hs = /* @__PURE__ */ W("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>"), gs = /* @__PURE__ */ W("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <!>", 1), _s = /* @__PURE__ */ W("<label class=\"svelte-1n46o8q\"> </label> <input class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), vs = /* @__PURE__ */ W("<input class=\"token-input svelte-1n46o8q\" maxlength=\"4\"/>"), ys = /* @__PURE__ */ W("<button class=\"ghost svelte-1n46o8q\"> </button>"), bs = /* @__PURE__ */ W("<span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\"/> <button class=\"ghost svelte-1n46o8q\"> </button></span>"), xs = /* @__PURE__ */ W("<label class=\"svelte-1n46o8q\"> <span class=\"toolbar-row svelte-1n46o8q\"><!> <!></span></label> <!>", 1), Ss = /* @__PURE__ */ W("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), Cs = /* @__PURE__ */ W("<div class=\"bg-layer svelte-1n46o8q\"><span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label></div>"), ws = /* @__PURE__ */ W("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label> <!>", 1), Ts = /* @__PURE__ */ W("<p> </p>"), Es = /* @__PURE__ */ W("<label class=\"svelte-1n46o8q\"> <input type=\"text\" class=\"svelte-1n46o8q\"/></label> <button class=\"ghost svelte-1n46o8q\"> </button> <!>", 1), Ds = /* @__PURE__ */ W("<label class=\"svelte-1n46o8q\"> <input type=\"number\" class=\"svelte-1n46o8q\"/></label>"), Os = /* @__PURE__ */ W("<label class=\"svelte-1n46o8q\"> <input type=\"text\" class=\"svelte-1n46o8q\"/></label>"), ks = /* @__PURE__ */ W("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), As = /* @__PURE__ */ W("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), js = /* @__PURE__ */ W("<label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Ms = /* @__PURE__ */ W("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"1\" max=\"3\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.2\" max=\"2\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.2\" max=\"2\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"2\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\"> </button> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Ns = /* @__PURE__ */ W("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"8\" max=\"400\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Ps = /* @__PURE__ */ W("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" max=\"6\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"32\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), Fs = /* @__PURE__ */ W("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"2\" max=\"60\" class=\"svelte-1n46o8q\"/></label>"), Is = /* @__PURE__ */ W("<label class=\"svelte-1n46o8q\"> <!></label> <!> <!> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Ls = /* @__PURE__ */ W("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" max=\"40\" class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Rs = /* @__PURE__ */ W("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"100\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label>", 1), zs = /* @__PURE__ */ W("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"400\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label>", 1), Bs = /* @__PURE__ */ W("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), Vs = /* @__PURE__ */ W("<div class=\"frame-grid svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"0.5\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"0.5\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label></div>"), Hs = /* @__PURE__ */ W("<!> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label></div></details>", 1), Us = /* @__PURE__ */ W("<div class=\"props-tabs svelte-1n46o8q\"><span class=\"seg svelte-1n46o8q\"><button type=\"button\"> </button> <button type=\"button\"> </button></span></div> <!>", 1), Ws = /* @__PURE__ */ W("<button class=\"chrome-restore svelte-1n46o8q\"><!> </button>"), Gs = /* @__PURE__ */ W("<button class=\"ghost svelte-1n46o8q\"> </button> <span class=\"viewswitch svelte-1n46o8q\"><button></button> <button></button></span> <span class=\"zoomswitch svelte-1n46o8q\"><button></button> <button class=\"ghost svelte-1n46o8q\"></button> <span class=\"zoom-readout svelte-1n46o8q\"> </span> <button class=\"ghost svelte-1n46o8q\"></button></span> <button></button>", 1), Ks = /* @__PURE__ */ W("<button class=\"badge attention svelte-1n46o8q\"><!> </button>"), qs = /* @__PURE__ */ W("<span class=\"badge svelte-1n46o8q\"> </span> <button> </button>", 1), Js = /* @__PURE__ */ W("<!> ", 1), Ys = /* @__PURE__ */ W("<span class=\"who svelte-1n46o8q\"><!> </span>"), Xs = /* @__PURE__ */ W("<a class=\"ghost svelte-1n46o8q\" href=\"/api/github/login\"> </a>"), Zs = /* @__PURE__ */ W("<button class=\"ghost svelte-1n46o8q\"><!></button> <!> <a class=\"ghost svelte-1n46o8q\" target=\"_blank\" rel=\"noopener\"> </a> <button class=\"primary svelte-1n46o8q\"> </button>", 1), Qs = /* @__PURE__ */ W("<hr class=\"rail-sep svelte-1n46o8q\"/>"), $s = /* @__PURE__ */ W("<button> </button>"), ec = /* @__PURE__ */ W("<!> <!>", 1), tc = /* @__PURE__ */ W("<div class=\"settings-pop svelte-1n46o8q\"><p class=\"panel-strong svelte-1n46o8q\"> </p> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label></div>"), nc = /* @__PURE__ */ W("<span class=\"page-path svelte-1n46o8q\">/</span>"), rc = /* @__PURE__ */ W("<input class=\"page-slug svelte-1n46o8q\"/>"), ic = /* @__PURE__ */ W("<div><input class=\"page-title svelte-1n46o8q\"/> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <!></span></div>"), ac = /* @__PURE__ */ W("<div class=\"panel-body svelte-1n46o8q\"><!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <input class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\"> </button></div>"), oc = /* @__PURE__ */ W("<input class=\"svelte-1n46o8q\"/> <span class=\"toolbar-row svelte-1n46o8q\"><!> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"8\" max=\"96\" placeholder=\"px\"/> <button><b> </b></button> <button><i> </i></button></span>", 1), sc = /* @__PURE__ */ W("<span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"12\" max=\"128\"/> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"0\" max=\"64\"/></span>"), cc = /* @__PURE__ */ W("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), lc = /* @__PURE__ */ W("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), uc = /* @__PURE__ */ W("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), dc = /* @__PURE__ */ W("<div class=\"nav-row svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <span class=\"nav-target svelte-1n46o8q\"><!></span> <!></div> <!>", 1), fc = /* @__PURE__ */ W("<div class=\"panel-body svelte-1n46o8q\"><details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <!></label> <!> <!> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <!></label> <!> <!> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <!> <!> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" max=\"4\" class=\"svelte-1n46o8q\"/></label></div></details> <details class=\"group svelte-1n46o8q\" open=\"\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\"> </button></div></details></div>"), pc = /* @__PURE__ */ W("<img class=\"site-icon-preview svelte-1n46o8q\"/>"), mc = /* @__PURE__ */ W("<button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button>", 1), hc = /* @__PURE__ */ W("<div class=\"panel-body svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span></div>"), gc = /* @__PURE__ */ W("<div class=\"mini-label tpv-cap svelte-1n46o8q\"> </div>"), _c = /* @__PURE__ */ W("<div class=\"theme-pvw svelte-1n46o8q\"><!> <div class=\"tpv-demo svelte-1n46o8q\"><div class=\"tpv-h svelte-1n46o8q\"> </div> <div class=\"tpv-card svelte-1n46o8q\"> </div> <div class=\"tpv-row svelte-1n46o8q\"><span class=\"tpv-btn svelte-1n46o8q\"> </span><span class=\"tpv-lnk svelte-1n46o8q\"> </span></div></div></div>"), vc = /* @__PURE__ */ W("<button type=\"button\"><span class=\"tp-band svelte-1n46o8q\"><i class=\"svelte-1n46o8q\"></i><i class=\"svelte-1n46o8q\"></i><i class=\"svelte-1n46o8q\"></i><i class=\"svelte-1n46o8q\"></i></span> <small class=\"svelte-1n46o8q\"> </small></button>"), yc = /* @__PURE__ */ W("<div class=\"ctl-row autorow svelte-1n46o8q\"><span class=\"autolbl svelte-1n46o8q\"> </span> <span class=\"seg svelte-1n46o8q\"><button type=\"button\"> </button> <button type=\"button\"> </button></span></div>"), bc = /* @__PURE__ */ W("<span class=\"mini-label svelte-1n46o8q\"> </span>"), xc = /* @__PURE__ */ W("<div class=\"palcol svelte-1n46o8q\"><!> <span class=\"palcap svelte-1n46o8q\"> </span> <b class=\"palhex svelte-1n46o8q\"> </b></div>"), Sc = /* @__PURE__ */ W("<div class=\"ctl-row palhead svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <button type=\"button\"> </button></div> <div></div>", 1), Cc = /* @__PURE__ */ W("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-strong svelte-1n46o8q\"> </p> <div class=\"theme-presets svelte-1n46o8q\"></div> <p class=\"panel-strong svelte-1n46o8q\"> </p> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <div class=\"ctl-row palhead svelte-1n46o8q\"><!> <button type=\"button\"> </button></div> <div class=\"palcells svelte-1n46o8q\"></div> <!> <div class=\"theme-previews svelte-1n46o8q\"><!> <!></div> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <div class=\"sample typo-sample svelte-1n46o8q\"><div class=\"ts-h svelte-1n46o8q\"> </div> <div class=\"ts-b svelte-1n46o8q\"> </div></div></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"sample form-prev svelte-1n46o8q\"><span class=\"fp-btn svelte-1n46o8q\"> </span> <span class=\"fp-card svelte-1n46o8q\"> </span></div> <label class=\"ctl-row svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"24\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"ctl-row svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"40\" step=\"1\" class=\"svelte-1n46o8q\"/></div></details></div>"), wc = /* @__PURE__ */ W("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"></div></details>"), Tc = /* @__PURE__ */ W("<div><details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button></div></details> <button class=\"ghost svelte-1n46o8q\"> </button> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button></div></details> <!></div>"), Ec = /* @__PURE__ */ W("<div class=\"panel-body svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label></div>"), Dc = /* @__PURE__ */ W("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!>", 1), Oc = /* @__PURE__ */ W("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), kc = /* @__PURE__ */ W("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"1000\" step=\"10\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label>", 1), Ac = /* @__PURE__ */ W("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label>"), jc = /* @__PURE__ */ W("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"100\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <!>", 1), Mc = /* @__PURE__ */ W("<p class=\"panel-strong svelte-1n46o8q\"> </p> <label class=\"svelte-1n46o8q\"> <input class=\"token-input svelte-1n46o8q\"/></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"row-tools svelte-1n46o8q\"><span class=\"gridmenu-value svelte-1n46o8q\"> </span> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label>", 1), Nc = /* @__PURE__ */ W("<div class=\"panel-body svelte-1n46o8q\"><!></div>"), Pc = /* @__PURE__ */ W("<button class=\"footer-tp svelte-1n46o8q\"><span class=\"footer-tp-thumb svelte-1n46o8q\"></span> <span class=\"footer-tp-name svelte-1n46o8q\"> </span></button>"), Fc = /* @__PURE__ */ W("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"16\" max=\"160\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), Ic = /* @__PURE__ */ W("<span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span> <!>", 1), Lc = /* @__PURE__ */ W("<div class=\"nav-row svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></div> <!>", 1), Rc = /* @__PURE__ */ W("<div class=\"nav-row svelte-1n46o8q\"><span class=\"nav-line svelte-1n46o8q\"><span class=\"footer-soc-preview svelte-1n46o8q\" aria-hidden=\"true\"></span> <!></span> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <input class=\"nav-target svelte-1n46o8q\"/></div>"), zc = /* @__PURE__ */ W("<label class=\"svelte-1n46o8q\"> <!></label> <!>", 1), Bc = /* @__PURE__ */ W("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), Vc = /* @__PURE__ */ W("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <!>", 1), Hc = /* @__PURE__ */ W("<div class=\"panel-body svelte-1n46o8q\"><label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"footer-tpick svelte-1n46o8q\"></div></div></details> <details class=\"group svelte-1n46o8q\" open=\"\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\"> </button> <label class=\"svelte-1n46o8q\"> <!></label></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\"> </button></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\"> </button></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <button class=\"ghost action svelte-1n46o8q\"> </button></div></details></div>"), Uc = /* @__PURE__ */ W("<img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <button class=\"ghost row-tool svelte-1n46o8q\"></button>", 1), Wc = /* @__PURE__ */ W("<details class=\"group samling-entry svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><span class=\"toolbar-row svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <label class=\"svelte-1n46o8q\"> <input type=\"date\" class=\"svelte-1n46o8q\"/></label> <textarea rows=\"3\" class=\"svelte-1n46o8q\"></textarea> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span></div></details>"), Gc = /* @__PURE__ */ W("<span class=\"toolbar-row svelte-1n46o8q\"><button class=\"ghost action svelte-1n46o8q\"> </button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <!> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Kc = /* @__PURE__ */ W("<div class=\"panel-body svelte-1n46o8q\"><!> <!> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <button class=\"ghost action svelte-1n46o8q\"> </button></div>"), qc = /* @__PURE__ */ W("<span class=\"plugin-meta svelte-1n46o8q\"> </span>"), Jc = /* @__PURE__ */ W("<p class=\"panel-hint plugin-warn svelte-1n46o8q\"> </p>"), Yc = /* @__PURE__ */ W("<div><span class=\"plugin-head svelte-1n46o8q\"><span class=\"plugin-name svelte-1n46o8q\"> </span> <!> <span class=\"row-tools svelte-1n46o8q\"><label class=\"gridmenu-snap plugin-toggle svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <!> <!></div>"), Xc = /* @__PURE__ */ W("<div class=\"plugin-row svelte-1n46o8q\"><span class=\"plugin-head svelte-1n46o8q\"><span class=\"plugin-name svelte-1n46o8q\"> </span> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span></div>"), Zc = /* @__PURE__ */ W("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!>", 1), Qc = /* @__PURE__ */ W("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <input class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\"> </button> <!>", 1), $c = /* @__PURE__ */ W("<div class=\"panel-body svelte-1n46o8q\"><!> <!> <!> <!></div>"), el = /* @__PURE__ */ W("<div><span class=\"history-msg svelte-1n46o8q\"> </span> <span class=\"history-meta svelte-1n46o8q\"> </span></div>"), tl = /* @__PURE__ */ W("<button class=\"ghost svelte-1n46o8q\"> </button> <!>", 1), nl = /* @__PURE__ */ W("<p class=\"panel-hint svelte-1n46o8q\"> </p> <button class=\"ghost svelte-1n46o8q\"> </button>", 1), rl = /* @__PURE__ */ W("<span class=\"update-arrow svelte-1n46o8q\"></span> <span class=\"badge svelte-1n46o8q\"> </span>", 1), il = /* @__PURE__ */ W("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><p class=\"update-notes svelte-1n46o8q\"> </p></div></details>"), al = /* @__PURE__ */ W("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"><span class=\"update-warn svelte-1n46o8q\"></span> </summary> <div class=\"group-items svelte-1n46o8q\"><pre class=\"update-headers svelte-1n46o8q\"> </pre></div></details>"), ol = /* @__PURE__ */ W("<span class=\"chip svelte-1n46o8q\"> </span>"), sl = /* @__PURE__ */ W("<div class=\"update-row svelte-1n46o8q\"><span class=\"update-path svelte-1n46o8q\"> </span> <span class=\"update-flags svelte-1n46o8q\"><!> <span class=\"update-warn svelte-1n46o8q\"></span></span></div>"), cl = /* @__PURE__ */ W("<div class=\"update-row svelte-1n46o8q\"><span class=\"update-path svelte-1n46o8q\"> </span> <!></div>"), ll = /* @__PURE__ */ W("<span class=\"update-warn svelte-1n46o8q\"></span>"), ul = /* @__PURE__ */ W("<div class=\"update-row svelte-1n46o8q\"><span> </span> <span class=\"update-flags svelte-1n46o8q\"><!> <!> <input type=\"checkbox\" class=\"svelte-1n46o8q\"/></span></div>"), dl = /* @__PURE__ */ W("<div class=\"ctl-row update-opt-head svelte-1n46o8q\"><p class=\"panel-strong svelte-1n46o8q\"> </p> <span class=\"mini-label svelte-1n46o8q\"> </span></div> <!>", 1), fl = /* @__PURE__ */ W("<p class=\"update-summary svelte-1n46o8q\"> </p> <!> <!> <!> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"></div></details> <!> <button class=\"primary update-run svelte-1n46o8q\"> </button>", 1), pl = /* @__PURE__ */ W("<div class=\"update-versions svelte-1n46o8q\"><span class=\"update-from svelte-1n46o8q\"> </span> <!></div> <!>", 1), ml = /* @__PURE__ */ W("<aside class=\"panel svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <!></aside>"), hl = /* @__PURE__ */ W("<nav class=\"rail svelte-1n46o8q\"><!> <span class=\"rail-settings svelte-1n46o8q\"><button></button> <!></span></nav> <!>", 1), gl = /* @__PURE__ */ W("<div class=\"workspace svelte-1n46o8q\"><!> <div><div class=\"stage svelte-1n46o8q\"><iframe class=\"svelte-1n46o8q\"></iframe></div></div></div>"), _l = /* @__PURE__ */ W("<p class=\"loading svelte-1n46o8q\"> </p>"), vl = /* @__PURE__ */ W("<p class=\"panel-hint confirm-line svelte-1n46o8q\"> </p>"), yl = /* @__PURE__ */ W("<div class=\"setup-overlay svelte-1n46o8q\"><div class=\"setup-card svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <!> <!> <span class=\"setup-actions svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"primary svelte-1n46o8q\"> </button></span></div></div>"), bl = /* @__PURE__ */ W("<div class=\"setup-overlay svelte-1n46o8q\"><div class=\"setup-card svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <p class=\"panel-hint svelte-1n46o8q\"> </p> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <p class=\"panel-hint svelte-1n46o8q\"> </p> <span class=\"setup-actions svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"primary svelte-1n46o8q\"> </button></span></div></div>"), xl = /* @__PURE__ */ W("<div><span> </span> <button class=\"toast-x svelte-1n46o8q\">×</button></div>"), Sl = /* @__PURE__ */ W("<div class=\"block-menu svelte-1n46o8q\"><header class=\"block-menu-head svelte-1n46o8q\"><span> </span> <button class=\"ghost row-tool svelte-1n46o8q\"></button></header> <div class=\"panel-body block-menu-body svelte-1n46o8q\"><!></div></div>"), Cl = /* @__PURE__ */ W("<div class=\"editor svelte-1n46o8q\"><!> <header><span class=\"topbar-group svelte-1n46o8q\"><span class=\"brand svelte-1n46o8q\" title=\"Urd\"><svg class=\"brand-mark svelte-1n46o8q\" viewBox=\"0 0 40 40\" aria-hidden=\"true\"><path d=\"M12 32V10l16 6.5V32\" fill=\"none\" stroke=\"var(--urd-brand)\" stroke-width=\"3.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path></svg> <span class=\"brand-word svelte-1n46o8q\">Urd</span></span> <!> <!> <!></span> <span class=\"topbar-group topbar-right svelte-1n46o8q\"><!></span></header> <!> <!> <!> <!> <!></div>   <!>", 1);
function wl(e, t) {
	Ue(t, !0);
	let n = (e, t = d, n = d) => {
		var r = is(), i = z(r);
		Br(i, 17, n, Ir, (e, r, i) => {
			var a = rs(), s = R(a), l = R(s);
			{
				let e = /* @__PURE__ */ F(() => Q("tip.bg.changeType")), n = /* @__PURE__ */ F(() => o.map(([e, t]) => [e, t.labelKey ? Q(t.labelKey) : t.label]));
				$(l, {
					get value() {
						return H(r).type;
					},
					get title() {
						return H(e);
					},
					get options() {
						return H(n);
					},
					onchange: (e) => vn(t(), i, e)
				});
			}
			var u = B(l, 2), d = R(u);
			d.disabled = i === 0, J(d, () => c.up, !0), M(d);
			var f = B(d, 2);
			J(f, () => c.down, !0), M(f);
			var p = B(f, 2);
			J(p, () => c.cross, !0), M(p), M(u), M(s);
			var m = B(s, 2), h = (e) => {
				var n = Wo(), a = z(n), o = R(a), s = B(o);
				{
					let e = /* @__PURE__ */ F(Mn), n = /* @__PURE__ */ F(() => Q("tip.bg.layerColor"));
					Hi(s, {
						get value() {
							return H(r).props.value;
						},
						get tokens() {
							return H(e);
						},
						get label() {
							return H(n);
						},
						onchange: (e) => Qt(t(), i, "value", e)
					});
				}
				M(a);
				var c = B(a, 2), l = R(c), u = B(l), d = R(u);
				M(u), M(c);
				var f = B(c, 2);
				Y(f), V((e, t, n) => {
					K(o, `${e ?? ""} `), K(l, `${t ?? ""} `), K(d, `${n ?? ""}%`), X(f, H(r).props.opacity ?? 1);
				}, [
					() => Q("lbl.color"),
					() => Q("lbl.strength"),
					() => Math.round((H(r).props.opacity ?? 1) * 100)
				]), U("input", f, (e) => Qt(t(), i, "opacity", Number(e.target.value))), G(e, n);
			}, g = (e) => {
				let n = /* @__PURE__ */ F(() => sn(H(r))), a = /* @__PURE__ */ F(() => H(n).stops.reduce((e, t) => e + Math.max(0, Number(t.share) || 0), 0));
				var o = Yo(), s = z(o), l = R(s), u = B(l);
				{
					let e = /* @__PURE__ */ F(() => H(n).kind ?? "linear"), r = /* @__PURE__ */ F(() => [["linear", Q("opt.grad.linear")], ["radial", Q("opt.grad.radial")]]);
					$(u, {
						get value() {
							return H(e);
						},
						get options() {
							return H(r);
						},
						onchange: (e) => dn(t(), i, e)
					});
				}
				M(s);
				var d = B(s, 2);
				Br(d, 17, () => H(n).stops, Ir, (e, r, o) => {
					var s = Ko();
					let l;
					var u = R(s), d = B(u, 2);
					{
						let e = /* @__PURE__ */ F(Mn), n = /* @__PURE__ */ F(() => Q("tip.bg.stopColor"));
						Hi(d, {
							get value() {
								return H(r).color;
							},
							get tokens() {
								return H(e);
							},
							get label() {
								return H(n);
							},
							onchange: (e) => fn(t(), i, o, { color: e })
						});
					}
					var f = B(d, 2);
					Y(f);
					var p = B(f, 2), m = R(p);
					M(p);
					var h = B(p, 2), g = (e) => {
						var n = Go();
						J(n, () => c.cross, !0), M(n), V((e) => Z(n, "title", e), [() => Q("tip.bg.removeStop")]), U("click", n, () => mn(t(), i, o)), G(e, n);
					};
					q(h, (e) => {
						H(n).stops.length > 2 && e(g);
					}), M(s), V((e, t, a) => {
						l = Zr(s, 1, "nav-line grad-stop svelte-1n46o8q", null, l, {
							dragging: H(gn)?.layer === i && H(gn).from === o,
							"drop-above": H(gn)?.layer === i && H(gn).insert === o,
							"drop-below": H(gn)?.layer === i && H(gn).insert === H(n).stops.length && o === H(n).stops.length - 1
						}), Z(u, "title", e), X(f, H(r).share ?? 50), Z(f, "title", t), K(m, `${a ?? ""}%`);
					}, [
						() => Q("tip.bg.dragStop"),
						() => Q("tip.bg.stopShare"),
						() => H(a) > 0 ? Math.round(Math.max(0, Number(H(r).share) || 0) / H(a) * 100) : Math.round(100 / H(n).stops.length)
					]), U("pointerdown", u, (e) => _n(t(), e, i, o)), U("input", f, (e) => fn(t(), i, o, { share: Number(e.target.value) })), G(e, s);
				});
				var f = B(d, 2), p = R(f, !0);
				M(f);
				var m = B(f, 2), h = (e) => {
					var r = qo(), a = z(r), o = R(a), s = B(o), c = R(s);
					M(s), M(a);
					var l = B(a, 2);
					Y(l);
					var u = B(l, 2), d = R(u), f = B(d), p = R(f);
					M(f), M(u);
					var m = B(u, 2);
					Y(m), V((e, t, r, i) => {
						K(o, `${e ?? ""} `), K(c, `${t ?? ""}%`), X(l, H(n).x ?? .5), K(d, `${r ?? ""} `), K(p, `${i ?? ""}%`), X(m, H(n).y ?? .5);
					}, [
						() => Q("lbl.centerX"),
						() => Math.round((H(n).x ?? .5) * 100),
						() => Q("lbl.centerY"),
						() => Math.round((H(n).y ?? .5) * 100)
					]), U("input", l, (e) => ln(t(), i, "x", Number(e.target.value))), U("input", m, (e) => ln(t(), i, "y", Number(e.target.value))), G(e, r);
				}, g = (e) => {
					var r = Jo(), a = z(r), o = R(a), s = B(o), c = R(s);
					M(s), M(a);
					var l = B(a, 2);
					Y(l), V((e) => {
						K(o, `${e ?? ""} `), K(c, `${H(n).angle ?? ""}°`), X(l, H(n).angle);
					}, [() => Q("lbl.angle")]), U("input", l, (e) => ln(t(), i, "angle", Number(e.target.value))), G(e, r);
				};
				q(m, (e) => {
					(H(n).kind ?? "linear") === "radial" ? e(h) : e(g, -1);
				});
				var _ = B(m, 2), v = R(_), y = B(v), b = R(y);
				M(y), M(_);
				var x = B(_, 2);
				Y(x);
				var S = B(x, 2), C = R(S), w = B(C);
				{
					let e = /* @__PURE__ */ F(() => H(n).animation ?? "none");
					$(w, {
						get value() {
							return H(e);
						},
						get options() {
							return un[(H(n).kind ?? "linear") === "radial" ? "radial" : "linear"];
						},
						onchange: (e) => ln(t(), i, "animation", e)
					});
				}
				M(S), V((e, t, r, i, a, o, s) => {
					K(l, `${e ?? ""} `), Z(f, "title", t), K(p, r), K(v, `${i ?? ""} `), K(b, `${a ?? ""}%`), X(x, H(n).opacity ?? 1), Z(S, "title", o), K(C, `${s ?? ""} `);
				}, [
					() => Q("blocks.shape"),
					() => Q("tip.bg.addStop"),
					() => Q("ui.addStop"),
					() => Q("lbl.strength"),
					() => Math.round((H(n).opacity ?? 1) * 100),
					() => Q("tip.bg.motion"),
					() => Q("lbl.motion")
				]), U("click", f, () => pn(t(), i)), U("input", x, (e) => ln(t(), i, "opacity", Number(e.target.value))), G(e, o);
			}, _ = (e) => {
				var n = Xo(), a = z(n), o = R(a), s = B(o);
				{
					let e = /* @__PURE__ */ F(Mn), n = /* @__PURE__ */ F(() => Q("tip.bg.glowColor"));
					Hi(s, {
						get value() {
							return H(r).props.color;
						},
						get tokens() {
							return H(e);
						},
						get label() {
							return H(n);
						},
						onchange: (e) => Qt(t(), i, "color", e)
					});
				}
				M(a);
				var c = B(a, 2), l = R(c), u = B(l), d = R(u);
				M(u), M(c);
				var f = B(c, 2);
				Y(f);
				var p = B(f, 2), m = R(p), h = B(m), g = R(h);
				M(h), M(p);
				var _ = B(p, 2);
				Y(_);
				var v = B(_, 2), y = R(v), b = B(y), x = R(b);
				M(b), M(v);
				var S = B(v, 2);
				Y(S);
				var C = B(S, 2), w = R(C), T = B(w), E = R(T);
				M(T), M(C);
				var D = B(C, 2);
				Y(D), V((e, t, n, i, a, s, c, u, p) => {
					K(o, `${e ?? ""} `), K(l, `${t ?? ""} `), K(d, `${n ?? ""}%`), X(f, H(r).props.x), K(m, `${i ?? ""} `), K(g, `${a ?? ""}%`), X(_, H(r).props.y), K(y, `${s ?? ""} `), K(x, `${c ?? ""}%`), X(S, H(r).props.radius), K(w, `${u ?? ""} `), K(E, `${p ?? ""}%`), X(D, H(r).props.opacity);
				}, [
					() => Q("lbl.color"),
					() => Q("lbl.posX"),
					() => Math.round(H(r).props.x * 100),
					() => Q("lbl.posY"),
					() => Math.round(H(r).props.y * 100),
					() => Q("lbl.size"),
					() => Math.round(H(r).props.radius * 100),
					() => Q("lbl.strength"),
					() => Math.round(H(r).props.opacity * 100)
				]), U("input", f, (e) => Qt(t(), i, "x", Number(e.target.value))), U("input", _, (e) => Qt(t(), i, "y", Number(e.target.value))), U("input", S, (e) => Qt(t(), i, "radius", Number(e.target.value))), U("input", D, (e) => Qt(t(), i, "opacity", Number(e.target.value))), G(e, n);
			}, v = (e) => {
				var n = Zo(), a = z(n), o = R(a), s = B(o), c = R(s);
				M(s), M(a);
				var l = B(a, 2);
				Y(l), V((e, t) => {
					K(o, `${e ?? ""} `), K(c, `${t ?? ""}%`), X(l, H(r).props.opacity);
				}, [() => Q("lbl.strength"), () => Math.round(H(r).props.opacity * 100)]), U("input", l, (e) => Qt(t(), i, "opacity", Number(e.target.value))), G(e, n);
			}, y = (e) => {
				let n = /* @__PURE__ */ F(() => H(r).props.fit === "flislegg" || H(r).props.fit === "repeat");
				var a = es(), o = z(a), s = R(o), c = B(s);
				M(o);
				var l = B(o, 2), u = R(l), d = B(u);
				{
					let e = /* @__PURE__ */ F(() => H(n) ? "flislegg" : "vanlig"), r = /* @__PURE__ */ F(() => [["vanlig", Q("opt.img.plain")], ["flislegg", Q("opt.img.tile")]]);
					$(d, {
						get value() {
							return H(e);
						},
						get options() {
							return H(r);
						},
						onchange: (e) => Qt(t(), i, "fit", e)
					});
				}
				M(l);
				var f = B(l, 2), p = R(f, !0);
				M(f);
				var m = B(f, 2), h = R(m), g = B(h, 2);
				Y(g);
				var _ = B(g, 4);
				M(m);
				var v = B(m, 2), y = (e) => {
					var n = Qo(), a = z(n), o = R(a), s = R(o, !0);
					M(o);
					var c = B(o, 2), l = R(c, !0);
					M(c), M(a);
					var u = B(a, 2), d = R(u, !0);
					M(u);
					var f = B(u, 2), p = B(f, 2), m = R(p), h = B(m), g = R(h);
					M(h), M(p);
					var _ = B(p, 2);
					Y(_);
					var v = B(_, 2), y = R(v), b = B(y), x = R(b);
					M(b), M(v);
					var S = B(v, 2);
					Y(S), V((e, t, n, i, a, p, h, v, b, C, w, T) => {
						Z(o, "title", e), K(s, t), Z(c, "title", n), K(l, i), Z(u, "title", a), K(d, p), $r(f, `--fx:${h ?? ""}%; --fy:${v ?? ""}%`), K(m, `${b ?? ""} `), K(g, `${C ?? ""}%`), X(_, H(r).props.x ?? .5), K(y, `${w ?? ""} `), K(x, `${T ?? ""}%`), X(S, H(r).props.y ?? .5);
					}, [
						() => Q("tip.bg.cover"),
						() => Q("ui.cover"),
						() => Q("opt.fitFrame.contain"),
						() => Q("opt.fit.contain"),
						() => Q("tip.bg.position"),
						() => Q("lbl.position"),
						() => Math.max(0, Math.min(1, H(r).props.x ?? .5)) * 100,
						() => Math.max(0, Math.min(1, H(r).props.y ?? .5)) * 100,
						() => Q("lbl.horizontal"),
						() => Math.round((H(r).props.x ?? .5) * 100),
						() => Q("lbl.vertical"),
						() => Math.round((H(r).props.y ?? .5) * 100)
					]), U("click", o, () => on(t(), i, H(r), "cover")), U("click", c, () => on(t(), i, H(r), "contain")), U("pointerdown", f, (e) => $t(e, t(), i, "xy")), U("input", _, (e) => Qt(t(), i, "x", Number(e.target.value))), U("input", S, (e) => Qt(t(), i, "y", Number(e.target.value))), G(e, n);
				};
				q(v, (e) => {
					H(n) || e(y);
				});
				var b = B(v, 2), x = R(b), S = B(x), C = R(S);
				M(S), M(b);
				var w = B(b, 2);
				Y(w);
				var T = B(w, 2), E = R(T), D = B(E), ee = R(D);
				M(D), M(T);
				var te = B(T, 2);
				Y(te);
				var ne = B(te, 2), re = R(ne);
				Y(re);
				var ie = B(re);
				M(ne);
				var ae = B(ne, 2), oe = (e) => {
					var n = $o(), a = z(n), o = R(a), s = B(o), c = R(s);
					M(s), M(a);
					var l = B(a, 2);
					Y(l);
					var u = B(l, 2), d = R(u), f = B(d);
					{
						let e = /* @__PURE__ */ F(() => H(r).props.bleed ?? "none"), n = /* @__PURE__ */ F(() => [
							["none", Q("common.none")],
							["up", Q("opt.bleed.up")],
							["down", Q("opt.bleed.down")],
							["both", Q("opt.brand.both")]
						]);
						$(f, {
							get value() {
								return H(e);
							},
							get options() {
								return H(n);
							},
							onchange: (e) => Qt(t(), i, "bleed", e)
						});
					}
					M(u), V((e, t, n, i) => {
						K(o, `${e ?? ""} `), K(c, `${t ?? ""}%`), X(l, H(r).props.parallax ?? .3), Z(u, "title", n), K(d, `${i ?? ""} `);
					}, [
						() => Q("lbl.parallaxStrength"),
						() => Math.round((H(r).props.parallax ?? 0) * 100),
						() => Q("tip.bg.bleed"),
						() => Q("lbl.bleed")
					]), U("input", l, (e) => Qt(t(), i, "parallax", Number(e.target.value))), G(e, n);
				};
				q(ae, (e) => {
					(H(r).props.parallax ?? 0) > 0 && e(oe);
				}), V((e, t, n, i, a, c, d, m, v, y, b, S, T, D) => {
					Z(o, "title", e), K(s, `${t ?? ""} `), Z(l, "title", n), K(u, `${i ?? ""} `), Z(f, "title", a), K(p, c), Z(h, "title", d), X(g, m), Z(_, "title", v), K(x, `${y ?? ""} `), K(C, `${H(r).props.blur ?? 0 ?? ""} px`), X(w, H(r).props.blur ?? 0), K(E, `${b ?? ""} `), K(ee, `${S ?? ""}%`), X(te, H(r).props.opacity ?? 1), Z(ne, "title", T), ii(re, (H(r).props.parallax ?? 0) > 0), K(ie, ` ${D ?? ""}`);
				}, [
					() => Q("tip.webpAuto"),
					() => H(r).props.src ? Q("ui.changeImage") : Q("ui.chooseImage"),
					() => Q("tip.bg.fit"),
					() => Q("lbl.fit"),
					() => Q("tip.bg.size"),
					() => Q("lbl.size"),
					() => Q("tip.smaller"),
					() => Math.round((H(r).props.size ?? 1) * 100),
					() => Q("tip.larger"),
					() => Q("lbl.blur"),
					() => Q("lbl.strength"),
					() => Math.round((H(r).props.opacity ?? 1) * 100),
					() => Q("tip.bg.parallax"),
					() => Q("lbl.parallax")
				]), U("change", c, (e) => Cn(t(), i, e)), U("click", h, () => rn(t(), i, H(r).props.size ?? 1, -.05)), U("change", g, (e) => an(t(), i, e.target.value)), U("click", _, () => rn(t(), i, H(r).props.size ?? 1, .05)), U("input", w, (e) => Qt(t(), i, "blur", Number(e.target.value))), U("input", te, (e) => Qt(t(), i, "opacity", Number(e.target.value))), U("change", re, (e) => Qt(t(), i, "parallax", e.target.checked ? .3 : 0)), G(e, a);
			}, b = (e) => {
				var n = ns(), a = z(n), o = R(a), s = B(o);
				M(a);
				var l = B(a, 2);
				Br(l, 17, () => H(r).props.images ?? [], Ir, (e, n, a) => {
					var o = ts(), s = z(o), l = R(s), u = B(l, 2), d = R(u);
					d.disabled = a === 0, J(d, () => c.up, !0), M(d);
					var f = B(d, 2);
					J(f, () => c.down, !0), M(f);
					var p = B(f, 2);
					J(p, () => c.cross, !0), M(p), M(u), M(s);
					var m = B(s, 2), h = R(m), g = B(h), _ = R(g);
					M(g), M(m);
					var v = B(m, 2);
					Y(v);
					var y = B(v, 2), b = R(y), x = B(b), S = R(x);
					M(x), M(y);
					var C = B(y, 2);
					Y(C), V((e, t, i, o, s) => {
						Z(l, "src", H(n).src), f.disabled = a === H(r).props.images.length - 1, Z(p, "title", e), K(h, `${t ?? ""} `), K(_, `${i ?? ""}%`), X(v, H(n).x ?? .5), K(b, `${o ?? ""} `), K(S, `${s ?? ""}%`), X(C, H(n).y ?? .5);
					}, [
						() => Q("tip.removeImage"),
						() => Q("lbl.focusX"),
						() => Math.round((H(n).x ?? .5) * 100),
						() => Q("lbl.focusY"),
						() => Math.round((H(n).y ?? .5) * 100)
					]), U("click", d, () => Tn(t(), i, a, -1)), U("click", f, () => Tn(t(), i, a, 1)), U("click", p, () => En(t(), i, a)), U("input", v, (e) => Dn(t(), i, a, "x", Number(e.target.value))), U("input", C, (e) => Dn(t(), i, a, "y", Number(e.target.value))), G(e, o);
				});
				var u = B(l, 2), d = R(u), f = B(d);
				{
					let e = /* @__PURE__ */ F(() => H(r).props.fit ?? "cover"), n = /* @__PURE__ */ F(() => [["cover", Q("opt.fit.cover")], ["contain", Q("opt.fit.contain")]]);
					$(f, {
						get value() {
							return H(e);
						},
						get options() {
							return H(n);
						},
						onchange: (e) => Qt(t(), i, "fit", e)
					});
				}
				M(u);
				var p = B(u, 2), m = R(p), h = B(m);
				Y(h), M(p);
				var g = B(p, 2), _ = R(g), v = B(_), y = R(v);
				M(v), M(g);
				var b = B(g, 2);
				Y(b);
				var x = B(b, 2), S = R(x), C = B(S), w = R(C);
				M(C), M(x);
				var T = B(x, 2);
				Y(T);
				var E = B(T, 2), D = R(E), ee = B(D), te = R(ee);
				M(ee), M(E);
				var ne = B(E, 2);
				Y(ne);
				var re = B(ne, 2), ie = R(re, !0);
				M(re), V((e, t, n, i, s, c, l, u, f, g, v) => {
					Z(a, "title", e), K(o, `${t ?? ""} `), K(d, `${n ?? ""} `), Z(p, "title", i), K(m, `${s ?? ""} `), X(h, H(r).props.interval ?? 6), K(_, `${c ?? ""} `), K(y, `${l ?? ""} s`), X(b, H(r).props.fade ?? 1.5), K(S, `${u ?? ""} `), K(w, `${H(r).props.blur ?? 0 ?? ""} px`), X(T, H(r).props.blur ?? 0), K(D, `${f ?? ""} `), K(te, `${g ?? ""}%`), X(ne, H(r).props.opacity ?? 1), K(ie, v);
				}, [
					() => Q("tip.bg.addImages"),
					() => Q("ui.addImages"),
					() => Q("lbl.fit"),
					() => Q("hint.bg.gallery"),
					() => Q("lbl.secondsPerImage"),
					() => Q("lbl.transition"),
					() => (H(r).props.fade ?? 1.5).toFixed(1),
					() => Q("lbl.blur"),
					() => Q("lbl.strength"),
					() => Math.round((H(r).props.opacity ?? 1) * 100),
					() => Q("hint.bg.gallery")
				]), U("change", s, (e) => wn(t(), i, e)), U("change", h, (e) => Qt(t(), i, "interval", Number(e.target.value))), U("input", b, (e) => Qt(t(), i, "fade", Number(e.target.value))), U("input", T, (e) => Qt(t(), i, "blur", Number(e.target.value))), U("input", ne, (e) => Qt(t(), i, "opacity", Number(e.target.value))), G(e, n);
			};
			q(m, (e) => {
				H(r).type === "color" ? e(h) : H(r).type === "gradient" ? e(g, 1) : H(r).type === "glow" ? e(_, 2) : H(r).type === "grain" ? e(v, 3) : H(r).type === "image" ? e(y, 4) : H(r).type === "bildegalleri" && e(b, 5);
			}), M(a), V((e, t, r) => {
				Z(d, "title", e), Z(f, "title", t), f.disabled = i === n().length - 1, Z(p, "title", r);
			}, [
				() => Q("hint.bg.order"),
				() => Q("hint.bg.order"),
				() => Q("tip.bg.removeLayer")
			]), U("click", d, () => Zt(t(), i, -1)), U("click", f, () => Zt(t(), i, 1)), U("click", p, () => Xt(t(), i)), G(e, a);
		});
		var a = B(i, 2), s = R(a), l = B(s);
		{
			let e = /* @__PURE__ */ F(() => o.map(([e, t]) => [e, t.labelKey ? Q(t.labelKey) : t.label]));
			$(l, {
				get value() {
					return H(Jt);
				},
				get options() {
					return H(e);
				},
				onchange: (e) => L(Jt, e, !0)
			});
		}
		M(a);
		var u = B(a, 2), f = R(u, !0);
		M(u), V((e, t) => {
			K(s, `${e ?? ""} `), K(f, t);
		}, [() => Q("lbl.newLayer"), () => Q("ui.addLayer")]), U("click", u, () => Yt(t(), H(Jt))), G(e, r);
	}, r = (e, t = d, n = d) => {
		var r = Ar();
		Br(z(r), 17, n, Ir, (e, r, i) => {
			var a = os(), o = R(a);
			Y(o);
			var s = B(o, 2), l = R(s);
			l.disabled = i === 0, J(l, () => c.up, !0), M(l);
			var u = B(l, 2);
			J(u, () => c.down, !0), M(u);
			var d = B(u, 2);
			J(d, () => c.cross, !0), M(d), M(s);
			var f = B(s, 2), p = R(f);
			{
				let e = /* @__PURE__ */ F(() => H(r).page ?? "__href"), n = /* @__PURE__ */ F(() => Q("tip.linkTarget")), a = /* @__PURE__ */ F(() => [...H(A).pages.map((e) => [e.id, e.title]), ["__href", Q("opt.linkHref")]]);
				$(p, {
					get value() {
						return H(e);
					},
					get title() {
						return H(n);
					},
					get options() {
						return H(a);
					},
					onchange: (e) => mo(t(), i, e)
				});
			}
			M(f);
			var m = B(f, 2), h = (e) => {
				var n = as();
				Y(n), V((e, t) => {
					X(n, H(r).href ?? ""), Z(n, "placeholder", e), Z(n, "title", t);
				}, [() => Q("ph.hrefAnchor"), () => Q("tip.hrefAnchor")]), U("change", n, (e) => ho(t(), i, e.target.value)), G(e, n);
			};
			q(m, (e) => {
				H(r).page || e(h);
			}), M(a), V((e, t) => {
				X(o, H(r).label), Z(o, "title", e), u.disabled = i === n().length - 1, Z(d, "title", t);
			}, [() => Q("tip.linkLabel"), () => Q("tip.removeLink")]), U("input", o, (e) => po(t(), i, e.target.value)), U("click", l, () => fo(t(), i, -1)), U("click", u, () => fo(t(), i, 1)), U("click", d, () => lo(t(), i)), G(e, a);
		}), G(e, r);
	}, i = (e) => {
		let t = /* @__PURE__ */ F(() => H(N).props.boxStyle ?? {});
		var n = ls(), r = z(n), i = R(r), a = B(i);
		{
			let e = /* @__PURE__ */ F(() => H(t).bg ?? ""), n = /* @__PURE__ */ F(Mn), r = /* @__PURE__ */ F(() => Q("tip.box.bg"));
			Hi(a, {
				get value() {
					return H(e);
				},
				get tokens() {
					return H(n);
				},
				allowClear: !0,
				get label() {
					return H(r);
				},
				onchange: (e) => wt({ bg: e || null })
			});
		}
		M(r);
		var o = B(r, 2), s = R(o), c = B(s);
		{
			let e = /* @__PURE__ */ F(() => H(t).shadow ?? ""), n = /* @__PURE__ */ F(() => [
				["", Q("common.none")],
				["soft", Q("opt.shadow.soft")],
				["strong", Q("opt.shadow.strong")]
			]);
			$(c, {
				get value() {
					return H(e);
				},
				get options() {
					return H(n);
				},
				onchange: (e) => wt({ shadow: e || null })
			});
		}
		M(o);
		var l = B(o, 2), u = (e) => {
			var n = ss(), r = R(n), i = B(r);
			{
				let e = /* @__PURE__ */ F(() => H(t).shadowColor ?? ""), n = /* @__PURE__ */ F(Mn), r = /* @__PURE__ */ F(() => Q("tip.box.shadowColor"));
				Hi(i, {
					get value() {
						return H(e);
					},
					get tokens() {
						return H(n);
					},
					allowClear: !0,
					get label() {
						return H(r);
					},
					onchange: (e) => wt({ shadowColor: e || null })
				});
			}
			M(n), V((e) => K(r, `${e ?? ""} `), [() => Q("lbl.shadowColor")]), G(e, n);
		};
		q(l, (e) => {
			H(t).shadow && e(u);
		});
		var d = B(l, 2), f = R(d), p = B(f);
		{
			let e = /* @__PURE__ */ F(() => H(t).border === "none" ? "none" : H(t).border ? "custom" : ""), n = /* @__PURE__ */ F(() => [
				["", Q("opt.border.theme")],
				["none", Q("common.none")],
				["custom", Q("opt.border.custom")]
			]);
			$(p, {
				get value() {
					return H(e);
				},
				get options() {
					return H(n);
				},
				onchange: (e) => wt({ border: e === "custom" ? {
					color: "accent",
					width: 1
				} : e || null })
			});
		}
		M(d);
		var m = B(d, 2), h = (e) => {
			let n = /* @__PURE__ */ F(() => typeof H(t).border == "object" ? H(t).border : {
				color: "text",
				width: 1
			});
			var r = cs(), i = z(r), a = R(i), o = B(a);
			{
				let e = /* @__PURE__ */ F(Mn), t = /* @__PURE__ */ F(() => Q("tip.box.borderColor"));
				Hi(o, {
					get value() {
						return H(n).color;
					},
					get tokens() {
						return H(e);
					},
					get label() {
						return H(t);
					},
					onchange: (e) => wt({ border: {
						...H(n),
						color: e
					} })
				});
			}
			M(i);
			var s = B(i, 2), c = R(s), l = B(c), u = R(l), d = B(u, 2);
			Y(d);
			var f = B(d, 2);
			M(l), M(s), V((e, t, r, i, o, s) => {
				K(a, `${e ?? ""} `), K(c, `${t ?? ""} `), Z(u, "title", r), Z(u, "aria-label", i), X(d, H(n).width), Z(f, "title", o), Z(f, "aria-label", s);
			}, [
				() => Q("lbl.borderColor"),
				() => Q("lbl.thicknessPx"),
				() => Q("tip.thinner"),
				() => Q("tip.thinner"),
				() => Q("tip.thicker"),
				() => Q("tip.thicker")
			]), U("click", u, () => wt({ border: {
				...H(n),
				width: Math.max(1, H(n).width - 1)
			} })), U("change", d, (e) => wt({ border: {
				...H(n),
				width: Math.min(12, Math.max(1, Number(e.target.value) || 1))
			} })), U("click", f, () => wt({ border: {
				...H(n),
				width: Math.min(12, H(n).width + 1)
			} })), G(e, r);
		};
		q(m, (e) => {
			H(t).border !== "none" && e(h);
		});
		var g = B(m, 2), _ = R(g);
		Y(_);
		var v = B(_);
		M(g), V((e, t, n, r, a, o) => {
			K(i, `${e ?? ""} `), K(s, `${t ?? ""} `), K(f, `${n ?? ""} `), Z(g, "title", r), ii(_, a), K(v, ` ${o ?? ""}`);
		}, [
			() => Q("lbl.blockColor"),
			() => Q("lbl.shadow"),
			() => Q("lbl.border"),
			() => Q("tip.box.glass"),
			() => !!H(t).glass,
			() => Q("lbl.glass")
		]), U("change", _, (e) => wt({ glass: e.target.checked || null })), G(e, n);
	}, a = (e) => {
		var t = Us(), n = z(t), r = R(n), a = R(r);
		let o;
		var s = R(a, !0);
		M(a);
		var l = B(a, 2);
		let u;
		var d = R(l, !0);
		M(l), M(r), M(n);
		var f = B(n, 2), p = (e) => {
			var t = Ar(), n = z(t), r = (e) => {
				var t = us(), n = R(t, !0);
				M(t), V((e) => K(n, e), [() => Q("hint.textInline")]), G(e, t);
			}, i = (e) => {
				var t = fs(), n = z(t), r = R(n);
				Y(r);
				var i = B(r);
				M(n);
				var a = B(n, 2), o = R(a, !0);
				M(a);
				var s = B(a, 2);
				Br(s, 17, () => H(N).props.items ?? [], Ir, (e, t, n) => {
					var r = ds(), i = R(r);
					Y(i);
					var a = B(i, 2), o = R(a);
					o.disabled = n === 0, J(o, () => c.up, !0), M(o);
					var s = B(o, 2);
					J(s, () => c.down, !0), M(s);
					var l = B(s, 2);
					J(l, () => c.cross, !0), M(l), M(a), M(r), V((e, r) => {
						X(i, H(t).q), Z(i, "title", e), s.disabled = n === (H(N).props.items?.length ?? 0) - 1, Z(l, "title", r);
					}, [() => Q("tip.faq.question"), () => Q("tip.faq.remove")]), U("change", i, (e) => Tt(n, { q: e.target.value })), U("click", o, () => Ot(n, -1)), U("click", s, () => Ot(n, 1)), U("click", l, () => Dt(n)), G(e, r);
				});
				var l = B(s, 2), u = R(l, !0);
				M(l), V((e, t, a, s, c) => {
					Z(n, "title", e), ii(r, t), K(i, ` ${a ?? ""}`), K(o, s), K(u, c);
				}, [
					() => Q("tip.faq.multi"),
					() => !!H(N).props.multi,
					() => Q("lbl.faqMulti"),
					() => Q("lbl.questions"),
					() => Q("ui.addQuestion")
				]), U("change", r, (e) => P("multi", e.target.checked)), U("click", l, Et), G(e, t);
			}, a = (e) => {
				var t = ms(), n = z(t), r = R(n), i = B(r);
				Y(i), M(n);
				var a = B(n, 2), o = R(a), s = B(o);
				{
					let e = /* @__PURE__ */ F(() => H(N).props.page ?? "__href"), t = /* @__PURE__ */ F(() => [...H(A).pages.map((e) => [e.id, e.title]), ["__href", Q("opt.externalLink")]]);
					$(s, {
						get value() {
							return H(e);
						},
						get options() {
							return H(t);
						},
						onchange: (e) => {
							let t = e === "__href" ? null : e;
							ht(`edit:${H(N).blockId}`, (e) => {
								e.props.page = t, t && (e.props.href = null);
							});
						}
					});
				}
				M(a);
				var c = B(a, 2), l = (e) => {
					var t = ps();
					Y(t), V((e) => {
						Z(t, "placeholder", e), X(t, H(N).props.href === "#" ? "" : H(N).props.href ?? "");
					}, [() => Q("ph.url")]), U("change", t, (e) => P("href", e.target.value || null)), G(e, t);
				};
				q(c, (e) => {
					H(N).props.page || e(l);
				}), V((e, t) => {
					K(r, `${e ?? ""} `), X(i, H(N).props.label), K(o, `${t ?? ""} `);
				}, [() => Q("blocks.text"), () => Q("lbl.goesTo")]), U("change", i, (e) => P("label", e.target.value)), G(e, t);
			}, o = (e) => {
				var t = gs(), n = z(t), r = R(n), i = B(r);
				M(n);
				var a = B(n, 2), o = R(a), s = B(o);
				Y(s), M(a);
				var c = B(a, 2), l = R(c), u = B(l);
				Y(u), M(c);
				var d = B(c, 2), f = (e) => {
					var t = hs(), n = R(t);
					Y(n);
					var r = B(n);
					M(t), V((e, i, a) => {
						Z(t, "title", e), ii(n, i), K(r, ` ${a ?? ""}`);
					}, [
						() => Q("tip.lightbox"),
						() => !!H(N).props.lightbox,
						() => Q("lbl.lightbox")
					]), U("change", n, (e) => P("lightbox", e.target.checked)), G(e, t);
				};
				q(d, (e) => {
					H(N).props.href || e(f);
				}), V((e, t, n, i, a) => {
					K(r, `${e ?? ""} `), K(o, `${t ?? ""} `), X(s, H(N).props.alt ?? ""), Z(s, "placeholder", n), K(l, `${i ?? ""} `), X(u, H(N).props.href ?? ""), Z(u, "placeholder", a);
				}, [
					() => Q("ui.changeImage"),
					() => Q("lbl.description"),
					() => Q("ph.altText"),
					() => Q("lbl.link"),
					() => Q("ph.optionalImageLink")
				]), U("change", i, At), U("change", s, (e) => P("alt", e.target.value)), U("change", u, (e) => P("href", e.target.value || null)), G(e, t);
			}, s = (e) => {
				var t = _s(), n = z(t), r = R(n, !0);
				M(n);
				var i = B(n, 2);
				Y(i);
				var a = B(i, 2), o = R(a), s = B(o);
				Y(s), M(a), V((e, t, a, c) => {
					Z(n, "title", e), K(r, t), X(i, H(N).props.url ?? ""), Z(i, "placeholder", a), K(o, `${c ?? ""} `), X(s, H(N).props.title ?? "");
				}, [
					() => Q("hint.video"),
					() => Q("lbl.videoUrl"),
					() => Q("ph.videoUrl"),
					() => Q("lbl.videoTitle")
				]), U("change", i, (e) => P("url", e.target.value)), U("change", s, (e) => P("title", e.target.value)), G(e, t);
			}, l = (e) => {
				var t = xs(), n = z(t), r = R(n), i = B(r), a = R(i);
				{
					let e = /* @__PURE__ */ F(() => H(N).props.glyph ?? "★"), t = /* @__PURE__ */ F(() => H(N).props.icon ?? null), n = /* @__PURE__ */ F(() => H(N).props.image ?? null);
					ba(a, {
						get value() {
							return H(e);
						},
						get icon() {
							return H(t);
						},
						get image() {
							return H(n);
						},
						onpick: (e) => ht(`edit:${H(N).blockId}`, (t) => {
							t.props.glyph = e, t.props.icon = null, t.props.image = null;
						}),
						onicon: (e) => ht(`edit:${H(N).blockId}`, (t) => {
							t.props.icon = e, t.props.image = null;
						}),
						onimage: (e) => P("image", e)
					});
				}
				var o = B(a, 2), s = (e) => {
					var t = vs();
					Y(t), V((e) => {
						X(t, H(N).props.glyph ?? ""), Z(t, "title", e);
					}, [() => Q("tip.icon.typeGlyph")]), U("change", t, (e) => P("glyph", e.target.value || "★")), G(e, t);
				}, c = (e) => {
					var t = ys(), n = R(t, !0);
					M(t), V((e, r) => {
						Z(t, "title", e), K(n, r);
					}, [() => Q("tip.icon.backToGlyph"), () => Q("ui.removeDrawnIcon")]), U("click", t, () => P("icon", null)), G(e, t);
				};
				q(o, (e) => {
					H(N).props.icon ? e(c, -1) : e(s);
				}), M(i), M(n);
				var l = B(n, 2), u = (e) => {
					var t = bs(), n = R(t), r = B(n, 2), i = R(r, !0);
					M(r), M(t), V((e, r, a) => {
						Z(t, "title", e), Z(n, "src", H(N).props.image), Z(n, "alt", r), K(i, a);
					}, [
						() => Q("hint.icon.ownImage"),
						() => Q("gp.ownIcon"),
						() => Q("ui.removeOwnIcon")
					]), U("click", r, () => P("image", null)), G(e, t);
				};
				q(l, (e) => {
					H(N).props.image && e(u);
				}), V((e) => K(r, `${e ?? ""} `), [() => Q("blocks.icon")]), G(e, t);
			}, u = (e) => {
				var t = Ss(), n = z(t), r = R(n), i = B(r);
				{
					let e = /* @__PURE__ */ F(() => H(N).props.collection ?? ""), t = /* @__PURE__ */ F(() => [["", Q("common.choose")], ...H(Ci).map((e) => [e, H(wi)[e]?.name ?? e])]);
					$(i, {
						get value() {
							return H(e);
						},
						get options() {
							return H(t);
						},
						onchange: (e) => P("collection", e || null)
					});
				}
				M(n);
				var a = B(n, 2), o = R(a), s = B(o);
				Y(s), M(a);
				var c = B(a, 2), l = R(c);
				Y(l);
				var u = B(l);
				M(c), V((e, t, i, c, d) => {
					Z(n, "title", e), K(r, `${t ?? ""} `), Z(a, "title", i), K(o, `${c ?? ""} `), X(s, H(N).props.limit ?? 6), ii(l, H(N).props.newestFirst !== !1), K(u, ` ${d ?? ""}`);
				}, [
					() => Q("tip.samling.source"),
					() => Q("blocks.samling"),
					() => Q("tip.samling.limit"),
					() => Q("lbl.maxCount"),
					() => Q("lbl.newestFirst")
				]), U("change", s, (e) => P("limit", Number(e.target.value))), U("change", l, (e) => P("newestFirst", e.target.checked)), G(e, t);
			}, d = (e) => {
				var t = ws(), n = z(t), r = R(n), i = B(r);
				M(n), Br(B(n, 2), 17, () => H(N).props.images ?? [], Ir, (e, t, n) => {
					var r = Cs(), i = R(r), a = R(i), o = B(a, 2), s = R(o);
					s.disabled = n === 0, J(s, () => c.up, !0), M(s);
					var l = B(s, 2);
					J(l, () => c.down, !0), M(l);
					var u = B(l, 2);
					J(u, () => c.cross, !0), M(u), M(o), M(i);
					var d = B(i, 2), f = R(d), p = B(f);
					Y(p), M(d);
					var m = B(d, 2), h = R(m), g = B(h);
					Y(g), M(m), M(r), V((e, r, o, s, c, d) => {
						Z(i, "title", e), Z(a, "src", H(t).src), l.disabled = n === H(N).props.images.length - 1, Z(u, "title", r), K(f, `${o ?? ""} `), X(p, H(t).alt ?? ""), Z(p, "placeholder", s), K(h, `${c ?? ""} `), X(g, H(t).href ?? ""), Z(g, "placeholder", d);
					}, [
						() => Q("hint.gallery"),
						() => Q("tip.removeImage"),
						() => Q("lbl.description"),
						() => Q("ph.altShort"),
						() => Q("lbl.link"),
						() => Q("ph.galleryHref")
					]), U("click", s, () => Eu(n, -1)), U("click", l, () => Eu(n, 1)), U("click", u, () => Du(n)), U("change", p, (e) => Ou(n, "alt", e.target.value)), U("change", g, (e) => Ou(n, "href", e.target.value || null)), G(e, r);
				}), V((e, t) => {
					Z(n, "title", e), K(r, `${t ?? ""} `);
				}, [() => Q("tip.gallery.addImages"), () => Q("ui.addImages")]), U("change", i, wu), G(e, t);
			}, f = (e) => {
				var t = ss(), n = R(t);
				$(B(n), {
					get value() {
						return H(N).props.kind;
					},
					get options() {
						return Mt;
					},
					onchange: (e) => P("kind", e)
				}), M(t), V((e) => K(n, `${e ?? ""} `), [() => Q("blocks.shape")]), G(e, t);
			}, p = (e) => {
				let t = /* @__PURE__ */ F(() => H(vu).find((e) => e.type === H(N).type)?.fields ?? []);
				var n = Ar(), r = z(n), i = (e) => {
					var n = Ar();
					Br(z(n), 17, () => H(t), (e) => e.key, (e, t) => {
						var n = Ar(), r = z(n), i = (e) => {
							let n = /* @__PURE__ */ F(() => `${H(N).blockId}:${H(t).key}`);
							var r = Es(), i = z(r), a = R(i), o = B(a);
							Y(o), M(i);
							var s = B(i, 2), c = R(s, !0);
							M(s);
							var l = B(s, 2), u = (e) => {
								var t = Ts();
								let r;
								var i = R(t, !0);
								M(t), V(() => {
									r = Zr(t, 1, "panel-hint svelte-1n46o8q", null, r, { "place-error": vt[H(n)].err }), K(i, vt[H(n)].text);
								}), G(e, t);
							};
							q(l, (e) => {
								vt[H(n)] && e(u);
							}), V((e) => {
								K(a, `${H(t).label ?? ""} `), Z(o, "placeholder", H(t).placeholder), X(o, _t[H(n)] ?? H(N).props[H(t).key] ?? ""), s.disabled = H(yt), K(c, e);
							}, [() => Q("props.place.search")]), U("input", o, (e) => {
								_t[H(n)] = e.target.value;
							}), U("keydown", o, (e) => {
								e.key === "Enter" && St(H(t));
							}), U("click", s, () => St(H(t))), G(e, r);
						}, a = (e) => {
							var n = Ds(), r = R(n), i = B(r);
							Y(i), M(n), V(() => {
								K(r, `${H(t).label ?? ""} `), Z(i, "min", H(t).min), Z(i, "max", H(t).max), Z(i, "step", H(t).step ?? 1), X(i, H(N).props[H(t).key]);
							}), U("change", i, (e) => P(H(t).key, xt(H(t), Number(e.target.value)))), G(e, n);
						}, o = (e) => {
							var n = hs(), r = R(n);
							Y(r);
							var i = B(r);
							M(n), V((e) => {
								ii(r, e), K(i, ` ${H(t).label ?? ""}`);
							}, [() => !!H(N).props[H(t).key]]), U("change", r, (e) => P(H(t).key, e.target.checked)), G(e, n);
						}, s = (e) => {
							var n = ss(), r = R(n), i = B(r);
							{
								let e = /* @__PURE__ */ F(() => (H(t).options ?? []).map((e) => [e.value, e.label]));
								$(i, {
									get value() {
										return H(N).props[H(t).key];
									},
									get options() {
										return H(e);
									},
									onchange: (e) => P(H(t).key, e)
								});
							}
							M(n), V(() => K(r, `${H(t).label ?? ""} `)), G(e, n);
						}, c = (e) => {
							var n = Os(), r = R(n), i = B(r);
							Y(i), M(n), V(() => {
								K(r, `${H(t).label ?? ""} `), Z(i, "placeholder", H(t).placeholder), X(i, H(N).props[H(t).key] ?? "");
							}), U("change", i, (e) => P(H(t).key, e.target.value)), G(e, n);
						};
						q(r, (e) => {
							H(t).type === "place" ? e(i) : H(t).type === "number" ? e(a, 1) : H(t).type === "toggle" ? e(o, 2) : H(t).type === "select" ? e(s, 3) : e(c, -1);
						}), G(e, n);
					}), G(e, n);
				}, a = (e) => {
					var t = ys(), n = R(t, !0);
					M(t), V((e, r) => {
						Z(t, "title", e), K(n, r);
					}, [() => Q("hint.pluginBlock"), () => Q("ui.settings")]), U("click", t, () => k?.sendOpenConfig(H(N).blockId)), G(e, t);
				};
				q(r, (e) => {
					H(t).length ? e(i) : e(a, -1);
				}), G(e, n);
			};
			q(n, (e) => {
				H(N).type === "text" ? e(r) : H(N).type === "faq" ? e(i, 1) : H(N).type === "button" ? e(a, 2) : H(N).type === "image" ? e(o, 3) : H(N).type === "video" ? e(s, 4) : H(N).type === "icon" ? e(l, 5) : H(N).type === "samling" ? e(u, 6) : H(N).type === "galleri" ? e(d, 7) : H(N).type === "shape" ? e(f, 8) : e(p, -1);
			}), G(e, t);
		}, m = (e) => {
			var t = Hs(), n = z(t), r = (e) => {
				var t = ks(), n = z(t), r = R(n), a = B(r);
				{
					let e = /* @__PURE__ */ F(() => H(N).props.align ?? "left"), t = /* @__PURE__ */ F(() => [
						["left", Q("common.left")],
						["center", Q("common.center")],
						["right", Q("common.right")]
					]);
					$(a, {
						get value() {
							return H(e);
						},
						get options() {
							return H(t);
						},
						onchange: (e) => P("align", e)
					});
				}
				M(n);
				var o = B(n, 2), s = R(o);
				Y(s);
				var c = B(s);
				M(o);
				var l = B(o, 2), u = (e) => {
					i(e);
				};
				q(l, (e) => {
					H(N).props.box && e(u);
				}), Me(2), V((e, t, n) => {
					K(r, `${e ?? ""} `), ii(s, t), K(c, ` ${n ?? ""}`);
				}, [
					() => Q("lbl.align"),
					() => !!H(N).props.box,
					() => Q("lbl.textBoxToggle")
				]), U("change", s, (e) => P("box", e.target.checked)), G(e, t);
			}, a = (e) => {
				var t = As(), n = z(t), r = R(n, !0);
				M(n);
				var a = B(n, 2);
				i(a), Me(2), V((e) => K(r, e), [() => Q("lbl.cardStyle")]), G(e, t);
			}, o = (e) => {
				var t = js(), n = z(t), r = R(n), i = B(r);
				{
					let e = /* @__PURE__ */ F(() => [["primary", Q("opt.btn.primary")], ["secondary", Q("opt.btn.secondary")]]);
					$(i, {
						get value() {
							return H(N).props.style;
						},
						get options() {
							return H(e);
						},
						onchange: (e) => P("style", e)
					});
				}
				M(n), Me(2), V((e) => K(r, `${e ?? ""} `), [() => Q("lbl.style")]), G(e, t);
			}, s = (e) => {
				var t = Ms(), n = z(t), r = R(n), i = B(r);
				{
					let e = /* @__PURE__ */ F(() => H(N).props.fit ?? "cover"), t = /* @__PURE__ */ F(() => [["cover", Q("opt.fitFrame.cover")], ["contain", Q("opt.fitFrame.contain")]]);
					$(i, {
						get value() {
							return H(e);
						},
						get options() {
							return H(t);
						},
						onchange: (e) => P("fit", e)
					});
				}
				M(n);
				var a = B(n, 2), o = R(a), s = B(o);
				{
					let e = /* @__PURE__ */ F(() => H(N).props.radius ?? ""), t = /* @__PURE__ */ F(() => [
						["", Q("common.none")],
						["sm", Q("opt.size.sm")],
						["md", Q("opt.radius.md")]
					]);
					$(s, {
						get value() {
							return H(e);
						},
						get options() {
							return H(t);
						},
						onchange: (e) => P("radius", e || null)
					});
				}
				M(a);
				var c = B(a, 2), l = R(c), u = B(l), d = R(u);
				M(u), M(c);
				var f = B(c, 2);
				Y(f);
				var p = B(f, 2), m = R(p), h = B(m), g = R(h);
				M(h), M(p);
				var _ = B(p, 2);
				Y(_);
				var v = B(_, 2), y = R(v), b = B(y), x = R(b);
				M(b), M(v);
				var S = B(v, 2);
				Y(S);
				var C = B(S, 2), w = R(C), T = B(w), E = R(T);
				M(T), M(C);
				var D = B(C, 2);
				Y(D);
				var ee = B(D, 2), te = R(ee), ne = B(te), re = R(ne);
				M(ne), M(ee);
				var ie = B(ee, 2);
				Y(ie);
				var ae = B(ie, 2), oe = R(ae), se = B(oe), ce = R(se);
				M(se), M(ae);
				var le = B(ae, 2);
				Y(le);
				var ue = B(le, 2), de = R(ue, !0);
				M(ue), Me(2), V((e, t, n, i, a, s, c, u, p, h, b, C, T, ee, ne, ae, se) => {
					K(r, `${e ?? ""} `), K(o, `${t ?? ""} `), K(l, `${n ?? ""} `), K(d, `${i ?? ""}%`), X(f, H(N).props.x ?? .5), K(m, `${a ?? ""} `), K(g, `${s ?? ""}%`), X(_, H(N).props.y ?? .5), Z(v, "title", c), K(y, `${u ?? ""} `), K(x, `${p ?? ""}x`), X(S, H(N).props.zoom ?? 1), K(w, `${h ?? ""} `), K(E, `${b ?? ""}%`), X(D, H(N).props.brightness ?? 1), K(te, `${C ?? ""} `), K(re, `${T ?? ""}%`), X(ie, H(N).props.contrast ?? 1), K(oe, `${ee ?? ""} `), K(ce, `${ne ?? ""}%`), X(le, H(N).props.saturate ?? 1), Z(ue, "title", ae), K(de, se);
				}, [
					() => Q("lbl.fit"),
					() => Q("lbl.radius"),
					() => Q("lbl.focusX"),
					() => Math.round((H(N).props.x ?? .5) * 100),
					() => Q("lbl.focusY"),
					() => Math.round((H(N).props.y ?? .5) * 100),
					() => Q("tip.zoomCrop"),
					() => Q("lbl.zoom"),
					() => (H(N).props.zoom ?? 1).toFixed(2),
					() => Q("lbl.brightness"),
					() => Math.round((H(N).props.brightness ?? 1) * 100),
					() => Q("lbl.contrast"),
					() => Math.round((H(N).props.contrast ?? 1) * 100),
					() => Q("lbl.saturate"),
					() => Math.round((H(N).props.saturate ?? 1) * 100),
					() => Q("tip.resetAdjust"),
					() => Q("ui.resetAdjust")
				]), U("input", f, (e) => P("x", Number(e.target.value))), U("input", _, (e) => P("y", Number(e.target.value))), U("input", S, (e) => P("zoom", Number(e.target.value))), U("input", D, (e) => P("brightness", Number(e.target.value))), U("input", ie, (e) => P("contrast", Number(e.target.value))), U("input", le, (e) => P("saturate", Number(e.target.value))), U("click", ue, () => ht(`edit:${H(N).blockId}`, (e) => {
					e.props.brightness = 1, e.props.contrast = 1, e.props.saturate = 1;
				})), G(e, t);
			}, c = (e) => {
				var t = Ns(), n = z(t), r = R(n), i = B(r);
				Y(i), M(n);
				var a = B(n, 2), o = R(a), s = B(o);
				{
					let e = /* @__PURE__ */ F(() => H(N).props.color ?? "accent"), t = /* @__PURE__ */ F(Mn);
					Hi(s, {
						get value() {
							return H(e);
						},
						get tokens() {
							return H(t);
						},
						onchange: (e) => P("color", e)
					});
				}
				M(a), Me(2), V((e, t, n) => {
					K(r, `${e ?? ""} `), X(i, H(N).props.size ?? 48), Z(a, "title", t), K(o, `${n ?? ""} `);
				}, [
					() => Q("lbl.sizePx"),
					() => Q("hint.icon.color"),
					() => Q("lbl.color")
				]), U("change", i, (e) => P("size", Number(e.target.value))), G(e, t);
			}, l = (e) => {
				var t = js(), n = z(t), r = R(n), i = B(r);
				{
					let e = /* @__PURE__ */ F(() => H(N).props.view ?? "cards"), t = /* @__PURE__ */ F(() => [
						["cards", Q("opt.collectionView.cards")],
						["list", Q("opt.collectionView.list")],
						["archive", Q("opt.collectionView.archive")]
					]);
					$(i, {
						get value() {
							return H(e);
						},
						get options() {
							return H(t);
						},
						onchange: (e) => P("view", e)
					});
				}
				M(n), Me(2), V((e) => K(r, `${e ?? ""} `), [() => Q("lbl.view")]), G(e, t);
			}, u = (e) => {
				var t = Is(), n = z(t), r = R(n), i = B(r);
				{
					let e = /* @__PURE__ */ F(() => H(N).props.view ?? "grid"), t = /* @__PURE__ */ F(() => [
						["grid", Q("opt.galleryView.grid")],
						["carousel", Q("opt.galleryView.carousel")],
						["slides", Q("opt.galleryView.slides")]
					]);
					$(i, {
						get value() {
							return H(e);
						},
						get options() {
							return H(t);
						},
						onchange: (e) => P("view", e)
					});
				}
				M(n);
				var a = B(n, 2), o = (e) => {
					var t = Ps(), n = z(t), r = R(n), i = B(r);
					Y(i), M(n);
					var a = B(n, 2), o = R(a), s = B(o), c = R(s);
					M(s), M(a);
					var l = B(a, 2);
					Y(l), V((e, t) => {
						K(r, `${e ?? ""} `), X(i, H(N).props.columns ?? 3), K(o, `${t ?? ""} `), K(c, `${H(N).props.gap ?? 12 ?? ""} px`), X(l, H(N).props.gap ?? 12);
					}, [() => Q("lbl.columns"), () => Q("lbl.imageGap")]), U("change", i, (e) => P("columns", Number(e.target.value))), U("input", l, (e) => P("gap", Number(e.target.value))), G(e, t);
				};
				q(a, (e) => {
					(H(N).props.view ?? "grid") === "grid" && e(o);
				});
				var s = B(a, 2), c = (e) => {
					var t = Fs(), n = R(t), r = B(n);
					Y(r), M(t), V((e) => {
						K(n, `${e ?? ""} `), X(r, H(N).props.interval ?? 5);
					}, [() => Q("lbl.secondsPerImage")]), U("change", r, (e) => P("interval", Number(e.target.value))), G(e, t);
				};
				q(s, (e) => {
					H(N).props.view === "slides" && e(c);
				});
				var l = B(s, 2), u = R(l), d = B(u);
				{
					let e = /* @__PURE__ */ F(() => H(N).props.radius ?? ""), t = /* @__PURE__ */ F(() => [
						["", Q("common.none")],
						["sm", Q("opt.size.sm")],
						["md", Q("opt.radius.md")]
					]);
					$(d, {
						get value() {
							return H(e);
						},
						get options() {
							return H(t);
						},
						onchange: (e) => P("radius", e || null)
					});
				}
				M(l);
				var f = B(l, 2), p = R(f);
				Y(p);
				var m = B(p);
				M(f), Me(2), V((e, t, n, i) => {
					K(r, `${e ?? ""} `), K(u, `${t ?? ""} `), Z(f, "title", n), ii(p, H(N).props.lightbox !== !1), K(m, ` ${i ?? ""}`);
				}, [
					() => Q("lbl.view"),
					() => Q("lbl.radius"),
					() => Q("tip.lightbox"),
					() => Q("lbl.lightbox")
				]), U("change", p, (e) => P("lightbox", e.target.checked)), G(e, t);
			}, d = (e) => {
				var t = Ls(), n = z(t), r = R(n);
				$(B(r), {
					get value() {
						return H(N).props.color;
					},
					get options() {
						return Nt;
					},
					onchange: (e) => P("color", e)
				}), M(n);
				var i = B(n, 2), a = R(i), o = B(a);
				Y(o), M(i);
				var s = B(i, 2), c = R(s);
				Y(c);
				var l = B(c);
				M(s), Me(2), V((e, t, n, i, u) => {
					K(r, `${e ?? ""} `), K(a, `${t ?? ""} `), X(o, H(N).props.thickness), Z(s, "title", n), ii(c, i), K(l, ` ${u ?? ""}`);
				}, [
					() => Q("lbl.color"),
					() => Q("lbl.thickness"),
					() => Q("tip.shape.fill"),
					() => !!H(N).props.fill,
					() => Q("lbl.filled")
				]), U("change", o, (e) => P("thickness", Number(e.target.value))), U("change", c, (e) => P("fill", e.target.checked ? H(N).props.color : null)), G(e, t);
			};
			q(n, (e) => {
				H(N).type === "text" ? e(r) : H(N).type === "faq" ? e(a, 1) : H(N).type === "button" ? e(o, 2) : H(N).type === "image" ? e(s, 3) : H(N).type === "icon" ? e(c, 4) : H(N).type === "samling" ? e(l, 5) : H(N).type === "galleri" ? e(u, 6) : H(N).type === "shape" && e(d, 7);
			});
			var f = B(n, 2), p = R(f), m = B(p);
			{
				let e = /* @__PURE__ */ F(() => Bn(H(N).animation) ? H(N).animation.type : "");
				$(m, {
					get value() {
						return H(e);
					},
					get options() {
						return Vn;
					},
					onchange: (e) => Wn(e || null)
				});
			}
			M(f);
			var h = B(f, 2), g = (e) => {
				var t = Rs(), n = z(t), r = R(n), i = B(r);
				Y(i), M(n);
				var a = B(n, 2), o = R(a), s = B(o);
				Y(s), M(a), V((e, t) => {
					K(r, `${e ?? ""} `), X(i, H(N).animation.props.duration), K(o, `${t ?? ""} `), X(s, H(N).animation.props.delay);
				}, [() => Q("lbl.durationMs"), () => Q("lbl.delayMs")]), U("change", i, (e) => Kn("duration", Number(e.target.value))), U("change", s, (e) => Kn("delay", Number(e.target.value))), G(e, t);
			}, _ = /* @__PURE__ */ F(() => Bn(H(N).animation));
			q(h, (e) => {
				H(_) && e(g);
			});
			var v = B(h, 2), y = R(v), b = B(y);
			{
				let e = /* @__PURE__ */ F(() => H(N).hover?.type ?? (H(N).animation && !Bn(H(N).animation) ? H(N).animation.type : ""));
				$(b, {
					get value() {
						return H(e);
					},
					get options() {
						return Hn;
					},
					onchange: (e) => Gn(e || null)
				});
			}
			M(v);
			var x = B(v, 2), S = (e) => {
				var t = Bs(), n = B(z(t), 2), r = R(n);
				Y(r);
				var i = B(r);
				M(n);
				var a = B(n, 2), o = (e) => {
					var t = zs(), n = z(t), r = R(n), i = B(r);
					Y(i), M(n);
					var a = B(n, 2), o = R(a), s = B(o);
					{
						let e = /* @__PURE__ */ F(() => H(N).sticky.until ?? ""), t = /* @__PURE__ */ F(pt);
						$(s, {
							get value() {
								return H(e);
							},
							get options() {
								return H(t);
							},
							onchange: (e) => ht(`edit:${H(N).blockId}`, (t) => {
								t.sticky = {
									...t.sticky,
									until: e || null
								};
							})
						});
					}
					M(a), V((e, t, s, c) => {
						Z(n, "title", e), K(r, `${t ?? ""} `), X(i, H(N).sticky.offset ?? 16), Z(a, "title", s), K(o, `${c ?? ""} `);
					}, [
						() => Q("tip.stickyOffset"),
						() => Q("lbl.stickyOffset"),
						() => Q("tip.stickyUntil"),
						() => Q("lbl.stickyUntil")
					]), U("change", i, (e) => ht(`edit:${H(N).blockId}`, (t) => {
						t.sticky = {
							...t.sticky,
							offset: Math.max(0, Number(e.target.value) || 0)
						};
					})), G(e, t);
				};
				q(a, (e) => {
					H(N).sticky && e(o);
				}), V((e, t, a) => {
					Z(n, "title", e), ii(r, t), K(i, ` ${a ?? ""}`);
				}, [
					() => Q("tip.sticky"),
					() => !!H(N).sticky,
					() => Q("lbl.sticky")
				]), U("change", r, (e) => ht(`edit:${H(N).blockId}`, (t) => {
					t.sticky = e.target.checked ? {
						offset: 16,
						until: null
					} : null;
				})), G(e, t);
			};
			q(x, (e) => {
				H(ee) === "desktop" && e(S);
			});
			var C = B(x, 4), w = R(C), T = R(w, !0);
			M(w);
			var E = B(w, 2), D = R(E), te = (e) => {
				var t = Vs(), n = R(t), r = R(n, !0), i = B(r);
				Y(i), M(n);
				var a = B(n, 2), o = R(a, !0), s = B(o);
				Y(s), M(a);
				var c = B(a, 2), l = R(c, !0), u = B(l);
				Y(u), M(c);
				var d = B(c, 2), f = R(d, !0), p = B(f);
				Y(p), M(d);
				var m = B(d, 2), h = R(m, !0), g = B(h);
				Y(g), M(m);
				var _ = B(m, 2), v = R(_, !0), y = B(v);
				Y(y), M(_), M(t), V((e, t, n, a, c, d, _) => {
					K(r, e), X(i, H(N).frame.x), K(o, t), X(s, H(N).frame.y), K(l, n), X(u, H(N).frame.w), K(f, a), X(p, H(N).frame.h), Z(m, "title", c), K(h, d), X(g, H(N).frame.z ?? 1), K(v, _), X(y, H(N).frame.rot ?? 0);
				}, [
					() => Q("frame.x"),
					() => Q("frame.y"),
					() => Q("frame.w"),
					() => Q("frame.h"),
					() => Q("tip.frameZ"),
					() => Q("frame.z"),
					() => Q("frame.rot")
				]), U("change", i, (e) => Ct("x", Number(e.target.value))), U("change", s, (e) => Ct("y", Number(e.target.value))), U("change", u, (e) => Ct("w", Number(e.target.value))), U("change", p, (e) => Ct("h", Number(e.target.value))), U("change", g, (e) => Ct("z", Number(e.target.value))), U("change", y, (e) => Ct("rot", Number(e.target.value))), G(e, t);
			};
			q(D, (e) => {
				H(ee) === "desktop" && e(te);
			});
			var ne = B(D, 2), re = R(ne);
			Y(re);
			var ie = B(re);
			M(ne), M(E), M(C), V((e, t, n, r, i, a, o, s) => {
				Z(f, "title", e), K(p, `${t ?? ""} `), Z(v, "title", n), K(y, `${r ?? ""} `), Z(w, "title", i), K(T, a), Z(ne, "title", o), ii(re, H(N).decor), K(ie, ` ${s ?? ""}`);
			}, [
				() => Q("tip.props.blockAnim"),
				() => Q("lbl.animIn"),
				() => Q("tip.props.blockHover"),
				() => Q("lbl.onHover"),
				() => Q("hint.placement"),
				() => Q("group.placement"),
				() => Q("tip.decor"),
				() => Q("lbl.decor")
			]), U("change", re, (e) => kt(e.target.checked)), G(e, t);
		};
		q(f, (e) => {
			H(bt) === "content" ? e(p) : e(m, -1);
		}), V((e, t) => {
			o = Zr(a, 1, "svelte-1n46o8q", null, o, { on: H(bt) === "content" }), K(s, e), u = Zr(l, 1, "svelte-1n46o8q", null, u, { on: H(bt) === "style" }), K(d, t);
		}, [() => Q("props.tabContent"), () => Q("props.tabStyle")]), U("click", a, () => L(bt, "content")), U("click", l, () => L(bt, "style")), G(e, t);
	}, o = [
		["color", Ya],
		["gradient", so],
		["glow", co],
		["image", No],
		["bildegalleri", Lo],
		["grain", uo]
	], s = Object.fromEntries(o), c = {
		desktop: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"4\" y=\"5\" width=\"16\" height=\"11\" rx=\"1.5\"/><path d=\"M2 19h20\"/></svg>",
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
		guides: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"3.5\" y=\"3.5\" width=\"17\" height=\"17\" rx=\"2\"/><path d=\"M3.5 9.2h17M3.5 14.8h17M9.2 3.5v17M14.8 3.5v17\"/></svg>",
		fit: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M4 9V5a1 1 0 0 1 1-1h4M20 9V5a1 1 0 0 0-1-1h-4M4 15v4a1 1 0 0 0 1 1h4M20 15v4a1 1 0 0 1-1 1h-4\"/></svg>"
	}, l = [
		["lilla", Q("adminTheme.lilla")],
		["bronn", Q("adminTheme.bronn")],
		["gull", Q("adminTheme.gull")],
		["graa", Q("adminTheme.graa")],
		["nordlys", Q("adminTheme.nordlys")],
		["skumring", Q("adminTheme.skumring")],
		["glo", Q("adminTheme.glo")]
	], u = /* @__PURE__ */ I(en(localStorage.getItem("urd-admin-theme") ?? "graa"));
	yn(() => {
		document.documentElement.dataset.adminTheme = H(u), localStorage.setItem("urd-admin-theme", H(u)), f();
	});
	function f() {
		let e = getComputedStyle(document.documentElement), t = e.getPropertyValue("--urd-color-accent").trim();
		k?.sendAdminTheme({
			bg: e.getPropertyValue("--urd-color-bg").trim(),
			surface: e.getPropertyValue("--urd-color-surface").trim(),
			accent: t,
			text: e.getPropertyValue("--urd-color-text").trim(),
			"accent-text": p(t)
		});
	}
	function p(e) {
		return qa(e) == null || (Ja(e, "#ffffff") ?? 0) >= (Ja(e, "#0b0e14") ?? 0) ? "#ffffff" : "#0b0e14";
	}
	let h = /* @__PURE__ */ I(null), g = /* @__PURE__ */ I(null), _ = /* @__PURE__ */ I(!1), v = /* @__PURE__ */ I(""), y = /* @__PURE__ */ I("info"), b = 0;
	function x(e, t = "info") {
		L(v, e, !0), L(y, t, !0);
		let n = ++b;
		t === "ok" && setTimeout(() => {
			b === n && (L(v, ""), L(y, "info"));
		}, 8e3);
	}
	function S() {
		x(Q("status.storageFull"), "error");
	}
	function C(e, t) {
		try {
			localStorage.setItem(e, t);
		} catch {
			S();
		}
	}
	let w = /* @__PURE__ */ I(null), T = /* @__PURE__ */ I(null), E = /* @__PURE__ */ I(en({
		size: 16,
		snap: !0
	})), D = /* @__PURE__ */ I(!0), ee = /* @__PURE__ */ I("desktop"), te = /* @__PURE__ */ I(null), ne = /* @__PURE__ */ I(0), re = /* @__PURE__ */ I(0), ie = /* @__PURE__ */ I(en(typeof window < "u" ? window.innerWidth : 1280)), ae = /* @__PURE__ */ I("fit"), oe = /* @__PURE__ */ I(1), se = /* @__PURE__ */ F(() => H(ee) === "mobile" ? 390 : H(ie)), ce = /* @__PURE__ */ F(() => H(ae) === "manual" ? H(oe) : Ca(H(ne), H(se), "fit"));
	function le(e) {
		let t = Math.min(400, Math.max(10, (Math.round(Math.round(H(ce) * 100) / 10) + e) * 10));
		L(oe, t / 100), L(ae, "manual");
	}
	let ue = /* @__PURE__ */ F(() => H(ce) > 0 ? H(re) / H(ce) : H(re)), de = /* @__PURE__ */ F(() => H(se) * H(ce)), fe = /* @__PURE__ */ F(() => H(re));
	yn(() => {
		let e = () => k?.sendCloseMenus();
		return document.addEventListener("pointerdown", e, !0), () => document.removeEventListener("pointerdown", e, !0);
	}), yn(() => {
		let e = H(ee);
		k?.sendViewport(e);
	}), yn(() => {
		let e = () => {
			L(ie, window.innerWidth, !0);
		};
		return window.addEventListener("resize", e), () => window.removeEventListener("resize", e);
	}), yn(() => {
		let e = H(te);
		if (!e || typeof ResizeObserver > "u") return;
		let t = () => {
			let t = e.getBoundingClientRect();
			L(ne, t.width, !0), L(re, t.height, !0);
		};
		t();
		let n = new ResizeObserver(t);
		return n.observe(e), () => n.disconnect();
	});
	let pe = /* @__PURE__ */ I(0);
	function me() {
		L(pe, O?.data.sections.filter((e) => e.responsive?.mobile?.attention?.needed).length ?? 0, !0);
	}
	function he(e, t) {
		!e || e.responsive?.mobile?.mode !== "manual" || e.responsive.mobile.attention?.needed || (e.responsive.mobile.attention = {
			needed: !0,
			reason: t,
			since: (/* @__PURE__ */ new Date()).toISOString()
		}, me(), k?.sendAttention(e.id, !0));
	}
	let O = null, ge = null, k = null, A = /* @__PURE__ */ I(null);
	function _e() {
		L(A, ge.data, !0), ge.replace(H(A));
	}
	function ve() {
		k?.sendSite(ze(H(A)));
	}
	let ye = /* @__PURE__ */ new Set(), be = () => H(A).pages.find((e) => e.id === H(g));
	function j() {
		let e = H(A)?.pages?.some((e) => !ye.has(e.id) && localStorage.getItem(`urd-draft-${e.id}`) !== null) ?? !1, t = yi?.hasDraft() || Object.values(bi).some((e) => e.hasDraft()), n = Mi?.hasDraft() || Object.values(Ni).some((e) => e.hasDraft());
		L(_, e || O?.hasDraft() && !ye.has(H(g)) || ge?.hasDraft() || sa?.hasDraft() || t || n || !1, !0);
	}
	let xe = [], Se = [], Ce = null;
	function we() {
		return JSON.stringify({
			pageId: H(g),
			page: O.data,
			site: ge.data,
			samlingerIndex: Si ? yi.data : null,
			samlinger: Si ? Object.fromEntries(Object.entries(bi).map(([e, t]) => [e, t.data])) : {},
			malerIndex: Fi ? Mi.data : null,
			maler: Fi ? Object.fromEntries(Object.entries(Ni).map(([e, t]) => [e, t.data])) : {},
			plugins: sa?.data ?? null
		});
	}
	function Te(e) {
		e === Ce && (e.startsWith("edit:") || e.startsWith("grid:")) || (xe.push(we()), xe.length > 50 && xe.shift(), Se.length = 0, Ce = e);
	}
	function Ee(e) {
		let { pageId: t, page: n, site: r, samlingerIndex: i, samlinger: a, malerIndex: o, maler: s, plugins: c } = JSON.parse(e);
		if (ge.replace(r), _e(), ge.save(), L(E, {
			snap: !0,
			...H(A).grid
		}, !0), ve(), De(i, a ?? {}), Oe(o, s ?? {}), ke(c), t && t !== H(g) && H(A).pages.some((e) => e.id === t)) {
			C(`urd-draft-${t}`, JSON.stringify(n)), Er(t, { keepHistory: !0 }), j();
			return;
		}
		O.replace(n), O.save(), j(), me(), ut(), Vt(O.data.sections.find((e) => e.id === H(Pt))), H(A).pages.some((e) => e.id === H(g)) ? k?.sendPage(H(g), O.data) : Er(H(A).pages[0].id, { keepHistory: !0 });
	}
	function De(e, t) {
		if (!(!yi || !e) && JSON.stringify({
			index: yi.data,
			samlinger: Object.fromEntries(Object.entries(bi).map(([e, t]) => [e, t.data]))
		}) !== JSON.stringify({
			index: e,
			samlinger: t
		})) {
			yi.replace(e), yi.save();
			for (let e of Object.keys(bi)) e in t || (localStorage.removeItem(`urd-draft-samling-${e}`), delete bi[e]);
			for (let [e, n] of Object.entries(t)) {
				if (!bi[e]) {
					let t = xi[e] ?? null;
					bi[e] = Ai(`urd-draft-samling-${e}`, () => t, S);
				}
				bi[e].replace(n), bi[e].save();
			}
			L(Ci, [...e.samlinger ?? []], !0), H(Di) && !H(Ci).includes(H(Di)) && L(Di, null), Ui();
		}
	}
	function Oe(e, t) {
		if (!(!Mi || !e) && JSON.stringify({
			index: Mi.data,
			maler: Object.fromEntries(Object.entries(Ni).map(([e, t]) => [e, t.data]))
		}) !== JSON.stringify({
			index: e,
			maler: t
		})) {
			Mi.replace(e), Mi.save();
			for (let e of Object.keys(Ni)) e in t || (localStorage.removeItem(`urd-draft-mal-${e}`), delete Ni[e]);
			for (let [e, n] of Object.entries(t)) Ni[e] || (Ni[e] = Ai(`urd-draft-mal-${e}`, () => Pi[e] ?? null, S)), Ni[e].replace(n), Ni[e].save();
			L(Ii, [...e.maler ?? []], !0), j(), Ri();
		}
	}
	function ke(e) {
		!sa || !e || JSON.stringify(sa.data) !== JSON.stringify(e) && (sa.replace(e), sa.save(), Ta(), Va());
	}
	function Ae() {
		xe.length && (Se.push(we()), Ee(xe.pop()), Ce = null, x(Q("status.undone")));
	}
	function je() {
		Se.length && (xe.push(we()), Ee(Se.pop()), Ce = null, x(Q("status.redone")));
	}
	function Ne(e) {
		H(ft) && (e.target instanceof Element && e.target.closest(".block-menu") || L(ft, null));
	}
	function Pe(e) {
		if (e.key === "Escape" && H(ft)) {
			L(ft, null);
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
			].includes(t.type)) || !H(N) || H(ee) === "mobile") return;
			e.preventDefault(), k?.sendDuplicate();
			return;
		}
		if (t !== "z" && t !== "y") return;
		let n = e.target;
		n instanceof HTMLElement && (n.isContentEditable || n.tagName === "TEXTAREA" || n.tagName === "INPUT" && ![
			"number",
			"checkbox",
			"range",
			"color"
		].includes(n.type)) || (e.preventDefault(), t === "y" || e.shiftKey ? je() : Ae());
	}
	async function Fe() {
		L(h, ja(await (await fetch("/content/site.json")).json()), !0), ge = Ai("urd-draft-site", () => H(h), S), (ge.data.schemaVersion ?? 1) > 1 && (console.warn(`Urd: site-utkastet har schemaVersion ${ge.data.schemaVersion} (motoren har 1) og forkastes`), ge.replace(ze(H(h)))), ge.replace(ja(ge.data)), ge.save(), _e(), L(E, {
			snap: !0,
			...H(A).grid
		}, !0), await Er(new URLSearchParams(location.search).get("page") ?? H(A).pages[0].id), await Aa(), await Vi(), await Li(), await nr(), H(T) && ir(), H(A).site.setup === !0 && !localStorage.getItem("urd-setup-done") && (L(He, H(A).site.title, !0), L(Ge, H(A).theme.tokens.color.accent, !0), L(Ke, H(A).theme.tokens.color.bg, !0), L(Ve, !0));
	}
	let Ie = /* @__PURE__ */ I(null);
	function Le({ title: e, lines: t = [], okLabel: n = Q("confirm.ok"), cancelLabel: r = Q("confirm.cancel") }) {
		return new Promise((i) => {
			L(Ie, {
				title: e,
				lines: t,
				okLabel: n,
				cancelLabel: r,
				resolve: i
			}, !0);
		});
	}
	function Re({ title: e, lines: t = [], value: n = "", placeholder: r = "", okLabel: i = Q("confirm.ok"), cancelLabel: a = Q("confirm.cancel") }) {
		return new Promise((o) => {
			L(Ie, {
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
	function Be(e) {
		H(Ie)?.resolve(H(Ie).prompt ? e ? H(Ie).value : null : e), L(Ie, null);
	}
	let Ve = /* @__PURE__ */ I(!1), He = /* @__PURE__ */ I(""), Ge = /* @__PURE__ */ I("#7c5cff"), Ke = /* @__PURE__ */ I("#0b0e14");
	function qe() {
		localStorage.setItem("urd-setup-done", "1"), L(Ve, !1);
	}
	function Je() {
		let e = H(He).trim();
		e && (Pr("setup", () => {
			H(A).site.title = e, H(A).nav.logo = {
				type: "text",
				value: e
			}, H(A).theme.tokens.color.accent = H(Ge), H(A).theme.tokens.color.bg = H(Ke), delete H(A).site.setup;
		}), qe(), x(Q("status.setupDone"), "ok"));
	}
	let Ye = /* @__PURE__ */ I(null), Xe = [
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
	], Ze = Object.fromEntries(Xe.flat().map((e) => [e, Q(`panel.${e}`)])), Qe = {
		pages: ["hint.pages.drafts"],
		blocks: ["hint.blocks.intro"],
		grid: ["hint.grid.intro", "hint.grid.section"],
		collections: ["hint.collections.intro"],
		plugins: ["hint.plugins.intro"],
		history: ["hint.history.intro"]
	}, $e = [
		["se", "Davvisámegiella"],
		["en-GB", "English (UK)"],
		["nb", "Norsk bokmål"],
		["nn", "Norsk nynorsk"],
		["tr", "Türkçe"]
	], et = (e) => [...e].sort((e, t) => e[1].localeCompare(t[1]));
	function tt(e, t) {
		let n = [];
		for (let r of e) for (let e of ma[r]?.languages ?? []) e?.[t] === !0 && (typeof e.code != "string" || typeof e.name != "string" || !e.name || $e.some(([t]) => t === e.code) || n.some(([t]) => t === e.code) || n.push([e.code, e.name]));
		return n;
	}
	function nt() {
		let e = et([...$e, ...tt(H(ya), "admin")]);
		return it === "auto" || e.some(([e]) => e === it) ? e : [[it, it], ...e];
	}
	let rt = () => tt(H(pa)?.enabled ?? [], "site"), it = localStorage.getItem("urd-admin-lang") ?? "auto";
	function st(e) {
		e !== it && (e === "auto" ? localStorage.removeItem("urd-admin-lang") : localStorage.setItem("urd-admin-lang", e), location.reload());
	}
	function ct(e) {
		L(Ye, H(Ye) === e ? null : e, !0), k?.sendShowGrid(H(Ye) === "grid"), H(Ye) === "history" && lr(), H(Ye) === "update" && !H(gr) && vr();
	}
	let N = /* @__PURE__ */ I(null);
	function lt(e, t) {
		let n = O?.data.sections.find((t) => t.id === e);
		return {
			section: n,
			block: n?.blocks.find((e) => e.id === t)
		};
	}
	function ut() {
		if (!H(N)) return;
		let { block: e } = lt(H(N).sectionId, H(N).blockId);
		if (!e) {
			L(N, null);
			return;
		}
		L(N, {
			sectionId: H(N).sectionId,
			blockId: H(N).blockId,
			type: e.type,
			decor: !!e.decor,
			props: JSON.parse(JSON.stringify(e.props)),
			frame: { ...e.frames.desktop },
			animation: e.animation ? JSON.parse(JSON.stringify(e.animation)) : null,
			hover: e.hover ? JSON.parse(JSON.stringify(e.hover)) : null,
			sticky: e.sticky ? JSON.parse(JSON.stringify(e.sticky)) : null
		}, !0);
	}
	function dt(e) {
		if (L(ft, null), !e.blockId) {
			L(N, null);
			return;
		}
		L(N, {
			sectionId: e.sectionId,
			blockId: e.blockId
		}, !0), e.sectionId && L(Pt, e.sectionId, !0), ut();
	}
	let ft = /* @__PURE__ */ I(null);
	function pt() {
		let e = O?.data.sections ?? [], t = e.findIndex((e) => e.id === H(N)?.sectionId);
		return [["", Q("opt.sticky.ownSection")], ...e.slice(t + 1).map((e, n) => [e.id, Q("opt.sticky.atSection", { n: t + 2 + n })])];
	}
	function mt(e) {
		if (dt(e), !H(N)) return;
		let t = H(w)?.getBoundingClientRect();
		if (!t) return;
		let n = t.left + H(ce) * e.rect.right + 12;
		n + 300 > window.innerWidth - 8 && (n = Math.max(8, t.left + H(ce) * e.rect.left - 300 - 12));
		let r = window.innerHeight - Math.min(window.innerHeight * .7, 560) - 8, i = Math.min(Math.max(8, t.top + H(ce) * e.rect.top), Math.max(8, r));
		L(ft, {
			left: n,
			top: i
		}, !0);
	}
	function ht(e, t) {
		let { section: n, block: r } = lt(H(N)?.sectionId, H(N)?.blockId);
		r && (Te(e), t(r, n), he(n, "blokk-endret"), O.save(), j(), k?.sendSection(H(g), n), ut());
	}
	function P(e, t) {
		ht(`edit:${H(N).blockId}:${e}`, (n) => {
			n.props[e] = t;
		});
	}
	function gt(e, t) {
		ht(`edit:${H(N).blockId}:${e}`, (e) => {
			Object.assign(e.props, t);
		});
	}
	let _t = en({}), vt = en({}), yt = /* @__PURE__ */ I(!1), bt = /* @__PURE__ */ I("content"), xt = (e, t) => (Number.isFinite(t) || (t = e.min ?? 0), e.min != null && (t = Math.max(e.min, t)), e.max != null && (t = Math.min(e.max, t)), t);
	async function St(e) {
		let t = H(N).blockId, n = `${t}:${e.key}`, r = (_t[n] ?? H(N).props[e.key] ?? "").trim();
		vt[n] = null;
		let i = r.match(/^(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)$/);
		if (!r || i || /^https?:\/\//i.test(r)) {
			gt(e.key, {
				[e.key]: r,
				lat: i ? Number(i[1]) : null,
				lon: i ? Number(i[2]) : null
			});
			return;
		}
		L(yt, !0), vt[n] = {
			text: Q("props.place.searching"),
			err: !1
		};
		try {
			let i = await fetch(`/api/geocode?q=${encodeURIComponent(r)}`), a = await i.json().catch(() => null);
			if (H(N)?.blockId !== t) return;
			i.ok && Number.isFinite(a?.lat) ? (gt(e.key, {
				[e.key]: r,
				lat: a.lat,
				lon: a.lon
			}), vt[n] = null) : vt[n] = {
				text: Ti(a) ?? Q("props.place.notFound"),
				err: !0
			};
		} catch {
			vt[n] = {
				text: Q("props.place.failed"),
				err: !0
			};
		} finally {
			L(yt, !1);
		}
	}
	function Ct(e, t) {
		Number.isFinite(t) && ht(`edit:frame-${H(N).blockId}:${e}`, (n) => {
			n.frames.desktop = {
				...n.frames.desktop,
				[e]: t
			};
		});
	}
	function wt(e) {
		ht(`edit:${H(N).blockId}:boxStyle`, (t) => {
			let n = {
				...t.props.boxStyle ?? {},
				...e
			};
			for (let e of Object.keys(n)) n[e] ?? delete n[e];
			Object.keys(n).length ? t.props.boxStyle = n : delete t.props.boxStyle;
		});
	}
	function Tt(e, t) {
		ht(`edit:${H(N).blockId}:faq${e}`, (n) => {
			n.props.items[e] = {
				...n.props.items[e],
				...t
			};
		});
	}
	function Et() {
		ht("faq-item", (e) => {
			(e.props.items ??= []).push({
				q: Q("seed.faq.newQ"),
				a: Q("seed.faq.answer")
			});
		});
	}
	function Dt(e) {
		ht("faq-item", (t) => {
			t.props.items.splice(e, 1);
		});
	}
	function Ot(e, t) {
		let n = e + t;
		ht("faq-item", (t) => {
			n < 0 || n >= t.props.items.length || ([t.props.items[e], t.props.items[n]] = [t.props.items[n], t.props.items[e]]);
		});
	}
	function kt(e) {
		ht("decor", (t) => {
			t.decor = e;
		});
	}
	async function At(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await Sn(t);
			ht(`edit:${H(N).blockId}`, (n) => {
				n.props.src = e.dataUrl, n.props.alt = n.props.alt || $i(t.name).replaceAll("-", " ");
			});
		} catch {
			x(Q("status.imageReadError"), "error");
		}
	}
	let jt = {
		text: Q("blocks.text"),
		button: Q("blocks.button"),
		image: Q("blocks.image"),
		shape: Q("blocks.shape"),
		video: Q("blocks.video"),
		icon: Q("blocks.icon"),
		galleri: Q("blocks.galleri"),
		faq: Q("blocks.faq")
	}, Mt = [
		["line", Q("shape.line")],
		["arrow", Q("shape.arrow")],
		["circle", Q("shape.circle")],
		["rect", Q("shape.rect")],
		["triangle", Q("shape.triangle")]
	], Nt = [
		["accent", Q("color.accent")],
		["text", Q("color.text")],
		["surface", Q("color.surface")],
		["bg", Q("color.bg")]
	], Pt = /* @__PURE__ */ I(null), Ft = /* @__PURE__ */ I(null), It = /* @__PURE__ */ I(""), Lt = /* @__PURE__ */ I(en([])), Rt = /* @__PURE__ */ I(null), zt = /* @__PURE__ */ I(null), Bt = /* @__PURE__ */ I("");
	function Vt(e) {
		L(Ft, e?.grid ? { ...e.grid } : null, !0), L(It, e?.size?.minHeight ?? "", !0), L(Lt, JSON.parse(JSON.stringify(e?.background?.layers ?? [])), !0), L(Rt, e?.animation ? JSON.parse(JSON.stringify(e.animation)) : null, !0), L(zt, e?.hover ? JSON.parse(JSON.stringify(e.hover)) : null, !0), L(Bt, e?.theme ?? "", !0);
	}
	let Ht = /* @__PURE__ */ I(null), Ut = en({});
	function Wt() {
		try {
			let e = ((H(w)?.contentDocument)?.querySelector(`.urd-section[data-section-id="${H(Pt)}"]`))?.getBoundingClientRect();
			L(Ht, e && e.width ? {
				w: e.width,
				h: e.height
			} : null, !0);
		} catch {
			L(Ht, null);
		}
	}
	yn(() => {
		H(Pt), H(Lt), requestAnimationFrame(() => requestAnimationFrame(Wt));
	}), yn(() => {
		let e = H(w);
		if (!e || typeof ResizeObserver > "u") return;
		let t = new ResizeObserver(() => Wt());
		return t.observe(e), () => t.disconnect();
	}), yn(() => {
		for (let e of H(Lt)) {
			let t = e?.props?.src;
			if (e?.type === "image" && t && !Ut[t]) {
				let e = new Image();
				e.onload = () => {
					Ut[t] = {
						w: e.naturalWidth,
						h: e.naturalHeight
					};
				}, e.src = t;
			}
		}
	});
	function Gt(e) {
		qt("section-theme", (t) => {
			e ? t.theme = e : delete t.theme;
		});
	}
	function Kt(e) {
		L(Pt, e.sectionId, !0), Vt(O?.data.sections.find((t) => t.id === e.sectionId));
	}
	function qt(e, t) {
		let n = O.data.sections.find((e) => e.id === H(Pt));
		n && (Te(e), t(n), O.save(), j(), k?.sendSection(H(g), n), Vt(n));
	}
	let Jt = /* @__PURE__ */ I("color");
	function Yt(e, t) {
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
	function Xt(e, t) {
		e.mutate(e.keyPrefix, (e) => {
			e.background.layers.splice(t, 1), e.background.layers.length || delete e.background;
		});
	}
	function Zt(e, t, n) {
		let r = t + n;
		e.mutate(e.keyPrefix, (e) => {
			let n = e.background.layers;
			r < 0 || r >= n.length || ([n[t], n[r]] = [n[r], n[t]]);
		});
	}
	function Qt(e, t, n, r) {
		e.mutate(`edit:${e.keyPrefix}-${e.keyId}-${t}-${n}`, (e) => {
			e.background.layers[t].props[n] = r;
		});
	}
	function $t(e, t, n, r = "xy") {
		e.preventDefault();
		let i = e.currentTarget;
		i.setPointerCapture?.(e.pointerId);
		let a = (e) => {
			let a = i.getBoundingClientRect();
			if (r.includes("x")) {
				let r = Math.min(1, Math.max(0, (e.clientX - a.left) / a.width));
				Qt(t, n, "x", Math.round(r * 100) / 100);
			}
			if (r.includes("y")) {
				let r = Math.min(1, Math.max(0, (e.clientY - a.top) / a.height));
				Qt(t, n, "y", Math.round(r * 100) / 100);
			}
		};
		a(e);
		let o = () => {
			i.removeEventListener("pointermove", a), i.removeEventListener("pointerup", o), i.removeEventListener("pointercancel", o);
		};
		i.addEventListener("pointermove", a), i.addEventListener("pointerup", o), i.addEventListener("pointercancel", o);
	}
	let nn = (e) => Math.min(4, Math.max(.1, e));
	function rn(e, t, n, r) {
		Qt(e, t, "size", nn(Math.round((n + r) * 100) / 100));
	}
	function an(e, t, n) {
		let r = Number(n);
		Number.isFinite(r) && Qt(e, t, "size", nn(r / 100));
	}
	function on(e, t, n, r) {
		let i = Ut[n.props.src];
		if (!i?.w || !i?.h || !H(Ht)?.w || !H(Ht)?.h) return;
		let a = H(Ht).h * i.w / (H(Ht).w * i.h), o = r === "cover" ? Math.max(1, a) : Math.min(1, a);
		(n.props.fit === "flislegg" || n.props.fit === "repeat") && Qt(e, t, "fit", "vanlig"), Qt(e, t, "size", nn(Math.round(o * 100) / 100));
	}
	function sn(e) {
		return e.props;
	}
	function cn(e, t, n, r) {
		e.mutate(n, (e) => {
			r(e.background.layers[t].props);
		});
	}
	function ln(e, t, n, r) {
		cn(e, t, `edit:${e.keyPrefix}-${e.keyId}-${t}-${n}`, (e) => {
			e[n] = r;
		});
	}
	let un = {
		linear: [
			["none", Q("common.none")],
			["pan", Q("opt.gradAnim.pan")],
			["pan-loop", Q("opt.gradAnim.panLoop")],
			["rotate", Q("opt.gradAnim.rotate")]
		],
		radial: [
			["none", Q("common.none")],
			["pulse", Q("opt.gradAnim.pulse")],
			["orbit", Q("opt.gradAnim.orbit")]
		]
	};
	function dn(e, t, n) {
		cn(e, t, e.keyPrefix, (e) => {
			e.kind = n, un[n].some(([t]) => t === (e.animation ?? "none")) || (e.animation = "none");
		});
	}
	function fn(e, t, n, r) {
		cn(e, t, `edit:${e.keyPrefix}-${e.keyId}-${t}-stop${n}`, (e) => {
			e.stops[n] = {
				...e.stops[n],
				...r
			};
		});
	}
	function pn(e, t) {
		cn(e, t, e.keyPrefix, (e) => {
			let t = Math.round(e.stops.reduce((e, t) => e + (Number(t.share) || 0), 0) / e.stops.length) || 50;
			e.stops.push({
				color: e.stops[e.stops.length - 1]?.color ?? "#ffffff",
				share: t
			});
		});
	}
	function mn(e, t, n) {
		cn(e, t, e.keyPrefix, (e) => {
			e.stops.length > 2 && e.stops.splice(n, 1);
		});
	}
	function hn(e, t, n, r) {
		cn(e, t, e.keyPrefix, (e) => {
			let [t] = e.stops.splice(n, 1);
			e.stops.splice(r, 0, t);
		});
	}
	let gn = /* @__PURE__ */ I(null);
	function _n(e, t, n, r) {
		if (t.button !== 0) return;
		t.preventDefault();
		let i = t.currentTarget.closest(".bg-layer"), a = t.currentTarget.closest(".grad-stop");
		L(gn, {
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
			L(gn, {
				...H(gn),
				insert: n
			}, !0);
		}, u = () => {
			window.removeEventListener("pointermove", l), window.removeEventListener("pointerup", u), c.remove();
			let t = H(gn);
			if (L(gn, null), !t) return;
			let n = t.insert > t.from ? t.insert - 1 : t.insert;
			n !== t.from && hn(e, t.layer, t.from, n);
		};
		window.addEventListener("pointermove", l), window.addEventListener("pointerup", u);
	}
	function vn(e, t, n) {
		e.mutate(e.keyPrefix, (e) => {
			e.background.layers[t].type !== n && (e.background.layers[t] = {
				type: n,
				version: s[n].version ?? 1,
				props: s[n].defaults()
			});
		});
	}
	async function bn(e, t) {
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
	async function xn(e) {
		let t = await e.text(), n = Yi(t), r = Zi(t);
		if (!r) return n;
		let i = await bn(n.dataUrl, r);
		if (!i) return n;
		let a = Xi(t, i);
		if (a === t) return n;
		try {
			return Yi(a);
		} catch {
			return n;
		}
	}
	async function Sn(e) {
		return e.type === "image/svg+xml" || /\.svg$/i.test(e.name || "") ? xn(e) : Ki(e);
	}
	async function Cn(e, t, n) {
		let r = n.target.files?.[0];
		if (n.target.value = "", r) try {
			Qt(e, t, "src", (await Sn(r)).dataUrl);
		} catch {
			x(Q("status.imageReadError"), "error");
		}
	}
	async function wn(e, t, n) {
		let r = [...n.target.files ?? []];
		if (n.target.value = "", !r.length) return;
		x(Q("status.compressingImages"));
		let { images: i, failed: a, big: o } = await Su(r);
		i.length && e.mutate(e.keyPrefix, (e) => {
			let n = e.background.layers[t].props;
			n.images ??= [], n.images.push(...i.map(({ src: e }) => ({
				src: e,
				x: .5,
				y: .5
			})));
		}), Cu(i.length, a, o);
	}
	function Tn(e, t, n, r) {
		e.mutate(e.keyPrefix, (e) => {
			let i = e.background.layers[t].props.images, a = n + r;
			a < 0 || a >= i.length || ([i[n], i[a]] = [i[a], i[n]]);
		});
	}
	function En(e, t, n) {
		e.mutate(e.keyPrefix, (e) => {
			e.background.layers[t].props.images.splice(n, 1);
		});
	}
	function Dn(e, t, n, r, i) {
		e.mutate(`edit:${e.keyPrefix}g-${e.keyId}-${t}-${n}-${r}`, (e) => {
			e.background.layers[t].props.images[n][r] = i;
		});
	}
	function On(e, t) {
		Pr(e, () => {
			H(A).nav.style ??= {}, t(H(A).nav.style);
		});
	}
	let kn = /* @__PURE__ */ F(() => ({
		mutate: qt,
		keyPrefix: "bg",
		keyId: H(Pt)
	})), An = {
		mutate: On,
		keyPrefix: "navbg",
		keyId: "nav"
	}, jn = {
		mutate: Xa,
		keyPrefix: "footerbg",
		keyId: "footer"
	}, Mn = () => Object.entries(H(A)?.theme.tokens.color ?? {}).map(([e, t]) => [e, t]), Nn = [
		[
			"bg",
			Q("palette.bg"),
			Q("palette.bgShort")
		],
		[
			"surface",
			Q("palette.surface"),
			Q("palette.surfaceShort")
		],
		[
			"text",
			Q("palette.text"),
			Q("palette.textShort")
		],
		[
			"accent",
			Q("palette.accent"),
			Q("palette.accentShort")
		],
		[
			"accent-text",
			Q("palette.accentText"),
			Q("palette.accentTextShort")
		]
	], Pn = /* @__PURE__ */ F(() => !!H(A)?.theme.alt), Fn = /* @__PURE__ */ F(() => H(A)?.theme.alt?.auto === !0), In = /* @__PURE__ */ F(() => H(A)?.theme.scheme === "dark" ? "dark" : "light"), Ln = /* @__PURE__ */ F(() => H(A)?.theme.tokens.color ?? {}), Rn = /* @__PURE__ */ F(() => ({
		...H(A)?.theme.tokens.color ?? {},
		...H(A)?.theme.alt?.tokens?.color ?? {}
	}));
	function zn(e) {
		return {
			type: e,
			version: Vo[e].version,
			props: Vo[e].defaults()
		};
	}
	let Bn = (e) => !!(e && Vo[e.type]?.entrance), Vn = [["", Q("common.none")], ...Object.entries(Vo).filter(([, e]) => e.entrance).map(([e, t]) => [e, t.labelKey ? Q(t.labelKey) : t.label])], Hn = [["", Q("common.none")], ...Object.entries(Vo).filter(([, e]) => !e.entrance).map(([e, t]) => [e, t.labelKey ? Q(t.labelKey) : t.label])];
	function Un(e) {
		e.animation && !Bn(e.animation) && (e.hover ??= e.animation, e.animation = null);
	}
	function Wn(e) {
		ht(`edit:anim-${H(N).blockId}`, (t) => {
			Un(t), t.animation = e ? zn(e) : null;
		}), H(N) && k?.sendDemoAnim(H(N).sectionId, H(N).blockId);
	}
	function Gn(e) {
		ht(`edit:hover-${H(N).blockId}`, (t) => {
			Un(t), t.hover = e ? zn(e) : null;
		});
	}
	function Kn(e, t) {
		Number.isFinite(t) && (ht(`edit:anim-${H(N).blockId}:${e}`, (n) => {
			n.animation && (n.animation.props[e] = t);
		}), H(N) && k?.sendDemoAnim(H(N).sectionId, H(N).blockId));
	}
	function qn(e) {
		qt("section-anim", (t) => {
			Un(t), t.animation = e ? zn(e) : null;
		}), k?.sendDemoAnim(H(Pt));
	}
	function Jn(e) {
		qt("section-hover", (t) => {
			Un(t), t.hover = e ? zn(e) : null;
		});
	}
	function Yn(e, t) {
		Number.isFinite(t) && (qt("edit:section-anim", (n) => {
			n.animation && (n.animation.props[e] = t);
		}), k?.sendDemoAnim(H(Pt)));
	}
	function Xn(e) {
		qt("edit:section-anim", (t) => {
			t.animation && (t.animation.props.pattern = e);
		}), k?.sendDemoAnim(H(Pt));
	}
	function Zn(e) {
		let t = O.data.sections.find((e) => e.id === H(Pt));
		if (!t) return;
		let n = e.trim();
		if (!n) return;
		let r = /^\d+$/.test(n) ? `${n}px` : n;
		Te("section-size"), t.size = {
			...t.size,
			minHeight: r
		}, L(It, r, !0), O.save(), j(), k?.sendSection(H(g), t);
	}
	function Qn() {
		return O.data.sections.find((e) => e.id === H(Pt)) ?? O.data.sections[0];
	}
	function $n(e) {
		let t = O.data.sections.find((e) => e.id === H(Pt));
		t && (Te("grid:section"), t.grid = e ? { ...ge.data.grid } : null, L(Ft, t.grid ? { ...t.grid } : null, !0), O.save(), j(), k?.sendSection(H(g), t), H(Ye) === "grid" && k?.sendShowGrid(!0));
	}
	function er(e, t) {
		let n = O.data.sections.find((e) => e.id === H(Pt));
		n?.grid && (Te("grid:section"), n.grid = {
			...n.grid,
			[e]: t
		}, L(Ft, { ...n.grid }, !0), O.save(), j(), k?.sendSection(H(g), n), H(Ye) === "grid" && k?.sendShowGrid(!0));
	}
	function tr(e, t) {
		Te("grid:site"), L(E, {
			...H(E),
			[e]: t
		}, !0), ge.data.grid = {
			...ge.data.grid,
			[e]: t
		}, ge.save(), j(), ve(), H(Ye) === "grid" && k?.sendShowGrid(!0);
	}
	async function nr() {
		try {
			let e = await fetch("/api/github/me");
			e.ok ? L(T, await e.json(), !0) : e.status !== 503 && L(T, null);
		} catch {
			L(T, null);
		}
	}
	let rr = null;
	async function ir() {
		try {
			let e = await fetch("/api/github/latest");
			e.ok && (rr = (await e.json()).head ?? null);
		} catch {}
	}
	async function ar(e) {
		if (!rr) return await ir(), {
			ok: await Le({
				title: Q("confirm.conflictUnknown.title"),
				lines: [Q("confirm.conflictUnknown.body"), Q("confirm.conflictUnknown.warning")],
				okLabel: Q("confirm.publishAnyway"),
				cancelLabel: Q("confirm.cancel")
			}),
			head: rr
		};
		let t = null;
		try {
			let e = await fetch(`/api/github/latest?base=${rr}`);
			e.ok && (t = await e.json().catch(() => null));
		} catch {}
		if (!t?.head) return {
			ok: !0,
			head: null
		};
		let n = t.head;
		if (n === rr) return {
			ok: !0,
			head: n
		};
		let r = new Set(e.map((e) => e.path)), i = t.truncated ? [Q("confirm.conflict.truncated")] : (t.changedFiles ?? []).filter((e) => r.has(e));
		return i.length === 0 ? {
			ok: !0,
			head: n
		} : {
			ok: await Le({
				title: Q("confirm.conflict.title"),
				lines: [
					Q("confirm.conflict.intro"),
					...i.map((e) => `• ${e}`),
					Q("confirm.conflict.warning")
				],
				okLabel: Q("confirm.publishAnyway"),
				cancelLabel: Q("confirm.cancel")
			}),
			head: n
		};
	}
	let or = /* @__PURE__ */ I(null), sr = /* @__PURE__ */ I(""), cr = /* @__PURE__ */ I(!1);
	async function lr() {
		L(sr, "");
		try {
			let e = await fetch("/api/github/history");
			e.ok ? L(or, (await e.json()).commits, !0) : e.status === 401 ? (L(or, [], !0), L(sr, Q("status.historyLoginRequired"), !0)) : (L(or, [], !0), L(sr, Ti(await e.json().catch(() => null)) ?? Q("status.historyFetchFailed"), !0));
		} catch {
			L(or, [], !0), L(sr, Q("status.historyUnavailable"), !0);
		}
	}
	let ur = (() => {
		let e = {
			dateStyle: "short",
			timeStyle: "short"
		};
		try {
			return new Intl.DateTimeFormat(Ei(), e);
		} catch {
			return new Intl.DateTimeFormat(void 0, e);
		}
	})(), dr = !1;
	async function fr() {
		let e = H(or)?.[0];
		if (!(!e || H(cr)) && await Le({
			title: Q("confirm.revert.title"),
			lines: [`«${e.message}»`, Q("confirm.revert.body")],
			okLabel: Q("confirm.revert.ok"),
			cancelLabel: Q("confirm.cancel")
		})) {
			L(cr, !0), x(Q("status.reverting"));
			try {
				let t = await fetch("/api/github/revert", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({ expect: e.sha })
				});
				if (t.ok) {
					let { sha: e } = await t.json().catch(() => ({}));
					e ? rr = e : ir(), dr = !0, x(Q("status.revertDone"), "ok"), pr();
				} else t.status === 409 ? x(Q("status.revertConflict"), "error") : x(Ti(await t.json().catch(() => null)) ?? Q("status.revertFailed"), "error");
			} catch {
				x(Q("status.publishLayerUnreachable"), "error");
			}
			L(cr, !1), lr();
		}
	}
	async function pr() {
		let e = ["/content/site.json", ...H(A).pages.map((e) => `/${e.file}`)], t = async () => {
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
				x(Q("status.revertDeployed"), "ok");
				for (let e of Object.keys(localStorage).filter((e) => e.startsWith("urd-draft-"))) localStorage.removeItem(e);
				await new Promise((e) => setTimeout(e, 800)), location.reload();
				return;
			}
		}
		x(Q("status.revertDeployTimeout"), "error");
	}
	let mr = /* @__PURE__ */ I(null), hr = /* @__PURE__ */ I(null), gr = /* @__PURE__ */ I(!1), _r = /* @__PURE__ */ I(en(/* @__PURE__ */ new Set()));
	async function vr() {
		L(gr, !0), L(hr, null), L(mr, null);
		try {
			let e = await fetch("/api/github/update"), t = await e.json().catch(() => null);
			e.ok ? (L(mr, t, !0), L(_r, /* @__PURE__ */ new Set(), !0)) : L(hr, Ti(t) ?? Q("update.checkFailed"), !0);
		} catch {
			L(hr, Q("status.publishLayerUnreachable"), !0);
		}
		L(gr, !1);
	}
	function br(e) {
		let t = new Set(H(_r));
		t.has(e) ? t.delete(e) : t.add(e), L(_r, t, !0);
	}
	async function Sr() {
		if (!H(mr) || H(mr).upToDate || H(gr)) return;
		let e = [...H(_r)], t = H(mr).changes.filter((e) => !H(_r).has(e.path)), n = t.filter((e) => e.atom && e.conflict);
		if (await Le({
			title: Q("confirm.update.title"),
			lines: [Q("confirm.update.body", {
				target: H(mr).target,
				writes: t.filter((e) => e.action === "write").length,
				deletes: t.filter((e) => e.action === "delete").length
			}), ...n.length > 0 ? [Q("confirm.update.warnEdited", { paths: n.map((e) => e.path).join(", ") })] : []],
			okLabel: Q("confirm.update.ok"),
			cancelLabel: Q("confirm.cancel")
		})) {
			L(gr, !0), x(Q("update.running", { target: H(mr).target }));
			try {
				let t = await fetch("/api/github/update", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({
						to: H(mr).target,
						expect: H(mr).head,
						skip: e
					})
				}), n = await t.json().catch(() => null);
				t.ok ? (x(Q("update.committed", { target: H(mr).target }), "ok"), await Cr(H(mr).target.replace(/^v/, ""))) : t.status === 409 ? (x(Ti(n) ?? Q("update.checkFailed"), "error"), await vr()) : x(Ti(n) ?? Q("update.failed"), "error");
			} catch {
				x(Q("status.publishLayerUnreachable"), "error");
			}
			L(gr, !1);
		}
	}
	async function Cr(e) {
		for (let t = 0; t < 18; t++) {
			await new Promise((e) => setTimeout(e, 1e4));
			try {
				if ((await (await fetch("/urd.json", { cache: "no-store" })).json())?.engine === e) {
					x(Q("update.deployed"), "ok"), await new Promise((e) => setTimeout(e, 800)), location.reload();
					return;
				}
			} catch {}
		}
		x(Q("update.deployTimeout"), "error");
	}
	let wr = null;
	function Tr(e) {
		return {
			schemaVersion: 1,
			meta: {
				id: e.id,
				title: e.title
			},
			sections: [{
				id: Ra("sec"),
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
	async function Er(e, { keepHistory: t = !1 } = {}) {
		L(g, e, !0), wr = (async () => {
			let n = be(), r = null;
			try {
				let e = await fetch(`/${n.file}`);
				e.ok && (r = Ma(await e.json(), ge.data));
			} catch {}
			r ? ye.delete(e) : r = Tr(n), O = Ai(`urd-draft-${e}`, () => r, S), (O.data.schemaVersion ?? 1) > 1 && (console.warn(`Urd: utkastet for '${e}' har schemaVersion ${O.data.schemaVersion} (motoren har 1) og forkastes`), O.replace(structuredClone(r))), O.replace(Ma(O.data, ge.data)), O.save(), t || (Ce = null), L(Pt, null), L(Ft, null), j(), me(), L(v, "");
		})(), await wr;
	}
	function Dr() {
		k?.destroy(), H(w)?.contentDocument?.addEventListener("pointerdown", () => {
			H(ft) && L(ft, null);
		}, !0), k = xa(H(w), {
			onEdit: $l,
			onMove: eu,
			onGrow: tu,
			onDelete: du,
			onAddSection: ou,
			onMoveSection: su,
			onDeleteSection: cu,
			onSectionSize: lu,
			onUndo: (e) => e.redo ? je() : Ae(),
			onSelectSection: Kt,
			onSelectBlock: dt,
			onBlockMenu: mt,
			onReady: Or,
			onNavigate: Nr,
			onAddBlock: (e) => hu(e.sectionId, e.block),
			onAddBlocks: (e) => gu(e.sectionId, e.blocks, e.minBottom, e.moves),
			onRequestBlock: bu,
			onMoveBlockSection: uu,
			onMobileManual: nu,
			onMobileAuto: ru,
			onReviewDone: iu,
			onBlockFlag: au,
			onCollectionEdit: qi,
			onSaveTemplate: zi,
			onDeleteTemplate: Bi,
			onPluginBlocks: (e) => {
				L(vu, e.blocks ?? [], !0);
			},
			onNavWidth: (e) => Pr("edit:nav-width", () => {
				H(A).nav.style ??= {}, H(A).nav.style.width = e.width;
			})
		});
	}
	async function Or() {
		await wr, await fa, k?.sendPlugins(ze(H(pa))?.enabled ?? []), k?.sendViewport(H(ee)), Wi(), Ri(), ge.hasDraft() && ve();
		let e = !H(h).pages.some((e) => e.id === H(g));
		(O.hasDraft() || e) && k?.sendPage(H(g), O.data), H(D) || k?.sendChrome(!1), H(Ye) === "grid" && k?.sendShowGrid(!0), H(W) && k?.sendShowGuides(!0), f();
	}
	let W = /* @__PURE__ */ I(localStorage.getItem("urd-guides") === "1"), kr = /* @__PURE__ */ I(!1), jr = /* @__PURE__ */ I(null);
	yn(() => {
		if (!H(kr)) return;
		let e = (e) => {
			H(jr)?.contains(e.target) || L(kr, !1);
		}, t = (e) => {
			e.key === "Escape" && L(kr, !1);
		}, n = () => {
			L(kr, !1);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t), window.removeEventListener("blur", n);
		};
	});
	function Mr() {
		L(W, !H(W)), localStorage.setItem("urd-guides", H(W) ? "1" : "0"), k?.sendShowGuides(H(W));
	}
	function Nr(e) {
		let t = e.path.replace(/\/$/, "") || "/", n = H(A).pages.find((e) => e.path === t);
		n && n.id !== H(g) && Er(n.id);
	}
	function Pr(e, t) {
		Te(e), t(), ge.save(), j(), ve();
	}
	let Fr = /* @__PURE__ */ I(""), Lr = [
		"admin",
		"api",
		"assets",
		"content",
		"media",
		"plugins",
		"functions",
		"readme"
	];
	function Rr(e, t = null) {
		return e ? Lr.includes(e) ? Q("error.reservedName", { slug: e }) : H(A).pages.some((n) => n.id !== t && (n.path === `/${e}` || n.id === e)) ? Q("error.pageExists") : null : Q("error.pageNeedsName");
	}
	function zr() {
		let e = H(Fr).trim(), t = $i(e), n = Rr(t);
		if (n) {
			x(n, "error");
			return;
		}
		Pr("pages", () => {
			H(A).pages.push({
				id: t,
				title: e,
				path: `/${t}`,
				file: `content/pages/${t}.json`
			}), H(A).nav.items.push({
				label: e,
				page: t
			});
		}), C(`urd-draft-${t}`, JSON.stringify(Tr({
			id: t,
			title: e
		}))), j(), L(Fr, ""), Er(t);
	}
	function Vr(e, t) {
		let n = t.trim();
		if (!n || n === e.title) return;
		let r = e.title;
		Pr("pages", () => {
			e.title = n;
			for (let t of H(A).nav.items) t.page === e.id && t.label === r && (t.label = n);
		}), e.id === H(g) ? (O.data.meta.title = n, O.save(), j(), k?.sendPage(H(g), O.data)) : Hr(e, (e) => {
			e.meta.title = n;
		});
	}
	async function Hr(e, t) {
		let n = `urd-draft-${e.id}`, r = null, i = localStorage.getItem(n);
		if (i) try {
			r = JSON.parse(i);
		} catch {}
		if (!r) try {
			let t = await fetch(`/${e.file}`);
			t.ok && (r = Ma(await t.json(), ge.data));
		} catch {}
		r ||= Tr(e), t(r), C(n, JSON.stringify(r)), j();
	}
	function Ur(e, t) {
		let n = $i(t);
		if (e.path === "/" || `/${n}` === e.path) return;
		let r = Rr(n, e.id);
		if (r) {
			x(r, "error");
			return;
		}
		Pr("pages", () => {
			e.path = `/${n}`;
		});
	}
	function Wr(e) {
		e.path !== "/" && (Pr("pages", () => {
			H(A).pages = H(A).pages.filter((t) => t.id !== e.id), H(A).nav.items = H(A).nav.items.filter((t) => t.page !== e.id || t.children);
			for (let t of H(A).nav.items) t.page === e.id && delete t.page, t.children && (t.children = t.children.filter((t) => t.page !== e.id), t.children.length === 0 && delete t.children);
			H(A).nav.items = H(A).nav.items.filter((e) => e.page || e.href || e.children);
		}), e.id === H(g) && Er(H(A).pages[0].id), x(Q("status.pageRemoved")));
	}
	function Gr(e) {
		Pr("edit:nav-logo", () => {
			H(A).nav.logo = {
				type: "text",
				value: "",
				...H(A).nav.logo,
				...e
			};
		});
	}
	function Kr(e) {
		Pr("nav", () => {
			H(A).nav.logo ??= {
				type: "text",
				value: H(A).site.title
			};
			let t = H(A).nav.logo, n = t.type === "image";
			e === "both" ? (n && (t.image = t.value, t.value = H(A).site.title), t.image ??= "", t.size ??= 32) : e === "image" ? (n || (t.value = t.image ?? ""), delete t.image, t.size ??= 32) : (n && (t.value = H(A).site.title), delete t.image), t.type = e;
		});
	}
	async function qr(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await Sn(t);
			Pr("nav", () => {
				let t = H(A).nav.logo;
				t.type === "both" ? t.image = e.dataUrl : t.value = e.dataUrl;
			});
		} catch {
			x(Q("status.imageReadErrorSvg"), "error");
		}
	}
	let Jr = /* @__PURE__ */ I(null);
	async function Yr(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		if (t.type === "image/svg+xml" || /\.svg$/i.test(t.name || "")) {
			try {
				let e = await xn(t);
				L(Jr, e.dataUrl, !0);
			} catch {
				x(Q("status.imageReadErrorSvg"), "error");
			}
			return;
		}
		let n = new FileReader();
		n.onload = () => {
			L(Jr, String(n.result), !0);
		}, n.onerror = () => x(Q("status.imageReadError"), "error"), n.readAsDataURL(t);
	}
	function Xr(e) {
		Pr("edit:site-icon", () => {
			H(A).site.icon = e;
		}), L(Jr, null);
	}
	function Qr() {
		Pr("edit:site-icon", () => {
			delete H(A).site.icon;
		});
	}
	function ei(e) {
		Pr("edit:site-title", () => {
			H(A).site.title = e;
		});
	}
	function ti(e) {
		Pr("edit:site-desc", () => {
			H(A).site.description = e;
		});
	}
	function ni() {
		let e = H(A).site.lang ?? "no";
		return e === "no" ? "nb" : e;
	}
	function ri() {
		let e = ni(), t = et([...$e, ...rt()]);
		return [...t.some(([t]) => t === e) ? [] : [[e, e]], ...t];
	}
	function ai(e) {
		Pr("site", () => {
			H(A).site.lang = e;
		});
	}
	let oi = /^(?:data:image\/[\w.+-]+;base64,[A-Za-z0-9+/=]+|\/(?!\/)[\w%./-]*)$/;
	yn(() => {
		if (!H(A)?.site) return;
		let e = H(A).site.icon, t = document.querySelector("link[rel=\"icon\"]");
		if (t) {
			if (typeof e != "string" || !e) {
				t.href = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%230b0e14'/%3E%3Cpath d='M19.2 51.2V16l25.6 10.4V51.2' fill='none' stroke='%2315b39a' stroke-width='6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E";
				return;
			}
			oi.test(e) && (t.href = e);
		}
	});
	function si(e) {
		Pr("nav", () => {
			H(A).nav.layout = e;
		});
	}
	function li(e, t) {
		Pr(`edit:nav-style-${e}`, () => {
			H(A).nav.style ??= {}, t === void 0 ? delete H(A).nav.style[e] : H(A).nav.style[e] = t;
		});
	}
	let ui = /* @__PURE__ */ F(() => H(A)?.nav?.variant === "side-left" || H(A)?.nav?.variant === "side-right"), di = /* @__PURE__ */ F(() => [
		"floating",
		"floating-square",
		"floating-tab"
	].includes(H(A)?.nav?.variant)), pi = {
		underline: [Q("hoverColor.underline.label"), Q("hoverColor.underline.title")],
		pill: [Q("hoverColor.pill.label"), Q("hoverColor.pill.title")],
		lift: [Q("hoverColor.lift.label"), Q("hoverColor.lift.title")]
	}, mi = /* @__PURE__ */ F(() => pi[H(A)?.nav?.style?.hover] ?? null);
	function hi(e) {
		Pr("nav", () => {
			e === "bar" ? delete H(A).nav.variant : H(A).nav.variant = e;
		});
	}
	function gi(e) {
		Pr("nav", () => {
			H(A).nav.style ??= {}, e ? H(A).nav.style.glow = !0 : delete H(A).nav.style.glow;
		});
	}
	function _i(e) {
		Pr("nav", () => {
			H(A).nav.style ??= {}, e ? delete H(A).nav.style.topGap : H(A).nav.style.topGap = !1;
		});
	}
	function vi(e) {
		Pr("nav", () => {
			H(A).nav.style ??= {}, e === "standard" ? delete H(A).nav.style.hover : H(A).nav.style.hover = e;
		});
	}
	let yi = null, bi = {}, xi = {}, Si = !1, Ci = /* @__PURE__ */ I(en([])), wi = /* @__PURE__ */ I(en({})), Di = /* @__PURE__ */ I(null), Oi = /* @__PURE__ */ I(""), ki = /* @__PURE__ */ I("news"), ji = [
		["news", Q("collectionKind.news")],
		["notices", Q("collectionKind.notices")],
		["publications", Q("collectionKind.publications")],
		["custom", Q("collectionKind.custom")]
	], Mi = null, Ni = {}, Pi = {}, Fi = !1, Ii = /* @__PURE__ */ I(en([]));
	async function Li() {
		let e = {
			version: 1,
			maler: []
		};
		try {
			e = await (await fetch("/content/maler.json")).json();
		} catch {}
		Mi = Ai("urd-draft-maler", () => e, S), L(Ii, [...Mi.data.maler ?? []], !0);
		for (let e of H(Ii)) {
			let t = null;
			try {
				t = await (await fetch(`/content/maler/${e}.json`)).json();
			} catch {}
			Pi[e] = t, Ni[e] = Ai(`urd-draft-mal-${e}`, () => t, S), (Ni[e].data?.schemaVersion ?? 1) > 1 && Ni[e].reset();
		}
		Fi = !0, Ri();
	}
	function Ri() {
		let e = H(Ii).map((e) => Ni[e]?.data ? {
			id: e,
			...JSON.parse(JSON.stringify(Ni[e].data))
		} : null).filter(Boolean).map(({ id: e, mal: t, section: n, blocks: r }) => ({
			id: e,
			name: t.name,
			kind: t.kind,
			section: n,
			blocks: r
		}));
		k?.sendMaler(e);
	}
	async function zi(e) {
		let t = e.kind === "blocks" ? "blocks" : "section", n = t === "blocks" ? e.blocks : e.section;
		if (!n || !Mi) return;
		let r = (await Re({
			title: Q("canvas.templateNamePrompt"),
			placeholder: Q("ph.templateName")
		}))?.trim();
		if (!r) return;
		let i = za(r);
		if (!i) {
			x(Q("status.invalidName"), "error");
			return;
		}
		if (H(Ii).includes(i)) {
			x(Q("status.templateExists"), "error");
			return;
		}
		Te("maler");
		let a = {
			schemaVersion: 1,
			mal: {
				name: r,
				kind: t
			},
			[t]: n
		};
		Ni[i] = Ai(`urd-draft-mal-${i}`, () => null, S), Ni[i].replace(a), Ni[i].save(), Mi.data.maler = [...H(Ii), i], Mi.save(), L(Ii, [...H(Ii), i], !0), x(Q("status.templateSaved", { name: r }), "ok"), j(), Ri();
	}
	async function Bi(e) {
		let t = Ni[e.id]?.data?.mal;
		t && await Le({ title: Q("confirm.deleteTemplate", { name: t.name }) }) && (Te("maler"), localStorage.removeItem(`urd-draft-mal-${e.id}`), delete Ni[e.id], Mi.data.maler = H(Ii).filter((t) => t !== e.id), Mi.save(), L(Ii, H(Ii).filter((t) => t !== e.id), !0), j(), Ri());
	}
	async function Vi() {
		let e = {
			version: 1,
			samlinger: []
		};
		try {
			e = await (await fetch("/content/samlinger.json")).json();
		} catch {}
		yi = Ai("urd-draft-samlinger", () => e, S), L(Ci, [...yi.data.samlinger ?? []], !0);
		for (let e of H(Ci)) {
			let t = null;
			try {
				t = await (await fetch(`/content/samlinger/${e}.json`)).json();
			} catch {}
			xi[e] = t, bi[e] = Ai(`urd-draft-samling-${e}`, () => t, S), !t && !bi[e].data && (bi[e].replace({
				schemaVersion: 1,
				id: e,
				name: e,
				kind: "custom",
				entries: []
			}), bi[e].save());
		}
		Si = !0, Ui();
	}
	function Ui(e = !0) {
		let t = {};
		for (let e of H(Ci)) bi[e] && (t[e] = JSON.parse(JSON.stringify(bi[e].data)));
		L(wi, t, !0), e && Wi();
	}
	function Wi() {
		k?.sendCollections(ze(H(wi)) ?? {});
	}
	function Gi(e, t, n, r = !0) {
		let i = bi[e];
		i && (Te(t), n(i.data), i.save(), j(), Ui(r));
	}
	function qi(e) {
		let { collection: t, entryId: n, field: r, value: i } = e;
		[
			"title",
			"text",
			"image",
			"imageAlt",
			"imageStyle"
		].includes(r) && (r === "title" && !String(i ?? "").replace(/<[^>]*>/g, "").trim() || Gi(t, `edit:samling:${t}:${n}:${r}`, (e) => {
			let t = e.entries.find((e) => e.id === n);
			t && (i === "" && r !== "title" ? delete t[r] : t[r] = i);
		}, r === "image"));
	}
	function Ji() {
		let e = H(Oi).trim();
		if (!e) return;
		let t = $i(e);
		if (!t || H(Ci).includes(t)) {
			x(Q(t ? "status.collectionExists" : "status.invalidName"), "error");
			return;
		}
		Te("samlinger");
		let n = {
			schemaVersion: 1,
			id: t,
			name: e,
			kind: H(ki),
			entries: []
		};
		bi[t] = Ai(`urd-draft-samling-${t}`, () => null, S), bi[t].replace(n), bi[t].save(), yi.data.samlinger = [...H(Ci), t], yi.save(), L(Ci, [...H(Ci), t], !0), L(Di, t, !0), L(Oi, ""), j(), Ui();
	}
	function ta(e) {
		Te("samlinger"), localStorage.removeItem(`urd-draft-samling-${e}`), delete bi[e], yi.data.samlinger = H(Ci).filter((t) => t !== e), yi.save(), L(Ci, H(Ci).filter((t) => t !== e), !0), H(Di) === e && L(Di, null), j(), Ui();
	}
	function na(e) {
		Gi(e, `samling:${e}:add-entry`, (e) => {
			e.entries.unshift({
				id: Ra("innslag"),
				title: Q("seed.newEntry"),
				date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
				text: ""
			});
		});
	}
	function ra(e, t, n, r) {
		Gi(e, `edit:samling:${e}:${t}:${n}`, (e) => {
			let i = e.entries.find((e) => e.id === t);
			i && (r === "" && n !== "title" ? delete i[n] : i[n] = r);
		});
	}
	function ia(e, t, n) {
		Gi(e, `samling:${e}:move-entry`, (e) => {
			let r = t + n;
			r < 0 || r >= e.entries.length || ([e.entries[t], e.entries[r]] = [e.entries[r], e.entries[t]]);
		});
	}
	function aa(e, t) {
		Gi(e, `samling:${e}:remove-entry`, (e) => {
			e.entries = e.entries.filter((e) => e.id !== t);
		});
	}
	async function oa(e, t, n) {
		let r = n.target.files?.[0];
		n.target.value = "", r && ra(e, t, "image", (await Sn(r)).dataUrl);
	}
	let sa = null, da, fa = new Promise((e) => {
		da = e;
	}), pa = /* @__PURE__ */ I(null), ma = en({}), ha = /* @__PURE__ */ I("0.0.0"), ga = /* @__PURE__ */ I(""), _a = /* @__PURE__ */ I(""), va = /* @__PURE__ */ I(en([])), ya = /* @__PURE__ */ I(en([])), Sa = /* @__PURE__ */ I("pending"), wa = () => [.../* @__PURE__ */ new Set([...H(pa)?.enabled ?? [], ...H(pa)?.disabled ?? []])];
	function Ta() {
		L(pa, JSON.parse(JSON.stringify(sa.data)), !0);
	}
	let Ea = /* @__PURE__ */ I(null);
	async function Da() {
		try {
			let e = (await fetch("/urd.json", { cache: "no-store" })).headers.get("content-security-policy");
			if (!e) {
				L(Ea, { unknown: !0 }, !0);
				return;
			}
			let t = (t) => new Set((e.split(";").map((e) => e.trim()).find((e) => e.startsWith(`${t} `)) ?? "").split(/\s+/).slice(1));
			L(Ea, {
				frameSrc: t("frame-src"),
				connectSrc: t("connect-src")
			}, !0);
		} catch {
			L(Ea, { unknown: !0 }, !0);
		}
	}
	function ka(e) {
		let t = [...(e.connectSrc ?? []).map((e) => ["connect-src", e]), ...(e.frameSrc ?? []).map((e) => ["frame-src", e])];
		if (!H(Ea) || H(Ea).unknown) return [];
		let n = {
			"connect-src": H(Ea).connectSrc,
			"frame-src": H(Ea).frameSrc
		};
		return t.filter(([e, t]) => !n[e]?.has(t)).map(([e, t]) => `${e} ${t}`);
	}
	async function Aa() {
		Da();
		let e = {
			version: 1,
			enabled: []
		};
		try {
			e = await (await fetch("/plugins/plugins.json")).json();
		} catch {}
		L(ya, e.enabled ?? [], !0), sa = Ai("urd-draft-plugins", () => e, S), Ta();
		try {
			L(ha, (await (await fetch("/urd.json")).json()).engine ?? "0.0.0", !0);
		} catch {}
		for (let e of wa()) Ia(e);
		Na(), da(), k?.sendPlugins(ze(H(pa))?.enabled ?? []);
	}
	async function Na() {
		try {
			let e = await fetch("/api/github/plugins");
			if (!e.ok) {
				Pa();
				return;
			}
			let { plugins: t } = await e.json();
			localStorage.setItem("urd-plugins-found", JSON.stringify(t ?? [])), L(va, (t ?? []).filter((e) => !wa().includes(e)), !0);
			for (let e of H(va)) Ia(e);
			L(Sa, "ok");
		} catch {
			Pa();
		}
	}
	function Pa() {
		try {
			let e = JSON.parse(localStorage.getItem("urd-plugins-found") ?? "[]");
			if (Array.isArray(e) && e.length) {
				L(va, e.filter((e) => !wa().includes(e)), !0);
				for (let e of H(va)) Ia(e);
				L(Sa, "ok");
				return;
			}
		} catch {}
		L(Sa, "unavailable");
	}
	async function Ia(e) {
		try {
			let t = await (await fetch(`/plugins/${e}/plugin.json`)).json(), n = La(t);
			ma[e] = {
				...t,
				errors: n,
				satisfied: n.length === 0 && Fa(H(ha), t.requiresEngine)
			};
		} catch {
			ma[e] = {
				name: e,
				errors: [Q("plugin.manifestNotFound", { id: e })],
				satisfied: !1
			};
		}
	}
	function Ba(e, t) {
		Te("plugins");
		let n = sa.data;
		n.enabled = (n.enabled ?? []).filter((t) => t !== e), n.disabled = (n.disabled ?? []).filter((t) => t !== e), t ? n.enabled.push(e) : n.disabled.push(e), sa.save(), j(), Ta(), Va();
	}
	function Va() {
		H(w) && (H(w).src = H(w).src);
	}
	function Ha(e) {
		Te("plugins");
		let t = sa.data;
		t.enabled = (t.enabled ?? []).filter((t) => t !== e), t.disabled = (t.disabled ?? []).filter((t) => t !== e), sa.save(), j(), Ta(), Va();
	}
	async function Wa() {
		L(_a, "");
		let e = H(ga).trim().toLowerCase();
		if (!/^[a-z0-9][a-z0-9-]*$/.test(e)) {
			L(_a, Q("plugin.invalidId"), !0);
			return;
		}
		if (wa().includes(e)) {
			L(_a, Q("plugin.alreadyListed"), !0);
			return;
		}
		if (await Ia(e), ma[e].errors.length) {
			L(_a, Q("plugin.invalidManifest", { errors: ma[e].errors.join("; ") }), !0);
			return;
		}
		Ba(e, !0), L(ga, "");
	}
	function Ga(e) {
		L(va, H(va).filter((t) => t !== e), !0), Ba(e, !0);
	}
	function Xa(e, t) {
		Pr(e, () => {
			H(A).footer ??= {
				version: 1,
				show: !1,
				text: "",
				align: "center"
			}, t(H(A).footer);
		});
	}
	function Za(e, t) {
		Xa(`edit:footer-brand-${e}`, (n) => {
			n.brand ??= {}, t.trim() ? n.brand[e] = t : delete n.brand[e], !n.brand.title && !n.brand.tagline && !n.brand.logo && delete n.brand;
		});
	}
	function Qa(e) {
		Xa("footer", (t) => {
			t.brand ??= {}, e === "image" || e === "both" ? t.brand.mode = e : delete t.brand.mode;
		});
	}
	async function $a(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await Sn(t);
			Xa("footer", (t) => {
				t.brand ??= {}, t.brand.logo = e.dataUrl, t.brand.mode || (t.brand.mode = "both");
			});
		} catch {
			x(Q("status.imageReadErrorSvg"), "error");
		}
	}
	function eo() {
		Xa("footer", (e) => {
			e.brand && (delete e.brand.logo, delete e.brand.mode, delete e.brand.logoHeight, !e.brand.title && !e.brand.tagline && delete e.brand);
		});
	}
	function to(e) {
		Xa("edit:footer-logo-height", (t) => {
			t.brand ??= {};
			let n = Number(e);
			Number.isFinite(n) && (t.brand.logoHeight = Math.min(160, Math.max(16, Math.round(n))));
		});
	}
	function no(e) {
		Xa("edit:footer-copyright", (t) => {
			e.trim() ? t.copyright = e : delete t.copyright;
		});
	}
	let ro = [
		{
			id: "minimal",
			label: Q("footerTemplate.minimal"),
			thumb: {
				center: !0,
				social: 2,
				baselineLinks: 1
			}
		},
		{
			id: "sentrert",
			label: Q("footerTemplate.sentrert"),
			thumb: {
				center: !0,
				row: !0,
				social: 3
			}
		},
		{
			id: "kolonner",
			label: Q("footerTemplate.kolonner"),
			thumb: {
				tag: !0,
				cols: 3,
				social: 3,
				baselineLinks: 2
			}
		},
		{
			id: "sitemap",
			label: Q("footerTemplate.sitemap"),
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
			label: Q("footerTemplate.nyhetsbrev"),
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
			label: Q("footerTemplate.storcta"),
			thumb: {
				center: !0,
				bigcta: !0,
				baselineLinks: 2
			}
		},
		{
			id: "kontakt",
			label: Q("footerTemplate.kontakt"),
			thumb: {
				tag: !0,
				cols: 3,
				social: 2,
				baselineLinks: 1
			}
		},
		{
			id: "mega",
			label: Q("footerTemplate.mega"),
			thumb: {
				tag: !0,
				mega: !0,
				cols: 2,
				social: 4,
				baselineLinks: 2
			}
		}
	];
	function io(e) {
		let t = Q("seed.orgName"), n = H(A).pages ?? [], r = (e) => n.slice(0, e).map((e) => ({
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
			baseline: [a(Q("seed.footer.privacy"), "#")]
		} : e === "sentrert" ? {
			align: "center",
			brand: { title: t },
			linkRow: r(5),
			social: i([
				"facebook",
				"instagram",
				"x"
			]),
			copyright: `${o} · ${Q("seed.footer.madeWith")}`
		} : e === "kolonner" ? {
			align: "left",
			brand: {
				title: t,
				tagline: Q("seed.footer.tagline1")
			},
			columns: [
				{
					title: Q("seed.footer.colPages"),
					links: r(4)
				},
				{
					title: Q("seed.footer.colCompany"),
					links: [
						a(Q("seed.footer.about"), "#"),
						a(Q("seed.join"), "#"),
						a(Q("seed.footer.press"), "#")
					]
				},
				{
					title: Q("seed.footer.colResources"),
					links: [
						a(Q("seed.footer.bylaws"), "#"),
						a(Q("seed.footer.privacy"), "#"),
						a(Q("seed.footer.contact"), "#")
					]
				}
			],
			social: i([
				"facebook",
				"instagram",
				"linkedin"
			]),
			copyright: o,
			baseline: [a(Q("seed.footer.privacy"), "#"), a(Q("seed.footer.terms"), "#")]
		} : e === "sitemap" ? {
			align: "left",
			brand: {
				title: t,
				tagline: Q("seed.footer.tagline2")
			},
			columns: [
				{
					title: Q("seed.footer.colExplore"),
					links: [
						a(Q("seed.footer.home"), "#"),
						a(Q("seed.footer.events"), "#"),
						a(Q("seed.footer.gallery"), "#"),
						a(Q("seed.footer.blog"), "#")
					]
				},
				{
					title: Q("seed.footer.colCompany"),
					links: [
						a(Q("seed.footer.about"), "#"),
						a(Q("seed.footer.history"), "#"),
						a(Q("seed.footer.press"), "#"),
						a(Q("seed.footer.contact"), "#")
					]
				},
				{
					title: Q("seed.footer.colSupport"),
					links: [
						a(Q("seed.join"), "#"),
						a(Q("seed.footer.faq"), "#"),
						a(Q("seed.footer.help"), "#")
					]
				},
				{
					title: Q("seed.footer.colLegal"),
					links: [
						a(Q("seed.footer.privacy"), "#"),
						a(Q("seed.footer.terms"), "#"),
						a(Q("seed.footer.bylaws"), "#")
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
				a(Q("seed.footer.privacy"), "#"),
				a(Q("seed.footer.terms"), "#"),
				a(Q("seed.footer.cookies"), "#")
			]
		} : e === "nyhetsbrev" ? {
			align: "left",
			brand: {
				title: t,
				tagline: Q("seed.footer.tagline3")
			},
			cta: {
				kind: "newsletter",
				heading: Q("seed.footer.newsletterHeading"),
				label: Q("seed.footer.newsletterButton"),
				recipient: Q("seed.email"),
				success: Q("seed.footer.newsletterSuccess")
			},
			columns: [{
				title: Q("seed.footer.colPages"),
				links: r(4)
			}, {
				title: Q("seed.footer.colMore"),
				links: [
					a(Q("seed.footer.about"), "#"),
					a(Q("seed.footer.contact"), "#"),
					a(Q("seed.footer.privacy"), "#")
				]
			}],
			social: i(["facebook", "instagram"]),
			copyright: o,
			baseline: [a(Q("seed.footer.privacy"), "#")]
		} : e === "storcta" ? {
			align: "center",
			cta: {
				kind: "button",
				big: !0,
				heading: Q("seed.footer.ctaHeading"),
				sub: Q("seed.footer.ctaSub"),
				label: Q("seed.join"),
				href: "#"
			},
			linkRow: r(4),
			social: i([
				"facebook",
				"instagram",
				"x"
			]),
			copyright: o,
			baseline: [a(Q("seed.footer.privacy"), "#"), a(Q("seed.footer.terms"), "#")]
		} : e === "kontakt" ? {
			align: "left",
			brand: {
				title: t,
				tagline: Q("seed.footer.tagline4")
			},
			columns: [
				{
					title: Q("seed.footer.colVisit"),
					links: [
						a(Q("seed.footer.address"), "#"),
						a(Q("seed.email"), "mailto:post@dinforening.no"),
						a("+47 22 00 00 00", "tel:+4722000000")
					]
				},
				{
					title: Q("seed.footer.colHours"),
					links: [a(Q("seed.footer.hours1"), "#"), a(Q("seed.footer.hours2"), "#")]
				},
				{
					title: Q("seed.footer.colPages"),
					links: r(4)
				}
			],
			social: i(["facebook", "instagram"]),
			copyright: o,
			baseline: [a(Q("seed.footer.privacy"), "#")]
		} : {
			align: "left",
			brand: {
				title: t,
				tagline: Q("seed.footer.tagline5")
			},
			columns: [{
				title: Q("seed.footer.colExplore"),
				links: r(4)
			}, {
				title: Q("seed.footer.colFollow"),
				links: [a(Q("seed.footer.newsletter"), "#"), a(Q("seed.email"), "mailto:post@dinforening.no")]
			}],
			social: i([
				"facebook",
				"instagram",
				"linkedin",
				"youtube"
			]),
			copyright: o,
			baseline: [a(Q("seed.footer.privacy"), "#"), a(Q("seed.footer.madeWith"), "#")],
			background: {
				version: 1,
				layers: [{
					type: "glow",
					version: co.version ?? 1,
					props: {
						...co.defaults(),
						color: "accent",
						x: .12,
						y: 0,
						radius: .6,
						opacity: .45
					}
				}, {
					type: "grain",
					version: uo.version ?? 1,
					props: {
						...uo.defaults(),
						opacity: .08
					}
				}]
			}
		};
	}
	function ao(e) {
		Xa("footer-template", (t) => {
			let n = io(e);
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
	function oo(e) {
		Xa("footer", (t) => {
			t[e] ??= [], t[e].push(H(A).pages[0] ? {
				label: Q("seed.link"),
				page: H(A).pages[0].id
			} : {
				label: Q("seed.link"),
				href: "https://"
			});
		});
	}
	function lo(e, t) {
		Xa("footer", (n) => {
			n[e].splice(t, 1), n[e].length || delete n[e];
		});
	}
	function fo(e, t, n) {
		Xa("footer", (r) => {
			let i = r[e], a = t + n;
			a < 0 || a >= i.length || ([i[t], i[a]] = [i[a], i[t]]);
		});
	}
	function po(e, t, n) {
		Xa(`edit:footer-${e}-label-${t}`, (r) => {
			r[e][t].label = n;
		});
	}
	function mo(e, t, n) {
		Xa("footer", (r) => {
			let i = r[e][t];
			n === "__href" ? (delete i.page, i.href = i.href ?? "https://") : (i.page = n, delete i.href);
		});
	}
	function ho(e, t, n) {
		Xa(`edit:footer-${e}-href-${t}`, (r) => {
			r[e][t].href = n;
		});
	}
	function go(e) {
		Xa("footer", (t) => {
			e === "center" ? t.columnsAlign = "center" : delete t.columnsAlign;
		});
	}
	function _o(e) {
		Xa("footer", (t) => {
			e ? t.cta ??= {
				kind: "button",
				label: Q("seed.join")
			} : delete t.cta;
		});
	}
	function vo(e, t) {
		Xa(`edit:footer-cta-${e}`, (n) => {
			n.cta ??= {}, t === "" || t == null || t === !1 ? delete n.cta[e] : n.cta[e] = t;
		});
	}
	function yo(e) {
		Xa("footer", (t) => {
			t.cta ??= {}, e === "__href" ? (delete t.cta.page, t.cta.href = t.cta.href ?? "https://") : (t.cta.page = e, delete t.cta.href);
		});
	}
	function bo(e, t) {
		Xa("footer", (n) => {
			let r = new Set(n.hideOn ?? []);
			t ? r.delete(e) : r.add(e), r.size ? n.hideOn = [...r] : delete n.hideOn;
		});
	}
	function xo() {
		Xa("footer", (e) => {
			e.columns ??= [], e.columns.push({
				title: Q("seed.column"),
				links: [{
					label: Q("seed.link"),
					page: H(A).pages[0].id
				}]
			});
		});
	}
	function So(e) {
		Xa("footer", (t) => {
			t.columns.splice(e, 1), t.columns.length || delete t.columns;
		});
	}
	function Co(e, t) {
		Xa("footer", (n) => {
			let r = e + t;
			r < 0 || r >= n.columns.length || ([n.columns[e], n.columns[r]] = [n.columns[r], n.columns[e]]);
		});
	}
	function wo(e, t) {
		Xa(`edit:footer-col-title-${e}`, (n) => {
			n.columns[e].title = t;
		});
	}
	function To(e) {
		Xa("footer", (t) => {
			t.columns[e].links ??= [], t.columns[e].links.push({
				label: Q("seed.link"),
				page: H(A).pages[0].id
			});
		});
	}
	function Eo(e, t) {
		Xa("footer", (n) => {
			n.columns[e].links.splice(t, 1);
		});
	}
	function Do(e, t, n) {
		Xa("footer", (r) => {
			let i = r.columns[e].links, a = t + n;
			a < 0 || a >= i.length || ([i[t], i[a]] = [i[a], i[t]]);
		});
	}
	function Oo(e, t, n) {
		Xa(`edit:footer-link-label-${e}-${t}`, (r) => {
			r.columns[e].links[t].label = n;
		});
	}
	function ko(e, t, n) {
		Xa("footer", (r) => {
			let i = r.columns[e].links[t];
			n === "__href" ? (delete i.page, i.href = i.href ?? "https://") : (i.page = n, delete i.href);
		});
	}
	function Ao(e, t, n) {
		Xa(`edit:footer-link-href-${e}-${t}`, (r) => {
			r.columns[e].links[t].href = n;
		});
	}
	function jo() {
		Xa("footer", (e) => {
			e.social ??= [], e.social.push({
				icon: "facebook",
				url: "https://"
			});
		});
	}
	function Mo(e) {
		Xa("footer", (t) => {
			t.social.splice(e, 1), t.social.length || delete t.social;
		});
	}
	function Po(e, t) {
		Xa("footer", (n) => {
			let r = e + t;
			r < 0 || r >= n.social.length || ([n.social[e], n.social[r]] = [n.social[r], n.social[e]]);
		});
	}
	function Fo(e, t) {
		Xa("footer", (n) => {
			n.social[e].icon = t;
		});
	}
	function Io(e, t) {
		Xa(`edit:footer-social-url-${e}`, (n) => {
			n.social[e].url = t;
		});
	}
	let zo = la.filter(([e]) => e === "iconCat.social" || e === "iconCat.communication").flatMap(([, e]) => e.map((e) => [e, ca[e].label]));
	function Bo(e, t) {
		Pr(`edit:nav-label-${e}`, () => {
			H(A).nav.items[e].label = t;
		});
	}
	function wl(e, t) {
		Pr("nav", () => {
			let n = H(A).nav.items[e];
			t === "__href" ? (delete n.page, n.href = n.href ?? "https://") : t === "__none" ? (delete n.page, delete n.href) : (n.page = t, delete n.href);
		});
	}
	function Tl(e, t) {
		Pr(`edit:nav-href-${e}`, () => {
			H(A).nav.items[e].href = t;
		});
	}
	function El(e, t) {
		let n = e + t, r = H(A).nav.items;
		n < 0 || n >= r.length || Pr("nav", () => {
			[r[e], r[n]] = [r[n], r[e]];
		});
	}
	function Dl(e) {
		Pr("nav", () => {
			H(A).nav.items.splice(e, 1);
		});
	}
	function Ol() {
		Pr("nav", () => {
			H(A).nav.items.push({
				label: Q("seed.link"),
				page: H(A).pages[0].id
			});
		});
	}
	function kl(e) {
		Pr("nav", () => {
			let t = H(A).nav.items[e];
			t.children ??= [], t.children.push({
				label: Q("seed.link"),
				page: H(A).pages[0].id
			});
		});
	}
	function Al(e, t, n) {
		Pr(`edit:nav-child-label-${e}-${t}`, () => {
			H(A).nav.items[e].children[t].label = n;
		});
	}
	function jl(e, t, n) {
		Pr("nav", () => {
			let r = H(A).nav.items[e].children[t];
			n === "__href" ? (delete r.page, r.href = r.href ?? "https://") : (r.page = n, delete r.href);
		});
	}
	function Ml(e, t, n) {
		Pr(`edit:nav-child-href-${e}-${t}`, () => {
			H(A).nav.items[e].children[t].href = n;
		});
	}
	function Nl(e, t, n) {
		let r = t + n, i = H(A).nav.items[e].children;
		r < 0 || r >= i.length || Pr("nav", () => {
			[i[t], i[r]] = [i[r], i[t]];
		});
	}
	function Pl(e, t) {
		Pr("nav", () => {
			let n = H(A).nav.items[e];
			n.children.splice(t, 1), n.children.length === 0 && (delete n.children, !n.page && !n.href && (n.page = H(A).pages[0].id));
		});
	}
	function Fl(e, t) {
		Pr(`edit:theme-color-${e}`, () => {
			H(A).theme.tokens.color[e] = t, H(A).theme.alt?.auto && (H(A).theme.alt.tokens.color = zl());
		});
	}
	function Il(e, t) {
		Pr("theme", () => {
			H(A).theme.tokens.font[e] = t;
		});
	}
	function Ll(e, t) {
		Pr("theme", () => {
			H(A).theme.tokens.radius[e] = t;
		});
	}
	function Rl(e) {
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
	function zl() {
		return Object.fromEntries(Object.entries(H(A).theme.tokens.color).map(([e, t]) => [e, Rl(t)]));
	}
	function Bl(e, t) {
		Pr(`edit:theme-alt-${e}`, () => {
			H(A).theme.alt.tokens.color[e] = t, H(A).theme.alt.auto = !1;
		});
	}
	function Vl(e) {
		Pr("theme", () => {
			e === "light" ? delete H(A).theme.scheme : H(A).theme.scheme = e;
		});
	}
	function Hl(e) {
		Pr("theme", () => {
			e ? H(A).theme.alt = {
				auto: !0,
				tokens: { color: zl() }
			} : delete H(A).theme.alt;
		});
	}
	function Ul(e) {
		Pr("theme", () => {
			H(A).theme.alt ??= { tokens: { color: zl() } }, H(A).theme.alt.auto = e, e && (H(A).theme.alt.tokens.color = zl());
		});
	}
	function Wl(e) {
		let t = H(A).theme.tokens.font[e];
		return [...Ho.some(([, e]) => e === t) ? [] : [[t, Q("opt.customFont")]], ...Ho.map(([e, t]) => [t, Q(e)])];
	}
	let Gl = (e) => parseInt(e, 10) || 0;
	function Kl(e, t) {
		Ll(e, `${t}px`);
	}
	let ql = (e, t) => e && t && t[e] ? t[e] : e, Jl = [
		"bg",
		"surface",
		"text",
		"accent",
		"accent-text"
	], Yl = [
		{
			id: "bronn",
			name: Q("themePreset.bronn.name"),
			note: Q("themePreset.bronn.note"),
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
			name: Q("themePreset.stein.name"),
			note: Q("themePreset.stein.note"),
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
			name: Q("themePreset.plomme.name"),
			note: Q("themePreset.plomme.note"),
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
			name: Q("themePreset.rose.name"),
			note: Q("themePreset.rose.note"),
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
			name: Q("themePreset.hav.name"),
			note: Q("themePreset.hav.note"),
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
			name: Q("themePreset.natt.name"),
			note: Q("themePreset.natt.note"),
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
	function Xl(e) {
		Pr("theme", () => {
			let t = e.scheme === "dark", n = t ? e.dark : e.light, r = t ? e.light : e.dark;
			for (let e of Jl) H(A).theme.tokens.color[e] = n[e];
			t ? H(A).theme.scheme = "dark" : delete H(A).theme.scheme, H(A).theme.alt = { tokens: { color: { ...r } } };
		});
	}
	let Zl = /* @__PURE__ */ F(() => {
		if (!H(A)) return null;
		let e = H(A).theme.tokens.color, t = H(A).theme.alt?.tokens?.color ?? {}, n = H(A).theme.scheme === "dark";
		return Yl.find((r) => {
			let i = n ? r.dark : r.light, a = n ? r.light : r.dark;
			return Jl.every((n) => e[n] === i[n] && t[n] === a[n]);
		})?.id ?? null;
	});
	function Ql() {
		L(D, !H(D)), k?.sendChrome(H(D));
	}
	function $l(e) {
		let t = O.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		n && (Te(`edit:${e.blockId}`), n.props = e.props, O.save(), j(), H(N)?.blockId === e.blockId && ut(), e.rerender && k?.sendSection(H(g), t), L(v, ""));
	}
	function eu(e) {
		let t = O.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		if (!n) return;
		Te(e.coalesce ? `edit:${e.groupKey ?? e.blockId}` : "move-block");
		let r = e.frameKey === "mobile" ? "mobile" : "desktop";
		n.frames[r] = e.frame, r === "desktop" && he(t, "desktop-endret-etter-mobil"), O.save(), j(), H(N)?.blockId === e.blockId && ut();
	}
	function tu(e) {
		let t = O.data.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
		!t?.frames?.desktop || t.frames.desktop.h === e.h || (O.amendBaseline((t) => {
			let n = t.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
			n?.frames?.desktop && (n.frames.desktop.h = e.h);
		}), O.hasDraft() && Te(`edit:${e.blockId}`), t.frames.desktop.h = e.h, O.save(), j(), H(N)?.blockId === e.blockId && ut());
	}
	function nu(e) {
		let t = O.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			Te("mobile-manual");
			for (let { blockId: n, frame: r } of e.frames) {
				let e = t.blocks.find((e) => e.id === n);
				e && (e.frames.mobile = r);
			}
			t.responsive = {
				...t.responsive ?? {},
				mobile: {
					mode: "manual",
					attention: t.responsive?.mobile?.attention ?? null
				}
			}, O.save(), j();
		}
	}
	function ru(e) {
		let t = O.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			Te("mobile-auto");
			for (let e of t.blocks) e.frames.mobile = null;
			t.responsive = {
				...t.responsive ?? {},
				mobile: {
					mode: "auto",
					attention: null
				}
			}, O.save(), j(), me(), k?.sendSection(H(g), t);
		}
	}
	function iu(e) {
		let t = O.data.sections.find((t) => t.id === e.sectionId);
		t?.responsive?.mobile && (Te("review-done"), t.responsive.mobile.attention = null, O.save(), j(), me());
	}
	function au(e) {
		let t = O.data.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
		t && (Te("decor"), t.decor = e.decor, O.save(), j(), H(N)?.blockId === e.blockId && ut());
	}
	function ou(e) {
		Te("add-section"), e.section.id || (e.section.id = Ra("sec")), O.data.sections.splice(e.index, 0, e.section), O.save(), j(), k?.sendPage(H(g), O.data), L(Pt, e.section.id, !0), Vt(e.section), H(Ye) !== "properties" && (L(Ye, "properties"), k?.sendShowGrid(!1));
	}
	function su(e) {
		let t = O.data.sections, n = t.findIndex((t) => t.id === e.sectionId), r = n + e.dir;
		n < 0 || r < 0 || r >= t.length || (Te("move-section"), [t[n], t[r]] = [t[r], t[n]], O.save(), j(), k?.sendPage(H(g), O.data));
	}
	function cu(e) {
		Te("delete-section"), e.sectionId === H(Pt) && (L(Pt, null), L(Ft, null)), H(N)?.sectionId === e.sectionId && L(N, null), O.data.sections = O.data.sections.filter((t) => t.id !== e.sectionId), O.save(), j(), k?.sendPage(H(g), O.data);
	}
	function lu(e) {
		let t = O.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			Te("section-size"), t.size = {
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
			e.moves?.length && (he(t, "seksjonshøyde"), H(N)?.sectionId === e.sectionId && ut()), e.sectionId === H(Pt) && L(It, e.minHeight, !0), O.save(), j();
		}
	}
	function uu(e) {
		let t = O.data.sections.find((t) => t.id === e.fromSectionId), n = O.data.sections.find((t) => t.id === e.toSectionId), r = t?.blocks.find((t) => t.id === e.blockId);
		!t || !n || !r || (Te("move-block"), t.blocks = t.blocks.filter((t) => t.id !== e.blockId), r.frames.desktop = e.frame, r.frames.mobile = null, n.blocks.push(r), he(t, "blokk-flyttet"), he(n, "blokk-flyttet"), O.save(), j(), me(), k?.sendPage(H(g), O.data), H(N)?.blockId === e.blockId && (L(N, {
			...H(N),
			sectionId: e.toSectionId
		}, !0), ut()));
	}
	function du(e) {
		let t = O.data.sections.find((t) => t.id === e.sectionId);
		if (!t) return;
		let n = e.blockIds ?? [e.blockId];
		Te("delete-block"), t.blocks = t.blocks.filter((e) => !n.includes(e.id)), n.includes(H(N)?.blockId) && L(N, null), he(t, "blokk-slettet"), O.save(), j(), k?.sendSection(H(g), t);
	}
	let fu = {
		text: {
			type: "text",
			props: {
				html: Q("seed.text"),
				align: "left"
			},
			w: 33,
			h: 28
		},
		"text-box": {
			type: "text",
			props: {
				html: Q("seed.textBox"),
				align: "left",
				box: !0
			},
			w: 30,
			h: 150
		},
		button: {
			type: "button",
			props: {
				label: Q("seed.newButton"),
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
						q: Q("seed.faq.q1"),
						a: Q("seed.faq.answer")
					},
					{
						q: Q("seed.faq.q2"),
						a: Q("seed.faq.answer")
					},
					{
						q: Q("seed.faq.q3"),
						a: Q("seed.faq.answer")
					}
				],
				multi: !1
			},
			w: 50,
			h: 220
		}
	};
	function pu(e) {
		let t = fu[e];
		return t ? {
			id: Ra("blk"),
			type: t.type,
			version: 1,
			decor: !!t.decor,
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
	function mu(e) {
		k ? k.sendPlaceBlock(e) : hu(Qn()?.id, e);
	}
	function hu(e, t) {
		let n = O.data.sections.find((t) => t.id === e) ?? O.data.sections[0];
		if (!n) return;
		Te("add-block");
		let r = Math.max(0, ...n.blocks.map((e) => e.frames?.desktop?.z ?? 1)) + 1;
		t.frames?.desktop && (t.frames.desktop = {
			...t.frames.desktop,
			z: r
		}), n.blocks.push(t), he(n, "blokk-lagt-til"), O.save(), j(), k?.sendSection(H(g), n);
	}
	function gu(e, t, n, r) {
		let i = O.data.sections.find((t) => t.id === e);
		if (!i || !t?.length) return;
		Te("add-blocks");
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
		}), he(i, "blokk-lagt-til"), O.save(), j(), k?.sendSection(H(g), i);
	}
	function _u(e) {
		mu(pu(e));
	}
	let vu = /* @__PURE__ */ I(en([]));
	function yu(e, t = {}) {
		let n = ze(e);
		mu({
			id: Ra("blk"),
			type: n.type,
			version: n.version ?? 1,
			decor: !1,
			props: {
				...n.defaults ?? {},
				...ze(t)
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
	function bu(e) {
		let t = pu(e.kind);
		if (t) {
			if (e.at && typeof e.at.x == "number" && typeof e.at.y == "number") {
				let n = O.data.sections.find((t) => t.id === e.sectionId)?.grid ?? H(A).grid, r = Uo({
					x: e.at.x,
					y: e.at.y,
					w: t.frames.desktop.w,
					h: t.frames.desktop.h,
					grid: n
				});
				t.frames.desktop.x = r.x, t.frames.desktop.y = r.y;
			} else t.frames.desktop.x = Math.round((100 - t.frames.desktop.w) / 2 * 100) / 100, t.frames.desktop.y = 40;
			hu(e.sectionId, t), k?.sendSelect(t.id), e.kind === "image" && x(Q("status.imageBlockAdded")), e.kind === "galleri" && x(Q("status.galleryBlockAdded"));
		}
	}
	async function xu(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		x(Q("status.compressingImage"));
		let n;
		try {
			n = await Sn(t);
		} catch {
			x(Q("status.imageReadError"), "error");
			return;
		}
		let r = Math.round(n.height / n.width * .3 * (H(w)?.clientWidth ?? 1280));
		mu({
			id: Ra("blk"),
			type: "image",
			version: 1,
			props: {
				src: n.dataUrl,
				alt: $i(t.name).replaceAll("-", " "),
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
		}), n.bytes > 4e5 ? x(Q("status.imageLarge", { kb: Math.round(n.bytes / 1024) }), "error") : x("");
	}
	async function Su(e) {
		let t = [], n = 0, r = 0;
		for (let i of e) try {
			let e = await Sn(i);
			e.bytes > 4e5 && (r += 1), t.push({
				src: e.dataUrl,
				alt: $i(i.name).replaceAll("-", " "),
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
	function Cu(e, t, n) {
		t ? x(Q("status.imagesReadFailed", { n: t }), "error") : n ? x(Q("status.imagesLarge", { n }), "error") : x(e ? "" : Q("status.noImagesAdded"));
	}
	async function wu(e) {
		let t = [...e.target.files ?? []];
		if (e.target.value = "", !t.length) return;
		x(Q("status.compressingImages"));
		let { images: n, failed: r, big: i } = await Su(t);
		n.length && ht("galleri-add", (e) => {
			e.props.images.push(...n);
		}), Cu(n.length, r, i);
	}
	async function Tu(e) {
		let t = [...e.target.files ?? []];
		if (e.target.value = "", !t.length) return;
		x(Q("status.compressingImages"));
		let { images: n, failed: r, big: i } = await Su(t);
		if (!n.length) {
			Cu(0, r, i);
			return;
		}
		let a = pu("galleri");
		a.props.images = n, mu(a), Cu(n.length, r, i);
	}
	function Eu(e, t) {
		ht("galleri-move", (n) => {
			let r = e + t;
			r < 0 || r >= n.props.images.length || ([n.props.images[e], n.props.images[r]] = [n.props.images[r], n.props.images[e]]);
		});
	}
	function Du(e) {
		ht("galleri-remove", (t) => {
			t.props.images.splice(e, 1);
		});
	}
	function Ou(e, t, n) {
		ht(`edit:${H(N).blockId}:img${e}-${t}`, (r) => {
			r.props.images[e][t] = n;
		});
	}
	function ku(e, t, n, r) {
		let i = e?.[t];
		if (!i?.startsWith("data:image/")) return;
		let a = i.split(",", 2)[1], o = `media/${$i(n || "bilde")}-${ea(a)}.${Qi(i)}`;
		r.push({
			path: o,
			content: a,
			encoding: "base64"
		}), e[t] = `/${o}`;
	}
	function Au(e, t) {
		for (let n of e?.layers ?? []) if (n.type === "image" && ku(n.props, "src", "bakgrunn", t), n.type === "bildegalleri") for (let e of n.props.images ?? []) ku(e, "src", "bakgrunn", t);
	}
	function ju(e, t) {
		if (e.type === "image" && ku(e.props, "src", e.props.alt, t), e.type === "icon" && ku(e.props, "image", "ikon", t), e.type === "galleri") for (let n of e.props.images ?? []) ku(n, "src", n.alt || "galleri", t);
	}
	function Mu(e, t) {
		Au(e.background, t);
		for (let n of e.blocks) ju(n, t);
	}
	function Nu(e) {
		let t = [];
		for (let n of e.sections) Mu(n, t);
		return t;
	}
	function Pu(e) {
		let t = [], n = e.nav?.logo;
		return n?.type === "image" && ku(n, "value", "logo", t), n?.type === "both" && ku(n, "image", "logo", t), e.nav?.style && ku(e.nav.style, "image", "meny", t), Au(e.nav?.style?.background, t), Au(e.footer?.background, t), e.footer?.brand && ku(e.footer.brand, "logo", "footer-logo", t), ku(e.site, "icon", "ikon", t), t;
	}
	let Fu = /* @__PURE__ */ I(!1);
	function Iu() {
		if (!H(Fu)) {
			L(Fu, !0);
			return;
		}
		L(Fu, !1), Lu();
	}
	yn(() => {
		if (!H(Fu)) return;
		let e = (e) => {
			e.target?.closest?.(".discard-btn") || L(Fu, !1);
		}, t = (e) => {
			e.key === "Escape" && L(Fu, !1);
		}, n = () => L(Fu, !1);
		return window.addEventListener("pointerdown", e, !0), window.addEventListener("keydown", t, !0), window.addEventListener("blur", n), () => {
			window.removeEventListener("pointerdown", e, !0), window.removeEventListener("keydown", t, !0), window.removeEventListener("blur", n);
		};
	});
	function Lu() {
		Te("discard");
		for (let e of H(A).pages) e.id !== H(g) && !ye.has(e.id) && localStorage.removeItem(`urd-draft-${e.id}`);
		let e = O.reset();
		if (ge.reset(), sa && (sa.reset(), Ta()), yi) {
			yi.reset(), L(Ci, [...yi.data.samlinger ?? []], !0);
			for (let e of Object.keys(bi)) H(Ci).includes(e) ? bi[e].reset() : delete bi[e];
			Ui();
		}
		if (Mi) {
			Mi.reset(), L(Ii, [...Mi.data.maler ?? []], !0);
			for (let e of Object.keys(Ni)) H(Ii).includes(e) ? Ni[e].reset() : (localStorage.removeItem(`urd-draft-mal-${e}`), delete Ni[e]);
			Ri();
		}
		_e(), L(E, {
			snap: !0,
			...H(A).grid
		}, !0), j(), L(v, ""), ve(), H(A).pages.some((e) => e.id === H(g)) ? k?.sendPage(H(g), e) : Er(H(A).pages[0].id);
	}
	async function Ru() {
		if (dr) {
			x(Q("status.revertReloadBeforePublish"), "error");
			return;
		}
		if (H(gr)) {
			x(Q("update.publishBlocked"), "error");
			return;
		}
		x(Q("status.publishing"));
		let e = [], t = [], n = [], r = [];
		for (let i of H(A).pages) {
			let a = `urd-draft-${i.id}`, o = ye.has(i.id) || !H(h).pages.some((e) => e.id === i.id), s = null;
			if (i.id === H(g) && (O.hasDraft() || o)) s = O.data;
			else if (i.id !== H(g)) {
				let e = localStorage.getItem(a);
				if (e) try {
					s = Ma(JSON.parse(e), ge.data);
				} catch {}
			}
			if (!s && o && (s = Tr(i)), !s) continue;
			let c = JSON.parse(JSON.stringify(s));
			e.push(...Nu(c)), e.push({
				path: i.file,
				content: JSON.stringify(c, null, 2) + "\n",
				encoding: "utf-8"
			}), t.push(i.title), o ? r.push(i.id) : n.push(a);
		}
		if (ge.hasDraft()) {
			let r = JSON.parse(JSON.stringify(H(A)));
			e.push(...Pu(r)), e.push({
				path: "content/site.json",
				content: JSON.stringify(r, null, 2) + "\n",
				encoding: "utf-8"
			}), e.push({
				path: "content/theme.css",
				content: Ua(r.theme),
				encoding: "utf-8"
			}), n.push("urd-draft-site");
			let i = (e, t) => JSON.stringify(e ?? null) === JSON.stringify(t ?? null);
			i(H(h).theme, H(A).theme) || t.push("tema"), i(H(h).nav, H(A).nav) || t.push("menyen"), i(H(h).footer, H(A).footer) || t.push("footeren"), i(H(h).pages, H(A).pages) || t.push("sideregisteret"), i(H(h).grid, H(A).grid) || t.push("gridet"), (H(h).site.icon ?? null) !== (H(A).site.icon ?? null) && t.push("nettstedsikonet");
			let { icon: a, ...o } = H(h).site, { icon: s, ...c } = H(A).site;
			i(o, c) || t.push("nettstedsinfo");
		}
		let i = Object.entries(bi).filter(([, e]) => e.hasDraft());
		if (i.length || yi?.hasDraft()) {
			for (let [t, r] of i) {
				let i = JSON.parse(JSON.stringify(r.data));
				for (let t of i.entries) ku(t, "image", t.title, e);
				e.push({
					path: `content/samlinger/${t}.json`,
					content: JSON.stringify(i, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push(`urd-draft-samling-${t}`);
			}
			if (yi?.hasDraft()) {
				e.push({
					path: "content/samlinger.json",
					content: JSON.stringify(yi.data, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push("urd-draft-samlinger");
				let t = { samlinger: [] };
				try {
					t = await (await fetch("/content/samlinger.json")).json();
				} catch {}
				let r = new Set(e.map((e) => e.path));
				for (let n of t.samlinger ?? []) {
					let t = `content/samlinger/${n}.json`;
					!H(Ci).includes(n) && !r.has(t) && e.push({
						path: t,
						delete: !0
					});
				}
			}
			t.push("samlinger");
		}
		let a = Object.entries(Ni).filter(([, e]) => e.hasDraft());
		if (a.length || Mi?.hasDraft()) {
			for (let [t, r] of a) {
				let i = JSON.parse(JSON.stringify(r.data));
				i.section && Mu(i.section, e);
				for (let t of i.blocks ?? []) ju(t, e);
				e.push({
					path: `content/maler/${t}.json`,
					content: JSON.stringify(i, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push(`urd-draft-mal-${t}`);
			}
			if (Mi?.hasDraft()) {
				e.push({
					path: "content/maler.json",
					content: JSON.stringify(Mi.data, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push("urd-draft-maler");
				let t = { maler: [] };
				try {
					t = await (await fetch("/content/maler.json")).json();
				} catch {}
				let r = new Set(e.map((e) => e.path));
				for (let n of t.maler ?? []) {
					let t = `content/maler/${n}.json`;
					!H(Ii).includes(n) && !r.has(t) && e.push({
						path: t,
						delete: !0
					});
				}
			}
			t.push("maler");
		}
		sa?.hasDraft() && (e.push({
			path: "plugins/plugins.json",
			content: JSON.stringify(sa.data, null, 2) + "\n",
			encoding: "utf-8"
		}), n.push("urd-draft-plugins"), t.push("plugins"));
		try {
			let t = await (await fetch("/index.html")).text();
			for (let n of H(A).pages) n.path !== "/" && e.push({
				path: `${n.path.slice(1)}/index.html`,
				content: t,
				encoding: "utf-8"
			});
		} catch {}
		let o = new Set(e.map((e) => e.path)), s = (t) => {
			o.has(t) || e.push({
				path: t,
				delete: !0
			});
		};
		for (let e of H(h).pages) {
			let t = H(A).pages.find((t) => t.id === e.id);
			t ? t.path !== e.path && e.path !== "/" && s(`${e.path.slice(1)}/index.html`) : (s(e.file), e.path !== "/" && s(`${e.path.slice(1)}/index.html`));
		}
		let c = await ar(e);
		if (!c.ok) {
			x(Q("status.publishAborted"), "error");
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
			e ? rr = e : ir(), Nu(O.data), Pu(H(A));
			for (let e of n) localStorage.removeItem(e);
			for (let e of r) ye.add(e);
			if (L(h, JSON.parse(JSON.stringify(H(A))), !0), ge = Ai("urd-draft-site", () => H(h), S), _e(), sa) {
				let e = JSON.parse(JSON.stringify(sa.data));
				sa = Ai("urd-draft-plugins", () => e, S), Ta();
			}
			if (yi) {
				for (let e of Object.values(bi)) for (let t of e.data.entries) ku(t, "image", t.title, []);
				let e = JSON.parse(JSON.stringify(yi.data));
				yi = Ai("urd-draft-samlinger", () => e, S), xi = {};
				for (let e of H(Ci)) {
					if (!bi[e]) continue;
					let t = JSON.parse(JSON.stringify(bi[e].data));
					xi[e] = t, bi[e] = Ai(`urd-draft-samling-${e}`, () => t, S);
				}
				Ui();
			}
			if (Mi) {
				for (let e of Object.values(Ni)) {
					e.data?.section && Mu(e.data.section, []);
					for (let t of e.data?.blocks ?? []) ju(t, []);
				}
				let e = JSON.parse(JSON.stringify(Mi.data));
				Mi = Ai("urd-draft-maler", () => e, S), Pi = {};
				for (let e of H(Ii)) {
					if (!Ni[e]) continue;
					let t = JSON.parse(JSON.stringify(Ni[e].data));
					Pi[e] = t, Ni[e] = Ai(`urd-draft-mal-${e}`, () => t, S);
				}
				Ri();
			}
			L(E, {
				snap: !0,
				...H(A).grid
			}, !0);
			let t = JSON.parse(JSON.stringify(O.data));
			O = Ai(`urd-draft-${H(g)}`, () => t, S), ye.has(H(g)) && C(`urd-draft-${H(g)}`, JSON.stringify(t)), j(), x(Q("status.published"), "ok");
		} else if (u?.status === 401) {
			let e = await u.json().catch(() => null);
			x(e?.code === "loginExpired" ? Q("status.loginExpired") : Q("status.loginRequired", { reason: Ti(e) ?? Q("status.unknownReason") }), "error"), await nr();
		} else u?.status === 403 ? x(Ti(await u.json().catch(() => null)) ?? Q("status.noPublishAccess"), "error") : u?.status === 409 ? x(Q("status.publishRace"), "error") : x(u ? Ti(await u.json().catch(() => null)) ?? Q("status.publishFailed") : Q("status.publishUnavailable"), "error");
	}
	Fe();
	var zu = Cl();
	xr("keydown", tn, Pe), xr("pointerdown", tn, Ne);
	var Bu = z(zu), Vu = R(Bu), Hu = (e) => {
		var t = Ws(), n = R(t);
		J(n, () => c.pencil);
		var r = B(n);
		M(t), V((e, n) => {
			Z(t, "title", e), K(r, ` ${n ?? ""}`);
		}, [() => Q("tip.backToEdit"), () => Q("ui.edit")]), U("click", t, Ql), G(e, t);
	};
	q(Vu, (e) => {
		H(D) || e(Hu);
	});
	var Uu = B(Vu, 2);
	let Wu;
	var Gu = R(Uu), Ku = B(R(Gu), 2), qu = (e) => {
		var t = Gs(), n = z(t), r = R(n, !0);
		M(n);
		var i = B(n, 2), a = R(i);
		let o;
		J(a, () => c.desktop, !0), M(a);
		var s = B(a, 2);
		let l;
		J(s, () => c.phone, !0), M(s), M(i);
		var u = B(i, 2), d = R(u);
		let f;
		J(d, () => c.fit, !0), M(d);
		var p = B(d, 2);
		J(p, () => c.minus, !0), M(p);
		var m = B(p, 2), h = R(m);
		M(m);
		var g = B(m, 2);
		J(g, () => c.plus, !0), M(g), M(u);
		var _ = B(u, 2);
		let v;
		J(_, () => c.guides, !0), M(_), V((e, t, i, c, u, y, b, x, S, C) => {
			Z(n, "title", e), K(r, t), o = Zr(a, 1, "ghost svelte-1n46o8q", null, o, { active: H(ee) === "desktop" }), Z(a, "title", i), l = Zr(s, 1, "ghost svelte-1n46o8q", null, l, { active: H(ee) === "mobile" }), Z(s, "title", c), f = Zr(d, 1, "ghost svelte-1n46o8q", null, f, { active: H(ae) === "fit" }), Z(d, "title", u), Z(p, "title", y), Z(m, "title", b), K(h, `${x ?? ""}%`), Z(g, "title", S), v = Zr(_, 1, "ghost guides-btn svelte-1n46o8q", null, v, { active: H(W) }), Z(_, "title", C);
		}, [
			() => Q("tip.switchPage"),
			() => be()?.title ?? "",
			() => Q("tip.desktopView"),
			() => Q("tip.mobileView"),
			() => Q("tip.zoomFit"),
			() => Q("tip.zoomOut"),
			() => Q("tip.zoomCurrent"),
			() => Math.round(H(ce) * 100),
			() => Q("tip.zoomIn"),
			() => Q("tip.guides")
		]), U("click", n, () => ct("pages")), U("click", a, () => L(ee, "desktop")), U("click", s, () => L(ee, "mobile")), U("click", d, () => L(ae, "fit")), U("click", p, () => le(-1)), U("click", g, () => le(1)), U("click", _, Mr), G(e, t);
	};
	q(Ku, (e) => {
		H(h) && e(qu);
	});
	var Ju = B(Ku, 2), Yu = (e) => {
		var t = Ks(), n = R(t);
		J(n, () => c.phone);
		var r = B(n);
		M(t), V((e, n) => {
			Z(t, "title", e), K(r, ` ${n ?? ""}`);
		}, [() => Q("tip.attention"), () => Q(H(pe) === 1 ? "ui.attentionOne" : "ui.attentionMany", { n: H(pe) })]), U("click", t, () => L(ee, "mobile")), G(e, t);
	};
	q(Ju, (e) => {
		H(pe) > 0 && e(Yu);
	});
	var Xu = B(Ju, 2), Zu = (e) => {
		var t = qs(), n = z(t), r = R(n, !0);
		M(n);
		var i = B(n, 2);
		let a;
		var o = R(i, !0);
		M(i), V((e, t, n) => {
			K(r, e), a = Zr(i, 1, "ghost discard-btn svelte-1n46o8q", null, a, { armed: H(Fu) }), Z(i, "title", t), K(o, n);
		}, [
			() => Q("ui.unpublished"),
			() => H(Fu) ? Q("tip.discardArmed") : Q("tip.discard"),
			() => H(Fu) ? Q("ui.discardConfirm") : Q("ui.discard")
		]), U("click", i, Iu), G(e, t);
	};
	q(Xu, (e) => {
		H(_) && e(Zu);
	}), M(Gu);
	var Qu = B(Gu, 2), $u = R(Qu), ed = (e) => {
		var t = Zs(), n = z(t), r = R(n), i = (e) => {
			var t = Js(), n = z(t);
			J(n, () => c.eye);
			var r = B(n);
			V((e) => K(r, ` ${e ?? ""}`), [() => Q("ui.cleanView")]), G(e, t);
		}, a = (e) => {
			var t = Js(), n = z(t);
			J(n, () => c.pencil);
			var r = B(n);
			V((e) => K(r, ` ${e ?? ""}`), [() => Q("ui.edit")]), G(e, t);
		};
		q(r, (e) => {
			H(D) ? e(i) : e(a, -1);
		}), M(n);
		var o = B(n, 2), s = (e) => {
			var t = Ys(), n = R(t), r = (e) => {
				var t = Ar();
				J(z(t), () => c.warn), G(e, t);
			};
			q(n, (e) => {
				H(T).allowed || e(r);
			});
			var i = B(n, 1, !0);
			M(t), V((e) => {
				Z(t, "title", e), K(i, H(T).login);
			}, [() => H(T).allowed ? Q("tip.hasPublishAccess") : Q("tip.noPublishAccess")]), G(e, t);
		}, l = (e) => {
			var t = Xs(), n = R(t, !0);
			M(t), V((e) => K(n, e), [() => Q("ui.loginGitHub")]), G(e, t);
		};
		q(o, (e) => {
			H(T)?.loggedIn ? e(s) : H(T) && e(l, 1);
		});
		var u = B(o, 2), d = R(u, !0);
		M(u);
		var f = B(u, 2), p = R(f, !0);
		M(f), V((e, t, r, i) => {
			Z(n, "title", e), Z(u, "href", t), K(d, r), f.disabled = !H(_), K(p, i);
		}, [
			() => H(D) ? Q("tip.chromeHide") : Q("tip.chromeShow"),
			() => be()?.path ?? "/",
			() => Q("ui.viewSite"),
			() => Q("ui.publish")
		]), U("click", n, Ql), U("click", f, Ru), G(e, t);
	};
	q($u, (e) => {
		H(h) && e(ed);
	}), M(Qu), M(Uu);
	var td = B(Uu, 2), nd = (e) => {
		var t = gl(), i = R(t), o = (e) => {
			var t = hl(), i = z(t), o = R(i);
			Br(o, 17, () => Xe, Ir, (e, t, n) => {
				var r = ec(), i = z(r), a = (e) => {
					G(e, Qs());
				};
				q(i, (e) => {
					n > 0 && e(a);
				}), Br(B(i, 2), 16, () => H(t), (e) => e, (e, t) => {
					var n = $s();
					let r;
					var i = R(n, !0);
					M(n), V(() => {
						r = Zr(n, 1, "svelte-1n46o8q", null, r, { active: H(Ye) === t }), K(i, Ze[t]);
					}), U("click", n, () => ct(t)), G(e, n);
				}), G(e, r);
			});
			var s = B(o, 2), f = R(s);
			let p;
			J(f, () => c.gear, !0), M(f);
			var h = B(f, 2), _ = (e) => {
				var t = tc(), n = R(t), r = R(n, !0);
				M(n);
				var i = B(n, 2), a = R(i);
				$(B(a), {
					get value() {
						return H(u);
					},
					get options() {
						return l;
					},
					onchange: (e) => L(u, e, !0)
				}), M(i);
				var o = B(i, 2), s = R(o), c = B(s);
				{
					let e = /* @__PURE__ */ F(() => [["auto", Q("lang.auto")], ...nt()]);
					$(c, {
						get value() {
							return it;
						},
						get options() {
							return H(e);
						},
						onchange: st
					});
				}
				M(o), M(t), V((e, t, n, c, l) => {
					K(r, e), Z(i, "title", t), K(a, `${n ?? ""} `), Z(o, "title", c), K(s, `${l ?? ""} `);
				}, [
					() => Q("settings.title"),
					() => Q("topbar.adminTheme.title"),
					() => Q("settings.theme"),
					() => Q("topbar.language.title"),
					() => Q("settings.language")
				]), G(e, t);
			};
			q(h, (e) => {
				H(kr) && e(_);
			}), M(s), fi(s, (e) => L(jr, e), () => H(jr)), M(i);
			var v = B(i, 2), y = (e) => {
				var t = ml(), i = R(t), o = R(i, !0);
				M(i);
				var s = B(i, 2), l = (e) => {
					var t = ac(), n = R(t);
					Br(n, 17, () => H(A).pages, (e) => e.id, (e, t) => {
						var n = ic();
						let r;
						var i = R(n);
						Y(i);
						var a = B(i, 2), o = (e) => {
							var t = nc();
							V((e) => Z(t, "title", e), [() => Q("tip.pages.homeLocked")]), G(e, t);
						}, s = (e) => {
							var n = rc();
							Y(n), V((e, t) => {
								X(n, e), Z(n, "title", t);
							}, [() => H(t).path.slice(1), () => Q("tip.pages.slug")]), U("change", n, (e) => Ur(H(t), e.target.value)), G(e, n);
						};
						q(a, (e) => {
							H(t).path === "/" ? e(o) : e(s, -1);
						});
						var l = B(a, 2), u = R(l);
						J(u, () => c.right, !0), M(u);
						var d = B(u, 2), f = (e) => {
							var n = Go();
							J(n, () => c.cross, !0), M(n), V((e) => Z(n, "title", e), [() => Q("tip.pages.delete")]), U("click", n, () => Wr(H(t))), G(e, n);
						};
						q(d, (e) => {
							H(t).path !== "/" && e(f);
						}), M(l), M(n), V((e, a) => {
							r = Zr(n, 1, "page-row svelte-1n46o8q", null, r, { current: H(t).id === H(g) }), X(i, H(t).title), Z(i, "title", e), Z(u, "title", a), u.disabled = H(t).id === H(g);
						}, [() => Q("tip.pages.title"), () => Q("tip.pages.open")]), U("change", i, (e) => Vr(H(t), e.target.value)), U("click", u, () => Er(H(t).id)), G(e, n);
					});
					var r = B(n, 4);
					Y(r);
					var i = B(r, 2), a = R(i, !0);
					M(i), M(t), V((e, t, n, o) => {
						Z(r, "placeholder", e), Z(i, "title", t), i.disabled = n, K(a, o);
					}, [
						() => Q("ph.newPageName"),
						() => Q("hint.pages.autoMenu"),
						() => !H(Fr).trim(),
						() => Q("ui.createPage")
					]), U("keydown", r, (e) => e.key === "Enter" && zr()), ci(r, () => H(Fr), (e) => L(Fr, e)), U("click", i, zr), G(e, t);
				}, u = (e) => {
					var t = fc(), r = R(t), i = R(r), a = R(i, !0);
					M(i);
					var o = B(i, 2), s = R(o), l = R(s), u = B(l);
					{
						let e = /* @__PURE__ */ F(() => H(A).nav.logo?.type ?? "text"), t = /* @__PURE__ */ F(() => [
							["text", Q("blocks.text")],
							["image", Q("blocks.image")],
							["both", Q("opt.logo.both")]
						]);
						$(u, {
							get value() {
								return H(e);
							},
							get options() {
								return H(t);
							},
							onchange: (e) => Kr(e)
						});
					}
					M(s);
					var d = B(s, 2), f = (e) => {
						var t = oc(), n = z(t);
						Y(n);
						var r = B(n, 2), i = R(r);
						{
							let e = /* @__PURE__ */ F(() => Q("tip.nav.logoFont")), t = /* @__PURE__ */ F(() => H(A).nav.logo?.font ?? ""), n = /* @__PURE__ */ F(() => [["", Q("common.inherit")], ...Ho.map(([e, t]) => [t, Q(e)])]);
							$(i, {
								get title() {
									return H(e);
								},
								get value() {
									return H(t);
								},
								get options() {
									return H(n);
								},
								onchange: (e) => Gr({ font: e || void 0 })
							});
						}
						var a = B(i, 2);
						Y(a);
						var o = B(a, 2);
						let s;
						var c = R(o), l = R(c, !0);
						M(c), M(o);
						var u = B(o, 2);
						let d;
						var f = R(u), p = R(f, !0);
						M(f), M(u), M(r), V((e, t, r, i, c, f, m) => {
							X(n, H(A).nav.logo?.value ?? ""), Z(n, "placeholder", e), Z(a, "title", t), X(a, H(A).nav.logo?.textSize ?? ""), s = Zr(o, 1, "tbtn svelte-1n46o8q", null, s, { active: H(A).nav.logo?.bold !== !1 }), Z(o, "title", r), K(l, i), d = Zr(u, 1, "tbtn svelte-1n46o8q", null, d, c), Z(u, "title", f), K(p, m);
						}, [
							() => Q("ph.nav.logoName"),
							() => Q("tip.nav.textSize"),
							() => Q("format.bold"),
							() => Q("format.boldLetter"),
							() => ({ active: !!H(A).nav.logo?.italic }),
							() => Q("format.italic"),
							() => Q("format.italicLetter")
						]), U("input", n, (e) => Gr({ value: e.target.value })), U("change", a, (e) => Gr({ textSize: e.target.value ? Number(e.target.value) : void 0 })), U("click", o, () => Gr({ bold: H(A).nav.logo?.bold === !1 })), U("click", u, () => Gr({ italic: !H(A).nav.logo?.italic })), G(e, t);
					};
					q(d, (e) => {
						(H(A).nav.logo?.type ?? "text") !== "image" && e(f);
					});
					var p = B(d, 2), m = (e) => {
						var t = sc(), n = R(t), r = R(n), i = B(r);
						M(n);
						var a = B(n, 2);
						Y(a);
						var o = B(a, 2);
						Y(o), M(t), V((e, t, i, s) => {
							Z(n, "title", e), K(r, `${t ?? ""} `), Z(a, "title", i), X(a, H(A).nav.logo?.size ?? 32), Z(o, "title", s), X(o, H(A).nav.logo?.radius ?? 0);
						}, [
							() => Q("tip.webpAuto"),
							() => (H(A).nav.logo?.type === "image" ? H(A).nav.logo?.value : H(A).nav.logo?.image) ? Q("ui.changeImage") : Q("ui.chooseImage"),
							() => Q("tip.nav.logoHeight"),
							() => Q("tip.nav.logoRadius")
						]), U("change", i, qr), U("change", a, (e) => Gr({ size: Number(e.target.value) })), U("change", o, (e) => Gr({ radius: Number(e.target.value) })), G(e, t);
					};
					q(p, (e) => {
						(H(A).nav.logo?.type ?? "text") !== "text" && e(m);
					});
					var h = B(p, 2), g = (e) => {
						var t = ss(), n = R(t), r = B(n);
						{
							let e = /* @__PURE__ */ F(() => H(A).nav.logo?.order ?? "image-first"), t = /* @__PURE__ */ F(() => [["image-first", Q("opt.logo.imageFirst")], ["text-first", Q("opt.logo.textFirst")]]);
							$(r, {
								get value() {
									return H(e);
								},
								get options() {
									return H(t);
								},
								onchange: (e) => Gr({ order: e })
							});
						}
						M(t), V((e) => K(n, `${e ?? ""} `), [() => Q("lbl.order")]), G(e, t);
					};
					q(h, (e) => {
						H(A).nav.logo?.type === "both" && e(g);
					}), M(o), M(r);
					var _ = B(r, 2), v = R(_), y = R(v, !0);
					M(v);
					var b = B(v, 2), x = R(b), S = R(x), C = B(S);
					{
						let e = /* @__PURE__ */ F(() => H(A).nav.variant ?? "bar"), t = /* @__PURE__ */ F(() => [
							["bar", Q("opt.navVariant.bar")],
							["floating", Q("opt.navVariant.floating")],
							["floating-square", Q("opt.navVariant.floatingSquare")],
							["floating-tab", Q("opt.navVariant.floatingTab")],
							["side-left", Q("opt.navVariant.sideLeft")],
							["side-right", Q("opt.navVariant.sideRight")]
						]);
						$(C, {
							get value() {
								return H(e);
							},
							get options() {
								return H(t);
							},
							onchange: (e) => hi(e)
						});
					}
					M(x);
					var w = B(x, 2), T = (e) => {
						var t = cc(), n = z(t), r = R(n);
						Y(r);
						var i = B(r);
						M(n);
						var a = B(n, 2), o = R(a);
						Y(o);
						var s = B(o);
						M(a), V((e, t, c, l) => {
							Z(n, "title", e), ii(r, H(A).nav.style?.glow === !0), K(i, ` ${t ?? ""}`), Z(a, "title", c), ii(o, H(A).nav.style?.topGap !== !1), K(s, ` ${l ?? ""}`);
						}, [
							() => Q("tip.nav.glow"),
							() => Q("lbl.navGlow"),
							() => Q("tip.nav.topGap"),
							() => Q("lbl.navTopGap")
						]), U("change", r, (e) => gi(e.target.checked)), U("change", o, (e) => _i(e.target.checked)), G(e, t);
					};
					q(w, (e) => {
						H(di) && e(T);
					});
					var E = B(w, 2), D = (e) => {
						var t = hs(), n = R(t);
						Y(n);
						var r = B(n);
						M(t), V((e, i) => {
							Z(t, "title", e), ii(n, H(A).nav.overlay === !0), K(r, ` ${i ?? ""}`);
						}, [() => Q("tip.nav.overlay"), () => Q("lbl.navOverlay")]), U("change", n, (e) => Pr("nav", () => {
							e.target.checked ? H(A).nav.overlay = !0 : delete H(A).nav.overlay;
						})), G(e, t);
					};
					q(E, (e) => {
						!H(di) && !H(ui) && e(D);
					});
					var ee = B(E, 2), te = (e) => {
						var t = ss(), n = R(t), r = B(n);
						{
							let e = /* @__PURE__ */ F(() => H(A).nav.style?.sideAlign ?? "left"), t = /* @__PURE__ */ F(() => [
								["left", Q("common.left")],
								["center", Q("common.center")],
								["right", Q("common.right")]
							]);
							$(r, {
								get value() {
									return H(e);
								},
								get options() {
									return H(t);
								},
								onchange: (e) => li("sideAlign", e === "left" ? void 0 : e)
							});
						}
						M(t), V((e, r) => {
							Z(t, "title", e), K(n, `${r ?? ""} `);
						}, [() => Q("tip.nav.sideAlign"), () => Q("lbl.textAlign")]), G(e, t);
					};
					q(ee, (e) => {
						H(ui) && e(te);
					});
					var ne = B(ee, 2), re = R(ne);
					Y(re);
					var ie = B(re);
					M(ne);
					var ae = B(ne, 2), oe = R(ae), se = B(oe);
					{
						let e = /* @__PURE__ */ F(() => H(A).nav.style?.size ?? "md"), t = /* @__PURE__ */ F(() => [
							["sm", Q("opt.size.sm")],
							["md", Q("opt.size.md")],
							["lg", Q("opt.size.lg")],
							["xl", Q("opt.size.xl")]
						]);
						$(se, {
							get value() {
								return H(e);
							},
							get options() {
								return H(t);
							},
							onchange: (e) => li("size", e === "md" ? void 0 : e)
						});
					}
					M(ae);
					var ce = B(ae, 2), le = R(ce), ue = B(le), de = (e) => {
						{
							let t = /* @__PURE__ */ F(() => H(A).nav.style?.sidePlacement ?? "top"), n = /* @__PURE__ */ F(() => [
								["top", Q("opt.place.top")],
								["middle", Q("opt.place.middle")],
								["bottom", Q("opt.place.bottom")]
							]);
							$(e, {
								get value() {
									return H(t);
								},
								get options() {
									return H(n);
								},
								onchange: (e) => li("sidePlacement", e === "top" ? void 0 : e)
							});
						}
					}, fe = (e) => {
						{
							let t = /* @__PURE__ */ F(() => H(A).nav.layout ?? "right"), n = /* @__PURE__ */ F(() => [
								["right", Q("common.right")],
								["center", Q("common.center")],
								["left", Q("opt.layout.leftAfterLogo")]
							]);
							$(e, {
								get value() {
									return H(t);
								},
								get options() {
									return H(n);
								},
								onchange: (e) => si(e)
							});
						}
					};
					q(ue, (e) => {
						H(ui) ? e(de) : e(fe, -1);
					}), M(ce);
					var pe = B(ce, 2), me = (e) => {
						var t = lc(), n = z(t), r = R(n);
						Y(r);
						var i = B(r);
						M(n);
						var a = B(n, 2), o = (e) => {
							var t = ss(), n = R(t), r = B(n);
							{
								let e = /* @__PURE__ */ F(() => H(A).nav.scroll ?? "none"), t = /* @__PURE__ */ F(() => [
									["none", Q("opt.scroll.none")],
									["shrink", Q("opt.scroll.shrink")],
									["hide", Q("opt.scroll.hide")]
								]);
								$(r, {
									get value() {
										return H(e);
									},
									get options() {
										return H(t);
									},
									onchange: (e) => Pr("nav", () => {
										e === "none" ? delete H(A).nav.scroll : H(A).nav.scroll = e;
									})
								});
							}
							M(t), V((e, r) => {
								Z(t, "title", e), K(n, `${r ?? ""} `);
							}, [() => Q("tip.nav.scroll"), () => Q("lbl.navScroll")]), G(e, t);
						};
						q(a, (e) => {
							H(A).nav.sticky !== !1 && e(o);
						}), V((e, t) => {
							Z(n, "title", e), ii(r, H(A).nav.sticky !== !1), K(i, ` ${t ?? ""}`);
						}, [() => Q("tip.nav.sticky"), () => Q("lbl.navSticky")]), U("change", r, (e) => Pr("nav", () => {
							H(A).nav.sticky = e.target.checked;
						})), G(e, t);
					};
					q(pe, (e) => {
						H(ui) || e(me);
					});
					var he = B(pe, 2), O = R(he), ge = B(O);
					{
						let e = /* @__PURE__ */ F(() => H(A).nav.style?.hover ?? "standard"), t = /* @__PURE__ */ F(() => [
							["standard", Q("opt.hover.standard")],
							["underline", Q("opt.hover.underline")],
							["pill", Q("opt.hover.pill")],
							["lift-plain", Q("opt.hover.liftPlain")],
							["lift", Q("opt.hover.lift")]
						]);
						$(ge, {
							get value() {
								return H(e);
							},
							get options() {
								return H(t);
							},
							onchange: (e) => vi(e)
						});
					}
					M(he);
					var k = B(he, 2), _e = (e) => {
						var t = uc(), n = z(t), r = R(n), i = B(r), a = R(i);
						M(i), M(n);
						var o = B(n, 2);
						Y(o), V((e, t, i) => {
							Z(n, "title", e), K(r, `${t ?? ""} `), K(a, `${i ?? ""}%`), X(o, H(A).nav.style?.hoverGlow ?? .6);
						}, [
							() => Q("tip.nav.hoverGlow"),
							() => Q("lbl.glowStrength"),
							() => Math.round((H(A).nav.style?.hoverGlow ?? .6) * 100)
						]), U("input", o, (e) => li("hoverGlow", Number(e.target.value))), G(e, t);
					};
					q(k, (e) => {
						H(A).nav.style?.hover === "lift" && e(_e);
					});
					var ve = B(k, 2), ye = (e) => {
						var t = ss(), n = R(t), r = B(n);
						{
							let e = /* @__PURE__ */ F(() => H(A).nav.style?.hoverColor ?? "accent"), t = /* @__PURE__ */ F(Mn);
							Hi(r, {
								get value() {
									return H(e);
								},
								get tokens() {
									return H(t);
								},
								get label() {
									return H(mi)[1];
								},
								onchange: (e) => li("hoverColor", e)
							});
						}
						M(t), V(() => {
							Z(t, "title", H(mi)[1]), K(n, `${H(mi)[0] ?? ""} `);
						}), G(e, t);
					};
					q(ve, (e) => {
						H(mi) && e(ye);
					});
					var be = B(ve, 2), j = R(be), xe = B(j);
					{
						let e = /* @__PURE__ */ F(() => H(A).nav.style?.hoverTextColor ?? "accent"), t = /* @__PURE__ */ F(Mn), n = /* @__PURE__ */ F(() => Q("tip.nav.hoverTextColorPick"));
						Hi(xe, {
							get value() {
								return H(e);
							},
							get tokens() {
								return H(t);
							},
							get label() {
								return H(n);
							},
							onchange: (e) => li("hoverTextColor", e)
						});
					}
					M(be);
					var Se = B(be, 2), Ce = R(Se), we = B(Ce);
					{
						let e = /* @__PURE__ */ F(() => H(A).nav.style?.textColor ?? "text"), t = /* @__PURE__ */ F(Mn), n = /* @__PURE__ */ F(() => Q("tip.nav.textColorPick"));
						Hi(we, {
							get value() {
								return H(e);
							},
							get tokens() {
								return H(t);
							},
							get label() {
								return H(n);
							},
							onchange: (e) => li("textColor", e)
						});
					}
					M(Se);
					var Te = B(Se, 4), Ee = R(Te, !0);
					M(Te);
					var De = B(Te, 2);
					n(De, () => An, () => H(A).nav?.style?.background?.layers ?? []), M(b), M(_);
					var Oe = B(_, 2), ke = R(Oe), Ae = R(ke, !0);
					M(ke);
					var je = B(ke, 2), Me = R(je), Ne = R(Me), Pe = B(Ne);
					{
						let e = /* @__PURE__ */ F(() => H(A).nav.style?.subStyle ?? "card"), t = /* @__PURE__ */ F(() => H(ui) ? [
							["card", Q("common.standard")],
							["pills", Q("opt.sub.pills")],
							["lines", Q("opt.sub.lines")]
						] : [
							["card", Q("opt.sub.card")],
							["flat", Q("opt.sub.flat")],
							["pills", Q("opt.sub.pills")],
							["lines", Q("opt.sub.lines")],
							["flyout", Q("opt.sub.flyout")]
						]);
						$(Pe, {
							get value() {
								return H(e);
							},
							get options() {
								return H(t);
							},
							onchange: (e) => li("subStyle", e === "card" ? void 0 : e)
						});
					}
					M(Me);
					var Fe = B(Me, 2), Ie = (e) => {
						var t = ss(), n = R(t), r = B(n);
						{
							let e = /* @__PURE__ */ F(() => H(A).nav.style?.subPillColor ?? "surface"), t = /* @__PURE__ */ F(Mn), n = /* @__PURE__ */ F(() => Q("tip.nav.subPillColorPick"));
							Hi(r, {
								get value() {
									return H(e);
								},
								get tokens() {
									return H(t);
								},
								get label() {
									return H(n);
								},
								onchange: (e) => li("subPillColor", e)
							});
						}
						M(t), V((e, r) => {
							Z(t, "title", e), K(n, `${r ?? ""} `);
						}, [() => Q("tip.nav.subPillColor"), () => Q("lbl.subPillColor")]), G(e, t);
					};
					q(Fe, (e) => {
						H(A).nav.style?.subStyle === "pills" && e(Ie);
					});
					var Le = B(Fe, 2), Re = R(Le), ze = B(Re);
					Y(ze), M(Le), M(je), M(Oe);
					var Be = B(Oe, 2), Ve = R(Be), He = R(Ve, !0);
					M(Ve);
					var Ue = B(Ve, 2), We = R(Ue);
					Br(We, 17, () => H(A).nav.items, Ir, (e, t, n) => {
						var r = dc(), i = z(r), a = R(i);
						Y(a);
						var o = B(a, 2), s = R(o);
						J(s, () => c.plus, !0), M(s);
						var l = B(s, 2);
						l.disabled = n === 0, J(l, () => c.up, !0), M(l);
						var u = B(l, 2);
						J(u, () => c.down, !0), M(u);
						var d = B(u, 2);
						J(d, () => c.cross, !0), M(d), M(o);
						var f = B(o, 2), p = R(f);
						{
							let e = /* @__PURE__ */ F(() => H(t).page ?? (H(t).href == null ? "__none" : "__href")), r = /* @__PURE__ */ F(() => Q("tip.linkTarget")), i = /* @__PURE__ */ F(() => [
								...H(A).pages.map((e) => [e.id, e.title]),
								["__href", Q("opt.linkHref")],
								...H(t).children ? [["__none", Q("opt.noLink")]] : []
							]);
							$(p, {
								get value() {
									return H(e);
								},
								get title() {
									return H(r);
								},
								get options() {
									return H(i);
								},
								onchange: (e) => wl(n, e)
							});
						}
						M(f);
						var m = B(f, 2), h = (e) => {
							var r = as();
							Y(r), V((e, n) => {
								X(r, H(t).href), Z(r, "placeholder", e), Z(r, "title", n);
							}, [() => Q("ph.hrefAnchor"), () => Q("tip.hrefAnchor")]), U("change", r, (e) => Tl(n, e.target.value)), G(e, r);
						};
						q(m, (e) => {
							!H(t).page && H(t).href != null && e(h);
						}), M(i), Br(B(i, 2), 17, () => H(t).children ?? [], Ir, (e, r, i) => {
							var a = os(), o = R(a);
							Y(o);
							var s = B(o, 2), l = R(s);
							l.disabled = i === 0, J(l, () => c.up, !0), M(l);
							var u = B(l, 2);
							J(u, () => c.down, !0), M(u);
							var d = B(u, 2);
							J(d, () => c.cross, !0), M(d), M(s);
							var f = B(s, 2), p = R(f);
							{
								let e = /* @__PURE__ */ F(() => H(r).page ?? "__href"), t = /* @__PURE__ */ F(() => Q("tip.linkTarget")), a = /* @__PURE__ */ F(() => [...H(A).pages.map((e) => [e.id, e.title]), ["__href", Q("opt.linkHref")]]);
								$(p, {
									get value() {
										return H(e);
									},
									get title() {
										return H(t);
									},
									get options() {
										return H(a);
									},
									onchange: (e) => jl(n, i, e)
								});
							}
							M(f);
							var m = B(f, 2), h = (e) => {
								var t = as();
								Y(t), V((e, n) => {
									X(t, H(r).href ?? ""), Z(t, "placeholder", e), Z(t, "title", n);
								}, [() => Q("ph.hrefAnchor"), () => Q("tip.hrefAnchor")]), U("change", t, (e) => Ml(n, i, e.target.value)), G(e, t);
							};
							q(m, (e) => {
								H(r).page || e(h);
							}), M(a), V((e, n) => {
								X(o, H(r).label), Z(o, "title", e), u.disabled = i === H(t).children.length - 1, Z(d, "title", n);
							}, [() => Q("tip.nav.childLabel"), () => Q("tip.nav.removeChild")]), U("input", o, (e) => Al(n, i, e.target.value)), U("click", l, () => Nl(n, i, -1)), U("click", u, () => Nl(n, i, 1)), U("click", d, () => Pl(n, i)), G(e, a);
						}), V((e, r, i) => {
							X(a, H(t).label), Z(a, "title", e), Z(s, "title", r), u.disabled = n === H(A).nav.items.length - 1, Z(d, "title", i);
						}, [
							() => Q("tip.nav.itemLabel"),
							() => Q("tip.nav.addChild"),
							() => Q("tip.nav.removeItem")
						]), U("input", a, (e) => Bo(n, e.target.value)), U("click", s, () => kl(n)), U("click", l, () => El(n, -1)), U("click", u, () => El(n, 1)), U("click", d, () => Dl(n)), G(e, r);
					});
					var Ge = B(We, 2), Ke = R(Ge, !0);
					M(Ge), M(Ue), M(Be), M(t), V((e, t, n, r, o, s, c, u, d, f, p, m, h, g, _, v, b, C, w, T, E, D) => {
						Z(i, "title", e), K(a, t), K(l, `${n ?? ""} `), K(y, r), Z(x, "title", o), K(S, `${s ?? ""} `), Z(ne, "title", c), ii(re, H(A).nav.style?.blur !== !1), K(ie, ` ${u ?? ""}`), K(oe, `${d ?? ""} `), K(le, `${f ?? ""} `), K(O, `${p ?? ""} `), Z(be, "title", m), K(j, `${h ?? ""} `), K(Ce, `${g ?? ""} `), K(Ee, _), K(Ae, v), K(Ne, `${b ?? ""} `), Z(Le, "title", C), K(Re, `${w ?? ""} `), X(ze, H(A).nav.style?.subColumns ?? 1), Z(Ve, "title", T), K(He, E), K(Ke, D);
					}, [
						() => Q("hint.nav.logoHome"),
						() => Q("group.logo"),
						() => Q("common.type"),
						() => Q("group.appearance"),
						() => Q("tip.nav.variant"),
						() => Q("lbl.navVariant"),
						() => Q("tip.nav.blur"),
						() => Q("lbl.navBlur"),
						() => Q("lbl.size"),
						() => Q("lbl.navPlacement"),
						() => Q("lbl.navHover"),
						() => Q("tip.nav.hoverTextColor"),
						() => Q("lbl.hoverTextColor"),
						() => Q("lbl.textColor"),
						() => Q("lbl.background"),
						() => Q("group.submenu"),
						() => Q("lbl.design"),
						() => Q("tip.nav.subColumns"),
						() => Q("lbl.columns"),
						() => Q("hint.nav.submenu"),
						() => Q("group.menuItems"),
						() => Q("ui.addMenuItem")
					]), U("change", re, (e) => li("blur", e.target.checked)), U("change", ze, (e) => li("subColumns", Number(e.target.value) > 1 ? Number(e.target.value) : void 0)), U("click", Ge, Ol), G(e, t);
				}, f = (e) => {
					var t = hc(), n = R(t), r = R(n), i = B(r);
					Y(i), M(n);
					var a = B(n, 2), o = R(a), s = B(o);
					Y(s), M(a);
					var l = B(a, 2), u = R(l), d = B(u);
					{
						let e = /* @__PURE__ */ F(ni), t = /* @__PURE__ */ F(ri);
						$(d, {
							get value() {
								return H(e);
							},
							get options() {
								return H(t);
							},
							onchange: (e) => ai(e)
						});
					}
					M(l);
					var f = B(l, 4), p = R(f), m = B(p), h = (e) => {
						var t = pc();
						V((e) => {
							Z(t, "src", H(A).site.icon), Z(t, "alt", e);
						}, [() => Q("lbl.siteIcon")]), G(e, t);
					};
					q(m, (e) => {
						H(A).site.icon && e(h);
					}), M(f);
					var g = B(f, 2), _ = R(g), v = R(_), y = B(v);
					M(_);
					var b = B(_, 2), x = (e) => {
						var t = mc(), n = z(t);
						J(n, () => c.pencil ?? "✎", !0), M(n);
						var r = B(n, 2);
						J(r, () => c.cross, !0), M(r), V((e, t) => {
							Z(n, "title", e), Z(r, "title", t);
						}, [() => Q("tip.site.editIcon"), () => Q("tip.site.removeIcon")]), U("click", n, () => L(Jr, H(A).site.icon, !0)), U("click", r, Qr), G(e, t);
					};
					q(b, (e) => {
						H(A).site.icon && e(x);
					}), M(g), M(t), V((e, t, c, d, f, m, h, g, y, b, x) => {
						Z(n, "title", e), K(r, `${t ?? ""} `), X(i, H(A).site.title ?? ""), Z(i, "placeholder", c), Z(a, "title", d), K(o, `${f ?? ""} `), X(s, H(A).site.description ?? ""), Z(s, "placeholder", m), Z(l, "title", h), K(u, `${g ?? ""} `), K(p, `${y ?? ""} `), Z(_, "title", b), K(v, `${x ?? ""} `);
					}, [
						() => Q("tip.site.name"),
						() => Q("lbl.name"),
						() => Q("ph.site.name"),
						() => Q("tip.site.description"),
						() => Q("lbl.description"),
						() => Q("ph.site.description"),
						() => Q("site.langTitle"),
						() => Q("site.langLabel"),
						() => Q("lbl.siteIcon"),
						() => Q("tip.site.icon"),
						() => H(A).site.icon ? Q("ui.changeIcon") : Q("ui.chooseIcon")
					]), U("input", i, (e) => ei(e.target.value)), U("input", s, (e) => ti(e.target.value)), U("change", y, Yr), G(e, t);
				}, p = (e) => {
					var t = Cc();
					{
						let e = (e, t = d, n = d) => {
							var r = _c(), i = R(r), a = (e) => {
								var t = gc(), r = R(t, !0);
								M(t), V(() => K(r, n())), G(e, t);
							};
							q(i, (e) => {
								n() && e(a);
							});
							var o = B(i, 2), s = R(o), c = R(s, !0);
							M(s);
							var l = B(s, 2), u = R(l, !0);
							M(l);
							var f = B(l, 2), p = R(f), m = R(p, !0);
							M(p);
							var h = B(p), g = R(h, !0);
							M(h), M(f), M(o), M(r), V((e, t, n, r, i, a, s, l, d) => {
								$r(o, `--tv-bg:${e ?? ""};--tv-surface:${t ?? ""};--tv-text:${n ?? ""};--tv-accent:${r ?? ""};--tv-accent-ink:${i ?? ""}`), K(c, a), K(u, s), K(m, l), K(g, d);
							}, [
								() => ql(t().bg, t()),
								() => ql(t().surface, t()),
								() => ql(t().text, t()),
								() => ql(t().accent, t()),
								() => ql(t()["accent-text"] ?? t().bg, t()),
								() => Q("preview.heading"),
								() => Q("preview.cardBody"),
								() => Q("preview.button"),
								() => Q("preview.link")
							]), G(e, r);
						};
						var n = R(t), r = R(n, !0);
						M(n);
						var i = B(n, 2);
						Br(i, 21, () => Yl, (e) => e.id, (e, t) => {
							var n = vc();
							let r;
							var i = R(n), a = R(i), o = B(a), s = B(o), c = B(s);
							M(i);
							var l = B(i, 2), u = R(l, !0);
							M(l), M(n), V(() => {
								r = Zr(n, 1, "theme-preset svelte-1n46o8q", null, r, { sel: H(Zl) === H(t).id }), Z(n, "title", `${H(t).name} - ${H(t).note}`), $r(a, `background:${H(t).light.bg ?? ""}`), $r(o, `background:${H(t).light.surface ?? ""}`), $r(s, `background:${H(t).light.accent ?? ""}`), $r(c, `background:${H(t).light.text ?? ""}`), K(u, H(t).name);
							}), U("click", n, () => Xl(H(t))), G(e, n);
						}), M(i);
						var a = B(i, 2), o = R(a, !0);
						M(a);
						var s = B(a, 2), c = R(s);
						Y(c);
						var l = B(c);
						M(s);
						var u = B(s, 2), f = (e) => {
							var t = yc(), n = R(t), r = R(n, !0);
							M(n);
							var i = B(n, 2), a = R(i);
							let o;
							var s = R(a, !0);
							M(a);
							var c = B(a, 2);
							let l;
							var u = R(c, !0);
							M(c), M(i), M(t), V((e, t, n, i) => {
								K(r, e), Z(a, "title", t), o = Zr(a, 1, "svelte-1n46o8q", null, o, { on: H(Fn) }), K(s, n), l = Zr(c, 1, "svelte-1n46o8q", null, l, { on: !H(Fn) }), K(u, i);
							}, [
								() => Q("lbl.darkColors"),
								() => Q("hint.theme.autoDark"),
								() => Q("opt.auto"),
								() => Q("opt.custom")
							]), U("click", a, () => Ul(!0)), U("click", c, () => Ul(!1)), G(e, t);
						};
						q(u, (e) => {
							H(Pn) && e(f);
						});
						var p = B(u, 2), h = R(p), g = (e) => {
							var t = bc(), n = R(t, !0);
							M(t), V((e) => K(n, e), [() => Q("lbl.light")]), G(e, t);
						};
						q(h, (e) => {
							H(Pn) && e(g);
						});
						var _ = B(h, 2);
						let ke;
						var v = R(_, !0);
						M(_), M(p);
						var y = B(p, 2);
						Br(y, 21, () => Nn, ([e, t, n]) => e, (e, t) => {
							var n = /* @__PURE__ */ F(() => m(H(t), 3));
							let r = () => H(n)[0], i = () => H(n)[1], a = () => H(n)[2];
							var o = xc(), s = R(o);
							{
								let e = /* @__PURE__ */ F(() => H(A).theme.tokens.color[r()] ?? H(A).theme.tokens.color.bg), t = /* @__PURE__ */ F(Mn);
								Hi(s, {
									get value() {
										return H(e);
									},
									get tokens() {
										return H(t);
									},
									get label() {
										return i();
									},
									onchange: (e) => Fl(r(), e)
								});
							}
							var c = B(s, 2), l = R(c, !0);
							M(c);
							var u = B(c, 2), d = R(u, !0);
							M(u), M(o), V((e) => {
								K(l, a()), K(d, e);
							}, [() => ql(H(A).theme.tokens.color[r()] ?? H(A).theme.tokens.color.bg, H(Ln))]), G(e, o);
						}), M(y);
						var b = B(y, 2), x = (e) => {
							var t = Sc(), n = z(t), r = R(n), i = R(r, !0);
							M(r);
							var a = B(r, 2);
							let o;
							var s = R(a, !0);
							M(a), M(n);
							var c = B(n, 2);
							let l;
							Br(c, 21, () => Nn, ([e, t, n]) => e, (e, t) => {
								var n = /* @__PURE__ */ F(() => m(H(t), 3));
								let r = () => H(n)[0], i = () => H(n)[1], a = () => H(n)[2];
								var o = xc(), s = R(o);
								{
									let e = /* @__PURE__ */ F(() => H(A).theme.alt.tokens.color[r()] ?? H(Rn)[r()] ?? H(A).theme.tokens.color.bg), t = /* @__PURE__ */ F(Mn), n = /* @__PURE__ */ F(() => Q("theme.darkColorLabel", { name: i() }));
									Hi(s, {
										get value() {
											return H(e);
										},
										get tokens() {
											return H(t);
										},
										get label() {
											return H(n);
										},
										onchange: (e) => Bl(r(), e)
									});
								}
								var c = B(s, 2), l = R(c, !0);
								M(c);
								var u = B(c, 2), d = R(u, !0);
								M(u), M(o), V((e) => {
									K(l, a()), K(d, e);
								}, [() => ql(H(A).theme.alt.tokens.color[r()] ?? H(Rn)[r()], H(Rn))]), G(e, o);
							}), M(c), V((e, t, n) => {
								K(i, e), o = Zr(a, 1, "chip svelte-1n46o8q", null, o, { accent: H(In) === "dark" }), Z(a, "title", t), K(s, n), l = Zr(c, 1, "palcells svelte-1n46o8q", null, l, { autopal: H(Fn) });
							}, [
								() => Q("lbl.dark"),
								() => Q("tip.theme.darkDefault"),
								() => Q("common.standard")
							]), U("click", a, () => Vl("dark")), G(e, t);
						};
						q(b, (e) => {
							H(Pn) && e(x);
						});
						var S = B(b, 2), C = R(S);
						{
							let t = /* @__PURE__ */ F(() => H(Pn) ? Q("lbl.light") : "");
							e(C, () => H(Ln), () => H(t));
						}
						var w = B(C, 2), T = (t) => {
							{
								let n = /* @__PURE__ */ F(() => Q("lbl.dark"));
								e(t, () => H(Rn), () => H(n));
							}
						};
						q(w, (e) => {
							H(Pn) && e(T);
						}), M(S);
						var E = B(S, 2), D = R(E), ee = R(D, !0);
						M(D);
						var te = B(D, 2), ne = R(te), re = R(ne), ie = B(re);
						{
							let e = /* @__PURE__ */ F(() => Wl("heading"));
							$(ie, {
								get value() {
									return H(A).theme.tokens.font.heading;
								},
								get options() {
									return H(e);
								},
								onchange: (e) => Il("heading", e)
							});
						}
						M(ne);
						var ae = B(ne, 2), oe = R(ae), se = B(oe);
						{
							let e = /* @__PURE__ */ F(() => Wl("body"));
							$(se, {
								get value() {
									return H(A).theme.tokens.font.body;
								},
								get options() {
									return H(e);
								},
								onchange: (e) => Il("body", e)
							});
						}
						M(ae);
						var ce = B(ae, 2), le = R(ce), ue = R(le, !0);
						M(le);
						var de = B(le, 2), fe = R(de, !0);
						M(de), M(ce), M(te), M(E);
						var pe = B(E, 2), me = R(pe), he = R(me, !0);
						M(me);
						var O = B(me, 2), ge = R(O), k = R(ge), _e = R(k, !0);
						M(k);
						var ve = B(k, 2), ye = R(ve, !0);
						M(ve), M(ge);
						var be = B(ge, 2), j = R(be, !0), xe = B(j), Se = R(xe, !0);
						M(xe), M(be);
						var Ce = B(be, 2);
						Y(Ce);
						var we = B(Ce, 2), Te = R(we, !0), Ee = B(Te), De = R(Ee, !0);
						M(Ee), M(we);
						var Oe = B(we, 2);
						Y(Oe), M(O), M(pe), M(t), V((e, t, n, i, a, u, d, f, p, m, h, g, y, b, x, S, C, w) => {
							K(r, e), K(o, t), Z(s, "title", n), ii(c, H(Pn)), K(l, ` ${i ?? ""}`), ke = Zr(_, 1, "chip svelte-1n46o8q", null, ke, { accent: H(In) === "light" }), Z(_, "title", a), K(v, u), K(ee, d), K(re, `${f ?? ""} `), K(oe, `${p ?? ""} `), $r(le, `font-family:${H(A).theme.tokens.font.heading ?? ""}`), K(ue, m), $r(de, `font-family:${H(A).theme.tokens.font.body ?? ""}`), K(fe, h), K(he, g), $r(ge, `--r-sm:${H(A).theme.tokens.radius.sm ?? ""};--r-md:${H(A).theme.tokens.radius.md ?? ""}`), K(_e, y), K(ye, b), K(j, x), K(Se, H(A).theme.tokens.radius.sm), X(Ce, S), K(Te, C), K(De, H(A).theme.tokens.radius.md), X(Oe, w);
						}, [
							() => Q("lbl.themePresets"),
							() => Q("lbl.colors"),
							() => Q("tip.theme.dualMode"),
							() => Q("lbl.dualMode"),
							() => Q("tip.theme.defaultScheme"),
							() => Q("common.standard"),
							() => Q("group.typography"),
							() => Q("lbl.headings"),
							() => Q("lbl.bodyText"),
							() => Q("preview.heading"),
							() => Q("preview.bodySample"),
							() => Q("group.shape"),
							() => Q("preview.button"),
							() => Q("preview.card"),
							() => Q("lbl.smallCorners"),
							() => Gl(H(A).theme.tokens.radius.sm),
							() => Q("lbl.largeCorners"),
							() => Gl(H(A).theme.tokens.radius.md)
						]), U("change", c, (e) => Hl(e.target.checked)), U("click", _, () => Vl("light")), U("input", Ce, (e) => Kl("sm", Number(e.target.value))), U("input", Oe, (e) => Kl("md", Number(e.target.value)));
					}
					G(e, t);
				}, h = (e) => {
					var t = Tc();
					let n;
					var r = R(t), i = R(r), a = R(i, !0);
					M(i);
					var o = B(i, 2), s = R(o), c = R(s, !0);
					M(s);
					var l = B(s, 2), u = R(l, !0);
					M(l), M(o), M(r);
					var d = B(r, 2), f = R(d, !0);
					M(d);
					var p = B(d, 2), m = R(p), h = B(m);
					M(p);
					var g = B(p, 2), _ = R(g, !0);
					M(g);
					var v = B(g, 2), y = R(v, !0);
					M(v);
					var b = B(v, 2), x = R(b, !0);
					M(b);
					var S = B(b, 2), C = R(S, !0);
					M(S);
					var w = B(S, 2), T = R(w), E = R(T, !0);
					M(T);
					var D = B(T, 2), te = R(D), ne = R(te, !0);
					M(te);
					var re = B(te, 2), ie = R(re), ae = B(ie);
					M(re), M(D), M(w);
					var oe = B(w, 2), se = R(oe), ce = R(se, !0);
					M(se);
					var le = B(se, 2), ue = R(le), de = R(ue, !0);
					M(ue);
					var fe = B(ue, 2), pe = R(fe, !0);
					M(fe);
					var me = B(fe, 2), he = R(me, !0);
					M(me);
					var O = B(me, 2), ge = R(O, !0);
					M(O);
					var k = B(O, 2), A = R(k, !0);
					M(k), M(le), M(oe);
					var _e = B(oe, 2), ve = (e) => {
						var t = wc(), n = R(t), r = R(n, !0);
						M(n);
						var i = B(n, 2);
						Br(i, 21, () => H(vu), (e) => e.type, (e, t) => {
							var n = Ar(), r = z(n), i = (e) => {
								var n = wc(), r = R(n), i = R(r, !0);
								M(r);
								var a = B(r, 2);
								Br(a, 21, () => H(t).variants, (e) => e.label, (e, n) => {
									var r = ys(), i = R(r, !0);
									M(r), V((e) => {
										Z(r, "title", e), K(i, H(n).label);
									}, [() => Q("tip.blocks.fromPlugin", { plugin: H(t).plugin })]), U("click", r, () => yu(H(t), H(n).props)), G(e, r);
								}), M(a), M(n), V(() => K(i, H(t).label)), G(e, n);
							}, a = (e) => {
								var n = ys(), r = R(n, !0);
								M(n), V((e) => {
									Z(n, "title", e), K(r, H(t).label);
								}, [() => Q("tip.blocks.fromPlugin", { plugin: H(t).plugin })]), U("click", n, () => yu(H(t))), G(e, n);
							};
							q(r, (e) => {
								H(t).variants?.length ? e(i) : e(a, -1);
							}), G(e, n);
						}), M(i), M(t), V((e) => K(r, e), [() => Q("panel.plugins")]), G(e, t);
					};
					q(_e, (e) => {
						H(vu).length && e(ve);
					}), M(t), V((e, r, i, o, s, d, h, w, T, D, ae, oe, se, le, ue, fe, me, O, k, _e, ve, ye, be, j, xe, Se, Ce) => {
						n = Zr(t, 1, "panel-body svelte-1n46o8q", null, n, { locked: H(ee) === "mobile" }), Z(t, "title", e), K(a, r), K(c, i), Z(l, "title", o), K(u, s), K(f, d), Z(p, "title", h), K(m, `${w ?? ""} `), Z(g, "title", T), K(_, D), Z(v, "title", ae), K(y, oe), Z(b, "title", se), K(x, le), Z(S, "title", ue), K(C, fe), K(E, me), Z(te, "title", O), K(ne, k), Z(re, "title", _e), K(ie, `${ve ?? ""} `), K(ce, ye), K(de, be), K(pe, j), K(he, xe), K(ge, Se), K(A, Ce);
					}, [
						() => H(ee) === "mobile" ? Q("tip.blocks.mobileLocked") : void 0,
						() => Q("blocks.text"),
						() => Q("blocks.text"),
						() => Q("tip.blocks.textBox"),
						() => Q("ui.textBox"),
						() => Q("blocks.button"),
						() => Q("tip.webpAuto"),
						() => Q("blocks.image"),
						() => Q("tip.blocks.video"),
						() => Q("blocks.video"),
						() => Q("tip.blocks.icon"),
						() => Q("blocks.icon"),
						() => Q("tip.blocks.samling"),
						() => Q("blocks.samling"),
						() => Q("tip.blocks.faq"),
						() => Q("blocks.faq"),
						() => Q("blocks.galleri"),
						() => Q("tip.blocks.gallery"),
						() => Q("ui.emptyGallery"),
						() => Q("tip.blocks.galleryImages"),
						() => Q("ui.galleryWithImages"),
						() => Q("group.shapes"),
						() => Q("shape.line"),
						() => Q("shape.arrow"),
						() => Q("shape.circle"),
						() => Q("shape.rect"),
						() => Q("shape.triangle")
					]), U("click", s, () => _u("text")), U("click", l, () => _u("text-box")), U("click", d, () => _u("button")), U("change", h, xu), U("click", g, () => _u("video")), U("click", v, () => _u("icon")), U("click", b, () => _u("samling")), U("click", S, () => _u("faq")), U("click", te, () => _u("galleri")), U("change", ae, Tu), U("click", ue, () => _u("shape-line")), U("click", fe, () => _u("shape-arrow")), U("click", me, () => _u("shape-circle")), U("click", O, () => _u("shape-rect")), U("click", k, () => _u("shape-triangle")), G(e, t);
				}, _ = (e) => {
					var t = Ec(), n = R(t), r = R(n), i = B(r), a = R(i);
					M(i), M(n);
					var o = B(n, 2);
					Y(o);
					var s = B(o, 2), c = R(s);
					Y(c);
					var l = B(c);
					M(s), M(t), V((e, t) => {
						K(r, `${e ?? ""} `), K(a, `${H(E).size ?? ""} px`), X(o, H(E).size), ii(c, H(E).snap !== !1), K(l, ` ${t ?? ""}`);
					}, [() => Q("lbl.gridSize"), () => Q("lbl.gridSnap")]), U("input", o, (e) => tr("size", Number(e.target.value))), U("change", c, (e) => tr("snap", e.target.checked)), G(e, t);
				}, v = (e) => {
					var t = Nc(), r = R(t), i = (e) => {
						var t = Dc(), n = z(t), r = R(n, !0);
						M(n);
						var i = B(n, 2);
						a(i), V((e) => K(r, e), [() => Q("blocks.suffix", { label: jt[H(N).type] ?? H(N).type })]), G(e, t);
					}, o = (e) => {
						var t = Mc(), r = z(t), i = R(r, !0);
						M(r);
						var a = B(r, 2), o = R(a), s = B(o);
						Y(s), M(a);
						var l = B(a, 4), u = R(l);
						Y(u);
						var d = B(u);
						M(l);
						var f = B(l, 2), p = (e) => {
							var t = Oc(), n = z(t), r = R(n), i = B(r), a = R(i);
							M(i), M(n);
							var o = B(n, 2);
							Y(o), V((e) => {
								K(r, `${e ?? ""} `), K(a, `${H(Ft).size ?? ""} px`), X(o, H(Ft).size);
							}, [() => Q("lbl.gridSize")]), U("input", o, (e) => er("size", Number(e.target.value))), G(e, t);
						};
						q(f, (e) => {
							H(Ft) && e(p);
						});
						var m = B(f, 4), h = R(m), g = B(h);
						{
							let e = /* @__PURE__ */ F(() => [["", Q("common.standard")], ...Object.entries(Ka).map(([e, t]) => [e, Q(t)])]);
							$(g, {
								get value() {
									return H(Bt);
								},
								get options() {
									return H(e);
								},
								onchange: (e) => Gt(e)
							});
						}
						M(m);
						var _ = B(m, 2), v = R(_), y = B(v), b = R(y), x = R(b);
						M(b);
						var S = B(b, 2);
						J(S, () => c.copy, !0), M(S), M(y), M(_);
						var C = B(_, 4), w = R(C, !0);
						M(C);
						var T = B(C, 2);
						n(T, () => H(kn), () => H(Lt));
						var E = B(T, 4), D = R(E), ee = B(D);
						{
							let e = /* @__PURE__ */ F(() => Bn(H(Rt)) ? H(Rt).type : "");
							$(ee, {
								get value() {
									return H(e);
								},
								get options() {
									return Vn;
								},
								onchange: (e) => qn(e || null)
							});
						}
						M(E);
						var te = B(E, 2), ne = (e) => {
							var t = jc(), n = z(t), r = R(n), i = B(r);
							Y(i), M(n);
							var a = B(n, 2), o = (e) => {
								var t = kc(), n = z(t), r = R(n), i = B(r);
								Y(i), M(n);
								var a = B(n, 2), o = R(a), s = B(o);
								{
									let e = /* @__PURE__ */ F(() => H(Rt).props.pattern ?? "sequence"), t = /* @__PURE__ */ F(() => [["sequence", Q("opt.stagger.sequence")], ["columns", Q("opt.stagger.columns")]]);
									$(s, {
										get value() {
											return H(e);
										},
										get options() {
											return H(t);
										},
										onchange: (e) => Xn(e)
									});
								}
								M(a), V((e, t, s, c) => {
									Z(n, "title", e), K(r, `${t ?? ""} `), X(i, H(Rt).props.step ?? 90), Z(a, "title", s), K(o, `${c ?? ""} `);
								}, [
									() => Q("tip.props.staggerStep"),
									() => Q("lbl.stepMs"),
									() => Q("tip.props.staggerPattern"),
									() => Q("lbl.pattern")
								]), U("change", i, (e) => Yn("step", Number(e.target.value))), G(e, t);
							}, s = (e) => {
								var t = Ac(), n = R(t), r = B(n);
								Y(r), M(t), V((e) => {
									K(n, `${e ?? ""} `), X(r, H(Rt).props.delay);
								}, [() => Q("lbl.delayMs")]), U("change", r, (e) => Yn("delay", Number(e.target.value))), G(e, t);
							};
							q(a, (e) => {
								H(Rt).type === "stagger" ? e(o) : e(s, -1);
							}), V((e) => {
								K(r, `${e ?? ""} `), X(i, H(Rt).props.duration);
							}, [() => Q("lbl.durationMs")]), U("change", i, (e) => Yn("duration", Number(e.target.value))), G(e, t);
						}, re = /* @__PURE__ */ F(() => Bn(H(Rt)));
						q(te, (e) => {
							H(re) && e(ne);
						});
						var ie = B(te, 2), ae = R(ie), oe = B(ae);
						{
							let e = /* @__PURE__ */ F(() => H(zt)?.type ?? (H(Rt) && !Bn(H(Rt)) ? H(Rt).type : ""));
							$(oe, {
								get value() {
									return H(e);
								},
								get options() {
									return Hn;
								},
								onchange: (e) => Jn(e || null)
							});
						}
						M(ie), V((e, t, n, r, c, l, f, p, g, y, b, C, T, ee, te) => {
							K(i, e), Z(a, "title", t), K(o, `${n ?? ""} `), X(s, H(It)), Z(s, "placeholder", r), ii(u, H(Ft) !== null), K(d, ` ${c ?? ""}`), Z(m, "title", l), K(h, `${f ?? ""} `), Z(_, "title", p), K(v, `${g ?? ""} `), K(x, `#${H(Pt) ?? ""}`), Z(S, "title", y), K(w, b), Z(E, "title", C), K(D, `${T ?? ""} `), Z(ie, "title", ee), K(ae, `${te ?? ""} `);
						}, [
							() => Q("lbl.section"),
							() => Q("hint.props.minHeight"),
							() => Q("lbl.minHeight"),
							() => Q("ph.minHeight"),
							() => Q("lbl.sectionGrid"),
							() => Q("tip.props.sectionTheme"),
							() => Q("lbl.sectionTheme"),
							() => Q("tip.props.anchor"),
							() => Q("lbl.anchor"),
							() => Q("tip.props.copyAnchor"),
							() => Q("lbl.background"),
							() => Q("tip.props.sectionAnim"),
							() => Q("lbl.animIn"),
							() => Q("tip.props.sectionHover"),
							() => Q("lbl.onHover")
						]), U("change", s, (e) => Zn(e.target.value)), U("change", u, (e) => $n(e.target.checked)), U("click", S, () => navigator.clipboard?.writeText(`#${H(Pt)}`)), G(e, t);
					}, s = (e) => {
						var t = us(), n = R(t, !0);
						M(t), V((e) => K(n, e), [() => Q("hint.props.empty")]), G(e, t);
					};
					q(r, (e) => {
						H(N) ? e(i) : H(Pt) ? e(o, 1) : e(s, -1);
					}), M(t), G(e, t);
				}, y = (e) => {
					var t = Hc(), i = R(t), a = R(i);
					Y(a);
					var o = B(a);
					M(i);
					var s = B(i, 2), l = (e) => {
						var t = wc(), n = R(t), r = R(n, !0);
						M(n);
						var i = B(n, 2);
						Br(i, 21, () => H(A).pages ?? [], (e) => e.id, (e, t) => {
							var n = hs(), r = R(n);
							Y(r);
							var i = B(r);
							M(n), V((e, a) => {
								Z(n, "title", e), ii(r, a), K(i, ` ${(H(t).title || H(t).id) ?? ""}`);
							}, [() => Q("tip.footer.hideOnPage"), () => !(H(A).footer?.hideOn ?? []).includes(H(t).id)]), U("change", r, (e) => bo(H(t).id, e.target.checked)), G(e, n);
						}), M(i), M(t), V((e) => K(r, e), [() => Q("group.showOnPages")]), G(e, t);
					};
					q(s, (e) => {
						H(A).footer?.show && e(l);
					});
					var u = B(s, 2), d = R(u), f = R(d, !0);
					M(d);
					var p = B(d, 2), m = R(p);
					Br(m, 21, () => ro, (e) => e.id, (e, t) => {
						var n = Pc(), r = R(n);
						J(r, () => Ro(H(t).thumb), !0), M(r);
						var i = B(r, 2), a = R(i, !0);
						M(i), M(n), V((e) => {
							Z(n, "title", e), K(a, H(t).label);
						}, [() => Q("tip.footer.template", { label: H(t).label })]), U("click", n, () => ao(H(t).id)), G(e, n);
					}), M(m), M(p), M(u);
					var h = B(u, 2), g = R(h), _ = R(g, !0);
					M(g);
					var v = B(g, 2), y = R(v), b = R(y), x = B(b);
					Y(x), M(y);
					var S = B(y, 2), C = R(S), w = B(C);
					Y(w), M(S);
					var T = B(S, 2), E = R(T), D = B(E);
					{
						let e = /* @__PURE__ */ F(() => H(A).footer?.brand?.mode ?? "text"), t = /* @__PURE__ */ F(() => [
							["text", Q("blocks.text")],
							["image", Q("opt.brand.image")],
							["both", Q("opt.brand.both")]
						]);
						$(D, {
							get value() {
								return H(e);
							},
							get options() {
								return H(t);
							},
							onchange: (e) => Qa(e)
						});
					}
					M(T);
					var ee = B(T, 2), te = (e) => {
						var t = Ic(), n = z(t), r = R(n), i = R(r), a = B(i);
						M(r);
						var o = B(r, 2), s = (e) => {
							var t = Go();
							J(t, () => c.cross, !0), M(t), V((e) => Z(t, "title", e), [() => Q("tip.footer.removeLogo")]), U("click", t, eo), G(e, t);
						};
						q(o, (e) => {
							H(A).footer?.brand?.logo && e(s);
						}), M(n);
						var l = B(n, 2), u = (e) => {
							var t = Fc(), n = z(t), r = R(n), i = B(r), a = R(i);
							M(i), M(n);
							var o = B(n, 2);
							Y(o), V((e) => {
								K(r, `${e ?? ""} `), K(a, `${H(A).footer?.brand?.logoHeight ?? 40 ?? ""} px`), X(o, H(A).footer?.brand?.logoHeight ?? 40);
							}, [() => Q("lbl.logoHeight")]), U("input", o, (e) => to(e.target.value)), G(e, t);
						};
						q(l, (e) => {
							H(A).footer?.brand?.logo && e(u);
						}), V((e, t) => {
							Z(r, "title", e), K(i, `${t ?? ""} `);
						}, [() => Q("tip.webpAutoPublish"), () => H(A).footer?.brand?.logo ? Q("ui.changeLogo") : Q("ui.uploadLogo")]), U("change", a, $a), G(e, t);
					};
					q(ee, (e) => {
						(H(A).footer?.brand?.mode ?? "text") !== "text" && e(te);
					}), M(v), M(h);
					var ne = B(h, 2), re = R(ne), ie = R(re, !0);
					M(re);
					var ae = B(re, 2), oe = R(ae);
					Br(oe, 17, () => H(A).footer?.columns ?? [], Ir, (e, t, n) => {
						var r = Lc(), i = z(r), a = R(i);
						Y(a);
						var o = B(a, 2), s = R(o);
						J(s, () => c.plus, !0), M(s);
						var l = B(s, 2);
						l.disabled = n === 0, J(l, () => c.up, !0), M(l);
						var u = B(l, 2);
						J(u, () => c.down, !0), M(u);
						var d = B(u, 2);
						J(d, () => c.cross, !0), M(d), M(o), M(i), Br(B(i, 2), 17, () => H(t).links ?? [], Ir, (e, r, i) => {
							var a = os(), o = R(a);
							Y(o);
							var s = B(o, 2), l = R(s);
							l.disabled = i === 0, J(l, () => c.up, !0), M(l);
							var u = B(l, 2);
							J(u, () => c.down, !0), M(u);
							var d = B(u, 2);
							J(d, () => c.cross, !0), M(d), M(s);
							var f = B(s, 2), p = R(f);
							{
								let e = /* @__PURE__ */ F(() => H(r).page ?? "__href"), t = /* @__PURE__ */ F(() => Q("tip.linkTarget")), a = /* @__PURE__ */ F(() => [...H(A).pages.map((e) => [e.id, e.title]), ["__href", Q("opt.linkHref")]]);
								$(p, {
									get value() {
										return H(e);
									},
									get title() {
										return H(t);
									},
									get options() {
										return H(a);
									},
									onchange: (e) => ko(n, i, e)
								});
							}
							M(f);
							var m = B(f, 2), h = (e) => {
								var t = as();
								Y(t), V((e, n) => {
									X(t, H(r).href ?? ""), Z(t, "placeholder", e), Z(t, "title", n);
								}, [() => Q("ph.hrefAnchor"), () => Q("tip.hrefAnchor")]), U("change", t, (e) => Ao(n, i, e.target.value)), G(e, t);
							};
							q(m, (e) => {
								H(r).page || e(h);
							}), M(a), V((e, n) => {
								X(o, H(r).label), Z(o, "title", e), u.disabled = i === H(t).links.length - 1, Z(d, "title", n);
							}, [() => Q("tip.linkLabel"), () => Q("tip.removeLink")]), U("input", o, (e) => Oo(n, i, e.target.value)), U("click", l, () => Do(n, i, -1)), U("click", u, () => Do(n, i, 1)), U("click", d, () => Eo(n, i)), G(e, a);
						}), V((e, r, i) => {
							X(a, H(t).title), Z(a, "title", e), Z(s, "title", r), u.disabled = n === H(A).footer.columns.length - 1, Z(d, "title", i);
						}, [
							() => Q("tip.footer.columnTitle"),
							() => Q("tip.footer.addLink"),
							() => Q("tip.footer.removeColumn")
						]), U("input", a, (e) => wo(n, e.target.value)), U("click", s, () => To(n)), U("click", l, () => Co(n, -1)), U("click", u, () => Co(n, 1)), U("click", d, () => So(n)), G(e, r);
					});
					var se = B(oe, 2), ce = R(se, !0);
					M(se);
					var le = B(se, 2), ue = R(le), de = B(ue);
					{
						let e = /* @__PURE__ */ F(() => H(A).footer?.columnsAlign ?? "left"), t = /* @__PURE__ */ F(() => [["left", Q("common.left")], ["center", Q("common.center")]]);
						$(de, {
							get value() {
								return H(e);
							},
							get options() {
								return H(t);
							},
							onchange: (e) => go(e)
						});
					}
					M(le), M(ae), M(ne);
					var fe = B(ne, 2), pe = R(fe), me = R(pe, !0);
					M(pe);
					var he = B(pe, 2), O = R(he);
					Br(O, 17, () => H(A).footer?.social ?? [], Ir, (e, t, n) => {
						var r = Rc(), i = R(r), a = R(i);
						J(a, () => ua(H(t).icon) || "", !0), M(a);
						var o = B(a, 2);
						{
							let e = /* @__PURE__ */ F(() => Q("blocks.icon"));
							$(o, {
								get value() {
									return H(t).icon;
								},
								get title() {
									return H(e);
								},
								get options() {
									return zo;
								},
								onchange: (e) => Fo(n, e)
							});
						}
						M(i);
						var s = B(i, 2), l = R(s);
						l.disabled = n === 0, J(l, () => c.up, !0), M(l);
						var u = B(l, 2);
						J(u, () => c.down, !0), M(u);
						var d = B(u, 2);
						J(d, () => c.cross, !0), M(d), M(s);
						var f = B(s, 2);
						Y(f), M(r), V((e, r) => {
							u.disabled = n === H(A).footer.social.length - 1, Z(d, "title", e), X(f, H(t).url), Z(f, "placeholder", r);
						}, [() => Q("tip.removeLink"), () => Q("ph.hrefMailto")]), U("click", l, () => Po(n, -1)), U("click", u, () => Po(n, 1)), U("click", d, () => Mo(n)), U("change", f, (e) => Io(n, e.target.value)), G(e, r);
					});
					var ge = B(O, 2), k = R(ge, !0);
					M(ge), M(he), M(fe);
					var _e = B(fe, 2), ve = R(_e), ye = R(ve, !0);
					M(ve);
					var be = B(ve, 2), j = R(be), xe = R(j);
					Y(xe);
					var Se = B(xe);
					M(j);
					var Ce = B(j, 2), we = (e) => {
						let t = /* @__PURE__ */ F(() => H(A).footer.cta);
						var n = Vc(), r = z(n), i = R(r), a = B(i);
						{
							let e = /* @__PURE__ */ F(() => H(t).kind ?? "button"), n = /* @__PURE__ */ F(() => [["button", Q("opt.cta.button")], ["newsletter", Q("opt.cta.newsletter")]]);
							$(a, {
								get value() {
									return H(e);
								},
								get options() {
									return H(n);
								},
								onchange: (e) => vo("kind", e)
							});
						}
						M(r);
						var o = B(r, 2), s = R(o);
						Y(s);
						var c = B(s);
						M(o);
						var l = B(o, 2), u = R(l), d = B(u);
						Y(d), M(l);
						var f = B(l, 2), p = R(f), m = B(p);
						Y(m), M(f);
						var h = B(f, 2), g = R(h), _ = B(g);
						Y(_), M(h);
						var v = B(h, 2), y = (e) => {
							var n = zc(), r = z(n), i = R(r), a = B(i);
							{
								let e = /* @__PURE__ */ F(() => H(t).page ?? "__href"), n = /* @__PURE__ */ F(() => [...H(A).pages.map((e) => [e.id, e.title]), ["__href", Q("opt.linkHrefMailto")]]);
								$(a, {
									get value() {
										return H(e);
									},
									get options() {
										return H(n);
									},
									onchange: (e) => yo(e)
								});
							}
							M(r);
							var o = B(r, 2), s = (e) => {
								var n = ps();
								Y(n), V((e, r) => {
									X(n, H(t).href ?? ""), Z(n, "placeholder", e), Z(n, "title", r);
								}, [() => Q("ph.hrefMailtoAnchor"), () => Q("tip.hrefAnchor")]), U("change", n, (e) => vo("href", e.target.value)), G(e, n);
							};
							q(o, (e) => {
								H(t).page || e(s);
							}), V((e, t) => {
								Z(r, "title", e), K(i, `${t ?? ""} `);
							}, [() => Q("tip.footer.ctaTarget"), () => Q("lbl.buttonTarget")]), G(e, n);
						}, b = (e) => {
							var n = Bc(), r = z(n), i = R(r), a = B(i);
							Y(a), M(r);
							var o = B(r, 2), s = R(o), c = B(s);
							Y(c), M(o);
							var l = B(o, 2), u = R(l), d = B(u);
							Y(d), M(l), V((e, n, f, p, m, h, g, _, v) => {
								Z(r, "title", e), K(i, `${n ?? ""} `), X(a, H(t).endpoint ?? ""), Z(a, "placeholder", f), Z(o, "title", p), K(s, `${m ?? ""} `), X(c, H(t).recipient ?? ""), Z(c, "placeholder", h), Z(l, "title", g), K(u, `${_ ?? ""} `), X(d, H(t).success ?? ""), Z(d, "placeholder", v);
							}, [
								() => Q("tip.footer.ctaEndpoint"),
								() => Q("lbl.newsletterEndpoint"),
								() => Q("ph.endpoint"),
								() => Q("tip.footer.ctaRecipient"),
								() => Q("lbl.recipientFallback"),
								() => Q("ph.email"),
								() => Q("tip.footer.ctaSuccess"),
								() => Q("lbl.confirmation"),
								() => Q("ph.footer.ctaSuccess")
							]), U("change", a, (e) => vo("endpoint", e.target.value)), U("change", c, (e) => vo("recipient", e.target.value)), U("input", d, (e) => vo("success", e.target.value)), G(e, n);
						};
						q(v, (e) => {
							(H(t).kind ?? "button") === "button" ? e(y) : e(b, -1);
						}), V((e, n, a, v, y, b, x, S, C, w, T, E) => {
							Z(r, "title", e), K(i, `${n ?? ""} `), Z(o, "title", a), ii(s, H(t).big === !0), K(c, ` ${v ?? ""}`), Z(l, "title", y), K(u, `${b ?? ""} `), X(d, H(t).heading ?? ""), Z(d, "placeholder", x), Z(f, "title", S), K(p, `${C ?? ""} `), X(m, H(t).sub ?? ""), Z(h, "title", w), K(g, `${T ?? ""} `), X(_, H(t).label ?? ""), Z(_, "placeholder", E);
						}, [
							() => Q("tip.footer.ctaKind"),
							() => Q("common.type"),
							() => Q("tip.footer.ctaBig"),
							() => Q("lbl.bigCentered"),
							() => Q("tip.footer.ctaHeading"),
							() => Q("lbl.heading"),
							() => Q("ph.footer.ctaHeading"),
							() => Q("tip.footer.ctaSub"),
							() => Q("lbl.subText"),
							() => Q("tip.footer.ctaLabel"),
							() => Q("lbl.buttonText"),
							() => Q("ph.footer.ctaLabel")
						]), U("change", s, (e) => vo("big", e.target.checked)), U("input", d, (e) => vo("heading", e.target.value)), U("input", m, (e) => vo("sub", e.target.value)), U("input", _, (e) => vo("label", e.target.value)), G(e, n);
					};
					q(Ce, (e) => {
						H(A).footer?.cta && e(we);
					}), M(be), M(_e);
					var Te = B(_e, 2), Ee = R(Te), De = R(Ee, !0);
					M(Ee);
					var Oe = B(Ee, 2), ke = R(Oe);
					r(ke, () => "linkRow", () => H(A).footer?.linkRow ?? []);
					var Ae = B(ke, 2), je = R(Ae, !0);
					M(Ae), M(Oe), M(Te);
					var Ne = B(Te, 2), Pe = R(Ne), Fe = R(Pe, !0);
					M(Pe);
					var Ie = B(Pe, 2), Le = R(Ie), Re = (e) => {
						var t = js(), n = z(t), r = R(n), i = B(r);
						{
							let e = /* @__PURE__ */ F(() => H(A).footer?.align ?? "left"), t = /* @__PURE__ */ F(() => [
								["left", Q("common.left")],
								["center", Q("common.center")],
								["right", Q("common.right")]
							]);
							$(i, {
								get value() {
									return H(e);
								},
								get options() {
									return H(t);
								},
								onchange: (e) => Xa("footer", (t) => {
									t.align = e;
								})
							});
						}
						M(n), Me(2), V((e, t) => {
							Z(n, "title", e), K(r, `${t ?? ""} `);
						}, [() => Q("tip.footer.align"), () => Q("lbl.align")]), G(e, t);
					};
					q(Le, (e) => {
						H(A).footer?.cta?.big !== !0 && e(Re);
					});
					var ze = B(Le, 2), Be = R(ze, !0);
					M(ze);
					var Ve = B(ze, 2);
					n(Ve, () => jn, () => H(A).footer?.background?.layers ?? []), M(Ie), M(Ne);
					var He = B(Ne, 2), Ue = R(He), We = R(Ue, !0);
					M(Ue);
					var Ge = B(Ue, 2), Ke = R(Ge), qe = R(Ke), Je = B(qe);
					Y(Je), M(Ke);
					var Ye = B(Ke, 2), Xe = R(Ye, !0);
					M(Ye);
					var Ze = B(Ye, 2);
					r(Ze, () => "baseline", () => H(A).footer?.baseline ?? []);
					var Qe = B(Ze, 2), $e = R(Qe, !0);
					M(Qe), M(Ge), M(He), M(t), V((e, t, n, r, s, c, l, u, d, p, m, h, g, v, D, ee, te, ne, re, ae, oe, se, de, fe, pe, he, O, ge, _e, ve, be, Ce) => {
						Z(i, "title", e), ii(a, t), K(o, ` ${n ?? ""}`), K(f, r), K(_, s), Z(y, "title", c), K(b, `${l ?? ""} `), X(x, H(A).footer?.brand?.title ?? ""), Z(x, "placeholder", u), Z(S, "title", d), K(C, `${p ?? ""} `), X(w, H(A).footer?.brand?.tagline ?? ""), Z(T, "title", m), K(E, `${h ?? ""} `), K(ie, g), K(ce, v), Z(le, "title", D), K(ue, `${ee ?? ""} `), K(me, te), K(k, ne), K(ye, re), Z(j, "title", ae), ii(xe, oe), K(Se, ` ${se ?? ""}`), K(De, de), K(je, fe), K(Fe, pe), K(Be, he), K(We, O), Z(Ke, "title", ge), K(qe, `${_e ?? ""} `), X(Je, H(A).footer?.copyright ?? ""), Z(Je, "placeholder", ve), K(Xe, be), K($e, Ce);
					}, [
						() => Q("tip.footer.show"),
						() => !!H(A).footer?.show,
						() => Q("lbl.showFooter"),
						() => Q("group.startpoint"),
						() => Q("group.brand"),
						() => Q("tip.footer.brandTitle"),
						() => Q("lbl.title"),
						() => Q("ph.footer.brandTitle"),
						() => Q("tip.footer.tagline"),
						() => Q("lbl.tagline"),
						() => Q("tip.footer.brandMode"),
						() => Q("lbl.brandMode"),
						() => Q("group.columns"),
						() => Q("ui.addColumn"),
						() => Q("tip.footer.columnsAlign"),
						() => Q("lbl.splitColumnAlign"),
						() => Q("group.social"),
						() => Q("ui.addSocial"),
						() => Q("group.cta"),
						() => Q("tip.footer.cta"),
						() => !!H(A).footer?.cta,
						() => Q("lbl.showCta"),
						() => Q("group.linkRow"),
						() => Q("ui.addRowLink"),
						() => Q("group.appearance"),
						() => Q("lbl.background"),
						() => Q("group.baseline"),
						() => Q("tip.footer.copyright"),
						() => Q("lbl.copyright"),
						() => Q("ph.footer.copyright"),
						() => Q("lbl.baselineLinks"),
						() => Q("ui.addBaselineLink")
					]), U("change", a, (e) => Xa("footer", (t) => {
						t.show = e.target.checked;
					})), U("input", x, (e) => Za("title", e.target.value)), U("input", w, (e) => Za("tagline", e.target.value)), U("click", se, xo), U("click", ge, jo), U("change", xe, (e) => _o(e.target.checked)), U("click", Ae, () => oo("linkRow")), U("input", Je, (e) => no(e.target.value)), U("click", Qe, () => oo("baseline")), G(e, t);
				}, b = (e) => {
					var t = Kc(), n = R(t), r = (e) => {
						var t = ss(), n = R(t), r = B(n);
						{
							let e = /* @__PURE__ */ F(() => H(Di) ?? ""), t = /* @__PURE__ */ F(() => [["", Q("common.choose")], ...H(Ci).map((e) => [e, H(wi)[e]?.name ?? e])]);
							$(r, {
								get value() {
									return H(e);
								},
								get options() {
									return H(t);
								},
								onchange: (e) => L(Di, e || null, !0)
							});
						}
						M(t), V((e) => K(n, `${e ?? ""} `), [() => Q("blocks.samling")]), G(e, t);
					};
					q(n, (e) => {
						H(Ci).length && e(r);
					});
					var i = B(n, 2), a = (e) => {
						let t = /* @__PURE__ */ F(() => H(wi)[H(Di)]);
						var n = Gc(), r = z(n), i = R(r), a = R(i, !0);
						M(i);
						var o = B(i, 2);
						J(o, () => c.cross, !0), M(o), M(r);
						var s = B(r, 2);
						Br(s, 19, () => H(t).entries, (e) => e.id, (e, n, r) => {
							var i = Wc(), a = R(i), o = R(a);
							M(a);
							var s = B(a, 2), l = R(s), u = R(l);
							Y(u);
							var d = B(u, 2), f = R(d);
							J(f, () => c.up, !0), M(f);
							var p = B(f, 2);
							J(p, () => c.down, !0), M(p);
							var m = B(p, 2);
							J(m, () => c.cross, !0), M(m), M(d), M(l);
							var h = B(l, 2), g = R(h), _ = B(g);
							Y(_), M(h);
							var v = B(h, 2);
							ot(v);
							var y = B(v, 2), b = R(y), x = B(b);
							Y(x), M(y);
							var S = B(y, 2), C = R(S), w = R(C), T = B(w);
							M(C);
							var E = B(C, 2), D = (e) => {
								var t = Uc(), r = z(t), i = B(r, 2);
								J(i, () => c.cross, !0), M(i), V((e) => {
									Z(r, "src", H(n).image), Z(i, "title", e);
								}, [() => Q("tip.removeImage")]), U("click", i, () => ra(H(Di), H(n).id, "image", "")), G(e, t);
							};
							q(E, (e) => {
								H(n).image && e(D);
							}), M(S), M(s), M(i), V((e, i, a, s, c, l, d, h) => {
								K(o, `${e ?? ""}${H(n).date ? ` · ${H(n).date}` : ""}`), X(u, H(n).title), Z(u, "title", i), f.disabled = H(r) === 0, p.disabled = H(r) === H(t).entries.length - 1, Z(m, "title", a), K(g, `${s ?? ""} `), X(_, H(n).date ?? ""), Z(v, "placeholder", c), X(v, H(n).text ?? ""), K(b, `${l ?? ""} `), X(x, H(n).href ?? ""), Z(x, "placeholder", d), K(w, `${h ?? ""} `);
							}, [
								() => H(n).title.replace(/<[^>]*>/g, ""),
								() => Q("lbl.title"),
								() => Q("tip.collections.deleteEntry"),
								() => Q("lbl.date"),
								() => Q("ph.collections.text"),
								() => Q("lbl.link"),
								() => Q("ph.collections.href"),
								() => H(n).image ? Q("ui.changeImage") : Q("ui.addImage")
							]), U("change", u, (e) => ra(H(Di), H(n).id, "title", e.target.value || "Uten tittel")), U("click", f, () => ia(H(Di), H(r), -1)), U("click", p, () => ia(H(Di), H(r), 1)), U("click", m, () => aa(H(Di), H(n).id)), U("change", _, (e) => ra(H(Di), H(n).id, "date", e.target.value)), U("change", v, (e) => ra(H(Di), H(n).id, "text", e.target.value)), U("change", x, (e) => ra(H(Di), H(n).id, "href", e.target.value)), U("change", T, (e) => oa(H(Di), H(n).id, e)), G(e, i);
						});
						var l = B(s, 2), u = (e) => {
							var t = us(), n = R(t, !0);
							M(t), V((e) => K(n, e), [() => Q("hint.collections.empty")]), G(e, t);
						};
						q(l, (e) => {
							H(t).entries.length || e(u);
						}), Me(2), V((e, t) => {
							K(a, e), Z(o, "title", t);
						}, [() => Q("ui.addEntry"), () => Q("tip.collections.deleteCollection")]), U("click", i, () => na(H(Di))), U("click", o, () => ta(H(Di))), G(e, n);
					};
					q(i, (e) => {
						H(Di) && H(wi)[H(Di)] && e(a);
					});
					var o = B(i, 2), s = R(o), l = B(s);
					Y(l), M(o);
					var u = B(o, 2), d = R(u);
					$(B(d), {
						get value() {
							return H(ki);
						},
						get options() {
							return ji;
						},
						onchange: (e) => L(ki, e, !0)
					}), M(u);
					var f = B(u, 2), p = R(f, !0);
					M(f), M(t), V((e, t, n, r, i) => {
						K(s, `${e ?? ""} `), Z(l, "placeholder", t), K(d, `${n ?? ""} `), f.disabled = r, K(p, i);
					}, [
						() => Q("lbl.newCollectionName"),
						() => Q("ph.collections.name"),
						() => Q("common.type"),
						() => !H(Oi).trim(),
						() => Q("ui.createCollection")
					]), U("keydown", l, (e) => e.key === "Enter" && Ji()), ci(l, () => H(Oi), (e) => L(Oi, e)), U("click", f, Ji), G(e, t);
				}, x = (e) => {
					var t = $c(), n = R(t), r = (e) => {
						var t = us(), n = R(t, !0);
						M(t), V((e) => K(n, e), [() => Q("hint.plugins.empty")]), G(e, t);
					}, i = /* @__PURE__ */ F(() => !wa().length);
					q(n, (e) => {
						H(i) && e(r);
					});
					var a = B(n, 2);
					Br(a, 16, wa, (e) => e, (e, t) => {
						let n = /* @__PURE__ */ F(() => ma[t]), r = /* @__PURE__ */ F(() => (H(pa)?.enabled ?? []).includes(t));
						var i = Yc();
						let a;
						var o = R(i), s = R(o), l = R(s, !0);
						M(s);
						var u = B(s, 2), d = (e) => {
							var t = qc(), r = R(t);
							M(t), V(() => K(r, `v${H(n).version ?? ""}`)), G(e, t);
						};
						q(u, (e) => {
							H(n)?.version && e(d);
						});
						var f = B(u, 2), p = R(f), m = R(p);
						Y(m);
						var h = B(m);
						M(p);
						var g = B(p, 2);
						J(g, () => c.cross, !0), M(g), M(f), M(o);
						var _ = B(o, 2), v = (e) => {
							var t = Jc(), r = R(t, !0);
							M(t), V((e) => K(r, e), [() => H(n).errors.join("; ")]), G(e, t);
						}, y = (e) => {
							var t = Jc(), r = R(t, !0);
							M(t), V((e) => K(r, e), [() => Q("plugin.engineMismatch", {
								required: H(n).requiresEngine,
								current: H(ha)
							})]), G(e, t);
						}, b = (e) => {
							var t = Jc(), r = R(t, !0);
							M(t), V((e) => K(r, e), [() => Q("plugin.cspNeeded", { list: ka(H(n).csp).join(", ") })]), G(e, t);
						}, x = /* @__PURE__ */ F(() => H(n)?.csp && ka(H(n).csp).length);
						q(_, (e) => {
							H(n)?.errors?.length ? e(v) : H(n) && !H(n).satisfied ? e(y, 1) : H(x) && e(b, 2);
						});
						var S = B(_, 2), C = (e) => {
							var t = us(), r = R(t, !0);
							M(t), V((e) => K(r, e), [() => Q("plugin.languages", { list: H(n).languages.map((e) => e.name).join(", ") })]), G(e, t);
						};
						q(S, (e) => {
							H(n)?.languages?.length && e(C);
						}), M(i), V((e, t, o, s, c) => {
							a = Zr(i, 1, "plugin-row svelte-1n46o8q", null, a, { "plugin-broken": H(n)?.errors?.length }), K(l, e), Z(p, "title", t), ii(m, H(r)), m.disabled = o, K(h, ` ${s ?? ""}`), Z(g, "title", c);
						}, [
							() => H(n)?.names?.[Ei()] ?? H(n)?.name ?? t,
							() => H(r) ? Q("tip.plugins.on") : Q("tip.plugins.off"),
							() => !!H(n)?.errors?.length,
							() => H(r) ? Q("ui.on") : Q("ui.off"),
							() => Q("tip.plugins.remove")
						]), U("change", m, (e) => Ba(t, e.target.checked)), U("click", g, () => Ha(t)), G(e, i);
					});
					var o = B(a, 2), s = (e) => {
						var t = Zc(), n = B(z(t), 2), r = R(n, !0);
						M(n), Br(B(n, 2), 16, () => H(va), (e) => e, (e, t) => {
							var n = Xc(), r = R(n), i = R(r), a = R(i, !0);
							M(i);
							var o = B(i, 2), s = (e) => {
								var n = qc(), r = R(n);
								M(n), V(() => K(r, `v${ma[t].version ?? ""}`)), G(e, n);
							};
							q(o, (e) => {
								ma[t]?.version && e(s);
							});
							var l = B(o, 2), u = R(l);
							J(u, () => c.right, !0), M(u), M(l), M(r), M(n), V((e, t) => {
								K(a, e), Z(u, "title", t);
							}, [() => ma[t]?.names?.[Ei()] ?? ma[t]?.name ?? t, () => Q("tip.plugins.addFound")]), U("click", u, () => Ga(t)), G(e, n);
						}), V((e) => K(r, e), [() => Q("hint.plugins.found")]), G(e, t);
					};
					q(o, (e) => {
						H(va).length && e(s);
					});
					var l = B(o, 2), u = (e) => {
						var t = Ar(), n = z(t), r = (e) => {
							var t = us(), n = R(t, !0);
							M(t), V((e) => K(n, e), [() => Q("hint.plugins.autoDiscover")]), G(e, t);
						};
						q(n, (e) => {
							H(va).length || e(r);
						}), G(e, t);
					}, d = (e) => {
						var t = Qc(), n = B(z(t), 2);
						Y(n);
						var r = B(n, 2), i = R(r, !0);
						M(r);
						var a = B(r, 2), o = (e) => {
							var t = Jc(), n = R(t, !0);
							M(t), V(() => K(n, H(_a))), G(e, t);
						};
						q(a, (e) => {
							H(_a) && e(o);
						}), V((e, t, a) => {
							Z(n, "placeholder", e), r.disabled = t, K(i, a);
						}, [
							() => Q("ph.plugins.folder"),
							() => !H(ga).trim(),
							() => Q("ui.addPlugin")
						]), U("keydown", n, (e) => e.key === "Enter" && Wa()), ci(n, () => H(ga), (e) => L(ga, e)), U("click", r, Wa), G(e, t);
					};
					q(l, (e) => {
						H(Sa) === "ok" ? e(u) : e(d, -1);
					}), M(t), G(e, t);
				}, S = (e) => {
					var t = Nc(), n = R(t), r = (e) => {
						var t = us(), n = R(t, !0);
						M(t), V((e) => K(n, e), [() => Q("hint.history.loading")]), G(e, t);
					}, i = (e) => {
						var t = ec(), n = z(t), r = (e) => {
							var t = us(), n = R(t, !0);
							M(t), V(() => K(n, H(sr))), G(e, t);
						};
						q(n, (e) => {
							H(sr) && e(r);
						});
						var i = B(n, 2), a = (e) => {
							var t = tl(), n = z(t), r = R(n, !0);
							M(n), Br(B(n, 2), 19, () => H(or), (e) => e.sha, (e, t, n) => {
								var r = el();
								let i;
								var a = R(r), o = R(a, !0);
								M(a);
								var s = B(a, 2), c = R(s);
								M(s), M(r), V((e) => {
									i = Zr(r, 1, "history-row svelte-1n46o8q", null, i, { head: H(n) === 0 }), Z(a, "title", H(t).sha), K(o, H(t).message), K(c, `${H(t).author ?? ""}${e ?? ""}`);
								}, [() => H(t).date ? ` · ${ur.format(new Date(H(t).date))}` : ""]), G(e, r);
							}), V((e, t) => {
								n.disabled = H(cr) || !H(T)?.allowed, Z(n, "title", e), K(r, t);
							}, [() => H(T)?.allowed ? Q("tip.history.revert") : Q("tip.history.needsAccess"), () => Q("ui.revertLast")]), U("click", n, fr), G(e, t);
						};
						q(i, (e) => {
							H(or).length > 0 && e(a);
						}), G(e, t);
					};
					q(n, (e) => {
						H(or) === null ? e(r) : e(i, -1);
					}), M(t), G(e, t);
				}, C = (e) => {
					var t = Nc(), n = R(t), r = (e) => {
						var t = us(), n = R(t, !0);
						M(t), V((e) => K(n, e), [() => Q("update.checking")]), G(e, t);
					}, i = (e) => {
						var t = nl(), n = z(t), r = R(n, !0);
						M(n);
						var i = B(n, 2), a = R(i, !0);
						M(i), V((e) => {
							K(r, H(hr)), K(a, e);
						}, [() => Q("update.retry")]), U("click", i, vr), G(e, t);
					}, a = (e) => {
						var t = pl(), n = z(t), r = R(n), i = R(r, !0);
						M(r);
						var a = B(r, 2), o = (e) => {
							var t = rl(), n = z(t);
							J(n, () => c.right, !0), M(n);
							var r = B(n, 2), i = R(r, !0);
							M(r), V(() => K(i, H(mr).target)), G(e, t);
						};
						q(a, (e) => {
							H(mr).upToDate || e(o);
						}), M(n);
						var s = B(n, 2), l = (e) => {
							var t = us(), n = R(t, !0);
							M(t), V((e) => K(n, e), [() => Q("update.upToDate")]), G(e, t);
						}, u = (e) => {
							var t = fl(), n = z(t), r = R(n, !0);
							M(n);
							var i = B(n, 2), a = (e) => {
								var t = il(), n = R(t), r = R(n, !0);
								M(n);
								var i = B(n, 2), a = R(i), o = R(a, !0);
								M(a), M(i), M(t), V((e) => {
									K(r, e), K(o, H(mr).notes);
								}, [() => Q("update.aboutVersion", { target: H(mr).target })]), G(e, t);
							};
							q(i, (e) => {
								H(mr).notes && e(a);
							});
							var o = B(i, 2), s = (e) => {
								var t = al(), n = R(t), r = R(n);
								J(r, () => c.warn, !0), M(r);
								var i = B(r);
								M(n);
								var a = B(n, 2), o = R(a), s = R(o, !0);
								M(o), M(a), M(t), V((e, t) => {
									Z(n, "title", e), K(i, ` ${t ?? ""}`), K(s, H(mr).headers.upstream);
								}, [() => Q("update.headersManual"), () => Q("update.headersTitle")]), G(e, t);
							};
							q(o, (e) => {
								H(mr).headers?.upstream && e(s);
							});
							var l = B(o, 2);
							Br(l, 17, () => H(mr).changes.filter((e) => e.atom && e.conflict), (e) => e.path, (e, t) => {
								var n = sl(), r = R(n), i = R(r, !0);
								M(r);
								var a = B(r, 2), o = R(a), s = (e) => {
									var t = ol(), n = R(t, !0);
									M(t), V((e) => K(n, e), [() => Q("update.actionDelete")]), G(e, t);
								};
								q(o, (e) => {
									H(t).action === "delete" && e(s);
								});
								var l = B(o, 2);
								J(l, () => c.warn, !0), M(l), M(a), M(n), V((e) => {
									Z(r, "title", H(t).path), K(i, H(t).path), Z(l, "title", e);
								}, [() => Q(`update.conflict.${H(t).conflict}`)]), G(e, n);
							});
							var u = B(l, 2), d = R(u), f = R(d);
							M(d);
							var p = B(d, 2);
							Br(p, 21, () => H(mr).changes.filter((e) => e.atom && !e.conflict), (e) => e.path, (e, t) => {
								var n = cl(), r = R(n), i = R(r, !0);
								M(r);
								var a = B(r, 2), o = (e) => {
									var t = ol(), n = R(t, !0);
									M(t), V((e) => K(n, e), [() => Q("update.actionDelete")]), G(e, t);
								};
								q(a, (e) => {
									H(t).action === "delete" && e(o);
								}), M(n), V(() => {
									Z(r, "title", H(t).path), K(i, H(t).path);
								}), G(e, n);
							}), M(p), M(u);
							var m = B(u, 2), h = (e) => {
								var t = dl(), n = z(t), r = R(n), i = R(r, !0);
								M(r);
								var a = B(r, 2), o = R(a, !0);
								M(a), M(n), Br(B(n, 2), 17, () => H(mr).changes.filter((e) => !e.atom), (e) => e.path, (e, t) => {
									var n = ul(), r = R(n);
									let i;
									var a = R(r, !0);
									M(r);
									var o = B(r, 2), s = R(o), l = (e) => {
										var t = ol(), n = R(t, !0);
										M(t), V((e) => K(n, e), [() => Q("update.actionDelete")]), G(e, t);
									};
									q(s, (e) => {
										H(t).action === "delete" && e(l);
									});
									var u = B(s, 2), d = (e) => {
										var n = ll();
										J(n, () => c.warn, !0), M(n), V((e) => Z(n, "title", e), [() => Q(`update.conflict.${H(t).conflict}`)]), G(e, n);
									};
									q(u, (e) => {
										H(t).conflict && e(d);
									});
									var f = B(u, 2);
									Y(f), M(o), M(n), V((e, n, o, s) => {
										i = Zr(r, 1, "update-path svelte-1n46o8q", null, i, e), Z(r, "title", H(t).path), K(a, H(t).path), ii(f, n), Z(f, "title", o), Z(f, "aria-label", s);
									}, [
										() => ({ skipped: H(_r).has(H(t).path) }),
										() => H(_r).has(H(t).path),
										() => Q("update.keepMine.title"),
										() => Q("update.keepMine")
									]), U("change", f, () => br(H(t).path)), G(e, n);
								}), V((e, t) => {
									K(i, e), K(o, t);
								}, [() => Q("update.optionalTitle"), () => Q("update.keepMine")]), G(e, t);
							}, g = /* @__PURE__ */ F(() => H(mr).changes.some((e) => !e.atom));
							q(m, (e) => {
								H(g) && e(h);
							});
							var _ = B(m, 2), v = R(_, !0);
							M(_), V((e, t, n, i, a, o) => {
								K(r, e), Z(d, "title", t), K(f, `${n ?? ""} · ${i ?? ""}`), _.disabled = H(gr) || !H(T)?.allowed, Z(_, "title", a), K(v, o);
							}, [
								() => Q("update.summary", {
									writes: H(mr).changes.filter((e) => e.action === "write").length,
									deletes: H(mr).changes.filter((e) => e.action === "delete").length
								}),
								() => Q("update.atomGroup.title"),
								() => Q("update.atomTitle"),
								() => H(mr).changes.filter((e) => e.atom).length,
								() => H(T)?.allowed ? Q("update.run.title") : Q("tip.history.needsAccess"),
								() => Q("update.run", { target: H(mr).target })
							]), U("click", _, Sr), G(e, t);
						};
						q(s, (e) => {
							H(mr).upToDate ? e(l) : e(u, -1);
						}), V((e) => K(i, e), [() => Q("update.current", { version: H(mr).current })]), G(e, t);
					};
					q(n, (e) => {
						H(gr) && !H(mr) ? e(r) : H(hr) ? e(i, 1) : H(mr) && e(a, 2);
					}), M(t), G(e, t);
				};
				q(s, (e) => {
					H(Ye) === "pages" ? e(l) : H(Ye) === "nav" ? e(u, 1) : H(Ye) === "site" ? e(f, 2) : H(Ye) === "theme" ? e(p, 3) : H(Ye) === "blocks" ? e(h, 4) : H(Ye) === "grid" ? e(_, 5) : H(Ye) === "properties" ? e(v, 6) : H(Ye) === "footer" ? e(y, 7) : H(Ye) === "collections" ? e(b, 8) : H(Ye) === "plugins" ? e(x, 9) : H(Ye) === "history" ? e(S, 10) : H(Ye) === "update" && e(C, 11);
				}), M(t), V((e) => {
					Z(i, "title", e), K(o, Ze[H(Ye)]);
				}, [() => Qe[H(Ye)]?.map((e) => Q(e)).join("\n")]), G(e, t);
			};
			q(v, (e) => {
				H(Ye) && e(y);
			}), V((e) => {
				p = Zr(f, 1, "rail-gear svelte-1n46o8q", null, p, { active: H(kr) }), Z(f, "title", e);
			}, [() => Q("settings.title")]), U("click", f, () => L(kr, !H(kr))), G(e, t);
		};
		q(i, (e) => {
			H(D) && e(o);
		});
		var s = B(i, 2);
		let f;
		var p = R(s), h = R(p);
		fi(h, (e) => L(w, e), () => H(w)), M(p), M(s), fi(s, (e) => L(te, e), () => H(te)), M(t), V((e) => {
			f = Zr(s, 1, "frame-wrap svelte-1n46o8q", null, f, { mobile: H(ee) === "mobile" }), $r(p, `width:${H(de) ?? ""}px; height:${H(fe) ?? ""}px`), Z(h, "title", e), Z(h, "src", `/?page=${H(g)}&preview=1`), $r(h, `width:${H(se) ?? ""}px; height:${H(ue) ?? ""}px; transform:scale(${H(ce) ?? ""}); transform-origin:top left`);
		}, [() => Q("ui.previewTitle")]), xr("load", h, Dr), yr(h), G(e, t);
	}, rd = (e) => {
		var t = _l(), n = R(t, !0);
		M(t), V((e) => K(n, e), [() => Q("ui.loading")]), G(e, t);
	};
	q(td, (e) => {
		H(h) ? e(nd) : e(rd, -1);
	});
	var id = B(td, 2), ad = (e) => {
		Oa(e, {
			get image() {
				return H(Jr);
			},
			onapply: Xr,
			oncancel: () => L(Jr, null)
		});
	};
	q(id, (e) => {
		H(Jr) && e(ad);
	});
	var od = B(id, 2), sd = (e) => {
		var t = yl(), n = R(t), r = R(n), i = R(r, !0);
		M(r);
		var a = B(r, 2);
		Br(a, 16, () => H(Ie).lines, (e) => e, (e, t) => {
			var n = vl(), r = R(n, !0);
			M(n), V(() => K(r, t)), G(e, n);
		});
		var o = B(a, 2), s = (e) => {
			var t = ps();
			Y(t), at(t, !0), V(() => Z(t, "placeholder", H(Ie).placeholder)), U("keydown", t, (e) => e.key === "Enter" && H(Ie).value.trim() && Be(!0)), ci(t, () => H(Ie).value, (e) => H(Ie).value = e), G(e, t);
		};
		q(o, (e) => {
			H(Ie).prompt && e(s);
		});
		var c = B(o, 2), l = R(c), u = R(l, !0);
		M(l);
		var d = B(l, 2), f = R(d, !0);
		M(d), M(c), M(n), M(t), V(() => {
			K(i, H(Ie).title), K(u, H(Ie).cancelLabel), K(f, H(Ie).okLabel);
		}), U("click", l, () => Be(!1)), U("click", d, () => Be(!0)), G(e, t);
	};
	q(od, (e) => {
		H(Ie) && e(sd);
	});
	var cd = B(od, 2), ld = (e) => {
		var t = bl(), n = R(t), r = R(n), i = R(r, !0);
		M(r);
		var a = B(r, 2), o = R(a, !0);
		M(a);
		var s = B(a, 2), c = R(s), l = B(c);
		Y(l), M(s);
		var u = B(s, 2), d = R(u), f = B(d);
		{
			let e = /* @__PURE__ */ F(() => Q("setup.accentPick"));
			Hi(f, {
				get value() {
					return H(Ge);
				},
				get label() {
					return H(e);
				},
				onchange: (e) => L(Ge, e, !0)
			});
		}
		M(u);
		var p = B(u, 2), m = R(p), h = B(m);
		{
			let e = /* @__PURE__ */ F(() => Q("setup.bgLabel"));
			Hi(h, {
				get value() {
					return H(Ke);
				},
				get label() {
					return H(e);
				},
				onchange: (e) => L(Ke, e, !0)
			});
		}
		M(p);
		var g = B(p, 2), _ = R(g, !0);
		M(g);
		var v = B(g, 2), y = R(v), b = R(y, !0);
		M(y);
		var x = B(y, 2), S = R(x, !0);
		M(x), M(v), M(n), M(t), V((e, t, n, r, a, s, u, f, p, h) => {
			K(i, e), K(o, t), K(c, `${n ?? ""} `), Z(l, "placeholder", r), K(d, `${a ?? ""} `), K(m, `${s ?? ""} `), K(_, u), K(b, f), x.disabled = p, K(S, h);
		}, [
			() => Q("setup.title"),
			() => Q("setup.intro"),
			() => Q("setup.nameLabel"),
			() => Q("ph.setup.name"),
			() => Q("setup.accentLabel"),
			() => Q("setup.bgLabel"),
			() => Q("setup.outro"),
			() => Q("setup.skip"),
			() => !H(He).trim(),
			() => Q("setup.start")
		]), U("keydown", l, (e) => e.key === "Enter" && Je()), ci(l, () => H(He), (e) => L(He, e)), U("click", y, qe), U("click", x, Je), G(e, t);
	};
	q(cd, (e) => {
		H(Ve) && e(ld);
	});
	var ud = B(cd, 2), dd = (e) => {
		var t = xl();
		let n;
		var r = R(t), i = R(r, !0);
		M(r);
		var a = B(r, 2);
		M(t), V((e) => {
			n = Zr(t, 1, "toast svelte-1n46o8q", null, n, {
				ok: H(y) === "ok",
				error: H(y) === "error"
			}), K(i, H(v)), Z(a, "title", e);
		}, [() => Q("ui.close")]), U("click", a, () => x("")), G(e, t);
	};
	q(ud, (e) => {
		H(v) && e(dd);
	}), M(Bu);
	var fd = B(Bu, 2), pd = (e) => {
		var t = Sl(), n = R(t), r = R(n), i = R(r, !0);
		M(r);
		var o = B(r, 2);
		J(o, () => c.cross, !0), M(o), M(n);
		var s = B(n, 2), l = R(s);
		a(l), M(s), M(t), V((e, n) => {
			$r(t, `left: ${H(ft).left ?? ""}px; top: ${H(ft).top ?? ""}px`), K(i, e), Z(o, "title", n);
		}, [() => Q("blocks.suffix", { label: jt[H(N).type] ?? H(N).type }), () => Q("tip.closeEsc")]), U("click", o, () => L(ft, null)), G(e, t);
	};
	q(fd, (e) => {
		H(ft) && H(N) && e(pd);
	}), V(() => Wu = Zr(Uu, 1, "topbar svelte-1n46o8q", null, Wu, { hidden: !H(D) })), G(e, zu), We();
}
//#endregion
//#region src/main.js
Sr([
	"click",
	"input",
	"pointerdown",
	"change",
	"keydown"
]), document.documentElement.lang = await ki();
var Tl = jr(wl, { target: document.getElementById("urd-admin") });
//#endregion
export { Tl as default };
