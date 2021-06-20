class PostContainer extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        var posts = []
        for(var i = 0; i < this.props.messages.length; i++){
            var props = Object.assign({}, this.props.messages[i])
            props.key = i
            posts.push(e(Post, props))
        }
        return e("div", {className: "post-container"}, posts)
    }
}