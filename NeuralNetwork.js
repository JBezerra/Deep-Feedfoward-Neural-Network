function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}

function dsigmoid(x) {
    return x * (1 - x);
}
class NeuralNetwork {
    constructor(i_nodes, h_nodes, o_nodes) {
        this.input_nodes = i_nodes;
        this.hidden_nodes = h_nodes;
        this.output_nodes = o_nodes;

        this.weights_ih = new Matrix(this.hidden_nodes, this.input_nodes);
        this.weights_ih.randomize();

        this.weights_ho = new Matrix(this.output_nodes, this.hidden_nodes)
        this.weights_ho.randomize();

        this.bias_h = new Matrix(this.hidden_nodes, 1);
        this.bias_h.randomize();

        this.bias_o = new Matrix(this.output_nodes, 1);
        this.bias_o.randomize();

        this.learning_rate = 0.1;
    }


    predict(input_array) {
        let inputs = Matrix.inputToMatrix(input_array);
        let hiddens = Matrix.multiply(this.weights_ih, inputs);

        // Add bias
        hiddens = Matrix.add(hiddens, this.bias_h);

        // Activation Function
        hiddens.map(sigmoid);

        let outputs = Matrix.multiply(this.weights_ho, hiddens);

        // Add bias
        outputs = Matrix.add(outputs, this.bias_o);

        // Activation Function
        outputs.map(sigmoid);

        return Matrix.MatrixToArray(outputs);
    }

    train(input_array, target_array) {
        let inputs = Matrix.inputToMatrix(input_array);
        let hiddens = Matrix.multiply(this.weights_ih, inputs);

        // Add bias
        hiddens = Matrix.add(hiddens, this.bias_h);

        // Activation Function
        hiddens.map(sigmoid);

        let outputs = Matrix.multiply(this.weights_ho, hiddens);

        // Add bias
        outputs = Matrix.add(outputs, this.bias_o);

        // Activation Function
        outputs.map(sigmoid);

        // ---------- Backpropagation -----------

        let target = Matrix.inputToMatrix(target_array);

        // Calculate Error
        let output_error = Matrix.subtract(target, outputs);

        // Calculate Gradient
        // DeltaW_HO = lr * Output Error * dsigmoid * Hidden_Transpose

        let gradients = Matrix.map(outputs, dsigmoid); // Deriva Output Sigmoid
        gradients = Matrix.multiply(gradients, output_error); // Multiplica pelo Erro
        gradients.multiply(this.learning_rate); // Multiplica pelo Learning Rate


        // Calculate Deltas Weights Hidden to Output
        let hidden_T = Matrix.transpose(hiddens);
        let weight_ho_deltas = Matrix.multiply(gradients, hidden_T);
        this.weights_ho = Matrix.add(this.weights_ho, weight_ho_deltas);

        // Adjust the bias by its deltas (which is just the gradients)
        this.bias_o = Matrix.add(this.bias_o,gradients);


        // DeltaW_IH = lr * Hidden_Error * dsigmoid * Input_Transpose
        let who_T = Matrix.transpose(this.weights_ho);
        let hidden_errors = Matrix.multiply(who_T, output_error);

        // Calculate Hidden Gradient
        let hidden_gradient = Matrix.map(hiddens, dsigmoid);
        hidden_gradient = Matrix.multiply(hidden_gradient, hidden_errors);
        hidden_gradient.multiply(this.learning_rate);

        // Calculate Deltas Weights Input to Hidden

        let inputs_T = Matrix.transpose(inputs);
        let wheight_IH_Delta = Matrix.multiply(hidden_gradient, inputs_T);
        this.weights_ih = Matrix.add(this.weights_ih,wheight_IH_Delta);

        // Adjust the bias by its deltas (which is just the gradients)
        this.bias_h = Matrix.add(this.bias_h,hidden_gradient);
        
    }
}