var path = require('path');
const webpack = require('webpack');
    
module.exports = {
    mode: 'development',
    entry: './src/client.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
    },
    watch:true,
    module: {
        rules: [
            {
                test: /\.js$/,
                use:{
                loader: 'babel-loader'
                },
                exclude: /node_modules/, // exclude any and all files in the node_modules folder
                 
                
            },
            {
                test:/\.css/,
               
                loader:['style-loader', 'css-loader']
            },
        ]
    },
    
};