'use strict';

var React = require('react')
var assign = require('object-assign')

function emptyFn(){}

module.exports = React.createClass({

    displayName: 'ReactRadioGroup',

    propTypes: {
        name: React.PropTypes.string.isRequired,
        items: function(props, name){
            if (!props.children && !props.items){
                return new Error('Your component has no children. In this case, you should specify an items array.')
            }
        }
    },

    componentDidUpdate: function() {
        if (!this.shouldGenerateChildren()){
            this.setRadioNames()
            this.setCheckedRadio()
        }
    },

    componentDidMount: function() {
        if (!this.shouldGenerateChildren()){
            this.setRadioNames()
            this.setCheckedRadio()
        }
    },

    setCheckedRadio: function(){
        var value = this.props.value != null?
                        this.props.value:
                        this.state.defaultValue

        this.someRadio(function(radio){
            if (radio.value == value){
                radio.checked = true
                return true
            }
        })
    },

    setRadioNames: function() {
        this.forEachRadio(function(radio){
            radio.setAttribute('name', this.props.name)
        })
    },

    someRadio: function(fn){
        var $radios = this.getRadios()

        return [].some.call($radios, fn, this)
    },

    forEachRadio: function(fn) {
        var $radios = this.getRadios()

        return [].forEach.call($radios, fn, this)
    },

    getRadios: function() {
        return this.getDOMNode().querySelectorAll('input[type="radio"]')
    },

    getDefaultProps: function() {
        return {
            defaultLabelStyle: {
                cursor: 'pointer'
            },
            defaultInputStyle: {
                cursor: 'pointer'
            }
        }
    },

    getInitialState: function() {
        return {
            defaultValue: this.props.defaultValue
        }
    },

    render: function(){
        var props = this.prepareProps(this.props, this.state)

        return <div {...props} />
    },

    getValue: function() {
        if (this.value == undefined){
            this.value = this.state.defaultValue
        }

        return this.value
    },

    handleChange: function(event) {
        var target = event.target
        var fn     = this.props.onChange || emptyFn
        var value  = this.value = target.value

        fn(value, event)

        if (this.props.value == null){
            this.setState({
                defaultValue: value
            })
        }
    },

    shouldGenerateChildren: function() {
        return !this.props.children
    },

    prepareProps: function(thisProps, state) {

        var props = {}

        assign(props, thisProps)

        if (this.shouldGenerateChildren()){
            props.labelStyle = this.prepareLabelStyle(props, state)
            props.inputStyle = this.prepareInputStyle(props, state)
            props.children   = this.prepareChildren(props, state)
        }

        props.onChange = this.handleChange

        return props
    },

    prepareLabelStyle: function(props) {
        return assign({}, props.defaultLabelStyle, props.labelStyle)
    },

    prepareInputStyle: function(props) {
        return assign({}, props.defaultInputStyle, props.inputStyle)
    },

    prepareChildren: function(props, state) {

        var checkedValue = props.value != null?
                            props.value:
                            state.defaultValue

        return (props.items || []).map(function(item, index, arr){

            var inputStyle = assign({}, props.inputStyle)
            var labelStyle = assign({}, props.labelStyle)
            var disabled = item.disabled
            var checked
            var value
            var children

            if (typeof item === 'string'){
                value    = item
                checked  = checkedValue == value
                children = item
            } else {
                value    = item.value
                children = item.label || item.value || item.children
                checked  = checkedValue == value

                if (item.inputStyle){
                    assign(inputStyle, item.inputStyle)
                }
                if (item.style){
                    assign(labelStyle, item.style)
                }
            }

            if (checked){
                assign(inputStyle, props.checkedInputStyle)
                assign(labelStyle, props.checkedLabelStyle)

                if (checked && item && item.checkedStyle){
                    assign(labelStyle, item.checkedStyle)
                }
            }

            var inputProps = {
                checked : checked,
                value   : value,
                name    : props.name,
                type    : 'radio',
                disabled: disabled,
                style   : inputStyle,
                onChange: emptyFn
            }

            var radioProps = {
                key       : index,
                checked   : checked,
                index     : index,
                name      : props.name,
                value     : value,
                style     : labelStyle,
                inputProps: inputProps,
                children  : [
                    <input {...inputProps}/>,
                    children
                ]
            }

            var renderFn = props.renderRadio
            var result

            if (renderFn){
                result = renderFn(radioProps, index, arr)
            }

            if (result === undefined){
                result = <label {...radioProps} />
            }

            return result
        }, this)
    }
})