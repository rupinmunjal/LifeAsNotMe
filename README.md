# LifeAsNotMe

#### **Inspiration**  
The idea behind *Life As Not Me* stems from a desire to foster empathy and curiosity. What if we could see the world through someone else's eyes—or even from the perspective of something entirely different, like a curious cat? This project was born to let people explore and relive perspectives beyond their own, combining creativity with advanced technology.

---

#### **What It Does**  
*Life As Not Me* is an interactive application that allows users to choose a perspective (e.g., "curious cat") and generates a video simulating how that perspective might view the world. By using advanced AI models, users can engage with custom text-to-video outputs that are uniquely tailored to their chosen lens. 

---

#### **How We Built It**  

1. **Frontend:**  
   - Developed using **React**, with components styled using **Shadcn** and **Lucide React**.  
   - Responsive and aesthetically pleasing UI created using **Tailwind CSS** for seamless cross-device accessibility.  

2. **Backend:**  
   - Built with **Python** and the **Flask** framework to handle custom APIs.  
   - Deployed on **Google Kubernetes Engine (GKE)** to ensure scalability, efficiency, and reliability.  
   - Video files are stored and retrieved from **Google Cloud Storage (Buckets)**.  

3. **AI/ML Integration:**  
   - Utilizes the **Hugging Face Simple Diffusion Model** for text-to-video generation.  
   - Frameworks like **PyTorch** and **NumPy** power the processing and diffusion model.  

4. **Cloud Infrastructure:**  
   - **Terraform** was used as Infrastructure-as-Code (IaC) to automate deployment processes.  
   - **Azure** hosts the frontend, while **Google Cloud Platform (GCP)** manages backend services and video storage.

---

#### **Challenges We Faced**  
- Optimizing the speed of the Hugging Face Simple Diffusion Model for real-time text-to-video generation.  
- Managing multi-cloud deployments between Azure and GCP to ensure smooth integration of frontend and backend.  
- Balancing computational complexity with responsiveness to maintain an engaging user experience.  

---

#### **Accomplishments We’re Proud Of**  
- Successfully integrating cutting-edge AI models for creative text-to-video generation.  
- Building a fully scalable, cloud-native architecture using Kubernetes and Terraform.  
- Creating a responsive and user-friendly interface that enhances engagement and accessibility.  

---

#### **What We Learned**  
- Effective use of Kubernetes clusters for resource optimization and scalability.  
- Leveraging multi-cloud services to create a seamless infrastructure for deployment.  
- The importance of balancing backend processing power with frontend responsiveness for real-time user interaction.  

---

#### **What’s Next for *Life As Not Me***  
- Expanding the library of perspectives to include more diverse personas and entities.  
- Improving the efficiency of text-to-video generation to reduce delays further.  
- Adding personalization features, such as user-uploaded prompts or themes.  
- Exploring augmented reality (AR) integration for immersive perspective simulations.  

---

#### **Try It Out**  
Take a moment to experience life as someone—or something—else! Dive into *Life As Not Me* and explore the world from a whole new point of view.  

> [GitHub Repository](https://github.com/nayanmapara/LifeAsNotMe)
