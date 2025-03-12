/**
 * @file mofron-comp-apptitle/index.js
 * @brief simple app title component for mofron
 * @license MIT
 */
const Text     = require('mofron-comp-text');
const Image    = require('mofron-comp-image');
const Button   = require('mofron-comp-framebutton');
const AppBase  = require('mofron-comp-appbase');
const loMargin = require('mofron-layout-margin'); 
const Click    = require('mofron-event-click');
const ConfArg  = mofron.class.ConfArg;
const comutl   = mofron.util.common;
const resp_css = require('./style.txt');

module.exports = class extends AppBase {
    /**
     * initialize component
     * 
     * @param (mixed) key-value: component config
     * @type private
     */
    constructor (p1) {
        try {
            super();
            this.modname('AppTitle');
            
            this.confmng().add('buttonEvent', { type:'event', list:true });
            
	    if (0 < arguments.length) {
                this.config(p1);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    initDomConts () {
        try {
	    super.initDomConts();
            
            // title setting
	    this.title1().size('0.6rem');
            this.title2().size('0.6rem');
            
	    // header setting
	    this.header().childDom().class("titlescreen_header");
	    this.header().childDom().style({ width:'100%' });
            this.header().child([this.title1(), this.title2()]);
	    this.header().style({ 'border-bottom-width': '0rem' });

	    // image setting
	    this.image().styleDom().class("titlescreen_image");
	    this.image().style({ "display":"block" });
	    this.child(this.image());
            
            // button area setting
            this.buttonArea().styleDom().class("titlescreen_button");
	    this.buttonArea().layout(new loMargin('top','0.2rem'));
            this.child(this.buttonArea());

            this.mainColor([255,255,255]);
	    mofron.window.landscapeEvent(this.orientStyle, this);
            mofron.window.portraitEvent(this.orientStyle, this);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    beforeRender () {
        try {
            super.beforeRender();
            this.orientStyle(null,null,this);

	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    afterRender () {
        try {
            super.afterRender();

            let style = document.createElement("style");
            style.type = "text/css";
            style.innerHTML = resp_css.default || resp_css;
            document.head.appendChild(style);

	} catch (e) {
            console.error(e.stack);
	    throw e;
	}
    }

    orientStyle (o1,o2,o3) {
        try {
            // check initial screen orientation
            if (true === mofron.window.isPortrait()) {
                // portrait mode
		o3.header().height('1.3rem');
            } else {
                // landscape mode
		o3.header().height('0.8rem');
		if ('mobile' === mofron.util.common.accdev()) {
                    o3.image().size('70vh', '70vh');
                    o3.image().style({ 'margin-top':'0vh' });
		}
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    title (txt1, txt2) {
        try {
            this.title1(txt1);
            this.title2(txt2);
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }

    title1 (prm,cnf) {
        try {
            if ('string' === typeof prm) {
                this.title1().text(prm);
                this.title1().config(cnf);
                return;
            }
            return this.innerComp("title1", prm, Text);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    title2 (prm, cnf) {
        try {
            if ('string' === typeof prm) {
                this.title2().text(prm);
                this.title2().config(cnf);
                return;
            }
            return this.innerComp("title2", prm, Text);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    image (prm,cnf) {
        try {
            if ('string' === typeof prm) {
                this.image().src(prm);
                this.image().config(cnf);
                return;
            }
            return this.innerComp('image', prm, Image);
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }
    
    buttonArea (prm) {
        try {
            return this.innerComp('buttonArea', prm, mofron.class.Component);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    button (prm) {
        try {
	    let button = new Button({
	                     text: new ConfArg(prm, { 'style': {'font-size':'0.38rem'} }),
			     width: '100%', height:'0.5rem',
			     event: new Click(new ConfArg(this.execButtonEvent,this)),
                             baseColor: [255,255,255]
			 });
            this.buttonArea().child(button);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    buttonPos (top, left) {
        try {
            
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    buttonEvent (fnc,prm) {
        try {
            return this.confmng("buttonEvent", (undefined !== fnc)? [fnc,prm]:fnc);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    execButtonEvent (e1,e2,e3) {
        try {
            let btn_evt = e3.buttonEvent();
            for (let eidx in btn_evt) {

                let btn_idx = null;
		let btn_lst = e3.buttonArea().child();
		for (let bidx in btn_lst) {
                    if (btn_lst[bidx].id() === e1.id()) {
                        btn_idx = parseInt(bidx);
			break;
		    }
		}
                // execute event function
                btn_evt[eidx][0](e3, btn_idx, btn_evt[eidx][1]);
	    }
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }

    mainColor (prm) {
        try {
            super.mainColor(prm);
            this.baseColor(prm);
            this.accentColor(prm);
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }

}
/* end of file */
