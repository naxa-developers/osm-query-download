import { Control } from 'ol/control';

const CustomControl = /* @__PURE__ */ (Controls => {
  const CustomControls = optOptions => {
    const options = optOptions || {};
    const { ref } = options;

    Controls.call(this, {
      element: ref.current,
      target: options.target,
    });
  };
  if (Controls) Object.setPrototypeOf(CustomControls, Controls);
  CustomControls.prototype = Object.create(Controls && Controls.prototype);

  return CustomControls;
})(Control);

export default CustomControl;
