var camera, scene, renderer, geometry, material, mesh;
var ticka = 0;

s = 1;
ns = -1;
m = opsqrtt = 1 + Math.sqrt(2); // 2.414213562373095
l = opttsqrtt = 1 + (2 * Math.sqrt(2)); // 3.8284271247461903
nm = nopsqrtt = -1 * opsqrtt; // -2.414213562373095
nl = nopttsqrtt = -1 * opttsqrtt; // -3.8284271247461903

tcoh_p = [
               [nm, l, s], [ns, l, m], [s, l, m], [m, l, s],
[nl, m, s],                [ns, m, l], [s, m, l],              [l, m, s],
[nl, s, m], [nm, s, l],                             [m, s, l], [l, s, m],
[nl, ns, m], [nm, ns, l],                          [m, ns, l], [l, ns, m],
[nl, nm, s],              [ns, nm, l], [s, nm, l],            [l, nm, s],
               [nm, nl, s], [ns, nl, m], [s, nl, m], [m, nl, s],

               [nm, l, ns], [ns, l, nm], [s, l, nm], [m, l, ns],
[nl, m, ns],                [ns, m, nl], [s, m, nl],              [l, m, ns],
[nl, s, nm], [nm, s, nl],                             [m, s, nl], [l, s, nm],
[nl, ns, nm], [nm, ns, nl],                          [m, ns, nl], [l, ns, nm],
[nl, nm, ns],              [ns, nm, nl], [s, nm, nl],            [l, nm, ns],
               [nm, nl, ns], [ns, nl, nm], [s, nl, nm], [m, nl, ns]
];

tcoh_f = [
  [ 5,  9, 13, 17, 18, 14, 10,  6],
  [ 0,  1,  2,  3, 27, 26, 25, 24],
  [ 7, 11, 15, 19, 43, 39, 35, 31],
  [23, 22, 21, 20, 44, 45, 46, 47],
  [16, 12,  8,  4, 28, 32, 36, 40],
  [30, 34, 38, 42, 41, 37, 33, 29],

  [ 1,  0,  4,  8,  9,  5],
  [11,  7,  3,  2,  6, 10],
  [22, 23, 19, 15, 14, 18],
  [12, 16, 20, 21, 17, 13],
  [26, 27, 31, 35, 34, 30],
  [39, 43, 47, 46, 42, 38],
  [45, 44, 40, 36, 37, 41],
  [32, 28, 24, 25, 29, 33],

  [ 1,  5,  6,  2],
  [11, 10, 14, 15],
  [22, 18, 17, 21],
  [12, 13,  9,  8],
  [ 3,  7, 31, 27],
  [19, 23, 47, 43],
  [20, 16, 40, 44],
  [ 4,  0, 24, 28],
  [26, 30, 29, 25],
  [39, 38, 34, 35],
  [45, 41, 42, 46],
  [32, 33, 37, 36]
];

// sft = [
// [-1.0, nopsqrtt, nopttsqrtt],
// [-1.0, nopsqrtt, opttsqrtt],
// [-1.0, opsqrtt, nopttsqrtt],
// [-1.0, opsqrtt, opttsqrtt],
// [1.0, nopsqrtt, nopttsqrtt],
// [1.0, nopsqrtt, opttsqrtt],
// [1.0, opsqrtt, nopttsqrtt],
// [1.0, opsqrtt, opttsqrtt],
// [-1.0, nopttsqrtt, nopsqrtt],
// [-1.0, nopttsqrtt, opsqrtt],
// [-1.0, opttsqrtt, nopsqrtt],
// [-1.0, opttsqrtt, opsqrtt],
// [1.0, nopttsqrtt, nopsqrtt],
// [1.0, nopttsqrtt, opsqrtt],
// [1.0, opttsqrtt, nopsqrtt],
// [1.0, opttsqrtt, opsqrtt],
// [nopsqrtt, -1.0, nopttsqrtt],
// [nopsqrtt, -1.0, opttsqrtt],
// [nopsqrtt, 1.0, nopttsqrtt],
// [nopsqrtt, 1.0, opttsqrtt],
// [opsqrtt, -1.0, nopttsqrtt],
// [opsqrtt, -1.0, opttsqrtt],
// [opsqrtt, 1.0, nopttsqrtt],
// [opsqrtt, 1.0, opttsqrtt],
// [nopsqrtt, nopttsqrtt, -1.0],
// [nopsqrtt, nopttsqrtt, 1.0],
// [nopsqrtt, opttsqrtt, -1.0],
// [nopsqrtt, opttsqrtt, 1.0],
// [opsqrtt, nopttsqrtt, -1.0],
// [opsqrtt, nopttsqrtt, 1.0],
// [opsqrtt, opttsqrtt, -1.0],
// [opsqrtt, opttsqrtt, 1.0],
// [nopttsqrtt, -1.0, nopsqrtt],
// [nopttsqrtt, -1.0, opsqrtt],
// [nopttsqrtt, 1.0, nopsqrtt],
// [nopttsqrtt, 1.0, opsqrtt],
// [opttsqrtt, -1.0, nopsqrtt],
// [opttsqrtt, -1.0, opsqrtt],
// [opttsqrtt, 1.0, nopsqrtt],
// [opttsqrtt, 1.0, opsqrtt],
// [nopttsqrtt, nopsqrtt, -1.0],
// [nopttsqrtt, nopsqrtt, 1.0],
// [nopttsqrtt, opsqrtt, -1.0],
// [nopttsqrtt, opsqrtt, 1.0],
// [opttsqrtt, nopsqrtt, -1.0],
// [opttsqrtt, nopsqrtt, 1.0],
// [opttsqrtt, opsqrtt, -1.0],
// [opttsqrtt, opsqrtt, 1.0]
// ]

