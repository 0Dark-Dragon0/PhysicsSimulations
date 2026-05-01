import os
import sys
import time
import subprocess
import webbrowser
import socket

def is_port_in_use(port):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        return s.connect_ex(('localhost', port)) == 0

def main():
    print("==================================================")
    print("Antigravity Physics Simulator Launcher")
    print("==================================================")
    
    # Change to the PhysicsSimulator directory
    base_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(base_dir)
    
    # Start the Vite dev server
    print("\nStarting the React Development Server...")
    
    # Start process without blocking
    if sys.platform == 'win32':
        process = subprocess.Popen('npm run dev', shell=True)
    else:
        process = subprocess.Popen(['npm', 'run', 'dev'])
        
    print("Waiting for server to initialize...")
    
    # Vite defaults to 5173, but we should just wait a few seconds
    # or loop until the port is open
    port = 5173
    max_retries = 30
    for _ in range(max_retries):
        if is_port_in_use(port):
            break
        time.sleep(0.5)
    else:
        print(f"Warning: Could not detect server on port {port}. It might be running on a different port.")
        time.sleep(2) # Give it a bit more time just in case

    print("\n[SUCCESS] Server is online!")
    print(f"Opening browser at http://localhost:{port}")
    
    webbrowser.open(f'http://localhost:{port}')
    
    try:
        print("\nPress Ctrl+C to stop the server and exit.")
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\nShutting down server...")
        # Terminate the npm process tree
        if sys.platform == 'win32':
            subprocess.call(['taskkill', '/F', '/T', '/PID', str(process.pid)])
        else:
            process.terminate()
        print("Goodbye!")

if __name__ == '__main__':
    main()
