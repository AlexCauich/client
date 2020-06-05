import React, { Component } from 'react';
import { getList, addItem, deleteItem, updateItem } from './RegisterFunction';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            
                name_job: '',
                name_service: '',
                phone: '',
        
            
            items: []
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        this.getAll();
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    getAll= () => {
        getList().then(data => {
            this.setState({
                name_job: '',
                name_service: '',
                phone: '',
                items:[...data]
            },
            () => {
                console.log(this.state.items) 
            })
        })
    }

    onSubmit = e => {
        e.preventDefault()
        const formDate = new FormData();
        formDate.append('name_job', this.state.name_job)
        formDate.append('name_service', this.state.name_service)
        formDate.append('phone', this.state.phone)

        addItem(formDate).then(() => {
            this.getAll();
        });
    }


    renderProducts() {
        return this.state.items.map(item => {
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name_job}</td>
                    <td>{item.name_service}</td>
                    <td>{item.phone}</td>
                </tr>
);
        })
      }

    render() {
        return(
            <div className="App jumbotron">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <form onSubmit={this.onSubmit} className="card">
                            <div className="card-header">New Register </div>
                            <div className="card-body">
                                <div className="form-group">
                                    <label htmlFor="name_job">Name job</label>
                                    <input type="text" className="form-control" id="name_job" name="name_job" value={this.state.name_job || ''} onChange={this.onChange.bind(this)}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name_service">Name service</label>
                                    <input type="text" className="form-control" id="name_service" name="name_service" value={this.state.name_service || ''} onChange={this.onChange.bind(this)}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name_phone">Phone</label>
                                    <input type="text" className="form-control" id="phone" name="phone" value={this.state.phone || ''} onChange={this.onChange.bind(this)}/>
                                </div>
                            </div>
                            <div className="card-footer">
                                <button type="submit" className="btn btn-success" onClick={this.onSubmit.bind(this)}>Save</button>
                            </div>
                        </form>
                    </div>
                    <div className="col-md-8">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name job</th>
                                    <th>Name service</th>
                                    <th>Phone</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderProducts()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register;