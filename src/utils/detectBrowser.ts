// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

export default function detectBrowser() {
	// Opera 8.0+
	const isOpera =
		(!!window.opr && !!opr.addons) ||
		!!window.opera ||
		navigator.userAgent.indexOf(' OPR/') >= 0;

	// Firefox 1.0+
	const isFirefox = typeof InstallTrigger !== 'undefined';

	// Safari 3.0+ "[object HTMLElementConstructor]"
	const isSafari =
		/constructor/i.test(window.HTMLElement) ||
		(function (p) {
			return p.toString() === '[object SafariRemoteNotification]';
		})(
			!window['safari'] ||
				(typeof safari !== 'undefined' &&
					window['safari'].pushNotification)
		);

	// Internet Explorer 6-11
	const isIE = /*@cc_on!@*/ false || !!document.documentMode;

	// Edge 20+
	const isEdge = !isIE && !!window.StyleMedia;

	// Chrome 1 - 79
	const isChrome =
		!!window.chrome &&
		(!!window.chrome.webstore || !!window.chrome.runtime);

	// Edge (based on chromium) detection
	const isEdgeChromium =
		isChrome && navigator.userAgent.indexOf('Edg') !== -1;

	// Blink engine detection
	const isBlink = (isChrome || isOpera) && !!window.CSS;

	const res = {
		isOpera: isOpera ? 'Opera' : false,
		isFirefox: isFirefox ? 'Firefox' : false,
		isIE: isIE ? 'IE' : false,
		isEdge: isEdge ? 'Edge' : false,
		isEdgeChromium: isEdgeChromium ? 'EdgeChromium' : false,
		isBlink: isBlink ? 'Blink' : false,
		isSafari: isSafari ? 'Safari' : false,
	};

	return (
		res.isOpera ||
		res.isFirefox ||
		res.isIE ||
		res.isEdge ||
		res.isEdgeChromium ||
		res.isBlink ||
		res.isSafari ||
		'Unknown'
	);
}
