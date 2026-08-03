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
function O(e) {
	throw Error("https://svelte.dev/e/effect_in_teardown");
}
function me() {
	throw Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function k(e) {
	throw Error("https://svelte.dev/e/effect_orphan");
}
function A() {
	throw Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function he(e) {
	throw Error("https://svelte.dev/e/props_invalid_value");
}
function ge() {
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
var be = {}, xe = Symbol("uninitialized"), Se = "http://www.w3.org/1999/xhtml", Ce = "http://www.w3.org/2000/svg", we = "http://www.w3.org/1998/Math/MathML";
function Te() {
	console.warn("https://svelte.dev/e/derived_inert");
}
function Ee(e) {
	console.warn("https://svelte.dev/e/hydration_mismatch");
}
function De() {
	console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/hydration.js
var j = !1;
function Oe(e) {
	j = e;
}
var ke;
function Ae(e) {
	if (e === null) throw Ee(), be;
	return ke = e;
}
function je() {
	return Ae(/* @__PURE__ */ dn(ke));
}
function M(e) {
	if (j) {
		if (/* @__PURE__ */ dn(ke) !== null) throw Ee(), be;
		ke = e;
	}
}
function Me(e = 1) {
	if (j) {
		for (var t = e, n = ke; t--;) n = /* @__PURE__ */ dn(n);
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
		var i = /* @__PURE__ */ dn(n);
		e && n.remove(), n = i;
	}
}
function Pe(e) {
	if (!e || e.nodeType !== 8) throw Ee(), be;
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
		r: qn,
		l: null
	};
}
function We(e) {
	var t = Ve, n = t.e;
	if (n !== null) {
		t.e = null;
		for (var r of n) Sn(r);
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
	var t = qn;
	if (t === null) return Wn.f |= te, e;
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
var N = ~(g | _ | h);
function Qe(e, t) {
	e.f = e.f & N | t;
}
function $e(e) {
	e.f & 512 || e.deps === null ? Qe(e, h) : Qe(e, _);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/utils.js
function et(e) {
	if (e !== null) for (let t of e) !(t.f & 2) || !(t.f & 65536) || (t.f ^= E, et(t.deps));
}
function tt(e, t, n) {
	e.f & 2048 ? t.add(e) : e.f & 4096 && n.add(e), et(e.deps), Qe(e, h);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/store.js
var nt = !1;
function rt(e) {
	var t = nt;
	try {
		return nt = !1, [e(), nt];
	} finally {
		nt = t;
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/misc.js
function it(e) {
	j && /* @__PURE__ */ un(e) !== null && fn(e);
}
var at = !1;
function ot() {
	at || (at = !0, document.addEventListener("reset", (e) => {
		Promise.resolve().then(() => {
			if (!e.defaultPrevented) for (let t of e.target.elements) t[le]?.();
		});
	}, { capture: !0 }));
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
function st(e) {
	var t = Wn, n = qn;
	Kn(null), Jn(null);
	try {
		return e();
	} finally {
		Kn(t), Jn(n);
	}
}
function ct(e, t, n, r = n) {
	e.addEventListener(t, () => st(n));
	let i = e[le];
	i ? e[le] = () => {
		i(), r(!0);
	} : e[le] = () => r(!0), ot();
}
//#endregion
//#region node_modules/svelte/src/reactivity/create-subscriber.js
function lt(e) {
	let t = 0, n = Xt(0), r;
	return () => {
		yn() && (H(n), En(() => (t === 0 && (r = mr(() => e(() => en(n)))), t += 1, () => {
			Je(() => {
				--t, t === 0 && (r?.(), r = void 0, en(n));
			});
		})));
	};
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/boundary.js
var ut = S | C;
function dt(e, t, n, r) {
	new ft(e, t, n, r);
}
var ft = class {
	parent;
	is_pending = !1;
	transform_error;
	#e;
	#t = j ? ke : null;
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
	#h = lt(() => (this.#m = Xt(this.#l), () => {
		this.#m = null;
	}));
	constructor(e, t, n, r) {
		this.#e = e, this.#n = t, this.#r = (e) => {
			var t = qn;
			t.b = this, t.f |= 128, n(e);
		}, this.parent = qn.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = Dn(() => {
			if (j) {
				let e = this.#t;
				je();
				let t = e.data === "[!";
				if (e.data.startsWith("[?")) {
					let t = JSON.parse(e.data.slice(2));
					this.#_(t);
				} else t ? this.#y() : this.#g();
			} else this.#b();
		}, ut), j && (this.#e = ke);
	}
	#g() {
		try {
			this.#a = On(() => this.#r(this.#e));
		} catch (e) {
			this.error(e);
		}
	}
	#_(e) {
		let t = this.#n.failed, { reset: n, invoke_onerror: r } = this.#v(e);
		Je(r), t && (this.#s = On(() => {
			t(this.#e, () => e, () => n);
		}));
	}
	#v(e) {
		var t = !1, n = !1;
		let r = () => {
			if (t) {
				De();
				return;
			}
			t = !0, n && ye(), this.#s !== null && Fn(this.#s, () => {
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
		e && (this.is_pending = !0, this.#o = On(() => e(this.#e)), Je(() => {
			var e = this.#c = document.createDocumentFragment(), t = ln();
			e.append(t), this.#a = this.#S(() => On(() => this.#r(t))), this.#u === 0 && (this.#e.before(e), this.#c = null, Fn(this.#o, () => {
				this.#o = null;
			}), this.#x(Dt));
		}));
	}
	#b() {
		try {
			if (this.is_pending = this.has_pending_snippet(), this.#u = 0, this.#l = 0, this.#a = On(() => {
				this.#r(this.#e);
			}), this.#u > 0) {
				var e = this.#c = document.createDocumentFragment();
				zn(this.#a, e);
				let t = this.#n.pending;
				this.#o = On(() => t(this.#e));
			} else this.#x(Dt);
		} catch (e) {
			this.error(e);
		}
	}
	#x(e) {
		this.is_pending = !1, e.transfer_effects(this.#f, this.#p);
	}
	defer_effect(e) {
		tt(e, this.#f, this.#p);
	}
	is_rendered() {
		return !this.is_pending && (!this.parent || this.parent.is_rendered());
	}
	has_pending_snippet() {
		return !!this.#n.pending;
	}
	#S(e) {
		var t = qn, n = Wn, r = Ve;
		Jn(this.#i), Kn(this.#i), He(this.#i.ctx);
		try {
			return Lt.ensure(), e();
		} catch (e) {
			return Xe(e), null;
		} finally {
			Jn(t), Kn(n), He(r);
		}
	}
	#C(e, t) {
		if (!this.has_pending_snippet()) {
			this.parent && this.parent.#C(e, t);
			return;
		}
		this.#u += e, this.#u === 0 && (this.#x(t), this.#o && Fn(this.#o, () => {
			this.#o = null;
		}), this.#c &&= (this.#e.before(this.#c), null));
	}
	update_pending_count(e, t) {
		this.#C(e, t), this.#l += e, !(!this.#m || this.#d) && (this.#d = !0, Je(() => {
			this.#d = !1, this.#m && Qt(this.#m, this.#l);
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
		this.#a &&= (Mn(this.#a), null), this.#o &&= (Mn(this.#o), null), this.#s &&= (Mn(this.#s), null), j && (Ae(this.#t), Me(), Ae(Ne()));
		let t = this.#n.failed, n = (e) => {
			let { reset: n, invoke_onerror: r } = this.#v(e);
			r(), t && (this.#s = this.#S(() => {
				try {
					return On(() => {
						var r = qn;
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
function pt(e, t, n, r) {
	let i = Ge() ? _t : bt;
	var a = e.filter((e) => !e.settled), o = t.map(i);
	if (n.length === 0 && a.length === 0) {
		r(o);
		return;
	}
	var s = qn, c = mt(), l = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((e) => e.promise)) : null;
	function u(e) {
		if (!(s.f & 16384)) {
			c();
			try {
				r([...o, ...e]);
			} catch (e) {
				Ze(e, s);
			}
			ht();
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
		c(), f(), ht();
	}) : f();
}
function mt() {
	var e = qn, t = Wn, n = Ve, r = Dt;
	return function(i = !0) {
		Jn(e), Kn(t), He(n), i && !(e.f & 16384) && (r?.activate(), r?.apply());
	};
}
function ht(e = !0) {
	Jn(null), Kn(null), He(null), e && Dt?.deactivate();
}
function gt() {
	var e = qn, t = e.b, n = Dt, r = !!t?.is_rendered();
	return t?.update_pending_count(1, n), n.increment(r, e), () => {
		t?.update_pending_count(-1, n), n.decrement(r, e);
	};
}
/*#__NO_SIDE_EFFECTS__*/
function _t(e) {
	var t = 2 | g;
	return qn !== null && (qn.f |= C), {
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
		parent: qn,
		ac: null
	};
}
var vt = Symbol("obsolete");
/*#__NO_SIDE_EFFECTS__*/
function yt(e, t, n) {
	let r = qn;
	r === null && fe();
	var i = void 0, a = Xt(xe), o = !Wn, s = /* @__PURE__ */ new Set();
	return Tn(() => {
		var t = qn, n = p();
		i = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, (e) => {
				e !== ue && n.reject(e);
			}).finally(ht);
		} catch (e) {
			n.reject(e), ht();
		}
		var c = Dt;
		if (o) {
			if (t.f & 32768) var l = gt();
			if (r.b?.is_rendered()) c.async_deriveds.get(t)?.reject(vt);
			else for (let e of s.values()) e.reject(vt);
			s.add(n), c.async_deriveds.set(t, n);
		}
		let u = (e, t = void 0) => {
			l?.(), s.delete(n), t !== vt && (c.activate(), t ? (a.f |= te, Qt(a, t)) : (a.f & 8388608 && (a.f ^= te), Qt(a, e)), c.deactivate());
		};
		n.promise.then(u, (e) => u(null, e || "unknown"));
	}), bn(() => {
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
function P(e) {
	let t = /* @__PURE__ */ _t(e);
	return Xn(t), t;
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
		for (var n = 0; n < t.length; n += 1) Mn(t[n]);
	}
}
function St(e) {
	var t, n = qn, r = e.parent;
	if (!Hn && r !== null && e.v !== xe && r.f & 24576) return Te(), e.v;
	Jn(r);
	try {
		e.f &= ~E, xt(e), t = sr(e);
	} finally {
		Jn(n);
	}
	return t;
}
function Ct(e) {
	var t = St(e);
	if (!e.equals(t) && (e.wv = ar(), (!Dt?.is_fork || e.deps === null) && (Dt === null ? e.v = t : (Dt.capture(e, t, !0), Ot?.capture(e, t, !0)), e.deps === null))) {
		Qe(e, h);
		return;
	}
	Hn || (kt === null ? $e(e) : (yn() || Dt?.is_fork) && kt.set(e, t));
}
function wt(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac !== null && st(() => {
		t.ac.abort(ue), t.ac = null;
	}), t.fn !== null && (t.teardown = d), lr(t, 0), An(t));
}
function Tt(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && ur(t);
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
			for (var r of n.d) Qe(r, g), t(r);
			for (r of n.m) Qe(r, _), t(r);
		}
		this.#p.add(e);
	}
	#g() {
		this.#e = !0, Ft++ > 1e3 && (this.#x(), zt());
		for (let e of this.#u) this.#d.delete(e), Qe(e, g), this.schedule(e);
		for (let e of this.#d) Qe(e, _), this.schedule(e);
		let t = this.#c;
		this.#c = [], this.apply();
		var n = Nt = [], r = [], i = Pt = [];
		for (let e of t) try {
			this.#_(e, n, r);
		} catch (t) {
			throw Kt(e), this.#h() || this.discard(), t;
		}
		if (Dt = null, i.length > 0) {
			var a = e.ensure();
			for (let e of i) a.schedule(e);
		}
		if (Nt = null, Pt = null, this.#h()) {
			this.#b(r), this.#b(n);
			for (let [e, t] of this.#f) Gt(e, t);
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
			var i = r.f, a = (i & 96) != 0;
			if (!(a && i & 1024 || i & 8192 || this.#f.has(r)) && r.fn !== null) {
				a ? r.f ^= h : i & 4 ? t.push(r) : V(r) && (i & 16 && this.#d.add(r), ur(r));
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
					r & 4194320 && !this.async_deriveds.has(i) && (this.#d.delete(i), Qe(i, g), this.schedule(i));
				}
			}
		};
		for (let e of this.current.keys()) t(e);
		this.oncommit(() => e.discard()), e.#x(), Dt = this, this.#g();
	}
	#b(e) {
		for (var t = 0; t < e.length; t += 1) tt(e[t], this.#u, this.#d);
	}
	capture(e, t, n = !1) {
		e.v !== xe && !this.previous.has(e) && this.previous.set(e, e.v), e.f & 8388608 || (this.current.set(e, [t, n]), kt?.set(e, t)), this.is_fork || (e.v = t);
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
			Ft = 0, At = null, Nt = null, Pt = null, Mt = !1, Dt = null, kt = null, Jt.clear();
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
			if (Nt !== null && t === qn && (Wn === null || !(Wn.f & 2))) return;
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
		A();
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
			if (!(r.f & 24576) && V(r) && (Bt = /* @__PURE__ */ new Set(), ur(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && Pn(r), Bt?.size > 0)) {
				Jt.clear();
				for (let e of Bt) {
					if (e.f & 24576) continue;
					let t = [e], n = e.parent;
					for (; n !== null;) Bt.has(n) && (Bt.delete(n), t.push(n)), n = n.parent;
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || ur(n);
					}
				}
				Bt.clear();
			}
		}
		Bt = null;
	}
}
function Ht(e, t, n, r) {
	if (!n.has(e) && (n.add(e), e.reactions !== null)) for (let i of e.reactions) {
		let e = i.f;
		e & 2 ? Ht(i, t, n, r) : e & 4194320 && !(e & 2048) && Ut(i, t, r) && (Qe(i, g), Wt(i));
	}
}
function Ut(e, t, r) {
	let i = r.get(e);
	if (i !== void 0) return i;
	if (e.deps !== null) for (let i of e.deps) {
		if (n.call(t, i)) return !0;
		if (i.f & 2 && Ut(i, t, r)) return r.set(i, !0), !0;
	}
	return r.set(e, !1), !1;
}
function Wt(e) {
	Dt.schedule(e);
}
function Gt(e, t) {
	if (!(e.f & 32 && e.f & 1024)) {
		e.f & 2048 ? t.d.push(e) : e.f & 4096 && t.m.push(e), Qe(e, h);
		for (var n = e.first; n !== null;) Gt(n, t), n = n.next;
	}
}
function Kt(e) {
	Qe(e, h);
	for (var t = e.first; t !== null;) Kt(t), t = t.next;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/sources.js
var qt = /* @__PURE__ */ new Set(), Jt = /* @__PURE__ */ new Map(), Yt = !1;
function Xt(e, t) {
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
	let n = Xt(e, t);
	return Xn(n), n;
}
/*#__NO_SIDE_EFFECTS__*/
function Zt(e, t = !1, n = !0) {
	let r = Xt(e);
	return t || (r.equals = Le), r;
}
function I(e, t, n = !1) {
	return Wn !== null && (!Gn || Wn.f & 131072) && Ge() && Wn.f & 4325394 && (Yn === null || !Yn.has(e)) && ve(), Qt(e, n ? nn(t) : t, Pt);
}
function Qt(e, t, n = null) {
	if (!e.equals(t)) {
		Jt.set(e, Hn ? t : e.v);
		var r = Lt.ensure();
		if (r.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && St(t), kt === null && $e(t);
		}
		e.wv = ar(), tn(e, g, n), Ge() && qn !== null && qn.f & 1024 && !(qn.f & 96) && ($n === null ? er([e]) : $n.push(e)), !r.is_fork && qt.size > 0 && !Yt && $t();
	}
	return t;
}
function $t() {
	Yt = !1;
	for (let e of qt) {
		e.f & 1024 && Qe(e, _);
		let t;
		try {
			t = V(e);
		} catch {
			t = !0;
		}
		t && ur(e);
	}
	qt.clear();
}
function en(e) {
	I(e, e.v + 1);
}
function tn(e, t, n) {
	var r = e.reactions;
	if (r !== null) for (var i = Ge(), a = r.length, o = 0; o < a; o++) {
		var s = r[o], c = s.f;
		if (!(!i && s === qn)) {
			var l = (c & g) === 0;
			if (l && Qe(s, t), c & 131072) qt.add(s);
			else if (c & 2) {
				var u = s;
				kt?.delete(u), c & 65536 || (c & 512 && (qn === null || !(qn.f & 2097152)) && (s.f |= E), tn(u, _, n));
			} else if (l) {
				var d = s;
				c & 16 && Bt !== null && Bt.add(d), n === null ? Wt(d) : n.push(d);
			}
		}
	}
}
function nn(t) {
	if (typeof t != "object" || !t || ne in t) return t;
	let n = l(t);
	if (n !== s && n !== c) return t;
	var r = /* @__PURE__ */ new Map(), i = e(t), o = /* @__PURE__ */ F(0), u = null, d = rr, f = (e) => {
		if (rr === d) return e();
		var t = Wn, n = rr;
		Kn(null), ir(d);
		var r = e();
		return Kn(t), ir(n), r;
	};
	return i && r.set("length", /* @__PURE__ */ F(t.length, u)), new Proxy(t, {
		defineProperty(e, t, n) {
			(!("value" in n) || n.configurable === !1 || n.enumerable === !1 || n.writable === !1) && ge();
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
					r.set(t, e), en(o);
				}
			} else I(n, xe), en(o);
			return !0;
		},
		get(e, n, i) {
			if (n === ne) return t;
			var o = r.get(n), s = n in e;
			if (o === void 0 && (!s || a(e, n)?.writable) && (o = f(() => /* @__PURE__ */ F(nn(s ? e[n] : xe), u)), r.set(n, o)), o !== void 0) {
				var c = H(o);
				return c === xe ? void 0 : c;
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
			return (n !== void 0 || qn !== null && (!i || a(e, t)?.writable)) && (n === void 0 && (n = f(() => /* @__PURE__ */ F(i ? nn(e[t]) : xe, u)), r.set(t, n)), H(n) === xe) ? !1 : i;
		},
		set(e, t, n, s) {
			var c = r.get(t), l = t in e;
			if (i && t === "length") for (var d = n; d < c.v; d += 1) {
				var p = r.get(d + "");
				p === void 0 ? d in e && (p = f(() => /* @__PURE__ */ F(xe, u)), r.set(d + "", p)) : I(p, xe);
			}
			if (c === void 0) (!l || a(e, t)?.writable) && (c = f(() => /* @__PURE__ */ F(void 0, u)), I(c, nn(n)), r.set(t, c));
			else {
				l = c.v !== xe;
				var m = f(() => nn(n));
				I(c, m);
			}
			var h = Reflect.getOwnPropertyDescriptor(e, t);
			if (h?.set && h.set.call(s, n), !l) {
				if (i && typeof t == "string") {
					var g = r.get("length"), _ = Number(t);
					Number.isInteger(_) && _ >= g.v && I(g, _ + 1);
				}
				en(o);
			}
			return !0;
		},
		ownKeys(e) {
			H(o);
			var t = Reflect.ownKeys(e).filter((e) => {
				var t = r.get(e);
				return t === void 0 || t.v !== xe;
			});
			for (var [n, i] of r) i.v !== xe && !(n in e) && t.push(n);
			return t;
		},
		setPrototypeOf() {
			_e();
		}
	});
}
var rn, an, on, sn;
function cn() {
	if (rn === void 0) {
		rn = window, an = /Firefox/.test(navigator.userAgent);
		var e = Element.prototype, t = Node.prototype, n = Text.prototype;
		on = a(t, "firstChild").get, sn = a(t, "nextSibling").get, u(e) && (e[oe] = void 0, e[ae] = null, e[se] = void 0, e.__e = void 0), u(n) && (n[ce] = void 0);
	}
}
function ln(e = "") {
	return document.createTextNode(e);
}
/*@__NO_SIDE_EFFECTS__*/
function un(e) {
	return on.call(e);
}
/*@__NO_SIDE_EFFECTS__*/
function dn(e) {
	return sn.call(e);
}
function L(e, t) {
	if (!j) return /* @__PURE__ */ un(e);
	var n = /* @__PURE__ */ un(ke);
	if (n === null) n = ke.appendChild(ln());
	else if (t && n.nodeType !== 3) {
		var r = ln();
		return n?.before(r), Ae(r), r;
	}
	return t && hn(n), Ae(n), n;
}
function R(e, t = !1) {
	if (!j) {
		var n = /* @__PURE__ */ un(e);
		return n instanceof Comment && n.data === "" ? /* @__PURE__ */ dn(n) : n;
	}
	if (t) {
		if (ke?.nodeType !== 3) {
			var r = ln();
			return ke?.before(r), Ae(r), r;
		}
		hn(ke);
	}
	return ke;
}
function z(e, t = 1, n = !1) {
	let r = j ? ke : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ dn(r);
	if (!j) return r;
	if (n) {
		if (r?.nodeType !== 3) {
			var a = ln();
			return r === null ? i?.after(a) : r.before(a), Ae(a), a;
		}
		hn(r);
	}
	return Ae(r), r;
}
function fn(e) {
	e.textContent = "";
}
function pn() {
	return !1;
}
function mn(e, t, n) {
	return t == null || t === "http://www.w3.org/1999/xhtml" ? n ? document.createElement(e, { is: n }) : document.createElement(e) : n ? document.createElementNS(t, e, { is: n }) : document.createElementNS(t, e);
}
function hn(e) {
	if (e.nodeValue.length < 65536) return;
	let t = e.nextSibling;
	for (; t !== null && t.nodeType === 3;) t.remove(), e.nodeValue += t.nodeValue, t = e.nextSibling;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/effects.js
function gn(e) {
	qn === null && (Wn === null && k(e), me()), Hn && O(e);
}
function _n(e, t) {
	var n = t.last;
	n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function vn(e, t) {
	var n = qn;
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
			ur(r);
		} catch (e) {
			throw Mn(r), e;
		}
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && (i = i.first, e & 16 && e & 65536 && i !== null && (i.f |= S));
	}
	if (i !== null && (i.parent = n, n !== null && _n(i, n), Wn !== null && Wn.f & 2 && !(e & 64))) {
		var a = Wn;
		(a.effects ??= []).push(i);
	}
	return r;
}
function yn() {
	return Wn !== null && !Gn;
}
function bn(e) {
	let t = vn(8, null);
	return Qe(t, h), t.teardown = e, t;
}
function xn(e) {
	gn("$effect");
	var t = qn.f;
	if (!Wn && t & 32 && Ve !== null && !Ve.i) {
		var n = Ve;
		(n.e ??= []).push(e);
	} else return Sn(e);
}
function Sn(e) {
	return vn(4 | w, e);
}
function Cn(e) {
	Lt.ensure();
	let t = vn(64 | C, e);
	return (e = {}) => new Promise((n) => {
		e.outro ? Fn(t, () => {
			Mn(t), n(void 0);
		}) : (Mn(t), n(void 0));
	});
}
function wn(e) {
	return vn(4, e);
}
function Tn(e) {
	return vn(ee | C, e);
}
function En(e, t = 0) {
	return vn(8 | t, e);
}
function B(e, t = [], n = [], r = []) {
	pt(r, t, n, (t) => {
		vn(8, () => {
			e(...t.map(H));
		});
	});
}
function Dn(e, t = 0) {
	return vn(16 | t, e);
}
function On(e) {
	return vn(32 | C, e);
}
function kn(e) {
	var t = e.teardown;
	if (t !== null) {
		let e = Hn, n = Wn;
		Un(!0), Kn(null);
		try {
			t.call(null);
		} finally {
			Un(e), Kn(n);
		}
	}
}
function An(e, t = !1) {
	var n = e.first;
	for (e.first = e.last = null; n !== null;) {
		let e = n.ac;
		e !== null && st(() => {
			e.abort(ue);
		});
		var r = n.next;
		n.f & 64 ? n.parent = null : Mn(n, t), n = r;
	}
}
function jn(e) {
	for (var t = e.first; t !== null;) {
		var n = t.next;
		t.f & 32 || Mn(t), t = n;
	}
}
function Mn(e, t = !0) {
	var n = !1;
	(t || e.f & 262144) && e.nodes !== null && e.nodes.end !== null && (Nn(e.nodes.start, e.nodes.end), n = !0), e.f |= x, An(e, t && !n), lr(e, 0);
	var r = e.nodes && e.nodes.t;
	if (r !== null) for (let e of r) e.stop();
	kn(e), e.f ^= x, e.f |= y;
	var i = e.parent;
	i !== null && i.first !== null && Pn(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function Nn(e, t) {
	for (; e !== null;) {
		var n = e === t ? null : /* @__PURE__ */ dn(e);
		e.remove(), e = n;
	}
}
function Pn(e) {
	var t = e.parent, n = e.prev, r = e.next;
	n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function Fn(e, t, n = !0) {
	var r = [];
	In(e, r, !0);
	var i = () => {
		n && Mn(e), t && t();
	}, a = r.length;
	if (a > 0) {
		var o = () => --a || i();
		for (var s of r) s.out(o);
	} else i();
}
function In(e, t, n) {
	if (!(e.f & 8192)) {
		e.f ^= v;
		var r = e.nodes && e.nodes.t;
		if (r !== null) for (let e of r) (e.is_global || n) && t.push(e);
		for (var i = e.first; i !== null;) {
			var a = i.next;
			if (!(i.f & 64)) {
				var o = (i.f & 65536) != 0 || (i.f & 32) != 0 && (e.f & 16) != 0;
				In(i, t, o ? n : !1);
			}
			i = a;
		}
	}
}
function Ln(e) {
	Rn(e, !0);
}
function Rn(e, t) {
	if (e.f & 8192) {
		e.f ^= v, e.f & 1024 || (Qe(e, g), Lt.ensure().schedule(e));
		for (var n = e.first; n !== null;) {
			var r = n.next, i = (n.f & 65536) != 0 || (n.f & 32) != 0;
			Rn(n, i ? t : !1), n = r;
		}
		var a = e.nodes && e.nodes.t;
		if (a !== null) for (let e of a) (e.is_global || t) && e.in();
	}
}
function zn(e, t) {
	if (e.nodes) for (var n = e.nodes.start, r = e.nodes.end; n !== null;) {
		var i = n === r ? null : /* @__PURE__ */ dn(n);
		t.append(n), n = i;
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/legacy.js
var Bn = null, Vn = !1, Hn = !1;
function Un(e) {
	Hn = e;
}
var Wn = null, Gn = !1;
function Kn(e) {
	Wn = e;
}
var qn = null;
function Jn(e) {
	qn = e;
}
var Yn = null;
function Xn(e) {
	Wn !== null && (Yn ??= /* @__PURE__ */ new Set()).add(e);
}
var Zn = null, Qn = 0, $n = null;
function er(e) {
	$n = e;
}
var tr = 1, nr = 0, rr = nr;
function ir(e) {
	rr = e;
}
function ar() {
	return ++tr;
}
function V(e) {
	var t = e.f;
	if (t & 2048) return !0;
	if (t & 2 && (e.f &= ~E), t & 4096) {
		for (var n = e.deps, r = n.length, i = 0; i < r; i++) {
			var a = n[i];
			if (V(a) && Ct(a), a.wv > e.wv) return !0;
		}
		t & 512 && kt === null && Qe(e, h);
	}
	return !1;
}
function or(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(Yn !== null && Yn.has(e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? or(a, t, !1) : t === a && (n ? Qe(a, g) : a.f & 1024 && Qe(a, _), Wt(a));
	}
}
function sr(e) {
	var t = Zn, n = Qn, r = $n, i = Wn, a = Yn, o = Ve, s = Gn, c = rr, l = e.f;
	Zn = null, Qn = 0, $n = null, Wn = l & 96 ? null : e, Yn = null, He(e.ctx), Gn = !1, rr = ++nr, e.ac !== null && (st(() => {
		e.ac.abort(ue);
	}), e.ac = null);
	try {
		e.f |= D;
		var u = e.fn, d = u();
		e.f |= b;
		var f = e.deps, p = Dt?.is_fork;
		if (Zn !== null) {
			var m;
			if (p || lr(e, Qn), f !== null && Qn > 0) for (f.length = Qn + Zn.length, m = 0; m < Zn.length; m++) f[Qn + m] = Zn[m];
			else e.deps = f = Zn;
			if (yn() && e.f & 512) for (m = Qn; m < f.length; m++) (f[m].reactions ??= []).push(e);
		} else !p && f !== null && Qn < f.length && (lr(e, Qn), f.length = Qn);
		if (Ge() && $n !== null && !Gn && f !== null && !(e.f & 6146)) for (m = 0; m < $n.length; m++) or($n[m], e);
		if (i !== null && i !== e) {
			if (nr++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = nr;
			if (t !== null) for (let e of t) e.rv = nr;
			$n !== null && (r === null ? r = $n : r.push(...$n));
		}
		return e.f & 8388608 && (e.f ^= te), d;
	} catch (e) {
		return Xe(e);
	} finally {
		e.f ^= D, Zn = t, Qn = n, $n = r, Wn = i, Yn = a, He(o), Gn = s, rr = c;
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
	if (i === null && r.f & 2 && (Zn === null || !n.call(Zn, r))) {
		var s = r;
		s.f & 512 && (s.f ^= 512, s.f &= ~E), s.v !== xe && $e(s), s.ac !== null && st(() => {
			s.ac.abort(ue), s.ac = null, Qe(s, g);
		}), wt(s), lr(s, 0);
	}
}
function lr(e, t) {
	var n = e.deps;
	if (n !== null) for (var r = t; r < n.length; r++) cr(e, n[r]);
}
function ur(e) {
	var t = e.f;
	if (!(t & 16384)) {
		Qe(e, h);
		var n = qn, r = Vn;
		qn = e, Vn = (t & 96) == 0;
		try {
			t & 16777232 ? jn(e) : An(e), kn(e);
			var i = sr(e);
			e.teardown = typeof i == "function" ? i : null, e.wv = tr;
		} finally {
			Vn = r, qn = n;
		}
	}
}
async function dr() {
	await Promise.resolve(), Rt();
}
function H(e) {
	var t = (e.f & 2) != 0;
	if (Bn?.add(e), Wn !== null && !Gn && !(qn !== null && qn.f & 16384) && (Yn === null || !Yn.has(e))) {
		var r = Wn.deps;
		if (Wn.f & 2097152) e.rv < nr && (e.rv = nr, Zn === null && r !== null && r[Qn] === e ? Qn++ : Zn === null ? Zn = [e] : Zn.push(e));
		else {
			Wn.deps ??= [], n.call(Wn.deps, e) || Wn.deps.push(e);
			var i = e.reactions;
			i === null ? e.reactions = [Wn] : n.call(i, Wn) || i.push(Wn);
		}
	}
	if (Hn && Jt.has(e)) return Jt.get(e);
	if (t) {
		var a = e;
		if (Hn) {
			var o = a.v;
			return (!(a.f & 1024) && a.reactions !== null || pr(a)) && (o = St(a)), Jt.set(a, o), o;
		}
		var s = (a.f & 512) == 0 && !Gn && Wn !== null && (Vn || (Wn.f & 512) != 0), c = (a.f & b) === 0;
		V(a) && (s && (a.f |= 512), Ct(a)), s && !c && (Tt(a), fr(a));
	}
	if (kt?.has(e)) return kt.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function fr(e) {
	if (e.f |= 512, e.deps !== null) for (let t of e.deps) (t.reactions ??= []).push(e), t.f & 2 && !(t.f & 512) && (Tt(t), fr(t));
}
function pr(e) {
	if (e.v === xe) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if (Jt.has(t) || t.f & 2 && pr(t)) return !0;
	return !1;
}
function mr(e) {
	var t = Gn;
	try {
		return Gn = !0, e();
	} finally {
		Gn = t;
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
	if (!j) return;
	e.removeAttribute("onload"), e.removeAttribute("onerror");
	let t = e.__e;
	t !== void 0 && (e.__e = void 0, queueMicrotask(() => {
		e.isConnected && e.dispatchEvent(t);
	}));
}
function xr(e, t, n, r = {}) {
	function i(e) {
		if (r.capture || Tr.call(t, e), !e.cancelBubble) return st(() => n?.call(this, e));
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
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && bn(() => {
		t.removeEventListener(e, o, a);
	});
}
function U(e, t, n) {
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
		var d = Wn, f = qn;
		Kn(null), Jn(null);
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
			e[_r] = t, delete e.currentTarget, Kn(d), Jn(f);
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
	var t = mn("template");
	return t.innerHTML = Dr(e.replaceAll("<!>", "<!---->")), t.content;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/template.js
function kr(e, t) {
	var n = qn;
	n.nodes === null && (n.nodes = {
		start: e,
		end: t,
		a: null,
		t: null
	});
}
/*#__NO_SIDE_EFFECTS__*/
function W(e, t) {
	var n = (t & 1) != 0, r = (t & 2) != 0, i, a = !e.startsWith("<!>");
	return () => {
		if (j) return kr(ke, null), ke;
		i === void 0 && (i = Or(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ un(i)));
		var t = r || an ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ un(t), s = t.lastChild;
			kr(o, s);
		} else kr(t, t);
		return t;
	};
}
function Ar(e = "") {
	if (!j) {
		var t = ln(e + "");
		return kr(t, t), t;
	}
	var n = ke;
	return n.nodeType === 3 ? hn(n) : (n.before(n = ln()), Ae(n)), kr(n, n), n;
}
function jr() {
	if (j) return kr(ke, null), ke;
	var e = document.createDocumentFragment(), t = document.createComment(""), n = ln();
	return e.append(t, n), kr(t, n), e;
}
function G(e, t) {
	if (j) {
		var n = qn;
		(!(n.f & 32768) || n.nodes.end === null) && (n.nodes.end = ke), je();
		return;
	}
	e !== null && e.before(t);
}
function K(e, t) {
	var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
	n !== (e[ce] ??= e.nodeValue) && (e[ce] = n, e.nodeValue = `${n}`);
}
function Mr(e, t) {
	return Pr(e, t);
}
var Nr = /* @__PURE__ */ new Map();
function Pr(e, { target: t, anchor: n, props: i = {}, events: a, context: o, intro: s = !0, transformError: c }) {
	cn();
	var l = void 0, u = Cn(() => {
		var s = n ?? t.appendChild(ln());
		dt(s, { pending: () => {} }, (t) => {
			Ue({});
			var n = Ve;
			if (o && (n.c = o), a && (i.$$events = a), j && kr(t, null), l = e(t, i) || {}, j && (qn.nodes.end = ke, ke === null || ke.nodeType !== 8 || ke.data !== "]")) throw Ee(), be;
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
			if (n) Ln(n), this.#r.delete(t);
			else {
				var r = this.#n.get(t);
				r && (Ln(r.effect), this.#t.set(t, r.effect), this.#n.delete(t), r.fragment.lastChild.remove(), this.anchor.before(r.fragment), n = r.effect);
			}
			for (let [t, n] of this.#e) {
				if (this.#e.delete(t), t === e) break;
				let r = this.#n.get(n);
				r && (Mn(r.effect), this.#n.delete(n));
			}
			for (let [e, r] of this.#t) {
				if (e === t || this.#r.has(e)) continue;
				let i = () => {
					if (Array.from(this.#e.values()).includes(e)) {
						var t = document.createDocumentFragment();
						zn(r, t), t.append(ln()), this.#n.set(e, {
							effect: r,
							fragment: t
						});
					} else Mn(r);
					this.#r.delete(e), this.#t.delete(e);
				};
				this.#i || !n ? (this.#r.add(e), Fn(r, i, !1)) : i();
			}
		}
	};
	#o = (e) => {
		this.#e.delete(e);
		let t = Array.from(this.#e.values());
		for (let [e, n] of this.#n) t.includes(e) || (Mn(n.effect), this.#n.delete(e));
	};
	ensure(e, t) {
		var n = Dt, r = pn();
		if (t && !this.#t.has(e) && !this.#n.has(e)) if (r) {
			var i = document.createDocumentFragment(), a = ln();
			i.append(a), this.#n.set(e, {
				effect: On(() => t(a)),
				fragment: i
			});
		} else this.#t.set(e, On(() => t(this.anchor)));
		if (this.#e.set(n, e), r) {
			for (let [t, r] of this.#t) t === e ? n.unskip_effect(r) : n.skip_effect(r);
			for (let [t, r] of this.#n) t === e ? n.unskip_effect(r.effect) : n.skip_effect(r.effect);
			n.oncommit(this.#a), n.ondiscard(this.#o);
		} else j && (this.anchor = ke), this.#a(n);
	}
};
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/if.js
function q(e, t, n = !1) {
	var r;
	j && (r = ke, je());
	var i = new Ir(e), a = n ? S : 0;
	function o(e, t) {
		if (j) {
			var n = Pe(r);
			if (e !== parseInt(n.substring(1))) {
				var a = Ne();
				Ae(a), i.anchor = a, Oe(!1), i.ensure(e, t), Oe(!0);
				return;
			}
		}
		i.ensure(e, t);
	}
	Dn(() => {
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
		Fn(n, () => {
			if (o) {
				if (o.pending.delete(n), o.done.add(n), o.pending.size === 0) {
					var t = e.outrogroups;
					zr(e, r(o.done)), t.delete(o), t.size === 0 && (e.outrogroups = null);
				}
			} else --s;
		}, !1);
	}
	if (s === 0) {
		var l = i.length === 0 && n !== null;
		if (l) {
			var u = n, d = u.parentNode;
			fn(d), d.append(u), e.items.clear();
		}
		zr(e, t, !l);
	} else o = {
		pending: new Set(t),
		done: /* @__PURE__ */ new Set()
	}, (e.outrogroups ??= /* @__PURE__ */ new Set()).add(o);
}
function zr(e, t, n = !0) {
	var r;
	if (e.pending.size > 0) {
		r = /* @__PURE__ */ new Set();
		for (let t of e.pending.values()) for (let n of t) r.add(e.items.get(n).e);
	}
	for (var i = 0; i < t.length; i++) {
		var a = t[i];
		r?.has(a) ? (a.f |= T, zn(a, document.createDocumentFragment())) : Mn(t[i], n);
	}
}
var Br;
function Vr(t, n, i, a, o, s = null) {
	var c = t, l = /* @__PURE__ */ new Map();
	if (n & 4) {
		var u = t;
		c = j ? Ae(/* @__PURE__ */ un(u)) : u.appendChild(ln());
	}
	j && je();
	var d = null, f = /* @__PURE__ */ bt(() => {
		var t = i();
		return e(t) ? t : t == null ? [] : r(t);
	}), p, m = /* @__PURE__ */ new Map(), h = !0;
	function g(e) {
		v.effect.f & 16384 || (v.pending.delete(e), v.fallback = d, Ur(v, p, c, n, a), d !== null && (p.length === 0 ? d.f & 33554432 ? (d.f ^= T, Gr(d, null, c)) : Ln(d) : Fn(d, () => {
			d = null;
		})));
	}
	function _(e) {
		v.pending.delete(e);
	}
	var v = {
		effect: Dn(() => {
			p = H(f);
			var e = p.length;
			let t = !1;
			j && Pe(c) === "[!" != (e === 0) && (c = Ne(), Ae(c), Oe(!1), t = !0);
			for (var r = /* @__PURE__ */ new Set(), u = Dt, v = pn(), y = 0; y < e; y += 1) {
				j && ke.nodeType === 8 && ke.data === "]" && (c = ke, t = !0, Oe(!1));
				var b = p[y], x = a(b, y), S = h ? null : l.get(x);
				S ? (S.v && Qt(S.v, b), S.i && Qt(S.i, y), v && u.unskip_effect(S.e)) : (S = Wr(l, h ? c : Br ??= ln(), b, x, y, o, n, i), h || (S.e.f |= T), l.set(x, S)), r.add(x);
			}
			if (e === 0 && s && !d && (h ? d = On(() => s(c)) : (d = On(() => s(Br ??= ln())), d.f |= T)), e > r.size && pe("", "", ""), j && e > 0 && Ae(Ne()), !h) if (m.set(u, r), v) {
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
	h = !1, j && (c = ke);
}
function Hr(e) {
	for (; e !== null && !(e.f & 32);) e = e.next;
	return e;
}
function Ur(e, t, n, i, a) {
	var o = (i & 8) != 0, s = t.length, c = e.items, l = Hr(e.effect.first), u, d = null, f, p = [], m = [], h, g, _, v;
	if (o) for (v = 0; v < s; v += 1) h = t[v], g = a(h, v), _ = c.get(g).e, _.f & 33554432 || (_.nodes?.a?.measure(), (f ??= /* @__PURE__ */ new Set()).add(_));
	for (v = 0; v < s; v += 1) {
		if (h = t[v], g = a(h, v), _ = c.get(g).e, e.outrogroups !== null) for (let t of e.outrogroups) t.pending.delete(_), t.done.delete(_);
		if (_.f & 8192 && (Ln(_), o && (_.nodes?.a?.unfix(), (f ??= /* @__PURE__ */ new Set()).delete(_))), _.f & 33554432) if (_.f ^= T, _ === l) Gr(_, null, n);
		else {
			var y = d ? d.next : l;
			_ === e.effect.last && (e.effect.last = _.prev), _.prev && (_.prev.next = _.next), _.next && (_.next.prev = _.prev), Kr(e, d, _), Kr(e, _, y), Gr(_, y, n), d = _, p = [], m = [], l = Hr(d.next);
			continue;
		}
		if (_ !== l) {
			if (u !== void 0 && u.has(_)) {
				if (p.length < m.length) {
					var b = m[0], x;
					d = b.prev;
					var S = p[0], C = p[p.length - 1];
					for (x = 0; x < p.length; x += 1) Gr(p[x], b, n);
					for (x = 0; x < m.length; x += 1) u.delete(m[x]);
					Kr(e, S.prev, C.next), Kr(e, d, S), Kr(e, C, b), l = b, d = C, --v, p = [], m = [];
				} else u.delete(_), Gr(_, l, n), Kr(e, _.prev, _.next), Kr(e, _, d === null ? e.effect.first : d.next), Kr(e, d, _), d = _;
				continue;
			}
			for (p = [], m = []; l !== null && l !== _;) (u ??= /* @__PURE__ */ new Set()).add(l), m.push(l), l = Hr(l.next);
			if (l === null) continue;
		}
		_.f & 33554432 || p.push(_), d = _, l = Hr(_.next);
	}
	if (e.outrogroups !== null) {
		for (let t of e.outrogroups) t.pending.size === 0 && (zr(e, r(t.done)), e.outrogroups?.delete(t));
		e.outrogroups.size === 0 && (e.outrogroups = null);
	}
	if (l !== null || u !== void 0) {
		var w = [];
		if (u !== void 0) for (_ of u) _.f & 8192 || w.push(_);
		for (; l !== null;) !(l.f & 8192) && l !== e.fallback && w.push(l), l = Hr(l.next);
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
function Wr(e, t, n, r, i, a, o, s) {
	var c = o & 1 ? o & 16 ? Xt(n) : /* @__PURE__ */ Zt(n, !1, !1) : null, l = o & 2 ? Xt(i) : null;
	return {
		v: c,
		i: l,
		e: On(() => (a(t, c ?? n, l ?? i, s), () => {
			e.delete(r);
		}))
	};
}
function Gr(e, t, n) {
	if (e.nodes) for (var r = e.nodes.start, i = e.nodes.end, a = t && !(t.f & 33554432) ? t.nodes.start : n; r !== null;) {
		var o = /* @__PURE__ */ dn(r);
		if (a.before(r), r === i) return;
		r = o;
	}
}
function Kr(e, t, n) {
	t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
function J(e, t, n = !1, r = !1, i = !1, a = !1) {
	var o = e, s = "";
	if (n) {
		var c = e;
		j && (o = Ae(/* @__PURE__ */ un(c)));
	}
	B(() => {
		var e = qn;
		if (s === (s = t() ?? "")) {
			j && je();
			return;
		}
		if (n && !j) {
			e.nodes = null, c.innerHTML = s, s !== "" && kr(/* @__PURE__ */ un(c), c.lastChild);
			return;
		}
		if (e.nodes !== null && (Nn(e.nodes.start, e.nodes.end), e.nodes = null), s !== "") {
			if (j) {
				for (var a = ke.data, l = je(), u = l; l !== null && (l.nodeType !== 8 || l.data !== "");) u = l, l = /* @__PURE__ */ dn(l);
				if (l === null) throw Ee(), be;
				kr(ke, u), o = Ae(l);
				return;
			}
			var d = mn(r ? "svg" : i ? "math" : "template", r ? Ce : i ? we : void 0);
			d.innerHTML = s;
			var f = r || i ? d : d.content;
			if (kr(/* @__PURE__ */ un(f), f.lastChild), r || i) for (; /* @__PURE__ */ un(f);) o.before(/* @__PURE__ */ un(f));
			else o.before(f);
		}
	});
}
//#endregion
//#region node_modules/svelte/src/internal/shared/attributes.js
var qr = [..." 	\n\r\f\xA0\v﻿"];
function Jr(e, t, n) {
	var r = e == null ? "" : "" + e;
	if (t && (r = r ? r + " " + t : t), n) {
		for (var i of Object.keys(n)) if (n[i]) r = r ? r + " " + i : i;
		else if (r.length) for (var a = i.length, o = 0; (o = r.indexOf(i, o)) >= 0;) {
			var s = o + a;
			(o === 0 || qr.includes(r[o - 1])) && (s === r.length || qr.includes(r[s])) ? r = (o === 0 ? "" : r.substring(0, o)) + r.substring(s + 1) : o = s;
		}
	}
	return r === "" ? null : r;
}
function Yr(e, t = !1) {
	var n = t ? " !important;" : ";", r = "";
	for (var i of Object.keys(e)) {
		var a = e[i];
		a != null && a !== "" && (r += " " + i + ": " + a + n);
	}
	return r;
}
function Xr(e) {
	return e[0] !== "-" || e[1] !== "-" ? e.toLowerCase() : e;
}
function Zr(e, t) {
	if (t) {
		var n = "", r, i;
		if (Array.isArray(t) ? (r = t[0], i = t[1]) : r = t, e) {
			e = String(e).replaceAll(/\s*\/\*.*?\*\/\s*/g, "").trim();
			var a = !1, o = 0, s = !1, c = [];
			r && c.push(...Object.keys(r).map(Xr)), i && c.push(...Object.keys(i).map(Xr));
			var l = 0, u = -1;
			let t = e.length;
			for (var d = 0; d < t; d++) {
				var f = e[d];
				if (s ? f === "/" && e[d - 1] === "*" && (s = !1) : a ? a === f && (a = !1) : f === "/" && e[d + 1] === "*" ? s = !0 : f === "\"" || f === "'" ? a = f : f === "(" ? o++ : f === ")" && o--, !s && a === !1 && o === 0) {
					if (f === ":" && u === -1) u = d;
					else if (f === ";" || d === t - 1) {
						if (u !== -1) {
							var p = Xr(e.substring(l, u).trim());
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
		return r && (n += Yr(r)), i && (n += Yr(i, !0)), n = n.trim(), n === "" ? null : n;
	}
	return e == null ? null : String(e);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/class.js
function Qr(e, t, n, r, i, a) {
	var o = e[oe];
	if (j || o !== n || o === void 0) {
		var s = Jr(n, r, a);
		(!j || s !== e.getAttribute("class")) && (s == null ? e.removeAttribute("class") : t ? e.className = s : e.setAttribute("class", s)), e[oe] = n;
	} else if (a && i !== a) for (var c in a) {
		var l = !!a[c];
		(i == null || l !== !!i[c]) && e.classList.toggle(c, l);
	}
	return a;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/style.js
function $r(e, t = {}, n, r) {
	for (var i in n) {
		var a = n[i];
		t[i] !== a && (n[i] == null ? e.style.removeProperty(i) : e.style.setProperty(i, a, r));
	}
}
function ei(e, t, n, r) {
	var i = e[se];
	if (j || i !== t) {
		var a = Zr(t, r);
		(!j || a !== e.getAttribute("style")) && (a == null ? e.removeAttribute("style") : e.style.cssText = a), e[se] = t;
	} else r && (Array.isArray(r) ? ($r(e, n?.[0], r[0]), $r(e, n?.[1], r[1], "important")) : $r(e, n, r));
	return r;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/attributes.js
var ti = Symbol("is custom element"), ni = Symbol("is html"), ri = de ? "link" : "LINK", ii = de ? "progress" : "PROGRESS";
function Y(e) {
	if (j) {
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
		e[le] = n, Je(n), ot();
	}
}
function X(e, t) {
	var n = oi(e);
	n.value === (n.value = t ?? void 0) || e.value === t && (t !== 0 || e.nodeName !== ii) || (e.value = t ?? "");
}
function ai(e, t) {
	var n = oi(e);
	n.checked !== (n.checked = t ?? void 0) && (e.checked = t);
}
function Z(e, t, n, r) {
	var i = oi(e);
	j && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === ri) || i[t] !== (i[t] = n) && (t === "loading" && (e[ie] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && ci(e).includes(t) ? e[t] = n : e.setAttribute(t, n));
}
function oi(e) {
	return e[ae] ??= {
		[ti]: e.nodeName.includes("-"),
		[ni]: e.namespaceURI === Se
	};
}
var si = /* @__PURE__ */ new Map();
function ci(e) {
	var t = e.getAttribute("is") || e.nodeName, n = si.get(t);
	if (n) return n;
	si.set(t, n = []);
	for (var r, i = e, a = Element.prototype; a !== i;) {
		for (var s in r = o(i), r) r[s].set && s !== "innerHTML" && s !== "textContent" && s !== "innerText" && n.push(s);
		i = l(i);
	}
	return n;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/input.js
function li(e, t, n = t) {
	var r = /* @__PURE__ */ new WeakSet();
	ct(e, "input", async (i) => {
		var a = i ? e.defaultValue : e.value;
		if (a = ui(e) ? di(a) : a, n(a), Dt !== null && r.add(Dt), await dr(), a !== (a = t())) {
			var o = e.selectionStart, s = e.selectionEnd, c = e.value.length;
			if (e.value = a ?? "", s !== null) {
				var l = e.value.length;
				o === s && s === c && l > c ? (e.selectionStart = l, e.selectionEnd = l) : (e.selectionStart = o, e.selectionEnd = Math.min(s, l));
			}
		}
	}), (j && e.defaultValue !== e.value || mr(t) == null && e.value) && (n(ui(e) ? di(e.value) : e.value), Dt !== null && r.add(Dt)), En(() => {
		var n = t();
		if (e === document.activeElement) {
			var i = Dt;
			if (r.has(i)) return;
		}
		ui(e) && n === di(e.value) || e.type === "date" && !n && !e.value || n !== e.value && (e.value = n ?? "");
	});
}
function ui(e) {
	var t = e.type;
	return t === "number" || t === "range";
}
function di(e) {
	return e === "" ? null : +e;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/this.js
function fi(e, t) {
	return e === t || e?.[ne] === t;
}
function pi(e = {}, t, n, r) {
	var i = Ve.r, a = qn;
	return wn(() => {
		var o, s;
		return En(() => {
			o = s, s = r?.() || [], mr(() => {
				fi(n(...s), e) || (t(e, ...s), o && fi(n(...o), e) && t(null, ...o));
			});
		}), () => {
			let r = a;
			for (; r !== i && r.parent !== null && r.parent.f & 33554432;) r = r.parent;
			let o = () => {
				s && fi(n(...s), e) && t(null, ...s);
			}, c = r.teardown;
			r.teardown = () => {
				o(), c?.();
			};
		};
	}), e;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/props.js
function mi(e, t, n, r) {
	var i = !0, o = (n & 8) != 0, s = (n & 16) != 0, c = r, l = !0, u = void 0, d = () => s && i ? (u ??= /* @__PURE__ */ _t(r), H(u)) : (l && (l = !1, c = s ? mr(r) : r), c);
	let f;
	if (o) {
		var p = ne in e || re in e;
		f = a(e, t)?.set ?? (p && t in e ? (n) => e[t] = n : void 0);
	}
	var m, h = !1;
	o ? [m, h] = rt(() => e[t]) : m = e[t], m === void 0 && r !== void 0 && (m = d(), f && (i && he(t), f(m)));
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
	var b = qn;
	return (function(e, t) {
		if (arguments.length > 0) {
			let n = t ? H(y) : i && o ? nn(e) : e;
			return I(y, n), v = !0, c !== void 0 && (c = n), e;
		}
		return Hn && v || b.f & 16384 ? y.v : H(y);
	});
}
var hi = {
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
};
//#endregion
//#region ../template/assets/engine/i18n.js
function gi(e) {
	return _i(e) ?? "nb";
}
function _i(e) {
	let t = String(e ?? "").trim().toLowerCase();
	return t === "no" || t.startsWith("nb") || t.startsWith("no-") ? "nb" : t.startsWith("nn") ? "nn" : t.startsWith("se") || t.startsWith("smj") || t.startsWith("sma") ? "se" : t.startsWith("tr") ? "tr" : t.startsWith("en") ? "en-GB" : null;
}
({ ...hi.strings });
var vi = {
	lang: "nb",
	dict: {}
};
function yi(e, t) {
	if (!t) return e;
	let n = e;
	for (let [e, r] of Object.entries(t)) n = n.replaceAll(`{${e}}`, String(r));
	return n;
}
function Q(e, t) {
	return yi(vi.dict[e] ?? e, t);
}
function bi() {
	return vi.lang;
}
function xi(e, t) {
	vi.lang = gi(e), Object.assign(vi.dict, t ?? {});
}
//#endregion
//#region node_modules/svelte/src/internal/disclose-version.js
typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add("5");
//#endregion
//#region src/lib/draftStore.js
function Si(e, t, n) {
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
var Ci = /* @__PURE__ */ W("<button type=\"button\" class=\"cp-clear svelte-zxiloo\">×</button>"), wi = /* @__PURE__ */ W("<button type=\"button\" class=\"cp-eye svelte-zxiloo\"><svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M18 2l4 4-3 3-4-4 3-3z\"></path><path d=\"M15 5L4 16l-1 5 5-1L19 9\"></path></svg></button>"), Ti = /* @__PURE__ */ W("<input type=\"number\" min=\"0\" max=\"255\" class=\"svelte-zxiloo\"/>"), Ei = /* @__PURE__ */ W("<button type=\"button\"></button>"), Di = /* @__PURE__ */ W("<span class=\"cp-label svelte-zxiloo\"> <!></span> <span class=\"cp-tokens svelte-zxiloo\"></span>", 1), Oi = /* @__PURE__ */ W("<span class=\"cp-saved svelte-zxiloo\"><button type=\"button\" class=\"cp-token svelte-zxiloo\"></button> <button type=\"button\" class=\"cp-del svelte-zxiloo\">×</button></span>"), ki = /* @__PURE__ */ W("<span class=\"cp-tokens svelte-zxiloo\"></span>"), Ai = /* @__PURE__ */ W("<button type=\"button\" class=\"cp-token svelte-zxiloo\"></button>"), ji = /* @__PURE__ */ W("<span class=\"cp-label svelte-zxiloo\"> </span> <span class=\"cp-tokens svelte-zxiloo\"></span>", 1), Mi = /* @__PURE__ */ W("<div class=\"cp-pop svelte-zxiloo\"><div class=\"cp-sv svelte-zxiloo\"><span class=\"cp-cursor svelte-zxiloo\"></span></div> <input class=\"cp-hue svelte-zxiloo\" type=\"range\" min=\"0\" max=\"360\" step=\"1\"/> <input class=\"cp-alpha svelte-zxiloo\" type=\"range\" min=\"0\" max=\"100\" step=\"1\"/> <span class=\"cp-row svelte-zxiloo\"><span class=\"cp-preview svelte-zxiloo\"></span> <input class=\"cp-hex svelte-zxiloo\" spellcheck=\"false\"/> <!></span> <span class=\"cp-row cp-rgb svelte-zxiloo\"></span> <!> <span class=\"cp-label cp-label-row svelte-zxiloo\"> <button type=\"button\" class=\"cp-add svelte-zxiloo\">+</button></span> <!> <!></div>"), Ni = /* @__PURE__ */ W("<span class=\"cp svelte-zxiloo\"><button type=\"button\"></button> <!> <!></span>");
function Pi(e, t) {
	Ue(t, !0);
	let n = mi(t, "value", 3, "#000000"), r = mi(t, "tokens", 19, () => []), i = mi(t, "label", 19, () => Q("cp.pickColor")), a = mi(t, "allowClear", 3, !1), o = "urd-recent-colors", s = "urd-saved-colors", c = () => {
		let e = r().find(([e]) => e === n());
		return e ? e[1] : n();
	}, l = () => r().find(([e]) => e === n())?.[0] ?? null, u = /* @__PURE__ */ F(nn([])), d = /* @__PURE__ */ F(nn([])), f = "", p = "", h = /* @__PURE__ */ F(null), g = /* @__PURE__ */ F(!1), _ = /* @__PURE__ */ F(nn({
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
		return w(...E(H(v), H(y), H(b)));
	}
	function ee() {
		let e = D();
		return H(x) >= .995 ? e : e + Math.round(H(x) * 255).toString(16).padStart(2, "0");
	}
	function te() {
		I(S, ee(), !0), p = H(S), t.onchange?.(H(S));
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
		let e = H(h).getBoundingClientRect(), t = H(h).closest(".panel-body")?.getBoundingClientRect(), r = t ? t.right : window.innerWidth, i = Math.max(8, Math.min(e.right - 236, r - 236 - 8)), a = e.bottom + 380 + 8 > window.innerHeight ? Math.max(8, e.top - 380 - 8) : e.bottom + 6;
		I(_, {
			top: a,
			left: i
		}, !0), I(g, !0);
	}
	function ie() {
		if (I(g, !1), p && p !== f) {
			let e = [p, ...H(u).filter((e) => e !== p)].slice(0, 8);
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
		H(d).includes(e) || (I(d, [e, ...H(d)].slice(0, 12), !0), localStorage.setItem(s, JSON.stringify(ze(H(d)))));
	}
	function O(e) {
		I(d, H(d).filter((t) => t !== e), !0), localStorage.setItem(s, JSON.stringify(ze(H(d))));
	}
	xn(() => {
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
	var me = Ni(), k = L(me);
	let A;
	var he = z(k, 2), ge = (e) => {
		var n = Ci();
		B((e, t) => {
			Z(n, "title", e), Z(n, "aria-label", t);
		}, [() => Q("cp.clearTitle"), () => Q("cp.clear")]), U("click", n, () => t.onchange?.("")), G(e, n);
	};
	q(he, (e) => {
		a() && n() && e(ge);
	});
	var _e = z(he, 2), ve = (e) => {
		var t = Mi(), i = L(t), a = L(i);
		M(i);
		var o = z(i, 2);
		Y(o);
		var s = z(o, 2);
		Y(s);
		var c = z(s, 2), f = L(c), p = z(f, 2);
		Y(p);
		var h = z(p, 2), g = (e) => {
			var t = wi();
			B((e) => Z(t, "title", e), [() => Q("cp.eyedropper")]), U("click", t, de), G(e, t);
		};
		q(h, (e) => {
			ue && e(g);
		}), M(c);
		var C = z(c, 2);
		Vr(C, 22, () => [
			"R",
			"G",
			"B"
		], (e) => e, (e, t, n) => {
			var r = Ti();
			Y(r), B((e) => {
				Z(r, "title", t), X(r, e);
			}, [() => ce(H(n))]), U("change", r, (e) => le(H(n), e.target.value)), G(e, r);
		}), M(C);
		var w = z(C, 2), T = (e) => {
			var t = Di(), i = R(t), a = L(i, !0), o = z(a), s = (e) => {
				var t = Ar();
				B((e) => K(t, e), [() => Q("cp.linkedSuffix", { token: l() })]), G(e, t);
			}, c = /* @__PURE__ */ P(() => l());
			q(o, (e) => {
				H(c) && e(s);
			}), M(i);
			var u = z(i, 2);
			Vr(u, 21, r, ([e, t]) => e, (e, t) => {
				var r = /* @__PURE__ */ P(() => m(H(t), 2));
				let i = () => H(r)[0], a = () => H(r)[1];
				var o = Ei();
				let s;
				B((e) => {
					s = Qr(o, 1, "cp-token svelte-zxiloo", null, s, { active: n() === i() }), ei(o, `background: ${a() ?? ""}`), Z(o, "title", e);
				}, [() => Q("cp.tokenTitle", { name: i() })]), U("click", o, () => ae(i(), a())), G(e, o);
			}), M(u), B((e) => K(a, e), [() => Q("cp.themeColors")]), G(e, t);
		};
		q(w, (e) => {
			r().length && e(T);
		});
		var E = z(w, 2), ee = L(E), ne = z(ee);
		M(E);
		var re = z(E, 2), ie = (e) => {
			var t = ki();
			Vr(t, 20, () => H(d), (e) => e, (e, t) => {
				var n = Oi(), r = L(n), i = z(r, 2);
				M(n), B((e) => {
					ei(r, `background: ${t ?? ""}`), Z(r, "title", t), Z(i, "title", e);
				}, [() => Q("cp.removeSaved")]), U("click", r, () => fe(t)), U("click", i, () => O(t)), G(e, n);
			}), M(t), G(e, t);
		};
		q(re, (e) => {
			H(d).length && e(ie);
		});
		var me = z(re, 2), k = (e) => {
			var t = ji(), n = R(t), r = L(n, !0);
			M(n);
			var i = z(n, 2);
			Vr(i, 20, () => H(u), (e) => e, (e, t) => {
				var n = Ai();
				B(() => {
					ei(n, `background: ${t ?? ""}`), Z(n, "title", t);
				}), U("click", n, () => fe(t)), G(e, n);
			}), M(i), B((e) => K(r, e), [() => Q("common.recent")]), G(e, t);
		};
		q(me, (e) => {
			H(u).length && e(k);
		}), M(t), B((e, n, r, c, l) => {
			ei(t, `top: ${H(_).top ?? ""}px; left: ${H(_).left ?? ""}px`), ei(i, `background-image: linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent); background-color: hsl(${H(v) ?? ""}, 100%, 50%)`), ei(a, `left: ${H(y) * 100}%; top: ${(1 - H(b)) * 100}%`), X(o, H(v)), X(s, e), Z(s, "title", n), ei(s, `background: linear-gradient(to right, transparent, ${r ?? ""}), repeating-conic-gradient(rgb(255 255 255 / 35%) 0 25%, rgb(0 0 0 / 35%) 0 50%) 0 0 / 10px 10px`), ei(f, `background: ${H(S) ?? ""}`), X(p, H(S)), K(ee, `${c ?? ""} `), Z(ne, "title", l);
		}, [
			() => Math.round(H(x) * 100),
			() => Q("cp.alpha"),
			() => D(),
			() => Q("cp.saved"),
			() => Q("cp.saveTitle")
		]), U("click", t, (e) => e.preventDefault()), U("pointerdown", i, oe), U("input", o, (e) => {
			I(v, Number(e.target.value), !0), te();
		}), U("input", s, (e) => {
			I(x, Number(e.target.value) / 100), te();
		}), U("change", p, se), U("click", ne, pe), G(e, t);
	};
	q(_e, (e) => {
		H(g) && e(ve);
	}), M(me), pi(me, (e) => I(h, e), () => H(h)), B((e, t, n) => {
		A = Qr(k, 1, "cp-swatch svelte-zxiloo", null, A, e), ei(k, `background: ${t ?? ""}`), Z(k, "title", n), Z(k, "aria-label", i());
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
	]), U("click", k, () => H(g) ? ie() : re()), G(e, me), We();
}
Cr([
	"click",
	"pointerdown",
	"input",
	"change"
]);
//#endregion
//#region ../template/assets/engine/imageTools.js
var Fi = 1600, Ii = .82, Li = .6;
async function Ri(e, t = Fi) {
	if (Bi(e)) return Vi(await e.text());
	let n = await createImageBitmap(e), r = Math.min(1, t / Math.max(n.width, n.height)), i = Math.round(n.width * r), a = Math.round(n.height * r), o = document.createElement("canvas");
	o.width = i, o.height = a, o.getContext("2d").drawImage(n, 0, 0, i, a), n.close();
	let s = (e) => new Promise((t) => o.toBlob(t, "image/webp", e)), c = await s(Ii);
	return c.size > 4e5 && (c = await s(Li)), {
		dataUrl: await new Promise((e) => {
			let t = new FileReader();
			t.onload = () => e(t.result), t.readAsDataURL(c);
		}),
		bytes: c.size,
		width: i,
		height: a
	};
}
var zi = "image/svg+xml";
function Bi(e) {
	return e.type === zi || /\.svg$/i.test(e.name || "");
}
function Vi(e) {
	let t = String(e ?? "");
	if (!/<svg[\s>]/i.test(t)) throw Error("Ugyldig SVG");
	if (/<\s*script[\s>]/i.test(t) || /<\s*foreignObject[\s>]/i.test(t) || /\son[a-z]+\s*=/i.test(t) || /javascript:/i.test(t)) throw Error("SVG-en inneholder skript eller hendelser og kan ikke brukes");
	let n = new Blob([t]).size, r = `data:${zi};base64,${btoa(unescape(encodeURIComponent(t)))}`, i = t.match(/<svg\b[^>]*>/i)?.[0] ?? "", a = i.match(/viewBox\s*=\s*["']\s*([-\d.]+(?:[\s,]+[-\d.]+){3})\s*["']/i)?.[1]?.split(/[\s,]+/).map(Number);
	return {
		dataUrl: r,
		bytes: n,
		width: a?.length === 4 ? a[2] : Number.parseFloat(i.match(/\bwidth\s*=\s*["']?([\d.]+)/i)?.[1]) || 0,
		height: a?.length === 4 ? a[3] : Number.parseFloat(i.match(/\bheight\s*=\s*["']?([\d.]+)/i)?.[1]) || 0
	};
}
function Hi(e, t, n = .04) {
	let r = String(e ?? "");
	if (!t || !(t.width > 0) || !(t.height > 0)) return r;
	let i = r.match(/<svg\b[^>]*>/i)?.[0];
	if (!i) return r;
	let a = (e) => Math.round(e * 1e3) / 1e3, o = Math.max(t.width, t.height) * Math.max(0, n), s = a(t.x - o), c = a(t.y - o), l = a(t.width + 2 * o), u = a(t.height + 2 * o), d = i.replace(/\sviewBox\s*=\s*["'][^"']*["']/i, "").replace(/\swidth\s*=\s*["'][^"']*["']/i, "").replace(/\sheight\s*=\s*["'][^"']*["']/i, "").replace(/<svg\b/i, `<svg viewBox="${s} ${c} ${l} ${u}" width="${l}" height="${u}"`);
	return r.replace(i, d);
}
function Ui(e) {
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
function Wi(e) {
	return /^data:image\/svg\+xml[;,]/.test(e || "") ? "svg" : "webp";
}
function Gi(e) {
	return e.replace(/\.[^.]+$/, "").toLowerCase().replaceAll("æ", "ae").replaceAll("ø", "o").replaceAll("å", "a").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) || "bilde";
}
function Ki(e) {
	let t = 5381;
	for (let n = 0; n < e.length; n++) t = (t << 5) + t + e.charCodeAt(n) >>> 0;
	return t.toString(16).padStart(8, "0");
}
//#endregion
//#region ../template/assets/engine/glyphs.js
var qi = "urd-recent-glyphs", Ji = [
	["Symboler", "★ ☆ ✦ ✧ ✩ ✪ ✫ ✭ ✮ ✯ ✵ ✳ ✴ ❖ ❋ ✿ ❀ ❁ ✾ ❃ ☘ ◆ ◇ ● ○ ◎ ■ □ ▣ ▲ △ ▼ ▽ ⬡ ⬢ ♦ ♠ ♣ ♥ ♡ ✓ ✔ ✕ ✖ ✗ ✘ ✚ ✜ ☀ ☾ ♪ ♫ ♬ ☮ ☯ ⚜ ⚓ ⚡ ☂ ✂ ✏ ✒ ✉ ☎ ⌛ ⏳ ♻ ⚠ ☑ ⚙ § © ® ™ ° ± × ÷ ∞ ≈ ≠ ≤ ≥ € £ ¥ • ‣ ⁂"],
	["Piler", "→ ← ↑ ↓ ↔ ↕ ↗ ↘ ↙ ↖ ⇒ ⇐ ⇑ ⇓ ⇔ ➜ ➤ ➔ ↩ ↪ ⤴ ⤵ ↺ ↻ ⟲ ⟳ « » ‹ ›"],
	["Smilefjes", "😀 😃 😄 😁 😆 😅 😂 🙂 😉 😊 😇 🥰 😍 🤩 😘 😋 😜 🤪 😎 🥳 😏 😌 😴 🤔 🤗 🤭 🙃 😢 😭 😤 😡 🤯 😱 🥺 😬 🤓 🫠 🫡 🫶"],
	["Gester og folk", "👍 👎 👏 🙌 🤝 👋 ✌ 🤘 🤞 💪 🙏 👀 🧠 👶 🧒 🧑 🧓 👥 👤 🗣 🏃 🚶 🧍 💃 🕺 🧑‍🤝‍🧑"],
	["Natur", "🌞 🌝 🌙 ⭐ 🌟 ✨ ☁ 🌈 🔥 💧 🌊 ❄ ⛄ 🌸 🌼 🌻 🌹 🌷 🌱 🌲 🌳 🍀 🍁 🍂 🐝 🦋 🐶 🐱 🐦 🦉 🐟 🐢 🌍 🏔 🏕"],
	["Mat og drikke", "☕ 🍵 🥤 🍺 🍷 🥂 🍰 🎂 🧁 🍪 🍩 🍕 🌮 🍔 🍟 🥗 🍎 🍊 🍋 🍇 🍓 🫐 🥕 🌽 🍞 🥐 🧀 🍿 🍦 🍫"],
	["Aktivitet", "⚽ 🏀 🏐 🎾 🏓 🏸 ⛷ 🏂 🚴 🏊 🎮 🎲 ♟ 🎯 🎳 🎣 🥾 ⛺ 🎪 🎭 🎨 🎬 🎤 🎧 🎸 🎹 🥁 🎻 📚 ✈ 🚗 🚲 ⛵ 🚀 🏋 🧘"],
	["Objekter", "💡 🔔 📣 📢 📌 📍 📅 ⏰ 🔑 🔒 🔓 🛠 🔧 🔨 🧰 📦 📫 📧 📱 💻 🖥 🖨 📷 📸 🎥 📺 🔍 🔎 📎 📏 📐 📝 📄 📋 📁 💾 🧾 💰 💳 🪙 🎁 🎈 🎉 🎊 🏆 🥇 🥈 🥉 🏅 🚩 🏁 🔗 🧭 🗺 🧲 🧪 🔬 🔭 💊 🩺 🛡 🕯 🪧 🖼"],
	["Hjerter", "❤ 🧡 💛 💚 💙 💜 🖤 🤍 🤎 💗 💓 💕 💖 💘 💝 💞 💟"]
];
function Yi(e, t) {
	return [t, ...(Array.isArray(e) ? e : []).filter((e) => e !== t)].slice(0, 16);
}
function Xi() {
	try {
		let e = JSON.parse(localStorage.getItem("urd-recent-glyphs") ?? "[]");
		return Array.isArray(e) ? e : [];
	} catch {
		return [];
	}
}
function Zi(e) {
	let t = Yi(Xi(), e);
	try {
		localStorage.setItem(qi, JSON.stringify(t));
	} catch {}
	return t;
}
//#endregion
//#region ../template/assets/engine/icons.js
var Qi = "fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"", $i = "fill=\"currentColor\" stroke=\"none\"", ea = {
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
}, ta = [
	["Sosiale medier", [
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
	["Kommunikasjon", [
		"mail",
		"phone",
		"smartphone",
		"chat",
		"send",
		"globe",
		"rss"
	]],
	["Sted og tid", [
		"map-pin",
		"map",
		"home",
		"clock",
		"calendar"
	]],
	["Symboler", [
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
	["Piler", [
		"arrow-right",
		"arrow-left",
		"arrow-up",
		"arrow-down",
		"external-link",
		"download",
		"share"
	]]
];
function na(e) {
	let t = typeof e == "string" ? ea[e] : null;
	return t ? `<svg viewBox="0 0 24 24" width="100%" height="100%" ${t.fill ? $i : Qi} aria-hidden="true" focusable="false">${t.body}</svg>` : null;
}
//#endregion
//#region src/lib/GlyphPicker.svelte
var ra = /* @__PURE__ */ W("<img class=\"gp-own svelte-15ln1c3\"/>"), ia = /* @__PURE__ */ W("<span class=\"gp-svg svelte-15ln1c3\"></span>"), aa = /* @__PURE__ */ W("<button type=\"button\" class=\"gp-cell svelte-15ln1c3\"> </button>"), oa = /* @__PURE__ */ W("<div class=\"gp-group svelte-15ln1c3\"> </div> <div class=\"gp-grid svelte-15ln1c3\"></div>", 1), sa = /* @__PURE__ */ W("<button type=\"button\"><span class=\"gp-svg svelte-15ln1c3\"></span></button>"), ca = /* @__PURE__ */ W("<button type=\"button\"> </button>"), la = /* @__PURE__ */ W("<div class=\"gp-group svelte-15ln1c3\"> </div> <button type=\"button\" class=\"ghost gp-upload svelte-15ln1c3\"> </button> <input type=\"file\" accept=\"image/*\" hidden=\"\"/> <p class=\"gp-hint svelte-15ln1c3\"> </p>", 1), ua = /* @__PURE__ */ W("<div class=\"gp-pop svelte-15ln1c3\"><!> <!> <!> <!></div>"), da = /* @__PURE__ */ W("<span class=\"gp svelte-15ln1c3\"><button type=\"button\" class=\"gp-swatch svelte-15ln1c3\"><!></button> <!></span>");
function fa(e, t) {
	Ue(t, !0);
	let n = mi(t, "value", 3, "★"), r = mi(t, "icon", 3, null), i = mi(t, "image", 3, null), a = mi(t, "label", 19, () => Q("gp.pickGlyph")), o = /* @__PURE__ */ F(nn([])), s = /* @__PURE__ */ F(null), c = /* @__PURE__ */ F(null), l = /* @__PURE__ */ F(!1), u = /* @__PURE__ */ F(nn({
		top: 0,
		left: 0
	}));
	function d() {
		I(o, Xi(), !0);
		let e = H(s).getBoundingClientRect(), t = Math.max(8, Math.min(e.right - 292, window.innerWidth - 292 - 8)), n = e.bottom + 380 + 8 > window.innerHeight ? Math.max(8, e.top - 380 - 8) : e.bottom + 6;
		I(u, {
			top: n,
			left: t
		}, !0), I(l, !0);
	}
	function f(e) {
		Zi(e), t.onpick?.(e), I(l, !1);
	}
	function p(e) {
		t.onicon?.(e), I(l, !1);
	}
	async function h(e) {
		let n = e.target.files?.[0];
		if (e.target.value = "", !n) return;
		let r = await Ri(n, 256);
		t.onimage?.(r.dataUrl), I(l, !1);
	}
	xn(() => {
		if (!H(l)) return;
		let e = (e) => {
			H(s) && !H(s).contains(e.target) && I(l, !1);
		}, t = (e) => {
			e.key === "Escape" && I(l, !1);
		}, n = (e) => {
			H(s) && e.target instanceof Node && !H(s).contains(e.target) && I(l, !1);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t, !0), document.addEventListener("scroll", n, !0), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t, !0), document.removeEventListener("scroll", n, !0);
		};
	});
	var g = da(), _ = L(g), v = L(_), y = (e) => {
		var t = ra();
		B((e) => {
			Z(t, "src", i()), Z(t, "alt", e);
		}, [() => Q("gp.ownIcon")]), G(e, t);
	}, b = (e) => {
		var t = ia();
		J(t, () => na(r()), !0), M(t), G(e, t);
	}, x = (e) => {
		var t = Ar();
		B(() => K(t, n() || "★")), G(e, t);
	};
	q(v, (e) => {
		i() ? e(y) : r() && ea[r()] ? e(b, 1) : e(x, -1);
	}), M(_);
	var S = z(_, 2), C = (e) => {
		var i = ua(), a = L(i), s = (e) => {
			var t = oa(), n = R(t), r = L(n, !0);
			M(n);
			var i = z(n, 2);
			Vr(i, 20, () => H(o), (e) => e, (e, t) => {
				var n = aa(), r = L(n, !0);
				M(n), B(() => K(r, t)), U("click", n, () => f(t)), G(e, n);
			}), M(i), B((e) => K(r, e), [() => Q("common.recent")]), G(e, t);
		};
		q(a, (e) => {
			H(o).length && e(s);
		});
		var l = z(a, 2), d = (e) => {
			var t = jr();
			Vr(R(t), 17, () => ta, ([e, t]) => e, (e, t) => {
				var n = /* @__PURE__ */ P(() => m(H(t), 2));
				let i = () => H(n)[0], a = () => H(n)[1];
				var o = oa(), s = R(o), c = L(s, !0);
				M(s);
				var l = z(s, 2);
				Vr(l, 20, a, (e) => e, (e, t) => {
					var n = sa();
					let i;
					var a = L(n);
					J(a, () => na(t), !0), M(a), M(n), B(() => {
						i = Qr(n, 1, "gp-cell gp-cell-icon svelte-15ln1c3", null, i, { active: t === r() }), Z(n, "title", ea[t].label);
					}), U("click", n, () => p(t)), G(e, n);
				}), M(l), B(() => K(c, i())), G(e, o);
			}), G(e, t);
		};
		q(l, (e) => {
			t.onicon && e(d);
		});
		var g = z(l, 2);
		Vr(g, 17, () => Ji, ([e, t]) => e, (e, t) => {
			var r = /* @__PURE__ */ P(() => m(H(t), 2));
			let i = () => H(r)[0], a = () => H(r)[1];
			var o = oa(), s = R(o), c = L(s, !0);
			M(s);
			var l = z(s, 2);
			Vr(l, 20, () => a().split(" "), (e) => e, (e, t) => {
				var r = ca();
				let i;
				var a = L(r, !0);
				M(r), B(() => {
					i = Qr(r, 1, "gp-cell svelte-15ln1c3", null, i, { active: t === n() }), K(a, t);
				}), U("click", r, () => f(t)), G(e, r);
			}), M(l), B(() => K(c, i())), G(e, o);
		});
		var _ = z(g, 2), v = (e) => {
			var t = la(), n = R(t), r = L(n, !0);
			M(n);
			var i = z(n, 2), a = L(i, !0);
			M(i);
			var o = z(i, 2);
			pi(o, (e) => I(c, e), () => H(c));
			var s = z(o, 2), l = L(s, !0);
			M(s), B((e, t, n) => {
				K(r, e), K(a, t), K(l, n);
			}, [
				() => Q("gp.ownIcon"),
				() => Q("gp.upload"),
				() => Q("gp.uploadHint")
			]), U("click", i, () => H(c).click()), U("change", o, h), G(e, t);
		};
		q(_, (e) => {
			t.onimage && e(v);
		}), M(i), B(() => ei(i, `top: ${H(u).top ?? ""}px; left: ${H(u).left ?? ""}px`)), G(e, i);
	};
	q(S, (e) => {
		H(l) && e(C);
	}), M(g), pi(g, (e) => I(s, e), () => H(s)), B(() => {
		Z(_, "title", a()), Z(_, "aria-label", a());
	}), U("click", _, () => H(l) ? I(l, !1) : d()), G(e, g), We();
}
Cr(["click", "change"]);
//#endregion
//#region src/lib/previewBridge.js
function pa(e, t = {}) {
	let n = (e) => {
		if (e.origin !== location.origin) return;
		let n = e.data;
		n?.type === "urd-edit" && t.onEdit?.(n), n?.type === "urd-move" && t.onMove?.(n), n?.type === "urd-grow" && t.onGrow?.(n), n?.type === "urd-delete" && t.onDelete?.(n), n?.type === "urd-add-section" && t.onAddSection?.(n), n?.type === "urd-move-section" && t.onMoveSection?.(n), n?.type === "urd-delete-section" && t.onDeleteSection?.(n), n?.type === "urd-section-size" && t.onSectionSize?.(n), n?.type === "urd-undo" && t.onUndo?.(n), n?.type === "urd-select-section" && t.onSelectSection?.(n), n?.type === "urd-select-block" && t.onSelectBlock?.(n), n?.type === "urd-block-menu" && t.onBlockMenu?.(n), n?.type === "urd-plugin-blocks" && t.onPluginBlocks?.(n), n?.type === "urd-ready" && t.onReady?.(n), n?.type === "urd-navigate" && t.onNavigate?.(n), n?.type === "urd-add-block" && t.onAddBlock?.(n), n?.type === "urd-add-blocks" && t.onAddBlocks?.(n), n?.type === "urd-request-block" && t.onRequestBlock?.(n), n?.type === "urd-move-block-section" && t.onMoveBlockSection?.(n), n?.type === "urd-mobile-manual" && t.onMobileManual?.(n), n?.type === "urd-mobile-auto" && t.onMobileAuto?.(n), n?.type === "urd-review-done" && t.onReviewDone?.(n), n?.type === "urd-block-flag" && t.onBlockFlag?.(n), n?.type === "urd-collection-edit" && t.onCollectionEdit?.(n), n?.type === "urd-nav-width" && t.onNavWidth?.(n);
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
function ma(e, t) {
	return !(e > 0) || !(t > 0) ? 1 : e / t;
}
function ha(e, t, n) {
	let r = n === "full" ? 1 : Math.min(1, ma(e, t));
	return Math.max(.1, r);
}
//#endregion
//#region src/lib/Dropdown.svelte
var ga = /* @__PURE__ */ W("<button type=\"button\"> </button>"), _a = /* @__PURE__ */ W("<div class=\"dd-pop svelte-vtocc6\"></div>"), va = /* @__PURE__ */ W("<span class=\"dd svelte-vtocc6\"><button type=\"button\" class=\"dd-btn svelte-vtocc6\"><span class=\"dd-value svelte-vtocc6\"> </span> <span class=\"dd-caret svelte-vtocc6\"> </span></button> <!></span>");
function $(e, t) {
	Ue(t, !0);
	let n = mi(t, "value", 3, null), r = mi(t, "options", 19, () => []), i = mi(t, "title", 3, null), a = mi(t, "disabled", 3, !1), o = /* @__PURE__ */ F(!1), s = /* @__PURE__ */ F(null), c = /* @__PURE__ */ F(nn({
		top: 0,
		left: 0,
		width: 160
	})), l = () => r().find(([e]) => `${e ?? ""}` == `${n() ?? ""}`)?.[1] ?? "";
	function u() {
		let e = H(s).getBoundingClientRect(), t = Math.min(320, r().length * 32 + 12), n = Math.max(e.width, 160), i = e.bottom + t + 8 <= window.innerHeight;
		I(c, {
			top: i ? e.bottom + 4 : Math.max(8, e.top - t - 4),
			left: Math.max(8, Math.min(e.left, window.innerWidth - n - 8)),
			width: n
		}, !0);
	}
	function d() {
		if (!a()) {
			if (H(o)) {
				I(o, !1);
				return;
			}
			u(), I(o, !0);
		}
	}
	function f(e) {
		I(o, !1), t.onchange?.(e);
	}
	xn(() => {
		if (!H(o)) return;
		let e = (e) => {
			H(s) && !H(s).contains(e.target) && I(o, !1);
		}, t = (e) => {
			e.key === "Escape" && I(o, !1);
		}, n = (e) => {
			H(s) && e.target instanceof Node && !H(s).contains(e.target) && u();
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t, !0), document.addEventListener("scroll", n, !0), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t, !0), document.removeEventListener("scroll", n, !0);
		};
	});
	var p = va(), h = L(p), g = L(h), _ = L(g, !0);
	M(g);
	var v = z(g, 2), y = L(v, !0);
	M(v), M(h);
	var b = z(h, 2), x = (e) => {
		var t = _a();
		Vr(t, 21, r, ([e, t]) => `${e ?? ""}`, (e, t) => {
			var r = /* @__PURE__ */ P(() => m(H(t), 2));
			let i = () => H(r)[0], a = () => H(r)[1];
			var o = ga();
			let s;
			var c = L(o, !0);
			M(o), B(() => {
				s = Qr(o, 1, "dd-opt svelte-vtocc6", null, s, { valgt: `${i() ?? ""}` == `${n() ?? ""}` }), K(c, a());
			}), U("click", o, () => f(i())), G(e, o);
		}), M(t), B(() => ei(t, `top: ${H(c).top ?? ""}px; left: ${H(c).left ?? ""}px; min-width: ${H(c).width ?? ""}px`)), G(e, t);
	};
	q(b, (e) => {
		H(o) && e(x);
	}), M(p), pi(p, (e) => I(s, e), () => H(s)), B((e) => {
		Z(h, "title", i()), h.disabled = a(), K(_, e), K(y, H(o) ? "▴" : "▾");
	}, [() => l()]), U("click", h, d), G(e, p), We();
}
Cr(["click"]);
//#endregion
//#region src/lib/IconEditor.svelte
var ya = /* @__PURE__ */ W("<div class=\"ie-overlay svelte-e7sog7\" role=\"dialog\" aria-modal=\"true\"><div class=\"ie-card svelte-e7sog7\"><h2 class=\"svelte-e7sog7\"> </h2> <div class=\"ie-stage svelte-e7sog7\"><canvas class=\"ie-canvas svelte-e7sog7\"></canvas> <p class=\"ie-hint svelte-e7sog7\"> </p></div> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"1\" max=\"3\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0.3\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0.3\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <span class=\"ie-tools svelte-e7sog7\"><button type=\"button\" class=\"ghost svelte-e7sog7\"> </button> <button type=\"button\" class=\"ghost svelte-e7sog7\"> </button></span> <span class=\"ie-actions svelte-e7sog7\"><button type=\"button\" class=\"ghost svelte-e7sog7\"> </button> <button type=\"button\" class=\"primary svelte-e7sog7\"> </button></span></div></div>");
function ba(e, t) {
	Ue(t, !0);
	let n = mi(t, "image", 3, ""), r = /* @__PURE__ */ F(null), i = /* @__PURE__ */ F(null), a = /* @__PURE__ */ F(1), o = /* @__PURE__ */ F(.5), s = /* @__PURE__ */ F(.5), c = /* @__PURE__ */ F(1), l = /* @__PURE__ */ F(1), u = /* @__PURE__ */ F(1);
	xn(() => {
		if (!n()) return;
		let e = new Image();
		e.onload = () => {
			I(i, e, !0);
		}, e.src = n();
	});
	function d(e, t) {
		if (e.clearRect(0, 0, t, t), !H(i)) return;
		e.filter = `brightness(${H(c)}) contrast(${H(l)}) saturate(${H(u)})`;
		let n = Math.max(t / H(i).width, t / H(i).height) * H(a), r = H(i).width * n, d = H(i).height * n, f = t / 2 - H(o) * r, p = t / 2 - H(s) * d;
		f = Math.min(0, Math.max(t - r, f)), p = Math.min(0, Math.max(t - d, p)), e.drawImage(H(i), f, p, r, d), e.filter = "none";
	}
	xn(() => {
		H(i), H(a), H(o), H(s), H(c), H(l), H(u), H(r) && d(H(r).getContext("2d"), 220);
	});
	function f(e) {
		if (!H(i)) return;
		e.preventDefault();
		let t = e.clientX, n = e.clientY, r = Math.max(220 / H(i).width, 220 / H(i).height) * H(a), c = H(i).width * r, l = H(i).height * r, u = (e) => {
			I(o, Math.min(1, Math.max(0, H(o) - (e.clientX - t) / c)), !0), I(s, Math.min(1, Math.max(0, H(s) - (e.clientY - n) / l)), !0), t = e.clientX, n = e.clientY;
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
	var h = ya(), g = L(h), _ = L(g), v = L(_, !0);
	M(_);
	var y = z(_, 2), b = L(y);
	Z(b, "width", 220), Z(b, "height", 220), pi(b, (e) => I(r, e), () => H(r));
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
	var O = z(ue, 2);
	Y(O);
	var me = z(O, 2), k = L(me), A = L(k, !0);
	M(k);
	var he = z(k, 2), ge = L(he, !0);
	M(he), M(me);
	var _e = z(me, 2), ve = L(_e), ye = L(ve, !0);
	M(ve);
	var be = z(ve, 2), xe = L(be, !0);
	M(be), M(_e), M(g), M(h), B((e, t, n, r, i, a, o, s, c, l, u, d, f, p, m) => {
		K(v, e), Z(b, "title", t), K(S, n), K(w, `${r ?? ""} `), K(E, `${i ?? ""}x`), K(te, `${a ?? ""} `), K(re, `${o ?? ""}%`), K(oe, `${s ?? ""} `), K(ce, `${c ?? ""}%`), K(de, `${l ?? ""} `), K(pe, `${u ?? ""}%`), K(A, d), K(ge, f), K(ye, p), K(xe, m);
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
	]), U("pointerdown", b, f), li(D, () => H(a), (e) => I(a, e)), li(ie, () => H(c), (e) => I(c, e)), li(le, () => H(l), (e) => I(l, e)), li(O, () => H(u), (e) => I(u, e)), U("click", k, () => I(u, 0)), U("click", he, p), U("click", ve, () => t.oncancel?.()), U("click", be, m), G(e, h), We();
}
Cr(["pointerdown", "click"]);
//#endregion
//#region ../template/assets/engine/migrate.js
function xa(e, t) {
	if (!t) return {
		ok: !1,
		version: e.version,
		props: e.props,
		placeholder: "unknown-type"
	};
	if (e.version > t.version) return {
		ok: !1,
		version: e.version,
		props: e.props,
		placeholder: "newer-than-engine"
	};
	let n = e.version, r = e.props;
	for (; n < t.version;) {
		let i = t.migrations && t.migrations[n];
		if (typeof i != "function") return {
			ok: !1,
			version: e.version,
			props: e.props,
			placeholder: "missing-migration"
		};
		r = i(structuredClone(r)), n++;
	}
	return {
		ok: !0,
		version: n,
		props: r
	};
}
var Sa = (e) => Math.round(e * 100) / 100;
function Ca(e) {
	return e ? typeof e.size == "number" ? e : {
		size: Math.max(2, e.rowHeight ?? 16),
		snap: e.snap !== !1
	} : null;
}
var wa = {
	1: (e, t) => {
		for (let n of e.sections ?? []) {
			let e = n.grid ?? t?.grid, r = typeof e?.columns == "number" ? e : {
				columns: 24,
				rowHeight: e?.size ?? e?.rowHeight ?? 8
			};
			for (let e of n.blocks ?? []) for (let t of ["desktop", "mobile"]) {
				let n = e.frames?.[t];
				n && (e.frames[t] = {
					...n,
					x: Sa(n.x * 100 / r.columns),
					w: Sa(n.w * 100 / r.columns),
					y: n.y * r.rowHeight,
					h: n.h * r.rowHeight
				});
			}
		}
		return e;
	},
	2: (e) => {
		for (let t of e.sections ?? []) t.grid &&= Ca(t.grid);
		return e;
	}
}, Ta = { 1: (e) => (e.grid = Ca(e.grid) ?? {
	size: 16,
	snap: !0
}, e) };
function Ea(e) {
	let t = structuredClone(e), n = t.schemaVersion ?? 1;
	for (; n < 2;) {
		let r = Ta[n];
		if (typeof r != "function") return e;
		t = r(t) ?? t, n++, t.schemaVersion = n;
	}
	return t;
}
function Da(e, t) {
	let n = structuredClone(e), r = n.schemaVersion ?? 1;
	for (; r < 3;) {
		let i = wa[r];
		if (typeof i != "function") return e;
		n = i(n, t) ?? n, r++, n.schemaVersion = r;
	}
	return n;
}
//#endregion
//#region ../template/assets/engine/plugins.js
function Oa(e) {
	let t = /^(\d+)\.(\d+)\.(\d+)$/.exec(String(e).trim());
	return t ? [
		Number(t[1]),
		Number(t[2]),
		Number(t[3])
	] : null;
}
var ka = (e, t) => e[0] - t[0] || e[1] - t[1] || e[2] - t[2];
function Aa(e, t) {
	let n = Oa(e);
	if (!n || typeof t != "string" || !t.trim()) return !1;
	for (let e of t.trim().split(/\s+/)) {
		let t = /^(>=|<=|>|<|=|\^|~)?(\d+\.\d+\.\d+)$/.exec(e);
		if (!t) return !1;
		let r = t[1] ?? "=", i = Oa(t[2]), a = ka(n, i);
		if (!(r === ">=" ? a >= 0 : r === ">" ? a > 0 : r === "<=" ? a <= 0 : r === "<" ? a < 0 : r === "^" ? i[0] === 0 ? n[0] === 0 && n[1] === i[1] && a >= 0 : n[0] === i[0] && a >= 0 : r === "~" ? n[0] === i[0] && n[1] === i[1] && a >= 0 : a === 0)) return !1;
	}
	return !0;
}
var ja = /^[a-z0-9][a-z0-9-]*$/;
function Ma(e) {
	let t = [];
	return !e || typeof e != "object" ? ["manifestet er ikke et objekt"] : (ja.test(e.id ?? "") || t.push("id mangler eller er ugyldig"), (typeof e.name != "string" || !e.name) && t.push("name mangler"), Oa(e.version ?? "") || t.push("version er ikke semver"), (typeof e.requiresEngine != "string" || !e.requiresEngine) && t.push("requiresEngine mangler"), (typeof e.entry != "string" || !e.entry.endsWith(".js")) && t.push("entry mangler eller er ikke en .js-fil"), (!e.provides || typeof e.provides != "object") && t.push("provides mangler"), t);
}
//#endregion
//#region ../template/assets/engine/sections/presets.js
function Na(e) {
	return typeof crypto < "u" && crypto.randomUUID ? `${e}-${crypto.randomUUID().slice(0, 8)}` : `${e}-${[...crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(4))].map((e) => e.toString(16).padStart(2, "0")).join("")}`;
}
//#endregion
//#region ../template/assets/engine/theme.js
function Pa(e, t) {
	let n = e.tokens || {}, r = e.scheme === "dark" ? "dark" : "light";
	if (!e.alt?.tokens || t === r) return n;
	let i = {};
	for (let t of /* @__PURE__ */ new Set([...Object.keys(n), ...Object.keys(e.alt.tokens)])) i[t] = {
		...n[t],
		...e.alt.tokens[t]
	};
	return i;
}
var Fa = /^[a-zA-Z0-9#%.,()'"\s+\-*/]+$/;
function Ia(e) {
	return typeof e == "string" && Fa.test(e) && !/url\(|\/\*|\*\/|expression/i.test(e);
}
function La(e) {
	let t = e.tokens || {}, n = Pa(e, "light"), r = Pa(e, "dark"), i = e.scheme === "dark" ? "dark" : "light", a = [], o = [], s = [], c = /* @__PURE__ */ new Set([
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
			Ia(c) && (a.push(`  --urd-${e}-${l}: ${c};`), i && a.push(`  --urd-base-${l}: ${c};`)), u !== d && (i && Ia(u) && Ia(d) ? o.push({
				name: l,
				lv: u,
				dv: d
			}) : !i && Ia(u) && Ia(d) && s.push({
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
function Ra(e) {
	return /^[a-z][a-z0-9-]*$/.test(e) ? `var(--urd-color-${e})` : e;
}
var za = {
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
}, Ba = {
	flate: "Flate",
	aksent: "Aksent",
	invers: "Invers"
};
[...new Set(Object.values(za).flatMap(Object.keys))];
function Va(e) {
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
function Ha(e, t) {
	let n = Va(e), r = Va(t);
	return n == null || r == null ? null : (Math.max(n, r) + .05) / (Math.min(n, r) + .05);
}
//#endregion
//#region ../template/assets/engine/backgrounds/color.js
var Ua = {
	version: 1,
	label: "Farge",
	defaults: () => ({
		value: "bg",
		opacity: 1
	}),
	migrations: {},
	render(e, t) {
		e.style.background = Ra(t.value), e.style.opacity = String(t.opacity ?? 1);
	}
}, Wa = {
	linear: [
		"pan",
		"pan-loop",
		"rotate"
	],
	radial: ["pulse", "orbit"]
};
function Ga(e) {
	let t = Array.isArray(e) && e.length ? e : [{ color: "#0b0e14" }, { color: "#1a1030" }], n = t.map((e) => Math.max(0, Number(e?.share) || 0)), r = n.reduce((e, t) => e + t, 0), i = r <= 0, a = i ? t.length : r, o = 0;
	return t.map((e, t) => {
		let r = i ? 1 : n[t], s = (o + r / 2) / a * 100;
		return o += r, {
			color: e?.color ?? "#0b0e14",
			at: Math.round(s * 100) / 100
		};
	});
}
function Ka(e) {
	let t = (e) => Math.round(e * 100) / 100, n = e[0]?.at ?? 0;
	return [...e.map((e) => ({
		color: e.color,
		at: t(e.at - n)
	})), {
		color: e[0]?.color ?? "#0b0e14",
		at: 100
	}];
}
function qa(e, t, n, r = .5) {
	let i = n % 360 * Math.PI / 180, a = (e) => Math.round(e * 100) / 100 || 0, o = (Math.abs(e * Math.sin(i)) + Math.abs(t * Math.cos(i))) / (1 - Math.min(Math.max(r, 0), .9));
	return {
		period: a(o),
		dx: a(Math.sin(i) * o),
		dy: a(-Math.cos(i) * o)
	};
}
function Ja(e, t, n) {
	return `repeating-linear-gradient(${t}deg, ${e.map((e) => `${Ra(e.color)} ${Math.round(e.at / 100 * n * 100) / 100}px`).join(", ")})`;
}
function Ya(e) {
	let t = e.kind === "radial" ? "radial" : "linear", n = (Wa[t] ?? []).includes(e.animation) ? e.animation : null, r = Ga(e.stops), i = r.map((e) => `${Ra(e.color)} ${e.at}%`).join(", "), a = {}, o;
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
					stops: Ka(r),
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
function Xa(e) {
	let t = Array.isArray(e) && e.length ? e : ["#0b0e14", "#1a1030"], n = (e) => t.length === 1 ? 0 : Math.round(e * 100 / (t.length - 1));
	return t.map((e, t) => e && typeof e == "object" ? {
		color: e.color ?? "#0b0e14",
		at: typeof e.at == "number" ? e.at : n(t)
	} : {
		color: e,
		at: n(t)
	});
}
function Za(e) {
	let t = [...Xa(e)].sort((e, t) => e.at - t.at), n = [
		0,
		...t.slice(0, -1).map((e, n) => (e.at + t[n + 1].at) / 2),
		100
	];
	return t.map((e, t) => ({
		color: e.color,
		share: Math.round((n[t + 1] - n[t]) * 10) / 10
	}));
}
var Qa = /* @__PURE__ */ new Set(), $a = !1;
function eo(e) {
	Qa.add(e), !($a || typeof window > "u") && ($a = !0, window.addEventListener("resize", () => {
		for (let e of [...Qa]) e() || Qa.delete(e);
	}));
}
var to = !1;
function no() {
	if (!to) {
		to = !0;
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
var ro = {
	version: 3,
	label: "Gradient",
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
	migrations: {
		1: (e) => ({
			...e,
			kind: "linear",
			x: .5,
			y: .5,
			stops: Xa(e.stops)
		}),
		2: (e) => ({
			kind: e.kind === "radial" ? "radial" : "linear",
			stops: Za(e.stops),
			angle: e.angle ?? 160,
			x: e.x ?? .5,
			y: e.y ?? .5,
			animation: e.animate ? e.kind === "radial" ? "orbit" : "pan" : "none",
			opacity: e.opacity ?? 1
		})
	},
	render(e, t) {
		let n = Ya(t);
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
					let e = qa(r, i, n.loop.angle, n.loop.maxShare);
					t.style.inset = `${-Math.ceil(e.period)}px`, t.style.background = Ja(n.loop.stops, n.loop.angle, e.period), t.style.setProperty("--urd-loop-dx", `${e.dx}px`), t.style.setProperty("--urd-loop-dy", `${e.dy}px`);
				}
				return !0;
			};
			requestAnimationFrame(r), eo(r);
			return;
		}
		if (n.runner) {
			e.classList.add("urd-bg-loop-host");
			let t = document.createElement("div");
			t.className = n.runner.className, t.style.background = n.runner.background, n.runner.left != null && (t.style.left = n.runner.left), n.runner.top != null && (t.style.top = n.runner.top), e.appendChild(t);
			return;
		}
		e.style.background = n.background, n.className && (e.classList.add(n.className), n.className === "urd-bg-rotate" && no());
	}
}, io = {
	version: 1,
	label: "Glød",
	defaults: () => ({
		x: .5,
		y: .3,
		color: "accent",
		radius: .5,
		opacity: .35
	}),
	migrations: {},
	render(e, t) {
		let n = Ra(t.color);
		e.style.background = `radial-gradient(circle at ${t.x * 100}% ${t.y * 100}%, ${n} 0%, transparent ${t.radius * 100}%)`, e.style.opacity = String(t.opacity ?? .35);
	}
}, ao = "url(\"data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22128%22%20height%3D%22128%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%222%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22128%22%20height%3D%22128%22%20filter%3D%22url(%23n)%22%2F%3E%3C%2Fsvg%3E\")", oo = {
	version: 1,
	label: "Korn",
	defaults: () => ({ opacity: .06 }),
	migrations: {},
	render(e, t) {
		e.style.backgroundImage = ao, e.style.backgroundRepeat = "repeat", e.style.opacity = String(t.opacity ?? .06);
	}
}, so = .4;
function co(e, t) {
	return `${(e ?? .5) * 100}% ${(t ?? .5) * 100}%`;
}
function lo(e, t) {
	return e === "contain" ? "contain" : e === "cover" ? "cover" : `${Math.max(0, t ?? 1) * 100}%`;
}
function uo(e) {
	let t = "-9999px";
	return e === "up" ? `inset(${t} 0 0 0)` : e === "down" ? `inset(0 0 ${t} 0)` : e === "both" ? `inset(${t} 0 ${t} 0)` : "inset(0)";
}
function fo(e, t, n, r = .18) {
	let i = Math.max(0, Math.min(1, n)) * so * t;
	return Math.round(Math.min(i, r * e));
}
function po(e, t, n, r, i) {
	let a = e + t / 2, o = (n / 2 - a) * Math.max(0, Math.min(1, r)) * so, s = i ?? fo(t, n, r);
	return Math.max(-s, Math.min(s, o)) || 0;
}
var mo = /* @__PURE__ */ new Set(), ho = !1, go = 0;
function _o() {
	go = 0;
	for (let e of [...mo]) e() || mo.delete(e);
}
function vo() {
	go ||= requestAnimationFrame(_o);
}
function yo(e) {
	mo.add(e), e(), !(ho || typeof window > "u") && (ho = !0, window.addEventListener("scroll", vo, { passive: !0 }), window.addEventListener("resize", vo, { passive: !0 }));
}
function bo(e, t, n, r) {
	let i = r === "cover" || r === "flislegg" || r === "repeat", a = e.closest(".urd-section") ?? e.parentElement?.closest(".urd-section") ?? e.parentElement, o = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
	e.style.willChange = "transform";
	let s = (t) => {
		e.style.top = `-${t}px`, e.style.bottom = `-${t}px`;
	}, c = () => {
		if (!e.isConnected) return !1;
		if (o || document.body.classList.contains("urd-mobile")) return s(n), e.style.transform = "", !0;
		let r = (a ?? e).getBoundingClientRect(), c = window.innerHeight || document.documentElement.clientHeight, l = fo(r.height, c, t, i ? .18 : .6);
		s(i ? Math.max(n, l) : n);
		let u = po(r.top, r.height, c, t, l);
		return e.style.transform = `translateY(${u.toFixed(1)}px)`, !0;
	};
	yo(c), typeof requestAnimationFrame == "function" && requestAnimationFrame(() => requestAnimationFrame(c));
}
function xo() {
	return typeof CSS < "u" && typeof CSS.supports == "function" && CSS.supports("animation-timeline", "view()");
}
var So = /* @__PURE__ */ new Set(), Co = !1, wo = 0;
function To() {
	wo = 0;
	for (let e of [...So]) e() || So.delete(e);
}
function Eo() {
	!wo && typeof requestAnimationFrame == "function" && (wo = requestAnimationFrame(To));
}
function Do(e) {
	So.add(e), e(), !(Co || typeof window > "u") && (Co = !0, window.addEventListener("resize", Eo, { passive: !0 }));
}
function Oo(e, t, n, r) {
	let i = r === "cover" || r === "flislegg" || r === "repeat", a = e.closest(".urd-section") ?? e.parentElement?.closest(".urd-section") ?? e.parentElement;
	e.style.willChange = "transform", e.classList.add("urd-parallax-css");
	let o = () => {
		if (!e.isConnected) return !1;
		let r = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches || document.body.classList.contains("urd-mobile"), o = (a ?? e).getBoundingClientRect(), s = window.innerHeight || document.documentElement.clientHeight, c = fo(o.height, s, t, i ? .18 : .6), l = i && !r ? Math.max(n, c) : n;
		return e.style.setProperty("--urd-px-shift", `${c}px`), e.style.top = `-${l}px`, e.style.bottom = `-${l}px`, !0;
	};
	Do(o), typeof requestAnimationFrame == "function" && requestAnimationFrame(() => requestAnimationFrame(o));
}
var ko = {
	version: 2,
	label: "Bilde",
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
	migrations: { 1: (e) => ({
		...e,
		parallax: e.parallax ?? 0
	}) },
	render(e, t) {
		if (!t.src) return;
		e.style.opacity = String(t.opacity ?? 1), e.style.clipPath = uo(t.bleed), e.style.zIndex = t.bleed === "down" || t.bleed === "both" ? "1" : "";
		let n = document.createElement("div");
		n.className = "urd-bg-image", n.style.position = "absolute", n.style.left = "0", n.style.right = "0", n.style.top = "0", n.style.bottom = "0";
		let r = t.fit === "flislegg" || t.fit === "repeat";
		n.style.backgroundImage = `url("${t.src}")`, n.style.backgroundSize = lo(t.fit, t.size), n.style.backgroundRepeat = r ? "repeat" : "no-repeat", n.style.backgroundPosition = co(t.x, t.y);
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
			xo() ? Oo(n, t.parallax, i, e) : bo(n, t.parallax, i, e);
		}
	}
};
//#endregion
//#region ../template/assets/engine/galleri-model.js
function Ao(e, t, n) {
	return !Number.isFinite(n) || n < 1 ? 0 : (((Number.isFinite(e) ? e : 0) + t) % n + n) % n;
}
function jo({ count: e = 0, reducedMotion: t = !1 } = {}) {
	return e >= 2 && !t;
}
function Mo(e, { min: t = 2, fallback: n = 5 } = {}) {
	let r = Number(e);
	return !Number.isFinite(r) || r <= 0 ? n : Math.max(t, r);
}
//#endregion
//#region ../template/assets/engine/backgrounds/bildegalleri.js
var No = {
	version: 1,
	label: "Bildegalleri",
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
			e.style.backgroundImage = `url("${n.src}")`, e.style.backgroundSize = lo(t.fit), e.style.backgroundRepeat = "no-repeat", e.style.backgroundPosition = co(n.x, n.y);
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
		if (!jo({
			count: n.length,
			reducedMotion: s
		})) return;
		let c = document.createElement("div");
		c.className = "urd-bg-slide", e.appendChild(c);
		let l = 0, u = o, d = Math.max(Mo(t.interval, { fallback: 6 }), r + .5) * 1e3, f = setInterval(() => {
			if (!e.isConnected) {
				clearInterval(f);
				return;
			}
			if (document.hidden) return;
			let t = Ao(l, 1, n.length), r = new Image();
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
//#region ../template/assets/engine/footer-thumb.js
function Po(e = {}) {
	let t = "#2fd6b6", n = "#5c6b64", r = e.mega ? "#16221d" : "#0e1512", i = e.cols ?? 0, a = e.social ?? 0, o = `<svg viewBox="0 0 160 80" preserveAspectRatio="none" aria-hidden="true"><rect width="160" height="80" fill="${r}"/>`;
	if (e.mega && (o += `<circle cx="20" cy="6" r="34" fill="${t}" opacity="0.18"/>`), e.bigcta) return o += `<rect x="45" y="18" width="70" height="8" rx="3" fill="${n}" opacity="0.85"/>`, o += `<rect x="56" y="32" width="48" height="4" rx="2" fill="${n}" opacity="0.5"/>`, o += `<rect x="62" y="43" width="36" height="10" rx="3" fill="${t}"/>`, o += Fo(n, e.baselineLinks), o + "</svg>";
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
	return o += Fo(n, e.baselineLinks), o + "</svg>";
}
function Fo(e, t = 0) {
	let n = `<line x1="8" y1="66" x2="152" y2="66" stroke="${e}" stroke-width="0.6" opacity="0.5"/>`;
	return n += `<rect x="8" y="70" width="40" height="3" rx="1.5" fill="${e}" opacity="0.6"/>`, t && (n += `<g fill="${e}" opacity="0.6">` + Array.from({ length: t }, (e, t) => `<rect x="${120 - t * 16}" y="70" width="12" height="3" rx="1.5"/>`).join("") + "</g>"), n;
}
//#endregion
//#region ../template/assets/engine/animations/core.js
var Io = () => ({
	duration: 600,
	delay: 0
}), Lo = {
	"fade-in": {
		version: 1,
		label: "Ton inn",
		entrance: !0,
		defaults: Io,
		migrations: {}
	},
	"slide-up": {
		version: 1,
		label: "Gli opp",
		entrance: !0,
		defaults: Io,
		migrations: {}
	},
	"zoom-in": {
		version: 1,
		label: "Zoom inn",
		entrance: !0,
		defaults: Io,
		migrations: {}
	},
	"hover-lift": {
		version: 1,
		label: "Løft ved peker",
		entrance: !1,
		defaults: () => ({}),
		migrations: {}
	},
	stagger: {
		version: 1,
		label: "Stagger (kortgruppe)",
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
}, Ro = [
	["System", "system-ui, sans-serif"],
	["Arial", "Arial, Helvetica, sans-serif"],
	["Verdana", "Verdana, Geneva, sans-serif"],
	["Trebuchet", "'Trebuchet MS', sans-serif"],
	["Georgia (serif)", "Georgia, 'Times New Roman', serif"],
	["Palatino (serif)", "'Palatino Linotype', Palatino, serif"],
	["Courier (skrivemaskin)", "'Courier New', monospace"]
];
//#endregion
//#region ../template/assets/engine/place.js
function zo(e) {
	let t = (e) => Math.round(e * 100) / 100, n = Math.max(0, t(100 - e.w)), r = Math.min(n, Math.max(0, t(e.x - e.w / 2))), i = Math.max(0, e.y - e.h / 2), a = e.snap === !1 || e.grid?.snap === !1, o = e.grid?.size || 8;
	return i = a ? Math.round(i) : Math.round(i / o) * o, {
		x: r,
		y: Math.max(0, i)
	};
}
//#endregion
//#region src/App.svelte
var Bo = /* @__PURE__ */ W("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), Vo = /* @__PURE__ */ W("<button class=\"ghost row-tool svelte-1n46o8q\"></button>"), Ho = /* @__PURE__ */ W("<span><span class=\"grad-grip svelte-1n46o8q\"><svg viewBox=\"0 0 16 16\" width=\"14\" height=\"14\" fill=\"currentColor\" aria-hidden=\"true\"><circle cx=\"5\" cy=\"3\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"3\" r=\"1.4\"></circle><circle cx=\"5\" cy=\"8\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"8\" r=\"1.4\"></circle><circle cx=\"5\" cy=\"13\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"13\" r=\"1.4\"></circle></svg></span> <!> <input type=\"range\" class=\"tb-grow svelte-1n46o8q\" min=\"0\" max=\"100\" step=\"1\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span> <!></span>"), Uo = /* @__PURE__ */ W("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), Wo = /* @__PURE__ */ W("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"360\" step=\"5\" class=\"svelte-1n46o8q\"/>", 1), Go = /* @__PURE__ */ W("<label class=\"svelte-1n46o8q\"> <!></label> <!> <button class=\"ghost action svelte-1n46o8q\"> </button> <!> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label>", 1), Ko = /* @__PURE__ */ W("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), qo = /* @__PURE__ */ W("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.01\" max=\"0.3\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), Jo = /* @__PURE__ */ W("<div class=\"sizefill svelte-1n46o8q\"><button type=\"button\" class=\"ghost svelte-1n46o8q\"> </button> <button type=\"button\" class=\"ghost svelte-1n46o8q\"> </button></div> <label class=\"svelte-1n46o8q\"> </label> <div class=\"focalpad svelte-1n46o8q\"><span class=\"focaldot svelte-1n46o8q\"></span></div> <label class=\"sub svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"-0.5\" max=\"1.5\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"sub svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"-0.5\" max=\"1.5\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), Yo = /* @__PURE__ */ W("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label>", 1), Xo = /* @__PURE__ */ W("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> </label> <div class=\"sizestep svelte-1n46o8q\"><button type=\"button\" class=\"svelte-1n46o8q\">−</button> <input type=\"number\" min=\"10\" max=\"400\" class=\"svelte-1n46o8q\"/> <span class=\"sizeunit svelte-1n46o8q\">%</span> <button type=\"button\" class=\"svelte-1n46o8q\">+</button></div> <!> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"20\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), Zo = /* @__PURE__ */ W("<span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), Qo = /* @__PURE__ */ W("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"2\" max=\"120\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"5\" step=\"0.1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"20\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <p class=\"panel-hint svelte-1n46o8q\"> </p>", 1), $o = /* @__PURE__ */ W("<div class=\"bg-layer svelte-1n46o8q\"><span class=\"nav-line svelte-1n46o8q\"><!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <!></div>"), es = /* @__PURE__ */ W("<p class=\"panel-hint svelte-1n46o8q\"> </p> <!> <label class=\"svelte-1n46o8q\"> <!></label> <button class=\"ghost action svelte-1n46o8q\"> </button>", 1), ts = /* @__PURE__ */ W("<input class=\"nav-target svelte-1n46o8q\"/>"), ns = /* @__PURE__ */ W("<div class=\"nav-row nav-sub-row svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <span class=\"nav-target svelte-1n46o8q\"><!></span> <!></div>"), rs = /* @__PURE__ */ W("<label class=\"svelte-1n46o8q\"> <!></label>"), is = /* @__PURE__ */ W("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"num-stepper svelte-1n46o8q\"><button type=\"button\" class=\"svelte-1n46o8q\">−</button> <input type=\"number\" min=\"1\" max=\"12\" step=\"1\" class=\"svelte-1n46o8q\"/> <button type=\"button\" class=\"svelte-1n46o8q\">+</button></span></label>", 1), as = /* @__PURE__ */ W("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), os = /* @__PURE__ */ W("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), ss = /* @__PURE__ */ W("<span class=\"nav-line svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span>"), cs = /* @__PURE__ */ W("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <button class=\"ghost action svelte-1n46o8q\"> </button> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!>", 1), ls = /* @__PURE__ */ W("<input class=\"svelte-1n46o8q\"/>"), us = /* @__PURE__ */ W("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label>", 1), ds = /* @__PURE__ */ W("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>"), fs = /* @__PURE__ */ W("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <!> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"1\" max=\"3\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.2\" max=\"2\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.2\" max=\"2\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"2\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\"> </button>", 1), ps = /* @__PURE__ */ W("<label class=\"svelte-1n46o8q\"> </label> <input class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <p class=\"panel-hint svelte-1n46o8q\"> </p>", 1), ms = /* @__PURE__ */ W("<input class=\"token-input svelte-1n46o8q\" maxlength=\"4\"/>"), hs = /* @__PURE__ */ W("<button class=\"ghost svelte-1n46o8q\"> </button>"), gs = /* @__PURE__ */ W("<span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\"/> <button class=\"ghost svelte-1n46o8q\"> </button></span> <p class=\"panel-hint svelte-1n46o8q\"> </p>", 1), _s = /* @__PURE__ */ W("<label class=\"svelte-1n46o8q\"> <span class=\"toolbar-row svelte-1n46o8q\"><!> <!></span></label> <!> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"8\" max=\"400\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <p class=\"panel-hint svelte-1n46o8q\"> </p>", 1), vs = /* @__PURE__ */ W("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <p class=\"panel-hint svelte-1n46o8q\"> </p>", 1), ys = /* @__PURE__ */ W("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" max=\"6\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"32\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), bs = /* @__PURE__ */ W("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"2\" max=\"60\" class=\"svelte-1n46o8q\"/></label>"), xs = /* @__PURE__ */ W("<div class=\"bg-layer svelte-1n46o8q\"><span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label></div>"), Ss = /* @__PURE__ */ W("<label class=\"svelte-1n46o8q\"> <!></label> <!> <!> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label> <!> <p class=\"panel-hint svelte-1n46o8q\"> </p>", 1), Cs = /* @__PURE__ */ W("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" max=\"40\" class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), ws = /* @__PURE__ */ W("<button class=\"ghost svelte-1n46o8q\"> </button> <p class=\"panel-hint svelte-1n46o8q\"> </p>", 1), Ts = /* @__PURE__ */ W("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"100\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label>", 1), Es = /* @__PURE__ */ W("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"400\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label>", 1), Ds = /* @__PURE__ */ W("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), Os = /* @__PURE__ */ W("<div class=\"frame-grid svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"0.5\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"0.5\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label></div>"), ks = /* @__PURE__ */ W("<!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\"> </p> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label></div></details>", 1), As = /* @__PURE__ */ W("<button class=\"chrome-restore svelte-1n46o8q\"><!> </button>"), js = /* @__PURE__ */ W("<button class=\"ghost svelte-1n46o8q\"> </button> <span class=\"viewswitch svelte-1n46o8q\"><button></button> <button></button></span> <span class=\"zoomswitch svelte-1n46o8q\"><button></button> <button>100%</button> <span class=\"zoom-readout svelte-1n46o8q\"> </span></span> <button></button>", 1), Ms = /* @__PURE__ */ W("<button class=\"badge attention svelte-1n46o8q\"><!> </button>"), Ns = /* @__PURE__ */ W("<span class=\"badge svelte-1n46o8q\"> </span> <button> </button>", 1), Ps = /* @__PURE__ */ W("<!> ", 1), Fs = /* @__PURE__ */ W("<span class=\"who svelte-1n46o8q\"><!> </span>"), Is = /* @__PURE__ */ W("<a class=\"ghost svelte-1n46o8q\" href=\"/api/github/login\"> </a>"), Ls = /* @__PURE__ */ W("<button class=\"ghost svelte-1n46o8q\"><!></button> <!> <a class=\"ghost svelte-1n46o8q\" target=\"_blank\" rel=\"noopener\"> </a> <button class=\"primary svelte-1n46o8q\"> </button>", 1), Rs = /* @__PURE__ */ W("<hr class=\"rail-sep svelte-1n46o8q\"/>"), zs = /* @__PURE__ */ W("<button> </button>"), Bs = /* @__PURE__ */ W("<!> <!>", 1), Vs = /* @__PURE__ */ W("<span class=\"page-path svelte-1n46o8q\">/</span>"), Hs = /* @__PURE__ */ W("<input class=\"page-slug svelte-1n46o8q\"/>"), Us = /* @__PURE__ */ W("<div><input class=\"page-title svelte-1n46o8q\"/> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <!></span></div>"), Ws = /* @__PURE__ */ W("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\"> </p> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <input class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\"> </button> <p class=\"panel-hint svelte-1n46o8q\"> </p></div>"), Gs = /* @__PURE__ */ W("<input class=\"svelte-1n46o8q\"/> <span class=\"toolbar-row svelte-1n46o8q\"><!> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"8\" max=\"96\" placeholder=\"px\"/> <button><b> </b></button> <button><i> </i></button></span>", 1), Ks = /* @__PURE__ */ W("<span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"12\" max=\"128\"/> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"0\" max=\"64\"/></span> <p class=\"panel-hint svelte-1n46o8q\"> </p>", 1), qs = /* @__PURE__ */ W("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), Js = /* @__PURE__ */ W("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), Ys = /* @__PURE__ */ W("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), Xs = /* @__PURE__ */ W("<div class=\"nav-row svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <span class=\"nav-target svelte-1n46o8q\"><!></span> <!></div> <!>", 1), Zs = /* @__PURE__ */ W("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\"> </p> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <!></label> <!> <!> <!> <p class=\"panel-hint svelte-1n46o8q\"> </p></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <!></label> <!> <!> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <!> <!> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" max=\"4\" class=\"svelte-1n46o8q\"/></label></div></details> <details class=\"group svelte-1n46o8q\" open=\"\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\"> </button> <p class=\"panel-hint svelte-1n46o8q\"> </p></div></details></div>"), Qs = /* @__PURE__ */ W("<img class=\"site-icon-preview svelte-1n46o8q\"/>"), $s = /* @__PURE__ */ W("<button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button>", 1), ec = /* @__PURE__ */ W("<div class=\"panel-body svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span></div>"), tc = /* @__PURE__ */ W("<div class=\"tpv-cap svelte-1n46o8q\"> </div>"), nc = /* @__PURE__ */ W("<div class=\"theme-pvw svelte-1n46o8q\"><!> <div class=\"tpv-demo svelte-1n46o8q\"><div class=\"tpv-h svelte-1n46o8q\"> </div> <div class=\"tpv-card svelte-1n46o8q\"> </div> <div class=\"tpv-row svelte-1n46o8q\"><span class=\"tpv-btn svelte-1n46o8q\"> </span><span class=\"tpv-lnk svelte-1n46o8q\"> </span></div></div></div>"), rc = /* @__PURE__ */ W("<button type=\"button\"><span class=\"tp-band svelte-1n46o8q\"><i class=\"svelte-1n46o8q\"></i><i class=\"svelte-1n46o8q\"></i><i class=\"svelte-1n46o8q\"></i><i class=\"svelte-1n46o8q\"></i></span> <small class=\"svelte-1n46o8q\"> </small></button>"), ic = /* @__PURE__ */ W("<div class=\"autorow svelte-1n46o8q\"><span class=\"autolbl svelte-1n46o8q\"> </span> <span class=\"seg svelte-1n46o8q\"><button type=\"button\"> </button> <button type=\"button\"> </button></span></div>"), ac = /* @__PURE__ */ W("<span class=\"palname svelte-1n46o8q\"> </span>"), oc = /* @__PURE__ */ W("<div class=\"palcol svelte-1n46o8q\"><!> <span class=\"palcap svelte-1n46o8q\"> </span> <b class=\"palhex svelte-1n46o8q\"> </b></div>"), sc = /* @__PURE__ */ W("<p class=\"panel-hint svelte-1n46o8q\"> </p>"), cc = /* @__PURE__ */ W("<div class=\"palhead svelte-1n46o8q\"><span class=\"palname svelte-1n46o8q\"> </span> <button type=\"button\"> </button></div> <div></div> <!>", 1), lc = /* @__PURE__ */ W("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-strong svelte-1n46o8q\"> </p> <div class=\"theme-presets svelte-1n46o8q\"></div> <p class=\"panel-strong svelte-1n46o8q\"> </p> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <div class=\"palhead svelte-1n46o8q\"><!> <button type=\"button\"> </button></div> <div class=\"palcells svelte-1n46o8q\"></div> <!> <div class=\"theme-previews svelte-1n46o8q\"><!> <!></div> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <div class=\"typo-sample svelte-1n46o8q\"><div class=\"ts-h svelte-1n46o8q\"> </div> <div class=\"ts-b svelte-1n46o8q\"> </div></div></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"form-prev svelte-1n46o8q\"><span class=\"fp-btn svelte-1n46o8q\"> </span> <span class=\"fp-card svelte-1n46o8q\"> </span></div> <label class=\"rng-lab svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"24\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"rng-lab svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"40\" step=\"1\" class=\"svelte-1n46o8q\"/></div></details></div>"), uc = /* @__PURE__ */ W("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"></div></details>"), dc = /* @__PURE__ */ W("<div><p class=\"panel-hint svelte-1n46o8q\"> </p> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button></div></details> <button class=\"ghost svelte-1n46o8q\"> </button> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button></div></details> <!></div>"), fc = /* @__PURE__ */ W("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\"> </p> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <p class=\"panel-hint svelte-1n46o8q\"> </p></div>"), pc = /* @__PURE__ */ W("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!>", 1), mc = /* @__PURE__ */ W("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), hc = /* @__PURE__ */ W("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"1000\" step=\"10\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label>", 1), gc = /* @__PURE__ */ W("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label>"), _c = /* @__PURE__ */ W("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"100\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <!>", 1), vc = /* @__PURE__ */ W("<p class=\"panel-strong svelte-1n46o8q\"> </p> <label class=\"svelte-1n46o8q\"> <input class=\"token-input svelte-1n46o8q\"/></label> <p class=\"panel-hint svelte-1n46o8q\"> </p> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"row-tools svelte-1n46o8q\"><span class=\"gridmenu-value svelte-1n46o8q\"> </span> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label>", 1), yc = /* @__PURE__ */ W("<div class=\"panel-body svelte-1n46o8q\"><!></div>"), bc = /* @__PURE__ */ W("<button class=\"footer-tp svelte-1n46o8q\"><span class=\"footer-tp-thumb svelte-1n46o8q\"></span> <span class=\"footer-tp-name svelte-1n46o8q\"> </span></button>"), xc = /* @__PURE__ */ W("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"16\" max=\"160\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), Sc = /* @__PURE__ */ W("<span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span> <!>", 1), Cc = /* @__PURE__ */ W("<div class=\"nav-row svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></div> <!>", 1), wc = /* @__PURE__ */ W("<div class=\"nav-row svelte-1n46o8q\"><span class=\"nav-line svelte-1n46o8q\"><span class=\"footer-soc-preview svelte-1n46o8q\" aria-hidden=\"true\"></span> <!></span> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <input class=\"nav-target svelte-1n46o8q\"/></div>"), Tc = /* @__PURE__ */ W("<label class=\"svelte-1n46o8q\"> <!></label> <!>", 1), Ec = /* @__PURE__ */ W("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), Dc = /* @__PURE__ */ W("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <!>", 1), Oc = /* @__PURE__ */ W("<label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), kc = /* @__PURE__ */ W("<div class=\"panel-body svelte-1n46o8q\"><label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"footer-tpick svelte-1n46o8q\"></div></div></details> <details class=\"group svelte-1n46o8q\" open=\"\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\"> </button> <label class=\"svelte-1n46o8q\"> <!></label></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\"> </button></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\"> </button></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <button class=\"ghost action svelte-1n46o8q\"> </button></div></details></div>"), Ac = /* @__PURE__ */ W("<img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <button class=\"ghost row-tool svelte-1n46o8q\"></button>", 1), jc = /* @__PURE__ */ W("<details class=\"group samling-entry svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><span class=\"toolbar-row svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <label class=\"svelte-1n46o8q\"> <input type=\"date\" class=\"svelte-1n46o8q\"/></label> <textarea rows=\"3\" class=\"svelte-1n46o8q\"></textarea> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span></div></details>"), Mc = /* @__PURE__ */ W("<span class=\"toolbar-row svelte-1n46o8q\"><button class=\"ghost action svelte-1n46o8q\"> </button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <!> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Nc = /* @__PURE__ */ W("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\"> </p> <!> <!> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <button class=\"ghost action svelte-1n46o8q\"> </button></div>"), Pc = /* @__PURE__ */ W("<span class=\"plugin-meta svelte-1n46o8q\"> </span>"), Fc = /* @__PURE__ */ W("<p class=\"panel-hint plugin-warn svelte-1n46o8q\"> </p>"), Ic = /* @__PURE__ */ W("<div><span class=\"plugin-head svelte-1n46o8q\"><span class=\"plugin-name svelte-1n46o8q\"> </span> <!> <span class=\"row-tools svelte-1n46o8q\"><label class=\"gridmenu-snap plugin-toggle svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <!></div>"), Lc = /* @__PURE__ */ W("<div class=\"plugin-row svelte-1n46o8q\"><span class=\"plugin-head svelte-1n46o8q\"><span class=\"plugin-name svelte-1n46o8q\"> </span> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span></div>"), Rc = /* @__PURE__ */ W("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-hint svelte-1n46o8q\"> </p> <!>", 1), zc = /* @__PURE__ */ W("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <input class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\"> </button> <!>", 1), Bc = /* @__PURE__ */ W("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\"> </p> <!> <!> <!> <!></div>"), Vc = /* @__PURE__ */ W("<div><span class=\"history-msg svelte-1n46o8q\"> </span> <span class=\"history-meta svelte-1n46o8q\"> </span></div>"), Hc = /* @__PURE__ */ W("<button class=\"ghost svelte-1n46o8q\"> </button> <!>", 1), Uc = /* @__PURE__ */ W("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\"> </p> <!></div>"), Wc = /* @__PURE__ */ W("<aside class=\"panel svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <!></aside>"), Gc = /* @__PURE__ */ W("<nav class=\"rail svelte-1n46o8q\"></nav> <!>", 1), Kc = /* @__PURE__ */ W("<div class=\"workspace svelte-1n46o8q\"><!> <div><div class=\"stage svelte-1n46o8q\"><iframe class=\"svelte-1n46o8q\"></iframe></div></div></div>"), qc = /* @__PURE__ */ W("<p class=\"loading svelte-1n46o8q\"> </p>"), Jc = /* @__PURE__ */ W("<p class=\"panel-hint confirm-line svelte-1n46o8q\"> </p>"), Yc = /* @__PURE__ */ W("<div class=\"setup-overlay svelte-1n46o8q\"><div class=\"setup-card svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <!> <span class=\"setup-actions svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"primary svelte-1n46o8q\"> </button></span></div></div>"), Xc = /* @__PURE__ */ W("<div class=\"setup-overlay svelte-1n46o8q\"><div class=\"setup-card svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <p class=\"panel-hint svelte-1n46o8q\"> </p> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <p class=\"panel-hint svelte-1n46o8q\"> </p> <span class=\"setup-actions svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"primary svelte-1n46o8q\"> </button></span></div></div>"), Zc = /* @__PURE__ */ W("<div><span> </span> <button class=\"toast-x svelte-1n46o8q\">×</button></div>"), Qc = /* @__PURE__ */ W("<div class=\"block-menu svelte-1n46o8q\"><header class=\"block-menu-head svelte-1n46o8q\"><span> </span> <button class=\"ghost row-tool svelte-1n46o8q\"></button></header> <div class=\"panel-body block-menu-body svelte-1n46o8q\"><!></div></div>"), $c = /* @__PURE__ */ W("<div class=\"editor svelte-1n46o8q\"><!> <header><span class=\"topbar-group svelte-1n46o8q\"><span class=\"brand svelte-1n46o8q\" title=\"Urd\"><svg class=\"brand-mark svelte-1n46o8q\" viewBox=\"0 0 40 40\" aria-hidden=\"true\"><path d=\"M12 32V10l16 6.5V32\" fill=\"none\" stroke=\"var(--urd-brand)\" stroke-width=\"3.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path></svg> <span class=\"brand-word svelte-1n46o8q\">Urd</span></span> <!> <!> <!> <!> <!></span> <span class=\"topbar-group topbar-right svelte-1n46o8q\"><!></span></header> <!> <!> <!> <!> <!></div>   <!>", 1);
function el(e, t) {
	Ue(t, !0);
	let n = (e, t = d, n = d) => {
		var r = es(), i = R(r), a = L(i, !0);
		M(i);
		var s = z(i, 2);
		Vr(s, 17, n, Lr, (e, r, i) => {
			var a = $o(), s = L(a), l = L(s);
			{
				let e = /* @__PURE__ */ P(() => Q("tip.bg.changeType")), n = /* @__PURE__ */ P(() => o.map(([e, t]) => [e, t.label]));
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
					onchange: (e) => $t(t(), i, e)
				});
			}
			var u = z(l, 2), d = L(u);
			d.disabled = i === 0, J(d, () => c.up, !0), M(d);
			var f = z(d, 2);
			J(f, () => c.down, !0), M(f);
			var p = z(f, 2);
			J(p, () => c.cross, !0), M(p), M(u), M(s);
			var m = z(s, 2), h = (e) => {
				var n = Bo(), a = R(n), o = L(a), s = z(o);
				{
					let e = /* @__PURE__ */ P(hn), n = /* @__PURE__ */ P(() => Q("tip.bg.layerColor"));
					Pi(s, {
						get value() {
							return H(r).props.value;
						},
						get tokens() {
							return H(e);
						},
						get label() {
							return H(n);
						},
						onchange: (e) => It(t(), i, "value", e)
					});
				}
				M(a);
				var c = z(a, 2), l = L(c), u = z(l), d = L(u);
				M(u), M(c);
				var f = z(c, 2);
				Y(f), B((e, t, n) => {
					K(o, `${e ?? ""} `), K(l, `${t ?? ""} `), K(d, `${n ?? ""}%`), X(f, H(r).props.opacity ?? 1);
				}, [
					() => Q("lbl.color"),
					() => Q("lbl.strength"),
					() => Math.round((H(r).props.opacity ?? 1) * 100)
				]), U("input", f, (e) => It(t(), i, "opacity", Number(e.target.value))), G(e, n);
			}, g = (e) => {
				let n = /* @__PURE__ */ P(() => Ht(H(r))), a = /* @__PURE__ */ P(() => H(n).stops.reduce((e, t) => e + Math.max(0, Number(t.share) || 0), 0));
				var o = Go(), s = R(o), l = L(s), u = z(l);
				{
					let e = /* @__PURE__ */ P(() => H(n).kind ?? "linear"), r = /* @__PURE__ */ P(() => [["linear", Q("opt.grad.linear")], ["radial", Q("opt.grad.radial")]]);
					$(u, {
						get value() {
							return H(e);
						},
						get options() {
							return H(r);
						},
						onchange: (e) => Kt(t(), i, e)
					});
				}
				M(s);
				var d = z(s, 2);
				Vr(d, 17, () => H(n).stops, Lr, (e, r, o) => {
					var s = Ho();
					let l;
					var u = L(s), d = z(u, 2);
					{
						let e = /* @__PURE__ */ P(hn), n = /* @__PURE__ */ P(() => Q("tip.bg.stopColor"));
						Pi(d, {
							get value() {
								return H(r).color;
							},
							get tokens() {
								return H(e);
							},
							get label() {
								return H(n);
							},
							onchange: (e) => qt(t(), i, o, { color: e })
						});
					}
					var f = z(d, 2);
					Y(f);
					var p = z(f, 2), m = L(p);
					M(p);
					var h = z(p, 2), g = (e) => {
						var n = Vo();
						J(n, () => c.cross, !0), M(n), B((e) => Z(n, "title", e), [() => Q("tip.bg.removeStop")]), U("click", n, () => Yt(t(), i, o)), G(e, n);
					};
					q(h, (e) => {
						H(n).stops.length > 2 && e(g);
					}), M(s), B((e, t, a) => {
						l = Qr(s, 1, "nav-line grad-stop svelte-1n46o8q", null, l, {
							dragging: H(Zt)?.layer === i && H(Zt).from === o,
							"drop-above": H(Zt)?.layer === i && H(Zt).insert === o,
							"drop-below": H(Zt)?.layer === i && H(Zt).insert === H(n).stops.length && o === H(n).stops.length - 1
						}), Z(u, "title", e), X(f, H(r).share ?? 50), Z(f, "title", t), K(m, `${a ?? ""}%`);
					}, [
						() => Q("tip.bg.dragStop"),
						() => Q("tip.bg.stopShare"),
						() => H(a) > 0 ? Math.round(Math.max(0, Number(H(r).share) || 0) / H(a) * 100) : Math.round(100 / H(n).stops.length)
					]), U("pointerdown", u, (e) => Qt(t(), e, i, o)), U("input", f, (e) => qt(t(), i, o, { share: Number(e.target.value) })), G(e, s);
				});
				var f = z(d, 2), p = L(f, !0);
				M(f);
				var m = z(f, 2), h = (e) => {
					var r = Uo(), a = R(r), o = L(a), s = z(o), c = L(s);
					M(s), M(a);
					var l = z(a, 2);
					Y(l);
					var u = z(l, 2), d = L(u), f = z(d), p = L(f);
					M(f), M(u);
					var m = z(u, 2);
					Y(m), B((e, t, r, i) => {
						K(o, `${e ?? ""} `), K(c, `${t ?? ""}%`), X(l, H(n).x ?? .5), K(d, `${r ?? ""} `), K(p, `${i ?? ""}%`), X(m, H(n).y ?? .5);
					}, [
						() => Q("lbl.centerX"),
						() => Math.round((H(n).x ?? .5) * 100),
						() => Q("lbl.centerY"),
						() => Math.round((H(n).y ?? .5) * 100)
					]), U("input", l, (e) => Wt(t(), i, "x", Number(e.target.value))), U("input", m, (e) => Wt(t(), i, "y", Number(e.target.value))), G(e, r);
				}, g = (e) => {
					var r = Wo(), a = R(r), o = L(a), s = z(o), c = L(s);
					M(s), M(a);
					var l = z(a, 2);
					Y(l), B((e) => {
						K(o, `${e ?? ""} `), K(c, `${H(n).angle ?? ""}°`), X(l, H(n).angle);
					}, [() => Q("lbl.angle")]), U("input", l, (e) => Wt(t(), i, "angle", Number(e.target.value))), G(e, r);
				};
				q(m, (e) => {
					(H(n).kind ?? "linear") === "radial" ? e(h) : e(g, -1);
				});
				var _ = z(m, 2), v = L(_), y = z(v), b = L(y);
				M(y), M(_);
				var x = z(_, 2);
				Y(x);
				var S = z(x, 2), C = L(S), w = z(C);
				{
					let e = /* @__PURE__ */ P(() => H(n).animation ?? "none");
					$(w, {
						get value() {
							return H(e);
						},
						get options() {
							return Gt[(H(n).kind ?? "linear") === "radial" ? "radial" : "linear"];
						},
						onchange: (e) => Wt(t(), i, "animation", e)
					});
				}
				M(S), B((e, t, r, i, a, o, s) => {
					K(l, `${e ?? ""} `), Z(f, "title", t), K(p, r), K(v, `${i ?? ""} `), K(b, `${a ?? ""}%`), X(x, H(n).opacity ?? 1), Z(S, "title", o), K(C, `${s ?? ""} `);
				}, [
					() => Q("blocks.shape"),
					() => Q("tip.bg.addStop"),
					() => Q("ui.addStop"),
					() => Q("lbl.strength"),
					() => Math.round((H(n).opacity ?? 1) * 100),
					() => Q("tip.bg.motion"),
					() => Q("lbl.motion")
				]), U("click", f, () => Jt(t(), i)), U("input", x, (e) => Wt(t(), i, "opacity", Number(e.target.value))), G(e, o);
			}, _ = (e) => {
				var n = Ko(), a = R(n), o = L(a), s = z(o);
				{
					let e = /* @__PURE__ */ P(hn), n = /* @__PURE__ */ P(() => Q("tip.bg.glowColor"));
					Pi(s, {
						get value() {
							return H(r).props.color;
						},
						get tokens() {
							return H(e);
						},
						get label() {
							return H(n);
						},
						onchange: (e) => It(t(), i, "color", e)
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
				]), U("input", f, (e) => It(t(), i, "x", Number(e.target.value))), U("input", _, (e) => It(t(), i, "y", Number(e.target.value))), U("input", S, (e) => It(t(), i, "radius", Number(e.target.value))), U("input", D, (e) => It(t(), i, "opacity", Number(e.target.value))), G(e, n);
			}, v = (e) => {
				var n = qo(), a = R(n), o = L(a), s = z(o), c = L(s);
				M(s), M(a);
				var l = z(a, 2);
				Y(l), B((e, t) => {
					K(o, `${e ?? ""} `), K(c, `${t ?? ""}%`), X(l, H(r).props.opacity);
				}, [() => Q("lbl.strength"), () => Math.round(H(r).props.opacity * 100)]), U("input", l, (e) => It(t(), i, "opacity", Number(e.target.value))), G(e, n);
			}, y = (e) => {
				let n = /* @__PURE__ */ P(() => H(r).props.fit === "flislegg" || H(r).props.fit === "repeat");
				var a = Xo(), o = R(a), s = L(o), c = z(s);
				M(o);
				var l = z(o, 2), u = L(l), d = z(u);
				{
					let e = /* @__PURE__ */ P(() => H(n) ? "flislegg" : "vanlig"), r = /* @__PURE__ */ P(() => [["vanlig", Q("opt.img.plain")], ["flislegg", Q("opt.img.tile")]]);
					$(d, {
						get value() {
							return H(e);
						},
						get options() {
							return H(r);
						},
						onchange: (e) => It(t(), i, "fit", e)
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
					var n = Jo(), a = R(n), o = L(a), s = L(o, !0);
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
						Z(o, "title", e), K(s, t), Z(c, "title", n), K(l, i), Z(u, "title", a), K(d, p), ei(f, `--fx:${h ?? ""}%; --fy:${v ?? ""}%`), K(m, `${b ?? ""} `), K(g, `${C ?? ""}%`), X(_, H(r).props.x ?? .5), K(y, `${w ?? ""} `), K(x, `${T ?? ""}%`), X(S, H(r).props.y ?? .5);
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
					]), U("click", o, () => Vt(t(), i, H(r), "cover")), U("click", c, () => Vt(t(), i, H(r), "contain")), U("pointerdown", f, (e) => Lt(e, t(), i, "xy")), U("input", _, (e) => It(t(), i, "x", Number(e.target.value))), U("input", S, (e) => It(t(), i, "y", Number(e.target.value))), G(e, n);
				};
				q(v, (e) => {
					H(n) || e(y);
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
					var n = Yo(), a = R(n), o = L(a), s = z(o), c = L(s);
					M(s), M(a);
					var l = z(a, 2);
					Y(l);
					var u = z(l, 2), d = L(u), f = z(d);
					{
						let e = /* @__PURE__ */ P(() => H(r).props.bleed ?? "none"), n = /* @__PURE__ */ P(() => [
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
							onchange: (e) => It(t(), i, "bleed", e)
						});
					}
					M(u), B((e, t, n, i) => {
						K(o, `${e ?? ""} `), K(c, `${t ?? ""}%`), X(l, H(r).props.parallax ?? .3), Z(u, "title", n), K(d, `${i ?? ""} `);
					}, [
						() => Q("lbl.parallaxStrength"),
						() => Math.round((H(r).props.parallax ?? 0) * 100),
						() => Q("tip.bg.bleed"),
						() => Q("lbl.bleed")
					]), U("input", l, (e) => It(t(), i, "parallax", Number(e.target.value))), G(e, n);
				};
				q(ae, (e) => {
					(H(r).props.parallax ?? 0) > 0 && e(oe);
				}), B((e, t, n, i, a, c, d, m, v, y, b, S, T, D) => {
					Z(o, "title", e), K(s, `${t ?? ""} `), Z(l, "title", n), K(u, `${i ?? ""} `), Z(f, "title", a), K(p, c), Z(h, "title", d), X(g, m), Z(_, "title", v), K(x, `${y ?? ""} `), K(C, `${H(r).props.blur ?? 0 ?? ""} px`), X(w, H(r).props.blur ?? 0), K(E, `${b ?? ""} `), K(ee, `${S ?? ""}%`), X(te, H(r).props.opacity ?? 1), Z(ne, "title", T), ai(re, (H(r).props.parallax ?? 0) > 0), K(ie, ` ${D ?? ""}`);
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
				]), U("change", c, (e) => on(t(), i, e)), U("click", h, () => zt(t(), i, H(r).props.size ?? 1, -.05)), U("change", g, (e) => Bt(t(), i, e.target.value)), U("click", _, () => zt(t(), i, H(r).props.size ?? 1, .05)), U("input", w, (e) => It(t(), i, "blur", Number(e.target.value))), U("input", te, (e) => It(t(), i, "opacity", Number(e.target.value))), U("change", re, (e) => It(t(), i, "parallax", e.target.checked ? .3 : 0)), G(e, a);
			}, b = (e) => {
				var n = Qo(), a = R(n), o = L(a), s = z(o);
				M(a);
				var l = z(a, 2);
				Vr(l, 17, () => H(r).props.images ?? [], Lr, (e, n, a) => {
					var o = Zo(), s = R(o), l = L(s), u = z(l, 2), d = L(u);
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
						Z(l, "src", H(n).src), f.disabled = a === H(r).props.images.length - 1, Z(p, "title", e), K(h, `${t ?? ""} `), K(_, `${i ?? ""}%`), X(v, H(n).x ?? .5), K(b, `${o ?? ""} `), K(S, `${s ?? ""}%`), X(C, H(n).y ?? .5);
					}, [
						() => Q("tip.removeImage"),
						() => Q("lbl.focusX"),
						() => Math.round((H(n).x ?? .5) * 100),
						() => Q("lbl.focusY"),
						() => Math.round((H(n).y ?? .5) * 100)
					]), U("click", d, () => cn(t(), i, a, -1)), U("click", f, () => cn(t(), i, a, 1)), U("click", p, () => ln(t(), i, a)), U("input", v, (e) => un(t(), i, a, "x", Number(e.target.value))), U("input", C, (e) => un(t(), i, a, "y", Number(e.target.value))), G(e, o);
				});
				var u = z(l, 2), d = L(u), f = z(d);
				{
					let e = /* @__PURE__ */ P(() => H(r).props.fit ?? "cover"), n = /* @__PURE__ */ P(() => [["cover", Q("opt.fit.cover")], ["contain", Q("opt.fit.contain")]]);
					$(f, {
						get value() {
							return H(e);
						},
						get options() {
							return H(n);
						},
						onchange: (e) => It(t(), i, "fit", e)
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
				M(re), B((e, t, n, i, s, c, l, u, f, p) => {
					Z(a, "title", e), K(o, `${t ?? ""} `), K(d, `${n ?? ""} `), K(m, `${i ?? ""} `), X(h, H(r).props.interval ?? 6), K(_, `${s ?? ""} `), K(y, `${c ?? ""} s`), X(b, H(r).props.fade ?? 1.5), K(S, `${l ?? ""} `), K(w, `${H(r).props.blur ?? 0 ?? ""} px`), X(T, H(r).props.blur ?? 0), K(D, `${u ?? ""} `), K(te, `${f ?? ""}%`), X(ne, H(r).props.opacity ?? 1), K(ie, p);
				}, [
					() => Q("tip.bg.addImages"),
					() => Q("ui.addImages"),
					() => Q("lbl.fit"),
					() => Q("lbl.secondsPerImage"),
					() => Q("lbl.transition"),
					() => (H(r).props.fade ?? 1.5).toFixed(1),
					() => Q("lbl.blur"),
					() => Q("lbl.strength"),
					() => Math.round((H(r).props.opacity ?? 1) * 100),
					() => Q("hint.bg.gallery")
				]), U("change", s, (e) => sn(t(), i, e)), U("change", h, (e) => It(t(), i, "interval", Number(e.target.value))), U("input", b, (e) => It(t(), i, "fade", Number(e.target.value))), U("input", T, (e) => It(t(), i, "blur", Number(e.target.value))), U("input", ne, (e) => It(t(), i, "opacity", Number(e.target.value))), G(e, n);
			};
			q(m, (e) => {
				H(r).type === "color" ? e(h) : H(r).type === "gradient" ? e(g, 1) : H(r).type === "glow" ? e(_, 2) : H(r).type === "grain" ? e(v, 3) : H(r).type === "image" ? e(y, 4) : H(r).type === "bildegalleri" && e(b, 5);
			}), M(a), B((e) => {
				f.disabled = i === n().length - 1, Z(p, "title", e);
			}, [() => Q("tip.bg.removeLayer")]), U("click", d, () => Ft(t(), i, -1)), U("click", f, () => Ft(t(), i, 1)), U("click", p, () => Pt(t(), i)), G(e, a);
		});
		var l = z(s, 2), u = L(l), f = z(u);
		{
			let e = /* @__PURE__ */ P(() => o.map(([e, t]) => [e, t.label]));
			$(f, {
				get value() {
					return H(Mt);
				},
				get options() {
					return H(e);
				},
				onchange: (e) => I(Mt, e, !0)
			});
		}
		M(l);
		var p = z(l, 2), m = L(p, !0);
		M(p), B((e, t, n) => {
			K(a, e), K(u, `${t ?? ""} `), K(m, n);
		}, [
			() => Q("hint.bg.order"),
			() => Q("lbl.newLayer"),
			() => Q("ui.addLayer")
		]), U("click", p, () => Nt(t(), H(Mt))), G(e, r);
	}, r = (e, t = d, n = d) => {
		var r = jr();
		Vr(R(r), 17, n, Lr, (e, r, i) => {
			var a = ns(), o = L(a);
			Y(o);
			var s = z(o, 2), l = L(s);
			l.disabled = i === 0, J(l, () => c.up, !0), M(l);
			var u = z(l, 2);
			J(u, () => c.down, !0), M(u);
			var d = z(u, 2);
			J(d, () => c.cross, !0), M(d), M(s);
			var f = z(s, 2), p = L(f);
			{
				let e = /* @__PURE__ */ P(() => H(r).page ?? "__href"), n = /* @__PURE__ */ P(() => Q("tip.linkTarget")), a = /* @__PURE__ */ P(() => [...H(A).pages.map((e) => [e.id, e.title]), ["__href", Q("opt.linkHref")]]);
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
					onchange: (e) => ca(t(), i, e)
				});
			}
			M(f);
			var m = z(f, 2), h = (e) => {
				var n = ts();
				Y(n), B((e, t) => {
					X(n, H(r).href ?? ""), Z(n, "placeholder", e), Z(n, "title", t);
				}, [() => Q("ph.hrefAnchor"), () => Q("tip.hrefAnchor")]), U("change", n, (e) => la(t(), i, e.target.value)), G(e, n);
			};
			q(m, (e) => {
				H(r).page || e(h);
			}), M(a), B((e, t) => {
				X(o, H(r).label), Z(o, "title", e), u.disabled = i === n().length - 1, Z(d, "title", t);
			}, [() => Q("tip.linkLabel"), () => Q("tip.removeLink")]), U("input", o, (e) => sa(t(), i, e.target.value)), U("click", l, () => oa(t(), i, -1)), U("click", u, () => oa(t(), i, 1)), U("click", d, () => aa(t(), i)), G(e, a);
		}), G(e, r);
	}, i = (e) => {
		let t = /* @__PURE__ */ P(() => H(N).props.boxStyle ?? {});
		var n = as(), r = R(n), i = L(r), a = z(i);
		{
			let e = /* @__PURE__ */ P(() => H(t).bg ?? ""), n = /* @__PURE__ */ P(hn), r = /* @__PURE__ */ P(() => Q("tip.box.bg"));
			Pi(a, {
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
				onchange: (e) => ct({ bg: e || null })
			});
		}
		M(r);
		var o = z(r, 2), s = L(o), c = z(s);
		{
			let e = /* @__PURE__ */ P(() => H(t).shadow ?? ""), n = /* @__PURE__ */ P(() => [
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
				onchange: (e) => ct({ shadow: e || null })
			});
		}
		M(o);
		var l = z(o, 2), u = (e) => {
			var n = rs(), r = L(n), i = z(r);
			{
				let e = /* @__PURE__ */ P(() => H(t).shadowColor ?? ""), n = /* @__PURE__ */ P(hn), r = /* @__PURE__ */ P(() => Q("tip.box.shadowColor"));
				Pi(i, {
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
					onchange: (e) => ct({ shadowColor: e || null })
				});
			}
			M(n), B((e) => K(r, `${e ?? ""} `), [() => Q("lbl.shadowColor")]), G(e, n);
		};
		q(l, (e) => {
			H(t).shadow && e(u);
		});
		var d = z(l, 2), f = L(d), p = z(f);
		{
			let e = /* @__PURE__ */ P(() => H(t).border === "none" ? "none" : H(t).border ? "custom" : ""), n = /* @__PURE__ */ P(() => [
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
				onchange: (e) => ct({ border: e === "custom" ? {
					color: "accent",
					width: 1
				} : e || null })
			});
		}
		M(d);
		var m = z(d, 2), h = (e) => {
			let n = /* @__PURE__ */ P(() => typeof H(t).border == "object" ? H(t).border : {
				color: "text",
				width: 1
			});
			var r = is(), i = R(r), a = L(i), o = z(a);
			{
				let e = /* @__PURE__ */ P(hn), t = /* @__PURE__ */ P(() => Q("tip.box.borderColor"));
				Pi(o, {
					get value() {
						return H(n).color;
					},
					get tokens() {
						return H(e);
					},
					get label() {
						return H(t);
					},
					onchange: (e) => ct({ border: {
						...H(n),
						color: e
					} })
				});
			}
			M(i);
			var s = z(i, 2), c = L(s), l = z(c), u = L(l), d = z(u, 2);
			Y(d);
			var f = z(d, 2);
			M(l), M(s), B((e, t, r, i, o, s) => {
				K(a, `${e ?? ""} `), K(c, `${t ?? ""} `), Z(u, "title", r), Z(u, "aria-label", i), X(d, H(n).width), Z(f, "title", o), Z(f, "aria-label", s);
			}, [
				() => Q("lbl.borderColor"),
				() => Q("lbl.thicknessPx"),
				() => Q("tip.thinner"),
				() => Q("tip.thinner"),
				() => Q("tip.thicker"),
				() => Q("tip.thicker")
			]), U("click", u, () => ct({ border: {
				...H(n),
				width: Math.max(1, H(n).width - 1)
			} })), U("change", d, (e) => ct({ border: {
				...H(n),
				width: Math.min(12, Math.max(1, Number(e.target.value) || 1))
			} })), U("click", f, () => ct({ border: {
				...H(n),
				width: Math.min(12, H(n).width + 1)
			} })), G(e, r);
		};
		q(m, (e) => {
			H(t).border !== "none" && e(h);
		});
		var g = z(m, 2), _ = L(g);
		Y(_);
		var v = z(_);
		M(g), B((e, t, n, r, a, o) => {
			K(i, `${e ?? ""} `), K(s, `${t ?? ""} `), K(f, `${n ?? ""} `), Z(g, "title", r), ai(_, a), K(v, ` ${o ?? ""}`);
		}, [
			() => Q("lbl.blockColor"),
			() => Q("lbl.shadow"),
			() => Q("lbl.border"),
			() => Q("tip.box.glass"),
			() => !!H(t).glass,
			() => Q("lbl.glass")
		]), U("change", _, (e) => ct({ glass: e.target.checked || null })), G(e, n);
	}, a = (e) => {
		var t = ks(), n = R(t), r = (e) => {
			var t = os(), n = R(t), r = L(n), a = z(r);
			{
				let e = /* @__PURE__ */ P(() => H(N).props.align ?? "left"), t = /* @__PURE__ */ P(() => [
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
					onchange: (e) => ot("align", e)
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
			q(l, (e) => {
				H(N).props.box && e(u);
			}), B((e, t, n) => {
				K(r, `${e ?? ""} `), ai(s, t), K(c, ` ${n ?? ""}`);
			}, [
				() => Q("lbl.align"),
				() => !!H(N).props.box,
				() => Q("lbl.textBoxToggle")
			]), U("change", s, (e) => ot("box", e.target.checked)), G(e, t);
		}, a = (e) => {
			var t = cs(), n = R(t), r = L(n);
			Y(r);
			var a = z(r);
			M(n);
			var o = z(n, 2), s = L(o, !0);
			M(o);
			var l = z(o, 2);
			Vr(l, 17, () => H(N).props.items ?? [], Lr, (e, t, n) => {
				var r = ss(), i = L(r);
				Y(i);
				var a = z(i, 2), o = L(a);
				o.disabled = n === 0, J(o, () => c.up, !0), M(o);
				var s = z(o, 2);
				J(s, () => c.down, !0), M(s);
				var l = z(s, 2);
				J(l, () => c.cross, !0), M(l), M(a), M(r), B((e, r) => {
					X(i, H(t).q), Z(i, "title", e), s.disabled = n === (H(N).props.items?.length ?? 0) - 1, Z(l, "title", r);
				}, [() => Q("tip.faq.question"), () => Q("tip.faq.remove")]), U("change", i, (e) => lt(n, { q: e.target.value })), U("click", o, () => ft(n, -1)), U("click", s, () => ft(n, 1)), U("click", l, () => dt(n)), G(e, r);
			});
			var u = z(l, 2), d = L(u, !0);
			M(u);
			var f = z(u, 2), p = L(f, !0);
			M(f);
			var m = z(f, 2);
			i(m), B((e, t, i, o, c, l) => {
				Z(n, "title", e), ai(r, t), K(a, ` ${i ?? ""}`), K(s, o), K(d, c), K(p, l);
			}, [
				() => Q("tip.faq.multi"),
				() => !!H(N).props.multi,
				() => Q("lbl.faqMulti"),
				() => Q("lbl.questions"),
				() => Q("ui.addQuestion"),
				() => Q("lbl.cardStyle")
			]), U("change", r, (e) => ot("multi", e.target.checked)), U("click", u, ut), G(e, t);
		}, o = (e) => {
			var t = us(), n = R(t), r = L(n), i = z(r);
			Y(i), M(n);
			var a = z(n, 2), o = L(a), s = z(o);
			{
				let e = /* @__PURE__ */ P(() => H(N).props.page ?? "__href"), t = /* @__PURE__ */ P(() => [...H(A).pages.map((e) => [e.id, e.title]), ["__href", Q("opt.externalLink")]]);
				$(s, {
					get value() {
						return H(e);
					},
					get options() {
						return H(t);
					},
					onchange: (e) => {
						let t = e === "__href" ? null : e;
						at(`edit:${H(N).blockId}`, (e) => {
							e.props.page = t, t && (e.props.href = null);
						});
					}
				});
			}
			M(a);
			var c = z(a, 2), l = (e) => {
				var t = ls();
				Y(t), B((e) => {
					Z(t, "placeholder", e), X(t, H(N).props.href === "#" ? "" : H(N).props.href ?? "");
				}, [() => Q("ph.url")]), U("change", t, (e) => ot("href", e.target.value || null)), G(e, t);
			};
			q(c, (e) => {
				H(N).props.page || e(l);
			});
			var u = z(c, 2), d = L(u), f = z(d);
			{
				let e = /* @__PURE__ */ P(() => [["primary", Q("opt.btn.primary")], ["secondary", Q("opt.btn.secondary")]]);
				$(f, {
					get value() {
						return H(N).props.style;
					},
					get options() {
						return H(e);
					},
					onchange: (e) => ot("style", e)
				});
			}
			M(u), B((e, t, n) => {
				K(r, `${e ?? ""} `), X(i, H(N).props.label), K(o, `${t ?? ""} `), K(d, `${n ?? ""} `);
			}, [
				() => Q("blocks.text"),
				() => Q("lbl.goesTo"),
				() => Q("lbl.style")
			]), U("change", i, (e) => ot("label", e.target.value)), G(e, t);
		}, s = (e) => {
			var t = fs(), n = R(t), r = L(n), i = z(r);
			M(n);
			var a = z(n, 2), o = L(a), s = z(o);
			Y(s), M(a);
			var c = z(a, 2), l = L(c), u = z(l);
			{
				let e = /* @__PURE__ */ P(() => H(N).props.fit ?? "cover"), t = /* @__PURE__ */ P(() => [["cover", Q("opt.fitFrame.cover")], ["contain", Q("opt.fitFrame.contain")]]);
				$(u, {
					get value() {
						return H(e);
					},
					get options() {
						return H(t);
					},
					onchange: (e) => ot("fit", e)
				});
			}
			M(c);
			var d = z(c, 2), f = L(d), p = z(f);
			{
				let e = /* @__PURE__ */ P(() => H(N).props.radius ?? ""), t = /* @__PURE__ */ P(() => [
					["", Q("common.none")],
					["sm", Q("opt.size.sm")],
					["md", Q("opt.radius.md")]
				]);
				$(p, {
					get value() {
						return H(e);
					},
					get options() {
						return H(t);
					},
					onchange: (e) => ot("radius", e || null)
				});
			}
			M(d);
			var m = z(d, 2), h = L(m), g = z(h);
			Y(g), M(m);
			var _ = z(m, 2), v = (e) => {
				var t = ds(), n = L(t);
				Y(n);
				var r = z(n);
				M(t), B((e, i, a) => {
					Z(t, "title", e), ai(n, i), K(r, ` ${a ?? ""}`);
				}, [
					() => Q("tip.lightbox"),
					() => !!H(N).props.lightbox,
					() => Q("lbl.lightbox")
				]), U("change", n, (e) => ot("lightbox", e.target.checked)), G(e, t);
			};
			q(_, (e) => {
				H(N).props.href || e(v);
			});
			var y = z(_, 2), b = L(y), x = z(b), S = L(x);
			M(x), M(y);
			var C = z(y, 2);
			Y(C);
			var w = z(C, 2), T = L(w), E = z(T), D = L(E);
			M(E), M(w);
			var ee = z(w, 2);
			Y(ee);
			var te = z(ee, 2), ne = L(te), re = z(ne), ie = L(re);
			M(re), M(te);
			var ae = z(te, 2);
			Y(ae);
			var oe = z(ae, 2), se = L(oe), ce = z(se), le = L(ce);
			M(ce), M(oe);
			var ue = z(oe, 2);
			Y(ue);
			var de = z(ue, 2), fe = L(de), pe = z(fe), O = L(pe);
			M(pe), M(de);
			var me = z(de, 2);
			Y(me);
			var k = z(me, 2), A = L(k), he = z(A), ge = L(he);
			M(he), M(k);
			var _e = z(k, 2);
			Y(_e);
			var ve = z(_e, 2), ye = L(ve, !0);
			M(ve), B((e, t, n, i, a, c, u, d, p, m, _, v, y, x, w, E, re, oe, ce, de, pe, k) => {
				K(r, `${e ?? ""} `), K(o, `${t ?? ""} `), X(s, H(N).props.alt ?? ""), Z(s, "placeholder", n), K(l, `${i ?? ""} `), K(f, `${a ?? ""} `), K(h, `${c ?? ""} `), X(g, H(N).props.href ?? ""), Z(g, "placeholder", u), K(b, `${d ?? ""} `), K(S, `${p ?? ""}%`), X(C, H(N).props.x ?? .5), K(T, `${m ?? ""} `), K(D, `${_ ?? ""}%`), X(ee, H(N).props.y ?? .5), Z(te, "title", v), K(ne, `${y ?? ""} `), K(ie, `${x ?? ""}x`), X(ae, H(N).props.zoom ?? 1), K(se, `${w ?? ""} `), K(le, `${E ?? ""}%`), X(ue, H(N).props.brightness ?? 1), K(fe, `${re ?? ""} `), K(O, `${oe ?? ""}%`), X(me, H(N).props.contrast ?? 1), K(A, `${ce ?? ""} `), K(ge, `${de ?? ""}%`), X(_e, H(N).props.saturate ?? 1), Z(ve, "title", pe), K(ye, k);
			}, [
				() => Q("ui.changeImage"),
				() => Q("lbl.description"),
				() => Q("ph.altText"),
				() => Q("lbl.fit"),
				() => Q("lbl.radius"),
				() => Q("lbl.link"),
				() => Q("ph.optionalImageLink"),
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
			]), U("change", i, mt), U("change", s, (e) => ot("alt", e.target.value)), U("change", g, (e) => ot("href", e.target.value || null)), U("input", C, (e) => ot("x", Number(e.target.value))), U("input", ee, (e) => ot("y", Number(e.target.value))), U("input", ae, (e) => ot("zoom", Number(e.target.value))), U("input", ue, (e) => ot("brightness", Number(e.target.value))), U("input", me, (e) => ot("contrast", Number(e.target.value))), U("input", _e, (e) => ot("saturate", Number(e.target.value))), U("click", ve, () => at(`edit:${H(N).blockId}`, (e) => {
				e.props.brightness = 1, e.props.contrast = 1, e.props.saturate = 1;
			})), G(e, t);
		}, l = (e) => {
			var t = ps(), n = R(t), r = L(n, !0);
			M(n);
			var i = z(n, 2);
			Y(i);
			var a = z(i, 2), o = L(a), s = z(o);
			Y(s), M(a);
			var c = z(a, 2), l = L(c, !0);
			M(c), B((e, t, n, a) => {
				K(r, e), X(i, H(N).props.url ?? ""), Z(i, "placeholder", t), K(o, `${n ?? ""} `), X(s, H(N).props.title ?? ""), K(l, a);
			}, [
				() => Q("lbl.videoUrl"),
				() => Q("ph.videoUrl"),
				() => Q("lbl.videoTitle"),
				() => Q("hint.video")
			]), U("change", i, (e) => ot("url", e.target.value)), U("change", s, (e) => ot("title", e.target.value)), G(e, t);
		}, u = (e) => {
			var t = _s(), n = R(t), r = L(n), i = z(r), a = L(i);
			{
				let e = /* @__PURE__ */ P(() => H(N).props.glyph ?? "★"), t = /* @__PURE__ */ P(() => H(N).props.icon ?? null), n = /* @__PURE__ */ P(() => H(N).props.image ?? null);
				fa(a, {
					get value() {
						return H(e);
					},
					get icon() {
						return H(t);
					},
					get image() {
						return H(n);
					},
					onpick: (e) => at(`edit:${H(N).blockId}`, (t) => {
						t.props.glyph = e, t.props.icon = null, t.props.image = null;
					}),
					onicon: (e) => at(`edit:${H(N).blockId}`, (t) => {
						t.props.icon = e, t.props.image = null;
					}),
					onimage: (e) => ot("image", e)
				});
			}
			var o = z(a, 2), s = (e) => {
				var t = ms();
				Y(t), B((e) => {
					X(t, H(N).props.glyph ?? ""), Z(t, "title", e);
				}, [() => Q("tip.icon.typeGlyph")]), U("change", t, (e) => ot("glyph", e.target.value || "★")), G(e, t);
			}, c = (e) => {
				var t = hs(), n = L(t, !0);
				M(t), B((e, r) => {
					Z(t, "title", e), K(n, r);
				}, [() => Q("tip.icon.backToGlyph"), () => Q("ui.removeDrawnIcon")]), U("click", t, () => ot("icon", null)), G(e, t);
			};
			q(o, (e) => {
				H(N).props.icon ? e(c, -1) : e(s);
			}), M(i), M(n);
			var l = z(n, 2), u = (e) => {
				var t = gs(), n = R(t), r = L(n), i = z(r, 2), a = L(i, !0);
				M(i), M(n);
				var o = z(n, 2), s = L(o, !0);
				M(o), B((e, t, n) => {
					Z(r, "src", H(N).props.image), Z(r, "alt", e), K(a, t), K(s, n);
				}, [
					() => Q("gp.ownIcon"),
					() => Q("ui.removeOwnIcon"),
					() => Q("hint.icon.ownImage")
				]), U("click", i, () => ot("image", null)), G(e, t);
			};
			q(l, (e) => {
				H(N).props.image && e(u);
			});
			var d = z(l, 2), f = L(d), p = z(f);
			Y(p), M(d);
			var m = z(d, 2), h = L(m), g = z(h);
			{
				let e = /* @__PURE__ */ P(() => H(N).props.color ?? "accent"), t = /* @__PURE__ */ P(hn);
				Pi(g, {
					get value() {
						return H(e);
					},
					get tokens() {
						return H(t);
					},
					onchange: (e) => ot("color", e)
				});
			}
			M(m);
			var _ = z(m, 2), v = L(_, !0);
			M(_), B((e, t, n, i) => {
				K(r, `${e ?? ""} `), K(f, `${t ?? ""} `), X(p, H(N).props.size ?? 48), K(h, `${n ?? ""} `), K(v, i);
			}, [
				() => Q("blocks.icon"),
				() => Q("lbl.sizePx"),
				() => Q("lbl.color"),
				() => Q("hint.icon.color")
			]), U("change", p, (e) => ot("size", Number(e.target.value))), G(e, t);
		}, d = (e) => {
			var t = vs(), n = R(t), r = L(n), i = z(r);
			{
				let e = /* @__PURE__ */ P(() => H(N).props.collection ?? ""), t = /* @__PURE__ */ P(() => [["", Q("common.choose")], ...H(Gr).map((e) => [e, H(Kr)[e]?.name ?? e])]);
				$(i, {
					get value() {
						return H(e);
					},
					get options() {
						return H(t);
					},
					onchange: (e) => ot("collection", e || null)
				});
			}
			M(n);
			var a = z(n, 2), o = L(a), s = z(o);
			{
				let e = /* @__PURE__ */ P(() => H(N).props.view ?? "cards"), t = /* @__PURE__ */ P(() => [
					["cards", Q("opt.collectionView.cards")],
					["list", Q("opt.collectionView.list")],
					["archive", Q("opt.collectionView.archive")]
				]);
				$(s, {
					get value() {
						return H(e);
					},
					get options() {
						return H(t);
					},
					onchange: (e) => ot("view", e)
				});
			}
			M(a);
			var c = z(a, 2), l = L(c), u = z(l);
			Y(u), M(c);
			var d = z(c, 2), f = L(d);
			Y(f);
			var p = z(f);
			M(d);
			var m = z(d, 2), h = L(m, !0);
			M(m), B((e, t, n, i, a) => {
				K(r, `${e ?? ""} `), K(o, `${t ?? ""} `), K(l, `${n ?? ""} `), X(u, H(N).props.limit ?? 6), ai(f, H(N).props.newestFirst !== !1), K(p, ` ${i ?? ""}`), K(h, a);
			}, [
				() => Q("blocks.samling"),
				() => Q("lbl.view"),
				() => Q("lbl.maxCount"),
				() => Q("lbl.newestFirst"),
				() => Q("hint.samling")
			]), U("change", u, (e) => ot("limit", Number(e.target.value))), U("change", f, (e) => ot("newestFirst", e.target.checked)), G(e, t);
		}, f = (e) => {
			var t = Ss(), n = R(t), r = L(n), i = z(r);
			{
				let e = /* @__PURE__ */ P(() => H(N).props.view ?? "grid"), t = /* @__PURE__ */ P(() => [
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
					onchange: (e) => ot("view", e)
				});
			}
			M(n);
			var a = z(n, 2), o = (e) => {
				var t = ys(), n = R(t), r = L(n), i = z(r);
				Y(i), M(n);
				var a = z(n, 2), o = L(a), s = z(o), c = L(s);
				M(s), M(a);
				var l = z(a, 2);
				Y(l), B((e, t) => {
					K(r, `${e ?? ""} `), X(i, H(N).props.columns ?? 3), K(o, `${t ?? ""} `), K(c, `${H(N).props.gap ?? 12 ?? ""} px`), X(l, H(N).props.gap ?? 12);
				}, [() => Q("lbl.columns"), () => Q("lbl.imageGap")]), U("change", i, (e) => ot("columns", Number(e.target.value))), U("input", l, (e) => ot("gap", Number(e.target.value))), G(e, t);
			};
			q(a, (e) => {
				(H(N).props.view ?? "grid") === "grid" && e(o);
			});
			var s = z(a, 2), l = (e) => {
				var t = bs(), n = L(t), r = z(n);
				Y(r), M(t), B((e) => {
					K(n, `${e ?? ""} `), X(r, H(N).props.interval ?? 5);
				}, [() => Q("lbl.secondsPerImage")]), U("change", r, (e) => ot("interval", Number(e.target.value))), G(e, t);
			};
			q(s, (e) => {
				H(N).props.view === "slides" && e(l);
			});
			var u = z(s, 2), d = L(u), f = z(d);
			{
				let e = /* @__PURE__ */ P(() => H(N).props.radius ?? ""), t = /* @__PURE__ */ P(() => [
					["", Q("common.none")],
					["sm", Q("opt.size.sm")],
					["md", Q("opt.radius.md")]
				]);
				$(f, {
					get value() {
						return H(e);
					},
					get options() {
						return H(t);
					},
					onchange: (e) => ot("radius", e || null)
				});
			}
			M(u);
			var p = z(u, 2), m = L(p);
			Y(m);
			var h = z(m);
			M(p);
			var g = z(p, 4), _ = L(g), v = z(_);
			M(g);
			var y = z(g, 2);
			Vr(y, 17, () => H(N).props.images ?? [], Lr, (e, t, n) => {
				var r = xs(), i = L(r), a = L(i), o = z(a, 2), s = L(o);
				s.disabled = n === 0, J(s, () => c.up, !0), M(s);
				var l = z(s, 2);
				J(l, () => c.down, !0), M(l);
				var u = z(l, 2);
				J(u, () => c.cross, !0), M(u), M(o), M(i);
				var d = z(i, 2), f = L(d), p = z(f);
				Y(p), M(d);
				var m = z(d, 2), h = L(m), g = z(h);
				Y(g), M(m), M(r), B((e, r, i, o, s) => {
					Z(a, "src", H(t).src), l.disabled = n === H(N).props.images.length - 1, Z(u, "title", e), K(f, `${r ?? ""} `), X(p, H(t).alt ?? ""), Z(p, "placeholder", i), K(h, `${o ?? ""} `), X(g, H(t).href ?? ""), Z(g, "placeholder", s);
				}, [
					() => Q("tip.removeImage"),
					() => Q("lbl.description"),
					() => Q("ph.altShort"),
					() => Q("lbl.link"),
					() => Q("ph.galleryHref")
				]), U("click", s, () => yl(n, -1)), U("click", l, () => yl(n, 1)), U("click", u, () => bl(n)), U("change", p, (e) => xl(n, "alt", e.target.value)), U("change", g, (e) => xl(n, "href", e.target.value || null)), G(e, r);
			});
			var b = z(y, 2), x = L(b, !0);
			M(b), B((e, t, n, i, a, o, s) => {
				K(r, `${e ?? ""} `), K(d, `${t ?? ""} `), Z(p, "title", n), ai(m, H(N).props.lightbox !== !1), K(h, ` ${i ?? ""}`), Z(g, "title", a), K(_, `${o ?? ""} `), K(x, s);
			}, [
				() => Q("lbl.view"),
				() => Q("lbl.radius"),
				() => Q("tip.lightbox"),
				() => Q("lbl.lightbox"),
				() => Q("tip.gallery.addImages"),
				() => Q("ui.addImages"),
				() => Q("hint.gallery")
			]), U("change", m, (e) => ot("lightbox", e.target.checked)), U("change", v, _l), G(e, t);
		}, p = (e) => {
			var t = Cs(), n = R(t), r = L(n);
			$(z(r), {
				get value() {
					return H(N).props.kind;
				},
				get options() {
					return gt;
				},
				onchange: (e) => ot("kind", e)
			}), M(n);
			var i = z(n, 2), a = L(i);
			$(z(a), {
				get value() {
					return H(N).props.color;
				},
				get options() {
					return _t;
				},
				onchange: (e) => ot("color", e)
			}), M(i);
			var o = z(i, 2), s = L(o), c = z(s);
			Y(c), M(o);
			var l = z(o, 2), u = L(l);
			Y(u);
			var d = z(u);
			M(l), B((e, t, n, i, o, f) => {
				K(r, `${e ?? ""} `), K(a, `${t ?? ""} `), K(s, `${n ?? ""} `), X(c, H(N).props.thickness), Z(l, "title", i), ai(u, o), K(d, ` ${f ?? ""}`);
			}, [
				() => Q("blocks.shape"),
				() => Q("lbl.color"),
				() => Q("lbl.thickness"),
				() => Q("tip.shape.fill"),
				() => !!H(N).props.fill,
				() => Q("lbl.filled")
			]), U("change", c, (e) => ot("thickness", Number(e.target.value))), U("change", u, (e) => ot("fill", e.target.checked ? H(N).props.color : null)), G(e, t);
		}, m = (e) => {
			var t = ws(), n = R(t), r = L(n, !0);
			M(n);
			var i = z(n, 2), a = L(i, !0);
			M(i), B((e, t) => {
				K(r, e), K(a, t);
			}, [() => Q("ui.settings"), () => Q("hint.pluginBlock")]), U("click", n, () => k?.sendOpenConfig(H(N).blockId)), G(e, t);
		};
		q(n, (e) => {
			H(N).type === "text" ? e(r) : H(N).type === "faq" ? e(a, 1) : H(N).type === "button" ? e(o, 2) : H(N).type === "image" ? e(s, 3) : H(N).type === "video" ? e(l, 4) : H(N).type === "icon" ? e(u, 5) : H(N).type === "samling" ? e(d, 6) : H(N).type === "galleri" ? e(f, 7) : H(N).type === "shape" ? e(p, 8) : e(m, -1);
		});
		var h = z(n, 4), g = L(h), _ = z(g);
		{
			let e = /* @__PURE__ */ P(() => wn(H(N).animation) ? H(N).animation.type : "");
			$(_, {
				get value() {
					return H(e);
				},
				get options() {
					return Tn;
				},
				onchange: (e) => On(e || null)
			});
		}
		M(h);
		var v = z(h, 2), y = (e) => {
			var t = Ts(), n = R(t), r = L(n), i = z(r);
			Y(i), M(n);
			var a = z(n, 2), o = L(a), s = z(o);
			Y(s), M(a), B((e, t) => {
				K(r, `${e ?? ""} `), X(i, H(N).animation.props.duration), K(o, `${t ?? ""} `), X(s, H(N).animation.props.delay);
			}, [() => Q("lbl.durationMs"), () => Q("lbl.delayMs")]), U("change", i, (e) => An("duration", Number(e.target.value))), U("change", s, (e) => An("delay", Number(e.target.value))), G(e, t);
		}, b = /* @__PURE__ */ P(() => wn(H(N).animation));
		q(v, (e) => {
			H(b) && e(y);
		});
		var x = z(v, 2), S = L(x), C = z(S);
		{
			let e = /* @__PURE__ */ P(() => H(N).hover?.type ?? (H(N).animation && !wn(H(N).animation) ? H(N).animation.type : ""));
			$(C, {
				get value() {
					return H(e);
				},
				get options() {
					return En;
				},
				onchange: (e) => kn(e || null)
			});
		}
		M(x);
		var w = z(x, 2), T = (e) => {
			var t = Ds(), n = z(R(t), 2), r = L(n);
			Y(r);
			var i = z(r);
			M(n);
			var a = z(n, 2), o = (e) => {
				var t = Es(), n = R(t), r = L(n), i = z(r);
				Y(i), M(n);
				var a = z(n, 2), o = L(a), s = z(o);
				{
					let e = /* @__PURE__ */ P(() => H(N).sticky.until ?? ""), t = /* @__PURE__ */ P(nt);
					$(s, {
						get value() {
							return H(e);
						},
						get options() {
							return H(t);
						},
						onchange: (e) => at(`edit:${H(N).blockId}`, (t) => {
							t.sticky = {
								...t.sticky,
								until: e || null
							};
						})
					});
				}
				M(a), B((e, t, s, c) => {
					Z(n, "title", e), K(r, `${t ?? ""} `), X(i, H(N).sticky.offset ?? 16), Z(a, "title", s), K(o, `${c ?? ""} `);
				}, [
					() => Q("tip.stickyOffset"),
					() => Q("lbl.stickyOffset"),
					() => Q("tip.stickyUntil"),
					() => Q("lbl.stickyUntil")
				]), U("change", i, (e) => at(`edit:${H(N).blockId}`, (t) => {
					t.sticky = {
						...t.sticky,
						offset: Math.max(0, Number(e.target.value) || 0)
					};
				})), G(e, t);
			};
			q(a, (e) => {
				H(N).sticky && e(o);
			}), B((e, t, a) => {
				Z(n, "title", e), ai(r, t), K(i, ` ${a ?? ""}`);
			}, [
				() => Q("tip.sticky"),
				() => !!H(N).sticky,
				() => Q("lbl.sticky")
			]), U("change", r, (e) => at(`edit:${H(N).blockId}`, (t) => {
				t.sticky = e.target.checked ? {
					offset: 16,
					until: null
				} : null;
			})), G(e, t);
		};
		q(w, (e) => {
			H(ee) === "desktop" && e(T);
		});
		var E = z(w, 4), D = L(E), te = L(D, !0);
		M(D);
		var ne = z(D, 2), re = L(ne), ie = L(re, !0);
		M(re);
		var ae = z(re, 2), oe = (e) => {
			var t = Os(), n = L(t), r = L(n, !0), i = z(r);
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
				K(r, e), X(i, H(N).frame.x), K(o, t), X(s, H(N).frame.y), K(l, n), X(u, H(N).frame.w), K(f, a), X(p, H(N).frame.h), Z(m, "title", c), K(h, d), X(g, H(N).frame.z ?? 1), K(v, _), X(y, H(N).frame.rot ?? 0);
			}, [
				() => Q("frame.x"),
				() => Q("frame.y"),
				() => Q("frame.w"),
				() => Q("frame.h"),
				() => Q("tip.frameZ"),
				() => Q("frame.z"),
				() => Q("frame.rot")
			]), U("change", i, (e) => st("x", Number(e.target.value))), U("change", s, (e) => st("y", Number(e.target.value))), U("change", u, (e) => st("w", Number(e.target.value))), U("change", p, (e) => st("h", Number(e.target.value))), U("change", g, (e) => st("z", Number(e.target.value))), U("change", y, (e) => st("rot", Number(e.target.value))), G(e, t);
		};
		q(ae, (e) => {
			H(ee) === "desktop" && e(oe);
		});
		var se = z(ae, 2), ce = L(se);
		Y(ce);
		var le = z(ce);
		M(se), M(ne), M(E), B((e, t, n, r, i, a, o, s) => {
			Z(h, "title", e), K(g, `${t ?? ""} `), Z(x, "title", n), K(S, `${r ?? ""} `), K(te, i), K(ie, a), Z(se, "title", o), ai(ce, H(N).decor), K(le, ` ${s ?? ""}`);
		}, [
			() => Q("tip.props.blockAnim"),
			() => Q("lbl.animIn"),
			() => Q("tip.props.blockHover"),
			() => Q("lbl.onHover"),
			() => Q("group.placement"),
			() => Q("hint.placement"),
			() => Q("tip.decor"),
			() => Q("lbl.decor")
		]), U("change", ce, (e) => pt(e.target.checked)), G(e, t);
	}, o = [
		["color", Ua],
		["gradient", ro],
		["glow", io],
		["image", ko],
		["bildegalleri", No],
		["grain", oo]
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
		guides: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"><path d=\"M12 3v4M12 17v4M3 12h4M17 12h4\"/><circle cx=\"12\" cy=\"12\" r=\"3.2\" stroke-dasharray=\"2.5 2.5\"/></svg>",
		fit: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M4 9V5a1 1 0 0 1 1-1h4M20 9V5a1 1 0 0 0-1-1h-4M4 15v4a1 1 0 0 0 1 1h4M20 15v4a1 1 0 0 1-1 1h-4\"/></svg>"
	}, l = [
		["lilla", Q("adminTheme.lilla")],
		["bronn", Q("adminTheme.bronn")],
		["gull", Q("adminTheme.gull")],
		["graa", Q("adminTheme.graa")],
		["nordlys", Q("adminTheme.nordlys")],
		["skumring", Q("adminTheme.skumring")],
		["glo", Q("adminTheme.glo")]
	], u = /* @__PURE__ */ F(nn(localStorage.getItem("urd-admin-theme") ?? "graa"));
	xn(() => {
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
		return Va(e) == null || (Ha(e, "#ffffff") ?? 0) >= (Ha(e, "#0b0e14") ?? 0) ? "#ffffff" : "#0b0e14";
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
	let w = /* @__PURE__ */ F(null), T = /* @__PURE__ */ F(null), E = /* @__PURE__ */ F(nn({
		size: 16,
		snap: !0
	})), D = /* @__PURE__ */ F(!0), ee = /* @__PURE__ */ F("desktop"), te = /* @__PURE__ */ F(null), ne = /* @__PURE__ */ F(0), re = /* @__PURE__ */ F(0), ie = /* @__PURE__ */ F(nn(typeof window < "u" ? window.innerWidth : 1280)), ae = /* @__PURE__ */ F("fit"), oe = /* @__PURE__ */ P(() => H(ee) === "mobile" ? 390 : H(ie)), se = /* @__PURE__ */ P(() => ha(H(ne), H(oe), H(ae))), ce = /* @__PURE__ */ P(() => H(se) > 0 ? H(re) / H(se) : H(re)), le = /* @__PURE__ */ P(() => H(oe) * H(se)), ue = /* @__PURE__ */ P(() => H(re));
	xn(() => {
		let e = () => k?.sendCloseMenus();
		return document.addEventListener("pointerdown", e, !0), () => document.removeEventListener("pointerdown", e, !0);
	}), xn(() => {
		let e = H(ee);
		k?.sendViewport(e);
	}), xn(() => {
		let e = () => {
			I(ie, window.innerWidth, !0);
		};
		return window.addEventListener("resize", e), () => window.removeEventListener("resize", e);
	}), xn(() => {
		let e = H(te);
		if (!e || typeof ResizeObserver > "u") return;
		let t = () => {
			let t = e.getBoundingClientRect();
			I(ne, t.width, !0), I(re, t.height, !0);
		};
		t();
		let n = new ResizeObserver(t);
		return n.observe(e), () => n.disconnect();
	});
	let de = /* @__PURE__ */ F(0);
	function fe() {
		I(de, O?.data.sections.filter((e) => e.responsive?.mobile?.attention?.needed).length ?? 0, !0);
	}
	function pe(e, t) {
		!e || e.responsive?.mobile?.mode !== "manual" || e.responsive.mobile.attention?.needed || (e.responsive.mobile.attention = {
			needed: !0,
			reason: t,
			since: (/* @__PURE__ */ new Date()).toISOString()
		}, fe(), k?.sendAttention(e.id, !0));
	}
	let O = null, me = null, k = null, A = /* @__PURE__ */ F(null);
	function he() {
		I(A, me.data, !0), me.replace(H(A));
	}
	function ge() {
		k?.sendSite(ze(H(A)));
	}
	let _e = /* @__PURE__ */ new Set(), ve = () => H(A).pages.find((e) => e.id === H(g));
	function ye() {
		let e = H(A)?.pages?.some((e) => !_e.has(e.id) && localStorage.getItem(`urd-draft-${e.id}`) !== null) ?? !1, t = Br?.hasDraft() || Object.values(Hr).some((e) => e.hasDraft());
		I(_, e || O?.hasDraft() && !_e.has(H(g)) || me?.hasDraft() || mi?.hasDraft() || t || !1, !0);
	}
	let be = [], xe = [], Se = null;
	function Ce() {
		return JSON.stringify({
			pageId: H(g),
			page: O.data,
			site: me.data,
			samlingerIndex: Wr ? Br.data : null,
			samlinger: Wr ? Object.fromEntries(Object.entries(Hr).map(([e, t]) => [e, t.data])) : {},
			plugins: mi?.data ?? null
		});
	}
	function we(e) {
		e === Se && (e.startsWith("edit:") || e.startsWith("grid:")) || (be.push(Ce()), be.length > 50 && be.shift(), xe.length = 0, Se = e);
	}
	function Te(e) {
		let { pageId: t, page: n, site: r, samlingerIndex: i, samlinger: a, plugins: o } = JSON.parse(e);
		if (me.replace(r), he(), me.save(), I(E, {
			snap: !0,
			...H(A).grid
		}, !0), ge(), Ee(i, a ?? {}), De(o), t && t !== H(g) && H(A).pages.some((e) => e.id === t)) {
			C(`urd-draft-${t}`, JSON.stringify(n)), er(t, { keepHistory: !0 }), ye();
			return;
		}
		O.replace(n), O.save(), ye(), fe(), $e(), Tt(O.data.sections.find((e) => e.id === H(vt))), H(A).pages.some((e) => e.id === H(g)) ? k?.sendPage(H(g), O.data) : er(H(A).pages[0].id, { keepHistory: !0 });
	}
	function Ee(e, t) {
		if (!(!Br || !e) && JSON.stringify({
			index: Br.data,
			samlinger: Object.fromEntries(Object.entries(Hr).map(([e, t]) => [e, t.data]))
		}) !== JSON.stringify({
			index: e,
			samlinger: t
		})) {
			Br.replace(e), Br.save();
			for (let e of Object.keys(Hr)) e in t || (localStorage.removeItem(`urd-draft-samling-${e}`), delete Hr[e]);
			for (let [e, n] of Object.entries(t)) {
				if (!Hr[e]) {
					let t = Ur[e] ?? {
						schemaVersion: 1,
						id: e,
						name: n.name ?? e,
						kind: n.kind ?? "custom",
						entries: []
					};
					Hr[e] = Si(`urd-draft-samling-${e}`, () => t, S);
				}
				Hr[e].replace(n), Hr[e].save();
			}
			I(Gr, [...e.samlinger ?? []], !0), H(qr) && !H(Gr).includes(H(qr)) && I(qr, null), $r();
		}
	}
	function De(e) {
		!mi || !e || JSON.stringify(mi.data) !== JSON.stringify(e) && (mi.replace(e), mi.save(), Di(), Ni());
	}
	function j() {
		be.length && (xe.push(Ce()), Te(be.pop()), Se = null, x(Q("status.undone")));
	}
	function Oe() {
		xe.length && (be.push(Ce()), Te(xe.pop()), Se = null, x(Q("status.redone")));
	}
	function ke(e) {
		H(tt) && (e.target instanceof Element && e.target.closest(".block-menu") || I(tt, null));
	}
	function Ae(e) {
		if (e.key === "Escape" && H(tt)) {
			I(tt, null);
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
		].includes(n.type)) || (e.preventDefault(), t === "y" || e.shiftKey ? Oe() : j());
	}
	async function je() {
		I(h, Ea(await (await fetch("/content/site.json")).json()), !0), me = Si("urd-draft-site", () => H(h), S), me.replace(Ea(me.data)), me.save(), he(), I(E, {
			snap: !0,
			...H(A).grid
		}, !0), await er(new URLSearchParams(location.search).get("page") ?? H(A).pages[0].id), await Oi(), await Zr(), await Bn(), H(T) && Hn(), (H(A).site.setup === !0 || H(A).site.title === "Min forening") && !localStorage.getItem("urd-setup-done") && (I(Le, H(A).site.title, !0), I(Re, H(A).theme.tokens.color.accent, !0), I(Be, H(A).theme.tokens.color.bg, !0), I(Ie, !0));
	}
	let Ne = /* @__PURE__ */ F(null);
	function Pe({ title: e, lines: t = [], okLabel: n = Q("confirm.ok"), cancelLabel: r = Q("confirm.cancel") }) {
		return new Promise((i) => {
			I(Ne, {
				title: e,
				lines: t,
				okLabel: n,
				cancelLabel: r,
				resolve: i
			}, !0);
		});
	}
	function Fe(e) {
		H(Ne)?.resolve(e), I(Ne, null);
	}
	let Ie = /* @__PURE__ */ F(!1), Le = /* @__PURE__ */ F(""), Re = /* @__PURE__ */ F("#7c5cff"), Be = /* @__PURE__ */ F("#0b0e14");
	function Ve() {
		localStorage.setItem("urd-setup-done", "1"), I(Ie, !1);
	}
	function He() {
		let e = H(Le).trim();
		e && (V("setup", () => {
			H(A).site.title = e, H(A).nav.logo = {
				type: "text",
				value: e
			}, H(A).theme.tokens.color.accent = H(Re), H(A).theme.tokens.color.bg = H(Be), delete H(A).site.setup;
		}), Ve(), x(Q("status.setupDone"), "ok"));
	}
	let Ge = /* @__PURE__ */ F(null), Ke = [
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
		["history"]
	], qe = Object.fromEntries(Ke.flat().map((e) => [e, Q(`panel.${e}`)])), Je = [
		["nb", "Norsk bokmål"],
		["nn", "Norsk nynorsk"],
		["en-GB", "English (UK)"],
		["se", "Davvisámegiella"],
		["tr", "Türkçe"]
	], Ye = localStorage.getItem("urd-admin-lang") ?? "auto";
	function Xe(e) {
		e !== Ye && (e === "auto" ? localStorage.removeItem("urd-admin-lang") : localStorage.setItem("urd-admin-lang", e), location.reload());
	}
	function Ze(e) {
		I(Ge, H(Ge) === e ? null : e, !0), k?.sendShowGrid(H(Ge) === "grid"), H(Ge) === "history" && qn();
	}
	let N = /* @__PURE__ */ F(null);
	function Qe(e, t) {
		let n = O?.data.sections.find((t) => t.id === e);
		return {
			section: n,
			block: n?.blocks.find((e) => e.id === t)
		};
	}
	function $e() {
		if (!H(N)) return;
		let { block: e } = Qe(H(N).sectionId, H(N).blockId);
		if (!e) {
			I(N, null);
			return;
		}
		I(N, {
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
	function et(e) {
		if (I(tt, null), !e.blockId) {
			I(N, null);
			return;
		}
		I(N, {
			sectionId: e.sectionId,
			blockId: e.blockId
		}, !0), e.sectionId && I(vt, e.sectionId, !0), $e();
	}
	let tt = /* @__PURE__ */ F(null);
	function nt() {
		let e = O?.data.sections ?? [], t = e.findIndex((e) => e.id === H(N)?.sectionId);
		return [["", Q("opt.sticky.ownSection")], ...e.slice(t + 1).map((e, n) => [e.id, Q("opt.sticky.atSection", { n: t + 2 + n })])];
	}
	function rt(e) {
		if (et(e), !H(N)) return;
		let t = H(w)?.getBoundingClientRect();
		if (!t) return;
		let n = t.left + H(se) * e.rect.right + 12;
		n + 300 > window.innerWidth - 8 && (n = Math.max(8, t.left + H(se) * e.rect.left - 300 - 12));
		let r = window.innerHeight - Math.min(window.innerHeight * .7, 560) - 8, i = Math.min(Math.max(8, t.top + H(se) * e.rect.top), Math.max(8, r));
		I(tt, {
			left: n,
			top: i
		}, !0);
	}
	function at(e, t) {
		let { section: n, block: r } = Qe(H(N)?.sectionId, H(N)?.blockId);
		r && (we(e), t(r, n), pe(n, "blokk-endret"), O.save(), ye(), k?.sendSection(H(g), n), $e());
	}
	function ot(e, t) {
		at(`edit:${H(N).blockId}:${e}`, (n) => {
			n.props[e] = t;
		});
	}
	function st(e, t) {
		Number.isFinite(t) && at(`edit:frame-${H(N).blockId}:${e}`, (n) => {
			n.frames.desktop = {
				...n.frames.desktop,
				[e]: t
			};
		});
	}
	function ct(e) {
		at(`edit:${H(N).blockId}:boxStyle`, (t) => {
			let n = {
				...t.props.boxStyle ?? {},
				...e
			};
			for (let e of Object.keys(n)) n[e] ?? delete n[e];
			Object.keys(n).length ? t.props.boxStyle = n : delete t.props.boxStyle;
		});
	}
	function lt(e, t) {
		at(`edit:${H(N).blockId}:faq${e}`, (n) => {
			n.props.items[e] = {
				...n.props.items[e],
				...t
			};
		});
	}
	function ut() {
		at("faq-item", (e) => {
			(e.props.items ??= []).push({
				q: "Nytt spørsmål?",
				a: "<p>Skriv svaret her.</p>"
			});
		});
	}
	function dt(e) {
		at("faq-item", (t) => {
			t.props.items.splice(e, 1);
		});
	}
	function ft(e, t) {
		let n = e + t;
		at("faq-item", (t) => {
			n < 0 || n >= t.props.items.length || ([t.props.items[e], t.props.items[n]] = [t.props.items[n], t.props.items[e]]);
		});
	}
	function pt(e) {
		at("decor", (t) => {
			t.decor = e;
		});
	}
	async function mt(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await an(t);
			at(`edit:${H(N).blockId}`, (n) => {
				n.props.src = e.dataUrl, n.props.alt = n.props.alt || Gi(t.name).replaceAll("-", " ");
			});
		} catch {
			x(Q("status.imageReadError"), "error");
		}
	}
	let ht = {
		text: Q("blocks.text"),
		button: Q("blocks.button"),
		image: Q("blocks.image"),
		shape: Q("blocks.shape"),
		video: Q("blocks.video"),
		icon: Q("blocks.icon"),
		galleri: Q("blocks.galleri"),
		faq: Q("blocks.faq")
	}, gt = [
		["line", Q("shape.line")],
		["arrow", Q("shape.arrow")],
		["circle", Q("shape.circle")],
		["rect", Q("shape.rect")],
		["triangle", Q("shape.triangle")]
	], _t = [
		["accent", Q("color.accent")],
		["text", Q("color.text")],
		["surface", Q("color.surface")],
		["bg", Q("color.bg")]
	], vt = /* @__PURE__ */ F(null), yt = /* @__PURE__ */ F(null), bt = /* @__PURE__ */ F(""), xt = /* @__PURE__ */ F(nn([])), St = /* @__PURE__ */ F(null), Ct = /* @__PURE__ */ F(null), wt = /* @__PURE__ */ F("");
	function Tt(e) {
		I(yt, e?.grid ? { ...e.grid } : null, !0), I(bt, e?.size?.minHeight ?? "", !0), I(xt, JSON.parse(JSON.stringify(e?.background?.layers ?? [])), !0), I(St, e?.animation ? JSON.parse(JSON.stringify(e.animation)) : null, !0), I(Ct, e?.hover ? JSON.parse(JSON.stringify(e.hover)) : null, !0), I(wt, e?.theme ?? "", !0);
	}
	let Et = /* @__PURE__ */ F(null), Dt = nn({});
	function Ot() {
		try {
			let e = ((H(w)?.contentDocument)?.querySelector(`.urd-section[data-section-id="${H(vt)}"]`))?.getBoundingClientRect();
			I(Et, e && e.width ? {
				w: e.width,
				h: e.height
			} : null, !0);
		} catch {
			I(Et, null);
		}
	}
	xn(() => {
		H(vt), H(xt), requestAnimationFrame(() => requestAnimationFrame(Ot));
	}), xn(() => {
		let e = H(w);
		if (!e || typeof ResizeObserver > "u") return;
		let t = new ResizeObserver(() => Ot());
		return t.observe(e), () => t.disconnect();
	}), xn(() => {
		for (let e of H(xt)) {
			let t = e?.props?.src;
			if (e?.type === "image" && t && !Dt[t]) {
				let e = new Image();
				e.onload = () => {
					Dt[t] = {
						w: e.naturalWidth,
						h: e.naturalHeight
					};
				}, e.src = t;
			}
		}
	});
	function kt(e) {
		jt("section-theme", (t) => {
			e ? t.theme = e : delete t.theme;
		});
	}
	function At(e) {
		I(vt, e.sectionId, !0), Tt(O?.data.sections.find((t) => t.id === e.sectionId));
	}
	function jt(e, t) {
		let n = O.data.sections.find((e) => e.id === H(vt));
		n && (we(e), t(n), O.save(), ye(), k?.sendSection(H(g), n), Tt(n));
	}
	let Mt = /* @__PURE__ */ F("color");
	function Nt(e, t) {
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
	function Pt(e, t) {
		e.mutate(e.keyPrefix, (e) => {
			e.background.layers.splice(t, 1), e.background.layers.length || delete e.background;
		});
	}
	function Ft(e, t, n) {
		let r = t + n;
		e.mutate(e.keyPrefix, (e) => {
			let n = e.background.layers;
			r < 0 || r >= n.length || ([n[t], n[r]] = [n[r], n[t]]);
		});
	}
	function It(e, t, n, r) {
		e.mutate(`edit:${e.keyPrefix}-${e.keyId}-${t}-${n}`, (e) => {
			e.background.layers[t].props[n] = r;
		});
	}
	function Lt(e, t, n, r = "xy") {
		e.preventDefault();
		let i = e.currentTarget;
		i.setPointerCapture?.(e.pointerId);
		let a = (e) => {
			let a = i.getBoundingClientRect();
			if (r.includes("x")) {
				let r = Math.min(1, Math.max(0, (e.clientX - a.left) / a.width));
				It(t, n, "x", Math.round(r * 100) / 100);
			}
			if (r.includes("y")) {
				let r = Math.min(1, Math.max(0, (e.clientY - a.top) / a.height));
				It(t, n, "y", Math.round(r * 100) / 100);
			}
		};
		a(e);
		let o = () => {
			i.removeEventListener("pointermove", a), i.removeEventListener("pointerup", o), i.removeEventListener("pointercancel", o);
		};
		i.addEventListener("pointermove", a), i.addEventListener("pointerup", o), i.addEventListener("pointercancel", o);
	}
	let Rt = (e) => Math.min(4, Math.max(.1, e));
	function zt(e, t, n, r) {
		It(e, t, "size", Rt(Math.round((n + r) * 100) / 100));
	}
	function Bt(e, t, n) {
		let r = Number(n);
		Number.isFinite(r) && It(e, t, "size", Rt(r / 100));
	}
	function Vt(e, t, n, r) {
		let i = Dt[n.props.src];
		if (!i?.w || !i?.h || !H(Et)?.w || !H(Et)?.h) return;
		let a = H(Et).h * i.w / (H(Et).w * i.h), o = r === "cover" ? Math.max(1, a) : Math.min(1, a);
		(n.props.fit === "flislegg" || n.props.fit === "repeat") && It(e, t, "fit", "vanlig"), It(e, t, "size", Rt(Math.round(o * 100) / 100));
	}
	function Ht(e) {
		if ((e.version ?? 1) >= ro.version) return e.props;
		let t = ze(e);
		return xa({
			type: "gradient",
			version: t.version ?? 1,
			props: t.props
		}, ro).props;
	}
	function Ut(e, t, n, r) {
		e.mutate(n, (e) => {
			let n = e.background.layers[t];
			if ((n.version ?? 1) < ro.version) {
				let e = xa({
					type: "gradient",
					version: n.version ?? 1,
					props: ze(n.props)
				}, ro);
				if (!e.ok) return;
				n.props = e.props, n.version = e.version;
			}
			r(n.props);
		});
	}
	function Wt(e, t, n, r) {
		Ut(e, t, `edit:${e.keyPrefix}-${e.keyId}-${t}-${n}`, (e) => {
			e[n] = r;
		});
	}
	let Gt = {
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
	function Kt(e, t, n) {
		Ut(e, t, e.keyPrefix, (e) => {
			e.kind = n, Gt[n].some(([t]) => t === (e.animation ?? "none")) || (e.animation = "none");
		});
	}
	function qt(e, t, n, r) {
		Ut(e, t, `edit:${e.keyPrefix}-${e.keyId}-${t}-stop${n}`, (e) => {
			e.stops[n] = {
				...e.stops[n],
				...r
			};
		});
	}
	function Jt(e, t) {
		Ut(e, t, e.keyPrefix, (e) => {
			let t = Math.round(e.stops.reduce((e, t) => e + (Number(t.share) || 0), 0) / e.stops.length) || 50;
			e.stops.push({
				color: e.stops[e.stops.length - 1]?.color ?? "#ffffff",
				share: t
			});
		});
	}
	function Yt(e, t, n) {
		Ut(e, t, e.keyPrefix, (e) => {
			e.stops.length > 2 && e.stops.splice(n, 1);
		});
	}
	function Xt(e, t, n, r) {
		Ut(e, t, e.keyPrefix, (e) => {
			let [t] = e.stops.splice(n, 1);
			e.stops.splice(r, 0, t);
		});
	}
	let Zt = /* @__PURE__ */ F(null);
	function Qt(e, t, n, r) {
		if (t.button !== 0) return;
		t.preventDefault();
		let i = t.currentTarget.closest(".bg-layer"), a = t.currentTarget.closest(".grad-stop");
		I(Zt, {
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
			I(Zt, {
				...H(Zt),
				insert: n
			}, !0);
		}, u = () => {
			window.removeEventListener("pointermove", l), window.removeEventListener("pointerup", u), c.remove();
			let t = H(Zt);
			if (I(Zt, null), !t) return;
			let n = t.insert > t.from ? t.insert - 1 : t.insert;
			n !== t.from && Xt(e, t.layer, t.from, n);
		};
		window.addEventListener("pointermove", l), window.addEventListener("pointerup", u);
	}
	function $t(e, t, n) {
		e.mutate(e.keyPrefix, (e) => {
			e.background.layers[t].type !== n && (e.background.layers[t] = {
				type: n,
				version: s[n].version ?? 1,
				props: s[n].defaults()
			});
		});
	}
	async function en(e, t) {
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
	async function tn(e) {
		let t = await e.text(), n = Vi(t), r = Ui(t);
		if (!r) return n;
		let i = await en(n.dataUrl, r);
		if (!i) return n;
		let a = Hi(t, i);
		if (a === t) return n;
		try {
			return Vi(a);
		} catch {
			return n;
		}
	}
	async function an(e) {
		return e.type === "image/svg+xml" || /\.svg$/i.test(e.name || "") ? tn(e) : Ri(e);
	}
	async function on(e, t, n) {
		let r = n.target.files?.[0];
		if (n.target.value = "", r) try {
			It(e, t, "src", (await an(r)).dataUrl);
		} catch {
			x(Q("status.imageReadError"), "error");
		}
	}
	async function sn(e, t, n) {
		let r = [...n.target.files ?? []];
		if (n.target.value = "", !r.length) return;
		x(Q("status.compressingImages"));
		let { images: i, failed: a, big: o } = await hl(r);
		i.length && e.mutate(e.keyPrefix, (e) => {
			let n = e.background.layers[t].props;
			n.images ??= [], n.images.push(...i.map(({ src: e }) => ({
				src: e,
				x: .5,
				y: .5
			})));
		}), gl(i.length, a, o);
	}
	function cn(e, t, n, r) {
		e.mutate(e.keyPrefix, (e) => {
			let i = e.background.layers[t].props.images, a = n + r;
			a < 0 || a >= i.length || ([i[n], i[a]] = [i[a], i[n]]);
		});
	}
	function ln(e, t, n) {
		e.mutate(e.keyPrefix, (e) => {
			e.background.layers[t].props.images.splice(n, 1);
		});
	}
	function un(e, t, n, r, i) {
		e.mutate(`edit:${e.keyPrefix}g-${e.keyId}-${t}-${n}-${r}`, (e) => {
			e.background.layers[t].props.images[n][r] = i;
		});
	}
	function dn(e, t) {
		V(e, () => {
			H(A).nav.style ??= {}, t(H(A).nav.style);
		});
	}
	let fn = /* @__PURE__ */ P(() => ({
		mutate: jt,
		keyPrefix: "bg",
		keyId: H(vt)
	})), pn = {
		mutate: dn,
		keyPrefix: "navbg",
		keyId: "nav"
	}, mn = {
		mutate: zi,
		keyPrefix: "footerbg",
		keyId: "footer"
	}, hn = () => Object.entries(H(A)?.theme.tokens.color ?? {}).map(([e, t]) => [e, t]), gn = [
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
	], _n = /* @__PURE__ */ P(() => !!H(A)?.theme.alt), vn = /* @__PURE__ */ P(() => H(A)?.theme.alt?.auto === !0), yn = /* @__PURE__ */ P(() => H(A)?.theme.scheme === "dark" ? "dark" : "light"), bn = /* @__PURE__ */ P(() => H(A)?.theme.tokens.color ?? {}), Sn = /* @__PURE__ */ P(() => ({
		...H(A)?.theme.tokens.color ?? {},
		...H(A)?.theme.alt?.tokens?.color ?? {}
	}));
	function Cn(e) {
		return {
			type: e,
			version: Lo[e].version,
			props: Lo[e].defaults()
		};
	}
	let wn = (e) => !!(e && Lo[e.type]?.entrance), Tn = [["", Q("common.none")], ...Object.entries(Lo).filter(([, e]) => e.entrance).map(([e, t]) => [e, t.label])], En = [["", Q("common.none")], ...Object.entries(Lo).filter(([, e]) => !e.entrance).map(([e, t]) => [e, t.label])];
	function Dn(e) {
		e.animation && !wn(e.animation) && (e.hover ??= e.animation, e.animation = null);
	}
	function On(e) {
		at(`edit:anim-${H(N).blockId}`, (t) => {
			Dn(t), t.animation = e ? Cn(e) : null;
		}), H(N) && k?.sendDemoAnim(H(N).sectionId, H(N).blockId);
	}
	function kn(e) {
		at(`edit:hover-${H(N).blockId}`, (t) => {
			Dn(t), t.hover = e ? Cn(e) : null;
		});
	}
	function An(e, t) {
		Number.isFinite(t) && (at(`edit:anim-${H(N).blockId}:${e}`, (n) => {
			n.animation && (n.animation.props[e] = t);
		}), H(N) && k?.sendDemoAnim(H(N).sectionId, H(N).blockId));
	}
	function jn(e) {
		jt("section-anim", (t) => {
			Dn(t), t.animation = e ? Cn(e) : null;
		}), k?.sendDemoAnim(H(vt));
	}
	function Mn(e) {
		jt("section-hover", (t) => {
			Dn(t), t.hover = e ? Cn(e) : null;
		});
	}
	function Nn(e, t) {
		Number.isFinite(t) && (jt("edit:section-anim", (n) => {
			n.animation && (n.animation.props[e] = t);
		}), k?.sendDemoAnim(H(vt)));
	}
	function Pn(e) {
		jt("edit:section-anim", (t) => {
			t.animation && (t.animation.props.pattern = e);
		}), k?.sendDemoAnim(H(vt));
	}
	function Fn(e) {
		let t = O.data.sections.find((e) => e.id === H(vt));
		if (!t) return;
		let n = e.trim();
		if (!n) return;
		let r = /^\d+$/.test(n) ? `${n}px` : n;
		we("section-size"), t.size = {
			...t.size,
			minHeight: r
		}, I(bt, r, !0), O.save(), ye(), k?.sendSection(H(g), t);
	}
	function In() {
		return O.data.sections.find((e) => e.id === H(vt)) ?? O.data.sections[0];
	}
	function Ln(e) {
		let t = O.data.sections.find((e) => e.id === H(vt));
		t && (we("grid:section"), t.grid = e ? { ...me.data.grid } : null, I(yt, t.grid ? { ...t.grid } : null, !0), O.save(), ye(), k?.sendSection(H(g), t), H(Ge) === "grid" && k?.sendShowGrid(!0));
	}
	function Rn(e, t) {
		let n = O.data.sections.find((e) => e.id === H(vt));
		n?.grid && (we("grid:section"), n.grid = {
			...n.grid,
			[e]: t
		}, I(yt, { ...n.grid }, !0), O.save(), ye(), k?.sendSection(H(g), n), H(Ge) === "grid" && k?.sendShowGrid(!0));
	}
	function zn(e, t) {
		we("grid:site"), I(E, {
			...H(E),
			[e]: t
		}, !0), me.data.grid = {
			...me.data.grid,
			[e]: t
		}, me.save(), ye(), ge(), H(Ge) === "grid" && k?.sendShowGrid(!0);
	}
	async function Bn() {
		try {
			let e = await fetch("/api/github/me");
			e.ok ? I(T, await e.json(), !0) : e.status !== 503 && I(T, null);
		} catch {
			I(T, null);
		}
	}
	let Vn = null;
	async function Hn() {
		try {
			let e = await fetch("/api/github/latest");
			e.ok && (Vn = (await e.json()).head ?? null);
		} catch {}
	}
	async function Un(e) {
		if (!Vn) return await Hn(), {
			ok: await Pe({
				title: Q("confirm.conflictUnknown.title"),
				lines: [Q("confirm.conflictUnknown.body"), Q("confirm.conflictUnknown.warning")],
				okLabel: Q("confirm.publishAnyway"),
				cancelLabel: Q("confirm.cancel")
			}),
			head: Vn
		};
		let t = null;
		try {
			let e = await fetch(`/api/github/latest?base=${Vn}`);
			e.ok && (t = await e.json().catch(() => null));
		} catch {}
		if (!t?.head) return {
			ok: !0,
			head: null
		};
		let n = t.head;
		if (n === Vn) return {
			ok: !0,
			head: n
		};
		let r = new Set(e.map((e) => e.path)), i = t.truncated ? [Q("confirm.conflict.truncated")] : (t.changedFiles ?? []).filter((e) => r.has(e));
		return i.length === 0 ? {
			ok: !0,
			head: n
		} : {
			ok: await Pe({
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
	let Wn = /* @__PURE__ */ F(null), Gn = /* @__PURE__ */ F(""), Kn = /* @__PURE__ */ F(!1);
	async function qn() {
		I(Gn, "");
		try {
			let e = await fetch("/api/github/history");
			e.ok ? I(Wn, (await e.json()).commits, !0) : e.status === 401 ? (I(Wn, [], !0), I(Gn, Q("status.historyLoginRequired"), !0)) : (I(Wn, [], !0), I(Gn, (await e.json().catch(() => null))?.error ?? Q("status.historyFetchFailed"), !0));
		} catch {
			I(Wn, [], !0), I(Gn, Q("status.historyUnavailable"), !0);
		}
	}
	let Jn = new Intl.DateTimeFormat(bi(), {
		dateStyle: "short",
		timeStyle: "short"
	}), Yn = !1;
	async function Xn() {
		let e = H(Wn)?.[0];
		if (!(!e || H(Kn)) && await Pe({
			title: Q("confirm.revert.title"),
			lines: [`«${e.message}»`, Q("confirm.revert.body")],
			okLabel: Q("confirm.revert.ok"),
			cancelLabel: Q("confirm.cancel")
		})) {
			I(Kn, !0), x(Q("status.reverting"));
			try {
				let t = await fetch("/api/github/revert", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({ expect: e.sha })
				});
				if (t.ok) {
					let { sha: e } = await t.json().catch(() => ({}));
					e ? Vn = e : Hn(), Yn = !0, x(Q("status.revertDone"), "ok"), Zn();
				} else t.status === 409 ? x(Q("status.revertConflict"), "error") : x((await t.json().catch(() => null))?.error ?? Q("status.revertFailed"), "error");
			} catch {
				x(Q("status.publishLayerUnreachable"), "error");
			}
			I(Kn, !1), qn();
		}
	}
	async function Zn() {
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
	let Qn = null;
	function $n(e) {
		return {
			schemaVersion: 3,
			meta: {
				id: e.id,
				title: e.title
			},
			sections: [{
				id: Na("sec"),
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
	async function er(e, { keepHistory: t = !1 } = {}) {
		I(g, e, !0), Qn = (async () => {
			let n = ve(), r = null;
			try {
				let e = await fetch(`/${n.file}`);
				e.ok && (r = Da(await e.json(), me.data));
			} catch {}
			r ? _e.delete(e) : r = $n(n), O = Si(`urd-draft-${e}`, () => r, S), O.replace(Da(O.data, me.data)), O.save(), t || (Se = null), I(vt, null), I(yt, null), ye(), fe(), I(v, "");
		})(), await Qn;
	}
	function tr() {
		k?.destroy(), H(w)?.contentDocument?.addEventListener("pointerdown", () => {
			H(tt) && I(tt, null);
		}, !0), k = pa(H(w), {
			onEdit: Eo,
			onMove: Do,
			onGrow: Oo,
			onDelete: il,
			onAddSection: Io,
			onMoveSection: el,
			onDeleteSection: tl,
			onSectionSize: nl,
			onUndo: (e) => e.redo ? Oe() : j(),
			onSelectSection: At,
			onSelectBlock: et,
			onBlockMenu: rt,
			onReady: nr,
			onNavigate: ar,
			onAddBlock: (e) => cl(e.sectionId, e.block),
			onAddBlocks: (e) => ll(e.sectionId, e.blocks, e.minBottom, e.moves),
			onRequestBlock: pl,
			onMoveBlockSection: rl,
			onMobileManual: Ao,
			onMobileAuto: jo,
			onReviewDone: Mo,
			onBlockFlag: Fo,
			onCollectionEdit: ri,
			onPluginBlocks: (e) => {
				I(dl, e.blocks ?? [], !0);
			},
			onNavWidth: (e) => V("edit:nav-width", () => {
				H(A).nav.style ??= {}, H(A).nav.style.width = e.width;
			})
		});
	}
	async function nr() {
		await Qn, await gi, k?.sendPlugins(ze(H(_i))?.enabled ?? []), k?.sendViewport(H(ee)), ti(), me.hasDraft() && ge();
		let e = !H(h).pages.some((e) => e.id === H(g));
		(O.hasDraft() || e) && k?.sendPage(H(g), O.data), H(D) || k?.sendChrome(!1), H(Ge) === "grid" && k?.sendShowGrid(!0), H(rr) && k?.sendShowGuides(!0), f();
	}
	let rr = /* @__PURE__ */ F(localStorage.getItem("urd-guides") === "1");
	function ir() {
		I(rr, !H(rr)), localStorage.setItem("urd-guides", H(rr) ? "1" : "0"), k?.sendShowGuides(H(rr));
	}
	function ar(e) {
		let t = e.path.replace(/\/$/, "") || "/", n = H(A).pages.find((e) => e.path === t);
		n && n.id !== H(g) && er(n.id);
	}
	function V(e, t) {
		we(e), t(), me.save(), ye(), ge();
	}
	let or = /* @__PURE__ */ F(""), sr = [
		"admin",
		"api",
		"assets",
		"content",
		"media",
		"plugins",
		"functions"
	];
	function cr(e, t = null) {
		return e ? sr.includes(e) ? Q("error.reservedName", { slug: e }) : H(A).pages.some((n) => n.id !== t && (n.path === `/${e}` || n.id === e)) ? Q("error.pageExists") : null : Q("error.pageNeedsName");
	}
	function lr() {
		let e = H(or).trim(), t = Gi(e), n = cr(t);
		if (n) {
			x(n, "error");
			return;
		}
		V("pages", () => {
			H(A).pages.push({
				id: t,
				title: e,
				path: `/${t}`,
				file: `content/pages/${t}.json`
			}), H(A).nav.items.push({
				label: e,
				page: t
			});
		}), C(`urd-draft-${t}`, JSON.stringify($n({
			id: t,
			title: e
		}))), ye(), I(or, ""), er(t);
	}
	function ur(e, t) {
		let n = t.trim();
		if (!n || n === e.title) return;
		let r = e.title;
		V("pages", () => {
			e.title = n;
			for (let t of H(A).nav.items) t.page === e.id && t.label === r && (t.label = n);
		}), e.id === H(g) ? (O.data.meta.title = n, O.save(), ye(), k?.sendPage(H(g), O.data)) : dr(e, (e) => {
			e.meta.title = n;
		});
	}
	async function dr(e, t) {
		let n = `urd-draft-${e.id}`, r = null, i = localStorage.getItem(n);
		if (i) try {
			r = JSON.parse(i);
		} catch {}
		if (!r) try {
			let t = await fetch(`/${e.file}`);
			t.ok && (r = Da(await t.json(), me.data));
		} catch {}
		r ||= $n(e), t(r), C(n, JSON.stringify(r)), ye();
	}
	function fr(e, t) {
		let n = Gi(t);
		if (e.path === "/" || `/${n}` === e.path) return;
		let r = cr(n, e.id);
		if (r) {
			x(r, "error");
			return;
		}
		V("pages", () => {
			e.path = `/${n}`;
		});
	}
	function pr(e) {
		e.path !== "/" && (V("pages", () => {
			H(A).pages = H(A).pages.filter((t) => t.id !== e.id), H(A).nav.items = H(A).nav.items.filter((t) => t.page !== e.id || t.children);
			for (let t of H(A).nav.items) t.page === e.id && delete t.page, t.children && (t.children = t.children.filter((t) => t.page !== e.id), t.children.length === 0 && delete t.children);
			H(A).nav.items = H(A).nav.items.filter((e) => e.page || e.href || e.children);
		}), e.id === H(g) && er(H(A).pages[0].id), x(Q("status.pageRemoved")));
	}
	function mr(e) {
		V("edit:nav-logo", () => {
			H(A).nav.logo = {
				type: "text",
				value: "",
				...H(A).nav.logo,
				...e
			};
		});
	}
	function hr(e) {
		V("nav", () => {
			H(A).nav.logo ??= {
				type: "text",
				value: H(A).site.title
			};
			let t = H(A).nav.logo, n = t.type === "image";
			e === "both" ? (n && (t.image = t.value, t.value = H(A).site.title), t.image ??= "", t.size ??= 32) : e === "image" ? (n || (t.value = t.image ?? ""), delete t.image, t.size ??= 32) : (n && (t.value = H(A).site.title), delete t.image), t.type = e;
		});
	}
	async function gr(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await an(t);
			V("nav", () => {
				let t = H(A).nav.logo;
				t.type === "both" ? t.image = e.dataUrl : t.value = e.dataUrl;
			});
		} catch {
			x(Q("status.imageReadErrorSvg"), "error");
		}
	}
	let _r = /* @__PURE__ */ F(null);
	async function vr(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		if (t.type === "image/svg+xml" || /\.svg$/i.test(t.name || "")) {
			try {
				let e = await tn(t);
				I(_r, e.dataUrl, !0);
			} catch {
				x(Q("status.imageReadErrorSvg"), "error");
			}
			return;
		}
		let n = new FileReader();
		n.onload = () => {
			I(_r, String(n.result), !0);
		}, n.onerror = () => x(Q("status.imageReadError"), "error"), n.readAsDataURL(t);
	}
	function yr(e) {
		V("edit:site-icon", () => {
			H(A).site.icon = e;
		}), I(_r, null);
	}
	function xr() {
		V("edit:site-icon", () => {
			delete H(A).site.icon;
		});
	}
	function Cr(e) {
		V("edit:site-title", () => {
			H(A).site.title = e;
		});
	}
	function wr(e) {
		V("edit:site-desc", () => {
			H(A).site.description = e;
		});
	}
	function Tr() {
		let e = H(A).site.lang ?? "no";
		return e === "no" ? "nb" : e;
	}
	function Er() {
		let e = Tr();
		return [...Je.some(([t]) => t === e) ? [] : [[e, e]], ...Je];
	}
	function Dr(e) {
		V("site", () => {
			H(A).site.lang = e;
		});
	}
	let Or = /^(?:data:image\/[\w.+-]+;base64,[A-Za-z0-9+/=]+|\/(?!\/)[\w%./-]*)$/;
	xn(() => {
		if (!H(A)?.site) return;
		let e = H(A).site.icon, t = document.querySelector("link[rel=\"icon\"]");
		if (t) {
			if (typeof e != "string" || !e) {
				t.href = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%230b0e14'/%3E%3Cpath d='M19.2 51.2V16l25.6 10.4V51.2' fill='none' stroke='%2315b39a' stroke-width='6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E";
				return;
			}
			Or.test(e) && (t.href = e);
		}
	});
	function kr(e) {
		V("nav", () => {
			H(A).nav.layout = e;
		});
	}
	function W(e, t) {
		V(`edit:nav-style-${e}`, () => {
			H(A).nav.style ??= {}, t === void 0 ? delete H(A).nav.style[e] : H(A).nav.style[e] = t;
		});
	}
	let Ar = /* @__PURE__ */ P(() => H(A)?.nav?.variant === "side-left" || H(A)?.nav?.variant === "side-right"), Mr = /* @__PURE__ */ P(() => [
		"floating",
		"floating-square",
		"floating-tab"
	].includes(H(A)?.nav?.variant)), Nr = {
		underline: [Q("hoverColor.underline.label"), Q("hoverColor.underline.title")],
		pill: [Q("hoverColor.pill.label"), Q("hoverColor.pill.title")],
		lift: [Q("hoverColor.lift.label"), Q("hoverColor.lift.title")]
	}, Pr = /* @__PURE__ */ P(() => Nr[H(A)?.nav?.style?.hover] ?? null);
	function Fr(e) {
		V("nav", () => {
			e === "bar" ? delete H(A).nav.variant : H(A).nav.variant = e;
		});
	}
	function Ir(e) {
		V("nav", () => {
			H(A).nav.style ??= {}, e ? H(A).nav.style.glow = !0 : delete H(A).nav.style.glow;
		});
	}
	function Rr(e) {
		V("nav", () => {
			H(A).nav.style ??= {}, e ? delete H(A).nav.style.topGap : H(A).nav.style.topGap = !1;
		});
	}
	function zr(e) {
		V("nav", () => {
			H(A).nav.style ??= {}, e === "standard" ? delete H(A).nav.style.hover : H(A).nav.style.hover = e;
		});
	}
	let Br = null, Hr = {}, Ur = {}, Wr = !1, Gr = /* @__PURE__ */ F(nn([])), Kr = /* @__PURE__ */ F(nn({})), qr = /* @__PURE__ */ F(null), Jr = /* @__PURE__ */ F(""), Yr = /* @__PURE__ */ F("news"), Xr = [
		["news", Q("collectionKind.news")],
		["notices", Q("collectionKind.notices")],
		["publications", Q("collectionKind.publications")],
		["custom", Q("collectionKind.custom")]
	];
	async function Zr() {
		let e = {
			version: 1,
			samlinger: []
		};
		try {
			e = await (await fetch("/content/samlinger.json")).json();
		} catch {}
		Br = Si("urd-draft-samlinger", () => e, S), I(Gr, [...Br.data.samlinger ?? []], !0);
		for (let e of H(Gr)) {
			let t = null;
			try {
				t = await (await fetch(`/content/samlinger/${e}.json`)).json();
			} catch {}
			t ??= {
				schemaVersion: 1,
				id: e,
				name: e,
				kind: "custom",
				entries: []
			}, Ur[e] = t, Hr[e] = Si(`urd-draft-samling-${e}`, () => t, S);
		}
		Wr = !0, $r();
	}
	function $r(e = !0) {
		let t = {};
		for (let e of H(Gr)) Hr[e] && (t[e] = JSON.parse(JSON.stringify(Hr[e].data)));
		I(Kr, t, !0), e && ti();
	}
	function ti() {
		k?.sendCollections(ze(H(Kr)) ?? {});
	}
	function ni(e, t, n, r = !0) {
		let i = Hr[e];
		i && (we(t), n(i.data), i.save(), ye(), $r(r));
	}
	function ri(e) {
		let { collection: t, entryId: n, field: r, value: i } = e;
		[
			"title",
			"text",
			"image",
			"imageAlt",
			"imageStyle"
		].includes(r) && (r === "title" && !String(i ?? "").replace(/<[^>]*>/g, "").trim() || ni(t, `edit:samling:${t}:${n}:${r}`, (e) => {
			let t = e.entries.find((e) => e.id === n);
			t && (i === "" && r !== "title" ? delete t[r] : t[r] = i);
		}, r === "image"));
	}
	function ii() {
		let e = H(Jr).trim();
		if (!e) return;
		let t = Gi(e);
		if (!t || H(Gr).includes(t)) {
			x(Q(t ? "status.collectionExists" : "status.invalidName"), "error");
			return;
		}
		we("samlinger");
		let n = {
			schemaVersion: 1,
			id: t,
			name: e,
			kind: H(Yr),
			entries: []
		};
		Ur[t] = {
			...n,
			entries: []
		}, Hr[t] = Si(`urd-draft-samling-${t}`, () => ({
			...n,
			entries: []
		}), S), Hr[t].replace(n), Hr[t].save(), Br.data.samlinger = [...H(Gr), t], Br.save(), I(Gr, [...H(Gr), t], !0), I(qr, t, !0), I(Jr, ""), ye(), $r();
	}
	function oi(e) {
		we("samlinger"), localStorage.removeItem(`urd-draft-samling-${e}`), delete Hr[e], Br.data.samlinger = H(Gr).filter((t) => t !== e), Br.save(), I(Gr, H(Gr).filter((t) => t !== e), !0), H(qr) === e && I(qr, null), ye(), $r();
	}
	function si(e) {
		ni(e, `samling:${e}:add-entry`, (e) => {
			e.entries.unshift({
				id: Na("innslag"),
				title: "Nytt innslag",
				date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
				text: ""
			});
		});
	}
	function ci(e, t, n, r) {
		ni(e, `edit:samling:${e}:${t}:${n}`, (e) => {
			let i = e.entries.find((e) => e.id === t);
			i && (r === "" && n !== "title" ? delete i[n] : i[n] = r);
		});
	}
	function ui(e, t, n) {
		ni(e, `samling:${e}:move-entry`, (e) => {
			let r = t + n;
			r < 0 || r >= e.entries.length || ([e.entries[t], e.entries[r]] = [e.entries[r], e.entries[t]]);
		});
	}
	function di(e, t) {
		ni(e, `samling:${e}:remove-entry`, (e) => {
			e.entries = e.entries.filter((e) => e.id !== t);
		});
	}
	async function fi(e, t, n) {
		let r = n.target.files?.[0];
		n.target.value = "", r && ci(e, t, "image", (await an(r)).dataUrl);
	}
	let mi = null, hi, gi = new Promise((e) => {
		hi = e;
	}), _i = /* @__PURE__ */ F(null), vi = nn({}), yi = /* @__PURE__ */ F("0.0.0"), xi = /* @__PURE__ */ F(""), Ci = /* @__PURE__ */ F(""), wi = /* @__PURE__ */ F(nn([])), Ti = /* @__PURE__ */ F("pending"), Ei = () => [.../* @__PURE__ */ new Set([...H(_i)?.enabled ?? [], ...H(_i)?.disabled ?? []])];
	function Di() {
		I(_i, JSON.parse(JSON.stringify(mi.data)), !0);
	}
	async function Oi() {
		let e = {
			version: 1,
			enabled: []
		};
		try {
			e = await (await fetch("/plugins/plugins.json")).json();
		} catch {}
		mi = Si("urd-draft-plugins", () => e, S), Di();
		try {
			I(yi, (await (await fetch("/urd.json")).json()).engine ?? "0.0.0", !0);
		} catch {}
		for (let e of Ei()) ji(e);
		ki(), hi(), k?.sendPlugins(ze(H(_i))?.enabled ?? []);
	}
	async function ki() {
		try {
			let e = await fetch("/api/github/plugins");
			if (!e.ok) {
				Ai();
				return;
			}
			let { plugins: t } = await e.json();
			localStorage.setItem("urd-plugins-found", JSON.stringify(t ?? [])), I(wi, (t ?? []).filter((e) => !Ei().includes(e)), !0);
			for (let e of H(wi)) ji(e);
			I(Ti, "ok");
		} catch {
			Ai();
		}
	}
	function Ai() {
		try {
			let e = JSON.parse(localStorage.getItem("urd-plugins-found") ?? "[]");
			if (Array.isArray(e) && e.length) {
				I(wi, e.filter((e) => !Ei().includes(e)), !0);
				for (let e of H(wi)) ji(e);
				I(Ti, "ok");
				return;
			}
		} catch {}
		I(Ti, "unavailable");
	}
	async function ji(e) {
		try {
			let t = await (await fetch(`/plugins/${e}/plugin.json`)).json(), n = Ma(t);
			vi[e] = {
				...t,
				errors: n,
				satisfied: n.length === 0 && Aa(H(yi), t.requiresEngine)
			};
		} catch {
			vi[e] = {
				name: e,
				errors: [Q("plugin.manifestNotFound", { id: e })],
				satisfied: !1
			};
		}
	}
	function Mi(e, t) {
		we("plugins");
		let n = mi.data;
		n.enabled = (n.enabled ?? []).filter((t) => t !== e), n.disabled = (n.disabled ?? []).filter((t) => t !== e), t ? n.enabled.push(e) : n.disabled.push(e), mi.save(), ye(), Di(), Ni();
	}
	function Ni() {
		H(w) && (H(w).src = H(w).src);
	}
	function Fi(e) {
		we("plugins");
		let t = mi.data;
		t.enabled = (t.enabled ?? []).filter((t) => t !== e), t.disabled = (t.disabled ?? []).filter((t) => t !== e), mi.save(), ye(), Di(), Ni();
	}
	async function Ii() {
		I(Ci, "");
		let e = H(xi).trim().toLowerCase();
		if (!/^[a-z0-9][a-z0-9-]*$/.test(e)) {
			I(Ci, Q("plugin.invalidId"), !0);
			return;
		}
		if (Ei().includes(e)) {
			I(Ci, Q("plugin.alreadyListed"), !0);
			return;
		}
		if (await ji(e), vi[e].errors.length) {
			I(Ci, Q("plugin.invalidManifest", { errors: vi[e].errors.join("; ") }), !0);
			return;
		}
		Mi(e, !0), I(xi, "");
	}
	function Li(e) {
		I(wi, H(wi).filter((t) => t !== e), !0), Mi(e, !0);
	}
	function zi(e, t) {
		V(e, () => {
			H(A).footer ??= {
				version: 1,
				show: !1,
				text: "",
				align: "center"
			}, t(H(A).footer);
		});
	}
	function Bi(e, t) {
		zi(`edit:footer-brand-${e}`, (n) => {
			n.brand ??= {}, t.trim() ? n.brand[e] = t : delete n.brand[e], !n.brand.title && !n.brand.tagline && !n.brand.logo && delete n.brand;
		});
	}
	function qi(e) {
		zi("footer", (t) => {
			t.brand ??= {}, e === "image" || e === "both" ? t.brand.mode = e : delete t.brand.mode;
		});
	}
	async function Ji(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await an(t);
			zi("footer", (t) => {
				t.brand ??= {}, t.brand.logo = e.dataUrl, t.brand.mode || (t.brand.mode = "both");
			});
		} catch {
			x(Q("status.imageReadErrorSvg"), "error");
		}
	}
	function Yi() {
		zi("footer", (e) => {
			e.brand && (delete e.brand.logo, delete e.brand.mode, delete e.brand.logoHeight, !e.brand.title && !e.brand.tagline && delete e.brand);
		});
	}
	function Xi(e) {
		zi("edit:footer-logo-height", (t) => {
			t.brand ??= {};
			let n = Number(e);
			Number.isFinite(n) && (t.brand.logoHeight = Math.min(160, Math.max(16, Math.round(n))));
		});
	}
	function Zi(e) {
		zi("edit:footer-copyright", (t) => {
			e.trim() ? t.copyright = e : delete t.copyright;
		});
	}
	let Qi = [
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
	function $i(e) {
		let t = "Min forening", n = H(A).pages ?? [], r = (e) => n.slice(0, e).map((e) => ({
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
			baseline: [a("Personvern", "#")]
		} : e === "sentrert" ? {
			align: "center",
			brand: { title: t },
			linkRow: r(5),
			social: i([
				"facebook",
				"instagram",
				"x"
			]),
			copyright: `${o} · Laget med Urd`
		} : e === "kolonner" ? {
			align: "left",
			brand: {
				title: t,
				tagline: "Et lite fellesskap for store spørsmål. Møtes annenhver torsdag."
			},
			columns: [
				{
					title: "Sider",
					links: r(4)
				},
				{
					title: "Selskap",
					links: [
						a("Om oss", "#"),
						a("Bli medlem", "#"),
						a("Presse", "#")
					]
				},
				{
					title: "Ressurser",
					links: [
						a("Vedtekter", "#"),
						a("Personvern", "#"),
						a("Kontakt", "#")
					]
				}
			],
			social: i([
				"facebook",
				"instagram",
				"linkedin"
			]),
			copyright: o,
			baseline: [a("Personvern", "#"), a("Vilkår", "#")]
		} : e === "sitemap" ? {
			align: "left",
			brand: {
				title: t,
				tagline: "Alt på ett sted."
			},
			columns: [
				{
					title: "Utforsk",
					links: [
						a("Hjem", "#"),
						a("Arrangementer", "#"),
						a("Galleri", "#"),
						a("Blogg", "#")
					]
				},
				{
					title: "Selskap",
					links: [
						a("Om oss", "#"),
						a("Historie", "#"),
						a("Presse", "#"),
						a("Kontakt", "#")
					]
				},
				{
					title: "Støtte",
					links: [
						a("Bli medlem", "#"),
						a("FAQ", "#"),
						a("Hjelp", "#")
					]
				},
				{
					title: "Juridisk",
					links: [
						a("Personvern", "#"),
						a("Vilkår", "#"),
						a("Vedtekter", "#")
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
				a("Personvern", "#"),
				a("Vilkår", "#"),
				a("Cookies", "#")
			]
		} : e === "nyhetsbrev" ? {
			align: "left",
			brand: {
				title: t,
				tagline: "Få siste nytt om arrangementer og medlemsfordeler."
			},
			cta: {
				kind: "newsletter",
				heading: "Meld deg på nyhetsbrevet",
				label: "Meld på",
				recipient: "post@dinforening.no",
				success: "Takk, du er påmeldt!"
			},
			columns: [{
				title: "Sider",
				links: r(4)
			}, {
				title: "Mer",
				links: [
					a("Om oss", "#"),
					a("Kontakt", "#"),
					a("Personvern", "#")
				]
			}],
			social: i(["facebook", "instagram"]),
			copyright: o,
			baseline: [a("Personvern", "#")]
		} : e === "storcta" ? {
			align: "center",
			cta: {
				kind: "button",
				big: !0,
				heading: "Klar til å bli med i fellesskapet?",
				sub: "Vi tar imot nye medlemmer hele året - kom innom en torsdag.",
				label: "Bli medlem",
				href: "#"
			},
			linkRow: r(4),
			social: i([
				"facebook",
				"instagram",
				"x"
			]),
			copyright: o,
			baseline: [a("Personvern", "#"), a("Vilkår", "#")]
		} : e === "kontakt" ? {
			align: "left",
			brand: {
				title: t,
				tagline: "Kom innom eller ta kontakt - vi svarer gjerne."
			},
			columns: [
				{
					title: "Besøk oss",
					links: [
						a("Storgata 1, 0155 Oslo", "#"),
						a("post@dinforening.no", "mailto:post@dinforening.no"),
						a("+47 22 00 00 00", "tel:+4722000000")
					]
				},
				{
					title: "Åpningstider",
					links: [a("Man-fre 09-16", "#"), a("Lør 10-14", "#")]
				},
				{
					title: "Sider",
					links: r(4)
				}
			],
			social: i(["facebook", "instagram"]),
			copyright: o,
			baseline: [a("Personvern", "#")]
		} : {
			align: "left",
			brand: {
				title: t,
				tagline: "Bli med i samtalen. Vi tar imot nye medlemmer hele året."
			},
			columns: [{
				title: "Utforsk",
				links: r(4)
			}, {
				title: "Følg oss",
				links: [a("Nyhetsbrev", "#"), a("post@dinforening.no", "mailto:post@dinforening.no")]
			}],
			social: i([
				"facebook",
				"instagram",
				"linkedin",
				"youtube"
			]),
			copyright: o,
			baseline: [a("Personvern", "#"), a("Laget med Urd", "#")],
			background: {
				version: 1,
				layers: [{
					type: "glow",
					version: io.version ?? 1,
					props: {
						...io.defaults(),
						color: "accent",
						x: .12,
						y: 0,
						radius: .6,
						opacity: .45
					}
				}, {
					type: "grain",
					version: oo.version ?? 1,
					props: {
						...oo.defaults(),
						opacity: .08
					}
				}]
			}
		};
	}
	function ra(e) {
		zi("footer-template", (t) => {
			let n = $i(e);
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
	function ia(e) {
		zi("footer", (t) => {
			t[e] ??= [], t[e].push(H(A).pages[0] ? {
				label: "Lenke",
				page: H(A).pages[0].id
			} : {
				label: "Lenke",
				href: "https://"
			});
		});
	}
	function aa(e, t) {
		zi("footer", (n) => {
			n[e].splice(t, 1), n[e].length || delete n[e];
		});
	}
	function oa(e, t, n) {
		zi("footer", (r) => {
			let i = r[e], a = t + n;
			a < 0 || a >= i.length || ([i[t], i[a]] = [i[a], i[t]]);
		});
	}
	function sa(e, t, n) {
		zi(`edit:footer-${e}-label-${t}`, (r) => {
			r[e][t].label = n;
		});
	}
	function ca(e, t, n) {
		zi("footer", (r) => {
			let i = r[e][t];
			n === "__href" ? (delete i.page, i.href = i.href ?? "https://") : (i.page = n, delete i.href);
		});
	}
	function la(e, t, n) {
		zi(`edit:footer-${e}-href-${t}`, (r) => {
			r[e][t].href = n;
		});
	}
	function ua(e) {
		zi("footer", (t) => {
			e === "center" ? t.columnsAlign = "center" : delete t.columnsAlign;
		});
	}
	function da(e) {
		zi("footer", (t) => {
			e ? t.cta ??= {
				kind: "button",
				label: "Bli medlem"
			} : delete t.cta;
		});
	}
	function ma(e, t) {
		zi(`edit:footer-cta-${e}`, (n) => {
			n.cta ??= {}, t === "" || t == null || t === !1 ? delete n.cta[e] : n.cta[e] = t;
		});
	}
	function ga(e) {
		zi("footer", (t) => {
			t.cta ??= {}, e === "__href" ? (delete t.cta.page, t.cta.href = t.cta.href ?? "https://") : (t.cta.page = e, delete t.cta.href);
		});
	}
	function _a(e, t) {
		zi("footer", (n) => {
			let r = new Set(n.hideOn ?? []);
			t ? r.delete(e) : r.add(e), r.size ? n.hideOn = [...r] : delete n.hideOn;
		});
	}
	function va() {
		zi("footer", (e) => {
			e.columns ??= [], e.columns.push({
				title: "Kolonne",
				links: [{
					label: "Lenke",
					page: H(A).pages[0].id
				}]
			});
		});
	}
	function ya(e) {
		zi("footer", (t) => {
			t.columns.splice(e, 1), t.columns.length || delete t.columns;
		});
	}
	function Sa(e, t) {
		zi("footer", (n) => {
			let r = e + t;
			r < 0 || r >= n.columns.length || ([n.columns[e], n.columns[r]] = [n.columns[r], n.columns[e]]);
		});
	}
	function Ca(e, t) {
		zi(`edit:footer-col-title-${e}`, (n) => {
			n.columns[e].title = t;
		});
	}
	function wa(e) {
		zi("footer", (t) => {
			t.columns[e].links ??= [], t.columns[e].links.push({
				label: "Lenke",
				page: H(A).pages[0].id
			});
		});
	}
	function Ta(e, t) {
		zi("footer", (n) => {
			n.columns[e].links.splice(t, 1);
		});
	}
	function Oa(e, t, n) {
		zi("footer", (r) => {
			let i = r.columns[e].links, a = t + n;
			a < 0 || a >= i.length || ([i[t], i[a]] = [i[a], i[t]]);
		});
	}
	function ka(e, t, n) {
		zi(`edit:footer-link-label-${e}-${t}`, (r) => {
			r.columns[e].links[t].label = n;
		});
	}
	function ja(e, t, n) {
		zi("footer", (r) => {
			let i = r.columns[e].links[t];
			n === "__href" ? (delete i.page, i.href = i.href ?? "https://") : (i.page = n, delete i.href);
		});
	}
	function Pa(e, t, n) {
		zi(`edit:footer-link-href-${e}-${t}`, (r) => {
			r.columns[e].links[t].href = n;
		});
	}
	function Fa() {
		zi("footer", (e) => {
			e.social ??= [], e.social.push({
				icon: "facebook",
				url: "https://"
			});
		});
	}
	function Ia(e) {
		zi("footer", (t) => {
			t.social.splice(e, 1), t.social.length || delete t.social;
		});
	}
	function Ra(e, t) {
		zi("footer", (n) => {
			let r = e + t;
			r < 0 || r >= n.social.length || ([n.social[e], n.social[r]] = [n.social[r], n.social[e]]);
		});
	}
	function za(e, t) {
		zi("footer", (n) => {
			n.social[e].icon = t;
		});
	}
	function Wa(e, t) {
		zi(`edit:footer-social-url-${e}`, (n) => {
			n.social[e].url = t;
		});
	}
	let Ga = ta.filter(([e]) => e === "Sosiale medier" || e === "Kommunikasjon").flatMap(([, e]) => e.map((e) => [e, ea[e].label]));
	function Ka(e, t) {
		V(`edit:nav-label-${e}`, () => {
			H(A).nav.items[e].label = t;
		});
	}
	function qa(e, t) {
		V("nav", () => {
			let n = H(A).nav.items[e];
			t === "__href" ? (delete n.page, n.href = n.href ?? "https://") : t === "__none" ? (delete n.page, delete n.href) : (n.page = t, delete n.href);
		});
	}
	function Ja(e, t) {
		V(`edit:nav-href-${e}`, () => {
			H(A).nav.items[e].href = t;
		});
	}
	function Ya(e, t) {
		let n = e + t, r = H(A).nav.items;
		n < 0 || n >= r.length || V("nav", () => {
			[r[e], r[n]] = [r[n], r[e]];
		});
	}
	function Xa(e) {
		V("nav", () => {
			H(A).nav.items.splice(e, 1);
		});
	}
	function Za() {
		V("nav", () => {
			H(A).nav.items.push({
				label: "Lenke",
				page: H(A).pages[0].id
			});
		});
	}
	function Qa(e) {
		V("nav", () => {
			let t = H(A).nav.items[e];
			t.children ??= [], t.children.push({
				label: "Lenke",
				page: H(A).pages[0].id
			});
		});
	}
	function $a(e, t, n) {
		V(`edit:nav-child-label-${e}-${t}`, () => {
			H(A).nav.items[e].children[t].label = n;
		});
	}
	function eo(e, t, n) {
		V("nav", () => {
			let r = H(A).nav.items[e].children[t];
			n === "__href" ? (delete r.page, r.href = r.href ?? "https://") : (r.page = n, delete r.href);
		});
	}
	function to(e, t, n) {
		V(`edit:nav-child-href-${e}-${t}`, () => {
			H(A).nav.items[e].children[t].href = n;
		});
	}
	function no(e, t, n) {
		let r = t + n, i = H(A).nav.items[e].children;
		r < 0 || r >= i.length || V("nav", () => {
			[i[t], i[r]] = [i[r], i[t]];
		});
	}
	function ao(e, t) {
		V("nav", () => {
			let n = H(A).nav.items[e];
			n.children.splice(t, 1), n.children.length === 0 && (delete n.children, !n.page && !n.href && (n.page = H(A).pages[0].id));
		});
	}
	function so(e, t) {
		V(`edit:theme-color-${e}`, () => {
			H(A).theme.tokens.color[e] = t, H(A).theme.alt?.auto && (H(A).theme.alt.tokens.color = fo());
		});
	}
	function co(e, t) {
		V("theme", () => {
			H(A).theme.tokens.font[e] = t;
		});
	}
	function lo(e, t) {
		V("theme", () => {
			H(A).theme.tokens.radius[e] = t;
		});
	}
	function uo(e) {
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
	function fo() {
		return Object.fromEntries(Object.entries(H(A).theme.tokens.color).map(([e, t]) => [e, uo(t)]));
	}
	function po(e, t) {
		V(`edit:theme-alt-${e}`, () => {
			H(A).theme.alt.tokens.color[e] = t, H(A).theme.alt.auto = !1;
		});
	}
	function mo(e) {
		V("theme", () => {
			e === "light" ? delete H(A).theme.scheme : H(A).theme.scheme = e;
		});
	}
	function ho(e) {
		V("theme", () => {
			e ? H(A).theme.alt = {
				auto: !0,
				tokens: { color: fo() }
			} : delete H(A).theme.alt;
		});
	}
	function go(e) {
		V("theme", () => {
			H(A).theme.alt ??= { tokens: { color: fo() } }, H(A).theme.alt.auto = e, e && (H(A).theme.alt.tokens.color = fo());
		});
	}
	function _o(e) {
		let t = H(A).theme.tokens.font[e];
		return [...Ro.some(([, e]) => e === t) ? [] : [[t, Q("opt.customFont")]], ...Ro.map(([e, t]) => [t, e])];
	}
	let vo = (e) => parseInt(e, 10) || 0;
	function yo(e, t) {
		lo(e, `${t}px`);
	}
	let bo = (e, t) => e && t && t[e] ? t[e] : e, xo = [
		"bg",
		"surface",
		"text",
		"accent",
		"accent-text"
	], So = [
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
	function Co(e) {
		V("theme", () => {
			let t = e.scheme === "dark", n = t ? e.dark : e.light, r = t ? e.light : e.dark;
			for (let e of xo) H(A).theme.tokens.color[e] = n[e];
			t ? H(A).theme.scheme = "dark" : delete H(A).theme.scheme, H(A).theme.alt = { tokens: { color: { ...r } } };
		});
	}
	let wo = /* @__PURE__ */ P(() => {
		if (!H(A)) return null;
		let e = H(A).theme.tokens.color, t = H(A).theme.alt?.tokens?.color ?? {}, n = H(A).theme.scheme === "dark";
		return So.find((r) => {
			let i = n ? r.dark : r.light, a = n ? r.light : r.dark;
			return xo.every((n) => e[n] === i[n] && t[n] === a[n]);
		})?.id ?? null;
	});
	function To() {
		I(D, !H(D)), k?.sendChrome(H(D));
	}
	function Eo(e) {
		let t = O.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		n && (we(`edit:${e.blockId}`), n.props = e.props, O.save(), ye(), H(N)?.blockId === e.blockId && $e(), e.rerender && k?.sendSection(H(g), t), I(v, ""));
	}
	function Do(e) {
		let t = O.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		if (!n) return;
		we(e.coalesce ? `edit:${e.groupKey ?? e.blockId}` : "move-block");
		let r = e.frameKey === "mobile" ? "mobile" : "desktop";
		n.frames[r] = e.frame, r === "desktop" && pe(t, "desktop-endret-etter-mobil"), O.save(), ye(), H(N)?.blockId === e.blockId && $e();
	}
	function Oo(e) {
		let t = O.data.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
		!t?.frames?.desktop || t.frames.desktop.h === e.h || (O.amendBaseline((t) => {
			let n = t.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
			n?.frames?.desktop && (n.frames.desktop.h = e.h);
		}), O.hasDraft() && we(`edit:${e.blockId}`), t.frames.desktop.h = e.h, O.save(), ye(), H(N)?.blockId === e.blockId && $e());
	}
	function Ao(e) {
		let t = O.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			we("mobile-manual");
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
			}, O.save(), ye();
		}
	}
	function jo(e) {
		let t = O.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			we("mobile-auto");
			for (let e of t.blocks) e.frames.mobile = null;
			t.responsive = {
				...t.responsive ?? {},
				mobile: {
					mode: "auto",
					attention: null
				}
			}, O.save(), ye(), fe(), k?.sendSection(H(g), t);
		}
	}
	function Mo(e) {
		let t = O.data.sections.find((t) => t.id === e.sectionId);
		t?.responsive?.mobile && (we("review-done"), t.responsive.mobile.attention = null, O.save(), ye(), fe());
	}
	function Fo(e) {
		let t = O.data.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
		t && (we("decor"), t.decor = e.decor, O.save(), ye(), H(N)?.blockId === e.blockId && $e());
	}
	function Io(e) {
		we("add-section"), e.section.id || (e.section.id = Na("sec")), O.data.sections.splice(e.index, 0, e.section), O.save(), ye(), k?.sendPage(H(g), O.data), I(vt, e.section.id, !0), Tt(e.section), H(Ge) !== "properties" && (I(Ge, "properties"), k?.sendShowGrid(!1));
	}
	function el(e) {
		let t = O.data.sections, n = t.findIndex((t) => t.id === e.sectionId), r = n + e.dir;
		n < 0 || r < 0 || r >= t.length || (we("move-section"), [t[n], t[r]] = [t[r], t[n]], O.save(), ye(), k?.sendPage(H(g), O.data));
	}
	function tl(e) {
		we("delete-section"), e.sectionId === H(vt) && (I(vt, null), I(yt, null)), H(N)?.sectionId === e.sectionId && I(N, null), O.data.sections = O.data.sections.filter((t) => t.id !== e.sectionId), O.save(), ye(), k?.sendPage(H(g), O.data);
	}
	function nl(e) {
		let t = O.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			we("section-size"), t.size = {
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
			e.moves?.length && (pe(t, "seksjonshøyde"), H(N)?.sectionId === e.sectionId && $e()), e.sectionId === H(vt) && I(bt, e.minHeight, !0), O.save(), ye();
		}
	}
	function rl(e) {
		let t = O.data.sections.find((t) => t.id === e.fromSectionId), n = O.data.sections.find((t) => t.id === e.toSectionId), r = t?.blocks.find((t) => t.id === e.blockId);
		!t || !n || !r || (we("move-block"), t.blocks = t.blocks.filter((t) => t.id !== e.blockId), r.frames.desktop = e.frame, r.frames.mobile = null, n.blocks.push(r), pe(t, "blokk-flyttet"), pe(n, "blokk-flyttet"), O.save(), ye(), fe(), k?.sendPage(H(g), O.data), H(N)?.blockId === e.blockId && (I(N, {
			...H(N),
			sectionId: e.toSectionId
		}, !0), $e()));
	}
	function il(e) {
		let t = O.data.sections.find((t) => t.id === e.sectionId);
		if (!t) return;
		let n = e.blockIds ?? [e.blockId];
		we("delete-block"), t.blocks = t.blocks.filter((e) => !n.includes(e.id)), n.includes(H(N)?.blockId) && I(N, null), pe(t, "blokk-slettet"), O.save(), ye(), k?.sendSection(H(g), t);
	}
	let al = {
		text: {
			type: "text",
			props: {
				html: "<p>Ny tekst</p>",
				align: "left"
			},
			w: 33,
			h: 28
		},
		"text-box": {
			type: "text",
			props: {
				html: "<h3>Overskrift</h3><p>Skriv innholdet her.</p>",
				align: "left",
				box: !0
			},
			w: 30,
			h: 150
		},
		button: {
			type: "button",
			props: {
				label: "Ny knapp",
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
						q: "Hvordan blir jeg medlem?",
						a: "<p>Skriv svaret her.</p>"
					},
					{
						q: "Når er dere åpne?",
						a: "<p>Skriv svaret her.</p>"
					},
					{
						q: "Hvordan kontakter jeg dere?",
						a: "<p>Skriv svaret her.</p>"
					}
				],
				multi: !1
			},
			w: 50,
			h: 220
		}
	};
	function ol(e) {
		let t = al[e];
		return t ? {
			id: Na("blk"),
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
	function sl(e) {
		k ? k.sendPlaceBlock(e) : cl(In()?.id, e);
	}
	function cl(e, t) {
		let n = O.data.sections.find((t) => t.id === e) ?? O.data.sections[0];
		if (!n) return;
		we("add-block");
		let r = Math.max(0, ...n.blocks.map((e) => e.frames?.desktop?.z ?? 1)) + 1;
		t.frames?.desktop && (t.frames.desktop = {
			...t.frames.desktop,
			z: r
		}), n.blocks.push(t), pe(n, "blokk-lagt-til"), O.save(), ye(), k?.sendSection(H(g), n);
	}
	function ll(e, t, n, r) {
		let i = O.data.sections.find((t) => t.id === e);
		if (!i || !t?.length) return;
		we("add-blocks");
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
		}), pe(i, "blokk-lagt-til"), O.save(), ye(), k?.sendSection(H(g), i);
	}
	function ul(e) {
		sl(ol(e));
	}
	let dl = /* @__PURE__ */ F(nn([]));
	function fl(e, t = {}) {
		sl({
			id: Na("blk"),
			type: e.type,
			version: e.version ?? 1,
			decor: !1,
			props: {
				...structuredClone(e.defaults ?? {}),
				...structuredClone(t)
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
	function pl(e) {
		let t = ol(e.kind);
		if (t) {
			if (e.at && typeof e.at.x == "number" && typeof e.at.y == "number") {
				let n = O.data.sections.find((t) => t.id === e.sectionId)?.grid ?? H(A).grid, r = zo({
					x: e.at.x,
					y: e.at.y,
					w: t.frames.desktop.w,
					h: t.frames.desktop.h,
					grid: n
				});
				t.frames.desktop.x = r.x, t.frames.desktop.y = r.y;
			} else t.frames.desktop.x = Math.round((100 - t.frames.desktop.w) / 2 * 100) / 100, t.frames.desktop.y = 40;
			cl(e.sectionId, t), k?.sendSelect(t.id), e.kind === "image" && x(Q("status.imageBlockAdded")), e.kind === "galleri" && x(Q("status.galleryBlockAdded"));
		}
	}
	async function ml(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		x(Q("status.compressingImage"));
		let n;
		try {
			n = await an(t);
		} catch {
			x(Q("status.imageReadError"), "error");
			return;
		}
		let r = Math.round(n.height / n.width * .3 * (H(w)?.clientWidth ?? 1280));
		sl({
			id: Na("blk"),
			type: "image",
			version: 1,
			props: {
				src: n.dataUrl,
				alt: Gi(t.name).replaceAll("-", " "),
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
	async function hl(e) {
		let t = [], n = 0, r = 0;
		for (let i of e) try {
			let e = await an(i);
			e.bytes > 4e5 && (r += 1), t.push({
				src: e.dataUrl,
				alt: Gi(i.name).replaceAll("-", " "),
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
	function gl(e, t, n) {
		t ? x(Q("status.imagesReadFailed", { n: t }), "error") : n ? x(Q("status.imagesLarge", { n }), "error") : x(e ? "" : Q("status.noImagesAdded"));
	}
	async function _l(e) {
		let t = [...e.target.files ?? []];
		if (e.target.value = "", !t.length) return;
		x(Q("status.compressingImages"));
		let { images: n, failed: r, big: i } = await hl(t);
		n.length && at("galleri-add", (e) => {
			e.props.images.push(...n);
		}), gl(n.length, r, i);
	}
	async function vl(e) {
		let t = [...e.target.files ?? []];
		if (e.target.value = "", !t.length) return;
		x(Q("status.compressingImages"));
		let { images: n, failed: r, big: i } = await hl(t);
		if (!n.length) {
			gl(0, r, i);
			return;
		}
		let a = ol("galleri");
		a.props.images = n, sl(a), gl(n.length, r, i);
	}
	function yl(e, t) {
		at("galleri-move", (n) => {
			let r = e + t;
			r < 0 || r >= n.props.images.length || ([n.props.images[e], n.props.images[r]] = [n.props.images[r], n.props.images[e]]);
		});
	}
	function bl(e) {
		at("galleri-remove", (t) => {
			t.props.images.splice(e, 1);
		});
	}
	function xl(e, t, n) {
		at(`edit:${H(N).blockId}:img${e}-${t}`, (r) => {
			r.props.images[e][t] = n;
		});
	}
	function Sl(e, t, n, r) {
		let i = e?.[t];
		if (!i?.startsWith("data:image/")) return;
		let a = i.split(",", 2)[1], o = `media/${Gi(n || "bilde")}-${Ki(a)}.${Wi(i)}`;
		r.push({
			path: o,
			content: a,
			encoding: "base64"
		}), e[t] = `/${o}`;
	}
	function Cl(e, t) {
		for (let n of e?.layers ?? []) if (n.type === "image" && Sl(n.props, "src", "bakgrunn", t), n.type === "bildegalleri") for (let e of n.props.images ?? []) Sl(e, "src", "bakgrunn", t);
	}
	function wl(e) {
		let t = [];
		for (let n of e.sections) {
			Cl(n.background, t);
			for (let e of n.blocks) if (e.type === "image" && Sl(e.props, "src", e.props.alt, t), e.type === "icon" && Sl(e.props, "image", "ikon", t), e.type === "galleri") for (let n of e.props.images ?? []) Sl(n, "src", n.alt || "galleri", t);
		}
		return t;
	}
	function Tl(e) {
		let t = [], n = e.nav?.logo;
		return n?.type === "image" && Sl(n, "value", "logo", t), n?.type === "both" && Sl(n, "image", "logo", t), e.nav?.style && Sl(e.nav.style, "image", "meny", t), Cl(e.nav?.style?.background, t), Cl(e.footer?.background, t), e.footer?.brand && Sl(e.footer.brand, "logo", "footer-logo", t), Sl(e.site, "icon", "ikon", t), t;
	}
	let El = /* @__PURE__ */ F(!1);
	function Dl() {
		if (!H(El)) {
			I(El, !0);
			return;
		}
		I(El, !1), Ol();
	}
	xn(() => {
		if (!H(El)) return;
		let e = (e) => {
			e.target?.closest?.(".discard-btn") || I(El, !1);
		}, t = (e) => {
			e.key === "Escape" && I(El, !1);
		}, n = () => I(El, !1);
		return window.addEventListener("pointerdown", e, !0), window.addEventListener("keydown", t, !0), window.addEventListener("blur", n), () => {
			window.removeEventListener("pointerdown", e, !0), window.removeEventListener("keydown", t, !0), window.removeEventListener("blur", n);
		};
	});
	function Ol() {
		we("discard");
		for (let e of H(A).pages) e.id !== H(g) && !_e.has(e.id) && localStorage.removeItem(`urd-draft-${e.id}`);
		let e = O.reset();
		if (me.reset(), mi && (mi.reset(), Di()), Br) {
			Br.reset(), I(Gr, [...Br.data.samlinger ?? []], !0);
			for (let e of Object.keys(Hr)) H(Gr).includes(e) ? Hr[e].reset() : delete Hr[e];
			$r();
		}
		he(), I(E, {
			snap: !0,
			...H(A).grid
		}, !0), ye(), I(v, ""), ge(), H(A).pages.some((e) => e.id === H(g)) ? k?.sendPage(H(g), e) : er(H(A).pages[0].id);
	}
	async function kl() {
		if (Yn) {
			x(Q("status.revertReloadBeforePublish"), "error");
			return;
		}
		x(Q("status.publishing"));
		let e = [], t = [], n = [], r = [];
		for (let i of H(A).pages) {
			let a = `urd-draft-${i.id}`, o = _e.has(i.id) || !H(h).pages.some((e) => e.id === i.id), s = null;
			if (i.id === H(g) && (O.hasDraft() || o)) s = O.data;
			else if (i.id !== H(g)) {
				let e = localStorage.getItem(a);
				if (e) try {
					s = Da(JSON.parse(e), me.data);
				} catch {}
			}
			if (!s && o && (s = $n(i)), !s) continue;
			let c = JSON.parse(JSON.stringify(s));
			e.push(...wl(c)), e.push({
				path: i.file,
				content: JSON.stringify(c, null, 2) + "\n",
				encoding: "utf-8"
			}), t.push(i.title), o ? r.push(i.id) : n.push(a);
		}
		if (me.hasDraft()) {
			let r = JSON.parse(JSON.stringify(H(A)));
			e.push(...Tl(r)), e.push({
				path: "content/site.json",
				content: JSON.stringify(r, null, 2) + "\n",
				encoding: "utf-8"
			}), e.push({
				path: "content/theme.css",
				content: La(r.theme),
				encoding: "utf-8"
			}), n.push("urd-draft-site");
			let i = (e, t) => JSON.stringify(e ?? null) === JSON.stringify(t ?? null);
			i(H(h).theme, H(A).theme) || t.push("tema"), i(H(h).nav, H(A).nav) || t.push("menyen"), i(H(h).footer, H(A).footer) || t.push("footeren"), i(H(h).pages, H(A).pages) || t.push("sideregisteret"), i(H(h).grid, H(A).grid) || t.push("gridet"), (H(h).site.icon ?? null) !== (H(A).site.icon ?? null) && t.push("nettstedsikonet");
			let { icon: a, ...o } = H(h).site, { icon: s, ...c } = H(A).site;
			i(o, c) || t.push("nettstedsinfo");
		}
		let i = Object.entries(Hr).filter(([, e]) => e.hasDraft());
		if (i.length || Br?.hasDraft()) {
			for (let [t, r] of i) {
				let i = JSON.parse(JSON.stringify(r.data));
				for (let t of i.entries) Sl(t, "image", t.title, e);
				e.push({
					path: `content/samlinger/${t}.json`,
					content: JSON.stringify(i, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push(`urd-draft-samling-${t}`);
			}
			if (Br?.hasDraft()) {
				e.push({
					path: "content/samlinger.json",
					content: JSON.stringify(Br.data, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push("urd-draft-samlinger");
				let t = { samlinger: [] };
				try {
					t = await (await fetch("/content/samlinger.json")).json();
				} catch {}
				let r = new Set(e.map((e) => e.path));
				for (let n of t.samlinger ?? []) {
					let t = `content/samlinger/${n}.json`;
					!H(Gr).includes(n) && !r.has(t) && e.push({
						path: t,
						delete: !0
					});
				}
			}
			t.push("samlinger");
		}
		mi?.hasDraft() && (e.push({
			path: "plugins/plugins.json",
			content: JSON.stringify(mi.data, null, 2) + "\n",
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
		let a = new Set(e.map((e) => e.path)), o = (t) => {
			a.has(t) || e.push({
				path: t,
				delete: !0
			});
		};
		for (let e of H(h).pages) {
			let t = H(A).pages.find((t) => t.id === e.id);
			t ? t.path !== e.path && e.path !== "/" && o(`${e.path.slice(1)}/index.html`) : (o(e.file), e.path !== "/" && o(`${e.path.slice(1)}/index.html`));
		}
		let s = await Un(e);
		if (!s.ok) {
			x(Q("status.publishAborted"), "error");
			return;
		}
		let c = {
			message: `Oppdater ${t.join(", ") || "nettstedet"} via Urd-admin`,
			files: e,
			...s.head ? { expect: s.head } : {}
		}, l = null;
		try {
			l = await fetch("/api/github/commit", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify(c)
			});
		} catch {}
		if (l?.ok) {
			let { sha: e } = await l.json().catch(() => ({}));
			e ? Vn = e : Hn(), wl(O.data), Tl(H(A));
			for (let e of n) localStorage.removeItem(e);
			for (let e of r) _e.add(e);
			if (I(h, JSON.parse(JSON.stringify(H(A))), !0), me = Si("urd-draft-site", () => H(h), S), he(), mi) {
				let e = JSON.parse(JSON.stringify(mi.data));
				mi = Si("urd-draft-plugins", () => e, S), Di();
			}
			if (Br) {
				for (let e of Object.values(Hr)) for (let t of e.data.entries) Sl(t, "image", t.title, []);
				let e = JSON.parse(JSON.stringify(Br.data));
				Br = Si("urd-draft-samlinger", () => e, S), Ur = {};
				for (let e of H(Gr)) {
					if (!Hr[e]) continue;
					let t = JSON.parse(JSON.stringify(Hr[e].data));
					Ur[e] = t, Hr[e] = Si(`urd-draft-samling-${e}`, () => t, S);
				}
				$r();
			}
			I(E, {
				snap: !0,
				...H(A).grid
			}, !0);
			let t = JSON.parse(JSON.stringify(O.data));
			O = Si(`urd-draft-${H(g)}`, () => t, S), _e.has(H(g)) && C(`urd-draft-${H(g)}`, JSON.stringify(t)), ye(), x(Q("status.published"), "ok");
		} else if (l?.status === 401) {
			let e = (await l.json().catch(() => null))?.error;
			x(e === "Ugyldig eller utløpt innlogging" ? Q("status.loginExpired") : Q("status.loginRequired", { reason: e ?? Q("status.unknownReason") }), "error"), await Bn();
		} else l?.status === 403 ? x((await l.json().catch(() => null))?.error ?? Q("status.noPublishAccess"), "error") : l?.status === 409 ? x(Q("status.publishRace"), "error") : x(l ? (await l.json().catch(() => null))?.error ?? Q("status.publishFailed") : Q("status.publishUnavailable"), "error");
	}
	je();
	var Al = $c();
	Sr("keydown", rn, Ae), Sr("pointerdown", rn, ke);
	var jl = R(Al), Ml = L(jl), Nl = (e) => {
		var t = As(), n = L(t);
		J(n, () => c.pencil);
		var r = z(n);
		M(t), B((e, n) => {
			Z(t, "title", e), K(r, ` ${n ?? ""}`);
		}, [() => Q("tip.backToEdit"), () => Q("ui.edit")]), U("click", t, To), G(e, t);
	};
	q(Ml, (e) => {
		H(D) || e(Nl);
	});
	var Pl = z(Ml, 2);
	let Fl;
	var Il = L(Pl), Ll = z(L(Il), 2);
	{
		let e = /* @__PURE__ */ P(() => Q("topbar.adminTheme.title"));
		$(Ll, {
			get value() {
				return H(u);
			},
			get title() {
				return H(e);
			},
			get options() {
				return l;
			},
			onchange: (e) => I(u, e, !0)
		});
	}
	var Rl = z(Ll, 2);
	{
		let e = /* @__PURE__ */ P(() => Q("topbar.language.title")), t = /* @__PURE__ */ P(() => [["auto", Q("lang.auto")], ...Je]);
		$(Rl, {
			get value() {
				return Ye;
			},
			get title() {
				return H(e);
			},
			get options() {
				return H(t);
			},
			onchange: Xe
		});
	}
	var zl = z(Rl, 2), Bl = (e) => {
		var t = js(), n = R(t), r = L(n, !0);
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
		let m;
		var h = z(p, 2), g = L(h);
		M(h), M(u);
		var _ = z(u, 2);
		let v;
		J(_, () => c.guides, !0), M(_), B((e, t, i, c, u, y, b, x, S) => {
			Z(n, "title", e), K(r, t), o = Qr(a, 1, "ghost svelte-1n46o8q", null, o, { active: H(ee) === "desktop" }), Z(a, "title", i), l = Qr(s, 1, "ghost svelte-1n46o8q", null, l, { active: H(ee) === "mobile" }), Z(s, "title", c), f = Qr(d, 1, "ghost svelte-1n46o8q", null, f, { active: H(ae) === "fit" }), Z(d, "title", u), m = Qr(p, 1, "ghost svelte-1n46o8q", null, m, { active: H(ae) === "full" }), Z(p, "title", y), Z(h, "title", b), K(g, `${x ?? ""}%`), v = Qr(_, 1, "ghost svelte-1n46o8q", null, v, { active: H(rr) }), Z(_, "title", S);
		}, [
			() => Q("tip.switchPage"),
			() => ve()?.title ?? "",
			() => Q("tip.desktopView"),
			() => Q("tip.mobileView"),
			() => Q("tip.zoomFit"),
			() => Q("tip.zoomFull"),
			() => Q("tip.zoomCurrent"),
			() => Math.round(H(se) * 100),
			() => Q("tip.guides")
		]), U("click", n, () => Ze("pages")), U("click", a, () => I(ee, "desktop")), U("click", s, () => I(ee, "mobile")), U("click", d, () => I(ae, "fit")), U("click", p, () => I(ae, "full")), U("click", _, ir), G(e, t);
	};
	q(zl, (e) => {
		H(h) && e(Bl);
	});
	var Vl = z(zl, 2), Hl = (e) => {
		var t = Ms(), n = L(t);
		J(n, () => c.phone);
		var r = z(n);
		M(t), B((e, n) => {
			Z(t, "title", e), K(r, ` ${n ?? ""}`);
		}, [() => Q("tip.attention"), () => Q(H(de) === 1 ? "ui.attentionOne" : "ui.attentionMany", { n: H(de) })]), U("click", t, () => I(ee, "mobile")), G(e, t);
	};
	q(Vl, (e) => {
		H(de) > 0 && e(Hl);
	});
	var Ul = z(Vl, 2), Wl = (e) => {
		var t = Ns(), n = R(t), r = L(n, !0);
		M(n);
		var i = z(n, 2);
		let a;
		var o = L(i, !0);
		M(i), B((e, t, n) => {
			K(r, e), a = Qr(i, 1, "ghost discard-btn svelte-1n46o8q", null, a, { armed: H(El) }), Z(i, "title", t), K(o, n);
		}, [
			() => Q("ui.unpublished"),
			() => H(El) ? Q("tip.discardArmed") : Q("tip.discard"),
			() => H(El) ? Q("ui.discardConfirm") : Q("ui.discard")
		]), U("click", i, Dl), G(e, t);
	};
	q(Ul, (e) => {
		H(_) && e(Wl);
	}), M(Il);
	var Gl = z(Il, 2), Kl = L(Gl), ql = (e) => {
		var t = Ls(), n = R(t), r = L(n), i = (e) => {
			var t = Ps(), n = R(t);
			J(n, () => c.eye);
			var r = z(n);
			B((e) => K(r, ` ${e ?? ""}`), [() => Q("ui.cleanView")]), G(e, t);
		}, a = (e) => {
			var t = Ps(), n = R(t);
			J(n, () => c.pencil);
			var r = z(n);
			B((e) => K(r, ` ${e ?? ""}`), [() => Q("ui.edit")]), G(e, t);
		};
		q(r, (e) => {
			H(D) ? e(i) : e(a, -1);
		}), M(n);
		var o = z(n, 2), s = (e) => {
			var t = Fs(), n = L(t), r = (e) => {
				var t = jr();
				J(R(t), () => c.warn), G(e, t);
			};
			q(n, (e) => {
				H(T).allowed || e(r);
			});
			var i = z(n, 1, !0);
			M(t), B((e) => {
				Z(t, "title", e), K(i, H(T).login);
			}, [() => H(T).allowed ? Q("tip.hasPublishAccess") : Q("tip.noPublishAccess")]), G(e, t);
		}, l = (e) => {
			var t = Is(), n = L(t, !0);
			M(t), B((e) => K(n, e), [() => Q("ui.loginGitHub")]), G(e, t);
		};
		q(o, (e) => {
			H(T)?.loggedIn ? e(s) : H(T) && e(l, 1);
		});
		var u = z(o, 2), d = L(u, !0);
		M(u);
		var f = z(u, 2), p = L(f, !0);
		M(f), B((e, t, r, i) => {
			Z(n, "title", e), Z(u, "href", t), K(d, r), f.disabled = !H(_), K(p, i);
		}, [
			() => H(D) ? Q("tip.chromeHide") : Q("tip.chromeShow"),
			() => ve()?.path ?? "/",
			() => Q("ui.viewSite"),
			() => Q("ui.publish")
		]), U("click", n, To), U("click", f, kl), G(e, t);
	};
	q(Kl, (e) => {
		H(h) && e(ql);
	}), M(Gl), M(Pl);
	var Jl = z(Pl, 2), Yl = (e) => {
		var t = Kc(), i = L(t), o = (e) => {
			var t = Gc(), i = R(t);
			Vr(i, 21, () => Ke, Lr, (e, t, n) => {
				var r = Bs(), i = R(r), a = (e) => {
					G(e, Rs());
				};
				q(i, (e) => {
					n > 0 && e(a);
				}), Vr(z(i, 2), 16, () => H(t), (e) => e, (e, t) => {
					var n = zs();
					let r;
					var i = L(n, !0);
					M(n), B(() => {
						r = Qr(n, 1, "svelte-1n46o8q", null, r, { active: H(Ge) === t }), K(i, qe[t]);
					}), U("click", n, () => Ze(t)), G(e, n);
				}), G(e, r);
			}), M(i);
			var o = z(i, 2), s = (e) => {
				var t = Wc(), i = L(t), o = L(i, !0);
				M(i);
				var s = z(i, 2), l = (e) => {
					var t = Ws(), n = L(t), r = L(n, !0);
					M(n);
					var i = z(n, 2);
					Vr(i, 17, () => H(A).pages, (e) => e.id, (e, t) => {
						var n = Us();
						let r;
						var i = L(n);
						Y(i);
						var a = z(i, 2), o = (e) => {
							var t = Vs();
							B((e) => Z(t, "title", e), [() => Q("tip.pages.homeLocked")]), G(e, t);
						}, s = (e) => {
							var n = Hs();
							Y(n), B((e, t) => {
								X(n, e), Z(n, "title", t);
							}, [() => H(t).path.slice(1), () => Q("tip.pages.slug")]), U("change", n, (e) => fr(H(t), e.target.value)), G(e, n);
						};
						q(a, (e) => {
							H(t).path === "/" ? e(o) : e(s, -1);
						});
						var l = z(a, 2), u = L(l);
						J(u, () => c.right, !0), M(u);
						var d = z(u, 2), f = (e) => {
							var n = Vo();
							J(n, () => c.cross, !0), M(n), B((e) => Z(n, "title", e), [() => Q("tip.pages.delete")]), U("click", n, () => pr(H(t))), G(e, n);
						};
						q(d, (e) => {
							H(t).path !== "/" && e(f);
						}), M(l), M(n), B((e, a) => {
							r = Qr(n, 1, "page-row svelte-1n46o8q", null, r, { current: H(t).id === H(g) }), X(i, H(t).title), Z(i, "title", e), Z(u, "title", a), u.disabled = H(t).id === H(g);
						}, [() => Q("tip.pages.title"), () => Q("tip.pages.open")]), U("change", i, (e) => ur(H(t), e.target.value)), U("click", u, () => er(H(t).id)), G(e, n);
					});
					var a = z(i, 4);
					Y(a);
					var o = z(a, 2), s = L(o, !0);
					M(o);
					var l = z(o, 2), u = L(l, !0);
					M(l), M(t), B((e, t, n, i, c) => {
						K(r, e), Z(a, "placeholder", t), o.disabled = n, K(s, i), K(u, c);
					}, [
						() => Q("hint.pages.drafts"),
						() => Q("ph.newPageName"),
						() => !H(or).trim(),
						() => Q("ui.createPage"),
						() => Q("hint.pages.autoMenu")
					]), U("keydown", a, (e) => e.key === "Enter" && lr()), li(a, () => H(or), (e) => I(or, e)), U("click", o, lr), G(e, t);
				}, u = (e) => {
					var t = Zs(), r = L(t), i = L(r, !0);
					M(r);
					var a = z(r, 2), o = L(a), s = L(o, !0);
					M(o);
					var l = z(o, 2), u = L(l), d = L(u), f = z(d);
					{
						let e = /* @__PURE__ */ P(() => H(A).nav.logo?.type ?? "text"), t = /* @__PURE__ */ P(() => [
							["text", Q("blocks.text")],
							["image", Q("blocks.image")],
							["both", Q("opt.logo.both")]
						]);
						$(f, {
							get value() {
								return H(e);
							},
							get options() {
								return H(t);
							},
							onchange: (e) => hr(e)
						});
					}
					M(u);
					var p = z(u, 2), m = (e) => {
						var t = Gs(), n = R(t);
						Y(n);
						var r = z(n, 2), i = L(r);
						{
							let e = /* @__PURE__ */ P(() => Q("tip.nav.logoFont")), t = /* @__PURE__ */ P(() => H(A).nav.logo?.font ?? ""), n = /* @__PURE__ */ P(() => [["", Q("common.inherit")], ...Ro.map(([e, t]) => [t, e])]);
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
								onchange: (e) => mr({ font: e || void 0 })
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
							X(n, H(A).nav.logo?.value ?? ""), Z(n, "placeholder", e), Z(a, "title", t), X(a, H(A).nav.logo?.textSize ?? ""), s = Qr(o, 1, "tbtn svelte-1n46o8q", null, s, { active: H(A).nav.logo?.bold !== !1 }), Z(o, "title", r), K(l, i), d = Qr(u, 1, "tbtn svelte-1n46o8q", null, d, c), Z(u, "title", f), K(p, m);
						}, [
							() => Q("ph.nav.logoName"),
							() => Q("tip.nav.textSize"),
							() => Q("format.bold"),
							() => Q("format.boldLetter"),
							() => ({ active: !!H(A).nav.logo?.italic }),
							() => Q("format.italic"),
							() => Q("format.italicLetter")
						]), U("input", n, (e) => mr({ value: e.target.value })), U("change", a, (e) => mr({ textSize: e.target.value ? Number(e.target.value) : void 0 })), U("click", o, () => mr({ bold: H(A).nav.logo?.bold === !1 })), U("click", u, () => mr({ italic: !H(A).nav.logo?.italic })), G(e, t);
					};
					q(p, (e) => {
						(H(A).nav.logo?.type ?? "text") !== "image" && e(m);
					});
					var h = z(p, 2), g = (e) => {
						var t = Ks(), n = R(t), r = L(n), i = L(r), a = z(i);
						M(r);
						var o = z(r, 2);
						Y(o);
						var s = z(o, 2);
						Y(s), M(n);
						var c = z(n, 2), l = L(c, !0);
						M(c), B((e, t, n, a, c) => {
							Z(r, "title", e), K(i, `${t ?? ""} `), Z(o, "title", n), X(o, H(A).nav.logo?.size ?? 32), Z(s, "title", a), X(s, H(A).nav.logo?.radius ?? 0), K(l, c);
						}, [
							() => Q("tip.webpAuto"),
							() => (H(A).nav.logo?.type === "image" ? H(A).nav.logo?.value : H(A).nav.logo?.image) ? Q("ui.changeImage") : Q("ui.chooseImage"),
							() => Q("tip.nav.logoHeight"),
							() => Q("tip.nav.logoRadius"),
							() => Q("hint.nav.logoFields")
						]), U("change", a, gr), U("change", o, (e) => mr({ size: Number(e.target.value) })), U("change", s, (e) => mr({ radius: Number(e.target.value) })), G(e, t);
					};
					q(h, (e) => {
						(H(A).nav.logo?.type ?? "text") !== "text" && e(g);
					});
					var _ = z(h, 2), v = (e) => {
						var t = rs(), n = L(t), r = z(n);
						{
							let e = /* @__PURE__ */ P(() => H(A).nav.logo?.order ?? "image-first"), t = /* @__PURE__ */ P(() => [["image-first", Q("opt.logo.imageFirst")], ["text-first", Q("opt.logo.textFirst")]]);
							$(r, {
								get value() {
									return H(e);
								},
								get options() {
									return H(t);
								},
								onchange: (e) => mr({ order: e })
							});
						}
						M(t), B((e) => K(n, `${e ?? ""} `), [() => Q("lbl.order")]), G(e, t);
					};
					q(_, (e) => {
						H(A).nav.logo?.type === "both" && e(v);
					});
					var y = z(_, 2), b = L(y, !0);
					M(y), M(l), M(a);
					var x = z(a, 2), S = L(x), C = L(S, !0);
					M(S);
					var w = z(S, 2), T = L(w), E = L(T), D = z(E);
					{
						let e = /* @__PURE__ */ P(() => H(A).nav.variant ?? "bar"), t = /* @__PURE__ */ P(() => [
							["bar", Q("opt.navVariant.bar")],
							["floating", Q("opt.navVariant.floating")],
							["floating-square", Q("opt.navVariant.floatingSquare")],
							["floating-tab", Q("opt.navVariant.floatingTab")],
							["side-left", Q("opt.navVariant.sideLeft")],
							["side-right", Q("opt.navVariant.sideRight")]
						]);
						$(D, {
							get value() {
								return H(e);
							},
							get options() {
								return H(t);
							},
							onchange: (e) => Fr(e)
						});
					}
					M(T);
					var ee = z(T, 2), te = (e) => {
						var t = qs(), n = R(t), r = L(n);
						Y(r);
						var i = z(r);
						M(n);
						var a = z(n, 2), o = L(a);
						Y(o);
						var s = z(o);
						M(a), B((e, t, c, l) => {
							Z(n, "title", e), ai(r, H(A).nav.style?.glow === !0), K(i, ` ${t ?? ""}`), Z(a, "title", c), ai(o, H(A).nav.style?.topGap !== !1), K(s, ` ${l ?? ""}`);
						}, [
							() => Q("tip.nav.glow"),
							() => Q("lbl.navGlow"),
							() => Q("tip.nav.topGap"),
							() => Q("lbl.navTopGap")
						]), U("change", r, (e) => Ir(e.target.checked)), U("change", o, (e) => Rr(e.target.checked)), G(e, t);
					};
					q(ee, (e) => {
						H(Mr) && e(te);
					});
					var ne = z(ee, 2), re = (e) => {
						var t = ds(), n = L(t);
						Y(n);
						var r = z(n);
						M(t), B((e, i) => {
							Z(t, "title", e), ai(n, H(A).nav.overlay === !0), K(r, ` ${i ?? ""}`);
						}, [() => Q("tip.nav.overlay"), () => Q("lbl.navOverlay")]), U("change", n, (e) => V("nav", () => {
							e.target.checked ? H(A).nav.overlay = !0 : delete H(A).nav.overlay;
						})), G(e, t);
					};
					q(ne, (e) => {
						!H(Mr) && !H(Ar) && e(re);
					});
					var ie = z(ne, 2), ae = (e) => {
						var t = rs(), n = L(t), r = z(n);
						{
							let e = /* @__PURE__ */ P(() => H(A).nav.style?.sideAlign ?? "left"), t = /* @__PURE__ */ P(() => [
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
								onchange: (e) => W("sideAlign", e === "left" ? void 0 : e)
							});
						}
						M(t), B((e, r) => {
							Z(t, "title", e), K(n, `${r ?? ""} `);
						}, [() => Q("tip.nav.sideAlign"), () => Q("lbl.textAlign")]), G(e, t);
					};
					q(ie, (e) => {
						H(Ar) && e(ae);
					});
					var oe = z(ie, 2), se = L(oe);
					Y(se);
					var ce = z(se);
					M(oe);
					var le = z(oe, 2), ue = L(le), de = z(ue);
					{
						let e = /* @__PURE__ */ P(() => H(A).nav.style?.size ?? "md"), t = /* @__PURE__ */ P(() => [
							["sm", Q("opt.size.sm")],
							["md", Q("opt.size.md")],
							["lg", Q("opt.size.lg")],
							["xl", Q("opt.size.xl")]
						]);
						$(de, {
							get value() {
								return H(e);
							},
							get options() {
								return H(t);
							},
							onchange: (e) => W("size", e === "md" ? void 0 : e)
						});
					}
					M(le);
					var fe = z(le, 2), pe = L(fe), O = z(pe), me = (e) => {
						{
							let t = /* @__PURE__ */ P(() => H(A).nav.style?.sidePlacement ?? "top"), n = /* @__PURE__ */ P(() => [
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
								onchange: (e) => W("sidePlacement", e === "top" ? void 0 : e)
							});
						}
					}, k = (e) => {
						{
							let t = /* @__PURE__ */ P(() => H(A).nav.layout ?? "right"), n = /* @__PURE__ */ P(() => [
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
								onchange: (e) => kr(e)
							});
						}
					};
					q(O, (e) => {
						H(Ar) ? e(me) : e(k, -1);
					}), M(fe);
					var he = z(fe, 2), ge = (e) => {
						var t = Js(), n = R(t), r = L(n);
						Y(r);
						var i = z(r);
						M(n);
						var a = z(n, 2), o = (e) => {
							var t = rs(), n = L(t), r = z(n);
							{
								let e = /* @__PURE__ */ P(() => H(A).nav.scroll ?? "none"), t = /* @__PURE__ */ P(() => [
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
									onchange: (e) => V("nav", () => {
										e === "none" ? delete H(A).nav.scroll : H(A).nav.scroll = e;
									})
								});
							}
							M(t), B((e, r) => {
								Z(t, "title", e), K(n, `${r ?? ""} `);
							}, [() => Q("tip.nav.scroll"), () => Q("lbl.navScroll")]), G(e, t);
						};
						q(a, (e) => {
							H(A).nav.sticky !== !1 && e(o);
						}), B((e, t) => {
							Z(n, "title", e), ai(r, H(A).nav.sticky !== !1), K(i, ` ${t ?? ""}`);
						}, [() => Q("tip.nav.sticky"), () => Q("lbl.navSticky")]), U("change", r, (e) => V("nav", () => {
							H(A).nav.sticky = e.target.checked;
						})), G(e, t);
					};
					q(he, (e) => {
						H(Ar) || e(ge);
					});
					var _e = z(he, 2), ve = L(_e), ye = z(ve);
					{
						let e = /* @__PURE__ */ P(() => H(A).nav.style?.hover ?? "standard"), t = /* @__PURE__ */ P(() => [
							["standard", Q("opt.hover.standard")],
							["underline", Q("opt.hover.underline")],
							["pill", Q("opt.hover.pill")],
							["lift-plain", Q("opt.hover.liftPlain")],
							["lift", Q("opt.hover.lift")]
						]);
						$(ye, {
							get value() {
								return H(e);
							},
							get options() {
								return H(t);
							},
							onchange: (e) => zr(e)
						});
					}
					M(_e);
					var be = z(_e, 2), xe = (e) => {
						var t = Ys(), n = R(t), r = L(n), i = z(r), a = L(i);
						M(i), M(n);
						var o = z(n, 2);
						Y(o), B((e, t, i) => {
							Z(n, "title", e), K(r, `${t ?? ""} `), K(a, `${i ?? ""}%`), X(o, H(A).nav.style?.hoverGlow ?? .6);
						}, [
							() => Q("tip.nav.hoverGlow"),
							() => Q("lbl.glowStrength"),
							() => Math.round((H(A).nav.style?.hoverGlow ?? .6) * 100)
						]), U("input", o, (e) => W("hoverGlow", Number(e.target.value))), G(e, t);
					};
					q(be, (e) => {
						H(A).nav.style?.hover === "lift" && e(xe);
					});
					var Se = z(be, 2), Ce = (e) => {
						var t = rs(), n = L(t), r = z(n);
						{
							let e = /* @__PURE__ */ P(() => H(A).nav.style?.hoverColor ?? "accent"), t = /* @__PURE__ */ P(hn);
							Pi(r, {
								get value() {
									return H(e);
								},
								get tokens() {
									return H(t);
								},
								get label() {
									return H(Pr)[1];
								},
								onchange: (e) => W("hoverColor", e)
							});
						}
						M(t), B(() => {
							Z(t, "title", H(Pr)[1]), K(n, `${H(Pr)[0] ?? ""} `);
						}), G(e, t);
					};
					q(Se, (e) => {
						H(Pr) && e(Ce);
					});
					var we = z(Se, 2), Te = L(we), Ee = z(Te);
					{
						let e = /* @__PURE__ */ P(() => H(A).nav.style?.hoverTextColor ?? "accent"), t = /* @__PURE__ */ P(hn), n = /* @__PURE__ */ P(() => Q("tip.nav.hoverTextColorPick"));
						Pi(Ee, {
							get value() {
								return H(e);
							},
							get tokens() {
								return H(t);
							},
							get label() {
								return H(n);
							},
							onchange: (e) => W("hoverTextColor", e)
						});
					}
					M(we);
					var De = z(we, 2), j = L(De), Oe = z(j);
					{
						let e = /* @__PURE__ */ P(() => H(A).nav.style?.textColor ?? "text"), t = /* @__PURE__ */ P(hn), n = /* @__PURE__ */ P(() => Q("tip.nav.textColorPick"));
						Pi(Oe, {
							get value() {
								return H(e);
							},
							get tokens() {
								return H(t);
							},
							get label() {
								return H(n);
							},
							onchange: (e) => W("textColor", e)
						});
					}
					M(De);
					var ke = z(De, 4), Ae = L(ke, !0);
					M(ke);
					var je = z(ke, 2);
					n(je, () => pn, () => H(A).nav?.style?.background?.layers ?? []), M(w), M(x);
					var Me = z(x, 2), Ne = L(Me), Pe = L(Ne, !0);
					M(Ne);
					var Fe = z(Ne, 2), Ie = L(Fe), Le = L(Ie), Re = z(Le);
					{
						let e = /* @__PURE__ */ P(() => H(A).nav.style?.subStyle ?? "card"), t = /* @__PURE__ */ P(() => H(Ar) ? [
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
						$(Re, {
							get value() {
								return H(e);
							},
							get options() {
								return H(t);
							},
							onchange: (e) => W("subStyle", e === "card" ? void 0 : e)
						});
					}
					M(Ie);
					var ze = z(Ie, 2), Be = (e) => {
						var t = rs(), n = L(t), r = z(n);
						{
							let e = /* @__PURE__ */ P(() => H(A).nav.style?.subPillColor ?? "surface"), t = /* @__PURE__ */ P(hn), n = /* @__PURE__ */ P(() => Q("tip.nav.subPillColorPick"));
							Pi(r, {
								get value() {
									return H(e);
								},
								get tokens() {
									return H(t);
								},
								get label() {
									return H(n);
								},
								onchange: (e) => W("subPillColor", e)
							});
						}
						M(t), B((e, r) => {
							Z(t, "title", e), K(n, `${r ?? ""} `);
						}, [() => Q("tip.nav.subPillColor"), () => Q("lbl.subPillColor")]), G(e, t);
					};
					q(ze, (e) => {
						H(A).nav.style?.subStyle === "pills" && e(Be);
					});
					var Ve = z(ze, 2), He = L(Ve), Ue = z(He);
					Y(Ue), M(Ve), M(Fe), M(Me);
					var We = z(Me, 2), Ge = L(We), Ke = L(Ge, !0);
					M(Ge);
					var qe = z(Ge, 2), Je = L(qe);
					Vr(Je, 17, () => H(A).nav.items, Lr, (e, t, n) => {
						var r = Xs(), i = R(r), a = L(i);
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
							let e = /* @__PURE__ */ P(() => H(t).page ?? (H(t).href == null ? "__none" : "__href")), r = /* @__PURE__ */ P(() => Q("tip.linkTarget")), i = /* @__PURE__ */ P(() => [
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
								onchange: (e) => qa(n, e)
							});
						}
						M(f);
						var m = z(f, 2), h = (e) => {
							var r = ts();
							Y(r), B((e, n) => {
								X(r, H(t).href), Z(r, "placeholder", e), Z(r, "title", n);
							}, [() => Q("ph.hrefAnchor"), () => Q("tip.hrefAnchor")]), U("change", r, (e) => Ja(n, e.target.value)), G(e, r);
						};
						q(m, (e) => {
							!H(t).page && H(t).href != null && e(h);
						}), M(i), Vr(z(i, 2), 17, () => H(t).children ?? [], Lr, (e, r, i) => {
							var a = ns(), o = L(a);
							Y(o);
							var s = z(o, 2), l = L(s);
							l.disabled = i === 0, J(l, () => c.up, !0), M(l);
							var u = z(l, 2);
							J(u, () => c.down, !0), M(u);
							var d = z(u, 2);
							J(d, () => c.cross, !0), M(d), M(s);
							var f = z(s, 2), p = L(f);
							{
								let e = /* @__PURE__ */ P(() => H(r).page ?? "__href"), t = /* @__PURE__ */ P(() => Q("tip.linkTarget")), a = /* @__PURE__ */ P(() => [...H(A).pages.map((e) => [e.id, e.title]), ["__href", Q("opt.linkHref")]]);
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
									onchange: (e) => eo(n, i, e)
								});
							}
							M(f);
							var m = z(f, 2), h = (e) => {
								var t = ts();
								Y(t), B((e, n) => {
									X(t, H(r).href ?? ""), Z(t, "placeholder", e), Z(t, "title", n);
								}, [() => Q("ph.hrefAnchor"), () => Q("tip.hrefAnchor")]), U("change", t, (e) => to(n, i, e.target.value)), G(e, t);
							};
							q(m, (e) => {
								H(r).page || e(h);
							}), M(a), B((e, n) => {
								X(o, H(r).label), Z(o, "title", e), u.disabled = i === H(t).children.length - 1, Z(d, "title", n);
							}, [() => Q("tip.nav.childLabel"), () => Q("tip.nav.removeChild")]), U("input", o, (e) => $a(n, i, e.target.value)), U("click", l, () => no(n, i, -1)), U("click", u, () => no(n, i, 1)), U("click", d, () => ao(n, i)), G(e, a);
						}), B((e, r, i) => {
							X(a, H(t).label), Z(a, "title", e), Z(s, "title", r), u.disabled = n === H(A).nav.items.length - 1, Z(d, "title", i);
						}, [
							() => Q("tip.nav.itemLabel"),
							() => Q("tip.nav.addChild"),
							() => Q("tip.nav.removeItem")
						]), U("input", a, (e) => Ka(n, e.target.value)), U("click", s, () => Qa(n)), U("click", l, () => Ya(n, -1)), U("click", u, () => Ya(n, 1)), U("click", d, () => Xa(n)), G(e, r);
					});
					var Ye = z(Je, 2), Xe = L(Ye, !0);
					M(Ye);
					var Ze = z(Ye, 2), N = L(Ze, !0);
					M(Ze), M(qe), M(We), M(t), B((e, t, n, r, a, o, c, l, u, f, p, m, h, g, _, v, y, x, S, w, D, ee, te) => {
						K(i, e), K(s, t), K(d, `${n ?? ""} `), K(b, r), K(C, a), Z(T, "title", o), K(E, `${c ?? ""} `), Z(oe, "title", l), ai(se, H(A).nav.style?.blur !== !1), K(ce, ` ${u ?? ""}`), K(ue, `${f ?? ""} `), K(pe, `${p ?? ""} `), K(ve, `${m ?? ""} `), Z(we, "title", h), K(Te, `${g ?? ""} `), K(j, `${_ ?? ""} `), K(Ae, v), K(Pe, y), K(Le, `${x ?? ""} `), Z(Ve, "title", S), K(He, `${w ?? ""} `), X(Ue, H(A).nav.style?.subColumns ?? 1), K(Ke, D), K(Xe, ee), K(N, te);
					}, [
						() => Q("hint.nav.intro"),
						() => Q("group.logo"),
						() => Q("common.type"),
						() => Q("hint.nav.logoHome"),
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
						() => Q("group.menuItems"),
						() => Q("ui.addMenuItem"),
						() => Q("hint.nav.submenu")
					]), U("change", se, (e) => W("blur", e.target.checked)), U("change", Ue, (e) => W("subColumns", Number(e.target.value) > 1 ? Number(e.target.value) : void 0)), U("click", Ye, Za), G(e, t);
				}, f = (e) => {
					var t = ec(), n = L(t), r = L(n), i = z(r);
					Y(i), M(n);
					var a = z(n, 2), o = L(a), s = z(o);
					Y(s), M(a);
					var l = z(a, 2), u = L(l), d = z(u);
					{
						let e = /* @__PURE__ */ P(Tr), t = /* @__PURE__ */ P(Er);
						$(d, {
							get value() {
								return H(e);
							},
							get options() {
								return H(t);
							},
							onchange: (e) => Dr(e)
						});
					}
					M(l);
					var f = z(l, 4), p = L(f), m = z(p), h = (e) => {
						var t = Qs();
						B((e) => {
							Z(t, "src", H(A).site.icon), Z(t, "alt", e);
						}, [() => Q("lbl.siteIcon")]), G(e, t);
					};
					q(m, (e) => {
						H(A).site.icon && e(h);
					}), M(f);
					var g = z(f, 2), _ = L(g), v = L(_), y = z(v);
					M(_);
					var b = z(_, 2), x = (e) => {
						var t = $s(), n = R(t);
						J(n, () => c.pencil ?? "✎", !0), M(n);
						var r = z(n, 2);
						J(r, () => c.cross, !0), M(r), B((e, t) => {
							Z(n, "title", e), Z(r, "title", t);
						}, [() => Q("tip.site.editIcon"), () => Q("tip.site.removeIcon")]), U("click", n, () => I(_r, H(A).site.icon, !0)), U("click", r, xr), G(e, t);
					};
					q(b, (e) => {
						H(A).site.icon && e(x);
					}), M(g), M(t), B((e, t, c, d, f, m, h, g, y, b, x) => {
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
					]), U("input", i, (e) => Cr(e.target.value)), U("input", s, (e) => wr(e.target.value)), U("change", y, vr), G(e, t);
				}, p = (e) => {
					var t = lc();
					{
						let e = (e, t = d, n = d) => {
							var r = nc(), i = L(r), a = (e) => {
								var t = tc(), r = L(t, !0);
								M(t), B(() => K(r, n())), G(e, t);
							};
							q(i, (e) => {
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
								ei(o, `--tv-bg:${e ?? ""};--tv-surface:${t ?? ""};--tv-text:${n ?? ""};--tv-accent:${r ?? ""};--tv-accent-ink:${i ?? ""}`), K(c, a), K(u, s), K(m, l), K(g, d);
							}, [
								() => bo(t().bg, t()),
								() => bo(t().surface, t()),
								() => bo(t().text, t()),
								() => bo(t().accent, t()),
								() => bo(t()["accent-text"] ?? t().bg, t()),
								() => Q("preview.heading"),
								() => Q("preview.cardBody"),
								() => Q("preview.button"),
								() => Q("preview.link")
							]), G(e, r);
						};
						var n = L(t), r = L(n, !0);
						M(n);
						var i = z(n, 2);
						Vr(i, 21, () => So, (e) => e.id, (e, t) => {
							var n = rc();
							let r;
							var i = L(n), a = L(i), o = z(a), s = z(o), c = z(s);
							M(i);
							var l = z(i, 2), u = L(l, !0);
							M(l), M(n), B(() => {
								r = Qr(n, 1, "theme-preset svelte-1n46o8q", null, r, { sel: H(wo) === H(t).id }), Z(n, "title", `${H(t).name} - ${H(t).note}`), ei(a, `background:${H(t).light.bg ?? ""}`), ei(o, `background:${H(t).light.surface ?? ""}`), ei(s, `background:${H(t).light.accent ?? ""}`), ei(c, `background:${H(t).light.text ?? ""}`), K(u, H(t).name);
							}), U("click", n, () => Co(H(t))), G(e, n);
						}), M(i);
						var a = z(i, 2), o = L(a, !0);
						M(a);
						var s = z(a, 2), c = L(s);
						Y(c);
						var l = z(c);
						M(s);
						var u = z(s, 2), f = (e) => {
							var t = ic(), n = L(t), r = L(n, !0);
							M(n);
							var i = z(n, 2), a = L(i);
							let o;
							var s = L(a, !0);
							M(a);
							var c = z(a, 2);
							let l;
							var u = L(c, !0);
							M(c), M(i), M(t), B((e, t, n) => {
								K(r, e), o = Qr(a, 1, "svelte-1n46o8q", null, o, { on: H(vn) }), K(s, t), l = Qr(c, 1, "svelte-1n46o8q", null, l, { on: !H(vn) }), K(u, n);
							}, [
								() => Q("lbl.darkColors"),
								() => Q("opt.auto"),
								() => Q("opt.custom")
							]), U("click", a, () => go(!0)), U("click", c, () => go(!1)), G(e, t);
						};
						q(u, (e) => {
							H(_n) && e(f);
						});
						var p = z(u, 2), h = L(p), g = (e) => {
							var t = ac(), n = L(t, !0);
							M(t), B((e) => K(n, e), [() => Q("lbl.light")]), G(e, t);
						};
						q(h, (e) => {
							H(_n) && e(g);
						});
						var _ = z(h, 2);
						let ke;
						var v = L(_, !0);
						M(_), M(p);
						var y = z(p, 2);
						Vr(y, 21, () => gn, ([e, t, n]) => e, (e, t) => {
							var n = /* @__PURE__ */ P(() => m(H(t), 3));
							let r = () => H(n)[0], i = () => H(n)[1], a = () => H(n)[2];
							var o = oc(), s = L(o);
							{
								let e = /* @__PURE__ */ P(() => H(A).theme.tokens.color[r()] ?? H(A).theme.tokens.color.bg), t = /* @__PURE__ */ P(hn);
								Pi(s, {
									get value() {
										return H(e);
									},
									get tokens() {
										return H(t);
									},
									get label() {
										return i();
									},
									onchange: (e) => so(r(), e)
								});
							}
							var c = z(s, 2), l = L(c, !0);
							M(c);
							var u = z(c, 2), d = L(u, !0);
							M(u), M(o), B((e) => {
								K(l, a()), K(d, e);
							}, [() => bo(H(A).theme.tokens.color[r()] ?? H(A).theme.tokens.color.bg, H(bn))]), G(e, o);
						}), M(y);
						var b = z(y, 2), x = (e) => {
							var t = cc(), n = R(t), r = L(n), i = L(r, !0);
							M(r);
							var a = z(r, 2);
							let o;
							var s = L(a, !0);
							M(a), M(n);
							var c = z(n, 2);
							let l;
							Vr(c, 21, () => gn, ([e, t, n]) => e, (e, t) => {
								var n = /* @__PURE__ */ P(() => m(H(t), 3));
								let r = () => H(n)[0], i = () => H(n)[1], a = () => H(n)[2];
								var o = oc(), s = L(o);
								{
									let e = /* @__PURE__ */ P(() => H(A).theme.alt.tokens.color[r()] ?? H(Sn)[r()] ?? H(A).theme.tokens.color.bg), t = /* @__PURE__ */ P(hn), n = /* @__PURE__ */ P(() => Q("theme.darkColorLabel", { name: i() }));
									Pi(s, {
										get value() {
											return H(e);
										},
										get tokens() {
											return H(t);
										},
										get label() {
											return H(n);
										},
										onchange: (e) => po(r(), e)
									});
								}
								var c = z(s, 2), l = L(c, !0);
								M(c);
								var u = z(c, 2), d = L(u, !0);
								M(u), M(o), B((e) => {
									K(l, a()), K(d, e);
								}, [() => bo(H(A).theme.alt.tokens.color[r()] ?? H(Sn)[r()], H(Sn))]), G(e, o);
							}), M(c);
							var u = z(c, 2), d = (e) => {
								var t = sc(), n = L(t, !0);
								M(t), B((e) => K(n, e), [() => Q("hint.theme.autoDark")]), G(e, t);
							};
							q(u, (e) => {
								H(vn) && e(d);
							}), B((e, t, n) => {
								K(i, e), o = Qr(a, 1, "stdtag svelte-1n46o8q", null, o, { ghost: H(yn) !== "dark" }), Z(a, "title", t), K(s, n), l = Qr(c, 1, "palcells svelte-1n46o8q", null, l, { autopal: H(vn) });
							}, [
								() => Q("lbl.dark"),
								() => Q("tip.theme.darkDefault"),
								() => Q("common.standard")
							]), U("click", a, () => mo("dark")), G(e, t);
						};
						q(b, (e) => {
							H(_n) && e(x);
						});
						var S = z(b, 2), C = L(S);
						{
							let t = /* @__PURE__ */ P(() => H(_n) ? Q("lbl.light") : "");
							e(C, () => H(bn), () => H(t));
						}
						var w = z(C, 2), T = (t) => {
							{
								let n = /* @__PURE__ */ P(() => Q("lbl.dark"));
								e(t, () => H(Sn), () => H(n));
							}
						};
						q(w, (e) => {
							H(_n) && e(T);
						}), M(S);
						var E = z(S, 2), D = L(E), ee = L(D, !0);
						M(D);
						var te = z(D, 2), ne = L(te), re = L(ne), ie = z(re);
						{
							let e = /* @__PURE__ */ P(() => _o("heading"));
							$(ie, {
								get value() {
									return H(A).theme.tokens.font.heading;
								},
								get options() {
									return H(e);
								},
								onchange: (e) => co("heading", e)
							});
						}
						M(ne);
						var ae = z(ne, 2), oe = L(ae), se = z(oe);
						{
							let e = /* @__PURE__ */ P(() => _o("body"));
							$(se, {
								get value() {
									return H(A).theme.tokens.font.body;
								},
								get options() {
									return H(e);
								},
								onchange: (e) => co("body", e)
							});
						}
						M(ae);
						var ce = z(ae, 2), le = L(ce), ue = L(le, !0);
						M(le);
						var de = z(le, 2), fe = L(de, !0);
						M(de), M(ce), M(te), M(E);
						var pe = z(E, 2), O = L(pe), me = L(O, !0);
						M(O);
						var k = z(O, 2), he = L(k), ge = L(he), _e = L(ge, !0);
						M(ge);
						var ve = z(ge, 2), ye = L(ve, !0);
						M(ve), M(he);
						var be = z(he, 2), xe = L(be, !0), Se = z(xe), Ce = L(Se, !0);
						M(Se), M(be);
						var we = z(be, 2);
						Y(we);
						var Te = z(we, 2), Ee = L(Te, !0), De = z(Ee), j = L(De, !0);
						M(De), M(Te);
						var Oe = z(Te, 2);
						Y(Oe), M(k), M(pe), M(t), B((e, t, n, i, a, u, d, f, p, m, h, g, y, b, x, S, C, w) => {
							K(r, e), K(o, t), Z(s, "title", n), ai(c, H(_n)), K(l, ` ${i ?? ""}`), ke = Qr(_, 1, "stdtag svelte-1n46o8q", null, ke, { ghost: H(yn) !== "light" }), Z(_, "title", a), K(v, u), K(ee, d), K(re, `${f ?? ""} `), K(oe, `${p ?? ""} `), ei(le, `font-family:${H(A).theme.tokens.font.heading ?? ""}`), K(ue, m), ei(de, `font-family:${H(A).theme.tokens.font.body ?? ""}`), K(fe, h), K(me, g), ei(he, `--r-sm:${H(A).theme.tokens.radius.sm ?? ""};--r-md:${H(A).theme.tokens.radius.md ?? ""}`), K(_e, y), K(ye, b), K(xe, x), K(Ce, H(A).theme.tokens.radius.sm), X(we, S), K(Ee, C), K(j, H(A).theme.tokens.radius.md), X(Oe, w);
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
							() => vo(H(A).theme.tokens.radius.sm),
							() => Q("lbl.largeCorners"),
							() => vo(H(A).theme.tokens.radius.md)
						]), U("change", c, (e) => ho(e.target.checked)), U("click", _, () => mo("light")), U("input", we, (e) => yo("sm", Number(e.target.value))), U("input", Oe, (e) => yo("md", Number(e.target.value)));
					}
					G(e, t);
				}, h = (e) => {
					var t = dc();
					let n;
					var r = L(t), i = L(r, !0);
					M(r);
					var a = z(r, 2), o = L(a), s = L(o, !0);
					M(o);
					var c = z(o, 2), l = L(c), u = L(l, !0);
					M(l);
					var d = z(l, 2), f = L(d, !0);
					M(d), M(c), M(a);
					var p = z(a, 2), m = L(p, !0);
					M(p);
					var h = z(p, 2), g = L(h), _ = z(g);
					M(h);
					var v = z(h, 2), y = L(v, !0);
					M(v);
					var b = z(v, 2), x = L(b, !0);
					M(b);
					var S = z(b, 2), C = L(S, !0);
					M(S);
					var w = z(S, 2), T = L(w, !0);
					M(w);
					var E = z(w, 2), D = L(E), te = L(D, !0);
					M(D);
					var ne = z(D, 2), re = L(ne), ie = L(re, !0);
					M(re);
					var ae = z(re, 2), oe = L(ae), se = z(oe);
					M(ae), M(ne), M(E);
					var ce = z(E, 2), le = L(ce), ue = L(le, !0);
					M(le);
					var de = z(le, 2), fe = L(de), pe = L(fe, !0);
					M(fe);
					var O = z(fe, 2), me = L(O, !0);
					M(O);
					var k = z(O, 2), A = L(k, !0);
					M(k);
					var he = z(k, 2), ge = L(he, !0);
					M(he);
					var _e = z(he, 2), ve = L(_e, !0);
					M(_e), M(de), M(ce);
					var ye = z(ce, 2), be = (e) => {
						var t = uc(), n = L(t), r = L(n, !0);
						M(n);
						var i = z(n, 2);
						Vr(i, 21, () => H(dl), (e) => e.type, (e, t) => {
							var n = jr(), r = R(n), i = (e) => {
								var n = uc(), r = L(n), i = L(r, !0);
								M(r);
								var a = z(r, 2);
								Vr(a, 21, () => H(t).variants, (e) => e.label, (e, n) => {
									var r = hs(), i = L(r, !0);
									M(r), B((e) => {
										Z(r, "title", e), K(i, H(n).label);
									}, [() => Q("tip.blocks.fromPlugin", { plugin: H(t).plugin })]), U("click", r, () => fl(H(t), H(n).props)), G(e, r);
								}), M(a), M(n), B(() => K(i, H(t).label)), G(e, n);
							}, a = (e) => {
								var n = hs(), r = L(n, !0);
								M(n), B((e) => {
									Z(n, "title", e), K(r, H(t).label);
								}, [() => Q("tip.blocks.fromPlugin", { plugin: H(t).plugin })]), U("click", n, () => fl(H(t))), G(e, n);
							};
							q(r, (e) => {
								H(t).variants?.length ? e(i) : e(a, -1);
							}), G(e, n);
						}), M(i), M(t), B((e) => K(r, e), [() => Q("panel.plugins")]), G(e, t);
					};
					q(ye, (e) => {
						H(dl).length && e(be);
					}), M(t), B((e, r, a, o, c, l, p, _, E, D, ne, se, ce, le, de, fe, O, k, he, _e, ye, be, xe, Se, Ce, we, Te, Ee) => {
						n = Qr(t, 1, "panel-body svelte-1n46o8q", null, n, { locked: H(ee) === "mobile" }), Z(t, "title", e), K(i, r), K(s, a), K(u, o), Z(d, "title", c), K(f, l), K(m, p), Z(h, "title", _), K(g, `${E ?? ""} `), Z(v, "title", D), K(y, ne), Z(b, "title", se), K(x, ce), Z(S, "title", le), K(C, de), Z(w, "title", fe), K(T, O), K(te, k), Z(re, "title", he), K(ie, _e), Z(ae, "title", ye), K(oe, `${be ?? ""} `), K(ue, xe), K(pe, Se), K(me, Ce), K(A, we), K(ge, Te), K(ve, Ee);
					}, [
						() => H(ee) === "mobile" ? Q("tip.blocks.mobileLocked") : void 0,
						() => Q("hint.blocks.intro"),
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
					]), U("click", l, () => ul("text")), U("click", d, () => ul("text-box")), U("click", p, () => ul("button")), U("change", _, ml), U("click", v, () => ul("video")), U("click", b, () => ul("icon")), U("click", S, () => ul("samling")), U("click", w, () => ul("faq")), U("click", re, () => ul("galleri")), U("change", se, vl), U("click", fe, () => ul("shape-line")), U("click", O, () => ul("shape-arrow")), U("click", k, () => ul("shape-circle")), U("click", he, () => ul("shape-rect")), U("click", _e, () => ul("shape-triangle")), G(e, t);
				}, _ = (e) => {
					var t = fc(), n = L(t), r = L(n, !0);
					M(n);
					var i = z(n, 2), a = L(i), o = z(a), s = L(o);
					M(o), M(i);
					var c = z(i, 2);
					Y(c);
					var l = z(c, 2), u = L(l);
					Y(u);
					var d = z(u);
					M(l);
					var f = z(l, 2), p = L(f, !0);
					M(f), M(t), B((e, t, n, i) => {
						K(r, e), K(a, `${t ?? ""} `), K(s, `${H(E).size ?? ""} px`), X(c, H(E).size), ai(u, H(E).snap !== !1), K(d, ` ${n ?? ""}`), K(p, i);
					}, [
						() => Q("hint.grid.intro"),
						() => Q("lbl.gridSize"),
						() => Q("lbl.gridSnap"),
						() => Q("hint.grid.section")
					]), U("input", c, (e) => zn("size", Number(e.target.value))), U("change", u, (e) => zn("snap", e.target.checked)), G(e, t);
				}, v = (e) => {
					var t = yc(), r = L(t), i = (e) => {
						var t = pc(), n = R(t), r = L(n, !0);
						M(n);
						var i = z(n, 2);
						a(i), B((e) => K(r, e), [() => Q("blocks.suffix", { label: ht[H(N).type] ?? H(N).type })]), G(e, t);
					}, o = (e) => {
						var t = vc(), r = R(t), i = L(r, !0);
						M(r);
						var a = z(r, 2), o = L(a), s = z(o);
						Y(s), M(a);
						var l = z(a, 2), u = L(l, !0);
						M(l);
						var d = z(l, 4), f = L(d);
						Y(f);
						var p = z(f);
						M(d);
						var m = z(d, 2), h = (e) => {
							var t = mc(), n = R(t), r = L(n), i = z(r), a = L(i);
							M(i), M(n);
							var o = z(n, 2);
							Y(o), B((e) => {
								K(r, `${e ?? ""} `), K(a, `${H(yt).size ?? ""} px`), X(o, H(yt).size);
							}, [() => Q("lbl.gridSize")]), U("input", o, (e) => Rn("size", Number(e.target.value))), G(e, t);
						};
						q(m, (e) => {
							H(yt) && e(h);
						});
						var g = z(m, 4), _ = L(g), v = z(_);
						{
							let e = /* @__PURE__ */ P(() => [["", Q("common.standard")], ...Object.entries(Ba)]);
							$(v, {
								get value() {
									return H(wt);
								},
								get options() {
									return H(e);
								},
								onchange: (e) => kt(e)
							});
						}
						M(g);
						var y = z(g, 2), b = L(y), x = z(b), S = L(x), C = L(S);
						M(S);
						var w = z(S, 2);
						J(w, () => c.copy, !0), M(w), M(x), M(y);
						var T = z(y, 4), E = L(T, !0);
						M(T);
						var D = z(T, 2);
						n(D, () => H(fn), () => H(xt));
						var ee = z(D, 4), te = L(ee), ne = z(te);
						{
							let e = /* @__PURE__ */ P(() => wn(H(St)) ? H(St).type : "");
							$(ne, {
								get value() {
									return H(e);
								},
								get options() {
									return Tn;
								},
								onchange: (e) => jn(e || null)
							});
						}
						M(ee);
						var re = z(ee, 2), ie = (e) => {
							var t = _c(), n = R(t), r = L(n), i = z(r);
							Y(i), M(n);
							var a = z(n, 2), o = (e) => {
								var t = hc(), n = R(t), r = L(n), i = z(r);
								Y(i), M(n);
								var a = z(n, 2), o = L(a), s = z(o);
								{
									let e = /* @__PURE__ */ P(() => H(St).props.pattern ?? "sequence"), t = /* @__PURE__ */ P(() => [["sequence", Q("opt.stagger.sequence")], ["columns", Q("opt.stagger.columns")]]);
									$(s, {
										get value() {
											return H(e);
										},
										get options() {
											return H(t);
										},
										onchange: (e) => Pn(e)
									});
								}
								M(a), B((e, t, s, c) => {
									Z(n, "title", e), K(r, `${t ?? ""} `), X(i, H(St).props.step ?? 90), Z(a, "title", s), K(o, `${c ?? ""} `);
								}, [
									() => Q("tip.props.staggerStep"),
									() => Q("lbl.stepMs"),
									() => Q("tip.props.staggerPattern"),
									() => Q("lbl.pattern")
								]), U("change", i, (e) => Nn("step", Number(e.target.value))), G(e, t);
							}, s = (e) => {
								var t = gc(), n = L(t), r = z(n);
								Y(r), M(t), B((e) => {
									K(n, `${e ?? ""} `), X(r, H(St).props.delay);
								}, [() => Q("lbl.delayMs")]), U("change", r, (e) => Nn("delay", Number(e.target.value))), G(e, t);
							};
							q(a, (e) => {
								H(St).type === "stagger" ? e(o) : e(s, -1);
							}), B((e) => {
								K(r, `${e ?? ""} `), X(i, H(St).props.duration);
							}, [() => Q("lbl.durationMs")]), U("change", i, (e) => Nn("duration", Number(e.target.value))), G(e, t);
						}, ae = /* @__PURE__ */ P(() => wn(H(St)));
						q(re, (e) => {
							H(ae) && e(ie);
						});
						var oe = z(re, 2), se = L(oe), ce = z(se);
						{
							let e = /* @__PURE__ */ P(() => H(Ct)?.type ?? (H(St) && !wn(H(St)) ? H(St).type : ""));
							$(ce, {
								get value() {
									return H(e);
								},
								get options() {
									return En;
								},
								onchange: (e) => Mn(e || null)
							});
						}
						M(oe), B((e, t, n, r, a, c, l, d, m, h, v, x, S, T, D) => {
							K(i, e), K(o, `${t ?? ""} `), X(s, H(bt)), Z(s, "placeholder", n), K(u, r), ai(f, H(yt) !== null), K(p, ` ${a ?? ""}`), Z(g, "title", c), K(_, `${l ?? ""} `), Z(y, "title", d), K(b, `${m ?? ""} `), K(C, `#${H(vt) ?? ""}`), Z(w, "title", h), K(E, v), Z(ee, "title", x), K(te, `${S ?? ""} `), Z(oe, "title", T), K(se, `${D ?? ""} `);
						}, [
							() => Q("lbl.section"),
							() => Q("lbl.minHeight"),
							() => Q("ph.minHeight"),
							() => Q("hint.props.minHeight"),
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
						]), U("change", s, (e) => Fn(e.target.value)), U("change", f, (e) => Ln(e.target.checked)), U("click", w, () => navigator.clipboard?.writeText(`#${H(vt)}`)), G(e, t);
					}, s = (e) => {
						var t = sc(), n = L(t, !0);
						M(t), B((e) => K(n, e), [() => Q("hint.props.empty")]), G(e, t);
					};
					q(r, (e) => {
						H(N) ? e(i) : H(vt) ? e(o, 1) : e(s, -1);
					}), M(t), G(e, t);
				}, y = (e) => {
					var t = kc(), i = L(t), a = L(i);
					Y(a);
					var o = z(a);
					M(i);
					var s = z(i, 2), l = (e) => {
						var t = uc(), n = L(t), r = L(n, !0);
						M(n);
						var i = z(n, 2);
						Vr(i, 21, () => H(A).pages ?? [], (e) => e.id, (e, t) => {
							var n = ds(), r = L(n);
							Y(r);
							var i = z(r);
							M(n), B((e, a) => {
								Z(n, "title", e), ai(r, a), K(i, ` ${(H(t).title || H(t).id) ?? ""}`);
							}, [() => Q("tip.footer.hideOnPage"), () => !(H(A).footer?.hideOn ?? []).includes(H(t).id)]), U("change", r, (e) => _a(H(t).id, e.target.checked)), G(e, n);
						}), M(i), M(t), B((e) => K(r, e), [() => Q("group.showOnPages")]), G(e, t);
					};
					q(s, (e) => {
						H(A).footer?.show && e(l);
					});
					var u = z(s, 2), d = L(u), f = L(d, !0);
					M(d);
					var p = z(d, 2), m = L(p);
					Vr(m, 21, () => Qi, (e) => e.id, (e, t) => {
						var n = bc(), r = L(n);
						J(r, () => Po(H(t).thumb), !0), M(r);
						var i = z(r, 2), a = L(i, !0);
						M(i), M(n), B((e) => {
							Z(n, "title", e), K(a, H(t).label);
						}, [() => Q("tip.footer.template", { label: H(t).label })]), U("click", n, () => ra(H(t).id)), G(e, n);
					}), M(m), M(p), M(u);
					var h = z(u, 2), g = L(h), _ = L(g, !0);
					M(g);
					var v = z(g, 2), y = L(v), b = L(y), x = z(b);
					Y(x), M(y);
					var S = z(y, 2), C = L(S), w = z(C);
					Y(w), M(S);
					var T = z(S, 2), E = L(T), D = z(E);
					{
						let e = /* @__PURE__ */ P(() => H(A).footer?.brand?.mode ?? "text"), t = /* @__PURE__ */ P(() => [
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
							onchange: (e) => qi(e)
						});
					}
					M(T);
					var ee = z(T, 2), te = (e) => {
						var t = Sc(), n = R(t), r = L(n), i = L(r), a = z(i);
						M(r);
						var o = z(r, 2), s = (e) => {
							var t = Vo();
							J(t, () => c.cross, !0), M(t), B((e) => Z(t, "title", e), [() => Q("tip.footer.removeLogo")]), U("click", t, Yi), G(e, t);
						};
						q(o, (e) => {
							H(A).footer?.brand?.logo && e(s);
						}), M(n);
						var l = z(n, 2), u = (e) => {
							var t = xc(), n = R(t), r = L(n), i = z(r), a = L(i);
							M(i), M(n);
							var o = z(n, 2);
							Y(o), B((e) => {
								K(r, `${e ?? ""} `), K(a, `${H(A).footer?.brand?.logoHeight ?? 40 ?? ""} px`), X(o, H(A).footer?.brand?.logoHeight ?? 40);
							}, [() => Q("lbl.logoHeight")]), U("input", o, (e) => Xi(e.target.value)), G(e, t);
						};
						q(l, (e) => {
							H(A).footer?.brand?.logo && e(u);
						}), B((e, t) => {
							Z(r, "title", e), K(i, `${t ?? ""} `);
						}, [() => Q("tip.webpAutoPublish"), () => H(A).footer?.brand?.logo ? Q("ui.changeLogo") : Q("ui.uploadLogo")]), U("change", a, Ji), G(e, t);
					};
					q(ee, (e) => {
						(H(A).footer?.brand?.mode ?? "text") !== "text" && e(te);
					}), M(v), M(h);
					var ne = z(h, 2), re = L(ne), ie = L(re, !0);
					M(re);
					var ae = z(re, 2), oe = L(ae);
					Vr(oe, 17, () => H(A).footer?.columns ?? [], Lr, (e, t, n) => {
						var r = Cc(), i = R(r), a = L(i);
						Y(a);
						var o = z(a, 2), s = L(o);
						J(s, () => c.plus, !0), M(s);
						var l = z(s, 2);
						l.disabled = n === 0, J(l, () => c.up, !0), M(l);
						var u = z(l, 2);
						J(u, () => c.down, !0), M(u);
						var d = z(u, 2);
						J(d, () => c.cross, !0), M(d), M(o), M(i), Vr(z(i, 2), 17, () => H(t).links ?? [], Lr, (e, r, i) => {
							var a = ns(), o = L(a);
							Y(o);
							var s = z(o, 2), l = L(s);
							l.disabled = i === 0, J(l, () => c.up, !0), M(l);
							var u = z(l, 2);
							J(u, () => c.down, !0), M(u);
							var d = z(u, 2);
							J(d, () => c.cross, !0), M(d), M(s);
							var f = z(s, 2), p = L(f);
							{
								let e = /* @__PURE__ */ P(() => H(r).page ?? "__href"), t = /* @__PURE__ */ P(() => Q("tip.linkTarget")), a = /* @__PURE__ */ P(() => [...H(A).pages.map((e) => [e.id, e.title]), ["__href", Q("opt.linkHref")]]);
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
									onchange: (e) => ja(n, i, e)
								});
							}
							M(f);
							var m = z(f, 2), h = (e) => {
								var t = ts();
								Y(t), B((e, n) => {
									X(t, H(r).href ?? ""), Z(t, "placeholder", e), Z(t, "title", n);
								}, [() => Q("ph.hrefAnchor"), () => Q("tip.hrefAnchor")]), U("change", t, (e) => Pa(n, i, e.target.value)), G(e, t);
							};
							q(m, (e) => {
								H(r).page || e(h);
							}), M(a), B((e, n) => {
								X(o, H(r).label), Z(o, "title", e), u.disabled = i === H(t).links.length - 1, Z(d, "title", n);
							}, [() => Q("tip.linkLabel"), () => Q("tip.removeLink")]), U("input", o, (e) => ka(n, i, e.target.value)), U("click", l, () => Oa(n, i, -1)), U("click", u, () => Oa(n, i, 1)), U("click", d, () => Ta(n, i)), G(e, a);
						}), B((e, r, i) => {
							X(a, H(t).title), Z(a, "title", e), Z(s, "title", r), u.disabled = n === H(A).footer.columns.length - 1, Z(d, "title", i);
						}, [
							() => Q("tip.footer.columnTitle"),
							() => Q("tip.footer.addLink"),
							() => Q("tip.footer.removeColumn")
						]), U("input", a, (e) => Ca(n, e.target.value)), U("click", s, () => wa(n)), U("click", l, () => Sa(n, -1)), U("click", u, () => Sa(n, 1)), U("click", d, () => ya(n)), G(e, r);
					});
					var se = z(oe, 2), ce = L(se, !0);
					M(se);
					var le = z(se, 2), ue = L(le), de = z(ue);
					{
						let e = /* @__PURE__ */ P(() => H(A).footer?.columnsAlign ?? "left"), t = /* @__PURE__ */ P(() => [["left", Q("common.left")], ["center", Q("common.center")]]);
						$(de, {
							get value() {
								return H(e);
							},
							get options() {
								return H(t);
							},
							onchange: (e) => ua(e)
						});
					}
					M(le), M(ae), M(ne);
					var fe = z(ne, 2), pe = L(fe), O = L(pe, !0);
					M(pe);
					var me = z(pe, 2), k = L(me);
					Vr(k, 17, () => H(A).footer?.social ?? [], Lr, (e, t, n) => {
						var r = wc(), i = L(r), a = L(i);
						J(a, () => na(H(t).icon) || "", !0), M(a);
						var o = z(a, 2);
						{
							let e = /* @__PURE__ */ P(() => Q("blocks.icon"));
							$(o, {
								get value() {
									return H(t).icon;
								},
								get title() {
									return H(e);
								},
								get options() {
									return Ga;
								},
								onchange: (e) => za(n, e)
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
							u.disabled = n === H(A).footer.social.length - 1, Z(d, "title", e), X(f, H(t).url), Z(f, "placeholder", r);
						}, [() => Q("tip.removeLink"), () => Q("ph.hrefMailto")]), U("click", l, () => Ra(n, -1)), U("click", u, () => Ra(n, 1)), U("click", d, () => Ia(n)), U("change", f, (e) => Wa(n, e.target.value)), G(e, r);
					});
					var he = z(k, 2), ge = L(he, !0);
					M(he), M(me), M(fe);
					var _e = z(fe, 2), ve = L(_e), ye = L(ve, !0);
					M(ve);
					var be = z(ve, 2), xe = L(be), Se = L(xe);
					Y(Se);
					var Ce = z(Se);
					M(xe);
					var we = z(xe, 2), Te = (e) => {
						let t = /* @__PURE__ */ P(() => H(A).footer.cta);
						var n = Dc(), r = R(n), i = L(r), a = z(i);
						{
							let e = /* @__PURE__ */ P(() => H(t).kind ?? "button"), n = /* @__PURE__ */ P(() => [["button", Q("opt.cta.button")], ["newsletter", Q("opt.cta.newsletter")]]);
							$(a, {
								get value() {
									return H(e);
								},
								get options() {
									return H(n);
								},
								onchange: (e) => ma("kind", e)
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
							var n = Tc(), r = R(n), i = L(r), a = z(i);
							{
								let e = /* @__PURE__ */ P(() => H(t).page ?? "__href"), n = /* @__PURE__ */ P(() => [...H(A).pages.map((e) => [e.id, e.title]), ["__href", Q("opt.linkHrefMailto")]]);
								$(a, {
									get value() {
										return H(e);
									},
									get options() {
										return H(n);
									},
									onchange: (e) => ga(e)
								});
							}
							M(r);
							var o = z(r, 2), s = (e) => {
								var n = ls();
								Y(n), B((e, r) => {
									X(n, H(t).href ?? ""), Z(n, "placeholder", e), Z(n, "title", r);
								}, [() => Q("ph.hrefMailtoAnchor"), () => Q("tip.hrefAnchor")]), U("change", n, (e) => ma("href", e.target.value)), G(e, n);
							};
							q(o, (e) => {
								H(t).page || e(s);
							}), B((e, t) => {
								Z(r, "title", e), K(i, `${t ?? ""} `);
							}, [() => Q("tip.footer.ctaTarget"), () => Q("lbl.buttonTarget")]), G(e, n);
						}, b = (e) => {
							var n = Ec(), r = R(n), i = L(r), a = z(i);
							Y(a), M(r);
							var o = z(r, 2), s = L(o), c = z(s);
							Y(c), M(o);
							var l = z(o, 2), u = L(l), d = z(u);
							Y(d), M(l), B((e, n, f, p, m, h, g, _, v) => {
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
							]), U("change", a, (e) => ma("endpoint", e.target.value)), U("change", c, (e) => ma("recipient", e.target.value)), U("input", d, (e) => ma("success", e.target.value)), G(e, n);
						};
						q(v, (e) => {
							(H(t).kind ?? "button") === "button" ? e(y) : e(b, -1);
						}), B((e, n, a, v, y, b, x, S, C, w, T, E) => {
							Z(r, "title", e), K(i, `${n ?? ""} `), Z(o, "title", a), ai(s, H(t).big === !0), K(c, ` ${v ?? ""}`), Z(l, "title", y), K(u, `${b ?? ""} `), X(d, H(t).heading ?? ""), Z(d, "placeholder", x), Z(f, "title", S), K(p, `${C ?? ""} `), X(m, H(t).sub ?? ""), Z(h, "title", w), K(g, `${T ?? ""} `), X(_, H(t).label ?? ""), Z(_, "placeholder", E);
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
						]), U("change", s, (e) => ma("big", e.target.checked)), U("input", d, (e) => ma("heading", e.target.value)), U("input", m, (e) => ma("sub", e.target.value)), U("input", _, (e) => ma("label", e.target.value)), G(e, n);
					};
					q(we, (e) => {
						H(A).footer?.cta && e(Te);
					}), M(be), M(_e);
					var Ee = z(_e, 2), De = L(Ee), j = L(De, !0);
					M(De);
					var Oe = z(De, 2), ke = L(Oe);
					r(ke, () => "linkRow", () => H(A).footer?.linkRow ?? []);
					var Ae = z(ke, 2), je = L(Ae, !0);
					M(Ae), M(Oe), M(Ee);
					var Ne = z(Ee, 2), Pe = L(Ne), Fe = L(Pe, !0);
					M(Pe);
					var Ie = z(Pe, 2), Le = L(Ie), Re = (e) => {
						var t = Oc(), n = R(t), r = L(n), i = z(r);
						{
							let e = /* @__PURE__ */ P(() => H(A).footer?.align ?? "left"), t = /* @__PURE__ */ P(() => [
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
								onchange: (e) => zi("footer", (t) => {
									t.align = e;
								})
							});
						}
						M(n), Me(2), B((e, t) => {
							Z(n, "title", e), K(r, `${t ?? ""} `);
						}, [() => Q("tip.footer.align"), () => Q("lbl.align")]), G(e, t);
					};
					q(Le, (e) => {
						H(A).footer?.cta?.big !== !0 && e(Re);
					});
					var ze = z(Le, 2), Be = L(ze, !0);
					M(ze);
					var Ve = z(ze, 2);
					n(Ve, () => mn, () => H(A).footer?.background?.layers ?? []), M(Ie), M(Ne);
					var He = z(Ne, 2), Ue = L(He), We = L(Ue, !0);
					M(Ue);
					var Ge = z(Ue, 2), Ke = L(Ge), qe = L(Ke), Je = z(qe);
					Y(Je), M(Ke);
					var Ye = z(Ke, 2), Xe = L(Ye, !0);
					M(Ye);
					var Ze = z(Ye, 2);
					r(Ze, () => "baseline", () => H(A).footer?.baseline ?? []);
					var N = z(Ze, 2), Qe = L(N, !0);
					M(N), M(Ge), M(He), M(t), B((e, t, n, r, s, c, l, u, d, p, m, h, g, v, D, ee, te, ne, re, ae, oe, se, de, fe, pe, me, k, he, _e, ve, be, we) => {
						Z(i, "title", e), ai(a, t), K(o, ` ${n ?? ""}`), K(f, r), K(_, s), Z(y, "title", c), K(b, `${l ?? ""} `), X(x, H(A).footer?.brand?.title ?? ""), Z(x, "placeholder", u), Z(S, "title", d), K(C, `${p ?? ""} `), X(w, H(A).footer?.brand?.tagline ?? ""), Z(T, "title", m), K(E, `${h ?? ""} `), K(ie, g), K(ce, v), Z(le, "title", D), K(ue, `${ee ?? ""} `), K(O, te), K(ge, ne), K(ye, re), Z(xe, "title", ae), ai(Se, oe), K(Ce, ` ${se ?? ""}`), K(j, de), K(je, fe), K(Fe, pe), K(Be, me), K(We, k), Z(Ke, "title", he), K(qe, `${_e ?? ""} `), X(Je, H(A).footer?.copyright ?? ""), Z(Je, "placeholder", ve), K(Xe, be), K(Qe, we);
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
					]), U("change", a, (e) => zi("footer", (t) => {
						t.show = e.target.checked;
					})), U("input", x, (e) => Bi("title", e.target.value)), U("input", w, (e) => Bi("tagline", e.target.value)), U("click", se, va), U("click", he, Fa), U("change", Se, (e) => da(e.target.checked)), U("click", Ae, () => ia("linkRow")), U("input", Je, (e) => Zi(e.target.value)), U("click", N, () => ia("baseline")), G(e, t);
				}, b = (e) => {
					var t = Nc(), n = L(t), r = L(n, !0);
					M(n);
					var i = z(n, 2), a = (e) => {
						var t = rs(), n = L(t), r = z(n);
						{
							let e = /* @__PURE__ */ P(() => H(qr) ?? ""), t = /* @__PURE__ */ P(() => [["", Q("common.choose")], ...H(Gr).map((e) => [e, H(Kr)[e]?.name ?? e])]);
							$(r, {
								get value() {
									return H(e);
								},
								get options() {
									return H(t);
								},
								onchange: (e) => I(qr, e || null, !0)
							});
						}
						M(t), B((e) => K(n, `${e ?? ""} `), [() => Q("blocks.samling")]), G(e, t);
					};
					q(i, (e) => {
						H(Gr).length && e(a);
					});
					var o = z(i, 2), s = (e) => {
						let t = /* @__PURE__ */ P(() => H(Kr)[H(qr)]);
						var n = Mc(), r = R(n), i = L(r), a = L(i, !0);
						M(i);
						var o = z(i, 2);
						J(o, () => c.cross, !0), M(o), M(r);
						var s = z(r, 2);
						Vr(s, 19, () => H(t).entries, (e) => e.id, (e, n, r) => {
							var i = jc(), a = L(i), o = L(a);
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
							it(v);
							var y = z(v, 2), b = L(y), x = z(b);
							Y(x), M(y);
							var S = z(y, 2), C = L(S), w = L(C), T = z(w);
							M(C);
							var E = z(C, 2), D = (e) => {
								var t = Ac(), r = R(t), i = z(r, 2);
								J(i, () => c.cross, !0), M(i), B((e) => {
									Z(r, "src", H(n).image), Z(i, "title", e);
								}, [() => Q("tip.removeImage")]), U("click", i, () => ci(H(qr), H(n).id, "image", "")), G(e, t);
							};
							q(E, (e) => {
								H(n).image && e(D);
							}), M(S), M(s), M(i), B((e, i, a, s, c, l, d, h) => {
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
							]), U("change", u, (e) => ci(H(qr), H(n).id, "title", e.target.value || "Uten tittel")), U("click", f, () => ui(H(qr), H(r), -1)), U("click", p, () => ui(H(qr), H(r), 1)), U("click", m, () => di(H(qr), H(n).id)), U("change", _, (e) => ci(H(qr), H(n).id, "date", e.target.value)), U("change", v, (e) => ci(H(qr), H(n).id, "text", e.target.value)), U("change", x, (e) => ci(H(qr), H(n).id, "href", e.target.value)), U("change", T, (e) => fi(H(qr), H(n).id, e)), G(e, i);
						});
						var l = z(s, 2), u = (e) => {
							var t = sc(), n = L(t, !0);
							M(t), B((e) => K(n, e), [() => Q("hint.collections.empty")]), G(e, t);
						};
						q(l, (e) => {
							H(t).entries.length || e(u);
						}), Me(2), B((e, t) => {
							K(a, e), Z(o, "title", t);
						}, [() => Q("ui.addEntry"), () => Q("tip.collections.deleteCollection")]), U("click", i, () => si(H(qr))), U("click", o, () => oi(H(qr))), G(e, n);
					};
					q(o, (e) => {
						H(qr) && H(Kr)[H(qr)] && e(s);
					});
					var l = z(o, 2), u = L(l), d = z(u);
					Y(d), M(l);
					var f = z(l, 2), p = L(f);
					$(z(p), {
						get value() {
							return H(Yr);
						},
						get options() {
							return Xr;
						},
						onchange: (e) => I(Yr, e, !0)
					}), M(f);
					var m = z(f, 2), h = L(m, !0);
					M(m), M(t), B((e, t, n, i, a, o) => {
						K(r, e), K(u, `${t ?? ""} `), Z(d, "placeholder", n), K(p, `${i ?? ""} `), m.disabled = a, K(h, o);
					}, [
						() => Q("hint.collections.intro"),
						() => Q("lbl.newCollectionName"),
						() => Q("ph.collections.name"),
						() => Q("common.type"),
						() => !H(Jr).trim(),
						() => Q("ui.createCollection")
					]), U("keydown", d, (e) => e.key === "Enter" && ii()), li(d, () => H(Jr), (e) => I(Jr, e)), U("click", m, ii), G(e, t);
				}, x = (e) => {
					var t = Bc(), n = L(t), r = L(n, !0);
					M(n);
					var i = z(n, 2), a = (e) => {
						var t = sc(), n = L(t, !0);
						M(t), B((e) => K(n, e), [() => Q("hint.plugins.empty")]), G(e, t);
					}, o = /* @__PURE__ */ P(() => !Ei().length);
					q(i, (e) => {
						H(o) && e(a);
					});
					var s = z(i, 2);
					Vr(s, 16, Ei, (e) => e, (e, t) => {
						let n = /* @__PURE__ */ P(() => vi[t]), r = /* @__PURE__ */ P(() => (H(_i)?.enabled ?? []).includes(t));
						var i = Ic();
						let a;
						var o = L(i), s = L(o), l = L(s, !0);
						M(s);
						var u = z(s, 2), d = (e) => {
							var t = Pc(), r = L(t);
							M(t), B(() => K(r, `v${H(n).version ?? ""}`)), G(e, t);
						};
						q(u, (e) => {
							H(n)?.version && e(d);
						});
						var f = z(u, 2), p = L(f), m = L(p);
						Y(m);
						var h = z(m);
						M(p);
						var g = z(p, 2);
						J(g, () => c.cross, !0), M(g), M(f), M(o);
						var _ = z(o, 2), v = (e) => {
							var t = Fc(), r = L(t, !0);
							M(t), B((e) => K(r, e), [() => H(n).errors.join("; ")]), G(e, t);
						}, y = (e) => {
							var t = Fc(), r = L(t, !0);
							M(t), B((e) => K(r, e), [() => Q("plugin.engineMismatch", {
								required: H(n).requiresEngine,
								current: H(yi)
							})]), G(e, t);
						}, b = (e) => {
							var t = Fc(), r = L(t, !0);
							M(t), B((e) => K(r, e), [() => Q("plugin.cspNeeded", { list: [...(H(n).csp.connectSrc ?? []).map((e) => `connect-src ${e}`), ...(H(n).csp.frameSrc ?? []).map((e) => `frame-src ${e}`)].join(", ") })]), G(e, t);
						};
						q(_, (e) => {
							H(n)?.errors?.length ? e(v) : H(n) && !H(n).satisfied ? e(y, 1) : H(n)?.csp && e(b, 2);
						}), M(i), B((e, o, s, c) => {
							a = Qr(i, 1, "plugin-row svelte-1n46o8q", null, a, { "plugin-broken": H(n)?.errors?.length }), K(l, H(n)?.name ?? t), Z(p, "title", e), ai(m, H(r)), m.disabled = o, K(h, ` ${s ?? ""}`), Z(g, "title", c);
						}, [
							() => H(r) ? Q("tip.plugins.on") : Q("tip.plugins.off"),
							() => !!H(n)?.errors?.length,
							() => H(r) ? Q("ui.on") : Q("ui.off"),
							() => Q("tip.plugins.remove")
						]), U("change", m, (e) => Mi(t, e.target.checked)), U("click", g, () => Fi(t)), G(e, i);
					});
					var l = z(s, 2), u = (e) => {
						var t = Rc(), n = z(R(t), 2), r = L(n, !0);
						M(n), Vr(z(n, 2), 16, () => H(wi), (e) => e, (e, t) => {
							var n = Lc(), r = L(n), i = L(r), a = L(i, !0);
							M(i);
							var o = z(i, 2), s = (e) => {
								var n = Pc(), r = L(n);
								M(n), B(() => K(r, `v${vi[t].version ?? ""}`)), G(e, n);
							};
							q(o, (e) => {
								vi[t]?.version && e(s);
							});
							var l = z(o, 2), u = L(l);
							J(u, () => c.right, !0), M(u), M(l), M(r), M(n), B((e) => {
								K(a, vi[t]?.name ?? t), Z(u, "title", e);
							}, [() => Q("tip.plugins.addFound")]), U("click", u, () => Li(t)), G(e, n);
						}), B((e) => K(r, e), [() => Q("hint.plugins.found")]), G(e, t);
					};
					q(l, (e) => {
						H(wi).length && e(u);
					});
					var d = z(l, 2), f = (e) => {
						var t = jr(), n = R(t), r = (e) => {
							var t = sc(), n = L(t, !0);
							M(t), B((e) => K(n, e), [() => Q("hint.plugins.autoDiscover")]), G(e, t);
						};
						q(n, (e) => {
							H(wi).length || e(r);
						}), G(e, t);
					}, p = (e) => {
						var t = zc(), n = z(R(t), 2);
						Y(n);
						var r = z(n, 2), i = L(r, !0);
						M(r);
						var a = z(r, 2), o = (e) => {
							var t = Fc(), n = L(t, !0);
							M(t), B(() => K(n, H(Ci))), G(e, t);
						};
						q(a, (e) => {
							H(Ci) && e(o);
						}), B((e, t, a) => {
							Z(n, "placeholder", e), r.disabled = t, K(i, a);
						}, [
							() => Q("ph.plugins.folder"),
							() => !H(xi).trim(),
							() => Q("ui.addPlugin")
						]), U("keydown", n, (e) => e.key === "Enter" && Ii()), li(n, () => H(xi), (e) => I(xi, e)), U("click", r, Ii), G(e, t);
					};
					q(d, (e) => {
						H(Ti) === "ok" ? e(f) : e(p, -1);
					}), M(t), B((e) => K(r, e), [() => Q("hint.plugins.intro")]), G(e, t);
				}, S = (e) => {
					var t = Uc(), n = L(t), r = L(n, !0);
					M(n);
					var i = z(n, 2), a = (e) => {
						var t = sc(), n = L(t, !0);
						M(t), B((e) => K(n, e), [() => Q("hint.history.loading")]), G(e, t);
					}, o = (e) => {
						var t = Bs(), n = R(t), r = (e) => {
							var t = sc(), n = L(t, !0);
							M(t), B(() => K(n, H(Gn))), G(e, t);
						};
						q(n, (e) => {
							H(Gn) && e(r);
						});
						var i = z(n, 2), a = (e) => {
							var t = Hc(), n = R(t), r = L(n, !0);
							M(n), Vr(z(n, 2), 19, () => H(Wn), (e) => e.sha, (e, t, n) => {
								var r = Vc();
								let i;
								var a = L(r), o = L(a, !0);
								M(a);
								var s = z(a, 2), c = L(s);
								M(s), M(r), B((e) => {
									i = Qr(r, 1, "history-row svelte-1n46o8q", null, i, { head: H(n) === 0 }), Z(a, "title", H(t).sha), K(o, H(t).message), K(c, `${H(t).author ?? ""}${e ?? ""}`);
								}, [() => H(t).date ? ` · ${Jn.format(new Date(H(t).date))}` : ""]), G(e, r);
							}), B((e, t) => {
								n.disabled = H(Kn) || !H(T)?.allowed, Z(n, "title", e), K(r, t);
							}, [() => H(T)?.allowed ? Q("tip.history.revert") : Q("tip.history.needsAccess"), () => Q("ui.revertLast")]), U("click", n, Xn), G(e, t);
						};
						q(i, (e) => {
							H(Wn).length > 0 && e(a);
						}), G(e, t);
					};
					q(i, (e) => {
						H(Wn) === null ? e(a) : e(o, -1);
					}), M(t), B((e) => K(r, e), [() => Q("hint.history.intro")]), G(e, t);
				};
				q(s, (e) => {
					H(Ge) === "pages" ? e(l) : H(Ge) === "nav" ? e(u, 1) : H(Ge) === "site" ? e(f, 2) : H(Ge) === "theme" ? e(p, 3) : H(Ge) === "blocks" ? e(h, 4) : H(Ge) === "grid" ? e(_, 5) : H(Ge) === "properties" ? e(v, 6) : H(Ge) === "footer" ? e(y, 7) : H(Ge) === "collections" ? e(b, 8) : H(Ge) === "plugins" ? e(x, 9) : H(Ge) === "history" && e(S, 10);
				}), M(t), B(() => K(o, qe[H(Ge)])), G(e, t);
			};
			q(o, (e) => {
				H(Ge) && e(s);
			}), G(e, t);
		};
		q(i, (e) => {
			H(D) && e(o);
		});
		var s = z(i, 2);
		let l;
		var u = L(s), f = L(u);
		pi(f, (e) => I(w, e), () => H(w)), M(u), M(s), pi(s, (e) => I(te, e), () => H(te)), M(t), B((e) => {
			l = Qr(s, 1, "frame-wrap svelte-1n46o8q", null, l, { mobile: H(ee) === "mobile" }), ei(u, `width:${H(le) ?? ""}px; height:${H(ue) ?? ""}px`), Z(f, "title", e), Z(f, "src", `/?page=${H(g)}&preview=1`), ei(f, `width:${H(oe) ?? ""}px; height:${H(ce) ?? ""}px; transform:scale(${H(se) ?? ""}); transform-origin:top left`);
		}, [() => Q("ui.previewTitle")]), Sr("load", f, tr), br(f), G(e, t);
	}, Xl = (e) => {
		var t = qc(), n = L(t, !0);
		M(t), B((e) => K(n, e), [() => Q("ui.loading")]), G(e, t);
	};
	q(Jl, (e) => {
		H(h) ? e(Yl) : e(Xl, -1);
	});
	var Zl = z(Jl, 2), Ql = (e) => {
		ba(e, {
			get image() {
				return H(_r);
			},
			onapply: yr,
			oncancel: () => I(_r, null)
		});
	};
	q(Zl, (e) => {
		H(_r) && e(Ql);
	});
	var $l = z(Zl, 2), eu = (e) => {
		var t = Yc(), n = L(t), r = L(n), i = L(r, !0);
		M(r);
		var a = z(r, 2);
		Vr(a, 16, () => H(Ne).lines, (e) => e, (e, t) => {
			var n = Jc(), r = L(n, !0);
			M(n), B(() => K(r, t)), G(e, n);
		});
		var o = z(a, 2), s = L(o), c = L(s, !0);
		M(s);
		var l = z(s, 2), u = L(l, !0);
		M(l), M(o), M(n), M(t), B(() => {
			K(i, H(Ne).title), K(c, H(Ne).cancelLabel), K(u, H(Ne).okLabel);
		}), U("click", s, () => Fe(!1)), U("click", l, () => Fe(!0)), G(e, t);
	};
	q($l, (e) => {
		H(Ne) && e(eu);
	});
	var tu = z($l, 2), nu = (e) => {
		var t = Xc(), n = L(t), r = L(n), i = L(r, !0);
		M(r);
		var a = z(r, 2), o = L(a, !0);
		M(a);
		var s = z(a, 2), c = L(s), l = z(c);
		Y(l), M(s);
		var u = z(s, 2), d = L(u), f = z(d);
		{
			let e = /* @__PURE__ */ P(() => Q("setup.accentPick"));
			Pi(f, {
				get value() {
					return H(Re);
				},
				get label() {
					return H(e);
				},
				onchange: (e) => I(Re, e, !0)
			});
		}
		M(u);
		var p = z(u, 2), m = L(p), h = z(m);
		{
			let e = /* @__PURE__ */ P(() => Q("setup.bgLabel"));
			Pi(h, {
				get value() {
					return H(Be);
				},
				get label() {
					return H(e);
				},
				onchange: (e) => I(Be, e, !0)
			});
		}
		M(p);
		var g = z(p, 2), _ = L(g, !0);
		M(g);
		var v = z(g, 2), y = L(v), b = L(y, !0);
		M(y);
		var x = z(y, 2), S = L(x, !0);
		M(x), M(v), M(n), M(t), B((e, t, n, r, a, s, u, f, p, h) => {
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
			() => !H(Le).trim(),
			() => Q("setup.start")
		]), U("keydown", l, (e) => e.key === "Enter" && He()), li(l, () => H(Le), (e) => I(Le, e)), U("click", y, Ve), U("click", x, He), G(e, t);
	};
	q(tu, (e) => {
		H(Ie) && e(nu);
	});
	var ru = z(tu, 2), iu = (e) => {
		var t = Zc();
		let n;
		var r = L(t), i = L(r, !0);
		M(r);
		var a = z(r, 2);
		M(t), B((e) => {
			n = Qr(t, 1, "toast svelte-1n46o8q", null, n, {
				ok: H(y) === "ok",
				error: H(y) === "error"
			}), K(i, H(v)), Z(a, "title", e);
		}, [() => Q("ui.close")]), U("click", a, () => x("")), G(e, t);
	};
	q(ru, (e) => {
		H(v) && e(iu);
	}), M(jl);
	var au = z(jl, 2), ou = (e) => {
		var t = Qc(), n = L(t), r = L(n), i = L(r, !0);
		M(r);
		var o = z(r, 2);
		J(o, () => c.cross, !0), M(o), M(n);
		var s = z(n, 2), l = L(s);
		a(l), M(s), M(t), B((e, n) => {
			ei(t, `left: ${H(tt).left ?? ""}px; top: ${H(tt).top ?? ""}px`), K(i, e), Z(o, "title", n);
		}, [() => Q("blocks.suffix", { label: ht[H(N).type] ?? H(N).type }), () => Q("tip.closeEsc")]), U("click", o, () => I(tt, null)), G(e, t);
	};
	q(au, (e) => {
		H(tt) && H(N) && e(ou);
	}), B(() => Fl = Qr(Pl, 1, "topbar svelte-1n46o8q", null, Fl, { hidden: !H(D) })), G(e, Al), We();
}
Cr([
	"click",
	"input",
	"pointerdown",
	"change",
	"keydown"
]);
//#endregion
//#region src/main.js
function tl() {
	let e = localStorage.getItem("urd-admin-lang");
	if (e) return gi(e);
	for (let e of navigator.languages ?? [navigator.language]) {
		let t = _i(e);
		if (t) return t;
	}
	return "en-GB";
}
var nl = tl();
document.documentElement.lang = nl;
var rl = async (e) => (await import(
	/* @vite-ignore */
	`/assets/engine/locales/admin/${e}.js`
)).default.strings, il = {};
try {
	il = await rl("nb"), nl !== "nb" && Object.assign(il, await rl(nl));
} catch {}
xi(nl, il);
var al = Mr(el, { target: document.getElementById("urd-admin") });
//#endregion
export { al as default };
