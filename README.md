# LearnCube - Decentralized Quiz Platform

LearnCube is a Web3-enabled quiz platform that combines the engagement of interactive quizzes with blockchain technology. It allows users to create, participate in, and manage quizzes using their Web3 wallets.

![LearnCube Screenshot](screenshot.png)

## Features

### For Quiz Creators
- Create quiz rooms with multiple questions
- Set time limits and points for each question
- Monitor participant progress in real-time
- View detailed analytics and scores
- Manage multiple quiz rooms
- Control quiz activation status

### For Participants
- Connect with Web3 wallet (MetaMask, etc.)
- Join quiz rooms using unique room IDs
- Answer questions within time limits
- Get instant feedback on answers
- View real-time scores and rankings
- Compete with other participants

## Technology Stack

- **Frontend**: Next.js 14, TypeScript, TailwindCSS
- **Backend**: Supabase
- **Blockchain Integration**: Web3-React
- **Authentication**: Wallet-based authentication
- **Database**: PostgreSQL (via Supabase)
- **State Management**: Recoil

## Database Schema

```sql
-- Rooms table
create table public.rooms (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  creator_address text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  contract_address text,
  is_active boolean default true
);

-- Questions table
create table public.questions (
  id uuid default uuid_generate_v4() primary key,
  room_id uuid references public.rooms(id) on delete cascade,
  question_text text not null,
  options jsonb not null,
  correct_option integer not null,
  points integer default 100,
  time_limit integer default 30,
  question_order integer not null,
  unique(room_id, question_order)
);

-- Participants table
create table public.participants (
  id uuid default uuid_generate_v4() primary key,
  room_id uuid references public.rooms(id) on delete cascade,
  wallet_address text not null,
  score integer default 0,
  completed boolean default false,
  joined_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(room_id, wallet_address)
);
```

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/learncube.git
cd learncube
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the development server:
```bash
npm run dev
```

## How It Works

1. **Room Creation**:
   - Connect your Web3 wallet
   - Create a new quiz room
   - Add questions with options, time limits, and points
   - Share the room ID with participants

2. **Participation**:
   - Participants connect their wallets
   - Enter the room ID to join
   - Wait for the quiz to start
   - Answer questions within time limits
   - View scores and rankings

3. **Scoring System**:
   - Base points for correct answers
   - Time bonus for quick responses
   - Real-time leaderboard updates
   - Final rankings and statistics

## Why LearnCube?

LearnCube was built to address several key needs in the educational and assessment space:

1. **Decentralization**: Using Web3 wallets for authentication ensures secure and decentralized identity management.

2. **Engagement**: Interactive quiz format with time limits and point systems keeps participants engaged.

3. **Flexibility**: Suitable for various use cases from educational assessments to corporate training.

4. **Transparency**: All quiz data and scores are stored transparently and can be verified.

5. **Scalability**: Built on modern tech stack ensuring smooth performance with multiple concurrent users.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Powered by [Supabase](https://supabase.com/)
- Web3 integration via [Web3-React](https://github.com/Uniswap/web3-react)