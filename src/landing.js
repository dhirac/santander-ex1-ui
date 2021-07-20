
import React, { Component } from 'react';
import TopBanner from './assest/mbanner.jpg'

import { Form,Button,Container,Row,Col,Card,ListGroup,ListGroupItem} from 'react-bootstrap';
import ProgressBar from 'react-bootstrap/ProgressBar'
import pptxgen from "pptxgenjs";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';



export default class Landing extends Component {


    constructor(props){
        super(props);
       
 
        this.state = {
         
            search:true,
            artist:'',
            showProgress:false,
            progress:0,
            myList:[],
            avatar:'',
            showAvatar:false,
            showReport:false,
            role:'',
            showName:'',
            counter : 0,
            showError:false,
            test:false
           
                  
        };

        
       
       }


       startProgressBar(){ 
        setInterval(() => { 
         
            this.setState({counter: this.state.counter + 1}, () => {});

        }, 1000) 
      } 

      
    

    search = () => {
       
        if(this.state.role == ""){

            alert("Please Choose Which you wannt to searh for");

        }
        else{
        
        this.startProgressBar()
        this.setState({showProgress:true})
        this.setState({search:false})
        this.setState({showArtist:true})

        this.setState({progress:100})
        


        this.callMovieApi();
        this.getArtistAvatar();
        }

    }

    generatePP = () =>{


     
        let pres = new pptxgen();

        Object.entries(this.state.myList).map(([key,value],i) => {
        let slide = pres.addSlide();

        slide.addImage({
            path: value[0][4], x:0.2, y:0.3,sizing:{ type:'cover', w:2.5, h:3.7}
          });
       

        let textboxText = key;
        let textboxOpts = { x: 3, y: 0.5, color: "363636" };
        slide.addText(textboxText, textboxOpts);

        
        let textboxText2 = "Director: "+ value[0][3];
        let textboxOpts2 = { x: 3 ,y: 1, color: "363636" };
        slide.addText(textboxText2, textboxOpts2);
        
        
        let textboxText3 = "Release Year:" +value[0][0];
        let textboxOpts3 = { x: 3, y: 1.5, color: "363636" };
        slide.addText(textboxText3, textboxOpts3);

        let textboxText4 = "Released "+value[0][1];
        let textboxOpts4 = { x: 3, y: 2, color: "363636" };
        slide.addText(textboxText4, textboxOpts4);

        let textboxText5 = "Genre: "+value[0][2];
        let textboxOpts5 = { x: 3, y: 2.5, color: "363636" };
        slide.addText(textboxText5, textboxOpts5);

        let textboxText6 = "Actors: "+value[0][6];
        let textboxOpts6 = { x: 3, y: 3, color: "363636" };
        slide.addText(textboxText6, textboxOpts6);

        let textboxText7 = "Awards: "+value[0][5];
        let textboxOpts7 = { x: 3, y: 3.5, color: "363636" };
        slide.addText(textboxText7, textboxOpts7);
   

        })

        pres.writeFile(this.state.artist+".pptx");


    }


    getArtistAvatar = () => {

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch("https://santander.himalayandevops.com/avatar?artist="+this.state.artist, requestOptions)
            .then(response => response.json())
            .then(result => {

                   
                   if(result.avatar == "404"){

                    this.setState({showAvatar:false})
                    this.setState({showName:true})

                   }else{
                    console.log(result.avatar,);
                    this.setState({avatar:result.avatar})
                    this.setState({showAvatar:true})
                   }
                    


            })
            .catch(error => console.log('error', error));

    }



