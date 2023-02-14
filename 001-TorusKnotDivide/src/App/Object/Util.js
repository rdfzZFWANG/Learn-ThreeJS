function RemoveIndex(geometry) {
    if (geometry.index == null) {
        return
    }
    let total = geometry.index.count

    const indexArray = geometry.index.array

    const positionArray0 = geometry.getAttribute("position").array
    const normalArray0 = geometry.getAttribute("normal").array
    const uvArray0 = geometry.getAttribute("uv").array

    const positionArray = new Float32Array(total * 3)
    const normalArray = new Float32Array(total * 3)
    const uvArray = new Float32Array(total * 2)

    for (let i = 0; i < total; i++) {
        const idx = indexArray[i]
        for (let j = 0; j < 3; j++) {
            positionArray[i * 3 + j] = positionArray0[idx * 3 + j]
            normalArray[i * 3 + j] = normalArray0[idx * 3 + j]
        }
        for (let j = 0; j < 2; j++) {
            uvArray[i * 2 + j] = uvArray0[idx * 2 + j]
        }
    }
    
    geometry.getAttribute("position").array = positionArray
    geometry.getAttribute("position").count = total
    
    geometry.getAttribute("normal").array = normalArray
    geometry.getAttribute("normal").count = total

    geometry.getAttribute("uv").array = uvArray
    geometry.getAttribute("uv").count = total

    geometry.index = null

    // console.log(geometry)

}

function onBeforeCompile(uTime) {

    return (shader) => {
    shader.uniforms.uTime = uTime
    shader.vertexShader = shader.vertexShader.replace(
        "#include <common>",
        /* glsl */`
            #include <common>
            attribute vec3 off;
            uniform float uTime;
        `
      );
      shader.vertexShader = shader.vertexShader.replace(
        "#include <begin_vertex>",
        /* glsl */`
        #include <begin_vertex>
  
        vec3 offset = off * clamp((0.5 + sin(uTime * 0.5) * 0.6), -0.1, 1.0);
        transformed = transformed - offset;
        `
      );
    }
} 

export { RemoveIndex, onBeforeCompile }