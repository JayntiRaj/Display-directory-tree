import React, { Component } from 'react';

const input_files = [
  "/home/test/documents/vars.yml",
  "/home/test/documents/main.yml",
  "/home/test/file_list",
  "/home/test/records/.index",
  "/home/root/documents/vars.yml",
  "/etc/systemd/conf.d/extra.service",
  "/etc/systemd/conf.d/run.service",
  "/home/test/documents/deployments/main.yml",
  "/etc/systemd/system.service"
]

// print a tree - like structure
// to display a structure of directories and the files within
// it

// home
//     test
//         documents
//             vars.yml
//             main.yml
//             deployments
//                 main.yml
//         file_list
//         records
//             .index
//     root
//         documents
//             vars.yml
// etc
//     systemd
//         conf.d
//             extra.service
//             run.service
//         system.service



function createTree(input_files) {

  var result = {} //tree object to be returned
  var current_node = result

  for(var path of input_files) { //for each directory path
    current_node = result
    const items = path.split("/").slice(1)

    for(var item of items) { //for each directory in a path
      if (current_node.hasOwnProperty(item)) { 
        current_node = current_node[item]
      }
      else {
        const obj = {}
        current_node[item] = obj
        current_node = obj
      }
      
    }
  }
  return result
}

//roshan@skydio.com
class FileTree extends Component {

  state = {
    indents: 0,
    display: ""
  }

  treeToString(tree, indents) {
    for (var k in tree)
    {
          this.state.display+= "\t".repeat(indents) + k + "\n"
          this.treeToString(tree[k], indents+1); //recursive call to increment indents at each level
        
    }
  }
  
  render() {
    this.treeToString(this.props.tree, this.state.indents) //creating string from json object received as props
   return <div style = {{whiteSpace: "pre-wrap"}}>{this.state.display}</div> //returning that string in a div, with css to ensure new lines are not ignored
    
  }
}



class App extends Component {
  render() {
    const tree = createTree(input_files) //creating a json object from the input files
    return (
      <div className="App">
      <FileTree tree = {tree}/>
      </div>
    );
  }
}

export default App;

