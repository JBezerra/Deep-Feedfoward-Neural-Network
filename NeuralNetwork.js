//const Matrix = require("./matrix"); // using pure ES6

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
        let inputs = Matrix.fromArray(input_array);
        let hiddens = Matrix.multiply(this.weights_ih, inputs);
        
        // Add bias
        hiddens.add(this.bias_h);

        // Activation Function
        hiddens.map(sigmoid);
        
        let outputs = Matrix.multiply(this.weights_ho, hiddens);

        // Add bias
        outputs.add(this.bias_o);
        
        // Activation Function
        outputs.map(sigmoid);

        return outputs.toArray();
    }

    train(input_array, target_array) {
        let inputs = Matrix.fromArray(input_array);
        let hiddens = Matrix.multiply(this.weights_ih, inputs);

        // Add bias
        hiddens.add(this.bias_h);

        // Activation Function
        hiddens.map(sigmoid);
        
        let outputs = Matrix.multiply(this.weights_ho, hiddens);

        // Add bias
        outputs.add(this.bias_o);

        // Activation Function
        outputs.map(sigmoid);

        // ---------- Backpropagation -----------

        let target = Matrix.fromArray(target_array);

        // Calculate Error
        let output_error = Matrix.subtract(target, outputs);

        // Calculate Gradient
        // DeltaW_HO = lr * Output Error * dsigmoid * Hidden_Transpose

        let gradients = Matrix.map(outputs, dsigmoid); // Deriva Output Sigmoid
        gradients.multiply(output_error); // Multiplica pelo Erro
        gradients.multiply(this.learning_rate); // Multiplica pelo Learning Rate


        // Calculate Deltas Weights Hidden to Output
        let hidden_T = Matrix.transpose(hiddens);
        let weight_ho_deltas = Matrix.multiply(gradients, hidden_T);
        this.weights_ho.add(weight_ho_deltas);
        
        // Adjust the bias by its deltas (which is just the gradients)
        this.bias_o.add(gradients);
        

        // DeltaW_IH = lr * Hidden_Error * dsigmoid * Input_Transpose
        let who_T = Matrix.transpose(this.weights_ho);
        let hidden_errors = Matrix.multiply(who_T, output_error);
        
        // Calculate Hidden Gradient
        let hidden_gradient = Matrix.map(hiddens, dsigmoid);
        hidden_gradient.multiply(hidden_errors);
        hidden_gradient.multiply(this.learning_rate);
        
        // Calculate Deltas Weights Input to Hidden

        let inputs_T = Matrix.transpose(inputs);
        let wheight_IH_Delta = Matrix.multiply(hidden_gradient, inputs_T);
        this.weights_ih.add(wheight_IH_Delta);

        // Adjust the bias by its deltas (which is just the gradients)
        this.bias_h.add(hidden_gradient);

    }

    serialize(){
        return JSON.stringify(this);
    }

    loadModel(params){
        this.input_nodes = params.input_nodes;
        this.hidden_nodes = params.hidden_nodes;
        this.output_nodes = params.output_nodes;

        this.weights_ih = new Matrix(params.weights_ih.rows, params.weights_ih.cols);
        this.weights_ih.data = params.weights_ih.data;

        this.weights_ho = new Matrix(params.weights_ho.rows, params.weights_ho.cols);
        this.weights_ho.data = params.weights_ho.data;

        this.bias_h = new Matrix(params.bias_h.rows, params.bias_h.cols);
        this.bias_h.data = params.bias_h.data;

        this.bias_o = new Matrix(params.bias_o.rows, params.bias_o.cols);
        this.bias_o.data = params.bias_o.data;

        this.learning_rate = params.learning_rate;
    }

}