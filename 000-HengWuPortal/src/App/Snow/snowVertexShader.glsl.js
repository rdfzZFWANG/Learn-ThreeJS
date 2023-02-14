

export default 
/* glsl */`
uniform float uTime;
uniform float uPixelRatio;

attribute float aSurface;
attribute float aSpeed;

varying float vSpeed;

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    modelPosition.y = mix(4.0, aSurface - 1.0, mod(uTime * aSpeed + modelPosition.y, 1.0));
    modelPosition.y = clamp(modelPosition.y, aSurface + 0.01, 4.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;
    

    gl_Position = projectionPosition;
    gl_PointSize = 40.0 * uPixelRatio;
    gl_PointSize *= (1.0 / - viewPosition.z);

    vSpeed = aSpeed;
}
`