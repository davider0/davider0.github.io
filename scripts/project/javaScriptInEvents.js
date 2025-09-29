

const scriptsInEvents = {

	async Emain_Event1_Act1(runtime, localVars)
	{
		document.querySelector("html").style.backgroundColor = "#62d7fe";
		
		document.querySelector("body").style.backgroundColor = "#62d7fe";
	},

	async Emain_Event3_Act1(runtime, localVars)
	{
		runtime.globalVars.HSL = runtime.getLayout("main").getLayer(0).effects[0].getParameter(0)*100;
	},

	async Emain_Event4_Act3(runtime, localVars)
	{
// este codigo entero sirve unicamente para cambiar el background color del layout

function rgbToHex(r, g, b) {
  return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
}

// Changes the RGB/HEX temporarily to a HSL-Value, modifies that value 
// and changes it back to RGB/HEX.

function changeHue(rgb, degree) {
    var hsl = rgbToHSL(rgb);
    hsl.h += degree;
    if (hsl.h > 360) {
        hsl.h -= 360;
    }
    else if (hsl.h < 0) {
        hsl.h += 360;
    }
    return hslToRGB(hsl);
}

// exepcts a string and returns an object
function rgbToHSL(rgb) {
    // strip the leading # if it's there
    rgb = rgb.replace(/^\s*#|\s*$/g, '');

    // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
    if(rgb.length == 3){
        rgb = rgb.replace(/(.)/g, '$1$1');
    }

    var r = parseInt(rgb.substr(0, 2), 16) / 255,
        g = parseInt(rgb.substr(2, 2), 16) / 255,
        b = parseInt(rgb.substr(4, 2), 16) / 255,
        cMax = Math.max(r, g, b),
        cMin = Math.min(r, g, b),
        delta = cMax - cMin,
        l = (cMax + cMin) / 2,
        h = 0,
        s = 0;

    if (delta == 0) {
        h = 0;
    }
    else if (cMax == r) {
        h = 60 * (((g - b) / delta) % 6);
    }
    else if (cMax == g) {
        h = 60 * (((b - r) / delta) + 2);
    }
    else {
        h = 60 * (((r - g) / delta) + 4);
    }

    if (delta == 0) {
        s = 0;
    }
    else {
        s = (delta/(1-Math.abs(2*l - 1)))
    }

    return {
        h: h,
        s: s,
        l: l
    }
}

// expects an object and returns a string
function hslToRGB(hsl) {
    var h = hsl.h,
        s = hsl.s,
        l = hsl.l,
        c = (1 - Math.abs(2*l - 1)) * s,
        x = c * ( 1 - Math.abs((h / 60 ) % 2 - 1 )),
        m = l - c/ 2,
        r, g, b;

    if (h < 60) {
        r = c;
        g = x;
        b = 0;
    }
    else if (h < 120) {
        r = x;
        g = c;
        b = 0;
    }
    else if (h < 180) {
        r = 0;
        g = c;
        b = x;
    }
    else if (h < 240) {
        r = 0;
        g = x;
        b = c;
    }
    else if (h < 300) {
        r = x;
        g = 0;
        b = c;
    }
    else {
        r = c;
        g = 0;
        b = x;
    }

    r = normalize_rgb_value(r, m);
    g = normalize_rgb_value(g, m);
    b = normalize_rgb_value(b, m);

    return rgbToHex(r,g,b);
}

function normalize_rgb_value(color, m) {
    color = Math.floor((color + m) * 255);
    if (color < 0) {
        color = 0;
    }
    return color;
}

// spaghetti code
document.querySelector("html").style.backgroundColor = changeHue(""+rgbToHex(runtime.getLayout("main").getLayer(0).backgroundColor[0]*255,runtime.getLayout("main").getLayer(0).backgroundColor[1]*255,runtime.getLayout("main").getLayer(0).backgroundColor[2]*255),runtime.getLayout("main").getLayer(0).effects[0].getParameter(0)*360);

document.querySelector("body").style.backgroundColor = changeHue(""+rgbToHex(runtime.getLayout("main").getLayer(0).backgroundColor[0]*255,runtime.getLayout("main").getLayer(0).backgroundColor[1]*255,runtime.getLayout("main").getLayer(0).backgroundColor[2]*255),runtime.getLayout("main").getLayer(0).effects[0].getParameter(0)*360);



	},

	async Efights_Event5_Act1(runtime, localVars)
	{
		var texto = runtime.globalVars.texto;
			console.log(runtime.globalVars.eachLetterPause = runtime.globalVars.eachLetterPause + runtime.globalVars.pause);
		if(texto[runtime.objects.gText.getFirstInstance().text.length + 1] == "^"){
		
		console.log(texto[runtime.objects.gText.getFirstInstance().text.length + 1]);
		/* si el siguiente caracter es un ^ se almacena el numero que viene después en "pause"*/
			runtime.globalVars.pause = parseInt(texto[runtime.objects.gText.getFirstInstance().text.length + 2],10);
			
			runtime.globalVars.eachLetterPause = runtime.globalVars.eachLetterPause + runtime.globalVars.pause;
			
			texto = texto.substring(0, texto.indexOf("^"+runtime.globalVars.pause)) + texto.substring(texto.indexOf("^"+runtime.globalVars.pause) + 2);
			console.log(texto);
		runtime.objects.gText.getFirstInstance().text = texto.substring(0,runtime.objects.gText.getFirstInstance().text.length + 1);
		} else{ // y si no pues pause se queda en cero
			runtime.globalVars.eachLetterPause = runtime.globalVars.eachLetterPause - runtime.globalVars.pause*2;
		runtime.globalVars.pause = 0;
			runtime.objects.gText.getFirstInstance().text = texto.substring(0,runtime.objects.gText.getFirstInstance().text.length + 1);
		}
		
	}
};

globalThis.C3.JavaScriptInEvents = scriptsInEvents;
