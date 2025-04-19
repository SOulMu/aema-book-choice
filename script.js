body {
  margin: 0;
  font-family: 'Segoe UI', sans-serif;
  background-color: #0a0a23;
  color: white;
  overflow-x: hidden;
}

.animated-bg {
  position: fixed;
  width: 100%;
  height: 100%;
  background: linear-gradient(-45deg, #0f0f1f, #001f3f, #003366, #000000);
  background-size: 400% 400%;
  animation: bgMove 20s ease infinite;
  z-index: -1;
}

@keyframes bgMove {
  0% {background-position: 0% 50%;}
  50% {background-position: 100% 50%;}
  100% {background-position: 0% 50%;}
}

.container {
  text-align: center;
  padding: 50px;
}

.logo {
  font-size: 3rem;
  color: #00ccff;
  margin-bottom: 20px;
}

.search-box input {
  padding: 10px;
  width: 300px;
  border-radius: 8px;
  border: none;
  font-size: 1rem;
}

.search-box button {
  padding: 10px 20px;
  margin-left: 10px;
  background-color: #00ccff;
  border: none;
  color: white;
  border-radius: 8px;
  cursor: pointer;
}

.results {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.result-card {
  background-color: rgba(255, 255, 255, 0.05);
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #00ccff;
  text-align: left;
}

.result-card img {
  float: right;
  width: 80px;
  border-radius: 8px;
}

.admin-btn {
  position: fixed;
  top: 10px;
  right: 10px;
  background-color: #aaffaa;
  border: none;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
}

.admin-panel {
  background: rgba(0, 0, 0, 0.8);
  padding: 20px;
  margin-top: 20px;
  border-radius: 10px;
  display: inline-block;
}

.hidden {
  display: none;
}