    callMovieApi = () => {
        
       

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };

         
          
          
          fetch("https://santander.himalayandevops.com/movie?artist="+this.state.artist+"&role="+this.state.role, requestOptions)
            .then(response => response.json())
            .then(result => {

               
                   
                    this.setState({showProgress:false})
                    this.setState({showReport:true})
                    console.log(result)
                    this.setState({myList:result.movie})
                   
                  


            })
            .catch(error => console.log('error', error));
        
      
    } 





   


  render() {


    return (
     
 
<>

<Container fluid>
          <Row style={{marginTop:"2px"}}>

           

              <Col style={{ backgroundImage: `url(${TopBanner})` , backgroundRepeat:'repeat-x', height:60,margin:0, padding:0}}></Col>

         
          </Row>
</Container>

<Container fluid>
         {this.state.showArtist ?
          <Row style={{backgroundColor:'#EA2025',marginTop:"2px"}}>
          <Col   xs={6} md={4}></Col>
          <Col  xs={6} md={4} style={{alignItems:'center'}}>  
          
               
                     {this.state.avatar ?
                     <>
                     <div style={{textAlign:'center',alignItems:'center', paddingTop:'20px;'}}>
                     <img src={"//"+this.state.avatar}  style={{width:"200px", marginTop:'20px', border:'3px solid white'}} />
                     <h2 style={{fontSize:'18px', marginTop:10,color:'white', float:'none',textTransform: 'capitalize'}}>{this.state.artist}</h2>

                    { Object.keys (this.state.myList).length > 0  ? 
                     <Button variant="danger"  onClick={this.generatePP}  style={{textAlign:'center',marginTop:5,width:500,marginBottom:10}}>
                      
                      Download Report
                      
                     </Button>
                     :null
                     }

                     </div>
                     </>
                     :
                     <div style={{textAlign:'center',alignItems:'center', margin:'20px;'}}>
                    
                        {this.state.showName?
                        <h1 style={{fontSize:35, padding:20, color:'white',textTransform: 'capitalize'}}>{this.state.artist}</h1>
                        : 
                        
                        <Loader
                            type="ThreeDots"
                            color="white"
                            height={50}
                            width={50}         
                    
                        />
                        
                        }
                    </div>
                     }
             
          
          
          </Col>
          <Col  xs={6} md={4}></Col>
       
          </Row>
          :


          <Row style={{backgroundColor:'#EA2025',height:"150px",marginTop:"2px"}}>
          <Col   xs={6} md={4}></Col>
          <Col  xs={6} md={4}>  
            
             <>
             <h1 style={{fontSize:70,color:'white',marginTop:'20px',textAlign:'center',marginBottom:0,paddingBottom:0}}>GROUPM Dhiraj g</h1>
             <h2 style={{marginTop:'0px',color:'white',textAlign:'center',fontSize:'15px'}}>Search the entire movie industry with us ...</h2>
             </>
             
          
          </Col>
          <Col  xs={6} md={4}></Col>
       
          </Row>



         }


          <Row fluid>
           
              <Col style={{backgroundColor:'#cccccc',height:'10px'}}></Col>
           
          </Row>
</Container>

<Container fluid>
            {this.state.search ? 
          <Row>
                <Col xs={4}></Col>

               
                <Col xs={6} style={{marginTop:150, }}>

                         
                    <Form  onSubmit={this.search}>

                        <div style={{marginLeft:250}}>
                        <input type="radio" name="role" onChange={event => this.setState({ role: "actor"}) }   /> Actor &nbsp;&nbsp;
                        <input type="radio" name="role" onChange={event => this.setState({ role: "director"})} /> Director
                        </div>
                        <br/>
                       
                        <input type="text"                        
                         onChange={event => this.setState({ artist: event.target.value}) }
                         style={{width:600,height:35}} placeholder="Enter your favourite Actor or Director" />
                      
                        &nbsp;&nbsp;
                        <Button variant="danger" type="submit" >
                          Search
                        </Button>
                       
                   
                    </Form>

               

                    </Col>
                   

                    <Col xs={4}></Col>

          </Row>

          :
                    <Row>


                  
                    <Col>

                    {this.state.showProgress ? 
                    <div>
                    <ProgressBar  animated now={this.state.counter} style={{marginTop:150}} />
                    <h3 style={{fontSize:'15px', textAlign:'center',padding:'15px',textTransform: 'capitalize' }}>

                    Searching the movie { this.state.artist } involved in...please wait...


                    </h3>
                    </div>
                    : 
                    
                            Object.keys (this.state.myList).length > 0  ? null :
                            <Col>
                            
                            <div style={{textAlign:'center',alignItems:'center'}}>
                            <h1 style={{marginTop:200, textAlign:'center',fontSize:19}}>Sorry, We could not found anythig with that name. Search again with correct name !!!</h1>
                            <Button variant="danger"  onClick={function(e) { window.location.reload(); } }  style={{textAlign:'center',marginTop:10,width:500}}>
                                
                                Search Again
                            </Button>

                            </div>
                            
                            </Col>
      
                     }



                   
                    <Col xs={12} style={{marginTop:0}}>
                    {
                        
                        Object.entries(this.state.myList).map(([key,value],i) =>
                        
                    
                        <Card style={{ width: '18rem', display:'inline-block' }}>
                        <Card.Img variant="top" src={value[0][4]} />
                        <Card.Body>
                            <Card.Title style={{textAlign:'center'}}>{key}</Card.Title>
                            <Card.Text>
                            
                            <ListGroup className="list-group-flush">
                            <ListGroupItem>Director : {value[0][3]}</ListGroupItem>
                            <ListGroupItem>Release year : {value[0][0]}</ListGroupItem>
                            <ListGroupItem>Released : {value[0][1]}</ListGroupItem>
                            <ListGroupItem>Genre : {value[0][2]}</ListGroupItem>
                            <ListGroupItem>Actors : {value[0][6]}</ListGroupItem>
                            <ListGroupItem>Awards : {value[0][5]}</ListGroupItem>

                          
                           
                        </ListGroup>

                            </Card.Text>
                           
                        </Card.Body>
                        </Card>
                     
                        
                        
                        )  
                    }
                    </Col>

                    </Col>

                   
                    </Row>
        }
</Container>
       
     </>
    );
  }
}