// tf = [
// // DONE - - -
// [-1, 0, -2], // 0
// [0, -1, -2], // 1
// [0, -2, -1], // 2
// [-1, -2, 0], // 3
// [-2, -1, 0], // 4
// [-2, 0, -1], // 5
//
// // DONE - - +
// [0, -1, 2], // 6
// [-1, 0, 2], // 7
// [-2, 0, 1], // 8
// // 4 [-2, -1, 0],
// // 3 [-1, -2, 0],
// [0, -2, 1], // 9
//
//
// // DONE - + -
// [0, 1, -2], // 10
// // 0 [-1, 0, -2],
// // 5 [-2, 0, -1],
// [-2, 1, 0], // 11
// [-1, 2, 0], // 12
// [0, 2, -1], // 13
//
// // DONE - + +
// // 7 [-1, 0, 2],
// [0, 1, 2], // 14
// [0, 2, 1], // 15
// // 12 [-1, 2, 0],
// // 11 [-2, 1, 0],
// // 8 [-2, 0, 1],
//
// // DONE + - -
// // 1 [0, -1, -2],
// [1, 0, -2], // 16
// [2, 0, -1], // 17
// [2, -1, 0], // 18
// [1, -2, 0], // 19
// // 2 [0, -2, -1],
//
// // DONE + - +
// [1, 0, 2], // 20
// // 6 [0, -1, 2],
// // 9 [0, -2, 1],
// // 19 [1, -2, 0],
// // 18 [2, -1, 0],
// [2, 0, 1], // 21
//
// // DONE + + -
// // 16 [1, 0, -2],
// // 10 [0, 1, -2],
// // 13 [0, 2, -1],
// [1, 2, 0], // 22
// [2, 1, 0] // 23
// // 17 [2, 0, -1],
//
// // DONE + + +
// // 14 [0, 1, 2],
// // 20 [1, 0, 2],
// // 21 [2, 0, 1],
// // 23 [2, 1, 0],
// // 22 [1, 2, 0],
// // 15 [0, 2, 1],
// ]
//
// var p = [[3, 1, 1],
// [1, 3, 1],
// [1, 1, 3],
// [-3, -1, 1],
// [-1, -3, 1],
// [-1, -1, 3],
// [-3, 1, -1],
// [-1, 3, -1],
// [-1, 1, -3],
// [3, -1, -1],
// [1, -3, -1],
// [1, -1, -3]];
//
// var q = [[-3, 1, 1],
// [-1, 3, 1],
// [-1, 1, 3],
// [3, -1, 1],
// [1, -3, 1],
// [1, -1, 3],
// [3, 1, -1],
// [1, 3, -1],
// [1, 1, -3],
// [-3, -1, -1],
// [-1, -3, -1],
// [-1, -1, -3]];
//
// var t = [[3, 3, 3],
// [3, 3, 3],
// [3, 3, 3],
// [-3, -3, 3],
// [-3, -3, 3],
// [-3, -3, 3],
// [-3, 3, -3],
// [-3, 3, -3],
// [-3, 3, -3],
// [3, -3, -3],
// [3, -3, -3],
// [3, -3, -3]];
//
// var o = [[3, 0, 0],
// [0, 3, 0],
// [0, 0, 3],
// [-3, 0, 0],
// [0, -3, 0],
// [0, 0, 3],
// [-3, 0, 0],
// [0, 3, 0],
// [0, 0, -3],
// [3, 0, 0],
// [0, -3, 0],
// [0, 0, -3]];


init();
animate();

