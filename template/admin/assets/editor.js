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
function ge(e) {
	throw Error("https://svelte.dev/e/effect_orphan");
}
function O() {
	throw Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function _e(e) {
	throw Error("https://svelte.dev/e/props_invalid_value");
}
function k() {
	throw Error("https://svelte.dev/e/state_descriptors_fixed");
}
function A() {
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
var be = {}, xe = Symbol("uninitialized"), j = "http://www.w3.org/1999/xhtml", Se = "http://www.w3.org/2000/svg", Ce = "http://www.w3.org/1998/Math/MathML";
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
	return Ae(/* @__PURE__ */ un(ke));
}
function M(e) {
	if (De) {
		if (/* @__PURE__ */ un(ke) !== null) throw Te(), be;
		ke = e;
	}
}
function Me(e = 1) {
	if (De) {
		for (var t = e, n = ke; t--;) n = /* @__PURE__ */ un(n);
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
		var i = /* @__PURE__ */ un(n);
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
		r: Kn,
		l: null
	};
}
function We(e) {
	var t = Ve, n = t.e;
	if (n !== null) {
		t.e = null;
		for (var r of n) xn(r);
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
	if (Ke.length === 0 && !Mt) {
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
	var t = Kn;
	if (t === null) return Un.f |= te, e;
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
	De && /* @__PURE__ */ ln(e) !== null && dn(e);
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
function lt(e) {
	var t = Un, n = Kn;
	Gn(null), qn(null);
	try {
		return e();
	} finally {
		Gn(t), qn(n);
	}
}
function N(e, t, n, r = n) {
	e.addEventListener(t, () => lt(n));
	let i = e[le];
	e[le] = i ? () => {
		i(), r(!0);
	} : () => r(!0), ct();
}
//#endregion
//#region node_modules/svelte/src/reactivity/create-subscriber.js
function ut(e) {
	let t = 0, n = Yt(0), r;
	return () => {
		vn() && (V(n), Tn(() => (t === 0 && (r = mr(() => e(() => $t(n)))), t += 1, () => {
			Je(() => {
				--t, t === 0 && (r?.(), r = void 0, $t(n));
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
	#h = ut(() => (this.#m = Yt(this.#l), () => {
		this.#m = null;
	}));
	constructor(e, t, n, r) {
		this.#e = e, this.#n = t, this.#r = (e) => {
			var t = Kn;
			t.b = this, t.f |= 128, n(e);
		}, this.parent = Kn.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = En(() => {
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
			this.#a = Dn(() => this.#r(this.#e));
		} catch (e) {
			this.error(e);
		}
	}
	#_(e) {
		let t = this.#n.failed, { reset: n, invoke_onerror: r } = this.#v(e);
		Je(r), t && (this.#s = Dn(() => {
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
			t = !0, n && ye(), this.#s !== null && Pn(this.#s, () => {
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
		e && (this.is_pending = !0, this.#o = Dn(() => e(this.#e)), Je(() => {
			var e = this.#c = document.createDocumentFragment(), t = cn();
			e.append(t), this.#a = this.#S(() => Dn(() => this.#r(t))), this.#u === 0 && (this.#e.before(e), this.#c = null, Pn(this.#o, () => {
				this.#o = null;
			}), this.#x(Ot));
		}));
	}
	#b() {
		try {
			if (this.is_pending = this.has_pending_snippet(), this.#u = 0, this.#l = 0, this.#a = Dn(() => {
				this.#r(this.#e);
			}), this.#u > 0) {
				var e = this.#c = document.createDocumentFragment();
				Rn(this.#a, e);
				let t = this.#n.pending;
				this.#o = Dn(() => t(this.#e));
			} else this.#x(Ot);
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
		var t = Kn, n = Un, r = Ve;
		qn(this.#i), Gn(this.#i), He(this.#i.ctx);
		try {
			return Rt.ensure(), e();
		} catch (e) {
			return Xe(e), null;
		} finally {
			qn(t), Gn(n), He(r);
		}
	}
	#C(e, t) {
		if (!this.has_pending_snippet()) {
			this.parent && this.parent.#C(e, t);
			return;
		}
		this.#u += e, this.#u === 0 && (this.#x(t), this.#o && Pn(this.#o, () => {
			this.#o = null;
		}), this.#c &&= (this.#e.before(this.#c), null));
	}
	update_pending_count(e, t) {
		this.#C(e, t), this.#l += e, !(!this.#m || this.#d) && (this.#d = !0, Je(() => {
			this.#d = !1, this.#m && Zt(this.#m, this.#l);
		}));
	}
	get_effect_pending() {
		return this.#h(), V(this.#m);
	}
	error(e) {
		if (!this.#n.onerror && !this.#n.failed) throw e;
		Ot?.is_fork ? (this.#a && Ot.skip_effect(this.#a), this.#o && Ot.skip_effect(this.#o), this.#s && Ot.skip_effect(this.#s), Ot.oncommit(() => {
			this.#w(e);
		})) : this.#w(e);
	}
	#w(e) {
		this.#a &&= (jn(this.#a), null), this.#o &&= (jn(this.#o), null), this.#s &&= (jn(this.#s), null), De && (Ae(this.#t), Me(), Ae(Ne()));
		let t = this.#n.failed, n = (e) => {
			let { reset: n, invoke_onerror: r } = this.#v(e);
			r(), t && (this.#s = this.#S(() => {
				try {
					return Dn(() => {
						var r = Kn;
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
	let i = Ge() ? vt : xt;
	var a = e.filter((e) => !e.settled), o = t.map(i);
	if (n.length === 0 && a.length === 0) {
		r(o);
		return;
	}
	var s = Kn, c = ht(), l = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((e) => e.promise)) : null;
	function u(e) {
		if (!(s.f & 16384)) {
			c();
			try {
				r([...o, ...e]);
			} catch (e) {
				Ze(e, s);
			}
			gt();
		}
	}
	var d = _t();
	if (n.length === 0) {
		l.then(() => u([])).finally(d);
		return;
	}
	function f() {
		Promise.all(n.map((e) => /* @__PURE__ */ bt(e))).then(u).catch((e) => Ze(e, s)).finally(d);
	}
	l ? l.then(() => {
		c(), f(), gt();
	}) : f();
}
function ht() {
	var e = Kn, t = Un, n = Ve, r = Ot;
	return function(i = !0) {
		qn(e), Gn(t), He(n), i && !(e.f & 16384) && (r?.activate(), r?.apply());
	};
}
function gt(e = !0) {
	qn(null), Gn(null), He(null), e && Ot?.deactivate();
}
function _t() {
	var e = Kn, t = e.b, n = Ot, r = !!t?.is_rendered();
	return t?.update_pending_count(1, n), n.increment(r, e), () => {
		t?.update_pending_count(-1, n), n.decrement(r, e);
	};
}
/*#__NO_SIDE_EFFECTS__*/
function vt(e) {
	var t = 2 | g;
	return Kn !== null && (Kn.f |= C), {
		ctx: Ve,
		deps: null,
		effects: null,
		equals: Fe,
		f: t,
		fn: e,
		reactions: null,
		rv: 0,
		v: xe,
		wv: 0,
		parent: Kn,
		ac: null
	};
}
var yt = Symbol("obsolete");
/*#__NO_SIDE_EFFECTS__*/
function bt(e, t, n) {
	let r = Kn;
	r === null && fe();
	var i = void 0, a = Yt(xe), o = !Un, s = /* @__PURE__ */ new Set();
	return wn(() => {
		var t = Kn, n = p();
		i = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, (e) => {
				e !== ue && n.reject(e);
			}).finally(gt);
		} catch (e) {
			n.reject(e), gt();
		}
		var c = Ot;
		if (o) {
			if (t.f & 32768) var l = _t();
			if (r.b?.is_rendered()) c.async_deriveds.get(t)?.reject(yt);
			else for (let e of s.values()) e.reject(yt);
			s.add(n), c.async_deriveds.set(t, n);
		}
		let u = (e, t = void 0) => {
			l?.(), s.delete(n), t !== yt && (c.activate(), t ? (a.f |= te, Zt(a, t)) : (a.f & 8388608 && (a.f ^= te), Zt(a, e)), c.deactivate());
		};
		n.promise.then(u, (e) => u(null, e || "unknown"));
	}), yn(() => {
		for (let e of s) e.reject(yt);
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
function P(e) {
	let t = /* @__PURE__ */ vt(e);
	return Yn(t), t;
}
/*#__NO_SIDE_EFFECTS__*/
function xt(e) {
	let t = /* @__PURE__ */ vt(e);
	return t.equals = Le, t;
}
function St(e) {
	var t = e.effects;
	if (t !== null) {
		e.effects = null;
		for (var n = 0; n < t.length; n += 1) jn(t[n]);
	}
}
function Ct(e) {
	var t, n = Kn, r = e.parent;
	if (!Vn && r !== null && e.v !== xe && r.f & 24576) return we(), e.v;
	qn(r);
	try {
		e.f &= ~E, St(e), t = sr(e);
	} finally {
		qn(n);
	}
	return t;
}
function wt(e) {
	var t = Ct(e);
	if (!e.equals(t) && (e.wv = ir(), (!Ot?.is_fork || e.deps === null) && (Ot === null ? e.v = t : (Ot.capture(e, t, !0), kt?.capture(e, t, !0)), e.deps === null))) {
		$e(e, h);
		return;
	}
	Vn || (At === null ? et(e) : (vn() || Ot?.is_fork) && At.set(e, t));
}
function Tt(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac !== null && lt(() => {
		t.ac.abort(ue), t.ac = null;
	}), t.fn !== null && (t.teardown = d), lr(t, 0), kn(t));
}
function Et(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && ur(t);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/batch.js
var Dt = null, Ot = null, kt = null, At = null, jt = null, Mt = !1, Nt = !1, Pt = null, Ft = null, It = 0, Lt = 1, Rt = class e {
	id = Lt++;
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
		Dt === null ? Dt = this : (Dt.#n = this, this.#t = Dt), Dt = this;
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
		this.#e = !0, It++ > 1e3 && (this.#x(), Bt());
		for (let e of this.#u) this.#d.delete(e), $e(e, g), this.schedule(e);
		for (let e of this.#d) $e(e, _), this.schedule(e);
		let t = this.#c;
		this.#c = [], this.apply();
		var n = Pt = [], r = [], i = Ft = [];
		for (let e of t) try {
			this.#_(e, n, r);
		} catch (t) {
			throw Gt(e), this.#h() || this.discard(), t;
		}
		if (Ot = null, i.length > 0) {
			var a = e.ensure();
			for (let e of i) a.schedule(e);
		}
		if (Pt = null, Ft = null, this.#h()) {
			this.#b(r), this.#b(n);
			for (let [e, t] of this.#f) Wt(e, t);
			i.length > 0 && Ot.#g();
			return;
		}
		let o = this.#v();
		if (o) {
			this.#b(r), this.#b(n), o.#y(this);
			return;
		}
		this.#u.clear(), this.#d.clear();
		for (let e of this.#r) e(this);
		this.#r.clear(), kt = this, Ht(r), Ht(n), kt = null, this.#s?.resolve();
		var s = Ot;
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
				a ? r.f ^= h : i & 4 ? t.push(r) : ar(r) && (i & 16 && this.#d.add(r), ur(r));
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
		this.oncommit(() => e.discard()), e.#x(), Ot = this, this.#g();
	}
	#b(e) {
		for (var t = 0; t < e.length; t += 1) nt(e[t], this.#u, this.#d);
	}
	capture(e, t, n = !1) {
		e.v !== xe && !this.previous.has(e) && this.previous.set(e, e.v), e.f & 8388608 || (this.current.set(e, [t, n]), At?.set(e, t)), this.is_fork || (e.v = t);
	}
	activate() {
		Ot = this;
	}
	deactivate() {
		Ot = null, At = null;
	}
	flush() {
		try {
			Nt = !0, Ot = this, this.#g();
		} finally {
			It = 0, jt = null, Pt = null, Ft = null, Nt = !1, Ot = null, At = null, qt.clear();
		}
	}
	discard() {
		for (let e of this.#i) e(this);
		this.#i.clear();
		for (let e of this.async_deriveds.values()) e.reject(yt);
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
		if (Ot === null) {
			let t = Ot = new e();
			!Nt && !Mt && Je(() => {
				t.#e || t.flush();
			});
		}
		return Ot;
	}
	apply() {
		At = null;
	}
	schedule(e) {
		if (jt = e, e.b?.is_pending && e.f & 16777228 && !(e.f & 32768)) {
			e.b.defer_effect(e);
			return;
		}
		for (var t = e; t.parent !== null;) {
			t = t.parent;
			var n = t.f;
			if (Pt !== null && t === Kn && (Un === null || !(Un.f & 2))) return;
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
			e === null || (e.#n = t), t === null ? Dt = e : t.#t = e, this.linked = !1;
		}
	}
};
function zt(e) {
	var t = Mt;
	Mt = !0;
	try {
		var n;
		for (e && (Ot !== null && !Ot.is_fork && Ot.flush(), n = e());;) {
			if (Ye(), Ot === null) return n;
			Ot.flush();
		}
	} finally {
		Mt = t;
	}
}
function Bt() {
	try {
		O();
	} catch (e) {
		Ze(e, jt);
	}
}
var Vt = null;
function Ht(e) {
	var t = e.length;
	if (t !== 0) {
		for (var n = 0; n < t;) {
			var r = e[n++];
			if (!(r.f & 24576) && ar(r) && (Vt = /* @__PURE__ */ new Set(), ur(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && Nn(r), Vt?.size > 0)) {
				qt.clear();
				for (let e of Vt) {
					if (e.f & 24576) continue;
					let t = [e], n = e.parent;
					for (; n !== null;) Vt.has(n) && (Vt.delete(n), t.push(n)), n = n.parent;
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || ur(n);
					}
				}
				Vt.clear();
			}
		}
		Vt = null;
	}
}
function Ut(e) {
	Ot.schedule(e);
}
function Wt(e, t) {
	if (!(e.f & 32 && e.f & 1024)) {
		e.f & 2048 ? t.d.push(e) : e.f & 4096 && t.m.push(e), $e(e, h);
		for (var n = e.first; n !== null;) Wt(n, t), n = n.next;
	}
}
function Gt(e) {
	$e(e, h);
	for (var t = e.first; t !== null;) Gt(t), t = t.next;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/sources.js
var Kt = /* @__PURE__ */ new Set(), qt = /* @__PURE__ */ new Map(), Jt = !1;
function Yt(e, t) {
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
function F(e, t) {
	let n = Yt(e, t);
	return Yn(n), n;
}
/*#__NO_SIDE_EFFECTS__*/
function Xt(e, t = !1, n = !0) {
	let r = Yt(e);
	return t || (r.equals = Le), r;
}
function I(e, t, n = !1) {
	return Un !== null && (!Wn || Un.f & 131072) && Ge() && Un.f & 4325394 && (Jn === null || !Jn.has(e)) && ve(), Zt(e, n ? tn(t) : t, Ft);
}
function Zt(e, t, n = null) {
	if (!e.equals(t)) {
		qt.set(e, Vn ? t : e.v);
		var r = Rt.ensure();
		if (r.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && Ct(t), At === null && et(t);
		}
		e.wv = ir(), en(e, g, n), Ge() && Kn !== null && Kn.f & 1024 && !(Kn.f & 96) && (Qn === null ? $n([e]) : Qn.push(e)), !r.is_fork && Kt.size > 0 && !Jt && Qt();
	}
	return t;
}
function Qt() {
	Jt = !1;
	for (let e of Kt) {
		e.f & 1024 && $e(e, _);
		let t;
		try {
			t = ar(e);
		} catch {
			t = !0;
		}
		t && ur(e);
	}
	Kt.clear();
}
function $t(e) {
	I(e, e.v + 1);
}
function en(e, t, n) {
	var r = e.reactions;
	if (r !== null) for (var i = Ge(), a = r.length, o = 0; o < a; o++) {
		var s = r[o], c = s.f;
		if (!(!i && s === Kn)) {
			var l = (c & g) === 0;
			if (l && $e(s, t), c & 131072) Kt.add(s);
			else if (c & 2) {
				var u = s;
				At?.delete(u), c & 65536 || (c & 512 && (Kn === null || !(Kn.f & 2097152)) && (s.f |= E), en(u, _, n));
			} else if (l) {
				var d = s;
				c & 16 && Vt !== null && Vt.add(d), n === null ? Ut(d) : n.push(d);
			}
		}
	}
}
function tn(t) {
	if (typeof t != "object" || !t || ne in t) return t;
	let n = l(t);
	if (n !== s && n !== c) return t;
	var r = /* @__PURE__ */ new Map(), i = e(t), o = /* @__PURE__ */ F(0), u = null, d = nr, f = (e) => {
		if (nr === d) return e();
		var t = Un, n = nr;
		Gn(null), rr(d);
		var r = e();
		return Gn(t), rr(n), r;
	};
	return i && r.set("length", /* @__PURE__ */ F(t.length, u)), new Proxy(t, {
		defineProperty(e, t, n) {
			(!("value" in n) || n.configurable === !1 || n.enumerable === !1 || n.writable === !1) && k();
			var i = r.get(t);
			return i === void 0 ? f(() => {
				var e = /* @__PURE__ */ F(n.value, u);
				return r.set(t, e), e;
			}) : I(i, n.value, !0), !0;
		},
		deleteProperty(e, t) {
			var n = r.get(t);
			if (n === void 0) {
				if (t in e) {
					let e = f(() => /* @__PURE__ */ F(xe, u));
					r.set(t, e), $t(o);
				}
			} else I(n, xe), $t(o);
			return !0;
		},
		get(e, n, i) {
			if (n === ne) return t;
			var o = r.get(n), s = n in e;
			if (o === void 0 && (!s || a(e, n)?.writable) && (o = f(() => /* @__PURE__ */ F(tn(s ? e[n] : xe), u)), r.set(n, o)), o !== void 0) {
				var c = V(o);
				return c === xe ? void 0 : c;
			}
			return Reflect.get(e, n, i);
		},
		getOwnPropertyDescriptor(e, t) {
			var n = Reflect.getOwnPropertyDescriptor(e, t);
			if (n && "value" in n) {
				var i = r.get(t);
				i && (n.value = V(i));
			} else if (n === void 0) {
				var a = r.get(t), o = a?.v;
				if (a !== void 0 && o !== xe) return {
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
			var n = r.get(t), i = n !== void 0 && n.v !== xe || Reflect.has(e, t);
			return (n !== void 0 || Kn !== null && (!i || a(e, t)?.writable)) && (n === void 0 && (n = f(() => /* @__PURE__ */ F(i ? tn(e[t]) : xe, u)), r.set(t, n)), V(n) === xe) ? !1 : i;
		},
		set(e, t, n, s) {
			var c = r.get(t), l = t in e;
			if (i && t === "length") for (var d = n; d < c.v; d += 1) {
				var p = r.get(d + "");
				p === void 0 ? d in e && (p = f(() => /* @__PURE__ */ F(xe, u)), r.set(d + "", p)) : I(p, xe);
			}
			if (c === void 0) (!l || a(e, t)?.writable) && (c = f(() => /* @__PURE__ */ F(void 0, u)), I(c, tn(n)), r.set(t, c));
			else {
				l = c.v !== xe;
				var m = f(() => tn(n));
				I(c, m);
			}
			var h = Reflect.getOwnPropertyDescriptor(e, t);
			if (h?.set && h.set.call(s, n), !l) {
				if (i && typeof t == "string") {
					var g = r.get("length"), _ = Number(t);
					Number.isInteger(_) && _ >= g.v && I(g, _ + 1);
				}
				$t(o);
			}
			return !0;
		},
		ownKeys(e) {
			V(o);
			var t = Reflect.ownKeys(e).filter((e) => {
				var t = r.get(e);
				return t === void 0 || t.v !== xe;
			});
			for (var [n, i] of r) i.v !== xe && !(n in e) && t.push(n);
			return t;
		},
		setPrototypeOf() {
			A();
		}
	});
}
var nn, rn, an, on;
function sn() {
	if (nn === void 0) {
		nn = window, rn = /Firefox/.test(navigator.userAgent);
		var e = Element.prototype, t = Node.prototype, n = Text.prototype;
		an = a(t, "firstChild").get, on = a(t, "nextSibling").get, u(e) && (e[oe] = void 0, e[ae] = null, e[se] = void 0, e.__e = void 0), u(n) && (n[ce] = void 0);
	}
}
function cn(e = "") {
	return document.createTextNode(e);
}
/*@__NO_SIDE_EFFECTS__*/
function ln(e) {
	return an.call(e);
}
/*@__NO_SIDE_EFFECTS__*/
function un(e) {
	return on.call(e);
}
function L(e, t) {
	if (!De) return /* @__PURE__ */ ln(e);
	var n = /* @__PURE__ */ ln(ke);
	if (n === null) n = ke.appendChild(cn());
	else if (t && n.nodeType !== 3) {
		var r = cn();
		return n?.before(r), Ae(r), r;
	}
	return t && mn(n), Ae(n), n;
}
function R(e, t = !1) {
	if (!De) {
		var n = /* @__PURE__ */ ln(e);
		return n instanceof Comment && n.data === "" ? /* @__PURE__ */ un(n) : n;
	}
	if (t) {
		if (ke?.nodeType !== 3) {
			var r = cn();
			return ke?.before(r), Ae(r), r;
		}
		mn(ke);
	}
	return ke;
}
function z(e, t = 1, n = !1) {
	let r = De ? ke : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ un(r);
	if (!De) return r;
	if (n) {
		if (r?.nodeType !== 3) {
			var a = cn();
			return r === null ? i?.after(a) : r.before(a), Ae(a), a;
		}
		mn(r);
	}
	return Ae(r), r;
}
function dn(e) {
	e.textContent = "";
}
function fn() {
	return !1;
}
function pn(e, t, n) {
	return t == null || t === "http://www.w3.org/1999/xhtml" ? n ? document.createElement(e, { is: n }) : document.createElement(e) : n ? document.createElementNS(t, e, { is: n }) : document.createElementNS(t, e);
}
function mn(e) {
	if (e.nodeValue.length < 65536) return;
	let t = e.nextSibling;
	for (; t !== null && t.nodeType === 3;) t.remove(), e.nodeValue += t.nodeValue, t = e.nextSibling;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/effects.js
function hn(e) {
	Kn === null && (Un === null && ge(e), he()), Vn && me(e);
}
function gn(e, t) {
	var n = t.last;
	n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function _n(e, t) {
	var n = Kn;
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
	Ot?.register_created_effect(r);
	var i = r;
	if (e & 4) Pt === null ? Rt.ensure().schedule(r) : Pt.push(r);
	else if (t !== null) {
		try {
			ur(r);
		} catch (e) {
			throw jn(r), e;
		}
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && (i = i.first, e & 16 && e & 65536 && i !== null && (i.f |= S));
	}
	if (i !== null && (i.parent = n, n !== null && gn(i, n), Un !== null && Un.f & 2 && !(e & 64))) {
		var a = Un;
		(a.effects ??= []).push(i);
	}
	return r;
}
function vn() {
	return Un !== null && !Wn;
}
function yn(e) {
	let t = _n(8, null);
	return $e(t, h), t.teardown = e, t;
}
function bn(e) {
	hn("$effect");
	var t = Kn.f;
	if (!Un && t & 32 && Ve !== null && !Ve.i) {
		var n = Ve;
		(n.e ??= []).push(e);
	} else return xn(e);
}
function xn(e) {
	return _n(4 | w, e);
}
function Sn(e) {
	Rt.ensure();
	let t = _n(64 | C, e);
	return (e = {}) => new Promise((n) => {
		e.outro ? Pn(t, () => {
			jn(t), n(void 0);
		}) : (jn(t), n(void 0));
	});
}
function Cn(e) {
	return _n(4, e);
}
function wn(e) {
	return _n(ee | C, e);
}
function Tn(e, t = 0) {
	return _n(8 | t, e);
}
function B(e, t = [], n = [], r = []) {
	mt(r, t, n, (t) => {
		_n(8, () => {
			e(...t.map(V));
		});
	});
}
function En(e, t = 0) {
	return _n(16 | t, e);
}
function Dn(e) {
	return _n(32 | C, e);
}
function On(e) {
	var t = e.teardown;
	if (t !== null) {
		let e = Vn, n = Un;
		Hn(!0), Gn(null);
		try {
			t.call(null);
		} finally {
			Hn(e), Gn(n);
		}
	}
}
function kn(e, t = !1) {
	var n = e.first;
	for (e.first = e.last = null; n !== null;) {
		let e = n.ac;
		e !== null && lt(() => {
			e.abort(ue);
		});
		var r = n.next;
		n.f & 64 ? n.parent = null : jn(n, t), n = r;
	}
}
function An(e) {
	for (var t = e.first; t !== null;) {
		var n = t.next;
		t.f & 32 || jn(t), t = n;
	}
}
function jn(e, t = !0) {
	var n = !1;
	(t || e.f & 262144) && e.nodes !== null && e.nodes.end !== null && (Mn(e.nodes.start, e.nodes.end), n = !0), e.f |= x, kn(e, t && !n), lr(e, 0);
	var r = e.nodes && e.nodes.t;
	if (r !== null) for (let e of r) e.stop();
	On(e), e.f ^= x, e.f |= y;
	var i = e.parent;
	i !== null && i.first !== null && Nn(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function Mn(e, t) {
	for (; e !== null;) {
		var n = e === t ? null : /* @__PURE__ */ un(e);
		e.remove(), e = n;
	}
}
function Nn(e) {
	var t = e.parent, n = e.prev, r = e.next;
	n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function Pn(e, t, n = !0) {
	var r = [];
	Fn(e, r, !0);
	var i = () => {
		n && jn(e), t && t();
	}, a = r.length;
	if (a > 0) {
		var o = () => --a || i();
		for (var s of r) s.out(o);
	} else i();
}
function Fn(e, t, n) {
	if (!(e.f & 8192)) {
		e.f ^= v;
		var r = e.nodes && e.nodes.t;
		if (r !== null) for (let e of r) (e.is_global || n) && t.push(e);
		for (var i = e.first; i !== null;) {
			var a = i.next;
			if (!(i.f & 64)) {
				var o = !!(i.f & 65536) || !!(i.f & 32) && !!(e.f & 16);
				Fn(i, t, o ? n : !1);
			}
			i = a;
		}
	}
}
function In(e) {
	Ln(e, !0);
}
function Ln(e, t) {
	if (e.f & 8192) {
		e.f ^= v, e.f & 1024 || ($e(e, g), Rt.ensure().schedule(e));
		for (var n = e.first; n !== null;) {
			var r = n.next, i = !!(n.f & 65536) || !!(n.f & 32);
			Ln(n, i ? t : !1), n = r;
		}
		var a = e.nodes && e.nodes.t;
		if (a !== null) for (let e of a) (e.is_global || t) && e.in();
	}
}
function Rn(e, t) {
	if (e.nodes) for (var n = e.nodes.start, r = e.nodes.end; n !== null;) {
		var i = n === r ? null : /* @__PURE__ */ un(n);
		t.append(n), n = i;
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/legacy.js
var zn = null, Bn = !1, Vn = !1;
function Hn(e) {
	Vn = e;
}
var Un = null, Wn = !1;
function Gn(e) {
	Un = e;
}
var Kn = null;
function qn(e) {
	Kn = e;
}
var Jn = null;
function Yn(e) {
	Un !== null && (Jn ??= /* @__PURE__ */ new Set()).add(e);
}
var Xn = null, Zn = 0, Qn = null;
function $n(e) {
	Qn = e;
}
var er = 1, tr = 0, nr = tr;
function rr(e) {
	nr = e;
}
function ir() {
	return ++er;
}
function ar(e) {
	var t = e.f;
	if (t & 2048) return !0;
	if (t & 2 && (e.f &= ~E), t & 4096) {
		for (var n = e.deps, r = n.length, i = 0; i < r; i++) {
			var a = n[i];
			if (ar(a) && wt(a), a.wv > e.wv) return !0;
		}
		t & 512 && At === null && $e(e, h);
	}
	return !1;
}
function or(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(Jn !== null && Jn.has(e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? or(a, t, !1) : t === a && (n ? $e(a, g) : a.f & 1024 && $e(a, _), Ut(a));
	}
}
function sr(e) {
	var t = Xn, n = Zn, r = Qn, i = Un, a = Jn, o = Ve, s = Wn, c = nr, l = e.f;
	Xn = null, Zn = 0, Qn = null, Un = l & 96 ? null : e, Jn = null, He(e.ctx), Wn = !1, nr = ++tr, e.ac !== null && (lt(() => {
		e.ac.abort(ue);
	}), e.ac = null);
	try {
		e.f |= D;
		var u = e.fn, d = u();
		e.f |= b;
		var f = e.deps, p = Ot?.is_fork;
		if (Xn !== null) {
			var m;
			if (p || lr(e, Zn), f !== null && Zn > 0) for (f.length = Zn + Xn.length, m = 0; m < Xn.length; m++) f[Zn + m] = Xn[m];
			else e.deps = f = Xn;
			if (vn() && e.f & 512) for (m = Zn; m < f.length; m++) (f[m].reactions ??= []).push(e);
		} else !p && f !== null && Zn < f.length && (lr(e, Zn), f.length = Zn);
		if (Ge() && Qn !== null && !Wn && f !== null && !(e.f & 6146)) for (m = 0; m < Qn.length; m++) or(Qn[m], e);
		if (i !== null && i !== e) {
			if (tr++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = tr;
			if (t !== null) for (let e of t) e.rv = tr;
			Qn !== null && (r === null ? r = Qn : r.push(...Qn));
		}
		return e.f & 8388608 && (e.f ^= te), d;
	} catch (e) {
		return Xe(e);
	} finally {
		e.f ^= D, Xn = t, Zn = n, Qn = r, Un = i, Jn = a, He(o), Wn = s, nr = c;
	}
}
function cr(e, r) {
	let i = r.reactions;
	if (i !== null) {
		var a = t.call(i, e);
		if (a !== -1) {
			var o = i.length - 1;
			o === 0 ? i = r.reactions = null : (i[a] = i[o], i.pop());
		}
	}
	if (i === null && r.f & 2 && (Xn === null || !n.call(Xn, r))) {
		var s = r;
		s.f & 512 && (s.f ^= 512, s.f &= ~E), s.v !== xe && et(s), s.ac !== null && lt(() => {
			s.ac.abort(ue), s.ac = null, $e(s, g);
		}), Tt(s), lr(s, 0);
	}
}
function lr(e, t) {
	var n = e.deps;
	if (n !== null) for (var r = t; r < n.length; r++) cr(e, n[r]);
}
function ur(e) {
	var t = e.f;
	if (!(t & 16384)) {
		$e(e, h);
		var n = Kn, r = Bn;
		Kn = e, Bn = !(t & 96);
		try {
			t & 16777232 ? An(e) : kn(e), On(e);
			var i = sr(e);
			e.teardown = typeof i == "function" ? i : null, e.wv = er;
		} finally {
			Bn = r, Kn = n;
		}
	}
}
async function dr() {
	await Promise.resolve(), zt();
}
function V(e) {
	var t = !!(e.f & 2);
	if (zn?.add(e), Un !== null && !Wn && !(Kn !== null && Kn.f & 16384) && (Jn === null || !Jn.has(e))) {
		var r = Un.deps;
		if (Un.f & 2097152) e.rv < tr && (e.rv = tr, Xn === null && r !== null && r[Zn] === e ? Zn++ : Xn === null ? Xn = [e] : Xn.push(e));
		else {
			Un.deps ??= [], n.call(Un.deps, e) || Un.deps.push(e);
			var i = e.reactions;
			i === null ? e.reactions = [Un] : n.call(i, Un) || i.push(Un);
		}
	}
	if (Vn && qt.has(e)) return qt.get(e);
	if (t) {
		var a = e;
		if (Vn) {
			var o = a.v;
			return (!(a.f & 1024) && a.reactions !== null || pr(a)) && (o = Ct(a)), qt.set(a, o), o;
		}
		var s = !(a.f & 512) && !Wn && Un !== null && (Bn || !!(Un.f & 512)), c = (a.f & b) === 0;
		ar(a) && (s && (a.f |= 512), wt(a)), s && !c && (Et(a), fr(a));
	}
	if (At?.has(e)) return At.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function fr(e) {
	if (e.f |= 512, e.deps !== null) for (let t of e.deps) (t.reactions ??= []).push(e), t.f & 2 && !(t.f & 512) && (Et(t), fr(t));
}
function pr(e) {
	if (e.v === xe) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if (qt.has(t) || t.f & 2 && pr(t)) return !0;
	return !1;
}
function mr(e) {
	var t = Wn;
	try {
		return Wn = !0, e();
	} finally {
		Wn = t;
	}
}
[.../* @__PURE__ */ "allowfullscreen.async.autofocus.autoplay.checked.controls.default.disabled.formnovalidate.indeterminate.inert.ismap.loop.multiple.muted.nomodule.novalidate.open.playsinline.readonly.required.reversed.seamless.selected.webkitdirectory.defer.disablepictureinpicture.disableremoteplayback".split(".")];
var hr = ["touchstart", "touchmove"];
function gr(e) {
	return hr.includes(e);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/events.js
var _r = Symbol("events"), vr = /* @__PURE__ */ new Set(), yr = /* @__PURE__ */ new Set();
function br(e) {
	if (!De) return;
	e.removeAttribute("onload"), e.removeAttribute("onerror");
	let t = e.__e;
	t !== void 0 && (e.__e = void 0, queueMicrotask(() => {
		e.isConnected && e.dispatchEvent(t);
	}));
}
function xr(e, t, n, r = {}) {
	function i(e) {
		if (r.capture || Tr.call(t, e), !e.cancelBubble) return lt(() => n?.call(this, e));
	}
	return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? Je(() => {
		t.addEventListener(e, i, r);
	}) : t.addEventListener(e, i, r), i;
}
function Sr(e, t, n, r, i) {
	var a = {
		capture: r,
		passive: i
	}, o = xr(e, t, n, a);
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && yn(() => {
		t.removeEventListener(e, o, a);
	});
}
function H(e, t, n) {
	(t[_r] ??= {})[e] = n;
}
function Cr(e) {
	for (var t = 0; t < e.length; t++) vr.add(e[t]);
	for (var n of yr) n(e);
}
var wr = null;
function Tr(e) {
	var t = this, n = t.ownerDocument, r = e.type, a = e.composedPath?.() || [], o = a[0] || e.target;
	wr = e;
	var s = 0, c = wr === e && e[_r];
	if (c) {
		var l = a.indexOf(c);
		if (l !== -1 && (t === document || t === window)) {
			e[_r] = t;
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
		var d = Un, f = Kn;
		Gn(null), qn(null);
		try {
			for (var p, m = []; o !== null && o !== t;) {
				try {
					var h = o[_r]?.[r];
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
			e[_r] = t, delete e.currentTarget, Gn(d), qn(f);
		}
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/reconciler.js
var Er = globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", { createHTML: (e) => e });
function Dr(e) {
	return Er?.createHTML(e) ?? e;
}
function Or(e) {
	var t = pn("template");
	return t.innerHTML = Dr(e.replaceAll("<!>", "<!---->")), t.content;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/template.js
function kr(e, t) {
	var n = Kn;
	n.nodes === null && (n.nodes = {
		start: e,
		end: t,
		a: null,
		t: null
	});
}
/*#__NO_SIDE_EFFECTS__*/
function U(e, t) {
	var n = !!(t & 1), r = !!(t & 2), i, a = !e.startsWith("<!>");
	return () => {
		if (De) return kr(ke, null), ke;
		i === void 0 && (i = Or(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ ln(i)));
		var t = r || rn ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ ln(t), s = t.lastChild;
			kr(o, s);
		} else kr(t, t);
		return t;
	};
}
function Ar(e = "") {
	if (!De) {
		var t = cn(e + "");
		return kr(t, t), t;
	}
	var n = ke;
	return n.nodeType === 3 ? mn(n) : (n.before(n = cn()), Ae(n)), kr(n, n), n;
}
function jr() {
	if (De) return kr(ke, null), ke;
	var e = document.createDocumentFragment(), t = document.createComment(""), n = cn();
	return e.append(t, n), kr(t, n), e;
}
function W(e, t) {
	if (De) {
		var n = Kn;
		(!(n.f & 32768) || n.nodes.end === null) && (n.nodes.end = ke), je();
		return;
	}
	e !== null && e.before(t);
}
function G(e, t) {
	var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
	n !== (e[ce] ??= e.nodeValue) && (e[ce] = n, e.nodeValue = `${n}`);
}
function Mr(e, t) {
	return Pr(e, t);
}
var Nr = /* @__PURE__ */ new Map();
function Pr(e, { target: t, anchor: n, props: i = {}, events: a, context: o, intro: s = !0, transformError: c }) {
	sn();
	var l = void 0, u = Sn(() => {
		var s = n ?? t.appendChild(cn());
		ft(s, { pending: () => {} }, (t) => {
			Ue({});
			var n = Ve;
			if (o && (n.c = o), a && (i.$$events = a), De && kr(t, null), l = e(t, i) || {}, De && (Kn.nodes.end = ke, ke === null || ke.nodeType !== 8 || ke.data !== "]")) throw Te(), be;
			We();
		}, c);
		var u = /* @__PURE__ */ new Set(), d = (e) => {
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				if (!u.has(r)) {
					u.add(r);
					var i = gr(r);
					for (let e of [t, document]) {
						var a = Nr.get(e);
						a === void 0 && (a = /* @__PURE__ */ new Map(), Nr.set(e, a));
						var o = a.get(r);
						o === void 0 ? (e.addEventListener(r, Tr, { passive: i }), a.set(r, 1)) : a.set(r, o + 1);
					}
				}
			}
		};
		return d(r(vr)), yr.add(d), () => {
			for (var e of u) for (let n of [t, document]) {
				var r = Nr.get(n), i = r.get(e);
				--i == 0 ? (n.removeEventListener(e, Tr), r.delete(e), r.size === 0 && Nr.delete(n)) : r.set(e, i);
			}
			yr.delete(d), s !== n && s.parentNode?.removeChild(s);
		};
	});
	return Fr.set(l, u), l;
}
var Fr = /* @__PURE__ */ new WeakMap(), Ir = class {
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
			if (n) In(n), this.#r.delete(t);
			else {
				var r = this.#n.get(t);
				r && (In(r.effect), this.#t.set(t, r.effect), this.#n.delete(t), r.fragment.lastChild.remove(), this.anchor.before(r.fragment), n = r.effect);
			}
			for (let [t, n] of this.#e) {
				if (this.#e.delete(t), t === e) break;
				let r = this.#n.get(n);
				r && (jn(r.effect), this.#n.delete(n));
			}
			for (let [e, r] of this.#t) {
				if (e === t || this.#r.has(e)) continue;
				let i = () => {
					if (Array.from(this.#e.values()).includes(e)) {
						var t = document.createDocumentFragment();
						Rn(r, t), t.append(cn()), this.#n.set(e, {
							effect: r,
							fragment: t
						});
					} else jn(r);
					this.#r.delete(e), this.#t.delete(e);
				};
				this.#i || !n ? (this.#r.add(e), Pn(r, i, !1)) : i();
			}
		}
	};
	#o = (e) => {
		this.#e.delete(e);
		let t = Array.from(this.#e.values());
		for (let [e, n] of this.#n) t.includes(e) || (jn(n.effect), this.#n.delete(e));
	};
	ensure(e, t) {
		var n = Ot, r = fn();
		if (t && !this.#t.has(e) && !this.#n.has(e)) if (r) {
			var i = document.createDocumentFragment(), a = cn();
			i.append(a), this.#n.set(e, {
				effect: Dn(() => t(a)),
				fragment: i
			});
		} else this.#t.set(e, Dn(() => t(this.anchor)));
		if (this.#e.set(n, e), r) {
			for (let [t, r] of this.#t) t === e ? n.unskip_effect(r) : n.skip_effect(r);
			for (let [t, r] of this.#n) t === e ? n.unskip_effect(r.effect) : n.skip_effect(r.effect);
			n.oncommit(this.#a), n.ondiscard(this.#o);
		} else De && (this.anchor = ke), this.#a(n);
	}
};
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/if.js
function K(e, t, n = !1) {
	var r;
	De && (r = ke, je());
	var i = new Ir(e), a = n ? S : 0;
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
	En(() => {
		var e = !1;
		t((t, n = 0) => {
			e = !0, o(n, t);
		}), e || o(-1, null);
	}, a);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/each.js
function Lr(e, t) {
	return t;
}
function Rr(e, t, n) {
	for (var i = [], a = t.length, o, s = t.length, c = 0; c < a; c++) {
		let n = t[c];
		Pn(n, () => {
			if (o) {
				if (o.pending.delete(n), o.done.add(n), o.pending.size === 0) {
					var t = e.outrogroups;
					q(e, r(o.done)), t.delete(o), t.size === 0 && (e.outrogroups = null);
				}
			} else --s;
		}, !1);
	}
	if (s === 0) {
		var l = i.length === 0 && n !== null;
		if (l) {
			var u = n, d = u.parentNode;
			dn(d), d.append(u), e.items.clear();
		}
		q(e, t, !l);
	} else o = {
		pending: new Set(t),
		done: /* @__PURE__ */ new Set()
	}, (e.outrogroups ??= /* @__PURE__ */ new Set()).add(o);
}
function q(e, t, n = !0) {
	var r;
	if (e.pending.size > 0) {
		r = /* @__PURE__ */ new Set();
		for (let t of e.pending.values()) for (let n of t) r.add(e.items.get(n).e);
	}
	for (var i = 0; i < t.length; i++) {
		var a = t[i];
		r?.has(a) ? (a.f |= T, Rn(a, document.createDocumentFragment())) : jn(t[i], n);
	}
}
var zr;
function Br(t, n, i, a, o, s = null) {
	var c = t, l = /* @__PURE__ */ new Map();
	if (n & 4) {
		var u = t;
		c = De ? Ae(/* @__PURE__ */ ln(u)) : u.appendChild(cn());
	}
	De && je();
	var d = null, f = /* @__PURE__ */ xt(() => {
		var t = i();
		return e(t) ? t : t == null ? [] : r(t);
	}), p, m = /* @__PURE__ */ new Map(), h = !0;
	function g(e) {
		v.effect.f & 16384 || (v.pending.delete(e), v.fallback = d, Hr(v, p, c, n, a), d !== null && (p.length === 0 ? d.f & 33554432 ? (d.f ^= T, Wr(d, null, c)) : In(d) : Pn(d, () => {
			d = null;
		})));
	}
	function _(e) {
		v.pending.delete(e);
	}
	var v = {
		effect: En(() => {
			p = V(f);
			var e = p.length;
			let t = !1;
			De && Pe(c) === "[!" != (e === 0) && (c = Ne(), Ae(c), Oe(!1), t = !0);
			for (var r = /* @__PURE__ */ new Set(), u = Ot, v = fn(), y = 0; y < e; y += 1) {
				De && ke.nodeType === 8 && ke.data === "]" && (c = ke, t = !0, Oe(!1));
				var b = p[y], x = a(b, y), S = h ? null : l.get(x);
				S ? (S.v && Zt(S.v, b), S.i && Zt(S.i, y), v && u.unskip_effect(S.e)) : (S = Ur(l, h ? c : zr ??= cn(), b, x, y, o, n, i), h || (S.e.f |= T), l.set(x, S)), r.add(x);
			}
			if (e === 0 && s && !d && (h ? d = Dn(() => s(c)) : (d = Dn(() => s(zr ??= cn())), d.f |= T)), e > r.size && pe("", "", ""), De && e > 0 && Ae(Ne()), !h) if (m.set(u, r), v) {
				for (let [e, t] of l) r.has(e) || u.skip_effect(t.e);
				u.oncommit(g), u.ondiscard(_);
			} else g(u);
			t && Oe(!0), V(f);
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
		if (_.f & 8192 && (In(_), o && (_.nodes?.a?.unfix(), (f ??= /* @__PURE__ */ new Set()).delete(_))), _.f & 33554432) if (_.f ^= T, _ === l) Wr(_, null, n);
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
		for (let t of e.outrogroups) t.pending.size === 0 && (q(e, r(t.done)), e.outrogroups?.delete(t));
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
			Rr(e, w, D);
		}
	}
	o && Je(() => {
		if (f !== void 0) for (_ of f) _.nodes?.a?.apply();
	});
}
function Ur(e, t, n, r, i, a, o, s) {
	var c = o & 1 ? o & 16 ? Yt(n) : /* @__PURE__ */ Xt(n, !1, !1) : null, l = o & 2 ? Yt(i) : null;
	return {
		v: c,
		i: l,
		e: Dn(() => (a(t, c ?? n, l ?? i, s), () => {
			e.delete(r);
		}))
	};
}
function Wr(e, t, n) {
	if (e.nodes) for (var r = e.nodes.start, i = e.nodes.end, a = t && !(t.f & 33554432) ? t.nodes.start : n; r !== null;) {
		var o = /* @__PURE__ */ un(r);
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
		De && (o = Ae(/* @__PURE__ */ ln(c)));
	}
	B(() => {
		var e = Kn;
		if (s === (s = t() ?? "")) {
			De && je();
			return;
		}
		if (n && !De) {
			e.nodes = null, c.innerHTML = s, s !== "" && kr(/* @__PURE__ */ ln(c), c.lastChild);
			return;
		}
		if (e.nodes !== null && (Mn(e.nodes.start, e.nodes.end), e.nodes = null), s !== "") {
			if (De) {
				for (var a = ke.data, l = je(), u = l; l !== null && (l.nodeType !== 8 || l.data !== "");) u = l, l = /* @__PURE__ */ un(l);
				if (l === null) throw Te(), be;
				kr(ke, u), o = Ae(l);
				return;
			}
			var d = pn(r ? "svg" : i ? "math" : "template", r ? Se : i ? Ce : void 0);
			d.innerHTML = s;
			var f = r || i ? d : d.content;
			if (kr(/* @__PURE__ */ ln(f), f.lastChild), r || i) for (; /* @__PURE__ */ ln(f);) o.before(/* @__PURE__ */ ln(f));
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
		[ti]: e.namespaceURI === j
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
	N(e, "input", async (i) => {
		var a = i ? e.defaultValue : e.value;
		if (a = li(e) ? ui(a) : a, n(a), Ot !== null && r.add(Ot), await dr(), a !== (a = t())) {
			var o = e.selectionStart, s = e.selectionEnd, c = e.value.length;
			if (e.value = a ?? "", s !== null) {
				var l = e.value.length;
				o === s && s === c && l > c ? (e.selectionStart = l, e.selectionEnd = l) : (e.selectionStart = o, e.selectionEnd = Math.min(s, l));
			}
		}
	}), (De && e.defaultValue !== e.value || mr(t) == null && e.value) && (n(li(e) ? ui(e.value) : e.value), Ot !== null && r.add(Ot)), Tn(() => {
		var n = t();
		if (e === document.activeElement) {
			var i = Ot;
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
	var i = Ve.r, a = Kn;
	return Cn(() => {
		var o, s;
		return Tn(() => {
			o = s, s = r?.() || [], mr(() => {
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
	var i = !0, o = !!(n & 8), s = !!(n & 16), c = r, l = !0, u = void 0, d = () => s && i ? (u ??= /* @__PURE__ */ vt(r), V(u)) : (l && (l = !1, c = s ? mr(r) : r), c);
	let f;
	if (o) {
		var p = ne in e || re in e;
		f = a(e, t)?.set ?? (p && t in e ? (n) => e[t] = n : void 0);
	}
	var m, h = !1;
	o ? [m, h] = it(() => e[t]) : m = e[t], m === void 0 && r !== void 0 && (m = d(), f && (i && _e(t), f(m)));
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
	var v = !1, y = (n & 1 ? vt : xt)(() => (v = !1, g()));
	o && V(y);
	var b = Kn;
	return (function(e, t) {
		if (arguments.length > 0) {
			let n = t ? V(y) : i && o ? tn(e) : e;
			return I(y, n), v = !0, c !== void 0 && (c = n), e;
		}
		return Vn && v || b.f & 16384 ? y.v : V(y);
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
var ji = /* @__PURE__ */ U("<button type=\"button\" class=\"cp-clear svelte-zxiloo\">×</button>"), Mi = /* @__PURE__ */ U("<button type=\"button\" class=\"cp-eye svelte-zxiloo\"><svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M18 2l4 4-3 3-4-4 3-3z\"></path><path d=\"M15 5L4 16l-1 5 5-1L19 9\"></path></svg></button>"), Ni = /* @__PURE__ */ U("<input type=\"number\" min=\"0\" max=\"255\" class=\"svelte-zxiloo\"/>"), Pi = /* @__PURE__ */ U("<button type=\"button\"></button>"), Fi = /* @__PURE__ */ U("<span class=\"cp-label svelte-zxiloo\"> <!></span> <span class=\"cp-tokens svelte-zxiloo\"></span>", 1), Ii = /* @__PURE__ */ U("<span class=\"cp-saved svelte-zxiloo\"><button type=\"button\" class=\"cp-token svelte-zxiloo\"></button> <button type=\"button\" class=\"cp-del svelte-zxiloo\">×</button></span>"), Li = /* @__PURE__ */ U("<span class=\"cp-tokens svelte-zxiloo\"></span>"), Ri = /* @__PURE__ */ U("<button type=\"button\" class=\"cp-token svelte-zxiloo\"></button>"), zi = /* @__PURE__ */ U("<span class=\"cp-label svelte-zxiloo\"> </span> <span class=\"cp-tokens svelte-zxiloo\"></span>", 1), Bi = /* @__PURE__ */ U("<div class=\"cp-pop svelte-zxiloo\"><div class=\"cp-sv svelte-zxiloo\"><span class=\"cp-cursor svelte-zxiloo\"></span></div> <input class=\"cp-hue svelte-zxiloo\" type=\"range\" min=\"0\" max=\"360\" step=\"1\"/> <input class=\"cp-alpha svelte-zxiloo\" type=\"range\" min=\"0\" max=\"100\" step=\"1\"/> <span class=\"cp-row svelte-zxiloo\"><span class=\"cp-preview svelte-zxiloo\"></span> <input class=\"cp-hex svelte-zxiloo\" spellcheck=\"false\"/> <!></span> <span class=\"cp-row cp-rgb svelte-zxiloo\"></span> <!> <span class=\"cp-label cp-label-row svelte-zxiloo\"> <button type=\"button\" class=\"cp-add svelte-zxiloo\">+</button></span> <!> <!></div>"), Vi = /* @__PURE__ */ U("<span class=\"cp svelte-zxiloo\"><button type=\"button\"></button> <!> <!></span>");
function Hi(e, t) {
	Ue(t, !0);
	let n = pi(t, "value", 3, "#000000"), r = pi(t, "tokens", 19, () => []), i = pi(t, "label", 19, () => Q("cp.pickColor")), a = pi(t, "allowClear", 3, !1), o = "urd-recent-colors", s = "urd-saved-colors", c = () => {
		let e = r().find(([e]) => e === n());
		return e ? e[1] : n();
	}, l = () => r().find(([e]) => e === n())?.[0] ?? null, u = /* @__PURE__ */ F(tn([])), d = /* @__PURE__ */ F(tn([])), f = "", p = "", h = /* @__PURE__ */ F(null), g = /* @__PURE__ */ F(!1), _ = /* @__PURE__ */ F(tn({
		top: 0,
		left: 0
	})), v = /* @__PURE__ */ F(0), y = /* @__PURE__ */ F(0), b = /* @__PURE__ */ F(1), x = /* @__PURE__ */ F(1), S = /* @__PURE__ */ F("#000000");
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
		return w(...E(V(v), V(y), V(b)));
	}
	function ee() {
		let e = D();
		return V(x) >= .995 ? e : e + Math.round(V(x) * 255).toString(16).padStart(2, "0");
	}
	function te() {
		I(S, ee(), !0), p = V(S), t.onchange?.(V(S));
	}
	function ne(e) {
		let t = C(e);
		return t ? (((e) => {
			var t = m(e, 3);
			I(v, t[0], !0), I(y, t[1], !0), I(b, t[2], !0);
		})(T(t[0], t[1], t[2])), I(x, t[3], !0), I(S, ee(), !0), !0) : !1;
	}
	function re() {
		ne(c()) || ne("#000000"), f = n(), p = "";
		try {
			let e = JSON.parse(localStorage.getItem(o) ?? "[]");
			I(u, Array.isArray(e) ? e : [], !0);
		} catch {
			I(u, [], !0);
		}
		try {
			let e = JSON.parse(localStorage.getItem(s) ?? "[]");
			I(d, Array.isArray(e) ? e : [], !0);
		} catch {
			I(d, [], !0);
		}
		let e = V(h).getBoundingClientRect(), t = V(h).closest(".panel-body")?.getBoundingClientRect(), r = t ? t.right : window.innerWidth, i = Math.max(8, Math.min(e.right - 236, r - 236 - 8)), a = e.bottom + 380 + 8 > window.innerHeight ? Math.max(8, e.top - 380 - 8) : e.bottom + 6;
		I(_, {
			top: a,
			left: i
		}, !0), I(g, !0);
	}
	function ie() {
		if (I(g, !1), p && p !== f) {
			let e = [p, ...V(u).filter((e) => e !== p)].slice(0, 8);
			localStorage.setItem(o, JSON.stringify(e));
		}
	}
	function ae(e, n) {
		ne(n), I(S, n, !0), t.onchange?.(e);
	}
	function oe(e) {
		let t = e.currentTarget;
		t.setPointerCapture(e.pointerId);
		let n = (e) => {
			let n = t.getBoundingClientRect();
			I(y, Math.min(1, Math.max(0, (e.clientX - n.left) / n.width)), !0), I(b, 1 - Math.min(1, Math.max(0, (e.clientY - n.top) / n.height))), te();
		};
		n(e);
		let r = (e) => n(e), i = () => {
			t.removeEventListener("pointermove", r), t.removeEventListener("pointerup", i);
		};
		t.addEventListener("pointermove", r), t.addEventListener("pointerup", i);
	}
	function se(e) {
		ne(e.target.value) ? te() : I(S, D(), !0);
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
			I(v, t[0], !0), I(y, t[1], !0), I(b, t[2], !0);
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
		V(d).includes(e) || (I(d, [e, ...V(d)].slice(0, 12), !0), localStorage.setItem(s, JSON.stringify(ze(V(d)))));
	}
	function me(e) {
		I(d, V(d).filter((t) => t !== e), !0), localStorage.setItem(s, JSON.stringify(ze(V(d))));
	}
	bn(() => {
		if (!V(g)) return;
		let e = (e) => {
			V(h) && !V(h).contains(e.target) && ie();
		}, t = (e) => {
			e.key === "Escape" && ie();
		}, n = () => ie();
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t, !0), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t, !0), window.removeEventListener("blur", n);
		};
	});
	var he = Vi(), ge = L(he);
	let O;
	var _e = z(ge, 2), k = (e) => {
		var n = ji();
		B((e, t) => {
			Z(n, "title", e), Z(n, "aria-label", t);
		}, [() => Q("cp.clearTitle"), () => Q("cp.clear")]), H("click", n, () => t.onchange?.("")), W(e, n);
	};
	K(_e, (e) => {
		a() && n() && e(k);
	});
	var A = z(_e, 2), ve = (e) => {
		var t = Bi(), i = L(t), a = L(i);
		M(i);
		var o = z(i, 2);
		Y(o);
		var s = z(o, 2);
		Y(s);
		var c = z(s, 2), f = L(c), p = z(f, 2);
		Y(p);
		var h = z(p, 2), g = (e) => {
			var t = Mi();
			B((e) => Z(t, "title", e), [() => Q("cp.eyedropper")]), H("click", t, de), W(e, t);
		};
		K(h, (e) => {
			ue && e(g);
		}), M(c);
		var C = z(c, 2);
		Br(C, 22, () => [
			"R",
			"G",
			"B"
		], (e) => e, (e, t, n) => {
			var r = Ni();
			Y(r), B((e) => {
				Z(r, "title", t), X(r, e);
			}, [() => ce(V(n))]), H("change", r, (e) => le(V(n), e.target.value)), W(e, r);
		}), M(C);
		var w = z(C, 2), T = (e) => {
			var t = Fi(), i = R(t), a = L(i, !0), o = z(a), s = (e) => {
				var t = Ar();
				B((e) => G(t, e), [() => Q("cp.linkedSuffix", { token: l() })]), W(e, t);
			}, c = /* @__PURE__ */ P(() => l());
			K(o, (e) => {
				V(c) && e(s);
			}), M(i);
			var u = z(i, 2);
			Br(u, 21, r, ([e, t]) => e, (e, t) => {
				var r = /* @__PURE__ */ P(() => m(V(t), 2));
				let i = () => V(r)[0], a = () => V(r)[1];
				var o = Pi();
				let s;
				B((e) => {
					s = Zr(o, 1, "cp-token svelte-zxiloo", null, s, { active: n() === i() }), $r(o, `background: ${a() ?? ""}`), Z(o, "title", e);
				}, [() => Q("cp.tokenTitle", { name: i() })]), H("click", o, () => ae(i(), a())), W(e, o);
			}), M(u), B((e) => G(a, e), [() => Q("cp.themeColors")]), W(e, t);
		};
		K(w, (e) => {
			r().length && e(T);
		});
		var E = z(w, 2), ee = L(E), ne = z(ee);
		M(E);
		var re = z(E, 2), ie = (e) => {
			var t = Li();
			Br(t, 20, () => V(d), (e) => e, (e, t) => {
				var n = Ii(), r = L(n), i = z(r, 2);
				M(n), B((e) => {
					$r(r, `background: ${t ?? ""}`), Z(r, "title", t), Z(i, "title", e);
				}, [() => Q("cp.removeSaved")]), H("click", r, () => fe(t)), H("click", i, () => me(t)), W(e, n);
			}), M(t), W(e, t);
		};
		K(re, (e) => {
			V(d).length && e(ie);
		});
		var he = z(re, 2), ge = (e) => {
			var t = zi(), n = R(t), r = L(n, !0);
			M(n);
			var i = z(n, 2);
			Br(i, 20, () => V(u), (e) => e, (e, t) => {
				var n = Ri();
				B(() => {
					$r(n, `background: ${t ?? ""}`), Z(n, "title", t);
				}), H("click", n, () => fe(t)), W(e, n);
			}), M(i), B((e) => G(r, e), [() => Q("common.recent")]), W(e, t);
		};
		K(he, (e) => {
			V(u).length && e(ge);
		}), M(t), B((e, n, r, c, l) => {
			$r(t, `top: ${V(_).top ?? ""}px; left: ${V(_).left ?? ""}px`), $r(i, `background-image: linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent); background-color: hsl(${V(v) ?? ""}, 100%, 50%)`), $r(a, `left: ${V(y) * 100}%; top: ${(1 - V(b)) * 100}%`), X(o, V(v)), X(s, e), Z(s, "title", n), $r(s, `background: linear-gradient(to right, transparent, ${r ?? ""}), repeating-conic-gradient(rgb(255 255 255 / 35%) 0 25%, rgb(0 0 0 / 35%) 0 50%) 0 0 / 10px 10px`), $r(f, `background: ${V(S) ?? ""}`), X(p, V(S)), G(ee, `${c ?? ""} `), Z(ne, "title", l);
		}, [
			() => Math.round(V(x) * 100),
			() => Q("cp.alpha"),
			() => D(),
			() => Q("cp.saved"),
			() => Q("cp.saveTitle")
		]), H("click", t, (e) => e.preventDefault()), H("pointerdown", i, oe), H("input", o, (e) => {
			I(v, Number(e.target.value), !0), te();
		}), H("input", s, (e) => {
			I(x, Number(e.target.value) / 100), te();
		}), H("change", p, se), H("click", ne, pe), W(e, t);
	};
	K(A, (e) => {
		V(g) && e(ve);
	}), M(he), fi(he, (e) => I(h, e), () => V(h)), B((e, t, n) => {
		O = Zr(ge, 1, "cp-swatch svelte-zxiloo", null, O, e), $r(ge, `background: ${t ?? ""}`), Z(ge, "title", n), Z(ge, "aria-label", i());
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
	]), H("click", ge, () => V(g) ? ie() : re()), W(e, he), We();
}
Cr([
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
var da = /* @__PURE__ */ U("<img class=\"gp-own svelte-15ln1c3\"/>"), fa = /* @__PURE__ */ U("<span class=\"gp-svg svelte-15ln1c3\"></span>"), pa = /* @__PURE__ */ U("<button type=\"button\" class=\"gp-cell svelte-15ln1c3\"> </button>"), ma = /* @__PURE__ */ U("<div class=\"gp-group svelte-15ln1c3\"> </div> <div class=\"gp-grid svelte-15ln1c3\"></div>", 1), ha = /* @__PURE__ */ U("<button type=\"button\"><span class=\"gp-svg svelte-15ln1c3\"></span></button>"), ga = /* @__PURE__ */ U("<button type=\"button\"> </button>"), _a = /* @__PURE__ */ U("<div class=\"gp-group svelte-15ln1c3\"> </div> <button type=\"button\" class=\"ghost gp-upload svelte-15ln1c3\"> </button> <input type=\"file\" accept=\"image/*\" hidden=\"\"/> <p class=\"gp-hint svelte-15ln1c3\"> </p>", 1), va = /* @__PURE__ */ U("<div class=\"gp-pop svelte-15ln1c3\"><!> <!> <!> <!></div>"), ya = /* @__PURE__ */ U("<span class=\"gp svelte-15ln1c3\"><button type=\"button\" class=\"gp-swatch svelte-15ln1c3\"><!></button> <!></span>");
function ba(e, t) {
	Ue(t, !0);
	let n = pi(t, "value", 3, "★"), r = pi(t, "icon", 3, null), i = pi(t, "image", 3, null), a = pi(t, "label", 19, () => Q("gp.pickGlyph")), o = /* @__PURE__ */ F(tn([])), s = /* @__PURE__ */ F(null), c = /* @__PURE__ */ F(null), l = /* @__PURE__ */ F(!1), u = /* @__PURE__ */ F(tn({
		top: 0,
		left: 0
	}));
	function d() {
		I(o, ia(), !0);
		let e = V(s).getBoundingClientRect(), t = Math.max(8, Math.min(e.right - 292, window.innerWidth - 292 - 8)), n = e.bottom + 380 + 8 > window.innerHeight ? Math.max(8, e.top - 380 - 8) : e.bottom + 6;
		I(u, {
			top: n,
			left: t
		}, !0), I(l, !0);
	}
	function f(e) {
		aa(e), t.onpick?.(e), I(l, !1);
	}
	function p(e) {
		t.onicon?.(e), I(l, !1);
	}
	async function h(e) {
		let n = e.target.files?.[0];
		if (e.target.value = "", !n) return;
		let r = await Ki(n, 256);
		t.onimage?.(r.dataUrl), I(l, !1);
	}
	bn(() => {
		if (!V(l)) return;
		let e = (e) => {
			V(s) && !V(s).contains(e.target) && I(l, !1);
		}, t = (e) => {
			e.key === "Escape" && I(l, !1);
		}, n = (e) => {
			V(s) && e.target instanceof Node && !V(s).contains(e.target) && I(l, !1);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t, !0), document.addEventListener("scroll", n, !0), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t, !0), document.removeEventListener("scroll", n, !0);
		};
	});
	var g = ya(), _ = L(g), v = L(_), y = (e) => {
		var t = da();
		B((e) => {
			Z(t, "src", i()), Z(t, "alt", e);
		}, [() => Q("gp.ownIcon")]), W(e, t);
	}, b = (e) => {
		var t = fa();
		J(t, () => ua(r()), !0), M(t), W(e, t);
	}, x = (e) => {
		var t = Ar();
		B(() => G(t, n() || "★")), W(e, t);
	};
	K(v, (e) => {
		i() ? e(y) : r() && ca[r()] ? e(b, 1) : e(x, -1);
	}), M(_);
	var S = z(_, 2), C = (e) => {
		var i = va(), a = L(i), s = (e) => {
			var t = ma(), n = R(t), r = L(n, !0);
			M(n);
			var i = z(n, 2);
			Br(i, 20, () => V(o), (e) => e, (e, t) => {
				var n = pa(), r = L(n, !0);
				M(n), B(() => G(r, t)), H("click", n, () => f(t)), W(e, n);
			}), M(i), B((e) => G(r, e), [() => Q("common.recent")]), W(e, t);
		};
		K(a, (e) => {
			V(o).length && e(s);
		});
		var l = z(a, 2), d = (e) => {
			var t = jr();
			Br(R(t), 17, () => la, ([e, t]) => e, (e, t) => {
				var n = /* @__PURE__ */ P(() => m(V(t), 2));
				let i = () => V(n)[0], a = () => V(n)[1];
				var o = ma(), s = R(o), c = L(s, !0);
				M(s);
				var l = z(s, 2);
				Br(l, 20, a, (e) => e, (e, t) => {
					var n = ha();
					let i;
					var a = L(n);
					J(a, () => ua(t), !0), M(a), M(n), B(() => {
						i = Zr(n, 1, "gp-cell gp-cell-icon svelte-15ln1c3", null, i, { active: t === r() }), Z(n, "title", ca[t].label);
					}), H("click", n, () => p(t)), W(e, n);
				}), M(l), B((e) => G(c, e), [() => Q(i())]), W(e, o);
			}), W(e, t);
		};
		K(l, (e) => {
			t.onicon && e(d);
		});
		var g = z(l, 2);
		Br(g, 17, () => na, ([e, t]) => e, (e, t) => {
			var r = /* @__PURE__ */ P(() => m(V(t), 2));
			let i = () => V(r)[0], a = () => V(r)[1];
			var o = ma(), s = R(o), c = L(s, !0);
			M(s);
			var l = z(s, 2);
			Br(l, 20, () => a().split(" "), (e) => e, (e, t) => {
				var r = ga();
				let i;
				var a = L(r, !0);
				M(r), B(() => {
					i = Zr(r, 1, "gp-cell svelte-15ln1c3", null, i, { active: t === n() }), G(a, t);
				}), H("click", r, () => f(t)), W(e, r);
			}), M(l), B((e) => G(c, e), [() => Q(i())]), W(e, o);
		});
		var _ = z(g, 2), v = (e) => {
			var t = _a(), n = R(t), r = L(n, !0);
			M(n);
			var i = z(n, 2), a = L(i, !0);
			M(i);
			var o = z(i, 2);
			fi(o, (e) => I(c, e), () => V(c));
			var s = z(o, 2), l = L(s, !0);
			M(s), B((e, t, n) => {
				G(r, e), G(a, t), G(l, n);
			}, [
				() => Q("gp.ownIcon"),
				() => Q("gp.upload"),
				() => Q("gp.uploadHint")
			]), H("click", i, () => V(c).click()), H("change", o, h), W(e, t);
		};
		K(_, (e) => {
			t.onimage && e(v);
		}), M(i), B(() => $r(i, `top: ${V(u).top ?? ""}px; left: ${V(u).left ?? ""}px`)), W(e, i);
	};
	K(S, (e) => {
		V(l) && e(C);
	}), M(g), fi(g, (e) => I(s, e), () => V(s)), B(() => {
		Z(_, "title", a()), Z(_, "aria-label", a());
	}), H("click", _, () => V(l) ? I(l, !1) : d()), W(e, g), We();
}
Cr(["click", "change"]);
//#endregion
//#region src/lib/previewBridge.js
function xa(e, t = {}) {
	let n = (e) => {
		if (e.origin !== location.origin) return;
		let n = e.data;
		n?.type === "urd-edit" && t.onEdit?.(n), n?.type === "urd-move" && t.onMove?.(n), n?.type === "urd-grow" && t.onGrow?.(n), n?.type === "urd-delete" && t.onDelete?.(n), n?.type === "urd-add-section" && t.onAddSection?.(n), n?.type === "urd-move-section" && t.onMoveSection?.(n), n?.type === "urd-delete-section" && t.onDeleteSection?.(n), n?.type === "urd-section-size" && t.onSectionSize?.(n), n?.type === "urd-undo" && t.onUndo?.(n), n?.type === "urd-select-section" && t.onSelectSection?.(n), n?.type === "urd-select-block" && t.onSelectBlock?.(n), n?.type === "urd-block-menu" && t.onBlockMenu?.(n), n?.type === "urd-plugin-blocks" && t.onPluginBlocks?.(n), n?.type === "urd-ready" && t.onReady?.(n), n?.type === "urd-navigate" && t.onNavigate?.(n), n?.type === "urd-add-block" && t.onAddBlock?.(n), n?.type === "urd-add-blocks" && t.onAddBlocks?.(n), n?.type === "urd-request-block" && t.onRequestBlock?.(n), n?.type === "urd-move-block-section" && t.onMoveBlockSection?.(n), n?.type === "urd-mobile-manual" && t.onMobileManual?.(n), n?.type === "urd-mobile-auto" && t.onMobileAuto?.(n), n?.type === "urd-review-done" && t.onReviewDone?.(n), n?.type === "urd-block-flag" && t.onBlockFlag?.(n), n?.type === "urd-collection-edit" && t.onCollectionEdit?.(n), n?.type === "urd-nav-width" && t.onNavWidth?.(n), n?.type === "urd-save-template" && t.onSaveTemplate?.(n), n?.type === "urd-delete-template" && t.onDeleteTemplate?.(n), n?.type === "urd-apply-layout" && t.onApplyLayout?.(n);
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
var wa = /* @__PURE__ */ U("<button type=\"button\"> </button>"), Ta = /* @__PURE__ */ U("<div class=\"dd-pop svelte-vtocc6\"></div>"), Ea = /* @__PURE__ */ U("<span class=\"dd svelte-vtocc6\"><button type=\"button\" class=\"dd-btn svelte-vtocc6\"><span class=\"dd-value svelte-vtocc6\"> </span> <span class=\"dd-caret svelte-vtocc6\"> </span></button> <!></span>");
function $(e, t) {
	Ue(t, !0);
	let n = pi(t, "value", 3, null), r = pi(t, "options", 19, () => []), i = pi(t, "title", 3, null), a = pi(t, "disabled", 3, !1), o = /* @__PURE__ */ F(!1), s = /* @__PURE__ */ F(null), c = /* @__PURE__ */ F(tn({
		top: 0,
		left: 0,
		width: 160
	})), l = () => r().find(([e]) => `${e ?? ""}` == `${n() ?? ""}`)?.[1] ?? "";
	function u() {
		let e = V(s).getBoundingClientRect(), t = Math.min(320, r().length * 32 + 12), n = Math.max(e.width, 160), i = e.bottom + t + 8 <= window.innerHeight;
		I(c, {
			top: i ? e.bottom + 4 : Math.max(8, e.top - t - 4),
			left: Math.max(8, Math.min(e.left, window.innerWidth - n - 8)),
			width: n
		}, !0);
	}
	function d() {
		if (!a()) {
			if (V(o)) {
				I(o, !1);
				return;
			}
			u(), I(o, !0);
		}
	}
	function f(e) {
		I(o, !1), t.onchange?.(e);
	}
	bn(() => {
		if (!V(o)) return;
		let e = (e) => {
			V(s) && !V(s).contains(e.target) && I(o, !1);
		}, t = (e) => {
			e.key === "Escape" && I(o, !1);
		}, n = (e) => {
			V(s) && e.target instanceof Node && !V(s).contains(e.target) && u();
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t, !0), document.addEventListener("scroll", n, !0), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t, !0), document.removeEventListener("scroll", n, !0);
		};
	});
	var p = Ea(), h = L(p), g = L(h), _ = L(g, !0);
	M(g);
	var v = z(g, 2), y = L(v, !0);
	M(v), M(h);
	var b = z(h, 2), x = (e) => {
		var t = Ta();
		Br(t, 21, r, ([e, t]) => `${e ?? ""}`, (e, t) => {
			var r = /* @__PURE__ */ P(() => m(V(t), 2));
			let i = () => V(r)[0], a = () => V(r)[1];
			var o = wa();
			let s;
			var c = L(o, !0);
			M(o), B(() => {
				s = Zr(o, 1, "dd-opt svelte-vtocc6", null, s, { valgt: `${i() ?? ""}` == `${n() ?? ""}` }), G(c, a());
			}), H("click", o, () => f(i())), W(e, o);
		}), M(t), B(() => $r(t, `top: ${V(c).top ?? ""}px; left: ${V(c).left ?? ""}px; min-width: ${V(c).width ?? ""}px`)), W(e, t);
	};
	K(b, (e) => {
		V(o) && e(x);
	}), M(p), fi(p, (e) => I(s, e), () => V(s)), B((e) => {
		Z(h, "title", i()), h.disabled = a(), G(_, e), G(y, V(o) ? "▴" : "▾");
	}, [() => l()]), H("click", h, d), W(e, p), We();
}
Cr(["click"]);
//#endregion
//#region src/lib/IconEditor.svelte
var Da = /* @__PURE__ */ U("<div class=\"ie-overlay svelte-e7sog7\" role=\"dialog\" aria-modal=\"true\"><div class=\"ie-card svelte-e7sog7\"><h2 class=\"svelte-e7sog7\"> </h2> <div class=\"ie-stage svelte-e7sog7\"><canvas class=\"ie-canvas svelte-e7sog7\"></canvas> <p class=\"ie-hint svelte-e7sog7\"> </p></div> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"1\" max=\"3\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0.3\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0.3\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <span class=\"ie-tools svelte-e7sog7\"><button type=\"button\" class=\"ghost svelte-e7sog7\"> </button> <button type=\"button\" class=\"ghost svelte-e7sog7\"> </button></span> <span class=\"ie-actions svelte-e7sog7\"><button type=\"button\" class=\"ghost svelte-e7sog7\"> </button> <button type=\"button\" class=\"primary svelte-e7sog7\"> </button></span></div></div>");
function Oa(e, t) {
	Ue(t, !0);
	let n = pi(t, "image", 3, ""), r = /* @__PURE__ */ F(null), i = /* @__PURE__ */ F(null), a = /* @__PURE__ */ F(1), o = /* @__PURE__ */ F(.5), s = /* @__PURE__ */ F(.5), c = /* @__PURE__ */ F(1), l = /* @__PURE__ */ F(1), u = /* @__PURE__ */ F(1);
	bn(() => {
		if (!n()) return;
		let e = new Image();
		e.onload = () => {
			I(i, e, !0);
		}, e.src = n();
	});
	function d(e, t) {
		if (e.clearRect(0, 0, t, t), !V(i)) return;
		e.filter = `brightness(${V(c)}) contrast(${V(l)}) saturate(${V(u)})`;
		let n = Math.max(t / V(i).width, t / V(i).height) * V(a), r = V(i).width * n, d = V(i).height * n, f = t / 2 - V(o) * r, p = t / 2 - V(s) * d;
		f = Math.min(0, Math.max(t - r, f)), p = Math.min(0, Math.max(t - d, p)), e.drawImage(V(i), f, p, r, d), e.filter = "none";
	}
	bn(() => {
		V(i), V(a), V(o), V(s), V(c), V(l), V(u), V(r) && d(V(r).getContext("2d"), 220);
	});
	function f(e) {
		if (!V(i)) return;
		e.preventDefault();
		let t = e.clientX, n = e.clientY, r = Math.max(220 / V(i).width, 220 / V(i).height) * V(a), c = V(i).width * r, l = V(i).height * r, u = (e) => {
			I(o, Math.min(1, Math.max(0, V(o) - (e.clientX - t) / c)), !0), I(s, Math.min(1, Math.max(0, V(s) - (e.clientY - n) / l)), !0), t = e.clientX, n = e.clientY;
		}, d = () => {
			window.removeEventListener("pointermove", u), window.removeEventListener("pointerup", d);
		};
		window.addEventListener("pointermove", u), window.addEventListener("pointerup", d);
	}
	function p() {
		I(a, 1), I(o, .5), I(s, .5), I(c, 1), I(l, 1), I(u, 1);
	}
	function m() {
		let e = document.createElement("canvas");
		e.width = 128, e.height = 128, d(e.getContext("2d"), 128), t.onapply?.(e.toDataURL("image/webp", .92));
	}
	var h = Da(), g = L(h), _ = L(g), v = L(_, !0);
	M(_);
	var y = z(_, 2), b = L(y);
	Z(b, "width", 220), Z(b, "height", 220), fi(b, (e) => I(r, e), () => V(r));
	var x = z(b, 2), S = L(x, !0);
	M(x), M(y);
	var C = z(y, 2), w = L(C), T = z(w), E = L(T);
	M(T), M(C);
	var D = z(C, 2);
	Y(D);
	var ee = z(D, 2), te = L(ee), ne = z(te), re = L(ne);
	M(ne), M(ee);
	var ie = z(ee, 2);
	Y(ie);
	var ae = z(ie, 2), oe = L(ae), se = z(oe), ce = L(se);
	M(se), M(ae);
	var le = z(ae, 2);
	Y(le);
	var ue = z(le, 2), de = L(ue), fe = z(de), pe = L(fe);
	M(fe), M(ue);
	var me = z(ue, 2);
	Y(me);
	var he = z(me, 2), ge = L(he), O = L(ge, !0);
	M(ge);
	var _e = z(ge, 2), k = L(_e, !0);
	M(_e), M(he);
	var A = z(he, 2), ve = L(A), ye = L(ve, !0);
	M(ve);
	var be = z(ve, 2), xe = L(be, !0);
	M(be), M(A), M(g), M(h), B((e, t, n, r, i, a, o, s, c, l, u, d, f, p, m) => {
		G(v, e), Z(b, "title", t), G(S, n), G(w, `${r ?? ""} `), G(E, `${i ?? ""}x`), G(te, `${a ?? ""} `), G(re, `${o ?? ""}%`), G(oe, `${s ?? ""} `), G(ce, `${c ?? ""}%`), G(de, `${l ?? ""} `), G(pe, `${u ?? ""}%`), G(O, d), G(k, f), G(ye, p), G(xe, m);
	}, [
		() => Q("ie.title"),
		() => Q("ie.dragTip"),
		() => Q("ie.hint"),
		() => Q("lbl.zoom"),
		() => V(a).toFixed(2),
		() => Q("lbl.brightness"),
		() => Math.round(V(c) * 100),
		() => Q("lbl.contrast"),
		() => Math.round(V(l) * 100),
		() => Q("lbl.saturate"),
		() => Math.round(V(u) * 100),
		() => Q("ie.grayscale"),
		() => Q("common.reset"),
		() => Q("confirm.cancel"),
		() => Q("common.apply")
	]), H("pointerdown", b, f), ci(D, () => V(a), (e) => I(a, e)), ci(ie, () => V(c), (e) => I(c, e)), ci(le, () => V(l), (e) => I(l, e)), ci(me, () => V(u), (e) => I(u, e)), H("click", ge, () => I(u, 0)), H("click", _e, p), H("click", ve, () => t.oncancel?.()), H("click", be, m), W(e, h), We();
}
Cr(["pointerdown", "click"]);
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
var za = [
	"section",
	"blocks",
	"page"
];
function Ba(e) {
	return $i(String(e ?? ""), "");
}
function Va(e, t, { id: n, title: r }) {
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
//#region ../template/assets/engine/0.6.10/preset-thumb.js
var Ha = /^#[0-9a-fA-F]{3,8}$/, Ua = /^[a-z][a-z0-9-]*$/, Wa = "#171c26", Ga = "#232a38", Ka = "#98a1b3", qa = "#7c5cff", Ja = (e, t) => `var(--urd-color-${e}, ${t})`;
function Ya(e, t) {
	return typeof e == "string" ? Ha.test(e) ? e : Ua.test(e) ? Ja(e, t) : t : t;
}
function Xa(e, t = 800) {
	let n = Number.parseFloat(e);
	return !Number.isFinite(n) || n <= 0 ? 400 : typeof e == "string" && e.trim().endsWith("vh") ? n / 100 * t : n;
}
var Za = (e) => Math.round(e * 10) / 10, Qa = (e, t, n) => Math.min(n, Math.max(t, e)), $a = (e, t, n, r, i, a = "") => `<rect x="${Za(e)}" y="${Za(t)}" width="${Za(Math.max(n, 1))}" height="${Za(Math.max(r, 1))}" fill="${i}"${a}/>`;
function eo(e) {
	for (let t of e?.background?.layers ?? []) {
		if (t.type === "color") return Ya(t.props?.value, Wa);
		if (t.type === "gradient") return Ya(Array.isArray(t.props?.stops) ? t.props.stops[0] : null, Wa);
	}
	return Ja("bg", Wa);
}
function to(e, t, n, r, i) {
	let a = /<h[1-3]/.test(String(i?.html ?? "")), o = i?.align === "center", s = Ja("text", Ka), c = [], l = [
		.72,
		.9,
		.5
	], u = t + 1;
	for (let i = 0; i < 3; i++) {
		let d = i === 0 && a ? 4 : 2.2;
		if (u + d > t + r) break;
		let f = n * l[i], p = o ? e + (n - f) / 2 : e;
		c.push($a(p, u, f, d, s, ` opacity="${i === 0 ? .8 : .4}" rx="1"`)), u += d + 2.4;
	}
	return c.join("");
}
function no(e, t, n, r) {
	let i = Ja("text", Ka), a = [$a(e, t, n, r, Ja("surface", Ga), " rx=\"1.5\"")], o = (t) => Za(e + n * t), s = (e) => Za(t + r * e);
	return a.push(`<polygon points="${o(.08)},${s(.9)} ${o(.42)},${s(.38)} ${o(.62)},${s(.68)} ${o(.75)},${s(.5)} ${o(.92)},${s(.9)}" fill="${i}" opacity="0.4"/>`), a.push(`<circle cx="${o(.28)}" cy="${s(.26)}" r="${Za(Math.max(1, Math.min(n, r) * .1))}" fill="${i}" opacity="0.5"/>`), a.join("");
}
function ro(e, t, n, r) {
	let i = Math.max(1, n * .03), a = (n - i * 2) / 3, o = [];
	for (let n = 0; n < 3; n++) o.push(no(e + n * (a + i), t, a, r));
	return o.join("");
}
function io(e, t, n, r) {
	let i = Math.max(1, n * .03), a = (n - i * 2) / 3, o = [];
	for (let n = 0; n < 3; n++) {
		let s = e + n * (a + i);
		o.push($a(s, t, a, r * .55, Ja("surface", Ga), " rx=\"1.5\"")), o.push($a(s, t + r * .62, a * .8, 2, Ja("text", Ka), " opacity=\"0.5\" rx=\"1\""));
	}
	return o.join("");
}
function ao(e, t, n, r, i) {
	let a = Ya(i?.color, qa), o = i?.kind;
	return o === "circle" ? `<ellipse cx="${Za(e + n / 2)}" cy="${Za(t + r / 2)}" rx="${Za(Math.max(n / 2, 1))}" ry="${Za(Math.max(r / 2, 1))}" fill="${a}" opacity="0.8"/>` : o === "triangle" ? `<polygon points="${Za(e)},${Za(t + r)} ${Za(e + n / 2)},${Za(t)} ${Za(e + n)},${Za(t + r)}" fill="${a}" opacity="0.8"/>` : o === "line" || o === "arrow" ? $a(e, t + r / 2 - .75, n, 1.5, a, " opacity=\"0.85\" rx=\"0.75\"") : $a(e, t, n, r, a, " opacity=\"0.8\" rx=\"1\"");
}
function oo(e, t, n, r, i, a) {
	if (e === "text") return to(t, n, r, i, a);
	if (e === "image") return no(t, n, r, i);
	if (e === "galleri") return ro(t, n, r, i);
	if (e === "samling") return io(t, n, r, i);
	if (e === "shape") return ao(t, n, r, i, a);
	if (e === "button") return $a(t, n, r, i, Ja("accent", qa), ` rx="${Za(Math.min(i / 2, 4))}"`);
	if (e === "icon") {
		let e = Math.max(1.2, Math.min(r, i) / 2);
		return `<circle cx="${Za(t + r / 2)}" cy="${Za(n + i / 2)}" r="${Za(e)}" fill="${Ja("accent", qa)}" opacity="0.85"/>`;
	}
	if (e === "video") {
		let e = [$a(t, n, r, i, Ja("surface", Ga), " rx=\"1.5\"")], a = t + r / 2, o = n + i / 2, s = Math.max(1.5, Math.min(r, i) * .22);
		return e.push(`<polygon points="${Za(a - s / 2)},${Za(o - s)} ${Za(a - s / 2)},${Za(o + s)} ${Za(a + s)},${Za(o)}" fill="${Ja("text", Ka)}" opacity="0.6"/>`), e.join("");
	}
	return $a(t, n, r, i, Ja("surface", Ga), " rx=\"1.5\"");
}
function so(e, t, n) {
	let r = Array.isArray(e?.blocks) ? e.blocks : [], i = r.map((e) => (e.frames?.desktop?.y ?? 0) + (e.frames?.desktop?.h ?? 0)), a = n / Math.max(Xa(e?.size?.minHeight), i.length ? Math.max(...i) + 16 : 0), o = [$a(0, 0, t, n, eo(e))];
	for (let r of e?.background?.layers ?? []) {
		if (r.type !== "glow") continue;
		let e = r.props ?? {};
		o.push(`<circle cx="${Za(Qa(e.x ?? .5, 0, 1) * t)}" cy="${Za(Qa(e.y ?? .3, 0, 1) * n)}" r="${Za(t * Qa(e.radius ?? .5, .1, 1) * .5)}" fill="${Ya(e.color, qa)}" opacity="${Za(Qa(e.opacity ?? .3, 0, .5))}"/>`);
	}
	for (let e of r) {
		let r = e.frames?.desktop;
		if (!r) continue;
		let i = Qa((r.x ?? 0) * (t / 100), 0, t - 2), s = Qa((r.y ?? 0) * a, 0, n - 2), c = Qa((r.w ?? 10) * (t / 100), 2, t - i), l = Qa((r.h ?? 20) * a, 2, n - s);
		o.push(oo(e.type, i, s, c, l, e.props));
	}
	return o.join("");
}
function co(e, { w: t = 96, h: n = 116, max: r = 6 } = {}) {
	let i = (Array.isArray(e?.sections) ? e.sections : []).slice(0, r);
	if (!i.length) return `<svg viewBox="0 0 ${t} ${n}" width="${t}" height="${n}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${$a(0, 0, t, n, Ja("bg", Wa))}</svg>`;
	let a = i.map((e) => Qa(Xa(e?.size?.minHeight), 160, 900)), o = a.reduce((e, t) => e + t, 0), s = n - 1 * (i.length - 1), c = [], l = 0;
	for (let e = 0; e < i.length; e += 1) {
		let n = Math.max(6, a[e] / o * s);
		c.push(`<g transform="translate(0 ${Za(l)})">${so(i[e], t, n)}</g>`), l += n + 1;
	}
	return `<svg viewBox="0 0 ${t} ${n}" width="${t}" height="${n}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${c.join("")}</svg>`;
}
//#endregion
//#region ../template/assets/engine/0.6.10/palette-search.js
function lo(e) {
	return String(e ?? "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}
function uo(e, t) {
	let n = lo(t).trim(), r = lo(e);
	return n ? r.startsWith(n) ? 0 : r.split(/[^a-z0-9]+/).some((e) => e.startsWith(n)) ? 1 : r.includes(n) ? 2 : -1 : 2;
}
function fo(e, t, n) {
	return e.map((e, r) => ({
		item: e,
		i: r,
		rank: uo(n(e), t)
	})).filter((e) => e.rank >= 0).sort((e, t) => e.rank - t.rank || e.i - t.i).map((e) => e.item);
}
//#endregion
//#region ../template/assets/engine/0.6.10/theme.js
function po(e, t) {
	let n = e.tokens || {}, r = e.scheme === "dark" ? "dark" : "light";
	if (!e.alt?.tokens || t === r) return n;
	let i = {};
	for (let t of /* @__PURE__ */ new Set([...Object.keys(n), ...Object.keys(e.alt.tokens)])) i[t] = {
		...n[t],
		...e.alt.tokens[t]
	};
	return i;
}
var mo = /^[a-zA-Z0-9#%.,()'"\s+\-*/]+$/;
function ho(e) {
	return typeof e == "string" && mo.test(e) && !/url\(|\/\*|\*\/|expression/i.test(e);
}
function go(e) {
	let t = e.tokens || {}, n = po(e, "light"), r = po(e, "dark"), i = e.scheme === "dark" ? "dark" : "light", a = [], o = [], s = [], c = /* @__PURE__ */ new Set([
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
			ho(c) && (a.push(`  --urd-${e}-${l}: ${c};`), i && a.push(`  --urd-base-${l}: ${c};`)), u !== d && (i && ho(u) && ho(d) ? o.push({
				name: l,
				lv: u,
				dv: d
			}) : !i && ho(u) && ho(d) && s.push({
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
function _o(e) {
	return /^[a-z][a-z0-9-]*$/.test(e) ? `var(--urd-color-${e})` : e;
}
var vo = {
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
}, yo = {
	flate: "sectionTheme.flate",
	aksent: "sectionTheme.aksent",
	invers: "sectionTheme.invers"
};
[...new Set(Object.values(vo).flatMap(Object.keys))];
function bo(e) {
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
function xo(e, t) {
	let n = bo(e), r = bo(t);
	return n == null || r == null ? null : (Math.max(n, r) + .05) / (Math.min(n, r) + .05);
}
//#endregion
//#region ../template/assets/engine/0.6.10/backgrounds/color.js
var So = {
	version: 1,
	label: "Farge",
	labelKey: "bgLayer.color",
	defaults: () => ({
		value: "bg",
		opacity: 1
	}),
	migrations: {},
	render(e, t) {
		e.style.background = _o(t.value), e.style.opacity = String(t.opacity ?? 1);
	}
}, Co = {
	linear: [
		"pan",
		"pan-loop",
		"rotate"
	],
	radial: ["pulse", "orbit"]
};
function wo(e) {
	let t = Array.isArray(e) && e.length ? e : [{ color: "#0b0e14" }, { color: "#1a1030" }], n = t.map((e) => Math.max(0, Number(e?.share) || 0)), r = n.reduce((e, t) => e + t, 0), i = r <= 0, a = i ? t.length : r, o = 0;
	return t.map((e, t) => {
		let r = i ? 1 : n[t], s = (o + r / 2) / a * 100;
		return o += r, {
			color: e?.color ?? "#0b0e14",
			at: Math.round(s * 100) / 100
		};
	});
}
function To(e) {
	let t = (e) => Math.round(e * 100) / 100, n = e[0]?.at ?? 0;
	return [...e.map((e) => ({
		color: e.color,
		at: t(e.at - n)
	})), {
		color: e[0]?.color ?? "#0b0e14",
		at: 100
	}];
}
function Eo(e, t, n, r = .5) {
	let i = n % 360 * Math.PI / 180, a = (e) => Math.round(e * 100) / 100 || 0, o = (Math.abs(e * Math.sin(i)) + Math.abs(t * Math.cos(i))) / (1 - Math.min(Math.max(r, 0), .9));
	return {
		period: a(o),
		dx: a(Math.sin(i) * o),
		dy: a(-Math.cos(i) * o)
	};
}
function Do(e, t, n) {
	return `repeating-linear-gradient(${t}deg, ${e.map((e) => `${_o(e.color)} ${Math.round(e.at / 100 * n * 100) / 100}px`).join(", ")})`;
}
function Oo(e) {
	let t = e.kind === "radial" ? "radial" : "linear", n = (Co[t] ?? []).includes(e.animation) ? e.animation : null, r = wo(e.stops), i = r.map((e) => `${_o(e.color)} ${e.at}%`).join(", "), a = {}, o;
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
					stops: To(r),
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
var ko = /* @__PURE__ */ new Set(), Ao = !1;
function jo(e) {
	ko.add(e), !(Ao || typeof window > "u") && (Ao = !0, window.addEventListener("resize", () => {
		for (let e of [...ko]) e() || ko.delete(e);
	}));
}
var Mo = !1;
function No() {
	if (!Mo) {
		Mo = !0;
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
var Po = {
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
		let n = Oo(t);
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
					let e = Eo(r, i, n.loop.angle, n.loop.maxShare);
					t.style.inset = `${-Math.ceil(e.period)}px`, t.style.background = Do(n.loop.stops, n.loop.angle, e.period), t.style.setProperty("--urd-loop-dx", `${e.dx}px`), t.style.setProperty("--urd-loop-dy", `${e.dy}px`);
				}
				return !0;
			};
			requestAnimationFrame(r), jo(r);
			return;
		}
		if (n.runner) {
			e.classList.add("urd-bg-loop-host");
			let t = document.createElement("div");
			t.className = n.runner.className, t.style.background = n.runner.background, n.runner.left != null && (t.style.left = n.runner.left), n.runner.top != null && (t.style.top = n.runner.top), e.appendChild(t);
			return;
		}
		e.style.background = n.background, n.className && (e.classList.add(n.className), n.className === "urd-bg-rotate" && No());
	}
}, Fo = {
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
		let n = _o(t.color);
		e.style.background = `radial-gradient(circle at ${t.x * 100}% ${t.y * 100}%, ${n} 0%, transparent ${t.radius * 100}%)`, e.style.opacity = String(t.opacity ?? .35);
	}
}, Io = "url(\"data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22128%22%20height%3D%22128%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%222%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22128%22%20height%3D%22128%22%20filter%3D%22url(%23n)%22%2F%3E%3C%2Fsvg%3E\")", Lo = {
	version: 1,
	label: "Korn",
	labelKey: "bgLayer.grain",
	defaults: () => ({ opacity: .06 }),
	migrations: {},
	render(e, t) {
		e.style.backgroundImage = Io, e.style.backgroundRepeat = "repeat", e.style.opacity = String(t.opacity ?? .06);
	}
}, Ro = .4;
function zo(e, t) {
	return `${(e ?? .5) * 100}% ${(t ?? .5) * 100}%`;
}
function Bo(e, t) {
	return e === "contain" ? "contain" : e === "cover" ? "cover" : `${Math.max(0, t ?? 1) * 100}%`;
}
function Vo(e) {
	let t = "-9999px";
	return e === "up" ? `inset(${t} 0 0 0)` : e === "down" ? `inset(0 0 ${t} 0)` : e === "both" ? `inset(${t} 0 ${t} 0)` : "inset(0)";
}
function Ho(e, t, n, r = .18) {
	let i = Math.max(0, Math.min(1, n)) * Ro * t;
	return Math.round(Math.min(i, r * e));
}
function Uo(e, t, n, r, i) {
	let a = e + t / 2, o = (n / 2 - a) * Math.max(0, Math.min(1, r)) * Ro, s = i ?? Ho(t, n, r);
	return Math.max(-s, Math.min(s, o)) || 0;
}
var Wo = /* @__PURE__ */ new Set(), Go = !1, Ko = 0;
function qo() {
	Ko = 0;
	for (let e of [...Wo]) e() || Wo.delete(e);
}
function Jo() {
	Ko ||= requestAnimationFrame(qo);
}
function Yo(e) {
	Wo.add(e), e(), !(Go || typeof window > "u") && (Go = !0, window.addEventListener("scroll", Jo, { passive: !0 }), window.addEventListener("resize", Jo, { passive: !0 }));
}
function Xo(e, t, n, r) {
	let i = r === "cover" || r === "flislegg" || r === "repeat", a = e.closest(".urd-section") ?? e.parentElement?.closest(".urd-section") ?? e.parentElement, o = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
	e.style.willChange = "transform";
	let s = (t) => {
		e.style.top = `-${t}px`, e.style.bottom = `-${t}px`;
	}, c = () => {
		if (!e.isConnected) return !1;
		if (o || document.body.classList.contains("urd-mobile")) return s(n), e.style.transform = "", !0;
		let r = (a ?? e).getBoundingClientRect(), c = window.innerHeight || document.documentElement.clientHeight, l = Ho(r.height, c, t, i ? .18 : .6);
		s(i ? Math.max(n, l) : n);
		let u = Uo(r.top, r.height, c, t, l);
		return e.style.transform = `translateY(${u.toFixed(1)}px)`, !0;
	};
	Yo(c), typeof requestAnimationFrame == "function" && requestAnimationFrame(() => requestAnimationFrame(c));
}
function Zo() {
	return typeof CSS < "u" && typeof CSS.supports == "function" && CSS.supports("animation-timeline", "view()");
}
var Qo = /* @__PURE__ */ new Set(), $o = !1, es = 0;
function ts() {
	es = 0;
	for (let e of [...Qo]) e() || Qo.delete(e);
}
function ns() {
	!es && typeof requestAnimationFrame == "function" && (es = requestAnimationFrame(ts));
}
function rs(e) {
	Qo.add(e), e(), !($o || typeof window > "u") && ($o = !0, window.addEventListener("resize", ns, { passive: !0 }));
}
function is(e, t, n, r) {
	let i = r === "cover" || r === "flislegg" || r === "repeat", a = e.closest(".urd-section") ?? e.parentElement?.closest(".urd-section") ?? e.parentElement;
	e.style.willChange = "transform", e.classList.add("urd-parallax-css");
	let o = () => {
		if (!e.isConnected) return !1;
		let r = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches || document.body.classList.contains("urd-mobile"), o = (a ?? e).getBoundingClientRect(), s = window.innerHeight || document.documentElement.clientHeight, c = Ho(o.height, s, t, i ? .18 : .6), l = i && !r ? Math.max(n, c) : n;
		return e.style.setProperty("--urd-px-shift", `${c}px`), e.style.top = `-${l}px`, e.style.bottom = `-${l}px`, !0;
	};
	rs(o), typeof requestAnimationFrame == "function" && requestAnimationFrame(() => requestAnimationFrame(o));
}
var as = {
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
		e.style.opacity = String(t.opacity ?? 1), e.style.clipPath = Vo(t.bleed), e.style.zIndex = t.bleed === "down" || t.bleed === "both" ? "1" : "";
		let n = document.createElement("div");
		n.className = "urd-bg-image", n.style.position = "absolute", n.style.left = "0", n.style.right = "0", n.style.top = "0", n.style.bottom = "0";
		let r = t.fit === "flislegg" || t.fit === "repeat";
		n.style.backgroundImage = `url("${t.src}")`, n.style.backgroundSize = Bo(t.fit, t.size), n.style.backgroundRepeat = r ? "repeat" : "no-repeat", n.style.backgroundPosition = zo(t.x, t.y);
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
			Zo() ? is(n, t.parallax, i, e) : Xo(n, t.parallax, i, e);
		}
	}
};
//#endregion
//#region ../template/assets/engine/0.6.10/galleri-model.js
function os(e, t, n) {
	return !Number.isFinite(n) || n < 1 ? 0 : (((Number.isFinite(e) ? e : 0) + t) % n + n) % n;
}
function ss({ count: e = 0, reducedMotion: t = !1 } = {}) {
	return e >= 2 && !t;
}
function cs(e, { min: t = 2, fallback: n = 5 } = {}) {
	let r = Number(e);
	return !Number.isFinite(r) || r <= 0 ? n : Math.max(t, r);
}
//#endregion
//#region ../template/assets/engine/0.6.10/backgrounds/bildegalleri.js
var ls = {
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
			e.style.backgroundImage = `url("${n.src}")`, e.style.backgroundSize = Bo(t.fit), e.style.backgroundRepeat = "no-repeat", e.style.backgroundPosition = zo(n.x, n.y);
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
		if (!ss({
			count: n.length,
			reducedMotion: s
		})) return;
		let c = document.createElement("div");
		c.className = "urd-bg-slide", e.appendChild(c);
		let l = 0, u = o, d = Math.max(cs(t.interval, { fallback: 6 }), r + .5) * 1e3, f = setInterval(() => {
			if (!e.isConnected) {
				clearInterval(f);
				return;
			}
			if (document.hidden) return;
			let t = os(l, 1, n.length), r = new Image();
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
function us(e = {}) {
	let t = "#2fd6b6", n = "#5c6b64", r = e.mega ? "#16221d" : "#0e1512", i = e.cols ?? 0, a = e.social ?? 0, o = `<svg viewBox="0 0 160 80" preserveAspectRatio="none" aria-hidden="true"><rect width="160" height="80" fill="${r}"/>`;
	if (e.mega && (o += `<circle cx="20" cy="6" r="34" fill="${t}" opacity="0.18"/>`), e.bigcta) return o += `<rect x="45" y="18" width="70" height="8" rx="3" fill="${n}" opacity="0.85"/>`, o += `<rect x="56" y="32" width="48" height="4" rx="2" fill="${n}" opacity="0.5"/>`, o += `<rect x="62" y="43" width="36" height="10" rx="3" fill="${t}"/>`, o += ds(n, e.baselineLinks), o + "</svg>";
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
	return o += ds(n, e.baselineLinks), o + "</svg>";
}
function ds(e, t = 0) {
	let n = `<line x1="8" y1="66" x2="152" y2="66" stroke="${e}" stroke-width="0.6" opacity="0.5"/>`;
	return n += `<rect x="8" y="70" width="40" height="3" rx="1.5" fill="${e}" opacity="0.6"/>`, t && (n += `<g fill="${e}" opacity="0.6">` + Array.from({ length: t }, (e, t) => `<rect x="${120 - t * 16}" y="70" width="12" height="3" rx="1.5"/>`).join("") + "</g>"), n;
}
//#endregion
//#region ../template/assets/engine/0.6.10/animations/core.js
var fs = () => ({
	duration: 600,
	delay: 0
}), ps = {
	"fade-in": {
		version: 1,
		label: "Ton inn",
		labelKey: "anim.fadeIn",
		entrance: !0,
		defaults: fs,
		migrations: {}
	},
	"slide-up": {
		version: 1,
		label: "Gli opp",
		labelKey: "anim.slideUp",
		entrance: !0,
		defaults: fs,
		migrations: {}
	},
	"zoom-in": {
		version: 1,
		label: "Zoom inn",
		labelKey: "anim.zoomIn",
		entrance: !0,
		defaults: fs,
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
}, ms = [
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
function hs(e) {
	let t = (e) => Math.round(e * 100) / 100, n = Math.max(0, t(100 - e.w)), r = Math.min(n, Math.max(0, t(e.x - e.w / 2))), i = Math.max(0, e.y - e.h / 2), a = e.snap === !1 || e.grid?.snap === !1, o = e.grid?.size || 8;
	return i = a ? Math.round(i) : Math.round(i / o) * o, {
		x: r,
		y: Math.max(0, i)
	};
}
//#endregion
//#region src/App.svelte
var gs = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), _s = /* @__PURE__ */ U("<button class=\"ghost row-tool svelte-1n46o8q\"></button>"), vs = /* @__PURE__ */ U("<span><span class=\"grad-grip svelte-1n46o8q\"><svg viewBox=\"0 0 16 16\" width=\"14\" height=\"14\" fill=\"currentColor\" aria-hidden=\"true\"><circle cx=\"5\" cy=\"3\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"3\" r=\"1.4\"></circle><circle cx=\"5\" cy=\"8\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"8\" r=\"1.4\"></circle><circle cx=\"5\" cy=\"13\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"13\" r=\"1.4\"></circle></svg></span> <!> <input type=\"range\" class=\"tb-grow svelte-1n46o8q\" min=\"0\" max=\"100\" step=\"1\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span> <!></span>"), ys = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), bs = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"360\" step=\"5\" class=\"svelte-1n46o8q\"/>", 1), xs = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <!> <button class=\"ghost action svelte-1n46o8q\"> </button> <!> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label>", 1), Ss = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), Cs = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.01\" max=\"0.3\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), ws = /* @__PURE__ */ U("<div class=\"sizefill svelte-1n46o8q\"><button type=\"button\" class=\"ghost svelte-1n46o8q\"> </button> <button type=\"button\" class=\"ghost svelte-1n46o8q\"> </button></div> <label class=\"svelte-1n46o8q\"> </label> <div class=\"focalpad svelte-1n46o8q\"><span class=\"focaldot svelte-1n46o8q\"></span></div> <label class=\"sub svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"-0.5\" max=\"1.5\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"sub svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"-0.5\" max=\"1.5\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), Ts = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label>", 1), Es = /* @__PURE__ */ U("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> </label> <div class=\"sizestep svelte-1n46o8q\"><button type=\"button\" class=\"svelte-1n46o8q\">−</button> <input type=\"number\" min=\"10\" max=\"400\" class=\"svelte-1n46o8q\"/> <span class=\"sizeunit svelte-1n46o8q\">%</span> <button type=\"button\" class=\"svelte-1n46o8q\">+</button></div> <!> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"20\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), Ds = /* @__PURE__ */ U("<span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), Os = /* @__PURE__ */ U("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"2\" max=\"120\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"5\" step=\"0.1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"20\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <p class=\"panel-hint svelte-1n46o8q\"> </p>", 1), ks = /* @__PURE__ */ U("<div class=\"bg-layer svelte-1n46o8q\"><span class=\"nav-line svelte-1n46o8q\"><!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <!></div>"), As = /* @__PURE__ */ U("<!> <label class=\"svelte-1n46o8q\"> <!></label> <button class=\"ghost action svelte-1n46o8q\"> </button>", 1), js = /* @__PURE__ */ U("<input class=\"nav-target svelte-1n46o8q\"/>"), Ms = /* @__PURE__ */ U("<div class=\"nav-row nav-sub-row svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <span class=\"nav-target svelte-1n46o8q\"><!></span> <!></div>"), Ns = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label>"), Ps = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"num-stepper svelte-1n46o8q\"><button type=\"button\" class=\"svelte-1n46o8q\">−</button> <input type=\"number\" min=\"1\" max=\"12\" step=\"1\" class=\"svelte-1n46o8q\"/> <button type=\"button\" class=\"svelte-1n46o8q\">+</button></span></label>", 1), Fs = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), Is = /* @__PURE__ */ U("<p class=\"panel-hint svelte-1n46o8q\"> </p>"), Ls = /* @__PURE__ */ U("<span class=\"nav-line svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span>"), Rs = /* @__PURE__ */ U("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <button class=\"ghost action svelte-1n46o8q\"> </button>", 1), zs = /* @__PURE__ */ U("<input class=\"svelte-1n46o8q\"/>"), Bs = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <!>", 1), Vs = /* @__PURE__ */ U("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>"), Hs = /* @__PURE__ */ U("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <!>", 1), Us = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> </label> <input class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), Ws = /* @__PURE__ */ U("<input class=\"token-input svelte-1n46o8q\" maxlength=\"4\"/>"), Gs = /* @__PURE__ */ U("<button class=\"ghost svelte-1n46o8q\"> </button>"), Ks = /* @__PURE__ */ U("<span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\"/> <button class=\"ghost svelte-1n46o8q\"> </button></span>"), qs = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <span class=\"toolbar-row svelte-1n46o8q\"><!> <!></span></label> <!>", 1), Js = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), Ys = /* @__PURE__ */ U("<div class=\"bg-layer svelte-1n46o8q\"><span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label></div>"), Xs = /* @__PURE__ */ U("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label> <!>", 1), Zs = /* @__PURE__ */ U("<p> </p>"), Qs = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"text\" class=\"svelte-1n46o8q\"/></label> <button class=\"ghost svelte-1n46o8q\"> </button> <!>", 1), $s = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"number\" class=\"svelte-1n46o8q\"/></label>"), ec = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"text\" class=\"svelte-1n46o8q\"/></label>"), tc = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), nc = /* @__PURE__ */ U("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), rc = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), ic = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"1\" max=\"3\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.2\" max=\"2\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.2\" max=\"2\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"2\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\"> </button> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), ac = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"8\" max=\"400\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), oc = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" max=\"6\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"32\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), sc = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"2\" max=\"60\" class=\"svelte-1n46o8q\"/></label>"), cc = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <!> <!> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), lc = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" max=\"40\" class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), uc = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"100\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label>", 1), dc = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"400\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label>", 1), fc = /* @__PURE__ */ U("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), pc = /* @__PURE__ */ U("<div class=\"frame-grid svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"0.5\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"0.5\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label></div>"), mc = /* @__PURE__ */ U("<!> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label></div></details>", 1), hc = /* @__PURE__ */ U("<div class=\"props-tabs svelte-1n46o8q\"><span class=\"seg svelte-1n46o8q\"><button type=\"button\"> </button> <button type=\"button\"> </button></span></div> <!>", 1), gc = /* @__PURE__ */ U("<button class=\"chrome-restore svelte-1n46o8q\"><!> </button>"), _c = /* @__PURE__ */ U("<button class=\"ghost svelte-1n46o8q\"> </button> <span class=\"viewswitch svelte-1n46o8q\"><button></button> <button></button></span> <span class=\"zoomswitch svelte-1n46o8q\"><button></button> <button class=\"ghost svelte-1n46o8q\"></button> <span class=\"zoom-readout svelte-1n46o8q\"> </span> <button class=\"ghost svelte-1n46o8q\"></button></span> <button></button>", 1), vc = /* @__PURE__ */ U("<button class=\"badge attention svelte-1n46o8q\"><!> </button>"), yc = /* @__PURE__ */ U("<span class=\"badge svelte-1n46o8q\"> </span> <button> </button>", 1), bc = /* @__PURE__ */ U("<!> ", 1), xc = /* @__PURE__ */ U("<span class=\"who svelte-1n46o8q\"><!> </span>"), Sc = /* @__PURE__ */ U("<a class=\"ghost svelte-1n46o8q\" href=\"/api/github/login\"> </a>"), Cc = /* @__PURE__ */ U("<button class=\"ghost svelte-1n46o8q\"><!></button> <!> <a class=\"ghost svelte-1n46o8q\" target=\"_blank\" rel=\"noopener\"> </a> <button class=\"primary svelte-1n46o8q\"> </button>", 1), wc = /* @__PURE__ */ U("<hr class=\"rail-sep svelte-1n46o8q\"/>"), Tc = /* @__PURE__ */ U("<button> </button>"), Ec = /* @__PURE__ */ U("<!> <!>", 1), Dc = /* @__PURE__ */ U("<div class=\"settings-pop svelte-1n46o8q\"><p class=\"panel-strong svelte-1n46o8q\"> </p> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label></div>"), Oc = /* @__PURE__ */ U("<span class=\"page-path svelte-1n46o8q\">/</span>"), kc = /* @__PURE__ */ U("<input class=\"page-slug svelte-1n46o8q\"/>"), Ac = /* @__PURE__ */ U("<button class=\"ghost danger svelte-1n46o8q\"><!> </button>"), jc = /* @__PURE__ */ U("<div class=\"page-menu svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"><!> </button> <!></div>"), Mc = /* @__PURE__ */ U("<div><input class=\"page-title svelte-1n46o8q\"/> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <span class=\"page-menu-wrap svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <!></span></span></div>"), Nc = /* @__PURE__ */ U("<div><button class=\"page-mal-pick svelte-1n46o8q\"><span class=\"page-mal-thumb svelte-1n46o8q\"></span> <span class=\"page-mal-name svelte-1n46o8q\"> </span></button> <button class=\"page-mal-del svelte-1n46o8q\"></button></div>"), Pc = /* @__PURE__ */ U("<div class=\"page-mal-grid svelte-1n46o8q\"><div><button class=\"page-mal-pick svelte-1n46o8q\"><span class=\"page-mal-thumb svelte-1n46o8q\"></span> <span class=\"page-mal-name svelte-1n46o8q\"> </span></button></div> <!></div>"), Fc = /* @__PURE__ */ U("<div class=\"panel-body svelte-1n46o8q\"><!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <input class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\"> </button> <!></div>"), Ic = /* @__PURE__ */ U("<input class=\"svelte-1n46o8q\"/> <span class=\"toolbar-row svelte-1n46o8q\"><!> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"8\" max=\"96\" placeholder=\"px\"/> <button><b> </b></button> <button><i> </i></button></span>", 1), Lc = /* @__PURE__ */ U("<span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"12\" max=\"128\"/> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"0\" max=\"64\"/></span>"), Rc = /* @__PURE__ */ U("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), zc = /* @__PURE__ */ U("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), Bc = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), Vc = /* @__PURE__ */ U("<div class=\"nav-row svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <span class=\"nav-target svelte-1n46o8q\"><!></span> <!></div> <!>", 1), Hc = /* @__PURE__ */ U("<div class=\"panel-body svelte-1n46o8q\"><details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <!></label> <!> <!> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <!></label> <!> <!> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <!> <!> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" max=\"4\" class=\"svelte-1n46o8q\"/></label></div></details> <details class=\"group svelte-1n46o8q\" open=\"\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\"> </button></div></details></div>"), Uc = /* @__PURE__ */ U("<img class=\"site-icon-preview svelte-1n46o8q\"/>"), Wc = /* @__PURE__ */ U("<button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button>", 1), Gc = /* @__PURE__ */ U("<div class=\"panel-body svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span></div>"), Kc = /* @__PURE__ */ U("<div class=\"mini-label tpv-cap svelte-1n46o8q\"> </div>"), qc = /* @__PURE__ */ U("<div class=\"theme-pvw svelte-1n46o8q\"><!> <div class=\"tpv-demo svelte-1n46o8q\"><div class=\"tpv-h svelte-1n46o8q\"> </div> <div class=\"tpv-card svelte-1n46o8q\"> </div> <div class=\"tpv-row svelte-1n46o8q\"><span class=\"tpv-btn svelte-1n46o8q\"> </span><span class=\"tpv-lnk svelte-1n46o8q\"> </span></div></div></div>"), Jc = /* @__PURE__ */ U("<button type=\"button\"><span class=\"tp-band svelte-1n46o8q\"><i class=\"svelte-1n46o8q\"></i><i class=\"svelte-1n46o8q\"></i><i class=\"svelte-1n46o8q\"></i><i class=\"svelte-1n46o8q\"></i></span> <small class=\"svelte-1n46o8q\"> </small></button>"), Yc = /* @__PURE__ */ U("<div class=\"ctl-row autorow svelte-1n46o8q\"><span class=\"autolbl svelte-1n46o8q\"> </span> <span class=\"seg svelte-1n46o8q\"><button type=\"button\"> </button> <button type=\"button\"> </button></span></div>"), Xc = /* @__PURE__ */ U("<span class=\"mini-label svelte-1n46o8q\"> </span>"), Zc = /* @__PURE__ */ U("<div class=\"palcol svelte-1n46o8q\"><!> <span class=\"palcap svelte-1n46o8q\"> </span> <b class=\"palhex svelte-1n46o8q\"> </b></div>"), Qc = /* @__PURE__ */ U("<div class=\"ctl-row palhead svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <button type=\"button\"> </button></div> <div></div>", 1), $c = /* @__PURE__ */ U("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-strong svelte-1n46o8q\"> </p> <div class=\"theme-presets svelte-1n46o8q\"></div> <p class=\"panel-strong svelte-1n46o8q\"> </p> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <div class=\"ctl-row palhead svelte-1n46o8q\"><!> <button type=\"button\"> </button></div> <div class=\"palcells svelte-1n46o8q\"></div> <!> <div class=\"theme-previews svelte-1n46o8q\"><!> <!></div> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <div class=\"sample typo-sample svelte-1n46o8q\"><div class=\"ts-h svelte-1n46o8q\"> </div> <div class=\"ts-b svelte-1n46o8q\"> </div></div></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"sample form-prev svelte-1n46o8q\"><span class=\"fp-btn svelte-1n46o8q\"> </span> <span class=\"fp-card svelte-1n46o8q\"> </span></div> <label class=\"ctl-row svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"24\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"ctl-row svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"40\" step=\"1\" class=\"svelte-1n46o8q\"/></div></details></div>"), el = /* @__PURE__ */ U("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label>"), tl = /* @__PURE__ */ U("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label>"), nl = /* @__PURE__ */ U("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"></div></details>"), rl = /* @__PURE__ */ U("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button></div></details> <button class=\"ghost svelte-1n46o8q\"> </button> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button></div></details> <!> <!>", 1), il = /* @__PURE__ */ U("<div><input type=\"text\" class=\"svelte-1n46o8q\"/> <!></div>"), al = /* @__PURE__ */ U("<div class=\"panel-body svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label></div>"), ol = /* @__PURE__ */ U("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!>", 1), sl = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), cl = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"1000\" step=\"10\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label>", 1), ll = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label>"), ul = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"100\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <!>", 1), dl = /* @__PURE__ */ U("<p class=\"panel-strong svelte-1n46o8q\"> </p> <label class=\"svelte-1n46o8q\"> <input class=\"token-input svelte-1n46o8q\"/></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"row-tools svelte-1n46o8q\"><span class=\"gridmenu-value svelte-1n46o8q\"> </span> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label>", 1), fl = /* @__PURE__ */ U("<div class=\"panel-body svelte-1n46o8q\"><!></div>"), pl = /* @__PURE__ */ U("<button class=\"footer-tp svelte-1n46o8q\"><span class=\"footer-tp-thumb svelte-1n46o8q\"></span> <span class=\"footer-tp-name svelte-1n46o8q\"> </span></button>"), ml = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"16\" max=\"160\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), hl = /* @__PURE__ */ U("<span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span> <!>", 1), gl = /* @__PURE__ */ U("<div class=\"nav-row svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></div> <!>", 1), _l = /* @__PURE__ */ U("<div class=\"nav-row svelte-1n46o8q\"><span class=\"nav-line svelte-1n46o8q\"><span class=\"footer-soc-preview svelte-1n46o8q\" aria-hidden=\"true\"></span> <!></span> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <input class=\"nav-target svelte-1n46o8q\"/></div>"), vl = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <!>", 1), yl = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), bl = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <!>", 1), xl = /* @__PURE__ */ U("<div class=\"panel-body svelte-1n46o8q\"><label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"footer-tpick svelte-1n46o8q\"></div></div></details> <details class=\"group svelte-1n46o8q\" open=\"\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\"> </button> <label class=\"svelte-1n46o8q\"> <!></label></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\"> </button></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\"> </button></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <button class=\"ghost action svelte-1n46o8q\"> </button></div></details></div>"), Sl = /* @__PURE__ */ U("<img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <button class=\"ghost row-tool svelte-1n46o8q\"></button>", 1), Cl = /* @__PURE__ */ U("<details class=\"group samling-entry svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><span class=\"toolbar-row svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <label class=\"svelte-1n46o8q\"> <input type=\"date\" class=\"svelte-1n46o8q\"/></label> <textarea rows=\"3\" class=\"svelte-1n46o8q\"></textarea> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span></div></details>"), wl = /* @__PURE__ */ U("<span class=\"toolbar-row svelte-1n46o8q\"><button class=\"ghost action svelte-1n46o8q\"> </button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <!> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Tl = /* @__PURE__ */ U("<div class=\"panel-body svelte-1n46o8q\"><!> <!> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <button class=\"ghost action svelte-1n46o8q\"> </button></div>"), El = /* @__PURE__ */ U("<span class=\"plugin-meta svelte-1n46o8q\"> </span>"), Dl = /* @__PURE__ */ U("<p class=\"panel-hint plugin-warn svelte-1n46o8q\"> </p>"), Ol = /* @__PURE__ */ U("<div><span class=\"plugin-head svelte-1n46o8q\"><span class=\"plugin-name svelte-1n46o8q\"> </span> <!> <span class=\"row-tools svelte-1n46o8q\"><label class=\"gridmenu-snap plugin-toggle svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <!> <!></div>"), kl = /* @__PURE__ */ U("<div class=\"plugin-row svelte-1n46o8q\"><span class=\"plugin-head svelte-1n46o8q\"><span class=\"plugin-name svelte-1n46o8q\"> </span> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span></div>"), Al = /* @__PURE__ */ U("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!>", 1), jl = /* @__PURE__ */ U("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <input class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\"> </button> <!>", 1), Ml = /* @__PURE__ */ U("<div class=\"panel-body svelte-1n46o8q\"><!> <!> <!> <!></div>"), Nl = /* @__PURE__ */ U("<div><span class=\"history-msg svelte-1n46o8q\"> </span> <span class=\"history-meta svelte-1n46o8q\"> </span></div>"), Pl = /* @__PURE__ */ U("<button class=\"ghost svelte-1n46o8q\"> </button> <!>", 1), Fl = /* @__PURE__ */ U("<p class=\"panel-hint svelte-1n46o8q\"> </p> <button class=\"ghost svelte-1n46o8q\"> </button>", 1), Il = /* @__PURE__ */ U("<span class=\"update-arrow svelte-1n46o8q\"></span> <span class=\"badge svelte-1n46o8q\"> </span>", 1), Ll = /* @__PURE__ */ U("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><p class=\"update-notes svelte-1n46o8q\"> </p></div></details>"), Rl = /* @__PURE__ */ U("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"><span class=\"update-warn svelte-1n46o8q\"></span> </summary> <div class=\"group-items svelte-1n46o8q\"><pre class=\"update-headers svelte-1n46o8q\"> </pre></div></details>"), zl = /* @__PURE__ */ U("<span class=\"chip svelte-1n46o8q\"> </span>"), Bl = /* @__PURE__ */ U("<div class=\"update-row svelte-1n46o8q\"><span class=\"update-path svelte-1n46o8q\"> </span> <span class=\"update-flags svelte-1n46o8q\"><!> <span class=\"update-warn svelte-1n46o8q\"></span></span></div>"), Vl = /* @__PURE__ */ U("<div class=\"update-row svelte-1n46o8q\"><span class=\"update-path svelte-1n46o8q\"> </span> <!></div>"), Hl = /* @__PURE__ */ U("<span class=\"update-warn svelte-1n46o8q\"></span>"), Ul = /* @__PURE__ */ U("<div class=\"update-row svelte-1n46o8q\"><span> </span> <span class=\"update-flags svelte-1n46o8q\"><!> <!> <input type=\"checkbox\" class=\"svelte-1n46o8q\"/></span></div>"), Wl = /* @__PURE__ */ U("<div class=\"ctl-row update-opt-head svelte-1n46o8q\"><p class=\"panel-strong svelte-1n46o8q\"> </p> <span class=\"mini-label svelte-1n46o8q\"> </span></div> <!>", 1), Gl = /* @__PURE__ */ U("<p class=\"update-summary svelte-1n46o8q\"> </p> <!> <!> <!> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"></div></details> <!> <button class=\"primary update-run svelte-1n46o8q\"> </button>", 1), Kl = /* @__PURE__ */ U("<div class=\"update-versions svelte-1n46o8q\"><span class=\"update-from svelte-1n46o8q\"> </span> <!></div> <!>", 1), ql = /* @__PURE__ */ U("<aside class=\"panel svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <!></aside>"), Jl = /* @__PURE__ */ U("<nav class=\"rail svelte-1n46o8q\"><!> <span class=\"rail-settings svelte-1n46o8q\"><button></button> <!></span></nav> <!>", 1), Yl = /* @__PURE__ */ U("<div class=\"workspace svelte-1n46o8q\"><!> <div><div class=\"stage svelte-1n46o8q\"><iframe class=\"svelte-1n46o8q\"></iframe></div></div></div>"), Xl = /* @__PURE__ */ U("<p class=\"loading svelte-1n46o8q\"> </p>"), Zl = /* @__PURE__ */ U("<p class=\"panel-hint confirm-line svelte-1n46o8q\"> </p>"), Ql = /* @__PURE__ */ U("<div class=\"setup-overlay svelte-1n46o8q\"><div class=\"setup-card svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <!> <!> <span class=\"setup-actions svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"primary svelte-1n46o8q\"> </button></span></div></div>"), $l = /* @__PURE__ */ U("<div class=\"setup-overlay svelte-1n46o8q\"><div class=\"setup-card svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <p class=\"panel-hint svelte-1n46o8q\"> </p> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <p class=\"panel-hint svelte-1n46o8q\"> </p> <span class=\"setup-actions svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"primary svelte-1n46o8q\"> </button></span></div></div>"), eu = /* @__PURE__ */ U("<div><span> </span> <button class=\"toast-x svelte-1n46o8q\">×</button></div>"), tu = /* @__PURE__ */ U("<div class=\"block-menu svelte-1n46o8q\"><header class=\"block-menu-head svelte-1n46o8q\"><span> </span> <button class=\"ghost row-tool svelte-1n46o8q\"></button></header> <div class=\"panel-body block-menu-body svelte-1n46o8q\"><!></div></div>"), nu = /* @__PURE__ */ U("<div class=\"editor svelte-1n46o8q\"><!> <header><span class=\"topbar-group svelte-1n46o8q\"><span class=\"brand svelte-1n46o8q\" title=\"Urd\"><svg class=\"brand-mark svelte-1n46o8q\" viewBox=\"0 0 40 40\" aria-hidden=\"true\"><path d=\"M12 32V10l16 6.5V32\" fill=\"none\" stroke=\"var(--urd-brand)\" stroke-width=\"3.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path></svg> <span class=\"brand-word svelte-1n46o8q\">Urd</span></span> <!> <!> <!></span> <span class=\"topbar-group topbar-right svelte-1n46o8q\"><!></span></header> <!> <!> <!> <!> <!></div>   <!>", 1);
function ru(e, t) {
	Ue(t, !0);
	let n = (e, t = d, n = d) => {
		var r = As(), i = R(r);
		Br(i, 17, n, Lr, (e, r, i) => {
			var a = ks(), s = L(a), l = L(s);
			{
				let e = /* @__PURE__ */ P(() => Q("tip.bg.changeType")), n = /* @__PURE__ */ P(() => o.map(([e, t]) => [e, t.labelKey ? Q(t.labelKey) : t.label]));
				$(l, {
					get value() {
						return V(r).type;
					},
					get title() {
						return V(e);
					},
					get options() {
						return V(n);
					},
					onchange: (e) => xn(t(), i, e)
				});
			}
			var u = z(l, 2), d = L(u);
			d.disabled = i === 0, J(d, () => c.up, !0), M(d);
			var f = z(d, 2);
			J(f, () => c.down, !0), M(f);
			var p = z(f, 2);
			J(p, () => c.cross, !0), M(p), M(u), M(s);
			var m = z(s, 2), h = (e) => {
				var n = gs(), a = R(n), o = L(a), s = z(o);
				{
					let e = /* @__PURE__ */ P(Pn), n = /* @__PURE__ */ P(() => Q("tip.bg.layerColor"));
					Hi(s, {
						get value() {
							return V(r).props.value;
						},
						get tokens() {
							return V(e);
						},
						get label() {
							return V(n);
						},
						onchange: (e) => en(t(), i, "value", e)
					});
				}
				M(a);
				var c = z(a, 2), l = L(c), u = z(l), d = L(u);
				M(u), M(c);
				var f = z(c, 2);
				Y(f), B((e, t, n) => {
					G(o, `${e ?? ""} `), G(l, `${t ?? ""} `), G(d, `${n ?? ""}%`), X(f, V(r).props.opacity ?? 1);
				}, [
					() => Q("lbl.color"),
					() => Q("lbl.strength"),
					() => Math.round((V(r).props.opacity ?? 1) * 100)
				]), H("input", f, (e) => en(t(), i, "opacity", Number(e.target.value))), W(e, n);
			}, g = (e) => {
				let n = /* @__PURE__ */ P(() => ln(V(r))), a = /* @__PURE__ */ P(() => V(n).stops.reduce((e, t) => e + Math.max(0, Number(t.share) || 0), 0));
				var o = xs(), s = R(o), l = L(s), u = z(l);
				{
					let e = /* @__PURE__ */ P(() => V(n).kind ?? "linear"), r = /* @__PURE__ */ P(() => [["linear", Q("opt.grad.linear")], ["radial", Q("opt.grad.radial")]]);
					$(u, {
						get value() {
							return V(e);
						},
						get options() {
							return V(r);
						},
						onchange: (e) => pn(t(), i, e)
					});
				}
				M(s);
				var d = z(s, 2);
				Br(d, 17, () => V(n).stops, Lr, (e, r, o) => {
					var s = vs();
					let l;
					var u = L(s), d = z(u, 2);
					{
						let e = /* @__PURE__ */ P(Pn), n = /* @__PURE__ */ P(() => Q("tip.bg.stopColor"));
						Hi(d, {
							get value() {
								return V(r).color;
							},
							get tokens() {
								return V(e);
							},
							get label() {
								return V(n);
							},
							onchange: (e) => mn(t(), i, o, { color: e })
						});
					}
					var f = z(d, 2);
					Y(f);
					var p = z(f, 2), m = L(p);
					M(p);
					var h = z(p, 2), g = (e) => {
						var n = _s();
						J(n, () => c.cross, !0), M(n), B((e) => Z(n, "title", e), [() => Q("tip.bg.removeStop")]), H("click", n, () => gn(t(), i, o)), W(e, n);
					};
					K(h, (e) => {
						V(n).stops.length > 2 && e(g);
					}), M(s), B((e, t, a) => {
						l = Zr(s, 1, "nav-line grad-stop svelte-1n46o8q", null, l, {
							dragging: V(vn)?.layer === i && V(vn).from === o,
							"drop-above": V(vn)?.layer === i && V(vn).insert === o,
							"drop-below": V(vn)?.layer === i && V(vn).insert === V(n).stops.length && o === V(n).stops.length - 1
						}), Z(u, "title", e), X(f, V(r).share ?? 50), Z(f, "title", t), G(m, `${a ?? ""}%`);
					}, [
						() => Q("tip.bg.dragStop"),
						() => Q("tip.bg.stopShare"),
						() => V(a) > 0 ? Math.round(Math.max(0, Number(V(r).share) || 0) / V(a) * 100) : Math.round(100 / V(n).stops.length)
					]), H("pointerdown", u, (e) => yn(t(), e, i, o)), H("input", f, (e) => mn(t(), i, o, { share: Number(e.target.value) })), W(e, s);
				});
				var f = z(d, 2), p = L(f, !0);
				M(f);
				var m = z(f, 2), h = (e) => {
					var r = ys(), a = R(r), o = L(a), s = z(o), c = L(s);
					M(s), M(a);
					var l = z(a, 2);
					Y(l);
					var u = z(l, 2), d = L(u), f = z(d), p = L(f);
					M(f), M(u);
					var m = z(u, 2);
					Y(m), B((e, t, r, i) => {
						G(o, `${e ?? ""} `), G(c, `${t ?? ""}%`), X(l, V(n).x ?? .5), G(d, `${r ?? ""} `), G(p, `${i ?? ""}%`), X(m, V(n).y ?? .5);
					}, [
						() => Q("lbl.centerX"),
						() => Math.round((V(n).x ?? .5) * 100),
						() => Q("lbl.centerY"),
						() => Math.round((V(n).y ?? .5) * 100)
					]), H("input", l, (e) => dn(t(), i, "x", Number(e.target.value))), H("input", m, (e) => dn(t(), i, "y", Number(e.target.value))), W(e, r);
				}, g = (e) => {
					var r = bs(), a = R(r), o = L(a), s = z(o), c = L(s);
					M(s), M(a);
					var l = z(a, 2);
					Y(l), B((e) => {
						G(o, `${e ?? ""} `), G(c, `${V(n).angle ?? ""}°`), X(l, V(n).angle);
					}, [() => Q("lbl.angle")]), H("input", l, (e) => dn(t(), i, "angle", Number(e.target.value))), W(e, r);
				};
				K(m, (e) => {
					(V(n).kind ?? "linear") === "radial" ? e(h) : e(g, -1);
				});
				var _ = z(m, 2), v = L(_), y = z(v), b = L(y);
				M(y), M(_);
				var x = z(_, 2);
				Y(x);
				var S = z(x, 2), C = L(S), w = z(C);
				{
					let e = /* @__PURE__ */ P(() => V(n).animation ?? "none");
					$(w, {
						get value() {
							return V(e);
						},
						get options() {
							return fn[(V(n).kind ?? "linear") === "radial" ? "radial" : "linear"];
						},
						onchange: (e) => dn(t(), i, "animation", e)
					});
				}
				M(S), B((e, t, r, i, a, o, s) => {
					G(l, `${e ?? ""} `), Z(f, "title", t), G(p, r), G(v, `${i ?? ""} `), G(b, `${a ?? ""}%`), X(x, V(n).opacity ?? 1), Z(S, "title", o), G(C, `${s ?? ""} `);
				}, [
					() => Q("blocks.shape"),
					() => Q("tip.bg.addStop"),
					() => Q("ui.addStop"),
					() => Q("lbl.strength"),
					() => Math.round((V(n).opacity ?? 1) * 100),
					() => Q("tip.bg.motion"),
					() => Q("lbl.motion")
				]), H("click", f, () => hn(t(), i)), H("input", x, (e) => dn(t(), i, "opacity", Number(e.target.value))), W(e, o);
			}, _ = (e) => {
				var n = Ss(), a = R(n), o = L(a), s = z(o);
				{
					let e = /* @__PURE__ */ P(Pn), n = /* @__PURE__ */ P(() => Q("tip.bg.glowColor"));
					Hi(s, {
						get value() {
							return V(r).props.color;
						},
						get tokens() {
							return V(e);
						},
						get label() {
							return V(n);
						},
						onchange: (e) => en(t(), i, "color", e)
					});
				}
				M(a);
				var c = z(a, 2), l = L(c), u = z(l), d = L(u);
				M(u), M(c);
				var f = z(c, 2);
				Y(f);
				var p = z(f, 2), m = L(p), h = z(m), g = L(h);
				M(h), M(p);
				var _ = z(p, 2);
				Y(_);
				var v = z(_, 2), y = L(v), b = z(y), x = L(b);
				M(b), M(v);
				var S = z(v, 2);
				Y(S);
				var C = z(S, 2), w = L(C), T = z(w), E = L(T);
				M(T), M(C);
				var D = z(C, 2);
				Y(D), B((e, t, n, i, a, s, c, u, p) => {
					G(o, `${e ?? ""} `), G(l, `${t ?? ""} `), G(d, `${n ?? ""}%`), X(f, V(r).props.x), G(m, `${i ?? ""} `), G(g, `${a ?? ""}%`), X(_, V(r).props.y), G(y, `${s ?? ""} `), G(x, `${c ?? ""}%`), X(S, V(r).props.radius), G(w, `${u ?? ""} `), G(E, `${p ?? ""}%`), X(D, V(r).props.opacity);
				}, [
					() => Q("lbl.color"),
					() => Q("lbl.posX"),
					() => Math.round(V(r).props.x * 100),
					() => Q("lbl.posY"),
					() => Math.round(V(r).props.y * 100),
					() => Q("lbl.size"),
					() => Math.round(V(r).props.radius * 100),
					() => Q("lbl.strength"),
					() => Math.round(V(r).props.opacity * 100)
				]), H("input", f, (e) => en(t(), i, "x", Number(e.target.value))), H("input", _, (e) => en(t(), i, "y", Number(e.target.value))), H("input", S, (e) => en(t(), i, "radius", Number(e.target.value))), H("input", D, (e) => en(t(), i, "opacity", Number(e.target.value))), W(e, n);
			}, v = (e) => {
				var n = Cs(), a = R(n), o = L(a), s = z(o), c = L(s);
				M(s), M(a);
				var l = z(a, 2);
				Y(l), B((e, t) => {
					G(o, `${e ?? ""} `), G(c, `${t ?? ""}%`), X(l, V(r).props.opacity);
				}, [() => Q("lbl.strength"), () => Math.round(V(r).props.opacity * 100)]), H("input", l, (e) => en(t(), i, "opacity", Number(e.target.value))), W(e, n);
			}, y = (e) => {
				let n = /* @__PURE__ */ P(() => V(r).props.fit === "flislegg" || V(r).props.fit === "repeat");
				var a = Es(), o = R(a), s = L(o), c = z(s);
				M(o);
				var l = z(o, 2), u = L(l), d = z(u);
				{
					let e = /* @__PURE__ */ P(() => V(n) ? "flislegg" : "vanlig"), r = /* @__PURE__ */ P(() => [["vanlig", Q("opt.img.plain")], ["flislegg", Q("opt.img.tile")]]);
					$(d, {
						get value() {
							return V(e);
						},
						get options() {
							return V(r);
						},
						onchange: (e) => en(t(), i, "fit", e)
					});
				}
				M(l);
				var f = z(l, 2), p = L(f, !0);
				M(f);
				var m = z(f, 2), h = L(m), g = z(h, 2);
				Y(g);
				var _ = z(g, 4);
				M(m);
				var v = z(m, 2), y = (e) => {
					var n = ws(), a = R(n), o = L(a), s = L(o, !0);
					M(o);
					var c = z(o, 2), l = L(c, !0);
					M(c), M(a);
					var u = z(a, 2), d = L(u, !0);
					M(u);
					var f = z(u, 2), p = z(f, 2), m = L(p), h = z(m), g = L(h);
					M(h), M(p);
					var _ = z(p, 2);
					Y(_);
					var v = z(_, 2), y = L(v), b = z(y), x = L(b);
					M(b), M(v);
					var S = z(v, 2);
					Y(S), B((e, t, n, i, a, p, h, v, b, C, w, T) => {
						Z(o, "title", e), G(s, t), Z(c, "title", n), G(l, i), Z(u, "title", a), G(d, p), $r(f, `--fx:${h ?? ""}%; --fy:${v ?? ""}%`), G(m, `${b ?? ""} `), G(g, `${C ?? ""}%`), X(_, V(r).props.x ?? .5), G(y, `${w ?? ""} `), G(x, `${T ?? ""}%`), X(S, V(r).props.y ?? .5);
					}, [
						() => Q("tip.bg.cover"),
						() => Q("ui.cover"),
						() => Q("opt.fitFrame.contain"),
						() => Q("opt.fit.contain"),
						() => Q("tip.bg.position"),
						() => Q("lbl.position"),
						() => Math.max(0, Math.min(1, V(r).props.x ?? .5)) * 100,
						() => Math.max(0, Math.min(1, V(r).props.y ?? .5)) * 100,
						() => Q("lbl.horizontal"),
						() => Math.round((V(r).props.x ?? .5) * 100),
						() => Q("lbl.vertical"),
						() => Math.round((V(r).props.y ?? .5) * 100)
					]), H("click", o, () => cn(t(), i, V(r), "cover")), H("click", c, () => cn(t(), i, V(r), "contain")), H("pointerdown", f, (e) => rn(e, t(), i, "xy")), H("input", _, (e) => en(t(), i, "x", Number(e.target.value))), H("input", S, (e) => en(t(), i, "y", Number(e.target.value))), W(e, n);
				};
				K(v, (e) => {
					V(n) || e(y);
				});
				var b = z(v, 2), x = L(b), S = z(x), C = L(S);
				M(S), M(b);
				var w = z(b, 2);
				Y(w);
				var T = z(w, 2), E = L(T), D = z(E), ee = L(D);
				M(D), M(T);
				var te = z(T, 2);
				Y(te);
				var ne = z(te, 2), re = L(ne);
				Y(re);
				var ie = z(re);
				M(ne);
				var ae = z(ne, 2), oe = (e) => {
					var n = Ts(), a = R(n), o = L(a), s = z(o), c = L(s);
					M(s), M(a);
					var l = z(a, 2);
					Y(l);
					var u = z(l, 2), d = L(u), f = z(d);
					{
						let e = /* @__PURE__ */ P(() => V(r).props.bleed ?? "none"), n = /* @__PURE__ */ P(() => [
							["none", Q("common.none")],
							["up", Q("opt.bleed.up")],
							["down", Q("opt.bleed.down")],
							["both", Q("opt.brand.both")]
						]);
						$(f, {
							get value() {
								return V(e);
							},
							get options() {
								return V(n);
							},
							onchange: (e) => en(t(), i, "bleed", e)
						});
					}
					M(u), B((e, t, n, i) => {
						G(o, `${e ?? ""} `), G(c, `${t ?? ""}%`), X(l, V(r).props.parallax ?? .3), Z(u, "title", n), G(d, `${i ?? ""} `);
					}, [
						() => Q("lbl.parallaxStrength"),
						() => Math.round((V(r).props.parallax ?? 0) * 100),
						() => Q("tip.bg.bleed"),
						() => Q("lbl.bleed")
					]), H("input", l, (e) => en(t(), i, "parallax", Number(e.target.value))), W(e, n);
				};
				K(ae, (e) => {
					(V(r).props.parallax ?? 0) > 0 && e(oe);
				}), B((e, t, n, i, a, c, d, m, v, y, b, S, T, D) => {
					Z(o, "title", e), G(s, `${t ?? ""} `), Z(l, "title", n), G(u, `${i ?? ""} `), Z(f, "title", a), G(p, c), Z(h, "title", d), X(g, m), Z(_, "title", v), G(x, `${y ?? ""} `), G(C, `${V(r).props.blur ?? 0 ?? ""} px`), X(w, V(r).props.blur ?? 0), G(E, `${b ?? ""} `), G(ee, `${S ?? ""}%`), X(te, V(r).props.opacity ?? 1), Z(ne, "title", T), ii(re, (V(r).props.parallax ?? 0) > 0), G(ie, ` ${D ?? ""}`);
				}, [
					() => Q("tip.webpAuto"),
					() => V(r).props.src ? Q("ui.changeImage") : Q("ui.chooseImage"),
					() => Q("tip.bg.fit"),
					() => Q("lbl.fit"),
					() => Q("tip.bg.size"),
					() => Q("lbl.size"),
					() => Q("tip.smaller"),
					() => Math.round((V(r).props.size ?? 1) * 100),
					() => Q("tip.larger"),
					() => Q("lbl.blur"),
					() => Q("lbl.strength"),
					() => Math.round((V(r).props.opacity ?? 1) * 100),
					() => Q("tip.bg.parallax"),
					() => Q("lbl.parallax")
				]), H("change", c, (e) => Tn(t(), i, e)), H("click", h, () => on(t(), i, V(r).props.size ?? 1, -.05)), H("change", g, (e) => sn(t(), i, e.target.value)), H("click", _, () => on(t(), i, V(r).props.size ?? 1, .05)), H("input", w, (e) => en(t(), i, "blur", Number(e.target.value))), H("input", te, (e) => en(t(), i, "opacity", Number(e.target.value))), H("change", re, (e) => en(t(), i, "parallax", e.target.checked ? .3 : 0)), W(e, a);
			}, b = (e) => {
				var n = Os(), a = R(n), o = L(a), s = z(o);
				M(a);
				var l = z(a, 2);
				Br(l, 17, () => V(r).props.images ?? [], Lr, (e, n, a) => {
					var o = Ds(), s = R(o), l = L(s), u = z(l, 2), d = L(u);
					d.disabled = a === 0, J(d, () => c.up, !0), M(d);
					var f = z(d, 2);
					J(f, () => c.down, !0), M(f);
					var p = z(f, 2);
					J(p, () => c.cross, !0), M(p), M(u), M(s);
					var m = z(s, 2), h = L(m), g = z(h), _ = L(g);
					M(g), M(m);
					var v = z(m, 2);
					Y(v);
					var y = z(v, 2), b = L(y), x = z(b), S = L(x);
					M(x), M(y);
					var C = z(y, 2);
					Y(C), B((e, t, i, o, s) => {
						Z(l, "src", V(n).src), f.disabled = a === V(r).props.images.length - 1, Z(p, "title", e), G(h, `${t ?? ""} `), G(_, `${i ?? ""}%`), X(v, V(n).x ?? .5), G(b, `${o ?? ""} `), G(S, `${s ?? ""}%`), X(C, V(n).y ?? .5);
					}, [
						() => Q("tip.removeImage"),
						() => Q("lbl.focusX"),
						() => Math.round((V(n).x ?? .5) * 100),
						() => Q("lbl.focusY"),
						() => Math.round((V(n).y ?? .5) * 100)
					]), H("click", d, () => Dn(t(), i, a, -1)), H("click", f, () => Dn(t(), i, a, 1)), H("click", p, () => On(t(), i, a)), H("input", v, (e) => kn(t(), i, a, "x", Number(e.target.value))), H("input", C, (e) => kn(t(), i, a, "y", Number(e.target.value))), W(e, o);
				});
				var u = z(l, 2), d = L(u), f = z(d);
				{
					let e = /* @__PURE__ */ P(() => V(r).props.fit ?? "cover"), n = /* @__PURE__ */ P(() => [["cover", Q("opt.fit.cover")], ["contain", Q("opt.fit.contain")]]);
					$(f, {
						get value() {
							return V(e);
						},
						get options() {
							return V(n);
						},
						onchange: (e) => en(t(), i, "fit", e)
					});
				}
				M(u);
				var p = z(u, 2), m = L(p), h = z(m);
				Y(h), M(p);
				var g = z(p, 2), _ = L(g), v = z(_), y = L(v);
				M(v), M(g);
				var b = z(g, 2);
				Y(b);
				var x = z(b, 2), S = L(x), C = z(S), w = L(C);
				M(C), M(x);
				var T = z(x, 2);
				Y(T);
				var E = z(T, 2), D = L(E), ee = z(D), te = L(ee);
				M(ee), M(E);
				var ne = z(E, 2);
				Y(ne);
				var re = z(ne, 2), ie = L(re, !0);
				M(re), B((e, t, n, i, s, c, l, u, f, g, v) => {
					Z(a, "title", e), G(o, `${t ?? ""} `), G(d, `${n ?? ""} `), Z(p, "title", i), G(m, `${s ?? ""} `), X(h, V(r).props.interval ?? 6), G(_, `${c ?? ""} `), G(y, `${l ?? ""} s`), X(b, V(r).props.fade ?? 1.5), G(S, `${u ?? ""} `), G(w, `${V(r).props.blur ?? 0 ?? ""} px`), X(T, V(r).props.blur ?? 0), G(D, `${f ?? ""} `), G(te, `${g ?? ""}%`), X(ne, V(r).props.opacity ?? 1), G(ie, v);
				}, [
					() => Q("tip.bg.addImages"),
					() => Q("ui.addImages"),
					() => Q("lbl.fit"),
					() => Q("hint.bg.gallery"),
					() => Q("lbl.secondsPerImage"),
					() => Q("lbl.transition"),
					() => (V(r).props.fade ?? 1.5).toFixed(1),
					() => Q("lbl.blur"),
					() => Q("lbl.strength"),
					() => Math.round((V(r).props.opacity ?? 1) * 100),
					() => Q("hint.bg.gallery")
				]), H("change", s, (e) => En(t(), i, e)), H("change", h, (e) => en(t(), i, "interval", Number(e.target.value))), H("input", b, (e) => en(t(), i, "fade", Number(e.target.value))), H("input", T, (e) => en(t(), i, "blur", Number(e.target.value))), H("input", ne, (e) => en(t(), i, "opacity", Number(e.target.value))), W(e, n);
			};
			K(m, (e) => {
				V(r).type === "color" ? e(h) : V(r).type === "gradient" ? e(g, 1) : V(r).type === "glow" ? e(_, 2) : V(r).type === "grain" ? e(v, 3) : V(r).type === "image" ? e(y, 4) : V(r).type === "bildegalleri" && e(b, 5);
			}), M(a), B((e, t, r) => {
				Z(d, "title", e), Z(f, "title", t), f.disabled = i === n().length - 1, Z(p, "title", r);
			}, [
				() => Q("hint.bg.order"),
				() => Q("hint.bg.order"),
				() => Q("tip.bg.removeLayer")
			]), H("click", d, () => $t(t(), i, -1)), H("click", f, () => $t(t(), i, 1)), H("click", p, () => Qt(t(), i)), W(e, a);
		});
		var a = z(i, 2), s = L(a), l = z(s);
		{
			let e = /* @__PURE__ */ P(() => o.map(([e, t]) => [e, t.labelKey ? Q(t.labelKey) : t.label]));
			$(l, {
				get value() {
					return V(Xt);
				},
				get options() {
					return V(e);
				},
				onchange: (e) => I(Xt, e, !0)
			});
		}
		M(a);
		var u = z(a, 2), f = L(u, !0);
		M(u), B((e, t) => {
			G(s, `${e ?? ""} `), G(f, t);
		}, [() => Q("lbl.newLayer"), () => Q("ui.addLayer")]), H("click", u, () => Zt(t(), V(Xt))), W(e, r);
	}, r = (e, t = d, n = d) => {
		var r = jr();
		Br(R(r), 17, n, Lr, (e, r, i) => {
			var a = Ms(), o = L(a);
			Y(o);
			var s = z(o, 2), l = L(s);
			l.disabled = i === 0, J(l, () => c.up, !0), M(l);
			var u = z(l, 2);
			J(u, () => c.down, !0), M(u);
			var d = z(u, 2);
			J(d, () => c.cross, !0), M(d), M(s);
			var f = z(s, 2), p = L(f);
			{
				let e = /* @__PURE__ */ P(() => V(r).page ?? "__href"), n = /* @__PURE__ */ P(() => Q("tip.linkTarget")), a = /* @__PURE__ */ P(() => [...V(A).pages.map((e) => [e.id, e.title]), ["__href", Q("opt.linkHref")]]);
				$(p, {
					get value() {
						return V(e);
					},
					get title() {
						return V(n);
					},
					get options() {
						return V(a);
					},
					onchange: (e) => Co(t(), i, e)
				});
			}
			M(f);
			var m = z(f, 2), h = (e) => {
				var n = js();
				Y(n), B((e, t) => {
					X(n, V(r).href ?? ""), Z(n, "placeholder", e), Z(n, "title", t);
				}, [() => Q("ph.hrefAnchor"), () => Q("tip.hrefAnchor")]), H("change", n, (e) => wo(t(), i, e.target.value)), W(e, n);
			};
			K(m, (e) => {
				V(r).page || e(h);
			}), M(a), B((e, t) => {
				X(o, V(r).label), Z(o, "title", e), u.disabled = i === n().length - 1, Z(d, "title", t);
			}, [() => Q("tip.linkLabel"), () => Q("tip.removeLink")]), H("input", o, (e) => vo(t(), i, e.target.value)), H("click", l, () => _o(t(), i, -1)), H("click", u, () => _o(t(), i, 1)), H("click", d, () => ho(t(), i)), W(e, a);
		}), W(e, r);
	}, i = (e) => {
		let t = /* @__PURE__ */ P(() => V(N).props.boxStyle ?? {});
		var n = Fs(), r = R(n), i = L(r), a = z(i);
		{
			let e = /* @__PURE__ */ P(() => V(t).bg ?? ""), n = /* @__PURE__ */ P(Pn), r = /* @__PURE__ */ P(() => Q("tip.box.bg"));
			Hi(a, {
				get value() {
					return V(e);
				},
				get tokens() {
					return V(n);
				},
				allowClear: !0,
				get label() {
					return V(r);
				},
				onchange: (e) => Et({ bg: e || null })
			});
		}
		M(r);
		var o = z(r, 2), s = L(o), c = z(s);
		{
			let e = /* @__PURE__ */ P(() => V(t).shadow ?? ""), n = /* @__PURE__ */ P(() => [
				["", Q("common.none")],
				["soft", Q("opt.shadow.soft")],
				["strong", Q("opt.shadow.strong")]
			]);
			$(c, {
				get value() {
					return V(e);
				},
				get options() {
					return V(n);
				},
				onchange: (e) => Et({ shadow: e || null })
			});
		}
		M(o);
		var l = z(o, 2), u = (e) => {
			var n = Ns(), r = L(n), i = z(r);
			{
				let e = /* @__PURE__ */ P(() => V(t).shadowColor ?? ""), n = /* @__PURE__ */ P(Pn), r = /* @__PURE__ */ P(() => Q("tip.box.shadowColor"));
				Hi(i, {
					get value() {
						return V(e);
					},
					get tokens() {
						return V(n);
					},
					allowClear: !0,
					get label() {
						return V(r);
					},
					onchange: (e) => Et({ shadowColor: e || null })
				});
			}
			M(n), B((e) => G(r, `${e ?? ""} `), [() => Q("lbl.shadowColor")]), W(e, n);
		};
		K(l, (e) => {
			V(t).shadow && e(u);
		});
		var d = z(l, 2), f = L(d), p = z(f);
		{
			let e = /* @__PURE__ */ P(() => V(t).border === "none" ? "none" : V(t).border ? "custom" : ""), n = /* @__PURE__ */ P(() => [
				["", Q("opt.border.theme")],
				["none", Q("common.none")],
				["custom", Q("opt.border.custom")]
			]);
			$(p, {
				get value() {
					return V(e);
				},
				get options() {
					return V(n);
				},
				onchange: (e) => Et({ border: e === "custom" ? {
					color: "accent",
					width: 1
				} : e || null })
			});
		}
		M(d);
		var m = z(d, 2), h = (e) => {
			let n = /* @__PURE__ */ P(() => typeof V(t).border == "object" ? V(t).border : {
				color: "text",
				width: 1
			});
			var r = Ps(), i = R(r), a = L(i), o = z(a);
			{
				let e = /* @__PURE__ */ P(Pn), t = /* @__PURE__ */ P(() => Q("tip.box.borderColor"));
				Hi(o, {
					get value() {
						return V(n).color;
					},
					get tokens() {
						return V(e);
					},
					get label() {
						return V(t);
					},
					onchange: (e) => Et({ border: {
						...V(n),
						color: e
					} })
				});
			}
			M(i);
			var s = z(i, 2), c = L(s), l = z(c), u = L(l), d = z(u, 2);
			Y(d);
			var f = z(d, 2);
			M(l), M(s), B((e, t, r, i, o, s) => {
				G(a, `${e ?? ""} `), G(c, `${t ?? ""} `), Z(u, "title", r), Z(u, "aria-label", i), X(d, V(n).width), Z(f, "title", o), Z(f, "aria-label", s);
			}, [
				() => Q("lbl.borderColor"),
				() => Q("lbl.thicknessPx"),
				() => Q("tip.thinner"),
				() => Q("tip.thinner"),
				() => Q("tip.thicker"),
				() => Q("tip.thicker")
			]), H("click", u, () => Et({ border: {
				...V(n),
				width: Math.max(1, V(n).width - 1)
			} })), H("change", d, (e) => Et({ border: {
				...V(n),
				width: Math.min(12, Math.max(1, Number(e.target.value) || 1))
			} })), H("click", f, () => Et({ border: {
				...V(n),
				width: Math.min(12, V(n).width + 1)
			} })), W(e, r);
		};
		K(m, (e) => {
			V(t).border !== "none" && e(h);
		});
		var g = z(m, 2), _ = L(g);
		Y(_);
		var v = z(_);
		M(g), B((e, t, n, r, a, o) => {
			G(i, `${e ?? ""} `), G(s, `${t ?? ""} `), G(f, `${n ?? ""} `), Z(g, "title", r), ii(_, a), G(v, ` ${o ?? ""}`);
		}, [
			() => Q("lbl.blockColor"),
			() => Q("lbl.shadow"),
			() => Q("lbl.border"),
			() => Q("tip.box.glass"),
			() => !!V(t).glass,
			() => Q("lbl.glass")
		]), H("change", _, (e) => Et({ glass: e.target.checked || null })), W(e, n);
	}, a = (e) => {
		var t = hc(), n = R(t), r = L(n), a = L(r);
		let o;
		var s = L(a, !0);
		M(a);
		var l = z(a, 2);
		let u;
		var d = L(l, !0);
		M(l), M(r), M(n);
		var f = z(n, 2), p = (e) => {
			var t = jr(), n = R(t), r = (e) => {
				var t = Is(), n = L(t, !0);
				M(t), B((e) => G(n, e), [() => Q("hint.textInline")]), W(e, t);
			}, i = (e) => {
				var t = Rs(), n = R(t), r = L(n);
				Y(r);
				var i = z(r);
				M(n);
				var a = z(n, 2), o = L(a, !0);
				M(a);
				var s = z(a, 2);
				Br(s, 17, () => V(N).props.items ?? [], Lr, (e, t, n) => {
					var r = Ls(), i = L(r);
					Y(i);
					var a = z(i, 2), o = L(a);
					o.disabled = n === 0, J(o, () => c.up, !0), M(o);
					var s = z(o, 2);
					J(s, () => c.down, !0), M(s);
					var l = z(s, 2);
					J(l, () => c.cross, !0), M(l), M(a), M(r), B((e, r) => {
						X(i, V(t).q), Z(i, "title", e), s.disabled = n === (V(N).props.items?.length ?? 0) - 1, Z(l, "title", r);
					}, [() => Q("tip.faq.question"), () => Q("tip.faq.remove")]), H("change", i, (e) => Dt(n, { q: e.target.value })), H("click", o, () => At(n, -1)), H("click", s, () => At(n, 1)), H("click", l, () => kt(n)), W(e, r);
				});
				var l = z(s, 2), u = L(l, !0);
				M(l), B((e, t, a, s, c) => {
					Z(n, "title", e), ii(r, t), G(i, ` ${a ?? ""}`), G(o, s), G(u, c);
				}, [
					() => Q("tip.faq.multi"),
					() => !!V(N).props.multi,
					() => Q("lbl.faqMulti"),
					() => Q("lbl.questions"),
					() => Q("ui.addQuestion")
				]), H("change", r, (e) => _t("multi", e.target.checked)), H("click", l, Ot), W(e, t);
			}, a = (e) => {
				var t = Bs(), n = R(t), r = L(n), i = z(r);
				Y(i), M(n);
				var a = z(n, 2), o = L(a), s = z(o);
				{
					let e = /* @__PURE__ */ P(() => V(N).props.page ?? "__href"), t = /* @__PURE__ */ P(() => [...V(A).pages.map((e) => [e.id, e.title]), ["__href", Q("opt.externalLink")]]);
					$(s, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => {
							let t = e === "__href" ? null : e;
							gt(`edit:${V(N).blockId}`, (e) => {
								e.props.page = t, t && (e.props.href = null);
							});
						}
					});
				}
				M(a);
				var c = z(a, 2), l = (e) => {
					var t = zs();
					Y(t), B((e) => {
						Z(t, "placeholder", e), X(t, V(N).props.href === "#" ? "" : V(N).props.href ?? "");
					}, [() => Q("ph.url")]), H("change", t, (e) => _t("href", e.target.value || null)), W(e, t);
				};
				K(c, (e) => {
					V(N).props.page || e(l);
				}), B((e, t) => {
					G(r, `${e ?? ""} `), X(i, V(N).props.label), G(o, `${t ?? ""} `);
				}, [() => Q("blocks.text"), () => Q("lbl.goesTo")]), H("change", i, (e) => _t("label", e.target.value)), W(e, t);
			}, o = (e) => {
				var t = Hs(), n = R(t), r = L(n), i = z(r);
				M(n);
				var a = z(n, 2), o = L(a), s = z(o);
				Y(s), M(a);
				var c = z(a, 2), l = L(c), u = z(l);
				Y(u), M(c);
				var d = z(c, 2), f = (e) => {
					var t = Vs(), n = L(t);
					Y(n);
					var r = z(n);
					M(t), B((e, i, a) => {
						Z(t, "title", e), ii(n, i), G(r, ` ${a ?? ""}`);
					}, [
						() => Q("tip.lightbox"),
						() => !!V(N).props.lightbox,
						() => Q("lbl.lightbox")
					]), H("change", n, (e) => _t("lightbox", e.target.checked)), W(e, t);
				};
				K(d, (e) => {
					V(N).props.href || e(f);
				}), B((e, t, n, i, a) => {
					G(r, `${e ?? ""} `), G(o, `${t ?? ""} `), X(s, V(N).props.alt ?? ""), Z(s, "placeholder", n), G(l, `${i ?? ""} `), X(u, V(N).props.href ?? ""), Z(u, "placeholder", a);
				}, [
					() => Q("ui.changeImage"),
					() => Q("lbl.description"),
					() => Q("ph.altText"),
					() => Q("lbl.link"),
					() => Q("ph.optionalImageLink")
				]), H("change", i, Mt), H("change", s, (e) => _t("alt", e.target.value)), H("change", u, (e) => _t("href", e.target.value || null)), W(e, t);
			}, s = (e) => {
				var t = Us(), n = R(t), r = L(n, !0);
				M(n);
				var i = z(n, 2);
				Y(i);
				var a = z(i, 2), o = L(a), s = z(o);
				Y(s), M(a), B((e, t, a, c) => {
					Z(n, "title", e), G(r, t), X(i, V(N).props.url ?? ""), Z(i, "placeholder", a), G(o, `${c ?? ""} `), X(s, V(N).props.title ?? "");
				}, [
					() => Q("hint.video"),
					() => Q("lbl.videoUrl"),
					() => Q("ph.videoUrl"),
					() => Q("lbl.videoTitle")
				]), H("change", i, (e) => _t("url", e.target.value)), H("change", s, (e) => _t("title", e.target.value)), W(e, t);
			}, l = (e) => {
				var t = qs(), n = R(t), r = L(n), i = z(r), a = L(i);
				{
					let e = /* @__PURE__ */ P(() => V(N).props.glyph ?? "★"), t = /* @__PURE__ */ P(() => V(N).props.icon ?? null), n = /* @__PURE__ */ P(() => V(N).props.image ?? null);
					ba(a, {
						get value() {
							return V(e);
						},
						get icon() {
							return V(t);
						},
						get image() {
							return V(n);
						},
						onpick: (e) => gt(`edit:${V(N).blockId}`, (t) => {
							t.props.glyph = e, t.props.icon = null, t.props.image = null;
						}),
						onicon: (e) => gt(`edit:${V(N).blockId}`, (t) => {
							t.props.icon = e, t.props.image = null;
						}),
						onimage: (e) => _t("image", e)
					});
				}
				var o = z(a, 2), s = (e) => {
					var t = Ws();
					Y(t), B((e) => {
						X(t, V(N).props.glyph ?? ""), Z(t, "title", e);
					}, [() => Q("tip.icon.typeGlyph")]), H("change", t, (e) => _t("glyph", e.target.value || "★")), W(e, t);
				}, c = (e) => {
					var t = Gs(), n = L(t, !0);
					M(t), B((e, r) => {
						Z(t, "title", e), G(n, r);
					}, [() => Q("tip.icon.backToGlyph"), () => Q("ui.removeDrawnIcon")]), H("click", t, () => _t("icon", null)), W(e, t);
				};
				K(o, (e) => {
					V(N).props.icon ? e(c, -1) : e(s);
				}), M(i), M(n);
				var l = z(n, 2), u = (e) => {
					var t = Ks(), n = L(t), r = z(n, 2), i = L(r, !0);
					M(r), M(t), B((e, r, a) => {
						Z(t, "title", e), Z(n, "src", V(N).props.image), Z(n, "alt", r), G(i, a);
					}, [
						() => Q("hint.icon.ownImage"),
						() => Q("gp.ownIcon"),
						() => Q("ui.removeOwnIcon")
					]), H("click", r, () => _t("image", null)), W(e, t);
				};
				K(l, (e) => {
					V(N).props.image && e(u);
				}), B((e) => G(r, `${e ?? ""} `), [() => Q("blocks.icon")]), W(e, t);
			}, u = (e) => {
				var t = Js(), n = R(t), r = L(n), i = z(r);
				{
					let e = /* @__PURE__ */ P(() => V(N).props.collection ?? ""), t = /* @__PURE__ */ P(() => [["", Q("common.choose")], ...V(Ni).map((e) => [e, V(Pi)[e]?.name ?? e])]);
					$(i, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => _t("collection", e || null)
					});
				}
				M(n);
				var a = z(n, 2), o = L(a), s = z(o);
				Y(s), M(a);
				var c = z(a, 2), l = L(c);
				Y(l);
				var u = z(l);
				M(c), B((e, t, i, c, d) => {
					Z(n, "title", e), G(r, `${t ?? ""} `), Z(a, "title", i), G(o, `${c ?? ""} `), X(s, V(N).props.limit ?? 6), ii(l, V(N).props.newestFirst !== !1), G(u, ` ${d ?? ""}`);
				}, [
					() => Q("tip.samling.source"),
					() => Q("blocks.samling"),
					() => Q("tip.samling.limit"),
					() => Q("lbl.maxCount"),
					() => Q("lbl.newestFirst")
				]), H("change", s, (e) => _t("limit", Number(e.target.value))), H("change", l, (e) => _t("newestFirst", e.target.checked)), W(e, t);
			}, d = (e) => {
				var t = Xs(), n = R(t), r = L(n), i = z(r);
				M(n), Br(z(n, 2), 17, () => V(N).props.images ?? [], Lr, (e, t, n) => {
					var r = Ys(), i = L(r), a = L(i), o = z(a, 2), s = L(o);
					s.disabled = n === 0, J(s, () => c.up, !0), M(s);
					var l = z(s, 2);
					J(l, () => c.down, !0), M(l);
					var u = z(l, 2);
					J(u, () => c.cross, !0), M(u), M(o), M(i);
					var d = z(i, 2), f = L(d), p = z(f);
					Y(p), M(d);
					var m = z(d, 2), h = L(m), g = z(h);
					Y(g), M(m), M(r), B((e, r, o, s, c, d) => {
						Z(i, "title", e), Z(a, "src", V(t).src), l.disabled = n === V(N).props.images.length - 1, Z(u, "title", r), G(f, `${o ?? ""} `), X(p, V(t).alt ?? ""), Z(p, "placeholder", s), G(h, `${c ?? ""} `), X(g, V(t).href ?? ""), Z(g, "placeholder", d);
					}, [
						() => Q("hint.gallery"),
						() => Q("tip.removeImage"),
						() => Q("lbl.description"),
						() => Q("ph.altShort"),
						() => Q("lbl.link"),
						() => Q("ph.galleryHref")
					]), H("click", s, () => Ju(n, -1)), H("click", l, () => Ju(n, 1)), H("click", u, () => Yu(n)), H("change", p, (e) => Xu(n, "alt", e.target.value)), H("change", g, (e) => Xu(n, "href", e.target.value || null)), W(e, r);
				}), B((e, t) => {
					Z(n, "title", e), G(r, `${t ?? ""} `);
				}, [() => Q("tip.gallery.addImages"), () => Q("ui.addImages")]), H("change", i, Ku), W(e, t);
			}, f = (e) => {
				var t = Ns(), n = L(t);
				$(z(n), {
					get value() {
						return V(N).props.kind;
					},
					get options() {
						return Pt;
					},
					onchange: (e) => _t("kind", e)
				}), M(t), B((e) => G(n, `${e ?? ""} `), [() => Q("blocks.shape")]), W(e, t);
			}, p = (e) => {
				let t = /* @__PURE__ */ P(() => V(Lu).find((e) => e.type === V(N).type)?.fields ?? []);
				var n = jr(), r = R(n), i = (e) => {
					var n = jr();
					Br(R(n), 17, () => V(t), (e) => e.key, (e, t) => {
						var n = jr(), r = R(n), i = (e) => {
							let n = /* @__PURE__ */ P(() => `${V(N).blockId}:${V(t).key}`);
							var r = Qs(), i = R(r), a = L(i), o = z(a);
							Y(o), M(i);
							var s = z(i, 2), c = L(s, !0);
							M(s);
							var l = z(s, 2), u = (e) => {
								var t = Zs();
								let r;
								var i = L(t, !0);
								M(t), B(() => {
									r = Zr(t, 1, "panel-hint svelte-1n46o8q", null, r, { "place-error": bt[V(n)].err }), G(i, bt[V(n)].text);
								}), W(e, t);
							};
							K(l, (e) => {
								bt[V(n)] && e(u);
							}), B((e) => {
								G(a, `${V(t).label ?? ""} `), Z(o, "placeholder", V(t).placeholder), X(o, yt[V(n)] ?? V(N).props[V(t).key] ?? ""), s.disabled = V(xt), G(c, e);
							}, [() => Q("props.place.search")]), H("input", o, (e) => {
								yt[V(n)] = e.target.value;
							}), H("keydown", o, (e) => {
								e.key === "Enter" && wt(V(t));
							}), H("click", s, () => wt(V(t))), W(e, r);
						}, a = (e) => {
							var n = $s(), r = L(n), i = z(r);
							Y(i), M(n), B(() => {
								G(r, `${V(t).label ?? ""} `), Z(i, "min", V(t).min), Z(i, "max", V(t).max), Z(i, "step", V(t).step ?? 1), X(i, V(N).props[V(t).key]);
							}), H("change", i, (e) => _t(V(t).key, Ct(V(t), Number(e.target.value)))), W(e, n);
						}, o = (e) => {
							var n = Vs(), r = L(n);
							Y(r);
							var i = z(r);
							M(n), B((e) => {
								ii(r, e), G(i, ` ${V(t).label ?? ""}`);
							}, [() => !!V(N).props[V(t).key]]), H("change", r, (e) => _t(V(t).key, e.target.checked)), W(e, n);
						}, s = (e) => {
							var n = Ns(), r = L(n), i = z(r);
							{
								let e = /* @__PURE__ */ P(() => (V(t).options ?? []).map((e) => [e.value, e.label]));
								$(i, {
									get value() {
										return V(N).props[V(t).key];
									},
									get options() {
										return V(e);
									},
									onchange: (e) => _t(V(t).key, e)
								});
							}
							M(n), B(() => G(r, `${V(t).label ?? ""} `)), W(e, n);
						}, c = (e) => {
							var n = ec(), r = L(n), i = z(r);
							Y(i), M(n), B(() => {
								G(r, `${V(t).label ?? ""} `), Z(i, "placeholder", V(t).placeholder), X(i, V(N).props[V(t).key] ?? "");
							}), H("change", i, (e) => _t(V(t).key, e.target.value)), W(e, n);
						};
						K(r, (e) => {
							V(t).type === "place" ? e(i) : V(t).type === "number" ? e(a, 1) : V(t).type === "toggle" ? e(o, 2) : V(t).type === "select" ? e(s, 3) : e(c, -1);
						}), W(e, n);
					}), W(e, n);
				}, a = (e) => {
					var t = Gs(), n = L(t, !0);
					M(t), B((e, r) => {
						Z(t, "title", e), G(n, r);
					}, [() => Q("hint.pluginBlock"), () => Q("ui.settings")]), H("click", t, () => k?.sendOpenConfig(V(N).blockId)), W(e, t);
				};
				K(r, (e) => {
					V(t).length ? e(i) : e(a, -1);
				}), W(e, n);
			};
			K(n, (e) => {
				V(N).type === "text" ? e(r) : V(N).type === "faq" ? e(i, 1) : V(N).type === "button" ? e(a, 2) : V(N).type === "image" ? e(o, 3) : V(N).type === "video" ? e(s, 4) : V(N).type === "icon" ? e(l, 5) : V(N).type === "samling" ? e(u, 6) : V(N).type === "galleri" ? e(d, 7) : V(N).type === "shape" ? e(f, 8) : e(p, -1);
			}), W(e, t);
		}, m = (e) => {
			var t = mc(), n = R(t), r = (e) => {
				var t = tc(), n = R(t), r = L(n), a = z(r);
				{
					let e = /* @__PURE__ */ P(() => V(N).props.align ?? "left"), t = /* @__PURE__ */ P(() => [
						["left", Q("common.left")],
						["center", Q("common.center")],
						["right", Q("common.right")]
					]);
					$(a, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => _t("align", e)
					});
				}
				M(n);
				var o = z(n, 2), s = L(o);
				Y(s);
				var c = z(s);
				M(o);
				var l = z(o, 2), u = (e) => {
					i(e);
				};
				K(l, (e) => {
					V(N).props.box && e(u);
				}), Me(2), B((e, t, n) => {
					G(r, `${e ?? ""} `), ii(s, t), G(c, ` ${n ?? ""}`);
				}, [
					() => Q("lbl.align"),
					() => !!V(N).props.box,
					() => Q("lbl.textBoxToggle")
				]), H("change", s, (e) => _t("box", e.target.checked)), W(e, t);
			}, a = (e) => {
				var t = nc(), n = R(t), r = L(n, !0);
				M(n);
				var a = z(n, 2);
				i(a), Me(2), B((e) => G(r, e), [() => Q("lbl.cardStyle")]), W(e, t);
			}, o = (e) => {
				var t = rc(), n = R(t), r = L(n), i = z(r);
				{
					let e = /* @__PURE__ */ P(() => [["primary", Q("opt.btn.primary")], ["secondary", Q("opt.btn.secondary")]]);
					$(i, {
						get value() {
							return V(N).props.style;
						},
						get options() {
							return V(e);
						},
						onchange: (e) => _t("style", e)
					});
				}
				M(n), Me(2), B((e) => G(r, `${e ?? ""} `), [() => Q("lbl.style")]), W(e, t);
			}, s = (e) => {
				var t = ic(), n = R(t), r = L(n), i = z(r);
				{
					let e = /* @__PURE__ */ P(() => V(N).props.fit ?? "cover"), t = /* @__PURE__ */ P(() => [["cover", Q("opt.fitFrame.cover")], ["contain", Q("opt.fitFrame.contain")]]);
					$(i, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => _t("fit", e)
					});
				}
				M(n);
				var a = z(n, 2), o = L(a), s = z(o);
				{
					let e = /* @__PURE__ */ P(() => V(N).props.radius ?? ""), t = /* @__PURE__ */ P(() => [
						["", Q("common.none")],
						["sm", Q("opt.size.sm")],
						["md", Q("opt.radius.md")]
					]);
					$(s, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => _t("radius", e || null)
					});
				}
				M(a);
				var c = z(a, 2), l = L(c), u = z(l), d = L(u);
				M(u), M(c);
				var f = z(c, 2);
				Y(f);
				var p = z(f, 2), m = L(p), h = z(m), g = L(h);
				M(h), M(p);
				var _ = z(p, 2);
				Y(_);
				var v = z(_, 2), y = L(v), b = z(y), x = L(b);
				M(b), M(v);
				var S = z(v, 2);
				Y(S);
				var C = z(S, 2), w = L(C), T = z(w), E = L(T);
				M(T), M(C);
				var D = z(C, 2);
				Y(D);
				var ee = z(D, 2), te = L(ee), ne = z(te), re = L(ne);
				M(ne), M(ee);
				var ie = z(ee, 2);
				Y(ie);
				var ae = z(ie, 2), oe = L(ae), se = z(oe), ce = L(se);
				M(se), M(ae);
				var le = z(ae, 2);
				Y(le);
				var ue = z(le, 2), de = L(ue, !0);
				M(ue), Me(2), B((e, t, n, i, a, s, c, u, p, h, b, C, T, ee, ne, ae, se) => {
					G(r, `${e ?? ""} `), G(o, `${t ?? ""} `), G(l, `${n ?? ""} `), G(d, `${i ?? ""}%`), X(f, V(N).props.x ?? .5), G(m, `${a ?? ""} `), G(g, `${s ?? ""}%`), X(_, V(N).props.y ?? .5), Z(v, "title", c), G(y, `${u ?? ""} `), G(x, `${p ?? ""}x`), X(S, V(N).props.zoom ?? 1), G(w, `${h ?? ""} `), G(E, `${b ?? ""}%`), X(D, V(N).props.brightness ?? 1), G(te, `${C ?? ""} `), G(re, `${T ?? ""}%`), X(ie, V(N).props.contrast ?? 1), G(oe, `${ee ?? ""} `), G(ce, `${ne ?? ""}%`), X(le, V(N).props.saturate ?? 1), Z(ue, "title", ae), G(de, se);
				}, [
					() => Q("lbl.fit"),
					() => Q("lbl.radius"),
					() => Q("lbl.focusX"),
					() => Math.round((V(N).props.x ?? .5) * 100),
					() => Q("lbl.focusY"),
					() => Math.round((V(N).props.y ?? .5) * 100),
					() => Q("tip.zoomCrop"),
					() => Q("lbl.zoom"),
					() => (V(N).props.zoom ?? 1).toFixed(2),
					() => Q("lbl.brightness"),
					() => Math.round((V(N).props.brightness ?? 1) * 100),
					() => Q("lbl.contrast"),
					() => Math.round((V(N).props.contrast ?? 1) * 100),
					() => Q("lbl.saturate"),
					() => Math.round((V(N).props.saturate ?? 1) * 100),
					() => Q("tip.resetAdjust"),
					() => Q("ui.resetAdjust")
				]), H("input", f, (e) => _t("x", Number(e.target.value))), H("input", _, (e) => _t("y", Number(e.target.value))), H("input", S, (e) => _t("zoom", Number(e.target.value))), H("input", D, (e) => _t("brightness", Number(e.target.value))), H("input", ie, (e) => _t("contrast", Number(e.target.value))), H("input", le, (e) => _t("saturate", Number(e.target.value))), H("click", ue, () => gt(`edit:${V(N).blockId}`, (e) => {
					e.props.brightness = 1, e.props.contrast = 1, e.props.saturate = 1;
				})), W(e, t);
			}, c = (e) => {
				var t = ac(), n = R(t), r = L(n), i = z(r);
				Y(i), M(n);
				var a = z(n, 2), o = L(a), s = z(o);
				{
					let e = /* @__PURE__ */ P(() => V(N).props.color ?? "accent"), t = /* @__PURE__ */ P(Pn);
					Hi(s, {
						get value() {
							return V(e);
						},
						get tokens() {
							return V(t);
						},
						onchange: (e) => _t("color", e)
					});
				}
				M(a), Me(2), B((e, t, n) => {
					G(r, `${e ?? ""} `), X(i, V(N).props.size ?? 48), Z(a, "title", t), G(o, `${n ?? ""} `);
				}, [
					() => Q("lbl.sizePx"),
					() => Q("hint.icon.color"),
					() => Q("lbl.color")
				]), H("change", i, (e) => _t("size", Number(e.target.value))), W(e, t);
			}, l = (e) => {
				var t = rc(), n = R(t), r = L(n), i = z(r);
				{
					let e = /* @__PURE__ */ P(() => V(N).props.view ?? "cards"), t = /* @__PURE__ */ P(() => [
						["cards", Q("opt.collectionView.cards")],
						["list", Q("opt.collectionView.list")],
						["archive", Q("opt.collectionView.archive")]
					]);
					$(i, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => _t("view", e)
					});
				}
				M(n), Me(2), B((e) => G(r, `${e ?? ""} `), [() => Q("lbl.view")]), W(e, t);
			}, u = (e) => {
				var t = cc(), n = R(t), r = L(n), i = z(r);
				{
					let e = /* @__PURE__ */ P(() => V(N).props.view ?? "grid"), t = /* @__PURE__ */ P(() => [
						["grid", Q("opt.galleryView.grid")],
						["carousel", Q("opt.galleryView.carousel")],
						["slides", Q("opt.galleryView.slides")]
					]);
					$(i, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => _t("view", e)
					});
				}
				M(n);
				var a = z(n, 2), o = (e) => {
					var t = oc(), n = R(t), r = L(n), i = z(r);
					Y(i), M(n);
					var a = z(n, 2), o = L(a), s = z(o), c = L(s);
					M(s), M(a);
					var l = z(a, 2);
					Y(l), B((e, t) => {
						G(r, `${e ?? ""} `), X(i, V(N).props.columns ?? 3), G(o, `${t ?? ""} `), G(c, `${V(N).props.gap ?? 12 ?? ""} px`), X(l, V(N).props.gap ?? 12);
					}, [() => Q("lbl.columns"), () => Q("lbl.imageGap")]), H("change", i, (e) => _t("columns", Number(e.target.value))), H("input", l, (e) => _t("gap", Number(e.target.value))), W(e, t);
				};
				K(a, (e) => {
					(V(N).props.view ?? "grid") === "grid" && e(o);
				});
				var s = z(a, 2), c = (e) => {
					var t = sc(), n = L(t), r = z(n);
					Y(r), M(t), B((e) => {
						G(n, `${e ?? ""} `), X(r, V(N).props.interval ?? 5);
					}, [() => Q("lbl.secondsPerImage")]), H("change", r, (e) => _t("interval", Number(e.target.value))), W(e, t);
				};
				K(s, (e) => {
					V(N).props.view === "slides" && e(c);
				});
				var l = z(s, 2), u = L(l), d = z(u);
				{
					let e = /* @__PURE__ */ P(() => V(N).props.radius ?? ""), t = /* @__PURE__ */ P(() => [
						["", Q("common.none")],
						["sm", Q("opt.size.sm")],
						["md", Q("opt.radius.md")]
					]);
					$(d, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => _t("radius", e || null)
					});
				}
				M(l);
				var f = z(l, 2), p = L(f);
				Y(p);
				var m = z(p);
				M(f), Me(2), B((e, t, n, i) => {
					G(r, `${e ?? ""} `), G(u, `${t ?? ""} `), Z(f, "title", n), ii(p, V(N).props.lightbox !== !1), G(m, ` ${i ?? ""}`);
				}, [
					() => Q("lbl.view"),
					() => Q("lbl.radius"),
					() => Q("tip.lightbox"),
					() => Q("lbl.lightbox")
				]), H("change", p, (e) => _t("lightbox", e.target.checked)), W(e, t);
			}, d = (e) => {
				var t = lc(), n = R(t), r = L(n);
				$(z(r), {
					get value() {
						return V(N).props.color;
					},
					get options() {
						return Ft;
					},
					onchange: (e) => _t("color", e)
				}), M(n);
				var i = z(n, 2), a = L(i), o = z(a);
				Y(o), M(i);
				var s = z(i, 2), c = L(s);
				Y(c);
				var l = z(c);
				M(s), Me(2), B((e, t, n, i, u) => {
					G(r, `${e ?? ""} `), G(a, `${t ?? ""} `), X(o, V(N).props.thickness), Z(s, "title", n), ii(c, i), G(l, ` ${u ?? ""}`);
				}, [
					() => Q("lbl.color"),
					() => Q("lbl.thickness"),
					() => Q("tip.shape.fill"),
					() => !!V(N).props.fill,
					() => Q("lbl.filled")
				]), H("change", o, (e) => _t("thickness", Number(e.target.value))), H("change", c, (e) => _t("fill", e.target.checked ? V(N).props.color : null)), W(e, t);
			};
			K(n, (e) => {
				V(N).type === "text" ? e(r) : V(N).type === "faq" ? e(a, 1) : V(N).type === "button" ? e(o, 2) : V(N).type === "image" ? e(s, 3) : V(N).type === "icon" ? e(c, 4) : V(N).type === "samling" ? e(l, 5) : V(N).type === "galleri" ? e(u, 6) : V(N).type === "shape" && e(d, 7);
			});
			var f = z(n, 2), p = L(f), m = z(p);
			{
				let e = /* @__PURE__ */ P(() => Hn(V(N).animation) ? V(N).animation.type : "");
				$(m, {
					get value() {
						return V(e);
					},
					get options() {
						return Un;
					},
					onchange: (e) => Kn(e || null)
				});
			}
			M(f);
			var h = z(f, 2), g = (e) => {
				var t = uc(), n = R(t), r = L(n), i = z(r);
				Y(i), M(n);
				var a = z(n, 2), o = L(a), s = z(o);
				Y(s), M(a), B((e, t) => {
					G(r, `${e ?? ""} `), X(i, V(N).animation.props.duration), G(o, `${t ?? ""} `), X(s, V(N).animation.props.delay);
				}, [() => Q("lbl.durationMs"), () => Q("lbl.delayMs")]), H("change", i, (e) => Jn("duration", Number(e.target.value))), H("change", s, (e) => Jn("delay", Number(e.target.value))), W(e, t);
			}, _ = /* @__PURE__ */ P(() => Hn(V(N).animation));
			K(h, (e) => {
				V(_) && e(g);
			});
			var v = z(h, 2), y = L(v), b = z(y);
			{
				let e = /* @__PURE__ */ P(() => V(N).hover?.type ?? (V(N).animation && !Hn(V(N).animation) ? V(N).animation.type : ""));
				$(b, {
					get value() {
						return V(e);
					},
					get options() {
						return Wn;
					},
					onchange: (e) => qn(e || null)
				});
			}
			M(v);
			var x = z(v, 2), S = (e) => {
				var t = fc(), n = z(R(t), 2), r = L(n);
				Y(r);
				var i = z(r);
				M(n);
				var a = z(n, 2), o = (e) => {
					var t = dc(), n = R(t), r = L(n), i = z(r);
					Y(i), M(n);
					var a = z(n, 2), o = L(a), s = z(o);
					{
						let e = /* @__PURE__ */ P(() => V(N).sticky.until ?? ""), t = /* @__PURE__ */ P(mt);
						$(s, {
							get value() {
								return V(e);
							},
							get options() {
								return V(t);
							},
							onchange: (e) => gt(`edit:${V(N).blockId}`, (t) => {
								t.sticky = {
									...t.sticky,
									until: e || null
								};
							})
						});
					}
					M(a), B((e, t, s, c) => {
						Z(n, "title", e), G(r, `${t ?? ""} `), X(i, V(N).sticky.offset ?? 16), Z(a, "title", s), G(o, `${c ?? ""} `);
					}, [
						() => Q("tip.stickyOffset"),
						() => Q("lbl.stickyOffset"),
						() => Q("tip.stickyUntil"),
						() => Q("lbl.stickyUntil")
					]), H("change", i, (e) => gt(`edit:${V(N).blockId}`, (t) => {
						t.sticky = {
							...t.sticky,
							offset: Math.max(0, Number(e.target.value) || 0)
						};
					})), W(e, t);
				};
				K(a, (e) => {
					V(N).sticky && e(o);
				}), B((e, t, a) => {
					Z(n, "title", e), ii(r, t), G(i, ` ${a ?? ""}`);
				}, [
					() => Q("tip.sticky"),
					() => !!V(N).sticky,
					() => Q("lbl.sticky")
				]), H("change", r, (e) => gt(`edit:${V(N).blockId}`, (t) => {
					t.sticky = e.target.checked ? {
						offset: 16,
						until: null
					} : null;
				})), W(e, t);
			};
			K(x, (e) => {
				V(ee) === "desktop" && e(S);
			});
			var C = z(x, 4), w = L(C), T = L(w, !0);
			M(w);
			var E = z(w, 2), D = L(E), te = (e) => {
				var t = pc(), n = L(t), r = L(n, !0), i = z(r);
				Y(i), M(n);
				var a = z(n, 2), o = L(a, !0), s = z(o);
				Y(s), M(a);
				var c = z(a, 2), l = L(c, !0), u = z(l);
				Y(u), M(c);
				var d = z(c, 2), f = L(d, !0), p = z(f);
				Y(p), M(d);
				var m = z(d, 2), h = L(m, !0), g = z(h);
				Y(g), M(m);
				var _ = z(m, 2), v = L(_, !0), y = z(v);
				Y(y), M(_), M(t), B((e, t, n, a, c, d, _) => {
					G(r, e), X(i, V(N).frame.x), G(o, t), X(s, V(N).frame.y), G(l, n), X(u, V(N).frame.w), G(f, a), X(p, V(N).frame.h), Z(m, "title", c), G(h, d), X(g, V(N).frame.z ?? 1), G(v, _), X(y, V(N).frame.rot ?? 0);
				}, [
					() => Q("frame.x"),
					() => Q("frame.y"),
					() => Q("frame.w"),
					() => Q("frame.h"),
					() => Q("tip.frameZ"),
					() => Q("frame.z"),
					() => Q("frame.rot")
				]), H("change", i, (e) => Tt("x", Number(e.target.value))), H("change", s, (e) => Tt("y", Number(e.target.value))), H("change", u, (e) => Tt("w", Number(e.target.value))), H("change", p, (e) => Tt("h", Number(e.target.value))), H("change", g, (e) => Tt("z", Number(e.target.value))), H("change", y, (e) => Tt("rot", Number(e.target.value))), W(e, t);
			};
			K(D, (e) => {
				V(ee) === "desktop" && e(te);
			});
			var ne = z(D, 2), re = L(ne);
			Y(re);
			var ie = z(re);
			M(ne), M(E), M(C), B((e, t, n, r, i, a, o, s) => {
				Z(f, "title", e), G(p, `${t ?? ""} `), Z(v, "title", n), G(y, `${r ?? ""} `), Z(w, "title", i), G(T, a), Z(ne, "title", o), ii(re, V(N).decor), G(ie, ` ${s ?? ""}`);
			}, [
				() => Q("tip.props.blockAnim"),
				() => Q("lbl.animIn"),
				() => Q("tip.props.blockHover"),
				() => Q("lbl.onHover"),
				() => Q("hint.placement"),
				() => Q("group.placement"),
				() => Q("tip.decor"),
				() => Q("lbl.decor")
			]), H("change", re, (e) => jt(e.target.checked)), W(e, t);
		};
		K(f, (e) => {
			V(St) === "content" ? e(p) : e(m, -1);
		}), B((e, t) => {
			o = Zr(a, 1, "svelte-1n46o8q", null, o, { on: V(St) === "content" }), G(s, e), u = Zr(l, 1, "svelte-1n46o8q", null, u, { on: V(St) === "style" }), G(d, t);
		}, [() => Q("props.tabContent"), () => Q("props.tabStyle")]), H("click", a, () => I(St, "content")), H("click", l, () => I(St, "style")), W(e, t);
	}, o = [
		["color", So],
		["gradient", Po],
		["glow", Fo],
		["image", as],
		["bildegalleri", ls],
		["grain", Lo]
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
		kebab: "<svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"currentColor\" stroke=\"none\"><circle cx=\"12\" cy=\"5\" r=\"1.8\"/><circle cx=\"12\" cy=\"12\" r=\"1.8\"/><circle cx=\"12\" cy=\"19\" r=\"1.8\"/></svg>",
		bookmark: "<svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z\"/><path d=\"M12 7v6M9 10h6\"/></svg>",
		fit: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M4 9V5a1 1 0 0 1 1-1h4M20 9V5a1 1 0 0 0-1-1h-4M4 15v4a1 1 0 0 0 1 1h4M20 15v4a1 1 0 0 1-1 1h-4\"/></svg>"
	}, l = [
		["lilla", Q("adminTheme.lilla")],
		["bronn", Q("adminTheme.bronn")],
		["gull", Q("adminTheme.gull")],
		["graa", Q("adminTheme.graa")],
		["nordlys", Q("adminTheme.nordlys")],
		["skumring", Q("adminTheme.skumring")],
		["glo", Q("adminTheme.glo")]
	], u = /* @__PURE__ */ F(tn(localStorage.getItem("urd-admin-theme") ?? "graa"));
	bn(() => {
		document.documentElement.dataset.adminTheme = V(u), localStorage.setItem("urd-admin-theme", V(u)), f();
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
		return bo(e) == null || (xo(e, "#ffffff") ?? 0) >= (xo(e, "#0b0e14") ?? 0) ? "#ffffff" : "#0b0e14";
	}
	let h = /* @__PURE__ */ F(null), g = /* @__PURE__ */ F(null), _ = /* @__PURE__ */ F(!1), v = /* @__PURE__ */ F(""), y = /* @__PURE__ */ F("info"), b = 0;
	function x(e, t = "info") {
		I(v, e, !0), I(y, t, !0);
		let n = ++b;
		t === "ok" && setTimeout(() => {
			b === n && (I(v, ""), I(y, "info"));
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
	let w = /* @__PURE__ */ F(null), T = /* @__PURE__ */ F(null), E = /* @__PURE__ */ F(tn({
		size: 16,
		snap: !0
	})), D = /* @__PURE__ */ F(!0), ee = /* @__PURE__ */ F("desktop"), te = /* @__PURE__ */ F(null), ne = /* @__PURE__ */ F(0), re = /* @__PURE__ */ F(0), ie = /* @__PURE__ */ F(tn(typeof window < "u" ? window.innerWidth : 1280)), ae = /* @__PURE__ */ F("fit"), oe = /* @__PURE__ */ F(1), se = /* @__PURE__ */ P(() => V(ee) === "mobile" ? 390 : V(ie)), ce = /* @__PURE__ */ P(() => V(ae) === "manual" ? V(oe) : Ca(V(ne), V(se), "fit"));
	function le(e) {
		let t = Math.min(400, Math.max(10, (Math.round(Math.round(V(ce) * 100) / 10) + e) * 10));
		I(oe, t / 100), I(ae, "manual");
	}
	let ue = /* @__PURE__ */ P(() => V(ce) > 0 ? V(re) / V(ce) : V(re)), de = /* @__PURE__ */ P(() => V(se) * V(ce)), fe = /* @__PURE__ */ P(() => V(re));
	bn(() => {
		let e = () => k?.sendCloseMenus();
		return document.addEventListener("pointerdown", e, !0), () => document.removeEventListener("pointerdown", e, !0);
	}), bn(() => {
		let e = V(ee);
		k?.sendViewport(e);
	}), bn(() => {
		let e = () => {
			I(ie, window.innerWidth, !0);
		};
		return window.addEventListener("resize", e), () => window.removeEventListener("resize", e);
	}), bn(() => {
		let e = V(te);
		if (!e || typeof ResizeObserver > "u") return;
		let t = () => {
			let t = e.getBoundingClientRect();
			I(ne, t.width, !0), I(re, t.height, !0);
		};
		t();
		let n = new ResizeObserver(t);
		return n.observe(e), () => n.disconnect();
	});
	let pe = /* @__PURE__ */ F(0);
	function me() {
		I(pe, O?.data.sections.filter((e) => e.responsive?.mobile?.attention?.needed).length ?? 0, !0);
	}
	function he(e) {
		let t = O.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			Ee("layout");
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
			}, ge(t, "oppsett-byttet"), e.sectionId === V(It) && I(Rt, e.minHeight, !0), V(N)?.sectionId === e.sectionId && dt(), O.save(), j(), k?.sendSection(V(g), t);
		}
	}
	function ge(e, t) {
		!e || e.responsive?.mobile?.mode !== "manual" || e.responsive.mobile.attention?.needed || (e.responsive.mobile.attention = {
			needed: !0,
			reason: t,
			since: (/* @__PURE__ */ new Date()).toISOString()
		}, me(), k?.sendAttention(e.id, !0));
	}
	let O = null, _e = null, k = null, A = /* @__PURE__ */ F(null);
	function ve() {
		I(A, _e.data, !0), _e.replace(V(A));
	}
	function ye() {
		k?.sendSite(ze(V(A)));
	}
	let be = /* @__PURE__ */ new Set(), xe = () => V(A).pages.find((e) => e.id === V(g));
	function j() {
		let e = V(A)?.pages?.some((e) => !be.has(e.id) && localStorage.getItem(`urd-draft-${e.id}`) !== null) ?? !1, t = Oi?.hasDraft() || Object.values(ki).some((e) => e.hasDraft()), n = zi?.hasDraft() || Object.values(Bi).some((e) => e.hasDraft());
		I(_, e || O?.hasDraft() && !be.has(V(g)) || _e?.hasDraft() || va?.hasDraft() || t || n || !1, !0);
	}
	let Se = [], Ce = [], we = null;
	function Te() {
		return JSON.stringify({
			pageId: V(g),
			page: O.data,
			site: _e.data,
			samlingerIndex: Mi ? Oi.data : null,
			samlinger: Mi ? Object.fromEntries(Object.entries(ki).map(([e, t]) => [e, t.data])) : {},
			malerIndex: Ui ? zi.data : null,
			maler: Ui ? Object.fromEntries(Object.entries(Bi).map(([e, t]) => [e, t.data])) : {},
			plugins: va?.data ?? null
		});
	}
	function Ee(e) {
		e === we && (e.startsWith("edit:") || e.startsWith("grid:")) || (Se.push(Te()), Se.length > 50 && Se.shift(), Ce.length = 0, we = e);
	}
	function De(e) {
		let { pageId: t, page: n, site: r, samlingerIndex: i, samlinger: a, malerIndex: o, maler: s, plugins: c } = JSON.parse(e);
		if (_e.replace(r), ve(), _e.save(), I(E, {
			snap: !0,
			...V(A).grid
		}, !0), ye(), Oe(i, a ?? {}), ke(o, s ?? {}), Ae(c), t && t !== V(g) && V(A).pages.some((e) => e.id === t)) {
			C(`urd-draft-${t}`, JSON.stringify(n)), Or(t, { keepHistory: !0 }), j();
			return;
		}
		O.replace(n), O.save(), j(), me(), dt(), Ut(O.data.sections.find((e) => e.id === V(It))), V(A).pages.some((e) => e.id === V(g)) ? k?.sendPage(V(g), O.data) : Or(V(A).pages[0].id, { keepHistory: !0 });
	}
	function Oe(e, t) {
		if (!(!Oi || !e) && JSON.stringify({
			index: Oi.data,
			samlinger: Object.fromEntries(Object.entries(ki).map(([e, t]) => [e, t.data]))
		}) !== JSON.stringify({
			index: e,
			samlinger: t
		})) {
			Oi.replace(e), Oi.save();
			for (let e of Object.keys(ki)) e in t || (localStorage.removeItem(`urd-draft-samling-${e}`), delete ki[e]);
			for (let [e, n] of Object.entries(t)) {
				if (!ki[e]) {
					let t = ji[e] ?? null;
					ki[e] = Ai(`urd-draft-samling-${e}`, () => t, S);
				}
				ki[e].replace(n), ki[e].save();
			}
			I(Ni, [...e.samlinger ?? []], !0), V(Fi) && !V(Ni).includes(V(Fi)) && I(Fi, null), ia();
		}
	}
	function ke(e, t) {
		if (!(!zi || !e) && JSON.stringify({
			index: zi.data,
			maler: Object.fromEntries(Object.entries(Bi).map(([e, t]) => [e, t.data]))
		}) !== JSON.stringify({
			index: e,
			maler: t
		})) {
			zi.replace(e), zi.save();
			for (let e of Object.keys(Bi)) e in t || (localStorage.removeItem(`urd-draft-mal-${e}`), delete Bi[e]);
			for (let [e, n] of Object.entries(t)) Bi[e] || (Bi[e] = Ai(`urd-draft-mal-${e}`, () => Vi[e] ?? null, S)), Bi[e].replace(n), Bi[e].save();
			I(Wi, [...e.maler ?? []], !0), j(), qi();
		}
	}
	function Ae(e) {
		!va || !e || JSON.stringify(va.data) !== JSON.stringify(e) && (va.replace(e), va.save(), Ha(), Za());
	}
	function je() {
		Se.length && (Ce.push(Te()), De(Se.pop()), we = null, x(Q("status.undone")));
	}
	function Ne() {
		Ce.length && (Se.push(Te()), De(Ce.pop()), we = null, x(Q("status.redone")));
	}
	function Pe(e) {
		V(pt) && (e.target instanceof Element && e.target.closest(".block-menu") || I(pt, null));
	}
	function Fe(e) {
		if (e.key === "Escape" && V(pt)) {
			I(pt, null);
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
			].includes(t.type)) || !V(N) || V(ee) === "mobile") return;
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
		].includes(n.type)) || (e.preventDefault(), t === "y" || e.shiftKey ? Ne() : je());
	}
	async function Ie() {
		I(h, ja(await (await fetch("/content/site.json")).json()), !0), _e = Ai("urd-draft-site", () => V(h), S), (_e.data.schemaVersion ?? 1) > 1 && (console.warn(`Urd: site-utkastet har schemaVersion ${_e.data.schemaVersion} (motoren har 1) og forkastes`), _e.replace(ze(V(h)))), _e.replace(ja(_e.data)), _e.save(), ve(), I(E, {
			snap: !0,
			...V(A).grid
		}, !0), await Or(new URLSearchParams(location.search).get("page") ?? V(A).pages[0].id), await Ka(), await ra(), await Gi(), await ir(), V(T) && or(), V(A).site.setup === !0 && !localStorage.getItem("urd-setup-done") && (I(Ge, V(A).site.title, !0), I(Ke, V(A).theme.tokens.color.accent, !0), I(qe, V(A).theme.tokens.color.bg, !0), I(He, !0));
	}
	let Le = /* @__PURE__ */ F(null);
	function Re({ title: e, lines: t = [], okLabel: n = Q("confirm.ok"), cancelLabel: r = Q("confirm.cancel") }) {
		return new Promise((i) => {
			I(Le, {
				title: e,
				lines: t,
				okLabel: n,
				cancelLabel: r,
				resolve: i
			}, !0);
		});
	}
	function Be({ title: e, lines: t = [], value: n = "", placeholder: r = "", okLabel: i = Q("confirm.ok"), cancelLabel: a = Q("confirm.cancel") }) {
		return new Promise((o) => {
			I(Le, {
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
	function Ve(e) {
		V(Le)?.resolve(V(Le).prompt ? e ? V(Le).value : null : e), I(Le, null);
	}
	let He = /* @__PURE__ */ F(!1), Ge = /* @__PURE__ */ F(""), Ke = /* @__PURE__ */ F("#7c5cff"), qe = /* @__PURE__ */ F("#0b0e14");
	function Je() {
		localStorage.setItem("urd-setup-done", "1"), I(He, !1);
	}
	function Ye() {
		let e = V(Ge).trim();
		e && (q("setup", () => {
			V(A).site.title = e, V(A).nav.logo = {
				type: "text",
				value: e
			}, V(A).theme.tokens.color.accent = V(Ke), V(A).theme.tokens.color.bg = V(qe), delete V(A).site.setup;
		}), Je(), x(Q("status.setupDone"), "ok"));
	}
	let Xe = /* @__PURE__ */ F(null), Ze = [
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
	], Qe = Object.fromEntries(Ze.flat().map((e) => [e, Q(`panel.${e}`)])), $e = {
		pages: ["hint.pages.drafts"],
		blocks: ["hint.blocks.intro"],
		grid: ["hint.grid.intro", "hint.grid.section"],
		collections: ["hint.collections.intro"],
		plugins: ["hint.plugins.intro"],
		history: ["hint.history.intro"]
	}, et = [
		["se", "Davvisámegiella"],
		["en-GB", "English (UK)"],
		["nb", "Norsk bokmål"],
		["nn", "Norsk nynorsk"],
		["tr", "Türkçe"]
	], tt = (e) => [...e].sort((e, t) => e[1].localeCompare(t[1]));
	function nt(e, t) {
		let n = [];
		for (let r of e) for (let e of Ta[r]?.languages ?? []) e?.[t] === !0 && (typeof e.code != "string" || typeof e.name != "string" || !e.name || et.some(([t]) => t === e.code) || n.some(([t]) => t === e.code) || n.push([e.code, e.name]));
		return n;
	}
	function rt() {
		let e = tt([...et, ...nt(V(Na), "admin")]);
		return st === "auto" || e.some(([e]) => e === st) ? e : [[st, st], ...e];
	}
	let it = () => nt(V(wa)?.enabled ?? [], "site"), st = localStorage.getItem("urd-admin-lang") ?? "auto";
	function ct(e) {
		e !== st && (e === "auto" ? localStorage.removeItem("urd-admin-lang") : localStorage.setItem("urd-admin-lang", e), location.reload());
	}
	function lt(e) {
		I(Xe, V(Xe) === e ? null : e, !0), k?.sendShowGrid(V(Xe) === "grid"), V(Xe) === "history" && dr(), V(Xe) === "update" && !V(vr) && xr();
	}
	let N = /* @__PURE__ */ F(null);
	function ut(e, t) {
		let n = O?.data.sections.find((t) => t.id === e);
		return {
			section: n,
			block: n?.blocks.find((e) => e.id === t)
		};
	}
	function dt() {
		if (!V(N)) return;
		let { block: e } = ut(V(N).sectionId, V(N).blockId);
		if (!e) {
			I(N, null);
			return;
		}
		I(N, {
			sectionId: V(N).sectionId,
			blockId: V(N).blockId,
			type: e.type,
			decor: !!e.decor,
			props: JSON.parse(JSON.stringify(e.props)),
			frame: { ...e.frames.desktop },
			animation: e.animation ? JSON.parse(JSON.stringify(e.animation)) : null,
			hover: e.hover ? JSON.parse(JSON.stringify(e.hover)) : null,
			sticky: e.sticky ? JSON.parse(JSON.stringify(e.sticky)) : null
		}, !0);
	}
	function ft(e) {
		if (I(pt, null), !e.blockId) {
			I(N, null);
			return;
		}
		I(N, {
			sectionId: e.sectionId,
			blockId: e.blockId
		}, !0), e.sectionId && I(It, e.sectionId, !0), dt();
	}
	let pt = /* @__PURE__ */ F(null);
	function mt() {
		let e = O?.data.sections ?? [], t = e.findIndex((e) => e.id === V(N)?.sectionId);
		return [["", Q("opt.sticky.ownSection")], ...e.slice(t + 1).map((e, n) => [e.id, Q("opt.sticky.atSection", { n: t + 2 + n })])];
	}
	function ht(e) {
		if (ft(e), !V(N)) return;
		let t = V(w)?.getBoundingClientRect();
		if (!t) return;
		let n = t.left + V(ce) * e.rect.right + 12;
		n + 300 > window.innerWidth - 8 && (n = Math.max(8, t.left + V(ce) * e.rect.left - 300 - 12));
		let r = window.innerHeight - Math.min(window.innerHeight * .7, 560) - 8, i = Math.min(Math.max(8, t.top + V(ce) * e.rect.top), Math.max(8, r));
		I(pt, {
			left: n,
			top: i
		}, !0);
	}
	function gt(e, t) {
		let { section: n, block: r } = ut(V(N)?.sectionId, V(N)?.blockId);
		r && (Ee(e), t(r, n), ge(n, "blokk-endret"), O.save(), j(), k?.sendSection(V(g), n), dt());
	}
	function _t(e, t) {
		gt(`edit:${V(N).blockId}:${e}`, (n) => {
			n.props[e] = t;
		});
	}
	function vt(e, t) {
		gt(`edit:${V(N).blockId}:${e}`, (e) => {
			Object.assign(e.props, t);
		});
	}
	let yt = tn({}), bt = tn({}), xt = /* @__PURE__ */ F(!1), St = /* @__PURE__ */ F("content"), Ct = (e, t) => (Number.isFinite(t) || (t = e.min ?? 0), e.min != null && (t = Math.max(e.min, t)), e.max != null && (t = Math.min(e.max, t)), t);
	async function wt(e) {
		let t = V(N).blockId, n = `${t}:${e.key}`, r = (yt[n] ?? V(N).props[e.key] ?? "").trim();
		bt[n] = null;
		let i = r.match(/^(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)$/);
		if (!r || i || /^https?:\/\//i.test(r)) {
			vt(e.key, {
				[e.key]: r,
				lat: i ? Number(i[1]) : null,
				lon: i ? Number(i[2]) : null
			});
			return;
		}
		I(xt, !0), bt[n] = {
			text: Q("props.place.searching"),
			err: !1
		};
		try {
			let i = await fetch(`/api/geocode?q=${encodeURIComponent(r)}`), a = await i.json().catch(() => null);
			if (V(N)?.blockId !== t) return;
			i.ok && Number.isFinite(a?.lat) ? (vt(e.key, {
				[e.key]: r,
				lat: a.lat,
				lon: a.lon
			}), bt[n] = null) : bt[n] = {
				text: Ti(a) ?? Q("props.place.notFound"),
				err: !0
			};
		} catch {
			bt[n] = {
				text: Q("props.place.failed"),
				err: !0
			};
		} finally {
			I(xt, !1);
		}
	}
	function Tt(e, t) {
		Number.isFinite(t) && gt(`edit:frame-${V(N).blockId}:${e}`, (n) => {
			n.frames.desktop = {
				...n.frames.desktop,
				[e]: t
			};
		});
	}
	function Et(e) {
		gt(`edit:${V(N).blockId}:boxStyle`, (t) => {
			let n = {
				...t.props.boxStyle ?? {},
				...e
			};
			for (let e of Object.keys(n)) n[e] ?? delete n[e];
			Object.keys(n).length ? t.props.boxStyle = n : delete t.props.boxStyle;
		});
	}
	function Dt(e, t) {
		gt(`edit:${V(N).blockId}:faq${e}`, (n) => {
			n.props.items[e] = {
				...n.props.items[e],
				...t
			};
		});
	}
	function Ot() {
		gt("faq-item", (e) => {
			(e.props.items ??= []).push({
				q: Q("seed.faq.newQ"),
				a: Q("seed.faq.answer")
			});
		});
	}
	function kt(e) {
		gt("faq-item", (t) => {
			t.props.items.splice(e, 1);
		});
	}
	function At(e, t) {
		let n = e + t;
		gt("faq-item", (t) => {
			n < 0 || n >= t.props.items.length || ([t.props.items[e], t.props.items[n]] = [t.props.items[n], t.props.items[e]]);
		});
	}
	function jt(e) {
		gt("decor", (t) => {
			t.decor = e;
		});
	}
	async function Mt(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await wn(t);
			gt(`edit:${V(N).blockId}`, (n) => {
				n.props.src = e.dataUrl, n.props.alt = n.props.alt || $i(t.name).replaceAll("-", " ");
			});
		} catch {
			x(Q("status.imageReadError"), "error");
		}
	}
	let Nt = {
		text: Q("blocks.text"),
		button: Q("blocks.button"),
		image: Q("blocks.image"),
		shape: Q("blocks.shape"),
		video: Q("blocks.video"),
		icon: Q("blocks.icon"),
		galleri: Q("blocks.galleri"),
		faq: Q("blocks.faq")
	}, Pt = [
		["line", Q("shape.line")],
		["arrow", Q("shape.arrow")],
		["circle", Q("shape.circle")],
		["rect", Q("shape.rect")],
		["triangle", Q("shape.triangle")]
	], Ft = [
		["accent", Q("color.accent")],
		["text", Q("color.text")],
		["surface", Q("color.surface")],
		["bg", Q("color.bg")]
	], It = /* @__PURE__ */ F(null), Lt = /* @__PURE__ */ F(null), Rt = /* @__PURE__ */ F(""), zt = /* @__PURE__ */ F(tn([])), Bt = /* @__PURE__ */ F(null), Vt = /* @__PURE__ */ F(null), Ht = /* @__PURE__ */ F("");
	function Ut(e) {
		I(Lt, e?.grid ? { ...e.grid } : null, !0), I(Rt, e?.size?.minHeight ?? "", !0), I(zt, JSON.parse(JSON.stringify(e?.background?.layers ?? [])), !0), I(Bt, e?.animation ? JSON.parse(JSON.stringify(e.animation)) : null, !0), I(Vt, e?.hover ? JSON.parse(JSON.stringify(e.hover)) : null, !0), I(Ht, e?.theme ?? "", !0);
	}
	let Wt = /* @__PURE__ */ F(null), Gt = tn({});
	function Kt() {
		try {
			let e = ((V(w)?.contentDocument)?.querySelector(`.urd-section[data-section-id="${V(It)}"]`))?.getBoundingClientRect();
			I(Wt, e && e.width ? {
				w: e.width,
				h: e.height
			} : null, !0);
		} catch {
			I(Wt, null);
		}
	}
	bn(() => {
		V(It), V(zt), requestAnimationFrame(() => requestAnimationFrame(Kt));
	}), bn(() => {
		let e = V(w);
		if (!e || typeof ResizeObserver > "u") return;
		let t = new ResizeObserver(() => Kt());
		return t.observe(e), () => t.disconnect();
	}), bn(() => {
		for (let e of V(zt)) {
			let t = e?.props?.src;
			if (e?.type === "image" && t && !Gt[t]) {
				let e = new Image();
				e.onload = () => {
					Gt[t] = {
						w: e.naturalWidth,
						h: e.naturalHeight
					};
				}, e.src = t;
			}
		}
	});
	function qt(e) {
		Yt("section-theme", (t) => {
			e ? t.theme = e : delete t.theme;
		});
	}
	function Jt(e) {
		I(It, e.sectionId, !0), Ut(O?.data.sections.find((t) => t.id === e.sectionId));
	}
	function Yt(e, t) {
		let n = O.data.sections.find((e) => e.id === V(It));
		n && (Ee(e), t(n), O.save(), j(), k?.sendSection(V(g), n), Ut(n));
	}
	let Xt = /* @__PURE__ */ F("color");
	function Zt(e, t) {
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
	function Qt(e, t) {
		e.mutate(e.keyPrefix, (e) => {
			e.background.layers.splice(t, 1), e.background.layers.length || delete e.background;
		});
	}
	function $t(e, t, n) {
		let r = t + n;
		e.mutate(e.keyPrefix, (e) => {
			let n = e.background.layers;
			r < 0 || r >= n.length || ([n[t], n[r]] = [n[r], n[t]]);
		});
	}
	function en(e, t, n, r) {
		e.mutate(`edit:${e.keyPrefix}-${e.keyId}-${t}-${n}`, (e) => {
			e.background.layers[t].props[n] = r;
		});
	}
	function rn(e, t, n, r = "xy") {
		e.preventDefault();
		let i = e.currentTarget;
		i.setPointerCapture?.(e.pointerId);
		let a = (e) => {
			let a = i.getBoundingClientRect();
			if (r.includes("x")) {
				let r = Math.min(1, Math.max(0, (e.clientX - a.left) / a.width));
				en(t, n, "x", Math.round(r * 100) / 100);
			}
			if (r.includes("y")) {
				let r = Math.min(1, Math.max(0, (e.clientY - a.top) / a.height));
				en(t, n, "y", Math.round(r * 100) / 100);
			}
		};
		a(e);
		let o = () => {
			i.removeEventListener("pointermove", a), i.removeEventListener("pointerup", o), i.removeEventListener("pointercancel", o);
		};
		i.addEventListener("pointermove", a), i.addEventListener("pointerup", o), i.addEventListener("pointercancel", o);
	}
	let an = (e) => Math.min(4, Math.max(.1, e));
	function on(e, t, n, r) {
		en(e, t, "size", an(Math.round((n + r) * 100) / 100));
	}
	function sn(e, t, n) {
		let r = Number(n);
		Number.isFinite(r) && en(e, t, "size", an(r / 100));
	}
	function cn(e, t, n, r) {
		let i = Gt[n.props.src];
		if (!i?.w || !i?.h || !V(Wt)?.w || !V(Wt)?.h) return;
		let a = V(Wt).h * i.w / (V(Wt).w * i.h), o = r === "cover" ? Math.max(1, a) : Math.min(1, a);
		(n.props.fit === "flislegg" || n.props.fit === "repeat") && en(e, t, "fit", "vanlig"), en(e, t, "size", an(Math.round(o * 100) / 100));
	}
	function ln(e) {
		return e.props;
	}
	function un(e, t, n, r) {
		e.mutate(n, (e) => {
			r(e.background.layers[t].props);
		});
	}
	function dn(e, t, n, r) {
		un(e, t, `edit:${e.keyPrefix}-${e.keyId}-${t}-${n}`, (e) => {
			e[n] = r;
		});
	}
	let fn = {
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
	function pn(e, t, n) {
		un(e, t, e.keyPrefix, (e) => {
			e.kind = n, fn[n].some(([t]) => t === (e.animation ?? "none")) || (e.animation = "none");
		});
	}
	function mn(e, t, n, r) {
		un(e, t, `edit:${e.keyPrefix}-${e.keyId}-${t}-stop${n}`, (e) => {
			e.stops[n] = {
				...e.stops[n],
				...r
			};
		});
	}
	function hn(e, t) {
		un(e, t, e.keyPrefix, (e) => {
			let t = Math.round(e.stops.reduce((e, t) => e + (Number(t.share) || 0), 0) / e.stops.length) || 50;
			e.stops.push({
				color: e.stops[e.stops.length - 1]?.color ?? "#ffffff",
				share: t
			});
		});
	}
	function gn(e, t, n) {
		un(e, t, e.keyPrefix, (e) => {
			e.stops.length > 2 && e.stops.splice(n, 1);
		});
	}
	function _n(e, t, n, r) {
		un(e, t, e.keyPrefix, (e) => {
			let [t] = e.stops.splice(n, 1);
			e.stops.splice(r, 0, t);
		});
	}
	let vn = /* @__PURE__ */ F(null);
	function yn(e, t, n, r) {
		if (t.button !== 0) return;
		t.preventDefault();
		let i = t.currentTarget.closest(".bg-layer"), a = t.currentTarget.closest(".grad-stop");
		I(vn, {
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
			I(vn, {
				...V(vn),
				insert: n
			}, !0);
		}, u = () => {
			window.removeEventListener("pointermove", l), window.removeEventListener("pointerup", u), c.remove();
			let t = V(vn);
			if (I(vn, null), !t) return;
			let n = t.insert > t.from ? t.insert - 1 : t.insert;
			n !== t.from && _n(e, t.layer, t.from, n);
		};
		window.addEventListener("pointermove", l), window.addEventListener("pointerup", u);
	}
	function xn(e, t, n) {
		e.mutate(e.keyPrefix, (e) => {
			e.background.layers[t].type !== n && (e.background.layers[t] = {
				type: n,
				version: s[n].version ?? 1,
				props: s[n].defaults()
			});
		});
	}
	async function Sn(e, t) {
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
	async function Cn(e) {
		let t = await e.text(), n = Yi(t), r = Zi(t);
		if (!r) return n;
		let i = await Sn(n.dataUrl, r);
		if (!i) return n;
		let a = Xi(t, i);
		if (a === t) return n;
		try {
			return Yi(a);
		} catch {
			return n;
		}
	}
	async function wn(e) {
		return e.type === "image/svg+xml" || /\.svg$/i.test(e.name || "") ? Cn(e) : Ki(e);
	}
	async function Tn(e, t, n) {
		let r = n.target.files?.[0];
		if (n.target.value = "", r) try {
			en(e, t, "src", (await wn(r)).dataUrl);
		} catch {
			x(Q("status.imageReadError"), "error");
		}
	}
	async function En(e, t, n) {
		let r = [...n.target.files ?? []];
		if (n.target.value = "", !r.length) return;
		x(Q("status.compressingImages"));
		let { images: i, failed: a, big: o } = await Wu(r);
		i.length && e.mutate(e.keyPrefix, (e) => {
			let n = e.background.layers[t].props;
			n.images ??= [], n.images.push(...i.map(({ src: e }) => ({
				src: e,
				x: .5,
				y: .5
			})));
		}), Gu(i.length, a, o);
	}
	function Dn(e, t, n, r) {
		e.mutate(e.keyPrefix, (e) => {
			let i = e.background.layers[t].props.images, a = n + r;
			a < 0 || a >= i.length || ([i[n], i[a]] = [i[a], i[n]]);
		});
	}
	function On(e, t, n) {
		e.mutate(e.keyPrefix, (e) => {
			e.background.layers[t].props.images.splice(n, 1);
		});
	}
	function kn(e, t, n, r, i) {
		e.mutate(`edit:${e.keyPrefix}g-${e.keyId}-${t}-${n}-${r}`, (e) => {
			e.background.layers[t].props.images[n][r] = i;
		});
	}
	function An(e, t) {
		q(e, () => {
			V(A).nav.style ??= {}, t(V(A).nav.style);
		});
	}
	let jn = /* @__PURE__ */ P(() => ({
		mutate: Yt,
		keyPrefix: "bg",
		keyId: V(It)
	})), Mn = {
		mutate: An,
		keyPrefix: "navbg",
		keyId: "nav"
	}, Nn = {
		mutate: to,
		keyPrefix: "footerbg",
		keyId: "footer"
	}, Pn = () => Object.entries(V(A)?.theme.tokens.color ?? {}).map(([e, t]) => [e, t]), Fn = [
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
	], In = /* @__PURE__ */ P(() => !!V(A)?.theme.alt), Ln = /* @__PURE__ */ P(() => V(A)?.theme.alt?.auto === !0), Rn = /* @__PURE__ */ P(() => V(A)?.theme.scheme === "dark" ? "dark" : "light"), zn = /* @__PURE__ */ P(() => V(A)?.theme.tokens.color ?? {}), Bn = /* @__PURE__ */ P(() => ({
		...V(A)?.theme.tokens.color ?? {},
		...V(A)?.theme.alt?.tokens?.color ?? {}
	}));
	function Vn(e) {
		return {
			type: e,
			version: ps[e].version,
			props: ps[e].defaults()
		};
	}
	let Hn = (e) => !!(e && ps[e.type]?.entrance), Un = [["", Q("common.none")], ...Object.entries(ps).filter(([, e]) => e.entrance).map(([e, t]) => [e, t.labelKey ? Q(t.labelKey) : t.label])], Wn = [["", Q("common.none")], ...Object.entries(ps).filter(([, e]) => !e.entrance).map(([e, t]) => [e, t.labelKey ? Q(t.labelKey) : t.label])];
	function Gn(e) {
		e.animation && !Hn(e.animation) && (e.hover ??= e.animation, e.animation = null);
	}
	function Kn(e) {
		gt(`edit:anim-${V(N).blockId}`, (t) => {
			Gn(t), t.animation = e ? Vn(e) : null;
		}), V(N) && k?.sendDemoAnim(V(N).sectionId, V(N).blockId);
	}
	function qn(e) {
		gt(`edit:hover-${V(N).blockId}`, (t) => {
			Gn(t), t.hover = e ? Vn(e) : null;
		});
	}
	function Jn(e, t) {
		Number.isFinite(t) && (gt(`edit:anim-${V(N).blockId}:${e}`, (n) => {
			n.animation && (n.animation.props[e] = t);
		}), V(N) && k?.sendDemoAnim(V(N).sectionId, V(N).blockId));
	}
	function Yn(e) {
		Yt("section-anim", (t) => {
			Gn(t), t.animation = e ? Vn(e) : null;
		}), k?.sendDemoAnim(V(It));
	}
	function Xn(e) {
		Yt("section-hover", (t) => {
			Gn(t), t.hover = e ? Vn(e) : null;
		});
	}
	function Zn(e, t) {
		Number.isFinite(t) && (Yt("edit:section-anim", (n) => {
			n.animation && (n.animation.props[e] = t);
		}), k?.sendDemoAnim(V(It)));
	}
	function Qn(e) {
		Yt("edit:section-anim", (t) => {
			t.animation && (t.animation.props.pattern = e);
		}), k?.sendDemoAnim(V(It));
	}
	function $n(e) {
		let t = O.data.sections.find((e) => e.id === V(It));
		if (!t) return;
		let n = e.trim();
		if (!n) return;
		let r = /^\d+$/.test(n) ? `${n}px` : n;
		Ee("section-size"), t.size = {
			...t.size,
			minHeight: r
		}, I(Rt, r, !0), O.save(), j(), k?.sendSection(V(g), t);
	}
	function er() {
		return O.data.sections.find((e) => e.id === V(It)) ?? O.data.sections[0];
	}
	function tr(e) {
		let t = O.data.sections.find((e) => e.id === V(It));
		t && (Ee("grid:section"), t.grid = e ? { ..._e.data.grid } : null, I(Lt, t.grid ? { ...t.grid } : null, !0), O.save(), j(), k?.sendSection(V(g), t), V(Xe) === "grid" && k?.sendShowGrid(!0));
	}
	function nr(e, t) {
		let n = O.data.sections.find((e) => e.id === V(It));
		n?.grid && (Ee("grid:section"), n.grid = {
			...n.grid,
			[e]: t
		}, I(Lt, { ...n.grid }, !0), O.save(), j(), k?.sendSection(V(g), n), V(Xe) === "grid" && k?.sendShowGrid(!0));
	}
	function rr(e, t) {
		Ee("grid:site"), I(E, {
			...V(E),
			[e]: t
		}, !0), _e.data.grid = {
			..._e.data.grid,
			[e]: t
		}, _e.save(), j(), ye(), V(Xe) === "grid" && k?.sendShowGrid(!0);
	}
	async function ir() {
		try {
			let e = await fetch("/api/github/me");
			e.ok ? I(T, await e.json(), !0) : e.status !== 503 && I(T, null);
		} catch {
			I(T, null);
		}
	}
	let ar = null;
	async function or() {
		try {
			let e = await fetch("/api/github/latest");
			e.ok && (ar = (await e.json()).head ?? null);
		} catch {}
	}
	async function sr(e) {
		if (!ar) return await or(), {
			ok: await Re({
				title: Q("confirm.conflictUnknown.title"),
				lines: [Q("confirm.conflictUnknown.body"), Q("confirm.conflictUnknown.warning")],
				okLabel: Q("confirm.publishAnyway"),
				cancelLabel: Q("confirm.cancel")
			}),
			head: ar
		};
		let t = null;
		try {
			let e = await fetch(`/api/github/latest?base=${ar}`);
			e.ok && (t = await e.json().catch(() => null));
		} catch {}
		if (!t?.head) return {
			ok: !0,
			head: null
		};
		let n = t.head;
		if (n === ar) return {
			ok: !0,
			head: n
		};
		let r = new Set(e.map((e) => e.path)), i = t.truncated ? [Q("confirm.conflict.truncated")] : (t.changedFiles ?? []).filter((e) => r.has(e));
		return i.length === 0 ? {
			ok: !0,
			head: n
		} : {
			ok: await Re({
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
	let cr = /* @__PURE__ */ F(null), lr = /* @__PURE__ */ F(""), ur = /* @__PURE__ */ F(!1);
	async function dr() {
		I(lr, "");
		try {
			let e = await fetch("/api/github/history");
			e.ok ? I(cr, (await e.json()).commits, !0) : e.status === 401 ? (I(cr, [], !0), I(lr, Q("status.historyLoginRequired"), !0)) : (I(cr, [], !0), I(lr, Ti(await e.json().catch(() => null)) ?? Q("status.historyFetchFailed"), !0));
		} catch {
			I(cr, [], !0), I(lr, Q("status.historyUnavailable"), !0);
		}
	}
	let fr = (() => {
		let e = {
			dateStyle: "short",
			timeStyle: "short"
		};
		try {
			return new Intl.DateTimeFormat(Ei(), e);
		} catch {
			return new Intl.DateTimeFormat(void 0, e);
		}
	})(), pr = !1;
	async function mr() {
		let e = V(cr)?.[0];
		if (!(!e || V(ur)) && await Re({
			title: Q("confirm.revert.title"),
			lines: [`«${e.message}»`, Q("confirm.revert.body")],
			okLabel: Q("confirm.revert.ok"),
			cancelLabel: Q("confirm.cancel")
		})) {
			I(ur, !0), x(Q("status.reverting"));
			try {
				let t = await fetch("/api/github/revert", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({ expect: e.sha })
				});
				if (t.ok) {
					let { sha: e } = await t.json().catch(() => ({}));
					e ? ar = e : or(), pr = !0, x(Q("status.revertDone"), "ok"), hr();
				} else t.status === 409 ? x(Q("status.revertConflict"), "error") : x(Ti(await t.json().catch(() => null)) ?? Q("status.revertFailed"), "error");
			} catch {
				x(Q("status.publishLayerUnreachable"), "error");
			}
			I(ur, !1), dr();
		}
	}
	async function hr() {
		let e = ["/content/site.json", ...V(A).pages.map((e) => `/${e.file}`)], t = async () => {
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
	let gr = /* @__PURE__ */ F(null), _r = /* @__PURE__ */ F(null), vr = /* @__PURE__ */ F(!1), yr = /* @__PURE__ */ F(tn(/* @__PURE__ */ new Set()));
	async function xr() {
		I(vr, !0), I(_r, null), I(gr, null);
		try {
			let e = await fetch("/api/github/update"), t = await e.json().catch(() => null);
			e.ok ? (I(gr, t, !0), I(yr, /* @__PURE__ */ new Set(), !0)) : I(_r, Ti(t) ?? Q("update.checkFailed"), !0);
		} catch {
			I(_r, Q("status.publishLayerUnreachable"), !0);
		}
		I(vr, !1);
	}
	function Cr(e) {
		let t = new Set(V(yr));
		t.has(e) ? t.delete(e) : t.add(e), I(yr, t, !0);
	}
	async function wr() {
		if (!V(gr) || V(gr).upToDate || V(vr)) return;
		let e = [...V(yr)], t = V(gr).changes.filter((e) => !V(yr).has(e.path)), n = t.filter((e) => e.atom && e.conflict);
		if (await Re({
			title: Q("confirm.update.title"),
			lines: [Q("confirm.update.body", {
				target: V(gr).target,
				writes: t.filter((e) => e.action === "write").length,
				deletes: t.filter((e) => e.action === "delete").length
			}), ...n.length > 0 ? [Q("confirm.update.warnEdited", { paths: n.map((e) => e.path).join(", ") })] : []],
			okLabel: Q("confirm.update.ok"),
			cancelLabel: Q("confirm.cancel")
		})) {
			I(vr, !0), x(Q("update.running", { target: V(gr).target }));
			try {
				let t = await fetch("/api/github/update", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({
						to: V(gr).target,
						expect: V(gr).head,
						skip: e
					})
				}), n = await t.json().catch(() => null);
				t.ok ? (x(Q("update.committed", { target: V(gr).target }), "ok"), await Tr(V(gr).target.replace(/^v/, ""))) : t.status === 409 ? (x(Ti(n) ?? Q("update.checkFailed"), "error"), await xr()) : x(Ti(n) ?? Q("update.failed"), "error");
			} catch {
				x(Q("status.publishLayerUnreachable"), "error");
			}
			I(vr, !1);
		}
	}
	async function Tr(e) {
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
	let Er = null;
	function Dr(e) {
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
	async function Or(e, { keepHistory: t = !1 } = {}) {
		I(g, e, !0), Er = (async () => {
			let n = xe(), r = null;
			try {
				let e = await fetch(`/${n.file}`);
				e.ok && (r = Ma(await e.json(), _e.data));
			} catch {}
			r ? be.delete(e) : r = Dr(n), O = Ai(`urd-draft-${e}`, () => r, S), (O.data.schemaVersion ?? 1) > 1 && (console.warn(`Urd: utkastet for '${e}' har schemaVersion ${O.data.schemaVersion} (motoren har 1) og forkastes`), O.replace(structuredClone(r))), O.replace(Ma(O.data, _e.data)), O.save(), t || (we = null), I(It, null), I(Lt, null), j(), me(), I(v, "");
		})(), await Er;
	}
	function kr() {
		k?.destroy(), V(w)?.contentDocument?.addEventListener("pointerdown", () => {
			V(pt) && I(pt, null);
		}, !0), k = xa(V(w), {
			onEdit: vu,
			onMove: yu,
			onGrow: bu,
			onDelete: Au,
			onAddSection: Tu,
			onMoveSection: Eu,
			onDeleteSection: Du,
			onSectionSize: Ou,
			onUndo: (e) => e.redo ? Ne() : je(),
			onSelectSection: Jt,
			onSelectBlock: ft,
			onBlockMenu: ht,
			onReady: U,
			onNavigate: Rr,
			onAddBlock: (e) => Pu(e.sectionId, e.block),
			onAddBlocks: (e) => Fu(e.sectionId, e.blocks, e.minBottom, e.moves),
			onRequestBlock: Hu,
			onMoveBlockSection: ku,
			onMobileManual: xu,
			onMobileAuto: Su,
			onReviewDone: Cu,
			onBlockFlag: wu,
			onCollectionEdit: sa,
			onSaveTemplate: Ji,
			onDeleteTemplate: na,
			onApplyLayout: he,
			onPluginBlocks: (e) => {
				I(Lu, e.blocks ?? [], !0);
			},
			onNavWidth: (e) => q("edit:nav-width", () => {
				V(A).nav.style ??= {}, V(A).nav.style.width = e.width;
			})
		});
	}
	async function U() {
		await Er, await Sa, k?.sendPlugins(ze(V(wa))?.enabled ?? []), k?.sendViewport(V(ee)), aa(), qi(), _e.hasDraft() && ye();
		let e = !V(h).pages.some((e) => e.id === V(g));
		(O.hasDraft() || e) && k?.sendPage(V(g), O.data), V(D) || k?.sendChrome(!1), V(Xe) === "grid" && k?.sendShowGrid(!0), V(Ar) && k?.sendShowGuides(!0), f();
	}
	let Ar = /* @__PURE__ */ F(localStorage.getItem("urd-guides") === "1"), Mr = /* @__PURE__ */ F(!1), Nr = /* @__PURE__ */ F(tn(localStorage.getItem("urd-layout-picker") === "menu" ? "menu" : "strip"));
	function Pr(e) {
		I(Nr, e === "menu" ? "menu" : "strip", !0), V(Nr) === "menu" ? localStorage.setItem("urd-layout-picker", "menu") : localStorage.removeItem("urd-layout-picker");
	}
	let Fr = /* @__PURE__ */ F(null);
	bn(() => {
		if (!V(Mr)) return;
		let e = (e) => {
			V(Fr)?.contains(e.target) || I(Mr, !1);
		}, t = (e) => {
			e.key === "Escape" && I(Mr, !1);
		}, n = () => {
			I(Mr, !1);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t), window.removeEventListener("blur", n);
		};
	});
	function Ir() {
		I(Ar, !V(Ar)), localStorage.setItem("urd-guides", V(Ar) ? "1" : "0"), k?.sendShowGuides(V(Ar));
	}
	function Rr(e) {
		let t = e.path.replace(/\/$/, "") || "/", n = V(A).pages.find((e) => e.path === t);
		n && n.id !== V(g) && Or(n.id);
	}
	function q(e, t) {
		Ee(e), t(), _e.save(), j(), ye();
	}
	let zr = /* @__PURE__ */ F(""), Vr = /* @__PURE__ */ F(null), Hr = /* @__PURE__ */ F(null);
	bn(() => {
		if (!V(Hr)) return;
		let e = (e) => {
			e.target.closest?.(".page-menu-wrap") || I(Hr, null);
		}, t = (e) => {
			e.key === "Escape" && I(Hr, null);
		}, n = () => {
			I(Hr, null);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t), window.removeEventListener("blur", n);
		};
	});
	let Ur = [
		"admin",
		"api",
		"assets",
		"content",
		"media",
		"plugins",
		"functions",
		"readme"
	];
	function Wr(e, t = null) {
		return e ? Ur.includes(e) ? Q("error.reservedName", { slug: e }) : V(A).pages.some((n) => n.id !== t && (n.path === `/${e}` || n.id === e)) ? Q("error.pageExists") : null : Q("error.pageNeedsName");
	}
	function Gr() {
		let e = V(zr).trim(), t = $i(e), n = Wr(t);
		if (n) {
			x(n, "error");
			return;
		}
		let r = V(Vr) ? Bi[V(Vr)]?.data?.page : null, i = r ? Va(Ma(JSON.parse(JSON.stringify(r)), _e.data), Ra, {
			id: t,
			title: e
		}) : Dr({
			id: t,
			title: e
		});
		q("pages", () => {
			V(A).pages.push({
				id: t,
				title: e,
				path: `/${t}`,
				file: `content/pages/${t}.json`
			}), V(A).nav.items.push({
				label: e,
				page: t
			});
		}), C(`urd-draft-${t}`, JSON.stringify(i)), j(), I(zr, ""), I(Vr, null), Or(t);
	}
	async function Kr(e) {
		I(Hr, null), await ta("page", e.id === V(g) ? JSON.parse(JSON.stringify(O.data)) : await Jr(e));
	}
	function qr(e, t) {
		let n = t.trim();
		if (!n || n === e.title) return;
		let r = e.title;
		q("pages", () => {
			e.title = n;
			for (let t of V(A).nav.items) t.page === e.id && t.label === r && (t.label = n);
		}), e.id === V(g) ? (O.data.meta.title = n, O.save(), j(), k?.sendPage(V(g), O.data)) : Yr(e, (e) => {
			e.meta.title = n;
		});
	}
	async function Jr(e) {
		let t = localStorage.getItem(`urd-draft-${e.id}`);
		if (t) try {
			return JSON.parse(t);
		} catch {}
		try {
			let t = await fetch(`/${e.file}`);
			if (t.ok) return Ma(await t.json(), _e.data);
		} catch {}
		return Dr(e);
	}
	async function Yr(e, t) {
		let n = await Jr(e);
		t(n), C(`urd-draft-${e.id}`, JSON.stringify(n)), j();
	}
	function Xr(e, t) {
		let n = $i(t);
		if (e.path === "/" || `/${n}` === e.path) return;
		let r = Wr(n, e.id);
		if (r) {
			x(r, "error");
			return;
		}
		q("pages", () => {
			e.path = `/${n}`;
		});
	}
	function Qr(e) {
		e.path !== "/" && (q("pages", () => {
			V(A).pages = V(A).pages.filter((t) => t.id !== e.id), V(A).nav.items = V(A).nav.items.filter((t) => t.page !== e.id || t.children);
			for (let t of V(A).nav.items) t.page === e.id && delete t.page, t.children && (t.children = t.children.filter((t) => t.page !== e.id), t.children.length === 0 && delete t.children);
			V(A).nav.items = V(A).nav.items.filter((e) => e.page || e.href || e.children);
		}), e.id === V(g) && Or(V(A).pages[0].id), x(Q("status.pageRemoved")));
	}
	function ei(e) {
		q("edit:nav-logo", () => {
			V(A).nav.logo = {
				type: "text",
				value: "",
				...V(A).nav.logo,
				...e
			};
		});
	}
	function ti(e) {
		q("nav", () => {
			V(A).nav.logo ??= {
				type: "text",
				value: V(A).site.title
			};
			let t = V(A).nav.logo, n = t.type === "image";
			e === "both" ? (n && (t.image = t.value, t.value = V(A).site.title), t.image ??= "", t.size ??= 32) : e === "image" ? (n || (t.value = t.image ?? ""), delete t.image, t.size ??= 32) : (n && (t.value = V(A).site.title), delete t.image), t.type = e;
		});
	}
	async function ni(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await wn(t);
			q("nav", () => {
				let t = V(A).nav.logo;
				t.type === "both" ? t.image = e.dataUrl : t.value = e.dataUrl;
			});
		} catch {
			x(Q("status.imageReadErrorSvg"), "error");
		}
	}
	let ri = /* @__PURE__ */ F(null);
	async function ai(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		if (t.type === "image/svg+xml" || /\.svg$/i.test(t.name || "")) {
			try {
				let e = await Cn(t);
				I(ri, e.dataUrl, !0);
			} catch {
				x(Q("status.imageReadErrorSvg"), "error");
			}
			return;
		}
		let n = new FileReader();
		n.onload = () => {
			I(ri, String(n.result), !0);
		}, n.onerror = () => x(Q("status.imageReadError"), "error"), n.readAsDataURL(t);
	}
	function oi(e) {
		q("edit:site-icon", () => {
			V(A).site.icon = e;
		}), I(ri, null);
	}
	function si() {
		q("edit:site-icon", () => {
			delete V(A).site.icon;
		});
	}
	function li(e) {
		q("edit:site-title", () => {
			V(A).site.title = e;
		});
	}
	function ui(e) {
		q("edit:site-desc", () => {
			V(A).site.description = e;
		});
	}
	function di() {
		let e = V(A).site.lang ?? "no";
		return e === "no" ? "nb" : e;
	}
	function pi() {
		let e = di(), t = tt([...et, ...it()]);
		return [...t.some(([t]) => t === e) ? [] : [[e, e]], ...t];
	}
	function mi(e) {
		q("site", () => {
			V(A).site.lang = e;
		});
	}
	let hi = /^(?:data:image\/[\w.+-]+;base64,[A-Za-z0-9+/=]+|\/(?!\/)[\w%./-]*)$/;
	bn(() => {
		if (!V(A)?.site) return;
		let e = V(A).site.icon, t = document.querySelector("link[rel=\"icon\"]");
		if (t) {
			if (typeof e != "string" || !e) {
				t.href = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%230b0e14'/%3E%3Cpath d='M19.2 51.2V16l25.6 10.4V51.2' fill='none' stroke='%2315b39a' stroke-width='6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E";
				return;
			}
			hi.test(e) && (t.href = e);
		}
	});
	function gi(e) {
		q("nav", () => {
			V(A).nav.layout = e;
		});
	}
	function _i(e, t) {
		q(`edit:nav-style-${e}`, () => {
			V(A).nav.style ??= {}, t === void 0 ? delete V(A).nav.style[e] : V(A).nav.style[e] = t;
		});
	}
	let vi = /* @__PURE__ */ P(() => V(A)?.nav?.variant === "side-left" || V(A)?.nav?.variant === "side-right"), yi = /* @__PURE__ */ P(() => [
		"floating",
		"floating-square",
		"floating-tab"
	].includes(V(A)?.nav?.variant)), bi = {
		underline: [Q("hoverColor.underline.label"), Q("hoverColor.underline.title")],
		pill: [Q("hoverColor.pill.label"), Q("hoverColor.pill.title")],
		lift: [Q("hoverColor.lift.label"), Q("hoverColor.lift.title")]
	}, xi = /* @__PURE__ */ P(() => bi[V(A)?.nav?.style?.hover] ?? null);
	function Si(e) {
		q("nav", () => {
			e === "bar" ? delete V(A).nav.variant : V(A).nav.variant = e;
		});
	}
	function Ci(e) {
		q("nav", () => {
			V(A).nav.style ??= {}, e ? V(A).nav.style.glow = !0 : delete V(A).nav.style.glow;
		});
	}
	function wi(e) {
		q("nav", () => {
			V(A).nav.style ??= {}, e ? delete V(A).nav.style.topGap : V(A).nav.style.topGap = !1;
		});
	}
	function Di(e) {
		q("nav", () => {
			V(A).nav.style ??= {}, e === "standard" ? delete V(A).nav.style.hover : V(A).nav.style.hover = e;
		});
	}
	let Oi = null, ki = {}, ji = {}, Mi = !1, Ni = /* @__PURE__ */ F(tn([])), Pi = /* @__PURE__ */ F(tn({})), Fi = /* @__PURE__ */ F(null), Ii = /* @__PURE__ */ F(""), Li = /* @__PURE__ */ F("news"), Ri = [
		["news", Q("collectionKind.news")],
		["notices", Q("collectionKind.notices")],
		["publications", Q("collectionKind.publications")],
		["custom", Q("collectionKind.custom")]
	], zi = null, Bi = {}, Vi = {}, Ui = !1, Wi = /* @__PURE__ */ F(tn([]));
	async function Gi() {
		let e = {
			version: 1,
			maler: []
		};
		try {
			e = await (await fetch("/content/maler.json")).json();
		} catch {}
		zi = Ai("urd-draft-maler", () => e, S), I(Wi, [...zi.data.maler ?? []], !0);
		for (let e of V(Wi)) {
			let t = null;
			try {
				t = await (await fetch(`/content/maler/${e}.json`)).json();
			} catch {}
			Vi[e] = t, Bi[e] = Ai(`urd-draft-mal-${e}`, () => t, S), (Bi[e].data?.schemaVersion ?? 1) > 1 && Bi[e].reset();
		}
		Ui = !0, qi();
	}
	function qi() {
		let e = V(Wi).map((e) => Bi[e]?.data ? {
			id: e,
			...JSON.parse(JSON.stringify(Bi[e].data))
		} : null).filter(Boolean).map(({ id: e, mal: t, section: n, blocks: r, page: i }) => ({
			id: e,
			name: t.name,
			kind: t.kind,
			section: n,
			blocks: r,
			page: i
		}));
		k?.sendMaler(e);
	}
	function Ji(e) {
		let t = za.includes(e.kind) ? e.kind : "section";
		return ta(t, e[t]);
	}
	async function ta(e, t) {
		if (!t || !zi) return;
		let n = (await Be({
			title: Q("canvas.templateNamePrompt"),
			placeholder: Q("ph.templateName")
		}))?.trim();
		if (!n) return;
		let r = Ba(n);
		if (!r) {
			x(Q("status.invalidName"), "error");
			return;
		}
		if (V(Wi).includes(r)) {
			x(Q("status.templateExists"), "error");
			return;
		}
		Ee("maler");
		let i = {
			schemaVersion: 1,
			mal: {
				name: n,
				kind: e
			},
			[e]: t
		};
		Bi[r] = Ai(`urd-draft-mal-${r}`, () => null, S), Bi[r].replace(i), Bi[r].save(), zi.data.maler = [...V(Wi), r], zi.save(), I(Wi, [...V(Wi), r], !0), x(Q("status.templateSaved", { name: n }), "ok"), j(), qi();
	}
	async function na(e) {
		let t = Bi[e.id]?.data?.mal;
		t && await Re({ title: Q("confirm.deleteTemplate", { name: t.name }) }) && (Ee("maler"), V(Vr) === e.id && I(Vr, null), localStorage.removeItem(`urd-draft-mal-${e.id}`), delete Bi[e.id], zi.data.maler = V(Wi).filter((t) => t !== e.id), zi.save(), I(Wi, V(Wi).filter((t) => t !== e.id), !0), j(), qi());
	}
	async function ra() {
		let e = {
			version: 1,
			samlinger: []
		};
		try {
			e = await (await fetch("/content/samlinger.json")).json();
		} catch {}
		Oi = Ai("urd-draft-samlinger", () => e, S), I(Ni, [...Oi.data.samlinger ?? []], !0);
		for (let e of V(Ni)) {
			let t = null;
			try {
				t = await (await fetch(`/content/samlinger/${e}.json`)).json();
			} catch {}
			ji[e] = t, ki[e] = Ai(`urd-draft-samling-${e}`, () => t, S), !t && !ki[e].data && (ki[e].replace({
				schemaVersion: 1,
				id: e,
				name: e,
				kind: "custom",
				entries: []
			}), ki[e].save());
		}
		Mi = !0, ia();
	}
	function ia(e = !0) {
		let t = {};
		for (let e of V(Ni)) ki[e] && (t[e] = JSON.parse(JSON.stringify(ki[e].data)));
		I(Pi, t, !0), e && aa();
	}
	function aa() {
		k?.sendCollections(ze(V(Pi)) ?? {});
	}
	function oa(e, t, n, r = !0) {
		let i = ki[e];
		i && (Ee(t), n(i.data), i.save(), j(), ia(r));
	}
	function sa(e) {
		let { collection: t, entryId: n, field: r, value: i } = e;
		[
			"title",
			"text",
			"image",
			"imageAlt",
			"imageStyle"
		].includes(r) && (r === "title" && !String(i ?? "").replace(/<[^>]*>/g, "").trim() || oa(t, `edit:samling:${t}:${n}:${r}`, (e) => {
			let t = e.entries.find((e) => e.id === n);
			t && (i === "" && r !== "title" ? delete t[r] : t[r] = i);
		}, r === "image"));
	}
	function da() {
		let e = V(Ii).trim();
		if (!e) return;
		let t = $i(e);
		if (!t || V(Ni).includes(t)) {
			x(Q(t ? "status.collectionExists" : "status.invalidName"), "error");
			return;
		}
		Ee("samlinger");
		let n = {
			schemaVersion: 1,
			id: t,
			name: e,
			kind: V(Li),
			entries: []
		};
		ki[t] = Ai(`urd-draft-samling-${t}`, () => null, S), ki[t].replace(n), ki[t].save(), Oi.data.samlinger = [...V(Ni), t], Oi.save(), I(Ni, [...V(Ni), t], !0), I(Fi, t, !0), I(Ii, ""), j(), ia();
	}
	function fa(e) {
		Ee("samlinger"), localStorage.removeItem(`urd-draft-samling-${e}`), delete ki[e], Oi.data.samlinger = V(Ni).filter((t) => t !== e), Oi.save(), I(Ni, V(Ni).filter((t) => t !== e), !0), V(Fi) === e && I(Fi, null), j(), ia();
	}
	function pa(e) {
		oa(e, `samling:${e}:add-entry`, (e) => {
			e.entries.unshift({
				id: Ra("innslag"),
				title: Q("seed.newEntry"),
				date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
				text: ""
			});
		});
	}
	function ma(e, t, n, r) {
		oa(e, `edit:samling:${e}:${t}:${n}`, (e) => {
			let i = e.entries.find((e) => e.id === t);
			i && (r === "" && n !== "title" ? delete i[n] : i[n] = r);
		});
	}
	function ha(e, t, n) {
		oa(e, `samling:${e}:move-entry`, (e) => {
			let r = t + n;
			r < 0 || r >= e.entries.length || ([e.entries[t], e.entries[r]] = [e.entries[r], e.entries[t]]);
		});
	}
	function ga(e, t) {
		oa(e, `samling:${e}:remove-entry`, (e) => {
			e.entries = e.entries.filter((e) => e.id !== t);
		});
	}
	async function _a(e, t, n) {
		let r = n.target.files?.[0];
		n.target.value = "", r && ma(e, t, "image", (await wn(r)).dataUrl);
	}
	let va = null, ya, Sa = new Promise((e) => {
		ya = e;
	}), wa = /* @__PURE__ */ F(null), Ta = tn({}), Ea = /* @__PURE__ */ F("0.0.0"), Da = /* @__PURE__ */ F(""), ka = /* @__PURE__ */ F(""), Aa = /* @__PURE__ */ F(tn([])), Na = /* @__PURE__ */ F(tn([])), Pa = /* @__PURE__ */ F("pending"), Ia = () => [.../* @__PURE__ */ new Set([...V(wa)?.enabled ?? [], ...V(wa)?.disabled ?? []])];
	function Ha() {
		I(wa, JSON.parse(JSON.stringify(va.data)), !0);
	}
	let Ua = /* @__PURE__ */ F(null);
	async function Wa() {
		try {
			let e = (await fetch("/urd.json", { cache: "no-store" })).headers.get("content-security-policy");
			if (!e) {
				I(Ua, { unknown: !0 }, !0);
				return;
			}
			let t = (t) => new Set((e.split(";").map((e) => e.trim()).find((e) => e.startsWith(`${t} `)) ?? "").split(/\s+/).slice(1));
			I(Ua, {
				frameSrc: t("frame-src"),
				connectSrc: t("connect-src")
			}, !0);
		} catch {
			I(Ua, { unknown: !0 }, !0);
		}
	}
	function Ga(e) {
		let t = [...(e.connectSrc ?? []).map((e) => ["connect-src", e]), ...(e.frameSrc ?? []).map((e) => ["frame-src", e])];
		if (!V(Ua) || V(Ua).unknown) return [];
		let n = {
			"connect-src": V(Ua).connectSrc,
			"frame-src": V(Ua).frameSrc
		};
		return t.filter(([e, t]) => !n[e]?.has(t)).map(([e, t]) => `${e} ${t}`);
	}
	async function Ka() {
		Wa();
		let e = {
			version: 1,
			enabled: []
		};
		try {
			e = await (await fetch("/plugins/plugins.json")).json();
		} catch {}
		I(Na, e.enabled ?? [], !0), va = Ai("urd-draft-plugins", () => e, S), Ha();
		try {
			I(Ea, (await (await fetch("/urd.json")).json()).engine ?? "0.0.0", !0);
		} catch {}
		for (let e of Ia()) Ya(e);
		qa(), ya(), k?.sendPlugins(ze(V(wa))?.enabled ?? []);
	}
	async function qa() {
		try {
			let e = await fetch("/api/github/plugins");
			if (!e.ok) {
				Ja();
				return;
			}
			let { plugins: t } = await e.json();
			localStorage.setItem("urd-plugins-found", JSON.stringify(t ?? [])), I(Aa, (t ?? []).filter((e) => !Ia().includes(e)), !0);
			for (let e of V(Aa)) Ya(e);
			I(Pa, "ok");
		} catch {
			Ja();
		}
	}
	function Ja() {
		try {
			let e = JSON.parse(localStorage.getItem("urd-plugins-found") ?? "[]");
			if (Array.isArray(e) && e.length) {
				I(Aa, e.filter((e) => !Ia().includes(e)), !0);
				for (let e of V(Aa)) Ya(e);
				I(Pa, "ok");
				return;
			}
		} catch {}
		I(Pa, "unavailable");
	}
	async function Ya(e) {
		try {
			let t = await (await fetch(`/plugins/${e}/plugin.json`)).json(), n = La(t);
			Ta[e] = {
				...t,
				errors: n,
				satisfied: n.length === 0 && Fa(V(Ea), t.requiresEngine)
			};
		} catch {
			Ta[e] = {
				name: e,
				errors: [Q("plugin.manifestNotFound", { id: e })],
				satisfied: !1
			};
		}
	}
	function Xa(e, t) {
		Ee("plugins");
		let n = va.data;
		n.enabled = (n.enabled ?? []).filter((t) => t !== e), n.disabled = (n.disabled ?? []).filter((t) => t !== e), t ? n.enabled.push(e) : n.disabled.push(e), va.save(), j(), Ha(), Za();
	}
	function Za() {
		V(w) && (V(w).src = V(w).src);
	}
	function Qa(e) {
		Ee("plugins");
		let t = va.data;
		t.enabled = (t.enabled ?? []).filter((t) => t !== e), t.disabled = (t.disabled ?? []).filter((t) => t !== e), va.save(), j(), Ha(), Za();
	}
	async function $a() {
		I(ka, "");
		let e = V(Da).trim().toLowerCase();
		if (!/^[a-z0-9][a-z0-9-]*$/.test(e)) {
			I(ka, Q("plugin.invalidId"), !0);
			return;
		}
		if (Ia().includes(e)) {
			I(ka, Q("plugin.alreadyListed"), !0);
			return;
		}
		if (await Ya(e), Ta[e].errors.length) {
			I(ka, Q("plugin.invalidManifest", { errors: Ta[e].errors.join("; ") }), !0);
			return;
		}
		Xa(e, !0), I(Da, "");
	}
	function eo(e) {
		I(Aa, V(Aa).filter((t) => t !== e), !0), Xa(e, !0);
	}
	function to(e, t) {
		q(e, () => {
			V(A).footer ??= {
				version: 1,
				show: !1,
				text: "",
				align: "center"
			}, t(V(A).footer);
		});
	}
	function no(e, t) {
		to(`edit:footer-brand-${e}`, (n) => {
			n.brand ??= {}, t.trim() ? n.brand[e] = t : delete n.brand[e], !n.brand.title && !n.brand.tagline && !n.brand.logo && delete n.brand;
		});
	}
	function ro(e) {
		to("footer", (t) => {
			t.brand ??= {}, e === "image" || e === "both" ? t.brand.mode = e : delete t.brand.mode;
		});
	}
	async function io(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await wn(t);
			to("footer", (t) => {
				t.brand ??= {}, t.brand.logo = e.dataUrl, t.brand.mode || (t.brand.mode = "both");
			});
		} catch {
			x(Q("status.imageReadErrorSvg"), "error");
		}
	}
	function ao() {
		to("footer", (e) => {
			e.brand && (delete e.brand.logo, delete e.brand.mode, delete e.brand.logoHeight, !e.brand.title && !e.brand.tagline && delete e.brand);
		});
	}
	function oo(e) {
		to("edit:footer-logo-height", (t) => {
			t.brand ??= {};
			let n = Number(e);
			Number.isFinite(n) && (t.brand.logoHeight = Math.min(160, Math.max(16, Math.round(n))));
		});
	}
	function so(e) {
		to("edit:footer-copyright", (t) => {
			e.trim() ? t.copyright = e : delete t.copyright;
		});
	}
	let lo = [
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
	function uo(e) {
		let t = Q("seed.orgName"), n = V(A).pages ?? [], r = (e) => n.slice(0, e).map((e) => ({
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
					version: Fo.version ?? 1,
					props: {
						...Fo.defaults(),
						color: "accent",
						x: .12,
						y: 0,
						radius: .6,
						opacity: .45
					}
				}, {
					type: "grain",
					version: Lo.version ?? 1,
					props: {
						...Lo.defaults(),
						opacity: .08
					}
				}]
			}
		};
	}
	function po(e) {
		to("footer-template", (t) => {
			let n = uo(e);
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
	function mo(e) {
		to("footer", (t) => {
			t[e] ??= [], t[e].push(V(A).pages[0] ? {
				label: Q("seed.link"),
				page: V(A).pages[0].id
			} : {
				label: Q("seed.link"),
				href: "https://"
			});
		});
	}
	function ho(e, t) {
		to("footer", (n) => {
			n[e].splice(t, 1), n[e].length || delete n[e];
		});
	}
	function _o(e, t, n) {
		to("footer", (r) => {
			let i = r[e], a = t + n;
			a < 0 || a >= i.length || ([i[t], i[a]] = [i[a], i[t]]);
		});
	}
	function vo(e, t, n) {
		to(`edit:footer-${e}-label-${t}`, (r) => {
			r[e][t].label = n;
		});
	}
	function Co(e, t, n) {
		to("footer", (r) => {
			let i = r[e][t];
			n === "__href" ? (delete i.page, i.href = i.href ?? "https://") : (i.page = n, delete i.href);
		});
	}
	function wo(e, t, n) {
		to(`edit:footer-${e}-href-${t}`, (r) => {
			r[e][t].href = n;
		});
	}
	function To(e) {
		to("footer", (t) => {
			e === "center" ? t.columnsAlign = "center" : delete t.columnsAlign;
		});
	}
	function Eo(e) {
		to("footer", (t) => {
			e ? t.cta ??= {
				kind: "button",
				label: Q("seed.join")
			} : delete t.cta;
		});
	}
	function Do(e, t) {
		to(`edit:footer-cta-${e}`, (n) => {
			n.cta ??= {}, t === "" || t == null || t === !1 ? delete n.cta[e] : n.cta[e] = t;
		});
	}
	function Oo(e) {
		to("footer", (t) => {
			t.cta ??= {}, e === "__href" ? (delete t.cta.page, t.cta.href = t.cta.href ?? "https://") : (t.cta.page = e, delete t.cta.href);
		});
	}
	function ko(e, t) {
		to("footer", (n) => {
			let r = new Set(n.hideOn ?? []);
			t ? r.delete(e) : r.add(e), r.size ? n.hideOn = [...r] : delete n.hideOn;
		});
	}
	function Ao() {
		to("footer", (e) => {
			e.columns ??= [], e.columns.push({
				title: Q("seed.column"),
				links: [{
					label: Q("seed.link"),
					page: V(A).pages[0].id
				}]
			});
		});
	}
	function jo(e) {
		to("footer", (t) => {
			t.columns.splice(e, 1), t.columns.length || delete t.columns;
		});
	}
	function Mo(e, t) {
		to("footer", (n) => {
			let r = e + t;
			r < 0 || r >= n.columns.length || ([n.columns[e], n.columns[r]] = [n.columns[r], n.columns[e]]);
		});
	}
	function No(e, t) {
		to(`edit:footer-col-title-${e}`, (n) => {
			n.columns[e].title = t;
		});
	}
	function Io(e) {
		to("footer", (t) => {
			t.columns[e].links ??= [], t.columns[e].links.push({
				label: Q("seed.link"),
				page: V(A).pages[0].id
			});
		});
	}
	function Ro(e, t) {
		to("footer", (n) => {
			n.columns[e].links.splice(t, 1);
		});
	}
	function zo(e, t, n) {
		to("footer", (r) => {
			let i = r.columns[e].links, a = t + n;
			a < 0 || a >= i.length || ([i[t], i[a]] = [i[a], i[t]]);
		});
	}
	function Bo(e, t, n) {
		to(`edit:footer-link-label-${e}-${t}`, (r) => {
			r.columns[e].links[t].label = n;
		});
	}
	function Vo(e, t, n) {
		to("footer", (r) => {
			let i = r.columns[e].links[t];
			n === "__href" ? (delete i.page, i.href = i.href ?? "https://") : (i.page = n, delete i.href);
		});
	}
	function Ho(e, t, n) {
		to(`edit:footer-link-href-${e}-${t}`, (r) => {
			r.columns[e].links[t].href = n;
		});
	}
	function Uo() {
		to("footer", (e) => {
			e.social ??= [], e.social.push({
				icon: "facebook",
				url: "https://"
			});
		});
	}
	function Wo(e) {
		to("footer", (t) => {
			t.social.splice(e, 1), t.social.length || delete t.social;
		});
	}
	function Go(e, t) {
		to("footer", (n) => {
			let r = e + t;
			r < 0 || r >= n.social.length || ([n.social[e], n.social[r]] = [n.social[r], n.social[e]]);
		});
	}
	function Ko(e, t) {
		to("footer", (n) => {
			n.social[e].icon = t;
		});
	}
	function qo(e, t) {
		to(`edit:footer-social-url-${e}`, (n) => {
			n.social[e].url = t;
		});
	}
	let Jo = la.filter(([e]) => e === "iconCat.social" || e === "iconCat.communication").flatMap(([, e]) => e.map((e) => [e, ca[e].label]));
	function Yo(e, t) {
		q(`edit:nav-label-${e}`, () => {
			V(A).nav.items[e].label = t;
		});
	}
	function Xo(e, t) {
		q("nav", () => {
			let n = V(A).nav.items[e];
			t === "__href" ? (delete n.page, n.href = n.href ?? "https://") : t === "__none" ? (delete n.page, delete n.href) : (n.page = t, delete n.href);
		});
	}
	function Zo(e, t) {
		q(`edit:nav-href-${e}`, () => {
			V(A).nav.items[e].href = t;
		});
	}
	function Qo(e, t) {
		let n = e + t, r = V(A).nav.items;
		n < 0 || n >= r.length || q("nav", () => {
			[r[e], r[n]] = [r[n], r[e]];
		});
	}
	function $o(e) {
		q("nav", () => {
			V(A).nav.items.splice(e, 1);
		});
	}
	function es() {
		q("nav", () => {
			V(A).nav.items.push({
				label: Q("seed.link"),
				page: V(A).pages[0].id
			});
		});
	}
	function ts(e) {
		q("nav", () => {
			let t = V(A).nav.items[e];
			t.children ??= [], t.children.push({
				label: Q("seed.link"),
				page: V(A).pages[0].id
			});
		});
	}
	function ns(e, t, n) {
		q(`edit:nav-child-label-${e}-${t}`, () => {
			V(A).nav.items[e].children[t].label = n;
		});
	}
	function rs(e, t, n) {
		q("nav", () => {
			let r = V(A).nav.items[e].children[t];
			n === "__href" ? (delete r.page, r.href = r.href ?? "https://") : (r.page = n, delete r.href);
		});
	}
	function is(e, t, n) {
		q(`edit:nav-child-href-${e}-${t}`, () => {
			V(A).nav.items[e].children[t].href = n;
		});
	}
	function os(e, t, n) {
		let r = t + n, i = V(A).nav.items[e].children;
		r < 0 || r >= i.length || q("nav", () => {
			[i[t], i[r]] = [i[r], i[t]];
		});
	}
	function ss(e, t) {
		q("nav", () => {
			let n = V(A).nav.items[e];
			n.children.splice(t, 1), n.children.length === 0 && (delete n.children, !n.page && !n.href && (n.page = V(A).pages[0].id));
		});
	}
	function cs(e, t) {
		q(`edit:theme-color-${e}`, () => {
			V(A).theme.tokens.color[e] = t, V(A).theme.alt?.auto && (V(A).theme.alt.tokens.color = iu());
		});
	}
	function ds(e, t) {
		q("theme", () => {
			V(A).theme.tokens.font[e] = t;
		});
	}
	function fs(e, t) {
		q("theme", () => {
			V(A).theme.tokens.radius[e] = t;
		});
	}
	function ru(e) {
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
	function iu() {
		return Object.fromEntries(Object.entries(V(A).theme.tokens.color).map(([e, t]) => [e, ru(t)]));
	}
	function au(e, t) {
		q(`edit:theme-alt-${e}`, () => {
			V(A).theme.alt.tokens.color[e] = t, V(A).theme.alt.auto = !1;
		});
	}
	function ou(e) {
		q("theme", () => {
			e === "light" ? delete V(A).theme.scheme : V(A).theme.scheme = e;
		});
	}
	function su(e) {
		q("theme", () => {
			e ? V(A).theme.alt = {
				auto: !0,
				tokens: { color: iu() }
			} : delete V(A).theme.alt;
		});
	}
	function cu(e) {
		q("theme", () => {
			V(A).theme.alt ??= { tokens: { color: iu() } }, V(A).theme.alt.auto = e, e && (V(A).theme.alt.tokens.color = iu());
		});
	}
	function lu(e) {
		let t = V(A).theme.tokens.font[e];
		return [...ms.some(([, e]) => e === t) ? [] : [[t, Q("opt.customFont")]], ...ms.map(([e, t]) => [t, Q(e)])];
	}
	let uu = (e) => parseInt(e, 10) || 0;
	function du(e, t) {
		fs(e, `${t}px`);
	}
	let fu = (e, t) => e && t && t[e] ? t[e] : e, pu = [
		"bg",
		"surface",
		"text",
		"accent",
		"accent-text"
	], mu = [
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
	function hu(e) {
		q("theme", () => {
			let t = e.scheme === "dark", n = t ? e.dark : e.light, r = t ? e.light : e.dark;
			for (let e of pu) V(A).theme.tokens.color[e] = n[e];
			t ? V(A).theme.scheme = "dark" : delete V(A).theme.scheme, V(A).theme.alt = { tokens: { color: { ...r } } };
		});
	}
	let gu = /* @__PURE__ */ P(() => {
		if (!V(A)) return null;
		let e = V(A).theme.tokens.color, t = V(A).theme.alt?.tokens?.color ?? {}, n = V(A).theme.scheme === "dark";
		return mu.find((r) => {
			let i = n ? r.dark : r.light, a = n ? r.light : r.dark;
			return pu.every((n) => e[n] === i[n] && t[n] === a[n]);
		})?.id ?? null;
	});
	function _u() {
		I(D, !V(D)), k?.sendChrome(V(D));
	}
	function vu(e) {
		let t = O.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		n && (Ee(`edit:${e.blockId}`), n.props = e.props, O.save(), j(), V(N)?.blockId === e.blockId && dt(), e.rerender && k?.sendSection(V(g), t), I(v, ""));
	}
	function yu(e) {
		let t = O.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		if (!n) return;
		Ee(e.coalesce ? `edit:${e.groupKey ?? e.blockId}` : "move-block");
		let r = e.frameKey === "mobile" ? "mobile" : "desktop";
		n.frames[r] = e.frame, r === "desktop" && ge(t, "desktop-endret-etter-mobil"), O.save(), j(), V(N)?.blockId === e.blockId && dt();
	}
	function bu(e) {
		let t = O.data.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
		!t?.frames?.desktop || t.frames.desktop.h === e.h || (O.amendBaseline((t) => {
			let n = t.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
			n?.frames?.desktop && (n.frames.desktop.h = e.h);
		}), O.hasDraft() && Ee(`edit:${e.blockId}`), t.frames.desktop.h = e.h, O.save(), j(), V(N)?.blockId === e.blockId && dt());
	}
	function xu(e) {
		let t = O.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			Ee("mobile-manual");
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
	function Su(e) {
		let t = O.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			Ee("mobile-auto");
			for (let e of t.blocks) e.frames.mobile = null;
			t.responsive = {
				...t.responsive ?? {},
				mobile: {
					mode: "auto",
					attention: null
				}
			}, O.save(), j(), me(), k?.sendSection(V(g), t);
		}
	}
	function Cu(e) {
		let t = O.data.sections.find((t) => t.id === e.sectionId);
		t?.responsive?.mobile && (Ee("review-done"), t.responsive.mobile.attention = null, O.save(), j(), me());
	}
	function wu(e) {
		let t = O.data.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
		t && (Ee("decor"), t.decor = e.decor, O.save(), j(), V(N)?.blockId === e.blockId && dt());
	}
	function Tu(e) {
		Ee("add-section"), e.section.id || (e.section.id = Ra("sec")), O.data.sections.splice(e.index, 0, e.section), O.save(), j(), k?.sendPage(V(g), O.data), I(It, e.section.id, !0), Ut(e.section), V(Xe) !== "properties" && (I(Xe, "properties"), k?.sendShowGrid(!1));
	}
	function Eu(e) {
		let t = O.data.sections, n = t.findIndex((t) => t.id === e.sectionId), r = n + e.dir;
		n < 0 || r < 0 || r >= t.length || (Ee("move-section"), [t[n], t[r]] = [t[r], t[n]], O.save(), j(), k?.sendPage(V(g), O.data));
	}
	function Du(e) {
		Ee("delete-section"), e.sectionId === V(It) && (I(It, null), I(Lt, null)), V(N)?.sectionId === e.sectionId && I(N, null), O.data.sections = O.data.sections.filter((t) => t.id !== e.sectionId), O.save(), j(), k?.sendPage(V(g), O.data);
	}
	function Ou(e) {
		let t = O.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			Ee("section-size"), t.size = {
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
			e.moves?.length && (ge(t, "seksjonshøyde"), V(N)?.sectionId === e.sectionId && dt()), e.sectionId === V(It) && I(Rt, e.minHeight, !0), O.save(), j();
		}
	}
	function ku(e) {
		let t = O.data.sections.find((t) => t.id === e.fromSectionId), n = O.data.sections.find((t) => t.id === e.toSectionId), r = t?.blocks.find((t) => t.id === e.blockId);
		!t || !n || !r || (Ee("move-block"), t.blocks = t.blocks.filter((t) => t.id !== e.blockId), r.frames.desktop = e.frame, r.frames.mobile = null, n.blocks.push(r), ge(t, "blokk-flyttet"), ge(n, "blokk-flyttet"), O.save(), j(), me(), k?.sendPage(V(g), O.data), V(N)?.blockId === e.blockId && (I(N, {
			...V(N),
			sectionId: e.toSectionId
		}, !0), dt()));
	}
	function Au(e) {
		let t = O.data.sections.find((t) => t.id === e.sectionId);
		if (!t) return;
		let n = e.blockIds ?? [e.blockId];
		Ee("delete-block"), t.blocks = t.blocks.filter((e) => !n.includes(e.id)), n.includes(V(N)?.blockId) && I(N, null), ge(t, "blokk-slettet"), O.save(), j(), k?.sendSection(V(g), t);
	}
	let ju = {
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
	function Mu(e) {
		let t = ju[e];
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
	function Nu(e) {
		k ? k.sendPlaceBlock(e) : Pu(er()?.id, e);
	}
	function Pu(e, t) {
		let n = O.data.sections.find((t) => t.id === e) ?? O.data.sections[0];
		if (!n) return;
		Ee("add-block");
		let r = Math.max(0, ...n.blocks.map((e) => e.frames?.desktop?.z ?? 1)) + 1;
		t.frames?.desktop && (t.frames.desktop = {
			...t.frames.desktop,
			z: r
		}), n.blocks.push(t), ge(n, "blokk-lagt-til"), O.save(), j(), k?.sendSection(V(g), n);
	}
	function Fu(e, t, n, r) {
		let i = O.data.sections.find((t) => t.id === e);
		if (!i || !t?.length) return;
		Ee("add-blocks");
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
		}), ge(i, "blokk-lagt-til"), O.save(), j(), k?.sendSection(V(g), i);
	}
	function Iu(e) {
		Nu(Mu(e));
	}
	let Lu = /* @__PURE__ */ F(tn([]));
	function Ru(e, t = {}) {
		let n = ze(e);
		Nu({
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
	let zu = /* @__PURE__ */ F("");
	function Bu() {
		let e = [
			{
				label: Q("blocks.text"),
				act: "block",
				kind: "text"
			},
			{
				label: Q("ui.textBox"),
				act: "block",
				kind: "text-box"
			},
			{
				label: Q("blocks.button"),
				act: "block",
				kind: "button"
			},
			{
				label: Q("blocks.image"),
				act: "image"
			},
			{
				label: Q("blocks.video"),
				act: "block",
				kind: "video"
			},
			{
				label: Q("blocks.icon"),
				act: "block",
				kind: "icon"
			},
			{
				label: Q("blocks.samling"),
				act: "block",
				kind: "samling"
			},
			{
				label: Q("blocks.faq"),
				act: "block",
				kind: "faq"
			},
			{
				label: Q("ui.emptyGallery"),
				act: "block",
				kind: "galleri"
			},
			{
				label: Q("ui.galleryWithImages"),
				act: "galleryImages"
			},
			{
				label: Q("shape.line"),
				act: "block",
				kind: "shape-line"
			},
			{
				label: Q("shape.arrow"),
				act: "block",
				kind: "shape-arrow"
			},
			{
				label: Q("shape.circle"),
				act: "block",
				kind: "shape-circle"
			},
			{
				label: Q("shape.rect"),
				act: "block",
				kind: "shape-rect"
			},
			{
				label: Q("shape.triangle"),
				act: "block",
				kind: "shape-triangle"
			}
		];
		for (let t of V(Wi)) {
			let n = Bi[t]?.data?.mal;
			n?.kind === "blocks" && e.push({
				label: n.name,
				act: "mal",
				id: t
			});
		}
		for (let t of V(Lu)) if (t.variants?.length) for (let n of t.variants) e.push({
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
	function Vu(e) {
		e.act === "block" ? Iu(e.kind) : e.act === "plugin" ? Ru(e.entry, e.props ?? {}) : e.act === "mal" && k?.sendInsertTemplate(e.id);
	}
	function Hu(e) {
		let t = Mu(e.kind);
		if (t) {
			if (e.at && typeof e.at.x == "number" && typeof e.at.y == "number") {
				let n = O.data.sections.find((t) => t.id === e.sectionId)?.grid ?? V(A).grid, r = hs({
					x: e.at.x,
					y: e.at.y,
					w: t.frames.desktop.w,
					h: t.frames.desktop.h,
					grid: n
				});
				t.frames.desktop.x = r.x, t.frames.desktop.y = r.y;
			} else t.frames.desktop.x = Math.round((100 - t.frames.desktop.w) / 2 * 100) / 100, t.frames.desktop.y = 40;
			Pu(e.sectionId, t), k?.sendSelect(t.id), e.kind === "image" && x(Q("status.imageBlockAdded")), e.kind === "galleri" && x(Q("status.galleryBlockAdded"));
		}
	}
	async function Uu(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		x(Q("status.compressingImage"));
		let n;
		try {
			n = await wn(t);
		} catch {
			x(Q("status.imageReadError"), "error");
			return;
		}
		let r = Math.round(n.height / n.width * .3 * (V(w)?.clientWidth ?? 1280));
		Nu({
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
	async function Wu(e) {
		let t = [], n = 0, r = 0;
		for (let i of e) try {
			let e = await wn(i);
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
	function Gu(e, t, n) {
		t ? x(Q("status.imagesReadFailed", { n: t }), "error") : n ? x(Q("status.imagesLarge", { n }), "error") : x(e ? "" : Q("status.noImagesAdded"));
	}
	async function Ku(e) {
		let t = [...e.target.files ?? []];
		if (e.target.value = "", !t.length) return;
		x(Q("status.compressingImages"));
		let { images: n, failed: r, big: i } = await Wu(t);
		n.length && gt("galleri-add", (e) => {
			e.props.images.push(...n);
		}), Gu(n.length, r, i);
	}
	async function qu(e) {
		let t = [...e.target.files ?? []];
		if (e.target.value = "", !t.length) return;
		x(Q("status.compressingImages"));
		let { images: n, failed: r, big: i } = await Wu(t);
		if (!n.length) {
			Gu(0, r, i);
			return;
		}
		let a = Mu("galleri");
		a.props.images = n, Nu(a), Gu(n.length, r, i);
	}
	function Ju(e, t) {
		gt("galleri-move", (n) => {
			let r = e + t;
			r < 0 || r >= n.props.images.length || ([n.props.images[e], n.props.images[r]] = [n.props.images[r], n.props.images[e]]);
		});
	}
	function Yu(e) {
		gt("galleri-remove", (t) => {
			t.props.images.splice(e, 1);
		});
	}
	function Xu(e, t, n) {
		gt(`edit:${V(N).blockId}:img${e}-${t}`, (r) => {
			r.props.images[e][t] = n;
		});
	}
	function Zu(e, t, n, r) {
		let i = e?.[t];
		if (!i?.startsWith("data:image/")) return;
		let a = i.split(",", 2)[1], o = `media/${$i(n || "bilde")}-${ea(a)}.${Qi(i)}`;
		r.push({
			path: o,
			content: a,
			encoding: "base64"
		}), e[t] = `/${o}`;
	}
	function Qu(e, t) {
		for (let n of e?.layers ?? []) if (n.type === "image" && Zu(n.props, "src", "bakgrunn", t), n.type === "bildegalleri") for (let e of n.props.images ?? []) Zu(e, "src", "bakgrunn", t);
	}
	function $u(e, t) {
		if (e.type === "image" && Zu(e.props, "src", e.props.alt, t), e.type === "icon" && Zu(e.props, "image", "ikon", t), e.type === "galleri") for (let n of e.props.images ?? []) Zu(n, "src", n.alt || "galleri", t);
	}
	function ed(e, t) {
		Qu(e.background, t);
		for (let n of e.blocks) $u(n, t);
	}
	function td(e) {
		let t = [];
		for (let n of e.sections) ed(n, t);
		return t;
	}
	function nd(e) {
		let t = [], n = e.nav?.logo;
		return n?.type === "image" && Zu(n, "value", "logo", t), n?.type === "both" && Zu(n, "image", "logo", t), e.nav?.style && Zu(e.nav.style, "image", "meny", t), Qu(e.nav?.style?.background, t), Qu(e.footer?.background, t), e.footer?.brand && Zu(e.footer.brand, "logo", "footer-logo", t), Zu(e.site, "icon", "ikon", t), t;
	}
	let rd = /* @__PURE__ */ F(!1);
	function id() {
		if (!V(rd)) {
			I(rd, !0);
			return;
		}
		I(rd, !1), ad();
	}
	bn(() => {
		if (!V(rd)) return;
		let e = (e) => {
			e.target?.closest?.(".discard-btn") || I(rd, !1);
		}, t = (e) => {
			e.key === "Escape" && I(rd, !1);
		}, n = () => I(rd, !1);
		return window.addEventListener("pointerdown", e, !0), window.addEventListener("keydown", t, !0), window.addEventListener("blur", n), () => {
			window.removeEventListener("pointerdown", e, !0), window.removeEventListener("keydown", t, !0), window.removeEventListener("blur", n);
		};
	});
	function ad() {
		Ee("discard");
		for (let e of V(A).pages) e.id !== V(g) && !be.has(e.id) && localStorage.removeItem(`urd-draft-${e.id}`);
		let e = O.reset();
		if (_e.reset(), va && (va.reset(), Ha()), Oi) {
			Oi.reset(), I(Ni, [...Oi.data.samlinger ?? []], !0);
			for (let e of Object.keys(ki)) V(Ni).includes(e) ? ki[e].reset() : delete ki[e];
			ia();
		}
		if (zi) {
			zi.reset(), I(Wi, [...zi.data.maler ?? []], !0);
			for (let e of Object.keys(Bi)) V(Wi).includes(e) ? Bi[e].reset() : (localStorage.removeItem(`urd-draft-mal-${e}`), delete Bi[e]);
			qi();
		}
		ve(), I(E, {
			snap: !0,
			...V(A).grid
		}, !0), j(), I(v, ""), ye(), V(A).pages.some((e) => e.id === V(g)) ? k?.sendPage(V(g), e) : Or(V(A).pages[0].id);
	}
	async function od() {
		if (pr) {
			x(Q("status.revertReloadBeforePublish"), "error");
			return;
		}
		if (V(vr)) {
			x(Q("update.publishBlocked"), "error");
			return;
		}
		x(Q("status.publishing"));
		let e = [], t = [], n = [], r = [];
		for (let i of V(A).pages) {
			let a = `urd-draft-${i.id}`, o = be.has(i.id) || !V(h).pages.some((e) => e.id === i.id), s = null;
			if (i.id === V(g) && (O.hasDraft() || o)) s = O.data;
			else if (i.id !== V(g)) {
				let e = localStorage.getItem(a);
				if (e) try {
					s = Ma(JSON.parse(e), _e.data);
				} catch {}
			}
			if (!s && o && (s = Dr(i)), !s) continue;
			let c = JSON.parse(JSON.stringify(s));
			e.push(...td(c)), e.push({
				path: i.file,
				content: JSON.stringify(c, null, 2) + "\n",
				encoding: "utf-8"
			}), t.push(i.title), o ? r.push(i.id) : n.push(a);
		}
		if (_e.hasDraft()) {
			let r = JSON.parse(JSON.stringify(V(A)));
			e.push(...nd(r)), e.push({
				path: "content/site.json",
				content: JSON.stringify(r, null, 2) + "\n",
				encoding: "utf-8"
			}), e.push({
				path: "content/theme.css",
				content: go(r.theme),
				encoding: "utf-8"
			}), n.push("urd-draft-site");
			let i = (e, t) => JSON.stringify(e ?? null) === JSON.stringify(t ?? null);
			i(V(h).theme, V(A).theme) || t.push("tema"), i(V(h).nav, V(A).nav) || t.push("menyen"), i(V(h).footer, V(A).footer) || t.push("footeren"), i(V(h).pages, V(A).pages) || t.push("sideregisteret"), i(V(h).grid, V(A).grid) || t.push("gridet"), (V(h).site.icon ?? null) !== (V(A).site.icon ?? null) && t.push("nettstedsikonet");
			let { icon: a, ...o } = V(h).site, { icon: s, ...c } = V(A).site;
			i(o, c) || t.push("nettstedsinfo");
		}
		let i = Object.entries(ki).filter(([, e]) => e.hasDraft());
		if (i.length || Oi?.hasDraft()) {
			for (let [t, r] of i) {
				let i = JSON.parse(JSON.stringify(r.data));
				for (let t of i.entries) Zu(t, "image", t.title, e);
				e.push({
					path: `content/samlinger/${t}.json`,
					content: JSON.stringify(i, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push(`urd-draft-samling-${t}`);
			}
			if (Oi?.hasDraft()) {
				e.push({
					path: "content/samlinger.json",
					content: JSON.stringify(Oi.data, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push("urd-draft-samlinger");
				let t = { samlinger: [] };
				try {
					t = await (await fetch("/content/samlinger.json")).json();
				} catch {}
				let r = new Set(e.map((e) => e.path));
				for (let n of t.samlinger ?? []) {
					let t = `content/samlinger/${n}.json`;
					!V(Ni).includes(n) && !r.has(t) && e.push({
						path: t,
						delete: !0
					});
				}
			}
			t.push("samlinger");
		}
		let a = Object.entries(Bi).filter(([, e]) => e.hasDraft());
		if (a.length || zi?.hasDraft()) {
			for (let [t, r] of a) {
				let i = JSON.parse(JSON.stringify(r.data));
				i.section && ed(i.section, e);
				for (let t of i.blocks ?? []) $u(t, e);
				for (let t of i.page?.sections ?? []) ed(t, e);
				e.push({
					path: `content/maler/${t}.json`,
					content: JSON.stringify(i, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push(`urd-draft-mal-${t}`);
			}
			if (zi?.hasDraft()) {
				e.push({
					path: "content/maler.json",
					content: JSON.stringify(zi.data, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push("urd-draft-maler");
				let t = { maler: [] };
				try {
					t = await (await fetch("/content/maler.json")).json();
				} catch {}
				let r = new Set(e.map((e) => e.path));
				for (let n of t.maler ?? []) {
					let t = `content/maler/${n}.json`;
					!V(Wi).includes(n) && !r.has(t) && e.push({
						path: t,
						delete: !0
					});
				}
			}
			t.push("maler");
		}
		va?.hasDraft() && (e.push({
			path: "plugins/plugins.json",
			content: JSON.stringify(va.data, null, 2) + "\n",
			encoding: "utf-8"
		}), n.push("urd-draft-plugins"), t.push("plugins"));
		try {
			let t = await (await fetch("/index.html")).text();
			for (let n of V(A).pages) n.path !== "/" && e.push({
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
		for (let e of V(h).pages) {
			let t = V(A).pages.find((t) => t.id === e.id);
			t ? t.path !== e.path && e.path !== "/" && s(`${e.path.slice(1)}/index.html`) : (s(e.file), e.path !== "/" && s(`${e.path.slice(1)}/index.html`));
		}
		let c = await sr(e);
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
			e ? ar = e : or(), td(O.data), nd(V(A));
			for (let e of n) localStorage.removeItem(e);
			for (let e of r) be.add(e);
			if (I(h, JSON.parse(JSON.stringify(V(A))), !0), _e = Ai("urd-draft-site", () => V(h), S), ve(), va) {
				let e = JSON.parse(JSON.stringify(va.data));
				va = Ai("urd-draft-plugins", () => e, S), Ha();
			}
			if (Oi) {
				for (let e of Object.values(ki)) for (let t of e.data.entries) Zu(t, "image", t.title, []);
				let e = JSON.parse(JSON.stringify(Oi.data));
				Oi = Ai("urd-draft-samlinger", () => e, S), ji = {};
				for (let e of V(Ni)) {
					if (!ki[e]) continue;
					let t = JSON.parse(JSON.stringify(ki[e].data));
					ji[e] = t, ki[e] = Ai(`urd-draft-samling-${e}`, () => t, S);
				}
				ia();
			}
			if (zi) {
				for (let e of Object.values(Bi)) {
					e.data?.section && ed(e.data.section, []);
					for (let t of e.data?.blocks ?? []) $u(t, []);
					for (let t of e.data?.page?.sections ?? []) ed(t, []);
				}
				let e = JSON.parse(JSON.stringify(zi.data));
				zi = Ai("urd-draft-maler", () => e, S), Vi = {};
				for (let e of V(Wi)) {
					if (!Bi[e]) continue;
					let t = JSON.parse(JSON.stringify(Bi[e].data));
					Vi[e] = t, Bi[e] = Ai(`urd-draft-mal-${e}`, () => t, S);
				}
				qi();
			}
			I(E, {
				snap: !0,
				...V(A).grid
			}, !0);
			let t = JSON.parse(JSON.stringify(O.data));
			O = Ai(`urd-draft-${V(g)}`, () => t, S), be.has(V(g)) && C(`urd-draft-${V(g)}`, JSON.stringify(t)), j(), x(Q("status.published"), "ok");
		} else if (u?.status === 401) {
			let e = await u.json().catch(() => null);
			x(e?.code === "loginExpired" ? Q("status.loginExpired") : Q("status.loginRequired", { reason: Ti(e) ?? Q("status.unknownReason") }), "error"), await ir();
		} else u?.status === 403 ? x(Ti(await u.json().catch(() => null)) ?? Q("status.noPublishAccess"), "error") : u?.status === 409 ? x(Q("status.publishRace"), "error") : x(u ? Ti(await u.json().catch(() => null)) ?? Q("status.publishFailed") : Q("status.publishUnavailable"), "error");
	}
	Ie();
	var sd = nu();
	Sr("keydown", nn, Fe), Sr("pointerdown", nn, Pe);
	var cd = R(sd), ld = L(cd), ud = (e) => {
		var t = gc(), n = L(t);
		J(n, () => c.pencil);
		var r = z(n);
		M(t), B((e, n) => {
			Z(t, "title", e), G(r, ` ${n ?? ""}`);
		}, [() => Q("tip.backToEdit"), () => Q("ui.edit")]), H("click", t, _u), W(e, t);
	};
	K(ld, (e) => {
		V(D) || e(ud);
	});
	var dd = z(ld, 2);
	let fd;
	var pd = L(dd), md = z(L(pd), 2), hd = (e) => {
		var t = _c(), n = R(t), r = L(n, !0);
		M(n);
		var i = z(n, 2), a = L(i);
		let o;
		J(a, () => c.desktop, !0), M(a);
		var s = z(a, 2);
		let l;
		J(s, () => c.phone, !0), M(s), M(i);
		var u = z(i, 2), d = L(u);
		let f;
		J(d, () => c.fit, !0), M(d);
		var p = z(d, 2);
		J(p, () => c.minus, !0), M(p);
		var m = z(p, 2), h = L(m);
		M(m);
		var g = z(m, 2);
		J(g, () => c.plus, !0), M(g), M(u);
		var _ = z(u, 2);
		let v;
		J(_, () => c.guides, !0), M(_), B((e, t, i, c, u, y, b, x, S, C) => {
			Z(n, "title", e), G(r, t), o = Zr(a, 1, "ghost svelte-1n46o8q", null, o, { active: V(ee) === "desktop" }), Z(a, "title", i), l = Zr(s, 1, "ghost svelte-1n46o8q", null, l, { active: V(ee) === "mobile" }), Z(s, "title", c), f = Zr(d, 1, "ghost svelte-1n46o8q", null, f, { active: V(ae) === "fit" }), Z(d, "title", u), Z(p, "title", y), Z(m, "title", b), G(h, `${x ?? ""}%`), Z(g, "title", S), v = Zr(_, 1, "ghost guides-btn svelte-1n46o8q", null, v, { active: V(Ar) }), Z(_, "title", C);
		}, [
			() => Q("tip.switchPage"),
			() => xe()?.title ?? "",
			() => Q("tip.desktopView"),
			() => Q("tip.mobileView"),
			() => Q("tip.zoomFit"),
			() => Q("tip.zoomOut"),
			() => Q("tip.zoomCurrent"),
			() => Math.round(V(ce) * 100),
			() => Q("tip.zoomIn"),
			() => Q("tip.guides")
		]), H("click", n, () => lt("pages")), H("click", a, () => I(ee, "desktop")), H("click", s, () => I(ee, "mobile")), H("click", d, () => I(ae, "fit")), H("click", p, () => le(-1)), H("click", g, () => le(1)), H("click", _, Ir), W(e, t);
	};
	K(md, (e) => {
		V(h) && e(hd);
	});
	var gd = z(md, 2), _d = (e) => {
		var t = vc(), n = L(t);
		J(n, () => c.phone);
		var r = z(n);
		M(t), B((e, n) => {
			Z(t, "title", e), G(r, ` ${n ?? ""}`);
		}, [() => Q("tip.attention"), () => Q(V(pe) === 1 ? "ui.attentionOne" : "ui.attentionMany", { n: V(pe) })]), H("click", t, () => I(ee, "mobile")), W(e, t);
	};
	K(gd, (e) => {
		V(pe) > 0 && e(_d);
	});
	var vd = z(gd, 2), yd = (e) => {
		var t = yc(), n = R(t), r = L(n, !0);
		M(n);
		var i = z(n, 2);
		let a;
		var o = L(i, !0);
		M(i), B((e, t, n) => {
			G(r, e), a = Zr(i, 1, "ghost discard-btn svelte-1n46o8q", null, a, { armed: V(rd) }), Z(i, "title", t), G(o, n);
		}, [
			() => Q("ui.unpublished"),
			() => V(rd) ? Q("tip.discardArmed") : Q("tip.discard"),
			() => V(rd) ? Q("ui.discardConfirm") : Q("ui.discard")
		]), H("click", i, id), W(e, t);
	};
	K(vd, (e) => {
		V(_) && e(yd);
	}), M(pd);
	var bd = z(pd, 2), xd = L(bd), Sd = (e) => {
		var t = Cc(), n = R(t), r = L(n), i = (e) => {
			var t = bc(), n = R(t);
			J(n, () => c.eye);
			var r = z(n);
			B((e) => G(r, ` ${e ?? ""}`), [() => Q("ui.cleanView")]), W(e, t);
		}, a = (e) => {
			var t = bc(), n = R(t);
			J(n, () => c.pencil);
			var r = z(n);
			B((e) => G(r, ` ${e ?? ""}`), [() => Q("ui.edit")]), W(e, t);
		};
		K(r, (e) => {
			V(D) ? e(i) : e(a, -1);
		}), M(n);
		var o = z(n, 2), s = (e) => {
			var t = xc(), n = L(t), r = (e) => {
				var t = jr();
				J(R(t), () => c.warn), W(e, t);
			};
			K(n, (e) => {
				V(T).allowed || e(r);
			});
			var i = z(n, 1, !0);
			M(t), B((e) => {
				Z(t, "title", e), G(i, V(T).login);
			}, [() => V(T).allowed ? Q("tip.hasPublishAccess") : Q("tip.noPublishAccess")]), W(e, t);
		}, l = (e) => {
			var t = Sc(), n = L(t, !0);
			M(t), B((e) => G(n, e), [() => Q("ui.loginGitHub")]), W(e, t);
		};
		K(o, (e) => {
			V(T)?.loggedIn ? e(s) : V(T) && e(l, 1);
		});
		var u = z(o, 2), d = L(u, !0);
		M(u);
		var f = z(u, 2), p = L(f, !0);
		M(f), B((e, t, r, i) => {
			Z(n, "title", e), Z(u, "href", t), G(d, r), f.disabled = !V(_), G(p, i);
		}, [
			() => V(D) ? Q("tip.chromeHide") : Q("tip.chromeShow"),
			() => xe()?.path ?? "/",
			() => Q("ui.viewSite"),
			() => Q("ui.publish")
		]), H("click", n, _u), H("click", f, od), W(e, t);
	};
	K(xd, (e) => {
		V(h) && e(Sd);
	}), M(bd), M(dd);
	var Cd = z(dd, 2), wd = (e) => {
		var t = Yl(), i = L(t), o = (e) => {
			var t = Jl(), i = R(t), o = L(i);
			Br(o, 17, () => Ze, Lr, (e, t, n) => {
				var r = Ec(), i = R(r), a = (e) => {
					W(e, wc());
				};
				K(i, (e) => {
					n > 0 && e(a);
				}), Br(z(i, 2), 16, () => V(t), (e) => e, (e, t) => {
					var n = Tc();
					let r;
					var i = L(n, !0);
					M(n), B(() => {
						r = Zr(n, 1, "svelte-1n46o8q", null, r, { active: V(Xe) === t }), G(i, Qe[t]);
					}), H("click", n, () => lt(t)), W(e, n);
				}), W(e, r);
			});
			var s = z(o, 2), f = L(s);
			let p;
			J(f, () => c.gear, !0), M(f);
			var h = z(f, 2), _ = (e) => {
				var t = Dc(), n = L(t), r = L(n, !0);
				M(n);
				var i = z(n, 2), a = L(i);
				$(z(a), {
					get value() {
						return V(u);
					},
					get options() {
						return l;
					},
					onchange: (e) => I(u, e, !0)
				}), M(i);
				var o = z(i, 2), s = L(o), c = z(s);
				{
					let e = /* @__PURE__ */ P(() => [["auto", Q("lang.auto")], ...rt()]);
					$(c, {
						get value() {
							return st;
						},
						get options() {
							return V(e);
						},
						onchange: ct
					});
				}
				M(o);
				var d = z(o, 2), f = L(d), p = z(f);
				{
					let e = /* @__PURE__ */ P(() => [["strip", Q("settings.layoutPickerStrip")], ["menu", Q("settings.layoutPickerMenu")]]);
					$(p, {
						get value() {
							return V(Nr);
						},
						get options() {
							return V(e);
						},
						onchange: Pr
					});
				}
				M(d), M(t), B((e, t, n, c, l, u, p) => {
					G(r, e), Z(i, "title", t), G(a, `${n ?? ""} `), Z(o, "title", c), G(s, `${l ?? ""} `), Z(d, "title", u), G(f, `${p ?? ""} `);
				}, [
					() => Q("settings.title"),
					() => Q("topbar.adminTheme.title"),
					() => Q("settings.theme"),
					() => Q("topbar.language.title"),
					() => Q("settings.language"),
					() => Q("tip.settings.layoutPicker"),
					() => Q("settings.layoutPicker")
				]), W(e, t);
			};
			K(h, (e) => {
				V(Mr) && e(_);
			}), M(s), fi(s, (e) => I(Fr, e), () => V(Fr)), M(i);
			var v = z(i, 2), y = (e) => {
				var t = ql(), i = L(t), o = L(i, !0);
				M(i);
				var s = z(i, 2), l = (e) => {
					var t = Fc(), n = L(t);
					Br(n, 17, () => V(A).pages, (e) => e.id, (e, t) => {
						var n = Mc();
						let r;
						var i = L(n);
						Y(i);
						var a = z(i, 2), o = (e) => {
							var t = Oc();
							B((e) => Z(t, "title", e), [() => Q("tip.pages.homeLocked")]), W(e, t);
						}, s = (e) => {
							var n = kc();
							Y(n), B((e, t) => {
								X(n, e), Z(n, "title", t);
							}, [() => V(t).path.slice(1), () => Q("tip.pages.slug")]), H("change", n, (e) => Xr(V(t), e.target.value)), W(e, n);
						};
						K(a, (e) => {
							V(t).path === "/" ? e(o) : e(s, -1);
						});
						var l = z(a, 2), u = L(l);
						J(u, () => c.right, !0), M(u);
						var d = z(u, 2), f = L(d);
						J(f, () => c.kebab, !0), M(f);
						var p = z(f, 2), m = (e) => {
							var n = jc(), r = L(n), i = L(r);
							J(i, () => c.bookmark);
							var a = z(i);
							M(r);
							var o = z(r, 2), s = (e) => {
								var n = Ac(), r = L(n);
								J(r, () => c.cross);
								var i = z(r);
								M(n), B((e, t) => {
									Z(n, "title", e), G(i, ` ${t ?? ""}`);
								}, [() => Q("tip.pages.delete"), () => Q("ui.deletePage")]), H("click", n, () => {
									I(Hr, null), Qr(V(t));
								}), W(e, n);
							};
							K(o, (e) => {
								V(t).path !== "/" && e(s);
							}), M(n), B((e) => G(a, ` ${e ?? ""}`), [() => Q("ui.savePageTemplate")]), H("click", r, () => Kr(V(t))), W(e, n);
						};
						K(p, (e) => {
							V(Hr) === V(t).id && e(m);
						}), M(d), M(l), M(n), B((e, a, o) => {
							r = Zr(n, 1, "page-row svelte-1n46o8q", null, r, { current: V(t).id === V(g) }), X(i, V(t).title), Z(i, "title", e), Z(u, "title", a), u.disabled = V(t).id === V(g), Z(f, "title", o);
						}, [
							() => Q("tip.pages.title"),
							() => Q("tip.pages.open"),
							() => Q("tip.pages.menu")
						]), H("change", i, (e) => qr(V(t), e.target.value)), H("click", u, () => Or(V(t).id)), H("click", f, () => I(Hr, V(Hr) === V(t).id ? null : V(t).id, !0)), W(e, n);
					});
					var r = z(n, 4);
					Y(r);
					var i = z(r, 2), a = L(i, !0);
					M(i);
					var o = z(i, 2), s = (e) => {
						var t = Pc(), n = L(t);
						let r;
						var i = L(n), a = L(i);
						J(a, () => co({ sections: [] }), !0), M(a);
						var o = z(a, 2), s = L(o, !0);
						M(o), M(i), M(n), Br(z(n, 2), 16, () => V(Wi).filter((e) => Bi[e]?.data?.mal?.kind === "page"), (e) => e, (e, t) => {
							var n = Nc();
							let r;
							var i = L(n), a = L(i);
							J(a, () => co(Bi[t].data.page), !0), M(a);
							var o = z(a, 2), s = L(o, !0);
							M(o), M(i);
							var l = z(i, 2);
							J(l, () => c.cross, !0), M(l), M(n), B((e, a) => {
								r = Zr(n, 1, "page-mal-card svelte-1n46o8q", null, r, { picked: V(Vr) === t }), Z(i, "title", e), G(s, Bi[t].data.mal.name), Z(l, "title", a);
							}, [() => Q("tip.pages.templatePick", { name: Bi[t].data.mal.name }), () => Q("canvas.deleteTemplate")]), H("click", i, () => I(Vr, V(Vr) === t ? null : t, !0)), H("click", l, () => na({ id: t })), W(e, n);
						}), M(t), B((e, t) => {
							r = Zr(n, 1, "page-mal-card svelte-1n46o8q", null, r, { picked: V(Vr) === null }), Z(i, "title", e), G(s, t);
						}, [() => Q("tip.pages.blankPick"), () => Q("ui.blankPage")]), H("click", i, () => I(Vr, null)), W(e, t);
					}, l = /* @__PURE__ */ P(() => V(Wi).some((e) => Bi[e]?.data?.mal?.kind === "page"));
					K(o, (e) => {
						V(l) && e(s);
					}), M(t), B((e, t, n, o) => {
						Z(r, "placeholder", e), Z(i, "title", t), i.disabled = n, G(a, o);
					}, [
						() => Q("ph.newPageName"),
						() => Q("hint.pages.autoMenu"),
						() => !V(zr).trim(),
						() => Q("ui.createPage")
					]), H("keydown", r, (e) => e.key === "Enter" && Gr()), ci(r, () => V(zr), (e) => I(zr, e)), H("click", i, Gr), W(e, t);
				}, u = (e) => {
					var t = Hc(), r = L(t), i = L(r), a = L(i, !0);
					M(i);
					var o = z(i, 2), s = L(o), l = L(s), u = z(l);
					{
						let e = /* @__PURE__ */ P(() => V(A).nav.logo?.type ?? "text"), t = /* @__PURE__ */ P(() => [
							["text", Q("blocks.text")],
							["image", Q("blocks.image")],
							["both", Q("opt.logo.both")]
						]);
						$(u, {
							get value() {
								return V(e);
							},
							get options() {
								return V(t);
							},
							onchange: (e) => ti(e)
						});
					}
					M(s);
					var d = z(s, 2), f = (e) => {
						var t = Ic(), n = R(t);
						Y(n);
						var r = z(n, 2), i = L(r);
						{
							let e = /* @__PURE__ */ P(() => Q("tip.nav.logoFont")), t = /* @__PURE__ */ P(() => V(A).nav.logo?.font ?? ""), n = /* @__PURE__ */ P(() => [["", Q("common.inherit")], ...ms.map(([e, t]) => [t, Q(e)])]);
							$(i, {
								get title() {
									return V(e);
								},
								get value() {
									return V(t);
								},
								get options() {
									return V(n);
								},
								onchange: (e) => ei({ font: e || void 0 })
							});
						}
						var a = z(i, 2);
						Y(a);
						var o = z(a, 2);
						let s;
						var c = L(o), l = L(c, !0);
						M(c), M(o);
						var u = z(o, 2);
						let d;
						var f = L(u), p = L(f, !0);
						M(f), M(u), M(r), B((e, t, r, i, c, f, m) => {
							X(n, V(A).nav.logo?.value ?? ""), Z(n, "placeholder", e), Z(a, "title", t), X(a, V(A).nav.logo?.textSize ?? ""), s = Zr(o, 1, "tbtn svelte-1n46o8q", null, s, { active: V(A).nav.logo?.bold !== !1 }), Z(o, "title", r), G(l, i), d = Zr(u, 1, "tbtn svelte-1n46o8q", null, d, c), Z(u, "title", f), G(p, m);
						}, [
							() => Q("ph.nav.logoName"),
							() => Q("tip.nav.textSize"),
							() => Q("format.bold"),
							() => Q("format.boldLetter"),
							() => ({ active: !!V(A).nav.logo?.italic }),
							() => Q("format.italic"),
							() => Q("format.italicLetter")
						]), H("input", n, (e) => ei({ value: e.target.value })), H("change", a, (e) => ei({ textSize: e.target.value ? Number(e.target.value) : void 0 })), H("click", o, () => ei({ bold: V(A).nav.logo?.bold === !1 })), H("click", u, () => ei({ italic: !V(A).nav.logo?.italic })), W(e, t);
					};
					K(d, (e) => {
						(V(A).nav.logo?.type ?? "text") !== "image" && e(f);
					});
					var p = z(d, 2), m = (e) => {
						var t = Lc(), n = L(t), r = L(n), i = z(r);
						M(n);
						var a = z(n, 2);
						Y(a);
						var o = z(a, 2);
						Y(o), M(t), B((e, t, i, s) => {
							Z(n, "title", e), G(r, `${t ?? ""} `), Z(a, "title", i), X(a, V(A).nav.logo?.size ?? 32), Z(o, "title", s), X(o, V(A).nav.logo?.radius ?? 0);
						}, [
							() => Q("tip.webpAuto"),
							() => (V(A).nav.logo?.type === "image" ? V(A).nav.logo?.value : V(A).nav.logo?.image) ? Q("ui.changeImage") : Q("ui.chooseImage"),
							() => Q("tip.nav.logoHeight"),
							() => Q("tip.nav.logoRadius")
						]), H("change", i, ni), H("change", a, (e) => ei({ size: Number(e.target.value) })), H("change", o, (e) => ei({ radius: Number(e.target.value) })), W(e, t);
					};
					K(p, (e) => {
						(V(A).nav.logo?.type ?? "text") !== "text" && e(m);
					});
					var h = z(p, 2), g = (e) => {
						var t = Ns(), n = L(t), r = z(n);
						{
							let e = /* @__PURE__ */ P(() => V(A).nav.logo?.order ?? "image-first"), t = /* @__PURE__ */ P(() => [["image-first", Q("opt.logo.imageFirst")], ["text-first", Q("opt.logo.textFirst")]]);
							$(r, {
								get value() {
									return V(e);
								},
								get options() {
									return V(t);
								},
								onchange: (e) => ei({ order: e })
							});
						}
						M(t), B((e) => G(n, `${e ?? ""} `), [() => Q("lbl.order")]), W(e, t);
					};
					K(h, (e) => {
						V(A).nav.logo?.type === "both" && e(g);
					}), M(o), M(r);
					var _ = z(r, 2), v = L(_), y = L(v, !0);
					M(v);
					var b = z(v, 2), x = L(b), S = L(x), C = z(S);
					{
						let e = /* @__PURE__ */ P(() => V(A).nav.variant ?? "bar"), t = /* @__PURE__ */ P(() => [
							["bar", Q("opt.navVariant.bar")],
							["floating", Q("opt.navVariant.floating")],
							["floating-square", Q("opt.navVariant.floatingSquare")],
							["floating-tab", Q("opt.navVariant.floatingTab")],
							["side-left", Q("opt.navVariant.sideLeft")],
							["side-right", Q("opt.navVariant.sideRight")]
						]);
						$(C, {
							get value() {
								return V(e);
							},
							get options() {
								return V(t);
							},
							onchange: (e) => Si(e)
						});
					}
					M(x);
					var w = z(x, 2), T = (e) => {
						var t = Rc(), n = R(t), r = L(n);
						Y(r);
						var i = z(r);
						M(n);
						var a = z(n, 2), o = L(a);
						Y(o);
						var s = z(o);
						M(a), B((e, t, c, l) => {
							Z(n, "title", e), ii(r, V(A).nav.style?.glow === !0), G(i, ` ${t ?? ""}`), Z(a, "title", c), ii(o, V(A).nav.style?.topGap !== !1), G(s, ` ${l ?? ""}`);
						}, [
							() => Q("tip.nav.glow"),
							() => Q("lbl.navGlow"),
							() => Q("tip.nav.topGap"),
							() => Q("lbl.navTopGap")
						]), H("change", r, (e) => Ci(e.target.checked)), H("change", o, (e) => wi(e.target.checked)), W(e, t);
					};
					K(w, (e) => {
						V(yi) && e(T);
					});
					var E = z(w, 2), D = (e) => {
						var t = Vs(), n = L(t);
						Y(n);
						var r = z(n);
						M(t), B((e, i) => {
							Z(t, "title", e), ii(n, V(A).nav.overlay === !0), G(r, ` ${i ?? ""}`);
						}, [() => Q("tip.nav.overlay"), () => Q("lbl.navOverlay")]), H("change", n, (e) => q("nav", () => {
							e.target.checked ? V(A).nav.overlay = !0 : delete V(A).nav.overlay;
						})), W(e, t);
					};
					K(E, (e) => {
						!V(yi) && !V(vi) && e(D);
					});
					var ee = z(E, 2), te = (e) => {
						var t = Ns(), n = L(t), r = z(n);
						{
							let e = /* @__PURE__ */ P(() => V(A).nav.style?.sideAlign ?? "left"), t = /* @__PURE__ */ P(() => [
								["left", Q("common.left")],
								["center", Q("common.center")],
								["right", Q("common.right")]
							]);
							$(r, {
								get value() {
									return V(e);
								},
								get options() {
									return V(t);
								},
								onchange: (e) => _i("sideAlign", e === "left" ? void 0 : e)
							});
						}
						M(t), B((e, r) => {
							Z(t, "title", e), G(n, `${r ?? ""} `);
						}, [() => Q("tip.nav.sideAlign"), () => Q("lbl.textAlign")]), W(e, t);
					};
					K(ee, (e) => {
						V(vi) && e(te);
					});
					var ne = z(ee, 2), re = L(ne);
					Y(re);
					var ie = z(re);
					M(ne);
					var ae = z(ne, 2), oe = L(ae), se = z(oe);
					{
						let e = /* @__PURE__ */ P(() => V(A).nav.style?.size ?? "md"), t = /* @__PURE__ */ P(() => [
							["sm", Q("opt.size.sm")],
							["md", Q("opt.size.md")],
							["lg", Q("opt.size.lg")],
							["xl", Q("opt.size.xl")]
						]);
						$(se, {
							get value() {
								return V(e);
							},
							get options() {
								return V(t);
							},
							onchange: (e) => _i("size", e === "md" ? void 0 : e)
						});
					}
					M(ae);
					var ce = z(ae, 2), le = L(ce), ue = z(le), de = (e) => {
						{
							let t = /* @__PURE__ */ P(() => V(A).nav.style?.sidePlacement ?? "top"), n = /* @__PURE__ */ P(() => [
								["top", Q("opt.place.top")],
								["middle", Q("opt.place.middle")],
								["bottom", Q("opt.place.bottom")]
							]);
							$(e, {
								get value() {
									return V(t);
								},
								get options() {
									return V(n);
								},
								onchange: (e) => _i("sidePlacement", e === "top" ? void 0 : e)
							});
						}
					}, fe = (e) => {
						{
							let t = /* @__PURE__ */ P(() => V(A).nav.layout ?? "right"), n = /* @__PURE__ */ P(() => [
								["right", Q("common.right")],
								["center", Q("common.center")],
								["left", Q("opt.layout.leftAfterLogo")]
							]);
							$(e, {
								get value() {
									return V(t);
								},
								get options() {
									return V(n);
								},
								onchange: (e) => gi(e)
							});
						}
					};
					K(ue, (e) => {
						V(vi) ? e(de) : e(fe, -1);
					}), M(ce);
					var pe = z(ce, 2), me = (e) => {
						var t = zc(), n = R(t), r = L(n);
						Y(r);
						var i = z(r);
						M(n);
						var a = z(n, 2), o = (e) => {
							var t = Ns(), n = L(t), r = z(n);
							{
								let e = /* @__PURE__ */ P(() => V(A).nav.scroll ?? "none"), t = /* @__PURE__ */ P(() => [
									["none", Q("opt.scroll.none")],
									["shrink", Q("opt.scroll.shrink")],
									["hide", Q("opt.scroll.hide")]
								]);
								$(r, {
									get value() {
										return V(e);
									},
									get options() {
										return V(t);
									},
									onchange: (e) => q("nav", () => {
										e === "none" ? delete V(A).nav.scroll : V(A).nav.scroll = e;
									})
								});
							}
							M(t), B((e, r) => {
								Z(t, "title", e), G(n, `${r ?? ""} `);
							}, [() => Q("tip.nav.scroll"), () => Q("lbl.navScroll")]), W(e, t);
						};
						K(a, (e) => {
							V(A).nav.sticky !== !1 && e(o);
						}), B((e, t) => {
							Z(n, "title", e), ii(r, V(A).nav.sticky !== !1), G(i, ` ${t ?? ""}`);
						}, [() => Q("tip.nav.sticky"), () => Q("lbl.navSticky")]), H("change", r, (e) => q("nav", () => {
							V(A).nav.sticky = e.target.checked;
						})), W(e, t);
					};
					K(pe, (e) => {
						V(vi) || e(me);
					});
					var he = z(pe, 2), ge = L(he), O = z(ge);
					{
						let e = /* @__PURE__ */ P(() => V(A).nav.style?.hover ?? "standard"), t = /* @__PURE__ */ P(() => [
							["standard", Q("opt.hover.standard")],
							["underline", Q("opt.hover.underline")],
							["pill", Q("opt.hover.pill")],
							["lift-plain", Q("opt.hover.liftPlain")],
							["lift", Q("opt.hover.lift")]
						]);
						$(O, {
							get value() {
								return V(e);
							},
							get options() {
								return V(t);
							},
							onchange: (e) => Di(e)
						});
					}
					M(he);
					var _e = z(he, 2), k = (e) => {
						var t = Bc(), n = R(t), r = L(n), i = z(r), a = L(i);
						M(i), M(n);
						var o = z(n, 2);
						Y(o), B((e, t, i) => {
							Z(n, "title", e), G(r, `${t ?? ""} `), G(a, `${i ?? ""}%`), X(o, V(A).nav.style?.hoverGlow ?? .6);
						}, [
							() => Q("tip.nav.hoverGlow"),
							() => Q("lbl.glowStrength"),
							() => Math.round((V(A).nav.style?.hoverGlow ?? .6) * 100)
						]), H("input", o, (e) => _i("hoverGlow", Number(e.target.value))), W(e, t);
					};
					K(_e, (e) => {
						V(A).nav.style?.hover === "lift" && e(k);
					});
					var ve = z(_e, 2), ye = (e) => {
						var t = Ns(), n = L(t), r = z(n);
						{
							let e = /* @__PURE__ */ P(() => V(A).nav.style?.hoverColor ?? "accent"), t = /* @__PURE__ */ P(Pn);
							Hi(r, {
								get value() {
									return V(e);
								},
								get tokens() {
									return V(t);
								},
								get label() {
									return V(xi)[1];
								},
								onchange: (e) => _i("hoverColor", e)
							});
						}
						M(t), B(() => {
							Z(t, "title", V(xi)[1]), G(n, `${V(xi)[0] ?? ""} `);
						}), W(e, t);
					};
					K(ve, (e) => {
						V(xi) && e(ye);
					});
					var be = z(ve, 2), xe = L(be), j = z(xe);
					{
						let e = /* @__PURE__ */ P(() => V(A).nav.style?.hoverTextColor ?? "accent"), t = /* @__PURE__ */ P(Pn), n = /* @__PURE__ */ P(() => Q("tip.nav.hoverTextColorPick"));
						Hi(j, {
							get value() {
								return V(e);
							},
							get tokens() {
								return V(t);
							},
							get label() {
								return V(n);
							},
							onchange: (e) => _i("hoverTextColor", e)
						});
					}
					M(be);
					var Se = z(be, 2), Ce = L(Se), we = z(Ce);
					{
						let e = /* @__PURE__ */ P(() => V(A).nav.style?.textColor ?? "text"), t = /* @__PURE__ */ P(Pn), n = /* @__PURE__ */ P(() => Q("tip.nav.textColorPick"));
						Hi(we, {
							get value() {
								return V(e);
							},
							get tokens() {
								return V(t);
							},
							get label() {
								return V(n);
							},
							onchange: (e) => _i("textColor", e)
						});
					}
					M(Se);
					var Te = z(Se, 4), Ee = L(Te, !0);
					M(Te);
					var De = z(Te, 2);
					n(De, () => Mn, () => V(A).nav?.style?.background?.layers ?? []), M(b), M(_);
					var Oe = z(_, 2), ke = L(Oe), Ae = L(ke, !0);
					M(ke);
					var je = z(ke, 2), Me = L(je), Ne = L(Me), Pe = z(Ne);
					{
						let e = /* @__PURE__ */ P(() => V(A).nav.style?.subStyle ?? "card"), t = /* @__PURE__ */ P(() => V(vi) ? [
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
								return V(e);
							},
							get options() {
								return V(t);
							},
							onchange: (e) => _i("subStyle", e === "card" ? void 0 : e)
						});
					}
					M(Me);
					var Fe = z(Me, 2), Ie = (e) => {
						var t = Ns(), n = L(t), r = z(n);
						{
							let e = /* @__PURE__ */ P(() => V(A).nav.style?.subPillColor ?? "surface"), t = /* @__PURE__ */ P(Pn), n = /* @__PURE__ */ P(() => Q("tip.nav.subPillColorPick"));
							Hi(r, {
								get value() {
									return V(e);
								},
								get tokens() {
									return V(t);
								},
								get label() {
									return V(n);
								},
								onchange: (e) => _i("subPillColor", e)
							});
						}
						M(t), B((e, r) => {
							Z(t, "title", e), G(n, `${r ?? ""} `);
						}, [() => Q("tip.nav.subPillColor"), () => Q("lbl.subPillColor")]), W(e, t);
					};
					K(Fe, (e) => {
						V(A).nav.style?.subStyle === "pills" && e(Ie);
					});
					var Le = z(Fe, 2), Re = L(Le), ze = z(Re);
					Y(ze), M(Le), M(je), M(Oe);
					var Be = z(Oe, 2), Ve = L(Be), He = L(Ve, !0);
					M(Ve);
					var Ue = z(Ve, 2), We = L(Ue);
					Br(We, 17, () => V(A).nav.items, Lr, (e, t, n) => {
						var r = Vc(), i = R(r), a = L(i);
						Y(a);
						var o = z(a, 2), s = L(o);
						J(s, () => c.plus, !0), M(s);
						var l = z(s, 2);
						l.disabled = n === 0, J(l, () => c.up, !0), M(l);
						var u = z(l, 2);
						J(u, () => c.down, !0), M(u);
						var d = z(u, 2);
						J(d, () => c.cross, !0), M(d), M(o);
						var f = z(o, 2), p = L(f);
						{
							let e = /* @__PURE__ */ P(() => V(t).page ?? (V(t).href == null ? "__none" : "__href")), r = /* @__PURE__ */ P(() => Q("tip.linkTarget")), i = /* @__PURE__ */ P(() => [
								...V(A).pages.map((e) => [e.id, e.title]),
								["__href", Q("opt.linkHref")],
								...V(t).children ? [["__none", Q("opt.noLink")]] : []
							]);
							$(p, {
								get value() {
									return V(e);
								},
								get title() {
									return V(r);
								},
								get options() {
									return V(i);
								},
								onchange: (e) => Xo(n, e)
							});
						}
						M(f);
						var m = z(f, 2), h = (e) => {
							var r = js();
							Y(r), B((e, n) => {
								X(r, V(t).href), Z(r, "placeholder", e), Z(r, "title", n);
							}, [() => Q("ph.hrefAnchor"), () => Q("tip.hrefAnchor")]), H("change", r, (e) => Zo(n, e.target.value)), W(e, r);
						};
						K(m, (e) => {
							!V(t).page && V(t).href != null && e(h);
						}), M(i), Br(z(i, 2), 17, () => V(t).children ?? [], Lr, (e, r, i) => {
							var a = Ms(), o = L(a);
							Y(o);
							var s = z(o, 2), l = L(s);
							l.disabled = i === 0, J(l, () => c.up, !0), M(l);
							var u = z(l, 2);
							J(u, () => c.down, !0), M(u);
							var d = z(u, 2);
							J(d, () => c.cross, !0), M(d), M(s);
							var f = z(s, 2), p = L(f);
							{
								let e = /* @__PURE__ */ P(() => V(r).page ?? "__href"), t = /* @__PURE__ */ P(() => Q("tip.linkTarget")), a = /* @__PURE__ */ P(() => [...V(A).pages.map((e) => [e.id, e.title]), ["__href", Q("opt.linkHref")]]);
								$(p, {
									get value() {
										return V(e);
									},
									get title() {
										return V(t);
									},
									get options() {
										return V(a);
									},
									onchange: (e) => rs(n, i, e)
								});
							}
							M(f);
							var m = z(f, 2), h = (e) => {
								var t = js();
								Y(t), B((e, n) => {
									X(t, V(r).href ?? ""), Z(t, "placeholder", e), Z(t, "title", n);
								}, [() => Q("ph.hrefAnchor"), () => Q("tip.hrefAnchor")]), H("change", t, (e) => is(n, i, e.target.value)), W(e, t);
							};
							K(m, (e) => {
								V(r).page || e(h);
							}), M(a), B((e, n) => {
								X(o, V(r).label), Z(o, "title", e), u.disabled = i === V(t).children.length - 1, Z(d, "title", n);
							}, [() => Q("tip.nav.childLabel"), () => Q("tip.nav.removeChild")]), H("input", o, (e) => ns(n, i, e.target.value)), H("click", l, () => os(n, i, -1)), H("click", u, () => os(n, i, 1)), H("click", d, () => ss(n, i)), W(e, a);
						}), B((e, r, i) => {
							X(a, V(t).label), Z(a, "title", e), Z(s, "title", r), u.disabled = n === V(A).nav.items.length - 1, Z(d, "title", i);
						}, [
							() => Q("tip.nav.itemLabel"),
							() => Q("tip.nav.addChild"),
							() => Q("tip.nav.removeItem")
						]), H("input", a, (e) => Yo(n, e.target.value)), H("click", s, () => ts(n)), H("click", l, () => Qo(n, -1)), H("click", u, () => Qo(n, 1)), H("click", d, () => $o(n)), W(e, r);
					});
					var Ge = z(We, 2), Ke = L(Ge, !0);
					M(Ge), M(Ue), M(Be), M(t), B((e, t, n, r, o, s, c, u, d, f, p, m, h, g, _, v, b, C, w, T, E, D) => {
						Z(i, "title", e), G(a, t), G(l, `${n ?? ""} `), G(y, r), Z(x, "title", o), G(S, `${s ?? ""} `), Z(ne, "title", c), ii(re, V(A).nav.style?.blur !== !1), G(ie, ` ${u ?? ""}`), G(oe, `${d ?? ""} `), G(le, `${f ?? ""} `), G(ge, `${p ?? ""} `), Z(be, "title", m), G(xe, `${h ?? ""} `), G(Ce, `${g ?? ""} `), G(Ee, _), G(Ae, v), G(Ne, `${b ?? ""} `), Z(Le, "title", C), G(Re, `${w ?? ""} `), X(ze, V(A).nav.style?.subColumns ?? 1), Z(Ve, "title", T), G(He, E), G(Ke, D);
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
					]), H("change", re, (e) => _i("blur", e.target.checked)), H("change", ze, (e) => _i("subColumns", Number(e.target.value) > 1 ? Number(e.target.value) : void 0)), H("click", Ge, es), W(e, t);
				}, f = (e) => {
					var t = Gc(), n = L(t), r = L(n), i = z(r);
					Y(i), M(n);
					var a = z(n, 2), o = L(a), s = z(o);
					Y(s), M(a);
					var l = z(a, 2), u = L(l), d = z(u);
					{
						let e = /* @__PURE__ */ P(di), t = /* @__PURE__ */ P(pi);
						$(d, {
							get value() {
								return V(e);
							},
							get options() {
								return V(t);
							},
							onchange: (e) => mi(e)
						});
					}
					M(l);
					var f = z(l, 4), p = L(f), m = z(p), h = (e) => {
						var t = Uc();
						B((e) => {
							Z(t, "src", V(A).site.icon), Z(t, "alt", e);
						}, [() => Q("lbl.siteIcon")]), W(e, t);
					};
					K(m, (e) => {
						V(A).site.icon && e(h);
					}), M(f);
					var g = z(f, 2), _ = L(g), v = L(_), y = z(v);
					M(_);
					var b = z(_, 2), x = (e) => {
						var t = Wc(), n = R(t);
						J(n, () => c.pencil ?? "✎", !0), M(n);
						var r = z(n, 2);
						J(r, () => c.cross, !0), M(r), B((e, t) => {
							Z(n, "title", e), Z(r, "title", t);
						}, [() => Q("tip.site.editIcon"), () => Q("tip.site.removeIcon")]), H("click", n, () => I(ri, V(A).site.icon, !0)), H("click", r, si), W(e, t);
					};
					K(b, (e) => {
						V(A).site.icon && e(x);
					}), M(g), M(t), B((e, t, c, d, f, m, h, g, y, b, x) => {
						Z(n, "title", e), G(r, `${t ?? ""} `), X(i, V(A).site.title ?? ""), Z(i, "placeholder", c), Z(a, "title", d), G(o, `${f ?? ""} `), X(s, V(A).site.description ?? ""), Z(s, "placeholder", m), Z(l, "title", h), G(u, `${g ?? ""} `), G(p, `${y ?? ""} `), Z(_, "title", b), G(v, `${x ?? ""} `);
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
						() => V(A).site.icon ? Q("ui.changeIcon") : Q("ui.chooseIcon")
					]), H("input", i, (e) => li(e.target.value)), H("input", s, (e) => ui(e.target.value)), H("change", y, ai), W(e, t);
				}, p = (e) => {
					var t = $c();
					{
						let e = (e, t = d, n = d) => {
							var r = qc(), i = L(r), a = (e) => {
								var t = Kc(), r = L(t, !0);
								M(t), B(() => G(r, n())), W(e, t);
							};
							K(i, (e) => {
								n() && e(a);
							});
							var o = z(i, 2), s = L(o), c = L(s, !0);
							M(s);
							var l = z(s, 2), u = L(l, !0);
							M(l);
							var f = z(l, 2), p = L(f), m = L(p, !0);
							M(p);
							var h = z(p), g = L(h, !0);
							M(h), M(f), M(o), M(r), B((e, t, n, r, i, a, s, l, d) => {
								$r(o, `--tv-bg:${e ?? ""};--tv-surface:${t ?? ""};--tv-text:${n ?? ""};--tv-accent:${r ?? ""};--tv-accent-ink:${i ?? ""}`), G(c, a), G(u, s), G(m, l), G(g, d);
							}, [
								() => fu(t().bg, t()),
								() => fu(t().surface, t()),
								() => fu(t().text, t()),
								() => fu(t().accent, t()),
								() => fu(t()["accent-text"] ?? t().bg, t()),
								() => Q("preview.heading"),
								() => Q("preview.cardBody"),
								() => Q("preview.button"),
								() => Q("preview.link")
							]), W(e, r);
						};
						var n = L(t), r = L(n, !0);
						M(n);
						var i = z(n, 2);
						Br(i, 21, () => mu, (e) => e.id, (e, t) => {
							var n = Jc();
							let r;
							var i = L(n), a = L(i), o = z(a), s = z(o), c = z(s);
							M(i);
							var l = z(i, 2), u = L(l, !0);
							M(l), M(n), B(() => {
								r = Zr(n, 1, "theme-preset svelte-1n46o8q", null, r, { sel: V(gu) === V(t).id }), Z(n, "title", `${V(t).name} - ${V(t).note}`), $r(a, `background:${V(t).light.bg ?? ""}`), $r(o, `background:${V(t).light.surface ?? ""}`), $r(s, `background:${V(t).light.accent ?? ""}`), $r(c, `background:${V(t).light.text ?? ""}`), G(u, V(t).name);
							}), H("click", n, () => hu(V(t))), W(e, n);
						}), M(i);
						var a = z(i, 2), o = L(a, !0);
						M(a);
						var s = z(a, 2), c = L(s);
						Y(c);
						var l = z(c);
						M(s);
						var u = z(s, 2), f = (e) => {
							var t = Yc(), n = L(t), r = L(n, !0);
							M(n);
							var i = z(n, 2), a = L(i);
							let o;
							var s = L(a, !0);
							M(a);
							var c = z(a, 2);
							let l;
							var u = L(c, !0);
							M(c), M(i), M(t), B((e, t, n, i) => {
								G(r, e), Z(a, "title", t), o = Zr(a, 1, "svelte-1n46o8q", null, o, { on: V(Ln) }), G(s, n), l = Zr(c, 1, "svelte-1n46o8q", null, l, { on: !V(Ln) }), G(u, i);
							}, [
								() => Q("lbl.darkColors"),
								() => Q("hint.theme.autoDark"),
								() => Q("opt.auto"),
								() => Q("opt.custom")
							]), H("click", a, () => cu(!0)), H("click", c, () => cu(!1)), W(e, t);
						};
						K(u, (e) => {
							V(In) && e(f);
						});
						var p = z(u, 2), h = L(p), g = (e) => {
							var t = Xc(), n = L(t, !0);
							M(t), B((e) => G(n, e), [() => Q("lbl.light")]), W(e, t);
						};
						K(h, (e) => {
							V(In) && e(g);
						});
						var _ = z(h, 2);
						let ke;
						var v = L(_, !0);
						M(_), M(p);
						var y = z(p, 2);
						Br(y, 21, () => Fn, ([e, t, n]) => e, (e, t) => {
							var n = /* @__PURE__ */ P(() => m(V(t), 3));
							let r = () => V(n)[0], i = () => V(n)[1], a = () => V(n)[2];
							var o = Zc(), s = L(o);
							{
								let e = /* @__PURE__ */ P(() => V(A).theme.tokens.color[r()] ?? V(A).theme.tokens.color.bg), t = /* @__PURE__ */ P(Pn);
								Hi(s, {
									get value() {
										return V(e);
									},
									get tokens() {
										return V(t);
									},
									get label() {
										return i();
									},
									onchange: (e) => cs(r(), e)
								});
							}
							var c = z(s, 2), l = L(c, !0);
							M(c);
							var u = z(c, 2), d = L(u, !0);
							M(u), M(o), B((e) => {
								G(l, a()), G(d, e);
							}, [() => fu(V(A).theme.tokens.color[r()] ?? V(A).theme.tokens.color.bg, V(zn))]), W(e, o);
						}), M(y);
						var b = z(y, 2), x = (e) => {
							var t = Qc(), n = R(t), r = L(n), i = L(r, !0);
							M(r);
							var a = z(r, 2);
							let o;
							var s = L(a, !0);
							M(a), M(n);
							var c = z(n, 2);
							let l;
							Br(c, 21, () => Fn, ([e, t, n]) => e, (e, t) => {
								var n = /* @__PURE__ */ P(() => m(V(t), 3));
								let r = () => V(n)[0], i = () => V(n)[1], a = () => V(n)[2];
								var o = Zc(), s = L(o);
								{
									let e = /* @__PURE__ */ P(() => V(A).theme.alt.tokens.color[r()] ?? V(Bn)[r()] ?? V(A).theme.tokens.color.bg), t = /* @__PURE__ */ P(Pn), n = /* @__PURE__ */ P(() => Q("theme.darkColorLabel", { name: i() }));
									Hi(s, {
										get value() {
											return V(e);
										},
										get tokens() {
											return V(t);
										},
										get label() {
											return V(n);
										},
										onchange: (e) => au(r(), e)
									});
								}
								var c = z(s, 2), l = L(c, !0);
								M(c);
								var u = z(c, 2), d = L(u, !0);
								M(u), M(o), B((e) => {
									G(l, a()), G(d, e);
								}, [() => fu(V(A).theme.alt.tokens.color[r()] ?? V(Bn)[r()], V(Bn))]), W(e, o);
							}), M(c), B((e, t, n) => {
								G(i, e), o = Zr(a, 1, "chip svelte-1n46o8q", null, o, { accent: V(Rn) === "dark" }), Z(a, "title", t), G(s, n), l = Zr(c, 1, "palcells svelte-1n46o8q", null, l, { autopal: V(Ln) });
							}, [
								() => Q("lbl.dark"),
								() => Q("tip.theme.darkDefault"),
								() => Q("common.standard")
							]), H("click", a, () => ou("dark")), W(e, t);
						};
						K(b, (e) => {
							V(In) && e(x);
						});
						var S = z(b, 2), C = L(S);
						{
							let t = /* @__PURE__ */ P(() => V(In) ? Q("lbl.light") : "");
							e(C, () => V(zn), () => V(t));
						}
						var w = z(C, 2), T = (t) => {
							{
								let n = /* @__PURE__ */ P(() => Q("lbl.dark"));
								e(t, () => V(Bn), () => V(n));
							}
						};
						K(w, (e) => {
							V(In) && e(T);
						}), M(S);
						var E = z(S, 2), D = L(E), ee = L(D, !0);
						M(D);
						var te = z(D, 2), ne = L(te), re = L(ne), ie = z(re);
						{
							let e = /* @__PURE__ */ P(() => lu("heading"));
							$(ie, {
								get value() {
									return V(A).theme.tokens.font.heading;
								},
								get options() {
									return V(e);
								},
								onchange: (e) => ds("heading", e)
							});
						}
						M(ne);
						var ae = z(ne, 2), oe = L(ae), se = z(oe);
						{
							let e = /* @__PURE__ */ P(() => lu("body"));
							$(se, {
								get value() {
									return V(A).theme.tokens.font.body;
								},
								get options() {
									return V(e);
								},
								onchange: (e) => ds("body", e)
							});
						}
						M(ae);
						var ce = z(ae, 2), le = L(ce), ue = L(le, !0);
						M(le);
						var de = z(le, 2), fe = L(de, !0);
						M(de), M(ce), M(te), M(E);
						var pe = z(E, 2), me = L(pe), he = L(me, !0);
						M(me);
						var ge = z(me, 2), O = L(ge), _e = L(O), k = L(_e, !0);
						M(_e);
						var ve = z(_e, 2), ye = L(ve, !0);
						M(ve), M(O);
						var be = z(O, 2), xe = L(be, !0), j = z(xe), Se = L(j, !0);
						M(j), M(be);
						var Ce = z(be, 2);
						Y(Ce);
						var we = z(Ce, 2), Te = L(we, !0), Ee = z(Te), De = L(Ee, !0);
						M(Ee), M(we);
						var Oe = z(we, 2);
						Y(Oe), M(ge), M(pe), M(t), B((e, t, n, i, a, u, d, f, p, m, h, g, y, b, x, S, C, w) => {
							G(r, e), G(o, t), Z(s, "title", n), ii(c, V(In)), G(l, ` ${i ?? ""}`), ke = Zr(_, 1, "chip svelte-1n46o8q", null, ke, { accent: V(Rn) === "light" }), Z(_, "title", a), G(v, u), G(ee, d), G(re, `${f ?? ""} `), G(oe, `${p ?? ""} `), $r(le, `font-family:${V(A).theme.tokens.font.heading ?? ""}`), G(ue, m), $r(de, `font-family:${V(A).theme.tokens.font.body ?? ""}`), G(fe, h), G(he, g), $r(O, `--r-sm:${V(A).theme.tokens.radius.sm ?? ""};--r-md:${V(A).theme.tokens.radius.md ?? ""}`), G(k, y), G(ye, b), G(xe, x), G(Se, V(A).theme.tokens.radius.sm), X(Ce, S), G(Te, C), G(De, V(A).theme.tokens.radius.md), X(Oe, w);
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
							() => uu(V(A).theme.tokens.radius.sm),
							() => Q("lbl.largeCorners"),
							() => uu(V(A).theme.tokens.radius.md)
						]), H("change", c, (e) => su(e.target.checked)), H("click", _, () => ou("light")), H("input", Ce, (e) => du("sm", Number(e.target.value))), H("input", Oe, (e) => du("md", Number(e.target.value)));
					}
					W(e, t);
				}, h = (e) => {
					var t = il();
					let n;
					var r = L(t);
					Y(r);
					var i = z(r, 2), a = (e) => {
						var t = jr();
						Br(R(t), 17, () => fo(Bu(), V(zu), (e) => e.label), (e) => e.label, (e, t) => {
							var n = jr(), r = R(n), i = (e) => {
								var n = el(), r = L(n), i = z(r);
								M(n), B((e) => {
									Z(n, "title", e), G(r, `${V(t).label ?? ""} `);
								}, [() => Q("tip.webpAuto")]), H("change", i, Uu), W(e, n);
							}, a = (e) => {
								var n = tl(), r = L(n), i = z(r);
								M(n), B((e) => {
									Z(n, "title", e), G(r, `${V(t).label ?? ""} `);
								}, [() => Q("tip.blocks.galleryImages")]), H("change", i, qu), W(e, n);
							}, o = (e) => {
								var n = Gs(), r = L(n, !0);
								M(n), B(() => G(r, V(t).label)), H("click", n, () => Vu(V(t))), W(e, n);
							};
							K(r, (e) => {
								V(t).act === "image" ? e(i) : V(t).act === "galleryImages" ? e(a, 1) : e(o, -1);
							}), W(e, n);
						}, (e) => {
							var t = Is(), n = L(t, !0);
							M(t), B((e) => G(n, e), [() => Q("canvas.searchEmpty")]), W(e, t);
						}), W(e, t);
					}, o = /* @__PURE__ */ P(() => V(zu).trim()), s = (e) => {
						var t = rl(), n = R(t), r = L(n), i = L(r, !0);
						M(r);
						var a = z(r, 2), o = L(a), s = L(o, !0);
						M(o);
						var c = z(o, 2), l = L(c, !0);
						M(c), M(a), M(n);
						var u = z(n, 2), d = L(u, !0);
						M(u);
						var f = z(u, 2), p = L(f), m = z(p);
						M(f);
						var h = z(f, 2), g = L(h, !0);
						M(h);
						var _ = z(h, 2), v = L(_, !0);
						M(_);
						var y = z(_, 2), b = L(y, !0);
						M(y);
						var x = z(y, 2), S = L(x, !0);
						M(x);
						var C = z(x, 2), w = L(C), T = L(w, !0);
						M(w);
						var E = z(w, 2), D = L(E), ee = L(D, !0);
						M(D);
						var te = z(D, 2), ne = L(te), re = z(ne);
						M(te), M(E), M(C);
						var ie = z(C, 2), ae = L(ie), oe = L(ae, !0);
						M(ae);
						var se = z(ae, 2), ce = L(se), le = L(ce, !0);
						M(ce);
						var ue = z(ce, 2), de = L(ue, !0);
						M(ue);
						var fe = z(ue, 2), pe = L(fe, !0);
						M(fe);
						var me = z(fe, 2), he = L(me, !0);
						M(me);
						var ge = z(me, 2), O = L(ge, !0);
						M(ge), M(se), M(ie);
						var _e = z(ie, 2), A = (e) => {
							let t = /* @__PURE__ */ P(() => V(Wi).filter((e) => Bi[e]?.data?.mal?.kind === "blocks"));
							var n = nl(), r = L(n), i = L(r, !0);
							M(r);
							var a = z(r, 2);
							Br(a, 20, () => V(t), (e) => e, (e, t) => {
								var n = Gs(), r = L(n, !0);
								M(n), B((e) => {
									Z(n, "title", e), G(r, Bi[t].data.mal.name);
								}, [() => Q("canvas.insertGroup")]), H("click", n, () => k?.sendInsertTemplate(t)), W(e, n);
							}), M(a), M(n), B((e) => G(i, e), [() => Q("canvas.tabMyTemplates")]), W(e, n);
						}, ve = /* @__PURE__ */ P(() => V(Wi).some((e) => Bi[e]?.data?.mal?.kind === "blocks"));
						K(_e, (e) => {
							V(ve) && e(A);
						});
						var ye = z(_e, 2), be = (e) => {
							var t = nl(), n = L(t), r = L(n, !0);
							M(n);
							var i = z(n, 2);
							Br(i, 21, () => V(Lu), (e) => e.type, (e, t) => {
								var n = jr(), r = R(n), i = (e) => {
									var n = nl(), r = L(n), i = L(r, !0);
									M(r);
									var a = z(r, 2);
									Br(a, 21, () => V(t).variants, (e) => e.label, (e, n) => {
										var r = Gs(), i = L(r, !0);
										M(r), B((e) => {
											Z(r, "title", e), G(i, V(n).label);
										}, [() => Q("tip.blocks.fromPlugin", { plugin: V(t).plugin })]), H("click", r, () => Ru(V(t), V(n).props)), W(e, r);
									}), M(a), M(n), B(() => G(i, V(t).label)), W(e, n);
								}, a = (e) => {
									var n = Gs(), r = L(n, !0);
									M(n), B((e) => {
										Z(n, "title", e), G(r, V(t).label);
									}, [() => Q("tip.blocks.fromPlugin", { plugin: V(t).plugin })]), H("click", n, () => Ru(V(t))), W(e, n);
								};
								K(r, (e) => {
									V(t).variants?.length ? e(i) : e(a, -1);
								}), W(e, n);
							}), M(i), M(t), B((e) => G(r, e), [() => Q("panel.plugins")]), W(e, t);
						};
						K(ye, (e) => {
							V(Lu).length && e(be);
						}), B((e, t, n, r, a, o, u, m, C, w, E, re, ie, ae, se, ce, ue, fe, me, ge, _e, k, A, ve, ye, be) => {
							G(i, e), G(s, t), Z(c, "title", n), G(l, r), G(d, a), Z(f, "title", o), G(p, `${u ?? ""} `), Z(h, "title", m), G(g, C), Z(_, "title", w), G(v, E), Z(y, "title", re), G(b, ie), Z(x, "title", ae), G(S, se), G(T, ce), Z(D, "title", ue), G(ee, fe), Z(te, "title", me), G(ne, `${ge ?? ""} `), G(oe, _e), G(le, k), G(de, A), G(pe, ve), G(he, ye), G(O, be);
						}, [
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
						]), H("click", o, () => Iu("text")), H("click", c, () => Iu("text-box")), H("click", u, () => Iu("button")), H("change", m, Uu), H("click", h, () => Iu("video")), H("click", _, () => Iu("icon")), H("click", y, () => Iu("samling")), H("click", x, () => Iu("faq")), H("click", D, () => Iu("galleri")), H("change", re, qu), H("click", ce, () => Iu("shape-line")), H("click", ue, () => Iu("shape-arrow")), H("click", fe, () => Iu("shape-circle")), H("click", me, () => Iu("shape-rect")), H("click", ge, () => Iu("shape-triangle")), W(e, t);
					};
					K(i, (e) => {
						V(o) ? e(a) : e(s, -1);
					}), M(t), B((e, i, a) => {
						n = Zr(t, 1, "panel-body svelte-1n46o8q", null, n, { locked: V(ee) === "mobile" }), Z(t, "title", e), Z(r, "placeholder", i), Z(r, "title", a);
					}, [
						() => V(ee) === "mobile" ? Q("tip.blocks.mobileLocked") : void 0,
						() => Q("canvas.searchBlocks"),
						() => Q("canvas.searchBlocks")
					]), ci(r, () => V(zu), (e) => I(zu, e)), W(e, t);
				}, _ = (e) => {
					var t = al(), n = L(t), r = L(n), i = z(r), a = L(i);
					M(i), M(n);
					var o = z(n, 2);
					Y(o);
					var s = z(o, 2), c = L(s);
					Y(c);
					var l = z(c);
					M(s), M(t), B((e, t) => {
						G(r, `${e ?? ""} `), G(a, `${V(E).size ?? ""} px`), X(o, V(E).size), ii(c, V(E).snap !== !1), G(l, ` ${t ?? ""}`);
					}, [() => Q("lbl.gridSize"), () => Q("lbl.gridSnap")]), H("input", o, (e) => rr("size", Number(e.target.value))), H("change", c, (e) => rr("snap", e.target.checked)), W(e, t);
				}, v = (e) => {
					var t = fl(), r = L(t), i = (e) => {
						var t = ol(), n = R(t), r = L(n, !0);
						M(n);
						var i = z(n, 2);
						a(i), B((e) => G(r, e), [() => Q("blocks.suffix", { label: Nt[V(N).type] ?? V(N).type })]), W(e, t);
					}, o = (e) => {
						var t = dl(), r = R(t), i = L(r, !0);
						M(r);
						var a = z(r, 2), o = L(a), s = z(o);
						Y(s), M(a);
						var l = z(a, 4), u = L(l);
						Y(u);
						var d = z(u);
						M(l);
						var f = z(l, 2), p = (e) => {
							var t = sl(), n = R(t), r = L(n), i = z(r), a = L(i);
							M(i), M(n);
							var o = z(n, 2);
							Y(o), B((e) => {
								G(r, `${e ?? ""} `), G(a, `${V(Lt).size ?? ""} px`), X(o, V(Lt).size);
							}, [() => Q("lbl.gridSize")]), H("input", o, (e) => nr("size", Number(e.target.value))), W(e, t);
						};
						K(f, (e) => {
							V(Lt) && e(p);
						});
						var m = z(f, 4), h = L(m), g = z(h);
						{
							let e = /* @__PURE__ */ P(() => [["", Q("common.standard")], ...Object.entries(yo).map(([e, t]) => [e, Q(t)])]);
							$(g, {
								get value() {
									return V(Ht);
								},
								get options() {
									return V(e);
								},
								onchange: (e) => qt(e)
							});
						}
						M(m);
						var _ = z(m, 2), v = L(_), y = z(v), b = L(y), x = L(b);
						M(b);
						var S = z(b, 2);
						J(S, () => c.copy, !0), M(S), M(y), M(_);
						var C = z(_, 4), w = L(C, !0);
						M(C);
						var T = z(C, 2);
						n(T, () => V(jn), () => V(zt));
						var E = z(T, 4), D = L(E), ee = z(D);
						{
							let e = /* @__PURE__ */ P(() => Hn(V(Bt)) ? V(Bt).type : "");
							$(ee, {
								get value() {
									return V(e);
								},
								get options() {
									return Un;
								},
								onchange: (e) => Yn(e || null)
							});
						}
						M(E);
						var te = z(E, 2), ne = (e) => {
							var t = ul(), n = R(t), r = L(n), i = z(r);
							Y(i), M(n);
							var a = z(n, 2), o = (e) => {
								var t = cl(), n = R(t), r = L(n), i = z(r);
								Y(i), M(n);
								var a = z(n, 2), o = L(a), s = z(o);
								{
									let e = /* @__PURE__ */ P(() => V(Bt).props.pattern ?? "sequence"), t = /* @__PURE__ */ P(() => [["sequence", Q("opt.stagger.sequence")], ["columns", Q("opt.stagger.columns")]]);
									$(s, {
										get value() {
											return V(e);
										},
										get options() {
											return V(t);
										},
										onchange: (e) => Qn(e)
									});
								}
								M(a), B((e, t, s, c) => {
									Z(n, "title", e), G(r, `${t ?? ""} `), X(i, V(Bt).props.step ?? 90), Z(a, "title", s), G(o, `${c ?? ""} `);
								}, [
									() => Q("tip.props.staggerStep"),
									() => Q("lbl.stepMs"),
									() => Q("tip.props.staggerPattern"),
									() => Q("lbl.pattern")
								]), H("change", i, (e) => Zn("step", Number(e.target.value))), W(e, t);
							}, s = (e) => {
								var t = ll(), n = L(t), r = z(n);
								Y(r), M(t), B((e) => {
									G(n, `${e ?? ""} `), X(r, V(Bt).props.delay);
								}, [() => Q("lbl.delayMs")]), H("change", r, (e) => Zn("delay", Number(e.target.value))), W(e, t);
							};
							K(a, (e) => {
								V(Bt).type === "stagger" ? e(o) : e(s, -1);
							}), B((e) => {
								G(r, `${e ?? ""} `), X(i, V(Bt).props.duration);
							}, [() => Q("lbl.durationMs")]), H("change", i, (e) => Zn("duration", Number(e.target.value))), W(e, t);
						}, re = /* @__PURE__ */ P(() => Hn(V(Bt)));
						K(te, (e) => {
							V(re) && e(ne);
						});
						var ie = z(te, 2), ae = L(ie), oe = z(ae);
						{
							let e = /* @__PURE__ */ P(() => V(Vt)?.type ?? (V(Bt) && !Hn(V(Bt)) ? V(Bt).type : ""));
							$(oe, {
								get value() {
									return V(e);
								},
								get options() {
									return Wn;
								},
								onchange: (e) => Xn(e || null)
							});
						}
						M(ie), B((e, t, n, r, c, l, f, p, g, y, b, C, T, ee, te) => {
							G(i, e), Z(a, "title", t), G(o, `${n ?? ""} `), X(s, V(Rt)), Z(s, "placeholder", r), ii(u, V(Lt) !== null), G(d, ` ${c ?? ""}`), Z(m, "title", l), G(h, `${f ?? ""} `), Z(_, "title", p), G(v, `${g ?? ""} `), G(x, `#${V(It) ?? ""}`), Z(S, "title", y), G(w, b), Z(E, "title", C), G(D, `${T ?? ""} `), Z(ie, "title", ee), G(ae, `${te ?? ""} `);
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
						]), H("change", s, (e) => $n(e.target.value)), H("change", u, (e) => tr(e.target.checked)), H("click", S, () => navigator.clipboard?.writeText(`#${V(It)}`)), W(e, t);
					}, s = (e) => {
						var t = Is(), n = L(t, !0);
						M(t), B((e) => G(n, e), [() => Q("hint.props.empty")]), W(e, t);
					};
					K(r, (e) => {
						V(N) ? e(i) : V(It) ? e(o, 1) : e(s, -1);
					}), M(t), W(e, t);
				}, y = (e) => {
					var t = xl(), i = L(t), a = L(i);
					Y(a);
					var o = z(a);
					M(i);
					var s = z(i, 2), l = (e) => {
						var t = nl(), n = L(t), r = L(n, !0);
						M(n);
						var i = z(n, 2);
						Br(i, 21, () => V(A).pages ?? [], (e) => e.id, (e, t) => {
							var n = Vs(), r = L(n);
							Y(r);
							var i = z(r);
							M(n), B((e, a) => {
								Z(n, "title", e), ii(r, a), G(i, ` ${(V(t).title || V(t).id) ?? ""}`);
							}, [() => Q("tip.footer.hideOnPage"), () => !(V(A).footer?.hideOn ?? []).includes(V(t).id)]), H("change", r, (e) => ko(V(t).id, e.target.checked)), W(e, n);
						}), M(i), M(t), B((e) => G(r, e), [() => Q("group.showOnPages")]), W(e, t);
					};
					K(s, (e) => {
						V(A).footer?.show && e(l);
					});
					var u = z(s, 2), d = L(u), f = L(d, !0);
					M(d);
					var p = z(d, 2), m = L(p);
					Br(m, 21, () => lo, (e) => e.id, (e, t) => {
						var n = pl(), r = L(n);
						J(r, () => us(V(t).thumb), !0), M(r);
						var i = z(r, 2), a = L(i, !0);
						M(i), M(n), B((e) => {
							Z(n, "title", e), G(a, V(t).label);
						}, [() => Q("tip.footer.template", { label: V(t).label })]), H("click", n, () => po(V(t).id)), W(e, n);
					}), M(m), M(p), M(u);
					var h = z(u, 2), g = L(h), _ = L(g, !0);
					M(g);
					var v = z(g, 2), y = L(v), b = L(y), x = z(b);
					Y(x), M(y);
					var S = z(y, 2), C = L(S), w = z(C);
					Y(w), M(S);
					var T = z(S, 2), E = L(T), D = z(E);
					{
						let e = /* @__PURE__ */ P(() => V(A).footer?.brand?.mode ?? "text"), t = /* @__PURE__ */ P(() => [
							["text", Q("blocks.text")],
							["image", Q("opt.brand.image")],
							["both", Q("opt.brand.both")]
						]);
						$(D, {
							get value() {
								return V(e);
							},
							get options() {
								return V(t);
							},
							onchange: (e) => ro(e)
						});
					}
					M(T);
					var ee = z(T, 2), te = (e) => {
						var t = hl(), n = R(t), r = L(n), i = L(r), a = z(i);
						M(r);
						var o = z(r, 2), s = (e) => {
							var t = _s();
							J(t, () => c.cross, !0), M(t), B((e) => Z(t, "title", e), [() => Q("tip.footer.removeLogo")]), H("click", t, ao), W(e, t);
						};
						K(o, (e) => {
							V(A).footer?.brand?.logo && e(s);
						}), M(n);
						var l = z(n, 2), u = (e) => {
							var t = ml(), n = R(t), r = L(n), i = z(r), a = L(i);
							M(i), M(n);
							var o = z(n, 2);
							Y(o), B((e) => {
								G(r, `${e ?? ""} `), G(a, `${V(A).footer?.brand?.logoHeight ?? 40 ?? ""} px`), X(o, V(A).footer?.brand?.logoHeight ?? 40);
							}, [() => Q("lbl.logoHeight")]), H("input", o, (e) => oo(e.target.value)), W(e, t);
						};
						K(l, (e) => {
							V(A).footer?.brand?.logo && e(u);
						}), B((e, t) => {
							Z(r, "title", e), G(i, `${t ?? ""} `);
						}, [() => Q("tip.webpAutoPublish"), () => V(A).footer?.brand?.logo ? Q("ui.changeLogo") : Q("ui.uploadLogo")]), H("change", a, io), W(e, t);
					};
					K(ee, (e) => {
						(V(A).footer?.brand?.mode ?? "text") !== "text" && e(te);
					}), M(v), M(h);
					var ne = z(h, 2), re = L(ne), ie = L(re, !0);
					M(re);
					var ae = z(re, 2), oe = L(ae);
					Br(oe, 17, () => V(A).footer?.columns ?? [], Lr, (e, t, n) => {
						var r = gl(), i = R(r), a = L(i);
						Y(a);
						var o = z(a, 2), s = L(o);
						J(s, () => c.plus, !0), M(s);
						var l = z(s, 2);
						l.disabled = n === 0, J(l, () => c.up, !0), M(l);
						var u = z(l, 2);
						J(u, () => c.down, !0), M(u);
						var d = z(u, 2);
						J(d, () => c.cross, !0), M(d), M(o), M(i), Br(z(i, 2), 17, () => V(t).links ?? [], Lr, (e, r, i) => {
							var a = Ms(), o = L(a);
							Y(o);
							var s = z(o, 2), l = L(s);
							l.disabled = i === 0, J(l, () => c.up, !0), M(l);
							var u = z(l, 2);
							J(u, () => c.down, !0), M(u);
							var d = z(u, 2);
							J(d, () => c.cross, !0), M(d), M(s);
							var f = z(s, 2), p = L(f);
							{
								let e = /* @__PURE__ */ P(() => V(r).page ?? "__href"), t = /* @__PURE__ */ P(() => Q("tip.linkTarget")), a = /* @__PURE__ */ P(() => [...V(A).pages.map((e) => [e.id, e.title]), ["__href", Q("opt.linkHref")]]);
								$(p, {
									get value() {
										return V(e);
									},
									get title() {
										return V(t);
									},
									get options() {
										return V(a);
									},
									onchange: (e) => Vo(n, i, e)
								});
							}
							M(f);
							var m = z(f, 2), h = (e) => {
								var t = js();
								Y(t), B((e, n) => {
									X(t, V(r).href ?? ""), Z(t, "placeholder", e), Z(t, "title", n);
								}, [() => Q("ph.hrefAnchor"), () => Q("tip.hrefAnchor")]), H("change", t, (e) => Ho(n, i, e.target.value)), W(e, t);
							};
							K(m, (e) => {
								V(r).page || e(h);
							}), M(a), B((e, n) => {
								X(o, V(r).label), Z(o, "title", e), u.disabled = i === V(t).links.length - 1, Z(d, "title", n);
							}, [() => Q("tip.linkLabel"), () => Q("tip.removeLink")]), H("input", o, (e) => Bo(n, i, e.target.value)), H("click", l, () => zo(n, i, -1)), H("click", u, () => zo(n, i, 1)), H("click", d, () => Ro(n, i)), W(e, a);
						}), B((e, r, i) => {
							X(a, V(t).title), Z(a, "title", e), Z(s, "title", r), u.disabled = n === V(A).footer.columns.length - 1, Z(d, "title", i);
						}, [
							() => Q("tip.footer.columnTitle"),
							() => Q("tip.footer.addLink"),
							() => Q("tip.footer.removeColumn")
						]), H("input", a, (e) => No(n, e.target.value)), H("click", s, () => Io(n)), H("click", l, () => Mo(n, -1)), H("click", u, () => Mo(n, 1)), H("click", d, () => jo(n)), W(e, r);
					});
					var se = z(oe, 2), ce = L(se, !0);
					M(se);
					var le = z(se, 2), ue = L(le), de = z(ue);
					{
						let e = /* @__PURE__ */ P(() => V(A).footer?.columnsAlign ?? "left"), t = /* @__PURE__ */ P(() => [["left", Q("common.left")], ["center", Q("common.center")]]);
						$(de, {
							get value() {
								return V(e);
							},
							get options() {
								return V(t);
							},
							onchange: (e) => To(e)
						});
					}
					M(le), M(ae), M(ne);
					var fe = z(ne, 2), pe = L(fe), me = L(pe, !0);
					M(pe);
					var he = z(pe, 2), ge = L(he);
					Br(ge, 17, () => V(A).footer?.social ?? [], Lr, (e, t, n) => {
						var r = _l(), i = L(r), a = L(i);
						J(a, () => ua(V(t).icon) || "", !0), M(a);
						var o = z(a, 2);
						{
							let e = /* @__PURE__ */ P(() => Q("blocks.icon"));
							$(o, {
								get value() {
									return V(t).icon;
								},
								get title() {
									return V(e);
								},
								get options() {
									return Jo;
								},
								onchange: (e) => Ko(n, e)
							});
						}
						M(i);
						var s = z(i, 2), l = L(s);
						l.disabled = n === 0, J(l, () => c.up, !0), M(l);
						var u = z(l, 2);
						J(u, () => c.down, !0), M(u);
						var d = z(u, 2);
						J(d, () => c.cross, !0), M(d), M(s);
						var f = z(s, 2);
						Y(f), M(r), B((e, r) => {
							u.disabled = n === V(A).footer.social.length - 1, Z(d, "title", e), X(f, V(t).url), Z(f, "placeholder", r);
						}, [() => Q("tip.removeLink"), () => Q("ph.hrefMailto")]), H("click", l, () => Go(n, -1)), H("click", u, () => Go(n, 1)), H("click", d, () => Wo(n)), H("change", f, (e) => qo(n, e.target.value)), W(e, r);
					});
					var O = z(ge, 2), _e = L(O, !0);
					M(O), M(he), M(fe);
					var k = z(fe, 2), ve = L(k), ye = L(ve, !0);
					M(ve);
					var be = z(ve, 2), xe = L(be), j = L(xe);
					Y(j);
					var Se = z(j);
					M(xe);
					var Ce = z(xe, 2), we = (e) => {
						let t = /* @__PURE__ */ P(() => V(A).footer.cta);
						var n = bl(), r = R(n), i = L(r), a = z(i);
						{
							let e = /* @__PURE__ */ P(() => V(t).kind ?? "button"), n = /* @__PURE__ */ P(() => [["button", Q("opt.cta.button")], ["newsletter", Q("opt.cta.newsletter")]]);
							$(a, {
								get value() {
									return V(e);
								},
								get options() {
									return V(n);
								},
								onchange: (e) => Do("kind", e)
							});
						}
						M(r);
						var o = z(r, 2), s = L(o);
						Y(s);
						var c = z(s);
						M(o);
						var l = z(o, 2), u = L(l), d = z(u);
						Y(d), M(l);
						var f = z(l, 2), p = L(f), m = z(p);
						Y(m), M(f);
						var h = z(f, 2), g = L(h), _ = z(g);
						Y(_), M(h);
						var v = z(h, 2), y = (e) => {
							var n = vl(), r = R(n), i = L(r), a = z(i);
							{
								let e = /* @__PURE__ */ P(() => V(t).page ?? "__href"), n = /* @__PURE__ */ P(() => [...V(A).pages.map((e) => [e.id, e.title]), ["__href", Q("opt.linkHrefMailto")]]);
								$(a, {
									get value() {
										return V(e);
									},
									get options() {
										return V(n);
									},
									onchange: (e) => Oo(e)
								});
							}
							M(r);
							var o = z(r, 2), s = (e) => {
								var n = zs();
								Y(n), B((e, r) => {
									X(n, V(t).href ?? ""), Z(n, "placeholder", e), Z(n, "title", r);
								}, [() => Q("ph.hrefMailtoAnchor"), () => Q("tip.hrefAnchor")]), H("change", n, (e) => Do("href", e.target.value)), W(e, n);
							};
							K(o, (e) => {
								V(t).page || e(s);
							}), B((e, t) => {
								Z(r, "title", e), G(i, `${t ?? ""} `);
							}, [() => Q("tip.footer.ctaTarget"), () => Q("lbl.buttonTarget")]), W(e, n);
						}, b = (e) => {
							var n = yl(), r = R(n), i = L(r), a = z(i);
							Y(a), M(r);
							var o = z(r, 2), s = L(o), c = z(s);
							Y(c), M(o);
							var l = z(o, 2), u = L(l), d = z(u);
							Y(d), M(l), B((e, n, f, p, m, h, g, _, v) => {
								Z(r, "title", e), G(i, `${n ?? ""} `), X(a, V(t).endpoint ?? ""), Z(a, "placeholder", f), Z(o, "title", p), G(s, `${m ?? ""} `), X(c, V(t).recipient ?? ""), Z(c, "placeholder", h), Z(l, "title", g), G(u, `${_ ?? ""} `), X(d, V(t).success ?? ""), Z(d, "placeholder", v);
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
							]), H("change", a, (e) => Do("endpoint", e.target.value)), H("change", c, (e) => Do("recipient", e.target.value)), H("input", d, (e) => Do("success", e.target.value)), W(e, n);
						};
						K(v, (e) => {
							(V(t).kind ?? "button") === "button" ? e(y) : e(b, -1);
						}), B((e, n, a, v, y, b, x, S, C, w, T, E) => {
							Z(r, "title", e), G(i, `${n ?? ""} `), Z(o, "title", a), ii(s, V(t).big === !0), G(c, ` ${v ?? ""}`), Z(l, "title", y), G(u, `${b ?? ""} `), X(d, V(t).heading ?? ""), Z(d, "placeholder", x), Z(f, "title", S), G(p, `${C ?? ""} `), X(m, V(t).sub ?? ""), Z(h, "title", w), G(g, `${T ?? ""} `), X(_, V(t).label ?? ""), Z(_, "placeholder", E);
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
						]), H("change", s, (e) => Do("big", e.target.checked)), H("input", d, (e) => Do("heading", e.target.value)), H("input", m, (e) => Do("sub", e.target.value)), H("input", _, (e) => Do("label", e.target.value)), W(e, n);
					};
					K(Ce, (e) => {
						V(A).footer?.cta && e(we);
					}), M(be), M(k);
					var Te = z(k, 2), Ee = L(Te), De = L(Ee, !0);
					M(Ee);
					var Oe = z(Ee, 2), ke = L(Oe);
					r(ke, () => "linkRow", () => V(A).footer?.linkRow ?? []);
					var Ae = z(ke, 2), je = L(Ae, !0);
					M(Ae), M(Oe), M(Te);
					var Ne = z(Te, 2), Pe = L(Ne), Fe = L(Pe, !0);
					M(Pe);
					var Ie = z(Pe, 2), Le = L(Ie), Re = (e) => {
						var t = rc(), n = R(t), r = L(n), i = z(r);
						{
							let e = /* @__PURE__ */ P(() => V(A).footer?.align ?? "left"), t = /* @__PURE__ */ P(() => [
								["left", Q("common.left")],
								["center", Q("common.center")],
								["right", Q("common.right")]
							]);
							$(i, {
								get value() {
									return V(e);
								},
								get options() {
									return V(t);
								},
								onchange: (e) => to("footer", (t) => {
									t.align = e;
								})
							});
						}
						M(n), Me(2), B((e, t) => {
							Z(n, "title", e), G(r, `${t ?? ""} `);
						}, [() => Q("tip.footer.align"), () => Q("lbl.align")]), W(e, t);
					};
					K(Le, (e) => {
						V(A).footer?.cta?.big !== !0 && e(Re);
					});
					var ze = z(Le, 2), Be = L(ze, !0);
					M(ze);
					var Ve = z(ze, 2);
					n(Ve, () => Nn, () => V(A).footer?.background?.layers ?? []), M(Ie), M(Ne);
					var He = z(Ne, 2), Ue = L(He), We = L(Ue, !0);
					M(Ue);
					var Ge = z(Ue, 2), Ke = L(Ge), qe = L(Ke), Je = z(qe);
					Y(Je), M(Ke);
					var Ye = z(Ke, 2), Xe = L(Ye, !0);
					M(Ye);
					var Ze = z(Ye, 2);
					r(Ze, () => "baseline", () => V(A).footer?.baseline ?? []);
					var Qe = z(Ze, 2), $e = L(Qe, !0);
					M(Qe), M(Ge), M(He), M(t), B((e, t, n, r, s, c, l, u, d, p, m, h, g, v, D, ee, te, ne, re, ae, oe, se, de, fe, pe, he, ge, O, k, ve, be, Ce) => {
						Z(i, "title", e), ii(a, t), G(o, ` ${n ?? ""}`), G(f, r), G(_, s), Z(y, "title", c), G(b, `${l ?? ""} `), X(x, V(A).footer?.brand?.title ?? ""), Z(x, "placeholder", u), Z(S, "title", d), G(C, `${p ?? ""} `), X(w, V(A).footer?.brand?.tagline ?? ""), Z(T, "title", m), G(E, `${h ?? ""} `), G(ie, g), G(ce, v), Z(le, "title", D), G(ue, `${ee ?? ""} `), G(me, te), G(_e, ne), G(ye, re), Z(xe, "title", ae), ii(j, oe), G(Se, ` ${se ?? ""}`), G(De, de), G(je, fe), G(Fe, pe), G(Be, he), G(We, ge), Z(Ke, "title", O), G(qe, `${k ?? ""} `), X(Je, V(A).footer?.copyright ?? ""), Z(Je, "placeholder", ve), G(Xe, be), G($e, Ce);
					}, [
						() => Q("tip.footer.show"),
						() => !!V(A).footer?.show,
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
						() => !!V(A).footer?.cta,
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
					]), H("change", a, (e) => to("footer", (t) => {
						t.show = e.target.checked;
					})), H("input", x, (e) => no("title", e.target.value)), H("input", w, (e) => no("tagline", e.target.value)), H("click", se, Ao), H("click", O, Uo), H("change", j, (e) => Eo(e.target.checked)), H("click", Ae, () => mo("linkRow")), H("input", Je, (e) => so(e.target.value)), H("click", Qe, () => mo("baseline")), W(e, t);
				}, b = (e) => {
					var t = Tl(), n = L(t), r = (e) => {
						var t = Ns(), n = L(t), r = z(n);
						{
							let e = /* @__PURE__ */ P(() => V(Fi) ?? ""), t = /* @__PURE__ */ P(() => [["", Q("common.choose")], ...V(Ni).map((e) => [e, V(Pi)[e]?.name ?? e])]);
							$(r, {
								get value() {
									return V(e);
								},
								get options() {
									return V(t);
								},
								onchange: (e) => I(Fi, e || null, !0)
							});
						}
						M(t), B((e) => G(n, `${e ?? ""} `), [() => Q("blocks.samling")]), W(e, t);
					};
					K(n, (e) => {
						V(Ni).length && e(r);
					});
					var i = z(n, 2), a = (e) => {
						let t = /* @__PURE__ */ P(() => V(Pi)[V(Fi)]);
						var n = wl(), r = R(n), i = L(r), a = L(i, !0);
						M(i);
						var o = z(i, 2);
						J(o, () => c.cross, !0), M(o), M(r);
						var s = z(r, 2);
						Br(s, 19, () => V(t).entries, (e) => e.id, (e, n, r) => {
							var i = Cl(), a = L(i), o = L(a);
							M(a);
							var s = z(a, 2), l = L(s), u = L(l);
							Y(u);
							var d = z(u, 2), f = L(d);
							J(f, () => c.up, !0), M(f);
							var p = z(f, 2);
							J(p, () => c.down, !0), M(p);
							var m = z(p, 2);
							J(m, () => c.cross, !0), M(m), M(d), M(l);
							var h = z(l, 2), g = L(h), _ = z(g);
							Y(_), M(h);
							var v = z(h, 2);
							ot(v);
							var y = z(v, 2), b = L(y), x = z(b);
							Y(x), M(y);
							var S = z(y, 2), C = L(S), w = L(C), T = z(w);
							M(C);
							var E = z(C, 2), D = (e) => {
								var t = Sl(), r = R(t), i = z(r, 2);
								J(i, () => c.cross, !0), M(i), B((e) => {
									Z(r, "src", V(n).image), Z(i, "title", e);
								}, [() => Q("tip.removeImage")]), H("click", i, () => ma(V(Fi), V(n).id, "image", "")), W(e, t);
							};
							K(E, (e) => {
								V(n).image && e(D);
							}), M(S), M(s), M(i), B((e, i, a, s, c, l, d, h) => {
								G(o, `${e ?? ""}${V(n).date ? ` · ${V(n).date}` : ""}`), X(u, V(n).title), Z(u, "title", i), f.disabled = V(r) === 0, p.disabled = V(r) === V(t).entries.length - 1, Z(m, "title", a), G(g, `${s ?? ""} `), X(_, V(n).date ?? ""), Z(v, "placeholder", c), X(v, V(n).text ?? ""), G(b, `${l ?? ""} `), X(x, V(n).href ?? ""), Z(x, "placeholder", d), G(w, `${h ?? ""} `);
							}, [
								() => V(n).title.replace(/<[^>]*>/g, ""),
								() => Q("lbl.title"),
								() => Q("tip.collections.deleteEntry"),
								() => Q("lbl.date"),
								() => Q("ph.collections.text"),
								() => Q("lbl.link"),
								() => Q("ph.collections.href"),
								() => V(n).image ? Q("ui.changeImage") : Q("ui.addImage")
							]), H("change", u, (e) => ma(V(Fi), V(n).id, "title", e.target.value || "Uten tittel")), H("click", f, () => ha(V(Fi), V(r), -1)), H("click", p, () => ha(V(Fi), V(r), 1)), H("click", m, () => ga(V(Fi), V(n).id)), H("change", _, (e) => ma(V(Fi), V(n).id, "date", e.target.value)), H("change", v, (e) => ma(V(Fi), V(n).id, "text", e.target.value)), H("change", x, (e) => ma(V(Fi), V(n).id, "href", e.target.value)), H("change", T, (e) => _a(V(Fi), V(n).id, e)), W(e, i);
						});
						var l = z(s, 2), u = (e) => {
							var t = Is(), n = L(t, !0);
							M(t), B((e) => G(n, e), [() => Q("hint.collections.empty")]), W(e, t);
						};
						K(l, (e) => {
							V(t).entries.length || e(u);
						}), Me(2), B((e, t) => {
							G(a, e), Z(o, "title", t);
						}, [() => Q("ui.addEntry"), () => Q("tip.collections.deleteCollection")]), H("click", i, () => pa(V(Fi))), H("click", o, () => fa(V(Fi))), W(e, n);
					};
					K(i, (e) => {
						V(Fi) && V(Pi)[V(Fi)] && e(a);
					});
					var o = z(i, 2), s = L(o), l = z(s);
					Y(l), M(o);
					var u = z(o, 2), d = L(u);
					$(z(d), {
						get value() {
							return V(Li);
						},
						get options() {
							return Ri;
						},
						onchange: (e) => I(Li, e, !0)
					}), M(u);
					var f = z(u, 2), p = L(f, !0);
					M(f), M(t), B((e, t, n, r, i) => {
						G(s, `${e ?? ""} `), Z(l, "placeholder", t), G(d, `${n ?? ""} `), f.disabled = r, G(p, i);
					}, [
						() => Q("lbl.newCollectionName"),
						() => Q("ph.collections.name"),
						() => Q("common.type"),
						() => !V(Ii).trim(),
						() => Q("ui.createCollection")
					]), H("keydown", l, (e) => e.key === "Enter" && da()), ci(l, () => V(Ii), (e) => I(Ii, e)), H("click", f, da), W(e, t);
				}, x = (e) => {
					var t = Ml(), n = L(t), r = (e) => {
						var t = Is(), n = L(t, !0);
						M(t), B((e) => G(n, e), [() => Q("hint.plugins.empty")]), W(e, t);
					}, i = /* @__PURE__ */ P(() => !Ia().length);
					K(n, (e) => {
						V(i) && e(r);
					});
					var a = z(n, 2);
					Br(a, 16, Ia, (e) => e, (e, t) => {
						let n = /* @__PURE__ */ P(() => Ta[t]), r = /* @__PURE__ */ P(() => (V(wa)?.enabled ?? []).includes(t));
						var i = Ol();
						let a;
						var o = L(i), s = L(o), l = L(s, !0);
						M(s);
						var u = z(s, 2), d = (e) => {
							var t = El(), r = L(t);
							M(t), B(() => G(r, `v${V(n).version ?? ""}`)), W(e, t);
						};
						K(u, (e) => {
							V(n)?.version && e(d);
						});
						var f = z(u, 2), p = L(f), m = L(p);
						Y(m);
						var h = z(m);
						M(p);
						var g = z(p, 2);
						J(g, () => c.cross, !0), M(g), M(f), M(o);
						var _ = z(o, 2), v = (e) => {
							var t = Dl(), r = L(t, !0);
							M(t), B((e) => G(r, e), [() => V(n).errors.join("; ")]), W(e, t);
						}, y = (e) => {
							var t = Dl(), r = L(t, !0);
							M(t), B((e) => G(r, e), [() => Q("plugin.engineMismatch", {
								required: V(n).requiresEngine,
								current: V(Ea)
							})]), W(e, t);
						}, b = (e) => {
							var t = Dl(), r = L(t, !0);
							M(t), B((e) => G(r, e), [() => Q("plugin.cspNeeded", { list: Ga(V(n).csp).join(", ") })]), W(e, t);
						}, x = /* @__PURE__ */ P(() => V(n)?.csp && Ga(V(n).csp).length);
						K(_, (e) => {
							V(n)?.errors?.length ? e(v) : V(n) && !V(n).satisfied ? e(y, 1) : V(x) && e(b, 2);
						});
						var S = z(_, 2), C = (e) => {
							var t = Is(), r = L(t, !0);
							M(t), B((e) => G(r, e), [() => Q("plugin.languages", { list: V(n).languages.map((e) => e.name).join(", ") })]), W(e, t);
						};
						K(S, (e) => {
							V(n)?.languages?.length && e(C);
						}), M(i), B((e, t, o, s, c) => {
							a = Zr(i, 1, "plugin-row svelte-1n46o8q", null, a, { "plugin-broken": V(n)?.errors?.length }), G(l, e), Z(p, "title", t), ii(m, V(r)), m.disabled = o, G(h, ` ${s ?? ""}`), Z(g, "title", c);
						}, [
							() => V(n)?.names?.[Ei()] ?? V(n)?.name ?? t,
							() => V(r) ? Q("tip.plugins.on") : Q("tip.plugins.off"),
							() => !!V(n)?.errors?.length,
							() => V(r) ? Q("ui.on") : Q("ui.off"),
							() => Q("tip.plugins.remove")
						]), H("change", m, (e) => Xa(t, e.target.checked)), H("click", g, () => Qa(t)), W(e, i);
					});
					var o = z(a, 2), s = (e) => {
						var t = Al(), n = z(R(t), 2), r = L(n, !0);
						M(n), Br(z(n, 2), 16, () => V(Aa), (e) => e, (e, t) => {
							var n = kl(), r = L(n), i = L(r), a = L(i, !0);
							M(i);
							var o = z(i, 2), s = (e) => {
								var n = El(), r = L(n);
								M(n), B(() => G(r, `v${Ta[t].version ?? ""}`)), W(e, n);
							};
							K(o, (e) => {
								Ta[t]?.version && e(s);
							});
							var l = z(o, 2), u = L(l);
							J(u, () => c.right, !0), M(u), M(l), M(r), M(n), B((e, t) => {
								G(a, e), Z(u, "title", t);
							}, [() => Ta[t]?.names?.[Ei()] ?? Ta[t]?.name ?? t, () => Q("tip.plugins.addFound")]), H("click", u, () => eo(t)), W(e, n);
						}), B((e) => G(r, e), [() => Q("hint.plugins.found")]), W(e, t);
					};
					K(o, (e) => {
						V(Aa).length && e(s);
					});
					var l = z(o, 2), u = (e) => {
						var t = jr(), n = R(t), r = (e) => {
							var t = Is(), n = L(t, !0);
							M(t), B((e) => G(n, e), [() => Q("hint.plugins.autoDiscover")]), W(e, t);
						};
						K(n, (e) => {
							V(Aa).length || e(r);
						}), W(e, t);
					}, d = (e) => {
						var t = jl(), n = z(R(t), 2);
						Y(n);
						var r = z(n, 2), i = L(r, !0);
						M(r);
						var a = z(r, 2), o = (e) => {
							var t = Dl(), n = L(t, !0);
							M(t), B(() => G(n, V(ka))), W(e, t);
						};
						K(a, (e) => {
							V(ka) && e(o);
						}), B((e, t, a) => {
							Z(n, "placeholder", e), r.disabled = t, G(i, a);
						}, [
							() => Q("ph.plugins.folder"),
							() => !V(Da).trim(),
							() => Q("ui.addPlugin")
						]), H("keydown", n, (e) => e.key === "Enter" && $a()), ci(n, () => V(Da), (e) => I(Da, e)), H("click", r, $a), W(e, t);
					};
					K(l, (e) => {
						V(Pa) === "ok" ? e(u) : e(d, -1);
					}), M(t), W(e, t);
				}, S = (e) => {
					var t = fl(), n = L(t), r = (e) => {
						var t = Is(), n = L(t, !0);
						M(t), B((e) => G(n, e), [() => Q("hint.history.loading")]), W(e, t);
					}, i = (e) => {
						var t = Ec(), n = R(t), r = (e) => {
							var t = Is(), n = L(t, !0);
							M(t), B(() => G(n, V(lr))), W(e, t);
						};
						K(n, (e) => {
							V(lr) && e(r);
						});
						var i = z(n, 2), a = (e) => {
							var t = Pl(), n = R(t), r = L(n, !0);
							M(n), Br(z(n, 2), 19, () => V(cr), (e) => e.sha, (e, t, n) => {
								var r = Nl();
								let i;
								var a = L(r), o = L(a, !0);
								M(a);
								var s = z(a, 2), c = L(s);
								M(s), M(r), B((e) => {
									i = Zr(r, 1, "history-row svelte-1n46o8q", null, i, { head: V(n) === 0 }), Z(a, "title", V(t).sha), G(o, V(t).message), G(c, `${V(t).author ?? ""}${e ?? ""}`);
								}, [() => V(t).date ? ` · ${fr.format(new Date(V(t).date))}` : ""]), W(e, r);
							}), B((e, t) => {
								n.disabled = V(ur) || !V(T)?.allowed, Z(n, "title", e), G(r, t);
							}, [() => V(T)?.allowed ? Q("tip.history.revert") : Q("tip.history.needsAccess"), () => Q("ui.revertLast")]), H("click", n, mr), W(e, t);
						};
						K(i, (e) => {
							V(cr).length > 0 && e(a);
						}), W(e, t);
					};
					K(n, (e) => {
						V(cr) === null ? e(r) : e(i, -1);
					}), M(t), W(e, t);
				}, C = (e) => {
					var t = fl(), n = L(t), r = (e) => {
						var t = Is(), n = L(t, !0);
						M(t), B((e) => G(n, e), [() => Q("update.checking")]), W(e, t);
					}, i = (e) => {
						var t = Fl(), n = R(t), r = L(n, !0);
						M(n);
						var i = z(n, 2), a = L(i, !0);
						M(i), B((e) => {
							G(r, V(_r)), G(a, e);
						}, [() => Q("update.retry")]), H("click", i, xr), W(e, t);
					}, a = (e) => {
						var t = Kl(), n = R(t), r = L(n), i = L(r, !0);
						M(r);
						var a = z(r, 2), o = (e) => {
							var t = Il(), n = R(t);
							J(n, () => c.right, !0), M(n);
							var r = z(n, 2), i = L(r, !0);
							M(r), B(() => G(i, V(gr).target)), W(e, t);
						};
						K(a, (e) => {
							V(gr).upToDate || e(o);
						}), M(n);
						var s = z(n, 2), l = (e) => {
							var t = Is(), n = L(t, !0);
							M(t), B((e) => G(n, e), [() => Q("update.upToDate")]), W(e, t);
						}, u = (e) => {
							var t = Gl(), n = R(t), r = L(n, !0);
							M(n);
							var i = z(n, 2), a = (e) => {
								var t = Ll(), n = L(t), r = L(n, !0);
								M(n);
								var i = z(n, 2), a = L(i), o = L(a, !0);
								M(a), M(i), M(t), B((e) => {
									G(r, e), G(o, V(gr).notes);
								}, [() => Q("update.aboutVersion", { target: V(gr).target })]), W(e, t);
							};
							K(i, (e) => {
								V(gr).notes && e(a);
							});
							var o = z(i, 2), s = (e) => {
								var t = Rl(), n = L(t), r = L(n);
								J(r, () => c.warn, !0), M(r);
								var i = z(r);
								M(n);
								var a = z(n, 2), o = L(a), s = L(o, !0);
								M(o), M(a), M(t), B((e, t) => {
									Z(n, "title", e), G(i, ` ${t ?? ""}`), G(s, V(gr).headers.upstream);
								}, [() => Q("update.headersManual"), () => Q("update.headersTitle")]), W(e, t);
							};
							K(o, (e) => {
								V(gr).headers?.upstream && e(s);
							});
							var l = z(o, 2);
							Br(l, 17, () => V(gr).changes.filter((e) => e.atom && e.conflict), (e) => e.path, (e, t) => {
								var n = Bl(), r = L(n), i = L(r, !0);
								M(r);
								var a = z(r, 2), o = L(a), s = (e) => {
									var t = zl(), n = L(t, !0);
									M(t), B((e) => G(n, e), [() => Q("update.actionDelete")]), W(e, t);
								};
								K(o, (e) => {
									V(t).action === "delete" && e(s);
								});
								var l = z(o, 2);
								J(l, () => c.warn, !0), M(l), M(a), M(n), B((e) => {
									Z(r, "title", V(t).path), G(i, V(t).path), Z(l, "title", e);
								}, [() => Q(`update.conflict.${V(t).conflict}`)]), W(e, n);
							});
							var u = z(l, 2), d = L(u), f = L(d);
							M(d);
							var p = z(d, 2);
							Br(p, 21, () => V(gr).changes.filter((e) => e.atom && !e.conflict), (e) => e.path, (e, t) => {
								var n = Vl(), r = L(n), i = L(r, !0);
								M(r);
								var a = z(r, 2), o = (e) => {
									var t = zl(), n = L(t, !0);
									M(t), B((e) => G(n, e), [() => Q("update.actionDelete")]), W(e, t);
								};
								K(a, (e) => {
									V(t).action === "delete" && e(o);
								}), M(n), B(() => {
									Z(r, "title", V(t).path), G(i, V(t).path);
								}), W(e, n);
							}), M(p), M(u);
							var m = z(u, 2), h = (e) => {
								var t = Wl(), n = R(t), r = L(n), i = L(r, !0);
								M(r);
								var a = z(r, 2), o = L(a, !0);
								M(a), M(n), Br(z(n, 2), 17, () => V(gr).changes.filter((e) => !e.atom), (e) => e.path, (e, t) => {
									var n = Ul(), r = L(n);
									let i;
									var a = L(r, !0);
									M(r);
									var o = z(r, 2), s = L(o), l = (e) => {
										var t = zl(), n = L(t, !0);
										M(t), B((e) => G(n, e), [() => Q("update.actionDelete")]), W(e, t);
									};
									K(s, (e) => {
										V(t).action === "delete" && e(l);
									});
									var u = z(s, 2), d = (e) => {
										var n = Hl();
										J(n, () => c.warn, !0), M(n), B((e) => Z(n, "title", e), [() => Q(`update.conflict.${V(t).conflict}`)]), W(e, n);
									};
									K(u, (e) => {
										V(t).conflict && e(d);
									});
									var f = z(u, 2);
									Y(f), M(o), M(n), B((e, n, o, s) => {
										i = Zr(r, 1, "update-path svelte-1n46o8q", null, i, e), Z(r, "title", V(t).path), G(a, V(t).path), ii(f, n), Z(f, "title", o), Z(f, "aria-label", s);
									}, [
										() => ({ skipped: V(yr).has(V(t).path) }),
										() => V(yr).has(V(t).path),
										() => Q("update.keepMine.title"),
										() => Q("update.keepMine")
									]), H("change", f, () => Cr(V(t).path)), W(e, n);
								}), B((e, t) => {
									G(i, e), G(o, t);
								}, [() => Q("update.optionalTitle"), () => Q("update.keepMine")]), W(e, t);
							}, g = /* @__PURE__ */ P(() => V(gr).changes.some((e) => !e.atom));
							K(m, (e) => {
								V(g) && e(h);
							});
							var _ = z(m, 2), v = L(_, !0);
							M(_), B((e, t, n, i, a, o) => {
								G(r, e), Z(d, "title", t), G(f, `${n ?? ""} · ${i ?? ""}`), _.disabled = V(vr) || !V(T)?.allowed, Z(_, "title", a), G(v, o);
							}, [
								() => Q("update.summary", {
									writes: V(gr).changes.filter((e) => e.action === "write").length,
									deletes: V(gr).changes.filter((e) => e.action === "delete").length
								}),
								() => Q("update.atomGroup.title"),
								() => Q("update.atomTitle"),
								() => V(gr).changes.filter((e) => e.atom).length,
								() => V(T)?.allowed ? Q("update.run.title") : Q("tip.history.needsAccess"),
								() => Q("update.run", { target: V(gr).target })
							]), H("click", _, wr), W(e, t);
						};
						K(s, (e) => {
							V(gr).upToDate ? e(l) : e(u, -1);
						}), B((e) => G(i, e), [() => Q("update.current", { version: V(gr).current })]), W(e, t);
					};
					K(n, (e) => {
						V(vr) && !V(gr) ? e(r) : V(_r) ? e(i, 1) : V(gr) && e(a, 2);
					}), M(t), W(e, t);
				};
				K(s, (e) => {
					V(Xe) === "pages" ? e(l) : V(Xe) === "nav" ? e(u, 1) : V(Xe) === "site" ? e(f, 2) : V(Xe) === "theme" ? e(p, 3) : V(Xe) === "blocks" ? e(h, 4) : V(Xe) === "grid" ? e(_, 5) : V(Xe) === "properties" ? e(v, 6) : V(Xe) === "footer" ? e(y, 7) : V(Xe) === "collections" ? e(b, 8) : V(Xe) === "plugins" ? e(x, 9) : V(Xe) === "history" ? e(S, 10) : V(Xe) === "update" && e(C, 11);
				}), M(t), B((e) => {
					Z(i, "title", e), G(o, Qe[V(Xe)]);
				}, [() => $e[V(Xe)]?.map((e) => Q(e)).join("\n")]), W(e, t);
			};
			K(v, (e) => {
				V(Xe) && e(y);
			}), B((e) => {
				p = Zr(f, 1, "rail-gear svelte-1n46o8q", null, p, { active: V(Mr) }), Z(f, "title", e);
			}, [() => Q("settings.title")]), H("click", f, () => I(Mr, !V(Mr))), W(e, t);
		};
		K(i, (e) => {
			V(D) && e(o);
		});
		var s = z(i, 2);
		let f;
		var p = L(s), h = L(p);
		fi(h, (e) => I(w, e), () => V(w)), M(p), M(s), fi(s, (e) => I(te, e), () => V(te)), M(t), B((e) => {
			f = Zr(s, 1, "frame-wrap svelte-1n46o8q", null, f, { mobile: V(ee) === "mobile" }), $r(p, `width:${V(de) ?? ""}px; height:${V(fe) ?? ""}px`), Z(h, "title", e), Z(h, "src", `/?page=${V(g)}&preview=1`), $r(h, `width:${V(se) ?? ""}px; height:${V(ue) ?? ""}px; transform:scale(${V(ce) ?? ""}); transform-origin:top left`);
		}, [() => Q("ui.previewTitle")]), Sr("load", h, kr), br(h), W(e, t);
	}, Td = (e) => {
		var t = Xl(), n = L(t, !0);
		M(t), B((e) => G(n, e), [() => Q("ui.loading")]), W(e, t);
	};
	K(Cd, (e) => {
		V(h) ? e(wd) : e(Td, -1);
	});
	var Ed = z(Cd, 2), Dd = (e) => {
		Oa(e, {
			get image() {
				return V(ri);
			},
			onapply: oi,
			oncancel: () => I(ri, null)
		});
	};
	K(Ed, (e) => {
		V(ri) && e(Dd);
	});
	var Od = z(Ed, 2), kd = (e) => {
		var t = Ql(), n = L(t), r = L(n), i = L(r, !0);
		M(r);
		var a = z(r, 2);
		Br(a, 16, () => V(Le).lines, (e) => e, (e, t) => {
			var n = Zl(), r = L(n, !0);
			M(n), B(() => G(r, t)), W(e, n);
		});
		var o = z(a, 2), s = (e) => {
			var t = zs();
			Y(t), at(t, !0), B(() => Z(t, "placeholder", V(Le).placeholder)), H("keydown", t, (e) => e.key === "Enter" && V(Le).value.trim() && Ve(!0)), ci(t, () => V(Le).value, (e) => V(Le).value = e), W(e, t);
		};
		K(o, (e) => {
			V(Le).prompt && e(s);
		});
		var c = z(o, 2), l = L(c), u = L(l, !0);
		M(l);
		var d = z(l, 2), f = L(d, !0);
		M(d), M(c), M(n), M(t), B(() => {
			G(i, V(Le).title), G(u, V(Le).cancelLabel), G(f, V(Le).okLabel);
		}), H("click", l, () => Ve(!1)), H("click", d, () => Ve(!0)), W(e, t);
	};
	K(Od, (e) => {
		V(Le) && e(kd);
	});
	var Ad = z(Od, 2), jd = (e) => {
		var t = $l(), n = L(t), r = L(n), i = L(r, !0);
		M(r);
		var a = z(r, 2), o = L(a, !0);
		M(a);
		var s = z(a, 2), c = L(s), l = z(c);
		Y(l), M(s);
		var u = z(s, 2), d = L(u), f = z(d);
		{
			let e = /* @__PURE__ */ P(() => Q("setup.accentPick"));
			Hi(f, {
				get value() {
					return V(Ke);
				},
				get label() {
					return V(e);
				},
				onchange: (e) => I(Ke, e, !0)
			});
		}
		M(u);
		var p = z(u, 2), m = L(p), h = z(m);
		{
			let e = /* @__PURE__ */ P(() => Q("setup.bgLabel"));
			Hi(h, {
				get value() {
					return V(qe);
				},
				get label() {
					return V(e);
				},
				onchange: (e) => I(qe, e, !0)
			});
		}
		M(p);
		var g = z(p, 2), _ = L(g, !0);
		M(g);
		var v = z(g, 2), y = L(v), b = L(y, !0);
		M(y);
		var x = z(y, 2), S = L(x, !0);
		M(x), M(v), M(n), M(t), B((e, t, n, r, a, s, u, f, p, h) => {
			G(i, e), G(o, t), G(c, `${n ?? ""} `), Z(l, "placeholder", r), G(d, `${a ?? ""} `), G(m, `${s ?? ""} `), G(_, u), G(b, f), x.disabled = p, G(S, h);
		}, [
			() => Q("setup.title"),
			() => Q("setup.intro"),
			() => Q("setup.nameLabel"),
			() => Q("ph.setup.name"),
			() => Q("setup.accentLabel"),
			() => Q("setup.bgLabel"),
			() => Q("setup.outro"),
			() => Q("setup.skip"),
			() => !V(Ge).trim(),
			() => Q("setup.start")
		]), H("keydown", l, (e) => e.key === "Enter" && Ye()), ci(l, () => V(Ge), (e) => I(Ge, e)), H("click", y, Je), H("click", x, Ye), W(e, t);
	};
	K(Ad, (e) => {
		V(He) && e(jd);
	});
	var Md = z(Ad, 2), Nd = (e) => {
		var t = eu();
		let n;
		var r = L(t), i = L(r, !0);
		M(r);
		var a = z(r, 2);
		M(t), B((e) => {
			n = Zr(t, 1, "toast svelte-1n46o8q", null, n, {
				ok: V(y) === "ok",
				error: V(y) === "error"
			}), G(i, V(v)), Z(a, "title", e);
		}, [() => Q("ui.close")]), H("click", a, () => x("")), W(e, t);
	};
	K(Md, (e) => {
		V(v) && e(Nd);
	}), M(cd);
	var Pd = z(cd, 2), Fd = (e) => {
		var t = tu(), n = L(t), r = L(n), i = L(r, !0);
		M(r);
		var o = z(r, 2);
		J(o, () => c.cross, !0), M(o), M(n);
		var s = z(n, 2), l = L(s);
		a(l), M(s), M(t), B((e, n) => {
			$r(t, `left: ${V(pt).left ?? ""}px; top: ${V(pt).top ?? ""}px`), G(i, e), Z(o, "title", n);
		}, [() => Q("blocks.suffix", { label: Nt[V(N).type] ?? V(N).type }), () => Q("tip.closeEsc")]), H("click", o, () => I(pt, null)), W(e, t);
	};
	K(Pd, (e) => {
		V(pt) && V(N) && e(Fd);
	}), B(() => fd = Zr(dd, 1, "topbar svelte-1n46o8q", null, fd, { hidden: !V(D) })), W(e, sd), We();
}
//#endregion
//#region src/main.js
Cr([
	"click",
	"input",
	"pointerdown",
	"change",
	"keydown"
]), document.documentElement.lang = await ki();
var iu = Mr(ru, { target: document.getElementById("urd-admin") });
//#endregion
export { iu as default };
