// Use this directive with type="text" input fields 
// Usage: v-positive-only
// Modifiers: v-positive-only.none_zero (input value can not be zero), 
//            v-positive-only.integer (only integer value)
// chain modifiers v-positive-only.none_zero.integer

export default {
  bind: function(el, binding) {
    el.addEventListener('keydown', (e) => {
      const allowedKeyCodes = [46, 8, 9, 27, 13]
     
      if(!binding.modifiers.integer && !e.target.value.includes('.') && e.target.value.length) {
        allowedKeyCodes.push(190, 110)
      }

      const lowerLimit = binding.modifiers.none_zero && e.target.selectionStart === 0 ? 49 : 48
      const upperLimit = binding.modifiers.none_zero && e.target.selectionStart === 0 ? 97 : 96

      if (allowedKeyCodes.indexOf(e.keyCode) !== -1 ||
        // Allow: Ctrl+A
        (e.keyCode === 65 && e.ctrlKey) ||
        // Allow: Ctrl+C
        (e.keyCode === 67 && e.ctrlKey) ||
        // Allow: Ctrl+X
        (e.keyCode === 88 && e.ctrlKey) ||
        // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 40)) {
        // let it happen, don't do anything
        return
      }
      // Ensure that it is a number and stop the keypress
      if ((e.shiftKey || (e.keyCode < lowerLimit || e.keyCode > 57)) && (e.keyCode < upperLimit || e.keyCode > 105)) {
        e.preventDefault()
      }
    })
  }
}
