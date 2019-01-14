# Deep Feedfoward Neural Network
This project is a simple neural network made in javascript as known as MLP(Multilayer Perceptron) also.

![DFF](https://image.ibb.co/hDt55K/dff.jpg)

# How can I use?
## MNIST Example:
You can check a example of usage with MNIST Dataset to recognize handwritten human digits. 
![mnist](https://media.giphy.com/media/24FIhSCqGG1v7et28T/giphy.gif)

## Create the Neural Network Object
You have to provide in order: Inputs, Hidden Layers, Output

```javascript
var nn = new NeuralNetwork(2,4,1);
```
## Train your Neural Net
Feed the training data with the expected label

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
If you would like to understand better, I really recommend you some articles:

[Deep Learning Book - MLP](https://www.deeplearningbook.org/contents/mlp.html)

[Wikipedia - MLP](https://en.wikipedia.org/wiki/Multilayer_perceptron)

And 3Blue1Brown video serie about neural networks:

[But what is a Neural Network?](https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)