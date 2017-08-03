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
            data:[],
            item:null
        };
        this.handleCreate = this.handleCreate.bind(this);
        this.handleItemDelete = this.handleItemDelete.bind(this);

        this.loadAppConfigsFromServer = this.loadAppConfigsFromServer.bind(this);
    }
    loadAppConfigsFromServer() {
        const _self = this;
        //TODO : Make a service call to get data
        setTimeout(function(){
            _self.setState({
                createViewDisplay: false,
                data: [
                { data:{
                    "Array": [1, 2, 3],
                    "Boolean": true,
                    "Null": null,
                    "Number": 123,
                    "Object": {"a": "b", "c": "d"},
                    "String": "Hello World 1"
                }, name: 'name1', namespace: 'namespace1' },
                { data:{
                    "Array": [1, 2, 3],
                    "Boolean": true,
                    "Null": null,
                    "Number": 123,
                    "Object": {"a": "b", "c": "d"},
                    "String": "Hello World 2"
                }, name: 'name2', namespace: 'namespace2' },
                { data:{
                    "Array": [1, 2, 3],
                    "Boolean": true,
                    "Null": null,
                    "Number": 123,
                    "Object": {"a": "b", "c": "d"},
                    "String": "Hello World 3"
                }, name: 'name3', namespace: 'namespace3'  },
                { data:{
                    "Array": [1, 2, 3],
                    "Boolean": true,
                    "Null": null,
                    "Number": 123,
                    "Object": {"a": "b", "c": "d"},
                    "String": "Hello World 4"
                }, name: 'name4', namespace: 'namespace4'  }
            ]});
        },1000);
    }

    componentDidMount() {
        this.loadAppConfigsFromServer();
    }
    handleCreate=(status, data)=>{
        this.setState({
            createViewDisplay: status,
            item:data
        });
    }
    handleItemDelete=(index)=>{
        this.setState({
            item:this.state.data.splice(index, 1)
        });
    }
    render() {
        return (
            <div>
                { (this.state.createViewDisplay) && <CreateConfigView item={this.state.item} cb={this.handleCreate} fetch={this.loadAppConfigsFromServer}></CreateConfigView>}
                { (!this.state.createViewDisplay) && <ConfigTable data={this.state.data} cb={this.handleCreate} handleDelete={this.handleItemDelete} /> }
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
        const json = this.props.item;
        let item = {};
        if(json){
            this.refs.name.value = json.name;
            this.refs.namespace.value = json.namespace;
            if(json['data']) {
                item = json['data'];
            }
        }

        editor.set(item);
        this.setState(function(){
            return {
                editor:editor
            }
        })
    }
    handleSubmit(){
        var editor = this.state.editor;
        var json = editor.get();
        console.log(json);
        console.log(this.refs.name.value);
        console.log(this.refs.namespace.value);
        const _self = this;
        //TODO : Make a service call to get data
        setTimeout(function(){
            _self.props.fetch();
        },1000);
    }
    handleClose(){
        this.props.cb(false, null);
    }
    render() {
        const _item = this.props.item || {};
        return (
            <div className="container">
                <button onClick={this.handleClose}>Close</button>
                <table className="table table-striped">
                    <tbody>
                    <tr>
                        <td>
                            <div id="jsoneditor" ref="jsonEditor" className="jsonEditor"></div>
                        </td>
                        <td>
                            <small>Namespace</small>
                            <input
                                type="text"
                                className="form-control"
                                ref='name'
                            />
                            <br />
                            <small>App Name</small>
                            <input
                                type="text"
                                className="form-control"
                                ref='namespace'
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
        this.renderItem = this.renderItem.bind(this);
        this.handleItemEdit = this.handleItemEdit.bind(this);
    }
    handleClose(){
        this.props.cb(true, null);
    }
    handleItemEdit(status, data){
        this.props.cb(true, data);
    }
    renderItem(itemRec, i) {
        return (<ConfigInfo key={i} index={i} item={itemRec} handleEditItem={this.handleItemEdit}  handleItemDelete={this.props.handleDelete} />);
    }
    render() {
        const items = this.props.data;
        var rows = items.map(this.renderItem);
        return (
            <div className="container">
                <button className="btn btn-info" onClick={this.handleClose}>Create</button>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Namespace</th>
                    </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
            </div>);
    }
};

class ConfigInfo extends Component{
    constructor(props){
        super(props);
        this.state = { };
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    handleDelete() {
        const _self = this;
        _self.setState({display: false});

        this.props.handleItemDelete(this.props.index);
    }
    handleEdit() {
        this.props.handleEditItem(false, this.props.item);
    }
    render() {
        const _item = this.props.item;
         return (
            <tr>
                <td>{_item.name}</td>
                <td>{_item.namespace}</td>
                <td>
                    <button className="btn btn-info" onClick={this.handleEdit}>Edit</button>
                    <button className="btn btn-info" onClick={this.handleDelete}>Delete</button>
                </td>
            </tr>
        );
    }
};

export default MainView;