// Author:
// Title:

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

/*
 * vec2 st = gl_FragCoord.xy/u_resolution.xy;
 * 这样做是为了使所有的值落在0.0到1.0之间，可以轻松把X或Y的值映射到红色或绿色通道。
 * 例如：当前片元的屏幕坐标是(960.0, 540.0)，而屏幕分辨率是(1920.0, 1080.0)，
 * 那么相除后得到(0.5, 0.5)，这就是将屏幕坐标转换为归一坐标的过程。
*/
void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;

    vec3 color = vec3(0.);
    color = vec3(st.x,st.y,abs(sin(u_time)));

    gl_FragColor = vec4(color,1.0);
}