# react-radio

> A carefully crafted radio-group for React

See demo at [zippyui.github.io/react-radio](http://zippyui.github.io/react-radio)

## Install

```sh
$ npm install react-radio
```

## Usage

```jsx
var RadioGroup = require('react-radio')

var colors = [
    {
        value: 'red',
        label: 'Red color',
        style: {
            color: 'red'
        }
    },
    'blue',
    'orange'
]

function onChange(value, event){
    console.log('checked ', value)
}

//uncontrolled
<RadioGroup
    name="colors"
    defaultValue={'red'}
    items={colors}
    onChange={onChange}
/>

var COLOR = 'red'
//controlled
<RadioGroup name="colors" value={COLOR} items={colors} onChange={onChange} />

<RadioGroup name="colors" value={'red'} onChange={onChange}>
    <input type="radio" value="blue" />blue
    <input type="radio" value="red" />red
</RadioGroup>
```

## Props

 * name: String - the name to be set to all radios in the group
 * value/defaultValue - the value that should be checked in the group (controlled/uncontrolled)
 * labelStyle - a style for the radio label
 * inputStyle - a style for the radio input

 * checkedLabelStyle - a style for the checked radio label
 * checkedInputStyle - a style for the checked radio input

 * onChange: Function(value, event) - the function to be calle when the radio group value changes. NOTE: first param sent to this function is the new value, not the event object, as usual

 * renderRadio: Function(props, index, arr) - you can customize how each radio item is rendered in the group using this function. NOTE: it is called with 3 params, so not intended to be directly used with a React factory.

 Example:
 ```jsx
    //NOT LIKE THIS
    <RadioGroup renderRadio={React.DOM.label} />

    //BUT like this
    function renderRadio(props, index, arr){
        return <label {...props} />
    }

    <RadioGroup renderRadio={renderRadio} />

    //or
    function renderRadio(props, index, arr){
        if (index < arr.length - 1){
            props.style.borderBottom = '1px solid blue'
        }
        props.style.display = 'block'
        //we can skip returning something
        //if we only want to modify props/styles
    }
 ```

 If the `renderRadio` function returns undefined, we assume you just wanted to modify the props before rendering, which is ok, so we fallback to the default implementation:
 `<label {...props}/>`

 * items: Array

    The items prop can be an array of strings/objects or mixed. If an array of strings, the strings will be used as both value and label. If objects, `item.value` will be used as a value, and `item.label` as a string:

    Example:
    ```js
        var items = [
            {label: 'Green', value: 'green'},
            {label: 'Blueish', value: 'blue'},
            {value: 'red'} //'red' will be used as both value and label
        ]

        //or
        var items = ['green', 'blue', 'red']
    ```

    If an array item is an object, besides `value`, `label`, and `children`, it can also have a `style` property,a `checkedStyle` property, and a `disabled` property.

    ```js
    var items = [
        'red',
        {
            label: 'Blue',
            value: 'blue',
            disabled: true,
            style: { color: 'blue'},
            checkedStyle: { color: 'blue', background: 'red'}
        }
    ]
    ```

 * children - if the component specifies children, the radio group children will not be generated from `items`, but will be what you specify in the `children` prop

If you have a ref to the `react-radio` component, you can also call `group.getValue()` to get the current value of the radio group.

## Changelog

See [changelog](./CHANGELOG.md)

## Contributing

Use [Github issues](https://github.com/zippyui/react-radio/issues) for feature requests and bug reports.

We actively welcome pull requests.

For setting up the project locally, use:

```sh
$ git clone https://github.com/zippyui/react-radio
$ cd react-radio
$ npm install
$ npm serve # to start http server
$ npm dev   * to start webpack-dev-server
```

Now navigate to [localhost:9091](http://localhost:9091/)

Before building a new version, make sure you run

```sh
$ npm run build
```
which compiles the `src` folder (which contains jsx files) into the `lib` folder (only valid EcmaScript 5 files).

## License

#### MIT