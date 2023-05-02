export default {
  bind(el, binding, vnode) {
    const lngRegexObj = { // you can add more languages if you need
      arm: /[^Ա-Ֆա-ֆ\s]/gi,
      ru: /[^А-Яа-я\s]/gi,
      en: /[^A-Za-z\s]/gi,
    }
    // const customEvent = new CustomEvent('input', { bubbles: true })

    if(lngRegexObj[binding.value]) {
      const customEvent = document.createEvent('UIEvent');
      customEvent.initEvent('input', true, false);

      const eventHandler = function (e) {
        e.target.value = e.target.value.replace(lngRegexObj[binding.value], "")
        vnode.elm.dispatchEvent(customEvent)
        // console.clear() // getting error needs to be debugged
      }
      el.addEventListener('input', eventHandler)
    } else {
      console.error(`The only languages provided are ${Object.keys(lngRegexObj).join(', ')}. Please add your language in input-lng.js`)
    }
  }
  // bind(el, binding, vnode) {
  //   const maxChars = binding.value;
  //   const handler = function(e) {
  //     if (e.target.value.length > maxChars) {
  //       e.target.value = e.target.value.substr(0, maxChars);
  //       vnode.elm.dispatchEvent(new CustomEvent('input')); // added this
  //     }
  //   }
  //   el.addEventListener('input', handler);
  // }

}
