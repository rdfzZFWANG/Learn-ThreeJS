
export default 
/* glsl */`
varying float vSpeed;

void main()
{
    float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
    float strength = 1.0 - distanceToCenter;
    strength *= pow(strength, 4.0);
    

    gl_FragColor = vec4(1.0, 1.0, 1.0, strength);
}`