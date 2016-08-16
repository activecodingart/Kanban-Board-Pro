var baseUrl = "https://kodilla.com/pl/bootcamp-api",
	myHeaders = {
		'X-Client-Id': 34,
		'X-Auth-Token': 'c653d293f42eccc91242e20599db6a12'
	}

$.ajaxSetup({
	headers: myHeaders
});

$.ajax({
	url: baseUrl + '/board',
	method: 'GET',
	success: function(response) {
		setupColumns(response.columns);
	}
});

function setupColumns(columns) {
	columns.forEach(function(column) {
		var col = new Column(column.id, column.name);
		board.createColumn(col);
		setupCards(col, column.cards);
	});
}

function setupCards(col, cards) {
	cards.forEach(function (card) {
		var card = new Card(card.id, card.name, card.bootcmap_kanban_column_id);
		col.createCard(card);
	});
}