function init() {

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 12.5;
    scene.add(camera);

    // add subtle ambient lighting
        var ambientLight = new THREE.AmbientLight(0x0c0c0c);
        scene.add(ambientLight);
        // add spotlight for the shadows
        // var spotLight = new THREE.SpotLight(0xffffff);
        // spotLight.position.set(-400, -600, -100);
        // spotLight.castShadow = true;
        // scene.add(spotLight);

        var light = new THREE.DirectionalLight( 0xffffff );
light.position.set( 0, 1, 1 ).normalize();
scene.add(light);

    //geometry = new THREE.CubeGeometry(200, 200, 200);

var geometry = new THREE.Geometry();

tf = tcoh_p;

for (var i = 0; i < tf.length; i++)
	{

geometry.vertices.push(new THREE.Vector3(tf[i][0], tf[i][1], tf[i][2]));

};

// ####
// geometry.faces.push( new THREE.Face3( 0, 1, 2 ) );
// geometry.faces.push( new THREE.Face3( 3, 4, 5 ) );
// geometry.faces.push( new THREE.Face3( 6, 7, 8 ) );
// geometry.faces.push( new THREE.Face3( 9, 10, 11 ) );
//
// geometry.faces.push( new THREE.Face3( 11, 0, 9 ) );
// geometry.faces.push( new THREE.Face3( 11, 1, 0 ) );
// geometry.faces.push( new THREE.Face3( 11, 7, 1 ) );
// geometry.faces.push( new THREE.Face3( 11, 8, 7 ) );
//
// geometry.faces.push( new THREE.Face3( 1, 5, 2 ) );
// geometry.faces.push( new THREE.Face3( 1, 3, 5 ) );
// geometry.faces.push( new THREE.Face3( 1, 6, 3 ) );
// geometry.faces.push( new THREE.Face3( 1, 7, 6 ) );
//
// geometry.faces.push( new THREE.Face3( 6, 4, 3 ) );
// geometry.faces.push( new THREE.Face3( 6, 10, 4 ) );
// geometry.faces.push( new THREE.Face3( 6, 11, 10 ) );
// geometry.faces.push( new THREE.Face3( 6, 8, 11 ) );
//
// geometry.faces.push( new THREE.Face3( 2, 5, 4 ) );
// geometry.faces.push( new THREE.Face3( 0, 2, 4 ) );
// geometry.faces.push( new THREE.Face3( 9, 0, 4 ) );
// geometry.faces.push( new THREE.Face3( 10, 9, 4 ) );
// ####

// ftf = [
// // DONE - - -
// [0, 1, 2, 3, 4, 5],
// // DONE - - +
// [6, 7, 8, 4, 3, 9],
// // DONE - + -
// [10, 0, 5, 11, 12, 13],
// // DONE - + +
// [7, 14, 15, 12, 11, 8],
// // DONE + - -
// [1, 16, 17, 18, 19, 2],
// // DONE + - +
// [20, 6, 9, 19, 18, 21],
// // DONE + + -
// [16, 10, 13, 22, 23, 17],
// // DONE + + +
// [14, 20, 21, 23, 22, 15]
// ];

ftf = tcoh_f;

for (var i = 0; i < ftf.length; i++)
{
    if (ftf[i].length > 2){
      for (var j = 0; j < ftf[i].length - 2; j++){

geometry.faces.push( new THREE.Face3( ftf[i][0], ftf[i][j+1], ftf[i][j+2] ) );

    };
  };
};

geometry.computeFaceNormals();

//var object = new THREE.Mesh( geometry, new THREE.MeshNormalMaterial() );
//scene.addObject(object);


    material = new THREE.MeshNormalMaterial({color: 0x7777ff});
    material.side = THREE.FrontSide;

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // renderer = new THREE.CanvasRenderer();
    // renderer.setSize(window.innerWidth, window.innerHeight);


            var webGLRenderer = new THREE.WebGLRenderer();
            webGLRenderer.setClearColor(new THREE.Color(0xffaa55, 1.0));
            webGLRenderer.setSize(window.innerWidth, window.innerHeight);
            webGLRenderer.shadowMapEnabled = true;
            var canvasRenderer = new THREE.CanvasRenderer();
            canvasRenderer.setSize(window.innerWidth, window.innerHeight);
            renderer = webGLRenderer;

    //mesh.rotation.x = 3.5;

    document.body.appendChild(renderer.domElement);


}

function animate() {

    requestAnimationFrame(animate);
    render();

}

function render() {

// 		ticka = (ticka + 0.01) % 2;
//
//     sin = Math.sin(Math.PI * ticka);
//
//     console.log(sin);
//
//     if (sin < 0){
//     	if (sin < -1){
//       	sin = -1
//       }
//
//       for (var i = 0; i < p.length; i++){
// mesh.geometry.vertices[i].x = (p[i][0] * (1 + sin)) + (t[i][0] * (-1 * sin))
// mesh.geometry.vertices[i].y = (p[i][1] * (1 + sin)) + (t[i][1] * (-1 * sin))
// mesh.geometry.vertices[i].z = (p[i][2] * (1 + sin)) + (t[i][2] * (-1 * sin))
//
//       }
//
//     } else {
//     	if (sin > 1){
//       	sin = 1
//       }
//
//       for (var i = 0; i < p.length; i++){
// mesh.geometry.vertices[i].x = (p[i][0] * (1 - sin)) + (o[i][0] * sin)
// mesh.geometry.vertices[i].y = (p[i][1] * (1 - sin)) + (o[i][1] * sin)
// mesh.geometry.vertices[i].z = (p[i][2] * (1 - sin)) + (o[i][2] * sin)
//
//
//       }
//
//     }

    mesh.rotation.x += 0.005;
    mesh.rotation.y += 0.006;

    renderer.render(scene, camera);

}

