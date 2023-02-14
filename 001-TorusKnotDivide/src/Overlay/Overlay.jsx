export default function Overlay() {
    return (
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: 40, left: 40, fontSize: '20px', color: '#ffffff'}}>
          Zhifeng Wang ——<br />
          王之枫
        </div>
        <div style={{ position: 'absolute', bottom: 40, right: 40, fontSize: '20px', color: '#ffffff' }}>—— 2023/02/10</div>
      </div>
    )
  }