/**
 * Filter Ingredient-A and Ingredient-B list by React with Searching feature
 * @param Array allIngredints  Array list of data of Ingredient
 * @return HTML Output HTML elements to the page rendering Ingredient list
 * @author Anil prz <anilprz3@gmail.com>
 * @version 1.0
 */
class FilteredListTwo extends React.Component
{
	constructor(props){
		super(props);
		this.state = {
			initialItems: allIngredients,
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
	    if (event.which === 13 /* Enter */) {
	      event.preventDefault();
	    }
	}

	render(){
		return (
			<div className="filter-list">

				<form onKeyPress={this.onKeyPress}>
					<fieldset className="form-group">
						<input type="text" className="form-control form-control-md" value={this.state.value}
							placeholder="Search by ingredients" onChange={this.filterList} />
						
						
					</fieldset>
				</form>


				<div className="TableForIngAid">
				{ this.state.items.length > 0 ?
					<ListTwo items={this.state.items}/>
					: <table className="productIng-review-table">
						<tbody>
							<tr className="noBorderTitle">
			                    <td className="noBorderTitle"><div className="green-2nd b lineHeight33">Ingredients</div></td>
			                    <td colSpan="2"></td>
			                </tr>
							<tr className="productIng-review-tr"><td colSpan="4">No Results.</td></tr>
						</tbody>
					  </table>
				}
				</div>
			</div>
		);
	}
}



class ListTwo extends React.Component {

	render(){

		let ing = [];
		let ingb = [];

		let LENT = this.props.items.length;
		let items = this.props.items;
		for (var i = 0; i < LENT; i++)
		{
		    if( items[i].type == "ingredient-a" ) {
		    	ing[i] = items[i];
			} else {
				ingb[i] = items[i];
			}
		}

		return (
			<table className="productIng-review-table">
			<tbody>
				<tr className="noBorderTitle">
                    <td className="noBorderTitle"><div className="green-2nd b lineHeight33">Ingredients</div></td>
                    <td colSpan="2"></td>
                </tr>
			{
				ing.length > 0 ?
				ing.map(function(item) {
					return <tr className="productIng-review-tr" key={"ing-a-"+item.id}>
                            <td>{item.name}</td>
                            <td><a className="productIng-review-edit" href={"/ingredients/"+ item.type +"/edit/" + item.id}>edit</a></td>
                            <td><a className="productIng-review-delete productIng-ingredient-delete hand" data-toggle="modal" 
                            	data-target="#ingredient-delete"  data-id={item.id}>X</a></td>
                        </tr>
				})
				: <tr className="productIng-review-tr"><td colSpan="6">Not Found.</td></tr>
			}

				<tr className="noBorderTitle">
					<td className="noBorderTitle" colSpan="4"> &nbsp; </td>
				</tr>
				<tr className="noBorderTitle">
					<td className="noBorderTitle"><div className="green-2nd b">Ingredients B</div></td>
					<td colSpan="2"></td>
				</tr>
			{
				ingb.length > 0 ?
				ingb.map(function(item) {
					return <tr className="productIng-review-tr" key={"ing-b-"+item.id}>
                            <td>{item.name}</td>
                            <td><a className="productIng-review-edit" href={"/ingredients/"+ item.type +"/edit/" + item.id}>edit</a></td>
                            <td><a className="productIng-review-delete productIng-aid-delete hand" data-toggle="modal" 
                            	data-target="#ingredient-delete"  data-id={item.id}>X</a></td>
                        </tr>
				})
				: <tr className="productIng-review-tr"><td colSpan="6">Not Found.</td></tr>
			}
			</tbody>
			</table>
		);  
	}
}

ReactDOM.render(<FilteredListTwo />, document.getElementById('thisiswhereirenderTwoTableSearchable'));