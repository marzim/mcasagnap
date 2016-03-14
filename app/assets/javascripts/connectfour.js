(function() {
    var
            a, b, c, colorLabel, cid, players, current, finished, newgameLabel, wonLabel, laststart = 1,
  
			cellAt = function (row, column) {
                return document.getElementById(cid + row + column);
            },
            
			isCurrentColor = function (row, column) {
                return cellAt(row, column)["className"] === players[current];
            },
            
			start = function () {
                current = laststart = (laststart + 1) % 2;
                finished = 0;
                colorLabel["innerHTML"] = colorLabel["className"] = players[current = (current + 1) % 2];
                for (a = 1; a < 7; a++)
                    for (b = 1; b < 8; b++)
                        cellAt(a, b)["className"] = '';
            },
            
			makeMove = function (row, column, previousCell) {
			
				previousCell > 0 && (cellAt(previousCell, column)["className"] = '');
                cellAt(previousCell + 1, column)["className"] = players[current];				
				alert("makeMove row: " + row + " column " + column + " previousCell " + previousCell);
                previousCell === row - 1 ? 
				function (row, column) {
                    return function (row, column) {
                        for (a = column - 1; 0 < a && isCurrentColor(row, a); a--) {
                        }
                        for (b = column + 1; 8 > b && isCurrentColor(row, b); b++) {
                        }
						var val = 4 < b - a;
						return val;
                    }
					(row, column) || function (row, column) {
                        for (c = row + 1; 7 > c && isCurrentColor(c, column); c++) {
                        }
                        return 3 < c - row;
                    }
					(row, column) || function (row, column) {
                        for (a = row - 1, b = column - 1; 0 < a && !(1 > b) && isCurrentColor(a, b); a--)
                            b--;
                        for (c = row + 1, b = column + 1; 7 > c && !(7 < b) && isCurrentColor(c, b); c++)
                            b++;
                        return 4 < c - a
                    }
					(row, column) || function (row, column) {
                        for (a = row - 1, b = column + 1; 0 < a && !(7 < b) && isCurrentColor(a, b); a--)
                            b++;
                        for (c = row + 1, b = column - 1; 7 > c && !(1 > b) && isCurrentColor(c, b); c++)
                            b--;
                        return 4 < c - a;
                    }(row, column);
                }
				
					(row, column) ? finished = 1 && window["confirm"](document.getElementById(wonLabel)["innerHTML"].replace("%s", players[current].toLowerCase())) && start()
							: colorLabel["innerHTML"] = colorLabel["className"] = players[current = (current + 1) % 2]
				: setTimeout(function () {
                            makeMove(row, column, previousCell + 1)
                        }, 20);

            };

    return function () {		
        cid = "color";
        newgameLabel = "newgame";
        wonLabel = "won";
        colorLabel = document.getElementById("color");
        players = [document.getElementById("p1")["innerHTML"], document.getElementById("p2")["innerHTML"]];
        for (row = 1; row < 7; row++)
            for (column = 1; column < 8; column++)
                cellAt(row, column)["onclick"] = function (column, row) {
                    return function () {
                        if (!finished)
                            for (row = 6; row > 0; row--)
                                if (!cellAt(row, column)["className"]) {
                                    makeMove(row, column, 0);
                                    break;
                                }
                    };
                }(column);
        ;
        document.getElementById("restart")["onclick"] = function () {		
            window["confirm"](document.getElementById(newgameLabel)["innerHTML"]) && start()
        };
        start();
    };
})
()()