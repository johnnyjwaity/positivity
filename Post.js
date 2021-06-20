class Post extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        var commentImage = e("img", {src: "comment.png"})
        var orangeCircle = e("div", {className: "post-orange-circle"}, commentImage)
        var byLabel = e("p", {className: "by-label"}, "By " + this.props.name)
        var commentLabel = e("p", {className: "comment-label"}, this.props.message)
        var fromLabel = e("p", {className: "from-label"}, "From " + this.props.place)
        var containerDiv = e("div", {className: "post"}, orangeCircle, byLabel, commentLabel, fromLabel)
        return containerDiv
    }
}