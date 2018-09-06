# Deep Feedfoward Neural Network
This project is a simple neural network made in javascript as known as MLP(Multilayer Perceptron) also.

![DFF](https://image.ibb.co/hDt55K/dff.jpg)

The matrix library was made by myself for the neural net too, and it can be used for any project.

# How can I use?

## Create the Neural Network Object
You have to provide the number of nodes of input, hidden and output. 

```javascript
var nn = new NeuralNetwork(2,4,1);
```
## Train your Neural Net
You have to feed the NN with the inputs and the expected outputs

```javascript
nn.train([0,0],[0]);
nn.train([1,0],[1]);
nn.train([0,1],[1]);
nn.train([1,1],[0]);
```
## After enough trainning. Predict the output.
```javascript
nn.predict([0]);

// console.log: 0.00342487123987
```

# How it works?
Long story short, a neural network is a universal function aproximator.
If you want understand better, I really recommend you some articles:

[Deep Learning Book - MLP](https://www.deeplearningbook.org/contents/mlp.html)

[Wikipedia - MLP](https://en.wikipedia.org/wiki/Multilayer_perceptron)

And 3Blue1Brown video serie about neural networks:

[But what is a Neural Network?](https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi)
