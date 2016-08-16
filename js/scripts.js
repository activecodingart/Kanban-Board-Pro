$(function() {
	
	/* Create random string*/
	function randomString() {
		var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
			str = '',
			i = 0;
		for(i = 0; i < 10; i++) {
			str += chars[Math.floor(Math.random() * chars.length)];
		}
		
		return str;
	}
	/* Create column*/
	function Column(name) {
		var self = this;
		
		this.id = randomString();
		this.name = name;
		this.$element = createColumn();
		
		function createColumn() {
			
			var $column = $('<div>').addClass('column panel panel-primary'),
				$columnTitle = $('<h2>').addClass('column-title panel-heading').text(self.name),
				$columnCardList = $('<ul>').addClass('column-card-list list-group'),
				$columnDelete = $('<button>').addClass('btn-delete-column btn btn-xs btn-danger pull-right').text('x'),
				$columnAddCard = $('<button>').addClass('add-card btn btn-xs btn-success').text('Add a card...');
			
			$columnDelete.click(function() {
				self.removeColumn();
			});
			
			$columnAddCard.click(function() {
				self.addCard( new Card(prompt("Write card name")));
			});
			
			$column.append($columnTitle)
					.append($columnAddCard)
					.append($columnDelete)
					.append($columnCardList);
			
			return $column;
		}
	}
	
	Column.prototype = {
		addCard: function(card) {
			if (card.description) {
				this.$element.children('ul').append(card.$element);
			}
		},
		removeColumn: function() {
			this.$element.remove();
		}
	}
	/* Create card */
	function Card(description) {
		var self = this;
		
		this.id = randomString();
		this.description = description;
		this.$element = createCard();
		
		function createCard() {
			var $card = $('<li>').addClass('card list-group-item'),
				$cardDescription = $('<p>').addClass('card-description').text(self.description),
				$cardDelete = $('<button>').addClass('btn-delete btn btn-xs btn-danger pull-right').text('x');
			
			$cardDelete.click(function() {
				self.removeCard();
			});
			
			$card.append($cardDelete)
					.append($cardDescription);
			
			return $card;
		}
	}
	
	Card.prototype = {
		removeCard: function() {
			this.$element.remove();
		}
	}
	/* Create column */
	var board = {
		name: "Kanban Board",
		$element: $('#board .column-container'),
		addColumn: function(column) {
			if(column.name) {
				this.$element.append(column.$element);
				initSortable();
			}
		}
	}
	
	function initSortable() {
		$('.column-card-list').sortable({
			connectWith: '.column-card-list',
			placeholder: 'card-placeholder'
		}).disableSelection();
	}
	/* Add column*/
	$('.create-column').click(function() {
		var name = prompt('Write column name'),
			column = new Column(name);
		board.addColumn(column);
	});
	
	var todoColumn = new Column('ToDo'),
		doingColumn = new Column('Doing'),
		doneColumn = new Column('Done');
	
	board.addColumn(todoColumn);
	board.addColumn(doingColumn);
	board.addColumn(doneColumn);
	
});