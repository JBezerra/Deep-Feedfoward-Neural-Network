class Matrix {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.data = [];

        // Initializing Matrix
        for (var i = 0; i < this.rows; i++) {
            this.data[i] = [];
        }

        // Fill Matrix
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.cols; j++) {
                this.data[i][j] = 0;
            }
        }
    }

    // Other Stuff

    randomize() {
        this.map(function (elm, i, j) {
            return Math.floor(Math.random() * 10);;
        })
    }

    static transpose(m1) {
        var matrix = new Matrix(m1.cols, m1.rows);
        matrix.map(function (elm, i, j) {
            return elm = m1.data[j][i];
        });
        return matrix;
    }

    static inputToMatrix(arr) {
        return new Matrix(arr.length, 1).map((e, i, j) => arr[i]);
    }

    static MatrixToArray(m){
        var list =  [];
        
        m.map(function(elm,i,j){
            list.push(elm);
        });
        return list;
    }

    map(func) {
        /*
                for (var i = 0; i < this.rows; i++) {
                    for (var j = 0; j < this.cols; j++) {
                        var val = this.data[i][j];
                        val =  func(val,i,j)
                    }
                }
        */

        this.data = this.data.map(function (v, i) {
            return v.map(function (elm, j) {
                return elm = func(elm, i, j);
            });
        });


        // Returns a New Matrix
        return this;
    }

    static map(m1, func) {
        /*
                for (var i = 0; i < this.rows; i++) {
                    for (var j = 0; j < this.cols; j++) {
                        var val = this.data[i][j];
                        val =  func(val,i,j)
                    }
                }
        */

        let matrix = new Matrix(m1.rows, m1.cols);

        matrix.data = m1.data.map(function (v, i) {
            return v.map(function (elm, j) {
                return elm = func(elm, i, j);
            });
        });


        // Returns a New Matrix
        return matrix;
    }

    print() {
        console.table(this.data);
    }

    // Matrix Operations

    add(scalar) {
        this.map(function (elm, i, j) {
            return elm += scalar;
        });
    }

    subtract(scalar) {
        this.map(function (elm, i, j) {
            return elm -= scalar;
        });
    }

    multiply(scalar) {
        this.map(function (elm, i, j) {
            return elm *= scalar;
        });
    }

    divide(scalar) {
        this.map(function (elm, i, j) {
            return elm /= scalar;
        });
    }

    static add(m1, m2) {
        var matrix = new Matrix(m1.rows, m1.cols);
        matrix = matrix.map(function (elm, i, j) {
            return m1.data[i][j] + m2.data[i][j];
        });

        return matrix;
    }

    static subtract(m1, m2) {
        var matrix = new Matrix(m1.rows, m1.cols);
        matrix = matrix.map(function (elm, i, j) {
            return m1.data[i][j] - m2.data[i][j];
        });

        return matrix;
    }

    static multiply(m1, m2) {
        var matrix = new Matrix(m1.rows, m2.cols);
        matrix = matrix.map(function (elm, i, j) {
            var sum = 0
            for (var k = 0; k < m1.cols; k++) {
                sum += m1.data[i][k] * m2.data[k][j];
            }
            return sum;
        });

        return matrix;
    }

}

if (typeof module !== 'undefined') {
    module.exports = Matrix;
}