const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin =require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ShrinkRay = require('shrink-ray-current');
const BrotliPlugin = require('brotli-webpack-plugin');
// CkEditor5 
const {styles} = require('@ckeditor/ckeditor5-dev-utils');

module.exports={
    
    entry:["./src/index.js"],
    plugins:[
        new HtmlWebPackPlugin({
            title:'Caching',
            template:path.join(__dirname,'public/index.html'),
            filename:'index.html'
        }),
        new MiniCssExtractPlugin({
            filename:'style.css'
        }),
        
    ],
    output:{
        filename:"[name].[contenthash].js",
        path:path.join(__dirname,'build'),
        publicPath:'/',
        clean:true,
    },
    // render :{
    //     compressor:ShrinkRay(BrotliPlugin)
    // },
    // optimization:{

    // },
    optimization: {
        minimize:true,
        minimizer:[new TerserPlugin()],
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
       splitChunks: {
         cacheGroups: {
           vendor: {
             test: /[\\/]node_modules[\\/]/,
             name: 'vendors',
             chunks: 'all',
           },
         },
       },
      },
    
    resolve:{
        extensions:['.js','.jsx','.css','.ts','.svg','*.svg'],
        // modules:['node_modules'],
        alias:{
            // 'parchment': path.resolve(__dirname, 'node_modules/parchment/src/parchment.ts'),
            'quill$': path.resolve(__dirname, 'node_modules/quill/quill.js'),
        }
    },

    module:{
        rules:[

            {
                test:/\.(js|jsx)$/,
                exclude:[path.join(__dirname,'node_modules'),'/src/utills/ckeditor','/src/utills/Editor'],
                
               use:[{
                    loader:'babel-loader',
                    options:{
                        presets:[
                            '@babel/preset-env',
                            
                            '@babel/preset-react'
                        ],
                        plugins: [
                            [
                                '@babel/plugin-transform-runtime',
                                {
                                  // https://babeljs.io/docs/en/babel-plugin-transform-runtime#corejs
                                  corejs: 3,
                                  proposals: true,
                                },
                              ],
                            ['import',{libraryName:'antd', style:true}],
                            
                            
                        ]

                    }
                    
                }]
                
                
            },
            // {
            //     test: /\.ts$/,
            //     use: [{
            //       loader: 'ts-loader',
            //       options: {
            //         compilerOptions: {
            //           declaration: false,
            //           target: 'es5',
            //           module: 'commonjs'
            //         },
            //         transpileOnly: true
            //       }
            //     }]
            //   }, 
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader'
            },
            //   {
            //     test: /\.svg$/,
            //     // test:/node_modules\/quill\/assets\/icons\/(.*)\.svg$/,
            //     use: [{
            //       loader: 'html-loader',
            //       options: {
            //         minimize: true
            //       }
            //     }]
            //   },
              
            
         
            {
                test:/\.html$/,
                use:[
                    {
                        loader:'html-loader',
                        options:{minimize:true}
                    }
                ]
            },
            {
                test:/\.css$/,
                use:[MiniCssExtractPlugin.loader,'css-loader'],
                exclude: [
                    // cssModuleRegex,
                    /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,
                ],
            },

            // {
            //     test: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
            //     use: [ 'raw-loader' ]
            // },
            {
                test: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            injectType: 'singletonStyleTag',
                            attributes: {
                                'data-cke': true
                            }
                        }
                    },
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: styles.getPostCssConfig( {
                                themeImporter: {
                                    themePath: require.resolve( '@ckeditor/ckeditor5-theme-lark' )
                                },
                                minify: true
                            } )
                        }
                    }
                ]
            },
            
         
           
            {
                // test : /\.(png|svg|jpe?g|gif)$/i, // i ??
                test : /\.(png|jpe?g|gif)$/i,
                use:['file-loader'],
                exclude: [
                    // /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
                    // /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,
                    // /node_modules\/quill\/assets\/icons\/(.*)\.svg$/,
                ],    
            },
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    
                        loader: 'less-loader', 
                        options: {
                            lessOptions: {
                                javascriptEnabled: true
                              }
                        }
                    
                }]
            },
            // {
            //     test: /\.svg$/,
            //     loader: "file-loader",
            //     type: 'asset/resource'
            //   },
         
        ]
    },
    
};