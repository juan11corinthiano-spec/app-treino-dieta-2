'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Heart, MessageCircle, Share2, Send } from 'lucide-react';
import { saveData, getDataByKey } from '@/lib/storage';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Post {
  id: string;
  userName: string;
  content: string;
  type: 'conquista' | 'duvida' | 'experiencia';
  likes: number;
  comments: number;
  createdAt: string;
  liked?: boolean;
}

export function CommunityFeed() {
  const [posts, setPosts] = useState<Post[]>(() => {
    const saved = getDataByKey('communityPosts');
    return saved || [
      {
        id: '1',
        userName: 'João Silva',
        content: 'Completei minha primeira semana de treino! Sentindo a diferença 💪',
        type: 'conquista',
        likes: 15,
        comments: 3,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '2',
        userName: 'Maria Santos',
        content: 'Dica: aumentar a ingestão de proteína fez toda diferença nos meus resultados',
        type: 'experiencia',
        likes: 23,
        comments: 7,
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '3',
        userName: 'Pedro Costa',
        content: 'Alguém tem dicas para melhorar o agachamento? Ainda sinto dificuldade na técnica',
        type: 'duvida',
        likes: 8,
        comments: 12,
        createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      },
    ];
  });
  const [newPost, setNewPost] = useState('');
  const [postType, setPostType] = useState<'conquista' | 'duvida' | 'experiencia'>('experiencia');

  const handleCreatePost = () => {
    if (!newPost.trim()) return;

    const post: Post = {
      id: Date.now().toString(),
      userName: 'Você',
      content: newPost,
      type: postType,
      likes: 0,
      comments: 0,
      createdAt: new Date().toISOString(),
    };

    const updatedPosts = [post, ...posts];
    setPosts(updatedPosts);
    saveData('communityPosts', updatedPosts);
    setNewPost('');
  };

  const handleLike = (postId: string) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.liked ? post.likes - 1 : post.likes + 1,
          liked: !post.liked,
        };
      }
      return post;
    });
    setPosts(updatedPosts);
    saveData('communityPosts', updatedPosts);
  };

  const typeColors = {
    conquista: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    duvida: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    experiencia: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  };

  const typeLabels = {
    conquista: '🏆 Conquista',
    duvida: '❓ Dúvida',
    experiencia: '💡 Experiência',
  };

  return (
    <div className="space-y-4">
      {/* Criar Post */}
      <Card>
        <CardHeader>
          <CardTitle>Compartilhe com a Comunidade</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            {(['conquista', 'duvida', 'experiencia'] as const).map((type) => (
              <Button
                key={type}
                size="sm"
                variant={postType === type ? 'default' : 'outline'}
                onClick={() => setPostType(type)}
              >
                {typeLabels[type]}
              </Button>
            ))}
          </div>
          <Textarea
            placeholder="Compartilhe sua experiência, dúvida ou conquista..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            rows={3}
          />
          <Button
            onClick={handleCreatePost}
            className="w-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600"
            disabled={!newPost.trim()}
          >
            <Send className="w-4 h-4 mr-2" />
            Publicar
          </Button>
        </CardContent>
      </Card>

      {/* Feed de Posts */}
      <div className="space-y-3">
        {posts.map((post) => (
          <Card key={post.id} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Avatar>
                  <AvatarFallback className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white">
                    {post.userName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm">{post.userName}</span>
                    <Badge variant="secondary" className={typeColors[post.type]}>
                      {typeLabels[post.type]}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(post.createdAt), "HH:mm", { locale: ptBR })}
                    </span>
                  </div>
                  <p className="text-sm mb-3">{post.content}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center gap-1 hover:text-red-600 transition-colors ${
                        post.liked ? 'text-red-600' : ''
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${post.liked ? 'fill-current' : ''}`} />
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      <span>{post.comments}</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-green-600 transition-colors">
                      <Share2 className="w-4 h-4" />
                      <span>Compartilhar</span>
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
