/**
 * Created by ashishchaturvedi on 31/07/17.
 */
import React,  { Component } from 'react';
import ReactDOM from 'react-dom';
import JSONEditor from 'jsoneditor';


class MainView extends Component{
    constructor(){
        super();
        this.state = {
            createViewDisplay: false,
            data:[]
        };
        this.handleCreate = this.handleCreate.bind(this);
    }
    loadAppConfigsFromServer() {
        const _self = this;
        //TODO : Make a service call to get data
        setTimeout(function(){
            _self.setState({data: [
                { name:'ashish', age: 45, years: 5 },
                { name:'ashish', age: 45, years: 5 },
                { name:'ashish', age: 45, years: 5 },
                { name:'ashish', age: 45, years: 5 },
            ]});
        },1000);
    }

    componentDidMount() {
        this.loadAppConfigsFromServer();
    }
    handleCreate=(status)=>{
        this.setState({createViewDisplay: status});
    }
    render() {
        return (
            <div>
                { (this.state.createViewDisplay) && <CreateConfigView cb={this.handleCreate}></CreateConfigView>}
                { (!this.state.createViewDisplay) && <ConfigTable data={this.state.data} cb={this.handleCreate} /> }
            </div>
        );
    }
};

class CreateConfigView extends Component{
    constructor(props){
        super(props);
        this.state = {
            editor : null
        };
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        var container = ReactDOM.findDOMNode(this.refs.jsonEditor);
        var options = {};
        var editor = new JSONEditor(container, options);

        // set json
        var json = {
            "Array": [1, 2, 3],
            "Boolean": true,
            "Null": null,
            "Number": 123,
            "Object": {"a": "b", "c": "d"},
            "String": "Hello World"
        };
        editor.set(json);
        this.setState(function(){
            return {editor:editor}
        })
    }
    handleSubmit(){
        var editor = this.state.editor;
        var json = editor.get();
        console.log(json);
    }
    handleClose(){
        this.props.cb(false);
    }
    render() {
        return (
            <div className="container">
                <button onClick={this.handleClose}>Close</button>
                <table className="table table-striped">
                    <tbody>
                    <tr>
                        <td>
                            <div id="jsoneditor" ref="jsonEditor"></div>
                        </td>
                        <td>
                            <small>Namespace</small>
                            <input
                                type="text"
                                className="form-control"
                                name="title"
                            />
                            <br />
                            <small>App Name</small>
                            <input
                                type="text"
                                className="form-control"
                                name="appName"
                            />
                            <br />
                            <button className="btn btn-info" onClick={this.handleSubmit}>Submit</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>);
    }
};

class ConfigTable extends Component{
    constructor(props){
        super(props);
        this.handleClose = this.handleClose.bind(this);
    }
    handleClose(){
        this.props.cb(true);
    }
    render() {
        var rows = [];
        this.props.data.forEach(function(itemRec, i) {
            rows.push(<ConfigInfo key={i} item={itemRec} />);
        });
        return (
            <div className="container">
                <button className="btn btn-info" onClick={this.handleClose}>Create</button>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Years</th>
                    </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
            </div>);
    }
};

var ConfigInfo = React.createClass({
    getInitialState: function() {
        return {display: true };
    },
    handleDelete() {
        const _self = this;
        setTimeout(function(){
            _self.setState({display: false});
        },1000);
    },
    handleEdit() {

    },
    render: function() {
        const _item = this.props.item;
        return (
            <tr>
                <td>{_item.name}</td>
                <td>{_item.age}</td>
                <td>{_item.years}</td>
                <td>
                    <button className="btn btn-info" onClick={this.handleEdit}>Edit</button>
                    <button className="btn btn-info" onClick={this.handleDelete}>Delete</button>
                </td>
            </tr>
        );
    }
});

export default MainView;