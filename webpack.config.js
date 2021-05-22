// 절대 경로를 만들기 위한 코드, node.js 안에 있는 전역모듈인 'path'
const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
    // entry는 파일을 읽어들이기 시작하는 진입점임. 마치 parcel index.html 이라고 설정했던 것처럼....
    entry:'./js/main.js',
    // output은 결과물(번들)을 반환하는 설정
    output: {
        // path에는 절대경로가 필요
        // path:path.resolve(__dirname,'dist'),//'path'에는 resolve()라는 메소드가 있고 그 안에 인자로 '__dirname'은 node.js에 설정된 전역변수이고(__의 의미는 현재 파일이 있는 경로를 지칭함) 두번째 인자랑 합쳐서 절대경로를 이루게 됨
        // filename:'main.js', // entry에 있는 파일을 번들로 만들어서 컴파일 한다음 path 로 지정한 위치에 main.js파일을 만들어서 저장함
        // 기본 설정은 path는 자동으로 dist를 가리키고 filename은 entry에서 지정한 파일명으로 똑같이 따라감
        clean:true // 기존에 만들었던 js파일을 사라지게 하면서 지금 만드는 파일을 만듦(app.js파일이 남아있던 상황에서 사용했을 시 app.js파일이 사라짐)
    },

    module: {
        rules:[
            {
                test:/\.s?css$/,
                use:[ //순서 중요 style-loader부터 작성 , 밑에서부터(sass-loader)부터 실행돼서 마지막으로 스타일로더가 실행되면서 스타일태그에 넣어줌
                    'style-loader',//html문서 안에서 style태그 안에 css문서에서 가져온 것들을 삽입해주는 역할
                    'css-loader', //자바스크립트 파일에서 css파일을 해석하는 용도
                    'postcss-loader',
                    'sass-loader'
                ]
            },

            {
                test:/\.js$/,
                use: [
                    'babel-loader'
                ]
            }
        ]
    },
    // 번들링 후 결과물의 처리 방식등을 다양한 플러그인들을 통해 설정
    plugins: [
        new HtmlPlugin({
            template:'./index.html' // main.js와 index.html의 병합된 합본을 dist폴더에 만들어준다
        }),
        new CopyPlugin({
            patterns: [
                { from: 'static' } //어디에서부터 해당하는 파일을 복사해서 dist라는 폴더에 붙여넣기 할 것이냐 라는 뜻
            ]
        })
    ],

    devServer: {
        host:'localhost' //http://[::]:8081/ 이런식으로 나올 경우 [::]자리에 127.0.0.1로 바꾸게 해주는 코드
    }
}