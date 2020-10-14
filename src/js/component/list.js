import React from "react";
import PropTypes from "prop-types";

const List = ({ lista, onDeleteClicked, counter }) => {
	const listas = lista.map((elemento, index) => {
		console.log(elemento, index);
		if (elemento.done === true) {
			return (
				<li className="todos" key={index}>
					{elemento.label}
					<i className="eliminar fa fa-times" onClick={() => onDeleteClicked(index)} />
				</li>
			);
		}
	});

	return (
		<ul>
			{listas}
			{counter}
		</ul>
	);
};

export default List;

List.propTypes = {
	lista: PropTypes.any,
	onDeleteClicked: PropTypes.any,
	counter: PropTypes.any
};
