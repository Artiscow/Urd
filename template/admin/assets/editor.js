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
var h = 1024, g = 2048, _ = 4096, v = 8192, y = 16384, b = 32768, x = 1 << 25, S = 65536, C = 1 << 19, ee = 1 << 20, w = 1 << 25, te = 65536, T = 1 << 21, ne = 1 << 22, re = 1 << 23, ie = Symbol("$state"), ae = Symbol("legacy props"), oe = Symbol(""), se = Symbol("attributes"), ce = Symbol("class"), le = Symbol("style"), ue = Symbol("text"), de = Symbol("form reset"), fe = new class extends Error {
	name = "StaleReactionError";
	message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}(), pe = !!globalThis.document?.contentType && /* @__PURE__ */ globalThis.document.contentType.includes("xml");
//#endregion
//#region node_modules/svelte/src/internal/client/errors.js
function me() {
	throw Error("https://svelte.dev/e/async_derived_orphan");
}
function he(e, t, n) {
	throw Error("https://svelte.dev/e/each_key_duplicate");
}
function ge(e) {
	throw Error("https://svelte.dev/e/effect_in_teardown");
}
function _e() {
	throw Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function ve(e) {
	throw Error("https://svelte.dev/e/effect_orphan");
}
function E() {
	throw Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function ye(e) {
	throw Error("https://svelte.dev/e/props_invalid_value");
}
function D() {
	throw Error("https://svelte.dev/e/state_descriptors_fixed");
}
function O() {
	throw Error("https://svelte.dev/e/state_prototype_fixed");
}
function be() {
	throw Error("https://svelte.dev/e/state_unsafe_mutation");
}
function xe() {
	throw Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
//#endregion
//#region node_modules/svelte/src/constants.js
var Se = {}, Ce = Symbol("uninitialized"), we = "http://www.w3.org/1999/xhtml", Te = "http://www.w3.org/2000/svg", Ee = "http://www.w3.org/1998/Math/MathML";
function De() {
	console.warn("https://svelte.dev/e/derived_inert");
}
function Oe(e) {
	console.warn("https://svelte.dev/e/hydration_mismatch");
}
function ke() {
	console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/hydration.js
var Ae = !1;
function je(e) {
	Ae = e;
}
var Me;
function Ne(e) {
	if (e === null) throw Oe(), Se;
	return Me = e;
}
function Pe() {
	return Ne(/* @__PURE__ */ fn(Me));
}
function k(e) {
	if (Ae) {
		if (/* @__PURE__ */ fn(Me) !== null) throw Oe(), Se;
		Me = e;
	}
}
function Fe(e = 1) {
	if (Ae) {
		for (var t = e, n = Me; t--;) n = /* @__PURE__ */ fn(n);
		Me = n;
	}
}
function Ie(e = !0) {
	for (var t = 0, n = Me;;) {
		if (n.nodeType === 8) {
			var r = n.data;
			if (r === "]") {
				if (t === 0) return n;
				--t;
			} else (r === "[" || r === "[!" || r[0] === "[" && !isNaN(Number(r.slice(1)))) && (t += 1);
		}
		var i = /* @__PURE__ */ fn(n);
		e && n.remove(), n = i;
	}
}
function Le(e) {
	if (!e || e.nodeType !== 8) throw Oe(), Se;
	return e.data;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/equality.js
function Re(e) {
	return e === this.v;
}
function ze(e, t) {
	return e == e ? e !== t || typeof e == "object" && !!e || typeof e == "function" : t == t;
}
function Be(e) {
	return !ze(e, this.v);
}
//#endregion
//#region node_modules/svelte/src/internal/shared/clone.js
var Ve = [];
function He(e, t = !1, n = !1) {
	return Ue(e, /* @__PURE__ */ new Map(), "", Ve, null, n);
}
function Ue(t, n, r, i, a = null, o = !1) {
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
				d in t && (u[d] = Ue(f, n, r, i, null, o));
			}
			return u;
		}
		if (l(t) === s) {
			u = {}, n.set(t, u), a !== null && n.set(a, u);
			for (var p of Object.keys(t)) u[p] = Ue(t[p], n, r, i, null, o);
			return u;
		}
		if (t instanceof Date) return structuredClone(t);
		if (typeof t.toJSON == "function" && !o) return Ue(t.toJSON(), n, r, i, t);
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
var We = null;
function Ge(e) {
	We = e;
}
function Ke(e, t = !1, n) {
	We = {
		p: We,
		i: !1,
		c: null,
		e: null,
		s: e,
		x: null,
		r: Jn,
		l: null
	};
}
function qe(e) {
	var t = We, n = t.e;
	if (n !== null) {
		t.e = null;
		for (var r of n) Cn(r);
	}
	return e !== void 0 && (t.x = e), t.i = !0, We = t.p, e ?? {};
}
function Je() {
	return !0;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/task.js
var Ye = [];
function Xe() {
	var e = Ye;
	Ye = [], f(e);
}
function Ze(e) {
	if (Ye.length === 0 && !Pt) {
		var t = Ye;
		queueMicrotask(() => {
			t === Ye && Xe();
		});
	}
	Ye.push(e);
}
function Qe() {
	for (; Ye.length > 0;) Xe();
}
function $e(e) {
	var t = Jn;
	if (t === null) return Gn.f |= re, e;
	if (!(t.f & 32768) && !(t.f & 4)) throw e;
	et(e, t);
}
function et(e, t) {
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
var tt = ~(g | _ | h);
function nt(e, t) {
	e.f = e.f & tt | t;
}
function rt(e) {
	e.f & 512 || e.deps === null ? nt(e, h) : nt(e, _);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/utils.js
function it(e) {
	if (e !== null) for (let t of e) !(t.f & 2) || !(t.f & 65536) || (t.f ^= te, it(t.deps));
}
function at(e, t, n) {
	e.f & 2048 ? t.add(e) : e.f & 4096 && n.add(e), it(e.deps), nt(e, h);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/store.js
var ot = !1;
function st(e) {
	var t = ot;
	try {
		return ot = !1, [e(), ot];
	} finally {
		ot = t;
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/misc.js
function ct(e, t) {
	if (t) {
		let t = document.body;
		e.autofocus = !0, Ze(() => {
			document.activeElement === t && e.focus();
		});
	}
}
function lt(e) {
	Ae && /* @__PURE__ */ dn(e) !== null && pn(e);
}
var ut = !1;
function dt() {
	ut || (ut = !0, document.addEventListener("reset", (e) => {
		Promise.resolve().then(() => {
			if (!e.defaultPrevented) for (let t of e.target.elements) t[de]?.();
		});
	}, { capture: !0 }));
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
function ft(e) {
	var t = Gn, n = Jn;
	qn(null), Yn(null);
	try {
		return e();
	} finally {
		qn(t), Yn(n);
	}
}
function A(e, t, n, r = n) {
	e.addEventListener(t, () => ft(n));
	let i = e[de];
	e[de] = i ? () => {
		i(), r(!0);
	} : () => r(!0), dt();
}
//#endregion
//#region node_modules/svelte/src/reactivity/create-subscriber.js
function pt(e) {
	let t = 0, n = Zt(0), r;
	return () => {
		bn() && (z(n), Dn(() => (t === 0 && (r = gr(() => e(() => tn(n)))), t += 1, () => {
			Ze(() => {
				--t, t === 0 && (r?.(), r = void 0, tn(n));
			});
		})));
	};
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/boundary.js
var mt = S | C;
function ht(e, t, n, r) {
	new gt(e, t, n, r);
}
var gt = class {
	parent;
	is_pending = !1;
	transform_error;
	#e;
	#t = Ae ? Me : null;
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
	#h = pt(() => (this.#m = Zt(this.#l), () => {
		this.#m = null;
	}));
	constructor(e, t, n, r) {
		this.#e = e, this.#n = t, this.#r = (e) => {
			var t = Jn;
			t.b = this, t.f |= 128, n(e);
		}, this.parent = Jn.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = On(() => {
			if (Ae) {
				let e = this.#t;
				Pe();
				let t = e.data === "[!";
				if (e.data.startsWith("[?")) {
					let t = JSON.parse(e.data.slice(2));
					this.#_(t);
				} else t ? this.#y() : this.#g();
			} else this.#b();
		}, mt), Ae && (this.#e = Me);
	}
	#g() {
		try {
			this.#a = kn(() => this.#r(this.#e));
		} catch (e) {
			this.error(e);
		}
	}
	#_(e) {
		let t = this.#n.failed, { reset: n, invoke_onerror: r } = this.#v(e);
		Ze(r), t && (this.#s = kn(() => {
			t(this.#e, () => e, () => n);
		}));
	}
	#v(e) {
		var t = !1, n = !1;
		let r = () => {
			if (t) {
				ke();
				return;
			}
			t = !0, n && xe(), this.#s !== null && In(this.#s, () => {
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
					et(e, this.#i && this.#i.parent);
				}
			}
		};
	}
	#y() {
		let e = this.#n.pending;
		e && (this.is_pending = !0, this.#o = kn(() => e(this.#e)), Ze(() => {
			var e = this.#c = document.createDocumentFragment(), t = un();
			e.append(t), this.#a = this.#S(() => kn(() => this.#r(t))), this.#u === 0 && (this.#e.before(e), this.#c = null, In(this.#o, () => {
				this.#o = null;
			}), this.#x(At));
		}));
	}
	#b() {
		try {
			if (this.is_pending = this.has_pending_snippet(), this.#u = 0, this.#l = 0, this.#a = kn(() => {
				this.#r(this.#e);
			}), this.#u > 0) {
				var e = this.#c = document.createDocumentFragment();
				Bn(this.#a, e);
				let t = this.#n.pending;
				this.#o = kn(() => t(this.#e));
			} else this.#x(At);
		} catch (e) {
			this.error(e);
		}
	}
	#x(e) {
		this.is_pending = !1, e.transfer_effects(this.#f, this.#p);
	}
	defer_effect(e) {
		at(e, this.#f, this.#p);
	}
	is_rendered() {
		return !this.is_pending && (!this.parent || this.parent.is_rendered());
	}
	has_pending_snippet() {
		return !!this.#n.pending;
	}
	#S(e) {
		var t = Jn, n = Gn, r = We;
		Yn(this.#i), qn(this.#i), Ge(this.#i.ctx);
		try {
			return Bt.ensure(), e();
		} catch (e) {
			return $e(e), null;
		} finally {
			Yn(t), qn(n), Ge(r);
		}
	}
	#C(e, t) {
		if (!this.has_pending_snippet()) {
			this.parent && this.parent.#C(e, t);
			return;
		}
		this.#u += e, this.#u === 0 && (this.#x(t), this.#o && In(this.#o, () => {
			this.#o = null;
		}), this.#c &&= (this.#e.before(this.#c), null));
	}
	update_pending_count(e, t) {
		this.#C(e, t), this.#l += e, !(!this.#m || this.#d) && (this.#d = !0, Ze(() => {
			this.#d = !1, this.#m && $t(this.#m, this.#l);
		}));
	}
	get_effect_pending() {
		return this.#h(), z(this.#m);
	}
	error(e) {
		if (!this.#n.onerror && !this.#n.failed) throw e;
		At?.is_fork ? (this.#a && At.skip_effect(this.#a), this.#o && At.skip_effect(this.#o), this.#s && At.skip_effect(this.#s), At.oncommit(() => {
			this.#w(e);
		})) : this.#w(e);
	}
	#w(e) {
		this.#a &&= (Nn(this.#a), null), this.#o &&= (Nn(this.#o), null), this.#s &&= (Nn(this.#s), null), Ae && (Ne(this.#t), Fe(), Ne(Ie()));
		let t = this.#n.failed, n = (e) => {
			let { reset: n, invoke_onerror: r } = this.#v(e);
			r(), t && (this.#s = this.#S(() => {
				try {
					return kn(() => {
						var r = Jn;
						r.b = this, r.f |= 128, t(this.#e, () => e, () => n);
					});
				} catch (e) {
					return et(e, this.#i.parent), null;
				}
			}));
		};
		Ze(() => {
			var t;
			try {
				t = this.transform_error(e);
			} catch (e) {
				et(e, this.#i && this.#i.parent);
				return;
			}
			typeof t == "object" && t && typeof t.then == "function" ? t.then(n, (e) => et(e, this.#i && this.#i.parent)) : n(t);
		});
	}
};
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/async.js
function _t(e, t, n, r) {
	let i = Je() ? bt : Ct;
	var a = e.filter((e) => !e.settled), o = t.map(i);
	if (n.length === 0 && a.length === 0) {
		r(o);
		return;
	}
	var s = Jn, c = vt(), l = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((e) => e.promise)) : null;
	function u(e) {
		if (!(s.f & 16384)) {
			c();
			try {
				r([...o, ...e]);
			} catch (e) {
				et(e, s);
			}
			yt();
		}
	}
	var d = j();
	if (n.length === 0) {
		l.then(() => u([])).finally(d);
		return;
	}
	function f() {
		Promise.all(n.map((e) => /* @__PURE__ */ St(e))).then(u).catch((e) => et(e, s)).finally(d);
	}
	l ? l.then(() => {
		c(), f(), yt();
	}) : f();
}
function vt() {
	var e = Jn, t = Gn, n = We, r = At;
	return function(i = !0) {
		Yn(e), qn(t), Ge(n), i && !(e.f & 16384) && (r?.activate(), r?.apply());
	};
}
function yt(e = !0) {
	Yn(null), qn(null), Ge(null), e && At?.deactivate();
}
function j() {
	var e = Jn, t = e.b, n = At, r = !!t?.is_rendered();
	return t?.update_pending_count(1, n), n.increment(r, e), () => {
		t?.update_pending_count(-1, n), n.decrement(r, e);
	};
}
/*#__NO_SIDE_EFFECTS__*/
function bt(e) {
	var t = 2 | g;
	return Jn !== null && (Jn.f |= C), {
		ctx: We,
		deps: null,
		effects: null,
		equals: Re,
		f: t,
		fn: e,
		reactions: null,
		rv: 0,
		v: Ce,
		wv: 0,
		parent: Jn,
		ac: null
	};
}
var xt = Symbol("obsolete");
/*#__NO_SIDE_EFFECTS__*/
function St(e, t, n) {
	let r = Jn;
	r === null && me();
	var i = void 0, a = Zt(Ce), o = !Gn, s = /* @__PURE__ */ new Set();
	return En(() => {
		var t = Jn, n = p();
		i = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, (e) => {
				e !== fe && n.reject(e);
			}).finally(yt);
		} catch (e) {
			n.reject(e), yt();
		}
		var c = At;
		if (o) {
			if (t.f & 32768) var l = j();
			if (r.b?.is_rendered()) c.async_deriveds.get(t)?.reject(xt);
			else for (let e of s.values()) e.reject(xt);
			s.add(n), c.async_deriveds.set(t, n);
		}
		let u = (e, t = void 0) => {
			l?.(), s.delete(n), t !== xt && (c.activate(), t ? (a.f |= re, $t(a, t)) : (a.f & 8388608 && (a.f ^= re), $t(a, e)), c.deactivate());
		};
		n.promise.then(u, (e) => u(null, e || "unknown"));
	}), xn(() => {
		for (let e of s) e.reject(xt);
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
function M(e) {
	let t = /* @__PURE__ */ bt(e);
	return Zn(t), t;
}
/*#__NO_SIDE_EFFECTS__*/
function Ct(e) {
	let t = /* @__PURE__ */ bt(e);
	return t.equals = Be, t;
}
function wt(e) {
	var t = e.effects;
	if (t !== null) {
		e.effects = null;
		for (var n = 0; n < t.length; n += 1) Nn(t[n]);
	}
}
function Tt(e) {
	var t, n = Jn, r = e.parent;
	if (!Un && r !== null && e.v !== Ce && r.f & 24576) return De(), e.v;
	Yn(r);
	try {
		e.f &= ~te, wt(e), t = lr(e);
	} finally {
		Yn(n);
	}
	return t;
}
function Et(e) {
	var t = Tt(e);
	if (!e.equals(t) && (e.wv = or(), (!At?.is_fork || e.deps === null) && (At === null ? e.v = t : (At.capture(e, t, !0), jt?.capture(e, t, !0)), e.deps === null))) {
		nt(e, h);
		return;
	}
	Un || (Mt === null ? rt(e) : (bn() || At?.is_fork) && Mt.set(e, t));
}
function Dt(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac !== null && ft(() => {
		t.ac.abort(fe), t.ac = null;
	}), t.fn !== null && (t.teardown = d), dr(t, 0), jn(t));
}
function Ot(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && fr(t);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/batch.js
var kt = null, At = null, jt = null, Mt = null, Nt = null, Pt = !1, Ft = !1, It = null, Lt = null, Rt = 0, zt = 1, Bt = class e {
	id = zt++;
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
		kt === null ? kt = this : (kt.#n = this, this.#t = kt), kt = this;
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
			for (var r of n.d) nt(r, g), t(r);
			for (r of n.m) nt(r, _), t(r);
		}
		this.#p.add(e);
	}
	#g() {
		this.#e = !0, Rt++ > 1e3 && (this.#x(), Ht());
		for (let e of this.#u) this.#d.delete(e), nt(e, g), this.schedule(e);
		for (let e of this.#d) nt(e, _), this.schedule(e);
		let t = this.#c;
		this.#c = [], this.apply();
		var n = It = [], r = [], i = Lt = [];
		for (let e of t) try {
			this.#_(e, n, r);
		} catch (t) {
			throw qt(e), this.#h() || this.discard(), t;
		}
		if (At = null, i.length > 0) {
			var a = e.ensure();
			for (let e of i) a.schedule(e);
		}
		if (It = null, Lt = null, this.#h()) {
			this.#b(r), this.#b(n);
			for (let [e, t] of this.#f) Kt(e, t);
			i.length > 0 && At.#g();
			return;
		}
		let o = this.#v();
		if (o) {
			this.#b(r), this.#b(n), o.#y(this);
			return;
		}
		this.#u.clear(), this.#d.clear();
		for (let e of this.#r) e(this);
		this.#r.clear(), jt = this, Wt(r), Wt(n), jt = null, this.#s?.resolve();
		var s = At;
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
				a ? r.f ^= h : i & 4 ? t.push(r) : sr(r) && (i & 16 && this.#d.add(r), fr(r));
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
					r & 4194320 && !this.async_deriveds.has(i) && (this.#d.delete(i), nt(i, g), this.schedule(i));
				}
			}
		};
		for (let e of this.current.keys()) t(e);
		this.oncommit(() => e.discard()), e.#x(), At = this, this.#g();
	}
	#b(e) {
		for (var t = 0; t < e.length; t += 1) at(e[t], this.#u, this.#d);
	}
	capture(e, t, n = !1) {
		e.v !== Ce && !this.previous.has(e) && this.previous.set(e, e.v), e.f & 8388608 || (this.current.set(e, [t, n]), Mt?.set(e, t)), this.is_fork || (e.v = t);
	}
	activate() {
		At = this;
	}
	deactivate() {
		At = null, Mt = null;
	}
	flush() {
		try {
			Ft = !0, At = this, this.#g();
		} finally {
			Rt = 0, Nt = null, It = null, Lt = null, Ft = !1, At = null, Mt = null, Yt.clear();
		}
	}
	discard() {
		for (let e of this.#i) e(this);
		this.#i.clear();
		for (let e of this.async_deriveds.values()) e.reject(xt);
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
		this.#m || (this.#m = !0, Ze(() => {
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
		if (At === null) {
			let t = At = new e();
			!Ft && !Pt && Ze(() => {
				t.#e || t.flush();
			});
		}
		return At;
	}
	apply() {
		Mt = null;
	}
	schedule(e) {
		if (Nt = e, e.b?.is_pending && e.f & 16777228 && !(e.f & 32768)) {
			e.b.defer_effect(e);
			return;
		}
		for (var t = e; t.parent !== null;) {
			t = t.parent;
			var n = t.f;
			if (It !== null && t === Jn && (Gn === null || !(Gn.f & 2))) return;
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
			e === null || (e.#n = t), t === null ? kt = e : t.#t = e, this.linked = !1;
		}
	}
};
function Vt(e) {
	var t = Pt;
	Pt = !0;
	try {
		var n;
		for (e && (At !== null && !At.is_fork && At.flush(), n = e());;) {
			if (Qe(), At === null) return n;
			At.flush();
		}
	} finally {
		Pt = t;
	}
}
function Ht() {
	try {
		E();
	} catch (e) {
		et(e, Nt);
	}
}
var Ut = null;
function Wt(e) {
	var t = e.length;
	if (t !== 0) {
		for (var n = 0; n < t;) {
			var r = e[n++];
			if (!(r.f & 24576) && sr(r) && (Ut = /* @__PURE__ */ new Set(), fr(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && Fn(r), Ut?.size > 0)) {
				Yt.clear();
				for (let e of Ut) {
					if (e.f & 24576) continue;
					let t = [e], n = e.parent;
					for (; n !== null;) Ut.has(n) && (Ut.delete(n), t.push(n)), n = n.parent;
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || fr(n);
					}
				}
				Ut.clear();
			}
		}
		Ut = null;
	}
}
function Gt(e) {
	At.schedule(e);
}
function Kt(e, t) {
	if (!(e.f & 32 && e.f & 1024)) {
		e.f & 2048 ? t.d.push(e) : e.f & 4096 && t.m.push(e), nt(e, h);
		for (var n = e.first; n !== null;) Kt(n, t), n = n.next;
	}
}
function qt(e) {
	nt(e, h);
	for (var t = e.first; t !== null;) qt(t), t = t.next;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/sources.js
var Jt = /* @__PURE__ */ new Set(), Yt = /* @__PURE__ */ new Map(), Xt = !1;
function Zt(e, t) {
	return {
		f: 0,
		v: e,
		reactions: null,
		equals: Re,
		rv: 0,
		wv: 0
	};
}
/*#__NO_SIDE_EFFECTS__*/
function N(e, t) {
	let n = Zt(e, t);
	return Zn(n), n;
}
/*#__NO_SIDE_EFFECTS__*/
function Qt(e, t = !1, n = !0) {
	let r = Zt(e);
	return t || (r.equals = Be), r;
}
function P(e, t, n = !1) {
	return Gn !== null && (!Kn || Gn.f & 131072) && Je() && Gn.f & 4325394 && (Xn === null || !Xn.has(e)) && be(), $t(e, n ? rn(t) : t, Lt);
}
function $t(e, t, n = null) {
	if (!e.equals(t)) {
		Yt.set(e, Un ? t : e.v);
		var r = Bt.ensure();
		if (r.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && Tt(t), Mt === null && rt(t);
		}
		e.wv = or(), nn(e, g, n), Je() && Jn !== null && Jn.f & 1024 && !(Jn.f & 96) && (er === null ? tr([e]) : er.push(e)), !r.is_fork && Jt.size > 0 && !Xt && en();
	}
	return t;
}
function en() {
	Xt = !1;
	for (let e of Jt) {
		e.f & 1024 && nt(e, _);
		let t;
		try {
			t = sr(e);
		} catch {
			t = !0;
		}
		t && fr(e);
	}
	Jt.clear();
}
function tn(e) {
	P(e, e.v + 1);
}
function nn(e, t, n) {
	var r = e.reactions;
	if (r !== null) for (var i = Je(), a = r.length, o = 0; o < a; o++) {
		var s = r[o], c = s.f;
		if (!(!i && s === Jn)) {
			var l = (c & g) === 0;
			if (l && nt(s, t), c & 131072) Jt.add(s);
			else if (c & 2) {
				var u = s;
				Mt?.delete(u), c & 65536 || (c & 512 && (Jn === null || !(Jn.f & 2097152)) && (s.f |= te), nn(u, _, n));
			} else if (l) {
				var d = s;
				c & 16 && Ut !== null && Ut.add(d), n === null ? Gt(d) : n.push(d);
			}
		}
	}
}
function rn(t) {
	if (typeof t != "object" || !t || ie in t) return t;
	let n = l(t);
	if (n !== s && n !== c) return t;
	var r = /* @__PURE__ */ new Map(), i = e(t), o = /* @__PURE__ */ N(0), u = null, d = ir, f = (e) => {
		if (ir === d) return e();
		var t = Gn, n = ir;
		qn(null), ar(d);
		var r = e();
		return qn(t), ar(n), r;
	};
	return i && r.set("length", /* @__PURE__ */ N(t.length, u)), new Proxy(t, {
		defineProperty(e, t, n) {
			(!("value" in n) || n.configurable === !1 || n.enumerable === !1 || n.writable === !1) && D();
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
					let e = f(() => /* @__PURE__ */ N(Ce, u));
					r.set(t, e), tn(o);
				}
			} else P(n, Ce), tn(o);
			return !0;
		},
		get(e, n, i) {
			if (n === ie) return t;
			var o = r.get(n), s = n in e;
			if (o === void 0 && (!s || a(e, n)?.writable) && (o = f(() => /* @__PURE__ */ N(rn(s ? e[n] : Ce), u)), r.set(n, o)), o !== void 0) {
				var c = z(o);
				return c === Ce ? void 0 : c;
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
				if (a !== void 0 && o !== Ce) return {
					enumerable: !0,
					configurable: !0,
					value: o,
					writable: !0
				};
			}
			return n;
		},
		has(e, t) {
			if (t === ie) return !0;
			var n = r.get(t), i = n !== void 0 && n.v !== Ce || Reflect.has(e, t);
			return (n !== void 0 || Jn !== null && (!i || a(e, t)?.writable)) && (n === void 0 && (n = f(() => /* @__PURE__ */ N(i ? rn(e[t]) : Ce, u)), r.set(t, n)), z(n) === Ce) ? !1 : i;
		},
		set(e, t, n, s) {
			var c = r.get(t), l = t in e;
			if (i && t === "length") for (var d = n; d < c.v; d += 1) {
				var p = r.get(d + "");
				p === void 0 ? d in e && (p = f(() => /* @__PURE__ */ N(Ce, u)), r.set(d + "", p)) : P(p, Ce);
			}
			if (c === void 0) (!l || a(e, t)?.writable) && (c = f(() => /* @__PURE__ */ N(void 0, u)), P(c, rn(n)), r.set(t, c));
			else {
				l = c.v !== Ce;
				var m = f(() => rn(n));
				P(c, m);
			}
			var h = Reflect.getOwnPropertyDescriptor(e, t);
			if (h?.set && h.set.call(s, n), !l) {
				if (i && typeof t == "string") {
					var g = r.get("length"), _ = Number(t);
					Number.isInteger(_) && _ >= g.v && P(g, _ + 1);
				}
				tn(o);
			}
			return !0;
		},
		ownKeys(e) {
			z(o);
			var t = Reflect.ownKeys(e).filter((e) => {
				var t = r.get(e);
				return t === void 0 || t.v !== Ce;
			});
			for (var [n, i] of r) i.v !== Ce && !(n in e) && t.push(n);
			return t;
		},
		setPrototypeOf() {
			O();
		}
	});
}
var an, on, sn, cn;
function ln() {
	if (an === void 0) {
		an = window, on = /Firefox/.test(navigator.userAgent);
		var e = Element.prototype, t = Node.prototype, n = Text.prototype;
		sn = a(t, "firstChild").get, cn = a(t, "nextSibling").get, u(e) && (e[ce] = void 0, e[se] = null, e[le] = void 0, e.__e = void 0), u(n) && (n[ue] = void 0);
	}
}
function un(e = "") {
	return document.createTextNode(e);
}
/*@__NO_SIDE_EFFECTS__*/
function dn(e) {
	return sn.call(e);
}
/*@__NO_SIDE_EFFECTS__*/
function fn(e) {
	return cn.call(e);
}
function F(e, t) {
	if (!Ae) return /* @__PURE__ */ dn(e);
	var n = /* @__PURE__ */ dn(Me);
	if (n === null) n = Me.appendChild(un());
	else if (t && n.nodeType !== 3) {
		var r = un();
		return n?.before(r), Ne(r), r;
	}
	return t && gn(n), Ne(n), n;
}
function I(e, t = !1) {
	if (!Ae) {
		var n = /* @__PURE__ */ dn(e);
		return n instanceof Comment && n.data === "" ? /* @__PURE__ */ fn(n) : n;
	}
	if (t) {
		if (Me?.nodeType !== 3) {
			var r = un();
			return Me?.before(r), Ne(r), r;
		}
		gn(Me);
	}
	return Me;
}
function L(e, t = 1, n = !1) {
	let r = Ae ? Me : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ fn(r);
	if (!Ae) return r;
	if (n) {
		if (r?.nodeType !== 3) {
			var a = un();
			return r === null ? i?.after(a) : r.before(a), Ne(a), a;
		}
		gn(r);
	}
	return Ne(r), r;
}
function pn(e) {
	e.textContent = "";
}
function mn() {
	return !1;
}
function hn(e, t, n) {
	return t == null || t === "http://www.w3.org/1999/xhtml" ? n ? document.createElement(e, { is: n }) : document.createElement(e) : n ? document.createElementNS(t, e, { is: n }) : document.createElementNS(t, e);
}
function gn(e) {
	if (e.nodeValue.length < 65536) return;
	let t = e.nextSibling;
	for (; t !== null && t.nodeType === 3;) t.remove(), e.nodeValue += t.nodeValue, t = e.nextSibling;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/effects.js
function _n(e) {
	Jn === null && (Gn === null && ve(e), _e()), Un && ge(e);
}
function vn(e, t) {
	var n = t.last;
	n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function yn(e, t) {
	var n = Jn;
	n !== null && n.f & 8192 && (e |= v);
	var r = {
		ctx: We,
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
	At?.register_created_effect(r);
	var i = r;
	if (e & 4) It === null ? Bt.ensure().schedule(r) : It.push(r);
	else if (t !== null) {
		try {
			fr(r);
		} catch (e) {
			throw Nn(r), e;
		}
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && (i = i.first, e & 16 && e & 65536 && i !== null && (i.f |= S));
	}
	if (i !== null && (i.parent = n, n !== null && vn(i, n), Gn !== null && Gn.f & 2 && !(e & 64))) {
		var a = Gn;
		(a.effects ??= []).push(i);
	}
	return r;
}
function bn() {
	return Gn !== null && !Kn;
}
function xn(e) {
	let t = yn(8, null);
	return nt(t, h), t.teardown = e, t;
}
function Sn(e) {
	_n("$effect");
	var t = Jn.f;
	if (!Gn && t & 32 && We !== null && !We.i) {
		var n = We;
		(n.e ??= []).push(e);
	} else return Cn(e);
}
function Cn(e) {
	return yn(4 | ee, e);
}
function wn(e) {
	Bt.ensure();
	let t = yn(64 | C, e);
	return (e = {}) => new Promise((n) => {
		e.outro ? In(t, () => {
			Nn(t), n(void 0);
		}) : (Nn(t), n(void 0));
	});
}
function Tn(e) {
	return yn(4, e);
}
function En(e) {
	return yn(ne | C, e);
}
function Dn(e, t = 0) {
	return yn(8 | t, e);
}
function R(e, t = [], n = [], r = []) {
	_t(r, t, n, (t) => {
		yn(8, () => {
			e(...t.map(z));
		});
	});
}
function On(e, t = 0) {
	return yn(16 | t, e);
}
function kn(e) {
	return yn(32 | C, e);
}
function An(e) {
	var t = e.teardown;
	if (t !== null) {
		let e = Un, n = Gn;
		Wn(!0), qn(null);
		try {
			t.call(null);
		} finally {
			Wn(e), qn(n);
		}
	}
}
function jn(e, t = !1) {
	var n = e.first;
	for (e.first = e.last = null; n !== null;) {
		let e = n.ac;
		e !== null && ft(() => {
			e.abort(fe);
		});
		var r = n.next;
		n.f & 64 ? n.parent = null : Nn(n, t), n = r;
	}
}
function Mn(e) {
	for (var t = e.first; t !== null;) {
		var n = t.next;
		t.f & 32 || Nn(t), t = n;
	}
}
function Nn(e, t = !0) {
	var n = !1;
	(t || e.f & 262144) && e.nodes !== null && e.nodes.end !== null && (Pn(e.nodes.start, e.nodes.end), n = !0), e.f |= x, jn(e, t && !n), dr(e, 0);
	var r = e.nodes && e.nodes.t;
	if (r !== null) for (let e of r) e.stop();
	An(e), e.f ^= x, e.f |= y;
	var i = e.parent;
	i !== null && i.first !== null && Fn(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function Pn(e, t) {
	for (; e !== null;) {
		var n = e === t ? null : /* @__PURE__ */ fn(e);
		e.remove(), e = n;
	}
}
function Fn(e) {
	var t = e.parent, n = e.prev, r = e.next;
	n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function In(e, t, n = !0) {
	var r = [];
	Ln(e, r, !0);
	var i = () => {
		n && Nn(e), t && t();
	}, a = r.length;
	if (a > 0) {
		var o = () => --a || i();
		for (var s of r) s.out(o);
	} else i();
}
function Ln(e, t, n) {
	if (!(e.f & 8192)) {
		e.f ^= v;
		var r = e.nodes && e.nodes.t;
		if (r !== null) for (let e of r) (e.is_global || n) && t.push(e);
		for (var i = e.first; i !== null;) {
			var a = i.next;
			if (!(i.f & 64)) {
				var o = !!(i.f & 65536) || !!(i.f & 32) && !!(e.f & 16);
				Ln(i, t, o ? n : !1);
			}
			i = a;
		}
	}
}
function Rn(e) {
	zn(e, !0);
}
function zn(e, t) {
	if (e.f & 8192) {
		e.f ^= v, e.f & 1024 || (nt(e, g), Bt.ensure().schedule(e));
		for (var n = e.first; n !== null;) {
			var r = n.next, i = !!(n.f & 65536) || !!(n.f & 32);
			zn(n, i ? t : !1), n = r;
		}
		var a = e.nodes && e.nodes.t;
		if (a !== null) for (let e of a) (e.is_global || t) && e.in();
	}
}
function Bn(e, t) {
	if (e.nodes) for (var n = e.nodes.start, r = e.nodes.end; n !== null;) {
		var i = n === r ? null : /* @__PURE__ */ fn(n);
		t.append(n), n = i;
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/legacy.js
var Vn = null, Hn = !1, Un = !1;
function Wn(e) {
	Un = e;
}
var Gn = null, Kn = !1;
function qn(e) {
	Gn = e;
}
var Jn = null;
function Yn(e) {
	Jn = e;
}
var Xn = null;
function Zn(e) {
	Gn !== null && (Xn ??= /* @__PURE__ */ new Set()).add(e);
}
var Qn = null, $n = 0, er = null;
function tr(e) {
	er = e;
}
var nr = 1, rr = 0, ir = rr;
function ar(e) {
	ir = e;
}
function or() {
	return ++nr;
}
function sr(e) {
	var t = e.f;
	if (t & 2048) return !0;
	if (t & 2 && (e.f &= ~te), t & 4096) {
		for (var n = e.deps, r = n.length, i = 0; i < r; i++) {
			var a = n[i];
			if (sr(a) && Et(a), a.wv > e.wv) return !0;
		}
		t & 512 && Mt === null && nt(e, h);
	}
	return !1;
}
function cr(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(Xn !== null && Xn.has(e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? cr(a, t, !1) : t === a && (n ? nt(a, g) : a.f & 1024 && nt(a, _), Gt(a));
	}
}
function lr(e) {
	var t = Qn, n = $n, r = er, i = Gn, a = Xn, o = We, s = Kn, c = ir, l = e.f;
	Qn = null, $n = 0, er = null, Gn = l & 96 ? null : e, Xn = null, Ge(e.ctx), Kn = !1, ir = ++rr, e.ac !== null && (ft(() => {
		e.ac.abort(fe);
	}), e.ac = null);
	try {
		e.f |= T;
		var u = e.fn, d = u();
		e.f |= b;
		var f = e.deps, p = At?.is_fork;
		if (Qn !== null) {
			var m;
			if (p || dr(e, $n), f !== null && $n > 0) for (f.length = $n + Qn.length, m = 0; m < Qn.length; m++) f[$n + m] = Qn[m];
			else e.deps = f = Qn;
			if (bn() && e.f & 512) for (m = $n; m < f.length; m++) (f[m].reactions ??= []).push(e);
		} else !p && f !== null && $n < f.length && (dr(e, $n), f.length = $n);
		if (Je() && er !== null && !Kn && f !== null && !(e.f & 6146)) for (m = 0; m < er.length; m++) cr(er[m], e);
		if (i !== null && i !== e) {
			if (rr++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = rr;
			if (t !== null) for (let e of t) e.rv = rr;
			er !== null && (r === null ? r = er : r.push(...er));
		}
		return e.f & 8388608 && (e.f ^= re), d;
	} catch (e) {
		return $e(e);
	} finally {
		e.f ^= T, Qn = t, $n = n, er = r, Gn = i, Xn = a, Ge(o), Kn = s, ir = c;
	}
}
function ur(e, r) {
	let i = r.reactions;
	if (i !== null) {
		var a = t.call(i, e);
		if (a !== -1) {
			var o = i.length - 1;
			o === 0 ? i = r.reactions = null : (i[a] = i[o], i.pop());
		}
	}
	if (i === null && r.f & 2 && (Qn === null || !n.call(Qn, r))) {
		var s = r;
		s.f & 512 && (s.f ^= 512, s.f &= ~te), s.v !== Ce && rt(s), s.ac !== null && ft(() => {
			s.ac.abort(fe), s.ac = null, nt(s, g);
		}), Dt(s), dr(s, 0);
	}
}
function dr(e, t) {
	var n = e.deps;
	if (n !== null) for (var r = t; r < n.length; r++) ur(e, n[r]);
}
function fr(e) {
	var t = e.f;
	if (!(t & 16384)) {
		nt(e, h);
		var n = Jn, r = Hn;
		Jn = e, Hn = !(t & 96);
		try {
			t & 16777232 ? Mn(e) : jn(e), An(e);
			var i = lr(e);
			e.teardown = typeof i == "function" ? i : null, e.wv = nr;
		} finally {
			Hn = r, Jn = n;
		}
	}
}
async function pr() {
	await Promise.resolve(), Vt();
}
function z(e) {
	var t = !!(e.f & 2);
	if (Vn?.add(e), Gn !== null && !Kn && !(Jn !== null && Jn.f & 16384) && (Xn === null || !Xn.has(e))) {
		var r = Gn.deps;
		if (Gn.f & 2097152) e.rv < rr && (e.rv = rr, Qn === null && r !== null && r[$n] === e ? $n++ : Qn === null ? Qn = [e] : Qn.push(e));
		else {
			Gn.deps ??= [], n.call(Gn.deps, e) || Gn.deps.push(e);
			var i = e.reactions;
			i === null ? e.reactions = [Gn] : n.call(i, Gn) || i.push(Gn);
		}
	}
	if (Un && Yt.has(e)) return Yt.get(e);
	if (t) {
		var a = e;
		if (Un) {
			var o = a.v;
			return (!(a.f & 1024) && a.reactions !== null || hr(a)) && (o = Tt(a)), Yt.set(a, o), o;
		}
		var s = !(a.f & 512) && !Kn && Gn !== null && (Hn || !!(Gn.f & 512)), c = (a.f & b) === 0;
		sr(a) && (s && (a.f |= 512), Et(a)), s && !c && (Ot(a), mr(a));
	}
	if (Mt?.has(e)) return Mt.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function mr(e) {
	if (e.f |= 512, e.deps !== null) for (let t of e.deps) (t.reactions ??= []).push(e), t.f & 2 && !(t.f & 512) && (Ot(t), mr(t));
}
function hr(e) {
	if (e.v === Ce) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if (Yt.has(t) || t.f & 2 && hr(t)) return !0;
	return !1;
}
function gr(e) {
	var t = Kn;
	try {
		return Kn = !0, e();
	} finally {
		Kn = t;
	}
}
[.../* @__PURE__ */ "allowfullscreen.async.autofocus.autoplay.checked.controls.default.disabled.formnovalidate.indeterminate.inert.ismap.loop.multiple.muted.nomodule.novalidate.open.playsinline.readonly.required.reversed.seamless.selected.webkitdirectory.defer.disablepictureinpicture.disableremoteplayback".split(".")];
var _r = ["touchstart", "touchmove"];
function vr(e) {
	return _r.includes(e);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/events.js
var yr = Symbol("events"), br = /* @__PURE__ */ new Set(), xr = /* @__PURE__ */ new Set();
function Sr(e) {
	if (!Ae) return;
	e.removeAttribute("onload"), e.removeAttribute("onerror");
	let t = e.__e;
	t !== void 0 && (e.__e = void 0, queueMicrotask(() => {
		e.isConnected && e.dispatchEvent(t);
	}));
}
function Cr(e, t, n, r = {}) {
	function i(e) {
		if (r.capture || Dr.call(t, e), !e.cancelBubble) return ft(() => n?.call(this, e));
	}
	return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? Ze(() => {
		t.addEventListener(e, i, r);
	}) : t.addEventListener(e, i, r), i;
}
function wr(e, t, n, r, i) {
	var a = {
		capture: r,
		passive: i
	}, o = Cr(e, t, n, a);
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && xn(() => {
		t.removeEventListener(e, o, a);
	});
}
function B(e, t, n) {
	(t[yr] ??= {})[e] = n;
}
function Tr(e) {
	for (var t = 0; t < e.length; t++) br.add(e[t]);
	for (var n of xr) n(e);
}
var Er = null;
function Dr(e) {
	var t = this, n = t.ownerDocument, r = e.type, a = e.composedPath?.() || [], o = a[0] || e.target;
	Er = e;
	var s = 0, c = Er === e && e[yr];
	if (c) {
		var l = a.indexOf(c);
		if (l !== -1 && (t === document || t === window)) {
			e[yr] = t;
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
		var d = Gn, f = Jn;
		qn(null), Yn(null);
		try {
			for (var p, m = []; o !== null && o !== t;) {
				try {
					var h = o[yr]?.[r];
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
			e[yr] = t, delete e.currentTarget, qn(d), Yn(f);
		}
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/reconciler.js
var Or = globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", { createHTML: (e) => e });
function kr(e) {
	return Or?.createHTML(e) ?? e;
}
function Ar(e) {
	var t = hn("template");
	return t.innerHTML = kr(e.replaceAll("<!>", "<!---->")), t.content;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/template.js
function jr(e, t) {
	var n = Jn;
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
		if (Ae) return jr(Me, null), Me;
		i === void 0 && (i = Ar(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ dn(i)));
		var t = r || on ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ dn(t), s = t.lastChild;
			jr(o, s);
		} else jr(t, t);
		return t;
	};
}
function Mr(e = "") {
	if (!Ae) {
		var t = un(e + "");
		return jr(t, t), t;
	}
	var n = Me;
	return n.nodeType === 3 ? gn(n) : (n.before(n = un()), Ne(n)), jr(n, n), n;
}
function Nr() {
	if (Ae) return jr(Me, null), Me;
	var e = document.createDocumentFragment(), t = document.createComment(""), n = un();
	return e.append(t, n), jr(t, n), e;
}
function H(e, t) {
	if (Ae) {
		var n = Jn;
		(!(n.f & 32768) || n.nodes.end === null) && (n.nodes.end = Me), Pe();
		return;
	}
	e !== null && e.before(t);
}
function U(e, t) {
	var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
	n !== (e[ue] ??= e.nodeValue) && (e[ue] = n, e.nodeValue = `${n}`);
}
function Pr(e, t) {
	return Ir(e, t);
}
var Fr = /* @__PURE__ */ new Map();
function Ir(e, { target: t, anchor: n, props: i = {}, events: a, context: o, intro: s = !0, transformError: c }) {
	ln();
	var l = void 0, u = wn(() => {
		var s = n ?? t.appendChild(un());
		ht(s, { pending: () => {} }, (t) => {
			Ke({});
			var n = We;
			if (o && (n.c = o), a && (i.$$events = a), Ae && jr(t, null), l = e(t, i) || {}, Ae && (Jn.nodes.end = Me, Me === null || Me.nodeType !== 8 || Me.data !== "]")) throw Oe(), Se;
			qe();
		}, c);
		var u = /* @__PURE__ */ new Set(), d = (e) => {
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				if (!u.has(r)) {
					u.add(r);
					var i = vr(r);
					for (let e of [t, document]) {
						var a = Fr.get(e);
						a === void 0 && (a = /* @__PURE__ */ new Map(), Fr.set(e, a));
						var o = a.get(r);
						o === void 0 ? (e.addEventListener(r, Dr, { passive: i }), a.set(r, 1)) : a.set(r, o + 1);
					}
				}
			}
		};
		return d(r(br)), xr.add(d), () => {
			for (var e of u) for (let n of [t, document]) {
				var r = Fr.get(n), i = r.get(e);
				--i == 0 ? (n.removeEventListener(e, Dr), r.delete(e), r.size === 0 && Fr.delete(n)) : r.set(e, i);
			}
			xr.delete(d), s !== n && s.parentNode?.removeChild(s);
		};
	});
	return Lr.set(l, u), l;
}
var Lr = /* @__PURE__ */ new WeakMap(), Rr = class {
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
			if (n) Rn(n), this.#r.delete(t);
			else {
				var r = this.#n.get(t);
				r && (Rn(r.effect), this.#t.set(t, r.effect), this.#n.delete(t), r.fragment.lastChild.remove(), this.anchor.before(r.fragment), n = r.effect);
			}
			for (let [t, n] of this.#e) {
				if (this.#e.delete(t), t === e) break;
				let r = this.#n.get(n);
				r && (Nn(r.effect), this.#n.delete(n));
			}
			for (let [e, r] of this.#t) {
				if (e === t || this.#r.has(e)) continue;
				let i = () => {
					if (Array.from(this.#e.values()).includes(e)) {
						var t = document.createDocumentFragment();
						Bn(r, t), t.append(un()), this.#n.set(e, {
							effect: r,
							fragment: t
						});
					} else Nn(r);
					this.#r.delete(e), this.#t.delete(e);
				};
				this.#i || !n ? (this.#r.add(e), In(r, i, !1)) : i();
			}
		}
	};
	#o = (e) => {
		this.#e.delete(e);
		let t = Array.from(this.#e.values());
		for (let [e, n] of this.#n) t.includes(e) || (Nn(n.effect), this.#n.delete(e));
	};
	ensure(e, t) {
		var n = At, r = mn();
		if (t && !this.#t.has(e) && !this.#n.has(e)) if (r) {
			var i = document.createDocumentFragment(), a = un();
			i.append(a), this.#n.set(e, {
				effect: kn(() => t(a)),
				fragment: i
			});
		} else this.#t.set(e, kn(() => t(this.anchor)));
		if (this.#e.set(n, e), r) {
			for (let [t, r] of this.#t) t === e ? n.unskip_effect(r) : n.skip_effect(r);
			for (let [t, r] of this.#n) t === e ? n.unskip_effect(r.effect) : n.skip_effect(r.effect);
			n.oncommit(this.#a), n.ondiscard(this.#o);
		} else Ae && (this.anchor = Me), this.#a(n);
	}
};
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/if.js
function W(e, t, n = !1) {
	var r;
	Ae && (r = Me, Pe());
	var i = new Rr(e), a = n ? S : 0;
	function o(e, t) {
		if (Ae) {
			var n = Le(r);
			if (e !== parseInt(n.substring(1))) {
				var a = Ie();
				Ne(a), i.anchor = a, je(!1), i.ensure(e, t), je(!0);
				return;
			}
		}
		i.ensure(e, t);
	}
	On(() => {
		var e = !1;
		t((t, n = 0) => {
			e = !0, o(n, t);
		}), e || o(-1, null);
	}, a);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/each.js
function zr(e, t) {
	return t;
}
function Br(e, t, n) {
	for (var i = [], a = t.length, o, s = t.length, c = 0; c < a; c++) {
		let n = t[c];
		In(n, () => {
			if (o) {
				if (o.pending.delete(n), o.done.add(n), o.pending.size === 0) {
					var t = e.outrogroups;
					Vr(e, r(o.done)), t.delete(o), t.size === 0 && (e.outrogroups = null);
				}
			} else --s;
		}, !1);
	}
	if (s === 0) {
		var l = i.length === 0 && n !== null;
		if (l) {
			var u = n, d = u.parentNode;
			pn(d), d.append(u), e.items.clear();
		}
		Vr(e, t, !l);
	} else o = {
		pending: new Set(t),
		done: /* @__PURE__ */ new Set()
	}, (e.outrogroups ??= /* @__PURE__ */ new Set()).add(o);
}
function Vr(e, t, n = !0) {
	var r;
	if (e.pending.size > 0) {
		r = /* @__PURE__ */ new Set();
		for (let t of e.pending.values()) for (let n of t) r.add(e.items.get(n).e);
	}
	for (var i = 0; i < t.length; i++) {
		var a = t[i];
		r?.has(a) ? (a.f |= w, Bn(a, document.createDocumentFragment())) : Nn(t[i], n);
	}
}
var Hr;
function Ur(t, n, i, a, o, s = null) {
	var c = t, l = /* @__PURE__ */ new Map();
	if (n & 4) {
		var u = t;
		c = Ae ? Ne(/* @__PURE__ */ dn(u)) : u.appendChild(un());
	}
	Ae && Pe();
	var d = null, f = /* @__PURE__ */ Ct(() => {
		var t = i();
		return e(t) ? t : t == null ? [] : r(t);
	}), p, m = /* @__PURE__ */ new Map(), h = !0;
	function g(e) {
		v.effect.f & 16384 || (v.pending.delete(e), v.fallback = d, Gr(v, p, c, n, a), d !== null && (p.length === 0 ? d.f & 33554432 ? (d.f ^= w, qr(d, null, c)) : Rn(d) : In(d, () => {
			d = null;
		})));
	}
	function _(e) {
		v.pending.delete(e);
	}
	var v = {
		effect: On(() => {
			p = z(f);
			var e = p.length;
			let t = !1;
			Ae && Le(c) === "[!" != (e === 0) && (c = Ie(), Ne(c), je(!1), t = !0);
			for (var r = /* @__PURE__ */ new Set(), u = At, v = mn(), y = 0; y < e; y += 1) {
				Ae && Me.nodeType === 8 && Me.data === "]" && (c = Me, t = !0, je(!1));
				var b = p[y], x = a(b, y), S = h ? null : l.get(x);
				S ? (S.v && $t(S.v, b), S.i && $t(S.i, y), v && u.unskip_effect(S.e)) : (S = Kr(l, h ? c : Hr ??= un(), b, x, y, o, n, i), h || (S.e.f |= w), l.set(x, S)), r.add(x);
			}
			if (e === 0 && s && !d && (h ? d = kn(() => s(c)) : (d = kn(() => s(Hr ??= un())), d.f |= w)), e > r.size && he("", "", ""), Ae && e > 0 && Ne(Ie()), !h) if (m.set(u, r), v) {
				for (let [e, t] of l) r.has(e) || u.skip_effect(t.e);
				u.oncommit(g), u.ondiscard(_);
			} else g(u);
			t && je(!0), z(f);
		}),
		flags: n,
		items: l,
		pending: m,
		outrogroups: null,
		fallback: d
	};
	h = !1, Ae && (c = Me);
}
function Wr(e) {
	for (; e !== null && !(e.f & 32);) e = e.next;
	return e;
}
function Gr(e, t, n, i, a) {
	var o = !!(i & 8), s = t.length, c = e.items, l = Wr(e.effect.first), u, d = null, f, p = [], m = [], h, g, _, v;
	if (o) for (v = 0; v < s; v += 1) h = t[v], g = a(h, v), _ = c.get(g).e, _.f & 33554432 || (_.nodes?.a?.measure(), (f ??= /* @__PURE__ */ new Set()).add(_));
	for (v = 0; v < s; v += 1) {
		if (h = t[v], g = a(h, v), _ = c.get(g).e, e.outrogroups !== null) for (let t of e.outrogroups) t.pending.delete(_), t.done.delete(_);
		if (_.f & 8192 && (Rn(_), o && (_.nodes?.a?.unfix(), (f ??= /* @__PURE__ */ new Set()).delete(_))), _.f & 33554432) if (_.f ^= w, _ === l) qr(_, null, n);
		else {
			var y = d ? d.next : l;
			_ === e.effect.last && (e.effect.last = _.prev), _.prev && (_.prev.next = _.next), _.next && (_.next.prev = _.prev), Jr(e, d, _), Jr(e, _, y), qr(_, y, n), d = _, p = [], m = [], l = Wr(d.next);
			continue;
		}
		if (_ !== l) {
			if (u !== void 0 && u.has(_)) {
				if (p.length < m.length) {
					var b = m[0], x;
					d = b.prev;
					var S = p[0], C = p[p.length - 1];
					for (x = 0; x < p.length; x += 1) qr(p[x], b, n);
					for (x = 0; x < m.length; x += 1) u.delete(m[x]);
					Jr(e, S.prev, C.next), Jr(e, d, S), Jr(e, C, b), l = b, d = C, --v, p = [], m = [];
				} else u.delete(_), qr(_, l, n), Jr(e, _.prev, _.next), Jr(e, _, d === null ? e.effect.first : d.next), Jr(e, d, _), d = _;
				continue;
			}
			for (p = [], m = []; l !== null && l !== _;) (u ??= /* @__PURE__ */ new Set()).add(l), m.push(l), l = Wr(l.next);
			if (l === null) continue;
		}
		_.f & 33554432 || p.push(_), d = _, l = Wr(_.next);
	}
	if (e.outrogroups !== null) {
		for (let t of e.outrogroups) t.pending.size === 0 && (Vr(e, r(t.done)), e.outrogroups?.delete(t));
		e.outrogroups.size === 0 && (e.outrogroups = null);
	}
	if (l !== null || u !== void 0) {
		var ee = [];
		if (u !== void 0) for (_ of u) _.f & 8192 || ee.push(_);
		for (; l !== null;) !(l.f & 8192) && l !== e.fallback && ee.push(l), l = Wr(l.next);
		var te = ee.length;
		if (te > 0) {
			var T = i & 4 && s === 0 ? n : null;
			if (o) {
				for (v = 0; v < te; v += 1) ee[v].nodes?.a?.measure();
				for (v = 0; v < te; v += 1) ee[v].nodes?.a?.fix();
			}
			Br(e, ee, T);
		}
	}
	o && Ze(() => {
		if (f !== void 0) for (_ of f) _.nodes?.a?.apply();
	});
}
function Kr(e, t, n, r, i, a, o, s) {
	var c = o & 1 ? o & 16 ? Zt(n) : /* @__PURE__ */ Qt(n, !1, !1) : null, l = o & 2 ? Zt(i) : null;
	return {
		v: c,
		i: l,
		e: kn(() => (a(t, c ?? n, l ?? i, s), () => {
			e.delete(r);
		}))
	};
}
function qr(e, t, n) {
	if (e.nodes) for (var r = e.nodes.start, i = e.nodes.end, a = t && !(t.f & 33554432) ? t.nodes.start : n; r !== null;) {
		var o = /* @__PURE__ */ fn(r);
		if (a.before(r), r === i) return;
		r = o;
	}
}
function Jr(e, t, n) {
	t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
function G(e, t, n = !1, r = !1, i = !1, a = !1) {
	var o = e, s = "";
	if (n) {
		var c = e;
		Ae && (o = Ne(/* @__PURE__ */ dn(c)));
	}
	R(() => {
		var e = Jn;
		if (s === (s = t() ?? "")) {
			Ae && Pe();
			return;
		}
		if (n && !Ae) {
			e.nodes = null, c.innerHTML = s, s !== "" && jr(/* @__PURE__ */ dn(c), c.lastChild);
			return;
		}
		if (e.nodes !== null && (Pn(e.nodes.start, e.nodes.end), e.nodes = null), s !== "") {
			if (Ae) {
				for (var a = Me.data, l = Pe(), u = l; l !== null && (l.nodeType !== 8 || l.data !== "");) u = l, l = /* @__PURE__ */ fn(l);
				if (l === null) throw Oe(), Se;
				jr(Me, u), o = Ne(l);
				return;
			}
			var d = hn(r ? "svg" : i ? "math" : "template", r ? Te : i ? Ee : void 0);
			d.innerHTML = s;
			var f = r || i ? d : d.content;
			if (jr(/* @__PURE__ */ dn(f), f.lastChild), r || i) for (; /* @__PURE__ */ dn(f);) o.before(/* @__PURE__ */ dn(f));
			else o.before(f);
		}
	});
}
//#endregion
//#region node_modules/svelte/src/internal/shared/attributes.js
var Yr = [..." 	\n\r\f\xA0\v﻿"];
function Xr(e, t, n) {
	var r = e == null ? "" : "" + e;
	if (t && (r = r ? r + " " + t : t), n) {
		for (var i of Object.keys(n)) if (n[i]) r = r ? r + " " + i : i;
		else if (r.length) for (var a = i.length, o = 0; (o = r.indexOf(i, o)) >= 0;) {
			var s = o + a;
			(o === 0 || Yr.includes(r[o - 1])) && (s === r.length || Yr.includes(r[s])) ? r = (o === 0 ? "" : r.substring(0, o)) + r.substring(s + 1) : o = s;
		}
	}
	return r === "" ? null : r;
}
function Zr(e, t = !1) {
	var n = t ? " !important;" : ";", r = "";
	for (var i of Object.keys(e)) {
		var a = e[i];
		a != null && a !== "" && (r += " " + i + ": " + a + n);
	}
	return r;
}
function Qr(e) {
	return e[0] !== "-" || e[1] !== "-" ? e.toLowerCase() : e;
}
function $r(e, t) {
	if (t) {
		var n = "", r, i;
		if (Array.isArray(t) ? (r = t[0], i = t[1]) : r = t, e) {
			e = String(e).replaceAll(/\s*\/\*.*?\*\/\s*/g, "").trim();
			var a = !1, o = 0, s = !1, c = [];
			r && c.push(...Object.keys(r).map(Qr)), i && c.push(...Object.keys(i).map(Qr));
			var l = 0, u = -1;
			let t = e.length;
			for (var d = 0; d < t; d++) {
				var f = e[d];
				if (s ? f === "/" && e[d - 1] === "*" && (s = !1) : a ? a === f && (a = !1) : f === "/" && e[d + 1] === "*" ? s = !0 : f === "\"" || f === "'" ? a = f : f === "(" ? o++ : f === ")" && o--, !s && a === !1 && o === 0) {
					if (f === ":" && u === -1) u = d;
					else if (f === ";" || d === t - 1) {
						if (u !== -1) {
							var p = Qr(e.substring(l, u).trim());
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
		return r && (n += Zr(r)), i && (n += Zr(i, !0)), n = n.trim(), n === "" ? null : n;
	}
	return e == null ? null : String(e);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/class.js
function ei(e, t, n, r, i, a) {
	var o = e[ce];
	if (Ae || o !== n || o === void 0) {
		var s = Xr(n, r, a);
		(!Ae || s !== e.getAttribute("class")) && (s == null ? e.removeAttribute("class") : t ? e.className = s : e.setAttribute("class", s)), e[ce] = n;
	} else if (a && i !== a) for (var c in a) {
		var l = !!a[c];
		(i == null || l !== !!i[c]) && e.classList.toggle(c, l);
	}
	return a;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/style.js
function ti(e, t = {}, n, r) {
	for (var i in n) {
		var a = n[i];
		t[i] !== a && (n[i] == null ? e.style.removeProperty(i) : e.style.setProperty(i, a, r));
	}
}
function ni(e, t, n, r) {
	var i = e[le];
	if (Ae || i !== t) {
		var a = $r(t, r);
		(!Ae || a !== e.getAttribute("style")) && (a == null ? e.removeAttribute("style") : e.style.cssText = a), e[le] = t;
	} else r && (Array.isArray(r) ? (ti(e, n?.[0], r[0]), ti(e, n?.[1], r[1], "important")) : ti(e, n, r));
	return r;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/attributes.js
var ri = Symbol("is custom element"), ii = Symbol("is html"), ai = pe ? "link" : "LINK", oi = pe ? "progress" : "PROGRESS";
function K(e) {
	if (Ae) {
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
		e[de] = n, Ze(n), dt();
	}
}
function q(e, t) {
	var n = ci(e);
	n.value !== (n.value = t ?? void 0) && (e.value !== t || t === 0 && e.nodeName === oi) && (e.value = t ?? "");
}
function si(e, t) {
	var n = ci(e);
	n.checked !== (n.checked = t ?? void 0) && (e.checked = t);
}
function J(e, t, n, r) {
	var i = ci(e);
	Ae && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === ai) || i[t] !== (i[t] = n) && (t === "loading" && (e[oe] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && ui(e).includes(t) ? e[t] = n : e.setAttribute(t, n));
}
function ci(e) {
	return e[se] ??= {
		[ri]: e.nodeName.includes("-"),
		[ii]: e.namespaceURI === we
	};
}
var li = /* @__PURE__ */ new Map();
function ui(e) {
	var t = e.getAttribute("is") || e.nodeName, n = li.get(t);
	if (n) return n;
	li.set(t, n = []);
	for (var r, i = e, a = Element.prototype; a !== i;) {
		for (var s in r = o(i), r) r[s].set && s !== "innerHTML" && s !== "textContent" && s !== "innerText" && n.push(s);
		i = l(i);
	}
	return n;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/input.js
function di(e, t, n = t) {
	var r = /* @__PURE__ */ new WeakSet();
	A(e, "input", async (i) => {
		var a = i ? e.defaultValue : e.value;
		if (a = fi(e) ? pi(a) : a, n(a), At !== null && r.add(At), await pr(), a !== (a = t())) {
			var o = e.selectionStart, s = e.selectionEnd, c = e.value.length;
			if (e.value = a ?? "", s !== null) {
				var l = e.value.length;
				o === s && s === c && l > c ? (e.selectionStart = l, e.selectionEnd = l) : (e.selectionStart = o, e.selectionEnd = Math.min(s, l));
			}
		}
	}), (Ae && e.defaultValue !== e.value || gr(t) == null && e.value) && (n(fi(e) ? pi(e.value) : e.value), At !== null && r.add(At)), Dn(() => {
		var n = t();
		if (e === document.activeElement) {
			var i = At;
			if (r.has(i)) return;
		}
		fi(e) && n === pi(e.value) || e.type === "date" && !n && !e.value || n !== e.value && (e.value = n ?? "");
	});
}
function fi(e) {
	var t = e.type;
	return t === "number" || t === "range";
}
function pi(e) {
	return e === "" ? null : +e;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/this.js
function mi(e, t) {
	return e === t || e?.[ie] === t;
}
function hi(e = {}, t, n, r) {
	var i = We.r, a = Jn;
	return Tn(() => {
		var o, s;
		return Dn(() => {
			o = s, s = r?.() || [], gr(() => {
				mi(n(...s), e) || (t(e, ...s), o && mi(n(...o), e) && t(null, ...o));
			});
		}), () => {
			let r = a;
			for (; r !== i && r.parent !== null && r.parent.f & 33554432;) r = r.parent;
			let o = () => {
				s && mi(n(...s), e) && t(null, ...s);
			}, c = r.teardown;
			r.teardown = () => {
				o(), c?.();
			};
		};
	}), e;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/props.js
function gi(e, t, n, r) {
	var i = !0, o = !!(n & 8), s = !!(n & 16), c = r, l = !0, u = void 0, d = () => s && i ? (u ??= /* @__PURE__ */ bt(r), z(u)) : (l && (l = !1, c = s ? gr(r) : r), c);
	let f;
	if (o) {
		var p = ie in e || ae in e;
		f = a(e, t)?.set ?? (p && t in e ? (n) => e[t] = n : void 0);
	}
	var m, h = !1;
	o ? [m, h] = st(() => e[t]) : m = e[t], m === void 0 && r !== void 0 && (m = d(), f && (i && ye(t), f(m)));
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
	var v = !1, y = (n & 1 ? bt : Ct)(() => (v = !1, g()));
	o && z(y);
	var b = Jn;
	return (function(e, t) {
		if (arguments.length > 0) {
			let n = t ? z(y) : i && o ? rn(e) : e;
			return P(y, n), v = !0, c !== void 0 && (c = n), e;
		}
		return Un && v || b.f & 16384 ? y.v : z(y);
	});
}
var _i = {
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
}, vi = [
	"nb",
	"nn",
	"en-GB",
	"se",
	"tr"
], yi = /^[a-z]{2,3}(?:-[A-Za-z0-9]{2,8})*$/, bi = {
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
function xi(e) {
	let t = String(e ?? "").trim().toLowerCase();
	for (let [e, n] of Object.entries(bi)) if (n.some((e) => t === e || t.startsWith(`${e}-`))) return e;
	return null;
}
function Si(e) {
	return vi.includes(String(e ?? ""));
}
function Ci(e) {
	let t = [];
	if (!Array.isArray(e)) return ["languages må være en liste"];
	for (let n of e) {
		if (!n || typeof n != "object" || Array.isArray(n)) {
			t.push("languages: hvert innslag må være et objekt");
			continue;
		}
		let e = String(n.code ?? "");
		yi.test(e) ? Si(e) && t.push(`languages: '${e}' er innebygd i Urd og kan ikke overstyres`) : t.push(`languages: '${e}' er ikke en gyldig språkkode`), (typeof n.name != "string" || !n.name.trim()) && t.push(`languages/${e}: name mangler (språkets eget navn)`);
		for (let r of ["site", "admin"]) n[r] !== void 0 && typeof n[r] != "boolean" && t.push(`languages/${e}: ${r} må være boolsk`);
		n.site !== !0 && n.admin !== !0 && t.push(`languages/${e}: må dekke site, admin eller begge`);
	}
	return t;
}
function wi(e) {
	let t = xi(e);
	if (t) return t;
	let n = String(e ?? "").trim();
	return yi.test(n) ? n : "nb";
}
async function Ti(e, t) {
	try {
		return await (await import(
			/* @vite-ignore */
			"/assets/urd/language-packs.js"
)).loadPackStrings(e, t);
	} catch {
		return null;
	}
}
({ ..._i.strings });
var Ei = {
	lang: "nb",
	dict: {}
};
function Di(e, t) {
	if (!t) return e;
	let n = e;
	for (let [e, r] of Object.entries(t)) n = n.replaceAll(`{${e}}`, String(r));
	return n;
}
function Y(e, t) {
	return Di(Ei.dict[e] ?? e, t);
}
function Oi(e) {
	let t = `api.${e?.code}`;
	return e?.code && Ei.dict[t] !== void 0 ? Di(Ei.dict[t], e) : e?.error ?? null;
}
function ki() {
	return Ei.lang;
}
function Ai() {
	let e = null;
	try {
		e = localStorage.getItem("urd-admin-lang");
	} catch {}
	if (e) return wi(e);
	for (let e of navigator.languages ?? [navigator.language]) {
		let t = xi(e);
		if (t) return t;
	}
	return "en-GB";
}
var ji;
new Promise((e) => {
	ji = e;
});
async function Mi(e = Ai()) {
	let t = async (e) => (await import(
		/* @vite-ignore */
		`/assets/urd/locales/admin/${e}.js`
)).default.strings;
	Ei.lang = wi(e);
	let n = Si(Ei.lang);
	try {
		Object.assign(Ei.dict, await t("nb")), n && Ei.lang !== "nb" && Object.assign(Ei.dict, await t(Ei.lang));
	} catch {}
	if (!n) {
		let e = await Ti(Ei.lang, "admin");
		e ? Object.assign(Ei.dict, e) : Ei.lang = "nb";
	}
	return ji(Ei.lang), Ei.lang;
}
//#endregion
//#region node_modules/svelte/src/internal/disclose-version.js
typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add("5");
//#endregion
//#region src/lib/draftStore.js
function Ni(e, t, n) {
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
var Pi = /* @__PURE__ */ V("<button type=\"button\" class=\"cp-clear svelte-zxiloo\">×</button>"), Fi = /* @__PURE__ */ V("<button type=\"button\" class=\"cp-eye svelte-zxiloo\"><svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M18 2l4 4-3 3-4-4 3-3z\"></path><path d=\"M15 5L4 16l-1 5 5-1L19 9\"></path></svg></button>"), Ii = /* @__PURE__ */ V("<input type=\"number\" min=\"0\" max=\"255\" class=\"svelte-zxiloo\"/>"), Li = /* @__PURE__ */ V("<button type=\"button\"></button>"), Ri = /* @__PURE__ */ V("<span class=\"cp-label svelte-zxiloo\"> <!></span> <span class=\"cp-tokens svelte-zxiloo\"></span>", 1), zi = /* @__PURE__ */ V("<span class=\"cp-saved svelte-zxiloo\"><button type=\"button\" class=\"cp-token svelte-zxiloo\"></button> <button type=\"button\" class=\"cp-del svelte-zxiloo\">×</button></span>"), Bi = /* @__PURE__ */ V("<span class=\"cp-tokens svelte-zxiloo\"></span>"), Vi = /* @__PURE__ */ V("<button type=\"button\" class=\"cp-token svelte-zxiloo\"></button>"), Hi = /* @__PURE__ */ V("<span class=\"cp-label svelte-zxiloo\"> </span> <span class=\"cp-tokens svelte-zxiloo\"></span>", 1), Ui = /* @__PURE__ */ V("<div class=\"cp-pop svelte-zxiloo\"><div class=\"cp-sv svelte-zxiloo\"><span class=\"cp-cursor svelte-zxiloo\"></span></div> <input class=\"cp-hue svelte-zxiloo\" type=\"range\" min=\"0\" max=\"360\" step=\"1\"/> <input class=\"cp-alpha svelte-zxiloo\" type=\"range\" min=\"0\" max=\"100\" step=\"1\"/> <span class=\"cp-row svelte-zxiloo\"><span class=\"cp-preview svelte-zxiloo\"></span> <input class=\"cp-hex svelte-zxiloo\" spellcheck=\"false\"/> <!></span> <span class=\"cp-row cp-rgb svelte-zxiloo\"></span> <!> <span class=\"cp-label cp-label-row svelte-zxiloo\"> <button type=\"button\" class=\"cp-add svelte-zxiloo\">+</button></span> <!> <!></div>"), Wi = /* @__PURE__ */ V("<span class=\"cp svelte-zxiloo\"><button type=\"button\"></button> <!> <!></span>");
function Gi(e, t) {
	Ke(t, !0);
	let n = gi(t, "value", 3, "#000000"), r = gi(t, "tokens", 19, () => []), i = gi(t, "label", 19, () => Y("cp.pickColor")), a = gi(t, "allowClear", 3, !1), o = "urd-recent-colors", s = "urd-saved-colors", c = () => {
		let e = r().find(([e]) => e === n());
		return e ? e[1] : n();
	}, l = () => r().find(([e]) => e === n())?.[0] ?? null, u = /* @__PURE__ */ N(rn([])), d = /* @__PURE__ */ N(rn([])), f = "", p = "", h = /* @__PURE__ */ N(null), g = /* @__PURE__ */ N(!1), _ = /* @__PURE__ */ N(rn({
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
	function w(e, t, n) {
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
	function T() {
		return ee(...te(z(v), z(y), z(b)));
	}
	function ne() {
		let e = T();
		return z(x) >= .995 ? e : e + Math.round(z(x) * 255).toString(16).padStart(2, "0");
	}
	function re() {
		P(S, ne(), !0), p = z(S), t.onchange?.(z(S));
	}
	function ie(e) {
		let t = C(e);
		return t ? (((e) => {
			var t = m(e, 3);
			P(v, t[0], !0), P(y, t[1], !0), P(b, t[2], !0);
		})(w(t[0], t[1], t[2])), P(x, t[3], !0), P(S, ne(), !0), !0) : !1;
	}
	function ae() {
		ie(c()) || ie("#000000"), f = n(), p = "";
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
		let e = z(h).getBoundingClientRect(), t = z(h).closest(".panel-body")?.getBoundingClientRect(), r = t ? t.right : window.innerWidth, i = Math.max(8, Math.min(e.right - 236, r - 236 - 8)), a = e.bottom + 380 + 8 > window.innerHeight ? Math.max(8, e.top - 380 - 8) : e.bottom + 6;
		P(_, {
			top: a,
			left: i
		}, !0), P(g, !0);
	}
	function oe() {
		if (P(g, !1), p && p !== f) {
			let e = [p, ...z(u).filter((e) => e !== p)].slice(0, 8);
			localStorage.setItem(o, JSON.stringify(e));
		}
	}
	function se(e, n) {
		ie(n), P(S, n, !0), t.onchange?.(e);
	}
	function ce(e) {
		let t = e.currentTarget;
		t.setPointerCapture(e.pointerId);
		let n = (e) => {
			let n = t.getBoundingClientRect();
			P(y, Math.min(1, Math.max(0, (e.clientX - n.left) / n.width)), !0), P(b, 1 - Math.min(1, Math.max(0, (e.clientY - n.top) / n.height))), re();
		};
		n(e);
		let r = (e) => n(e), i = () => {
			t.removeEventListener("pointermove", r), t.removeEventListener("pointerup", i);
		};
		t.addEventListener("pointermove", r), t.addEventListener("pointerup", i);
	}
	function le(e) {
		ie(e.target.value) ? re() : P(S, T(), !0);
	}
	function ue(e) {
		return (C(T()) ?? [
			0,
			0,
			0
		])[e];
	}
	function de(e, t) {
		let n = C(T()) ?? [
			0,
			0,
			0
		];
		n[e] = Math.min(255, Math.max(0, Number(t) || 0)), ((e) => {
			var t = m(e, 3);
			P(v, t[0], !0), P(y, t[1], !0), P(b, t[2], !0);
		})(w(...n)), re();
	}
	let fe = typeof window < "u" && "EyeDropper" in window;
	async function pe() {
		try {
			ie((await new window.EyeDropper().open()).sRGBHex) && re();
		} catch {}
	}
	function me(e) {
		ie(e) && re();
	}
	function he() {
		let e = ne();
		z(d).includes(e) || (P(d, [e, ...z(d)].slice(0, 12), !0), localStorage.setItem(s, JSON.stringify(He(z(d)))));
	}
	function ge(e) {
		P(d, z(d).filter((t) => t !== e), !0), localStorage.setItem(s, JSON.stringify(He(z(d))));
	}
	Sn(() => {
		if (!z(g)) return;
		let e = (e) => {
			z(h) && !z(h).contains(e.target) && oe();
		}, t = (e) => {
			e.key === "Escape" && oe();
		}, n = () => oe();
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t, !0), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t, !0), window.removeEventListener("blur", n);
		};
	});
	var _e = Wi(), ve = F(_e);
	let E;
	var ye = L(ve, 2), D = (e) => {
		var n = Pi();
		R((e, t) => {
			J(n, "title", e), J(n, "aria-label", t);
		}, [() => Y("cp.clearTitle"), () => Y("cp.clear")]), B("click", n, () => t.onchange?.("")), H(e, n);
	};
	W(ye, (e) => {
		a() && n() && e(D);
	});
	var O = L(ye, 2), be = (e) => {
		var t = Ui(), i = F(t), a = F(i);
		k(i);
		var o = L(i, 2);
		K(o);
		var s = L(o, 2);
		K(s);
		var c = L(s, 2), f = F(c), p = L(f, 2);
		K(p);
		var h = L(p, 2), g = (e) => {
			var t = Fi();
			R((e) => J(t, "title", e), [() => Y("cp.eyedropper")]), B("click", t, pe), H(e, t);
		};
		W(h, (e) => {
			fe && e(g);
		}), k(c);
		var C = L(c, 2);
		Ur(C, 22, () => [
			"R",
			"G",
			"B"
		], (e) => e, (e, t, n) => {
			var r = Ii();
			K(r), R((e) => {
				J(r, "title", t), q(r, e);
			}, [() => ue(z(n))]), B("change", r, (e) => de(z(n), e.target.value)), H(e, r);
		}), k(C);
		var ee = L(C, 2), w = (e) => {
			var t = Ri(), i = I(t), a = F(i, !0), o = L(a), s = (e) => {
				var t = Mr();
				R((e) => U(t, e), [() => Y("cp.linkedSuffix", { token: l() })]), H(e, t);
			}, c = /* @__PURE__ */ M(() => l());
			W(o, (e) => {
				z(c) && e(s);
			}), k(i);
			var u = L(i, 2);
			Ur(u, 21, r, ([e, t]) => e, (e, t) => {
				var r = /* @__PURE__ */ M(() => m(z(t), 2));
				let i = () => z(r)[0], a = () => z(r)[1];
				var o = Li();
				let s;
				R((e) => {
					s = ei(o, 1, "cp-token svelte-zxiloo", null, s, { active: n() === i() }), ni(o, `background: ${a() ?? ""}`), J(o, "title", e);
				}, [() => Y("cp.tokenTitle", { name: i() })]), B("click", o, () => se(i(), a())), H(e, o);
			}), k(u), R((e) => U(a, e), [() => Y("cp.themeColors")]), H(e, t);
		};
		W(ee, (e) => {
			r().length && e(w);
		});
		var te = L(ee, 2), ne = F(te), ie = L(ne);
		k(te);
		var ae = L(te, 2), oe = (e) => {
			var t = Bi();
			Ur(t, 20, () => z(d), (e) => e, (e, t) => {
				var n = zi(), r = F(n), i = L(r, 2);
				k(n), R((e) => {
					ni(r, `background: ${t ?? ""}`), J(r, "title", t), J(i, "title", e);
				}, [() => Y("cp.removeSaved")]), B("click", r, () => me(t)), B("click", i, () => ge(t)), H(e, n);
			}), k(t), H(e, t);
		};
		W(ae, (e) => {
			z(d).length && e(oe);
		});
		var _e = L(ae, 2), ve = (e) => {
			var t = Hi(), n = I(t), r = F(n, !0);
			k(n);
			var i = L(n, 2);
			Ur(i, 20, () => z(u), (e) => e, (e, t) => {
				var n = Vi();
				R(() => {
					ni(n, `background: ${t ?? ""}`), J(n, "title", t);
				}), B("click", n, () => me(t)), H(e, n);
			}), k(i), R((e) => U(r, e), [() => Y("common.recent")]), H(e, t);
		};
		W(_e, (e) => {
			z(u).length && e(ve);
		}), k(t), R((e, n, r, c, l) => {
			ni(t, `top: ${z(_).top ?? ""}px; left: ${z(_).left ?? ""}px`), ni(i, `background-image: linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent); background-color: hsl(${z(v) ?? ""}, 100%, 50%)`), ni(a, `left: ${z(y) * 100}%; top: ${(1 - z(b)) * 100}%`), q(o, z(v)), q(s, e), J(s, "title", n), ni(s, `background: linear-gradient(to right, transparent, ${r ?? ""}), repeating-conic-gradient(rgb(255 255 255 / 35%) 0 25%, rgb(0 0 0 / 35%) 0 50%) 0 0 / 10px 10px`), ni(f, `background: ${z(S) ?? ""}`), q(p, z(S)), U(ne, `${c ?? ""} `), J(ie, "title", l);
		}, [
			() => Math.round(z(x) * 100),
			() => Y("cp.alpha"),
			() => T(),
			() => Y("cp.saved"),
			() => Y("cp.saveTitle")
		]), B("click", t, (e) => e.preventDefault()), B("pointerdown", i, ce), B("input", o, (e) => {
			P(v, Number(e.target.value), !0), re();
		}), B("input", s, (e) => {
			P(x, Number(e.target.value) / 100), re();
		}), B("change", p, le), B("click", ie, he), H(e, t);
	};
	W(O, (e) => {
		z(g) && e(be);
	}), k(_e), hi(_e, (e) => P(h, e), () => z(h)), R((e, t, n) => {
		E = ei(ve, 1, "cp-swatch svelte-zxiloo", null, E, e), ni(ve, `background: ${t ?? ""}`), J(ve, "title", n), J(ve, "aria-label", i());
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
	]), B("click", ve, () => z(g) ? oe() : ae()), H(e, _e), qe();
}
Tr([
	"click",
	"pointerdown",
	"input",
	"change"
]);
//#endregion
//#region ../template/assets/engine/0.6.10/imageTools.js
var Ki = 1600, qi = .82, Ji = .6;
async function Yi(e, t = Ki) {
	if (Zi(e)) return Qi(await e.text());
	let n = await createImageBitmap(e), r = Math.min(1, t / Math.max(n.width, n.height)), i = Math.round(n.width * r), a = Math.round(n.height * r), o = document.createElement("canvas");
	o.width = i, o.height = a, o.getContext("2d").drawImage(n, 0, 0, i, a), n.close();
	let s = (e) => new Promise((t) => o.toBlob(t, "image/webp", e)), c = await s(qi);
	return c.size > 4e5 && (c = await s(Ji)), {
		dataUrl: await new Promise((e) => {
			let t = new FileReader();
			t.onload = () => e(t.result), t.readAsDataURL(c);
		}),
		bytes: c.size,
		width: i,
		height: a
	};
}
var Xi = "image/svg+xml";
function Zi(e) {
	return e.type === Xi || /\.svg$/i.test(e.name || "");
}
function Qi(e) {
	let t = String(e ?? "");
	if (!/<svg[\s>]/i.test(t)) throw Error("Ugyldig SVG");
	if (/<\s*script[\s>]/i.test(t) || /<\s*foreignObject[\s>]/i.test(t) || /\son[a-z]+\s*=/i.test(t) || /javascript:/i.test(t)) throw Error("SVG-en inneholder skript eller hendelser og kan ikke brukes");
	let n = new Blob([t]).size, r = `data:${Xi};base64,${btoa(unescape(encodeURIComponent(t)))}`, i = t.match(/<svg\b[^>]*>/i)?.[0] ?? "", a = i.match(/viewBox\s*=\s*["']\s*([-\d.]+(?:[\s,]+[-\d.]+){3})\s*["']/i)?.[1]?.split(/[\s,]+/).map(Number);
	return {
		dataUrl: r,
		bytes: n,
		width: a?.length === 4 ? a[2] : Number.parseFloat(i.match(/\bwidth\s*=\s*["']?([\d.]+)/i)?.[1]) || 0,
		height: a?.length === 4 ? a[3] : Number.parseFloat(i.match(/\bheight\s*=\s*["']?([\d.]+)/i)?.[1]) || 0
	};
}
function $i(e, t, n = .04) {
	let r = String(e ?? "");
	if (!t || !(t.width > 0) || !(t.height > 0)) return r;
	let i = r.match(/<svg\b[^>]*>/i)?.[0];
	if (!i) return r;
	let a = (e) => Math.round(e * 1e3) / 1e3, o = Math.max(t.width, t.height) * Math.max(0, n), s = a(t.x - o), c = a(t.y - o), l = a(t.width + 2 * o), u = a(t.height + 2 * o), d = i.replace(/\sviewBox\s*=\s*["'][^"']*["']/i, "").replace(/\swidth\s*=\s*["'][^"']*["']/i, "").replace(/\sheight\s*=\s*["'][^"']*["']/i, "").replace(/<svg\b/i, `<svg viewBox="${s} ${c} ${l} ${u}" width="${l}" height="${u}"`);
	return r.replace(i, d);
}
function ea(e) {
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
function ta(e) {
	return /^data:image\/svg\+xml[;,]/.test(e || "") ? "svg" : "webp";
}
function na(e, t = "bilde") {
	return e.replace(/\.[^.]+$/, "").toLowerCase().replaceAll("æ", "ae").replaceAll("ø", "o").replaceAll("å", "a").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) || t;
}
function ra(e) {
	let t = 5381;
	for (let n = 0; n < e.length; n++) t = (t << 5) + t + e.charCodeAt(n) >>> 0;
	return t.toString(16).padStart(8, "0");
}
//#endregion
//#region ../template/assets/engine/0.6.10/glyphs.js
var ia = "urd-recent-glyphs", aa = [
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
function oa(e, t) {
	return [t, ...(Array.isArray(e) ? e : []).filter((e) => e !== t)].slice(0, 16);
}
function sa() {
	try {
		let e = JSON.parse(localStorage.getItem("urd-recent-glyphs") ?? "[]");
		return Array.isArray(e) ? e : [];
	} catch {
		return [];
	}
}
function ca(e) {
	let t = oa(sa(), e);
	try {
		localStorage.setItem(ia, JSON.stringify(t));
	} catch {}
	return t;
}
//#endregion
//#region ../template/assets/engine/0.6.10/icons.js
var la = "fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"", ua = "fill=\"currentColor\" stroke=\"none\"", da = {
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
}, fa = [
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
function pa(e) {
	let t = typeof e == "string" ? da[e] : null;
	return t ? `<svg viewBox="0 0 24 24" width="100%" height="100%" ${t.fill ? ua : la} aria-hidden="true" focusable="false">${t.body}</svg>` : null;
}
//#endregion
//#region src/lib/GlyphPicker.svelte
var ma = /* @__PURE__ */ V("<img class=\"gp-own svelte-15ln1c3\"/>"), ha = /* @__PURE__ */ V("<span class=\"gp-svg svelte-15ln1c3\"></span>"), ga = /* @__PURE__ */ V("<button type=\"button\" class=\"gp-cell svelte-15ln1c3\"> </button>"), _a = /* @__PURE__ */ V("<div class=\"gp-group svelte-15ln1c3\"> </div> <div class=\"gp-grid svelte-15ln1c3\"></div>", 1), va = /* @__PURE__ */ V("<button type=\"button\"><span class=\"gp-svg svelte-15ln1c3\"></span></button>"), ya = /* @__PURE__ */ V("<button type=\"button\"> </button>"), ba = /* @__PURE__ */ V("<div class=\"gp-group svelte-15ln1c3\"> </div> <button type=\"button\" class=\"ghost gp-upload svelte-15ln1c3\"> </button> <input type=\"file\" accept=\"image/*\" hidden=\"\"/> <p class=\"gp-hint svelte-15ln1c3\"> </p>", 1), xa = /* @__PURE__ */ V("<div class=\"gp-pop svelte-15ln1c3\"><!> <!> <!> <!></div>"), Sa = /* @__PURE__ */ V("<span class=\"gp svelte-15ln1c3\"><button type=\"button\" class=\"gp-swatch svelte-15ln1c3\"><!></button> <!></span>");
function Ca(e, t) {
	Ke(t, !0);
	let n = gi(t, "value", 3, "★"), r = gi(t, "icon", 3, null), i = gi(t, "image", 3, null), a = gi(t, "label", 19, () => Y("gp.pickGlyph")), o = /* @__PURE__ */ N(rn([])), s = /* @__PURE__ */ N(null), c = /* @__PURE__ */ N(null), l = /* @__PURE__ */ N(!1), u = /* @__PURE__ */ N(rn({
		top: 0,
		left: 0
	}));
	function d() {
		P(o, sa(), !0);
		let e = z(s).getBoundingClientRect(), t = Math.max(8, Math.min(e.right - 292, window.innerWidth - 292 - 8)), n = e.bottom + 380 + 8 > window.innerHeight ? Math.max(8, e.top - 380 - 8) : e.bottom + 6;
		P(u, {
			top: n,
			left: t
		}, !0), P(l, !0);
	}
	function f(e) {
		ca(e), t.onpick?.(e), P(l, !1);
	}
	function p(e) {
		t.onicon?.(e), P(l, !1);
	}
	async function h(e) {
		let n = e.target.files?.[0];
		if (e.target.value = "", !n) return;
		let r = await Yi(n, 256);
		t.onimage?.(r.dataUrl), P(l, !1);
	}
	Sn(() => {
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
	var g = Sa(), _ = F(g), v = F(_), y = (e) => {
		var t = ma();
		R((e) => {
			J(t, "src", i()), J(t, "alt", e);
		}, [() => Y("gp.ownIcon")]), H(e, t);
	}, b = (e) => {
		var t = ha();
		G(t, () => pa(r()), !0), k(t), H(e, t);
	}, x = (e) => {
		var t = Mr();
		R(() => U(t, n() || "★")), H(e, t);
	};
	W(v, (e) => {
		i() ? e(y) : r() && da[r()] ? e(b, 1) : e(x, -1);
	}), k(_);
	var S = L(_, 2), C = (e) => {
		var i = xa(), a = F(i), s = (e) => {
			var t = _a(), n = I(t), r = F(n, !0);
			k(n);
			var i = L(n, 2);
			Ur(i, 20, () => z(o), (e) => e, (e, t) => {
				var n = ga(), r = F(n, !0);
				k(n), R(() => U(r, t)), B("click", n, () => f(t)), H(e, n);
			}), k(i), R((e) => U(r, e), [() => Y("common.recent")]), H(e, t);
		};
		W(a, (e) => {
			z(o).length && e(s);
		});
		var l = L(a, 2), d = (e) => {
			var t = Nr();
			Ur(I(t), 17, () => fa, ([e, t]) => e, (e, t) => {
				var n = /* @__PURE__ */ M(() => m(z(t), 2));
				let i = () => z(n)[0], a = () => z(n)[1];
				var o = _a(), s = I(o), c = F(s, !0);
				k(s);
				var l = L(s, 2);
				Ur(l, 20, a, (e) => e, (e, t) => {
					var n = va();
					let i;
					var a = F(n);
					G(a, () => pa(t), !0), k(a), k(n), R(() => {
						i = ei(n, 1, "gp-cell gp-cell-icon svelte-15ln1c3", null, i, { active: t === r() }), J(n, "title", da[t].label);
					}), B("click", n, () => p(t)), H(e, n);
				}), k(l), R((e) => U(c, e), [() => Y(i())]), H(e, o);
			}), H(e, t);
		};
		W(l, (e) => {
			t.onicon && e(d);
		});
		var g = L(l, 2);
		Ur(g, 17, () => aa, ([e, t]) => e, (e, t) => {
			var r = /* @__PURE__ */ M(() => m(z(t), 2));
			let i = () => z(r)[0], a = () => z(r)[1];
			var o = _a(), s = I(o), c = F(s, !0);
			k(s);
			var l = L(s, 2);
			Ur(l, 20, () => a().split(" "), (e) => e, (e, t) => {
				var r = ya();
				let i;
				var a = F(r, !0);
				k(r), R(() => {
					i = ei(r, 1, "gp-cell svelte-15ln1c3", null, i, { active: t === n() }), U(a, t);
				}), B("click", r, () => f(t)), H(e, r);
			}), k(l), R((e) => U(c, e), [() => Y(i())]), H(e, o);
		});
		var _ = L(g, 2), v = (e) => {
			var t = ba(), n = I(t), r = F(n, !0);
			k(n);
			var i = L(n, 2), a = F(i, !0);
			k(i);
			var o = L(i, 2);
			hi(o, (e) => P(c, e), () => z(c));
			var s = L(o, 2), l = F(s, !0);
			k(s), R((e, t, n) => {
				U(r, e), U(a, t), U(l, n);
			}, [
				() => Y("gp.ownIcon"),
				() => Y("gp.upload"),
				() => Y("gp.uploadHint")
			]), B("click", i, () => z(c).click()), B("change", o, h), H(e, t);
		};
		W(_, (e) => {
			t.onimage && e(v);
		}), k(i), R(() => ni(i, `top: ${z(u).top ?? ""}px; left: ${z(u).left ?? ""}px`)), H(e, i);
	};
	W(S, (e) => {
		z(l) && e(C);
	}), k(g), hi(g, (e) => P(s, e), () => z(s)), R(() => {
		J(_, "title", a()), J(_, "aria-label", a());
	}), B("click", _, () => z(l) ? P(l, !1) : d()), H(e, g), qe();
}
Tr(["click", "change"]);
//#endregion
//#region src/lib/previewBridge.js
function wa(e, t = {}) {
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
function Ta(e, t) {
	return !(e > 0) || !(t > 0) ? 1 : e / t;
}
function Ea(e, t, n) {
	let r = n === "full" ? 1 : Math.min(1, Ta(e, t));
	return Math.max(.1, r);
}
//#endregion
//#region src/lib/Dropdown.svelte
var Da = /* @__PURE__ */ V("<button type=\"button\"> </button>"), Oa = /* @__PURE__ */ V("<div class=\"dd-pop svelte-vtocc6\"></div>"), ka = /* @__PURE__ */ V("<span class=\"dd svelte-vtocc6\"><button type=\"button\" class=\"dd-btn svelte-vtocc6\"><span class=\"dd-value svelte-vtocc6\"> </span> <span class=\"dd-caret svelte-vtocc6\"> </span></button> <!></span>");
function X(e, t) {
	Ke(t, !0);
	let n = gi(t, "value", 3, null), r = gi(t, "options", 19, () => []), i = gi(t, "title", 3, null), a = gi(t, "disabled", 3, !1), o = /* @__PURE__ */ N(!1), s = /* @__PURE__ */ N(null), c = /* @__PURE__ */ N(rn({
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
	Sn(() => {
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
	var p = ka(), h = F(p), g = F(h), _ = F(g, !0);
	k(g);
	var v = L(g, 2), y = F(v, !0);
	k(v), k(h);
	var b = L(h, 2), x = (e) => {
		var t = Oa();
		Ur(t, 21, r, ([e, t]) => `${e ?? ""}`, (e, t) => {
			var r = /* @__PURE__ */ M(() => m(z(t), 2));
			let i = () => z(r)[0], a = () => z(r)[1];
			var o = Da();
			let s;
			var c = F(o, !0);
			k(o), R(() => {
				s = ei(o, 1, "dd-opt svelte-vtocc6", null, s, { valgt: `${i() ?? ""}` == `${n() ?? ""}` }), U(c, a());
			}), B("click", o, () => f(i())), H(e, o);
		}), k(t), R(() => ni(t, `top: ${z(c).top ?? ""}px; left: ${z(c).left ?? ""}px; min-width: ${z(c).width ?? ""}px`)), H(e, t);
	};
	W(b, (e) => {
		z(o) && e(x);
	}), k(p), hi(p, (e) => P(s, e), () => z(s)), R((e) => {
		J(h, "title", i()), h.disabled = a(), U(_, e), U(y, z(o) ? "▴" : "▾");
	}, [() => l()]), B("click", h, d), H(e, p), qe();
}
Tr(["click"]);
//#endregion
//#region src/lib/IconEditor.svelte
var Aa = /* @__PURE__ */ V("<div class=\"ie-overlay svelte-e7sog7\" role=\"dialog\" aria-modal=\"true\"><div class=\"ie-card svelte-e7sog7\"><h2 class=\"svelte-e7sog7\"> </h2> <div class=\"ie-stage svelte-e7sog7\"><canvas class=\"ie-canvas svelte-e7sog7\"></canvas> <p class=\"ie-hint svelte-e7sog7\"> </p></div> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"1\" max=\"3\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0.3\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0.3\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <span class=\"ie-tools svelte-e7sog7\"><button type=\"button\" class=\"ghost svelte-e7sog7\"> </button> <button type=\"button\" class=\"ghost svelte-e7sog7\"> </button></span> <span class=\"ie-actions svelte-e7sog7\"><button type=\"button\" class=\"ghost svelte-e7sog7\"> </button> <button type=\"button\" class=\"primary svelte-e7sog7\"> </button></span></div></div>");
function ja(e, t) {
	Ke(t, !0);
	let n = gi(t, "image", 3, ""), r = /* @__PURE__ */ N(null), i = /* @__PURE__ */ N(null), a = /* @__PURE__ */ N(1), o = /* @__PURE__ */ N(.5), s = /* @__PURE__ */ N(.5), c = /* @__PURE__ */ N(1), l = /* @__PURE__ */ N(1), u = /* @__PURE__ */ N(1);
	Sn(() => {
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
	Sn(() => {
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
	var h = Aa(), g = F(h), _ = F(g), v = F(_, !0);
	k(_);
	var y = L(_, 2), b = F(y);
	J(b, "width", 220), J(b, "height", 220), hi(b, (e) => P(r, e), () => z(r));
	var x = L(b, 2), S = F(x, !0);
	k(x), k(y);
	var C = L(y, 2), ee = F(C), w = L(ee), te = F(w);
	k(w), k(C);
	var T = L(C, 2);
	K(T);
	var ne = L(T, 2), re = F(ne), ie = L(re), ae = F(ie);
	k(ie), k(ne);
	var oe = L(ne, 2);
	K(oe);
	var se = L(oe, 2), ce = F(se), le = L(ce), ue = F(le);
	k(le), k(se);
	var de = L(se, 2);
	K(de);
	var fe = L(de, 2), pe = F(fe), me = L(pe), he = F(me);
	k(me), k(fe);
	var ge = L(fe, 2);
	K(ge);
	var _e = L(ge, 2), ve = F(_e), E = F(ve, !0);
	k(ve);
	var ye = L(ve, 2), D = F(ye, !0);
	k(ye), k(_e);
	var O = L(_e, 2), be = F(O), xe = F(be, !0);
	k(be);
	var Se = L(be, 2), Ce = F(Se, !0);
	k(Se), k(O), k(g), k(h), R((e, t, n, r, i, a, o, s, c, l, u, d, f, p, m) => {
		U(v, e), J(b, "title", t), U(S, n), U(ee, `${r ?? ""} `), U(te, `${i ?? ""}x`), U(re, `${a ?? ""} `), U(ae, `${o ?? ""}%`), U(ce, `${s ?? ""} `), U(ue, `${c ?? ""}%`), U(pe, `${l ?? ""} `), U(he, `${u ?? ""}%`), U(E, d), U(D, f), U(xe, p), U(Ce, m);
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
	]), B("pointerdown", b, f), di(T, () => z(a), (e) => P(a, e)), di(oe, () => z(c), (e) => P(c, e)), di(de, () => z(l), (e) => P(l, e)), di(ge, () => z(u), (e) => P(u, e)), B("click", ve, () => P(u, 0)), B("click", ye, p), B("click", be, () => t.oncancel?.()), B("click", Se, m), H(e, h), qe();
}
Tr(["pointerdown", "click"]);
var Ma = {}, Na = {};
function Pa(e) {
	let t = structuredClone(e), n = t.schemaVersion ?? 1;
	for (; n < 1;) {
		let r = Na[n];
		if (typeof r != "function") return e;
		t = r(t) ?? t, n++, t.schemaVersion = n;
	}
	return t;
}
function Fa(e, t) {
	let n = structuredClone(e), r = n.schemaVersion ?? 1;
	for (; r < 1;) {
		let i = Ma[r];
		if (typeof i != "function") return e;
		n = i(n, t) ?? n, r++, n.schemaVersion = r;
	}
	return n;
}
//#endregion
//#region ../template/assets/engine/0.6.10/plugins.js
function Ia(e) {
	let t = /^(\d+)\.(\d+)\.(\d+)$/.exec(String(e).trim());
	return t ? [
		Number(t[1]),
		Number(t[2]),
		Number(t[3])
	] : null;
}
var La = (e, t) => e[0] - t[0] || e[1] - t[1] || e[2] - t[2];
function Ra(e, t) {
	let n = Ia(e);
	if (!n || typeof t != "string" || !t.trim()) return !1;
	for (let e of t.trim().split(/\s+/)) {
		let t = /^(>=|<=|>|<|=|\^|~)?(\d+\.\d+\.\d+)$/.exec(e);
		if (!t) return !1;
		let r = t[1] ?? "=", i = Ia(t[2]), a = La(n, i);
		if (!(r === ">=" ? a >= 0 : r === ">" ? a > 0 : r === "<=" ? a <= 0 : r === "<" ? a < 0 : r === "^" ? i[0] === 0 ? n[0] === 0 && n[1] === i[1] && a >= 0 : n[0] === i[0] && a >= 0 : r === "~" ? n[0] === i[0] && n[1] === i[1] && a >= 0 : a === 0)) return !1;
	}
	return !0;
}
var za = /^[a-z0-9][a-z0-9-]*$/;
function Ba(e) {
	let t = [];
	if (!e || typeof e != "object") return ["manifestet er ikke et objekt"];
	za.test(e.id ?? "") || t.push("id mangler eller er ugyldig"), (typeof e.name != "string" || !e.name) && t.push("name mangler"), Ia(e.version ?? "") || t.push("version er ikke semver"), (typeof e.requiresEngine != "string" || !e.requiresEngine) && t.push("requiresEngine mangler");
	let n = Array.isArray(e.languages) && e.languages.length > 0;
	return (e.entry !== void 0 || !n) && (typeof e.entry != "string" || !e.entry.endsWith(".js")) && t.push("entry mangler eller er ikke en .js-fil"), (e.provides !== void 0 || !n) && (!e.provides || typeof e.provides != "object") && t.push("provides mangler"), e.languages !== void 0 && t.push(...Ci(e.languages)), e.locales !== void 0 && typeof e.locales != "boolean" && t.push("locales må være boolsk"), e.names !== void 0 && (typeof e.names != "object" || e.names === null || Array.isArray(e.names) || Object.values(e.names).some((e) => typeof e != "string" || !e)) && t.push("names må være et objekt med språkkode til navn"), t;
}
//#endregion
//#region ../template/assets/engine/0.6.10/sections/presets.js
function Va(e) {
	return typeof crypto < "u" && crypto.randomUUID ? `${e}-${crypto.randomUUID().slice(0, 8)}` : `${e}-${[...crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(4))].map((e) => e.toString(16).padStart(2, "0")).join("")}`;
}
var Ha = () => ({ mobile: {
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
	id: Va("blk"),
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
}), Ua = (e, t = {}) => ({
	id: Va("blk"),
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
}), Wa = (e, t, n = {}) => ({
	id: Va("blk"),
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
}), Ga = (e, t, n = 40) => ({
	id: Va("blk"),
	type: "icon",
	version: 1,
	props: {
		glyph: t,
		color: "accent",
		size: n
	},
	animation: null,
	frames: e
}), Ka = () => ({
	type: "hover-lift",
	version: 1,
	props: {}
}), qa = (e, t, n = {}) => ({
	id: Va("blk"),
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
}), Ja = (e, t = {}) => ({
	id: Va("blk"),
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
}), Ya = (e, t) => ({
	id: Va("blk"),
	type: "faq",
	version: 1,
	props: {
		items: t,
		multi: !1
	},
	animation: null,
	frames: e
}), Xa = (e, t = {}) => ({
	id: Va("blk"),
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
}), Za = (e, t) => ({
	id: Va("blk"),
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
}), Qa = (e, t = {}) => ({
	id: Va("blk"),
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
}), $a = (...e) => ({
	version: 1,
	layers: e
}), eo = (e) => ({
	type: "color",
	version: 1,
	props: { value: e }
}), to = (e, t, n, r = .5) => ({
	type: "glow",
	version: 1,
	props: {
		x: e,
		y: t,
		color: "accent",
		radius: r,
		opacity: n
	}
}), no = (e) => Math.max(0, ...e.blocks.map((e) => e.frames.desktop.y + e.frames.desktop.h)), ro = (e, t, n, r, i, a) => ({
	x: n + e % t * r,
	y: i + Math.floor(e / t) * a
}), io = (e, t, n, r, i, a, o, s, c = 0) => {
	let l = (t) => e.blocks.some((e) => {
		let n = e.frames.desktop;
		return n.x < t.x + t.w - .01 && t.x < n.x + n.w - .01 && n.y < t.y + t.h - .01 && t.y < n.y + n.h - .01;
	});
	for (let e = 0; e < 60; e++) {
		let u = ro(e, t, n, r, i, a);
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
		y: no(e) + 16,
		n: 0
	};
}, $ = (e, t, n) => e + t * .1 + n * .01, ao = (e, t, n, r, i = null) => ({
	id: Va("sec"),
	version: 1,
	preset: e,
	size: { minHeight: t },
	grid: i,
	background: n,
	blocks: r,
	responsive: Ha()
});
function oo(e) {
	e.sections.define("tom", {
		label: "Tom seksjon",
		labelKey: "preset.tom.label",
		group: "Grunnleggende",
		groupKey: "presetGroup.basic",
		hint: "Blankt lerret å bygge fritt på",
		hintKey: "preset.tom.hint",
		create: () => ao("tom", "40vh", $a(eo("bg")), [])
	}), e.sections.define("hero", {
		label: "Hero",
		labelKey: "preset.hero.label",
		group: "Grunnleggende",
		groupKey: "presetGroup.basic",
		hint: "Stor åpning med gradient og glød, venstrestilt",
		hintKey: "preset.hero.hint",
		create: () => ao("hero", "70vh", {
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
				to(.7, .2, .35),
				{
					type: "grain",
					version: 1,
					props: { opacity: .06 }
				}
			]
		}, [
			Q(Z(8.33, 40, 50, 38), Y("seed.hero.title")),
			Q(Z(8.33, 84, 41.67, 26), Y("seed.hero.intro")),
			Wa(Z(8.33, 118, 20, 32), Y("seed.readMore"))
		])
	}), e.sections.define("hero-sentrert", {
		label: "Hero, sentrert",
		labelKey: "preset.hero-sentrert.label",
		group: "Grunnleggende",
		groupKey: "presetGroup.basic",
		hint: "Sentrert åpning med to knapper",
		hintKey: "preset.hero-sentrert.hint",
		create: () => ao("hero-sentrert", "60vh", $a(eo("bg")), [
			Q(Z(15, 64, 70, 44), Y("seed.heroCenter.title"), { align: "center" }),
			Q(Z(25, 116, 50, 26), Y("seed.heroCenter.intro"), { align: "center" }),
			Wa(Z(31.5, 160, 17, 40), Y("seed.join")),
			Wa(Z(51.5, 160, 17, 40), Y("seed.readMore"), { style: "secondary" })
		])
	}), e.sections.define("bilder", {
		label: "Bilder",
		labelKey: "preset.bilder.label",
		group: "Grunnleggende",
		groupKey: "presetGroup.basic",
		hint: "Tittel og tre bilderammer",
		hintKey: "preset.bilder.hint",
		create: () => ao("bilder", "360px", $a(eo("bg")), [
			Q(Z(4, 24, 50, 32), Y("seed.images.title")),
			Ua(Z(4, 72, 28, 220)),
			Ua(Z(36, 72, 28, 220)),
			Ua(Z(68, 72, 28, 220))
		]),
		itemLabel: "bilde",
		itemLabelKey: "item.image",
		item: (e) => {
			let { x: t, y: n } = io(e, 3, 4, 32, 72, 244, 28, 220);
			return {
				blocks: [Ua(Z(t, n, 28, 220))],
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
		create: () => ao("galleri", "440px", $a(eo("bg")), [Q(Z(4, 24, 50, 32), Y("seed.gallery.title")), Ja(Z(4, 72, 92, 320))])
	}), e.sections.define("kontakt", {
		label: "Kontakt",
		labelKey: "preset.kontakt.label",
		group: "Grunnleggende",
		groupKey: "presetGroup.basic",
		hint: "Kontaktinfo i kort med e-postknapp",
		hintKey: "preset.kontakt.hint",
		create: () => ao("kontakt", "320px", $a(eo("surface"), to(.2, .8, .2)), [
			Q(Z(10, 32, 40, 36), Y("seed.contact.title")),
			Q(Z(10, 84, 36, 130), Y("seed.contact.info"), { box: !0 }),
			Wa(Z(60, 100, 22, 40), Y("seed.contact.button"), { href: "mailto:post@dinforening.no" })
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
				let i = Ga(Z(e + 10.5, 88, 4, 52), n), a = Q(Z(e, 152, 25, 200), Y("seed.features.card", { title: r }), {
					align: "center",
					box: !0
				});
				return a.animation = Ka(), i.mobileOrder = $(88, t, 0), a.mobileOrder = $(88, t, 1), [i, a];
			};
			return ao("funksjonskort", "420px", $a(eo("bg")), [
				Q(Z(6, 28, 60, 38), Y("seed.features.title")),
				...e(6, 0, "✦", Y("seed.features.card1")),
				...e(37.5, 1, "★", Y("seed.features.card2")),
				...e(69, 2, "✓", Y("seed.features.card3"))
			]);
		},
		itemLabel: "kort",
		itemLabelKey: "item.card",
		item: (e) => {
			let { x: t, y: n, n: r } = io(e, 3, 6, 31.5, 152, 296, 25, 264, -64), i = Ga(Z(t + 10.5, n - 64, 4, 52), "✦"), a = Q(Z(t, n, 25, 200), Y("seed.features.card", { title: Y("seed.features.newTitle") }), {
				align: "center",
				box: !0
			});
			return a.animation = Ka(), i.mobileOrder = $(88, r, 0), a.mobileOrder = $(88, r, 1), {
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
				let r = Q(Z(e, 88, 25, 200), Y("seed.features.card", { title: n }), {
					align: "center",
					box: !0
				});
				return r.animation = Ka(), r.mobileOrder = $(88, t, 0), r;
			};
			return ao("funksjonskort-enkel", "360px", $a(eo("bg")), [
				Q(Z(6, 28, 60, 38), Y("seed.features.title")),
				e(6, 0, Y("seed.features.card1")),
				e(37.5, 1, Y("seed.features.card2")),
				e(69, 2, Y("seed.features.card3"))
			]);
		},
		itemLabel: "kort",
		itemLabelKey: "item.card",
		item: (e) => {
			let { x: t, y: n, n: r } = io(e, 3, 6, 31.5, 88, 232, 25, 200), i = Q(Z(t, n, 25, 200), Y("seed.features.card", { title: Y("seed.features.newTitle") }), {
				align: "center",
				box: !0
			});
			return i.animation = Ka(), i.mobileOrder = $(88, r, 0), {
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
				let n = Ua(Z(e, 88, 25, 160)), r = Q(Z(e, 256, 25, 160), Y("seed.news.card"));
				return n.mobileOrder = $(88, t, 0), r.mobileOrder = $(88, t, 1), [n, r];
			};
			return ao("nyheter", "460px", $a(eo("bg")), [
				Q(Z(6, 28, 50, 38), Y("seed.news.title")),
				Wa(Z(78, 30, 16, 36), Y("seed.news.seeAll"), { style: "secondary" }),
				...e(6, 0),
				...e(37.5, 1),
				...e(69, 2)
			]);
		},
		itemLabel: "sak",
		itemLabelKey: "item.story",
		item: (e) => {
			let { x: t, y: n, n: r } = io(e, 3, 6, 31.5, 88, 344, 25, 328), i = Ua(Z(t, n, 25, 160)), a = Q(Z(t, n + 168, 25, 160), Y("seed.news.card"));
			return i.mobileOrder = $(88, r, 0), a.mobileOrder = $(88, r, 1), {
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
		create: () => ao("nyheter-samling", "300px", $a(eo("bg")), [Q(Z(6, 28, 50, 38), Y("seed.news.title")), qa(Z(6, 88, 88, 180), "cards")])
	}), e.sections.define("oppslagstavle", {
		label: "Oppslagstavle",
		labelKey: "preset.oppslagstavle.label",
		group: "Kort og lister",
		groupKey: "presetGroup.cards",
		hint: "Datert liste fra en samling (oppslag/kunngjøringer)",
		hintKey: "preset.oppslagstavle.hint",
		create: () => ao("oppslagstavle", "300px", $a(eo("surface")), [Q(Z(6, 28, 50, 38), Y("seed.noticeboard.title")), qa(Z(6, 88, 88, 180), "list", { limit: 8 })])
	}), e.sections.define("publikasjonsarkiv", {
		label: "Publikasjonsarkiv",
		labelKey: "preset.publikasjonsarkiv.label",
		group: "Kort og lister",
		groupKey: "presetGroup.cards",
		hint: "År-gruppert arkiv fra en samling (utgaver, referater, rapporter)",
		hintKey: "preset.publikasjonsarkiv.hint",
		create: () => ao("publikasjonsarkiv", "300px", $a(eo("bg")), [Q(Z(6, 28, 60, 38), Y("seed.archive.title")), qa(Z(6, 88, 88, 180), "archive", { limit: 0 })])
	}), e.sections.define("arrangementer", {
		label: "Arrangementer",
		labelKey: "preset.arrangementer.label",
		group: "Kort og lister",
		groupKey: "presetGroup.cards",
		hint: "Tre rader med dato-badge og påmeldingsknapp",
		hintKey: "preset.arrangementer.hint",
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
				Wa(Z(78, e + 24, 16, 40), Y("seed.events.signup"), { style: "secondary" })
			];
			return ao("arrangementer", "440px", $a(eo("surface")), [
				Q(Z(6, 28, 50, 38), Y("seed.events.title")),
				...e(88, "11", Y("seed.events.monthAug"), Y("seed.events.row1")),
				...e(196, "25", Y("seed.events.monthAug"), Y("seed.events.row2")),
				...e(304, "8", Y("seed.events.monthSep"), Y("seed.events.row3"))
			]);
		},
		itemLabel: "rad",
		itemLabelKey: "item.row",
		item: (e) => {
			let t = no(e) + 16;
			return {
				blocks: [
					Q(Z(6, t, 8, 88), Y("seed.events.newBadge"), {
						align: "center",
						box: !0
					}),
					Q(Z(16, t, 58, 88), Y("seed.events.row", { title: Y("seed.events.newTitle") })),
					Wa(Z(78, t + 24, 16, 40), Y("seed.events.signup"), { style: "secondary" })
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
				let r = Ua(Z(e, 80, 22, 180), { alt: Y("seed.team.alt") }), i = Q(Z(e, 268, 22, 84), Y("seed.team.member", { role: n }), { align: "center" });
				return r.mobileOrder = $(80, t, 0), i.mobileOrder = $(80, t, 1), [r, i];
			};
			return ao("team", "420px", $a(eo("surface")), [
				Q(Z(6, 24, 50, 32), Y("seed.team.title")),
				...e(7.5, 0, Y("seed.team.role1")),
				...e(39, 1, Y("seed.team.role2")),
				...e(70.5, 2, Y("seed.team.role3"))
			]);
		},
		itemLabel: "person",
		itemLabelKey: "item.person",
		item: (e) => {
			let { x: t, y: n, n: r } = io(e, 3, 7.5, 31.5, 80, 288, 22, 272), i = Ua(Z(t, n, 22, 180), { alt: Y("seed.team.alt") }), a = Q(Z(t, n + 188, 22, 84), Y("seed.team.member", { role: Y("seed.team.roleNew") }), { align: "center" });
			return i.mobileOrder = $(80, r, 0), a.mobileOrder = $(80, r, 1), {
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
		create: () => ao("faq", "520px", $a(eo("bg")), [
			Q(Z(25, 24, 50, 36), Y("seed.faq.title"), { align: "center" }),
			Ya(Z(20, 80, 60, 320), [
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
	}), e.sections.define("tidslinje", {
		label: "Tidslinje",
		labelKey: "preset.tidslinje.label",
		group: "Kort og lister",
		groupKey: "presetGroup.cards",
		hint: "Historien som hendelser langs en linje",
		hintKey: "preset.tidslinje.hint",
		create: () => ao("tidslinje", "480px", $a(eo("bg")), [Q(Z(25, 24, 50, 36), Y("seed.tidslinje.title"), { align: "center" }), Za(Z(25, 88, 50, 330), [
			{
				year: "2019",
				title: Y("seed.tidslinje.t1"),
				text: Y("seed.tidslinje.text")
			},
			{
				year: "2022",
				title: Y("seed.tidslinje.t2"),
				text: Y("seed.tidslinje.text")
			},
			{
				year: "2026",
				title: Y("seed.tidslinje.t3"),
				text: Y("seed.tidslinje.text")
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
				let r = Q(Z(e, 88, 25, 72), `<h3>${t + 1}</h3>`, {
					align: "center",
					size: 44
				}), i = Q(Z(e, 168, 25, 160), Y("seed.steps.card", { title: n }), {
					align: "center",
					box: !0
				});
				return r.mobileOrder = $(88, t, 0), i.mobileOrder = $(88, t, 1), [r, i];
			};
			return ao("steg", "400px", $a(eo("bg")), [
				Q(Z(6, 28, 60, 38), Y("seed.steps.title")),
				...e(6, 0, Y("seed.steps.s1")),
				...e(37.5, 1, Y("seed.steps.s2")),
				...e(69, 2, Y("seed.steps.s3"))
			]);
		},
		itemLabel: "steg",
		itemLabelKey: "item.step",
		item: (e) => {
			let { x: t, y: n, n: r } = io(e, 3, 6, 31.5, 88, 272, 25, 240), i = Q(Z(t, n, 25, 72), `<h3>${r + 1}</h3>`, {
				align: "center",
				size: 44
			}), a = Q(Z(t, n + 80, 25, 160), Y("seed.steps.card", { title: Y("seed.steps.newTitle") }), {
				align: "center",
				box: !0
			});
			return i.mobileOrder = $(88, r, 0), a.mobileOrder = $(88, r, 1), {
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
				Ua(Z(6, 40, 55, 300)),
				Q(Z(6, 348, 55, 108), Y("seed.feature.main")),
				Wa(Z(6, 464, 14, 38), Y("seed.readMore"), { style: "secondary" }),
				Ua(Z(66, 40, 28, 120)),
				Q(Z(66, 164, 28, 60), Y("seed.feature.small1")),
				Ua(Z(66, 244, 28, 120)),
				Q(Z(66, 368, 28, 60), Y("seed.feature.small2"))
			];
			return e.forEach((e, t) => {
				e.mobileOrder = $(40, t < 3 ? 0 : 1, t);
			}), ao("hovedoppslag", "540px", $a(eo("bg")), e);
		}
	}), e.sections.define("produkter", {
		label: "Produkter",
		labelKey: "preset.produkter.label",
		group: "Kort og lister",
		groupKey: "presetGroup.cards",
		hint: "Tre produktkort; pek Kjøp-knappen på en betalingslenke (f.eks. Vipps)",
		hintKey: "preset.produkter.hint",
		create: () => {
			let e = (e, t, n, r) => {
				let i = [
					Ua(Z(e, 88, 25, 200)),
					Q(Z(e, 296, 25, 76), Y("seed.products.card", {
						name: n,
						price: r
					}), { align: "center" }),
					Wa(Z(e + 5, 380, 15, 40), Y("seed.products.buy"))
				];
				return i.forEach((e, n) => {
					e.mobileOrder = $(88, t, n);
				}), i;
			};
			return ao("produkter", "470px", $a(eo("bg")), [
				Q(Z(6, 28, 50, 38), Y("seed.products.title")),
				...e(6, 0, Y("seed.products.name"), Y("seed.products.price1")),
				...e(37.5, 1, Y("seed.products.name"), Y("seed.products.price2")),
				...e(69, 2, Y("seed.products.name"), Y("seed.products.price3"))
			]);
		},
		itemLabel: "produkt",
		itemLabelKey: "item.product",
		item: (e) => {
			let { x: t, y: n, n: r } = io(e, 3, 6, 31.5, 88, 348, 25, 332), i = [
				Ua(Z(t, n, 25, 200)),
				Q(Z(t, n + 208, 25, 76), Y("seed.products.card", {
					name: Y("seed.products.name"),
					price: Y("seed.products.price1")
				}), { align: "center" }),
				Wa(Z(t + 5, n + 292, 15, 40), Y("seed.products.buy"))
			];
			return i.forEach((e, t) => {
				e.mobileOrder = $(88, r, t);
			}), {
				blocks: i,
				bottom: n + 356
			};
		}
	}), e.sections.define("cta", {
		label: "CTA-banner",
		labelKey: "preset.cta.label",
		group: "Fremheving",
		groupKey: "presetGroup.highlight",
		hint: "Full bredde med én tydelig handling",
		hintKey: "preset.cta.hint",
		create: () => ao("cta", "280px", $a(eo("surface"), to(.5, .5, .3, .7)), [
			Q(Z(20, 56, 60, 40), Y("seed.cta.title"), { align: "center" }),
			Q(Z(25, 104, 50, 26), Y("seed.cta.sub"), { align: "center" }),
			Wa(Z(42, 148, 16, 42), Y("seed.join"))
		])
	}), e.sections.define("sitat", {
		label: "Sitat",
		labelKey: "preset.sitat.label",
		group: "Fremheving",
		groupKey: "presetGroup.highlight",
		hint: "Stort sitat med attribusjon",
		hintKey: "preset.sitat.hint",
		create: () => ao("sitat", "300px", $a(eo("bg")), [Xa(Z(20, 56, 60, 190), {
			text: Y("seed.sitat.text"),
			attribution: Y("seed.sitat.name"),
			role: Y("seed.sitat.role")
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
				let a = Qa(Z(e, 76, 25, 120), {
					value: n,
					suffix: r,
					label: i
				});
				return a.mobileOrder = $(76, t, 0), a;
			};
			return ao("statistikk", "260px", $a(eo("surface")), [
				e(6, 0, "120", "+", Y("seed.stats.l1")),
				e(37.5, 1, "25", "", Y("seed.stats.l2")),
				e(69, 2, "1981", "", Y("seed.stats.l3"))
			]);
		},
		itemLabel: "tall",
		itemLabelKey: "item.number",
		item: (e) => {
			let { x: t, y: n, n: r } = io(e, 3, 6, 31.5, 76, 140, 25, 120), i = Qa(Z(t, n, 25, 120), {
				value: "42",
				label: Y("seed.stats.newLabel")
			});
			return i.mobileOrder = $(76, r, 0), {
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
			let e = (e) => Ua(Z(e, 108, 18.5, 100), {
				alt: Y("seed.sponsors.alt"),
				fit: "contain",
				radius: null,
				saturate: 0
			});
			return ao("sponsorer", "280px", $a(eo("bg")), [
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
			let { x: t, y: n } = io(e, 4, 5.5, 23.5, 108, 124, 18.5, 100);
			return {
				blocks: [Ua(Z(t, n, 18.5, 100), {
					alt: Y("seed.sponsors.alt"),
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
		create: () => ao("medlemskap", "500px", $a(eo("surface")), [
			Q(Z(6, 28, 50, 38), Y("seed.membership.title")),
			Q(Z(14, 88, 32, 250), Y("seed.membership.tier1"), {
				align: "center",
				box: !0
			}),
			Q(Z(54, 88, 32, 250), Y("seed.membership.tier2"), {
				align: "center",
				box: !0
			}),
			Wa(Z(42, 358, 16, 42), Y("seed.join")),
			Q(Z(25, 414, 50, 30), Y("seed.membership.vipps"), { align: "center" })
		])
	});
}
//#endregion
//#region ../template/assets/engine/0.6.10/maler-model.js
var so = [
	"section",
	"blocks",
	"page"
];
function co(e) {
	return na(String(e ?? ""), "");
}
function lo(e, t, { id: n, title: r }) {
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
var uo = /^#[0-9a-fA-F]{3,8}$/, fo = /^[a-z][a-z0-9-]*$/, po = "#171c26", mo = "#232a38", ho = "#98a1b3", go = "#7c5cff", _o = (e, t) => `var(--urd-color-${e}, ${t})`;
function vo(e, t) {
	return typeof e == "string" ? uo.test(e) ? e : fo.test(e) ? _o(e, t) : t : t;
}
function yo(e, t = 800) {
	let n = Number.parseFloat(e);
	return !Number.isFinite(n) || n <= 0 ? 400 : typeof e == "string" && e.trim().endsWith("vh") ? n / 100 * t : n;
}
var bo = (e) => Math.round(e * 10) / 10, xo = (e, t, n) => Math.min(n, Math.max(t, e)), So = (e, t, n, r, i, a = "") => `<rect x="${bo(e)}" y="${bo(t)}" width="${bo(Math.max(n, 1))}" height="${bo(Math.max(r, 1))}" fill="${i}"${a}/>`;
function Co(e) {
	for (let t of e?.background?.layers ?? []) {
		if (t.type === "color") return vo(t.props?.value, po);
		if (t.type === "gradient") return vo(Array.isArray(t.props?.stops) ? t.props.stops[0] : null, po);
	}
	return _o("bg", po);
}
function wo(e, t, n, r, i) {
	let a = /<h[1-3]/.test(String(i?.html ?? "")), o = i?.align === "center", s = _o("text", ho), c = [], l = [
		.72,
		.9,
		.5
	], u = t + 1;
	for (let i = 0; i < 3; i++) {
		let d = i === 0 && a ? 4 : 2.2;
		if (u + d > t + r) break;
		let f = n * l[i], p = o ? e + (n - f) / 2 : e;
		c.push(So(p, u, f, d, s, ` opacity="${i === 0 ? .8 : .4}" rx="1"`)), u += d + 2.4;
	}
	return c.join("");
}
function To(e, t, n, r) {
	let i = _o("text", ho), a = [So(e, t, n, r, _o("surface", mo), " rx=\"1.5\"")], o = (t) => bo(e + n * t), s = (e) => bo(t + r * e);
	return a.push(`<polygon points="${o(.08)},${s(.9)} ${o(.42)},${s(.38)} ${o(.62)},${s(.68)} ${o(.75)},${s(.5)} ${o(.92)},${s(.9)}" fill="${i}" opacity="0.4"/>`), a.push(`<circle cx="${o(.28)}" cy="${s(.26)}" r="${bo(Math.max(1, Math.min(n, r) * .1))}" fill="${i}" opacity="0.5"/>`), a.join("");
}
function Eo(e, t, n, r) {
	let i = Math.max(1, n * .03), a = (n - i * 2) / 3, o = [];
	for (let n = 0; n < 3; n++) o.push(To(e + n * (a + i), t, a, r));
	return o.join("");
}
function Do(e, t, n, r) {
	let i = Math.max(1, n * .03), a = (n - i * 2) / 3, o = [];
	for (let n = 0; n < 3; n++) {
		let s = e + n * (a + i);
		o.push(So(s, t, a, r * .55, _o("surface", mo), " rx=\"1.5\"")), o.push(So(s, t + r * .62, a * .8, 2, _o("text", ho), " opacity=\"0.5\" rx=\"1\""));
	}
	return o.join("");
}
function Oo(e, t, n, r, i) {
	let a = vo(i?.color, go), o = i?.kind;
	return o === "circle" ? `<ellipse cx="${bo(e + n / 2)}" cy="${bo(t + r / 2)}" rx="${bo(Math.max(n / 2, 1))}" ry="${bo(Math.max(r / 2, 1))}" fill="${a}" opacity="0.8"/>` : o === "triangle" ? `<polygon points="${bo(e)},${bo(t + r)} ${bo(e + n / 2)},${bo(t)} ${bo(e + n)},${bo(t + r)}" fill="${a}" opacity="0.8"/>` : o === "line" || o === "arrow" ? So(e, t + r / 2 - .75, n, 1.5, a, " opacity=\"0.85\" rx=\"0.75\"") : So(e, t, n, r, a, " opacity=\"0.8\" rx=\"1\"");
}
function ko(e, t, n, r, i, a) {
	if (e === "text") return wo(t, n, r, i, a);
	if (e === "image") return To(t, n, r, i);
	if (e === "galleri") return Eo(t, n, r, i);
	if (e === "samling") return Do(t, n, r, i);
	if (e === "shape") return Oo(t, n, r, i, a);
	if (e === "button") return So(t, n, r, i, _o("accent", go), ` rx="${bo(Math.min(i / 2, 4))}"`);
	if (e === "icon") {
		let e = Math.max(1.2, Math.min(r, i) / 2);
		return `<circle cx="${bo(t + r / 2)}" cy="${bo(n + i / 2)}" r="${bo(e)}" fill="${_o("accent", go)}" opacity="0.85"/>`;
	}
	if (e === "video") {
		let e = [So(t, n, r, i, _o("surface", mo), " rx=\"1.5\"")], a = t + r / 2, o = n + i / 2, s = Math.max(1.5, Math.min(r, i) * .22);
		return e.push(`<polygon points="${bo(a - s / 2)},${bo(o - s)} ${bo(a - s / 2)},${bo(o + s)} ${bo(a + s)},${bo(o)}" fill="${_o("text", ho)}" opacity="0.6"/>`), e.join("");
	}
	if (e === "tidslinje") {
		let e = [So(t + 1, n, 1.4, i, _o("accent", go), " opacity=\"0.7\" rx=\"0.7\"")];
		for (let a = 0; a < 3; a += 1) {
			let o = n + i * (.18 + a * .32);
			e.push(`<circle cx="${bo(t + 1.7)}" cy="${bo(o)}" r="1.6" fill="${_o("accent", go)}"/>`), e.push(So(t + 5, o - 1, r * .5, 2, _o("text", ho), " opacity=\"0.5\" rx=\"1\""));
		}
		return e.join("");
	}
	return e === "sitat" ? [
		`<text x="${bo(t + r / 2)}" y="${bo(n + i * .34)}" text-anchor="middle" font-size="${bo(Math.min(r, i) * .5)}" font-family="Georgia, serif" fill="${_o("accent", go)}">“</text>`,
		So(t + r * .15, n + i * .48, r * .7, 2, _o("text", ho), " opacity=\"0.6\" rx=\"1\""),
		So(t + r * .25, n + i * .62, r * .5, 2, _o("text", ho), " opacity=\"0.6\" rx=\"1\""),
		So(t + r * .35, n + i * .82, r * .3, 1.6, _o("text", ho), " opacity=\"0.35\" rx=\"0.8\"")
	].join("") : e === "statistikk" ? [So(t + r * .28, n + i * .15, r * .44, i * .42, _o("accent", go), " opacity=\"0.85\" rx=\"1\""), So(t + r * .32, n + i * .72, r * .36, 1.6, _o("text", ho), " opacity=\"0.4\" rx=\"0.8\"")].join("") : So(t, n, r, i, _o("surface", mo), " rx=\"1.5\"");
}
function Ao(e, t, n) {
	let r = Array.isArray(e?.blocks) ? e.blocks : [], i = r.map((e) => (e.frames?.desktop?.y ?? 0) + (e.frames?.desktop?.h ?? 0)), a = n / Math.max(yo(e?.size?.minHeight), i.length ? Math.max(...i) + 16 : 0), o = [So(0, 0, t, n, Co(e))];
	for (let r of e?.background?.layers ?? []) {
		if (r.type !== "glow") continue;
		let e = r.props ?? {};
		o.push(`<circle cx="${bo(xo(e.x ?? .5, 0, 1) * t)}" cy="${bo(xo(e.y ?? .3, 0, 1) * n)}" r="${bo(t * xo(e.radius ?? .5, .1, 1) * .5)}" fill="${vo(e.color, go)}" opacity="${bo(xo(e.opacity ?? .3, 0, .5))}"/>`);
	}
	for (let e of r) {
		let r = e.frames?.desktop;
		if (!r) continue;
		let i = xo((r.x ?? 0) * (t / 100), 0, t - 2), s = xo((r.y ?? 0) * a, 0, n - 2), c = xo((r.w ?? 10) * (t / 100), 2, t - i), l = xo((r.h ?? 20) * a, 2, n - s);
		o.push(ko(e.type, i, s, c, l, e.props));
	}
	return o.join("");
}
function jo(e, { w: t = 96, h: n = 116, max: r = 6 } = {}) {
	let i = (Array.isArray(e?.sections) ? e.sections : []).slice(0, r);
	if (!i.length) return `<svg viewBox="0 0 ${t} ${n}" width="${t}" height="${n}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${So(0, 0, t, n, _o("bg", po))}</svg>`;
	let a = i.map((e) => xo(yo(e?.size?.minHeight), 160, 900)), o = a.reduce((e, t) => e + t, 0), s = n - 1 * (i.length - 1), c = [], l = 0;
	for (let e = 0; e < i.length; e += 1) {
		let n = Math.max(6, a[e] / o * s);
		c.push(`<g transform="translate(0 ${bo(l)})">${Ao(i[e], t, n)}</g>`), l += n + 1;
	}
	return `<svg viewBox="0 0 ${t} ${n}" width="${t}" height="${n}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${c.join("")}</svg>`;
}
//#endregion
//#region ../template/assets/engine/0.6.10/page-presets.js
var Mo = /* @__PURE__ */ new Map();
oo({ sections: { define: (e, t) => Mo.set(e, t) } });
var No = [
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
	}
];
function Po(e, { pageId: t, title: n }) {
	let r = No.find((t) => t.id === e);
	return r ? {
		schemaVersion: 1,
		meta: {
			id: t,
			title: n
		},
		sections: r.sections.map((e) => Mo.get(e).create())
	} : null;
}
//#endregion
//#region ../template/assets/engine/0.6.10/palette-search.js
function Fo(e) {
	return String(e ?? "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}
function Io(e, t) {
	let n = Fo(t).trim(), r = Fo(e);
	return n ? r.startsWith(n) ? 0 : r.split(/[^a-z0-9]+/).some((e) => e.startsWith(n)) ? 1 : r.includes(n) ? 2 : -1 : 2;
}
function Lo(e, t, n) {
	return e.map((e, r) => ({
		item: e,
		i: r,
		rank: Io(n(e), t)
	})).filter((e) => e.rank >= 0).sort((e, t) => e.rank - t.rank || e.i - t.i).map((e) => e.item);
}
//#endregion
//#region ../template/assets/engine/0.6.10/theme.js
function Ro(e, t) {
	let n = e.tokens || {}, r = e.scheme === "dark" ? "dark" : "light";
	if (!e.alt?.tokens || t === r) return n;
	let i = {};
	for (let t of /* @__PURE__ */ new Set([...Object.keys(n), ...Object.keys(e.alt.tokens)])) i[t] = {
		...n[t],
		...e.alt.tokens[t]
	};
	return i;
}
var zo = /^[a-zA-Z0-9#%.,()'"\s+\-*/]+$/;
function Bo(e) {
	return typeof e == "string" && zo.test(e) && !/url\(|\/\*|\*\/|expression/i.test(e);
}
function Vo(e) {
	let t = e.tokens || {}, n = Ro(e, "light"), r = Ro(e, "dark"), i = e.scheme === "dark" ? "dark" : "light", a = [], o = [], s = [], c = /* @__PURE__ */ new Set([
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
			Bo(c) && (a.push(`  --urd-${e}-${l}: ${c};`), i && a.push(`  --urd-base-${l}: ${c};`)), u !== d && (i && Bo(u) && Bo(d) ? o.push({
				name: l,
				lv: u,
				dv: d
			}) : !i && Bo(u) && Bo(d) && s.push({
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
function Ho(e) {
	return /^[a-z][a-z0-9-]*$/.test(e) ? `var(--urd-color-${e})` : e;
}
var Uo = {
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
}, Wo = {
	flate: "sectionTheme.flate",
	aksent: "sectionTheme.aksent",
	invers: "sectionTheme.invers"
};
[...new Set(Object.values(Uo).flatMap(Object.keys))];
function Go(e) {
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
function Ko(e, t) {
	let n = Go(e), r = Go(t);
	return n == null || r == null ? null : (Math.max(n, r) + .05) / (Math.min(n, r) + .05);
}
//#endregion
//#region ../template/assets/engine/0.6.10/backgrounds/color.js
var qo = {
	version: 1,
	label: "Farge",
	labelKey: "bgLayer.color",
	defaults: () => ({
		value: "bg",
		opacity: 1
	}),
	migrations: {},
	render(e, t) {
		e.style.background = Ho(t.value), e.style.opacity = String(t.opacity ?? 1);
	}
}, Jo = {
	linear: [
		"pan",
		"pan-loop",
		"rotate"
	],
	radial: ["pulse", "orbit"]
};
function Yo(e) {
	let t = Array.isArray(e) && e.length ? e : [{ color: "#0b0e14" }, { color: "#1a1030" }], n = t.map((e) => Math.max(0, Number(e?.share) || 0)), r = n.reduce((e, t) => e + t, 0), i = r <= 0, a = i ? t.length : r, o = 0;
	return t.map((e, t) => {
		let r = i ? 1 : n[t], s = (o + r / 2) / a * 100;
		return o += r, {
			color: e?.color ?? "#0b0e14",
			at: Math.round(s * 100) / 100
		};
	});
}
function Xo(e) {
	let t = (e) => Math.round(e * 100) / 100, n = e[0]?.at ?? 0;
	return [...e.map((e) => ({
		color: e.color,
		at: t(e.at - n)
	})), {
		color: e[0]?.color ?? "#0b0e14",
		at: 100
	}];
}
function Zo(e, t, n, r = .5) {
	let i = n % 360 * Math.PI / 180, a = (e) => Math.round(e * 100) / 100 || 0, o = (Math.abs(e * Math.sin(i)) + Math.abs(t * Math.cos(i))) / (1 - Math.min(Math.max(r, 0), .9));
	return {
		period: a(o),
		dx: a(Math.sin(i) * o),
		dy: a(-Math.cos(i) * o)
	};
}
function Qo(e, t, n) {
	return `repeating-linear-gradient(${t}deg, ${e.map((e) => `${Ho(e.color)} ${Math.round(e.at / 100 * n * 100) / 100}px`).join(", ")})`;
}
function $o(e) {
	let t = e.kind === "radial" ? "radial" : "linear", n = (Jo[t] ?? []).includes(e.animation) ? e.animation : null, r = Yo(e.stops), i = r.map((e) => `${Ho(e.color)} ${e.at}%`).join(", "), a = {}, o;
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
					stops: Xo(r),
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
var es = /* @__PURE__ */ new Set(), ts = !1;
function ns(e) {
	es.add(e), !(ts || typeof window > "u") && (ts = !0, window.addEventListener("resize", () => {
		for (let e of [...es]) e() || es.delete(e);
	}));
}
var rs = !1;
function is() {
	if (!rs) {
		rs = !0;
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
var as = {
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
		let n = $o(t);
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
					let e = Zo(r, i, n.loop.angle, n.loop.maxShare);
					t.style.inset = `${-Math.ceil(e.period)}px`, t.style.background = Qo(n.loop.stops, n.loop.angle, e.period), t.style.setProperty("--urd-loop-dx", `${e.dx}px`), t.style.setProperty("--urd-loop-dy", `${e.dy}px`);
				}
				return !0;
			};
			requestAnimationFrame(r), ns(r);
			return;
		}
		if (n.runner) {
			e.classList.add("urd-bg-loop-host");
			let t = document.createElement("div");
			t.className = n.runner.className, t.style.background = n.runner.background, n.runner.left != null && (t.style.left = n.runner.left), n.runner.top != null && (t.style.top = n.runner.top), e.appendChild(t);
			return;
		}
		e.style.background = n.background, n.className && (e.classList.add(n.className), n.className === "urd-bg-rotate" && is());
	}
}, os = {
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
		let n = Ho(t.color);
		e.style.background = `radial-gradient(circle at ${t.x * 100}% ${t.y * 100}%, ${n} 0%, transparent ${t.radius * 100}%)`, e.style.opacity = String(t.opacity ?? .35);
	}
}, ss = "url(\"data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22128%22%20height%3D%22128%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%222%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22128%22%20height%3D%22128%22%20filter%3D%22url(%23n)%22%2F%3E%3C%2Fsvg%3E\")", cs = {
	version: 1,
	label: "Korn",
	labelKey: "bgLayer.grain",
	defaults: () => ({ opacity: .06 }),
	migrations: {},
	render(e, t) {
		e.style.backgroundImage = ss, e.style.backgroundRepeat = "repeat", e.style.opacity = String(t.opacity ?? .06);
	}
}, ls = .4;
function us(e, t) {
	return `${(e ?? .5) * 100}% ${(t ?? .5) * 100}%`;
}
function ds(e, t) {
	return e === "contain" ? "contain" : e === "cover" ? "cover" : `${Math.max(0, t ?? 1) * 100}%`;
}
function fs(e) {
	let t = "-9999px";
	return e === "up" ? `inset(${t} 0 0 0)` : e === "down" ? `inset(0 0 ${t} 0)` : e === "both" ? `inset(${t} 0 ${t} 0)` : "inset(0)";
}
function ps(e, t, n, r = .18) {
	let i = Math.max(0, Math.min(1, n)) * ls * t;
	return Math.round(Math.min(i, r * e));
}
function ms(e, t, n, r, i) {
	let a = e + t / 2, o = (n / 2 - a) * Math.max(0, Math.min(1, r)) * ls, s = i ?? ps(t, n, r);
	return Math.max(-s, Math.min(s, o)) || 0;
}
var hs = /* @__PURE__ */ new Set(), gs = !1, _s = 0;
function vs() {
	_s = 0;
	for (let e of [...hs]) e() || hs.delete(e);
}
function ys() {
	_s ||= requestAnimationFrame(vs);
}
function bs(e) {
	hs.add(e), e(), !(gs || typeof window > "u") && (gs = !0, window.addEventListener("scroll", ys, { passive: !0 }), window.addEventListener("resize", ys, { passive: !0 }));
}
function xs(e, t, n, r) {
	let i = r === "cover" || r === "flislegg" || r === "repeat", a = e.closest(".urd-section") ?? e.parentElement?.closest(".urd-section") ?? e.parentElement, o = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
	e.style.willChange = "transform";
	let s = (t) => {
		e.style.top = `-${t}px`, e.style.bottom = `-${t}px`;
	}, c = () => {
		if (!e.isConnected) return !1;
		if (o || document.body.classList.contains("urd-mobile")) return s(n), e.style.transform = "", !0;
		let r = (a ?? e).getBoundingClientRect(), c = window.innerHeight || document.documentElement.clientHeight, l = ps(r.height, c, t, i ? .18 : .6);
		s(i ? Math.max(n, l) : n);
		let u = ms(r.top, r.height, c, t, l);
		return e.style.transform = `translateY(${u.toFixed(1)}px)`, !0;
	};
	bs(c), typeof requestAnimationFrame == "function" && requestAnimationFrame(() => requestAnimationFrame(c));
}
function Ss() {
	return typeof CSS < "u" && typeof CSS.supports == "function" && CSS.supports("animation-timeline", "view()");
}
var Cs = /* @__PURE__ */ new Set(), ws = !1, Ts = 0;
function Es() {
	Ts = 0;
	for (let e of [...Cs]) e() || Cs.delete(e);
}
function Ds() {
	!Ts && typeof requestAnimationFrame == "function" && (Ts = requestAnimationFrame(Es));
}
function Os(e) {
	Cs.add(e), e(), !(ws || typeof window > "u") && (ws = !0, window.addEventListener("resize", Ds, { passive: !0 }));
}
function ks(e, t, n, r) {
	let i = r === "cover" || r === "flislegg" || r === "repeat", a = e.closest(".urd-section") ?? e.parentElement?.closest(".urd-section") ?? e.parentElement;
	e.style.willChange = "transform", e.classList.add("urd-parallax-css");
	let o = () => {
		if (!e.isConnected) return !1;
		let r = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches || document.body.classList.contains("urd-mobile"), o = (a ?? e).getBoundingClientRect(), s = window.innerHeight || document.documentElement.clientHeight, c = ps(o.height, s, t, i ? .18 : .6), l = i && !r ? Math.max(n, c) : n;
		return e.style.setProperty("--urd-px-shift", `${c}px`), e.style.top = `-${l}px`, e.style.bottom = `-${l}px`, !0;
	};
	Os(o), typeof requestAnimationFrame == "function" && requestAnimationFrame(() => requestAnimationFrame(o));
}
var As = {
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
		e.style.opacity = String(t.opacity ?? 1), e.style.clipPath = fs(t.bleed), e.style.zIndex = t.bleed === "down" || t.bleed === "both" ? "1" : "";
		let n = document.createElement("div");
		n.className = "urd-bg-image", n.style.position = "absolute", n.style.left = "0", n.style.right = "0", n.style.top = "0", n.style.bottom = "0";
		let r = t.fit === "flislegg" || t.fit === "repeat";
		n.style.backgroundImage = `url("${t.src}")`, n.style.backgroundSize = ds(t.fit, t.size), n.style.backgroundRepeat = r ? "repeat" : "no-repeat", n.style.backgroundPosition = us(t.x, t.y);
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
			Ss() ? ks(n, t.parallax, i, e) : xs(n, t.parallax, i, e);
		}
	}
};
//#endregion
//#region ../template/assets/engine/0.6.10/galleri-model.js
function js(e, t, n) {
	return !Number.isFinite(n) || n < 1 ? 0 : (((Number.isFinite(e) ? e : 0) + t) % n + n) % n;
}
function Ms({ count: e = 0, reducedMotion: t = !1 } = {}) {
	return e >= 2 && !t;
}
function Ns(e, { min: t = 2, fallback: n = 5 } = {}) {
	let r = Number(e);
	return !Number.isFinite(r) || r <= 0 ? n : Math.max(t, r);
}
//#endregion
//#region ../template/assets/engine/0.6.10/backgrounds/bildegalleri.js
var Ps = {
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
			e.style.backgroundImage = `url("${n.src}")`, e.style.backgroundSize = ds(t.fit), e.style.backgroundRepeat = "no-repeat", e.style.backgroundPosition = us(n.x, n.y);
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
		if (!Ms({
			count: n.length,
			reducedMotion: s
		})) return;
		let c = document.createElement("div");
		c.className = "urd-bg-slide", e.appendChild(c);
		let l = 0, u = o, d = Math.max(Ns(t.interval, { fallback: 6 }), r + .5) * 1e3, f = setInterval(() => {
			if (!e.isConnected) {
				clearInterval(f);
				return;
			}
			if (document.hidden) return;
			let t = js(l, 1, n.length), r = new Image();
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
function Fs(e = {}) {
	let t = "#2fd6b6", n = "#5c6b64", r = e.mega ? "#16221d" : "#0e1512", i = e.cols ?? 0, a = e.social ?? 0, o = `<svg viewBox="0 0 160 80" preserveAspectRatio="none" aria-hidden="true"><rect width="160" height="80" fill="${r}"/>`;
	if (e.mega && (o += `<circle cx="20" cy="6" r="34" fill="${t}" opacity="0.18"/>`), e.bigcta) return o += `<rect x="45" y="18" width="70" height="8" rx="3" fill="${n}" opacity="0.85"/>`, o += `<rect x="56" y="32" width="48" height="4" rx="2" fill="${n}" opacity="0.5"/>`, o += `<rect x="62" y="43" width="36" height="10" rx="3" fill="${t}"/>`, o += Is(n, e.baselineLinks), o + "</svg>";
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
	return o += Is(n, e.baselineLinks), o + "</svg>";
}
function Is(e, t = 0) {
	let n = `<line x1="8" y1="66" x2="152" y2="66" stroke="${e}" stroke-width="0.6" opacity="0.5"/>`;
	return n += `<rect x="8" y="70" width="40" height="3" rx="1.5" fill="${e}" opacity="0.6"/>`, t && (n += `<g fill="${e}" opacity="0.6">` + Array.from({ length: t }, (e, t) => `<rect x="${120 - t * 16}" y="70" width="12" height="3" rx="1.5"/>`).join("") + "</g>"), n;
}
//#endregion
//#region ../template/assets/engine/0.6.10/animations/core.js
var Ls = () => ({
	duration: 600,
	delay: 0
}), Rs = {
	"fade-in": {
		version: 1,
		label: "Ton inn",
		labelKey: "anim.fadeIn",
		entrance: !0,
		defaults: Ls,
		migrations: {}
	},
	"slide-up": {
		version: 1,
		label: "Gli opp",
		labelKey: "anim.slideUp",
		entrance: !0,
		defaults: Ls,
		migrations: {}
	},
	"zoom-in": {
		version: 1,
		label: "Zoom inn",
		labelKey: "anim.zoomIn",
		entrance: !0,
		defaults: Ls,
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
}, zs = [
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
function Bs(e) {
	let t = (e) => Math.round(e * 100) / 100, n = Math.max(0, t(100 - e.w)), r = Math.min(n, Math.max(0, t(e.x - e.w / 2))), i = Math.max(0, e.y - e.h / 2), a = e.snap === !1 || e.grid?.snap === !1, o = e.grid?.size || 8;
	return i = a ? Math.round(i) : Math.round(i / o) * o, {
		x: r,
		y: Math.max(0, i)
	};
}
//#endregion
//#region src/App.svelte
var Vs = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), Hs = /* @__PURE__ */ V("<button class=\"ghost row-tool svelte-1n46o8q\"></button>"), Us = /* @__PURE__ */ V("<span><span class=\"grad-grip svelte-1n46o8q\"><svg viewBox=\"0 0 16 16\" width=\"14\" height=\"14\" fill=\"currentColor\" aria-hidden=\"true\"><circle cx=\"5\" cy=\"3\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"3\" r=\"1.4\"></circle><circle cx=\"5\" cy=\"8\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"8\" r=\"1.4\"></circle><circle cx=\"5\" cy=\"13\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"13\" r=\"1.4\"></circle></svg></span> <!> <input type=\"range\" class=\"tb-grow svelte-1n46o8q\" min=\"0\" max=\"100\" step=\"1\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span> <!></span>"), Ws = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), Gs = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"360\" step=\"5\" class=\"svelte-1n46o8q\"/>", 1), Ks = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <!> <button class=\"ghost action svelte-1n46o8q\"> </button> <!> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label>", 1), qs = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), Js = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.01\" max=\"0.3\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), Ys = /* @__PURE__ */ V("<div class=\"sizefill svelte-1n46o8q\"><button type=\"button\" class=\"ghost svelte-1n46o8q\"> </button> <button type=\"button\" class=\"ghost svelte-1n46o8q\"> </button></div> <label class=\"svelte-1n46o8q\"> </label> <div class=\"focalpad svelte-1n46o8q\"><span class=\"focaldot svelte-1n46o8q\"></span></div> <label class=\"sub svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"-0.5\" max=\"1.5\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"sub svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"-0.5\" max=\"1.5\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), Xs = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label>", 1), Zs = /* @__PURE__ */ V("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> </label> <div class=\"sizestep svelte-1n46o8q\"><button type=\"button\" class=\"svelte-1n46o8q\">−</button> <input type=\"number\" min=\"10\" max=\"400\" class=\"svelte-1n46o8q\"/> <span class=\"sizeunit svelte-1n46o8q\">%</span> <button type=\"button\" class=\"svelte-1n46o8q\">+</button></div> <!> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"20\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), Qs = /* @__PURE__ */ V("<span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), $s = /* @__PURE__ */ V("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"2\" max=\"120\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"5\" step=\"0.1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"20\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <p class=\"panel-hint svelte-1n46o8q\"> </p>", 1), ec = /* @__PURE__ */ V("<div class=\"bg-layer svelte-1n46o8q\"><span class=\"nav-line svelte-1n46o8q\"><!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <!></div>"), tc = /* @__PURE__ */ V("<!> <label class=\"svelte-1n46o8q\"> <!></label> <button class=\"ghost action svelte-1n46o8q\"> </button>", 1), nc = /* @__PURE__ */ V("<input class=\"nav-target svelte-1n46o8q\"/>"), rc = /* @__PURE__ */ V("<div class=\"nav-row nav-sub-row svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <span class=\"nav-target svelte-1n46o8q\"><!></span> <!></div>"), ic = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label>"), ac = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"num-stepper svelte-1n46o8q\"><button type=\"button\" class=\"svelte-1n46o8q\">−</button> <input type=\"number\" min=\"1\" max=\"12\" step=\"1\" class=\"svelte-1n46o8q\"/> <button type=\"button\" class=\"svelte-1n46o8q\">+</button></span></label>", 1), oc = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), sc = /* @__PURE__ */ V("<p class=\"panel-hint svelte-1n46o8q\"> </p>"), cc = /* @__PURE__ */ V("<span class=\"nav-line svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span>"), lc = /* @__PURE__ */ V("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <button class=\"ghost action svelte-1n46o8q\"> </button>", 1), uc = /* @__PURE__ */ V("<span class=\"nav-line svelte-1n46o8q\"><input class=\"tl-year svelte-1n46o8q\"/> <input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <input class=\"svelte-1n46o8q\"/>", 1), dc = /* @__PURE__ */ V("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <button class=\"ghost action svelte-1n46o8q\"> </button>", 1), fc = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), pc = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), mc = /* @__PURE__ */ V("<input class=\"svelte-1n46o8q\"/>"), hc = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <!>", 1), gc = /* @__PURE__ */ V("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>"), _c = /* @__PURE__ */ V("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <!>", 1), vc = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> </label> <input class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), yc = /* @__PURE__ */ V("<input class=\"token-input svelte-1n46o8q\" maxlength=\"4\"/>"), bc = /* @__PURE__ */ V("<button class=\"ghost svelte-1n46o8q\"> </button>"), xc = /* @__PURE__ */ V("<span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\"/> <button class=\"ghost svelte-1n46o8q\"> </button></span>"), Sc = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <span class=\"toolbar-row svelte-1n46o8q\"><!> <!></span></label> <!>", 1), Cc = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), wc = /* @__PURE__ */ V("<div class=\"bg-layer svelte-1n46o8q\"><span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label></div>"), Tc = /* @__PURE__ */ V("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label> <!>", 1), Ec = /* @__PURE__ */ V("<p> </p>"), Dc = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"text\" class=\"svelte-1n46o8q\"/></label> <button class=\"ghost svelte-1n46o8q\"> </button> <!>", 1), Oc = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"number\" class=\"svelte-1n46o8q\"/></label>"), kc = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"text\" class=\"svelte-1n46o8q\"/></label>"), Ac = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), jc = /* @__PURE__ */ V("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Mc = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Nc = /* @__PURE__ */ V("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!>", 1), Pc = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Fc = /* @__PURE__ */ V("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Ic = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Lc = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"1\" max=\"3\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.2\" max=\"2\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.2\" max=\"2\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"2\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\"> </button> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Rc = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"8\" max=\"400\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), zc = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" max=\"6\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"32\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), Bc = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"2\" max=\"60\" class=\"svelte-1n46o8q\"/></label>"), Vc = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <!> <!> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Hc = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" max=\"40\" class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Uc = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"100\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label>", 1), Wc = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"400\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label>", 1), Gc = /* @__PURE__ */ V("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), Kc = /* @__PURE__ */ V("<div class=\"frame-grid svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"0.5\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"0.5\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label></div>"), qc = /* @__PURE__ */ V("<!> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label></div></details>", 1), Jc = /* @__PURE__ */ V("<div class=\"props-tabs svelte-1n46o8q\"><span class=\"seg svelte-1n46o8q\"><button type=\"button\"> </button> <button type=\"button\"> </button></span></div> <!>", 1), Yc = /* @__PURE__ */ V("<button class=\"chrome-restore svelte-1n46o8q\"><!> </button>"), Xc = /* @__PURE__ */ V("<button class=\"ghost svelte-1n46o8q\"> </button> <span class=\"viewswitch svelte-1n46o8q\"><button></button> <button></button></span> <span class=\"zoomswitch svelte-1n46o8q\"><button></button> <button class=\"ghost svelte-1n46o8q\"></button> <span class=\"zoom-readout svelte-1n46o8q\"> </span> <button class=\"ghost svelte-1n46o8q\"></button></span> <button></button>", 1), Zc = /* @__PURE__ */ V("<button class=\"badge attention svelte-1n46o8q\"><!> </button>"), Qc = /* @__PURE__ */ V("<span class=\"badge svelte-1n46o8q\"> </span> <button> </button>", 1), $c = /* @__PURE__ */ V("<!> ", 1), el = /* @__PURE__ */ V("<span class=\"who svelte-1n46o8q\"><!> </span>"), tl = /* @__PURE__ */ V("<a class=\"ghost svelte-1n46o8q\" href=\"/api/github/login\"> </a>"), nl = /* @__PURE__ */ V("<button class=\"ghost svelte-1n46o8q\"><!></button> <!> <a class=\"ghost svelte-1n46o8q\" target=\"_blank\" rel=\"noopener\"> </a> <button class=\"primary svelte-1n46o8q\"> </button>", 1), rl = /* @__PURE__ */ V("<hr class=\"rail-sep svelte-1n46o8q\"/>"), il = /* @__PURE__ */ V("<button> </button>"), al = /* @__PURE__ */ V("<!> <!>", 1), ol = /* @__PURE__ */ V("<div class=\"settings-pop svelte-1n46o8q\"><p class=\"panel-strong svelte-1n46o8q\"> </p> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label></div>"), sl = /* @__PURE__ */ V("<span class=\"page-path svelte-1n46o8q\">/</span>"), cl = /* @__PURE__ */ V("<input class=\"page-slug svelte-1n46o8q\"/>"), ll = /* @__PURE__ */ V("<button class=\"ghost danger svelte-1n46o8q\"><!> </button>"), ul = /* @__PURE__ */ V("<div class=\"page-menu svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"><!> </button> <!></div>"), dl = /* @__PURE__ */ V("<div><input class=\"page-title svelte-1n46o8q\"/> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <span class=\"page-menu-wrap svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <!></span></span></div>"), fl = /* @__PURE__ */ V("<div><button class=\"page-mal-pick svelte-1n46o8q\"><span class=\"page-mal-thumb svelte-1n46o8q\"></span> <span class=\"page-mal-name svelte-1n46o8q\"> </span></button></div>"), pl = /* @__PURE__ */ V("<div><button class=\"page-mal-pick svelte-1n46o8q\"><span class=\"page-mal-thumb svelte-1n46o8q\"></span> <span class=\"page-mal-name svelte-1n46o8q\"> </span></button> <button class=\"page-mal-del svelte-1n46o8q\"></button></div>"), ml = /* @__PURE__ */ V("<span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"page-mal-grid svelte-1n46o8q\"></div>", 1), hl = /* @__PURE__ */ V("<div class=\"panel-body svelte-1n46o8q\"><!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <input class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\"> </button> <span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"page-mal-grid svelte-1n46o8q\"><div><button class=\"page-mal-pick svelte-1n46o8q\"><span class=\"page-mal-thumb svelte-1n46o8q\"></span> <span class=\"page-mal-name svelte-1n46o8q\"> </span></button></div> <!></div> <!></div>"), gl = /* @__PURE__ */ V("<input class=\"svelte-1n46o8q\"/> <span class=\"toolbar-row svelte-1n46o8q\"><!> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"8\" max=\"96\" placeholder=\"px\"/> <button><b> </b></button> <button><i> </i></button></span>", 1), _l = /* @__PURE__ */ V("<span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"12\" max=\"128\"/> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"0\" max=\"64\"/></span>"), vl = /* @__PURE__ */ V("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), yl = /* @__PURE__ */ V("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), bl = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), xl = /* @__PURE__ */ V("<div class=\"nav-row svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <span class=\"nav-target svelte-1n46o8q\"><!></span> <!></div> <!>", 1), Sl = /* @__PURE__ */ V("<div class=\"panel-body svelte-1n46o8q\"><details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <!></label> <!> <!> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <!></label> <!> <!> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <!> <!> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" max=\"4\" class=\"svelte-1n46o8q\"/></label></div></details> <details class=\"group svelte-1n46o8q\" open=\"\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\"> </button></div></details></div>"), Cl = /* @__PURE__ */ V("<img class=\"site-icon-preview svelte-1n46o8q\"/>"), wl = /* @__PURE__ */ V("<button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button>", 1), Tl = /* @__PURE__ */ V("<div class=\"panel-body svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span></div>"), El = /* @__PURE__ */ V("<div class=\"mini-label tpv-cap svelte-1n46o8q\"> </div>"), Dl = /* @__PURE__ */ V("<div class=\"theme-pvw svelte-1n46o8q\"><!> <div class=\"tpv-demo svelte-1n46o8q\"><div class=\"tpv-h svelte-1n46o8q\"> </div> <div class=\"tpv-card svelte-1n46o8q\"> </div> <div class=\"tpv-row svelte-1n46o8q\"><span class=\"tpv-btn svelte-1n46o8q\"> </span><span class=\"tpv-lnk svelte-1n46o8q\"> </span></div></div></div>"), Ol = /* @__PURE__ */ V("<button type=\"button\"><span class=\"tp-band svelte-1n46o8q\"><i class=\"svelte-1n46o8q\"></i><i class=\"svelte-1n46o8q\"></i><i class=\"svelte-1n46o8q\"></i><i class=\"svelte-1n46o8q\"></i></span> <small class=\"svelte-1n46o8q\"> </small></button>"), kl = /* @__PURE__ */ V("<div class=\"ctl-row autorow svelte-1n46o8q\"><span class=\"autolbl svelte-1n46o8q\"> </span> <span class=\"seg svelte-1n46o8q\"><button type=\"button\"> </button> <button type=\"button\"> </button></span></div>"), Al = /* @__PURE__ */ V("<span class=\"mini-label svelte-1n46o8q\"> </span>"), jl = /* @__PURE__ */ V("<div class=\"palcol svelte-1n46o8q\"><!> <span class=\"palcap svelte-1n46o8q\"> </span> <b class=\"palhex svelte-1n46o8q\"> </b></div>"), Ml = /* @__PURE__ */ V("<div class=\"ctl-row palhead svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <button type=\"button\"> </button></div> <div></div>", 1), Nl = /* @__PURE__ */ V("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-strong svelte-1n46o8q\"> </p> <div class=\"theme-presets svelte-1n46o8q\"></div> <p class=\"panel-strong svelte-1n46o8q\"> </p> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <div class=\"ctl-row palhead svelte-1n46o8q\"><!> <button type=\"button\"> </button></div> <div class=\"palcells svelte-1n46o8q\"></div> <!> <div class=\"theme-previews svelte-1n46o8q\"><!> <!></div> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <div class=\"sample typo-sample svelte-1n46o8q\"><div class=\"ts-h svelte-1n46o8q\"> </div> <div class=\"ts-b svelte-1n46o8q\"> </div></div></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"sample form-prev svelte-1n46o8q\"><span class=\"fp-btn svelte-1n46o8q\"> </span> <span class=\"fp-card svelte-1n46o8q\"> </span></div> <label class=\"ctl-row svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"24\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"ctl-row svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"40\" step=\"1\" class=\"svelte-1n46o8q\"/></div></details></div>"), Pl = /* @__PURE__ */ V("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label>"), Fl = /* @__PURE__ */ V("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label>"), Il = /* @__PURE__ */ V("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"></div></details>"), Ll = /* @__PURE__ */ V("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button></div></details> <button class=\"ghost svelte-1n46o8q\"> </button> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button></div></details> <!> <!>", 1), Rl = /* @__PURE__ */ V("<div><input type=\"text\" class=\"svelte-1n46o8q\"/> <!></div>"), zl = /* @__PURE__ */ V("<div class=\"panel-body svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label></div>"), Bl = /* @__PURE__ */ V("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!>", 1), Vl = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), Hl = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"1000\" step=\"10\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label>", 1), Ul = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label>"), Wl = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"100\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <!>", 1), Gl = /* @__PURE__ */ V("<p class=\"panel-strong svelte-1n46o8q\"> </p> <label class=\"svelte-1n46o8q\"> <input class=\"token-input svelte-1n46o8q\"/></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"row-tools svelte-1n46o8q\"><span class=\"gridmenu-value svelte-1n46o8q\"> </span> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label>", 1), Kl = /* @__PURE__ */ V("<div class=\"panel-body svelte-1n46o8q\"><!></div>"), ql = /* @__PURE__ */ V("<button class=\"footer-tp svelte-1n46o8q\"><span class=\"footer-tp-thumb svelte-1n46o8q\"></span> <span class=\"footer-tp-name svelte-1n46o8q\"> </span></button>"), Jl = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"16\" max=\"160\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), Yl = /* @__PURE__ */ V("<span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span> <!>", 1), Xl = /* @__PURE__ */ V("<div class=\"nav-row svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></div> <!>", 1), Zl = /* @__PURE__ */ V("<div class=\"nav-row svelte-1n46o8q\"><span class=\"nav-line svelte-1n46o8q\"><span class=\"footer-soc-preview svelte-1n46o8q\" aria-hidden=\"true\"></span> <!></span> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <input class=\"nav-target svelte-1n46o8q\"/></div>"), Ql = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <!>", 1), $l = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <!>", 1), eu = /* @__PURE__ */ V("<div class=\"panel-body svelte-1n46o8q\"><label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"footer-tpick svelte-1n46o8q\"></div></div></details> <details class=\"group svelte-1n46o8q\" open=\"\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\"> </button> <label class=\"svelte-1n46o8q\"> <!></label></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\"> </button></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\"> </button></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <button class=\"ghost action svelte-1n46o8q\"> </button></div></details></div>"), tu = /* @__PURE__ */ V("<img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <button class=\"ghost row-tool svelte-1n46o8q\"></button>", 1), nu = /* @__PURE__ */ V("<details class=\"group samling-entry svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><span class=\"toolbar-row svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <label class=\"svelte-1n46o8q\"> <input type=\"date\" class=\"svelte-1n46o8q\"/></label> <textarea rows=\"3\" class=\"svelte-1n46o8q\"></textarea> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span></div></details>"), ru = /* @__PURE__ */ V("<span class=\"toolbar-row svelte-1n46o8q\"><button class=\"ghost action svelte-1n46o8q\"> </button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <!> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), iu = /* @__PURE__ */ V("<div class=\"panel-body svelte-1n46o8q\"><!> <!> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <button class=\"ghost action svelte-1n46o8q\"> </button></div>"), au = /* @__PURE__ */ V("<span class=\"plugin-meta svelte-1n46o8q\"> </span>"), ou = /* @__PURE__ */ V("<p class=\"panel-hint plugin-warn svelte-1n46o8q\"> </p>"), su = /* @__PURE__ */ V("<div><span class=\"plugin-head svelte-1n46o8q\"><span class=\"plugin-name svelte-1n46o8q\"> </span> <!> <span class=\"row-tools svelte-1n46o8q\"><label class=\"gridmenu-snap plugin-toggle svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <!> <!></div>"), cu = /* @__PURE__ */ V("<div class=\"plugin-row svelte-1n46o8q\"><span class=\"plugin-head svelte-1n46o8q\"><span class=\"plugin-name svelte-1n46o8q\"> </span> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span></div>"), lu = /* @__PURE__ */ V("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!>", 1), uu = /* @__PURE__ */ V("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <input class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\"> </button> <!>", 1), du = /* @__PURE__ */ V("<div class=\"panel-body svelte-1n46o8q\"><!> <!> <!> <!></div>"), fu = /* @__PURE__ */ V("<div><span class=\"history-msg svelte-1n46o8q\"> </span> <span class=\"history-meta svelte-1n46o8q\"> </span></div>"), pu = /* @__PURE__ */ V("<button class=\"ghost svelte-1n46o8q\"> </button> <!>", 1), mu = /* @__PURE__ */ V("<p class=\"panel-hint svelte-1n46o8q\"> </p> <button class=\"ghost svelte-1n46o8q\"> </button>", 1), hu = /* @__PURE__ */ V("<span class=\"update-arrow svelte-1n46o8q\"></span> <span class=\"badge svelte-1n46o8q\"> </span>", 1), gu = /* @__PURE__ */ V("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><p class=\"update-notes svelte-1n46o8q\"> </p></div></details>"), _u = /* @__PURE__ */ V("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"><span class=\"update-warn svelte-1n46o8q\"></span> </summary> <div class=\"group-items svelte-1n46o8q\"><pre class=\"update-headers svelte-1n46o8q\"> </pre></div></details>"), vu = /* @__PURE__ */ V("<span class=\"chip svelte-1n46o8q\"> </span>"), yu = /* @__PURE__ */ V("<div class=\"update-row svelte-1n46o8q\"><span class=\"update-path svelte-1n46o8q\"> </span> <span class=\"update-flags svelte-1n46o8q\"><!> <span class=\"update-warn svelte-1n46o8q\"></span></span></div>"), bu = /* @__PURE__ */ V("<div class=\"update-row svelte-1n46o8q\"><span class=\"update-path svelte-1n46o8q\"> </span> <!></div>"), xu = /* @__PURE__ */ V("<span class=\"update-warn svelte-1n46o8q\"></span>"), Su = /* @__PURE__ */ V("<div class=\"update-row svelte-1n46o8q\"><span> </span> <span class=\"update-flags svelte-1n46o8q\"><!> <!> <input type=\"checkbox\" class=\"svelte-1n46o8q\"/></span></div>"), Cu = /* @__PURE__ */ V("<div class=\"ctl-row update-opt-head svelte-1n46o8q\"><p class=\"panel-strong svelte-1n46o8q\"> </p> <span class=\"mini-label svelte-1n46o8q\"> </span></div> <!>", 1), wu = /* @__PURE__ */ V("<p class=\"update-summary svelte-1n46o8q\"> </p> <!> <!> <!> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"></div></details> <!> <button class=\"primary update-run svelte-1n46o8q\"> </button>", 1), Tu = /* @__PURE__ */ V("<div class=\"update-versions svelte-1n46o8q\"><span class=\"update-from svelte-1n46o8q\"> </span> <!></div> <!>", 1), Eu = /* @__PURE__ */ V("<aside class=\"panel svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <!></aside>"), Du = /* @__PURE__ */ V("<nav class=\"rail svelte-1n46o8q\"><!> <span class=\"rail-settings svelte-1n46o8q\"><button></button> <!></span></nav> <!>", 1), Ou = /* @__PURE__ */ V("<div class=\"workspace svelte-1n46o8q\"><!> <div><div class=\"stage svelte-1n46o8q\"><iframe class=\"svelte-1n46o8q\"></iframe></div></div></div>"), ku = /* @__PURE__ */ V("<p class=\"loading svelte-1n46o8q\"> </p>"), Au = /* @__PURE__ */ V("<p class=\"panel-hint confirm-line svelte-1n46o8q\"> </p>"), ju = /* @__PURE__ */ V("<div class=\"setup-overlay svelte-1n46o8q\"><div class=\"setup-card svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <!> <!> <span class=\"setup-actions svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"primary svelte-1n46o8q\"> </button></span></div></div>"), Mu = /* @__PURE__ */ V("<div class=\"setup-overlay svelte-1n46o8q\"><div class=\"setup-card svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <p class=\"panel-hint svelte-1n46o8q\"> </p> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <p class=\"panel-hint svelte-1n46o8q\"> </p> <span class=\"setup-actions svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"primary svelte-1n46o8q\"> </button></span></div></div>"), Nu = /* @__PURE__ */ V("<div><span> </span> <button class=\"toast-x svelte-1n46o8q\">×</button></div>"), Pu = /* @__PURE__ */ V("<div class=\"block-menu svelte-1n46o8q\"><header class=\"block-menu-head svelte-1n46o8q\"><span> </span> <button class=\"ghost row-tool svelte-1n46o8q\"></button></header> <div class=\"panel-body block-menu-body svelte-1n46o8q\"><!></div></div>"), Fu = /* @__PURE__ */ V("<div class=\"editor svelte-1n46o8q\"><!> <header><span class=\"topbar-group svelte-1n46o8q\"><span class=\"brand svelte-1n46o8q\" title=\"Urd\"><svg class=\"brand-mark svelte-1n46o8q\" viewBox=\"0 0 40 40\" aria-hidden=\"true\"><path d=\"M12 32V10l16 6.5V32\" fill=\"none\" stroke=\"var(--urd-brand)\" stroke-width=\"3.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path></svg> <span class=\"brand-word svelte-1n46o8q\">Urd</span></span> <!> <!> <!></span> <span class=\"topbar-group topbar-right svelte-1n46o8q\"><!></span></header> <!> <!> <!> <!> <!></div>   <!>", 1);
function Iu(e, t) {
	Ke(t, !0);
	let n = (e, t = d, n = d) => {
		var r = tc(), i = I(r);
		Ur(i, 17, n, zr, (e, r, i) => {
			var a = ec(), s = F(a), l = F(s);
			{
				let e = /* @__PURE__ */ M(() => Y("tip.bg.changeType")), n = /* @__PURE__ */ M(() => o.map(([e, t]) => [e, t.labelKey ? Y(t.labelKey) : t.label]));
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
					onchange: (e) => On(t(), i, e)
				});
			}
			var u = L(l, 2), d = F(u);
			d.disabled = i === 0, G(d, () => c.up, !0), k(d);
			var f = L(d, 2);
			G(f, () => c.down, !0), k(f);
			var p = L(f, 2);
			G(p, () => c.cross, !0), k(p), k(u), k(s);
			var m = L(s, 2), h = (e) => {
				var n = Vs(), a = I(n), o = F(a), s = L(o);
				{
					let e = /* @__PURE__ */ M(Vn), n = /* @__PURE__ */ M(() => Y("tip.bg.layerColor"));
					Gi(s, {
						get value() {
							return z(r).props.value;
						},
						get tokens() {
							return z(e);
						},
						get label() {
							return z(n);
						},
						onchange: (e) => un(t(), i, "value", e)
					});
				}
				k(a);
				var c = L(a, 2), l = F(c), u = L(l), d = F(u);
				k(u), k(c);
				var f = L(c, 2);
				K(f), R((e, t, n) => {
					U(o, `${e ?? ""} `), U(l, `${t ?? ""} `), U(d, `${n ?? ""}%`), q(f, z(r).props.opacity ?? 1);
				}, [
					() => Y("lbl.color"),
					() => Y("lbl.strength"),
					() => Math.round((z(r).props.opacity ?? 1) * 100)
				]), B("input", f, (e) => un(t(), i, "opacity", Number(e.target.value))), H(e, n);
			}, g = (e) => {
				let n = /* @__PURE__ */ M(() => gn(z(r))), a = /* @__PURE__ */ M(() => z(n).stops.reduce((e, t) => e + Math.max(0, Number(t.share) || 0), 0));
				var o = Ks(), s = I(o), l = F(s), u = L(l);
				{
					let e = /* @__PURE__ */ M(() => z(n).kind ?? "linear"), r = /* @__PURE__ */ M(() => [["linear", Y("opt.grad.linear")], ["radial", Y("opt.grad.radial")]]);
					X(u, {
						get value() {
							return z(e);
						},
						get options() {
							return z(r);
						},
						onchange: (e) => bn(t(), i, e)
					});
				}
				k(s);
				var d = L(s, 2);
				Ur(d, 17, () => z(n).stops, zr, (e, r, o) => {
					var s = Us();
					let l;
					var u = F(s), d = L(u, 2);
					{
						let e = /* @__PURE__ */ M(Vn), n = /* @__PURE__ */ M(() => Y("tip.bg.stopColor"));
						Gi(d, {
							get value() {
								return z(r).color;
							},
							get tokens() {
								return z(e);
							},
							get label() {
								return z(n);
							},
							onchange: (e) => xn(t(), i, o, { color: e })
						});
					}
					var f = L(d, 2);
					K(f);
					var p = L(f, 2), m = F(p);
					k(p);
					var h = L(p, 2), g = (e) => {
						var n = Hs();
						G(n, () => c.cross, !0), k(n), R((e) => J(n, "title", e), [() => Y("tip.bg.removeStop")]), B("click", n, () => wn(t(), i, o)), H(e, n);
					};
					W(h, (e) => {
						z(n).stops.length > 2 && e(g);
					}), k(s), R((e, t, a) => {
						l = ei(s, 1, "nav-line grad-stop svelte-1n46o8q", null, l, {
							dragging: z(En)?.layer === i && z(En).from === o,
							"drop-above": z(En)?.layer === i && z(En).insert === o,
							"drop-below": z(En)?.layer === i && z(En).insert === z(n).stops.length && o === z(n).stops.length - 1
						}), J(u, "title", e), q(f, z(r).share ?? 50), J(f, "title", t), U(m, `${a ?? ""}%`);
					}, [
						() => Y("tip.bg.dragStop"),
						() => Y("tip.bg.stopShare"),
						() => z(a) > 0 ? Math.round(Math.max(0, Number(z(r).share) || 0) / z(a) * 100) : Math.round(100 / z(n).stops.length)
					]), B("pointerdown", u, (e) => Dn(t(), e, i, o)), B("input", f, (e) => xn(t(), i, o, { share: Number(e.target.value) })), H(e, s);
				});
				var f = L(d, 2), p = F(f, !0);
				k(f);
				var m = L(f, 2), h = (e) => {
					var r = Ws(), a = I(r), o = F(a), s = L(o), c = F(s);
					k(s), k(a);
					var l = L(a, 2);
					K(l);
					var u = L(l, 2), d = F(u), f = L(d), p = F(f);
					k(f), k(u);
					var m = L(u, 2);
					K(m), R((e, t, r, i) => {
						U(o, `${e ?? ""} `), U(c, `${t ?? ""}%`), q(l, z(n).x ?? .5), U(d, `${r ?? ""} `), U(p, `${i ?? ""}%`), q(m, z(n).y ?? .5);
					}, [
						() => Y("lbl.centerX"),
						() => Math.round((z(n).x ?? .5) * 100),
						() => Y("lbl.centerY"),
						() => Math.round((z(n).y ?? .5) * 100)
					]), B("input", l, (e) => vn(t(), i, "x", Number(e.target.value))), B("input", m, (e) => vn(t(), i, "y", Number(e.target.value))), H(e, r);
				}, g = (e) => {
					var r = Gs(), a = I(r), o = F(a), s = L(o), c = F(s);
					k(s), k(a);
					var l = L(a, 2);
					K(l), R((e) => {
						U(o, `${e ?? ""} `), U(c, `${z(n).angle ?? ""}°`), q(l, z(n).angle);
					}, [() => Y("lbl.angle")]), B("input", l, (e) => vn(t(), i, "angle", Number(e.target.value))), H(e, r);
				};
				W(m, (e) => {
					(z(n).kind ?? "linear") === "radial" ? e(h) : e(g, -1);
				});
				var _ = L(m, 2), v = F(_), y = L(v), b = F(y);
				k(y), k(_);
				var x = L(_, 2);
				K(x);
				var S = L(x, 2), C = F(S), ee = L(C);
				{
					let e = /* @__PURE__ */ M(() => z(n).animation ?? "none");
					X(ee, {
						get value() {
							return z(e);
						},
						get options() {
							return yn[(z(n).kind ?? "linear") === "radial" ? "radial" : "linear"];
						},
						onchange: (e) => vn(t(), i, "animation", e)
					});
				}
				k(S), R((e, t, r, i, a, o, s) => {
					U(l, `${e ?? ""} `), J(f, "title", t), U(p, r), U(v, `${i ?? ""} `), U(b, `${a ?? ""}%`), q(x, z(n).opacity ?? 1), J(S, "title", o), U(C, `${s ?? ""} `);
				}, [
					() => Y("blocks.shape"),
					() => Y("tip.bg.addStop"),
					() => Y("ui.addStop"),
					() => Y("lbl.strength"),
					() => Math.round((z(n).opacity ?? 1) * 100),
					() => Y("tip.bg.motion"),
					() => Y("lbl.motion")
				]), B("click", f, () => Cn(t(), i)), B("input", x, (e) => vn(t(), i, "opacity", Number(e.target.value))), H(e, o);
			}, _ = (e) => {
				var n = qs(), a = I(n), o = F(a), s = L(o);
				{
					let e = /* @__PURE__ */ M(Vn), n = /* @__PURE__ */ M(() => Y("tip.bg.glowColor"));
					Gi(s, {
						get value() {
							return z(r).props.color;
						},
						get tokens() {
							return z(e);
						},
						get label() {
							return z(n);
						},
						onchange: (e) => un(t(), i, "color", e)
					});
				}
				k(a);
				var c = L(a, 2), l = F(c), u = L(l), d = F(u);
				k(u), k(c);
				var f = L(c, 2);
				K(f);
				var p = L(f, 2), m = F(p), h = L(m), g = F(h);
				k(h), k(p);
				var _ = L(p, 2);
				K(_);
				var v = L(_, 2), y = F(v), b = L(y), x = F(b);
				k(b), k(v);
				var S = L(v, 2);
				K(S);
				var C = L(S, 2), ee = F(C), w = L(ee), te = F(w);
				k(w), k(C);
				var T = L(C, 2);
				K(T), R((e, t, n, i, a, s, c, u, p) => {
					U(o, `${e ?? ""} `), U(l, `${t ?? ""} `), U(d, `${n ?? ""}%`), q(f, z(r).props.x), U(m, `${i ?? ""} `), U(g, `${a ?? ""}%`), q(_, z(r).props.y), U(y, `${s ?? ""} `), U(x, `${c ?? ""}%`), q(S, z(r).props.radius), U(ee, `${u ?? ""} `), U(te, `${p ?? ""}%`), q(T, z(r).props.opacity);
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
				]), B("input", f, (e) => un(t(), i, "x", Number(e.target.value))), B("input", _, (e) => un(t(), i, "y", Number(e.target.value))), B("input", S, (e) => un(t(), i, "radius", Number(e.target.value))), B("input", T, (e) => un(t(), i, "opacity", Number(e.target.value))), H(e, n);
			}, v = (e) => {
				var n = Js(), a = I(n), o = F(a), s = L(o), c = F(s);
				k(s), k(a);
				var l = L(a, 2);
				K(l), R((e, t) => {
					U(o, `${e ?? ""} `), U(c, `${t ?? ""}%`), q(l, z(r).props.opacity);
				}, [() => Y("lbl.strength"), () => Math.round(z(r).props.opacity * 100)]), B("input", l, (e) => un(t(), i, "opacity", Number(e.target.value))), H(e, n);
			}, y = (e) => {
				let n = /* @__PURE__ */ M(() => z(r).props.fit === "flislegg" || z(r).props.fit === "repeat");
				var a = Zs(), o = I(a), s = F(o), c = L(s);
				k(o);
				var l = L(o, 2), u = F(l), d = L(u);
				{
					let e = /* @__PURE__ */ M(() => z(n) ? "flislegg" : "vanlig"), r = /* @__PURE__ */ M(() => [["vanlig", Y("opt.img.plain")], ["flislegg", Y("opt.img.tile")]]);
					X(d, {
						get value() {
							return z(e);
						},
						get options() {
							return z(r);
						},
						onchange: (e) => un(t(), i, "fit", e)
					});
				}
				k(l);
				var f = L(l, 2), p = F(f, !0);
				k(f);
				var m = L(f, 2), h = F(m), g = L(h, 2);
				K(g);
				var _ = L(g, 4);
				k(m);
				var v = L(m, 2), y = (e) => {
					var n = Ys(), a = I(n), o = F(a), s = F(o, !0);
					k(o);
					var c = L(o, 2), l = F(c, !0);
					k(c), k(a);
					var u = L(a, 2), d = F(u, !0);
					k(u);
					var f = L(u, 2), p = L(f, 2), m = F(p), h = L(m), g = F(h);
					k(h), k(p);
					var _ = L(p, 2);
					K(_);
					var v = L(_, 2), y = F(v), b = L(y), x = F(b);
					k(b), k(v);
					var S = L(v, 2);
					K(S), R((e, t, n, i, a, p, h, v, b, C, ee, w) => {
						J(o, "title", e), U(s, t), J(c, "title", n), U(l, i), J(u, "title", a), U(d, p), ni(f, `--fx:${h ?? ""}%; --fy:${v ?? ""}%`), U(m, `${b ?? ""} `), U(g, `${C ?? ""}%`), q(_, z(r).props.x ?? .5), U(y, `${ee ?? ""} `), U(x, `${w ?? ""}%`), q(S, z(r).props.y ?? .5);
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
					]), B("click", o, () => hn(t(), i, z(r), "cover")), B("click", c, () => hn(t(), i, z(r), "contain")), B("pointerdown", f, (e) => dn(e, t(), i, "xy")), B("input", _, (e) => un(t(), i, "x", Number(e.target.value))), B("input", S, (e) => un(t(), i, "y", Number(e.target.value))), H(e, n);
				};
				W(v, (e) => {
					z(n) || e(y);
				});
				var b = L(v, 2), x = F(b), S = L(x), C = F(S);
				k(S), k(b);
				var ee = L(b, 2);
				K(ee);
				var w = L(ee, 2), te = F(w), T = L(te), ne = F(T);
				k(T), k(w);
				var re = L(w, 2);
				K(re);
				var ie = L(re, 2), ae = F(ie);
				K(ae);
				var oe = L(ae);
				k(ie);
				var se = L(ie, 2), ce = (e) => {
					var n = Xs(), a = I(n), o = F(a), s = L(o), c = F(s);
					k(s), k(a);
					var l = L(a, 2);
					K(l);
					var u = L(l, 2), d = F(u), f = L(d);
					{
						let e = /* @__PURE__ */ M(() => z(r).props.bleed ?? "none"), n = /* @__PURE__ */ M(() => [
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
							onchange: (e) => un(t(), i, "bleed", e)
						});
					}
					k(u), R((e, t, n, i) => {
						U(o, `${e ?? ""} `), U(c, `${t ?? ""}%`), q(l, z(r).props.parallax ?? .3), J(u, "title", n), U(d, `${i ?? ""} `);
					}, [
						() => Y("lbl.parallaxStrength"),
						() => Math.round((z(r).props.parallax ?? 0) * 100),
						() => Y("tip.bg.bleed"),
						() => Y("lbl.bleed")
					]), B("input", l, (e) => un(t(), i, "parallax", Number(e.target.value))), H(e, n);
				};
				W(se, (e) => {
					(z(r).props.parallax ?? 0) > 0 && e(ce);
				}), R((e, t, n, i, a, c, d, m, v, y, b, S, w, T) => {
					J(o, "title", e), U(s, `${t ?? ""} `), J(l, "title", n), U(u, `${i ?? ""} `), J(f, "title", a), U(p, c), J(h, "title", d), q(g, m), J(_, "title", v), U(x, `${y ?? ""} `), U(C, `${z(r).props.blur ?? 0 ?? ""} px`), q(ee, z(r).props.blur ?? 0), U(te, `${b ?? ""} `), U(ne, `${S ?? ""}%`), q(re, z(r).props.opacity ?? 1), J(ie, "title", w), si(ae, (z(r).props.parallax ?? 0) > 0), U(oe, ` ${T ?? ""}`);
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
				]), B("change", c, (e) => Mn(t(), i, e)), B("click", h, () => pn(t(), i, z(r).props.size ?? 1, -.05)), B("change", g, (e) => mn(t(), i, e.target.value)), B("click", _, () => pn(t(), i, z(r).props.size ?? 1, .05)), B("input", ee, (e) => un(t(), i, "blur", Number(e.target.value))), B("input", re, (e) => un(t(), i, "opacity", Number(e.target.value))), B("change", ae, (e) => un(t(), i, "parallax", e.target.checked ? .3 : 0)), H(e, a);
			}, b = (e) => {
				var n = $s(), a = I(n), o = F(a), s = L(o);
				k(a);
				var l = L(a, 2);
				Ur(l, 17, () => z(r).props.images ?? [], zr, (e, n, a) => {
					var o = Qs(), s = I(o), l = F(s), u = L(l, 2), d = F(u);
					d.disabled = a === 0, G(d, () => c.up, !0), k(d);
					var f = L(d, 2);
					G(f, () => c.down, !0), k(f);
					var p = L(f, 2);
					G(p, () => c.cross, !0), k(p), k(u), k(s);
					var m = L(s, 2), h = F(m), g = L(h), _ = F(g);
					k(g), k(m);
					var v = L(m, 2);
					K(v);
					var y = L(v, 2), b = F(y), x = L(b), S = F(x);
					k(x), k(y);
					var C = L(y, 2);
					K(C), R((e, t, i, o, s) => {
						J(l, "src", z(n).src), f.disabled = a === z(r).props.images.length - 1, J(p, "title", e), U(h, `${t ?? ""} `), U(_, `${i ?? ""}%`), q(v, z(n).x ?? .5), U(b, `${o ?? ""} `), U(S, `${s ?? ""}%`), q(C, z(n).y ?? .5);
					}, [
						() => Y("tip.removeImage"),
						() => Y("lbl.focusX"),
						() => Math.round((z(n).x ?? .5) * 100),
						() => Y("lbl.focusY"),
						() => Math.round((z(n).y ?? .5) * 100)
					]), B("click", d, () => Pn(t(), i, a, -1)), B("click", f, () => Pn(t(), i, a, 1)), B("click", p, () => Fn(t(), i, a)), B("input", v, (e) => In(t(), i, a, "x", Number(e.target.value))), B("input", C, (e) => In(t(), i, a, "y", Number(e.target.value))), H(e, o);
				});
				var u = L(l, 2), d = F(u), f = L(d);
				{
					let e = /* @__PURE__ */ M(() => z(r).props.fit ?? "cover"), n = /* @__PURE__ */ M(() => [["cover", Y("opt.fit.cover")], ["contain", Y("opt.fit.contain")]]);
					X(f, {
						get value() {
							return z(e);
						},
						get options() {
							return z(n);
						},
						onchange: (e) => un(t(), i, "fit", e)
					});
				}
				k(u);
				var p = L(u, 2), m = F(p), h = L(m);
				K(h), k(p);
				var g = L(p, 2), _ = F(g), v = L(_), y = F(v);
				k(v), k(g);
				var b = L(g, 2);
				K(b);
				var x = L(b, 2), S = F(x), C = L(S), ee = F(C);
				k(C), k(x);
				var w = L(x, 2);
				K(w);
				var te = L(w, 2), T = F(te), ne = L(T), re = F(ne);
				k(ne), k(te);
				var ie = L(te, 2);
				K(ie);
				var ae = L(ie, 2), oe = F(ae, !0);
				k(ae), R((e, t, n, i, s, c, l, u, f, g, v) => {
					J(a, "title", e), U(o, `${t ?? ""} `), U(d, `${n ?? ""} `), J(p, "title", i), U(m, `${s ?? ""} `), q(h, z(r).props.interval ?? 6), U(_, `${c ?? ""} `), U(y, `${l ?? ""} s`), q(b, z(r).props.fade ?? 1.5), U(S, `${u ?? ""} `), U(ee, `${z(r).props.blur ?? 0 ?? ""} px`), q(w, z(r).props.blur ?? 0), U(T, `${f ?? ""} `), U(re, `${g ?? ""}%`), q(ie, z(r).props.opacity ?? 1), U(oe, v);
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
				]), B("change", s, (e) => Nn(t(), i, e)), B("change", h, (e) => un(t(), i, "interval", Number(e.target.value))), B("input", b, (e) => un(t(), i, "fade", Number(e.target.value))), B("input", w, (e) => un(t(), i, "blur", Number(e.target.value))), B("input", ie, (e) => un(t(), i, "opacity", Number(e.target.value))), H(e, n);
			};
			W(m, (e) => {
				z(r).type === "color" ? e(h) : z(r).type === "gradient" ? e(g, 1) : z(r).type === "glow" ? e(_, 2) : z(r).type === "grain" ? e(v, 3) : z(r).type === "image" ? e(y, 4) : z(r).type === "bildegalleri" && e(b, 5);
			}), k(a), R((e, t, r) => {
				J(d, "title", e), J(f, "title", t), f.disabled = i === n().length - 1, J(p, "title", r);
			}, [
				() => Y("hint.bg.order"),
				() => Y("hint.bg.order"),
				() => Y("tip.bg.removeLayer")
			]), B("click", d, () => ln(t(), i, -1)), B("click", f, () => ln(t(), i, 1)), B("click", p, () => cn(t(), i)), H(e, a);
		});
		var a = L(i, 2), s = F(a), l = L(s);
		{
			let e = /* @__PURE__ */ M(() => o.map(([e, t]) => [e, t.labelKey ? Y(t.labelKey) : t.label]));
			X(l, {
				get value() {
					return z(on);
				},
				get options() {
					return z(e);
				},
				onchange: (e) => P(on, e, !0)
			});
		}
		k(a);
		var u = L(a, 2), f = F(u, !0);
		k(u), R((e, t) => {
			U(s, `${e ?? ""} `), U(f, t);
		}, [() => Y("lbl.newLayer"), () => Y("ui.addLayer")]), B("click", u, () => sn(t(), z(on))), H(e, r);
	}, r = (e, t = d, n = d) => {
		var r = Nr();
		Ur(I(r), 17, n, zr, (e, r, i) => {
			var a = rc(), o = F(a);
			K(o);
			var s = L(o, 2), l = F(s);
			l.disabled = i === 0, G(l, () => c.up, !0), k(l);
			var u = L(l, 2);
			G(u, () => c.down, !0), k(u);
			var d = L(u, 2);
			G(d, () => c.cross, !0), k(d), k(s);
			var f = L(s, 2), p = F(f);
			{
				let e = /* @__PURE__ */ M(() => z(r).page ?? "__href"), n = /* @__PURE__ */ M(() => Y("tip.linkTarget")), a = /* @__PURE__ */ M(() => [...z(O).pages.map((e) => [e.id, e.title]), ["__href", Y("opt.linkHref")]]);
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
					onchange: (e) => So(t(), i, e)
				});
			}
			k(f);
			var m = L(f, 2), h = (e) => {
				var n = nc();
				K(n), R((e, t) => {
					q(n, z(r).href ?? ""), J(n, "placeholder", e), J(n, "title", t);
				}, [() => Y("ph.hrefAnchor"), () => Y("tip.hrefAnchor")]), B("change", n, (e) => Co(t(), i, e.target.value)), H(e, n);
			};
			W(m, (e) => {
				z(r).page || e(h);
			}), k(a), R((e, t) => {
				q(o, z(r).label), J(o, "title", e), u.disabled = i === n().length - 1, J(d, "title", t);
			}, [() => Y("tip.linkLabel"), () => Y("tip.removeLink")]), B("input", o, (e) => xo(t(), i, e.target.value)), B("click", l, () => bo(t(), i, -1)), B("click", u, () => bo(t(), i, 1)), B("click", d, () => yo(t(), i)), H(e, a);
		}), H(e, r);
	}, i = (e) => {
		let t = /* @__PURE__ */ M(() => z(A).props.boxStyle ?? {});
		var n = oc(), r = I(n), i = F(r), a = L(i);
		{
			let e = /* @__PURE__ */ M(() => z(t).bg ?? ""), n = /* @__PURE__ */ M(Vn), r = /* @__PURE__ */ M(() => Y("tip.box.bg"));
			Gi(a, {
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
				onchange: (e) => Ot({ bg: e || null })
			});
		}
		k(r);
		var o = L(r, 2), s = F(o), c = L(s);
		{
			let e = /* @__PURE__ */ M(() => z(t).shadow ?? ""), n = /* @__PURE__ */ M(() => [
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
				onchange: (e) => Ot({ shadow: e || null })
			});
		}
		k(o);
		var l = L(o, 2), u = (e) => {
			var n = ic(), r = F(n), i = L(r);
			{
				let e = /* @__PURE__ */ M(() => z(t).shadowColor ?? ""), n = /* @__PURE__ */ M(Vn), r = /* @__PURE__ */ M(() => Y("tip.box.shadowColor"));
				Gi(i, {
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
					onchange: (e) => Ot({ shadowColor: e || null })
				});
			}
			k(n), R((e) => U(r, `${e ?? ""} `), [() => Y("lbl.shadowColor")]), H(e, n);
		};
		W(l, (e) => {
			z(t).shadow && e(u);
		});
		var d = L(l, 2), f = F(d), p = L(f);
		{
			let e = /* @__PURE__ */ M(() => z(t).border === "none" ? "none" : z(t).border ? "custom" : ""), n = /* @__PURE__ */ M(() => [
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
				onchange: (e) => Ot({ border: e === "custom" ? {
					color: "accent",
					width: 1
				} : e || null })
			});
		}
		k(d);
		var m = L(d, 2), h = (e) => {
			let n = /* @__PURE__ */ M(() => typeof z(t).border == "object" ? z(t).border : {
				color: "text",
				width: 1
			});
			var r = ac(), i = I(r), a = F(i), o = L(a);
			{
				let e = /* @__PURE__ */ M(Vn), t = /* @__PURE__ */ M(() => Y("tip.box.borderColor"));
				Gi(o, {
					get value() {
						return z(n).color;
					},
					get tokens() {
						return z(e);
					},
					get label() {
						return z(t);
					},
					onchange: (e) => Ot({ border: {
						...z(n),
						color: e
					} })
				});
			}
			k(i);
			var s = L(i, 2), c = F(s), l = L(c), u = F(l), d = L(u, 2);
			K(d);
			var f = L(d, 2);
			k(l), k(s), R((e, t, r, i, o, s) => {
				U(a, `${e ?? ""} `), U(c, `${t ?? ""} `), J(u, "title", r), J(u, "aria-label", i), q(d, z(n).width), J(f, "title", o), J(f, "aria-label", s);
			}, [
				() => Y("lbl.borderColor"),
				() => Y("lbl.thicknessPx"),
				() => Y("tip.thinner"),
				() => Y("tip.thinner"),
				() => Y("tip.thicker"),
				() => Y("tip.thicker")
			]), B("click", u, () => Ot({ border: {
				...z(n),
				width: Math.max(1, z(n).width - 1)
			} })), B("change", d, (e) => Ot({ border: {
				...z(n),
				width: Math.min(12, Math.max(1, Number(e.target.value) || 1))
			} })), B("click", f, () => Ot({ border: {
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
		k(g), R((e, t, n, r, a, o) => {
			U(i, `${e ?? ""} `), U(s, `${t ?? ""} `), U(f, `${n ?? ""} `), J(g, "title", r), si(_, a), U(v, ` ${o ?? ""}`);
		}, [
			() => Y("lbl.blockColor"),
			() => Y("lbl.shadow"),
			() => Y("lbl.border"),
			() => Y("tip.box.glass"),
			() => !!z(t).glass,
			() => Y("lbl.glass")
		]), B("change", _, (e) => Ot({ glass: e.target.checked || null })), H(e, n);
	}, a = (e) => {
		var t = Jc(), n = I(t), r = F(n), a = F(r);
		let o;
		var s = F(a, !0);
		k(a);
		var l = L(a, 2);
		let u;
		var d = F(l, !0);
		k(l), k(r), k(n);
		var f = L(n, 2), p = (e) => {
			var t = Nr(), n = I(t), r = (e) => {
				var t = sc(), n = F(t, !0);
				k(t), R((e) => U(n, e), [() => Y("hint.textInline")]), H(e, t);
			}, i = (e) => {
				var t = lc(), n = I(t), r = F(n);
				K(r);
				var i = L(r);
				k(n);
				var a = L(n, 2), o = F(a, !0);
				k(a);
				var s = L(a, 2);
				Ur(s, 17, () => z(A).props.items ?? [], zr, (e, t, n) => {
					var r = cc(), i = F(r);
					K(i);
					var a = L(i, 2), o = F(a);
					o.disabled = n === 0, G(o, () => c.up, !0), k(o);
					var s = L(o, 2);
					G(s, () => c.down, !0), k(s);
					var l = L(s, 2);
					G(l, () => c.cross, !0), k(l), k(a), k(r), R((e, r) => {
						q(i, z(t).q), J(i, "title", e), s.disabled = n === (z(A).props.items?.length ?? 0) - 1, J(l, "title", r);
					}, [() => Y("tip.faq.question"), () => Y("tip.faq.remove")]), B("change", i, (e) => kt(n, { q: e.target.value })), B("click", o, () => Mt(n, -1)), B("click", s, () => Mt(n, 1)), B("click", l, () => jt(n)), H(e, r);
				});
				var l = L(s, 2), u = F(l, !0);
				k(l), R((e, t, a, s, c) => {
					J(n, "title", e), si(r, t), U(i, ` ${a ?? ""}`), U(o, s), U(u, c);
				}, [
					() => Y("tip.faq.multi"),
					() => !!z(A).props.multi,
					() => Y("lbl.faqMulti"),
					() => Y("lbl.questions"),
					() => Y("ui.addQuestion")
				]), B("change", r, (e) => j("multi", e.target.checked)), B("click", l, At), H(e, t);
			}, a = (e) => {
				var t = dc(), n = I(t), r = F(n, !0);
				k(n);
				var i = L(n, 2);
				Ur(i, 17, () => z(A).props.items ?? [], zr, (e, t, n) => {
					var r = uc(), i = I(r), a = F(i);
					K(a);
					var o = L(a, 2);
					K(o);
					var s = L(o, 2), l = F(s);
					l.disabled = n === 0, G(l, () => c.up, !0), k(l);
					var u = L(l, 2);
					G(u, () => c.down, !0), k(u);
					var d = L(u, 2);
					G(d, () => c.cross, !0), k(d), k(s), k(i);
					var f = L(i, 2);
					K(f), R((e, r, i, s, c, l) => {
						q(a, z(t).year), J(a, "placeholder", e), J(a, "title", r), q(o, z(t).title), J(o, "title", i), u.disabled = n === (z(A).props.items?.length ?? 0) - 1, J(d, "title", s), q(f, z(t).text), J(f, "placeholder", c), J(f, "title", l);
					}, [
						() => Y("ph.tlYear"),
						() => Y("tip.tl.year"),
						() => Y("tip.tl.title"),
						() => Y("tip.tl.remove"),
						() => Y("ph.tlText"),
						() => Y("tip.tl.text")
					]), B("change", a, (e) => Nt(n, { year: e.target.value })), B("change", o, (e) => Nt(n, { title: e.target.value })), B("click", l, () => It(n, -1)), B("click", u, () => It(n, 1)), B("click", d, () => Ft(n)), B("change", f, (e) => Nt(n, { text: e.target.value })), H(e, r);
				});
				var a = L(i, 2), o = F(a, !0);
				k(a), R((e, t) => {
					U(r, e), U(o, t);
				}, [() => Y("lbl.tlItems"), () => Y("ui.addTlItem")]), B("click", a, Pt), H(e, t);
			}, o = (e) => {
				var t = fc(), n = I(t), r = F(n), i = L(r);
				K(i), k(n);
				var a = L(n, 2), o = F(a), s = L(o);
				K(s), k(a);
				var c = L(a, 2), l = F(c), u = L(l);
				K(u), k(c), R((e, t, n) => {
					U(r, `${e ?? ""} `), q(i, z(A).props.text ?? ""), U(o, `${t ?? ""} `), q(s, z(A).props.attribution ?? ""), U(l, `${n ?? ""} `), q(u, z(A).props.role ?? "");
				}, [
					() => Y("lbl.sitatText"),
					() => Y("lbl.sitatName"),
					() => Y("lbl.sitatRole")
				]), B("change", i, (e) => j("text", e.target.value)), B("change", s, (e) => j("attribution", e.target.value)), B("change", u, (e) => j("role", e.target.value)), H(e, t);
			}, s = (e) => {
				var t = pc(), n = I(t), r = F(n), i = L(r);
				K(i), k(n);
				var a = L(n, 2), o = F(a), s = L(o);
				K(s), k(a);
				var c = L(a, 2), l = F(c), u = L(l);
				K(u), k(c);
				var d = L(c, 2), f = F(d), p = L(f);
				K(p), k(d), R((e, t, n, a, c) => {
					U(r, `${e ?? ""} `), q(i, z(A).props.value ?? ""), J(i, "title", t), U(o, `${n ?? ""} `), q(s, z(A).props.prefix ?? ""), U(l, `${a ?? ""} `), q(u, z(A).props.suffix ?? ""), U(f, `${c ?? ""} `), q(p, z(A).props.label ?? "");
				}, [
					() => Y("lbl.statValue"),
					() => Y("tip.stat.value"),
					() => Y("lbl.statPrefix"),
					() => Y("lbl.statSuffix"),
					() => Y("lbl.statLabel")
				]), B("change", i, (e) => j("value", e.target.value)), B("change", s, (e) => j("prefix", e.target.value)), B("change", u, (e) => j("suffix", e.target.value)), B("change", p, (e) => j("label", e.target.value)), H(e, t);
			}, l = (e) => {
				var t = hc(), n = I(t), r = F(n), i = L(r);
				K(i), k(n);
				var a = L(n, 2), o = F(a), s = L(o);
				{
					let e = /* @__PURE__ */ M(() => z(A).props.page ?? "__href"), t = /* @__PURE__ */ M(() => [...z(O).pages.map((e) => [e.id, e.title]), ["__href", Y("opt.externalLink")]]);
					X(s, {
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => {
							let t = e === "__href" ? null : e;
							yt(`edit:${z(A).blockId}`, (e) => {
								e.props.page = t, t && (e.props.href = null);
							});
						}
					});
				}
				k(a);
				var c = L(a, 2), l = (e) => {
					var t = mc();
					K(t), R((e) => {
						J(t, "placeholder", e), q(t, z(A).props.href === "#" ? "" : z(A).props.href ?? "");
					}, [() => Y("ph.url")]), B("change", t, (e) => j("href", e.target.value || null)), H(e, t);
				};
				W(c, (e) => {
					z(A).props.page || e(l);
				}), R((e, t) => {
					U(r, `${e ?? ""} `), q(i, z(A).props.label), U(o, `${t ?? ""} `);
				}, [() => Y("blocks.text"), () => Y("lbl.goesTo")]), B("change", i, (e) => j("label", e.target.value)), H(e, t);
			}, u = (e) => {
				var t = _c(), n = I(t), r = F(n), i = L(r);
				k(n);
				var a = L(n, 2), o = F(a), s = L(o);
				K(s), k(a);
				var c = L(a, 2), l = F(c), u = L(l);
				K(u), k(c);
				var d = L(c, 2), f = (e) => {
					var t = gc(), n = F(t);
					K(n);
					var r = L(n);
					k(t), R((e, i, a) => {
						J(t, "title", e), si(n, i), U(r, ` ${a ?? ""}`);
					}, [
						() => Y("tip.lightbox"),
						() => !!z(A).props.lightbox,
						() => Y("lbl.lightbox")
					]), B("change", n, (e) => j("lightbox", e.target.checked)), H(e, t);
				};
				W(d, (e) => {
					z(A).props.href || e(f);
				}), R((e, t, n, i, a) => {
					U(r, `${e ?? ""} `), U(o, `${t ?? ""} `), q(s, z(A).props.alt ?? ""), J(s, "placeholder", n), U(l, `${i ?? ""} `), q(u, z(A).props.href ?? ""), J(u, "placeholder", a);
				}, [
					() => Y("ui.changeImage"),
					() => Y("lbl.description"),
					() => Y("ph.altText"),
					() => Y("lbl.link"),
					() => Y("ph.optionalImageLink")
				]), B("change", i, Rt), B("change", s, (e) => j("alt", e.target.value)), B("change", u, (e) => j("href", e.target.value || null)), H(e, t);
			}, d = (e) => {
				var t = vc(), n = I(t), r = F(n, !0);
				k(n);
				var i = L(n, 2);
				K(i);
				var a = L(i, 2), o = F(a), s = L(o);
				K(s), k(a), R((e, t, a, c) => {
					J(n, "title", e), U(r, t), q(i, z(A).props.url ?? ""), J(i, "placeholder", a), U(o, `${c ?? ""} `), q(s, z(A).props.title ?? "");
				}, [
					() => Y("hint.video"),
					() => Y("lbl.videoUrl"),
					() => Y("ph.videoUrl"),
					() => Y("lbl.videoTitle")
				]), B("change", i, (e) => j("url", e.target.value)), B("change", s, (e) => j("title", e.target.value)), H(e, t);
			}, f = (e) => {
				var t = Sc(), n = I(t), r = F(n), i = L(r), a = F(i);
				{
					let e = /* @__PURE__ */ M(() => z(A).props.glyph ?? "★"), t = /* @__PURE__ */ M(() => z(A).props.icon ?? null), n = /* @__PURE__ */ M(() => z(A).props.image ?? null);
					Ca(a, {
						get value() {
							return z(e);
						},
						get icon() {
							return z(t);
						},
						get image() {
							return z(n);
						},
						onpick: (e) => yt(`edit:${z(A).blockId}`, (t) => {
							t.props.glyph = e, t.props.icon = null, t.props.image = null;
						}),
						onicon: (e) => yt(`edit:${z(A).blockId}`, (t) => {
							t.props.icon = e, t.props.image = null;
						}),
						onimage: (e) => j("image", e)
					});
				}
				var o = L(a, 2), s = (e) => {
					var t = yc();
					K(t), R((e) => {
						q(t, z(A).props.glyph ?? ""), J(t, "title", e);
					}, [() => Y("tip.icon.typeGlyph")]), B("change", t, (e) => j("glyph", e.target.value || "★")), H(e, t);
				}, c = (e) => {
					var t = bc(), n = F(t, !0);
					k(t), R((e, r) => {
						J(t, "title", e), U(n, r);
					}, [() => Y("tip.icon.backToGlyph"), () => Y("ui.removeDrawnIcon")]), B("click", t, () => j("icon", null)), H(e, t);
				};
				W(o, (e) => {
					z(A).props.icon ? e(c, -1) : e(s);
				}), k(i), k(n);
				var l = L(n, 2), u = (e) => {
					var t = xc(), n = F(t), r = L(n, 2), i = F(r, !0);
					k(r), k(t), R((e, r, a) => {
						J(t, "title", e), J(n, "src", z(A).props.image), J(n, "alt", r), U(i, a);
					}, [
						() => Y("hint.icon.ownImage"),
						() => Y("gp.ownIcon"),
						() => Y("ui.removeOwnIcon")
					]), B("click", r, () => j("image", null)), H(e, t);
				};
				W(l, (e) => {
					z(A).props.image && e(u);
				}), R((e) => U(r, `${e ?? ""} `), [() => Y("blocks.icon")]), H(e, t);
			}, p = (e) => {
				var t = Cc(), n = I(t), r = F(n), i = L(r);
				{
					let e = /* @__PURE__ */ M(() => z(A).props.collection ?? ""), t = /* @__PURE__ */ M(() => [["", Y("common.choose")], ...z(Hi).map((e) => [e, z(Ui)[e]?.name ?? e])]);
					X(i, {
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => j("collection", e || null)
					});
				}
				k(n);
				var a = L(n, 2), o = F(a), s = L(o);
				K(s), k(a);
				var c = L(a, 2), l = F(c);
				K(l);
				var u = L(l);
				k(c), R((e, t, i, c, d) => {
					J(n, "title", e), U(r, `${t ?? ""} `), J(a, "title", i), U(o, `${c ?? ""} `), q(s, z(A).props.limit ?? 6), si(l, z(A).props.newestFirst !== !1), U(u, ` ${d ?? ""}`);
				}, [
					() => Y("tip.samling.source"),
					() => Y("blocks.samling"),
					() => Y("tip.samling.limit"),
					() => Y("lbl.maxCount"),
					() => Y("lbl.newestFirst")
				]), B("change", s, (e) => j("limit", Number(e.target.value))), B("change", l, (e) => j("newestFirst", e.target.checked)), H(e, t);
			}, m = (e) => {
				var t = Tc(), n = I(t), r = F(n), i = L(r);
				k(n), Ur(L(n, 2), 17, () => z(A).props.images ?? [], zr, (e, t, n) => {
					var r = wc(), i = F(r), a = F(i), o = L(a, 2), s = F(o);
					s.disabled = n === 0, G(s, () => c.up, !0), k(s);
					var l = L(s, 2);
					G(l, () => c.down, !0), k(l);
					var u = L(l, 2);
					G(u, () => c.cross, !0), k(u), k(o), k(i);
					var d = L(i, 2), f = F(d), p = L(f);
					K(p), k(d);
					var m = L(d, 2), h = F(m), g = L(h);
					K(g), k(m), k(r), R((e, r, o, s, c, d) => {
						J(i, "title", e), J(a, "src", z(t).src), l.disabled = n === z(A).props.images.length - 1, J(u, "title", r), U(f, `${o ?? ""} `), q(p, z(t).alt ?? ""), J(p, "placeholder", s), U(h, `${c ?? ""} `), q(g, z(t).href ?? ""), J(g, "placeholder", d);
					}, [
						() => Y("hint.gallery"),
						() => Y("tip.removeImage"),
						() => Y("lbl.description"),
						() => Y("ph.altShort"),
						() => Y("lbl.link"),
						() => Y("ph.galleryHref")
					]), B("click", s, () => ud(n, -1)), B("click", l, () => ud(n, 1)), B("click", u, () => dd(n)), B("change", p, (e) => fd(n, "alt", e.target.value)), B("change", g, (e) => fd(n, "href", e.target.value || null)), H(e, r);
				}), R((e, t) => {
					J(n, "title", e), U(r, `${t ?? ""} `);
				}, [() => Y("tip.gallery.addImages"), () => Y("ui.addImages")]), B("change", i, cd), H(e, t);
			}, h = (e) => {
				var t = ic(), n = F(t);
				X(L(n), {
					get value() {
						return z(A).props.kind;
					},
					get options() {
						return Vt;
					},
					onchange: (e) => j("kind", e)
				}), k(t), R((e) => U(n, `${e ?? ""} `), [() => Y("blocks.shape")]), H(e, t);
			}, g = (e) => {
				let t = /* @__PURE__ */ M(() => z($u).find((e) => e.type === z(A).type)?.fields ?? []);
				var n = Nr(), r = I(n), i = (e) => {
					var n = Nr();
					Ur(I(n), 17, () => z(t), (e) => e.key, (e, t) => {
						var n = Nr(), r = I(n), i = (e) => {
							let n = /* @__PURE__ */ M(() => `${z(A).blockId}:${z(t).key}`);
							var r = Dc(), i = I(r), a = F(i), o = L(a);
							K(o), k(i);
							var s = L(i, 2), c = F(s, !0);
							k(s);
							var l = L(s, 2), u = (e) => {
								var t = Ec();
								let r;
								var i = F(t, !0);
								k(t), R(() => {
									r = ei(t, 1, "panel-hint svelte-1n46o8q", null, r, { "place-error": St[z(n)].err }), U(i, St[z(n)].text);
								}), H(e, t);
							};
							W(l, (e) => {
								St[z(n)] && e(u);
							}), R((e) => {
								U(a, `${z(t).label ?? ""} `), J(o, "placeholder", z(t).placeholder), q(o, xt[z(n)] ?? z(A).props[z(t).key] ?? ""), s.disabled = z(Ct), U(c, e);
							}, [() => Y("props.place.search")]), B("input", o, (e) => {
								xt[z(n)] = e.target.value;
							}), B("keydown", o, (e) => {
								e.key === "Enter" && Et(z(t));
							}), B("click", s, () => Et(z(t))), H(e, r);
						}, a = (e) => {
							var n = Oc(), r = F(n), i = L(r);
							K(i), k(n), R(() => {
								U(r, `${z(t).label ?? ""} `), J(i, "min", z(t).min), J(i, "max", z(t).max), J(i, "step", z(t).step ?? 1), q(i, z(A).props[z(t).key]);
							}), B("change", i, (e) => j(z(t).key, Tt(z(t), Number(e.target.value)))), H(e, n);
						}, o = (e) => {
							var n = gc(), r = F(n);
							K(r);
							var i = L(r);
							k(n), R((e) => {
								si(r, e), U(i, ` ${z(t).label ?? ""}`);
							}, [() => !!z(A).props[z(t).key]]), B("change", r, (e) => j(z(t).key, e.target.checked)), H(e, n);
						}, s = (e) => {
							var n = ic(), r = F(n), i = L(r);
							{
								let e = /* @__PURE__ */ M(() => (z(t).options ?? []).map((e) => [e.value, e.label]));
								X(i, {
									get value() {
										return z(A).props[z(t).key];
									},
									get options() {
										return z(e);
									},
									onchange: (e) => j(z(t).key, e)
								});
							}
							k(n), R(() => U(r, `${z(t).label ?? ""} `)), H(e, n);
						}, c = (e) => {
							var n = kc(), r = F(n), i = L(r);
							K(i), k(n), R(() => {
								U(r, `${z(t).label ?? ""} `), J(i, "placeholder", z(t).placeholder), q(i, z(A).props[z(t).key] ?? "");
							}), B("change", i, (e) => j(z(t).key, e.target.value)), H(e, n);
						};
						W(r, (e) => {
							z(t).type === "place" ? e(i) : z(t).type === "number" ? e(a, 1) : z(t).type === "toggle" ? e(o, 2) : z(t).type === "select" ? e(s, 3) : e(c, -1);
						}), H(e, n);
					}), H(e, n);
				}, a = (e) => {
					var t = bc(), n = F(t, !0);
					k(t), R((e, r) => {
						J(t, "title", e), U(n, r);
					}, [() => Y("hint.pluginBlock"), () => Y("ui.settings")]), B("click", t, () => D?.sendOpenConfig(z(A).blockId)), H(e, t);
				};
				W(r, (e) => {
					z(t).length ? e(i) : e(a, -1);
				}), H(e, n);
			};
			W(n, (e) => {
				z(A).type === "text" ? e(r) : z(A).type === "faq" ? e(i, 1) : z(A).type === "tidslinje" ? e(a, 2) : z(A).type === "sitat" ? e(o, 3) : z(A).type === "statistikk" ? e(s, 4) : z(A).type === "button" ? e(l, 5) : z(A).type === "image" ? e(u, 6) : z(A).type === "video" ? e(d, 7) : z(A).type === "icon" ? e(f, 8) : z(A).type === "samling" ? e(p, 9) : z(A).type === "galleri" ? e(m, 10) : z(A).type === "shape" ? e(h, 11) : e(g, -1);
			}), H(e, t);
		}, m = (e) => {
			var t = qc(), n = I(t), r = (e) => {
				var t = Ac(), n = I(t), r = F(n), a = L(r);
				{
					let e = /* @__PURE__ */ M(() => z(A).props.align ?? "left"), t = /* @__PURE__ */ M(() => [
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
						onchange: (e) => j("align", e)
					});
				}
				k(n);
				var o = L(n, 2), s = F(o);
				K(s);
				var c = L(s);
				k(o);
				var l = L(o, 2), u = (e) => {
					i(e);
				};
				W(l, (e) => {
					z(A).props.box && e(u);
				}), Fe(2), R((e, t, n) => {
					U(r, `${e ?? ""} `), si(s, t), U(c, ` ${n ?? ""}`);
				}, [
					() => Y("lbl.align"),
					() => !!z(A).props.box,
					() => Y("lbl.textBoxToggle")
				]), B("change", s, (e) => j("box", e.target.checked)), H(e, t);
			}, a = (e) => {
				var t = jc(), n = I(t), r = F(n, !0);
				k(n);
				var a = L(n, 2);
				i(a), Fe(2), R((e) => U(r, e), [() => Y("lbl.cardStyle")]), H(e, t);
			}, o = (e) => {
				var t = Mc(), n = I(t), r = F(n), i = L(r);
				{
					let e = /* @__PURE__ */ M(() => z(A).props.variant ?? "venstre"), t = /* @__PURE__ */ M(() => [["venstre", Y("opt.tl.venstre")], ["veksler", Y("opt.tl.veksler")]]);
					X(i, {
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => j("variant", e)
					});
				}
				k(n);
				var a = L(n, 2), o = F(a), s = L(o);
				{
					let e = /* @__PURE__ */ M(() => z(A).props.marker ?? "fylt"), t = /* @__PURE__ */ M(() => [["fylt", Y("opt.tl.fylt")], ["ring", Y("opt.tl.ring")]]);
					X(s, {
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => j("marker", e)
					});
				}
				k(a);
				var c = L(a, 2), l = F(c), u = L(l);
				{
					let e = /* @__PURE__ */ M(() => z(A).props.accent ?? "accent"), t = /* @__PURE__ */ M(Vn);
					Gi(u, {
						get value() {
							return z(e);
						},
						get tokens() {
							return z(t);
						},
						onchange: (e) => j("accent", e === "accent" ? null : e)
					});
				}
				k(c), Fe(2), R((e, t, n) => {
					U(r, `${e ?? ""} `), U(o, `${t ?? ""} `), U(l, `${n ?? ""} `);
				}, [
					() => Y("lbl.variant"),
					() => Y("lbl.tlMarker"),
					() => Y("lbl.color")
				]), H(e, t);
			}, s = (e) => {
				var t = Pc(), n = I(t), r = F(n), i = L(r);
				{
					let e = /* @__PURE__ */ M(() => z(A).props.variant ?? "stor"), t = /* @__PURE__ */ M(() => [["stor", Y("opt.sitat.stor")], ["kort", Y("opt.sitat.kort")]]);
					X(i, {
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => j("variant", e)
					});
				}
				k(n);
				var a = L(n, 2), o = (e) => {
					var t = Nc(), n = I(t), r = F(n), i = L(r);
					k(n);
					var a = L(n, 2), o = (e) => {
						var t = bc(), n = F(t, !0);
						k(t), R((e) => U(n, e), [() => Y("ui.sitatPortrettFjern")]), B("click", t, () => j("image", "")), H(e, t);
					};
					W(a, (e) => {
						z(A).props.image && e(o);
					}), R((e) => U(r, `${e ?? ""} `), [() => Y("ui.sitatPortrett")]), B("change", i, zt), H(e, t);
				};
				W(a, (e) => {
					z(A).props.variant === "kort" && e(o);
				});
				var s = L(a, 2), c = F(s), l = L(c);
				{
					let e = /* @__PURE__ */ M(() => z(A).props.accent ?? "accent"), t = /* @__PURE__ */ M(Vn);
					Gi(l, {
						get value() {
							return z(e);
						},
						get tokens() {
							return z(t);
						},
						onchange: (e) => j("accent", e === "accent" ? null : e)
					});
				}
				k(s), Fe(2), R((e, t) => {
					U(r, `${e ?? ""} `), U(c, `${t ?? ""} `);
				}, [() => Y("lbl.variant"), () => Y("lbl.color")]), H(e, t);
			}, c = (e) => {
				var t = Fc(), n = I(t), r = F(n);
				K(r);
				var i = L(r);
				k(n), Fe(2), R((e, t) => {
					J(n, "title", e), si(r, z(A).props.countUp !== !1), U(i, ` ${t ?? ""}`);
				}, [() => Y("tip.stat.countUp"), () => Y("lbl.statCountUp")]), B("change", r, (e) => j("countUp", e.target.checked)), H(e, t);
			}, l = (e) => {
				var t = Ic(), n = I(t), r = F(n), i = L(r);
				{
					let e = /* @__PURE__ */ M(() => [["primary", Y("opt.btn.primary")], ["secondary", Y("opt.btn.secondary")]]);
					X(i, {
						get value() {
							return z(A).props.style;
						},
						get options() {
							return z(e);
						},
						onchange: (e) => j("style", e)
					});
				}
				k(n), Fe(2), R((e) => U(r, `${e ?? ""} `), [() => Y("lbl.style")]), H(e, t);
			}, u = (e) => {
				var t = Lc(), n = I(t), r = F(n), i = L(r);
				{
					let e = /* @__PURE__ */ M(() => z(A).props.fit ?? "cover"), t = /* @__PURE__ */ M(() => [["cover", Y("opt.fitFrame.cover")], ["contain", Y("opt.fitFrame.contain")]]);
					X(i, {
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => j("fit", e)
					});
				}
				k(n);
				var a = L(n, 2), o = F(a), s = L(o);
				{
					let e = /* @__PURE__ */ M(() => z(A).props.radius ?? ""), t = /* @__PURE__ */ M(() => [
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
						onchange: (e) => j("radius", e || null)
					});
				}
				k(a);
				var c = L(a, 2), l = F(c), u = L(l), d = F(u);
				k(u), k(c);
				var f = L(c, 2);
				K(f);
				var p = L(f, 2), m = F(p), h = L(m), g = F(h);
				k(h), k(p);
				var _ = L(p, 2);
				K(_);
				var v = L(_, 2), y = F(v), b = L(y), x = F(b);
				k(b), k(v);
				var S = L(v, 2);
				K(S);
				var C = L(S, 2), ee = F(C), w = L(ee), te = F(w);
				k(w), k(C);
				var T = L(C, 2);
				K(T);
				var ne = L(T, 2), re = F(ne), ie = L(re), ae = F(ie);
				k(ie), k(ne);
				var oe = L(ne, 2);
				K(oe);
				var se = L(oe, 2), ce = F(se), le = L(ce), ue = F(le);
				k(le), k(se);
				var de = L(se, 2);
				K(de);
				var fe = L(de, 2), pe = F(fe, !0);
				k(fe), Fe(2), R((e, t, n, i, a, s, c, u, p, h, b, C, w, ne, ie, se, le) => {
					U(r, `${e ?? ""} `), U(o, `${t ?? ""} `), U(l, `${n ?? ""} `), U(d, `${i ?? ""}%`), q(f, z(A).props.x ?? .5), U(m, `${a ?? ""} `), U(g, `${s ?? ""}%`), q(_, z(A).props.y ?? .5), J(v, "title", c), U(y, `${u ?? ""} `), U(x, `${p ?? ""}x`), q(S, z(A).props.zoom ?? 1), U(ee, `${h ?? ""} `), U(te, `${b ?? ""}%`), q(T, z(A).props.brightness ?? 1), U(re, `${C ?? ""} `), U(ae, `${w ?? ""}%`), q(oe, z(A).props.contrast ?? 1), U(ce, `${ne ?? ""} `), U(ue, `${ie ?? ""}%`), q(de, z(A).props.saturate ?? 1), J(fe, "title", se), U(pe, le);
				}, [
					() => Y("lbl.fit"),
					() => Y("lbl.radius"),
					() => Y("lbl.focusX"),
					() => Math.round((z(A).props.x ?? .5) * 100),
					() => Y("lbl.focusY"),
					() => Math.round((z(A).props.y ?? .5) * 100),
					() => Y("tip.zoomCrop"),
					() => Y("lbl.zoom"),
					() => (z(A).props.zoom ?? 1).toFixed(2),
					() => Y("lbl.brightness"),
					() => Math.round((z(A).props.brightness ?? 1) * 100),
					() => Y("lbl.contrast"),
					() => Math.round((z(A).props.contrast ?? 1) * 100),
					() => Y("lbl.saturate"),
					() => Math.round((z(A).props.saturate ?? 1) * 100),
					() => Y("tip.resetAdjust"),
					() => Y("ui.resetAdjust")
				]), B("input", f, (e) => j("x", Number(e.target.value))), B("input", _, (e) => j("y", Number(e.target.value))), B("input", S, (e) => j("zoom", Number(e.target.value))), B("input", T, (e) => j("brightness", Number(e.target.value))), B("input", oe, (e) => j("contrast", Number(e.target.value))), B("input", de, (e) => j("saturate", Number(e.target.value))), B("click", fe, () => yt(`edit:${z(A).blockId}`, (e) => {
					e.props.brightness = 1, e.props.contrast = 1, e.props.saturate = 1;
				})), H(e, t);
			}, d = (e) => {
				var t = Rc(), n = I(t), r = F(n), i = L(r);
				K(i), k(n);
				var a = L(n, 2), o = F(a), s = L(o);
				{
					let e = /* @__PURE__ */ M(() => z(A).props.color ?? "accent"), t = /* @__PURE__ */ M(Vn);
					Gi(s, {
						get value() {
							return z(e);
						},
						get tokens() {
							return z(t);
						},
						onchange: (e) => j("color", e)
					});
				}
				k(a), Fe(2), R((e, t, n) => {
					U(r, `${e ?? ""} `), q(i, z(A).props.size ?? 48), J(a, "title", t), U(o, `${n ?? ""} `);
				}, [
					() => Y("lbl.sizePx"),
					() => Y("hint.icon.color"),
					() => Y("lbl.color")
				]), B("change", i, (e) => j("size", Number(e.target.value))), H(e, t);
			}, f = (e) => {
				var t = Ic(), n = I(t), r = F(n), i = L(r);
				{
					let e = /* @__PURE__ */ M(() => z(A).props.view ?? "cards"), t = /* @__PURE__ */ M(() => [
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
						onchange: (e) => j("view", e)
					});
				}
				k(n), Fe(2), R((e) => U(r, `${e ?? ""} `), [() => Y("lbl.view")]), H(e, t);
			}, p = (e) => {
				var t = Vc(), n = I(t), r = F(n), i = L(r);
				{
					let e = /* @__PURE__ */ M(() => z(A).props.view ?? "grid"), t = /* @__PURE__ */ M(() => [
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
						onchange: (e) => j("view", e)
					});
				}
				k(n);
				var a = L(n, 2), o = (e) => {
					var t = zc(), n = I(t), r = F(n), i = L(r);
					K(i), k(n);
					var a = L(n, 2), o = F(a), s = L(o), c = F(s);
					k(s), k(a);
					var l = L(a, 2);
					K(l), R((e, t) => {
						U(r, `${e ?? ""} `), q(i, z(A).props.columns ?? 3), U(o, `${t ?? ""} `), U(c, `${z(A).props.gap ?? 12 ?? ""} px`), q(l, z(A).props.gap ?? 12);
					}, [() => Y("lbl.columns"), () => Y("lbl.imageGap")]), B("change", i, (e) => j("columns", Number(e.target.value))), B("input", l, (e) => j("gap", Number(e.target.value))), H(e, t);
				};
				W(a, (e) => {
					(z(A).props.view ?? "grid") === "grid" && e(o);
				});
				var s = L(a, 2), c = (e) => {
					var t = Bc(), n = F(t), r = L(n);
					K(r), k(t), R((e) => {
						U(n, `${e ?? ""} `), q(r, z(A).props.interval ?? 5);
					}, [() => Y("lbl.secondsPerImage")]), B("change", r, (e) => j("interval", Number(e.target.value))), H(e, t);
				};
				W(s, (e) => {
					z(A).props.view === "slides" && e(c);
				});
				var l = L(s, 2), u = F(l), d = L(u);
				{
					let e = /* @__PURE__ */ M(() => z(A).props.radius ?? ""), t = /* @__PURE__ */ M(() => [
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
						onchange: (e) => j("radius", e || null)
					});
				}
				k(l);
				var f = L(l, 2), p = F(f);
				K(p);
				var m = L(p);
				k(f), Fe(2), R((e, t, n, i) => {
					U(r, `${e ?? ""} `), U(u, `${t ?? ""} `), J(f, "title", n), si(p, z(A).props.lightbox !== !1), U(m, ` ${i ?? ""}`);
				}, [
					() => Y("lbl.view"),
					() => Y("lbl.radius"),
					() => Y("tip.lightbox"),
					() => Y("lbl.lightbox")
				]), B("change", p, (e) => j("lightbox", e.target.checked)), H(e, t);
			}, m = (e) => {
				var t = Hc(), n = I(t), r = F(n);
				X(L(r), {
					get value() {
						return z(A).props.color;
					},
					get options() {
						return Ht;
					},
					onchange: (e) => j("color", e)
				}), k(n);
				var i = L(n, 2), a = F(i), o = L(a);
				K(o), k(i);
				var s = L(i, 2), c = F(s);
				K(c);
				var l = L(c);
				k(s), Fe(2), R((e, t, n, i, u) => {
					U(r, `${e ?? ""} `), U(a, `${t ?? ""} `), q(o, z(A).props.thickness), J(s, "title", n), si(c, i), U(l, ` ${u ?? ""}`);
				}, [
					() => Y("lbl.color"),
					() => Y("lbl.thickness"),
					() => Y("tip.shape.fill"),
					() => !!z(A).props.fill,
					() => Y("lbl.filled")
				]), B("change", o, (e) => j("thickness", Number(e.target.value))), B("change", c, (e) => j("fill", e.target.checked ? z(A).props.color : null)), H(e, t);
			};
			W(n, (e) => {
				z(A).type === "text" ? e(r) : z(A).type === "faq" ? e(a, 1) : z(A).type === "tidslinje" ? e(o, 2) : z(A).type === "sitat" ? e(s, 3) : z(A).type === "statistikk" ? e(c, 4) : z(A).type === "button" ? e(l, 5) : z(A).type === "image" ? e(u, 6) : z(A).type === "icon" ? e(d, 7) : z(A).type === "samling" ? e(f, 8) : z(A).type === "galleri" ? e(p, 9) : z(A).type === "shape" && e(m, 10);
			});
			var h = L(n, 2), g = F(h), _ = L(g);
			{
				let e = /* @__PURE__ */ M(() => Yn(z(A).animation) ? z(A).animation.type : "");
				X(_, {
					get value() {
						return z(e);
					},
					get options() {
						return Xn;
					},
					onchange: (e) => $n(e || null)
				});
			}
			k(h);
			var v = L(h, 2), y = (e) => {
				var t = Uc(), n = I(t), r = F(n), i = L(r);
				K(i), k(n);
				var a = L(n, 2), o = F(a), s = L(o);
				K(s), k(a), R((e, t) => {
					U(r, `${e ?? ""} `), q(i, z(A).animation.props.duration), U(o, `${t ?? ""} `), q(s, z(A).animation.props.delay);
				}, [() => Y("lbl.durationMs"), () => Y("lbl.delayMs")]), B("change", i, (e) => tr("duration", Number(e.target.value))), B("change", s, (e) => tr("delay", Number(e.target.value))), H(e, t);
			}, b = /* @__PURE__ */ M(() => Yn(z(A).animation));
			W(v, (e) => {
				z(b) && e(y);
			});
			var x = L(v, 2), S = F(x), C = L(S);
			{
				let e = /* @__PURE__ */ M(() => z(A).hover?.type ?? (z(A).animation && !Yn(z(A).animation) ? z(A).animation.type : ""));
				X(C, {
					get value() {
						return z(e);
					},
					get options() {
						return Zn;
					},
					onchange: (e) => er(e || null)
				});
			}
			k(x);
			var ee = L(x, 2), w = (e) => {
				var t = Gc(), n = L(I(t), 2), r = F(n);
				K(r);
				var i = L(r);
				k(n);
				var a = L(n, 2), o = (e) => {
					var t = Wc(), n = I(t), r = F(n), i = L(r);
					K(i), k(n);
					var a = L(n, 2), o = F(a), s = L(o);
					{
						let e = /* @__PURE__ */ M(() => z(A).sticky.until ?? ""), t = /* @__PURE__ */ M(_t);
						X(s, {
							get value() {
								return z(e);
							},
							get options() {
								return z(t);
							},
							onchange: (e) => yt(`edit:${z(A).blockId}`, (t) => {
								t.sticky = {
									...t.sticky,
									until: e || null
								};
							})
						});
					}
					k(a), R((e, t, s, c) => {
						J(n, "title", e), U(r, `${t ?? ""} `), q(i, z(A).sticky.offset ?? 16), J(a, "title", s), U(o, `${c ?? ""} `);
					}, [
						() => Y("tip.stickyOffset"),
						() => Y("lbl.stickyOffset"),
						() => Y("tip.stickyUntil"),
						() => Y("lbl.stickyUntil")
					]), B("change", i, (e) => yt(`edit:${z(A).blockId}`, (t) => {
						t.sticky = {
							...t.sticky,
							offset: Math.max(0, Number(e.target.value) || 0)
						};
					})), H(e, t);
				};
				W(a, (e) => {
					z(A).sticky && e(o);
				}), R((e, t, a) => {
					J(n, "title", e), si(r, t), U(i, ` ${a ?? ""}`);
				}, [
					() => Y("tip.sticky"),
					() => !!z(A).sticky,
					() => Y("lbl.sticky")
				]), B("change", r, (e) => yt(`edit:${z(A).blockId}`, (t) => {
					t.sticky = e.target.checked ? {
						offset: 16,
						until: null
					} : null;
				})), H(e, t);
			};
			W(ee, (e) => {
				z(ne) === "desktop" && e(w);
			});
			var te = L(ee, 4), T = F(te), re = F(T, !0);
			k(T);
			var ie = L(T, 2), ae = F(ie), oe = (e) => {
				var t = Kc(), n = F(t), r = F(n, !0), i = L(r);
				K(i), k(n);
				var a = L(n, 2), o = F(a, !0), s = L(o);
				K(s), k(a);
				var c = L(a, 2), l = F(c, !0), u = L(l);
				K(u), k(c);
				var d = L(c, 2), f = F(d, !0), p = L(f);
				K(p), k(d);
				var m = L(d, 2), h = F(m, !0), g = L(h);
				K(g), k(m);
				var _ = L(m, 2), v = F(_, !0), y = L(v);
				K(y), k(_), k(t), R((e, t, n, a, c, d, _) => {
					U(r, e), q(i, z(A).frame.x), U(o, t), q(s, z(A).frame.y), U(l, n), q(u, z(A).frame.w), U(f, a), q(p, z(A).frame.h), J(m, "title", c), U(h, d), q(g, z(A).frame.z ?? 1), U(v, _), q(y, z(A).frame.rot ?? 0);
				}, [
					() => Y("frame.x"),
					() => Y("frame.y"),
					() => Y("frame.w"),
					() => Y("frame.h"),
					() => Y("tip.frameZ"),
					() => Y("frame.z"),
					() => Y("frame.rot")
				]), B("change", i, (e) => Dt("x", Number(e.target.value))), B("change", s, (e) => Dt("y", Number(e.target.value))), B("change", u, (e) => Dt("w", Number(e.target.value))), B("change", p, (e) => Dt("h", Number(e.target.value))), B("change", g, (e) => Dt("z", Number(e.target.value))), B("change", y, (e) => Dt("rot", Number(e.target.value))), H(e, t);
			};
			W(ae, (e) => {
				z(ne) === "desktop" && e(oe);
			});
			var se = L(ae, 2), ce = F(se);
			K(ce);
			var le = L(ce);
			k(se), k(ie), k(te), R((e, t, n, r, i, a, o, s) => {
				J(h, "title", e), U(g, `${t ?? ""} `), J(x, "title", n), U(S, `${r ?? ""} `), J(T, "title", i), U(re, a), J(se, "title", o), si(ce, z(A).decor), U(le, ` ${s ?? ""}`);
			}, [
				() => Y("tip.props.blockAnim"),
				() => Y("lbl.animIn"),
				() => Y("tip.props.blockHover"),
				() => Y("lbl.onHover"),
				() => Y("hint.placement"),
				() => Y("group.placement"),
				() => Y("tip.decor"),
				() => Y("lbl.decor")
			]), B("change", ce, (e) => Lt(e.target.checked)), H(e, t);
		};
		W(f, (e) => {
			z(wt) === "content" ? e(p) : e(m, -1);
		}), R((e, t) => {
			o = ei(a, 1, "svelte-1n46o8q", null, o, { on: z(wt) === "content" }), U(s, e), u = ei(l, 1, "svelte-1n46o8q", null, u, { on: z(wt) === "style" }), U(d, t);
		}, [() => Y("props.tabContent"), () => Y("props.tabStyle")]), B("click", a, () => P(wt, "content")), B("click", l, () => P(wt, "style")), H(e, t);
	}, o = [
		["color", qo],
		["gradient", as],
		["glow", os],
		["image", As],
		["bildegalleri", Ps],
		["grain", cs]
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
		["lilla", Y("adminTheme.lilla")],
		["bronn", Y("adminTheme.bronn")],
		["gull", Y("adminTheme.gull")],
		["graa", Y("adminTheme.graa")],
		["nordlys", Y("adminTheme.nordlys")],
		["skumring", Y("adminTheme.skumring")],
		["glo", Y("adminTheme.glo")]
	], u = /* @__PURE__ */ N(rn(localStorage.getItem("urd-admin-theme") ?? "graa"));
	Sn(() => {
		document.documentElement.dataset.adminTheme = z(u), localStorage.setItem("urd-admin-theme", z(u)), f();
	});
	function f() {
		let e = getComputedStyle(document.documentElement), t = e.getPropertyValue("--urd-color-accent").trim();
		D?.sendAdminTheme({
			bg: e.getPropertyValue("--urd-color-bg").trim(),
			surface: e.getPropertyValue("--urd-color-surface").trim(),
			accent: t,
			text: e.getPropertyValue("--urd-color-text").trim(),
			"accent-text": p(t)
		});
	}
	function p(e) {
		return Go(e) == null || (Ko(e, "#ffffff") ?? 0) >= (Ko(e, "#0b0e14") ?? 0) ? "#ffffff" : "#0b0e14";
	}
	let h = /* @__PURE__ */ N(null), g = /* @__PURE__ */ N(null), _ = /* @__PURE__ */ N(!1), v = /* @__PURE__ */ N(""), y = /* @__PURE__ */ N("info"), b = 0;
	function x(e, t = "info") {
		P(v, e, !0), P(y, t, !0);
		let n = ++b;
		t === "ok" && setTimeout(() => {
			b === n && (P(v, ""), P(y, "info"));
		}, 8e3);
	}
	function S() {
		x(Y("status.storageFull"), "error");
	}
	function C(e, t) {
		try {
			localStorage.setItem(e, t);
		} catch {
			S();
		}
	}
	let ee = /* @__PURE__ */ N(null), w = /* @__PURE__ */ N(null), te = /* @__PURE__ */ N(rn({
		size: 16,
		snap: !0
	})), T = /* @__PURE__ */ N(!0), ne = /* @__PURE__ */ N("desktop"), re = /* @__PURE__ */ N(null), ie = /* @__PURE__ */ N(0), ae = /* @__PURE__ */ N(0), oe = /* @__PURE__ */ N(rn(typeof window < "u" ? window.innerWidth : 1280)), se = /* @__PURE__ */ N("fit"), ce = /* @__PURE__ */ N(1), le = /* @__PURE__ */ M(() => z(ne) === "mobile" ? 390 : z(oe)), ue = /* @__PURE__ */ M(() => z(se) === "manual" ? z(ce) : Ea(z(ie), z(le), "fit"));
	function de(e) {
		let t = Math.min(400, Math.max(10, (Math.round(Math.round(z(ue) * 100) / 10) + e) * 10));
		P(ce, t / 100), P(se, "manual");
	}
	let fe = /* @__PURE__ */ M(() => z(ue) > 0 ? z(ae) / z(ue) : z(ae)), pe = /* @__PURE__ */ M(() => z(le) * z(ue)), me = /* @__PURE__ */ M(() => z(ae));
	Sn(() => {
		let e = () => D?.sendCloseMenus();
		return document.addEventListener("pointerdown", e, !0), () => document.removeEventListener("pointerdown", e, !0);
	}), Sn(() => {
		let e = z(ne);
		D?.sendViewport(e);
	}), Sn(() => {
		let e = () => {
			P(oe, window.innerWidth, !0);
		};
		return window.addEventListener("resize", e), () => window.removeEventListener("resize", e);
	}), Sn(() => {
		let e = z(re);
		if (!e || typeof ResizeObserver > "u") return;
		let t = () => {
			let t = e.getBoundingClientRect();
			P(ie, t.width, !0), P(ae, t.height, !0);
		};
		t();
		let n = new ResizeObserver(t);
		return n.observe(e), () => n.disconnect();
	});
	let he = /* @__PURE__ */ N(0);
	function ge() {
		P(he, E?.data.sections.filter((e) => e.responsive?.mobile?.attention?.needed).length ?? 0, !0);
	}
	function _e(e) {
		let t = E.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			ke("layout");
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
			}, ve(t, "oppsett-byttet"), e.sectionId === z(Ut) && P(Gt, e.minHeight, !0), z(A)?.sectionId === e.sectionId && mt(), E.save(), we(), D?.sendSection(z(g), t);
		}
	}
	function ve(e, t) {
		!e || e.responsive?.mobile?.mode !== "manual" || e.responsive.mobile.attention?.needed || (e.responsive.mobile.attention = {
			needed: !0,
			reason: t,
			since: (/* @__PURE__ */ new Date()).toISOString()
		}, ge(), D?.sendAttention(e.id, !0));
	}
	let E = null, ye = null, D = null, O = /* @__PURE__ */ N(null);
	function be() {
		P(O, ye.data, !0), ye.replace(z(O));
	}
	function xe() {
		D?.sendSite(He(z(O)));
	}
	let Se = /* @__PURE__ */ new Set(), Ce = () => z(O).pages.find((e) => e.id === z(g));
	function we() {
		let e = z(O)?.pages?.some((e) => !Se.has(e.id) && localStorage.getItem(`urd-draft-${e.id}`) !== null) ?? !1, t = Ri?.hasDraft() || Object.values(zi).some((e) => e.hasDraft()), n = Xi?.hasDraft() || Object.values(Zi).some((e) => e.hasDraft());
		P(_, e || E?.hasDraft() && !Se.has(z(g)) || ye?.hasDraft() || Aa?.hasDraft() || t || n || !1, !0);
	}
	let Te = [], Ee = [], De = null;
	function Oe() {
		return JSON.stringify({
			pageId: z(g),
			page: E.data,
			site: ye.data,
			samlingerIndex: Vi ? Ri.data : null,
			samlinger: Vi ? Object.fromEntries(Object.entries(zi).map(([e, t]) => [e, t.data])) : {},
			malerIndex: aa ? Xi.data : null,
			maler: aa ? Object.fromEntries(Object.entries(Zi).map(([e, t]) => [e, t.data])) : {},
			plugins: Aa?.data ?? null
		});
	}
	function ke(e) {
		e === De && (e.startsWith("edit:") || e.startsWith("grid:")) || (Te.push(Oe()), Te.length > 50 && Te.shift(), Ee.length = 0, De = e);
	}
	function Ae(e) {
		let { pageId: t, page: n, site: r, samlingerIndex: i, samlinger: a, malerIndex: o, maler: s, plugins: c } = JSON.parse(e);
		if (ye.replace(r), be(), ye.save(), P(te, {
			snap: !0,
			...z(O).grid
		}, !0), xe(), je(i, a ?? {}), Me(o, s ?? {}), Ne(c), t && t !== z(g) && z(O).pages.some((e) => e.id === t)) {
			C(`urd-draft-${t}`, JSON.stringify(n)), Fr(t, { keepHistory: !0 }), we();
			return;
		}
		E.replace(n), E.save(), we(), ge(), mt(), Xt(E.data.sections.find((e) => e.id === z(Ut))), z(O).pages.some((e) => e.id === z(g)) ? D?.sendPage(z(g), E.data) : Fr(z(O).pages[0].id, { keepHistory: !0 });
	}
	function je(e, t) {
		if (!(!Ri || !e) && JSON.stringify({
			index: Ri.data,
			samlinger: Object.fromEntries(Object.entries(zi).map(([e, t]) => [e, t.data]))
		}) !== JSON.stringify({
			index: e,
			samlinger: t
		})) {
			Ri.replace(e), Ri.save();
			for (let e of Object.keys(zi)) e in t || (localStorage.removeItem(`urd-draft-samling-${e}`), delete zi[e]);
			for (let [e, n] of Object.entries(t)) {
				if (!zi[e]) {
					let t = Bi[e] ?? null;
					zi[e] = Ni(`urd-draft-samling-${e}`, () => t, S);
				}
				zi[e].replace(n), zi[e].save();
			}
			P(Hi, [...e.samlinger ?? []], !0), z(Wi) && !z(Hi).includes(z(Wi)) && P(Wi, null), ga();
		}
	}
	function Me(e, t) {
		if (!(!Xi || !e) && JSON.stringify({
			index: Xi.data,
			maler: Object.fromEntries(Object.entries(Zi).map(([e, t]) => [e, t.data]))
		}) !== JSON.stringify({
			index: e,
			maler: t
		})) {
			Xi.replace(e), Xi.save();
			for (let e of Object.keys(Zi)) e in t || (localStorage.removeItem(`urd-draft-mal-${e}`), delete Zi[e]);
			for (let [e, n] of Object.entries(t)) Zi[e] || (Zi[e] = Ni(`urd-draft-mal-${e}`, () => ia[e] ?? null, S)), Zi[e].replace(n), Zi[e].save();
			P(oa, [...e.maler ?? []], !0), we(), ca();
		}
	}
	function Ne(e) {
		!Aa || !e || JSON.stringify(Aa.data) !== JSON.stringify(e) && (Aa.replace(e), Aa.save(), Ka(), to());
	}
	function Pe() {
		Te.length && (Ee.push(Oe()), Ae(Te.pop()), De = null, x(Y("status.undone")));
	}
	function Ie() {
		Ee.length && (Te.push(Oe()), Ae(Ee.pop()), De = null, x(Y("status.redone")));
	}
	function Le(e) {
		z(gt) && (e.target instanceof Element && e.target.closest(".block-menu") || P(gt, null));
	}
	function Re(e) {
		if (e.key === "Escape" && z(gt)) {
			P(gt, null);
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
			].includes(t.type)) || !z(A) || z(ne) === "mobile") return;
			e.preventDefault(), D?.sendDuplicate();
			return;
		}
		if (t !== "z" && t !== "y") return;
		let n = e.target;
		n instanceof HTMLElement && (n.isContentEditable || n.tagName === "TEXTAREA" || n.tagName === "INPUT" && ![
			"number",
			"checkbox",
			"range",
			"color"
		].includes(n.type)) || (e.preventDefault(), t === "y" || e.shiftKey ? Ie() : Pe());
	}
	async function ze() {
		P(h, Pa(await (await fetch("/content/site.json")).json()), !0), ye = Ni("urd-draft-site", () => z(h), S), (ye.data.schemaVersion ?? 1) > 1 && (console.warn(`Urd: site-utkastet har schemaVersion ${ye.data.schemaVersion} (motoren har 1) og forkastes`), ye.replace(He(z(h)))), ye.replace(Pa(ye.data)), ye.save(), be(), P(te, {
			snap: !0,
			...z(O).grid
		}, !0), await Fr(new URLSearchParams(location.search).get("page") ?? z(O).pages[0].id), await Xa(), await ha(), await sa(), await dr(), z(w) && pr(), z(O).site.setup === !0 && !localStorage.getItem("urd-setup-done") && (P(Je, z(O).site.title, !0), P(Ye, z(O).theme.tokens.color.accent, !0), P(Xe, z(O).theme.tokens.color.bg, !0), P(Ge, !0));
	}
	let Be = /* @__PURE__ */ N(null);
	function Ve({ title: e, lines: t = [], okLabel: n = Y("confirm.ok"), cancelLabel: r = Y("confirm.cancel") }) {
		return new Promise((i) => {
			P(Be, {
				title: e,
				lines: t,
				okLabel: n,
				cancelLabel: r,
				resolve: i
			}, !0);
		});
	}
	function Ue({ title: e, lines: t = [], value: n = "", placeholder: r = "", okLabel: i = Y("confirm.ok"), cancelLabel: a = Y("confirm.cancel") }) {
		return new Promise((o) => {
			P(Be, {
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
	function We(e) {
		z(Be)?.resolve(z(Be).prompt ? e ? z(Be).value : null : e), P(Be, null);
	}
	let Ge = /* @__PURE__ */ N(!1), Je = /* @__PURE__ */ N(""), Ye = /* @__PURE__ */ N("#7c5cff"), Xe = /* @__PURE__ */ N("#0b0e14");
	function Ze() {
		localStorage.setItem("urd-setup-done", "1"), P(Ge, !1);
	}
	function Qe() {
		let e = z(Je).trim();
		e && (qr("setup", () => {
			z(O).site.title = e, z(O).nav.logo = {
				type: "text",
				value: e
			}, z(O).theme.tokens.color.accent = z(Ye), z(O).theme.tokens.color.bg = z(Xe), delete z(O).site.setup;
		}), Ze(), x(Y("status.setupDone"), "ok"));
	}
	let $e = /* @__PURE__ */ N(null), et = [
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
	], tt = Object.fromEntries(et.flat().map((e) => [e, Y(`panel.${e}`)])), nt = {
		pages: ["hint.pages.drafts"],
		blocks: ["hint.blocks.intro"],
		grid: ["hint.grid.intro", "hint.grid.section"],
		collections: ["hint.collections.intro"],
		plugins: ["hint.plugins.intro"],
		history: ["hint.history.intro"]
	}, rt = [
		["se", "Davvisámegiella"],
		["en-GB", "English (UK)"],
		["nb", "Norsk bokmål"],
		["nn", "Norsk nynorsk"],
		["tr", "Türkçe"]
	], it = (e) => [...e].sort((e, t) => e[1].localeCompare(t[1]));
	function at(e, t) {
		let n = [];
		for (let r of e) for (let e of La[r]?.languages ?? []) e?.[t] === !0 && (typeof e.code != "string" || typeof e.name != "string" || !e.name || rt.some(([t]) => t === e.code) || n.some(([t]) => t === e.code) || n.push([e.code, e.name]));
		return n;
	}
	function ot() {
		let e = it([...rt, ...at(z(Ua), "admin")]);
		return ut === "auto" || e.some(([e]) => e === ut) ? e : [[ut, ut], ...e];
	}
	let st = () => at(z(Ia)?.enabled ?? [], "site"), ut = localStorage.getItem("urd-admin-lang") ?? "auto";
	function dt(e) {
		e !== ut && (e === "auto" ? localStorage.removeItem("urd-admin-lang") : localStorage.setItem("urd-admin-lang", e), location.reload());
	}
	function ft(e) {
		P($e, z($e) === e ? null : e, !0), D?.sendShowGrid(z($e) === "grid"), z($e) === "history" && vr(), z($e) === "update" && !z(Dr) && kr();
	}
	let A = /* @__PURE__ */ N(null);
	function pt(e, t) {
		let n = E?.data.sections.find((t) => t.id === e);
		return {
			section: n,
			block: n?.blocks.find((e) => e.id === t)
		};
	}
	function mt() {
		if (!z(A)) return;
		let { block: e } = pt(z(A).sectionId, z(A).blockId);
		if (!e) {
			P(A, null);
			return;
		}
		P(A, {
			sectionId: z(A).sectionId,
			blockId: z(A).blockId,
			type: e.type,
			decor: !!e.decor,
			props: JSON.parse(JSON.stringify(e.props)),
			frame: { ...e.frames.desktop },
			animation: e.animation ? JSON.parse(JSON.stringify(e.animation)) : null,
			hover: e.hover ? JSON.parse(JSON.stringify(e.hover)) : null,
			sticky: e.sticky ? JSON.parse(JSON.stringify(e.sticky)) : null
		}, !0);
	}
	function ht(e) {
		if (P(gt, null), !e.blockId) {
			P(A, null);
			return;
		}
		P(A, {
			sectionId: e.sectionId,
			blockId: e.blockId
		}, !0), e.sectionId && P(Ut, e.sectionId, !0), mt();
	}
	let gt = /* @__PURE__ */ N(null);
	function _t() {
		let e = E?.data.sections ?? [], t = e.findIndex((e) => e.id === z(A)?.sectionId);
		return [["", Y("opt.sticky.ownSection")], ...e.slice(t + 1).map((e, n) => [e.id, Y("opt.sticky.atSection", { n: t + 2 + n })])];
	}
	function vt(e) {
		if (ht(e), !z(A)) return;
		let t = z(ee)?.getBoundingClientRect();
		if (!t) return;
		let n = t.left + z(ue) * e.rect.right + 12;
		n + 300 > window.innerWidth - 8 && (n = Math.max(8, t.left + z(ue) * e.rect.left - 300 - 12));
		let r = window.innerHeight - Math.min(window.innerHeight * .7, 560) - 8, i = Math.min(Math.max(8, t.top + z(ue) * e.rect.top), Math.max(8, r));
		P(gt, {
			left: n,
			top: i
		}, !0);
	}
	function yt(e, t) {
		let { section: n, block: r } = pt(z(A)?.sectionId, z(A)?.blockId);
		r && (ke(e), t(r, n), ve(n, "blokk-endret"), E.save(), we(), D?.sendSection(z(g), n), mt());
	}
	function j(e, t) {
		yt(`edit:${z(A).blockId}:${e}`, (n) => {
			n.props[e] = t;
		});
	}
	function bt(e, t) {
		yt(`edit:${z(A).blockId}:${e}`, (e) => {
			Object.assign(e.props, t);
		});
	}
	let xt = rn({}), St = rn({}), Ct = /* @__PURE__ */ N(!1), wt = /* @__PURE__ */ N("content"), Tt = (e, t) => (Number.isFinite(t) || (t = e.min ?? 0), e.min != null && (t = Math.max(e.min, t)), e.max != null && (t = Math.min(e.max, t)), t);
	async function Et(e) {
		let t = z(A).blockId, n = `${t}:${e.key}`, r = (xt[n] ?? z(A).props[e.key] ?? "").trim();
		St[n] = null;
		let i = r.match(/^(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)$/);
		if (!r || i || /^https?:\/\//i.test(r)) {
			bt(e.key, {
				[e.key]: r,
				lat: i ? Number(i[1]) : null,
				lon: i ? Number(i[2]) : null
			});
			return;
		}
		P(Ct, !0), St[n] = {
			text: Y("props.place.searching"),
			err: !1
		};
		try {
			let i = await fetch(`/api/geocode?q=${encodeURIComponent(r)}`), a = await i.json().catch(() => null);
			if (z(A)?.blockId !== t) return;
			i.ok && Number.isFinite(a?.lat) ? (bt(e.key, {
				[e.key]: r,
				lat: a.lat,
				lon: a.lon
			}), St[n] = null) : St[n] = {
				text: Oi(a) ?? Y("props.place.notFound"),
				err: !0
			};
		} catch {
			St[n] = {
				text: Y("props.place.failed"),
				err: !0
			};
		} finally {
			P(Ct, !1);
		}
	}
	function Dt(e, t) {
		Number.isFinite(t) && yt(`edit:frame-${z(A).blockId}:${e}`, (n) => {
			n.frames.desktop = {
				...n.frames.desktop,
				[e]: t
			};
		});
	}
	function Ot(e) {
		yt(`edit:${z(A).blockId}:boxStyle`, (t) => {
			let n = {
				...t.props.boxStyle ?? {},
				...e
			};
			for (let e of Object.keys(n)) n[e] ?? delete n[e];
			Object.keys(n).length ? t.props.boxStyle = n : delete t.props.boxStyle;
		});
	}
	function kt(e, t) {
		yt(`edit:${z(A).blockId}:faq${e}`, (n) => {
			n.props.items[e] = {
				...n.props.items[e],
				...t
			};
		});
	}
	function At() {
		yt("faq-item", (e) => {
			(e.props.items ??= []).push({
				q: Y("seed.faq.newQ"),
				a: Y("seed.faq.answer")
			});
		});
	}
	function jt(e) {
		yt("faq-item", (t) => {
			t.props.items.splice(e, 1);
		});
	}
	function Mt(e, t) {
		let n = e + t;
		yt("faq-item", (t) => {
			n < 0 || n >= t.props.items.length || ([t.props.items[e], t.props.items[n]] = [t.props.items[n], t.props.items[e]]);
		});
	}
	function Nt(e, t) {
		yt(`edit:${z(A).blockId}:tl${e}`, (n) => {
			n.props.items[e] = {
				...n.props.items[e],
				...t
			};
		});
	}
	function Pt() {
		yt("tl-item", (e) => {
			(e.props.items ??= []).push({
				year: "",
				title: Y("seed.tidslinje.newTitle"),
				text: ""
			});
		});
	}
	function Ft(e) {
		yt("tl-item", (t) => {
			t.props.items.splice(e, 1);
		});
	}
	function It(e, t) {
		let n = e + t;
		yt("tl-item", (t) => {
			n < 0 || n >= t.props.items.length || ([t.props.items[e], t.props.items[n]] = [t.props.items[n], t.props.items[e]]);
		});
	}
	function Lt(e) {
		yt("decor", (t) => {
			t.decor = e;
		});
	}
	async function Rt(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await jn(t);
			yt(`edit:${z(A).blockId}`, (n) => {
				n.props.src = e.dataUrl, n.props.alt = n.props.alt || na(t.name).replaceAll("-", " ");
			});
		} catch {
			x(Y("status.imageReadError"), "error");
		}
	}
	async function zt(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await jn(t);
			yt(`edit:${z(A).blockId}`, (t) => {
				t.props.image = e.dataUrl;
			});
		} catch {
			x(Y("status.imageReadError"), "error");
		}
	}
	let Bt = {
		text: Y("blocks.text"),
		button: Y("blocks.button"),
		image: Y("blocks.image"),
		shape: Y("blocks.shape"),
		video: Y("blocks.video"),
		icon: Y("blocks.icon"),
		galleri: Y("blocks.galleri"),
		faq: Y("blocks.faq")
	}, Vt = [
		["line", Y("shape.line")],
		["arrow", Y("shape.arrow")],
		["circle", Y("shape.circle")],
		["rect", Y("shape.rect")],
		["triangle", Y("shape.triangle")]
	], Ht = [
		["accent", Y("color.accent")],
		["text", Y("color.text")],
		["surface", Y("color.surface")],
		["bg", Y("color.bg")]
	], Ut = /* @__PURE__ */ N(null), Wt = /* @__PURE__ */ N(null), Gt = /* @__PURE__ */ N(""), Kt = /* @__PURE__ */ N(rn([])), qt = /* @__PURE__ */ N(null), Jt = /* @__PURE__ */ N(null), Yt = /* @__PURE__ */ N("");
	function Xt(e) {
		P(Wt, e?.grid ? { ...e.grid } : null, !0), P(Gt, e?.size?.minHeight ?? "", !0), P(Kt, JSON.parse(JSON.stringify(e?.background?.layers ?? [])), !0), P(qt, e?.animation ? JSON.parse(JSON.stringify(e.animation)) : null, !0), P(Jt, e?.hover ? JSON.parse(JSON.stringify(e.hover)) : null, !0), P(Yt, e?.theme ?? "", !0);
	}
	let Zt = /* @__PURE__ */ N(null), Qt = rn({});
	function $t() {
		try {
			let e = ((z(ee)?.contentDocument)?.querySelector(`.urd-section[data-section-id="${z(Ut)}"]`))?.getBoundingClientRect();
			P(Zt, e && e.width ? {
				w: e.width,
				h: e.height
			} : null, !0);
		} catch {
			P(Zt, null);
		}
	}
	Sn(() => {
		z(Ut), z(Kt), requestAnimationFrame(() => requestAnimationFrame($t));
	}), Sn(() => {
		let e = z(ee);
		if (!e || typeof ResizeObserver > "u") return;
		let t = new ResizeObserver(() => $t());
		return t.observe(e), () => t.disconnect();
	}), Sn(() => {
		for (let e of z(Kt)) {
			let t = e?.props?.src;
			if (e?.type === "image" && t && !Qt[t]) {
				let e = new Image();
				e.onload = () => {
					Qt[t] = {
						w: e.naturalWidth,
						h: e.naturalHeight
					};
				}, e.src = t;
			}
		}
	});
	function en(e) {
		nn("section-theme", (t) => {
			e ? t.theme = e : delete t.theme;
		});
	}
	function tn(e) {
		P(Ut, e.sectionId, !0), Xt(E?.data.sections.find((t) => t.id === e.sectionId));
	}
	function nn(e, t) {
		let n = E.data.sections.find((e) => e.id === z(Ut));
		n && (ke(e), t(n), E.save(), we(), D?.sendSection(z(g), n), Xt(n));
	}
	let on = /* @__PURE__ */ N("color");
	function sn(e, t) {
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
	function cn(e, t) {
		e.mutate(e.keyPrefix, (e) => {
			e.background.layers.splice(t, 1), e.background.layers.length || delete e.background;
		});
	}
	function ln(e, t, n) {
		let r = t + n;
		e.mutate(e.keyPrefix, (e) => {
			let n = e.background.layers;
			r < 0 || r >= n.length || ([n[t], n[r]] = [n[r], n[t]]);
		});
	}
	function un(e, t, n, r) {
		e.mutate(`edit:${e.keyPrefix}-${e.keyId}-${t}-${n}`, (e) => {
			e.background.layers[t].props[n] = r;
		});
	}
	function dn(e, t, n, r = "xy") {
		e.preventDefault();
		let i = e.currentTarget;
		i.setPointerCapture?.(e.pointerId);
		let a = (e) => {
			let a = i.getBoundingClientRect();
			if (r.includes("x")) {
				let r = Math.min(1, Math.max(0, (e.clientX - a.left) / a.width));
				un(t, n, "x", Math.round(r * 100) / 100);
			}
			if (r.includes("y")) {
				let r = Math.min(1, Math.max(0, (e.clientY - a.top) / a.height));
				un(t, n, "y", Math.round(r * 100) / 100);
			}
		};
		a(e);
		let o = () => {
			i.removeEventListener("pointermove", a), i.removeEventListener("pointerup", o), i.removeEventListener("pointercancel", o);
		};
		i.addEventListener("pointermove", a), i.addEventListener("pointerup", o), i.addEventListener("pointercancel", o);
	}
	let fn = (e) => Math.min(4, Math.max(.1, e));
	function pn(e, t, n, r) {
		un(e, t, "size", fn(Math.round((n + r) * 100) / 100));
	}
	function mn(e, t, n) {
		let r = Number(n);
		Number.isFinite(r) && un(e, t, "size", fn(r / 100));
	}
	function hn(e, t, n, r) {
		let i = Qt[n.props.src];
		if (!i?.w || !i?.h || !z(Zt)?.w || !z(Zt)?.h) return;
		let a = z(Zt).h * i.w / (z(Zt).w * i.h), o = r === "cover" ? Math.max(1, a) : Math.min(1, a);
		(n.props.fit === "flislegg" || n.props.fit === "repeat") && un(e, t, "fit", "vanlig"), un(e, t, "size", fn(Math.round(o * 100) / 100));
	}
	function gn(e) {
		return e.props;
	}
	function _n(e, t, n, r) {
		e.mutate(n, (e) => {
			r(e.background.layers[t].props);
		});
	}
	function vn(e, t, n, r) {
		_n(e, t, `edit:${e.keyPrefix}-${e.keyId}-${t}-${n}`, (e) => {
			e[n] = r;
		});
	}
	let yn = {
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
	function bn(e, t, n) {
		_n(e, t, e.keyPrefix, (e) => {
			e.kind = n, yn[n].some(([t]) => t === (e.animation ?? "none")) || (e.animation = "none");
		});
	}
	function xn(e, t, n, r) {
		_n(e, t, `edit:${e.keyPrefix}-${e.keyId}-${t}-stop${n}`, (e) => {
			e.stops[n] = {
				...e.stops[n],
				...r
			};
		});
	}
	function Cn(e, t) {
		_n(e, t, e.keyPrefix, (e) => {
			let t = Math.round(e.stops.reduce((e, t) => e + (Number(t.share) || 0), 0) / e.stops.length) || 50;
			e.stops.push({
				color: e.stops[e.stops.length - 1]?.color ?? "#ffffff",
				share: t
			});
		});
	}
	function wn(e, t, n) {
		_n(e, t, e.keyPrefix, (e) => {
			e.stops.length > 2 && e.stops.splice(n, 1);
		});
	}
	function Tn(e, t, n, r) {
		_n(e, t, e.keyPrefix, (e) => {
			let [t] = e.stops.splice(n, 1);
			e.stops.splice(r, 0, t);
		});
	}
	let En = /* @__PURE__ */ N(null);
	function Dn(e, t, n, r) {
		if (t.button !== 0) return;
		t.preventDefault();
		let i = t.currentTarget.closest(".bg-layer"), a = t.currentTarget.closest(".grad-stop");
		P(En, {
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
			P(En, {
				...z(En),
				insert: n
			}, !0);
		}, u = () => {
			window.removeEventListener("pointermove", l), window.removeEventListener("pointerup", u), c.remove();
			let t = z(En);
			if (P(En, null), !t) return;
			let n = t.insert > t.from ? t.insert - 1 : t.insert;
			n !== t.from && Tn(e, t.layer, t.from, n);
		};
		window.addEventListener("pointermove", l), window.addEventListener("pointerup", u);
	}
	function On(e, t, n) {
		e.mutate(e.keyPrefix, (e) => {
			e.background.layers[t].type !== n && (e.background.layers[t] = {
				type: n,
				version: s[n].version ?? 1,
				props: s[n].defaults()
			});
		});
	}
	async function kn(e, t) {
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
	async function An(e) {
		let t = await e.text(), n = Qi(t), r = ea(t);
		if (!r) return n;
		let i = await kn(n.dataUrl, r);
		if (!i) return n;
		let a = $i(t, i);
		if (a === t) return n;
		try {
			return Qi(a);
		} catch {
			return n;
		}
	}
	async function jn(e) {
		return e.type === "image/svg+xml" || /\.svg$/i.test(e.name || "") ? An(e) : Yi(e);
	}
	async function Mn(e, t, n) {
		let r = n.target.files?.[0];
		if (n.target.value = "", r) try {
			un(e, t, "src", (await jn(r)).dataUrl);
		} catch {
			x(Y("status.imageReadError"), "error");
		}
	}
	async function Nn(e, t, n) {
		let r = [...n.target.files ?? []];
		if (n.target.value = "", !r.length) return;
		x(Y("status.compressingImages"));
		let { images: i, failed: a, big: o } = await od(r);
		i.length && e.mutate(e.keyPrefix, (e) => {
			let n = e.background.layers[t].props;
			n.images ??= [], n.images.push(...i.map(({ src: e }) => ({
				src: e,
				x: .5,
				y: .5
			})));
		}), sd(i.length, a, o);
	}
	function Pn(e, t, n, r) {
		e.mutate(e.keyPrefix, (e) => {
			let i = e.background.layers[t].props.images, a = n + r;
			a < 0 || a >= i.length || ([i[n], i[a]] = [i[a], i[n]]);
		});
	}
	function Fn(e, t, n) {
		e.mutate(e.keyPrefix, (e) => {
			e.background.layers[t].props.images.splice(n, 1);
		});
	}
	function In(e, t, n, r, i) {
		e.mutate(`edit:${e.keyPrefix}g-${e.keyId}-${t}-${n}-${r}`, (e) => {
			e.background.layers[t].props.images[n][r] = i;
		});
	}
	function Ln(e, t) {
		qr(e, () => {
			z(O).nav.style ??= {}, t(z(O).nav.style);
		});
	}
	let Rn = /* @__PURE__ */ M(() => ({
		mutate: nn,
		keyPrefix: "bg",
		keyId: z(Ut)
	})), zn = {
		mutate: Ln,
		keyPrefix: "navbg",
		keyId: "nav"
	}, Bn = {
		mutate: $,
		keyPrefix: "footerbg",
		keyId: "footer"
	}, Vn = () => Object.entries(z(O)?.theme.tokens.color ?? {}).map(([e, t]) => [e, t]), Hn = [
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
	], Un = /* @__PURE__ */ M(() => !!z(O)?.theme.alt), Wn = /* @__PURE__ */ M(() => z(O)?.theme.alt?.auto === !0), Gn = /* @__PURE__ */ M(() => z(O)?.theme.scheme === "dark" ? "dark" : "light"), Kn = /* @__PURE__ */ M(() => z(O)?.theme.tokens.color ?? {}), qn = /* @__PURE__ */ M(() => ({
		...z(O)?.theme.tokens.color ?? {},
		...z(O)?.theme.alt?.tokens?.color ?? {}
	}));
	function Jn(e) {
		return {
			type: e,
			version: Rs[e].version,
			props: Rs[e].defaults()
		};
	}
	let Yn = (e) => !!(e && Rs[e.type]?.entrance), Xn = [["", Y("common.none")], ...Object.entries(Rs).filter(([, e]) => e.entrance).map(([e, t]) => [e, t.labelKey ? Y(t.labelKey) : t.label])], Zn = [["", Y("common.none")], ...Object.entries(Rs).filter(([, e]) => !e.entrance).map(([e, t]) => [e, t.labelKey ? Y(t.labelKey) : t.label])];
	function Qn(e) {
		e.animation && !Yn(e.animation) && (e.hover ??= e.animation, e.animation = null);
	}
	function $n(e) {
		yt(`edit:anim-${z(A).blockId}`, (t) => {
			Qn(t), t.animation = e ? Jn(e) : null;
		}), z(A) && D?.sendDemoAnim(z(A).sectionId, z(A).blockId);
	}
	function er(e) {
		yt(`edit:hover-${z(A).blockId}`, (t) => {
			Qn(t), t.hover = e ? Jn(e) : null;
		});
	}
	function tr(e, t) {
		Number.isFinite(t) && (yt(`edit:anim-${z(A).blockId}:${e}`, (n) => {
			n.animation && (n.animation.props[e] = t);
		}), z(A) && D?.sendDemoAnim(z(A).sectionId, z(A).blockId));
	}
	function nr(e) {
		nn("section-anim", (t) => {
			Qn(t), t.animation = e ? Jn(e) : null;
		}), D?.sendDemoAnim(z(Ut));
	}
	function rr(e) {
		nn("section-hover", (t) => {
			Qn(t), t.hover = e ? Jn(e) : null;
		});
	}
	function ir(e, t) {
		Number.isFinite(t) && (nn("edit:section-anim", (n) => {
			n.animation && (n.animation.props[e] = t);
		}), D?.sendDemoAnim(z(Ut)));
	}
	function ar(e) {
		nn("edit:section-anim", (t) => {
			t.animation && (t.animation.props.pattern = e);
		}), D?.sendDemoAnim(z(Ut));
	}
	function or(e) {
		let t = E.data.sections.find((e) => e.id === z(Ut));
		if (!t) return;
		let n = e.trim();
		if (!n) return;
		let r = /^\d+$/.test(n) ? `${n}px` : n;
		ke("section-size"), t.size = {
			...t.size,
			minHeight: r
		}, P(Gt, r, !0), E.save(), we(), D?.sendSection(z(g), t);
	}
	function sr() {
		return E.data.sections.find((e) => e.id === z(Ut)) ?? E.data.sections[0];
	}
	function cr(e) {
		let t = E.data.sections.find((e) => e.id === z(Ut));
		t && (ke("grid:section"), t.grid = e ? { ...ye.data.grid } : null, P(Wt, t.grid ? { ...t.grid } : null, !0), E.save(), we(), D?.sendSection(z(g), t), z($e) === "grid" && D?.sendShowGrid(!0));
	}
	function lr(e, t) {
		let n = E.data.sections.find((e) => e.id === z(Ut));
		n?.grid && (ke("grid:section"), n.grid = {
			...n.grid,
			[e]: t
		}, P(Wt, { ...n.grid }, !0), E.save(), we(), D?.sendSection(z(g), n), z($e) === "grid" && D?.sendShowGrid(!0));
	}
	function ur(e, t) {
		ke("grid:site"), P(te, {
			...z(te),
			[e]: t
		}, !0), ye.data.grid = {
			...ye.data.grid,
			[e]: t
		}, ye.save(), we(), xe(), z($e) === "grid" && D?.sendShowGrid(!0);
	}
	async function dr() {
		try {
			let e = await fetch("/api/github/me");
			e.ok ? P(w, await e.json(), !0) : e.status !== 503 && P(w, null);
		} catch {
			P(w, null);
		}
	}
	let fr = null;
	async function pr() {
		try {
			let e = await fetch("/api/github/latest");
			e.ok && (fr = (await e.json()).head ?? null);
		} catch {}
	}
	async function mr(e) {
		if (!fr) return await pr(), {
			ok: await Ve({
				title: Y("confirm.conflictUnknown.title"),
				lines: [Y("confirm.conflictUnknown.body"), Y("confirm.conflictUnknown.warning")],
				okLabel: Y("confirm.publishAnyway"),
				cancelLabel: Y("confirm.cancel")
			}),
			head: fr
		};
		let t = null;
		try {
			let e = await fetch(`/api/github/latest?base=${fr}`);
			e.ok && (t = await e.json().catch(() => null));
		} catch {}
		if (!t?.head) return {
			ok: !0,
			head: null
		};
		let n = t.head;
		if (n === fr) return {
			ok: !0,
			head: n
		};
		let r = new Set(e.map((e) => e.path)), i = t.truncated ? [Y("confirm.conflict.truncated")] : (t.changedFiles ?? []).filter((e) => r.has(e));
		return i.length === 0 ? {
			ok: !0,
			head: n
		} : {
			ok: await Ve({
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
	let hr = /* @__PURE__ */ N(null), gr = /* @__PURE__ */ N(""), _r = /* @__PURE__ */ N(!1);
	async function vr() {
		P(gr, "");
		try {
			let e = await fetch("/api/github/history");
			e.ok ? P(hr, (await e.json()).commits, !0) : e.status === 401 ? (P(hr, [], !0), P(gr, Y("status.historyLoginRequired"), !0)) : (P(hr, [], !0), P(gr, Oi(await e.json().catch(() => null)) ?? Y("status.historyFetchFailed"), !0));
		} catch {
			P(hr, [], !0), P(gr, Y("status.historyUnavailable"), !0);
		}
	}
	let yr = (() => {
		let e = {
			dateStyle: "short",
			timeStyle: "short"
		};
		try {
			return new Intl.DateTimeFormat(ki(), e);
		} catch {
			return new Intl.DateTimeFormat(void 0, e);
		}
	})(), br = !1;
	async function xr() {
		let e = z(hr)?.[0];
		if (!(!e || z(_r)) && await Ve({
			title: Y("confirm.revert.title"),
			lines: [`«${e.message}»`, Y("confirm.revert.body")],
			okLabel: Y("confirm.revert.ok"),
			cancelLabel: Y("confirm.cancel")
		})) {
			P(_r, !0), x(Y("status.reverting"));
			try {
				let t = await fetch("/api/github/revert", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({ expect: e.sha })
				});
				if (t.ok) {
					let { sha: e } = await t.json().catch(() => ({}));
					e ? fr = e : pr(), br = !0, x(Y("status.revertDone"), "ok"), Cr();
				} else t.status === 409 ? x(Y("status.revertConflict"), "error") : x(Oi(await t.json().catch(() => null)) ?? Y("status.revertFailed"), "error");
			} catch {
				x(Y("status.publishLayerUnreachable"), "error");
			}
			P(_r, !1), vr();
		}
	}
	async function Cr() {
		let e = ["/content/site.json", ...z(O).pages.map((e) => `/${e.file}`)], t = async () => {
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
				x(Y("status.revertDeployed"), "ok");
				for (let e of Object.keys(localStorage).filter((e) => e.startsWith("urd-draft-"))) localStorage.removeItem(e);
				await new Promise((e) => setTimeout(e, 800)), location.reload();
				return;
			}
		}
		x(Y("status.revertDeployTimeout"), "error");
	}
	let Tr = /* @__PURE__ */ N(null), Er = /* @__PURE__ */ N(null), Dr = /* @__PURE__ */ N(!1), Or = /* @__PURE__ */ N(rn(/* @__PURE__ */ new Set()));
	async function kr() {
		P(Dr, !0), P(Er, null), P(Tr, null);
		try {
			let e = await fetch("/api/github/update"), t = await e.json().catch(() => null);
			e.ok ? (P(Tr, t, !0), P(Or, /* @__PURE__ */ new Set(), !0)) : P(Er, Oi(t) ?? Y("update.checkFailed"), !0);
		} catch {
			P(Er, Y("status.publishLayerUnreachable"), !0);
		}
		P(Dr, !1);
	}
	function Ar(e) {
		let t = new Set(z(Or));
		t.has(e) ? t.delete(e) : t.add(e), P(Or, t, !0);
	}
	async function jr() {
		if (!z(Tr) || z(Tr).upToDate || z(Dr)) return;
		let e = [...z(Or)], t = z(Tr).changes.filter((e) => !z(Or).has(e.path)), n = t.filter((e) => e.atom && e.conflict);
		if (await Ve({
			title: Y("confirm.update.title"),
			lines: [Y("confirm.update.body", {
				target: z(Tr).target,
				writes: t.filter((e) => e.action === "write").length,
				deletes: t.filter((e) => e.action === "delete").length
			}), ...n.length > 0 ? [Y("confirm.update.warnEdited", { paths: n.map((e) => e.path).join(", ") })] : []],
			okLabel: Y("confirm.update.ok"),
			cancelLabel: Y("confirm.cancel")
		})) {
			P(Dr, !0), x(Y("update.running", { target: z(Tr).target }));
			try {
				let t = await fetch("/api/github/update", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({
						to: z(Tr).target,
						expect: z(Tr).head,
						skip: e
					})
				}), n = await t.json().catch(() => null);
				t.ok ? (x(Y("update.committed", { target: z(Tr).target }), "ok"), await V(z(Tr).target.replace(/^v/, ""))) : t.status === 409 ? (x(Oi(n) ?? Y("update.checkFailed"), "error"), await kr()) : x(Oi(n) ?? Y("update.failed"), "error");
			} catch {
				x(Y("status.publishLayerUnreachable"), "error");
			}
			P(Dr, !1);
		}
	}
	async function V(e) {
		for (let t = 0; t < 18; t++) {
			await new Promise((e) => setTimeout(e, 1e4));
			try {
				if ((await (await fetch("/urd.json", { cache: "no-store" })).json())?.engine === e) {
					x(Y("update.deployed"), "ok"), await new Promise((e) => setTimeout(e, 800)), location.reload();
					return;
				}
			} catch {}
		}
		x(Y("update.deployTimeout"), "error");
	}
	let Mr = null;
	function Pr(e) {
		return {
			schemaVersion: 1,
			meta: {
				id: e.id,
				title: e.title
			},
			sections: [{
				id: Va("sec"),
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
	async function Fr(e, { keepHistory: t = !1 } = {}) {
		P(g, e, !0), Mr = (async () => {
			let n = Ce(), r = null;
			try {
				let e = await fetch(`/${n.file}`);
				e.ok && (r = Fa(await e.json(), ye.data));
			} catch {}
			r ? Se.delete(e) : r = Pr(n), E = Ni(`urd-draft-${e}`, () => r, S), (E.data.schemaVersion ?? 1) > 1 && (console.warn(`Urd: utkastet for '${e}' har schemaVersion ${E.data.schemaVersion} (motoren har 1) og forkastes`), E.replace(structuredClone(r))), E.replace(Fa(E.data, ye.data)), E.save(), t || (De = null), P(Ut, null), P(Wt, null), we(), ge(), P(v, "");
		})(), await Mr;
	}
	function Ir() {
		D?.destroy(), z(ee)?.contentDocument?.addEventListener("pointerdown", () => {
			z(gt) && P(gt, null);
		}, !0), D = wa(z(ee), {
			onEdit: Is,
			onMove: Ls,
			onGrow: Iu,
			onDelete: Ku,
			onAddSection: Vu,
			onMoveSection: Hu,
			onDeleteSection: Uu,
			onSectionSize: Wu,
			onUndo: (e) => e.redo ? Ie() : Pe(),
			onSelectSection: tn,
			onSelectBlock: ht,
			onBlockMenu: vt,
			onReady: Lr,
			onNavigate: Kr,
			onAddBlock: (e) => Xu(e.sectionId, e.block),
			onAddBlocks: (e) => Zu(e.sectionId, e.blocks, e.minBottom, e.moves),
			onRequestBlock: id,
			onMoveBlockSection: Gu,
			onMobileManual: Lu,
			onMobileAuto: Ru,
			onReviewDone: zu,
			onBlockFlag: Bu,
			onCollectionEdit: ya,
			onSaveTemplate: la,
			onDeleteTemplate: ma,
			onApplyLayout: _e,
			onPluginBlocks: (e) => {
				P($u, e.blocks ?? [], !0);
			},
			onNavWidth: (e) => qr("edit:nav-width", () => {
				z(O).nav.style ??= {}, z(O).nav.style.width = e.width;
			})
		});
	}
	async function Lr() {
		await Mr, await Na, D?.sendPlugins(He(z(Ia))?.enabled ?? []), D?.sendViewport(z(ne)), _a(), ca(), ye.hasDraft() && xe();
		let e = !z(h).pages.some((e) => e.id === z(g));
		(E.hasDraft() || e) && D?.sendPage(z(g), E.data), z(T) || D?.sendChrome(!1), z($e) === "grid" && D?.sendShowGrid(!0), z(Rr) && D?.sendShowGuides(!0), f();
	}
	let Rr = /* @__PURE__ */ N(localStorage.getItem("urd-guides") === "1"), Br = /* @__PURE__ */ N(!1), Vr = /* @__PURE__ */ N(rn(localStorage.getItem("urd-layout-picker") === "menu" ? "menu" : "strip"));
	function Hr(e) {
		P(Vr, e === "menu" ? "menu" : "strip", !0), z(Vr) === "menu" ? localStorage.setItem("urd-layout-picker", "menu") : localStorage.removeItem("urd-layout-picker");
	}
	let Wr = /* @__PURE__ */ N(null);
	Sn(() => {
		if (!z(Br)) return;
		let e = (e) => {
			z(Wr)?.contains(e.target) || P(Br, !1);
		}, t = (e) => {
			e.key === "Escape" && P(Br, !1);
		}, n = () => {
			P(Br, !1);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t), window.removeEventListener("blur", n);
		};
	});
	function Gr() {
		P(Rr, !z(Rr)), localStorage.setItem("urd-guides", z(Rr) ? "1" : "0"), D?.sendShowGuides(z(Rr));
	}
	function Kr(e) {
		let t = e.path.replace(/\/$/, "") || "/", n = z(O).pages.find((e) => e.path === t);
		n && n.id !== z(g) && Fr(n.id);
	}
	function qr(e, t) {
		ke(e), t(), ye.save(), we(), xe();
	}
	let Jr = /* @__PURE__ */ N(""), Yr = /* @__PURE__ */ N(null), Xr = Object.fromEntries(No.map((e) => [e.id, jo(Po(e.id, {
		pageId: "forhandsvisning",
		title: ""
	}))])), Zr = /* @__PURE__ */ N(null);
	Sn(() => {
		if (!z(Zr)) return;
		let e = (e) => {
			e.target.closest?.(".page-menu-wrap") || P(Zr, null);
		}, t = (e) => {
			e.key === "Escape" && P(Zr, null);
		}, n = () => {
			P(Zr, null);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t), window.removeEventListener("blur", n);
		};
	});
	let Qr = [
		"admin",
		"api",
		"assets",
		"content",
		"media",
		"plugins",
		"functions",
		"readme"
	];
	function $r(e, t = null) {
		return e ? Qr.includes(e) ? Y("error.reservedName", { slug: e }) : z(O).pages.some((n) => n.id !== t && (n.path === `/${e}` || n.id === e)) ? Y("error.pageExists") : null : Y("error.pageNeedsName");
	}
	function ti() {
		let e = z(Jr).trim(), t = na(e), n = $r(t);
		if (n) {
			x(n, "error");
			return;
		}
		let r = z(Yr) && !z(Yr).startsWith("preset:") ? Zi[z(Yr)]?.data?.page : null, i = z(Yr)?.startsWith("preset:") ? Po(z(Yr).slice(7), {
			pageId: t,
			title: e
		}) ?? Pr({
			id: t,
			title: e
		}) : r ? lo(Fa(JSON.parse(JSON.stringify(r)), ye.data), Va, {
			id: t,
			title: e
		}) : Pr({
			id: t,
			title: e
		});
		qr("pages", () => {
			z(O).pages.push({
				id: t,
				title: e,
				path: `/${t}`,
				file: `content/pages/${t}.json`
			}), z(O).nav.items.push({
				label: e,
				page: t
			});
		}), C(`urd-draft-${t}`, JSON.stringify(i)), we(), P(Jr, ""), P(Yr, null), Fr(t);
	}
	async function ri(e) {
		P(Zr, null), await ua("page", e.id === z(g) ? JSON.parse(JSON.stringify(E.data)) : await ai(e));
	}
	function ii(e, t) {
		let n = t.trim();
		if (!n || n === e.title) return;
		let r = e.title;
		qr("pages", () => {
			e.title = n;
			for (let t of z(O).nav.items) t.page === e.id && t.label === r && (t.label = n);
		}), e.id === z(g) ? (E.data.meta.title = n, E.save(), we(), D?.sendPage(z(g), E.data)) : oi(e, (e) => {
			e.meta.title = n;
		});
	}
	async function ai(e) {
		let t = localStorage.getItem(`urd-draft-${e.id}`);
		if (t) try {
			return JSON.parse(t);
		} catch {}
		try {
			let t = await fetch(`/${e.file}`);
			if (t.ok) return Fa(await t.json(), ye.data);
		} catch {}
		return Pr(e);
	}
	async function oi(e, t) {
		let n = await ai(e);
		t(n), C(`urd-draft-${e.id}`, JSON.stringify(n)), we();
	}
	function ci(e, t) {
		let n = na(t);
		if (e.path === "/" || `/${n}` === e.path) return;
		let r = $r(n, e.id);
		if (r) {
			x(r, "error");
			return;
		}
		qr("pages", () => {
			e.path = `/${n}`;
		});
	}
	function li(e) {
		e.path !== "/" && (qr("pages", () => {
			z(O).pages = z(O).pages.filter((t) => t.id !== e.id), z(O).nav.items = z(O).nav.items.filter((t) => t.page !== e.id || t.children);
			for (let t of z(O).nav.items) t.page === e.id && delete t.page, t.children && (t.children = t.children.filter((t) => t.page !== e.id), t.children.length === 0 && delete t.children);
			z(O).nav.items = z(O).nav.items.filter((e) => e.page || e.href || e.children);
		}), e.id === z(g) && Fr(z(O).pages[0].id), x(Y("status.pageRemoved")));
	}
	function ui(e) {
		qr("edit:nav-logo", () => {
			z(O).nav.logo = {
				type: "text",
				value: "",
				...z(O).nav.logo,
				...e
			};
		});
	}
	function fi(e) {
		qr("nav", () => {
			z(O).nav.logo ??= {
				type: "text",
				value: z(O).site.title
			};
			let t = z(O).nav.logo, n = t.type === "image";
			e === "both" ? (n && (t.image = t.value, t.value = z(O).site.title), t.image ??= "", t.size ??= 32) : e === "image" ? (n || (t.value = t.image ?? ""), delete t.image, t.size ??= 32) : (n && (t.value = z(O).site.title), delete t.image), t.type = e;
		});
	}
	async function pi(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await jn(t);
			qr("nav", () => {
				let t = z(O).nav.logo;
				t.type === "both" ? t.image = e.dataUrl : t.value = e.dataUrl;
			});
		} catch {
			x(Y("status.imageReadErrorSvg"), "error");
		}
	}
	let mi = /* @__PURE__ */ N(null);
	async function gi(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		if (t.type === "image/svg+xml" || /\.svg$/i.test(t.name || "")) {
			try {
				let e = await An(t);
				P(mi, e.dataUrl, !0);
			} catch {
				x(Y("status.imageReadErrorSvg"), "error");
			}
			return;
		}
		let n = new FileReader();
		n.onload = () => {
			P(mi, String(n.result), !0);
		}, n.onerror = () => x(Y("status.imageReadError"), "error"), n.readAsDataURL(t);
	}
	function _i(e) {
		qr("edit:site-icon", () => {
			z(O).site.icon = e;
		}), P(mi, null);
	}
	function vi() {
		qr("edit:site-icon", () => {
			delete z(O).site.icon;
		});
	}
	function yi(e) {
		qr("edit:site-title", () => {
			z(O).site.title = e;
		});
	}
	function bi(e) {
		qr("edit:site-desc", () => {
			z(O).site.description = e;
		});
	}
	function xi() {
		let e = z(O).site.lang ?? "no";
		return e === "no" ? "nb" : e;
	}
	function Si() {
		let e = xi(), t = it([...rt, ...st()]);
		return [...t.some(([t]) => t === e) ? [] : [[e, e]], ...t];
	}
	function Ci(e) {
		qr("site", () => {
			z(O).site.lang = e;
		});
	}
	let wi = /^(?:data:image\/[\w.+-]+;base64,[A-Za-z0-9+/=]+|\/(?!\/)[\w%./-]*)$/;
	Sn(() => {
		if (!z(O)?.site) return;
		let e = z(O).site.icon, t = document.querySelector("link[rel=\"icon\"]");
		if (t) {
			if (typeof e != "string" || !e) {
				t.href = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%230b0e14'/%3E%3Cpath d='M19.2 51.2V16l25.6 10.4V51.2' fill='none' stroke='%2315b39a' stroke-width='6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E";
				return;
			}
			wi.test(e) && (t.href = e);
		}
	});
	function Ti(e) {
		qr("nav", () => {
			z(O).nav.layout = e;
		});
	}
	function Ei(e, t) {
		qr(`edit:nav-style-${e}`, () => {
			z(O).nav.style ??= {}, t === void 0 ? delete z(O).nav.style[e] : z(O).nav.style[e] = t;
		});
	}
	let Di = /* @__PURE__ */ M(() => z(O)?.nav?.variant === "side-left" || z(O)?.nav?.variant === "side-right"), Ai = /* @__PURE__ */ M(() => [
		"floating",
		"floating-square",
		"floating-tab"
	].includes(z(O)?.nav?.variant)), ji = {
		underline: [Y("hoverColor.underline.label"), Y("hoverColor.underline.title")],
		pill: [Y("hoverColor.pill.label"), Y("hoverColor.pill.title")],
		lift: [Y("hoverColor.lift.label"), Y("hoverColor.lift.title")]
	}, Mi = /* @__PURE__ */ M(() => ji[z(O)?.nav?.style?.hover] ?? null);
	function Pi(e) {
		qr("nav", () => {
			e === "bar" ? delete z(O).nav.variant : z(O).nav.variant = e;
		});
	}
	function Fi(e) {
		qr("nav", () => {
			z(O).nav.style ??= {}, e ? z(O).nav.style.glow = !0 : delete z(O).nav.style.glow;
		});
	}
	function Ii(e) {
		qr("nav", () => {
			z(O).nav.style ??= {}, e ? delete z(O).nav.style.topGap : z(O).nav.style.topGap = !1;
		});
	}
	function Li(e) {
		qr("nav", () => {
			z(O).nav.style ??= {}, e === "standard" ? delete z(O).nav.style.hover : z(O).nav.style.hover = e;
		});
	}
	let Ri = null, zi = {}, Bi = {}, Vi = !1, Hi = /* @__PURE__ */ N(rn([])), Ui = /* @__PURE__ */ N(rn({})), Wi = /* @__PURE__ */ N(null), Ki = /* @__PURE__ */ N(""), qi = /* @__PURE__ */ N("news"), Ji = [
		["news", Y("collectionKind.news")],
		["notices", Y("collectionKind.notices")],
		["publications", Y("collectionKind.publications")],
		["custom", Y("collectionKind.custom")]
	], Xi = null, Zi = {}, ia = {}, aa = !1, oa = /* @__PURE__ */ N(rn([]));
	async function sa() {
		let e = {
			version: 1,
			maler: []
		};
		try {
			e = await (await fetch("/content/maler.json")).json();
		} catch {}
		Xi = Ni("urd-draft-maler", () => e, S), P(oa, [...Xi.data.maler ?? []], !0);
		for (let e of z(oa)) {
			let t = null;
			try {
				t = await (await fetch(`/content/maler/${e}.json`)).json();
			} catch {}
			ia[e] = t, Zi[e] = Ni(`urd-draft-mal-${e}`, () => t, S), (Zi[e].data?.schemaVersion ?? 1) > 1 && Zi[e].reset();
		}
		aa = !0, ca();
	}
	function ca() {
		let e = z(oa).map((e) => Zi[e]?.data ? {
			id: e,
			...JSON.parse(JSON.stringify(Zi[e].data))
		} : null).filter(Boolean).map(({ id: e, mal: t, section: n, blocks: r, page: i }) => ({
			id: e,
			name: t.name,
			kind: t.kind,
			section: n,
			blocks: r,
			page: i
		}));
		D?.sendMaler(e);
	}
	function la(e) {
		let t = so.includes(e.kind) ? e.kind : "section";
		return ua(t, e[t]);
	}
	async function ua(e, t) {
		if (!t || !Xi) return;
		let n = (await Ue({
			title: Y("canvas.templateNamePrompt"),
			placeholder: Y("ph.templateName")
		}))?.trim();
		if (!n) return;
		let r = co(n);
		if (!r) {
			x(Y("status.invalidName"), "error");
			return;
		}
		if (z(oa).includes(r)) {
			x(Y("status.templateExists"), "error");
			return;
		}
		ke("maler");
		let i = {
			schemaVersion: 1,
			mal: {
				name: n,
				kind: e
			},
			[e]: t
		};
		Zi[r] = Ni(`urd-draft-mal-${r}`, () => null, S), Zi[r].replace(i), Zi[r].save(), Xi.data.maler = [...z(oa), r], Xi.save(), P(oa, [...z(oa), r], !0), x(Y("status.templateSaved", { name: n }), "ok"), we(), ca();
	}
	async function ma(e) {
		let t = Zi[e.id]?.data?.mal;
		t && await Ve({ title: Y("confirm.deleteTemplate", { name: t.name }) }) && (ke("maler"), z(Yr) === e.id && P(Yr, null), localStorage.removeItem(`urd-draft-mal-${e.id}`), delete Zi[e.id], Xi.data.maler = z(oa).filter((t) => t !== e.id), Xi.save(), P(oa, z(oa).filter((t) => t !== e.id), !0), we(), ca());
	}
	async function ha() {
		let e = {
			version: 1,
			samlinger: []
		};
		try {
			e = await (await fetch("/content/samlinger.json")).json();
		} catch {}
		Ri = Ni("urd-draft-samlinger", () => e, S), P(Hi, [...Ri.data.samlinger ?? []], !0);
		for (let e of z(Hi)) {
			let t = null;
			try {
				t = await (await fetch(`/content/samlinger/${e}.json`)).json();
			} catch {}
			Bi[e] = t, zi[e] = Ni(`urd-draft-samling-${e}`, () => t, S), !t && !zi[e].data && (zi[e].replace({
				schemaVersion: 1,
				id: e,
				name: e,
				kind: "custom",
				entries: []
			}), zi[e].save());
		}
		Vi = !0, ga();
	}
	function ga(e = !0) {
		let t = {};
		for (let e of z(Hi)) zi[e] && (t[e] = JSON.parse(JSON.stringify(zi[e].data)));
		P(Ui, t, !0), e && _a();
	}
	function _a() {
		D?.sendCollections(He(z(Ui)) ?? {});
	}
	function va(e, t, n, r = !0) {
		let i = zi[e];
		i && (ke(t), n(i.data), i.save(), we(), ga(r));
	}
	function ya(e) {
		let { collection: t, entryId: n, field: r, value: i } = e;
		[
			"title",
			"text",
			"image",
			"imageAlt",
			"imageStyle"
		].includes(r) && (r === "title" && !String(i ?? "").replace(/<[^>]*>/g, "").trim() || va(t, `edit:samling:${t}:${n}:${r}`, (e) => {
			let t = e.entries.find((e) => e.id === n);
			t && (i === "" && r !== "title" ? delete t[r] : t[r] = i);
		}, r === "image"));
	}
	function ba() {
		let e = z(Ki).trim();
		if (!e) return;
		let t = na(e);
		if (!t || z(Hi).includes(t)) {
			x(Y(t ? "status.collectionExists" : "status.invalidName"), "error");
			return;
		}
		ke("samlinger");
		let n = {
			schemaVersion: 1,
			id: t,
			name: e,
			kind: z(qi),
			entries: []
		};
		zi[t] = Ni(`urd-draft-samling-${t}`, () => null, S), zi[t].replace(n), zi[t].save(), Ri.data.samlinger = [...z(Hi), t], Ri.save(), P(Hi, [...z(Hi), t], !0), P(Wi, t, !0), P(Ki, ""), we(), ga();
	}
	function xa(e) {
		ke("samlinger"), localStorage.removeItem(`urd-draft-samling-${e}`), delete zi[e], Ri.data.samlinger = z(Hi).filter((t) => t !== e), Ri.save(), P(Hi, z(Hi).filter((t) => t !== e), !0), z(Wi) === e && P(Wi, null), we(), ga();
	}
	function Sa(e) {
		va(e, `samling:${e}:add-entry`, (e) => {
			e.entries.unshift({
				id: Va("innslag"),
				title: Y("seed.newEntry"),
				date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
				text: ""
			});
		});
	}
	function Ta(e, t, n, r) {
		va(e, `edit:samling:${e}:${t}:${n}`, (e) => {
			let i = e.entries.find((e) => e.id === t);
			i && (r === "" && n !== "title" ? delete i[n] : i[n] = r);
		});
	}
	function Da(e, t, n) {
		va(e, `samling:${e}:move-entry`, (e) => {
			let r = t + n;
			r < 0 || r >= e.entries.length || ([e.entries[t], e.entries[r]] = [e.entries[r], e.entries[t]]);
		});
	}
	function Oa(e, t) {
		va(e, `samling:${e}:remove-entry`, (e) => {
			e.entries = e.entries.filter((e) => e.id !== t);
		});
	}
	async function ka(e, t, n) {
		let r = n.target.files?.[0];
		n.target.value = "", r && Ta(e, t, "image", (await jn(r)).dataUrl);
	}
	let Aa = null, Ma, Na = new Promise((e) => {
		Ma = e;
	}), Ia = /* @__PURE__ */ N(null), La = rn({}), za = /* @__PURE__ */ N("0.0.0"), Ha = /* @__PURE__ */ N(""), Z = /* @__PURE__ */ N(""), Q = /* @__PURE__ */ N(rn([])), Ua = /* @__PURE__ */ N(rn([])), Wa = /* @__PURE__ */ N("pending"), Ga = () => [.../* @__PURE__ */ new Set([...z(Ia)?.enabled ?? [], ...z(Ia)?.disabled ?? []])];
	function Ka() {
		P(Ia, JSON.parse(JSON.stringify(Aa.data)), !0);
	}
	let qa = /* @__PURE__ */ N(null);
	async function Ja() {
		try {
			let e = (await fetch("/urd.json", { cache: "no-store" })).headers.get("content-security-policy");
			if (!e) {
				P(qa, { unknown: !0 }, !0);
				return;
			}
			let t = (t) => new Set((e.split(";").map((e) => e.trim()).find((e) => e.startsWith(`${t} `)) ?? "").split(/\s+/).slice(1));
			P(qa, {
				frameSrc: t("frame-src"),
				connectSrc: t("connect-src")
			}, !0);
		} catch {
			P(qa, { unknown: !0 }, !0);
		}
	}
	function Ya(e) {
		let t = [...(e.connectSrc ?? []).map((e) => ["connect-src", e]), ...(e.frameSrc ?? []).map((e) => ["frame-src", e])];
		if (!z(qa) || z(qa).unknown) return [];
		let n = {
			"connect-src": z(qa).connectSrc,
			"frame-src": z(qa).frameSrc
		};
		return t.filter(([e, t]) => !n[e]?.has(t)).map(([e, t]) => `${e} ${t}`);
	}
	async function Xa() {
		Ja();
		let e = {
			version: 1,
			enabled: []
		};
		try {
			e = await (await fetch("/plugins/plugins.json")).json();
		} catch {}
		P(Ua, e.enabled ?? [], !0), Aa = Ni("urd-draft-plugins", () => e, S), Ka();
		try {
			P(za, (await (await fetch("/urd.json")).json()).engine ?? "0.0.0", !0);
		} catch {}
		for (let e of Ga()) $a(e);
		Za(), Ma(), D?.sendPlugins(He(z(Ia))?.enabled ?? []);
	}
	async function Za() {
		try {
			let e = await fetch("/api/github/plugins");
			if (!e.ok) {
				Qa();
				return;
			}
			let { plugins: t } = await e.json();
			localStorage.setItem("urd-plugins-found", JSON.stringify(t ?? [])), P(Q, (t ?? []).filter((e) => !Ga().includes(e)), !0);
			for (let e of z(Q)) $a(e);
			P(Wa, "ok");
		} catch {
			Qa();
		}
	}
	function Qa() {
		try {
			let e = JSON.parse(localStorage.getItem("urd-plugins-found") ?? "[]");
			if (Array.isArray(e) && e.length) {
				P(Q, e.filter((e) => !Ga().includes(e)), !0);
				for (let e of z(Q)) $a(e);
				P(Wa, "ok");
				return;
			}
		} catch {}
		P(Wa, "unavailable");
	}
	async function $a(e) {
		try {
			let t = await (await fetch(`/plugins/${e}/plugin.json`)).json(), n = Ba(t);
			La[e] = {
				...t,
				errors: n,
				satisfied: n.length === 0 && Ra(z(za), t.requiresEngine)
			};
		} catch {
			La[e] = {
				name: e,
				errors: [Y("plugin.manifestNotFound", { id: e })],
				satisfied: !1
			};
		}
	}
	function eo(e, t) {
		ke("plugins");
		let n = Aa.data;
		n.enabled = (n.enabled ?? []).filter((t) => t !== e), n.disabled = (n.disabled ?? []).filter((t) => t !== e), t ? n.enabled.push(e) : n.disabled.push(e), Aa.save(), we(), Ka(), to();
	}
	function to() {
		z(ee) && (z(ee).src = z(ee).src);
	}
	function no(e) {
		ke("plugins");
		let t = Aa.data;
		t.enabled = (t.enabled ?? []).filter((t) => t !== e), t.disabled = (t.disabled ?? []).filter((t) => t !== e), Aa.save(), we(), Ka(), to();
	}
	async function ro() {
		P(Z, "");
		let e = z(Ha).trim().toLowerCase();
		if (!/^[a-z0-9][a-z0-9-]*$/.test(e)) {
			P(Z, Y("plugin.invalidId"), !0);
			return;
		}
		if (Ga().includes(e)) {
			P(Z, Y("plugin.alreadyListed"), !0);
			return;
		}
		if (await $a(e), La[e].errors.length) {
			P(Z, Y("plugin.invalidManifest", { errors: La[e].errors.join("; ") }), !0);
			return;
		}
		eo(e, !0), P(Ha, "");
	}
	function io(e) {
		P(Q, z(Q).filter((t) => t !== e), !0), eo(e, !0);
	}
	function $(e, t) {
		qr(e, () => {
			z(O).footer ??= {
				version: 1,
				show: !1,
				text: "",
				align: "center"
			}, t(z(O).footer);
		});
	}
	function ao(e, t) {
		$(`edit:footer-brand-${e}`, (n) => {
			n.brand ??= {}, t.trim() ? n.brand[e] = t : delete n.brand[e], !n.brand.title && !n.brand.tagline && !n.brand.logo && delete n.brand;
		});
	}
	function oo(e) {
		$("footer", (t) => {
			t.brand ??= {}, e === "image" || e === "both" ? t.brand.mode = e : delete t.brand.mode;
		});
	}
	async function uo(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await jn(t);
			$("footer", (t) => {
				t.brand ??= {}, t.brand.logo = e.dataUrl, t.brand.mode || (t.brand.mode = "both");
			});
		} catch {
			x(Y("status.imageReadErrorSvg"), "error");
		}
	}
	function fo() {
		$("footer", (e) => {
			e.brand && (delete e.brand.logo, delete e.brand.mode, delete e.brand.logoHeight, !e.brand.title && !e.brand.tagline && delete e.brand);
		});
	}
	function po(e) {
		$("edit:footer-logo-height", (t) => {
			t.brand ??= {};
			let n = Number(e);
			Number.isFinite(n) && (t.brand.logoHeight = Math.min(160, Math.max(16, Math.round(n))));
		});
	}
	function mo(e) {
		$("edit:footer-copyright", (t) => {
			e.trim() ? t.copyright = e : delete t.copyright;
		});
	}
	let ho = [
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
			id: "sentrert",
			label: Y("footerTemplate.sentrert"),
			thumb: {
				center: !0,
				row: !0,
				social: 3
			}
		},
		{
			id: "kolonner",
			label: Y("footerTemplate.kolonner"),
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
			id: "nyhetsbrev",
			label: Y("footerTemplate.nyhetsbrev"),
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
			label: Y("footerTemplate.storcta"),
			thumb: {
				center: !0,
				bigcta: !0,
				baselineLinks: 2
			}
		},
		{
			id: "kontakt",
			label: Y("footerTemplate.kontakt"),
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
	function go(e) {
		let t = Y("seed.orgName"), n = z(O).pages ?? [], r = (e) => n.slice(0, e).map((e) => ({
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
		} : e === "sentrert" ? {
			align: "center",
			brand: { title: t },
			linkRow: r(5),
			social: i([
				"facebook",
				"instagram",
				"x"
			]),
			copyright: `${o} · ${Y("seed.footer.madeWith")}`
		} : e === "kolonner" ? {
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
		} : e === "nyhetsbrev" ? {
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
		} : e === "storcta" ? {
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
		} : e === "kontakt" ? {
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
					version: os.version ?? 1,
					props: {
						...os.defaults(),
						color: "accent",
						x: .12,
						y: 0,
						radius: .6,
						opacity: .45
					}
				}, {
					type: "grain",
					version: cs.version ?? 1,
					props: {
						...cs.defaults(),
						opacity: .08
					}
				}]
			}
		};
	}
	function _o(e) {
		$("footer-template", (t) => {
			let n = go(e);
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
	function vo(e) {
		$("footer", (t) => {
			t[e] ??= [], t[e].push(z(O).pages[0] ? {
				label: Y("seed.link"),
				page: z(O).pages[0].id
			} : {
				label: Y("seed.link"),
				href: "https://"
			});
		});
	}
	function yo(e, t) {
		$("footer", (n) => {
			n[e].splice(t, 1), n[e].length || delete n[e];
		});
	}
	function bo(e, t, n) {
		$("footer", (r) => {
			let i = r[e], a = t + n;
			a < 0 || a >= i.length || ([i[t], i[a]] = [i[a], i[t]]);
		});
	}
	function xo(e, t, n) {
		$(`edit:footer-${e}-label-${t}`, (r) => {
			r[e][t].label = n;
		});
	}
	function So(e, t, n) {
		$("footer", (r) => {
			let i = r[e][t];
			n === "__href" ? (delete i.page, i.href = i.href ?? "https://") : (i.page = n, delete i.href);
		});
	}
	function Co(e, t, n) {
		$(`edit:footer-${e}-href-${t}`, (r) => {
			r[e][t].href = n;
		});
	}
	function wo(e) {
		$("footer", (t) => {
			e === "center" ? t.columnsAlign = "center" : delete t.columnsAlign;
		});
	}
	function To(e) {
		$("footer", (t) => {
			e ? t.cta ??= {
				kind: "button",
				label: Y("seed.join")
			} : delete t.cta;
		});
	}
	function Eo(e, t) {
		$(`edit:footer-cta-${e}`, (n) => {
			n.cta ??= {}, t === "" || t == null || t === !1 ? delete n.cta[e] : n.cta[e] = t;
		});
	}
	function Do(e) {
		$("footer", (t) => {
			t.cta ??= {}, e === "__href" ? (delete t.cta.page, t.cta.href = t.cta.href ?? "https://") : (t.cta.page = e, delete t.cta.href);
		});
	}
	function Oo(e, t) {
		$("footer", (n) => {
			let r = new Set(n.hideOn ?? []);
			t ? r.delete(e) : r.add(e), r.size ? n.hideOn = [...r] : delete n.hideOn;
		});
	}
	function ko() {
		$("footer", (e) => {
			e.columns ??= [], e.columns.push({
				title: Y("seed.column"),
				links: [{
					label: Y("seed.link"),
					page: z(O).pages[0].id
				}]
			});
		});
	}
	function Ao(e) {
		$("footer", (t) => {
			t.columns.splice(e, 1), t.columns.length || delete t.columns;
		});
	}
	function Mo(e, t) {
		$("footer", (n) => {
			let r = e + t;
			r < 0 || r >= n.columns.length || ([n.columns[e], n.columns[r]] = [n.columns[r], n.columns[e]]);
		});
	}
	function Fo(e, t) {
		$(`edit:footer-col-title-${e}`, (n) => {
			n.columns[e].title = t;
		});
	}
	function Io(e) {
		$("footer", (t) => {
			t.columns[e].links ??= [], t.columns[e].links.push({
				label: Y("seed.link"),
				page: z(O).pages[0].id
			});
		});
	}
	function Ro(e, t) {
		$("footer", (n) => {
			n.columns[e].links.splice(t, 1);
		});
	}
	function zo(e, t, n) {
		$("footer", (r) => {
			let i = r.columns[e].links, a = t + n;
			a < 0 || a >= i.length || ([i[t], i[a]] = [i[a], i[t]]);
		});
	}
	function Bo(e, t, n) {
		$(`edit:footer-link-label-${e}-${t}`, (r) => {
			r.columns[e].links[t].label = n;
		});
	}
	function Ho(e, t, n) {
		$("footer", (r) => {
			let i = r.columns[e].links[t];
			n === "__href" ? (delete i.page, i.href = i.href ?? "https://") : (i.page = n, delete i.href);
		});
	}
	function Uo(e, t, n) {
		$(`edit:footer-link-href-${e}-${t}`, (r) => {
			r.columns[e].links[t].href = n;
		});
	}
	function Jo() {
		$("footer", (e) => {
			e.social ??= [], e.social.push({
				icon: "facebook",
				url: "https://"
			});
		});
	}
	function Yo(e) {
		$("footer", (t) => {
			t.social.splice(e, 1), t.social.length || delete t.social;
		});
	}
	function Xo(e, t) {
		$("footer", (n) => {
			let r = e + t;
			r < 0 || r >= n.social.length || ([n.social[e], n.social[r]] = [n.social[r], n.social[e]]);
		});
	}
	function Zo(e, t) {
		$("footer", (n) => {
			n.social[e].icon = t;
		});
	}
	function Qo(e, t) {
		$(`edit:footer-social-url-${e}`, (n) => {
			n.social[e].url = t;
		});
	}
	let $o = fa.filter(([e]) => e === "iconCat.social" || e === "iconCat.communication").flatMap(([, e]) => e.map((e) => [e, da[e].label]));
	function es(e, t) {
		qr(`edit:nav-label-${e}`, () => {
			z(O).nav.items[e].label = t;
		});
	}
	function ts(e, t) {
		qr("nav", () => {
			let n = z(O).nav.items[e];
			t === "__href" ? (delete n.page, n.href = n.href ?? "https://") : t === "__none" ? (delete n.page, delete n.href) : (n.page = t, delete n.href);
		});
	}
	function ns(e, t) {
		qr(`edit:nav-href-${e}`, () => {
			z(O).nav.items[e].href = t;
		});
	}
	function rs(e, t) {
		let n = e + t, r = z(O).nav.items;
		n < 0 || n >= r.length || qr("nav", () => {
			[r[e], r[n]] = [r[n], r[e]];
		});
	}
	function is(e) {
		qr("nav", () => {
			z(O).nav.items.splice(e, 1);
		});
	}
	function ss() {
		qr("nav", () => {
			z(O).nav.items.push({
				label: Y("seed.link"),
				page: z(O).pages[0].id
			});
		});
	}
	function ls(e) {
		qr("nav", () => {
			let t = z(O).nav.items[e];
			t.children ??= [], t.children.push({
				label: Y("seed.link"),
				page: z(O).pages[0].id
			});
		});
	}
	function us(e, t, n) {
		qr(`edit:nav-child-label-${e}-${t}`, () => {
			z(O).nav.items[e].children[t].label = n;
		});
	}
	function ds(e, t, n) {
		qr("nav", () => {
			let r = z(O).nav.items[e].children[t];
			n === "__href" ? (delete r.page, r.href = r.href ?? "https://") : (r.page = n, delete r.href);
		});
	}
	function fs(e, t, n) {
		qr(`edit:nav-child-href-${e}-${t}`, () => {
			z(O).nav.items[e].children[t].href = n;
		});
	}
	function ps(e, t, n) {
		let r = t + n, i = z(O).nav.items[e].children;
		r < 0 || r >= i.length || qr("nav", () => {
			[i[t], i[r]] = [i[r], i[t]];
		});
	}
	function ms(e, t) {
		qr("nav", () => {
			let n = z(O).nav.items[e];
			n.children.splice(t, 1), n.children.length === 0 && (delete n.children, !n.page && !n.href && (n.page = z(O).pages[0].id));
		});
	}
	function hs(e, t) {
		qr(`edit:theme-color-${e}`, () => {
			z(O).theme.tokens.color[e] = t, z(O).theme.alt?.auto && (z(O).theme.alt.tokens.color = ys());
		});
	}
	function gs(e, t) {
		qr("theme", () => {
			z(O).theme.tokens.font[e] = t;
		});
	}
	function _s(e, t) {
		qr("theme", () => {
			z(O).theme.tokens.radius[e] = t;
		});
	}
	function vs(e) {
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
	function ys() {
		return Object.fromEntries(Object.entries(z(O).theme.tokens.color).map(([e, t]) => [e, vs(t)]));
	}
	function bs(e, t) {
		qr(`edit:theme-alt-${e}`, () => {
			z(O).theme.alt.tokens.color[e] = t, z(O).theme.alt.auto = !1;
		});
	}
	function xs(e) {
		qr("theme", () => {
			e === "light" ? delete z(O).theme.scheme : z(O).theme.scheme = e;
		});
	}
	function Ss(e) {
		qr("theme", () => {
			e ? z(O).theme.alt = {
				auto: !0,
				tokens: { color: ys() }
			} : delete z(O).theme.alt;
		});
	}
	function Cs(e) {
		qr("theme", () => {
			z(O).theme.alt ??= { tokens: { color: ys() } }, z(O).theme.alt.auto = e, e && (z(O).theme.alt.tokens.color = ys());
		});
	}
	function ws(e) {
		let t = z(O).theme.tokens.font[e];
		return [...zs.some(([, e]) => e === t) ? [] : [[t, Y("opt.customFont")]], ...zs.map(([e, t]) => [t, Y(e)])];
	}
	let Ts = (e) => parseInt(e, 10) || 0;
	function Es(e, t) {
		_s(e, `${t}px`);
	}
	let Ds = (e, t) => e && t && t[e] ? t[e] : e, Os = [
		"bg",
		"surface",
		"text",
		"accent",
		"accent-text"
	], ks = [
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
	function js(e) {
		qr("theme", () => {
			let t = e.scheme === "dark", n = t ? e.dark : e.light, r = t ? e.light : e.dark;
			for (let e of Os) z(O).theme.tokens.color[e] = n[e];
			t ? z(O).theme.scheme = "dark" : delete z(O).theme.scheme, z(O).theme.alt = { tokens: { color: { ...r } } };
		});
	}
	let Ms = /* @__PURE__ */ M(() => {
		if (!z(O)) return null;
		let e = z(O).theme.tokens.color, t = z(O).theme.alt?.tokens?.color ?? {}, n = z(O).theme.scheme === "dark";
		return ks.find((r) => {
			let i = n ? r.dark : r.light, a = n ? r.light : r.dark;
			return Os.every((n) => e[n] === i[n] && t[n] === a[n]);
		})?.id ?? null;
	});
	function Ns() {
		P(T, !z(T)), D?.sendChrome(z(T));
	}
	function Is(e) {
		let t = E.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		n && (ke(`edit:${e.blockId}`), n.props = e.props, E.save(), we(), z(A)?.blockId === e.blockId && mt(), e.rerender && D?.sendSection(z(g), t), P(v, ""));
	}
	function Ls(e) {
		let t = E.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		if (!n) return;
		ke(e.coalesce ? `edit:${e.groupKey ?? e.blockId}` : "move-block");
		let r = e.frameKey === "mobile" ? "mobile" : "desktop";
		n.frames[r] = e.frame, r === "desktop" && ve(t, "desktop-endret-etter-mobil"), E.save(), we(), z(A)?.blockId === e.blockId && mt();
	}
	function Iu(e) {
		let t = E.data.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
		!t?.frames?.desktop || t.frames.desktop.h === e.h || (E.amendBaseline((t) => {
			let n = t.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
			n?.frames?.desktop && (n.frames.desktop.h = e.h);
		}), E.hasDraft() && ke(`edit:${e.blockId}`), t.frames.desktop.h = e.h, E.save(), we(), z(A)?.blockId === e.blockId && mt());
	}
	function Lu(e) {
		let t = E.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			ke("mobile-manual");
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
			}, E.save(), we();
		}
	}
	function Ru(e) {
		let t = E.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			ke("mobile-auto");
			for (let e of t.blocks) e.frames.mobile = null;
			t.responsive = {
				...t.responsive ?? {},
				mobile: {
					mode: "auto",
					attention: null
				}
			}, E.save(), we(), ge(), D?.sendSection(z(g), t);
		}
	}
	function zu(e) {
		let t = E.data.sections.find((t) => t.id === e.sectionId);
		t?.responsive?.mobile && (ke("review-done"), t.responsive.mobile.attention = null, E.save(), we(), ge());
	}
	function Bu(e) {
		let t = E.data.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
		t && (ke("decor"), t.decor = e.decor, E.save(), we(), z(A)?.blockId === e.blockId && mt());
	}
	function Vu(e) {
		ke("add-section"), e.section.id || (e.section.id = Va("sec")), E.data.sections.splice(e.index, 0, e.section), E.save(), we(), D?.sendPage(z(g), E.data), P(Ut, e.section.id, !0), Xt(e.section), z($e) !== "properties" && (P($e, "properties"), D?.sendShowGrid(!1));
	}
	function Hu(e) {
		let t = E.data.sections, n = t.findIndex((t) => t.id === e.sectionId), r = n + e.dir;
		n < 0 || r < 0 || r >= t.length || (ke("move-section"), [t[n], t[r]] = [t[r], t[n]], E.save(), we(), D?.sendPage(z(g), E.data));
	}
	function Uu(e) {
		ke("delete-section"), e.sectionId === z(Ut) && (P(Ut, null), P(Wt, null)), z(A)?.sectionId === e.sectionId && P(A, null), E.data.sections = E.data.sections.filter((t) => t.id !== e.sectionId), E.save(), we(), D?.sendPage(z(g), E.data);
	}
	function Wu(e) {
		let t = E.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			ke("section-size"), t.size = {
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
			e.moves?.length && (ve(t, "seksjonshøyde"), z(A)?.sectionId === e.sectionId && mt()), e.sectionId === z(Ut) && P(Gt, e.minHeight, !0), E.save(), we();
		}
	}
	function Gu(e) {
		let t = E.data.sections.find((t) => t.id === e.fromSectionId), n = E.data.sections.find((t) => t.id === e.toSectionId), r = t?.blocks.find((t) => t.id === e.blockId);
		!t || !n || !r || (ke("move-block"), t.blocks = t.blocks.filter((t) => t.id !== e.blockId), r.frames.desktop = e.frame, r.frames.mobile = null, n.blocks.push(r), ve(t, "blokk-flyttet"), ve(n, "blokk-flyttet"), E.save(), we(), ge(), D?.sendPage(z(g), E.data), z(A)?.blockId === e.blockId && (P(A, {
			...z(A),
			sectionId: e.toSectionId
		}, !0), mt()));
	}
	function Ku(e) {
		let t = E.data.sections.find((t) => t.id === e.sectionId);
		if (!t) return;
		let n = e.blockIds ?? [e.blockId];
		ke("delete-block"), t.blocks = t.blocks.filter((e) => !n.includes(e.id)), n.includes(z(A)?.blockId) && P(A, null), ve(t, "blokk-slettet"), E.save(), we(), D?.sendSection(z(g), t);
	}
	let qu = {
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
		tidslinje: {
			type: "tidslinje",
			props: {
				items: [
					{
						year: "2019",
						title: Y("seed.tidslinje.t1"),
						text: Y("seed.tidslinje.text")
					},
					{
						year: "2022",
						title: Y("seed.tidslinje.t2"),
						text: Y("seed.tidslinje.text")
					},
					{
						year: "2026",
						title: Y("seed.tidslinje.t3"),
						text: Y("seed.tidslinje.text")
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
				text: Y("seed.sitat.text"),
				attribution: Y("seed.sitat.name"),
				role: Y("seed.sitat.role"),
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
				label: Y("seed.statistikk.label"),
				countUp: !0
			},
			w: 20,
			h: 90
		}
	};
	function Ju(e) {
		let t = qu[e];
		return t ? {
			id: Va("blk"),
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
	function Yu(e) {
		D ? D.sendPlaceBlock(e) : Xu(sr()?.id, e);
	}
	function Xu(e, t) {
		let n = E.data.sections.find((t) => t.id === e) ?? E.data.sections[0];
		if (!n) return;
		ke("add-block");
		let r = Math.max(0, ...n.blocks.map((e) => e.frames?.desktop?.z ?? 1)) + 1;
		t.frames?.desktop && (t.frames.desktop = {
			...t.frames.desktop,
			z: r
		}), n.blocks.push(t), ve(n, "blokk-lagt-til"), E.save(), we(), D?.sendSection(z(g), n);
	}
	function Zu(e, t, n, r) {
		let i = E.data.sections.find((t) => t.id === e);
		if (!i || !t?.length) return;
		ke("add-blocks");
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
		}), ve(i, "blokk-lagt-til"), E.save(), we(), D?.sendSection(z(g), i);
	}
	function Qu(e) {
		Yu(Ju(e));
	}
	let $u = /* @__PURE__ */ N(rn([]));
	function ed(e, t = {}) {
		let n = He(e);
		Yu({
			id: Va("blk"),
			type: n.type,
			version: n.version ?? 1,
			decor: !1,
			props: {
				...n.defaults ?? {},
				...He(t)
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
	let td = /* @__PURE__ */ N("");
	function nd() {
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
				label: Y("blocks.samling"),
				act: "block",
				kind: "samling"
			},
			{
				label: Y("blocks.faq"),
				act: "block",
				kind: "faq"
			},
			{
				label: Y("blocks.tidslinje"),
				act: "block",
				kind: "tidslinje"
			},
			{
				label: Y("blocks.sitat"),
				act: "block",
				kind: "sitat"
			},
			{
				label: Y("blocks.statistikk"),
				act: "block",
				kind: "statistikk"
			},
			{
				label: Y("ui.emptyGallery"),
				act: "block",
				kind: "galleri"
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
		for (let t of z(oa)) {
			let n = Zi[t]?.data?.mal;
			n?.kind === "blocks" && e.push({
				label: n.name,
				act: "mal",
				id: t
			});
		}
		for (let t of z($u)) if (t.variants?.length) for (let n of t.variants) e.push({
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
	function rd(e) {
		e.act === "block" ? Qu(e.kind) : e.act === "plugin" ? ed(e.entry, e.props ?? {}) : e.act === "mal" && D?.sendInsertTemplate(e.id);
	}
	function id(e) {
		let t = Ju(e.kind);
		if (t) {
			if (e.at && typeof e.at.x == "number" && typeof e.at.y == "number") {
				let n = E.data.sections.find((t) => t.id === e.sectionId)?.grid ?? z(O).grid, r = Bs({
					x: e.at.x,
					y: e.at.y,
					w: t.frames.desktop.w,
					h: t.frames.desktop.h,
					grid: n
				});
				t.frames.desktop.x = r.x, t.frames.desktop.y = r.y;
			} else t.frames.desktop.x = Math.round((100 - t.frames.desktop.w) / 2 * 100) / 100, t.frames.desktop.y = 40;
			Xu(e.sectionId, t), D?.sendSelect(t.id), e.kind === "image" && x(Y("status.imageBlockAdded")), e.kind === "galleri" && x(Y("status.galleryBlockAdded"));
		}
	}
	async function ad(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		x(Y("status.compressingImage"));
		let n;
		try {
			n = await jn(t);
		} catch {
			x(Y("status.imageReadError"), "error");
			return;
		}
		let r = Math.round(n.height / n.width * .3 * (z(ee)?.clientWidth ?? 1280));
		Yu({
			id: Va("blk"),
			type: "image",
			version: 1,
			props: {
				src: n.dataUrl,
				alt: na(t.name).replaceAll("-", " "),
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
		}), n.bytes > 4e5 ? x(Y("status.imageLarge", { kb: Math.round(n.bytes / 1024) }), "error") : x("");
	}
	async function od(e) {
		let t = [], n = 0, r = 0;
		for (let i of e) try {
			let e = await jn(i);
			e.bytes > 4e5 && (r += 1), t.push({
				src: e.dataUrl,
				alt: na(i.name).replaceAll("-", " "),
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
	function sd(e, t, n) {
		t ? x(Y("status.imagesReadFailed", { n: t }), "error") : n ? x(Y("status.imagesLarge", { n }), "error") : x(e ? "" : Y("status.noImagesAdded"));
	}
	async function cd(e) {
		let t = [...e.target.files ?? []];
		if (e.target.value = "", !t.length) return;
		x(Y("status.compressingImages"));
		let { images: n, failed: r, big: i } = await od(t);
		n.length && yt("galleri-add", (e) => {
			e.props.images.push(...n);
		}), sd(n.length, r, i);
	}
	async function ld(e) {
		let t = [...e.target.files ?? []];
		if (e.target.value = "", !t.length) return;
		x(Y("status.compressingImages"));
		let { images: n, failed: r, big: i } = await od(t);
		if (!n.length) {
			sd(0, r, i);
			return;
		}
		let a = Ju("galleri");
		a.props.images = n, Yu(a), sd(n.length, r, i);
	}
	function ud(e, t) {
		yt("galleri-move", (n) => {
			let r = e + t;
			r < 0 || r >= n.props.images.length || ([n.props.images[e], n.props.images[r]] = [n.props.images[r], n.props.images[e]]);
		});
	}
	function dd(e) {
		yt("galleri-remove", (t) => {
			t.props.images.splice(e, 1);
		});
	}
	function fd(e, t, n) {
		yt(`edit:${z(A).blockId}:img${e}-${t}`, (r) => {
			r.props.images[e][t] = n;
		});
	}
	function pd(e, t, n, r) {
		let i = e?.[t];
		if (!i?.startsWith("data:image/")) return;
		let a = i.split(",", 2)[1], o = `media/${na(n || "bilde")}-${ra(a)}.${ta(i)}`;
		r.push({
			path: o,
			content: a,
			encoding: "base64"
		}), e[t] = `/${o}`;
	}
	function md(e, t) {
		for (let n of e?.layers ?? []) if (n.type === "image" && pd(n.props, "src", "bakgrunn", t), n.type === "bildegalleri") for (let e of n.props.images ?? []) pd(e, "src", "bakgrunn", t);
	}
	function hd(e, t) {
		if (e.type === "image" && pd(e.props, "src", e.props.alt, t), e.type === "icon" && pd(e.props, "image", "ikon", t), e.type === "galleri") for (let n of e.props.images ?? []) pd(n, "src", n.alt || "galleri", t);
	}
	function gd(e, t) {
		md(e.background, t);
		for (let n of e.blocks) hd(n, t);
	}
	function _d(e) {
		let t = [];
		for (let n of e.sections) gd(n, t);
		return t;
	}
	function vd(e) {
		let t = [], n = e.nav?.logo;
		return n?.type === "image" && pd(n, "value", "logo", t), n?.type === "both" && pd(n, "image", "logo", t), e.nav?.style && pd(e.nav.style, "image", "meny", t), md(e.nav?.style?.background, t), md(e.footer?.background, t), e.footer?.brand && pd(e.footer.brand, "logo", "footer-logo", t), pd(e.site, "icon", "ikon", t), t;
	}
	let yd = /* @__PURE__ */ N(!1);
	function bd() {
		if (!z(yd)) {
			P(yd, !0);
			return;
		}
		P(yd, !1), xd();
	}
	Sn(() => {
		if (!z(yd)) return;
		let e = (e) => {
			e.target?.closest?.(".discard-btn") || P(yd, !1);
		}, t = (e) => {
			e.key === "Escape" && P(yd, !1);
		}, n = () => P(yd, !1);
		return window.addEventListener("pointerdown", e, !0), window.addEventListener("keydown", t, !0), window.addEventListener("blur", n), () => {
			window.removeEventListener("pointerdown", e, !0), window.removeEventListener("keydown", t, !0), window.removeEventListener("blur", n);
		};
	});
	function xd() {
		ke("discard");
		for (let e of z(O).pages) e.id !== z(g) && !Se.has(e.id) && localStorage.removeItem(`urd-draft-${e.id}`);
		let e = E.reset();
		if (ye.reset(), Aa && (Aa.reset(), Ka()), Ri) {
			Ri.reset(), P(Hi, [...Ri.data.samlinger ?? []], !0);
			for (let e of Object.keys(zi)) z(Hi).includes(e) ? zi[e].reset() : delete zi[e];
			ga();
		}
		if (Xi) {
			Xi.reset(), P(oa, [...Xi.data.maler ?? []], !0);
			for (let e of Object.keys(Zi)) z(oa).includes(e) ? Zi[e].reset() : (localStorage.removeItem(`urd-draft-mal-${e}`), delete Zi[e]);
			ca();
		}
		be(), P(te, {
			snap: !0,
			...z(O).grid
		}, !0), we(), P(v, ""), xe(), z(O).pages.some((e) => e.id === z(g)) ? D?.sendPage(z(g), e) : Fr(z(O).pages[0].id);
	}
	async function Sd() {
		if (br) {
			x(Y("status.revertReloadBeforePublish"), "error");
			return;
		}
		if (z(Dr)) {
			x(Y("update.publishBlocked"), "error");
			return;
		}
		x(Y("status.publishing"));
		let e = [], t = [], n = [], r = [];
		for (let i of z(O).pages) {
			let a = `urd-draft-${i.id}`, o = Se.has(i.id) || !z(h).pages.some((e) => e.id === i.id), s = null;
			if (i.id === z(g) && (E.hasDraft() || o)) s = E.data;
			else if (i.id !== z(g)) {
				let e = localStorage.getItem(a);
				if (e) try {
					s = Fa(JSON.parse(e), ye.data);
				} catch {}
			}
			if (!s && o && (s = Pr(i)), !s) continue;
			let c = JSON.parse(JSON.stringify(s));
			e.push(..._d(c)), e.push({
				path: i.file,
				content: JSON.stringify(c, null, 2) + "\n",
				encoding: "utf-8"
			}), t.push(i.title), o ? r.push(i.id) : n.push(a);
		}
		if (ye.hasDraft()) {
			let r = JSON.parse(JSON.stringify(z(O)));
			e.push(...vd(r)), e.push({
				path: "content/site.json",
				content: JSON.stringify(r, null, 2) + "\n",
				encoding: "utf-8"
			}), e.push({
				path: "content/theme.css",
				content: Vo(r.theme),
				encoding: "utf-8"
			}), n.push("urd-draft-site");
			let i = (e, t) => JSON.stringify(e ?? null) === JSON.stringify(t ?? null);
			i(z(h).theme, z(O).theme) || t.push("tema"), i(z(h).nav, z(O).nav) || t.push("menyen"), i(z(h).footer, z(O).footer) || t.push("footeren"), i(z(h).pages, z(O).pages) || t.push("sideregisteret"), i(z(h).grid, z(O).grid) || t.push("gridet"), (z(h).site.icon ?? null) !== (z(O).site.icon ?? null) && t.push("nettstedsikonet");
			let { icon: a, ...o } = z(h).site, { icon: s, ...c } = z(O).site;
			i(o, c) || t.push("nettstedsinfo");
		}
		let i = Object.entries(zi).filter(([, e]) => e.hasDraft());
		if (i.length || Ri?.hasDraft()) {
			for (let [t, r] of i) {
				let i = JSON.parse(JSON.stringify(r.data));
				for (let t of i.entries) pd(t, "image", t.title, e);
				e.push({
					path: `content/samlinger/${t}.json`,
					content: JSON.stringify(i, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push(`urd-draft-samling-${t}`);
			}
			if (Ri?.hasDraft()) {
				e.push({
					path: "content/samlinger.json",
					content: JSON.stringify(Ri.data, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push("urd-draft-samlinger");
				let t = { samlinger: [] };
				try {
					t = await (await fetch("/content/samlinger.json")).json();
				} catch {}
				let r = new Set(e.map((e) => e.path));
				for (let n of t.samlinger ?? []) {
					let t = `content/samlinger/${n}.json`;
					!z(Hi).includes(n) && !r.has(t) && e.push({
						path: t,
						delete: !0
					});
				}
			}
			t.push("samlinger");
		}
		let a = Object.entries(Zi).filter(([, e]) => e.hasDraft());
		if (a.length || Xi?.hasDraft()) {
			for (let [t, r] of a) {
				let i = JSON.parse(JSON.stringify(r.data));
				i.section && gd(i.section, e);
				for (let t of i.blocks ?? []) hd(t, e);
				for (let t of i.page?.sections ?? []) gd(t, e);
				e.push({
					path: `content/maler/${t}.json`,
					content: JSON.stringify(i, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push(`urd-draft-mal-${t}`);
			}
			if (Xi?.hasDraft()) {
				e.push({
					path: "content/maler.json",
					content: JSON.stringify(Xi.data, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push("urd-draft-maler");
				let t = { maler: [] };
				try {
					t = await (await fetch("/content/maler.json")).json();
				} catch {}
				let r = new Set(e.map((e) => e.path));
				for (let n of t.maler ?? []) {
					let t = `content/maler/${n}.json`;
					!z(oa).includes(n) && !r.has(t) && e.push({
						path: t,
						delete: !0
					});
				}
			}
			t.push("maler");
		}
		Aa?.hasDraft() && (e.push({
			path: "plugins/plugins.json",
			content: JSON.stringify(Aa.data, null, 2) + "\n",
			encoding: "utf-8"
		}), n.push("urd-draft-plugins"), t.push("plugins"));
		try {
			let t = await (await fetch("/index.html")).text();
			for (let n of z(O).pages) n.path !== "/" && e.push({
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
		for (let e of z(h).pages) {
			let t = z(O).pages.find((t) => t.id === e.id);
			t ? t.path !== e.path && e.path !== "/" && s(`${e.path.slice(1)}/index.html`) : (s(e.file), e.path !== "/" && s(`${e.path.slice(1)}/index.html`));
		}
		let c = await mr(e);
		if (!c.ok) {
			x(Y("status.publishAborted"), "error");
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
			e ? fr = e : pr(), _d(E.data), vd(z(O));
			for (let e of n) localStorage.removeItem(e);
			for (let e of r) Se.add(e);
			if (P(h, JSON.parse(JSON.stringify(z(O))), !0), ye = Ni("urd-draft-site", () => z(h), S), be(), Aa) {
				let e = JSON.parse(JSON.stringify(Aa.data));
				Aa = Ni("urd-draft-plugins", () => e, S), Ka();
			}
			if (Ri) {
				for (let e of Object.values(zi)) for (let t of e.data.entries) pd(t, "image", t.title, []);
				let e = JSON.parse(JSON.stringify(Ri.data));
				Ri = Ni("urd-draft-samlinger", () => e, S), Bi = {};
				for (let e of z(Hi)) {
					if (!zi[e]) continue;
					let t = JSON.parse(JSON.stringify(zi[e].data));
					Bi[e] = t, zi[e] = Ni(`urd-draft-samling-${e}`, () => t, S);
				}
				ga();
			}
			if (Xi) {
				for (let e of Object.values(Zi)) {
					e.data?.section && gd(e.data.section, []);
					for (let t of e.data?.blocks ?? []) hd(t, []);
					for (let t of e.data?.page?.sections ?? []) gd(t, []);
				}
				let e = JSON.parse(JSON.stringify(Xi.data));
				Xi = Ni("urd-draft-maler", () => e, S), ia = {};
				for (let e of z(oa)) {
					if (!Zi[e]) continue;
					let t = JSON.parse(JSON.stringify(Zi[e].data));
					ia[e] = t, Zi[e] = Ni(`urd-draft-mal-${e}`, () => t, S);
				}
				ca();
			}
			P(te, {
				snap: !0,
				...z(O).grid
			}, !0);
			let t = JSON.parse(JSON.stringify(E.data));
			E = Ni(`urd-draft-${z(g)}`, () => t, S), Se.has(z(g)) && C(`urd-draft-${z(g)}`, JSON.stringify(t)), we(), x(Y("status.published"), "ok");
		} else if (u?.status === 401) {
			let e = await u.json().catch(() => null);
			x(e?.code === "loginExpired" ? Y("status.loginExpired") : Y("status.loginRequired", { reason: Oi(e) ?? Y("status.unknownReason") }), "error"), await dr();
		} else u?.status === 403 ? x(Oi(await u.json().catch(() => null)) ?? Y("status.noPublishAccess"), "error") : u?.status === 409 ? x(Y("status.publishRace"), "error") : x(u ? Oi(await u.json().catch(() => null)) ?? Y("status.publishFailed") : Y("status.publishUnavailable"), "error");
	}
	ze();
	var Cd = Fu();
	wr("keydown", an, Re), wr("pointerdown", an, Le);
	var wd = I(Cd), Td = F(wd), Ed = (e) => {
		var t = Yc(), n = F(t);
		G(n, () => c.pencil);
		var r = L(n);
		k(t), R((e, n) => {
			J(t, "title", e), U(r, ` ${n ?? ""}`);
		}, [() => Y("tip.backToEdit"), () => Y("ui.edit")]), B("click", t, Ns), H(e, t);
	};
	W(Td, (e) => {
		z(T) || e(Ed);
	});
	var Dd = L(Td, 2);
	let Od;
	var kd = F(Dd), Ad = L(F(kd), 2), jd = (e) => {
		var t = Xc(), n = I(t), r = F(n, !0);
		k(n);
		var i = L(n, 2), a = F(i);
		let o;
		G(a, () => c.desktop, !0), k(a);
		var s = L(a, 2);
		let l;
		G(s, () => c.phone, !0), k(s), k(i);
		var u = L(i, 2), d = F(u);
		let f;
		G(d, () => c.fit, !0), k(d);
		var p = L(d, 2);
		G(p, () => c.minus, !0), k(p);
		var m = L(p, 2), h = F(m);
		k(m);
		var g = L(m, 2);
		G(g, () => c.plus, !0), k(g), k(u);
		var _ = L(u, 2);
		let v;
		G(_, () => c.guides, !0), k(_), R((e, t, i, c, u, y, b, x, S, C) => {
			J(n, "title", e), U(r, t), o = ei(a, 1, "ghost svelte-1n46o8q", null, o, { active: z(ne) === "desktop" }), J(a, "title", i), l = ei(s, 1, "ghost svelte-1n46o8q", null, l, { active: z(ne) === "mobile" }), J(s, "title", c), f = ei(d, 1, "ghost svelte-1n46o8q", null, f, { active: z(se) === "fit" }), J(d, "title", u), J(p, "title", y), J(m, "title", b), U(h, `${x ?? ""}%`), J(g, "title", S), v = ei(_, 1, "ghost guides-btn svelte-1n46o8q", null, v, { active: z(Rr) }), J(_, "title", C);
		}, [
			() => Y("tip.switchPage"),
			() => Ce()?.title ?? "",
			() => Y("tip.desktopView"),
			() => Y("tip.mobileView"),
			() => Y("tip.zoomFit"),
			() => Y("tip.zoomOut"),
			() => Y("tip.zoomCurrent"),
			() => Math.round(z(ue) * 100),
			() => Y("tip.zoomIn"),
			() => Y("tip.guides")
		]), B("click", n, () => ft("pages")), B("click", a, () => P(ne, "desktop")), B("click", s, () => P(ne, "mobile")), B("click", d, () => P(se, "fit")), B("click", p, () => de(-1)), B("click", g, () => de(1)), B("click", _, Gr), H(e, t);
	};
	W(Ad, (e) => {
		z(h) && e(jd);
	});
	var Md = L(Ad, 2), Nd = (e) => {
		var t = Zc(), n = F(t);
		G(n, () => c.phone);
		var r = L(n);
		k(t), R((e, n) => {
			J(t, "title", e), U(r, ` ${n ?? ""}`);
		}, [() => Y("tip.attention"), () => Y(z(he) === 1 ? "ui.attentionOne" : "ui.attentionMany", { n: z(he) })]), B("click", t, () => P(ne, "mobile")), H(e, t);
	};
	W(Md, (e) => {
		z(he) > 0 && e(Nd);
	});
	var Pd = L(Md, 2), Fd = (e) => {
		var t = Qc(), n = I(t), r = F(n, !0);
		k(n);
		var i = L(n, 2);
		let a;
		var o = F(i, !0);
		k(i), R((e, t, n) => {
			U(r, e), a = ei(i, 1, "ghost discard-btn svelte-1n46o8q", null, a, { armed: z(yd) }), J(i, "title", t), U(o, n);
		}, [
			() => Y("ui.unpublished"),
			() => z(yd) ? Y("tip.discardArmed") : Y("tip.discard"),
			() => z(yd) ? Y("ui.discardConfirm") : Y("ui.discard")
		]), B("click", i, bd), H(e, t);
	};
	W(Pd, (e) => {
		z(_) && e(Fd);
	}), k(kd);
	var Id = L(kd, 2), Ld = F(Id), Rd = (e) => {
		var t = nl(), n = I(t), r = F(n), i = (e) => {
			var t = $c(), n = I(t);
			G(n, () => c.eye);
			var r = L(n);
			R((e) => U(r, ` ${e ?? ""}`), [() => Y("ui.cleanView")]), H(e, t);
		}, a = (e) => {
			var t = $c(), n = I(t);
			G(n, () => c.pencil);
			var r = L(n);
			R((e) => U(r, ` ${e ?? ""}`), [() => Y("ui.edit")]), H(e, t);
		};
		W(r, (e) => {
			z(T) ? e(i) : e(a, -1);
		}), k(n);
		var o = L(n, 2), s = (e) => {
			var t = el(), n = F(t), r = (e) => {
				var t = Nr();
				G(I(t), () => c.warn), H(e, t);
			};
			W(n, (e) => {
				z(w).allowed || e(r);
			});
			var i = L(n, 1, !0);
			k(t), R((e) => {
				J(t, "title", e), U(i, z(w).login);
			}, [() => z(w).allowed ? Y("tip.hasPublishAccess") : Y("tip.noPublishAccess")]), H(e, t);
		}, l = (e) => {
			var t = tl(), n = F(t, !0);
			k(t), R((e) => U(n, e), [() => Y("ui.loginGitHub")]), H(e, t);
		};
		W(o, (e) => {
			z(w)?.loggedIn ? e(s) : z(w) && e(l, 1);
		});
		var u = L(o, 2), d = F(u, !0);
		k(u);
		var f = L(u, 2), p = F(f, !0);
		k(f), R((e, t, r, i) => {
			J(n, "title", e), J(u, "href", t), U(d, r), f.disabled = !z(_), U(p, i);
		}, [
			() => z(T) ? Y("tip.chromeHide") : Y("tip.chromeShow"),
			() => Ce()?.path ?? "/",
			() => Y("ui.viewSite"),
			() => Y("ui.publish")
		]), B("click", n, Ns), B("click", f, Sd), H(e, t);
	};
	W(Ld, (e) => {
		z(h) && e(Rd);
	}), k(Id), k(Dd);
	var zd = L(Dd, 2), Bd = (e) => {
		var t = Ou(), i = F(t), o = (e) => {
			var t = Du(), i = I(t), o = F(i);
			Ur(o, 17, () => et, zr, (e, t, n) => {
				var r = al(), i = I(r), a = (e) => {
					H(e, rl());
				};
				W(i, (e) => {
					n > 0 && e(a);
				}), Ur(L(i, 2), 16, () => z(t), (e) => e, (e, t) => {
					var n = il();
					let r;
					var i = F(n, !0);
					k(n), R(() => {
						r = ei(n, 1, "svelte-1n46o8q", null, r, { active: z($e) === t }), U(i, tt[t]);
					}), B("click", n, () => ft(t)), H(e, n);
				}), H(e, r);
			});
			var s = L(o, 2), f = F(s);
			let p;
			G(f, () => c.gear, !0), k(f);
			var h = L(f, 2), _ = (e) => {
				var t = ol(), n = F(t), r = F(n, !0);
				k(n);
				var i = L(n, 2), a = F(i);
				X(L(a), {
					get value() {
						return z(u);
					},
					get options() {
						return l;
					},
					onchange: (e) => P(u, e, !0)
				}), k(i);
				var o = L(i, 2), s = F(o), c = L(s);
				{
					let e = /* @__PURE__ */ M(() => [["auto", Y("lang.auto")], ...ot()]);
					X(c, {
						get value() {
							return ut;
						},
						get options() {
							return z(e);
						},
						onchange: dt
					});
				}
				k(o);
				var d = L(o, 2), f = F(d), p = L(f);
				{
					let e = /* @__PURE__ */ M(() => [["strip", Y("settings.layoutPickerStrip")], ["menu", Y("settings.layoutPickerMenu")]]);
					X(p, {
						get value() {
							return z(Vr);
						},
						get options() {
							return z(e);
						},
						onchange: Hr
					});
				}
				k(d), k(t), R((e, t, n, c, l, u, p) => {
					U(r, e), J(i, "title", t), U(a, `${n ?? ""} `), J(o, "title", c), U(s, `${l ?? ""} `), J(d, "title", u), U(f, `${p ?? ""} `);
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
			W(h, (e) => {
				z(Br) && e(_);
			}), k(s), hi(s, (e) => P(Wr, e), () => z(Wr)), k(i);
			var v = L(i, 2), y = (e) => {
				var t = Eu(), i = F(t), o = F(i, !0);
				k(i);
				var s = L(i, 2), l = (e) => {
					var t = hl(), n = F(t);
					Ur(n, 17, () => z(O).pages, (e) => e.id, (e, t) => {
						var n = dl();
						let r;
						var i = F(n);
						K(i);
						var a = L(i, 2), o = (e) => {
							var t = sl();
							R((e) => J(t, "title", e), [() => Y("tip.pages.homeLocked")]), H(e, t);
						}, s = (e) => {
							var n = cl();
							K(n), R((e, t) => {
								q(n, e), J(n, "title", t);
							}, [() => z(t).path.slice(1), () => Y("tip.pages.slug")]), B("change", n, (e) => ci(z(t), e.target.value)), H(e, n);
						};
						W(a, (e) => {
							z(t).path === "/" ? e(o) : e(s, -1);
						});
						var l = L(a, 2), u = F(l);
						G(u, () => c.right, !0), k(u);
						var d = L(u, 2), f = F(d);
						G(f, () => c.kebab, !0), k(f);
						var p = L(f, 2), m = (e) => {
							var n = ul(), r = F(n), i = F(r);
							G(i, () => c.bookmark);
							var a = L(i);
							k(r);
							var o = L(r, 2), s = (e) => {
								var n = ll(), r = F(n);
								G(r, () => c.cross);
								var i = L(r);
								k(n), R((e, t) => {
									J(n, "title", e), U(i, ` ${t ?? ""}`);
								}, [() => Y("tip.pages.delete"), () => Y("ui.deletePage")]), B("click", n, () => {
									P(Zr, null), li(z(t));
								}), H(e, n);
							};
							W(o, (e) => {
								z(t).path !== "/" && e(s);
							}), k(n), R((e) => U(a, ` ${e ?? ""}`), [() => Y("ui.savePageTemplate")]), B("click", r, () => ri(z(t))), H(e, n);
						};
						W(p, (e) => {
							z(Zr) === z(t).id && e(m);
						}), k(d), k(l), k(n), R((e, a, o) => {
							r = ei(n, 1, "page-row svelte-1n46o8q", null, r, { current: z(t).id === z(g) }), q(i, z(t).title), J(i, "title", e), J(u, "title", a), u.disabled = z(t).id === z(g), J(f, "title", o);
						}, [
							() => Y("tip.pages.title"),
							() => Y("tip.pages.open"),
							() => Y("tip.pages.menu")
						]), B("change", i, (e) => ii(z(t), e.target.value)), B("click", u, () => Fr(z(t).id)), B("click", f, () => P(Zr, z(Zr) === z(t).id ? null : z(t).id, !0)), H(e, n);
					});
					var r = L(n, 4);
					K(r);
					var i = L(r, 2), a = F(i, !0);
					k(i);
					var o = L(i, 2), s = F(o, !0);
					k(o);
					var l = L(o, 2), u = F(l);
					let d;
					var f = F(u), p = F(f);
					G(p, () => jo({ sections: [] }), !0), k(p);
					var m = L(p, 2), h = F(m, !0);
					k(m), k(f), k(u), Ur(L(u, 2), 17, () => No, (e) => e.id, (e, t) => {
						var n = fl();
						let r;
						var i = F(n), a = F(i);
						G(a, () => Xr[z(t).id], !0), k(a);
						var o = L(a, 2), s = F(o, !0);
						k(o), k(i), k(n), R((e, a) => {
							r = ei(n, 1, "page-mal-card svelte-1n46o8q", null, r, { picked: z(Yr) === `preset:${z(t).id}` }), J(i, "title", e), U(s, a);
						}, [() => Y("tip.pages.templatePick", { name: Y(z(t).labelKey) }), () => Y(z(t).labelKey)]), B("click", i, () => P(Yr, z(Yr) === `preset:${z(t).id}` ? null : `preset:${z(t).id}`, !0)), H(e, n);
					}), k(l);
					var _ = L(l, 2), v = (e) => {
						var t = ml(), n = I(t), r = F(n, !0);
						k(n);
						var i = L(n, 2);
						Ur(i, 20, () => z(oa).filter((e) => Zi[e]?.data?.mal?.kind === "page"), (e) => e, (e, t) => {
							var n = pl();
							let r;
							var i = F(n), a = F(i);
							G(a, () => jo(Zi[t].data.page), !0), k(a);
							var o = L(a, 2), s = F(o, !0);
							k(o), k(i);
							var l = L(i, 2);
							G(l, () => c.cross, !0), k(l), k(n), R((e, a) => {
								r = ei(n, 1, "page-mal-card svelte-1n46o8q", null, r, { picked: z(Yr) === t }), J(i, "title", e), U(s, Zi[t].data.mal.name), J(l, "title", a);
							}, [() => Y("tip.pages.templatePick", { name: Zi[t].data.mal.name }), () => Y("canvas.deleteTemplate")]), B("click", i, () => P(Yr, z(Yr) === t ? null : t, !0)), B("click", l, () => ma({ id: t })), H(e, n);
						}), k(i), R((e) => U(r, e), [() => Y("canvas.tabMyTemplates")]), H(e, t);
					}, y = /* @__PURE__ */ M(() => z(oa).some((e) => Zi[e]?.data?.mal?.kind === "page"));
					W(_, (e) => {
						z(y) && e(v);
					}), k(t), R((e, t, n, o, c, l, p) => {
						J(r, "placeholder", e), J(i, "title", t), i.disabled = n, U(a, o), U(s, c), d = ei(u, 1, "page-mal-card svelte-1n46o8q", null, d, { picked: z(Yr) === null }), J(f, "title", l), U(h, p);
					}, [
						() => Y("ph.newPageName"),
						() => Y("hint.pages.autoMenu"),
						() => !z(Jr).trim(),
						() => Y("ui.createPage"),
						() => Y("canvas.tabPresets"),
						() => Y("tip.pages.blankPick"),
						() => Y("ui.blankPage")
					]), B("keydown", r, (e) => e.key === "Enter" && ti()), di(r, () => z(Jr), (e) => P(Jr, e)), B("click", i, ti), B("click", f, () => P(Yr, null)), H(e, t);
				}, u = (e) => {
					var t = Sl(), r = F(t), i = F(r), a = F(i, !0);
					k(i);
					var o = L(i, 2), s = F(o), l = F(s), u = L(l);
					{
						let e = /* @__PURE__ */ M(() => z(O).nav.logo?.type ?? "text"), t = /* @__PURE__ */ M(() => [
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
							onchange: (e) => fi(e)
						});
					}
					k(s);
					var d = L(s, 2), f = (e) => {
						var t = gl(), n = I(t);
						K(n);
						var r = L(n, 2), i = F(r);
						{
							let e = /* @__PURE__ */ M(() => Y("tip.nav.logoFont")), t = /* @__PURE__ */ M(() => z(O).nav.logo?.font ?? ""), n = /* @__PURE__ */ M(() => [["", Y("common.inherit")], ...zs.map(([e, t]) => [t, Y(e)])]);
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
								onchange: (e) => ui({ font: e || void 0 })
							});
						}
						var a = L(i, 2);
						K(a);
						var o = L(a, 2);
						let s;
						var c = F(o), l = F(c, !0);
						k(c), k(o);
						var u = L(o, 2);
						let d;
						var f = F(u), p = F(f, !0);
						k(f), k(u), k(r), R((e, t, r, i, c, f, m) => {
							q(n, z(O).nav.logo?.value ?? ""), J(n, "placeholder", e), J(a, "title", t), q(a, z(O).nav.logo?.textSize ?? ""), s = ei(o, 1, "tbtn svelte-1n46o8q", null, s, { active: z(O).nav.logo?.bold !== !1 }), J(o, "title", r), U(l, i), d = ei(u, 1, "tbtn svelte-1n46o8q", null, d, c), J(u, "title", f), U(p, m);
						}, [
							() => Y("ph.nav.logoName"),
							() => Y("tip.nav.textSize"),
							() => Y("format.bold"),
							() => Y("format.boldLetter"),
							() => ({ active: !!z(O).nav.logo?.italic }),
							() => Y("format.italic"),
							() => Y("format.italicLetter")
						]), B("input", n, (e) => ui({ value: e.target.value })), B("change", a, (e) => ui({ textSize: e.target.value ? Number(e.target.value) : void 0 })), B("click", o, () => ui({ bold: z(O).nav.logo?.bold === !1 })), B("click", u, () => ui({ italic: !z(O).nav.logo?.italic })), H(e, t);
					};
					W(d, (e) => {
						(z(O).nav.logo?.type ?? "text") !== "image" && e(f);
					});
					var p = L(d, 2), m = (e) => {
						var t = _l(), n = F(t), r = F(n), i = L(r);
						k(n);
						var a = L(n, 2);
						K(a);
						var o = L(a, 2);
						K(o), k(t), R((e, t, i, s) => {
							J(n, "title", e), U(r, `${t ?? ""} `), J(a, "title", i), q(a, z(O).nav.logo?.size ?? 32), J(o, "title", s), q(o, z(O).nav.logo?.radius ?? 0);
						}, [
							() => Y("tip.webpAuto"),
							() => (z(O).nav.logo?.type === "image" ? z(O).nav.logo?.value : z(O).nav.logo?.image) ? Y("ui.changeImage") : Y("ui.chooseImage"),
							() => Y("tip.nav.logoHeight"),
							() => Y("tip.nav.logoRadius")
						]), B("change", i, pi), B("change", a, (e) => ui({ size: Number(e.target.value) })), B("change", o, (e) => ui({ radius: Number(e.target.value) })), H(e, t);
					};
					W(p, (e) => {
						(z(O).nav.logo?.type ?? "text") !== "text" && e(m);
					});
					var h = L(p, 2), g = (e) => {
						var t = ic(), n = F(t), r = L(n);
						{
							let e = /* @__PURE__ */ M(() => z(O).nav.logo?.order ?? "image-first"), t = /* @__PURE__ */ M(() => [["image-first", Y("opt.logo.imageFirst")], ["text-first", Y("opt.logo.textFirst")]]);
							X(r, {
								get value() {
									return z(e);
								},
								get options() {
									return z(t);
								},
								onchange: (e) => ui({ order: e })
							});
						}
						k(t), R((e) => U(n, `${e ?? ""} `), [() => Y("lbl.order")]), H(e, t);
					};
					W(h, (e) => {
						z(O).nav.logo?.type === "both" && e(g);
					}), k(o), k(r);
					var _ = L(r, 2), v = F(_), y = F(v, !0);
					k(v);
					var b = L(v, 2), x = F(b), S = F(x), C = L(S);
					{
						let e = /* @__PURE__ */ M(() => z(O).nav.variant ?? "bar"), t = /* @__PURE__ */ M(() => [
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
							onchange: (e) => Pi(e)
						});
					}
					k(x);
					var ee = L(x, 2), w = (e) => {
						var t = vl(), n = I(t), r = F(n);
						K(r);
						var i = L(r);
						k(n);
						var a = L(n, 2), o = F(a);
						K(o);
						var s = L(o);
						k(a), R((e, t, c, l) => {
							J(n, "title", e), si(r, z(O).nav.style?.glow === !0), U(i, ` ${t ?? ""}`), J(a, "title", c), si(o, z(O).nav.style?.topGap !== !1), U(s, ` ${l ?? ""}`);
						}, [
							() => Y("tip.nav.glow"),
							() => Y("lbl.navGlow"),
							() => Y("tip.nav.topGap"),
							() => Y("lbl.navTopGap")
						]), B("change", r, (e) => Fi(e.target.checked)), B("change", o, (e) => Ii(e.target.checked)), H(e, t);
					};
					W(ee, (e) => {
						z(Ai) && e(w);
					});
					var te = L(ee, 2), T = (e) => {
						var t = gc(), n = F(t);
						K(n);
						var r = L(n);
						k(t), R((e, i) => {
							J(t, "title", e), si(n, z(O).nav.overlay === !0), U(r, ` ${i ?? ""}`);
						}, [() => Y("tip.nav.overlay"), () => Y("lbl.navOverlay")]), B("change", n, (e) => qr("nav", () => {
							e.target.checked ? z(O).nav.overlay = !0 : delete z(O).nav.overlay;
						})), H(e, t);
					};
					W(te, (e) => {
						!z(Ai) && !z(Di) && e(T);
					});
					var ne = L(te, 2), re = (e) => {
						var t = ic(), n = F(t), r = L(n);
						{
							let e = /* @__PURE__ */ M(() => z(O).nav.style?.sideAlign ?? "left"), t = /* @__PURE__ */ M(() => [
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
								onchange: (e) => Ei("sideAlign", e === "left" ? void 0 : e)
							});
						}
						k(t), R((e, r) => {
							J(t, "title", e), U(n, `${r ?? ""} `);
						}, [() => Y("tip.nav.sideAlign"), () => Y("lbl.textAlign")]), H(e, t);
					};
					W(ne, (e) => {
						z(Di) && e(re);
					});
					var ie = L(ne, 2), ae = F(ie);
					K(ae);
					var oe = L(ae);
					k(ie);
					var se = L(ie, 2), ce = F(se), le = L(ce);
					{
						let e = /* @__PURE__ */ M(() => z(O).nav.style?.size ?? "md"), t = /* @__PURE__ */ M(() => [
							["sm", Y("opt.size.sm")],
							["md", Y("opt.size.md")],
							["lg", Y("opt.size.lg")],
							["xl", Y("opt.size.xl")]
						]);
						X(le, {
							get value() {
								return z(e);
							},
							get options() {
								return z(t);
							},
							onchange: (e) => Ei("size", e === "md" ? void 0 : e)
						});
					}
					k(se);
					var ue = L(se, 2), de = F(ue), fe = L(de), pe = (e) => {
						{
							let t = /* @__PURE__ */ M(() => z(O).nav.style?.sidePlacement ?? "top"), n = /* @__PURE__ */ M(() => [
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
								onchange: (e) => Ei("sidePlacement", e === "top" ? void 0 : e)
							});
						}
					}, me = (e) => {
						{
							let t = /* @__PURE__ */ M(() => z(O).nav.layout ?? "right"), n = /* @__PURE__ */ M(() => [
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
								onchange: (e) => Ti(e)
							});
						}
					};
					W(fe, (e) => {
						z(Di) ? e(pe) : e(me, -1);
					}), k(ue);
					var he = L(ue, 2), ge = (e) => {
						var t = yl(), n = I(t), r = F(n);
						K(r);
						var i = L(r);
						k(n);
						var a = L(n, 2), o = (e) => {
							var t = ic(), n = F(t), r = L(n);
							{
								let e = /* @__PURE__ */ M(() => z(O).nav.scroll ?? "none"), t = /* @__PURE__ */ M(() => [
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
									onchange: (e) => qr("nav", () => {
										e === "none" ? delete z(O).nav.scroll : z(O).nav.scroll = e;
									})
								});
							}
							k(t), R((e, r) => {
								J(t, "title", e), U(n, `${r ?? ""} `);
							}, [() => Y("tip.nav.scroll"), () => Y("lbl.navScroll")]), H(e, t);
						};
						W(a, (e) => {
							z(O).nav.sticky !== !1 && e(o);
						}), R((e, t) => {
							J(n, "title", e), si(r, z(O).nav.sticky !== !1), U(i, ` ${t ?? ""}`);
						}, [() => Y("tip.nav.sticky"), () => Y("lbl.navSticky")]), B("change", r, (e) => qr("nav", () => {
							z(O).nav.sticky = e.target.checked;
						})), H(e, t);
					};
					W(he, (e) => {
						z(Di) || e(ge);
					});
					var _e = L(he, 2), ve = F(_e), E = L(ve);
					{
						let e = /* @__PURE__ */ M(() => z(O).nav.style?.hover ?? "standard"), t = /* @__PURE__ */ M(() => [
							["standard", Y("opt.hover.standard")],
							["underline", Y("opt.hover.underline")],
							["pill", Y("opt.hover.pill")],
							["lift-plain", Y("opt.hover.liftPlain")],
							["lift", Y("opt.hover.lift")]
						]);
						X(E, {
							get value() {
								return z(e);
							},
							get options() {
								return z(t);
							},
							onchange: (e) => Li(e)
						});
					}
					k(_e);
					var ye = L(_e, 2), D = (e) => {
						var t = bl(), n = I(t), r = F(n), i = L(r), a = F(i);
						k(i), k(n);
						var o = L(n, 2);
						K(o), R((e, t, i) => {
							J(n, "title", e), U(r, `${t ?? ""} `), U(a, `${i ?? ""}%`), q(o, z(O).nav.style?.hoverGlow ?? .6);
						}, [
							() => Y("tip.nav.hoverGlow"),
							() => Y("lbl.glowStrength"),
							() => Math.round((z(O).nav.style?.hoverGlow ?? .6) * 100)
						]), B("input", o, (e) => Ei("hoverGlow", Number(e.target.value))), H(e, t);
					};
					W(ye, (e) => {
						z(O).nav.style?.hover === "lift" && e(D);
					});
					var be = L(ye, 2), xe = (e) => {
						var t = ic(), n = F(t), r = L(n);
						{
							let e = /* @__PURE__ */ M(() => z(O).nav.style?.hoverColor ?? "accent"), t = /* @__PURE__ */ M(Vn);
							Gi(r, {
								get value() {
									return z(e);
								},
								get tokens() {
									return z(t);
								},
								get label() {
									return z(Mi)[1];
								},
								onchange: (e) => Ei("hoverColor", e)
							});
						}
						k(t), R(() => {
							J(t, "title", z(Mi)[1]), U(n, `${z(Mi)[0] ?? ""} `);
						}), H(e, t);
					};
					W(be, (e) => {
						z(Mi) && e(xe);
					});
					var Se = L(be, 2), Ce = F(Se), we = L(Ce);
					{
						let e = /* @__PURE__ */ M(() => z(O).nav.style?.hoverTextColor ?? "accent"), t = /* @__PURE__ */ M(Vn), n = /* @__PURE__ */ M(() => Y("tip.nav.hoverTextColorPick"));
						Gi(we, {
							get value() {
								return z(e);
							},
							get tokens() {
								return z(t);
							},
							get label() {
								return z(n);
							},
							onchange: (e) => Ei("hoverTextColor", e)
						});
					}
					k(Se);
					var Te = L(Se, 2), Ee = F(Te), De = L(Ee);
					{
						let e = /* @__PURE__ */ M(() => z(O).nav.style?.textColor ?? "text"), t = /* @__PURE__ */ M(Vn), n = /* @__PURE__ */ M(() => Y("tip.nav.textColorPick"));
						Gi(De, {
							get value() {
								return z(e);
							},
							get tokens() {
								return z(t);
							},
							get label() {
								return z(n);
							},
							onchange: (e) => Ei("textColor", e)
						});
					}
					k(Te);
					var Oe = L(Te, 4), ke = F(Oe, !0);
					k(Oe);
					var Ae = L(Oe, 2);
					n(Ae, () => zn, () => z(O).nav?.style?.background?.layers ?? []), k(b), k(_);
					var je = L(_, 2), Me = F(je), Ne = F(Me, !0);
					k(Me);
					var Pe = L(Me, 2), Fe = F(Pe), Ie = F(Fe), Le = L(Ie);
					{
						let e = /* @__PURE__ */ M(() => z(O).nav.style?.subStyle ?? "card"), t = /* @__PURE__ */ M(() => z(Di) ? [
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
						X(Le, {
							get value() {
								return z(e);
							},
							get options() {
								return z(t);
							},
							onchange: (e) => Ei("subStyle", e === "card" ? void 0 : e)
						});
					}
					k(Fe);
					var Re = L(Fe, 2), ze = (e) => {
						var t = ic(), n = F(t), r = L(n);
						{
							let e = /* @__PURE__ */ M(() => z(O).nav.style?.subPillColor ?? "surface"), t = /* @__PURE__ */ M(Vn), n = /* @__PURE__ */ M(() => Y("tip.nav.subPillColorPick"));
							Gi(r, {
								get value() {
									return z(e);
								},
								get tokens() {
									return z(t);
								},
								get label() {
									return z(n);
								},
								onchange: (e) => Ei("subPillColor", e)
							});
						}
						k(t), R((e, r) => {
							J(t, "title", e), U(n, `${r ?? ""} `);
						}, [() => Y("tip.nav.subPillColor"), () => Y("lbl.subPillColor")]), H(e, t);
					};
					W(Re, (e) => {
						z(O).nav.style?.subStyle === "pills" && e(ze);
					});
					var Be = L(Re, 2), Ve = F(Be), He = L(Ve);
					K(He), k(Be), k(Pe), k(je);
					var Ue = L(je, 2), We = F(Ue), Ge = F(We, !0);
					k(We);
					var Ke = L(We, 2), qe = F(Ke);
					Ur(qe, 17, () => z(O).nav.items, zr, (e, t, n) => {
						var r = xl(), i = I(r), a = F(i);
						K(a);
						var o = L(a, 2), s = F(o);
						G(s, () => c.plus, !0), k(s);
						var l = L(s, 2);
						l.disabled = n === 0, G(l, () => c.up, !0), k(l);
						var u = L(l, 2);
						G(u, () => c.down, !0), k(u);
						var d = L(u, 2);
						G(d, () => c.cross, !0), k(d), k(o);
						var f = L(o, 2), p = F(f);
						{
							let e = /* @__PURE__ */ M(() => z(t).page ?? (z(t).href == null ? "__none" : "__href")), r = /* @__PURE__ */ M(() => Y("tip.linkTarget")), i = /* @__PURE__ */ M(() => [
								...z(O).pages.map((e) => [e.id, e.title]),
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
								onchange: (e) => ts(n, e)
							});
						}
						k(f);
						var m = L(f, 2), h = (e) => {
							var r = nc();
							K(r), R((e, n) => {
								q(r, z(t).href), J(r, "placeholder", e), J(r, "title", n);
							}, [() => Y("ph.hrefAnchor"), () => Y("tip.hrefAnchor")]), B("change", r, (e) => ns(n, e.target.value)), H(e, r);
						};
						W(m, (e) => {
							!z(t).page && z(t).href != null && e(h);
						}), k(i), Ur(L(i, 2), 17, () => z(t).children ?? [], zr, (e, r, i) => {
							var a = rc(), o = F(a);
							K(o);
							var s = L(o, 2), l = F(s);
							l.disabled = i === 0, G(l, () => c.up, !0), k(l);
							var u = L(l, 2);
							G(u, () => c.down, !0), k(u);
							var d = L(u, 2);
							G(d, () => c.cross, !0), k(d), k(s);
							var f = L(s, 2), p = F(f);
							{
								let e = /* @__PURE__ */ M(() => z(r).page ?? "__href"), t = /* @__PURE__ */ M(() => Y("tip.linkTarget")), a = /* @__PURE__ */ M(() => [...z(O).pages.map((e) => [e.id, e.title]), ["__href", Y("opt.linkHref")]]);
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
									onchange: (e) => ds(n, i, e)
								});
							}
							k(f);
							var m = L(f, 2), h = (e) => {
								var t = nc();
								K(t), R((e, n) => {
									q(t, z(r).href ?? ""), J(t, "placeholder", e), J(t, "title", n);
								}, [() => Y("ph.hrefAnchor"), () => Y("tip.hrefAnchor")]), B("change", t, (e) => fs(n, i, e.target.value)), H(e, t);
							};
							W(m, (e) => {
								z(r).page || e(h);
							}), k(a), R((e, n) => {
								q(o, z(r).label), J(o, "title", e), u.disabled = i === z(t).children.length - 1, J(d, "title", n);
							}, [() => Y("tip.nav.childLabel"), () => Y("tip.nav.removeChild")]), B("input", o, (e) => us(n, i, e.target.value)), B("click", l, () => ps(n, i, -1)), B("click", u, () => ps(n, i, 1)), B("click", d, () => ms(n, i)), H(e, a);
						}), R((e, r, i) => {
							q(a, z(t).label), J(a, "title", e), J(s, "title", r), u.disabled = n === z(O).nav.items.length - 1, J(d, "title", i);
						}, [
							() => Y("tip.nav.itemLabel"),
							() => Y("tip.nav.addChild"),
							() => Y("tip.nav.removeItem")
						]), B("input", a, (e) => es(n, e.target.value)), B("click", s, () => ls(n)), B("click", l, () => rs(n, -1)), B("click", u, () => rs(n, 1)), B("click", d, () => is(n)), H(e, r);
					});
					var Je = L(qe, 2), Ye = F(Je, !0);
					k(Je), k(Ke), k(Ue), k(t), R((e, t, n, r, o, s, c, u, d, f, p, m, h, g, _, v, b, C, ee, w, te, T) => {
						J(i, "title", e), U(a, t), U(l, `${n ?? ""} `), U(y, r), J(x, "title", o), U(S, `${s ?? ""} `), J(ie, "title", c), si(ae, z(O).nav.style?.blur !== !1), U(oe, ` ${u ?? ""}`), U(ce, `${d ?? ""} `), U(de, `${f ?? ""} `), U(ve, `${p ?? ""} `), J(Se, "title", m), U(Ce, `${h ?? ""} `), U(Ee, `${g ?? ""} `), U(ke, _), U(Ne, v), U(Ie, `${b ?? ""} `), J(Be, "title", C), U(Ve, `${ee ?? ""} `), q(He, z(O).nav.style?.subColumns ?? 1), J(We, "title", w), U(Ge, te), U(Ye, T);
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
					]), B("change", ae, (e) => Ei("blur", e.target.checked)), B("change", He, (e) => Ei("subColumns", Number(e.target.value) > 1 ? Number(e.target.value) : void 0)), B("click", Je, ss), H(e, t);
				}, f = (e) => {
					var t = Tl(), n = F(t), r = F(n), i = L(r);
					K(i), k(n);
					var a = L(n, 2), o = F(a), s = L(o);
					K(s), k(a);
					var l = L(a, 2), u = F(l), d = L(u);
					{
						let e = /* @__PURE__ */ M(xi), t = /* @__PURE__ */ M(Si);
						X(d, {
							get value() {
								return z(e);
							},
							get options() {
								return z(t);
							},
							onchange: (e) => Ci(e)
						});
					}
					k(l);
					var f = L(l, 4), p = F(f), m = L(p), h = (e) => {
						var t = Cl();
						R((e) => {
							J(t, "src", z(O).site.icon), J(t, "alt", e);
						}, [() => Y("lbl.siteIcon")]), H(e, t);
					};
					W(m, (e) => {
						z(O).site.icon && e(h);
					}), k(f);
					var g = L(f, 2), _ = F(g), v = F(_), y = L(v);
					k(_);
					var b = L(_, 2), x = (e) => {
						var t = wl(), n = I(t);
						G(n, () => c.pencil ?? "✎", !0), k(n);
						var r = L(n, 2);
						G(r, () => c.cross, !0), k(r), R((e, t) => {
							J(n, "title", e), J(r, "title", t);
						}, [() => Y("tip.site.editIcon"), () => Y("tip.site.removeIcon")]), B("click", n, () => P(mi, z(O).site.icon, !0)), B("click", r, vi), H(e, t);
					};
					W(b, (e) => {
						z(O).site.icon && e(x);
					}), k(g), k(t), R((e, t, c, d, f, m, h, g, y, b, x) => {
						J(n, "title", e), U(r, `${t ?? ""} `), q(i, z(O).site.title ?? ""), J(i, "placeholder", c), J(a, "title", d), U(o, `${f ?? ""} `), q(s, z(O).site.description ?? ""), J(s, "placeholder", m), J(l, "title", h), U(u, `${g ?? ""} `), U(p, `${y ?? ""} `), J(_, "title", b), U(v, `${x ?? ""} `);
					}, [
						() => Y("tip.site.name"),
						() => Y("lbl.name"),
						() => Y("ph.site.name"),
						() => Y("tip.site.description"),
						() => Y("lbl.description"),
						() => Y("ph.site.description"),
						() => Y("site.langTitle"),
						() => Y("site.langLabel"),
						() => Y("lbl.siteIcon"),
						() => Y("tip.site.icon"),
						() => z(O).site.icon ? Y("ui.changeIcon") : Y("ui.chooseIcon")
					]), B("input", i, (e) => yi(e.target.value)), B("input", s, (e) => bi(e.target.value)), B("change", y, gi), H(e, t);
				}, p = (e) => {
					var t = Nl();
					{
						let e = (e, t = d, n = d) => {
							var r = Dl(), i = F(r), a = (e) => {
								var t = El(), r = F(t, !0);
								k(t), R(() => U(r, n())), H(e, t);
							};
							W(i, (e) => {
								n() && e(a);
							});
							var o = L(i, 2), s = F(o), c = F(s, !0);
							k(s);
							var l = L(s, 2), u = F(l, !0);
							k(l);
							var f = L(l, 2), p = F(f), m = F(p, !0);
							k(p);
							var h = L(p), g = F(h, !0);
							k(h), k(f), k(o), k(r), R((e, t, n, r, i, a, s, l, d) => {
								ni(o, `--tv-bg:${e ?? ""};--tv-surface:${t ?? ""};--tv-text:${n ?? ""};--tv-accent:${r ?? ""};--tv-accent-ink:${i ?? ""}`), U(c, a), U(u, s), U(m, l), U(g, d);
							}, [
								() => Ds(t().bg, t()),
								() => Ds(t().surface, t()),
								() => Ds(t().text, t()),
								() => Ds(t().accent, t()),
								() => Ds(t()["accent-text"] ?? t().bg, t()),
								() => Y("preview.heading"),
								() => Y("preview.cardBody"),
								() => Y("preview.button"),
								() => Y("preview.link")
							]), H(e, r);
						};
						var n = F(t), r = F(n, !0);
						k(n);
						var i = L(n, 2);
						Ur(i, 21, () => ks, (e) => e.id, (e, t) => {
							var n = Ol();
							let r;
							var i = F(n), a = F(i), o = L(a), s = L(o), c = L(s);
							k(i);
							var l = L(i, 2), u = F(l, !0);
							k(l), k(n), R(() => {
								r = ei(n, 1, "theme-preset svelte-1n46o8q", null, r, { sel: z(Ms) === z(t).id }), J(n, "title", `${z(t).name} - ${z(t).note}`), ni(a, `background:${z(t).light.bg ?? ""}`), ni(o, `background:${z(t).light.surface ?? ""}`), ni(s, `background:${z(t).light.accent ?? ""}`), ni(c, `background:${z(t).light.text ?? ""}`), U(u, z(t).name);
							}), B("click", n, () => js(z(t))), H(e, n);
						}), k(i);
						var a = L(i, 2), o = F(a, !0);
						k(a);
						var s = L(a, 2), c = F(s);
						K(c);
						var l = L(c);
						k(s);
						var u = L(s, 2), f = (e) => {
							var t = kl(), n = F(t), r = F(n, !0);
							k(n);
							var i = L(n, 2), a = F(i);
							let o;
							var s = F(a, !0);
							k(a);
							var c = L(a, 2);
							let l;
							var u = F(c, !0);
							k(c), k(i), k(t), R((e, t, n, i) => {
								U(r, e), J(a, "title", t), o = ei(a, 1, "svelte-1n46o8q", null, o, { on: z(Wn) }), U(s, n), l = ei(c, 1, "svelte-1n46o8q", null, l, { on: !z(Wn) }), U(u, i);
							}, [
								() => Y("lbl.darkColors"),
								() => Y("hint.theme.autoDark"),
								() => Y("opt.auto"),
								() => Y("opt.custom")
							]), B("click", a, () => Cs(!0)), B("click", c, () => Cs(!1)), H(e, t);
						};
						W(u, (e) => {
							z(Un) && e(f);
						});
						var p = L(u, 2), h = F(p), g = (e) => {
							var t = Al(), n = F(t, !0);
							k(t), R((e) => U(n, e), [() => Y("lbl.light")]), H(e, t);
						};
						W(h, (e) => {
							z(Un) && e(g);
						});
						var _ = L(h, 2);
						let Me;
						var v = F(_, !0);
						k(_), k(p);
						var y = L(p, 2);
						Ur(y, 21, () => Hn, ([e, t, n]) => e, (e, t) => {
							var n = /* @__PURE__ */ M(() => m(z(t), 3));
							let r = () => z(n)[0], i = () => z(n)[1], a = () => z(n)[2];
							var o = jl(), s = F(o);
							{
								let e = /* @__PURE__ */ M(() => z(O).theme.tokens.color[r()] ?? z(O).theme.tokens.color.bg), t = /* @__PURE__ */ M(Vn);
								Gi(s, {
									get value() {
										return z(e);
									},
									get tokens() {
										return z(t);
									},
									get label() {
										return i();
									},
									onchange: (e) => hs(r(), e)
								});
							}
							var c = L(s, 2), l = F(c, !0);
							k(c);
							var u = L(c, 2), d = F(u, !0);
							k(u), k(o), R((e) => {
								U(l, a()), U(d, e);
							}, [() => Ds(z(O).theme.tokens.color[r()] ?? z(O).theme.tokens.color.bg, z(Kn))]), H(e, o);
						}), k(y);
						var b = L(y, 2), x = (e) => {
							var t = Ml(), n = I(t), r = F(n), i = F(r, !0);
							k(r);
							var a = L(r, 2);
							let o;
							var s = F(a, !0);
							k(a), k(n);
							var c = L(n, 2);
							let l;
							Ur(c, 21, () => Hn, ([e, t, n]) => e, (e, t) => {
								var n = /* @__PURE__ */ M(() => m(z(t), 3));
								let r = () => z(n)[0], i = () => z(n)[1], a = () => z(n)[2];
								var o = jl(), s = F(o);
								{
									let e = /* @__PURE__ */ M(() => z(O).theme.alt.tokens.color[r()] ?? z(qn)[r()] ?? z(O).theme.tokens.color.bg), t = /* @__PURE__ */ M(Vn), n = /* @__PURE__ */ M(() => Y("theme.darkColorLabel", { name: i() }));
									Gi(s, {
										get value() {
											return z(e);
										},
										get tokens() {
											return z(t);
										},
										get label() {
											return z(n);
										},
										onchange: (e) => bs(r(), e)
									});
								}
								var c = L(s, 2), l = F(c, !0);
								k(c);
								var u = L(c, 2), d = F(u, !0);
								k(u), k(o), R((e) => {
									U(l, a()), U(d, e);
								}, [() => Ds(z(O).theme.alt.tokens.color[r()] ?? z(qn)[r()], z(qn))]), H(e, o);
							}), k(c), R((e, t, n) => {
								U(i, e), o = ei(a, 1, "chip svelte-1n46o8q", null, o, { accent: z(Gn) === "dark" }), J(a, "title", t), U(s, n), l = ei(c, 1, "palcells svelte-1n46o8q", null, l, { autopal: z(Wn) });
							}, [
								() => Y("lbl.dark"),
								() => Y("tip.theme.darkDefault"),
								() => Y("common.standard")
							]), B("click", a, () => xs("dark")), H(e, t);
						};
						W(b, (e) => {
							z(Un) && e(x);
						});
						var S = L(b, 2), C = F(S);
						{
							let t = /* @__PURE__ */ M(() => z(Un) ? Y("lbl.light") : "");
							e(C, () => z(Kn), () => z(t));
						}
						var ee = L(C, 2), w = (t) => {
							{
								let n = /* @__PURE__ */ M(() => Y("lbl.dark"));
								e(t, () => z(qn), () => z(n));
							}
						};
						W(ee, (e) => {
							z(Un) && e(w);
						}), k(S);
						var te = L(S, 2), T = F(te), ne = F(T, !0);
						k(T);
						var re = L(T, 2), ie = F(re), ae = F(ie), oe = L(ae);
						{
							let e = /* @__PURE__ */ M(() => ws("heading"));
							X(oe, {
								get value() {
									return z(O).theme.tokens.font.heading;
								},
								get options() {
									return z(e);
								},
								onchange: (e) => gs("heading", e)
							});
						}
						k(ie);
						var se = L(ie, 2), ce = F(se), le = L(ce);
						{
							let e = /* @__PURE__ */ M(() => ws("body"));
							X(le, {
								get value() {
									return z(O).theme.tokens.font.body;
								},
								get options() {
									return z(e);
								},
								onchange: (e) => gs("body", e)
							});
						}
						k(se);
						var ue = L(se, 2), de = F(ue), fe = F(de, !0);
						k(de);
						var pe = L(de, 2), me = F(pe, !0);
						k(pe), k(ue), k(re), k(te);
						var he = L(te, 2), ge = F(he), _e = F(ge, !0);
						k(ge);
						var ve = L(ge, 2), E = F(ve), ye = F(E), D = F(ye, !0);
						k(ye);
						var be = L(ye, 2), xe = F(be, !0);
						k(be), k(E);
						var Se = L(E, 2), Ce = F(Se, !0), we = L(Ce), Te = F(we, !0);
						k(we), k(Se);
						var Ee = L(Se, 2);
						K(Ee);
						var De = L(Ee, 2), Oe = F(De, !0), ke = L(Oe), Ae = F(ke, !0);
						k(ke), k(De);
						var je = L(De, 2);
						K(je), k(ve), k(he), k(t), R((e, t, n, i, a, u, d, f, p, m, h, g, y, b, x, S, C, ee) => {
							U(r, e), U(o, t), J(s, "title", n), si(c, z(Un)), U(l, ` ${i ?? ""}`), Me = ei(_, 1, "chip svelte-1n46o8q", null, Me, { accent: z(Gn) === "light" }), J(_, "title", a), U(v, u), U(ne, d), U(ae, `${f ?? ""} `), U(ce, `${p ?? ""} `), ni(de, `font-family:${z(O).theme.tokens.font.heading ?? ""}`), U(fe, m), ni(pe, `font-family:${z(O).theme.tokens.font.body ?? ""}`), U(me, h), U(_e, g), ni(E, `--r-sm:${z(O).theme.tokens.radius.sm ?? ""};--r-md:${z(O).theme.tokens.radius.md ?? ""}`), U(D, y), U(xe, b), U(Ce, x), U(Te, z(O).theme.tokens.radius.sm), q(Ee, S), U(Oe, C), U(Ae, z(O).theme.tokens.radius.md), q(je, ee);
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
							() => Ts(z(O).theme.tokens.radius.sm),
							() => Y("lbl.largeCorners"),
							() => Ts(z(O).theme.tokens.radius.md)
						]), B("change", c, (e) => Ss(e.target.checked)), B("click", _, () => xs("light")), B("input", Ee, (e) => Es("sm", Number(e.target.value))), B("input", je, (e) => Es("md", Number(e.target.value)));
					}
					H(e, t);
				}, h = (e) => {
					var t = Rl();
					let n;
					var r = F(t);
					K(r);
					var i = L(r, 2), a = (e) => {
						var t = Nr();
						Ur(I(t), 17, () => Lo(nd(), z(td), (e) => e.label), (e) => e.label, (e, t) => {
							var n = Nr(), r = I(n), i = (e) => {
								var n = Pl(), r = F(n), i = L(r);
								k(n), R((e) => {
									J(n, "title", e), U(r, `${z(t).label ?? ""} `);
								}, [() => Y("tip.webpAuto")]), B("change", i, ad), H(e, n);
							}, a = (e) => {
								var n = Fl(), r = F(n), i = L(r);
								k(n), R((e) => {
									J(n, "title", e), U(r, `${z(t).label ?? ""} `);
								}, [() => Y("tip.blocks.galleryImages")]), B("change", i, ld), H(e, n);
							}, o = (e) => {
								var n = bc(), r = F(n, !0);
								k(n), R(() => U(r, z(t).label)), B("click", n, () => rd(z(t))), H(e, n);
							};
							W(r, (e) => {
								z(t).act === "image" ? e(i) : z(t).act === "galleryImages" ? e(a, 1) : e(o, -1);
							}), H(e, n);
						}, (e) => {
							var t = sc(), n = F(t, !0);
							k(t), R((e) => U(n, e), [() => Y("canvas.searchEmpty")]), H(e, t);
						}), H(e, t);
					}, o = /* @__PURE__ */ M(() => z(td).trim()), s = (e) => {
						var t = Ll(), n = I(t), r = F(n), i = F(r, !0);
						k(r);
						var a = L(r, 2), o = F(a), s = F(o, !0);
						k(o);
						var c = L(o, 2), l = F(c, !0);
						k(c), k(a), k(n);
						var u = L(n, 2), d = F(u, !0);
						k(u);
						var f = L(u, 2), p = F(f), m = L(p);
						k(f);
						var h = L(f, 2), g = F(h, !0);
						k(h);
						var _ = L(h, 2), v = F(_, !0);
						k(_);
						var y = L(_, 2), b = F(y, !0);
						k(y);
						var x = L(y, 2), S = F(x, !0);
						k(x);
						var C = L(x, 2), ee = F(C, !0);
						k(C);
						var w = L(C, 2), te = F(w, !0);
						k(w);
						var T = L(w, 2), ne = F(T, !0);
						k(T);
						var re = L(T, 2), ie = F(re), ae = F(ie, !0);
						k(ie);
						var oe = L(ie, 2), se = F(oe), ce = F(se, !0);
						k(se);
						var le = L(se, 2), ue = F(le), de = L(ue);
						k(le), k(oe), k(re);
						var fe = L(re, 2), pe = F(fe), me = F(pe, !0);
						k(pe);
						var he = L(pe, 2), ge = F(he), _e = F(ge, !0);
						k(ge);
						var ve = L(ge, 2), E = F(ve, !0);
						k(ve);
						var ye = L(ve, 2), O = F(ye, !0);
						k(ye);
						var be = L(ye, 2), xe = F(be, !0);
						k(be);
						var Se = L(be, 2), Ce = F(Se, !0);
						k(Se), k(he), k(fe);
						var we = L(fe, 2), Te = (e) => {
							let t = /* @__PURE__ */ M(() => z(oa).filter((e) => Zi[e]?.data?.mal?.kind === "blocks"));
							var n = Il(), r = F(n), i = F(r, !0);
							k(r);
							var a = L(r, 2);
							Ur(a, 20, () => z(t), (e) => e, (e, t) => {
								var n = bc(), r = F(n, !0);
								k(n), R((e) => {
									J(n, "title", e), U(r, Zi[t].data.mal.name);
								}, [() => Y("canvas.insertGroup")]), B("click", n, () => D?.sendInsertTemplate(t)), H(e, n);
							}), k(a), k(n), R((e) => U(i, e), [() => Y("canvas.tabMyTemplates")]), H(e, n);
						}, Ee = /* @__PURE__ */ M(() => z(oa).some((e) => Zi[e]?.data?.mal?.kind === "blocks"));
						W(we, (e) => {
							z(Ee) && e(Te);
						});
						var De = L(we, 2), Oe = (e) => {
							var t = Il(), n = F(t), r = F(n, !0);
							k(n);
							var i = L(n, 2);
							Ur(i, 21, () => z($u), (e) => e.type, (e, t) => {
								var n = Nr(), r = I(n), i = (e) => {
									var n = Il(), r = F(n), i = F(r, !0);
									k(r);
									var a = L(r, 2);
									Ur(a, 21, () => z(t).variants, (e) => e.label, (e, n) => {
										var r = bc(), i = F(r, !0);
										k(r), R((e) => {
											J(r, "title", e), U(i, z(n).label);
										}, [() => Y("tip.blocks.fromPlugin", { plugin: z(t).plugin })]), B("click", r, () => ed(z(t), z(n).props)), H(e, r);
									}), k(a), k(n), R(() => U(i, z(t).label)), H(e, n);
								}, a = (e) => {
									var n = bc(), r = F(n, !0);
									k(n), R((e) => {
										J(n, "title", e), U(r, z(t).label);
									}, [() => Y("tip.blocks.fromPlugin", { plugin: z(t).plugin })]), B("click", n, () => ed(z(t))), H(e, n);
								};
								W(r, (e) => {
									z(t).variants?.length ? e(i) : e(a, -1);
								}), H(e, n);
							}), k(i), k(t), R((e) => U(r, e), [() => Y("panel.plugins")]), H(e, t);
						};
						W(De, (e) => {
							z($u).length && e(Oe);
						}), R((e, t, n, r, a, o, u, m, re, ie, oe, de, fe, pe, he, ge, ve, ye, D, be, Se, we, Te, Ee, De, Oe, ke, Ae, je, Me, Ne, Pe) => {
							U(i, e), U(s, t), J(c, "title", n), U(l, r), U(d, a), J(f, "title", o), U(p, `${u ?? ""} `), J(h, "title", m), U(g, re), J(_, "title", ie), U(v, oe), J(y, "title", de), U(b, fe), J(x, "title", pe), U(S, he), J(C, "title", ge), U(ee, ve), J(w, "title", ye), U(te, D), J(T, "title", be), U(ne, Se), U(ae, we), J(se, "title", Te), U(ce, Ee), J(le, "title", De), U(ue, `${Oe ?? ""} `), U(me, ke), U(_e, Ae), U(E, je), U(O, Me), U(xe, Ne), U(Ce, Pe);
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
							() => Y("tip.blocks.samling"),
							() => Y("blocks.samling"),
							() => Y("tip.blocks.faq"),
							() => Y("blocks.faq"),
							() => Y("tip.blocks.tidslinje"),
							() => Y("blocks.tidslinje"),
							() => Y("tip.blocks.sitat"),
							() => Y("blocks.sitat"),
							() => Y("tip.blocks.statistikk"),
							() => Y("blocks.statistikk"),
							() => Y("blocks.galleri"),
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
						]), B("click", o, () => Qu("text")), B("click", c, () => Qu("text-box")), B("click", u, () => Qu("button")), B("change", m, ad), B("click", h, () => Qu("video")), B("click", _, () => Qu("icon")), B("click", y, () => Qu("samling")), B("click", x, () => Qu("faq")), B("click", C, () => Qu("tidslinje")), B("click", w, () => Qu("sitat")), B("click", T, () => Qu("statistikk")), B("click", se, () => Qu("galleri")), B("change", de, ld), B("click", ge, () => Qu("shape-line")), B("click", ve, () => Qu("shape-arrow")), B("click", ye, () => Qu("shape-circle")), B("click", be, () => Qu("shape-rect")), B("click", Se, () => Qu("shape-triangle")), H(e, t);
					};
					W(i, (e) => {
						z(o) ? e(a) : e(s, -1);
					}), k(t), R((e, i, a) => {
						n = ei(t, 1, "panel-body svelte-1n46o8q", null, n, { locked: z(ne) === "mobile" }), J(t, "title", e), J(r, "placeholder", i), J(r, "title", a);
					}, [
						() => z(ne) === "mobile" ? Y("tip.blocks.mobileLocked") : void 0,
						() => Y("canvas.searchBlocks"),
						() => Y("canvas.searchBlocks")
					]), di(r, () => z(td), (e) => P(td, e)), H(e, t);
				}, _ = (e) => {
					var t = zl(), n = F(t), r = F(n), i = L(r), a = F(i);
					k(i), k(n);
					var o = L(n, 2);
					K(o);
					var s = L(o, 2), c = F(s);
					K(c);
					var l = L(c);
					k(s), k(t), R((e, t) => {
						U(r, `${e ?? ""} `), U(a, `${z(te).size ?? ""} px`), q(o, z(te).size), si(c, z(te).snap !== !1), U(l, ` ${t ?? ""}`);
					}, [() => Y("lbl.gridSize"), () => Y("lbl.gridSnap")]), B("input", o, (e) => ur("size", Number(e.target.value))), B("change", c, (e) => ur("snap", e.target.checked)), H(e, t);
				}, v = (e) => {
					var t = Kl(), r = F(t), i = (e) => {
						var t = Bl(), n = I(t), r = F(n, !0);
						k(n);
						var i = L(n, 2);
						a(i), R((e) => U(r, e), [() => Y("blocks.suffix", { label: Bt[z(A).type] ?? z(A).type })]), H(e, t);
					}, o = (e) => {
						var t = Gl(), r = I(t), i = F(r, !0);
						k(r);
						var a = L(r, 2), o = F(a), s = L(o);
						K(s), k(a);
						var l = L(a, 4), u = F(l);
						K(u);
						var d = L(u);
						k(l);
						var f = L(l, 2), p = (e) => {
							var t = Vl(), n = I(t), r = F(n), i = L(r), a = F(i);
							k(i), k(n);
							var o = L(n, 2);
							K(o), R((e) => {
								U(r, `${e ?? ""} `), U(a, `${z(Wt).size ?? ""} px`), q(o, z(Wt).size);
							}, [() => Y("lbl.gridSize")]), B("input", o, (e) => lr("size", Number(e.target.value))), H(e, t);
						};
						W(f, (e) => {
							z(Wt) && e(p);
						});
						var m = L(f, 4), h = F(m), g = L(h);
						{
							let e = /* @__PURE__ */ M(() => [["", Y("common.standard")], ...Object.entries(Wo).map(([e, t]) => [e, Y(t)])]);
							X(g, {
								get value() {
									return z(Yt);
								},
								get options() {
									return z(e);
								},
								onchange: (e) => en(e)
							});
						}
						k(m);
						var _ = L(m, 2), v = F(_), y = L(v), b = F(y), x = F(b);
						k(b);
						var S = L(b, 2);
						G(S, () => c.copy, !0), k(S), k(y), k(_);
						var C = L(_, 4), ee = F(C, !0);
						k(C);
						var w = L(C, 2);
						n(w, () => z(Rn), () => z(Kt));
						var te = L(w, 4), T = F(te), ne = L(T);
						{
							let e = /* @__PURE__ */ M(() => Yn(z(qt)) ? z(qt).type : "");
							X(ne, {
								get value() {
									return z(e);
								},
								get options() {
									return Xn;
								},
								onchange: (e) => nr(e || null)
							});
						}
						k(te);
						var re = L(te, 2), ie = (e) => {
							var t = Wl(), n = I(t), r = F(n), i = L(r);
							K(i), k(n);
							var a = L(n, 2), o = (e) => {
								var t = Hl(), n = I(t), r = F(n), i = L(r);
								K(i), k(n);
								var a = L(n, 2), o = F(a), s = L(o);
								{
									let e = /* @__PURE__ */ M(() => z(qt).props.pattern ?? "sequence"), t = /* @__PURE__ */ M(() => [["sequence", Y("opt.stagger.sequence")], ["columns", Y("opt.stagger.columns")]]);
									X(s, {
										get value() {
											return z(e);
										},
										get options() {
											return z(t);
										},
										onchange: (e) => ar(e)
									});
								}
								k(a), R((e, t, s, c) => {
									J(n, "title", e), U(r, `${t ?? ""} `), q(i, z(qt).props.step ?? 90), J(a, "title", s), U(o, `${c ?? ""} `);
								}, [
									() => Y("tip.props.staggerStep"),
									() => Y("lbl.stepMs"),
									() => Y("tip.props.staggerPattern"),
									() => Y("lbl.pattern")
								]), B("change", i, (e) => ir("step", Number(e.target.value))), H(e, t);
							}, s = (e) => {
								var t = Ul(), n = F(t), r = L(n);
								K(r), k(t), R((e) => {
									U(n, `${e ?? ""} `), q(r, z(qt).props.delay);
								}, [() => Y("lbl.delayMs")]), B("change", r, (e) => ir("delay", Number(e.target.value))), H(e, t);
							};
							W(a, (e) => {
								z(qt).type === "stagger" ? e(o) : e(s, -1);
							}), R((e) => {
								U(r, `${e ?? ""} `), q(i, z(qt).props.duration);
							}, [() => Y("lbl.durationMs")]), B("change", i, (e) => ir("duration", Number(e.target.value))), H(e, t);
						}, ae = /* @__PURE__ */ M(() => Yn(z(qt)));
						W(re, (e) => {
							z(ae) && e(ie);
						});
						var oe = L(re, 2), se = F(oe), ce = L(se);
						{
							let e = /* @__PURE__ */ M(() => z(Jt)?.type ?? (z(qt) && !Yn(z(qt)) ? z(qt).type : ""));
							X(ce, {
								get value() {
									return z(e);
								},
								get options() {
									return Zn;
								},
								onchange: (e) => rr(e || null)
							});
						}
						k(oe), R((e, t, n, r, c, l, f, p, g, y, b, C, w, ne, re) => {
							U(i, e), J(a, "title", t), U(o, `${n ?? ""} `), q(s, z(Gt)), J(s, "placeholder", r), si(u, z(Wt) !== null), U(d, ` ${c ?? ""}`), J(m, "title", l), U(h, `${f ?? ""} `), J(_, "title", p), U(v, `${g ?? ""} `), U(x, `#${z(Ut) ?? ""}`), J(S, "title", y), U(ee, b), J(te, "title", C), U(T, `${w ?? ""} `), J(oe, "title", ne), U(se, `${re ?? ""} `);
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
						]), B("change", s, (e) => or(e.target.value)), B("change", u, (e) => cr(e.target.checked)), B("click", S, () => navigator.clipboard?.writeText(`#${z(Ut)}`)), H(e, t);
					}, s = (e) => {
						var t = sc(), n = F(t, !0);
						k(t), R((e) => U(n, e), [() => Y("hint.props.empty")]), H(e, t);
					};
					W(r, (e) => {
						z(A) ? e(i) : z(Ut) ? e(o, 1) : e(s, -1);
					}), k(t), H(e, t);
				}, y = (e) => {
					var t = eu(), i = F(t), a = F(i);
					K(a);
					var o = L(a);
					k(i);
					var s = L(i, 2), l = (e) => {
						var t = Il(), n = F(t), r = F(n, !0);
						k(n);
						var i = L(n, 2);
						Ur(i, 21, () => z(O).pages ?? [], (e) => e.id, (e, t) => {
							var n = gc(), r = F(n);
							K(r);
							var i = L(r);
							k(n), R((e, a) => {
								J(n, "title", e), si(r, a), U(i, ` ${(z(t).title || z(t).id) ?? ""}`);
							}, [() => Y("tip.footer.hideOnPage"), () => !(z(O).footer?.hideOn ?? []).includes(z(t).id)]), B("change", r, (e) => Oo(z(t).id, e.target.checked)), H(e, n);
						}), k(i), k(t), R((e) => U(r, e), [() => Y("group.showOnPages")]), H(e, t);
					};
					W(s, (e) => {
						z(O).footer?.show && e(l);
					});
					var u = L(s, 2), d = F(u), f = F(d, !0);
					k(d);
					var p = L(d, 2), m = F(p);
					Ur(m, 21, () => ho, (e) => e.id, (e, t) => {
						var n = ql(), r = F(n);
						G(r, () => Fs(z(t).thumb), !0), k(r);
						var i = L(r, 2), a = F(i, !0);
						k(i), k(n), R((e) => {
							J(n, "title", e), U(a, z(t).label);
						}, [() => Y("tip.footer.template", { label: z(t).label })]), B("click", n, () => _o(z(t).id)), H(e, n);
					}), k(m), k(p), k(u);
					var h = L(u, 2), g = F(h), _ = F(g, !0);
					k(g);
					var v = L(g, 2), y = F(v), b = F(y), x = L(b);
					K(x), k(y);
					var S = L(y, 2), C = F(S), ee = L(C);
					K(ee), k(S);
					var w = L(S, 2), te = F(w), T = L(te);
					{
						let e = /* @__PURE__ */ M(() => z(O).footer?.brand?.mode ?? "text"), t = /* @__PURE__ */ M(() => [
							["text", Y("blocks.text")],
							["image", Y("opt.brand.image")],
							["both", Y("opt.brand.both")]
						]);
						X(T, {
							get value() {
								return z(e);
							},
							get options() {
								return z(t);
							},
							onchange: (e) => oo(e)
						});
					}
					k(w);
					var ne = L(w, 2), re = (e) => {
						var t = Yl(), n = I(t), r = F(n), i = F(r), a = L(i);
						k(r);
						var o = L(r, 2), s = (e) => {
							var t = Hs();
							G(t, () => c.cross, !0), k(t), R((e) => J(t, "title", e), [() => Y("tip.footer.removeLogo")]), B("click", t, fo), H(e, t);
						};
						W(o, (e) => {
							z(O).footer?.brand?.logo && e(s);
						}), k(n);
						var l = L(n, 2), u = (e) => {
							var t = Jl(), n = I(t), r = F(n), i = L(r), a = F(i);
							k(i), k(n);
							var o = L(n, 2);
							K(o), R((e) => {
								U(r, `${e ?? ""} `), U(a, `${z(O).footer?.brand?.logoHeight ?? 40 ?? ""} px`), q(o, z(O).footer?.brand?.logoHeight ?? 40);
							}, [() => Y("lbl.logoHeight")]), B("input", o, (e) => po(e.target.value)), H(e, t);
						};
						W(l, (e) => {
							z(O).footer?.brand?.logo && e(u);
						}), R((e, t) => {
							J(r, "title", e), U(i, `${t ?? ""} `);
						}, [() => Y("tip.webpAutoPublish"), () => z(O).footer?.brand?.logo ? Y("ui.changeLogo") : Y("ui.uploadLogo")]), B("change", a, uo), H(e, t);
					};
					W(ne, (e) => {
						(z(O).footer?.brand?.mode ?? "text") !== "text" && e(re);
					}), k(v), k(h);
					var ie = L(h, 2), ae = F(ie), oe = F(ae, !0);
					k(ae);
					var se = L(ae, 2), ce = F(se);
					Ur(ce, 17, () => z(O).footer?.columns ?? [], zr, (e, t, n) => {
						var r = Xl(), i = I(r), a = F(i);
						K(a);
						var o = L(a, 2), s = F(o);
						G(s, () => c.plus, !0), k(s);
						var l = L(s, 2);
						l.disabled = n === 0, G(l, () => c.up, !0), k(l);
						var u = L(l, 2);
						G(u, () => c.down, !0), k(u);
						var d = L(u, 2);
						G(d, () => c.cross, !0), k(d), k(o), k(i), Ur(L(i, 2), 17, () => z(t).links ?? [], zr, (e, r, i) => {
							var a = rc(), o = F(a);
							K(o);
							var s = L(o, 2), l = F(s);
							l.disabled = i === 0, G(l, () => c.up, !0), k(l);
							var u = L(l, 2);
							G(u, () => c.down, !0), k(u);
							var d = L(u, 2);
							G(d, () => c.cross, !0), k(d), k(s);
							var f = L(s, 2), p = F(f);
							{
								let e = /* @__PURE__ */ M(() => z(r).page ?? "__href"), t = /* @__PURE__ */ M(() => Y("tip.linkTarget")), a = /* @__PURE__ */ M(() => [...z(O).pages.map((e) => [e.id, e.title]), ["__href", Y("opt.linkHref")]]);
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
									onchange: (e) => Ho(n, i, e)
								});
							}
							k(f);
							var m = L(f, 2), h = (e) => {
								var t = nc();
								K(t), R((e, n) => {
									q(t, z(r).href ?? ""), J(t, "placeholder", e), J(t, "title", n);
								}, [() => Y("ph.hrefAnchor"), () => Y("tip.hrefAnchor")]), B("change", t, (e) => Uo(n, i, e.target.value)), H(e, t);
							};
							W(m, (e) => {
								z(r).page || e(h);
							}), k(a), R((e, n) => {
								q(o, z(r).label), J(o, "title", e), u.disabled = i === z(t).links.length - 1, J(d, "title", n);
							}, [() => Y("tip.linkLabel"), () => Y("tip.removeLink")]), B("input", o, (e) => Bo(n, i, e.target.value)), B("click", l, () => zo(n, i, -1)), B("click", u, () => zo(n, i, 1)), B("click", d, () => Ro(n, i)), H(e, a);
						}), R((e, r, i) => {
							q(a, z(t).title), J(a, "title", e), J(s, "title", r), u.disabled = n === z(O).footer.columns.length - 1, J(d, "title", i);
						}, [
							() => Y("tip.footer.columnTitle"),
							() => Y("tip.footer.addLink"),
							() => Y("tip.footer.removeColumn")
						]), B("input", a, (e) => Fo(n, e.target.value)), B("click", s, () => Io(n)), B("click", l, () => Mo(n, -1)), B("click", u, () => Mo(n, 1)), B("click", d, () => Ao(n)), H(e, r);
					});
					var le = L(ce, 2), ue = F(le, !0);
					k(le);
					var de = L(le, 2), fe = F(de), pe = L(fe);
					{
						let e = /* @__PURE__ */ M(() => z(O).footer?.columnsAlign ?? "left"), t = /* @__PURE__ */ M(() => [["left", Y("common.left")], ["center", Y("common.center")]]);
						X(pe, {
							get value() {
								return z(e);
							},
							get options() {
								return z(t);
							},
							onchange: (e) => wo(e)
						});
					}
					k(de), k(se), k(ie);
					var me = L(ie, 2), he = F(me), ge = F(he, !0);
					k(he);
					var _e = L(he, 2), ve = F(_e);
					Ur(ve, 17, () => z(O).footer?.social ?? [], zr, (e, t, n) => {
						var r = Zl(), i = F(r), a = F(i);
						G(a, () => pa(z(t).icon) || "", !0), k(a);
						var o = L(a, 2);
						{
							let e = /* @__PURE__ */ M(() => Y("blocks.icon"));
							X(o, {
								get value() {
									return z(t).icon;
								},
								get title() {
									return z(e);
								},
								get options() {
									return $o;
								},
								onchange: (e) => Zo(n, e)
							});
						}
						k(i);
						var s = L(i, 2), l = F(s);
						l.disabled = n === 0, G(l, () => c.up, !0), k(l);
						var u = L(l, 2);
						G(u, () => c.down, !0), k(u);
						var d = L(u, 2);
						G(d, () => c.cross, !0), k(d), k(s);
						var f = L(s, 2);
						K(f), k(r), R((e, r) => {
							u.disabled = n === z(O).footer.social.length - 1, J(d, "title", e), q(f, z(t).url), J(f, "placeholder", r);
						}, [() => Y("tip.removeLink"), () => Y("ph.hrefMailto")]), B("click", l, () => Xo(n, -1)), B("click", u, () => Xo(n, 1)), B("click", d, () => Yo(n)), B("change", f, (e) => Qo(n, e.target.value)), H(e, r);
					});
					var E = L(ve, 2), ye = F(E, !0);
					k(E), k(_e), k(me);
					var D = L(me, 2), be = F(D), xe = F(be, !0);
					k(be);
					var Se = L(be, 2), Ce = F(Se), we = F(Ce);
					K(we);
					var Te = L(we);
					k(Ce);
					var Ee = L(Ce, 2), De = (e) => {
						let t = /* @__PURE__ */ M(() => z(O).footer.cta);
						var n = $l(), r = I(n), i = F(r), a = L(i);
						{
							let e = /* @__PURE__ */ M(() => z(t).kind ?? "button"), n = /* @__PURE__ */ M(() => [["button", Y("opt.cta.button")], ["newsletter", Y("opt.cta.newsletter")]]);
							X(a, {
								get value() {
									return z(e);
								},
								get options() {
									return z(n);
								},
								onchange: (e) => Eo("kind", e)
							});
						}
						k(r);
						var o = L(r, 2), s = F(o);
						K(s);
						var c = L(s);
						k(o);
						var l = L(o, 2), u = F(l), d = L(u);
						K(d), k(l);
						var f = L(l, 2), p = F(f), m = L(p);
						K(m), k(f);
						var h = L(f, 2), g = F(h), _ = L(g);
						K(_), k(h);
						var v = L(h, 2), y = (e) => {
							var n = Ql(), r = I(n), i = F(r), a = L(i);
							{
								let e = /* @__PURE__ */ M(() => z(t).page ?? "__href"), n = /* @__PURE__ */ M(() => [...z(O).pages.map((e) => [e.id, e.title]), ["__href", Y("opt.linkHrefMailto")]]);
								X(a, {
									get value() {
										return z(e);
									},
									get options() {
										return z(n);
									},
									onchange: (e) => Do(e)
								});
							}
							k(r);
							var o = L(r, 2), s = (e) => {
								var n = mc();
								K(n), R((e, r) => {
									q(n, z(t).href ?? ""), J(n, "placeholder", e), J(n, "title", r);
								}, [() => Y("ph.hrefMailtoAnchor"), () => Y("tip.hrefAnchor")]), B("change", n, (e) => Eo("href", e.target.value)), H(e, n);
							};
							W(o, (e) => {
								z(t).page || e(s);
							}), R((e, t) => {
								J(r, "title", e), U(i, `${t ?? ""} `);
							}, [() => Y("tip.footer.ctaTarget"), () => Y("lbl.buttonTarget")]), H(e, n);
						}, b = (e) => {
							var n = fc(), r = I(n), i = F(r), a = L(i);
							K(a), k(r);
							var o = L(r, 2), s = F(o), c = L(s);
							K(c), k(o);
							var l = L(o, 2), u = F(l), d = L(u);
							K(d), k(l), R((e, n, f, p, m, h, g, _, v) => {
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
							]), B("change", a, (e) => Eo("endpoint", e.target.value)), B("change", c, (e) => Eo("recipient", e.target.value)), B("input", d, (e) => Eo("success", e.target.value)), H(e, n);
						};
						W(v, (e) => {
							(z(t).kind ?? "button") === "button" ? e(y) : e(b, -1);
						}), R((e, n, a, v, y, b, x, S, C, ee, w, te) => {
							J(r, "title", e), U(i, `${n ?? ""} `), J(o, "title", a), si(s, z(t).big === !0), U(c, ` ${v ?? ""}`), J(l, "title", y), U(u, `${b ?? ""} `), q(d, z(t).heading ?? ""), J(d, "placeholder", x), J(f, "title", S), U(p, `${C ?? ""} `), q(m, z(t).sub ?? ""), J(h, "title", ee), U(g, `${w ?? ""} `), q(_, z(t).label ?? ""), J(_, "placeholder", te);
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
						]), B("change", s, (e) => Eo("big", e.target.checked)), B("input", d, (e) => Eo("heading", e.target.value)), B("input", m, (e) => Eo("sub", e.target.value)), B("input", _, (e) => Eo("label", e.target.value)), H(e, n);
					};
					W(Ee, (e) => {
						z(O).footer?.cta && e(De);
					}), k(Se), k(D);
					var Oe = L(D, 2), ke = F(Oe), Ae = F(ke, !0);
					k(ke);
					var je = L(ke, 2), Me = F(je);
					r(Me, () => "linkRow", () => z(O).footer?.linkRow ?? []);
					var Ne = L(Me, 2), Pe = F(Ne, !0);
					k(Ne), k(je), k(Oe);
					var Ie = L(Oe, 2), Le = F(Ie), Re = F(Le, !0);
					k(Le);
					var ze = L(Le, 2), Be = F(ze), Ve = (e) => {
						var t = Ic(), n = I(t), r = F(n), i = L(r);
						{
							let e = /* @__PURE__ */ M(() => z(O).footer?.align ?? "left"), t = /* @__PURE__ */ M(() => [
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
								onchange: (e) => $("footer", (t) => {
									t.align = e;
								})
							});
						}
						k(n), Fe(2), R((e, t) => {
							J(n, "title", e), U(r, `${t ?? ""} `);
						}, [() => Y("tip.footer.align"), () => Y("lbl.align")]), H(e, t);
					};
					W(Be, (e) => {
						z(O).footer?.cta?.big !== !0 && e(Ve);
					});
					var He = L(Be, 2), Ue = F(He, !0);
					k(He);
					var We = L(He, 2);
					n(We, () => Bn, () => z(O).footer?.background?.layers ?? []), k(ze), k(Ie);
					var Ge = L(Ie, 2), Ke = F(Ge), qe = F(Ke, !0);
					k(Ke);
					var Je = L(Ke, 2), Ye = F(Je), Xe = F(Ye), Ze = L(Xe);
					K(Ze), k(Ye);
					var Qe = L(Ye, 2), $e = F(Qe, !0);
					k(Qe);
					var et = L(Qe, 2);
					r(et, () => "baseline", () => z(O).footer?.baseline ?? []);
					var tt = L(et, 2), nt = F(tt, !0);
					k(tt), k(Je), k(Ge), k(t), R((e, t, n, r, s, c, l, u, d, p, m, h, g, v, T, ne, re, ie, ae, se, ce, le, pe, me, he, _e, ve, E, D, be, Se, Ee) => {
						J(i, "title", e), si(a, t), U(o, ` ${n ?? ""}`), U(f, r), U(_, s), J(y, "title", c), U(b, `${l ?? ""} `), q(x, z(O).footer?.brand?.title ?? ""), J(x, "placeholder", u), J(S, "title", d), U(C, `${p ?? ""} `), q(ee, z(O).footer?.brand?.tagline ?? ""), J(w, "title", m), U(te, `${h ?? ""} `), U(oe, g), U(ue, v), J(de, "title", T), U(fe, `${ne ?? ""} `), U(ge, re), U(ye, ie), U(xe, ae), J(Ce, "title", se), si(we, ce), U(Te, ` ${le ?? ""}`), U(Ae, pe), U(Pe, me), U(Re, he), U(Ue, _e), U(qe, ve), J(Ye, "title", E), U(Xe, `${D ?? ""} `), q(Ze, z(O).footer?.copyright ?? ""), J(Ze, "placeholder", be), U($e, Se), U(nt, Ee);
					}, [
						() => Y("tip.footer.show"),
						() => !!z(O).footer?.show,
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
						() => !!z(O).footer?.cta,
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
					]), B("change", a, (e) => $("footer", (t) => {
						t.show = e.target.checked;
					})), B("input", x, (e) => ao("title", e.target.value)), B("input", ee, (e) => ao("tagline", e.target.value)), B("click", le, ko), B("click", E, Jo), B("change", we, (e) => To(e.target.checked)), B("click", Ne, () => vo("linkRow")), B("input", Ze, (e) => mo(e.target.value)), B("click", tt, () => vo("baseline")), H(e, t);
				}, b = (e) => {
					var t = iu(), n = F(t), r = (e) => {
						var t = ic(), n = F(t), r = L(n);
						{
							let e = /* @__PURE__ */ M(() => z(Wi) ?? ""), t = /* @__PURE__ */ M(() => [["", Y("common.choose")], ...z(Hi).map((e) => [e, z(Ui)[e]?.name ?? e])]);
							X(r, {
								get value() {
									return z(e);
								},
								get options() {
									return z(t);
								},
								onchange: (e) => P(Wi, e || null, !0)
							});
						}
						k(t), R((e) => U(n, `${e ?? ""} `), [() => Y("blocks.samling")]), H(e, t);
					};
					W(n, (e) => {
						z(Hi).length && e(r);
					});
					var i = L(n, 2), a = (e) => {
						let t = /* @__PURE__ */ M(() => z(Ui)[z(Wi)]);
						var n = ru(), r = I(n), i = F(r), a = F(i, !0);
						k(i);
						var o = L(i, 2);
						G(o, () => c.cross, !0), k(o), k(r);
						var s = L(r, 2);
						Ur(s, 19, () => z(t).entries, (e) => e.id, (e, n, r) => {
							var i = nu(), a = F(i), o = F(a);
							k(a);
							var s = L(a, 2), l = F(s), u = F(l);
							K(u);
							var d = L(u, 2), f = F(d);
							G(f, () => c.up, !0), k(f);
							var p = L(f, 2);
							G(p, () => c.down, !0), k(p);
							var m = L(p, 2);
							G(m, () => c.cross, !0), k(m), k(d), k(l);
							var h = L(l, 2), g = F(h), _ = L(g);
							K(_), k(h);
							var v = L(h, 2);
							lt(v);
							var y = L(v, 2), b = F(y), x = L(b);
							K(x), k(y);
							var S = L(y, 2), C = F(S), ee = F(C), w = L(ee);
							k(C);
							var te = L(C, 2), T = (e) => {
								var t = tu(), r = I(t), i = L(r, 2);
								G(i, () => c.cross, !0), k(i), R((e) => {
									J(r, "src", z(n).image), J(i, "title", e);
								}, [() => Y("tip.removeImage")]), B("click", i, () => Ta(z(Wi), z(n).id, "image", "")), H(e, t);
							};
							W(te, (e) => {
								z(n).image && e(T);
							}), k(S), k(s), k(i), R((e, i, a, s, c, l, d, h) => {
								U(o, `${e ?? ""}${z(n).date ? ` · ${z(n).date}` : ""}`), q(u, z(n).title), J(u, "title", i), f.disabled = z(r) === 0, p.disabled = z(r) === z(t).entries.length - 1, J(m, "title", a), U(g, `${s ?? ""} `), q(_, z(n).date ?? ""), J(v, "placeholder", c), q(v, z(n).text ?? ""), U(b, `${l ?? ""} `), q(x, z(n).href ?? ""), J(x, "placeholder", d), U(ee, `${h ?? ""} `);
							}, [
								() => z(n).title.replace(/<[^>]*>/g, ""),
								() => Y("lbl.title"),
								() => Y("tip.collections.deleteEntry"),
								() => Y("lbl.date"),
								() => Y("ph.collections.text"),
								() => Y("lbl.link"),
								() => Y("ph.collections.href"),
								() => z(n).image ? Y("ui.changeImage") : Y("ui.addImage")
							]), B("change", u, (e) => Ta(z(Wi), z(n).id, "title", e.target.value || "Uten tittel")), B("click", f, () => Da(z(Wi), z(r), -1)), B("click", p, () => Da(z(Wi), z(r), 1)), B("click", m, () => Oa(z(Wi), z(n).id)), B("change", _, (e) => Ta(z(Wi), z(n).id, "date", e.target.value)), B("change", v, (e) => Ta(z(Wi), z(n).id, "text", e.target.value)), B("change", x, (e) => Ta(z(Wi), z(n).id, "href", e.target.value)), B("change", w, (e) => ka(z(Wi), z(n).id, e)), H(e, i);
						});
						var l = L(s, 2), u = (e) => {
							var t = sc(), n = F(t, !0);
							k(t), R((e) => U(n, e), [() => Y("hint.collections.empty")]), H(e, t);
						};
						W(l, (e) => {
							z(t).entries.length || e(u);
						}), Fe(2), R((e, t) => {
							U(a, e), J(o, "title", t);
						}, [() => Y("ui.addEntry"), () => Y("tip.collections.deleteCollection")]), B("click", i, () => Sa(z(Wi))), B("click", o, () => xa(z(Wi))), H(e, n);
					};
					W(i, (e) => {
						z(Wi) && z(Ui)[z(Wi)] && e(a);
					});
					var o = L(i, 2), s = F(o), l = L(s);
					K(l), k(o);
					var u = L(o, 2), d = F(u);
					X(L(d), {
						get value() {
							return z(qi);
						},
						get options() {
							return Ji;
						},
						onchange: (e) => P(qi, e, !0)
					}), k(u);
					var f = L(u, 2), p = F(f, !0);
					k(f), k(t), R((e, t, n, r, i) => {
						U(s, `${e ?? ""} `), J(l, "placeholder", t), U(d, `${n ?? ""} `), f.disabled = r, U(p, i);
					}, [
						() => Y("lbl.newCollectionName"),
						() => Y("ph.collections.name"),
						() => Y("common.type"),
						() => !z(Ki).trim(),
						() => Y("ui.createCollection")
					]), B("keydown", l, (e) => e.key === "Enter" && ba()), di(l, () => z(Ki), (e) => P(Ki, e)), B("click", f, ba), H(e, t);
				}, x = (e) => {
					var t = du(), n = F(t), r = (e) => {
						var t = sc(), n = F(t, !0);
						k(t), R((e) => U(n, e), [() => Y("hint.plugins.empty")]), H(e, t);
					}, i = /* @__PURE__ */ M(() => !Ga().length);
					W(n, (e) => {
						z(i) && e(r);
					});
					var a = L(n, 2);
					Ur(a, 16, Ga, (e) => e, (e, t) => {
						let n = /* @__PURE__ */ M(() => La[t]), r = /* @__PURE__ */ M(() => (z(Ia)?.enabled ?? []).includes(t));
						var i = su();
						let a;
						var o = F(i), s = F(o), l = F(s, !0);
						k(s);
						var u = L(s, 2), d = (e) => {
							var t = au(), r = F(t);
							k(t), R(() => U(r, `v${z(n).version ?? ""}`)), H(e, t);
						};
						W(u, (e) => {
							z(n)?.version && e(d);
						});
						var f = L(u, 2), p = F(f), m = F(p);
						K(m);
						var h = L(m);
						k(p);
						var g = L(p, 2);
						G(g, () => c.cross, !0), k(g), k(f), k(o);
						var _ = L(o, 2), v = (e) => {
							var t = ou(), r = F(t, !0);
							k(t), R((e) => U(r, e), [() => z(n).errors.join("; ")]), H(e, t);
						}, y = (e) => {
							var t = ou(), r = F(t, !0);
							k(t), R((e) => U(r, e), [() => Y("plugin.engineMismatch", {
								required: z(n).requiresEngine,
								current: z(za)
							})]), H(e, t);
						}, b = (e) => {
							var t = ou(), r = F(t, !0);
							k(t), R((e) => U(r, e), [() => Y("plugin.cspNeeded", { list: Ya(z(n).csp).join(", ") })]), H(e, t);
						}, x = /* @__PURE__ */ M(() => z(n)?.csp && Ya(z(n).csp).length);
						W(_, (e) => {
							z(n)?.errors?.length ? e(v) : z(n) && !z(n).satisfied ? e(y, 1) : z(x) && e(b, 2);
						});
						var S = L(_, 2), C = (e) => {
							var t = sc(), r = F(t, !0);
							k(t), R((e) => U(r, e), [() => Y("plugin.languages", { list: z(n).languages.map((e) => e.name).join(", ") })]), H(e, t);
						};
						W(S, (e) => {
							z(n)?.languages?.length && e(C);
						}), k(i), R((e, t, o, s, c) => {
							a = ei(i, 1, "plugin-row svelte-1n46o8q", null, a, { "plugin-broken": z(n)?.errors?.length }), U(l, e), J(p, "title", t), si(m, z(r)), m.disabled = o, U(h, ` ${s ?? ""}`), J(g, "title", c);
						}, [
							() => z(n)?.names?.[ki()] ?? z(n)?.name ?? t,
							() => z(r) ? Y("tip.plugins.on") : Y("tip.plugins.off"),
							() => !!z(n)?.errors?.length,
							() => z(r) ? Y("ui.on") : Y("ui.off"),
							() => Y("tip.plugins.remove")
						]), B("change", m, (e) => eo(t, e.target.checked)), B("click", g, () => no(t)), H(e, i);
					});
					var o = L(a, 2), s = (e) => {
						var t = lu(), n = L(I(t), 2), r = F(n, !0);
						k(n), Ur(L(n, 2), 16, () => z(Q), (e) => e, (e, t) => {
							var n = cu(), r = F(n), i = F(r), a = F(i, !0);
							k(i);
							var o = L(i, 2), s = (e) => {
								var n = au(), r = F(n);
								k(n), R(() => U(r, `v${La[t].version ?? ""}`)), H(e, n);
							};
							W(o, (e) => {
								La[t]?.version && e(s);
							});
							var l = L(o, 2), u = F(l);
							G(u, () => c.right, !0), k(u), k(l), k(r), k(n), R((e, t) => {
								U(a, e), J(u, "title", t);
							}, [() => La[t]?.names?.[ki()] ?? La[t]?.name ?? t, () => Y("tip.plugins.addFound")]), B("click", u, () => io(t)), H(e, n);
						}), R((e) => U(r, e), [() => Y("hint.plugins.found")]), H(e, t);
					};
					W(o, (e) => {
						z(Q).length && e(s);
					});
					var l = L(o, 2), u = (e) => {
						var t = Nr(), n = I(t), r = (e) => {
							var t = sc(), n = F(t, !0);
							k(t), R((e) => U(n, e), [() => Y("hint.plugins.autoDiscover")]), H(e, t);
						};
						W(n, (e) => {
							z(Q).length || e(r);
						}), H(e, t);
					}, d = (e) => {
						var t = uu(), n = L(I(t), 2);
						K(n);
						var r = L(n, 2), i = F(r, !0);
						k(r);
						var a = L(r, 2), o = (e) => {
							var t = ou(), n = F(t, !0);
							k(t), R(() => U(n, z(Z))), H(e, t);
						};
						W(a, (e) => {
							z(Z) && e(o);
						}), R((e, t, a) => {
							J(n, "placeholder", e), r.disabled = t, U(i, a);
						}, [
							() => Y("ph.plugins.folder"),
							() => !z(Ha).trim(),
							() => Y("ui.addPlugin")
						]), B("keydown", n, (e) => e.key === "Enter" && ro()), di(n, () => z(Ha), (e) => P(Ha, e)), B("click", r, ro), H(e, t);
					};
					W(l, (e) => {
						z(Wa) === "ok" ? e(u) : e(d, -1);
					}), k(t), H(e, t);
				}, S = (e) => {
					var t = Kl(), n = F(t), r = (e) => {
						var t = sc(), n = F(t, !0);
						k(t), R((e) => U(n, e), [() => Y("hint.history.loading")]), H(e, t);
					}, i = (e) => {
						var t = al(), n = I(t), r = (e) => {
							var t = sc(), n = F(t, !0);
							k(t), R(() => U(n, z(gr))), H(e, t);
						};
						W(n, (e) => {
							z(gr) && e(r);
						});
						var i = L(n, 2), a = (e) => {
							var t = pu(), n = I(t), r = F(n, !0);
							k(n), Ur(L(n, 2), 19, () => z(hr), (e) => e.sha, (e, t, n) => {
								var r = fu();
								let i;
								var a = F(r), o = F(a, !0);
								k(a);
								var s = L(a, 2), c = F(s);
								k(s), k(r), R((e) => {
									i = ei(r, 1, "history-row svelte-1n46o8q", null, i, { head: z(n) === 0 }), J(a, "title", z(t).sha), U(o, z(t).message), U(c, `${z(t).author ?? ""}${e ?? ""}`);
								}, [() => z(t).date ? ` · ${yr.format(new Date(z(t).date))}` : ""]), H(e, r);
							}), R((e, t) => {
								n.disabled = z(_r) || !z(w)?.allowed, J(n, "title", e), U(r, t);
							}, [() => z(w)?.allowed ? Y("tip.history.revert") : Y("tip.history.needsAccess"), () => Y("ui.revertLast")]), B("click", n, xr), H(e, t);
						};
						W(i, (e) => {
							z(hr).length > 0 && e(a);
						}), H(e, t);
					};
					W(n, (e) => {
						z(hr) === null ? e(r) : e(i, -1);
					}), k(t), H(e, t);
				}, C = (e) => {
					var t = Kl(), n = F(t), r = (e) => {
						var t = sc(), n = F(t, !0);
						k(t), R((e) => U(n, e), [() => Y("update.checking")]), H(e, t);
					}, i = (e) => {
						var t = mu(), n = I(t), r = F(n, !0);
						k(n);
						var i = L(n, 2), a = F(i, !0);
						k(i), R((e) => {
							U(r, z(Er)), U(a, e);
						}, [() => Y("update.retry")]), B("click", i, kr), H(e, t);
					}, a = (e) => {
						var t = Tu(), n = I(t), r = F(n), i = F(r, !0);
						k(r);
						var a = L(r, 2), o = (e) => {
							var t = hu(), n = I(t);
							G(n, () => c.right, !0), k(n);
							var r = L(n, 2), i = F(r, !0);
							k(r), R(() => U(i, z(Tr).target)), H(e, t);
						};
						W(a, (e) => {
							z(Tr).upToDate || e(o);
						}), k(n);
						var s = L(n, 2), l = (e) => {
							var t = sc(), n = F(t, !0);
							k(t), R((e) => U(n, e), [() => Y("update.upToDate")]), H(e, t);
						}, u = (e) => {
							var t = wu(), n = I(t), r = F(n, !0);
							k(n);
							var i = L(n, 2), a = (e) => {
								var t = gu(), n = F(t), r = F(n, !0);
								k(n);
								var i = L(n, 2), a = F(i), o = F(a, !0);
								k(a), k(i), k(t), R((e) => {
									U(r, e), U(o, z(Tr).notes);
								}, [() => Y("update.aboutVersion", { target: z(Tr).target })]), H(e, t);
							};
							W(i, (e) => {
								z(Tr).notes && e(a);
							});
							var o = L(i, 2), s = (e) => {
								var t = _u(), n = F(t), r = F(n);
								G(r, () => c.warn, !0), k(r);
								var i = L(r);
								k(n);
								var a = L(n, 2), o = F(a), s = F(o, !0);
								k(o), k(a), k(t), R((e, t) => {
									J(n, "title", e), U(i, ` ${t ?? ""}`), U(s, z(Tr).headers.upstream);
								}, [() => Y("update.headersManual"), () => Y("update.headersTitle")]), H(e, t);
							};
							W(o, (e) => {
								z(Tr).headers?.upstream && e(s);
							});
							var l = L(o, 2);
							Ur(l, 17, () => z(Tr).changes.filter((e) => e.atom && e.conflict), (e) => e.path, (e, t) => {
								var n = yu(), r = F(n), i = F(r, !0);
								k(r);
								var a = L(r, 2), o = F(a), s = (e) => {
									var t = vu(), n = F(t, !0);
									k(t), R((e) => U(n, e), [() => Y("update.actionDelete")]), H(e, t);
								};
								W(o, (e) => {
									z(t).action === "delete" && e(s);
								});
								var l = L(o, 2);
								G(l, () => c.warn, !0), k(l), k(a), k(n), R((e) => {
									J(r, "title", z(t).path), U(i, z(t).path), J(l, "title", e);
								}, [() => Y(`update.conflict.${z(t).conflict}`)]), H(e, n);
							});
							var u = L(l, 2), d = F(u), f = F(d);
							k(d);
							var p = L(d, 2);
							Ur(p, 21, () => z(Tr).changes.filter((e) => e.atom && !e.conflict), (e) => e.path, (e, t) => {
								var n = bu(), r = F(n), i = F(r, !0);
								k(r);
								var a = L(r, 2), o = (e) => {
									var t = vu(), n = F(t, !0);
									k(t), R((e) => U(n, e), [() => Y("update.actionDelete")]), H(e, t);
								};
								W(a, (e) => {
									z(t).action === "delete" && e(o);
								}), k(n), R(() => {
									J(r, "title", z(t).path), U(i, z(t).path);
								}), H(e, n);
							}), k(p), k(u);
							var m = L(u, 2), h = (e) => {
								var t = Cu(), n = I(t), r = F(n), i = F(r, !0);
								k(r);
								var a = L(r, 2), o = F(a, !0);
								k(a), k(n), Ur(L(n, 2), 17, () => z(Tr).changes.filter((e) => !e.atom), (e) => e.path, (e, t) => {
									var n = Su(), r = F(n);
									let i;
									var a = F(r, !0);
									k(r);
									var o = L(r, 2), s = F(o), l = (e) => {
										var t = vu(), n = F(t, !0);
										k(t), R((e) => U(n, e), [() => Y("update.actionDelete")]), H(e, t);
									};
									W(s, (e) => {
										z(t).action === "delete" && e(l);
									});
									var u = L(s, 2), d = (e) => {
										var n = xu();
										G(n, () => c.warn, !0), k(n), R((e) => J(n, "title", e), [() => Y(`update.conflict.${z(t).conflict}`)]), H(e, n);
									};
									W(u, (e) => {
										z(t).conflict && e(d);
									});
									var f = L(u, 2);
									K(f), k(o), k(n), R((e, n, o, s) => {
										i = ei(r, 1, "update-path svelte-1n46o8q", null, i, e), J(r, "title", z(t).path), U(a, z(t).path), si(f, n), J(f, "title", o), J(f, "aria-label", s);
									}, [
										() => ({ skipped: z(Or).has(z(t).path) }),
										() => z(Or).has(z(t).path),
										() => Y("update.keepMine.title"),
										() => Y("update.keepMine")
									]), B("change", f, () => Ar(z(t).path)), H(e, n);
								}), R((e, t) => {
									U(i, e), U(o, t);
								}, [() => Y("update.optionalTitle"), () => Y("update.keepMine")]), H(e, t);
							}, g = /* @__PURE__ */ M(() => z(Tr).changes.some((e) => !e.atom));
							W(m, (e) => {
								z(g) && e(h);
							});
							var _ = L(m, 2), v = F(_, !0);
							k(_), R((e, t, n, i, a, o) => {
								U(r, e), J(d, "title", t), U(f, `${n ?? ""} · ${i ?? ""}`), _.disabled = z(Dr) || !z(w)?.allowed, J(_, "title", a), U(v, o);
							}, [
								() => Y("update.summary", {
									writes: z(Tr).changes.filter((e) => e.action === "write").length,
									deletes: z(Tr).changes.filter((e) => e.action === "delete").length
								}),
								() => Y("update.atomGroup.title"),
								() => Y("update.atomTitle"),
								() => z(Tr).changes.filter((e) => e.atom).length,
								() => z(w)?.allowed ? Y("update.run.title") : Y("tip.history.needsAccess"),
								() => Y("update.run", { target: z(Tr).target })
							]), B("click", _, jr), H(e, t);
						};
						W(s, (e) => {
							z(Tr).upToDate ? e(l) : e(u, -1);
						}), R((e) => U(i, e), [() => Y("update.current", { version: z(Tr).current })]), H(e, t);
					};
					W(n, (e) => {
						z(Dr) && !z(Tr) ? e(r) : z(Er) ? e(i, 1) : z(Tr) && e(a, 2);
					}), k(t), H(e, t);
				};
				W(s, (e) => {
					z($e) === "pages" ? e(l) : z($e) === "nav" ? e(u, 1) : z($e) === "site" ? e(f, 2) : z($e) === "theme" ? e(p, 3) : z($e) === "blocks" ? e(h, 4) : z($e) === "grid" ? e(_, 5) : z($e) === "properties" ? e(v, 6) : z($e) === "footer" ? e(y, 7) : z($e) === "collections" ? e(b, 8) : z($e) === "plugins" ? e(x, 9) : z($e) === "history" ? e(S, 10) : z($e) === "update" && e(C, 11);
				}), k(t), R((e) => {
					J(i, "title", e), U(o, tt[z($e)]);
				}, [() => nt[z($e)]?.map((e) => Y(e)).join("\n")]), H(e, t);
			};
			W(v, (e) => {
				z($e) && e(y);
			}), R((e) => {
				p = ei(f, 1, "rail-gear svelte-1n46o8q", null, p, { active: z(Br) }), J(f, "title", e);
			}, [() => Y("settings.title")]), B("click", f, () => P(Br, !z(Br))), H(e, t);
		};
		W(i, (e) => {
			z(T) && e(o);
		});
		var s = L(i, 2);
		let f;
		var p = F(s), h = F(p);
		hi(h, (e) => P(ee, e), () => z(ee)), k(p), k(s), hi(s, (e) => P(re, e), () => z(re)), k(t), R((e) => {
			f = ei(s, 1, "frame-wrap svelte-1n46o8q", null, f, { mobile: z(ne) === "mobile" }), ni(p, `width:${z(pe) ?? ""}px; height:${z(me) ?? ""}px`), J(h, "title", e), J(h, "src", `/?page=${z(g)}&preview=1`), ni(h, `width:${z(le) ?? ""}px; height:${z(fe) ?? ""}px; transform:scale(${z(ue) ?? ""}); transform-origin:top left`);
		}, [() => Y("ui.previewTitle")]), wr("load", h, Ir), Sr(h), H(e, t);
	}, Vd = (e) => {
		var t = ku(), n = F(t, !0);
		k(t), R((e) => U(n, e), [() => Y("ui.loading")]), H(e, t);
	};
	W(zd, (e) => {
		z(h) ? e(Bd) : e(Vd, -1);
	});
	var Hd = L(zd, 2), Ud = (e) => {
		ja(e, {
			get image() {
				return z(mi);
			},
			onapply: _i,
			oncancel: () => P(mi, null)
		});
	};
	W(Hd, (e) => {
		z(mi) && e(Ud);
	});
	var Wd = L(Hd, 2), Gd = (e) => {
		var t = ju(), n = F(t), r = F(n), i = F(r, !0);
		k(r);
		var a = L(r, 2);
		Ur(a, 16, () => z(Be).lines, (e) => e, (e, t) => {
			var n = Au(), r = F(n, !0);
			k(n), R(() => U(r, t)), H(e, n);
		});
		var o = L(a, 2), s = (e) => {
			var t = mc();
			K(t), ct(t, !0), R(() => J(t, "placeholder", z(Be).placeholder)), B("keydown", t, (e) => e.key === "Enter" && z(Be).value.trim() && We(!0)), di(t, () => z(Be).value, (e) => z(Be).value = e), H(e, t);
		};
		W(o, (e) => {
			z(Be).prompt && e(s);
		});
		var c = L(o, 2), l = F(c), u = F(l, !0);
		k(l);
		var d = L(l, 2), f = F(d, !0);
		k(d), k(c), k(n), k(t), R(() => {
			U(i, z(Be).title), U(u, z(Be).cancelLabel), U(f, z(Be).okLabel);
		}), B("click", l, () => We(!1)), B("click", d, () => We(!0)), H(e, t);
	};
	W(Wd, (e) => {
		z(Be) && e(Gd);
	});
	var Kd = L(Wd, 2), qd = (e) => {
		var t = Mu(), n = F(t), r = F(n), i = F(r, !0);
		k(r);
		var a = L(r, 2), o = F(a, !0);
		k(a);
		var s = L(a, 2), c = F(s), l = L(c);
		K(l), k(s);
		var u = L(s, 2), d = F(u), f = L(d);
		{
			let e = /* @__PURE__ */ M(() => Y("setup.accentPick"));
			Gi(f, {
				get value() {
					return z(Ye);
				},
				get label() {
					return z(e);
				},
				onchange: (e) => P(Ye, e, !0)
			});
		}
		k(u);
		var p = L(u, 2), m = F(p), h = L(m);
		{
			let e = /* @__PURE__ */ M(() => Y("setup.bgLabel"));
			Gi(h, {
				get value() {
					return z(Xe);
				},
				get label() {
					return z(e);
				},
				onchange: (e) => P(Xe, e, !0)
			});
		}
		k(p);
		var g = L(p, 2), _ = F(g, !0);
		k(g);
		var v = L(g, 2), y = F(v), b = F(y, !0);
		k(y);
		var x = L(y, 2), S = F(x, !0);
		k(x), k(v), k(n), k(t), R((e, t, n, r, a, s, u, f, p, h) => {
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
			() => !z(Je).trim(),
			() => Y("setup.start")
		]), B("keydown", l, (e) => e.key === "Enter" && Qe()), di(l, () => z(Je), (e) => P(Je, e)), B("click", y, Ze), B("click", x, Qe), H(e, t);
	};
	W(Kd, (e) => {
		z(Ge) && e(qd);
	});
	var Jd = L(Kd, 2), Yd = (e) => {
		var t = Nu();
		let n;
		var r = F(t), i = F(r, !0);
		k(r);
		var a = L(r, 2);
		k(t), R((e) => {
			n = ei(t, 1, "toast svelte-1n46o8q", null, n, {
				ok: z(y) === "ok",
				error: z(y) === "error"
			}), U(i, z(v)), J(a, "title", e);
		}, [() => Y("ui.close")]), B("click", a, () => x("")), H(e, t);
	};
	W(Jd, (e) => {
		z(v) && e(Yd);
	}), k(wd);
	var Xd = L(wd, 2), Zd = (e) => {
		var t = Pu(), n = F(t), r = F(n), i = F(r, !0);
		k(r);
		var o = L(r, 2);
		G(o, () => c.cross, !0), k(o), k(n);
		var s = L(n, 2), l = F(s);
		a(l), k(s), k(t), R((e, n) => {
			ni(t, `left: ${z(gt).left ?? ""}px; top: ${z(gt).top ?? ""}px`), U(i, e), J(o, "title", n);
		}, [() => Y("blocks.suffix", { label: Bt[z(A).type] ?? z(A).type }), () => Y("tip.closeEsc")]), B("click", o, () => P(gt, null)), H(e, t);
	};
	W(Xd, (e) => {
		z(gt) && z(A) && e(Zd);
	}), R(() => Od = ei(Dd, 1, "topbar svelte-1n46o8q", null, Od, { hidden: !z(T) })), H(e, Cd), qe();
}
//#endregion
//#region src/main.js
Tr([
	"click",
	"input",
	"pointerdown",
	"change",
	"keydown"
]), document.documentElement.lang = await Mi();
var Lu = Pr(Iu, { target: document.getElementById("urd-admin") });
//#endregion
export { Lu as default };
