function About() {
  return (
    <div className ="App">
      <div className="About">
        <p style={{ marginBottom: 16 }}>Made by @mgdvp Using React And Spotify API | 2023</p>
        <br /><br />
        <p style={{color: '#1E90FF'}}><a href="https://github.com/mgbdevp">Github</a></p>
      </div>
      <p>Spotify API kurallarına uygun olarak, siteden direkt olarak şarkının sadece 30 saniyelik önizlemesini çalabilirsiniz.</p>
      <p>Github üzerinden projeyi yıldızlamayı unutmayın!</p>
      <p style={{color: 'gray', marginTop: 10}}>Build V0.1</p>
    </div>
  );
}

export default About;


