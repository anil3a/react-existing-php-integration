/**
 * Filter Product list by React with Searching Product Name or Supplier Name
 * @param Array products  Array list of data of products
 * @return HTML Output HTML elements to the page rendering product list
 * @author Anil prz <anilprz3@gmail.com>
 * @version 1.0
 */

class FilteredList extends React.Component
{
	constructor(props){
		super(props);
		const myproducts = products;
		this.state = {
			initialItems: myproducts,
			items: [],
			value: ''
		}

		this.filterList = this.filterList.bind(this);
	}

	filterList(event){
		this.setState({value: event.target.value});
		var updatedList = this.state.initialItems;
		updatedList = updatedList.filter(function(item){
			if( !item.last_modified_by )
			{
				item.last_modified_by = '';
			}
			return item.name.toString().toLowerCase().search( event.target.value.toString().toLowerCase() ) !== -1 ||
			 item.last_modified_by.toString().toLowerCase().search( event.target.value.toString().toLowerCase() ) !== -1;
		});

		this.setState({items: updatedList});
	}
	
	componentWillMount(){
		this.setState({items: this.state.initialItems});
	}

	onKeyPress(event) {
		//Prevent Enter Key to refresh page
	    if (event.which === 13 /* Enter */) {
	      event.preventDefault();
	    }
	}

	render(){
		return (
			<div className="filter-list">
				<form onKeyPress={this.onKeyPress}>
					<fieldset className="form-group">
						<input type="text" className="form-control form-control-md search-alignment" value={this.state.value}
							placeholder="Search" onChange={this.filterList} />
					</fieldset>
				</form>
				<table className="product-review-table">
				{ this.state.items.length > 0 ?
					<List items={this.state.items}/>
					: <tbody><tr className="product-review-tr"><td colSpan="6">No Results.</td></tr></tbody>
				}
				</table>
			</div>
		);
	}
}



class List extends React.Component {

	render(){
		return (
			<tbody>
			{
				this.props.items.map(function(item) {
					return <tr className="product-review-tr" key={"prod-"+item.id}>
                            <td>{item.name}</td>
                            <td><a className="product-review-edit" href={"/product/edit/" + item.id}>edit</a></td>
                            <td>{ item.last_modified_by ? item.last_modified_by : <span className="softGrey">Last modified by is not logged yet.</span> }</td>
                            <td><a className="product-review-delete hand" data-toggle="modal" data-target="#product-delete" id={item.id}>X</a></td>
                        </tr>
				})
			}
			</tbody>
		);  
	}
}

ReactDOM.render(<FilteredList />, document.getElementById('thisiswhereirenderonetable'));