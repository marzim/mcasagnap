(function (doc, win, onclick, gid, classname, content, showMessage) {
    var
            a, b, c, colorLabel, cid, players, current, finished, newgameLabel, wonLabel, laststart = 1,
  
			cellAt = function (row, column) {
                return doc[gid](cid + row + column);
            },
            
			isCurrentColor = function (row, column) {
                return cellAt(row, column)[classname] === players[current];
            },
            
			start = function () {
                current = laststart = (laststart + 1) % 2;
                finished = 0;
                colorLabel[content] = colorLabel[classname] = players[current = (current + 1) % 2];
                for (a = 1; a < 7; a++)
                    for (b = 1; b < 8; b++)
                        cellAt(a, b)[classname] = '';
            },
            
			makeMove = function (row, column, previousCell) {
				previousCell > 0 && (cellAt(previousCell, column)[classname] = '');
                
				cellAt(previousCell + 1, column)[classname] = players[current];
                previousCell === row - 1 ? 
				function (row, column) {
                    return function (row, column) {
                        for (a = column - 1; 0 < a && isCurrentColor(row, a); a--) {
                        }
                        for (b = column + 1; 8 > b && isCurrentColor(row, b); b++) {
                        }
                        return 4 < b - a;
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
					(row, column) ? finished = 1 && win[showMessage](doc[gid](wonLabel)[content].replace("%s", players[current].toLowerCase())) && start()
							: colorLabel[content] = colorLabel[classname] = players[current = (current + 1) % 2]
				: setTimeout(function () {
                            makeMove(row, column, previousCell + 1)
                        }, 20);

            };

    return function (n, w, c, h, p1, p2) {
        cid = c;
        newgameLabel = n;
        wonLabel = w;
        colorLabel = doc[gid](c);
        players = [doc[gid](p1)[content], doc[gid](p2)[content]];
        for (a = 1; a < 7; a++)
            for (b = 1; b < 8; b++)
                cellAt(a, b)[onclick] = function (b, a) {
                    return function () {
                        if (!finished)
                            for (a = 6; a > 0; a--)
                                if (!cellAt(a, b)[classname]) {
                                    makeMove(a, b, 0);
                                    break;
                                }
                    };
                }(b);
        ;
        doc[gid](h)[onclick] = function () {
            win[showMessage](doc[gid](newgameLabel)[content]) && start()
        };
        start();
    };
})
(document, window, "onclick", "getElementById", "className", "innerHTML", "confirm")("newgame", "won", "color", "restart", "p1", "p2");