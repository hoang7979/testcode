/**
 * Combined by jsDelivr.
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
/*
 Copyright (C) Federico Zivolo 2019
 Distributed under the MIT License (license terms are at http://opensource.org/licenses/MIT).
 */
(function(e, t) {
    'object' == typeof exports && 'undefined' != typeof module ? module.exports = t() : 'function' == typeof define && define.amd ? define(t) : e.Popper = t()
})(this, function() {
    'use strict';

    function e(e) {
        return e && '[object Function]' === {}.toString.call(e)
    }

    function t(e, t) {
        if (1 !== e.nodeType) return [];
        var o = e.ownerDocument.defaultView,
            n = o.getComputedStyle(e, null);
        return t ? n[t] : n
    }

    function o(e) {
        return 'HTML' === e.nodeName ? e : e.parentNode || e.host
    }

    function n(e) {
        if (!e) return document.body;
        switch (e.nodeName) {
            case 'HTML':
            case 'BODY':
                return e.ownerDocument.body;
            case '#document':
                return e.body;
        }
        var i = t(e),
            r = i.overflow,
            p = i.overflowX,
            s = i.overflowY;
        return /(auto|scroll|overlay)/.test(r + s + p) ? e : n(o(e))
    }

    function r(e) {
        return 11 === e ? pe : 10 === e ? se : pe || se
    }

    function p(e) {
        if (!e) return document.documentElement;
        for (var o = r(10) ? document.body : null, n = e.offsetParent || null; n === o && e.nextElementSibling;) n = (e = e.nextElementSibling).offsetParent;
        var i = n && n.nodeName;
        return i && 'BODY' !== i && 'HTML' !== i ? -1 !== ['TH', 'TD', 'TABLE'].indexOf(n.nodeName) && 'static' === t(n, 'position') ? p(n) : n : e ? e.ownerDocument.documentElement : document.documentElement
    }

    function s(e) {
        var t = e.nodeName;
        return 'BODY' !== t && ('HTML' === t || p(e.firstElementChild) === e)
    }

    function d(e) {
        return null === e.parentNode ? e : d(e.parentNode)
    }

    function a(e, t) {
        if (!e || !e.nodeType || !t || !t.nodeType) return document.documentElement;
        var o = e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING,
            n = o ? e : t,
            i = o ? t : e,
            r = document.createRange();
        r.setStart(n, 0), r.setEnd(i, 0);
        var l = r.commonAncestorContainer;
        if (e !== l && t !== l || n.contains(i)) return s(l) ? l : p(l);
        var f = d(e);
        return f.host ? a(f.host, t) : a(e, d(t).host)
    }

    function l(e) {
        var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 'top',
            o = 'top' === t ? 'scrollTop' : 'scrollLeft',
            n = e.nodeName;
        if ('BODY' === n || 'HTML' === n) {
            var i = e.ownerDocument.documentElement,
                r = e.ownerDocument.scrollingElement || i;
            return r[o]
        }
        return e[o]
    }

    function f(e, t) {
        var o = 2 < arguments.length && void 0 !== arguments[2] && arguments[2],
            n = l(t, 'top'),
            i = l(t, 'left'),
            r = o ? -1 : 1;
        return e.top += n * r, e.bottom += n * r, e.left += i * r, e.right += i * r, e
    }

    function m(e, t) {
        var o = 'x' === t ? 'Left' : 'Top',
            n = 'Left' == o ? 'Right' : 'Bottom';
        return parseFloat(e['border' + o + 'Width'], 10) + parseFloat(e['border' + n + 'Width'], 10)
    }

    function h(e, t, o, n) {
        return ee(t['offset' + e], t['scroll' + e], o['client' + e], o['offset' + e], o['scroll' + e], r(10) ? parseInt(o['offset' + e]) + parseInt(n['margin' + ('Height' === e ? 'Top' : 'Left')]) + parseInt(n['margin' + ('Height' === e ? 'Bottom' : 'Right')]) : 0)
    }

    function c(e) {
        var t = e.body,
            o = e.documentElement,
            n = r(10) && getComputedStyle(o);
        return {
            height: h('Height', t, o, n),
            width: h('Width', t, o, n)
        }
    }

    function g(e) {
        return fe({}, e, {
            right: e.left + e.width,
            bottom: e.top + e.height
        })
    }

    function u(e) {
        var o = {};
        try {
            if (r(10)) {
                o = e.getBoundingClientRect();
                var n = l(e, 'top'),
                    i = l(e, 'left');
                o.top += n, o.left += i, o.bottom += n, o.right += i
            } else o = e.getBoundingClientRect()
        } catch (t) {}
        var p = {
                left: o.left,
                top: o.top,
                width: o.right - o.left,
                height: o.bottom - o.top
            },
            s = 'HTML' === e.nodeName ? c(e.ownerDocument) : {},
            d = s.width || e.clientWidth || p.right - p.left,
            a = s.height || e.clientHeight || p.bottom - p.top,
            f = e.offsetWidth - d,
            h = e.offsetHeight - a;
        if (f || h) {
            var u = t(e);
            f -= m(u, 'x'), h -= m(u, 'y'), p.width -= f, p.height -= h
        }
        return g(p)
    }

    function b(e, o) {
        var i = 2 < arguments.length && void 0 !== arguments[2] && arguments[2],
            p = r(10),
            s = 'HTML' === o.nodeName,
            d = u(e),
            a = u(o),
            l = n(e),
            m = t(o),
            h = parseFloat(m.borderTopWidth, 10),
            c = parseFloat(m.borderLeftWidth, 10);
        i && s && (a.top = ee(a.top, 0), a.left = ee(a.left, 0));
        var b = g({
            top: d.top - a.top - h,
            left: d.left - a.left - c,
            width: d.width,
            height: d.height
        });
        if (b.marginTop = 0, b.marginLeft = 0, !p && s) {
            var w = parseFloat(m.marginTop, 10),
                y = parseFloat(m.marginLeft, 10);
            b.top -= h - w, b.bottom -= h - w, b.left -= c - y, b.right -= c - y, b.marginTop = w, b.marginLeft = y
        }
        return (p && !i ? o.contains(l) : o === l && 'BODY' !== l.nodeName) && (b = f(b, o)), b
    }

    function w(e) {
        var t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
            o = e.ownerDocument.documentElement,
            n = b(e, o),
            i = ee(o.clientWidth, window.innerWidth || 0),
            r = ee(o.clientHeight, window.innerHeight || 0),
            p = t ? 0 : l(o),
            s = t ? 0 : l(o, 'left'),
            d = {
                top: p - n.top + n.marginTop,
                left: s - n.left + n.marginLeft,
                width: i,
                height: r
            };
        return g(d)
    }

    function y(e) {
        var n = e.nodeName;
        if ('BODY' === n || 'HTML' === n) return !1;
        if ('fixed' === t(e, 'position')) return !0;
        var i = o(e);
        return !!i && y(i)
    }

    function E(e) {
        if (!e || !e.parentElement || r()) return document.documentElement;
        for (var o = e.parentElement; o && 'none' === t(o, 'transform');) o = o.parentElement;
        return o || document.documentElement
    }

    function v(e, t, i, r) {
        var p = 4 < arguments.length && void 0 !== arguments[4] && arguments[4],
            s = {
                top: 0,
                left: 0
            },
            d = p ? E(e) : a(e, t);
        if ('viewport' === r) s = w(d, p);
        else {
            var l;
            'scrollParent' === r ? (l = n(o(t)), 'BODY' === l.nodeName && (l = e.ownerDocument.documentElement)) : 'window' === r ? l = e.ownerDocument.documentElement : l = r;
            var f = b(l, d, p);
            if ('HTML' === l.nodeName && !y(d)) {
                var m = c(e.ownerDocument),
                    h = m.height,
                    g = m.width;
                s.top += f.top - f.marginTop, s.bottom = h + f.top, s.left += f.left - f.marginLeft, s.right = g + f.left
            } else s = f
        }
        i = i || 0;
        var u = 'number' == typeof i;
        return s.left += u ? i : i.left || 0, s.top += u ? i : i.top || 0, s.right -= u ? i : i.right || 0, s.bottom -= u ? i : i.bottom || 0, s
    }

    function x(e) {
        var t = e.width,
            o = e.height;
        return t * o
    }

    function O(e, t, o, n, i) {
        var r = 5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : 0;
        if (-1 === e.indexOf('auto')) return e;
        var p = v(o, n, r, i),
            s = {
                top: {
                    width: p.width,
                    height: t.top - p.top
                },
                right: {
                    width: p.right - t.right,
                    height: p.height
                },
                bottom: {
                    width: p.width,
                    height: p.bottom - t.bottom
                },
                left: {
                    width: t.left - p.left,
                    height: p.height
                }
            },
            d = Object.keys(s).map(function(e) {
                return fe({
                    key: e
                }, s[e], {
                    area: x(s[e])
                })
            }).sort(function(e, t) {
                return t.area - e.area
            }),
            a = d.filter(function(e) {
                var t = e.width,
                    n = e.height;
                return t >= o.clientWidth && n >= o.clientHeight
            }),
            l = 0 < a.length ? a[0].key : d[0].key,
            f = e.split('-')[1];
        return l + (f ? '-' + f : '')
    }

    function L(e, t, o) {
        var n = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null,
            i = n ? E(t) : a(t, o);
        return b(o, i, n)
    }

    function S(e) {
        var t = e.ownerDocument.defaultView,
            o = t.getComputedStyle(e),
            n = parseFloat(o.marginTop || 0) + parseFloat(o.marginBottom || 0),
            i = parseFloat(o.marginLeft || 0) + parseFloat(o.marginRight || 0),
            r = {
                width: e.offsetWidth + i,
                height: e.offsetHeight + n
            };
        return r
    }

    function T(e) {
        var t = {
            left: 'right',
            right: 'left',
            bottom: 'top',
            top: 'bottom'
        };
        return e.replace(/left|right|bottom|top/g, function(e) {
            return t[e]
        })
    }

    function D(e, t, o) {
        o = o.split('-')[0];
        var n = S(e),
            i = {
                width: n.width,
                height: n.height
            },
            r = -1 !== ['right', 'left'].indexOf(o),
            p = r ? 'top' : 'left',
            s = r ? 'left' : 'top',
            d = r ? 'height' : 'width',
            a = r ? 'width' : 'height';
        return i[p] = t[p] + t[d] / 2 - n[d] / 2, i[s] = o === s ? t[s] - n[a] : t[T(s)], i
    }

    function C(e, t) {
        return Array.prototype.find ? e.find(t) : e.filter(t)[0]
    }

    function N(e, t, o) {
        if (Array.prototype.findIndex) return e.findIndex(function(e) {
            return e[t] === o
        });
        var n = C(e, function(e) {
            return e[t] === o
        });
        return e.indexOf(n)
    }

    function P(t, o, n) {
        var i = void 0 === n ? t : t.slice(0, N(t, 'name', n));
        return i.forEach(function(t) {
            t['function'] && console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
            var n = t['function'] || t.fn;
            t.enabled && e(n) && (o.offsets.popper = g(o.offsets.popper), o.offsets.reference = g(o.offsets.reference), o = n(o, t))
        }), o
    }

    function k() {
        if (!this.state.isDestroyed) {
            var e = {
                instance: this,
                styles: {},
                arrowStyles: {},
                attributes: {},
                flipped: !1,
                offsets: {}
            };
            e.offsets.reference = L(this.state, this.popper, this.reference, this.options.positionFixed), e.placement = O(this.options.placement, e.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding), e.originalPlacement = e.placement, e.positionFixed = this.options.positionFixed, e.offsets.popper = D(this.popper, e.offsets.reference, e.placement), e.offsets.popper.position = this.options.positionFixed ? 'fixed' : 'absolute', e = P(this.modifiers, e), this.state.isCreated ? this.options.onUpdate(e) : (this.state.isCreated = !0, this.options.onCreate(e))
        }
    }

    function W(e, t) {
        return e.some(function(e) {
            var o = e.name,
                n = e.enabled;
            return n && o === t
        })
    }

    function H(e) {
        for (var t = [!1, 'ms', 'Webkit', 'Moz', 'O'], o = e.charAt(0).toUpperCase() + e.slice(1), n = 0; n < t.length; n++) {
            var i = t[n],
                r = i ? '' + i + o : e;
            if ('undefined' != typeof document.body.style[r]) return r
        }
        return null
    }

    function B() {
        return this.state.isDestroyed = !0, W(this.modifiers, 'applyStyle') && (this.popper.removeAttribute('x-placement'), this.popper.style.position = '', this.popper.style.top = '', this.popper.style.left = '', this.popper.style.right = '', this.popper.style.bottom = '', this.popper.style.willChange = '', this.popper.style[H('transform')] = ''), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this
    }

    function A(e) {
        var t = e.ownerDocument;
        return t ? t.defaultView : window
    }

    function M(e, t, o, i) {
        var r = 'BODY' === e.nodeName,
            p = r ? e.ownerDocument.defaultView : e;
        p.addEventListener(t, o, {
            passive: !0
        }), r || M(n(p.parentNode), t, o, i), i.push(p)
    }

    function F(e, t, o, i) {
        o.updateBound = i, A(e).addEventListener('resize', o.updateBound, {
            passive: !0
        });
        var r = n(e);
        return M(r, 'scroll', o.updateBound, o.scrollParents), o.scrollElement = r, o.eventsEnabled = !0, o
    }

    function I() {
        this.state.eventsEnabled || (this.state = F(this.reference, this.options, this.state, this.scheduleUpdate))
    }

    function R(e, t) {
        return A(e).removeEventListener('resize', t.updateBound), t.scrollParents.forEach(function(e) {
            e.removeEventListener('scroll', t.updateBound)
        }), t.updateBound = null, t.scrollParents = [], t.scrollElement = null, t.eventsEnabled = !1, t
    }

    function U() {
        this.state.eventsEnabled && (cancelAnimationFrame(this.scheduleUpdate), this.state = R(this.reference, this.state))
    }

    function Y(e) {
        return '' !== e && !isNaN(parseFloat(e)) && isFinite(e)
    }

    function j(e, t) {
        Object.keys(t).forEach(function(o) {
            var n = ''; - 1 !== ['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(o) && Y(t[o]) && (n = 'px'), e.style[o] = t[o] + n
        })
    }

    function V(e, t) {
        Object.keys(t).forEach(function(o) {
            var n = t[o];
            !1 === n ? e.removeAttribute(o) : e.setAttribute(o, t[o])
        })
    }

    function q(e, t) {
        var o = e.offsets,
            n = o.popper,
            i = o.reference,
            r = $,
            p = function(e) {
                return e
            },
            s = r(i.width),
            d = r(n.width),
            a = -1 !== ['left', 'right'].indexOf(e.placement),
            l = -1 !== e.placement.indexOf('-'),
            f = t ? a || l || s % 2 == d % 2 ? r : Z : p,
            m = t ? r : p;
        return {
            left: f(1 == s % 2 && 1 == d % 2 && !l && t ? n.left - 1 : n.left),
            top: m(n.top),
            bottom: m(n.bottom),
            right: f(n.right)
        }
    }

    function K(e, t, o) {
        var n = C(e, function(e) {
                var o = e.name;
                return o === t
            }),
            i = !!n && e.some(function(e) {
                return e.name === o && e.enabled && e.order < n.order
            });
        if (!i) {
            var r = '`' + t + '`';
            console.warn('`' + o + '`' + ' modifier is required by ' + r + ' modifier in order to work, be sure to include it before ' + r + '!')
        }
        return i
    }

    function z(e) {
        return 'end' === e ? 'start' : 'start' === e ? 'end' : e
    }

    function G(e) {
        var t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
            o = ce.indexOf(e),
            n = ce.slice(o + 1).concat(ce.slice(0, o));
        return t ? n.reverse() : n
    }

    function _(e, t, o, n) {
        var i = e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
            r = +i[1],
            p = i[2];
        if (!r) return e;
        if (0 === p.indexOf('%')) {
            var s;
            switch (p) {
                case '%p':
                    s = o;
                    break;
                case '%':
                case '%r':
                default:
                    s = n;
            }
            var d = g(s);
            return d[t] / 100 * r
        }
        if ('vh' === p || 'vw' === p) {
            var a;
            return a = 'vh' === p ? ee(document.documentElement.clientHeight, window.innerHeight || 0) : ee(document.documentElement.clientWidth, window.innerWidth || 0), a / 100 * r
        }
        return r
    }

    function X(e, t, o, n) {
        var i = [0, 0],
            r = -1 !== ['right', 'left'].indexOf(n),
            p = e.split(/(\+|\-)/).map(function(e) {
                return e.trim()
            }),
            s = p.indexOf(C(p, function(e) {
                return -1 !== e.search(/,|\s/)
            }));
        p[s] && -1 === p[s].indexOf(',') && console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
        var d = /\s*,\s*|\s+/,
            a = -1 === s ? [p] : [p.slice(0, s).concat([p[s].split(d)[0]]), [p[s].split(d)[1]].concat(p.slice(s + 1))];
        return a = a.map(function(e, n) {
            var i = (1 === n ? !r : r) ? 'height' : 'width',
                p = !1;
            return e.reduce(function(e, t) {
                return '' === e[e.length - 1] && -1 !== ['+', '-'].indexOf(t) ? (e[e.length - 1] = t, p = !0, e) : p ? (e[e.length - 1] += t, p = !1, e) : e.concat(t)
            }, []).map(function(e) {
                return _(e, i, t, o)
            })
        }), a.forEach(function(e, t) {
            e.forEach(function(o, n) {
                Y(o) && (i[t] += o * ('-' === e[n - 1] ? -1 : 1))
            })
        }), i
    }

    function J(e, t) {
        var o, n = t.offset,
            i = e.placement,
            r = e.offsets,
            p = r.popper,
            s = r.reference,
            d = i.split('-')[0];
        return o = Y(+n) ? [+n, 0] : X(n, p, s, d), 'left' === d ? (p.top += o[0], p.left -= o[1]) : 'right' === d ? (p.top += o[0], p.left += o[1]) : 'top' === d ? (p.left += o[0], p.top -= o[1]) : 'bottom' === d && (p.left += o[0], p.top += o[1]), e.popper = p, e
    }
    for (var Q = Math.min, Z = Math.floor, $ = Math.round, ee = Math.max, te = 'undefined' != typeof window && 'undefined' != typeof document, oe = ['Edge', 'Trident', 'Firefox'], ne = 0, ie = 0; ie < oe.length; ie += 1)
        if (te && 0 <= navigator.userAgent.indexOf(oe[ie])) {
            ne = 1;
            break
        }
    var i = te && window.Promise,
        re = i ? function(e) {
            var t = !1;
            return function() {
                t || (t = !0, window.Promise.resolve().then(function() {
                    t = !1, e()
                }))
            }
        } : function(e) {
            var t = !1;
            return function() {
                t || (t = !0, setTimeout(function() {
                    t = !1, e()
                }, ne))
            }
        },
        pe = te && !!(window.MSInputMethodContext && document.documentMode),
        se = te && /MSIE 10/.test(navigator.userAgent),
        de = function(e, t) {
            if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function')
        },
        ae = function() {
            function e(e, t) {
                for (var o, n = 0; n < t.length; n++) o = t[n], o.enumerable = o.enumerable || !1, o.configurable = !0, 'value' in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
            }
            return function(t, o, n) {
                return o && e(t.prototype, o), n && e(t, n), t
            }
        }(),
        le = function(e, t, o) {
            return t in e ? Object.defineProperty(e, t, {
                value: o,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = o, e
        },
        fe = Object.assign || function(e) {
            for (var t, o = 1; o < arguments.length; o++)
                for (var n in t = arguments[o], t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
            return e
        },
        me = te && /Firefox/i.test(navigator.userAgent),
        he = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'],
        ce = he.slice(3),
        ge = {
            FLIP: 'flip',
            CLOCKWISE: 'clockwise',
            COUNTERCLOCKWISE: 'counterclockwise'
        },
        ue = function() {
            function t(o, n) {
                var i = this,
                    r = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
                de(this, t), this.scheduleUpdate = function() {
                    return requestAnimationFrame(i.update)
                }, this.update = re(this.update.bind(this)), this.options = fe({}, t.Defaults, r), this.state = {
                    isDestroyed: !1,
                    isCreated: !1,
                    scrollParents: []
                }, this.reference = o && o.jquery ? o[0] : o, this.popper = n && n.jquery ? n[0] : n, this.options.modifiers = {}, Object.keys(fe({}, t.Defaults.modifiers, r.modifiers)).forEach(function(e) {
                    i.options.modifiers[e] = fe({}, t.Defaults.modifiers[e] || {}, r.modifiers ? r.modifiers[e] : {})
                }), this.modifiers = Object.keys(this.options.modifiers).map(function(e) {
                    return fe({
                        name: e
                    }, i.options.modifiers[e])
                }).sort(function(e, t) {
                    return e.order - t.order
                }), this.modifiers.forEach(function(t) {
                    t.enabled && e(t.onLoad) && t.onLoad(i.reference, i.popper, i.options, t, i.state)
                }), this.update();
                var p = this.options.eventsEnabled;
                p && this.enableEventListeners(), this.state.eventsEnabled = p
            }
            return ae(t, [{
                key: 'update',
                value: function() {
                    return k.call(this)
                }
            }, {
                key: 'destroy',
                value: function() {
                    return B.call(this)
                }
            }, {
                key: 'enableEventListeners',
                value: function() {
                    return I.call(this)
                }
            }, {
                key: 'disableEventListeners',
                value: function() {
                    return U.call(this)
                }
            }]), t
        }();
    return ue.Utils = ('undefined' == typeof window ? global : window).PopperUtils, ue.placements = he, ue.Defaults = {
        placement: 'bottom',
        positionFixed: !1,
        eventsEnabled: !0,
        removeOnDestroy: !1,
        onCreate: function() {},
        onUpdate: function() {},
        modifiers: {
            shift: {
                order: 100,
                enabled: !0,
                fn: function(e) {
                    var t = e.placement,
                        o = t.split('-')[0],
                        n = t.split('-')[1];
                    if (n) {
                        var i = e.offsets,
                            r = i.reference,
                            p = i.popper,
                            s = -1 !== ['bottom', 'top'].indexOf(o),
                            d = s ? 'left' : 'top',
                            a = s ? 'width' : 'height',
                            l = {
                                start: le({}, d, r[d]),
                                end: le({}, d, r[d] + r[a] - p[a])
                            };
                        e.offsets.popper = fe({}, p, l[n])
                    }
                    return e
                }
            },
            offset: {
                order: 200,
                enabled: !0,
                fn: J,
                offset: 0
            },
            preventOverflow: {
                order: 300,
                enabled: !0,
                fn: function(e, t) {
                    var o = t.boundariesElement || p(e.instance.popper);
                    e.instance.reference === o && (o = p(o));
                    var n = H('transform'),
                        i = e.instance.popper.style,
                        r = i.top,
                        s = i.left,
                        d = i[n];
                    i.top = '', i.left = '', i[n] = '';
                    var a = v(e.instance.popper, e.instance.reference, t.padding, o, e.positionFixed);
                    i.top = r, i.left = s, i[n] = d, t.boundaries = a;
                    var l = t.priority,
                        f = e.offsets.popper,
                        m = {
                            primary: function(e) {
                                var o = f[e];
                                return f[e] < a[e] && !t.escapeWithReference && (o = ee(f[e], a[e])), le({}, e, o)
                            },
                            secondary: function(e) {
                                var o = 'right' === e ? 'left' : 'top',
                                    n = f[o];
                                return f[e] > a[e] && !t.escapeWithReference && (n = Q(f[o], a[e] - ('right' === e ? f.width : f.height))), le({}, o, n)
                            }
                        };
                    return l.forEach(function(e) {
                        var t = -1 === ['left', 'top'].indexOf(e) ? 'secondary' : 'primary';
                        f = fe({}, f, m[t](e))
                    }), e.offsets.popper = f, e
                },
                priority: ['left', 'right', 'top', 'bottom'],
                padding: 5,
                boundariesElement: 'scrollParent'
            },
            keepTogether: {
                order: 400,
                enabled: !0,
                fn: function(e) {
                    var t = e.offsets,
                        o = t.popper,
                        n = t.reference,
                        i = e.placement.split('-')[0],
                        r = Z,
                        p = -1 !== ['top', 'bottom'].indexOf(i),
                        s = p ? 'right' : 'bottom',
                        d = p ? 'left' : 'top',
                        a = p ? 'width' : 'height';
                    return o[s] < r(n[d]) && (e.offsets.popper[d] = r(n[d]) - o[a]), o[d] > r(n[s]) && (e.offsets.popper[d] = r(n[s])), e
                }
            },
            arrow: {
                order: 500,
                enabled: !0,
                fn: function(e, o) {
                    var n;
                    if (!K(e.instance.modifiers, 'arrow', 'keepTogether')) return e;
                    var i = o.element;
                    if ('string' == typeof i) {
                        if (i = e.instance.popper.querySelector(i), !i) return e;
                    } else if (!e.instance.popper.contains(i)) return console.warn('WARNING: `arrow.element` must be child of its popper element!'), e;
                    var r = e.placement.split('-')[0],
                        p = e.offsets,
                        s = p.popper,
                        d = p.reference,
                        a = -1 !== ['left', 'right'].indexOf(r),
                        l = a ? 'height' : 'width',
                        f = a ? 'Top' : 'Left',
                        m = f.toLowerCase(),
                        h = a ? 'left' : 'top',
                        c = a ? 'bottom' : 'right',
                        u = S(i)[l];
                    d[c] - u < s[m] && (e.offsets.popper[m] -= s[m] - (d[c] - u)), d[m] + u > s[c] && (e.offsets.popper[m] += d[m] + u - s[c]), e.offsets.popper = g(e.offsets.popper);
                    var b = d[m] + d[l] / 2 - u / 2,
                        w = t(e.instance.popper),
                        y = parseFloat(w['margin' + f], 10),
                        E = parseFloat(w['border' + f + 'Width'], 10),
                        v = b - e.offsets.popper[m] - y - E;
                    return v = ee(Q(s[l] - u, v), 0), e.arrowElement = i, e.offsets.arrow = (n = {}, le(n, m, $(v)), le(n, h, ''), n), e
                },
                element: '[x-arrow]'
            },
            flip: {
                order: 600,
                enabled: !0,
                fn: function(e, t) {
                    if (W(e.instance.modifiers, 'inner')) return e;
                    if (e.flipped && e.placement === e.originalPlacement) return e;
                    var o = v(e.instance.popper, e.instance.reference, t.padding, t.boundariesElement, e.positionFixed),
                        n = e.placement.split('-')[0],
                        i = T(n),
                        r = e.placement.split('-')[1] || '',
                        p = [];
                    switch (t.behavior) {
                        case ge.FLIP:
                            p = [n, i];
                            break;
                        case ge.CLOCKWISE:
                            p = G(n);
                            break;
                        case ge.COUNTERCLOCKWISE:
                            p = G(n, !0);
                            break;
                        default:
                            p = t.behavior;
                    }
                    return p.forEach(function(s, d) {
                        if (n !== s || p.length === d + 1) return e;
                        n = e.placement.split('-')[0], i = T(n);
                        var a = e.offsets.popper,
                            l = e.offsets.reference,
                            f = Z,
                            m = 'left' === n && f(a.right) > f(l.left) || 'right' === n && f(a.left) < f(l.right) || 'top' === n && f(a.bottom) > f(l.top) || 'bottom' === n && f(a.top) < f(l.bottom),
                            h = f(a.left) < f(o.left),
                            c = f(a.right) > f(o.right),
                            g = f(a.top) < f(o.top),
                            u = f(a.bottom) > f(o.bottom),
                            b = 'left' === n && h || 'right' === n && c || 'top' === n && g || 'bottom' === n && u,
                            w = -1 !== ['top', 'bottom'].indexOf(n),
                            y = !!t.flipVariations && (w && 'start' === r && h || w && 'end' === r && c || !w && 'start' === r && g || !w && 'end' === r && u);
                        (m || b || y) && (e.flipped = !0, (m || b) && (n = p[d + 1]), y && (r = z(r)), e.placement = n + (r ? '-' + r : ''), e.offsets.popper = fe({}, e.offsets.popper, D(e.instance.popper, e.offsets.reference, e.placement)), e = P(e.instance.modifiers, e, 'flip'))
                    }), e
                },
                behavior: 'flip',
                padding: 5,
                boundariesElement: 'viewport'
            },
            inner: {
                order: 700,
                enabled: !1,
                fn: function(e) {
                    var t = e.placement,
                        o = t.split('-')[0],
                        n = e.offsets,
                        i = n.popper,
                        r = n.reference,
                        p = -1 !== ['left', 'right'].indexOf(o),
                        s = -1 === ['top', 'left'].indexOf(o);
                    return i[p ? 'left' : 'top'] = r[o] - (s ? i[p ? 'width' : 'height'] : 0), e.placement = T(t), e.offsets.popper = g(i), e
                }
            },
            hide: {
                order: 800,
                enabled: !0,
                fn: function(e) {
                    if (!K(e.instance.modifiers, 'hide', 'preventOverflow')) return e;
                    var t = e.offsets.reference,
                        o = C(e.instance.modifiers, function(e) {
                            return 'preventOverflow' === e.name
                        }).boundaries;
                    if (t.bottom < o.top || t.left > o.right || t.top > o.bottom || t.right < o.left) {
                        if (!0 === e.hide) return e;
                        e.hide = !0, e.attributes['x-out-of-boundaries'] = ''
                    } else {
                        if (!1 === e.hide) return e;
                        e.hide = !1, e.attributes['x-out-of-boundaries'] = !1
                    }
                    return e
                }
            },
            computeStyle: {
                order: 850,
                enabled: !0,
                fn: function(e, t) {
                    var o = t.x,
                        n = t.y,
                        i = e.offsets.popper,
                        r = C(e.instance.modifiers, function(e) {
                            return 'applyStyle' === e.name
                        }).gpuAcceleration;
                    void 0 !== r && console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
                    var s, d, a = void 0 === r ? t.gpuAcceleration : r,
                        l = p(e.instance.popper),
                        f = u(l),
                        m = {
                            position: i.position
                        },
                        h = q(e, 2 > window.devicePixelRatio || !me),
                        c = 'bottom' === o ? 'top' : 'bottom',
                        g = 'right' === n ? 'left' : 'right',
                        b = H('transform');
                    if (d = 'bottom' == c ? 'HTML' === l.nodeName ? -l.clientHeight + h.bottom : -f.height + h.bottom : h.top, s = 'right' == g ? 'HTML' === l.nodeName ? -l.clientWidth + h.right : -f.width + h.right : h.left, a && b) m[b] = 'translate3d(' + s + 'px, ' + d + 'px, 0)', m[c] = 0, m[g] = 0, m.willChange = 'transform';
                    else {
                        var w = 'bottom' == c ? -1 : 1,
                            y = 'right' == g ? -1 : 1;
                        m[c] = d * w, m[g] = s * y, m.willChange = c + ', ' + g
                    }
                    var E = {
                        "x-placement": e.placement
                    };
                    return e.attributes = fe({}, E, e.attributes), e.styles = fe({}, m, e.styles), e.arrowStyles = fe({}, e.offsets.arrow, e.arrowStyles), e
                },
                gpuAcceleration: !0,
                x: 'bottom',
                y: 'right'
            },
            applyStyle: {
                order: 900,
                enabled: !0,
                fn: function(e) {
                    return j(e.instance.popper, e.styles), V(e.instance.popper, e.attributes), e.arrowElement && Object.keys(e.arrowStyles).length && j(e.arrowElement, e.arrowStyles), e
                },
                onLoad: function(e, t, o, n, i) {
                    var r = L(i, t, e, o.positionFixed),
                        p = O(o.placement, r, t, e, o.modifiers.flip.boundariesElement, o.modifiers.flip.padding);
                    return t.setAttribute('x-placement', p), j(t, {
                        position: o.positionFixed ? 'fixed' : 'absolute'
                    }), o
                },
                gpuAcceleration: void 0
            }
        }
    }, ue
});

;

/*!
 * Bootstrap v4.0.0 (https://getbootstrap.com)
 * Copyright 2011-2018 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
! function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports, require("jquery"), require("popper.js")) : "function" == typeof define && define.amd ? define(["exports", "jquery", "popper.js"], e) : e(t.bootstrap = {}, t.jQuery, t.Popper)
}(this, function(t, e, n) {
    "use strict";

    function i(t, e) {
        for (var n = 0; n < e.length; n++) {
            var i = e[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
        }
    }

    function s(t, e, n) {
        return e && i(t.prototype, e), n && i(t, n), t
    }

    function r() {
        return (r = Object.assign || function(t) {
            for (var e = 1; e < arguments.length; e++) {
                var n = arguments[e];
                for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i])
            }
            return t
        }).apply(this, arguments)
    }
    e = e && e.hasOwnProperty("default") ? e.default : e, n = n && n.hasOwnProperty("default") ? n.default : n;
    var o, a, l, h, c, u, f, d, _, g, p, m, v, E, T, y, C, I, A, b, D, S, w, N, O, k, P = function(t) {
            var e = !1;

            function n(e) {
                var n = this,
                    s = !1;
                return t(this).one(i.TRANSITION_END, function() {
                    s = !0
                }), setTimeout(function() {
                    s || i.triggerTransitionEnd(n)
                }, e), this
            }
            var i = {
                TRANSITION_END: "bsTransitionEnd",
                getUID: function(t) {
                    do {
                        t += ~~(1e6 * Math.random())
                    } while (document.getElementById(t));
                    return t
                },
                getSelectorFromElement: function(e) {
                    var n, i = e.getAttribute("data-target");
                    i && "#" !== i || (i = e.getAttribute("href") || ""), "#" === i.charAt(0) && (n = i, i = n = "function" == typeof t.escapeSelector ? t.escapeSelector(n).substr(1) : n.replace(/(:|\.|\[|\]|,|=|@)/g, "\\$1"));
                    try {
                        return t(document).find(i).length > 0 ? i : null
                    } catch (t) {
                        return null
                    }
                },
                reflow: function(t) {
                    return t.offsetHeight
                },
                triggerTransitionEnd: function(n) {
                    t(n).trigger(e.end)
                },
                supportsTransitionEnd: function() {
                    return Boolean(e)
                },
                isElement: function(t) {
                    return (t[0] || t).nodeType
                },
                typeCheckConfig: function(t, e, n) {
                    for (var s in n)
                        if (Object.prototype.hasOwnProperty.call(n, s)) {
                            var r = n[s],
                                o = e[s],
                                a = o && i.isElement(o) ? "element" : (l = o, {}.toString.call(l).match(/\s([a-zA-Z]+)/)[1].toLowerCase());
                            if (!new RegExp(r).test(a)) throw new Error(t.toUpperCase() + ': Option "' + s + '" provided type "' + a + '" but expected type "' + r + '".')
                        }
                    var l
                }
            };
            return e = ("undefined" == typeof window || !window.QUnit) && {
                end: "transitionend"
            }, t.fn.emulateTransitionEnd = n, i.supportsTransitionEnd() && (t.event.special[i.TRANSITION_END] = {
                bindType: e.end,
                delegateType: e.end,
                handle: function(e) {
                    if (t(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
                }
            }), i
        }(e),
        L = (a = "alert", h = "." + (l = "bs.alert"), c = (o = e).fn[a], u = {
            CLOSE: "close" + h,
            CLOSED: "closed" + h,
            CLICK_DATA_API: "click" + h + ".data-api"
        }, f = "alert", d = "fade", _ = "show", g = function() {
            function t(t) {
                this._element = t
            }
            var e = t.prototype;
            return e.close = function(t) {
                t = t || this._element;
                var e = this._getRootElement(t);
                this._triggerCloseEvent(e).isDefaultPrevented() || this._removeElement(e)
            }, e.dispose = function() {
                o.removeData(this._element, l), this._element = null
            }, e._getRootElement = function(t) {
                var e = P.getSelectorFromElement(t),
                    n = !1;
                return e && (n = o(e)[0]), n || (n = o(t).closest("." + f)[0]), n
            }, e._triggerCloseEvent = function(t) {
                var e = o.Event(u.CLOSE);
                return o(t).trigger(e), e
            }, e._removeElement = function(t) {
                var e = this;
                o(t).removeClass(_), P.supportsTransitionEnd() && o(t).hasClass(d) ? o(t).one(P.TRANSITION_END, function(n) {
                    return e._destroyElement(t, n)
                }).emulateTransitionEnd(150) : this._destroyElement(t)
            }, e._destroyElement = function(t) {
                o(t).detach().trigger(u.CLOSED).remove()
            }, t._jQueryInterface = function(e) {
                return this.each(function() {
                    var n = o(this),
                        i = n.data(l);
                    i || (i = new t(this), n.data(l, i)), "close" === e && i[e](this)
                })
            }, t._handleDismiss = function(t) {
                return function(e) {
                    e && e.preventDefault(), t.close(this)
                }
            }, s(t, null, [{
                key: "VERSION",
                get: function() {
                    return "4.0.0"
                }
            }]), t
        }(), o(document).on(u.CLICK_DATA_API, '[data-dismiss="alert"]', g._handleDismiss(new g)), o.fn[a] = g._jQueryInterface, o.fn[a].Constructor = g, o.fn[a].noConflict = function() {
            return o.fn[a] = c, g._jQueryInterface
        }, g),
        R = (m = "button", E = "." + (v = "bs.button"), T = ".data-api", y = (p = e).fn[m], C = "active", I = "btn", A = "focus", b = '[data-toggle^="button"]', D = '[data-toggle="buttons"]', S = "input", w = ".active", N = ".btn", O = {
            CLICK_DATA_API: "click" + E + T,
            FOCUS_BLUR_DATA_API: "focus" + E + T + " blur" + E + T
        }, k = function() {
            function t(t) {
                this._element = t
            }
            var e = t.prototype;
            return e.toggle = function() {
                var t = !0,
                    e = !0,
                    n = p(this._element).closest(D)[0];
                if (n) {
                    var i = p(this._element).find(S)[0];
                    if (i) {
                        if ("radio" === i.type)
                            if (i.checked && p(this._element).hasClass(C)) t = !1;
                            else {
                                var s = p(n).find(w)[0];
                                s && p(s).removeClass(C)
                            }
                        if (t) {
                            if (i.hasAttribute("disabled") || n.hasAttribute("disabled") || i.classList.contains("disabled") || n.classList.contains("disabled")) return;
                            i.checked = !p(this._element).hasClass(C), p(i).trigger("change")
                        }
                        i.focus(), e = !1
                    }
                }
                e && this._element.setAttribute("aria-pressed", !p(this._element).hasClass(C)), t && p(this._element).toggleClass(C)
            }, e.dispose = function() {
                p.removeData(this._element, v), this._element = null
            }, t._jQueryInterface = function(e) {
                return this.each(function() {
                    var n = p(this).data(v);
                    n || (n = new t(this), p(this).data(v, n)), "toggle" === e && n[e]()
                })
            }, s(t, null, [{
                key: "VERSION",
                get: function() {
                    return "4.0.0"
                }
            }]), t
        }(), p(document).on(O.CLICK_DATA_API, b, function(t) {
            t.preventDefault();
            var e = t.target;
            p(e).hasClass(I) || (e = p(e).closest(N)), k._jQueryInterface.call(p(e), "toggle")
        }).on(O.FOCUS_BLUR_DATA_API, b, function(t) {
            var e = p(t.target).closest(N)[0];
            p(e).toggleClass(A, /^focus(in)?$/.test(t.type))
        }), p.fn[m] = k._jQueryInterface, p.fn[m].Constructor = k, p.fn[m].noConflict = function() {
            return p.fn[m] = y, k._jQueryInterface
        }, k),
        j = function(t) {
            var e = "carousel",
                n = "bs.carousel",
                i = "." + n,
                o = t.fn[e],
                a = {
                    interval: 5e3,
                    keyboard: !0,
                    slide: !1,
                    pause: "hover",
                    wrap: !0
                },
                l = {
                    interval: "(number|boolean)",
                    keyboard: "boolean",
                    slide: "(boolean|string)",
                    pause: "(string|boolean)",
                    wrap: "boolean"
                },
                h = "next",
                c = "prev",
                u = "left",
                f = "right",
                d = {
                    SLIDE: "slide" + i,
                    SLID: "slid" + i,
                    KEYDOWN: "keydown" + i,
                    MOUSEENTER: "mouseenter" + i,
                    MOUSELEAVE: "mouseleave" + i,
                    TOUCHEND: "touchend" + i,
                    LOAD_DATA_API: "load" + i + ".data-api",
                    CLICK_DATA_API: "click" + i + ".data-api"
                },
                _ = "carousel",
                g = "active",
                p = "slide",
                m = "carousel-item-right",
                v = "carousel-item-left",
                E = "carousel-item-next",
                T = "carousel-item-prev",
                y = {
                    ACTIVE: ".active",
                    ACTIVE_ITEM: ".active.carousel-item",
                    ITEM: ".carousel-item",
                    NEXT_PREV: ".carousel-item-next, .carousel-item-prev",
                    INDICATORS: ".carousel-indicators",
                    DATA_SLIDE: "[data-slide], [data-slide-to]",
                    DATA_RIDE: '[data-ride="carousel"]'
                },
                C = function() {
                    function o(e, n) {
                        this._items = null, this._interval = null, this._activeElement = null, this._isPaused = !1, this._isSliding = !1, this.touchTimeout = null, this._config = this._getConfig(n), this._element = t(e)[0], this._indicatorsElement = t(this._element).find(y.INDICATORS)[0], this._addEventListeners()
                    }
                    var C = o.prototype;
                    return C.next = function() {
                        this._isSliding || this._slide(h)
                    }, C.nextWhenVisible = function() {
                        !document.hidden && t(this._element).is(":visible") && "hidden" !== t(this._element).css("visibility") && this.next()
                    }, C.prev = function() {
                        this._isSliding || this._slide(c)
                    }, C.pause = function(e) {
                        e || (this._isPaused = !0), t(this._element).find(y.NEXT_PREV)[0] && P.supportsTransitionEnd() && (P.triggerTransitionEnd(this._element), this.cycle(!0)), clearInterval(this._interval), this._interval = null
                    }, C.cycle = function(t) {
                        t || (this._isPaused = !1), this._interval && (clearInterval(this._interval), this._interval = null), this._config.interval && !this._isPaused && (this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval))
                    }, C.to = function(e) {
                        var n = this;
                        this._activeElement = t(this._element).find(y.ACTIVE_ITEM)[0];
                        var i = this._getItemIndex(this._activeElement);
                        if (!(e > this._items.length - 1 || e < 0))
                            if (this._isSliding) t(this._element).one(d.SLID, function() {
                                return n.to(e)
                            });
                            else {
                                if (i === e) return this.pause(), void this.cycle();
                                var s = e > i ? h : c;
                                this._slide(s, this._items[e])
                            }
                    }, C.dispose = function() {
                        t(this._element).off(i), t.removeData(this._element, n), this._items = null, this._config = null, this._element = null, this._interval = null, this._isPaused = null, this._isSliding = null, this._activeElement = null, this._indicatorsElement = null
                    }, C._getConfig = function(t) {
                        return t = r({}, a, t), P.typeCheckConfig(e, t, l), t
                    }, C._addEventListeners = function() {
                        var e = this;
                        this._config.keyboard && t(this._element).on(d.KEYDOWN, function(t) {
                            return e._keydown(t)
                        }), "hover" === this._config.pause && (t(this._element).on(d.MOUSEENTER, function(t) {
                            return e.pause(t)
                        }).on(d.MOUSELEAVE, function(t) {
                            return e.cycle(t)
                        }), "ontouchstart" in document.documentElement && t(this._element).on(d.TOUCHEND, function() {
                            e.pause(), e.touchTimeout && clearTimeout(e.touchTimeout), e.touchTimeout = setTimeout(function(t) {
                                return e.cycle(t)
                            }, 500 + e._config.interval)
                        }))
                    }, C._keydown = function(t) {
                        if (!/input|textarea/i.test(t.target.tagName)) switch (t.which) {
                            case 37:
                                t.preventDefault(), this.prev();
                                break;
                            case 39:
                                t.preventDefault(), this.next()
                        }
                    }, C._getItemIndex = function(e) {
                        return this._items = t.makeArray(t(e).parent().find(y.ITEM)), this._items.indexOf(e)
                    }, C._getItemByDirection = function(t, e) {
                        var n = t === h,
                            i = t === c,
                            s = this._getItemIndex(e),
                            r = this._items.length - 1;
                        if ((i && 0 === s || n && s === r) && !this._config.wrap) return e;
                        var o = (s + (t === c ? -1 : 1)) % this._items.length;
                        return -1 === o ? this._items[this._items.length - 1] : this._items[o]
                    }, C._triggerSlideEvent = function(e, n) {
                        var i = this._getItemIndex(e),
                            s = this._getItemIndex(t(this._element).find(y.ACTIVE_ITEM)[0]),
                            r = t.Event(d.SLIDE, {
                                relatedTarget: e,
                                direction: n,
                                from: s,
                                to: i
                            });
                        return t(this._element).trigger(r), r
                    }, C._setActiveIndicatorElement = function(e) {
                        if (this._indicatorsElement) {
                            t(this._indicatorsElement).find(y.ACTIVE).removeClass(g);
                            var n = this._indicatorsElement.children[this._getItemIndex(e)];
                            n && t(n).addClass(g)
                        }
                    }, C._slide = function(e, n) {
                        var i, s, r, o = this,
                            a = t(this._element).find(y.ACTIVE_ITEM)[0],
                            l = this._getItemIndex(a),
                            c = n || a && this._getItemByDirection(e, a),
                            _ = this._getItemIndex(c),
                            C = Boolean(this._interval);
                        if (e === h ? (i = v, s = E, r = u) : (i = m, s = T, r = f), c && t(c).hasClass(g)) this._isSliding = !1;
                        else if (!this._triggerSlideEvent(c, r).isDefaultPrevented() && a && c) {
                            this._isSliding = !0, C && this.pause(), this._setActiveIndicatorElement(c);
                            var I = t.Event(d.SLID, {
                                relatedTarget: c,
                                direction: r,
                                from: l,
                                to: _
                            });
                            P.supportsTransitionEnd() && t(this._element).hasClass(p) ? (t(c).addClass(s), P.reflow(c), t(a).addClass(i), t(c).addClass(i), t(a).one(P.TRANSITION_END, function() {
                                t(c).removeClass(i + " " + s).addClass(g), t(a).removeClass(g + " " + s + " " + i), o._isSliding = !1, setTimeout(function() {
                                    return t(o._element).trigger(I)
                                }, 0)
                            }).emulateTransitionEnd(600)) : (t(a).removeClass(g), t(c).addClass(g), this._isSliding = !1, t(this._element).trigger(I)), C && this.cycle()
                        }
                    }, o._jQueryInterface = function(e) {
                        return this.each(function() {
                            var i = t(this).data(n),
                                s = r({}, a, t(this).data());
                            "object" == typeof e && (s = r({}, s, e));
                            var l = "string" == typeof e ? e : s.slide;
                            if (i || (i = new o(this, s), t(this).data(n, i)), "number" == typeof e) i.to(e);
                            else if ("string" == typeof l) {
                                if ("undefined" == typeof i[l]) throw new TypeError('No method named "' + l + '"');
                                i[l]()
                            } else s.interval && (i.pause(), i.cycle())
                        })
                    }, o._dataApiClickHandler = function(e) {
                        var i = P.getSelectorFromElement(this);
                        if (i) {
                            var s = t(i)[0];
                            if (s && t(s).hasClass(_)) {
                                var a = r({}, t(s).data(), t(this).data()),
                                    l = this.getAttribute("data-slide-to");
                                l && (a.interval = !1), o._jQueryInterface.call(t(s), a), l && t(s).data(n).to(l), e.preventDefault()
                            }
                        }
                    }, s(o, null, [{
                        key: "VERSION",
                        get: function() {
                            return "4.0.0"
                        }
                    }, {
                        key: "Default",
                        get: function() {
                            return a
                        }
                    }]), o
                }();
            return t(document).on(d.CLICK_DATA_API, y.DATA_SLIDE, C._dataApiClickHandler), t(window).on(d.LOAD_DATA_API, function() {
                t(y.DATA_RIDE).each(function() {
                    var e = t(this);
                    C._jQueryInterface.call(e, e.data())
                })
            }), t.fn[e] = C._jQueryInterface, t.fn[e].Constructor = C, t.fn[e].noConflict = function() {
                return t.fn[e] = o, C._jQueryInterface
            }, C
        }(e),
        H = function(t) {
            var e = "collapse",
                n = "bs.collapse",
                i = "." + n,
                o = t.fn[e],
                a = {
                    toggle: !0,
                    parent: ""
                },
                l = {
                    toggle: "boolean",
                    parent: "(string|element)"
                },
                h = {
                    SHOW: "show" + i,
                    SHOWN: "shown" + i,
                    HIDE: "hide" + i,
                    HIDDEN: "hidden" + i,
                    CLICK_DATA_API: "click" + i + ".data-api"
                },
                c = "show",
                u = "collapse",
                f = "collapsing",
                d = "collapsed",
                _ = "width",
                g = "height",
                p = {
                    ACTIVES: ".show, .collapsing",
                    DATA_TOGGLE: '[data-toggle="collapse"]'
                },
                m = function() {
                    function i(e, n) {
                        this._isTransitioning = !1, this._element = e, this._config = this._getConfig(n), this._triggerArray = t.makeArray(t('[data-toggle="collapse"][href="#' + e.id + '"],[data-toggle="collapse"][data-target="#' + e.id + '"]'));
                        for (var i = t(p.DATA_TOGGLE), s = 0; s < i.length; s++) {
                            var r = i[s],
                                o = P.getSelectorFromElement(r);
                            null !== o && t(o).filter(e).length > 0 && (this._selector = o, this._triggerArray.push(r))
                        }
                        this._parent = this._config.parent ? this._getParent() : null, this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray), this._config.toggle && this.toggle()
                    }
                    var o = i.prototype;
                    return o.toggle = function() {
                        t(this._element).hasClass(c) ? this.hide() : this.show()
                    }, o.show = function() {
                        var e, s, r = this;
                        if (!this._isTransitioning && !t(this._element).hasClass(c) && (this._parent && 0 === (e = t.makeArray(t(this._parent).find(p.ACTIVES).filter('[data-parent="' + this._config.parent + '"]'))).length && (e = null), !(e && (s = t(e).not(this._selector).data(n)) && s._isTransitioning))) {
                            var o = t.Event(h.SHOW);
                            if (t(this._element).trigger(o), !o.isDefaultPrevented()) {
                                e && (i._jQueryInterface.call(t(e).not(this._selector), "hide"), s || t(e).data(n, null));
                                var a = this._getDimension();
                                t(this._element).removeClass(u).addClass(f), this._element.style[a] = 0, this._triggerArray.length > 0 && t(this._triggerArray).removeClass(d).attr("aria-expanded", !0), this.setTransitioning(!0);
                                var l = function() {
                                    t(r._element).removeClass(f).addClass(u).addClass(c), r._element.style[a] = "", r.setTransitioning(!1), t(r._element).trigger(h.SHOWN)
                                };
                                if (P.supportsTransitionEnd()) {
                                    var _ = "scroll" + (a[0].toUpperCase() + a.slice(1));
                                    t(this._element).one(P.TRANSITION_END, l).emulateTransitionEnd(600), this._element.style[a] = this._element[_] + "px"
                                } else l()
                            }
                        }
                    }, o.hide = function() {
                        var e = this;
                        if (!this._isTransitioning && t(this._element).hasClass(c)) {
                            var n = t.Event(h.HIDE);
                            if (t(this._element).trigger(n), !n.isDefaultPrevented()) {
                                var i = this._getDimension();
                                if (this._element.style[i] = this._element.getBoundingClientRect()[i] + "px", P.reflow(this._element), t(this._element).addClass(f).removeClass(u).removeClass(c), this._triggerArray.length > 0)
                                    for (var s = 0; s < this._triggerArray.length; s++) {
                                        var r = this._triggerArray[s],
                                            o = P.getSelectorFromElement(r);
                                        if (null !== o) t(o).hasClass(c) || t(r).addClass(d).attr("aria-expanded", !1)
                                    }
                                this.setTransitioning(!0);
                                var a = function() {
                                    e.setTransitioning(!1), t(e._element).removeClass(f).addClass(u).trigger(h.HIDDEN)
                                };
                                this._element.style[i] = "", P.supportsTransitionEnd() ? t(this._element).one(P.TRANSITION_END, a).emulateTransitionEnd(600) : a()
                            }
                        }
                    }, o.setTransitioning = function(t) {
                        this._isTransitioning = t
                    }, o.dispose = function() {
                        t.removeData(this._element, n), this._config = null, this._parent = null, this._element = null, this._triggerArray = null, this._isTransitioning = null
                    }, o._getConfig = function(t) {
                        return (t = r({}, a, t)).toggle = Boolean(t.toggle), P.typeCheckConfig(e, t, l), t
                    }, o._getDimension = function() {
                        return t(this._element).hasClass(_) ? _ : g
                    }, o._getParent = function() {
                        var e = this,
                            n = null;
                        P.isElement(this._config.parent) ? (n = this._config.parent, "undefined" != typeof this._config.parent.jquery && (n = this._config.parent[0])) : n = t(this._config.parent)[0];
                        var s = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]';
                        return t(n).find(s).each(function(t, n) {
                            e._addAriaAndCollapsedClass(i._getTargetFromElement(n), [n])
                        }), n
                    }, o._addAriaAndCollapsedClass = function(e, n) {
                        if (e) {
                            var i = t(e).hasClass(c);
                            n.length > 0 && t(n).toggleClass(d, !i).attr("aria-expanded", i)
                        }
                    }, i._getTargetFromElement = function(e) {
                        var n = P.getSelectorFromElement(e);
                        return n ? t(n)[0] : null
                    }, i._jQueryInterface = function(e) {
                        return this.each(function() {
                            var s = t(this),
                                o = s.data(n),
                                l = r({}, a, s.data(), "object" == typeof e && e);
                            if (!o && l.toggle && /show|hide/.test(e) && (l.toggle = !1), o || (o = new i(this, l), s.data(n, o)), "string" == typeof e) {
                                if ("undefined" == typeof o[e]) throw new TypeError('No method named "' + e + '"');
                                o[e]()
                            }
                        })
                    }, s(i, null, [{
                        key: "VERSION",
                        get: function() {
                            return "4.0.0"
                        }
                    }, {
                        key: "Default",
                        get: function() {
                            return a
                        }
                    }]), i
                }();
            return t(document).on(h.CLICK_DATA_API, p.DATA_TOGGLE, function(e) {
                "A" === e.currentTarget.tagName && e.preventDefault();
                var i = t(this),
                    s = P.getSelectorFromElement(this);
                t(s).each(function() {
                    var e = t(this),
                        s = e.data(n) ? "toggle" : i.data();
                    m._jQueryInterface.call(e, s)
                })
            }), t.fn[e] = m._jQueryInterface, t.fn[e].Constructor = m, t.fn[e].noConflict = function() {
                return t.fn[e] = o, m._jQueryInterface
            }, m
        }(e),
        W = function(t) {
            var e = "dropdown",
                i = "bs.dropdown",
                o = "." + i,
                a = ".data-api",
                l = t.fn[e],
                h = new RegExp("38|40|27"),
                c = {
                    HIDE: "hide" + o,
                    HIDDEN: "hidden" + o,
                    SHOW: "show" + o,
                    SHOWN: "shown" + o,
                    CLICK: "click" + o,
                    CLICK_DATA_API: "click" + o + a,
                    KEYDOWN_DATA_API: "keydown" + o + a,
                    KEYUP_DATA_API: "keyup" + o + a
                },
                u = "disabled",
                f = "show",
                d = "dropup",
                _ = "dropright",
                g = "dropleft",
                p = "dropdown-menu-right",
                m = "dropdown-menu-left",
                v = "position-static",
                E = '[data-toggle="dropdown"]',
                T = ".dropdown form",
                y = ".dropdown-menu",
                C = ".navbar-nav",
                I = ".dropdown-menu .dropdown-item:not(.disabled)",
                A = "top-start",
                b = "top-end",
                D = "bottom-start",
                S = "bottom-end",
                w = "right-start",
                N = "left-start",
                O = {
                    offset: 0,
                    flip: !0,
                    boundary: "scrollParent"
                },
                k = {
                    offset: "(number|string|function)",
                    flip: "boolean",
                    boundary: "(string|element)"
                },
                L = function() {
                    function a(t, e) {
                        this._element = t, this._popper = null, this._config = this._getConfig(e), this._menu = this._getMenuElement(), this._inNavbar = this._detectNavbar(), this._addEventListeners()
                    }
                    var l = a.prototype;
                    return l.toggle = function() {
                        if (!this._element.disabled && !t(this._element).hasClass(u)) {
                            var e = a._getParentFromElement(this._element),
                                i = t(this._menu).hasClass(f);
                            if (a._clearMenus(), !i) {
                                var s = {
                                        relatedTarget: this._element
                                    },
                                    r = t.Event(c.SHOW, s);
                                if (t(e).trigger(r), !r.isDefaultPrevented()) {
                                    if (!this._inNavbar) {
                                        if ("undefined" == typeof n) throw new TypeError("Bootstrap dropdown require Popper.js (https://popper.js.org)");
                                        var o = this._element;
                                        t(e).hasClass(d) && (t(this._menu).hasClass(m) || t(this._menu).hasClass(p)) && (o = e), "scrollParent" !== this._config.boundary && t(e).addClass(v), this._popper = new n(o, this._menu, this._getPopperConfig())
                                    }
                                    "ontouchstart" in document.documentElement && 0 === t(e).closest(C).length && t("body").children().on("mouseover", null, t.noop), this._element.focus(), this._element.setAttribute("aria-expanded", !0), t(this._menu).toggleClass(f), t(e).toggleClass(f).trigger(t.Event(c.SHOWN, s))
                                }
                            }
                        }
                    }, l.dispose = function() {
                        t.removeData(this._element, i), t(this._element).off(o), this._element = null, this._menu = null, null !== this._popper && (this._popper.destroy(), this._popper = null)
                    }, l.update = function() {
                        this._inNavbar = this._detectNavbar(), null !== this._popper && this._popper.scheduleUpdate()
                    }, l._addEventListeners = function() {
                        var e = this;
                        t(this._element).on(c.CLICK, function(t) {
                            t.preventDefault(), t.stopPropagation(), e.toggle()
                        })
                    }, l._getConfig = function(n) {
                        return n = r({}, this.constructor.Default, t(this._element).data(), n), P.typeCheckConfig(e, n, this.constructor.DefaultType), n
                    }, l._getMenuElement = function() {
                        if (!this._menu) {
                            var e = a._getParentFromElement(this._element);
                            this._menu = t(e).find(y)[0]
                        }
                        return this._menu
                    }, l._getPlacement = function() {
                        var e = t(this._element).parent(),
                            n = D;
                        return e.hasClass(d) ? (n = A, t(this._menu).hasClass(p) && (n = b)) : e.hasClass(_) ? n = w : e.hasClass(g) ? n = N : t(this._menu).hasClass(p) && (n = S), n
                    }, l._detectNavbar = function() {
                        return t(this._element).closest(".navbar").length > 0
                    }, l._getPopperConfig = function() {
                        var t = this,
                            e = {};
                        return "function" == typeof this._config.offset ? e.fn = function(e) {
                            return e.offsets = r({}, e.offsets, t._config.offset(e.offsets) || {}), e
                        } : e.offset = this._config.offset, {
                            placement: this._getPlacement(),
                            modifiers: {
                                offset: e,
                                flip: {
                                    enabled: this._config.flip
                                },
                                preventOverflow: {
                                    boundariesElement: this._config.boundary
                                }
                            }
                        }
                    }, a._jQueryInterface = function(e) {
                        return this.each(function() {
                            var n = t(this).data(i);
                            if (n || (n = new a(this, "object" == typeof e ? e : null), t(this).data(i, n)), "string" == typeof e) {
                                if ("undefined" == typeof n[e]) throw new TypeError('No method named "' + e + '"');
                                n[e]()
                            }
                        })
                    }, a._clearMenus = function(e) {
                        if (!e || 3 !== e.which && ("keyup" !== e.type || 9 === e.which))
                            for (var n = t.makeArray(t(E)), s = 0; s < n.length; s++) {
                                var r = a._getParentFromElement(n[s]),
                                    o = t(n[s]).data(i),
                                    l = {
                                        relatedTarget: n[s]
                                    };
                                if (o) {
                                    var h = o._menu;
                                    if (t(r).hasClass(f) && !(e && ("click" === e.type && /input|textarea/i.test(e.target.tagName) || "keyup" === e.type && 9 === e.which) && t.contains(r, e.target))) {
                                        var u = t.Event(c.HIDE, l);
                                        t(r).trigger(u), u.isDefaultPrevented() || ("ontouchstart" in document.documentElement && t("body").children().off("mouseover", null, t.noop), n[s].setAttribute("aria-expanded", "false"), t(h).removeClass(f), t(r).removeClass(f).trigger(t.Event(c.HIDDEN, l)))
                                    }
                                }
                            }
                    }, a._getParentFromElement = function(e) {
                        var n, i = P.getSelectorFromElement(e);
                        return i && (n = t(i)[0]), n || e.parentNode
                    }, a._dataApiKeydownHandler = function(e) {
                        if ((/input|textarea/i.test(e.target.tagName) ? !(32 === e.which || 27 !== e.which && (40 !== e.which && 38 !== e.which || t(e.target).closest(y).length)) : h.test(e.which)) && (e.preventDefault(), e.stopPropagation(), !this.disabled && !t(this).hasClass(u))) {
                            var n = a._getParentFromElement(this),
                                i = t(n).hasClass(f);
                            if ((i || 27 === e.which && 32 === e.which) && (!i || 27 !== e.which && 32 !== e.which)) {
                                var s = t(n).find(I).get();
                                if (0 !== s.length) {
                                    var r = s.indexOf(e.target);
                                    38 === e.which && r > 0 && r--, 40 === e.which && r < s.length - 1 && r++, r < 0 && (r = 0), s[r].focus()
                                }
                            } else {
                                if (27 === e.which) {
                                    var o = t(n).find(E)[0];
                                    t(o).trigger("focus")
                                }
                                t(this).trigger("click")
                            }
                        }
                    }, s(a, null, [{
                        key: "VERSION",
                        get: function() {
                            return "4.0.0"
                        }
                    }, {
                        key: "Default",
                        get: function() {
                            return O
                        }
                    }, {
                        key: "DefaultType",
                        get: function() {
                            return k
                        }
                    }]), a
                }();
            return t(document).on(c.KEYDOWN_DATA_API, E, L._dataApiKeydownHandler).on(c.KEYDOWN_DATA_API, y, L._dataApiKeydownHandler).on(c.CLICK_DATA_API + " " + c.KEYUP_DATA_API, L._clearMenus).on(c.CLICK_DATA_API, E, function(e) {
                e.preventDefault(), e.stopPropagation(), L._jQueryInterface.call(t(this), "toggle")
            }).on(c.CLICK_DATA_API, T, function(t) {
                t.stopPropagation()
            }), t.fn[e] = L._jQueryInterface, t.fn[e].Constructor = L, t.fn[e].noConflict = function() {
                return t.fn[e] = l, L._jQueryInterface
            }, L
        }(e),
        M = function(t) {
            var e = "modal",
                n = "bs.modal",
                i = "." + n,
                o = t.fn.modal,
                a = {
                    backdrop: !0,
                    keyboard: !0,
                    focus: !0,
                    show: !0
                },
                l = {
                    backdrop: "(boolean|string)",
                    keyboard: "boolean",
                    focus: "boolean",
                    show: "boolean"
                },
                h = {
                    HIDE: "hide" + i,
                    HIDDEN: "hidden" + i,
                    SHOW: "show" + i,
                    SHOWN: "shown" + i,
                    FOCUSIN: "focusin" + i,
                    RESIZE: "resize" + i,
                    CLICK_DISMISS: "click.dismiss" + i,
                    KEYDOWN_DISMISS: "keydown.dismiss" + i,
                    MOUSEUP_DISMISS: "mouseup.dismiss" + i,
                    MOUSEDOWN_DISMISS: "mousedown.dismiss" + i,
                    CLICK_DATA_API: "click" + i + ".data-api"
                },
                c = "modal-scrollbar-measure",
                u = "modal-backdrop",
                f = "modal-open",
                d = "fade",
                _ = "show",
                g = {
                    DIALOG: ".modal-dialog",
                    DATA_TOGGLE: '[data-toggle="modal"]',
                    DATA_DISMISS: '[data-dismiss="modal"]',
                    FIXED_CONTENT: ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
                    STICKY_CONTENT: ".sticky-top",
                    NAVBAR_TOGGLER: ".navbar-toggler"
                },
                p = function() {
                    function o(e, n) {
                        this._config = this._getConfig(n), this._element = e, this._dialog = t(e).find(g.DIALOG)[0], this._backdrop = null, this._isShown = !1, this._isBodyOverflowing = !1, this._ignoreBackdropClick = !1, this._originalBodyPadding = 0, this._scrollbarWidth = 0
                    }
                    var p = o.prototype;
                    return p.toggle = function(t) {
                        return this._isShown ? this.hide() : this.show(t)
                    }, p.show = function(e) {
                        var n = this;
                        if (!this._isTransitioning && !this._isShown) {
                            P.supportsTransitionEnd() && t(this._element).hasClass(d) && (this._isTransitioning = !0);
                            var i = t.Event(h.SHOW, {
                                relatedTarget: e
                            });
                            t(this._element).trigger(i), this._isShown || i.isDefaultPrevented() || (this._isShown = !0, this._checkScrollbar(), this._setScrollbar(), this._adjustDialog(), t(document.body).addClass(f), this._setEscapeEvent(), this._setResizeEvent(), t(this._element).on(h.CLICK_DISMISS, g.DATA_DISMISS, function(t) {
                                return n.hide(t)
                            }), t(this._dialog).on(h.MOUSEDOWN_DISMISS, function() {
                                t(n._element).one(h.MOUSEUP_DISMISS, function(e) {
                                    t(e.target).is(n._element) && (n._ignoreBackdropClick = !0)
                                })
                            }), this._showBackdrop(function() {
                                return n._showElement(e)
                            }))
                        }
                    }, p.hide = function(e) {
                        var n = this;
                        if (e && e.preventDefault(), !this._isTransitioning && this._isShown) {
                            var i = t.Event(h.HIDE);
                            if (t(this._element).trigger(i), this._isShown && !i.isDefaultPrevented()) {
                                this._isShown = !1;
                                var s = P.supportsTransitionEnd() && t(this._element).hasClass(d);
                                s && (this._isTransitioning = !0), this._setEscapeEvent(), this._setResizeEvent(), t(document).off(h.FOCUSIN), t(this._element).removeClass(_), t(this._element).off(h.CLICK_DISMISS), t(this._dialog).off(h.MOUSEDOWN_DISMISS), s ? t(this._element).one(P.TRANSITION_END, function(t) {
                                    return n._hideModal(t)
                                }).emulateTransitionEnd(300) : this._hideModal()
                            }
                        }
                    }, p.dispose = function() {
                        t.removeData(this._element, n), t(window, document, this._element, this._backdrop).off(i), this._config = null, this._element = null, this._dialog = null, this._backdrop = null, this._isShown = null, this._isBodyOverflowing = null, this._ignoreBackdropClick = null, this._scrollbarWidth = null
                    }, p.handleUpdate = function() {
                        this._adjustDialog()
                    }, p._getConfig = function(t) {
                        return t = r({}, a, t), P.typeCheckConfig(e, t, l), t
                    }, p._showElement = function(e) {
                        var n = this,
                            i = P.supportsTransitionEnd() && t(this._element).hasClass(d);
                        this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.appendChild(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.scrollTop = 0, i && P.reflow(this._element), t(this._element).addClass(_), this._config.focus && this._enforceFocus();
                        var s = t.Event(h.SHOWN, {
                                relatedTarget: e
                            }),
                            r = function() {
                                n._config.focus && n._element.focus(), n._isTransitioning = !1, t(n._element).trigger(s)
                            };
                        i ? t(this._dialog).one(P.TRANSITION_END, r).emulateTransitionEnd(300) : r()
                    }, p._enforceFocus = function() {
                        var e = this;
                        t(document).off(h.FOCUSIN).on(h.FOCUSIN, function(n) {
                            document !== n.target && e._element !== n.target && 0 === t(e._element).has(n.target).length && e._element.focus()
                        })
                    }, p._setEscapeEvent = function() {
                        var e = this;
                        this._isShown && this._config.keyboard ? t(this._element).on(h.KEYDOWN_DISMISS, function(t) {
                            27 === t.which && (t.preventDefault(), e.hide())
                        }) : this._isShown || t(this._element).off(h.KEYDOWN_DISMISS)
                    }, p._setResizeEvent = function() {
                        var e = this;
                        this._isShown ? t(window).on(h.RESIZE, function(t) {
                            return e.handleUpdate(t)
                        }) : t(window).off(h.RESIZE)
                    }, p._hideModal = function() {
                        var e = this;
                        this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._isTransitioning = !1, this._showBackdrop(function() {
                            t(document.body).removeClass(f), e._resetAdjustments(), e._resetScrollbar(), t(e._element).trigger(h.HIDDEN)
                        })
                    }, p._removeBackdrop = function() {
                        this._backdrop && (t(this._backdrop).remove(), this._backdrop = null)
                    }, p._showBackdrop = function(e) {
                        var n = this,
                            i = t(this._element).hasClass(d) ? d : "";
                        if (this._isShown && this._config.backdrop) {
                            var s = P.supportsTransitionEnd() && i;
                            if (this._backdrop = document.createElement("div"), this._backdrop.className = u, i && t(this._backdrop).addClass(i), t(this._backdrop).appendTo(document.body), t(this._element).on(h.CLICK_DISMISS, function(t) {
                                    n._ignoreBackdropClick ? n._ignoreBackdropClick = !1 : t.target === t.currentTarget && ("static" === n._config.backdrop ? n._element.focus() : n.hide())
                                }), s && P.reflow(this._backdrop), t(this._backdrop).addClass(_), !e) return;
                            if (!s) return void e();
                            t(this._backdrop).one(P.TRANSITION_END, e).emulateTransitionEnd(150)
                        } else if (!this._isShown && this._backdrop) {
                            t(this._backdrop).removeClass(_);
                            var r = function() {
                                n._removeBackdrop(), e && e()
                            };
                            P.supportsTransitionEnd() && t(this._element).hasClass(d) ? t(this._backdrop).one(P.TRANSITION_END, r).emulateTransitionEnd(150) : r()
                        } else e && e()
                    }, p._adjustDialog = function() {
                        var t = this._element.scrollHeight > document.documentElement.clientHeight;
                        !this._isBodyOverflowing && t && (this._element.style.paddingLeft = this._scrollbarWidth + "px"), this._isBodyOverflowing && !t && (this._element.style.paddingRight = this._scrollbarWidth + "px")
                    }, p._resetAdjustments = function() {
                        this._element.style.paddingLeft = "", this._element.style.paddingRight = ""
                    }, p._checkScrollbar = function() {
                        var t = document.body.getBoundingClientRect();
                        this._isBodyOverflowing = t.left + t.right < window.innerWidth, this._scrollbarWidth = this._getScrollbarWidth()
                    }, p._setScrollbar = function() {
                        var e = this;
                        if (this._isBodyOverflowing) {
                            t(g.FIXED_CONTENT).each(function(n, i) {
                                var s = t(i)[0].style.paddingRight,
                                    r = t(i).css("padding-right");
                                t(i).data("padding-right", s).css("padding-right", parseFloat(r) + e._scrollbarWidth + "px")
                            }), t(g.STICKY_CONTENT).each(function(n, i) {
                                var s = t(i)[0].style.marginRight,
                                    r = t(i).css("margin-right");
                                t(i).data("margin-right", s).css("margin-right", parseFloat(r) - e._scrollbarWidth + "px")
                            }), t(g.NAVBAR_TOGGLER).each(function(n, i) {
                                var s = t(i)[0].style.marginRight,
                                    r = t(i).css("margin-right");
                                t(i).data("margin-right", s).css("margin-right", parseFloat(r) + e._scrollbarWidth + "px")
                            });
                            var n = document.body.style.paddingRight,
                                i = t("body").css("padding-right");
                            t("body").data("padding-right", n).css("padding-right", parseFloat(i) + this._scrollbarWidth + "px")
                        }
                    }, p._resetScrollbar = function() {
                        t(g.FIXED_CONTENT).each(function(e, n) {
                            var i = t(n).data("padding-right");
                            "undefined" != typeof i && t(n).css("padding-right", i).removeData("padding-right")
                        }), t(g.STICKY_CONTENT + ", " + g.NAVBAR_TOGGLER).each(function(e, n) {
                            var i = t(n).data("margin-right");
                            "undefined" != typeof i && t(n).css("margin-right", i).removeData("margin-right")
                        });
                        var e = t("body").data("padding-right");
                        "undefined" != typeof e && t("body").css("padding-right", e).removeData("padding-right")
                    }, p._getScrollbarWidth = function() {
                        var t = document.createElement("div");
                        t.className = c, document.body.appendChild(t);
                        var e = t.getBoundingClientRect().width - t.clientWidth;
                        return document.body.removeChild(t), e
                    }, o._jQueryInterface = function(e, i) {
                        return this.each(function() {
                            var s = t(this).data(n),
                                a = r({}, o.Default, t(this).data(), "object" == typeof e && e);
                            if (s || (s = new o(this, a), t(this).data(n, s)), "string" == typeof e) {
                                if ("undefined" == typeof s[e]) throw new TypeError('No method named "' + e + '"');
                                s[e](i)
                            } else a.show && s.show(i)
                        })
                    }, s(o, null, [{
                        key: "VERSION",
                        get: function() {
                            return "4.0.0"
                        }
                    }, {
                        key: "Default",
                        get: function() {
                            return a
                        }
                    }]), o
                }();
            return t(document).on(h.CLICK_DATA_API, g.DATA_TOGGLE, function(e) {
                var i, s = this,
                    o = P.getSelectorFromElement(this);
                o && (i = t(o)[0]);
                var a = t(i).data(n) ? "toggle" : r({}, t(i).data(), t(this).data());
                "A" !== this.tagName && "AREA" !== this.tagName || e.preventDefault();
                var l = t(i).one(h.SHOW, function(e) {
                    e.isDefaultPrevented() || l.one(h.HIDDEN, function() {
                        t(s).is(":visible") && s.focus()
                    })
                });
                p._jQueryInterface.call(t(i), a, this)
            }), t.fn.modal = p._jQueryInterface, t.fn.modal.Constructor = p, t.fn.modal.noConflict = function() {
                return t.fn.modal = o, p._jQueryInterface
            }, p
        }(e),
        U = function(t) {
            var e = "tooltip",
                i = "bs.tooltip",
                o = "." + i,
                a = t.fn[e],
                l = new RegExp("(^|\\s)bs-tooltip\\S+", "g"),
                h = {
                    animation: "boolean",
                    template: "string",
                    title: "(string|element|function)",
                    trigger: "string",
                    delay: "(number|object)",
                    html: "boolean",
                    selector: "(string|boolean)",
                    placement: "(string|function)",
                    offset: "(number|string)",
                    container: "(string|element|boolean)",
                    fallbackPlacement: "(string|array)",
                    boundary: "(string|element)"
                },
                c = {
                    AUTO: "auto",
                    TOP: "top",
                    RIGHT: "right",
                    BOTTOM: "bottom",
                    LEFT: "left"
                },
                u = {
                    animation: !0,
                    template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
                    trigger: "hover focus",
                    title: "",
                    delay: 0,
                    html: !1,
                    selector: !1,
                    placement: "top",
                    offset: 0,
                    container: !1,
                    fallbackPlacement: "flip",
                    boundary: "scrollParent"
                },
                f = "show",
                d = "out",
                _ = {
                    HIDE: "hide" + o,
                    HIDDEN: "hidden" + o,
                    SHOW: "show" + o,
                    SHOWN: "shown" + o,
                    INSERTED: "inserted" + o,
                    CLICK: "click" + o,
                    FOCUSIN: "focusin" + o,
                    FOCUSOUT: "focusout" + o,
                    MOUSEENTER: "mouseenter" + o,
                    MOUSELEAVE: "mouseleave" + o
                },
                g = "fade",
                p = "show",
                m = ".tooltip-inner",
                v = ".arrow",
                E = "hover",
                T = "focus",
                y = "click",
                C = "manual",
                I = function() {
                    function a(t, e) {
                        if ("undefined" == typeof n) throw new TypeError("Bootstrap tooltips require Popper.js (https://popper.js.org)");
                        this._isEnabled = !0, this._timeout = 0, this._hoverState = "", this._activeTrigger = {}, this._popper = null, this.element = t, this.config = this._getConfig(e), this.tip = null, this._setListeners()
                    }
                    var I = a.prototype;
                    return I.enable = function() {
                        this._isEnabled = !0
                    }, I.disable = function() {
                        this._isEnabled = !1
                    }, I.toggleEnabled = function() {
                        this._isEnabled = !this._isEnabled
                    }, I.toggle = function(e) {
                        if (this._isEnabled)
                            if (e) {
                                var n = this.constructor.DATA_KEY,
                                    i = t(e.currentTarget).data(n);
                                i || (i = new this.constructor(e.currentTarget, this._getDelegateConfig()), t(e.currentTarget).data(n, i)), i._activeTrigger.click = !i._activeTrigger.click, i._isWithActiveTrigger() ? i._enter(null, i) : i._leave(null, i)
                            } else {
                                if (t(this.getTipElement()).hasClass(p)) return void this._leave(null, this);
                                this._enter(null, this)
                            }
                    }, I.dispose = function() {
                        clearTimeout(this._timeout), t.removeData(this.element, this.constructor.DATA_KEY), t(this.element).off(this.constructor.EVENT_KEY), t(this.element).closest(".modal").off("hide.bs.modal"), this.tip && t(this.tip).remove(), this._isEnabled = null, this._timeout = null, this._hoverState = null, this._activeTrigger = null, null !== this._popper && this._popper.destroy(), this._popper = null, this.element = null, this.config = null, this.tip = null
                    }, I.show = function() {
                        var e = this;
                        if ("none" === t(this.element).css("display")) throw new Error("Please use show on visible elements");
                        var i = t.Event(this.constructor.Event.SHOW);
                        if (this.isWithContent() && this._isEnabled) {
                            t(this.element).trigger(i);
                            var s = t.contains(this.element.ownerDocument.documentElement, this.element);
                            if (i.isDefaultPrevented() || !s) return;
                            var r = this.getTipElement(),
                                o = P.getUID(this.constructor.NAME);
                            r.setAttribute("id", o), this.element.setAttribute("aria-describedby", o), this.setContent(), this.config.animation && t(r).addClass(g);
                            var l = "function" == typeof this.config.placement ? this.config.placement.call(this, r, this.element) : this.config.placement,
                                h = this._getAttachment(l);
                            this.addAttachmentClass(h);
                            var c = !1 === this.config.container ? document.body : t(this.config.container);
                            t(r).data(this.constructor.DATA_KEY, this), t.contains(this.element.ownerDocument.documentElement, this.tip) || t(r).appendTo(c), t(this.element).trigger(this.constructor.Event.INSERTED), this._popper = new n(this.element, r, {
                                placement: h,
                                modifiers: {
                                    offset: {
                                        offset: this.config.offset
                                    },
                                    flip: {
                                        behavior: this.config.fallbackPlacement
                                    },
                                    arrow: {
                                        element: v
                                    },
                                    preventOverflow: {
                                        boundariesElement: this.config.boundary
                                    }
                                },
                                onCreate: function(t) {
                                    t.originalPlacement !== t.placement && e._handlePopperPlacementChange(t)
                                },
                                onUpdate: function(t) {
                                    e._handlePopperPlacementChange(t)
                                }
                            }), t(r).addClass(p), "ontouchstart" in document.documentElement && t("body").children().on("mouseover", null, t.noop);
                            var u = function() {
                                e.config.animation && e._fixTransition();
                                var n = e._hoverState;
                                e._hoverState = null, t(e.element).trigger(e.constructor.Event.SHOWN), n === d && e._leave(null, e)
                            };
                            P.supportsTransitionEnd() && t(this.tip).hasClass(g) ? t(this.tip).one(P.TRANSITION_END, u).emulateTransitionEnd(a._TRANSITION_DURATION) : u()
                        }
                    }, I.hide = function(e) {
                        var n = this,
                            i = this.getTipElement(),
                            s = t.Event(this.constructor.Event.HIDE),
                            r = function() {
                                n._hoverState !== f && i.parentNode && i.parentNode.removeChild(i), n._cleanTipClass(), n.element.removeAttribute("aria-describedby"), t(n.element).trigger(n.constructor.Event.HIDDEN), null !== n._popper && n._popper.destroy(), e && e()
                            };
                        t(this.element).trigger(s), s.isDefaultPrevented() || (t(i).removeClass(p), "ontouchstart" in document.documentElement && t("body").children().off("mouseover", null, t.noop), this._activeTrigger[y] = !1, this._activeTrigger[T] = !1, this._activeTrigger[E] = !1, P.supportsTransitionEnd() && t(this.tip).hasClass(g) ? t(i).one(P.TRANSITION_END, r).emulateTransitionEnd(150) : r(), this._hoverState = "")
                    }, I.update = function() {
                        null !== this._popper && this._popper.scheduleUpdate()
                    }, I.isWithContent = function() {
                        return Boolean(this.getTitle())
                    }, I.addAttachmentClass = function(e) {
                        t(this.getTipElement()).addClass("bs-tooltip-" + e)
                    }, I.getTipElement = function() {
                        return this.tip = this.tip || t(this.config.template)[0], this.tip
                    }, I.setContent = function() {
                        var e = t(this.getTipElement());
                        this.setElementContent(e.find(m), this.getTitle()), e.removeClass(g + " " + p)
                    }, I.setElementContent = function(e, n) {
                        var i = this.config.html;
                        "object" == typeof n && (n.nodeType || n.jquery) ? i ? t(n).parent().is(e) || e.empty().append(n) : e.text(t(n).text()) : e[i ? "html" : "text"](n)
                    }, I.getTitle = function() {
                        var t = this.element.getAttribute("data-original-title");
                        return t || (t = "function" == typeof this.config.title ? this.config.title.call(this.element) : this.config.title), t
                    }, I._getAttachment = function(t) {
                        return c[t.toUpperCase()]
                    }, I._setListeners = function() {
                        var e = this;
                        this.config.trigger.split(" ").forEach(function(n) {
                            if ("click" === n) t(e.element).on(e.constructor.Event.CLICK, e.config.selector, function(t) {
                                return e.toggle(t)
                            });
                            else if (n !== C) {
                                var i = n === E ? e.constructor.Event.MOUSEENTER : e.constructor.Event.FOCUSIN,
                                    s = n === E ? e.constructor.Event.MOUSELEAVE : e.constructor.Event.FOCUSOUT;
                                t(e.element).on(i, e.config.selector, function(t) {
                                    return e._enter(t)
                                }).on(s, e.config.selector, function(t) {
                                    return e._leave(t)
                                })
                            }
                            t(e.element).closest(".modal").on("hide.bs.modal", function() {
                                return e.hide()
                            })
                        }), this.config.selector ? this.config = r({}, this.config, {
                            trigger: "manual",
                            selector: ""
                        }) : this._fixTitle()
                    }, I._fixTitle = function() {
                        var t = typeof this.element.getAttribute("data-original-title");
                        (this.element.getAttribute("title") || "string" !== t) && (this.element.setAttribute("data-original-title", this.element.getAttribute("title") || ""), this.element.setAttribute("title", ""))
                    }, I._enter = function(e, n) {
                        var i = this.constructor.DATA_KEY;
                        (n = n || t(e.currentTarget).data(i)) || (n = new this.constructor(e.currentTarget, this._getDelegateConfig()), t(e.currentTarget).data(i, n)), e && (n._activeTrigger["focusin" === e.type ? T : E] = !0), t(n.getTipElement()).hasClass(p) || n._hoverState === f ? n._hoverState = f : (clearTimeout(n._timeout), n._hoverState = f, n.config.delay && n.config.delay.show ? n._timeout = setTimeout(function() {
                            n._hoverState === f && n.show()
                        }, n.config.delay.show) : n.show())
                    }, I._leave = function(e, n) {
                        var i = this.constructor.DATA_KEY;
                        (n = n || t(e.currentTarget).data(i)) || (n = new this.constructor(e.currentTarget, this._getDelegateConfig()), t(e.currentTarget).data(i, n)), e && (n._activeTrigger["focusout" === e.type ? T : E] = !1), n._isWithActiveTrigger() || (clearTimeout(n._timeout), n._hoverState = d, n.config.delay && n.config.delay.hide ? n._timeout = setTimeout(function() {
                            n._hoverState === d && n.hide()
                        }, n.config.delay.hide) : n.hide())
                    }, I._isWithActiveTrigger = function() {
                        for (var t in this._activeTrigger)
                            if (this._activeTrigger[t]) return !0;
                        return !1
                    }, I._getConfig = function(n) {
                        return "number" == typeof(n = r({}, this.constructor.Default, t(this.element).data(), n)).delay && (n.delay = {
                            show: n.delay,
                            hide: n.delay
                        }), "number" == typeof n.title && (n.title = n.title.toString()), "number" == typeof n.content && (n.content = n.content.toString()), P.typeCheckConfig(e, n, this.constructor.DefaultType), n
                    }, I._getDelegateConfig = function() {
                        var t = {};
                        if (this.config)
                            for (var e in this.config) this.constructor.Default[e] !== this.config[e] && (t[e] = this.config[e]);
                        return t
                    }, I._cleanTipClass = function() {
                        var e = t(this.getTipElement()),
                            n = e.attr("class").match(l);
                        null !== n && n.length > 0 && e.removeClass(n.join(""))
                    }, I._handlePopperPlacementChange = function(t) {
                        this._cleanTipClass(), this.addAttachmentClass(this._getAttachment(t.placement))
                    }, I._fixTransition = function() {
                        var e = this.getTipElement(),
                            n = this.config.animation;
                        null === e.getAttribute("x-placement") && (t(e).removeClass(g), this.config.animation = !1, this.hide(), this.show(), this.config.animation = n)
                    }, a._jQueryInterface = function(e) {
                        return this.each(function() {
                            var n = t(this).data(i),
                                s = "object" == typeof e && e;
                            if ((n || !/dispose|hide/.test(e)) && (n || (n = new a(this, s), t(this).data(i, n)), "string" == typeof e)) {
                                if ("undefined" == typeof n[e]) throw new TypeError('No method named "' + e + '"');
                                n[e]()
                            }
                        })
                    }, s(a, null, [{
                        key: "VERSION",
                        get: function() {
                            return "4.0.0"
                        }
                    }, {
                        key: "Default",
                        get: function() {
                            return u
                        }
                    }, {
                        key: "NAME",
                        get: function() {
                            return e
                        }
                    }, {
                        key: "DATA_KEY",
                        get: function() {
                            return i
                        }
                    }, {
                        key: "Event",
                        get: function() {
                            return _
                        }
                    }, {
                        key: "EVENT_KEY",
                        get: function() {
                            return o
                        }
                    }, {
                        key: "DefaultType",
                        get: function() {
                            return h
                        }
                    }]), a
                }();
            return t.fn[e] = I._jQueryInterface, t.fn[e].Constructor = I, t.fn[e].noConflict = function() {
                return t.fn[e] = a, I._jQueryInterface
            }, I
        }(e),
        x = function(t) {
            var e = "popover",
                n = "bs.popover",
                i = "." + n,
                o = t.fn[e],
                a = new RegExp("(^|\\s)bs-popover\\S+", "g"),
                l = r({}, U.Default, {
                    placement: "right",
                    trigger: "click",
                    content: "",
                    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
                }),
                h = r({}, U.DefaultType, {
                    content: "(string|element|function)"
                }),
                c = "fade",
                u = "show",
                f = ".popover-header",
                d = ".popover-body",
                _ = {
                    HIDE: "hide" + i,
                    HIDDEN: "hidden" + i,
                    SHOW: "show" + i,
                    SHOWN: "shown" + i,
                    INSERTED: "inserted" + i,
                    CLICK: "click" + i,
                    FOCUSIN: "focusin" + i,
                    FOCUSOUT: "focusout" + i,
                    MOUSEENTER: "mouseenter" + i,
                    MOUSELEAVE: "mouseleave" + i
                },
                g = function(r) {
                    var o, g;

                    function p() {
                        return r.apply(this, arguments) || this
                    }
                    g = r, (o = p).prototype = Object.create(g.prototype), o.prototype.constructor = o, o.__proto__ = g;
                    var m = p.prototype;
                    return m.isWithContent = function() {
                        return this.getTitle() || this._getContent()
                    }, m.addAttachmentClass = function(e) {
                        t(this.getTipElement()).addClass("bs-popover-" + e)
                    }, m.getTipElement = function() {
                        return this.tip = this.tip || t(this.config.template)[0], this.tip
                    }, m.setContent = function() {
                        var e = t(this.getTipElement());
                        this.setElementContent(e.find(f), this.getTitle());
                        var n = this._getContent();
                        "function" == typeof n && (n = n.call(this.element)), this.setElementContent(e.find(d), n), e.removeClass(c + " " + u)
                    }, m._getContent = function() {
                        return this.element.getAttribute("data-content") || this.config.content
                    }, m._cleanTipClass = function() {
                        var e = t(this.getTipElement()),
                            n = e.attr("class").match(a);
                        null !== n && n.length > 0 && e.removeClass(n.join(""))
                    }, p._jQueryInterface = function(e) {
                        return this.each(function() {
                            var i = t(this).data(n),
                                s = "object" == typeof e ? e : null;
                            if ((i || !/destroy|hide/.test(e)) && (i || (i = new p(this, s), t(this).data(n, i)), "string" == typeof e)) {
                                if ("undefined" == typeof i[e]) throw new TypeError('No method named "' + e + '"');
                                i[e]()
                            }
                        })
                    }, s(p, null, [{
                        key: "VERSION",
                        get: function() {
                            return "4.0.0"
                        }
                    }, {
                        key: "Default",
                        get: function() {
                            return l
                        }
                    }, {
                        key: "NAME",
                        get: function() {
                            return e
                        }
                    }, {
                        key: "DATA_KEY",
                        get: function() {
                            return n
                        }
                    }, {
                        key: "Event",
                        get: function() {
                            return _
                        }
                    }, {
                        key: "EVENT_KEY",
                        get: function() {
                            return i
                        }
                    }, {
                        key: "DefaultType",
                        get: function() {
                            return h
                        }
                    }]), p
                }(U);
            return t.fn[e] = g._jQueryInterface, t.fn[e].Constructor = g, t.fn[e].noConflict = function() {
                return t.fn[e] = o, g._jQueryInterface
            }, g
        }(e),
        K = function(t) {
            var e = "scrollspy",
                n = "bs.scrollspy",
                i = "." + n,
                o = t.fn[e],
                a = {
                    offset: 10,
                    method: "auto",
                    target: ""
                },
                l = {
                    offset: "number",
                    method: "string",
                    target: "(string|element)"
                },
                h = {
                    ACTIVATE: "activate" + i,
                    SCROLL: "scroll" + i,
                    LOAD_DATA_API: "load" + i + ".data-api"
                },
                c = "dropdown-item",
                u = "active",
                f = {
                    DATA_SPY: '[data-spy="scroll"]',
                    ACTIVE: ".active",
                    NAV_LIST_GROUP: ".nav, .list-group",
                    NAV_LINKS: ".nav-link",
                    NAV_ITEMS: ".nav-item",
                    LIST_ITEMS: ".list-group-item",
                    DROPDOWN: ".dropdown",
                    DROPDOWN_ITEMS: ".dropdown-item",
                    DROPDOWN_TOGGLE: ".dropdown-toggle"
                },
                d = "offset",
                _ = "position",
                g = function() {
                    function o(e, n) {
                        var i = this;
                        this._element = e, this._scrollElement = "BODY" === e.tagName ? window : e, this._config = this._getConfig(n), this._selector = this._config.target + " " + f.NAV_LINKS + "," + this._config.target + " " + f.LIST_ITEMS + "," + this._config.target + " " + f.DROPDOWN_ITEMS, this._offsets = [], this._targets = [], this._activeTarget = null, this._scrollHeight = 0, t(this._scrollElement).on(h.SCROLL, function(t) {
                            return i._process(t)
                        }), this.refresh(), this._process()
                    }
                    var g = o.prototype;
                    return g.refresh = function() {
                        var e = this,
                            n = this._scrollElement === this._scrollElement.window ? d : _,
                            i = "auto" === this._config.method ? n : this._config.method,
                            s = i === _ ? this._getScrollTop() : 0;
                        this._offsets = [], this._targets = [], this._scrollHeight = this._getScrollHeight(), t.makeArray(t(this._selector)).map(function(e) {
                            var n, r = P.getSelectorFromElement(e);
                            if (r && (n = t(r)[0]), n) {
                                var o = n.getBoundingClientRect();
                                if (o.width || o.height) return [t(n)[i]().top + s, r]
                            }
                            return null
                        }).filter(function(t) {
                            return t
                        }).sort(function(t, e) {
                            return t[0] - e[0]
                        }).forEach(function(t) {
                            e._offsets.push(t[0]), e._targets.push(t[1])
                        })
                    }, g.dispose = function() {
                        t.removeData(this._element, n), t(this._scrollElement).off(i), this._element = null, this._scrollElement = null, this._config = null, this._selector = null, this._offsets = null, this._targets = null, this._activeTarget = null, this._scrollHeight = null
                    }, g._getConfig = function(n) {
                        if ("string" != typeof(n = r({}, a, n)).target) {
                            var i = t(n.target).attr("id");
                            i || (i = P.getUID(e), t(n.target).attr("id", i)), n.target = "#" + i
                        }
                        return P.typeCheckConfig(e, n, l), n
                    }, g._getScrollTop = function() {
                        return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop
                    }, g._getScrollHeight = function() {
                        return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
                    }, g._getOffsetHeight = function() {
                        return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height
                    }, g._process = function() {
                        var t = this._getScrollTop() + this._config.offset,
                            e = this._getScrollHeight(),
                            n = this._config.offset + e - this._getOffsetHeight();
                        if (this._scrollHeight !== e && this.refresh(), t >= n) {
                            var i = this._targets[this._targets.length - 1];
                            this._activeTarget !== i && this._activate(i)
                        } else {
                            if (this._activeTarget && t < this._offsets[0] && this._offsets[0] > 0) return this._activeTarget = null, void this._clear();
                            for (var s = this._offsets.length; s--;) {
                                this._activeTarget !== this._targets[s] && t >= this._offsets[s] && ("undefined" == typeof this._offsets[s + 1] || t < this._offsets[s + 1]) && this._activate(this._targets[s])
                            }
                        }
                    }, g._activate = function(e) {
                        this._activeTarget = e, this._clear();
                        var n = this._selector.split(",");
                        n = n.map(function(t) {
                            return t + '[data-target="' + e + '"],' + t + '[href="' + e + '"]'
                        });
                        var i = t(n.join(","));
                        i.hasClass(c) ? (i.closest(f.DROPDOWN).find(f.DROPDOWN_TOGGLE).addClass(u), i.addClass(u)) : (i.addClass(u), i.parents(f.NAV_LIST_GROUP).prev(f.NAV_LINKS + ", " + f.LIST_ITEMS).addClass(u), i.parents(f.NAV_LIST_GROUP).prev(f.NAV_ITEMS).children(f.NAV_LINKS).addClass(u)), t(this._scrollElement).trigger(h.ACTIVATE, {
                            relatedTarget: e
                        })
                    }, g._clear = function() {
                        t(this._selector).filter(f.ACTIVE).removeClass(u)
                    }, o._jQueryInterface = function(e) {
                        return this.each(function() {
                            var i = t(this).data(n);
                            if (i || (i = new o(this, "object" == typeof e && e), t(this).data(n, i)), "string" == typeof e) {
                                if ("undefined" == typeof i[e]) throw new TypeError('No method named "' + e + '"');
                                i[e]()
                            }
                        })
                    }, s(o, null, [{
                        key: "VERSION",
                        get: function() {
                            return "4.0.0"
                        }
                    }, {
                        key: "Default",
                        get: function() {
                            return a
                        }
                    }]), o
                }();
            return t(window).on(h.LOAD_DATA_API, function() {
                for (var e = t.makeArray(t(f.DATA_SPY)), n = e.length; n--;) {
                    var i = t(e[n]);
                    g._jQueryInterface.call(i, i.data())
                }
            }), t.fn[e] = g._jQueryInterface, t.fn[e].Constructor = g, t.fn[e].noConflict = function() {
                return t.fn[e] = o, g._jQueryInterface
            }, g
        }(e),
        V = function(t) {
            var e = "bs.tab",
                n = "." + e,
                i = t.fn.tab,
                r = {
                    HIDE: "hide" + n,
                    HIDDEN: "hidden" + n,
                    SHOW: "show" + n,
                    SHOWN: "shown" + n,
                    CLICK_DATA_API: "click.bs.tab.data-api"
                },
                o = "dropdown-menu",
                a = "active",
                l = "disabled",
                h = "fade",
                c = "show",
                u = ".dropdown",
                f = ".nav, .list-group",
                d = ".active",
                _ = "> li > .active",
                g = '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
                p = ".dropdown-toggle",
                m = "> .dropdown-menu .active",
                v = function() {
                    function n(t) {
                        this._element = t
                    }
                    var i = n.prototype;
                    return i.show = function() {
                        var e = this;
                        if (!(this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && t(this._element).hasClass(a) || t(this._element).hasClass(l))) {
                            var n, i, s = t(this._element).closest(f)[0],
                                o = P.getSelectorFromElement(this._element);
                            if (s) {
                                var h = "UL" === s.nodeName ? _ : d;
                                i = (i = t.makeArray(t(s).find(h)))[i.length - 1]
                            }
                            var c = t.Event(r.HIDE, {
                                    relatedTarget: this._element
                                }),
                                u = t.Event(r.SHOW, {
                                    relatedTarget: i
                                });
                            if (i && t(i).trigger(c), t(this._element).trigger(u), !u.isDefaultPrevented() && !c.isDefaultPrevented()) {
                                o && (n = t(o)[0]), this._activate(this._element, s);
                                var g = function() {
                                    var n = t.Event(r.HIDDEN, {
                                            relatedTarget: e._element
                                        }),
                                        s = t.Event(r.SHOWN, {
                                            relatedTarget: i
                                        });
                                    t(i).trigger(n), t(e._element).trigger(s)
                                };
                                n ? this._activate(n, n.parentNode, g) : g()
                            }
                        }
                    }, i.dispose = function() {
                        t.removeData(this._element, e), this._element = null
                    }, i._activate = function(e, n, i) {
                        var s = this,
                            r = ("UL" === n.nodeName ? t(n).find(_) : t(n).children(d))[0],
                            o = i && P.supportsTransitionEnd() && r && t(r).hasClass(h),
                            a = function() {
                                return s._transitionComplete(e, r, i)
                            };
                        r && o ? t(r).one(P.TRANSITION_END, a).emulateTransitionEnd(150) : a()
                    }, i._transitionComplete = function(e, n, i) {
                        if (n) {
                            t(n).removeClass(c + " " + a);
                            var s = t(n.parentNode).find(m)[0];
                            s && t(s).removeClass(a), "tab" === n.getAttribute("role") && n.setAttribute("aria-selected", !1)
                        }
                        if (t(e).addClass(a), "tab" === e.getAttribute("role") && e.setAttribute("aria-selected", !0), P.reflow(e), t(e).addClass(c), e.parentNode && t(e.parentNode).hasClass(o)) {
                            var r = t(e).closest(u)[0];
                            r && t(r).find(p).addClass(a), e.setAttribute("aria-expanded", !0)
                        }
                        i && i()
                    }, n._jQueryInterface = function(i) {
                        return this.each(function() {
                            var s = t(this),
                                r = s.data(e);
                            if (r || (r = new n(this), s.data(e, r)), "string" == typeof i) {
                                if ("undefined" == typeof r[i]) throw new TypeError('No method named "' + i + '"');
                                r[i]()
                            }
                        })
                    }, s(n, null, [{
                        key: "VERSION",
                        get: function() {
                            return "4.0.0"
                        }
                    }]), n
                }();
            return t(document).on(r.CLICK_DATA_API, g, function(e) {
                e.preventDefault(), v._jQueryInterface.call(t(this), "show")
            }), t.fn.tab = v._jQueryInterface, t.fn.tab.Constructor = v, t.fn.tab.noConflict = function() {
                return t.fn.tab = i, v._jQueryInterface
            }, v
        }(e);
    ! function(t) {
        if ("undefined" == typeof t) throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");
        var e = t.fn.jquery.split(" ")[0].split(".");
        if (e[0] < 2 && e[1] < 9 || 1 === e[0] && 9 === e[1] && e[2] < 1 || e[0] >= 4) throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0")
    }(e), t.Util = P, t.Alert = L, t.Button = R, t.Carousel = j, t.Collapse = H, t.Dropdown = W, t.Modal = M, t.Popover = x, t.Scrollspy = K, t.Tab = V, t.Tooltip = U, Object.defineProperty(t, "__esModule", {
        value: !0
    })
});;

! function(i) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], i) : "undefined" != typeof exports ? module.exports = i(require("jquery")) : i(jQuery)
}(function(i) {
    "use strict";
    var e = window.Slick || {};
    (e = function() {
        var e = 0;
        return function(t, o) {
            var s, n = this;
            n.defaults = {
                accessibility: !0,
                adaptiveHeight: !1,
                appendArrows: i(t),
                appendDots: i(t),
                arrows: !0,
                asNavFor: null,
                prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
                nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
                autoplay: !1,
                autoplaySpeed: 3e3,
                centerMode: !1,
                centerPadding: "50px",
                cssEase: "ease",
                customPaging: function(e, t) {
                    return i('<button type="button" />').text(t + 1)
                },
                dots: !1,
                dotsClass: "slick-dots",
                draggable: !0,
                easing: "linear",
                edgeFriction: .35,
                fade: !1,
                focusOnSelect: !1,
                focusOnChange: !1,
                infinite: !0,
                initialSlide: 0,
                lazyLoad: "ondemand",
                mobileFirst: !1,
                pauseOnHover: !0,
                pauseOnFocus: !0,
                pauseOnDotsHover: !1,
                respondTo: "window",
                responsive: null,
                rows: 1,
                rtl: !1,
                slide: "",
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: !0,
                swipeToSlide: !1,
                touchMove: !0,
                touchThreshold: 5,
                useCSS: !0,
                useTransform: !0,
                variableWidth: !1,
                vertical: !1,
                verticalSwiping: !1,
                waitForAnimate: !0,
                zIndex: 1e3
            }, n.initials = {
                animating: !1,
                dragging: !1,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                scrolling: !1,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: !1,
                slideOffset: 0,
                swipeLeft: null,
                swiping: !1,
                $list: null,
                touchObject: {},
                transformsEnabled: !1,
                unslicked: !1
            }, i.extend(n, n.initials), n.activeBreakpoint = null, n.animType = null, n.animProp = null, n.breakpoints = [], n.breakpointSettings = [], n.cssTransitions = !1, n.focussed = !1, n.interrupted = !1, n.hidden = "hidden", n.paused = !0, n.positionProp = null, n.respondTo = null, n.rowCount = 1, n.shouldClick = !0, n.$slider = i(t), n.$slidesCache = null, n.transformType = null, n.transitionType = null, n.visibilityChange = "visibilitychange", n.windowWidth = 0, n.windowTimer = null, s = i(t).data("slick") || {}, n.options = i.extend({}, n.defaults, o, s), n.currentSlide = n.options.initialSlide, n.originalSettings = n.options, void 0 !== document.mozHidden ? (n.hidden = "mozHidden", n.visibilityChange = "mozvisibilitychange") : void 0 !== document.webkitHidden && (n.hidden = "webkitHidden", n.visibilityChange = "webkitvisibilitychange"), n.autoPlay = i.proxy(n.autoPlay, n), n.autoPlayClear = i.proxy(n.autoPlayClear, n), n.autoPlayIterator = i.proxy(n.autoPlayIterator, n), n.changeSlide = i.proxy(n.changeSlide, n), n.clickHandler = i.proxy(n.clickHandler, n), n.selectHandler = i.proxy(n.selectHandler, n), n.setPosition = i.proxy(n.setPosition, n), n.swipeHandler = i.proxy(n.swipeHandler, n), n.dragHandler = i.proxy(n.dragHandler, n), n.keyHandler = i.proxy(n.keyHandler, n), n.instanceUid = e++, n.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, n.registerBreakpoints(), n.init(!0)
        }
    }()).prototype.activateADA = function() {
        this.$slideTrack.find(".slick-active").attr({
            "aria-hidden": "false"
        }).find("a, input, button, select").attr({
            tabindex: "0"
        })
    }, e.prototype.addSlide = e.prototype.slickAdd = function(e, t, o) {
        var s = this;
        if ("boolean" == typeof t) o = t, t = null;
        else if (t < 0 || t >= s.slideCount) return !1;
        s.unload(), "number" == typeof t ? 0 === t && 0 === s.$slides.length ? i(e).appendTo(s.$slideTrack) : o ? i(e).insertBefore(s.$slides.eq(t)) : i(e).insertAfter(s.$slides.eq(t)) : !0 === o ? i(e).prependTo(s.$slideTrack) : i(e).appendTo(s.$slideTrack), s.$slides = s.$slideTrack.children(this.options.slide), s.$slideTrack.children(this.options.slide).detach(), s.$slideTrack.append(s.$slides), s.$slides.each(function(e, t) {
            i(t).attr("data-slick-index", e)
        }), s.$slidesCache = s.$slides, s.reinit()
    }, e.prototype.animateHeight = function() {
        var i = this;
        if (1 === i.options.slidesToShow && !0 === i.options.adaptiveHeight && !1 === i.options.vertical) {
            var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
            i.$list.animate({
                height: e
            }, i.options.speed)
        }
    }, e.prototype.animateSlide = function(e, t) {
        var o = {},
            s = this;
        s.animateHeight(), !0 === s.options.rtl && !1 === s.options.vertical && (e = -e), !1 === s.transformsEnabled ? !1 === s.options.vertical ? s.$slideTrack.animate({
            left: e
        }, s.options.speed, s.options.easing, t) : s.$slideTrack.animate({
            top: e
        }, s.options.speed, s.options.easing, t) : !1 === s.cssTransitions ? (!0 === s.options.rtl && (s.currentLeft = -s.currentLeft), i({
            animStart: s.currentLeft
        }).animate({
            animStart: e
        }, {
            duration: s.options.speed,
            easing: s.options.easing,
            step: function(i) {
                i = Math.ceil(i), !1 === s.options.vertical ? (o[s.animType] = "translate(" + i + "px, 0px)", s.$slideTrack.css(o)) : (o[s.animType] = "translate(0px," + i + "px)", s.$slideTrack.css(o))
            },
            complete: function() {
                t && t.call()
            }
        })) : (s.applyTransition(), e = Math.ceil(e), !1 === s.options.vertical ? o[s.animType] = "translate3d(" + e + "px, 0px, 0px)" : o[s.animType] = "translate3d(0px," + e + "px, 0px)", s.$slideTrack.css(o), t && setTimeout(function() {
            s.disableTransition(), t.call()
        }, s.options.speed))
    }, e.prototype.getNavTarget = function() {
        var e = this,
            t = e.options.asNavFor;
        return t && null !== t && (t = i(t).not(e.$slider)), t
    }, e.prototype.asNavFor = function(e) {
        var t = this.getNavTarget();
        null !== t && "object" == typeof t && t.each(function() {
            var t = i(this).slick("getSlick");
            t.unslicked || t.slideHandler(e, !0)
        })
    }, e.prototype.applyTransition = function(i) {
        var e = this,
            t = {};
        !1 === e.options.fade ? t[e.transitionType] = e.transformType + " " + e.options.speed + "ms " + e.options.cssEase : t[e.transitionType] = "opacity " + e.options.speed + "ms " + e.options.cssEase, !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t)
    }, e.prototype.autoPlay = function() {
        var i = this;
        i.autoPlayClear(), i.slideCount > i.options.slidesToShow && (i.autoPlayTimer = setInterval(i.autoPlayIterator, i.options.autoplaySpeed))
    }, e.prototype.autoPlayClear = function() {
        var i = this;
        i.autoPlayTimer && clearInterval(i.autoPlayTimer)
    }, e.prototype.autoPlayIterator = function() {
        var i = this,
            e = i.currentSlide + i.options.slidesToScroll;
        i.paused || i.interrupted || i.focussed || (!1 === i.options.infinite && (1 === i.direction && i.currentSlide + 1 === i.slideCount - 1 ? i.direction = 0 : 0 === i.direction && (e = i.currentSlide - i.options.slidesToScroll, i.currentSlide - 1 == 0 && (i.direction = 1))), i.slideHandler(e))
    }, e.prototype.buildArrows = function() {
        var e = this;
        !0 === e.options.arrows && (e.$prevArrow = i(e.options.prevArrow).addClass("slick-arrow"), e.$nextArrow = i(e.options.nextArrow).addClass("slick-arrow"), e.slideCount > e.options.slidesToShow ? (e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.prependTo(e.options.appendArrows), e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows), !0 !== e.options.infinite && e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({
            "aria-disabled": "true",
            tabindex: "-1"
        }))
    }, e.prototype.buildDots = function() {
        var e, t, o = this;
        if (!0 === o.options.dots) {
            for (o.$slider.addClass("slick-dotted"), t = i("<ul />").addClass(o.options.dotsClass), e = 0; e <= o.getDotCount(); e += 1) t.append(i("<li />").append(o.options.customPaging.call(this, o, e)));
            o.$dots = t.appendTo(o.options.appendDots), o.$dots.find("li").first().addClass("slick-active")
        }
    }, e.prototype.buildOut = function() {
        var e = this;
        e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), e.slideCount = e.$slides.length, e.$slides.each(function(e, t) {
            i(t).attr("data-slick-index", e).data("originalStyling", i(t).attr("style") || "")
        }), e.$slider.addClass("slick-slider"), e.$slideTrack = 0 === e.slideCount ? i('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent(), e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent(), e.$slideTrack.css("opacity", 0), !0 !== e.options.centerMode && !0 !== e.options.swipeToSlide || (e.options.slidesToScroll = 1), i("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"), e.setupInfinite(), e.buildArrows(), e.buildDots(), e.updateDots(), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), !0 === e.options.draggable && e.$list.addClass("draggable")
    }, e.prototype.buildRows = function() {
        var i, e, t, o, s, n, r, l = this;
        if (o = document.createDocumentFragment(), n = l.$slider.children(), l.options.rows > 1) {
            for (r = l.options.slidesPerRow * l.options.rows, s = Math.ceil(n.length / r), i = 0; i < s; i++) {
                var d = document.createElement("div");
                for (e = 0; e < l.options.rows; e++) {
                    var a = document.createElement("div");
                    for (t = 0; t < l.options.slidesPerRow; t++) {
                        var c = i * r + (e * l.options.slidesPerRow + t);
                        n.get(c) && a.appendChild(n.get(c))
                    }
                    d.appendChild(a)
                }
                o.appendChild(d)
            }
            l.$slider.empty().append(o), l.$slider.children().children().children().css({
                width: 100 / l.options.slidesPerRow + "%",
                display: "inline-block"
            })
        }
    }, e.prototype.checkResponsive = function(e, t) {
        var o, s, n, r = this,
            l = !1,
            d = r.$slider.width(),
            a = window.innerWidth || i(window).width();
        if ("window" === r.respondTo ? n = a : "slider" === r.respondTo ? n = d : "min" === r.respondTo && (n = Math.min(a, d)), r.options.responsive && r.options.responsive.length && null !== r.options.responsive) {
            s = null;
            for (o in r.breakpoints) r.breakpoints.hasOwnProperty(o) && (!1 === r.originalSettings.mobileFirst ? n < r.breakpoints[o] && (s = r.breakpoints[o]) : n > r.breakpoints[o] && (s = r.breakpoints[o]));
            null !== s ? null !== r.activeBreakpoint ? (s !== r.activeBreakpoint || t) && (r.activeBreakpoint = s, "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s]), !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e)), l = s) : (r.activeBreakpoint = s, "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s]), !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e)), l = s) : null !== r.activeBreakpoint && (r.activeBreakpoint = null, r.options = r.originalSettings, !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e), l = s), e || !1 === l || r.$slider.trigger("breakpoint", [r, l])
        }
    }, e.prototype.changeSlide = function(e, t) {
        var o, s, n, r = this,
            l = i(e.currentTarget);
        switch (l.is("a") && e.preventDefault(), l.is("li") || (l = l.closest("li")), n = r.slideCount % r.options.slidesToScroll != 0, o = n ? 0 : (r.slideCount - r.currentSlide) % r.options.slidesToScroll, e.data.message) {
            case "previous":
                s = 0 === o ? r.options.slidesToScroll : r.options.slidesToShow - o, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide - s, !1, t);
                break;
            case "next":
                s = 0 === o ? r.options.slidesToScroll : o, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide + s, !1, t);
                break;
            case "index":
                var d = 0 === e.data.index ? 0 : e.data.index || l.index() * r.options.slidesToScroll;
                r.slideHandler(r.checkNavigable(d), !1, t), l.children().trigger("focus");
                break;
            default:
                return
        }
    }, e.prototype.checkNavigable = function(i) {
        var e, t;
        if (e = this.getNavigableIndexes(), t = 0, i > e[e.length - 1]) i = e[e.length - 1];
        else
            for (var o in e) {
                if (i < e[o]) {
                    i = t;
                    break
                }
                t = e[o]
            }
        return i
    }, e.prototype.cleanUpEvents = function() {
        var e = this;
        e.options.dots && null !== e.$dots && (i("li", e.$dots).off("click.slick", e.changeSlide).off("mouseenter.slick", i.proxy(e.interrupt, e, !0)).off("mouseleave.slick", i.proxy(e.interrupt, e, !1)), !0 === e.options.accessibility && e.$dots.off("keydown.slick", e.keyHandler)), e.$slider.off("focus.slick blur.slick"), !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide), e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide), !0 === e.options.accessibility && (e.$prevArrow && e.$prevArrow.off("keydown.slick", e.keyHandler), e.$nextArrow && e.$nextArrow.off("keydown.slick", e.keyHandler))), e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler), e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler), e.$list.off("touchend.slick mouseup.slick", e.swipeHandler), e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler), e.$list.off("click.slick", e.clickHandler), i(document).off(e.visibilityChange, e.visibility), e.cleanUpSlideEvents(), !0 === e.options.accessibility && e.$list.off("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && i(e.$slideTrack).children().off("click.slick", e.selectHandler), i(window).off("orientationchange.slick.slick-" + e.instanceUid, e.orientationChange), i(window).off("resize.slick.slick-" + e.instanceUid, e.resize), i("[draggable!=true]", e.$slideTrack).off("dragstart", e.preventDefault), i(window).off("load.slick.slick-" + e.instanceUid, e.setPosition)
    }, e.prototype.cleanUpSlideEvents = function() {
        var e = this;
        e.$list.off("mouseenter.slick", i.proxy(e.interrupt, e, !0)), e.$list.off("mouseleave.slick", i.proxy(e.interrupt, e, !1))
    }, e.prototype.cleanUpRows = function() {
        var i, e = this;
        e.options.rows > 1 && ((i = e.$slides.children().children()).removeAttr("style"), e.$slider.empty().append(i))
    }, e.prototype.clickHandler = function(i) {
        !1 === this.shouldClick && (i.stopImmediatePropagation(), i.stopPropagation(), i.preventDefault())
    }, e.prototype.destroy = function(e) {
        var t = this;
        t.autoPlayClear(), t.touchObject = {}, t.cleanUpEvents(), i(".slick-cloned", t.$slider).detach(), t.$dots && t.$dots.remove(), t.$prevArrow && t.$prevArrow.length && (t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove()), t.$nextArrow && t.$nextArrow.length && (t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove()), t.$slides && (t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
            i(this).attr("style", i(this).data("originalStyling"))
        }), t.$slideTrack.children(this.options.slide).detach(), t.$slideTrack.detach(), t.$list.detach(), t.$slider.append(t.$slides)), t.cleanUpRows(), t.$slider.removeClass("slick-slider"), t.$slider.removeClass("slick-initialized"), t.$slider.removeClass("slick-dotted"), t.unslicked = !0, e || t.$slider.trigger("destroy", [t])
    }, e.prototype.disableTransition = function(i) {
        var e = this,
            t = {};
        t[e.transitionType] = "", !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t)
    }, e.prototype.fadeSlide = function(i, e) {
        var t = this;
        !1 === t.cssTransitions ? (t.$slides.eq(i).css({
            zIndex: t.options.zIndex
        }), t.$slides.eq(i).animate({
            opacity: 1
        }, t.options.speed, t.options.easing, e)) : (t.applyTransition(i), t.$slides.eq(i).css({
            opacity: 1,
            zIndex: t.options.zIndex
        }), e && setTimeout(function() {
            t.disableTransition(i), e.call()
        }, t.options.speed))
    }, e.prototype.fadeSlideOut = function(i) {
        var e = this;
        !1 === e.cssTransitions ? e.$slides.eq(i).animate({
            opacity: 0,
            zIndex: e.options.zIndex - 2
        }, e.options.speed, e.options.easing) : (e.applyTransition(i), e.$slides.eq(i).css({
            opacity: 0,
            zIndex: e.options.zIndex - 2
        }))
    }, e.prototype.filterSlides = e.prototype.slickFilter = function(i) {
        var e = this;
        null !== i && (e.$slidesCache = e.$slides, e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.filter(i).appendTo(e.$slideTrack), e.reinit())
    }, e.prototype.focusHandler = function() {
        var e = this;
        e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*", function(t) {
            t.stopImmediatePropagation();
            var o = i(this);
            setTimeout(function() {
                e.options.pauseOnFocus && (e.focussed = o.is(":focus"), e.autoPlay())
            }, 0)
        })
    }, e.prototype.getCurrent = e.prototype.slickCurrentSlide = function() {
        return this.currentSlide
    }, e.prototype.getDotCount = function() {
        var i = this,
            e = 0,
            t = 0,
            o = 0;
        if (!0 === i.options.infinite)
            if (i.slideCount <= i.options.slidesToShow) ++o;
            else
                for (; e < i.slideCount;) ++o, e = t + i.options.slidesToScroll, t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
        else if (!0 === i.options.centerMode) o = i.slideCount;
        else if (i.options.asNavFor)
            for (; e < i.slideCount;) ++o, e = t + i.options.slidesToScroll, t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
        else o = 1 + Math.ceil((i.slideCount - i.options.slidesToShow) / i.options.slidesToScroll);
        return o - 1
    }, e.prototype.getLeft = function(i) {
        var e, t, o, s, n = this,
            r = 0;
        return n.slideOffset = 0, t = n.$slides.first().outerHeight(!0), !0 === n.options.infinite ? (n.slideCount > n.options.slidesToShow && (n.slideOffset = n.slideWidth * n.options.slidesToShow * -1, s = -1, !0 === n.options.vertical && !0 === n.options.centerMode && (2 === n.options.slidesToShow ? s = -1.5 : 1 === n.options.slidesToShow && (s = -2)), r = t * n.options.slidesToShow * s), n.slideCount % n.options.slidesToScroll != 0 && i + n.options.slidesToScroll > n.slideCount && n.slideCount > n.options.slidesToShow && (i > n.slideCount ? (n.slideOffset = (n.options.slidesToShow - (i - n.slideCount)) * n.slideWidth * -1, r = (n.options.slidesToShow - (i - n.slideCount)) * t * -1) : (n.slideOffset = n.slideCount % n.options.slidesToScroll * n.slideWidth * -1, r = n.slideCount % n.options.slidesToScroll * t * -1))) : i + n.options.slidesToShow > n.slideCount && (n.slideOffset = (i + n.options.slidesToShow - n.slideCount) * n.slideWidth, r = (i + n.options.slidesToShow - n.slideCount) * t), n.slideCount <= n.options.slidesToShow && (n.slideOffset = 0, r = 0), !0 === n.options.centerMode && n.slideCount <= n.options.slidesToShow ? n.slideOffset = n.slideWidth * Math.floor(n.options.slidesToShow) / 2 - n.slideWidth * n.slideCount / 2 : !0 === n.options.centerMode && !0 === n.options.infinite ? n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2) - n.slideWidth : !0 === n.options.centerMode && (n.slideOffset = 0, n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2)), e = !1 === n.options.vertical ? i * n.slideWidth * -1 + n.slideOffset : i * t * -1 + r, !0 === n.options.variableWidth && (o = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow), e = !0 === n.options.rtl ? o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, !0 === n.options.centerMode && (o = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow + 1), e = !0 === n.options.rtl ? o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, e += (n.$list.width() - o.outerWidth()) / 2)), e
    }, e.prototype.getOption = e.prototype.slickGetOption = function(i) {
        return this.options[i]
    }, e.prototype.getNavigableIndexes = function() {
        var i, e = this,
            t = 0,
            o = 0,
            s = [];
        for (!1 === e.options.infinite ? i = e.slideCount : (t = -1 * e.options.slidesToScroll, o = -1 * e.options.slidesToScroll, i = 2 * e.slideCount); t < i;) s.push(t), t = o + e.options.slidesToScroll, o += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
        return s
    }, e.prototype.getSlick = function() {
        return this
    }, e.prototype.getSlideCount = function() {
        var e, t, o = this;
        return t = !0 === o.options.centerMode ? o.slideWidth * Math.floor(o.options.slidesToShow / 2) : 0, !0 === o.options.swipeToSlide ? (o.$slideTrack.find(".slick-slide").each(function(s, n) {
            if (n.offsetLeft - t + i(n).outerWidth() / 2 > -1 * o.swipeLeft) return e = n, !1
        }), Math.abs(i(e).attr("data-slick-index") - o.currentSlide) || 1) : o.options.slidesToScroll
    }, e.prototype.goTo = e.prototype.slickGoTo = function(i, e) {
        this.changeSlide({
            data: {
                message: "index",
                index: parseInt(i)
            }
        }, e)
    }, e.prototype.init = function(e) {
        var t = this;
        i(t.$slider).hasClass("slick-initialized") || (i(t.$slider).addClass("slick-initialized"), t.buildRows(), t.buildOut(), t.setProps(), t.startLoad(), t.loadSlider(), t.initializeEvents(), t.updateArrows(), t.updateDots(), t.checkResponsive(!0), t.focusHandler()), e && t.$slider.trigger("init", [t]), !0 === t.options.accessibility && t.initADA(), t.options.autoplay && (t.paused = !1, t.autoPlay())
    }, e.prototype.initADA = function() {
        var e = this,
            t = Math.ceil(e.slideCount / e.options.slidesToShow),
            o = e.getNavigableIndexes().filter(function(i) {
                return i >= 0 && i < e.slideCount
            });
        e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({
            "aria-hidden": "true",
            tabindex: "-1"
        }).find("a, input, button, select").attr({
            tabindex: "-1"
        }), null !== e.$dots && (e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function(t) {
            var s = o.indexOf(t);
            i(this).attr({
                role: "tabpanel",
                id: "slick-slide" + e.instanceUid + t,
                tabindex: -1
            }), -1 !== s && i(this).attr({
                "aria-describedby": "slick-slide-control" + e.instanceUid + s
            })
        }), e.$dots.attr("role", "tablist").find("li").each(function(s) {
            var n = o[s];
            i(this).attr({
                role: "presentation"
            }), i(this).find("button").first().attr({
                role: "tab",
                id: "slick-slide-control" + e.instanceUid + s,
                "aria-controls": "slick-slide" + e.instanceUid + n,
                "aria-label": s + 1 + " of " + t,
                "aria-selected": null,
                tabindex: "-1"
            })
        }).eq(e.currentSlide).find("button").attr({
            "aria-selected": "true",
            tabindex: "0"
        }).end());
        for (var s = e.currentSlide, n = s + e.options.slidesToShow; s < n; s++) e.$slides.eq(s).attr("tabindex", 0);
        e.activateADA()
    }, e.prototype.initArrowEvents = function() {
        var i = this;
        !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.off("click.slick").on("click.slick", {
            message: "previous"
        }, i.changeSlide), i.$nextArrow.off("click.slick").on("click.slick", {
            message: "next"
        }, i.changeSlide), !0 === i.options.accessibility && (i.$prevArrow.on("keydown.slick", i.keyHandler), i.$nextArrow.on("keydown.slick", i.keyHandler)))
    }, e.prototype.initDotEvents = function() {
        var e = this;
        !0 === e.options.dots && (i("li", e.$dots).on("click.slick", {
            message: "index"
        }, e.changeSlide), !0 === e.options.accessibility && e.$dots.on("keydown.slick", e.keyHandler)), !0 === e.options.dots && !0 === e.options.pauseOnDotsHover && i("li", e.$dots).on("mouseenter.slick", i.proxy(e.interrupt, e, !0)).on("mouseleave.slick", i.proxy(e.interrupt, e, !1))
    }, e.prototype.initSlideEvents = function() {
        var e = this;
        e.options.pauseOnHover && (e.$list.on("mouseenter.slick", i.proxy(e.interrupt, e, !0)), e.$list.on("mouseleave.slick", i.proxy(e.interrupt, e, !1)))
    }, e.prototype.initializeEvents = function() {
        var e = this;
        e.initArrowEvents(), e.initDotEvents(), e.initSlideEvents(), e.$list.on("touchstart.slick mousedown.slick", {
            action: "start"
        }, e.swipeHandler), e.$list.on("touchmove.slick mousemove.slick", {
            action: "move"
        }, e.swipeHandler), e.$list.on("touchend.slick mouseup.slick", {
            action: "end"
        }, e.swipeHandler), e.$list.on("touchcancel.slick mouseleave.slick", {
            action: "end"
        }, e.swipeHandler), e.$list.on("click.slick", e.clickHandler), i(document).on(e.visibilityChange, i.proxy(e.visibility, e)), !0 === e.options.accessibility && e.$list.on("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && i(e.$slideTrack).children().on("click.slick", e.selectHandler), i(window).on("orientationchange.slick.slick-" + e.instanceUid, i.proxy(e.orientationChange, e)), i(window).on("resize.slick.slick-" + e.instanceUid, i.proxy(e.resize, e)), i("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault), i(window).on("load.slick.slick-" + e.instanceUid, e.setPosition), i(e.setPosition)
    }, e.prototype.initUI = function() {
        var i = this;
        !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.show(), i.$nextArrow.show()), !0 === i.options.dots && i.slideCount > i.options.slidesToShow && i.$dots.show()
    }, e.prototype.keyHandler = function(i) {
        var e = this;
        i.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === i.keyCode && !0 === e.options.accessibility ? e.changeSlide({
            data: {
                message: !0 === e.options.rtl ? "next" : "previous"
            }
        }) : 39 === i.keyCode && !0 === e.options.accessibility && e.changeSlide({
            data: {
                message: !0 === e.options.rtl ? "previous" : "next"
            }
        }))
    }, e.prototype.lazyLoad = function() {
        function e(e) {
            i("img[data-lazy]", e).each(function() {
                var e = i(this),
                    t = i(this).attr("data-lazy"),
                    o = i(this).attr("data-srcset"),
                    s = i(this).attr("data-sizes") || n.$slider.attr("data-sizes"),
                    r = document.createElement("img");
                r.onload = function() {
                    e.animate({
                        opacity: 0
                    }, 100, function() {
                        o && (e.attr("srcset", o), s && e.attr("sizes", s)), e.attr("src", t).animate({
                            opacity: 1
                        }, 200, function() {
                            e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")
                        }), n.$slider.trigger("lazyLoaded", [n, e, t])
                    })
                }, r.onerror = function() {
                    e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), n.$slider.trigger("lazyLoadError", [n, e, t])
                }, r.src = t
            })
        }
        var t, o, s, n = this;
        if (!0 === n.options.centerMode ? !0 === n.options.infinite ? s = (o = n.currentSlide + (n.options.slidesToShow / 2 + 1)) + n.options.slidesToShow + 2 : (o = Math.max(0, n.currentSlide - (n.options.slidesToShow / 2 + 1)), s = n.options.slidesToShow / 2 + 1 + 2 + n.currentSlide) : (o = n.options.infinite ? n.options.slidesToShow + n.currentSlide : n.currentSlide, s = Math.ceil(o + n.options.slidesToShow), !0 === n.options.fade && (o > 0 && o--, s <= n.slideCount && s++)), t = n.$slider.find(".slick-slide").slice(o, s), "anticipated" === n.options.lazyLoad)
            for (var r = o - 1, l = s, d = n.$slider.find(".slick-slide"), a = 0; a < n.options.slidesToScroll; a++) r < 0 && (r = n.slideCount - 1), t = (t = t.add(d.eq(r))).add(d.eq(l)), r--, l++;
        e(t), n.slideCount <= n.options.slidesToShow ? e(n.$slider.find(".slick-slide")) : n.currentSlide >= n.slideCount - n.options.slidesToShow ? e(n.$slider.find(".slick-cloned").slice(0, n.options.slidesToShow)) : 0 === n.currentSlide && e(n.$slider.find(".slick-cloned").slice(-1 * n.options.slidesToShow))
    }, e.prototype.loadSlider = function() {
        var i = this;
        i.setPosition(), i.$slideTrack.css({
            opacity: 1
        }), i.$slider.removeClass("slick-loading"), i.initUI(), "progressive" === i.options.lazyLoad && i.progressiveLazyLoad()
    }, e.prototype.next = e.prototype.slickNext = function() {
        this.changeSlide({
            data: {
                message: "next"
            }
        })
    }, e.prototype.orientationChange = function() {
        var i = this;
        i.checkResponsive(), i.setPosition()
    }, e.prototype.pause = e.prototype.slickPause = function() {
        var i = this;
        i.autoPlayClear(), i.paused = !0
    }, e.prototype.play = e.prototype.slickPlay = function() {
        var i = this;
        i.autoPlay(), i.options.autoplay = !0, i.paused = !1, i.focussed = !1, i.interrupted = !1
    }, e.prototype.postSlide = function(e) {
        var t = this;
        t.unslicked || (t.$slider.trigger("afterChange", [t, e]), t.animating = !1, t.slideCount > t.options.slidesToShow && t.setPosition(), t.swipeLeft = null, t.options.autoplay && t.autoPlay(), !0 === t.options.accessibility && (t.initADA(), t.options.focusOnChange && i(t.$slides.get(t.currentSlide)).attr("tabindex", 0).focus()))
    }, e.prototype.prev = e.prototype.slickPrev = function() {
        this.changeSlide({
            data: {
                message: "previous"
            }
        })
    }, e.prototype.preventDefault = function(i) {
        i.preventDefault()
    }, e.prototype.progressiveLazyLoad = function(e) {
        e = e || 1;
        var t, o, s, n, r, l = this,
            d = i("img[data-lazy]", l.$slider);
        d.length ? (t = d.first(), o = t.attr("data-lazy"), s = t.attr("data-srcset"), n = t.attr("data-sizes") || l.$slider.attr("data-sizes"), (r = document.createElement("img")).onload = function() {
            s && (t.attr("srcset", s), n && t.attr("sizes", n)), t.attr("src", o).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"), !0 === l.options.adaptiveHeight && l.setPosition(), l.$slider.trigger("lazyLoaded", [l, t, o]), l.progressiveLazyLoad()
        }, r.onerror = function() {
            e < 3 ? setTimeout(function() {
                l.progressiveLazyLoad(e + 1)
            }, 500) : (t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), l.$slider.trigger("lazyLoadError", [l, t, o]), l.progressiveLazyLoad())
        }, r.src = o) : l.$slider.trigger("allImagesLoaded", [l])
    }, e.prototype.refresh = function(e) {
        var t, o, s = this;
        o = s.slideCount - s.options.slidesToShow, !s.options.infinite && s.currentSlide > o && (s.currentSlide = o), s.slideCount <= s.options.slidesToShow && (s.currentSlide = 0), t = s.currentSlide, s.destroy(!0), i.extend(s, s.initials, {
            currentSlide: t
        }), s.init(), e || s.changeSlide({
            data: {
                message: "index",
                index: t
            }
        }, !1)
    }, e.prototype.registerBreakpoints = function() {
        var e, t, o, s = this,
            n = s.options.responsive || null;
        if ("array" === i.type(n) && n.length) {
            s.respondTo = s.options.respondTo || "window";
            for (e in n)
                if (o = s.breakpoints.length - 1, n.hasOwnProperty(e)) {
                    for (t = n[e].breakpoint; o >= 0;) s.breakpoints[o] && s.breakpoints[o] === t && s.breakpoints.splice(o, 1), o--;
                    s.breakpoints.push(t), s.breakpointSettings[t] = n[e].settings
                }
            s.breakpoints.sort(function(i, e) {
                return s.options.mobileFirst ? i - e : e - i
            })
        }
    }, e.prototype.reinit = function() {
        var e = this;
        e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide"), e.slideCount = e.$slides.length, e.currentSlide >= e.slideCount && 0 !== e.currentSlide && (e.currentSlide = e.currentSlide - e.options.slidesToScroll), e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0), e.registerBreakpoints(), e.setProps(), e.setupInfinite(), e.buildArrows(), e.updateArrows(), e.initArrowEvents(), e.buildDots(), e.updateDots(), e.initDotEvents(), e.cleanUpSlideEvents(), e.initSlideEvents(), e.checkResponsive(!1, !0), !0 === e.options.focusOnSelect && i(e.$slideTrack).children().on("click.slick", e.selectHandler), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), e.setPosition(), e.focusHandler(), e.paused = !e.options.autoplay, e.autoPlay(), e.$slider.trigger("reInit", [e])
    }, e.prototype.resize = function() {
        var e = this;
        i(window).width() !== e.windowWidth && (clearTimeout(e.windowDelay), e.windowDelay = window.setTimeout(function() {
            e.windowWidth = i(window).width(), e.checkResponsive(), e.unslicked || e.setPosition()
        }, 50))
    }, e.prototype.removeSlide = e.prototype.slickRemove = function(i, e, t) {
        var o = this;
        if (i = "boolean" == typeof i ? !0 === (e = i) ? 0 : o.slideCount - 1 : !0 === e ? --i : i, o.slideCount < 1 || i < 0 || i > o.slideCount - 1) return !1;
        o.unload(), !0 === t ? o.$slideTrack.children().remove() : o.$slideTrack.children(this.options.slide).eq(i).remove(), o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), o.$slideTrack.append(o.$slides), o.$slidesCache = o.$slides, o.reinit()
    }, e.prototype.setCSS = function(i) {
        var e, t, o = this,
            s = {};
        !0 === o.options.rtl && (i = -i), e = "left" == o.positionProp ? Math.ceil(i) + "px" : "0px", t = "top" == o.positionProp ? Math.ceil(i) + "px" : "0px", s[o.positionProp] = i, !1 === o.transformsEnabled ? o.$slideTrack.css(s) : (s = {}, !1 === o.cssTransitions ? (s[o.animType] = "translate(" + e + ", " + t + ")", o.$slideTrack.css(s)) : (s[o.animType] = "translate3d(" + e + ", " + t + ", 0px)", o.$slideTrack.css(s)))
    }, e.prototype.setDimensions = function() {
        var i = this;
        !1 === i.options.vertical ? !0 === i.options.centerMode && i.$list.css({
            padding: "0px " + i.options.centerPadding
        }) : (i.$list.height(i.$slides.first().outerHeight(!0) * i.options.slidesToShow), !0 === i.options.centerMode && i.$list.css({
            padding: i.options.centerPadding + " 0px"
        })), i.listWidth = i.$list.width(), i.listHeight = i.$list.height(), !1 === i.options.vertical && !1 === i.options.variableWidth ? (i.slideWidth = Math.ceil(i.listWidth / i.options.slidesToShow), i.$slideTrack.width(Math.ceil(i.slideWidth * i.$slideTrack.children(".slick-slide").length))) : !0 === i.options.variableWidth ? i.$slideTrack.width(5e3 * i.slideCount) : (i.slideWidth = Math.ceil(i.listWidth), i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0) * i.$slideTrack.children(".slick-slide").length)));
        var e = i.$slides.first().outerWidth(!0) - i.$slides.first().width();
        !1 === i.options.variableWidth && i.$slideTrack.children(".slick-slide").width(i.slideWidth - e)
    }, e.prototype.setFade = function() {
        var e, t = this;
        t.$slides.each(function(o, s) {
            e = t.slideWidth * o * -1, !0 === t.options.rtl ? i(s).css({
                position: "relative",
                right: e,
                top: 0,
                zIndex: t.options.zIndex - 2,
                opacity: 0
            }) : i(s).css({
                position: "relative",
                left: e,
                top: 0,
                zIndex: t.options.zIndex - 2,
                opacity: 0
            })
        }), t.$slides.eq(t.currentSlide).css({
            zIndex: t.options.zIndex - 1,
            opacity: 1
        })
    }, e.prototype.setHeight = function() {
        var i = this;
        if (1 === i.options.slidesToShow && !0 === i.options.adaptiveHeight && !1 === i.options.vertical) {
            var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
            i.$list.css("height", e)
        }
    }, e.prototype.setOption = e.prototype.slickSetOption = function() {
        var e, t, o, s, n, r = this,
            l = !1;
        if ("object" === i.type(arguments[0]) ? (o = arguments[0], l = arguments[1], n = "multiple") : "string" === i.type(arguments[0]) && (o = arguments[0], s = arguments[1], l = arguments[2], "responsive" === arguments[0] && "array" === i.type(arguments[1]) ? n = "responsive" : void 0 !== arguments[1] && (n = "single")), "single" === n) r.options[o] = s;
        else if ("multiple" === n) i.each(o, function(i, e) {
            r.options[i] = e
        });
        else if ("responsive" === n)
            for (t in s)
                if ("array" !== i.type(r.options.responsive)) r.options.responsive = [s[t]];
                else {
                    for (e = r.options.responsive.length - 1; e >= 0;) r.options.responsive[e].breakpoint === s[t].breakpoint && r.options.responsive.splice(e, 1), e--;
                    r.options.responsive.push(s[t])
                }
        l && (r.unload(), r.reinit())
    }, e.prototype.setPosition = function() {
        var i = this;
        i.setDimensions(), i.setHeight(), !1 === i.options.fade ? i.setCSS(i.getLeft(i.currentSlide)) : i.setFade(), i.$slider.trigger("setPosition", [i])
    }, e.prototype.setProps = function() {
        var i = this,
            e = document.body.style;
        i.positionProp = !0 === i.options.vertical ? "top" : "left", "top" === i.positionProp ? i.$slider.addClass("slick-vertical") : i.$slider.removeClass("slick-vertical"), void 0 === e.WebkitTransition && void 0 === e.MozTransition && void 0 === e.msTransition || !0 === i.options.useCSS && (i.cssTransitions = !0), i.options.fade && ("number" == typeof i.options.zIndex ? i.options.zIndex < 3 && (i.options.zIndex = 3) : i.options.zIndex = i.defaults.zIndex), void 0 !== e.OTransform && (i.animType = "OTransform", i.transformType = "-o-transform", i.transitionType = "OTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)), void 0 !== e.MozTransform && (i.animType = "MozTransform", i.transformType = "-moz-transform", i.transitionType = "MozTransition", void 0 === e.perspectiveProperty && void 0 === e.MozPerspective && (i.animType = !1)), void 0 !== e.webkitTransform && (i.animType = "webkitTransform", i.transformType = "-webkit-transform", i.transitionType = "webkitTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)), void 0 !== e.msTransform && (i.animType = "msTransform", i.transformType = "-ms-transform", i.transitionType = "msTransition", void 0 === e.msTransform && (i.animType = !1)), void 0 !== e.transform && !1 !== i.animType && (i.animType = "transform", i.transformType = "transform", i.transitionType = "transition"), i.transformsEnabled = i.options.useTransform && null !== i.animType && !1 !== i.animType
    }, e.prototype.setSlideClasses = function(i) {
        var e, t, o, s, n = this;
        if (t = n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), n.$slides.eq(i).addClass("slick-current"), !0 === n.options.centerMode) {
            var r = n.options.slidesToShow % 2 == 0 ? 1 : 0;
            e = Math.floor(n.options.slidesToShow / 2), !0 === n.options.infinite && (i >= e && i <= n.slideCount - 1 - e ? n.$slides.slice(i - e + r, i + e + 1).addClass("slick-active").attr("aria-hidden", "false") : (o = n.options.slidesToShow + i, t.slice(o - e + 1 + r, o + e + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === i ? t.eq(t.length - 1 - n.options.slidesToShow).addClass("slick-center") : i === n.slideCount - 1 && t.eq(n.options.slidesToShow).addClass("slick-center")), n.$slides.eq(i).addClass("slick-center")
        } else i >= 0 && i <= n.slideCount - n.options.slidesToShow ? n.$slides.slice(i, i + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : t.length <= n.options.slidesToShow ? t.addClass("slick-active").attr("aria-hidden", "false") : (s = n.slideCount % n.options.slidesToShow, o = !0 === n.options.infinite ? n.options.slidesToShow + i : i, n.options.slidesToShow == n.options.slidesToScroll && n.slideCount - i < n.options.slidesToShow ? t.slice(o - (n.options.slidesToShow - s), o + s).addClass("slick-active").attr("aria-hidden", "false") : t.slice(o, o + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false"));
        "ondemand" !== n.options.lazyLoad && "anticipated" !== n.options.lazyLoad || n.lazyLoad()
    }, e.prototype.setupInfinite = function() {
        var e, t, o, s = this;
        if (!0 === s.options.fade && (s.options.centerMode = !1), !0 === s.options.infinite && !1 === s.options.fade && (t = null, s.slideCount > s.options.slidesToShow)) {
            for (o = !0 === s.options.centerMode ? s.options.slidesToShow + 1 : s.options.slidesToShow, e = s.slideCount; e > s.slideCount - o; e -= 1) t = e - 1, i(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t - s.slideCount).prependTo(s.$slideTrack).addClass("slick-cloned");
            for (e = 0; e < o + s.slideCount; e += 1) t = e, i(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t + s.slideCount).appendTo(s.$slideTrack).addClass("slick-cloned");
            s.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                i(this).attr("id", "")
            })
        }
    }, e.prototype.interrupt = function(i) {
        var e = this;
        i || e.autoPlay(), e.interrupted = i
    }, e.prototype.selectHandler = function(e) {
        var t = this,
            o = i(e.target).is(".slick-slide") ? i(e.target) : i(e.target).parents(".slick-slide"),
            s = parseInt(o.attr("data-slick-index"));
        s || (s = 0), t.slideCount <= t.options.slidesToShow ? t.slideHandler(s, !1, !0) : t.slideHandler(s)
    }, e.prototype.slideHandler = function(i, e, t) {
        var o, s, n, r, l, d = null,
            a = this;
        if (e = e || !1, !(!0 === a.animating && !0 === a.options.waitForAnimate || !0 === a.options.fade && a.currentSlide === i))
            if (!1 === e && a.asNavFor(i), o = i, d = a.getLeft(o), r = a.getLeft(a.currentSlide), a.currentLeft = null === a.swipeLeft ? r : a.swipeLeft, !1 === a.options.infinite && !1 === a.options.centerMode && (i < 0 || i > a.getDotCount() * a.options.slidesToScroll)) !1 === a.options.fade && (o = a.currentSlide, !0 !== t ? a.animateSlide(r, function() {
                a.postSlide(o)
            }) : a.postSlide(o));
            else if (!1 === a.options.infinite && !0 === a.options.centerMode && (i < 0 || i > a.slideCount - a.options.slidesToScroll)) !1 === a.options.fade && (o = a.currentSlide, !0 !== t ? a.animateSlide(r, function() {
            a.postSlide(o)
        }) : a.postSlide(o));
        else {
            if (a.options.autoplay && clearInterval(a.autoPlayTimer), s = o < 0 ? a.slideCount % a.options.slidesToScroll != 0 ? a.slideCount - a.slideCount % a.options.slidesToScroll : a.slideCount + o : o >= a.slideCount ? a.slideCount % a.options.slidesToScroll != 0 ? 0 : o - a.slideCount : o, a.animating = !0, a.$slider.trigger("beforeChange", [a, a.currentSlide, s]), n = a.currentSlide, a.currentSlide = s, a.setSlideClasses(a.currentSlide), a.options.asNavFor && (l = (l = a.getNavTarget()).slick("getSlick")).slideCount <= l.options.slidesToShow && l.setSlideClasses(a.currentSlide), a.updateDots(), a.updateArrows(), !0 === a.options.fade) return !0 !== t ? (a.fadeSlideOut(n), a.fadeSlide(s, function() {
                a.postSlide(s)
            })) : a.postSlide(s), void a.animateHeight();
            !0 !== t ? a.animateSlide(d, function() {
                a.postSlide(s)
            }) : a.postSlide(s)
        }
    }, e.prototype.startLoad = function() {
        var i = this;
        !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.hide(), i.$nextArrow.hide()), !0 === i.options.dots && i.slideCount > i.options.slidesToShow && i.$dots.hide(), i.$slider.addClass("slick-loading")
    }, e.prototype.swipeDirection = function() {
        var i, e, t, o, s = this;
        return i = s.touchObject.startX - s.touchObject.curX, e = s.touchObject.startY - s.touchObject.curY, t = Math.atan2(e, i), (o = Math.round(180 * t / Math.PI)) < 0 && (o = 360 - Math.abs(o)), o <= 45 && o >= 0 ? !1 === s.options.rtl ? "left" : "right" : o <= 360 && o >= 315 ? !1 === s.options.rtl ? "left" : "right" : o >= 135 && o <= 225 ? !1 === s.options.rtl ? "right" : "left" : !0 === s.options.verticalSwiping ? o >= 35 && o <= 135 ? "down" : "up" : "vertical"
    }, e.prototype.swipeEnd = function(i) {
        var e, t, o = this;
        if (o.dragging = !1, o.swiping = !1, o.scrolling) return o.scrolling = !1, !1;
        if (o.interrupted = !1, o.shouldClick = !(o.touchObject.swipeLength > 10), void 0 === o.touchObject.curX) return !1;
        if (!0 === o.touchObject.edgeHit && o.$slider.trigger("edge", [o, o.swipeDirection()]), o.touchObject.swipeLength >= o.touchObject.minSwipe) {
            switch (t = o.swipeDirection()) {
                case "left":
                case "down":
                    e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide + o.getSlideCount()) : o.currentSlide + o.getSlideCount(), o.currentDirection = 0;
                    break;
                case "right":
                case "up":
                    e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide - o.getSlideCount()) : o.currentSlide - o.getSlideCount(), o.currentDirection = 1
            }
            "vertical" != t && (o.slideHandler(e), o.touchObject = {}, o.$slider.trigger("swipe", [o, t]))
        } else o.touchObject.startX !== o.touchObject.curX && (o.slideHandler(o.currentSlide), o.touchObject = {})
    }, e.prototype.swipeHandler = function(i) {
        var e = this;
        if (!(!1 === e.options.swipe || "ontouchend" in document && !1 === e.options.swipe || !1 === e.options.draggable && -1 !== i.type.indexOf("mouse"))) switch (e.touchObject.fingerCount = i.originalEvent && void 0 !== i.originalEvent.touches ? i.originalEvent.touches.length : 1, e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold, !0 === e.options.verticalSwiping && (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold), i.data.action) {
            case "start":
                e.swipeStart(i);
                break;
            case "move":
                e.swipeMove(i);
                break;
            case "end":
                e.swipeEnd(i)
        }
    }, e.prototype.swipeMove = function(i) {
        var e, t, o, s, n, r, l = this;
        return n = void 0 !== i.originalEvent ? i.originalEvent.touches : null, !(!l.dragging || l.scrolling || n && 1 !== n.length) && (e = l.getLeft(l.currentSlide), l.touchObject.curX = void 0 !== n ? n[0].pageX : i.clientX, l.touchObject.curY = void 0 !== n ? n[0].pageY : i.clientY, l.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(l.touchObject.curX - l.touchObject.startX, 2))), r = Math.round(Math.sqrt(Math.pow(l.touchObject.curY - l.touchObject.startY, 2))), !l.options.verticalSwiping && !l.swiping && r > 4 ? (l.scrolling = !0, !1) : (!0 === l.options.verticalSwiping && (l.touchObject.swipeLength = r), t = l.swipeDirection(), void 0 !== i.originalEvent && l.touchObject.swipeLength > 4 && (l.swiping = !0, i.preventDefault()), s = (!1 === l.options.rtl ? 1 : -1) * (l.touchObject.curX > l.touchObject.startX ? 1 : -1), !0 === l.options.verticalSwiping && (s = l.touchObject.curY > l.touchObject.startY ? 1 : -1), o = l.touchObject.swipeLength, l.touchObject.edgeHit = !1, !1 === l.options.infinite && (0 === l.currentSlide && "right" === t || l.currentSlide >= l.getDotCount() && "left" === t) && (o = l.touchObject.swipeLength * l.options.edgeFriction, l.touchObject.edgeHit = !0), !1 === l.options.vertical ? l.swipeLeft = e + o * s : l.swipeLeft = e + o * (l.$list.height() / l.listWidth) * s, !0 === l.options.verticalSwiping && (l.swipeLeft = e + o * s), !0 !== l.options.fade && !1 !== l.options.touchMove && (!0 === l.animating ? (l.swipeLeft = null, !1) : void l.setCSS(l.swipeLeft))))
    }, e.prototype.swipeStart = function(i) {
        var e, t = this;
        if (t.interrupted = !0, 1 !== t.touchObject.fingerCount || t.slideCount <= t.options.slidesToShow) return t.touchObject = {}, !1;
        void 0 !== i.originalEvent && void 0 !== i.originalEvent.touches && (e = i.originalEvent.touches[0]), t.touchObject.startX = t.touchObject.curX = void 0 !== e ? e.pageX : i.clientX, t.touchObject.startY = t.touchObject.curY = void 0 !== e ? e.pageY : i.clientY, t.dragging = !0
    }, e.prototype.unfilterSlides = e.prototype.slickUnfilter = function() {
        var i = this;
        null !== i.$slidesCache && (i.unload(), i.$slideTrack.children(this.options.slide).detach(), i.$slidesCache.appendTo(i.$slideTrack), i.reinit())
    }, e.prototype.unload = function() {
        var e = this;
        i(".slick-cloned", e.$slider).remove(), e.$dots && e.$dots.remove(), e.$prevArrow && e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove(), e.$nextArrow && e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove(), e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
    }, e.prototype.unslick = function(i) {
        var e = this;
        e.$slider.trigger("unslick", [e, i]), e.destroy()
    }, e.prototype.updateArrows = function() {
        var i = this;
        Math.floor(i.options.slidesToShow / 2), !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && !i.options.infinite && (i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === i.currentSlide ? (i.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : i.currentSlide >= i.slideCount - i.options.slidesToShow && !1 === i.options.centerMode ? (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : i.currentSlide >= i.slideCount - 1 && !0 === i.options.centerMode && (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
    }, e.prototype.updateDots = function() {
        var i = this;
        null !== i.$dots && (i.$dots.find("li").removeClass("slick-active").end(), i.$dots.find("li").eq(Math.floor(i.currentSlide / i.options.slidesToScroll)).addClass("slick-active"))
    }, e.prototype.visibility = function() {
        var i = this;
        i.options.autoplay && (document[i.hidden] ? i.interrupted = !0 : i.interrupted = !1)
    }, i.fn.slick = function() {
        var i, t, o = this,
            s = arguments[0],
            n = Array.prototype.slice.call(arguments, 1),
            r = o.length;
        for (i = 0; i < r; i++)
            if ("object" == typeof s || void 0 === s ? o[i].slick = new e(o[i], s) : t = o[i].slick[s].apply(o[i].slick, n), void 0 !== t) return t;
        return o
    }
});;

// ==================================================
// fancyBox v3.5.7
//
// Licensed GPLv3 for open source use
// or fancyBox Commercial License for commercial use
//
// http://fancyapps.com/fancybox/
// Copyright 2019 fancyApps
//
// ==================================================
! function(t, e, n, o) {
    "use strict";

    function i(t, e) {
        var o, i, a, s = [],
            r = 0;
        t && t.isDefaultPrevented() || (t.preventDefault(), e = e || {}, t && t.data && (e = h(t.data.options, e)), o = e.$target || n(t.currentTarget).trigger("blur"), (a = n.fancybox.getInstance()) && a.$trigger && a.$trigger.is(o) || (e.selector ? s = n(e.selector) : (i = o.attr("data-fancybox") || "", i ? (s = t.data ? t.data.items : [], s = s.length ? s.filter('[data-fancybox="' + i + '"]') : n('[data-fancybox="' + i + '"]')) : s = [o]), r = n(s).index(o), r < 0 && (r = 0), a = n.fancybox.open(s, e, r), a.$trigger = o))
    }
    if (t.console = t.console || {
            info: function(t) {}
        }, n) {
        if (n.fn.fancybox) return void console.info("fancyBox already initialized");
        var a = {
                closeExisting: !1,
                loop: !1,
                gutter: 50,
                keyboard: !0,
                preventCaptionOverlap: !0,
                arrows: !0,
                infobar: !0,
                smallBtn: "auto",
                toolbar: "auto",
                buttons: ["zoom", "slideShow", "thumbs", "close"],
                idleTime: 3,
                protect: !1,
                modal: !1,
                image: {
                    preload: !1
                },
                ajax: {
                    settings: {
                        data: {
                            fancybox: !0
                        }
                    }
                },
                iframe: {
                    tpl: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" allowfullscreen="allowfullscreen" allow="autoplay; fullscreen" src=""></iframe>',
                    preload: !0,
                    css: {},
                    attr: {
                        scrolling: "auto"
                    }
                },
                video: {
                    tpl: '<video class="fancybox-video" controls controlsList="nodownload" poster="{{poster}}"><source src="{{src}}" type="{{format}}" />Sorry, your browser doesn\'t support embedded videos, <a href="{{src}}">download</a> and watch with your favorite video player!</video>',
                    format: "",
                    autoStart: !0
                },
                defaultType: "image",
                animationEffect: "zoom",
                animationDuration: 366,
                zoomOpacity: "auto",
                transitionEffect: "fade",
                transitionDuration: 366,
                slideClass: "",
                baseClass: "",
                baseTpl: '<div class="fancybox-container" role="dialog" tabindex="-1"><div class="fancybox-bg"></div><div class="fancybox-inner"><div class="fancybox-infobar"><span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span></div><div class="fancybox-toolbar">{{buttons}}</div><div class="fancybox-navigation">{{arrows}}</div><div class="fancybox-stage"></div><div class="fancybox-caption"><div class="fancybox-caption__body"></div></div></div></div>',
                spinnerTpl: '<div class="fancybox-loading"></div>',
                errorTpl: '<div class="fancybox-error"><p>{{ERROR}}</p></div>',
                btnTpl: {
                    download: '<a download data-fancybox-download class="fancybox-button fancybox-button--download" title="{{DOWNLOAD}}" href="javascript:;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.62 17.09V19H5.38v-1.91zm-2.97-6.96L17 11.45l-5 4.87-5-4.87 1.36-1.32 2.68 2.64V5h1.92v7.77z"/></svg></a>',
                    zoom: '<button data-fancybox-zoom class="fancybox-button fancybox-button--zoom" title="{{ZOOM}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.7 17.3l-3-3a5.9 5.9 0 0 0-.6-7.6 5.9 5.9 0 0 0-8.4 0 5.9 5.9 0 0 0 0 8.4 5.9 5.9 0 0 0 7.7.7l3 3a1 1 0 0 0 1.3 0c.4-.5.4-1 0-1.5zM8.1 13.8a4 4 0 0 1 0-5.7 4 4 0 0 1 5.7 0 4 4 0 0 1 0 5.7 4 4 0 0 1-5.7 0z"/></svg></button>',
                    close: '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 10.6L6.6 5.2 5.2 6.6l5.4 5.4-5.4 5.4 1.4 1.4 5.4-5.4 5.4 5.4 1.4-1.4-5.4-5.4 5.4-5.4-1.4-1.4-5.4 5.4z"/></svg></button>',
                    arrowLeft: '<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}"><div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.28 15.7l-1.34 1.37L5 12l4.94-5.07 1.34 1.38-2.68 2.72H19v1.94H8.6z"/></svg></div></button>',
                    arrowRight: '<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}"><div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.4 12.97l-2.68 2.72 1.34 1.38L19 12l-4.94-5.07-1.34 1.38 2.68 2.72H5v1.94z"/></svg></div></button>',
                    smallBtn: '<button type="button" data-fancybox-close class="fancybox-button fancybox-close-small" title="{{CLOSE}}"><svg xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 24 24"><path d="M13 12l5-5-1-1-5 5-5-5-1 1 5 5-5 5 1 1 5-5 5 5 1-1z"/></svg></button>'
                },
                parentEl: "body",
                hideScrollbar: !0,
                autoFocus: !0,
                backFocus: !0,
                trapFocus: !0,
                fullScreen: {
                    autoStart: !1
                },
                touch: {
                    vertical: !0,
                    momentum: !0
                },
                hash: null,
                media: {},
                slideShow: {
                    autoStart: !1,
                    speed: 3e3
                },
                thumbs: {
                    autoStart: !1,
                    hideOnClose: !0,
                    parentEl: ".fancybox-container",
                    axis: "y"
                },
                wheel: "auto",
                onInit: n.noop,
                beforeLoad: n.noop,
                afterLoad: n.noop,
                beforeShow: n.noop,
                afterShow: n.noop,
                beforeClose: n.noop,
                afterClose: n.noop,
                onActivate: n.noop,
                onDeactivate: n.noop,
                clickContent: function(t, e) {
                    return "image" === t.type && "zoom"
                },
                clickSlide: "close",
                clickOutside: "close",
                dblclickContent: !1,
                dblclickSlide: !1,
                dblclickOutside: !1,
                mobile: {
                    preventCaptionOverlap: !1,
                    idleTime: !1,
                    clickContent: function(t, e) {
                        return "image" === t.type && "toggleControls"
                    },
                    clickSlide: function(t, e) {
                        return "image" === t.type ? "toggleControls" : "close"
                    },
                    dblclickContent: function(t, e) {
                        return "image" === t.type && "zoom"
                    },
                    dblclickSlide: function(t, e) {
                        return "image" === t.type && "zoom"
                    }
                },
                lang: "en",
                i18n: {
                    en: {
                        CLOSE: "Close",
                        NEXT: "Next",
                        PREV: "Previous",
                        ERROR: "The requested content cannot be loaded. <br/> Please try again later.",
                        PLAY_START: "Start slideshow",
                        PLAY_STOP: "Pause slideshow",
                        FULL_SCREEN: "Full screen",
                        THUMBS: "Thumbnails",
                        DOWNLOAD: "Download",
                        SHARE: "Share",
                        ZOOM: "Zoom"
                    },
                    de: {
                        CLOSE: "Schlie&szlig;en",
                        NEXT: "Weiter",
                        PREV: "Zur&uuml;ck",
                        ERROR: "Die angeforderten Daten konnten nicht geladen werden. <br/> Bitte versuchen Sie es sp&auml;ter nochmal.",
                        PLAY_START: "Diaschau starten",
                        PLAY_STOP: "Diaschau beenden",
                        FULL_SCREEN: "Vollbild",
                        THUMBS: "Vorschaubilder",
                        DOWNLOAD: "Herunterladen",
                        SHARE: "Teilen",
                        ZOOM: "Vergr&ouml;&szlig;ern"
                    }
                }
            },
            s = n(t),
            r = n(e),
            c = 0,
            l = function(t) {
                return t && t.hasOwnProperty && t instanceof n
            },
            d = function() {
                return t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t.oRequestAnimationFrame || function(e) {
                    return t.setTimeout(e, 1e3 / 60)
                }
            }(),
            u = function() {
                return t.cancelAnimationFrame || t.webkitCancelAnimationFrame || t.mozCancelAnimationFrame || t.oCancelAnimationFrame || function(e) {
                    t.clearTimeout(e)
                }
            }(),
            f = function() {
                var t, n = e.createElement("fakeelement"),
                    o = {
                        transition: "transitionend",
                        OTransition: "oTransitionEnd",
                        MozTransition: "transitionend",
                        WebkitTransition: "webkitTransitionEnd"
                    };
                for (t in o)
                    if (void 0 !== n.style[t]) return o[t];
                return "transitionend"
            }(),
            p = function(t) {
                return t && t.length && t[0].offsetHeight
            },
            h = function(t, e) {
                var o = n.extend(!0, {}, t, e);
                return n.each(e, function(t, e) {
                    n.isArray(e) && (o[t] = e)
                }), o
            },
            g = function(t) {
                var o, i;
                return !(!t || t.ownerDocument !== e) && (n(".fancybox-container").css("pointer-events", "none"), o = {
                    x: t.getBoundingClientRect().left + t.offsetWidth / 2,
                    y: t.getBoundingClientRect().top + t.offsetHeight / 2
                }, i = e.elementFromPoint(o.x, o.y) === t, n(".fancybox-container").css("pointer-events", ""), i)
            },
            b = function(t, e, o) {
                var i = this;
                i.opts = h({
                    index: o
                }, n.fancybox.defaults), n.isPlainObject(e) && (i.opts = h(i.opts, e)), n.fancybox.isMobile && (i.opts = h(i.opts, i.opts.mobile)), i.id = i.opts.id || ++c, i.currIndex = parseInt(i.opts.index, 10) || 0, i.prevIndex = null, i.prevPos = null, i.currPos = 0, i.firstRun = !0, i.group = [], i.slides = {}, i.addContent(t), i.group.length && i.init()
            };
        n.extend(b.prototype, {
                init: function() {
                    var o, i, a = this,
                        s = a.group[a.currIndex],
                        r = s.opts;
                    r.closeExisting && n.fancybox.close(!0), n("body").addClass("fancybox-active"), !n.fancybox.getInstance() && !1 !== r.hideScrollbar && !n.fancybox.isMobile && e.body.scrollHeight > t.innerHeight && (n("head").append('<style id="fancybox-style-noscroll" type="text/css">.compensate-for-scrollbar{margin-right:' + (t.innerWidth - e.documentElement.clientWidth) + "px;}</style>"), n("body").addClass("compensate-for-scrollbar")), i = "", n.each(r.buttons, function(t, e) {
                        i += r.btnTpl[e] || ""
                    }), o = n(a.translate(a, r.baseTpl.replace("{{buttons}}", i).replace("{{arrows}}", r.btnTpl.arrowLeft + r.btnTpl.arrowRight))).attr("id", "fancybox-container-" + a.id).addClass(r.baseClass).data("FancyBox", a).appendTo(r.parentEl), a.$refs = {
                        container: o
                    }, ["bg", "inner", "infobar", "toolbar", "stage", "caption", "navigation"].forEach(function(t) {
                        a.$refs[t] = o.find(".fancybox-" + t)
                    }), a.trigger("onInit"), a.activate(), a.jumpTo(a.currIndex)
                },
                translate: function(t, e) {
                    var n = t.opts.i18n[t.opts.lang] || t.opts.i18n.en;
                    return e.replace(/\{\{(\w+)\}\}/g, function(t, e) {
                        return void 0 === n[e] ? t : n[e]
                    })
                },
                addContent: function(t) {
                    var e, o = this,
                        i = n.makeArray(t);
                    n.each(i, function(t, e) {
                        var i, a, s, r, c, l = {},
                            d = {};
                        n.isPlainObject(e) ? (l = e, d = e.opts || e) : "object" === n.type(e) && n(e).length ? (i = n(e), d = i.data() || {}, d = n.extend(!0, {}, d, d.options), d.$orig = i, l.src = o.opts.src || d.src || i.attr("href"), l.type || l.src || (l.type = "inline", l.src = e)) : l = {
                            type: "html",
                            src: e + ""
                        }, l.opts = n.extend(!0, {}, o.opts, d), n.isArray(d.buttons) && (l.opts.buttons = d.buttons), n.fancybox.isMobile && l.opts.mobile && (l.opts = h(l.opts, l.opts.mobile)), a = l.type || l.opts.type, r = l.src || "", !a && r && ((s = r.match(/\.(mp4|mov|ogv|webm)((\?|#).*)?$/i)) ? (a = "video", l.opts.video.format || (l.opts.video.format = "video/" + ("ogv" === s[1] ? "ogg" : s[1]))) : r.match(/(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i) ? a = "image" : r.match(/\.(pdf)((\?|#).*)?$/i) ? (a = "iframe", l = n.extend(!0, l, {
                            contentType: "pdf",
                            opts: {
                                iframe: {
                                    preload: !1
                                }
                            }
                        })) : "#" === r.charAt(0) && (a = "inline")), a ? l.type = a : o.trigger("objectNeedsType", l), l.contentType || (l.contentType = n.inArray(l.type, ["html", "inline", "ajax"]) > -1 ? "html" : l.type), l.index = o.group.length, "auto" == l.opts.smallBtn && (l.opts.smallBtn = n.inArray(l.type, ["html", "inline", "ajax"]) > -1), "auto" === l.opts.toolbar && (l.opts.toolbar = !l.opts.smallBtn), l.$thumb = l.opts.$thumb || null, l.opts.$trigger && l.index === o.opts.index && (l.$thumb = l.opts.$trigger.find("img:first"), l.$thumb.length && (l.opts.$orig = l.opts.$trigger)), l.$thumb && l.$thumb.length || !l.opts.$orig || (l.$thumb = l.opts.$orig.find("img:first")), l.$thumb && !l.$thumb.length && (l.$thumb = null), l.thumb = l.opts.thumb || (l.$thumb ? l.$thumb[0].src : null), "function" === n.type(l.opts.caption) && (l.opts.caption = l.opts.caption.apply(e, [o, l])), "function" === n.type(o.opts.caption) && (l.opts.caption = o.opts.caption.apply(e, [o, l])), l.opts.caption instanceof n || (l.opts.caption = void 0 === l.opts.caption ? "" : l.opts.caption + ""), "ajax" === l.type && (c = r.split(/\s+/, 2), c.length > 1 && (l.src = c.shift(), l.opts.filter = c.shift())), l.opts.modal && (l.opts = n.extend(!0, l.opts, {
                            trapFocus: !0,
                            infobar: 0,
                            toolbar: 0,
                            smallBtn: 0,
                            keyboard: 0,
                            slideShow: 0,
                            fullScreen: 0,
                            thumbs: 0,
                            touch: 0,
                            clickContent: !1,
                            clickSlide: !1,
                            clickOutside: !1,
                            dblclickContent: !1,
                            dblclickSlide: !1,
                            dblclickOutside: !1
                        })), o.group.push(l)
                    }), Object.keys(o.slides).length && (o.updateControls(), (e = o.Thumbs) && e.isActive && (e.create(), e.focus()))
                },
                addEvents: function() {
                    var e = this;
                    e.removeEvents(), e.$refs.container.on("click.fb-close", "[data-fancybox-close]", function(t) {
                        t.stopPropagation(), t.preventDefault(), e.close(t)
                    }).on("touchstart.fb-prev click.fb-prev", "[data-fancybox-prev]", function(t) {
                        t.stopPropagation(), t.preventDefault(), e.previous()
                    }).on("touchstart.fb-next click.fb-next", "[data-fancybox-next]", function(t) {
                        t.stopPropagation(), t.preventDefault(), e.next()
                    }).on("click.fb", "[data-fancybox-zoom]", function(t) {
                        e[e.isScaledDown() ? "scaleToActual" : "scaleToFit"]()
                    }), s.on("orientationchange.fb resize.fb", function(t) {
                        t && t.originalEvent && "resize" === t.originalEvent.type ? (e.requestId && u(e.requestId), e.requestId = d(function() {
                            e.update(t)
                        })) : (e.current && "iframe" === e.current.type && e.$refs.stage.hide(), setTimeout(function() {
                            e.$refs.stage.show(), e.update(t)
                        }, n.fancybox.isMobile ? 600 : 250))
                    }), r.on("keydown.fb", function(t) {
                        var o = n.fancybox ? n.fancybox.getInstance() : null,
                            i = o.current,
                            a = t.keyCode || t.which;
                        if (9 == a) return void(i.opts.trapFocus && e.focus(t));
                        if (!(!i.opts.keyboard || t.ctrlKey || t.altKey || t.shiftKey || n(t.target).is("input,textarea,video,audio,select"))) return 8 === a || 27 === a ? (t.preventDefault(), void e.close(t)) : 37 === a || 38 === a ? (t.preventDefault(), void e.previous()) : 39 === a || 40 === a ? (t.preventDefault(), void e.next()) : void e.trigger("afterKeydown", t, a)
                    }), e.group[e.currIndex].opts.idleTime && (e.idleSecondsCounter = 0, r.on("mousemove.fb-idle mouseleave.fb-idle mousedown.fb-idle touchstart.fb-idle touchmove.fb-idle scroll.fb-idle keydown.fb-idle", function(t) {
                        e.idleSecondsCounter = 0, e.isIdle && e.showControls(), e.isIdle = !1
                    }), e.idleInterval = t.setInterval(function() {
                        ++e.idleSecondsCounter >= e.group[e.currIndex].opts.idleTime && !e.isDragging && (e.isIdle = !0, e.idleSecondsCounter = 0, e.hideControls())
                    }, 1e3))
                },
                removeEvents: function() {
                    var e = this;
                    s.off("orientationchange.fb resize.fb"), r.off("keydown.fb .fb-idle"), this.$refs.container.off(".fb-close .fb-prev .fb-next"), e.idleInterval && (t.clearInterval(e.idleInterval), e.idleInterval = null)
                },
                previous: function(t) {
                    return this.jumpTo(this.currPos - 1, t)
                },
                next: function(t) {
                    return this.jumpTo(this.currPos + 1, t)
                },
                jumpTo: function(t, e) {
                    var o, i, a, s, r, c, l, d, u, f = this,
                        h = f.group.length;
                    if (!(f.isDragging || f.isClosing || f.isAnimating && f.firstRun)) {
                        if (t = parseInt(t, 10), !(a = f.current ? f.current.opts.loop : f.opts.loop) && (t < 0 || t >= h)) return !1;
                        if (o = f.firstRun = !Object.keys(f.slides).length, r = f.current, f.prevIndex = f.currIndex, f.prevPos = f.currPos, s = f.createSlide(t), h > 1 && ((a || s.index < h - 1) && f.createSlide(t + 1), (a || s.index > 0) && f.createSlide(t - 1)), f.current = s, f.currIndex = s.index, f.currPos = s.pos, f.trigger("beforeShow", o), f.updateControls(), s.forcedDuration = void 0, n.isNumeric(e) ? s.forcedDuration = e : e = s.opts[o ? "animationDuration" : "transitionDuration"], e = parseInt(e, 10), i = f.isMoved(s), s.$slide.addClass("fancybox-slide--current"), o) return s.opts.animationEffect && e && f.$refs.container.css("transition-duration", e + "ms"), f.$refs.container.addClass("fancybox-is-open").trigger("focus"), f.loadSlide(s), void f.preload("image");
                        c = n.fancybox.getTranslate(r.$slide), l = n.fancybox.getTranslate(f.$refs.stage), n.each(f.slides, function(t, e) {
                            n.fancybox.stop(e.$slide, !0)
                        }), r.pos !== s.pos && (r.isComplete = !1), r.$slide.removeClass("fancybox-slide--complete fancybox-slide--current"), i ? (u = c.left - (r.pos * c.width + r.pos * r.opts.gutter), n.each(f.slides, function(t, o) {
                            o.$slide.removeClass("fancybox-animated").removeClass(function(t, e) {
                                return (e.match(/(^|\s)fancybox-fx-\S+/g) || []).join(" ")
                            });
                            var i = o.pos * c.width + o.pos * o.opts.gutter;
                            n.fancybox.setTranslate(o.$slide, {
                                top: 0,
                                left: i - l.left + u
                            }), o.pos !== s.pos && o.$slide.addClass("fancybox-slide--" + (o.pos > s.pos ? "next" : "previous")), p(o.$slide), n.fancybox.animate(o.$slide, {
                                top: 0,
                                left: (o.pos - s.pos) * c.width + (o.pos - s.pos) * o.opts.gutter
                            }, e, function() {
                                o.$slide.css({
                                    transform: "",
                                    opacity: ""
                                }).removeClass("fancybox-slide--next fancybox-slide--previous"), o.pos === f.currPos && f.complete()
                            })
                        })) : e && s.opts.transitionEffect && (d = "fancybox-animated fancybox-fx-" + s.opts.transitionEffect, r.$slide.addClass("fancybox-slide--" + (r.pos > s.pos ? "next" : "previous")), n.fancybox.animate(r.$slide, d, e, function() {
                            r.$slide.removeClass(d).removeClass("fancybox-slide--next fancybox-slide--previous")
                        }, !1)), s.isLoaded ? f.revealContent(s) : f.loadSlide(s), f.preload("image")
                    }
                },
                createSlide: function(t) {
                    var e, o, i = this;
                    return o = t % i.group.length, o = o < 0 ? i.group.length + o : o, !i.slides[t] && i.group[o] && (e = n('<div class="fancybox-slide"></div>').appendTo(i.$refs.stage), i.slides[t] = n.extend(!0, {}, i.group[o], {
                        pos: t,
                        $slide: e,
                        isLoaded: !1
                    }), i.updateSlide(i.slides[t])), i.slides[t]
                },
                scaleToActual: function(t, e, o) {
                    var i, a, s, r, c, l = this,
                        d = l.current,
                        u = d.$content,
                        f = n.fancybox.getTranslate(d.$slide).width,
                        p = n.fancybox.getTranslate(d.$slide).height,
                        h = d.width,
                        g = d.height;
                    l.isAnimating || l.isMoved() || !u || "image" != d.type || !d.isLoaded || d.hasError || (l.isAnimating = !0, n.fancybox.stop(u), t = void 0 === t ? .5 * f : t, e = void 0 === e ? .5 * p : e, i = n.fancybox.getTranslate(u), i.top -= n.fancybox.getTranslate(d.$slide).top, i.left -= n.fancybox.getTranslate(d.$slide).left, r = h / i.width, c = g / i.height, a = .5 * f - .5 * h, s = .5 * p - .5 * g, h > f && (a = i.left * r - (t * r - t), a > 0 && (a = 0), a < f - h && (a = f - h)), g > p && (s = i.top * c - (e * c - e), s > 0 && (s = 0), s < p - g && (s = p - g)), l.updateCursor(h, g), n.fancybox.animate(u, {
                        top: s,
                        left: a,
                        scaleX: r,
                        scaleY: c
                    }, o || 366, function() {
                        l.isAnimating = !1
                    }), l.SlideShow && l.SlideShow.isActive && l.SlideShow.stop())
                },
                scaleToFit: function(t) {
                    var e, o = this,
                        i = o.current,
                        a = i.$content;
                    o.isAnimating || o.isMoved() || !a || "image" != i.type || !i.isLoaded || i.hasError || (o.isAnimating = !0, n.fancybox.stop(a), e = o.getFitPos(i), o.updateCursor(e.width, e.height), n.fancybox.animate(a, {
                        top: e.top,
                        left: e.left,
                        scaleX: e.width / a.width(),
                        scaleY: e.height / a.height()
                    }, t || 366, function() {
                        o.isAnimating = !1
                    }))
                },
                getFitPos: function(t) {
                    var e, o, i, a, s = this,
                        r = t.$content,
                        c = t.$slide,
                        l = t.width || t.opts.width,
                        d = t.height || t.opts.height,
                        u = {};
                    return !!(t.isLoaded && r && r.length) && (e = n.fancybox.getTranslate(s.$refs.stage).width, o = n.fancybox.getTranslate(s.$refs.stage).height, e -= parseFloat(c.css("paddingLeft")) + parseFloat(c.css("paddingRight")) + parseFloat(r.css("marginLeft")) + parseFloat(r.css("marginRight")), o -= parseFloat(c.css("paddingTop")) + parseFloat(c.css("paddingBottom")) + parseFloat(r.css("marginTop")) + parseFloat(r.css("marginBottom")), l && d || (l = e, d = o), i = Math.min(1, e / l, o / d), l *= i, d *= i, l > e - .5 && (l = e), d > o - .5 && (d = o), "image" === t.type ? (u.top = Math.floor(.5 * (o - d)) + parseFloat(c.css("paddingTop")), u.left = Math.floor(.5 * (e - l)) + parseFloat(c.css("paddingLeft"))) : "video" === t.contentType && (a = t.opts.width && t.opts.height ? l / d : t.opts.ratio || 16 / 9, d > l / a ? d = l / a : l > d * a && (l = d * a)), u.width = l, u.height = d, u)
                },
                update: function(t) {
                    var e = this;
                    n.each(e.slides, function(n, o) {
                        e.updateSlide(o, t)
                    })
                },
                updateSlide: function(t, e) {
                    var o = this,
                        i = t && t.$content,
                        a = t.width || t.opts.width,
                        s = t.height || t.opts.height,
                        r = t.$slide;
                    o.adjustCaption(t), i && (a || s || "video" === t.contentType) && !t.hasError && (n.fancybox.stop(i), n.fancybox.setTranslate(i, o.getFitPos(t)), t.pos === o.currPos && (o.isAnimating = !1, o.updateCursor())), o.adjustLayout(t), r.length && (r.trigger("refresh"), t.pos === o.currPos && o.$refs.toolbar.add(o.$refs.navigation.find(".fancybox-button--arrow_right")).toggleClass("compensate-for-scrollbar", r.get(0).scrollHeight > r.get(0).clientHeight)), o.trigger("onUpdate", t, e)
                },
                centerSlide: function(t) {
                    var e = this,
                        o = e.current,
                        i = o.$slide;
                    !e.isClosing && o && (i.siblings().css({
                        transform: "",
                        opacity: ""
                    }), i.parent().children().removeClass("fancybox-slide--previous fancybox-slide--next"), n.fancybox.animate(i, {
                        top: 0,
                        left: 0,
                        opacity: 1
                    }, void 0 === t ? 0 : t, function() {
                        i.css({
                            transform: "",
                            opacity: ""
                        }), o.isComplete || e.complete()
                    }, !1))
                },
                isMoved: function(t) {
                    var e, o, i = t || this.current;
                    return !!i && (o = n.fancybox.getTranslate(this.$refs.stage), e = n.fancybox.getTranslate(i.$slide), !i.$slide.hasClass("fancybox-animated") && (Math.abs(e.top - o.top) > .5 || Math.abs(e.left - o.left) > .5))
                },
                updateCursor: function(t, e) {
                    var o, i, a = this,
                        s = a.current,
                        r = a.$refs.container;
                    s && !a.isClosing && a.Guestures && (r.removeClass("fancybox-is-zoomable fancybox-can-zoomIn fancybox-can-zoomOut fancybox-can-swipe fancybox-can-pan"), o = a.canPan(t, e), i = !!o || a.isZoomable(), r.toggleClass("fancybox-is-zoomable", i), n("[data-fancybox-zoom]").prop("disabled", !i), o ? r.addClass("fancybox-can-pan") : i && ("zoom" === s.opts.clickContent || n.isFunction(s.opts.clickContent) && "zoom" == s.opts.clickContent(s)) ? r.addClass("fancybox-can-zoomIn") : s.opts.touch && (s.opts.touch.vertical || a.group.length > 1) && "video" !== s.contentType && r.addClass("fancybox-can-swipe"))
                },
                isZoomable: function() {
                    var t, e = this,
                        n = e.current;
                    if (n && !e.isClosing && "image" === n.type && !n.hasError) {
                        if (!n.isLoaded) return !0;
                        if ((t = e.getFitPos(n)) && (n.width > t.width || n.height > t.height)) return !0
                    }
                    return !1
                },
                isScaledDown: function(t, e) {
                    var o = this,
                        i = !1,
                        a = o.current,
                        s = a.$content;
                    return void 0 !== t && void 0 !== e ? i = t < a.width && e < a.height : s && (i = n.fancybox.getTranslate(s), i = i.width < a.width && i.height < a.height), i
                },
                canPan: function(t, e) {
                    var o = this,
                        i = o.current,
                        a = null,
                        s = !1;
                    return "image" === i.type && (i.isComplete || t && e) && !i.hasError && (s = o.getFitPos(i), void 0 !== t && void 0 !== e ? a = {
                        width: t,
                        height: e
                    } : i.isComplete && (a = n.fancybox.getTranslate(i.$content)), a && s && (s = Math.abs(a.width - s.width) > 1.5 || Math.abs(a.height - s.height) > 1.5)), s
                },
                loadSlide: function(t) {
                    var e, o, i, a = this;
                    if (!t.isLoading && !t.isLoaded) {
                        if (t.isLoading = !0, !1 === a.trigger("beforeLoad", t)) return t.isLoading = !1, !1;
                        switch (e = t.type, o = t.$slide, o.off("refresh").trigger("onReset").addClass(t.opts.slideClass), e) {
                            case "image":
                                a.setImage(t);
                                break;
                            case "iframe":
                                a.setIframe(t);
                                break;
                            case "html":
                                a.setContent(t, t.src || t.content);
                                break;
                            case "video":
                                a.setContent(t, t.opts.video.tpl.replace(/\{\{src\}\}/gi, t.src).replace("{{format}}", t.opts.videoFormat || t.opts.video.format || "").replace("{{poster}}", t.thumb || ""));
                                break;
                            case "inline":
                                n(t.src).length ? a.setContent(t, n(t.src)) : a.setError(t);
                                break;
                            case "ajax":
                                a.showLoading(t), i = n.ajax(n.extend({}, t.opts.ajax.settings, {
                                    url: t.src,
                                    success: function(e, n) {
                                        "success" === n && a.setContent(t, e)
                                    },
                                    error: function(e, n) {
                                        e && "abort" !== n && a.setError(t)
                                    }
                                })), o.one("onReset", function() {
                                    i.abort()
                                });
                                break;
                            default:
                                a.setError(t)
                        }
                        return !0
                    }
                },
                setImage: function(t) {
                    var o, i = this;
                    setTimeout(function() {
                        var e = t.$image;
                        i.isClosing || !t.isLoading || e && e.length && e[0].complete || t.hasError || i.showLoading(t)
                    }, 50), i.checkSrcset(t), t.$content = n('<div class="fancybox-content"></div>').addClass("fancybox-is-hidden").appendTo(t.$slide.addClass("fancybox-slide--image")), !1 !== t.opts.preload && t.opts.width && t.opts.height && t.thumb && (t.width = t.opts.width, t.height = t.opts.height, o = e.createElement("img"), o.onerror = function() {
                        n(this).remove(), t.$ghost = null
                    }, o.onload = function() {
                        i.afterLoad(t)
                    }, t.$ghost = n(o).addClass("fancybox-image").appendTo(t.$content).attr("src", t.thumb)), i.setBigImage(t)
                },
                checkSrcset: function(e) {
                    var n, o, i, a, s = e.opts.srcset || e.opts.image.srcset;
                    if (s) {
                        i = t.devicePixelRatio || 1, a = t.innerWidth * i, o = s.split(",").map(function(t) {
                            var e = {};
                            return t.trim().split(/\s+/).forEach(function(t, n) {
                                var o = parseInt(t.substring(0, t.length - 1), 10);
                                if (0 === n) return e.url = t;
                                o && (e.value = o, e.postfix = t[t.length - 1])
                            }), e
                        }), o.sort(function(t, e) {
                            return t.value - e.value
                        });
                        for (var r = 0; r < o.length; r++) {
                            var c = o[r];
                            if ("w" === c.postfix && c.value >= a || "x" === c.postfix && c.value >= i) {
                                n = c;
                                break
                            }
                        }!n && o.length && (n = o[o.length - 1]), n && (e.src = n.url, e.width && e.height && "w" == n.postfix && (e.height = e.width / e.height * n.value, e.width = n.value), e.opts.srcset = s)
                    }
                },
                setBigImage: function(t) {
                    var o = this,
                        i = e.createElement("img"),
                        a = n(i);
                    t.$image = a.one("error", function() {
                        o.setError(t)
                    }).one("load", function() {
                        var e;
                        t.$ghost || (o.resolveImageSlideSize(t, this.naturalWidth, this.naturalHeight), o.afterLoad(t)), o.isClosing || (t.opts.srcset && (e = t.opts.sizes, e && "auto" !== e || (e = (t.width / t.height > 1 && s.width() / s.height() > 1 ? "100" : Math.round(t.width / t.height * 100)) + "vw"), a.attr("sizes", e).attr("srcset", t.opts.srcset)), t.$ghost && setTimeout(function() {
                            t.$ghost && !o.isClosing && t.$ghost.hide()
                        }, Math.min(300, Math.max(1e3, t.height / 1600))), o.hideLoading(t))
                    }).addClass("fancybox-image").attr("src", t.src).appendTo(t.$content), (i.complete || "complete" == i.readyState) && a.naturalWidth && a.naturalHeight ? a.trigger("load") : i.error && a.trigger("error")
                },
                resolveImageSlideSize: function(t, e, n) {
                    var o = parseInt(t.opts.width, 10),
                        i = parseInt(t.opts.height, 10);
                    t.width = e, t.height = n, o > 0 && (t.width = o, t.height = Math.floor(o * n / e)), i > 0 && (t.width = Math.floor(i * e / n), t.height = i)
                },
                setIframe: function(t) {
                    var e, o = this,
                        i = t.opts.iframe,
                        a = t.$slide;
                    t.$content = n('<div class="fancybox-content' + (i.preload ? " fancybox-is-hidden" : "") + '"></div>').css(i.css).appendTo(a), a.addClass("fancybox-slide--" + t.contentType), t.$iframe = e = n(i.tpl.replace(/\{rnd\}/g, (new Date).getTime())).attr(i.attr).appendTo(t.$content), i.preload ? (o.showLoading(t), e.on("load.fb error.fb", function(e) {
                        this.isReady = 1, t.$slide.trigger("refresh"), o.afterLoad(t)
                    }), a.on("refresh.fb", function() {
                        var n, o, s = t.$content,
                            r = i.css.width,
                            c = i.css.height;
                        if (1 === e[0].isReady) {
                            try {
                                n = e.contents(), o = n.find("body")
                            } catch (t) {}
                            o && o.length && o.children().length && (a.css("overflow", "visible"), s.css({
                                width: "100%",
                                "max-width": "100%",
                                height: "9999px"
                            }), void 0 === r && (r = Math.ceil(Math.max(o[0].clientWidth, o.outerWidth(!0)))), s.css("width", r || "").css("max-width", ""), void 0 === c && (c = Math.ceil(Math.max(o[0].clientHeight, o.outerHeight(!0)))), s.css("height", c || ""), a.css("overflow", "auto")), s.removeClass("fancybox-is-hidden")
                        }
                    })) : o.afterLoad(t), e.attr("src", t.src), a.one("onReset", function() {
                        try {
                            n(this).find("iframe").hide().unbind().attr("src", "//about:blank")
                        } catch (t) {}
                        n(this).off("refresh.fb").empty(), t.isLoaded = !1, t.isRevealed = !1
                    })
                },
                setContent: function(t, e) {
                    var o = this;
                    o.isClosing || (o.hideLoading(t), t.$content && n.fancybox.stop(t.$content), t.$slide.empty(), l(e) && e.parent().length ? ((e.hasClass("fancybox-content") || e.parent().hasClass("fancybox-content")) && e.parents(".fancybox-slide").trigger("onReset"), t.$placeholder = n("<div>").hide().insertAfter(e), e.css("display", "inline-block")) : t.hasError || ("string" === n.type(e) && (e = n("<div>").append(n.trim(e)).contents()), t.opts.filter && (e = n("<div>").html(e).find(t.opts.filter))), t.$slide.one("onReset", function() {
                        n(this).find("video,audio").trigger("pause"), t.$placeholder && (t.$placeholder.after(e.removeClass("fancybox-content").hide()).remove(), t.$placeholder = null), t.$smallBtn && (t.$smallBtn.remove(), t.$smallBtn = null), t.hasError || (n(this).empty(), t.isLoaded = !1, t.isRevealed = !1)
                    }), n(e).appendTo(t.$slide), n(e).is("video,audio") && (n(e).addClass("fancybox-video"), n(e).wrap("<div></div>"), t.contentType = "video", t.opts.width = t.opts.width || n(e).attr("width"), t.opts.height = t.opts.height || n(e).attr("height")), t.$content = t.$slide.children().filter("div,form,main,video,audio,article,.fancybox-content").first(), t.$content.siblings().hide(), t.$content.length || (t.$content = t.$slide.wrapInner("<div></div>").children().first()), t.$content.addClass("fancybox-content"), t.$slide.addClass("fancybox-slide--" + t.contentType), o.afterLoad(t))
                },
                setError: function(t) {
                    t.hasError = !0, t.$slide.trigger("onReset").removeClass("fancybox-slide--" + t.contentType).addClass("fancybox-slide--error"), t.contentType = "html", this.setContent(t, this.translate(t, t.opts.errorTpl)), t.pos === this.currPos && (this.isAnimating = !1)
                },
                showLoading: function(t) {
                    var e = this;
                    (t = t || e.current) && !t.$spinner && (t.$spinner = n(e.translate(e, e.opts.spinnerTpl)).appendTo(t.$slide).hide().fadeIn("fast"))
                },
                hideLoading: function(t) {
                    var e = this;
                    (t = t || e.current) && t.$spinner && (t.$spinner.stop().remove(), delete t.$spinner)
                },
                afterLoad: function(t) {
                    var e = this;
                    e.isClosing || (t.isLoading = !1, t.isLoaded = !0, e.trigger("afterLoad", t), e.hideLoading(t), !t.opts.smallBtn || t.$smallBtn && t.$smallBtn.length || (t.$smallBtn = n(e.translate(t, t.opts.btnTpl.smallBtn)).appendTo(t.$content)), t.opts.protect && t.$content && !t.hasError && (t.$content.on("contextmenu.fb", function(t) {
                        return 2 == t.button && t.preventDefault(), !0
                    }), "image" === t.type && n('<div class="fancybox-spaceball"></div>').appendTo(t.$content)), e.adjustCaption(t), e.adjustLayout(t), t.pos === e.currPos && e.updateCursor(), e.revealContent(t))
                },
                adjustCaption: function(t) {
                    var e, n = this,
                        o = t || n.current,
                        i = o.opts.caption,
                        a = o.opts.preventCaptionOverlap,
                        s = n.$refs.caption,
                        r = !1;
                    s.toggleClass("fancybox-caption--separate", a), a && i && i.length && (o.pos !== n.currPos ? (e = s.clone().appendTo(s.parent()), e.children().eq(0).empty().html(i), r = e.outerHeight(!0), e.empty().remove()) : n.$caption && (r = n.$caption.outerHeight(!0)), o.$slide.css("padding-bottom", r || ""))
                },
                adjustLayout: function(t) {
                    var e, n, o, i, a = this,
                        s = t || a.current;
                    s.isLoaded && !0 !== s.opts.disableLayoutFix && (s.$content.css("margin-bottom", ""), s.$content.outerHeight() > s.$slide.height() + .5 && (o = s.$slide[0].style["padding-bottom"], i = s.$slide.css("padding-bottom"), parseFloat(i) > 0 && (e = s.$slide[0].scrollHeight, s.$slide.css("padding-bottom", 0), Math.abs(e - s.$slide[0].scrollHeight) < 1 && (n = i), s.$slide.css("padding-bottom", o))), s.$content.css("margin-bottom", n))
                },
                revealContent: function(t) {
                    var e, o, i, a, s = this,
                        r = t.$slide,
                        c = !1,
                        l = !1,
                        d = s.isMoved(t),
                        u = t.isRevealed;
                    return t.isRevealed = !0, e = t.opts[s.firstRun ? "animationEffect" : "transitionEffect"], i = t.opts[s.firstRun ? "animationDuration" : "transitionDuration"], i = parseInt(void 0 === t.forcedDuration ? i : t.forcedDuration, 10), !d && t.pos === s.currPos && i || (e = !1), "zoom" === e && (t.pos === s.currPos && i && "image" === t.type && !t.hasError && (l = s.getThumbPos(t)) ? c = s.getFitPos(t) : e = "fade"), "zoom" === e ? (s.isAnimating = !0, c.scaleX = c.width / l.width, c.scaleY = c.height / l.height, a = t.opts.zoomOpacity, "auto" == a && (a = Math.abs(t.width / t.height - l.width / l.height) > .1), a && (l.opacity = .1, c.opacity = 1), n.fancybox.setTranslate(t.$content.removeClass("fancybox-is-hidden"), l), p(t.$content), void n.fancybox.animate(t.$content, c, i, function() {
                        s.isAnimating = !1, s.complete()
                    })) : (s.updateSlide(t), e ? (n.fancybox.stop(r), o = "fancybox-slide--" + (t.pos >= s.prevPos ? "next" : "previous") + " fancybox-animated fancybox-fx-" + e, r.addClass(o).removeClass("fancybox-slide--current"), t.$content.removeClass("fancybox-is-hidden"), p(r), "image" !== t.type && t.$content.hide().show(0), void n.fancybox.animate(r, "fancybox-slide--current", i, function() {
                        r.removeClass(o).css({
                            transform: "",
                            opacity: ""
                        }), t.pos === s.currPos && s.complete()
                    }, !0)) : (t.$content.removeClass("fancybox-is-hidden"), u || !d || "image" !== t.type || t.hasError || t.$content.hide().fadeIn("fast"), void(t.pos === s.currPos && s.complete())))
                },
                getThumbPos: function(t) {
                    var e, o, i, a, s, r = !1,
                        c = t.$thumb;
                    return !(!c || !g(c[0])) && (e = n.fancybox.getTranslate(c), o = parseFloat(c.css("border-top-width") || 0), i = parseFloat(c.css("border-right-width") || 0), a = parseFloat(c.css("border-bottom-width") || 0), s = parseFloat(c.css("border-left-width") || 0), r = {
                        top: e.top + o,
                        left: e.left + s,
                        width: e.width - i - s,
                        height: e.height - o - a,
                        scaleX: 1,
                        scaleY: 1
                    }, e.width > 0 && e.height > 0 && r)
                },
                complete: function() {
                    var t, e = this,
                        o = e.current,
                        i = {};
                    !e.isMoved() && o.isLoaded && (o.isComplete || (o.isComplete = !0, o.$slide.siblings().trigger("onReset"), e.preload("inline"), p(o.$slide), o.$slide.addClass("fancybox-slide--complete"), n.each(e.slides, function(t, o) {
                        o.pos >= e.currPos - 1 && o.pos <= e.currPos + 1 ? i[o.pos] = o : o && (n.fancybox.stop(o.$slide), o.$slide.off().remove())
                    }), e.slides = i), e.isAnimating = !1, e.updateCursor(), e.trigger("afterShow"), o.opts.video.autoStart && o.$slide.find("video,audio").filter(":visible:first").trigger("play").one("ended", function() {
                        Document.exitFullscreen ? Document.exitFullscreen() : this.webkitExitFullscreen && this.webkitExitFullscreen(), e.next()
                    }), o.opts.autoFocus && "html" === o.contentType && (t = o.$content.find("input[autofocus]:enabled:visible:first"), t.length ? t.trigger("focus") : e.focus(null, !0)), o.$slide.scrollTop(0).scrollLeft(0))
                },
                preload: function(t) {
                    var e, n, o = this;
                    o.group.length < 2 || (n = o.slides[o.currPos + 1], e = o.slides[o.currPos - 1], e && e.type === t && o.loadSlide(e), n && n.type === t && o.loadSlide(n))
                },
                focus: function(t, o) {
                    var i, a, s = this,
                        r = ["a[href]", "area[href]", 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', "select:not([disabled]):not([aria-hidden])", "textarea:not([disabled]):not([aria-hidden])", "button:not([disabled]):not([aria-hidden])", "iframe", "object", "embed", "video", "audio", "[contenteditable]", '[tabindex]:not([tabindex^="-"])'].join(",");
                    s.isClosing || (i = !t && s.current && s.current.isComplete ? s.current.$slide.find("*:visible" + (o ? ":not(.fancybox-close-small)" : "")) : s.$refs.container.find("*:visible"), i = i.filter(r).filter(function() {
                        return "hidden" !== n(this).css("visibility") && !n(this).hasClass("disabled")
                    }), i.length ? (a = i.index(e.activeElement), t && t.shiftKey ? (a < 0 || 0 == a) && (t.preventDefault(), i.eq(i.length - 1).trigger("focus")) : (a < 0 || a == i.length - 1) && (t && t.preventDefault(), i.eq(0).trigger("focus"))) : s.$refs.container.trigger("focus"))
                },
                activate: function() {
                    var t = this;
                    n(".fancybox-container").each(function() {
                        var e = n(this).data("FancyBox");
                        e && e.id !== t.id && !e.isClosing && (e.trigger("onDeactivate"), e.removeEvents(), e.isVisible = !1)
                    }), t.isVisible = !0, (t.current || t.isIdle) && (t.update(), t.updateControls()), t.trigger("onActivate"), t.addEvents()
                },
                close: function(t, e) {
                    var o, i, a, s, r, c, l, u = this,
                        f = u.current,
                        h = function() {
                            u.cleanUp(t)
                        };
                    return !u.isClosing && (u.isClosing = !0, !1 === u.trigger("beforeClose", t) ? (u.isClosing = !1, d(function() {
                        u.update()
                    }), !1) : (u.removeEvents(), a = f.$content, o = f.opts.animationEffect, i = n.isNumeric(e) ? e : o ? f.opts.animationDuration : 0, f.$slide.removeClass("fancybox-slide--complete fancybox-slide--next fancybox-slide--previous fancybox-animated"), !0 !== t ? n.fancybox.stop(f.$slide) : o = !1, f.$slide.siblings().trigger("onReset").remove(), i && u.$refs.container.removeClass("fancybox-is-open").addClass("fancybox-is-closing").css("transition-duration", i + "ms"), u.hideLoading(f), u.hideControls(!0), u.updateCursor(), "zoom" !== o || a && i && "image" === f.type && !u.isMoved() && !f.hasError && (l = u.getThumbPos(f)) || (o = "fade"), "zoom" === o ? (n.fancybox.stop(a), s = n.fancybox.getTranslate(a), c = {
                            top: s.top,
                            left: s.left,
                            scaleX: s.width / l.width,
                            scaleY: s.height / l.height,
                            width: l.width,
                            height: l.height
                        }, r = f.opts.zoomOpacity,
                        "auto" == r && (r = Math.abs(f.width / f.height - l.width / l.height) > .1), r && (l.opacity = 0), n.fancybox.setTranslate(a, c), p(a), n.fancybox.animate(a, l, i, h), !0) : (o && i ? n.fancybox.animate(f.$slide.addClass("fancybox-slide--previous").removeClass("fancybox-slide--current"), "fancybox-animated fancybox-fx-" + o, i, h) : !0 === t ? setTimeout(h, i) : h(), !0)))
                },
                cleanUp: function(e) {
                    var o, i, a, s = this,
                        r = s.current.opts.$orig;
                    s.current.$slide.trigger("onReset"), s.$refs.container.empty().remove(), s.trigger("afterClose", e), s.current.opts.backFocus && (r && r.length && r.is(":visible") || (r = s.$trigger), r && r.length && (i = t.scrollX, a = t.scrollY, r.trigger("focus"), n("html, body").scrollTop(a).scrollLeft(i))), s.current = null, o = n.fancybox.getInstance(), o ? o.activate() : (n("body").removeClass("fancybox-active compensate-for-scrollbar"), n("#fancybox-style-noscroll").remove())
                },
                trigger: function(t, e) {
                    var o, i = Array.prototype.slice.call(arguments, 1),
                        a = this,
                        s = e && e.opts ? e : a.current;
                    if (s ? i.unshift(s) : s = a, i.unshift(a), n.isFunction(s.opts[t]) && (o = s.opts[t].apply(s, i)), !1 === o) return o;
                    "afterClose" !== t && a.$refs ? a.$refs.container.trigger(t + ".fb", i) : r.trigger(t + ".fb", i)
                },
                updateControls: function() {
                    var t = this,
                        o = t.current,
                        i = o.index,
                        a = t.$refs.container,
                        s = t.$refs.caption,
                        r = o.opts.caption;
                    o.$slide.trigger("refresh"), r && r.length ? (t.$caption = s, s.children().eq(0).html(r)) : t.$caption = null, t.hasHiddenControls || t.isIdle || t.showControls(), a.find("[data-fancybox-count]").html(t.group.length), a.find("[data-fancybox-index]").html(i + 1), a.find("[data-fancybox-prev]").prop("disabled", !o.opts.loop && i <= 0), a.find("[data-fancybox-next]").prop("disabled", !o.opts.loop && i >= t.group.length - 1), "image" === o.type ? a.find("[data-fancybox-zoom]").show().end().find("[data-fancybox-download]").attr("href", o.opts.image.src || o.src).show() : o.opts.toolbar && a.find("[data-fancybox-download],[data-fancybox-zoom]").hide(), n(e.activeElement).is(":hidden,[disabled]") && t.$refs.container.trigger("focus")
                },
                hideControls: function(t) {
                    var e = this,
                        n = ["infobar", "toolbar", "nav"];
                    !t && e.current.opts.preventCaptionOverlap || n.push("caption"), this.$refs.container.removeClass(n.map(function(t) {
                        return "fancybox-show-" + t
                    }).join(" ")), this.hasHiddenControls = !0
                },
                showControls: function() {
                    var t = this,
                        e = t.current ? t.current.opts : t.opts,
                        n = t.$refs.container;
                    t.hasHiddenControls = !1, t.idleSecondsCounter = 0, n.toggleClass("fancybox-show-toolbar", !(!e.toolbar || !e.buttons)).toggleClass("fancybox-show-infobar", !!(e.infobar && t.group.length > 1)).toggleClass("fancybox-show-caption", !!t.$caption).toggleClass("fancybox-show-nav", !!(e.arrows && t.group.length > 1)).toggleClass("fancybox-is-modal", !!e.modal)
                },
                toggleControls: function() {
                    this.hasHiddenControls ? this.showControls() : this.hideControls()
                }
            }), n.fancybox = {
                version: "3.5.7",
                defaults: a,
                getInstance: function(t) {
                    var e = n('.fancybox-container:not(".fancybox-is-closing"):last').data("FancyBox"),
                        o = Array.prototype.slice.call(arguments, 1);
                    return e instanceof b && ("string" === n.type(t) ? e[t].apply(e, o) : "function" === n.type(t) && t.apply(e, o), e)
                },
                open: function(t, e, n) {
                    return new b(t, e, n)
                },
                close: function(t) {
                    var e = this.getInstance();
                    e && (e.close(), !0 === t && this.close(t))
                },
                destroy: function() {
                    this.close(!0), r.add("body").off("click.fb-start", "**")
                },
                isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
                use3d: function() {
                    var n = e.createElement("div");
                    return t.getComputedStyle && t.getComputedStyle(n) && t.getComputedStyle(n).getPropertyValue("transform") && !(e.documentMode && e.documentMode < 11)
                }(),
                getTranslate: function(t) {
                    var e;
                    return !(!t || !t.length) && (e = t[0].getBoundingClientRect(), {
                        top: e.top || 0,
                        left: e.left || 0,
                        width: e.width,
                        height: e.height,
                        opacity: parseFloat(t.css("opacity"))
                    })
                },
                setTranslate: function(t, e) {
                    var n = "",
                        o = {};
                    if (t && e) return void 0 === e.left && void 0 === e.top || (n = (void 0 === e.left ? t.position().left : e.left) + "px, " + (void 0 === e.top ? t.position().top : e.top) + "px", n = this.use3d ? "translate3d(" + n + ", 0px)" : "translate(" + n + ")"), void 0 !== e.scaleX && void 0 !== e.scaleY ? n += " scale(" + e.scaleX + ", " + e.scaleY + ")" : void 0 !== e.scaleX && (n += " scaleX(" + e.scaleX + ")"), n.length && (o.transform = n), void 0 !== e.opacity && (o.opacity = e.opacity), void 0 !== e.width && (o.width = e.width), void 0 !== e.height && (o.height = e.height), t.css(o)
                },
                animate: function(t, e, o, i, a) {
                    var s, r = this;
                    n.isFunction(o) && (i = o, o = null), r.stop(t), s = r.getTranslate(t), t.on(f, function(c) {
                        (!c || !c.originalEvent || t.is(c.originalEvent.target) && "z-index" != c.originalEvent.propertyName) && (r.stop(t), n.isNumeric(o) && t.css("transition-duration", ""), n.isPlainObject(e) ? void 0 !== e.scaleX && void 0 !== e.scaleY && r.setTranslate(t, {
                            top: e.top,
                            left: e.left,
                            width: s.width * e.scaleX,
                            height: s.height * e.scaleY,
                            scaleX: 1,
                            scaleY: 1
                        }) : !0 !== a && t.removeClass(e), n.isFunction(i) && i(c))
                    }), n.isNumeric(o) && t.css("transition-duration", o + "ms"), n.isPlainObject(e) ? (void 0 !== e.scaleX && void 0 !== e.scaleY && (delete e.width, delete e.height, t.parent().hasClass("fancybox-slide--image") && t.parent().addClass("fancybox-is-scaling")), n.fancybox.setTranslate(t, e)) : t.addClass(e), t.data("timer", setTimeout(function() {
                        t.trigger(f)
                    }, o + 33))
                },
                stop: function(t, e) {
                    t && t.length && (clearTimeout(t.data("timer")), e && t.trigger(f), t.off(f).css("transition-duration", ""), t.parent().removeClass("fancybox-is-scaling"))
                }
            }, n.fn.fancybox = function(t) {
                var e;
                return t = t || {}, e = t.selector || !1, e ? n("body").off("click.fb-start", e).on("click.fb-start", e, {
                    options: t
                }, i) : this.off("click.fb-start").on("click.fb-start", {
                    items: this,
                    options: t
                }, i), this
            }, r.on("click.fb-start", "[data-fancybox]", i), r.on("click.fb-start", "[data-fancybox-trigger]", function(t) {
                n('[data-fancybox="' + n(this).attr("data-fancybox-trigger") + '"]').eq(n(this).attr("data-fancybox-index") || 0).trigger("click.fb-start", {
                    $trigger: n(this)
                })
            }),
            function() {
                var t = null;
                r.on("mousedown mouseup focus blur", ".fancybox-button", function(e) {
                    switch (e.type) {
                        case "mousedown":
                            t = n(this);
                            break;
                        case "mouseup":
                            t = null;
                            break;
                        case "focusin":
                            n(".fancybox-button").removeClass("fancybox-focus"), n(this).is(t) || n(this).is("[disabled]") || n(this).addClass("fancybox-focus");
                            break;
                        case "focusout":
                            n(".fancybox-button").removeClass("fancybox-focus")
                    }
                })
            }()
    }
}(window, document, jQuery),
function(t) {
    "use strict";
    var e = {
            youtube: {
                matcher: /(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(watch\?(.*&)?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*))(.*)/i,
                params: {
                    autoplay: 1,
                    autohide: 1,
                    fs: 1,
                    rel: 0,
                    hd: 1,
                    wmode: "transparent",
                    enablejsapi: 1,
                    html5: 1
                },
                paramPlace: 8,
                type: "iframe",
                url: "https://www.youtube-nocookie.com/embed/$4",
                thumb: "https://img.youtube.com/vi/$4/hqdefault.jpg"
            },
            vimeo: {
                matcher: /^.+vimeo.com\/(.*\/)?([\d]+)(.*)?/,
                params: {
                    autoplay: 1,
                    hd: 1,
                    show_title: 1,
                    show_byline: 1,
                    show_portrait: 0,
                    fullscreen: 1
                },
                paramPlace: 3,
                type: "iframe",
                url: "//player.vimeo.com/video/$2"
            },
            instagram: {
                matcher: /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
                type: "image",
                url: "//$1/p/$2/media/?size=l"
            },
            gmap_place: {
                matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(((maps\/(place\/(.*)\/)?\@(.*),(\d+.?\d+?)z))|(\?ll=))(.*)?/i,
                type: "iframe",
                url: function(t) {
                    return "//maps.google." + t[2] + "/?ll=" + (t[9] ? t[9] + "&z=" + Math.floor(t[10]) + (t[12] ? t[12].replace(/^\//, "&") : "") : t[12] + "").replace(/\?/, "&") + "&output=" + (t[12] && t[12].indexOf("layer=c") > 0 ? "svembed" : "embed")
                }
            },
            gmap_search: {
                matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(maps\/search\/)(.*)/i,
                type: "iframe",
                url: function(t) {
                    return "//maps.google." + t[2] + "/maps?q=" + t[5].replace("query=", "q=").replace("api=1", "") + "&output=embed"
                }
            }
        },
        n = function(e, n, o) {
            if (e) return o = o || "", "object" === t.type(o) && (o = t.param(o, !0)), t.each(n, function(t, n) {
                e = e.replace("$" + t, n || "")
            }), o.length && (e += (e.indexOf("?") > 0 ? "&" : "?") + o), e
        };
    t(document).on("objectNeedsType.fb", function(o, i, a) {
        var s, r, c, l, d, u, f, p = a.src || "",
            h = !1;
        s = t.extend(!0, {}, e, a.opts.media), t.each(s, function(e, o) {
            if (c = p.match(o.matcher)) {
                if (h = o.type, f = e, u = {}, o.paramPlace && c[o.paramPlace]) {
                    d = c[o.paramPlace], "?" == d[0] && (d = d.substring(1)), d = d.split("&");
                    for (var i = 0; i < d.length; ++i) {
                        var s = d[i].split("=", 2);
                        2 == s.length && (u[s[0]] = decodeURIComponent(s[1].replace(/\+/g, " ")))
                    }
                }
                return l = t.extend(!0, {}, o.params, a.opts[e], u), p = "function" === t.type(o.url) ? o.url.call(this, c, l, a) : n(o.url, c, l), r = "function" === t.type(o.thumb) ? o.thumb.call(this, c, l, a) : n(o.thumb, c), "youtube" === e ? p = p.replace(/&t=((\d+)m)?(\d+)s/, function(t, e, n, o) {
                    return "&start=" + ((n ? 60 * parseInt(n, 10) : 0) + parseInt(o, 10))
                }) : "vimeo" === e && (p = p.replace("&%23", "#")), !1
            }
        }), h ? (a.opts.thumb || a.opts.$thumb && a.opts.$thumb.length || (a.opts.thumb = r), "iframe" === h && (a.opts = t.extend(!0, a.opts, {
            iframe: {
                preload: !1,
                attr: {
                    scrolling: "no"
                }
            }
        })), t.extend(a, {
            type: h,
            src: p,
            origSrc: a.src,
            contentSource: f,
            contentType: "image" === h ? "image" : "gmap_place" == f || "gmap_search" == f ? "map" : "video"
        })) : p && (a.type = a.opts.defaultType)
    });
    var o = {
        youtube: {
            src: "https://www.youtube.com/iframe_api",
            class: "YT",
            loading: !1,
            loaded: !1
        },
        vimeo: {
            src: "https://player.vimeo.com/api/player.js",
            class: "Vimeo",
            loading: !1,
            loaded: !1
        },
        load: function(t) {
            var e, n = this;
            if (this[t].loaded) return void setTimeout(function() {
                n.done(t)
            });
            this[t].loading || (this[t].loading = !0, e = document.createElement("script"), e.type = "text/javascript", e.src = this[t].src, "youtube" === t ? window.onYouTubeIframeAPIReady = function() {
                n[t].loaded = !0, n.done(t)
            } : e.onload = function() {
                n[t].loaded = !0, n.done(t)
            }, document.body.appendChild(e))
        },
        done: function(e) {
            var n, o, i;
            "youtube" === e && delete window.onYouTubeIframeAPIReady, (n = t.fancybox.getInstance()) && (o = n.current.$content.find("iframe"), "youtube" === e && void 0 !== YT && YT ? i = new YT.Player(o.attr("id"), {
                events: {
                    onStateChange: function(t) {
                        0 == t.data && n.next()
                    }
                }
            }) : "vimeo" === e && void 0 !== Vimeo && Vimeo && (i = new Vimeo.Player(o), i.on("ended", function() {
                n.next()
            })))
        }
    };
    t(document).on({
        "afterShow.fb": function(t, e, n) {
            e.group.length > 1 && ("youtube" === n.contentSource || "vimeo" === n.contentSource) && o.load(n.contentSource)
        }
    })
}(jQuery),
function(t, e, n) {
    "use strict";
    var o = function() {
            return t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t.oRequestAnimationFrame || function(e) {
                return t.setTimeout(e, 1e3 / 60)
            }
        }(),
        i = function() {
            return t.cancelAnimationFrame || t.webkitCancelAnimationFrame || t.mozCancelAnimationFrame || t.oCancelAnimationFrame || function(e) {
                t.clearTimeout(e)
            }
        }(),
        a = function(e) {
            var n = [];
            e = e.originalEvent || e || t.e, e = e.touches && e.touches.length ? e.touches : e.changedTouches && e.changedTouches.length ? e.changedTouches : [e];
            for (var o in e) e[o].pageX ? n.push({
                x: e[o].pageX,
                y: e[o].pageY
            }) : e[o].clientX && n.push({
                x: e[o].clientX,
                y: e[o].clientY
            });
            return n
        },
        s = function(t, e, n) {
            return e && t ? "x" === n ? t.x - e.x : "y" === n ? t.y - e.y : Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2)) : 0
        },
        r = function(t) {
            if (t.is('a,area,button,[role="button"],input,label,select,summary,textarea,video,audio,iframe') || n.isFunction(t.get(0).onclick) || t.data("selectable")) return !0;
            for (var e = 0, o = t[0].attributes, i = o.length; e < i; e++)
                if ("data-fancybox-" === o[e].nodeName.substr(0, 14)) return !0;
            return !1
        },
        c = function(e) {
            var n = t.getComputedStyle(e)["overflow-y"],
                o = t.getComputedStyle(e)["overflow-x"],
                i = ("scroll" === n || "auto" === n) && e.scrollHeight > e.clientHeight,
                a = ("scroll" === o || "auto" === o) && e.scrollWidth > e.clientWidth;
            return i || a
        },
        l = function(t) {
            for (var e = !1;;) {
                if (e = c(t.get(0))) break;
                if (t = t.parent(), !t.length || t.hasClass("fancybox-stage") || t.is("body")) break
            }
            return e
        },
        d = function(t) {
            var e = this;
            e.instance = t, e.$bg = t.$refs.bg, e.$stage = t.$refs.stage, e.$container = t.$refs.container, e.destroy(), e.$container.on("touchstart.fb.touch mousedown.fb.touch", n.proxy(e, "ontouchstart"))
        };
    d.prototype.destroy = function() {
        var t = this;
        t.$container.off(".fb.touch"), n(e).off(".fb.touch"), t.requestId && (i(t.requestId), t.requestId = null), t.tapped && (clearTimeout(t.tapped), t.tapped = null)
    }, d.prototype.ontouchstart = function(o) {
        var i = this,
            c = n(o.target),
            d = i.instance,
            u = d.current,
            f = u.$slide,
            p = u.$content,
            h = "touchstart" == o.type;
        if (h && i.$container.off("mousedown.fb.touch"), (!o.originalEvent || 2 != o.originalEvent.button) && f.length && c.length && !r(c) && !r(c.parent()) && (c.is("img") || !(o.originalEvent.clientX > c[0].clientWidth + c.offset().left))) {
            if (!u || d.isAnimating || u.$slide.hasClass("fancybox-animated")) return o.stopPropagation(), void o.preventDefault();
            i.realPoints = i.startPoints = a(o), i.startPoints.length && (u.touch && o.stopPropagation(), i.startEvent = o, i.canTap = !0, i.$target = c, i.$content = p, i.opts = u.opts.touch, i.isPanning = !1, i.isSwiping = !1, i.isZooming = !1, i.isScrolling = !1, i.canPan = d.canPan(), i.startTime = (new Date).getTime(), i.distanceX = i.distanceY = i.distance = 0, i.canvasWidth = Math.round(f[0].clientWidth), i.canvasHeight = Math.round(f[0].clientHeight), i.contentLastPos = null, i.contentStartPos = n.fancybox.getTranslate(i.$content) || {
                top: 0,
                left: 0
            }, i.sliderStartPos = n.fancybox.getTranslate(f), i.stagePos = n.fancybox.getTranslate(d.$refs.stage), i.sliderStartPos.top -= i.stagePos.top, i.sliderStartPos.left -= i.stagePos.left, i.contentStartPos.top -= i.stagePos.top, i.contentStartPos.left -= i.stagePos.left, n(e).off(".fb.touch").on(h ? "touchend.fb.touch touchcancel.fb.touch" : "mouseup.fb.touch mouseleave.fb.touch", n.proxy(i, "ontouchend")).on(h ? "touchmove.fb.touch" : "mousemove.fb.touch", n.proxy(i, "ontouchmove")), n.fancybox.isMobile && e.addEventListener("scroll", i.onscroll, !0), ((i.opts || i.canPan) && (c.is(i.$stage) || i.$stage.find(c).length) || (c.is(".fancybox-image") && o.preventDefault(), n.fancybox.isMobile && c.parents(".fancybox-caption").length)) && (i.isScrollable = l(c) || l(c.parent()), n.fancybox.isMobile && i.isScrollable || o.preventDefault(), (1 === i.startPoints.length || u.hasError) && (i.canPan ? (n.fancybox.stop(i.$content), i.isPanning = !0) : i.isSwiping = !0, i.$container.addClass("fancybox-is-grabbing")), 2 === i.startPoints.length && "image" === u.type && (u.isLoaded || u.$ghost) && (i.canTap = !1, i.isSwiping = !1, i.isPanning = !1, i.isZooming = !0, n.fancybox.stop(i.$content), i.centerPointStartX = .5 * (i.startPoints[0].x + i.startPoints[1].x) - n(t).scrollLeft(), i.centerPointStartY = .5 * (i.startPoints[0].y + i.startPoints[1].y) - n(t).scrollTop(), i.percentageOfImageAtPinchPointX = (i.centerPointStartX - i.contentStartPos.left) / i.contentStartPos.width, i.percentageOfImageAtPinchPointY = (i.centerPointStartY - i.contentStartPos.top) / i.contentStartPos.height, i.startDistanceBetweenFingers = s(i.startPoints[0], i.startPoints[1]))))
        }
    }, d.prototype.onscroll = function(t) {
        var n = this;
        n.isScrolling = !0, e.removeEventListener("scroll", n.onscroll, !0)
    }, d.prototype.ontouchmove = function(t) {
        var e = this;
        return void 0 !== t.originalEvent.buttons && 0 === t.originalEvent.buttons ? void e.ontouchend(t) : e.isScrolling ? void(e.canTap = !1) : (e.newPoints = a(t), void((e.opts || e.canPan) && e.newPoints.length && e.newPoints.length && (e.isSwiping && !0 === e.isSwiping || t.preventDefault(), e.distanceX = s(e.newPoints[0], e.startPoints[0], "x"), e.distanceY = s(e.newPoints[0], e.startPoints[0], "y"), e.distance = s(e.newPoints[0], e.startPoints[0]), e.distance > 0 && (e.isSwiping ? e.onSwipe(t) : e.isPanning ? e.onPan() : e.isZooming && e.onZoom()))))
    }, d.prototype.onSwipe = function(e) {
        var a, s = this,
            r = s.instance,
            c = s.isSwiping,
            l = s.sliderStartPos.left || 0;
        if (!0 !== c) "x" == c && (s.distanceX > 0 && (s.instance.group.length < 2 || 0 === s.instance.current.index && !s.instance.current.opts.loop) ? l += Math.pow(s.distanceX, .8) : s.distanceX < 0 && (s.instance.group.length < 2 || s.instance.current.index === s.instance.group.length - 1 && !s.instance.current.opts.loop) ? l -= Math.pow(-s.distanceX, .8) : l += s.distanceX), s.sliderLastPos = {
            top: "x" == c ? 0 : s.sliderStartPos.top + s.distanceY,
            left: l
        }, s.requestId && (i(s.requestId), s.requestId = null), s.requestId = o(function() {
            s.sliderLastPos && (n.each(s.instance.slides, function(t, e) {
                var o = e.pos - s.instance.currPos;
                n.fancybox.setTranslate(e.$slide, {
                    top: s.sliderLastPos.top,
                    left: s.sliderLastPos.left + o * s.canvasWidth + o * e.opts.gutter
                })
            }), s.$container.addClass("fancybox-is-sliding"))
        });
        else if (Math.abs(s.distance) > 10) {
            if (s.canTap = !1, r.group.length < 2 && s.opts.vertical ? s.isSwiping = "y" : r.isDragging || !1 === s.opts.vertical || "auto" === s.opts.vertical && n(t).width() > 800 ? s.isSwiping = "x" : (a = Math.abs(180 * Math.atan2(s.distanceY, s.distanceX) / Math.PI), s.isSwiping = a > 45 && a < 135 ? "y" : "x"), "y" === s.isSwiping && n.fancybox.isMobile && s.isScrollable) return void(s.isScrolling = !0);
            r.isDragging = s.isSwiping, s.startPoints = s.newPoints, n.each(r.slides, function(t, e) {
                var o, i;
                n.fancybox.stop(e.$slide), o = n.fancybox.getTranslate(e.$slide), i = n.fancybox.getTranslate(r.$refs.stage), e.$slide.css({
                    transform: "",
                    opacity: "",
                    "transition-duration": ""
                }).removeClass("fancybox-animated").removeClass(function(t, e) {
                    return (e.match(/(^|\s)fancybox-fx-\S+/g) || []).join(" ")
                }), e.pos === r.current.pos && (s.sliderStartPos.top = o.top - i.top, s.sliderStartPos.left = o.left - i.left), n.fancybox.setTranslate(e.$slide, {
                    top: o.top - i.top,
                    left: o.left - i.left
                })
            }), r.SlideShow && r.SlideShow.isActive && r.SlideShow.stop()
        }
    }, d.prototype.onPan = function() {
        var t = this;
        if (s(t.newPoints[0], t.realPoints[0]) < (n.fancybox.isMobile ? 10 : 5)) return void(t.startPoints = t.newPoints);
        t.canTap = !1, t.contentLastPos = t.limitMovement(), t.requestId && i(t.requestId), t.requestId = o(function() {
            n.fancybox.setTranslate(t.$content, t.contentLastPos)
        })
    }, d.prototype.limitMovement = function() {
        var t, e, n, o, i, a, s = this,
            r = s.canvasWidth,
            c = s.canvasHeight,
            l = s.distanceX,
            d = s.distanceY,
            u = s.contentStartPos,
            f = u.left,
            p = u.top,
            h = u.width,
            g = u.height;
        return i = h > r ? f + l : f, a = p + d, t = Math.max(0, .5 * r - .5 * h), e = Math.max(0, .5 * c - .5 * g), n = Math.min(r - h, .5 * r - .5 * h), o = Math.min(c - g, .5 * c - .5 * g), l > 0 && i > t && (i = t - 1 + Math.pow(-t + f + l, .8) || 0), l < 0 && i < n && (i = n + 1 - Math.pow(n - f - l, .8) || 0), d > 0 && a > e && (a = e - 1 + Math.pow(-e + p + d, .8) || 0), d < 0 && a < o && (a = o + 1 - Math.pow(o - p - d, .8) || 0), {
            top: a,
            left: i
        }
    }, d.prototype.limitPosition = function(t, e, n, o) {
        var i = this,
            a = i.canvasWidth,
            s = i.canvasHeight;
        return n > a ? (t = t > 0 ? 0 : t, t = t < a - n ? a - n : t) : t = Math.max(0, a / 2 - n / 2), o > s ? (e = e > 0 ? 0 : e, e = e < s - o ? s - o : e) : e = Math.max(0, s / 2 - o / 2), {
            top: e,
            left: t
        }
    }, d.prototype.onZoom = function() {
        var e = this,
            a = e.contentStartPos,
            r = a.width,
            c = a.height,
            l = a.left,
            d = a.top,
            u = s(e.newPoints[0], e.newPoints[1]),
            f = u / e.startDistanceBetweenFingers,
            p = Math.floor(r * f),
            h = Math.floor(c * f),
            g = (r - p) * e.percentageOfImageAtPinchPointX,
            b = (c - h) * e.percentageOfImageAtPinchPointY,
            m = (e.newPoints[0].x + e.newPoints[1].x) / 2 - n(t).scrollLeft(),
            v = (e.newPoints[0].y + e.newPoints[1].y) / 2 - n(t).scrollTop(),
            y = m - e.centerPointStartX,
            x = v - e.centerPointStartY,
            w = l + (g + y),
            $ = d + (b + x),
            S = {
                top: $,
                left: w,
                scaleX: f,
                scaleY: f
            };
        e.canTap = !1, e.newWidth = p, e.newHeight = h, e.contentLastPos = S, e.requestId && i(e.requestId), e.requestId = o(function() {
            n.fancybox.setTranslate(e.$content, e.contentLastPos)
        })
    }, d.prototype.ontouchend = function(t) {
        var o = this,
            s = o.isSwiping,
            r = o.isPanning,
            c = o.isZooming,
            l = o.isScrolling;
        if (o.endPoints = a(t), o.dMs = Math.max((new Date).getTime() - o.startTime, 1), o.$container.removeClass("fancybox-is-grabbing"), n(e).off(".fb.touch"), e.removeEventListener("scroll", o.onscroll, !0), o.requestId && (i(o.requestId), o.requestId = null), o.isSwiping = !1, o.isPanning = !1, o.isZooming = !1, o.isScrolling = !1, o.instance.isDragging = !1, o.canTap) return o.onTap(t);
        o.speed = 100, o.velocityX = o.distanceX / o.dMs * .5, o.velocityY = o.distanceY / o.dMs * .5, r ? o.endPanning() : c ? o.endZooming() : o.endSwiping(s, l)
    }, d.prototype.endSwiping = function(t, e) {
        var o = this,
            i = !1,
            a = o.instance.group.length,
            s = Math.abs(o.distanceX),
            r = "x" == t && a > 1 && (o.dMs > 130 && s > 10 || s > 50);
        o.sliderLastPos = null, "y" == t && !e && Math.abs(o.distanceY) > 50 ? (n.fancybox.animate(o.instance.current.$slide, {
            top: o.sliderStartPos.top + o.distanceY + 150 * o.velocityY,
            opacity: 0
        }, 200), i = o.instance.close(!0, 250)) : r && o.distanceX > 0 ? i = o.instance.previous(300) : r && o.distanceX < 0 && (i = o.instance.next(300)), !1 !== i || "x" != t && "y" != t || o.instance.centerSlide(200), o.$container.removeClass("fancybox-is-sliding")
    }, d.prototype.endPanning = function() {
        var t, e, o, i = this;
        i.contentLastPos && (!1 === i.opts.momentum || i.dMs > 350 ? (t = i.contentLastPos.left, e = i.contentLastPos.top) : (t = i.contentLastPos.left + 500 * i.velocityX, e = i.contentLastPos.top + 500 * i.velocityY), o = i.limitPosition(t, e, i.contentStartPos.width, i.contentStartPos.height), o.width = i.contentStartPos.width, o.height = i.contentStartPos.height, n.fancybox.animate(i.$content, o, 366))
    }, d.prototype.endZooming = function() {
        var t, e, o, i, a = this,
            s = a.instance.current,
            r = a.newWidth,
            c = a.newHeight;
        a.contentLastPos && (t = a.contentLastPos.left, e = a.contentLastPos.top, i = {
            top: e,
            left: t,
            width: r,
            height: c,
            scaleX: 1,
            scaleY: 1
        }, n.fancybox.setTranslate(a.$content, i), r < a.canvasWidth && c < a.canvasHeight ? a.instance.scaleToFit(150) : r > s.width || c > s.height ? a.instance.scaleToActual(a.centerPointStartX, a.centerPointStartY, 150) : (o = a.limitPosition(t, e, r, c), n.fancybox.animate(a.$content, o, 150)))
    }, d.prototype.onTap = function(e) {
        var o, i = this,
            s = n(e.target),
            r = i.instance,
            c = r.current,
            l = e && a(e) || i.startPoints,
            d = l[0] ? l[0].x - n(t).scrollLeft() - i.stagePos.left : 0,
            u = l[0] ? l[0].y - n(t).scrollTop() - i.stagePos.top : 0,
            f = function(t) {
                var o = c.opts[t];
                if (n.isFunction(o) && (o = o.apply(r, [c, e])), o) switch (o) {
                    case "close":
                        r.close(i.startEvent);
                        break;
                    case "toggleControls":
                        r.toggleControls();
                        break;
                    case "next":
                        r.next();
                        break;
                    case "nextOrClose":
                        r.group.length > 1 ? r.next() : r.close(i.startEvent);
                        break;
                    case "zoom":
                        "image" == c.type && (c.isLoaded || c.$ghost) && (r.canPan() ? r.scaleToFit() : r.isScaledDown() ? r.scaleToActual(d, u) : r.group.length < 2 && r.close(i.startEvent))
                }
            };
        if ((!e.originalEvent || 2 != e.originalEvent.button) && (s.is("img") || !(d > s[0].clientWidth + s.offset().left))) {
            if (s.is(".fancybox-bg,.fancybox-inner,.fancybox-outer,.fancybox-container")) o = "Outside";
            else if (s.is(".fancybox-slide")) o = "Slide";
            else {
                if (!r.current.$content || !r.current.$content.find(s).addBack().filter(s).length) return;
                o = "Content"
            }
            if (i.tapped) {
                if (clearTimeout(i.tapped), i.tapped = null, Math.abs(d - i.tapX) > 50 || Math.abs(u - i.tapY) > 50) return this;
                f("dblclick" + o)
            } else i.tapX = d, i.tapY = u, c.opts["dblclick" + o] && c.opts["dblclick" + o] !== c.opts["click" + o] ? i.tapped = setTimeout(function() {
                i.tapped = null, r.isAnimating || f("click" + o)
            }, 500) : f("click" + o);
            return this
        }
    }, n(e).on("onActivate.fb", function(t, e) {
        e && !e.Guestures && (e.Guestures = new d(e))
    }).on("beforeClose.fb", function(t, e) {
        e && e.Guestures && e.Guestures.destroy()
    })
}(window, document, jQuery),
function(t, e) {
    "use strict";
    e.extend(!0, e.fancybox.defaults, {
        btnTpl: {
            slideShow: '<button data-fancybox-play class="fancybox-button fancybox-button--play" title="{{PLAY_START}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6.5 5.4v13.2l11-6.6z"/></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8.33 5.75h2.2v12.5h-2.2V5.75zm5.15 0h2.2v12.5h-2.2V5.75z"/></svg></button>'
        },
        slideShow: {
            autoStart: !1,
            speed: 3e3,
            progress: !0
        }
    });
    var n = function(t) {
        this.instance = t, this.init()
    };
    e.extend(n.prototype, {
        timer: null,
        isActive: !1,
        $button: null,
        init: function() {
            var t = this,
                n = t.instance,
                o = n.group[n.currIndex].opts.slideShow;
            t.$button = n.$refs.toolbar.find("[data-fancybox-play]").on("click", function() {
                t.toggle()
            }), n.group.length < 2 || !o ? t.$button.hide() : o.progress && (t.$progress = e('<div class="fancybox-progress"></div>').appendTo(n.$refs.inner))
        },
        set: function(t) {
            var n = this,
                o = n.instance,
                i = o.current;
            i && (!0 === t || i.opts.loop || o.currIndex < o.group.length - 1) ? n.isActive && "video" !== i.contentType && (n.$progress && e.fancybox.animate(n.$progress.show(), {
                scaleX: 1
            }, i.opts.slideShow.speed), n.timer = setTimeout(function() {
                o.current.opts.loop || o.current.index != o.group.length - 1 ? o.next() : o.jumpTo(0)
            }, i.opts.slideShow.speed)) : (n.stop(), o.idleSecondsCounter = 0, o.showControls())
        },
        clear: function() {
            var t = this;
            clearTimeout(t.timer), t.timer = null, t.$progress && t.$progress.removeAttr("style").hide()
        },
        start: function() {
            var t = this,
                e = t.instance.current;
            e && (t.$button.attr("title", (e.opts.i18n[e.opts.lang] || e.opts.i18n.en).PLAY_STOP).removeClass("fancybox-button--play").addClass("fancybox-button--pause"), t.isActive = !0, e.isComplete && t.set(!0), t.instance.trigger("onSlideShowChange", !0))
        },
        stop: function() {
            var t = this,
                e = t.instance.current;
            t.clear(), t.$button.attr("title", (e.opts.i18n[e.opts.lang] || e.opts.i18n.en).PLAY_START).removeClass("fancybox-button--pause").addClass("fancybox-button--play"), t.isActive = !1, t.instance.trigger("onSlideShowChange", !1), t.$progress && t.$progress.removeAttr("style").hide()
        },
        toggle: function() {
            var t = this;
            t.isActive ? t.stop() : t.start()
        }
    }), e(t).on({
        "onInit.fb": function(t, e) {
            e && !e.SlideShow && (e.SlideShow = new n(e))
        },
        "beforeShow.fb": function(t, e, n, o) {
            var i = e && e.SlideShow;
            o ? i && n.opts.slideShow.autoStart && i.start() : i && i.isActive && i.clear()
        },
        "afterShow.fb": function(t, e, n) {
            var o = e && e.SlideShow;
            o && o.isActive && o.set()
        },
        "afterKeydown.fb": function(n, o, i, a, s) {
            var r = o && o.SlideShow;
            !r || !i.opts.slideShow || 80 !== s && 32 !== s || e(t.activeElement).is("button,a,input") || (a.preventDefault(), r.toggle())
        },
        "beforeClose.fb onDeactivate.fb": function(t, e) {
            var n = e && e.SlideShow;
            n && n.stop()
        }
    }), e(t).on("visibilitychange", function() {
        var n = e.fancybox.getInstance(),
            o = n && n.SlideShow;
        o && o.isActive && (t.hidden ? o.clear() : o.set())
    })
}(document, jQuery),
function(t, e) {
    "use strict";
    var n = function() {
        for (var e = [
                ["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"],
                ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"],
                ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"],
                ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"],
                ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]
            ], n = {}, o = 0; o < e.length; o++) {
            var i = e[o];
            if (i && i[1] in t) {
                for (var a = 0; a < i.length; a++) n[e[0][a]] = i[a];
                return n
            }
        }
        return !1
    }();
    if (n) {
        var o = {
            request: function(e) {
                e = e || t.documentElement, e[n.requestFullscreen](e.ALLOW_KEYBOARD_INPUT)
            },
            exit: function() {
                t[n.exitFullscreen]()
            },
            toggle: function(e) {
                e = e || t.documentElement, this.isFullscreen() ? this.exit() : this.request(e)
            },
            isFullscreen: function() {
                return Boolean(t[n.fullscreenElement])
            },
            enabled: function() {
                return Boolean(t[n.fullscreenEnabled])
            }
        };
        e.extend(!0, e.fancybox.defaults, {
            btnTpl: {
                fullScreen: '<button data-fancybox-fullscreen class="fancybox-button fancybox-button--fsenter" title="{{FULL_SCREEN}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 16h3v3h2v-5H5zm3-8H5v2h5V5H8zm6 11h2v-3h3v-2h-5zm2-11V5h-2v5h5V8z"/></svg></button>'
            },
            fullScreen: {
                autoStart: !1
            }
        }), e(t).on(n.fullscreenchange, function() {
            var t = o.isFullscreen(),
                n = e.fancybox.getInstance();
            n && (n.current && "image" === n.current.type && n.isAnimating && (n.isAnimating = !1, n.update(!0, !0, 0), n.isComplete || n.complete()), n.trigger("onFullscreenChange", t), n.$refs.container.toggleClass("fancybox-is-fullscreen", t), n.$refs.toolbar.find("[data-fancybox-fullscreen]").toggleClass("fancybox-button--fsenter", !t).toggleClass("fancybox-button--fsexit", t))
        })
    }
    e(t).on({
        "onInit.fb": function(t, e) {
            var i;
            if (!n) return void e.$refs.toolbar.find("[data-fancybox-fullscreen]").remove();
            e && e.group[e.currIndex].opts.fullScreen ? (i = e.$refs.container, i.on("click.fb-fullscreen", "[data-fancybox-fullscreen]", function(t) {
                t.stopPropagation(), t.preventDefault(), o.toggle()
            }), e.opts.fullScreen && !0 === e.opts.fullScreen.autoStart && o.request(), e.FullScreen = o) : e && e.$refs.toolbar.find("[data-fancybox-fullscreen]").hide()
        },
        "afterKeydown.fb": function(t, e, n, o, i) {
            e && e.FullScreen && 70 === i && (o.preventDefault(), e.FullScreen.toggle())
        },
        "beforeClose.fb": function(t, e) {
            e && e.FullScreen && e.$refs.container.hasClass("fancybox-is-fullscreen") && o.exit()
        }
    })
}(document, jQuery),
function(t, e) {
    "use strict";
    var n = "fancybox-thumbs";
    e.fancybox.defaults = e.extend(!0, {
        btnTpl: {
            thumbs: '<button data-fancybox-thumbs class="fancybox-button fancybox-button--thumbs" title="{{THUMBS}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14.59 14.59h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76V5.65zm-4.47 0h3.76v3.76h-3.76V5.65zm-4.47 0h3.76v3.76H5.65V5.65z"/></svg></button>'
        },
        thumbs: {
            autoStart: !1,
            hideOnClose: !0,
            parentEl: ".fancybox-container",
            axis: "y"
        }
    }, e.fancybox.defaults);
    var o = function(t) {
        this.init(t)
    };
    e.extend(o.prototype, {
        $button: null,
        $grid: null,
        $list: null,
        isVisible: !1,
        isActive: !1,
        init: function(t) {
            var e = this,
                n = t.group,
                o = 0;
            e.instance = t, e.opts = n[t.currIndex].opts.thumbs, t.Thumbs = e, e.$button = t.$refs.toolbar.find("[data-fancybox-thumbs]");
            for (var i = 0, a = n.length; i < a && (n[i].thumb && o++, !(o > 1)); i++);
            o > 1 && e.opts ? (e.$button.removeAttr("style").on("click", function() {
                e.toggle()
            }), e.isActive = !0) : e.$button.hide()
        },
        create: function() {
            var t, o = this,
                i = o.instance,
                a = o.opts.parentEl,
                s = [];
            o.$grid || (o.$grid = e('<div class="' + n + " " + n + "-" + o.opts.axis + '"></div>').appendTo(i.$refs.container.find(a).addBack().filter(a)), o.$grid.on("click", "a", function() {
                i.jumpTo(e(this).attr("data-index"))
            })), o.$list || (o.$list = e('<div class="' + n + '__list">').appendTo(o.$grid)), e.each(i.group, function(e, n) {
                t = n.thumb, t || "image" !== n.type || (t = n.src), s.push('<a href="javascript:;" tabindex="0" data-index="' + e + '"' + (t && t.length ? ' style="background-image:url(' + t + ')"' : 'class="fancybox-thumbs-missing"') + "></a>")
            }), o.$list[0].innerHTML = s.join(""), "x" === o.opts.axis && o.$list.width(parseInt(o.$grid.css("padding-right"), 10) + i.group.length * o.$list.children().eq(0).outerWidth(!0))
        },
        focus: function(t) {
            var e, n, o = this,
                i = o.$list,
                a = o.$grid;
            o.instance.current && (e = i.children().removeClass("fancybox-thumbs-active").filter('[data-index="' + o.instance.current.index + '"]').addClass("fancybox-thumbs-active"), n = e.position(), "y" === o.opts.axis && (n.top < 0 || n.top > i.height() - e.outerHeight()) ? i.stop().animate({
                scrollTop: i.scrollTop() + n.top
            }, t) : "x" === o.opts.axis && (n.left < a.scrollLeft() || n.left > a.scrollLeft() + (a.width() - e.outerWidth())) && i.parent().stop().animate({
                scrollLeft: n.left
            }, t))
        },
        update: function() {
            var t = this;
            t.instance.$refs.container.toggleClass("fancybox-show-thumbs", this.isVisible), t.isVisible ? (t.$grid || t.create(), t.instance.trigger("onThumbsShow"), t.focus(0)) : t.$grid && t.instance.trigger("onThumbsHide"), t.instance.update()
        },
        hide: function() {
            this.isVisible = !1, this.update()
        },
        show: function() {
            this.isVisible = !0, this.update()
        },
        toggle: function() {
            this.isVisible = !this.isVisible, this.update()
        }
    }), e(t).on({
        "onInit.fb": function(t, e) {
            var n;
            e && !e.Thumbs && (n = new o(e), n.isActive && !0 === n.opts.autoStart && n.show())
        },
        "beforeShow.fb": function(t, e, n, o) {
            var i = e && e.Thumbs;
            i && i.isVisible && i.focus(o ? 0 : 250)
        },
        "afterKeydown.fb": function(t, e, n, o, i) {
            var a = e && e.Thumbs;
            a && a.isActive && 71 === i && (o.preventDefault(), a.toggle())
        },
        "beforeClose.fb": function(t, e) {
            var n = e && e.Thumbs;
            n && n.isVisible && !1 !== n.opts.hideOnClose && n.$grid.hide()
        }
    })
}(document, jQuery),
function(t, e) {
    "use strict";

    function n(t) {
        var e = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
            "/": "&#x2F;",
            "`": "&#x60;",
            "=": "&#x3D;"
        };
        return String(t).replace(/[&<>"'`=\/]/g, function(t) {
            return e[t]
        })
    }
    e.extend(!0, e.fancybox.defaults, {
        btnTpl: {
            share: '<button data-fancybox-share class="fancybox-button fancybox-button--share" title="{{SHARE}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M2.55 19c1.4-8.4 9.1-9.8 11.9-9.8V5l7 7-7 6.3v-3.5c-2.8 0-10.5 2.1-11.9 4.2z"/></svg></button>'
        },
        share: {
            url: function(t, e) {
                return !t.currentHash && "inline" !== e.type && "html" !== e.type && (e.origSrc || e.src) || window.location
            },
            tpl: '<div class="fancybox-share"><h1>{{SHARE}}</h1><p><a class="fancybox-share__button fancybox-share__button--fb" href="https://www.facebook.com/sharer/sharer.php?u={{url}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m287 456v-299c0-21 6-35 35-35h38v-63c-7-1-29-3-55-3-54 0-91 33-91 94v306m143-254h-205v72h196" /></svg><span>Facebook</span></a><a class="fancybox-share__button fancybox-share__button--tw" href="https://twitter.com/intent/tweet?url={{url}}&text={{descr}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m456 133c-14 7-31 11-47 13 17-10 30-27 37-46-15 10-34 16-52 20-61-62-157-7-141 75-68-3-129-35-169-85-22 37-11 86 26 109-13 0-26-4-37-9 0 39 28 72 65 80-12 3-25 4-37 2 10 33 41 57 77 57-42 30-77 38-122 34 170 111 378-32 359-208 16-11 30-25 41-42z" /></svg><span>Twitter</span></a><a class="fancybox-share__button fancybox-share__button--pt" href="https://www.pinterest.com/pin/create/button/?url={{url}}&description={{descr}}&media={{media}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m265 56c-109 0-164 78-164 144 0 39 15 74 47 87 5 2 10 0 12-5l4-19c2-6 1-8-3-13-9-11-15-25-15-45 0-58 43-110 113-110 62 0 96 38 96 88 0 67-30 122-73 122-24 0-42-19-36-44 6-29 20-60 20-81 0-19-10-35-31-35-25 0-44 26-44 60 0 21 7 36 7 36l-30 125c-8 37-1 83 0 87 0 3 4 4 5 2 2-3 32-39 42-75l16-64c8 16 31 29 56 29 74 0 124-67 124-157 0-69-58-132-146-132z" fill="#fff"/></svg><span>Pinterest</span></a></p><p><input class="fancybox-share__input" type="text" value="{{url_raw}}" onclick="select()" /></p></div>'
        }
    }), e(t).on("click", "[data-fancybox-share]", function() {
        var t, o, i = e.fancybox.getInstance(),
            a = i.current || null;
        a && ("function" === e.type(a.opts.share.url) && (t = a.opts.share.url.apply(a, [i, a])), o = a.opts.share.tpl.replace(/\{\{media\}\}/g, "image" === a.type ? encodeURIComponent(a.src) : "").replace(/\{\{url\}\}/g, encodeURIComponent(t)).replace(/\{\{url_raw\}\}/g, n(t)).replace(/\{\{descr\}\}/g, i.$caption ? encodeURIComponent(i.$caption.text()) : ""), e.fancybox.open({
            src: i.translate(i, o),
            type: "html",
            opts: {
                touch: !1,
                animationEffect: !1,
                afterLoad: function(t, e) {
                    i.$refs.container.one("beforeClose.fb", function() {
                        t.close(null, 0)
                    }), e.$content.find(".fancybox-share__button").click(function() {
                        return window.open(this.href, "Share", "width=550, height=450"), !1
                    })
                },
                mobile: {
                    autoFocus: !1
                }
            }
        }))
    })
}(document, jQuery),
function(t, e, n) {
    "use strict";

    function o() {
        var e = t.location.hash.substr(1),
            n = e.split("-"),
            o = n.length > 1 && /^\+?\d+$/.test(n[n.length - 1]) ? parseInt(n.pop(-1), 10) || 1 : 1,
            i = n.join("-");
        return {
            hash: e,
            index: o < 1 ? 1 : o,
            gallery: i
        }
    }

    function i(t) {
        "" !== t.gallery && n("[data-fancybox='" + n.escapeSelector(t.gallery) + "']").eq(t.index - 1).focus().trigger("click.fb-start")
    }

    function a(t) {
        var e, n;
        return !!t && (e = t.current ? t.current.opts : t.opts, "" !== (n = e.hash || (e.$orig ? e.$orig.data("fancybox") || e.$orig.data("fancybox-trigger") : "")) && n)
    }
    n.escapeSelector || (n.escapeSelector = function(t) {
        return (t + "").replace(/([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g, function(t, e) {
            return e ? "\0" === t ? "�" : t.slice(0, -1) + "\\" + t.charCodeAt(t.length - 1).toString(16) + " " : "\\" + t
        })
    }), n(function() {
        !1 !== n.fancybox.defaults.hash && (n(e).on({
            "onInit.fb": function(t, e) {
                var n, i;
                !1 !== e.group[e.currIndex].opts.hash && (n = o(), (i = a(e)) && n.gallery && i == n.gallery && (e.currIndex = n.index - 1))
            },
            "beforeShow.fb": function(n, o, i, s) {
                var r;
                i && !1 !== i.opts.hash && (r = a(o)) && (o.currentHash = r + (o.group.length > 1 ? "-" + (i.index + 1) : ""), t.location.hash !== "#" + o.currentHash && (s && !o.origHash && (o.origHash = t.location.hash), o.hashTimer && clearTimeout(o.hashTimer), o.hashTimer = setTimeout(function() {
                    "replaceState" in t.history ? (t.history[s ? "pushState" : "replaceState"]({}, e.title, t.location.pathname + t.location.search + "#" + o.currentHash), s && (o.hasCreatedHistory = !0)) : t.location.hash = o.currentHash, o.hashTimer = null
                }, 300)))
            },
            "beforeClose.fb": function(n, o, i) {
                i && !1 !== i.opts.hash && (clearTimeout(o.hashTimer), o.currentHash && o.hasCreatedHistory ? t.history.back() : o.currentHash && ("replaceState" in t.history ? t.history.replaceState({}, e.title, t.location.pathname + t.location.search + (o.origHash || "")) : t.location.hash = o.origHash), o.currentHash = null)
            }
        }), n(t).on("hashchange.fb", function() {
            var t = o(),
                e = null;
            n.each(n(".fancybox-container").get().reverse(), function(t, o) {
                var i = n(o).data("FancyBox");
                if (i && i.currentHash) return e = i, !1
            }), e ? e.currentHash === t.gallery + "-" + t.index || 1 === t.index && e.currentHash == t.gallery || (e.currentHash = null, e.close()) : "" !== t.gallery && i(t)
        }), setTimeout(function() {
            n.fancybox.getInstance() || i(o())
        }, 50))
    })
}(window, document, jQuery),
function(t, e) {
    "use strict";
    var n = (new Date).getTime();
    e(t).on({
        "onInit.fb": function(t, e, o) {
            e.$refs.stage.on("mousewheel DOMMouseScroll wheel MozMousePixelScroll", function(t) {
                var o = e.current,
                    i = (new Date).getTime();
                e.group.length < 2 || !1 === o.opts.wheel || "auto" === o.opts.wheel && "image" !== o.type || (t.preventDefault(), t.stopPropagation(), o.$slide.hasClass("fancybox-animated") || (t = t.originalEvent || t, i - n < 250 || (n = i, e[(-t.deltaY || -t.deltaX || t.wheelDelta || -t.detail) < 0 ? "next" : "previous"]())))
            })
        }
    })
}(document, jQuery);;

//# sourceMappingURL=/sm/d886d129190309198b3ae65a806d2a13df4af7598c816ecbda393d8533302d9a.map
/*!
 * typeahead.js 0.11.1
 * https://github.com/twitter/typeahead.js
 * Copyright 2013-2015 Twitter, Inc. and other contributors; Licensed MIT
 */
! function(a, b) {
    "function" == typeof define && define.amd ? define("bloodhound", ["jquery"], function(c) {
        return a.Bloodhound = b(c)
    }) : "object" == typeof exports ? module.exports = b(require("jquery")) : a.Bloodhound = b(jQuery)
}(this, function(a) {
    var b = function() {
            "use strict";
            return {
                isMsie: function() {
                    return /(msie|trident)/i.test(navigator.userAgent) ? navigator.userAgent.match(/(msie |rv:)(\d+(.\d+)?)/i)[2] : !1
                },
                isBlankString: function(a) {
                    return !a || /^\s*$/.test(a)
                },
                escapeRegExChars: function(a) {
                    return a.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
                },
                isString: function(a) {
                    return "string" == typeof a
                },
                isNumber: function(a) {
                    return "number" == typeof a
                },
                isArray: a.isArray,
                isFunction: a.isFunction,
                isObject: a.isPlainObject,
                isUndefined: function(a) {
                    return "undefined" == typeof a
                },
                isElement: function(a) {
                    return !(!a || 1 !== a.nodeType)
                },
                isJQuery: function(b) {
                    return b instanceof a
                },
                toStr: function(a) {
                    return b.isUndefined(a) || null === a ? "" : a + ""
                },
                bind: a.proxy,
                each: function(b, c) {
                    function d(a, b) {
                        return c(b, a)
                    }
                    a.each(b, d)
                },
                map: a.map,
                filter: a.grep,
                every: function(b, c) {
                    var d = !0;
                    return b ? (a.each(b, function(a, e) {
                        return (d = c.call(null, e, a, b)) ? void 0 : !1
                    }), !!d) : d
                },
                some: function(b, c) {
                    var d = !1;
                    return b ? (a.each(b, function(a, e) {
                        return (d = c.call(null, e, a, b)) ? !1 : void 0
                    }), !!d) : d
                },
                mixin: a.extend,
                identity: function(a) {
                    return a
                },
                clone: function(b) {
                    return a.extend(!0, {}, b)
                },
                getIdGenerator: function() {
                    var a = 0;
                    return function() {
                        return a++
                    }
                },
                templatify: function(b) {
                    function c() {
                        return String(b)
                    }
                    return a.isFunction(b) ? b : c
                },
                defer: function(a) {
                    setTimeout(a, 0)
                },
                debounce: function(a, b, c) {
                    var d, e;
                    return function() {
                        var f, g, h = this,
                            i = arguments;
                        return f = function() {
                            d = null, c || (e = a.apply(h, i))
                        }, g = c && !d, clearTimeout(d), d = setTimeout(f, b), g && (e = a.apply(h, i)), e
                    }
                },
                throttle: function(a, b) {
                    var c, d, e, f, g, h;
                    return g = 0, h = function() {
                            g = new Date, e = null, f = a.apply(c, d)
                        },
                        function() {
                            var i = new Date,
                                j = b - (i - g);
                            return c = this, d = arguments, 0 >= j ? (clearTimeout(e), e = null, g = i, f = a.apply(c, d)) : e || (e = setTimeout(h, j)), f
                        }
                },
                stringify: function(a) {
                    return b.isString(a) ? a : JSON.stringify(a)
                },
                noop: function() {}
            }
        }(),
        c = "0.11.1",
        d = function() {
            "use strict";

            function a(a) {
                return a = b.toStr(a), a ? a.split(/\s+/) : []
            }

            function c(a) {
                return a = b.toStr(a), a ? a.split(/\W+/) : []
            }

            function d(a) {
                return function(c) {
                    return c = b.isArray(c) ? c : [].slice.call(arguments, 0),
                        function(d) {
                            var e = [];
                            return b.each(c, function(c) {
                                e = e.concat(a(b.toStr(d[c])))
                            }), e
                        }
                }
            }
            return {
                nonword: c,
                whitespace: a,
                obj: {
                    nonword: d(c),
                    whitespace: d(a)
                }
            }
        }(),
        e = function() {
            "use strict";

            function c(c) {
                this.maxSize = b.isNumber(c) ? c : 100, this.reset(), this.maxSize <= 0 && (this.set = this.get = a.noop)
            }

            function d() {
                this.head = this.tail = null
            }

            function e(a, b) {
                this.key = a, this.val = b, this.prev = this.next = null
            }
            return b.mixin(c.prototype, {
                set: function(a, b) {
                    var c, d = this.list.tail;
                    this.size >= this.maxSize && (this.list.remove(d), delete this.hash[d.key], this.size--), (c = this.hash[a]) ? (c.val = b, this.list.moveToFront(c)) : (c = new e(a, b), this.list.add(c), this.hash[a] = c, this.size++)
                },
                get: function(a) {
                    var b = this.hash[a];
                    return b ? (this.list.moveToFront(b), b.val) : void 0
                },
                reset: function() {
                    this.size = 0, this.hash = {}, this.list = new d
                }
            }), b.mixin(d.prototype, {
                add: function(a) {
                    this.head && (a.next = this.head, this.head.prev = a), this.head = a, this.tail = this.tail || a
                },
                remove: function(a) {
                    a.prev ? a.prev.next = a.next : this.head = a.next, a.next ? a.next.prev = a.prev : this.tail = a.prev
                },
                moveToFront: function(a) {
                    this.remove(a), this.add(a)
                }
            }), c
        }(),
        f = function() {
            "use strict";

            function c(a, c) {
                this.prefix = ["__", a, "__"].join(""), this.ttlKey = "__ttl__", this.keyMatcher = new RegExp("^" + b.escapeRegExChars(this.prefix)), this.ls = c || h, !this.ls && this._noop()
            }

            function d() {
                return (new Date).getTime()
            }

            function e(a) {
                return JSON.stringify(b.isUndefined(a) ? null : a)
            }

            function f(b) {
                return a.parseJSON(b)
            }

            function g(a) {
                var b, c, d = [],
                    e = h.length;
                for (b = 0; e > b; b++)(c = h.key(b)).match(a) && d.push(c.replace(a, ""));
                return d
            }
            var h;
            try {
                h = window.localStorage, h.setItem("~~~", "!"), h.removeItem("~~~")
            } catch (i) {
                h = null
            }
            return b.mixin(c.prototype, {
                _prefix: function(a) {
                    return this.prefix + a
                },
                _ttlKey: function(a) {
                    return this._prefix(a) + this.ttlKey
                },
                _noop: function() {
                    this.get = this.set = this.remove = this.clear = this.isExpired = b.noop
                },
                _safeSet: function(a, b) {
                    try {
                        this.ls.setItem(a, b)
                    } catch (c) {
                        "QuotaExceededError" === c.name && (this.clear(), this._noop())
                    }
                },
                get: function(a) {
                    return this.isExpired(a) && this.remove(a), f(this.ls.getItem(this._prefix(a)))
                },
                set: function(a, c, f) {
                    return b.isNumber(f) ? this._safeSet(this._ttlKey(a), e(d() + f)) : this.ls.removeItem(this._ttlKey(a)), this._safeSet(this._prefix(a), e(c))
                },
                remove: function(a) {
                    return this.ls.removeItem(this._ttlKey(a)), this.ls.removeItem(this._prefix(a)), this
                },
                clear: function() {
                    var a, b = g(this.keyMatcher);
                    for (a = b.length; a--;) this.remove(b[a]);
                    return this
                },
                isExpired: function(a) {
                    var c = f(this.ls.getItem(this._ttlKey(a)));
                    return b.isNumber(c) && d() > c ? !0 : !1
                }
            }), c
        }(),
        g = function() {
            "use strict";

            function c(a) {
                a = a || {}, this.cancelled = !1, this.lastReq = null, this._send = a.transport, this._get = a.limiter ? a.limiter(this._get) : this._get, this._cache = a.cache === !1 ? new e(0) : h
            }
            var d = 0,
                f = {},
                g = 6,
                h = new e(10);
            return c.setMaxPendingRequests = function(a) {
                g = a
            }, c.resetCache = function() {
                h.reset()
            }, b.mixin(c.prototype, {
                _fingerprint: function(b) {
                    return b = b || {}, b.url + b.type + a.param(b.data || {})
                },
                _get: function(a, b) {
                    function c(a) {
                        b(null, a), k._cache.set(i, a)
                    }

                    function e() {
                        b(!0)
                    }

                    function h() {
                        d--, delete f[i], k.onDeckRequestArgs && (k._get.apply(k, k.onDeckRequestArgs), k.onDeckRequestArgs = null)
                    }
                    var i, j, k = this;
                    i = this._fingerprint(a), this.cancelled || i !== this.lastReq || ((j = f[i]) ? j.done(c).fail(e) : g > d ? (d++, f[i] = this._send(a).done(c).fail(e).always(h)) : this.onDeckRequestArgs = [].slice.call(arguments, 0))
                },
                get: function(c, d) {
                    var e, f;
                    d = d || a.noop, c = b.isString(c) ? {
                        url: c
                    } : c || {}, f = this._fingerprint(c), this.cancelled = !1, this.lastReq = f, (e = this._cache.get(f)) ? d(null, e) : this._get(c, d)
                },
                cancel: function() {
                    this.cancelled = !0
                }
            }), c
        }(),
        h = window.SearchIndex = function() {
            "use strict";

            function c(c) {
                c = c || {}, c.datumTokenizer && c.queryTokenizer || a.error("datumTokenizer and queryTokenizer are both required"), this.identify = c.identify || b.stringify, this.datumTokenizer = c.datumTokenizer, this.queryTokenizer = c.queryTokenizer, this.reset()
            }

            function d(a) {
                return a = b.filter(a, function(a) {
                    return !!a
                }), a = b.map(a, function(a) {
                    return a.toLowerCase()
                })
            }

            function e() {
                var a = {};
                return a[i] = [], a[h] = {}, a
            }

            function f(a) {
                for (var b = {}, c = [], d = 0, e = a.length; e > d; d++) b[a[d]] || (b[a[d]] = !0, c.push(a[d]));
                return c
            }

            function g(a, b) {
                var c = 0,
                    d = 0,
                    e = [];
                a = a.sort(), b = b.sort();
                for (var f = a.length, g = b.length; f > c && g > d;) a[c] < b[d] ? c++ : a[c] > b[d] ? d++ : (e.push(a[c]), c++, d++);
                return e
            }
            var h = "c",
                i = "i";
            return b.mixin(c.prototype, {
                bootstrap: function(a) {
                    this.datums = a.datums, this.trie = a.trie
                },
                add: function(a) {
                    var c = this;
                    a = b.isArray(a) ? a : [a], b.each(a, function(a) {
                        var f, g;
                        c.datums[f = c.identify(a)] = a, g = d(c.datumTokenizer(a)), b.each(g, function(a) {
                            var b, d, g;
                            for (b = c.trie, d = a.split(""); g = d.shift();) b = b[h][g] || (b[h][g] = e()), b[i].push(f)
                        })
                    })
                },
                get: function(a) {
                    var c = this;
                    return b.map(a, function(a) {
                        return c.datums[a]
                    })
                },
                search: function(a) {
                    var c, e, j = this;
                    return c = d(this.queryTokenizer(a)), b.each(c, function(a) {
                        var b, c, d, f;
                        if (e && 0 === e.length) return !1;
                        for (b = j.trie, c = a.split(""); b && (d = c.shift());) b = b[h][d];
                        return b && 0 === c.length ? (f = b[i].slice(0), void(e = e ? g(e, f) : f)) : (e = [], !1)
                    }), e ? b.map(f(e), function(a) {
                        return j.datums[a]
                    }) : []
                },
                all: function() {
                    var a = [];
                    for (var b in this.datums) a.push(this.datums[b]);
                    return a
                },
                reset: function() {
                    this.datums = {}, this.trie = e()
                },
                serialize: function() {
                    return {
                        datums: this.datums,
                        trie: this.trie
                    }
                }
            }), c
        }(),
        i = function() {
            "use strict";

            function a(a) {
                this.url = a.url, this.ttl = a.ttl, this.cache = a.cache, this.prepare = a.prepare, this.transform = a.transform, this.transport = a.transport, this.thumbprint = a.thumbprint, this.storage = new f(a.cacheKey)
            }
            var c;
            return c = {
                data: "data",
                protocol: "protocol",
                thumbprint: "thumbprint"
            }, b.mixin(a.prototype, {
                _settings: function() {
                    return {
                        url: this.url,
                        type: "GET",
                        dataType: "json"
                    }
                },
                store: function(a) {
                    this.cache && (this.storage.set(c.data, a, this.ttl), this.storage.set(c.protocol, location.protocol, this.ttl), this.storage.set(c.thumbprint, this.thumbprint, this.ttl))
                },
                fromCache: function() {
                    var a, b = {};
                    return this.cache ? (b.data = this.storage.get(c.data), b.protocol = this.storage.get(c.protocol), b.thumbprint = this.storage.get(c.thumbprint), a = b.thumbprint !== this.thumbprint || b.protocol !== location.protocol, b.data && !a ? b.data : null) : null
                },
                fromNetwork: function(a) {
                    function b() {
                        a(!0)
                    }

                    function c(b) {
                        a(null, e.transform(b))
                    }
                    var d, e = this;
                    a && (d = this.prepare(this._settings()), this.transport(d).fail(b).done(c))
                },
                clear: function() {
                    return this.storage.clear(), this
                }
            }), a
        }(),
        j = function() {
            "use strict";

            function a(a) {
                this.url = a.url, this.prepare = a.prepare, this.transform = a.transform, this.transport = new g({
                    cache: a.cache,
                    limiter: a.limiter,
                    transport: a.transport
                })
            }
            return b.mixin(a.prototype, {
                _settings: function() {
                    return {
                        url: this.url,
                        type: "GET",
                        dataType: "json"
                    }
                },
                get: function(a, b) {
                    function c(a, c) {
                        b(a ? [] : e.transform(c))
                    }
                    var d, e = this;
                    if (b) return a = a || "", d = this.prepare(a, this._settings()), this.transport.get(d, c)
                },
                cancelLastRequest: function() {
                    this.transport.cancel()
                }
            }), a
        }(),
        k = function() {
            "use strict";

            function d(d) {
                var e;
                return d ? (e = {
                    url: null,
                    ttl: 864e5,
                    cache: !0,
                    cacheKey: null,
                    thumbprint: "",
                    prepare: b.identity,
                    transform: b.identity,
                    transport: null
                }, d = b.isString(d) ? {
                    url: d
                } : d, d = b.mixin(e, d), !d.url && a.error("prefetch requires url to be set"), d.transform = d.filter || d.transform, d.cacheKey = d.cacheKey || d.url, d.thumbprint = c + d.thumbprint, d.transport = d.transport ? h(d.transport) : a.ajax, d) : null
            }

            function e(c) {
                var d;
                if (c) return d = {
                    url: null,
                    cache: !0,
                    prepare: null,
                    replace: null,
                    wildcard: null,
                    limiter: null,
                    rateLimitBy: "debounce",
                    rateLimitWait: 300,
                    transform: b.identity,
                    transport: null
                }, c = b.isString(c) ? {
                    url: c
                } : c, c = b.mixin(d, c), !c.url && a.error("remote requires url to be set"), c.transform = c.filter || c.transform, c.prepare = f(c), c.limiter = g(c), c.transport = c.transport ? h(c.transport) : a.ajax, delete c.replace, delete c.wildcard, delete c.rateLimitBy, delete c.rateLimitWait, c
            }

            function f(a) {
                function b(a, b) {
                    return b.url = f(b.url, a), b
                }

                function c(a, b) {
                    return b.url = b.url.replace(g, encodeURIComponent(a)), b
                }

                function d(a, b) {
                    return b
                }
                var e, f, g;
                return e = a.prepare, f = a.replace, g = a.wildcard, e ? e : e = f ? b : a.wildcard ? c : d
            }

            function g(a) {
                function c(a) {
                    return function(c) {
                        return b.debounce(c, a)
                    }
                }

                function d(a) {
                    return function(c) {
                        return b.throttle(c, a)
                    }
                }
                var e, f, g;
                return e = a.limiter, f = a.rateLimitBy, g = a.rateLimitWait, e || (e = /^throttle$/i.test(f) ? d(g) : c(g)), e
            }

            function h(c) {
                return function(d) {
                    function e(a) {
                        b.defer(function() {
                            g.resolve(a)
                        })
                    }

                    function f(a) {
                        b.defer(function() {
                            g.reject(a)
                        })
                    }
                    var g = a.Deferred();
                    return c(d, e, f), g
                }
            }
            return function(c) {
                var f, g;
                return f = {
                    initialize: !0,
                    identify: b.stringify,
                    datumTokenizer: null,
                    queryTokenizer: null,
                    sufficient: 5,
                    sorter: null,
                    local: [],
                    prefetch: null,
                    remote: null
                }, c = b.mixin(f, c || {}), !c.datumTokenizer && a.error("datumTokenizer is required"), !c.queryTokenizer && a.error("queryTokenizer is required"), g = c.sorter, c.sorter = g ? function(a) {
                    return a.sort(g)
                } : b.identity, c.local = b.isFunction(c.local) ? c.local() : c.local, c.prefetch = d(c.prefetch), c.remote = e(c.remote), c
            }
        }(),
        l = function() {
            "use strict";

            function c(a) {
                a = k(a), this.sorter = a.sorter, this.identify = a.identify, this.sufficient = a.sufficient, this.local = a.local, this.remote = a.remote ? new j(a.remote) : null, this.prefetch = a.prefetch ? new i(a.prefetch) : null, this.index = new h({
                    identify: this.identify,
                    datumTokenizer: a.datumTokenizer,
                    queryTokenizer: a.queryTokenizer
                }), a.initialize !== !1 && this.initialize()
            }
            var e;
            return e = window && window.Bloodhound, c.noConflict = function() {
                return window && (window.Bloodhound = e), c
            }, c.tokenizers = d, b.mixin(c.prototype, {
                __ttAdapter: function() {
                    function a(a, b, d) {
                        return c.search(a, b, d)
                    }

                    function b(a, b) {
                        return c.search(a, b)
                    }
                    var c = this;
                    return this.remote ? a : b
                },
                _loadPrefetch: function() {
                    function b(a, b) {
                        return a ? c.reject() : (e.add(b), e.prefetch.store(e.index.serialize()), void c.resolve())
                    }
                    var c, d, e = this;
                    return c = a.Deferred(), this.prefetch ? (d = this.prefetch.fromCache()) ? (this.index.bootstrap(d), c.resolve()) : this.prefetch.fromNetwork(b) : c.resolve(), c.promise()
                },
                _initialize: function() {
                    function a() {
                        b.add(b.local)
                    }
                    var b = this;
                    return this.clear(), (this.initPromise = this._loadPrefetch()).done(a), this.initPromise
                },
                initialize: function(a) {
                    return !this.initPromise || a ? this._initialize() : this.initPromise
                },
                add: function(a) {
                    return this.index.add(a), this
                },
                get: function(a) {
                    return a = b.isArray(a) ? a : [].slice.call(arguments), this.index.get(a)
                },
                search: function(a, c, d) {
                    function e(a) {
                        var c = [];
                        b.each(a, function(a) {
                            !b.some(f, function(b) {
                                return g.identify(a) === g.identify(b)
                            }) && c.push(a)
                        }), d && d(c)
                    }
                    var f, g = this;
                    return f = this.sorter(this.index.search(a)), c(this.remote ? f.slice() : f), this.remote && f.length < this.sufficient ? this.remote.get(a, e) : this.remote && this.remote.cancelLastRequest(), this
                },
                all: function() {
                    return this.index.all()
                },
                clear: function() {
                    return this.index.reset(), this
                },
                clearPrefetchCache: function() {
                    return this.prefetch && this.prefetch.clear(), this
                },
                clearRemoteCache: function() {
                    return g.resetCache(), this
                },
                ttAdapter: function() {
                    return this.__ttAdapter()
                }
            }), c
        }();
    return l
});

/*!
 * typeahead.js 0.11.1
 * https://github.com/twitter/typeahead.js
 * Copyright 2013-2015 Twitter, Inc. and other contributors; Licensed MIT
 */
! function(a, b) {
    "function" == typeof define && define.amd ? define("typeahead.js", ["jquery"], function(a) {
        return b(a)
    }) : "object" == typeof exports ? module.exports = b(require("jquery")) : b(jQuery)
}(this, function(a) {
    var b = function() {
            "use strict";
            return {
                isMsie: function() {
                    return /(msie|trident)/i.test(navigator.userAgent) ? navigator.userAgent.match(/(msie |rv:)(\d+(.\d+)?)/i)[2] : !1
                },
                isBlankString: function(a) {
                    return !a || /^\s*$/.test(a)
                },
                escapeRegExChars: function(a) {
                    return a.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
                },
                isString: function(a) {
                    return "string" == typeof a
                },
                isNumber: function(a) {
                    return "number" == typeof a
                },
                isArray: a.isArray,
                isFunction: a.isFunction,
                isObject: a.isPlainObject,
                isUndefined: function(a) {
                    return "undefined" == typeof a
                },
                isElement: function(a) {
                    return !(!a || 1 !== a.nodeType)
                },
                isJQuery: function(b) {
                    return b instanceof a
                },
                toStr: function(a) {
                    return b.isUndefined(a) || null === a ? "" : a + ""
                },
                bind: a.proxy,
                each: function(b, c) {
                    function d(a, b) {
                        return c(b, a)
                    }
                    a.each(b, d)
                },
                map: a.map,
                filter: a.grep,
                every: function(b, c) {
                    var d = !0;
                    return b ? (a.each(b, function(a, e) {
                        return (d = c.call(null, e, a, b)) ? void 0 : !1
                    }), !!d) : d
                },
                some: function(b, c) {
                    var d = !1;
                    return b ? (a.each(b, function(a, e) {
                        return (d = c.call(null, e, a, b)) ? !1 : void 0
                    }), !!d) : d
                },
                mixin: a.extend,
                identity: function(a) {
                    return a
                },
                clone: function(b) {
                    return a.extend(!0, {}, b)
                },
                getIdGenerator: function() {
                    var a = 0;
                    return function() {
                        return a++
                    }
                },
                templatify: function(b) {
                    function c() {
                        return String(b)
                    }
                    return a.isFunction(b) ? b : c
                },
                defer: function(a) {
                    setTimeout(a, 0)
                },
                debounce: function(a, b, c) {
                    var d, e;
                    return function() {
                        var f, g, h = this,
                            i = arguments;
                        return f = function() {
                            d = null, c || (e = a.apply(h, i))
                        }, g = c && !d, clearTimeout(d), d = setTimeout(f, b), g && (e = a.apply(h, i)), e
                    }
                },
                throttle: function(a, b) {
                    var c, d, e, f, g, h;
                    return g = 0, h = function() {
                            g = new Date, e = null, f = a.apply(c, d)
                        },
                        function() {
                            var i = new Date,
                                j = b - (i - g);
                            return c = this, d = arguments, 0 >= j ? (clearTimeout(e), e = null, g = i, f = a.apply(c, d)) : e || (e = setTimeout(h, j)), f
                        }
                },
                stringify: function(a) {
                    return b.isString(a) ? a : JSON.stringify(a)
                },
                noop: function() {}
            }
        }(),
        c = function() {
            "use strict";

            function a(a) {
                var g, h;
                return h = b.mixin({}, f, a), g = {
                    css: e(),
                    classes: h,
                    html: c(h),
                    selectors: d(h)
                }, {
                    css: g.css,
                    html: g.html,
                    classes: g.classes,
                    selectors: g.selectors,
                    mixin: function(a) {
                        b.mixin(a, g)
                    }
                }
            }

            function c(a) {
                return {
                    wrapper: '<span class="' + a.wrapper + '"></span>',
                    menu: '<div class="' + a.menu + '"></div>'
                }
            }

            function d(a) {
                var c = {};
                return b.each(a, function(a, b) {
                    c[b] = "." + a
                }), c
            }

            function e() {
                var a = {
                    wrapper: {
                        position: "relative",
                        display: "inline-block"
                    },
                    hint: {
                        position: "absolute",
                        top: "0",
                        left: "0",
                        borderColor: "transparent",
                        boxShadow: "none",
                        opacity: "1"
                    },
                    input: {
                        position: "relative",
                        verticalAlign: "top",
                        backgroundColor: "transparent"
                    },
                    inputWithNoHint: {
                        position: "relative",
                        verticalAlign: "top"
                    },
                    menu: {
                        position: "absolute",
                        top: "100%",
                        left: "0",
                        zIndex: "100",
                        display: "none"
                    },
                    ltr: {
                        left: "0",
                        right: "auto"
                    },
                    rtl: {
                        left: "auto",
                        right: " 0"
                    }
                };
                return b.isMsie() && b.mixin(a.input, {
                    backgroundImage: "url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)"
                }), a
            }
            var f = {
                wrapper: "twitter-typeahead",
                input: "tt-input",
                hint: "tt-hint",
                menu: "tt-menu",
                dataset: "tt-dataset",
                suggestion: "tt-suggestion",
                selectable: "tt-selectable",
                empty: "tt-empty",
                open: "tt-open",
                cursor: "tt-cursor",
                highlight: "tt-highlight"
            };
            return a
        }(),
        d = function() {
            "use strict";

            function c(b) {
                b && b.el || a.error("EventBus initialized without el"), this.$el = a(b.el)
            }
            var d, e;
            return d = "typeahead:", e = {
                render: "rendered",
                cursorchange: "cursorchanged",
                select: "selected",
                autocomplete: "autocompleted"
            }, b.mixin(c.prototype, {
                _trigger: function(b, c) {
                    var e;
                    return e = a.Event(d + b), (c = c || []).unshift(e), this.$el.trigger.apply(this.$el, c), e
                },
                before: function(a) {
                    var b, c;
                    return b = [].slice.call(arguments, 1), c = this._trigger("before" + a, b), c.isDefaultPrevented()
                },
                trigger: function(a) {
                    var b;
                    this._trigger(a, [].slice.call(arguments, 1)), (b = e[a]) && this._trigger(b, [].slice.call(arguments, 1))
                }
            }), c
        }(),
        e = function() {
            "use strict";

            function a(a, b, c, d) {
                var e;
                if (!c) return this;
                for (b = b.split(i), c = d ? h(c, d) : c, this._callbacks = this._callbacks || {}; e = b.shift();) this._callbacks[e] = this._callbacks[e] || {
                    sync: [],
                    async: []
                }, this._callbacks[e][a].push(c);
                return this
            }

            function b(b, c, d) {
                return a.call(this, "async", b, c, d)
            }

            function c(b, c, d) {
                return a.call(this, "sync", b, c, d)
            }

            function d(a) {
                var b;
                if (!this._callbacks) return this;
                for (a = a.split(i); b = a.shift();) delete this._callbacks[b];
                return this
            }

            function e(a) {
                var b, c, d, e, g;
                if (!this._callbacks) return this;
                for (a = a.split(i), d = [].slice.call(arguments, 1);
                    (b = a.shift()) && (c = this._callbacks[b]);) e = f(c.sync, this, [b].concat(d)), g = f(c.async, this, [b].concat(d)), e() && j(g);
                return this
            }

            function f(a, b, c) {
                function d() {
                    for (var d, e = 0, f = a.length; !d && f > e; e += 1) d = a[e].apply(b, c) === !1;
                    return !d
                }
                return d
            }

            function g() {
                var a;
                return a = window.setImmediate ? function(a) {
                    setImmediate(function() {
                        a()
                    })
                } : function(a) {
                    setTimeout(function() {
                        a()
                    }, 0)
                }
            }

            function h(a, b) {
                return a.bind ? a.bind(b) : function() {
                    a.apply(b, [].slice.call(arguments, 0))
                }
            }
            var i = /\s+/,
                j = g();
            return {
                onSync: c,
                onAsync: b,
                off: d,
                trigger: e
            }
        }(),
        f = function(a) {
            "use strict";

            function c(a, c, d) {
                for (var e, f = [], g = 0, h = a.length; h > g; g++) f.push(b.escapeRegExChars(a[g]));
                return e = d ? "\\b(" + f.join("|") + ")\\b" : "(" + f.join("|") + ")", c ? new RegExp(e) : new RegExp(e, "i")
            }
            var d = {
                node: null,
                pattern: null,
                tagName: "strong",
                className: null,
                wordsOnly: !1,
                caseSensitive: !1
            };
            return function(e) {
                function f(b) {
                    var c, d, f;
                    return (c = h.exec(b.data)) && (f = a.createElement(e.tagName), e.className && (f.className = e.className), d = b.splitText(c.index), d.splitText(c[0].length), f.appendChild(d.cloneNode(!0)), b.parentNode.replaceChild(f, d)), !!c
                }

                function g(a, b) {
                    for (var c, d = 3, e = 0; e < a.childNodes.length; e++) c = a.childNodes[e], c.nodeType === d ? e += b(c) ? 1 : 0 : g(c, b)
                }
                var h;
                e = b.mixin({}, d, e), e.node && e.pattern && (e.pattern = b.isArray(e.pattern) ? e.pattern : [e.pattern], h = c(e.pattern, e.caseSensitive, e.wordsOnly), g(e.node, f))
            }
        }(window.document),
        g = function() {
            "use strict";

            function c(c, e) {
                c = c || {}, c.input || a.error("input is missing"), e.mixin(this), this.$hint = a(c.hint), this.$input = a(c.input), this.query = this.$input.val(), this.queryWhenFocused = this.hasFocus() ? this.query : null, this.$overflowHelper = d(this.$input), this._checkLanguageDirection(), 0 === this.$hint.length && (this.setHint = this.getHint = this.clearHint = this.clearHintIfInvalid = b.noop)
            }

            function d(b) {
                return a('<pre aria-hidden="true"></pre>').css({
                    position: "absolute",
                    visibility: "hidden",
                    whiteSpace: "pre",
                    fontFamily: b.css("font-family"),
                    fontSize: b.css("font-size"),
                    fontStyle: b.css("font-style"),
                    fontVariant: b.css("font-variant"),
                    fontWeight: b.css("font-weight"),
                    wordSpacing: b.css("word-spacing"),
                    letterSpacing: b.css("letter-spacing"),
                    textIndent: b.css("text-indent"),
                    textRendering: b.css("text-rendering"),
                    textTransform: b.css("text-transform")
                }).insertAfter(b)
            }

            function f(a, b) {
                return c.normalizeQuery(a) === c.normalizeQuery(b)
            }

            function g(a) {
                return a.altKey || a.ctrlKey || a.metaKey || a.shiftKey
            }
            var h;
            return h = {
                9: "tab",
                27: "esc",
                37: "left",
                39: "right",
                13: "enter",
                38: "up",
                40: "down"
            }, c.normalizeQuery = function(a) {
                return b.toStr(a).replace(/^\s*/g, "").replace(/\s{2,}/g, " ")
            }, b.mixin(c.prototype, e, {
                _onBlur: function() {
                    this.resetInputValue(), this.trigger("blurred")
                },
                _onFocus: function() {
                    this.queryWhenFocused = this.query, this.trigger("focused")
                },
                _onKeydown: function(a) {
                    var b = h[a.which || a.keyCode];
                    this._managePreventDefault(b, a), b && this._shouldTrigger(b, a) && this.trigger(b + "Keyed", a)
                },
                _onInput: function() {
                    this._setQuery(this.getInputValue()), this.clearHintIfInvalid(), this._checkLanguageDirection()
                },
                _managePreventDefault: function(a, b) {
                    var c;
                    switch (a) {
                        case "up":
                        case "down":
                            c = !g(b);
                            break;
                        default:
                            c = !1
                    }
                    c && b.preventDefault()
                },
                _shouldTrigger: function(a, b) {
                    var c;
                    switch (a) {
                        case "tab":
                            c = !g(b);
                            break;
                        default:
                            c = !0
                    }
                    return c
                },
                _checkLanguageDirection: function() {
                    var a = (this.$input.css("direction") || "ltr").toLowerCase();
                    this.dir !== a && (this.dir = a, this.$hint.attr("dir", a), this.trigger("langDirChanged", a))
                },
                _setQuery: function(a, b) {
                    var c, d;
                    c = f(a, this.query), d = c ? this.query.length !== a.length : !1, this.query = a, b || c ? !b && d && this.trigger("whitespaceChanged", this.query) : this.trigger("queryChanged", this.query)
                },
                bind: function() {
                    var a, c, d, e, f = this;
                    return a = b.bind(this._onBlur, this), c = b.bind(this._onFocus, this), d = b.bind(this._onKeydown, this), e = b.bind(this._onInput, this), this.$input.on("blur.tt", a).on("focus.tt", c).on("keydown.tt", d), !b.isMsie() || b.isMsie() > 9 ? this.$input.on("input.tt", e) : this.$input.on("keydown.tt keypress.tt cut.tt paste.tt", function(a) {
                        h[a.which || a.keyCode] || b.defer(b.bind(f._onInput, f, a))
                    }), this
                },
                focus: function() {
                    this.$input.focus()
                },
                blur: function() {
                    this.$input.blur()
                },
                getLangDir: function() {
                    return this.dir
                },
                getQuery: function() {
                    return this.query || ""
                },
                setQuery: function(a, b) {
                    this.setInputValue(a), this._setQuery(a, b)
                },
                hasQueryChangedSinceLastFocus: function() {
                    return this.query !== this.queryWhenFocused
                },
                getInputValue: function() {
                    return this.$input.val()
                },
                setInputValue: function(a) {
                    this.$input.val(a), this.clearHintIfInvalid(), this._checkLanguageDirection()
                },
                resetInputValue: function() {
                    this.setInputValue(this.query)
                },
                getHint: function() {
                    return this.$hint.val()
                },
                setHint: function(a) {
                    this.$hint.val(a)
                },
                clearHint: function() {
                    this.setHint("")
                },
                clearHintIfInvalid: function() {
                    var a, b, c, d;
                    a = this.getInputValue(), b = this.getHint(), c = a !== b && 0 === b.indexOf(a), d = "" !== a && c && !this.hasOverflow(), !d && this.clearHint()
                },
                hasFocus: function() {
                    return this.$input.is(":focus")
                },
                hasOverflow: function() {
                    var a = this.$input.width() - 2;
                    return this.$overflowHelper.text(this.getInputValue()), this.$overflowHelper.width() >= a
                },
                isCursorAtEnd: function() {
                    var a, c, d;
                    return a = this.$input.val().length, c = this.$input[0].selectionStart, b.isNumber(c) ? c === a : document.selection ? (d = document.selection.createRange(), d.moveStart("character", -a), a === d.text.length) : !0
                },
                destroy: function() {
                    this.$hint.off(".tt"), this.$input.off(".tt"), this.$overflowHelper.remove(), this.$hint = this.$input = this.$overflowHelper = a("<div>")
                }
            }), c
        }(),
        h = function() {
            "use strict";

            function c(c, e) {
                c = c || {}, c.templates = c.templates || {}, c.templates.notFound = c.templates.notFound || c.templates.empty, c.source || a.error("missing source"), c.node || a.error("missing node"), c.name && !h(c.name) && a.error("invalid dataset name: " + c.name), e.mixin(this), this.highlight = !!c.highlight, this.name = c.name || j(), this.limit = c.limit || 5, this.displayFn = d(c.display || c.displayKey), this.templates = g(c.templates, this.displayFn), this.source = c.source.__ttAdapter ? c.source.__ttAdapter() : c.source, this.async = b.isUndefined(c.async) ? this.source.length > 2 : !!c.async, this._resetLastSuggestion(), this.$el = a(c.node).addClass(this.classes.dataset).addClass(this.classes.dataset + "-" + this.name)
            }

            function d(a) {
                function c(b) {
                    return b[a]
                }
                return a = a || b.stringify, b.isFunction(a) ? a : c
            }

            function g(c, d) {
                function e(b) {
                    return a("<div>").text(d(b))
                }
                return {
                    notFound: c.notFound && b.templatify(c.notFound),
                    pending: c.pending && b.templatify(c.pending),
                    header: c.header && b.templatify(c.header),
                    footer: c.footer && b.templatify(c.footer),
                    suggestion: c.suggestion || e
                }
            }

            function h(a) {
                return /^[_a-zA-Z0-9-]+$/.test(a)
            }
            var i, j;
            return i = {
                val: "tt-selectable-display",
                obj: "tt-selectable-object"
            }, j = b.getIdGenerator(), c.extractData = function(b) {
                var c = a(b);
                return c.data(i.obj) ? {
                    val: c.data(i.val) || "",
                    obj: c.data(i.obj) || null
                } : null
            }, b.mixin(c.prototype, e, {
                _overwrite: function(a, b) {
                    b = b || [], b.length ? this._renderSuggestions(a, b) : this.async && this.templates.pending ? this._renderPending(a) : !this.async && this.templates.notFound ? this._renderNotFound(a) : this._empty(), this.trigger("rendered", this.name, b, !1)
                },
                _append: function(a, b) {
                    b = b || [], b.length && this.$lastSuggestion.length ? this._appendSuggestions(a, b) : b.length ? this._renderSuggestions(a, b) : !this.$lastSuggestion.length && this.templates.notFound && this._renderNotFound(a), this.trigger("rendered", this.name, b, !0)
                },
                _renderSuggestions: function(a, b) {
                    var c;
                    c = this._getSuggestionsFragment(a, b), this.$lastSuggestion = c.children().last(), this.$el.html(c).prepend(this._getHeader(a, b)).append(this._getFooter(a, b))
                },
                _appendSuggestions: function(a, b) {
                    var c, d;
                    c = this._getSuggestionsFragment(a, b), d = c.children().last(), this.$lastSuggestion.after(c), this.$lastSuggestion = d
                },
                _renderPending: function(a) {
                    var b = this.templates.pending;
                    this._resetLastSuggestion(), b && this.$el.html(b({
                        query: a,
                        dataset: this.name
                    }))
                },
                _renderNotFound: function(a) {
                    var b = this.templates.notFound;
                    this._resetLastSuggestion(), b && this.$el.html(b({
                        query: a,
                        dataset: this.name
                    }))
                },
                _empty: function() {
                    this.$el.empty(), this._resetLastSuggestion()
                },
                _getSuggestionsFragment: function(c, d) {
                    var e, g = this;
                    return e = document.createDocumentFragment(), b.each(d, function(b) {
                        var d, f;
                        f = g._injectQuery(c, b), d = a(g.templates.suggestion(f)).data(i.obj, b).data(i.val, g.displayFn(b)).addClass(g.classes.suggestion + " " + g.classes.selectable), e.appendChild(d[0])
                    }), this.highlight && f({
                        className: this.classes.highlight,
                        node: e,
                        pattern: c
                    }), a(e)
                },
                _getFooter: function(a, b) {
                    return this.templates.footer ? this.templates.footer({
                        query: a,
                        suggestions: b,
                        dataset: this.name
                    }) : null
                },
                _getHeader: function(a, b) {
                    return this.templates.header ? this.templates.header({
                        query: a,
                        suggestions: b,
                        dataset: this.name
                    }) : null
                },
                _resetLastSuggestion: function() {
                    this.$lastSuggestion = a()
                },
                _injectQuery: function(a, c) {
                    return b.isObject(c) ? b.mixin({
                        _query: a
                    }, c) : c
                },
                update: function(b) {
                    function c(a) {
                        g || (g = !0, a = (a || []).slice(0, e.limit), h = a.length, e._overwrite(b, a), h < e.limit && e.async && e.trigger("asyncRequested", b))
                    }

                    function d(c) {
                        c = c || [], !f && h < e.limit && (e.cancel = a.noop, h += c.length, e._append(b, c.slice(0, e.limit - h)), e.async && e.trigger("asyncReceived", b))
                    }
                    var e = this,
                        f = !1,
                        g = !1,
                        h = 0;
                    this.cancel(), this.cancel = function() {
                        f = !0, e.cancel = a.noop, e.async && e.trigger("asyncCanceled", b)
                    }, this.source(b, c, d), !g && c([])
                },
                cancel: a.noop,
                clear: function() {
                    this._empty(), this.cancel(), this.trigger("cleared")
                },
                isEmpty: function() {
                    return this.$el.is(":empty")
                },
                destroy: function() {
                    this.$el = a("<div>")
                }
            }), c
        }(),
        i = function() {
            "use strict";

            function c(c, d) {
                function e(b) {
                    var c = f.$node.find(b.node).first();
                    return b.node = c.length ? c : a("<div>").appendTo(f.$node), new h(b, d)
                }
                var f = this;
                c = c || {}, c.node || a.error("node is required"), d.mixin(this), this.$node = a(c.node), this.query = null, this.datasets = b.map(c.datasets, e)
            }
            return b.mixin(c.prototype, e, {
                _onSelectableClick: function(b) {
                    this.trigger("selectableClicked", a(b.currentTarget))
                },
                _onRendered: function(a, b, c, d) {
                    this.$node.toggleClass(this.classes.empty, this._allDatasetsEmpty()), this.trigger("datasetRendered", b, c, d)
                },
                _onCleared: function() {
                    this.$node.toggleClass(this.classes.empty, this._allDatasetsEmpty()), this.trigger("datasetCleared")
                },
                _propagate: function() {
                    this.trigger.apply(this, arguments)
                },
                _allDatasetsEmpty: function() {
                    function a(a) {
                        return a.isEmpty()
                    }
                    return b.every(this.datasets, a)
                },
                _getSelectables: function() {
                    return this.$node.find(this.selectors.selectable)
                },
                _removeCursor: function() {
                    var a = this.getActiveSelectable();
                    a && a.removeClass(this.classes.cursor)
                },
                _ensureVisible: function(a) {
                    var b, c, d, e;
                    b = a.position().top, c = b + a.outerHeight(!0), d = this.$node.scrollTop(), e = this.$node.height() + parseInt(this.$node.css("paddingTop"), 10) + parseInt(this.$node.css("paddingBottom"), 10), 0 > b ? this.$node.scrollTop(d + b) : c > e && this.$node.scrollTop(d + (c - e))
                },
                bind: function() {
                    var a, c = this;
                    return a = b.bind(this._onSelectableClick, this), this.$node.on("click.tt", this.selectors.selectable, a), b.each(this.datasets, function(a) {
                        a.onSync("asyncRequested", c._propagate, c).onSync("asyncCanceled", c._propagate, c).onSync("asyncReceived", c._propagate, c).onSync("rendered", c._onRendered, c).onSync("cleared", c._onCleared, c)
                    }), this
                },
                isOpen: function() {
                    return this.$node.hasClass(this.classes.open)
                },
                open: function() {
                    this.$node.addClass(this.classes.open)
                },
                close: function() {
                    this.$node.removeClass(this.classes.open), this._removeCursor()
                },
                setLanguageDirection: function(a) {
                    this.$node.attr("dir", a)
                },
                selectableRelativeToCursor: function(a) {
                    var b, c, d, e;
                    return c = this.getActiveSelectable(), b = this._getSelectables(), d = c ? b.index(c) : -1, e = d + a, e = (e + 1) % (b.length + 1) - 1, e = -1 > e ? b.length - 1 : e, -1 === e ? null : b.eq(e)
                },
                setCursor: function(a) {
                    this._removeCursor(), (a = a && a.first()) && (a.addClass(this.classes.cursor), this._ensureVisible(a))
                },
                getSelectableData: function(a) {
                    return a && a.length ? h.extractData(a) : null
                },
                getActiveSelectable: function() {
                    var a = this._getSelectables().filter(this.selectors.cursor).first();
                    return a.length ? a : null
                },
                getTopSelectable: function() {
                    var a = this._getSelectables().first();
                    return a.length ? a : null
                },
                update: function(a) {
                    function c(b) {
                        b.update(a)
                    }
                    var d = a !== this.query;
                    return d && (this.query = a, b.each(this.datasets, c)), d
                },
                empty: function() {
                    function a(a) {
                        a.clear()
                    }
                    b.each(this.datasets, a), this.query = null, this.$node.addClass(this.classes.empty)
                },
                destroy: function() {
                    function c(a) {
                        a.destroy()
                    }
                    this.$node.off(".tt"), this.$node = a("<div>"), b.each(this.datasets, c)
                }
            }), c
        }(),
        j = function() {
            "use strict";

            function a() {
                i.apply(this, [].slice.call(arguments, 0))
            }
            var c = i.prototype;
            return b.mixin(a.prototype, i.prototype, {
                open: function() {
                    return !this._allDatasetsEmpty() && this._show(), c.open.apply(this, [].slice.call(arguments, 0))
                },
                close: function() {
                    return this._hide(), c.close.apply(this, [].slice.call(arguments, 0))
                },
                _onRendered: function() {
                    return this._allDatasetsEmpty() ? this._hide() : this.isOpen() && this._show(), c._onRendered.apply(this, [].slice.call(arguments, 0))
                },
                _onCleared: function() {
                    return this._allDatasetsEmpty() ? this._hide() : this.isOpen() && this._show(), c._onCleared.apply(this, [].slice.call(arguments, 0))
                },
                setLanguageDirection: function(a) {
                    return this.$node.css("ltr" === a ? this.css.ltr : this.css.rtl), c.setLanguageDirection.apply(this, [].slice.call(arguments, 0))
                },
                _hide: function() {
                    this.$node.hide()
                },
                _show: function() {
                    this.$node.css("display", "block")
                }
            }), a
        }(),
        k = function() {
            "use strict";

            function c(c, e) {
                var f, g, h, i, j, k, l, m, n, o, p;
                c = c || {}, c.input || a.error("missing input"), c.menu || a.error("missing menu"), c.eventBus || a.error("missing event bus"), e.mixin(this), this.eventBus = c.eventBus, this.minLength = b.isNumber(c.minLength) ? c.minLength : 1, this.input = c.input, this.menu = c.menu, this.enabled = !0, this.active = !1, this.input.hasFocus() && this.activate(), this.dir = this.input.getLangDir(), this._hacks(), this.menu.bind().onSync("selectableClicked", this._onSelectableClicked, this).onSync("asyncRequested", this._onAsyncRequested, this).onSync("asyncCanceled", this._onAsyncCanceled, this).onSync("asyncReceived", this._onAsyncReceived, this).onSync("datasetRendered", this._onDatasetRendered, this).onSync("datasetCleared", this._onDatasetCleared, this), f = d(this, "activate", "open", "_onFocused"), g = d(this, "deactivate", "_onBlurred"), h = d(this, "isActive", "isOpen", "_onEnterKeyed"), i = d(this, "isActive", "isOpen", "_onTabKeyed"), j = d(this, "isActive", "_onEscKeyed"), k = d(this, "isActive", "open", "_onUpKeyed"), l = d(this, "isActive", "open", "_onDownKeyed"), m = d(this, "isActive", "isOpen", "_onLeftKeyed"), n = d(this, "isActive", "isOpen", "_onRightKeyed"), o = d(this, "_openIfActive", "_onQueryChanged"), p = d(this, "_openIfActive", "_onWhitespaceChanged"), this.input.bind().onSync("focused", f, this).onSync("blurred", g, this).onSync("enterKeyed", h, this).onSync("tabKeyed", i, this).onSync("escKeyed", j, this).onSync("upKeyed", k, this).onSync("downKeyed", l, this).onSync("leftKeyed", m, this).onSync("rightKeyed", n, this).onSync("queryChanged", o, this).onSync("whitespaceChanged", p, this).onSync("langDirChanged", this._onLangDirChanged, this)
            }

            function d(a) {
                var c = [].slice.call(arguments, 1);
                return function() {
                    var d = [].slice.call(arguments);
                    b.each(c, function(b) {
                        return a[b].apply(a, d)
                    })
                }
            }
            return b.mixin(c.prototype, {
                _hacks: function() {
                    var c, d;
                    c = this.input.$input || a("<div>"), d = this.menu.$node || a("<div>"), c.on("blur.tt", function(a) {
                        var e, f, g;
                        e = document.activeElement, f = d.is(e), g = d.has(e).length > 0, b.isMsie() && (f || g) && (a.preventDefault(), a.stopImmediatePropagation(), b.defer(function() {
                            c.focus()
                        }))
                    }), d.on("mousedown.tt", function(a) {
                        a.preventDefault()
                    })
                },
                _onSelectableClicked: function(a, b) {
                    this.select(b)
                },
                _onDatasetCleared: function() {
                    this._updateHint()
                },
                _onDatasetRendered: function(a, b, c, d) {
                    this._updateHint(), this.eventBus.trigger("render", c, d, b)
                },
                _onAsyncRequested: function(a, b, c) {
                    this.eventBus.trigger("asyncrequest", c, b)
                },
                _onAsyncCanceled: function(a, b, c) {
                    this.eventBus.trigger("asynccancel", c, b)
                },
                _onAsyncReceived: function(a, b, c) {
                    this.eventBus.trigger("asyncreceive", c, b)
                },
                _onFocused: function() {
                    this._minLengthMet() && this.menu.update(this.input.getQuery())
                },
                _onBlurred: function() {
                    this.input.hasQueryChangedSinceLastFocus() && this.eventBus.trigger("change", this.input.getQuery())
                },
                _onEnterKeyed: function(a, b) {
                    var c;
                    (c = this.menu.getActiveSelectable()) && this.select(c) && b.preventDefault()
                },
                _onTabKeyed: function(a, b) {
                    var c;
                    (c = this.menu.getActiveSelectable()) ? this.select(c) && b.preventDefault(): (c = this.menu.getTopSelectable()) && this.autocomplete(c) && b.preventDefault()
                },
                _onEscKeyed: function() {
                    this.close()
                },
                _onUpKeyed: function() {
                    this.moveCursor(-1)
                },
                _onDownKeyed: function() {
                    this.moveCursor(1)
                },
                _onLeftKeyed: function() {
                    "rtl" === this.dir && this.input.isCursorAtEnd() && this.autocomplete(this.menu.getTopSelectable())
                },
                _onRightKeyed: function() {
                    "ltr" === this.dir && this.input.isCursorAtEnd() && this.autocomplete(this.menu.getTopSelectable())
                },
                _onQueryChanged: function(a, b) {
                    this._minLengthMet(b) ? this.menu.update(b) : this.menu.empty()
                },
                _onWhitespaceChanged: function() {
                    this._updateHint()
                },
                _onLangDirChanged: function(a, b) {
                    this.dir !== b && (this.dir = b, this.menu.setLanguageDirection(b))
                },
                _openIfActive: function() {
                    this.isActive() && this.open()
                },
                _minLengthMet: function(a) {
                    return a = b.isString(a) ? a : this.input.getQuery() || "", a.length >= this.minLength
                },
                _updateHint: function() {
                    var a, c, d, e, f, h, i;
                    a = this.menu.getTopSelectable(), c = this.menu.getSelectableData(a), d = this.input.getInputValue(), !c || b.isBlankString(d) || this.input.hasOverflow() ? this.input.clearHint() : (e = g.normalizeQuery(d), f = b.escapeRegExChars(e), h = new RegExp("^(?:" + f + ")(.+$)", "i"), i = h.exec(c.val), i && this.input.setHint(d + i[1]))
                },
                isEnabled: function() {
                    return this.enabled
                },
                enable: function() {
                    this.enabled = !0
                },
                disable: function() {
                    this.enabled = !1
                },
                isActive: function() {
                    return this.active
                },
                activate: function() {
                    return this.isActive() ? !0 : !this.isEnabled() || this.eventBus.before("active") ? !1 : (this.active = !0, this.eventBus.trigger("active"), !0)
                },
                deactivate: function() {
                    return this.isActive() ? this.eventBus.before("idle") ? !1 : (this.active = !1, this.close(), this.eventBus.trigger("idle"), !0) : !0
                },
                isOpen: function() {
                    return this.menu.isOpen()
                },
                open: function() {
                    return this.isOpen() || this.eventBus.before("open") || (this.menu.open(), this._updateHint(), this.eventBus.trigger("open")), this.isOpen()
                },
                close: function() {
                    return this.isOpen() && !this.eventBus.before("close") && (this.menu.close(), this.input.clearHint(), this.input.resetInputValue(), this.eventBus.trigger("close")), !this.isOpen()
                },
                setVal: function(a) {
                    this.input.setQuery(b.toStr(a))
                },
                getVal: function() {
                    return this.input.getQuery()
                },
                select: function(a) {
                    var b = this.menu.getSelectableData(a);
                    return b && !this.eventBus.before("select", b.obj) ? (this.input.setQuery(b.val, !0), this.eventBus.trigger("select", b.obj), this.close(), !0) : !1
                },
                autocomplete: function(a) {
                    var b, c, d;
                    return b = this.input.getQuery(), c = this.menu.getSelectableData(a), d = c && b !== c.val, d && !this.eventBus.before("autocomplete", c.obj) ? (this.input.setQuery(c.val), this.eventBus.trigger("autocomplete", c.obj), !0) : !1
                },
                moveCursor: function(a) {
                    var b, c, d, e, f;
                    return b = this.input.getQuery(), c = this.menu.selectableRelativeToCursor(a), d = this.menu.getSelectableData(c), e = d ? d.obj : null, f = this._minLengthMet() && this.menu.update(b), f || this.eventBus.before("cursorchange", e) ? !1 : (this.menu.setCursor(c), d ? this.input.setInputValue(d.val) : (this.input.resetInputValue(), this._updateHint()), this.eventBus.trigger("cursorchange", e), !0)
                },
                destroy: function() {
                    this.input.destroy(), this.menu.destroy()
                }
            }), c
        }();
    ! function() {
        "use strict";

        function e(b, c) {
            b.each(function() {
                var b, d = a(this);
                (b = d.data(p.typeahead)) && c(b, d)
            })
        }

        function f(a, b) {
            return a.clone().addClass(b.classes.hint).removeData().css(b.css.hint).css(l(a)).prop("readonly", !0).removeAttr("id name placeholder required").attr({
                autocomplete: "off",
                spellcheck: "false",
                tabindex: -1
            })
        }

        function h(a, b) {
            a.data(p.attrs, {
                dir: a.attr("dir"),
                autocomplete: a.attr("autocomplete"),
                spellcheck: a.attr("spellcheck"),
                style: a.attr("style")
            }), a.addClass(b.classes.input).attr({
                autocomplete: "off",
                spellcheck: !1
            });
            try {
                !a.attr("dir") && a.attr("dir", "auto")
            } catch (c) {}
            return a
        }

        function l(a) {
            return {
                backgroundAttachment: a.css("background-attachment"),
                backgroundClip: a.css("background-clip"),
                backgroundColor: a.css("background-color"),
                backgroundImage: a.css("background-image"),
                backgroundOrigin: a.css("background-origin"),
                backgroundPosition: a.css("background-position"),
                backgroundRepeat: a.css("background-repeat"),
                backgroundSize: a.css("background-size")
            }
        }

        function m(a) {
            var c, d;
            c = a.data(p.www), d = a.parent().filter(c.selectors.wrapper), b.each(a.data(p.attrs), function(c, d) {
                b.isUndefined(c) ? a.removeAttr(d) : a.attr(d, c)
            }), a.removeData(p.typeahead).removeData(p.www).removeData(p.attr).removeClass(c.classes.input), d.length && (a.detach().insertAfter(d), d.remove())
        }

        function n(c) {
            var d, e;
            return d = b.isJQuery(c) || b.isElement(c), e = d ? a(c).first() : [], e.length ? e : null
        }
        var o, p, q;
        o = a.fn.typeahead, p = {
            www: "tt-www",
            attrs: "tt-attrs",
            typeahead: "tt-typeahead"
        }, q = {
            initialize: function(e, l) {
                function m() {
                    var c, m, q, r, s, t, u, v, w, x, y;
                    b.each(l, function(a) {
                        a.highlight = !!e.highlight
                    }), c = a(this), m = a(o.html.wrapper), q = n(e.hint), r = n(e.menu), s = e.hint !== !1 && !q, t = e.menu !== !1 && !r, s && (q = f(c, o)), t && (r = a(o.html.menu).css(o.css.menu)), q && q.val(""), c = h(c, o), (s || t) && (m.css(o.css.wrapper), c.css(s ? o.css.input : o.css.inputWithNoHint), c.wrap(m).parent().prepend(s ? q : null).append(t ? r : null)), y = t ? j : i, u = new d({
                        el: c
                    }), v = new g({
                        hint: q,
                        input: c
                    }, o), w = new y({
                        node: r,
                        datasets: l
                    }, o), x = new k({
                        input: v,
                        menu: w,
                        eventBus: u,
                        minLength: e.minLength
                    }, o), c.data(p.www, o), c.data(p.typeahead, x)
                }
                var o;
                return l = b.isArray(l) ? l : [].slice.call(arguments, 1), e = e || {}, o = c(e.classNames), this.each(m)
            },
            isEnabled: function() {
                var a;
                return e(this.first(), function(b) {
                    a = b.isEnabled()
                }), a
            },
            enable: function() {
                return e(this, function(a) {
                    a.enable()
                }), this
            },
            disable: function() {
                return e(this, function(a) {
                    a.disable()
                }), this
            },
            isActive: function() {
                var a;
                return e(this.first(), function(b) {
                    a = b.isActive()
                }), a
            },
            activate: function() {
                return e(this, function(a) {
                    a.activate()
                }), this
            },
            deactivate: function() {
                return e(this, function(a) {
                    a.deactivate()
                }), this
            },
            isOpen: function() {
                var a;
                return e(this.first(), function(b) {
                    a = b.isOpen()
                }), a
            },
            open: function() {
                return e(this, function(a) {
                    a.open()
                }), this
            },
            close: function() {
                return e(this, function(a) {
                    a.close()
                }), this
            },
            select: function(b) {
                var c = !1,
                    d = a(b);
                return e(this.first(), function(a) {
                    c = a.select(d)
                }), c
            },
            autocomplete: function(b) {
                var c = !1,
                    d = a(b);
                return e(this.first(), function(a) {
                    c = a.autocomplete(d)
                }), c
            },
            moveCursor: function(a) {
                var b = !1;
                return e(this.first(), function(c) {
                    b = c.moveCursor(a)
                }), b
            },
            val: function(a) {
                var b;
                return arguments.length ? (e(this, function(b) {
                    b.setVal(a)
                }), this) : (e(this.first(), function(a) {
                    b = a.getVal()
                }), b)
            },
            destroy: function() {
                return e(this, function(a, b) {
                    m(b), a.destroy()
                }), this
            }
        }, a.fn.typeahead = function(a) {
            return q[a] ? q[a].apply(this, [].slice.call(arguments, 1)) : q.initialize.apply(this, arguments)
        }, a.fn.typeahead.noConflict = function() {
            return a.fn.typeahead = o, this
        }
    }()
});

/*!
 * @preserve
 *
 * Readmore.js jQuery plugin
 * Author: @jed_foster
 * Project home: http://jedfoster.github.io/Readmore.js
 * Licensed under the MIT license
 *
 * Debounce function from http://davidwalsh.name/javascript-debounce-function
 */
! function(t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof exports ? module.exports = t(require("jquery")) : t(jQuery)
}(function(t) {
    "use strict";

    function e(t, e, i) {
        var o;
        return function() {
            var n = this,
                a = arguments,
                s = function() {
                    o = null, i || t.apply(n, a)
                },
                r = i && !o;
            clearTimeout(o), o = setTimeout(s, e), r && t.apply(n, a)
        }
    }

    function i(t) {
        var e = ++h;
        return String(null == t ? "rmjs-" : t) + e
    }

    function o(t) {
        var e = t.clone().css({
                height: "auto",
                width: t.width(),
                maxHeight: "none",
                overflow: "hidden"
            }).insertAfter(t),
            i = e.outerHeight(),
            o = parseInt(e.css({
                maxHeight: ""
            }).css("max-height").replace(/[^-\d\.]/g, ""), 10),
            n = t.data("defaultHeight");
        e.remove();
        var a = o || t.data("collapsedHeight") || n;
        t.data({
            expandedHeight: i,
            maxHeight: o,
            collapsedHeight: a
        }).css({
            maxHeight: "none"
        })
    }

    function n(t) {
        if (!d[t.selector]) {
            var e = " ";
            t.embedCSS && "" !== t.blockCSS && (e += t.selector + " + [data-readmore-toggle], " + t.selector + "[data-readmore]{" + t.blockCSS + "}"), e += t.selector + "[data-readmore]{transition: height " + t.speed + "ms;overflow: hidden;}",
                function(t, e) {
                    var i = t.createElement("style");
                    i.type = "text/css", i.styleSheet ? i.styleSheet.cssText = e : i.appendChild(t.createTextNode(e)), t.getElementsByTagName("head")[0].appendChild(i)
                }(document, e), d[t.selector] = !0
        }
    }

    function a(e, i) {
        this.element = e, this.options = t.extend({}, r, i), n(this.options), this._defaults = r, this._name = s, this.init(), window.addEventListener ? (window.addEventListener("load", c), window.addEventListener("resize", c)) : (window.attachEvent("load", c), window.attachEvent("resize", c))
    }
    var s = "readmore",
        r = {
            speed: 100,
            collapsedHeight: 200,
            heightMargin: 16,
            moreLink: '<a href="#">Read More</a>',
            lessLink: '<a href="#">Close</a>',
            embedCSS: !0,
            blockCSS: "display: block; width: 100%;",
            startOpen: !1,
            blockProcessed: function() {},
            beforeToggle: function() {},
            afterToggle: function() {}
        },
        d = {},
        h = 0,
        c = e(function() {
            t("[data-readmore]").each(function() {
                var e = t(this),
                    i = "true" === e.attr("aria-expanded");
                o(e), e.css({
                    height: e.data(i ? "expandedHeight" : "collapsedHeight")
                })
            })
        }, 100);
    a.prototype = {
        init: function() {
            var e = t(this.element);
            e.data({
                defaultHeight: this.options.collapsedHeight,
                heightMargin: this.options.heightMargin
            }), o(e);
            var n = e.data("collapsedHeight"),
                a = e.data("heightMargin");
            if (e.outerHeight(!0) <= n + a) return this.options.blockProcessed && "function" == typeof this.options.blockProcessed && this.options.blockProcessed(e, !1), !0;
            var s = e.attr("id") || i(),
                r = this.options.startOpen ? this.options.lessLink : this.options.moreLink;
            e.attr({
                "data-readmore": "",
                "aria-expanded": this.options.startOpen,
                id: s
            }), e.after(t(r).on("click", function(t) {
                return function(i) {
                    t.toggle(this, e[0], i)
                }
            }(this)).attr({
                "data-readmore-toggle": s,
                "aria-controls": s
            })), this.options.startOpen || e.css({
                height: n
            }), this.options.blockProcessed && "function" == typeof this.options.blockProcessed && this.options.blockProcessed(e, !0)
        },
        toggle: function(e, i, o) {
            o && o.preventDefault(), e || (e = t('[aria-controls="' + this.element.id + '"]')[0]), i || (i = this.element);
            var n = t(i),
                a = "",
                s = "",
                r = !1,
                d = n.data("collapsedHeight");
            n.height() <= d ? (a = n.data("expandedHeight") + "px", s = "lessLink", r = !0) : (a = d, s = "moreLink"), this.options.beforeToggle && "function" == typeof this.options.beforeToggle && this.options.beforeToggle(e, n, !r), n.css({
                height: a
            }), n.on("transitionend", function(i) {
                return function() {
                    i.options.afterToggle && "function" == typeof i.options.afterToggle && i.options.afterToggle(e, n, r), t(this).attr({
                        "aria-expanded": r
                    }).off("transitionend")
                }
            }(this)), t(e).replaceWith(t(this.options[s]).on("click", function(t) {
                return function(e) {
                    t.toggle(this, i, e)
                }
            }(this)).attr({
                "data-readmore-toggle": n.attr("id"),
                "aria-controls": n.attr("id")
            }))
        },
        destroy: function() {
            t(this.element).each(function() {
                var e = t(this);
                e.attr({
                    "data-readmore": null,
                    "aria-expanded": null
                }).css({
                    maxHeight: "",
                    height: ""
                }).next("[data-readmore-toggle]").remove(), e.removeData()
            })
        }
    }, t.fn.readmore = function(e) {
        var i = arguments,
            o = this.selector;
        return e = e || {}, "object" == typeof e ? this.each(function() {
            if (t.data(this, "plugin_" + s)) {
                var i = t.data(this, "plugin_" + s);
                i.destroy.apply(i)
            }
            e.selector = o, t.data(this, "plugin_" + s, new a(this, e))
        }) : "string" == typeof e && "_" !== e[0] && "init" !== e ? this.each(function() {
            var o = t.data(this, "plugin_" + s);
            o instanceof a && "function" == typeof o[e] && o[e].apply(o, Array.prototype.slice.call(i, 1))
        }) : void 0
    }
});